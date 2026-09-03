/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseRouteMemory-v30.js
LAYER: REFLEX MEMORY ORGAN • v30-IMMORTAL++
===============================================================================
*/
import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

console.log("%c💾 PULSE CORE MEMORY v33 - [PulseBootRouteMemory v30] %cReflex Route Memory Loading..",
  "color:#29B6F6; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;"
);

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




function getBridge() {
  try {
    return PulseRealm.PulseProofBridge || null;
  } catch {
    return null;
  }
}

function getCoreMemory() {
  return PulseCoreGMemory || null;
}

function getDiagnosticsBus() {
  const b = getBridge();
  return b.diagnosticsBus || null;
}

function getEvidenceBus() {
  const b = getBridge();
  return b.evidenceBus || null;
}

const ROUTE_MEMORY_SCHEMA_VERSION = "30.0";

export const RouteMemoryRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "RouteMemory",
  version: "30.0-IMMORTAL++",
  identity: "PulseRouteMemory-v30",

  evo: {
    driftProof: true,
    deterministic: true,
    reflexMemory: true,
    degradationAware: true,
    binaryShadowAware: true,
    routeTraceAware: true,
    coreMemoryAware: true,
    routeAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    tierAware: true,
    channelAware: true,
    futureEvolutionReady: true,

    dualBand: false,
    binaryAware: true,
    symbolicAware: true,

    offlineFirst: true,
    localStoreMirrored: false,
    replayAware: true,

    schemaVersioned: true,
    envelopeAware: true,
    integrityAware: true,
    bulkFlushAware: true,
    evidenceAware: true,
    diagnosticsAware: true,
    portalAware: true,
    touchAware: true,
    uiFlowAware: true,
    errorSpineAware: true,
    overmindAware: true,
    governorAware: true,
    timeAxisAware: true,
    sessionAware: true,
    multiMindAware: true,
    binaryOneBandAware: true
  }
};

function safeNormalizeError(err, origin) {
  try {
    const packet = PulseRealm.PulseUIErrors.normalizeError(err, origin);
    PulseRealm.PulseUIErrors.broadcast(packet);
  } catch {}
}

function rmHashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function buildDnaTag(message, frames, routeTrace) {
  try {
    const base = JSON.stringify({
      message: message || "",
      topFrame: (frames && frames[0]) || null,
      routeTrace: routeTrace || null
    });
    const h = rmHashString(base);
    return "RM30_DNA_" + h.toString(16).padStart(8, "0");
  } catch {
    return "RM30_DNA_UNKNOWN";
  }
}


const ROUTE_MEMORY_DB_NAME = "PulseRouteMemoryDB";
const ROUTE_MEMORY_STORE_NAME = "buffer";
const ROUTE_MEMORY_DB_MAX_ENTRIES = 4000;

function openRouteMemoryDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    const req = indexedDB.open(ROUTE_MEMORY_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(ROUTE_MEMORY_STORE_NAME)) {
        const store = db.createObjectStore(ROUTE_MEMORY_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("ts", "ts", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadRouteMemoryBufferFromDB(limit = ROUTE_MEMORY_DB_MAX_ENTRIES) {
  try {
    const db = await openRouteMemoryDB();
    if (!db) return [];
    const tx = db.transaction(ROUTE_MEMORY_STORE_NAME, "readonly");
    const store = tx.objectStore(ROUTE_MEMORY_STORE_NAME);
    const index = store.index("ts");
    const results = [];
    const req = index.openCursor(null, "next");
    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve(
            results.length > limit
              ? results.slice(results.length - limit)
              : results
          );
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

async function appendRouteMemoryRecordToDB(record) {
  try {
    const db = await openRouteMemoryDB();
    if (!db) return;
    const tx = db.transaction(ROUTE_MEMORY_STORE_NAME, "readwrite");
    const store = tx.objectStore(ROUTE_MEMORY_STORE_NAME);
    store.add(record);
    tx.oncomplete = () => {};
    tx.onerror = () => {};
  } catch {
    // never throw
  }
}

async function clearRouteMemoryDB() {
  try {
    const db = await openRouteMemoryDB();
    if (!db) return;
    const tx = db.transaction(ROUTE_MEMORY_STORE_NAME, "readwrite");
    const store = tx.objectStore(ROUTE_MEMORY_STORE_NAME);
    store.clear();
    tx.oncomplete = () => {};
    tx.onerror = () => {};
  } catch {
    // never throw
  }
}

async function mirrorRouteMemoryToCoreMemory() {
  const Core = getCoreMemory();
  if (!Core || typeof Core.setRouteSnapshot !== "function") return;
  try {
    const buffer = loadRouteMemoryBufferFromDB(ROUTE_MEMORY_DB_MAX_ENTRIES);
    const envelope = {
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
      version: RouteMemoryRole.version,
      routeId: "routeMemory",
      buffer,
      timestamp: PulseRealm.PulseNOW
    };
    Core.setRouteSnapshot("routeMemory", envelope);
  } catch {
    // best-effort only
  }
}

async function appendRouteMemoryEntry(kind, key, envelopeSnapshot) {
  const record = {
    ts: PulseRealm.PulseNOW,
    schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
    kind,
    key,
    envelope: envelopeSnapshot,
    band: "binary_one"
  };

  appendRouteMemoryRecordToDB(record);
  mirrorRouteMemoryToCoreMemory().catch(() => {});

  try {
    const diag = getDiagnosticsBus();
    diag.emit("PulseRouteMemory.record", record);
  } catch {}

  try {
    const evidence = getEvidenceBus();
    evidence.emit("PulseRouteMemory.trace", {
      kind,
      key,
      ts: record.ts,
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION
    });
  } catch {}
}

export const PulseRouteMemoryStore = {
  async getAll() {
    return loadRouteMemoryBufferFromDB(ROUTE_MEMORY_DB_MAX_ENTRIES);
  },
  async clear() {
    clearRouteMemoryDB();
    try {
      const Core = getCoreMemory();
      Core.setRouteSnapshot("routeMemory", {
        schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
        version: RouteMemoryRole.version,
        routeId: "routeMemory",
        buffer: [],
        cleared: true,
        timestamp: PulseRealm.PulseNOW
      });
    } catch {}
  },
  async tail(n = 200) {
    const buf = await loadRouteMemoryBufferFromDB(ROUTE_MEMORY_DB_MAX_ENTRIES);
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  }
};

// FACTORY — v30 IMMORTAL REFLEX ROUTE MEMORY

export function createPulseRouteMemory({
  bucketId = "skinreflex-route-memory",
  log = console.log,
  warn = console.warn
} = {}) {
  const Core = getCoreMemory();

  const RouteMemoryState = {
    bucketId,
    lastKey: null,
    lastEntry: null,
    lastEnvelope: null,
    lastTier: null,
    lastChannel: "ui",
    lastError: null,
    eventSeq: 0
  };

  const DegradationTiers = Object.freeze({
    microDegrade: "microDegrade",
    softDegrade: "softDegrade",
    midDegrade: "midDegrade",
    hardDegrade: "hardDegrade",
    criticalDegrade: "criticalDegrade"
  });

  function nextSeq() {
    RouteMemoryState.eventSeq += 1;
    return RouteMemoryState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      const seq = RouteMemoryState.eventSeq;
      const tier = details.tier || RouteMemoryState.lastTier || "microDegrade";

      const colors = {
        microDegrade: "#00FF9C",
        softDegrade: "#FFE066",
        midDegrade: "#00E5FF",
        hardDegrade: "#FF4FFB",
        criticalDegrade: "#FF3B3B"
      };

      const color = colors[tier] || "#E8F8FF";

      PulseRealm.PulseLog(
  "boot",
        `%c[PulseRouteMemory v30] %c${stage} %c(seq:${seq})`,
        "color:gold; font-weight:bold; font-family:monospace;",
        `color:${color}; font-weight:bold; font-family:monospace;`,
        "color:#E8F8FF; font-family:monospace;"
      );

      if (Object.keys(details).length > 0) {
        PulseRealm.PulseLog(
  "boot",
          "%c↳ Pulse Router Memory Detail Specs:",
          "color:#gold; font-family:monospace; font-weight:bold;"
        );
        PulseRealm.PulseLog(
  "boot",
          "%c" + JSON.stringify(details, null, 2),
          "color:gold; font-family:monospace;"
        );
      }
    } catch {}
  }

  function makeKey(message, frames) {
    try {
      const top = (frames && frames[0]) || "NO_FRAME";
      return message + "::" + top;
    } catch (err) {
      safeNormalizeError(err, "PulseRouteMemory.makeKey");
      return message + "::NO_FRAME";
    }
  }

  function classifyTier(healthScore) {
    try {
      const h = typeof healthScore === "number" ? healthScore : 1.0;

      if (h >= 0.95) return DegradationTiers.microDegrade;
      if (h >= 0.85) return DegradationTiers.softDegrade;
      if (h >= 0.50) return DegradationTiers.midDegrade;
      if (h >= 0.15) return DegradationTiers.hardDegrade;
      return DegradationTiers.criticalDegrade;
    } catch (err) {
      safeNormalizeError(err, "PulseRouteMemory.classifyTier");
      return DegradationTiers.microDegrade;
    }
  }

  function buildEnvelope(key, entry, channel = "ui") {
    return {
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
      role: RouteMemoryRole.identity,
      version: RouteMemoryRole.version,
      bucketId,
      key,
      channel,
      tier: entry.tier,
      degraded: entry.degraded,
      healthScore: entry.healthScore,
      dnaTag: entry.dnaTag,
      entry,
      band: "binary_one",
      timestamp: PulseRealm.PulseNOW
    };
  }

  function unwrapEnvelope(raw) {
    if (!raw) return { envelope: null, entry: null };
    if (raw && typeof raw === "object" && raw.schemaVersion) {
      return { envelope: raw, entry: raw.entry || null };
    }
    return {
      envelope: null,
      entry: raw
    };
  }

  function writeBucket(key, envelope) {
    if (!Core) return;
    try {
      if (typeof Core.getBucket === "function" && typeof Core.setBucket === "function") {
        const bucket = Core.getBucket(bucketId) || {};
        bucket[key] = envelope;
        Core.setBucket(bucketId, bucket);
      }
      if (typeof Core.setRouteSnapshot === "function") {
        Core.setRouteSnapshot(`routeMemory:${bucketId}:${key}`, envelope);
      }
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.corePersist");
    }
  }

  function readBucket(key) {
    if (!Core) return null;
    try {
      if (typeof Core.getBucket === "function") {
        const bucket = Core.getBucket(bucketId) || {};
        return bucket[key] || null;
      }
      if (typeof Core.getRouteSnapshot === "function") {
        return Core.getRouteSnapshot(`routeMemory:${bucketId}:${key}`) || null;
      }
      return null;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.coreRead");
      return null;
    }
  }

  function remember(message, frames, routeTrace, overrides = {}) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const baseHealth = overrides.healthScore ?? 1.0;
      const tier = classifyTier(baseHealth);

      const dnaTag =
        overrides.binaryAware === true
          ? "RM30_BINARY_SHADOW"
          : buildDnaTag(message, frames, routeTrace);

      const entry = {
        seq: RouteMemoryState.eventSeq,
        message,
        frames,
        routeTrace,
        degraded: !!overrides.degraded,
        healthScore: baseHealth,
        tier,
        dnaTag,
        ...overrides
      };

      const channel = overrides.channel || "ui";
      const envelope = buildEnvelope(key, entry, channel);

      RouteMemoryState.lastKey = key;
      RouteMemoryState.lastEntry = entry;
      RouteMemoryState.lastEnvelope = envelope;
      RouteMemoryState.lastTier = tier;
      RouteMemoryState.lastChannel = channel;
      RouteMemoryState.lastError = null;

      writeBucket(key, envelope);
      appendRouteMemoryEntry("remember", key, envelope);

      safeLog("ROUTE_MEMORY_SAVED", {
        key,
        frames: Array.isArray(frames) ? frames.length : 0,
        degraded: entry.degraded,
        healthScore: entry.healthScore,
        tier: entry.tier,
        dnaTag: entry.dnaTag,
        channel
      });

      try {
        const diag = getDiagnosticsBus();
        diag.emit("PulseRouteMemory.remember", {
          key,
          tier,
          degraded: entry.degraded,
          channel,
          dnaTag
        });
      } catch {}
      try {
        const evidence = getEvidenceBus();
        evidence.emit("PulseRouteMemory.envelope", {
          key,
          tier,
          degraded: entry.degraded,
          dnaTag,
          bucketId,
          timestamp: envelope.timestamp
        });
      } catch {}

      return envelope;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.remember");
      safeLog("ROUTE_MEMORY_REMEMBER_ERROR", { error: String(err) });
      return null;
    }
  }

  function markDegraded(
    message,
    frames,
    healthScore = 0.85,
    binaryAware = false,
    channel = "ui"
  ) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const raw = readBucket(key);
      if (!raw) return;

      const { envelope: existingEnvelope, entry: existingEntry } = unwrapEnvelope(raw);
      if (!existingEntry) return;

      const entry = {
        ...existingEntry,
        degraded: true,
        healthScore,
        tier: classifyTier(healthScore),
        dnaTag: binaryAware
          ? "RM30_BINARY_SHADOW_DEGRADED"
          : "RM30_SURFACE_DEGRADED"
      };

      const newEnvelope = buildEnvelope(key, entry, channel);

      writeBucket(key, newEnvelope);

      RouteMemoryState.lastKey = key;
      RouteMemoryState.lastEntry = entry;
      RouteMemoryState.lastEnvelope = newEnvelope;
      RouteMemoryState.lastTier = entry.tier;
      RouteMemoryState.lastChannel = channel;

      appendRouteMemoryEntry("markDegraded", key, newEnvelope);

      safeLog("ROUTE_MEMORY_DEGRADED", {
        key,
        healthScore,
        tier: entry.tier,
        dnaTag: entry.dnaTag,
        channel
      });

      try {
        const diag = getDiagnosticsBus();
        diag.emit("PulseRouteMemory.markDegraded", {
          key,
          tier: entry.tier,
          channel,
          dnaTag: entry.dnaTag
        });
      } catch {}
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.markDegraded");
      safeLog("ROUTE_MEMORY_DEGRADED_ERROR", { error: String(err) });
    }
  }

  function recall(message, frames) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const raw = readBucket(key);
      if (!raw) return null;

      const { envelope, entry } = unwrapEnvelope(raw);
      if (!entry) return null;

      const effectiveEnvelope = envelope || buildEnvelope(key, entry);

      RouteMemoryState.lastKey = key;
      RouteMemoryState.lastEntry = entry;
      RouteMemoryState.lastEnvelope = effectiveEnvelope;
      RouteMemoryState.lastTier = entry.tier;
      RouteMemoryState.lastChannel =
        (effectiveEnvelope && effectiveEnvelope.channel) ||
        RouteMemoryState.lastChannel ||
        "ui";

      safeLog("ROUTE_MEMORY_HIT", {
        key,
        frames: Array.isArray(entry.frames) ? entry.frames.length : 0,
        degraded: entry.degraded,
        healthScore: entry.healthScore,
        tier: entry.tier,
        dnaTag: entry.dnaTag,
        channel: RouteMemoryState.lastChannel
      });

      appendRouteMemoryEntry("recall", key, effectiveEnvelope);

      try {
        const diag = getDiagnosticsBus();
        diag.emit("PulseRouteMemory.recall", {
          key,
          tier: entry.tier,
          degraded: entry.degraded
        });
      } catch {}

      return entry.routeTrace;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.recall");
      safeLog("ROUTE_MEMORY_RECALL_ERROR", { error: String(err) });
      return null;
    }
  }

  function getEntry(message, frames) {
    nextSeq();
    try {
      const key = makeKey(message, frames);
      const raw = readBucket(key);
      if (!raw) return null;

      const { envelope, entry } = unwrapEnvelope(raw);
      const effectiveEnvelope = envelope || buildEnvelope(key, entry || {});

      const out = {
        key,
        envelope: effectiveEnvelope,
        entry: entry || null
      };

      appendRouteMemoryEntry("getEntry", key, effectiveEnvelope);

      try {
        const diag = getDiagnosticsBus();
        diag.emit("PulseRouteMemory.getEntry", {
          key,
          hasEntry: !!entry
        });
      } catch {}

      return out;
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.getEntry");
      safeLog("ROUTE_MEMORY_GETENTRY_ERROR", { error: String(err) });
      return null;
    }
  }

  async function flushBucket() {
    nextSeq();
    try {
      const Core = getCoreMemory();
      if (Core) {
        if (typeof Core.setBucket === "function") {
          Core.setBucket(bucketId, {});
        }
        if (typeof Core.setRouteSnapshot === "function") {
          Core.setRouteSnapshot(`routeMemory:${bucketId}:__FLUSH__`, {
            schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
            version: RouteMemoryRole.version,
            bucketId,
            cleared: true,
            timestamp: PulseRealm.PulseNOW
          });
        }
      }

      clearRouteMemoryDB();

      appendRouteMemoryEntry("flushBucket", bucketId, {
        schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
        bucketId,
        cleared: true
      });

      safeLog("ROUTE_MEMORY_FLUSH_OK", { bucketId });

      try {
        const diag = getDiagnosticsBus();
        diag.emit("PulseRouteMemory.flushBucket", { bucketId });
      } catch {}
      try {
        const evidence = getEvidenceBus();
        evidence.emit("PulseRouteMemory.flushBucket", {
          bucketId,
          timestamp: PulseRealm.PulseNOW
        });
      } catch {}

      return { ok: true };
    } catch (err) {
      RouteMemoryState.lastError = String(err);
      safeNormalizeError(err, "PulseRouteMemory.flushBucket");
      safeLog("ROUTE_MEMORY_FLUSH_ERROR", { bucketId, error: String(err) });
      return { ok: false, error: "FlushError" };
    }
  }

  async function snapshot() {
    nextSeq();
    const snap = {
      schemaVersion: ROUTE_MEMORY_SCHEMA_VERSION,
      bucketId,
      lastKey: RouteMemoryState.lastKey,
      lastTier: RouteMemoryState.lastTier,
      lastChannel: RouteMemoryState.lastChannel,
      lastError: RouteMemoryState.lastError,
      hasEnvelope: !!RouteMemoryState.lastEnvelope
    };

    appendRouteMemoryEntry("snapshot", RouteMemoryState.lastKey, snap);
    safeLog("SNAPSHOT", snap);

    try {
      const diag = getDiagnosticsBus();
      diag.emit("PulseRouteMemory.snapshot", snap);
    } catch {}

    return snap;
  }

  const PulseRouteMemory = {
    RouteMemoryRole,
    RouteMemoryState,
    DegradationTiers,
    remember,
    markDegraded,
    recall,
    getEntry,
    flushBucket,
    snapshot,
    core: getCoreMemory(),
    store: PulseRouteMemoryStore
  };

  safeLog("Reflex Route Memory Initializing..", {
    bucketId,
    version: RouteMemoryRole.version
  });
  console.log("%c💾 PULSE CORE MEMORY v33 - [PulseBootRouteMemory v30] %cReflex Route Memory Created & Spread!",
    "color:#29B6F6; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;"
  );
  return PulseRouteMemory;
}

export default createPulseRouteMemory;

try {

    PulseRealm.PulseRouteMemory = createPulseRouteMemory;
    PulseRealm.PulseRouteMemoryStore = PulseRouteMemoryStore;
  
} catch {}
