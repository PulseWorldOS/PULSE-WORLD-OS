// ============================================================================
//  PulseGPU-v31-IMMORTAL-OMNIBAND.js
//  UNIFIED GPU ORGAN • OMNI-BAND (symbolic | binary | unified) • v31 IMMORTAL
//  Deterministic Dispatch Organ • Pattern + Lineage + Shape + Capability + Presence
//  Dual-Mode + Omni-Band: Symbolic, Binary, Unified • Multi-Instance • Chunker + Worker Aware
//  “PLAN ONCE. REUSE FOREVER. NEVER DRIFT. NEVER LAG. NEVER SPLIT THE ORGANISM.”
//  • Metadata-only, zero GPU calls, zero side effects
//  • Strict: no randomness, no timestamps in core surfaces
//  • Fully capability-aware (PULSE_DEVICE_PROFILE / capabilityTier / capabilityScore)
// ============================================================================
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import {PulseGPUBrainExportV31 as PulseGPUBrain}                 from "./PulseGPUBrain-v30.js";
import {PulseGPUGeneticMemory}   from "./PulseGPUGeneticMemory-v30.js";
import {PulseGPUWarmPathCache}   from "./PULSE-GPU-WARMPATHCACHE.js";

import {PulseGPUEngine as PulseGPUAstralMuscleSystem}    from "./PulseGPUAstralMuscleSystem-v30.js";
import {PulseGPUGuardianCortex}  from "./PulseGPUGuardianCortex-v30.js";

import {createPulseGPUChunker as PulseGPUChunker}               from "./PULSE-GPU-CHUNKER.js";

import {
  AI_EXPERIENCE_META_PulseGPUChunkPlanner,
  ORGAN_META_PulseGPUChunkPlanner,
  ORGAN_CONTRACT_PulseGPUChunkPlanner,
  PulseGPUChunkPlannerMultiband as PulseGPUChunkPlanner
} from "./PULSE-GPU-CHUNKPLANNER.js";

import { PulseGPUProcessWorker, detectDeviceProfile as detectGpuDeviceProfile} from "../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";
import { createPulseEngineProcess as PulseMotionEngine } from "../../../../../PULSE-ENGINE/PulseEngineProcess-v31.js";

import {PulseCoreGMemory} from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  VERSION + ROLE (v31 OMNIBAND)
// ============================================================================

export const PULSE_GPU_ORGAN_VERSION_V31 = "31.0-IMMORTAL-OMNIBAND";
export const PULSE_GPU_ORGAN_SCHEMA_V31  = 1;

export const GPURoleV31 = Object.freeze({
  identity: "PulseGPU-Organ-v31-Immortal-OmniBand",
  version: PULSE_GPU_ORGAN_VERSION_V31,
  dualGpu: true,
  omniBand: true,
  description:
    "Unified omni-band GPU organ (symbolic + binary + unified) — deterministic dispatch, lineage, warm-path, genetic memory, process-worker aware, capability-aware, chunker-aware."
});

export const GPUMetaBlockV31 = Object.freeze({
  identity: GPURoleV31.identity,
  version: GPURoleV31.version,
  dualGpu: true,
  bands: ["symbolic", "binary", "unified"],
  gpuMode: "omni-band",
  warmPathAware: true,
  geneticMemoryAware: true,
  guardianCortexAware: true,
  astralMuscleAware: true,
  processWorkerAware: true,
  motionEngineAware: true,
  chunkerAware: true,
  earnAware: true,
  multiInstanceReady: true,
  deterministic: true,
  zeroEntropy: true,
  capabilityAware: true,
  schemaVersion: PULSE_GPU_ORGAN_SCHEMA_V31
});

// ============================================================================
//  CAPABILITY SUBSTRATE (v31) — NO TIME, PURE
// ============================================================================

function toNumber(value, fallback) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(value, min, max) {
  const v = toNumber(value, min);
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

function classifyCapabilityTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 7000) return "elite";
  if (score >= 5000) return "high";
  if (score >= 3000) return "medium";
  if (score > 0) return "low";
  return "none";
}

function normalizeDeviceProfile(raw) {
  if (!raw || typeof raw !== "object") return null;

  const gpuScore   = toNumber(raw.gpuScore, 0);
  const gpuRam     = toNumber(raw.gpuRam, 0);
  const cpuScore   = toNumber(raw.cpuScore, 0);
  const memScore   = toNumber(raw.memScore, 0);
  const bandwidth  = toNumber(raw.bandwidthMbps ?? raw.bandwidth, 0);
  const stability  = toNumber(raw.stabilityScore ?? raw.stability, 0);

  const capabilityScore =
    typeof raw.capabilityScore === "number"
      ? raw.capabilityScore
      : gpuScore * 0.5 +
        cpuScore * 0.2 +
        memScore * 0.2 +
        bandwidth * 0.05 +
        stability * 0.05;

  const capabilityTier =
    raw.capabilityTier ||
    raw.gpuTier ||
    classifyCapabilityTier(capabilityScore);

  return {
    gpuTier: capabilityTier,
    gpuScore,
    gpuRam,
    cpuScore,
    memScore,
    bandwidthMbps: bandwidth,
    stabilityScore: stability,
    capabilityScore,
    capabilityTier
  };
}

function getImmortalDeviceProfileV31(explicitDeviceProfile = null) {
  const explicit = normalizeDeviceProfile(explicitDeviceProfile);
  if (explicit) return explicit;

  const globalDevice =
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  const globalNormalized = normalizeDeviceProfile(globalDevice);
  if (globalNormalized) return globalNormalized;

  const gpuScore = 7200;
  const cpuScore = 3600;
  const memScore = 4800;
  const bandwidth = 500;
  const stability = 0.97;
  const capabilityScore =
    gpuScore * 0.5 +
    cpuScore * 0.2 +
    memScore * 0.2 +
    bandwidth * 0.05 +
    stability * 0.05;

  return {
    gpuTier: "elite",
    gpuScore,
    gpuRam: 24,
    cpuScore,
    memScore,
    bandwidthMbps: bandwidth,
    stabilityScore: stability,
    capabilityScore,
    capabilityTier: "elite"
  };
}

// ============================================================================
//  LINEAGE / SIGNATURES / ADVANTAGE (v31, omni-band)
// ============================================================================

function buildLineageV31(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function resolveModeKindV31(modeKind, bandHint) {
  if (bandHint === "unified") return "unified";
  if (modeKind === "binary")  return "binary";
  if (modeKind === "unified") return "unified";
  if (modeKind === "symbolic") return "symbolic";
  return "symbolic";
}

function computeShapeSignatureV31(pattern, lineage, modeKind) {
  const lineageKey = Array.isArray(lineage) ? lineage.join("::") : "";
  const mk = modeKind || "symbolic";
  const raw = `gpu::${mk}::${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 131071;
  }

  return `gpu-shape-v31-${mk}-${acc}`;
}

function computeDispatchSignatureV31(pattern, modeKind, profileStyle) {
  const mk = modeKind || "symbolic";
  const style = profileStyle || "neutral";
  const raw = `dispatch::${mk}::${pattern}::${style}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc * 31 + raw.charCodeAt(i)) % 131071;
  }

  return `gpu-dispatch-v31-${mk}-${acc}`;
}

function computeEvolutionStageV31(pattern, lineage, modeKind) {
  const depth = Array.isArray(lineage) ? lineage.length : 0;
  const suffix =
    modeKind === "binary"  ? "-binary"  :
    modeKind === "unified" ? "-unified" :
    "-symbolic";

  if (depth === 1) return "seed"   + suffix;
  if (depth === 2) return "sprout" + suffix;
  if (depth === 3) return "branch" + suffix;

  if (typeof pattern === "string") {
    if (pattern.includes("fuse"))     return "fused-kernel" + suffix;
    if (pattern.includes("batch"))    return "batched"      + suffix;
    if (pattern.includes("stream"))   return "streaming"    + suffix;
    if (pattern.includes("fallback")) return "fallback-aware" + suffix;
  }

  return "mature" + suffix;
}

function computeModeBiasV31(mode, pressure, modeKind) {
  const modeLabel = mode || "normal";
  let bias = "neutral";

  if (modeLabel === "latency")    bias = "low-latency";
  else if (modeLabel === "throughput") bias = "high-throughput";
  else if (modeLabel === "energy")     bias = "low-energy";
  else if (modeLabel === "recovery")   bias = "high-reliability";

  const gpuLoad     = pressure.gpuLoadPressure || 0;
  const thermal     = pressure.thermalPressure || 0;
  const mem         = pressure.memoryPressure || 0;
  const meshStorm   = pressure.meshStormPressure || 0;
  const auraTension = pressure.auraTension || 0;

  if (gpuLoad > 0.7 || thermal > 0.7 || meshStorm > 0.6) {
    bias = "fallback-friendly";
  } else if (mem > 0.7) {
    bias = "memory-conservative";
  }

  if (auraTension > 0.5) {
    bias = "stability-first";
  }

  if (modeKind === "binary" && bias === "high-throughput") return "binary-throughput";
  if (modeKind === "binary" && bias === "low-latency")     return "binary-latency";
  if (modeKind === "unified" && bias === "high-throughput") return "unified-throughput";
  if (modeKind === "unified" && bias === "low-latency")     return "unified-latency";

  return bias;
}

function selectDispatchProfileV31(pattern, modeBias, modeKind, multiInstanceHint) {
  const mk = modeKind || "symbolic";

  const base = {
    style: "neutral",
    kernelType:
      mk === "binary"  ? "binary-standard"  :
      mk === "unified" ? "unified-standard" :
                         "standard",
    maxBatchSize: 1,
    allowFusion: false,
    allowStreaming: false,
    allowFallbackCPU: true,
    modeKind: mk,
    multiInstanceOptimized: !!multiInstanceHint
  };

  const mark = (profile) => ({
    ...profile,
    modeKind: mk,
    multiInstanceOptimized: !!multiInstanceHint
  });

  const p = typeof pattern === "string" ? pattern : "";

  if (p.includes("fuse")) {
    return mark({
      style:
        mk === "binary"  ? "binary-fused"  :
        mk === "unified" ? "unified-fused" :
                           "fused",
      kernelType:
        mk === "binary"  ? "binary-fused"  :
        mk === "unified" ? "unified-fused" :
                           "fused",
      maxBatchSize: mk === "binary" ? 16 : 8,
      allowFusion: true,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (p.includes("batch")) {
    return mark({
      style:
        mk === "binary"  ? "binary-batched"  :
        mk === "unified" ? "unified-batched" :
                           "batched",
      kernelType:
        mk === "binary"  ? "binary-batched"  :
        mk === "unified" ? "unified-batched" :
                           "batched",
      maxBatchSize: mk === "binary" ? 256 : 64,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (p.includes("stream")) {
    return mark({
      style:
        mk === "binary"  ? "binary-streaming"  :
        mk === "unified" ? "unified-streaming" :
                           "streaming",
      kernelType:
        mk === "binary"  ? "binary-streaming"  :
        mk === "unified" ? "unified-streaming" :
                           "streaming",
      maxBatchSize: mk === "binary" ? 8 : 4,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "low-latency" ||
      modeBias === "binary-latency" ||
      modeBias === "unified-latency") {
    return mark({
      style:
        mk === "binary"  ? "binary-latency-first"  :
        mk === "unified" ? "unified-latency-first" :
                           "latency-first",
      kernelType:
        mk === "binary"  ? "binary-standard"  :
        mk === "unified" ? "unified-standard" :
                           "standard",
      maxBatchSize: 1,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "high-throughput" ||
      modeBias === "binary-throughput" ||
      modeBias === "unified-throughput") {
    return mark({
      style:
        mk === "binary"  ? "binary-throughput-first"  :
        mk === "unified" ? "unified-throughput-first" :
                           "throughput-first",
      kernelType:
        mk === "binary"  ? "binary-batched"  :
        mk === "unified" ? "unified-batched" :
                           "batched",
      maxBatchSize: mk === "binary" ? 256 : 64,
      allowFusion: true,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "fallback-friendly") {
    return mark({
      style:
        mk === "binary"  ? "binary-fallback-aware"  :
        mk === "unified" ? "unified-fallback-aware" :
                           "fallback-aware",
      kernelType:
        mk === "binary"  ? "binary-standard"  :
        mk === "unified" ? "unified-standard" :
                           "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "memory-conservative") {
    return mark({
      style:
        mk === "binary"  ? "binary-memory-conservative"  :
        mk === "unified" ? "unified-memory-conservative" :
                           "memory-conservative",
      kernelType:
        mk === "binary"  ? "binary-standard"  :
        mk === "unified" ? "unified-standard" :
                           "standard",
      maxBatchSize: 4,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "stability-first") {
    return mark({
      style:
        mk === "binary"  ? "binary-stability-first"  :
        mk === "unified" ? "unified-stability-first" :
                           "stability-first",
      kernelType:
        mk === "binary"  ? "binary-standard"  :
        mk === "unified" ? "unified-standard" :
                           "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  return base;
}

function computeAdvantageScoreV31({ pattern, modeBias, modeKind, pressureSnapshot }) {
  let score = 0;
  const mk = modeKind || "symbolic";
  const p  = typeof pattern === "string" ? pattern : "";

  if (mk === "binary")  score += 2;
  if (mk === "unified") score += 3;

  if (p.includes("fuse"))   score += 2;
  if (p.includes("batch"))  score += 2;
  if (p.includes("stream")) score += 1;

  if (modeBias === "high-throughput" ||
      modeBias === "binary-throughput" ||
      modeBias === "unified-throughput") score += 2;

  if (modeBias === "low-latency" ||
      modeBias === "binary-latency" ||
      modeBias === "unified-latency") score += 1;

  const gpuLoad = pressureSnapshot.gpuLoadPressure || 0;
  if (gpuLoad < 0.3) score += 1;

  return score;
}

// ============================================================================
//  DISPATCH BUILDERS (v31 OMNIBAND)
// ============================================================================

export function createGPUDispatchV31({
  jobId,
  pattern,
  payload = {},
  mode = "normal",
  modeKind = "symbolic",
  bandHint = "symbolic", // "symbolic" | "binary" | "unified"
  parentLineage = null,
  pressureSnapshot = null,
  executionContext = {},
  dnaTag = "default-dna",
  version = PULSE_GPU_ORGAN_VERSION_V31,
  chunkContext = null,
  gpuLane = "primary" // "primary" | "worker"
}) {
  const resolvedModeKind = resolveModeKindV31(modeKind, bandHint);
  const lineage          = buildLineageV31(parentLineage, pattern);
  const evolutionStage   = computeEvolutionStageV31(pattern, lineage, resolvedModeKind);
  const modeBias         = computeModeBiasV31(mode, pressureSnapshot || {}, resolvedModeKind);
  const multiInstance    = !!executionContext.multiInstance;
  const profile          = selectDispatchProfileV31(
    pattern,
    modeBias,
    resolvedModeKind,
    multiInstance
  );
  const shapeSignature   = computeShapeSignatureV31(pattern, lineage, resolvedModeKind);
  const dispatchSignature = computeDispatchSignatureV31(
    pattern,
    resolvedModeKind,
    profile.style
  );

  const advantageScore = computeAdvantageScoreV31({
    pattern,
    modeBias,
    modeKind: resolvedModeKind,
    pressureSnapshot: pressureSnapshot || {}
  });

  const execCtx = {
    binaryMode:
      resolvedModeKind === "binary"  ? "binary"  :
      resolvedModeKind === "unified" ? "unified" :
                                       "non-binary",
    pipelineId: executionContext.pipelineId || "",
    sceneType: executionContext.sceneType || "",
    workloadClass: executionContext.workloadClass || "",
    resolution: executionContext.resolution || "",
    refreshRate: executionContext.refreshRate || 0,
    instanceId: executionContext.instanceId || "",
    multiInstance,
    dispatchSignature,
    shapeSignature,
    gpuLane
  };

  return {
    GPURole: GPURoleV31,
    GPUMetaBlock: GPUMetaBlockV31,
    jobId,
    pattern,
    payload,
    mode,
    modeKind: resolvedModeKind,
    bandHint,
    lineage,
    dnaTag,
    version,
    gpuLane,
    executionContext: execCtx,
    chunkContext: chunkContext || null,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || {}
    }
  };
}

export function evolveGPUDispatchV31(dispatch, context = {}) {
  const {
    mode: nextMode,
    modeKind: nextModeKind,
    bandHint,
    pressureSnapshot,
    executionContext,
    chunkContext,
    gpuLane
  } = context;

  const modeLabel        = nextMode || dispatch.mode || "normal";
  const resolvedModeKind = resolveModeKindV31(
    nextModeKind || dispatch.modeKind || "symbolic",
    bandHint || dispatch.bandHint || "symbolic"
  );
  const lineage          = Array.isArray(dispatch.lineage) ? dispatch.lineage : [];
  const pattern          = dispatch.pattern;

  const nextLineage      = buildLineageV31(lineage, pattern);
  const evolutionStage   = computeEvolutionStageV31(pattern, nextLineage, resolvedModeKind);
  const modeBias         = computeModeBiasV31(
    modeLabel,
    pressureSnapshot || dispatch.meta.pressureSnapshot || {},
    resolvedModeKind
  );
  const multiInstance    = !!executionContext.multiInstance ||
    !!dispatch.executionContext.multiInstance;
  const profile          = selectDispatchProfileV31(
    pattern,
    modeBias,
    resolvedModeKind,
    multiInstance
  );
  const shapeSignature   = computeShapeSignatureV31(pattern, nextLineage, resolvedModeKind);
  const dispatchSignature = computeDispatchSignatureV31(
    pattern,
    resolvedModeKind,
    profile.style
  );

  const advantageScore = computeAdvantageScoreV31({
    pattern,
    modeBias,
    modeKind: resolvedModeKind,
    pressureSnapshot: pressureSnapshot || dispatch.meta.pressureSnapshot || {}
  });

  const prevExec = dispatch.executionContext || {};
  const lane     = gpuLane || prevExec.gpuLane || dispatch.gpuLane || "primary";

  const execCtx = {
    binaryMode:
      resolvedModeKind === "binary"  ? "binary"  :
      resolvedModeKind === "unified" ? "unified" :
                                       "non-binary",
    pipelineId: executionContext.pipelineId || prevExec.pipelineId || "",
    sceneType: executionContext.sceneType || prevExec.sceneType || "",
    workloadClass: executionContext.workloadClass || prevExec.workloadClass || "",
    resolution: executionContext.resolution || prevExec.resolution || "",
    refreshRate: executionContext.refreshRate || prevExec.refreshRate || 0,
    instanceId: executionContext.instanceId || prevExec.instanceId || "",
    multiInstance,
    dispatchSignature,
    shapeSignature,
    gpuLane: lane
  };

  return {
    GPURole: GPURoleV31,
    GPUMetaBlock: GPUMetaBlockV31,
    jobId: dispatch.jobId,
    pattern,
    payload: dispatch.payload,
    mode: modeLabel,
    modeKind: resolvedModeKind,
    bandHint: bandHint || dispatch.bandHint || "symbolic",
    lineage: nextLineage,
    dnaTag: dispatch.dnaTag || "default-dna",
    version: dispatch.version || PULSE_GPU_ORGAN_VERSION_V31,
    gpuLane: lane,
    executionContext: execCtx,
    chunkContext: chunkContext || dispatch.chunkContext || null,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || dispatch.meta.pressureSnapshot || {}
    }
  };
}

// ============================================================================
//  PULSE GPU IMMORTAL v31 — OMNIBAND ORGAN CONTROLLER
// ============================================================================
// ============================================================================
//  PulseGPUImmortalV31 — IMMORTAL PSEUDO‑CLASS (v31++)
// ============================================================================

export const PulseGPUImmortalV31 = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    config: null,
    deviceProfile: null,

    pressure: null,
    gpuCore: null,
    chunkCache: null,
    chunkPlanner: null,

    primaryEngine: null,
    workerEngine: null,

    geneticMemory: null,
    warmPathCache: null,
    guardian: null,
    processWorker: null,
    motionEngine: null,

    logger: console
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (config = {}) => {
    const deviceProfile = getImmortalDeviceProfileV31(config.deviceProfile);

    lane.config = {
      id: GPURoleV31.identity,
      deviceProfile,
      ...config
    };

    lane.deviceProfile = deviceProfile;

    lane.pressure     = config.pressure || null;
    lane.gpuCore      = config.gpuCore || null;
    lane.chunkCache   = config.chunkCache || null;
    lane.chunkPlanner = config.chunkPlanner || PulseGPUChunkPlanner;

    lane.primaryEngine = config.primaryEngine || null;
    lane.workerEngine  = config.workerEngine || null;

    lane.geneticMemory = config.geneticMemory || new PulseGPUGeneticMemory();
    lane.warmPathCache = config.warmPathCache || PulseGPUWarmPathCache;

    lane.guardian = config.guardian || new PulseGPUGuardianCortex(
      {
        ...(config.guardianPrefs || {}),
        deviceProfile
      },
      "gpu-guardian-v31"
    );

    lane.processWorker = config.processWorker || new PulseGPUProcessWorker({
      id: `${lane.config.id}::process-worker`,
      mode: "gpu",
      gpuLane: "worker",
      deviceProfile
    });

    lane.motionEngine = config.motionEngine || new PulseMotionEngine({
      id: `${lane.config.id}::motion-engine`,
      gpuProcessWorker: lane.processWorker,
      deviceProfile
    });

    lane.logger = config.logger || console;
  };

  // ------------------------------------------------------------
  // SAFE CALLS
  // ------------------------------------------------------------
  const safeCall = (obj, method) => {
    if (!obj || typeof obj[method] !== "function") return null;
    try { return obj[method](); }
    catch { return null; }
  };

  const snapshotChunkCache = () => {
    if (!lane.chunkCache.snapshot) return null;
    try { return lane.chunkCache.snapshot(); }
    catch { return null; }
  };

  // ------------------------------------------------------------
  // WARM PATH HINTS
  // ------------------------------------------------------------
  const computeWarmPathHints = (pattern, opts) => {
    if (!lane.warmPathCache.buildHints) {
      return {
        pattern,
        page: opts.page || "gpu-organ-v31",
        chunkProfile: opts.chunkProfile || "gpu",
        gpuCapable: opts.gpuCapable !== false,
        trust: opts.trust || "trusted",
        risk: opts.risk || "low",
        pulseStream: opts.pulseStream || "continuous",
        fastLane: opts.fastLane || "enabled"
      };
    }

    return lane.warmPathCache.buildHints(pattern, {
      ...opts,
      deviceProfile: lane.deviceProfile
    });
  };


function log(tag, payload) {
    try {
      console.log("✨ PULSE MULTIVERSAL GPU/IGPU RENDERER - [PulseGPU]", `[${tag}]`, payload);
    } catch {}
  }
  // ------------------------------------------------------------
  // GPU PLAN (IMMORTAL)
  // ------------------------------------------------------------
  const describeGpuPlan = (pattern, options = {}, env = {}) => {
    const parentLineage     = options.parentLineage || [];
    const bandHint          = options.bandHint || env.bandHint || "symbolic";
    const modeKind          = options.modeKind || env.modeKind || "symbolic";
    const resolvedModeKind  = resolveModeKindV31(modeKind, bandHint);
    const mode              = options.mode || env.mode || "normal";
    const multiInstanceHint = options.multiInstanceHint || env.multiInstanceHint || false;
    const gpuLane           = options.gpuLane || env.gpuLane || "primary";

    const pressureSnapshot =
      options.pressureSnapshot ||
      env.pressureSnapshot ||
      safeCall(lane.pressure, "snapshot") ||
      null;

    const lineage        = buildLineageV31(parentLineage, pattern);
    const evolutionStage = computeEvolutionStageV31(pattern, lineage, resolvedModeKind);
    const modeBias       = computeModeBiasV31(mode, pressureSnapshot || {}, resolvedModeKind);
    const profile        = selectDispatchProfileV31(
      pattern,
      modeBias,
      resolvedModeKind,
      multiInstanceHint
    );
    const shapeSignature = computeShapeSignatureV31(pattern, lineage, resolvedModeKind);
    const dispatchSignature = computeDispatchSignatureV31(
      pattern,
      resolvedModeKind,
      profile.style
    );
    const advantageScore = computeAdvantageScoreV31({
      pattern,
      modeBias,
      modeKind: resolvedModeKind,
      pressureSnapshot: pressureSnapshot || {}
    });

    const warmHints = computeWarmPathHints(pattern, {
      chunkProfile: options.chunkProfile || "gpu",
      gpuCapable: options.gpuCapable !== false,
      trust: options.trust || "trusted",
      risk: options.risk || "low",
      pulseStream: options.pulseStream || "continuous",
      fastLane: options.fastLane || "enabled",
      page: options.page || "gpu-organ-v31"
    });

    const geneticPattern = lane.geneticMemory.getPatternForContext({
      gameProfile: options.gameProfile || {},
      hardwareProfile: {
        ...(options.hardwareProfile || {}),
        deviceProfile: lane.deviceProfile
      },
      tierProfile: options.tierProfile || {},
      executionContext: {
        binaryMode:
          resolvedModeKind === "binary"  ? "binary"  :
          resolvedModeKind === "unified" ? "unified" :
                                           "auto",
        pipelineId: options.pipelineId || "",
        sceneType: options.sceneType || "",
        workloadClass: options.workloadClass || "",
        resolution: options.resolution || "",
        refreshRate: options.refreshRate || 0,
        dispatchSignature,
        shapeSignature,
        qualityPreset: options.qualityPreset || "",
        rayTracing: !!options.rayTracing
      }
    });

    const plan = {
      schemaVersion: PULSE_GPU_ORGAN_SCHEMA_V31,
      meta: {
        id: lane.config.id,
        version: GPURoleV31.version,
        gpuLane,
        deviceProfile: lane.deviceProfile,
        omniBand: true
      },
      pattern,
      lineage,
      bandHint,
      modeKind: resolvedModeKind,
      mode,
      modeBias,
      evolutionStage,
      shapeSignature,
      dispatchSignature,
      profile,
      advantageScore,
      pressureSnapshot,
      warmPathHints: warmHints,
      geneticPattern
    };

    log("gpu:plan-v31-immortal-omniband", { plan });
    return plan;
  };

  // ------------------------------------------------------------
  // GPU SURFACE SNAPSHOT
  // ------------------------------------------------------------
  const snapshotGpuSurface = () => {
    const gpuView =
      safeCall(lane.gpuCore, "buildGpuView") ||
      safeCall(lane.gpuCore, "snapshotGPU") ||
      null;

    const pressureSnapshot   = safeCall(lane.pressure, "snapshot") || null;
    const chunkCacheSnapshot = snapshotChunkCache();

    const primarySnapshot =
      lane.primaryEngine.snapshotEngineSurface() || null;

    const workerSnapshot =
      lane.workerEngine.snapshotEngineSurface() || null;

    const snapshot = {
      schemaVersion: PULSE_GPU_ORGAN_SCHEMA_V31,
      meta: {
        id: lane.config.id,
        version: GPURoleV31.version,
        dualGpu: true,
        omniBand: true,
        deviceProfile: lane.deviceProfile
      },
      gpuView,
      pressureSnapshot,
      chunkCache: chunkCacheSnapshot,
      engines: {
        primary: primarySnapshot,
        worker: workerSnapshot
      }
    };

    log("gpu:snapshot-surface-v31-immortal-omniband", { snapshot });
    return snapshot;
  };

  // ------------------------------------------------------------
  // INTELLIGENT HINT ENGINE
  // ------------------------------------------------------------
  const intelligentComputeHint = (dispatch, chunkContext = null) => {
    if (!dispatch.meta) {
      return {
        level: "none",
        reason: "no-dispatch",
        suggestions: [],
        chunkPlan: null,
        workerPlan: null,
        deviceProfile: lane.deviceProfile
      };
    }

    const { profile, modeBias, advantageScore, pressureSnapshot } = dispatch.meta;
    const suggestions = [];

    if (profile.style.includes("throughput") &&
        pressureSnapshot.gpuLoadPressure > 0.8) {
      suggestions.push("consider-reducing-batch-size");
      suggestions.push("prefer-streaming-or-latency-profile");
    }

    if (profile.style.includes("latency") &&
        pressureSnapshot.gpuLoadPressure < 0.3) {
      suggestions.push("consider-increasing-batch-size");
    }

    if (modeBias === "memory-conservative" && profile.maxBatchSize > 4) {
      suggestions.push("cap-batch-size-to-4-for-memory");
    }

    if (advantageScore < 2) {
      suggestions.push("pattern-may-benefit-from-fuse-or-batch-variant");
    }

    let chunkPlan = null;
    if (lane.chunkPlanner.buildPlan) {
      chunkPlan = lane.chunkPlanner.buildPlan({
        pattern: dispatch.pattern,
        modeKind: dispatch.modeKind,
        deviceProfile: lane.deviceProfile,
        chunkContext: chunkContext || dispatch.chunkContext || null
      });
    }

    let workerPlan = null;
    if (lane.processWorker.describePlan) {
      workerPlan = lane.processWorker.describePlan({
        jobId: dispatch.jobId,
        pattern: dispatch.pattern,
        gpuLane: "worker",
        deviceProfile: lane.deviceProfile
      });
    }

    const level =
      suggestions.length === 0 ? "none" :
      suggestions.length <= 2 ? "mild" :
      "strong";

    const hint = {
      schemaVersion: PULSE_GPU_ORGAN_SCHEMA_V31,
      meta: {
        id: lane.config.id,
        version: GPURoleV31.version,
        omniBand: true
      },
      level,
      modeBias,
      advantageScore,
      suggestions,
      chunkPlan,
      workerPlan,
      deviceProfile: lane.deviceProfile
    };

    log("gpu:intelligent-hint-v31-immortal-omniband", { hint });
    return hint;
  };

  // ------------------------------------------------------------
  // PREWARM CHUNKS
  // ------------------------------------------------------------
  const prewarmChunks = (hints = {}) => {
    if (!lane.chunkCache.prewarm) return null;

    const payload = {
      hints,
      deviceProfile: lane.deviceProfile
    };

    const result = lane.chunkCache.prewarm(payload);
    log("gpu:prewarm-chunks-v31-immortal-omniband", { payload, result });
    return result;
  };

  // ------------------------------------------------------------
  // DIAGNOSTICS
  // ------------------------------------------------------------
  const diagnostics = () => {
    const diag = {
      GPURole: GPURoleV31,
      GPUMetaBlock: GPUMetaBlockV31,
      deviceProfile: lane.deviceProfile
    };
    log("gpu:diagnostics-v31-immortal-omniband", { diag });
    return diag;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    describeGpuPlan,
    snapshotGpuSurface,
    intelligentComputeHint,
    prewarmChunks,
    diagnostics
  };

})();

// ============================================================================
//  PUBLIC FACTORY + EXPORT
// ============================================================================
export const createPulseGPUImmortalV31 = (config = {}) => {
  // Initialize the IMMORTAL GPU organ
  PulseGPUImmortalV31.init(config);

  // Return a frozen surface (no class, no instance)
  return Object.freeze({
    meta: GPUMetaBlockV31,

    describeGpuPlan(pattern, options, env) {
      return PulseGPUImmortalV31.describeGpuPlan(pattern, options, env);
    },

    snapshotGpuSurface() {
      return PulseGPUImmortalV31.snapshotGpuSurface();
    },

    intelligentComputeHint(dispatch, chunkContext) {
      return PulseGPUImmortalV31.intelligentComputeHint(dispatch, chunkContext);
    },

    prewarmChunks(hints) {
      return PulseGPUImmortalV31.prewarmChunks(hints);
    },

    diagnostics() {
      return PulseGPUImmortalV31.diagnostics();
    }
  });
};

PulseRealm.PulseGPU = {
  createPulseGPUImmortalV31,
  PulseGPUImmortalV31,
  evolveGPUDispatchV31,
  createGPUDispatchV31,
  GPUMetaBlockV31,
  GPURoleV31,
  PULSE_GPU_ORGAN_SCHEMA_V31,
  PULSE_GPU_ORGAN_VERSION_V31
}