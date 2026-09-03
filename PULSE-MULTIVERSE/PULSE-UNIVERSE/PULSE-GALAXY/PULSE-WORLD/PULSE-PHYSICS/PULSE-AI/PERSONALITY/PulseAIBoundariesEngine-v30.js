// ============================================================================
//  v30.0‑IMMORTAL‑EVO++ — BOUNDARIES ENGINE
//  Dual‑Band Superego Fabric + Policy Graph + CoreMemory Drift
//  “SEE EVERYTHING. MUTATE NOTHING. NEVER DRIFT. NEVER ABOVE ALDWYN.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  BoundaryLevels,
  BoundaryModes,
  getBoundariesForPersona,
  canPerformDynamicCached,
  selectBoundaryModeCached,
  getBoundaryArterySnapshot
} from "./PulseAIBoundaries-v30.js";



// ============================================================================
//  INTERNAL HELPERS — v30 IMMORTAL
// ============================================================================

function safeNow() {
  return PulseRealm.PulseNOW;
}

function computeWindowId({ personaId, modeId, context }) {
  const base = context.windowId || `${personaId || "anon"}:${modeId || "default"}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) | 0;
  }
  return "win-" + (h >>> 0).toString(16);
}

function readMemoryVitals(memory) {
  if (!memory) return null;
  try {
    const hot = typeof memory.getHotKeys === "function"
      ? memory.getHotKeys(5)
      : [];
    const meta = memory.Meta || {};
    return {
      hotKeyCount: hot.length || 0,
      lastFlushEpoch: meta.lastFlushEpoch || 0,
      lastLoadEpoch: meta.lastLoadEpoch || 0,
      fallbackUsed: !!meta.fallbackUsed,
      lastBandUsed: meta.lastBandUsed || null,
      version: meta.version || null,
      dnaTag: meta.dnaTag || null,
      driftCount: meta.driftCount || 0
    };
  } catch {
    return null;
  }
}

function readGpuVitals(gpu, binaryVitals) {
  if (!gpu) return null;
  return {
    pressure: binaryVitals.pressure ?? null,
    mode: binaryVitals.mode ?? null,
    session: binaryVitals.session ?? null
  };
}

function readEarnVitals(earn) {
  if (!earn) return null;
  try {
    const meta = typeof earn.getEarnMeta === "function"
      ? earn.getEarnMeta()
      : {};
    return {
      active: !!meta.active,
      lastPayoutEpoch: meta.lastPayoutEpoch || 0,
      openJobs: meta.openJobs || 0,
      recentCompletions: meta.recentCompletions || 0,
      pressure: meta.pressure || 0,
      version: meta.version || null
    };
  } catch {
    return null;
  }
}

function readHeartbeatVitals(heartbeat) {
  if (!heartbeat) return null;
  try {
    const diag = typeof heartbeat.getAiHeartbeatDiagnostics === "function"
      ? heartbeat.getAiHeartbeatDiagnostics()
      : null;
    if (!diag) return null;

    return {
      ticks: diag.artery.ticks ?? 0,
      pulses: diag.artery.pulses ?? 0,
      skips: diag.artery.skips ?? 0,
      lastReason: diag.artery.lastReason ?? "none",
      lastPressure: diag.artery.lastPressure ?? 0,
      lastLoad: diag.artery.lastLoad ?? 0,
      primaryState: diag.primaryState || "unknown"
    };
  } catch {
    return null;
  }
}

// ============================================================================
//  COREMEMORY INTEGRATION — v30++
//  • Still metadata-only
//  • Adds policyGraph + personaContext into signatures
// ============================================================================

function buildCoreMemorySnapshot(memory, {
  personaId,
  mode,
  routeId,
  binaryVitals,
  policyGraph = null,
  personaContext = null
}) {
  if (!memory) return null;
  try {
    const payload = {
      personaId,
      mode,
      routeId,
      binaryVitals,
      policyGraph,
      personaContext
    };

    if (typeof memory.buildSnapshot === "function") {
      return memory.buildSnapshot("BoundariesEngine-v30", payload);
    }
    if (memory.PulseOSMemory && typeof memory.PulseOSMemory.buildSnapshot === "function") {
      return memory.PulseOSMemory.buildSnapshot("BoundariesEngine-v30", payload);
    }
  } catch {
    // best-effort only
  }
  return null;
}

function buildCoreMemoryDrift(memory, {
  personaId,
  mode,
  routeId,
  binaryVitals,
  driftDetected,
  domain,
  action
}) {
  if (!memory || !driftDetected) return null;

  try {
    const pressure = binaryVitals.pressure ?? 0;
    const severity =
      pressure >= 0.97 ? "critical" :
      pressure >= 0.93 ? "high"     :
      pressure >= 0.80 ? "warning"  :
      "info";

    const signature = {
      type: "boundaries_pressure_drift_v30",
      severity,
      details: {
        personaId,
        mode,
        routeId,
        domain,
        action,
        pressure
      }
    };

    if (typeof memory.buildDriftSignature === "function") {
      return memory.buildDriftSignature("BoundariesEngine-v30", signature);
    }
    if (memory.PulseOSMemory && typeof memory.PulseOSMemory.buildDriftSignature === "function") {
      return memory.PulseOSMemory.buildDriftSignature("BoundariesEngine-v30", signature);
    }
  } catch {
    // best-effort only
  }
  return null;
}

// ============================================================================
//  POLICY GRAPH — v30++
//  • Policies as data, not hard-coded branches
//  • Each node can observe but never mutate
// ============================================================================

function buildPolicyGraph({ personaId, mode, binaryVitals }) {
  const pressure = binaryVitals.pressure ?? 0;

  return Object.freeze({
    personaId,
    modeId: mode.id || "unknown",
    nodes: [
      {
        id: "static-boundaries",
        kind: "table",
        weight: 1.0,
        note: "Base persona/domain/action constraints from aiBoundaries-v30."
      },
      {
        id: "pressure-override",
        kind: "guard",
        weight: pressure >= 0.9 ? 1.0 : 0.0,
        note: "High pressure forces SAFE-like behavior regardless of persona."
      },
      {
        id: "owner-subordinate",
        kind: "contract",
        weight: 1.0,
        note: "Engine is subordinate to Aldwyn; cannot escalate privileges."
      }
    ]
  });
}

// ============================================================================
//  PACKET EMITTER — v30++
// ============================================================================

function emitBoundaryPacket(type, payload) {
  const touch = PulseRealm.__PULSE_TOUCH__ || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-boundaries-engine-v30",
      version: touch.version || "v0",
      epoch: touch.epoch || PulseRealm.PulseNOW,
      layer: "boundaries",
      role: "superego",
      owner: "Aldwyn",
      subordinate: true
    },
    packetType: `boundaries-${type}`,
    timestamp: safeNow(),
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30++
// ============================================================================

export function prewarmBoundariesEngineV30({
  trace = false,
  personaId = "architect",
  binaryVitals = { pressure: 0, load: 0 },
  memory = null,
  gpu = null,
  earn = null,
  heartbeat = null,
  context = {}
} = {}) {
  try {
    const mode = selectBoundaryModeCached({
      personaId,
      binaryVitals,
      evoState: {},
      trustArtery: {}
    });

    const windowId        = computeWindowId({ personaId, modeId: mode.id, context });
    const memoryVitals    = readMemoryVitals(memory);
    const gpuVitals       = readGpuVitals(gpu, binaryVitals);
    const earnVitals      = readEarnVitals(earn);
    const heartbeatVitals = readHeartbeatVitals(heartbeat);
    const policyGraph     = buildPolicyGraph({ personaId, mode, binaryVitals });

    const coreMemorySnapshot = buildCoreMemorySnapshot(memory, {
      personaId,
      mode,
      routeId: "boundaries-v30",
      binaryVitals,
      policyGraph,
      personaContext: { windowId }
    });

    const arterySnapshot = getBoundaryArterySnapshot({
      personaId,
      binaryVitals,
      evoState: {},
      trustArtery: {},
      dualBand: null
    });

    const packet = emitBoundaryPacket("prewarm-v30", {
      message: "Boundaries engine v30 prewarmed.",
      personaId,
      mode,
      windowId,
      binaryVitals,
      memoryVitals,
      gpuVitals,
      earnVitals,
      heartbeatVitals,
      policyGraph,
      arterySnapshot,
      coreMemorySnapshot
    });

    if (trace) console.log("[BoundariesEngine-v30] prewarm", packet);
    return packet;
  } catch (err) {
    return emitBoundaryPacket("prewarm-error-v30", {
      error: String(err),
      message: "Boundaries engine v30 prewarm failed."
    });
  }
}

// ============================================================================
//  ENGINE IMPLEMENTATION — v30.0‑IMMORTAL‑EVO++
// ============================================================================

export function createBoundariesEngineV30({
  context = {},
  memory = null,
  overlay = null,
  gpu = null,
  earn = null,
  heartbeat = null,
  dnaTag = "default-dna-v30",
  version = "30.0-Immortal-Evo",
  routeId = "boundaries-v30",
  log = console.log
} = {}) {
  let driftCount = 0;

  function safeTouchPresence() {
    try {
      if (overlay && overlay.touch) {
        overlay.touch(routeId, safeNow());
      } else if (memory && memory.prewarm) {
        memory.prewarm();
      }
    } catch {
      // read-only from engine perspective
    }
  }

  function resolve(personaId, binaryVitals = {}, evoState = {}, trustArtery = {}) {
    safeTouchPresence();

    const mode              = selectBoundaryModeCached({ personaId, binaryVitals, evoState, trustArtery });
    const staticBoundaries  = getBoundariesForPersona(personaId);
    const windowId          = computeWindowId({ personaId, modeId: mode.id, context });
    const memoryVitals      = readMemoryVitals(memory);
    const gpuVitals         = readGpuVitals(gpu, binaryVitals);
    const earnVitals        = readEarnVitals(earn);
    const heartbeatVitals   = readHeartbeatVitals(heartbeat);
    const policyGraph       = buildPolicyGraph({ personaId, mode, binaryVitals });

    const coreMemorySnapshot = buildCoreMemorySnapshot(memory, {
      personaId,
      mode,
      routeId,
      binaryVitals,
      policyGraph,
      personaContext: { windowId }
    });

    const arterySnapshot = getBoundaryArterySnapshot({
      personaId,
      binaryVitals,
      evoState,
      trustArtery,
      dualBand: null
    });

    return emitBoundaryPacket("resolve-v30", {
      personaId,
      mode,
      windowId,
      binaryVitals,
      memoryVitals,
      gpuVitals,
      earnVitals,
      heartbeatVitals,
      static: staticBoundaries,
      policyGraph,
      arterySnapshot,
      coreMemorySnapshot,
      dnaTag,
      version,
      routeId
    });
  }

  function check(personaId, domain, action, binaryVitals = {}, evoState = {}, trustArtery = {}) {
    safeTouchPresence();

    const mode = selectBoundaryModeCached({ personaId, binaryVitals, evoState, trustArtery });

    const allowed = canPerformDynamicCached(
      personaId,
      domain,
      action,
      mode,
      binaryVitals
    );

    const driftDetected = binaryVitals.pressure >= 0.9;
    if (driftDetected) driftCount++;

    const windowId        = computeWindowId({ personaId, modeId: mode.id, context });
    const memoryVitals    = readMemoryVitals(memory);
    const gpuVitals       = readGpuVitals(gpu, binaryVitals);
    const earnVitals      = readEarnVitals(earn);
    const heartbeatVitals = readHeartbeatVitals(heartbeat);
    const policyGraph     = buildPolicyGraph({ personaId, mode, binaryVitals });

    const pressureBand =
      binaryVitals.pressure == null
        ? null
        : binaryVitals.pressure >= 0.97
          ? "critical"
          : binaryVitals.pressure >= 0.93
            ? "high"
            : binaryVitals.pressure >= 0.8
              ? "elevated"
              : "normal";

    const coreMemorySnapshot = buildCoreMemorySnapshot(memory, {
      personaId,
      mode,
      routeId,
      binaryVitals: { ...binaryVitals, pressureBand },
      policyGraph,
      personaContext: { windowId, domain, action }
    });

    const coreMemoryDrift = buildCoreMemoryDrift(memory, {
      personaId,
      mode,
      routeId,
      binaryVitals,
      driftDetected,
      domain,
      action
    });

    const arterySnapshot = getBoundaryArterySnapshot({
      personaId,
      binaryVitals,
      evoState,
      trustArtery,
      dualBand: null
    });

    return emitBoundaryPacket("check-v30", {
      personaId,
      domain,
      action,
      mode,
      windowId,
      binaryVitals: {
        ...binaryVitals,
        pressureBand
      },
      memoryVitals,
      gpuVitals,
      earnVitals,
      heartbeatVitals,
      allowed,
      driftDetected,
      driftCount,
      policyGraph,
      arterySnapshot,
      coreMemorySnapshot,
      coreMemoryDrift,
      dnaTag,
      version,
      routeId
    });
  }

  const touch = PulseRealm.__PULSE_TOUCH__ || {};

  const engine = Object.freeze({
    meta: {
      id: "pulse-touch-boundaries-engine-v30",
      version: touch.version || "v0",
      epoch: touch.epoch || PulseRealm.PulseNOW,
      layer: "boundaries",
      role: "superego",
      owner: "Aldwyn",
      subordinate: true
    },
    resolve,
    check,
    dnaTag,
    version,
    routeId,
    owner: "Aldwyn",
    subordinate: true
  });

  try {
    log("[BoundariesEngine-v30] INIT", engine.meta);
  } catch {}

  return engine;
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
PulseRealm.AIBoundariesEngine = {
    createBoundariesEngineV30,
    prewarmBoundariesEngineV30
}
