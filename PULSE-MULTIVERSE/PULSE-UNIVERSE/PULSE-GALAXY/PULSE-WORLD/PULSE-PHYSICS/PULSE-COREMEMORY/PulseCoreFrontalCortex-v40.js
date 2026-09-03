// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseCoreFrontalCortex-v40.js
// PULSE OS — v40 IMMORTAL
// FULL RUNTIME INTELLIGENCE ENGINE — PATTERNING, LINEAGE, SCORING, DRIFT CONTROL
// “THINK ONCE. REUSE FOREVER. ADAPT ALWAYS. NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseBinaryOverlayV40 } from "./PulseCoreBinaryOverlay-v40.js";

// ============================================================================
// HASHING + NORMALIZATION
// ============================================================================
function normalizeStruct(struct) {
  try {
    return JSON.stringify(struct, Object.keys(struct).sort());
  } catch {
    return JSON.stringify(struct || {});
  }
}

function patternHash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "patt-" + (h >>> 0).toString(16);
}

let CORTEX_EPOCH = 0;
function nextEpoch() { return ++CORTEX_EPOCH; }

// ============================================================================
// CORTEX v40 — FULL ORGANISM RUNTIME INTELLIGENCE ENGINE
// ============================================================================
export function createPulseCoreBrain({
  overlay = PulseBinaryOverlayV40,
  dnaTag = "default-dna",
  version = "40.0-IMMORTAL-CORTEX",
  coreMemory = null,
  coreMemoryRouteId = "brain-patterns",
  log    = console.log,
  warn   = console.warn
} = {}) {

  if (!overlay) throw new Error("💾 PULSE CORE MEMORY v40 - [PulseCoreFrontalCortex-v40] Missing overlay");

  const Governor      = overlay.Governor;
  const CoreMemory    = coreMemory || overlay.CoreMemory;
  const MemoryManager = overlay.MemoryManager;
  const BinaryOverlay = overlay;

  const Patterns = {
    byId: Object.create(null),
    index: Object.create(null),
    lineage: Object.create(null),
    score: Object.create(null),
    drift: Object.create(null)
  };

  function safeLog(stage, details = {}) {
    try { log(`💾 PULSE CORE MEMORY v40 - [PulseCoreFrontalCortex-v40] ${stage}`, details); }
    catch {}
  }

  // -------------------------------------------------------------------------
  // CONTEXT SNAPSHOT
  // -------------------------------------------------------------------------
  function getContext() {
    return {
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      emergency: MemoryManager?.emergencyMode?.() || false,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      writeAvg: Governor?._pressure?.writeAvg?.() || 0,
      readAvg: Governor?._pressure?.readAvg?.() || 0
    };
  }

  // -------------------------------------------------------------------------
  // LOAD FROM CORE MEMORY
  // -------------------------------------------------------------------------
  function loadFromCoreMemory() {
    if (!CoreMemory?.getRouteSnapshot) return;

    try {
      const snapshot = CoreMemory.getRouteSnapshot(coreMemoryRouteId) || {};
      Patterns.byId   = snapshot.byId   || Object.create(null);
      Patterns.index  = snapshot.index  || Object.create(null);
      Patterns.lineage= snapshot.lineage|| Object.create(null);
      Patterns.score  = snapshot.score  || Object.create(null);
      Patterns.drift  = snapshot.drift  || Object.create(null);

      safeLog("LOAD_FROM_CORE_MEMORY", {
        patterns: Object.keys(Patterns.byId).length
      });
    } catch (err) {
      warn("[PulseCoreFrontalCortex-v40] LOAD_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  // FLUSH TO CORE MEMORY
  // -------------------------------------------------------------------------
  function flushToCoreMemory() {
    if (!CoreMemory?.setRouteSnapshot) return;

    try {
      CoreMemory.setRouteSnapshot(coreMemoryRouteId, {
        byId: Patterns.byId,
        index: Patterns.index,
        lineage: Patterns.lineage,
        score: Patterns.score,
        drift: Patterns.drift
      });

      safeLog("FLUSH_TO_CORE_MEMORY", {
        patterns: Object.keys(Patterns.byId).length
      });
    } catch (err) {
      warn("[PulseCoreFrontalCortex-v40] FLUSH_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  // REGISTER PATTERN — v40 (lineage + scoring + drift)
  // -------------------------------------------------------------------------
  function registerPattern(struct, meta = {}) {
    const normalized = normalizeStruct(struct);
    const existingId = Patterns.index[normalized];

    const ctx = getContext();

    if (existingId) {
      const existing = Patterns.byId[existingId];

      // update drift + score
      Patterns.score[existingId] = (Patterns.score[existingId] || 0) + 1;
      Patterns.drift[existingId] = ctx.pressure;

      return {
        patternId: existingId,
        canonical: existing.canonical,
        reused: true,
        meta: existing.meta,
        context: ctx
      };
    }

    const patternId = patternHash(normalized);
    const createdEpoch = nextEpoch();
    const routeId = meta.routeId || "global";

    const enrichedMeta = {
      ...meta,
      dnaTag,
      version,
      routeId,
      patternId,
      createdEpoch,
      context: ctx
    };

    Patterns.index[normalized] = patternId;
    Patterns.byId[patternId] = {
      canonical: struct,
      meta: enrichedMeta
    };

    // lineage
    Patterns.lineage[patternId] = {
      created: createdEpoch,
      routeId,
      tier: ctx.tier,
      wave: ctx.wave,
      device: ctx.device
    };

    // scoring
    Patterns.score[patternId] =
      (ctx.pressure < 0.5 ? 2 : 0) +
      (ctx.tier === "indexeddb" ? 1 : 0) +
      (ctx.wave === "wifi" ? 1 : 0);

    // drift
    Patterns.drift[patternId] = ctx.pressure;

    // anchor into binary overlay
    try {
      BinaryOverlay.canonicalize({
        kind: "brain-pattern",
        patternId,
        canonical: struct,
        meta: enrichedMeta
      });
    } catch {}

    safeLog("REGISTER_PATTERN", { patternId, routeId, ctx });

    return {
      patternId,
      canonical: struct,
      reused: false,
      meta: enrichedMeta,
      context: ctx
    };
  }

  // -------------------------------------------------------------------------
  // LOOKUP
  // -------------------------------------------------------------------------
  function getPattern(patternId) {
    return Patterns.byId[patternId] || null;
  }

  // -------------------------------------------------------------------------
  // REGISTER FORMULA
  // -------------------------------------------------------------------------
  function registerFormula(formulaStr, meta = {}) {
    return registerPattern({ type: "formula", value: formulaStr }, meta);
  }

  // -------------------------------------------------------------------------
  // CLEAR ALL
  // -------------------------------------------------------------------------
  function clearAll() {
    Patterns.byId = Object.create(null);
    Patterns.index = Object.create(null);
    Patterns.lineage = Object.create(null);
    Patterns.score = Object.create(null);
    Patterns.drift = Object.create(null);

    flushToCoreMemory();
    safeLog("CLEAR_ALL");
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // -------------------------------------------------------------------------
  const PulseCoreBrain = {
    Patterns,
    loadFromCoreMemory,
    flushToCoreMemory,
    registerPattern,
    getPattern,
    registerFormula,
    clearAll,
    dnaTag,
    version,
    coreMemoryRouteId,
    overlay,
    Governor,
    CoreMemory,
    MemoryManager
  };

  loadFromCoreMemory();

  safeLog("INITIALIZED", { version, dnaTag, context: getContext() });

  return PulseCoreBrain;
}

PulseRealm.CoreBrain = { createPulseCoreBrain };
