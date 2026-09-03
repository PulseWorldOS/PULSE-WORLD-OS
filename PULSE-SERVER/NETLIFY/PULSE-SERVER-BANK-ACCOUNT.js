import Stripe from "stripe";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, x-pulse-mode",
  "Content-Type": "application/json; charset=utf-8"
};

export async function handler(event, context) {
  console.log("[PulseWorld::Bank] START — FULL SNAPSHOT MODE");

  // Preflight OPTIONS handling
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true })
    };
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    console.error("[PulseWorld::Bank] STRIPE_SECRET_KEY missing in environment variables.");
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Banking service temporarily unavailable" })
    };
  }

  const stripe = new Stripe(stripeSecret);

  // Parse payload
  let payload = {};
  try {
    if (event.httpMethod === "GET") {
      payload = event.queryStringParameters || {};
    } else {
      payload = JSON.parse(event.body || "{}");
    }
  } catch (e) {
    payload = {};
  }

  const {
    email,
    country = "BZ",
    role = "Deliverer",
    payFrequency,
    payDay,
    tokenID
  } = payload;

  if (!email) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Missing email" })
    };
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const theCountry = String(country).trim().toUpperCase();


  // Determine payout schedule
  let finalFrequency = (payFrequency || "").toLowerCase();
  let finalDay = (payDay || "").toLowerCase();

  if (!finalFrequency) {
    finalFrequency = role === "Vendor" ? "weekly" : "daily";
  }

  if (!["daily", "weekly"].includes(finalFrequency)) {
    finalFrequency = "daily";
  }

  if (finalFrequency === "weekly") {
    const allowedDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    if (!allowedDays.includes(finalDay)) finalDay = "monday";
  }

  const schedule =
    finalFrequency === "daily"
      ? { interval: "daily" }
      : { interval: "weekly", weekly_anchor: finalDay };

  let accountID = tokenID || null;

  // Update existing account
  if (accountID) {
    try {
      await stripe.accounts.update(accountID, {
        settings: { payouts: { schedule } }
      });
    } catch (err) {
      console.error("[PulseWorld::Bank] Update failed:", err.message);
    }
  }

  // Create new account if needed
  if (!accountID) {
    try {
      const account = await stripe.accounts.create({
        type: "express",
        country: theCountry,
        email: cleanEmail,
        capabilities: { transfers: { requested: true } },
        settings: { payouts: { schedule } }
      });

      accountID = account.id;
    } catch (err) {
      console.error("[PulseWorld::Bank] Creation error:", err.message);

      const list = await stripe.accounts.list({ limit: 100 });
      const found = list.data.find(acc => acc.email === cleanEmail);

      if (found) {
        accountID = found.id;
      } else {
        return {
          statusCode: 500,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            error: "Unable to create or find account"
          })
        };
      }
    }
  }

  // ⭐ FULL STRIPE SNAPSHOT — EVERYTHING WE WILL EVER NEED
  const snapshot = {};

  try {
    // Core account object
    const account = await stripe.accounts.retrieve(accountID);

    // Balances
    const balance = await stripe.balance.retrieve({ stripeAccount: accountID });

    // External accounts (bank accounts)
    const external = await stripe.accounts.listExternalAccounts(accountID, {
      limit: 10
    });

    // Requirements
    const requirements = account.requirements || {};

    // Build snapshot
    snapshot.tokenID = accountID;
    snapshot.email = account.email;
    snapshot.country = account.country;
    snapshot.role = role;

    snapshot.capabilities = account.capabilities;
    snapshot.chargesEnabled = account.charges_enabled;
    snapshot.payoutsEnabled = account.payouts_enabled;
    snapshot.transfersEnabled = account.transfers_enabled;

    snapshot.detailsSubmitted = account.details_submitted;
    snapshot.tosAcceptance = account.tos_acceptance;
    snapshot.created = account.created;

    snapshot.payoutSchedule = account.settings?.payouts?.schedule || schedule;

    snapshot.requirements = {
      currentDeadline: requirements.current_deadline,
      pastDue: requirements.past_due,
      currentlyDue: requirements.currently_due,
      eventuallyDue: requirements.eventually_due,
      disabledReason: requirements.disabled_reason,
      errors: requirements.errors
    };

    snapshot.externalAccounts = external.data || [];

    snapshot.balance = {
      availableBalance:
        balance.available?.reduce((sum, b) => sum + b.amount, 0) / 100 || 0,
      pendingBalance:
        balance.pending?.reduce((sum, b) => sum + b.amount, 0) / 100 || 0
    };
  } catch (err) {
    console.error("[PulseWorld::Bank] Snapshot error:", err.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Snapshot failure" })
    };
  }

  // Return full snapshot
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(snapshot)
  };
}
