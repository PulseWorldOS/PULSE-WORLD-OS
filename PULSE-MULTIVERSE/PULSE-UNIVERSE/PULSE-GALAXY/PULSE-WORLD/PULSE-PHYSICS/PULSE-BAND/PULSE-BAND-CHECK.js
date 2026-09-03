/*
===============================================================================
FILE: /Pulse-Coordinator/PULSE-WORLD-BAND/PulseWorldBandCheckBand-v35-IMMORTAL-BINARY-WAVE.js
ORGAN: PulseWorldBandCheckBand
LAYER: WORLD BACKEND — WORLDBAND PRESENCE/ADVANTAGE ORCHESTRATOR — v35-IMMORTAL-BINARY-WAVE
Binary-First • Mesh-Aware • Chunker-Aware • Capability-Aware • Binary-Index Surfaces
===============================================================================
*/

// ============================================================================
// SUBIMPORTS — CORE ORGANS (ADJUST PATHS TO YOUR TREE)
// ============================================================================
import { createPulseCoreGovernor as PulseCoreGovernor} from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseCoreMemoryManager } from "../PULSE-COREMEMORY/PulseCoreMemoryManager-v40.js";
import { PulseBinaryOverlayV40 } from "../PULSE-COREMEMORY/PulseCoreBinaryOverlay-v40.js";
import { applyPulseWorldBinaryCore as WorldBinaryCore } from "../X-PULSE-X/PULSE-WORLD-BINARY-OS.js";
import { PulseLogger } from "../../../../../_PROOF/PULSE-PROOF-LOGGER.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// ⭐ LINEAGE MAP — Evolutionary Identity (v30‑IMMORTAL)
// ============================================================================
export const PulseLineage = {
  identity:      "bbb-core-immortal-30",
  brain:         "analysis-core-immortal-30",
  gpu:           "astral-core-immortal-30",
  orchestrator:  "autonomic-core-immortal-30",
  engine:        "execution-core-immortal-30",
  optimizer:     "guardian-core-immortal-30",
  synapse:       "junction-core-immortal-30",
  band:          "interface-core-immortal-30",
  router:        "consulate-core-immortal-30",
  marketplaces:  "embassy-core-immortal-30",
  telemetry:     "bloodstream-core-immortal-30",
  limbic:        "shadow-core-immortal-30",
  governor:      "governor-core-immortal-30",
  understanding: "cortical-opener-core-immortal-30",
  proxy:         "adrenal-core-immortal-30",
  earn:          "economic-core-immortal-30",
  send:          "transport-core-immortal-30"
};

// ============================================================================
// META
// ============================================================================
export const AI_EXPERIENCE_META = {
  identity: "PulseWorldBand.CheckBand",
  version: "v35-Immortal-Binary-Wave",
  layer: "pulse_world_backend",
  role: "worldband_presence_advantage_orchestrator",
  lineage:
    "PulseWorldBand-v20 → v24-ImmortalPlus-WorldBand-Presence-Advantage → " +
    "v30-Immortal-Binary → v30-Immortal-Binary-Wave → v35-Immortal-Binary-Wave",

  evo: {
    backendOrgan: true,
    worldBandController: true,
    presenceAware: true,
    pulseAware: true,
    advantageAware: true,
    touchAware: true,

    binaryFirst: true,
    worldBinaryAware: true,
    meshAware: true,
    routerAware: true,
    satelliteAware: true,

    throughputAware: true,
    chunkerAware: true,
    cacheAware: true,

    deterministicPerTick: true,
    driftProofBands: true,

    zeroDOM: true,
    zeroWindow: true,
    zeroUI: true,
    zeroRuntimeMutation: true,

    // v30++ Binary Wave / capability surfaces
    capabilityAware: true,
    deviceTierAware: true,
    binaryIndexSurfaceAware: true,
    bandSessionSurfaceAware: true,
    earnAware: true
  },

  contract: {
    always: [
      "Logger",
      "PulseLineage",
      "WorldBinaryCore",
      "ChunkerFactory",
      "IndexedStorage",
      "UserScoresStore"
    ],
    never: ["window", "document", "DOM", "eval", "dynamicImport"]
  }
};

// ============================================================================
// MODES — Orchestrator routing modes
// ============================================================================
export const ORCHESTRATOR_MODES = {
  NORMAL: "normal",
  EARN_STRESS: "earn-stress",
  DRAIN: "drain"
};

// ============================================================================
// CONFIG — Physiological Limits (drift-proof, binary-aware)
// ============================================================================
export const NORMAL_MAX = 4;
export const UPGRADED_MAX = 8;
export const HIGHEND_MAX = 8;
export const TEST_EARN_MAX = 16;

export const UPGRADED_MULT = 2;
export const HIGHEND_MULT = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_INSTANCE_LOGGING = true;
export const INSTANCE_LOG_COLLECTION = "UserInstanceLogs";

export const PULSE_QUALITY = {
  EXCELLENT: "excellent",
  GOOD: "good",
  WEAK: "weak",
  CRITICAL: "critical",
  UNKNOWN: "unknown"
};

export const PRESENCE_TIER = {
  FULL: "full",
  PARTIAL: "partial",
  BACKGROUND: "background",
  OFFLINE: "offline",
  UNKNOWN: "unknown"
};

// ============================================================================
// INTERNAL STATE — Active “cells” per user (CHECKBAND REGISTRY)
// ============================================================================
const activeWorkers = new Map(); // userId -> worker[]
let lastBandStateSnapshot = null;
const userBandCache = new Map(); // userId -> last user band state
let adrenalSeq = 0; // deterministic sequence counter

// ============================================================================
// LOGGER RESOLUTION — v35 (NO NULLS, CONSOLE FALLBACK)
// ============================================================================
function resolveLogger(LoggerOverride) {
  const base = LoggerOverride || PulseLogger || {};

  // function-style logger
  if (typeof base === "function") {
    return {
      log: (...args) => {
        try { base(...args); } catch { console.log(...args); }
      },
      error: (...args) => {
        try { base(...args); } catch { console.error(...args); }
      }
    };
  }

  // object-style logger
  if (base && typeof base === "object") {
    return {
      log: typeof base.log === "function"
        ? (...args) => { try { base.log(...args); } catch { console.log(...args); } }
        : (...args) => { console.log(...args); },

      error: typeof base.error === "function"
        ? (...args) => { try { base.error(...args); } catch { console.error(...args); } }
        : (...args) => { console.error(...args); }
    };
  }

  // absolute fallback
  return {
    log: (...args) => { console.log(...args); },
    error: (...args) => { console.error(...args); }
  };
}

// ============================================================================
// BINARY / INTEL HELPERS — Instance Signatures + Drift Flags + Surfaces
// ============================================================================
function _hashString(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

function _hashIntel(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function _buildDualHash(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intel = _hashIntel(intelBase);
  const classic = _hashString(`${label}::${classicString || ""}`);
  return { intel, classic };
}

function computeBinaryInstanceSignature(userId, index, deviceTier, mode) {
  const seed = `${userId}|${index}|${deviceTier}|${mode}|${adrenalSeq}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return "BAND-BIN-" + hash.toString(16).padStart(8, "0");
}

function computeBandDriftFlags(finalInstances, maxAllowed) {
  const flags = [];
  if (finalInstances > maxAllowed) {
    flags.push("band_exceeds_device_max");
  }
  if (finalInstances <= 0) {
    flags.push("band_zero_or_negative");
  }
  return flags;
}

// v30++: band session surface (per user)
function buildBandSessionSurface({
  userId,
  deviceTier,
  finalInstances,
  mode,
  pulseQuality,
  presenceTier,
  earnMode,
  testEarnActive
}) {
  const payload = {
    userId,
    deviceTier,
    finalInstances,
    mode,
    pulseQuality,
    presenceTier,
    earnMode,
    testEarnActive,
    seq: adrenalSeq
  };

  const classic = `BAND_SESSION::${userId}::tier:${deviceTier}::inst:${finalInstances}::mode:${mode}`;
  const dual = _buildDualHash(
    "PULSE_WORLDBAND_SESSION_V30",
    payload,
    classic
  );

  return {
    sessionIntel: dual.intel,
    sessionClassic: dual.classic,
    payload
  };
}

// ============================================================================
// DEVICE TIER → MAX INSTANCES (deterministic)
// ============================================================================
function getDeviceMax(deviceTier, testEarnActive, orchestratorMode) {
  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    return 1;
  }

  if (testEarnActive) {
    return TEST_EARN_MAX;
  }

  switch (deviceTier) {
    case "upgraded":
      return UPGRADED_MAX;
    case "highend":
      return HIGHEND_MAX;
    default:
      return NORMAL_MAX;
  }
}


// ============================================================================
//  ChunkerFactory-v40.js — IMMORTAL SUBIMPORT ENGINE
//  “NO IMPORTS. NO RECURSION. NO CIRCLES. JUST PURE EXECUTION.”
// ============================================================================

export function ChunkerFactory({
  overlay=PulseBinaryOverlayV40,
  Governor=PulseCoreGovernor,
  MemoryManager=PulseCoreMemoryManager,
  log    = console.log,
  warn   = console.warn
} = {}) {

  if (!overlay) throw new Error("[ChunkerFactory] Missing overlay");

  // internal registry of all pages/modules
  const registry = Object.create(null);

  // -------------------------------------------------------------------------
  // REGISTER A PAGE (the replacement for import)
  // -------------------------------------------------------------------------
  function register(name, factoryFn) {
    if (registry[name]) {
      warn("[ChunkerFactory] Duplicate registration", name);
      return;
    }

    registry[name] = {
      factory: factoryFn,
      instance: null,
      built: false
    };
  }

  // -------------------------------------------------------------------------
  // BUILD A PAGE (once, no recursion, no circular imports)
  // -------------------------------------------------------------------------
  function build(name) {
    const entry = registry[name];
    if (!entry) {
      warn("[ChunkerFactory] Unknown module", name);
      return null;
    }

    // already built → return cached instance
    if (entry.built) return entry.instance;

    try {
      // mark as built BEFORE executing to avoid recursion
      entry.built = true;

      // call the factory with the subimport function
      entry.instance = entry.factory(subimport);

      return entry.instance;
    } catch (err) {
      warn("[ChunkerFactory] BUILD_ERROR", { name, error: String(err) });
      entry.built = false;
      entry.instance = null;
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // SUBIMPORT — the import-less import
  // -------------------------------------------------------------------------
  function subimport(name) {
    return build(name);
  }

  // -------------------------------------------------------------------------
  // CHUNK A PAGE — overlay-aware, context-aware
  // -------------------------------------------------------------------------
  function chunk(name, payload = {}) {
    const ctx = {
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      pressure: MemoryManager?.pressure?.() || 0,
      timestamp: PulseRealm.PulseNOW
    };

    try {
      overlay.canonicalize({
        kind: "chunk",
        name,
        payload,
        context: ctx
      });
    } catch {}

    return subimport(name);
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    register,
    build,
    subimport,
    chunk,
    registry
  });
}

// ============================================================================
// FILE: /PULSE-COREMEMORY/IndexedStorage-v40.js
// PULSE OS — v40 IMMORTAL
// UNIVERSAL INDEXEDDB STORAGE ENGINE — PURE, DETERMINISTIC, ZERO DRIFT
// “STORE ANYTHING. RETRIEVE ANYTHING. NEVER DRIFT.”
// ============================================================================

export function IndexedStorage({
  dbName = "PulseIndexedStorage",
  storeName = "pulse-store",
  version = 1,
  log    = console.log,
  warn   = console.warn
} = {}) {

  let dbPromise = null;

  // ---------------------------------------------------------------------------
  // OPEN DATABASE (lazy, cached, deterministic)
// ---------------------------------------------------------------------------
  function openDB() {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open(dbName, version);

        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "key" });
          }
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });

    return dbPromise;
  }

  // ---------------------------------------------------------------------------
  // PUT — universal write
  // ---------------------------------------------------------------------------
  async function put(key, value) {
    const db = await openDB();
    if (!db) return false;

    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        store.put({ key, value, timestamp: PulseRealm.PulseNOW });

        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // GET — universal read
  // ---------------------------------------------------------------------------
  async function get(key) {
    const db = await openDB();
    if (!db) return null;

    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);

        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.value : null);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // DELETE — universal delete
  // ---------------------------------------------------------------------------
  async function del(key) {
    const db = await openDB();
    if (!db) return false;

    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        store.delete(key);

        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // LIST KEYS — universal enumeration
  // ---------------------------------------------------------------------------
  async function keys() {
    const db = await openDB();
    if (!db) return [];

    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);

        const req = store.getAllKeys();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch {
        resolve([]);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // CLEAR — wipe store
  // ---------------------------------------------------------------------------
  async function clear() {
    const db = await openDB();
    if (!db) return false;

    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        store.clear();

        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // ---------------------------------------------------------------------------
  return Object.freeze({
    put,
    get,
    del,
    keys,
    clear,
    openDB,
    dbName,
    storeName,
    version
  });
}

PulseRealm.IndexedStorage = { IndexedStorage };
// ============================================================================
// FILE: /PULSE-COREMEMORY/UserScoresStore-v40.js
// PULSE OS — v40 IMMORTAL
// USER SCORES STORE — PURE, DETERMINISTIC, OFFLINE-FIRST
// “SCORE ONCE. REMEMBER FOREVER. NEVER DRIFT.”
// ============================================================================

export function UserScoresStore({
  storage = IndexedStorage({ dbName: "PulseUserScoresDB", storeName: "scores" }),
  log    = console.log,
  warn   = console.warn
} = {}) {

  const KEY = "UserScoresStore-v40";

  // internal cache
  let cache = {
    users: {},        // userId → score object
    lastUpdated: 0,
    version: "40.0-IMMORTAL-USERSCORES"
  };

  // ---------------------------------------------------------------------------
  // LOAD FROM INDEXED STORAGE
  // ---------------------------------------------------------------------------
  async function load() {
    try {
      const stored = await storage.get(KEY);
      if (stored && typeof stored === "object") {
        cache = stored;
      }
      log("[UserScoresStore-v40] LOADED", { count: Object.keys(cache.users).length });
    } catch (err) {
      warn("[UserScoresStore-v40] LOAD_ERROR", String(err));
    }
  }

  // ---------------------------------------------------------------------------
  // FLUSH TO INDEXED STORAGE
  // ---------------------------------------------------------------------------
  async function flush() {
    try {
      cache.lastUpdated = PulseRealm.PulseNOW;
      await storage.put(KEY, cache);
      log("[UserScoresStore-v40] FLUSH_OK", { count: Object.keys(cache.users).length });
    } catch (err) {
      warn("[UserScoresStore-v40] FLUSH_ERROR", String(err));
    }
  }

  // ---------------------------------------------------------------------------
  // SET USER SCORE
  // ---------------------------------------------------------------------------
  async function setUserScore(userId, scoreObj) {
    if (!userId) return;

    cache.users[userId] = {
      ...scoreObj,
      updated: PulseRealm.PulseNOW
    };

    await flush();
  }

  // ---------------------------------------------------------------------------
  // GET USER SCORE
  // ---------------------------------------------------------------------------
  function getUserScore(userId) {
    return cache.users[userId] || null;
  }

  // ---------------------------------------------------------------------------
  // GET ALL SCORES
  // ---------------------------------------------------------------------------
  function getAllScores() {
    return { ...cache.users };
  }

  // ---------------------------------------------------------------------------
  // CLEAR ALL
  // ---------------------------------------------------------------------------
  async function clear() {
    cache = {
      users: {},
      lastUpdated: 0,
      version: "40.0-IMMORTAL-USERSCORES"
    };
    await flush();
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // ---------------------------------------------------------------------------
  return Object.freeze({
    load,
    flush,
    setUserScore,
    getUserScore,
    getAllScores,
    clear,
    version: cache.version
  });
}

PulseRealm.UserScoresStore = { UserScoresStore };

// ============================================================================
// PULSE / PRESENCE DEGRADE FACTOR — deterministic fallback ladder
// ============================================================================
function computePulsePresenceDegradeFactor(pulseQuality, presenceTier) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;

  let factor = 1.0;
  if (pq === PULSE_QUALITY.EXCELLENT) factor = 1.0;
  else if (pq === PULSE_QUALITY.GOOD) factor = 0.85;
  else if (pq === PULSE_QUALITY.WEAK) factor = 0.6;
  else if (pq === PULSE_QUALITY.CRITICAL) factor = 0.35;
  else factor = 0.7;

  if (pt === PRESENCE_TIER.FULL) {
    factor *= 1.0;
  } else if (pt === PRESENCE_TIER.PARTIAL) {
    factor *= 0.85;
  } else if (pt === PRESENCE_TIER.BACKGROUND) {
    factor *= 0.6;
  } else if (pt === PRESENCE_TIER.OFFLINE) {
    factor *= 0.4;
  } else {
    factor *= 0.75;
  }

  if (factor > 1.0) factor = 1.0;
  if (factor <= 0) factor = 0.2;

  return factor;
}

// ============================================================================
// ADVANTAGE SCORE — presence/pulse/BT → scalar
// ============================================================================
function computeBandAdvantageScore({
  pulseQuality,
  presenceTier,
  bluetoothPresence,
  finalInstances
}) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;
  const bt = !!bluetoothPresence;

  let score = 0;

  if (pq === PULSE_QUALITY.EXCELLENT) score += 4;
  else if (pq === PULSE_QUALITY.GOOD) score += 3;
  else if (pq === PULSE_QUALITY.WEAK) score += 2;
  else if (pq === PULSE_QUALITY.CRITICAL) score += 1;
  else score += 2;

  if (pt === PRESENCE_TIER.FULL) score += 4;
  else if (pt === PRESENCE_TIER.PARTIAL) score += 3;
  else if (pt === PRESENCE_TIER.BACKGROUND) score += 2;
  else if (pt === PRESENCE_TIER.OFFLINE) score += 1;
  else score += 2;

  if (bt) score += 2;

  if (finalInstances >= 4) score += 2;
  else if (finalInstances >= 2) score += 1;

  if (score > 10) score = 10;
  if (score < 0) score = 0;

  return score;
}

// ============================================================================
// TOUCH / PRESENCE DRIFT FLAGS
// ============================================================================
function computePresenceDriftFlags({ pulseQuality, presenceTier, bluetoothPresence }) {
  const flags = [];
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;
  const bt = !!bluetoothPresence;

  if (pt === PRESENCE_TIER.OFFLINE && bt) {
    flags.push("offline_but_bluetooth_present");
  }
  if (pq === PULSE_QUALITY.CRITICAL && pt === PRESENCE_TIER.FULL) {
    flags.push("critical_pulse_full_presence_mismatch");
  }
  if (pq === PULSE_QUALITY.EXCELLENT && pt === PRESENCE_TIER.OFFLINE) {
    flags.push("excellent_pulse_offline_presence_mismatch");
  }

  return flags;
}

// ============================================================================
// COMPUTE FINAL INSTANCE COUNT — Deterministic + presence/pulse aware
// ============================================================================
function computeFinalInstances(
  base,
  deviceTier,
  earnMode,
  testEarnActive,
  orchestratorMode,
  pulseQuality,
  presenceTier
) {
  let final = base;

  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    final = 1;
  } else {
    if (deviceTier === "upgraded") final *= UPGRADED_MULT;
    if (deviceTier === "highend") final *= HIGHEND_MULT;

    if (earnMode) {
      final = Math.floor(final * EARN_MODE_MULT);
    }

    if (orchestratorMode === ORCHESTRATOR_MODES.EARN_STRESS) {
      final = Math.max(final, base * 2);
    }

    if (testEarnActive) {
      final = TEST_EARN_MAX;
    }
  }

  const degradeFactor = computePulsePresenceDegradeFactor(
    pulseQuality,
    presenceTier
  );
  final = Math.floor(final * degradeFactor);

  const max = getDeviceMax(deviceTier, testEarnActive, orchestratorMode);
  const clamped = Math.max(1, Math.min(final, max));

  return {
    finalInstances: clamped,
    maxAllowed: max,
    degradeFactor,
    driftFlags: computeBandDriftFlags(clamped, max)
  };
}

// ============================================================================
// WORLD-BAND PROJECTION — deterministic world-lens view of band state
// ============================================================================
function computeWorldBandProjection({
  finalInstances,
  pulseQuality,
  presenceTier,
  bluetoothPresence
}) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;

  let localWeight = 0.5;
  let edgeWeight = 0.3;
  let meshWeight = 0.2;

  if (pt === PRESENCE_TIER.FULL) {
    localWeight = 0.7;
    edgeWeight = 0.2;
    meshWeight = 0.1;
  } else if (pt === PRESENCE_TIER.PARTIAL) {
    localWeight = 0.55;
    edgeWeight = 0.3;
    meshWeight = 0.15;
  } else if (pt === PRESENCE_TIER.BACKGROUND) {
    localWeight = 0.4;
    edgeWeight = 0.35;
    meshWeight = 0.25;
  } else if (pt === PRESENCE_TIER.OFFLINE) {
    localWeight = 0.25;
    edgeWeight = 0.4;
    meshWeight = 0.35;
  }

  if (pq === PULSE_QUALITY.EXCELLENT) {
    meshWeight += 0.05;
    edgeWeight += 0.05;
    localWeight -= 0.1;
  } else if (pq === PULSE_QUALITY.CRITICAL) {
    meshWeight -= 0.05;
    localWeight += 0.05;
  }

  function clamp01(v) {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
  }

  localWeight = clamp01(localWeight);
  edgeWeight = clamp01(edgeWeight);
  meshWeight = clamp01(meshWeight);

  const sum = localWeight + edgeWeight + meshWeight || 1;
  localWeight /= sum;
  edgeWeight /= sum;
  meshWeight /= sum;

  const fastLaneEligible =
    pq === PULSE_QUALITY.EXCELLENT &&
    (pt === PRESENCE_TIER.FULL || pt === PRESENCE_TIER.PARTIAL) &&
    !!bluetoothPresence &&
    finalInstances >= 2;

  return {
    localWeight,
    edgeWeight,
    meshWeight,
    fastLaneEligible
  };
}

// ============================================================================
// BINARY BAND SURFACE — v30 Binary Wave (for WorldBinaryCore / router / mesh)
// ============================================================================
function buildBinaryBandSurface(userBandState) {
  const {
    userId,
    finalInstances,
    deviceTier,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    worldBandProjection,
    bandAdvantageScore,
    binaryBandSignature,
    bandSessionSurface
  } = userBandState;

  const throughputClass =
    finalInstances >= 8 ? "throughput_high" :
    finalInstances >= 4 ? "throughput_medium" :
    "throughput_low";

  const throughputScore =
    finalInstances >= 8 ? 0.8 :
    finalInstances >= 4 ? 0.6 :
    0.4;

  const binaryDensity =
    pulseQuality === PULSE_QUALITY.EXCELLENT ? 0.9 :
    pulseQuality === PULSE_QUALITY.GOOD ? 0.75 :
    pulseQuality === PULSE_QUALITY.WEAK ? 0.5 :
    0.3;

  return {
    id: `band::${userId}`,
    kind: "world_band",
    userId,
    deviceTier,
    finalInstances,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    binaryBandSignature,
    throughputClass,
    throughputScore,
    binaryDensity,
    advantageScore: bandAdvantageScore,
    localWeight: worldBandProjection.localWeight ?? 0.33,
    edgeWeight: worldBandProjection.edgeWeight ?? 0.33,
    meshWeight: worldBandProjection.meshWeight ?? 0.34,
    fastLaneEligible: !!worldBandProjection.fastLaneEligible,
    baseFormulaKey: "world_band_v30_binary_wave",
    // v30++ session surfaces
    bandSessionIntel: bandSessionSurface.sessionIntel || null,
    bandSessionClassic: bandSessionSurface.sessionClassic || null
  };
}

// ============================================================================
// LOG USER SNAPSHOT — backend storage (IndexedStorage / db-like)
// ============================================================================
async function logUserInstanceSnapshot({
  storage,
  userId,
  snapshot,
  PulseLineageOverride,
  Logger
}) {
  if (!ENABLE_INSTANCE_LOGGING || !storage) return;

  const { log, error } = resolveLogger(Logger);

  try {
    await storage.append(INSTANCE_LOG_COLLECTION, {
      userId,
      seq: ++adrenalSeq,
      lineage: PulseLineageOverride || PulseLineage || null,
      ...snapshot
    });
    log("[CheckBand v35-BinaryWave] snapshot logged", { userId, seq: adrenalSeq });
  } catch (err) {
    error("[CheckBand v35-BinaryWave] snapshot_log_failed", { error: String(err) });
  }
}

// ============================================================================
// LAUNCH / KILL WORKER — metadata only (no real threads here)
// ============================================================================
function launchWorker({ userId, workerIndex, orchestratorMode, deviceTier, Logger }) {
  const { log } = resolveLogger(Logger);
  const workerName = `${userId}-instance-${workerIndex}`;
  const binarySignature = computeBinaryInstanceSignature(
    userId,
    workerIndex,
    deviceTier,
    orchestratorMode
  );

  log("[CheckBand v35-BinaryWave] launch", {
    userId,
    workerName,
    workerIndex,
    mode: orchestratorMode,
    deviceTier,
    binarySignature
  });

  return {
    name: workerName,
    userId,
    index: workerIndex,
    mode: orchestratorMode,
    deviceTier,
    seq: ++adrenalSeq,
    binarySignature
  };
}

function killWorker(worker, Logger) {
  const { log } = resolveLogger(Logger);
  log("[CheckBand v35-BinaryWave] shutdown", {
    worker: worker.name,
    mode: worker.mode,
    binarySignature: worker.binarySignature
  });
}

// ============================================================================
// BAND STATE SNAPSHOT + DIAGNOSTICS SURFACES
// ============================================================================
function buildUserBandState({
  userId,
  baseInstances,
  finalInstances,
  deviceTier,
  earnMode,
  testEarnActive,
  currentWorkers,
  maxAllowed,
  mode,
  pulseQuality,
  presenceTier,
  bluetoothPresence,
  degradeFactor,
  binaryBandSignature,
  driftFlags,
  worldBandProjection,
  bandAdvantageScore,
  presenceDriftFlags,
  touchHint,
  bandSessionSurface
}) {
  return {
    userId,
    baseInstances,
    finalInstances,
    deviceTier,
    earnMode,
    testEarnActive,
    currentWorkers,
    maxAllowed,
    mode,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    degradeFactor,
    binaryBandSignature,
    driftFlags,
    worldBandProjection,
    bandAdvantageScore,
    presenceDriftFlags,
    touchHint,
    bandSessionSurface
  };
}

function buildGlobalBandSnapshot({ mode, users, meta }) {
  return {
    meta,
    mode,
    users,
    seq: adrenalSeq
  };
}

export function getCheckBandStateSnapshot() {
  return lastBandStateSnapshot || null;
}

export function getCheckBandDiagnostics() {
  const snapshot = lastBandStateSnapshot || { users: [] };
  const totalUsers = snapshot.users.length;
  let totalInstances = 0;
  let fastLaneEligibleUsers = 0;

  for (const u of snapshot.users) {
    totalInstances += u.currentWorkers || 0;
    if (u.worldBandProjection.fastLaneEligible) {
      fastLaneEligibleUsers += 1;
    }
  }

  return {
    totalUsers,
    totalInstances,
    fastLaneEligibleUsers,
    mode: snapshot.mode || ORCHESTRATOR_MODES.NORMAL,
    seq: snapshot.seq || adrenalSeq
  };
}

// ============================================================================
// PURE PROJECTION HELPER — cache/prewarm-friendly (Binary Wave aware)
// ============================================================================
export function projectWorldBandForUser({
  userId,
  data,
  orchestratorMode = ORCHESTRATOR_MODES.NORMAL
}) {
  const baseInstances = data.instances ?? 1;
  const deviceTier = data.deviceTier ?? "normal";
  const earnMode = data.earnMode ?? false;
  const testEarnActive = data.testEarnActive ?? false;

  const pulseQuality = data.pulseQuality || PULSE_QUALITY.UNKNOWN;
  const presenceTier = data.presenceTier || PRESENCE_TIER.UNKNOWN;
  const bluetoothPresence = !!data.bluetoothPresence;

  const {
    finalInstances,
    maxAllowed,
    degradeFactor,
    driftFlags
  } = computeFinalInstances(
    baseInstances,
    deviceTier,
    earnMode,
    testEarnActive,
    orchestratorMode,
    pulseQuality,
    presenceTier
  );

  const worldBandProjection = computeWorldBandProjection({
    finalInstances,
    pulseQuality,
    presenceTier,
    bluetoothPresence
  });

  const bandAdvantageScore = computeBandAdvantageScore({
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    finalInstances
  });

  const presenceDriftFlags = computePresenceDriftFlags({
    pulseQuality,
    presenceTier,
    bluetoothPresence
  });

  const binaryBandSignatureSeed =
    `${userId}|${finalInstances}|` +
    `${deviceTier}|${orchestratorMode}|${adrenalSeq}|` +
    `${pulseQuality}|${presenceTier}`;
  let bandHash = 0;
  for (let i = 0; i < binaryBandSignatureSeed.length; i++) {
    bandHash =
      (bandHash * 31 + binaryBandSignatureSeed.charCodeAt(i)) >>> 0;
  }
  const binaryBandSignature =
    "BAND-STATE-" + bandHash.toString(16).padStart(8, "0");

  const bandSessionSurface = buildBandSessionSurface({
    userId,
    deviceTier,
    finalInstances,
    mode: orchestratorMode,
    pulseQuality,
    presenceTier,
    earnMode,
    testEarnActive
  });

  return {
    userId,
    baseInstances,
    finalInstances,
    deviceTier,
    earnMode,
    testEarnActive,
    maxAllowed,
    mode: orchestratorMode,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    degradeFactor,
    binaryBandSignature,
    driftFlags,
    worldBandProjection,
    bandAdvantageScore,
    presenceDriftFlags,
    bandSessionSurface
  };
}

// ============================================================================
// FACTORY — IMMORTAL BACKEND CHECKBAND ENGINE (Binary Wave, v35)
// ============================================================================
export function createPulseWorldBandCheckBand({
  UserScoresStoreOverride,
  ChunkerFactoryOverride,
  WorldBinaryCoreOverride,
  IndexedStorageOverride,
  LoggerOverride
} = {}) {
  const { log, error } = resolveLogger(LoggerOverride);

  const store = UserScoresStoreOverride || UserScoresStore;
  const storage = IndexedStorageOverride || IndexedStorage || null;
  const worldBinaryCore = WorldBinaryCoreOverride || WorldBinaryCore || null;

  const Chunker =
    typeof (ChunkerFactoryOverride || ChunkerFactory) === "function"
      ? (ChunkerFactoryOverride || ChunkerFactory)({ Logger: { log, error } })
      : null;

  function safeLog(stage, details = {}) {
    try {
      log("[CheckBand v35-BinaryWave]", stage, JSON.stringify(details));
    } catch {}
  }

  async function runInstanceOrchestrator(pulse = {}) {
    safeLog("tick_start", pulse || {});

    let userDocs;
    try {
      userDocs = await store.getAll();
      safeLog("UserScores_fetched", { size: userDocs.length });
    } catch (err) {
      error("[CheckBand v35] FAILED to fetch UserScores", String(err));
      return false;
    }

    const orchestratorMode =
      pulse.mode && Object.values(ORCHESTRATOR_MODES).includes(pulse.mode)
        ? pulse.mode
        : ORCHESTRATOR_MODES.NORMAL;

    const touchHint =
      pulse.touchHint ||
      pulse.pulseTouch ||
      null;

    const usersState = [];
    const binarySurfaces = [];
    const bandSessionSurfaces = [];

    for (const doc of userDocs) {
      const userId = doc.id;
      let data;

      try {
        data = doc.data || (typeof doc.data === "function" ? doc.data() : {}) || {};
      } catch (err) {
        error("[CheckBand v35] FAILED to read user doc", userId, String(err));
        continue;
      }

      const baseInstances   = data.instances ?? 1;
      const deviceTier      = data.deviceTier ?? "normal";
      const earnMode        = data.earnMode ?? false;
      const testEarnActive  = data.testEarnActive ?? false;

      const pulseQuality      = data.pulseQuality || PULSE_QUALITY.UNKNOWN;
      const presenceTier      = data.presenceTier || PRESENCE_TIER.UNKNOWN;
      const bluetoothPresence = !!data.bluetoothPresence;

      let finalInstances, maxAllowed, degradeFactor, driftFlags;

      try {
        ({
          finalInstances,
          maxAllowed,
          degradeFactor,
          driftFlags
        } = computeFinalInstances(
          baseInstances,
          deviceTier,
          earnMode,
          testEarnActive,
          orchestratorMode,
          pulseQuality,
          presenceTier
        ));
      } catch (err) {
        error("[CheckBand v35] FAILED computeFinalInstances", userId, String(err));
        continue;
      }

      if (!activeWorkers.has(userId)) {
        activeWorkers.set(userId, []);
      }

      const currentWorkers = activeWorkers.get(userId);

      // SCALE UP
      if (currentWorkers.length < finalInstances) {
        const needed = finalInstances - currentWorkers.length;
        for (let i = 0; i < needed; i++) {
          try {
            const workerIndex = currentWorkers.length;
            const worker = launchWorker({
              userId,
              workerIndex,
              orchestratorMode,
              deviceTier,
              Logger: { log, error }
            });
            currentWorkers.push(worker);
          } catch (err) {
            error("[CheckBand v35] FAILED to launch worker", String(err));
          }
        }
      }

      // SCALE DOWN
      if (currentWorkers.length > finalInstances) {
        const extra = currentWorkers.length - finalInstances;
        for (let i = 0; i < extra; i++) {
          try {
            const worker = currentWorkers.pop();
            if (worker) killWorker(worker, { log, error });
          } catch (err) {
            error("[CheckBand v35] FAILED to kill worker", String(err));
          }
        }
      }

      // BINARY BAND SIGNATURE
      let binaryBandSignature = "BAND-STATE-ERR";
      try {
        const bandSeed =
          `${userId}|${currentWorkers.length}|` +
          `${deviceTier}|${orchestratorMode}|${adrenalSeq}|` +
          `${pulseQuality}|${presenceTier}`;

        let bandHash = 0;
        for (let i = 0; i < bandSeed.length; i++) {
          bandHash = (bandHash * 31 + bandSeed.charCodeAt(i)) >>> 0;
        }

        binaryBandSignature =
          "BAND-STATE-" + bandHash.toString(16).padStart(8, "0");
      } catch (err) {
        error("[CheckBand v35] FAILED to compute band signature", String(err));
      }

      // WORLD-BAND PROJECTION
      let worldBandProjection = null;
      try {
        worldBandProjection = computeWorldBandProjection({
          finalInstances,
          pulseQuality,
          presenceTier,
          bluetoothPresence
        });
      } catch (err) {
        error("[CheckBand v35] FAILED computeWorldBandProjection", String(err));
      }

      // ADVANTAGE SCORE
      let bandAdvantageScore = null;
      try {
        bandAdvantageScore = computeBandAdvantageScore({
          pulseQuality,
          presenceTier,
          bluetoothPresence,
          finalInstances
        });
      } catch (err) {
        error("[CheckBand v35] FAILED computeBandAdvantageScore", String(err));
      }

      // PRESENCE DRIFT FLAGS
      let presenceDriftFlags = null;
      try {
        presenceDriftFlags = computePresenceDriftFlags({
          pulseQuality,
          presenceTier,
          bluetoothPresence
        });
      } catch (err) {
        error("[CheckBand v35] FAILED computePresenceDriftFlags", String(err));
      }

      // Band session surface
      const bandSessionSurface = buildBandSessionSurface({
        userId,
        deviceTier,
        finalInstances,
        mode: orchestratorMode,
        pulseQuality,
        presenceTier,
        earnMode,
        testEarnActive
      });

      // User band state
      let userBandState;
      try {
        userBandState = buildUserBandState({
          userId,
          baseInstances,
          finalInstances,
          deviceTier,
          earnMode,
          testEarnActive,
          currentWorkers: currentWorkers.length,
          maxAllowed,
          mode: orchestratorMode,
          pulseQuality,
          presenceTier,
          bluetoothPresence,
          degradeFactor,
          binaryBandSignature,
          driftFlags,
          worldBandProjection,
          bandAdvantageScore,
          presenceDriftFlags,
          touchHint,
          bandSessionSurface
        });
      } catch (err) {
        error("[CheckBand v35] FAILED buildUserBandState", String(err));
        continue;
      }

      usersState.push(userBandState);
      userBandCache.set(userId, userBandState);

      // Binary band surface registration
      try {
        const surface = buildBinaryBandSurface(userBandState);
        binarySurfaces.push(surface);
        bandSessionSurfaces.push(bandSessionSurface);

        if (
          worldBinaryCore &&
          typeof worldBinaryCore.registerEntity === "function"
        ) {
          worldBinaryCore.registerEntity(surface);
        }
      } catch (err) {
        error("[CheckBand v35] FAILED build/register BinaryBandSurface", String(err));
      }

      // Snapshot logging
      try {
        await logUserInstanceSnapshot({
          storage,
          userId,
          snapshot: {
            baseInstances,
            finalInstances,
            deviceTier,
            earnMode,
            testEarnActive,
            currentWorkers: currentWorkers.length,
            maxAllowed,
            seq: adrenalSeq,
            mode: orchestratorMode,
            pulseQuality,
            presenceTier,
            bluetoothPresence,
            degradeFactor,
            binaryBandSignature,
            binaryBandDriftFlags: driftFlags,
            worldBandProjection,
            bandAdvantageScore,
            presenceDriftFlags,
            bandSessionSurface
          },
          PulseLineageOverride: PulseLineage,
          Logger: { log, error }
        });
      } catch (err) {
        error("[CheckBand v35] FAILED logUserInstanceSnapshot", String(err));
      }
    }

    // GLOBAL SNAPSHOT
    try {
      lastBandStateSnapshot = buildGlobalBandSnapshot({
        mode: orchestratorMode,
        users: usersState,
        meta: {
          identity: AI_EXPERIENCE_META.identity,
          version: AI_EXPERIENCE_META.version,
          role: AI_EXPERIENCE_META.role,
          layer: AI_EXPERIENCE_META.layer
        }
      });
    } catch (err) {
      error("[CheckBand v35] FAILED buildGlobalBandSnapshot", String(err));
    }

    // OPTIONAL CHUNKED SNAPSHOT
    let chunkedSnapshot = null;
    if (Chunker && typeof Chunker.chunkPayload === "function") {
      try {
        const buffer = Buffer.from(
          JSON.stringify(lastBandStateSnapshot || {}),
          "utf8"
        );
        chunkedSnapshot = Chunker.chunkPayload({
          payload: buffer,
          chunkSize: 64 * 1024,
          baseVersion: "v1",
          sizeOnly: false,
          presenceTag: "worldband-snapshot",
          band: "dual",
          backendKind: "worldband",
          worldBand: "backend",
          chunkProfile: "worldband-snapshot"
        });
      } catch (err) {
        error("[CheckBand v35] FAILED chunking global snapshot", String(err));
      }
    }

    safeLog("tick_complete", {
      users: usersState.length,
      mode: orchestratorMode
    });

    return {
      ok: true,
      snapshot: lastBandStateSnapshot,
      binarySurfaces,
      bandSessionSurfaces,
      chunkedSnapshot
    };
  }

  return {
    meta: AI_EXPERIENCE_META,
    runInstanceOrchestrator,
    getCheckBandStateSnapshot,
    getCheckBandDiagnostics,
    projectWorldBandForUser
  };
}

export default createPulseWorldBandCheckBand;

export function initCheckBand(PulseBand) {

  // ============================================================
  // HANDLERS THAT ACTUALLY MAP TO REAL CHECKBAND FUNCTIONS
  // ============================================================

  function handleTick(payload) {
    // Tick = periodic world-band recalculation
    try {
      createPulseWorldBandCheckBand(payload?.user || null);
    } catch (err) {
      console.warn("[CheckBand::v40] Tick error", err);
    }
  }

  function handleInstance(payload) {
    // Instance = log user snapshot
    try {
      logUserInstanceSnapshot(payload?.instance || null);
    } catch (err) {
      console.warn("[CheckBand::v40] Instance error", err);
    }
  }

  function handleDiagnostics(payload) {
    // Diagnostics = return state + metrics
    try {
      const diag = getCheckBandDiagnostics();
      PulseBand.emit("checkband:diagnostics:response", diag);
    } catch (err) {
      console.warn("[CheckBand::v40] Diagnostics error", err);
    }
  }

  // ============================================================
  // ATTACH LISTENERS TO PULSEBAND
  // ============================================================

  PulseBand.on("pulseband:tick", handleTick);
  PulseBand.on("pulseband:instance", handleInstance);
  PulseBand.on("pulseband:diagnostics", handleDiagnostics);

  // ============================================================
  // RETURN PUBLIC API
  // ============================================================

  return {
    createPulseWorldBandCheckBand,
    projectWorldBandForUser,
    getCheckBandStateSnapshot,
    getCheckBandDiagnostics,
    logUserInstanceSnapshot,
    AI_EXPERIENCE_META,
    ORCHESTRATOR_MODES,
    NORMAL_MAX,
    UPGRADED_MAX,
    HIGHEND_MAX,
    TEST_EARN_MAX,
    UPGRADED_MULT,
    HIGHEND_MULT,
    EARN_MODE_MULT,
    ENABLE_INSTANCE_LOGGING,
    INSTANCE_LOG_COLLECTION,
    PULSE_QUALITY,
    PRESENCE_TIER
  };
}


PulseRealm.PulseBandCheck = {
  createPulseWorldBandCheckBand,
  projectWorldBandForUser,
  getCheckBandStateSnapshot,
  getCheckBandDiagnostics,
  logUserInstanceSnapshot,
  AI_EXPERIENCE_META,
  ORCHESTRATOR_MODES,
  NORMAL_MAX,
  UPGRADED_MAX,
  HIGHEND_MAX,
  TEST_EARN_MAX,
  UPGRADED_MULT,
  HIGHEND_MULT,
  EARN_MODE_MULT,
  ENABLE_INSTANCE_LOGGING,
  INSTANCE_LOG_COLLECTION,
  PULSE_QUALITY,
  PRESENCE_TIER
}

