// ============================================================================
//  aiMemory-v30.js — Pulse OS v30-IMMORTAL-ADVANTAGE+++ Organ
//  Pure PulseCoreMemory Adapter • DualBand-Aware • Binary-Only • Zero Local Storage
//  Memory Artery v7 • Shard-Aware • Windowed Ops Metrics • Trust/Earn/Heartbeat-Aware
//  v30+ UPGRADE: OrganismMap identity • CoreMemory v30 • Signal-aware tracing
//                Binary-first, drift-proof, deterministic-only, no secrets
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Memory Layer Adapter** of Pulse OS (dualband).
//
//    It does NOT own storage.
//    It does NOT cache locally.
//    It does NOT interpret symbolic state.
//    It does NOT touch secrets or tokens.
//
//    It ONLY:
//      • validates binary keys + values
//      • forwards reads/writes to PulseCoreMemory
//      • computes memory artery metrics v7 (throughput, pressure, cost, budget,
//        hot-key density, read/write balance, shard pressure, bias buckets,
//        windowed ops, harmonic load, drift flags)
//      • exposes window-safe memory snapshots
//      • exposes artery snapshots to NodeAdmin/Overmind/Trust/Earn/Heartbeat via reporters
//
//  STORAGE TRUTH:
//    • All real storage lives in PulseCoreMemory-v30 (or compatible).
//    • All caching, speed, and power optimizations are handled by PulseCoreMemory
//      and lower layers — organism-wide, not per-organ.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

// ============================================================================
//  ORGAN IDENTITY + META (v30 IMMORTAL-ADVANTAGE+++)
// ============================================================================

export const MEMORY_IDENTITY = "ai-memory-organ-v30-immortal-advantage+++";

export const MemoryMeta = Object.freeze({
  identity: MEMORY_IDENTITY,
  layer: "organ-memory",
  role: "memory-adapter",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  evo: Object.freeze({
    epoch: 30,
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    binaryFirst: true,
    organismFirst: true,
    readOnlyAdapter: true
  }),
  contracts: Object.freeze({
    readOnlyAdapter: true,
    zeroLocalStorage: true,
    zeroRandomness: true,
    deterministicOnly: true,
    noSecrets: true,
    noTokens: true,
    noExternalWrites: true, // beyond PulseCoreMemory
    binaryOnly: true
  })
});

// Optional surface meta for tracing
export const pulseRole = "PULSE-OS-MEMORY-ADAPTER-v30";
export const surfaceMeta = Object.freeze({
  layer: "organ",
  band: "binary-primary",
  name: "aiMemory-v30"
});

// Lore / experience meta placeholders (for consistency with other organs)
export const pulseLoreContext = Object.freeze({
  family: "PULSE-OS",
  organ: "memory",
  epoch: 30
});

export const AI_EXPERIENCE_META = Object.freeze({
  id: "ai-memory-experience-v30",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  band: "binary-primary"
});

export const EXPORT_META = Object.freeze({
  esm: true,
  cjs: true,
  dualMode: true,
  organ: MEMORY_IDENTITY
});

// ============================================================================
//  GLOBAL MEMORY ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ============================================================================

const _globalMemoryArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}#${shardId || "root"}`
 */
function _registryKey(id, instanceIndex, shardId) {
  return `${id || MemoryMeta.identity}#${instanceIndex}#${shardId || "root"}`;
}

export function getGlobalMemoryArteries() {
  const out = {};
  for (const [k, v] of _globalMemoryArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  v30 SIGNAL-AWARE TRACE LAYER (optional, non-fatal)
// ============================================================================

function traceMemoryEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[aiMemory-v30] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "memory-adapter",
      message,
      extra: payload || {},
      system: pulseRole,
      organ: MemoryMeta.identity,
      layer: surfaceMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  PACKET EMITTER — deterministic, memory-scoped
// ============================================================================

function emitMemoryPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: MemoryMeta,
    packetType: `memory-${type}`,
    packetId: `memory-${type}-${now}`,
    timestamp: now,
    epoch: MemoryMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================

export function prewarmAIMemory({ trace = false } = {}) {
  const packet = emitMemoryPacket("prewarm", {
    message:
      "Memory adapter v30 prewarmed, artery v7 metrics aligned, registry ready, CoreMemory v30 bound."
  });

  traceMemoryEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ARTERY BUCKET HELPERS — v7
// ============================================================================

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function bucketBias(ratio) {
  if (ratio === 0) return "idle";
  if (ratio < 0.5) return "write-heavy";
  if (ratio > 2.0) return "read-heavy";
  return "balanced";
}

function bucketHotKeyRatio(r) {
  if (r >= 0.8) return "hot-concentrated";
  if (r >= 0.4) return "hot-mixed";
  if (r > 0) return "hot-sparse";
  return "no-hot-keys";
}
// ============================================================================
//  AIMemory — pseudo‑class IMMORTAL style
// ============================================================================

// module‑level instance registry (replaces static on class)
let _AIMemoryInstanceCount = 0;

const _registerAIMemoryInstance = () => {
  const idx = _AIMemoryInstanceCount;
  _AIMemoryInstanceCount += 1;
  return idx;
};

export const getAIMemoryInstanceCount = () =>
  typeof _AIMemoryInstanceCount === "number" ? _AIMemoryInstanceCount : 0;

// ============================================================================
//  AIMemory factory
// ============================================================================
export const AIMemory = (config = {}) => {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const state = {
    id: config.id || MemoryMeta.identity,

    core: config.core || PulseCoreGMemory,
    trace: !!config.trace,

    maxBits: config.maxBits || 8192,

    nodeAdminReporter:
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null,

    overmindReporter:
      typeof config.overmindReporter === "function"
        ? config.overmindReporter
        : null,

    trustReporter:
      typeof config.trustReporter === "function"
        ? config.trustReporter
        : null,

    earnReporter:
      typeof config.earnReporter === "function"
        ? config.earnReporter
        : null,

    heartbeatReporter:
      typeof config.heartbeatReporter === "function"
        ? config.heartbeatReporter
        : null,

    shardId: typeof config.shardId === "string" ? config.shardId : "root",

    instanceIndex: _registerAIMemoryInstance(),

    windowMs:
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000,

    _windowStart: PulseRealm.PulseNOW,
    _windowReads: 0,
    _windowWrites: 0,
    _windowDeletes: 0,
    _windowSnapshots: 0,

    _totalReads: 0,
    _totalWrites: 0,
    _totalDeletes: 0,
    _totalSnapshots: 0,

    _hotKeyHits: 0,
    _windowHotKeyHits: 0,

    _lastArterySnapshot: null
  };

  if (
    !state.core ||
    typeof state.core.writeBinary !== "function" ||
    typeof state.core.readBinary !== "function"
  ) {
    throw new Error(
      "AIMemory v30 requires PulseCoreMemory with writeBinary(key, value) and readBinary(key)"
    );
  }

  // --------------------------------------------------------------------------
  // INTERNAL HELPERS
  // --------------------------------------------------------------------------
  const _assertBinary = (str) => {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  };

  const _trace = (event, payload) => {
    traceMemoryEvent(event, payload, state.trace);
  };

  const _rollWindow = (now) => {
    if (now - state._windowStart >= state.windowMs) {
      state._windowStart = now;
      state._windowReads = 0;
      state._windowWrites = 0;
      state._windowDeletes = 0;
      state._windowSnapshots = 0;
      state._windowHotKeyHits = 0;
    }
  };

  // --------------------------------------------------------------------------
  //  ARTERY METRICS — v7
  // --------------------------------------------------------------------------
  const _computeMemoryThroughput = (segmentCount, avgSize) => {
    const countFactor = Math.min(1, segmentCount / 200);
    const sizeFactor = Math.min(1, avgSize / state.maxBits);
    const raw = Math.max(0, 1 - (countFactor * 0.5 + sizeFactor * 0.5));
    return Math.min(1, raw);
  };

  const _computeMemoryPressure = (totalBits, maxBits) => {
    const raw = Math.min(1, totalBits / maxBits);
    return Math.max(0, raw);
  };

  const _computeMemoryCost = (pressure, throughput) => {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  };

  const _computeMemoryBudget = (throughput, cost) => {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  };

  const _computeMemoryArtery = () => {
    const now = PulseRealm.PulseNOW;
    _rollWindow(now);

    const meta = state.core.getBinaryMeta
      ? state.core.getBinaryMeta(state.shardId)
      : { segmentCount: 0, totalBits: 0, avgSize: 0, hotKeys: 0, shardCount: 1 };

    const segmentCount = meta.segmentCount || 0;
    const totalBits = meta.totalBits || 0;
    const avgSize = meta.avgSize || 0;
    const shardCount = meta.shardCount || 1;
    const hotKeys = meta.hotKeys || 0;

    const throughput = _computeMemoryThroughput(segmentCount, avgSize);
    const pressure = _computeMemoryPressure(totalBits, state.maxBits);
    const cost = _computeMemoryCost(pressure, throughput);
    const budget = _computeMemoryBudget(throughput, cost);

    const elapsedMs = Math.max(1, now - state._windowStart);
    const opsInWindow =
      state._windowReads +
      state._windowWrites +
      state._windowDeletes +
      state._windowSnapshots;

    const opsPerSec = (opsInWindow / elapsedMs) * 1000;
    const instanceCount = getAIMemoryInstanceCount();
    const harmonicLoad =
      instanceCount > 0 ? opsPerSec / instanceCount : opsPerSec;

    const hotKeyRatio =
      segmentCount > 0 ? Math.min(1, hotKeys / segmentCount) : 0;

    const readWriteRatio =
      state._windowWrites > 0
        ? Math.min(4, state._windowReads / state._windowWrites)
        : state._windowReads > 0
        ? 4
        : 0;

    const biasBucket = bucketBias(
      state._windowWrites > 0
        ? state._windowReads / state._windowWrites
        : state._windowReads > 0
        ? 4
        : 0
    );

    const hotKeyBucket = bucketHotKeyRatio(hotKeyRatio);

    const artery = {
      throughput,
      throughputBucket: bucketLevel(throughput),

      pressure,
      pressureBucket: bucketPressure(pressure),

      cost,
      costBucket: bucketCost(cost),

      budget,
      budgetBucket: bucketLevel(budget),

      segmentCount,
      totalBits,
      avgSize,

      shardId: state.shardId,
      shardCount,

      hotKeys,
      hotKeyRatio,
      hotKeyBucket,

      windowMs: state.windowMs,
      windowReads: state._windowReads,
      windowWrites: state._windowWrites,
      windowDeletes: state._windowDeletes,
      windowSnapshots: state._windowSnapshots,
      windowHotKeyHits: state._windowHotKeyHits,

      totalReads: state._totalReads,
      totalWrites: state._totalWrites,
      totalDeletes: state._totalDeletes,
      totalSnapshots: state._totalSnapshots,
      opsPerSec,
      harmonicLoad,
      readWriteRatio,
      readWriteBiasBucket: biasBucket,

      instanceIndex: state.instanceIndex,
      instanceCount,
      id: state.id,
      timestamp: now
    };

    const key = _registryKey(state.id, state.instanceIndex, state.shardId);
    _globalMemoryArteryRegistry.set(key, artery);

    state._lastArterySnapshot = artery;

    const metaForReport = {
      id: state.id,
      shardId: state.shardId,
      instanceIndex: state.instanceIndex,
      epoch: MemoryMeta.evo.epoch
    };

    if (state.nodeAdminReporter) {
      try {
        state.nodeAdminReporter(artery, metaForReport);
      } catch (err) {
        _trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    if (state.overmindReporter) {
      try {
        state.overmindReporter(artery, metaForReport);
      } catch (err) {
        _trace("overmind:reporter:error", { error: String(err) });
      }
    }

    if (state.trustReporter) {
      try {
        state.trustReporter(artery, metaForReport);
      } catch (err) {
        _trace("trust:reporter:error", { error: String(err) });
      }
    }

    if (state.earnReporter) {
      try {
        state.earnReporter(artery, metaForReport);
      } catch (err) {
        _trace("earn:reporter:error", { error: String(err) });
      }
    }

    if (state.heartbeatReporter) {
      try {
        state.heartbeatReporter(artery, metaForReport);
      } catch (err) {
        _trace("heartbeat:reporter:error", { error: String(err) });
      }
    }

    return artery;
  };

  const getMemoryArterySnapshot = () => _computeMemoryArtery();

  // --------------------------------------------------------------------------
  //  SHARDED KEY HELPERS
  // --------------------------------------------------------------------------
  const _withShard = (keyBin) => {
    return { shardId: state.shardId, keyBin };
  };

  // --------------------------------------------------------------------------
  //  WRITE
  // --------------------------------------------------------------------------
  const write = (keyBin, valueBin) => {
    _assertBinary(keyBin);
    _assertBinary(valueBin);

    let toStore = valueBin;
    if (toStore.length > state.maxBits) {
      _trace("write:truncated", {
        keyBits: keyBin.length,
        originalBits: toStore.length
      });
      toStore = toStore.slice(-state.maxBits);
    }

    const { shardId, keyBin: k } = _withShard(keyBin);

    if (state.core.writeBinary.length === 3) {
      state.core.writeBinary(shardId, k, toStore);
    } else {
      state.core.writeBinary(k, toStore);
    }

    state._totalWrites += 1;
    state._windowWrites += 1;

    const artery = _computeMemoryArtery();
    _trace("write", {
      keyBits: k.length,
      valueBits: toStore.length,
      shardId,
      artery
    });

    const packet = emitMemoryPacket("write", {
      keyBits: k.length,
      valueBits: toStore.length,
      shardId,
      artery
    });

    traceMemoryEvent("write", packet, state.trace);
    return packet;
  };

  // --------------------------------------------------------------------------
  //  READ
  // --------------------------------------------------------------------------
  const read = (keyBin) => {
    _assertBinary(keyBin);

    const { shardId, keyBin: k } = _withShard(keyBin);

    let value;
    if (state.core.readBinary.length === 2) {
      value = state.core.readBinary(shardId, k);
    } else {
      value = state.core.readBinary(k);
    }

    state._totalReads += 1;
    state._windowReads += 1;

    if (value && value.length > 0) {
      state._hotKeyHits += 1;
      state._windowHotKeyHits += 1;
    }

    const artery = _computeMemoryArtery();
    _trace("read", {
      keyBits: k.length,
      valueBits: value ? value.length : 0,
      shardId,
      artery
    });

    const packet = emitMemoryPacket("read", {
      keyBits: k.length,
      valueBits: value ? value.length : 0,
      shardId,
      found: !!value,
      artery
    });

    traceMemoryEvent("read", packet, state.trace);
    return value;
  };

  // --------------------------------------------------------------------------
  //  DELETE
  // --------------------------------------------------------------------------
  const deleteKey = (keyBin) => {
    _assertBinary(keyBin);

    const { shardId, keyBin: k } = _withShard(keyBin);

    let existed = false;
    if (state.core.deleteBinary) {
      if (state.core.deleteBinary.length === 2) {
        existed = state.core.deleteBinary(shardId, k);
      } else {
        existed = state.core.deleteBinary(k);
      }
    }

    state._totalDeletes += 1;
    state._windowDeletes += 1;

    const artery = _computeMemoryArtery();
    _trace("delete", { keyBits: k.length, shardId, existed, artery });

    const packet = emitMemoryPacket("delete", {
      keyBits: k.length,
      existed,
      shardId,
      artery
    });

    traceMemoryEvent("delete", packet, state.trace);
    return packet;
  };

  // --------------------------------------------------------------------------
  //  LIST KEYS
  // --------------------------------------------------------------------------
  const listKeys = () => {
    let keys = [];

    if (state.core.listBinaryKeys) {
      if (state.core.listBinaryKeys.length === 1) {
        keys = state.core.listBinaryKeys(state.shardId) || [];
      } else {
        keys = state.core.listBinaryKeys() || [];
      }
    }

    const artery = _computeMemoryArtery();
    _trace("listKeys", {
      keyCount: keys.length,
      shardId: state.shardId,
      artery
    });

    const packet = emitMemoryPacket("list-keys", {
      shardId: state.shardId,
      keyCount: keys.length,
      artery
    });

    traceMemoryEvent("listKeys", packet, state.trace);
    return keys;
  };

  // --------------------------------------------------------------------------
  //  SNAPSHOT
  // --------------------------------------------------------------------------
  const snapshot = () => {
    let out = "";

    if (state.core.snapshotBinary) {
      if (state.core.snapshotBinary.length === 2) {
        out = state.core.snapshotBinary(state.shardId, state.maxBits) || "";
      } else {
        out = state.core.snapshotBinary(state.maxBits) || "";
      }
    } else {
      const keys = listKeys().slice().sort();
      for (const key of keys) {
        const val =
          state.core.readBinary.length === 2
            ? state.core.readBinary(state.shardId, key) || ""
            : state.core.readBinary(key) || "";
        out += key + val;
      }
    }

    if (out.length > state.maxBits) {
      _trace("snapshot:truncated", { originalBits: out.length });
      out = out.slice(-state.maxBits);
    }

    state._totalSnapshots += 1;
    state._windowSnapshots += 1;

    const artery = _computeMemoryArtery();
    _trace("snapshot", {
      bits: out.length,
      shardId: state.shardId,
      artery
    });

    const packet = emitMemoryPacket("snapshot", {
      shardId: state.shardId,
      bits: out.length,
      artery
    });

    traceMemoryEvent("snapshot", packet, state.trace);
    return out;
  };

  // --------------------------------------------------------------------------
  //  ARTERY SNAPSHOT PACKET + LAST ARTERY
  // --------------------------------------------------------------------------
  const snapshotArteryPacket = () => {
    const artery = _computeMemoryArtery();
    const packet = emitMemoryPacket("artery-snapshot", {
      shardId: state.shardId,
      artery
    });

    traceMemoryEvent("snapshotArteryPacket", packet, state.trace);
    return packet;
  };

  const lastArtery = () => {
    return state._lastArterySnapshot
      ? { ...state._lastArterySnapshot }
      : _computeMemoryArtery();
  };

  // --------------------------------------------------------------------------
  //  PUBLIC API
  // --------------------------------------------------------------------------
  return {
    state,
    write,
    read,
    delete: deleteKey,
    listKeys,
    snapshot,
    snapshotArteryPacket,
    lastArtery,
    getMemoryArterySnapshot
  };
};


// ============================================================================
//  FACTORY — pseudo‑class style
// ============================================================================
export const createAIMemory = (config = {}) =>
  AIMemory(config);


// ============================================================================
//  ORGAN EXPORT — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================

export const aiMemory = Object.freeze({
  meta: MemoryMeta,
  create: createAIMemory
});

// ============================================================================
//  DUAL-MODE EXPORTS (ESM + CommonJS)
// ============================================================================

PulseRealm.AIMemory = {
    MEMORY_IDENTITY,
    MemoryMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    AIMemory,
    createAIMemory,
    prewarmAIMemory,
    getGlobalMemoryArteries,
    aiMemory
}
