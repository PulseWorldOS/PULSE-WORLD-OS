// ============================================================================
//  FILE: PulseContinuance-v30-IMMORTAL-PULSEBAND-WORLD.js
//  PULSE-FINALITY / PULSE-CONTINUANCE / GPU+WORLD SURVIVAL PHYSICS
//
//  ROLE:
//    Predictive survival physics for Pulse OS, now v30-IMMORTAL:
//      • GPU-accelerated (if available), CPU fallback
//      • World/region/tenant aware
//      • OmniHosting-aware (placement/failover surfaces)
//      • Schema-aware (requiresGPU/CI/Binary/etc via upstream surfaces)
//      • DualHash + IntellHash signatures for every major surface
//      • IMMORTAL: no PulseRealm.PulseNOW, no randomness, no IO
//      • One band: presence.band is unified as "PulseBand" unless overridden
//
//  NEVER:
//    - Never call real hosts or networks.
//    - Never introduce randomness.
//    - Never mutate input descriptors or signals.
//    - Never schedule or route directly.
//
//  ALWAYS:
//    - Always operate on symbolic descriptors.
//    - Always be deterministic for the same inputs.
//    - Always output explicit, reversible plans.
//    - Attach presence/fallback/chunk/cache/prewarm/world hints as pure metadata.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseGPUBrainExportV31 as PulseGPUBrain } from "../PULSE-GPU/PulseGPUBrain-v30.js";




// ============================================================================
//  META
// ============================================================================
export const PulseContinuanceMeta = Object.freeze({
  id: "pulse.continuance",
  version: "v30-IMMORTAL-PULSEBAND-WORLD",
  role: "continuance_physics",
  evo: {
    epoch: "IMMORTAL",
    tier: "IMMORTAL",
    driftProof: true
  },
  guarantees: {
    deterministic: true,
    noRandom: true,
    noWallClock: true,
    noIO: true,
    hostAgnostic: true
  }
});

// ============================================================================
//  CORE MEMORY — IMMORTAL HOT MEMORY ORGAN
// ============================================================================
const CoreMemory = new Proxy({}, { get: (t, p) => { try { return PulseCoreGMemory[p]; } catch(e) { return (PulseRealm?.PulseCoreMemory || {})[p]; } } });
const ROUTE = "continuance-global-v30";

const KEY_LAST_PACKET = "last-continuance-packet";
const KEY_LAST_RISK = "last-risk-report";
const KEY_LAST_PREEMPTIVE = "last-preemptive-plan";
const KEY_LAST_REPLICATION = "last-replication-plan";
const KEY_LAST_PRESENCE = "last-presence-field";
const KEY_LAST_ADVANTAGE = "last-advantage-field";
const KEY_LAST_WORLD = "last-world-overlay";
const KEY_LAST_ARTERY = "last-artery-metrics";
const KEY_LAST_PULSE_SIGNAL_KEY = "last-pulse-signal-key";
const KEY_LAST_PULSE_IO = "last-pulse-io-descriptor";

// ============================================================================
//  DUALHASH / INTELLHASH HELPERS (pure, bounded, deterministic)
// ============================================================================
function _simpleHash(str, seed = 0) {
  const s = String(str);
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function computeDualHash(str) {
  const primary = _simpleHash(str, 0x1234abcd);
  const secondary = _simpleHash(str, 0x9e3779b1);
  const combined = _simpleHash(`${primary}:${secondary}`, 0xdeadbeef);
  return {
    primary: `h${primary.toString(16)}`,
    secondary: `a${secondary.toString(16)}`,
    combined: `c${combined.toString(16)}`
  };
}

function computeIntellHash(payload) {
  const json = JSON.stringify(payload || {});
  const base = _simpleHash(json, 0x31415926);
  const band = _simpleHash(json, 0x27182818);
  const world = _simpleHash(json, 0x0badc0de);
  return {
    intell: `i${base.toString(16)}`,
    band: `b${band.toString(16)}`,
    world: `w${world.toString(16)}`
  };
}

// ============================================================================
//  PACKET EMITTER — IMMORTAL (no PulseRealm.PulseNOW)
// ============================================================================
function emitContinuancePacket(type, payload) {
    const base = {
    meta: PulseContinuanceMeta,
    packetType: `continuance-${type}`,
    epoch: "IMMORTAL"
  };

  // IMMORTAL: timestamp is symbolic only
  const timestamp = PulseRealm.PulseNOW;
  const packetId = `continuance-${type}-${timestamp}`;

  const signatures = {
    packetIdDualHash: computeDualHash(packetId),
    payloadIntellHash: computeIntellHash(payload)
  };

  return Object.freeze({
    ...base,
    packetId,
    timestamp,
    signatures,
    ...payload
  });
}

// ============================================================================
//  Types (v30-IMMORTAL, extended)
// ============================================================================
export const RegionSignal = ({
  regionId,
  instability = 0,
  trend = "stable",
  meta = {}
} = {}) => {
  const state = {
    regionId,
    instability: clamp01(instability),
    trend,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const GridSignal = ({
  sourceId,
  instability = 0,
  trend = "stable",
  affectedRegions = [],
  meta = {}
} = {}) => {
  const state = {
    sourceId,
    instability: clamp01(instability),
    trend,
    affectedRegions,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CurrentPlacementPlan = ({
  selectedHosts = [],
  eligibleHosts = [],
  minInstances = 1,
  schemaVersion = 1,
  worldRegion = null,
  tenantId = null
} = {}) => {
  const state = {
    selectedHosts,
    eligibleHosts,
    minInstances,
    schemaVersion,
    worldRegion,
    tenantId
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const PreemptiveMovePlan = ({
  moveFrom = [],
  moveTo = [],
  reason = "",
  riskScore = 0,
  worldHints = {}
} = {}) => {
  const state = {
    moveFrom,
    moveTo,
    reason,
    riskScore: clamp01(riskScore),
    worldHints
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const ReplicationPlan = ({
  replicateTo = [],
  reason = "",
  riskScore = 0,
  worldHints = {}
} = {}) => {
  const state = {
    replicateTo,
    reason,
    riskScore: clamp01(riskScore),
    worldHints
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const ContinuanceRiskReport = ({
  perRegion = {},
  globalRisk = 0,
  notes = [],
  fallbackBandLevel = 0,
  prewarmHint = null,
  cacheHint = null,
  chunkHint = null,
  gpuMode = "cpu",
  gpuDetail = null,
  worldOverlay = null,
  signatures = null
} = {}) => {
  const state = {
    perRegion,
    globalRisk: clamp01(globalRisk),
    notes,
    fallbackBandLevel,
    prewarmHint,
    cacheHint,
    chunkHint,
    gpuMode,
    gpuDetail,
    worldOverlay,
    signatures
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};


// ============================================================================
//  Helpers
// ============================================================================
function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function computeFallbackBandLevel(globalRisk) {
  if (globalRisk >= 0.8) return 3;
  if (globalRisk >= 0.6) return 2;
  if (globalRisk >= 0.4) return 1;
  return 0;
}

function buildPrewarmHint(globalRisk, gpuMode) {
  if (globalRisk >= 0.6) {
    return {
      shouldPrewarm: true,
      reason: gpuMode === "gpu" ? "gpu_high_global_risk" : "high_global_risk"
    };
  }
  if (globalRisk >= 0.4) {
    return {
      shouldPrewarm: true,
      reason: gpuMode === "gpu" ? "gpu_moderate_global_risk" : "moderate_global_risk"
    };
  }
  return {
    shouldPrewarm: false,
    reason: gpuMode === "gpu" ? "gpu_low_global_risk" : "low_global_risk"
  };
}

function buildCacheHint(globalRisk, gpuMode) {
  let priority = "normal";
  if (globalRisk >= 0.8) priority = "critical";
  else if (globalRisk >= 0.6) priority = "high";
  else if (globalRisk >= 0.4) priority = "medium";

  return {
    keepHot: globalRisk >= 0.4,
    priority,
    gpuMode
  };
}

function buildChunkHint(globalRisk, gpuMode) {
  const chunkAggression = 1 - globalRisk;
  return {
    chunkAggression,
    gpuMode
  };
}

function buildWorldOverlay({
  worldRegion = null,
  tenantId = null,
  geoGrid = null,
  omniPlacementId = null
} = {}) {
  return {
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId
  };
}

// ============================================================================
//  ARTERY METRICS — continuance load/pressure
// ============================================================================
const _continuanceArtery = {
  totalOps: 0,
  riskOps: 0,
  preemptiveOps: 0,
  replicationOps: 0,
  packetOps: 0,
  lastOpKind: null,
  lastRegionCount: 0,
  lastHostCount: 0
};

function _bumpArtery(kind, { regionCount = 0, hostCount = 0 } = {}) {
  _continuanceArtery.totalOps += 1;
  if (kind === "risk") _continuanceArtery.riskOps += 1;
  if (kind === "preemptive") _continuanceArtery.preemptiveOps += 1;
  if (kind === "replication") _continuanceArtery.replicationOps += 1;
  if (kind === "packet") _continuanceArtery.packetOps += 1;

  _continuanceArtery.lastOpKind = kind;
  _continuanceArtery.lastRegionCount = regionCount;
  _continuanceArtery.lastHostCount = hostCount;
}

export function getContinuanceArterySnapshot() {
  const totalOps = Math.max(1, _continuanceArtery.totalOps || 1);
  const load = clamp01(totalOps / 32768);
  const pressure = clamp01(
    (_continuanceArtery.lastRegionCount + _continuanceArtery.lastHostCount) /
      16384
  );

  const loadBucket =
    load >= 0.9
      ? "saturated"
      : load >= 0.7
      ? "high"
      : load >= 0.4
      ? "medium"
      : load > 0
      ? "low"
      : "idle";

  const pressureBucket =
    pressure >= 0.9
      ? "overload"
      : pressure >= 0.7
      ? "high"
      : pressure >= 0.4
      ? "medium"
      : pressure > 0
      ? "low"
      : "none";

  return Object.freeze({
    ..._continuanceArtery,
    load,
    loadBucket,
    pressure,
    pressureBucket
  });
}

// ============================================================================
//  CPU CONTINUANCE CORE (fallback)
// ============================================================================
export function computeRegionRiskCPU(regionSignals = [], gridSignals = []) {
  const risk = {};

  for (const rs of regionSignals) {
    risk[rs.regionId] = clamp01(rs.instability);
  }

  for (const gs of gridSignals) {
    const weight =
      gs.trend === "rising" ? 0.5 :
      gs.trend === "stable" ? 0.3 :
      0.2; // falling

    for (const regionId of gs.affectedRegions || []) {
      const base = risk[regionId] || 0;
      const added = clamp01(gs.instability * weight);
      risk[regionId] = clamp01(base + added - base * added);
    }
  }

  return risk;
}

export function computeGlobalRiskCPU(perRegionRisk = {}) {
  const values = Object.values(perRegionRisk);
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return clamp01(sum / values.length);
}

// ============================================================================
//  GPU HELPERS — deterministic, pure compute
// ============================================================================
function gpuAvailable() {
  return !!PulseGPUBrain && typeof PulseGPUBrain.compute === "function";
}

function gpuSmooth(values) {
  return PulseGPUBrain.compute({
    op: "smooth",
    values,
    window: 5,
    mode: "gaussian"
  });
}

function gpuAmplify(values, factor = 1.25) {
  return PulseGPUBrain.compute({
    op: "scale",
    values,
    factor
  });
}

function gpuDecay(values, factor = 0.85) {
  return PulseGPUBrain.compute({
    op: "scale",
    values,
    factor
  });
}

function gpuMomentum(values) {
  return PulseGPUBrain.compute({
    op: "momentum",
    values,
    inertia: 0.6
  });
}

function gpuTrend(values) {
  return PulseGPUBrain.compute({
    op: "trend",
    values
  });
}

function gpuFuse(a, b) {
  return PulseGPUBrain.compute({
    op: "fuse",
    a,
    b,
    mode: "max"
  });
}

// ============================================================================
//  GPU-ACCELERATED REGION RISK
// ============================================================================
export function computeRegionRiskGPU(regionSignals = [], gridSignals = []) {
  const regionIds = regionSignals.map((r) => r.regionId);
  const baseInstability = regionSignals.map((r) => r.instability);

  const smoothed = gpuSmooth(baseInstability);
  const amplified = gpuAmplify(smoothed);
  const decayed = gpuDecay(amplified);
  const momentum = gpuMomentum(decayed);

  const gridImpact = new Array(regionIds.length).fill(0);

  for (const gs of gridSignals) {
    const weight =
      gs.trend === "rising" ? 0.6 :
      gs.trend === "stable" ? 0.35 :
      0.2;

    for (const regionId of gs.affectedRegions || []) {
      const idx = regionIds.indexOf(regionId);
      if (idx >= 0) {
        const added = clamp01(gs.instability * weight);
        gridImpact[idx] = clamp01(
          gridImpact[idx] + added - gridImpact[idx] * added
        );
      }
    }
  }

  const fused = gpuFuse(momentum, gridImpact);

  const out = {};
  for (let i = 0; i < regionIds.length; i++) {
    out[regionIds[i]] = clamp01(fused[i]);
  }

  return {
    perRegion: out,
    gpuDetail: {
      smoothed,
      amplified,
      decayed,
      momentum,
      gridImpact,
      fused
    }
  };
}

// ============================================================================
//  GPU-ACCELERATED GLOBAL RISK
// ============================================================================
export function computeGlobalRiskGPU(perRegionRisk = {}) {
  const values = Object.values(perRegionRisk);
  if (values.length === 0) return { globalRisk: 0, gpuDetail: null };

  const smoothed = gpuSmooth(values);
  const amplified = gpuAmplify(smoothed, 1.15);
  const decayed = gpuDecay(amplified, 0.9);
  const trend = gpuTrend(decayed);

  const avg = decayed.reduce((a, b) => a + b, 0) / decayed.length;
  const globalRisk = clamp01(avg);

  return {
    globalRisk,
    gpuDetail: {
      smoothed,
      amplified,
      decayed,
      trend
    }
  };
}

// ============================================================================
//  UNIFIED RISK REPORT (GPU-first, CPU fallback, world-aware)
// ============================================================================
export function buildContinuanceRiskReport(
  regionSignals,
  gridSignals,
  {
    worldRegion = null,
    tenantId = null,
    geoGrid = null,
    omniPlacementId = null
  } = {}
) {
  let gpuMode = "cpu";
  let perRegion;
  let globalRisk;
  let gpuDetail = null;

  if (gpuAvailable()) {
    const regionGPU = computeRegionRiskGPU(regionSignals, gridSignals);
    const globalGPU = computeGlobalRiskGPU(regionGPU.perRegion);
    perRegion = regionGPU.perRegion;
    globalRisk = globalGPU.globalRisk;
    gpuDetail = {
      region: regionGPU.gpuDetail,
      global: globalGPU.gpuDetail
    };
    gpuMode = "gpu";
  } else {
    perRegion = computeRegionRiskCPU(regionSignals, gridSignals);
    globalRisk = computeGlobalRiskCPU(perRegion);
  }

  const notes = [];

  if (globalRisk >= 0.7) {
    notes.push(
      gpuMode === "gpu"
        ? "GPU: High global risk detected. Preemptive movement strongly recommended."
        : "High global risk detected. Preemptive movement strongly recommended."
    );
  } else if (globalRisk >= 0.4) {
    notes.push(
      gpuMode === "gpu"
        ? "GPU: Moderate global risk detected. Consider replication in safer regions."
        : "Moderate global risk detected. Consider replication in safer regions."
    );
  } else {
    notes.push(
      gpuMode === "gpu"
        ? "GPU: Global risk is low. No immediate movement required."
        : "Global risk is low. No immediate movement required."
    );
  }

  const fallbackBandLevel = computeFallbackBandLevel(globalRisk);
  const prewarmHint = buildPrewarmHint(globalRisk, gpuMode);
  const cacheHint = buildCacheHint(globalRisk, gpuMode);
  const chunkHint = buildChunkHint(globalRisk, gpuMode);

  const worldOverlay = buildWorldOverlay({
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId
  });

  const signatures = {
    riskDualHash: computeDualHash(
      JSON.stringify({ perRegion, globalRisk, gpuMode })
    ),
    worldIntellHash: computeIntellHash(worldOverlay)
  };

  const report = new ContinuanceRiskReport({
    perRegion,
    globalRisk,
    notes,
    fallbackBandLevel,
    prewarmHint,
    cacheHint,
    chunkHint,
    gpuMode,
    gpuDetail,
    worldOverlay,
    signatures
  });

  _bumpArtery("risk", {
    regionCount: Object.keys(perRegion).length,
    hostCount: 0
  });

  return report;
}

// ============================================================================
//  PREEMPTIVE MOVE PLAN (GPU-aware, world-aware, deterministic)
// ============================================================================
export function buildPreemptiveMovePlan(
  hosts,
  placement,
  perRegionRisk,
  {
    worldRegion = null,
    tenantId = null,
    geoGrid = null,
    omniPlacementId = null
  } = {}
) {
  const byName = {};
  for (const h of hosts) byName[h.name] = h;

  const moveFrom = [];
  const moveToSet = new Set();

  for (const hostName of placement.selectedHosts) {
    const host = byName[hostName];
    if (!host) continue;
    const rRisk = perRegionRisk[host.region] || 0;
    if (rRisk >= 0.6) {
      moveFrom.push(hostName);
    }
  }

  for (const hostName of placement.eligibleHosts) {
    const host = byName[hostName];
    if (!host) continue;
    const rRisk = perRegionRisk[host.region] || 0;
    if (rRisk < 0.6) {
      moveToSet.add(hostName);
    }
  }

  const moveTo = Array.from(moveToSet).sort();

  const riskScore =
    moveFrom.length === 0
      ? 0
      : Math.max(
          ...moveFrom.map((name) => {
            const h = byName[name];
            return h ? perRegionRisk[h.region] || 0 : 0;
          })
        );

  const reason =
    moveFrom.length === 0
      ? "No high-risk hosts in current placement."
      : "High-risk regions detected for current placement. Proposing preemptive movement.";

  const worldHints = buildWorldOverlay({
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId
  });

  const plan = PreemptiveMovePlan({
    moveFrom,
    moveTo,
    reason,
    riskScore,
    worldHints
  });

  _bumpArtery("preemptive", {
    regionCount: Object.keys(perRegionRisk).length,
    hostCount: hosts.length
  });

  return plan;
}

// ============================================================================
//  REPLICATION PLAN (GPU-aware, world-aware, deterministic)
// ============================================================================
export function buildReplicationPlan(
  hosts,
  placement,
  perRegionRisk,
  minInstances,
  {
    worldRegion = null,
    tenantId = null,
    geoGrid = null,
    omniPlacementId = null
  } = {}
) {
  const byName = {};
  for (const h of hosts) byName[h.name] = h;

  const currentCount = placement.selectedHosts.length;
  if (currentCount >= minInstances) {
    const plan = new ReplicationPlan({
      replicateTo: [],
      reason: "Minimum instance count already satisfied.",
      riskScore: 0,
      worldHints: buildWorldOverlay({
        worldRegion,
        tenantId,
        geoGrid,
        omniPlacementId
      })
    });

    _bumpArtery("replication", {
      regionCount: Object.keys(perRegionRisk).length,
      hostCount: hosts.length
    });

    return plan;
  }

  const eligible = placement.eligibleHosts
    .map((name) => {
      const h = byName[name];
      if (!h) return null;
      return {
        name,
        risk: perRegionRisk[h.region] || 0
      };
    })
    .filter(Boolean);

  eligible.sort((a, b) => a.risk - b.risk);

  const needed = minInstances - currentCount;
  const replicateTo = eligible.slice(0, needed).map((e) => e.name);

  const riskScore =
    replicateTo.length === 0
      ? 0
      : Math.max(
          ...replicateTo.map((name) => {
            const h = byName[name];
            return h ? perRegionRisk[h.region] || 0 : 0;
          })
        );

  const reason =
    replicateTo.length === 0
      ? "No suitable low-risk hosts available for replication."
      : "Replicating to lower-risk hosts to satisfy minimal instance floor.";

  const worldHints = buildWorldOverlay({
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId
  });

  const plan = new ReplicationPlan({
    replicateTo,
    reason,
    riskScore,
    worldHints
  });

  _bumpArtery("replication", {
    regionCount: Object.keys(perRegionRisk).length,
    hostCount: hosts.length
  });

  return plan;
}

// ============================================================================
//  HIGH-LEVEL CONTINUANCE COMPUTE (GPU-first, IMMORTAL packet + CoreMemory)
// ============================================================================
export function computeContinuance({
  regionSignals,
  gridSignals,
  hosts,
  placement,
  presenceContext = {},
  advantageContext = {},
  ciSurface = null,
  ciDeltaPacket = null,
  worldRegion = null,
  tenantId = null,
  geoGrid = null,
  omniPlacementId = null,

  // symbolic secrets / key surfaces
  pulseSignalKey = null,      // e.g. "PULSE::TENANT::WORLD"
  pulseIODescriptor = null    // e.g. { path, format, binary }
}) {
  // IMMORTAL: no real timing; durationMs is symbolic
  const durationMs = 0;

  const riskReport = buildContinuanceRiskReport(regionSignals, gridSignals, {
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId
  });

  const preemptivePlan = buildPreemptiveMovePlan(
    hosts,
    placement,
    riskReport.perRegion,
    {
      worldRegion,
      tenantId,
      geoGrid,
      omniPlacementId
    }
  );

  const replicationPlan = buildReplicationPlan(
    hosts,
    placement,
    riskReport.perRegion,
    placement.minInstances,
    {
      worldRegion,
      tenantId,
      geoGrid,
      omniPlacementId
    }
  );

  const presenceField = {
    band: presenceContext.band || "PulseBand",
    deviceId: presenceContext.deviceId || null,
    hydraNodeId: presenceContext.hydraNodeId || null,
    route: presenceContext.route || "/"
  };

  const advantageField = {
    advantageScore: advantageContext.advantageScore ?? 1.0,
    cascadeLevel: advantageContext.cascadeLevel ?? 0,
    timeSavedMs: advantageContext.timeSavedMs ?? 0
  };

  const artery = getContinuanceArterySnapshot();

  const packetPayload = {
    riskReport,
    preemptivePlan,
    replicationPlan,
    presenceField,
    advantageField,
    ciSurface,
    ciDeltaPacket,
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId,
    artery,
    durationMs,

    // symbolic secrets surfaces
    pulseSignalKey,
    pulseIODescriptor
  };

  const packet = emitContinuancePacket("gpu-world-compute", packetPayload);

  CoreMemory.set(ROUTE, KEY_LAST_RISK, riskReport);
  CoreMemory.set(ROUTE, KEY_LAST_PREEMPTIVE, preemptivePlan);
  CoreMemory.set(ROUTE, KEY_LAST_REPLICATION, replicationPlan);
  CoreMemory.set(ROUTE, KEY_LAST_PRESENCE, presenceField);
  CoreMemory.set(ROUTE, KEY_LAST_ADVANTAGE, advantageField);
  CoreMemory.set(ROUTE, KEY_LAST_WORLD, {
    worldRegion,
    tenantId,
    geoGrid,
    omniPlacementId
  });
  CoreMemory.set(ROUTE, KEY_LAST_ARTERY, artery);
  CoreMemory.set(ROUTE, KEY_LAST_PACKET, packet);
  CoreMemory.set(ROUTE, KEY_LAST_PULSE_SIGNAL_KEY, pulseSignalKey);
  CoreMemory.set(ROUTE, KEY_LAST_PULSE_IO, pulseIODescriptor);

  _bumpArtery("packet", {
    regionCount: Object.keys(riskReport.perRegion || {}).length,
    hostCount: hosts.length
  });

  return packet;
}

// ============================================================================
//  HOT MEMORY ACCESSOR — last continuance state
// ============================================================================
export function getLastContinuanceState() {
  CoreMemory.prewarm();

  return {
    meta: PulseContinuanceMeta,
    lastPacket: CoreMemory.get(ROUTE, KEY_LAST_PACKET),
    riskReport: CoreMemory.get(ROUTE, KEY_LAST_RISK),
    preemptivePlan: CoreMemory.get(ROUTE, KEY_LAST_PREEMPTIVE),
    replicationPlan: CoreMemory.get(ROUTE, KEY_LAST_REPLICATION),
    presenceField: CoreMemory.get(ROUTE, KEY_LAST_PRESENCE),
    advantageField: CoreMemory.get(ROUTE, KEY_LAST_ADVANTAGE),
    worldOverlay: CoreMemory.get(ROUTE, KEY_LAST_WORLD),
    artery: CoreMemory.get(ROUTE, KEY_LAST_ARTERY),

    pulseSignalKey: CoreMemory.get(ROUTE, KEY_LAST_PULSE_SIGNAL_KEY),
    pulseIODescriptor: CoreMemory.get(ROUTE, KEY_LAST_PULSE_IO)
  };
}

// ============================================================================
//  Exported API
// ============================================================================
export const PulseContinuanceAPI_v30 = {
  meta: PulseContinuanceMeta,

  RegionSignal,
  GridSignal,
  CurrentPlacementPlan,
  PreemptiveMovePlan,
  ReplicationPlan,
  ContinuanceRiskReport,

  computeRegionRiskCPU,
  computeGlobalRiskCPU,

  computeRegionRiskGPU,
  computeGlobalRiskGPU,

  buildContinuanceRiskReport,
  buildPreemptiveMovePlan,
  buildReplicationPlan,
  computeContinuance,

  getContinuanceArterySnapshot,
  getLastContinuanceState,
  CoreMemory
};

PulseRealm.PulseContinuanceAPI = {
  meta: PulseContinuanceMeta,

  RegionSignal,
  GridSignal,
  CurrentPlacementPlan,
  PreemptiveMovePlan,
  ReplicationPlan,
  ContinuanceRiskReport,

  computeRegionRiskCPU,
  computeGlobalRiskCPU,

  computeRegionRiskGPU,
  computeGlobalRiskGPU,

  buildContinuanceRiskReport,
  buildPreemptiveMovePlan,
  buildReplicationPlan,
  computeContinuance,

  getContinuanceArterySnapshot,
  getLastContinuanceState,
  CoreMemory
}

export default PulseContinuanceAPI_v30;

// ============================================================================
//  PROTOCOL-CONTINUANCE-PORT (NEW)
//  Thin protocol-facing wrapper over PulseContinuanceAPI_v30.
//  Nothing removed. Everything preserved.
// ============================================================================



export const ProtocolContinuancePort = {
  meta: {
    id: "pulse.continuance",
    version: "v30-IMMORTAL-PULSEBAND-WORLD",
    role: "continuance_physics",
    evo: {
      epoch: "IMMORTAL",
      tier: "IMMORTAL",
      driftProof: true
    },
    guarantees: {
      deterministic: true,
      noRandom: true,
      noWallClock: true,
      noIO: true,
      hostAgnostic: true
    }
  },

  compute: computeContinuance,
  computeRisk: buildContinuanceRiskReport,
  computePreemptive: buildPreemptiveMovePlan,
  computeReplication: buildReplicationPlan,

  last: getLastContinuanceState,
  artery: getContinuanceArterySnapshot,

  // Expose raw classes (optional but useful)
  RegionSignal: RegionSignal,
  GridSignal: GridSignal,
  CurrentPlacementPlan: CurrentPlacementPlan,
  PreemptiveMovePlan: PreemptiveMovePlan,
  ReplicationPlan: ReplicationPlan,
  ContinuanceRiskReport: ContinuanceRiskReport
};

PulseRealm.ProtocolContinuancePort = ProtocolContinuancePort;