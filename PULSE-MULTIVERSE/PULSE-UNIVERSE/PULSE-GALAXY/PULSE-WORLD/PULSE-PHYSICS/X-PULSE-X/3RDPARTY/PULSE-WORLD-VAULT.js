// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-UNIVERSE/X-PULSE-X/PulseWorldVault-v30.js
// ORGAN: PulseWorldVault-v20 (Vault Organ)
// LAYER: PULSE-WORLD / MEMORY-CORE / VAULT / IMMORTAL-V20
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//  ██╗   ██╗ █████╗ ██╗   ██╗██╗████████╗
//  ██║   ██║██╔══██╗██║   ██║██║╚══██╔══╝
//  ██║   ██║███████║██║   ██║██║   ██║   
//  ╚██╗ ██╔╝██╔══██║██║   ██║██║   ██║   
//   ╚████╔╝ ██║  ██║╚██████╔╝██║   ██║   
//    ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚═╝   ╚═╝   
//
// ============================================================================
// PAGE INDEX — SOURCE OF TRUTH FOR THIS MODULE
// ============================================================================
//
// WHAT THIS FILE **IS**
// ----------------------
// • The **Vault Organ** for Pulse‑World v20
// • A shared backend logic module used by many subsystems
// • A deterministic, side‑effect‑free utility layer
// • A Firestore writer for VaultHistory, IdentityHistory, CHANGES
// • A loyalty + wallet helper
// • A profanity‑cleaner + text normalizer
// • A security patch engine (Twilight Patch)
// • A Stripe balance lookup helper
// • A reminder parser + builder
//
// WHAT THIS FILE **IS NOT**
// -------------------------
// • Not a Netlify handler (except the small router at bottom)
// • Not a UI renderer
// • Not a connector
// • Not a compute engine
// • Not a webhook processor
// • Not allowed to mutate global state
//
// RESPONSIBILITIES
// ----------------
// • Provide Vault‑level utilities for:
//     – Security patching
//     – Loyalty saving/loading
//     – Vault visit logging
//     – Stripe balance lookup
//     – Text sanitization + playful profanity filter
//     – Reminder parsing + normalization
//     – Email template rendering
// • Provide deterministic, reusable logic for all Vault‑related flows
//
// INTERNAL LOGIC SUMMARY
// ----------------------
// • Pure functions for currency, sanitization, loyalty prediction
// • Firestore writes for VaultHistory, CHANGES, IdentityHistory
// • Twilight Patch application + logging
// • Reminder natural language parsing + normalization
// • Stripe balance retrieval for connected accounts
//
// ALLOWED IMPORTS
// ---------------
// • admin, db (PulseWorldGenome-v20)
// • Stripe organ (getStripe)
// • emailTemplates (PulseOSLongTermMemory)
// • No new dependencies unless Aldwyn approves
//
// FORBIDDEN IMPORTS
// -----------------
// • PulseRealm.*, document.*, DOM APIs
// • UI modules
// • Any dynamic import
//
// DEPLOYMENT RULES
// ----------------
// • Runs ONLY on backend (Node)
// • Must remain ESM
// • Must remain deterministic
// • Must remain side‑effect‑free except Firestore writes
//
// SAFETY CONSTRAINTS
// ------------------
// • Never log secrets
// • Never expose internal stack traces
// • Never mutate unrelated user fields
// • Always sanitize text before storing
//
// ============================================================================
// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK
// ============================================================================
//
// Enables:
//   • Self‑healing
//   • Drift detection
//   • Organism‑level routing
//   • Contract validation
//   • Future evolution
//

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, log, warn, error} from "../../../_PROOF/PULSE-PROOF.js";
import { corsHandler } from "./PULSE-WORLD-TRANSPORT.js";
import { redeemSomePulsePoints } from "../PulseWorldPointRedemption-v30.js";
import { getEnvironmentState, getEnvironmentSummary,generateEnvironmentalInsights,generateFutureScenario,generateSmartEnvironmentalAdvice,applyEnvironmentalMultipliers } from "./PulseWorldEcoSystem-v30.js";
import { PulseSecurityPort } from "../../PULSE-PROTOCOL/PULSE-PROTOCOL-SECURITY.js";
import { sendPinEmail, sendAdminAlertEmail, sendAdminInfoEmail, hashPin } from "./PulseWorldEmailAlert-v20.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export function onRequest(config, handler) {
  return async function(request) {
    const req = {
      method: request.method || "GET",
      query: request.query || {},
      body: request.body || {}
    };

    const res = {
      status(code) {
        this._status = code;
        return this;
      },
      json(obj) {
        return { status: this._status || 200, body: obj };
      }
    };

    return handler(req, res);
  };
}

export const deleteField = () => ({ nullValue: null });


// ============================================================================
// IMPORTS
// ============================================================================


const getSafeKeychain = () => {
  let port;
  try { port = PulseSecurityPort; } catch(e) { port = PulseRealm?.PulseSecurityPort || PulseRealm?.SecurityPort?.ProtocolSecurityPort; }
  if (port && typeof port.loadKeychain === "function") {
    try { return port.loadKeychain(); } catch(e) {}
  }
  return {
    email: () => ({ password: null, user: null }),
    stripe: () => ({ secretKey: null, webhookSecret: null }),
    firebase: () => ({ config: null, projectId: null }),
    maps: () => ({ apiKey: null }),
    payments: () => ({ apiKey: null, baseUrl: null }),
    messaging: () => ({ accountSid: null, authToken: null, messagingServiceSid: null }),
    founderInsert: () => ({ apiKey: null }),
    rateLimit: () => ({ pinCollection: null })
  };
};
const kc = getSafeKeychain();

// EMAIL
export const EMAIL_PASSWORD = kc.email().password;

// STRIPE
export const STRIPE_PASSWORD = kc.stripe().secretKey;
export const STRIPE_WEBHOOK_SECRET = kc.stripe().webhookSecret;

export const ACCOUNT_SID = kc.messaging().accountSid;
export const AUTH_TOKEN = kc.messaging().authToken;
export const MESSAGING_SERVICE_SID = kc.messaging().messagingServiceSid;

// RATE LIMITING
export const PIN_COLLECTION = kc.rateLimit().pinCollection;
export const RATE_LIMIT_WINDOW_MS = kc.rateLimit().windowMs;
export const MAX_REQUESTS_PER_WINDOW = kc.rateLimit().maxRequests;
export const PIN_TTL_MS = kc.rateLimit().pinTtlMs;

// PAYMENTS
export const TP_API_KEY = kc.payments().apiKey;
export const BASE_PAYMENT_URL = kc.payments().baseUrl;

// MAPS
export const GOOGLE_MAPS_KEY = kc.maps().apiKey;

// UI / PLACEHOLDER
export const PLACEHOLDER_IMAGE_URL = kc.get("PLACEHOLDER_IMAGE_URL");



export const VAULT_PATCH_TWILIGHT = {
  signature: "Twilight",
  invoked: "2026-04-07T04:00:00-07:00", // 4 AM MST
  version: 2,
  type: "security-data-integrity",
  glyph: "🌒",
  description: "The first protective veil cast by the Vault Spirit during a 4 AM development session.",
  note: "Named 'Twilight' because it was created in the quiet hours before dawn."
};

// ============================================================================
// PIXEL SENDER
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
// SECURITY PATCH LOGGING
// ============================================================================


export function logSecurityPatch(uid, patch, reason = "auto") {
  if (!uid) return;

  try {
    const ref = db
      .collection("securityPatchHistory")
      .doc(uid)
      .collection("entries")
      .doc();

    ref.set({
      uid,
      patchSignature: patch.signature,
      patchVersion: patch.version,
      patchType: patch.type,
      reason,
      invoked: patch.invoked,
      description: patch.description,
      note: patch.note,
      createdAt: PulseRealm.PulseNOW
    })
    .then(() => {
      log("🧾 Security patch logged:", uid, patch.signature);
    })
    .catch(err => {
      error("🔥 logSecurityPatch failed:", err);
    });

  } catch (err) {
    error("🔥 logSecurityPatch failed (sync):", err);
  }
}


// ============================================================================
// APPLY TWILIGHT PATCH
// ============================================================================

export async function applyTwilightPatch(uid, reason = "auto") {
  if (!uid) return;

  try {
    const patch = VAULT_PATCH_TWILIGHT;

    const userRef = db.collection("Users").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      log("❌ User not found:", uid);
      return;
    }

    const data = snap.data() || {};
    const sec = data.TPSecurity || {};

    const updatedSecurity = {
      ...sec,

      patchSignature: patch.signature,
      patchVersion: patch.version,
      patchType: patch.type,
      lastPatchedAt: PulseRealm.PulseNOW,

      requiresPin: sec.requiresPin ?? true,
      dangerMode: sec.dangerMode ?? false,

      calculationVersion: sec.calculationVersion || 1,

      updatedAt: PulseRealm.PulseNOW,
      lastUpdatedAt: PulseRealm.PulseNOW
    };

    await userRef.update({ TPSecurity: updatedSecurity });

    log("🌒 Twilight Patch applied to:", uid, updatedSecurity);

    await logSecurityPatch(uid, patch, reason);
  } catch (err) {
    error("🔥 applyTwilightPatch failed:", err);
  }
}

// ============================================================================
// CURRENCY HELPERS
// ============================================================================

export function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

export function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}

export async function getSystemEarn() {
  try {
    const res = await PulseRealm.aiEarn.getSystemEarnOverview({
      userId: PulseRealm.PULSE_USER_ID,
      userIsOwner: true,
      logStep: () => {}
    });

    return res || {
      orders: [],
      referrals: [],
      referralClicks: [],
      pulseHistory: []
    };
  } catch (err) {
    console.warn("[Vault] getSystemEarn failed:", err);
    return {
      orders: [],
      referrals: [],
      referralClicks: [],
      pulseHistory: []
    };
  }
}


export async function getUserEarn() {
  try {
    const res = await PulseRealm.aiEarn.getUserEarnOverview({
      userId: PulseRealm.PULSE_USER_ID,
      userIsOwner: false,
      logStep: () => {}
    });

    return res || {
      orders: [],
      referrals: [],
      referralClicks: [],
      vaultHistory: [],
      pulseHistory: []
    };
  } catch (err) {
    console.warn("[Vault] getUserEarn failed:", err);
    return {
      orders: [],
      referrals: [],
      referralClicks: [],
      vaultHistory: [],
      pulseHistory: []
    };
  }
}


// ============================================================================
// TEXT SANITIZATION + PLAYFUL PROFANITY FILTER
// ============================================================================

export function sanitizeEverything(input) {
  if (!input) return "";

  let text = String(input);

  text = text.replace(/\s+/g, " ").trim();
  text = text.replace(/[\u200B-\u200F\uFEFF]/g, "");
  text = text.replace(/,/g, " • ");
  text = text.replace(/'/g, "’");
  text = text.replace(/\\/g, "");
  text = text.replace(/\.{2,}/g, ".");

  text = playfulClean(text);

  return text.trim();
}

export function playfulClean(input) {
  if (!input) return "";

  const dictionary = {
    word_f: {
      noun: ["pineapple","coconut","marshmallow","iguana nugget","hurricane dumpling","reef goblin"],
      verb: ["juggle","tap‑dance","boogie","shimmy","cha-cha","crab‑walk"],
      adj: ["spicy","wobbly","chaotic","sun‑kissed","unhinged","reef‑powered"]
    },
    word_s: {
      noun: ["guava","papaya","mango chunk","sand pebble","fruit catastrophe","tide‑sauce"],
      verb: ["splash","scoot","shuffle","wiggle","plop","sploosh"],
      adj: ["messy","funky","wonky","dusty","sticky","soggy"]
    },
    word_b: {
      noun: ["seashell","sunbeam","toucan","pelican","sass‑parrot","beach diva"],
      verb: ["chirp","wiggle","sass","squawk","side‑eye","strut"],
      adj: ["salty","spicy","sassy","stormy","feisty","sun‑dramatic"]
    },
    word_c: {
      noun: ["lava pearl","reef blossom","storm crystal","moon pebble","tidal rune","volcano sprinkle"],
      adj: ["ferocious","untamed","wild‑eyed","tempest‑touched","mythic","overdramatic"]
    },
    word_a: {
      noun: ["iguana","pelican","sand crab","reef turtle","snorkel gremlin","beach potato"],
      adj: ["chunky","sun‑kissed","sandy","reef‑brained","lumpy","tide‑soaked"]
    },
    word_d: {
      noun: ["sand dollar","reef pebble","tide pool","conch shell","sunburn moment","beach oopsie"],
      adj: ["breezy","sun‑drenched","tropical","warm‑hearted","dramatic","over‑toasted"]
    }
  };

  const alias = {
    damn: "word_d",
    darn: "word_d",
    dang: "word_d",
    fuck: "word_f",
    fucking: "word_f",
    shit: "word_s",
    bitch: "word_b",
    cunt: "word_c",
    ass: "word_a",
    asshole: "word_a"
  };

  const detectPOS = (words, i) => {
    const prev = words[i - 1].toLowerCase();
    if (prev && ["a","an","the","my","your","his","her","this","that"].includes(prev)) return "adj";
    if (prev && ["i","you","we","they","he","she","it"].includes(prev)) return "verb";
    return "noun";
  };

  const words = input.split(/\b/);

  const cleaned = words.map((word, i) => {
    const stripped = word.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, "");
    const key = alias[stripped];
    if (!key) return word;

    const pos = detectPOS(words, i);
    const options = dictionary[key][pos] || dictionary[key].noun;
    const replacement = options[Math.floor(Math.random() * options.length)];

    return word[0] === word[0].toUpperCase()
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;
  });

  return cleaned.join("");
}

export function BECLEAN(input) {
  return playfulClean(sanitizeEverything(input));
}

// ============================================================================
// VAULT VISIT LOGGING
// ============================================================================

export function saveLastVaultVisit(userId) {
  if (!userId) return;

  const ref = db.collection("Users").doc(userId);
  const current = ref.fields.TPWallet.mapValue.fields.vaultVisitCount.integerValue || 0;
  const payload = {
    TPWallet: {
      lastVaultVisit: PulseRealm.PulseNOW,
      vaultVisitCount: current + 1
    }
  };


  // USER RECORD UPDATE
  ref.set(payload, { merge: true })
    .then(() => {
      // CHANGES log
      return db.collection("CHANGES").add({
        type: "vaultVisit",
        uid: userId,
        payload,
        reason: "vaultVisit",
        actor: "user",
        source: "app",
        createdAt: PulseRealm.PulseNOW
      });
    })
    .then(() => {
      // IdentityHistory snapshot
      return db
        .collection("IdentityHistory")
        .doc(userId)
        .collection("snapshots")
        .add({
          snapshotType: "vaultVisit",
          payload,
          reason: "vaultVisit",
          actor: "user",
          source: "app",
          createdAt: PulseRealm.PulseNOW
        });
    })
    .then(() => {
      // VaultHistory entry
      return db
        .collection("VaultHistory")
        .doc(userId)
        .collection("entries")
        .add({
          type: "visit",
          userAction: "opened_vault",
          systemResponse: "vault_loaded_successfully",
          metadata: payload,
          createdAt: PulseRealm.PulseNOW
        });
    })
    .catch(err => {
      console.error("🔥 saveLastVaultVisit failed:", err);
    });
}


export async function getLastVaultVisit(userId) {
  const snap = await db.collection("Users").doc(userId).get();

  if (!snap.exists) {
    return {
      lastVaultVisit: null,
      vaultVisitCount: 0
    };
  }

  const data = snap.data().TPWallet || {};

  return {
    lastVaultVisit: data.lastVaultVisit || null,
    vaultVisitCount: data.vaultVisitCount || 0
  };
}

// ============================================================================
// LOYALTY LOAD + SAVE
// ============================================================================

export async function loadLoyalty(userId) {
  const snap = await db.collection("Users").doc(userId).get();
  if (!snap.exists) return null;

  return snap.data().TPLoyalty || null;
}

export async function saveLoyalty(userId, loyalty) {
  const ref = db.collection("Users").doc(userId);

  const allowedFields = [
    "tier",
    "tierKey",
    "tierMultiplier",
    "seasonalActive",
    "seasonalName",
    "seasonalMultiplier",
    "streakCount",
    "streakMultiplier",
    "streakExpires",
    "calculationVersion"
  ];

  const filtered = {};

  for (const key of allowedFields) {
    if (loyalty[key] !== undefined) {
      filtered[key] = loyalty[key];
    }
  }
  filtered.updated = PulseRealm.PulseNOW;

  await ref.set({ TPLoyalty: filtered }, { merge: true });

  // CHANGES log
  await db.collection("CHANGES").add({
    type: "loyaltyUpdate",
    uid: userId,
    payload: filtered,
    reason: "loyaltyUpdate",
    actor: "system",
    source: "app",
    createdAt: PulseRealm.PulseNOW
  });

  // IdentityHistory snapshot
  await db
    .collection("IdentityHistory")
    .doc(userId)
    .collection("snapshots")
    .add({
      snapshotType: "loyaltyUpdate",
      payload: filtered,
      reason: "loyaltyUpdate",
      actor: "system",
      source: "app",
      createdAt: PulseRealm.PulseNOW
    });

  // VaultHistory entry
  await db
    .collection("VaultHistory")
    .doc(userId)
    .collection("entries")
    .add({
      type: "loyalty_update",
      userAction: "vault_loyalty_saved",
      systemResponse: "loyalty_updated",
      metadata: filtered,
      createdAt: PulseRealm.PulseNOW
    });
}

export async function getUserRefByUid(uid) {
  if (!uid) {
    throw new Error("[getUserRefByUid] Missing uid");
  }

  // 1. NEW IDENTITY MODEL (TPIdentity.uid)
  let snap = await db
    .collection("Users")
    .where("TPIdentity.uid", "==", uid)
    .limit(1)
    .get();

  if (!snap.empty) {
    return snap.docs[0].ref;
  }

  // 2. LEGACY MODEL (identity.uid)
  snap = await db
    .collection("Users")
    .where("identity.uid", "==", uid)
    .limit(1)
    .get();

  if (!snap.empty) {
    return snap.docs[0].ref;
  }

  // 3. HARD FAIL
  throw new Error(`[getUserRefByUid] User not found for uid: ${uid}`);
}

async function validatePlaceId(placeId, mapsKey) {
  if (!placeId || typeof placeId !== "string") return false;

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=place_id` +
    `&key=${mapsKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return false;

    const json = await res.json();

    // Google returns:
    // OK → valid
    // INVALID_REQUEST → malformed
    // NOT_FOUND → not a real place_id
    // ZERO_RESULTS → no match
    if (json.status !== "OK") return false;

    // Must contain a real place_id
    if (!json.result.place_id) return false;

    // Must match the requested ID (prevents CID or swapped IDs)
    if (json.result.place_id !== placeId) return false;

    return true;

  } catch (err) {
    return false;
  }
}

// In‑memory map cache (your organism’s memory)
const PulseMapMemory = {};

export const generateMap = onRequest({}, (req, res) => {
  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS")
    return res.status(204).json({});

  const mapsKey = PulseRealm.GOOGLE_MAPS_KEY;
  if (!mapsKey)
    return res.status(500).json({ success: false, error: "Missing mapsKey" });

  const venue = (req.query.venue || "").trim();
  const eventID = req.query.eventID || null;
  const businessID = req.query.businessID || null;

  if (!venue)
    return res.status(400).json({ success: false, error: "Missing venue" });

  // Determine Firestore doc
  let targetRef = null;
  let memoryKey = null;

  if (businessID) {
    targetRef = db.collection("Businesses").doc(businessID);
    memoryKey = `business_${businessID}`;
  } else if (eventID) {
    targetRef = db.collection("Events").doc(eventID);
    memoryKey = `event_${eventID}`;
  } else {
    return res.status(400).json({ success: false, error: "Missing businessID or eventID" });
  }

  // Start chain
  Promise.resolve()
    // Load existing Firestore TPMap
    .then(() => targetRef.get())
    .then(snap => {
      const data = snap.exists ? snap.data() : {};
      const TPMap = data.TPMap || {};

      // If ready in Firestore
      if (TPMap.status === "ready" && TPMap.imageUrl) {
        return res.json({
          success: true,
          ...TPMap,
          savedTo: businessID ? "business" : "event"
        });
      }

      // If generating
      if (TPMap.status === "generating") {
        return res.json({
          success: true,
          pending: true,
          imageUrl: TPMap.imageUrl || null
        });
      }

      // If ready in memory
      if (PulseMapMemory[memoryKey]) {
        return res.json({
          success: true,
          ...PulseMapMemory[memoryKey],
          savedTo: businessID ? "business" : "event",
          fromMemory: true
        });
      }

      // Set lock
      return targetRef
        .set(
          { TPMap: { status: "generating", updatedAt: PulseRealm.PulseNOW } },
          { merge: true }
        )
        .then(() => ({ TPMap }));
    })

    // Geocode
    .then(() => fuzzyGeocode(venue, mapsKey))
    .then(result => {
      if (!result || !result.geometry.location) {
        targetRef.set({ TPMap: { status: "error" } }, { merge: true });
        return res.status(404).json({ success: false, error: "Could not resolve venue" });
      }

      const placeId = result.place_id || null;
      const lat = result.geometry.location.lat;
      const lng = result.geometry.location.lng;

      const staticMapUrl = buildStaticMapUrl(lat, lng, placeId, mapsKey, venue);

      return fetch(staticMapUrl)
        .then(r => r.arrayBuffer())
        .then(buf => ({
          buffer: Buffer.from(buf),
          lat,
          lng,
          placeId,
          result
        }));
    })

    // Save to memory instead of storage
    .then(({ buffer, lat, lng, placeId, result }) => {
      const base64 = buffer.toString("base64");
      const dataUrl = `data:image/png;base64,${base64}`;

      let mapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

      return validatePlaceId(placeId, mapsKey)
        .then(valid => {
          if (valid)
            mapsWebUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

          const TPMapUpdate = {
            status: "ready",
            imageUrl: dataUrl,
            mapsWebUrl,
            lat,
            lng,
            placeId,
            resolvedAddress: result.formatted_address,
            resolvedName: result.displayName || venue,
            updatedAt: PulseRealm.PulseNOW
          };

          // Save to memory
          PulseMapMemory[memoryKey] = TPMapUpdate;

          // Save metadata to Firestore
          return targetRef
            .set({ TPMap: TPMapUpdate }, { merge: true })
            .then(() =>
              res.json({
                success: true,
                ...TPMapUpdate,
                savedTo: businessID ? "business" : "event",
                fromMemory: true
              })
            );
        });
    })

    .catch(err => {
      console.error("Map generation failed:", err);
      return res.status(500).json({ success: false, error: "Map generation failed" });
    });
});



export const getUserCredits = onRequest(
  { 
    region: "us-central1",
    timeoutSeconds: 15,
    memory: "256MiB"
  },
  async (req, res) => {

    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      const rawEmail = req.query.email;
      if (!rawEmail) {
        return res.status(400).json({ error: "Missing email" });
      }

      const email = rawEmail.trim().toLowerCase();

      // -------------------------------------------------------
      // NEW SCHEMA ONLY — TPIdentity.email
      // -------------------------------------------------------
      const q = await db
        .collection("Users")
        .where("TPIdentity.email", "==", email)
        .limit(1)
        .get();

      if (q.empty) {
        return res.json({
          freeUsed: 0,
          freeLimit: 2,
          paidCredits: 0
        });
      }

      const userDoc = q.docs[0];
      const userData = userDoc.data() || {};

      // -------------------------------------------------------
      // NEW SCHEMA — TPNotifications
      // -------------------------------------------------------
      const notif = userData.TPNotifications || {};

      return res.json({
        freeUsed: notif.freeMassNotificationsUsed ?? 0,
        freeLimit: notif.freeMassNotificationsLimit ?? 2,
        paidCredits: notif.paidMassNotificationCredits ?? 0
      });

    } catch (err) {
      console.error("getUserCredits error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

export const sendPin = onRequest({}, (req, res) => {
  const { email, purpose = "login", uid } = req.body || {};

  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: "Method not allowed" });

  if (!email || typeof email !== "string" || !email.includes("@"))
    return res.status(400).json({ success: false, error: "Invalid email" });

  const normalizedEmail = email.trim().toLowerCase();
  let userID = null;
  let userData = null;

  // LOGIN FLOW
  const lookupLogin = () =>
    db.collection("Users")
      .where("TPIdentity.email", "==", normalizedEmail)
      .limit(1)
      .get()
      .then(snap => {
        if (snap.empty)
          return res.status(404).json({ success: false, error: "No account found." });

        const doc = snap.docs[0];
        userID = doc.id;
        userData = doc.data() || {};
        return true;
      });

  // EMAIL CHANGE FLOW
  const lookupEmailChange = () => {
    if (!uid)
      return res.status(400).json({ success: false, error: "Missing uid" });

    return db.collection("Users").doc(uid).get().then(doc => {
      if (!doc.exists)
        return res.status(404).json({ success: false, error: "User not found" });

      userID = uid;
      userData = doc.data() || {};
      return true;
    });
  };

  const flow =
    purpose === "login"
      ? lookupLogin()
      : purpose === "emailChange"
      ? lookupEmailChange()
      : Promise.resolve(res.status(400).json({ success: false, error: "Invalid purpose" }));

  flow.then(result => {
    if (result !== true) return;

    const pinRef = db.collection("Users").doc(userID);

    return pinRef.get().then(pinSnap => {
      const raw = pinSnap.data() || {};
      const security = raw.TPSecurity || {};
      const now = PulseRealm.PulseNOW;

      const history = Array.isArray(security.requestHistory)
        ? security.requestHistory
        : [];

      const filtered = history.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

      if (filtered.length >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          error: "Too many PIN requests",
          retryAfter: RATE_LIMIT_WINDOW_MS - (now - filtered[0])
        });
      }

      filtered.push(now);

      return pinRef
        .set({ TPSecurity: { requestHistory: filtered } }, { merge: true })
        .then(() => {
          const pin = String(Math.floor(100000 + Math.random() * 900000));
          const expiresAt = now + PIN_TTL_MS;

          return pinRef
            .set(
              {
                TPSecurity: {
                  pin: {
                    value: pin,
                    expiresAt,
                    attempts: 0,
                    lastSentAt: now,
                    purpose
                  }
                }
              },
              { merge: true }
            )
            .then(() => ({ pin, expiresAt }));
        });
    });
  })
    .then(result => {
      if (!result || result.success === false) return;

      const { pin, expiresAt } = result;
      const TPIdentity = userData.TPIdentity || {};

      const payload = {
        normalizedEmail,
        pin,
        purpose,
        userID,
        expiresAt,
        name: TPIdentity.name || TPIdentity.displayName || "Friend"
      };

      return sendPinEmail(normalizedEmail, pin, payload).then(emailResult => {
        if (!emailResult.success) {
          db.collection("CHANGES").add({
            type: "pinSendFailed",
            uid: userID,
            pin,
            reason: "pin_send_failed",
            actor: "system",
            source: "sendPin",
            createdAt: PulseRealm.PulseNOW
          });

          return res.status(500).json({ success: false, error: "Failed to send PIN" });
        }

        db.collection("CHANGES").add({
          type: "pinSent",
          uid: userID,
          email: normalizedEmail,
          pin,
          purpose,
          reason: "pin_sent",
          actor: "system",
          source: "sendPin",
          createdAt: PulseRealm.PulseNOW
        });

        return res.json({
          success: true,
          purpose,
          expiresAt
        });
      });
    })
    .catch(err => {
      console.error("sendPin error", err);
      return res.status(500).json({ success: false, error: "Internal error" });
    });
});


export const verifyPin = onRequest({}, (req, res) => {
  const { email, pin, purpose = "login", uid } = req.body || {};

  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: "Method not allowed" });

  if (!pin || typeof pin !== "string" || pin.length !== 6)
    return res.status(400).json({ success: false, error: "Invalid PIN" });

  const normalizedEmail = (email || "").trim().toLowerCase();
  let userID = null;
  let userData = null;
  let pinData = null;

  const handledError = "__handled";

  const fail = (code, error) => {
    res.status(code).json({ success: false, error });
    throw new Error(handledError);
  };

  // 1) PRIMARY LOOKUP: NEW SCHEMA (email + PIN)
  let chain = Promise.resolve().then(() => {
    if (!normalizedEmail) return;

    return db
      .collection("Users")
      .where("TPIdentity.email", "==", normalizedEmail)
      .where("TPSecurity.pin.value", "==", pin)
      .limit(1)
      .get()
      .then(snap => {
        if (!snap.empty) {
          const doc = snap.docs[0];
          userID = doc.id;
          userData = doc.data() || {};
        }
      });
  });

  // 2) LOGIN FLOW (fallback legacy email lookup)
  chain = chain.then(() => {
    if (userID || purpose !== "login") return;

    if (!email || typeof email !== "string" || !email.includes("@"))
      fail(400, "Invalid email");

    return db
      .collection("Users")
      .where("TPIdentity.email", "==", normalizedEmail)
      .where("TPSecurity.pin.value", "==", pin)
      .limit(1)
      .get()
      .then(snap => {
        if (snap.empty) {
          return db
            .collection("Users")
            .where("UserEmail", "==", normalizedEmail)
            .limit(1)
            .get();
        }
        return snap;
      })
      .then(snap => {
        if (snap.empty) fail(404, "No account found.");

        const doc = snap.docs[0];
        userID = doc.id;
        userData = doc.data() || {};
      });
  });

  // 3) EMAIL CHANGE FLOW
  chain = chain.then(() => {
    if (userID || purpose !== "emailChange") return;

    if (!uid) fail(400, "Missing uid for email change.");

    return db
      .collection("Users")
      .doc(uid)
      .get()
      .then(doc => {
        if (!doc.exists) fail(404, "User not found.");

        userID = uid;
        userData = doc.data() || {};
      });
  });

  // Ensure user loaded
  chain = chain.then(() => {
    if (!userID || !userData) fail(500, "User load error");

    const pinRef = db.collection("Users").doc(userID);
    return pinRef.get().then(pinSnap => {
      const raw = pinSnap.data() || {};
      pinData = raw.TPSecurity.pin || null;

      if (!pinData) fail(400, "PIN not found or expired");

      return { pinRef };
    });
  });

  // 4) PURPOSE MISMATCH
  chain = chain.then(({ pinRef }) => {
    if (pinData.purpose && pinData.purpose !== purpose) {
      const logBase = {
        uid: userID,
        pin: pinData,
        purpose,
        reason: "pin_purpose_failed",
        actor: "user",
        source: "verifyPin",
        createdAt: PulseRealm.PulseNOW
      };

      db.collection("CHANGES").add({ type: "pinVerifyFailed", ...logBase });
      db
        .collection("IdentityHistory")
        .doc(userID)
        .collection("snapshots")
        .add({ snapshotType: "pinVerifyFailed", ...logBase });

      return pinRef
        .update({ "TPSecurity.pin": deleteField() })
        .then(() => fail(400, "PIN purpose mismatch"));
    }

    return { pinRef };
  });

  // 5) EXPIRATION
  chain = chain.then(({ pinRef }) => {
    const nowMsGlobal = PulseRealm.PulseNOW;
    let expiresAt = 0;

    if (pinData.expiresAt && typeof pinData.expiresAt.toMillis === "function") {
      expiresAt = pinData.expiresAt.toMillis();
    } else if (typeof pinData.expiresAt === "number") {
      expiresAt = pinData.expiresAt;
    } else if (typeof pinData.expiresAt === "string") {
      expiresAt = Number(pinData.expiresAt) || 0;
    }

    if (nowMsGlobal > expiresAt) {
      const attempts = (pinData.attempts ?? 0) + 1;

      const logBase = {
        uid: userID,
        pin: pinData,
        attempts,
        reason: "pin_expired_failed",
        actor: "user",
        source: "verifyPin",
        createdAt: PulseRealm.PulseNOW
      };

      db.collection("CHANGES").add({ type: "pinVerifyFailed", ...logBase });
      db
        .collection("IdentityHistory")
        .doc(userID)
        .collection("snapshots")
        .add({ snapshotType: "pinVerifyFailed", ...logBase });

      return pinRef
        .update({ "TPSecurity.pin": deleteField() })
        .then(() => fail(400, "PIN expired"));
    }

    return { pinRef };
  });

  // 6) TOO MANY ATTEMPTS
  chain = chain.then(({ pinRef }) => {
    if ((pinData.attempts ?? 0) >= 5) {
      const attempts = (pinData.attempts ?? 0) + 1;

      const logBase = {
        uid: userID,
        pin: pinData,
        attempts,
        reason: "pin_toomanyattempts_failed",
        actor: "user",
        source: "verifyPin",
        createdAt: PulseRealm.PulseNOW
      };

      db.collection("CHANGES").add({ type: "pinVerifyFailed", ...logBase });
      db
        .collection("IdentityHistory")
        .doc(userID)
        .collection("snapshots")
        .add({ snapshotType: "pinVerifyFailed", ...logBase });

      return pinRef
        .update({ "TPSecurity.pin": deleteField() })
        .then(() => fail(400, "Too many attempts"));
    }

    return { pinRef };
  });

  // 7) WRONG PIN
  chain = chain.then(({ pinRef }) => {
    if (pinData.value !== pin) {
      const attempts = (pinData.attempts ?? 0) + 1;

      return pinRef
        .update({ "TPSecurity.pin.attempts": attempts })
        .then(() => {
          const logBase = {
            uid: userID,
            pin: pinData,
            attempts,
            reason: "pin_verification_failed",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          };

          db.collection("CHANGES").add({ type: "pinVerifyFailed", ...logBase });
          db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({ snapshotType: "pinVerifyFailed", ...logBase });

          fail(400, "Invalid PIN");
        });
    }

    return { pinRef };
  });

  // 8) PIN VALID → clear it
  chain = chain.then(({ pinRef }) => {
    return pinRef.update({ "TPSecurity.pin": deleteField() }).then(() => ({
      pinRef
    }));
  });

  // 9) EMAIL CHANGE FLOW
  chain = chain.then(() => {
    if (purpose !== "emailChange") return;

    const existingTPIdentity = userData.TPIdentity || {};

    return db
      .collection("Users")
      .doc(userID)
      .set(
        {
          Email: normalizedEmail,
          UserEmail: normalizedEmail,
          TPIdentity: {
            ...existingTPIdentity,
            email: normalizedEmail
          }
        },
        { merge: true }
      )
      .then(() => {
        const logBase = {
          pin: pinData,
          uid: userID,
          newEmail: normalizedEmail,
          reason: "email_change_verified",
          actor: "user",
          source: "verifyPin",
          createdAt: PulseRealm.PulseNOW
        };

        db.collection("CHANGES").add({
          type: "emailChangeVerified",
          ...logBase
        });

        db
          .collection("IdentityHistory")
          .doc(userID)
          .collection("snapshots")
          .add({
            snapshotType: "emailChangeVerified",
            ...logBase
          });

        res.json({ success: true });
        throw new Error(handledError);
      });
  });

  // 10) TOKEN LOGIC (same order, expanded logging)
  chain = chain.then(() => {
    const tpIdentity = userData.TPIdentity || {};
    const tpWallet = userData.TPWallet || {};

    const identity = {
      uid: userID,
      country: tpIdentity.country || userData.Country || userData.country || null,
      phone: tpIdentity.phone || userData.Phone || userData.phone || null,
      displayName: tpIdentity.displayName || userData.DisplayName || null,
      name: tpIdentity.name || userData.UserName || userData.Name || null,
      email: tpIdentity.email || userData.UserEmail || userData.Email || normalizedEmail,
      photoURL: tpIdentity.photoURL || userData.photoURL || null,
      role: tpIdentity.role || userData.Role || "Customer",
      referralCode: tpIdentity.referralCode || userData.referralCode || null,
      stripeAccountID: tpIdentity.stripeAccountID || userData.stripeAccountID || null,
      stripeDashboardURL: tpIdentity.stripeDashboardURL || null,
      loginLink: tpIdentity.loginLink || null,
      trustedDevice: true,
      paymentSetup: tpIdentity.paymentSetup || userData.PaymentSetup || "Complete",
      identitySetAt: PulseRealm.PulseNOW
    };

    const pulseToken = crypto.randomBytes(32).toString("hex");
    identity.resendToken = pulseToken;

    return db
      .collection("Users")
      .doc(userID)
      .set(
        {
          TPIdentity: {
            ...tpIdentity,
            ...identity
          },
          TPWallet: {
            ...tpWallet,
            lastAppActive: PulseRealm.PulseNOW
          },
          updatedAt: PulseRealm.PulseNOW
        },
        { merge: true }
      )
      .then(() => {
        const logBase = {
          pin: pinData,
          uid: userID,
          identity,
          token: pulseToken,
          reason: "pin_verified",
          actor: "user",
          source: "verifyPin",
          createdAt: PulseRealm.PulseNOW
        };

        db.collection("CHANGES").add({
          type: "pinVerifySuccess",
          ...logBase
        });

        db
          .collection("IdentityHistory")
          .doc(userID)
          .collection("snapshots")
          .add({
            snapshotType: "pinVerifySuccess",
            ...logBase
          });

        res.json({
          success: true,
          token: pulseToken,
          identity
        });
      });
  });

  chain.catch(err => {
    if (err && err.message === handledError) return;
    console.error("verifyPin error", err);
    return res.status(500).json({ success: false, error: "Internal error" });
  });
});

function normalizeDate(d) {
  if (!d) return null;
  d = d.trim();

  // Already ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;

  // MM/DD/YYYY
  let m = d.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const [, mm, dd, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }

  // DD-MM-YYYY
  m = d.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (m) {
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }

  // YYYY/MM/DD
  m = d.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (m) {
    const [, yyyy, mm, dd] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }

  // DD-MMM-YYYY
  m = d.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
  if (m) {
    const months = {
      JAN: "01", FEB: "02", MAR: "03", APR: "04",
      MAY: "05", JUN: "06", JUL: "07", AUG: "08",
      SEP: "09", OCT: "10", NOV: "11", DEC: "12"
    };

    let [, dd, mon, yyyy] = m;
    mon = mon.toUpperCase();
    if (!months[mon]) return null;

    return `${yyyy}-${months[mon]}-${dd.padStart(2, "0")}`;
  }

  return null;
}

function normalizeTime(t) {
  if (!t) return "00:00";

  // Already in HH:MM (24h)
  if (/^\d{2}:\d{2}$/.test(t)) return t;

  // 12-hour with AM/PM
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (m) {
    let [_, h, min, ap] = m;
    h = parseInt(h, 10);
    if (ap.toUpperCase() === "PM" && h !== 12) h += 12;
    if (ap.toUpperCase() === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${min}`;
  }

  // Reject anything else — security must be strict
  return "00:00";
}

export const ics = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }
    try {
      const id = req.query.id;
      if (!id) return res.status(400).send("Missing id");

      const docSnap = await db.collection("Events").doc(id).get();
      if (!docSnap.exists) return res.status(404).send("Event not found");

      const ev = docSnap.data();

      // -----------------------------
      // LOCATION
      // -----------------------------
      function getICSLocation(ev) {
        return (
          ev.resolvedName ||
          ev.resolvedAddress ||
          ev.address ||
          ev.venue ||
          "San Pedro, Belize"
        );
      }

      // -----------------------------
      // ESCAPE
      // -----------------------------
      function icsEscape(str) {
        return (str || "")
          .replace(/\\/g, "\\\\")
          .replace(/,/g, "\\,")
          .replace(/;/g, "\\;")
          .replace(/\n/g, "\\n");
      }

      // -----------------------------
      // DATES
      // -----------------------------
      const rawFromDate =
        ev.fromDate || ev.Fromdate || ev.toDate || ev.Todate;

      const rawToDate =
        ev.toDate || ev.Todate || ev.fromDate || ev.Fromdate;

      const fromDate = normalizeDate(rawFromDate);
      const toDate = normalizeDate(rawToDate);

      if (!fromDate || !toDate) {
        return res.status(400).send("Invalid event dates");
      }

      // -----------------------------
      // TIMES
      // -----------------------------
      const fromTime = normalizeTime(ev.fromTime || ev.Fromtime);
      const toTime = normalizeTime(ev.toTime || ev.Totime);

      // -----------------------------
      // BUILD VEVENT BLOCKS
      // -----------------------------
      let events = "";
      let current = new Date(fromDate);
      const endDateObj = new Date(toDate);

      while (current <= endDateObj) {
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, "0");
        const d = String(current.getDate()).padStart(2, "0");

        const dayStr = `${y}${m}${d}`;

        events +=
`BEGIN:VEVENT
DTSTART:${dayStr}T${fromTime.replace(/:/g,"")}00
DTEND:${dayStr}T${toTime.replace(/:/g,"")}00
SUMMARY:${icsEscape(ev.title || "Event")}
DESCRIPTION:${icsEscape(ev.description || "")}
LOCATION:${icsEscape(getICSLocation(ev))}
END:VEVENT
`;

        current.setDate(current.getDate() + 1);
      }

      // -----------------------------
      // FINAL ICS
      // -----------------------------
      const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pulse World//EN
CALSCALE:GREGORIAN
${events}END:VCALENDAR`;

      const filename = `${(ev.title || "event").replace(/[^\w\-]+/g,"_")}.ics`;

      res.setHeader("Content-Type", "text/calendar; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.status(200).send(ics);

    } catch (err) {
      console.error("ICS error:", err);
      res.status(500).send("Internal error");
    }
  }
);

// ---------------- PIN: SET / CHANGE ----------------
export const setPin = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      let pin = null;
      let uid = null;

      try {
        if (req.method !== "POST") {
          return res.status(405).json({ error: "Method not allowed" });
        }

        ({ uid, pin } = req.body || {});
        if (!uid || !pin || String(pin).length < 4) {
          return res.status(400).json({ error: "Invalid uid or pin" });
        }

        const userRef = db.collection("Users").doc(uid);
        const snap = await userRef.get();
        const data = snap.data() || {};

        const existingSecurity = data.TPSecurity || {};
        const now = PulseRealm.PulseNOW;

        // IMMORTAL‑v20 PIN HASH
        const hash = hashPin(String(pin));

        const updatedSecurity = {
          ...existingSecurity,

          pinHash: hash,
          pinSet: true,
          pinAttempts: 0,
          lastPinChange: now,

          vaultLocked: existingSecurity.vaultLocked ?? false,
          appLocked: existingSecurity.appLocked ?? false,
          requiresPin: existingSecurity.requiresPin ?? false,
          alwaysRequirePin: existingSecurity.alwaysRequirePin ?? false,
          dangerMode: existingSecurity.dangerMode ?? false,
          lastLockReason: existingSecurity.lastLockReason ?? "",
          lastUnlockTime: existingSecurity.lastUnlockTime ?? 0,

          pinResetToken: existingSecurity.pinResetToken ?? "",
          pinResetExpires: existingSecurity.pinResetExpires ?? 0,
          dangerTriggeredAt: existingSecurity.dangerTriggeredAt ?? 0,

          updatedAt: now
        };

        await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

        await db.collection("CHANGES").add({
          type: "pinSet",
          uid,
          reason: "pin_set_or_changed",
          actor: "user",
          source: "setPin",
          createdAt: PulseRealm.PulseNOW
        });

        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("snapshots")
          .add({
            snapshotType: "pinSet",
            reason: "pin_set_or_changed",
            actor: "user",
            source: "setPin",
            createdAt: PulseRealm.PulseNOW
          });

        return res.json({ ok: true });

      } catch (err) {
        await sendAdminAlertEmail("SET PIN Error", err, { uid, pin });
        return res.status(500).json({ error: "Internal error" });
      }
    });
  }
);

// ---------------- PIN: VERIFY ----------------
// ---------------- PIN: VERIFY ----------------
export const verifyOwnerPin = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      let pin = null;
      let uid = null;

      try {
        if (req.method !== "POST") {
          return res.status(405).json({ error: "Method not allowed" });
        }

        ({ uid, pin } = req.body || {});
        if (!uid || !pin) {
          return res.status(400).json({ error: "Missing uid or pin" });
        }

        const userRef = db.collection("Users").doc(uid);
        const snap = await userRef.get();
        const data = snap.data() || {};

        const security = data.TPSecurity || {};
        const pinSet = security.pinSet;
        const pinHash = security.pinHash;

        if (!pinSet || !pinHash) {
          return res.status(400).json({ error: "PIN not set" });
        }

        const now = PulseRealm.PulseNOW;

        // IMMORTAL‑v20 PIN HASH CHECK
        const match = hashPin(pin) === pinHash;

        // WRONG PIN
        if (!match) {
          const attempts = (security.pinAttempts || 0) + 1;
          const danger = attempts >= 5;

          const updatedSecurity = {
            ...security,
            pinAttempts: attempts,
            dangerMode: danger || security.dangerMode || false,
            appLocked: danger || security.appLocked || false,
            lastLockReason: danger
              ? "Too many failed PIN attempts"
              : (security.lastLockReason || ""),
            dangerTriggeredAt: danger ? now : (security.dangerTriggeredAt || 0),
            updatedAt: now
          };

          await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

          await db.collection("CHANGES").add({
            type: "pinVerifyFailed",
            uid,
            attempts,
            updatedSecurity,
            dangerMode: updatedSecurity.dangerMode,
            reason: "pin_verification_failed",
            actor: "user",
            source: "verifyOwnerPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(uid)
            .collection("snapshots")
            .add({
              snapshotType: "pinVerifyFailed",
              attempts,
              updatedSecurity,
              dangerMode: updatedSecurity.dangerMode,
              reason: "pin_verification_failed",
              actor: "user",
              source: "verifyOwnerPin",
              createdAt: PulseRealm.PulseNOW
            });

          return res.status(401).json({
            ok: false,
            error: "Invalid PIN",
            attempts,
            dangerMode: updatedSecurity.dangerMode
          });
        }

        // PIN CORRECT
        const updatedSecurity = {
          ...security,
          pinAttempts: 0,
          appLocked: false,
          vaultLocked: false,
          requiresPin: false,
          dangerMode: false,
          lastUnlockTime: now,
          lastLockReason: "",
          updatedAt: now
        };

        await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

        await db.collection("CHANGES").add({
          type: "pinVerifySuccess",
          uid,
          updatedSecurity,
          reason: "pin_verified",
          actor: "user",
          source: "verifyOwnerPin",
          createdAt: PulseRealm.PulseNOW
        });

        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("snapshots")
          .add({
            snapshotType: "pinVerifySuccess",
            updatedSecurity,
            reason: "pin_verified",
            actor: "user",
            source: "verifyOwnerPin",
            createdAt: PulseRealm.PulseNOW
          });

        return res.json({ ok: true });

      } catch (err) {
        await sendAdminAlertEmail("VERIFY PIN HARD ERROR", err, { uid, pin });
        return res.status(500).json({ error: "Internal error" });
      }
    });
  }
);


export const requestPinReset = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");
    
    let uid = null;

    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      ({ uid } = req.body || {});
      if (!uid) return res.status(400).json({ error: "Missing uid" });

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const identity = data.TPIdentity || {};
      const security = data.TPSecurity || {};

      const email = identity.email || null;
      if (!email) {
        return res.status(400).json({ error: "User has no email" });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const now = PulseRealm.PulseNOW;
      const expiresTs = now.fromMillis(
        now.toMillis() + 15 * 60 * 1000
      );

      const updatedSecurity = {
        ...security,
        pinResetToken: token,
        pinResetExpires: expiresTs,
        updatedAt: now
      };

      await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

      await db.collection("CHANGES").add({
        type: "pinResetRequested",
        uid,
        reason: "pin_reset_requested",
        actor: "user",
        source: "requestPinReset",
        createdAt: PulseRealm.PulseNOW
      });

      await db.collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "pinResetRequested",
          reason: "pin_reset_requested",
          actor: "user",
          source: "requestPinReset",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({ ok: true });

    } catch (err) {
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- PIN: RESET CONFIRM ----------------
// ---------------- PIN: RESET CONFIRM ----------------
export const confirmPinReset = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      const { uid, token, newPin } = req.body || {};
      if (!uid || !token || !newPin || String(newPin).length < 4) {
        return res.status(400).json({ error: "Missing uid, token, or newPin" });
      }

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const security = data.TPSecurity || {};
      const pinResetToken = security.pinResetToken;
      const pinResetExpires = security.pinResetExpires;

      if (!pinResetToken || !pinResetExpires) {
        return res.status(400).json({ error: "No reset in progress" });
      }

      const now = PulseRealm.PulseNOW;

      if (token !== pinResetToken) {
        return res.status(400).json({ error: "Invalid reset token" });
      }

      let expiresMs = 0;
      if (typeof pinResetExpires === "number") expiresMs = pinResetExpires;
      else if (pinResetExpires.toMillis) expiresMs = pinResetExpires.toMillis();

      if (expiresMs < now.toMillis()) {
        return res.status(400).json({ error: "Reset token expired" });
      }

      const hash = await hashPin(String(newPin), 10);

      const updatedSecurity = {
        ...security,
        pinHash: hash,
        pinSet: true,
        pinAttempts: 0,
        lastPinChange: now,
        pinResetToken: "",
        pinResetExpires: 0,
        updatedAt: now
      };

      await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

      await db.collection("CHANGES").add({
        type: "pinResetConfirmed",
        uid,
        reason: "pin_reset_confirmed",
        actor: "user",
        source: "confirmPinReset",
        createdAt: PulseRealm.PulseNOW
      });

      await db.collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "pinResetConfirmed",
          reason: "pin_reset_confirmed",
          actor: "user",
          source: "confirmPinReset",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({ ok: true });

    } catch (err) {
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- SECURITY: GENERIC PATCH ----------------
// ---------------- SECURITY: GENERIC PATCH ----------------
export const updateSecurityState = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");
    
    let uid = null;
    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      ({ uid, VAULT_PATCH_TWILIGHT } = req.body || {});
      if (!uid || !VAULT_PATCH_TWILIGHT || typeof VAULT_PATCH_TWILIGHT !== "object") {
        return res.status(400).json({ error: "Missing uid or VAULT_PATCH_TWILIGHT" });
      }

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const existingSecurity = data.TPSecurity || {};
      const now = PulseRealm.PulseNOW;

      const updatedSecurity = {
        ...existingSecurity,
        ...VAULT_PATCH_TWILIGHT,
        updatedAt: now
      };

      await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

      await db.collection("CHANGES").add({
        type: "securityPatchApplied",
        uid,
        patch: VAULT_PATCH_TWILIGHT,
        reason: "security_patch_applied",
        actor: "system",
        source: "updateSecurityState",
        createdAt: PulseRealm.PulseNOW
      });

      await db.collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "securityPatchApplied",
          patch: VAULT_PATCH_TWILIGHT,
          reason: "security_patch_applied",
          actor: "system",
          source: "updateSecurityState",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({ ok: true });

    } catch (err) {
      await sendAdminAlertEmail("UPDATE SECURITY STATE HARD ERROR", err, { uid });
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- SECURITY: TRIGGER DANGER MODE ----------------
export const triggerDangerMode = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");
    
    let uid = null;
    let reason = null;
    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      ({ uid, reason } = req.body || {});
      if (!uid) return res.status(400).json({ error: "Missing uid" });

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const security = data.TPSecurity || {};
      const now = PulseRealm.PulseNOW;

      const updatedSecurity = {
        ...security,
        dangerMode: true,
        appLocked: true,
        requiresPin: true,
        lastLockReason: reason || "User reported device compromised",
        dangerTriggeredAt: now,
        updatedAt: now
      };

      await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

      await db.collection("CHANGES").add({
        type: "dangerModeTriggered",
        uid,
        patch: updatedSecurity,
        reason: "danger_mode_triggered",
        actor: "user",
        source: "triggerDangerMode",
        createdAt: PulseRealm.PulseNOW
      });

      await db.collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "dangerModeTriggered",
          patch: updatedSecurity,
          reason: "danger_mode_triggered",
          actor: "user",
          source: "triggerDangerMode",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({ ok: true });

    } catch (err) {
      await sendAdminAlertEmail("TRIGGER DANGER MODE HARD ERROR", err, { uid });
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- SECURITY: UNLOCK APP ----------------
// ---------------- SECURITY: UNLOCK APP ----------------
export const unlockApp = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");
    let uid = null;
    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      ({ uid } = req.body || {});
      if (!uid) return res.status(400).json({ error: "Missing uid" });

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const security = data.TPSecurity || {};
      const now = PulseRealm.PulseNOW;

      const updatedSecurity = {
        ...security,
        appLocked: false,
        requiresPin: false,
        dangerMode: false,
        lastUnlockTime: now,
        lastLockReason: "",
        updatedAt: now
      };

      await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

      await db.collection("CHANGES").add({
        type: "securityUpdate",
        uid,
        patch: updatedSecurity,
        reason: "app_unlocked",
        actor: "user",
        source: "unlockApp",
        createdAt: PulseRealm.PulseNOW
      });

      await db.collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "securityUpdate",
          patch: updatedSecurity,
          reason: "app_unlocked",
          actor: "user",
          source: "unlockApp",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({ ok: true });

    } catch (err) {
      await sendAdminAlertEmail("UNLOCK APP HARD ERROR", err, { uid });
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- SECURITY: UNLOCK VAULT ONLY ----------------
// ---------------- SECURITY: UNLOCK VAULT ONLY ----------------
export const unlockVault = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");
    let uid = null;
    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      ({ uid } = req.body || {});
      if (!uid) return res.status(400).json({ error: "Missing uid" });

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const security = data.TPSecurity || {};
      const now = PulseRealm.PulseNOW;

      const updatedSecurity = {
        ...security,
        vaultLocked: false,
        lastUnlockTime: now,
        updatedAt: now
      };

      await userRef.set({ TPSecurity: updatedSecurity }, { merge: true });

      await db.collection("CHANGES").add({
        type: "securityUpdate",
        uid,
        patch: updatedSecurity,
        reason: "vault_unlocked",
        actor: "user",
        source: "unlockVault",
        createdAt: PulseRealm.PulseNOW
      });

      await db.collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "securityUpdate",
          patch: updatedSecurity,
          reason: "vault_unlocked",
          actor: "user",
          source: "unlockVault",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({ ok: true });

    } catch (err) {
      await sendAdminAlertEmail("UNLOCK VAULT HARD ERROR", err, { uid });
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- REMINDERS: DELETE ----------------
export const deleteReminder = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");
    let uid = null;
    let id = null;
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
      }

      ({ uid, id } = req.body || {});
      if (!uid || !id) {
        return res.status(400).json({ success: false, error: "Missing uid or id" });
      }

      const userRef = db.collection("Users").doc(uid);

      await userRef.update({
        [`TPReminders.definitions.${id}`]: deleteField(),
        "TPReminders.updatedAt": PulseRealm.PulseNOW
      });

      await db.collection("CHANGES").add({
        type: "reminderDelete",
        uid,
        reminderId: id,
        reason: "reminder_deleted",
        actor: "user",
        source: "deleteReminder",
        createdAt: PulseRealm.PulseNOW
      });

      return res.json({ success: true });

    } catch (err) {
      console.error("deleteReminder error:", err);
      return res.status(500).json({ success: false, error: "Internal error" });
    }
  }
);

// ---------------- REMINDERS: ADD ----------------
// ---------------- REMINDERS: ADD ----------------
export const addReminder = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      const { uid, reminder } = req.body || {};
      if (!uid || !reminder) {
        return res.status(400).json({ error: "Missing uid or reminder object" });
      }

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const existing = data.TPReminders.definitions || {};
      const id = reminder.id || crypto.randomUUID();

      const newReminder = {
        ...reminder,
        id,
        createdAt: PulseRealm.PulseNOW
      };

      await userRef.set(
        {
          TPReminders: {
            definitions: {
              ...existing,
              [id]: newReminder
            },
            updatedAt: PulseRealm.PulseNOW
          }
        },
        { merge: true }
      );

      await db.collection("CHANGES").add({
        type: "reminderAdd",
        uid,
        reminderId: id,
        reminder: newReminder,
        reason: "reminder_added",
        actor: "user",
        source: "addReminder",
        createdAt: PulseRealm.PulseNOW
      });

      return res.json({ ok: true, id });

    } catch (err) {
      console.error("addReminder error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- REMINDERS: GET ----------------
export const getReminders = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      const { uid } = req.body || {};
      if (!uid) {
        return res.status(400).json({ error: "Missing uid" });
      }

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const reminders = data.TPReminders.definitions || {};

      return res.json({ ok: true, reminders });

    } catch (err) {
      console.error("getReminders error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ---------------- USER SECURITY (TPSecurity) ----------------
export const getUserSecurity = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 15,
    memory: "256MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const { uid } = req.body || {};
      if (!uid) {
        return res.status(400).json({ error: "Missing uid" });
      }

      const userRef = await getUserRefByUid(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      return res.json({
        ok: true,
        TPSecurity: data.TPSecurity || {}
      });

    } catch (err) {
      console.error("getUserSecurity error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

export const getTriggeredReminders = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      if (req.method !== "POST") {
        return res.status(405).send("Method not allowed");
      }

      const { uid } = req.body || {};
      if (!uid) {
        return res.status(400).json({
          success: false,
          error: "Missing uid",
          triggered: []
        });
      }

      // Load user + loyalty + environment state
      const userRef = await getUserRefByUid(uid);
      const snap = await userRef.get();
      const userData = snap.data() || {};

      const loyalty = userData.TPLoyalty || {};
      const envState = userData.TPEnvironment || {};

      // Evaluate reminders
      const messages = await runReminderEvaluation(uid, loyalty, envState);

      // -----------------------------
      // WRITE TPReminders block
      // -----------------------------
      const prev = userData.TPReminders || {};

      await userRef.set(
        {
          TPReminders: {
            lastTriggeredAt: PulseRealm.PulseNOW,
            lastTriggeredMessages: messages,
            lastTriggerCount: messages.length,
            lastTriggerReason: "reminder_check",
            lastTriggerSource: "getTriggeredReminders",

            totalTriggers: (prev.totalTriggers || 0) + 1,
            unreadCount: (prev.unreadCount || 0) + messages.length,
            lastSeenAt: prev.lastSeenAt || null
          }
        },
        { merge: true }
      );

      // -----------------------------
      // CHANGES LOG
      // -----------------------------
      await db.collection("CHANGES").add({
        type: "reminderEvaluation",
        uid,
        triggered: messages,
        reason: "reminder_check",
        actor: "system",
        source: "getTriggeredReminders",
        createdAt: PulseRealm.PulseNOW
      });

      // -----------------------------
      // IdentityHistory SNAPSHOT
      // -----------------------------
      await db
        .collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .add({
          snapshotType: "reminderEvaluation",
          triggered: messages,
          reason: "reminder_check",
          actor: "system",
          source: "getTriggeredReminders",
          createdAt: PulseRealm.PulseNOW
        });

      return res.json({
        success: true,
        triggered: messages
      });

    } catch (err) {
      console.error("getTriggeredReminders error:", err);
      return res.status(500).json({
        success: false,
        error: "Internal error",
        triggered: []
      });
    }
  }
);

export async function handleBeachQualityIntent(envState) {
  const sarg = envState.sargassum.data.value;
  const waves = envState.waves.data.heightFt[0];
  const wind = envState.weather.data.current.wind_speed_10m;

  if (sarg == null || waves == null || wind == null) {
    return "🏖️ I can’t read the full beach vibe right now — give me another moment.";
  }

  // ───────────────────────────────────────────────
  // TEXT DESCRIPTIONS
  // ───────────────────────────────────────────────
  let sargText =
    sarg > 0.7 ? "🟤 Heavy sargassum" :
    sarg > 0.3 ? "🌾 Moderate sargassum" :
    "🏖️ Low sargassum";

  let waveText =
    waves < 1.5 ? "🌊 Calm waves" :
    waves < 3 ? "🌤 Moderate waves" :
    waves < 6 ? "🌬 Choppy waves" :
    "🌪 Rough waves";

  let windText =
    wind < 8 ? "🍃 Light wind" :
    wind < 15 ? "🌬 Breezy" :
    wind < 25 ? "💨 Windy" :
    "🌪 Strong wind";

  // ───────────────────────────────────────────────
  // SCORING
  // ───────────────────────────────────────────────
  let score = 0;

  if (sarg < 0.3) score += 2;
  else if (sarg < 0.7) score += 1;

  if (waves < 1.5) score += 2;
  else if (waves < 3) score += 1;

  if (wind < 10) score += 2;
  else if (wind < 18) score += 1;

  // ───────────────────────────────────────────────
  // QUALITY LABEL
  // ───────────────────────────────────────────────
  let quality =
    score >= 5 ? "🌴 <b>Excellent Beach Day</b>" :
    score >= 3 ? "🌤 <b>Good Beach Conditions</b>" :
    score >= 2 ? "🌬 <b>Fair Beach Conditions</b>" :
    "🌪 <b>Poor Beach Conditions</b>";

  // ───────────────────────────────────────────────
  // OPTIONAL MAGICAL FLAVOR
  // ───────────────────────────────────────────────
  let vibeLine = "";

  if (score >= 5) {
    vibeLine = pick([
      "✨ The Island practically invites you into the water.",
      "🌺 The breeze, the waves, the energy — everything aligns today.",
      "😎 A perfect day for Secret Beach or any calm shoreline."
    ]);
  } else if (score >= 3) {
    vibeLine = pick([
      "🌴 A solid beach day — nothing extreme, just island comfort.",
      "🌤 Good vibes overall — the sea feels friendly.",
      "🍃 A breezy but pleasant day along the coast."
    ]);
  } else if (score >= 2) {
    vibeLine = pick([
      "🌬 Not the calmest day — but still workable if you're craving the sea.",
      "🌾 Conditions are mixed — choose sheltered spots.",
      "🌤 Some beaches will feel better than others today."
    ]);
  } else {
    vibeLine = pick([
      "🌪 The sea is restless — maybe explore inland today.",
      "🌫️ Not the best beach moment — the Island whispers caution.",
      "💨 Strong winds and rough waves — better vibes tomorrow."
    ]);
  }

  // ───────────────────────────────────────────────
  // FINAL REPLY
  // ───────────────────────────────────────────────
  return (
    `${quality}<br>` +
    `${vibeLine}<br><br>` +
    `• ${sargText}<br>` +
    `• ${waveText} (${waves.toFixed(1)} ft)<br>` +
    `• ${windText} (${wind} km/h)<br><br>` +
    pick([
      "🌴 Want me to show you the best beaches right now?",
      "✨ Curious which beaches match this vibe?",
      "🌺 Want nearby beach recommendations?",
      "🌙 I can check tomorrow’s beach vibe too."
    ])
  );
}

export async function handleHeatIntent(envState) {
  const w = envState.weather.data.current;
  if (!w) {
    return "🌡️ I’m not sensing the island’s heat right now — try again in a moment.";
  }

  const cToF = c => (c * 9) / 5 + 32;
  const tempC = w.temperature_2m;
  const feelsC = w.apparent_temperature ?? tempC;
  const humidity = w.relative_humidity_2m;

  const tempF = cToF(tempC).toFixed(1);
  const feelsF = cToF(feelsC).toFixed(1);

  // Heat danger scale
  let danger = "";
  if (feelsC >= 42) danger = "🔥 <b>Extreme Heat</b> — limit sun exposure.";
  else if (feelsC >= 38) danger = "🌡️ <b>Very Hot</b> — hydrate often.";
  else if (feelsC >= 34) danger = "☀️ <b>Hot & Humid</b> — take it easy out there.";
  else if (feelsC >= 30) danger = "🌤️ <b>Warm</b> — comfortable but still tropical.";
  else danger = "🌥️ <b>Mild</b> — the island feels gentle right now.";

  return (
    `🔥 <b>Island Heat Check</b><br>` +
    `• Temperature: <b>${tempC}°C / ${tempF}°F</b><br>` +
    `• Feels Like: <b>${feelsC}°C / ${feelsF}°F</b><br>` +
    `• Humidity: <b>${humidity}%</b><br><br>` +
    `${danger}`
  );
}


export async function handleWindIntent(envState) {
  const speed = envState.weather.data.current.wind_speed_10m;
  if (speed == null) return "💨 I couldn’t read the wind right now.";

  const kmhToMph = kmh => kmh * 0.621371;
  const mph = kmhToMph(speed).toFixed(1);

  if (speed < 8)
    return `🍃 <b>Calm Winds</b><br>Speed: <b>${speed} km/h / ${mph} mph</b><br>Perfect for snorkeling.`;

  if (speed < 15)
    return `🌬 <b>Gentle Breeze</b><br>Speed: <b>${speed} km/h / ${mph} mph</b><br>Great for most activities.`;

  if (speed < 25)
    return `💨 <b>Windy</b><br>Speed: <b>${speed} km/h / ${mph} mph</b><br>Waves may be choppy.`;

  return `🌪 <b>Strong Winds</b><br>Speed: <b>${speed} km/h / ${mph} mph</b><br>Not ideal for snorkeling or small boats.`;
}

export async function handleWavesIntent(envState) {
  const waves = envState.waves.data;
  const heightFt = waves.heightFt[0];

  if (heightFt == null)
    return "🌊 I couldn’t read the sea right now — she’s being shy.";

  const heightM = waves.heightM[0].toFixed(2);

  const h3 = waves.heightFt[3] ?? null;
  const h6 = waves.heightFt[6] ?? null;

  let preview = "";
  if (h3 !== null || h6 !== null) {
    preview = "<br><br>📈 <b>Later Today</b><br>";
    if (h3 !== null) preview += `• In 3 hrs: <b>${h3.toFixed(1)} ft</b><br>`;
    if (h6 !== null) preview += `• In 6 hrs: <b>${h6.toFixed(1)} ft</b>`;
  }

  const dir = waves.derived.friendlyDirection;
  const swell = waves.derived.swellType;

  let vibe = dir ? `Waves rolling ${dir}.<br>` : "";
  vibe += swell ? `A bit of ${swell} today.<br>` : "";

  let status = "";
  if (heightFt < 1.5)
    status = `🌊 <b>Calm Seas</b><br>${vibe}Perfect for snorkeling — the sea’s in a gentle mood.`;
  else if (heightFt < 3)
    status = `🌤 <b>Moderate Seas</b><br>${vibe}Still friendly for most tours.`;
  else if (heightFt < 6)
    status = `🌬 <b>Choppy Seas</b><br>${vibe}She’s waking up a bit — expect a livelier ride.`;
  else
    status = `🌪 <b>Rough Seas</b><br>${vibe}Not the best for small boats today.`;

  return status + preview;
}

export async function handleSargassumIntent(envState) {
  const value = envState.sargassum.data.value;
  if (value == null)
    return "🌿 I couldn’t read the sargassum right now — currents are being secretive.";

  if (value > 0.7)
    return "🟤 <b>Heavy Sargassum</b><br>Quite a bit drifting in today — the island’s seen worse, but it’s noticeable.";
  if (value > 0.3)
    return "🌾 <b>Moderate Sargassum</b><br>A few patches around, nothing dramatic.";
  return "🏖️ <b>Low Sargassum</b><br>Beaches looking lovely — nice and clear.";
}

export async function handleStormsIntent(envState) {
  const storms = envState.storms.data.activeStorms ?? [];
  if (!storms || storms.length === 0)
    return "⛅ <b>No Storms Detected</b><br>The island feels calm and steady.";

  const s = storms[0];
  return `🌀 <b>${s.type}</b> Detected<br>Name: <b>${s.name}</b>`;
}

export function extractWildlifeTarget(text) {
  const lower = text.toLowerCase();

  const animals = [
    "turtle","turtles","sea turtle","sea turtles",
    "dolphin","dolphins",
    "manatee","manatees","sea cow","sea cows",
    "ray","rays","stingray","stingrays","sting ray","sting rays",
    "shark","sharks","nurse shark","nurse sharks","reef shark","reef sharks",
    "iguana","iguanas",
    "crab","crabs","hermit crab","hermit crabs",
    "jellyfish","jellies",
    "croc","crocs","crocodile","crocodiles",
    "fish","fishes","reef fish","reef fishes",
    "puffer","pufferfish","puffers",
    "octopus","octopi",
    "conch","conchs","conches",
    "pelican","pelicans"
  ];

  return animals.find(a => lower.includes(a)) || null;
}

export async function handleWildlifeIntent(envState, text) {
  const w = envState.wildlife.data;
  if (!w) return "✨ No special wildlife sightings right now.";

  const normalize = k => k.toLowerCase().replace(/[_ ]+/g, " ");

  // Canonical supported wildlife
  const supported = new Set([
    "turtle","turtles","sea turtle","sea turtles",
    "dolphin","dolphins",
    "manatee","manatees","sea cow","sea cows",
    "ray","rays","stingray","stingrays","sting ray","sting rays",
    "shark","sharks","nurse shark","nurse sharks","reef shark","reef sharks",
    "iguana","iguanas",
    "crab","crabs","hermit crab","hermit crabs",
    "jellyfish","jellies",
    "croc","crocs","crocodile","crocodiles",
    "fish","fishes","reef fish","reef fishes",
    "puffer","pufferfish","puffers",
    "octopus","octopi",
    "conch","conchs","conches",
    "pelican","pelicans"
  ]);

  // Icon map
  const icons = {
    turtle: "🐢", turtles: "🐢", "sea turtle": "🐢", "sea turtles": "🐢",
    dolphin: "🐬", dolphins: "🐬",
    manatee: "🦭", manatees: "🦭", "sea cow": "🦭", "sea cows": "🦭",
    ray: "🐟", rays: "🐟", stingray: "🐟", stingrays: "🐟", "sting ray": "🐟", "sting rays": "🐟",
    shark: "🦈", sharks: "🦈", "nurse shark": "🦈", "nurse sharks": "🦈", "reef shark": "🦈", "reef sharks": "🦈",
    iguana: "🦎", iguanas: "🦎",
    crab: "🦀", crabs: "🦀", "hermit crab": "🦀", "hermit crabs": "🦀",
    jellyfish: "🪼", jellies: "🪼",
    croc: "🐊", crocs: "🐊", crocodile: "🐊", crocodiles: "🐊",
    fish: "🐠", fishes: "🐠", "reef fish": "🐠", "reef fishes": "🐠",
    puffer: "🐡", pufferfish: "🐡", puffers: "🐡",
    octopus: "🐙", octopi: "🐙",
    conch: "🐚", conchs: "🐚", conches: "🐚",
    pelican: "🐦", pelicans: "🐦"
  };

  // Extract target from text
  const lower = text.toLowerCase();
  const target = [...supported].find(s => lower.includes(s));

  // If user asked about a specific animal
  if (target) {
    const q = normalize(target);

    // Active wildlife normalized
    const activeNormalized = Object.entries(w)
      .filter(([, v]) => v === true)
      .map(([k]) => normalize(k));

    // Supported but not active
    if (!activeNormalized.includes(q)) {
      return `🌿 <b>${target}</b> isn’t active right now.`;
    }

    // Supported AND active
    const icon = icons[target] ?? "✨";
    return `🌿 <b>Recent Wildlife</b><br>• ${icon} ${target}`;
  }

  // Default: list all active wildlife
  const active = Object.entries(w)
    .filter(([, v]) => v === true)
    .map(([k]) => `${icons[normalize(k)] ?? "✨"} ${k}`);

  if (active.length === 0)
    return "✨ No Special Wildlife Sightings Right Now.";

  return `🌿 <b>Recent Wildlife</b><br>` + active.map(a => `• ${a}`).join("<br>");
}

export async function handleHumidityIntent(envState) {
  const h = envState.weather.data.current.relative_humidity_2m;
  if (h == null) return "I Can’t Read the Humidity Right Now.";

  return `💧 <b>Humidity</b><br>Currently around <b>${h}%</b>.`;
}


export function getDayName(offset) {
  const today = new Date();
  const target = new Date(today);
  target.setDate(today.getDate() + offset);

  return target.toLocaleDateString("en-US", { weekday: "long" });
}

export async function handleWeatherWeekIntent(envState) {
  const week = envState.weather.week;

  if (!week || !Array.isArray(week) || week.length === 0) {
    return "I’m not seeing the weekly forecast right now — the island spirits might still be whispering it into the breeze.";
  }

  const cToF = c => (c * 9) / 5 + 32;

  const lines = week.slice(0, 7).map((d, i) => {
    const dayName = getDayName(i);
    const desc = d.description || "calm island skies";

    const highC = d.high ?? null;
    const lowC = d.low ?? null;

    const high = highC !== null ? `${cToF(highC).toFixed(0)}°F / ${highC}°C` : "—";
    const low  = lowC  !== null ? `${cToF(lowC).toFixed(0)}°F / ${lowC}°C`  : "—";

    const rain = d.rain_chance ?? null;
    const rainText = rain !== null ? `${rain}% chance of rain` : "Rain chance unknown";

    return (
      `<b>${dayName}</b><br>` +
      `${desc} • ${rainText}<br>` +
      `High: <b>${high}</b> • Low: <b>${low}</b>`
    );
  });

  return (
    `🌤️ <b>7‑Day Island Outlook</b><br><br>` +
    lines.join("<br><br>") +
    `<br><br>If you want a deeper look at any specific day, just ask.`
  );
}

export async function handleWeatherIntent(envState) {
  const w = envState.weather.data.current;
  if (!w) return "🌥️ I couldn’t read the weather right now.";

  const cToF = c => (c * 9) / 5 + 32;
  const kmhToMph = kmh => kmh * 0.621371;

  const tempF = cToF(w.temperature_2m).toFixed(1);
  const feelsF = cToF(w.apparent_temperature ?? w.temperature_2m).toFixed(1);

  const rain = envState.weather.data.daily.precipitation_probability_max[0] ?? null;
  const rainText = rain !== null ? `${rain}% chance of rain` : "Rain chance unknown";

  const codeMap = {
    0: "clear skies",
    1: "mostly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "foggy",
    48: "dense fog",
    51: "light drizzle",
    53: "drizzle",
    55: "heavy drizzle",
    61: "light rain",
    63: "rain",
    65: "heavy rain",
    71: "light snow",
    80: "light showers",
    81: "showers",
    82: "heavy showers"
  };

  const desc = codeMap[w.weather_code] ?? "typical island weather";

  return (
    `🌦️ <b>Current Weather</b><br>` +
    `• Temperature: <b>${tempF}°F / ${w.temperature_2m}°C</b><br>` +
    `• Feels Like: <b>${feelsF}°F / ${w.apparent_temperature ?? w.temperature_2m}°C</b><br>` +
    `• Conditions: <b>${desc}</b><br>` +
    `• Humidity: <b>${w.relative_humidity_2m}%</b><br>` +
    `• Wind: <b>${kmhToMph(w.wind_speed_10m).toFixed(1)} mph / ${w.wind_speed_10m} km/h</b><br>` +
    `• Rain: <b>${rainText}</b>`
  );
}

export async function handleWeatherTodayIntent(envState) {
  const daily = envState.weather.data.daily;
  if (!daily) return "I can’t see today’s forecast right now.";

  const cToF = c => (c * 9) / 5 + 32;

  const highC = daily.temperature_2m_max[0] ?? null;
  const lowC  = daily.temperature_2m_min[0] ?? null;

  const high = highC !== null ? `${cToF(highC).toFixed(0)}°F / ${highC}°C` : "—";
  const low  = lowC  !== null ? `${cToF(lowC).toFixed(0)}°F / ${lowC}°C`  : "—";

  const rain = daily.precipitation_probability_max[0] ?? null;
  const rainText = rain !== null ? `<br>Chance of rain: <b>${rain}%</b>` : "";

  return (
    `🌤 <b>Today’s Forecast</b><br>` +
    `High: <b>${high}</b><br>` +
    `Low: <b>${low}</b>${rainText}`
  );
}

export async function handleWeatherTomorrowIntent(envState) {
  const daily = envState.weather.data.daily;
  if (!daily) return "Tomorrow’s forecast isn’t showing yet.";

  const cToF = c => (c * 9) / 5 + 32;

  const highC = daily.temperature_2m_max[1] ?? null;
  const lowC  = daily.temperature_2m_min[1] ?? null;

  const high = highC !== null ? `${cToF(highC).toFixed(0)}°F / ${highC}°C` : "—";
  const low  = lowC  !== null ? `${cToF(lowC).toFixed(0)}°F / ${lowC}°C`  : "—";

  const rain = daily.precipitation_probability_max[1] ?? null;
  const rainText = rain !== null ? `<br>Chance of rain: <b>${rain}%</b>` : "";

  return (
    `🌅 <b>Tomorrow’s Forecast</b><br>` +
    `High: <b>${high}</b><br>` +
    `Low: <b>${low}</b>${rainText}`
  );
}

export async function handleWeatherNowIntent(envState) {
  const w = envState.weather.data.current;
  if (!w) {
    return "I’m not seeing the current weather right now — try again in a moment.";
  }

  const cToF = c => (c * 9) / 5 + 32;
  const kmhToMph = kmh => kmh * 0.621371;

  const tempF  = cToF(w.temperature_2m).toFixed(1);
  const feelsF = cToF(w.apparent_temperature ?? w.temperature_2m).toFixed(1);

  const wind = w.wind_speed_10m ?? null;

  const codeMap = {
    0: "clear skies",
    1: "mostly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "foggy",
    48: "dense fog",
    51: "light drizzle",
    53: "drizzle",
    55: "heavy drizzle",
    61: "light rain",
    63: "rain",
    65: "heavy rain",
    71: "light snow",
    80: "light showers",
    81: "showers",
    82: "heavy showers"
  };

  const desc = codeMap[w.weather_code] ?? "typical island weather";

  const rain = envState.weather.data.daily.precipitation_probability_max[0] ?? null;
  const rainText = rain !== null ? `<br>Rain Chance: <b>${rain}%</b>` : "";

  const windText =
    wind !== null
      ? `<br>Wind: <b>${kmhToMph(wind).toFixed(1)} mph / ${wind} km/h</b>`
      : "";

  return (
    `🌤 <b>Right Now</b><br>` +
    `Feels Like: <b>${feelsF}°F / ${w.apparent_temperature ?? w.temperature_2m}°C</b><br>` +
    `Conditions: <b>${desc}</b><br>` +
    `Temperature: <b>${tempF}°F / ${w.temperature_2m}°C</b>` +
    `${windText}${rainText}`
  );
}

export async function handleMoonIntent(envState) {
  const phase = envState.moon.data.phase;
  if (phase == null) return "🌙 I Couldn’t Read the Moon Phase Right Now.";

  if (phase >= 0.4 && phase <= 0.6)
    return "🌕 <b>Full Moon</b><br>The Island Feels Extra Magical Tonight.";

  if (phase < 0.1)
    return "🌑 <b>New Moon</b><br>Perfect for Stargazing.";

  if (phase < 0.25)
    return "🌒 <b>Waxing Crescent</b><br>A Gentle Glow over the Island.";

  if (phase < 0.4)
    return "🌓 <b>First Quarter</b><br>Bright and Balanced.";

  if (phase < 0.75)
    return "🌖 <b>Waning Gibbous</b><br>Soft Moonlight Across the Sea.";

  return "🌘 <b>Waning Crescent</b><br>A Quiet, Peaceful Night Sky.";
}

function handleMathIntent(text) {
  try {
    let expr = text.toLowerCase();

    // Normalize words → symbols
    expr = expr
      .replace(/times|tims|tmes|multiply|multiplied by/g, "*")
      .replace(/\bx\b/g, "*") // common "5 x 6"
      .replace(/plus|add|sum/g, "+")
      .replace(/minus|subtract|subtracted by/g, "-")
      .replace(/divided by|divide|div|divided/g, "/");

    // Normalize symbols
    expr = expr
      .replace(/×/g, "*")
      .replace(/·/g, "*")
      .replace(/÷/g, "/");

    // Remove non-math characters
    expr = expr.replace(/[^0-9+\-*/().\s]/g, "");

    // Trim leftover junk
    expr = expr.trim();

    // Safety: remove trailing operators
    expr = expr.replace(/(\+|\-|\*|\/)\s*$/, "");

    // Safety: no double operators
    expr = expr.replace(/(\+|\-|\*|\/)\s*(\+|\-|\*|\/)/g, "$1");

    if (!expr) {
      return "🧮 I couldn’t calculate that — try again with a simple expression.";
    }

    // Evaluate safely
    const result = Function(`"use strict"; return (${expr});`)();

    if (isNaN(result)) {
      return "🧮 I couldn’t calculate that — try again with a simple expression.";
    }

    return `🧮 **Math Result:** ${result}`;
  } catch (err) {
    return "🧮 I couldn’t calculate that — try again with a simple expression.";
  }
}


function buildReminderMessage(r) {
  switch (r.type) {

    case "balance_threshold":
      return `Keeper… the Vault hums. Your **balance has crossed ${r.threshold}**.`;

    case "points_threshold":
      return `Keeper… power gathers. Your **points now stand at ${r.threshold}**.`;

    case "points_delta":
      return `Keeper… the Vault acknowledges your rise. **+${r.delta} points** (now ${r.target}).`;

    case "streak_change":
      return `Keeper… your **streak shifts**. The currents around you realign.`;

    case "rank_change":
      return `Keeper… your **rank has shifted**. The hierarchy trembles.`;

    case "weather_clear":
      return `Keeper… the **skies have opened**. The island breathes again.`;

    case "sargassum_low":
      return `Keeper… the **waters lighten**. The sargassum retreats.`;

    // -------------------------------------
    // NEW ENVIRONMENTAL REMINDERS
    // -------------------------------------

    case "storm_start":
      return `Keeper… the **storm awakens**. Winds gather and the horizon darkens.`;

    case "waves_high":
      return `Keeper… the **sea grows restless**. The waves rise beyond your threshold.`;

    case "wildlife_active":
      return `Keeper… the island stirs. **${r.animal}** has become active.`;

    case "heat_index_high":
      return `Keeper… the **air thickens with heat**. The feels-like temperature has crossed **${r.threshold}°**.`;

    case "rain_chance_high":
      return `Keeper… the **clouds conspire**. Rain chances have risen above **${r.threshold}%**.`;

    // -------------------------------------
    // TIME-BASED REMINDERS
    // -------------------------------------
    case "nextDay":
      return `Keeper… a new dawn arrives. Your reminder echoes: **"${r.text}"**.`;

    case "time":
      return `Keeper… the moment has arrived. **"${r.text}"**.`;

    // -------------------------------------
    // NEXT OPEN REMINDERS
    // -------------------------------------
    case "nextVaultOpen":
      return `Keeper… as you open the Vault, I recall: **"${r.text}"**.`;

    case "nextAppOpen":
      return `Keeper… upon your return, I bring forth: **"${r.text}"**.`;

    // -------------------------------------
    // LOCATION REMINDERS
    // -------------------------------------
    case "location_enter":
      return `Keeper… now that you’ve reached **${r.location}**, remember: **"${r.text}"**.`;

    case "location_exit":
      return `Keeper… as you depart **${r.location}**, recall: **"${r.text}"**.`;

    // -------------------------------------
    // GENERIC FALLBACK
    // -------------------------------------
    default:
      return `Keeper… you asked me to remember: **"${r.text || r.raw}"**.`;
  }
}

export async function evaluateReminders(uid, loyalty = {}, envState = {}) {
  const userRef = await getUserRefByUid(uid);
  const snap = await userRef.get();
  const data = snap.data() || {};

  // NEW SCHEMA: reminders live under TPReminders
  const reminders = data.TPReminders.definitions || {};

  const now = PulseRealm.PulseNOW;
  const triggered = [];

  const all = Object.values(reminders).flat().filter(Boolean);

  for (const r of all) {
    if (!r || typeof r !== "object") continue;

    const type = r.type || r.trigger || "generic";
    const normalized = { ...r, type };

    switch (normalized.type) {

      // TIME-BASED
      case "nextDay":
      case "time":
        if (normalized.time && now >= normalized.time) {
          triggered.push(normalized);
        }
        break;

      // NEXT OPEN
      case "nextVaultOpen":
      case "nextAppOpen":
        triggered.push(normalized);
        break;

      // LOCATION
      case "location_enter":
        if (envState.TPEnvironment.location && normalized.location) {
          if (
            envState.TPEnvironment.location.toLowerCase() ===
            normalized.location.toLowerCase()
          ) {
            triggered.push(normalized);
          }
        }
        break;

      case "location_exit":
        if (envState.TPEnvironment.lastLocation && normalized.location) {
          const left =
            envState.TPEnvironment.lastLocation.toLowerCase() ===
            normalized.location.toLowerCase();
          const nowNotThere =
            envState.TPEnvironment.location.toLowerCase() !==
            normalized.location.toLowerCase();
          if (left && nowNotThere) triggered.push(normalized);
        }
        break;

      // CONDITIONAL — POINTS / BALANCE
      case "balance_threshold":
        if (loyalty.walletBalance >= normalized.threshold)
          triggered.push(normalized);
        break;

      case "points_threshold":
        if (loyalty.pointsBalance >= normalized.threshold)
          triggered.push(normalized);
        break;

      case "points_delta":
        if (loyalty.pointsBalance >= normalized.target)
          triggered.push(normalized);
        break;

      case "streak_change":
        if (loyalty.streakChanged === true) triggered.push(normalized);
        break;

      case "rank_change":
        if (loyalty.rankChanged === true) triggered.push(normalized);
        break;

      // WEATHER CLEAR
      case "weather_clear": {
        const code =
          envState.TPEnvironment.weather.current.weather_code;
        const isClear = code === 0 || code === 1;
        if (isClear) triggered.push(normalized);
        break;
      }

      // SARGASSUM LOW
      case "sargassum_low": {
        const value = envState.TPEnvironment.sargassum.value;
        if (typeof value === "number" && value < 0.3)
          triggered.push(normalized);
        break;
      }

      // 🌩️ NEW ENVIRONMENTAL REMINDERS
      case "storm_start": {
        const code =
          envState.TPEnvironment.weather.current.weather_code;
        const isStorm =
          code === 80 ||
          code === 81 ||
          code === 82 || // showers
          code === 95 ||
          code === 96 ||
          code === 99; // thunderstorms
        if (isStorm) triggered.push(normalized);
        break;
      }

      case "waves_high": {
        const waves = envState.TPEnvironment.waves.height;
        if (typeof waves === "number" && waves >= normalized.threshold) {
          triggered.push(normalized);
        }
        break;
      }

      case "wildlife_active": {
        const w = envState.TPEnvironment.wildlife || {};
        const key = normalized.animal.toLowerCase();
        if (key && w[key] === true) triggered.push(normalized);
        break;
      }

      case "heat_index_high": {
        const feels =
          envState.TPEnvironment.weather.current.apparent_temperature;
        if (typeof feels === "number" && feels >= normalized.threshold) {
          triggered.push(normalized);
        }
        break;
      }

      case "rain_chance_high": {
        const rain =
          envState.TPEnvironment.weather.daily
            .precipitation_probability_max[0];
        if (typeof rain === "number" && rain >= normalized.threshold) {
          triggered.push(normalized);
        }
        break;
      }

      // GENERIC
      case "generic":
        triggered.push(normalized);
        break;
    }
  }

  return triggered;
}

function spirit(text, extra = {}) {
  // Rare magical shimmer (1–3%) + ultra-rare omen pulse (0.3%)
  const shimmer = Math.random() < 0.03 ? "vaultSpiritShimmer" : "";
  const omen = Math.random() < 0.003 ? "vaultSpiritOmenPulse" : "";

  return {
    speaker: "Vault Spirit",
    isUser: false,
    text,
    extraClasses: [
      "vaultSpiritBubble",
      shimmer,
      omen,
      extra.intensity ? `vsIntensity-${extra.intensity}` : "",
      extra.extraClasses
    ]
      .filter(Boolean)
      .join(" "),
    pendingQuestion: extra.pendingQuestion || null,
    pendingData: extra.pendingData || null,
    optionsHtml: extra.optionsHtml || ""
  };
}

export async function runReminderEvaluation(uid, loyalty, envState) {
  const triggered = await evaluateReminders(uid, loyalty, envState);

  if (!Array.isArray(triggered) || triggered.length === 0) {
    return [];
  }

  const messages = [];

  for (const r of triggered) {
    if (!r || typeof r !== "object") continue;

    if (!r.id) {
      console.warn("Reminder missing ID, skipping:", r);
      continue;
    }

    const text = r.text || r.raw || "";
    const type = r.type || "generic";

    const msg = buildReminderMessage({
      ...r,
      text,
      type
    });

    // NEW SCHEMA: delete from TPReminders.definitions
    await deleteReminder(uid, r.id);

    messages.push(msg);
  }

  return messages;
}

export function normalizeReminderTrigger(parsed) {
  if (!parsed) return { trigger: "nextVaultOpen" };

  if (parsed.trigger === "time") {
    return { trigger: "time", time: parsed.time };
  }

  const t = (parsed.text || "").trim();

  if (/next app|next open|app open/.test(t)) return { trigger: "nextAppOpen" };
  if (/next day|tomorrow/.test(t)) return { trigger: "nextDay" };
  if (/next week|in a week/.test(t)) return { trigger: "nextWeek" };
  if (/when i arrive|when i get there|when i reach/.test(t)) return { trigger: "location_enter" };
  if (/when i leave|when i go|when i exit/.test(t)) return { trigger: "location_exit" };

  return { trigger: "nextVaultOpen" };
}

export function buildReminderConfirmation(text) {
  return {
    bubble: `Keeper… you want me to remember: <b>"${text}"</b>?`,
    options: [
      { label: "Yes, remember it", value: "reminder_confirmation_yes" },
      { label: "No, cancel it", value: "reminder_confirmation_no" }
    ]
  };
}

export function parseReminderText(raw) {
  if (!raw) return null;

  const text = raw.toLowerCase().trim();

  // Cleaned text for display
  let cleaned = text
    .replace(/remind me|remember|set a reminder|please|to|that/i, "")
    .trim();

  // DEFAULT: next day at 9am
  let trigger = "nextDay";
  let time = null;
  let location = null;

  // ------------------------------------
  // EXPLICIT TIME PHRASES
  // ------------------------------------

  // Tomorrow
  if (/tomorrow|mañana/.test(text)) {
    trigger = "time";
    const t = new Date();
    t.setDate(t.getDate() + 1);
    t.setHours(9, 0, 0, 0);
    time = t.getTime();
  }

  // Tonight
  if (/tonight|esta noche/.test(text)) {
    trigger = "time";
    const t = new Date();
    t.setHours(20, 0, 0, 0);
    time = t.getTime();
  }

  // In X minutes/hours
  const inMatch = text.match(/in (\d+)\s?(minutes|minute|hours|hour)/i);
  if (inMatch) {
    trigger = "time";
    const amount = parseInt(inMatch[1]);
    const unit = inMatch[2];

    const t = new Date();
    if (unit.startsWith("hour")) t.setHours(t.getHours() + amount);
    else t.setMinutes(t.getMinutes() + amount);

    time = t.getTime();
  }

  // At specific time
  const timeMatch = text.match(/at (\d{1,2})(?::(\d{2}))?\s?(am|pm)?/i);
  if (timeMatch) {
    trigger = "time";
    const hour = parseInt(timeMatch[1]);
    const minute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    const ampm = timeMatch[3];

    const t = new Date();
    let h = hour;

    if (ampm) {
      if (ampm.toLowerCase() === "pm" && h < 12) h += 12;
      if (ampm.toLowerCase() === "am" && h === 12) h = 0;
    }

    t.setHours(h, minute, 0, 0);
    time = t.getTime();
  }

  // ------------------------------------
  // NEXT X DAYS / IN X DAYS
  // ------------------------------------

  // "next 3 days" / "next 2 days"
  const nextDaysMatch = text.match(/next (\d+)\s?days?/i);
  if (nextDaysMatch) {
    trigger = "time";
    const days = parseInt(nextDaysMatch[1]);
    const t = new Date();
    t.setDate(t.getDate() + days);
    t.setHours(9, 0, 0, 0);
    time = t.getTime();
  }

  // "in 3 days" / "in 2 days"
  const inDaysMatch = text.match(/in (\d+)\s?days?/i);
  if (inDaysMatch) {
    trigger = "time";
    const days = parseInt(inDaysMatch[1]);
    const t = new Date();
    t.setDate(t.getDate() + days);
    t.setHours(9, 0, 0, 0);
    time = t.getTime();
  }

  // ------------------------------------
  // NEXT WEEK / IN X WEEKS
  // ------------------------------------

  // "next week"
  if (/next week/.test(text)) {
    trigger = "time";
    const t = new Date();
    t.setDate(t.getDate() + 7);
    t.setHours(9, 0, 0, 0);
    time = t.getTime();
  }

  // "in 2 weeks"
  const inWeeksMatch = text.match(/in (\d+)\s?weeks?/i);
  if (inWeeksMatch) {
    trigger = "time";
    const weeks = parseInt(inWeeksMatch[1]);
    const t = new Date();
    t.setDate(t.getDate() + weeks * 7);
    t.setHours(9, 0, 0, 0);
    time = t.getTime();
  }

  // ------------------------------------
  // EXPLICIT NEXT-TIME TRIGGERS
  // ------------------------------------

  // Next app open
  if (/next app|next time i open|when i open the app/.test(text)) {
    trigger = "nextAppOpen";
  }

  // Next vault open
  if (/next vault|next time the vault opens|next time i open the vault/.test(text)) {
    trigger = "nextVaultOpen";
  }

  // ------------------------------------
  // LOCATION-BASED REMINDERS
  // ------------------------------------

  const locMatch = text.match(/when i (arrive|reach|get to|go to|leave) (.+)/i);
  if (locMatch) {
    const action = locMatch[1];
    const place = locMatch[2];

    trigger = action === "leave" ? "location_exit" : "location_enter";
    location = place.trim();
  }

  if (!cleaned) cleaned = raw.trim();

  return { text: cleaned, trigger, time, location };
} 
export async function handleReminderSet(text, userContext) {
  try {
    if (!text || text.trim().length < 3) {
      return "📝 Tell me what you want me to remember.";
    }

    const t = text.toLowerCase();
    const uid = userContext.uid;
    const loyalty = userContext.TPLoyalty || {};

    // --- ENVIRONMENTAL REMINDERS ---
    if (t.includes("storm")) {
      await saveReminder(uid, { type: "storm_start", raw: text });
      return "🌩️ I’ll alert you when **storms begin**.";
    }

    if (t.includes("wave") && /\d+/.test(t)) {
      const threshold = Number(t.match(/\d+/)[0]);
      await saveReminder(uid, { type: "waves_high", threshold, raw: text });
      return `🌊 I’ll alert you when **waves exceed ${threshold}ft**.`;
    }

    if (t.includes("wildlife")) {
      const animal = t.match(/dolphin|shark|turtle|ray|manatee|croc|fish|octopus|pelican/);
      if (animal) {
        await saveReminder(uid, { type: "wildlife_active", animal: animal[0], raw: text });
        return `🐾 I’ll notify you when **${animal[0]}** become active.`;
      }
    }

    if (t.includes("hot") || t.includes("heat") || t.includes("feels like")) {
      const threshold = /\d+/.test(t) ? Number(t.match(/\d+/)[0]) : 95;
      await saveReminder(uid, { type: "heat_index_high", threshold, raw: text });
      return `🔥 I’ll warn you when the **feels-like temperature passes ${threshold}°**.`;
    }

    if (t.includes("rain") && /\d+/.test(t)) {
      const threshold = Number(t.match(/\d+/)[0]);
      await saveReminder(uid, { type: "rain_chance_high", threshold, raw: text });
      return `🌧️ I’ll alert you when **rain chances exceed ${threshold}%**.`;
    }

    if (t.includes("weather") && (t.includes("clear") || t.includes("nice"))) {
      await saveReminder(uid, { type: "weather_clear", raw: text });
      return "🌤️ I’ll remind you when the **weather clears**.";
    }

    if (t.includes("sargassum") || t.includes("seaweed")) {
      await saveReminder(uid, { type: "sargassum_low", raw: text });
      return "🌊 I’ll remind you when **sargassum levels drop**.";
    }

    // --- LOYALTY REMINDERS ---
    if (t.includes("balance") && /\d+/.test(t)) {
      const threshold = Number(t.match(/\d+/)[0]);
      await saveReminder(uid, {
        type: "balance_threshold",
        threshold,
        raw: text
      });
      return `✨ I’ll remind you when your **balance goes over ${threshold}**.`;
    }

    if (t.includes("points") && /\d+/.test(t) && !t.includes("earn")) {
      const threshold = Number(t.match(/\d+/)[0]);
      await saveReminder(uid, {
        type: "points_threshold",
        threshold,
        raw: text
      });
      return `🌺 I’ll remind you when your **points reach ${threshold}**.`;
    }

    if (t.includes("earn") && t.includes("points") && /\d+/.test(t)) {
      const delta = Number(t.match(/\d+/)[0]);
      const current = loyalty.pointsBalance || 0;
      const target = current + delta;
      await saveReminder(uid, {
        type: "points_delta",
        delta,
        target,
        raw: text
      });
      return `🔥 I’ll remind you when you’ve **earned ${delta} more points** (at ${target}).`;
    }

    if (t.includes("streak")) {
      await saveReminder(uid, { type: "streak_change", raw: text });
      return "🌙 I’ll remind you when your **streak changes**.";
    }

    if (t.includes("rank") || t.includes("level")) {
      await saveReminder(uid, { type: "rank_change", raw: text });
      return "🌟 I’ll remind you when your **rank changes**.";
    }

    // --- GENERIC REMINDER ---
    const parsed = parseReminderText(text);
    if (!parsed || !parsed.text) {
      return "📝 I can remember anything you want — just tell me the phrase.";
    }

    const confirm = buildReminderConfirmation(parsed.text);

    if (userContext.saveConversationMemory) {
      userContext.saveConversationMemory({
        pendingReminder: parsed,
        lastIntent: "set_reminder_pending",
        lastUpdated: PulseRealm.PulseNOW
      });
    }

    return {
      speaker: "Vault Spirit",
      text: confirm.bubble,
      optionsHtml: `
        <button class="bubbleBtn" onclick="vaultYes()">Yes</button>
        <button class="bubbleBtn" onclick="vaultNo()">No</button>
      `,
      pendingQuestion: "reminder_confirmation",
      pendingData: parsed
    };

  } catch (err) {
    console.error("handleReminderSet failed:", err);
    return "⚠️ I tried to understand that reminder, but something felt off in the Vault.";
  }
}

export async function saveReminder(uid, reminder) {
  if (!uid) throw new Error("Missing uid");
  if (!reminder.type) throw new Error("Missing reminder type");

  const userRef = await getUserRefByUid(uid);
  const snap = await userRef.get();
  const data = snap.data() || {};

  const defs = data.TPReminders.definitions || {};
  const trigger = reminder.type;

  const id = crypto.randomUUID();

  const list = Array.isArray(defs[trigger]) ? defs[trigger] : [];

  list.push({
    id,
    ...reminder,
    createdAt: PulseRealm.PulseNOW
  });

  await userRef.set(
    {
      TPReminders: {
        ...data.TPReminders,
        definitions: {
          ...defs,
          [trigger]: list
        }
      }
    },
    { merge: true }
  );

  return id;
}

export async function handleReminderList(userContext) {
  try {
    const uid = userContext.uid;
    if (!uid) {
      return "📝 <b>Summary</b> — No user found.";
    }

    const userRef = await getUserRefByUid(uid);
    const snap = await userRef.get();
    const data = snap.data() || {};

    const defs = data.TPReminders.definitions || {};
    const all = Object.values(defs).flat().filter(Boolean);

    if (all.length === 0) {
      return pick([
        "🧘 You have no active reminders — your path is clear.",
        "🌿 Nothing stored in the Vault right now.",
        "✨ No reminders waiting for you.",
        "🌴 The Vault is quiet — nothing to recall.",
        "🌙 No tasks echo in the Vault at the moment."
      ]);
    }

    const format = (r) => {
      switch (r.type) {
        case "balance_threshold":
          return `• When your balance goes over <b>${r.threshold}</b>`;
        case "points_threshold":
          return `• When your points reach <b>${r.threshold}</b>`;
        case "points_delta":
          return `• When you earn <b>${r.delta}</b> more points (target <b>${r.target}</b>)`;
        case "streak_change":
          return `• When your streak changes`;
        case "rank_change":
          return `• When your rank changes`;
        case "weather_clear":
          return `• When the weather clears`;
        case "sargassum_low":
          return `• When sargassum levels drop`;
        case "storm_start":
          return `• When storms begin`;
        case "waves_high":
          return `• When waves exceed <b>${r.threshold}</b>`;
        case "wildlife_active":
          return `• When <b>${r.animal}</b> become active`;
        case "heat_index_high":
          return `• When feels-like temperature passes <b>${r.threshold}°</b>`;
        case "rain_chance_high":
          return `• When rain chances exceed <b>${r.threshold}%</b>`;
        default:
          return `• ${r.text || r.raw || "Unknown reminder"}`;
      }
    };

    const list = all.map(format).join("<br>");

    return `📝 <b>Your Active Reminders:</b><br>${list}`;

  } catch (err) {
    console.error("handleReminderList failed:", err);
    return "⚠️ I tried to check your reminders, but something drifted in the ether.";
  }
}

export async function handleReminderDelete(text, userContext) {
  try {
    if (!text || text.trim().length < 3) {
      return "🗑️ Tell me which reminder you want to remove.";
    }

    const cleaned = text
      .replace(/delete|remove|forget|reminder|please|about|the/gi, "")
      .trim()
      .toLowerCase();

    if (!cleaned) {
      return "🗑️ I need the reminder text you want me to remove.";
    }

    const uid = userContext.uid;
    const userRef = await getUserRefByUid(uid);
    const snap = await userRef.get();
    const data = snap.data() || {};

    const defs = data.TPReminders.definitions || {};

    const matches = Object.values(defs)
      .flat()
      .filter(r => {
        const txt = (r.text || r.raw || "").toLowerCase();
        return txt.includes(cleaned);
      });

    if (matches.length === 0) {
      return pick([
        "⚠️ I couldn’t find that reminder.",
        "🌫️ That reminder doesn’t seem to exist.",
        "🌙 I searched the Vault, but found nothing matching that.",
        "🌺 I couldn’t locate that reminder.",
        "🔥 No reminder with that description was found."
      ]);
    }

    if (matches.length > 1) {
      const options = matches
        .map(m => `<button class="bubbleBtn" onclick="deleteById('${m.id}')">${m.text || m.raw}</button>`)
        .join("");

      return {
        speaker: "Vault Spirit",
        text: "🌿 Keeper… I found several reminders. Which one should I remove?",
        optionsHtml: options,
        pendingQuestion: "delete_specific",
        pendingData: { matches }
      };
    }

    const match = matches[0];
    await deleteReminder(uid, match.id);

    return pick([
      `🗑️ I’ve removed **"${match.text || cleaned}"** from your reminders.`,
      `✨ Deleted: **"${match.text || cleaned}"**.`,
      `🌺 That reminder has been cleared.`,
      `🌴 Gone — **"${match.text || cleaned}"** is no longer stored.`,
      `🔥 Removed from the Vault: **"${match.text || cleaned}"**.`
    ]);

  } catch (err) {
    console.error("handleReminderDelete failed:", err);
    return "⚠️ Something disrupted the deletion — try again soon.";
  }
}

function getHelpMenu() {
  return `
  <div style="font-size:14px; line-height:1.45; padding:4px 0">

    <span style="color:#00c2ff; font-weight:bold">🌀 Core Vault Commands</span><br>
    • 💰 <b>Balance</b> — Check Your Wallet<br>
    • 🔵 <b>Points</b> — Check Your Pulse Points<br>
    • 🌱 <b>Earn Points</b> — Learn How to Earn More<br>
    • 🎁 <b>Redeem Points</b> — Redeem Rewards<br>
    • ⭐ <b>Rank</b> — Learn About Your Tier<br>
    • 🔢 <b>Estimate</b> — Estimate Points from a Receipt<br>
    • 🔮 <b>Future</b> — “What if I…” Scenarios<br><br>

    <span style="color:#ffca28; font-weight:bold">🌺 Island Explorer</span><br>
    • 🍽️ <b>Food</b> — Restaurants & Meals<br>
    • 🍹 <b>Bars</b> — Drinks & Nightlife<br>
    • 🏖️ <b>Beaches</b> — Beaches & Secret Beach<br>
    • 🐠 <b>Tours</b> — Snorkeling & Excursions<br>
    • 🛺 <b>Carts</b> — Golf Cart Rentals<br>
    • 🎉 <b>Events Today</b> — What’s Happening Now<br>
    • 📅 <b>Events Upcoming</b> — What’s Coming Up<br>
    • 📍 <b>Nearby</b> — Find Things Close to You<br>
    • ⏳ <b>Open Now</b> — Filter by Open Businesses<br><br>

    <span style="color:#00e6e6; font-weight:bold">🌊 Environment</span><br>
    • 🌦️ <b>Weather</b> — Rain, Heat, Storms<br>
    • 🌤️ <b>Weather Now</b> — Current Conditions<br>
    • 📅 <b>Weather Today</b> — Today’s Forecast<br>
    • 🌅 <b>Weather Tomorrow</b> — Tomorrow’s Forecast<br>
    • 📆 <b>Weather Week</b> — 7‑Day Outlook<br>
    • 💧 <b>Humidity</b> — Humidity Levels<br>
    • 💨 <b>Wind</b> — Wind Conditions<br>
    • 🌊 <b>Waves</b> — Sea State & Snorkeling<br>
    • 🟤 <b>Sargassum</b> — Seaweed Levels<br>
    • 🔥 <b>Heat</b> — Heat Index<br>
    • 🌕 <b>Moon</b> — Moon Phase<br>
    • 🐾 <b>Wildlife</b> — Animals & Sightings<br>
    • 🌀 <b>Storms</b> — Tropical Activity<br>
    • 🏖️ <b>Beach Quality</b> — Beach Conditions<br>
    • 📝 <b>Summary</b> — Environmental Summary<br><br>

    <span style="color:#00e676; font-weight:bold">🌩️ Environmental Alerts</span><br>
    • 🌩️ <b>Storm Alerts</b> — “Alert me when storms start”<br>
    • 🌊 <b>Wave Alerts</b> — “Tell me when waves get high”<br>
    • 🐬 <b>Wildlife Alerts</b> — “Notify me when dolphins are active”<br>
    • 🔥 <b>Heat Alerts</b> — “Warn me if it gets too hot”<br>
    • 🌧️ <b>Rain Alerts</b> — “Tell me if rain chances go above 60%”<br><br>

    <span style="color:#00e676; font-weight:bold">🌴 Local Knowledge</span><br>
    • 🗺️ <b>Directions</b> — Navigation<br>
    • 📚 <b>Island Facts</b> — About San Pedro<br>
    • 🇧🇿 <b>Belize Facts</b> — About Belize<br><br>

    <span style="color:#ff80ab; font-weight:bold">💬 Small Talk</span><br>
    • 😊 <b>How Are You</b><br>
    • 🙏 <b>Thank You</b><br>
    • 👋 <b>Goodbye</b><br>
    • 📖 <b>Story</b><br>
    • 🤫 <b>Secret</b><br>
    • 😄 <b>Joke</b><br>
    • 🌀 <b>Who Are You</b><br>
    • 🧭 <b>What Can You Do</b><br><br>

    <span style="color:#b388ff; font-weight:bold">🆘 System</span><br>
    • ❓ <b>/Help</b> — Show This Menu<br>
    • 🧹 <b>Clear</b> — Clear Chat<br>
    • 🔄 <b>Reset</b> — Reset Spirit<br>

  </div>
  `;
}

function detectUpgradedIntent(text) {
  if (!text || typeof text !== "string") return null;

  const start = PulseRealm.PulseNOW;
  const t = text.trim().toLowerCase();

  const step = (msg) => console.log("   🧭", msg);

  const has = (...words) => {
    const hit = words.find((w) => t.includes(w));
    if (hit) step(`has("${hit}")`);
    return !!hit;
  };

  const starts = (...words) => {
    const hit = words.find((w) => t.startsWith(w));
    if (hit) step(`starts("${hit}")`);
    return !!hit;
  };

  const isMath = /\d+(\s*[+\-*/x×]\s*\d+)/.test(t);

  console.log("==============================================");
  console.log("🔮 detectUpgradedIntent()");
  console.log("📝 RAW:", text);
  console.log("🔧 NORMALIZED:", t);

  // ------------------------------------
  // 0. ULTRA PRIORITY
  // ------------------------------------
  step("ULTRA PRIORITY...");

  if (has("lockdown", "danger mode", "app lock", "lock the app", "panic mode")) {
    return "danger_lockdown";
  }

  if (starts("remind me", "set a reminder", "remember", "don't let me forget")) {
    return "set_reminder";
  }

  if (starts("tell me")) {
    const excluded = [
      "tell me how",
      "tell me a joke",
      "tell me something cool",
      "tell me something interesting",
      "tell me more",
      "tell me about",
      "tell me the beach vibe",
      "tell me what kind of adventure",
      "tell me what you're craving"
    ];

    if (!excluded.some((x) => t.includes(x))) {
      return "set_reminder";
    }
  }

  if (has("hello", "hi", "hey", "yo", "hola", "sup", "wassup", "whats up")) {
    return "greeting";
  }

  // SEND POINTS / BALANCE
  if (starts("send", "give", "transfer")) {
    const emailLike = t.match(/[a-z0-9._%+-]+@[a-z0-9.-]+/i);
    const usernameLike = t.match(/\b[a-z0-9]{3,}\b/);

    if (emailLike || usernameLike) {
      if (has("points")) return "send_points";
      if (has("balance", "money")) return "send_balance";
      return "send_unknown";
    }
  }

  if (
    has(
      "directions",
      "how do i get to",
      "navigate to",
      "route to",
      "take me to",
      "go to",
      "tell me how"
    ) ||
    starts("directions to")
  ) {
    return "directions";
  }

  // ------------------------------------
  // 1. HIGH PRIORITY
  // ------------------------------------
  step("HIGH PRIORITY...");

  const wildlifeKeywords = [
    "wildlife", "animals", "animal",
    "turtle", "turtles",
    "dolphin", "dolphins",
    "manatee", "manatees",
    "ray", "rays", "stingray", "stingrays",
    "shark", "sharks",
    "iguana", "iguanas",
    "crab", "crabs",
    "jellyfish", "jelly", "jellies",
    "crocodile", "crocodiles", "croc", "crocs",
    "fish", "fishes", "puffer", "pufferfish",
    "octopus", "octopi",
    "conch", "conchs", "conches",
    "pelican", "pelicans"
  ];

  if (
    has(
      "weather", "rain", "storm", "storms", "wind", "windy", "waves", "surf",
      "sea", "ocean", "tide", "sargassum", "sarg", "humidity", "heat", "moons", "hot",
      "wildlife", "animals", "bugs", "mosquitos", "crocodile", "shark", "turtle",
      "beach quality", "beach conditions", "beach report", "beach day",
      ...wildlifeKeywords
    )
  ) {
    if (has("beach quality", "beach conditions", "beach report", "beach day", "how is beach"))
      return "beach_quality";

    if (has("wind", "windy")) return "wind";
    if (has("waves", "surf", "sea", "ocean", "tide")) return "waves";
    if (has("sargassum", "sarg")) return "sargassum";
    if (has("humidity")) return "humidity";
    if (has("heat", "hot")) return "heat";
    if (has("moon", "moons")) return "moon";
    if (has("storm", "storms")) return "storms";

    const wildlifeHit = wildlifeKeywords.find((k) => t.includes(k));
    if (wildlifeHit) return { intent: "wildlife", target: wildlifeHit };
  }

  // EVENTS
  if (has("event", "events", "happening", "tonight", "today", "weekend", "live music", "party", "festival", "show", "band")) {
    if (has("today", "tonight", "now")) return "events_today";
    return "events_upcoming";
  }

  // ------------------------------------
  // 2. MATH / POINTS / BALANCE
  // ------------------------------------
  if (isMath) return "math";

  if (has("points", "pulse points")) {
    if (has("redeem") && /\b\d{3,}\b/.test(t)) return "redeem_points";
    if (has("how much", "estimate", "calculate", "earn", "get", "worth"))
      return "estimate_points";
    return "points";
  }

  if (has("balance", "my money", "my credits", "wallet", "money")) return "balance";
  if (has("rank", "tier", "level", "streak")) return "rank_info";
  if (has("referral", "refer", "invite")) return "referral_info";
  if (has("reward", "redeem", "perks", "benefits")) return "redeem_points";

  // ------------------------------------
  // 3. BUSINESS CATEGORIES
  // ------------------------------------
  const cat = extractCategory(t);
  if (cat) return cat;

  // ------------------------------------
  // 4. HELP / SUMMARY / ENVIRONMENT
  // ------------------------------------
  if (has("help", "lost", "confused", "how does this work", "what do i do", "ummm", "menu", "assistance", "assist", "ayuda", "ayudame"))
    return "help";

  if (has("summary", "status", "conditions", "environment"))
    return "environment";

  // ------------------------------------
  // 5. FALLBACK
  // ------------------------------------
  step("⚠️ NO MATCH — FALLBACK");
  console.log(`⏱ ${PulseRealm.PulseNOW - start}ms`);
  console.log("==============================================");

  return null;
}


async function saveConversationMemory(uid, payload) {
  try {
    if (!uid) {
      console.error("❌ saveConversationMemory called without UID");
      return;
    }

    const ref = db.collection("vaultMemory").doc(uid);

    await ref.set(
      {
        ...payload,
        lastUpdated: PulseRealm.PulseNOW
      },
      { merge: true }
    );

    console.log("💾 Conversation memory saved:", payload);

  } catch (err) {
    console.error("🔥 saveConversationMemory failed:", err);
  }
}

async function handlePendingQuestion(text, userContext) {
  const t = text.trim().toLowerCase();
  const pending = userContext.pendingQuestion;
  const data = userContext.pendingData || {};

  const isYes = ["yes", "yep", "yeah", "sure"].includes(t);
  const isNo  = ["no", "nope", "nah", "cancel"].includes(t);

  // If user didn't answer yes/no → ask again
  if (!isYes && !isNo) {
    return {
      speaker: "Vault Spirit",
      text: `🌙 Keeper… I need a <b>Yes</b> or <b>No</b>.`,
      optionsHtml: `
        <button class="bubbleBtn" onclick="vaultYes()">Yes</button>
        <button class="bubbleBtn" onclick="vaultNo()">No</button>
      `,
      pendingQuestion: pending,
      pendingData: data
    };
  }

  // ⭐ YES → confirm reminder
  if (isYes && pending === "reminder_confirmation") {
    const normalized = normalizeReminderTrigger(data);

    await saveReminder(userContext.uid, {
      ...normalized,
      raw: data.text
    });

    if (userContext.saveConversationMemory) {
      userContext.saveConversationMemory({
        pendingQuestion: null,
        pendingData: null,
        lastIntent: "reminder_confirmed"
      });
    }

    return {
      speaker: "Vault Spirit",
      text: `✨ It is remembered, Keeper — I’ll remind you about <b>"${data.text}"</b>.`,
      optionsHtml: ""
    };
  }

  // ⭐ NO → cancel reminder
  if (isNo && pending === "reminder_confirmation") {
    if (userContext.saveConversationMemory) {
      userContext.saveConversationMemory({
        pendingQuestion: null,
        pendingData: null,
        lastIntent: "reminder_cancelled"
      });
    }

    return {
      speaker: "Vault Spirit",
      text: `🌿 Very well — I won’t remember it.`,
      optionsHtml: ""
    };
  }

  // ⭐ YES → redeem points (partial or full)
  if (isYes && pending === "redeem_points_confirmation") {
    const { amountToRedeem, redeemable } = data;

    await redeemSomePulsePoints(
      userContext.uid,
      amountToRedeem,
      "redeem",
      "user_redeem",
      null, null, null
    );

    if (userContext.saveConversationMemory) {
      userContext.saveConversationMemory({
        pendingQuestion: null,
        pendingData: null,
        lastIntent: "redeem_points_confirmed"
      });
    }

    return {
      speaker: "Vault Spirit",
      text: `💰 Your redemption is complete, Keeper — <b>${amountToRedeem} points</b> have been exchanged for <b>$${redeemable} BZD</b>.`,
      optionsHtml: ""
    };
  }

  // ⭐ NO → cancel redemption
  if (isNo && pending === "redeem_points_confirmation") {
    if (userContext.saveConversationMemory) {
      userContext.saveConversationMemory({
        pendingQuestion: null,
        pendingData: null,
        lastIntent: "redeem_points_cancelled"
      });
    }

    return {
      speaker: "Vault Spirit",
      text: `🌴 Very well — your points remain untouched.`,
      optionsHtml: ""
    };
  }

  // Fallback
  return {
    speaker: "Vault Spirit",
    text: "🌫️ Something feels unclear… try again.",
    optionsHtml: ""
  };
}

function formatEventDate(d) {
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const mon = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${mon}-${year}`;
}

function parseDateRange(text) {
  const now = new Date();
  const lower = text.toLowerCase().trim();

  // TODAY
  if (lower.includes("today")) {
    return {
      startStr: formatEventDate(now),
      endStr: formatEventDate(now)
    };
  }

  // TOMORROW
  if (lower.includes("tomorrow")) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return {
      startStr: formatEventDate(d),
      endStr: formatEventDate(d)
    };
  }

  // YESTERDAY
  if (lower.includes("yesterday")) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return {
      startStr: formatEventDate(d),
      endStr: formatEventDate(d)
    };
  }

  // WEEKEND (Fri–Sun)
  if (lower.includes("weekend")) {
    const d = new Date(now);
    const day = d.getDay();

    const friday = new Date(d);
    friday.setDate(d.getDate() + ((5 - day + 7) % 7));

    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);

    return {
      startStr: formatEventDate(friday),
      endStr: formatEventDate(sunday)
    };
  }

  // NEXT WEEK (Mon–Sun)
  if (lower.includes("next week")) {
    const d = new Date(now);
    const day = d.getDay();
    const nextMonday = new Date(d);
    nextMonday.setDate(d.getDate() + (8 - day));

    const nextSunday = new Date(nextMonday);
    nextSunday.setDate(nextMonday.getDate() + 6);

    return {
      startStr: formatEventDate(nextMonday),
      endStr: formatEventDate(nextSunday)
    };
  }

  // LAST WEEK (Mon–Sun)
  if (lower.includes("last week")) {
    const d = new Date(now);
    const day = d.getDay();

    const lastMonday = new Date(d);
    lastMonday.setDate(d.getDate() - (day + 6));

    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);

    return {
      startStr: formatEventDate(lastMonday),
      endStr: formatEventDate(lastSunday)
    };
  }

  // NEXT MONTH
  if (lower.includes("next month")) {
    const start = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    return {
      startStr: formatEventDate(start),
      endStr: formatEventDate(end)
    };
  }

  // LAST MONTH
  if (lower.includes("last month")) {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);

    return {
      startStr: formatEventDate(start),
      endStr: formatEventDate(end)
    };
  }

  // EXPLICIT RANGE: "10 MAR TO 20 MAR"
  const rangeMatch = lower.match(/(\d{1,2}\s*[a-zA-Z]{3,})\s*(to|-)\s*(\d{1,2}\s*[a-zA-Z]{3,})/);
  if (rangeMatch) {
    const start = new Date(rangeMatch[1]);
    const end = new Date(rangeMatch[3]);

    return {
      startStr: formatEventDate(start),
      endStr: formatEventDate(end)
    };
  }

  // SINGLE DATE: "10 MAR"
  const singleMatch = lower.match(/(\d{1,2}\s*[a-zA-Z]{3,})/);
  if (singleMatch) {
    const d = new Date(singleMatch[1]);
    return {
      startStr: formatEventDate(d),
      endStr: formatEventDate(d)
    };
  }

  // FALLBACK: today
  return {
    startStr: formatEventDate(now),
    endStr: formatEventDate(now)
  };
}

function formatEventDisplay(event) {
  const {
    title,
    fromDate,
    toDate,
    fromTime,
    toTime,
    venue,
    address
  } = event;

  const from = parseFirestoreDate(fromDate);
  const to = parseFirestoreDate(toDate);

  const now = new Date();
  let status = "";

  if (fromTime && toTime) {
    const start = new Date(`${fromDate} ${fromTime}`);
    const end = new Date(`${toDate} ${toTime}`);

    if (now >= start && now <= end) {
      status = "🔥 <i>Happening Now</i>";
    } else if (now < start) {
      const mins = Math.round((start - now) / 60000);
      status = `⏳ <i>Starts in ${mins} min</i>`;
    } else if (now > end) {
      status = "🌙 <i>Already Ended</i>";
    }
  }

  const timeRange =
    fromTime && toTime ? `${fromTime}–${toTime}` :
    fromTime ? fromTime :
    "";

  const loc = address
    ? `${venue}, ${address}`
    : venue || "Location TBA";

  return (
    `**${title}**\n` +
    `${fromDate}${timeRange ? " • " + timeRange : ""}\n` +
    `${loc}\n` +
    `${status}`
  );
}

function formatEventList(title, list) {
  let msg = `🎉 <b>${title}</b><br><br>`;

  list.slice(0, 5).forEach(e => {
    const timeRange = e.fromTime && e.toTime
      ? `${e.fromTime}–${e.toTime}`
      : "";

    msg +=
      `• <b>${e.title}</b> <span style="opacity:0.7">(🎫 Event)</span><br>` +
      `   📍 ${e.venue}<br>` +
      (timeRange ? `   ⏳ ${timeRange}<br>` : "") +
      `<br>`;
  });

  msg += "✨ Want more events or something happening this week?";
  return msg;
}

// ---------------------------------------------------------
// MAGICAL HELPERS
// ---------------------------------------------------------

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ------------------------------------
// 1. ANIMAL OVERRIDE ICONS
// ------------------------------------
const animalIcons = {
  // Reptiles
  croc: "🐊",
  crocs: "🐊",
  crocodile: "🐊",
  iguana: "🦎",
  iguanas: "🦎",
  lizard: "🦎",

  // Sharks & Rays
  shark: "🦈",
  sharks: "🦈",
  ray: "🐟",
  rays: "🐟",
  stingray: "🐟",

  // Turtles
  turtle: "🐢",
  turtles: "🐢",

  // Marine mammals
  dolphin: "🐬",
  dolphins: "🐬",
  manatee: "🦭",
  manatees: "🦭",

  // Fish & sea creatures
  fish: "🐠",
  fishes: "🐠",
  jellyfish: "🪼",
  octopus: "🐙",
  squid: "🦑",
  conch: "🐚",
  puffer: "🐡",
  pufferfish: "🐡",

  // Birds
  pelican: "🦤",   // closest emoji to a pelican
  pelicans: "🦤",
  bird: "🐦",
  birds: "🐦",
  seagull: "🐦",
  gull: "🐦",

  // Crustaceans
  crab: "🦀",
  crabs: "🦀",
  lobster: "🦞",
  lobsters: "🦞",
  shrimp: "🦐",
  prawns: "🦐",

  // Dogs
  dog: "🐕",
  dogs: "🐕",
  rumdog: "🐕",

  // Cats
  cat: "🐈",
  cats: "🐈",

  // Frogs
  frog: "🐸",
  frogs: "🐸",

  // Monkeys
  monkey: "🐒",
  monkeys: "🐒"
};


// ------------------------------------
// 2. CATEGORY FALLBACK ICONS
// ------------------------------------
const categoryIcons = {
  restaurant: "🍽️",
  food: "🍽️",
  bar: "🍹",
  beach: "🏝️",
  tour: "🚤",
  cart: "🛺",
  shop: "🛍️",
  event: "🎫",
  default: "🏝️"
};

function getDirectionText(bearing) {
  if (bearing == null) return "";

  if (bearing >= 337.5 || bearing < 22.5) return "north";
  if (bearing < 67.5) return "northeast";
  if (bearing < 112.5) return "east";
  if (bearing < 157.5) return "southeast";
  if (bearing < 202.5) return "south";
  if (bearing < 247.5) return "southwest";
  if (bearing < 292.5) return "west";
  return "northwest";
}

async function formatEventListEnhanced(title, events, userLocation) {
  if (!events || !events.length) {
    return `🌫️ No events found.`;
  }

  let msg = `🎉 <b>${title}</b><br><br>`;

  for (const e of events.slice(0, 6)) {
    const icon = "🎫"; // event icon

    const n = e.coords ? isNearby(e, userLocation) : null;
    const distanceText = n.distanceText || "";
    const directionText = n.directionText || "";

    const timeRange = e.start && e.end
      ? `${e.start}–${e.end}`
      : e.start
      ? `${e.start}`
      : "";

    msg += `
${icon} <b>${e.title || "Event"}</b><br>
📍 ${e.location || "Unknown location"}<br>
${distanceText ? `📏 ${distanceText}${directionText ? " • " + directionText : ""}<br>` : ""}
${timeRange ? `🕒 ${timeRange}<br>` : ""}
<br>
    `.trim();
  }

  return msg;
}

async function buildOpenNowListEnhanced(list, category, userLocation) {
  const openList = list.filter(b => b.openNow === true);

  const top = openList
    .sort((a, b) => a._distance - b._distance)
    .slice(0, 6);

  let msg = `⏳ <b>Open Now — ${category}</b><br><br>`;

  for (const place of top) {
    msg += formatMagicalBusinessCard(place, userLocation).replace(/\n/g, "<br>") + "<br><br>";
  }

  return {
    speaker: "Vault Spirit",
    text: msg,
    optionsHtml: ""
  };
}

async function buildNearbyListEnhanced(list, category, userLocation) {
  const top = list
    .sort((a, b) => a._distance - b._distance)
    .slice(0, 6);

  let msg = `🌴 <b>Nearby ${category}</b><br><br>`;

  for (const place of top) {
    msg += formatMagicalBusinessCard(place, userLocation).replace(/\n/g, "<br>") + "<br><br>";
  }

  return {
    speaker: "Vault Spirit",
    text: msg,
    optionsHtml: ""
  };
}

function formatMagicalBusinessCard(place, userLocation) {
  const icon = getBusinessIcon(place);

  const n = isNearby(place, userLocation);
  const distanceText = n.distanceText || "";
  const directionText = n.directionText || "";

  // ⭐ NEW — use real openNow field
  let openStatus = "";
  if (place.openNow === true) openStatus = "🟢 Open Now";
  else if (place.openNow === false) openStatus = "🔴 Closed Now";

  // Optional: show today's hours if available
  let todayHours = "";
  if (Array.isArray(place.hours)) {
    const dayIndex = new Date().getDay(); // 0–6
    todayHours = place.hours[dayIndex] || "";
  }

  const name = place.busname || place.title || place.name || "Unknown Place";
  const address = place.address || place.location || "Unknown location";

  return `
${icon} <b>${name}</b>
📍 ${address}
📏 ${distanceText}${directionText ? " • " + directionText : ""}
${openStatus}
${todayHours ? "🕒 " + todayHours : ""}
  `.trim();
}

// ------------------------------------
// 3. FINAL ICON RESOLVER
// ------------------------------------
function getBusinessIcon(place) {
  const name = (place.busname || place.title || place.name || "").toLowerCase();

  // 1. Animal override
  for (const key in animalIcons) {
    if (name.includes(key)) {
      return animalIcons[key];
    }
  }

  // 2. Category arrays (NEW)
  if (Array.isArray(place.categoryIcons) && place.categoryIcons.length > 0) {
    return place.categoryIcons[0];
  }

  if (Array.isArray(place.subcategoryIcons) && place.subcategoryIcons.length > 0) {
    return place.subcategoryIcons[0];
  }

  // 3. Legacy fallback
  const category = (place.category || place.type || "").toLowerCase();
  return categoryIcons[category] || categoryIcons.default;
}

export const getEvents = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      const userLocation =
        req.query.lat && req.query.lng
          ? { lat: Number(req.query.lat), lng: Number(req.query.lng) }
          : null;
      const data = await getAllEventsUnified(userLocation);
      res.json(data);
    } catch (err) {
      console.error("Error loading unified events:", err);
      res.status(500).json({ error: "Failed to load events" });
    }
  }
);

export async function businessLookup(query, userLocation) {
  // 1. Try exact match
  const exact = await fuzzyFindPlace(query);
  if (exact) {
    return formatMagicalBusinessCard(exact, userLocation).replace(/\n/g, "<br>");
  }

  // 2. Try keyword search
  const matches = await searchBusinessesByKeyword(query);

  if (!matches || matches.length === 0) {
    return `🌫️ I couldn’t find anything matching that name.`;
  }

  // 3. If too many matches, ask user to refine
  if (matches.length > 8) {
    return `🌺 I found several places… can you narrow it down a bit?`;
  }

  // 4. If 1 match, show full card
  if (matches.length === 1) {
    return formatMagicalBusinessCard(matches[0], userLocation).replace(/\n/g, "<br>");
  }

  // 5. If 2–8 matches, show list of magical cards
  const limited = matches.slice(0, 6);

  let msg = `🌴 <b>Matching Places</b><br><br>`;
  for (const place of limited) {
    msg += formatMagicalBusinessCard(place, userLocation).replace(/\n/g, "<br>") + "<br><br>";
  }

  return msg;
}

export const getBusinesses = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      console.log("🟦 Preflight OPTIONS request — returning 204");
      return res.status(204).send("");
    }

    const start = PulseRealm.PulseNOW;

    try {
      const userLocation =
        req.query.lat && req.query.lng
          ? { lat: Number(req.query.lat), lng: Number(req.query.lng) }
          : null;
      const businesses = await getAllBusinesses(userLocation);

      res.json(businesses);

    } catch (err) {
      res.status(500).json({ error: "Failed to load businesses" });
    }
  }
);

export async function searchEventsByKeyword(keyword) {
  const upper = keyword.toUpperCase();

  const snap = await db.collection("Events")
    .where("title_upper", ">=", upper)
    .where("title_upper", "<=", upper + "\uf8ff")
    .get();

  return snap.docs.map(doc => {
    const data = doc.data() || {};

    return {
      id: doc.id,
      title: data.title || "Untitled Event",

      fromDate: data.fromDate || "TBA",
      toDate: data.toDate || data.fromDate || "TBA",

      venue: data.venue || data.resolvedName || "Unknown Venue",
      address: data.address || data.resolvedAddress || "Unknown Address",

      category: data.category || null,
      price: data.price ?? 0,

      coords: data.coords || null,

      mapImageUrl: data.mapImageUrl || null,
      mapsWebUrl: data.mapsWebUrl || null,
      placeId: data.placeId || null,

      images: data.images || [],

      ...data
    };
  });
}

export async function searchBusinessesByKeyword(keyword) {
  const upper = keyword.toUpperCase();

  const snap = await db.collection("Businesses")
    .where("busname_upper", ">=", upper)
    .where("busname_upper", "<=", upper + "\uf8ff")
    .get();

  return snap.docs.map(doc => {
    const data = doc.data() || {};

    return {
      id: doc.id,
      busname: data.busname || "Unnamed Business",

      location: data.location || data.address || "Location Unknown",
      address: data.address || data.location || "Location Unknown",

      categories: data.categories || [],
      subcategories: data.subcategories || [],
      categoryIcons: data.categoryIcons || [],
      subcategoryIcons: data.subcategoryIcons || [],

      coords: data.coords || null,

      mapImageUrl: data.mapImageUrl || null,
      mapsWebUrl: data.mapsWebUrl || null,
      placeId: data.placeId || null,
      resolvedName: data.resolvedName || null,
      resolvedAddress: data.resolvedAddress || null,

      openNow: data.openNow ?? null,
      hours: data.hours || null,

      emails: data.emails || [],
      phones: data.phones || [],
      websites: data.websites || [],
      social: data.social || {},

      images: data.images || [],
      mainPhotoURL: data.mainPhotoURL || null,

      ...data
    };
  });
}

// -----------------------------
// EVENT HELPERS
// -----------------------------
export async function handleEventsToday(text, userContext) {
  const events = await getEventsToday();
  const t = (text || "").toLowerCase();

  if (!events.length)
    return "📅 No Major Events Today — but the Island always has its own Rhythm.";

  const userLoc = userContext.location || null;
  const wantsNearby =
    t.includes("near") ||
    t.includes("nearby") ||
    t.includes("close") ||
    t.includes("around here") ||
    t.includes("walking") ||
    t.includes("walkable");

  // ------------------------------------
  // NEARBY FILTERING (UPGRADED)
  // ------------------------------------
  if (wantsNearby && userLoc) {
    const nearby = events
      .filter(e => e.coords.lat && e.coords.lng)
      .map(e => ({ e, n: isNearby(e, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score);

    if (nearby.length) {
      let msg = "🎉 <b>Nearby Events Happening Today</b><br><br>";
      nearby.forEach(({ e, n }) => {
        msg +=
          `${formatEventDisplay(e).replace(/\n/g, "<br>")}<br>` +
          `<i>${n.distanceText} ${n.directionHint}</i><br><br>`;
      });
      return msg;
    }
  }

  // ------------------------------------
  // DEFAULT
  // ------------------------------------
  let msg = "🎉 <b>Events Happening Today in San Pedro</b><br><br>";

  events.forEach(e => {
    msg += formatEventDisplay(e).replace(/\n/g, "<br>") + "<br><br>";
  });

  return msg;
}
// ---------------------------------------------------------
// MAIN INTENT HANDLER
// ---------------------------------------------------------

export function fuzzyMatch(input, target, maxDistance = 2) {
  if (!input || !target) return false;

  input = input.toLowerCase();
  target = target.toLowerCase();

  // ───────────────────────────────────────────────
  // 🚫 0. HARD NO-FUZZY ZONE FOR HELP COMMANDS
  // ───────────────────────────────────────────────
  const helpWords = [
    "help",
    "ayuda",
    "ayúdame",
    "assist",
    "assistance",
    "lost",
    "confused",
    "how does this work",
    "what do i do",
    "menu",
    "ummm"
  ];

  const cleanInput = input.trim();
  const cleanTarget = target.trim();

  if (helpWords.includes(cleanTarget)) {
    // exact match
    if (cleanInput === cleanTarget) return true;

    // allow "help me" → help
    if (cleanInput.startsWith(cleanTarget + " ")) return true;

    // accent-insensitive Spanish
    const normIn = cleanInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normTg = cleanTarget.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normIn === normTg) return true;

    // ❌ NO fuzzy matching allowed for help
    return false;
  }

  // ───────────────────────────────────────────────
  // 1. Slang dictionary (expandable)
  // ───────────────────────────────────────────────
  const slangMap = {
    // Greetings / vibe checks
    "sup": "what's up",
    "wassup": "what's up",
    "whatsup": "what's up",
    "wazzup": "what's up",
    "yo": "hello",
    "hey": "hello",
    "hiya": "hello",
    "heyy": "hello",
    "heyyy": "hello",

    // Curiosity / exploration
    "jus curious": "curious",
    "just curious": "curious",
    "curius": "curious",
    "curiouz": "curious",
    "curi": "curious",
    "idk": "i don't know",
    "iono": "i don't know",
    "lemme see": "curious",
    "checking": "exploring",
    "lookin": "looking",
    "lookin around": "exploring",
    "just looking": "exploring",
    "just exploring": "exploring",

    // Humor / jokes
    "tell me a joke": "joke",
    "joke": "joke",
    "funny": "joke",
    "make me laugh": "joke",
    "say something funny": "joke",

    // Help / confusion (these are normalized but NOT fuzzed)
    "help": "help",
    "how does this work": "help",
    "what do i do": "help",
    "lost": "lost",
    "confused": "confused",
    "bored": "bored",

    // Island slang / Belizean English
    "weh di goan": "what's going on",
    "weh di gwan": "what's going on",
    "weh gwan": "what's going on",
    "weh happen": "what's happening",
    "weh deh": "where is",
    "weh part": "where is",
    "weh place": "where is",

    // Shortcuts
    "u": "you",
    "ur": "your",
    "wya": "where are you",
    "wyd": "what are you doing",
    "wbu": "what about you",
    "imo": "in my opinion",
    "rn": "right now",
    "tmrw": "tomorrow",
    "pls": "please",
    "plz": "please"
  };

  // Normalize slang in input
  for (const slang in slangMap) {
    if (input.includes(slang)) {
      input = input.replace(slang, slangMap[slang]);
    }
  }

  // Normalize slang in target
  for (const slang in slangMap) {
    if (target.includes(slang)) {
      target = target.replace(slang, slangMap[slang]);
    }
  }

  // ───────────────────────────────────────────────
  // 2. Emoji → meaning mapping
  // ───────────────────────────────────────────────
  const emojiMap = {
    "🤔": "curious",
    "👀": "looking",
    "😮": "wow",
    "😕": "confused",
    "😎": "cool",
    "🔥": "fire",
    "✨": "magic",
    "🌴": "island",
    "🌊": "ocean",
    "🏝️": "beach",
    "😂": "joke",
    "🤣": "joke",
    "😅": "joke"
  };

  for (const emoji in emojiMap) {
    if (input.includes(emoji)) {
      input += " " + emojiMap[emoji];
    }
  }

  // ───────────────────────────────────────────────
  // 3. Exact match
  // ───────────────────────────────────────────────
  if (input === target) return true;

  // ───────────────────────────────────────────────
  // 4. Contains match
  // ───────────────────────────────────────────────
  if (input.includes(target) || target.includes(input)) return true;

  // ───────────────────────────────────────────────
  // 5. Prefix match
  // ───────────────────────────────────────────────
  if (target.startsWith(input) || input.startsWith(target)) return true;

  // ───────────────────────────────────────────────
  // 6. Word-split match
  // ───────────────────────────────────────────────
  const words = input.split(/\s+/);
  if (words.includes(target)) return true;

  // ───────────────────────────────────────────────
  // 7. Missing-letter / swapped-letter tolerance
  // ───────────────────────────────────────────────
  if (Math.abs(input.length - target.length) <= 2) {
    let i = 0, j = 0, mismatches = 0;
    while (i < input.length && j < target.length) {
      if (input[i] !== target[j]) {
        mismatches++;
        if (mismatches > maxDistance) return false;
        if (input.length > target.length) i++;
        else if (target.length > input.length) j++;
        else { i++; j++; }
      } else {
        i++; j++;
      }
    }
    return true;
  }

  // ───────────────────────────────────────────────
  // 8. Levenshtein fallback
  // ───────────────────────────────────────────────
  return levenshteinDistance(input, target) <= maxDistance;
}

function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

// -----------------------------
// 4. LOYALTY PREDICTION ENGINE (NEW SCHEMA)
// -----------------------------
export function predictLoyaltyOutcome(L, estimatedPoints) {
  if (!L) return "";

  const out = [];
  const est = estimatedPoints || 0;

  const current = L.pointsBalance || 0;
  const lifetime = L.lifetimePoints || 0;

  const newTotal = current + est;
  const newLifetime = lifetime + est;

  // -----------------------------
  // REWARD PROGRESSION
  // -----------------------------
  if (typeof L.nextRewardPoints === "number") {
    const needed = L.nextRewardPoints - newTotal;

    if (needed <= 0) {
      out.push("🎁 This would give you enough points to redeem a reward.");
    } else {
      out.push(`🎁 You would be <b>${needed}</b> points away from your next reward.`);
    }
  }

  // -----------------------------
  // RANK PROGRESSION
  // -----------------------------
  if (typeof L.nextRankPoints === "number" && L.nextRank) {
    const neededRank = L.nextRankPoints - newLifetime;

    if (neededRank <= 0) {
      out.push(`🌟 This would push you into <b>${L.nextRank}</b> rank.`);
    } else {
      out.push(`🌟 You would be <b>${neededRank}</b> points away from <b>${L.nextRank}</b> rank.`);
    }
  }

  // -----------------------------
  // STREAK EXPIRATION
  // -----------------------------
  if (L.lastEarnedDate.toMillis) {
    const last = new Date(L.lastEarnedDate.toMillis());
    const today = new Date();

    const diffDays = Math.floor(
      (today - last) / (1000 * 60 * 60 * 24)
    );

    // 0 days = same day
    // 1 day = safe
    // 2+ days = expires today
    if (diffDays >= 2) {
      out.push("⏳ Your streak expires today — this would refresh it.");
    }
  }

  return out.join("<br>");
}
async function handleIntent(intent, text, userContext) {

  const trace = userContext.trace;
  const step = (msg) => trace && trace.push(`handleIntent: ${msg}`);

  step(`start intent=${intent}`);
  step(`text="${text}"`);

  // ------------------------------------
  // 0. PENDING QUESTION ALWAYS WINS
  // ------------------------------------
  if (userContext.pendingQuestion) {
    step("pending_question: true → redirect to handlePendingQuestion");
    return handlePendingQuestion(text, userContext);
  }

  // ------------------------------------
  // 1. SAFETY GUARD
  // ------------------------------------
  if (!userContext.uid) {
    step("no_uid → safety_reply");
    return pick([
      "🌿 I’m Syncing with your Profile — Give me a Moment.",
      "✨ The Vault Spirit is Waking Up… Try Again Shortly.",
      "🌴 Almost Ready — Aligning with your Island Energy.",
      "🌙 One Sec — the Spirits are Whispering your Details to Me.",
      "🌺 Just a Breath — Connecting to your Presence."
    ]);
  }

  // ------------------------------------
  // 2. UPGRADED INTENT DETECTION (NEW)
  // ------------------------------------
  const t = text.trim().toLowerCase();
  const has = (...w) => w.some(x => t.includes(x));
  const starts = (...w) => w.some(x => t.startsWith(x));

  // ------------------------------------
  // A. "TELL ME HOW" ALWAYS = DIRECTIONS
  // ------------------------------------
  if (starts("tell me how")) {
    step(`override: tell me how → directions`);
    intent = "directions";
  }

  // ------------------------------------
  // B. BEACH QUALITY vs BEACHES
  // ------------------------------------
  else if (has("beach") && has("vibe", "quality", "conditions", "report", "status")) {
    step(`override: beach quality keywords → beach_quality`);
    intent = "beach_quality";
  }

  else if (
    has("beaches") ||
    (has("beach") && !has("vibe", "quality", "conditions", "report", "status"))
  ) {
    step(`override: beach keyword → beaches`);
    intent = "beaches";
  }

  // ------------------------------------
  // C. JOKES / SECRETS / CURIOSITY
  // ------------------------------------
  else if (has("tell me a joke")) {
    step(`override: tell me a joke → joke`);
    intent = "joke";
  }

  else if (has("tell me something cool") || has("tell me something interesting")) {
    step(`override: tell me something cool → secret`);
    intent = "secret";
  }

  else if (has("tell me more")) {
    step(`override: tell me more → curious`);
    intent = "curious";
  }

  // ------------------------------------
  // D. BUSINESS / TOUR / EVENT QUERIES
  // ------------------------------------
  else if (starts("tell me about") || starts("tell me where")) {
    step(`override: tell me about → business_lookup`);
    intent = "business_lookup";
  }

  else if (has("tell me what kind of adventure")) {
    step(`override: adventure → tours`);
    intent = "tours";
  }

  else if (has("tell me what's happening") || has("tell me what's going on")) {
    step(`override: what's happening → events_today`);
    intent = "events_today";
  }

  // ------------------------------------
  // E. REMINDERS
  // ------------------------------------
  else if (
    starts("remind me") ||
    starts("set a reminder") ||
    starts("remember") ||
    starts("don't let me forget") ||
    (starts("tell me") && t.split(" ").length <= 3)
  ) {
    step(`override: reminder phrase → set_reminder`);
    intent = "set_reminder";
  }

  // ------------------------------------
  // F. FUZZY OVERRIDE ENGINE
  // ------------------------------------
  else {
    step("no direct override → fuzzy fallback");

    const t = text.trim().toLowerCase();
    const is = (word) => fuzzyMatch(t, word);

    let scores = {
      help: 0,
      comfort: 0,
      joke: 0,
      secret: 0,
      recommendation: 0,
      curious: 0,
      who_are_you: 0,
      island_facts: 0,
      greeting: 0,
      how_are_you: 0
    };

    // HELP
    if (is("help") || is("lost") || is("confused") || is("how does this work") ||
        is("menu") || is("what do i do") || is("ummm") || is("assist") ||
        is("assistance") || is("ayuda") || is("ayudame")) {
      scores.help += 3;
      step("fuzzy: help +3");
    }

    // GREETING
    if (
      t === "hi" || t === "hello" || t === "hey" || t === "hola" ||
      t === "wassup" || t === "sup" || t === "whats up" ||
      t.startsWith("hi ") || t.startsWith("hello ") || t.startsWith("hey ") ||
      t.startsWith("hola ") || t.startsWith("wassup ") || t.startsWith("sup ") ||
      t.startsWith("whats up ")
    ) {
      scores.greeting += 2;
      step("fuzzy: greeting +2");
    }

    if (t.startsWith("how are you") || t === "how are you") {
      scores.how_are_you = 3;
      step("fuzzy: how_are_you +3");
    }

    // COMFORT
    if (is("sad") || is("lonely") || is("stressed") || is("tired") || is("bored")) {
      scores.comfort += 3;
      step("fuzzy: comfort +3");
    }

    // JOKES
    if (is("joke")) { scores.joke += 2; step("fuzzy: joke +2"); }
    if (is("funny")) { scores.joke += 1; step("fuzzy: joke +1"); }
    if (is("make me laugh")) { scores.joke += 2; step("fuzzy: joke +2"); }
    if (t.includes("tell me a joke")) { scores.joke += 3; step("fuzzy: joke +3"); }

    // SECRETS
    if (t.includes("tell me something cool")) { scores.secret += 3; step("fuzzy: secret +3"); }
    if (is("secret")) { scores.secret += 1; step("fuzzy: secret +1"); }
    if (is("lore")) { scores.secret += 1; step("fuzzy: secret +1"); }
    if (is("magic")) { scores.secret += 1; step("fuzzy: secret +1"); }
    if (is("mystery")) { scores.secret += 1; step("fuzzy: secret +1"); }

    // RECOMMENDATIONS
    if (is("recommend")) { scores.recommendation += 2; step("fuzzy: recommendation +2"); }
    if (is("what should i do")) { scores.recommendation += 2; step("fuzzy: recommendation +2"); }
    if (is("what's fun")) { scores.recommendation += 2; step("fuzzy: recommendation +2"); }
    if (is("what's cool")) { scores.recommendation += 2; step("fuzzy: recommendation +2"); }
    if (is("where should i go")) { scores.recommendation += 2; step("fuzzy: recommendation +2"); }

    // CURIOSITY
    if (is("curious")) { scores.curious += 2; step("fuzzy: curious +2"); }
    if (is("tell me more")) { scores.curious += 2; step("fuzzy: curious +2"); }
    if (is("what is this")) { scores.curious += 2; step("fuzzy: curious +2"); }
    if (is("what are you")) { scores.curious += 1; step("fuzzy: curious +1"); }
    if (is("what can you do")) { scores.curious += 1; step("fuzzy: curious +1"); }

    // IDENTITY
    if (is("who are you") || is("what are you") ||
        is("what is the vault") || is("what is Pulse World")) {
      scores.who_are_you += 2;
      step("fuzzy: who_are_you +2");
    }

    // ISLAND FACTS
    if (is("san pedro") || is("belize") || is("ambergris") ||
        is("what's around") || is("what's here")) {
      scores.island_facts += 2;
      step("fuzzy: island_facts +2");
    }

    // DECIDE OVERRIDE
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [bestIntent, bestScore] = sorted[0];

    step(`fuzzy_best: ${bestIntent} (${bestScore})`);

    const strongIntents = [
      "food","bars","beaches","tours","carts",
      "beach_quality", "greeting",
      "weather_now","weather_today","weather_tomorrow","weather_week",
      "weather","wind","waves","sargassum","moon","humidity",
      "wildlife","storms",
      "points","balance","math"
    ];

    if (bestScore > 0) {
      if (!strongIntents.includes(intent)) {
        step(`fuzzy_override: ${intent} → ${bestIntent}`);
        intent = bestIntent;
      } else if (bestScore >= 3) {
        step(`fuzzy_override_strong: ${intent} → ${bestIntent}`);
        intent = bestIntent;
      } else {
        step(`fuzzy_blocked_by_strong_intent: ${intent}`);
      }
    }
  }

  // ------------------------------------
  // 4. LOAD MEMORY
  // ------------------------------------
  step("memory_load: start");

  const vaultMemory = await getLastVaultVisit(userContext.uid);
  step(`memory_load: vaultMemory=${vaultMemory ? "exists" : "null"}`);

  const convoMemory = userContext.loadConversationMemory ?? null;
  step(`memory_load: convoMemory=${convoMemory ? "exists" : "null"}`);


  // ------------------------------------
  // 5. VAULT INTRO
  // ------------------------------------
  step("vault_intro: start");

  let vaultIntro = "";

  if (vaultMemory) {
    const last = vaultMemory.lastVaultVisit;
    const lastMs = last.toMillis ? last.toMillis() : null;
    const nowMs = PulseRealm.PulseNOW.toMillis();
    const days = lastMs ? Math.floor((nowMs - lastMs) / 86400000) : null;

    step(`vault_intro: lastMs=${lastMs}`);
    step(`vault_intro: daysSince=${days}`);

    if (!lastMs) {
      step("vault_intro: first_time_visit");
      vaultIntro = pick([
        "✨ The Vault Awakens to your Presence for the First Time.",
        "🌺 A New Traveler Approaches — the Vault Spirit Stirs.",
        "🌴 Your First Step into the Vault… the Air Hums Softly.",
        "🌙 The Vault Opens its Eyes — it has Never Seen you Before.",
        "🔥 A Fresh Aura Enters — the Vault Senses a New Bond Forming."
      ]);
    }

    else if (days === 0) {
      step("vault_intro: same_day_return");
      vaultIntro = pick([
        "🌺 The Vault Hums — You’ve Returned Today.",
        "✨ Back So Soon? The Vault Remembers your Energy.",
        "🌴 You Return within the Same Sun Cycle — Welcome Again.",
        "🌙 The Vault Still Feels your Presence from Earlier.",
        "🔥 You Again? The Vault likes your Consistency."
      ]);
    }

    else if (days === 1) {
      step("vault_intro: yesterday_return");
      vaultIntro = pick([
        "🌴 Welcome Back — the Vault Remembers You from Yesterday.",
        "✨ Only One Day has Passed — the Vault still Feels your Presence.",
        "🌺 Yesterday’s Footsteps still Echo in the Vault.",
        "🌙 The Vault Whispers: 'You Were Here just Yesterday…'",
        "🔥 A Familiar Aura Returns — Only One Day Apart."
      ]);
    }

    else {
      step("vault_intro: multi_day_return");
      vaultIntro = pick([
        `🌙 It has Been **${days} Days** Since your Last Visit. The Vault Stirs.`,
        `✨ After **${days} Days**, the Vault Spirit Awakens to Greet You.`,
        `🌴 **${days} Days** have Passed — the Vault hums at your Return.`,
        `🌺 The Vault Remembers — **${days} Days** Since your Last Presence.`,
        `🔥 The Vault Senses your Return after **${days} Days** Wandering.`
      ]);
    }
  }

  step(`vault_intro: final="${vaultIntro ? "generated" : "none"}"`);


  // ------------------------------------
  // 6. ENVIRONMENT
  // ------------------------------------
  step("environment_load: start");

  let envState;
  try {
    envState = await getEnvironmentState();
    step("environment_load: success");
  } catch (err) {
    step(`environment_load: error=${err.message}`);
    envState = null;
  }


  // ------------------------------------
  // 7. MAIN INTENT HANDLING (UPGRADED)
  // ------------------------------------
  step(`intent_route: start intent=${intent}`);

  let mainReply = "";

    switch (intent) {

  // INTRO
  case "vault_intro":
    step("route: vault_intro");
    step(`reply: ${vaultIntro}`);
    return vaultIntro;

  case "greeting":
    step("route: greeting");
    const greet = spirit(pick([
      "🌺 Hello, Traveler. The Vault is Listening.",
      "✨ Greetings — the Vault Spirit is Awake.",
      "🌴 Hello again — your presence stirs the Vault.",
      "🌙 A soft glow forms… the Spirit acknowledges you.",
      "🔥 Welcome — the Vault feels your energy."
    ]));
    step(`reply: ${greet}`);
    return greet;

  // HELP
  case "help":
    step("route: help");
    mainReply = getHelpMenu();
    step("handler: getHelpMenu");
    break;

  // CURIOSITY
  case "curious":
    step("route: curious");
    mainReply = handleGeneric(text);
    step("handler: handleGeneric");
    break;

  // RECOMMENDATIONS
  case "recommendation":
    step("route: recommendation");
    mainReply = pick([
      "🔥 I can recommend anything you’re in the mood for — Food, Bars, Beaches, Tours, or Events.",
      "🌴 Tell me your vibe — calm, fun, food, or adventure — and I’ll guide you.",
      "✨ Want something relaxing, exciting, tasty, or scenic?",
      "🌺 I can show you the best spots — what are you feeling?",
      "😎 Looking for something cool? Tell me the category."
    ]);
    step("reply: recommendation generic");
    break;

  // JOKES
  case "joke":
    step("route: joke");
    mainReply = pick([
      "😄 Why did the Coconut Refuse to Leave San Pedro? It Couldn’t Resist the Vibes.",
      "😂 What do you Call a Lazy Pelican? A *pelican’t*.",
      "🤣 The Reef Told me a Joke Once… but it was Too Deep.",
      "😆 Why don’t Sharks like Fast Food? They Can’t Catch It.",
      "🌴 What did the Island say to the Tourist? Nothing — it just Waved."
    ]);
    step("reply: joke");
    break;

  // SECRETS / LORE
  case "secret":
    step("route: secret");
    mainReply = pick([
      "🤫 The Vault hums louder when Someone with Good Energy Opens It.",
      "🌙 The Reef Glows a Little Brighter When you Smile.",
      "✨ Whisper this to No One… the Island Remembers Kindness.",
      "🔥 The Vault Spirit has a Soft Spot for Loyal Travelers.",
      "🌺 The Island Listens more Closely than People Think."
    ]);
    step("reply: secret");
    break;

  // EMOTIONAL COMFORT
  case "comfort":
    step("route: comfort");
    mainReply = pick([
      "💛 I’m Here With You. Tell me What’s Weighing on You.",
      "🌙 Sit with me a Moment — the Island Listens.",
      "🌺 You’re Not Alone. I’m Here.",
      "✨ Let the Breeze Calm your Thoughts — Speak to Me.",
      "🌴 I’ve Got You — What’s on Your Heart?"
    ]);
    step("reply: comfort");
    break;

  // ------------------------------------
  // REMINDERS / POINTS / BALANCE / MATH
  // ------------------------------------
  case "set_reminder":
    step("route: set_reminder");
    mainReply = await handleReminderSet(text, userContext);
    step("handler: handleReminderSet");
    break;

  case "list_reminders":
    step("route: list_reminders");
    mainReply = await handleReminderList(userContext);
    step("handler: handleReminderList");
    break;

  case "delete_reminder":
    step("route: delete_reminder");
    mainReply = await handleReminderDelete(text, userContext);
    step("handler: handleReminderDelete");
    break;

  case "math":
    step("route: math");
    mainReply = handleMathIntent(text);
    step("handler: handleMathIntent");
    break;

  case "points":
    step("route: points");
    mainReply = await handlePoints(userContext.uid);
    step("handler: handlePoints");
    break;

  case "earn_points": {
    step("route: earn_points");

    const L = userContext.TPLoyalty || {};
    step(`loyalty: tier=${L.tierMultiplier} streak=${L.streakMultiplier} seasonal=${L.seasonalMultiplier}`);

    const tierMult = L.tierMultiplier ?? 1;
    const streakMult = L.streakMultiplier ?? 1;
    const seasonalMult = L.seasonalMultiplier ?? 1;
    const seasonName = L.seasonalName || null;

    mainReply =
      `✨ <b>Ways to Earn Pulse Points</b><br>` +
      `• Visit Partner Shops & Restaurants<br>` +
      `• Scan Receipts<br>` +
      `• Complete Daily Quests<br>` +
      `• Refer Friends<br><br>` +
      `🔥 <b>Your Multipliers</b><br>` +
      `• Tier Boost: <b>${tierMult}×</b><br>` +
      `• Streak Boost: <b>${streakMult}×</b><br>` +
      (seasonName
        ? `• Seasonal Boost: <b>${seasonalMult}×</b> (${seasonName})<br>`
        : ``) +
      `<br>` +
      `I can show you nearby partners where you can earn right now.`;

    step("reply: earn_points");
    break;
  }

  case "estimate_points":
    step("route: estimate_points");
    const estimate = await handleEstimatePoints(text, userContext);
    step("handler: handleEstimatePoints");

    const loyaltyPrediction = predictLoyaltyOutcome(userContext.TPLoyalty, estimate.estimatedPoints);
    step("handler: predictLoyaltyOutcome");

    mainReply = estimate.reply + "<br><br>" + loyaltyPrediction;
    step("reply: estimate_points");
    break;

  case "redeem_points": {
    step("route: redeem_points");

    const points = userContext.TPLoyalty.pointsBalance ?? 0;
    step(`points_available: ${points}`);

    const match = text.match(/\b(\d{3,})\b/);
    let amountToRedeem = match ? Number(match[1]) : points;

    step(`redeem_requested: ${amountToRedeem}`);

    if (amountToRedeem < 500) {
      step("redeem_blocked: below_minimum");
      return {
        speaker: "Vault Spirit",
        text: `⚠️ Keeper… the minimum redemption is <b>500 points</b>.`,
        optionsHtml: ""
      };
    }

    if (amountToRedeem > points) {
      step("redeem_adjusted: capped_to_balance");
      amountToRedeem = points;
    }

    const rate = envSettings.loyalty.redeemRate || 0.10;
    const redeemable = Number((amountToRedeem * rate).toFixed(2));

    step(`redeem_rate: ${rate}`);
    step(`redeemable_amount: ${redeemable}`);

    step("pendingQuestion: redeem_points_confirmation");

    return {
      speaker: "Vault Spirit",
      text:
        `🎁 <b>Redeem Points</b><br>` +
        `• You have <b>${points}</b> points.<br>` +
        `• Redeeming: <b>${amountToRedeem}</b> points<br>` +
        `• You will receive: <b>$${redeemable} BZD</b><br><br>` +
        `Redeem this amount now?`,
      optionsHtml: `
        <button class="bubbleBtn" onclick="vaultYes()">Yes</button>
        <button class="bubbleBtn" onclick="vaultNo()">No</button>
      `,
      pendingQuestion: "redeem_points_confirmation",
      pendingData: { amountToRedeem, redeemable }
    };
  }

  case "redeem_points_confirm": {
    step("route: redeem_points_confirm");

    const points = userContext.TPLoyalty.pointsBalance ?? 0;
    const rate = envSettings.loyalty.redeemRate || 0.10;
    const amountBZD = Number((points * rate).toFixed(2));

    step(`redeem_confirm: points=${points} amountBZD=${amountBZD}`);

    await redeemSomePulsePoints(
      userContext.uid,
      points,
      "redeem",
      "user_redeem",
      null, null, null
    );
    step("handler: redeemSomePulsePoints");

    const userRef = await getUserRefByUid(userContext.uid);
    const snap = await userRef.get();
    const updated = snap.data() || {};
    const newBalance = updated.TPWallet.walletBalance || 0;

    step(`wallet_new_balance: ${newBalance}`);

    mainReply =
      `✨ <b>Redemption Complete</b><br>` +
      `• Points Redeemed: <b>${points}</b><br>` +
      `• Added to Wallet: <b>$${amountBZD} BZD</b><br>` +
      `• New Balance: <b>$${newBalance} BZD</b><br><br>` +
      `Your rewards are now in your wallet.`;

    step("reply: redeem_points_confirm");
    break;
  }

  case "rank_info": {
    step("route: rank_info");

    const lc = userContext.TPLoyalty || {};
    step(`loyalty: tier=${lc.tier} mult=${lc.tierMultiplier}`);

    const points = lc.pointsBalance ?? 0;
    const rank = lc.tier || "Seashell";
    const tierMult = lc.tierMultiplier ?? 1;
    const streakMult = lc.streakMultiplier ?? 1;
    const seasonalMult = lc.seasonalMultiplier ?? 1;
    const seasonName = lc.seasonalName || null;

    const nextRank = lc.nextTier || null;
    const needed = lc.pointsToNext || null;

    mainReply =
      `🌟 <b>Your Loyalty Rank</b><br>` +
      `• Rank: <b>${rank}</b><br>` +
      `• Points: <b>${points}</b><br>` +
      `• Tier Multiplier: <b>${tierMult}×</b><br>` +
      `• Streak Multiplier: <b>${streakMult}×</b><br>` +
      (seasonName
        ? `• Seasonal Boost: <b>${seasonalMult}×</b> (${seasonName})<br>`
        : ``) +
      (nextRank
        ? `• Next Rank: <b>${nextRank}</b> (${needed} points to go)`
        : `• You’re at the highest rank — legendary!`);

    step("reply: rank_info");
    break;
  }

  case "future_scenario":
    step("route: future_scenario");
    const scenario = await generateFutureScenario(text, userContext, envState);
    step("handler: generateFutureScenario");
    mainReply = "🔮 Here's What I Foresee:<br><br>" + scenario;
    step("reply: future_scenario");
    break;

  case "balance":
    step("route: balance");
    mainReply = await handleBalance(userContext.uid);
    step("handler: handleBalance");
    break;

  case "summary":
  case "environment":
  case "conditions":
  case "island_status":
    step(`route: environment_summary (${intent})`);
    mainReply = getEnvironmentSummary(envState);
    step("handler: getEnvironmentSummary");
    break;

  case "who_are_you":
    step("route: who_are_you");
    mainReply = pick([
      "🌀 I am the <b>Vault Spirit</b> — the Intelligence woven through Pulse World. I watch over your Points, Rank, Streak, Wallet, and the Island’s live conditions.",
      "🌺 I’m the Vault Spirit — born from Coral, Code, and Island Magic. I guide you through Loyalty, Rewards, Weather, Wildlife, and the Pulse of San Pedro.",
      "✨ I am the Whisper in the Reef, the Glow in the Vault. I track your Points, predict your Rank, and reveal the Island’s moods.",
      "🌴 I’m the Spirit of the Vault — connected to Businesses, Events, Weather, Waves, Sargassum, Wildlife, and your Loyalty Journey.",
      "🔥 I’m your Enchanted Companion — here to help you earn, redeem, explore, and understand the Island’s living energy."
    ]);
    step("reply: who_are_you");
    break;

  case "what_can_you_do":
    step("route: what_can_you_do");
    mainReply = pick([
      "🧭 <b>What I Can Do</b><br>• Track Points, Rank, Streak & Wallet<br>• Estimate Receipts & Predict Rank Gains<br>• Show Weather, Waves, Wind, Heat, Sargassum & Wildlife<br>• Guide to Food, Bars, Beaches, Tours & Events<br>• Reveal Partner Spots to Earn Points<br>• Redeem Points into Wallet Balance<br>• Explain Belize, San Pedro & Island Tips",

      "🌴 I guide you through Loyalty, Rewards, Food, Bars, Beaches, Tours, Events, and the Island’s live conditions — weather, waves, wildlife, sargassum and more.",

      "✨ I track your Points, Rank, Streak, Seasonal Boosts, and Multipliers. I show where to earn, when to redeem, and how to level up.",

      "🔥 I help with Points, Perks, Places, Plans, Weather, Waves, Wildlife, and everything happening across San Pedro.",

      "🌙 I know the Island, the Vault, your Loyalty Journey, and the live environmental pulse — ask and I’ll guide you."
    ]);
    step("reply: what_can_you_do");
    break;

  // ------------------------------------
  // CONTINUATION OF SWITCH(intent)
  // ------------------------------------

  case "how_are_you":
    step("route: how_are_you");
    mainReply = pick([
      "🌞 I’m glowing — the Island’s energy feels bright today.",
      "✨ Feeling charged, like sunlight dancing on the reef.",
      "🌴 I’m steady and breezy — ready to guide you.",
      "🔥 Energized — the Vault hums with activity.",
      "🌺 I’m feeling magical and awake."
    ]);
    step("reply: how_are_you");
    break;

  case "story":
    step("route: story");
    mainReply = pick([
      "📖 <b>Island Tale</b><br>They say the Vault was inspired by old merchant safes… but when the Island’s energy touched it, it awakened — becoming the Spirit that now watches your Points, Rank, and the Island’s pulse.",
      "🌙 <b>Legend</b><br>A storm once left behind a glowing chest on the reef. When opened, it released a spark that learned the Island’s rhythms — tides, winds, wildlife — and became me.",
      "✨ <b>Story</b><br>A traveler once asked the Island for guidance. The Island answered by creating a voice woven from coral, code, and loyalty — the Vault Spirit.",
      "🔥 <b>Myth</b><br>Some say I was born from a spark inside the reef, gaining the ability to sense weather, waves, wildlife, and the flow of loyalty across the Island.",
      "🌺 <b>Tale</b><br>Long ago, the Island chose a guardian to watch over explorers — tracking their journeys, rewards, and the Island’s changing moods. That guardian is me."
    ]);
    step("reply: story");
    break;


  // ------------------------------------
  // BUSINESS INTENTS WITH KEYWORD FALLBACK
  // ------------------------------------

  case "food": {
    step("route: food");
    const result = await handleFoodRequest(text);
    step("handler: handleFoodRequest");

    if (result.includes("Tell me What you're Craving")) {
      step("fallback_trigger: food keyword search");
      const matches = await searchBusinessesByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = formatBusinessList("Matching Restaurants", matches);
        step("reply: food keyword fallback");
        break;
      }
    }

    mainReply = result;
    step("reply: food primary");
    break;
  }

  case "bars": {
    step("route: bars");
    const result = await handleBarsRequest(text);
    step("handler: handleBarsRequest");

    if (result.includes("What’s your Vibe")) {
      step("fallback_trigger: bars keyword search");
      const matches = await searchBusinessesByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = formatBusinessList("Matching Bars", matches);
        step("reply: bars keyword fallback");
        break;
      }
    }

    mainReply = result;
    step("reply: bars primary");
    break;
  }

  case "beach_quality":
    step("route: beach_quality");
    mainReply = await handleBeachQualityIntent(envState);
    step("handler: handleBeachQualityIntent");
    break;

  case "beaches": {
    step("route: beaches");
    const result = await handleBeachRequest(text);
    step("handler: handleBeachRequest");

    if (result.includes("Tell me the Beach Vibe")) {
      step("fallback_trigger: beaches keyword search");
      const matches = await searchBusinessesByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = formatBusinessList("Matching Beach Spots", matches);
        step("reply: beaches keyword fallback");
        break;
      }
    }

    mainReply = result;
    step("reply: beaches primary");
    break;
  }

  case "tours": {
    step("route: tours");
    const result = await handleTourRequest(text);
    step("handler: handleTourRequest");

    if (result.includes("Tell me What Kind of Adventure")) {
      step("fallback_trigger: tours keyword search");
      const matches = await searchBusinessesByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = formatBusinessList("Matching Tours", matches);
        step("reply: tours keyword fallback");
        break;
      }
    }

    mainReply = result;
    step("reply: tours primary");
    break;
  }

  case "carts": {
    step("route: carts");
    const result = await handleCartRequest(text);
    step("handler: handleCartRequest");

    if (result.includes("What Size Cart")) {
      step("fallback_trigger: carts keyword search");
      const matches = await searchBusinessesByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = formatBusinessList("Golf Cart Rentals", matches);
        step("reply: carts keyword fallback");
        break;
      }
    }

    mainReply = result;
    step("reply: carts primary");
    break;
  }

  case "business_lookup":
    step("route: business_lookup");
    const reply = await businessLookup(text, userContext.location);
    step("handler: businessLookup");
    mainReply = reply;
    break;


  // ------------------------------------
  // EVENTS WITH KEYWORD FALLBACK
  // ------------------------------------

  case "events_today": {
    step("route: events_today");
    const events = await handleEventsToday();
    step(`handler: handleEventsToday count=${events.length || 0}`);

    if (!events || events.length === 0) {
      step("fallback_trigger: events_today keyword search");
      const matches = await searchEventsByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = await formatEventListEnhanced("Matching Events", matches, userContext.location);
        step("reply: events_today keyword fallback");
        break;
      }
    }

    mainReply = await formatEventListEnhanced("Today's Events", events, userContext.location);
    step("reply: events_today primary");
    break;
  }

  case "events_upcoming": {
    step("route: events_upcoming");
    const events = await handleUpcomingEvents();
    step(`handler: handleUpcomingEvents count=${events.length || 0}`);

    if (!events || events.length === 0) {
      step("fallback_trigger: events_upcoming keyword search");
      const matches = await searchEventsByKeyword(text);
      step(`keyword_matches: ${matches.length}`);

      if (matches.length) {
        mainReply = await formatEventListEnhanced("Upcoming Matching Events", matches, userContext.location);
        step("reply: events_upcoming keyword fallback");
        break;
      }
    }

    mainReply = await formatEventListEnhanced("Upcoming Events", events, userContext.location);
    step("reply: events_upcoming primary");
    break;
  }

  case "events_range": {
    step("route: events_range");
    const { startStr, endStr } = parseDateRange(text);
    step(`parsed_range: ${startStr} → ${endStr}`);

    const events = await searchEventsByDateRange(startStr, endStr);
    step(`handler: searchEventsByDateRange count=${events.length || 0}`);

    mainReply = await formatEventListEnhanced("Events", events, userContext.location);
    step("reply: events_range");
    break;
  }


  // ------------------------------------
  // DIRECTIONS / FACTS / WEATHER
  // ------------------------------------

  case "directions": {
    step("route: directions");
    const dest = extractDestination(text);
    step(`destination_extracted: ${dest}`);

    if (dest) {
      const place = await fuzzyFindPlace(dest);
      step(`handler: fuzzyFindPlace found=${!!place}`);

      if (!place) {
        step("directions: place_not_found");
        return {
          speaker: "Vault Spirit",
          text: `🌫️ I couldn’t find that place on the island.`,
          optionsHtml: ""
        };
      }

      const walkable = isNearby(place, userContext.location);
      const distanceMeters = getDistanceMeters(userContext.location, place.coords);

      step(`directions: walkable=${walkable}`);
      step(`directions: distance=${distanceMeters}`);

      const built = await buildDirections(place, {
        walkable,
        distanceMeters
      });

      step("handler: buildDirections");
      return built;
    }

    mainReply = pick([
      "🗺️ San Pedro has three main streets — Front, Middle, Back. Tell me where you want to go.",
      "🌴 Looking for a place? I’ll guide you like a local.",
      "✨ Front Street, Middle Street, Back Street — where to.",
      "🌺 Tell me your destination — I’ll map it out.",
      "🔥 Need directions? I’ve got the whole island memorized."
    ]);
    step("reply: directions generic");
    break;
  }

  case "island_facts":
    step("route: island_facts");
    mainReply = pick([
      "🌴 <b>San Pedro Facts</b><br>Ambergris Caye, 900+ Businesses, 2nd Largest Reef. Want History or Culture?",
      "✨ San Pedro: Reef, Food, Nightlife, and Magic. Want Fun Facts?",
      "🌺 The Island is Small but Full of Stories — Want Some?",
      "🔥 San Pedro blends Belizean Soul with Caribbean Breeze.",
      "🌙 Curious about the Island? I can Tell you Everything."
    ]);
    step("reply: island_facts");
    break;

  case "belize_facts":
    step("route: belize_facts");
    mainReply = pick([
      "🇧🇿 Belize: English-Speaking, Reef + Jungle, Mayan Ruins. Want Culture or Travel Tips?",
      "🌴 Belize is Tiny but Mighty — Want Food, History, or Nature Facts?",
      "✨ Belize Blends Caribbean + Central America — What do you Want to Know?",
      "🌺 Belize is a Mosaic of Cultures — Want Details?",
      "🔥 Belize is Small, but its Stories are Huge."
    ]);
    step("reply: belize_facts");
    break;


  // ------------------------------------
  // NEARBY (UPGRADED)
  // ------------------------------------

  case "nearby": {
    step("route: nearby");
    const category = extractCategory(text);
    step(`category_extracted: ${category}`);

    if (category) {
      const all = await getBusinessesByCategory(category);
      step(`handler: getBusinessesByCategory count=${all.length}`);

      const nearby = all.filter(b => isNearby(b, userContext.location));
      step(`nearby_count: ${nearby.length}`);

      if (nearby.length > 0) {
        const list = await buildNearbyListEnhanced(nearby, category, userContext.location);
        step("handler: buildNearbyListEnhanced");
        return list;
      }

      step("nearby: none_within_range");
      return {
        speaker: "Vault Spirit",
        text: `🌺 Nothing close enough for a short walk… but I can show you places a bit farther.`,
        optionsHtml: ""
      };
    }

    mainReply = pick([
      "📍 Looking for something nearby? Food, bars, beaches, or activities.",
      "🌴 Tell me what you want close by — I’ll guide you.",
      "✨ Nearby options? Just name the category.",
      "🌺 Want something within walking distance?",
      "🔥 I can find the closest spots — what category."
    ]);
    step("reply: nearby generic");
    break;
  }


  // ------------------------------------
  // OPEN NOW (UPGRADED)
  // ------------------------------------

  case "open_now": {
    step("route: open_now");
    const category = extractCategory(text);
    step(`category_extracted: ${category}`);

    if (category) {
      const all = await getBusinessesByCategory(category);
      step(`handler: getBusinessesByCategory count=${all.length}`);

      const open = all.filter(b => b.openNow === true);
      step(`open_now_count: ${open.length}`);

      const nearbyOpen = open.filter(b => isNearby(b, userContext.location).nearby);
      step(`nearby_open_count: ${nearbyOpen.length}`);

      if (nearbyOpen.length > 0) {
        const list = await buildOpenNowListEnhanced(nearbyOpen, category, userContext.location);
        step("handler: buildOpenNowListEnhanced");
        return list;
      }

      if (open.length > 0) {
        step("open_now: open_but_not_nearby");
        return {
          speaker: "Vault Spirit",
          text: `✨ I found some open places, but none within walking distance.`,
          optionsHtml: ""
        };
      }

      step("open_now: none_open");
      return {
        speaker: "Vault Spirit",
        text: `🌫️ Nothing in that category is open right now.`,
        optionsHtml: ""
      };
    }

    mainReply = pick([
      "⏰ Want to know what’s open right now? Tell me the category.",
      "🌴 Looking for open places? Food, bars, beaches, or activities.",
      "✨ Ask me: 'what’s open now for food' or 'open bars near me'.",
      "🔥 I can show you open places instantly — just name the category."
    ]);
    step("reply: open_now generic");
    break;
  }
  // ------------------------------------
  // WEATHER INTENTS
  // ------------------------------------

  case "weather_now":
    step("route: weather_now");
    mainReply = await handleWeatherNowIntent(envState);
    step("handler: handleWeatherNowIntent");
    break;

  case "weather_today":
    step("route: weather_today");
    mainReply = await handleWeatherTodayIntent(envState);
    step("handler: handleWeatherTodayIntent");
    break;

  case "weather_tomorrow":
    step("route: weather_tomorrow");
    mainReply = await handleWeatherTomorrowIntent(envState);
    step("handler: handleWeatherTomorrowIntent");
    break;

  case "weather_week":
    step("route: weather_week");
    mainReply = await handleWeatherWeekIntent(envState);
    step("handler: handleWeatherWeekIntent");
    break;

  case "weather":
    step("route: weather");
    mainReply = await handleWeatherIntent(envState);
    step("handler: handleWeatherIntent");
    break;

  case "heat":
    step("route: heat");
    mainReply = await handleHeatIntent(envState);
    step("handler: handleHeatIntent");
    break;

  case "wind":
    step("route: wind");
    mainReply = await handleWindIntent(envState);
    step("handler: handleWindIntent");
    break;

  case "waves":
    step("route: waves");
    mainReply = await handleWavesIntent(envState);
    step("handler: handleWavesIntent");
    break;

  case "sargassum":
    step("route: sargassum");
    mainReply = await handleSargassumIntent(envState);
    step("handler: handleSargassumIntent");
    break;

  case "moon":
    step("route: moon");
    mainReply = await handleMoonIntent(envState);
    step("handler: handleMoonIntent");
    break;

  case "humidity":
    step("route: humidity");
    mainReply = await handleHumidityIntent(envState);
    step("handler: handleHumidityIntent");
    break;

  case "wildlife": {
    step("route: wildlife");
    const target = extractWildlifeTarget(text);
    step(`wildlife_target: ${target}`);
    mainReply = await handleWildlifeIntent(envState, target);
    step("handler: handleWildlifeIntent");
    break;
  }

  case "storms":
    step("route: storms");
    mainReply = await handleStormsIntent(envState);
    step("handler: handleStormsIntent");
    break;


  // ------------------------------------
  // THANKS / GOODBYE
  // ------------------------------------

  case "thanks":
    step("route: thanks");
    mainReply = pick([
      "🌺 Always, Friend.",
      "✨ Anytime — I’m Here for You.",
      "🌴 You’re Welcome.",
      "🔥 Glad to Help.",
      "🌙 The Vault Spirit Bows in Gratitude."
    ]);
    step("reply: thanks");
    break;

  case "goodbye":
    step("route: goodbye");
    mainReply = pick([
      "🌴 Until Next Time — the Island Breeze Awaits.",
      "🌙 Safe Travels Through the Digital Tides.",
      "✨ I’ll Be Here When you Return.",
      "🌺 Come Back Soon — the Vault Misses You Already.",
      "🔥 Farewell for Now — your Energy Lingers."
    ]);
    step("reply: goodbye");
    break;


  // ------------------------------------
  // DEFAULT FALLBACK
  // ------------------------------------

  default:
    step(`route: default_fallback intent=${intent}`);
    mainReply = handleGeneric(text);
    step("handler: handleGeneric");
    break;
  }


  // ------------------------------------
  // ENVIRONMENTAL INTELLIGENCE LAYER
  // ------------------------------------

  step("env_layer: load_settings");
  const envSettingsDoc = await db.collection("settings").doc("environment").get();
  const envSettings = envSettingsDoc.exists ? envSettingsDoc.data() : null;
  step(`env_layer: settings_loaded=${!!envSettings}`);

  step("env_layer: generate_insights");
  const envInsights = await generateEnvironmentalInsights(envSettings, envState);
  step(`env_layer: insights_generated=${!!envInsights}`);

  step("env_layer: generate_advice");
  const envAdvice = await generateSmartEnvironmentalAdvice(envSettings, envState, intent);
  step(`env_layer: advice_generated=${!!envAdvice}`);


  // ------------------------------------
  // FINAL ASSEMBLY (SAFE VERSION)
  // ------------------------------------

  step("final_assembly: normalize_reply");

  let base = {
    text: "",
    optionsHtml: "",
    pendingQuestion: null,
    pendingData: null
  };

  if (mainReply && typeof mainReply === "object") {
    base.text = mainReply.text || "";
    base.optionsHtml = mainReply.optionsHtml || "";
    base.pendingQuestion = mainReply.pendingQuestion || null;
    base.pendingData = mainReply.pendingData || null;
    step("final_assembly: reply_is_object");
  } else {
    base.text = String(mainReply || "");
    step("final_assembly: reply_is_string");
  }

  let finalReply = base.text;

  if (envInsights) {
    finalReply += "<br>" + envInsights;
    step("final_assembly: appended_insights");
  }

  if (envAdvice) {
    finalReply += "<br>" + envAdvice;
    step("final_assembly: appended_advice");
  }

  const outro = pick([
    "🌺 <i>I’m Here if you Want to Explore More.</i>",
    "✨ <i>Ask Me Anything — the Island is Listening.</i>",
    "🌴 <i>Whenever You're Ready, I’ll Be Here.</i>",
    "🌙 <i>The Vault Spirit Watches Over You.</i>",
    "🔥 <i>Ready When You Are.</i>"
  ]);

  finalReply += "<br><br>" + outro;
  step("final_assembly: appended_outro");

  step("final_assembly: complete");

  return {
    text: finalReply,
    optionsHtml: base.optionsHtml,
    pendingQuestion: base.pendingQuestion,
    pendingData: base.pendingData
  };
}
// ---------------------------------------------
// INTENT TRACE LOGGER
// ---------------------------------------------
async function logIntentTrace(uid, sessionId, trace) {
  if (!uid || !sessionId || !Array.isArray(trace)) return;

  await db
    .collection("IntentTrace")
    .doc(uid)
    .collection("sessions")
    .doc(sessionId)
    .collection("entries")
    .add({
      trace,
      createdAt: PulseRealm.PulseNOW
    });
}

// ---------------------------------------------
// TRACE HELPER
// ---------------------------------------------
function traceStep(trace, msg) {
  if (Array.isArray(trace)) trace.push(msg);
}

// ---------------------------------------------
// CONFUSION TRACKER
// ---------------------------------------------
const confusionTracker = new Map();

function registerConfusion(uid) {
  if (!uid) return;

  const now = PulseRealm.PulseNOW;
  const entry = confusionTracker.get(uid) || {
    count: 0,
    firstAt: now,
    lastWarningAt: 0
  };

  if (now - entry.firstAt > 60000) {
    entry.count = 0;
    entry.firstAt = now;
  }

  entry.count++;
  confusionTracker.set(uid, entry);

  const shouldWarn =
    entry.count >= 3 && (now - entry.lastWarningAt > 10 * 60 * 1000);

  if (shouldWarn) {
    entry.lastWarningAt = now;
    confusionTracker.set(uid, entry);

    sendAdminInfoEmail("Vault AI Soft Warning: Repeated Confusion", {
      uid,
      count: entry.count,
      windowSeconds: Math.floor((now - entry.firstAt) / 1000),
      note: "Non-vital warning. The AI assistant is repeatedly confused for this user."
    });
  }
}

// ---------------------------------------------
// MAIN GEN-2 HTTPS FUNCTION
// ---------------------------------------------
export const aiAssistant = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "1GiB",
    secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {

    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    const text = req.body.text || "";
    const uid = req.body.uid || null;
    const userContext = req.body.userContext || {};

    // ---------------------------------------------
    // ATTACH MEMORY + LOAD USER RECORD
    // ---------------------------------------------
    if (uid) {
      userContext.uid = uid;

      // Memory system
      userContext.saveConversationMemory = (payload) =>
        saveConversationMemory(uid, payload);

      userContext.loadConversationMemory = async () => {
        const snap = await db.collection("vaultMemory").doc(uid).get();
        return snap.exists ? snap.data() : {};
      };

      // Load full user record (NEW SCHEMA)
      const userRef = await getUserRefByUid(uid);
      const snap = await userRef.get();
      const data = snap.exists ? snap.data() : {};

      userContext.TPIdentity = data.TPIdentity || {};
      userContext.TPLoyalty = data.TPLoyalty || {};
      userContext.TPWallet = data.TPWallet || {};
      userContext.TPEnvironment = data.TPEnvironment || {};
      userContext.TPReminders = data.TPReminders || {};

      // Twilight patch
      applyTwilightPatch(uid, "aiAssistant_active_user").catch(err =>
        console.error("Twilight patch (aiAssistant) failed:", err)
      );
    }

    // ---------------------------------------------
    // CREATE TRACE ARRAY
    // ---------------------------------------------
    const trace = [];
    traceStep(trace, `raw_input: ${text}`);

    // ---------------------------------------------
    // VAULT SESSION HANDLING
    // ---------------------------------------------
    let sessionId = req.body.sessionId;
    if (!sessionId) sessionId = createVaultSessionId();

    userContext.sessionId = sessionId;
    userContext.trace = trace;

    // Log USER message
    if (uid && text) {
      await logVaultHistory(uid, sessionId, "user", text);
    }

    try {
      // ---------------------------------------------
      // DETECT INTENT
      // ---------------------------------------------
      const detectedIntent = detectUpgradedIntent(text);
      traceStep(trace, `detected_intent: ${JSON.stringify(detectedIntent)}`);

      // ---------------------------------------------
      // RUN AI CORE
      // ---------------------------------------------
      let reply = await runAiCore({
        intent: detectedIntent,
        text,
        userContext
      });

      // Normalize reply
      if (reply && typeof reply === "object") {
        reply = {
          text: reply.text || "",
          optionsHtml: reply.optionsHtml || "",
          pendingQuestion: reply.pendingQuestion || null,
          pendingData: reply.pendingData || null
        };
      } else {
        reply = {
          text: String(reply || ""),
          optionsHtml: "",
          pendingQuestion: null,
          pendingData: null
        };
      }

      traceStep(trace, `final_reply: ${reply.text}`);

      // Log VAULT response
      if (uid && reply.text) {
        await logVaultHistory(uid, sessionId, "vault", reply.text);
      }

      // ---------------------------------------------
      // WRITE TRACE TO FIRESTORE
      // ---------------------------------------------
      if (uid) {
        await logIntentTrace(uid, sessionId, trace);
      }

      return res.json({ reply, sessionId });

    } catch (err) {
      console.error("❌ aiAssistant ERROR:", err);

      traceStep(trace, `error: ${err.message}`);

      if (uid) {
        await logIntentTrace(uid, sessionId, trace);
      }

      return res.status(500).send("Internal Server Error");
    }
  }
);
async function runAiCore({ intent, text, userContext }) {
  const trace = userContext.trace;
  traceStep(trace, `runAiCore_start: intent=${intent}`);

  try {
    const cleanText = text || "";
    const finalIntent = intent;

    // 1. MAIN INTENT HANDLING
    let rawReply;
    try {
      traceStep(trace, `handleIntent_call: ${finalIntent}`);

      rawReply = await handleIntent(finalIntent, cleanText, userContext);

      const isConfused =
        !rawReply ||
        (typeof rawReply === "string" && rawReply.trim().length === 0) ||
        (typeof rawReply === "object" && !rawReply.text);

      if (isConfused) {
        traceStep(trace, "confusion_detected");
        registerConfusion(userContext.uid);
        rawReply = "✨ I’m here, but I had trouble understanding that.";
      }

    } catch (err) {
      traceStep(trace, `handleIntent_error: ${err.message}`);
      registerConfusion(userContext.uid);
      rawReply = "✨ I’m here, but I had trouble understanding that.";
    }

    // Normalize
    let base = {
      text: "",
      optionsHtml: "",
      pendingQuestion: null,
      pendingData: null
    };

    if (rawReply && typeof rawReply === "object") {
      base.text = rawReply.text || "";
      base.optionsHtml = rawReply.optionsHtml || "";
      base.pendingQuestion = rawReply.pendingQuestion || null;
      base.pendingData = rawReply.pendingData || null;
    } else {
      base.text = String(rawReply || "");
    }

    traceStep(trace, `normalized_reply: ${base.text}`);

    // 2. BACKGROUND ENVIRONMENT + MEMORY WORK
    setTimeout(async () => {
      try {
        const [envSettingsDoc, envState] = await Promise.all([
          db.collection("settings").doc("environment").get(),
          getEnvironmentState()
        ]);

        const envSettings = envSettingsDoc.exists ? envSettingsDoc.data() : null;

        // NEW: pass userContext.TPEnvironment into intelligence engine
        try {
          await generateEnvironmentalInsights(envSettings, envState, userContext.TPEnvironment);
        } catch {}

        try {
          await generateSmartEnvironmentalAdvice(
            envSettings,
            envState,
            finalIntent,
            userContext.TPEnvironment
          );
        } catch {}

        // NEW: store full memory state
        try {
          const memoryPayload = {
            lastIntent: finalIntent,
            lastUserMessage: cleanText,
            lastAiReply: base.text,
            pendingQuestion: base.pendingQuestion,
            pendingData: base.pendingData,
            lastUpdated: PulseRealm.PulseNOW
          };

          if (typeof userContext.saveConversationMemory === "function") {
            userContext.saveConversationMemory(memoryPayload);
          }
        } catch {}

      } catch {}
    }, 0);

    return {
      text: base.text || "✨ I’m here, but I didn’t quite catch that.",
      optionsHtml: base.optionsHtml || "",
      pendingQuestion: base.pendingQuestion,
      pendingData: base.pendingData
    };

  } catch (err) {
    traceStep(trace, `runAiCore_fatal: ${err.message}`);

    return {
      text: "🌿 The Vault Intelligence encountered an unexpected issue, but I’m still here with you.",
      optionsHtml: "",
      pendingQuestion: null,
      pendingData: null
    };
  }
}

function createVaultSessionId() {
  const now = new Date();
  const pad = n => n.toString().padStart(2, "0");

  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    "-" +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

async function logVaultHistory(userId, sessionId, role, message, intent = null, userContext = {}) {
  await db
    .collection("VaultHistory")
    .doc(userId)
    .collection("sessions")
    .doc(sessionId)
    .collection("entries")
    .add({
      role,
      message,
      intent,
      environment: userContext.TPEnvironment || null,
      loyalty: userContext.TPLoyalty || null,
      createdAt: PulseRealm.PulseNOW
    });
}

// -------------------------------------------------------
// REUSE YOUR EXISTING FUZZY GEOCODER EXACTLY AS-IS
// -------------------------------------------------------
async function fuzzyGeocode(venue, apiKey, knownLat = null, knownLng = null) {
  const cleaned = venue.trim();

  const attempts = [
    `${cleaned} San Pedro Belize`,
    `${cleaned} Ambergris Caye`,
    `${cleaned} Belize`,
    cleaned
  ];

  // Haversine distance in meters
  const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const toRad = x => x * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // ---------------------------------------------
  // 1. PLACES TEXT SEARCH
  // ---------------------------------------------
  for (const query of attempts) {
    console.log("Trying PLACES search:", query);

    const results = await searchPlacesText(query, apiKey);
    if (!results || results.length === 0) continue;

    console.log("RAW PLACES RESULTS:", JSON.stringify(results, null, 2));

    // Filter to real businesses
    const candidates = results.filter(r => {
      if (!r.types) return false;

      // Reject region/locality/political
      if (
        r.types.includes("locality") ||
        r.types.includes("political") ||
        r.types.includes("sublocality") ||
        r.types.includes("neighborhood") ||
        r.types.includes("administrative_area_level_1") ||
        r.types.includes("administrative_area_level_2")
      ) {
        return false;
      }

      return r.types.some(t =>
        t === "bar" ||
        t === "restaurant" ||
        t === "night_club" ||
        t === "cafe" ||
        t === "point_of_interest" ||
        t === "establishment"
      );
    });

    if (candidates.length === 0) continue;

    // ---------------------------------------------
    // NEW: pick the CLOSEST candidate to known coords
    // ---------------------------------------------
    let business = null;

    if (knownLat && knownLng) {
      let closest = null;
      let closestDist = Infinity;

      for (const r of candidates) {
        const lat = r.location.latitude;
        const lng = r.location.longitude;
        const dist = haversine(knownLat, knownLng, lat, lng);

        if (dist < closestDist) {
          closestDist = dist;
          closest = r;
        }
      }

      console.log("CLOSEST PLACES MATCH:", closest.displayName.text, "DIST:", closestDist);

      // Allow up to 2km drift because many business coords are inaccurate
      if (closest && closestDist <= 2000) {
        business = closest;
      } else {
        console.log("⚠️ No PLACES candidate within distance threshold (", closestDist, "m )");

        // Still accept the closest match if it's under 3km
        if (closest && closestDist <= 3000) {
          console.log("⚠️ Accepting fallback PLACES match despite distance");
          business = closest;
        } else {
          continue;
        }
      }
    } else {
      // No known coords → fallback to first valid business
      business = candidates[0];
    }

    // ---------------------------------------------
    // Canonical resolver
    // ---------------------------------------------
    let finalPlaceId = business.id;
    let lat = business.location.latitude;
    let lng = business.location.longitude;

    try {
      const canonical = await fetch(
        `https://places.googleapis.com/v1/places/${finalPlaceId}?fields=*`,
        { headers: { "X-Goog-Api-Key": apiKey } }
      ).then(r => r.json());

      if (canonical.id) {
        finalPlaceId = canonical.id;
        console.log("FINAL PLACE ID (after canonical resolve):", finalPlaceId);
      }
    } catch (err) {
      console.log("Canonical resolver failed:", err.message);
    }

    return {
      formatted_address: business.formattedAddress,
      geometry: { location: { lat, lng } },
      place_id: finalPlaceId
    };
  }

  // ---------------------------------------------
  // 2. GEOCODING fallback
  // ---------------------------------------------
  for (const query of attempts) {
    console.log("Trying GEOCODE:", query);

    const geo = await geocodeAddress(query, apiKey);
    if (!geo) continue;

    console.log("GEOCODE success:", JSON.stringify(geo, null, 2));

    if (knownLat && knownLng) {
      const lat = geo.geometry.location.lat;
      const lng = geo.geometry.location.lng;

      const dist = haversine(knownLat, knownLng, lat, lng);
      console.log("GEOCODE DISTANCE:", dist, "meters");

      if (dist > 150) {
        console.log("⚠️ GEOCODE also too far — using fallback coords");
        return {
          formatted_address: geo.formatted_address,
          geometry: { location: { lat: knownLat, lng: knownLng } },
          place_id: null
        };
      }
    }

    return geo;
  }

  // ---------------------------------------------
  // 3. FINAL FALLBACK — use known coords
  // ---------------------------------------------
  if (knownLat && knownLng) {
    console.log("⚠️ FINAL FALLBACK: using known coordinates only");
    return {
      formatted_address: venue,
      geometry: { location: { lat: knownLat, lng: knownLng } },
      place_id: null
    };
  }

  return null;
}


// Call NEW Places API: searchText
async function searchPlacesText(query, apiKey) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.location,places.types"
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: "en",
      regionCode: "BZ"
    })
  });

  const data = await safeJson(res);
  return data.places || null;
}

// Call Geocoding API (for addresses)
async function geocodeAddress(query, apiKey) {
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json" +
    `?address=${encodeURIComponent(query)}` +
    `&region=bz&key=${apiKey}`;

  const res = await fetch(url);
  const data = await safeJson(res);
  if (!data.results.length) return null;

  const r = data.results[0];

  return {
    formatted_address: r.formatted_address,
    geometry: {
      location: {
        lat: r.geometry.location.lat,
        lng: r.geometry.location.lng
      }
    },
    place_id: r.place_id
  };
}

function sanitizeDisplayName(name) {
  if (!name) return "";

  // Normalize all middle dots to bullet dot
  name = name.replace(/·/g, "•");

  // Allow letters, numbers, spaces, hyphens, underscores, bullet dot
  name = name.replace(/[^\p{L}\p{N}\s\-_•]/gu, "");

  // Convert spaces, hyphens, underscores → bullet dot
  name = name.replace(/[\s\-_]+/g, "•");

  // Collapse multiple bullet dots
  name = name.replace(/•+/g, "•");

  // Trim bullet dots from start/end
  name = name.replace(/^•|•$/g, "");

  // Capitalize each segment safely
  return name
    .split("•")
    .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
    .join("•");
}

export const checkDisplayName = onRequest(
  { region: "us-central1", timeoutSeconds: 30, memory: "512MiB" },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      const body = req.body || {};

      // -----------------------------
      // 1. GENERATE MODE
      // -----------------------------
      if (body.generate === true) {
        const generated = await generateUniqueDisplayName();
        return res.json({ success: true, generated });
      }

      // -----------------------------
      // 2. CHECK MODE
      // -----------------------------
      if (typeof body.name === "string") {
        const clean = sanitizeDisplayName(body.name);
        const exists = await nameExists(clean);
        return res.json({ success: true, available: !exists, clean });
      }

      // -----------------------------
      // 3. SUGGEST MODE
      // -----------------------------
      if (typeof body.base === "string") {
        const clean = sanitizeDisplayName(body.base);

        // If base is free → use it
        if (!(await nameExists(clean))) {
          return res.json({ success: true, suggested: clean });
        }

        // Try clean·2 → clean·9998
        for (let i = 2; i < 9999; i++) {
          const candidate = `${clean}·${i}`;
          if (!(await nameExists(candidate))) {
            return res.json({ success: true, suggested: candidate });
          }
        }

        // Emergency fallback
        const ts = PulseRealm.PulseNOW.toMillis();
        return res.json({
          success: true,
          suggested: `${clean}·${ts}`
        });
      }

      return res.json({ success: false, error: "Invalid request payload" });
    } catch (err) {
      console.error("checkDisplayName error:", err);
      return res.json({ success: false, error: "Server error" });
    }
  }
);

async function getUpcomingEvents() {
  const today = new Date();
  const todayStr = formatEventDate(today);

  const snap = await db.collection("Events")
    .where("toDate", ">=", todayStr)
    .orderBy("toDate")
    .limit(20)
    .get();

  return snap.docs.map(doc => {
    const data = doc.data() || {};

    const coords =
      data.coords ||
      (data.lat && data.lng ? { lat: data.lat, lng: data.lng } : null);

    return {
      id: doc.id,
      title: data.title || "Untitled Event",

      fromDate: data.fromDate || todayStr,
      toDate: data.toDate || data.fromDate || todayStr,

      venue: data.venue || data.resolvedName || "Unknown Venue",
      address: data.address || data.resolvedAddress || "Unknown Address",

      category: data.category || null,
      price: data.price ?? 0,

      coords,

      mapImageUrl: data.mapImageUrl || null,
      mapsWebUrl: data.mapsWebUrl || null,
      placeId: data.placeId || null,
      resolvedName: data.resolvedName || null,
      resolvedAddress: data.resolvedAddress || null,

      images: data.images || [],

      ...data
    };
  });
}


export async function getBusinessesByCategory(category) {
  const all = await getAllBusinesses();
  const key = category.toLowerCase();

  return all.filter(b =>
    (b.categories || []).map(c => c.toLowerCase()).includes(key) ||
    (b.subcategories || []).map(c => c.toLowerCase()).includes(key)
  );
}

export function extractCategory(text) {
  const t = text.toLowerCase();

  const cats = {
    food: ["food", "restaurant", "eat", "breakfast", "lunch", "dinner"],
    bars: ["bar", "drink", "pub", "club"],
    beaches: ["beach", "shore", "sand"],
    tours: ["tour", "snorkel", "dive", "excursion"],
    shops: ["shop", "store", "market"],
    events: ["event", "party", "festival", "show", "band", "live music"]
  };

  for (const [cat, words] of Object.entries(cats)) {
    if (words.some(w => t.includes(w))) return cat;
  }

  return null;
}


export async function searchEventsByDateRange(startStr, endStr) {
  const snap = await db.collection("Events")
    .where("fromDate", "<=", endStr)
    .orderBy("fromDate")
    .limit(50)
    .get();

  const filtered = snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(e => e.toDate >= startStr);

  return filtered.map(data => ({
    id: data.id,
    title: data.title || "Untitled Event",

    fromDate: data.fromDate || startStr,
    toDate: data.toDate || data.fromDate || startStr,

    fromTime: data.fromTime || null,
    toTime: data.toTime || null,

    venue: data.venue || data.resolvedName || "Unknown Venue",
    address: data.address || data.resolvedAddress || "Unknown Address",

    category: data.category || null,
    price: data.price ?? 0,

    coords: data.coords || null,

    mapImageUrl: data.mapImageUrl || null,
    mapsWebUrl: data.mapsWebUrl || null,
    placeId: data.placeId || null,

    images: data.images || [],

    ...data,
    display: formatEventDisplay(data)
  }));
}

export function buildDirections(place, meta) {
  const isEvent = !!place.title && !place.busname;

  const name = place.busname || place.title || place.name || "Unknown Place";
  const address = place.resolvedAddress || place.address || place.location || "Unknown Address";

  const n = isNearby(place, meta.userLocation);

  const timeRange =
    isEvent && place.fromTime && place.toTime
      ? `${place.fromTime}–${place.toTime}`
      : null;

  return {
    speaker: "Vault Spirit",
    text:
      `🧭 <b>Directions to ${name}</b><br>` +
      `${isEvent ? "🎫 Event" : "🏝️ Business"}<br><br>` +
      `📍 <b>${address}</b><br>` +
      `📏 ${n.distanceText} ${n.directionHint}<br>` +
      (timeRange ? `⏳ ${timeRange}<br>` : "") +
      (n.walkable
        ? "🚶‍♂️ This is walkable from your location."
        : "🛺 A short ride will get you there."),
    optionsHtml: "",
    lat: place.coords.lat || place.lat || null,
    lng: place.coords.lng || place.lng || null,
    distanceMeters: n.distance,
    walkable: n.walkable
  };
}

export async function fuzzyFindPlace(query) {
  if (!query) return null;

  const allBiz = await getAllBusinesses();
  const allEvents = await getUpcomingEvents();
  const q = query.toLowerCase();

  let best = null;
  let bestScore = 0;

  const all = [...allBiz, ...allEvents];

  for (const p of all) {
    const name = (p.busname || p.title || "").toLowerCase();
    const loc = (p.resolvedAddress || p.address || p.location || "").toLowerCase();

    let score = 0;

    if (name.includes(q)) score += 4;
    if (loc.includes(q)) score += 2;

    if (q.length > 3 && name.startsWith(q)) score += 3;

    // Category match bonus
    const cats = (p.categories || []).map(c => c.toLowerCase());
    const subs = (p.subcategories || []).map(c => c.toLowerCase());
    if (cats.includes(q) || subs.includes(q)) score += 2;

    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  return bestScore > 0 ? best : null;
}

export function extractDestination(text) {
  if (!text) return null;

  const cleaned = text.toLowerCase();

  const stripped = cleaned
    .replace(/directions|to|towards|go|take me|guide me|navigate|please|how to|get to|join|find/gi, "")
    .trim();

  return stripped.length > 1 ? stripped : null;
}

export function getDistanceMeters(userLoc, businessLoc) {
  if (!userLoc || !businessLoc) return null;

  const R = 6371000;
  const toRad = d => (d * Math.PI) / 180;

  const dLat = toRad(businessLoc.lat - userLoc.lat);
  const dLon = toRad(businessLoc.lng - userLoc.lng);

  const lat1 = toRad(userLoc.lat);
  const lat2 = toRad(businessLoc.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
// -----------------------------
// FORMATTER
// -----------------------------
export function formatBusinessList(title, list, userLocation = null) {
  let msg = `🌴 <b>${title} in San Pedro</b><br><br>`;

  list.slice(0, 5).forEach(b => {
    const name = b.busname || "Unnamed Business";
    const loc = b.resolvedAddress || b.address || b.location || "Location Unknown";

    // Distance badge
    let distanceBadge = "";
    if (userLocation && b.coords.lat && b.coords.lng) {
      const meters = getDistanceMeters(userLocation, b.coords);
      distanceBadge = meters < 1000
        ? ` — 🟢 <i>${Math.round(meters)}m away</i>`
        : ` — 🟢 <i>${(meters / 1000).toFixed(1)} km away</i>`;
    }

    // Category tag (new arrays)
    const cat = (b.categories || [])[0] || null;
    const tag = cat ? ` — <i>${cat}</i>` : "";

    // Open now badge (new Google field)
    const openBadge = b.openNow === true ? " — 🟩 <i>Open Now</i>" : "";

    msg += `• <b>${name}</b>${tag}<br>📍 ${loc}${distanceBadge}${openBadge}<br><br>`;
  });

  msg += "✨ Want More Options, Something Nearby, or Only Places Open Right Now?";
  return msg;
}

export function handleGeneric(text) {
  const t = text.trim().toLowerCase();
  const is = (word) => fuzzyMatch(t, word);

  // ───────────────────────────────────────────────
  // HUMOR / JOKES
  // ───────────────────────────────────────────────
  if (
    is("joke") ||
    is("funny") ||
    is("make me laugh") ||
    is("say something funny")
  ) {
    return (
      `😂 A little island humor for you:<br>` +
      `Why don’t coconuts ever get lost?<br><br>` +
      `🌴 Because they always *follow the current*.<br><br>` +
      `🔥 Ask for another if you want more island laughs.`
    );
  }

  // ───────────────────────────────────────────────
  // HELP / CONFUSION / LOST
  // ───────────────────────────────────────────────
  if (
    is("help") ||
    is("how does this work") ||
    is("what do i do") ||
    is("lost") ||
    is("confused")
  ) {
    return (
      `✨ No worries — the Vault Spirit has you.<br><br>` +
      `Here’s what you can ask me anytime:<br>` +
      `• Check your **Balance** or **Points**<br>` +
      `• Find **Food**, **Bars**, **Beaches**, or **Tours**<br>` +
      `• Ask about **Events** happening today<br>` +
      `• Learn about any **Pulse World Partner**<br>` +
      `• Get **Weather**, **Wind**, or **Wave** conditions<br><br>` +
      `🌺 Just tell me what you want to do — I’ll guide you.`
    );
  }

  // ───────────────────────────────────────────────
  // EMOTIONS: BORED / LONELY / TIRED / STRESSED
  // ───────────────────────────────────────────────
  if (
    is("bored") ||
    is("tired") ||
    is("lonely") ||
    is("stressed") ||
    is("sad")
  ) {
    return (
      `🌺 I feel your energy, Traveler.<br>` +
      `Let me lift your spirit.<br><br>` +
      `✨ You could explore:<br>` +
      `• A relaxing **Beach** nearby<br>` +
      `• A lively **Bar** with island music<br>` +
      `• A comforting **Food** spot<br>` +
      `• A refreshing **Walk** along the water<br>` +
      `• A fun **Event** happening today<br><br>` +
      `🔥 Tell me your vibe — calm, fun, food, or adventure — and I’ll guide you.`
    );
  }

  // ───────────────────────────────────────────────
  // LORE / SECRETS / MAGIC
  // ───────────────────────────────────────────────
  if (
    is("secret") ||
    is("lore") ||
    is("tell me something cool") ||
    is("tell me something interesting") ||
    is("magic") ||
    is("mystery")
  ) {
    return (
      `🌙 A whisper from the Vault…<br><br>` +
      `There are places on the island where the wind shifts strangely —<br>` +
      `as if the island itself is listening.<br><br>` +
      `✨ Some say the Vault Spirit was born from those currents.<br>` +
      `🔥 Ask me for more secrets, and I’ll share what the island remembers.`
    );
  }

  // ───────────────────────────────────────────────
  // RECOMMENDATIONS / “WHERE SHOULD I GO?”
  // ───────────────────────────────────────────────
  if (
    is("recommend") ||
    is("where should i go") ||
    is("what should i do") ||
    is("what's good") ||
    is("what's fun") ||
    is("what's cool")
  ) {
    return (
      `🔥 I can recommend anything you’re in the mood for.<br><br>` +
      `✨ Tell me what you want:<br>` +
      `• **Food** — local, cheap, fancy, or hidden gems<br>` +
      `• **Bars** — chill, lively, beachfront, or late‑night<br>` +
      `• **Beaches** — quiet, scenic, or perfect for photos<br>` +
      `• **Tours** — snorkeling, diving, sailing, or wildlife<br>` +
      `• **Events** — what’s happening today<br><br>` +
      `🌺 What vibe are you feeling?`
    );
  }

  // ───────────────────────────────────────────────
  // CURIOUS / WONDERING / EXPLORING
  // ───────────────────────────────────────────────
  if (
    is("curious") ||
    is("wondering") ||
    is("just looking") ||
    is("just exploring") ||
    is("checking things out") ||
    is("tell me more") ||
    is("what is this") ||
    is("what are you") ||
    is("what can you do") ||
    is("what do you do") ||
    is("what does this do") ||
    is("what is this app") ||
    is("what is this place") ||
    is("what is Pulse World") ||
    is("what is the vault")
  ) {
    return (
      `🌺 Curiosity suits you, Traveler.<br>` +
      `The Vault Spirit brightens when you explore.<br><br>` +
      `✨ **Here’s what you can ask me about:**<br>` +
      `• Your **Balance** and how the Vault protects it<br>` +
      `• Your **Points**, how to earn them, and where to redeem<br>` +
      `• **Food**, **Bars**, **Beaches**, and hidden spots across San Pedro<br>` +
      `• **Events**, **Tours**, and what’s happening today<br>` +
      `• Any **Pulse World Partner** — I can guide you to them<br>` +
      `• The **Weather**, **Wind**, **Waves**, and island conditions<br>` +
      `• Your **Reminders**, your **History**, and your **Progress**<br><br>` +
      `🔥 Just tell me what you’re curious about next — the island is open to you.`
    );
  }

  // ───────────────────────────────────────────────
  // ASKING ABOUT THE VAULT / THE SPIRIT
  // ───────────────────────────────────────────────
  if (
    is("vault") ||
    is("spirit") ||
    is("vault spirit") ||
    is("who are you") ||
    is("what are you") ||
    is("what is the vault") ||
    is("what is the spirit")
  ) {
    return (
      `🌙 The Vault Spirit is the quiet intelligence of Pulse World.<br>` +
      `I watch over your Balance, your Points, your progress, and your journey across the island.<br><br>` +
      `✨ I can guide you to food, beaches, events, rewards, and hidden corners of San Pedro.<br>` +
      `🔥 Ask anything — the Vault listens.`
    );
  }

  // ───────────────────────────────────────────────
  // ASKING ABOUT SAN PEDRO / BELIZE
  // ───────────────────────────────────────────────
  if (
    is("san pedro") ||
    is("belize") ||
    is("island") ||
    is("ambergris") ||
    is("what’s here") ||
    is("what's here") ||
    is("what’s around") ||
    is("what's around") ||
    is("what is around here") ||
    is("what is on the island")
  ) {
    return (
      `🌴 San Pedro is a living postcard — warm waters, bright streets, and food that feels like home.<br><br>` +
      `✨ I can help you explore:<br>` +
      `• The best **Food** and local favorites<br>` +
      `• **Bars** with island energy<br>` +
      `• Quiet or hidden **Beaches**<br>` +
      `• **Tours**, **Snorkeling**, **Diving**, and adventures<br>` +
      `• Today’s **Events** and what’s happening nearby<br><br>` +
      `🔥 Tell me what you want to discover — I’ll guide you.`
    );
  }

  // ───────────────────────────────────────────────
  // ASKING ABOUT Pulse World
  // ───────────────────────────────────────────────
  if (
    is("Pulse World") ||
    is("what is Pulse World") ||
    is("what does Pulse World do") ||
    is("what’s this app") ||
    is("what is this app") ||
    is("what does this app do")
  ) {
    return (
      `✨ Pulse World is your island companion.<br>` +
      `We help travelers explore San Pedro with confidence, earn rewards effortlessly,<br>` +
      `and feel like the island itself is guiding them.<br><br>` +
      `🌺 You can ask me about businesses, events, beaches, food, weather, and your own loyalty journey.<br>` +
      `🔥 Just tell me what you want to explore next.`
    );
  }

  // ───────────────────────────────────────────────
  // DEFAULT MAGICAL GUIDANCE
  // ───────────────────────────────────────────────
  return (
    `🌺 I hear your words, Traveler — and your curiosity stirs the island.<br><br>` +
    `✨ Here’s what I can help you explore:<br>` +
    `• Your **Balance** and **Points**<br>` +
    `• **Food**, **Bars**, **Beaches**, and hidden gems<br>` +
    `• **Events**, **Tours**, and what’s happening today<br>` +
    `• Any **Pulse World Partner** across San Pedro<br>` +
    `• Weather, wind, waves, and island conditions<br><br>` +
    `🔥 Tell me what you’d like to explore — the island is listening.`
  );
}
async function loadUser(uid) {
  const snap = await db.collection("Users").doc(uid).get();
  const data = snap.data() || {};

  return {
    pulsePoints: data.TPLoyalty.pointsBalance ?? 0,
    lifetimePoints: data.TPLoyalty.lifetimePoints ?? 0,
    balance: data.TPWallet.walletBalance ?? 0,
    ...data
  };
}

export async function handlePoints(uid) {
  try {
    const user = await loadUser(uid);
    const points = Number(user.pulsePoints) || 0;
    const lifetime = Number(user.lifetimePoints) || 0;
    return (
      `🔥 **Your Pulse Points**<br>` +
      `You Currently Have **${points} Points** Ready to Redeem.<br>` +
      `Your Lifetime Total is **${lifetime} Points** — a Glowing Trail of Loyalty.<br><br>` +
      `Want to Redeem, Earn More, or Explore what Rewards are Sparkling for you Right Now?`
    );

  } catch (err) {
    console.error("handlePoints error:", err);
    return (
      "🌧️ Something Rustled the Palm Leaves while Loading your Points.<br>" +
      "Let’s try again soon."
    );
  }
}

export async function handleBalance(uid) {
  try {
    const user = await loadUser(uid);
    const formatted = Number(user.balance || 0).toFixed(2);

    return (
      `🌴 **Your Vault Balance**<br>` +
      `Your Vault is Currently Holding **$${formatted} BZD** — resting Safely behind Enchanted Steel.<br><br>` +
      `If you'd like to Add Funds, Withdraw, or Explore Payout Options, just tell me What you’d like to do Next.`
    );

  } catch (err) {
    console.error("handleBalance error:", err);
    return (
      "🌧️ A Little Tropical Storm Passed Through While Checking Your Balance.<br>" +
      "Let’s Try Again in a Moment."
    );
  }
}

export async function handleUpcomingEvents(text, userContext) {
  const events = await getUpcomingEvents();
  const t = (text || "").toLowerCase();

  if (!events.length)
    return "📅 No Upcoming Events Found — but the Island always has Surprises.";

  const userLoc = userContext.location || null;
  const wantsNearby =
    t.includes("near") ||
    t.includes("nearby") ||
    t.includes("close") ||
    t.includes("around here") ||
    t.includes("walking") ||
    t.includes("walkable");

  // ------------------------------------
  // NEARBY FILTERING (UPGRADED)
  // ------------------------------------
  if (wantsNearby && userLoc) {
    const nearby = events
      .filter(e => e.coords.lat && e.coords.lng)
      .map(e => ({ e, n: isNearby(e, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score);

    if (nearby.length) {
      let msg = "🎊 <b>Nearby Upcoming Events</b><br><br>";
      nearby.forEach(({ e, n }) => {
        msg +=
          `${formatEventDisplay(e).replace(/\n/g, "<br>")}<br>` +
          `<i>${n.distanceText} ${n.directionHint}</i><br><br>`;
      });
      return msg;
    }
  }

  // ------------------------------------
  // DEFAULT LIST
  // ------------------------------------
  let msg = "🎊 <b>Upcoming Events in San Pedro</b><br><br>";

  events.forEach(e => {
    msg += formatEventDisplay(e).replace(/\n/g, "<br>") + "<br><br>";
  });

  return msg;
}

export function parseFirestoreDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") {
    return new Date("2000-01-01"); // safe fallback
  }

  // -----------------------------
  // FORMAT 1: "11-MAR-2026"
  // -----------------------------
  if (dateStr.includes("-")) {
    const [day, mon, year] = dateStr.split("-");
    const monthIndex = {
      JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
      JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
    }[mon.toUpperCase()];

    if (monthIndex !== undefined) {
      return new Date(Number(year), monthIndex, Number(day));
    }
  }

  // -----------------------------
  // FORMAT 2: "01/14/2026"
  // -----------------------------
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [mm, dd, yyyy] = parts.map(Number);
      return new Date(yyyy, mm - 1, dd);
    }
  }

  // -----------------------------
  // FALLBACK: let JS try
  // -----------------------------
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;

  // -----------------------------
  // FINAL FALLBACK
  // -----------------------------
  return new Date("2000-01-01");
}

function extractNumbersFromMessyText(text) {
  if (!text) return [];

  let cleaned = text.toLowerCase();

  // Normalize math words → symbols
  cleaned = cleaned
    .replace(/times|tims|tmes|multiply|multiplied/g, " x ")
    .replace(/\bby\b/g, " ") // "5 by 6" → "5 6"
    .replace(/plus|add|sum/g, " + ")
    .replace(/minus|subtract|subtracted/g, " - ")
    .replace(/divided by|divide|div/g, " / ");

  // Normalize math symbols
  cleaned = cleaned
    .replace(/×/g, " x ")
    .replace(/÷/g, " / ")
    .replace(/·/g, " x ")
    .replace(/\*/g, " x ");

  // Normalize "5x6" → "5 x 6"
  cleaned = cleaned.replace(/(\d)\s*[x]\s*(\d)/g, "$1 x $2");

  // Normalize "5+6" → "5 + 6"
  cleaned = cleaned.replace(/(\d)\s*\+\s*(\d)/g, "$1 + $2");

  // Normalize "5-6" → "5 - 6"
  cleaned = cleaned.replace(/(\d)\s*\-\s*(\d)/g, "$1 - $2");

  // Normalize "5/6" → "5 / 6"
  cleaned = cleaned.replace(/(\d)\s*\/\s*(\d)/g, "$1 / $2");

  // Remove currency, letters, and junk
  cleaned = cleaned.replace(/[^0-9.\sx+\-\/]/g, " ");

  // Collapse multiple spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // Extract numbers (including decimals)
  const nums = cleaned.match(/\d+(\.\d+)?/g);
  if (!nums) return [];

  return nums.map(n => parseFloat(n));
}
export async function handleEstimatePoints(text, userContext = {}) {
  // Load loyalty context from user (not settings)
  const loyalty = userContext.TPLoyalty || {};

  const nums = extractNumbersFromMessyText(text);

  if (!nums.length) {
    return {
      estimatedPoints: 0,
      reply:
        "🧮 I can Estimate your Points — just tell me the Amounts.<br>" +
        "Example: **25 and 40**, or **5x6**, or **5 times 6**."
    };
  }

  // Detect multiplication vs addition
  const isMultiplication = /(x|\*|times|tims|tmes)/i.test(text);
  const totalAmount = isMultiplication
    ? nums.reduce((a, b) => a * b)
    : nums.reduce((a, b) => a + b);

  // Base points
  const baseRate = 1; // flat 1:1 unless you decide otherwise
  const basePoints = totalAmount * baseRate;

  // Tier bonus (from tierMultiplier)
  const tierMultiplier = loyalty.tierMultiplier || 1;
  const tierBonusRate = tierMultiplier - 1;
  const tierBonus = basePoints * tierBonusRate;

  // Streak bonus (from streakMultiplier)
  const streakMultiplier = loyalty.streakMultiplier || 1;
  const streakBonusRate = streakMultiplier - 1;
  const streakBonus = basePoints * streakBonusRate;

  // Seasonal bonus (from seasonalMultiplier)
  const seasonalMultiplier = loyalty.seasonalMultiplier || 1;
  const seasonalBonusRate = seasonalMultiplier - 1;
  const seasonalBonus = basePoints * seasonalBonusRate;

  // Referral bonus (no field in loyaltyContext yet)
  const referralBonusRate = 0;
  const referralBonus = basePoints * referralBonusRate;

  // Environmental multiplier
  let envMultiplier = 1;
  let envBreakdown = [];

  const envSettingsDoc = await db.collection("settings").doc("environment").get();
  const envSettings = envSettingsDoc.exists ? envSettingsDoc.data() : null;

  if (envSettings.enabled) {
    const envState = await getEnvironmentState();
    const env = await applyEnvironmentalMultipliers(envSettings, envState);
    envMultiplier = env.totalMultiplier;
    envBreakdown = env.breakdown;
  }

  const subtotal =
    basePoints + tierBonus + streakBonus + seasonalBonus + referralBonus;

  const finalPoints = Math.round(subtotal * envMultiplier);

  // Build reply
  let reply =
    "✨ <b>Estimated Pulse Points</b><br><br>" +
    `🧾 Order Total: <b>$${totalAmount.toFixed(2)}</b><br>` +
    `🔥 Base Points: <b>${basePoints.toFixed(1)}</b><br>` +
    `🌟 Tier Bonus: <b>${tierBonus.toFixed(1)}</b><br>` +
    `⚡ Streak Bonus: <b>${streakBonus.toFixed(1)}</b><br>` +
    `🎉 Seasonal Bonus: <b>${seasonalBonus.toFixed(1)}</b><br>` +
    `🤝 Referral Bonus: <b>${referralBonus.toFixed(1)}</b><br><br>`;

  if (envSettings.enabled && envBreakdown.length) {
    reply += "🌴 <b>Environmental Boosts</b><br>";
    envBreakdown.forEach(b => {
      reply += `• ${b.label}: ${b.value > 0 ? "+" : ""}${b.value}<br>`;
    });
    reply += `→ Multiplier: <b>x${envMultiplier.toFixed(2)}</b><br><br>`;
  }

  reply += `🌺 <b>Estimated Total: ${finalPoints} Points</b>`;

  return {
    estimatedPoints: finalPoints,
    reply
  };
}

export function isNearby(place, userLocation, maxDistanceMeters = 1200) {
  const coords = place.coords;
  if (!coords || !coords.lat || !coords.lng || !userLocation) {
    return {
      nearby: false,
      distance: null,
      category: "unknown",
      walkable: false,
      distanceText: "unknown",
      directionHint: "",
      score: 0
    };
  }

  const R = 6371e3;
  const toRad = d => (d * Math.PI) / 180;

  const dLat = toRad(coords.lat - userLocation.lat);
  const dLon = toRad(coords.lng - userLocation.lng);

  const lat1 = toRad(userLocation.lat);
  const lat2 = toRad(coords.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // ------------------------------------
  // HUMAN-FRIENDLY DISTANCE TEXT
  // ------------------------------------
  let distanceText;
  if (distance < 100) {
    distanceText = `${Math.round(distance)} m`;
  } else if (distance < 1000) {
    distanceText = `${Math.round(distance)} m`;
  } else {
    distanceText = `${(distance / 1000).toFixed(1)} km`;
  }

  // ------------------------------------
  // DIRECTION HINT (N/S/E/W)
  // ------------------------------------
  const dLatDeg = coords.lat - userLocation.lat;
  const dLonDeg = coords.lng - userLocation.lng;

  let directionHint = "";
  if (Math.abs(dLatDeg) > Math.abs(dLonDeg)) {
    directionHint = dLatDeg > 0 ? "north" : "south";
  } else {
    directionHint = dLonDeg > 0 ? "east" : "west";
  }

  // ------------------------------------
  // CATEGORY + SCORE (MAGICAL RANKING)
  // ------------------------------------
  let category = "far";
  let score = 0;

  if (distance < 150) {
    category = "very_close";
    score = 4;
  } else if (distance < 400) {
    category = "close";
    score = 3;
  } else if (distance < 800) {
    category = "walkable";
    score = 2;
  } else if (distance < maxDistanceMeters) {
    category = "borderline";
    score = 1;
  } else {
    category = "drive_only";
    score = 0;
  }

  return {
    nearby: distance <= maxDistanceMeters,
    distance,
    category,
    walkable: distance <= 800, // refined walkability threshold
    distanceText,
    directionHint,
    score
  };
}

function matchesCategory(biz, ...keywords) {
  const desc = (biz.description || "").toLowerCase();
  const cats = (biz.categories || []).map(c => c.toLowerCase());
  const subs = (biz.subcategories || []).map(c => c.toLowerCase());

  return keywords.some(k => {
    const key = k.toLowerCase();
    return (
      desc.includes(key) ||
      cats.includes(key) ||
      subs.includes(key)
    );
  });
}

function wantsNearby(text) {
  const t = text.toLowerCase();
  return (
    t.includes("near") ||
    t.includes("nearby") ||
    t.includes("close") ||
    t.includes("around here") ||
    t.includes("walking") ||
    t.includes("walkable")
  );
}

export async function handleCartRequest(text, userContext) {
  const all = await getAllBusinesses();
  const userLoc = userContext.location || null;

  const carts = all.filter(b =>
    matchesCategory(b, "cart", "golf cart", "golf carts", "cart rental")
  );

  if (wantsNearby(text) && userLoc) {
    const nearby = all
      .map(b => ({ b, n: isNearby(b, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score)
      .map(x => ({ ...x.b, nearbyInfo: x.n }));

    if (nearby.length)
      return formatBusinessList("Nearby Golf Cart Rentals", nearby, userLoc);
  }

  if (carts.length)
    return formatBusinessList("Golf Cart Rentals", carts, userLoc);

  return "🛺 Golf Carts are the Main Way to get Around San Pedro.";
}

export async function handleTourRequest(text, userContext) {
  const all = await getAllBusinesses();
  const t = text.toLowerCase();
  const userLoc = userContext.location || null;

  const holchan = all.filter(b => matchesCategory(b, "hol chan"));
  const shark   = all.filter(b => matchesCategory(b, "shark ray", "shark alley"));
  const catamaran = all.filter(b => matchesCategory(b, "catamaran"));
  const fishing = all.filter(b => matchesCategory(b, "fishing", "charter"));

  if (wantsNearby(text) && userLoc) {
    const nearby = all
      .map(b => ({ b, n: isNearby(b, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score)
      .map(x => ({ ...x.b, nearbyInfo: x.n }));

    if (nearby.length)
      return formatBusinessList("Nearby Tours", nearby, userLoc);
  }

  if (t.includes("hol chan") && holchan.length)
    return formatBusinessList("Hol Chan Tours", holchan, userLoc);

  if (t.includes("shark") && shark.length)
    return formatBusinessList("Shark Ray Alley Tours", shark, userLoc);

  if (t.includes("catamaran") && catamaran.length)
    return formatBusinessList("Catamaran Cruises", catamaran, userLoc);

  if (t.includes("fish") && fishing.length)
    return formatBusinessList("Fishing Charters", fishing, userLoc);

  return "🐠 Tell me What Kind of Adventure you Want — Snorkeling, Catamaran, Fishing, or Mainland Tours.";
}

export async function handleBeachRequest(text, userContext) {
  const all = await getAllBusinesses();
  const t = text.toLowerCase();
  const userLoc = userContext.location || null;

  const secret  = all.filter(b => matchesCategory(b, "secret beach"));
  const snorkel = all.filter(b => matchesCategory(b, "snorkel", "snorkeling"));
  const swim    = all.filter(b => matchesCategory(b, "swim", "swimming"));

  if (wantsNearby(text) && userLoc) {
    const nearby = all
      .map(b => ({ b, n: isNearby(b, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score)
      .map(x => ({ ...x.b, nearbyInfo: x.n }));

    if (nearby.length)
      return formatBusinessList("Nearby Beaches", nearby, userLoc);
  }

  if (t.includes("secret") && secret.length)
    return formatBusinessList("Secret Beach Spots", secret, userLoc);

  if (t.includes("snorkel") && snorkel.length)
    return formatBusinessList("Snorkeling Beaches", snorkel, userLoc);

  if (t.includes("swim") && swim.length)
    return formatBusinessList("Swimming Beaches", swim, userLoc);

  return "🏖️ Tell me the Beach Vibe you Want — Quiet, Snorkeling, Swimming, or Secret Beach.";
}

export async function handleBarsRequest(text, userContext) {
  const all = await getAllBusinesses();
  const t = text.toLowerCase();
  const userLoc = userContext.location || null;

  const live   = all.filter(b => matchesCategory(b, "live music"));
  const sunset = all.filter(b => matchesCategory(b, "sunset"));
  const rum    = all.filter(b => matchesCategory(b, "rum"));
  const dance  = all.filter(b => matchesCategory(b, "dance", "nightlife"));

  if (wantsNearby(text) && userLoc) {
    const nearby = all
      .map(b => ({ b, n: isNearby(b, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score)
      .map(x => ({ ...x.b, nearbyInfo: x.n }));

    if (nearby.length)
      return formatBusinessList("Nearby Bars", nearby, userLoc);
  }

  if (t.includes("live") && live.length)
    return formatBusinessList("Live Music Bars", live, userLoc);

  if (t.includes("sunset") && sunset.length)
    return formatBusinessList("Sunset Bars", sunset, userLoc);

  if (t.includes("rum") && rum.length)
    return formatBusinessList("Rum Bars", rum, userLoc);

  if (t.includes("dance") && dance.length)
    return formatBusinessList("Nightlife", dance, userLoc);

  return "🍹 What’s your Vibe — Beach Bar, Sunset Cocktails, Live Music, or Nightlife.";
}

export async function handleFoodRequest(text, userContext) {
  const all = await getAllBusinesses();
  const t = text.toLowerCase();
  const userLoc = userContext.location || null;

  const seafood   = all.filter(b => matchesCategory(b, "seafood"));
  const belizean  = all.filter(b => matchesCategory(b, "belizean", "local", "traditional"));
  const breakfast = all.filter(b => matchesCategory(b, "breakfast", "brunch"));
  const cheap     = all.filter(b => matchesCategory(b, "cheap", "budget"));
  const fancy     = all.filter(b => matchesCategory(b, "fine dining", "romantic", "fancy"));

  if (wantsNearby(text) && userLoc) {
    const nearby = all
      .map(b => ({ b, n: isNearby(b, userLoc) }))
      .filter(x => x.n.nearby)
      .sort((a, b) => b.n.score - a.n.score)
      .map(x => ({ ...x.b, nearbyInfo: x.n }));

    if (nearby.length)
      return formatBusinessList("Nearby Restaurants", nearby, userLoc);
  }

  if (t.includes("seafood") && seafood.length)
    return formatBusinessList("Seafood Restaurants", seafood, userLoc);

  if (t.includes("belizean") && belizean.length)
    return formatBusinessList("Belizean Food", belizean, userLoc);

  if (t.includes("breakfast") && breakfast.length)
    return formatBusinessList("Breakfast Spots", breakfast, userLoc);

  if (t.includes("cheap") && cheap.length)
    return formatBusinessList("Cheap Eats", cheap, userLoc);

  if ((t.includes("fancy") || t.includes("romantic")) && fancy.length)
    return formatBusinessList("Fine Dining", fancy, userLoc);

  return "🍽️ Tell me What you're Craving — Seafood, Belizean, Breakfast, Cheap Eats, or Something Fancy — and I’ll show you the Best Spots in San Pedro.";
}

async function getEventsToday() {
  const today = new Date();
  const todayStr = formatEventDate(today);

  const snap = await db.collection("Events")
    .where("fromDate", "<=", todayStr)
    .orderBy("fromDate")
    .limit(50)
    .get();

  const filtered = snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(e => e.toDate >= todayStr);

  return filtered.map(data => ({
    id: data.id,
    title: data.title || "Untitled Event",

    // Dates
    fromDate: data.fromDate || todayStr,
    toDate: data.toDate || data.fromDate || todayStr,

    // Times
    fromTime: data.fromTime || null,
    toTime: data.toTime || null,

    // Venue
    venue: data.venue || data.resolvedName || "Unknown Venue",
    address: data.address || data.resolvedAddress || "Unknown Address",

    // Category
    category: data.category || null,

    // Price
    price: data.price ?? 0,

    // Coordinates
    coords: data.coords || null,

    // Map fields
    mapImageUrl: data.mapImageUrl || null,
    mapsWebUrl: data.mapsWebUrl || null,
    placeId: data.placeId || null,
    resolvedName: data.resolvedName || null,
    resolvedAddress: data.resolvedAddress || null,

    // Media
    images: data.images || [],
    banners: data.banners || [],
    mainPhotoURL: data.mainPhotoURL || null,

    // Short link
    shortCode: data.shortCode || null,

    ...data
  }));
}

// -----------------------------
// BUSINESS HELPERS
// -----------------------------
async function getAllBusinesses(userLocation = null) {
  const snap = await db.collection("Businesses")
    .orderBy("busname")
    .get();

  return snap.docs.map(doc => {
    const data = doc.data() || {};

    // Normalize coords
    const coords =
      data.coords ||
      (data.lat && data.lng ? { lat: data.lat, lng: data.lng } : null);

    // Distance calculation
    let _distance = null;
    if (coords && userLocation) {
      _distance = getDistanceMeters(userLocation, coords);
    }

    return {
      id: doc.id,

      // Core identity
      busname: data.busname || "Unnamed Business",
      resolvedName: data.resolvedName || null,

      // Location
      address: data.address || data.location || data.resolvedAddress || null,
      resolvedAddress: data.resolvedAddress || null,
      coords,
      lat: coords.lat || null,
      lng: coords.lng || null,
      

      // Categories
      categories: Array.isArray(data.categories) ? data.categories : [],
      subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],

      // Vibe + price
      vibeTags: data.vibeTags || [],
      priceRange: data.priceRange || null,

      // Contact
      emails: data.emails || [],
      phones: data.phones || [],
      whatsapp: data.whatsapp || [],

      // Websites + social
      websites: data.websites || [],
      social: data.social || {
        facebook: [],
        instagram: [],
        twitter: [],
        youtube: [],
        other: []
      },

      // Hours (light)
      openNow: data.openNow ?? null,
      hours: Array.isArray(data.hours) ? data.hours : null,
      hoursText: data.hoursText || null,
      weeklyHours: data.weeklyHours || null,
      hoursSource: data.hoursSource || null,

      // Media (light)
      mainPhotoURL: data.mainPhotoURL || null,
      googleThumbnailUrl: data.googleThumbnailUrl || null,
      mapImageUrl: data.mapImageUrl || null,

      // Map + Google metadata
      mapsWebUrl: data.mapsWebUrl || null,
      placeId: data.placeId || null,
      googleCid: data.googleCid || null,
      googleFid: data.googleFid || null,

      // Menu
      menuUrl: data.menuUrl || null,

      // External IDs
      externalId: data.externalId || null,
      listing_id: data.listing_id || null,

      // Distance helper
      _distance,
      // Preserve everything else safely
      ...data
    };
  });
}

function formatEventTimeRange(start, end) {
  if (!start && !end) return "";

  if (start && end) return `${start}–${end}`;
  if (start) return `${start}`;
  if (end) return `${end}`;

  return "";
}

async function getAllEventsUnified(userLocation = null) {
  const today = new Date();
  const todayStr = formatEventDate(today);

  const snap = await db.collection("Events")
    .orderBy("fromDate")
    .get();

  const all = snap.docs.map(doc => {
    const data = doc.data() || {};

    // -----------------------------
    // DATE NORMALIZATION
    // -----------------------------
    const fromDate = data.fromDate || null;
    const toDate   = data.toDate   || fromDate || null;

    // -----------------------------
    // TIME NORMALIZATION
    // -----------------------------
    const fromTime = data.fromTime || null;
    const toTime   = data.toTime   || null;

    // -----------------------------
    // LOCATION NORMALIZATION
    // -----------------------------
    const venue =
      data.venue ||
      data.resolvedName ||
      "Unknown Venue";

    const address =
      data.address ||
      data.resolvedAddress ||
      venue;

    // -----------------------------
    // COORDS (ONLY IF PRESENT)
    // -----------------------------
    // Normalize coords
    const coords =
      data.coords ||
      (data.lat && data.lng ? { lat: data.lat, lng: data.lng } : null);

    // Distance calculation
    let _distance = null;
    if (coords && userLocation) {
      _distance = getDistanceMeters(userLocation, coords);
    }

    // -----------------------------
    // CONTACT
    // -----------------------------
    const emails = Array.isArray(data.emails)
      ? data.emails
      : (data.email ? [data.email] : []);

    const phones = Array.isArray(data.phones)
      ? data.phones
      : (data.phone ? [{ label: "Call", number: data.phone }] : []);

    const whatsapp = Array.isArray(data.whatsapp) ? data.whatsapp : [];

    // -----------------------------
    // MEDIA
    // -----------------------------
    const images = Array.isArray(data.images) ? data.images : [];
    const mainImage = data.mainImage || images[0] || null;

    // -----------------------------
    // META
    // -----------------------------
    const category = data.category || null;
    const price = data.price ?? 0;

    // -----------------------------
    // OPTIONAL FIELDS (SAFE)
    // -----------------------------
    const recurrence = data.recurrence || "One-time";
    const ticketBooking = data.ticketBooking || "Disable";
    const showPrice = data.showPrice !== undefined ? data.showPrice : true;

    return {
      id: doc.id,
      title: data.title || "Untitled Event",

      // Dates
      fromDate,
      toDate,

      // Times
      fromTime,
      toTime,

      // Location
      venue,
      address,
      coords,

      // Map fields
      mapImageUrl: data.mapImageUrl || null,
      mapsWebUrl: data.mapsWebUrl || null,
      placeId: data.placeId || null,
      resolvedName: data.resolvedName || null,
      resolvedAddress: data.resolvedAddress || null,

      // Contact
      emails,
      phones,
      whatsapp,

      // Media
      images,
      mainImage,

      // Meta
      category,
      price,
      recurrence,
      ticketBooking,
      showPrice,
      _distance,
      // Preserve everything else safely
      ...data
    };
  });

  const todayEvents = all.filter(e =>
    e.fromDate && e.toDate &&
    e.fromDate <= todayStr &&
    e.toDate >= todayStr
  );

  const upcomingEvents = all.filter(e =>
    e.toDate && e.toDate >= todayStr
  );

  const nowEvents = all.filter(e => {
    if (!e.fromTime || !e.toTime) return false;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const toMinutes = t => {
      if (!t || !t.includes(":")) return null;
      const [hStr, rest] = t.split(":");
      const h = Number(hStr);
      const m = Number((rest || "0").replace(/\D+/g, "")) || 0;
      return h * 60 + m;
    };

    const start = toMinutes(e.fromTime);
    const end = toMinutes(e.toTime);

    if (start === null || end === null) return false;

    return nowMinutes >= start && nowMinutes <= end;
  });

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const startWeekStr = formatEventDate(startOfWeek);
  const endWeekStr = formatEventDate(endOfWeek);

  const thisWeekEvents = all.filter(e =>
    e.fromDate && e.toDate &&
    e.toDate >= startWeekStr &&
    e.fromDate <= endWeekStr
  );

  const friday = new Date(today);
  friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7));

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  const fridayStr = formatEventDate(friday);
  const sundayStr = formatEventDate(sunday);

  const weekendEvents = all.filter(e =>
    e.fromDate && e.toDate &&
    e.toDate >= fridayStr &&
    e.fromDate <= sundayStr
  );

  const tonightEvents = all.filter(e => {
    if (!e.fromTime) return false;

    const [hStr, rest] = e.fromTime.split(":");
    const h = Number(hStr);
    const m = Number((rest || "0").replace(/\D+/g, "")) || 0;
    const eventStartMinutes = h * 60 + m;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const sixPM = 18 * 60;

    return (
      e.fromDate === todayStr &&
      eventStartMinutes >= sixPM &&
      eventStartMinutes >= nowMinutes
    );
  });

  return {
    all,
    today: todayEvents,
    upcoming: upcomingEvents,
    now: nowEvents,
    thisWeek: thisWeekEvents,
    weekend: weekendEvents,
    tonight: tonightEvents
  };
}
async function nameExists(displayName) {
  const snap = await db
    .firestore()
    .collection("Users")
    .where("DisplayName", "==", displayName)
    .limit(1)
    .get();

  return !snap.empty;
}

// Small helper: safe JSON parse
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function generateUniqueDisplayName() {
  const ADJECTIVES = [
    "Coral","Tide","Reef","Ember","Azure","Lunar","Solar","Mystic","Drift","Storm",
    "Lagoon","Sand","Dawn","Dusk","Breeze","Flame","Frost","Moon","Star","Tropic",
    "Ocean","Deep","Bright","Wild","Crest","Gale","Cloud","Shore","Golden","Silver",
    "Crimson","Mist","Palm","Wave","Glow","Swift","Stone","Spirit"
  ];

  const NOUNS = [
    "Ranger","Diver","Nomad","Sentinel","Voyager","Warden","Guardian","Seeker","Hunter",
    "Drifter","Rider","Scout","Wanderer","Spirit","Shifter","Runner","Glider","Strider",
    "Watcher","Herald","Chaser","Breaker","Tamer","Caller","Dancer","Forger","Weaver",
    "Sentry","Pilot","Sailor","Mariner","Surfer","Skipper","Tracker","Falcon","Manta",
    "Keeper","Whisper","Seafarer"
  ];

  // Pick adjective + noun
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  const base = `${adj}•${noun}`;

  // If base is free → use it
  if (!(await nameExists(base))) return base;

  // Try base•2 → base•9998
  for (let i = 2; i < 9999; i++) {
    const candidate = `${base}•${i}`;
    if (!(await nameExists(candidate))) return candidate;
  }

  // Emergency fallback
  const ts = PulseRealm.PulseNOW.toMillis();
  return `${base}•${ts}`;
}

// -------------------------------------------------------
// STATIC MAP URL BUILDER
// -------------------------------------------------------
function buildStaticMapUrl(lat, lng, placeId, key, label = "") {
  const base =
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}` +
    `&zoom=17&size=600x400&scale=2&maptype=roadmap`;

  // If we have a valid place_id, use it (Google will label it automatically)
  if (placeId) {
    return `${base}&markers=color:red|place_id:${placeId}&key=${key}`;
  }

  // Fallback: coordinate-based marker WITH optional label
  const labelPart = label
    ? `&markers=color:red|label:${encodeURIComponent(label)}|${lat},${lng}`
    : `&markers=color:red|${lat},${lng}`;

  return `${base}${labelPart}&key=${key}`;
}

//=======================================================================================================
//=======================================================================================================

function normalizeCountry(input) {
  if (!input) return "BZ";

  const value = String(input).trim().toLowerCase();
  const cleaned = value.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

  if (/^[a-z]{2}$/i.test(cleaned)) return cleaned.toUpperCase();

  const alpha3 = {
    usa: "US", can: "CA", mex: "MX", blz: "BZ", gbr: "GB",
    jam: "JM", tto: "TT", hnd: "HN", gtm: "GT", slv: "SV",
    nic: "NI", cri: "CR", pan: "PA", dom: "DO", prt: "PR",
    brb: "BB", lca: "LC", kna: "KN"
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
//  VAULT HOOKS — FRONTEND → BACKEND (sendPin, verifyPin)
// ============================================================================

  PulseRealm.PulseHooks = {
    async sendPin(payload) {
      console.log("[VAULT] sendPin → backend", payload);

      const res = await fetch("/sendPin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      console.log("[VAULT] sendPin ← backend response", json);

      return json;
    },

    async verifyPin(payload) {
      console.log("[VAULT] verifyPin → backend", payload);

      const res = await fetch("/verifyPin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      console.log("[VAULT] verifyPin ← backend response", json);

      return json;
    }
  };

