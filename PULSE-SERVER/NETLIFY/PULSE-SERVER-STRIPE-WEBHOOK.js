// PULSE-SERVER/NETLIFY/PULSE-SERVER-STRIPE-WEBHOOK.js
// Signature-verified Stripe Connect Webhook Handler for Netlify Functions.
// Endpoint URL to register in Stripe Dashboard → Developers → Webhooks (Connect events):
//   https://www.pulseworld.net/.netlify/functions/PULSE-SERVER-STRIPE-WEBHOOK
// Required Netlify env vars:
//   STRIPE_SECRET_KEY
//   STRIPE_WEBHOOK_SECRET (whsec_...)
//   SUPABASE_DATABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import {
  getHeader,
  getStripeClient,
  getSupabaseAdmin,
  isPlaceholderEmail,
  isValidStripeAccountId,
  jsonResponse
} from "./_shared/pulse-domains.js";

async function findMatchingIdentityRow(supabase, { stripeAccountID, localId, email }) {
  if (isValidStripeAccountId(stripeAccountID)) {
    const { data } = await supabase
      .from("PulseIdentity")
      .select("*")
      .eq("stripeID", stripeAccountID)
      .maybeSingle();
    if (data) return data;
  }

  if (localId) {
    const { data } = await supabase
      .from("PulseIdentity")
      .select("*")
      .eq("attrs->>localId", localId)
      .maybeSingle();
    if (data) return data;
  }

  if (email && !isPlaceholderEmail(email)) {
    const cleanEmail = email.trim().toLowerCase();
    const { data } = await supabase
      .from("PulseIdentity")
      .select("*")
      .ilike("attrs->>userEmail", cleanEmail)
      .maybeSingle();
    if (data) return data;
  }

  return null;
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method Not Allowed — POST required" });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ [STRIPE-WEBHOOK] STRIPE_WEBHOOK_SECRET is not set in Netlify env vars.");
    return jsonResponse(500, {
      ok: false,
      error: "Webhook secret not configured on server (STRIPE_WEBHOOK_SECRET)"
    });
  }

  const sig = getHeader(event, "stripe-signature");
  if (!sig) {
    return jsonResponse(400, { ok: false, error: "Missing stripe-signature header" });
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  let stripe;
  let stripeEvent;
  try {
    stripe = getStripeClient();
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("❌ [STRIPE-WEBHOOK] Signature verification failed:", err.message);
    return jsonResponse(400, {
      ok: false,
      error: `Webhook signature verification failed: ${err.message}`
    });
  }

  const eventType = stripeEvent.type;
  const now = new Date().toISOString();
  let targetAccountID = stripeEvent.account || null;
  let accountObj = null;

  if (eventType.startsWith("account.")) {
    const obj = stripeEvent.data?.object;
    if (obj?.object === "account" && isValidStripeAccountId(obj.id)) {
      accountObj = obj;
      targetAccountID = obj.id;
    }
  }

  // For payout/capability/external_account Connect events, refresh full account status from Stripe
  if (!accountObj && isValidStripeAccountId(targetAccountID)) {
    try {
      accountObj = await stripe.accounts.retrieve(targetAccountID);
    } catch (fetchErr) {
      console.warn(
        `[STRIPE-WEBHOOK] Could not retrieve connected account ${targetAccountID}:`,
        fetchErr.message
      );
    }
  }

  if (!isValidStripeAccountId(targetAccountID)) {
    return jsonResponse(200, {
      ok: true,
      received: true,
      eventType,
      updated: false,
      note: "Event acknowledged (no connected account ID attached)"
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const localId = accountObj?.metadata?.pulse_local_id || null;
    const email = accountObj?.email || null;

    const existing = await findMatchingIdentityRow(supabase, {
      stripeAccountID: targetAccountID,
      localId,
      email
    });

    const isDeauthorized = eventType === "account.application.deauthorized";

    const stripeStatus = {
      stripeID: targetAccountID,
      country: accountObj?.country || existing?.attrs?.stripeStatus?.country || "US",
      detailsSubmitted: Boolean(accountObj?.details_submitted),
      chargesEnabled: Boolean(accountObj?.charges_enabled),
      payoutsEnabled: Boolean(accountObj?.payouts_enabled),
      transfersEnabled:
        accountObj?.capabilities?.transfers === "active" || Boolean(accountObj?.payouts_enabled),
      requirementsCurrentlyDue: accountObj?.requirements?.currently_due || [],
      requirementsPastDue: accountObj?.requirements?.past_due || [],
      disabledReason: accountObj?.requirements?.disabled_reason || null,
      tethered: !isDeauthorized,
      lastWebhookEvent: eventType,
      lastWebhookId: stripeEvent.id,
      lastWebhookAt: now
    };

    if (eventType === "payout.paid" || eventType === "payout.failed") {
      const payout = stripeEvent.data?.object;
      stripeStatus.lastPayout = {
        id: payout?.id || null,
        amount: payout?.amount != null ? Number((payout.amount / 100).toFixed(2)) : null,
        currency: (payout?.currency || "usd").toUpperCase(),
        status: payout?.status || eventType,
        arrivalDate: payout?.arrival_date || null,
        at: now
      };
    }

    if (!existing) {
      console.log(
        `[STRIPE-WEBHOOK] Received ${eventType} for ${targetAccountID}, no matching PulseIdentity row yet.`
      );
      return jsonResponse(200, {
        ok: true,
        received: true,
        eventType,
        stripeID: targetAccountID,
        updated: false,
        note: "No matching PulseIdentity row found yet"
      });
    }

    const updatedAttrs = {
      ...(existing.attrs || {}),
      tokenID: isDeauthorized ? null : targetAccountID,
      stripeID: isDeauthorized ? null : targetAccountID,
      bank: isDeauthorized ? "Not Tethered" : targetAccountID,
      stripeStatus,
      ...(email && !isPlaceholderEmail(email) ? { userEmail: email.toLowerCase() } : {})
    };

    const { error } = await supabase
      .from("PulseIdentity")
      .update({
        stripeID: isDeauthorized ? "" : targetAccountID,
        attrs: updatedAttrs,
        lastUpdated: now
      })
      .eq("userID", existing.userID);

    if (error) {
      console.error("❌ [STRIPE-WEBHOOK] Supabase update error:", error.message);
      return jsonResponse(500, { ok: false, error: error.message });
    }

    console.log(
      `🌐 [STRIPE-WEBHOOK] Anchored ${eventType} → ${targetAccountID} (userID=${existing.userID}, payouts=${stripeStatus.payoutsEnabled})`
    );

    return jsonResponse(200, {
      ok: true,
      received: true,
      eventType,
      stripeID: targetAccountID,
      userID: existing.userID,
      updated: true,
      stripeStatus
    });
  } catch (err) {
    console.error("❌ [STRIPE-WEBHOOK] Processing failed:", err.message);
    return jsonResponse(500, { ok: false, error: err.message });
  }
}
