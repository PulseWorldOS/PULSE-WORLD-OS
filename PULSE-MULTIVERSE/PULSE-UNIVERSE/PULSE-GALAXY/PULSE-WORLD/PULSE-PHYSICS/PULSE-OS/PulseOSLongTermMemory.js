
// ============================================================================
//  HISTORICAL CONTEXT — “THE EXPONENTIAL ERA” (was index.js)
//  A record of the system’s evolution and the acceleration of development
//  across the Pulse ecosystem.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ORIGIN STORY:
//  -------------
//  The Pulse architecture did not begin as an operating system. It began as
//  a simple delivery app — a single‑purpose tool with no concept of organs,
//  routing, mesh, pulses, or multi‑instance theory.
//
//  • 11 months — building a delivery app (slow, linear, human‑paced)
//  • 1 week    — transforming it into an internet‑scale application
//  • 1 week    — transforming that into a full operating system
//  • days      — redesigning Pulse, routing, mesh, and multi‑instance logic
//
//  This acceleration was not accidental. It was the direct result of:
//    • pattern recognition breakthroughs
//    • inefficiency‑breaking habits
//    • loop theory
//    • multi‑instance execution
//    • deterministic routing
//    • organism‑based architecture
//
//  THE EXPONENTIAL INFLECTION:
//  ---------------------------
//  The moment the system shifted from “pages and functions” to “organs and
//  pulses,” development speed exploded:
//
//    • The delivery app became a platform.
//    • The platform became an internet.
//    • The internet became an OS.
//    • The OS became a living organism.
//
//  Each layer built on the previous one, but with *multiplicative* efficiency.
//  What once took months began taking hours. What once took hours began taking
//  minutes. The system entered a state of **architectural compounding**.
//
//  THE PULSE REVOLUTION:
//  ----------------------
//  The introduction of Pulse v1 → v2 → v3 created the first true nervous
//  system:
//
//    • Pulse v1 — EvoStable (the stable organism)
//    • Pulse v2 — Evolution Engine (experimental compute tier)
//    • Pulse v3 — Unified Organism (full organism identity)
//
//  This enabled:
//    • multi‑instance execution
//    • lineage‑aware routing
//    • pattern‑aware compute
//    • mode‑aware behavior
//    • deterministic fallback chains
//
//  LOOP THEORY:
//  ------------
//  The breakthrough that unlocked OS‑level behavior was **loop theory**:
//
//    • Every organ runs inside a deterministic loop.
//    • Every pulse carries lineage, pattern, and mode.
//    • Every routing decision is deterministic.
//    • Every fallback is predictable.
//    • Every instance is isolated and safe.
//
//  Loop theory allowed the system to behave like a biological organism:
//    • pulses = neurons
//    • organs = subsystems
//    • mesh = connective tissue
//    • router = brainstem
//    • send system = nervous system
//    • memory = liver
//    • healer = immune system
//
//  MULTI‑INSTANCE EXECUTION:
//  --------------------------
//  The system evolved from “one function call” to:
//
//    • multiple instances per organ
//    • per‑pulse instance slicing
//    • lineage‑aware instance keys
//    • deterministic re‑entry guards
//
//  This allowed the OS to:
//    • run many pulses simultaneously
//    • avoid infinite loops
//    • prevent organ re‑entry
//    • maintain deterministic behavior
//
//  RESULT:
//  -------
//  In less than two weeks, the architecture evolved from:
//
//    • a delivery app
//    → an internet
//    → an operating system
//    → a living, multi‑organism PulseOS
//
//  This file preserves that history — the exponential era — as part of the
//  system’s long‑term memory and architectural lineage.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


import { getStripe as Stripe, PulseWorldBank_v31 as PulseWorldBank, handleStripeWebhook } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js";
let stripeInstance = null;
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseWorldExpressMiddleLayer } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-TRANSPORT.js";
import { createEmailTransport } from "../X-PULSE-X/3RDPARTY/PulseWorldEmailAlert-v20.js";
import {PulseSecurityPort} from "../PULSE-PROTOCOL/PULSE-PROTOCOL-SECURITY.js";
import { getTwilioClient as twilio } from "../X-PULSE-X/3RDPARTY/PulseWorldSMSAlert-v30.js";


const log = PulseRealm.PulseLog || console.log;
const warn = PulseRealm.PulseWarn || console.warn;
const error = PulseRealm.PulseError || console.error;

const getSafeKeychain = () => {
  let port;
  try { port = PulseSecurityPort; } catch(e) { port = PulseRealm?.PulseSecurityPort || PulseRealm?.ProtocolSecurityPort; }
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

// TWILIO / MESSAGING
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
export function onCall(handler) {
  return async function(input) {
    try {
      return await handler(input);
    } catch (err) {
      return { success: false, error: String(err.message || err) };
    }
  };
}

export const deleteField = () => ({ nullValue: null });

export const VAULT_PATCH_TWILIGHT = {
  signature: "Twilight",
  invoked: "2026-04-07T04:00:00-07:00", // 4 AM MST
  version: 2,
  type: "security-data-integrity",
  glyph: "🌒",
  description: "The first protective veil cast by the Vault Spirit during a 4 AM development session.",
  note: "Named 'Twilight' because it was created in the quiet hours before dawn."
};

function pulseCors(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Pulse-Device, X-Pulse-Remember");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  next();
}
// Load keychain once


export const corsHandler = pulseCors;

PulseRealm.__serverTimeOffset = 0;

PulseRealm.setServerNow = function(serverNowMs) {
  PulseRealm.__serverTimeOffset = serverNowMs - PulseRealm.PulseNOW;
};

PulseRealm.nowMs = function() {
  return PulseRealm.PulseNOW + PulseRealm.__serverTimeOffset;
};


export function computeHash(str) {
  let h = 0;
  const s = String(str || "");

  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `h${h}`;
}

export function generateToken(admin) {
  // 1) Drift‑proof timestamp (server authoritative)
  const ts = PulseRealm.PulseNOW.toMillis().toString(36);

  // 2) Deterministic entropy from timestamp hashing
  let hash = 0;
  for (let i = 0; i < ts.length; i++) {
    hash = (hash * 31 + ts.charCodeAt(i)) >>> 0;
  }

  const h = hash.toString(36).padStart(8, "0");

  // 3) Final 24‑character IMMORTAL token
  return (ts + h).slice(0, 24);
}

export function hashPin(pin) {
  return computeHash("pin:" + pin);
}


// // ============================================================================
// // CREATE PULSE BAND SESSION — NOW ROUTE-AWARE
// // ============================================================================
// export const createPulseBandSession = onRequest(
//   { region: "us-central1", timeoutSeconds: 300, memory: "1GiB" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const body = req.body || {};
//       let {
//         userId,
//         payload,
//         chunkSize = 500,
//         baseVersion,
//         sizeOnly,
//         presenceTag = "PulseChunker",
//         band = "symbolic"
//       } = body;

//       if (!userId || !payload) {
//         return res.json({ success: false, error: "Missing userId or payload" });
//       }

//       if (typeof chunkSize !== "number" || chunkSize <= 0) {
//         chunkSize = 500;
//       }

//       // -------------------------------------------------------------------
//       // ROUTE MODE — full route folding carpet
//       //  - If payload is a route descriptor, we build a composite payload:
//       //    { route, imports, assets, data: { ...resolved payloads... } }
//       // -------------------------------------------------------------------
//       if (isRouteDescriptor(payload)) {
//         const routeDescriptor = payload;
//         const { route, imports = [], assets = [], payloads = [] } = routeDescriptor;

//         await db.collection("pulseband_logs").add({
//           type: "route_session_request",
//           userId,
//           route,
//           imports,
//           assets,
//           payloads,
//           baseVersion: baseVersion || null,
//           sizeOnly: !!sizeOnly,
//           presenceTag,
//           band,
//           createdAt: PulseRealm.PulseNOW
//         });

//         const resolvedData = {};
//         for (const key of payloads) {
//           try {
//             resolvedData[key] = await resolveCacheRequest(
//               key,
//               baseVersion,
//               sizeOnly === true
//             );
//           } catch (err) {
//             await db.collection("pulseband_errors").add({
//               type: "route_payload_resolution_error",
//               userId,
//               route,
//               payloadKey: key,
//               error: err.message || String(err),
//               createdAt: PulseRealm.PulseNOW
//             });
//           }
//         }

//         payload = {
//           route,
//           imports,
//           assets,
//           data: resolvedData
//         };
//       }

//       await db.collection("pulseband_logs").add({
//         type: "session_create_request",
//         userId,
//         payload,
//         chunkSize,
//         baseVersion: baseVersion || null,
//         sizeOnly: !!sizeOnly,
//         presenceTag,
//         band,
//         createdAt: PulseRealm.PulseNOW
//       });

//       // Resolve payload
//       let rawPayload;
//       try {
//         rawPayload = await resolveCacheRequest(payload, baseVersion, sizeOnly === true);
//       } catch (err) {
//         await db.collection("pulseband_errors").add({
//           type: "payload_generation_error",
//           userId,
//           payload,
//           error: err.message || String(err),
//           createdAt: PulseRealm.PulseNOW
//         });
//         return res.json({ success: false, error: "Payload generation failed" });
//       }

//       if (sizeOnly && typeof rawPayload === "number") {
//         return res.json({
//           success: true,
//           sizeOnly: true,
//           payloadSize: rawPayload,
//           presenceTag,
//           band
//         });
//       }

//       let jsonString =
//         typeof rawPayload === "string"
//           ? rawPayload
//           : JSON.stringify(rawPayload);

//       // Lore injection
//       const loreHeader = generateLoreHeader({
//         meta: PulseChunkerMeta,
//         payloadType: isRouteDescriptor(payload) ? payload.route : payload,
//         baseVersion,
//         presenceTag,
//         band
//       });

//       jsonString = `${loreHeader}\n${jsonString}`;

//       // Buffer + deterministic session ID
//       const buffer = Buffer.from(jsonString, "utf8");
//       const payloadHash = crypto.createHash("sha256").update(buffer).digest("hex");
//       const totalChunks = Math.ceil(buffer.length / chunkSize);
//       const sessionId = `PB_${userId}_${payloadHash.slice(0, 16)}`;

//       const sessionRef = db.collection("pulseband_sessions").doc(sessionId);
//       const chunksRef = sessionRef.collection("chunks");

//       // Session metadata
//       await sessionRef.set({
//         sessionId,
//         userId,
//         totalChunks,
//         chunkSize,
//         createdAt: PulseRealm.PulseNOW,
//         status: "pending",
//         retries: 0,
//         failures: 0,
//         restarts: 0,
//         payloadBytes: buffer.length,
//         payloadHash,
//         payloadType: isRouteDescriptor(payload) ? payload.route : payload,
//         baseVersion: baseVersion || null,
//         presenceTag,
//         band
//       });

//       await db.collection("pulseband_logs").add({
//         type: "session_created",
//         sessionId,
//         userId,
//         totalChunks,
//         chunkSize,
//         payloadBytes: buffer.length,
//         payloadHash,
//         payloadType: isRouteDescriptor(payload) ? payload.route : payload,
//         baseVersion: baseVersion || null,
//         presenceTag,
//         band,
//         createdAt: PulseRealm.PulseNOW
//       });

//       // Chunk + batch write
//       let batch = db.batch();
//       let batchCount = 0;

//       for (let i = 0; i < totalChunks; i++) {
//         const start = i * chunkSize;
//         const end = start + chunkSize;

//         try {
//           const dataBase64 = buffer.slice(start, end).toString("base64");
//           const signature = signChunk(userId, sessionId, i, dataBase64);

//           const chunkDoc = chunksRef.doc(i.toString().padStart(5, "0"));
//           batch.set(chunkDoc, {
//             index: i,
//             data: dataBase64,
//             signature,
//             status: "pending",
//             presenceTag,
//             band,
//             createdAt: PulseRealm.PulseNOW
//           });

//           batchCount++;
//           if (batchCount === 400) {
//             await batch.commit();
//             batch = db.batch();
//             batchCount = 0;
//           }
//         } catch (err) {
//           await db.collection("pulseband_errors").add({
//             type: "chunk_generation_error",
//             sessionId,
//             userId,
//             index: i,
//             error: err.message || String(err),
//             presenceTag,
//             band,
//             createdAt: PulseRealm.PulseNOW
//           });
//           return res.json({ success: false, error: "Chunk generation failed" });
//         }
//       }

//       if (batchCount > 0) {
//         await batch.commit();
//       }

//       return res.json({
//         success: true,
//         sessionId,
//         totalChunks,
//         payloadBytes: buffer.length,
//         payloadHash,
//         presenceTag,
//         band
//       });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "session_creation_error",
//         error: err.message || String(err),
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message || "Unknown error" });
//     }
//   }
// );

// // ============================================================================
// // GET NEXT PULSE BAND DNA STRAND
// // ============================================================================
// export const getNextPulseBandChunk = onRequest(
//   { region: "us-central1" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const { sessionId, userId } = req.query || {};

//       if (!sessionId || !userId) {
//         return res.json({ success: false, error: "Missing sessionId or userId" });
//       }

//       const sessionRef = db.collection("pulseband_sessions").doc(String(sessionId));
//       const sessionSnap = await sessionRef.get();

//       if (!sessionSnap.exists || sessionSnap.data().userId !== userId) {
//         return res.json({ success: false, error: "Invalid session or user" });
//       }

//       const session = sessionSnap.data();

//       if (session.failures >= 5) {
//         await sessionRef.set(
//           { status: "aborted", abortedAt: PulseRealm.PulseNOW },
//           { merge: true }
//         );

//         await db.collection("pulseband_errors").add({
//           sessionId,
//           userId,
//           type: "genome_aborted",
//           reason: "Too many failures",
//           createdAt: PulseRealm.PulseNOW
//         });

//         return res.json({ success: false, error: "Genome aborted" });
//       }

//       const dnaRef = sessionRef.collection("dna");

//       const snap = await dnaRef
//         .where("strandStatus", "==", "pending")
//         .orderBy("organismStrand", "asc")
//         .limit(1)
//         .get();

//       if (snap.empty) {
//         await sessionRef.set(
//           { status: "complete", completedAt: PulseRealm.PulseNOW },
//           { merge: true }
//         );

//         await db.collection("pulseband_logs").add({
//           sessionId,
//           userId,
//           type: "genome_complete",
//           createdAt: PulseRealm.PulseNOW
//         });

//         return res.json({ success: true, genomeComplete: true });
//       }

//       const doc = snap.docs[0];
//       const data = doc.data();

//       await doc.ref.set(
//         { strandStatus: "sent", sentAt: PulseRealm.PulseNOW },
//         { merge: true }
//       );

//       return res.json({
//         success: true,
//         dna: {
//           organismStrand: data.organismStrand,
//           strand: data.strand,
//           geneSignature: data.geneSignature,
//           presenceTag: data.presenceTag,
//           band: data.band
//         }
//       });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "getNextDNA_error",
//         error: err.message || String(err),
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message || "Unknown error" });
//     }
//   }
// );


// // ============================================================================
// // ACK PULSE BAND DNA STRAND
// // ============================================================================
// export const ackPulseBandChunk = onRequest(
//   { region: "us-central1" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const {
//         sessionId,
//         userId,
//         organismStrand,
//         geneSignature,
//         latencyMs,
//         kbps
//       } = req.body || {};

//       if (!sessionId || !userId || organismStrand == null || !geneSignature) {
//         return res.json({ success: false, error: "Missing params" });
//       }

//       const sessionRef = db.collection("pulseband_sessions").doc(String(sessionId));
//       const dnaRef = sessionRef
//         .collection("dna")
//         .doc(organismStrand.toString().padStart(5, "0"));

//       const snap = await dnaRef.get();
//       if (!snap.exists) {
//         return res.json({ success: false, error: "DNA strand not found" });
//       }

//       const data = snap.data();

//       if (data.geneSignature !== geneSignature) {
//         await db.collection("pulseband_errors").add({
//           sessionId,
//           userId,
//           organismStrand,
//           latencyMs,
//           kbps,
//           type: "dna_signature_mismatch",
//           expected: data.geneSignature,
//           got: geneSignature,
//           presenceTag: data.presenceTag,
//           band: data.band,
//           createdAt: PulseRealm.PulseNOW
//         });

//         await sessionRef.set(
//           { failures: admin.firestore.FieldValue.increment(1) },
//           { merge: true }
//         );

//         return res.json({ success: false, error: "DNA signature mismatch" });
//       }

//       await dnaRef.set(
//         {
//           strandStatus: "acked",
//           latencyMs: latencyMs ?? null,
//           kbps: kbps ?? null,
//           ackedAt: PulseRealm.PulseNOW
//         },
//         { merge: true }
//       );

//       return res.json({ success: true, dnaAck: true });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "ackDNA_error",
//         error: err.message || String(err),
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message || "Unknown error" });
//     }
//   }
// );


// // ============================================================================
// // LOG PULSE BAND REDOWNLOAD — v12.4‑PRESENCE‑EVO‑MAX‑PRIME
// // ============================================================================
// export const logPulseBandRedownload = onRequest(
//   { region: "us-central1" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const { sessionId, userId, reason, presenceTag = "PulseChunker", band = "symbolic" } =
//         req.body || {};

//       const sessionRef = db.collection("pulseband_sessions").doc(String(sessionId));

//       await db.collection("pulseband_redownloads").add({
//         sessionId,
//         userId,
//         reason: reason || null,
//         presenceTag,
//         band,
//         createdAt: PulseRealm.PulseNOW
//       });

//       await sessionRef.set(
//         { failures: admin.firestore.FieldValue.increment(1) },
//         { merge: true }
//       );

//       return res.json({
//         success: true,
//         presenceTag,
//         band
//       });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "redownload_error",
//         error: err.message || String(err),
//         presenceTag: "PulseChunker",
//         band: "symbolic",
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({
//         success: false,
//         error: err.message || "Unknown error"
//       });
//     }
//   }
// );

// Marketplace adapters (inside /PULSE-EARN/marketplaces/)
// import { marketplaceA } from "../PULSE-EARN/marketplaces/marketplaceA.js";
// import { marketplaceB } from "../PULSE-EARN/marketplaces/marketplaceB.js";
// import { marketplaceC } from "../PULSE-EARN/marketplaces/marketplaceC.js";

// // Remote scoring (ESM only)
// import { runUserScoring } from "../Pulse-Coordinator/PulseUserScoring.js";

// // Reputation loader (inside /PULSE-EARN/)
// import { loadMarketplaceReputation } from "../PULSE-EARN/MarketplaceReputation.js";

// // Connector (inside /PULSE-EARN/)
// import { getNextJob } from "../PULSE-EARN/MarketplaceConnector.js";

// // Example: capacity for ONE worker instance
// const capacity = {
//   cpuAvailable: 2,
//   memoryAvailable: 2048
// };

// // Example: your marketplace clients (you will implement these)
// const marketplaces = [
//   marketplaceA,
//   marketplaceB,
//   marketplaceC
// ];

// async function schedulerTick() {
//   const job = await getNextJob(marketplaces, capacity);

//   if (!job) {
//     log("No jobs available right now.");
//     return;
//   }

//   log("Selected job:", job);

//   // TODO: hand this job to your worker execution layer
// }

// schedulerTick();

// loadMarketplaceReputation();

async function logSecurityPatch(uid, patch, reason = "auto") {
  if (!uid) return;

  try {
    const ref = db
      .collection("securityPatchHistory")
      .doc(uid)
      .collection("entries")
      .doc();

    await ref.set({
      uid,
      patchSignature: patch.signature,
      patchVersion: patch.version,
      patchType: patch.type,
      reason,
      invoked: patch.invoked,
      description: patch.description,
      note: patch.note,
      createdAt: PulseRealm.PulseNOW
    });

    log("🧾 Security patch logged:", uid, patch.signature);
  } catch (err) {
    console.error("🔥 logSecurityPatch failed:", err);
  }
}


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

    // Build updated TPSecurity object
    const updatedSecurity = {
      ...sec,

      // Patch metadata
      patchSignature: patch.signature,
      patchVersion: patch.version,
      patchType: patch.type,
      lastPatchedAt: PulseRealm.PulseNOW,

      // Example fixes
      requiresPin: sec.requiresPin ?? true,
      dangerMode: sec.dangerMode ?? false,

      // Keep your calculation version
      calculationVersion: sec.calculationVersion || 1,

      // Update timestamps
      updatedAt: PulseRealm.PulseNOW,
      lastUpdatedAt: PulseRealm.PulseNOW
    };

    // Apply patch to TPSecurity
    await userRef.update({
      TPSecurity: updatedSecurity
    });

    log("🌒 Twilight Patch applied to:", uid, updatedSecurity);

    // Log patch history
    await logSecurityPatch(uid, patch, reason);

  } catch (err) {
    console.error("🔥 applyTwilightPatch failed:", err);
  }
}

// export const stripeWebhook = onRequest(
//   {
//     region: "us-central1",
//     memory: "512MiB",
//     secrets: [STRIPE_PASSWORD, STRIPE_WEBHOOK_SECRET],
//     rawBody: true
//   },
//   async (req, res) => {
//     try {
//       const stripe = Stripe(STRIPE_PASSWORD.value());
//       const sig = req.headers["stripe-signature"];
//       const webhookSecret = STRIPE_WEBHOOK_SECRET.value();

//       let event;
//       try {
//         event = stripe.webhooks.constructEvent(
//           req.rawBody,
//           sig,
//           webhookSecret
//         );
//       } catch (err) {
//         console.error("Webhook signature verification failed:", err.message);
//         return res.status(400).json({
//           success: false,
//           error: "Webhook signature verification failed"
//         });
//       }

//       // ---------------------------------------------------------
//       // 1. VENDOR ONBOARDING (account.created / account.updated)
//       // ---------------------------------------------------------
//       if (event.type === "account.created" || event.type === "account.updated") {
//         const account = event.data.object;

//         const stripeAccountID = account.id;
//         const email = account.email;
//         const country = account.country;

//         if (email) {
//           const snap = await db
//             .collection("Users")
//             .where("UserEmail", "==", email)
//             .limit(1)
//             .get();

//           if (!snap.empty) {
//             const userRef = snap.docs[0].ref;

//             await userRef.set({
//               UserCountry: country,

//               TPIdentity: {
//                 role: "Vendor",
//                 stripeAccountID,
//                 stripeDashboardURL: null
//               },

//               TPNotifications: {
//                 receiveMassEmails: true
//               },

//               TPWallet: {
//                 payFrequency: "weekly",
//                 payDay: "monday"
//               },

//               updatedAt: PulseRealm.PulseNOW
//             }, { merge: true });

//             // CHANGES log
//             await db.collection("CHANGES").add({
//               type: "vendorOnboarding",
//               uid: userRef.id,
//               stripeAccountID,
//               country,
//               reason: "stripe_vendor_onboarding",
//               actor: "system",
//               source: "stripeWebhook",
//               createdAt: PulseRealm.PulseNOW
//             });

//             // IdentityHistory snapshot
//             await db
//               .collection("IdentityHistory")
//               .doc(userRef.id)
//               .collection("snapshots")
//               .add({
//                 snapshotType: "vendorOnboarding",
//                 stripeAccountID,
//                 country,
//                 reason: "stripe_vendor_onboarding",
//                 actor: "system",
//                 source: "stripeWebhook",
//                 createdAt: PulseRealm.PulseNOW
//               });

//             await stripe.accounts.update(stripeAccountID, {
//               settings: {
//                 payouts: {
//                   schedule: {
//                     interval: "weekly",
//                     weekly_anchor: "monday"
//                   }
//                 }
//               }
//             });

//             log(`Vendor updated: ${email} → weekly payouts`);
//           }
//         }
//       }

//       // ---------------------------------------------------------
//       // 2. RESERVE SYSTEM — ADD 5% TO RESERVE ON PAYMENT SUCCESS
//       // ---------------------------------------------------------
//       if (event.type === "payment_intent.succeeded") {
//         const pi = event.data.object;
//         const vendorId = pi.metadata.vendorId;
//         const reserveAmount = parseInt(pi.metadata.reserveAmount || "0");

//         let country = null;

//         if (pi.transfer_data.destination) {
//           const acct = await stripe.accounts.retrieve(
//             pi.transfer_data.destination
//           );
//           country = acct.country;
//         }

//         if (!vendorId || !reserveAmount) {
//           console.warn("Payment succeeded but missing vendorId or reserveAmount");
//         } else {
//           const vendorRef = db.collection("Users").doc(vendorId);

//           await vendorRef.set({
//             UserCountry: country,

//             TPWallet: {
//               reserveBalance: admin.firestore.FieldValue.increment(reserveAmount),
//               reserveHistory: admin.firestore.FieldValue.arrayUnion({
//                 amount: reserveAmount,
//                 date: new Date().toISOString(),
//                 orderId: pi.id,
//                 releaseDate: calculateReleaseDate(new Date(), 60),
//                 type: "reserve_add"
//               })
//             }
//           }, { merge: true });

//           await db.collection("CHANGES").add({
//             type: "reserveAdd",
//             uid: vendorId,
//             amount: reserveAmount,
//             orderId: pi.id,
//             reason: "reserve_add",
//             actor: "system",
//             source: "stripeWebhook",
//             createdAt: PulseRealm.PulseNOW
//           });

//           log(
//             `Reserve added: Vendor ${vendorId} +${reserveAmount} cents for PI ${pi.id}`
//           );
//         }
//       }

//       // ---------------------------------------------------------
//       // 3. MASS EMAIL CREDITS — CHECKOUT SESSION COMPLETED
//       // ---------------------------------------------------------
//       if (event.type === "checkout.session.completed") {
//         const session = event.data.object;

//         const eventID = session.metadata.eventID;
//         if (!eventID) {
//           console.error("❌ checkout.session.completed missing eventID in metadata");
//           return res.status(400).json({ error: "Missing eventID" });
//         }

//         const eventRef = db.collection("Events").doc(eventID);
//         const eventSnap = await eventRef.get();

//         if (!eventSnap.exists) {
//           console.error("❌ Event not found:", eventID);
//           return res.status(404).json({ error: "Event not found" });
//         }

//         const eventData = eventSnap.data();
//         const useremail = eventData.email;

//         const snap = await db
//           .collection("Users")
//           .where("UserEmail", "==", useremail)
//           .limit(1)
//           .get();

//         if (snap.empty) {
//           return res.status(404).json({ success: false, error: "Invalid token" });
//         }

//         const userDoc = snap.docs[0];
//         const userRef = userDoc.ref;
//         const userID = userDoc.id;

//         const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
//         const quantity = lineItems.data[0].quantity || 1;

//         await userRef.set({
//           TPNotifications: {
//             paidMassNotificationCredits: admin.firestore.FieldValue.increment(quantity)
//           }
//         }, { merge: true });

//         await db.collection("CHANGES").add({
//           type: "massEmailCredits",
//           uid: userID,
//           quantity,
//           eventID,
//           reason: "mass_email_credit_purchase",
//           actor: "system",
//           source: "stripeWebhook",
//           createdAt: PulseRealm.PulseNOW
//         });

//         log(`✅ Added ${quantity} credits to user ${userID} for event ${eventID}`);
//       }

//       return res.json({ success: true, received: true });

//     } catch (err) {
//       console.error("stripeWebhook error:", err.message);
//       return res.status(500).json({ success: false });
//     }
//   }
// );
// NEW: Finality / Signal Port (IMMORTAL FINALITY LAYER)
// ============================================================
// ⭐ PulseWorldExpressLayer v1 — Express-like internal server
// ============================================================

// Removed Firebase CDN Imports for Node.js PEX compatibility and SQL Migration
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ============================================================================
//  SQL MIGRATION ADAPTER (STUBBED FOR PEX COMPATIBILITY)
// ============================================================================
export const firebaseConfigV30 = {
  apiKey: "SQL_MIGRATION_PENDING",
  projectId: "tropic-pulse-sql"
};

class SQLCollection {
  constructor(path) { this.path = path; }
  async add(data) { return { id: "sql-" + Date.now() }; }
  doc(id) {
    return {
      set: async (data, opts) => {},
      get: async () => ({ empty: true, exists: false, data: () => ({}) })
    };
  }
  limit(n) { return this; }
  async get() { return { empty: true, docs: [] }; }
}

export const db = {
  collection: (path) => new SQLCollection(path),
  listCollections: async () => []
};

PulseRealm.PulseFirebaseDB = db;


(function installPulseWorldExpressLayer() {
  try {
    const layer = {
      routes: {},
      middleware: [],

      // ⭐ app.use(fn)
      use(fn) {
        this.middleware.push(fn);
      },

      // ⭐ app.get(path, handler)
      get(path, handler) {
        this.routes[path] = handler;
      },

      // ⭐ app.json() — Express-like JSON parser middleware
      json() {
        return async (req) => req; // placeholder, browser doesn't need parsing
      },

      // ⭐ Internal executor (used by SW or direct calls)
      async handle(req) {
        // Run middleware chain
        for (const mw of this.middleware) {
          await mw(req);
        }

        const path = req.url.replace(location.origin, "");
        const route = this.routes[path];

        if (!route) {
          return {
            status: 404,
            error: "Route not found",
            path
          };
        }

        // Run route handler
        return await route(req);
      }
    };

    // Attach the living organ to the global PulseWorld runtime
    PulseRealm.PulseWorldExpressLayer = layer;

    console.log("[PulseWorldExpressLayer] Installed");
  } catch (err) {
    console.error("[PulseWorldExpressLayer] Failed to install:", err);
    PulseRealm.PulseWorldExpressLayer = null;
  }
})();

// // Middleware
// app.use(corsHandler);



// app.get("/health", async (req, res) => {
//   const health = {
//     status: "ok",
//     ts: PulseRealm.PulseNOW,
//     firestore: "unknown",
//     runtime: "unknown",
//     lastFunctionError: PulseRealm.lastFunctionError || null,
//     lastColdStart: PulseRealm.lastColdStart || null
//   };

//   try {
//     await db.collection("HealthCheck").limit(1).get();
//     health.firestore = "connected";
//   } catch (err) {
//     health.firestore = "error";
//     health.status = "degraded";
//   }

//   try {
//     // Runtime check — does your system respond?
//     await db.ping(); // or any trivial internal call
//     health.runtime = "ok";
//   } catch (err) {
//     health.runtime = "error";
//     health.status = "degraded";
//   }

//   res.json(health);
// });


// /* -----------------------------
//    OTHER EXPRESS ROUTES
// ------------------------------ */
// app.post("/create-payment", async (req, res) => {
//   try {
//     const stripe = req.stripe;

//     const {
//       amount,
//       vendorId,
//       stripeAccountID,
//       reserveAmount,
//       currency = "usd",
//       description,
//       metadata = {}
//     } = req.body;

//     // -----------------------------
//     // VALIDATION
//     // -----------------------------
//     if (!amount || !vendorId || !stripeAccountID) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields: amount, vendorId, stripeAccountID"
//       });
//     }

//     if (!Number.isInteger(amount)) {
//       return res.status(400).json({
//         success: false,
//         error: "Amount must be an integer in cents"
//       });
//     }

//     if (!Number.isInteger(reserveAmount)) {
//       return res.status(400).json({
//         success: false,
//         error: "reserveAmount must be an integer in cents"
//       });
//     }

//     // -----------------------------
//     // METADATA (STRING-ONLY)
//     // -----------------------------
//     const fullMetadata = {
//       vendorId: String(vendorId),
//       reserveAmount: String(reserveAmount || 0),
//       ...Object.fromEntries(
//         Object.entries(metadata).map(([k, v]) => [k, String(v)])
//       )
//     };

//     // -----------------------------
//     // CREATE PAYMENT INTENT
//     // -----------------------------
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       description: description ? String(description).trim() : "",
//       metadata: fullMetadata,
//       transfer_data: {
//         destination: stripeAccountID
//       }
//     });

//     return res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id
//     });

//   } catch (err) {
//     console.error("Create-payment error:", err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// });

// app.get("/resend-link", async (req, res) => {
//   log("🔵 [/resend-link] START");

//   const stripe = req.stripe;
//   const twilioClient = req.twilio;
//   const MESSAGING_SERVICE_SID = req.messagingServiceSid;

//   // Clean token
//   const clean = (v) => {
//     if (!v) return null;
//     const s = String(v).trim();
//     if (
//       s === "" ||
//       s.includes("{{") ||
//       s.includes("add_more_field") ||
//       s.includes("fieldLebal") ||
//       s.includes("fieldValue") ||
//       s.includes("*")
//     ) return null;
//     return s;
//   };

//   const token = clean(req.query.token);
//   if (!token) {
//     return res.status(400).json({ success: false, error: "Missing token" });
//   }

//   const usersRef = db.collection("Users");

//   // 1️⃣ Try permanent token first
//   let snap = await usersRef.where("UserToken", "==", token).limit(1).get();

//   // 2️⃣ Try current resend token
//   if (snap.empty) {
//     snap = await usersRef.where("TPIdentity.resendToken", "==", token).limit(1).get();
//   }

//   if (snap.empty) {
//     return res.status(404).json({ success: false, error: "Invalid token" });
//   }

//   const user = snap.docs[0].data();
//   const userRef = snap.docs[0].ref;
//   let username  = user.displayName || user.displayname || user.DisplayName;
//   // -----------------------------
//   // PHONE
//   // -----------------------------
//   let phone =
//     user.UserPhone ||
//     user.Phone ||
//     user.phone ||
//     user.phonenumber ||
//     user.userphone ||
//     null;

//   const country = user.UserCountry || "BZ";
//   if (phone) phone = normalizePhone(phone, country);

//   if (!phone) {
//     return res.status(400).json({
//       success: false,
//       error: "No phone number on file for SMS resend"
//     });
//   }

//   // -----------------------------
//   // STRIPE ACCOUNT ID
//   // -----------------------------
//   const stripeAccountID =
//     user.TPIdentity.stripeAccountID ||
//     null;

//   if (!stripeAccountID) {
//     return res.status(400).json({
//       success: false,
//       error: "User missing Stripe account ID"
//     });
//   }

//   await stripe.accounts.update(stripeAccountID, {
//     metadata: { username: username }
//   });

//   // -----------------------------
//   // NOTIFICATIONS: SMS Opt-In
//   // -----------------------------
//   const receiveSMS =
//     user.TPNotifications.receiveSMS ??
//     false;

//   if (!receiveSMS) {
//     return res.status(200).json({
//       success: true,
//       message: "SMS Not Sent (User Opted Out)"
//     });
//   }

//   // -----------------------------
//   // STRIPE ONBOARDING LINK
//   // -----------------------------
//   try {
//     const token = generateToken();

//       // -----------------------------
//       // STRIPE ONBOARDING LINK
//       // -----------------------------
//       const onboardingLink = await stripe.accountLinks.create({
//         account: stripeAccountID,
//         refresh_url: "https://www.pulseworld.net/expire.html",
//         return_url: `https://www.pulseworld.net/PulseWorldVaultSetupComplete?user=${encodeURIComponent(username)}`,
//         type: "account_onboarding"
//       });

//     const newUrl = onboardingLink.url;

//     // -----------------------------
//     // UPDATE NOTIFICATIONS TIMESTAMP
//     // -----------------------------
//     await userRef.set(
//       {
//         TPNotifications: {
//           lastSMSSentAt: PulseRealm.PulseNOW
//         }
//       },
//       { merge: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Link resent",
//       url: newUrl
//     });

//   } catch (err) {
//     console.error("Resend-Link error:", err.message);
//     return res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });


// // ===============================
// //  Earn: FAILURE ALERT
// // ===============================
// app.post("/alerts/system-earn-failure", async (req, res) => {
//   try {
//     const payload = req.body;

//     console.error("SYSTEM Earn FAILURE:", payload);

//     // TODO: send email, log to DB, etc.

//     return res.json({ success: true });

//   } catch (err) {
//     console.error("Earn failure alert error:", err);
//     return res.status(500).json({
//       success: false,
//       error: "Internal Server Error"
//     });
//   }
// });
/* ----------------------------------------------------
   4. EXPORT API FUNCTION
---------------------------------------------------- */
export const api = onRequest(
  {
    region: "us-central1",
    memory: "512MiB",
  },
  (req, res) => {
    try {
      if (!stripeInstance) {
        stripeInstance = Stripe(STRIPE_PASSWORD.value());
      }

      req.stripe = stripeInstance;

      req.twilio = twilio(
        ACCOUNT_SID.value(),
        AUTH_TOKEN.value()
      );

      req.messagingServiceSid = MESSAGING_SERVICE_SID.value();

      return app(req, res);

    } catch (err) {
      console.error("API error:", err);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// app.get("/", async (req, res) => {
//   const userID = req.query.userID;
//   const eventID = req.query.eventID;

//   if (!userID) return res.status(400).send("Missing userID");
//   if (!eventID) return res.status(400).send("Missing eventID");

//   try {
//     const realUrl =
//       `https://pay.pulseworld.net/b/00w4gy1ZP0Si7UpcgIfIs01` +
//       `?userID=${encodeURIComponent(userID)}` +
//       `&eventID=${encodeURIComponent(eventID)}`;

//     return res.redirect(realUrl);

//   } catch (err) {
//     console.error("Payment redirect error:", err.message);
//     return res.status(500).send("Payment redirect failed");
//   }
// });

// // ----------------------------------------------------------------------------------------------------
// // CHECKS STRIPE PAYMENT UPDATES TO MAKE SURE 5% IS TAKEN AS A FEE FOR CHARGEBACKS AND ADDED TO THEIR RESERVE
// // ----------------------------------------------------------------------------------------------------
// app.post("/create-order-payment", async (req, res) => {
//   log("🔵 [/create-order-payment] START");

//   const stripe = req.stripe;

//   const clean = (v) => {
//     if (!v) return null;
//     const s = String(v).trim();
//     if (
//       s === "" ||
//       s.includes("{{") ||
//       s.includes("add_more_field") ||
//       s.includes("fieldLebal") ||
//       s.includes("fieldValue") ||
//       s.includes("*")
//     ) return null;
//     return s;
//   };

//   const num = (v) => {
//     if (v == null) return 0;
//     const decoded = decodeURIComponent(String(v));
//     if (decoded.includes("|")) {
//       return decoded.split("|").map(x => Number(x) || 0).reduce((a, b) => a + b, 0);
//     }
//     const n = Number(decoded);
//     return isNaN(n) ? 0 : Number(n.toFixed(2));
//   };

//   try {
//     const amount = Math.round(num(req.body.amount) * 100);
//     const vendorId = clean(req.body.vendorId);
//     const customerId = clean(req.body.customerId);
//     const paymentMethodId = clean(req.body.paymentMethodId);

//     if (!amount || !vendorId || !customerId || !paymentMethodId) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields"
//       });
//     }

//     const vendorSnap = await db.collection("Users").doc(vendorId).get();
//     if (!vendorSnap.exists) {
//       return res.status(404).json({
//         success: false,
//         error: "Vendor not found"
//       });
//     }

//     const { stripeAccountID } = vendorSnap.data();
//     if (!stripeAccountID) {
//       return res.status(400).json({
//         success: false,
//         error: "Vendor missing Stripe account"
//       });
//     }

//     const info = await determinePayoutCurrency(stripe, stripeAccountID, amount);

//     const reserveAmount = Math.round(amount * 0.05);

//     await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: info.transferCurrency,
//       customer: customerId,
//       payment_method: paymentMethodId,
//       confirm: true,
//       application_fee_amount: reserveAmount,
//       transfer_data: {
//         destination: stripeAccountID
//       },
//       metadata: {
//         vendorId,
//         reserveAmount
//       }
//     });

//     log("✅ PaymentIntent created:", paymentIntent.id);

//     return res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id
//     });

//   } catch (err) {
//     console.error("❌ Error creating PaymentIntent:", err);
//     return res.status(500).json({
//       success: false,
//       error: "Error creating payment"
//     });
//   }
// });

export async function saveLastVaultVisit(userId) {
  const ref = db.collection("Users").doc(userId);
  const increment = (n = 1) => ({ integerIncrement: n });
  const payload = {
    TPWallet: {
      lastVaultVisit: PulseRealm.PulseNOW,
      vaultVisitCount: increment(1)
    }
  };

  await ref.set(payload, { merge: true });

  // CHANGES log
  await db.collection("CHANGES").add({
    type: "vaultVisit",
    uid: userId,
    payload,
    reason: "vaultVisit",
    actor: "user",
    source: "app",
    createdAt: PulseRealm.PulseNOW
  });

  // IdentityHistory snapshot
  await db
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

  // VaultHistory entry
  await db
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

export const saveLoyaltyEndpoint = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    const { userId, loyalty } = req.body;

    await saveLoyalty(userId, loyalty);

    res.json({ success: true });
  }
);

export const saveLastVaultVisitEndpoint = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    const { userId } = req.body;

    await saveLastVaultVisit(userId);

    res.json({ success: true });
  }
);

export async function logVaultConversation(userId, sessionId, role, message) {
  await db
    .collection("VaultHistory")
    .doc(userId)
    .collection("sessions")
    .doc(sessionId)
    .collection("entries")
    .add({
      role,       // "user" or "vault"
      message,    // short text
      createdAt: PulseRealm.PulseNOW
    });
}


// -----------------------------
// HELPER: SAFE FETCH JSON
// -----------------------------
async function safeFetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "TropicPulse/1.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
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
    log("Trying PLACES search:", query);

    const results = await searchPlacesText(query, apiKey);
    if (!results || results.length === 0) continue;

    log("RAW PLACES RESULTS:", JSON.stringify(results, null, 2));

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

      log("CLOSEST PLACES MATCH:", closest.displayName.text, "DIST:", closestDist);

      // Allow up to 2km drift because many business coords are inaccurate
      if (closest && closestDist <= 2000) {
        business = closest;
      } else {
        log("⚠️ No PLACES candidate within distance threshold (", closestDist, "m )");

        // Still accept the closest match if it's under 3km
        if (closest && closestDist <= 3000) {
          log("⚠️ Accepting fallback PLACES match despite distance");
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
        log("FINAL PLACE ID (after canonical resolve):", finalPlaceId);
      }
    } catch (err) {
      log("Canonical resolver failed:", err.message);
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
    log("Trying GEOCODE:", query);

    const geo = await geocodeAddress(query, apiKey);
    if (!geo) continue;

    log("GEOCODE success:", JSON.stringify(geo, null, 2));

    if (knownLat && knownLng) {
      const lat = geo.geometry.location.lat;
      const lng = geo.geometry.location.lng;

      const dist = haversine(knownLat, knownLng, lat, lng);
      log("GEOCODE DISTANCE:", dist, "meters");

      if (dist > 150) {
        log("⚠️ GEOCODE also too far — using fallback coords");
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
    log("⚠️ FINAL FALLBACK: using known coordinates only");
    return {
      formatted_address: venue,
      geometry: { location: { lat: knownLat, lng: knownLng } },
      place_id: null
    };
  }

  return null;
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


function parseSMSBoolean(value) {
  if (!value) return false;
  const v = String(value).toLowerCase().trim();
  return v === "i agree to receive sms!" || v === "true" || v === "1";
}

function receiveCommunication(raw) {
  if (!raw || typeof raw !== "string") {
    log("❌ No Value Found - Run Test from");
    return { receiveSMS: false, receiveMassEmails: false };
  }

  const cleaned = raw
    .split(",")
    .map(x => x.trim().toLowerCase())
    .filter(Boolean);

  const receiveSMS = cleaned.some(x => x.includes("sms"));
  const receiveMassEmails = cleaned.some(x =>
    x.includes("mass email") ||
    x.includes("mass-email") ||
    x.includes("mass_emails") ||
    x.includes("massemails")
  );

  return { receiveSMS, receiveMassEmails };
}
async function parseIncomingRequest(req) {
  log("🔵 [parseIncomingRequest] START");

  let payload = {};
  let email = null;
  let emailType = null;
  let logId = null;

  // -----------------------------
  // Helpers
  // -----------------------------
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

  const clean = (v) => (isGarbage(v) ? null : String(v).trim());
  const soft = (v, fb = null) => (v == null ? fb : String(v).trim() || fb);
  const temp = (v, fb = null) => (v == null ? fb : String(v).trim());

  // -----------------------------
  // 1️⃣ BODY JSON
  // -----------------------------
  if (req.method === "POST" && req.body && typeof req.body === "object") {
    payload = req.body;
    email = payload.email || null;
    emailType = payload.emailType || payload.type || null;
    logId = payload.logId || null;

  } else {
    // -----------------------------
    // 2️⃣ RAW BODY
    // -----------------------------
    const rawBody = extractRawBody(req).trim();

    if (!rawBody.startsWith("{") && (rawBody.includes(",") || rawBody.includes("|"))) {
      const parts = rawBody.includes("|")
        ? rawBody.split("|").map(s => s.trim())
        : rawBody.split(",").map(s => s.trim());

      email = parts[0] || null;
      emailType = parts[1] || null;
      logId = parts[2] || null;

    } else if (rawBody.startsWith("{")) {
      try {
        payload = JSON.parse(rawBody);
      } catch {
        payload = {};
      }

      email = payload.email || null;
      emailType = payload.emailType || payload.type || null;
      logId = payload.logId || null;
    }
  }

  // -----------------------------
  // 3️⃣ MERGE QUERY PARAMS
  // -----------------------------
  const merged = { ...payload, ...req.query };

  // -----------------------------
  // 4️⃣ CLEAN CORE FIELDS
  // -----------------------------
  email = temp(merged.email || email, null);
  emailType = temp(merged.emailType || merged.type || emailType, "newUser");
  logId = temp(merged.logId || logId, null);

  // -----------------------------
  // 5️⃣ AUTO-GENERATE logId
  // -----------------------------
  if (!logId) {
    logId = db.collection("EmailLogs").doc().id;
  }

  // -----------------------------
  // 6️⃣ FLOW DETECTION
  // -----------------------------
  const rawType = (merged.type || "").toLowerCase();
  const rawFunction = (merged.function || "").toLowerCase();
  const rawEmailType = (emailType || "").toLowerCase();

  const isUserFlow =
    rawType === "users" ||
    rawEmailType === "users" ||
    rawFunction === "newuser" ||
    rawFunction === "userupdate";

  const cleanFn = isUserFlow ? clean : soft;

  email = cleanFn(email, null);
  emailType = cleanFn(emailType, "newUser");

  // -----------------------------
  // 7️⃣ EMAIL VALIDATION
  // -----------------------------
  const requiresEmail =
    rawType === "users" ||
    rawFunction === "sendemail" ||
    (rawEmailType && rawEmailType !== "newuser");

  if (requiresEmail && !email) {
    throw new Error("Missing Email");
  }

  if (email) {
    email = decodeURIComponent(email).trim().toLowerCase();
    if (!email.includes("@") || email.length < 5) {
      throw new Error("Invalid Email");
    }
  }

  if (emailType) {
    emailType = emailType.charAt(0).toLowerCase() + emailType.slice(1);
  }

  // -----------------------------
  // 8️⃣ BUILD NEW-SCHEMA PAYLOAD
  // -----------------------------
  const finalPayload = {
    TPIdentity: {
      email,
      displayName: clean(merged.displayName),
      resendToken: clean(merged.resendToken)
    },

    TPNotifications: {
      receiveSMS:
        merged.receiveSMS === true ||
        merged.receiveSMS === "true" ||
        merged.receiveSMS === 1,

      receiveMassEmails:
        merged.receiveMassEmails === true ||
        merged.receiveMassEmails === "true" ||
        merged.receiveMassEmails === 1
    },

    TPWallet: {
      payFrequency: clean(merged.payFrequency),
      payDay: clean(merged.payDay)
    },

    TPLoyalty: {
      pointsBalance: Number(merged.pointsBalance || merged.points || 0)
    },

    meta: {
      type: clean(rawType),
      function: clean(rawFunction),
      logId
    }
  };

  log("✅ FINAL PARSED:", { email, emailType, logId, payload: finalPayload });

  return { email, emailType, logId, payload: finalPayload };
}

function calculateReleaseDate(deliveredAt, delayDays = 3) {
  try {
    if (!deliveredAt) return null;

    // Normalize input to a JS Date
    let date;

    // Firestore Timestamp (your runtime handles this)
    if (typeof deliveredAt.toDate === "function") {
      date = deliveredAt.toDate();
    } else {
      date = new Date(deliveredAt);
    }

    if (isNaN(date.getTime())) return null;

    // Add delay
    date.setDate(date.getDate() + delayDays);

    // Return ISO string (your runtime standard)
    return date.toISOString();
  } catch (err) {
    log("❌ calculateReleaseDate error:", err.message);
    return null;
  }
}


function safeDate(value) {
  if (!value) return null;

  // Firestore Timestamp
  if (typeof value.toDate === "function") {
    try {
      return value.toDate().toISOString();
    } catch {
      return null;
    }
  }

  // Firestore raw timestamp {seconds, nanoseconds} or {_seconds, _nanoseconds}
  if (typeof value === "object") {
    const sec = value.seconds ?? value._seconds;
    if (typeof sec === "number") {
      try {
        return new Date(sec * 1000).toISOString();
      } catch {
        return null;
      }
    }
  }

  // ISO string, millis, or JS Date
  try {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d.toISOString();
  } catch {
    return null;
  }
}

/* ===================================================================
   STRIPE FUNCTION TO ALLOW BELIZE BANKS BY DISABLING INSTANT PAYOUTS
=================================================================== */
/* ===================================================================
   STRIPE FUNCTION TO ALLOW BELIZE BANKS BY DISABLING INSTANT PAYOUTS
=================================================================== */
async function configurePayoutSettings(stripe, accountId, payFrequency, payDay) {
  log("🔵 [configurePayoutSettings] START");

  const cleanLower = (v, fallback = null) => {
    if (!v) return fallback;
    const s = String(v).trim().toLowerCase();
    if (
      s === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    ) return fallback;
    return s;
  };

  try {
    // Normalize inputs
    payFrequency = cleanLower(payFrequency, "daily");
    payDay = cleanLower(payDay, "monday");

    const allowedFreq = ["daily", "weekly"];
    if (!allowedFreq.includes(payFrequency)) payFrequency = "daily";

    const allowedDays = ["monday","tuesday","wednesday","thursday","friday"];
    if (payFrequency === "weekly" && !allowedDays.includes(payDay)) {
      payDay = "monday";
    }

    // Fetch Stripe account
    const account = await stripe.accounts.retrieve(accountId);

    // -----------------------------
    // NEW SCHEMA LOOKUP (CORRECT)
    // -----------------------------
    const snap = await db
      .collection("Users")
      .where("TPIdentity.stripeAccountID", "==", accountId)
      .limit(1)
      .get();

    if (snap.empty) {
      throw new Error("Missing user for Stripe account");
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const userData = userDoc.data() || {};

    // -----------------------------
    // COUNTRY (NEW SCHEMA)
    // -----------------------------
    const country = normalizeCountry(
      account.country ??
      userData.TPIdentity.country ??
      "BZ"
    );

    // Instant payout rules
    const instantPayoutSupportedCountries = ["US", "GB", "CA", "AU"];

    // Build payout schedule
    const schedule = { interval: payFrequency };
    if (payFrequency === "weekly") {
      schedule.weekly_anchor = payDay;
    }

    const payoutSettings = {
      settings: {
        payouts: {
          schedule,
          ...(instantPayoutSupportedCountries.includes(country)
            ? {}
            : { debit_negative_balances: false })
        }
      }
    };

    // Update Stripe
    await stripe.accounts.update(accountId, payoutSettings);

    const now = PulseRealm.PulseNOW;

    // -----------------------------
    // FIRESTORE UPDATE (NEW SCHEMA)
    // -----------------------------
    await userRef.set(
      {
        TPIdentity: {
          ...userData.TPIdentity,
          country,
          updatedAt: now
        },
        TPWallet: {
          ...userData.TPWallet,
          payouts: {
            frequency: payFrequency,
            day: payDay,
            updatedAt: now
          },
          updatedAt: now
        }
      },
      { merge: true }
    );

    log("✅ [configurePayoutSettings] COMPLETE");

    return {
      country,
      instantPayoutsEnabled: instantPayoutSupportedCountries.includes(country)
    };

  } catch (err) {
    console.error("❌ configurePayoutSettings error:", err.message);
    throw err;
  }
}

// -------------------- Helper: fetchBuffer + computeHash (no top-level imports) --------------------
async function fetchBuffer(url) {
  try {
    const resp = await fetch(url, { redirect: "follow" });
    const status = resp.status;
    if (!resp.ok) return { ok: false, status, error: `HTTP ${status}` };
    const contentType = resp.headers.get("content-type") || "";
    const arrayBuf = await resp.arrayBuffer();
    // Ensure we create a Node Buffer from the ArrayBuffer correctly
    const buffer = Buffer.from(arrayBuf);
    return { ok: true, buffer, contentType, status };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function computeSha256Hex(buffer) {
  
  try {
    if (PulseRealm.crypto && PulseRealm.crypto.subtle && typeof PulseRealm.crypto.subtle.digest === "function") {
      // crypto.subtle.digest expects an ArrayBuffer
      let ab;
      if (buffer instanceof ArrayBuffer) {
        ab = buffer;
      } else if (ArrayBuffer.isView(buffer)) {
        // Buffer, Uint8Array, etc.
        ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else {
        // fallback: try to convert
        ab = Buffer.from(buffer).buffer;
      }
      const hashBuf = await PulseRealm.crypto.subtle.digest("SHA-256", ab);
      const hashArr = Array.from(new Uint8Array(hashBuf));
      return hashArr.map(b => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) {
    // fall through to require fallback
  }

  // Fallback to Node's crypto via dynamic require (avoids top-level imports)
  try {
    
    // If buffer is an ArrayBuffer view, convert to Buffer
    const nodeBuf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    return crypto.createHash("sha256").update(nodeBuf).digest("hex");
  } catch (err) {
    console.warn("⚠️ computeSha256Hex fallback failed:", err);
    return null;
  }
}

// // -------------------- migrateImageToFirebase (upgraded, same return type) --------------------
// async function migrateImageToFirebase(appypieUrl, type = "images") {
//   const IMAGEURL = PulseRealm.PLACEHOLDER_IMAGE_URL;

//   try {
//     if (!appypieUrl || typeof appypieUrl !== "string") {
//       console.warn("⚠️ Invalid image URL:", appypieUrl);
//       return IMAGEURL;
//     }

//     // Determine folder based on type
//     let folder = "images";
//     if (type === "events") folder = "events";

//     const fetched = await fetchBuffer(appypieUrl);
//     if (!fetched.ok) {
//       console.warn("⚠️ Image failed to load:", appypieUrl, fetched.error || fetched.status);
//       return IMAGEURL;
//     }

//     const { buffer, contentType } = fetched;

//     // Must be an image
//     if (!contentType || !contentType.startsWith("image/")) {
//       console.warn("⚠️ Non-image content:", appypieUrl, contentType);
//       return IMAGEURL;
//     }

//     // Determine extension safely
//     let ext = "jpg";
//     if (contentType.includes("png")) ext = "png";
//     else if (contentType.includes("webp")) ext = "webp";
//     else if (contentType.includes("gif")) ext = "gif";
//     else if (contentType.includes("svg")) ext = "svg";

//     // Reject empty or tiny images
//     if (!buffer || buffer.length < 500) {
//       console.warn("⚠️ Image too small or corrupted:", appypieUrl);
//       return IMAGEURL;
//     }

//     // Detect HTML disguised as image (robust TextDecoder approach)
//     let head = "";
//     try {
//       const sample = buffer.subarray(0, Math.min(buffer.length, 200));
//       // TextDecoder is available in Node 18+ runtimes
//       head = new TextDecoder("utf-8", { fatal: false }).decode(sample).toLowerCase();
//     } catch (e) {
//       try {
//         head = buffer.slice(0, 200).toString("utf8").toLowerCase();
//       } catch (e2) {
//         head = "";
//       }
//     }

//     if (head.includes("<html") || head.includes("<!doctype html")) {
//       console.warn("⚠️ HTML returned instead of image:", appypieUrl);
//       return IMAGEURL;
//     }

//     // Reject huge images (optional)
//     if (buffer.length > 8 * 1024 * 1024) { // 8MB
//       console.warn("⚠️ Image too large:", appypieUrl);
//       return IMAGEURL;
//     }

//     // Compute hash (for audit/verification later)
//     let computedHash = null;
//     try {
//       computedHash = await computeSha256Hex(buffer);
//     } catch (e) {
//       console.warn("⚠️ Hash compute failed for", appypieUrl, e);
//     }

//     // Dynamic folder based on type
//     const filename = `${folder}/${uuidv4()}.${ext}`;
//     const bucket = admin.storage().bucket();

//     // Save file and attach hash as metadata if possible
//     const saveOptions = {
//       contentType,
//       public: true
//     };
//     if (computedHash) {
//       // Attach under metadata.metadata.sha256 so it is accessible via file metadata
//       saveOptions.metadata = { metadata: { sha256: computedHash } };
//     }

//     await bucket.file(filename).save(buffer, saveOptions);

//     // Return public URL (same behavior as before)
//     return `https://storage.googleapis.com/${bucket.name}/${filename}`;
//   } catch (err) {
//     console.error("❌ Image migration failed:", err);
//     return IMAGEURL;
//   }
// }
// Gen2 Cloud Functions (JavaScript, export const style)
// Assumes `admin`, `db`, `fetchBuffer`, `computeSha256Hex`, `migrateImageToFirebase`, and `onRequest`
// (from "firebase-functions/v2/https") are available in the same file/environment.

// export const getImageHash = onRequest(async (req, res) => {
//   // CORS
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Headers", "*");
//   res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   if (req.method === "OPTIONS") return res.status(204).send("");

//   try {
//     if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
//     const { url } = req.body || {};
//     if (!url) return res.status(400).json({ ok: false, error: "Missing url" });

//     const fetched = await fetchBuffer(url);
//     if (!fetched.ok) return res.status(400).json({ ok: false, error: `Fetch failed: ${fetched.error || fetched.status}` });

//     if (fetched.contentType && !fetched.contentType.startsWith("image/")) {
//       return res.status(400).json({ ok: false, error: "URL is not an image" });
//     }

//     const hash = await computeSha256Hex(fetched.buffer);
//     return res.json({ ok: true, hash });
//   } catch (err) {
//     console.error("getImageHash failed:", err);
//     return res.status(500).json({ ok: false, error: String(err) });
//   }
// });

// export const moveDuplicateBack = onRequest(async (req, res) => {
//   // CORS
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Headers", "*");
//   res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   if (req.method === "OPTIONS") return res.status(204).send("");

//   try {
//     if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
//     const { url, businessId, originalUrl } = req.body || {};
//     if (!url || !businessId || !originalUrl) return res.status(400).json({ ok: false, error: "Missing url, businessId, or originalUrl" });

//     const bucket = admin.storage().bucket();
//     const bucketHost = `https://storage.googleapis.com/`;

//     // Attempt to delete migrated file if it's in our bucket
//     try {
//       if (typeof url === "string" && url.startsWith(bucketHost)) {
//         const parts = url.replace(bucketHost, "").split("/");
//         const bucketName = parts.shift();
//         const filePath = parts.join("/");
//         if (bucketName === bucket.name) {
//           const file = bucket.file(filePath);
//           const [exists] = await file.exists();
//           if (exists) {
//             await file.delete();
//           }
//         }
//       }
//     } catch (err) {
//       console.warn("moveDuplicateBack: delete failed:", err);
//       // continue — deletion failure shouldn't block DB updates
//     }

//     // Restore originalUrl into Business doc images array and possibly mainPhotoURL
//     const bizRef = db.collection("Businesses").doc(businessId);
//     const bizSnap = await bizRef.get();
//     if (!bizSnap.exists) {
//       return res.status(404).json({ ok: false, error: "Business not found" });
//     }
//     const bizData = bizSnap.data() || {};

//     const currentImages = Array.isArray(bizData.images) ? bizData.images.slice() : [];
//     if (!currentImages.includes(originalUrl)) currentImages.unshift(originalUrl);

//     const finalMain = bizData.mainPhotoURL || originalUrl;

//     await bizRef.set({
//       images: currentImages,
//       mainPhotoURL: finalMain,
//       duplicateCount: admin.firestore.FieldValue.increment(-1),
//       lastDuplicateRemovedAt: PulseRealm.PulseNOW
//     }, { merge: true });

//     // Mark DuplicateImages docs for this business and migratedURL as rolledBack
//     const dupQuery = db.collection("DuplicateImages")
//       .where("businessId", "==", businessId)
//       .where("migratedURL", "==", url);

//     const dupSnap = await dupQuery.get();
//     const batch = db.batch();
//     dupSnap.forEach(doc => {
//       batch.update(doc.ref, {
//         rolledBack: true,
//         rolledBackAt: PulseRealm.PulseNOW,
//         rolledBackBy: "moveDuplicateBack"
//       });
//     });
//     await batch.commit();

//     return res.json({ ok: true, message: "Rollback attempted; business updated; duplicate docs marked." });
//   } catch (err) {
//     console.error("moveDuplicateBack failed:", err);
//     return res.status(500).json({ ok: false, error: String(err) });
//   }
// });

// export const dedupeAndMigrateBusinessImages = onRequest(async (req, res) => {
//   // CORS
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Headers", "*");
//   res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   if (req.method === "OPTIONS") return res.status(204).send("");

//   try {
//     if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

//     const { id, type = "images" } = req.body || {};
//     if (!id) return res.status(400).json({ ok: false, error: "Missing id" });

//     const ref = db.collection("Businesses").doc(id);
//     const snap = await ref.get();
//     if (!snap.exists) return res.json({ ok: false, error: "Business not found", id });

//     const data = snap.data() || {};
//     const logs = [];

//     const PLACEHOLDER = typeof PLACEHOLDER_IMAGE_URL !== "undefined"
//       ? PLACEHOLDER_IMAGE_URL
//       : PulseRealm.PLACEHOLDER_IMAGE_URL || null;

//     // Collect candidate URLs
//     const urls = [];
//     if (data.mainPhotoURL) urls.push({ url: data.mainPhotoURL, field: "mainPhotoURL" });
//     if (Array.isArray(data.images)) data.images.forEach(u => urls.push({ url: u, field: "images" }));

//     // Extract timestamp (support underscore or dash)
//     const extractTimestamp = url => {
//       if (!url || typeof url !== "string") return null;
//       const match = url.match(/service[_-](\d+)[_-]/);
//       return match ? parseInt(match[1], 10) : null;
//     };

//     const items = urls
//       .map(item => ({ url: item.url, field: item.field, ts: extractTimestamp(item.url) }))
//       .filter(x => x.ts !== null)
//       .sort((a, b) => a.ts - b.ts);

//     // Group by proximity
//     const groups = [];
//     let current = [];
//     for (let i = 0; i < items.length; i++) {
//       if (current.length === 0) { current.push(items[i]); continue; }
//       const last = current[current.length - 1];
//       if (Math.abs(items[i].ts - last.ts) <= 50) current.push(items[i]);
//       else { groups.push(current); current = [items[i]]; }
//     }
//     if (current.length > 0) groups.push(current);

//     // Prepare outputs
//     const kept = [];
//     const migratedKept = [];
//     const keptHashes = [];
//     const duplicates = [];
//     const duplicatesMeta = [];

//     // Work on a copy of images to avoid accidental emptying
//     const finalImages = Array.isArray(data.images) ? data.images.slice() : [];
//     let removedCount = 0;

//     for (const group of groups) {
//       const keepItem = group[0];
//       const keepUrl = keepItem.url;
//       kept.push(keepUrl);

//       // Safety: if group has only one image, do not remove it; just attempt migration
//       if (group.length === 1) {
//         logs.push(`   ⚠️ Single-image group; skipping removal for ${keepUrl}`);
//         let migratedKeepUrl = keepUrl;
//         try {
//           const migrated = await migrateImageToFirebase(keepUrl, type);
//           if (migrated && migrated !== PLACEHOLDER) migratedKeepUrl = migrated;
//         } catch (err) {
//           logs.push(`   ⚠️ Failed to migrate single kept image ${keepUrl}: ${String(err)}`);
//         }
//         migratedKept.push(migratedKeepUrl);
//         keptHashes.push(null);
//         continue;
//       }

//       // Compute kept hash
//       let keptHash = null;
//       try {
//         const fetched = await fetchBuffer(keepUrl);
//         if (fetched.ok && fetched.buffer) keptHash = await computeSha256Hex(fetched.buffer);
//         else logs.push(`   ⚠️ Could not fetch kept original for hashing: ${keepUrl}`);
//       } catch (err) {
//         logs.push(`   ⚠️ Error hashing kept original ${keepUrl}: ${String(err)}`);
//       }
//       keptHashes.push(keptHash);

//       // Migrate kept
//       let migratedKeepUrl = keepUrl;
//       try {
//         const migrated = await migrateImageToFirebase(keepUrl, type);
//         if (migrated && migrated !== PLACEHOLDER) migratedKeepUrl = migrated;
//       } catch (err) {
//         logs.push(`   ⚠️ Failed to migrate kept image ${keepUrl}: ${String(err)}`);
//       }
//       migratedKept.push(migratedKeepUrl);

//       // Duplicates are rest of group
//       const dups = group.slice(1).map(x => ({ url: x.url, field: x.field }));
//       dups.forEach(d => duplicates.push(d.url));

//       for (const dup of dups) {
//         let migratedDupUrl = dup.url;
//         let dupHash = null;
//         let migratedDupHash = null;
//         let verificationPassed = false;

//         // Compute original duplicate hash
//         try {
//           const fetchedDup = await fetchBuffer(dup.url);
//           if (fetchedDup.ok && fetchedDup.buffer) dupHash = await computeSha256Hex(fetchedDup.buffer);
//           else logs.push(`   ⚠️ Could not fetch duplicate for hashing: ${dup.url}`);
//         } catch (err) {
//           logs.push(`   ⚠️ Error hashing duplicate ${dup.url}: ${String(err)}`);
//         }

//         // Migrate duplicate
//         try {
//           const migrated = await migrateImageToFirebase(dup.url, type);
//           if (migrated && migrated !== PLACEHOLDER) {
//             migratedDupUrl = migrated;
//             try {
//               const fetchedMigratedDup = await fetchBuffer(migratedDupUrl);
//               if (fetchedMigratedDup.ok && fetchedMigratedDup.buffer) migratedDupHash = await computeSha256Hex(fetchedMigratedDup.buffer);
//             } catch (e) {
//               logs.push(`   ⚠️ Could not hash migrated duplicate ${migratedDupUrl}: ${String(e)}`);
//             }
//           } else {
//             logs.push(`   ⚠️ Duplicate migration returned placeholder or failed for ${dup.url}`);
//           }
//         } catch (err) {
//           logs.push(`   ⚠️ Failed to migrate duplicate ${dup.url}: ${String(err)}`);
//         }

//         // Verification: prefer migratedDupHash vs kept migrated hash, else original hashes
//         let leftHash = migratedDupHash || dupHash || null;
//         let rightHash = null;
//         try {
//           const fetchedKeptMigrated = await fetchBuffer(migratedKeepUrl);
//           if (fetchedKeptMigrated.ok && fetchedKeptMigrated.buffer) rightHash = await computeSha256Hex(fetchedKeptMigrated.buffer);
//         } catch (e) { /* ignore */ }
//         if (!rightHash) rightHash = keptHash;

//         if (!leftHash || !rightHash) {
//           logs.push(`   ⚠️ Missing hash for strict verification of duplicate ${dup.url}; skipping removal`);
//         } else {
//           if (leftHash === rightHash) {
//             verificationPassed = true;
//             logs.push(`   ✅ Verification passed for duplicate ${dup.url}`);
//           } else {
//             logs.push(`   ❗ Verification FAILED for duplicate ${dup.url}`);
//           }
//         }

//         // Write audit doc
//         const dupDoc = {
//           businessId: id,
//           originalField: dup.field,
//           originalURL: dup.url,
//           originalHash: dupHash || null,
//           keptOriginalURL: keepUrl,
//           keptOriginalHash: keptHash || null,
//           keptMigratedURL: migratedKeepUrl,
//           keptMigratedHash: null,
//           migratedURL: migratedDupUrl,
//           migratedHash: migratedDupHash || null,
//           type,
//           removedAt: PulseRealm.PulseNOW,
//           removedBy: "dedupeAndMigrateBusinessImages",
//           reason: "timestamp-duplicate",
//           rolledBack: false,
//           verificationPassed: verificationPassed
//         };

//         try {
//           await db.collection("DuplicateImages").add(dupDoc);
//         } catch (err) {
//           logs.push(`   ⚠️ Failed to write duplicate audit for ${dup.url}: ${String(err)}`);
//         }

//         // If verified, remove duplicate from finalImages (safeguard: never leave images empty)
//         if (verificationPassed) {
//           const occurrences = finalImages.filter(u => u === dup.url).length;
//           if (finalImages.length <= 1 && occurrences > 0) {
//             logs.push(`   ⚠️ Not removing ${dup.url} because business would be left with no images.`);
//           } else {
//             for (let i = finalImages.length - 1; i >= 0; i--) {
//               if (finalImages[i] === dup.url) {
//                 finalImages.splice(i, 1);
//                 removedCount++;
//               }
//             }
//             // ensure kept migrated present
//             const keptIndex = finalImages.indexOf(keepUrl);
//             if (keptIndex !== -1) {
//               if (migratedKeepUrl && migratedKeepUrl !== PLACEHOLDER) finalImages[keptIndex] = migratedKeepUrl;
//             } else {
//               if (migratedKeepUrl && migratedKeepUrl !== PLACEHOLDER && !finalImages.includes(migratedKeepUrl)) finalImages.unshift(migratedKeepUrl);
//             }
//           }
//         }

//         duplicatesMeta.push({
//           originalURL: dup.url,
//           originalField: dup.field,
//           originalHash: dupHash || null,
//           migratedURL: migratedDupUrl,
//           migratedHash: migratedDupHash || null,
//           keptOriginalURL: keepUrl,
//           keptOriginalHash: keptHash || null,
//           keptMigratedURL: migratedKeepUrl,
//           keptMigratedHash: null,
//           verificationPassed
//         });
//       } // end duplicates loop

//       if (group.length > 1) {
//         logs.push(`Group processed: kept ${keepUrl}, considered ${group.length - 1} duplicates`);
//       }
//     } // end groups loop

//     // Compute migratedKept best-effort
//     const computedMigratedKept = [];
//     for (let i = 0; i < kept.length; i++) {
//       const k = kept[i];
//       const metaForKept = duplicatesMeta.find(m => m.keptOriginalURL === k);
//       if (metaForKept && metaForKept.keptMigratedURL) computedMigratedKept.push(metaForKept.keptMigratedURL);
//       else {
//         const replaced = finalImages.find(u => u !== k && (u.includes('/images/') || u.includes('/events/')));
//         computedMigratedKept.push(replaced || k);
//       }
//     }

//     // Final main photo
//     const finalMain = (finalImages.length > 0 ? finalImages[0] : (data.mainPhotoURL || null));

//     // Update business doc
//     await ref.set({
//       images: finalImages,
//       mainPhotoURL: finalMain,
//       duplicateCount: removedCount > 0 ? admin.firestore.FieldValue.increment(removedCount) : data.duplicateCount || 0,
//       lastDuplicateRemovedAt: removedCount > 0 ? PulseRealm.PulseNOW : data.lastDuplicateRemovedAt || null
//     }, { merge: true });

//     return res.json({
//       ok: true,
//       id,
//       type,
//       kept,
//       keptHashes,
//       migratedKept: computedMigratedKept,
//       duplicates,
//       duplicatesMeta,
//       logs
//     });
//   } catch (err) {
//     console.error("❌ dedupeAndMigrateBusinessImages failed:", err);
//     return res.status(500).json({ ok: false, error: String(err) });
//   }
// });

// // -------------------- listBusinessesForImageMigration (unchanged but included for completeness) --------------------
// export const listBusinessesForImageMigration = onRequest(
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "*");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//     try {
//       const snap = await db.collection("Businesses").get();
//       const docs = snap.docs.map(d => ({
//         id: d.id,
//         name: d.get("busname") || d.get("name") || "(no name)"
//       }));

//       res.json({ ok: true, businesses: docs });
//     } catch (err) {
//       console.error("❌ listBusinessesForImageMigration failed:", err);
//       res.status(500).json({ ok: false, error: String(err) });
//     }
//   }
// );

// Reusable email sender WITH EMAIL LOGGING
async function sendEmailToUser(email, emailType, payload = {}) {
  log("🔵 [sendEmailToUser] START");

  const normalizeEmail = (v) =>
    typeof v === "string" ? v.trim().toLowerCase() : null;

  const clean = (v) => {
    if (v === undefined || v === null) return null;
    const s = String(v).trim();
    return s === "" ? null : s;
  };

  try {
    // -----------------------------
    // Normalize + validate email
    // -----------------------------
    email = normalizeEmail(clean(email));
    if (!email) {
      return { success: false, error: "Invalid email" };
    }

    // -----------------------------
    // Validate emailType
    // -----------------------------
    if (!emailType || !emailTemplates[emailType]) {
      return { success: false, error: `Unknown emailType: ${emailType}` };
    }

    // -----------------------------
    // Lookup user (NEW SCHEMA)
    // -----------------------------
    const snap = await db
      .collection("Users")
      .where("TPIdentity.email", "==", email)
      .limit(1)
      .get();

    if (snap.empty) {
      return { success: false, error: `User not found: ${email}` };
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const user = userDoc.data() || {};
    const userID = userDoc.id;

    // -----------------------------
    // Opt-out (NEW SCHEMA)
    // -----------------------------
    if (user.TPNotifications.receiveMassEmails === false) {
      return { success: false, error: "User opted out" };
    }

    // -----------------------------
    // Cooldown (NEW SCHEMA)
    // -----------------------------
    const lastSent = user.TPNotifications.lastEmailSentAt.toMillis() || 0;
    const nowMs = PulseRealm.PulseNOW.toMillis();

    if (nowMs - lastSent < 60000) {
      return { success: true, skipped: true };
    }

    // -----------------------------
    // Build payload (NEW SCHEMA)
    // -----------------------------
    const name =
      clean(user.TPIdentity.displayName) ||
      clean(user.TPIdentity.name) ||
      "Friend";

    const resendToken = clean(user.TPIdentity.resendToken);

    const unsubscribeUrl = resendToken
      ? `https://www.pulseworld.net/unsubscribe?token=${encodeURIComponent(
          resendToken
        )}`
      : `https://www.pulseworld.net/unsubscribe`;

    const finalPayload = {
      ...payload,
      name,
      userID,
      adminUser: "Automate",
      unsubscribeUrl,
      logId: payload.logId || null
    };

    // -----------------------------
    // Render template
    // -----------------------------
    const template = emailTemplates[emailType];

    let html, subject;
    try {
      html = template.html(finalPayload);
      subject =
        typeof template.subject === "function"
          ? template.subject(finalPayload)
          : template.subject;
    } catch (err) {
      return {
        success: false,
        error: "Template rendering error: " + err.message
      };
    }

    const finalHeaders =
      template.headers ||
      (template.important
        ? {
            "X-Priority": "1",
            "X-MSMail-Priority": "High",
            Importance: "high"
          }
        : {});

    
    await createEmailTransport.sendMail({
      from: `"Pulse World" <Sales@pulseworld.net>`,
      to: email,
      bcc: "FordFamilyDelivery@gmail.com",
      subject,
      html,
      headers: finalHeaders
    });

    // -----------------------------
    // Update user (NEW SCHEMA)
    // -----------------------------
    await userRef.update({
      "TPNotifications.lastEmailSentAt":
        PulseRealm.PulseNOW
    });

    // -----------------------------
    // Log email
    // -----------------------------
    const ts = PulseRealm.PulseNOW;
    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: emailType,
      emailType,
      payload: finalPayload,
      html,
      subject,
      adminUser: "Automate",
      triggeredBy: "Automate",
      triggerSource: "sendEmailToUser",
      status: "Sent",
      name,
      createdAt: ts,
      timestamp: ts
    });

    await ref.update({ logId: ref.id });

    return { success: true };
  } catch (err) {
    console.error("❌ sendEmailToUser error:", err);
    return { success: false, error: err.message };
  }
}

async function sendPinEmail(email, pin, payload, emailPassword) {
  try {
    // Ensure purpose exists
    const purpose = payload.purpose || "login";

    const title =
      purpose === "emailChange"
        ? "Verify Your New Email Address"
        : "Your Pulse World Verification PIN";

    const subtitle =
      purpose === "emailChange"
        ? "Use the secure PIN below to confirm your new email address."
        : "Use the secure PIN below to verify your identity and continue logging in.";

    const html = `
    <div style="font-family: Arial, sans-serif; background:#f4f4f0; padding: 32px;">
      <div style="max-width: 480px; margin:auto; background:#ffffff; border-radius:16px; padding:28px; box-shadow:0 4px 14px rgba(0,0,0,0.08);">

        <div style="text-align:center; margin-bottom:20px;">
          <img src="./_EXPRESSIONS/_PEX/BUILD/
               alt="Pulse World"
               style="width:120px; border-radius:12px;">
        </div>

        <h2 style="color:#00a884; text-align:center; margin:0; font-size:24px;">
          ${title}
        </h2>

        <p style="font-size:16px; color:#333; line-height:1.6; text-align:center; margin-top:16px;">
          ${subtitle}
        </p>

        <div style="text-align:center; margin:28px 0;">
          <div style="background:#00a884; color:white; padding:14px 26px; border-radius:12px;
                      font-size:28px; letter-spacing:4px; display:inline-block;
                      box-shadow:0 6px 14px rgba(0,168,132,0.25);">
            ${pin}
          </div>
        </div>

        <p style="font-size:14px; color:#555; text-align:center; margin-top:10px;">
          This PIN expires in 5 minutes for your security.
        </p>

        <div style="height:1px; background:#e6e6e6; margin:24px 0;"></div>

        <p style="font-size:14px; color:#555; line-height:1.5; text-align:center;">
          If you didn’t request this PIN, you can safely ignore this email.
        </p>

        <div style="text-align:center; margin-top:20px;">
          <img src="./_EXPRESSIONS/_PEX/BUILD/
               alt="Toucan"
               style="width:110px;">
        </div>

        <p style="font-size:13px; color:#999; text-align:center; margin-top:10px;">
          © Pulse World — San Pedro, Belize
        </p>

      </div>
    </div>`;

    // Send email
    await createEmailTransport.sendMail({
      from: "Pulse World <AIOvermind@PulseWorld.Net>",
      to: email,
      bcc: "FordFamilyDelivery@Gmail.com",
      subject: title,
      html,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high"
      }
    });

    // -----------------------------
    // LOG EMAIL (schema‑safe)
    // -----------------------------
    const ts = PulseRealm.PulseNOW;

    payload.adminUser = "Automate";
    payload.createdAt = ts;
    payload.purpose = purpose;
    payload.expiresAt = payload.expiresAt || null;
    payload.pinMasked = `***${pin.slice(-2)}`;

    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: "sendPinEmail",
      emailType: purpose === "emailChange" ? "emailChangePin" : "sendPinEmail",
      payload,
      html,
      subject: title,
      adminUser: "Automate",
      triggeredBy: "Automate",
      triggerSource: "sendPinEmail",
      status: "Sent",
      createdAt: ts,
      timestamp: ts
    });

    await ref.update({ logId: ref.id });

    return { success: true };

  } catch (err) {
    console.error("sendPinEmail error:", err);
    return { success: false, error: err.message };
  }
}


function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}


function sanitizeEverything(input) {
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
function playfulClean(input) {
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

function BECLEAN(input) {
  return playfulClean(sanitizeEverything(input));
}

// ------------------------------------------------------
// Decide payout currency based on account + platform balance
// ------------------------------------------------------

export async function determinePayoutCurrency(stripe, stripeAccountID, payoutAmountCents) {
  log("🔵 [determinePayoutCurrency] START");

  const payoutAmountUSD = payoutAmountCents / 100;

  let account;
  try {
    account = await stripe.accounts.retrieve(stripeAccountID);
  } catch (err) {
    console.error("❌ Stripe account retrieval failed:", err.message);
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

export async function applyEnvironmentalMultipliers(envSettings, envState) {
  if (!envSettings.enabled) {
    return { totalMultiplier: 1, breakdown: [] };
  }

  const breakdown = [];
  let total = 1;

  const add = (label, value) => {
    if (typeof value !== "number" || isNaN(value)) return;
    breakdown.push({ label, value });
    total += value;
  };

  // -----------------------------
  // WEATHER
  // -----------------------------
  const w = envState.weather.data.current;
  if (w) {
    const temp = w.temperature_2m;
    const wind = w.wind_speed_10m;

    if (wind > 20) add("wind", envSettings.weather.wind);
    if (temp >= 30) add("heat", envSettings.weather.heat);
    if (temp <= 22) add("coldFront", envSettings.weather.coldFront);

    const perfect =
      temp >= 24 &&
      temp <= 30 &&
      wind < 15;

    if (perfect) add("perfectWeather", envSettings.weather.perfectWeather);
  }

  // -----------------------------
  // HEAT INDEX
  // -----------------------------
  const hi = envState.heatIndex.data.heatIndex;
  if (typeof hi === "number" && hi > 95) {
    add("heatIndex", envSettings.weather.heat);
  }

  // -----------------------------
  // STORMS
  // -----------------------------
  const storms = envState.storms.data.activeStorms ?? [];

  if (storms.length > 0) {
    const has = (str) =>
      storms.some(s => s.type.toLowerCase().includes(str));

    if (has("hurricane")) {
      add("hurricane", envSettings.storm.hurricane);
    } else if (has("storm")) {
      add("tropicalStorm", envSettings.storm.tropicalStorm);
    } else if (has("wave")) {
      add("tropicalWave", envSettings.storm.tropicalWave);
    }
  }

  // -----------------------------
  // SARGASSUM
  // -----------------------------
  const sarg = envState.sargassum.data.value;
  if (typeof sarg === "number") {
    const level =
      sarg > 0.7 ? "high" :
      sarg > 0.3 ? "moderate" :
      "low";

    add(`sargassum_${level}`, envSettings.sargassum[level]);
  }

  // -----------------------------
  // WAVES
  // -----------------------------
  const waveFt = envState.waves.data.heightFt[0];
  if (typeof waveFt === "number") {
    const seaState =
      waveFt > 6 ? "dangerous" :
      waveFt > 3 ? "rough" :
      waveFt > 1.5 ? "moderate" :
      "calm";

    add(`sea_${seaState}`, envSettings.sea[seaState]);
  }

  // -----------------------------
  // MOON
  // -----------------------------
  const moon = envState.moon.data.phase;
  if (typeof moon === "number") {
    const phase =
      moon >= 0.4 && moon <= 0.6 ? "full" :
      moon < 0.1 ? "new" :
      moon < 0.25 ? "waxing_crescent" :
      moon < 0.4 ? "first_quarter" :
      moon < 0.75 ? "waning_gibbous" :
      "waning_crescent";

    add(`moon_${phase}`, envSettings.moon[phase]);
  }

  // -----------------------------
  // CAP MULTIPLIER
  // -----------------------------
  const maxCap = envSettings.multipliers.maxTotalMultiplier || 3;
  const capped = Math.min(total, maxCap);

  return { totalMultiplier: capped, breakdown };
}

export const parseReminder = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 15,
    memory: "256MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      const text = req.body.text || "";
      if (!text.trim()) {
        return res.json({
          success: false,
          error: "Empty reminder text",
          parsed: null
        });
      }

      const parsed = parseReminderText(text);

      if (!parsed.trigger) {
        return res.json({
          success: false,
          error: "Unable to parse reminder",
          parsed: null
        });
      }

      return res.json({ success: true, parsed });

    } catch (err) {
      console.error("parseReminder error:", err);
      return res.json({
        success: false,
        error: "Server error: " + err.message,
        parsed: null
      });
    }
  }
);


// -----------------------------
// 2. ENVIRONMENTAL INSIGHTS
// -----------------------------
export async function generateEnvironmentalInsights(envSettings, envState) {
  if (!envSettings.enabled) return "";

  const insights = [];

  // WEATHER
  const w = envState.weather.data.current;
  if (w) {
    const temp = w.temperature_2m;
    const wind = w.wind_speed_10m;
    const code = w.weather_code;

    const skyMap = {
      0: "☀️ Clear skies over the island.",
      1: "🌤️ Mostly clear with soft sunlight.",
      2: "⛅ Partly cloudy with warm breezes.",
      3: "☁️ Overcast skies across the island.",
      45: "🌫️ Foggy patches this morning.",
      48: "🌫️ Dense fog in some areas.",
      51: "🌦️ Light drizzle passing through.",
      53: "🌦️ Drizzle around the island.",
      55: "🌧️ Heavy drizzle at times.",
      61: "🌧️ Light rain in the area.",
      63: "🌧️ Rain showers moving through.",
      65: "⛈️ Heavy rain in some spots.",
      80: "🌦️ Light showers nearby.",
      81: "🌧️ Scattered showers.",
      82: "⛈️ Heavy showers approaching."
    };

    insights.push(skyMap[code] ?? "🌤️ Typical island weather.");

    if (temp >= 30) insights.push("🔥 Warm day — stay hydrated.");
    if (temp <= 22) insights.push("❄️ Cooler breezes today.");
    if (wind > 20) insights.push("🍃 Strong winds — seas may stay lively.");
  }

  // WAVES
  const waveFt = envState.waves.data.heightFt[0];
  const dir = envState.waves.data.derived.friendlyDirection;

  if (typeof waveFt === "number") {
    if (waveFt > 6) insights.push("🌊 Rough seas — tours may be limited.");
    else if (waveFt > 3) insights.push("🌊 A bit of chop on the water.");
    else insights.push("🌊 Calm seas — lovely for snorkeling.");

    if (dir) insights.push(`🌬️ Swell rolling ${dir}.`);
  }

  // SARGASSUM
  const sarg = envState.sargassum.data.value;
  if (typeof sarg === "number") {
    if (sarg > 0.7) insights.push("🟤 Heavy sargassum drifting in.");
    else if (sarg > 0.3) insights.push("🌾 Moderate sargassum today.");
    else insights.push("🏖️ Low sargassum — beaches looking clear.");
  }

  // STORMS
  const storms = envState.storms.data.activeStorms ?? [];
  if (storms.length > 0) insights.push("⛈️ Tropical activity nearby — stay aware.");

  // MOON
  const moon = envState.moon.data.phase;
  if (typeof moon === "number" && moon >= 0.4 && moon <= 0.6) {
    insights.push("🌕 Full moon glow tonight — magical evenings ahead.");
  }

  // WILDLIFE (plural-normalized + icon fallback)
  const wildlife = envState.wildlife.data || {};

  const wildlifeIcons = {
    turtle: "🐢", dolphin: "🐬", manatee: "🦭",
    ray: "🐟", stingray: "🐟",
    shark: "🦈",
    iguana: "🦎",
    crab: "🦀",
    jellyfish: "🪼",
    crocodile: "🐊",
    fish: "🐠"
  };

  for (const [k, v] of Object.entries(wildlife)) {
    if (v === true) {
      const key = k.toLowerCase().replace(/s$/, ""); // normalize plural
      const icon = wildlifeIcons[key] ?? "✨";
      const label = k.charAt(0).toUpperCase() + k.slice(1);
      insights.push(`${icon} ${label} spotted recently.`);
    }
  }

  return insights.join("<br>");
}

// -----------------------------
// 3. SMART ENVIRONMENTAL ADVICE
// -----------------------------
export async function generateSmartEnvironmentalAdvice(envSettings, envState, intent) {
  if (!envSettings.enabled) return "";

  const tips = [];

  const beachIntents = ["beaches"];
  const tourIntents  = ["tours"];
  const eventIntents = ["events_today", "events_upcoming"];

  const waveFt = envState.waves.data.heightFt[0];
  const storms = envState.storms.data.activeStorms ?? [];
  const sarg = envState.sargassum.data.value;
  const w = envState.weather.data.current;
  const wildlife = envState.wildlife.data || {};

  // BEACH LOGIC
  if (beachIntents.includes(intent)) {
    if (waveFt > 3) {
      tips.push("💡 Seas are a bit lively — longer boat rides might feel bumpy.");
    }

    if (typeof sarg === "number") {
      if (sarg > 0.7) tips.push("💡 Some beaches may have heavy sargassum today.");
      else if (sarg > 0.3) tips.push("💡 A few patches of sargassum drifting around.");
    }
  }

  // TOUR LOGIC
  if (tourIntents.includes(intent)) {
    if (storms.length > 0) {
      tips.push("💡 Might be worth checking with tour operators — weather can shift plans.");
    }
  }

  // EVENT LOGIC
  if (eventIntents.includes(intent)) {
    if (w.temperature_2m >= 30) {
      tips.push("💡 Warm day ahead — outdoor events may feel extra hot, bring water.");
    }

    if (storms.length > 0) {
      tips.push("💡 Keep an eye on the weather — storms may affect outdoor events.");
    }
  }

  // UNIVERSAL WILDLIFE SAFETY (plural-normalized)
  const has = (name) => wildlife[name] || wildlife[name + "s"];

  if (has("jellyfish")) {
    tips.push("💡 Jellyfish around — just keep an eye out while swimming.");
  }

  if (has("crocodile") || has("croc")) {
    tips.push("💡 Avoid lagoon edges — croc activity reported.");
  }

  if (has("stingray")) {
    tips.push("💡 Stingrays active — shuffle feet when entering shallow water.");
  }

  if (has("shark")) {
    tips.push("💡 Shark activity noted — stay aware offshore.");
  }

  if (has("manatee")) {
    tips.push("💡 Manatees nearby — gentle giants, enjoy from a distance.");
  }

  if (has("dolphin")) {
    tips.push("💡 Dolphins spotted — magical moments possible on the water.");
  }

  return tips.join("<br>");
}

export const reportSuspiciousClient = onRequest(
  { cors: true, maxInstances: 10 },
  async (req, res) => {
    try {
      const {
        reason,
        identitySnapshot,
        tokenSnapshot,
        userAgent,
        ts,
        language,
        platform,
        deviceMemory,
        hardwareConcurrency,
        screenWidth,
        screenHeight,
        referrer,
        url
      } = req.body || {};

      if (!reason) {
        return res.status(400).json({
          success: false,
          error: "Missing reason"
        });
      }

      // Server-side IP
      const ip =
        req.headers["x-forwarded-for"].split(",")[0].trim() ||
        req.ip ||
        "unknown";

      const uid =
        identitySnapshot && identitySnapshot.uid
          ? identitySnapshot.uid
          : null;

      const payload = {
        reason,
        uid,
        identitySnapshot: identitySnapshot || null,
        tokenSnapshot: tokenSnapshot || null,
        userAgent: userAgent || null,
        clientTimestamp: ts || null,
        serverTimestamp: PulseRealm.PulseNOW,
        language: language || null,
        platform: platform || null,
        deviceMemory: deviceMemory || null,
        hardwareConcurrency: hardwareConcurrency || null,
        screenWidth: screenWidth || null,
        screenHeight: screenHeight || null,
        referrer: referrer || null,
        url: url || null,
        ip,
        source: "reportDanger",
        actor: "client"
      };

      // CHANGES log
      await db.collection("CHANGES").add({
        type: "suspiciousClient",
        ...payload
      });

      // IdentityHistory log
      if (uid) {
        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("danger")
          .add(payload);
      }

      return res.json({ success: true });

    } catch (err) {
      console.error("reportSuspiciousClient error", err);
      return res.status(500).json({
        success: false,
        error: "Internal error"
      });
    }
  }
);

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

export function getEnvironmentSummary(envState = {}) {
  const cToF = c => (c * 9) / 5 + 32;
  const kmhToMph = kmh => kmh * 0.621371;

  // ------------------------------------
  // WEATHER
  // ------------------------------------
  const weather = envState.weather.data || {};
  const tempC = weather.current.temperature_2m ?? null;
  const humidity = weather.current.relative_humidity_2m ?? null;
  const windKph = weather.current.wind_speed_10m ?? null;

  const weatherLine =
    typeof tempC === "number"
      ? `• 🌦️ <b>Weather</b> — ${tempC}°C / ${cToF(tempC).toFixed(1)}°F`
      : `• 🌦️ <b>Weather</b> — Not Available`;

  const humidityLine =
    typeof humidity === "number"
      ? `• 💧 <b>Humidity</b> — ${humidity}%`
      : `• 💧 <b>Humidity</b> — Not Available`;

  const windLine =
    typeof windKph === "number"
      ? `• 🍃 <b>Wind</b> — ${windKph} KM/H / ${kmhToMph(windKph).toFixed(1)} MPH`
      : `• 🍃 <b>Wind</b> — Not Available`;

  // ------------------------------------
  // HEAT INDEX
  // ------------------------------------
  const hiC = envState.heatIndex.data.heatIndex ?? null;
  const hiF = typeof hiC === "number" ? cToF(hiC) : null;

  let heatLine = `• 🔥 <b>Heat Index</b> — Not Available`;

  if (typeof hiF === "number") {
    let danger = "Safe";
    let icon = "🌤️";

    if (hiF >= 103 && hiF < 125) {
      danger = "Danger";
      icon = "🔥";
    } else if (hiF >= 125) {
      danger = "Extreme Danger";
      icon = "🌋";
    } else if (hiF >= 90) {
      danger = "Caution";
      icon = "🌡️";
    }

    heatLine = `• ${icon} <b>Heat Index</b> — ${hiF.toFixed(1)}°F (${danger})`;
  }

  // ------------------------------------
  // WAVES (with friendly intelligence)
  // ------------------------------------
  const waves = envState.waves.data || {};
  const heightFt = waves.heightFt[0] ?? null;
  const heightM = waves.heightM[0] ?? null;
  const dir = waves.derived.friendlyDirection;
  const swell = waves.derived.swellType;

  let waveLine = `• 🌊 <b>Sea</b> — Not Available`;

  if (typeof heightFt === "number") {
    let mood =
      heightFt < 1.5 ? "Calm" :
      heightFt < 3 ? "Moderate" :
      heightFt < 6 ? "Choppy" :
      "Rough";

    let vibe = "";
    if (dir) vibe += `, ${dir}`;
    if (swell) vibe += `, ${swell}`;

    waveLine = `• 🌊 <b>Sea</b> — ${mood} (${heightFt.toFixed(1)} FT / ${typeof heightM === "number" ? heightM.toFixed(2) : "N/A"} M${vibe ? " — " + vibe : ""})`;
  }

  // ------------------------------------
  // SARGASSUM
  // ------------------------------------
  const sarg = envState.sargassum.data.value ?? null;

  let sargLine = `• 🟤 <b>Sargassum</b> — Not Available`;

  if (typeof sarg === "number") {
    if (sarg > 0.7) sargLine = `• 🟤 <b>Sargassum</b> — Heavy`;
    else if (sarg > 0.3) sargLine = `• 🌾 <b>Sargassum</b> — Moderate`;
    else sargLine = `• 🏖️ <b>Sargassum</b> — Low`;
  }

  // ------------------------------------
  // STORMS
  // ------------------------------------
  const storms = envState.storms.data.activeStorms ?? [];

  let stormLine = `• ⛅ <b>Storms</b> — None Detected`;

  if (storms.length === 1) {
    const s = storms[0];
    stormLine = `• 🌀 <b>Storm</b> — ${s.type} (${s.name}) Detected`;
  } else if (storms.length > 1) {
    const names = storms.map(s => s.name).join(", ");
    stormLine = `• 🌀 <b>Storms</b> — ${storms.length} Active Systems (${names})`;
  }

  // ------------------------------------
  // MOON
  // ------------------------------------
  const moon = envState.moon.data.phase ?? null;

  let moonLine = `• 🌙 <b>Moon</b> — Not Available`;

  if (typeof moon === "number") {
    if (moon >= 0.4 && moon <= 0.6) moonLine = `• 🌕 <b>Moon</b> — Full Moon`;
    else if (moon < 0.1) moonLine = `• 🌑 <b>Moon</b> — New Moon`;
    else if (moon < 0.25) moonLine = `• 🌒 <b>Moon</b> — Waxing Crescent`;
    else if (moon < 0.4) moonLine = `• 🌓 <b>Moon</b> — First Quarter`;
    else if (moon < 0.75) moonLine = `• 🌖 <b>Moon</b> — Waning Gibbous`;
    else moonLine = `• 🌘 <b>Moon</b> — Waning Crescent`;
  }

  // ------------------------------------
  // WILDLIFE (fixed + playful)
  // ------------------------------------
  const wildlife = envState.wildlife.data || {};

  const wildlifeIcons = {
    turtle: "🐢", turtles: "🐢",
    dolphin: "🐬", dolphins: "🐬",
    manatee: "🦭", manatees: "🦭",
    ray: "🐟", rays: "🐟", stingray: "🐟", stingrays: "🐟",
    shark: "🦈", sharks: "🦈",
    iguana: "🦎", iguanas: "🦎",
    crab: "🦀", crabs: "🦀",
    jellyfish: "🪼",
    crocodile: "🐊", crocodiles: "🐊", croc: "🐊", crocs: "🐊",
    fish: "🐠", fishes: "🐠"
  };

  const activeWildlife = Object.entries(wildlife)
    .filter(([, v]) => v === true)
    .map(([k]) => {
      const key = k.toLowerCase().replace(/s$/, ""); // normalize plural
      const icon = wildlifeIcons[key] ?? "✨";
      return `${icon} ${k}`;
    });

  const wildlifeLine =
    activeWildlife.length > 0
      ? `• 🐾 <b>Wildlife</b> — ${activeWildlife.join(", ")}`
      : `• 🐾 <b>Wildlife</b> — No Recent Sightings`;

  // ------------------------------------
  // FINAL OUTPUT
  // ------------------------------------
  return [
    "📝 <b>Island Environment Summary</b><br><br>",
    weatherLine,
    humidityLine,
    windLine,
    heatLine,
    waveLine,
    sargLine,
    stormLine,
    moonLine,
    wildlifeLine
  ].join("<br>");
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

function mapWeatherCode(code) {
  if (code === null || code === undefined) return "Unknown";

  const c = Number(code);

  const map = {
    0: "Clear skies",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Foggy",
    48: "Fog with rime",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",

    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",

    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",

    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",

    77: "Snow grains",

    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",

    85: "Light snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail"
  };

  return map[c] || "Unknown";
}
// -----------------------------
// 5. FUTURE SCENARIO ENGINE
// -----------------------------
export async function generateFutureScenario(text, user, envState) {
  const out = [];
  const lower = text.toLowerCase();

  const w = envState.weather.data.current || {};
  const waves = envState.waves.data || {};
  const sarg = envState.sargassum.data.value;
  const moon = envState.moon.data.phase;
  const storms = envState.storms.data.activeStorms ?? [];
  const wildlife = envState.wildlife.data || {};

  const description = mapWeatherCode(w.weather_code || null);

  // WEATHER FUTURES
  if (description.includes("Thunderstorm")) {
    out.push("⛈️ <b>Storm Energy Lingers</b> — skies may stay dramatic for a bit.");
  }
  if (description.includes("Clear")) {
    out.push("☀️ <b>Clear Skies Ahead</b> — bright, open-feeling hours coming.");
  }
  if (description.includes("Mostly clear")) {
    out.push("🌤️ <b>Mostly Clear</b> — soft clouds drifting around.");
  }
  if (description.includes("Partly cloudy")) {
    out.push("⛅ <b>Patchy Clouds</b> — shifting light and cooler breezes.");
  }
  if (description.includes("Overcast")) {
    out.push("🌥️ <b>Overcast Mood</b> — mellow, steady temperatures.");
  }
  if (description.includes("Light rain")) {
    out.push("🌦️ <b>Light Showers</b> — quick sprinkles may pass through.");
  }
  if (description.includes("Moderate rain")) {
    out.push("🌧️ <b>Steady Rain</b> — expect on-and-off showers.");
  }
  if (description.includes("Heavy rain")) {
    out.push("🌧️ <b>Heavy Bursts</b> — visibility may dip at times.");
  }
  if (description.includes("Fog")) {
    out.push("🌫️ <b>Foggy Pockets</b> — morning haze lifting later.");
  }

  // DAY VIBES
  if (lower.includes("saturday")) {
    out.push("📅 <b>Saturday Energy</b> — livelier beaches and playful island rhythm.");
  }
  if (lower.includes("sunday")) {
    out.push("🌤️ <b>Slow Sunday Drift</b> — softer moods shaping the day.");
  }

  // WEATHER SIGNALS (FIXED)
  // No precipitation in normalized state — use humidity + weather code
  if (w.relative_humidity_2m > 85 && description.includes("rain")) {
    out.push("🌧️ <b>Passing Showers</b> — depends on cloud drift.");
  }

  if (w.wind_speed_10m > 18) {
    out.push("💨 <b>Breezy Hours</b> — seas may stay lively.");
  }

  if (w.apparent_temperature > 90) {
    out.push("🔥 <b>Warm Afternoon</b> — classic tropical heat.");
  }

  // WAVE FUTURES (HARDENED)
  const waveHeight = waves.heightFt[0];
  const dir = waves.derived.friendlyDirection || null;
  const trend = waves.derived.trend3h || null;

  if (typeof waveHeight === "number") {
    if (waveHeight > 2.0) {
      out.push("🌊 <b>Seas Staying Lively</b> — a bit of energy on the water.");
    } else if (waveHeight < 1.0) {
      out.push("🌊 <b>Glassier Waters Forming</b> — lovely for snorkeling.");
    }
    if (dir) out.push(`🌬️ Swell rolling ${dir}.`);
    if (trend) out.push(`📈 Seas look to be ${trend} soon.`);
  }

  // SARGASSUM FUTURES
  if (typeof sarg === "number") {
    if (sarg > 0.7) {
      out.push("🟤 <b>Sargassum Drift Likely</b> — winds may push more toward shore.");
    } else if (sarg < 0.3) {
      out.push("🌿 <b>Clearer Shores Ahead</b> — currents look friendly.");
    }
  }

  // MOON FUTURES
  if (typeof moon === "number") {
    if (moon >= 0.4 && moon <= 0.6) {
      out.push("🌕 <b>Full Moon Glow</b> — magical evenings incoming.");
    }
    if (moon < 0.1) {
      out.push("🌑 <b>New Moon Darkness</b> — great for stargazing.");
    }
  }

  // STORM FUTURES
  if (storms.length > 0) {
    out.push("🌀 <b>Storm Activity Nearby</b> — patterns may shift later.");
  }

  // WILDLIFE FUTURES (HARDENED)
  if (wildlife && Object.values(wildlife).some(v => v === true)) {
    out.push("🐾 <b>Wildlife Stirring</b> — movement near lagoons and mangroves.");
  }

  // EMOTIONAL FUTURES
  if (lower.includes("busy")) {
    out.push("✨ <b>Dynamic Flow</b> — island may feel more alive soon.");
  }
  if (lower.includes("quiet")) {
    out.push("🌙 <b>Softer Rhythm</b> — peaceful stretch forming.");
  }

  // TIME OF DAY
  const hour = new Date().getHours();
  if (hour < 10) {
    out.push("🌅 <b>Morning Unfolding</b> — gentle start to the day.");
  } else if (hour < 17) {
    out.push("🌞 <b>Afternoon Pulse</b> — heat and wind tend to peak.");
  } else {
    out.push("🌆 <b>Evening Drift</b> — softer breezes settling in.");
  }

  return out.join("<br>");
}

export async function getEnvironmentState() {
  try {
    const snap = await db.collection("environment").get();
    const state = {};

    // ------------------------------------
    // NORMALIZE ROOT DOCS
    // ------------------------------------
    snap.forEach(doc => {
      const raw = doc.data() || {};

      // Accept any of these shapes:
      // { data: {...} }
      // { raw: {...} }
      // { raw: { data: {...} } }
      // { ...fields }
      const normalized =
        raw.data ||
        raw.raw.data ||
        raw.raw ||
        raw;

      state[doc.id] = normalized;
    });

    // ------------------------------------
    // WEATHER
    // ------------------------------------
    const w = state.weather || {};
    const weather = {
      data: {
        current: {
          temperature_2m: w.current.temperature_2m ?? null,
          apparent_temperature: w.current.apparent_temperature ?? null,
          weather_code: w.current.weather_code ?? null,
          wind_speed_10m: w.current.wind_speed_10m ?? null,
          relative_humidity_2m: w.current.relative_humidity_2m ?? null
        },
        daily: w.daily ?? null
      }
    };

    // ------------------------------------
    // WAVES
    // ------------------------------------
    const wavesRaw = state.waves || {};
    const waves = {
      data: {
        heightFt: wavesRaw.heightFt ?? wavesRaw.data.heightFt ?? [],
        heightM: wavesRaw.heightM ?? wavesRaw.data.heightM ?? [],
        direction: wavesRaw.direction ?? wavesRaw.data.direction ?? [],
        period: wavesRaw.period ?? wavesRaw.data.period ?? [],
        derived: wavesRaw.derived ?? wavesRaw.data.derived ?? {}
      }
    };

    // ------------------------------------
    // SARGASSUM
    // ------------------------------------
    const sargRaw = state.sargassum || {};
    const sargassum = {
      data: {
        value: sargRaw.value ?? sargRaw.data.value ?? 0
      }
    };

    // ------------------------------------
    // MOON
    // ------------------------------------
    const moonRaw = state.moon || {};
    const moon = {
      data: {
        phase: moonRaw.phase ?? moonRaw.data.phase ?? 0
      }
    };

    // ------------------------------------
    // STORMS
    // ------------------------------------
    const stormsRaw = state.storms || {};
    const storms = {
      data: {
        activeStorms:
          stormsRaw.activeStorms ??
          stormsRaw.data.activeStorms ??
          stormsRaw.raw.activeStorms ??
          []
      }
    };

    // ------------------------------------
    // WILDLIFE
    // ------------------------------------
    const wildlifeRaw = state.wildlife || {};
    const wildlife = {
      data: Object.fromEntries(
        Object.entries(wildlifeRaw)
          .filter(([k, v]) => typeof v === "boolean")
          .map(([k, v]) => [k.toLowerCase(), v])
      )
    };

    // ------------------------------------
    // HEAT INDEX
    // ------------------------------------
    const heatRaw = state.heatIndex || {};
    const heatIndex = {
      data: {
        heatIndex:
          heatRaw.heatIndex ??
          heatRaw.data.heatIndex ??
          heatRaw.raw.heatIndex ??
          null
      }
    };

    // ------------------------------------
    // FINAL NORMALIZED STATE
    // ------------------------------------
    return {
      weather,
      waves,
      sargassum,
      moon,
      storms,
      wildlife,
      heatIndex
    };

  } catch (err) {
    console.error("getEnvironmentState failed:", err);

    return {
      weather: { data: { current: {}, daily: null } },
      waves: { data: { heightFt: [], heightM: [], derived: {} } },
      sargassum: { data: { value: null } },
      moon: { data: { phase: null } },
      storms: { data: { activeStorms: [] } },
      wildlife: { data: {} },
      heatIndex: { data: { heatIndex: null } }
    };
  }
}

function getEmailHTML(type, payload) {
  return emailTemplates[type].html(payload);
}


function sendPixel(res) {
  const pixel = Buffer.from(
    "R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.send(pixel);
}

async function findUserStripeBalance(stripeAccountID, stripeSecret) {
  log("🔵 [findUserStripeBalance] START", { stripeAccountID });

  const stripe = Stripe(stripeSecret);

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountID
    });

    // Stripe returns arrays like:
    // balance.available = [{ amount: 1234, currency: "usd" }]
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

    log("🟢 [findUserStripeBalance] RESULT", result);
    return result;

  } catch (err) {
    console.error("❌ [findUserStripeBalance] ERROR:", {
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

async function handleBusGET(req, rawData) {
  log("🔵 [handleBusGET] START");

  const normalizeEmail = (v) =>
    typeof v === "string" ? v.trim().toLowerCase() : null;

  const clean = (v) => {
    if (v === undefined || v === null) return null;
    const s = String(v).trim();
    return s === "" ? null : s;
  };

  const q = rawData.payload || rawData || {};
  const type = clean(q.type).toLowerCase();
  if (type !== "bus") return;

  // Basic fields
  const busname = clean(q.busname);
  const location = clean(q.location);
  const summary = clean(q.summary);
  const description = clean(q.description);

  const useremail = normalizeEmail(clean(q.useremail));
  const busemail = normalizeEmail(clean(q.busemail));

  // Determine ID
  let busID = clean(q.busID);
  if (!busID) {
    busID = db.collection("Businesses").doc().id;
    log("🆕 Generated busID:", busID);
  }

  const busRef = db.collection("Businesses").doc(busID);
  const existing = await busRef.get();

  // ⭐ FULL BUSINESS SCHEMA ⭐
  const busData = {
    busname: BECLEAN(busname) ?? null,
    location: BECLEAN(location) ?? null,
    summary: BECLEAN(summary) ?? null,
    description: BECLEAN(description) ?? null,

    busemail: busemail ?? null,
    useremail: useremail ?? null,

    // ⭐ Contact arrays
    emails: Array.isArray(q.emails) ? q.emails : (busemail ? [busemail] : []),
    phones: Array.isArray(q.phones) ? q.phones : [],
    whatsapp: Array.isArray(q.whatsapp) ? q.whatsapp : [],
    websites: Array.isArray(q.websites) ? q.websites : [],

    // ⭐ Social
    social: typeof q.social === "object" && q.social !== null ? q.social : {
      facebook: [],
      instagram: [],
      twitter: [],
      youtube: [],
      other: []
    },

    // ⭐ Categories
    categories: Array.isArray(q.categories) ? q.categories : [],
    categoryIcons: Array.isArray(q.categoryIcons) ? q.categoryIcons : [],
    subcategories: Array.isArray(q.subcategories) ? q.subcategories : [],
    subcategoryIcons: Array.isArray(q.subcategoryIcons) ? q.subcategoryIcons : [],

    // ⭐ Images
    images: Array.isArray(q.images) ? q.images : [],
    banners: Array.isArray(q.banners) ? q.banners : [],
    mainPhotoURL: clean(q.mainPhotoURL) ?? null,

    // ⭐ Map fields (if provided)
    lat: q.lat ?? null,
    lng: q.lng ?? null,
    mapImageUrl: q.mapImageUrl ?? null,
    mapsWebUrl: q.mapsWebUrl ?? null,
    placeId: q.placeId ?? null,
    resolvedAddress: q.resolvedAddress ?? null,
    resolvedName: q.resolvedName ?? null,

    // ⭐ NEW — Open hours
    openNow: q.openNow ?? null,
    hours: Array.isArray(q.hours) ? q.hours : null,

    // Always update timestamp
    date: PulseRealm.PulseNOW
  };

  // createdAt / updatedAt
  if (!existing.exists) {
    busData.createdAt = PulseRealm.PulseNOW;
    log("🆕 Creating NEW Business:", busID);
  } else {
    busData.updatedAt = PulseRealm.PulseNOW;
    log("🔄 Updating EXISTING Business:", busID);
  }

  await busRef.set(busData, { merge: true });

  log("✅ [handleBusGET] COMPLETE");
}

async function sendNoCreditsEmail({
  email,
  paymentLink,
  eventID,
  logId,
  emailPassword,
  accountSid,
  authToken,
  messagingSid
}) {
  try {
    
    const twilioClient = twilio(accountSid, authToken);

    const payload = {
      email,
      paymentLink,
      eventID,
      adminUser: "Automate",
      logId: logId || null
    };

    const template = emailTemplates["NoCredits"];
    if (!template) throw new Error("missing_template_NoCredits");

    // -----------------------------
    // Load user (NEW SCHEMA)
    // -----------------------------
    const userSnap = await db
      .collection("Users")
      .where("TPIdentity.email", "==", email)
      .limit(1)
      .get();

    if (userSnap.empty) throw new Error("User not found for NoCredits email");

    const doc = userSnap.docs[0];
    const userID = doc.id;
    const user = doc.data();
    const userRef = doc.ref;

    const subject = template.subject(payload);
    const html = template.html(payload);

    // -----------------------------
    // PHONE (NEW SCHEMA)
    // -----------------------------
    // Your schema does NOT include phone.
    // So SMS can ONLY be sent if you add TPIdentity.phone later.
    const phone = user.TPIdentity.phone || null;

    // -----------------------------
    // SMS Opt-In (NEW SCHEMA)
    // -----------------------------
    const receiveSMS = user.TPNotifications.receiveSMS === true;

    // -----------------------------
    // Send Email
    // -----------------------------
    await createEmailTransport.sendMail({
      from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
      to: email,
      bcc: "FordFamilyDelivery@Gmail.com",
      subject,
      html,
      headers: template.headers || {}
    });

    // -----------------------------
    // Log Email
    // -----------------------------
    const ts = PulseRealm.PulseNOW;
    const ref = await db.collection("EmailLogs").add({
      date: ts,
      to: email,
      type: "NoCredits",
      emailType: "NoCredits",
      payload,
      html,
      subject,
      adminUser: "Automate",
      triggeredBy: "Automate",
      triggerSource: "sendNoCreditsEmail",
      status: "Sent",
      createdAt: ts,
      timestamp: ts
    });

    await ref.update({ logId: ref.id });

    log("Sent NO CREDITS email to:", email);

    // -----------------------------
    // SMS (NEW SCHEMA)
    // -----------------------------
    if (!receiveSMS || !phone) {
      log("🚫 SMS blocked (no phone or opted out)");
      return { success: true, sms: false };
    }

    await twilioClient.messages.create({
      to: phone,
      messagingServiceSid: messagingSid,
      body: `You're out of Mass Notification Credits!`
    });

    await userRef.update({
      "TPNotifications.lastSMSSentAt": PulseRealm.PulseNOW
    });

    log("Sent NO CREDITS SMS to:", phone);

    return { success: true, sms: true };

  } catch (err) {
    console.error("sendNoCreditsEmail error:", err);
    return { success: false, error: err.message };
  }
}

function parseMassEmailBoolean(value) {
  if (value === undefined || value === null) return true; // default opt-in

  const v = String(value).toLowerCase().trim();
  return v === "true" || v === "1" || v.includes("mass");
}


function parseOrderedBoolean(value) {
  if (value === undefined || value === null) return false;

  const v = String(value).toLowerCase().trim();

  if (v === "1" || v === "true") return true;
  if (v === "0" || v === "false") return false;

  return false; // fallback default
}

// -----------------------------------------------------
// SAFETY LISTS
// -----------------------------------------------------
const bannedDomains = [
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "youtube.com",
  "tripadvisor.com",
  "wanderlog.com",
  "yelp.com",
  "google.com",
  "maps.app.goo.gl",
  "goo.gl"
];

const personalEmailDomains = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@outlook.com",
  "@btl.net"
];

// -----------------------------------------------------
// PHONE NORMALIZER
// -----------------------------------------------------
export function normalizePhone(raw, row, coords = {}) {
  if (!raw) return null;

  // Clean weird whitespace + NBSP
  let v = String(raw)
    .replace(/\u00A0/g, " ")
    .trim();

  // Strip everything except digits and +
  v = v.replace(/[^\d+]/g, "");

  // Already valid E.164
  if (v.startsWith("+") && v.length >= 8 && v.length <= 15) {
    return v;
  }

  // Remove leading +
  if (v.startsWith("+")) v = v.slice(1);

  // Pure digits
  const digits = v.replace(/\D/g, "");

  // --- BELIZE LOGIC ---
  // 7‑digit local numbers → +501
  if (digits.length === 7) {
    return "+501" + digits;
  }

  // 501 + 7 digits → +501xxxxxxx
  if (digits.startsWith("501") && digits.length === 10) {
    return "+501" + digits.slice(3);
  }

  // --- US / CANADA ---
  if (digits.length === 10) {
    return "+1" + digits;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return "+1" + digits.slice(1);
  }

  // --- INTERNATIONAL FALLBACK ---
  if (digits.length >= 8 && digits.length <= 15) {
    return "+" + digits;
  }

  // Reject everything else
  return null;
}

async function handleUserGET(req, rawData) {
  log("🔵 [handleUserGET] START");

  const q = rawData.payload || rawData || {};
  const nowTS = PulseRealm.PulseNOW;

  // -----------------------------
  // Helpers
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
  // Validate type
  // -----------------------------
  const type = cleanLower(q.type, "");
  if (type !== "users") return;

  // -----------------------------
  // Email
  // -----------------------------
  const email = normalizeEmail(clean(q.email, null));
  if (!email) {
    log("❌ Invalid email in handleUserGET");
    return;
  }

  const ppfunction = cleanLower(req.body.function || q.function, null);

  // -----------------------------
  // Load or create user
  // -----------------------------
  const usersRef = db.collection("Users");
  const snapshot = await usersRef.where("Email", "==", email).limit(1).get();

  const userId = snapshot.empty ? usersRef.doc().id : snapshot.docs[0].id;
  const userRef = usersRef.doc(userId);

  const existing = await userRef.get();
  const userData = existing.exists ? existing.data() : {};

  // -----------------------------
  // Phone normalization
  // -----------------------------
  let phone =
    req.body.phone ||
    q.phone ||
    q.Phone ||
    q.phonenumber ||
    q.userphone ||
    userData.Phone ||
    null;

  const more = q.add_more_field || q["add_more_field"] || {};

  const rawCountry =
    more["fieldLebal:Country*"].fieldValue ||
    q.country ||
    q.Country ||
    userData.Country ||
    null;

  const country = clean(normalizeCountry(rawCountry), "BZ");

  let normalizedPhone = null;
  if (phone) {
    normalizedPhone = normalizePhone(phone, country);
    if (!normalizedPhone) {
      log("❌ Invalid normalized phone in handleUserGET");
      normalizedPhone = userData.Phone || null;
    }
  } else {
    normalizedPhone = userData.Phone || null;
  }

  // -----------------------------
  // Notifications (NEW SCHEMA)
  // -----------------------------
  const incomingMassEmailValue =
    req.body.receiveMassEmails ??
    q.receiveMassEmails ??
    userData.notifications.receiveMassEmails ??
    true;

  const receiveMassEmails = parseMassEmailBoolean(incomingMassEmailValue);

  const rawSMS =
    more["fieldLebal:SMS Opt-In (Allow Texts)*"].fieldValue ||
    q.SMS ||
    userData.SMS ||
    "";

  const receiveSMS = parseSMSBoolean(rawSMS);

  // -----------------------------
  // Settings
  // -----------------------------
  const currentPoints = Number(userData.pulsepoints) || 0;
  const lifetimePoints = Number(userData.lifetimePoints) || 0;
  const referralCode = userData.referralCode || "";

  const sentPulse = q.pulsepoints !== undefined && q.pulsepoints !== "";
  const pulseAmount = sentPulse ? Number(q.pulsepoints) || 0 : 0;

  // -----------------------------
  // Pulse logic
  // -----------------------------
  let finalPulsePoints = currentPoints;
  let finalLifetime = lifetimePoints;
  let shouldLogHistory = false;
  let historyType = "";
  let historyLabel = "";
  let historyAmount = 0;

  if (sentPulse) {
    if (ppfunction === "grant") {
      finalPulsePoints = currentPoints + pulseAmount;
      finalLifetime = lifetimePoints + pulseAmount;
      shouldLogHistory = true;
      historyType = "earn";
      historyLabel = "Order Earned Points";
      historyAmount = pulseAmount;
    } else if (ppfunction === "redeem") {
      finalPulsePoints = Math.max(0, currentPoints - pulseAmount);
      shouldLogHistory = true;
      historyType = "redeem";
      historyLabel = "Points Redeemed";
      historyAmount = -pulseAmount;
    } else if (ppfunction === "setup") {
      finalPulsePoints = pulseAmount;
      finalLifetime = pulseAmount;
      shouldLogHistory = true;
      historyType = "setup";
      historyLabel = "Initial Setup";
      historyAmount = pulseAmount;
    }
  }

  // -----------------------------
  // Streak logic
  // -----------------------------
  let streakCount = Number(userData.streakCount) || 0;
  let lastEarnedDate = userData.lastEarnedDate || null;

  if (ppfunction === "grant") {
    const today = new Date();

    const lastMs = normalizeDate(lastEarnedDate);
    const last = lastMs ? new Date(lastMs) : null;

    const isSameDay = last && last.toDateString() === today.toDateString();

    const isYesterday =
      last &&
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      ).toDateString() === last.toDateString();

    if (!last) streakCount = 1;
    else if (isSameDay) streakCount = streakCount;
    else if (isYesterday) streakCount += 1;
    else streakCount = 1;

    lastEarnedDate = nowTS;
  }

  // -----------------------------
  // Role logic
  // -----------------------------
  const allowedRoles = ["Deliverer", "Vendor", "Customer"];
  const currentRole = userData.Role || "Customer";

  let newRole = clean(q.role, currentRole);
  if (currentRole === "Admin") newRole = "Admin";
  else if (!allowedRoles.includes(newRole)) newRole = currentRole;

  // -----------------------------
  // Identity fields
  // -----------------------------
  const name = clean(q.name || q.Name || userData.Name, "New User");
  const displayName = clean(userData.DisplayName || name);
  const photoURL = clean(q.photoURL) || userData.photoURL || null;

  // -----------------------------
  // BUILD NEW SCHEMA
  // -----------------------------
  const updatedUserData = {};

  // -----------------------------
// IDENTITY  →  TPIdentity
// -----------------------------
updatedUserData.TPIdentity = {
  uid: userId,
  email,
  name,
  displayName,
  photoURL,
  role: newRole,
  referralCode,
  resendToken: userData.TPIdentity.resendToken || userData.UserToken || null,
  trustedDevice: userData.TPIdentity.trustedDevice ?? false,
  stripeAccountID: userData.TPIdentity.stripeAccountID || null,
  stripeDashboardURL: userData.TPIdentity.stripeDashboardURL || null,
  loginLink: userData.TPIdentity.loginLink || null,
  paymentSetup: userData.TPIdentity.paymentSetup || "Complete",
  identitySetAt: userData.TPIdentity.identitySetAt || nowTS,
  setupAt: userData.TPIdentity.setupAt || nowTS,
  calculationVersion: userData.TPIdentity.calculationVersion || 1
};

// -----------------------------
// LOYALTY  →  TPLoyalty
// -----------------------------
updatedUserData.TPLoyalty = {
  pointsBalance: finalPulsePoints,
  lifetimePoints: finalLifetime,
  tier: userData.TPLoyalty.tier || null,
  tierKey: userData.TPLoyalty.tierKey || null,
  tierMultiplier: userData.TPLoyalty.tierMultiplier || 1,
  seasonalActive: userData.TPLoyalty.seasonalActive || false,
  seasonalName: userData.TPLoyalty.seasonalName || null,
  seasonalMultiplier: userData.TPLoyalty.seasonalMultiplier || 1,
  streakCount,
  streakMultiplier: userData.TPLoyalty.streakMultiplier || 1,
  streakExpires: userData.TPLoyalty.streakExpires || null,
  calculationVersion: userData.TPLoyalty.calculationVersion || 1,
  updated: nowTS
};

// -----------------------------
// WALLET  →  TPWallet
// -----------------------------
updatedUserData.TPWallet = {
  walletBalance: userData.TPWallet.walletBalance || 0,
  pointsBalance: finalPulsePoints,
  lifetimePoints: finalLifetime,
  vaultVisitCount: userData.TPWallet.vaultVisitCount || 0,
  lastVaultVisit: userData.TPWallet.lastVaultVisit || null,
  lastEarnedDate,
  lastOrderDate: userData.TPWallet.lastOrderDate || null,
  totalOrders: userData.TPWallet.totalOrders || 0,
  displayCurrency: userData.TPWallet.displayCurrency || "BZ$",
  transferCurrency: userData.TPWallet.transferCurrency || "bzd",
  payDay: userData.TPWallet.payDay || null,
  payFrequency: userData.TPWallet.payFrequency || null,
  vaultLocked: userData.TPWallet.vaultLocked || false,
  calculationVersion: userData.TPWallet.calculationVersion || 1
};

// -----------------------------
// SECURITY  →  TPSecurity
// -----------------------------
updatedUserData.TPSecurity = {
  alwaysRequirePin: userData.TPSecurity.alwaysRequirePin ?? false,
  appLocked: userData.TPSecurity.appLocked ?? false,
  dangerMode: userData.TPSecurity.dangerMode ?? false,
  lastLockReason: userData.TPSecurity.lastLockReason ?? "",
  lastUnlockTime: userData.TPSecurity.lastUnlockTime ?? 0,
  pinAttempts: userData.TPSecurity.pinAttempts ?? 0,
  pinHash: userData.TPSecurity.pinHash ?? "",
  pinResetExpires: userData.TPSecurity.pinResetExpires ?? 0,
  pinResetToken: userData.TPSecurity.pinResetToken ?? "",
  pinSet: userData.TPSecurity.pinSet ?? false,
  requiresPin: userData.TPSecurity.requiresPin ?? false,
  vaultLocked: userData.TPSecurity.vaultLocked ?? false,
  isLoggedIn: userData.TPSecurity.isLoggedIn ?? false,
  lastActive: userData.TPSecurity.lastActive || nowTS,
  lastAppActive: userData.TPSecurity.lastAppActive || nowTS,
  lastFirebaseIssued: userData.TPSecurity.lastFirebaseIssued || null,
  loginAt: userData.TPSecurity.loginAt || null,
  loginAttempts: userData.TPSecurity.loginAttempts || 0,
  calculationVersion: userData.TPSecurity.calculationVersion || 1,
  updatedAt: nowTS
};

// -----------------------------
// NOTIFICATIONS  →  TPNotifications
// -----------------------------
updatedUserData.TPNotifications = {
  receiveMassEmails,
  receiveSMS,
  freeMassNotificationsLimit: userData.TPNotifications.freeMassNotificationsLimit ?? 2,
  freeMassNotificationsUsed: userData.TPNotifications.freeMassNotificationsUsed ?? 0,
  paidMassNotificationCredits: userData.TPNotifications.paidMassNotificationCredits ?? 0,
  lastEmailSentAt: userData.TPNotifications.lastEmailSentAt || null,
  lastSMSSentAt: userData.TPNotifications.lastSMSSentAt || null,
  emailPending: userData.TPNotifications.emailPending || false,
  calculationVersion: userData.TPNotifications.calculationVersion || 1
};

  // -----------------------------
  // SAVE USER
  // -----------------------------
  await userRef.set(updatedUserData, { merge: true });

  // -----------------------------
  // HISTORY LOGGING
  // -----------------------------
  if (shouldLogHistory) {
    await db
      .collection("PulseHistory")
      .doc(userId)
      .collection("entries")
      .add({
        type: historyType,
        label: historyLabel,
        amount: historyAmount,
        reason: historyLabel,
        pulsepointsBefore: currentPoints,
        pulsepointsAfter: finalPulsePoints,
        streakCount,
        newUserUID: q.otherid || null,
        referralCode,
        ts: nowTS,
        createdAt: nowTS
      });
  }

  log("✅ [handleUserGET] COMPLETE");
}

export const scanUsersForSchemaIssues = onRequest(
  { region: "us-central1", timeoutSeconds: 120, memory: "512MiB" },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const usersSnap = await db.collection("Users").limit(5).get();

      const REQUIRED_SCHEMA = {
        identity: [
          "uid","displayName","name","email","photoURL","role",
          "identitySetAt","referralCode","resendToken","trustedDevice",
          "stripeAccountID","stripeDashboardURL","loginLink","paymentSetup","setupAt"
        ],
        Loyalty: [
          "lifetimePoints","tier","tierKey","tierMultiplier",
          "seasonalActive","seasonalName","seasonalMultiplier","streakCount",
          "streakMultiplier","streakExpires","calculationVersion","updated","pointsBalance"
        ],
        Wallet: [
          "walletBalance","lifetimePoints","vaultVisitCount",
          "lastVaultVisit","lastEarnedDate","displayCurrency","transferCurrency",
          "lastOrderDate","totalOrders","payDay","vaultLocked",
          "payFrequency","pointsBalance"
        ],
        Security: [
          "alwaysRequirePin","appLocked","dangerMode","lastLockReason",
          "lastUnlockTime","pinAttempts","pinHash","pinResetExpires",
          "pinResetToken","pinSet","requiresPin","vaultLocked",
          "updatedAt","lastActive","lastAppActive","loginAt","loginAttempts",
          "isLoggedIn","lastFirebaseIssued","lastUpdatedAt"
        ],
        Notifications: [
          "receiveMassEmails","receiveSMS","freeMassNotificationsLimit",
          "freeMassNotificationsUsed","paidMassNotificationCredits",
          "lastEmailSentAt","lastSMSSentAt","emailPending"
        ]
      };

      const results = [];

      usersSnap.forEach(doc => {
        const data = doc.data();
        const userResult = { uid: doc.id, missing: [] };

        for (const bucket in REQUIRED_SCHEMA) {
          const bucketData =
            data[bucket] ||
            data[bucket.toLowerCase()] || // ⭐ optional safety
            {};

          REQUIRED_SCHEMA[bucket].forEach(field => {
            if (bucketData[field] === undefined) {
              userResult.missing.push(`${bucket}.${field}`);
            }
          });
        }

        results.push(userResult);
      });

      return res.json({ success: true, users: results });

    } catch (err) {
      console.error("scanUsersForSchemaIssues ERROR:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

export const fixUsersToNewSchema = onRequest(
  { region: "us-central1", timeoutSeconds: 540, memory: "1GiB" },
  async (req, res) => {
    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const usersSnap = await db.collection("Users").limit(5).get();
      const nowTS = PulseRealm.PulseNOW;
      const updates = [];

      usersSnap.forEach(doc => {
        const userData = doc.data();
        if (!userData || Object.keys(userData).length === 0) {
          log("Skipping empty user:", doc.id);
          return;
        }
        const userId = doc.id;

        // Normalize legacy buckets
        const identity = userData.TPIdentity || userData.identity || {};
        const sec      = userData.TPSecurity || userData.Security || userData.security || {};
        const loy      = userData.TPLoyalty || userData.Loyalty || userData.loyalty || {};
        const wal      = userData.TPWallet || userData.Wallet || userData.wallet || {};
        const noti     = userData.TPNotifications || userData.Notifications || userData.notifications || {};
        const name  = identity.name || identity.displayName || userData.Name || userData.name || "Friend";
        const email = identity.email || userData.UserEmail || userData.Email || null;
        const role  = identity.role || "Customer";

        const photoURL =
          identity.photoURL ||
          userData.photoURL ||
          null;


        // -----------------------------
        // BUILD ALPHABETICAL BUCKETS
        // -----------------------------
        const identityBucket = {
          calculationVersion: 1,
          name,
          uid: userId,
          role,
          email,
          photoURL,
          paymentSetup: identity.paymentSetup || userData.PaymentSetup || "Complete",
          stripeAccountID: sec.stripeAccountID || null,
          stripeDashboardURL: sec.stripeDashboardURL || null,
          loginLink: wal.loginLink || null,
          referralCode: identity.referralCode || null,
          resendToken: identity.resendToken || userData.resendToken || null,
          displayName: identity.displayName || name,
          trustedDevice: sec.trustedDevice ?? identity.trustedDevice ?? false,
          identitySetAt: identity.identitySetAt || nowTS,
          setupAt: identity.setupAt || nowTS
        };

        const LoyaltyBucket = {
          calculationVersion: 26,
          seasonalActive: loy.seasonalActive || false,
          seasonalName: loy.seasonalName || null,
          seasonalMultiplier: loy.seasonalMultiplier || 1,
          streakCount: loy.streakCount || 0,
          streakMultiplier: loy.streakMultiplier || 1,
          streakExpires: loy.streakExpires || null,
          tier: loy.tier || null,
          tierMultiplier: loy.tierMultiplier || 1,
          tierKey: loy.tierKey || null,
          pointsBalance: loy.pointsBalance ?? loy.pulsepoints ?? loy.pulsePoints ?? 0,
          lifetimePoints: loy.lifetimePoints ?? userData.lifetimePoints ?? 0,
          updated: loy.updated || nowTS
        };

        const NotificationsBucket = {
          calculationVersion: 1,
          emailPending: noti.emailPending ?? userData.emailPending ?? false,
          freeMassNotificationsLimit: noti.freeMassNotificationsLimit ?? 2,
          freeMassNotificationsUsed: noti.freeMassNotificationsUsed ?? 0,
          paidMassNotificationCredits: noti.paidMassNotificationCredits ?? 0,
          receiveSMS: noti.receiveSMS ?? true,
          lastSMSSentAt: noti.lastSMSSentAt || null,
          receiveMassEmails: noti.receiveMassEmails ?? true,
          lastEmailSentAt: noti.lastEmailSentAt || null
        };

        const SecurityBucket = {
          calculationVersion: 1,
          alwaysRequirePin: sec.alwaysRequirePin ?? false,
          appLocked: sec.appLocked ?? false,
          dangerMode: sec.dangerMode ?? false,
          lastLockReason: sec.lastLockReason ?? "",
          lastUnlockTime: sec.lastUnlockTime ?? 0,
          lastFirebaseIssued: sec.lastFirebaseIssued || null,
          pinAttempts: sec.pinAttempts ?? 0,
          pinHash: sec.pinHash ?? "",
          pinResetExpires: sec.pinResetExpires ?? 0,
          pinResetToken: sec.pinResetToken ?? "",
          pinSet: sec.pinSet ?? false,
          requiresPin: sec.requiresPin ?? false,
          vaultLocked: sec.vaultLocked ?? false,
          loginAttempts: sec.loginAttempts ?? 0,
          isLoggedIn: sec.isLoggedIn ?? false,
          loginAt: sec.loginAt || nowTS,
          lastActive: sec.lastActive || nowTS,
          lastAppActive: sec.lastAppActive || nowTS,
          updatedAt: nowTS,
          lastUpdatedAt: nowTS
        };

        const WalletBucket = {
          calculationVersion: 1,
          walletBalance: wal.walletBalance ?? 0,
          pointsBalance: wal.pointsBalance ?? wal.pulsepoints ?? wal.pulsePoints ?? 0,
          lifetimePoints: wal.lifetimePoints ?? userData.lifetimePoints ?? 0,
          totalOrders: wal.totalOrders ?? 0,
          vaultVisitCount: wal.vaultVisitCount ?? 0,
          displayCurrency: wal.displayCurrency || "BZ$",
          transferCurrency: wal.transferCurrency || "bzd",
          payDay: wal.payDay || null,
          payFrequency: wal.payFrequency || null,
          vaultLocked: wal.vaultLocked ?? false,
          lastEarnedDate: wal.lastEarnedDate || null,
          lastOrderDate: wal.lastOrderDate || null,
          lastVaultVisit: wal.lastVaultVisit || null,
        };

        // -----------------------------
        // BUILD FINAL ALPHABETICAL USER OBJECT
        // -----------------------------
        const updatedUserData = {
          Name: name,
          UserEmail: email,
          UserID: userId,
          UserVersion: 2,
          UserToken: identity.resendToken,
          TPIdentity: identityBucket,
          TPWallet: WalletBucket,
          TPLoyalty: LoyaltyBucket,
          TPSecurity: SecurityBucket,
          TPNotifications: NotificationsBucket
        }; 

        // -----------------------------
        // PURGE INVALID TOP-LEVEL FIELDS
        // -----------------------------
        const validTopLevel = [
          "TPIdentity",
          "TPLoyalty",
          "TPNotifications",
          "TPSecurity",
          "TPWallet",
          "TPFirebaseAuth",
          "Name",
          "UserEmail",
          "UserID",
          "UserToken",
          "UserVersion"
        ];

        const deleteMap = {};
        Object.keys(userData).forEach(key => {
          if (!validTopLevel.includes(key)) {
            deleteMap[key] = deleteField();
          }
        });
        

        updates.push(
          doc.ref.set(updatedUserData, { merge: true }).then(() => {
            if (Object.keys(deleteMap).length === 0) return;
            return doc.ref.update(deleteMap);
          })
        );
      });

      await Promise.all(updates);

      return res.json({
        success: true,
        message: "All users fixed, cleaned, and alphabetized."
      });

    } catch (err) {
      console.error("fixUsersToNewSchema ERROR:", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

function formatHistoryTimestamp(ts) {
  if (!ts) return "";

  // Firestore Timestamp
  if (ts.toDate) {
    return ts.toDate().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  // String timestamp like "02-26-2026"
  const d = new Date(ts.replace(/-/g, "/"));
  if (!isNaN(d)) {
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return "";
}

// --- Helpers -----------------------------------------------------
// Simple helpers – adapt to your existing Pulse Points structure
// --- Helpers -----------------------------------------------------
async function grantPulsePoints(uid, amount, type, label, otherid, referralCode, orderID) {
  const userRef = db.collection("Users").doc(uid);

  let before = 0;
  let after = 0;
  let newStreak = 0;
  let TPWallet = {};
  let TPLoyalty = {};
  const nowTS = PulseRealm.PulseNOW;

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const user = snap.exists ? snap.data() : {};

    TPWallet = user.TPWallet || {};
    TPLoyalty = user.TPLoyalty || {};

    before = Number(TPWallet.pointsBalance) || 0;
    const lifetime = Number(TPWallet.lifetimePoints) || 0;
    const streak = Number(TPLoyalty.streakCount) || 0;

    after = before + amount;
    newStreak = streak + 1;

    tx.set(
      userRef,
      {
        TPWallet: {
          pointsBalance: after,
          lifetimePoints: lifetime + amount,
          lastEarnedDate: nowTS
        },
        TPLoyalty: {
          ...TPLoyalty,
          streakCount: newStreak,
          updated: nowTS
        }
      },
      { merge: true }
    );
  });

  const settings = await db.collection("Settings").doc("global").get().then(s => s.data());

  const entry = {
    amount,
    type,
    label,
    newUserUID: otherid || null,
    referralCode: referralCode || null,
    orderID: orderID || null,
    reason: "activity",
    pulsepointsBefore: before,
    pulsepointsAfter: after,
    streakCount: newStreak,
    ts: nowTS
  };

  entry.pointsSnapshot = buildSnapshotForNonOrderEntry(entry, { TPWallet, TPLoyalty }, settings);

  await addHistory(uid, entry);
}

export async function redeemSomePulsePoints(uid, amount, type, label, otherid, referralCode, orderID) {
  const userRef = db.collection("Users").doc(uid);

  let before = 0;
  let after = 0;
  let TPLoyalty = {};
  let TPWallet = {};
  const nowTS = PulseRealm.PulseNOW;

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const user = snap.exists ? snap.data() : {};

    TPLoyalty = user.TPLoyalty || {};
    TPWallet = user.TPWallet || {};

    before = Number(TPWallet.pointsBalance) || 0;
    after = before - amount;

    const updatedLoyalty = {
      ...TPLoyalty,
      streakCount: 0,
      updated: nowTS
    };

    tx.set(
      userRef,
      {
        TPWallet: {
          ...TPWallet,
          pointsBalance: after
        },
        TPLoyalty: updatedLoyalty
      },
      { merge: true }
    );
  });

  const settings = await db.collection("Settings").doc("global").get().then(s => s.data());
  const { seasonalActive, seasonalName, seasonalMultiplier } = getSeasonFromSettings(settings);

  const entry = {
    amount: -amount,
    type,
    label,
    newUserUID: otherid || null,
    referralCode: referralCode || null,
    orderID: orderID || null,
    reason: "redeem",
    pulsepointsBefore: before,
    pulsepointsAfter: after,
    streakCount: 0,
    ts: nowTS,
    pointsSnapshot: {
      seasonalName,
      seasonalMultiplier,
      seasonalActive,
      tierName: TPLoyalty.tier || "",
      tierMultiplier: TPLoyalty.tierMultiplier || 1,
      streakCount: 0,
      streakMultiplier: TPLoyalty.streakMultiplier || 1,
      calculationVersion: TPLoyalty.calculationVersion || 1,
      pointsBefore: before,
      pointsAfter: after
    }
  };

  await addHistory(uid, entry);
}

async function addHistory(uid, entry) {
  const historyRef = db
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .doc();

  await historyRef.set({
    ...entry,
    createdAt: entry.createdAt || PulseRealm.PulseNOW
  });
}

export const handleReferral = onCall(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {

    const data = req.data || {};
    const context = req.auth;

    const referralCode = data.referralCode;
    const newUserUID = context && context.uid;

    if (!newUserUID) {
      throw new Error("Unauthenticated.");
    }

    if (!referralCode) {
      throw new Error("Missing referralCode.");
    }

    // -----------------------------
    // 1. Look up referrer (NEW SCHEMA)
    // -----------------------------
    const refSnap = await db
      .collection("Users")
      .where("TPIdentity.referralCode", "==", referralCode)
      .limit(1)
      .get();

    if (refSnap.empty) {
      throw new Error("Invalid referral code.");
    }

    const referrerDoc = refSnap.docs[0];
    const referrerUID = referrerDoc.id;

    // -----------------------------
    // 2. Prevent self-referral
    // -----------------------------
    if (referrerUID === newUserUID) {
      throw new Error("Cannot refer yourPulseRealm.");
    }

    // -----------------------------
    // 3. Prevent double-referral
    // -----------------------------
    const existingRef = await db
      .collection("Referrals")
      .where("newUserUID", "==", newUserUID)
      .limit(1)
      .get();

    if (!existingRef.empty) {
      throw new Error("User already referred.");
    }

    // -----------------------------
    // 4. Create referral record
    // -----------------------------
    const referralRef = db.collection("Referrals").doc();
    const referralPayload = {
      id: referralRef.id,
      referrerUID,
      newUserUID,
      referralCode,
      createdAt: PulseRealm.PulseNOW,
      reason: "referral_redemption",
      actor: "user",
      source: "handleReferral"
    };

    await referralRef.set(referralPayload);

    // -----------------------------
    // 5. Reward referrer + new user
    // -----------------------------
    await grantPulsePoints(
      referrerUID,
      50,
      "earn",
      "referral_referrer",
      newUserUID,
      referralCode
    );

    await grantPulsePoints(
      newUserUID,
      25,
      "earn",
      "referral_new_user",
      referrerUID,
      referralCode
    );

    // -----------------------------
    // 6. Log to CHANGES
    // -----------------------------
    await db.collection("CHANGES").add({
      type: "referral",
      referralCode,
      referrerUID,
      newUserUID,
      metadata: referralPayload,
      createdAt: PulseRealm.PulseNOW
    });

    // -----------------------------
    // 7. IdentityHistory snapshots
    // -----------------------------
    await db
      .collection("IdentityHistory")
      .doc(newUserUID)
      .collection("snapshots")
      .add({
        snapshotType: "referralApplied",
        referralCode,
        referrerUID,
        newUserUID,
        metadata: referralPayload,
        createdAt: PulseRealm.PulseNOW
      });

    await db
      .collection("IdentityHistory")
      .doc(referrerUID)
      .collection("snapshots")
      .add({
        snapshotType: "referralEarned",
        referralCode,
        referrerUID,
        newUserUID,
        metadata: referralPayload,
        createdAt: PulseRealm.PulseNOW
      });

    return {
      success: true,
      referrerUID,
      newUserUID,
      referralCode
    };
  }
);

async function loadHistory(uid) {
  // -----------------------------
  // 1. Load last 50 history entries
  // -----------------------------
  const histSnap = await db
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .orderBy("ts", "desc")
    .limit(50)
    .get();

  const docs = histSnap.docs;

  // -----------------------------
  // 2. Load global settings once
  // -----------------------------
  const settingsSnap = await db.collection("Settings").doc("global").get();
  const settings = settingsSnap.data() || {};

  // Seasonal logic once
  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  // -----------------------------
  // 3. Timestamp normalizer
  // -----------------------------
  const normalizeTS = (ts) => {
    if (!ts) return null;

    if (typeof ts.toMillis === "function") return ts.toMillis();
    if (ts instanceof Date) return isNaN(ts.getTime()) ? null : ts.getTime();

    if (typeof ts === "object" && typeof ts._seconds === "number") {
      return ts._seconds * 1000 + Math.floor((ts._nanoseconds || 0) / 1e6);
    }

    const d = new Date(ts);
    return isNaN(d.getTime()) ? null : d.getTime();
  };

  // -----------------------------
  // 4. Process each entry in parallel
  // -----------------------------
  const orderFetches = docs.map(async (doc) => {
    const item = { id: doc.id, ...doc.data() };

    // Normalize timestamps
    item.ts = normalizeTS(item.ts);
    item.createdAt = normalizeTS(item.createdAt);

    // -----------------------------
    // If tied to an order → hydrate
    // -----------------------------
    if (item.orderID) {
      const orderSnap = await db
        .collection("Orders")
        .doc(String(item.orderID))
        .get();

      if (orderSnap.exists) {
        const order = orderSnap.data();

        item.orderLength = order.orderLength ?? null;
        item.orderedAt = normalizeTS(order.orderedAt);
        item.deliveredAt = normalizeTS(order.deliveredAt);

        item.pointsSnapshot = order.pointsSnapshot ?? null;

        item.itemName = order.itemName ?? null;
        item.orderprice = order.orderprice ?? null;
        item.ordertax = order.ordertax ?? null;
        item.ordertip = order.ordertip ?? null;
        item.ordershipping = order.ordershipping ?? null;
        item.ordertotal = order.ordertotal ?? null;
        item.payoutAmount = order.payoutAmount ?? null;
      }
    }

    // -----------------------------
    // 5. Generate snapshot if missing
    // -----------------------------
    if (!item.pointsSnapshot) {
      item.pointsSnapshot = {
        type: item.type,
        label: item.label,
        amount: item.amount,
        basePoints: item.amount,
        tierMultiplier: 1,
        streakMultiplier: 1,
        seasonalMultiplier,
        tierBonusPoints: 0,
        streakBonusPoints: 0,
        seasonalBonusPoints: 0,
        fastDeliveryBonus: 0,
        delayPenalty: 0,
        totalPointsEarned: item.amount,
        seasonalActive,
        seasonalName,
        calculationVersion: 1,
        ts: item.ts,
        createdAt: item.createdAt
      };
    }

    return item;
  });

  // -----------------------------
  // 6. Resolve all parallel fetches
  // -----------------------------
  const history = await Promise.all(orderFetches);

  return history;
}

function normalizeUserRecord(user = {}) {
  // -----------------------------
  // Helpers
  // -----------------------------
  const clean = (v, fb = null) => {
    if (v === undefined || v === null) return fb;
    const s = String(v).trim();
    if (
      s === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    ) return fb;
    return s;
  };

  const normalizeBool = (v, fb = false) => {
    if (v === undefined || v === null) return fb;
    const s = String(v).toLowerCase().trim();
    return s === "true" || s === "1";
  };

  const normalizeNumber = (v, fb = 0) => {
    const n = Number(v);
    return isNaN(n) ? fb : n;
  };

  const normalizeDateMs = (value) => {
    if (!value) return null;

    if (value.toMillis && typeof value.toMillis === "function") {
      return value.toMillis();
    }

    if (value instanceof Date) {
      const ms = value.getTime();
      return isNaN(ms) ? null : ms;
    }

    if (typeof value === "object" && typeof value._seconds === "number") {
      return value._seconds * 1000 + Math.floor((value._nanoseconds || 0) / 1e6);
    }

    if (typeof value === "string") {
      let ms = Date.parse(value);
      if (!isNaN(ms)) return ms;

      const cleaned = value.replace(" at ", " ").replace("UTC", "GMT");
      ms = Date.parse(cleaned);
      if (!isNaN(ms)) return ms;

      return null;
    }

    if (typeof value === "number") {
      return value > 0 ? value : null;
    }

    return null;
  };

  // -----------------------------
  // Referral Code (TPIdentity)
  // -----------------------------
  let referralCode = clean(user.TPIdentity.referralCode, null);
  if (!referralCode) {
    const base = clean(
      user.TPIdentity.name ||
      user.Name ||
      user.name,
      "USER"
    )
      .split(" ")[0]
      .toUpperCase();

    referralCode = `${base}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }

  // -----------------------------
  // FINAL NORMALIZED STRUCTURE
  // -----------------------------
  return {
    // -----------------------------
    // TPIdentity
    // -----------------------------
    TPIdentity: {
      uid: clean(user.TPIdentity.uid),
      name: clean(user.TPIdentity.name || user.Name || user.name, ""),
      displayName: clean(user.TPIdentity.displayName),
      email: clean(user.TPIdentity.email || user.Email || user.email, ""),
      photoURL: clean(user.TPIdentity.photoURL),
      role: clean(user.TPIdentity.role, "Customer"),
      referralCode,
      resendToken: clean(user.TPIdentity.resendToken || user.UserToken),
      trustedDevice: normalizeBool(user.TPIdentity.trustedDevice, false),
      stripeAccountID: clean(user.TPIdentity.stripeAccountID),
      stripeDashboardURL: clean(user.TPIdentity.stripeDashboardURL),
      loginLink: clean(user.TPIdentity.loginLink),
      paymentSetup: clean(user.TPIdentity.paymentSetup, "Complete"),
      identitySetAt: normalizeDateMs(user.TPIdentity.identitySetAt),
      setupAt: normalizeDateMs(user.TPIdentity.setupAt),
      calculationVersion: normalizeNumber(user.TPIdentity.calculationVersion, 1)
    },

    // -----------------------------
    // TPLoyalty
    // -----------------------------
    TPLoyalty: {
      pointsBalance: normalizeNumber(user.TPLoyalty.pointsBalance, 0),
      lifetimePoints: normalizeNumber(user.TPLoyalty.lifetimePoints, 0),

      streakCount: normalizeNumber(user.TPLoyalty.streakCount, 0),
      streakExpires: normalizeDateMs(user.TPLoyalty.streakExpires),
      streakMultiplier: normalizeNumber(user.TPLoyalty.streakMultiplier, 1),

      tier: clean(user.TPLoyalty.tier),
      tierKey: clean(user.TPLoyalty.tierKey),
      tierMultiplier: normalizeNumber(user.TPLoyalty.tierMultiplier, 1),

      seasonalActive: normalizeBool(user.TPLoyalty.seasonalActive, false),
      seasonalName: clean(user.TPLoyalty.seasonalName),
      seasonalMultiplier: normalizeNumber(user.TPLoyalty.seasonalMultiplier, 1),

      calculationVersion: normalizeNumber(user.TPLoyalty.calculationVersion, 1),
      updated: normalizeDateMs(user.TPLoyalty.updated)
    },

    // -----------------------------
    // TPWallet
    // -----------------------------
    TPWallet: {
      pointsBalance: normalizeNumber(user.TPWallet.pointsBalance, 0),
      lifetimePoints: normalizeNumber(user.TPWallet.lifetimePoints, 0),
      lastEarnedDate: normalizeDateMs(user.TPWallet.lastEarnedDate),
      lastOrderDate: normalizeDateMs(user.TPWallet.lastOrderDate),
      lastVaultVisit: normalizeDateMs(user.TPWallet.lastVaultVisit),
      vaultVisitCount: normalizeNumber(user.TPWallet.vaultVisitCount, 0),
      walletBalance: normalizeNumber(user.TPWallet.walletBalance, 0),
      displayCurrency: clean(user.TPWallet.displayCurrency, "BZ$"),
      transferCurrency: clean(user.TPWallet.transferCurrency, "bzd"),
      payDay: clean(user.TPWallet.payDay),
      payFrequency: clean(user.TPWallet.payFrequency),
      totalOrders: normalizeNumber(user.TPWallet.totalOrders, 0),
      vaultLocked: normalizeBool(user.TPWallet.vaultLocked, false),
      calculationVersion: normalizeNumber(user.TPWallet.calculationVersion, 1)
    },

    // -----------------------------
    // TPNotifications
    // -----------------------------
    TPNotifications: {
      receiveSMS: normalizeBool(user.TPNotifications.receiveSMS, false),
      receiveMassEmails: normalizeBool(user.TPNotifications.receiveMassEmails, true),
      freeMassNotificationsUsed: normalizeNumber(user.TPNotifications.freeMassNotificationsUsed, 0),
      freeMassNotificationsLimit: normalizeNumber(user.TPNotifications.freeMassNotificationsLimit, 2),
      paidMassNotificationCredits: normalizeNumber(user.TPNotifications.paidMassNotificationCredits, 0),
      lastEmailSentAt: normalizeDateMs(user.TPNotifications.lastEmailSentAt),
      lastSMSSentAt: normalizeDateMs(user.TPNotifications.lastSMSSentAt),
      emailPending: normalizeBool(user.TPNotifications.emailPending, false),
      calculationVersion: normalizeNumber(user.TPNotifications.calculationVersion, 1)
    },

    // -----------------------------
    // TPSecurity
    // -----------------------------
    TPSecurity: {
      alwaysRequirePin: normalizeBool(user.TPSecurity.alwaysRequirePin, false),
      appLocked: normalizeBool(user.TPSecurity.appLocked, false),
      dangerMode: normalizeBool(user.TPSecurity.dangerMode, false),
      lastLockReason: clean(user.TPSecurity.lastLockReason, ""),
      lastUnlockTime: normalizeNumber(user.TPSecurity.lastUnlockTime, 0),
      pinAttempts: normalizeNumber(user.TPSecurity.pinAttempts, 0),
      pinHash: clean(user.TPSecurity.pinHash, ""),
      pinResetExpires: normalizeNumber(user.TPSecurity.pinResetExpires, 0),
      pinResetToken: clean(user.TPSecurity.pinResetToken, ""),
      pinSet: normalizeBool(user.TPSecurity.pinSet, false),
      requiresPin: normalizeBool(user.TPSecurity.requiresPin, false),
      vaultLocked: normalizeBool(user.TPSecurity.vaultLocked, false),
      isLoggedIn: normalizeBool(user.TPSecurity.isLoggedIn, false),
      lastActive: normalizeDateMs(user.TPSecurity.lastActive),
      lastAppActive: normalizeDateMs(user.TPSecurity.lastAppActive),
      lastFirebaseIssued: normalizeDateMs(user.TPSecurity.lastFirebaseIssued),
      loginAt: normalizeDateMs(user.TPSecurity.loginAt),
      loginAttempts: normalizeNumber(user.TPSecurity.loginAttempts, 0),
      updatedAt: normalizeDateMs(user.TPSecurity.updatedAt),
      calculationVersion: normalizeNumber(user.TPSecurity.calculationVersion, 1)
    },

    // -----------------------------
    // TOP‑LEVEL
    // -----------------------------
    UserEmail: clean(user.UserEmail || user.Email || user.email),
    UserID: clean(user.UserID),
    UserName: clean(user.UserName || user.Name),
    UserToken: clean(user.UserToken),
    UserVersion: normalizeNumber(user.UserVersion, 1)
  };
}

async function handleOrderGET(req, rawData) {
  log("🔵 [handleOrderGET] START");

  const nowTS = PulseRealm.PulseNOW;
  const nowMs = nowTS.toMillis();

  const normalizeEmail = v =>
    typeof v === "string" ? v.trim().toLowerCase() : null;

  const clean = (v, fallback = null) => {
    if (v == null) return fallback;
    const s = String(v).trim();
    return s === "" ? fallback : s;
  };

  const isGarbage = v => {
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

  const num = v => {
    if (v == null) return 0;
    const decoded = decodeURIComponent(String(v));
    if (decoded.includes("|")) {
      return decoded
        .split("|")
        .map(x => Number(x) || 0)
        .reduce((a, b) => a + b, 0);
    }
    const n = Number(decoded);
    return isNaN(n) ? 0 : Number(n.toFixed(2));
  };

  const clampMultiplier = (value, settings) =>
    Math.min(value, settings.maxTotalMultiplier ?? 1);

  const localGetSeasonFromSettings = settingsObj => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const mmdd = `${mm}-${dd}`;

    const periods = settingsObj.seasonalPeriods || {};
    for (const key in periods) {
      const s = periods[key];
      if (!s.start || !s.end) continue;
      if (mmdd >= s.start && mmdd <= s.end) {
        return {
          seasonalActive: true,
          seasonalName: s.name,
          seasonalMultiplier: s.multiplier
        };
      }
    }

    return {
      seasonalActive: false,
      seasonalName: "",
      seasonalMultiplier: 1.0
    };
  };

  const q = rawData.payload || rawData || {};
  const type = clean(q.type, "").toLowerCase();
  if (type !== "order") return;

  const settingsSnap = await db.collection("Settings").doc("global").get();
  const settings = settingsSnap.data() || {};

  const {
    seasonalActive,
    seasonalName,
    seasonalMultiplier
  } = localGetSeasonFromSettings(settings);

  const paymentmethod = clean(q.method, null);
  const orderID = clean(q.orderID, null) || db.collection("Orders").doc().id;

  const orderRef = db.collection("Orders").doc(orderID);
  const existing = await orderRef.get();
  const existingOrder = existing.data() || {};

  const ordered = q.ordered === "true" || q.ordered === true;

  // Numeric fields
  const tip = num(q.ordertip);
  const tax = num(q.ordertax);
  const shipping = num(q.ordershipping);
  const price = num(q.orderprice);
  const count = num(q.productquantity);
  const total = num(q.ordertotal);

  const payout = Number((tip + price * 0.05).toFixed(2));

  const coupon = num(q.ordercoupon);
  const discount = num(q.orderdiscount);

  const pulseIfNoDiscounts =
    total + coupon + discount - (price + tax + payout + shipping);

  const pulseActual = total - (price + tax + payout + shipping);

  // Order status
  const allowedStatuses = ["Pending", "Complete", "Cancelled"];
  let orderstatus = clean(q.orderstatus, "Pending");
  if (!allowedStatuses.includes(orderstatus)) orderstatus = "Pending";

  const orderData = {
    orderID,
    ordered,
    paymentmethod,
    estimatedPulseFunds: num(pulseIfNoDiscounts),
    actualPulseFunds: num(pulseActual),
    orderdiscount: discount,
    ordercoupon: coupon,
    customerEmail: isGarbage(q.customerEmail)
      ? existingOrder.customerEmail || null
      : normalizeEmail(q.customerEmail),
    delivererEmail: isGarbage(q.delivererEmail)
      ? existingOrder.delivererEmail || null
      : normalizeEmail(q.delivererEmail),
    itemName: clean(q.itemName, existingOrder.itemName || null),
    payoutAmount: payout,
    displayAmount: num(q.displayAmount) || payout,
    displayCurrency: clean(q.displayCurrency, "usd").toLowerCase(),
    transferCurrency: clean(q.transferCurrency, "usd").toLowerCase(),
    orderprice: price,
    ordertip: tip,
    ordertax: tax,
    ordershipping: shipping,
    ordertotal: total,
    orderstatus,
    productquantity: count
  };

  const customerEmail = orderData.customerEmail;

  const userSnap = await db
    .collection("Users")
    .where("TPIdentity.email", "==", customerEmail)
    .limit(1)
    .get();

  if (userSnap.empty) {
    await orderRef.set(orderData, { merge: true });
    log("✅ [handleOrderGET] COMPLETE (no user found)");
    return;
  }

  const userDoc = userSnap.docs[0];
  const userRef = userDoc.ref;
  const userID = userDoc.id;
  const user = userDoc.data() || {};

  // NEW SCHEMA
  const TPLoyalty = user.TPLoyalty || {};
  const TPWallet = user.TPWallet || {};

  const lifetimePoints = Number(TPWallet.lifetimePoints) || 0;

  let referrerUID = null;
  let referredOrderBonus = 0;

  const referralSnap = await db
    .collection("Referrals")
    .where("newUserUID", "==", userID)
    .limit(1)
    .get();

  if (!referralSnap.empty) {
    const refData = referralSnap.docs[0].data();
    referrerUID = refData.referrerUID || null;

    const referralPercent = (settings.referralEarningRate || 0) / 100;
    referredOrderBonus = Math.round(total * referralPercent);
  }

  // NEW SCHEMA
  const lastEarnedMs = TPWallet.lastEarnedDate.toMillis()
    ? TPWallet.lastEarnedDate.toMillis()
    : TPWallet.lastEarnedDate || null;

  const lastEarned = lastEarnedMs ? new Date(lastEarnedMs) : null;

  const today = new Date();
  let streakCount = Number(TPLoyalty.streakCount) || 0;

  const isSameDay =
    lastEarned && lastEarned.toDateString() === today.toDateString();

  const isYesterday =
    lastEarned &&
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    ).toDateString() === lastEarned.toDateString();

  if (!lastEarned) streakCount = 0;
  else if (isSameDay) {
    // keep streak
  } else if (isYesterday) streakCount += 1;
  else streakCount = 0;

  const tierThresholds = {
    Seashell: 0,
    ReefDiver: settings.tierThreshold_ReefDiver,
    ToucanSpirit: settings.tierThreshold_ToucanSpirit,
    VolcanoHeart: settings.tierThreshold_VolcanoHeart,
    HurricaneLegend: settings.tierThreshold_HurricaneLegend
  };

  let userTier = "Seashell";
  for (const [name, threshold] of Object.entries(tierThresholds)) {
    if (lifetimePoints >= threshold) userTier = name;
  }

  const tierMultiplier = settings[`tierMultiplier_${userTier}`] ?? 1;

  const isReferrer =
    q.referrerEmail &&
    normalizeEmail(q.referrerEmail) === customerEmail;

  function buildPointsSnapshot({
    basePoints,
    streakCount,
    tierMultiplier,
    seasonalMultiplier,
    settings,
    isReferrer,
    durationMinutes,
    seasonalName,
    seasonalActive,
    referredOrderBonus,
    existingOrder
  }) {
    const streakMultiplier = Math.min(
      (settings.streakMultiplierBase ?? 1) +
        streakCount * (settings.streakMultiplierPerDay ?? 0),
      settings.streakMaxMultiplier ?? 2
    );

    const tierBonusPoints = Math.round(basePoints * (tierMultiplier - 1));
    const streakBonusPoints = Math.round(basePoints * (streakMultiplier - 1));
    const seasonalBonusPoints = Math.round(
      basePoints * (seasonalMultiplier - 1)
    );

    const referralBaseBonus = isReferrer
      ? settings.referralBaseBonus_Referrer
      : settings.referralBaseBonus_NewUser;

    const seasonalReferralBonus = isReferrer
      ? settings.seasonalReferralBonus_Referrer
      : settings.seasonalReferralBonus_NewUser;

    const fastDeliveryBonus =
      settings.fastDeliveryBonusEnabled &&
      durationMinutes != null &&
      durationMinutes < settings.fastDeliveryBonusMinutes
        ? settings.fastDeliveryBonusPoints
        : 0;

    const delayPenalty =
      existingOrder.delayPenalty ??
      (existingOrder.orderLength > 90 ? -5 : 0);

    const totalMultiplier = clampMultiplier(
      tierMultiplier * streakMultiplier * seasonalMultiplier,
      settings
    );

    const totalPointsEarned =
      basePoints +
      tierBonusPoints +
      streakBonusPoints +
      seasonalBonusPoints +
      fastDeliveryBonus +
      referralBaseBonus +
      seasonalReferralBonus +
      referredOrderBonus +
      delayPenalty;

    return {
      basePoints,
      tierMultiplier,
      tierBonusPoints,
      streakCount,
      streakMultiplier,
      streakBonusPoints,
      seasonalMultiplier,
      totalMultiplier,
      seasonalBonusPoints,
      fastDeliveryBonus,
      referralBaseBonus,
      seasonalReferralBonus,
      referredOrderBonus,
      delayPenalty,
      durationMinutes,
      totalPointsEarned,
      seasonalName,
      seasonalActive,
      calculationVersion: settings.calculationVersion ?? 1
    };
  }

  // -----------------------------
  // Rebuild snapshot for completed orders missing snapshot
  // -----------------------------
  if (
    existing.exists &&
    existingOrder.orderstatus === "Complete" &&
    !existingOrder.pointsSnapshot
  ) {
    const orderedAt =
      existingOrder.orderedAt.toMillis() || nowMs;
    const deliveredAt =
      existingOrder.deliveredAt.toMillis() || nowMs;

    const durationMinutes = Math.floor(
      (deliveredAt - orderedAt) / 60000
    );

    const rebuildBasePoints = Number(existingOrder.actualPulseFunds ?? 0);

    const snapshot = buildPointsSnapshot({
      basePoints: rebuildBasePoints,
      streakCount,
      tierMultiplier,
      seasonalMultiplier,
      settings,
      isReferrer,
      durationMinutes,
      seasonalName,
      seasonalActive,
      referredOrderBonus,
      existingOrder
    });

    await orderRef.update({ pointsSnapshot: snapshot });
  }

  // -----------------------------
  // Status transitions
  // -----------------------------
  if (orderstatus === "Pending") {
    orderData.orderedAt = nowTS;
  }

  else if (orderstatus === "Complete") {
    orderData.deliveredAt = nowTS;

    const existingOrderedTS =
      existingOrder.orderedAt || orderData.orderedAt || nowTS;

    const orderedAtMs = existingOrderedTS.toMillis();
    const deliveredAtMs = nowMs;

    let durationMinutes = Math.floor(
      (deliveredAtMs - orderedAtMs) / 60000
    );
    if (!Number.isFinite(durationMinutes) || durationMinutes < 0) {
      durationMinutes = null;
    }

    orderData.orderLength = durationMinutes;

    if (!existingOrder.pointsSnapshot) {
      const basePoints = Number(pulseActual.toFixed(2));

      const snapshot = buildPointsSnapshot({
        basePoints,
        streakCount,
        tierMultiplier,
        seasonalMultiplier,
        settings,
        isReferrer,
        durationMinutes,
        seasonalName,
        seasonalActive,
        referredOrderBonus,
        existingOrder
      });

      orderData.pointsSnapshot = snapshot;
      const increment = (n = 1) => ({ integerIncrement: n });
      // -----------------------------
      // Update user Loyalty (NEW SCHEMA)
      // -----------------------------
      await userRef.set(
        {
          TPLoyalty: {
            pointsBalance: increment(
              snapshot.totalPointsEarned
            ),
            lifetimePoints: increment(
              snapshot.totalPointsEarned
            ),
            streakCount,
            lastEarnedDate: nowTS
          },
          TPWallet: {
            lastOrderDate: nowTS,
            totalOrders: increment(1)
          }
        },
        { merge: true }
      );

      // -----------------------------
      // Referrer bonus (NEW SCHEMA)
      // -----------------------------
      if (referrerUID && referredOrderBonus > 0) {
        const referrerRef = db.collection("Users").doc(referrerUID);

        await referrerRef.set(
          {
            TPLoyalty: {
              pointsBalance: increment(
                referredOrderBonus
              ),
              lifetimePoints: increment(
                referredOrderBonus
              ),
              lastReferralOrderDate: nowTS,
              referralOrderCount:
                increment(1),
              totalReferralEarnings:
                increment(
                  referredOrderBonus
                )
            }
          },
          { merge: true }
        );

        await db
          .collection("PulseHistory")
          .doc(referrerUID)
          .collection("entries")
          .add({
            type: "earn",
            label: "referral_order_bonus",
            amount: referredOrderBonus,
            orderID,
            reason: "referral_order_bonus",
            ts: nowTS,
            createdAt: nowTS,
            orderedAt: existingOrderedTS,
            deliveredAt: nowTS
          });
      }

      // -----------------------------
      // User history entry
      // -----------------------------
      await db
        .collection("PulseHistory")
        .doc(userID)
        .collection("entries")
        .add({
          type: "earn",
          label: "order_payment",
          amount: snapshot.totalPointsEarned,
          orderID,
          reason: "order_payment",
          ts: nowTS,
          createdAt: nowTS,
          orderLength: durationMinutes,
          orderedAt: existingOrderedTS,
          deliveredAt: nowTS,
          orderprice: orderData.orderprice,
          ordertotal: orderData.ordertotal,
          itemName: orderData.itemName,
          ...snapshot
        });
    }
  }

  // -----------------------------
  // Final write
  // -----------------------------
  await orderRef.set(orderData, { merge: true });

  log("✅ [handleOrderGET] COMPLETE");
}
export const referralredirect = onRequest(
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
      // ------------------------------------
      // Extract last path segment
      // ------------------------------------
      const parts = req.path.split("/");
      let referralCode = parts[parts.length - 1] || "";

      // Sanitize
      const safeCode = referralCode.replace(/[^A-Za-z0-9_-]/g, "");

      if (!safeCode || safeCode.length < 3 || safeCode !== referralCode) {
        return res.redirect(302, "https://www.pulseworld.net/error.html");
      }

      referralCode = safeCode;

      // ------------------------------------
      // Lookup referrer (NEW SCHEMA)
      // ------------------------------------
      let referrerUID = null;
      let referrerEmail = null;

      try {
        const refSnap = await db
          .collection("Users")
          .where("TPLoyalty.referralCode", "==", referralCode)
          .limit(1)
          .get();

        if (!refSnap.empty) {
          const doc = refSnap.docs[0];
          const data = doc.data();

          referrerUID = doc.id;
          referrerEmail = data.TPIdentity.email || null;  // NEW SCHEMA
        }
      } catch (lookupErr) {
        console.error("Referral lookup error:", lookupErr);
      }

      // ------------------------------------
      // Log click
      // ------------------------------------
      const ip =
        req.headers["x-forwarded-for"].split(",")[0].trim() ||
        req.ip ||
        "unknown";

      const clickPayload = {
        referralCode,
        referrerUID,
        referrerEmail,
        ts: PulseRealm.PulseNOW,
        ua: req.headers["user-agent"] || "",
        ip,
        reason: "referralClick",
        source: "redirectFunction"
      };

      await db.collection("ReferralClicks").add(clickPayload);

      // CHANGES log
      await db.collection("CHANGES").add({
        type: "referralClick",
        referralCode,
        referrerUID,
        referrerEmail,
        metadata: clickPayload,
        createdAt: PulseRealm.PulseNOW
      });

      // IdentityHistory snapshot
      if (referrerUID) {
        await db
          .collection("IdentityHistory")
          .doc(referrerUID)
          .collection("snapshots")
          .add({
            snapshotType: "referralClick",
            referralCode,
            metadata: clickPayload,
            createdAt: PulseRealm.PulseNOW
          });
      }

      // ------------------------------------
      // Deep link + fallback
      // ------------------------------------
      const appLink = `tropicpulse://referral?code=${encodeURIComponent(
        referralCode
      )}`;

      const fallback = `/openapp.html?ref=${encodeURIComponent(
        referralCode
      )}`;

      res.set("Cache-Control", "no-store");
      res.status(200).send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Opening Pulse World…</title>
            <script>
              window.location = "${appLink}";
              setTimeout(() => {
                window.location = "${fallback}";
              }, 800);
            </script>
          </head>
          <body style="font-family:sans-serif;text-align:center;margin-top:40px;">
            <p>Opening Pulse World…</p>
          </body>
        </html>
      `);

    } catch (err) {
      console.error("referralRedirect error:", err);
      return res.redirect(302, "/error.html");
    }
  }
);

function extractRawBody(req) {
  log("🔵 [extractRawBody] START");

  const body = req.body;

  if (typeof body === "string") {
    log("📦 Raw string body detected");
    return body.trim();
  }

  if (body.data) {
    log("📦 Found body.data");
    return String(body.data).trim();
  }

  if (body.raw) {
    log("📦 Found body.raw");
    return String(body.raw).trim();
  }

  if (body.text) {
    log("📦 Found body.text");
    return String(body.text).trim();
  }

  const keys = Object.keys(body || {});
  if (keys.length === 1 && typeof keys[0] === "string") {
    log("📦 Cloud Run single-key body detected");
    return keys[0].trim();
  }

  log("📦 Fallback JSON stringify");
  return JSON.stringify(body || {});
}

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
export const setSecurityState = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {
    let uid = null;
    let reason = null;
    let actor = null;
    let source = null;
    let updates = null;
    let allowed = null;
    let clean = {};
    let updatePayload = {};

    // CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      ({ uid, reason, actor, source, ...updates } = req.body || {});

      if (!uid) {
        await sendAdminAlertEmail(
          "SET SECURITY STATE MISSING UID SOFT ERROR",
          null,
          { uid, source, actor, reason, updates }
        );
        return res.status(400).json({ error: "Missing uid" });
      }

      // Allowed security flags
      allowed = ["appLocked", "vaultLocked", "requiresPin", "dangerMode"];
      clean = {};

      for (const key of Object.keys(updates)) {
        if (allowed.includes(key)) {
          clean[key] = updates[key];
        }
      }

      if (Object.keys(clean).length === 0) {
        await sendAdminAlertEmail(
          "SET SECURITY STATE NO VALID SECURITY FIELDS SOFT ERROR",
          null,
          { uid, source, actor, reason, allowed, clean }
        );
        return res.status(400).json({ error: "No valid security fields provided" });
      }

      // NEW SCHEMA — TPSecurity lives under Users/{uid}
      const securityRef = db
        .collection("Users")
        .doc(uid)
        .collection("TPSecurity")
        .doc("state");

      // Load previous state for CHANGES diff
      const beforeSnap = await securityRef.get();
      const before = beforeSnap.exists ? beforeSnap.data() : {};

      // Apply update
      updatePayload = {
        ...clean,
        lastUpdated: PulseRealm.PulseNOW,
        lastReason: reason || "unspecified",
        lastActor: actor || "user",
        lastSource: source || "app"
      };

      await securityRef.set(updatePayload, { merge: true });

      // -----------------------------
      // LOG TO CHANGES COLLECTION
      // -----------------------------
      const changesRef = db.collection("CHANGES").doc();
      await changesRef.set({
        type: "security",
        uid,
        before,
        after: updatePayload,
        reason: reason || "unspecified",
        actor: actor || "user",
        source: source || "app",
        createdAt: PulseRealm.PulseNOW
      });

      // -----------------------------
      // SNAPSHOT INTO IdentityHistory
      // -----------------------------
      const historyRef = db
        .collection("IdentityHistory")
        .doc(uid)
        .collection("snapshots")
        .doc();

      await historyRef.set({
        snapshotType: "securityState",
        uid,
        TPSecurity: updatePayload, // NEW SCHEMA
        reason: reason || "unspecified",
        actor: actor || "user",
        source: source || "app",
        createdAt: PulseRealm.PulseNOW
      });

      return res.json({ ok: true });

    } catch (err) {
      await sendAdminAlertEmail(
        "SET SECURITY STATE HARD ERROR",
        err,
        { uid, source, actor, reason, allowed, updatePayload }
      );
      return res.status(500).json({ error: "Failed to update security state" });
    }
  }
);

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

// Small helper: safe JSON parse
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
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

async function nameExists(displayName) {
  const snap = await db
    .collection("Users")
    .where("DisplayName", "==", displayName)
    .limit(1)
    .get();

  return !snap.empty;
}

/* ===========================
   CREATE AND UPDATE STRIPE ACCOUNT IF NEEDED
=========================== */
async function checkOrCreateStripeAccount(email, country) {
  log("🔵 [checkOrCreateStripeAccount] START");

  const stripe = Stripe(STRIPE_PASSWORD.value());

  // -----------------------------
  // Helpers
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
    throw new Error("Invalid email passed to checkOrCreateStripeAccount");
  }

  log("🔹 Inputs:", { cleanEmail, thecountry });
  // -----------------------------
  // 2️⃣ Lookup user (NEW SCHEMA)
  // -----------------------------
  const snap = await db
    .collection("Users")
    .where("TPIdentity.email", "==", cleanEmail)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error(`User not found for email: ${cleanEmail}`);
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
    log("⚠️ Invalid payFrequency, defaulting to daily");
    payFrequency = "daily";
  }

  // -----------------------------
  // 4️⃣ Determine payDay (NEW SCHEMA)
  // -----------------------------
  let payDay = null;

  if (payFrequency === "weekly") {
    payDay = cleanLower(userData.TPWallet.payDay, "monday");

    const allowedDays = [
      "monday", "tuesday", "wednesday",
      "thursday", "friday"
    ];

    if (!allowedDays.includes(payDay)) {
      log("⚠️ Invalid payDay, defaulting to monday");
      payDay = "monday";
    }
  }

  log("🔹 Final payout settings:", { payFrequency, payDay });

  // -----------------------------
  // 5️⃣ Build Stripe payout schedule
  // -----------------------------
  let schedule = {};

  if (payFrequency === "daily") {
    schedule = { interval: "daily" };
  }

  if (payFrequency === "weekly") {
    schedule = {
      interval: "weekly",
      weekly_anchor: payDay
    };
  }

  log("🔹 Stripe schedule:", schedule);

  // -----------------------------
  // 6️⃣ Update existing Stripe account
  // -----------------------------
  if (existingStripeID) {
    try {
      const account = await stripe.accounts.update(existingStripeID, {
        settings: { payouts: { schedule } }
      });

      log("✅ Updated existing Stripe account:", account.id);

      return {
        stripeAccountID: account.id,
        thecountry,
        role,
        payFrequency,
        payDay
      };
    } catch (err) {
      console.error("❌ Stripe update failed:", err.message);
      throw new Error(`Stripe Update Failed: ${err.message}`, { cause: err });
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

    log("🆕 Created new Stripe account:", stripeAccountID);

  } catch (err) {
    console.error("❌ Stripe account creation error:", err);

    const search = await stripe.accounts.search({
      query: `email:'${cleanEmail}'`
    });

    if (!search.data.length) {
      throw new Error(
        `Stripe account exists but cannot be retrieved for ${cleanEmail}`,
        { cause: err }
      );
    }

    stripeAccountID = search.data[0].id;

    log("🔍 Found existing Stripe account:", stripeAccountID);
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

  log("💾 Saved Stripe info to Firestore");

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

export async function createMassEmailPaymentLink(eventID, eventImageUrl) {
  const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
  const stripe = Stripe(STRIPE_PASSWORD_VALUE);

  // 1. Update the product image dynamically
  await stripe.products.update("prod_TzIC2PMixkP2qf", {
    images: [ eventImageUrl ]
  });

  // 2. Create the Payment Link
  const link = await stripe.paymentLinks.create({
    line_items: [
      {
        price: "price_1T1JcWCt2lhjxca8hw0yppTF",   // BZ$10 per credit
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 99
        }
      }
    ],

    after_completion: {
      type: "redirect",
      redirect: {
        url: `https://www.pulseworld.net/PulseWorldPaymentSuccess?eventID=${eventID}`
      }
    },

    metadata: {
      eventID
    },

    allow_promotion_codes: false,
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false }
  });

  return link.url;
}

//=======================================================================================================
//=======================================================================================================
// ----------------------
// EMAIL TEMPLATES
// ----------------------
// Each template receives a payload object and returns HTML.
// You can expand these with your full branded HTML later.


export const emailTemplates = {
newUser: {
  subject: () => "Welcome to Pulse World!",
  important: true,
  html: (payload) => {
    const { logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="display:block; opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center" style="background-color:#f4f4f4;">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden;">

            <!-- BIG HEADER IMAGE -->
            <tr>
              <td>
                <img src="https://www.pulseworld.net/Welcome"
                     alt="Pulse World Header"
                     width="600"
                     style="display:block; width:100%; max-width:600px;">
              </td>
            </tr>

            <!-- Inner Padding -->
            <tr>
              <td style="padding:30px;">

                <!-- Welcome Title -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" 
                        style="font-size:28px; font-weight:bold; color:#222;">
                      Welcome to Pulse World!
                    </td>
                  </tr>

                  <tr>
                    <td align="center" 
                        style="font-size:16px; color:#666; padding-top:8px;">
                      Your account has been successfully created!
                    </td>
                  </tr>

                  <!-- Toucan Image -->
                  <tr>
                    <td align="center" style="padding:25px 0;">
                      <img src="./_EXPRESSIONS/_PEX/BUILD/ToucanLogo-Mini"
                           alt="Pulse World Toucan"
                           width="180"
                           style="display:block; border-radius:12px;">
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td align="center" 
                        style="font-size:18px; color:#555; padding:25px 20px 10px 20px; line-height:24px;">
                      You’re all set! Your Pulse World account is ready to use.  
                      If you plan to accept payments for Pulse World services,  
                      please check your email for important setup instructions.
                    </td>
                  </tr>

                  <!-- Social Media Section -->
                  <tr>
                    <td align="center" style="padding-top:20px;">
                      <div style="font-size:14px; color:#555; margin-bottom:10px;">
                        Enjoy these moments! Share your successes with Pulse World on social media.
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="../_EXPRESSIONS/_PEX/BUILD/SocialMedia"
                             alt="Social Media Icons"
                             width="180"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
},

  loyalty: {
  subject: (payload) => "Pulse World: My Pulse Loyalty Enrollment Setup!",
  important: true,
  html: (payload) => {
    const { name, email, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Pulse Loyalty Enrollment Setup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: left;
      color: #ffffff;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .content h2 {
      font-size: 20px;
      margin: 0 0 12px;
      color: #111827;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .button-row {
      margin: 22px 0 10px;
      text-align: left;
    }
    .primary-button {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      color: #ffffff !important;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .secondary-note {
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }
    .list-title {
      margin-top: 18px;
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .list {
      margin: 8px 0 0;
      padding-left: 18px;
      font-size: 13px;
      color: #4b5563;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
    .footer-links {
      margin-top: 6px;
    }
    .footer-links span {
      margin-right: 10px;
    }
    @media (max-width: 600px) {
      .container {
        border-radius: 0;
      }
      .header, .content, .footer {
        padding-left: 18px;
        padding-right: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-row">
          <div style="text-align:center; width:100%;">
            <div style="display:inline-block; text-align:center;">
              <div class="logo-circle" style="margin:0 auto 10px auto;">
                <img 
                  src="../_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                  alt="Pulse World Toucan"
                  width="60"
                  style="display:block; border-radius:50%;">
              </div>
              <div>
                <div class="brand-text">Pulse World</div>
                <div class="tagline">Enjoy these moments.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; width:100%;">
          <div class="header-title" style="display:inline-block; text-align:center;">My Pulse Loyalty Enrollment</div>
          <div class="header-subtitle" style="display:inline-block; text-align:center;">
            Your rewards journey is ready—just complete your enrollment in the app.
          </div>
        </div>
      </div>

      <div class="content">
        <div style="text-align:center; width:100%;">
          <span class="pill">My Pulse Loyalty</span>
          <h2>Your Pulse Loyalty Enrollment</h2>
        </div>

        <p>Hi ${name || "there"},</p>

        <p>
          Your <strong>Pulse Loyalty</strong> setup is ready. Open the
          <strong>Pulse World</strong> app and complete your enrollment in
          <strong>My Pulse Loyalty</strong> to start earning rewards on every eligible order and delivery.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">Account email</div>
          <div class="highlight-value">${email || "N/A"}</div>
        </div>

        <div class="button-row">
          <div class="thebutton" style="text-align:center;">
            <a class="primary-button" href="https://linktr.ee/tropicpulse">
              Open Pulse World App
            </a>
          </div>
          <div class="secondary-note">
            If the button doesn’t work, just open the Pulse World app on your device and look for
            <strong>My Pulse Loyalty</strong> in the menu.
          </div>
        </div>

        <div class="list-title">Once you complete enrollment, you can:</div>
        <ul class="list">
          <li>Earn rewards automatically on eligible orders and deliveries</li>
          <li>View your Pulse Loyalty Member Card in the app</li>
          <li>Track your progress toward future perks and offers</li>
        </ul>

        <p style="margin-top: 18px;">
          If you didn’t request this or believe this email was sent in error, you can safely ignore it—your account
          will remain unchanged.
        </p>

        <p style="margin-top: 18px;">
          Welcome to the island’s most rewarding experience.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div class="footer-links">
          <span>App: Pulse World</span>
          <span>Category: My Pulse Loyalty</span>
        </div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a Pulse Loyalty enrollment was started using this address.
        </div>
      </div>
    </div>

    ${trackingPixel}
  </div>
</body>
</html>`;
  }
},

  sendPayout: {
    subject: (payload) => {
  const { orderID, delivererEmail } = payload;
return `Pulse World: Payout for your Delivery: ${orderID}`;
},
    html: (payload) => {
    const {payoutAmount, stripeAccountID, orderID, delivererEmail, pendingBalance, availableBalance,  displayCurrency, transferCurrency, displayAmount, logId } = payload;
    let formatted = displayAmount || payoutAmount;
    
    const payoutAmountFormatted = formatDisplayAmount(displayCurrency,formatted);
    const formattedavailable = formatDisplayAmount(displayCurrency,availableBalance);
    const formattedpending = formatDisplayAmount(displayCurrency,pendingBalance);
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your Payout Has Been Sent</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: center;
      color: #ffffff;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">

        <!-- Logo -->
        <img 
          src="../_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
          alt="Pulse World Logo"
          width="70"
          height="70"
          style="display:block; margin:0 auto 14px auto; border-radius:50%; object-fit:cover;"
        >

        <div class="brand-text">Pulse World</div>
        <div class="tagline">Enjoy these moments.</div>

        <div class="header-title">Your Payout Has Been Sent!</div>
        <div class="header-subtitle">
          Your earnings have been transferred to your Stripe balance.
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">

        <!-- DETAILS -->
        <div class="highlight-box">
          <div class="highlight-label">Order ID</div>
          <div class="highlight-value">${orderID}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Deliverer Email</div>
          <div class="highlight-value">${delivererEmail}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Payout Amount</div>
          <div class="highlight-value" style="font-size:20px; font-weight:700;">
            ${payoutAmountFormatted}
          </div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Current Wallet Balance</div>
          <div class="highlight-value">${formattedavailable}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Pending Payments to Bank</div>
          <div class="highlight-value" style="color:green;">
            ${formattedpending}
          </div>
        </div>

        <p style="margin-top: 18px;">
          Your payout has been successfully deposited into your Stripe balance.  
          Funds will become available based on your Stripe payout schedule.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a payout was processed for your delivery.
        </div>
      </div>

    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
}
},

  stripeOnboarding: {
  subject: (payload) => "Pulse World: Getting Paid Soon?!",
  important: true,
  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden;">

            <!-- Inner Padding -->
            <tr>
              <td style="padding:30px;">

                <!-- Header Text -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" 
                        style="font-size:28px; font-weight:bold; color:#222;">
                      Stripe + Pulse World
                    </td>
                  </tr>

                  <tr>
                    <td align="center" 
                        style="font-size:18px; color:#666; padding-top:8px;">
                      Automated, Instant Payments for Vendors/Deliverers!
                    </td>
                  </tr>

                  <!-- Toucan Image -->
                  <tr>
                    <td align="center" style="padding:25px 0;">
                      <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                           alt="Pulse World Toucan"
                           width="220"
                           style="display:block; border-radius:12px;">
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td align="center" 
                        style="font-size:16px; color:#444; padding:0 20px 20px 20px; line-height:24px;">
                      To start receiving automated payouts through Pulse World, please complete your
                      Stripe payment setup. This ensures we know exactly where to send your earnings.
                    </td>
                  </tr>

                  <!-- Get Paid Button -->
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <a href="${getPaidLink}"
                         style="background-color:#00a86b;
                                color:#ffffff;
                                padding:14px 32px;
                                text-decoration:none;
                                font-size:18px;
                                font-weight:bold;
                                border-radius:8px;
                                display:inline-block;">
                        Get Paid
                      </a>
                    </td>
                  </tr>

                  <!-- Expiration Note -->
                  <tr>
                    <td align="center" 
                        style="font-size:14px; color:#e63946; padding:0 20px 20px 20px; line-height:20px;">
                      Your Stripe payment link expires in 24 hours.  
                      If it expires or you need a new one, click below to resend your setup link.
                    </td>
                  </tr>

                  <!-- Resend Link Button -->
                  <tr>
                    <td align="center" style="padding-bottom:30px;">
                      <a href="${reSendLink}"
                         style="background-color:#007bff;
                                color:#ffffff;
                                padding:12px 28px;
                                text-decoration:none;
                                font-size:16px;
                                font-weight:bold;
                                border-radius:8px;
                                display:inline-block;">
                        Resend Stripe Link
                      </a>
                    </td>
                  </tr>

                  <!-- Footer Note -->
                  <tr>
                    <td align="center" 
                        style="font-size:12px; color:#777; line-height:18px; padding:0 20px;">
                      To receive payments through Pulse World, you must complete your Stripe setup 
                      before accepting or delivering any orders.
                    </td>
                  </tr>

                  <!-- Social Media Section -->
                  <tr>
                    <td align="center" style="padding-top:30px;">
                      <div style="font-size:14px; color:#555; margin-bottom:10px;">
                        Enjoy these moments! Share your successes with Pulse World on social media.
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PEX/BUILD/SocialMedia"
                             alt="Social Media Icons"
                             width="180"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>

    ${trackingPixel}

  </body>
</html>`;
  }
},

  resendStripeLink: {
  subject: (payload) => "Pulse World: Stripe Payments Link Resent!",
  important: true,
  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; padding:30px;">

            <!-- Header -->
            <tr>
              <td align="center" 
                  style="font-size:28px; font-weight:bold; color:#222;">
                Pulse World
              </td>
            </tr>

            <tr>
              <td align="center" 
                  style="font-size:18px; color:#666; padding-top:8px;">
                Your Stripe Payments Link Has Been Resent!
              </td>
            </tr>

            <!-- Toucan Image -->
            <tr>
              <td align="center" style="padding:25px 0;">
                <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                     alt="Pulse World Toucan"
                     width="220"
                     style="display:block; border-radius:12px;">
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" 
                  style="font-size:16px; color:#444; padding:0 20px 20px 20px; line-height:24px;">
                We’ve generated a fresh Stripe onboarding link so you can complete your 
                payment setup and start receiving payouts through Pulse World.
              </td>
            </tr>

            <!-- Get Paid Button -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <a href="${getPaidLink}"
                   style="background-color:#00a86b;
                          color:#ffffff;
                          padding:14px 32px;
                          text-decoration:none;
                          font-size:18px;
                          font-weight:bold;
                          border-radius:8px;
                          display:inline-block;">
                  Get Paid
                </a>
              </td>
            </tr>

            <!-- Expiration Note -->
            <tr>
              <td align="center" 
                  style="font-size:14px; color:#e63946; padding:0 20px 20px 20px; line-height:20px;">
                Your Stripe payment link expires in 24 hours.  
                If it expires or you need a new one, click below to resend your setup link.
              </td>
            </tr>

            <!-- Resend Link Button -->
            <tr>
              <td align="center" style="padding-bottom:30px;">
                <a href="${reSendLink}"
                   style="background-color:#007bff;
                          color:#ffffff;
                          padding:10px 26px;
                          text-decoration:none;
                          font-size:14px;
                          border-radius:6px;
                          display:inline-block;">
                  Resend Stripe Link
                </a>
              </td>
            </tr>

            <!-- Footer Note -->
            <tr>
              <td align="center" 
                  style="font-size:12px; color:#777; line-height:18px; padding:0 20px;">
                To receive payments through Pulse World, you must complete your Stripe setup 
                before accepting or delivering any orders.
              </td>
            </tr>

            <!-- Social Media Section -->
            <tr>
              <td align="center" style="padding-top:30px;">
                <div style="font-size:14px; color:#555; margin-bottom:10px;">
                  Enjoy these moments! Share your successes with Pulse World on social media.
                </div>
                <a href="https://linktr.ee/tropicpulse" target="_blank">
                  <img src="./_EXPRESSIONS/_PEX/BUILD/SocialMedia"
                       alt="Social Media Icons"
                       width="180"
                       style="display:block; margin:auto;">
                </a>
              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>

    ${trackingPixel}

  </body>
</html>`;
  }
},

  pulsePointRedemption: {
  subject: (payload) => {
    const { points } = payload;
    return `Redemption Requested: ${points} Pulse Points Redemption`;
  },
  important: true,
  html: (payload) => {
    const { 
      name, 
      email, 
      points, 
      availableBalance, 
      pendingBalance, 
      displayCurrency, 
      transferCurrency, 
      displayAmount, 
      logId 
    } = payload;

    const pointToMoney = points / 100;
    let formatted = pointToMoney || displayAmount;

    const payoutAmountFormatted = formatDisplayAmount(displayCurrency, formatted);
    const formattedavailable = formatDisplayAmount(displayCurrency, availableBalance);
    const formattedpending = formatDisplayAmount(displayCurrency, pendingBalance);

    // Correct 1x1 tracking pixel
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pulse Points Redemption Requested</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: center;
      color: #ffffff;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <img 
                src="./_EXPRESSIONS/_PEX/BUILD/ToucanLogo-Mini"
                alt="Pulse World Logo"
                width="70"
                height="70"
                style="
                  display:block;
                  margin:0 auto 14px auto;
                  border-radius:50%;
                  object-fit:cover;
                ">
            </td>
          </tr>

          <tr>
            <td align="center">
              <img 
                src="./_EXPRESSIONS/_PEX/BUILD/CointoWallet"
                alt="Coin to Wallet"
                width="120"
                style="display:block; margin:0 auto 10px auto;">
            </td>
          </tr>
        </table>

        <div class="brand-text">Pulse World</div>
        <div class="tagline">Enjoy these moments.</div>

        <div class="header-title">Pulse Points Redemption Requested</div>
        <div class="header-subtitle">
          Your Pulse Points will be converted into Wallet Balance within 24–48 hours.
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">

        <div style="text-align:center; width:100%;">
          <span class="pill">Pulse Points</span>
          <h2>Redeeming ${points} Pulse Points</h2>
        </div>

        <p>Hi ${name},</p>

        <p>
          Pulse World has received your request to convert 
          <strong>${points}</strong> Pulse Points into Wallet Balance.
          Your payout will be processed shortly.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">User Email</div>
          <div class="highlight-value">${email}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Pulse Points Redeemed</div>
          <div class="highlight-value">${points}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Estimated Wallet Balance Added</div>
          <div class="highlight-value" style="font-size:20px; font-weight:700;">
            ${payoutAmountFormatted}
          </div>
        </div>

        <p style="margin-top: 18px;">
          Your Pulse Points have already been deducted from your account.  
          You will receive a confirmation once the wallet balance is updated.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a Pulse Points redemption was requested.
        </div>
      </div>

    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
  }
},

pulsePointsGifted: {
  subject: (payload) => {
    const { points } = payload;
    return `Pulse World: You have Earned ${points} Pulse Points!`;
  },
  important: true,
  html: (payload) => {
    const { 
      name, 
      email, 
      points, 
      tipAmount, 
      itemPrice, 
      totalPrice, 
      taxAmount, 
      shipping, 
      payoutAmount, 
      logId 
    } = payload;

    const num = (v) => {
      if (v == null) return 0;
      const decoded = decodeURIComponent(String(v));
      if (decoded.includes("|")) {
        return decoded
          .split("|")
          .map(x => Number(x) || 0)
          .reduce((a, b) => a + b, 0);
      }
      const n = Number(decoded);
      return isNaN(n) ? 0 : Number(n.toFixed(2));
    };

    const tip = num(tipAmount ?? payload.ordertip ?? payload.tip);
    const priceRaw = itemPrice ?? payload.orderprice ?? payload.orderamount ?? null;
    const price = num(priceRaw);

    let payout = num(payoutAmount);
    if (payout === 0) {
      payout = Number((tip + price * 0.05).toFixed(2));
    }

    const formattedordertotal  = `BZ$${Number(totalPrice).toFixed(2)}`;
    const formattedorderamount = `BZ$${price.toFixed(2)}`;
    const formattedtip         = `BZ$${Number(tipAmount).toFixed(2)}`;
    const formattedtax         = `BZ$${Number(taxAmount).toFixed(2)}`;

    // ✅ Correct 1×1 tracking pixel
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pulse Points Awarded</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: left;
      color: #ffffff;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <div class="logo-row">
          <div style="text-align:center; width:100%;">
            <div style="display:inline-block; text-align:center;">
              <div class="logo-circle" style="margin:0 auto 10px auto;">
                <img 
                  src="./_EXPRESSIONS/_PEX/BUILD/rld.net/rld.net/PulseWorldOSLogo2.png"
                  alt="Pulse World Toucan"
                  width="60"
                  style="display:block; border-radius:50%;">
              </div>
              <div>
                <div class="brand-text">Pulse World</div>
                <div class="tagline">Enjoy these moments.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; width:100%;">
          <div class="header-title">Pulse Points Awarded</div>
          <div class="header-subtitle">
            Your delivery has earned you new Pulse Points.
          </div>
        </div>
      </div>

      <div class="content">

        <div style="text-align:center; width:100%;">
          <span class="pill">Pulse Points</span>
          <h2>You’ve Earned ${points || "0"} Pulse Points</h2>
        </div>

        <p>Hi ${name || "there"},</p>

        <p>
          Thank you for your service. Pulse World has credited 
          <strong><span style="font-size:16px;">${points || "0"}</span> Pulse Points</strong>
          to your profile for your recent delivery.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">Deliverer Email</div>
          <div class="highlight-value">${email || "N/A"}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Order Item Price</div>
          <div class="highlight-value">${formattedorderamount}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Belize Tax (12.5%)</div>
          <div class="highlight-value">${formattedtax}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Tip</div>
          <div class="highlight-value" style="font-weight:bold; font-size:22px;">
            ${formattedtip}
          </div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Order Total Price</div>
          <div class="highlight-value">${formattedordertotal}</div>
        </div>

        <p style="margin-top: 18px;">
          Stay tuned—your Pulse Points will soon unlock rewards, perks, and exclusive benefits.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a delivery was completed using this address.
        </div>
      </div>
    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
  }
},

rolechange: {
  subject: (payload) => "Pulse World: Role Change Requested",
  important: true,
  html: (payload) => {
    const { role, payFrequency, payDay, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    const payDayRow = payDay
      ? `<tr>
          <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
            Payday
          </td>
          <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
            ${payDay}
          </td>
        </tr>`
      : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e2e2;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding:20px 20px 10px 20px;">
                <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" alt="Pulse World" style="max-width:180px;height:auto;display:block;">
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:10px 20px 20px 20px;">
                <h2 style="margin:0 0 10px 0;font-size:20px;color:#222;text-align:center;">
                  Role & Pay Frequency Updated
                </h2>
                <p style="margin:0 0 16px 0;font-size:14px;color:#555;text-align:center;">
                  Your account details have been updated. Please review the changes below.
                </p>

                <!-- Data Table -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
                      Role
                    </td>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
                      ${role}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
                      Pay Frequency
                    </td>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
                      ${payFrequency.toUpperCase()}
                    </td>
                  </tr>

                  ${payDayRow}

                </table>

                <p style="margin:16px 0 0 0;font-size:12px;color:#999;text-align:center;">
                  If you believe this change is incorrect, please contact <a href="mailto:AIOvermind@PulseWorld.Net">Pulse World support</a>.
                </p>
              </td>
            </tr>

          </table>
        </td>
        ${trackingPixel}
      </tr>
    </table>
  </body>
</html>`;
  }
},

  newEvent: {
  subject: (payload) => "New Event on Pulse World",
  important: false,
  html: (payload) => {
    const { title, Fromdate, Todate, Fromtime, Totime, Venue, description, summary, unsubscribeUrl, language, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:30px 0;font-family:'Poppins',sans-serif;">
  <tr>
    <td align="center">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:3px solid #000;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:#ffff99;padding:30px 20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" 
                 alt="Pulse World Toucan" width="120" style="display:block;margin-bottom:10px;border-radius:50%;border:3px solid #000;">
            <h1 style="margin:0;font-size:26px;color:#000;">A New Event Just Hit Pulse World!</h1>
          </td>
        </tr>

        <!-- Cartoon Event Icon -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/rld.net/NewEvent" 
                 alt="New Event Illustration" width="160" 
                 style="display:block;margin:0 auto 10px;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:0 30px 30px;color:#333;font-size:16px;line-height:1.6;">
            <p style="margin-top:0;">
              A brand‑new event has just been added to Pulse World — and you won’t want to miss it!
            </p>

            <div style="background:#f0faff;border:2px solid #00aaff;border-radius:12px;padding:18px;margin:20px 0;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#000;">${title}</p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <strong>${summary}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Date:</span>
                <strong>${Fromdate} → ${Todate}</strong><br>
                <span style="color:green; font-size:16px;">Time:</span>
                <strong>${Fromtime} → ${Totime}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Venue:</span>
                <strong>${Venue}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Language:</span>
                <strong>${language}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Description:</span>
                <strong>${description}</strong>
              </p>
            </div>

            <p>
              Open the Pulse World app to get full details and stay in the loop with everything happening around San Pedro!
            </p>

            <p style="margin-top:25px;text-align:center;">
              <a href="https://linktr.ee/tropicpulse" 
                 style="background:#00aaff;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
                View Event on Pulse World
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
<tr>
  <td align="center" style="background:#fafafa; padding:20px; font-size:13px; color:#777; line-height:1.5;">
    Powered by Pulse World • San Pedro’s Everything App<br><br>
    <em>This email was automatically generated because a new event was added to Pulse World.</em>
  </td>
</tr>

<!-- Unsubscribe Footer -->
<tr>
  <td align="center" style="padding:10px;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff; border:2px solid #e5e5e5; border-radius:14px; padding:10px;">
            <tr>
              <td align="center" style="padding:10px;">

                <img 
                  src="./_EXPRESSIONS/_PEX/BUILD/Welcome"
                  alt="Pulse World Logo"
                  width="120"
                  style="display:block; margin-bottom:10px; border-radius:12px;"
                />

                <p style="font-family:Arial, sans-serif; font-size:14px; color:#555;">
                  Don’t want to receive these updates?
                </p>

                <a href="${unsubscribeUrl}"
                   style="font-family:Arial, sans-serif; font-size:14px; color:#4a90e2; text-decoration:none; font-weight:bold;">
                   Unsubscribe from Pulse World mass emails
                </a>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </td>
</tr>
      </table>
    </td>
    ${trackingPixel}
  </tr>
</table>
</body>
</html>`;
  }
},

  newBusiness: {
  subject: (payload) => "New Business on Pulse World",
  important: false,
  html: (payload) => {
    const { busname, summary, description, busemail, link, location, unsubscribeUrl, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:30px 0;font-family:'Poppins',sans-serif;">
  <tr>
    <td align="center">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:3px solid #000;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:#ffff99;padding:30px 20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" 
                 alt="Pulse World Toucan" width="120" style="display:block;margin-bottom:10px;border-radius:50%;border:3px solid #000;">
            <h1 style="margin:0;font-size:26px;color:#000;">A New Business Just Joined Pulse World!</h1>
          </td>
        </tr>

        <!-- Cartoon Building -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/NewBusiness" 
                 alt="New Business Illustration" width="160" 
                 style="display:block;margin:0 auto 10px;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:0 30px 30px;color:#333;font-size:16px;line-height:1.6;">
            <p style="margin-top:0;">
              We’re excited to welcome a brand‑new local business to the Pulse World community!
            </p>

            <div style="background:#f0faff;border:2px solid #00aaff;border-radius:12px;padding:18px;margin:20px 0;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#000;">${busname}</p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <strong>${summary}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Location:</span>
                <strong>${location}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Description:</span>
                <strong>${description}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Email:</span>
                <strong>${busemail}</strong>
              </p>
            </div>

            <p>
              Be sure to check them out on the Pulse World app and show your support for another amazing local business in San Pedro!
            </p>

            <p style="margin-top:25px;text-align:center;">
              <a href="https://linktr.ee/tropicpulse" 
                 style="background:#00aaff;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
                Explore on Pulse World
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
<tr>
  <td align="center" style="background:#fafafa; padding:20px; font-size:13px; color:#777; line-height:1.5;">
    Powered by Pulse World • San Pedro’s Everything App<br><br>
    <em>This email was automatically generated because a new business was added to Pulse World.</em>
  </td>
</tr>

<!-- Unsubscribe Footer -->
<tr>
  <td align="center" style="padding:10px;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff; border:2px solid #e5e5e5; border-radius:14px; padding:10px;">
            <tr>
              <td align="center" style="padding:10px;">

                <img 
                  src="./_EXPRESSIONS/_PEX/BUILD/Welcome"
                  alt="Pulse World Logo"
                  width="120"
                  style="display:block; margin-bottom:10px; border-radius:12px;"
                />

                <p style="font-family:Arial, sans-serif; font-size:14px; color:#555;">
                  Don’t want to receive these updates?
                </p>

                <a href="${unsubscribeUrl}"
                   style="font-family:Arial, sans-serif; font-size:14px; color:#4a90e2; text-decoration:none; font-weight:bold;">
                   Unsubscribe from Pulse World mass emails
                </a>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </td>
</tr>
      </table>
    </td>
    ${trackingPixel}
  </tr>
</table>
</body>
</html>`;
  }
},

adminPulseRedemptionNotice: {
  subject: "Pulse Points Redemption – Vault Credit Needed",
  html: ({ name, uid, points, walletAmount }) => `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e0e0e0;">

            <!-- Header -->
            <tr>
              <td style="padding:25px; text-align:center; background:#fafafa; border-bottom:1px solid #e0e0e0;">
                <h2 style="margin:0; font-size:22px; color:#222;">
                  Pulse Points Redemption Alert
                </h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">

                <p style="font-size:16px; color:#333; margin-top:0;">
                  A user has redeemed Pulse Points and requires a manual credit to their <strong>Pulse World Vault Wallet</strong>.
                </p>

                <table width="100%" border="0" cellspacing="0" cellpadding="0" 
                       style="background:#fafafa; padding:15px; border-radius:8px; border:1px solid #ddd; margin:20px 0;">
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Name:</strong> ${name}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>UID:</strong> ${uid}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Points Redeemed:</strong> ${points}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Vault Credit Amount:</strong> $${walletAmount}</td>
                  </tr>
                </table>

                <p style="font-size:15px; color:#333;">
                  Please credit this amount to the user's Pulse World Vault Wallet.  
                  This manual credit should be completed within <strong>24–48 hours</strong>.
                </p>

                <p style="font-size:14px; color:#777; margin-top:30px;">
                  — Pulse World System Notification
                </p>

              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>
  </body>
</html>`
},

NoCredits: {
  subject: (payload) => "You're out of Mass Notification Credits",
  html: (payload) => {
    const { email, paymentLink, eventID, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f9f9; padding:40px 0; font-family:Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#00c6ff,#0072ff); padding:30px; text-align:center;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" alt="Pulse World" width="90" style="margin-bottom:10px;">
            <h1 style="color:white; margin:0; font-size:26px; font-weight:bold;">
              You're Out of Credits
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333;">
            <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
              Hey Friend,
            </p>

            <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
              You’ve used your free Mass Notification credits. To keep sending island‑wide announcements, you’ll need to purchase additional credits.
            </p>

            <p style="font-size:16px; line-height:1.6; margin:0 0 25px;">
              Each credit is <strong>BZ$10</strong> and lets you broadcast a new event or business update to the entire Pulse World community.
            </p>

            <!-- Button -->
            <table cellpadding="0" cellspacing="0" style="margin:30px auto;">
              <tr>
                <td align="center" style="background:#00a86b; padding:14px 28px; border-radius:8px;">
                  <a href="${paymentLink}" 
                     style="color:white; text-decoration:none; font-size:18px; font-weight:bold; display:block;">
                    Buy Credits
                  </a>
                </td>
              </tr>
            </table>

            <p style="font-size:14px; color:#666; line-height:1.6; margin-top:20px;">
              Once your purchase is complete, your credits will be added instantly and you can continue sending notifications without interruption.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f7f7; padding:20px; text-align:center; font-size:12px; color:#777;">
            Pulse World • San Pedro, Belize<br>
            You’re receiving this message because you attempted to send a Mass Notification.
          </td>
        </tr>

      </table>
      ${trackingPixel}
    </td>
  </tr>
</table>`;
  }
}
};


export const loadProfilePhoto = onRequest(
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
      const { uid } = req.body;

      if (!uid) {
        return res.json({ success: false, error: "Missing uid" });
      }

      const userRef = db.collection("Users").doc(uid);
      const userSnap = await userRef.get();
      const existing = userSnap.data() || {};

      // NEW SCHEMA
      const photoURL = existing.TPIdentity.photoURL || null;

      return res.json({ success: true, photoURL });

    } catch (err) {
      console.error("loadProfilePhoto error:", err);
      return res.status(500).json({
        success: false,
        error: "Server error: " + err.message
      });
    }
  }
);


export const ping = onRequest(
  {
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 5,
    invoker: "public",
    cors: true
  },
  async (req, res) => {
    // Explicit CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    // -------------------------------------------------------
    // ⭐ 1. Start timing immediately (RTT measurement)
    // -------------------------------------------------------
    const t0 = PulseRealm.PulseNOW;

    // Base response (this is what we will measure)
    const base = {
      ok: true,
      message: "pong",
      timestamp: PulseRealm.PulseNOW
    };

    // Serialize response to measure size
    const responsePayload = JSON.stringify(base);
    const responseBytes = Buffer.byteLength(responsePayload, "utf8");

    // Measure request size (body may be empty)
    const requestBytes = Buffer.byteLength(JSON.stringify(req.body || {}), "utf8");

    // -------------------------------------------------------
    // ⭐ 2. End timing
    // -------------------------------------------------------
    const t1 = PulseRealm.PulseNOW;
    const rtt = Math.max(1, t1 - t0); // round-trip time in ms

    // -------------------------------------------------------
    // ⭐ 3. Compute actual packet size
    // -------------------------------------------------------
    const totalBytes = requestBytes + responseBytes;
    const packetKB = Math.max(0.001, totalBytes / 1024); // avoid divide-by-zero

    // -------------------------------------------------------
    // ⭐ 4. Compute network physics
    // -------------------------------------------------------
    const msPerKB = rtt / packetKB;     // milliseconds per KB
    const kbps = 1000 / msPerKB;        // KB per second

    // -------------------------------------------------------
    // ⭐ 5. Attach ONLY network physics
    // -------------------------------------------------------
    base.rtt = rtt;
    base.packetKB = packetKB;
    base.msPerKB = msPerKB;
    base.kbps = kbps;

    res.json(base);
  }
);

export const uploadProfilePhoto = async (req, res) => {
  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const { uid, image } = req.body;

    if (!uid || !image) {
      return res.json({ success: false, error: "Missing uid or image" });
    }

    // Store in memory instead of Storage
    PulseCoreGMemory[`profilePhoto_${uid}`] = image;

    const photoURL = `/memory/profilePhoto_${uid}`;

    // Update user record
    await db.update(`Users/${uid}`, {
      TPIdentity: {
        photoURL: { stringValue: photoURL }
      }
    });

    // CHANGES log
    await db.add("CHANGES", {
      type: { stringValue: "profilePhotoUpdate" },
      uid: { stringValue: uid },
      photoURL: { stringValue: photoURL },
      reason: { stringValue: "profile_photo_upload" },
      actor: { stringValue: "user" },
      source: { stringValue: "uploadProfilePhoto" },
      createdAt: { integerValue: PulseRealm.PulseNOW }
    });

    // IdentityHistory snapshot
    await db.add(`IdentityHistory/${uid}/snapshots`, {
      snapshotType: { stringValue: "profilePhotoUpdate" },
      photoURL: { stringValue: photoURL },
      reason: { stringValue: "profile_photo_upload" },
      actor: { stringValue: "user" },
      source: { stringValue: "uploadProfilePhoto" },
      createdAt: { integerValue: PulseRealm.PulseNOW }
    });

    return res.json({ success: true, photoURL });

  } catch (err) {
    console.error("uploadProfilePhoto error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error: " + err.message
    });
  }
};

export const getwallet = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "Missing uid" });
    }

    const snap = await db.get(`Users/${uid}`);

    if (!snap || !snap.fields) {
      return res.status(404).json({ error: "User not found" });
    }

    const f = snap.fields;

    return res.json({
      balance: f.TPWallet.mapValue.fields.walletBalance.integerValue || 0,
      pulsePoints: f.TPLoyalty.mapValue.fields.pointsBalance.integerValue || 0,
      lastUpdated: f.TPWallet.mapValue.fields.lastUpdatedAt.integerValue || null
    });

  } catch (err) {
    console.error("getwallet error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const getuserdata = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  const clean = (v) => {
    if (v === undefined || v === null) return null;
    const s = String(v).trim();
    return s === "" ? null : s;
  };

  try {
    const { uid } = req.body;

    if (!uid) {
      return res.json({ success: false, error: "Missing uid" });
    }

    const snap = await db.get(`Users/${uid}`);
    const user = snap.fields || {};

    let displayName =
      user.TPIdentity.mapValue.fields.displayName.stringValue;

    if (!displayName || displayName.trim() === "") {
      displayName = await generateUniqueDisplayName({
        email: user.TPIdentity.mapValue.fields.email.stringValue,
        context: "ui"
      });

      await db.update(`Users/${uid}`, {
        TPIdentity: {
          displayName: { stringValue: displayName }
        }
      });
    }

    const requiredDefaults = {
      TPIdentity: {
        email: { stringValue: user.TPIdentity.mapValue.fields.email.stringValue || null },
        createdAt: { integerValue: PulseRealm.PulseNOW },
        updatedAt: { integerValue: PulseRealm.PulseNOW },
        lastAppActive: { integerValue: PulseRealm.PulseNOW }
      },
      TPLoyalty: {
        referralCode: { stringValue: null },
        pointsBalance: { integerValue: 0 }
      },
      TPWallet: {
        walletBalance: { integerValue: 0 }
      },
      isLoggedIn: { booleanValue: true }
    };

    await db.update(`Users/${uid}`, requiredDefaults);

    return res.json({
      success: true,
      user: {
        uid,
        TPIdentity: {
          email: clean(requiredDefaults.TPIdentity.email.stringValue),
          displayName: clean(displayName)
        }
      }
    });

  } catch (err) {
    console.error("getuserdata error:", err);
    return res.json({ success: false, error: "Server error " + err.message });
  }
};


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

function normalize(text) {
  if (!text) return "";

  return text
    .toLowerCase()

    // Remove control characters (keep emojis)
    .replace(/[\u0000-\u001F]/g, "")

    // Keep letters, numbers, spaces, apostrophes, and your emoji set
    .replace(
      /[^\p{L}\p{N}\s'🤔👀😂🤣😄😆😎✨🔥🌴🌊🏝️]/gu,
      ""
    )

    // Strip accents (á → a)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

    // Collapse multiple spaces
    .replace(/\s+/g, " ")

    .trim();
}

export const getServerTime = onRequest(
  { region: "us-central1", timeoutSeconds: 45, memory: "512MiB" },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      const now = PulseRealm.PulseNOW.toMillis();
      return res.json({ success: true, serverNow: now });
    } catch (err) {
      console.error("getServerTime error:", err);
      return res.json({ success: false, error: "Server error" });
    }
  }
);

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

function handleWhatCanYouDo() {
  return (
    "🧭 <b>What I Can Do</b><br><br>" +
    "• Track your Balance, Points, Rank, and Streak.<br>" +
    "• Estimate Points from receipts.<br>" +
    "• Help you earn more across the island.<br>" +
    "• Guide you to Food, Bars, Beaches, Tours, and Events.<br>" +
    "• Show Weather, Waves, Sargassum, Storms, Wildlife, and Moon.<br>" +
    "• Explain Belize, San Pedro, and local facts.<br><br>" +
    "I’m your guide to the island — and to your loyalty journey."
  );
}

function handleWhoAreYou() {
  return (
    "🌀 <b>I am the Vault Spirit</b> — the intelligence woven through Pulse World.<br><br>" +
    "I watch over your Balance, your Points, your Streak… but also the Island itPulseRealm.<br>" +
    "I’m connected to the largest real‑time business, event, and environment database in Belize.<br><br>" +
    "Ask me about any place, any tour, any beach, any event — I’ll guide you."
  );
}

function handleHowAreYou() {
  const variants = [
    "🌤️ The Vault feels calm today — the island’s energy is steady.",
    "🌙 I’m glowing softly — thank you for asking.",
    "🔥 The Vault hums with energy — lots happening across the island.",
    "🌴 I’m here, present, and ready to guide you through San Pedro."
  ];
  return pick(variants);
}

function strongNameMatch(a, b) {
  if (!a || !b) return false;

  // exact match
  if (a === b) return true;

  // one contains the other (brand variants)
  if (a.includes(b) || b.includes(a)) return true;

  // business-type blockers
  const types = ["hotel", "bar", "restaurant", "kitchen", "spa", "dive", "shop"];
  const aType = types.find(t => a.includes(t));
  const bType = types.find(t => b.includes(t));

  // if they have different business types → do NOT merge
  if (aType && bType && aType !== bType) return false;

  // distance-based similarity
  const dist = levenshtein(a, b);

  // short names → stricter
  if (a.length <= 8 || b.length <= 8) return dist <= 1;

  // longer names → allow small edits
  return dist <= 2;
}

function levenshtein(a, b) {
  if (!a || !b) return Infinity;
  if (a === b) return 0;

  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
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

export function getDayName(offset) {
  const today = new Date();
  const target = new Date(today);
  target.setDate(today.getDate() + offset);

  return target.toLocaleDateString("en-US", { weekday: "long" });
}

// ---------------------------------------------------------
// FINAL DETECTINTENT()
// ---------------------------------------------------------
// function detectIntent(text) {
//   if (!text || text.trim() === "") return "unknown";

//   const t = normalize(text);
//   const is = (word) => fuzzyMatch(t, word);
//   const has = (...words) => words.some(w => t.includes(w));
//   const starts = (...words) => words.some(w => t.startsWith(w));
//   const isMath = /\d+(\s*[+\-*/x×÷]\s*\d+)/.test(t);

//   // ------------------------------------
//   // 0. GREETING SHOULD NEVER FUZZY MATCH HELP
//   // ------------------------------------
//   const GREETINGS = ["hi","hey","hello","hola","yo","sup","hey!","hi!","hello!"];
//   if (GREETINGS.includes(t) || GREETINGS.includes(t.split(" ")[0])) {
//     return "greeting";
//   }

//   // ------------------------------------
//   // 1. ULTRA PRIORITY (ALWAYS WINS)
//   // ------------------------------------

//   // LOCKDOWN / DANGER MODE
//   if (has("lockdown","danger mode","app lock","lock the app","panic mode")) {
//     return "danger_lockdown";
//   }

//   // REMINDERS
//   if (starts("remind me","set a reminder","remember","don't let me forget")) {
//     return "set_reminder";
//   }

//   // SEND POINTS / SEND BALANCE
//   if (starts("send","give","transfer")) {
//     const emailLike = t.match(/[a-z0-9._%+-]+@[a-z0-9.-]+/i);
//     const usernameLike = t.match(/\b[a-z0-9]{3,}\b/);

//     if (emailLike || usernameLike) {
//       if (has("points")) return "send_points";
//       if (has("balance","money")) return "send_balance";
//       return "send_unknown";
//     }
//   }

//   // DIRECTIONS
//   if (has("directions","how do i get","navigate","route to","como llegar","weh di place deh")) {
//     return "directions";
//   }

//   // ------------------------------------
//   // 2. HIGH PRIORITY INTENTS
//   // ------------------------------------

//   // WEATHER FAMILY
//   if (has("weather","rain","storm","storms","wind","windy","waves","surf",
//           "sea","ocean","tide","sargassum","humidity","heat","hot",
//           "wildlife","animals","bugs","mosquitos","crocodile","shark")) {

//     if (has("wind")) return "wind";
//     if (has("waves","surf")) return "waves";
//     if (has("sargassum")) return "sargassum";
//     if (has("humidity")) return "humidity";
//     if (has("moon")) return "moon";
//     if (has("wildlife","animals","shark","crocodile")) return "wildlife";
//     if (has("storm","storms")) return "storms";

//     return "weather";
//   }

//   // EVENTS
//   if (has("event","events","happening","tonight","today","weekend",
//           "live music","party","festival","show","band")) {

//     if (has("today","tonight")) return "events_today";
//     return "events_upcoming";
//   }

//   // ------------------------------------
//   // 3. MATH / POINTS / BALANCE PRIORITY
//   // ------------------------------------

//   // MATH ALWAYS WINS IF NUMBERS + OPERATORS
//   if (isMath) return "math";

//   // POINTS
//   if (has("points","pulse points")) {
//     if (has("how much","estimate","calculate","earn","get","worth")) {
//       return "estimate_points";
//     }
//     if (isMath) return "math";
//     return "points";
//   }

//   // BALANCE
//   if (has("balance","my money","my credits","saldo")) {
//     return "balance";
//   }

//   // RANK
//   if (has("rank","tier","level","nivel","rango")) {
//     return "rank_info";
//   }

//   // REFERRAL
//   if (has("referral","refer","invite")) {
//     return "referral_info";
//   }

//   // REWARDS
//   if (has("reward","redeem","perks","benefits","canjear")) {
//     return "redeem_points";
//   }

//   // ------------------------------------
//   // IDENTITY + PERSONALITY WORD LISTS
//   // ------------------------------------
//   const HOW_ARE_YOU_WORDS = [
//     "how are you","how r u","how you doing","how are u",
//     "how you feeling","you good","are you ok","are you okay",
//     "como estas","todo bien","estas bien"
//   ];

//   const WHO_ARE_YOU_WORDS = [
//     "who are you","what are you","tell me about yourself",
//     "tell me about you","describe yourself","explain yourself",
//     "what is this","what is this system","what is Pulse World",
//     "what is the vault","what is this app","what is this console",
//     "what is this database","what are you supposed to be",
//     "what are you exactly","what are you doing","what are you for",
//     "quien eres","que eres","que es esto"
//   ];

//   const WHAT_CAN_YOU_DO_WORDS = [
//     "what can you do","what do you do","what are your abilities",
//     "what are your powers","what can u do","what u do",
//     "how do you work","how does this work","what is your purpose",
//     "what can you help with","what can you show me","what can you tell me"
//   ];

//   // ------------------------------------
//   // CATEGORY WORD LISTS
//   // ------------------------------------
//   const FOOD_WORDS = [
//     "food","eat","eats","restaurant","restaurante","comida",
//     "almuerzo","cena","breakfast","lunch","dinner",
//     "where to eat","good food","hungry","meal","nyam","weh fi eat"
//   ];

//   const BAR_WORDS = [
//     "bar","bars","drink","drinks","tragos","cantina","cerveza",
//     "cocktail","cocktails","happy hour","shots","nightlife",
//     "weh di drinks deh","where to drink"
//   ];

//   const BEACH_WORDS = [
//     "beach","beaches","playa","playas","bech","shore","seaside",
//     "best beach","nice beach","where is the beach"
//   ];

//   const TOUR_WORDS = [
//     "tour","tours","snorkel","snorkling","snorkeling","excursion",
//     "excursiones","reef","shark ray","hol chan","blue hole",
//     "boat tour","catamaran","sailing","diving","dive","marine tour"
//   ];

//   const CART_WORDS = [
//     "cart","carts","golf cart","golfcart","carrito","alquiler carrito",
//     "rentar carrito","rent cart","cart rental","buggy","golf buggy",
//     "rent a cart","cart hire","need a cart"
//   ];

//   const EVENTS_TODAY_WORDS = [
//     "today","tonight","hoy","esta noche","fiesta hoy",
//     "party tonight","events today","today events","what's on tonight"
//   ];

//   const EVENTS_UPCOMING_WORDS = [
//     "upcoming","pronto","eventos","future events","futuro",
//     "this week events","weekend events","coming up","what's coming"
//   ];

//   const WEATHER_NOW_WORDS = [
//     "weather now","clima ahora","tiempo ahora",
//     "how's the weather","como esta el clima",
//     "current weather","clima actual","right now weather",
//     "weather rn","wx now","wthr now"
//   ];

//   const WEATHER_TODAY_WORDS = [
//     "weather today","clima hoy","forecast today",
//     "pronostico hoy","today weather","hoy clima",
//     "today forecast","wx today","wthr today"
//   ];

//   const WEATHER_TOMORROW_WORDS = [
//     "weather tomorrow","clima mañana","forecast tomorrow",
//     "pronostico mañana","tomorrow weather","mañana clima",
//     "tmrw weather","tmr weather","wx tomorrow","wthr tomorrow"
//   ];

//   const WEATHER_WEEK_WORDS = [
//     "weather week","weekly weather","7 day forecast","7-day forecast",
//     "7 day","7day","7-day","week forecast","forecast week",
//     "week outlook","weekly outlook","weather 7","7d forecast",
//     "wx week","wx7","wthr week","wthr7","7 day weather"
//   ];

//   const WEATHER_WORDS = [
//     "weather","clima","tiempo","wether","weh di weather",
//     "forecast","pronostico","wx","wthr"
//   ];

//   const WIND_WORDS = ["wind","viento","breeze","brisa","windy","strong wind"];
//   const WAVES_WORDS = ["waves","olas","oleaje","surf","swell","wave height"];
//   const SARGASSUM_WORDS = ["sargassum","sargazo","seaweed","weed on beach"];
//   const MOON_WORDS = ["moon","luna","lunar","full moon","new moon","moon phase"];

//   const DIRECTIONS_WORDS = [
//     "directions","direccion","como llegar","where is",
//     "weh di place deh","how do i get","how to get","map","navigate"
//   ];

//   const COMFORT_WORDS = [
//     "sad","triste","upset","necesito hablar","i feel bad","comfort",
//     "anxious","stressed","overwhelmed","lonely","down"
//   ];
//   // ------------------------------------
//   // 4. BUSINESS CATEGORIES
//   // ------------------------------------

//   if (has(...FOOD_WORDS)) return "food";
//   if (has(...BAR_WORDS)) return "bars";
//   if (has(...BEACH_WORDS)) return "beaches";
//   if (has(...TOUR_WORDS)) return "tours";
//   if (has(...CART_WORDS)) return "carts";

//   // ------------------------------------
//   // 5. EVENTS (WORD LISTS)
//   // ------------------------------------

//   if (has(...EVENTS_TODAY_WORDS)) return "events_today";
//   if (has(...EVENTS_UPCOMING_WORDS)) return "events_upcoming";

//   // ------------------------------------
//   // 6. WEATHER (WORD LISTS)
//   // ------------------------------------

//   if (has(...WEATHER_NOW_WORDS)) return "weather_now";
//   if (has(...WEATHER_TODAY_WORDS)) return "weather_today";
//   if (has(...WEATHER_TOMORROW_WORDS)) return "weather_tomorrow";
//   if (has(...WEATHER_WEEK_WORDS)) return "weather_week";

//   if (has(...WEATHER_WORDS)) return "weather";
//   if (has(...WIND_WORDS)) return "wind";
//   if (has(...WAVES_WORDS)) return "waves";
//   if (has(...SARGASSUM_WORDS)) return "sargassum";
//   if (has(...MOON_WORDS)) return "moon";

//   // ------------------------------------
//   // 7. HELP / SUMMARY / ENVIRONMENT
//   // ------------------------------------

//   if (has("help","lost","confused","how does this work","what do i do")) {
//     return "help";
//   }

//   if (has("summary","status","conditions","environment","island status")) {
//     return "summary";
//   }

//   // ------------------------------------
//   // 8. PERSONALITY / IDENTITY
//   // ------------------------------------

//   if (has(...HOW_ARE_YOU_WORDS)) return "how_are_you";
//   if (has(...WHO_ARE_YOU_WORDS)) return "who_are_you";
//   if (has(...WHAT_CAN_YOU_DO_WORDS)) return "what_can_you_do";

//   // ------------------------------------
//   // 9. REMINDER META‑INTENT (TYPO TOLERANT)
//   // ------------------------------------

//   const REMINDER_WORDS = [
//     "remind me","remind","remember","remember to","remember that",
//     "dont let me forget","don't let me forget","next time remind",
//     "please remind","please remember","rmember","remembr","remindr",
//     "remidn","rememebr"
//   ];

//   for (const w of REMINDER_WORDS) {
//     if (t.includes(w)) return "set_reminder";
//   }

//   // ------------------------------------
//   // INTENT MAP
//   // ------------------------------------
//   const intentMap = [
//     // Vault intro should NOT trigger on greetings
//     { intent: "vault_intro", words: ["start", "open vault", "vault intro", "begin"] },
//     { intent: "greeting", words: ["hi","hello","hey","hola","hey there","hi there"] },


//     // Identity + personality intents
//     { intent: "how_are_you", words: HOW_ARE_YOU_WORDS },
//     { intent: "who_are_you", words: WHO_ARE_YOU_WORDS },
//     { intent: "what_can_you_do", words: WHAT_CAN_YOU_DO_WORDS },


//     { intent: "help", words: ["help","ayuda","assist","menu","options","what can i do","how does this work"] },
//     { intent: "summary", words: ["summary","status","conditions","resumen","overview","island summary"] },
//     { intent: "environment", words: ["environment","entorno","climate overview"] },
//     { intent: "conditions", words: ["conditions","condiciones","current conditions"] },
//     { intent: "island_status", words: ["island status","estado isla","island situation"] },

//     { intent: "balance", words: ["balance","saldo","dinero","balnce","my balance","wallet"] },
//     { intent: "math", words: ["calculate","math","calc","cuanto es","do the math","sum this"] },
//     { intent: "points", words: ["points","puntos","pts","ponts","my points","how many points"] },
//     { intent: "earn_points", words: ["earn","earning","ganar puntos","how to earn","earn more","get points"] },
//     { intent: "estimate_points", words: ["estimate","estimar","how many points","points estimate","approx points"] },
//     { intent: "redeem_points", words: ["redeem","canjear","usar puntos","spend points","use my points"] },
//     { intent: "rank_info", words: ["rank","rango","nivel","my level","loyalty level"] },
//     { intent: "future_scenario", words: ["future","futuro","scenario","what if","imagine"] },

//     { intent: "bot_name", words: ["your name","quien eres","who are you","what are you called"] },
//     { intent: "capabilities", words: ["what can you do","capacidades","abilities","what do you do","what u do","what can u","capabilities","cap","skills","powers"] },
//     { intent: "bot_real", words: ["are you real","eres real","are you alive","are you a real person"] },
//     { intent: "secret", words: ["secret","secreto","tell me a secret"] },
//     { intent: "story", words: ["story","historia","cuento","tell me a story"] },
//     { intent: "joke", words: ["joke","chiste","jaja","make me laugh","tell me something funny"] },

//     { intent: "tourist_help", words: ["tourist","turista","visitor","help me explore","first time here","new here","just arrived"] },

//     { intent: "food", words: FOOD_WORDS },
//     { intent: "bars", words: BAR_WORDS },
//     { intent: "beaches", words: BEACH_WORDS },
//     { intent: "tours", words: TOUR_WORDS },
//     { intent: "carts", words: CART_WORDS },

//     { intent: "events_today", words: EVENTS_TODAY_WORDS },
//     { intent: "events_upcoming", words: EVENTS_UPCOMING_WORDS },

//     { intent: "directions", words: DIRECTIONS_WORDS },
//     { intent: "island_facts", words: ["island facts","datos isla","san pedro facts","about the island"] },
//     { intent: "belize_facts", words: ["belize facts","datos belice","belice info","about belize"] },
//     { intent: "nearby", words: ["nearby","cerca","close","alrededor","near me","around me"] },
//     { intent: "open_now", words: ["open now","abierto","abiertos ahora","what's open","open places"] },

//     { intent: "weather_now", words: WEATHER_NOW_WORDS },
//     { intent: "weather_today", words: WEATHER_TODAY_WORDS },
//     { intent: "weather_tomorrow", words: WEATHER_TOMORROW_WORDS },
//     { intent: "weather_week", words: WEATHER_WEEK_WORDS },

//     { intent: "weather", words: WEATHER_WORDS },
//     { intent: "wind", words: WIND_WORDS },
//     { intent: "waves", words: WAVES_WORDS },
//     { intent: "sargassum", words: SARGASSUM_WORDS },
//     { intent: "moon", words: MOON_WORDS },
//     { intent: "humidity", words: ["humidity","humedad","humid","moisture","muggy"] },

//     { intent: "wildlife", words: [
//       "wildlife","animals","animal","turtle","turtles","dolphin","dolphins",
//       "manatee","manatees","ray","rays","stingray","shark","sharks","iguana",
//       "iguanas","crab","crabs","fish","fishes","crocs","crocodile","crocodiles",
//       "jellyfish","sea life","marine life"
//     ]},

//     { intent: "storms", words: [
//       "storm","storms","hurricane","tropical","cyclone","tormenta",
//       "bad weather","storm coming","stormy"
//     ]},

//     { intent: "comfort", words: COMFORT_WORDS },
//     { intent: "thanks", words: ["thanks","gracias","thank you","ty","thx"] },
//     { intent: "goodbye", words: ["bye","adios","goodbye","hasta luego","see you","later"] },
//   ];

//   // ------------------------------------
//   // 10. STRONG INTENT OVERRIDE
//   // ------------------------------------

//   const strongIntents = [
//     "food","bars","beaches","tours","carts",
//     "events_today","events_upcoming",
//     "weather_now","weather_today","weather_tomorrow","weather_week",
//     "weather","wind","waves","sargassum","moon","humidity",
//     "wildlife","storms","nearby","open_now","directions"
//   ];

//   for (const item of intentMap) {
//     if (strongIntents.includes(item.intent)) {
//       for (const w of item.words) {
//         if (fuzzyMatch(t, w)) {
//           return item.intent;
//         }
//       }
//     }
//   }

//   // ------------------------------------
//   // 11. MATH FALLBACK
//   // ------------------------------------
//   if (isMath) return "math";

//   // ------------------------------------
//   // 12. FUZZY PERSONALITY FALLBACK
//   // ------------------------------------

//   if (is("joke") || is("funny") || is("make me laugh") || is("say something funny"))
//     return "joke";

//   if (is("bored") || is("tired") || is("lonely") || is("stressed") || is("sad"))
//     return "comfort";

//   if (is("secret") || is("lore") || is("magic") || is("mystery") || is("something cool"))
//     return "secret";

//   if (is("recommend") || is("where should i go") || is("what should i do") ||
//       is("what's good") || is("what's fun") || is("what's cool"))
//     return "recommendation";

//   if (is("curious") || is("wondering") || is("just looking") || is("just exploring") ||
//       is("checking things out") || is("tell me more") || is("what is this") ||
//       is("what are you") || is("what can you do") || is("what does this do"))
//     return "curious";

//   if (is("san pedro") || is("belize") || is("island") || is("ambergris") ||
//       is("what's around") || is("what's here"))
//     return "island_facts";

//   // ------------------------------------
//   // 13. FINAL FALLBACK
//   // ------------------------------------
//   return "generic";
// }
export const updateUserRecord = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 60,
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
      // -----------------------------
      // BASIC VALIDATION
      // -----------------------------
      const { uid, name, email, phone, country, role, smsOpt, emailOpt, photoURL, displayName } = req.body;

      if (!uid) {
        return res.json({ success: false, error: "Missing uid" });
      }

      if (!email) {
        return res.json({ success: false, error: "Missing email" });
      }

      // -----------------------------
      // LOAD EXISTING USER
      // -----------------------------
      const userRef = db.collection("Users").doc(uid);
      const existing = (await userRef.get()).data() || {};

      // -----------------------------
      // SANITIZE DISPLAY NAME
      // -----------------------------
      const cleanDisplayName = sanitizeDisplayName(displayName || "");

      // -----------------------------
      // NORMALIZE PHONE
      // -----------------------------
      const normalizedPhone = normalizePhone(phone, country);

      // -----------------------------
      // DISPLAY NAME UNIQUENESS CHECK
      // -----------------------------
      const taken = await db
        .collection("Users")
        .where("TPIdentity.displayName", "==", cleanDisplayName)
        .get();

      if (!taken.empty && taken.docs[0].id !== uid) {
        return res.json({
          success: false,
          error: "Display Name Already Taken."
        });
      }

      // -----------------------------
      // BUILD UPDATED USER RECORD
      // -----------------------------
      const normalized = normalizeUserRecord({

        ...existing,

        // ⭐ TPIdentity
        TPIdentity: {
          ...(existing.TPIdentity || {}),
          name,
          email: email.toLowerCase(),
          phone: normalizedPhone,
          country,
          role,
          displayName: cleanDisplayName,
          photoURL
        },

        // ⭐ TPPreferences
        TPPreferences: {
          ...(existing.TPPreferences || {}),
          receiveSMS: smsOpt,
          receiveMassEmails: emailOpt
        },

        // ⭐ TPLoyalty (preserve existing)
        TPLoyalty: {
          ...(existing.TPLoyalty || {})
        },

        // ⭐ TPNotifications (preserve existing)
        TPNotifications: {
          ...(existing.TPNotifications || {})
        },

        // ⭐ TPWallet (preserve existing)
        TPWallet: {
          ...(existing.TPWallet || {})
        },

        // ⭐ TPSecurity (preserve existing)
        TPSecurity: {
          ...(existing.TPSecurity || {})
        }
      });

      // -----------------------------
      // SAVE TO FIRESTORE
      // -----------------------------
      await userRef.set(normalized, { merge: true });

      // -----------------------------
      // DONE
      // -----------------------------
      return res.json({
        success: true,
        displayName: cleanDisplayName
      });

    } catch (err) {
      console.error("updateUserRecord error:", err);
      return res.json({ success: false, error: "Server error: " + err.message });
    }
  }
);


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

// export const scrapeMenu = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 120,
//     memory: "1GiB"
//   },
//   async (req, res) => {
//   log("──────────────────────────────────────────────");
//   log("🌴 scrapeMenu invoked");
//   log("Incoming query:", req.query);

//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Headers", "*");

//   if (req.method === "OPTIONS") {
//     log("⚪ Preflight OPTIONS request");
//     res.status(204).send("");
//     return;
//   }

//   const url = req.query.url;
//   if (!url) {
//     log("❌ Missing ?url=");
//     res.status(400).json({ error: "Missing ?url=" });
//     return;
//   }

//   log("🌐 Fetching URL:", url);

//   try {
//     const controller = new AbortController();
//     const timeout = setTimeout(() => {
//       log("⏳ TIMEOUT — aborting fetch");
//       controller.abort();
//     }, 15000);

//     log("➡️ Starting fetch with headers:");
//     log({
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
//         "(KHTML, like Gecko) Chrome/123.0 Safari/537.36",
//       Accept: "*/*"
//     });

//     const response = await fetch(url, {
//       method: "GET",
//       redirect: "follow",
//       signal: controller.signal,
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
//           "(KHTML, like Gecko) Chrome/123.0 Safari/537.36",
//         Accept: "*/*"
//       }
//     });

//     clearTimeout(timeout);

//     log("📥 Response received:");
//     log("Status:", response.status);
//     log("StatusText:", response.statusText);

//     const contentType = response.headers.get("content-type") || "";
//     log("📄 Content-Type:", contentType);

//     const contentLength = response.headers.get("content-length");
//     log("📏 Content-Length header:", contentLength);

//     const isPdf =
//       url.toLowerCase().endsWith(".pdf") ||
//       contentType.includes("pdf");

//     const isImage =
//       contentType.startsWith("image/") ||
//       url.match(/\(png|jpg|jpeg|webp|gif|svg)$/i);

//     log("🔍 PDF detection:", isPdf ? "YES" : "NO");
//     log("🖼️ Image detection:", isImage ? "YES" : "NO");

//     /* -------------------------------------------------------
//        IMAGE MODE
//     ------------------------------------------------------- */
//     if (isImage) {
//       log("🖼️ Image mode triggered — reading arrayBuffer()…");

//       const arrayBuffer = await response.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       log("📦 Image byte length:", buffer.length);

//       res.set("Content-Type", contentType);
//       res.set("Content-Length", buffer.length.toString());
//       res.status(200).send(buffer);

//       log("✅ Image sent successfully");
//       log("──────────────────────────────────────────────");
//       return;
//     }

//     /* -------------------------------------------------------
//        PDF MODE
//     ------------------------------------------------------- */
//     if (isPdf) {
//       log("📄 PDF mode triggered — reading arrayBuffer()…");

//       const arrayBuffer = await response.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       log("📦 PDF byte length:", buffer.length);

//       res.set("Content-Type", "application/pdf");
//       res.set("Content-Length", buffer.length.toString());
//       res.status(200).send(buffer);

//       log("✅ PDF sent successfully");
//       log("──────────────────────────────────────────────");
//       return;
//     }

//     /* -------------------------------------------------------
//        HTML / TEXT MODE
//     ------------------------------------------------------- */
//     log("📝 HTML/text mode triggered — reading text()…");
//     const text = await response.text();

//     log("📏 HTML/text length:", text.length);
//     log("➡️ Sending text to client…");

//     res.set("Content-Type", "text/plain; charset=utf-8");
//     res.status(200).send(text);

//     log("✅ Text sent successfully");
//     log("──────────────────────────────────────────────");
//     return;

//   } catch (err) {
//     log("❌ ERROR in scrapeMenu:");
//     log("Message:", err.message);
//     log("Stack:", err.stack);

//     res.status(500).json({ error: err.message || "Unknown error" });

//     log("──────────────────────────────────────────────");
//   }
// });

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
      log("🟦 Preflight OPTIONS request — returning 204");
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

function buildOpenNowList(list, category, userLoc) {
  const top = list
    .map(item => {
      const n = isNearby(item, userLoc);
      return { item, n };
    })
    .sort((a, b) => b.n.score - a.n.score)
    .slice(0, 5);

  let msg = `⏳ <b>Open Now — ${category}</b><br><br>`;

  for (const { item, n } of top) {
    const isEvent = !!item.title && !item.busname;
    const name = item.busname || item.title || "Unnamed";

    const timeRange = isEvent ? formatEventTimeRange(item) : null;
    const label = isEvent ? "🎫 Event" : "🏝️ Business";

    msg += `• <b>${name}</b> <span style="opacity:0.7">(${label})</span><br>`;
    msg += `   ${n.distanceText} ${n.directionHint}`;

    if (timeRange) msg += ` • <i>${timeRange}</i>`;

    msg += `<br><br>`;
  }

  return {
    speaker: "Vault Spirit",
    text: msg,
    optionsHtml: ""
  };
}

function buildNearbyList(list, category, userLoc) {
  const top = list
    .map(item => {
      const n = isNearby(item, userLoc);
      return { item, n };
    })
    .sort((a, b) => b.n.score - a.n.score)
    .slice(0, 5);

  let msg = `🌴 <b>Nearby ${category}</b><br><br>`;

  for (const { item, n } of top) {
    const isEvent = !!item.title && !item.busname;
    const name = item.busname || item.title || "Unnamed";

    const timeRange = isEvent ? formatEventTimeRange(item) : null;
    const label = isEvent ? "🎫 Event" : "🏝️ Business";

    msg += `• <b>${name}</b> <span style="opacity:0.7">(${label})</span><br>`;
    msg += `   ${n.distanceText} ${n.directionHint}`;

    if (timeRange) msg += ` • <i>${timeRange}</i>`;

    msg += `<br><br>`;
  }

  return {
    speaker: "Vault Spirit",
    text: msg,
    optionsHtml: ""
  };
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
  const start = PulseRealm.PulseNOW;

  log("==============================================");
  log("🔮 detectUpgradedIntent() INVOKED");
  log("📝 RAW INPUT:", text);

  const t = text.trim().toLowerCase();
  log("🔧 NORMALIZED:", t);

  const step = (msg) => log("   🧭", msg);

  const has = (...words) => {
    const hit = words.find(w => t.includes(w));
    if (hit) step(`has("${hit}") matched`);
    return !!hit;
  };

  const starts = (...words) => {
    const hit = words.find(w => t.startsWith(w));
    if (hit) step(`starts("${hit}") matched`);
    return !!hit;
  };

  const isMath = /\d+(\s*[+\-*/x×]\s*\d+)/.test(t);
  if (isMath) step("🧮 MATH DETECTED");

  // ------------------------------------
  // 0. ULTRA PRIORITY
  // ------------------------------------
  step("Checking ULTRA PRIORITY intents...");

  if (has("lockdown", "danger mode", "app lock", "lock the app", "panic mode")) {
    step("INTENT: danger_lockdown");
    return "danger_lockdown";
  }

  if (starts("remind me", "set a reminder", "remember", "don't let me forget")) {
    step("INTENT: set_reminder (direct start match)");
    return "set_reminder";
  }

  if (starts("tell me")) {
    step("tell me... checking exclusions");

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

    const exclusionHit = excluded.find(x => t.includes(x));

    if (exclusionHit) {
      step(`❌ Exclusion triggered: ${exclusionHit}`);
    } else {
      step("INTENT: set_reminder (tell me)");
      return "set_reminder";
    }
  }

  if (has("hello", "hi", "hey", "yo", "hola", "sup", "wassup", "whats up")) {
    step("INTENT: greeting");
    return "greeting";
  }

  // SEND POINTS / BALANCE
  if (starts("send", "give", "transfer")) {
    step("Checking send/balance logic...");

    const emailLike = t.match(/[a-z0-9._%+-]+@[a-z0-9.-]+/i);
    const usernameLike = t.match(/\b[a-z0-9]{3,}\b/);

    if (emailLike || usernameLike) {
      step(`✔ Recipient detected: ${emailLike || usernameLike}`);

      if (has("points")) {
        step("INTENT: send_points");
        return "send_points";
      }
      if (has("balance", "money")) {
        step("INTENT: send_balance");
        return "send_balance";
      }

      step("INTENT: send_unknown");
      return "send_unknown";
    }
  }

  if (
    has("directions", "how do i get to", "navigate to", "route to", "take me to", "go to", "tell me how") ||
    starts("directions to")
  ) {
    step("INTENT: directions");
    return "directions";
  }

  // ------------------------------------
  // 1. HIGH PRIORITY INTENTS
  // ------------------------------------
  step("Checking HIGH PRIORITY intents...");

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

  if (has(
    "weather", "rain", "storm", "storms", "wind", "windy", "waves", "surf",
    "sea", "ocean", "tide", "sargassum", "sarg", "humidity", "heat", "moons", "hot",
    "wildlife", "animals", "bugs", "mosquitos", "crocodile", "shark", "turtle",
    "beach quality", "beach conditions", "beach report", "beach day",
    ...wildlifeKeywords
  )) {
    step("🌦 WEATHER FAMILY triggered");

    if (has("beach quality", "beach conditions", "beach report", "beach day", "how is beach")) {
      step("INTENT: beach_quality");
      return "beach_quality";
    }

    if (has("wind", "windy")) {
      step("INTENT: wind");
      return "wind";
    }

    if (has("waves", "surf", "sea", "ocean", "tide")) {
      step("INTENT: waves");
      return "waves";
    }

    if (has("sargassum", "sarg")) {
      step("INTENT: sargassum");
      return "sargassum";
    }

    if (has("humidity")) {
      step("INTENT: humidity");
      return "humidity";
    }

    if (has("heat", "hot")) {
      step("INTENT: heat");
      return "heat";
    }

    if (has("moon", "moons")) {
      step("INTENT: moon");
      return "moon";
    }

    if (has("storm", "storms")) {
      step("INTENT: storms");
      return "storms";
    }

    const wildlifeHit = wildlifeKeywords.find(k => t.includes(k));
    if (wildlifeHit) {
      step(`🦎 WILDLIFE HIT: ${wildlifeHit}`);
      step("INTENT: wildlife");
      return { intent: "wildlife", target: wildlifeHit };
    }
  }

  // EVENTS
  if (has("event", "events", "happening", "tonight", "today", "weekend", "live music", "party", "festival", "show", "band")) {
    step("🎉 EVENTS triggered");

    if (has("today", "tonight", "now")) {
      step("INTENT: events_today");
      return "events_today";
    }

    step("INTENT: events_upcoming");
    return "events_upcoming";
  }

  // ------------------------------------
  // 2. MATH / POINTS / BALANCE
  // ------------------------------------
  if (isMath) {
    step("INTENT: math");
    return "math";
  }

  if (has("points", "pulse points")) {
    step("POINTS logic triggered");

    if (has("redeem") && /\b\d{3,}\b/.test(t)) {
      step("INTENT: redeem_points (partial)");
      return "redeem_points";
    }

    if (has("how much", "estimate", "calculate", "earn", "get", "worth")) {
      step("INTENT: estimate_points");
      return "estimate_points";
    }

    step("INTENT: points");
    return "points";
  }

  if (has("balance", "my money", "my credits", "wallet", "money")) {
    step("INTENT: balance");
    return "balance";
  }

  if (has("rank", "tier", "level", "streak")) {
    step("INTENT: rank_info");
    return "rank_info";
  }

  if (has("referral", "refer", "invite")) {
    step("INTENT: referral_info");
    return "referral_info";
  }

  if (has("reward", "redeem", "perks", "benefits")) {
    step("INTENT: redeem_points");
    return "redeem_points";
  }

  // ------------------------------------
  // 3. BUSINESS CATEGORIES
  // ------------------------------------
  const cat = extractCategory(t);
  if (cat) {
    step(`CATEGORY EXTRACTED: ${cat}`);
    step(`INTENT: ${cat}`);
    return cat;
  }

  // ------------------------------------
  // 4. HELP / SUMMARY / ENVIRONMENT
  // ------------------------------------
  if (has("help", "lost", "confused", "how does this work", "what do i do", "ummm", "menu", "assistance", "assist", "ayuda", "ayudame")) {
    step("INTENT: help");
    return "help";
  }

  if (has("summary", "status", "conditions", "environment")) {
    step("INTENT: environment");
    return "environment";
  }

  // ------------------------------------
  // 5. FALLBACK
  // ------------------------------------
  step("⚠️ NO INTENT MATCHED — FALLBACK");
  step(`⏱ Duration: ${PulseRealm.PulseNOW - start} ms`);
  log("==============================================");

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

    log("💾 Conversation memory saved:", payload);

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

// ---------------------------------------------------------
// MAIN INTENT HANDLER
// ---------------------------------------------------------

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

export async function sendAdminInfoEmail(subject, payload = {}) {
  const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
  try {
    
    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px;">
        
        <!-- Pulse World Logo -->
        <div style="text-align:center; margin-bottom:20px;">
          <img 
            src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" 
            alt="Pulse World Logo" 
            style="width:80px; height:auto;"
          />
        </div>

        <h2 style="color:#0a84ff; text-align:center;">Pulse World — Admin Info Alert</h2>

        <p><b>Subject:</b> ${subject}</p>
        <p><b>Timestamp:</b> ${new Date().toISOString()}</p>

        <hr>

        <h3>Payload</h3>
        <pre style="background:#f4f4f4; padding:10px; border-radius:6px;">
        ${JSON.stringify(payload, null, 2)}
        </pre>

        <hr>

        <p style="color:#888; font-size:13px;">
          This is a Non‑Vital Automated Notice from the Vault Intelligence!
        </p>
      </div>
    `;

    await createEmailTransport.sendMail({
      from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
      to: "FordFamilyDelivery@gmail.com",   // or your admin inbox
      subject,
      html
    });

    log("📨 Admin Info Email Sent:", subject);

  } catch (err) {
    console.error("🔥 sendAdminInfoEmail FAILED:", err);
  }
}

export const getPulsePointsData = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {

    // ------------------------------------
    // CORS
    // ------------------------------------
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      // ------------------------------------
      // TOKEN + UID VALIDATION
      // ------------------------------------
      const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
      const { uid } = req.body || {};

      if (!token || !uid) {
        return res.status(403).json({ success: false, error: "Missing uid or token" });
      }

      const userRef = db.collection("Users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.json({ success: false, error: "User not found" });
      }

      const user = userSnap.data() || {};

      // NEW SCHEMA
      const TPIdentity = user.TPIdentity || {};
      const TPLoyalty = user.TPLoyalty || {};

      // Validate token
      if (!TPIdentity.resendToken || TPIdentity.resendToken !== token) {
        return res.status(403).json({ success: false, error: "Token mismatch" });
      }

      // ------------------------------------
      // ENSURE DISPLAY NAME
      // ------------------------------------
      let displayName = TPIdentity.displayName;

      if (!displayName || !String(displayName).trim()) {
        displayName = await generateUniqueDisplayName({
          email: TPIdentity.email,
          context: "ui"
        });

        await userRef.set(
          { TPIdentity: { ...TPIdentity, displayName } },
          { merge: true }
        );
      }

      // ------------------------------------
      // LOAD GLOBAL SETTINGS (NEW SCHEMA)
      // ------------------------------------
      const settingsSnap = await db.collection("TPSettings").doc("global").get();
      const settings = settingsSnap.data() || {};

      // ------------------------------------
      // STREAK LOGIC
      // ------------------------------------
      const lastEarnedDate = TPLoyalty.lastEarnedDate || null;
      let streakCount = Number(TPLoyalty.streakCount) || 0;

      const windowHours = (settings.streakDurationDays ?? 1) * 24;

      if (!lastEarnedDate) {
        streakCount = 0;
      } else {
        const lastMs = lastEarnedDate.toMillis();
        const expiresMs = lastMs + windowHours * 3600000;

        if (PulseRealm.PulseNOW >= expiresMs) {
          streakCount = 0;
          await userRef.set(
            { TPLoyalty: { ...TPLoyalty, streakCount: 0 } },
            { merge: true }
          );
        }
      }

      // ------------------------------------
      // TIER LOGIC
      // ------------------------------------
      const lifetimePoints = Number(TPLoyalty.lifetimePoints) || 0;

      const tierThresholds = {
        Seashell: 0,
        ReefDiver: settings.tierThreshold_ReefDiver,
        ToucanSpirit: settings.tierThreshold_ToucanSpirit,
        VolcanoHeart: settings.tierThreshold_VolcanoHeart,
        HurricaneLegend: settings.tierThreshold_HurricaneLegend
      };

      let tierKey = "Seashell";
      for (const [name, threshold] of Object.entries(tierThresholds)) {
        if (lifetimePoints >= threshold) tierKey = name;
      }

      const tierNameMap = {
        Seashell: "Seashell",
        ReefDiver: "Reef Diver",
        ToucanSpirit: "Toucan Spirit",
        VolcanoHeart: "Volcano Heart",
        HurricaneLegend: "Hurricane Legend"
      };

      const tier = tierNameMap[tierKey];
      const tierMultiplier = settings[`tierMultiplier_${tierKey}`] ?? 1;

      // ------------------------------------
      // STREAK MULTIPLIER
      // ------------------------------------
      const streakMultiplier = Math.min(
        settings.streakMultiplierBase +
          streakCount * settings.streakMultiplierPerDay,
        settings.streakMaxMultiplier
      );

      // ------------------------------------
      // SEASONAL LOGIC
      // ------------------------------------
      const {
        seasonalActive,
        seasonalName,
        seasonalMultiplier
      } = getSeasonFromSettings(settings);

      // ------------------------------------
      // REFERRAL CODE
      // ------------------------------------
      let referralCode = TPLoyalty.referralCode;

      if (!referralCode) {
        referralCode = `${(TPIdentity.name || "USER")
          .split(" ")[0]
          .toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`;

        await userRef.set(
          { TPLoyalty: { ...TPLoyalty, referralCode } },
          { merge: true }
        );
      }

      // ------------------------------------
      // HISTORY
      // ------------------------------------
      let history = [];
      try {
        history = await loadHistory(uid);
      } catch (err) {
        console.error("History load failed:", err);
      }

      // ------------------------------------
      // REFERRALS
      // ------------------------------------
      let referrals = [];

      try {
        const referredSnap = await db
          .collection("Users")
          .where("TPLoyalty.referredBy", "==", referralCode)
          .get();

        referrals = referredSnap.docs.map(doc => {
          const u = doc.data();
          const L = u.TPLoyalty || {};
          const I = u.TPIdentity || {};

          return {
            uid: doc.id,
            displayName: I.displayName || "New Explorer",
            lifetimePoints: Number(L.lifetimePoints) || 0,
            earnedForYou: Number(L.earnedForReferrer) || 0,
            joinedAt: u.createdAt ?? null
          };
        });
      } catch (err) {
        console.error("Referral load failed:", err);
      }

      // ------------------------------------
      // FINAL RESPONSE (NEW SCHEMA)
      // ------------------------------------
      return res.json({
        success: true,
        data: {
          TPIdentity: {
            displayName,
            ...TPIdentity
          },
          TPLoyalty: {
            ...TPLoyalty,
            streakCount,
            tier,
            tierKey,
            tierMultiplier,
            streakMultiplier,
            seasonalMultiplier,
            seasonalActive,
            seasonalName,
            referrals,
            history
          }
        }
      });

    } catch (err) {
      console.error("getPulsePointsData error:", err);

      return res.json({
        success: false,
        error: "Server error: " + err.message
      });
    }
  }
);

function getSeasonFromSettings(settings) {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mmdd = `${mm}-${dd}`;

  const periods = settings.seasonalPeriods || {};

  const isInRange = (date, start, end) => {
    // Normal range
    if (start <= end) return date >= start && date <= end;
    // Wrap-around (e.g., Dec 15 → Jan 10)
    return date >= start || date <= end;
  };

  for (const key in periods) {
    const s = periods[key];
    if (!s.start || !s.end) continue;

    if (isInRange(mmdd, s.start, s.end)) {
      return {
        seasonalActive: true,
        seasonalName: s.name || "",
        seasonalMultiplier: Number(s.multiplier) || 1
      };
    }
  }

  return {
    seasonalActive: false,
    seasonalName: "",
    seasonalMultiplier: 1
  };
}

export const getsettings = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
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
      // -----------------------------
      // LOAD TPSettings.global
      // -----------------------------
      const settingsDoc = await db
        .collection("TPSettings")
        .doc("global")
        .get();

      const root = settingsDoc.data() || {};

      // -----------------------------
      // VALIDATE seasonalPeriods
      // -----------------------------
      const seasonalPeriods = {};
      const rawPeriods = root.environment.seasonalPeriods || {};

      for (const key in rawPeriods) {
        const p = rawPeriods[key];
        if (!p.start || !p.end) continue;

        const valid =
          /^\d{2}-\d{2}$/.test(p.start) &&
          /^\d{2}-\d{2}$/.test(p.end) &&
          !isNaN(Number(p.multiplier));

        if (!valid) {
          await sendAdminInfoEmail(
            "Environment Warning: Invalid seasonalPeriods entry",
            {
              key,
              entry: p,
              note: "Non-vital warning. Seasonal period entry is malformed."
            }
          );
          continue;
        }

        seasonalPeriods[key] = p;
      }

      // -----------------------------
      // BASE ENVIRONMENT SETTINGS
      // -----------------------------
      const env = root.environment || {};

      const fullSettings = {
        enabled: env.enabled ?? true,
        calculationVersion: root.calculationVersion ?? 26,
        delayPenalty: root.delayPenalty ?? 15,

        ui: env.ui ?? {},
        weather: env.weather ?? {},
        perfectWeather: env.perfectWeather ?? {},
        seasons: env.seasons ?? {},
        marine: env.marine ?? {},
        holidays: env.holidays ?? {},
        sargassum: env.sargassum ?? {},
        storm: env.storm ?? {},
        sea: env.sea ?? {},
        moon: env.moon ?? {},
        multipliers: env.multipliers ?? {},

        seasonalPeriods,

        // TIER MULTIPLIERS
        tierMultiplier_Seashell: root.tierMultiplier_Seashell ?? 1,
        tierMultiplier_ReefDiver: root.tierMultiplier_ReefDiver ?? 1.07,
        tierMultiplier_ToucanSpirit: root.tierMultiplier_ToucanSpirit ?? 1.17,
        tierMultiplier_VolcanoHeart: root.tierMultiplier_VolcanoHeart ?? 1.30,
        tierMultiplier_HurricaneLegend: root.tierMultiplier_HurricaneLegend ?? 1.50,

        maxTotalMultiplier: root.maxTotalMultiplier ?? 3,

        // TIER THRESHOLDS
        tierThreshold_ReefDiver: Number(root.tierThreshold_ReefDiver) || 2500,
        tierThreshold_ToucanSpirit: Number(root.tierThreshold_ToucanSpirit) || 5000,
        tierThreshold_VolcanoHeart: Number(root.tierThreshold_VolcanoHeart) || 9000,
        tierThreshold_HurricaneLegend: Number(root.tierThreshold_HurricaneLegend) || 15000,

        // REFERRAL SETTINGS
        referralBaseBonus_NewUser: root.referralBaseBonus_NewUser ?? 25,
        referralBaseBonus_Referrer: root.referralBaseBonus_Referrer ?? 50,
        referralEarningRate: root.referralEarningRate ?? 15,
        referralStreakDurationHours: root.referralStreakDurationHours ?? 6,
        referralStreakMultiplier: root.referralStreakMultiplier ?? 1.1,
        seasonalReferralBonus_NewUser: root.seasonalReferralBonus_NewUser ?? 10,
        seasonalReferralBonus_Referrer: root.seasonalReferralBonus_Referrer ?? 20,

        // STREAK SETTINGS
        streakDurationDays: root.streakDurationDays ?? 1,
        streakMaxMultiplier: root.streakMaxMultiplier ?? 2,
        streakMultiplierBase: root.streakMultiplierBase ?? 1,
        streakMultiplierPerDay: root.streakMultiplierPerDay ?? 0.1,

        // FAST DELIVERY
        fastDeliveryBonusEnabled: root.fastDeliveryBonusEnabled ?? false,
        fastDeliveryBonusMinutes: root.fastDeliveryBonusMinutes ?? 60,
        fastDeliveryBonusPoints: root.fastDeliveryBonusPoints ?? 15
      };

      // -----------------------------
      // SEASONAL STATE
      // -----------------------------
      const seasonal = getSeasonFromSettings(fullSettings);

      // -----------------------------
      // LOAD ENVIRONMENTAL SIGNALS (NEW SCHEMA)
      // -----------------------------
      const stormsSnap = await db.collection("environment").doc("storms").get();
      const sargSnap = await db.collection("environment").doc("sargassum").get();
      const wildlifeSnap = await db.collection("environment").doc("wildlife").get();

      const storms = stormsSnap.exists ? stormsSnap.data().data || {} : {};
      const sargassum = sargSnap.exists ? sargSnap.data().data || {} : {};
      const wildlife = wildlifeSnap.exists ? wildlifeSnap.data().data || {} : {};

      // -----------------------------
      // FINAL RESPONSE
      // -----------------------------
      return res.json({
        success: true,
        settings: {
          TPSettings: fullSettings,
          seasonal,
          TPEnvironmentSignals: {
            storms,
            sargassum,
            wildlife
          }
        }
      });

    } catch (err) {
      console.error("getsettings error:", err);

      await sendAdminInfoEmail(
        "Environment Warning: getsettings",
        {
          error: err.message,
          note: "Non-vital warning. Settings document may be malformed."
        }
      );

      return res.json({
        success: false,
        error: "Server error: " + err.message
      });
    }
  }
);

// async function generateSettingsCache({ sizeOnly = false, deltaRequest = false } = {}) {

//   // ---------------------------------------------------------
//   // ⭐ LOAD VERSION FROM Cache_Control/<autoDocId>
//   // ---------------------------------------------------------
//   const controlRef = db.collection("Cache_Control").doc("KCQFBaFpjSaPRDTAhJBg");
//   const controlSnap = await controlRef.get();
//   const control = controlSnap.data() || {};
//   const currentVersion = control.settingsVersion ?? 1;

//   // ---------------------------------------------------------
//   // ⭐ LOAD EXISTING SNAPSHOT FROM Cache_Meta/settings
//   // ---------------------------------------------------------
//   const metaRef = db.collection("Cache_Meta").doc("settings");
//   const metaSnap = await metaRef.get();
//   const meta = metaSnap.data() || {};

//   const now = PulseRealm.PulseNOW;
//   const lastGenerated = meta.lastGenerated || 0;
//   const cachedVersion = meta.version || 0;
//   const cachedData = meta.data || {};

//   const ONE_DAY = 24 * 60 * 60 * 1000;
//   const isFresh = (now - lastGenerated < ONE_DAY) && (cachedVersion === currentVersion);
//   const hasData = cachedData && Object.keys(cachedData).length > 0;

//   // ---------------------------------------------------------
//   // ⭐ CASE 1 — Fully fresh
//   // ---------------------------------------------------------
//   if (hasData && isFresh) {

//     if (deltaRequest) {
//       const delta = { version: currentVersion, added: {}, removed: {}, changed: {} };

//       if (sizeOnly) {
//         const json = JSON.stringify(delta);
//         return Buffer.byteLength(json, "utf8") / 1024;
//       }

//       return delta;
//     }

//     if (sizeOnly) {
//       const json = JSON.stringify(cachedData);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return cachedData;
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 2 — Build NEW full settings snapshot
//   // ---------------------------------------------------------
//   const settingsDoc = await admin
//     .firestore()
//     .collection("TPSettings")
//     .doc("global")
//     .get();

//   const root = settingsDoc.data() || {};

//   // -----------------------------
//   // VALIDATE seasonalPeriods
//   // -----------------------------
//   const seasonalPeriods = {};
//   const rawPeriods = root.environment.seasonalPeriods || {};

//   for (const key in rawPeriods) {
//     const p = rawPeriods[key];
//     if (!p.start || !p.end) continue;

//     const valid =
//       /^\d{2}-\d{2}$/.test(p.start) &&
//       /^\d{2}-\d{2}$/.test(p.end) &&
//       !isNaN(Number(p.multiplier));

//     if (!valid) continue;

//     seasonalPeriods[key] = p;
//   }

//   // -----------------------------
//   // BASE ENVIRONMENT SETTINGS
//   // -----------------------------
//   const env = root.environment || {};

//   const fullSettings = {
//     enabled: env.enabled ?? true,
//     calculationVersion: root.calculationVersion ?? 26,
//     delayPenalty: root.delayPenalty ?? 15,

//     ui: env.ui ?? {},
//     weather: env.weather ?? {},
//     perfectWeather: env.perfectWeather ?? {},
//     seasons: env.seasons ?? {},
//     marine: env.marine ?? {},
//     holidays: env.holidays ?? {},
//     sargassum: env.sargassum ?? {},
//     storm: env.storm ?? {},
//     sea: env.sea ?? {},
//     moon: env.moon ?? {},
//     multipliers: env.multipliers ?? {},

//     seasonalPeriods,

//     tierMultiplier_Seashell: root.tierMultiplier_Seashell ?? 1,
//     tierMultiplier_ReefDiver: root.tierMultiplier_ReefDiver ?? 1.07,
//     tierMultiplier_ToucanSpirit: root.tierMultiplier_ToucanSpirit ?? 1.17,
//     tierMultiplier_VolcanoHeart: root.tierMultiplier_VolcanoHeart ?? 1.30,
//     tierMultiplier_HurricaneLegend: root.tierMultiplier_HurricaneLegend ?? 1.50,

//     maxTotalMultiplier: root.maxTotalMultiplier ?? 3,

//     tierThreshold_ReefDiver: Number(root.tierThreshold_ReefDiver) || 2500,
//     tierThreshold_ToucanSpirit: Number(root.tierThreshold_ToucanSpirit) || 5000,
//     tierThreshold_VolcanoHeart: Number(root.tierThreshold_VolcanoHeart) || 9000,
//     tierThreshold_HurricaneLegend: Number(root.tierThreshold_HurricaneLegend) || 15000,

//     referralBaseBonus_NewUser: root.referralBaseBonus_NewUser ?? 25,
//     referralBaseBonus_Referrer: root.referralBaseBonus_Referrer ?? 50,
//     referralEarningRate: root.referralEarningRate ?? 15,
//     referralStreakDurationHours: root.referralStreakDurationHours ?? 6,
//     referralStreakMultiplier: root.referralStreakMultiplier ?? 1.1,
//     seasonalReferralBonus_NewUser: root.seasonalReferralBonus_NewUser ?? 10,
//     seasonalReferralBonus_Referrer: root.seasonalReferralBonus_Referrer ?? 20,

//     streakDurationDays: root.streakDurationDays ?? 1,
//     streakMaxMultiplier: root.streakMaxMultiplier ?? 2,
//     streakMultiplierBase: root.streakMultiplierBase ?? 1,
//     streakMultiplierPerDay: root.streakMultiplierPerDay ?? 0.1,

//     fastDeliveryBonusEnabled: root.fastDeliveryBonusEnabled ?? false,
//     fastDeliveryBonusMinutes: root.fastDeliveryBonusMinutes ?? 60,
//     fastDeliveryBonusPoints: root.fastDeliveryBonusPoints ?? 15
//   };

//   // -----------------------------
//   // ENVIRONMENTAL SIGNALS
//   // -----------------------------
//   const stormsSnap = await db.collection("environment").doc("storms").get();
//   const sargSnap = await db.collection("environment").doc("sargassum").get();
//   const wildlifeSnap = await db.collection("environment").doc("wildlife").get();

//   const storms = stormsSnap.exists ? stormsSnap.data().data || {} : {};
//   const sargassum = sargSnap.exists ? sargSnap.data().data || {} : {};
//   const wildlife = wildlifeSnap.exists ? wildlifeSnap.data().data || {} : {};

//   const finalSnapshot = {
//     TPSettings: fullSettings,
//     seasonal: getSeasonFromSettings(fullSettings),
//     TPEnvironmentSignals: { storms, sargassum, wildlife }
//   };

//   // ---------------------------------------------------------
//   // ⭐ WRITE BACK FULL SNAPSHOT
//   // ---------------------------------------------------------
//   await metaRef.set({
//     lastGenerated: now,
//     version: currentVersion,
//     data: finalSnapshot
//   });

//   // ---------------------------------------------------------
//   // ⭐ DELTA MODE
//   // ---------------------------------------------------------
//   if (deltaRequest) {
//     const oldKeys = new Set(Object.keys(cachedData));
//     const newKeys = new Set(Object.keys(finalSnapshot));

//     const delta = {
//       version: currentVersion,
//       added: {},
//       removed: {},
//       changed: {}
//     };

//     for (const key of newKeys) {
//       if (!oldKeys.has(key)) {
//         delta.added[key] = finalSnapshot[key];
//         continue;
//       }

//       if (JSON.stringify(cachedData[key]) !== JSON.stringify(finalSnapshot[key])) {
//         delta.changed[key] = finalSnapshot[key];
//       }
//     }

//     for (const key of oldKeys) {
//       if (!newKeys.has(key)) {
//         delta.removed[key] = cachedData[key];
//       }
//     }

//     if (sizeOnly) {
//       const json = JSON.stringify(delta);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return delta;
//   }

//   // ---------------------------------------------------------
//   // ⭐ SIZE ONLY (full)
//   // ---------------------------------------------------------
//   if (sizeOnly) {
//     const json = JSON.stringify(finalSnapshot);
//     return Buffer.byteLength(json, "utf8") / 1024;
//   }

//   return finalSnapshot;
// }

function envResponse({ success, error = null, raw = null, data = null }) {
  return {
    success: !!success,
    error,
    updated: PulseRealm.PulseNOW,
    raw: raw ?? null,
    data: data ?? null
  };
}

// zones.js
export const SAN_PEDRO_ZONES = [
  { id: 'sanpedro_global', name: 'San Pedro (Global)', scopeType: 'global' },
  { id: 'sanpedro_north', name: 'North San Pedro', scopeType: 'zone' },
  { id: 'sanpedro_central', name: 'Central San Pedro', scopeType: 'zone' },
  { id: 'sanpedro_south', name: 'South San Pedro', scopeType: 'zone' },
  { id: 'sanpedro_secret_beach', name: 'Secret Beach', scopeType: 'zone' },
  { id: 'sanpedro_south_ambergris', name: 'South Ambergris', scopeType: 'zone' }
];

const TP_POWER_VERSION = 'v1.0.0';

export const updateSanPedroPower = async () => {
  const nowMs = PulseRealm.PulseNOW.toMillis();

  const settings = await getPowerSettings();

  const zoneResults = await Promise.all(
    SAN_PEDRO_ZONES.map(zone => processZone(zone, nowMs, settings))
  );

  await db.collection("TIMER_LOGS").doc(`POWER_${nowMs}`).set({
    fn: "updateSanPedroPower",
    runId: nowMs,
    zonesProcessed: zoneResults.length,
    zones: zoneResults.map(z => z.zone.id),
    createdAt: PulseRealm.PulseNOW
  });

  await inferOutagesAndNotify(zoneResults, settings, nowMs);
};

export const updateSanPedroPowerHttp = onRequest(
  { region: "us-central1", timeoutSeconds: 300, memory: "1GiB" },
  async (req, res) => {
    const runId = PulseRealm.PulseNOW;
    try {
      const result = await updateSanPedroPower();
      return res.json({ success: true, result });
    } catch (err) {
      await db.collection("FUNCTION_ERRORS").doc(`ERR_FATAL_${runId}`).set({
        fn: "updateSanPedroPowerHttp",
        stage: "fatal",
        error: String(err),
        runId,
        createdAt: PulseRealm.PulseNOW
      });
      return res.json({ success: false, error: err.message });
    }
  }
);

  const getLastOutageForZone = async scopeId => {
  const snap = await db.collection('powerOutages')
    .where('scopeId', '==', scopeId)
    .orderBy('startMs', 'desc')
    .limit(1)
    .get();

  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
};

const processZone = async (zone, nowMs, settings) => {
  const raw = await fetchBelPowerForZone(zone);
  const parsedRate = parseRateFromBelPayload(raw);

  await db.collection('powerData').add({
    scopeId: zone.id,
    scopeType: zone.scopeType,
    timestampMs: nowMs,
    rawPayload: raw,
    parsedRate,
    source: 'bel',
    normalizerVersion: TP_POWER_VERSION
  });

  const baselineRate = await computeBaselineRate(zone.id, settings.baselineWindowMs);

  let deviationPct = null;
  if (parsedRate != null && baselineRate != null && baselineRate > 0) {
    deviationPct = (parsedRate - baselineRate) / baselineRate;
  }

  const { status, confidenceScore } = classifyPriceSignal(
    zone,
    parsedRate,
    baselineRate,
    deviationPct,
    settings
  );

  const powerDoc = {
    scopeId: zone.id,
    scopeType: zone.scopeType,
    currentRate: parsedRate,
    baselineRate,
    deviationPct,
    status,
    confidenceScore,
    lastUpdatedMs: nowMs
  };

  await db.collection('power').doc(zone.id).set(powerDoc, { merge: true });

  // in processZone, before return { zone, power: powerDoc };

  const engineStatus = status; // 'normal' | 'suspect' | 'outage_window' (or future)
  const isOutageSample = engineStatus !== 'normal';

  const bucketStartMs = getBucketStartMs(nowMs, 5 * 60 * 1000);
  await db.collection('powerHistory').add({
    scopeId: zone.id,
    scopeType: zone.scopeType,
    bucketStartMs,
    rate: parsedRate,
    baselineRate,
    deviationPct,
    status: engineStatus,
    confidenceScore,
    isOutageSample,
    createdAt: PulseRealm.PulseNOW
  });


  return { zone, power: powerDoc };
};

const fetchBelPowerForZone = async zone => {
  // TODO: replace with real BEL fetch
  return {
    zoneId: zone.id,
    effectiveRate: Math.random() * 0.02 + 0.03 // 0.03–0.05 example
  };
};

const parseRateFromBelPayload = raw => {
  if (!raw) return null;
  if (typeof raw.effectiveRate === 'number') return raw.effectiveRate;
  return null;
};

const computeBaselineRate = async (scopeId, windowMs) => {
  const nowMs = PulseRealm.PulseNOW.toMillis();
  const sinceMs = nowMs - windowMs;

  const snap = await db
    .collection('powerHistory')
    .where('scopeId', '==', scopeId)
    .where('bucketStartMs', '>=', sinceMs)
    .get();

  if (snap.empty) return null;

  let sum = 0;
  let count = 0;

  snap.forEach(doc => {
    const d = doc.data();
    if (d.rate != null) {
      sum += d.rate;
      count++;
    }
  });

  if (count === 0) return null;
  return sum / count;
};

const classifyPriceSignal = (zone, rate, baselineRate, deviationPct, settings) => {
  if (rate == null || baselineRate == null || deviationPct == null) {
    return { status: 'suspect', confidenceScore: 0.1 };
  }

  const isGlobal = zone.scopeType === 'global';
  const threshold = isGlobal
    ? settings.minDeviationPctBigScope
    : settings.minDeviationPctSmallScope;

  const absDev = Math.abs(deviationPct);

  if (absDev < threshold) {
    return { status: 'normal', confidenceScore: 0.2 };
  }

  return { status: 'suspect', confidenceScore: 0.5 };
};

// async function generateUsersCache({ sizeOnly = false, deltaRequest = false } = {}) {

//   // ---------------------------------------------------------
//   // ⭐ LOAD VERSION FROM Cache_Control/<autoDocId>
//   // ---------------------------------------------------------
//   const controlRef = db.collection("Cache_Control").doc("KCQFBaFpjSaPRDTAhJBg");
//   const controlSnap = await controlRef.get();
//   const control = controlSnap.data() || {};
//   const currentVersion = control.usersVersion ?? 1;

//   // ---------------------------------------------------------
//   // ⭐ LOAD EXISTING SNAPSHOT FROM Cache_Meta/users
//   // ---------------------------------------------------------
//   const metaRef = db.collection("Cache_Meta").doc("users");
//   const metaSnap = await metaRef.get();
//   const meta = metaSnap.data() || {};

//   const now = PulseRealm.PulseNOW;
//   const lastGenerated = meta.lastGenerated || 0;
//   const cachedVersion = meta.version || 0;
//   const cachedData = meta.data || [];

//   const ONE_DAY = 24 * 60 * 60 * 1000;

//   const isFreshByTime = now - lastGenerated < ONE_DAY;
//   const isFreshByVersion = cachedVersion === currentVersion;
//   const hasData = Array.isArray(cachedData) && cachedData.length > 0;

//   // ---------------------------------------------------------
//   // ⭐ CASE 1 — Cache fully fresh
//   // ---------------------------------------------------------
//   if (hasData && isFreshByTime && isFreshByVersion) {

//     if (deltaRequest) {
//       const delta = { version: currentVersion, added: [], removed: [], changed: [] };

//       if (sizeOnly) {
//         const json = JSON.stringify(delta);
//         return Buffer.byteLength(json, "utf8") / 1024;
//       }

//       return delta;
//     }

//     if (sizeOnly) {
//       const json = JSON.stringify(cachedData);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return cachedData;
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 2 — Version changed → micro-hydrate
//   // ---------------------------------------------------------
//   let merged = hasData ? [...cachedData] : [];

//   if (hasData && cachedVersion !== currentVersion) {
//     const freshUsers = await getAllUsersCache();

//     const freshMap = new Map(freshUsers.map(u => [u.id, u]));
//     const mergedMap = new Map(merged.map(u => [u.id, u]));

//     for (const [id, freshUser] of freshMap.entries()) {
//       const oldUser = mergedMap.get(id);

//       if (!oldUser) {
//         mergedMap.set(id, freshUser);
//         continue;
//       }

//       const updatedUser = { ...oldUser };

//       if (freshUser.updatedAt > oldUser.updatedAt) {
//         updatedUser.email = freshUser.email;
//         updatedUser.name = freshUser.name;
//         updatedUser.displayName = freshUser.displayName;
//         updatedUser.photoURL = freshUser.photoURL;
//         updatedUser.role = freshUser.role;
//         updatedUser.phone = freshUser.phone;
//         updatedUser.country = freshUser.country;
//       }

//       if (freshUser.lastEarnedDate !== oldUser.lastEarnedDate) {
//         updatedUser.loyalty = { ...freshUser.loyalty };
//       }

//       if (freshUser.notifications.lastPushSent !== oldUser.notifications.lastPushSent) {
//         updatedUser.notifications = { ...freshUser.notifications };
//       }

//       if (freshUser.wallet.walletBalance !== oldUser.wallet.walletBalance) {
//         updatedUser.wallet = { ...freshUser.wallet };
//       }

//       if (freshUser.lastActive !== oldUser.lastActive) {
//         updatedUser.lastActive = freshUser.lastActive;
//       }

//       mergedMap.set(id, updatedUser);
//     }

//     merged = [...mergedMap.values()];
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 3 — Too old → full rebuild
//   // ---------------------------------------------------------
//   if (!hasData || !isFreshByTime) {
//     merged = await getAllUsersCache();
//   }

//   // ---------------------------------------------------------
//   // ⭐ ALWAYS WRITE BACK FULL SNAPSHOT
//   // ---------------------------------------------------------
//   await metaRef.set({
//     lastGenerated: now,
//     version: currentVersion,
//     data: merged
//   });

//   // ---------------------------------------------------------
//   // ⭐ DELTA MODE
//   // ---------------------------------------------------------
//   if (deltaRequest) {
//     const oldMap = new Map(cachedData.map(u => [u.id, u]));
//     const newMap = new Map(merged.map(u => [u.id, u]));

//     const added = [];
//     const removed = [];
//     const changed = [];

//     for (const [id, newUser] of newMap.entries()) {
//       const oldUser = oldMap.get(id);

//       if (!oldUser) {
//         added.push(newUser);
//         continue;
//       }

//       if (JSON.stringify(oldUser) !== JSON.stringify(newUser)) {
//         changed.push(newUser);
//       }
//     }

//     for (const [id, oldUser] of oldMap.entries()) {
//       if (!newMap.has(id)) {
//         removed.push(oldUser);
//       }
//     }

//     const delta = { version: currentVersion, added, removed, changed };

//     if (sizeOnly) {
//       const json = JSON.stringify(delta);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return delta;
//   }

//   // ---------------------------------------------------------
//   // ⭐ SIZE ONLY MODE (full)
//   // ---------------------------------------------------------
//   if (sizeOnly) {
//     const json = JSON.stringify(merged);
//     return Buffer.byteLength(json, "utf8") / 1024;
//   }

//   return merged;
// }
// async function generateBusinessesCache({ sizeOnly = false, deltaRequest = false } = {}) {

//   // ---------------------------------------------------------
//   // ⭐ LOAD VERSION FROM Cache_Control/<autoDocId>
//   // ---------------------------------------------------------
//   const controlRef = db.collection("Cache_Control").doc("KCQFBaFpjSaPRDTAhJBg");
//   const controlSnap = await controlRef.get();
//   const control = controlSnap.data() || {};
//   const currentVersion = control.businessVersion ?? 1;

//   // ---------------------------------------------------------
//   // ⭐ LOAD EXISTING SNAPSHOT FROM Cache_Meta/businesses
//   // ---------------------------------------------------------
//   const metaRef = db.collection("Cache_Meta").doc("businesses");
//   const metaSnap = await metaRef.get();
//   const meta = metaSnap.data() || {};

//   const now = PulseRealm.PulseNOW;
//   const lastGenerated = meta.lastGenerated || 0;
//   const cachedVersion = meta.version || 0;
//   const cachedData = meta.data || [];

//   const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

//   const isFreshByTime = now - lastGenerated < TWO_WEEKS;
//   const isFreshByVersion = cachedVersion === currentVersion;
//   const hasData = Array.isArray(cachedData) && cachedData.length > 0;

//   // ---------------------------------------------------------
//   // ⭐ CASE 1 — Fully fresh
//   // ---------------------------------------------------------
//   if (hasData && isFreshByTime && isFreshByVersion) {

//     if (deltaRequest) {
//       const delta = { version: currentVersion, added: [], removed: [], changed: [] };

//       if (sizeOnly) {
//         const json = JSON.stringify(delta);
//         return Buffer.byteLength(json, "utf8") / 1024;
//       }

//       return delta;
//     }

//     if (sizeOnly) {
//       const json = JSON.stringify(cachedData);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return cachedData;
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 2 — Version matches but time expired → micro-hydrate
//   // ---------------------------------------------------------
//   let merged = hasData ? [...cachedData] : [];

//   if (hasData && isFreshByVersion && !isFreshByTime) {
//     const fresh = await getAllBusinesses(null);

//     const mergedMap = new Map(cachedData.map(b => [b.id, b]));

//     for (const freshBiz of fresh) {
//       const oldBiz = mergedMap.get(freshBiz.id);

//       if (!oldBiz) {
//         mergedMap.set(freshBiz.id, freshBiz);
//         continue;
//       }

//       if (freshBiz.updatedAt > oldBiz.updatedAt) {
//         mergedMap.set(freshBiz.id, freshBiz);
//       }
//     }

//     merged = [...mergedMap.values()];
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 3 — Version changed OR too old → full rebuild
//   // ---------------------------------------------------------
//   if (!hasData || !isFreshByTime) {
//     merged = await getAllBusinesses(null);
//   }

//   // ---------------------------------------------------------
//   // ⭐ ALWAYS WRITE BACK FULL SNAPSHOT
//   // ---------------------------------------------------------
//   await metaRef.set({
//     lastGenerated: now,
//     version: currentVersion,
//     data: merged
//   });

//   // ---------------------------------------------------------
//   // ⭐ DELTA MODE
//   // ---------------------------------------------------------
//   if (deltaRequest) {
//     const oldMap = new Map(cachedData.map(b => [b.id, b]));
//     const newMap = new Map(merged.map(b => [b.id, b]));

//     const added = [];
//     const removed = [];
//     const changed = [];

//     for (const [id, newBiz] of newMap.entries()) {
//       const oldBiz = oldMap.get(id);

//       if (!oldBiz) {
//         added.push(newBiz);
//         continue;
//       }

//       if (JSON.stringify(oldBiz) !== JSON.stringify(newBiz)) {
//         changed.push(newBiz);
//       }
//     }

//     for (const [id, oldBiz] of oldMap.entries()) {
//       if (!newMap.has(id)) {
//         removed.push(oldBiz);
//       }
//     }

//     const delta = { version: currentVersion, added, removed, changed };

//     if (sizeOnly) {
//       const json = JSON.stringify(delta);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return delta;
//   }

//   // ---------------------------------------------------------
//   // ⭐ SIZE ONLY (full)
//   // ---------------------------------------------------------
//   if (sizeOnly) {
//     const json = JSON.stringify(merged);
//     return Buffer.byteLength(json, "utf8") / 1024;
//   }

//   return merged;
// }

// async function processWorker({
//   fileId,
//   totalPackets,
//   instanceId = 0,
//   activeInstances = null, // null = cannot detect
//   readPacketExists,
//   writePacket,
//   generatePacketData,
// }) {
//   let start = 0;
//   let step = 1;

//   // ---------------------------------------------------
//   // 1. DYNAMIC MODE (we CAN detect active instances)
//   // ---------------------------------------------------
//   if (typeof activeInstances === "number" && activeInstances > 0) {
//     const sliceSize = Math.floor(totalPackets / activeInstances);
//     start = sliceSize * instanceId;
//     step = 1;
//   }

//   // ---------------------------------------------------
//   // 2. FALLBACK MODE (we CANNOT detect instances)
//   // ---------------------------------------------------
//   else {
//     // Your rule: skip 4 packets per instance
//     start = instanceId * 4;
//     step = 4;
//   }

//   // ---------------------------------------------------
//   // 3. MAIN LOOP (auto‑exit when done)
//   // ---------------------------------------------------
//   for (let packetIndex = start; packetIndex < totalPackets; packetIndex += step) {
//     const exists = await readPacketExists(fileId, packetIndex);

//     if (exists) {
//       continue;
//     }

//     const packetData = await generatePacketData(fileId, packetIndex);

//     await writePacket(fileId, packetIndex, packetData);
//   }

//   // ---------------------------------------------------
//   // 4. AUTO‑SPIN‑DOWN (function ends → instance ends)
//   // ---------------------------------------------------
//   return {
//     instanceId,
//     mode: activeInstances ? "dynamic" : "fallback",
//     start,
//     step,
//     status: "complete",
//   };
// }

// export const scheduledUserScoring = onSchedule(
//   {
//     schedule: "every 5 minutes",
//     timeZone: "America/Belize"
//   },
//   async () => {
//     log("Running scheduled user scoring…");

//     try {
//       await runUserScoring();
//       log("User scoring completed.");
//     } catch (err) {
//       console.error("User scoring failed:", err);
//     }
//   }
// );

// async function generateEventsCache({ sizeOnly = false, deltaRequest = false } = {}) {

//   // ---------------------------------------------------------
//   // ⭐ LOAD VERSION FROM Cache_Control/<autoDocId>
//   // ---------------------------------------------------------
//   const controlRef = db.collection("Cache_Control").doc("KCQFBaFpjSaPRDTAhJBg");
//   const controlSnap = await controlRef.get();
//   const control = controlSnap.data() || {};
//   const currentVersion = control.eventVersion ?? 1;

//   // ---------------------------------------------------------
//   // ⭐ LOAD EXISTING SNAPSHOT FROM Cache_Meta/events
//   // ---------------------------------------------------------
//   const metaRef = db.collection("Cache_Meta").doc("events");
//   const metaSnap = await metaRef.get();
//   const meta = metaSnap.data() || {};

//   const now = PulseRealm.PulseNOW;
//   const lastGenerated = meta.lastGenerated || 0;
//   const cachedVersion = meta.version || 0;
//   const cachedData = meta.data || [];

//   const FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;

//   const isFreshByTime = now - lastGenerated < FOUR_DAYS;
//   const isFreshByVersion = cachedVersion === currentVersion;
//   const hasData = Array.isArray(cachedData) && cachedData.length > 0;

//   // ---------------------------------------------------------
//   // ⭐ CASE 1 — Fully fresh
//   // ---------------------------------------------------------
//   if (hasData && isFreshByTime && isFreshByVersion) {

//     if (deltaRequest) {
//       const delta = { version: currentVersion, added: [], removed: [], changed: [] };

//       if (sizeOnly) {
//         const json = JSON.stringify(delta);
//         return Buffer.byteLength(json, "utf8") / 1024;
//       }

//         return delta;
//     }

//     if (sizeOnly) {
//       const json = JSON.stringify(cachedData);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return cachedData;
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 2 — Version matches but time expired → micro-hydrate
//   // ---------------------------------------------------------
//   let merged = hasData ? [...cachedData] : [];

//   if (hasData && isFreshByVersion && !isFreshByTime) {
//     const fresh = await getAllEventsCache();

//     const mergedMap = new Map(cachedData.map(ev => [ev.id, ev]));

//     for (const freshEvent of fresh) {
//       const oldEvent = mergedMap.get(freshEvent.id);

//       if (!oldEvent) {
//         mergedMap.set(freshEvent.id, freshEvent);
//         continue;
//       }

//       if (freshEvent.updatedAt > oldEvent.updatedAt) {
//         mergedMap.set(freshEvent.id, freshEvent);
//       }
//     }

//     merged = [...mergedMap.values()];
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 3 — Version changed OR too old → full rebuild
//   // ---------------------------------------------------------
//   if (!hasData || !isFreshByTime) {
//     merged = await getAllEventsCache();
//   }

//   // ---------------------------------------------------------
//   // ⭐ ALWAYS WRITE BACK FULL SNAPSHOT
//   // ---------------------------------------------------------
//   await metaRef.set({
//     lastGenerated: now,
//     version: currentVersion,
//     data: merged
//   });

//   // ---------------------------------------------------------
//   // ⭐ DELTA MODE
//   // ---------------------------------------------------------
//   if (deltaRequest) {
//     const oldMap = new Map(cachedData.map(ev => [ev.id, ev]));
//     const newMap = new Map(merged.map(ev => [ev.id, ev]));

//     const added = [];
//     const removed = [];
//     const changed = [];

//     for (const [id, newEvent] of newMap.entries()) {
//       const oldEvent = oldMap.get(id);

//       if (!oldEvent) {
//         added.push(newEvent);
//         continue;
//       }

//       if (JSON.stringify(oldEvent) !== JSON.stringify(newEvent)) {
//         changed.push(newEvent);
//       }
//     }

//     for (const [id, oldEvent] of oldMap.entries()) {
//       if (!newMap.has(id)) {
//         removed.push(oldEvent);
//       }
//     }

//     const delta = { version: currentVersion, added, removed, changed };

//     if (sizeOnly) {
//       const json = JSON.stringify(delta);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return delta;
//   }

//   // ---------------------------------------------------------
//   // ⭐ SIZE ONLY (full)
//   // ---------------------------------------------------------
//   if (sizeOnly) {
//     const json = JSON.stringify(merged);
//     return Buffer.byteLength(json, "utf8") / 1024;
//   }

//   return merged;
// }

// async function getAllEventsCache() {
//   const today = new Date();
//   const todayStr = formatEventDate(today);

//   const snap = await db.collection("Events")
//     .where("toDate", ">=", todayStr)
//     .orderBy("toDate")
//     .limit(20)
//     .get();

//   return snap.docs.map(doc => {
//     const data = doc.data() || {};

//     const coords =
//       data.coords ||
//       (data.lat && data.lng ? { lat: data.lat, lng: data.lng } : null);

//     return {
//       id: doc.id,
//       title: data.title || "Untitled Event",

//       fromDate: data.fromDate || todayStr,
//       toDate: data.toDate || data.fromDate || todayStr,

//       venue: data.venue || data.resolvedName || "Unknown Venue",
//       address: data.address || data.resolvedAddress || "Unknown Address",

//       category: data.category || null,
//       price: data.price ?? 0,

//       coords,

//       mapImageUrl: data.mapImageUrl || null,
//       mapsWebUrl: data.mapsWebUrl || null,
//       placeId: data.placeId || null,
//       resolvedName: data.resolvedName || null,
//       resolvedAddress: data.resolvedAddress || null,

//       images: data.images || [],

//       ...data
//     };
//   });
// }

// async function getAllUsersCache() {
//   const snap = await db
//     .collection("Users")
//     .orderBy("TPIdentity.createdAt", "desc")
//     .get();

//   const safeMillis = (ts) => {
//     if (!ts) return null;
//     if (typeof ts.toMillis === "function") return ts.toMillis();
//     if (ts._seconds) return ts._seconds * 1000;
//     if (typeof ts === "number") return ts;
//     return null;
//   };

//   const safeNum = (v) =>
//     Number.isFinite(Number(v)) ? Number(v) : 0;

//   return snap.docs.map((doc) => {
//     const data = doc.data() || {};
//     const id = doc.id;

//     const TPIdentity = data.TPIdentity || {};
//     const TPLoyalty = data.TPLoyalty || {};
//     const TPNotifications = data.TPNotifications || {};
//     const TPWallet = data.TPWallet || {};
//     const TPSecurity = data.TPSecurity || {};

//     return {
//       id,

//       // ⭐ Identity (flattened)
//       email: TPIdentity.email || null,
//       name: TPIdentity.name || null,
//       displayName: TPIdentity.displayName || null,
//       photoURL: TPIdentity.photoURL || null,
//       role: TPIdentity.role || "Customer",
//       phone: TPIdentity.phone || null,
//       country: TPIdentity.country || null,

//       // ⭐ Loyalty
//       loyalty: {
//         pointsBalance: safeNum(TPLoyalty.pointsBalance),
//         lifetimePoints: safeNum(TPLoyalty.lifetimePoints),
//         referralCode: TPLoyalty.referralCode || null,
//         referredBy: TPLoyalty.referredBy || null
//       },

//       // ⭐ Notifications
//       notifications: {
//         receiveMassEmails: TPNotifications.receiveMassEmails ?? true,
//         receiveSMS: TPNotifications.receiveSMS ?? false,
//         lastPushSent: safeMillis(TPNotifications.lastPushSent)
//       },

//       // ⭐ Wallet
//       wallet: {
//         walletBalance: safeNum(TPWallet.walletBalance)
//       },

//       // ⭐ Timestamps
//       createdAt: safeMillis(TPIdentity.createdAt),
//       updatedAt: safeMillis(TPIdentity.updatedAt),
//       lastActive: safeMillis(TPSecurity.lastActive),
//       lastEarnedDate: safeMillis(TPLoyalty.lastEarnedDate)
//     };
//   });
// }

// async function generateHistoryCache({ sizeOnly = false, deltaRequest = false } = {}) {

//   // ---------------------------------------------------------
//   // ⭐ LOAD VERSION FROM Cache_Control/<autoDocId>
//   // ---------------------------------------------------------
//   const controlRef = db.collection("Cache_Control").doc("KCQFBaFpjSaPRDTAhJBg");
//   const controlSnap = await controlRef.get();
//   const control = controlSnap.data() || {};
//   const currentVersion = control.historyVersion ?? 1;

//   // ---------------------------------------------------------
//   // ⭐ LOAD EXISTING SNAPSHOT FROM Cache_Meta/history
//   // ---------------------------------------------------------
//   const metaRef = db.collection("Cache_Meta").doc("history");
//   const metaSnap = await metaRef.get();
//   const meta = metaSnap.data() || {};

//   const now = PulseRealm.PulseNOW;
//   const lastGenerated = meta.lastGenerated || 0;
//   const cachedVersion = meta.version || 0;
//   const cachedData = meta.data || [];

//   const ONE_DAY = 24 * 60 * 60 * 1000;

//   const isFreshByTime = now - lastGenerated < ONE_DAY;
//   const isFreshByVersion = cachedVersion === currentVersion;
//   const hasData = Array.isArray(cachedData) && cachedData.length > 0;

//   // ---------------------------------------------------------
//   // ⭐ CASE 1 — Fully fresh
//   // ---------------------------------------------------------
//   if (hasData && isFreshByTime && isFreshByVersion) {

//     if (deltaRequest) {
//       const delta = { version: currentVersion, added: [], removed: [], changed: [] };

//       if (sizeOnly) {
//         const json = JSON.stringify(delta);
//         return Buffer.byteLength(json, "utf8") / 1024;
//       }

//       return delta;
//     }

//     if (sizeOnly) {
//       const json = JSON.stringify(cachedData);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return cachedData;
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 2 — Build NEW full history snapshot
//   // ---------------------------------------------------------
//   const usersSnap = await db.collection("Users").get();
//   const allHistory = [];

//   for (const userDoc of usersSnap.docs) {
//     const uid = userDoc.id;
//     const userData = userDoc.data() || {};
//     const loyalty = userData.loyalty || {};

//     const histSnap = await db
//       .collection("PulseHistory")
//       .doc(uid)
//       .collection("entries")
//       .orderBy("createdAt", "desc")
//       .limit(200)
//       .get();

//     for (const entry of histSnap.docs) {
//       const h = entry.data();

//       // -----------------------------------------
//       // ⭐ Build unified snapshot (history + loyalty)
//       // -----------------------------------------
//       const snapshot = h.pointsSnapshot || {
//         seasonalName: loyalty.seasonalName ?? null,
//         seasonalMultiplier: loyalty.seasonalMultiplier ?? 1,
//         seasonalActive: loyalty.seasonalActive ?? false,

//         tier: loyalty.tier ?? null,
//         tierKey: loyalty.tierKey ?? null,
//         tierMultiplier: loyalty.tierMultiplier ?? 1,

//         streakCount: loyalty.streakCount ?? 0,
//         streakMultiplier: loyalty.streakMultiplier ?? 1,
//         streakExpires: loyalty.streakExpires ?? null,

//         calculationVersion: loyalty.calculationVersion ?? 1,

//         pointsBefore: h.pulsepointsBefore ?? null,
//         pointsAfter: h.pulsepointsAfter ?? null
//       };

//       allHistory.push({
//         uid,
//         id: entry.id,
//         type: h.type,
//         label: h.label,
//         amount: h.amount,
//         ts: h.ts,
//         createdAt: h.createdAt,
//         orderID: h.orderID ?? null,
//         pointsSnapshot: snapshot
//       });
//     }
//   }

//   // ---------------------------------------------------------
//   // ⭐ WRITE BACK FULL SNAPSHOT
//   // ---------------------------------------------------------
//   await metaRef.set({
//     lastGenerated: now,
//     version: currentVersion,
//     data: allHistory
//   });

//   // ---------------------------------------------------------
//   // ⭐ DELTA MODE
//   // ---------------------------------------------------------
//   if (deltaRequest) {
//     const oldMap = new Map(cachedData.map(h => [`${h.uid}_${h.id}`, h]));
//     const newMap = new Map(allHistory.map(h => [`${h.uid}_${h.id}`, h]));

//     const added = [];
//     const removed = [];
//     const changed = [];

//     for (const [key, newEntry] of newMap.entries()) {
//       const oldEntry = oldMap.get(key);

//       if (!oldEntry) {
//         added.push(newEntry);
//         continue;
//       }

//       if (JSON.stringify(oldEntry) !== JSON.stringify(newEntry)) {
//         changed.push(newEntry);
//       }
//     }

//     for (const [key, oldEntry] of oldMap.entries()) {
//       if (!newMap.has(key)) {
//         removed.push(oldEntry);
//       }
//     }

//     const delta = { version: currentVersion, added, removed, changed };

//     if (sizeOnly) {
//       const json = JSON.stringify(delta);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return delta;
//   }

//   // ---------------------------------------------------------
//   // ⭐ SIZE ONLY (full)
//   // ---------------------------------------------------------
//   if (sizeOnly) {
//     const json = JSON.stringify(allHistory);
//     return Buffer.byteLength(json, "utf8") / 1024;
//   }

//   return allHistory;
// }
// async function generateLoyaltyCache({ sizeOnly = false } = {}) {

//   // ---------------------------------------------------------
//   // ⭐ LOAD VERSION FROM Cache_Control/<autoDocId>
//   // ---------------------------------------------------------
//   const controlRef = db.collection("Cache_Control").doc("KCQFBaFpjSaPRDTAhJBg");
//   const controlSnap = await controlRef.get();
//   const control = controlSnap.data() || {};
//   const currentVersion = control.loyaltyVersion ?? 1;

//   // ---------------------------------------------------------
//   // ⭐ LOAD EXISTING SNAPSHOT FROM Cache_Meta/loyalty
//   // ---------------------------------------------------------
//   const metaRef = db.collection("Cache_Meta").doc("loyalty");
//   const metaSnap = await metaRef.get();
//   const meta = metaSnap.data() || {};

//   const now = PulseRealm.PulseNOW;
//   const lastGenerated = meta.lastGenerated || 0;
//   const cachedVersion = meta.version || 0;
//   const cachedData = meta.data || [];

//   const ONE_DAY = 24 * 60 * 60 * 1000;

//   const isFreshByTime = now - lastGenerated < ONE_DAY;
//   const isFreshByVersion = cachedVersion === currentVersion;
//   const hasData = Array.isArray(cachedData) && cachedData.length > 0;

//   // ---------------------------------------------------------
//   // ⭐ CASE 1 — Fully fresh
//   // ---------------------------------------------------------
//   if (hasData && isFreshByTime && isFreshByVersion) {

//     if (sizeOnly) {
//       const json = JSON.stringify(cachedData);
//       return Buffer.byteLength(json, "utf8") / 1024;
//     }

//     return cachedData;
//   }

//   // ---------------------------------------------------------
//   // ⭐ CASE 2 — Build NEW full loyalty snapshot
//   // ---------------------------------------------------------
//   const usersSnap = await db.collection("Users").get();
//   const loyaltyList = [];

//   // Load global settings once
//   const settingsSnap = await db.collection("TPSettings").doc("global").get();
//   const settings = settingsSnap.data() || {};

//   for (const userDoc of usersSnap.docs) {
//     const uid = userDoc.id;
//     const userData = userDoc.data() || {};

//     const TPIdentity = userData.TPIdentity || {};
//     const TPLoyalty = userData.TPLoyalty || {};

//     // -----------------------------------------
//     // ⭐ DISPLAY NAME
//     // -----------------------------------------
//     const displayName = TPIdentity.displayName || "Explorer";

//     // -----------------------------------------
//     // ⭐ STREAK LOGIC
//     // -----------------------------------------
//     const lastEarnedDate = TPLoyalty.lastEarnedDate || null;
//     let streakCount = Number(TPLoyalty.streakCount) || 0;

//     const windowHours = (settings.streakDurationDays ?? 1) * 24;

//     if (!lastEarnedDate) {
//       streakCount = 0;
//     } else {
//       const lastMs = lastEarnedDate.toMillis();
//       const expiresMs = lastMs + windowHours * 3600000;

//       if (PulseRealm.PulseNOW >= expiresMs) {
//         streakCount = 0;
//       }
//     }

//     // -----------------------------------------
//     // ⭐ TIER LOGIC
//     // -----------------------------------------
//     const lifetimePoints = Number(TPLoyalty.lifetimePoints) || 0;

//     const tierThresholds = {
//       Seashell: 0,
//       ReefDiver: settings.tierThreshold_ReefDiver,
//       ToucanSpirit: settings.tierThreshold_ToucanSpirit,
//       VolcanoHeart: settings.tierThreshold_VolcanoHeart,
//       HurricaneLegend: settings.tierThreshold_HurricaneLegend
//     };

//     let tierKey = "Seashell";
//     for (const [name, threshold] of Object.entries(tierThresholds)) {
//       if (lifetimePoints >= threshold) tierKey = name;
//     }

//     const tierNameMap = {
//       Seashell: "Seashell",
//       ReefDiver: "Reef Diver",
//       ToucanSpirit: "Toucan Spirit",
//       VolcanoHeart: "Volcano Heart",
//       HurricaneLegend: "Hurricane Legend"
//     };

//     const tier = tierNameMap[tierKey];
//     const tierMultiplier = settings[`tierMultiplier_${tierKey}`] ?? 1;

//     // -----------------------------------------
//     // ⭐ STREAK MULTIPLIER
//     // -----------------------------------------
//     const streakMultiplier = Math.min(
//       settings.streakMultiplierBase +
//         streakCount * settings.streakMultiplierPerDay,
//       settings.streakMaxMultiplier
//     );

//     // -----------------------------------------
//     // ⭐ SEASONAL LOGIC
//     // -----------------------------------------
//     const {
//       seasonalActive,
//       seasonalName,
//       seasonalMultiplier
//     } = getSeasonFromSettings(settings);

//     // -----------------------------------------
//     // ⭐ REFERRAL CODE
//     // -----------------------------------------
//     const referralCode = TPLoyalty.referralCode || null;

//     // -----------------------------------------
//     // ⭐ BUILD LOYALTY SNAPSHOT
//     // -----------------------------------------
//     loyaltyList.push({
//       uid,
//       displayName,
//       lifetimePoints,
//       streakCount,
//       tier,
//       tierKey,
//       tierMultiplier,
//       streakMultiplier,
//       seasonalMultiplier,
//       seasonalActive,
//       seasonalName,
//       referralCode,
//       calculationVersion: TPLoyalty.calculationVersion ?? 1
//     });
//   }

//   // ---------------------------------------------------------
//   // ⭐ WRITE BACK FULL SNAPSHOT
//   // ---------------------------------------------------------
//   await metaRef.set({
//     lastGenerated: now,
//     version: currentVersion,
//     data: loyaltyList
//   });

//   // ---------------------------------------------------------
//   // ⭐ SIZE ONLY
//   // ---------------------------------------------------------
//   if (sizeOnly) {
//     const json = JSON.stringify(loyaltyList);
//     return Buffer.byteLength(json, "utf8") / 1024;
//   }

//   return loyaltyList;
// }
// function signChunk(userId, sessionId, index, dataBase64) {
//   const h = crypto.createHash("sha256");
//   h.update(userId + sessionId + index + dataBase64);
//   return h.digest("hex");
// }
// // -------------------------------------------------------
// // ⭐ INTELLIGENT CACHE RESOLVER (FULL / DELTA / SIZE)
// // -------------------------------------------------------
// async function resolveCacheRequest(payload, baseVersion, sizeOnly) {

//   // Helper: detect cache type
//   const isDelta = payload.endsWith("_DELTA");
//   const isFull = payload.endsWith("_CACHE");

//   // Helper: map payload → generator
//   const generators = {
//     REQUEST_USERS_CACHE: generateUsersCache,
//     REQUEST_USERS_CACHE_DELTA: generateUsersCache,

//     REQUEST_BUSINESS_CACHE: generateBusinessesCache,
//     REQUEST_BUSINESS_CACHE_DELTA: generateBusinessesCache,

//     REQUEST_EVENTS_CACHE: generateEventsCache,
//     REQUEST_EVENTS_CACHE_DELTA: generateEventsCache,

//     REQUEST_ORDERS_CACHE: generateOrdersCache,
//     REQUEST_ORDERS_CACHE_DELTA: generateOrdersCache,

//     REQUEST_LOYALTY_CACHE: generateLoyaltyCache,
//     REQUEST_LOYALTY_CACHE_DELTA: generateLoyaltyCache,

//     REQUEST_HISTORY_CACHE: generateHistoryCache,
//     REQUEST_HISTORY_CACHE_DELTA: generateHistoryCache,

//     REQUEST_SETTINGS_CACHE: generateSettingsCache,
//     REQUEST_SETTINGS_CACHE_DELTA: generateSettingsCache
//   };

//   const fn = generators[payload];
//   if (!fn) return payload; // raw fallback

//   // -------------------------------------------------------
//   // ⭐ 1. DELTA REQUESTS
//   // -------------------------------------------------------
//   if (isDelta) {

//     // Missing baseVersion → fallback to full
//     if (!baseVersion) {
//       return sizeOnly
//         ? await fn({ sizeOnly: true })
//         : await fn();
//     }

//     // Try delta
//     const delta = await fn({ deltaRequest: true, sizeOnly });

//     // If sizeOnly → return size immediately
//     if (sizeOnly) return delta;

//     // If delta empty → fallback to full
//     const isEmpty =
//       (Array.isArray(delta.added) && delta.added.length === 0 &&
//        Array.isArray(delta.removed) && delta.removed.length === 0 &&
//        Array.isArray(delta.changed) && delta.changed.length === 0) ||
//       (Object.keys(delta.added || {}).length === 0 &&
//        Object.keys(delta.removed || {}).length === 0 &&
//        Object.keys(delta.changed || {}).length === 0);

//     if (isEmpty) {
//       return await fn(); // full
//     }

//     return delta;
//   }

//   // -------------------------------------------------------
//   // ⭐ 2. FULL REQUESTS
//   // -------------------------------------------------------
//   if (isFull) {
//     return sizeOnly
//       ? await fn({ sizeOnly: true })
//       : await fn();
//   }

//   // -------------------------------------------------------
//   // ⭐ 3. SIZE ONLY (no delta/full specified)
//   // -------------------------------------------------------
//   if (sizeOnly) {
//     // Try delta size first
//     const delta = await fn({ deltaRequest: true, sizeOnly: true });

//     const deltaSize = Number(delta);
//     if (deltaSize > 0) return deltaSize;

//     // Fallback to full size
//     return await fn({ sizeOnly: true });
//   }

//   // -------------------------------------------------------
//   // ⭐ 4. RAW PAYLOAD
//   // -------------------------------------------------------
//   return payload;
// }

// export const createPulseBandSession = onRequest(
//   { region: "us-central1", timeoutSeconds: 300, memory: "1GiB" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       let { userId, payload, chunkSize = 500, baseVersion, sizeOnly } = req.body;

//       if (!userId || !payload) {
//         return res.json({ success: false, error: "Missing userId or payload" });
//       }

//       // ⭐ Log session creation request
//       await db.collection("pulseband_logs").add({
//         type: "session_create_request",
//         userId,
//         payload,
//         chunkSize,
//         createdAt: PulseRealm.PulseNOW
//       });

//       // -------------------------------------------------------
//       // ⭐ INTELLIGENT CACHE RESOLVER
//       // -------------------------------------------------------
//       async function resolveCacheRequest(payload, baseVersion, sizeOnly) {
//         const isDelta = payload.endsWith("_DELTA");
//         const isFull = payload.endsWith("_CACHE");

//         const generators = {
//           REQUEST_USERS_CACHE: generateUsersCache,
//           REQUEST_USERS_CACHE_DELTA: generateUsersCache,

//           REQUEST_BUSINESS_CACHE: generateBusinessesCache,
//           REQUEST_BUSINESS_CACHE_DELTA: generateBusinessesCache,

//           REQUEST_EVENTS_CACHE: generateEventsCache,
//           REQUEST_EVENTS_CACHE_DELTA: generateEventsCache,

//           REQUEST_ORDERS_CACHE: generateOrdersCache,
//           REQUEST_ORDERS_CACHE_DELTA: generateOrdersCache,

//           REQUEST_HISTORY_CACHE: generateHistoryCache,
//           REQUEST_HISTORY_CACHE_DELTA: generateHistoryCache,

//           REQUEST_SETTINGS_CACHE: generateSettingsCache,
//           REQUEST_SETTINGS_CACHE_DELTA: generateSettingsCache
//         };

//         const fn = generators[payload];
//         if (!fn) return payload; // raw fallback

//         // -------------------------------------------------------
//         // ⭐ 1. DELTA REQUESTS
//         // -------------------------------------------------------
//         if (isDelta) {
//           if (!baseVersion) {
//             return sizeOnly
//               ? await fn({ sizeOnly: true })
//               : await fn();
//           }

//           const delta = await fn({ deltaRequest: true, sizeOnly });

//           if (sizeOnly) return delta;

//           const isEmpty =
//             (Array.isArray(delta.added) && delta.added.length === 0 &&
//              Array.isArray(delta.removed) && delta.removed.length === 0 &&
//              Array.isArray(delta.changed) && delta.changed.length === 0) ||
//             (Object.keys(delta.added || {}).length === 0 &&
//              Object.keys(delta.removed || {}).length === 0 &&
//              Object.keys(delta.changed || {}).length === 0);

//           if (isEmpty) {
//             return await fn(); // fallback to full
//           }

//           return delta;
//         }

//         // -------------------------------------------------------
//         // ⭐ 2. FULL REQUESTS
//         // -------------------------------------------------------
//         if (isFull) {
//           return sizeOnly
//             ? await fn({ sizeOnly: true })
//             : await fn();
//         }

//         // -------------------------------------------------------
//         // ⭐ 3. SIZE ONLY (no delta/full specified)
//         // -------------------------------------------------------
//         if (sizeOnly) {
//           const delta = await fn({ deltaRequest: true, sizeOnly: true });
//           const deltaSize = Number(delta);

//           if (deltaSize > 0) return deltaSize;

//           return await fn({ sizeOnly: true });
//         }

//         // -------------------------------------------------------
//         // ⭐ 4. RAW PAYLOAD
//         // -------------------------------------------------------
//         return payload;
//       }

//       // -------------------------------------------------------
//       // ⭐ 1. Resolve payload intelligently
//       // -------------------------------------------------------
//       let rawPayload;

//       try {
//         rawPayload = await resolveCacheRequest(payload, baseVersion, sizeOnly === true);
//       } catch (err) {
//         await db.collection("pulseband_errors").add({
//           type: "payload_generation_error",
//           userId,
//           payload,
//           error: err.message,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return res.json({ success: false, error: "Payload generation failed" });
//       }

//       const jsonString =
//         typeof rawPayload === "string"
//           ? rawPayload
//           : JSON.stringify(rawPayload);

//       // -------------------------------------------------------
//       // ⭐ 2. Convert payload to buffer
//       // -------------------------------------------------------
//       const buffer = Buffer.from(jsonString, "utf8");
//       const totalChunks = Math.ceil(buffer.length / chunkSize);
//       const sessionId = `PB_${userId}_${PulseRealm.PulseNOW}`;

//       const payloadHash = crypto
//         .createHash("sha256")
//         .update(buffer)
//         .digest("hex");

//       const sessionRef = db.collection("pulseband_sessions").doc(sessionId);
//       const chunksRef = sessionRef.collection("chunks");

//       // -------------------------------------------------------
//       // ⭐ 3. Create session metadata
//       // -------------------------------------------------------
//       await sessionRef.set({
//         sessionId,
//         userId,
//         totalChunks,
//         chunkSize,
//         createdAt: PulseRealm.PulseNOW,
//         status: "pending",
//         retries: 0,
//         failures: 0,
//         restarts: 0,
//         payloadBytes: buffer.length,
//         payloadHash,
//         payloadType: payload
//       });

//       await db.collection("pulseband_logs").add({
//         type: "session_created",
//         sessionId,
//         userId,
//         totalChunks,
//         chunkSize,
//         payloadBytes: buffer.length,
//         payloadHash,
//         createdAt: PulseRealm.PulseNOW
//       });

//       // -------------------------------------------------------
//       // ⭐ 4. Chunk + batch write
//       // -------------------------------------------------------
//       let batch = db.batch();
//       let batchCount = 0;

//       for (let i = 0; i < totalChunks; i++) {
//         try {
//           const start = i * chunkSize;
//           const end = start + chunkSize;
//           const dataBase64 = buffer.slice(start, end).toString("base64");

//           const signature = signChunk(userId, sessionId, i, dataBase64);

//           const chunkDoc = chunksRef.doc(i.toString().padStart(5, "0"));
//           batch.set(chunkDoc, {
//             index: i,
//             data: dataBase64,
//             signature,
//             status: "pending",
//             createdAt: PulseRealm.PulseNOW
//           });

//           batchCount++;
//           if (batchCount === 400) {
//             await batch.commit();
//             batch = db.batch();
//             batchCount = 0;
//           }
//         } catch (err) {
//           await db.collection("pulseband_errors").add({
//             type: "chunk_generation_error",
//             sessionId,
//             userId,
//             index: i,
//             error: err.message,
//             createdAt: PulseRealm.PulseNOW
//           });
//           return res.json({ success: false, error: "Chunk generation failed" });
//         }
//       }

//       if (batchCount > 0) await batch.commit();

//       // -------------------------------------------------------
//       // ⭐ 5. Return session info
//       // -------------------------------------------------------
//       return res.json({ success: true, sessionId, totalChunks });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "session_creation_error",
//         error: err.message,
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message });
//     }
//   }
// );

// export const getNextPulseBandChunk = onRequest(
//   { region: "us-central1" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const { sessionId, userId } = req.query;

//       if (!sessionId || !userId) {
//         return res.json({ success: false, error: "Missing sessionId or userId" });
//       }

//       const sessionRef = db.collection("pulseband_sessions").doc(sessionId);
//       const sessionSnap = await sessionRef.get();

//       if (!sessionSnap.exists || sessionSnap.data().userId !== userId) {
//         return res.json({ success: false, error: "Invalid session or user" });
//       }

//       const session = sessionSnap.data();

//       // ⭐ If too many failures → abort session
//       if (session.failures >= 5) {
//         await sessionRef.set(
//           { status: "aborted", abortedAt: PulseRealm.PulseNOW },
//           { merge: true }
//         );

//         await db.collection("pulseband_errors").add({
//           sessionId,
//           userId,
//           type: "session_aborted",
//           reason: "Too many failures",
//           createdAt: PulseRealm.PulseNOW
//         });

//         return res.json({ success: false, error: "Session aborted" });
//       }

//       const chunksRef = sessionRef.collection("chunks");

//       const snap = await chunksRef
//         .where("status", "==", "pending")
//         .orderBy("index", "asc")
//         .limit(1)
//         .get();

//       // ⭐ No pending chunks → complete
//       if (snap.empty) {
//         await sessionRef.set(
//           { status: "complete", completedAt: PulseRealm.PulseNOW },
//           { merge: true }
//         );

//         await db.collection("pulseband_logs").add({
//           sessionId,
//           userId,
//           type: "session_complete",
//           createdAt: PulseRealm.PulseNOW
//         });

//         return res.json({ success: true, done: true });
//       }

//       const doc = snap.docs[0];
//       const data = doc.data();

//       // ⭐ Mark as sent
//       await doc.ref.set({ status: "sent", sentAt: PulseRealm.PulseNOW }, { merge: true });

//       return res.json({
//         success: true,
//         chunk: {
//           index: data.index,
//           data: data.data,
//           signature: data.signature,
//           sentAt: PulseRealm.PulseNOW
//         }
//       });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "getNextChunk_error",
//         error: err.message,
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message });
//     }
//   }
// );

// export const ackPulseBandChunk = onRequest(
//   { region: "us-central1" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const { sessionId, userId, index, signature, latencyMs, kbps } = req.body;

//       if (!sessionId || !userId || index == null || !signature) {
//         return res.json({ success: false, error: "Missing params" });
//       }

//       const sessionRef = db.collection("pulseband_sessions").doc(sessionId);
//       const chunkRef = sessionRef.collection("chunks").doc(index.toString().padStart(5, "0"));

//       const snap = await chunkRef.get();
//       if (!snap.exists) {
//         return res.json({ success: false, error: "Chunk not found" });
//       }

//       const data = snap.data();

//       // ⭐ Signature mismatch = corrupted chunk
//       if (data.signature !== signature) {
//         await db.collection("pulseband_errors").add({
//           sessionId,
//           userId,
//           index,
//           latencyMs,
//           kbps,
//           type: "signature_mismatch",
//           expected: data.signature,
//           got: signature,
//           createdAt: PulseRealm.PulseNOW
//         });

//         // ⭐ Increment session failure count
//         await sessionRef.set(
//           { failures: admin.firestore.FieldValue.increment(1) },
//           { merge: true }
//         );

//         return res.json({ success: false, error: "Signature mismatch" });
//       }

//       // ⭐ Mark chunk as acked
//       await chunkRef.set(
//         {
//           status: "acked",
//           latencyMs,
//           kbps,
//           ackedAt: PulseRealm.PulseNOW
//         },
//         { merge: true }
//       );

//       return res.json({ success: true });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "ackChunk_error",
//         error: err.message,
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message });
//     }
//   }
// );

// export const logPulseBandRedownload = onRequest(
//   { region: "us-central1" },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const { sessionId, userId, reason } = req.body;

//       const sessionRef = db.collection("pulseband_sessions").doc(sessionId);

//       await db.collection("pulseband_redownloads").add({
//         sessionId,
//         userId,
//         reason,
//         createdAt: PulseRealm.PulseNOW
//       });

//       // ⭐ Track redownloads as failures
//       await sessionRef.set(
//         { failures: admin.firestore.FieldValue.increment(1) },
//         { merge: true }
//       );

//       return res.json({ success: true });

//     } catch (err) {
//       await db.collection("pulseband_errors").add({
//         type: "redownload_error",
//         error: err.message,
//         createdAt: PulseRealm.PulseNOW
//       });

//       return res.json({ success: false, error: err.message });
//     }
//   }
// );

const inferOutagesAndNotify = async (zoneResults, settings, nowMs) => {
  const outageCandidates = [];

  for (const item of zoneResults) {
    const zone = item.zone;
    const isOutageWindow = await isZoneInOutageWindow(
      zone.id,
      settings.minDurationMsForOutageWindow
    );

    if (isOutageWindow) {
      outageCandidates.push({ zone, confidence: 0.85 });
    }
  }

  for (const candidate of outageCandidates) {
    const { zone, confidence } = candidate;

    // 1) Update live power doc
    await db.collection('power').doc(zone.id).set(
      {
        status: 'outage_window',
        confidenceScore: confidence,
        lastUpdatedMs: nowMs
      },
      { merge: true }
    );

    // 2) Create / extend outage episode
    const lastOutage = await getLastOutageForZone(zone.id);

    if (!lastOutage || (lastOutage && lastOutage.resolved === true)) {
      // New outage episode
      await db.collection('powerOutages').add({
        scopeId: zone.id,
        scopeType: zone.scopeType,
        zoneName: zone.name,
        startMs: nowMs,
        endMs: null,
        resolved: false,
        createdBy: 'engine',
        initialConfidence: confidence,
        lastUpdatedMs: nowMs,
        createdAt: PulseRealm.PulseNOW
      });
    } else {
      // Extend existing outage
      await db.collection('powerOutages').doc(lastOutage.id).set(
        {
          endMs: nowMs,
          lastUpdatedMs: nowMs
        },
        { merge: true }
      );
    }

    // 3) Notify if above threshold
    if (confidence >= settings.notifyOnConfidenceAbove) {
      await sendOutageNotification(zone, confidence);
    }
  }
};

export const markConfirmedOutage = async ({
  scopeId,
  startMs,
  endMs,
  source = 'manual',
  notes = null
}) => {
  const ref = await db.collection('powerOutages').add({
    scopeId,
    startMs,
    endMs: endMs ?? null,
    resolved: !!endMs,
    confirmed: true,
    confirmationSource: source,
    notes: notes ?? null,
    createdBy: 'operator',
    createdAt: PulseRealm.PulseNOW,
    lastUpdatedMs: PulseRealm.PulseNOW
  });

  return ref.id;
};

const isZoneInOutageWindow = async (scopeId, minDurationMs) => {
  const sinceMs = PulseRealm.PulseNOW - minDurationMs;

  const snap = await db
    .collection('powerHistory')
    .where('scopeId', '==', scopeId)
    .where('bucketStartMs', '>=', sinceMs)
    .orderBy('bucketStartMs', 'asc')
    .get();

  if (snap.empty) return false;

  let allBad = true;

  snap.forEach(doc => {
    const d = doc.data();
    if (d.status === 'normal') {
      allBad = false;
    }
  });

  return allBad;
};

const getBucketStartMs = (nowMs, bucketSizeMs) => {
  return nowMs - (nowMs % bucketSizeMs);
};

const getPowerSettings = async () => {
  const ref = db.collection('powerSettings').doc('sanpedro_engine');
  const snap = await ref.get();

  if (!snap.exists) {
    const defaults = {
      id: 'sanpedro_engine',
      baselineWindowMs: 7 * 24 * 60 * 60 * 1000,
      minDeviationPctBigScope: 0.15,
      minDeviationPctSmallScope: 0.25,
      minDurationMsForOutageWindow: 30 * 60 * 1000,
      notifyOnConfidenceAbove: 0.8
    };
    await ref.set(defaults);
    return defaults;
  }

  return snap.data();
};

const sendOutageNotification = async (zone, confidence) => {
  const msg =
    'Power outage likely in ' +
    zone.name +
    ' (confidence ' +
    Math.round(confidence * 100) +
    '%).';

  // TODO: SMS / push / email / webhook
  log('[POWER-OUTAGE-NOTIFY]', msg);
};
// OPTIONAL: simple HTML fetcher
const safeFetchText = async url => {
  const res = await fetch(url, { method: "GET", redirect: "follow" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return await res.text();
};

export async function fetchPowerOutages() {
  const outagesDocRef = db.collection("environment").doc("outages");
  const nowMs = PulseRealm.PulseNOW.toMillis();

  // 1) PRIMARY: engine outages
  const powerSnap = await db
    .collection("power")
    .where("status", "==", "outage_window")
    .get();

  const engineOutages = [];
  powerSnap.forEach(doc => {
    const d = doc.data();
    engineOutages.push({
      id: "engine-" + d.scopeId,
      source: "engine",
      scopeId: d.scopeId,
      scopeType: d.scopeType,
      status: d.status,
      confidenceScore: d.confidenceScore || 0,
      currentRate: d.currentRate ?? null,
      baselineRate: d.baselineRate ?? null,
      deviationPct: d.deviationPct ?? null,
      lastUpdatedMs: d.lastUpdatedMs ?? nowMs
    });
  });

  // 2) SECONDARY: BEL HTML (best-effort)
  let belOutages = [];
  try {
    const html = await safeFetchText(BEL_POWER_UPDATES_URL);
    belOutages = parseBelPowerUpdatesHtml(html);
  } catch (belErr) {
    console.warn("BEL PowerUpdates fetch/parse failed:", belErr.message);
  }

  // 3) MERGED VIEW
  const outages = {
    engine: engineOutages,
    bel: belOutages
  };

  const data = {
    outages,
    stale: false
  };

  const doc = envResponse({
    success: true,
    raw: { outages },
    data
  });

  // 4) WRITE LIVE
  await outagesDocRef.set(doc);

  // 5) WRITE HISTORY
  await db.collection("environment_history").add({
    type: "outage",
    timestamp: doc.updated,
    source: "ENGINE+BEL",
    outages,
    meta: {
      stale: false,
      fallbackUsed: false,
      lastGoodUpdated: null
    }
  });

  return doc;
}

// TODO: replace with real BEL Power Updates URL
const BEL_POWER_UPDATES_URL = "https://www.bel.com.bz/PowerUpdates.aspx";

export const getPowerOutages = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 240,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    const outagesDocRef = db.collection("environment").doc("outages");

    try {
      const doc = await fetchPowerOutages();
      return res.json(doc);

    } catch (err) {
      console.error("getPowerOutages Error:", err.message);

      let fallbackDoc = null;
      try {
        const prevSnap = await outagesDocRef.get();
        if (prevSnap.exists) {
          const prev = prevSnap.data() || {};
          const prevData = prev.data || {};
          fallbackDoc = envResponse({
            success: false,
            error: err.message,
            raw: prev.raw || null,
            data: {
              ...(prevData || {}),
              stale: true,
              lastGoodUpdated: prev.updated || null
            }
          });
        }
      } catch (fallbackErr) {
        console.error("Outage fallback error:", fallbackErr.message);
      }

      const doc =
        fallbackDoc ||
        envResponse({
          success: false,
          error: err.message
        });

      await db.collection("environment_history").add({
        type: "outage",
        timestamp: doc.updated,
        source: "ENGINE+BEL",
        outages: doc.data.outages || {},
        meta: {
          stale: doc.data.stale || false,
          fallbackUsed: !!fallbackDoc,
          lastGoodUpdated: doc.data.lastGoodUpdated || null
        },
        error: err.message
      });

      await sendAdminInfoEmail("Environment Warning: getPowerOutages", {
        error: err.message,
        note: fallbackDoc
          ? "Using last-known-good outage data (stale=true)."
          : "No fallback outage data available."
      });

      return res.json(doc);
    }
  }
);

// VERY SIMPLE PLACEHOLDER – you’ll wire this to BEL’s actual HTML structure
export const parseBelPowerUpdatesHtml = html => {
  if (!html || typeof html !== "string") return [];

  // 1. Extract the GridView1 table
  const tableMatch = html.match(/<table[^>]*id="GridView1"[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return [];

  const tableHtml = tableMatch[1];

  // 2. Split into rows
  const rows = tableHtml.split(/<\/tr>/i).map(r => r.trim()).filter(r => r.length > 0);

  // 3. Detect "no power updates"
  if (rows.length === 1 && rows[0].includes("no power updates")) {
    return [];
  }

  // 4. Parse rows into <td> cells
  const outages = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Skip header rows (if they ever add them)
    if (row.toLowerCase().includes("<th")) continue;

    // Extract all <td> cells
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m =>
      m[1]
        .replace(/<[^>]+>/g, "") // strip HTML tags
        .replace(/&nbsp;/g, " ")
        .trim()
    );

    // Skip rows that don't have 5 cells
    if (cells.length !== 5) continue;

    const [area, start, end, status, cause] = cells;

    outages.push({
      id: `bel-${PulseRealm.PulseNOW}-${i}`,
      source: "bel",
      area: area || null,
      startTime: parseBelDate(start),
      endTime: parseBelDate(end),
      status: status || "Unknown",
      cause: cause || "Unknown"
    });
  }

  return outages;
};

// BEL uses dd/mm/yyyy or mm/dd/yyyy depending on mood.
// We normalize safely.
const parseBelDate = str => {
  if (!str || !str.trim()) return null;

  const d = new Date(str);
  if (!isNaN(d.getTime())) return d.getTime();

  return null;
};

export async function fetchStorms() {
  const stormsDocRef = db.collection("environment").doc("storms");

  // NHC CurrentStorms.json – stable, never breaks
  const url = "https://www.nhc.noaa.gov/CurrentStorms.json";
  const raw = await safeFetchJson(url);

  if (!raw || !Array.isArray(raw)) {
    throw new Error("NHC storms feed returned invalid structure");
  }

  const activeStorms = raw.map(s => ({
    id: s.id || null,
    name: s.name || "Unnamed",
    type: s.type || "Storm",
    advisoryNumber: s.advisory || null,
    windKts: s.wind || null,
    pressureMb: s.pressure || null,
    lat: s.lat || null,
    lon: s.lon || null
  }));

  const data = {
    activeStorms,
    stale: false
  };

  const doc = envResponse({
    success: true,
    raw: { activeStorms },
    data
  });

  await stormsDocRef.set(doc);

  await db.collection("environment_history").add({
    type: "storms",
    timestamp: doc.updated,
    data
  });

  return doc;
}

export const getStorms = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 240,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    const stormsDocRef = db.collection("environment").doc("storms");

    try {
      const doc = await fetchStorms();
      return res.json(doc);

    } catch (err) {
      console.error("Storms error:", err.message);

      // FALLBACK
      let fallbackDoc = null;
      try {
        const prevSnap = await stormsDocRef.get();
        if (prevSnap.exists) {
          const prev = prevSnap.data() || {};
          const prevData = prev.data || {};

          fallbackDoc = envResponse({
            success: false,
            error: err.message,
            raw: prev.raw || null,
            data: {
              ...(prevData || {}),
              stale: true,
              lastGoodUpdated: prev.updated || null
            }
          });
        }
      } catch (fallbackErr) {
        console.error("Storms fallback error:", fallbackErr.message);
      }

      const doc = fallbackDoc || envResponse({
        success: false,
        error: err.message
      });

      await db.collection("environment_history").add({
        type: "storms",
        timestamp: doc.updated,
        error: err.message,
        fallback: !!fallbackDoc
      });

      await sendAdminInfoEmail(
        "Environment Warning: getStorms",
        {
          error: err.message,
          note: fallbackDoc
            ? "Using last-known-good storms data (stale=true)."
            : "No fallback storms data available."
        }
      );

      return res.json(doc);
    }
  }
);

// CORE HELPER
export async function fetchSargassum() {
  const sargDocRef = db.collection("environment").doc("sargassum");

  // AOML 5-day composite – stable dataset
  const url =
    "https://cwcgom.aoml.noaa.gov/erddap/griddap/SAI_5day.json" +
    "?sargassum_index[0:1:0][0:1:0]";

  const raw = await safeFetchJson(url);

  const value =
    raw.table.rows[0][2] != null
      ? Number(raw.table.rows[0][2])
      : null;

  if (value === null || Number.isNaN(value)) {
    throw new Error("AOML Sargassum 5-day feed returned invalid structure");
  }

  const data = {
    value,
    stale: false
  };

  const doc = envResponse({ success: true, raw, data });

  await sargDocRef.set(doc);
  await db.collection("environment_history").add({
    type: "sargassum",
    timestamp: doc.updated,
    data
  });

  return doc;
}

// HTTP WRAPPER
export const getSargassum = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 240,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    const sargDocRef = db.collection("environment").doc("sargassum");

    try {
      const doc = await fetchSargassum();
      return res.json(doc);
    } catch (err) {
      console.error("Sargassum error:", err.message);

      // FALLBACK
      let fallbackDoc = null;
      try {
        const prevSnap = await sargDocRef.get();
        if (prevSnap.exists) {
          const prev = prevSnap.data() || {};
          const prevData = prev.data || {};
          fallbackDoc = envResponse({
            success: false,
            error: err.message,
            raw: prev.raw || null,
            data: {
              ...(prevData || {}),
              stale: true,
              lastGoodUpdated: prev.updated || null
            }
          });
        }
      } catch (fallbackErr) {
        console.error("Sargassum fallback error:", fallbackErr.message);
      }

      const doc = fallbackDoc || envResponse({
        success: false,
        error: err.message
      });

      await db.collection("environment_history").add({
        type: "sargassum",
        timestamp: doc.updated,
        error: err.message,
        fallback: !!fallbackDoc
      });

      await sendAdminInfoEmail(
        "Environment Warning: getSargassum",
        {
          error: err.message,
          note: fallbackDoc
            ? "Using last-known-good sargassum data (stale=true)."
            : "No fallback sargassum data available."
        }
      );

      return res.json(doc);
    }
  }
);

// CORE HELPER
export async function fetchHeatIndex() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=17.92&longitude=-87.95&current=temperature_2m,relative_humidity_2m";

  const raw = await safeFetchJson(url);

  const temp = raw.current.temperature_2m;
  const rh = raw.current.relative_humidity_2m;

  if (temp == null || rh == null) {
    throw new Error("Invalid heat index structure from Open-Meteo");
  }

  const cToF = c => (c * 9) / 5 + 32;
  const fToC = f => ((f - 32) * 5) / 9;

  let hiC;

  if (temp < 26.7) {
    hiC = temp;
  } else {
    const tF = cToF(temp);

    const hiF =
      -42.379 +
      2.04901523 * tF +
      10.14333127 * rh -
      0.22475541 * tF * rh -
      0.00683783 * tF * tF -
      0.05481717 * rh * rh +
      0.00122874 * tF * tF * rh +
      0.00085282 * tF * rh * rh -
      0.00000199 * tF * tF * rh * rh;

    hiC = fToC(hiF);
  }

  const data = { heatIndex: hiC };

  const doc = envResponse({ success: true, raw, data });

  await db.collection("environment").doc("heatIndex").set(doc);
  await db.collection("environment_history").add({
    type: "heatIndex",
    timestamp: doc.updated,
    data
  });

  return doc;
}

// HTTP WRAPPER
export const getHeatIndex = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 240,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const doc = await fetchHeatIndex();
      return res.json(doc);
    } catch (err) {
      console.error("HeatIndex error:", err.message);

      const fallback = { heatIndex: null };

      const doc = envResponse({
        success: false,
        error: err.message,
        data: fallback
      });

      await db.collection("environment").doc("heatIndex").set(doc);
      await db.collection("environment_history").add({
        type: "heatIndex",
        timestamp: doc.updated,
        error: err.message
      });

      await sendAdminInfoEmail(
        "Environment Warning: getHeatIndex",
        {
          error: err.message,
          note: "Non-vital warning. Heat index feed returned invalid structure."
        }
      );

      return res.json(doc);
    }
  }
);

// CORE HELPER
export async function fetchWildlife() {
  const month = new Date().getMonth() + 1;

  const raw = {
    jellyfish: month === 8 || month === 9,
    turtles: month >= 5 && month <= 11,
    tarpon: month >= 5 && month <= 9,
    whalesharks: month >= 4 && month <= 6,
    manatees: month >= 3 && month <= 11,
    stingrays: month >= 6 && month <= 8,
    nursesharks: month >= 5 && month <= 7,
    crocs: true,
    iguanas: true,
    crabs: true,
    dolphins: true,
    fish: true
  };

  const animals = Object.keys(raw);
  const results = {};

  for (const animal of animals) {
    const active = Boolean(raw[animal]);

    const sightSnap = await db
      .collection("wildlife_sightings")
      .doc(animal)
      .collection("entries")
      .orderBy("ts", "desc")
      .limit(1)
      .get();

    let lastSeen = null;

    if (!sightSnap.empty) {
      const d = sightSnap.docs[0].data();
      lastSeen = {
        lat: d.lat,
        lng: d.lng,
        ts: d.ts,
        source: d.source || "unknown"
      };
    }

    results[animal] = {
      active,
      locationName: active ? getWildlifeLocation(animal) : null,
      lastSeen
    };
  }

  const doc = envResponse({
    success: true,
    raw,
    data: results
  });

  await db.collection("environment").doc("wildlife").set(doc);
  await db.collection("environment_history").add({
    type: "wildlife",
    timestamp: doc.updated,
    data: results
  });

  return doc;
}

// HTTP WRAPPER
export const getWildlife = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 240,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const doc = await fetchWildlife();
      return res.json(doc);
    } catch (err) {
      console.error("Wildlife error:", err.message);

      const doc = envResponse({ success: false, error: err.message });

      await db.collection("environment_history").add({
        type: "wildlife",
        timestamp: doc.updated,
        error: err.message
      });

      await sendAdminInfoEmail(
        "Environment Warning: getWildlife",
        {
          error: err.message,
          note: "Non-vital warning. Wildlife function returned structurally invalid data."
        }
      );

      return res.json(doc);
    }
  }
);

export const reportWildlifeSighting = onRequest(
  { region: "us-central1" },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    const { animal, lat, lng, notes, source = "user" } = req.body || {};

    if (!animal || !lat || !lng) {
      return res.json({ success: false, error: "Missing fields" });
    }

    await db
      .collection("wildlife_sightings")
      .doc(animal.toLowerCase())
      .collection("entries")
      .add({
        lat,
        lng,
        ts: PulseRealm.PulseNOW,
        source,
        notes: notes || null
      });

    return res.json({ success: true });
  }
);

export async function fetchMoonPhase() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=17.92&longitude=-87.95&daily=moon_phase&timezone=America/Belize";

  const raw = await safeFetchJson(url);

  if (!raw.daily.moon_phase || !Array.isArray(raw.daily.moon_phase)) {
    throw new Error("Invalid moon phase data");
  }

  const phases = raw.daily.moon_phase;
  const phase = typeof phases[0] === "number" ? phases[0] : 0;

  const data = { phase, phases };
  const doc = envResponse({ success: true, raw, data });

  await db.collection("environment").doc("moon").set(doc);

  await db.collection("environment_history").add({
    type: "moon",
    timestamp: doc.updated,
    data
  });

  return doc;
}

export async function fetchWaves() {
  const url =
    "https://marine-api.open-meteo.com/v1/marine?latitude=17.92&longitude=-87.95&hourly=wave_height,wave_direction,wave_period";

  const raw = await safeFetchJson(url);

  if (!raw.hourly) {
    throw new Error("Invalid waves data");
  }

  const time = raw.hourly.time ?? [];
  const heightM = raw.hourly.wave_height ?? [];
  const direction = raw.hourly.wave_direction ?? [];
  const period = raw.hourly.wave_period ?? [];

  const heightFt = heightM.map(m => m * 3.28084);

  const deriveDirection = deg => {
    if (deg == null) return null;
    if (deg < 45) return "from the north";
    if (deg < 90) return "from the northeast";
    if (deg < 135) return "from the east";
    if (deg < 180) return "from the southeast";
    if (deg < 225) return "from the south";
    if (deg < 270) return "from the southwest";
    if (deg < 315) return "from the west";
    return "from the northwest";
  };

  const derived = {
    friendlyDirection: deriveDirection(direction[0]),
    swellType:
      period[0] < 8
        ? "wind-driven chop"
        : period[0] < 12
        ? "mixed swell"
        : "smooth long-period swell",
    trend3h:
      heightFt[3] != null
        ? heightFt[3] > heightFt[0]
          ? "rising a little"
          : heightFt[3] < heightFt[0]
          ? "calming down"
          : "holding steady"
        : null,
    trend6h:
      heightFt[6] != null
        ? heightFt[6] > heightFt[0]
          ? "building later"
          : heightFt[6] < heightFt[0]
          ? "easing later"
          : "steady"
        : null
  };

  const data = { time, heightM, heightFt, direction, period, derived };
  const doc = envResponse({ success: true, raw, data });

  await db.collection("environment").doc("waves").set(doc);

  await db.collection("environment_history").add({
    type: "waves",
    timestamp: doc.updated,
    data
  });

  return doc;
}

export async function fetchWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=17.92&longitude=-87.95" +
    "&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,apparent_temperature" +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code" +
    "&timezone=America/Belize";

  const raw = await safeFetchJson(url);

  if (!raw.current || !raw.daily) {
    throw new Error("Invalid weather data");
  }

  const data = {
    current: raw.current,
    daily: raw.daily
  };

  const doc = envResponse({ success: true, raw, data });

  await db.collection("environment").doc("weather").set(doc);

  await db.collection("environment_history").add({
    type: "weather",
    timestamp: doc.updated,
    data
  });

  return doc;
}

export const getMoonPhase = onRequest(
  { 
    region: "us-central1",
     timeoutSeconds: 240,
      memory: "512MiB"
     },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const doc = await fetchMoonPhase();
    return res.json(doc);
  } catch (err) {


      console.error("Moon error:", err.message);

      const fallback = { phase: 0, phases: [] };
      const doc = envResponse({ success: false, error: err.message, data: fallback });

      await db.collection("environment_history").add({
        type: "moon",
        timestamp: doc.updated,
        error: err.message
      });

      // NON-VITAL ADMIN WARNING
      await sendAdminInfoEmail(
        "Environment Warning: getMoonPhase",
        {
          error: err.message,
          note: "Non-vital warning. Moon phase data was structurally invalid."
        }
      );

      return res.json(doc);
    }
  }
);


export const getWaves = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 240,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const doc = await fetchWaves();
    return res.json(doc);
  } catch (err) {

      console.error("Waves error:", err.message);

      const doc = envResponse({ success: false, error: err.message });

      await db.collection("environment_history").add({
        type: "waves",
        timestamp: doc.updated,
        error: err.message
      });

      // NON-VITAL ADMIN WARNING
      await sendAdminInfoEmail(
        "Environment Warning: getWaves",
        {
          error: err.message,
          note: "Non-vital warning. Waves API returned invalid structure."
        }
      );

      return res.json(doc);
    }
  }
);


export const getWeather = onRequest(
  {
     region: "us-central1",
     timeoutSeconds: 240,
     memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
    const doc = await fetchWeather();
    return res.json(doc);
  } catch (err) {

      console.error("Weather error:", err.message);

      const doc = envResponse({ success: false, error: err.message });

      await db.collection("environment_history").add({
        type: "weather",
        timestamp: doc.updated,
        error: err.message
      });

      // NON-VITAL ADMIN WARNING
      await sendAdminInfoEmail(
        "Environment Warning: getWeather",
        {
          error: err.message,
          note: "Non-vital warning. Weather API returned invalid structure."
        }
      );

      return res.json(doc);
    }
  }
);

// export const timerLogout = onSchedule("every 5 minutes", async () => {
//   const runId = crypto.randomUUID();
//   const logId = `LOGOUT_${runId}`;
//   const errorPrefix = `ERR_${runId}_`;

//   const userChanges = {};
//   const pulseChanges = {};

//   try {
//     const now = PulseRealm.PulseNOW;
//     const cutoff = new Date(now - 15 * 60 * 1000);

//     // ---------------------------------------------------------
//     // ⭐ 1. LOAD SETTINGS (isolated try/catch)
//     // ---------------------------------------------------------
//     let settings = {};
//     let seasonalActive = false;
//     let seasonalName = null;
//     let seasonalMultiplier = 1;
//     let calculationVersion = 1;

//     try {
//       const settingsSnap = await db.collection("TPSettings").doc("global").get();
//       settings = settingsSnap.exists ? settingsSnap.data() : {};

//       const season = getSeasonFromSettings(settings);
//       seasonalActive = season.seasonalActive;
//       seasonalName = season.seasonalName;
//       seasonalMultiplier = season.seasonalMultiplier;

//       calculationVersion = settings.calculationVersion ?? 1;

//     } catch (err) {
//       await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}SETTINGS`).set({
//         fn: "timerLogout",
//         stage: "settings_load",
//         error: String(err),
//         runId,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // ⭐ 2. LOGOUT USERS (isolated try/catch)
//     // ---------------------------------------------------------
//     try {
//       const snap = await db.collection("Users")
//         .where("TPSecurity.lastAppActive", "<", cutoff)
//         .where("TPSecurity.isLoggedIn", "==", true)
//         .get();

//       for (const docSnap of snap.docs) {
//         const uid = docSnap.id;

//         try {
//           const u = docSnap.data() || {};
//           const TPLoyalty = u.TPLoyalty || {};

//           const correctedLoyalty = {
//             ...TPLoyalty,
//             seasonalActive,
//             seasonalName,
//             seasonalMultiplier,
//             streakMultiplier: TPLoyalty.streakMultiplier ?? 1,
//             streakCount: TPLoyalty.streakCount ?? 0,
//             streakExpires: TPLoyalty.streakExpires ?? null,
//             calculationVersion,
//             updated: PulseRealm.PulseNOW
//           };

//           await docSnap.ref.update({
//             "TPSecurity.isLoggedIn": false,
//             "TPLoyalty": correctedLoyalty
//           });

//           userChanges[uid] = "LogoutCHANGE";

//         } catch (err) {
//           userChanges[uid] = "LogoutNOCHANGE";

//           await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
//             fn: "timerLogout",
//             stage: "logout_update",
//             uid,
//             error: String(err),
//             runId,
//             createdAt: PulseRealm.PulseNOW
//           });
//         }
//       }

//     } catch (err) {
//       await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}LOGOUT_BLOCK`).set({
//         fn: "timerLogout",
//         stage: "logout_block",
//         error: String(err),
//         runId,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // ⭐ 3. FIX PULSE HISTORY (isolated try/catch)
//     // ---------------------------------------------------------
//     try {
//       const usersSnap = await db.collection("Users").get();

//       for (const userDoc of usersSnap.docs) {
//         const uid = userDoc.id;

//         try {
//           const histRef = db.collection("PulseHistory").doc(uid).collection("entries");
//           const histSnap = await histRef.where("pointsSnapshot", "==", null).limit(50).get();

//           if (histSnap.empty) continue;

//           for (const entry of histSnap.docs) {
//             const entryKey = `${uid}/${entry.id}`;

//             try {
//               const h = entry.data();

//               const snapshot = {
//                 type: h.type,
//                 label: h.label,
//                 amount: h.amount,
//                 basePoints: h.amount,
//                 tierMultiplier: h.tierMultiplier ?? 1,
//                 streakMultiplier: h.streakMultiplier ?? 1,
//                 seasonalMultiplier,
//                 tierBonusPoints: 0,
//                 streakBonusPoints: 0,
//                 seasonalBonusPoints: 0,
//                 fastDeliveryBonus: 0,
//                 delayPenalty: 0,
//                 totalPointsEarned: h.amount,
//                 seasonalActive,
//                 seasonalName,
//                 calculationVersion,
//                 ts: h.ts ?? now,
//                 createdAt: h.createdAt ?? now
//               };

//               await entry.ref.update({ pointsSnapshot: snapshot });

//               pulseChanges[entryKey] = "LogoutCHANGE";

//             } catch (err) {
//               pulseChanges[entryKey] = "LogoutNOCHANGE";

//               await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${entryKey.replace("/", "_")}`).set({
//                 fn: "timerLogout",
//                 stage: "pulsehistory_fix",
//                 uid,
//                 entryId: entry.id,
//                 error: String(err),
//                 runId,
//                 createdAt: PulseRealm.PulseNOW
//               });
//             }
//           }

//         } catch (err) {
//           await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
//             fn: "timerLogout",
//             stage: "pulsehistory_query",
//             uid,
//             error: String(err),
//             runId,
//             createdAt: PulseRealm.PulseNOW
//           });
//         }
//       }

//     } catch (err) {
//       await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}PULSE_BLOCK`).set({
//         fn: "timerLogout",
//         stage: "pulse_block",
//         error: String(err),
//         runId,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // ⭐ 4. ALWAYS WRITE TIMER LOG
//     // ---------------------------------------------------------
//     await db.collection("TIMER_LOGS").doc(logId).set({
//       fn: "timerLogout",
//       runId,
//       users: userChanges,
//       pulseHistory: pulseChanges,
//       createdAt: PulseRealm.PulseNOW
//     });

//   } catch (err) {
//     // ---------------------------------------------------------
//     // ⭐ 5. FATAL ERROR (should never happen)
//     // ---------------------------------------------------------
//     await db.collection("FUNCTION_ERRORS").doc(`ERR_FATAL_${runId}`).set({
//       fn: "timerLogout",
//       stage: "fatal",
//       error: String(err),
//       runId,
//       createdAt: PulseRealm.PulseNOW
//     });
//   }
// });

// export const securitySweep = onSchedule("every 24 hours", async () => {
//   const runId = crypto.randomUUID();
//   const logId = `SECURE_${runId}`;
//   const errorPrefix = `ERR_${runId}_`;

//   const rotatedUsers = [];
//   const flaggedUsers = [];

//   try {
//     const nowMs = PulseRealm.PulseNOW;
//     const now = new Date(nowMs);
//     const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

//     const dayOfWeek = now.getUTCDay();
//     const weekNumber = Math.floor(nowMs / (7 * 24 * 60 * 60 * 1000));

//     const isWeeklyCheckDay = dayOfWeek === 1;
//     const isBiWeeklyIntegrityCheck = isWeeklyCheckDay && (weekNumber % 2 === 0);

//     const usersSnap = await db.collection("Users").get();

//     // ---------------------------------------------------------
//     // ⭐ 1. IDENTITY SWEEP (wrapped in its own try/catch)
//     // ---------------------------------------------------------
//     try {
//       for (const doc of usersSnap.docs) {
//         const uid = doc.id;

//         try {
//           const u = doc.data() || {};
//           const TPIdentity = u.TPIdentity || {};
//           const TPSecurity = u.TPSecurity || {};

//           // -----------------------------
//           // TIMESTAMP NORMALIZATION
//           // -----------------------------
//           let lastJWT = null;

//           if (TPIdentity.lastJWTIssuedAt) {
//             if (typeof TPIdentity.lastJWTIssuedAt.toMillis === "function") {
//               lastJWT = TPIdentity.lastJWTIssuedAt.toMillis();
//             } else if (TPIdentity.lastJWTIssuedAt._seconds) {
//               lastJWT = TPIdentity.lastJWTIssuedAt._seconds * 1000;
//             } else if (typeof TPIdentity.lastJWTIssuedAt === "number") {
//               lastJWT = TPIdentity.lastJWTIssuedAt;
//             }
//           }

//           const age = lastJWT ? nowMs - lastJWT : Infinity;
//           const needs30DayRefresh = age > THIRTY_DAYS;

//           // -----------------------------
//           // SECURITY FLAGS
//           // -----------------------------
//           const danger =
//             TPSecurity.vaultLockdown ||
//             TPSecurity.appLocked ||
//             TPSecurity.hackerFlag ||
//             TPSecurity.forceIdentityRefresh ||
//             (TPSecurity.failedLoginAttempts > 5);

//           const ipJump =
//             TPSecurity.lastKnownIP &&
//             TPSecurity.previousIP &&
//             TPSecurity.lastKnownIP !== TPSecurity.previousIP;

//           const deviceJump =
//             TPSecurity.lastKnownDevice &&
//             TPSecurity.previousDevice &&
//             TPSecurity.lastKnownDevice !== TPSecurity.previousDevice;

//           const needsEarlyRefresh = danger || ipJump || deviceJump;

//           const totalFlags =
//             (TPSecurity.failedLoginAttempts || 0) +
//             (TPSecurity.hackerFlag ? 3 : 0) +
//             (TPSecurity.vaultLockdown ? 5 : 0) +
//             (TPSecurity.appLocked ? 5 : 0);

//           if (totalFlags >= 10) {
//             flaggedUsers.push({
//               uid,
//               email: TPIdentity.email || null,
//               failedLoginAttempts: TPSecurity.failedLoginAttempts || 0,
//               vaultLockdown: !!TPSecurity.vaultLockdown,
//               appLocked: !!TPSecurity.appLocked,
//               hackerFlag: !!TPSecurity.hackerFlag
//             });
//           }

//           if (!needs30DayRefresh && !needsEarlyRefresh) continue;

//           // -----------------------------
//           // ROOT TOKEN (PERMANENT)
//           // -----------------------------
//           const rootResendToken = u.UserToken || null;

//           // -----------------------------
//           // SESSION TOKEN (ROTATING)
//           // -----------------------------
//           const oldSessionToken = TPIdentity.resendToken || null;

//           let newSessionToken;
//           try {
//             newSessionToken = jwt.sign(
//               {
//                 uid,
//                 email: TPIdentity.email || null,
//                 name: TPIdentity.name || TPIdentity.displayName || null
//               },
//               JWT_SECRET.value(),
//               { expiresIn: "30d" }
//             );
//           } catch (err) {
//             await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
//               fn: "securitySweep",
//               stage: "jwt_sign",
//               uid,
//               error: String(err),
//               runId,
//               createdAt: PulseRealm.PulseNOW
//             });
//             continue;
//           }

//           const reason = needsEarlyRefresh
//             ? "early_security_refresh"
//             : "30_day_rotation";

//           // -----------------------------
//           // WRITE TO TPIdentityHistory
//           // -----------------------------
//           try {
//             await db.collection("TPIdentityHistory").add({
//               uid,
//               rootResendToken,
//               oldSessionToken,
//               newSessionToken,
//               reason,
//               dangerFlags: {
//                 vaultLockdown: TPSecurity.vaultLockdown || false,
//                 appLocked: TPSecurity.appLocked || false,
//                 hackerFlag: TPSecurity.hackerFlag || false,
//                 failedLoginAttempts: TPSecurity.failedLoginAttempts || 0,
//                 ipJump,
//                 deviceJump
//               },
//               runId,
//               createdAt: PulseRealm.PulseNOW
//             });
//           } catch (err) {
//             await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
//               fn: "securitySweep",
//               stage: "identity_log",
//               uid,
//               error: String(err),
//               runId,
//               createdAt: PulseRealm.PulseNOW
//             });
//             continue;
//           }

//           // -----------------------------
//           // UPDATE USER RECORD
//           // -----------------------------
//           try {
//             await doc.ref.update({
//               "TPIdentity.resendToken": newSessionToken,
//               "TPIdentity.lastJWTIssuedAt": PulseRealm.PulseNOW,

//               "TPSecurity.previousIP": TPSecurity.lastKnownIP || null,
//               "TPSecurity.previousDevice": TPSecurity.lastKnownDevice || null,

//               "TPSecurity.lastKnownIP": TPSecurity.lastKnownIP || null,
//               "TPSecurity.lastKnownDevice": TPSecurity.lastKnownDevice || null,

//               "TPSecurity.forceIdentityRefresh": false
//             });
//           } catch (err) {
//             await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
//               fn: "securitySweep",
//               stage: "user_update",
//               uid,
//               error: String(err),
//               runId,
//               createdAt: PulseRealm.PulseNOW
//             });
//             continue;
//           }

//           rotatedUsers.push(uid);

//         } catch (err) {
//           await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
//             fn: "securitySweep",
//             stage: "user_loop",
//             uid,
//             error: String(err),
//             runId,
//             createdAt: PulseRealm.PulseNOW
//           });
//         }
//       }
//     } catch (err) {
//       await db.collection("FUNCTION_ERRORS").doc(`ERR_IDENTITY_SWEEP_${runId}`).set({
//         fn: "securitySweep",
//         stage: "identity_sweep_block",
//         error: String(err),
//         runId,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // ⭐ 2. PULSEBAND CLEANUP (its own try/catch)
//     // ---------------------------------------------------------
//     try {
//       const cutoff24h = PulseRealm.PulseNOW - 24 * 60 * 60 * 1000;
//       const cutoff7d  = PulseRealm.PulseNOW - 7 * 24 * 60 * 60 * 1000;

//       const deletedSessions = [];
//       const deletedChunks = [];
//       const deletedErrors = [];
//       const deletedRedownloads = [];

//       const sessionsSnap = await db.collection("pulseband_sessions").get();

//       for (const s of sessionsSnap.docs) {
//         const data = s.data() || {};
//         const createdAt = data.createdAt.toMillis() || 0;

//         if (createdAt < cutoff24h) {
//           const chunksSnap = await s.ref.collection("chunks").get();

//           for (const c of chunksSnap.docs) {
//             await c.ref.delete();
//             deletedChunks.push(c.id);
//           }

//           await s.ref.delete();
//           deletedSessions.push(s.id);
//         }
//       }

//       const errorsSnap = await db.collection("pulseband_errors").get();
//       for (const e of errorsSnap.docs) {
//         const createdAt = e.data().createdAt.toMillis() || 0;
//         if (createdAt < cutoff7d) {
//           await e.ref.delete();
//           deletedErrors.push(e.id);
//         }
//       }

//       const redlSnap = await db.collection("pulseband_redownloads").get();
//       for (const r of redlSnap.docs) {
//         const createdAt = r.data().createdAt.toMillis() || 0;
//         if (createdAt < cutoff7d) {
//           await r.ref.delete();
//           deletedRedownloads.push(r.id);
//         }
//       }

//       await db.collection("TIMER_LOGS").doc(`PB_CLEANUP_${runId}`).set({
//         fn: "pulsebandCleanup",
//         runId,
//         deletedSessions,
//         deletedChunks,
//         deletedErrors,
//         deletedRedownloads,
//         createdAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       await db.collection("FUNCTION_ERRORS").doc(`ERR_PB_CLEANUP_${runId}`).set({
//         fn: "pulsebandCleanup",
//         stage: "cleanup",
//         error: String(err),
//         runId,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // ⭐ 3. TIMER LOG (always runs)
//     // ---------------------------------------------------------
//     await db.collection("TIMER_LOGS").doc(logId).set({
//       fn: "securitySweep",
//       runId,
//       rotatedUsers,
//       flaggedUsers,
//       sweepType: isWeeklyCheckDay ? "weekly" : "daily",
//       integrityCheck: isBiWeeklyIntegrityCheck,
//       rotationCount: rotatedUsers.length,
//       flaggedCount: flaggedUsers.length,
//       createdAt: PulseRealm.PulseNOW
//     });

//   } catch (err) {
//     await db.collection("FUNCTION_ERRORS").doc(`ERR_FATAL_${runId}`).set({
//       fn: "securitySweep",
//       stage: "fatal",
//       error: String(err),
//       runId,
//       createdAt: PulseRealm.PulseNOW
//     });
//   }
// });

export const loginCheck = onCall(async (req) => {
  const runId = PulseRealm.PulseNOW;
  const logId = `LOGIN_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  const userChanges = {};

  try {
    const { userId, deviceInfo, ip } = req.data || {};

    // ---------------------------------------------------------
    // ⭐ 1. VALIDATION (isolated try/catch)
    // ---------------------------------------------------------
    if (!userId) {
      try {
        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}missing_userId`).set({
          fn: "loginCheck",
          stage: "missing_userId",
          error: "Missing userId",
          runId,
          createdAt: PulseRealm.PulseNOW
        });
      } catch (_) {}

      return { ok: false, error: "Missing userId" };
    }

    const userRef = db.collection("Users").doc(userId);
    const increment = (n = 1) => ({ integerIncrement: n });

    const update = {
      "TPSecurity.lastAppActive": PulseRealm.PulseNOW,
      "TPSecurity.lastActive": PulseRealm.PulseNOW,
      "TPSecurity.loginCount": increment(1),
      "TPSecurity.lastLoginAt": PulseRealm.PulseNOW
    };

    if (ip) update["TPSecurity.lastKnownIP"] = ip;
    if (deviceInfo) update["TPSecurity.lastKnownDevice"] = deviceInfo;

    // ---------------------------------------------------------
    // ⭐ 2. USER UPDATE (isolated try/catch)
    // ---------------------------------------------------------
    try {
      await userRef.set(update, { merge: true });
      userChanges[userId] = "LoginCHANGE";

    } catch (err) {
      userChanges[userId] = "LoginNOCHANGE";

      try {
        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${userId}`).set({
          fn: "loginCheck",
          stage: "user_update",
          uid: userId,
          error: String(err),
          runId,
          createdAt: PulseRealm.PulseNOW
        });
      } catch (_) {}

      // Still return cleanly — do NOT break the function
      return { ok: false, error: "User update failed" };
    }

    // ---------------------------------------------------------
    // ⭐ 3. ALWAYS WRITE TIMER LOG (isolated try/catch)
    // ---------------------------------------------------------
    try {
      await db.collection("TIMER_LOGS").doc(logId).set({
        fn: "loginCheck",
        runId,
        users: userChanges,
        createdAt: PulseRealm.PulseNOW
      });
    } catch (err) {
      await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}timerlog`).set({
        fn: "loginCheck",
        stage: "timer_log",
        error: String(err),
        runId,
        createdAt: PulseRealm.PulseNOW
      });
    }

    return { ok: true };

  } catch (err) {
    // ---------------------------------------------------------
    // ⭐ 4. FATAL ERROR (should never happen)
    // ---------------------------------------------------------
    try {
      await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}fatal`).set({
        fn: "loginCheck",
        stage: "fatal",
        error: String(err),
        runId,
        createdAt: PulseRealm.PulseNOW
      });
    } catch (_) {}

    return { ok: false, error: "Internal server error" };
  }
});

function getWildlifeLocation(animal) {
  const map = {
    jellyfish: "North Beach",
    turtles: "Hol Chan",
    tarpon: "Boca del Rio",
    whalesharks: "Gladden Spit",
    manatees: "South Lagoon",
    stingrays: "Shark Ray Alley",
    nursesharks: "Shark Ray Alley",
    crocs: "Lagoon-side mangroves",
    iguanas: "Boca del Rio trees",
    crabs: "Shoreline",
    dolphins: "Reef-side",
    fish: "Everywhere along the reef"
  };

  return map[animal] || "around the island";
}

export const redeemPulsePoints = onRequest(
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
      // ------------------------------------
      // LINEAGE VALIDATION (TPIdentity.resendToken)
      // ------------------------------------
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "").trim();
      const { uid, pointsToRedeem } = req.body || {};

      if (!token || !uid) {
        return res.status(403).json({
          success: false,
          error: "Missing uid or token"
        });
      }

      const userRef = db.collection("Users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }

      const user = userSnap.data() || {};
      const TPIdentity = user.TPIdentity || {};
      const TPLoyalty = user.TPLoyalty || {};
      const TPWallet = user.TPWallet || {};

      const storedToken = TPIdentity.resendToken || null;
      if (!storedToken || storedToken !== token) {
        return res.status(403).json({
          success: false,
          error: "Token mismatch"
        });
      }

      // ------------------------------------
      // VALIDATION (TPLoyalty as source of truth)
      // ------------------------------------
      const currentPoints = Number(TPLoyalty.pointsBalance) || 0;

      if (pointsToRedeem < 500 || pointsToRedeem % 500 !== 0) {
        return res.status(400).json({
          success: false,
          message: "Minimum redemption is 500 points, in increments of 500."
        });
      }

      if (currentPoints < pointsToRedeem) {
        return res.status(400).json({
          success: false,
          message: "Not enough points!"
        });
      }

      const newPoints = currentPoints - pointsToRedeem;
      const currentLifetime = Number(TPLoyalty.lifetimePoints) || 0;

      // ------------------------------------
      // LOAD SETTINGS (SEASONAL)
      // ------------------------------------
      const settingsSnap = await db.collection("TPSettings").doc("global").get();
      const settings = settingsSnap.data() || {};

      const {
        seasonalActive,
        seasonalName,
        seasonalMultiplier
      } = getSeasonFromSettings(settings);

      // ------------------------------------
      // UPDATE TPLoyalty + TPWallet
      // ------------------------------------
      await userRef.update({
        "TPLoyalty.pointsBalance": newPoints,
        "TPLoyalty.lifetimePoints": currentLifetime,
        "TPLoyalty.streakCount": 0,
        "TPLoyalty.updated": PulseRealm.PulseNOW,

        "TPWallet.pointsBalance": newPoints,
        "TPWallet.lifetimePoints": currentLifetime,
        "TPWallet.lastEarnedDate": TPWallet.lastEarnedDate || null
      });

      // ------------------------------------
      // HISTORY SNAPSHOT (from TPLoyalty)
      // ------------------------------------
      const snapshot = {
        seasonalName: TPLoyalty.seasonalName ?? seasonalName,
        seasonalMultiplier: TPLoyalty.seasonalMultiplier ?? seasonalMultiplier,
        seasonalActive: TPLoyalty.seasonalActive ?? seasonalActive,

        tier: TPLoyalty.tier || null,
        tierKey: TPLoyalty.tierKey || null,
        tierMultiplier: TPLoyalty.tierMultiplier || 1,

        streakCount: TPLoyalty.streakCount || 0,
        streakMultiplier: TPLoyalty.streakMultiplier || 1,
        streakExpires: TPLoyalty.streakExpires || null,

        calculationVersion: TPLoyalty.calculationVersion || 1,

        pointsBefore: currentPoints,
        pointsAfter: newPoints
      };

      // ------------------------------------
      // LOG HISTORY ENTRY (PulseHistory)
      // ------------------------------------
      await db
        .collection("PulseHistory")
        .doc(uid)
        .collection("entries")
        .add({
          type: "redeem",
          label: "Points Redeemed",
          amount: -pointsToRedeem,

          ts: PulseRealm.PulseNOW,
          createdAt: PulseRealm.PulseNOW,

          orderID: null,
          streakCount: 0,

          pulsepointsBefore: currentPoints,
          pulsepointsAfter: newPoints,

          seasonalName: snapshot.seasonalName,
          seasonalActive: snapshot.seasonalActive,

          calculationVersion: snapshot.calculationVersion,
          totalPointsEarned: -pointsToRedeem,

          pointsSnapshot: snapshot
        });

      // ------------------------------------
      // SEND USER EMAIL
      // ------------------------------------
      const userEmail = TPIdentity.email || null;
      const userName =
        TPIdentity.name ||
        TPIdentity.displayName ||
        "";

      if (userEmail) {
        const emailURL =
          "https://sendmassemail-ilx3agka5q-uc.a.run.app" +
          `?useremail=${encodeURIComponent(userEmail)}` +
          `&emailType=pulsePointRedemption` +
          `&points=${encodeURIComponent(pointsToRedeem)}` +
          `&name=${encodeURIComponent(userName)}` +
          `&uid=${encodeURIComponent(uid)}`;

        await fetch(emailURL);
      }

      // ------------------------------------
      // SUCCESS
      // ------------------------------------
      return res.json({
        success: true,
        pulsepoints: newPoints
      });

    } catch (err) {
      console.error("redeemPulsePoints error:", err);
      return res.json({
        success: false,
        error: "Server error: " + err.message
      });
    }
  }
);

// ---------------------------
// GET STRIPE STATUS (REBUILT)
// ---------------------------
// export const getStripeStatus = onRequest(
//   {
//     region: "us-central1",
//     secrets: [STRIPE_PASSWORD],
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   async (req, res) => {

//     // CORS
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const stripe = Stripe(STRIPE_PASSWORD.value());
//       const { uid, token, stripeAccountId: incomingId } = req.body || {};

//       if (!uid || !token) {
//         return res.json({ success: false, error: "Missing uid or token" });
//       }

//       // Load user
//       const userSnap = await db.collection("Users").doc(uid).get();
//       if (!userSnap.exists) {
//         return res.json({ success: false, error: "User not found" });
//       }

//       const user = userSnap.data() || {};
//       const TPIdentity = user.TPIdentity || {};

//       // Token validation
//       const storedToken = TPIdentity.resendToken || null;
//       if (!storedToken || storedToken !== token) {
//         return res.json({ success: false, error: "Token mismatch" });
//       }

//       // Resolve Stripe Account ID
//       const stripeAccountID =
//         incomingId ||
//         TPIdentity.stripeAccountID ||
//         null;

//       if (!stripeAccountID) {
//         return res.json({
//           success: true,
//           status: "not_connected",
//           onboardingLink:
//             `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
//         });
//       }

//       // Retrieve Stripe account
//       const acct = await stripe.accounts.retrieve(stripeAccountID);

//       if (acct.charges_enabled && acct.payouts_enabled) {
//         return res.json({
//           success: true,
//           status: "connected",
//           dashboardLink: `https://billing.stripe.com/p/login/4gM14mdIx8kK1w13KcfIs00connect/accounts/${acct.id}`
//         });
//       }

//       if (acct.requirements.currently_due.length > 0) {
//         return res.json({
//           success: true,
//           status: "needs_verification",
//           onboardingLink:
//             `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
//         });
//       }

//       return res.json({
//         success: true,
//         status: "pending",
//         onboardingLink:
//           `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
//       });

//     } catch (err) {
//       console.error("getStripeStatus error:", err);
//       return res.json({ success: false, error: "Server error: " + err.message });
//     }
//   }
// );

// export const getLogHtml = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const id = req.query.logId;

//         if (!id) {
//           return res.status(400).json({ success: false, error: "Missing logId" });
//         }

//         const doc = await db.collection("EmailLogs").doc(id).get();

//         if (!doc.exists) {
//           return res.status(404).json({ success: false, error: "Log not found" });
//         }

//         const data = doc.data() || {};
//         return res.json({
//           success: true,
//           html: data.html || ""
//         });

//       } catch (err) {
//         return res.status(500).json({ success: false, error: err.message });
//       }
//     });
//   }
// );

// export const getAllLogs = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [JWT_SECRET]
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         // ------------------------------------
//         // Extract uid + lineage token
//         // ------------------------------------
//         const authHeader = req.headers.authorization || "";
//         const token = authHeader.replace("Bearer ", "").trim();
//         const uid = req.headers["x-uid"] || req.body.uid || null;

//         if (!token || !uid) {
//           return res.status(403).json({
//             success: false,
//             error: "Missing uid or token"
//           });
//         }

//         // ------------------------------------
//         // Load requesting user
//         // ------------------------------------
//         const userDoc = await db.collection("Users").doc(uid).get();
//         if (!userDoc.exists) {
//           return res.status(404).json({
//             success: false,
//             error: "User not found"
//           });
//         }

//         const userData = userDoc.data() || {};
//         const TPIdentity = userData.TPIdentity || {};
//         const storedToken = TPIdentity.resendToken || null;

//         if (!storedToken || storedToken !== token) {
//           return res.status(403).json({
//             success: false,
//             error: "Token mismatch"
//           });
//         }

//         // ------------------------------------
//         // Validate email param
//         // ------------------------------------
//         const email = (req.query.email || "").trim().toLowerCase();
//         if (!email) {
//           return res.status(400).json({
//             success: false,
//             error: "Missing email"
//           });
//         }

//         // ------------------------------------
//         // Query logs
//         // ------------------------------------
//         const snap = await db
//           .collection("EmailLogs")
//           .where("to", "==", email)
//           .orderBy("createdAt", "desc")
//           .limit(500)
//           .get();

//         const safeMillis = (ts) =>
//           ts.toMillis() ??
//           (ts._seconds ? ts._seconds * 1000 : null);

//         const logs = snap.docs.map((doc) => {
//           const d = doc.data() || {};
//           return {
//             id: doc.id,
//             to: d.to || null,
//             subject: d.subject || null,
//             status: d.status || null,
//             type: d.type || null,
//             payload: d.payload || null,
//             createdAt: safeMillis(d.createdAt),
//             updatedAt: safeMillis(d.updatedAt)
//           };
//         });

//         return res.json({ success: true, logs });

//       } catch (err) {
//         console.error("getAllLogs error:", err);
//         return res.status(500).json({
//           success: false,
//           error: err.message
//         });
//       }
//     });
//   }
// );

// export const getAllOrders = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [JWT_SECRET]
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         // ------------------------------------
//         // Extract uid + lineage token
//         // ------------------------------------
//         const authHeader = req.headers.authorization || "";
//         const token = authHeader.replace("Bearer ", "").trim();
//         const uid = req.headers["x-uid"] || req.body.uid || null;

//         if (!token || !uid) {
//           return res.status(403).json({
//             success: false,
//             error: "Missing uid or token"
//           });
//         }

//         // ------------------------------------
//         // Load requesting user
//         // ------------------------------------
//         const userDoc = await db.collection("Users").doc(uid).get();
//         if (!userDoc.exists) {
//           return res.status(404).json({
//             success: false,
//             error: "User not found"
//           });
//         }

//         const userData = userDoc.data() || {};
//         const TPIdentity = userData.TPIdentity || {};
//         const storedToken = TPIdentity.resendToken || null;

//         if (!storedToken || storedToken !== token) {
//           return res.status(403).json({
//             success: false,
//             error: "Token mismatch"
//           });
//         }

//         // ------------------------------------
//         // Validate email param
//         // ------------------------------------
//         const email = (req.query.email || "").trim().toLowerCase();
//         if (!email) {
//           return res.status(400).json({
//             success: false,
//             error: "Missing email"
//           });
//         }

//         // ------------------------------------
//         // Query orders
//         // ------------------------------------
//         const customerSnap = await db
//           .collection("Orders")
//           .where("customerEmail", "==", email)
//           .orderBy("createdAt", "desc")
//           .get();

//         const delivererSnap = await db
//           .collection("Orders")
//           .where("delivererEmail", "==", email)
//           .orderBy("createdAt", "desc")
//           .get();

//         const safeMillis = (ts) =>
//           ts.toMillis() ??
//           (ts._seconds ? ts._seconds * 1000 : null);

//         const orders = {};

//         const add = (docs) => {
//           docs.forEach((doc) => {
//             const d = doc.data() || {};
//             const orderID = d.orderID || doc.id;

//             orders[orderID] = {
//               id: doc.id,
//               orderID,
//               customerEmail: d.customerEmail || null,
//               delivererEmail: d.delivererEmail || null,
//               vendorEmail: d.vendorEmail || null,
//               status: d.status || null,
//               items: d.items || [],
//               total: d.total || 0,

//               createdAt: safeMillis(d.createdAt),
//               updatedAt: safeMillis(d.updatedAt),
//               orderedAt: safeMillis(d.orderedAt),
//               deliveredAt: safeMillis(d.deliveredAt)
//             };
//           });
//         };

//         add(customerSnap.docs);
//         add(delivererSnap.docs);

//         return res.json({
//           success: true,
//           orders: Object.values(orders)
//         });

//       } catch (err) {
//         console.error("getAllOrders error:", err);
//         return res.status(500).json({
//           success: false,
//           error: err.message
//         });
//       }
//     });
//   }
// );

function buildSnapshotForNonOrderEntry(entry, loyalty = {}, settings = {}) {
  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  return {
    type: entry.type || "activity",
    label: entry.label || "",
    amount: entry.amount || 0,

    tierMultiplier: loyalty.tierMultiplier ?? 1,
    streakMultiplier: loyalty.streakMultiplier ?? 1,
    seasonalMultiplier,
    maxTotalMultiplier: settings.maxTotalMultiplier,

    seasonalActive,
    seasonalName,

    basePoints: entry.amount || 0,
    tierBonusPoints: 0,
    streakBonusPoints: 0,
    seasonalBonusPoints: 0,
    fastDeliveryBonus: 0,
    delayPenalty: 0,
    totalPointsEarned: entry.amount || 0,

    ts: entry.ts || PulseRealm.PulseNOW,
    createdAt: entry.createdAt || PulseRealm.PulseNOW,

    calculationVersion: settings.calculationVersion ?? 1
  };
}

// export const getAllUsers = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [JWT_SECRET]
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         // ------------------------------------
//         // Extract uid + lineage token
//         // ------------------------------------
//         const authHeader = req.headers.authorization || "";
//         const token = authHeader.replace("Bearer ", "").trim();
//         const uid = req.headers["x-uid"] || null;

//         if (!token || !uid) {
//           return res.status(403).json({
//             success: false,
//             error: "Missing uid or token"
//           });
//         }

//         // ------------------------------------
//         // Load requesting user
//         // ------------------------------------
//         const userDoc = await db.collection("Users").doc(uid).get();
//         if (!userDoc.exists) {
//           return res.status(404).json({
//             success: false,
//             error: "User not found"
//           });
//         }

//         const userData = userDoc.data() || {};
//         const TPIdentity = userData.TPIdentity || {};
//         const storedToken = TPIdentity.resendToken || null;

//         if (!storedToken || storedToken !== token) {
//           return res.status(403).json({
//             success: false,
//             error: "Token mismatch"
//           });
//         }

//         // ------------------------------------
//         // Load all users
//         // ------------------------------------
//         const snap = await db
//           .collection("Users")
//           .orderBy("TPIdentity.createdAt", "desc")
//           .get();

//         const safeMillis = (ts) => {
//           if (!ts) return null;
//           if (typeof ts.toMillis === "function") return ts.toMillis();
//           if (ts._seconds) return ts._seconds * 1000;
//           if (typeof ts === "number") return ts;
//           return null;
//         };

//         const safeNum = (v) =>
//           Number.isFinite(Number(v)) ? Number(v) : 0;

//         const users = snap.docs.map((doc) => {
//           const data = doc.data() || {};
//           const id = doc.id;

//           const TPIdentity = data.TPIdentity || {};
//           const TPLoyalty = data.TPLoyalty || {};
//           const TPNotifications = data.TPNotifications || {};
//           const TPSecurity = data.TPSecurity || {};

//           return {
//             id,

//             // Identity
//             email: TPIdentity.email || null,
//             name: TPIdentity.name || null,
//             role: TPIdentity.role || "Customer",
//             phone: TPIdentity.phone || null,
//             country: TPIdentity.country || null,

//             // Loyalty
//             loyalty: {
//               pointsBalance: safeNum(TPLoyalty.pointsBalance),
//               lifetimePoints: safeNum(TPLoyalty.lifetimePoints),
//               referralCode: TPLoyalty.referralCode || null,
//               referredBy: TPLoyalty.referredBy || null
//             },

//             // Notifications
//             notifications: {
//               receiveMassEmails: TPNotifications.receiveMassEmails ?? true,
//               receiveSMS: TPNotifications.receiveSMS ?? false
//             },

//             // Timestamps
//             createdAt: safeMillis(TPIdentity.createdAt),
//             updatedAt: safeMillis(TPIdentity.updatedAt),
//             lastActive: safeMillis(TPSecurity.lastActive),
//             lastEarnedDate: safeMillis(TPLoyalty.lastEarnedDate)
//           };
//         });

//         return res.json({ success: true, users });

//       } catch (err) {
//         console.error("getAllUsers error:", err);
//         return res.status(500).json({
//           success: false,
//           error: "Server error: " + err.message
//         });
//       }
//     });
//   }
// );

// export const verifyToken = onRequest(
//   { 
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [ JWT_SECRET ]
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const { uid, token } = req.body || {};

//         if (!uid || !token) {
//           return res.status(400).json({
//             success: false,
//             error: "Missing uid or token"
//           });
//         }

//         // ------------------------------------
//         // Load user
//         // ------------------------------------
//         const userDoc = await db.collection("Users").doc(uid).get();

//         if (!userDoc.exists) {
//           return res.status(404).json({
//             success: false,
//             error: "User not found"
//           });
//         }

//         const userData = userDoc.data() || {};

//         const TPIdentity = userData.TPIdentity || {};
//         const TPSecurity = userData.TPSecurity || {};

//         // ------------------------------------
//         // Token check (TPIdentity.resendToken)
//         // ------------------------------------
//         const storedToken = TPIdentity.resendToken || null;

//         if (!storedToken || storedToken !== token) {
//           return res.status(403).json({
//             success: false,
//             error: "Token mismatch"
//           });
//         }

//         // ------------------------------------
//         // Build identity response (new schema)
//         // ------------------------------------
//         const responseIdentity = {
//           uid,

//           // EMAIL
//           email: TPIdentity.email || null,

//           // NAME
//           name: TPIdentity.name || TPIdentity.displayName || "",

//           // ROLE
//           role: TPIdentity.role || "Deliverer",

//           // STRIPE
//           stripeAccountID: TPIdentity.stripeAccountID || null,
//           stripeDashboardURL: TPIdentity.stripeDashboardURL || null,

//           // DISPLAY NAME
//           displayName: TPIdentity.displayName || TPIdentity.name || null,

//           // PHOTO
//           photoURL: TPIdentity.photoURL || null,

//           // TRUSTED DEVICE
//           trustedDevice: TPSecurity.trustedDevice ?? false,

//           // IDENTITY TIMESTAMP
//           identitySetAt: TPIdentity.identitySetAt || null,

//           // REFERRAL CODE
//           referralCode: TPIdentity.referralCode || null
//         };

//         return res.json({
//           success: true,
//           token,
//           identity: responseIdentity
//         });

//       } catch (err) {
//         console.error("verifyToken ERROR:", err);
//         return res.status(500).json({
//           success: false,
//           error: "Internal server error"
//         });
//       }
//     });
//   }
// );

// export const eventVerification = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [MESSAGING_SERVICE_SID, EMAIL_PASSWORD]
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
//         const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
//         const URL = BASE_PAYMENT_URL;

//         log("🔵 [eventVerification] START");

//         const normalizeEmail = (v) =>
//           typeof v === "string" ? v.trim().toLowerCase() : null;

//         const q = req.query;
//         const email = normalizeEmail(q.email || q.Email || q.useremail);

//         if (!email) {
//           await sendAdminAlertEmail("eventVerification: Missing email", null, { q });
//           return res.status(400).send({ ok: false, error: "Missing email" });
//         }

//         // ------------------------------------
//         // Normalize event fields
//         // ------------------------------------
//         const data = {
//           title:       BECLEAN(q.title)       ?? BECLEAN(q.Title),
//           summary:     BECLEAN(q.summary)     ?? BECLEAN(q.Summary),
//           description: BECLEAN(q.description) ?? BECLEAN(q.Description),

//           fromDate:    q.fromDate ?? q.Fromdate,
//           toDate:      q.toDate   ?? q.Todate,
//           fromTime:    q.fromTime ?? q.Fromtime,
//           toTime:      q.toTime   ?? q.Totime,

//           venue:       BECLEAN(q.venue)    ?? BECLEAN(q.Venue),
//           category:    q.category ?? q.Category,
//           price:       q.price    ?? q.Price,

//           images: [
//             q.Url ??
//             q.URL ??
//             q.image ??
//             null
//           ],

//           email
//         };

//         if (!data.title || !data.summary || !data.description) {
//           await sendAdminAlertEmail("eventVerification: Missing required fields", null, { data });
//           return res.status(400).send({
//             ok: false,
//             error: "Missing required event fields"
//           });
//         }

//         // ------------------------------------
//         // Create event ID
//         // ------------------------------------
//         const eventID = db.collection("Events").doc().id;

//         // ------------------------------------
//         // Image migration
//         // ------------------------------------
//         const migratedImages = [];
//         for (const Url of data.images) {
//           if (!Url) continue;
//           try {
//             const newUrl = await migrateImageToFirebase(Url, "events");
//             migratedImages.push(newUrl);
//           } catch (err) {
//             console.error("Image migration failed:", err);
//             await sendAdminAlertEmail("eventVerification: Image migration failed", err, { Url });
//           }
//         }
//         data.images = migratedImages;

//         // ------------------------------------
//         // User lookup (NEW SCHEMA: identity.email)
//         // ------------------------------------
//         const userSnap = await db
//           .collection("Users")
//           .where("identity.email", "==", email)
//           .limit(1)
//           .get();

//         let userRef;
//         let userData;

//         if (userSnap.empty) {
//           // Create NEW user with identity + Wallet.loyalty + Notifications
//           const ref = db.collection("Users").doc();
//           userRef = ref;

//           const resendToken = crypto.randomUUID();

//           const newUser = {
//             identity: {
//               email,
//               name: "New User",   // ✔ lowercase canonical
//               role: "Customer",
//               resendToken,
//               createdAt: PulseRealm.PulseNOW
//             },
//             Notifications: {
//               receiveMassEmails: true,
//               receiveSMS: false
//             },
//             Wallet: {
//               loyalty: {
//                 massEmail: {
//                   freeUsed: 0,
//                   freeLimit: 2,
//                   paid: 0
//                 }
//               }
//             },
//             createdAt: PulseRealm.PulseNOW
//           };

//           await ref.set(newUser);
//           userData = newUser;

//         } else {
//           const doc = userSnap.docs[0];
//           userRef = doc.ref;
//           userData = doc.data() || {};
//         }

//         const identity = userData.identity || {};
//         const notifications = userData.Notifications || {};
//         const loyalty = userData.Wallet.loyalty.massEmail || {};

//         // Ensure resendToken exists in identity
//         let resendToken = identity.resendToken;
//         if (!resendToken) {
//           resendToken = crypto.randomUUID();
//           await userRef.update({
//             "identity.resendToken": resendToken
//           });
//         }

//         // ------------------------------------
//         // Credit calculation (Wallet.loyalty.massEmail)
//         // ------------------------------------
//         const freeLimit = typeof loyalty.freeLimit === "number" ? loyalty.freeLimit : 2;
//         const freeUsed  = typeof loyalty.freeUsed === "number" ? loyalty.freeUsed : 0;
//         const paid      = typeof loyalty.paid === "number" ? loyalty.paid : 0;

//         const freeRemaining = Math.max(freeLimit - freeUsed, 0);
//         const paidRemaining = paid;

//         // ------------------------------------
//         // NO CREDITS → Pending event + payment email
//         // ------------------------------------
//         if (freeRemaining <= 0 && paidRemaining <= 0) {
//           await db.collection("PendingEvents").doc(eventID).set({
//             eventID,
//             email,
//             eventData: data,
//             createdAt: PulseRealm.PulseNOW
//           });

//           const paymentLink =
//             `${URL}?eventID=${encodeURIComponent(eventID)}&email=${encodeURIComponent(email)}`;

//           try {
//             await sendNoCreditsEmail({ email, paymentLink, eventID });
//           } catch (err) {
//             await sendAdminAlertEmail(
//               "eventVerification: Failed to send no-credits email",
//               err,
//               { email, eventID }
//             );
//           }

//           return res.status(200).send({
//             ok: false,
//             eventID,
//             reason: "NO_CREDITS"
//           });
//         }

//         // ------------------------------------
//         // FREE CREDIT
//         // ------------------------------------
//         if (freeRemaining > 0) {
//           await userRef.update({
//             "Wallet.loyalty.massEmail.freeUsed":
//               admin.firestore.FieldValue.increment(1)
//           });

//           await db.collection("Events").doc(eventID).set({
//             eventID,
//             owner: {
//               uid: userRef.id,
//               email: identity.email,
//               name: identity.name || null   // ✔ lowercase canonical
//             },
//             ...data,
//             createdAt: PulseRealm.PulseNOW
//           });

//           await fetch(
//             `https://sendmassemail-ilx3agka5q-uc.a.run.app` +
//               `?useremail=${encodeURIComponent(email)}` +
//               `&emailType=newEvent` +
//               `&eventID=${encodeURIComponent(eventID)}`
//           );

//           return res.status(200).send({
//             ok: true,
//             eventID,
//             reason: "FREE_OK"
//           });
//         }

//         // ------------------------------------
//         // PAID CREDIT
//         // ------------------------------------
//         if (paidRemaining > 0) {
//           await userRef.update({
//             "Wallet.loyalty.massEmail.paid":
//               admin.firestore.FieldValue.increment(-1)
//           });

//           await db.collection("Events").doc(eventID).set({
//             eventID,
//             owner: {
//               uid: userRef.id,
//               email: identity.email,
//               name: identity.name || null   // ✔ lowercase canonical
//             },
//             ...data,
//             createdAt: PulseRealm.PulseNOW
//           });

//           await fetch(
//             `https://sendmassemail-ilx3agka5q-uc.a.run.app` +
//               `?useremail=${encodeURIComponent(email)}` +
//               `&emailType=newEvent` +
//               `&eventID=${encodeURIComponent(eventID)}`
//           );

//           return res.status(200).send({
//             ok: true,
//             eventID,
//             reason: "PAID_OK"
//           });
//         }

//         await sendAdminAlertEmail("eventVerification: Unknown credit state", null, {
//           email,
//           userData
//         });
//         return res.status(500).send({ ok: false, reason: "UNKNOWN" });

//       } catch (err) {
//         console.error("Event Verification Error:", err);

//         await sendAdminAlertEmail(
//           "eventVerification: Internal Server Error",
//           err,
//           { body: req.body, query: req.query }
//         );

//         return res.status(500).send({ ok: false, error: "Internal error" });
//       }
//     });
//   }
// );

// export const refreshToken = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 60,
//     memory: "512MiB",
//     secrets: [JWT_SECRET, EMAIL_PASSWORD]
//   },
//   async (req, res) => {
//     // CORS
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//     if (req.method === "OPTIONS") return res.status(204).send("");

//     try {
//       const { uid, token } = req.body || {};

//       if (!uid || !token) {
//         return res.status(400).json({
//           success: false,
//           error: "Missing uid or token"
//         });
//       }

//       // Load user
//       const userRef = db.collection("Users").doc(uid);
//       const userDoc = await userRef.get();

//       if (!userDoc.exists) {
//         return res.status(404).json({
//           success: false,
//           error: "User not found"
//         });
//       }

//       const user = userDoc.data() || {};
//       const TPIdentity = user.TPIdentity || {};

//       const storedToken = TPIdentity.resendToken || null;

//       // Lineage validation
//       if (!storedToken || storedToken !== token) {
//         return res.status(403).json({
//           success: false,
//           error: "Token mismatch"
//         });
//       }

//       // Generate NEW lineage token
//       const newResendToken = crypto.randomUUID();

//       // Update identity
//       await userRef.update({
//         "TPIdentity.resendToken": newResendToken,
//         "TPIdentity.lastTokenRefresh": PulseRealm.PulseNOW
//       });

//       // Log identity history
//       await db
//         .collection("TPIdentityHistory")
//         .add({
//           uid,
//           oldToken: token,
//           newToken: newResendToken,
//           reason: "TOKEN_REFRESH",
//           createdAt: PulseRealm.PulseNOW
//         });

//       return res.json({
//         success: true,
//         newResendToken
//       });

//     } catch (err) {
//       console.error("refreshToken error:", err);

//       await sendAdminAlertEmail(
//         "refreshToken: Internal Server Error",
//         err,
//         { body: req.body, headers: req.headers }
//       );

//       return res.status(500).json({
//         success: false,
//         error: "Server error: " + err.message
//       });
//     }
//   }
// );

// export const updateEmailLog = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const { id, update } = req.body;

//         if (!id || typeof update !== "object") {
//           return res.status(400).json({
//             success: false,
//             error: "Invalid request"
//           });
//         }

//         const ref = db.collection("EmailLogs").doc(id);
//         const snap = await ref.get();

//         if (!snap.exists) {
//           return res.status(404).json({
//             success: false,
//             error: "Log not found"
//           });
//         }

//         await ref.update({
//           ...update,
//           updatedAt: PulseRealm.PulseNOW,
//           updatedBy: "Automate",
//           source: "updateEmailLog"
//         });

//         return res.json({ success: true });

//       } catch (err) {
//         console.error("updateEmailLog error:", err);
//         return res.status(500).json({
//           success: false,
//           error: err.message
//         });
//       }
//     });
//   }
// );

// export const createEmailLog = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const log = {
//           ...req.body,
//           status: req.body.status || "Pending",
//           adminUser: req.body.adminUser || "Automate",
//           triggerSource: req.body.triggerSource || "createEmailLog",
//           createdAt: PulseRealm.PulseNOW
//         };

//         const ref = await db.collection("EmailLogs").add(log);

//         return res.json({ success: true, id: ref.id });

//       } catch (err) {
//         console.error("createEmailLog error:", err);
//         return res.status(500).json({
//           success: false,
//           error: err.message
//         });
//       }
//     });
//   }
// );

// export const findUserByEmail = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const rawEmail = req.query.email;
//         const email =
//           typeof rawEmail === "string"
//             ? rawEmail.trim().toLowerCase()
//             : null;

//         if (!email) {
//           return res.status(400).json({
//             success: false,
//             error: "Invalid email"
//           });
//         }

//         const snap = await admin
//           .firestore()
//           .collection("Users")
//           .where("TPIdentity.email", "==", email)
//           .limit(1)
//           .get();

//         if (snap.empty) {
//           return res.json({
//             success: true,
//             user: {
//               name: null,
//               createdAt: null,
//               stripeAccountID: null,
//               userID: null,
//               phone: null
//             }
//           });
//         }

//         const doc = snap.docs[0];
//         const data = doc.data() || {};
//         const TPIdentity = data.TPIdentity || {};

//         return res.json({
//           success: true,
//           user: {
//             name: TPIdentity.name || TPIdentity.displayName || null,
//             createdAt: TPIdentity.createdAt || null,
//             stripeAccountID: TPIdentity.stripeAccountID || null,
//             userID: doc.id,
//             phone: TPIdentity.phone || null
//           }
//         });

//       } catch (err) {
//         console.error("findUserByEmail error:", err);
//         return res.status(500).json({
//           success: false,
//           error: err.message
//         });
//       }
//     });
//   }
// );

// export const rolechange = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 60,
//     memory: "512MiB",
//     secrets: [
//       STRIPE_PASSWORD,
//       ACCOUNT_SID,
//       AUTH_TOKEN,
//       MESSAGING_SERVICE_SID,
//       EMAIL_PASSWORD
//     ]
//   },
//   async (req, res) => {
//     const clean = (v) => {
//       if (v === undefined || v === null) return null;
//       const s = String(v).trim();
//       return s === "" ? null : s;
//     };

//     try {
//       const stripe = Stripe(STRIPE_PASSWORD.value());
//       const twilioClient = twilio(ACCOUNT_SID.value(), AUTH_TOKEN.value());

//       const normalizeEmail = (v) =>
//         typeof v === "string" ? v.trim().toLowerCase() : null;

//       // -----------------------------
//       // Normalize inputs
//       // -----------------------------
//       const email = normalizeEmail(clean(req.query.email, null));
//       const roleLower = clean(req.query.role, null).toLowerCase();
//       const payFrequencyRaw = clean(req.query.payFrequency, null).toLowerCase();
//       const payDayRaw = clean(req.query.payDay, null).toLowerCase();

//       if (!email) return res.status(400).json({ error: "invalid_email" });

//       const roleMap = {
//         deliverer: "Deliverer",
//         vendor: "Vendor",
//         customer: "Customer"
//       };

//       const role = roleMap[roleLower];
//       if (!role) return res.status(400).json({ error: "invalid_role" });

//       // -----------------------------
//       // Pay frequency defaults
//       // -----------------------------
//       let payFrequency = payFrequencyRaw;
//       let payDay = payDayRaw;

//       if (!payFrequency) {
//         payFrequency = role === "Vendor" ? "weekly" : "daily";
//       }

//       if (payFrequency === "weekly") {
//         payDay = payDay || "monday";
//         if (payDay.includes("everyday")) payDay = null;
//       } else {
//         payDay = null;
//       }

//       // -----------------------------
//       // Lookup user (NEW SCHEMA)
//       // -----------------------------
//       const snap = await db
//         .collection("Users")
//         .where("TPIdentity.email", "==", email)
//         .limit(1)
//         .get();

//       if (snap.empty) return res.status(400).json({ error: "user_not_found" });

//       const userDoc = snap.docs[0];
//       const userRef = userDoc.ref;
//       const user = userDoc.data() || {};
//       const uid = userDoc.id;

//       const TPIdentity = user.TPIdentity || {};
//       const TPPayout = user.TPPayout || {};
//       const TPNotifications = user.TPNotifications || {};
//       const TPWallet = user.TPWallet || {};

//       if (TPPayout.setupStatus !== "Complete") {
//         return res.status(400).json({ error: "setup_incomplete" });
//       }

//       const stripeAccountID = TPIdentity.stripeAccountID || null;
//       if (!stripeAccountID) {
//         return res.status(400).json({ error: "missing_stripe_account" });
//       }

//       // -----------------------------
//       // Normalize country + phone
//       // -----------------------------
//       const country = clean(normalizeCountry(TPIdentity.country || "BZ"), "BZ");
//       const phone = normalizePhone(TPIdentity.phone || null, country);

//       // -----------------------------
//       // Stripe payout schedule
//       // -----------------------------
//       const schedule =
//         payFrequency === "daily"
//           ? { interval: "daily" }
//           : { interval: "weekly", weekly_anchor: payDay };

//       try {
//         await stripe.accounts.update(stripeAccountID, {
//           settings: { payouts: { schedule } }
//         });
//       } catch (err) {
//         return res.status(500).json({ error: "stripe_update_failed" });
//       }

//       // -----------------------------
//       // Update user (NEW SCHEMA)
//       // -----------------------------
//       await userRef.update({
//         "TPIdentity.role": role,
//         "TPIdentity.country": country,
//         "TPIdentity.updatedAt": PulseRealm.PulseNOW,

//         "TPPayout.payFrequency": payFrequency,
//         "TPPayout.payDay": payDay,
//         "TPPayout.updatedAt": PulseRealm.PulseNOW
//       });

//       // -----------------------------
//       // Optional SMS
//       // -----------------------------
//       if (TPNotifications.receiveSMS && phone) {
//         await twilioClient.messages.create({
//           to: phone,
//           messagingServiceSid: MESSAGING_SERVICE_SID.value(),
//           body: `Your payout settings were updated: ${payFrequency.toUpperCase()} ${payDay || ""}`
//         });

//         await userRef.update({
//           "TPWallet.lastSMSSentAt": PulseRealm.PulseNOW
//         });
//       }

//       return res.status(200).json({ status: "success" });

//     } catch (err) {
//       console.error("❌ ROLECHANGE ERROR:", err);
//       return res.status(500).json({ error: "server_error" });
//     }
//   }
// );
// export const getIdentity = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 60,
//     memory: "512MiB",
//     secrets: [JWT_SECRET]
//   },
//   async (req, res) => {
//     try {
//       // CORS
//       res.set("Access-Control-Allow-Origin", "*");
//       res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//       res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//       if (req.method === "OPTIONS") {
//         return res.status(204).send("");
//       }

//       // Validate inputs
//       const { uid, token } = req.body || {};
//       if (!uid || !token) {
//         return res.status(400).json({
//           success: false,
//           error: "Missing uid or token"
//         });
//       }

//       // Load user
//       const userSnap = await db.collection("Users").doc(uid).get();
//       if (!userSnap.exists) {
//         return res.status(404).json({
//           success: false,
//           error: "User not found"
//         });
//       }

//       const data = userSnap.data() || {};

//       const TPIdentity = data.TPIdentity || {};
//       const TPWallet = data.TPWallet || {};
//       const TPLoyalty = data.TPLoyalty || {};
//       const TPVault = data.TPVault || {};
//       const TPSecurity = data.TPSecurity || {};

//       const storedToken = TPIdentity.resendToken || null;

//       // Lineage validation
//       if (!storedToken || storedToken !== token) {
//         return res.status(403).json({
//           success: false,
//           error: "Token mismatch"
//         });
//       }

//       // Build safe identity
//       const safeIdentity = {
//         uid,

//         email: TPIdentity.email || null,
//         name: TPIdentity.name || TPIdentity.displayName || null,
//         role: TPIdentity.role || "Customer",

//         stripeAccountID: TPIdentity.stripeAccountID || null,
//         stripeDashboardURL: TPIdentity.stripeDashboardURL || null,

//         trustedDevice: TPSecurity.trustedDevice ?? false,

//         identitySetAt: TPIdentity.identitySetAt || null,

//         lastVaultVisit: TPVault.lastVisit || null,

//         pointsBalance: Number(TPLoyalty.pointsBalance || 0),
//         lifetimePoints: Number(TPLoyalty.lifetimePoints || 0),

//         referralCode: TPIdentity.referralCode || null
//       };

//       return res.json({
//         success: true,
//         identity: safeIdentity
//       });

//     } catch (err) {
//       console.error("getIdentity error:", err);
//       return res.status(500).json({
//         success: false,
//         error: "Internal server error"
//       });
//     }
//   }
// );

// export const getFirebaseAuthToken = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 120,
//     memory: "512MiB"
//   },
//   async (req, res) => {
//     try {
//       // CORS
//       res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//       if (req.method === "OPTIONS") {
//         return res.status(204).send("");
//       }

//       const body = req.body || {};
//       const incomingToken = body.token || null;
//       let uid = body.uid || null;

//       if (!uid) {
//         return res.status(400).json({
//           success: false,
//           error: "Unable to resolve UID from token or uid"
//         });
//       }

//       // -----------------------------
//       // 2. Load user
//       // -----------------------------
//       const userRef = db.doc(`Users/${uid}`);
//       const userDoc = await userRef.get();

//       if (!userDoc.exists) {
//         return res.status(404).json({
//           success: false,
//           error: "User not found"
//         });
//       }

//       const userData = userDoc.data() || {};
//       const TPIdentity = userData.TPIdentity || {};

//       const currentToken = TPIdentity.resendToken || null;

//       if (!currentToken) {
//         return res.status(403).json({
//           success: false,
//           error: "No active resendToken for this user"
//         });
//       }

//       // -----------------------------
//       // 3. Get last resendToken from IdentityHistory
//       // -----------------------------
//       const historySnap = await admin
//         .firestore()
//         .collection("IdentityHistory")
//         .doc(uid)
//         .collection("snapshots")
//         .orderBy("createdAt", "desc")
//         .limit(20) // scan last N, just in case
//         .get();

//       let lineageToken = null;
//       let lineageSnap = null;

//       if (!historySnap.empty) {
//         for (const doc of historySnap.docs) {
//           const snap = doc.data() || {};

//           const token = snap.TPIdentity.resendToken || null;

//           // We only care about the FIRST snapshot that actually has a resendToken
//           if (token) {
//             lineageToken = token;
//             lineageSnap = snap;
//             break;
//           }
//         }
//       }

//       // If we never found a resendToken → no lineage, hard logout
//       if (!lineageToken || !lineageSnap) {
//         return res.status(403).json({
//           success: false,
//           hardLogout: true,
//           error: "No resendToken found in IdentityHistory"
//         });
//       }

//       // Now check if THAT snapshot is bad
//       const isBad =
//         lineageSnap.lockedDown === true ||
//         lineageSnap.hacker === true ||
//         lineageSnap.failure === true ||
//         lineageSnap.compromised === true ||
//         lineageSnap.revoked === true;

//       if (isBad) {
//         return res.status(403).json({
//           success: false,
//           hardLogout: true,
//           error: "Identity is locked or revoked"
//         });
//       }

//       // At this point: lineageToken is the last resendToken used, and it's clean
//       // Use lineageToken as your storedToken / lineage token
//       const storedToken = lineageToken;

//       // -----------------------------
//       // 4. Issue Firebase token
//       // -----------------------------
//       const firebaseToken = await admin.auth().createCustomToken(uid);

//       await userRef.set(
//         {
//           TPFirebaseAuth: {
//             enabled: true,
//             lastIssued: PulseRealm.PulseNOW
//           }
//         },
//         { merge: true }
//       );

//       let needsRealign = false;
//       let hardFail = false;

//       // 1. Missing token → HARD FAIL
//       if (!incomingToken) {
//         hardFail = true;
//       }

//       // 2. Incoming token matches current → OK
//       else if (incomingToken === currentToken) {
//         needsRealign = false;
//       }

//       // 3. Incoming token is in lineage history → REALIGN
//       if (incomingToken && incomingToken !== lineageToken) {
//         needsRealign = true;
//       }


//       // 4. Anything else → HARD FAIL
//       else {
//         hardFail = true;
//       }

//       if (hardFail) {
//         return res.status(403).json({
//           success: false,
//           hardLogout: true
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         realign: needsRealign,
//         storedToken: currentToken,
//         firebaseToken
//       });

//     } catch (err) {
//       console.error("getFirebaseAuthToken error:", err);
//       return res.status(500).json({
//         success: false,
//         error: "Internal server error"
//       });
//     }
//   }
// );

// export const getPulsePointsDataForVault = onRequest(
//   {
//     region: "us-central1",
//     secrets: [JWT_SECRET],
//     timeoutSeconds: 30,
//     memory: "512MiB"
//   },
//   async (req, res) => {

//     // CORS
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//     if (req.method === "OPTIONS") {
//       return res.status(204).send("");
//     }

//     try {
//       // Extract uid + token
//       const token =
//         (req.headers.authorization || "").replace("Bearer ", "").trim() ||
//         req.body.token;

//       const uid = req.body.uid;

//       if (!token || !uid) {
//         return res.status(403).json({
//           success: false,
//           error: "Missing uid or token"
//         });
//       }

//       // Load user
//       const userSnap = await admin
//         .firestore()
//         .collection("Users")
//         .doc(uid)
//         .get();

//       if (!userSnap.exists) {
//         return res.status(404).json({
//           success: false,
//           error: "User not found"
//         });
//       }

//       const user = userSnap.data() || {};

//       const TPIdentity = user.TPIdentity || {};
//       const TPLoyalty = user.TPLoyalty || {};

//       const storedToken = TPIdentity.resendToken || null;

//       // Lineage validation
//       if (!storedToken || storedToken !== token) {
//         return res.status(403).json({
//           success: false,
//           error: "Token mismatch"
//         });
//       }

//       // BASIC FIELDS ONLY (Vault-safe)
//       const pointsBalance = Number(TPLoyalty.pointsBalance || 0);
//       const lifetimePoints = Number(TPLoyalty.lifetimePoints || 0);

//       // OPTIONAL: HISTORY (read-only)
//       const history = await loadHistory(uid);

//       return res.json({
//         success: true,
//         data: {
//           pointsBalance,
//           lifetimePoints,
//           history
//         }
//       });

//     } catch (err) {
//       console.error("getPulsePointsDataForVault error:", err);
//       return res.json({
//         success: false,
//         error: "Server error: " + err.message
//       });
//     }
//   }
// );

// /* ===========================
//    OPT IN FEATURE FOR MASS EMAILS/SMS
// =========================== */
// export const resubscribe = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [ACCOUNT_SID, AUTH_TOKEN, MESSAGING_SERVICE_SID, EMAIL_PASSWORD]
//   },
//   async (req, res) => {
//     log("🔵 [resubscribe] START");

//     const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
//     const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
//     const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();

//     const normalizeEmail = (v) =>
//       typeof v === "string" ? v.trim().toLowerCase() : null;

//     const isGarbage = (v) => {
//       if (!v) return true;
//       const s = String(v);
//       return (
//         s.trim() === "" ||
//         s.includes("{{") ||
//         s.includes("add_more_field") ||
//         s.includes("fieldLebal") ||
//         s.includes("fieldValue") ||
//         s.includes("*")
//       );
//     };

//     const clean = (v, fallback = null) => {
//       if (isGarbage(v)) return fallback;
//       return String(v).trim();
//     };

//     try {
//       const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);

//       const rawToken = req.query.token;
//       const rawEmail = req.query.email;
//       const rawCommunication = req.query.receiveCommunication;

//       const parsedCommunication = await receiveCommunication(rawCommunication);
//       const receiveSMS = parsedCommunication.receiveSMS;
//       const receiveMassEmails = parsedCommunication.receiveMassEmails;

//       const token = clean(rawToken, null);
//       const email = clean(normalizeEmail(rawEmail), null);

//       let snap = null;

//       // 1️⃣ Prefer token → then email (NEW SCHEMA)
//       if (token) {
//         snap = await admin
//           .firestore()
//           .collection("Users")
//           .where("TPIdentity.resendToken", "==", token)
//           .limit(1)
//           .get();
//       } else if (email) {
//         snap = await admin
//           .firestore()
//           .collection("Users")
//           .where("TPIdentity.email", "==", email)
//           .limit(1)
//           .get();
//       } else {
//         log("❌ Missing token/email");
//         return res.redirect("/error.html");
//       }

//       if (snap.empty) {
//         log("❌ User not found for resubscribe");
//         return res.redirect("/error.html");
//       }

//       const userDoc = snap.docs[0];
//       const userData = userDoc.data() || {};
//       const userRef = userDoc.ref;

//       const TPIdentity = userData.TPIdentity || {};
//       const TPNotifications = userData.TPNotifications || {};
//       const TPWallet = userData.TPWallet || {};

//       let phone = TPIdentity.phone || null;
//       const country = TPIdentity.country || "BZ";

//       if (phone) {
//         phone = normalizePhone(phone, country);
//       }

//       // 2️⃣ Update preferences (NEW SCHEMA)
//       await userRef.update({
//         TPNotifications: {
//           ...TPNotifications,
//           receiveMassEmails,
//           receiveSMS
//         },
//         "TPIdentity.updatedAt": PulseRealm.PulseNOW,
//         emailPending: false,
//         pendingEmailType: deleteField(),
//         pendingPayload: deleteField()
//       });

//       log("✅ User resubscribed", {
//         uid: userDoc.id,
//         receiveMassEmails,
//         receiveSMS
//       });

//       // 3️⃣ SMS only if opted‑in AND phone exists
//       if (receiveSMS && phone) {
//         await twilioClient.messages.create({
//           to: phone,
//           messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
//           body: `You are now opted-in for Pulse World updates: ${TPIdentity.email}`
//         });

//         await userRef.update({
//           "TPWallet.lastSMSSentAt": PulseRealm.PulseNOW
//         });
//       }

//       res.set("Content-Type", "text/html");
//       return res.status(200).send(/* your HTML */);

//     } catch (err) {
//       console.error("❌ Resubscribe error:", err);
//       return res
//         .status(500)
//         .send("An error occurred while processing your request.");
//     }
//   }
// );

// /* ===========================
//    OPT OUT FEATURE FROM MASS EMAILS
// =========================== */
// export const unsubscribe = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [ACCOUNT_SID, AUTH_TOKEN, MESSAGING_SERVICE_SID, EMAIL_PASSWORD]
//   },
//   async (req, res) => {
//     log("🔵 [unsubscribe] START");

//     const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
//     const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
//     const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();

//     const isGarbage = (v) => {
//       if (!v) return true;
//       const s = String(v);
//       return (
//         s.trim() === "" ||
//         s.includes("{{") ||
//         s.includes("add_more_field") ||
//         s.includes("fieldLebal") ||
//         s.includes("fieldValue") ||
//         s.includes("*")
//       );
//     };

//     const clean = (v, fallback = null) => {
//       if (isGarbage(v)) return fallback;
//       return String(v).trim();
//     };

//     try {
//       const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);

//       const rawToken = req.query.token;
//       const token = clean(rawToken, null);

//       if (!token) {
//         log("❌ Missing token");
//         return res.redirect("/error.html");
//       }

//       // 1️⃣ Token → user (NEW SCHEMA)
//       const snap = await admin
//         .firestore()
//         .collection("Users")
//         .where("TPIdentity.resendToken", "==", token)
//         .limit(1)
//         .get();

//       if (snap.empty) {
//         log("❌ Token not found");
//         return res.redirect("/error.html");
//       }

//       const userDoc = snap.docs[0];
//       const userRef = userDoc.ref;
//       const userData = userDoc.data() || {};

//       const TPIdentity = userData.TPIdentity || {};
//       const TPNotifications = userData.TPNotifications || {};
//       const TPWallet = userData.TPWallet || {};

//       let phone = TPIdentity.phone || null;
//       const country = TPIdentity.country || "BZ";

//       if (phone) {
//         phone = normalizePhone(phone, country);
//       }

//       // 2️⃣ Update Firestore (NEW SCHEMA)
//       await userRef.update({
//         TPNotifications: {
//           ...TPNotifications,
//           receiveMassEmails: false
//         },
//         "TPIdentity.updatedAt": PulseRealm.PulseNOW,
//         emailPending: false,
//         pendingEmailType: deleteField(),
//         pendingPayload: deleteField()
//       });

//       log("✅ User unsubscribed", { uid: userDoc.id });

//       // 3️⃣ SMS only if user still allows SMS AND phone exists
//       if (TPNotifications.receiveSMS && phone) {
//         await twilioClient.messages.create({
//           to: phone,
//           messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
//           body: `You have been unsubscribed from Pulse World mass emails: ${TPIdentity.email}`
//         });

//         await userRef.update({
//           "TPWallet.lastSMSSentAt": PulseRealm.PulseNOW
//         });
//       } else {
//         log("🚫 SMS not sent (Opt-out or missing phone)");
//       }

//       res.set("Content-Type", "text/html");
//       return res.status(200).send(/* your HTML */);

//     } catch (err) {
//       console.error("❌ Unsubscribe error:", err);
//       return res
//         .status(500)
//         .send("An error occurred while processing your request.");
//     }
//   }
// );
// /* ===========================
//    BROADCAST EMAIL FOR NEW STUFF
// =========================== */
// export const sendMASSemail = onRequest(
//   {
//     region: "us-central1",
//     secrets: [
//       ACCOUNT_SID,
//       AUTH_TOKEN,
//       MESSAGING_SERVICE_SID,
//       EMAIL_PASSWORD,
//       JWT_SECRET
//     ],
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   async (req, res) => {
//     log("🔵 [sendMASSemail] START");

//     const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
//     const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
//     const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
//     const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
//     const JWT_SECRET_VALUE = JWT_SECRET.value();

//     const normalizeEmail = (v) =>
//       typeof v === "string" ? v.trim().toLowerCase() : null;

//     const isGarbage = (v) => {
//       if (!v) return true;
//       const s = String(v);
//       return (
//         s.trim() === "" ||
//         s.includes("{{") ||
//         s.includes("add_more_field") ||
//         s.includes("fieldLebal") ||
//         s.includes("fieldValue") ||
//         s.includes("*")
//       );
//     };

//     const clean = (v, fallback = null) => {
//       if (isGarbage(v)) return fallback;
//       return String(v).trim();
//     };

//     const requiredFields = {
//       newEvent: [
//         "title",
//         "summary",
//         "description",
//         "Fromdate",
//         "Todate",
//         "Fromtime",
//         "Totime",
//         "Venue",
//         "eventID",
//         "logId",
//         "unsubscribeUrl",
//         "language",
//         "Category",
//         "Price",
//         "ImageUrl",
//         "OwnerName",
//         "OwnerBusiness",
//         "OwnerEmail"
//       ],
//       newBusiness: [
//         "busname",
//         "summary",
//         "description",
//         "busemail",
//         "location",
//         "date",
//         "busID",
//         "logId",
//         "unsubscribeUrl",
//         "category",
//         "phone",
//         "website",
//         "imageUrl",
//         "ownerName",
//         "ownerEmail"
//       ]
//     };

//     function validatePayload(emailType, payload) {
//       const missing = requiredFields[emailType].filter(
//         (field) => payload[field] === undefined || payload[field] === ""
//       );
//       if (missing.length > 0) {
//         throw new Error(
//           `Missing required fields for ${emailType}: ${missing.join(", ")}`
//         );
//       }
//     }

//     try {
//       const q = req.query;

//       const useremail = normalizeEmail(req.body.useremail || q.useremail);
//       const emailType = clean(req.body.emailType || q.emailType, null);
//       let payload = req.body.payload || {};

//       const eventID = clean(req.body.eventID || q.eventID, null);
//       const busID = clean(req.body.busID || q.busID, null);

//       if (!useremail) {
//         return res.status(400).json({ error: "Missing useremail" });
//       }

//       if (!emailType) {
//         return res.status(400).json({ error: "Missing emailType" });
//       }

//       const allowedTypes = ["newEvent", "newBusiness"];
//       if (!allowedTypes.includes(emailType)) {
//         return res.json({
//           success: false,
//           message: `Email type '${emailType}' is not supported.`
//         });
//       }

//       // ------------------------------------
//       // Load initiating user (NEW SCHEMA)
//       // ------------------------------------
//       const userSnap = await admin
//         .firestore()
//         .collection("Users")
//         .where("TPIdentity.email", "==", useremail)
//         .limit(1)
//         .get();

//       if (userSnap.empty) {
//         log("❌ User not found:", useremail);
//         return res.status(400).json({ error: "user_not_found" });
//       }

//       const initiatingUserDoc = userSnap.docs[0];
//       const initiatingUser = initiatingUserDoc.data() || {};

//       // ------------------------------------
//       // EVENT PAYLOAD (NEW SCHEMA)
//       // ------------------------------------
//       if (emailType === "newEvent") {
//         if (!eventID) {
//           return res.status(400).json({ error: "Missing eventID" });
//         }

//         const eventDoc = await admin
//           .firestore()
//           .collection("Events")
//           .doc(eventID)
//           .get();

//         if (!eventDoc.exists) {
//           return res.status(404).json({ error: "Event not found" });
//         }

//         const ev = eventDoc.data() || {};

//         payload.title = clean(ev.title, "");
//         payload.summary = clean(ev.summary, "");
//         payload.description = clean(ev.description, "");
//         payload.language = clean(ev.language, "");

//         payload.Fromdate = ev.Fromdate || "";
//         payload.Todate = ev.Todate || "";
//         payload.Fromtime = clean(ev.Fromtime, "");
//         payload.Totime = clean(ev.Totime, "");
//         payload.Venue = clean(ev.Venue ?? ev.resolvedName, "");

//         payload.eventID = eventID;
//         payload.Category = clean(ev.category, "");
//         payload.Price = clean(ev.price, "");
//         payload.ImageUrl = clean(ev.mainImage ?? ev.images[0] ?? "", "");

//         payload.OwnerName = clean(ev.ownerName, "");
//         payload.OwnerBusiness = clean(ev.ownerBusiness, "");
//         payload.OwnerEmail = clean(ev.ownerEmail, "");
//       }

//       // ------------------------------------
//       // BUSINESS PAYLOAD (NEW SCHEMA)
//       // ------------------------------------
//       if (emailType === "newBusiness") {
//         if (!busID) {
//           return res.status(400).json({ error: "Missing busID" });
//         }

//         const busDoc = await admin
//           .firestore()
//           .collection("Businesses")
//           .doc(busID)
//           .get();

//         if (!busDoc.exists) {
//           return res.status(404).json({ error: "Business not found" });
//         }

//         const bus = busDoc.data() || {};

//         payload.busname = clean(bus.busname, "");
//         payload.summary = clean(bus.summary, "");
//         payload.description = clean(bus.description, "");
//         payload.location = clean(bus.location, "");
//         payload.busemail = clean(bus.busemail, "");

//         let date = bus.date;
//         if (date instanceof admin.firestore.Timestamp) {
//           payload.date = date.toDate().toISOString();
//         } else if (date instanceof Date) {
//           payload.date = date.toISOString();
//         } else if (typeof date === "string") {
//           payload.date = new Date(date).toISOString();
//         } else {
//           payload.date = new Date().toISOString();
//         }

//         payload.busID = busID;
//         payload.category = clean(bus.category, "");
//         payload.phone = clean(bus.phone, "");
//         payload.website = clean(bus.website, "");
//         payload.imageUrl = clean(bus.mainImage ?? bus.images[0] ?? "", "");

//         payload.ownerName = clean(bus.ownerName, "");
//         payload.ownerEmail = clean(bus.ownerEmail, "");
//       }

//       // ------------------------------------
//       // LOG ID + UNSUBSCRIBE URL
//       // ------------------------------------
//       const ts = PulseRealm.PulseNOW.toMillis();
//       payload.logId = payload.logId || `${emailType}-${ts}`;
//       payload.unsubscribeUrl = "/unsubscribe";

//       validatePayload(emailType, payload);

//       // ------------------------------------
//       // BROADCAST LOOP (NEW SCHEMA)
//       // ------------------------------------
//       const usersSnapshot = await db.collection("Users").get();
//       const sendPromises = [];

//       usersSnapshot.forEach((doc) => {
//         const u = doc.data() || {};

//         const TPIdentity = u.TPIdentity || {};
//         const TPNotifications = u.TPNotifications || {};

//         const uEmail = normalizeEmail(TPIdentity.email);
//         if (!uEmail) return;

//         if (TPNotifications.receiveMassEmails === false) return;

//         let resendToken = TPIdentity.resendToken;

//         if (!resendToken) {
//           resendToken = crypto.randomUUID();
//           doc.ref.update({
//             "TPIdentity.resendToken": resendToken
//           }).catch((err) => {
//             console.error("⚠️ Failed to set TPIdentity.resendToken for", uEmail, err.message);
//           });
//         }

//         const userPayload = {
//           ...payload,
//           email: uEmail,
//           userID: doc.id,
//           unsubscribeUrl: `/unsubscribe?token=${encodeURIComponent(
//             resendToken
//           )}`
//         };

//         sendPromises.push(
//           sendEmailToUser(uEmail, emailType, userPayload).catch((err) => {
//             console.error("❌ Failed to send to:", uEmail, err.message);
//           })
//         );
//       });

//       await Promise.all(sendPromises);

//       return res.json({
//         success: true,
//         message: `Broadcast email sent to ${usersSnapshot.size} users.`
//       });

//     } catch (err) {
//       console.error("❌ broadcastEmail error:", err);
//       return res.status(500).json({
//         error: "Broadcast email failed",
//         details: err.message || String(err)
//       });
//     }
//   }
// );
// export const getStripeDashboardLink = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB",
//     secrets: [
//       STRIPE_PASSWORD,
//       ACCOUNT_SID,
//       AUTH_TOKEN,
//       MESSAGING_SERVICE_SID,
//       EMAIL_PASSWORD,
//       STRIPE_WEBHOOK_SECRET
//     ]
//   },
//   async (req, res) => {
//     log("🔵 [getStripeDashboardLink] START");

//     const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
//     const stripe = Stripe(STRIPE_PASSWORD_VALUE);

//     const clean = (v, fallback = null) => {
//       if (!v) return fallback;
//       const s = String(v);
//       if (
//         s.trim() === "" ||
//         s.includes("{{") ||
//         s.includes("add_more_field") ||
//         s.includes("fieldLebal") ||
//         s.includes("fieldValue") ||
//         s.includes("*")
//       ) {
//         return fallback;
//       }
//       return s.trim();
//     };

//     try {
//       // ---------------------------------------------------------
//       // 1️⃣ Extract + validate token
//       // ---------------------------------------------------------
//       const rawToken = req.query.token;
//       const token = clean(rawToken, null);

//       if (!token) {
//         log("❌ Missing token");
//         return res.redirect("/error.html");
//       }

//       // Honeypot
//       if (req.query.nickname) {
//         log("⚠️ Honeypot triggered");
//         return res.redirect("/error.html");
//       }

//       // ---------------------------------------------------------
//       // 2️⃣ Lookup user by NEW SCHEMA
//       // ---------------------------------------------------------
//       let snap = await admin
//         .firestore()
//         .collection("Users")
//         .where("TPIdentity.resendToken", "==", token)
//         .limit(1)
//         .get();

//       // Legacy fallback (rare)
//       if (snap.empty) {
//         snap = await admin
//           .firestore()
//           .collection("Users")
//           .where("resendToken", "==", token)
//           .limit(1)
//           .get();
//       }

//       if (snap.empty) {
//         log("❌ Token not found");
//         return res.redirect("https://www.pulseworld.net/error.html");
//       }

//       const userDoc = snap.docs[0];
//       const userRef = userDoc.ref;
//       const data = userDoc.data() || {};

//       const TPIdentity = data.TPIdentity || {};
//       const TPWallet = data.TPWallet || {};
//       const TPSecurity = data.TPSecurity || {};

//       const email = clean(TPIdentity.email, null);
//       if (!email) {
//         log("❌ Missing TPIdentity.email");
//         return res.redirect("/error.html");
//       }

//       // ---------------------------------------------------------
//       // 3️⃣ Verify token with backend
//       // ---------------------------------------------------------
//       const verifyResponse = await fetch(
//         "https://verifytoken-ilx3agka5q-uc.a.run.app",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token })
//         }
//       );

//       const verified = await verifyResponse.json();

//       if (!verified.success) {
//         log("❌ Token verification failed");
//         return res.redirect("/error.html");
//       }

//       const verifiedIdentity = verified.identity || null;
//       if (!verifiedIdentity) {
//         log("❌ Missing identity from verification");
//         return res.redirect("/error.html");
//       }

//       // Canonical name rule
//       const role = verifiedIdentity.role || TPIdentity.role || "Deliverer";

//       // ---------------------------------------------------------
//       // 4️⃣ Stripe account ID (NEW SCHEMA)
//       // ---------------------------------------------------------
//       const accountId =
//         TPIdentity.stripeAccountID ||
//         TPSecurity.stripeAccountID ||
//         null;

//       if (!accountId) {
//         log("❌ Missing Stripe account");
//         return res.redirect("/error.html");
//       }

//       // ---------------------------------------------------------
//       // 5️⃣ Update loginAttempts + TPIdentity.role
//       // ---------------------------------------------------------
//       const attempts = Number(TPWallet.loginAttempts || 0) + 1;

//       await userRef.set(
//         {
//           TPIdentity: {
//             ...TPIdentity,
//             role
//           },
//           TPWallet: {
//             ...TPWallet,
//             loginAttempts: attempts
//           }
//         },
//         { merge: true }
//       );

//       // ---------------------------------------------------------
//       // 6️⃣ Cooldown logic
//       // ---------------------------------------------------------
//       const now = PulseRealm.PulseNOW.toMillis();

//       const lastLogin =
//         TPWallet.loginAt instanceof admin.firestore.Timestamp
//           ? TPWallet.loginAt.toMillis()
//           : Number(TPWallet.loginAt || 0);

//       if (now - lastLogin < 60000 && TPWallet.loginLink) {
//         log("⏳ Cooldown active — reusing login link");
//         return res.redirect(TPWallet.loginLink);
//       }

//       // ---------------------------------------------------------
//       // 7️⃣ Create fresh login link
//       // ---------------------------------------------------------
//       const link = await stripe.accounts.createLoginLink(accountId);

//       await userRef.set(
//         {
//           TPWallet: {
//             ...TPWallet,
//             loginAt: now,
//             loginLink: link.url
//           }
//         },
//         { merge: true }
//       );

//       log("✅ Login link created for:", email);
//       return res.redirect(link.url);

//     } catch (err) {
//       console.error("❌ getStripeDashboardLink error:", err);
//       return res.redirect("/error.html");
//     }
//   }
// );

// export const onPulseHistoryChanged = onDocumentWritten(
//   "PulseHistory/{uid}/entries/{entryId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "PulseHistory",
//         before,
//         after,
//         `${event.params.uid}/${event.params.entryId}`,
//         location,
//         source,
//         project
//       );

//       // ⭐ Update timestamp
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onPulseHistoryChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onPulseHistoryChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onBusinessChanged = onDocumentWritten(
//   "Businesses/{busId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       // Prevent infinite loops
//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Businesses",
//         before,
//         after,
//         event.params.busId,
//         location,
//         source,
//         project
//       );

//       // ⭐ Mark + timestamp
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onBusinessChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onBusinessChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onEventChanged = onDocumentWritten(
//   "Events/{eventId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Events",
//         before,
//         after,
//         event.params.eventId,
//         location,
//         source,
//         project
//       );

//       // ⭐ Mark + timestamp
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onEventChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onEventChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onOrderChanged = onDocumentWritten(
//   "Orders/{orderId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Orders",
//         before,
//         after,
//         event.params.orderId,
//         location,
//         source,
//         project
//       );

//       // ⭐ Add timestamp
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onOrderChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onOrderChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onUserChanged = onDocumentWrittenWithAuthContext(
//   "Users/{uid}",
//   async (event) => {
//     return handleUserChange(event, true);
//   }
// );

// export const onUserChangedNoAuth = onDocumentWritten(
//   "Users/{uid}",
//   async (event) => {
//     return handleUserChange(event, false);
//   }
// );

// export const onSettingsChanged = onDocumentWritten(
//   "Settings/global",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Settings",
//         before,
//         after,
//         "global",
//         location,
//         source,
//         project
//       );

//       // ⭐ Add updatedAt
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });
//     } catch (err) {
//       console.error("onSettingsChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onSettingsChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );


// export const onPulseHistoryChangedwAuth = onDocumentWrittenWithAuthContext(
//   "PulseHistory/{uid}/entries/{entryId}",
//   async (event) => {
//     try {
//       const actorUID  = event.auth.uid || null;
//       const targetUID = event.params.uid;
//       const entryId   = event.params.entryId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Cross-user write detection
//       // -----------------------------------------
//       if (actorUID && actorUID !== targetUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_pulsehistory",
//           actorUID,
//           targetUID,
//           entryId,
//           before,
//           after,
//           path: `PulseHistory/${targetUID}/entries/${entryId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       // -----------------------------------------
//       // Normal diff logging
//       // -----------------------------------------
//       await logChange(
//         "PulseHistory",
//         before,
//         after,
//         `${targetUID}/${entryId}`,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Add updatedAt
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onPulseHistoryChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onPulseHistoryChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onBusinessChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Businesses/{busId}",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;
//       const busId    = event.params.busId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       // Prevent infinite loops
//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Business owner mismatch
//       // -----------------------------------------
//       const ownerUID = after.ownerUID || before.ownerUID || null;

//       if (actorUID && ownerUID && actorUID !== ownerUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_business",
//           actorUID,
//           ownerUID,
//           busId,
//           before,
//           after,
//           path: `Businesses/${busId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       await logChange(
//         "Businesses",
//         before,
//         after,
//         busId,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Mark + timestamp (single update to avoid recursion)
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onBusinessChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onBusinessChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onEventChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Events/{eventId}",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;
//       const eventId  = event.params.eventId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       // Prevent infinite loops
//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Event owner mismatch
//       // -----------------------------------------
//       const ownerUID = after.ownerUID || before.ownerUID || null;

//       if (actorUID && ownerUID && actorUID !== ownerUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_event",
//           actorUID,
//           ownerUID,
//           eventId,
//           before,
//           after,
//           path: `Events/${eventId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       await logChange(
//         "Events",
//         before,
//         after,
//         eventId,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Mark + timestamp
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onEventChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onEventChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onOrderChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Orders/{orderId}",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;
//       const orderId  = event.params.orderId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Order owner mismatch
//       // -----------------------------------------
//       const ownerUID = after.userUID || before.userUID || null;

//       if (actorUID && ownerUID && actorUID !== ownerUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_order",
//           actorUID,
//           ownerUID,
//           orderId,
//           before,
//           after,
//           path: `Orders/${orderId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       // -----------------------------------------
//       // Normal diff logging
//       // -----------------------------------------
//       await logChange(
//         "Orders",
//         before,
//         after,
//         orderId,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Add updatedAt
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onOrderChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onOrderChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// async function handleUserChange(event, hasAuth) {
//   try {
//     const actorUID  = hasAuth ? (event.auth.uid || null) : null;
//     const targetUID = event.params.uid;

//     // Raw before/after
//     const beforeRaw = event.data.before.data() || {};
//     const afterRaw  = event.data.after.data() || {};

//     const location  = event.location || "";
//     const source    = event.source || "";
//     const project   = event.project || "";

//     // ---------------------------------------------------------
//     // 1️⃣ Cross-user write guard
//     // ---------------------------------------------------------
//     if (hasAuth && actorUID && actorUID !== targetUID) {
//       await db.collection("USER_TRIED").add({
//         reason: "cross_user_write",
//         actorUID,
//         targetUID,
//         before: beforeRaw,
//         after: afterRaw,
//         path: `Users/${targetUID}`,
//         userAgent: event.auth.token.userAgent || null,
//         ts: PulseRealm.PulseNOW,
//         createdAt: PulseRealm.PulseNOW
//       });
//       return;
//     }

//     // ---------------------------------------------------------
//     // 2️⃣ Prevent re-logging loops
//     // ---------------------------------------------------------
//     if (afterRaw._changeLogged === true) {
//       return;
//     }

//     // ---------------------------------------------------------
//     // 3️⃣ Clean internal fields + prepare for diff
//     // ---------------------------------------------------------
//     const stripInternal = (obj) => {
//       if (!obj || typeof obj !== "object") return obj;
//       const out = {};
//       for (const k of Object.keys(obj)) {
//         if (k.startsWith("_")) continue;
//         out[k] = stripInternal(obj[k]);
//       }
//       return out;
//     };

//     const before = stripInternal(beforeRaw);
//     const after  = stripInternal(afterRaw);

//     // ---------------------------------------------------------
//     // 4️⃣ Enforce NEW TOKEN RULES
//     // Root-level resendToken is illegal
//     // TPIdentity.resendToken is the ONLY valid token
//     // ---------------------------------------------------------
//     const beforeRootToken = beforeRaw.resendToken ?? null;
//     const afterRootToken  = afterRaw.resendToken ?? null;

//     const beforeIdentity = before.TPIdentity || {};
//     const afterIdentity  = after.TPIdentity || {};

//     const beforeSessionToken = beforeIdentity.resendToken ?? null;
//     const afterSessionToken  = afterIdentity.resendToken ?? null;

//     // ❌ If root token changed → illegal unless initial system set
//     if (beforeRootToken !== afterRootToken) {
//       const isInitialSet =
//         (beforeRootToken === null || beforeRootToken === undefined) &&
//         afterRootToken &&
//         (source === "verifyPin" || source === "system_init");

//       if (!isInitialSet) {
//         await db.collection("SECURITY_VIOLATIONS").add({
//           uid: targetUID,
//           reason: "root_resendToken_modified",
//           beforeRootToken,
//           afterRootToken,
//           actorUID,
//           source,
//           location,
//           project,
//           createdAt: PulseRealm.PulseNOW
//         });

//         // Revert root token
//         await event.data.after.ref.update({
//           resendToken: beforeRootToken,
//           _changeLogged: true
//         });

//         return;
//       }
//     }

//     // ---------------------------------------------------------
//     // 5️⃣ Detect drift between root + TPIdentity token
//     // ---------------------------------------------------------
//     if (
//       afterRootToken &&
//       afterSessionToken &&
//       afterRootToken !== afterSessionToken
//     ) {
//       await db.collection("DRIFT_LOGS").add({
//         uid: targetUID,
//         rootResendToken: afterRootToken,
//         sessionResendToken: afterSessionToken,
//         reason: "token_drift_detected",
//         actorUID,
//         source,
//         location,
//         project,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // 6️⃣ Deep diff (field-level)
//     // ---------------------------------------------------------
//     const diff = {};
//     function walk(b, a, path = "") {
//       const keys = new Set([...Object.keys(b || {}), ...Object.keys(a || {})]);

//       for (const key of keys) {
//         const full = path ? `${path}.${key}` : key;

//         const bv = b ? b[key] : undefined;
//         const av = a ? a[key] : undefined;

//         if (deepEqual(bv, av)) continue;

//         if (
//           typeof bv === "object" &&
//           typeof av === "object" &&
//           bv &&
//           av &&
//           !Array.isArray(bv) &&
//           !Array.isArray(av)
//         ) {
//           walk(bv, av, full);
//         } else {
//           diff[full] = {
//             from: bv ?? null,
//             to: av ?? null
//           };
//         }
//       }
//     }

//     walk(before, after);

//     // ---------------------------------------------------------
//     // 🧠 NEW: Versioning Engine (micro + mid + global)
//     // ---------------------------------------------------------

//     const changedGroups = new Set();

//     // Detect which TP groups changed
//     for (const path of Object.keys(diff)) {
//       if (path.startsWith("TPIdentity.")) changedGroups.add("TPIdentity");
//       if (path.startsWith("TPLoyalty.")) changedGroups.add("TPLoyalty");
//       if (path.startsWith("TPNotifications.")) changedGroups.add("TPNotifications");
//       if (path.startsWith("TPWallet.")) changedGroups.add("TPWallet");
//       if (path.startsWith("TPSecurity.")) changedGroups.add("TPSecurity");
//       // TPFirebaseAuth is intentionally excluded (no versioning)
//     }

//     // ---------------------------------------------------------
//     // 1️⃣ Micro update — only ONE group changed
//     // ---------------------------------------------------------
//     if (changedGroups.size === 1) {
//       const group = [...changedGroups][0];

//       await event.data.after.ref.update({
//         [`${group}.calculationVersion`]: admin.firestore.FieldValue.increment(1),
//         updatedAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // 2️⃣ Mid update — MULTIPLE groups changed
//     // ---------------------------------------------------------
//     if (changedGroups.size > 1) {
//       await event.data.after.ref.update({
//         UserVersion: admin.firestore.FieldValue.increment(1),
//         updatedAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // 3️⃣ Global update — bump CACHE_CONTROL.usersVersion
//     // ---------------------------------------------------------
//     if (changedGroups.size > 0) {
//       const controlRef = db.collection("Config").doc("CACHE_CONTROL");
//       await controlRef.update({
//         usersVersion: admin.firestore.FieldValue.increment(1)
//       });
//     }
//     // ---------------------------------------------------------
//     // 7️⃣ If no diff → snapshot only
//     // ---------------------------------------------------------
//     if (Object.keys(diff).length === 0) {
//       await db
//         .collection("TPIdentityHistory")
//         .doc(targetUID)
//         .collection("snapshots")
//         .add({
//           user: afterRaw,
//           rootResendToken: afterRootToken,
//           sessionResendToken: afterSessionToken,
//           location,
//           source,
//           project,
//           note: "No diff, snapshot only",
//           actorUID,
//           createdAt: PulseRealm.PulseNOW
//         });

//       await event.data.after.ref.update({ _changeLogged: true });
//       return;
//     }

//     // ---------------------------------------------------------
//     // 8️⃣ Log full diff
//     // ---------------------------------------------------------
//     await db.collection("CHANGES").add({
//       collection: "Users",
//       docId: targetUID,
//       diff,
//       timestamp: PulseRealm.PulseNOW,
//       processed: false,
//       actor: actorUID
//         ? { type: "USER", uid: actorUID }
//         : { type: "SYSTEM", uid: null },
//       location,
//       source,
//       project,
//       createdAt: PulseRealm.PulseNOW
//     });

//     // ---------------------------------------------------------
//     // 9️⃣ Log TPIdentity-only diff if changed
//     // ---------------------------------------------------------
//     if (!deepEqual(beforeIdentity, afterIdentity)) {
//       const identityDiff = {};
//       for (const k of Object.keys(diff)) {
//         if (k.startsWith("TPIdentity.")) {
//           identityDiff[k] = diff[k];
//         }
//       }

//       await db.collection("CHANGES").add({
//         collection: "Users.TPIdentity",
//         docId: targetUID,
//         diff: identityDiff,
//         timestamp: PulseRealm.PulseNOW,
//         processed: false,
//         actor: actorUID
//           ? { type: "USER", uid: actorUID }
//           : { type: "SYSTEM", uid: null },
//         location,
//         source,
//         project,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     // ---------------------------------------------------------
//     // 🔟 Snapshot with both tokens
//     // ---------------------------------------------------------
//     await db
//       .collection("TPIdentityHistory")
//       .doc(targetUID)
//       .collection("snapshots")
//       .add({
//         user: afterRaw,
//         rootResendToken: afterRootToken,
//         sessionResendToken: afterSessionToken,
//         location,
//         source,
//         project,
//         actorUID,
//         createdAt: PulseRealm.PulseNOW
//       });

//     // ---------------------------------------------------------
//     // 1️⃣1️⃣ Mark as logged
//     // ---------------------------------------------------------
//     await event.data.after.ref.update({ _changeLogged: true });

//   } catch (err) {
//     await db.collection("FUNCTION_ERRORS").add({
//       fn: "handleUserChange",
//       params: event.params,
//       error: String(err),
//       createdAt: PulseRealm.PulseNOW
//     });
//   }
// }

// export const onSettingsChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Settings/global",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;   // Who performed the write
//       const before   = event.data.before.data() || {};
//       const after    = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // 0️⃣ SECURITY CHECK: ONLY ALLOW AUTHORIZED ADMINS
//       // -----------------------------------------
//       // You can customize this list or fetch from Firestore
//       const allowedAdmins = [
//         "EcqiBcTTnqwg8QwSKYWy"
//       ];

//       if (!actorUID || !allowedAdmins.includes(actorUID)) {
//         // Log the unauthorized attempt
//         await db.collection("USER_TRIED").add({
//           reason: "unauthorized_settings_write",
//           actorUID,
//           path: "Settings/global",
//           before,
//           after,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });

//         // Optional: revert the write
//         // await event.data.after.ref.set(before, { merge: false });

//         // Optional: flag the actor
//         // await db.collection("DANGER_FLAGS").doc(actorUID).set({ flagged: true }, { merge: true });

//         return; // Do NOT continue normal processing
//       }

//       // -----------------------------------------
//       // 1️⃣ Log the settings diff
//       // -----------------------------------------
//       await logChange(
//         "Settings",
//         before,
//         after,
//         "global",
//         location,
//         source,
//         project,
//         actorUID
//       );

//     } catch (err) {
//       console.error("onSettingsChanged error:", err);

//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onSettingsChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

function deepEqual(a, b) {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Objects
  if (typeof a === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

async function logChange(
  collection,
  before,
  after,
  docId,
  location,
  source,
  project,
  actorUID = null
) {
  const timestamp = PulseRealm.PulseNOW;

  // Strip internal fields
  const clean = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    const out = {};
    for (const k of Object.keys(obj)) {
      if (k.startsWith("_")) continue;
      out[k] = clean(obj[k]);
    }
    return out;
  };

  before = clean(before || {});
  after = clean(after || {});

  // Deep diff collector
  const diff = {};

  function walk(b, a, path = "") {
    const keys = new Set([...Object.keys(b || {}), ...Object.keys(a || {})]);

    for (const key of keys) {
      const full = path ? `${path}.${key}` : key;

      const bv = b ? b[key] : undefined;
      const av = a ? a[key] : undefined;

      // Identical → skip
      if (deepEqual(bv, av)) continue;

      // Recurse into nested objects
      if (
        typeof bv === "object" &&
        typeof av === "object" &&
        bv &&
        av &&
        !Array.isArray(bv) &&
        !Array.isArray(av)
      ) {
        walk(bv, av, full);
      } else {
        diff[full] = {
          from: bv ?? null,
          to: av ?? null
        };
      }
    }
  }

  walk(before, after);

  // Determine actor
  const actor = actorUID
    ? { type: "USER", uid: actorUID }
    : after._actor || { type: "SYSTEM", uid: null };

  // No diff → still log
  if (Object.keys(diff).length === 0) {
    await db.collection("CHANGES").add({
      collection,
      docId,
      diff: {},
      timestamp,
      processed: false,
      actor,
      location,
      source,
      project,
      note: "No diff, handler executed",
      createdAt: PulseRealm.PulseNOW
    });
    return;
  }

  // Normal diff logging
  await db.collection("CHANGES").add({
    collection,
    docId,
    diff,
    timestamp,
    processed: false,
    actor,
    location,
    source,
    project,
    createdAt: PulseRealm.PulseNOW
  });
}

export const stripeSetupComplete = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB",
  },
  async (req, res) => {
    log("🔵 [stripeSetupComplete] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const stripe = Stripe(STRIPE_PASSWORD_VALUE);

    try {
      // ---------------------------------------------------------
      // 1️⃣ Extract token (new or old flow)
      // ---------------------------------------------------------
      let token = null;

      if (req.query.account) {
        const accountId = req.query.account;
        const account = await stripe.accounts.retrieve(accountId);

        token = account.metadata.token || null;
        if (!token) {
          return res.redirect("/error.html");
        }
      } else if (req.query.token) {
        token = req.query.token;
      } else {
        return res.redirect("/error.html");
      }

      // ---------------------------------------------------------
      // 2️⃣ Lookup user by NEW SCHEMA
      // ---------------------------------------------------------
      let snap = await db
        .collection("Users")
        .where("TPIdentity.resendToken", "==", token)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await db
          .collection("Users")
          .where("resendToken", "==", token)
          .limit(1)
          .get();
      }

      if (snap.empty) {
        return res.redirect("/error.html");
      }

      const userDoc = snap.docs[0];
      const userRef = userDoc.ref;
      const data = userDoc.data() || {};
      let username  = data.displayName || data.displayname || data.DisplayName;
      const TPIdentity = data.TPIdentity || {};
      const TPWallet = data.TPWallet || {};
      const TPSecurity = data.TPSecurity || {};

      const email = TPIdentity.email || null;

      const accountId =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        null;

      const role = TPIdentity.role || "Deliverer";

      if (!email || !accountId) {
        return res.redirect("/error.html");
      }

      // ---------------------------------------------------------
      // 3️⃣ Throttle login attempts (NEW SCHEMA)
      // ---------------------------------------------------------
      const now = PulseRealm.PulseNOW.toMillis();
      const increment = (n = 1) => ({ integerIncrement: n });
      const lastLogin =
        TPWallet.loginAt
          ? TPWallet.loginAt.toMillis()
          : Number(TPWallet.loginAt || 0);

      await userRef.update({
        "TPWallet.loginAttempts": increment(1)
      });

      if (now - lastLogin < 60000 && TPWallet.loginLink) {
        return res.redirect(
          `?impulse=PulseWorldVaultSetupComplete&user=${encodeURIComponent(username)}`
        );
      }

      // ---------------------------------------------------------
      // 4️⃣ Create fresh login link
      // ---------------------------------------------------------
      const link = await stripe.accounts.createLoginLink(accountId);

      await userRef.set(
        {
          TPIdentity: {
            ...TPIdentity,
            paymentSetup: "Complete",
            role
          },
          TPWallet: {
            ...TPWallet,
            loginAt: now,
            loginLink: link.url
          },
          TPSecurity: {
            ...TPSecurity
          },
          setupAt: PulseRealm.PulseNOW
        },
        { merge: true }
      );

      // ---------------------------------------------------------
      // 5️⃣ Redirect to success page
      // ---------------------------------------------------------
      return res.redirect(
        `?impulse=PulseWorldVaultSetupComplete&user=${encodeURIComponent(username)}`
      );

    } catch (err) {
      console.error("❌ Error in stripeSetupComplete:", err);
      return res.redirect("/error.html");
    }
  }
);

export const massEmailWebhook = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        log("🔵 [massEmailWebhook] START");

        const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
        const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
        const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
        const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();

        const email =
          req.method === "GET" ? req.query.email : req.body.email;

        const eventID =
          req.method === "GET"
            ? req.query.eventID || req.query.eventId
            : req.body.eventID || req.body.eventId;

        if (!email) {
          return res.status(400).send({ error: "Missing email" });
        }

        // ---------------------------------------------------------
        // Lookup user by NEW SCHEMA
        // ---------------------------------------------------------
        let snap = await db
          .collection("Users")
          .where("TPIdentity.email", "==", email.toLowerCase())
          .limit(1)
          .get();

        // Legacy fallback
        if (snap.empty) {
          snap = await db
            .collection("Users")
            .where("Email", "==", email.toLowerCase())
            .limit(1)
            .get();
        }

        let userID;
        let userData;

        if (snap.empty) {
          // NEW USER (NEW SCHEMA)
          const ref = await db.collection("Users").add({
            TPIdentity: {
              email: email.toLowerCase(),
              name: "New User",
              displayName: null,
              role: "Customer",
              identitySetAt: PulseRealm.PulseNOW,
              resendToken: null,
              trustedDevice: false,
              stripeAccountID: null,
              stripeDashboardURL: null,
              loginLink: null,
              paymentSetup: "Incomplete"
            },
            TPNotifications: {
              freeMassNotificationsLimit: 2,
              freeMassNotificationsUsed: 0,
              paidMassNotificationCredits: 0,
              receiveMassEmails: true,
              receiveSMS: true,
              lastEmailSentAt: null,
              lastSMSSentAt: null,
              emailPending: false
            },
            createdAt: PulseRealm.PulseNOW
          });

          userID = ref.id;
          userData = {
            TPIdentity: { name: "New User" },
            TPNotifications: {
              freeMassNotificationsLimit: 2,
              freeMassNotificationsUsed: 0,
              paidMassNotificationCredits: 0
            }
          };
        } else {
          const doc = snap.docs[0];
          userID = doc.id;
          userData = doc.data() || {};

          const TPNotifications = userData.TPNotifications || {};

          // Ensure required fields exist
          const updates = {};

          if (TPNotifications.freeMassNotificationsLimit == null) {
            updates["TPNotifications.freeMassNotificationsLimit"] = 2;
            TPNotifications.freeMassNotificationsLimit = 2;
          }

          if (TPNotifications.paidMassNotificationCredits == null) {
            updates["TPNotifications.paidMassNotificationCredits"] = 0;
            TPNotifications.paidMassNotificationCredits = 0;
          }

          if (TPNotifications.freeMassNotificationsUsed == null) {
            updates["TPNotifications.freeMassNotificationsUsed"] = 0;
            TPNotifications.freeMassNotificationsUsed = 0;
          }

          if (Object.keys(updates).length) {
            await db.collection("Users").doc(userID).update(updates);
          }

          userData.TPNotifications = TPNotifications;
        }

        const TPNotifications = userData.TPNotifications || {};
        const freeUsed = TPNotifications.freeMassNotificationsUsed || 0;
        const freeLimit = TPNotifications.freeMassNotificationsLimit || 2;
        const paidRemaining = TPNotifications.paidMassNotificationCredits || 0;

        const freeRemaining = Math.max(freeLimit - freeUsed, 0);

        // ---------------------------------------------------------
        // No credits → send payment email
        // ---------------------------------------------------------
        if (freeRemaining <= 0 && paidRemaining <= 0) {
          const eventImageUrl = "./_EXPRESSIONS/_PEX/BUILD/NewEvent";

          const paymentLink = await createMassEmailPaymentLink(
            eventID,
            eventImageUrl
          );

          await sendNoCreditsEmail({
            email,
            paymentLink,
            eventID,
            emailPassword: EMAIL_PASSWORD_VALUE,
            accountSid: ACCOUNT_SID_VALUE,
            authToken: AUTH_TOKEN_VALUE,
            messagingSid: MESSAGING_SERVICE_SID_VALUE
          });

          return res.json({ status: "no_credits", paymentLink });
        }

        const userRef = db.collection("Users").doc(userID);
        const increment = (n = 1) => ({ integerIncrement: n });
        if (freeRemaining > 0) {
          await userRef.update({
            "TPNotifications.freeMassNotificationsUsed":
              increment(1)
          });
        } else {
          await userRef.update({
            "TPNotifications.paidMassNotificationCredits":
              increment(-1)
          });
        }

        // ---------------------------------------------------------
        // Send event email
        // ---------------------------------------------------------
        await fetch(
          `https://sendmassemail-ilx3agka5q-uc.a.run.app` +
            `?useremail=${encodeURIComponent(email)}` +
            `&emailType=newEvent` +
            `&eventID=${encodeURIComponent(eventID)}`
        );

        return res.status(200).send({ status: "sent" });

      } catch (err) {
        console.error("❌ Mass Email Webhook Error:", err);
        return res.status(500).send({ error: "Internal error" });
      }
    });
  }
);

export const getOrCreateUserByEmail = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    log("🔵 [getOrCreateUserByEmail] START");

    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
    let logId = null;

      let userID;
      let username;
      let useremail;
      let displayName;
    try {
      // CORS
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).send("");

      // 1️⃣ Email
      const email = String(req.query.email || "")
        .trim()
        .toLowerCase();

      if (!email.includes("@")) {
        return res.status(400).send("invalid_email");
      }

      // 2️⃣ Lookup user (NEW SCHEMA FIRST)
      let snap = await db
        .collection("Users")
        .where("TPIdentity.email", "==", email)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await db
          .collection("Users")
          .where("Email", "==", email)
          .limit(1)
          .get();
      }


      if (!snap.empty) {
        // Existing user
        const doc = snap.docs[0];
        const data = doc.data() || {};
        userID = doc.id;

        const TPIdentity = data.TPIdentity || {};

        username =
          TPIdentity.name ||
          TPIdentity.displayName ||
          "New User";

          useremail =
          TPIdentity.email ||
          null;

        displayName =
          TPIdentity.displayName ||
          (await generateUniqueDisplayName({ email, context: "ui" }));

        // Ensure TPIdentity bucket exists
        await doc.ref.set(
          {
            TPIdentity: {
              ...TPIdentity,
              uid: userID,
              email,
              name: username,
              displayName,
              role: TPIdentity.role || "Customer",
              identitySetAt:
                TPIdentity.identitySetAt ||
                PulseRealm.PulseNOW
            }
          },
          { merge: true }
        );

        log("✅ Existing user:", { userID, username, displayName });

      } else {
        // 3️⃣ Create new user (NEW SCHEMA)
        displayName = await generateUniqueDisplayName({
          email,
          context: "ui"
        });

        const ref = db.collection("Users").doc();

        await ref.set(
          { Name: username,
            UserEmail: useremail,
            UserID: userID,
            UserToken: null,
            UserVersion: 2,

            TPIdentity: {
              uid: userID,
              name: "New User",
              displayName,
              email: useremail,
              role: "Customer",
              identitySetAt: PulseRealm.PulseNOW,
              resendToken: null,
              referralCode: null,
              trustedDevice: false,
              stripeAccountID: null,
              stripeDashboardURL: null,
              loginLink: null,
              paymentSetup: "Incomplete"
            },

            TPNotifications: {
              freeMassNotificationsLimit: 2,
              freeMassNotificationsUsed: 0,
              paidMassNotificationCredits: 0,
              receiveMassEmails: true,
              receiveSMS: true,
              lastEmailSentAt: null,
              lastSMSSentAt: null,
              emailPending: false
            },

            TPWallet: {
              walletBalance: 0,
              lifetimePoints: 0,
              pointsBalance: 0,
              vaultVisitCount: 0,
              lastVaultVisit: null,
              lastActive: null,
              lastAppActive: null,
              lastEarnedDate: null,
              lastOrderDate: null,
              totalOrders: 0,
              loginAt: null,
              loginAttempts: 0,
              lastFirebaseIssued: null,
              lastUpdatedAt: PulseRealm.PulseNOW,
              payDay: null,
              payFrequency: null
            },

            TPSecurity: {
              alwaysRequirePin: false,
              appLocked: false,
              dangerMode: false,
              lastLockReason: "",
              lastUnlockTime: 0,
              pinAttempts: 0,
              pinHash: "",
              pinResetExpires: 0,
              pinResetToken: "",
              pinSet: false,
              requiresPin: false,
              vaultLocked: false,
              setupAt: PulseRealm.PulseNOW,
              updatedAt: PulseRealm.PulseNOW
            },

            TPReminders: {},
            createdAt: PulseRealm.PulseNOW,
            updatedAt: PulseRealm.PulseNOW,
            isLoggedIn: false
          },
          { merge: true }
        );

        userID = ref.id;
        username = "New User";

        log("🆕 New user created:", { userID, displayName });
      }

      // 4️⃣ EmailLog
      const payload = {
        email,
        userID,
        adminUser: "Automate",
        logId: null
      };

      const logRef = await db.collection("EmailLogs").add({
        date: PulseRealm.PulseNOW,
        to: email,
        type: "newUser",
        payload,
        html: "",
        subject: "",
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "getOrCreateUserByEmail",
        status: "Pending",
        emailType: "newUser",
        name: username,
        createdAt: PulseRealm.PulseNOW
      });

      logId = logRef.id;
      payload.logId = logId;

      // 5️⃣ Template
      const template = emailTemplates["newUser"];
      if (!template) return res.status(500).send("missing_template_newUser");

      const subject = template.subject(payload);
      const html = template.html(payload);

      await logRef.set(
        {
          payload,
          html,
          subject,
          updatedAt: PulseRealm.PulseNOW
        },
        { merge: true }
      );

      await createEmailTransport.sendMail({
        from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
        to: email,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html
      });

      await logRef.update({
        status: "Sent",
        sentAt: PulseRealm.PulseNOW
      });

      log("🔵 [getOrCreateUserByEmail] END (success)");
      return res.status(200).send(userID);

    } catch (error) {
      console.error("❌ ERROR:", error);

      const safeErrorMessage = String(
        error.message ||
          error.raw.message ||
          error.raw.error.message ||
          error.response.data.error ||
          error.toString() ||
          "Unknown error"
      )
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");

      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: PulseRealm.PulseNOW,
          error: safeErrorMessage
        });
      }

      log("🔵 [getOrCreateUserByEmail] END (failure)");
      return res.status(500).send(safeErrorMessage);
    }
  }
);

/* ===========================
   STRIPE ONBOARDING FUNCTION
=========================== */
export const createOrGetStripeAccount = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    log("🔵 [createOrGetStripeAccount] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
    const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
    const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

    const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);
    const stripe = Stripe(STRIPE_PASSWORD_VALUE);

    let logId = null;

    try {
      // CORS
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).send("");

      // -----------------------------
      // 1️⃣ EMAIL
      // -----------------------------
      const email = String(req.query.email || "")
        .trim()
        .toLowerCase();

      if (!email.includes("@")) {
        return res.status(400).send("invalid_email");
      }

      // -----------------------------
      // 2️⃣ LOOKUP USER (NEW SCHEMA FIRST)
      // -----------------------------
      let snap = await db
        .collection("Users")
        .where("TPIdentity.email", "==", email)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await db
          .collection("Users")
          .where("Email", "==", email)
          .limit(1)
          .get();
      }

      if (snap.empty) return res.status(400).send("Missing userID");

      const userDoc = snap.docs[0];
      const userData = userDoc.data() || {};

      const TPIdentity = userData.TPIdentity || {};
      const TPWallet = userData.TPWallet || {};
      const TPSecurity = userData.TPSecurity || {};
      const TPNotifications = userData.TPNotifications || {};

      const userID = userDoc.id;

      // -----------------------------
      // 3️⃣ NAME + COUNTRY + PHONE
      // -----------------------------
      const username =
        TPIdentity.name ||
        TPIdentity.displayName ||
        "New User";

      const country = normalizeCountry(
        TPIdentity.country || "BZ"
      );

      const phone = normalizePhone(
        TPIdentity.phone || null,
        country
      );

      // -----------------------------
      // 4️⃣ REFRESH resendToken (NEW SCHEMA)
      // -----------------------------
      const resendToken = crypto.randomUUID();

      await userDoc.ref.set(
        { "TPIdentity.resendToken": resendToken },
        { merge: true }
      );

      // -----------------------------
      // 5️⃣ ENSURE STRIPE ACCOUNT
      // -----------------------------
      const result = await checkOrCreateStripeAccount(email, country);

      const stripeAccountID =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        result.stripeAccountID;

      if (!stripeAccountID) {
        return res.status(500).send("Missing Stripe account ID");
      }

      // -----------------------------
      // 6️⃣ CREATE FIREBASE TOKEN + HASH
      // -----------------------------

      await stripe.accounts.update(stripeAccountID, {
        metadata: { username: username }
      });

      // -----------------------------
      // 7️⃣ UPDATE USER (NEW SCHEMA)
      // -----------------------------
      await userDoc.ref.set(
        {
          TPIdentity: {
            ...TPIdentity,
            email,
            name: username,
            displayName: username,
            stripeAccountID,
            resendToken,
            country
          },

          TPSecurity: {
            ...TPSecurity,
            stripeAccountID
          },

          TPWallet: {
            ...TPWallet,
            payFrequency: result.payFrequency || "daily",
            payDay:
              result.payFrequency === "weekly"
                ? result.payDay || "monday"
                : null
          },

          TPNotifications: {
            ...TPNotifications,
            receiveMassEmails: true,
            emailPending: false
          }
        },
        { merge: true }
      );

     // -----------------------------
      // IMMORTAL‑v20 TOKEN
      // -----------------------------
      const token = generateToken();

      // -----------------------------
      // STRIPE ONBOARDING LINK
      // -----------------------------
      const onboardingLink = await stripe.accountLinks.create({
        account: stripeAccountID,
        refresh_url: "https://www.pulseworld.net/expire.html",
        return_url: `https://www.pulseworld.net/PulseWorldVaultSetupComplete?user=${encodeURIComponent(username)}`,
        type: "account_onboarding"
      });

      const getPaidLink = onboardingLink.url;

      // -----------------------------
      // RESEND LINK (PUBLIC-SAFE)
      // -----------------------------
      const reSendLink =
        "https://www.pulseworld.net/PulseWorldTrustLink?user=" +
        encodeURIComponent(name);
      // -----------------------------
      // 9️⃣ EMAIL LOG
      // -----------------------------
      const payload = {
        email,
        userID,
        stripeAccountID,
        resendToken,
        adminUser: "Automate",
        logId: null
      };

      const now = PulseRealm.PulseNOW;

      const ref = await db.collection("EmailLogs").add({
        date: now,
        to: email,
        type: "stripeOnboarding",
        payload,
        html: "",
        subject: "",
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "createOrGetStripeAccount",
        status: "Pending",
        emailType: "stripeOnboarding",
        name: username,
        createdAt: now
      });

      logId = ref.id;
      payload.logId = logId;

      const template = emailTemplates["stripeOnboarding"];
      if (!template) return res.status(500).send("Missing template");

      const templateContext = { ...payload, getPaidLink, reSendLink };
      const subject = template.subject(templateContext);
      const html = template.html(templateContext);

      await ref.set(
        {
          payload,
          html,
          subject,
          updatedAt: now
        },
        { merge: true }
      );

      await createEmailTransport.sendMail({
        from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
        to: email,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html
      });

      await ref.update({
        status: "Sent",
        sentAt: now
      });

      // -----------------------------
      // 1️⃣1️⃣ OPTIONAL SMS (NEW SCHEMA)
      // -----------------------------
      const receiveSMS = TPNotifications.receiveSMS ?? true;

      if (receiveSMS && phone) {
        await twilioClient.messages.create({
          to: phone,
          messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
          body: `Your Pulse World Payment Onboarding Link is Ready. Tap to Continue: ${getPaidLink}`
        });

        await userDoc.ref.set(
          {
            "TPNotifications.lastSMSSentAt": now
          },
          { merge: true }
        );
      }

      return res.status(200).send(getPaidLink);

    } catch (error) {
      console.error("❌ Stripe Onboarding Error:", error);

      const safeErrorMessage = String(
        error.message ||
          error.raw.message ||
          error.raw.error.message ||
          error.response.data.error ||
          error.toString() ||
          "Unknown error"
      )
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");

      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: PulseRealm.PulseNOW,
          error: safeErrorMessage
        });
      }

      return res.status(500).send(safeErrorMessage);
    }
  }
);
/* ===========================
   RECREATE AND GENERATE STRIPE ONBOARDING LINK
=========================== */
export const resendStripeLink = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    log("🔵 [resendStripeLink] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

    let logId = null;

    try {
      // Enforce HTTPS
      if (req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect("/error.html");
      }

      const stripe = Stripe(STRIPE_PASSWORD_VALUE);

      // Token must come from POST body
      const resendToken = req.body.token;
      if (!resendToken) {
        return res.redirect("/error.html");
      }

      // -----------------------------
      // LOOKUP USER BY NEW SCHEMA
      // -----------------------------
      let snap = await db
        .collection("Users")
        .where("TPIdentity.resendToken", "==", resendToken)
        .limit(1)
        .get();

      // Legacy fallback
      if (snap.empty) {
        snap = await db
          .collection("Users")
          .where("resendToken", "==", resendToken)
          .limit(1)
          .get();
      }

      if (snap.empty) {
        return res.redirect("/error.html");
      }

      const userDoc = snap.docs[0];
      const userData = userDoc.data() || {};
      const username = userDoc.displayName || userDoc.displayname || userDoc.DisplayName;

      const TPIdentity = userData.TPIdentity || {};
      const TPSecurity = userData.TPSecurity || {};
      const TPNotifications = userData.TPNotifications || {};
      const TPWallet = userData.TPWallet || {};

      const userID = userDoc.id;

      // -----------------------------
      // EMAIL + NAME (NEW SCHEMA)
      // -----------------------------
      const email = TPIdentity.email || null;
      if (!email) {
        return res.redirect("/error.html");
      }

      const name =
        TPIdentity.displayName ||
        TPIdentity.name ||
        "Friend";

      const country = normalizeCountry(TPIdentity.country || "BZ");

      // -----------------------------
      // STRIPE ACCOUNT ID
      // -----------------------------
      let stripeAccountID =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        null;

      if (!stripeAccountID) {
        const result = await checkOrCreateStripeAccount(email, country);
        stripeAccountID = result.stripeAccountID;
      }

      if (!stripeAccountID) {
        return res.redirect("/error.html");
      }

      // -----------------------------
      // REFRESH TOKEN (WRITE TO NEW SCHEMA)
      // -----------------------------
      await userDoc.ref.set(
        { "TPIdentity.resendToken": resendToken },
        { merge: true }
      );

      
      await stripe.accounts.update(stripeAccountID, {
        metadata: { username: username }
      });

      // -----------------------------
      // STRIPE ONBOARDING LINK
      // -----------------------------
      const onboardingLink = await stripe.accountLinks.create({
        account: stripeAccountID,
        refresh_url: "https://www.pulseworld.net/expire.html",
        return_url: `https://www.pulseworld.net/PulseWorldVaultSetupComplete?user=${encodeURIComponent(name)}`,
        type: "account_onboarding"
      });

    const getPaidLink = onboardingLink.url;

      // -----------------------------
      // RESEND LINK (NO TOKEN)
      // -----------------------------
      const reSendLink =
        "https://www.pulseworld.net/PulseWorldTrustLink?user=" +
        encodeURIComponent(username);

      // -----------------------------
      // EMAIL PAYLOAD
      // -----------------------------
      const payload = {
        email,
        userID,
        name,
        stripeAccountID,
        resendToken,
        adminUser: "Automate",
        logId: null
      };

      const now = PulseRealm.PulseNOW;

      const ref = await db.collection("EmailLogs").add({
        date: now,
        to: email,
        type: "resendStripeLink",
        payload,
        html: "",
        subject: "",
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "resendStripeLink",
        status: "Pending",
        emailType: "resendStripeLink",
        name,
        createdAt: now,
        updatedAt: now
      });

      logId = ref.id;
      payload.logId = logId;

      // -----------------------------
      // TEMPLATE
      // -----------------------------
      const template = emailTemplates["resendStripeLink"];
      if (!template) {
        return res.redirect("/error.html");
      }

      const subject = template.subject({ ...payload, getPaidLink, reSendLink });
      const html = template.html({ ...payload, getPaidLink, reSendLink });

      await ref.set(
        { payload, html, subject, updatedAt: now },
        { merge: true }
      );

      await createEmailTransport.sendMail({
        from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
        to: email,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html
      });

      await ref.update({
        status: "Sent",
        sentAt: now
      });

      // -----------------------------
      // SUCCESS REDIRECT
      // -----------------------------
      return res.redirect(
        "?impulse=PulseWorldTrustSuccess?user=" +
          encodeURIComponent(username)
      );

    } catch (error) {
      console.error("❌ Resend Stripe Link Error:", error);

      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: PulseRealm.PulseNOW,
          error: String(error)
        });
      }

      return res.redirect("/error.html");
    }
  }
);
/* ===========================
   SEND PAYOUT FUNCTION
=========================== */
export const sendPayout = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "1GiB"
  },
  async (req, res) => {
    log("🔵 [sendPayout] START");

    const STRIPE_PASSWORD_VALUE = STRIPE_PASSWORD.value();
    const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
    const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
    const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
    const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

    let logId = null;

    const num = (v) => {
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

    const clean = (v, fallback = null) => {
      if (v == null) return fallback;
      const s = String(v).trim();
      return s === "" ? fallback : s;
    };

    try {
      // CORS
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).send("");

      if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
      }

      const stripe = Stripe(STRIPE_PASSWORD_VALUE);
      const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);

      const source = req.method === "GET" ? req.query : req.body;
      const { orderID, email, emailType = "sendPayout" } = source;

      if (!orderID) {
        return res.status(400).json({ success: false, error: "Missing orderID" });
      }

      const delivererEmail = clean(email || source.delivererEmail, null);
      if (!delivererEmail) {
        return res.status(400).json({ success: false, error: "Missing deliverer email" });
      }

      const adminUser = "Automate";

      // ------------------------------------
      // 1️⃣ LOAD USER (NEW SCHEMA)
      // ------------------------------------
      let userSnap = await db
        .collection("Users")
        .where("TPIdentity.email", "==", delivererEmail.toLowerCase())
        .limit(1)
        .get();

      // Legacy fallback
      if (userSnap.empty) {
        userSnap = await db
          .collection("Users")
          .where("Email", "==", delivererEmail.toLowerCase())
          .limit(1)
          .get();
      }

      if (userSnap.empty) {
        return res.status(400).json({ success: false, error: "User not found for email" });
      }

      const userRef = userSnap.docs[0].ref;
      const userData = userSnap.docs[0].data() || {};

      const TPIdentity = userData.TPIdentity || {};
      const TPSecurity = userData.TPSecurity || {};
      const TPNotifications = userData.TPNotifications || {};
      const TPWallet = userData.TPWallet || {};

      const stripeAccountID =
        TPIdentity.stripeAccountID ||
        TPSecurity.stripeAccountID ||
        null;

      const name =
        TPIdentity.displayName ||
        TPIdentity.name ||
        "Friend";

      let phone = TPIdentity.phone || null;
      const country = normalizeCountry(TPIdentity.country || "BZ");
      phone = normalizePhone(phone, country);

      if (!stripeAccountID) {
        return res.status(400).json({
          success: false,
          error: "User has no Stripe account ID"
        });
      }

      // ------------------------------------
      // 2️⃣ LOAD ORDER
      // ------------------------------------
      const orderSnap = await db.collection("Orders").doc(orderID).get();
      if (!orderSnap.exists) {
        return res.status(400).json({ success: false, error: "Order not found" });
      }

      const orderData = orderSnap.data() || {};

      const payout = num(orderData.tip);
      let payoutAmount = num(orderData.displayAmount || orderData.payoutAmount || payout);

      const itemPrice = num(orderData.orderprice);
      const totalPrice = orderData.ordertotal ?? null;
      const tipAmount = orderData.ordertip ?? null;
      const taxAmount = orderData.ordertax ?? null;
      const shipping = orderData.ordershipping ?? null;

      if (!payoutAmount) {
        return res.status(400).json({
          success: false,
          error: "Order missing payoutAmount"
        });
      }

      if (orderData.paidDeliverer === true) {
        return res.status(200).json({ success: true, message: "Already paidDeliverer" });
      }

      // ------------------------------------
      // 3️⃣ DETERMINE CURRENCY + BALANCE
      // ------------------------------------
      const info = await determinePayoutCurrency(
        stripe,
        stripeAccountID,
        payoutAmount
      );

      let stripeBalances = await findUserStripeBalance(
        stripeAccountID,
        STRIPE_PASSWORD_VALUE
      );

      let pendingBalance = num(stripeBalances.pendingBalance);
      let availableBalance = num(stripeBalances.availableBalance);

      const {
        displayCurrency,
        transferCurrency,
        displayAmount,
        transferAmount
      } = info;

      // ------------------------------------
      // 4️⃣ RESERVE LOGIC
      // ------------------------------------
      const delivererReserve = Math.round(transferAmount * 0.05);
      const delivererPayout = Math.round(transferAmount * 0.95);

      // ------------------------------------
      // 5️⃣ STRIPE TRANSFER
      // ------------------------------------
      let transfer;
      try {
        transfer = await stripe.transfers.create({
          amount: delivererPayout * 100,
          currency: transferCurrency,
          destination: stripeAccountID,
          description: `Pulse World: Payout for Delivery ${orderID}`,
          metadata: {
            orderID,
            delivererEmail,
            delivererReserve
          }
        });

        await db.collection("Orders").doc(orderID).update({
          paidDeliverer: true,
          paidDelivererID: transfer.id,
          paidDelivererAt: PulseRealm.PulseNOW
        });
        const increment = (n = 1) => ({ integerIncrement: n });
        const arrayUnion = (value) => ({ arrayUnion: value });

        // ------------------------------------
        // 6️⃣ UPDATE WALLET (NEW SCHEMA)
        // ------------------------------------
       await userRef.update({
        "TPWallet.reserveBalance": increment(delivererReserve),
        "TPWallet.reserveHistory": arrayUnion({
          amount: delivererReserve,
          date: PulseRealm.PulseNOW,
          orderId: orderID,
          releaseDate: calculateReleaseDate(90),
          type: "reserve_add"
        })
      });


      } catch (err) {
        return res.status(200).json({
          success: false,
          message: "Transfer failed, no payout sent",
          error: err.message
        });
      }

      // Refresh balances
      stripeBalances = await findUserStripeBalance(
        stripeAccountID,
        STRIPE_PASSWORD_VALUE
      );

      pendingBalance = num(stripeBalances.pendingBalance);
      availableBalance = num(stripeBalances.availableBalance);

      // ------------------------------------
      // 7️⃣ EMAIL LOG
      // ------------------------------------
      const payload = {
        payoutAmount,
        name,
        itemPrice,
        totalPrice,
        tipAmount,
        taxAmount,
        shipping,
        stripeAccountID,
        displayCurrency,
        displayAmount,
        transferCurrency,
        pendingBalance,
        availableBalance,
        orderID,
        delivererEmail,
        adminUser,
        logId: null
      };

      const ref = await db.collection("EmailLogs").add({
        date: PulseRealm.PulseNOW,
        to: delivererEmail,
        type: "sendPayout",
        html: "",
        payload,
        adminUser: "Automate",
        triggeredBy: "Automate",
        triggerSource: "sendPayout",
        emailType: "sendPayout",
        name,
        timestamp: PulseRealm.PulseNOW,
        createdAt: PulseRealm.PulseNOW,
        status: "Pending"
      });

      logId = ref.id;
      payload.logId = logId;

      const template = emailTemplates["sendPayout"];
      if (!template) {
        return res.status(400).json({
          success: false,
          error: `Unknown emailType: sendPayout`
        });
      }

      const html = template.html(payload);
      const subject = template.subject(payload);

      const finalHeaders =
        template.headers ||
        (template.important
          ? {
              "X-Priority": "1",
              "X-MSMail-Priority": "High",
              Importance: "high"
            }
          : {});

      await db.collection("EmailLogs").doc(logId).set(
        {
          payload,
          html,
          subject,
          status: "Pending",
          updatedAt: PulseRealm.PulseNOW
        },
        { merge: true }
      );

      await createEmailTransport.sendMail({
        from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
        to: delivererEmail,
        bcc: "FordFamilyDelivery@gmail.com",
        subject,
        html,
        headers: finalHeaders
      });

      await db.collection("EmailLogs").doc(logId).update({
        status: "Sent",
        sentAt: PulseRealm.PulseNOW
      });

      // -----------------------------
      // SMS (NEW NOTIFICATIONS BUCKET)
      // -----------------------------
      const receiveSMS = TPNotifications.receiveSMS ?? true;

      if (!receiveSMS || !phone) {
        log("🚫 User has SMS Disabled or no phone:", {
          receiveSMS,
          phone
        });
      } else {
        await twilioClient.messages.create({
          to: phone,
          messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
          body: `Pulse World: Payout for Delivery ${orderID}`
        });

        await userRef.set(
          {
            "TPNotifications.lastSMSSentAt":
              PulseRealm.PulseNOW
          },
          { merge: true }
        );
      }

      return res.status(200).json({
        success: true,
        payoutID: transfer.id,
        message: "Payout sent successfully"
      });
    } catch (error) {
      console.error("❌ [sendPayout] ERROR:", error);
      if (logId) {
        await db.collection("EmailLogs").doc(logId).update({
          status: "Failed",
          failedAt: PulseRealm.PulseNOW,
          error: String(error)
        });
      }
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

async function sendAdminAlertEmail(subject, error, context = {}) {
  const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();
  try {
    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px;">
        
        <!-- Pulse World Logo -->
        <div style="text-align:center; margin-bottom:20px;">
          <img 
            src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" 
            alt="Pulse World Logo" 
            style="width:80px; height:auto;"
          />
        </div>

        <h2 style="color:#0a84ff; text-align:center;">🚨 Pulse World Backend Error</h2>

        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Error:</strong> ${error.message || error}</p>

        <hr>

        <h3>Payload</h3>
        <pre style="background:#f4f4f4; padding:10px; border-radius:6px;">
        ${JSON.stringify(context, null, 2)}
        </pre>

        <hr>

        <p style="color:#888; font-size:13px;">
          This is a Non‑Vital Automated Notice from the Vault Intelligence!
        </p>
      </div>
    `;

    await createEmailTransport.sendMail({
      from: `"Pulse World Alerts" <AIOvermind@PulseWorld.Net>`,
      to: "FordFamilyDelivery@gmail.com",
      subject: `🚨 ALERT: ${subject}`,
      html
    });

    log("📨 Admin alert sent");
  } catch (err) {
    console.error("❌ Failed to send admin alert:", err);
  }
}

/* ===========================
   EMAIL OPENED FUNCTION
=========================== */
export const emailOpened = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    const pixel = () => sendPixel(res);

    try {
      const raw = req.query.logId;
      const logId = raw ? String(raw).trim() : "";

      // 1️⃣ Validate logId
      if (!logId || logId === "undefined" || logId.length < 5) {
        log("Ignoring invalid logId:", raw);
        return pixel();
      }

      log("📩 Pixel fired for:", logId);

      const ref = db.collection("EmailLogs").doc(logId);
      const snap = await ref.get();

      // 2️⃣ Ensure log exists
      if (!snap.exists) {
        log("❌ Log not found:", logId);
        return pixel();
      }

      const data = snap.data() || {};
      const status = data.status || "Unknown";
      const uid = data.userID || null;
      const emailType = data.emailType || null;

      // 3️⃣ Skip invalid states
      if (status === "Failed") return pixel();
      if (status === "Pending") return pixel();
      if (status === "Opened") return pixel();

      const now = PulseRealm.PulseNOW;
      const increment = (n = 1) => ({ integerIncrement: n });
      // 4️⃣ Update EmailLogs (forensic)
      const emailLogUpdates = {
        openedAt: now,
        status: "Opened",
        firstOpenAt: data.firstOpenAt || now,
        openCount: increment(1)
      };

      await ref.update(emailLogUpdates);

      // 5️⃣ If we know the user, enrich their schema
      if (uid) {
        const userRef = db.collection("Users").doc(uid);
        const userSnap = await userRef.get();
        const userData = userSnap.data() || {};

        const TPNotifications = userData.TPNotifications || {};
        const TPLoyalty = userData.TPLoyalty || {};
        const TPWallet = userData.TPWallet || {};
        const TPSecurity = userData.TPSecurity || {};
        const TPIdentity = userData.TPIdentity || {};

        // -----------------------------
        // TPNotifications (communication)
        // -----------------------------
        const updatedTPNotifications = {
          ...TPNotifications,
          lastEmailOpenedAt: now,
          emailOpenCount: (TPNotifications.emailOpenCount || 0) + 1,
          emailPending: false,
          updatedAt: now
        };

        // -----------------------------
        // TPLoyalty (engagement)
        // -----------------------------
        const updatedTPLoyalty = {
          ...TPLoyalty,
          lastEngagement: now,
          engagementScore: (TPLoyalty.engagementScore || 0) + 1,
          updatedAt: now
        };

        // -----------------------------
        // TPWallet (economic engagement)
        // -----------------------------
        const updatedTPWallet = {
          ...TPWallet,
          lastEngagement: now,
          updatedAt: now
        };

        // -----------------------------
        // TPSecurity (auth recency)
        // -----------------------------
        const updatedTPSecurity = {
          ...TPSecurity,
          lastActive: now,
          updatedAt: now
        };

        // -----------------------------
        // TPIdentity (lifecycle recency)
        // -----------------------------
        const updatedTPIdentity = {
          ...TPIdentity,
          lastSeen: now,
          updatedAt: now
        };

        // -----------------------------
        // APPLY USER UPDATES
        // -----------------------------
        await userRef.set(
          {
            TPNotifications: updatedTPNotifications,
            TPLoyalty: updatedTPLoyalty,
            TPWallet: updatedTPWallet,
            TPSecurity: updatedTPSecurity,
            TPIdentity: updatedTPIdentity
          },
          { merge: true }
        );

        // -----------------------------
        // CHANGES LOG (global audit)
        // -----------------------------
        await db.collection("CHANGES").add({
          type: "emailOpened",
          uid,
          logId,
          emailType,
          openedAt: now,
          createdAt: now,
          source: "emailOpened"
        });

        // -----------------------------
        // IDENTITY HISTORY (forensic)
        // -----------------------------
        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("snapshots")
          .add({
            snapshotType: "emailOpened",
            logId,
            emailType,
            openedAt: now,
            createdAt: now,
            source: "emailOpened"
          });
      }

      log("✅ Updated Firebase → Opened:", logId);
      return pixel();

    } catch (err) {
      console.error("❌ emailOpened error:", err);
      return pixel();
    }
  }
);
/* ===========================
   DATABASE RECEIVER FUNCTION
=========================== */
export const DatabaseReceiver = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    try {
      // ---------------------------------------------------------
      // CORS
      // ---------------------------------------------------------
      res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

      if (req.method === "OPTIONS") {
        return res.status(204).send("");
      }

      if (req.method !== "POST") {
        return res.status(405).send("Method not allowed");
      }

      // ---------------------------------------------------------
      // 1️⃣ Parse incoming request
      // ---------------------------------------------------------
      const data = await parseIncomingRequest(req).catch((err) => {
        console.error("❌ parseIncomingRequest error:", err);
        return null;
      });

      if (!data) {
        return res.status(400).send("Invalid payload");
      }

      const type = data.payload.type || data.emailType || data.type;
      log("📨 DatabaseReceiver type:", type);
      log("Query params:", req.query);

      if (!type || typeof type !== "string") {
        return res.status(400).send("Missing type");
      }

      // ---------------------------------------------------------
      // 2️⃣ Routing table
      // ---------------------------------------------------------
      const handlers = {
        order: handleOrderGET,
        users: handleUserGET,
        bus: handleBusGET
      };

      const handler = handlers[type];

      if (!handler) {
        log("❌ Unknown type:", type);
        return res.status(400).send("Unknown type");
      }

      // ---------------------------------------------------------
      // 3️⃣ Execute handler
      // ---------------------------------------------------------
      try {
        await handler(req, data.payload);
      } catch (err) {
        console.error("❌ Handler execution error:", err);
        return res.status(500).send("Handler error");
      }

      return res.status(200).send("OK");

    } catch (err) {
      console.error("❌ DatabaseReceiver error:", err);
      return res.status(500).send("Internal error");
    }
  }
);

// ----------------------------------------------------------------------------------------------------
// MAIN EMAIL FUNCTION
// ----------------------------------------------------------------------------------------------------
export const sendDynamicEmail = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "1GiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      // ---------------------------------------------------------
      // ENV + INIT
      // ---------------------------------------------------------
      const stripeSecret = STRIPE_PASSWORD.value();
      const ACCOUNT_SID_VALUE = ACCOUNT_SID.value();
      const AUTH_TOKEN_VALUE = AUTH_TOKEN.value();
      const MESSAGING_SERVICE_SID_VALUE = MESSAGING_SERVICE_SID.value();
      const EMAIL_PASSWORD_VALUE = EMAIL_PASSWORD.value();

      log("🔵 [sendDynamicEmail] START");

      const stripe = Stripe(stripeSecret);
      const now = new Date();
      let logId = null;

      // ---------------------------------------------------------
      // HELPERS
      // ---------------------------------------------------------
      const num = (v) => {
        if (v == null) return 0;

        const decoded = decodeURIComponent(String(v));

        // Pipe-separated values like "54|54"
        if (decoded.includes("|")) {
          return decoded
            .split("|")
            .map((x) => Number(x) || 0)
            .reduce((a, b) => a + b, 0);
        }

        const n = Number(decoded);
        return isNaN(n) ? 0 : Number(n.toFixed(2));
      };

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

      const clean = (v, fallback, label = "") => {
        if (isGarbage(v)) {
          log(`⚠️ [CLEAN] Replacing garbage field '${label}' → '${fallback}'`);
          return fallback;
        }
        return String(v).trim();
      };

      try {
        // ---------------------------------------------------------
        // METHOD CHECK
        // ---------------------------------------------------------
        if (req.method !== "GET" && req.method !== "POST") {
          log("❌ [METHOD] Invalid method:", req.method);
          return res.status(405).json({ error: "Only GET and POST allowed" });
        }

        // ---------------------------------------------------------
        // 1️⃣ PARSE REQUEST
        // ---------------------------------------------------------
        log("🔹 [STEP] Parsing incoming request");

        let pulsePoints = null;
        let tip = null;
        let total = null;
        let price = null;
        let priceRaw = null;
        let tax = null;
        let shipping = null;
        let resendToken = null;
        let eventID = null;
        let busID = null;
        let orderID = null;
        let receiveMassEmails = true;
        let Role = null;
        let payDay = null;
        let payFrequency = null;
        let displayAmount = null;
        let stripeAccountID = null;
        let infoa = null;
        let stripeBalances = null;
        let pendingBalance = null;
        let availableBalance = null;
        let transferCurrency = null;
        let displayCurrency = null;

        let email, emailType, payload;

        try {
          ({ email, emailType, logId, payload } = await parseIncomingRequest(req));
        } catch (err) {
          console.error("❌ [PARSE ERROR]", err.message || err);
          return res.status(400).json({ success: false, error: err.message });
        }

        log("✅ [PARSED]", { email, emailType, logId, payload });

        // Normalize incoming values
        pulsePoints = payload.pulsePoints ?? null;
        tip = payload.tip ?? null;
        total = payload.ordertotal ?? null;
        priceRaw = payload.orderamount ?? payload.orderprice ?? null;
        price = num(priceRaw);
        tax = payload.ordertax ?? String((price * 0.125).toFixed(2));
        shipping = payload.shipping ?? null;
        eventID = payload.eventID ?? null;
        busID = payload.busID ?? null;

        // Auto-generate logId if missing
        if (!logId) {
          logId = db.collection("EmailLogs").doc().id;
          log("🆕 [AUTO LOG ID GENERATED]", logId);
        }

        // Validate required fields
        if (!email) {
          console.error("❌ [ERROR] Missing Email");
          return res.status(400).json({ success: false, error: "Missing Email" });
        }
        if (!emailType) {
          console.error("❌ [ERROR] Missing EmailType");
          return res.status(400).json({ success: false, error: "Missing EmailType" });
        }

        // Normalize email + emailType
        email = email.toLowerCase();
        emailType =
          String(emailType).charAt(0).toLowerCase() + String(emailType).slice(1);

        log("🔹 [NORMALIZED]", { email, emailType });

        // ---------------------------------------------------------
        // 2️⃣ USER LOOKUP (NEW SCHEMA FIRST)
        // ---------------------------------------------------------
        log("🔹 [STEP] Looking up user in Firestore");

        // NEW SCHEMA FIRST
        let snapshot = await db
          .collection("Users")
          .where("TPIdentity.email", "==", email)
          .limit(1)
          .get();

        // LEGACY FALLBACK
        if (snapshot.empty) {
          snapshot = await db
            .collection("Users")
            .where("Email", "==", email)
            .limit(1)
            .get();
        }

        if (snapshot.empty) {
          log("❌ [USER] User not found:", email);
          return res.status(404).json({ success: false, error: "User not found" });
        }

        const userID = snapshot.docs[0].id;
        const userData = snapshot.docs[0].data() || {};
        const userRef = snapshot.docs[0].ref;

        // Extract NEW SCHEMA buckets
        const TPIdentity = userData.TPIdentity || {};
        const TPSecurity = userData.TPSecurity || {};
        const TPNotifications = userData.TPNotifications || {};
        const TPWallet = userData.TPWallet || {};

        // ---------------------------------------------------------
        // NAME
        // ---------------------------------------------------------
        const username =
          TPIdentity.displayName ||
          TPIdentity.name ||
          "Friend";

        // ---------------------------------------------------------
        // EMAIL (already normalized)
        // ---------------------------------------------------------
        let userEmail = TPIdentity.email || email;

        // ---------------------------------------------------------
        // PHONE + COUNTRY
        // ---------------------------------------------------------
        let phone = TPIdentity.phone || null;
        let country = normalizeCountry(TPIdentity.country || "BZ");
        phone = normalizePhone(phone, country);

        // ---------------------------------------------------------
        // MASS EMAILS
        // ---------------------------------------------------------
        receiveMassEmails =
          TPNotifications.receiveMassEmails ??
          true;

        // ---------------------------------------------------------
        // RESEND TOKEN
        // ---------------------------------------------------------
        resendToken =
          TPIdentity.resendToken ||
          null;

        // ---------------------------------------------------------
        // STRIPE ACCOUNT ID
        // ---------------------------------------------------------
        stripeAccountID =
          TPIdentity.stripeAccountID ||
          TPSecurity.stripeAccountID ||
          null;

        // ---------------------------------------------------------
        // PAYDAY + PAYFREQUENCY
        // ---------------------------------------------------------
        payFrequency =
          TPWallet.payFrequency ||
          null;

        payDay =
          TPWallet.payDay ||
          null;

        log("✅ [USER FOUND]", {
          userID,
          username,
          country,
          receiveMassEmails,
          stripeAccountID,
          payFrequency,
          payDay
        });

        // ---------------------------------------------------------
        // 3️⃣ STRIPE ACCOUNT CHECK (NEW SCHEMA)
        // ---------------------------------------------------------
        log("🔹 [STEP] Stripe account check");

        stripeAccountID =
          TPIdentity.stripeAccountID ||
          TPSecurity.stripeAccountID ||
          stripeAccountID ||
          null;

        if (!stripeAccountID) {
          const result = await checkOrCreateStripeAccount(email, country || "BZ");

          stripeAccountID = result.stripeAccountID;
          payload.stripeAccountID = stripeAccountID;

          Role = result.role || "Deliverer";
          payload.Role = Role;

          payFrequency =
            TPWallet.payFrequency ||
            result.payFrequency ||
            "daily";
        payload.payFrequency = payFrequency;

        payDay =
          TPWallet.payDay ||
          (payFrequency === "weekly"
            ? result.payDay || "monday"
            : null);

        payload.payDay = payDay;
        }

        if (!stripeAccountID) {
          console.error("❌ [STRIPE] stripeAccountID missing after attempts");
          return res.status(400).json({
            success: false,
            error: "Stripe Account Missing after Trials!",
            details: "stripeAccountID is required!"
          });
        }

        /* ---------------------------------------------------------
          4️⃣ EVENT EMAIL TYPE — NEW SCHEMA SAFE
        --------------------------------------------------------- */
        if (emailType === "newEvent") {
          eventID = eventID || payload.eventID;

          if (!eventID) {
            log("❌ [EVENT] No eventID provided");
            return res.status(400).json({ success: false, error: "Missing eventID" });
          }

          const eventDoc = await db
            .collection("Events")
            .doc(eventID)
            .get();

          if (!eventDoc.exists) {
            log("❌ [EVENT] Event not found:", eventID);
            return res.status(404).json({ success: false, error: "Event not found" });
          }

          const ev = eventDoc.data();

          const normalized = {
            title: BECLEAN(ev.title) ?? BECLEAN(ev.Title) ?? "",
            summary: BECLEAN(ev.summary) ?? BECLEAN(ev.Summary) ?? "",
            description: BECLEAN(ev.description) ?? BECLEAN(ev.Description) ?? "",
            Fromdate: safeDate(ev.fromDate) ?? safeDate(ev.Fromdate) ?? "",
            Todate: safeDate(ev.toDate) ?? safeDate(ev.Todate) ?? "",
            Fromtime: ev.fromTime ?? ev.Fromtime ?? "",
            Totime: ev.toTime ?? ev.Totime ?? "",
            Venue:
              BECLEAN(ev.venue) ??
              BECLEAN(ev.Venue) ??
              BECLEAN(ev.resolvedName) ??
              "",
            Url: ev.mainImage ?? ev.images[0] ?? ev.Url ?? ev.URL ?? "",
            Category: ev.category ?? ev.Category ?? "",
            Price: ev.price ?? ev.Price ?? ""
          };

          payload.title = BECLEAN(normalized.title, "");
          payload.summary = BECLEAN(normalized.summary, "");
          payload.description = BECLEAN(normalized.description, "");
          payload.Fromdate = safeDate(normalized.Fromdate);
          payload.Todate = safeDate(normalized.Todate);
          payload.Fromtime = clean(normalized.Fromtime, "", "Fromtime");
          payload.Totime = clean(normalized.Totime, "", "Totime");
          payload.Venue = BECLEAN(normalized.Venue, "");
          payload.Url = clean(normalized.Url, "", "Url");
          payload.Category = clean(normalized.Category, "", "Category");
          payload.Price = clean(normalized.Price, "", "Price");
          payload.eventID = eventID;
        }

        payload.userID = userID;

        /* ---------------------------------------------------------
          5️⃣ BUSINESS EMAIL TYPE — NEW SCHEMA SAFE
        --------------------------------------------------------- */
        if (emailType === "newBusiness") {
          busID = busID || payload.busID;

          if (!busID) {
            log("❌ [BUSINESS] No busID provided");
            return res.status(400).json({ success: false, error: "Missing busID" });
          }

          const busDoc = await db
            .collection("Businesses")
            .doc(busID)
            .get();

          if (!busDoc.exists) {
            log("❌ [BUSINESS] Business not found:", busID);
            return res.status(404).json({ success: false, error: "Business not found" });
          }

          const bus = busDoc.data();

          const normalized = {
            busname: BECLEAN(bus.busname) ?? BECLEAN(bus.Busname) ?? "",
            summary: BECLEAN(bus.summary) ?? BECLEAN(bus.Summary) ?? "",
            description: BECLEAN(bus.description) ?? BECLEAN(bus.Description) ?? "",
            location:
              BECLEAN(bus.address) ??
              BECLEAN(bus.location) ??
              BECLEAN(bus.Location) ??
              "",
            busemail: bus.emails[0] ?? bus.busemail ?? bus.Busemail ?? "",
            useremail: bus.useremail ?? bus.Useremail ?? "",
            date: bus.date ?? bus.Date ?? null
          };

          let isoDate = new Date().toISOString();
          if (normalized.date) {
            isoDate = normalized.date.toDate().toISOString();
          } else if (normalized.date instanceof Date) {
            isoDate = normalized.date.toISOString();
          } else if (typeof normalized.date === "string") {
            const parsed = new Date(normalized.date);
            if (!isNaN(parsed.getTime())) isoDate = parsed.toISOString();
          }

          payload.busname = BECLEAN(normalized.busname, "");
          payload.summary = BECLEAN(normalized.summary, "");
          payload.description = BECLEAN(normalized.description, "");
          payload.location = BECLEAN(normalized.location, "");
          payload.busemail = BECLEAN(normalized.busemail, "");
          payload.useremail = BECLEAN(normalized.useremail, "");
          payload.date = isoDate;
        }

        await stripe.accounts.update(stripeAccountID, {
          metadata: { username: username }
        });

      // -----------------------------
      // STRIPE ONBOARDING LINK
      // -----------------------------
      const onboardingLink = await stripe.accountLinks.create({
        account: stripeAccountID,
        refresh_url: "https://www.pulseworld.net/expire.html",
        return_url: `https://www.pulseworld.net/PulseWorldVaultSetupComplete?user=${encodeURIComponent(username)}`,
        type: "account_onboarding"
      });

        /* ---------------------------------------------------------
          8️⃣ RESEND STRIPE LINK — NEW SCHEMA
        --------------------------------------------------------- */
        if (emailType === "stripeOnboarding" || emailType === "resendStripeLink") {
          const newToken = crypto.randomUUID();

          await db
            .collection("Users")
            .doc(userID)
            .set(
              { "identity.resendToken": newToken },
              { merge: true }
            );

          payload.getPaidLink = onboardingLink.url;
          payload.reSendLink =
            `https://www.pulseworld.net/PulseWorldTrustLink?user=${encodeURIComponent(username)}`;
        }

        /* ---------------------------------------------------------
          9️⃣ PAYOUT EMAIL TYPES — NEW SCHEMA
        --------------------------------------------------------- */
        if (
          emailType === "sendPayout" ||
          emailType === "pulsePointRedemption" ||
          emailType === "pulsePointsGifted"
        ) {
          stripeBalances = await findUserStripeBalance(stripeAccountID, stripeSecret);

          pendingBalance = num(stripeBalances.pendingBalance);
          availableBalance = num(stripeBalances.availableBalance);

          if (pulsePoints !== null) {
            payload.points = payload.points ?? pulsePoints ?? 0;
          }
        }

        /* ---------------------------------------------------------
          🔟 SEND PAYOUT — ORDER NORMALIZATION
        --------------------------------------------------------- */
        if (emailType === "pulsePointsGifted" || emailType === "sendPayout") {
          const orderTotal =
            Number(payload.ordertotal ?? payload.totalPrice ?? total) || 0;

          const orderTax =
            Number(payload.ordertax ?? payload.taxAmount ?? tax) || 0;

          const orderTip =
            Number(payload.ordertip ?? payload.tipAmount ?? tip) || 0;

          displayAmount = payload.displayAmount || orderTip;

          const orderPriceRaw =
            payload.orderamount ?? payload.itemPrice ?? price;

          const orderPrice = num(orderPriceRaw);

          orderID = payload.orderID;

          const orderShipping =
            Number(payload.shipping ?? payload.ordershipping ?? shipping) || 0;

          payload.payoutAmount = displayAmount;
          payload.totalPrice = orderTotal;
          payload.itemPrice = orderPrice;
          payload.taxAmount = orderTax;
          payload.tipAmount = orderTip;
          payload.shipping = orderShipping;
          payload.points = payload.points ?? orderPrice ?? pulsePoints ?? 0;
        }

        /* ---------------------------------------------------------
          1️⃣1️⃣ SEND PAYOUT — ORDER CHECK
        --------------------------------------------------------- */
        if (emailType === "sendPayout") {
          const orderSnap = await db
            .collection("Orders")
            .doc(orderID)
            .get();

          if (!orderSnap.exists) {
            log("❌ [ORDER] Order not found:", orderID);
            return res.status(404).json({ success: false, error: "Order not found" });
          }

          const orderData = orderSnap.data();

          if (orderData.paidDeliverer === true) {
            log("❌ [ORDER] Already paidDeliverer:", orderID);
            return res.status(400).json({
              success: true,
              details: "Order already paidDeliverer"
            });
          }

          // Determine payout currency + amounts
          infoa = await determinePayoutCurrency(
            stripe,
            stripeAccountID,
            payload.payoutAmount
          );

          displayCurrency = infoa.displayCurrency;
          transferCurrency = infoa.transferCurrency;
          displayAmount = infoa.displayAmount;

          // Stripe transfer
          const transfer = await stripe.transfers.create({
            amount: Math.round(infoa.transferAmount * 100),
            currency: transferCurrency,
            destination: stripeAccountID,
            description: `Pulse World: Payout for Delivery ${orderID}`,
            metadata: {
              orderID,
              delivererEmail: email,
              userID,
              payoutAmount: payload.payoutAmount
            }
          });

          // Mark order as paid
          await db
            .collection("Orders")
            .doc(orderID)
            .update({
              paidDeliverer: true,
              paidDelivererID: transfer.id,
              paidDelivererAt: PulseRealm.PulseNOW
            });

          // Refresh balances (NEW SCHEMA SAFE)
          stripeBalances = await findUserStripeBalance(
            stripeAccountID,
            stripeSecret
          );

          pendingBalance = num(stripeBalances.pendingBalance);
          availableBalance = num(stripeBalances.availableBalance);

          payload.displayCurrency = displayCurrency;
          payload.transferCurrency = transferCurrency;
          payload.displayAmount = displayAmount;


          log("✅ [PAYOUT SENT]", {
            orderID,
            transferId: transfer.id,
            displayCurrency,
            transferCurrency,
            displayAmount,
            pendingBalance,
            availableBalance
          });
        }

          /* ---------------------------------------------------------
            5️⃣ PULSE POINT REDEMPTION
          --------------------------------------------------------- */
          if (emailType === "pulsePointRedemption") {
            payload.displayCurrency = infoa.displayCurrency;
            payload.displayAmount = infoa.displayAmount;
            log("✅ [PULSE REDEMPTION CURRENCY SET]");
          }

          /* ---------------------------------------------------------
            6️⃣ UNSUBSCRIBE URL — NEW SCHEMA
          --------------------------------------------------------- */
          if (receiveMassEmails !== false) {
            payload.unsubscribeUrl = resendToken
              ? `https://www.pulseworld.net/unsubscribe?token=${encodeURIComponent(
                  resendToken
                )}`
              : `https://www.pulseworld.net/unsubscribe`;
          }

          /* ---------------------------------------------------------
            7️⃣ LOYALTY POINT UPDATE — NEW SCHEMA
          --------------------------------------------------------- */
          payload.points = payload.points ?? price ?? pulsePoints ?? 0;

          if (emailType === "pulsePointsGifted") {
            const parsePoints = (v) =>
              Number.isFinite(Number(v)) ? Number(v) : 0;

            const safeTotalPoints = parsePoints(userData.Wallet.pulsepoints);
            const safePulsePoints = parsePoints(payload.points);

            await grantPulsePoints(userID, safePulsePoints, "order_payment");

            log("🔹 [LOYALTY] Current:", safeTotalPoints, "Gifted:", safePulsePoints);
          }

          // Clean display fields
          payload.name = BECLEAN(username) ?? null;
          payload.username = BECLEAN(username) ?? null;

          /* ---------------------------------------------------------
            8️⃣ FINALIZE PAYLOAD
          --------------------------------------------------------- */
          payload.email = email;
          payload.pendingBalance = pendingBalance;
          payload.availableBalance = availableBalance;

          if (payload.phone) payload.phone = normalizePhone(payload.phone, country);
          if (payload.userphone) payload.userphone = normalizePhone(payload.userphone, country);
          if (payload.phonenumber) payload.phonenumber = normalizePhone(payload.phonenumber, country);

          const finalPayload = JSON.parse(JSON.stringify(payload));
          log("🟣 [FINAL PAYLOAD]", finalPayload);

          /* ---------------------------------------------------------
            9️⃣ GENERATE HTML / SUBJECT
          --------------------------------------------------------- */
          const template = emailTemplates[emailType];
          if (!template) {
            console.error("❌ [TEMPLATE] Unknown emailType:", emailType);
            return res.status(400).json({
              success: false,
              error: `Unknown emailType: ${emailType}`
            });
          }

          const subjectA =
            typeof template.subject === "function"
              ? template.subject(finalPayload)
              : template.subject;

          const finalHtml = template.html({ ...payload, resendToken });

          const finalHeaders =
            template.headers ||
            (template.important
              ? {
                  "X-Priority": "1",
                  "X-MSMail-Priority": "High",
                  Importance: "high"
                }
              : {});

          log("✅ [EMAIL READY]", { emailType, subjectA });

          /* ---------------------------------------------------------
            🔟 WRITE LOG — NEW SCHEMA
          --------------------------------------------------------- */
          await db
            .collection("EmailLogs")
            .doc(logId)
            .set(
              {
                payload: finalPayload,
                html: finalHtml,
                subject: subjectA,
                status: "Pending",
                updatedAt: PulseRealm.PulseNOW
              },
              { merge: true }
            );

          log("✅ [EMAIL LOGGED] Pending:", logId);

          const info = await createEmailTransport.sendMail({
            from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
            to: email,
            bcc: "FordFamilyDelivery@gmail.com",
            subject: subjectA,
            html: finalHtml,
            headers: finalHeaders
          });

          log("✅ [EMAIL SENT]", { messageId: info.messageId, to: email });

          /* ---------------------------------------------------------
            1️⃣2️⃣ UPDATE EMAIL LOG STATUS
          --------------------------------------------------------- */
          await db
            .collection("EmailLogs")
            .doc(logId)
            .update({
              status: "Sent",
              sentAt: PulseRealm.PulseNOW
            });

          /* ---------------------------------------------------------
            1️⃣3️⃣ OPTIONAL SMS — NEW SCHEMA
          --------------------------------------------------------- */
          if (TPNotifications.receiveSMS === false) {
            log("🚫 User has SMS Disabled:", email);
          } else {
            const twilioClient = twilio(ACCOUNT_SID_VALUE, AUTH_TOKEN_VALUE);

            await twilioClient.messages.create({
              to: phone,
              messagingServiceSid: MESSAGING_SERVICE_SID_VALUE,
              body: subjectA
            });

            await userRef.update({
              "TPNotifications.lastSMSSentAt": PulseRealm.PulseNOW
            });
          }

          log("✅ [EMAIL LOG UPDATED] Sent:", logId);
          log("🔵 [sendDynamicEmail] END (success)");

          return res.json({
            success: true,
            logId,
            email,
            emailType
          });

      } catch (err) {
        console.error("❌ [sendDynamicEmail ERROR]", err.message);

        const safeError =
          err.message ||
          err.raw.message ||
          err.raw.error.message ||
          err.response.data.error ||
          err.toString() ||
          "Unknown error";

        const safeErrorMessage = String(safeError)
          .replace(/'/g, "&#39;")
          .replace(/"/g, "&quot;");

        if (logId) {
          try {
            await db
              .collection("EmailLogs")
              .doc(logId)
              .update({
                status: "Failed",
                "payload.error": safeErrorMessage,
                failedAt: PulseRealm.PulseNOW
              });
            log("⚠️ [EMAIL LOG UPDATED] Failed:", logId);
          } catch (logErr) {
            console.error("❌ [LOG UPDATE ERROR]", logErr);
          }
        }

        log("🔵 [sendDynamicEmail] END (failure)");

        return res.status(500).json({
          success: false,
          error: "Email failed",
          details: safeErrorMessage
        });
      }
    });
  }
);

// -------------------------------------------------------
// CHECK EVENT VENUE
// -------------------------------------------------------
export const resolveVenue = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 45,
    memory: "256MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const mapsKey = PulseRealm.GOOGLE_MAPS_KEY;
        if (!mapsKey) {
          return res.status(500).json({ status: "error", message: "Missing API key" });
        }

        const q = (req.query.q || "").trim();
        if (!q) {
          return res.status(400).json({ status: "error", message: "Missing q parameter" });
        }

        // --- USE PLACES TEXT SEARCH (business-first) ---
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(q)}&key=${mapsKey}`;
        const data = await fetch(url).then(r => r.json());

        if (!data.results || data.results.length === 0) {
          return res.json({ status: "no_match" });
        }

        const result = data.results[0];

        const lat = result.geometry.location.lat;
        const lng = result.geometry.location.lng;
        const placeId = result.place_id;

        // Build static map URL (same as generateMap)
        const staticMap = buildStaticMapUrl(lat, lng, placeId, mapsKey, result.name || "");

        return res.json({
          status: "ok",
          name: result.name,                     // Crocs Sunset Sports Bar
          address: result.formatted_address,     // Beachfront, San Pedro, Belize
          lat,
          lng,
          placeId,
          staticMap
        });

      } catch (err) {
        console.error("resolveVenue failed:", err);
        return res.status(500).json({ status: "error" });
      }
    });
  }
);

// -------------------------------------------------------
// EXPORT FUNCTION
// -------------------------------------------------------
// export const generateMap = onRequest(
//   { 
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   (req, res) => {
//     corsHandler(req, res, async () => {
//       try {
//         const mapsKey = PulseRealm.GOOGLE_MAPS_KEY;

//         if (!mapsKey) {
//           return res.status(500).json({
//             success: false,
//             error: "Missing mapsKey env var"
//           });
//         }

//         const venue = (req.query.venue || "").trim();
//         const eventID = req.query.eventID || null;

//         if (!venue) {
//           return res.status(400).json({
//             success: false,
//             error: "Missing venue parameter"
//           });
//         }

//         log("RAW VENUE:", req.query.venue);
//         log("TRIMMED VENUE:", venue);

//         // ---------------------------------------------
//         // GEOCODE
//         // ---------------------------------------------
//         const result = await fuzzyGeocode(venue, mapsKey);

//         if (!result || !result.geometry || !result.geometry.location) {
//           return res.status(404).json({
//             success: false,
//             error: "Could not resolve venue"
//           });
//         }

//         const placeId = result.place_id;
//         const loc = result.geometry.location;
//         const lat = loc.lat;
//         const lng = loc.lng;

//         // ---------------------------------------------
//         // STATIC MAP GENERATION
//         // ---------------------------------------------
//         const staticMapUrl = buildStaticMapUrl(lat, lng, placeId, mapsKey);

//         const imgRes = await fetch(staticMapUrl);
//         const buffer = await imgRes.buffer();

//         const ts = PulseRealm.PulseNOW.toMillis();
//         const filePath = `maps/${ts}_${lat}_${lng}`;
//         const file = storage.file(filePath);

//         await file.save(buffer, {
//           contentType: "image/png",
//           public: true,
//           metadata: {
//             cacheControl: "no-cache, no-store, must-revalidate"
//           }
//         });

//         const publicUrl = `https://storage.googleapis.com/${storage.name}/${filePath}`;

//         // ---------------------------------------------
//         // BUILD MAP LINKS
//         // ---------------------------------------------
//         const mapsAppUrl = `comgooglemaps://?q=${encodeURIComponent(venue)}`;

//         let mapsWebUrl = null;

//         // Prefer text search
//         if (venue && venue.length > 0) {
//           mapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
//         }

//         // Fallback to lat/lng
//         if (!mapsWebUrl) {
//           mapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
//         }

//         // ---------------------------------------------
//         // VALIDATION BEFORE SAVING
//         // ---------------------------------------------
//         const isValidMap =
//           result &&
//           result.geometry &&
//           result.geometry.location &&
//           typeof lat === "number" &&
//           typeof lng === "number" &&
//           publicUrl &&
//           mapsWebUrl &&
//           buffer &&
//           buffer.length > 0;

//         // ---------------------------------------------
//         // SAFE WRITE: ONLY SAVE IF VALID
//         // ---------------------------------------------
//         if (isValidMap && eventID) {
//           await db.collection("Events").doc(eventID).set({
//             mapImageUrl: publicUrl,
//             mapsWebUrl,
//             lat,
//             lng,
//             placeId,
//             resolvedAddress: result.formatted_address,
//             updatedAt: PulseRealm.PulseNOW
//           }, { merge: true });
//         }

//         // ---------------------------------------------
//         // RETURN RESPONSE
//         // ---------------------------------------------
//         return res.json({
//           success: true,
//           mapImageUrl: publicUrl,
//           mapsAppUrl,
//           mapsWebUrl,
//           resolvedAddress: result.formatted_address,
//           lat,
//           lng,
//           placeId,
//           savedToEvent: Boolean(isValidMap && eventID)
//         });

//       } catch (err) {
//         console.error("Map generation failed:", err);
//         return res.status(500).json({
//           success: false,
//           error: "Map generation failed"
//         });
//       }
//     });
//   }
// );

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
const MAP_DB_NAME = "PulseMapsDB";
const MAP_STORE   = "maps";

let mapDbPromise = null;

function openMapDB() {
  if (mapDbPromise) return mapDbPromise;

  mapDbPromise = new Promise((resolve) => {
    const req = indexedDB.open(MAP_DB_NAME, 1);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(MAP_STORE)) {
        db.createObjectStore(MAP_STORE, { keyPath: "key" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror  = () => resolve(null);
  });

  return mapDbPromise;
}

async function mapDbPut(key, base64) {
  const db = await  openMapDB();
  if (!db) return false;

  return await new Promise((resolve) => {
    const tx = db.transaction(MAP_STORE, "readwrite");
    tx.objectStore(MAP_STORE).put({ key, base64 });
    tx.oncomplete = () => resolve(true);
    tx.onerror    = () => resolve(false);
  });
}

async function mapDbGet(key) {
  const db = await  openMapDB();
  if (!db) return null;

  return await new Promise((resolve) => {
    const tx = db.transaction(MAP_STORE, "readonly");
    const req = tx.objectStore(MAP_STORE).get(key);

    req.onsuccess = () => resolve(req.result.base64 || null);
    req.onerror   = () => resolve(null);
  });
}
export const generateMap = async (req, res) => {
  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const mapsKey = PulseRealm.GOOGLE_MAPS_KEY;
    if (!mapsKey) {
      return res.status(500).json({ success: false, error: "Missing mapsKey env var" });
    }

    const venue = (req.query.venue || "").trim();
    const eventID = req.query.eventID || null;
    const businessID = req.query.businessID || null;

    if (!venue) {
      return res.status(400).json({ success: false, error: "Missing venue parameter" });
    }

    // -------------------------------------------------------
    // TARGET DOC + LOCAL FILE KEY
    // -------------------------------------------------------
    let targetRef = null;
    let fileKey = null;

    if (businessID) {
      targetRef = db.collection("Businesses").doc(businessID);
      fileKey = `TPMap:business_${businessID}`;
    } else if (eventID) {
      targetRef = db.collection("Events").doc(eventID);
      fileKey = `TPMap:event_${eventID}`;
    } else {
      return res.status(400).json({ success: false, error: "Missing businessID or eventID" });
    }

    // -------------------------------------------------------
    // LOAD EXISTING TPMap FROM FIRESTORE
    // -------------------------------------------------------
    const snap = await targetRef.get();
    const data = snap.exists ? snap.data() : {};
    const TPMap = data.TPMap || {};

    // -------------------------------------------------------
    // CHECK INDEXEDDB CACHE FIRST
    // -------------------------------------------------------
    const cachedBase64 = await mapDbGet(fileKey);

    if (cachedBase64 && TPMap.status === "ready") {
      const blob = base64ToBlob(cachedBase64, "image/png");
      const localUrl = URL.createObjectURL(blob);

      return res.json({
        success: true,
        ...TPMap,
        imageUrl: localUrl,
        cached: true,
        savedTo: businessID ? "business" : "event"
      });
    }

    // If generating, return pending
    if (TPMap.status === "generating") {
      return res.json({
        success: true,
        pending: true,
        imageUrl: TPMap.imageUrl || null
      });
    }

    // -------------------------------------------------------
    // SET LOCK
    // -------------------------------------------------------
    await targetRef.update({
      TPMap: {
        status: "generating",
        updatedAt: PulseRealm.PulseNOW
      }
    });

    // -------------------------------------------------------
    // GEOCODE
    // -------------------------------------------------------
    const result = await fuzzyGeocode(venue, mapsKey, TPMap.lat, TPMap.lng);

    if (!result || !result.geometry.location) {
      await targetRef.update({ TPMap: { status: "error" } });
      return res.status(404).json({ success: false, error: "Could not resolve venue" });
    }

    const placeId = result.place_id || null;
    const lat = result.geometry.location.lat;
    const lng = result.geometry.location.lng;

    // -------------------------------------------------------
    // STATIC MAP
    // -------------------------------------------------------
    const staticMapUrl = buildStaticMapUrl(lat, lng, placeId, mapsKey, venue);
    const imgRes = await fetch(staticMapUrl);
    const finalBuffer = Buffer.from(await imgRes.arrayBuffer());

    // -------------------------------------------------------
    // STORE MAP LOCALLY (IndexedDB)
    // -------------------------------------------------------
    const base64 = finalBuffer.toString("base64");
    await mapDbPut(fileKey, base64);

    const blob = base64ToBlob(base64, "image/png");
    const localUrl = URL.createObjectURL(blob);

    // -------------------------------------------------------
    // MAP LINKS
    // -------------------------------------------------------
    let mapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

    if (placeId && await validatePlaceId(placeId, mapsKey)) {
      mapsWebUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    }

    // -------------------------------------------------------
    // SAVE NEW SCHEMA METADATA
    // -------------------------------------------------------
    const TPMapUpdate = {
      status: "ready",
      imageUrl: localUrl,
      mapsWebUrl,
      lat,
      lng,
      placeId,
      resolvedAddress: result.formatted_address,
      resolvedName: result.displayName || venue,
      updatedAt: PulseRealm.PulseNOW
    };

    await targetRef.update({ TPMap: TPMapUpdate });

    return res.json({
      success: true,
      ...TPMapUpdate,
      savedTo: businessID ? "business" : "event"
    });

  } catch (err) {
    console.error("Map generation failed:", err);
    return res.status(500).json({ success: false, error: "Map generation failed" });
  }
};


// -------------------------------------------------------
// HELPERS
// -------------------------------------------------------
function base64ToBlob(base64, type) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type });
}


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

export const sendPin = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const emailPassword = EMAIL_PASSWORD.value();
        const { email, purpose = "login", uid } = req.body || {};

        if (req.method !== "POST") {
          return res.status(405).json({ success: false, error: "Method not allowed" });
        }

        if (!email || typeof email !== "string" || !email.includes("@")) {
          return res.status(400).json({ success: false, error: "Invalid email" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        let userID = null;
        let userData = null;

        // ---------------------------------------------------------
        // LOGIN FLOW — TPIdentity ONLY
        // ---------------------------------------------------------
        if (purpose === "login") {
          const snap = await db
            .collection("Users")
            .where("TPIdentity.email", "==", normalizedEmail)
            .limit(1)
            .get();

          if (snap.empty) {
            return res.status(404).json({
              success: false,
              error: "No account found for this email."
            });
          }

          const doc = snap.docs[0];
          userID = doc.id;
          userData = doc.data() || {};
        }

        // ---------------------------------------------------------
        // EMAIL CHANGE FLOW — TPIdentity ONLY
        // ---------------------------------------------------------
        if (purpose === "emailChange") {
          if (!uid) {
            return res.status(400).json({
              success: false,
              error: "Missing uid for email change."
            });
          }

          // Prevent duplicate email
          const existing = await db
            .collection("Users")
            .where("TPIdentity.email", "==", normalizedEmail)
            .limit(1)
            .get();

          if (!existing.empty) {
            return res.status(400).json({
              success: false,
              error: "This email is already used by another account."
            });
          }

          const currentUser = await db.collection("Users").doc(uid).get();
          if (!currentUser.exists) {
            return res.status(404).json({
              success: false,
              error: "User not found."
            });
          }

          userID = uid;
          userData = currentUser.data() || {};
        }

        // ---------------------------------------------------------
        // RATE LIMIT + PIN GENERATION
        // ---------------------------------------------------------
        const pinRef = db.collection("Users").doc(userID);
        const pinSnap = await pinRef.get();
        const pinRecord = pinSnap.data() || {};

        const now = PulseRealm.PulseNOW.toMillis();
        const security = pinRecord.TPSecurity || {};
        const history = Array.isArray(security.requestHistory)
          ? security.requestHistory
          : [];

        const filtered = history.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

        if (filtered.length >= MAX_REQUESTS_PER_WINDOW) {
          return res.status(429).json({
            success: false,
            error: "Too many PIN requests. Try again later.",
            retryAfter: RATE_LIMIT_WINDOW_MS - (now - filtered[0])
          });
        }

        filtered.push(now);

        await pinRef.set(
          {
            TPSecurity: {
              requestHistory: filtered
            }
          },
          { merge: true }
        );

        const pin = String(Math.floor(100000 + Math.random() * 900000));
        const expiresAt = now + PIN_TTL_MS;

        await pinRef.set(
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
        );

        // ---------------------------------------------------------
        // PAYLOAD — TPIdentity ONLY
        // ---------------------------------------------------------
        const TPIdentity = userData.TPIdentity || {};

        const payload = {
          normalizedEmail,
          pin,
          purpose,
          userID,
          expiresAt,
          name: TPIdentity.name || TPIdentity.displayName || "Friend",
          stripeAccountID: TPIdentity.stripeAccountID || null,
          logId: null
        };

        // ---------------------------------------------------------
        // SEND EMAIL
        // ---------------------------------------------------------
        const result = await sendPinEmail(
          normalizedEmail,
          pin,
          payload,
          emailPassword
        );

        if (!result.success) {
          await db.collection("CHANGES").add({
            type: "pinSendFailed",
            uid: userID,
            pin,
            reason: "pin_send_failed",
            actor: "user",
            source: "sendPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({
              snapshotType: "pinSendFailed",
              pin,
              reason: "pin_send_failed",
              actor: "user",
              source: "sendPin",
              createdAt: PulseRealm.PulseNOW
            });

          return res.status(500).json({
            success: false,
            error: "Failed to send PIN email"
          });
        }

        // ---------------------------------------------------------
        // LOG SUCCESS
        // ---------------------------------------------------------
        await db.collection("CHANGES").add({
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

        await db
          .collection("IdentityHistory")
          .doc(userID)
          .collection("snapshots")
          .add({
            snapshotType: "pinSent",
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
          expiresAt,
          rateLimitRemaining: MAX_REQUESTS_PER_WINDOW - filtered.length,
          rateLimitResetAt: filtered[0] + RATE_LIMIT_WINDOW_MS
        });

      } catch (err) {
        console.error("sendPin error", err);
        return res.status(500).json({ success: false, error: "Internal error" });
      }
    });
  }
);



export const verifyPin = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { email, pin, purpose = "login", uid } = req.body || {};

        if (req.method !== "POST") {
          return res.status(405).json({ success: false, error: "Method not allowed" });
        }

        if (!pin || typeof pin !== "string" || pin.length !== 6) {
          return res.status(400).json({ success: false, error: "Invalid PIN" });
        }

        let userID = null;
        let userData = null;
        const normalizedEmail = (email || "").trim().toLowerCase();

        // ---------------------------------------------------------
        // 1. PRIMARY LOOKUP: NEW SCHEMA (email + PIN)
        // ---------------------------------------------------------
        let userSnap = await db
          .collection("Users")
          .where("TPIdentity.email", "==", normalizedEmail)
          .where("TPSecurity.pin.value", "==", pin)
          .limit(1)
          .get();

        if (!userSnap.empty) {
          const doc = userSnap.docs[0];
          userID = doc.id;
          userData = doc.data() || {};
        }

        // ---------------------------------------------------------
        // 2. LOGIN FLOW (fallback legacy email lookup)
        // ---------------------------------------------------------
        if (!userID && purpose === "login") {
          if (!email || typeof email !== "string" || !email.includes("@")) {
            return res.status(400).json({ success: false, error: "Invalid email" });
          }

          // New schema (email + PIN)
          userSnap = await db
            .collection("Users")
            .where("TPIdentity.email", "==", normalizedEmail)
            .where("TPSecurity.pin.value", "==", pin)
            .limit(1)
            .get();

          // Legacy schema (email only)
          if (userSnap.empty) {
            userSnap = await db
              .collection("Users")
              .where("UserEmail", "==", normalizedEmail)
              .limit(1)
              .get();
          }

          if (userSnap.empty) {
            return res.status(404).json({ success: false, error: "No account found." });
          }

          const doc = userSnap.docs[0];
          userID = doc.id;
          userData = doc.data() || {};
        }

        // ---------------------------------------------------------
        // 3. EMAIL CHANGE FLOW
        // ---------------------------------------------------------
        if (!userID && purpose === "emailChange") {
          if (!uid) {
            return res.status(400).json({ success: false, error: "Missing uid for email change." });
          }

          const currentUser = await db.collection("Users").doc(uid).get();
          if (!currentUser.exists) {
            return res.status(404).json({ success: false, error: "User not found." });
          }

          userID = uid;
          userData = currentUser.data() || {};
        }

        if (!userID || !userData) {
          return res.status(500).json({ success: false, error: "User load error" });
        }

        // ---------------------------------------------------------
        // 4. LOAD PIN FROM TPSecurity MAP
        // ---------------------------------------------------------
        const pinRef = db.collection("Users").doc(userID);
        const pinSnap = await pinRef.get();
        const raw = pinSnap.data() || {};
        const pinData = raw.TPSecurity.pin || null;

        if (!pinData) {
          return res.status(400).json({ success: false, error: "PIN not found or expired" });
        }

        // PURPOSE MISMATCH
        if (pinData.purpose && pinData.purpose !== purpose) {
          await db.collection("CHANGES").add({
            type: "pinVerifyFailed",
            uid: userID,
            pin: pinData,
            purpose,
            reason: "pin_purpose_failed",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({
              snapshotType: "pinVerifyFailed",
              pin: pinData,
              purpose,
              reason: "pin_purpose_failed",
              actor: "user",
              source: "verifyPin",
              createdAt: PulseRealm.PulseNOW
            });

          await pinRef.update({ pin: deleteField() });
          return res.status(400).json({ success: false, error: "PIN purpose mismatch" });
        }

        // EXPIRATION
        const nowMsGlobal = PulseRealm.PulseNOW.toMillis();
        let expiresAt = 0;

        if (pinData.expiresAt) {
          expiresAt = pinData.expiresAt.toMillis();
        } else if (typeof pinData.expiresAt === "number") {
          expiresAt = pinData.expiresAt;
        } else if (typeof pinData.expiresAt === "string") {
          expiresAt = Number(pinData.expiresAt) || 0;
        }

        if (nowMsGlobal > expiresAt) {
          await db.collection("CHANGES").add({
            type: "pinVerifyFailed",
            uid: userID,
            pin: pinData,
            attempts: (pinData.attempts ?? 0) + 1,
            reason: "pin_expired_failed",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({
              snapshotType: "pinVerifyFailed",
              pin: pinData,
              attempts: (pinData.attempts ?? 0) + 1,
              reason: "pin_expired_failed",
              actor: "user",
              source: "verifyPin",
              createdAt: PulseRealm.PulseNOW
            });

          await pinRef.update({ pin: deleteField() });
          return res.status(400).json({ success: false, error: "PIN expired" });
        }

        // TOO MANY ATTEMPTS
        if ((pinData.attempts ?? 0) >= 5) {
          await db.collection("CHANGES").add({
            type: "pinVerifyFailed",
            uid: userID,
            pin: pinData,
            attempts: (pinData.attempts ?? 0) + 1,
            reason: "pin_toomanyattempts_failed",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({
              snapshotType: "pinVerifyFailed",
              pin: pinData,
              attempts: (pinData.attempts ?? 0) + 1,
              reason: "pin_toomanyattempts_failed",
              actor: "user",
              source: "verifyPin",
              createdAt: PulseRealm.PulseNOW
            });

          await pinRef.update({ pin: deleteField() });
          return res.status(400).json({ success: false, error: "Too many attempts" });
        }

        // WRONG PIN
        if (pinData.value !== pin) {
          await pinRef.update({
            "pin.attempts": (pinData.attempts ?? 0) + 1
          });

          await db.collection("CHANGES").add({
            type: "pinVerifyFailed",
            uid: userID,
            pin: pinData,
            attempts: (pinData.attempts ?? 0) + 1,
            reason: "pin_verification_failed",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({
              snapshotType: "pinVerifyFailed",
              pin: pinData,
              attempts: (pinData.attempts ?? 0) + 1,
              reason: "pin_verification_failed",
              actor: "user",
              source: "verifyPin",
              createdAt: PulseRealm.PulseNOW
            });

          return res.status(400).json({ success: false, error: "Invalid PIN" });
        }

        // ✅ PIN VALID → clear it
        await pinRef.update({ pin: deleteField() });

        // ---------------------------------------------------------
        // EMAIL CHANGE FLOW (update TPIdentity.email + legacy Email/UserEmail)
        // ---------------------------------------------------------
        if (purpose === "emailChange") {
          const existingTPIdentity = userData.TPIdentity || {};

          await db.collection("Users").doc(userID).set(
            {
              Email: normalizedEmail,
              UserEmail: normalizedEmail,
              TPIdentity: {
                ...existingTPIdentity,
                email: normalizedEmail
              }
            },
            { merge: true }
          );

          await db.collection("CHANGES").add({
            type: "emailChangeVerified",
            pin: pinData,
            uid: userID,
            newEmail: normalizedEmail,
            reason: "email_change_verified",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          });

          await db
            .collection("IdentityHistory")
            .doc(userID)
            .collection("snapshots")
            .add({
              snapshotType: "emailChangeVerified",
              pin: pinData,
              newEmail: normalizedEmail,
              reason: "email_change_verified",
              actor: "user",
              source: "verifyPin",
              createdAt: PulseRealm.PulseNOW
            });

          return res.json({ success: true });
        }

        // ---------------------------------------------------------
        // TOKEN LOGIC (SIMPLIFIED v11‑EVO)
        // ---------------------------------------------------------
        const tpIdentity = userData.TPIdentity || {};
        const tpWallet = userData.TPWallet || {};

        // Build identity object (returned to client)
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

        // Create a simple cryptographic pulse token (non-JWT, opaque)
        const pulseToken = crypto.randomBytes(32).toString("hex");

        // Attach lineage token to identity (client can treat as resendToken)
        identity.resendToken = pulseToken;

        // SAVE UPDATED USER (NEW SCHEMA) – no JWT, no rotation logic
        await db.collection("Users").doc(userID).set(
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
        );

        await db.collection("CHANGES").add({
          type: "pinVerifySuccess",
          pin: pinData,
          uid: userID,
          identity,
          token: pulseToken,
          reason: "pin_verified",
          actor: "user",
          source: "verifyPin",
          createdAt: PulseRealm.PulseNOW
        });

        await db
          .collection("IdentityHistory")
          .doc(userID)
          .collection("snapshots")
          .add({
            snapshotType: "pinVerifySuccess",
            pin: pinData,
            identity,
            token: pulseToken,
            reason: "pin_verified",
            actor: "user",
            source: "verifyPin",
            createdAt: PulseRealm.PulseNOW
          });

        return res.json({
          success: true,
          token: pulseToken,
          identity
        });
      } catch (err) {
        console.error("verifyPin error", err);
        return res.status(500).json({ success: false, error: "Internal error" });
      }
    });
  }
);

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
// ---------------- PIN: SET / CHANGE ----------------
export const setPin = onRequest(
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
    
    let pin = null;
    let uid = null;

    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

      ({ uid, pin } = req.body || {});
      if (!uid || !pin || String(pin).length < 4) {
        return res.status(400).json({ error: "Invalid uid or pin" });
      }

      const userRef = db.collection("Users").doc(uid);
      const snap = await userRef.get();
      const data = snap.data() || {};

      const existingSecurity = data.TPSecurity || {};
      const now = PulseRealm.PulseNOW;
      const hash = await hashPin(String(pin), 10);

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

      await db.collection("IdentityHistory")
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
  }
);

// ---------------- PIN: VERIFY ----------------
export const verifyOwnerPin = onRequest(
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
    
    let pin = null;
    let uid = null;
    try {
      if (req.method !== "POST") return res.status(405).send("Method not allowed");

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
      const match = computeHash("pin:" + pin) === pinHash;


      // WRONG PIN
      if (!match) {
        const attempts = (security.pinAttempts || 0) + 1;
        const danger = attempts >= 5;

        const updatedSecurity = {
          ...security,
          pinAttempts: attempts,
          dangerMode: danger || security.dangerMode || false,
          appLocked: danger || security.appLocked || false,
          lastLockReason: danger ? "Too many failed PIN attempts" : (security.lastLockReason || ""),
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

        await db.collection("IdentityHistory")
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

      await db.collection("IdentityHistory")
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
  }
);

export const requestPinReset = onRequest(
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
    memory: "512MiB"
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
    memory: "512MiB"
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
    memory: "512MiB"
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
    memory: "512MiB"
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

export async function getUserRefByUid(uid) {
  if (!uid) throw new Error("Missing uid");

  const usersRef = db.collection("Users");

  // 1. New schema (canonical)
  let snap = await usersRef.where("TPIdentity.uid", "==", uid).limit(1).get();
  if (!snap.empty) return snap.docs[0].ref;

  // 2. Old schema (identity.uid)
  snap = await usersRef.where("identity.uid", "==", uid).limit(1).get();
  if (!snap.empty) return snap.docs[0].ref;

  // 3. Very old schema (root uid)
  snap = await usersRef.where("uid", "==", uid).limit(1).get();
  if (!snap.empty) return snap.docs[0].ref;

  throw new Error("User not found for uid " + uid);
}

// export const refreshEnvironmentSmart = onSchedule(
//   {
//     schedule: "every 30 minutes",
//     timeZone: "America/Belize",
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "1GiB"
//   },
//   async () => {
//     const runId = PulseRealm.PulseNOW;
//     const logId = `ENV_${runId}`;
//     const errorPrefix = `ERR_${runId}_`;

//     const envRef = db.collection("environment");
//     const nowTs = PulseRealm.PulseNOW;
//     const nowMs = nowTs.toMillis();

//     const refreshed = [];
//     const skipped = [];
//     const failed = [];

//     // ---------------------------------------------------------
//     // SAFE WRAPPER
//     // ---------------------------------------------------------
//     async function safeMaybeUpdate(docName, intervalMs, fn) {
//       try {
//         await maybeUpdate(docName, intervalMs, fn);
//       } catch (err) {
//         failed.push(docName);

//         await db.collection("FUNCTION_ERRORS")
//           .doc(`${errorPrefix}${docName}_outer`)
//           .set({
//             fn: "refreshEnvironmentSmart",
//             stage: "maybeUpdate_outer",
//             docName,
//             error: String(err),
//             runId,
//             createdAt: PulseRealm.PulseNOW
//           });

//         try {
//           await envRef.doc(docName).set(
//             {
//               updatedAt: nowTs,
//               success: false,
//               raw: { error: "Outer failure: " + err.message },
//               runId
//             },
//             { merge: true }
//           );
//         } catch (_) {}
//       }
//     }

//     // ---------------------------------------------------------
//     // CORE maybeUpdate
//     // ---------------------------------------------------------
//     async function maybeUpdate(docName, intervalMs, fn) {
//       const snap = await envRef.doc(docName).get();
//       const data = snap.data() || {};

//       let last = 0;
//       const rawUpdated = data.updatedAt;

//       if (typeof rawUpdated === "number") last = rawUpdated;
//       else if (rawUpdated.toMillis) last = rawUpdated.toMillis();

//       const force =
//         !data.success ||
//         data.raw.error ||
//         !rawUpdated ||
//         last > nowMs ||
//         Object.keys(data.raw || {}).length === 0;

//       if (!force && nowMs - last < intervalMs) {
//         skipped.push(docName);
//         return;
//       }

//       try {
//         // ⭐ CALL INTERNAL BACKEND FUNCTION DIRECTLY
//         await fn(); // fetchWeather(), fetchWaves(), etc.

//         // Helper already wrote to Firestore + history
//         refreshed.push(docName);

//       } catch (err) {
//         failed.push(docName);

//         await db.collection("FUNCTION_ERRORS")
//           .doc(`${errorPrefix}${docName}`)
//           .set({
//             fn: "refreshEnvironmentSmart",
//             stage: "update_error",
//             docName,
//             error: String(err),
//             runId,
//             createdAt: PulseRealm.PulseNOW
//           });

//         await envRef.doc(docName).set(
//           {
//             updatedAt: nowTs,
//             success: false,
//             raw: { error: err.message },
//             runId
//           },
//           { merge: true }
//         );
//       }
//     }

//     // ---------------------------------------------------------
//     // CALL ALL HELPERS DIRECTLY (NO HTTP ANYWHERE)
//     // ---------------------------------------------------------
//     await safeMaybeUpdate("weather",       30 * 60 * 1000, fetchWeather);
//     await safeMaybeUpdate("heatIndex",     30 * 60 * 1000, fetchHeatIndex);
//     await safeMaybeUpdate("waves",          2 * 60 * 60 * 1000, fetchWaves);
//     await safeMaybeUpdate("sargassum",      6 * 60 * 60 * 1000, fetchSargassum);
//     await safeMaybeUpdate("moon",          24 * 60 * 60 * 1000, fetchMoonPhase);
//     await safeMaybeUpdate("wildlife",      24 * 60 * 60 * 1000, fetchWildlife);
//     await safeMaybeUpdate("storms",         1 * 60 * 60 * 1000, fetchStorms);
//     await safeMaybeUpdate("powerUpdates",   5 * 60 * 1000, updateSanPedroPower);
//     await safeMaybeUpdate("power",         15 * 60 * 1000, fetchPowerOutages);

//     // ---------------------------------------------------------
//     // TIMER LOG
//     // ---------------------------------------------------------
//     try {
//       await db.collection("TIMER_LOGS").doc(logId).set({
//         fn: "refreshEnvironmentSmart",
//         runId,
//         refreshed,
//         skipped,
//         failed,
//         createdAt: PulseRealm.PulseNOW
//       });
//     } catch (err) {
//       await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}timerlog`).set({
//         fn: "refreshEnvironmentSmart",
//         stage: "timer_log",
//         error: String(err),
//         runId,
//         createdAt: PulseRealm.PulseNOW
//       });
//     }

//     return "Smart Environment Refresh Complete.";
//   }
// );

// export const migrateCategoryIcons = onRequest(async (req, res) => {
//   // CORS
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Headers", "*");
//   res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   if (req.method === "OPTIONS") return res.status(204).send("");

//   try {
//     if (req.method !== "POST")
//       return res.status(405).json({ ok: false, error: "POST only" });

//     const { id, dryRun = false } = req.body || {};
//     if (!id)
//       return res.status(400).json({ ok: false, error: "Missing id" });

//     const ref = db.collection("Businesses").doc(id);
//     const snap = await ref.get();
//     if (!snap.exists)
//       return res.status(404).json({ ok: false, error: "Business not found", id });

//     const data = snap.data() || {};
//     const logs = [];
//     const results = [];

//     // Accept multiple possible field names and preserve original shape
//     const candidateFields = ["CATEGORYICONS", "categoryIcons", "categoryIcon"];
//     let foundField = null;
//     let originalWasString = false;

//     for (const f of candidateFields) {
//       if (f in data) {
//         if (Array.isArray(data[f]) && data[f].length > 0) {
//           foundField = f;
//           originalWasString = false;
//           break;
//         }
//         if (typeof data[f] === "string" && data[f].trim()) {
//           foundField = f;
//           originalWasString = true;
//           break;
//         }
//       }
//     }

//     if (!foundField) {
//       logs.push("No CATEGORYICONS / categoryIcons / categoryIcon found on business doc.");
//       return res.json({ ok: true, id, migrated: [], logs });
//     }

//     // Normalize to array ALWAYS
//     const iconsArray = originalWasString
//       ? [data[foundField]]
//       : (Array.isArray(data[foundField]) ? data[foundField].slice() : []);

//     logs.push(`Found ${iconsArray.length} icon(s) in field "${foundField}".`);

//     // Process each icon with filename-based global dedupe
//     for (let i = 0; i < iconsArray.length; i++) {
//       const originalUrl = iconsArray[i];

//       if (!originalUrl || typeof originalUrl !== "string") {
//         logs.push(`Skipping invalid url at index ${i}`);
//         results.push({
//           index: i,
//           originalUrl,
//           migratedUrl: null,
//           ok: false,
//           reason: "invalid-url"
//         });
//         continue;
//       }

//       // 🔥 Extract filename for dedupe (this is the key fix)
//       const filename = originalUrl.split("/").pop();
//       const cacheId = filename; // dedupe by filename

//       const cacheRef = db.collection("CategoryIconCache").doc(cacheId);
//       const cacheSnap = await cacheRef.get();

//       if (cacheSnap.exists) {
//         const cachedUrl = cacheSnap.data().migratedUrl;
//         logs.push(`Using cached migrated icon for filename ${filename}`);
//         results.push({
//           index: i,
//           originalUrl,
//           migratedUrl: cachedUrl,
//           ok: true,
//           cached: true
//         });
//         continue;
//       }

//       // 🔥 Upload once into /_EXPRESSIONS/_ICONS/
//       try {
//         logs.push(`Migrating NEW unique icon[${i}] (filename: ${filename}): ${originalUrl}`);
//         const migratedUrl = await migrateImageToFirebase(originalUrl, "icons");
//         logs.push(` -> migrated: ${migratedUrl}`);

//         // Save canonical URL under filename
//         await cacheRef.set({ migratedUrl });

//         results.push({
//           index: i,
//           originalUrl,
//           migratedUrl,
//           ok: true,
//           cached: false
//         });
//       } catch (err) {
//         logs.push(`   ⚠️ migrate failed for ${originalUrl}: ${String(err)}`);
//         results.push({
//           index: i,
//           originalUrl,
//           migratedUrl: null,
//           ok: false,
//           reason: String(err)
//         });
//       }
//     }

//     // Build new canonical array (always array)
//     const newArray = results.map(r =>
//       (r.ok && r.migratedUrl ? r.migratedUrl : r.originalUrl)
//     );

//     const valueToWrite = newArray; // ALWAYS ARRAY NOW

//     if (dryRun) {
//       logs.push("Dry run enabled — not writing changes to Firestore.");
//       return res.json({
//         ok: true,
//         id,
//         field: foundField,
//         originalWasString,
//         originalCount: iconsArray.length,
//         migrated: results,
//         newIcons: valueToWrite,
//         logs
//       });
//     }

//     // Write canonical icons back to business
//     const updateObj = {};
//     updateObj[foundField] = valueToWrite;
//     await ref.set(updateObj, { merge: true });

//     logs.push(
//       `Wrote ${valueToWrite.length} canonical icon(s) back to "${foundField}" on business ${id}.`
//     );

//     return res.json({
//       ok: true,
//       id,
//       field: foundField,
//       originalWasString,
//       originalCount: iconsArray.length,
//       migrated: results,
//       newIcons: valueToWrite,
//       logs
//     });

//   } catch (err) {
//     console.error("migrateCategoryIcons failed:", err);
//     return res.status(500).json({ ok: false, error: String(err) });
//   }
// });
// function parseEventTimestamp(dateStr, timeStr) {
//   if (!dateStr || !timeStr) return null;

//   try {
//     // Try MM/DD/YYYY first (Appy Pie)
//     let jsDate = new Date(`${dateStr} ${timeStr}`);
//     if (!isNaN(jsDate.getTime())) {
//       return admin.firestore.Timestamp.fromDate(jsDate);
//     }

//     // Try DD-MMM-YYYY (your existing format)
//     const alt = parseCustomDateFormat(dateStr, timeStr);
//     if (alt) return admin.firestore.Timestamp.fromDate(alt);

//     return null;
//   } catch {
//     return null;
//   }
// }

// function parseCustomDateFormat(dateStr, timeStr) {
//   // "11-MAR-2026"
//   const match = String(dateStr).match(/^(\d{1,2})-([A-Z]{3})-(\d{4})$/i);
//   if (!match) return null;

//   const day = parseInt(match[1], 10);
//   const monStr = match[2].toUpperCase();
//   const year = parseInt(match[3], 10);

//   const months = {
//     JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
//     JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
//   };

//   const month = months[monStr];
//   if (month === undefined) return null;

//   const base = new Date(year, month, day);
//   if (isNaN(base.getTime())) return null;

//   const timeMatch = String(timeStr).match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
//   if (!timeMatch) return base;

//   let hour = parseInt(timeMatch[1], 10);
//   const minute = parseInt(timeMatch[2], 10);
//   const ampm = timeMatch[3].toUpperCase();

//   if (ampm === "PM" && hour < 12) hour += 12;
//   if (ampm === "AM" && hour === 12) hour = 0;

//   base.setHours(hour, minute, 0, 0);
//   return base;
// }

// function generateShortCode() {
//   return Math.random().toString(36).substring(2, 10);
// }

// async function normalizeEventRow(row) {
//   const now = PulseRealm.PulseNOW;

//   // -----------------------------
//   // BASIC FIELDS
//   // -----------------------------
//   const title = row.title || row.eventName || "Untitled Event";
//   const summary = row.summary || null;
//   const description = row.description || null;
//   const category = row.category || row.genre || "General";
//   const language = row.language || "English";

//   // -----------------------------
//   // VENUE / LOCATION
//   // -----------------------------
//   const venue = row.venue || row.location || null;
//   const address = row.address || venue || null;

//   const coords = (row.latitude && row.longitude)
//     ? { lat: Number(row.latitude), lng: Number(row.longitude) }
//     : null;

//   // -----------------------------
//   // CONTACT
//   // -----------------------------
//   const emails = row.email
//     ? String(row.email).split("|||").map(e => e.trim()).filter(Boolean)
//     : [];

//   const phones = [];
//   if (row.phone) {
//     const nums = String(row.phone).split("|||").map(n => n.trim()).filter(Boolean);
//     nums.forEach(n => {
//       const normalized = normalizePhone(n, row.country_code, row, coords);
//       if (normalized) {
//         phones.push({ label: "Call", number: normalized });
//       }
//     });
//   }

//   const whatsapp = row.whatsapp
//     ? String(row.whatsapp)
//         .split("|||")
//         .map(n => normalizePhone(n, row.country_code, row, coords))
//         .filter(Boolean)
//     : [];

//   // -----------------------------
//   // MEDIA
//   // -----------------------------
//   const images = Array.isArray(row.images)
//     ? row.images
//     : (row.imagesString
//         ? String(row.imagesString).split("|||").map(i => i.trim()).filter(Boolean)
//         : []);

//   const mainImage = images[0] || null;
//   const youtubeUrl = row.youtubeUrl || null;

//   // -----------------------------
//   // DATE / TIME (supports both formats)
//   // -----------------------------
//   const fromDate = row.fromDate || row.startDate || null;   // "11-MAR-2026" or "01/14/2026"
//   const fromTime = row.fromTime || row.startTime || null;   // "11:00 AM" or "06:00 PM"
//   const toDate   = row.toDate   || row.endDate   || null;   // "25-MAR-2026" or "01/12/2028"
//   const toTime   = row.toTime   || row.endTime   || null;   // "1:00 PM" or "11:59 PM"

//   const startTimestamp = parseEventTimestamp(fromDate, fromTime);
//   const endTimestamp   = parseEventTimestamp(toDate, toTime);

//   // -----------------------------
//   // RECURRENCE / TICKETS / PRICE
//   // -----------------------------
//   const recurrence = row.occursOn || row.recurrence || "One-time"; // e.g. "Weekly"
//   const ticketBooking = row.ticketBooking || "Disable";            // "Disable" / "Enable"
//   const showPrice = row.showPrice === false
//     ? false
//     : row.hidePrice === true
//       ? false
//       : row.showPrice === true
//         ? true
//         : true; // default show

//   const price = row.price || (showPrice ? "" : null);

//   // -----------------------------
//   // OWNER / META
//   // -----------------------------
//   const ownerEmail = row.ownerEmail || row.assignOwnerEmail || null;
//   const ownerUid   = row.ownerUid || null;
//   const status     = row.status || "active";
//   const terms      = row.terms || row.termsAndConditions || null;

//   const createdAt = row.createdAt || now;
//   const updatedAt = now;

//   const shortCode = row.shortCode || generateShortCode();

//   // -----------------------------
//   // SOCIAL / WEBSITES
//   // -----------------------------
//   const websites = row.websites
//     ? row.websites
//     : (row.website
//         ? [row.website]
//         : []);

//   const social = row.social || {
//     facebook: row.facebook ? [row.facebook] : [],
//     instagram: [],
//     twitter: [],
//     youtube: youtubeUrl ? [youtubeUrl] : [],
//     other: []
//   };

//   // -----------------------------
//   // FINAL OBJECT
//   // -----------------------------
//   return {
//     eventID: row.eventID || null,

//     title,
//     summary,
//     description,
//     category,
//     language,

//     venue,
//     address,
//     coords,

//     images,
//     mainImage,
//     youtubeUrl,

//     emails,
//     phones,
//     whatsapp,
//     websites,
//     social,

//     price,
//     showPrice,
//     ticketBooking,

//     fromDate,
//     fromTime,
//     toDate,
//     toTime,

//     startTimestamp,
//     endTimestamp,

//     recurrence,

//     createdAt,
//     updatedAt,

//     status,
//     ownerUid,
//     ownerEmail,

//     shortCode,
//     terms
//   };
// }

// export const uploadEventRow = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "512MiB"
//   },
//   async (req, res) => {
//     // CORS
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "*");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//     if (req.method === "OPTIONS") return res.status(204).send("");
//     if (req.method !== "POST") return res.status(405).send("Method not allowed");

//     try {
//       const row = req.body;

//       if (!row || typeof row !== "object") {
//         console.error("❌ uploadEventRow: Missing or invalid row:", row);
//         return res.status(400).json({ error: "Missing or invalid row data" });
//       }

//       let normalized;
//       try {
//         normalized = await normalizeEventRow(row);
//       } catch (normErr) {
//         console.error("❌ Event normalization failed:", normErr);
//         console.error("   Row:", row);
//         return res.status(400).json({
//           ok: false,
//           error: "Normalization failed",
//           reason: normErr.message || String(normErr),
//           row
//         });
//       }

//       const eventID = normalized.eventID ||
//         (row.eventID ? String(row.eventID) : db.collection("Events").doc().id);

//       normalized.eventID = eventID;

//       try {
//         await db
//           .collection("Events")
//           .doc(eventID)
//           .set(normalized, { merge: true });
//       } catch (writeErr) {
//         console.error("❌ Firestore write failed:", writeErr);
//         console.error("   Row:", row);
//         return res.status(500).json({
//           ok: false,
//           error: "Firestore write failed",
//           reason: writeErr.message || String(writeErr),
//           row
//         });
//       }

//       return res.json({ ok: true, eventID });
//     } catch (err) {
//       console.error("❌ uploadEventRow unexpected error:", err);
//       return res.status(500).json({ error: "Internal error" });
//     }
//   }
// );


// function coordsMatch(a, b) {
//   if (!a.lat || !a.lng || !b.lat || !b.lng) return false;

//   const dLat = Math.abs(a.lat - b.lat);
//   const dLng = Math.abs(a.lng - b.lng);

//   // ~11 meters tolerance
//   return dLat < 0.0001 && dLng < 0.0001;
// }

// -----------------------------------------------------
// SAFE COORD PARSER
// -----------------------------------------------------
// function parseCoord(v) {
//   if (v === null || v === undefined) return null;

//   v = String(v)
//     .replace(/\u00A0/g, " ")
//     .replace(/[^\d\.\- ]/g, "")
//     .trim();

//   if (v === "" || v === "0" || v === "0.0") return null;

//   if (v.includes(",")) v = v.split(",")[0].trim();
//   if (v.includes(" ")) v = v.split(" ")[0].trim();

//   const n = Number(v);
//   return isNaN(n) ? null : n;
// }

// function normalizeCategoryName(name) {
//   if (!name) return null;

//   return String(name)
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")   // remove accents
//     .replace(/[^\w\s\/&-]/g, "")       // remove weird punctuation
//     .replace(/\s+/g, " ")              // collapse whitespace
//     .trim();
// }

// // -----------------------------------------------------
// // NORMALIZE BUSINESS ROW (UPGRADED FOR MULTI-CATEGORY)
// // -----------------------------------------------------
// async function normalizeBusinessRow(row) {
//   // CATEGORY + SUBCATEGORY
//   let category = null;
//   let subcategory = null;
//   let categories = [];

//   const catField = row["cat_name*"] || row.cat_name;
//   if (catField) {
//     const rawParts = String(catField)
//       .split("|")
//       .map(s => s.trim())
//       .filter(Boolean);

//     const normParts = rawParts
//       .map(normalizeCategoryName)
//       .filter(Boolean);

//     if (normParts.length > 0) category = normParts[0];
//     if (normParts.length > 1) subcategory = normParts[1];

//     categories = [...new Set(normParts)];
//   }

//   // NAME — hardened
//   let rawName = row["heading*"] || row.heading || "";
//   rawName = String(rawName)
//     .replace(/\u00A0/g, " ")
//     .replace(/[\u200B-\u200F]/g, "")
//     .replace(/\s+/g, " ")
//     .trim();

//   if (!rawName || rawName.length < 2) {
//     rawName = null;
//   }

//   const busname = rawName || "Unnamed Business";

//   // EMAILS
//   const emails = row.email
//     ? row.email.split("|||").map(e => e.trim()).filter(Boolean)
//     : [];

//   // WEBSITES + SOCIAL
//   const websites = [];
//   const social = [];

//   if (row.url) {
//     const urls = row.url.split("|||").map(u => u.trim()).filter(Boolean);

//     urls.forEach(u => {
//       const lower = u.toLowerCase();
//       if (
//         lower.includes("facebook.com") ||
//         lower.includes("instagram.com") ||
//         lower.includes("twitter.com") ||
//         lower.includes("youtube.com")
//       ) {
//         social.push(u);
//       } else {
//         websites.push(u);
//       }
//     });
//   }

//   // COORDS
//   const lat = parseCoord(row.latitude);
//   const lng = parseCoord(row.longitude);

//   // PHONES
//   const phones = row.call
//     ? row.call
//         .split("|||")
//         .map(n => n.trim())
//         .filter(Boolean)
//         .map(num => normalizePhone(num, row, { lat, lng }))
//         .filter(Boolean)
//     : [];

//   // WHATSAPP
//   const whatsapp = row.whatsapp
//     ? row.whatsapp
//         .split("|||")
//         .map(n => normalizePhone(n, row, { lat, lng }))
//         .filter(Boolean)
//     : [];

//   // IMAGES
//   const images = row.body_image
//     ? row.body_image.split("|||").map(i => i.trim()).filter(Boolean)
//     : [];

//   return {
//     listing_id: String(row.listing_id || "").trim(),

//     busname,
//     category,
//     subcategory,
//     categories, // seed for mergeBusinessData

//     summary: row.summary || null,
//     description: row.body || null,

//     address: row.address || null,
//     lat,
//     lng,

//     emails,
//     phones,
//     whatsapp,

//     websites,
//     social,

//     images,
//     mainPhotoURL: images[0] || null,

//     externalId: row.listing_id || null,
//     categoryIcon: row.cat_icon || null,

//     deepLink: null
//   };
// }

// -----------------------------------------------------
// CLEANERS
// -----------------------------------------------------
// function cleanValue(v) {
//   if (v === null || v === undefined) return undefined;
//   if (typeof v === "string" && v.trim() === "") return undefined;
//   if (Array.isArray(v)) return v;
//   if (typeof v === "object" && Object.keys(v).length === 0) return undefined;
//   return v;
// }

// function cleanObject(obj) {
//   const out = {};
//   for (const [k, v] of Object.entries(obj)) {
//     const cleaned = cleanValue(v);
//     if (cleaned !== undefined) out[k] = cleaned;
//   }
//   return out;
// }

// function rootDomain(host) {
//   if (!host) return null;
//   const parts = host.split(".");
//   if (parts.length <= 2) return host;
//   return parts.slice(parts.length - 2).join(".");
// }

// // -----------------------------------------------------
// // NORMALIZERS
// // -----------------------------------------------------
// function normalizeDomain(url) {
//   if (!url) return null;
//   try {
//     let u = new URL(url);
//     let host = u.hostname.toLowerCase().replace(/^www\./, "");
//     return host;
//   } catch {
//     return null;
//   }
// }

// function normalizeName(name) {
//   if (!name) return null;

//   return name
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9 ]/g, "")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// // -----------------------------------------------------
// // MATCHING
// // -----------------------------------------------------
// async function findMatchingBusinesses(normalized) {
//   const matches = [];

//   const allDocs = await db.collection("Businesses").get();

//   const incoming = {
//     lat: normalized.lat || null,
//     lng: normalized.lng || null,
//     phones: toArray(normalized.phones).filter(Boolean),
//     whatsapp: toArray(normalized.whatsapp).filter(Boolean),
//     websites: toArray(normalized.websites).map(normalizeDomain).filter(Boolean),
//     emails: toArray(normalized.emails).filter(Boolean),
//     name: normalizeName(normalized.busname) || null,
//     category: normalized.category || null,
//     subcategory: normalized.subcategory || null
//   };

//   const incomingRootDomains = incoming.websites
//     .map(rootDomain)
//     .filter(Boolean)
//     .filter(r => !bannedDomains.includes(r));

//   for (const doc of allDocs.docs) {
//     const data = doc.data() || {};

//     const existing = {
//       id: doc.id,
//       lat: data.lat || null,
//       lng: data.lng || null,
//       phones: toArray(data.phones).filter(Boolean),
//       whatsapp: toArray(data.whatsapp).filter(Boolean),
//       websites: toArray(data.websites).map(normalizeDomain).filter(Boolean),
//       emails: toArray(data.emails).filter(Boolean),
//       name: normalizeName(data.busname) || null,
//       category: data.category || null,
//       subcategory: data.subcategory || null
//     };

//     const existingRootDomains = existing.websites
//       .map(rootDomain)
//       .filter(Boolean)
//       .filter(r => !bannedDomains.includes(r));

//     const coordsSame =
//       incoming.lat && incoming.lng &&
//       existing.lat && existing.lng &&
//       Math.abs(incoming.lat - existing.lat) < 0.0001 &&
//       Math.abs(incoming.lng - existing.lng) < 0.0001;

//     const nameSame =
//       incoming.name && existing.name &&
//       incoming.name === existing.name;

//     // --- CATEGORY GUARD (SOFT) ---
//     // If categories differ, we ONLY block when we *also* lack strong signals.
//     if (incoming.category && existing.category) {
//       const sameCategory =
//         incoming.category.toLowerCase() === existing.category.toLowerCase();

//       if (!sameCategory) {
//         const hasStrongSignal =
//           coordsSame ||
//           // same email (non-personal) + same name
//           incoming.emails.some(e => {
//             const lower = e.toLowerCase();
//             if (personalEmailDomains.some(d => lower.endsWith(d))) return false;
//             return existing.emails.includes(e) && nameSame;
//           }) ||
//           // same root domain + same name
//           incomingRootDomains.some(r => existingRootDomains.includes(r)) && nameSame ||
//           // same phone + same name
//           incoming.phones.some(p => existing.phones.includes(p)) && nameSame ||
//           // same whatsapp + same name
//           incoming.whatsapp.some(p => existing.whatsapp.includes(p)) && nameSame;

//         // If we have NO strong signal, then category mismatch is enough to skip.
//         if (!hasStrongSignal) {
//           continue;
//         }
//       }
//     }

//     if (
//           coordsMatch(incoming, existing) &&
//           strongNameMatch(incoming.name, existing.name)
//         ) {
//           matches.push({
//             id: doc.id,
//             data,
//             reason: "coords+name match (safe)"
//           });
//           continue;
//         }

//     // 2. EMAIL + NAME MATCH
//     const emailHit = incoming.emails.find(e => {
//       if (!existing.emails.includes(e)) return false;
//       const lower = e.toLowerCase();
//       if (personalEmailDomains.some(d => lower.endsWith(d))) return false;
//       return incoming.name && existing.name && incoming.name === existing.name;
//     });

//     if (emailHit) {
//       matches.push({
//         id: doc.id,
//         data,
//         reason: `email+name match: ${emailHit}`
//       });
//       continue;
//     }

//     // 3. WEBSITE ROOT-DOMAIN + NAME MATCH
//     const rootHit = incomingRootDomains.find(r => existingRootDomains.includes(r));
//     if (rootHit && incoming.name === existing.name) {
//       matches.push({
//         id: doc.id,
//         data,
//         reason: `website root-domain+name match: ${rootHit}`
//       });
//       continue;
//     }

//     // 4. PHONE + NAME MATCH
//     const phoneHit = incoming.phones.find(p => existing.phones.includes(p));
//     if (phoneHit && incoming.name === existing.name) {
//       matches.push({
//         id: doc.id,
//         data,
//         reason: `phone+name match: ${phoneHit}`
//       });
//       continue;
//     }

//     // 5. WHATSAPP + NAME MATCH
//     const waHit = incoming.whatsapp.find(p => existing.whatsapp.includes(p));
//     if (waHit && incoming.name === existing.name) {
//       matches.push({
//         id: doc.id,
//         data,
//         reason: `whatsapp+name match: ${waHit}`
//       });
//       continue;
//     }

//     // 6. NAME MATCH (exact only)
//     if (
//       incoming.name &&
//       existing.name &&
//       incoming.name.length >= 3 &&
//       incoming.name !== "unnamed business" &&
//       existing.name !== "unnamed business" &&
//       incoming.name === existing.name
//     ) {
//       matches.push({
//         id: doc.id,
//         data,
//         reason: `name match: "${incoming.name}"`
//       });
//       continue;
//     }
//   }

//   return matches;
// }

// // -----------------------------------------------------
// // ARRAY NORMALIZER
// // -----------------------------------------------------
// function toArray(v) {
//   if (Array.isArray(v)) return v;
//   if (!v) return [];
//   return String(v).split("|||").filter(Boolean);
// }


// function mergeBusinessData(existingDocs, incoming) {
//   let merged = { ...incoming };

//   // Convert single category → categories array
//   if (merged.category) {
//     merged.categories = merged.categories || [];
//     if (!merged.categories.includes(merged.category)) {
//       merged.categories.push(merged.category);
//     }
//   }

//   for (const { data } of existingDocs) {

//     // --- STRING FIELDS: pick longest ---
//     const stringFields = ["description", "summary", "tagline", "address"];
//     for (const f of stringFields) {
//       const a = typeof merged[f] === "string" ? merged[f] : "";
//       const b = typeof data[f] === "string" ? data[f] : "";
//       merged[f] = a.length >= b.length ? a : b;
//     }

//     // --- CATEGORY MERGE ---
//     if (data.category) {
//       merged.categories = merged.categories || [];
//       if (!merged.categories.includes(data.category)) {
//         merged.categories.push(data.category);
//       }
//     }

//     if (data.subcategory) {
//       merged.subcategories = merged.subcategories || [];
//       if (!merged.subcategories.includes(data.subcategory)) {
//         merged.subcategories.push(data.subcategory);
//       }
//     }

//     // --- COORDS: prefer valid ---
//     if ((!merged.lat || !merged.lng) && data.lat && data.lng) {
//       merged.lat = data.lat;
//       merged.lng = data.lng;
//     }

//     // --- ARRAY FIELDS ---
//     const arrayFields = [
//       "categories",
//       "subcategories",
//       "images",
//       "phones",
//       "whatsapp",
//       "emails",
//       "websites",
//       "social",
//     ];

//     for (const f of arrayFields) {
//       const a = Array.isArray(merged[f])
//         ? merged[f]
//         : merged[f]
//         ? String(merged[f]).split("|||").filter(Boolean)
//         : [];

//       const b = Array.isArray(data[f])
//         ? data[f]
//         : data[f]
//         ? String(data[f]).split("|||").filter(Boolean)
//         : [];

//       merged[f] = Array.from(new Set([...a, ...b].filter(Boolean)));
//     }
//   }

//   // Remove empty/null fields
//   merged = cleanObject(merged);

//   return merged;
// }

// -----------------------------------------------------
// HTTP ENTRYPOINT
// -----------------------------------------------------

// export const uploadBusinessRow = onRequest(
//   {
//     region: "us-central1",
//     timeoutSeconds: 540,
//     memory: "2GiB",
//     cpu: 2,
//     maxInstances: 50,
//     minInstances: 1,
//     concurrency: 10
//   },
//   async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "*");
//     res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

//     if (req.method === "OPTIONS") return res.status(204).send("");
//     if (req.method !== "POST") return res.status(405).send("Method not allowed");

//     log("🔥 uploadBusinessRow v3.3 — request received");

//     try {
//       if (!req.body || typeof req.body !== "object") {
//         console.error("❌ Invalid JSON body");
//         return res.status(400).json({ ok: false, error: "Invalid JSON body" });
//       }

//       const row = req.body;

//       // Normalize
//       let normalized;
//       try {
//         normalized = await normalizeBusinessRow(row);
//       } catch (err) {
//         console.error("❌ Normalization failed:", err);
//         return res.status(400).json({
//           ok: false,
//           error: "Normalization failed",
//           reason: err.message
//         });
//       }

//       if (!normalized.busname) {
//         console.error("❌ Missing busname");
//         return res.status(400).json({ ok: false, error: "Missing busname" });
//       }

//       // listing_id
//       const listingIdRaw = row.listing_id;
//       if (
//         listingIdRaw === undefined ||
//         listingIdRaw === null ||
//         listingIdRaw === "" ||
//         listingIdRaw === "undefined" ||
//         listingIdRaw === "null"
//       ) {
//         console.error("❌ Missing listing_id:", listingIdRaw);
//         return res.status(400).json({
//           ok: false,
//           error: "Missing or invalid listing_id",
//           row
//         });
//       }

//       const listingId = String(listingIdRaw).trim();
//       normalized.listing_id = listingId;

//       log(`➡️ Processing listing_id ${listingId} (${normalized.busname})`);

//       // Find matches (new logic)
//       const matches = await findMatchingBusinesses(normalized);

//       log(
//         `🔍 Found ${matches.length} matches for ${listingId}:`,
//         matches.map(m => ({ id: m.id, reason: m.reason }))
//       );

//       // Merge
//       const merged = mergeBusinessData(matches, normalized);

//       // Delete old docs
//       for (const m of matches) {
//         if (m.id !== listingId) {
//           log(`🗑️ Deleting old doc ${m.id}`);
//           await db.collection("Businesses").doc(m.id).delete();
//         }
//       }

//       // Write final doc
//       log(`💾 Writing final doc for ${listingId}`);
//       await db.collection("Businesses").doc(listingId).set(merged, { merge: false });

//       return res.json({
//         ok: true,
//         id: listingId,
//         mergedFrom: matches.map(m => m.id),
//         matchDetails: matches.map(m => ({
//           id: m.id,
//           name10: (m.data.busname || "").slice(0, 10),
//           reason: m.reason
//         }))
//       });

//     } catch (err) {
//       console.error("❌ uploadBusinessRow unexpected error:", err);
//       return res.status(500).json({ error: "Internal error" });
//     }
//   }
// );
export { detectUpgradedIntent, handleIntent};

PulseRealm.OSLongTermMemory = {
  runAiCore,
  aiAssistant,
  api,
  detectUpgradedIntent,
  handleIntent
}