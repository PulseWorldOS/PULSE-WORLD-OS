// ============================================================================
//  PULSE GPU BRAIN v31-IMMORTAL-ONEBAND-OMEGA.js
//  GPU BRAIN • ONE-BAND BINARY-FIRST • IMMORTAL-INTEL v31 OMEGA
//  CPU-SIDE ANALYST CORTEX / BRAINSTEM (PURE LOGIC, ZERO SIDE EFFECTS)
//  • Binary-first, dual-capable (symbolic as a projection of binary)
//  • OneBand GPU mode: single coherent band for GPU + BinaryGPU + Dispatch
//  • Presence-aware, Memory-aware, Dispatch-aware, Chunk/Cache-aware
//  • Deterministic, no randomness, no timestamps in core surfaces
//  • Omega-tier introspection: per-package signatures + health surfaces
// ============================================================================
//
//  SAFETY CONTRACT (v31-IMMORTAL-ONEBAND-OMEGA):
//  ---------------------------------------------
//  • No randomness
//  • No timestamps in core compute surfaces (only optional logging wrappers)
//  • No external mutation
//  • Pure, deterministic transforms from BrainInput → PackageSet
//  • One-band contract: GPU + BinaryGPU + Dispatch share a single coherent field
// ============================================================================
// ============================================================================
//  IMPORT SURFACE (IDENTITY-ONLY, NO COUPLING)
//  v30+ stack: GPU, BinaryGPU, Nervous System, etc.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseGPURuntime as PulseGPUDrive }                   from "./PulseGPUDrive-v30.js";
import { PulseGPUPerformanceAdvisor as PulseGPUDriveCenter }  from "./PulseGPUDriveCenter-v30.js";

import { PulseGPUOrchestrator as PulseGPUSpine }              from "./PulseGPUSpine-v30.js";
import { PulseGPUGeneticMemory as PulseGPUGeneticMemory }     from "./PulseGPUGeneticMemory-v30.js";

import { PulseGPUEngine as PulseGPUAstralMuscleSystem }       from "./PulseGPUAstralMuscleSystem-v30.js";
import { PulseGPUAstralNervousSystem as PulseGPUAstralNervousSystem } from "./PulseGPUAstralNervousSystem-v30.js";

import { PulseGPUGuardianCortex as PulseGPUGuardianCortex }   from "./PulseGPUGuardianCortex-v30.js";
import { PulseGPUHealer as PulseGPULymphNodes }               from "./PulseGPULymphNodes-v30.js";

import { PulseGPUSettingsRestorer as PulseGPUCognitiveLayer } from "./PulseGPUCognitiveLayer-v30.js";
import { PulseGPUUXBridge } from "./PulseGPUCognitiveIntelligence-v30.js";
import { PulseGPUInsightsEngine as PulseGPUWisdomCortex }     from "./PulseGPUWIsdomCortex-v30.js";

import { PulseGPUSurvivalInstincts as PulseGPUSurvivalInstincts } from "./PulseGPUSurvivalInstincts-v30.js";
import { PulseGPUEventEmitter as PulseGPUSynapses }           from "./PulseGPUSynapses-v30.js";

import { PulseGPUConfigImmortal }                             from "./PulseGPUCommandments-v30.js";
import { createPulseCoreBrain } from "../PULSE-COREMEMORY/PulseCoreFrontalCortex-v40.js";



// ============================================================================
//  VERSION + ONE-BAND ADVANTAGE FIELD (v31 OMEGA)
// ============================================================================

const PULSE_GPU_BRAIN_VERSION = "31.0-Immortal-OneBand-Omega";
const PULSE_GPU_BRAIN_SCHEMA_VERSION = 17; // v24→v30→v31 schema evolution

// ONE-BAND GPU MODE: everything lives in a single coherent GPU band
// Binary is the primary substrate; symbolic is a projection.
const ONEBAND_GPU_EVO = Object.freeze({
  // Biological / mental
  metabolicBoost: 2.0,
  neuralReflexBoost: 2.1,
  stabilityBoost: 2.2,
  cognitiveStabilityField: true,
  immortalCortexField: true,
  omegaWisdomField: true,

  // System / physical
  oneBandGPU: true,
  binaryFirst: true,
  symbolicProjection: true,
  multiInstanceReady: true,
  deterministicNeuron: true,
  parallelSafe: true,
  fanOutScaling: 1.6,
  clusterCoherence: true,
  zeroDriftCloning: true,
  reflexPropagation: 1.4,
  shaderPipelinePurity: true,
  shaderHotReloadSafe: true,

  // Fusion — unified organism cluster
  dualModeEvolution: true,
  organismClusterBoost: 1.7,
  cognitiveComputeLink: true,
  unifiedAdvantageField: true,
  unifiedAdvantageFieldV30: true,
  unifiedAdvantageFieldV31: true,
  pulseSend30Ready: true,
  pulseSend31Ready: true,

  // Binary / symbolic awareness
  binaryAware: true,
  symbolicAware: true,
  gpuDispatchAware: true,
  gpuMemoryAware: true,
  gpuAdvantageAware: true,
  gpuPressureAware: true,

  // Prewarm / chunk / cache / presence
  prewarmReady: true,
  chunkCacheReady: true,
  presencePrewarmReady: true,
  intelligentComputeReady: true,
  warmPathAware: true,
  warmPathBinaryIndexed: true,

  // Presence / identity
  presenceAware: true,
  dnaAware: true,
  versionAware: true,
  instanceAware: true,
  sessionClassAware: true,

  // Contracts
  routingContract: "PulseSend-v31-Immortal-OneBand-Omega",
  gpuOrganContract: "PulseGPU-v31-Immortal-OneBand-Omega",
  binaryGpuOrganContract: "PulseBinaryGPU-v31-Immortal-OneBand-Omega",
  earnCompatibility: "Earn-v30-GPU",
  workgroupLawVersion: 31,
  zeroImportShaderPipeline: true,
  introspectionReady: true,
  diagnosticsReady: true
});


// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) {
    return "[" + v.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(v).sort();
  return (
    "{" +
    keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") +
    "}"
  );
}

function computeHashV30(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 7)) % 524288; // 19‑bit
  }
  return `h30_${h}`;
}

function computeDualHashV30(shape) {
  const raw = typeof shape === "string" ? shape : stableStringify(shape);
  let h1 = 0;
  let h2 = 1;
  for (let i = 0; i < raw.length; i++) {
    const c = raw.charCodeAt(i);
    h1 = (h1 + c * (i + 3)) % 524288;
    h2 = (h2 * 131 + c * (i + 11)) % 1048573;
  }
  return {
    primary: `h30a_${h1}`,
    secondary: `h30b_${h2}`
  };
}

function computeTernaryHashV31(shape) {
  const raw = typeof shape === "string" ? shape : stableStringify(shape);
  let h1 = 7;
  let h2 = 17;
  let h3 = 31;
  for (let i = 0; i < raw.length; i++) {
    const c = raw.charCodeAt(i);
    h1 = (h1 * 131 + c * (i + 5)) % 1048573;
    h2 = (h2 * 257 + c * (i + 9)) % 1048573;
    h3 = (h3 * 389 + c * (i + 13)) % 1048573;
  }
  return {
    hA: `h31a_${h1}`,
    hB: `h31b_${h2}`,
    hC: `h31c_${h3}`
  };
}

function buildPackageSignature(metaShape) {
  const dual = computeDualHashV30(metaShape);
  const tri = computeTernaryHashV31(metaShape);
  return {
    primary: dual.primary,
    secondary: dual.secondary,
    omega: tri.hC,
    dual,
    ternary: tri
  };
}



// ============================================================================
//  INTELLIGENT ADVANTAGE (v31, one-band, omega)
// ============================================================================

function computeIntelligentAdvantageV31(brainInput) {
  const dispatchCount = Array.isArray(brainInput.gpuDispatchHistory)
    ? brainInput.gpuDispatchHistory.length
    : 0;

  const hasAdvantageMap = !!brainInput.gpuAdvantageMap;
  const hasPresence = !!brainInput.presenceContext || !!brainInput.binaryPresence;
  const sessionClass = brainInput.sessionClass || "gpu_session_cold";

  const baseShape = {
    dispatchCount,
    hasAdvantageMap,
    hasPresence,
    dnaTag: brainInput.dnaTag,
    instanceId: brainInput.instanceId,
    sessionClass
  };

  const dual = computeDualHashV30(baseShape);
  const tri = computeTernaryHashV31(baseShape);

  return {
    dispatchCount,
    hasAdvantageMap,
    hasPresence,
    sessionClass,
    prewarmRecommended: dispatchCount > 0 || hasPresence,
    chunkCacheRecommended: dispatchCount > 8 || hasAdvantageMap,
    modeHint: dispatchCount > 32 ? "throughput" : "latency",
    advantageSignature: dual.primary,
    advantageSignatureDual: dual,
    advantageSignatureOmega: tri.hC
  };
}


// ============================================================================
//  PACKAGE TYPES (v31, one-band aware, omega-introspective)
// ============================================================================
// ============================================================================
//  PulseGPUBrain v31 — IMMORTAL PACKAGE FACTORIES
// ============================================================================

export const PulseTexturePackageV31 = (opts = {}) => {
  const {
    id = "textures",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    optimizedTextures = [],
    mipmaps = [],
    atlasMaps = [],
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "texture-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    dnaTag,
    prewarmReady: true,
    chunkCacheReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    sourceCount: optimizedTextures.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    optimizedTextures,
    mipmaps,
    atlasMaps,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================

export const PulseMeshPackageV31 = (opts = {}) => {
  const {
    id = "meshes",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    lods = [],
    simplifiedMeshes = [],
    clusters = [],
    indices = [],
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "mesh-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    dnaTag,
    prewarmReady: true,
    chunkCacheReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    sourceCount: simplifiedMeshes.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    lods,
    simplifiedMeshes,
    clusters,
    indices,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================

export const PulseLightingPackageV31 = (opts = {}) => {
  const {
    id = "lighting",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    bakedGI = null,
    bakedAO = null,
    shadowData = null,
    reflectionProbes = [],
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "lighting-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    dnaTag,
    presencePrewarmReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    probeCount: reflectionProbes.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    bakedGI,
    bakedAO,
    shadowData,
    reflectionProbes,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================

export const PulseAnimationPackageV31 = (opts = {}) => {
  const {
    id = "animation",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    bakedFrames = [],
    transitions = [],
    skeletonData = null,
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "animation-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    dnaTag,
    intelligentComputeReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    frameCount: bakedFrames.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    bakedFrames,
    transitions,
    skeletonData,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================

export const PulseShaderPackageV31 = (opts = {}) => {
  const {
    id = "shaders",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    compiledVariants = [],
    pipelineStates = [],
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "shader-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    shaderContract: "WGSL-v31-Immortal-OneBand-Omega",
    dnaTag,
    zeroImportShaderPipeline: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    shaderCount: compiledVariants.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    compiledVariants,
    pipelineStates,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================

export const PulseRenderPlanPackageV31 = (opts = {}) => {
  const {
    id = "render-plan",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    renderPasses = [],
    drawLists = [],
    materialBatches = [],
    frameGraph = null,
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "render-plan-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    routingContract: "PulseSend-v31-Immortal-OneBand-Omega",
    renderPlanContract: "PulseGPU-RenderPlan-v31-Immortal-OneBand-Omega",
    frameGraphContract: "FrameGraph-v11",
    dnaTag,
    prewarmReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    passCount: renderPasses.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    renderPasses,
    drawLists,
    materialBatches,
    frameGraph,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================

export const PulseGPUDispatchHintPackageV31 = (opts = {}) => {
  const {
    id = "gpu-dispatch-hints",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    patternHints = [],
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "gpu-dispatch-hint-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    dispatchHintContract: "PulseGPU-DispatchHints-v31-Immortal-OneBand-Omega",
    dnaTag,
    intelligentComputeReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    hintCount: patternHints.length,
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    patternHints,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


export const PulseDiagnosticsPackageV31 = (opts = {}) => {
  const {
    id = "diagnostics",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    healthSurfaces = {},
    metadata = {},
    dnaTag = "default-dna"
  } = opts;

  const baseMeta = {
    layer: "PulseGPUBrain-v31",
    kind: "diagnostics-package",
    target: "oneband-gpu",
    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
    dnaTag,
    diagnosticsReady: true
  };

  const sig = buildPackageSignature({
    kind: baseMeta.kind,
    target: baseMeta.target,
    keys: Object.keys(healthSurfaces).sort(),
    dnaTag,
    schemaVersion: version
  });

  return Object.freeze({
    id,
    version,
    healthSurfaces,
    metadata: {
      ...baseMeta,
      ...metadata,
      packageSignature: sig.primary,
      packageSignatureDual: sig.dual,
      packageSignatureOmega: sig.omega
    }
  });
};


// ============================================================================
//  BRAIN INPUT (v31, one-band, binary-first, omega-aware)
// ============================================================================

export const BrainInputV31 = (opts = {}) => {
  const {
    schemaVersion = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    rawTextures = [],
    rawMeshes = [],
    rawAnimations = [],
    rawShaders = [],
    rawScenes = [],
    usagePatterns = {},
    predictionHints = {},

    gpuMemorySnapshot = null,
    gpuDispatchHistory = [],
    gpuAdvantageMap = null,

    dnaTag = "default-dna",
    instanceId = "",
    version = PULSE_GPU_BRAIN_VERSION,
    presenceContext = null,
    binaryPresence = null,
    sessionClass = null
  } = opts;

  return Object.freeze({
    schemaVersion,
    rawTextures,
    rawMeshes,
    rawAnimations,
    rawShaders,
    rawScenes,
    usagePatterns,
    predictionHints,

    gpuMemorySnapshot,
    gpuDispatchHistory,
    gpuAdvantageMap,

    dnaTag,
    instanceId,
    version,
    presenceContext,
    binaryPresence,
    sessionClass,

    evo: ONEBAND_GPU_EVO,
    brainVersion: PULSE_GPU_BRAIN_VERSION,
    routingContract: "PulseSend-v31-Immortal-OneBand-Omega",
    gpuOrganContract: "PulseGPU-v31-Immortal-OneBand-Omega",
    binaryGpuOrganContract: "PulseBinaryGPU-v31-Immortal-OneBand-Omega",
    earnCompatibility: "Earn-v30-GPU"
  });
};


// ============================================================================
//  OPTIMIZATION PIPELINES (PURE, v31)
// ============================================================================

export const TextureOptimizerV31 = {
  process(rawTextures, brainInput) {
    const intel = computeIntelligentAdvantageV31(brainInput);

    return PulseTexturePackageV31({
      optimizedTextures: rawTextures,
      dnaTag: brainInput.dnaTag,
      metadata: {
        sourceCount: rawTextures.length,
        optimizerContract: "TextureOptimizer-v31-Immortal-OneBand-Omega",
        hasGpuMemorySnapshot: !!brainInput.gpuMemorySnapshot,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const MeshOptimizerV31 = {
  process(rawMeshes, brainInput) {
    const dispatchHistoryCount = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory.length
      : 0;

    const intel = computeIntelligentAdvantageV31(brainInput);

    return PulseMeshPackageV31({
      simplifiedMeshes: rawMeshes,
      dnaTag: brainInput.dnaTag,
      metadata: {
        sourceCount: rawMeshes.length,
        optimizerContract: "MeshOptimizer-v31-Immortal-OneBand-Omega",
        dispatchHistoryCount,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const LightingBakerV31 = {
  process(rawScenes, brainInput) {
    const intel = computeIntelligentAdvantageV31(brainInput);

    return PulseLightingPackageV31({
      dnaTag: brainInput.dnaTag,
      metadata: {
        sceneCount: rawScenes.length,
        bakerContract: "LightingBaker-v31-Immortal-OneBand-Omega",
        hasAdvantageMap: !!brainInput.gpuAdvantageMap,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const AnimationBakerV31 = {
  process(rawAnimations, brainInput) {
    const hasUsagePatterns =
      !!brainInput.usagePatterns &&
      Object.keys(brainInput.usagePatterns).length > 0;

    const intel = computeIntelligentAdvantageV31(brainInput);

    return PulseAnimationPackageV31({
      bakedFrames: rawAnimations,
      dnaTag: brainInput.dnaTag,
      metadata: {
        clipCount: rawAnimations.length,
        bakerContract: "AnimationBaker-v31-Immortal-OneBand-Omega",
        hasUsagePatterns,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const ShaderCompilerV31 = {
  process(rawShaders, brainInput) {
    const hasDispatchHistory = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory.length > 0
      : false;

    const intel = computeIntelligentAdvantageV31(brainInput);

    return PulseShaderPackageV31({
      compiledVariants: rawShaders,
      dnaTag: brainInput.dnaTag,
      metadata: {
        shaderCount: rawShaders.length,
        compilerContract: "ShaderCompiler-v31-Immortal-OneBand-Omega",
        hasDispatchHistory,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const GPUDispatchHintBuilderV31 = {
  process(brainInput) {
    const history = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory
      : [];

    const intel = computeIntelligentAdvantageV31(brainInput);
    const patternMap = Object.create(null);

    history.forEach((d) => {
      const pattern = d.pattern || "gpu-default";
      const bucket = patternMap[pattern] || {
        pattern,
        count: 0,
        lastMode: d.mode || "normal",
        lastModeKind: d.modeKind || "symbolic",
        lastBinaryMode: !!d.binaryMode,
        lastDualMode: !!d.dualMode,
        lastAdvantageScore: d.meta.advantageScore || 0
      };
      bucket.count++;
      patternMap[pattern] = bucket;
    });

    const patternHints = Object.values(patternMap).map((bucket) => ({
      pattern: bucket.pattern,
      preferredMode: bucket.lastMode,
      preferredModeKind: bucket.lastModeKind,
      preferBinary: bucket.lastBinaryMode,
      preferDualMode: bucket.lastDualMode,
      observedCount: bucket.count,
      lastAdvantageScore: bucket.lastAdvantageScore,
      intelligentModeHint: intel.modeHint
    }));

    return PulseGPUDispatchHintPackageV31({
      patternHints,
      dnaTag: brainInput.dnaTag,
      metadata: {
        dispatchHistoryCount: history.length,
        hasAdvantageMap: !!brainInput.gpuAdvantageMap,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const RenderPlannerV31 = {
  process(rawScenes, usagePatterns, brainInput) {
    const hasUsagePatterns =
      !!usagePatterns && Object.keys(usagePatterns).length > 0;

    const intel = computeIntelligentAdvantageV31(brainInput);

    return PulseRenderPlanPackageV31({
      dnaTag: brainInput.dnaTag,
      metadata: {
        sceneCount: rawScenes.length,
        hasUsagePatterns,
        hasGpuMemorySnapshot: !!brainInput.gpuMemorySnapshot,
        plannerContract: "RenderPlanner-v31-Immortal-OneBand-Omega",
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
};

export const DiagnosticsBuilderV31 = {
  process(brainInput, packageSetShape) {
    const dispatchCount = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory.length
      : 0;

    const healthSurfaces = {
      dispatchCount,
      hasAdvantageMap: !!brainInput.gpuAdvantageMap,
      hasPresence: !!brainInput.presenceContext || !!brainInput.binaryPresence,
      sessionClass: brainInput.sessionClass || "gpu_session_cold",
      schemaVersion: packageSetShape.schemaVersion,
      brainVersion: packageSetShape.brainVersion
    };

    return PulseDiagnosticsPackageV31({
      healthSurfaces,
      dnaTag: brainInput.dnaTag,
      metadata: {
        diagnosticsContract: "PulseGPUBrainDiagnostics-v31-Immortal-OneBand-Omega",
        instanceId: brainInput.instanceId
      }
    });
  }
};


// ============================================================================
//  BRAIN ORCHESTRATOR (PURE, SYNCHRONOUS, v31)
// ============================================================================
export const PulseGPUBrainControllerV31 = {
  buildPackages(brainInput) {
    const textures      = TextureOptimizerV31.process(brainInput.rawTextures, brainInput);
    const meshes        = MeshOptimizerV31.process(brainInput.rawMeshes, brainInput);
    const lighting      = LightingBakerV31.process(brainInput.rawScenes, brainInput);
    const animation     = AnimationBakerV31.process(brainInput.rawAnimations, brainInput);
    const shaders       = ShaderCompilerV31.process(brainInput.rawShaders, brainInput);
    const renderPlan    = RenderPlannerV31.process(brainInput.rawScenes, brainInput.usagePatterns, brainInput);
    const dispatchHints = GPUDispatchHintBuilderV31.process(brainInput);

    const shape = {
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      target: "oneband-gpu",
      dnaTag: brainInput.dnaTag,
      instanceId: brainInput.instanceId
    };

    const dual = computeDualHashV30(shape);
    const tri  = computeTernaryHashV31(shape);

    const diagnostics = DiagnosticsBuilderV31.process(brainInput, shape);

    return Object.freeze({
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      target: "oneband-gpu",

      textures,
      meshes,
      lighting,
      animation,
      shaders,
      renderPlan,
      dispatchHints,
      diagnostics,

      evo: ONEBAND_GPU_EVO,
      routingContract: "PulseSend-v31-Immortal-OneBand-Omega",
      gpuOrganContract: "PulseGPU-v31-Immortal-OneBand-Omega",
      binaryGpuOrganContract: "PulseBinaryGPU-v31-Immortal-OneBand-Omega",
      dnaTag: brainInput.dnaTag,
      instanceId: brainInput.instanceId,

      packageSetSignature: dual.primary,
      packageSetSignatureDual: dual,
      packageSetSignatureOmega: tri.hC
    });
  }
};


// ============================================================================
//  EXPORT HOLDER (SINGLE PACKAGE SET)
// ============================================================================
export const PulseGPUBrainExportV31 = (() => {
  const lane = { packageSet: null };
  
  return {
    buildAndStore(brainInput) {
      lane.packageSet = PulseGPUBrainControllerV31.buildPackages(brainInput);
      return lane.packageSet;
    },

    exportToRuntime() {
      return lane.packageSet;
    }
  };
})();


// ============================================================================
//  EXPORTS — v31 IMMORTAL ONE-BAND OMEGA GPU BRAIN
// ============================================================================

export {
  PULSE_GPU_BRAIN_SCHEMA_VERSION,
  PULSE_GPU_BRAIN_VERSION,
  ONEBAND_GPU_EVO,
  BrainInputV31 as BrainInput,
  PulseTexturePackageV31 as PulseTexturePackage,
  PulseMeshPackageV31 as PulseMeshPackage,
  PulseLightingPackageV31 as PulseLightingPackage,
  PulseAnimationPackageV31 as PulseAnimationPackage,
  PulseShaderPackageV31 as PulseShaderPackage,
  PulseRenderPlanPackageV31 as PulseRenderPlanPackage,
  PulseGPUDispatchHintPackageV31 as PulseGPUDispatchHintPackage,
  PulseDiagnosticsPackageV31 as PulseDiagnosticsPackage,
  TextureOptimizerV31 as TextureOptimizer,
  MeshOptimizerV31 as MeshOptimizer,
  LightingBakerV31 as LightingBaker,
  AnimationBakerV31 as AnimationBaker,
  ShaderCompilerV31 as ShaderCompiler,
  RenderPlannerV31 as RenderPlanner,
  GPUDispatchHintBuilderV31 as GPUDispatchHintBuilder,
  DiagnosticsBuilderV31 as DiagnosticsBuilder,
  PulseGPUBrainControllerV31 as PulseGPUBrainController,
  PulseGPUBrainExportV31 as PulseGPUBrainExport,
  computeIntelligentAdvantageV31 as computeIntelligentAdvantage
};

export default PulseGPUBrainExportV31;

PulseRealm.GPUBrain = {
  PULSE_GPU_BRAIN_SCHEMA_VERSION,
  PULSE_GPU_BRAIN_VERSION,
  ONEBAND_GPU_EVO,
  BrainInputV31,
  PulseTexturePackageV31,
  PulseMeshPackageV31,
  PulseLightingPackageV31,
  PulseAnimationPackageV31,
  PulseShaderPackageV31,
  PulseRenderPlanPackageV31,
  PulseGPUDispatchHintPackageV31,
  PulseDiagnosticsPackageV31,
  TextureOptimizerV31,
  MeshOptimizerV31,
  LightingBakerV31,
  AnimationBakerV31,
  ShaderCompilerV31,
  RenderPlannerV31,
  GPUDispatchHintBuilderV31,
  DiagnosticsBuilderV31,
  PulseGPUBrainControllerV31,
  PulseGPUBrainExportV31,
  computeIntelligentAdvantageV31,
  createPulseCoreBrain
}