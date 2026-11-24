// PULSE-SERVER/NETLIFY/PULSE-SERVER-BANK.js
// Live Stripe Connect Account & Balance Snapshot retrieval strictly by Stripe ID.
// Note: Signed Stripe webhooks are handled by PULSE-SERVER-STRIPE-WEBHOOK.js.

import {
  getStripeClient,
  getSupabaseAdmin,
  isValidStripeAccountId,
  jsonResponse,
  maskEmail,
  parseBody
} from "./_shared/pulse-domains.js";

function toCurrency(cents) {
  const n = Number(cents);
  return Number.isNaN(n) ? "0.00" : (n / 100).toFixed(2);
}

async function getFullBankSnapshot(stripeAccountID) {
  const stripe = getStripeClient();

  try {
    const account = await stripe.accounts.retrieve(stripeAccountID);

    let available = 0;
    let pending = 0;
    let currency = "USD";
    try {
      const balance = await stripe.balance.retrieve({ stripeAccount: stripeAccountID });
      available = (balance.available || []).reduce((s, b) => s + b.amount, 0);
      pending = (balance.pending || []).reduce((s, b) => s + b.amount, 0);
      currency = (balance.available?.[0]?.currency || balance.pending?.[0]?.currency || "usd").toUpperCase();
    } catch (balErr) {
      console.warn("[PULSEWORLD::BANK] Connected balance warning:", balErr.message);
    }

    let externalAccounts = [];
    try {
      const external = await stripe.accounts.listExternalAccounts(stripeAccountID, { limit: 10 });
      externalAccounts = external.data || [];
    } catch (extErr) {
      console.warn("[PULSEWORLD::BANK] External accounts warning:", extErr.message);
    }

    const req = account.requirements || {};

    return {
      ok: true,
      accountID: stripeAccountID,
      stripeID: stripeAccountID,
      email: account.email || null,
      maskedEmail: maskEmail(account.email),
      country: account.country || "US",
      created: account.created || null,
      detailsSubmitted: Boolean(account.details_submitted),
      capabilities: account.capabilities || {},
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled: Boolean(account.payouts_enabled),
      transfersEnabled:
        account.capabilities?.transfers === "active" || Boolean(account.payouts_enabled),
      payoutSchedule: account.settings?.payouts?.schedule || {},
      requirements: {
        currentDeadline: req.current_deadline || null,
        pastDue: req.past_due || [],
        currentlyDue: req.currently_due || [],
        eventuallyDue: req.eventually_due || [],
        disabledReason: req.disabled_reason || null,
        errors: req.errors || []
      },
      externalAccounts,
      balance: {
        currency,
        availableBalance: toCurrency(available),
        pendingBalance: toCurrency(pending),
        totalBalance: toCurrency(available + pending)
      }
    };
  } catch (err) {
    console.error("❌ [PULSEWORLD::BANK] getFullBankSnapshot error:", err.message);
    return {
      ok: false,
      error: "Snapshot failure",
      detail: err.message
    };
  }
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  const params =
    event.httpMethod === "GET"
      ? event.queryStringParameters || {}
      : parseBody(event);

  // Optional platform balance summary (reads main Stripe platform balance)
  if (params.action === "platformBalance") {
    try {
      const stripe = getStripeClient();
      const bal = await stripe.balance.retrieve();
      const available = (bal.available || []).reduce((s, b) => s + b.amount, 0);
      const pending = (bal.pending || []).reduce((s, b) => s + b.amount, 0);
      return jsonResponse(200, {
        ok: true,
        mode: "platform",
        balance: {
          availableBalance: toCurrency(available),
          pendingBalance: toCurrency(pending),
          totalBalance: toCurrency(available + pending)
        }
      });
    } catch (err) {
      return jsonResponse(500, { ok: false, error: err.message });
    }
  }

  const stripeAccountID = String(
    params.account || params.stripeID || params.stripeId || params.tokenID || ""
  ).trim();

  if (!isValidStripeAccountId(stripeAccountID)) {
    return jsonResponse(400, {
      ok: false,
      error: "Missing or invalid Stripe Connected Account ID (expected acct_...)"
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return jsonResponse(500, {
      ok: false,
      error: "Banking service temporarily unavailable (STRIPE_SECRET_KEY missing)"
    });
  }

  const snapshot = await getFullBankSnapshot(stripeAccountID);
  if (!snapshot.ok) {
    return jsonResponse(502, snapshot);
  }

  // Optionally include linked PulseIdentity profile metadata from Supabase
  if (params.includeIdentity === "1" || params.includeIdentity === true) {
    try {
      const supabase = getSupabaseAdmin();
      const { data: row } = await supabase
        .from("PulseIdentity")
        .select("userID, name, email, stripeID, attrs, lastUpdated")
        .eq("stripeID", stripeAccountID)
        .maybeSingle();

      if (row) {
        snapshot.identity = {
          userID: row.userID,
          name: row.name,
          aliasEmail: row.attrs?.aliasEmail || row.email,
          emailDomain: row.attrs?.emailDomain || "pulseworld.net",
          PulsePoints: row.attrs?.PulsePoints ?? 0,
          role: row.attrs?.role || "User",
          lastUpdated: row.lastUpdated || null
        };
      }
    } catch (dbErr) {
      console.warn("[PULSEWORLD::BANK] Supabase identity join warning:", dbErr.message);
    }
  }

  return jsonResponse(200, snapshot);
}
