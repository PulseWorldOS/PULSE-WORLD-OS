// ============================================================================
//  PulseBinaryGPU-v31-IMMORTAL-UNIBAND-PLUS.js
//  BINARY GPU ORGAN • UNIFIED BAND • DETERMINISTIC v31 IMMORTAL+ CORE
//  • One-band model: band = symbolic | binary | dual | unified
//  • Deterministic GPU dispatch planning (no time, no randomness)
//  • Pressure-aware + factoring-aware + chunk-plan-aware + warm-path-aware
//  • Capability-aware via global PULSE_DEVICE_PROFILE
//  • Intel-signature-aware + advantage-field-v31-aware
//  • "PLAN ONCE. REUSE FOREVER. NEVER DRIFT. NEVER SPLINTER."
// ============================================================================
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import {PulseGPUBrainExportV31 as PulseGPUBrain}                 from "./PulseGPUBrain-v30.js";
import {PulseGPUGeneticMemory as PulseGPUGeneticMemoryModule}   from "./PulseGPUGeneticMemory-v30.js";
import {PulseGPUWarmPathCache as PulseGPUWarmPathCacheModule}   from "./PULSE-GPU-WARMPATHCACHE.js";

import {PulseGPUEngine as PulseGPUAstralMuscleSystem}    from "./PulseGPUAstralMuscleSystem-v30.js";
import {PulseGPUGuardianCortex as PulseGPUGuardianCortexModule}  from "./PulseGPUGuardianCortex-v30.js";

import createPulseGPUChunker, {createPulseGPUChunker as PulseGPUChunker}               from "./PULSE-GPU-CHUNKER.js";

import {
  AI_EXPERIENCE_META_PulseGPUChunkPlanner,
  ORGAN_META_PulseGPUChunkPlanner,
  ORGAN_CONTRACT_PulseGPUChunkPlanner,
  PulseGPUChunkPlannerMultiband as PulseGPUChunkPlanner
} from "./PULSE-GPU-CHUNKPLANNER.js";

import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";
import { createPulseEngineProcess as PulseMotionEngine } from "../../../../../PULSE-ENGINE/PulseEngineProcess-v31.js";

import {PulseCoreGMemory}                    from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ---------------------------------------------------------------------------
//  ROLE + META BLOCK (v31 IMMORTAL UNIBAND+)
// ---------------------------------------------------------------------------

export const BinaryGPURole = Object.freeze({
  identity: "PulseBinaryGPU-v31-IMMORTAL-UNIBAND-PLUS",
  layer: "GPU-BINARY",
  band: "unified",
  version: "v31-IMMORTAL-UNIBAND-PLUS"
});

export const BinaryGPUMetaBlock = Object.freeze({
  identity: BinaryGPURole.identity,
  version: BinaryGPURole.version,
  bandModel: "unified-band",
  safety: {
    noRandomness: true,
    noTimestamps: true,
    noExternalMutation: true,
    deterministic: true,
    driftProof: true,
    warmPathAware: true,
    advantageFieldV31Aware: true
  },
  evo: {
    unifiedBand: true,
    binaryFirst: true,
    dualModeReady: true,
    warmPathAware: true,
    chunkPlanAware: true,
    pressureAware: true,
    factoringAware: true,
    advantageFieldV31: true,
    gpuSpineReady: true,
    pulseSend31Ready: true,
    routingContract: "PulseSend-v31-Immortal-UnibandPlus",
    gpuOrganContract: "PulseGPU-v31-Immortal-UnibandPlus",
    binaryGpuOrganContract: "PulseBinaryGPU-v31-Immortal-UnibandPlus",
    earnCompatibility: "Earn-v31-GPU"
  }
});

// ---------------------------------------------------------------------------
//  INTERNAL HELPERS — deterministic, tiny, pure
// ---------------------------------------------------------------------------

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage, band) {
  const lineageKey = Array.isArray(lineage) ? lineage.join("::") : "";
  const bandKey = band || "symbolic";
  const raw = `gpu::${bandKey}::${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `gpu-shape-${bandKey}-${acc}`;
}

function computeDispatchSignature(pattern, band, profileStyle) {
  const bandKey = band || "symbolic";
  const styleKey = profileStyle || "neutral";
  const raw = `dispatch::${bandKey}::${pattern}::${styleKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc * 31 + raw.charCodeAt(i)) % 100000;
  }

  return `gpu-dispatch-${bandKey}-${acc}`;
}

function computeIntelSignature(payload) {
  const base = JSON.stringify(payload || {});
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `BINARYGPU_INTEL_${h}`;
}

function computeEvolutionStage(pattern, lineage, band) {
  const depth = Array.isArray(lineage) ? lineage.length : 0;
  const bandSuffix =
    band === "binary"  ? "-binary"  :
    band === "dual"    ? "-dual"    :
    band === "unified" ? "-unified" :
    "";

  if (depth === 1) return "seed"   + bandSuffix;
  if (depth === 2) return "sprout" + bandSuffix;
  if (depth === 3) return "branch" + bandSuffix;

  if (typeof pattern === "string") {
    if (pattern.includes("fuse"))     return "fused-kernel"    + bandSuffix;
    if (pattern.includes("batch"))    return "batched"         + bandSuffix;
    if (pattern.includes("stream"))   return "streaming"       + bandSuffix;
    if (pattern.includes("fallback")) return "fallback-aware"  + bandSuffix;
    if (pattern.includes("warm"))     return "warm-path-aware" + bandSuffix;
  }

  return "mature" + bandSuffix;
}

function computeModeBias(mode, pressure, factoringSnapshot, warmPathTier) {
  const modeLabel = mode || "normal";

  let bias = "neutral";

  if (modeLabel === "latency")       bias = "low-latency";
  else if (modeLabel === "throughput") bias = "high-throughput";
  else if (modeLabel === "energy")     bias = "low-energy";
  else if (modeLabel === "recovery")   bias = "high-reliability";

  const gpuLoad        = pressure.gpuLoadPressure || 0;
  const thermal        = pressure.thermalPressure || 0;
  const mem            = pressure.memoryPressure || 0;
  const meshStorm      = pressure.meshStormPressure || 0;
  const auraTension    = pressure.auraTension || 0;
  const factoringPress = factoringSnapshot.factoringPressure || 0;

  if (gpuLoad > 0.7 || thermal > 0.7 || meshStorm > 0.6) {
    bias = "fallback-friendly";
  } else if (mem > 0.7) {
    bias = "memory-conservative";
  }

  if (factoringPress > 0.5 || auraTension > 0.5) {
    bias = "stability-first";
  }

  if (warmPathTier === "strong" && bias === "neutral") {
    bias = "high-throughput";
  }

  return bias;
}

function selectDispatchProfile(pattern, modeBias, band, multiInstanceHint, warmPathTier) {
  const base = {
    style: "neutral",
    kernelType: "standard",
    maxBatchSize: 1,
    allowFusion: false,
    allowStreaming: false,
    allowFallbackCPU: true,
    band,
    multiInstanceOptimized: !!multiInstanceHint,
    warmPathTier: warmPathTier || "none"
  };

  const mark = (profile) => ({
    ...profile,
    band,
    multiInstanceOptimized: !!multiInstanceHint,
    warmPathTier: warmPathTier || "none"
  });

  const p = typeof pattern === "string" ? pattern : "";

  if (p.includes("fuse")) {
    return mark({
      style: "fused",
      kernelType: "fused",
      maxBatchSize: band === "binary" ? 16 : 8,
      allowFusion: true,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (p.includes("batch")) {
    return mark({
      style: "batched",
      kernelType: "batched",
      maxBatchSize: band === "binary" ? 128 : 32,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (p.includes("stream")) {
    return mark({
      style: "streaming",
      kernelType: "streaming",
      maxBatchSize: band === "binary" ? 8 : 4,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "low-latency") {
    return mark({
      style: "latency-first",
      kernelType: "standard",
      maxBatchSize: 1,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "high-throughput") {
    return mark({
      style: "throughput-first",
      kernelType: "batched",
      maxBatchSize: band === "binary" ? 256 : 64,
      allowFusion: true,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "fallback-friendly") {
    return mark({
      style: "fallback-aware",
      kernelType: "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "memory-conservative") {
    return mark({
      style: "memory-conservative",
      kernelType: "standard",
      maxBatchSize: 4,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "stability-first") {
    return mark({
      style: "stability-first",
      kernelType: "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  return mark(base);
}

function resolveBandSurface(context = {}) {
  const flags = context.flags || {};

  if (flags.unified_band || context.band === "unified") {
    return { band: "unified", binaryMode: true, dualMode: true };
  }

  if (flags.binary_mode || context.band === "binary") {
    return { band: "binary", binaryMode: true, dualMode: false };
  }

  if (flags.dual_mode || context.band === "dual") {
    return { band: "dual", binaryMode: true, dualMode: true };
  }

  return { band: "symbolic", binaryMode: false, dualMode: false };
}

function computeAdvantageScore({ pattern, modeBias, band, pressureSnapshot, warmPathTier }) {
  let score = 0;
  const p = typeof pattern === "string" ? pattern : "";

  if (band === "binary")  score += 2;
  if (band === "dual")    score += 2;
  if (band === "unified") score += 3;

  if (p.includes("fuse"))   score += 2;
  if (p.includes("batch"))  score += 2;
  if (p.includes("stream")) score += 1;

  if (modeBias === "high-throughput") score += 2;
  if (modeBias === "low-latency")     score += 1;

  const gpuLoad = pressureSnapshot.gpuLoadPressure || 0;
  if (gpuLoad < 0.3) score += 1;

  if (warmPathTier === "strong") score += 2;
  else if (warmPathTier === "medium") score += 1;

  return score;
}

function computeWarmPathTierFromContext(context = {}) {
  const warm = context.warmPathHints || null;
  if (!warm || !warm.cacheTier) return "none";
  return warm.cacheTier;
}

// ---------------------------------------------------------------------------
//  v31 UNIBAND DISPATCH FACTORY (IMMORTAL+)
// ---------------------------------------------------------------------------

export function createBinaryGPUDispatch({
  jobId,
  pattern,
  payload = {},
  mode = "normal",
  parentLineage = null,
  pressureSnapshot = null,
  factoringSnapshot = null,
  context = {},
  dnaTag = "default-dna",
  version = BinaryGPURole.version
}) {
  const warmPathTier = computeWarmPathTierFromContext(context);
  const { band, binaryMode, dualMode } = resolveBandSurface(context);

  const lineage        = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage, band);
  const evolutionStage = computeEvolutionStage(pattern, lineage, band);
  const modeBias       = computeModeBias(
    mode,
    pressureSnapshot || {},
    factoringSnapshot || {},
    warmPathTier
  );
  const multiInstanceHint = !!context.multiInstance;
  const profile        = selectDispatchProfile(
    pattern,
    modeBias,
    band,
    multiInstanceHint,
    warmPathTier
  );
  const dispatchSignature = computeDispatchSignature(
    pattern,
    band,
    profile.style
  );

  const advantageScore = computeAdvantageScore({
    pattern,
    modeBias,
    band,
    pressureSnapshot: pressureSnapshot || {},
    warmPathTier
  });

  const executionContext = {
    band,
    binaryMode,
    dualMode,
    pipelineId: context.pipelineId || "",
    sceneType: context.sceneType || "",
    workloadClass: context.workloadClass || "",
    resolution: context.resolution || "",
    refreshRate: context.refreshRate || 0,
    instanceId: context.instanceId || "",
    multiInstance: multiInstanceHint,
    dispatchSignature,
    shapeSignature,
    chunkProfile: context.chunkProfile || null,
    chunkPlanId: context.chunkPlanId || null,
    warmPathTier
  };

  const intelSignature = computeIntelSignature({
    jobId,
    pattern,
    band,
    mode,
    modeBias,
    warmPathTier,
    advantageScore
  });

  return {
    GPURole: BinaryGPURole,
    metaBlock: BinaryGPUMetaBlock,
    jobId,
    pattern,
    payload,
    mode,
    lineage,
    band,
    binaryMode,
    dualMode,
    dnaTag,
    version,
    executionContext,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || {},
      factoringSnapshot: factoringSnapshot || {},
      warmPathTier,
      intelSignature
    }
  };
}

// ---------------------------------------------------------------------------
//  v31 UNIBAND EVOLUTION ENGINE (IMMORTAL+)
// ---------------------------------------------------------------------------

export function evolveBinaryGPUDispatch(dispatch, context = {}) {
  const {
    mode: nextMode,
    pressureSnapshot,
    factoringSnapshot,
    ...ctxRest
  } = context;

  const modeLabel = nextMode || dispatch.mode || "normal";
  const lineage   = Array.isArray(dispatch.lineage) ? dispatch.lineage : [];
  const pattern   = dispatch.pattern;

  const warmPathTier =
    computeWarmPathTierFromContext({
      ...ctxRest,
      warmPathHints: ctxRest.warmPathHints || dispatch.executionContext.warmPathTier
        ? { cacheTier: dispatch.executionContext.warmPathTier }
        : null
    }) || dispatch.executionContext.warmPathTier || "none";

  const { band, binaryMode, dualMode } = resolveBandSurface({
    ...ctxRest,
    band: dispatch.executionContext.band || dispatch.band,
    flags: {
      ...(ctxRest.flags || {}),
      binary_mode: dispatch.binaryMode,
      dual_mode: dispatch.dualMode,
      unified_band: dispatch.executionContext.band === "unified"
    }
  });

  const nextLineage       = buildLineage(lineage, pattern);
  const shapeSignature    = computeShapeSignature(pattern, nextLineage, band);
  const evolutionStage    = computeEvolutionStage(pattern, nextLineage, band);
  const modeBias          = computeModeBias(
    modeLabel,
    pressureSnapshot || dispatch.meta.pressureSnapshot || {},
    factoringSnapshot || dispatch.meta.factoringSnapshot || {},
    warmPathTier
  );
  const multiInstanceHint = !!ctxRest.multiInstance || !!dispatch.executionContext.multiInstance;
  const profile           = selectDispatchProfile(
    pattern,
    modeBias,
    band,
    multiInstanceHint,
    warmPathTier
  );
  const dispatchSignature = computeDispatchSignature(
    pattern,
    band,
    profile.style
  );

  const advantageScore = computeAdvantageScore({
    pattern,
    modeBias,
    band,
    pressureSnapshot: pressureSnapshot || dispatch.meta.pressureSnapshot || {},
    warmPathTier
  });

  const prevExec = dispatch.executionContext || {};
  const executionContext = {
    band,
    binaryMode,
    dualMode,
    pipelineId: ctxRest.pipelineId || prevExec.pipelineId || "",
    sceneType: ctxRest.sceneType || prevExec.sceneType || "",
    workloadClass: ctxRest.workloadClass || prevExec.workloadClass || "",
    resolution: ctxRest.resolution || prevExec.resolution || "",
    refreshRate: ctxRest.refreshRate || prevExec.refreshRate || 0,
    instanceId: ctxRest.instanceId || prevExec.instanceId || "",
    multiInstance: multiInstanceHint,
    dispatchSignature,
    shapeSignature,
    chunkProfile: ctxRest.chunkProfile || prevExec.chunkProfile || null,
    chunkPlanId: ctxRest.chunkPlanId || prevExec.chunkPlanId || null,
    warmPathTier
  };

  const intelSignature = computeIntelSignature({
    jobId: dispatch.jobId,
    pattern,
    band,
    mode: modeLabel,
    modeBias,
    warmPathTier,
    advantageScore
  });

  return {
    GPURole: BinaryGPURole,
    metaBlock: BinaryGPUMetaBlock,
    jobId: dispatch.jobId,
    pattern,
    payload: dispatch.payload,
    mode: modeLabel,
    lineage: nextLineage,
    band,
    binaryMode,
    dualMode,
    dnaTag: dispatch.dnaTag || "default-dna",
    version: dispatch.version || BinaryGPURole.version,
    executionContext,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || dispatch.meta.pressureSnapshot || {},
      factoringSnapshot: factoringSnapshot || dispatch.meta.factoringSnapshot || {},
      warmPathTier,
      intelSignature
    }
  };
}

// ============================================================================
//  PulseBinaryGPUImmortal — IMMORTAL PSEUDO‑CLASS (v31++)
// ============================================================================
// ============================================================================
//  PulseBinaryGPUImmortal — Unified IMMORTAL Organ (v31‑UNIBAND‑PLUS)
// ============================================================================

export const PulseBinaryGPUImmortal = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    config: null,

    pressure: null,
    factoring: null,
    gpuCore: null,
    chunkCache: null,
    warmPath: null,

    logger: console
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (config = {}) => {
    lane.config = {
      id: BinaryGPURole.identity,
      ...config
    };

    lane.pressure   = config.pressure   || null;
    lane.factoring  = config.factoring  || null;
    lane.gpuCore    = config.gpuCore    || null;
    lane.chunkCache = config.chunkCache || null;
    lane.warmPath   = config.warmPath   || null;

    lane.logger = config.logger || console;
  };

  // ------------------------------------------------------------
  // INTERNAL HELPERS
  // ------------------------------------------------------------
  const safeCall = (target, method) => {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch { return null; }
  };

  const snapshotChunkCache = () => {
    try {
      if (!lane.chunkCache.snapshot) return null;
      return lane.chunkCache.snapshot();
    } catch { return null; }
  };

  const log = (event, payload) => {
    try {
      lane.logger.log(event, {
        ...payload,
        binaryGPU: {
          identity: BinaryGPUMetaBlock.identity,
          version: BinaryGPUMetaBlock.version
        }
      });
    } catch {}
  };

  const getGlobalDeviceProfile = () => {
    const PulseGlobal1a = (typeof window !== "undefined" ? window : globalThis);
    const PulseGlobal2a = (typeof global !== "undefined" ? global : PulseGlobal1a);
    const PulseGlobal3a = (typeof globalThis !== "undefined" ? globalThis : PulseGlobal2a);
    const PULSE_DEVICE_PROFILE = Object.assign({}, PulseGlobal1a, PulseGlobal2a, PulseGlobal3a);
    return PULSE_DEVICE_PROFILE || null;
  };

  const buildDeviceProfileSnapshot = () => {
    const dp = getGlobalDeviceProfile();
    if (!dp) return null;
    return {
      capabilityTier: dp.capabilityTier,
      capabilityScore: dp.capabilityScore,
      gpuScore: dp.gpuScore,
      gpuRam: dp.gpuRam,
      bandwidthMbps: dp.bandwidthMbps,
      stabilityScore: dp.stabilityScore
    };
  };

  // ------------------------------------------------------------
  // BINARY PLAN
  // ------------------------------------------------------------
  const describeBinaryPlan = (pattern, options = {}, env = {}) => {
    const parentLineage = options.parentLineage || [];
    const band = options.band || env.band || "binary";
    const mode = options.mode || env.mode || "normal";
    const multiInstanceHint =
      options.multiInstanceHint || env.multiInstanceHint || false;

    const pressureSnapshot =
      options.pressureSnapshot ||
      env.pressureSnapshot ||
      safeCall(lane.pressure, "snapshot") ||
      null;

    const factoringSnapshot =
      options.factoringSnapshot ||
      env.factoringSnapshot ||
      safeCall(lane.factoring, "snapshot") ||
      null;

    const warmPathHints =
      options.warmPathHints ||
      env.warmPathHints ||
      safeCall(lane.warmPath, "compute") ||
      null;

    const warmPathTier = warmPathHints.cacheTier || "none";

    const lineage        = buildLineage(parentLineage, pattern);
    const shapeSignature = computeShapeSignature(pattern, lineage, band);
    const evolutionStage = computeEvolutionStage(pattern, lineage, band);
    const modeBias       = computeModeBias(
      mode,
      pressureSnapshot || {},
      factoringSnapshot || {},
      warmPathTier
    );
    const profile = selectDispatchProfile(
      pattern,
      modeBias,
      band,
      multiInstanceHint,
      warmPathTier
    );
    const dispatchSignature = computeDispatchSignature(
      pattern,
      band,
      profile.style
    );
    const advantageScore = computeAdvantageScore({
      pattern,
      modeBias,
      band,
      pressureSnapshot: pressureSnapshot || {},
      warmPathTier
    });

    const deviceProfileSnapshot = buildDeviceProfileSnapshot();

    const intelSignature = computeIntelSignature({
      pattern,
      band,
      mode,
      modeBias,
      warmPathTier,
      advantageScore
    });

    const plan = {
      meta: {
        id: lane.config.id,
        version: BinaryGPURole.version,
        bandModel: BinaryGPUMetaBlock.bandModel,
        deviceProfile: deviceProfileSnapshot,
        evo: BinaryGPUMetaBlock.evo || null
      },
      pattern,
      lineage,
      band,
      mode,
      modeBias,
      evolutionStage,
      shapeSignature,
      dispatchSignature,
      profile,
      advantageScore,
      pressureSnapshot,
      factoringSnapshot,
      warmPathTier,
      warmPathHints,
      chunkCacheSnapshot: snapshotChunkCache(),
      intelSignature
    };

    log("binary-gpu:plan-v31-uniband-plus", { plan });
    return plan;
  };

  // ------------------------------------------------------------
  // BINARY SURFACE SNAPSHOT
  // ------------------------------------------------------------
  const snapshotBinarySurface = () => {
    const gpuView =
      safeCall(lane.gpuCore, "buildGpuView") ||
      safeCall(lane.gpuCore, "snapshotGPU") ||
      null;

    const pressureSnapshot  = safeCall(lane.pressure, "snapshot") || null;
    const factoringSnapshot = safeCall(lane.factoring, "snapshot") || null;
    const warmPathHints     = safeCall(lane.warmPath, "compute") || null;
    const warmPathTier      = warmPathHints.cacheTier || "none";

    const deviceProfileSnapshot = buildDeviceProfileSnapshot();

    const snapshot = {
      meta: {
        id: lane.config.id,
        version: BinaryGPURole.version,
        bandModel: BinaryGPUMetaBlock.bandModel,
        deviceProfile: deviceProfileSnapshot,
        evo: BinaryGPUMetaBlock.evo || null
      },
      gpuView,
      pressureSnapshot,
      factoringSnapshot,
      warmPathTier,
      warmPathHints,
      chunkCache: snapshotChunkCache()
    };

    log("binary-gpu:snapshot-surface-v31-uniband-plus", { snapshot });
    return snapshot;
  };

  // ------------------------------------------------------------
  // INTELLIGENT HINT ENGINE
  // ------------------------------------------------------------
  const intelligentComputeHint = (dispatch) => {
    if (!dispatch.meta) {
      return {
        level: "none",
        reason: "no-dispatch",
        suggestions: []
      };
    }

    const {
      profile,
      modeBias,
      advantageScore,
      pressureSnapshot,
      warmPathTier
    } = dispatch.meta;

    const suggestions = [];

    if (
      profile.style.includes("throughput") &&
      pressureSnapshot.gpuLoadPressure > 0.8
    ) {
      suggestions.push("consider-reducing-batch-size");
      suggestions.push("prefer-streaming-or-latency-profile");
    }

    if (
      profile.style.includes("latency") &&
      pressureSnapshot.gpuLoadPressure < 0.3
    ) {
      suggestions.push("consider-increasing-batch-size");
    }

    if (modeBias === "memory-conservative" && profile.maxBatchSize > 4) {
      suggestions.push("cap-batch-size-to-4-for-memory");
    }

    if (advantageScore < 2) {
      suggestions.push("pattern-may-benefit-from-fuse-or-batch-variant");
    }

    if (warmPathTier === "strong" && !profile.style.includes("throughput")) {
      suggestions.push("enable-throughput-profile-for-strong-warm-path");
    }

    const level =
      suggestions.length === 0 ? "none" :
      suggestions.length <= 2 ? "mild" :
      "strong";

    const hint = {
      meta: {
        id: lane.config.id,
        version: BinaryGPURole.version,
        bandModel: BinaryGPUMetaBlock.bandModel
      },
      level,
      modeBias,
      advantageScore,
      warmPathTier: warmPathTier || "none",
      suggestions
    };

    log("binary-gpu:intelligent-hint-v31-uniband-plus", { hint });
    return hint;
  };

  // ------------------------------------------------------------
  // PREWARM CHUNKS
  // ------------------------------------------------------------
  const prewarmBinaryChunks = (hints = {}) => {
    if (!lane.chunkCache.prewarm) return null;

    const payload = { hints };
    const result = lane.chunkCache.prewarm(payload);

    log("binary-gpu:prewarm-chunks-v31-uniband-plus", { payload, result });
    return result;
  };

  // ------------------------------------------------------------
  // DIAGNOSTICS
  // ------------------------------------------------------------
  const diagnostics = () => {
    const deviceProfileSnapshot = buildDeviceProfileSnapshot();

    const diag = {
      GPURole: BinaryGPURole,
      metaBlock: BinaryGPUMetaBlock,
      deviceProfile: deviceProfileSnapshot
    };

    log("binary-gpu:diagnostics-v31-uniband-plus", { diag });
    return diag;
  };

  // ------------------------------------------------------------
  // PUBLIC DISPATCH API (MERGED FROM PulseBinaryGPU)
// ------------------------------------------------------------
  const plan = (
    earn,
    mode = "normal",
    pressureSnapshot = null,
    factoringSnapshot = null,
    context = {},
    dnaTag = "default-dna",
    version = BinaryGPURole.version
  ) => {
    const jobId   = earn.jobId;
    const pattern = earn.pattern || "gpu-binary-default";
    const payload = earn.payload || {};
    const lineage = earn.lineage || [];

    const ctx = {
      ...context,
      band: context.band || "binary",
      flags: {
        ...(context.flags || {}),
        binary_mode:
          context.band === "binary" || !context.band
            ? true
            : !!context.flags.binary_mode
      }
    };

    return createBinaryGPUDispatch({
      jobId,
      pattern,
      payload,
      mode,
      parentLineage: lineage,
      pressureSnapshot,
      factoringSnapshot,
      context: ctx,
      dnaTag,
      version
    });
  };

  const evolve = (dispatch, context = {}) => {
    return evolveBinaryGPUDispatch(dispatch, context);
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    describeBinaryPlan,
    snapshotBinarySurface,
    intelligentComputeHint,
    prewarmBinaryChunks,
    diagnostics,

    // merged public API
    plan,
    evolve
  };

})();

export const PulseBinaryGPU = PulseBinaryGPUImmortal;

// ---------------------------------------------------------------------------
//  FACTORY FOR IMMORTAL SURFACE
// ---------------------------------------------------------------------------
export const createPulseBinaryGPUImmortal = (config = {}) => {
  // Initialize the IMMORTAL organ
  PulseBinaryGPUImmortal.init(config);

  // Return a frozen surface (no class, no instance)
  return Object.freeze({
    meta: BinaryGPUMetaBlock,

    describeBinaryPlan(pattern, options, env) {
      return PulseBinaryGPUImmortal.describeBinaryPlan(pattern, options, env);
    },

    snapshotBinarySurface() {
      return PulseBinaryGPUImmortal.snapshotBinarySurface();
    },

    prewarmBinaryChunks(hints) {
      return PulseBinaryGPUImmortal.prewarmBinaryChunks(hints);
    },

    intelligentComputeHint(dispatch) {
      return PulseBinaryGPUImmortal.intelligentComputeHint(dispatch);
    },

    diagnostics() {
      return PulseBinaryGPUImmortal.diagnostics();
    },

    // merged public API
    plan: PulseBinaryGPUImmortal.plan,
    evolve: PulseBinaryGPUImmortal.evolve
  });
};

PulseRealm.PulseGPUBinary = {
  createPulseBinaryGPUImmortal,
  PulseBinaryGPUImmortal,
  evolveBinaryGPUDispatch,
  createBinaryGPUDispatch,
  BinaryGPUMetaBlock,
  BinaryGPURole
}