// File: netlify/functions/pulseworld-bank.js

import Stripe from "stripe";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// ⭐ PulseWorld Logging Wrapper
function log(label, data) {
  console.log(`[PULSEWORLD::BANK] ${label}`, data || "");
}

// ⭐ Convert Stripe amounts → BZD (or USD if you prefer)
function toCurrency(v) {
  const n = Number(v);
  return isNaN(n) ? "0.00" : (n / 100).toFixed(2);
}

// ⭐ Full Stripe Snapshot (Bank + Capabilities + Requirements)
async function getFullBankSnapshot(stripeAccountID, stripeSecret) {
  log("🔵 getFullBankSnapshot() START", { stripeAccountID });

  const stripe = new Stripe(stripeSecret);

  try {
    // -------------------------------------------------------
    // 1️⃣ Core Account
    // -------------------------------------------------------
    const account = await stripe.accounts.retrieve(stripeAccountID);

    // -------------------------------------------------------
    // 2️⃣ Balances
    // -------------------------------------------------------
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountID
    });

    const available = balance.available?.reduce((s, b) => s + b.amount, 0) || 0;
    const pending = balance.pending?.reduce((s, b) => s + b.amount, 0) || 0;

    // -------------------------------------------------------
    // 3️⃣ External Bank Accounts
    // -------------------------------------------------------
    const external = await stripe.accounts.listExternalAccounts(
      stripeAccountID,
      { limit: 10 }
    );

    // -------------------------------------------------------
    // 4️⃣ Requirements (Verification)
    // -------------------------------------------------------
    const req = account.requirements || {};

    // -------------------------------------------------------
    // ⭐ Build Final Snapshot
    // -------------------------------------------------------
    const snapshot = {
      accountID: stripeAccountID,
      email: account.email,
      country: account.country,
      created: account.created,

      // Capabilities
      capabilities: account.capabilities,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      transfersEnabled: account.transfers_enabled,

      // Payout Schedule
      payoutSchedule: account.settings?.payouts?.schedule || {},

      // Requirements
      requirements: {
        currentDeadline: req.current_deadline,
        pastDue: req.past_due,
        currentlyDue: req.currently_due,
        eventuallyDue: req.eventually_due,
        disabledReason: req.disabled_reason,
        errors: req.errors
      },

      // External Accounts
      externalAccounts: external.data || [],

      // Balances
      balance: {
        availableBalance: toCurrency(available),
        pendingBalance: toCurrency(pending),
        totalBalance: toCurrency(available + pending)
      }
    };

    log("🟢 getFullBankSnapshot() RESULT", snapshot);
    return snapshot;

  } catch (err) {
    console.error("❌ getFullBankSnapshot() ERROR:", {
      message: err.message,
      type: err.type,
      code: err.code
    });

    return {
      error: "Snapshot failure",
      detail: err.message
    };
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, x-pulse-mode",
  "Content-Type": "application/json; charset=utf-8"
};

// ⭐ Netlify Function Handler
export async function handler(event, context) {
  log("⚡ PulseWorld Bank API Called");

  // Preflight OPTIONS handling
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true })
    };
  }

  let stripeAccountID = null;

  try {
    if (event.httpMethod === "GET") {
      stripeAccountID = event.queryStringParameters?.account;
    } else {
      const body = JSON.parse(event.body || "{}");
      stripeAccountID = body.account;
    }
  } catch (e) {
    stripeAccountID = null;
  }

  if (!stripeAccountID) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: "Missing Stripe Connected Account ID"
      })
    };
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecret) {
    console.error("[PULSEWORLD::BANK] STRIPE_SECRET_KEY missing in environment variables.");
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: "Banking service temporarily unavailable"
      })
    };
  }

  // ⭐ FULL SNAPSHOT (EVERYTHING WE WILL EVER NEED)
  const snapshot = await getFullBankSnapshot(stripeAccountID, stripeSecret);

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(snapshot)
  };
}

export async function stripeWebhook(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).json({ success: false });
  }

  // ---------------------------------------------------------
  // ⭐ PULSEWORLD IDENTITY ANCHOR
  // ---------------------------------------------------------
  if (event.type === "account.created" || event.type === "account.updated") {
    const account = event.data.object;

    const stripeAccountID = account.id;
    const email = account.email || null;
    const country = account.country || null;

    const detailsSubmitted = account.details_submitted;
    const chargesEnabled = account.charges_enabled;
    const payoutsEnabled = account.payouts_enabled;

    // ---------------------------------------------------------
    // ⭐ Store identity in your own backend (NOT Firebase)
    // ---------------------------------------------------------
    // Example: write to your own DB or Netlify storage
    // Replace this with your own storage layer
    await savePulseWorldIdentity({
      email,
      stripeAccountID,
      country,
      detailsSubmitted,
      chargesEnabled,
      payoutsEnabled,
      tethered: true,
      updatedAt: Date.now()
    });

    console.log(
      `🌐 PulseWorld Identity Anchored → ${stripeAccountID} (${email})`
    );
  }

  return res.json({ success: true, received: true });
}

function stripTimestamp(alias) {
  if (!alias || typeof alias !== "string") return "";
  return alias.replace(/-M#.*$/, "");
}
export async function savePulseWorldIdentity(payload) {
  try {
    console.log("🌐 [PulseIdentity] Incoming Payload:", payload);

    // ------------------------------------------------------------
    // ⭐ APPLY WEBHOOK DATA TO PULSE REALM
    // ------------------------------------------------------------
    PulseRealm.PulseUserEmail        = payload.email || null;
    PulseRealm.PulseEmail            = payload.email || null;
    PulseRealm.PulseCountry          = payload.country || "US";

    PulseRealm.PulseBankID           = payload.stripeAccountID || null;
    PulseRealm.PulseBank             = payload.stripeAccountID || "Unknown Stripe ID";

    PulseRealm.PulseDetailsSubmitted = payload.detailsSubmitted || false;
    PulseRealm.PulseChargesEnabled   = payload.chargesEnabled || false;
    PulseRealm.PulsePayoutsEnabled   = payload.payoutsEnabled || false;

    PulseRealm.PulseIdentityStatus   = payload.tethered ? "tethered" : "untethered";
    PulseRealm.PulseIdentityUpdated  = payload.updatedAt || Date.now();

    // ------------------------------------------------------------
    // ⭐ BUILD FULL IDENTITY SNAPSHOT (SELF-CONTAINED)
    // ------------------------------------------------------------
    const identity = {
      id: `world-${Math.random().toString(36).slice(2)}`,
      createdAt: Date.now(),
      tier: "temporal-os",

      name: PulseRealm.PulseUser || "Unknown Pulse User",
      email: PulseRealm.PulseEmail || `${stripTimestamp(PulseRealm.PulseUser || "Unknown")}@PulseWorld.Net`,
      userEmail: PulseRealm.PulseUserEmail || "unknown@domain.com",
      userName: PulseRealm.PulseUserName || "Unknown",
      phone: PulseRealm.PulsePhone || "(555) 555-5555",
      country: PulseRealm.PulseCountry || "US",

      role: PulseRealm.PulseRole || "User",
      pulseRole: PulseRealm.PulseWorldRole || "Entrepreneur",

      bank: PulseRealm.PulseBank || "Unknown Stripe ID",
      bankURL: PulseRealm.PulseBankURL || "https://www.pulseworld.net/?Impulse=PulseWorldBank",
      stripeLogin: PulseRealm.PulseBankURL || `https://dashboard.stripe.com/`,
      tokenID: PulseRealm.PulseBankID || null,
      assetsWallet: PulseRealm.PulseAssets || null,

      drift: PulseRealm.DriftSignature || PulseRealm.GenerateDriftSignature || "unknown-drift",
      device: PulseRealm.PulseTrustedDevice ?? true,

      photoURL: PulseRealm.PulsePhoto || "./_EXPRESSIONS/_PEX/BUILD/PulseSeed.webp.pex",
      aliasPhotoURL: PulseRealm.PulseAliasPhoto || "./_EXPRESSIONS/_PEX/BUILD/PulseSeed.webp.pex",
      bizphotoURL: PulseRealm.PulseBizPhoto || "./_EXPRESSIONS/_PEX/BUILD/PulseSeed.webp.pex",
      bizaliasPhotoURL: PulseRealm.PulseBizAliasPhoto || "./_EXPRESSIONS/_PEX/BUILD/PulseSeed.webp.pex",

      PulsePoints: PulseRealm.PulsePoints || 0,
      PulseLoyalty: PulseRealm.PulseTierPhoto || "./_EXPRESSIONS/_PEX/BUILD/PulseSeed.webp.pex"
    };

    // ------------------------------------------------------------
    // ⭐ SAVE IDENTITY TO LOCAL STORAGE (IF AVAILABLE)
    // ------------------------------------------------------------
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("PulseIdentity", JSON.stringify(identity));
    }

    // ------------------------------------------------------------
    // ⭐ SAVE PHOTOS (SELF-CONTAINED)
    // ------------------------------------------------------------
    const photos = {
      photoURL: identity.photoURL,
      aliasPhotoURL: identity.aliasPhotoURL,
      bizphotoURL: identity.bizphotoURL,
      bizaliasPhotoURL: identity.bizaliasPhotoURL
    };

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("PulsePhotos", JSON.stringify(photos));
    }

    // ------------------------------------------------------------
    // ⭐ APPLY IDENTITY TO PULSE REALM
    // ------------------------------------------------------------
    PulseRealm.PulseIdentity = identity;

    console.log("🌐 [PulseIdentity] Final Identity Snapshot:", identity);
    console.log("🌐 [PulseIdentity] Save Complete.");

    return { success: true, identity };

  } catch (err) {
    console.error("❌ [PulseIdentity] Failed:", err);
    return { success: false, error: err.message };
  }
}
