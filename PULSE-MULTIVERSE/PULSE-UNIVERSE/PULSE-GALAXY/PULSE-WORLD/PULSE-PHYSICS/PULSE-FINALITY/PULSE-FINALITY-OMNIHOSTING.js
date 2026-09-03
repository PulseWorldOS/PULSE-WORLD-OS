/**
 * PulseOmniHosting-v30-IMMORTAL-INTELLHOST-SWEEP.js
 * PULSE-FINALITY / PULSE-OMNIHOSTING
 *
 * ROLE:
 *   Universal hosting physics organ for Pulse OS (v30-IMMORTAL).
 *   Decides where organisms run, replicate, fail over, and how they’re hinted
 *   for chunk/cache/prewarm/continuance/CI/binary-delta across the mesh.
 *
 * v30-IMMORTAL-INTELLHOST-SWEEP:
 *   - Extends v20-Immortal-INTELLHOST hosting physics.
 *   - Keeps dual IntellHash for placement/failover/packet signatures.
 *   - IMMORTAL: no PulseRealm.PulseNOW, no randomness, no host mutation.
 *   - World/region/tenant/systemAge/hostAge awareness (symbolic only).
 *   - Placement “intent” + workload class (realtime/batch/gpu/ai/edge).
 *   - Artery history snapshots (last N placements/failovers/packets, bounded).
 *   - Host trend hints (symbolic “getting hotter/colder”).
 *   - One band: presence.band is always "PulseBand" unless explicitly overridden.
 */

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// Optional: schema finality sweep (if present)
const PulseSchemaFinality =
  (PulseRealm.ProtocolSchemaPort && typeof PulseRealm.ProtocolSchemaPort.sweepFinalSchema_v30pp === "function")
    ? PulseRealm.ProtocolSchemaPort
    : null;

// ============================================================================
// CORE MEMORY — IMMORTAL HOT MEMORY ORGAN
// ============================================================================
const CoreMemory = new Proxy({}, { get: (t, p) => { try { return PulseCoreGMemory[p]; } catch(e) { return (PulseRealm?.PulseCoreMemory || {})[p]; } } });
const ROUTE = "omnihosting-global";

const KEY_LAST_PLACEMENT = "last-placement-plan";
const KEY_LAST_FAILOVER = "last-failover-plan";
const KEY_LAST_PACKET = "last-omnihosting-packet";
const KEY_HISTORY = "history"; // bounded history of placement/failover/packets

const HISTORY_LIMIT = 32;

// ============================================================================
// META — ORGAN DESCRIPTION
// ============================================================================

export const PulseOmniHostingMeta = Object.freeze({
  id: "pulse.omnihosting",
  version: "v30-IMMORTAL-INTELLHOST-SWEEP",
  role: "universal_hosting_physics",
  evo: {
    epoch: "IMMORTAL",
    tier: "IMMORTAL",
    driftProof: true
  },
  guarantees: {
    deterministic: true,
    noRandom: true,
    noWallClock: true,
    hostAgnostic: true,
    noHostMutation: true,
    binaryLowestLevel: true
  }
});

// ============================================================================
// INTERNAL: IntellHash (dual hash, deterministic, bounded)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
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

// ============================================================================
// PACKET EMITTER (IMMORTAL: no PulseRealm.PulseNOW)
// ============================================================================
function emitOmniHostingPacket(type, payload) {
  const base = {
    meta: PulseOmniHostingMeta,
    packetType: `omnihosting-${type}`,
    epoch: PulseOmniHostingMeta.evo.epoch
  };

  const signaturePayload = {
    type,
    selectedHosts: payload.placementPlan.selectedHosts || [],
    failoverTargets: payload.failoverPlan.failoverTargets || [],
    schemaVersion:
      payload.placementPlan.schemaVersion ||
      payload.failoverPlan.schemaVersion ||
      null,
    world: payload.worldContext.world || null,
    region: payload.worldContext.region || null,
    tenantId: payload.worldContext.tenantId || null
  };

  const intellHash = computeDualHash(JSON.stringify(signaturePayload));

  return Object.freeze({
    ...base,
    packetId: `omnihosting-${type}-${intellHash.combined}`,
    // IMMORTAL: no wall-clock timestamp
    timestamp: 0,
    intellHash,
    ...payload
  });
}

// ============================================================================
//  HostDescriptor — pseudo‑class IMMORTAL++
// ============================================================================

export const HostDescriptor = ({
  name,
  type,
  region,
  capabilities = {},
  meta = {}
} = {}) => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const state = {
    name,
    type,
    region,

    // v30: extended capability surface (pure booleans)
    capabilities: {
      read: !!capabilities.read,
      write: !!capabilities.write,
      binary: !!capabilities.binary,
      compute: !!capabilities.compute,
      storage: !!capabilities.storage,

      gpu: !!capabilities.gpu,
      ci: !!capabilities.ci,
      ai: !!capabilities.ai,
      burst: !!capabilities.burst,
      premium: !!capabilities.premium,

      // symbolic flags
      edge: !!capabilities.edge,
      cold: !!capabilities.cold,
      realtime: !!capabilities.realtime,
      batch: !!capabilities.batch
    },

    // meta is symbolic-only, untouched
    meta
  };

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  return {
    state,

    getName: () => state.name,
    getType: () => state.type,
    getRegion: () => state.region,
    getCapabilities: () => ({ ...state.capabilities }),
    getMeta: () => ({ ...state.meta }),

    hasCapability: (key) => !!state.capabilities[key],

    describe: () =>
      Object.freeze({
        name: state.name,
        type: state.type,
        region: state.region,
        capabilities: { ...state.capabilities },
        meta: { ...state.meta }
      })
  };
};


// ============================================================================
// Capability Matrix
// ============================================================================
export function buildCapabilityMatrix(hosts = []) {
  const matrix = {};

  for (const host of hosts) {
    const score = computeHostScore(host);
    const tier = bucketHostTier(score);

    matrix[host.name] = {
      type: host.type,
      region: host.region,
      capabilities: { ...host.capabilities },
      score,
      tier,
      trend: computeHostTrendHint(host)
    };
  }

  return matrix;
}

// ============================================================================
// Internal helpers (v30 scoring + hints)
// ============================================================================
function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function computeHostScore(host) {
  const c = host.capabilities || {};
  let score = 0;

  if (c.read) score += 0.05;
  if (c.write) score += 0.05;
  if (c.storage) score += 0.1;
  if (c.binary) score += 0.15;
  if (c.compute) score += 0.2;
  if (c.gpu) score += 0.2;
  if (c.ci) score += 0.15;
  if (c.ai) score += 0.05;
  if (c.burst) score += 0.03;
  if (c.premium) score += 0.02;

  // symbolic boost for realtime/edge
  if (c.realtime) score += 0.03;
  if (c.edge) score += 0.02;

  return clamp01(score);
}

function bucketHostTier(score) {
  if (score >= 0.9) return "immortal";
  if (score >= 0.75) return "prime";
  if (score >= 0.5) return "standard";
  if (score > 0) return "edge";
  return "cold";
}

function computeHostTrendHint(host) {
  const ageMs = host.meta.systemAgeMs;
  if (typeof ageMs !== "number") {
    return { trend: "unknown", ageBucket: "unknown" };
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const days = ageMs / dayMs;

  let ageBucket = "fresh";
  if (days >= 365) ageBucket = "ancient";
  else if (days >= 90) ageBucket = "mature";
  else if (days >= 30) ageBucket = "warm";

  const trend =
    ageBucket === "fresh" ? "warming" :
    ageBucket === "warm" ? "stable" :
    ageBucket === "mature" ? "aging" :
    "legacy";

  return { trend, ageBucket };
}

function computeFallbackBandLevelForPlacement(eligibleCount, minInstances) {
  if (eligibleCount === 0) return 3;
  if (eligibleCount <= minInstances) return 2;
  if (eligibleCount <= minInstances + 1) return 1;
  return 0;
}

function buildPlacementChunkHint(eligibleCount) {
  const max = 10;
  const ratio = Math.max(0, Math.min(1, eligibleCount / max));
  return { chunkAggression: 1 - ratio };
}

function buildPlacementCacheHint(eligibleCount) {
  let priority = "normal";
  if (eligibleCount <= 1) priority = "critical";
  else if (eligibleCount <= 2) priority = "high";
  else if (eligibleCount <= 4) priority = "medium";

  return {
    keepHot: eligibleCount <= 4,
    priority
  };
}

function buildPlacementPrewarmHint(eligibleCount) {
  if (eligibleCount <= 1) {
    return { shouldPrewarm: true, reason: "scarce_eligible_hosts" };
  }
  if (eligibleCount <= 3) {
    return { shouldPrewarm: true, reason: "limited_eligible_hosts" };
  }
  return { shouldPrewarm: false, reason: "sufficient_eligible_hosts" };
}

function computeFallbackBandLevelForFailover(targetCount) {
  if (targetCount === 0) return 3;
  if (targetCount === 1) return 2;
  if (targetCount === 2) return 1;
  return 0;
}

function buildFailoverChunkHint(targetCount) {
  const max = 10;
  const ratio = Math.max(0, Math.min(1, targetCount / max));
  return { chunkAggression: 1 - ratio };
}

function buildFailoverCacheHint(targetCount) {
  let priority = "normal";
  if (targetCount === 0) priority = "critical";
  else if (targetCount === 1) priority = "high";
  else if (targetCount === 2) priority = "medium";

  return {
    keepHot: targetCount <= 2,
    priority
  };
}

function buildFailoverPrewarmHint(targetCount) {
  if (targetCount === 0) {
    return { shouldPrewarm: true, reason: "no_failover_targets" };
  }
  if (targetCount === 1) {
    return { shouldPrewarm: true, reason: "single_failover_target" };
  }
  return { shouldPrewarm: false, reason: "multiple_failover_targets" };
}

// v30: continuance + CI + binary-delta symbolic hint builders
function bucketContinuanceBand(globalRisk = 0) {
  if (globalRisk >= 0.8) return 3;
  if (globalRisk >= 0.6) return 2;
  if (globalRisk >= 0.4) return 1;
  return 0;
}

function buildContinuanceHint(continuanceRiskReport) {
  if (!continuanceRiskReport) {
    return {
      globalRisk: 0,
      band: 0,
      notes: ["no_continuance_risk_report"]
    };
  }

  const globalRisk = clamp01(continuanceRiskReport.globalRisk ?? 0);
  const band = bucketContinuanceBand(globalRisk);

  return {
    globalRisk,
    band,
    notes: Array.isArray(continuanceRiskReport.notes)
      ? continuanceRiskReport.notes.slice()
      : []
  };
}

function buildCIHint(ciSurface) {
  if (!ciSurface) {
    return {
      ciActive: false,
      ciMode: "none",
      ciScore: 0
    };
  }

  return {
    ciActive: true,
    ciMode: ciSurface.mode || "unknown",
    ciScore: clamp01(ciSurface.ciScore ?? 1)
  };
}

function buildBinaryDeltaHint(binaryDeltaPacket) {
  if (!binaryDeltaPacket || !binaryDeltaPacket.delta) {
    return {
      deltaPresent: false,
      addedBits: 0,
      removedBits: 0,
      unchangedBits: 0
    };
  }

  const d = binaryDeltaPacket.delta;
  return {
    deltaPresent: true,
    addedBits: d.addedCount ?? 0,
    removedBits: d.removedCount ?? 0,
    unchangedBits: d.unchangedCount ?? 0
  };
}

function buildArteryMetrics({
  hostsCount,
  eligibleCount,
  minInstances,
  context = "placement"
}) {
  const total = Math.max(1, hostsCount);
  const eligibleRatio = clamp01(eligibleCount / total);
  const load = clamp01(eligibleCount / 1024);
  const pressure = clamp01(minInstances / Math.max(1, eligibleCount || 1));

  const loadBucket =
    load >= 0.9 ? "saturated" :
    load >= 0.7 ? "high" :
    load >= 0.4 ? "medium" :
    load > 0 ? "low" : "idle";

  const pressureBucket =
    pressure >= 0.9 ? "overload" :
    pressure >= 0.7 ? "high" :
    pressure >= 0.4 ? "medium" :
    pressure > 0 ? "low" : "none";

  return {
    context,
    hostsCount,
    eligibleCount,
    eligibleRatio,
    minInstances,
    load,
    loadBucket,
    pressure,
    pressureBucket
  };
}

// ============================================================================
// HISTORY (bounded, symbolic)
// ============================================================================
function pushHistory(entry) {
  const history = CoreMemory.get(ROUTE, KEY_HISTORY) || [];
  const next = history.concat([entry]);
  if (next.length > HISTORY_LIMIT) {
    next.splice(0, next.length - HISTORY_LIMIT);
  }
  CoreMemory.set(ROUTE, KEY_HISTORY, next);
  return next;
}

// ============================================================================
// Placement Logic
// ============================================================================

/**
 * evaluateHostForSchema
 *
 * v30: pure physics, aware of optional schema meta:
 *   pulseSchema.meta.requiresGPU
 *   pulseSchema.meta.requiresCI
 *   pulseSchema.meta.requiresBinary
 *   pulseSchema.meta.requiresCompute
 *   pulseSchema.meta.preferredRegion
 *   pulseSchema.meta.preferredTier
 */
export function evaluateHostForSchema(host, pulseSchema) {
  const fields = pulseSchema.fields || {};
  const meta = pulseSchema.meta || {};

  const requiresBinary =
    meta.requiresBinary === true ||
    Object.values(fields).some((f) => f.type === "binary");

  if (requiresBinary && !host.capabilities.binary) {
    return false;
  }

  const requiresCompute =
    meta.requiresCompute === true ||
    Object.values(fields).some(
      (f) => f.type === "object" || f.type === "array"
    );

  if (requiresCompute && !host.capabilities.compute) {
    return false;
  }

  const requiresGPU = meta.requiresGPU === true;
  if (requiresGPU && !host.capabilities.gpu) {
    return false;
  }

  const requiresCI = meta.requiresCI === true;
  if (requiresCI && !host.capabilities.ci) {
    return false;
  }

  // preferredRegion / preferredTier are symbolic; scoring handles preference
  return true;
}

/**
 * buildPlacementPlan
 *
 * v30 signature:
 *   buildPlacementPlan(hosts, pulseSchema, minInstances = 1, options = {})
 *
 * options:
 *   - presenceContext
 *   - advantageContext
 *   - continuanceRiskReport
 *   - ciSurface
 *   - binaryDeltaPacket
 *   - worldContext: { world, region, tenantId, systemAgeMs }
 *   - intent: "realtime" | "batch" | "gpu" | "ai" | "edge" | "generic"
 */
export function buildPlacementPlan(
  hosts,
  pulseSchema,
  minInstances = 1,
  {
    presenceContext = {},
    advantageContext = {},
    continuanceRiskReport = null,
    ciSurface = null,
    binaryDeltaPacket = null,
    worldContext = {},
    intent = "generic"
  } = {}
) {
  const eligible = hosts.filter((h) =>
    evaluateHostForSchema(h, pulseSchema)
  );

  // deterministic ordering by score desc, then by name
  eligible.sort((a, b) => {
    const sa = computeHostScore(a);
    const sb = computeHostScore(b);
    if (sb !== sa) return sb - sa;
    return a.name.localeCompare(b.name);
  });

  const selected = eligible.slice(0, minInstances);

  const eligibleNames = eligible.map((h) => h.name);
  const selectedNames = selected.map((h) => h.name);

  const fallbackBandLevel = computeFallbackBandLevelForPlacement(
    eligibleNames.length,
    minInstances
  );
  const chunkHint = buildPlacementChunkHint(eligibleNames.length);
  const cacheHint = buildPlacementCacheHint(eligibleNames.length);
  const prewarmHint = buildPlacementPrewarmHint(eligibleNames.length);

  const continuanceHint = buildContinuanceHint(continuanceRiskReport);
  const ciHint = buildCIHint(ciSurface);
  const binaryDeltaHint = buildBinaryDeltaHint(binaryDeltaPacket);

  const artery = buildArteryMetrics({
    hostsCount: hosts.length,
    eligibleCount: eligibleNames.length,
    minInstances,
    context: "placement"
  });

  const hostScores = {};
  const hostTiers = {};
  for (const h of hosts) {
    const score = computeHostScore(h);
    hostScores[h.name] = score;
    hostTiers[h.name] = bucketHostTier(score);
  }

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

  const worldField = {
    world: worldContext.world || "pulse-world",
    region: worldContext.region || null,
    tenantId: worldContext.tenantId || null,
    systemAgeMs: worldContext.systemAgeMs ?? null
  };

  const planCore = {
    selectedHosts: selectedNames,
    eligibleHosts: eligibleNames,
    minInstances,
    schemaVersion: pulseSchema.version,
    intent,

    fallbackBandLevel,
    chunkHint,
    cacheHint,
    prewarmHint,

    presenceField,
    advantageField,
    continuanceHint,
    ciHint,
    binaryDeltaHint,
    artery,

    hostScores,
    hostTiers,
    worldContext: worldField
  };

  const intellHash = computeDualHash(JSON.stringify(planCore));

  const plan = {
    ...planCore,
    intellHash
  };

  CoreMemory.set(ROUTE, KEY_LAST_PLACEMENT, plan);
  pushHistory({ kind: "placement", plan });

  return plan;
}

// ============================================================================
// Failover Logic
// ============================================================================

/**
 * buildFailoverPlan
 *
 * v30 signature:
 *   buildFailoverPlan(hosts, pulseSchema, failedHostName, options = {})
 *
 * options:
 *   - presenceContext
 *   - advantageContext
 *   - continuanceRiskReport
 *   - ciSurface
 *   - binaryDeltaPacket
 *   - worldContext
 *   - intent
 */
export function buildFailoverPlan(
  hosts,
  pulseSchema,
  failedHostName,
  {
    presenceContext = {},
    advantageContext = {},
    continuanceRiskReport = null,
    ciSurface = null,
    binaryDeltaPacket = null,
    worldContext = {},
    intent = "generic"
  } = {}
) {
  const remaining = hosts.filter((h) => h.name !== failedHostName);

  const eligible = remaining.filter((h) =>
    evaluateHostForSchema(h, pulseSchema)
  );

  eligible.sort((a, b) => {
    const sa = computeHostScore(a);
    const sb = computeHostScore(b);
    if (sb !== sa) return sb - sa;
    return a.name.localeCompare(b.name);
  });

  const failoverTargets = eligible.map((h) => h.name);

  const fallbackBandLevel = computeFallbackBandLevelForFailover(
    failoverTargets.length
  );
  const chunkHint = buildFailoverChunkHint(failoverTargets.length);
  const cacheHint = buildFailoverCacheHint(failoverTargets.length);
  const prewarmHint = buildFailoverPrewarmHint(failoverTargets.length);

  const continuanceHint = buildContinuanceHint(continuanceRiskReport);
  const ciHint = buildCIHint(ciSurface);
  const binaryDeltaHint = buildBinaryDeltaHint(binaryDeltaPacket);

  const artery = buildArteryMetrics({
    hostsCount: hosts.length,
    eligibleCount: failoverTargets.length,
    minInstances: 1,
    context: "failover"
  });

  const hostScores = {};
  const hostTiers = {};
  for (const h of hosts) {
    const score = computeHostScore(h);
    hostScores[h.name] = score;
    hostTiers[h.name] = bucketHostTier(score);
  }

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

  const worldField = {
    world: worldContext.world || "pulse-world",
    region: worldContext.region || null,
    tenantId: worldContext.tenantId || null,
    systemAgeMs: worldContext.systemAgeMs ?? null
  };

  const planCore = {
    failedHost: failedHostName,
    failoverTargets,
    schemaVersion: pulseSchema.version,
    intent,

    fallbackBandLevel,
    chunkHint,
    cacheHint,
    prewarmHint,

    presenceField,
    advantageField,
    continuanceHint,
    ciHint,
    binaryDeltaHint,
    artery,

    hostScores,
    hostTiers,
    worldContext: worldField
  };

  const intellHash = computeDualHash(JSON.stringify(planCore));

  const plan = {
    ...planCore,
    intellHash
  };

  CoreMemory.set(ROUTE, KEY_LAST_FAILOVER, plan);
  pushHistory({ kind: "failover", plan });

  return plan;
}

// ============================================================================
// High-level packet wrapper (optionally schema-finality-aware)
// ============================================================================
export function computeOmniHostingPacket({
  placementPlan = null,
  failoverPlan = null,
  worldContext = {},
  // optional: if you want to attach final schema snapshot
  attachFinalSchema = false
} = {}) {
  let finalSchemaSnapshot = null;

  if (attachFinalSchema && PulseSchemaFinality) {
    try {
      finalSchemaSnapshot = PulseSchemaFinality.sweepFinalSchema_v30pp({
        routingContext: {
          regionCode: worldContext.region || null,
          tenantId: worldContext.tenantId || null,
          worldBackend: "worldDataProvider"
        }
      });
    } catch {
      finalSchemaSnapshot = null;
    }
  }

  const packet = emitOmniHostingPacket("compute", {
    placementPlan,
    failoverPlan,
    worldContext,
    finalSchemaSnapshot
  });

  CoreMemory.set(ROUTE, KEY_LAST_PACKET, packet);
  pushHistory({ kind: "packet", packet });

  return packet;
}

// ============================================================================
// HOT MEMORY ACCESSOR
// ============================================================================
export function getLastOmniHostingState() {
  CoreMemory.prewarm();

  return {
    meta: PulseOmniHostingMeta,
    lastPlacementPlan: CoreMemory.get(ROUTE, KEY_LAST_PLACEMENT),
    lastFailoverPlan: CoreMemory.get(ROUTE, KEY_LAST_FAILOVER),
    lastPacket: CoreMemory.get(ROUTE, KEY_LAST_PACKET),
    history: CoreMemory.get(ROUTE, KEY_HISTORY) || []
  };
}

// ============================================================================
// Exported API
// ============================================================================
export const PulseOmniHostingAPI_v30 = {
  Meta: PulseOmniHostingMeta,
  HostDescriptor,
  buildCapabilityMatrix,
  evaluateHostForSchema,
  buildPlacementPlan,
  buildFailoverPlan,
  computeOmniHostingPacket,
  getLastOmniHostingState,
  CoreMemory
};

export default PulseOmniHostingAPI_v30;

PulseRealm.PulseOmniHostingAPI = {
  Meta: PulseOmniHostingMeta,
  HostDescriptor,
  buildCapabilityMatrix,
  evaluateHostForSchema,
  buildPlacementPlan,
  buildFailoverPlan,
  computeOmniHostingPacket,
  getLastOmniHostingState,
  CoreMemory
};
// ============================================================================
//  PROTOCOL-OMNIHOSTING-PORT (NEW)
//  Thin protocol-facing wrapper over PulseOmniHosting IMMORTAL engine.
//  Nothing removed. Everything preserved.
// ============================================================================



export const ProtocolOmniHostingPort = {
  meta: PulseOmniHostingMeta,

  // Host descriptor + capability matrix
  HostDescriptor,
  capabilities: buildCapabilityMatrix,

  // Host evaluation
  evaluateHost: evaluateHostForSchema,

  // Placement + Failover
  placement: buildPlacementPlan,
  failover: buildFailoverPlan,

  // Packet compute (placement + failover + world context)
  computePacket: computeOmniHostingPacket,

  // Last known state (CoreMemory)
  last: getLastOmniHostingState
};

PulseRealm.ProtocolOmniHostingPort = {
  meta: PulseOmniHostingMeta,

  // Host descriptor + capability matrix
  HostDescriptor,
  capabilities: buildCapabilityMatrix,

  // Host evaluation
  evaluateHost: evaluateHostForSchema,

  // Placement + Failover
  placement: buildPlacementPlan,
  failover: buildFailoverPlan,

  // Packet compute (placement + failover + world context)
  computePacket: computeOmniHostingPacket,

  // Last known state (CoreMemory)
  last: getLastOmniHostingState
};
