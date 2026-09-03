// ============================================================================
//  PulseOSGovernor-v30-IMMORTAL-SPINE++++.js
//  Global Loop, Re-entry & Multi-Instance Governor (v30-IMMORTAL-SPINE++++)
//  - No routing
//  - No sending
//  - Pure guards + dynamic multi-instance slicing context
//  - Optional EarnReflex hook (PulseRealm.PulseEarnReflex)
//  - Optional ReflexRouter hook (PulseRealm.PulseEarnReflexRouter)
//  - Dual-band aware (symbolic + binary pulses)
//  - Band-family aware (pulseband + meshband)
//  - Presence-aware (metadata only)
//  - Chunk/prewarm/advantage-aware (metadata only)
//  - IMMORTAL, drift-proof, determinism-first
// ============================================================================


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
// Internal governor state (IMMORTAL, process-local only)
// ---------------------------------------------------------------------------
const activeOrgans = new Set();
const activeModules = new Set();
const pulseVisits = new Map();
const instanceRegistry = new Map();

// v30++++: same safe caps, explicit
const MAX_LINEAGE_DEPTH = 24;
const MAX_RETURN_TO_DEPTH = 12;
const MAX_FALLBACK_DEPTH = 2;

// ---------------------------------------------------------------------------
// Band + band-family helpers
// ---------------------------------------------------------------------------
const BAND_FAMILY = {
  PULSEBAND: "PulseBand",
  MESHBAND: "meshband"
};

function normalizeBand(band) {
  const b = String(band || "dual").toLowerCase();
  if (b === "binary" || b === "bit" || b === "band_binary") return "binary";
  if (b === "symbolic" || b === "band_symbolic") return "symbolic";
  return "dual";
}

function normalizeBandFamily(family) {
  const f = String(family || BAND_FAMILY.PULSEBAND).toLowerCase();
  return f === BAND_FAMILY.MESHBAND ? BAND_FAMILY.MESHBAND : BAND_FAMILY.PULSEBAND;
}

function classifyBand(pulseOrImpulse) {
  return normalizeBand(pulseOrImpulse.band || pulseOrImpulse.mode || null);
}

function classifyBandFamily(pulseOrImpulse) {
  return normalizeBandFamily(pulseOrImpulse.bandFamily || pulseOrImpulse.meshBand);
}

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------
const getPulseId = (pulse) =>
    pulse.pulseId ||
    pulse.id ||
    pulse.tickId ||
    pulse.jobId ||
    "UNKNOWN_PULSE";

function getLineageDepth(pulseOrImpulse) {
  const lineage = pulseOrImpulse.lineage || pulseOrImpulse.parentLineage || [];
  return Array.isArray(lineage) ? lineage.length : 0;
}

function getReturnToDepth(pulseOrImpulse) {
  const rt = pulseOrImpulse.returnTo;
  if (!rt) return 0;
  if (Array.isArray(rt)) return rt.length;
  return 1;
}

function getFallbackDepth(pulseOrImpulse) {
  const fb = pulseOrImpulse.fallback || pulseOrImpulse.fallbackDepth;
  if (!fb) return 0;
  if (typeof fb === "number") return fb;
  return 1;
}

function getInstanceKey(organName, pulseOrImpulse) {
  const pulseId = getPulseId(pulseOrImpulse);
  return `${organName}::${pulseId}`;
}

// ---------------------------------------------------------------------------
// Governor context (v30++++, but kept under V24 name for compatibility)
// ---------------------------------------------------------------------------
const GOVERNOR_CONTEXT_V24 = {
  epoch: "v30-IMMORTAL-SPINE++++",
  deterministic: true,
  driftProof: true,
  dualBandAware: true,
  bandFamilyAware: true,
  presenceAware: true,
  meshAware: true,
  advantageAware: true
};

// ---------------------------------------------------------------------------
// Advantage + presence metadata (pure tagging)
// ---------------------------------------------------------------------------
function buildGovernorMeta(pulseOrImpulse, instanceContext) {
  const advantage = pulseOrImpulse.advantage || {};
  const presence = pulseOrImpulse.presence || {};
  const routeName = pulseOrImpulse.routeName || null;

  return {
    routeName,
    advantageTier: advantage.tier || "unknown",
    deviceTier: advantage.deviceTier || "unknown",
    networkTier: advantage.networkTier || "unknown",
    gpuTier: advantage.gpuTier || "unknown",
    presenceCritical: !!presence.critical,
    presenceFieldRequested: !!presence.field,
    meshPresenceRequested: !!presence.mesh,
    instanceIndex: instanceContext.instanceIndex,
    totalInstances: instanceContext.totalInstances
  };
}

// ---------------------------------------------------------------------------
// OPTIONAL: Emit EarnReflex + Route it if router is present
// ---------------------------------------------------------------------------
async function maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext) {
  try {
    if (typeof window === "undefined") return;

    const reflex = PulseRealm.PulseEarnReflex;
    if (!reflex || typeof reflex.fromGovernorEvent !== "function") return;

    const { earnReflex } = await reflex.fromGovernorEvent(
      event,
      pulseOrImpulse,
      instanceContext
    );

    const router = PulseRealm.PulseEarnReflexRouter;
    const earn = PulseRealm.PulseWorld.Earn;

    if (router && typeof router.route === "function" && earn) {
      router.route(earnReflex, earn);
    }
  } catch {
    // fail-open: governor must never break
  }
}

// ---------------------------------------------------------------------------
//  Organ-level guard — v30++++
// ---------------------------------------------------------------------------
export async function withOrganGuard(organName, pulseOrImpulse, fn) {
  const pulseId = getPulseId(pulseOrImpulse);
  const instanceKey = getInstanceKey(organName, pulseOrImpulse);
  const band = classifyBand(pulseOrImpulse);
  const bandFamily = classifyBandFamily(pulseOrImpulse);
  const dnaTag = pulseOrImpulse.dnaTag || null;
  const meshTag = pulseOrImpulse.meshTag || null;

  let state = instanceRegistry.get(instanceKey);
  if (!state) {
    state = { count: 0 };
    instanceRegistry.set(instanceKey, state);
  }
  state.count += 1;

  const instanceIndex = state.count - 1;
  const totalInstances = state.count;
  const instanceContext = {
    ...GOVERNOR_CONTEXT_V24,
    band,
    bandFamily,
    dnaTag,
    meshTag,
    organ: organName,
    pulseId,
    instanceKey,
    instanceIndex,
    totalInstances
  };

  const governorMeta = buildGovernorMeta(pulseOrImpulse, instanceContext);

  function buildEvent(reason, extra = {}) {
    return {
      ok: false,
      blocked: true,
      reason,
      ...GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      ...extra
    };
  }

  // 1. Organ re-entry
  if (activeOrgans.has(organName)) {
    const event = buildEvent("organ_reentry");
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  // 2. Per-pulse revisit
  let visits = pulseVisits.get(pulseId);
  if (!visits) {
    visits = new Set();
    pulseVisits.set(pulseId, visits);
  } else if (visits.has(organName)) {
    const event = buildEvent("organ_already_visited_for_pulse");
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  // 3. Depth guards
  const lineageDepth = getLineageDepth(pulseOrImpulse);
  if (lineageDepth > MAX_LINEAGE_DEPTH) {
    const event = buildEvent("lineage_depth_exceeded", { lineageDepth });
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  const returnToDepth = getReturnToDepth(pulseOrImpulse);
  if (returnToDepth > MAX_RETURN_TO_DEPTH) {
    const event = buildEvent("return_to_depth_exceeded", { returnToDepth });
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  const fallbackDepth = getFallbackDepth(pulseOrImpulse);
  if (fallbackDepth > MAX_FALLBACK_DEPTH) {
    const event = buildEvent("fallback_depth_exceeded", { fallbackDepth });
    await maybeEmitAndRouteEarnReflex(event, pulseOrImpulse, instanceContext);
    return event;
  }

  // 4. Mark active + visited
  activeOrgans.add(organName);
  visits.add(organName);

  try {
    const result = await fn(instanceContext);
    return {
      ok: true,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      result
    };
  } catch (error) {
    return {
      ok: false,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      error
    };
  } finally {
    activeOrgans.delete(organName);
  }
}

// ---------------------------------------------------------------------------
//  Module init guard — v30++++
// ---------------------------------------------------------------------------
export async function withModuleInitGuard(moduleName, fn) {
  if (activeModules.has(moduleName)) {
    return {
      ok: false,
      blocked: true,
      reason: "module_init_reentry",
      ...GOVERNOR_CONTEXT_V24,
      module: moduleName
    };
  }

  activeModules.add(moduleName);
  try {
    const result = await fn();
    return {
      ok: true,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      module: moduleName,
      result
    };
  } catch (error) {
    return {
      ok: false,
      blocked: false,
      ...GOVERNOR_CONTEXT_V24,
      module: moduleName,
      error
    };
  } finally {
    activeModules.delete(moduleName);
  }
}

// ============================================================================
//  PulseOSGovernor — CLASS EXPRESSION (v30‑IMMORTAL‑SPINE++++)
//  Pure guards • No routing • No sending • Deterministic • Drift‑proof
// ============================================================================
// ============================================================================
//  PulseOSGovernor — IMMORTAL PSEUDO‑CLASS (v31++)
// ============================================================================

export const PulseOSGovernor = (() => {
  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    activeOrgans: new Set(),
    activeModules: new Set(),
    pulseVisits: new Map(),
    instanceRegistry: new Map(),

    MAX_LINEAGE_DEPTH: 24,
    MAX_RETURN_TO_DEPTH: 12,
    MAX_FALLBACK_DEPTH: 2,

    BAND_FAMILY: {
      PULSEBAND: "PulseBand",
      MESHBAND: "meshband"
    },

    GOVERNOR_CONTEXT_V24: {
      epoch: "v30-IMMORTAL-SPINE++++",
      deterministic: true,
      driftProof: true,
      dualBandAware: true,
      bandFamilyAware: true,
      presenceAware: true,
      meshAware: true,
      advantageAware: true
    }
  };

  // ------------------------------------------------------------
  // Band helpers
  // ------------------------------------------------------------
  const normalizeBand = (band) => {
    const b = String(band || "dual").toLowerCase();
    if (b === "binary" || b === "bit" || b === "band_binary") return "binary";
    if (b === "symbolic" || b === "band_symbolic") return "symbolic";
    return "dual";
  };

  const normalizeBandFamily = (family) => {
    const f = String(family || lane.BAND_FAMILY.PULSEBAND).toLowerCase();
    return f === lane.BAND_FAMILY.MESHBAND
      ? lane.BAND_FAMILY.MESHBAND
      : lane.BAND_FAMILY.PULSEBAND;
  };

  const classifyBand = (pulse) => normalizeBand(pulse.band || pulse.mode || null);

  const classifyBandFamily = (pulse) =>
    normalizeBandFamily(pulse.bandFamily || pulse.meshBand);

  // ------------------------------------------------------------
  // Core helpers
  // ------------------------------------------------------------
  const getPulseId = (pulse) =>
    pulse.pulseId ||
    pulse.id ||
    pulse.tickId ||
    pulse.jobId ||
    "UNKNOWN_PULSE";
  const pulseId = getPulseId;

  const getLineageDepth = (pulse) => {
    const lineage = pulse.lineage || pulse.parentLineage || [];
    return Array.isArray(lineage) ? lineage.length : 0;
  };

  const getReturnToDepth = (pulse) => {
    const rt = pulse.returnTo;
    if (!rt) return 0;
    if (Array.isArray(rt)) return rt.length;
    return 1;
  };

  const getFallbackDepth = (pulse) => {
    const fb = pulse.fallback || pulse.fallbackDepth;
    if (!fb) return 0;
    if (typeof fb === "number") return fb;
    return 1;
  };

  const getInstanceKey = (organName, pulse) =>
    `${organName}::${getPulseId(pulse)}`;

  // ------------------------------------------------------------
  // Governor metadata
  // ------------------------------------------------------------
  const buildGovernorMeta = (pulse, instanceContext) => {
    const advantage = pulse.advantage || {};
    const presence = pulse.presence || {};
    const routeName = pulse.routeName || null;

    return {
      routeName,
      advantageTier: advantage.tier || "unknown",
      deviceTier: advantage.deviceTier || "unknown",
      networkTier: advantage.networkTier || "unknown",
      gpuTier: advantage.gpuTier || "unknown",
      presenceCritical: !!presence.critical,
      presenceFieldRequested: !!presence.field,
      meshPresenceRequested: !!presence.mesh,
      instanceIndex: instanceContext.instanceIndex,
      totalInstances: instanceContext.totalInstances
    };
  };

  // ------------------------------------------------------------
  // Optional EarnReflex emission
  // ------------------------------------------------------------
  const maybeEmitAndRouteEarnReflex = async (event, pulse, instanceContext) => {
    try {
      if (typeof window === "undefined") return;

      const reflex = PulseRealm.PulseEarnReflex;
      if (!reflex || typeof reflex.fromGovernorEvent !== "function") return;

      const { earnReflex } = await reflex.fromGovernorEvent(
        event,
        pulse,
        instanceContext
      );

      const router = PulseRealm.PulseEarnReflexRouter;
      const earn = PulseRealm.PulseWorld.Earn;

      if (router && typeof router.route === "function" && earn) {
        router.route(earnReflex, earn);
      }
    } catch {
      // governor must never break
    }
  };

  // ------------------------------------------------------------
  // ORGAN GUARD (core IMMORTAL logic)
// ------------------------------------------------------------
  const withOrganGuard = async (organName, pulse, fn) => {
    const pulseId = getPulseId(pulse);
    const instanceKey = getInstanceKey(organName, pulse);
    const band = classifyBand(pulse);
    const bandFamily = classifyBandFamily(pulse);
    const dnaTag = pulse.dnaTag || null;
    const meshTag = pulse.meshTag || null;

    let state = lane.instanceRegistry.get(instanceKey);
    if (!state) {
      state = { count: 0 };
      lane.instanceRegistry.set(instanceKey, state);
    }
    state.count += 1;

    const instanceIndex = state.count - 1;
    const totalInstances = state.count;

    const instanceContext = {
      ...lane.GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceKey,
      instanceIndex,
      totalInstances
    };

    const governorMeta = buildGovernorMeta(pulse, instanceContext);

    const buildEvent = (reason, extra = {}) => ({
      ok: false,
      blocked: true,
      reason,
      ...lane.GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      ...extra
    });

    if (lane.activeOrgans.has(organName)) {
      const event = buildEvent("organ_reentry");
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    let visits = lane.pulseVisits.get(pulseId);
    if (!visits) {
      visits = new Set();
      lane.pulseVisits.set(pulseId, visits);
    } else if (visits.has(organName)) {
      const event = buildEvent("organ_already_visited_for_pulse");
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    const lineageDepth = getLineageDepth(pulse);
    if (lineageDepth > lane.MAX_LINEAGE_DEPTH) {
      const event = buildEvent("lineage_depth_exceeded", { lineageDepth });
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    const returnToDepth = getReturnToDepth(pulse);
    if (returnToDepth > lane.MAX_RETURN_TO_DEPTH) {
      const event = buildEvent("return_to_depth_exceeded", { returnToDepth });
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    const fallbackDepth = getFallbackDepth(pulse);
    if (fallbackDepth > lane.MAX_FALLBACK_DEPTH) {
      const event = buildEvent("fallback_depth_exceeded", { fallbackDepth });
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    lane.activeOrgans.add(organName);
    visits.add(organName);

    try {
      const result = await fn(instanceContext);
      return {
        ok: true,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        band,
        bandFamily,
        dnaTag,
        meshTag,
        organ: organName,
        pulseId,
        instanceContext,
        governorMeta,
        result
      };
    } catch (error) {
      return {
        ok: false,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        band,
        bandFamily,
        dnaTag,
        meshTag,
        organ: organName,
        pulseId,
        instanceContext,
        governorMeta,
        error
      };
    } finally {
      lane.activeOrgans.delete(organName);
    }
  };

  // ------------------------------------------------------------
  // MODULE INIT GUARD
  // ------------------------------------------------------------
  const withModuleInitGuard = async (moduleName, fn) => {
    if (lane.activeModules.has(moduleName)) {
      return {
        ok: false,
        blocked: true,
        reason: "module_init_reentry",
        ...lane.GOVERNOR_CONTEXT_V24,
        module: moduleName
      };
    }

    lane.activeModules.add(moduleName);
    try {
      const result = await fn();
      return {
        ok: true,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        module: moduleName,
        result
      };
    } catch (error) {
      return {
        ok: false,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        module: moduleName,
        error
      };
    } finally {
      lane.activeModules.delete(moduleName);
    }
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    BAND_FAMILY: lane.BAND_FAMILY,
    GOVERNOR_CONTEXT_V24: lane.GOVERNOR_CONTEXT_V24,

    normalizeBand,
    normalizeBandFamily,
    classifyBand,
    classifyBandFamily,

    getPulseId,
    pulseId,
    getLineageDepth,
    getReturnToDepth,
    getFallbackDepth,
    getInstanceKey,

    buildGovernorMeta,
    withOrganGuard,
    withModuleInitGuard
  };
})();

PulseRealm.OSGovernor = {
  PulseOSGovernor,
  withModuleInitGuard,
  withOrganGuard,
  maybeEmitAndRouteEarnReflex,
  GOVERNOR_CONTEXT_V24
}