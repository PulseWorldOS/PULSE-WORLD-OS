// ============================================================================
// FILE: /organs/survival/PulseMeshSurvivalInstincts-v30-IMMORTAL-ADVANTAGE++.js
// PULSE OS v30 — MESH-EXPONENTIAL SURVIVAL LAYER  // amber+black
// “Exponential-Safety Gate / Global Survival Arc / Mesh-Fanout Firewall”
// Pure 1/0 Instinct Engine • Deterministic • Metadata-Only • Mesh-Exponential-Aware
// Full Advantage Stack: Presence-Aware • Mesh-Aware • Organ-Aware • Pressure-Aware
// Unified-Advantage-Field • IMMORTAL, Coordinator-Free, Zero-Compute
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
// Presence-band helper (unchanged core idea, v30 naming)
// ---------------------------------------------------------------------------
function classifyPresenceBand(impulse) {
  const f = impulse.flags || {};
  if (f.binary_mode && f.dual_mode) return "dual";
  if (f.binary_mode) return "binary";
  if (f.dual_mode) return "dual";
  return "symbolic";
}

// ---------------------------------------------------------------------------
// v30: Mesh-exponential context helpers (metadata-only)
// ---------------------------------------------------------------------------
function getMeshFanout(impulse) {
  // Expected to be injected by Router / Aura / Flow as metadata only.
  // If not present, default to safe low fanout.
  const f = impulse.flags || {};
  const fanout = f.mesh_fanout_estimate;
  if (typeof fanout === "number" && fanout >= 0) return fanout;
  return 1; // safe default
}

function getMeshBranchFactor(impulse) {
  const f = impulse.flags || {};
  const bf = f.mesh_branch_factor;
  if (typeof bf === "number" && bf >= 0) return bf;
  return 1; // safe default
}

function getGlobalPressure(impulse) {
  const f = impulse.flags || {};
  const meshP = f.mesh_pressure ?? 0;
  const flowP = f.flow_pressure ?? 0;
  const auraP = f.aura_pressure ?? 0;
  const immuneP = f.immune_pressure_reflection ?? 0;
  const combined = (meshP + flowP + auraP + immuneP) / 4;
  return combined;
}

function getLoopRisk(impulse) {
  const f = impulse.flags || {};
  const loopDepth = f.aura_loop_depth ?? 0;
  const inLoop = !!f.aura_in_loop;
  if (!inLoop) return 0;
  return Math.min(1, loopDepth / 16); // deterministic heuristic
}

// ---------------------------------------------------------------------------
// Instinct Pack v30 — pure 1/0, metadata-only, mesh-exponential-aware
// ---------------------------------------------------------------------------
export const SurvivalInstincts = {

  // ENERGY — unchanged semantics, but tagged as v30
  energy(impulse) {
    if (typeof impulse.energy !== "number") return 1;
    if (impulse.energy <= 0.05) return 0;
    return 1;
  },

  // HOPS — unchanged core, still runaway prevention
  hops(impulse) {
    if ((impulse.hops || 0) > 64) return 0;
    return 1;
  },

  // TRUST — unchanged
  trust(impulse, node) {
    if (!node || typeof node.trustLevel !== "number") return 1;
    if (node.trustLevel >= 0.5) return 1;
    return 0;
  },

  // ANOMALY — unchanged, but now feeds into exponential instincts
  anomaly(impulse) {
    const f = impulse.flags || {};
    if (f.cortex_anomaly) return 0;
    if (f.cortex_factoring_anomaly) return 0;
    if (f.cortex_flow_anomaly) return 0;
    return 1;
  },

  // EARNER TARGETING — unchanged
  earnerTargeting(impulse, node) {
    if (!node || node.kind !== "earner") return 1;
    if (!impulse.routeHint) return 1;
    if (impulse.routeHint === node.id) return 1;
    if (impulse.routeHint === node.kind) return 1;
    return 0;
  },

  // BINARY MODE — tightened for exponential mesh
  binaryMode(impulse) {
    const f = impulse.flags || {};
    if (!f.binary_mode) return 1;

    if (impulse.energy <= 0.1) return 0;
    if ((impulse.hops || 0) > 48) return 0;

    // v30: binary + high fanout is dangerous
    const fanout = getMeshFanout(impulse);
    if (fanout > 128) return 0;

    return 1;
  },

  // DUAL MODE — slightly softer, but still bounded
  dualMode(impulse) {
    const f = impulse.flags || {};
    if (!f.dual_mode) return 1;

    if ((impulse.hops || 0) > 72) return 0;

    const fanout = getMeshFanout(impulse);
    if (fanout > 256) return 0;

    return 1;
  },

  // v30: EXPONENTIAL FANOUT INSTINCT
  // Drop when branch factor * hops implies uncontrolled exponential spread.
  exponentialFanout(impulse) {
    const bf = getMeshBranchFactor(impulse); // branch factor per hop
    const hops = impulse.hops || 0;

    // Simple deterministic bound: if bf^hops exceeds threshold, drop.
    // We avoid compute-heavy pow; we just bound on (bf, hops) pairs.
    if (bf >= 8 && hops >= 8) return 0;
    if (bf >= 4 && hops >= 10) return 0;
    if (bf >= 2 && hops >= 16) return 0;

    return 1;
  },

  // v30: GLOBAL PRESSURE INSTINCT
  // Drop when global pressure is high AND fanout is high.
  globalPressure(impulse) {
    const pressure = getGlobalPressure(impulse);
    const fanout = getMeshFanout(impulse);

    if (pressure >= 0.8 && fanout >= 32) return 0;
    if (pressure >= 0.6 && fanout >= 64) return 0;

    return 1;
  },

  // v30: CONTAGION INSTINCT
  // Drop when immune / aura / cortex all hint at systemic risk.
  contagion(impulse) {
    const f = impulse.flags || {};

    const immuneHot = !!f.immune_quarantined ||
                      !!f.immune_drift_reflection ||
                      !!f.immune_pressure_reflection;

    const auraHot = !!f.aura_system_under_tension ||
                    !!f.aura_in_loop;

    const cortexHot = !!f.cortex_anomaly ||
                      !!f.cortex_flow_anomaly ||
                      !!f.cortex_factoring_anomaly;

    const combinedHot = (immuneHot ? 1 : 0) +
                        (auraHot ? 1 : 0) +
                        (cortexHot ? 1 : 0);

    if (combinedHot >= 2) return 0;
    return 1;
  },

  // v30: PRIVILEGE / SCOPE INSTINCT
  // Only privileged impulses may go exponential.
  privilegeScope(impulse) {
    const f = impulse.flags || {};

    const wantsExponential = !!f.mesh_wants_exponential ||
                             !!f.mesh_exponential_candidate;

    if (!wantsExponential) return 1;

    const privileged =
      f.mesh_privileged === true ||
      f.aura_advantage_bias >= 0.8 ||
      f.presence_role === "founder" ||
      f.presence_role === "core";

    if (!privileged) return 0;
    return 1;
  },

  // v30: RATE / BURST INSTINCT
  // Uses metadata counters (no internal state) from Halo / Flow.
  rateBurst(impulse) {
    const f = impulse.flags || {};
    const burstRate = f.mesh_burst_rate ?? 0;      // impulses/sec (metadata)
    const nodeBurstRate = f.node_burst_rate ?? 0;  // per-node

    if (burstRate > 1000) return 0;
    if (nodeBurstRate > 500) return 0;

    return 1;
  },

  // v30: LOOP RISK INSTINCT
  loopRisk(impulse) {
    const risk = getLoopRisk(impulse);
    if (risk >= 0.8) return 0;
    return 1;
  }
};

// ---------------------------------------------------------------------------
// Combined Survival Instinct Engine v30 — mesh-exponential-aware
// ---------------------------------------------------------------------------
export function createSurvivalInstincts() {

  const instinctFns = [
    SurvivalInstincts.energy,
    SurvivalInstincts.hops,
    SurvivalInstincts.trust,
    SurvivalInstincts.anomaly,
    SurvivalInstincts.earnerTargeting,
    SurvivalInstincts.binaryMode,
    SurvivalInstincts.dualMode,
    SurvivalInstincts.exponentialFanout,
    SurvivalInstincts.globalPressure,
    SurvivalInstincts.contagion,
    SurvivalInstincts.privilegeScope,
    SurvivalInstincts.rateBurst,
    SurvivalInstincts.loopRisk
  ];

  const meta = {
    layer: "SurvivalInstincts",
    role: "SURVIVAL_REFLEX",
    version: "30-MESH-SURVIVAL-IMMORTAL-ADVANTAGE++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      meshAware: true,
      localAware: true,
      internetAware: true,

      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      unifiedAdvantageField: true,

      deterministicField: true,
      driftProof: true,
      multiInstanceReady: true,
      futureEvolutionReady: true,

      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true,

      prewarmAware: true,
      chunkAware: true,
      cacheAware: true,
      presenceAwareAdvantage: true,
      dualBandReady: true,

      organAware: true,
      meshOrgansAware: true,
      organRegistryAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true,
      zeroNetworkFetch: true,
      zeroExternalMutation: true
    },

    contract: {
      always: [
        "skin-level-reflex",
        "pure-1-or-0",
        "metadata-only",
        "unified-advantage-field",
        "deterministic-field",
        "mesh-exponential-aware"
      ],
      never: [
        "route",
        "shape",
        "compute",
        "async",
        "network",
        "payload-mutation"
      ]
    }
  };

  return function survivalInstinctEngine(impulse, node) {
    impulse.meta = impulse.meta || {};
    impulse.flags = impulse.flags || {};
    impulse.organs = impulse.organs || [];

    // Attach survival meta
    impulse.meta.reflex = meta;

    // Mesh-organ tagging
    if (!impulse.organs.includes("organ-survival")) {
      impulse.organs.push("organ-survival");
    }
    impulse.flags.organ_organ_survival = true;

    // Presence-band tagging
    const presenceBand = classifyPresenceBand(impulse);
    impulse.flags.survival_presence_band = presenceBand;
    impulse.flags.survival_advantage_meta = {
      prewarm_surface: true,
      chunk_surface: true,
      cache_surface: true,
      presence_band: presenceBand
    };

    // v30: exponential-safety field (for Echo / Immune / Cortex)
    impulse.flags.survival_exponential_meta = {
      mesh_fanout_estimate: getMeshFanout(impulse),
      mesh_branch_factor: getMeshBranchFactor(impulse),
      global_pressure: getGlobalPressure(impulse),
      loop_risk: getLoopRisk(impulse)
    };

    // Pure 1/0 instinct chain
    for (const fn of instinctFns) {
      const decision = fn(impulse, node);
      if (decision === 0) {
        impulse.flags[`instinct_${fn.name}_drop`] = true;
        impulse.flags.survival_dropped = true;
        return 0;
      }
    }

    impulse.flags.survival_passed = true;
    return 1;
  };
}

PulseRealm.PulseMeshSurvivalInstincts = createSurvivalInstincts;