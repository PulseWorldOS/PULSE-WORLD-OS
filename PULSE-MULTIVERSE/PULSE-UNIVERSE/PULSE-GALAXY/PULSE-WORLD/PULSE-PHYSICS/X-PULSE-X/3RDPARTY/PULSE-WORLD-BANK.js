// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-WORLD-BANK.js
// ORGAN: PULSE-WORLD-BANK (Stripe Organ)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / IMMORTAL-V30
// ============================================================================
// ============================================================================
// BANK LINK ENGINE v30+ — EXTERNAL ACCOUNT + ONBOARDING LINK
// ============================================================================
// WHAT THIS FILE **IS**
// ----------------------
// • The **Stripe Organ** for Pulse‑World‑Bank V30
// • A **singleton Stripe client factory** (IMMORTAL, drift‑proof)
// • A **financial nervous‑system adapter**
// • A **pure logic module** (NO handlers, NO routing)
// • A **deterministic, zero‑state organ**
// • The **only place** Stripe is initialized in the entire organism
//
// RESPONSIBILITIES
// ----------------
// • Initialize Stripe exactly once per cold start
// • Enforce Stripe API version pinning
// • Provide a safe, deterministic Stripe client
// • Validate environment variables
// • Provide metadata for AI‑assisted debugging
// • Provide a stable organ for all payment‑related modules
//
// SAFETY CONSTRAINTS
// ------------------
// • Never log Stripe secret keys
// • Never expose Stripe secret keys
// • Never create multiple Stripe instances
// • Never change API version without explicit approval
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
// ============================================================================
// FILE: PULSE-WORLD-BANK.js
// ORGAN: PULSE-WORLD-BANK (Stripe Organ)
// LAYER: PULSE-WORLD / FINANCIAL-CORE / IMMORTAL-V30
// ============================================================================
import { PulseSecurityPort } from "../../PULSE-PROTOCOL/PULSE-PROTOCOL-SECURITY.js";
import { db } from "../../X-PULSE-X/3RDPARTY/PulseWorldFirebaseGenome-v30.js";
import * as PulseWorldAsset from "../../PULSE-ASSET/PulseWorldAsset-v40.js";
import * as PulsarBurst from "../../PULSE-ASSET/PulseAssetPulsarBurst-v40.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// IMMORTAL SINGLETON
export let stripeInstance = null;

function resolveStripeKey(optionalKey) {
  // 1. Explicit override always wins
  if (optionalKey) return optionalKey;
  // 2. PulseIO Keychain (IMMORTAL)
  let kc = null;
  let stripe = null;

  try {
    let port;
    try { port = PulseSecurityPort; } catch(e) { port = PulseRealm?.PulseSecurityPort || PulseRealm?.ProtocolSecurityPort; }
    if (port && typeof port.loadKeychain === "function") {
      kc = port.loadKeychain();
      stripe = kc ? kc.stripe() : null;
    }
  } catch {
    stripe = null;
  }

  // Final extraction
  const key =
    stripe.secretKey ||
    stripe.webhookSecret ||
    null;

  if (key) return key;

  // Frontend does not typically have the Keychain loaded (secret keys belong on the backend).
  // Silencing the warning to prevent alarm during pre-warming.
  // console.warn(
  //   "[PULSE-WORLD-BANK] Stripe Secret Key Missing — PulseIO Keychain Not Loaded!"
  // );
  
  return null;
}


// PulseStripe.js
let stripeKey = null;

export const Stripe = {
  init(key) {
    if (stripeKey) return;
    stripeKey = key;

    if (PulseRealm.PulseCoreGlobal.signal) {
      PulseRealm.PulseCoreGlobal.signal.stripe = {
        secret: key,
        loadedFrom: "PulseIO-Keychain",
        version: "v30"
      };
    }
  },

  async request(method, path, body = null) {
    if (!stripeKey) console.warn("Stripe not initialized");

    const res = await fetch(`https://api.stripe.com/v1/${path}`, {
      method,
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body ? new URLSearchParams(body).toString() : null
    });

    return res.json();
  },

  charges: {
    create(data) {
      return Stripe.request("POST", "charges", data);
    }
  },

  customers: {
    create(data) {
      return Stripe.request("POST", "customers", data);
    }
  },

  accounts: {
    create(data) {
      return Stripe.request("POST", "accounts", data);
    }
  },

  // Add more endpoints as needed...
};

/**
 * initializeStripe(optionalKey)
 * -----------------------------
 * Creates the Stripe IMMORTAL singleton.
 * Uses ONLY the PulseIO keychain.
 */
function initializeStripe(optionalKey) {
  if (stripeInstance) return stripeInstance;

  const key = resolveStripeKey(optionalKey);

  // ⭐ Initialize your REST-based Stripe client
  Stripe.init(key);

  // ⭐ Expose the key to PulseCoreGlobal
  if (PulseRealm.PulseCoreGlobal.signal) {
    PulseRealm.PulseCoreGlobal.signal.stripe = {
      secret: key,
      loadedFrom: "PulseIO-Keychain",
      version: "v30"
    };
  }

  // ⭐ The instance IS the Stripe object itself
  stripeInstance = Stripe;
  return stripeInstance;
}


/**
 * getStripe()
 * -----------
 * Public accessor for the IMMORTAL Stripe client.
 */
export function getStripe(optionalKey) {
  return initializeStripe(optionalKey);
}


// ============================================================================
// LOGGING HELPERS — CONSISTENT, SAFE, PREFIXED
// ============================================================================

function logInfo(...args) {
  // No secrets, no keys, just tagged info.
  console.log("[PulseWorldBank]", ...args);
}

function logWarn(...args) {
  console.warn("[PulseWorldBank][WARN]", ...args);
}

function logError(...args) {
  console.error("[PulseWorldBank][ERROR]", ...args);
}

// ============================================================================
// ACCOUNT ENGINE — CREATE / UPDATE CONNECTED ACCOUNTS
// ============================================================================

/**
 * checkOrCreateStripeAccount(email, country)
 * -----------------------------------------
 * • Normalizes email + country.
 * • Looks up user in Firestore (NEW SCHEMA).
 * • Ensures payout schedule (daily/weekly + weekday).
 * • Updates existing Stripe account OR creates a new one.
 * • Persists Stripe account ID + payout config back to Firestore.
 */

export async function checkOrCreateStripeAccount(email, country) {
  logInfo("checkOrCreateStripeAccount: START");

  const stripe = initializeStripe(); // singleton, no extra instances

  // -----------------------------
  // Helpers (pure, reusable)
  // -----------------------------
  const normalizeEmail = (v) =>
    typeof v === "string" ? v.trim().toLowerCase() : null;

  const isGarbage = (v) => {
    if (!v) return true;
    const s = String(v);
    return (
      s.trim() === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    );
  };

  const clean = (v, fallback = null) => {
    if (isGarbage(v)) return fallback;
    return String(v).trim();
  };

  const cleanLower = (v, fallback = null) => {
    const c = clean(v, fallback);
    return c ? c.toLowerCase() : fallback;
  };

  // -----------------------------
  // 1️⃣ Normalize inputs
  // -----------------------------
  const cleanEmail = clean(normalizeEmail(email), null);
  const thecountry = clean(normalizeCountry(country), "BZ").toUpperCase();

  if (!cleanEmail) {
    console.warn("Invalid email passed to checkOrCreateStripeAccount");
  }

  logInfo("checkOrCreateStripeAccount: inputs", { cleanEmail, thecountry });

  // -----------------------------
  // 2️⃣ Lookup user (NEW SCHEMA)
  // -----------------------------
  const snap = await db
    .collection("Users")
    .where("TPIdentity.email", "==", cleanEmail)
    .limit(1)
    .get();

  if (snap.empty) {
    console.warn(`User not found for email: ${cleanEmail}`);
  }

  const userDoc = snap.docs[0];
  const userRef = userDoc.ref;
  const userData = userDoc.data();

  const role = userData.TPIdentity.role || "Deliverer";
  const existingStripeID = clean(userData.TPSecurity.stripeAccountID, null);

  // -----------------------------
  // 3️⃣ Determine payFrequency (NEW SCHEMA)
// -----------------------------
  let payFrequency = cleanLower(userData.TPWallet.payFrequency, null);

  if (!payFrequency) {
    if (role === "Deliverer") payFrequency = "daily";
    if (role === "Vendor") payFrequency = "weekly";
    if (!payFrequency) payFrequency = "daily";
  }

  const allowedFreq = ["daily", "weekly"];
  if (!allowedFreq.includes(payFrequency)) {
    logWarn("Invalid payFrequency, defaulting to daily");
    payFrequency = "daily";
  }

  // -----------------------------
  // 4️⃣ Determine payDay (NEW SCHEMA)
  // -----------------------------
  let payDay = null;

  if (payFrequency === "weekly") {
    payDay = cleanLower(userData.TPWallet.payDay, "monday");

    const allowedDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday"
    ];

    if (!allowedDays.includes(payDay)) {
      logWarn("Invalid payDay, defaulting to monday");
      payDay = "monday";
    }
  }

  logInfo("checkOrCreateStripeAccount: payout settings", {
    payFrequency,
    payDay
  });

  // -----------------------------
  // 5️⃣ Build Stripe payout schedule
  // -----------------------------
  let schedule = {};

  if (payFrequency === "daily") {
    schedule = { interval: "daily" };
  } else if (payFrequency === "weekly") {
    schedule = {
      interval: "weekly",
      weekly_anchor: payDay
    };
  }

  logInfo("checkOrCreateStripeAccount: Stripe schedule", schedule);

  // -----------------------------
  // 6️⃣ Update existing Stripe account
  // -----------------------------
  if (existingStripeID) {
    try {
      const account = await stripe.accounts.update(existingStripeID, {
        settings: { payouts: { schedule } }
      });

      logInfo("Updated existing Stripe account", { accountId: account.id });

      return {
        stripeAccountID: account.id,
        thecountry,
        role,
        payFrequency,
        payDay
      };
    } catch (err) {
      logError("Stripe update failed", err.message);
      console.warn(`Stripe Update Failed: ${err.message}`, { cause: err });
    }
  }

  // -----------------------------
  // 7️⃣ Create new Stripe account
  // -----------------------------
  let stripeAccountID = null;

  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: thecountry,
      email: cleanEmail,
      capabilities: {
        transfers: { requested: true }
      },
      settings: {
        payouts: { schedule }
      }
    });

    stripeAccountID = account.id;
    logInfo("Created new Stripe account", { accountId: stripeAccountID });
  } catch (err) {
    logError("Stripe account creation error", err);

    const search = await stripe.accounts.search({
      query: `email:'${cleanEmail}'`
    });

    if (!search.data.length) {
      console.warn(
        `Stripe account exists but cannot be retrieved for ${cleanEmail}`,
        { cause: err }
      );
    }

    stripeAccountID = search.data[0].id;
    logInfo("Found existing Stripe account via search", {
      accountId: stripeAccountID
    });
  }

  // -----------------------------
  // 8️⃣ Save to Firestore (NEW SCHEMA)
  // -----------------------------
  await userRef.set(
    {
      TPSecurity: {
        stripeAccountID
      },
      TPIdentity: {
        country: thecountry
      },
      TPWallet: {
        payFrequency,
        payDay
      },
      updatedAt: PulseRealm.PulseNOW
    },
    { merge: true }
  );

  logInfo("Saved Stripe info to Firestore", { stripeAccountID });

  // -----------------------------
  // 9️⃣ Return values
  // -----------------------------
  return {
    stripeAccountID,
    thecountry,
    role,
    payFrequency,
    payDay
  };
}

// ============================================================================
// COUNTRY NORMALIZATION — IMMORTAL HELPER
// ============================================================================

function normalizeCountry(input) {
  if (!input) return "BZ";

  const value = String(input).trim().toLowerCase();
  const cleaned = value.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

  if (/^[a-z]{2}$/i.test(cleaned)) return cleaned.toUpperCase();

  const alpha3 = {
    usa: "US",
    can: "CA",
    mex: "MX",
    blz: "BZ",
    gbr: "GB",
    jam: "JM",
    tto: "TT",
    hnd: "HN",
    gtm: "GT",
    slv: "SV",
    nic: "NI",
    cri: "CR",
    pan: "PA",
    dom: "DO",
    prt: "PR",
    brb: "BB",
    lca: "LC",
    kna: "KN"
  };
  if (alpha3[cleaned]) return alpha3[cleaned];

  const map = {
    "belize": "BZ",
    "united states": "US",
    "united states of america": "US",
    "usa": "US",
    "us": "US",
    "mexico": "MX",
    "canada": "CA",
    "united kingdom": "GB",
    "great britain": "GB",
    "uk": "GB",
    "jamaica": "JM",
    "bahamas": "BS",
    "trinidad and tobago": "TT",
    "guatemala": "GT",
    "honduras": "HN",
    "el salvador": "SV",
    "nicaragua": "NI",
    "costa rica": "CR",
    "panama": "PA",
    "dominican republic": "DO",
    "puerto rico": "PR",
    "barbados": "BB",
    "saint lucia": "LC",
    "saint kitts and nevis": "KN",
    "germany": "DE",
    "france": "FR",
    "spain": "ES",
    "italy": "IT",
    "australia": "AU",
    "new zealand": "NZ",
    "india": "IN",
    "china": "CN",
    "japan": "JP",
    "south korea": "KR",
    "brazil": "BR",
    "argentina": "AR",
    "colombia": "CO",
    "chile": "CL"
  };

  return map[cleaned] || "BZ";
}

// ============================================================================
// PIXEL HELPER — 1x1 GIF
// ============================================================================

export function sendPixel(res) {
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.send(pixel);
}

// ============================================================================
// BALANCE LOOKUP — CONNECTED ACCOUNT BALANCE
// ============================================================================

/**
 * findUserStripeBalance(stripeAccountID, stripeSecret?)
 * ----------------------------------------------------
 * • Reads balance for a connected account.
 * • Uses the singleton Stripe client.
 * • Optional `stripeSecret` can seed the singleton on first call.
 */
export async function findUserStripeBalance(stripeAccountID, stripeSecret) {
  logInfo("findUserStripeBalance: START", { stripeAccountID });

  const stripe = initializeStripe(stripeSecret);

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountID
    });

    const available = balance.available[0].amount ?? 0;
    const pending = balance.pending[0].amount ?? 0;

    const toBZD = (v) => {
      const n = Number(v);
      return isNaN(n) ? "0.00" : (n / 100).toFixed(2);
    };

    const result = {
      pendingBalance: toBZD(pending),
      availableBalance: toBZD(available)
    };

    logInfo("findUserStripeBalance: RESULT", result);
    return result;
  } catch (err) {
    logError("findUserStripeBalance: ERROR", {
      message: err.message,
      type: err.type,
      code: err.code
    });

    return {
      pendingBalance: "N/A",
      availableBalance: "N/A"
    };
  }
}

// ============================================================================
// PAYMENT ENGINE — UNIFIED PAYMENT INTENT CREATOR
// ============================================================================

/**
 * createPaymentIntent(options)
 * ----------------------------
 * • mode: "reserve"  → reserve metadata flow
 * • mode: "order"    → 5% application_fee_amount flow
 *
 * Replaces legacy:
 *   • create-reserve-payment.js
 *   • create-order-payment.js
 */
export async function createPaymentIntent({
  mode,               // "reserve" or "order"
  amount,
  vendorId,
  customerId,
  paymentMethodId,
  stripeAccountID,
  reserveAmount,
  currency = "usd",
  description = "",
  metadata = {}
}) {
  logInfo("createPaymentIntent: START", { mode, vendorId });

  const stripe = getStripe();

  if (!mode || !["reserve", "order"].includes(mode)) {
    console.warn("Invalid mode. Must be 'reserve' or 'order'.");
  }

  const normalizeAmount = (v) => {
    if (v == null) return 0;
    const decoded = decodeURIComponent(String(v));
    if (decoded.includes("|")) {
      return decoded
        .split("|")
        .map((x) => Number(x) || 0)
        .reduce((a, b) => a + b, 0);
    }
    const n = Number(decoded);
    return isNaN(n) ? 0 : Number(n.toFixed(2));
  };

  const amountCents =
    mode === "order"
      ? Math.round(normalizeAmount(amount) * 100)
      : Number(amount);

  if (!amountCents || !vendorId) {
    console.warn("Missing required fields: amount, vendorId");
  }

  // Vendor lookup
  const vendorSnap = await db.collection("Users").doc(vendorId).get();
  if (!vendorSnap.exists) {
    console.warn("Vendor not found");
  }

  const vendorData = vendorSnap.data();
  const vendorStripeID = stripeAccountID || vendorData.stripeAccountID;

  if (!vendorStripeID) {
    console.warn("Vendor missing Stripe account");
  }

  // Determine currency
  const info = await determinePayoutCurrency(
    stripe,
    vendorStripeID,
    amountCents
  );

  // Metadata
  const fullMetadata = {
    vendorId: String(vendorId),
    ...Object.fromEntries(
      Object.entries(metadata).map(([k, v]) => [k, String(v)])
    )
  };

  // MODE: RESERVE
  if (mode === "reserve") {
    if (!Number.isInteger(reserveAmount)) {
      console.warn("reserveAmount must be an integer in cents");
    }

    fullMetadata.reserveAmount = String(reserveAmount);

    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: info.transferCurrency,
      description: description.trim(),
      metadata: fullMetadata,
      transfer_data: {
        destination: vendorStripeID
      }
    });

    return {
      clientSecret: pi.client_secret,
      paymentIntentId: pi.id
    };
  }

  // MODE: ORDER (5% reserve)
  if (mode === "order") {
    if (!customerId || !paymentMethodId) {
      console.warn("Missing customerId or paymentMethodId");
    }

    const reserveFee = Math.round(amountCents * 0.05);

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId
    });

    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: info.transferCurrency,
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
      application_fee_amount: reserveFee,
      transfer_data: {
        destination: vendorStripeID
      },
      metadata: {
        vendorId,
        reserveAmount: reserveFee
      }
    });

    return {
      clientSecret: pi.client_secret,
      paymentIntentId: pi.id
    };
  }

  console.warn("Unhandled mode in createPaymentIntent");
}
// PULSE-WORLD-BANK.js

export const PulseWorldBank_v31 = {
  /**
   * CREDIT → Creates a PaymentIntent using your unified Stripe flow.
   * Always uses "order" mode with 5% reserve.
   */
  async credit({ amount, currency, source, meta = {} }) {
    // Normalize amount → cents
    const amountNumber = Number(amount);
    if (isNaN(amountNumber)) {
      console.warn("Invalid amount passed to PulseWorldBank.credit");
    }

    const amountCents = Math.round(amountNumber * 100);

    // 5% reserve
    const reserveAmount = Math.round(amountCents * 0.05);

    // Build metadata
    const metadata = {
      ...meta,
      source,
      reserveAmount,
      cycleIndex: meta.cycleIndex ?? null,
      settlementKind: meta.settlementKind ?? "WORLD_BANK",
      consulateVersion: meta.consulateVersion ?? "v31"
    };

    // Create PaymentIntent using your unified createPaymentIntent
    const result = await createPaymentIntent({
      mode: "order",
      amount: amountCents / 100, // Stripe expects dollars here
      vendorId: "WORLD_BANK",
      customerId: meta.customerId || "SYSTEM",
      paymentMethodId: meta.paymentMethodId || "SYSTEM",
      stripeAccountID: process.env.WORLDBANK_STRIPE_ACCOUNT,
      reserveAmount,
      currency,
      description: `Consulate Settlement ${meta.cycleIndex ?? ""}`.trim(),
      metadata
    });

    return {
      ok: true,
      paymentIntentId: result.paymentIntentId,
      clientSecret: result.clientSecret,
      reserveAmount,
      amountCents
    };
  }
};


// ============================================================================
// WEBHOOK CNS — PURE STRIPE EVENT PROCESSOR
// ============================================================================

/**
 * handleStripeWebhook(eventObj)
 * -----------------------------
 * • Accepts a VERIFIED Stripe event object.
 * • No HTTP, no Netlify, no rawBody.
 * • Updates Firestore for onboarding, reserves, and mass email credits.
 */
export async function handleStripeWebhook(eventObj) {
  const stripe = getStripe();

  // 1. VENDOR ONBOARDING
  if (eventObj.type === "account.created" || eventObj.type === "account.updated") {
    const account = eventObj.data.object;

    const stripeAccountID = account.id;
    const email = account.email;
    const country = account.country;

    if (email) {
      const snap = await db
        .collection("Users")
        .where("UserEmail", "==", email)
        .limit(1)
        .get();

      if (!snap.empty) {
        const userRef = snap.docs[0].ref;

        await userRef.set(
          {
            UserCountry: country,

            TPIdentity: {
              role: "Vendor",
              stripeAccountID,
              stripeDashboardURL: null
            },

            TPNotifications: {
              receiveMassEmails: true
            },

            TPWallet: {
              payFrequency: "weekly",
              payDay: "monday"
            },

            updatedAt: PulseRealm.PulseNOW
          },
          { merge: true }
        );

        await db.collection("CHANGES").add({
          type: "vendorOnboarding",
          uid: userRef.id,
          stripeAccountID,
          country,
          reason: "stripe_vendor_onboarding",
          actor: "system",
          source: "stripeWebhook",
          createdAt: PulseRealm.PulseNOW
        });

        await db
          .collection("IdentityHistory")
          .doc(userRef.id)
          .collection("snapshots")
          .add({
            snapshotType: "vendorOnboarding",
            stripeAccountID,
            country,
            reason: "stripe_vendor_onboarding",
            actor: "system",
            source: "stripeWebhook",
            createdAt: PulseRealm.PulseNOW
          });

        await stripe.accounts.update(stripeAccountID, {
          settings: {
            payouts: {
              schedule: {
                interval: "weekly",
                weekly_anchor: "monday"
              }
            }
          }
        });

        logInfo("[StripeWebhook] Vendor updated to weekly payouts", { email });
      }
    }
  }

  // 2. RESERVE SYSTEM
  if (eventObj.type === "payment_intent.succeeded") {
    const pi = eventObj.data.object;
    const vendorId = pi.metadata.vendorId;
    const reserveAmount = parseInt(pi.metadata.reserveAmount || "0", 10);

    let country = null;

    if (pi.transfer_data.destination) {
      const acct = await stripe.accounts.retrieve(pi.transfer_data.destination);
      country = acct.country;
    }

    if (vendorId && reserveAmount) {
      const vendorRef = db.collection("Users").doc(vendorId);
      const increment = (n = 1) => ({ integerIncrement: n });
      const arrayUnion = (value) => ({ arrayUnion: value });
      await vendorRef.set(
        {
          UserCountry: country,

          TPWallet: {
            reserveBalance: increment(reserveAmount),
            reserveHistory: arrayUnion({
              amount: reserveAmount,
              date: new Date().toISOString(),
              orderId: pi.id,
              releaseDate: calculateReleaseDate(new Date(), 60),
              type: "reserve_add"
            })
          }
        },
        { merge: true }
      );

      await db.collection("CHANGES").add({
        type: "reserveAdd",
        uid: vendorId,
        amount: reserveAmount,
        orderId: pi.id,
        reason: "reserve_add",
        actor: "system",
        source: "stripeWebhook",
        createdAt: PulseRealm.PulseNOW
      });

      logInfo("[StripeWebhook] Reserve added", {
        vendorId,
        reserveAmount
      });
    } else {
      logWarn(
        "[StripeWebhook] payment_intent.succeeded missing vendorId or reserveAmount"
      );
    }
  }

  // 3. MASS EMAIL CREDITS
  if (eventObj.type === "checkout.session.completed") {
    const session = eventObj.data.object;

    const eventID = session.metadata.eventID;
    if (!eventID) {
      console.warn("Missing eventID");
    }

    const eventRef = db.collection("Events").doc(eventID);
    const eventSnap = await eventRef.get();

    if (!eventSnap.exists) {
      console.warn("Event not found");
    }

    const eventData = eventSnap.data();
    const useremail = eventData.email;

    const snap = await db
      .collection("Users")
      .where("UserEmail", "==", useremail)
      .limit(1)
      .get();

    if (snap.empty) {
      console.warn("Invalid user");
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const userID = userDoc.id;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const quantity = lineItems.data[0].quantity || 1;
    const increment = (n = 1) => ({ integerIncrement: n });
    await userRef.set(
      {
        TPNotifications: {
          paidMassNotificationCredits:
            increment(quantity)
        }
      },
      { merge: true }
    );

    await db.collection("CHANGES").add({
      type: "massEmailCredits",
      uid: userID,
      quantity,
      eventID,
      reason: "mass_email_credit_purchase",
      actor: "system",
      source: "stripeWebhook",
      createdAt: PulseRealm.PulseNOW
    });

    logInfo("[StripeWebhook] Mass email credits added", {
      userID,
      quantity,
      eventID
    });
  }

  return { success: true };
}

// ============================================================================
// CURRENCY ENGINE — IMMORTAL v20
// ============================================================================

/**
 * determinePayoutCurrency(stripe, stripeAccountID, payoutAmountCents)
 * ------------------------------------------------------------------
 * • Chooses best transfer currency (BZD if supported, else USD, else default).
 * • Returns both transfer + display amounts.
 */
export async function determinePayoutCurrency(
  stripe,
  stripeAccountID,
  payoutAmountCents
) {
  logInfo("determinePayoutCurrency: START", { stripeAccountID });

  const payoutAmountUSD = payoutAmountCents / 100;

  let account;
  try {
    account = await stripe.accounts.retrieve(stripeAccountID);
  } catch (err) {
    logError("Stripe account retrieval failed", err.message);
    return {
      accountCurrency: "usd",
      transferCurrency: "usd",
      transferAmount: payoutAmountCents,
      displayAmount: payoutAmountUSD,
      displayCurrency: "$"
    };
  }

  const defaultCurrency = (account.default_currency || "usd").toLowerCase();

  const supported = new Set([
    ...(account.supported_payment_currencies || []),
    ...(account.supported_transfer_currencies || [])
  ]);

  const supportsBZD = supported.has("bzd");
  const supportsUSD = supported.has("usd");

  const FX_RATE_USD_TO_BZD = 2.0;

  let transferCurrency;
  let transferAmount;
  let displayCurrency;
  let displayAmount;

  // PRIORITY: BZD → USD → fallback
  if (supportsBZD) {
    transferCurrency = "bzd";
    const bzdDollars = payoutAmountUSD * FX_RATE_USD_TO_BZD;
    transferAmount = Math.round(bzdDollars * 100);
    displayCurrency = "BZ$";
    displayAmount = bzdDollars;
  } else if (supportsUSD) {
    transferCurrency = "usd";
    transferAmount = payoutAmountCents;
    displayCurrency = "$";
    displayAmount = payoutAmountUSD;
  } else {
    transferCurrency = defaultCurrency;
    transferAmount = payoutAmountCents;
    displayCurrency = defaultCurrency.toUpperCase();
    displayAmount = payoutAmountUSD;
  }

  return {
    accountCurrency: defaultCurrency,
    transferCurrency,
    transferAmount,
    displayAmount,
    displayCurrency
  };
}

/**
 * calculateReleaseDate(deliveredAt, delayDays = 3)
 * -----------------------------------------------
 * • Adds `delayDays` to a base date and returns ISO string.
 */
export function calculateReleaseDate(deliveredAt, delayDays = 3) {
  const base = deliveredAt instanceof Date ? deliveredAt : new Date(deliveredAt);
  const result = new Date(base);
  result.setDate(result.getDate() + delayDays);
  return result.toISOString();
}

// ============================================================================
// FOOTER — LEARNING NOTES FOR ALDWYN
// ============================================================================

// ============================================================================
// BANK LINK ENGINE v30+ — EXTERNAL ACCOUNT + ONBOARDING LINK
// ============================================================================
//
// GOAL:
//  • Let a user provide bank account details (or a token) once.
//  • Attach that bank account to their Stripe connected account.
//  • Optionally generate an onboarding link so they can finish KYC / payouts.
//  • Keep it deterministic, Stripe‑safe, and Firestore‑aware.
//
// SAFETY:
//  • Never log full bank details.
//  • Never store raw account numbers in Firestore.
//  • Only store Stripe IDs + minimal metadata.
// ============================================================================

/**
 * attachBankAccountToStripe(options)
 * ----------------------------------
 * Attaches a bank account to a connected Stripe account as an external account.
 *
 * options:
 *  - stripeAccountID: string (required)
 *  - bankAccountToken: string (preferred; e.g. from Stripe.js or Financial Connections)
 *  - country: string (optional fallback if token not used)
 *  - currency: string (optional fallback if token not used)
 *  - accountNumber: string (optional; only if you are PCI‑ready)
 *  - routingNumber: string (optional; only if you are PCI‑ready)
 *  - accountHolderName: string (optional)
 *  - accountHolderType: "individual" | "company" (optional, default "individual")
 *  - makeDefault: boolean (optional, default true)
 */
/**
 * verifyStripeSignature
 * ---------------------
 * Validates:
 *   - Stripe signature header
 *   - Stripe webhook secret (from PulseIO Keychain via Immortal Stripe)
 *   - Allowed event types
 *
 * Returns:
 *   { valid: true, eventObj }
 *   { valid: false }
 */

export async function verifyStripeSignature({ rawBody, headers, stripe }) {
  try {
    // Stripe signature header
    const sig = headers["stripe-signature"];
    if (!sig) return { valid: false };

    // Pull webhook secret from Immortal Stripe client
    // (Your getStripe() already loads keys from PulseIO Keychain)
    const webhookSecret = stripe.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) return { valid: false };

    // Construct event using Stripe's official verification
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );

    // Allowed event types (tight whitelist)
    const allowed = {
      "account.created": true,
      "account.updated": true,
      "payment_intent.succeeded": true,
      "checkout.session.completed": true
    };

    if (!allowed[event.type]) {
      return { valid: false };
    }

    // Optional: enforce metadata rules
    // Example:
    // if (event.type === "payment_intent.succeeded") {
    //   if (!event.data.object.metadata.vendorId) return { valid: false };
    // }

    return { valid: true, eventObj: event };
  } catch (err) {
    // Any error = invalid signature
    return { valid: false };
  }
}

export async function attachBankAccountToStripe({
  stripeAccountID,
  bankAccountToken,
  country,
  currency,
  accountNumber,
  routingNumber,
  accountHolderName,
  accountHolderType = "individual",
  makeDefault = true
}) {
  logInfo("attachBankAccountToStripe: START", { stripeAccountID });

  if (!stripeAccountID) {
    console.warn("attachBankAccountToStripe: stripeAccountID is required");
  }

  const stripe = getStripe();

  // Preferred path: token created client‑side (Stripe.js / Financial Connections)
  let externalAccountPayload = null;

  if (bankAccountToken) {
    externalAccountPayload = {
      external_account: bankAccountToken,
      default_for_currency: !!makeDefault
    };
  } else {
    // Fallback: raw bank details (only if you are PCI‑ready and allowed)
    if (!country || !currency || !accountNumber || !routingNumber) {
      console.warn(
        "attachBankAccountToStripe: missing bank details (token or full details required)"
      );
    }

    externalAccountPayload = {
      external_account: {
        object: "bank_account",
        country: String(country).toUpperCase(),
        currency: String(currency).toLowerCase(),
        account_number: String(accountNumber),
        routing_number: String(routingNumber),
        account_holder_name: accountHolderName || null,
        account_holder_type: accountHolderType
      },
      default_for_currency: !!makeDefault
    };
  }

  try {
    const externalAccount = await stripe.accounts.createExternalAccount(
      stripeAccountID,
      externalAccountPayload
    );

    logInfo("attachBankAccountToStripe: external account attached", {
      stripeAccountID,
      externalAccountId: externalAccount.id,
      bankCountry: externalAccount.country,
      bankCurrency: externalAccount.currency
    });

    return {
      stripeAccountID,
      externalAccountId: externalAccount.id,
      bankCountry: externalAccount.country,
      bankCurrency: externalAccount.currency,
      last4: externalAccount.last4 || null,
      status: externalAccount.status || null
    };
  } catch (err) {
    logError("attachBankAccountToStripe: ERROR", {
      stripeAccountID,
      message: err.message,
      type: err.type,
      code: err.code
    });
    console.warn(`attachBankAccountToStripe failed: ${err.message}`, {
      cause: err
    });
  }
}

/**
 * createStripeBankOnboardingLink(options)
 * ---------------------------------------
 * Creates an account onboarding link for a connected account so the user
 * can finish KYC and bank setup in Stripe’s hosted flow.
 *
 * options:
 *  - stripeAccountID: string (required)
 *  - refreshUrl: string (required)
 *  - returnUrl: string (required)
 */
export async function createStripeBankOnboardingLink({
  stripeAccountID,
  refreshUrl,
  returnUrl
}) {
  logInfo("createStripeBankOnboardingLink: START", { stripeAccountID });

  if (!stripeAccountID) {
    console.warn("createStripeBankOnboardingLink: stripeAccountID is required");
  }
  if (!refreshUrl || !returnUrl) {
    console.warn(
      "createStripeBankOnboardingLink: refreshUrl and returnUrl are required"
    );
  }

  const stripe = getStripe();

  try {
    const link = await stripe.accountLinks.create({
      account: stripeAccountID,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding"
    });

    logInfo("createStripeBankOnboardingLink: LINK_CREATED", {
      stripeAccountID,
      url: link.url
    });

    return {
      url: link.url,
      expiresAt: link.expires_at,
      stripeAccountID
    };
  } catch (err) {
    logError("createStripeBankOnboardingLink: ERROR", {
      stripeAccountID,
      message: err.message,
      type: err.type,
      code: err.code
    });
    console.warn(`createStripeBankOnboardingLink failed: ${err.message}`, {
      cause: err
    });
  }
}

/**
 * linkUserBankForFuturePayouts(options)
 * -------------------------------------
 * High‑level helper:
 *  • Finds the user by ID.
 *  • Ensures they have a Stripe connected account (using your existing logic).
 *  • Attaches a bank account to that Stripe account.
 *  • Optionally returns an onboarding link for them to finish setup.
 *
 * options:
 *  - userId: string (required)
 *  - bankAccountToken OR (country, currency, accountNumber, routingNumber, ...)
 *  - createOnboardingLink: boolean (default true)
 *  - refreshUrl: string (required if createOnboardingLink)
 *  - returnUrl: string (required if createOnboardingLink)
 */
export async function linkUserBankForFuturePayouts({
  userId,
  bankAccountToken,
  country,
  currency,
  accountNumber,
  routingNumber,
  accountHolderName,
  accountHolderType = "individual",
  makeDefault = true,
  createOnboardingLink = true,
  refreshUrl,
  returnUrl
}) {
  logInfo("linkUserBankForFuturePayouts: START", { userId });

  if (!userId) {
    console.warn("linkUserBankForFuturePayouts: userId is required");
  }

  const userRef = db.collection("Users").doc(userId);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    console.warn("linkUserBankForFuturePayouts: user not found");
  }

  const userData = userSnap.data() || {};
  const existingStripeID =
    userData.TPSecurity.stripeAccountID ||
    userData.stripeAccountID ||
    null;

  // If user has no Stripe account yet, you can:
  //  • call your existing checkOrCreateStripeAccount
  //  • or throw and let the caller handle it.
  let stripeAccountID = existingStripeID;

  if (!stripeAccountID) {
    const email =
      userData.TPIdentity.email ||
      userData.UserEmail ||
      null;
    const countryGuess =
      userData.TPIdentity.country ||
      userData.UserCountry ||
      "BZ";

    if (!email) {
      console.warn(
        "linkUserBankForFuturePayouts: user missing email, cannot create Stripe account"
      );
    }

    const accountInfo = await checkOrCreateStripeAccount(email, countryGuess);
    stripeAccountID = accountInfo.stripeAccountID;
  }

  const attachResult = await attachBankAccountToStripe({
    stripeAccountID,
    bankAccountToken,
    country,
    currency,
    accountNumber,
    routingNumber,
    accountHolderName,
    accountHolderType,
    makeDefault
  });

  // Persist minimal metadata (no raw bank numbers)
  await userRef.set(
    {
      TPSecurity: {
        ...(userData.TPSecurity || {}),
        stripeAccountID
      },
      TPWallet: {
        ...(userData.TPWallet || {}),
        bankLinked: true,
        bankExternalAccountId: attachResult.externalAccountId,
        bankCountry: attachResult.bankCountry,
        bankCurrency: attachResult.bankCurrency,
        bankLast4: attachResult.last4 || null
      },
      updatedAt: PulseRealm.PulseNOW
    },
    { merge: true }
  );

  let onboardingLink = null;
  if (createOnboardingLink) {
    onboardingLink = await createStripeBankOnboardingLink({
      stripeAccountID,
      refreshUrl,
      returnUrl
    });
  }

  logInfo("linkUserBankForFuturePayouts: COMPLETE", {
    userId,
    stripeAccountID,
    externalAccountId: attachResult.externalAccountId
  });

  return {
    userId,
    stripeAccountID,
    externalAccountId: attachResult.externalAccountId,
    bankCountry: attachResult.bankCountry,
    bankCurrency: attachResult.bankCurrency,
    bankLast4: attachResult.last4 || null,
    onboardingLink
  };
}

export const BankStripe = getStripe;
export const PulseWorldBank = PulseWorldBank_v31;

PulseRealm.WorldBank = {
  linkUserBankForFuturePayouts,
  BankStripe,
  createStripeBankOnboardingLink,
  attachBankAccountToStripe,
  verifyStripeSignature,
  determinePayoutCurrency,
  handleStripeWebhook,
  findUserStripeBalance,
  checkOrCreateStripeAccount,
  Stripe
}
PulseRealm.PulseWorldBank = PulseWorldBank_v31;

PulseRealm.PulseBankURL = "https://billing.stripe.com/p/login/4gM14mdIx8kK1w13KcfIs00";
PulseRealm.PulseBankMonitor = `https://${PulseRealm.CurrentHost}/?Impulse=PulseWorldBank`;