// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/3RDPARTY/PulseWorldFirebaseGenome-v30.js
// ============================================================================
//  PULSE-WORLD GENOME ORGAN — PulseWorldFirebaseGenome (v30 IMMORTAL ADVANTAGE++)
//  World-layer deterministic service organ (config-aware, drift-aware)
//  Provides: Firestore, Storage, Admin SDK + namespaced helpers + health +
//            world metrics + schema drift detection + cold-start fingerprint +
//            index validation + bucket metadata + rule sanity checks.
//  Placement: PULSE-WORLD / PULSE-X
//  Role: WORLD_DATA_GENOME
// ============================================================================

// Removed Firebase CDN Imports for Node.js PEX compatibility and SQL Migration
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { PulseWorldExpressMiddleLayer } from "./PULSE-WORLD-TRANSPORT.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

const Timestamp = PulseRealm.PulseNOW;
// ============================================================================
//  SUPABASE MIGRATION ADAPTER (FIREBASE-COMPATIBLE API)
//  “Drop-in replacement for PulseFirebaseDB using Supabase tables”
// ============================================================================
// ============================================================================
//  FAKE SUPABASE BROWSER ADAPTER
//  “Captures all commands and sends them to server SQL when syncing”
// ============================================================================
// ============================================================================
//  PULSEWORLD FAKE SUPABASE (Browser)
//  - Writes are queued locally
//  - Reads are fetched from server SQL
//  - Browser-safe, no env vars
// ============================================================================

// ⭐ Local command queue (browser memory)
const PulseSupabaseQueue = [];
PulseRealm.PulseSupabaseQueue = PulseSupabaseQueue;


// ⭐ Helper: call server SQL
async function callServer(payload) {
  const response = await fetch("/.netlify/functions/PULSE-SERVER-SQL", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}

// ============================================================================
//  FAKE SUPABASE CLIENT (Browser)
// ============================================================================

export const supabase = {
  from(table) {
    return {
      // ⭐ INSERT → queue only
      insert: (data) => {
        PulseSupabaseQueue.push({
          type: "insert",
          table,
          data
        });
        return { data: null, error: null };
      },

      // ⭐ UPDATE → queue only
      update: (data) => ({
        eq: (idField, idValue) => {
          PulseSupabaseQueue.push({
            type: "update",
            table,
            idField,
            idValue,
            data
          });
          return { data: null, error: null };
        }
      }),

      // ⭐ SELECT → REAL READ from server
      select: () => ({
        eq: async (field, value) => {
          const result = await callServer({
            query: `SELECT * FROM ${table} WHERE ${field} = $1`,
            params: { p1: value }
          });

          return {
            data: result.data || null,
            error: result.error || null
          };
        },

        limit: async (n) => {
          const result = await callServer({
            query: `SELECT * FROM ${table} LIMIT ${n}`
          });

          return {
            data: result.data || null,
            error: result.error || null
          };
        },

        // ⭐ SELECT ALL
        all: async () => {
          const result = await callServer({
            query: `SELECT * FROM ${table}`
          });

          return {
            data: result.data || null,
            error: result.error || null
          };
        }
      })
    };
  },

  // ⭐ RPC → queue only
  rpc(name, params) {
    PulseSupabaseQueue.push({
      type: "rpc",
      name,
      params
    });
    return { data: null, error: null };
  },

  // ⭐ RAW SQL → REAL READ
  sql(query, params = {}) {
    return callServer({ query, params });
  }
};

// ============================================================================
//  FIREBASE-LIKE COLLECTION WRAPPER
// ============================================================================

class SupabaseCollection {
  constructor(table) {
    this.table = table;
  }

  // ⭐ Add → queue only
  async add(data) {
    PulseSupabaseQueue.push({
      type: "insert",
      table: this.table,
      data
    });

    return { id: "local-" + Date.now() };
  }

  // ⭐ Document wrapper
  doc(id) {
    return {
      set: async (data) => {
        PulseSupabaseQueue.push({
          type: "update",
          table: this.table,
          id,
          data
        });
      },

      get: async () => {
        const result = await callServer({
          query: `SELECT * FROM ${this.table} WHERE id = $1`,
          params: { p1: id }
        });

        const row = result.data?.[0] || null;

        return {
          empty: !row,
          exists: !!row,
          data: () => row || {}
        };
      }
    };
  }

  // ⭐ Limit
  limit(n) {
    this._limit = n;
    return this;
  }

  // ⭐ Get → REAL READ
  async get() {
    const query = this._limit
      ? `SELECT * FROM ${this.table} LIMIT ${this._limit}`
      : `SELECT * FROM ${this.table}`;

    const result = await callServer({ query });

    const rows = result.data || [];

    return {
      empty: rows.length === 0,
      docs: rows.map((row) => ({
        id: row.id,
        data: () => row
      }))
    };
  }

  // ⭐ NEW: Find → REAL READ with WHERE filters
  async find(queryObj = {}) {
    const whereClauses = [];
    const params = {};

    let paramIndex = 1;

    for (const [field, value] of Object.entries(queryObj)) {
      const paramName = `p${paramIndex}`;
      whereClauses.push(`${field} = $${paramIndex}`);
      params[paramName] = value;
      paramIndex++;
    }

    const whereSQL = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const result = await callServer({
      query: `SELECT * FROM ${this.table} ${whereSQL}`,
      params
    });

    const rows = result.data || [];

    return {
      empty: rows.length === 0,
      docs: rows.map((row) => ({
        id: row.id,
        data: () => row
      }))
    };
  }
}


// ============================================================================
//  EXPORT DB API
// ============================================================================

export const db = {
  collection: (table) => new SupabaseCollection(table),

  // ⭐ REAL listCollections()
  listCollections: async () => {
    const result = await callServer({
      query: `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `
    });

    return result.data?.map((r) => r.table_name) || [];
  },

  // ⭐ Push queued commands to server SQL
  sync: async () => {
    console.log("🔄 Syncing queued Supabase commands to server…");

    const result = await callServer({
      commands: PulseSupabaseQueue
    });

    if (result.ok) {
      console.log("✅ Supabase sync complete.");
      PulseSupabaseQueue.length = 0;
    } else {
      console.error("❌ Supabase sync failed:", result.error);
    }
  }
};

// Attach to PulseRealm
PulseRealm.PulseFirebaseDB = db;



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


// No storage bucket — use memory or FILES instead
export const PulseMemory = {};

// ============================================================================
//  NAMESPACE HELPERS — SYSTEM / WORLD / USER / REGION
// ============================================================================
function systemCollection(name) {
  return db.collection(`__SYSTEM__/${name}/v1`);
}

function worldCollection(name) {
  return db.collection(`WORLD/${name}`);
}

function userCollection(userId, name) {
  if (!userId) throw new Error("userId required for userCollection");
  return db.collection(`USERS/${userId}/${name}`);
}

function regionCollection(regionCode, name) {
  if (!regionCode) throw new Error("regionCode required for regionCollection");
  return db.collection(`REGIONS/${regionCode}/${name}`);
}

// ============================================================================
//  WORLD METRICS — REGION/HOST HEATMAPS, ACCESS COUNTS
// ============================================================================
async function recordWorldMetric(kind, payload = {}) {
  try {
    const col = systemCollection("WorldMetrics");
    await col.add({
      kind,
      payload,
      at: PulseRealm.PulseNOW,
      version: "v30"
    });
    return true;
  } catch (err) {
    console.warn("[WorldMetrics v30] Failed:", err);
    return false;
  }
}

// ============================================================================
//  FIRESTORE INDEX SELF-VALIDATION (non-fatal)
// ============================================================================
async function validateFirestoreIndexes() {
  try {
    const indexes = await db.listCollections(); // presence check only
    return { ok: true, count: indexes.length, version: "v30" };
  } catch (err) {
    return { ok: false, error: String(err), version: "v30" };
  }
}


// ============================================================================
//  SECURITY RULE SANITY CHECK (non-fatal)
// ============================================================================
async function checkSecurityRules() {
  try {
    await db.collection("__RULE_CHECK__").limit(1).get();
    return { ok: true, version: "v30" };
  } catch (err) {
    return { ok: false, error: String(err), version: "v30" };
  }
}

// ============================================================================
//  SCHEMA DRIFT DETECTION — IMMORTAL
// ============================================================================
async function detectSchemaDrift(expected = {}) {
  try {
    const drift = [];
    for (const [col, fields] of Object.entries(expected)) {
      const snap = await db.collection(col).limit(1).get();
      if (!snap.empty) {
        const doc = snap.docs[0].data();
        for (const f of fields) {
          if (!(f in doc)) drift.push({ col, missingField: f });
        }
      }
    }
    return { ok: true, drift, version: "v30" };
  } catch (err) {
    return { ok: false, error: String(err), version: "v30" };
  }
}

// ============================================================================
//  WORLD HEARTBEAT — IMMORTAL
// ============================================================================
async function worldHeartbeat() {
  try {
    await systemCollection("Heartbeat")
      .doc("world")
      .set(
        {
          at: PulseRealm.PulseNOW,
          projectId: "PulseWorldOS",
          env: detectEnvironmentKind(),
          version: "v30"
        },
        { merge: true }
      );
    return true;
  } catch (err) {
    console.warn("[WorldHeartbeat v30] Failed:", err);
    return false;
  }
}

// ============================================================================
//  HEALTH CHECK
// ============================================================================
async function checkWorldDataHealth() {
  try {
    const now = PulseRealm.PulseNOW;
    await systemCollection("Health")
      .doc("world-data")
      .set(
        {
          lastCheckAt: now,
          nodeEnv: detectEnvironmentKind(),
          projectId: "PulseWorldOS",
          version: "v30"
        },
        { merge: true }
      );

    return { ok: true, projectId: "PulseWorldOS", version: "v30" };
  } catch (err) {
    console.warn("[WorldHealth v30] Failed:", err);
    return { ok: false, error: String(err), version: "v30" };
  }
}

// ============================================================================
//  WORLD SNAPSHOT APPEND
// ============================================================================
async function appendWorldSnapshot(kind, payload = {}) {
  try {
    await systemCollection("WorldSnapshots").add({
      kind,
      payload,
      createdAt: PulseRealm.PulseNOW,
      version: "v30"
    });
    return true;
  } catch (err) {
    console.warn("[WorldSnapshot v30] Failed:", err);
    return false;
  }
}

// ============================================================================
//  EXPORT — WORLD GENOME ORGAN
// ============================================================================
export const PulseWorldFirebaseGenome = Object.freeze({
  db,

  // Namespaced helpers
  systemCollection,
  worldCollection,
  userCollection,
  regionCollection,

  // World metrics
  recordWorldMetric,

  // Health + snapshots
  checkWorldDataHealth,
  appendWorldSnapshot,
  worldHeartbeat,

  // Advanced diagnostics
  validateFirestoreIndexes,
  checkSecurityRules,
  detectSchemaDrift,

  meta: Object.freeze({
    layer: "world_layer",
    role: "world_data_genome",
    version: "v30-IMMORTAL-ADVANTAGE++",
    deterministic: true,
    driftProof: true,
    zeroMutation: true
  })
});

// Pass-through exports
export {
  systemCollection,
  worldCollection,
  userCollection,
  regionCollection,
  recordWorldMetric,
  checkWorldDataHealth,
  appendWorldSnapshot,
  worldHeartbeat,
  validateFirestoreIndexes,
  checkSecurityRules,
  detectSchemaDrift
};

PulseRealm.WorldFirebaseGenome = {
  PulseWorldFirebaseGenome,
  systemCollection,
  worldCollection,
  userCollection,
  regionCollection,
  recordWorldMetric,
  checkWorldDataHealth,
  appendWorldSnapshot,
  worldHeartbeat,
  validateFirestoreIndexes,
  checkSecurityRules,
  detectSchemaDrift
}


// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/3RDPARTY/PulseWorldFirebaseAdapter-v30-IMMORTAL.js
// ROLE: WORLD_LOGGING_ADAPTER — deterministic, IMMORTAL-safe logging into Firestore
// LAYER: PULSE-WORLD / PULSE-X / WORLD_DATA_GENOME
// NOTES:
//   - Uses PulseWorldFirebaseGenome-v30 for admin/db/systemCollection
//   - Pure backend organ: no UI, no random, no network beyond Firestore
//   - One canonical entrypoint: logToFirebase(envelope)
//   - Dual-hash intell envelope, oneband-aware (dualBandMode/shifterBand)
// ============================================================================
function onSchedule(input, handler) {
  const ms = parseScheduleInterval(input);
  setInterval(() => handler({ time: PulseRealm.PulseNOW }), ms);
}

function parseScheduleInterval(str) {
  str = str.toLowerCase().trim();

  if (str.startsWith("every")) str = str.replace("every", "").trim();

  if (str.includes("second")) return 1000 * parseInt(str);
  if (str.includes("minute")) return 1000 * 60 * parseInt(str);
  if (str.includes("hour"))   return 1000 * 60 * 60 * parseInt(str);

  // default fallback: 1 minute
  return 60000;
}

export const PulseWorldFirebaseAdapterMeta = Object.freeze({
  layer: "world_layer",
  role: "world_logging_adapter",
  version: "v30-IMMORTAL-INTEL-LOGGER",
  deterministic: true,
  driftProof: true
});

// ---------------------------------------------------------------------------
// INTERNAL: IntellHash (dual hash, bounded, deterministic)
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1000003;
  }
  return `a${h}`;
}

function computeDualHash(str) {
  const primary = computeHash(str);
  const secondary = computeAltHash(str);
  const combined = computeHash(primary + "::" + secondary);
  return { primary, secondary, combined };
}

// ---------------------------------------------------------------------------
// INTERNAL: level normalization + envelope shaping
// ---------------------------------------------------------------------------
const LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"];

function normalizeLevel(level) {
  const v = String(level || "info").toLowerCase().trim();
  if (LEVELS.includes(v)) return v;
  if (v === "warning") return "warn";
  return "info";
}

export function nowMillis(adminInstance) {
  return adminInstance.firestore.Timestamp.now().toMillis();
}

function detectEnvironmentKind() {
  if (typeof document !== "undefined") {
    return "WINDOW";
  }
  if (typeof self !== "undefined" &&
      typeof PulseRealm.registration === "object" &&
      typeof PulseRealm.clients === "object") {
    return "SERVICE_WORKER";
  }
  if (typeof self !== "undefined" &&
      typeof PulseRealm.SharedWorkerGlobalScope === "undefined" && // avoid reference
      typeof MessagePort !== "undefined" &&
      typeof PulseRealm.onconnect === "function") {
    return "SHARED_WORKER";
  }
  if (typeof self !== "undefined" &&
      typeof PulseRealm.postMessage === "function" &&
      typeof PulseRealm.importScripts === "function") {
    return "WORKER";
  }
  if (typeof process !== "undefined" &&
      process.versions &&
      process.versions.node) {
    return "NODE";
  }
  return "UNKNOWN";
}
function buildLogEnvelope(input = {}) {
  const level = normalizeLevel(input.level);
  const message = String(input.message || "").slice(0, 4096);

  const world = input.world || "pulse-world";
  const region = input.region || input.regionCode || "global";
  const tenantId = input.tenantId || null;
  const userId = input.userId || null;
  const requestId = input.requestId || input.reqId || null;
  const route = input.route || null;
  const host = input.host || null;
  const channel = input.channel || "world";
  const source = input.source || "PulseWorldFirebaseAdapter-v30";

  const meta = input.meta && typeof input.meta === "object" ? input.meta : {};
  const tags = Array.isArray(input.tags) ? input.tags.map(String) : [];

  const env = detectEnvironmentKind();
  const projectId = "PulseWorldOS" || null;

  const base = {
    level,
    message,
    channel,
    source,
    tags,
    worldContext: {
      world,
      region,
      tenantId,
      userId,
      requestId,
      route,
      host
    },
    runtimeContext: {
      nodeEnv: env,
      projectId,
      adapterVersion: PulseWorldFirebaseAdapterMeta.version
    },
    meta,
    timestamps: {
      clientAt: input.clientAt || null,
      receivedAt: PulseRealm.PulseNOW
    }
  };

  const intellPayload = {
    level,
    message,
    world,
    region,
    tenantId,
    userId,
    requestId,
    route,
    host,
    tags,
    nodeEnv: env,
    projectId
  };

  const intellHash = computeDualHash(JSON.stringify(intellPayload));

  return {
    ...base,
    intellHash,
    immortalMeta: {
      presenceBandState: input.presenceBandState || null,
      harmonicDrift: input.harmonicDrift || null,
      coherenceScore: input.coherenceScore || null,
      dualBandMode: input.dualBandMode || "symbolic",
      shifterBand: input.shifterBand || "logging"
    }
  };
}

// ---------------------------------------------------------------------------
// PUBLIC: logToFirebase (core IMMORTAL logger)
// ---------------------------------------------------------------------------
export async function logToFirebase(level, message, meta = {}) {
  if (!db) {
    console.warn(
      "[PulseWorldFirebaseAdapter-v30] Database Not Available; Skipping Log..."
    );
    return { ok: false, skipped: true, reason: "no_db" };
  }

  try {
    const envelope = buildLogEnvelope({
      level,
      message,
      ...meta
    });

    const col = systemCollection
      ? systemCollection("Logs")
      : db.collection("__SYSTEM__/Logs/v1");

    const doc = {
      ...envelope,
      createdAt: PulseRealm.PulseNOW
    };

    const ref = await col.add(doc);

    return {
      ok: true,
      id: ref.id,
      level: envelope.level,
      intellHash: envelope.intellHash
    };
  } catch (err) {
    console.error("[PulseWorldFirebaseAdapter-v30] LogToFirebase has had an Error:", err);
    return { ok: false, error: String(err) };
  }
}

// ---------------------------------------------------------------------------
// PUBLIC: structured helpers
// ---------------------------------------------------------------------------
export async function logInfo(message, meta = {}) {
  return logToFirebase("info", message, meta);
}

export async function logWarn(message, meta = {}) {
  return logToFirebase("warn", message, meta);
}

export async function logError(message, meta = {}) {
  return logToFirebase("error", message, meta);
}

export async function logFatal(message, meta = {}) {
  return logToFirebase("fatal", message, meta);
}

// ---------------------------------------------------------------------------
// LEGACY-LIKE LAMBDA HANDLER (for event-based runtimes)
// ---------------------------------------------------------------------------
export async function FirebaseAdapterHandler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    const { level, message, meta, ...rest } = body || {};
    const result = await logToFirebase(level, message, {
      ...(meta || {}),
      ...rest
    });

    return {
      statusCode: result.ok ? 200 : 500,
      body: JSON.stringify({ ok: result.ok, id: result.id || null })
    };
  } catch (err) {
    console.error("[PulseWorldFirebaseAdapter-v30] FirebaseAdapter Handler has had an Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(err) })
    };
  }
}

// FILE: PULSE-UNIVERSE/X-PULSE-X/3RDPARTY/PulseWorldFirebaseLogger-v30-IMMORTAL.js
// ============================================================================
//  PULSE-WORLD FIREBASE LOGGER — v30 IMMORTAL-INTEL
//  ROLE:
//    • Universal logging entrypoint for all Pulse‑World layers
//    • Accepts logs from: Pulse-Core, Pulse-X, Pulse-Scheduler, Pulse-Runtime,
//      Pulse-Overmind, PulseRouter, PulseTouch, BinarySubstrate, external organs
//    • Wraps logs into IMMORTAL envelopes and forwards to Firebase Adapter v30
//    • Deterministic, drift-proof, zero-mutation logging
//    • Supports symbolic logs, binary logs, dual-band logs, hybrid envelopes
// ============================================================================

export const PulseWorldFirebaseLoggerMeta = Object.freeze({
  layer: "world_layer",
  role: "world_logging_entrypoint",
  version: "v30-IMMORTAL-INTEL",
  deterministic: true,
  driftProof: true,
  zeroMutation: true,
  band: "symbolic"
});

// ============================================================================
//  INTERNAL PURE HELPERS
// ============================================================================
function safeJson(v) {
  try { return JSON.parse(JSON.stringify(v || {})); }
  catch { return {}; }
}

function buildImmortalEnvelope(body = {}) {
  const level = normalizeLevel(body.level);
  const message = String(body.message || "");
  const meta = safeJson(body.meta);

  const pulseTouch = safeJson(body.pulseTouch || {});
  const regionId = body.regionId || pulseTouch.regionId || "unknown";
  const hostName = body.hostName || pulseTouch.hostName || "unknown";

  return {
    level,
    message,
    meta,

    band: body.band || "symbolic",
    pulseTouch,

    originOrgan: body.originOrgan || "unknown",
    originInstance: body.originInstance || null,

    regionId,
    hostName,

    binaryPayload: body.binaryPayload || null,

    loggerMeta: PulseWorldFirebaseLoggerMeta
  };
}
// ============================================================================
//  PUBLIC LOGGER HANDLER — IMMORTAL
// ============================================================================
export async function Flogger(req, res) {
  try {
    const body = await req.json();
    const envelope = buildImmortalEnvelope(body);

    const adapterResponse = await FirebaseAdapterHandler({
      body: JSON.stringify(envelope)
    });

    return new Response(
      JSON.stringify({ ok: true, adapterResponse }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500 }
    );
  }
}
