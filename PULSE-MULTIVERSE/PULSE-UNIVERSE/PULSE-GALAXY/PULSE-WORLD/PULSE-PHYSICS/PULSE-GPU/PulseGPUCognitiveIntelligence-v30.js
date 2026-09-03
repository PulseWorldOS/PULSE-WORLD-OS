// ============================================================================
// FILE: PULSE-GPU/PulseGPUCognitiveIntelligence-v30-IMMORTAL-ONEBAND.js
// PULSE GPU COGNITIVE INTELLIGENCE v30-IMMORTAL-ONEBAND
// “CORTEX → WISDOM → UXBRIDGE → CHUNKER” — FULL COGNITIVE FRAME PIPELINE
// PURE LOGIC • PURE DETERMINISM • ZERO SIDE EFFECTS
// SYMBOLIC + BINARY AWARE • ONE-BAND GPU MODE • DISPATCH-AWARE
// MEMORY-AWARE • PRESENCE-AWARE • INTELLIGENT-COMPUTE-AWARE
// CHUNK-AWARE • EARN-AWARE • IMMORTAL-INTEL • PULSESEND-SYSTEM-v30 READY
// CAPABILITY-AWARE (PULSE_DEVICE_PROFILE)
// ============================================================================

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow} from "../../../../../_PROOF/PULSE-PROOF.js";
import {PulseGPUOrchestrator}               from "./PulseGPUSpine-v30.js";
import {PulseBinaryGPUImmortal}              from "./PulseGPUBinary-v30.js";
import {PulseGPUImmortalV31}                    from "./PulseGPU-v30.js";
import {PulseGPUGeneticMemory as PulseGPUGeneticMemoryModule}   from "./PulseGPUGeneticMemory-v30.js";
import {PulseGPUBrainExportV31 as PulseGPUBrain}                 from "./PulseGPUBrain-v30.js";
import {createPulseGPUChunker as PulseGPUChunker}               from "./PULSE-GPU-CHUNKER.js";
import {PulseGPUInsightsEngine}        from "./PulseGPUWIsdomCortex-v30.js";
import {PulseGPUEngine as PulseGPUAstralMuscleSystem}    from "./PulseGPUAstralMuscleSystem-v30.js";
import {PulseGPUAstralNervousSystem} from "./PulseGPUAstralNervousSystem-v30.js";


import {PulseGPUGuardianCortex as PulseGPUGuardianCortexModule}  from "./PulseGPUGuardianCortex-v30.js";
import {PulseGPUHealer}          from "./PulseGPULymphNodes-v30.js";
import {PulseGPUSurvivalInstincts}   from "./PulseGPUSurvivalInstincts-v30.js";


import {
  AI_EXPERIENCE_META_PulseGPUChunkPlanner,
  ORGAN_META_PulseGPUChunkPlanner,
  ORGAN_CONTRACT_PulseGPUChunkPlanner,
  PulseGPUChunkPlannerMultiband as PulseGPUChunkPlannerModule
} from "./PULSE-GPU-CHUNKPLANNER.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





PulseRealm.PulseLog(
  "gpu",
  "PulseGPUCognitiveIntelligence v30-IMMORTAL-ONEBAND — Full Hydra GPU Cognition Online " +
    "(One-Band Binary Mode + PulseSendSystem-v30-Immortal-Intel Ready)."
);

// ============================================================================
// CAPABILITY SURFACE — v30 Immortal-Intel-ONEBAND
// ============================================================================

const RAW_DEVICE_PROFILE = PulseRealm.PULSE_DEVICE_PROFILE || null;

function buildCapabilityProfile(raw) {
  if (!raw || typeof raw !== "object") return null;

  return {
    capabilityTier: raw.capabilityTier ?? null,
    capabilityScore: raw.capabilityScore ?? null,
    gpuScore: raw.gpuScore ?? null,
    gpuRam: raw.gpuRam ?? null,
    bandwidthMbps: raw.bandwidthMbps ?? null,
    stabilityScore: raw.stabilityScore ?? null,
    cpuScore: raw.cpuScore ?? null,
    thermalHeadroomScore: raw.thermalHeadroomScore ?? null,
    powerProfile: raw.powerProfile ?? null
  };
}

export const CAPABILITY_PROFILE = buildCapabilityProfile(RAW_DEVICE_PROFILE);

// ============================================================================
// SHARED EVO + CONTRACTS (v30-IMMORTAL-ONEBAND)
// ============================================================================
const PULSE_GPU_COGNITION_VERSION = "30.0-IMMORTAL-ONEBAND";

const COGNITIVE_EVO = {
  // Core cognition
  gpuCompute: true,
  tensorEngine: true,
  parallelSafe: true,
  cognitiveSimulation: true,
  reasoningSimulation: true,
  patternFusion: true,

  // One-band GPU mode
  oneBandGpuMode: true,
  gpuBand: "one-band-binary",
  binaryFirst: true,
  symbolicSecondary: true,

  // Awareness
  symbolicSafe: true,
  binarySafe: true,
  dualBandAware: true,
  gpuDispatchAware: true,
  gpuMemoryAware: true,
  gpuAdvantageAware: true,
  presenceAware: true,
  dnaAware: true,
  versionAware: true,
  instanceAware: true,

  // Mesh / organ linkage
  meshLinked: true,
  astralMeshLinked: true,
  guardianLinked: true,
  healerLinked: true,
  muscleLinked: true,
  nervousSystemLinked: true,
  wisdomLinked: true,
  survivalLinked: true,
  brainLinked: true,
  spineLinked: true,
  geneticMemoryLinked: true,

  // Chunk / layout awareness
  chunkAware: true,
  chunkPlannerAware: true,
  gpuChunkPlanAware: true,

  // Immortal + Earn
  deterministic: true,
  driftProof: true,
  pureCompute: true,
  zeroMutationOfInput: true,
  zeroNetwork: true,
  zeroFilesystem: true,
  immortalReady: true,
  immortalSurface: true,
  earnAware: true,
  earnCompatibility: "Earn-v4-Presence",

  // Capability
  capabilityAware: true,

  // Contracts — aligned with PulseSendSystem-v30-Immortal-Intel
  routingContract: "PulseSendSystem-v30-Immortal-Intel",
  gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
  binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal-Intel",
  workgroupLawVersion: 30
};
export const CognitiveFrame = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    cognition: {},
    interpretation: {},
    narrative: {},
    tier: {},
    performance: {},
    dispatch: {},
    advantage: {},
    presence: {},
    shapeSignature: {},
    patternSignature: {},
    symbolic: {},
    binary: {},
    recommendedActions: [],
    chunkContext: null,
    intelSurface: null,
    capabilityProfile: CAPABILITY_PROFILE,

    meta: {
      layer: "PulseGPUCognitiveIntelligence-v30",
      version: PULSE_GPU_COGNITION_VERSION,
      target: "full-gpu",
      dnaTag: "default-dna",
      instanceId: "",
      earnMode: false,
      capabilityProfile: CAPABILITY_PROFILE,
      evo: COGNITIVE_EVO
    }
  };

  // ------------------------------------------------------------
  // INITIALIZE / UPDATE FRAME
  // ------------------------------------------------------------
  const configure = (options = {}) => {
    lane.cognition = options.cognition || {};
    lane.interpretation = options.interpretation || {};
    lane.narrative = options.narrative || {};
    lane.tier = options.tier || {};
    lane.performance = options.performance || {};
    lane.dispatch = options.dispatch || {};
    lane.advantage = options.advantage || {};
    lane.presence = options.presence || {};
    lane.shapeSignature = options.shapeSignature || {};
    lane.patternSignature = options.patternSignature || {};
    lane.symbolic = options.symbolic || {};
    lane.binary = options.binary || {};
    lane.recommendedActions = Array.isArray(options.recommendedActions)
      ? options.recommendedActions
      : [];
    lane.chunkContext = options.chunkContext || null;
    lane.intelSurface = options.intelSurface || null;
    lane.capabilityProfile =
      options.capabilityProfile || CAPABILITY_PROFILE;

    // meta
    lane.meta = {
      layer: "PulseGPUCognitiveIntelligence-v30",
      version: options.version || PULSE_GPU_COGNITION_VERSION,
      target: "full-gpu",
      dnaTag: options.dnaTag || "default-dna",
      instanceId: options.instanceId || "",
      earnMode: !!options.earnMode,
      capabilityProfile: lane.capabilityProfile,
      evo: COGNITIVE_EVO
    };

    return snapshot();
  };

  // ------------------------------------------------------------
  // SNAPSHOT (IMMUTABLE)
  // ------------------------------------------------------------
  const snapshot = () => ({
    cognition: lane.cognition,
    interpretation: lane.interpretation,
    narrative: lane.narrative,
    tier: lane.tier,
    performance: lane.performance,
    dispatch: lane.dispatch,
    advantage: lane.advantage,
    presence: lane.presence,
    shapeSignature: lane.shapeSignature,
    patternSignature: lane.patternSignature,
    symbolic: lane.symbolic,
    binary: lane.binary,
    recommendedActions: [...lane.recommendedActions],
    chunkContext: lane.chunkContext,
    intelSurface: lane.intelSurface,
    capabilityProfile: lane.capabilityProfile,
    meta: { ...lane.meta }
  });

  // ------------------------------------------------------------
  // CLEAR FRAME
  // ------------------------------------------------------------
  const clear = () => {
    lane.cognition = {};
    lane.interpretation = {};
    lane.narrative = {};
    lane.tier = {};
    lane.performance = {};
    lane.dispatch = {};
    lane.advantage = {};
    lane.presence = {};
    lane.shapeSignature = {};
    lane.patternSignature = {};
    lane.symbolic = {};
    lane.binary = {};
    lane.recommendedActions = [];
    lane.chunkContext = null;
    lane.intelSurface = null;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    configure,
    snapshot,
    clear
  };

})();


// ============================================================================
// COMPUTER INTELLIGENCE HOOK (Earn-aware, v30, one-band)
// ============================================================================
function computeComputerIntelligence(cognitiveFrame, { earnMode = false } = {}) {
  if (!cognitiveFrame || typeof cognitiveFrame !== "object") {
    return null;
  }

  const base =
    cognitiveFrame instanceof CognitiveFrame
      ? cognitiveFrame
      : new CognitiveFrame(cognitiveFrame);

  return {
    identity: "PulseGPUComputerIntelligenceFrame-v30",
    version: PULSE_GPU_COGNITION_VERSION,
    layer: "gpu_computer_intelligence",
    earnMode: !!earnMode,
    dnaTag: base.meta.dnaTag,
    instanceId: base.meta.instanceId,

    cognition: base.cognition,
    interpretation: base.interpretation,
    narrative: base.narrative,
    tier: base.tier,
    performance: base.performance,
    dispatch: base.dispatch,
    advantage: base.advantage,
    presence: base.presence,
    shapeSignature: base.shapeSignature,
    patternSignature: base.patternSignature,
    symbolic: base.symbolic,
    binary: base.binary,
    recommendedActions: base.recommendedActions,
    chunkContext: base.chunkContext,
    intelSurface: base.intelSurface,
    capabilityProfile: base.capabilityProfile,

    evo: {
      ...COGNITIVE_EVO,
      computerIntelligence: true,
      earnAware: true
    },

    contracts: {
      routingContract: "PulseSendSystem-v30-Immortal-Intel",
      gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
      binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal-Intel",
      earnCompatibility: "Earn-v4-Presence"
    }
  };
}

// ============================================================================
// INTERNAL: CHUNK CONTEXT DERIVATION (pure, planner-aware, no direct calls)
// ============================================================================
function deriveChunkContextFromDispatchHistory(gpuDispatchHistory = []) {
  const count = Array.isArray(gpuDispatchHistory)
    ? gpuDispatchHistory.length
    : 0;

  if (count === 0) {
    return {
      chunkProfile: "default",
      plannerStrategy: "balanced",
      plannerChunks: null,
      rechunkRecommended: false
    };
  }

  const last = gpuDispatchHistory[count - 1];

  const pattern = last.pattern || "gpu-default";
  const advantageScore =
    typeof last.meta.advantageScore === "number"
      ? last.meta.advantageScore
      : 0;

  let chunkProfile = "default";
  if (pattern.includes("gpu")) chunkProfile = "gpu";
  if (pattern.includes("rich")) chunkProfile = "rich";

  let plannerStrategy = "balanced";
  if (advantageScore > 0.2) plannerStrategy = "aggressive_gpu";
  else if (advantageScore < -0.2) plannerStrategy = "safe_minimal";

  const rechunkRecommended =
    advantageScore < -0.2 || advantageScore > 0.4;

  return {
    chunkProfile,
    plannerStrategy,
    plannerChunks: null,
    rechunkRecommended
  };
}

// ============================================================================
// INTERNAL: INTEL SURFACE (bridge to PulseSendSystem IMMORTAL-INTEL semantics)
// ============================================================================
function buildIntelSurfaceFromAdvantage({ advantage, dispatchHistory }) {
  const dispatchCount = Array.isArray(dispatchHistory)
    ? dispatchHistory.length
    : 0;

  const lastScore =
    typeof advantage.lastAdvantageScore === "number"
      ? advantage.lastAdvantageScore
      : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(1, 0.6 + lastScore * 0.2 + dispatchCount * 0.01)
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.7 +
        (dispatchCount > 16 ? 0.2 : dispatchCount > 4 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    computeTier,
    readinessScore,
    dispatchHistoryCount: dispatchCount,
    advantageScore: lastScore,
    oneBandGpuMode: true
  };
}

// ============================================================================
// COGNITIVE CORTEX — RAW COGNITION LAYER (v30, one-band)
// ============================================================================
export const PulseGPUCognitiveCortex = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL META (STATIC EQUIVALENT)
  // ------------------------------------------------------------
  const meta = {
    layer: "PulseGPUCognitiveCortex-v30",
    version: PULSE_GPU_COGNITION_VERSION,
    target: "full-gpu",
    capabilityProfile: CAPABILITY_PROFILE,
    evo: COGNITIVE_EVO
  };

  // ------------------------------------------------------------
  // BUILD COGNITIVE FRAME (IMMORTAL PURE FUNCTION)
  // ------------------------------------------------------------
  const buildCognitiveFrame = (opts = {}) => {
    const {
      intelligentCompute,
      gpuDispatchHistory = [],
      gpuAdvantageMap = null,
      presenceContext = null,
      gameProfile = null,
      tierProfile = null,
      hardwareProfile = null,
      dnaTag = "default-dna",
      instanceId = "",
      earnMode = false
    } = opts;

    const dispatchCount = Array.isArray(gpuDispatchHistory)
      ? gpuDispatchHistory.length
      : 0;

    const lastDispatch =
      dispatchCount > 0 ? gpuDispatchHistory[dispatchCount - 1] : null;

    // ------------------------------------------------------------
    // SHAPE SIGNATURE
    // ------------------------------------------------------------
    const shapeSignature = {
      pattern: lastDispatch.pattern || "gpu-default",
      mode: lastDispatch.mode || "normal",
      modeKind: lastDispatch.modeKind || "symbolic",
      binaryMode: !!lastDispatch.binaryMode,
      dualMode: !!lastDispatch.dualMode,
      gpuBand: "one-band-binary"
    };

    // ------------------------------------------------------------
    // ADVANTAGE SUMMARY
    // ------------------------------------------------------------
    const advantage = {
      hasAdvantageMap: !!gpuAdvantageMap,
      lastAdvantageScore:
        typeof lastDispatch.meta.advantageScore === "number"
          ? lastDispatch.meta.advantageScore
          : 0,
      dispatchHistoryCount: dispatchCount
    };

    // ------------------------------------------------------------
    // PRESENCE CONTEXT
    // ------------------------------------------------------------
    const presence = {
      context: presenceContext || null,
      dnaTag,
      instanceId,
      intelligentCompute,
      gpuBand: "one-band-binary"
    };

    // ------------------------------------------------------------
    // COGNITION BLOCK
    // ------------------------------------------------------------
    const cognition = {
      gameProfile,
      tierProfile,
      hardwareProfile,
      dispatchSummary: {
        dispatchHistoryCount: dispatchCount,
        lastPattern: shapeSignature.pattern,
        lastMode: shapeSignature.mode,
        lastModeKind: shapeSignature.modeKind
      },
      advantageSummary: advantage,
      capabilityProfile: CAPABILITY_PROFILE
    };

    // ------------------------------------------------------------
    // PERFORMANCE (placeholder)
    // ------------------------------------------------------------
    const performance = {
      baselineScore: null,
      currentScore: null,
      deltaPercent: null
    };

    // ------------------------------------------------------------
    // TIER
    // ------------------------------------------------------------
    const tier = {
      currentTier: tierProfile.tierId || null,
      tierHistory: tierProfile.history || []
    };

    // ------------------------------------------------------------
    // DISPATCH
    // ------------------------------------------------------------
    const dispatch = {
      history: gpuDispatchHistory,
      lastDispatch
    };

    // ------------------------------------------------------------
    // PATTERN SIGNATURE
    // ------------------------------------------------------------
    const patternSignature = {
      pattern: shapeSignature.pattern,
      lineage: gameProfile.lineage || null
    };

    // ------------------------------------------------------------
    // SYMBOLIC / BINARY MODES
    // ------------------------------------------------------------
    const symbolic = {
      modeKind: shapeSignature.modeKind,
      symbolicPreferred: shapeSignature.modeKind === "symbolic"
    };

    const binary = {
      binaryMode: shapeSignature.binaryMode,
      dualMode: shapeSignature.dualMode,
      gpuBand: "one-band-binary"
    };

    // ------------------------------------------------------------
    // NARRATIVE
    // ------------------------------------------------------------
    const narrative = {
      summary:
        "Cognitive frame initialized (raw cognition layer, v30-IMMORTAL-ONEBAND).",
      details: {
        hasAdvantageMap: advantage.hasAdvantageMap,
        dispatchHistoryCount: advantage.dispatchHistoryCount,
        gpuBand: "one-band-binary",
        capabilityProfile: CAPABILITY_PROFILE
      }
    };

    // ------------------------------------------------------------
    // CHUNK CONTEXT
    // ------------------------------------------------------------
    const chunkContext = deriveChunkContextFromDispatchHistory(
      gpuDispatchHistory
    );

    // ------------------------------------------------------------
    // RECOMMENDED ACTIONS
    // ------------------------------------------------------------
    const recommendedActions = [];
    if (chunkContext.rechunkRecommended) {
      recommendedActions.push({
        type: "rechunk-needed",
        severity: "medium",
        hint: "re-evaluate-gpu-chunk-layout",
        chunkProfile: chunkContext.chunkProfile,
        plannerStrategy: chunkContext.plannerStrategy
      });
    }

    // ------------------------------------------------------------
    // INTEL SURFACE
    // ------------------------------------------------------------
    const intelSurface = buildIntelSurfaceFromAdvantage({
      advantage,
      dispatchHistory: gpuDispatchHistory
    });

    // ------------------------------------------------------------
    // BUILD IMMORTAL COGNITIVE FRAME
    // ------------------------------------------------------------
    const frame = CognitiveFrame.configure({
      cognition,
      interpretation: {},
      narrative,
      tier,
      performance,
      dispatch,
      advantage,
      presence,
      shapeSignature,
      patternSignature,
      symbolic,
      binary,
      recommendedActions,
      chunkContext,
      intelSurface,
      dnaTag,
      instanceId,
      version: PULSE_GPU_COGNITION_VERSION,
      earnMode,
      capabilityProfile: CAPABILITY_PROFILE
    });

    // ------------------------------------------------------------
    // LOG (IMMORTAL)
    // ------------------------------------------------------------
    PulseRealm.PulseLog(
      "gpu",
      "[Cognition] PulseGPUCognitiveCortex.buildCognitiveFrame v30-IMMORTAL-ONEBAND",
      "color:#9C27B0;",
      {
        dispatchHistoryCount: dispatchCount,
        hasAdvantageMap: advantage.hasAdvantageMap,
        dnaTag,
        instanceId,
        earnMode,
        chunkProfile: chunkContext.chunkProfile,
        plannerStrategy: chunkContext.plannerStrategy,
        rechunkRecommended: chunkContext.rechunkRecommended,
        solvednessScore: intelSurface.solvednessScore,
        computeTier: intelSurface.computeTier,
        capabilityTier: CAPABILITY_PROFILE.capabilityTier || null
      }
    );

    return frame;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta,
    buildCognitiveFrame
  };

})();
export const PulseGPUWisdomBridge = (() => {

  // ------------------------------------------------------------
  // STATIC META (IMMORTAL)
  // ------------------------------------------------------------
  const meta = {
    layer: "PulseGPUWisdomBridge-v30",
    version: PULSE_GPU_COGNITION_VERSION,
    target: "full-gpu",
    capabilityProfile: CAPABILITY_PROFILE,
    evo: COGNITIVE_EVO
  };

  // ------------------------------------------------------------
  // INTERPRET — IMMORTAL PURE FUNCTION
  // ------------------------------------------------------------
  const interpret = (frame) => {
    if (!frame || typeof frame !== "object") return null;

    // Normalize to CognitiveFrame snapshot
    const base =
      frame.meta.layer === "PulseGPUCognitiveIntelligence-v30"
        ? frame
        : CognitiveFrame.configure(frame);

    const dispatchCount =
      base.dispatch.dispatchHistoryCount ||
      (Array.isArray(base.dispatch.history)
        ? base.dispatch.history.length
        : 0);

    const advantageScore = base.advantage.lastAdvantageScore || 0;

    // ------------------------------------------------------------
    // PERFORMANCE LABEL
    // ------------------------------------------------------------
    let performanceLabel = "unknown";
    if (typeof advantageScore === "number") {
      if (advantageScore > 0.1) performanceLabel = "improved";
      else if (advantageScore < -0.1) performanceLabel = "regressed";
      else performanceLabel = "stable";
    }

    // ------------------------------------------------------------
    // INTERPRETATION BLOCK
    // ------------------------------------------------------------
    const interpretation = {
      performanceLabel,
      hasHistory: dispatchCount > 0,
      hasAdvantageMap: !!base.advantage.hasAdvantageMap,
      symbolicPreferred: !!base.symbolic.symbolicPreferred,
      binaryMode: !!base.binary.binaryMode,
      dualMode: !!base.binary.dualMode,
      chunkAware: !!base.chunkContext,
      rechunkRecommended: !!base.chunkContext.rechunkRecommended,
      gpuBand: base.binary.gpuBand || "one-band-binary",
      capabilityProfile: base.capabilityProfile || CAPABILITY_PROFILE
    };

    // ------------------------------------------------------------
    // NARRATIVE
    // ------------------------------------------------------------
    const narrative = {
      summary: `GPU experience is ${performanceLabel} (one-band binary).`,
      details: {
        advantageScore,
        dispatchHistoryCount: dispatchCount,
        symbolicPreferred: interpretation.symbolicPreferred,
        binaryMode: interpretation.binaryMode,
        dualMode: interpretation.dualMode,
        chunkProfile: base.chunkContext.chunkProfile || "default",
        plannerStrategy: base.chunkContext.plannerStrategy || "balanced",
        rechunkRecommended: interpretation.rechunkRecommended,
        gpuBand: interpretation.gpuBand,
        capabilityProfile: interpretation.capabilityProfile
      }
    };

    // ------------------------------------------------------------
    // TIER UPDATE
    // ------------------------------------------------------------
    const tier = {
      ...base.tier,
      tierHint:
        performanceLabel === "improved"
          ? "consider-promoting-current-to-baseline"
          : performanceLabel === "regressed"
          ? "consider-restoring-baseline"
          : "monitor"
    };

    // ------------------------------------------------------------
    // PERFORMANCE UPDATE
    // ------------------------------------------------------------
    const performance = {
      ...base.performance,
      advantageScore,
      label: performanceLabel
    };

    // ------------------------------------------------------------
    // RECOMMENDED ACTIONS
    // ------------------------------------------------------------
    const recommendedActions = [...(base.recommendedActions || [])];

    if (performanceLabel === "regressed") {
      recommendedActions.push({
        type: "restore-baseline",
        severity: "high",
        hint: "restore-baseline-settings"
      });
    } else if (performanceLabel === "improved") {
      recommendedActions.push({
        type: "promote-current",
        severity: "medium",
        hint: "promote-current-to-baseline"
      });
    }

    if (interpretation.rechunkRecommended) {
      recommendedActions.push({
        type: "rechunk-needed",
        severity: "medium",
        hint: "re-evaluate-gpu-chunk-layout",
        chunkProfile: base.chunkContext.chunkProfile || "default",
        plannerStrategy: base.chunkContext.plannerStrategy || "balanced"
      });
    }

    // ------------------------------------------------------------
    // ENRICHED COGNITIVE FRAME (IMMORTAL)
    // ------------------------------------------------------------
    const enriched = CognitiveFrame.configure({
      cognition: base.cognition,
      interpretation,
      narrative,
      tier,
      performance,
      dispatch: base.dispatch,
      advantage: base.advantage,
      presence: base.presence,
      shapeSignature: base.shapeSignature,
      patternSignature: base.patternSignature,
      symbolic: base.symbolic,
      binary: base.binary,
      recommendedActions,
      chunkContext: base.chunkContext,
      intelSurface: base.intelSurface,
      dnaTag: base.meta.dnaTag,
      instanceId: base.meta.instanceId,
      version: base.meta.version,
      earnMode: base.meta.earnMode,
      capabilityProfile: base.capabilityProfile || CAPABILITY_PROFILE
    });

    // ------------------------------------------------------------
    // LOG (IMMORTAL)
    // ------------------------------------------------------------
    PulseRealm.PulseLog(
      "gpu",
      "[Wisdom] PulseGPUWisdomBridge.interpret v30-IMMORTAL-ONEBAND",
      "color:#3F51B5;",
      {
        performanceLabel,
        advantageScore,
        dispatchHistoryCount: dispatchCount,
        rechunkRecommended: interpretation.rechunkRecommended,
        gpuBand: interpretation.gpuBand,
        capabilityTier:
          interpretation.capabilityProfile.capabilityTier || null
      }
    );

    return enriched;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta,
    interpret
  };

})();


// ============================================================================
// UX BRIDGE — NOTIFICATION LAYER (v30)
// ============================================================================
function buildNotification({ kind, severity, title, message, actions, meta }) {
  const notif = {
    kind: kind || "performance",
    severity: severity || "low",
    title: title || "",
    message: message || "",
    meta: {
      layer: "PulseGPUUXBridge-v30",
      version: PULSE_GPU_COGNITION_VERSION,
      target: "full-gpu",
      selfRepairable: true,
      capabilityProfile: CAPABILITY_PROFILE,
      evo: {
        ...COGNITIVE_EVO,
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        unifiedAdvantageField: true,
        pulseSendSystem16Ready: true
      },
      ...(meta || {})
    }
  };

  if (Array.isArray(actions) && actions.length > 0) {
    notif.actions = actions;
  }

  return notif;
}

function validateNotification(n) {
  if (!n || typeof n !== "object") return false;
  if (typeof n.kind !== "string") return false;
  if (typeof n.severity !== "string") return false;
  if (!n.meta || n.meta.layer !== "PulseGPUUXBridge-v30") return false;
  return true;
}
// ============================================================================
//  PulseGPUUXBridge — IMMORTAL PSEUDO‑CLASS (v30++)
// ============================================================================

export const PulseGPUUXBridge = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    meta: {
      layer: "PulseGPUUXBridge-v30",
      version: PULSE_GPU_COGNITION_VERSION,
      target: "full-gpu",
      selfRepairable: true,
      capabilityProfile: CAPABILITY_PROFILE,
      evo: {
        ...COGNITIVE_EVO,
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        unifiedAdvantageField: true,
        pulseSendSystem16Ready: true
      }
    }
  };

  // ------------------------------------------------------------
  // MAIN SURFACE — fromCognitiveFrame
  // ------------------------------------------------------------
  const fromCognitiveFrame = (frame) => {
    if (!frame || typeof frame !== "object") return [];

    const base =
      frame instanceof CognitiveFrame ? frame : new CognitiveFrame(frame);

    const notifications = [];

    const perfLabel = base.performance.label || "unknown";
    const advantageScore = base.performance.advantageScore ?? 0;
    const gameId = base.cognition.gameProfile.gameId || "this game";

    const gpuMeta = {
      cognitiveFrameVersion: base.meta.version,
      performanceLabel: perfLabel,
      advantageScore,
      dnaTag: base.meta.dnaTag,
      instanceId: base.meta.instanceId,
      earnMode: base.meta.earnMode,
      shapeSignature: base.shapeSignature,
      patternSignature: base.patternSignature,
      chunkProfile: base.chunkContext.chunkProfile || "default",
      plannerStrategy: base.chunkContext.plannerStrategy || "balanced",
      rechunkRecommended: !!base.chunkContext.rechunkRecommended,
      gpuBand: base.binary.gpuBand || "one-band-binary",
      capabilityProfile: base.capabilityProfile || CAPABILITY_PROFILE
    };

    // ------------------------------------------------------------
    // PERFORMANCE REGRESSED
    // ------------------------------------------------------------
    if (perfLabel === "regressed") {
      notifications.push(
        buildNotification({
          kind: "performance",
          severity: "high",
          title: "Performance drop detected",
          message: `Performance for ${gameId} appears worse than your stable baseline (one-band GPU).`,
          actions: [
            {
              label: "Restore best settings",
              actionType: "request-restore-best-settings",
              payload: {
                gameProfile: base.cognition.gameProfile,
                hardwareProfile: base.cognition.hardwareProfile,
                tierProfile: base.cognition.tierProfile
              }
            }
          ],
          meta: {
            repairHint: "restore-baseline-settings",
            routingContract: "PulseSendSystem-v30-Immortal-Intel",
            gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
            ...gpuMeta
          }
        })
      );
    }

    // ------------------------------------------------------------
    // PERFORMANCE IMPROVED
    // ------------------------------------------------------------
    if (perfLabel === "improved") {
      notifications.push(
        buildNotification({
          kind: "performance",
          severity: "medium",
          title: "Performance improved",
          message: `Performance for ${gameId} appears better than your previous baseline (one-band GPU).`,
          actions: [
            {
              label: "Promote current settings",
              actionType: "request-promote-current-settings",
              payload: {
                gameProfile: base.cognition.gameProfile,
                hardwareProfile: base.cognition.hardwareProfile,
                tierProfile: base.cognition.tierProfile
              }
            }
          ],
          meta: {
            repairHint: "promote-current-to-baseline",
            routingContract: "PulseSendSystem-v30-Immortal-Intel",
            gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
            ...gpuMeta
          }
        })
      );
    }

    // ------------------------------------------------------------
    // TIER HINT
    // ------------------------------------------------------------
    if (base.tier.tierHint === "consider-restoring-baseline") {
      notifications.push(
        buildNotification({
          kind: "settings",
          severity: "medium",
          title: "Better settings available",
          message: `Your current configuration for ${gameId} may be below your best-known settings.`,
          actions: [
            {
              label: "Apply optimal settings",
              actionType: "request-apply-optimal-settings",
              payload: {
                gameProfile: base.cognition.gameProfile,
                hardwareProfile: base.cognition.hardwareProfile,
                tierProfile: base.cognition.tierProfile
              }
            }
          ],
          meta: {
            repairHint: "suggest-baseline-settings",
            routingContract: "PulseSendSystem-v30-Immortal-Intel",
            gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
            ...gpuMeta
          }
        })
      );
    }

    // ------------------------------------------------------------
    // RECHUNK RECOMMENDED
    // ------------------------------------------------------------
    if (base.chunkContext.rechunkRecommended) {
      notifications.push(
        buildNotification({
          kind: "chunk-layout",
          severity: "medium",
          title: "GPU chunk layout can be improved",
          message:
            "Observed GPU advantage suggests your GPU chunk layout could be re-optimized (one-band GPU).",
          actions: [
            {
              label: "Re-evaluate GPU chunks",
              actionType: "request-gpu-rechunk",
              payload: {
                chunkProfile: base.chunkContext.chunkProfile,
                plannerStrategy: base.chunkContext.plannerStrategy
              }
            }
          ],
          meta: {
            repairHint: "re-evaluate-gpu-chunk-layout",
            routingContract: "PulseSendSystem-v30-Immortal-Intel",
            gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
            chunkPlannerAware: true,
            chunkPlannerId:
              PulseGPUChunkPlannerModule
                .AI_EXPERIENCE_META_PulseGPUChunkPlanner.id ||
              "pulsegpu.chunk_planner",
            ...gpuMeta
          }
        })
      );
    }

    // ------------------------------------------------------------
    // RECOMMENDED ACTIONS ARRAY
    // ------------------------------------------------------------
    (base.recommendedActions || []).forEach((act) => {
      if (!act || typeof act !== "object") return;

      if (act.type === "restore-baseline") {
        notifications.push(
          buildNotification({
            kind: "settings",
            severity: act.severity || "high",
            title: "Restore best-known settings",
            message:
              "Performance appears regressed; restoring your best-known configuration is recommended.",
            actions: [
              {
                label: "Restore now",
                actionType: "apply-settings",
                payload: {
                  mode: "restore",
                  targetSettings: act.targetSettings || null
                }
              }
            ],
            meta: {
              repairHint: act.hint || "restore-baseline-settings",
              routingContract: "PulseSendSystem-v30-Immortal-Intel",
              gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
              ...gpuMeta
            }
          })
        );
      }

      if (act.type === "promote-current") {
        notifications.push(
          buildNotification({
            kind: "settings",
            severity: act.severity || "medium",
            title: "Promote current settings",
            message:
              "Current configuration appears better than your previous baseline.",
            actions: [
              {
                label: "Promote now",
                actionType: "apply-settings",
                payload: {
                  mode: "optimal",
                  targetSettings: act.targetSettings || null
                }
              }
            ],
            meta: {
              repairHint: act.hint || "promote-current-to-baseline",
              routingContract: "PulseSendSystem-v30-Immortal-Intel",
              gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
              ...gpuMeta
            }
          })
        );
      }

      if (act.type === "rechunk-needed") {
        notifications.push(
          buildNotification({
            kind: "chunk-layout",
            severity: act.severity || "medium",
            title: "GPU chunk layout can be improved",
            message:
              "GPU chunk layout appears suboptimal; re-evaluating chunk strategy is recommended.",
            actions: [
              {
                label: "Re-evaluate GPU chunks",
                actionType: "request-gpu-rechunk",
                payload: {
                  chunkProfile: act.chunkProfile || base.chunkContext.chunkProfile,
                  plannerStrategy:
                    act.plannerStrategy || base.chunkContext.plannerStrategy
                }
              }
            ],
            meta: {
              repairHint: act.hint || "re-evaluate-gpu-chunk-layout",
              routingContract: "PulseSendSystem-v30-Immortal-Intel",
              gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
              chunkPlannerAware: true,
              chunkPlannerId:
                PulseGPUChunkPlannerModule
                  .AI_EXPERIENCE_META_PulseGPUChunkPlanner.id ||
                "pulsegpu.chunk_planner",
              ...gpuMeta
            }
          })
        );
      }
    });

    return notifications.filter(validateNotification);
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    fromCognitiveFrame
  };

})();


// ============================================================================
// PUBLIC SURFACE
// ============================================================================
export {
  computeComputerIntelligence,
  CAPABILITY_PROFILE as PulseGPUCapabilityProfile
};

PulseRealm.GPUCognitiveIntelligence = {
  computeComputerIntelligence,
  PulseGPUUXBridge,
  PulseGPUWisdomBridge,
  PulseGPUCognitiveCortex,
  CognitiveFrame,
  COGNITIVE_EVO,
  CAPABILITY_PROFILE,
  RAW_DEVICE_PROFILE
}