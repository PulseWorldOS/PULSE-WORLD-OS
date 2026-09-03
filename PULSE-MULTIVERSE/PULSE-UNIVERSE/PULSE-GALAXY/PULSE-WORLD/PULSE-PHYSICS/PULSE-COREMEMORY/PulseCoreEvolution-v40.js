// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseCoreEvolutions-v40.js
// PULSE OS — v40 IMMORTAL
// FULL ORGANISM EVOLUTION ENGINE — PURE COMPUTE, FULLY AWARE, ZERO SIDE EFFECTS
// “THE ORGAN THAT MAKES THE ORGANISM ADAPT, IMPROVE, AND NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
// IMPORT THE REAL ORGANISM OVERLAY (v40)
// ---------------------------------------------------------------------------
import { PulseBinaryOverlayV40 } from "./PulseCoreBinaryOverlay-v40.js";

const EVO_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
let EVO_EPOCH = 0;
const nextEpoch = () => ++EVO_EPOCH;

// ============================================================================
//  v40 Evolution Engine
// ============================================================================
export function createPulseCoreEvolutions({
  overlay = PulseBinaryOverlayV40,   // <— REAL overlay injected
  dnaTag = "default-dna",
  version = "40.0-IMMORTAL-EVOLUTION",
  log    = console.log,
  warn   = console.warn
} = {}) {

  if (!overlay)
    throw new Error("💾 PULSE CORE MEMORY v40 - [PulseCoreEvolutions-v40] Missing overlay");

  // REAL organism organs
  const Governor      = overlay.Governor;
  const CoreMemory    = overlay.CoreMemory;
  const MemoryManager = overlay.MemoryManager;
  const BinaryOverlay = overlay.BinaryOverlay;

  const Evolutions = {
    loaded: true,
    list: [],
    lineage: {},
    driftMap: {},
    advantageMap: {},
    lastLoadEpoch: nextEpoch(),
    lastApplyEpoch: 0
  };

  function safeLog(stage, details = {}) {
    try { log(`💾 PULSE CORE MEMORY v40 - [PulseCoreEvolutions-v40] ${stage}`, details); }
    catch {}
  }

  // -------------------------------------------------------------------------
  // CONTEXT SNAPSHOTS (READ-ONLY)
  // -------------------------------------------------------------------------
  function getContext() {
    return {
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      emergency: MemoryManager?.emergencyMode?.() || false,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      writeAvg: Governor?._pressure?.writeAvg?.() || 0,
      readAvg: Governor?._pressure?.readAvg?.() || 0,
      overlaySignature: BinaryOverlay?.overlaySignature || "no-overlay"
    };
  }

  // -------------------------------------------------------------------------
  // REGISTER EVOLUTION — lineage, scoring, drift tracking
  // -------------------------------------------------------------------------
  function registerEvolution({ id, routeId, delta }) {
    if (!id || !delta || typeof delta !== "object") {
      warn("[PulseCoreEvolutions-v40] INVALID_EVOLUTION", { id, routeId });
      return;
    }

    const now = PulseRealm.PulseNOW;
    const ctx = getContext();

    const evo = {
      id,
      dnaTag,
      routeId: routeId || "global",
      delta,
      timestamp: now,
      ttlMs: EVO_TTL_MS,
      context: ctx
    };

    Evolutions.list.push(evo);

    // lineage tracking
    Evolutions.lineage[id] = {
      created: now,
      routeId: evo.routeId,
      tier: ctx.tier,
      wave: ctx.wave,
      device: ctx.device,
      overlaySignature: ctx.overlaySignature
    };

    // advantage scoring
    Evolutions.advantageMap[id] =
      (ctx.pressure < 0.5 ? 1 : 0) +
      (ctx.tier === "indexeddb" ? 1 : 0) +
      (ctx.wave === "wifi" ? 1 : 0) +
      (ctx.overlaySignature ? 1 : 0);

    // drift tracking
    Evolutions.driftMap[id] = {
      drift: ctx.pressure > 0.8 ? "high" : "low",
      pressure: ctx.pressure,
      tier: ctx.tier,
      overlaySignature: ctx.overlaySignature
    };

    safeLog("REGISTER", { id, routeId, ctx });
  }

  // -------------------------------------------------------------------------
  // FILTER EXPIRED EVOLUTIONS
  // -------------------------------------------------------------------------
  function filterValid(list) {
    const now = PulseRealm.PulseNOW;
    return list.filter(e => now - e.timestamp < EVO_TTL_MS);
  }

  // -------------------------------------------------------------------------
  // APPLY EVOLUTIONS — sorted by advantage + drift + lineage
  // -------------------------------------------------------------------------
  function applyEvolutions(applyFn) {
    if (typeof applyFn !== "function") {
      warn("[PulseCoreEvolutions-v40] APPLY_FN_REQUIRED");
      return;
    }

    const ctx = getContext();

    const sorted = [...Evolutions.list].sort((a, b) => {
      const advA = Evolutions.advantageMap[a.id] || 0;
      const advB = Evolutions.advantageMap[b.id] || 0;
      if (advA !== advB) return advB - advA;

      const driftA = Evolutions.driftMap[a.id]?.pressure || 0;
      const driftB = Evolutions.driftMap[b.id]?.pressure || 0;
      return driftA - driftB;
    });

    for (const evo of sorted) {
      try {
        applyFn({
          id: evo.id,
          routeId: evo.routeId,
          dnaTag: evo.dnaTag,
          delta: evo.delta,
          timestamp: evo.timestamp,
          context: evo.context,
          lineage: Evolutions.lineage[evo.id],
          drift: Evolutions.driftMap[evo.id],
          advantage: Evolutions.advantageMap[evo.id]
        });
      } catch (err) {
        warn("[PulseCoreEvolutions-v40] APPLY_ERROR", {
          evoId: evo.id,
          error: String(err)
        });
      }
    }

    Evolutions.lastApplyEpoch = nextEpoch();
    safeLog("APPLY_DONE", { count: sorted.length, ctx });
  }

  // -------------------------------------------------------------------------
  // CLEAR ALL
  // -------------------------------------------------------------------------
  function clearAll() {
    Evolutions.list = [];
    Evolutions.lineage = {};
    Evolutions.driftMap = {};
    Evolutions.advantageMap = {};
    safeLog("CLEAR_ALL");
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // -------------------------------------------------------------------------
  const PulseCoreEvolutions = {
    Evolutions,
    registerEvolution,
    applyEvolutions,
    clearAll,
    dnaTag,
    version,
    overlay,
    Governor,
    CoreMemory,
    MemoryManager,
    BinaryOverlay
  };

  safeLog("INITIALIZED", { version, dnaTag, context: getContext() });

  return PulseCoreEvolutions;
}

PulseRealm.CoreEvolution = { createPulseCoreEvolutions };
PulseRealm.PulseCoreEvolution = createPulseCoreEvolutions;
