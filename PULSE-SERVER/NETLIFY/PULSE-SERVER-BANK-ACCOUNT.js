// PULSE-SERVER/NETLIFY/PULSE-SERVER-BANK-ACCOUNT.js
// Stripe Connect Express creation/linking, Onboarding Link generation,
// Express Dashboard Login Links & automatic Supabase "PulseIdentity" persistence.

import {
  DEFAULT_EMAIL_DOMAIN,
  buildAliasEmail,
  getStripeClient,
  getSupabaseAdmin,
  isPlaceholderEmail,
  isValidStripeAccountId,
  jsonResponse,
  maskEmail,
  parseBody,
  resolveAllowedDomain,
  resolveStripeCountry,
  sanitizeAliasHandle,
  stripTimestamp
} from "./_shared/pulse-domains.js";

function sanitizeReturnUrl(rawUrl, fallbackPath) {
  const fallback = `https://www.pulseworld.net${fallbackPath}`;
  if (!rawUrl || typeof rawUrl !== "string") return fallback;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return fallback;
    return parsed.toString();
  } catch {
    return fallback;
  }
}

async function buildAccountSnapshot(stripe, accountID, role = "Deliverer", fallbackSchedule = null) {
  const account = await stripe.accounts.retrieve(accountID);

  let availableBalance = 0;
  let pendingBalance = 0;
  try {
    const balance = await stripe.balance.retrieve({ stripeAccount: accountID });
    availableBalance = (balance.available || []).reduce((sum, b) => sum + b.amount, 0) / 100;
    pendingBalance = (balance.pending || []).reduce((sum, b) => sum + b.amount, 0) / 100;
  } catch (balErr) {
    console.warn("[PulseWorld::Bank] Balance fetch warning:", balErr.message);
  }

  let externalAccounts = [];
  try {
    const external = await stripe.accounts.listExternalAccounts(accountID, { limit: 10 });
    externalAccounts = external.data || [];
  } catch (extErr) {
    console.warn("[PulseWorld::Bank] External accounts warning:", extErr.message);
  }

  const requirements = account.requirements || {};

  return {
    ok: true,
    stripeID: accountID,
    tokenID: accountID,
    email: account.email || null,
    maskedEmail: maskEmail(account.email),
    country: account.country || "US",
    role,
    capabilities: account.capabilities || {},
    chargesEnabled: Boolean(account.charges_enabled),
    payoutsEnabled: Boolean(account.payouts_enabled),
    transfersEnabled:
      account.capabilities?.transfers === "active" || Boolean(account.payouts_enabled),
    detailsSubmitted: Boolean(account.details_submitted),
    tosAcceptance: account.tos_acceptance || null,
    created: account.created || null,
    payoutSchedule: account.settings?.payouts?.schedule || fallbackSchedule || null,
    requirements: {
      currentDeadline: requirements.current_deadline || null,
      pastDue: requirements.past_due || [],
      currentlyDue: requirements.currently_due || [],
      eventuallyDue: requirements.eventually_due || [],
      disabledReason: requirements.disabled_reason || null,
      errors: requirements.errors || []
    },
    externalAccounts,
    balance: {
      availableBalance: Number(availableBalance.toFixed(2)),
      pendingBalance: Number(pendingBalance.toFixed(2)),
      totalBalance: Number((availableBalance + pendingBalance).toFixed(2))
    }
  };
}

async function persistStripeIdToSupabase({
  accountID,
  snapshot,
  localId,
  name,
  email,
  emailDomain,
  phone,
  host
}) {
  try {
    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();

    let existing = null;
    if (localId) {
      const { data } = await supabase
        .from("PulseIdentity")
        .select("*")
        .eq("attrs->>localId", localId)
        .maybeSingle();
      existing = data || null;
    }
    if (!existing && isValidStripeAccountId(accountID)) {
      const { data } = await supabase
        .from("PulseIdentity")
        .select("*")
        .eq("stripeID", accountID)
        .maybeSingle();
      existing = data || null;
    }

    const stripeStatus = {
      stripeID: accountID,
      detailsSubmitted: snapshot.detailsSubmitted,
      chargesEnabled: snapshot.chargesEnabled,
      payoutsEnabled: snapshot.payoutsEnabled,
      transfersEnabled: snapshot.transfersEnabled,
      requirementsCurrentlyDue: snapshot.requirements?.currentlyDue || [],
      disabledReason: snapshot.requirements?.disabledReason || null,
      tethered: true,
      updatedAt: now
    };

    if (existing) {
      const updatedAttrs = {
        ...(existing.attrs || {}),
        tokenID: accountID,
        stripeID: accountID,
        bank: accountID,
        stripeStatus,
        ...(email && !isPlaceholderEmail(email) ? { userEmail: email } : {})
      };

      const { error } = await supabase
        .from("PulseIdentity")
        .update({
          stripeID: accountID,
          attrs: updatedAttrs,
          lastUpdated: now
        })
        .eq("userID", existing.userID);

      if (error) {
        console.warn("[PulseWorld::Bank] Supabase update warning:", error.message);
        return { saved: false, error: error.message };
      }
      return { saved: true, userID: existing.userID };
    }

    // If no row exists yet and we have a localId or name, create a clean row
    if (localId || name) {
      const cleanName = stripTimestamp(name || localId || accountID);
      const { domain } = resolveAllowedDomain(emailDomain || host || DEFAULT_EMAIL_DOMAIN);
      const aliasHandle = sanitizeAliasHandle(cleanName);
      const aliasEmail = buildAliasEmail(cleanName, domain);
      const rowLocalId = localId || `world-${accountID.slice(-10)}`;

      const { data, error } = await supabase
        .from("PulseIdentity")
        .insert({
          email: aliasEmail,
          name: cleanName,
          stripeID: accountID,
          phone: phone || null,
          host: host || null,
          localId: rowLocalId,
          created: now,
          lastUpdated: now,
          online: true,
          inactive: false,
          attrs: {
            localId: rowLocalId,
            name: cleanName,
            aliasHandle,
            emailDomain: domain,
            aliasEmail,
            email: aliasEmail,
            userEmail: email && !isPlaceholderEmail(email) ? email : null,
            tokenID: accountID,
            stripeID: accountID,
            bank: accountID,
            stripeStatus
          }
        })
        .select("userID")
        .maybeSingle();

      if (error) {
        console.warn("[PulseWorld::Bank] Supabase insert warning:", error.message);
        return { saved: false, error: error.message };
      }
      return { saved: true, userID: data?.userID || null };
    }

    return { saved: false, reason: "no_identity_key" };
  } catch (err) {
    console.warn("[PulseWorld::Bank] Supabase persist skipped:", err.message);
    return { saved: false, error: err.message };
  }
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (err) {
    console.error("[PulseWorld::Bank] Stripe init error:", err.message);
    return jsonResponse(500, {
      ok: false,
      error: "Banking service temporarily unavailable (STRIPE_SECRET_KEY missing)"
    });
  }

  const payload =
    event.httpMethod === "GET"
      ? event.queryStringParameters || {}
      : parseBody(event);

  const action = String(payload.action || "createOrLink").trim();
  const originHost = payload.origin || "https://www.pulseworld.net";
  const returnUrl = sanitizeReturnUrl(
    payload.returnUrl,
    "/?Impulse=PulseWorldInventory&stripe=return"
  );
  const refreshUrl = sanitizeReturnUrl(
    payload.refreshUrl,
    "/?Impulse=PulseWorldInventory&stripe=refresh"
  );

  // --------------------------------------------------------------------------
  // ACTION: Generate fresh Stripe Connect Express Onboarding Link
  // --------------------------------------------------------------------------
  if (action === "onboardingLink") {
    const accountID = String(payload.stripeID || payload.tokenID || payload.account || "").trim();
    if (!isValidStripeAccountId(accountID)) {
      return jsonResponse(400, {
        ok: false,
        error: "Valid Stripe Connected Account ID (acct_...) is required"
      });
    }

    try {
      const link = await stripe.accountLinks.create({
        account: accountID,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: "account_onboarding"
      });
      return jsonResponse(200, {
        ok: true,
        stripeID: accountID,
        onboardingUrl: link.url,
        expiresAt: link.expires_at
      });
    } catch (err) {
      console.error("[PulseWorld::Bank] accountLinks.create failed:", err.message);
      return jsonResponse(500, { ok: false, error: err.message });
    }
  }

  // --------------------------------------------------------------------------
  // ACTION: Generate Express Dashboard Login Link (for onboarded accounts)
  // --------------------------------------------------------------------------
  if (action === "loginLink") {
    const accountID = String(payload.stripeID || payload.tokenID || payload.account || "").trim();
    if (!isValidStripeAccountId(accountID)) {
      return jsonResponse(400, {
        ok: false,
        error: "Valid Stripe Connected Account ID (acct_...) is required"
      });
    }

    try {
      const loginLink = await stripe.accounts.createLoginLink(accountID);
      return jsonResponse(200, {
        ok: true,
        stripeID: accountID,
        dashboardUrl: loginLink.url
      });
    } catch (err) {
      // If onboarding isn't finished yet, Stripe rejects createLoginLink — fall back to onboardingLink
      try {
        const link = await stripe.accountLinks.create({
          account: accountID,
          refresh_url: refreshUrl,
          return_url: returnUrl,
          type: "account_onboarding"
        });
        return jsonResponse(200, {
          ok: true,
          stripeID: accountID,
          onboardingRequired: true,
          onboardingUrl: link.url,
          expiresAt: link.expires_at
        });
      } catch (linkErr) {
        return jsonResponse(500, { ok: false, error: linkErr.message || err.message });
      }
    }
  }

  // --------------------------------------------------------------------------
  // ACTION: Lookup strictly by Stripe ID
  // --------------------------------------------------------------------------
  if (action === "lookupByStripeId") {
    const accountID = String(payload.stripeID || payload.tokenID || payload.account || "").trim();
    if (!isValidStripeAccountId(accountID)) {
      return jsonResponse(400, {
        ok: false,
        error: "Valid Stripe Connected Account ID (acct_...) is required"
      });
    }

    try {
      const snapshot = await buildAccountSnapshot(stripe, accountID, payload.role || "User");
      return jsonResponse(200, snapshot);
    } catch (err) {
      return jsonResponse(404, {
        ok: false,
        error: `Could not retrieve Stripe account ${accountID}: ${err.message}`
      });
    }
  }

  // --------------------------------------------------------------------------
  // DEFAULT ACTION: createOrLink (Connect Express + Onboarding + Supabase Sync)
  // --------------------------------------------------------------------------
  const {
    email,
    name,
    localId,
    emailDomain,
    phone,
    host,
    country = "US",
    role = "Deliverer",
    payFrequency,
    payDay,
    forceOnboarding = false
  } = payload;

  const providedAccountID = String(payload.stripeID || payload.tokenID || "").trim();
  const cleanEmail = String(email || "").trim().toLowerCase();

  if (!isValidStripeAccountId(providedAccountID) && isPlaceholderEmail(cleanEmail)) {
    return jsonResponse(400, {
      ok: false,
      error: "Please enter a valid real email address before setting up your Stripe Connect account."
    });
  }

  const { country: resolvedCountry, fallbackUsed, originalCountry } = resolveStripeCountry(country);

  // Determine payout schedule
  let finalFrequency = String(payFrequency || "").toLowerCase();
  let finalDay = String(payDay || "").toLowerCase();
  if (!finalFrequency) finalFrequency = role === "Vendor" ? "weekly" : "daily";
  if (!["daily", "weekly"].includes(finalFrequency)) finalFrequency = "daily";
  if (finalFrequency === "weekly") {
    const allowedDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    if (!allowedDays.includes(finalDay)) finalDay = "monday";
  }

  const schedule =
    finalFrequency === "daily"
      ? { interval: "daily" }
      : { interval: "weekly", weekly_anchor: finalDay };

  let accountID = isValidStripeAccountId(providedAccountID) ? providedAccountID : null;
  let reusedExisting = Boolean(accountID);

  // 1. Check Supabase for an existing stripeID linked to this localId
  if (!accountID && localId) {
    try {
      const supabase = getSupabaseAdmin();
      const { data: existingRow } = await supabase
        .from("PulseIdentity")
        .select("stripeID, attrs")
        .eq("attrs->>localId", localId)
        .maybeSingle();

      const dbStripeId = existingRow?.stripeID || existingRow?.attrs?.tokenID || "";
      if (isValidStripeAccountId(dbStripeId)) {
        accountID = dbStripeId.trim();
        reusedExisting = true;
      }
    } catch (e) {
      console.warn("[PulseWorld::Bank] Supabase pre-check skipped:", e.message);
    }
  }

  // 2. Check Stripe for an existing Connect account with the same email (prevents live duplicate spam!)
  if (!accountID && !isPlaceholderEmail(cleanEmail)) {
    try {
      const list = await stripe.accounts.list({ limit: 100 });
      const found = (list.data || []).find(
        (acc) => acc.email && acc.email.toLowerCase() === cleanEmail
      );
      if (found) {
        accountID = found.id;
        reusedExisting = true;
      }
    } catch (listErr) {
      console.warn("[PulseWorld::Bank] accounts.list pre-check warning:", listErr.message);
    }
  }

  // 3. Update existing account schedule (best-effort) or create new Express account
  if (accountID) {
    try {
      await stripe.accounts.update(accountID, {
        settings: { payouts: { schedule } },
        metadata: {
          ...(localId ? { pulse_local_id: String(localId) } : {}),
          ...(name ? { pulse_name: stripTimestamp(String(name)) } : {}),
          pulse_origin: originHost
        }
      });
    } catch (updErr) {
      console.warn("[PulseWorld::Bank] Existing account update warning:", updErr.message);
    }
  } else {
    try {
      const account = await stripe.accounts.create({
        type: "express",
        country: resolvedCountry,
        email: cleanEmail,
        capabilities: { transfers: { requested: true } },
        settings: { payouts: { schedule } },
        metadata: {
          pulse_local_id: String(localId || ""),
          pulse_name: stripTimestamp(String(name || "")),
          pulse_role: String(role || "User"),
          pulse_origin: originHost
        }
      });
      accountID = account.id;
      reusedExisting = false;
    } catch (createErr) {
      console.error("[PulseWorld::Bank] Stripe account creation error:", createErr.message);
      return jsonResponse(500, {
        ok: false,
        error: `Unable to create Stripe Connect Express account: ${createErr.message}`
      });
    }
  }

  // 4. Retrieve full snapshot
  let snapshot;
  try {
    snapshot = await buildAccountSnapshot(stripe, accountID, role, schedule);
  } catch (err) {
    console.error("[PulseWorld::Bank] Snapshot error:", err.message);
    return jsonResponse(500, {
      ok: false,
      stripeID: accountID,
      error: `Account linked (${accountID}), but snapshot failed: ${err.message}`
    });
  }

  // 5. Generate Onboarding Link (if not yet submitted) or Express Login Link (if submitted)
  let onboardingUrl = null;
  let dashboardUrl = null;

  if (!snapshot.detailsSubmitted || forceOnboarding) {
    try {
      const link = await stripe.accountLinks.create({
        account: accountID,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: "account_onboarding"
      });
      onboardingUrl = link.url;
    } catch (linkErr) {
      console.warn("[PulseWorld::Bank] Onboarding link warning:", linkErr.message);
    }
  } else {
    try {
      const login = await stripe.accounts.createLoginLink(accountID);
      dashboardUrl = login.url;
    } catch (loginErr) {
      console.warn("[PulseWorld::Bank] Login link warning:", loginErr.message);
    }
  }

  // 6. Persist stripeID & live verification state into Supabase public."PulseIdentity"
  const supabaseSync = await persistStripeIdToSupabase({
    accountID,
    snapshot,
    localId,
    name,
    email: cleanEmail,
    emailDomain,
    phone,
    host
  });

  return jsonResponse(200, {
    ...snapshot,
    reusedExisting,
    onboardingRequired: !snapshot.detailsSubmitted,
    onboardingUrl,
    dashboardUrl,
    supabaseSynced: Boolean(supabaseSync.saved),
    countryNote: fallbackUsed
      ? `Country "${originalCountry}" is not directly supported by Stripe Connect Express; defaulted to "${resolvedCountry}".`
      : null
  });
}
