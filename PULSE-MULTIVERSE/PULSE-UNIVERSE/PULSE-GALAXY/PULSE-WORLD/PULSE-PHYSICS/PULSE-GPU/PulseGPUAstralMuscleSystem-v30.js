// ============================================================================
//  PULSE GPU ENGINE v30-IMMORTAL-ONEBAND — THE ASTRAL MUSCLE SYSTEM
//  WebGPU Execution Layer • Frame Conductor • GPU Motor Cortex
//  ONE-BAND GPU MODE (GPU + BinaryGPU + Dispatch in a single coherent band)
//  Dual-Mode (Symbolic + Binary as projections of the same band)
//  Dispatch-Aware • Memory-Aware • Presence-Aware • Capability-Aware
//  Prewarm • Chunk/Cache-Aware • Snapshot-Ready • RAW ENGINE EVIDENCE
//  GPU-CHUNKER-AWARE • WARM-PATH-AWARE • SESSION-TRACE-AWARE
//  PROCESS-WORKER-AWARE (PulseGPUProcessWorker-v30)
//  “MUSCLE OF THE ORGANISM. ONE BAND. ONE BREATH.”
// ============================================================================

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// Process worker (real helper, not hypothetical)
import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";
import { PulseGPUDispatchHintPackage } from "./PulseGPUAstralNervousSystem-v30.js";
import { PulseGPUWisdomBridge } from "./PulseGPUCognitiveIntelligence-v30.js";

import { PulseGPURuntime } from "./PulseGPUDrive-v30.js";
import { PulseGPUChunker as pulseGPUChunker } from "./PULSE-GPU-CHUNKER.js";

// Genetic memory + warm-path (metadata-only, no GPU calls)
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v30.js";
import { PulseGPUWarmPathCache } from "./PULSE-GPU-WARMPATHCACHE.js";




// ============================================================================
//  ONE-BAND EVO FIELD (aligned with PulseGPUBrain-v30-Immortal-OneBand)
// ============================================================================

export const ONEBAND_GPU_ENGINE_EVO = Object.freeze({
  // Biological / mental
  metabolicBoost: 1.8,
  neuralReflexBoost: 1.9,
  stabilityBoost: 2.0,
  cognitiveStabilityField: true,
  immortalCortexField: true,

  // System / physical
  oneBandGPU: true,
  binaryFirst: true,
  symbolicProjection: true,
  multiInstanceReady: true,
  deterministicNeuron: true,
  parallelSafe: true,
  fanOutScaling: 1.4,
  clusterCoherence: true,
  zeroDriftCloning: true,
  reflexPropagation: 1.3,
  shaderPipelinePurity: true,

  // Fusion — unified organism cluster
  dualModeEvolution: true,
  organismClusterBoost: 1.5,
  cognitiveComputeLink: true,
  unifiedAdvantageField: true,
  unifiedAdvantageFieldV30: true,
  pulseSend30Ready: true,

  // Binary / symbolic awareness
  binaryAware: true,
  symbolicAware: true,
  gpuDispatchAware: true,
  gpuMemoryAware: true,
  gpuAdvantageAware: true,

  // Prewarm / chunk / cache / presence
  prewarmReady: true,
  chunkCacheReady: true,
  presencePrewarmReady: true,
  intelligentComputeReady: true,

  // Presence / identity
  presenceAware: true,
  dnaAware: true,
  versionAware: true,
  instanceAware: true,

  // Contracts
  routingContract: "PulseSend-v30-Immortal-OneBand",
  gpuOrganContract: "PulseGPU-v30-Immortal-OneBand",
  binaryGpuOrganContract: "PulseBinaryGPU-v30-IMMORTAL-UNIBAND",
  earnCompatibility: "Earn-v30-GPU",
  workgroupLawVersion: 30,
  zeroImportShaderPipeline: true
});

// ============================================================================
//  META BLOCK — v30-Immortal-OneBand
// ============================================================================

export const PULSE_GPU_ENGINE_META = Object.freeze({
  identity: "PulseGPUAstralMuscleSystem-OneBand",
  version: "30.0-Immortal-OneBand",
  bandModel: "oneband-gpu",
  evo: {
    ...ONEBAND_GPU_ENGINE_EVO,
    lineage: "astral-muscle-v30-oneband",
    dualLane: true,
    warmPathAware: true,
    chunkerAware: true,
    geneticMemoryAware: true,
    processWorkerAware: true,
    sessionTraceAware: true,
    evidenceSurface: "gpu-engine-evidence-v30-oneband"
  }
});

// ============================================================================
//  GPU MEMORY / DISPATCH HISTORY (ONE-BAND, chunk-aware, evidence-ready)
//  • RAW ENGINE EVIDENCE: what was actually dispatched.
//  • Optional GPU chunker integration for structural evidence chunks.
//  • Optional genetic memory mirror (metadata-only).
//  • NOTE: timestamps live only in evidence surfaces, not in core planning.
// ============================================================================


export const PulseGPUMemory = (() => {
  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    maxHistory: 1024,
    history: [],
    byPattern: Object.create(null),
    meta: {
      ...PULSE_GPU_ENGINE_META,
      block: "GPUMemory",
      dnaTag: "default-dna",
      instanceId: "",
      warmPathId: "gpu-engine-oneband",
      sessionId: null
    },
    chunker: null,
    geneticMemory: null
  };

  // ------------------------------------------------------------
  // CONFIGURE (optional override of defaults)
  // ------------------------------------------------------------
  const configure = (options = {}) => {
    if (typeof options.maxHistory === "number" && options.maxHistory > 0) {
      lane.maxHistory = options.maxHistory;
    }

    if (options.dnaTag != null) {
      lane.meta.dnaTag = options.dnaTag;
    }

    if (options.instanceId != null) {
      lane.meta.instanceId = options.instanceId;
    }

    if (options.warmPathId != null) {
      lane.meta.warmPathId = options.warmPathId;
    }

    if (options.sessionId != null) {
      lane.meta.sessionId = options.sessionId;
    }

    if (options.chunker) {
      lane.chunker = options.chunker;
    }

    if (options.geneticMemory) {
      lane.geneticMemory = options.geneticMemory;
    }

    return snapshot();
  };

  // ------------------------------------------------------------
  // RECORD DISPATCH
  // ------------------------------------------------------------
  const recordDispatch = (dispatch) => {
    if (!dispatch || typeof dispatch !== "object") return;

    const meta = dispatch.meta || {};
    const exec = dispatch.executionContext || {};

    const entry = {
      ts: PulseRealm.PulseNOW,
      jobId: dispatch.jobId || null,
      pattern: dispatch.pattern || "gpu-default",
      shapeSignature: meta.shapeSignature || null,
      dispatchSignature: meta.dispatchSignature || null,
      evolutionStage: meta.evolutionStage || null,
      mode: dispatch.mode || "normal",
      modeKind: dispatch.modeKind || "symbolic",
      band: exec.band || "oneband-gpu",
      binaryMode:
        exec.binaryMode === "binary" ||
        dispatch.binaryMode === true ||
        dispatch.modeKind === "binary",
      dualMode: !!dispatch.dualMode,
      profile: meta.profile || null,
      advantageScore: meta.advantageScore || 0,
      dnaTag: dispatch.dnaTag || null,
      version: dispatch.version || null,
      instanceId: exec.instanceId || null,
      warmPathId: meta.warmPathId || lane.meta.warmPathId || "gpu-engine-oneband",
      pressureSnapshot: meta.pressureSnapshot || null
    };

    lane.history.push(entry);
    if (lane.history.length > lane.maxHistory) {
      lane.history.shift();
    }

    const key = entry.pattern;
    const bucket = lane.byPattern[key] || {
      count: 0,
      lastProfile: null,
      lastShapeSignature: null,
      lastDispatchSignature: null,
      lastEvolutionStage: null,
      lastMode: null,
      lastModeKind: null,
      lastBand: null,
      lastBinaryMode: null,
      lastDualMode: null,
      lastAdvantageScore: 0,
      lastDnaTag: null,
      lastVersion: null,
      lastInstanceId: null,
      lastWarmPathId: null
    };

    bucket.count += 1;
    bucket.lastProfile = entry.profile;
    bucket.lastShapeSignature = entry.shapeSignature;
    bucket.lastDispatchSignature = entry.dispatchSignature;
    bucket.lastEvolutionStage = entry.evolutionStage;
    bucket.lastMode = entry.mode;
    bucket.lastModeKind = entry.modeKind;
    bucket.lastBand = entry.band;
    bucket.lastBinaryMode = entry.binaryMode;
    bucket.lastDualMode = entry.dualMode;
    bucket.lastAdvantageScore = entry.advantageScore;
    bucket.lastDnaTag = entry.dnaTag;
    bucket.lastVersion = entry.version;
    bucket.lastInstanceId = entry.instanceId;
    bucket.lastWarmPathId = entry.warmPathId;

    lane.byPattern[key] = bucket;

    // Optional genetic memory mirror (metadata-only)
    if (
      lane.geneticMemory &&
      typeof lane.geneticMemory.recordObservation === "function"
    ) {
      try {
        lane.geneticMemory.recordObservation({
          gameProfile: {
            gameId: "pulse-world-gpu",
            buildVersion: entry.version || ""
          },
          hardwareProfile: {
            gpuModel: "webgpu",
            deviceClass: "browser",
            platform: "web"
          },
          tierProfile: {
            tierId: "default",
            tierLabel: "gpu-engine-oneband",
            earnTier: ""
          },
          executionContext: {
            binaryMode: entry.binaryMode ? "binary" : "symbolic",
            pipelineId: exec.pipelineId || "",
            sceneType: exec.sceneType || "",
            workloadClass: exec.workloadClass || "",
            resolution: exec.resolution || "",
            refreshRate: exec.refreshRate || 0,
            dispatchSignature: entry.dispatchSignature || "",
            shapeSignature: entry.shapeSignature || "",
            qualityPreset: "",
            rayTracing: false
          },
          metrics: {
            avgFPS: 0,
            minFPS: 0,
            stutters: 0,
            crashFlag: false
          },
          traceSummary: {
            totalDurationMs: 0,
            pressureSnapshot: entry.pressureSnapshot || null,
            binaryStepCount: entry.binaryMode ? 1 : 0,
            symbolicStepCount: entry.binaryMode ? 0 : 1
          },
          advantageSnapshot: {
            scoreDelta: entry.advantageScore || 0,
            stabilityDelta: 0,
            earnPotential: 0
          },
          computerIntelligence: null,
          earnSnapshot: null
        });
      } catch {
        // non-fatal
      }
    }
  };

  // ------------------------------------------------------------
  // BEST PROFILE FOR PATTERN
  // ------------------------------------------------------------
  const bestProfileForPattern = (pattern) => {
    const key = pattern || "gpu-default";
    const bucket = lane.byPattern[key];
    if (!bucket) return null;

    return {
      profile: bucket.lastProfile,
      shapeSignature: bucket.lastShapeSignature,
      dispatchSignature: bucket.lastDispatchSignature,
      evolutionStage: bucket.lastEvolutionStage,
      mode: bucket.lastMode,
      modeKind: bucket.lastModeKind,
      band: bucket.lastBand,
      binaryMode: bucket.lastBinaryMode,
      dualMode: bucket.lastDualMode,
      advantageScore: bucket.lastAdvantageScore,
      dnaTag: bucket.lastDnaTag,
      version: bucket.lastVersion,
      instanceId: bucket.lastInstanceId,
      warmPathId: bucket.lastWarmPathId
    };
  };

  // ------------------------------------------------------------
  // DIAGNOSTICS
  // ------------------------------------------------------------
  const diagnostics = () => ({
    meta: lane.meta,
    totalHistory: lane.history.length,
    patternsTracked: Object.keys(lane.byPattern).length
  });

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const snapshot = () => ({
    meta: lane.meta,
    totalHistory: lane.history.length,
    patternsTracked: Object.keys(lane.byPattern).length,
    lastEntries: lane.history.slice(-32)
  });

  // ------------------------------------------------------------
  // SNAPSHOT CHUNKS
  // ------------------------------------------------------------
  const snapshotChunks = (options = {}) => {
    if (!lane.chunker) return null;

    const payload = snapshot();
    const profileId = options.profile || "gpu-engine-evidence-v30-oneband";
    const worldBand = options.worldBand || "backend";

    const chunks = lane.chunker.chunkJSON(payload, {
      band: "symbolic",
      backendKind: "gpu-engine-evidence",
      worldBand,
      profile: profileId,
      chunkProfile: profileId,
      uid: options.uid || null,
      lineage: options.lineage || null,
      route: options.route || null,
      organism: options.organism || "PulseGPU-OneBand"
    });

    return {
      meta: {
        ...lane.meta,
        chunkProfile: profileId,
        worldBand
      },
      chunks
    };
  };

  // ------------------------------------------------------------
  // CLEAR
  // ------------------------------------------------------------
  const clear = () => {
    lane.history = [];
    lane.byPattern = Object.create(null);
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    configure,
    recordDispatch,
    bestProfileForPattern,
    diagnostics,
    snapshot,
    snapshotChunks,
    clear
  };
})();


// ============================================================================
//  RENDER PASS BUILDER (ONE-BAND, deterministic, meta-upgraded)
// ============================================================================
/* ============================================================================
   PulseRenderPassBuilder — IMMORTAL PSEUDO‑CLASS
   ============================================================================ */

export const PulseRenderPassBuilder = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    device: null,
    context: null,
    format: "bgra8unorm",
    meta: { ...PULSE_GPU_ENGINE_META, block: "RenderPassBuilder" }
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (device, context, format = "bgra8unorm") => {
    lane.device = device;
    lane.context = context;
    lane.format = format;
  };

  // ------------------------------------------------------------
  // BASIC PASS DESCRIPTOR
  // ------------------------------------------------------------
  const createBasicPassDescriptor = (
    clearValue = { r: 0, g: 0, b: 0, a: 1 }
  ) => {
    const currentTexture = lane.context.getCurrentTexture();
    const view = currentTexture.createView();

    return {
      colorAttachments: [
        {
          view,
          clearValue,
          loadOp: "clear",
          storeOp: "store"
        }
      ]
    };
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    createBasicPassDescriptor
  };

})();

// ============================================================================
//  PIPELINE BUILDER (ONE-BAND — cache-friendly, snapshot-aware, warm-path-aware)
// ============================================================================
/* ============================================================================
   PulsePipelineBuilder — IMMORTAL PSEUDO‑CLASS
   ============================================================================ */

export const PulsePipelineBuilder = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    device: null,
    colorFormat: "bgra8unorm",
    pipelineCache: new Map(),
    meta: { ...PULSE_GPU_ENGINE_META, block: "PipelineBuilder" }
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (device, colorFormat = "bgra8unorm") => {
    lane.device = device;
    lane.colorFormat = colorFormat;
  };

  // ------------------------------------------------------------
  // CACHE KEY
  // ------------------------------------------------------------
  const getCacheKey = (shaderModule) => String(shaderModule);

  // ------------------------------------------------------------
  // CREATE PIPELINE
  // ------------------------------------------------------------
  const createPipeline = (shaderModule, vertexLayout) => {
    const key = getCacheKey(shaderModule);

    if (lane.pipelineCache.has(key)) {
      return lane.pipelineCache.get(key);
    }

    const pipeline = lane.device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: shaderModule,
        entryPoint: "vs_main",
        buffers: vertexLayout
      },
      fragment: {
        module: shaderModule,
        entryPoint: "fs_main",
        targets: [{ format: lane.colorFormat }]
      },
      primitive: {
        topology: "triangle-list"
      }
    });

    lane.pipelineCache.set(key, pipeline);
    return pipeline;
  };

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const snapshot = () => ({
    ts: PulseRealm.PulseNOW,
    cacheSize: lane.pipelineCache.size
  });

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    createPipeline,
    snapshot
  };

})();


// ============================================================================
//  DRAW EXECUTOR (ONE-BAND — dual-lane aware, same pure draw logic)
// ============================================================================
/* ============================================================================
   PulseDrawExecutor — IMMORTAL PSEUDO‑CLASS
   ============================================================================ */

export const PulseDrawExecutor = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    device: null,
    passBuilder: null,
    meta: { ...PULSE_GPU_ENGINE_META, block: "DrawExecutor" }
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (device, passBuilder) => {
    lane.device = device;
    lane.passBuilder = passBuilder;
  };

  // ------------------------------------------------------------
  // DRAW MESH
  // ------------------------------------------------------------
  const drawMesh = (encoder, pipeline, meshBuffers) => {
    if (!pipeline || !meshBuffers) return;

    const passDesc = lane.passBuilder.createBasicPassDescriptor();
    const pass = encoder.beginRenderPass(passDesc);

    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, meshBuffers.vertexBuffer);
    pass.setIndexBuffer(meshBuffers.indexBuffer, "uint32");

    const indexCount =
      typeof meshBuffers.indexCount === "number"
        ? meshBuffers.indexCount
        : meshBuffers.indexBuffer.size / 4;

    pass.drawIndexed(indexCount);
    pass.end();
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    drawMesh
  };

})();


// ============================================================================
//  MAIN ENGINE (WebGPU Backend) — Astral Muscle v30-Immortal-OneBand
//  One-band GPU mode: symbolic + binary as projections of the same band.
//  Dual-Lane: primary + auxiliary “second GPU” lane (logical).
//  ProcessWorker-aware • WarmPath-aware • GeneticMemory-aware.
// ============================================================================


// ============================================================================
//  PulseGPUEngine — IMMORTAL PSEUDO ORGAN (no class, no this)
// ============================================================================
export const PulseGPUEngine = (() => {

  const create = ({
    gpuSpine = null,
    binaryGpuSpine = null,
    dnaTag = "default-dna",
    version = "30.0-Immortal-OneBand",
    instanceId = "",
    chunkCache = null,
    chunker = pulseGPUChunker,
    processWorker = null,
    geneticMemory = null,
    warmPathConfig = {}
  } = {}) => {

    // -------------------------------------------------------------
    // INTERNAL STATE (formerly this.*)
    // -------------------------------------------------------------
    const runtime =  PulseGPURuntime;

    let device = null;
    let context = null;
    let colorFormat = "bgra8unorm";

    let pipelineBuilder = null;
    let passBuilder = null;
    let drawExecutor = null;

    const auxLane = {
      enabled: true,
      label: "aux-gpu-lane-oneband",
      mode: "background"
    };

    let ready = false;

    const evo = { ...PULSE_GPU_ENGINE_META.evo };
    const meta = {
      ...PULSE_GPU_ENGINE_META,
      dnaTag,
      version,
      instanceId
    };

    const gm = geneticMemory || new PulseGPUGeneticMemory();

    const gpuMemory =  PulseGPUMemory({
      dnaTag,
      instanceId,
      chunker,
      warmPathId: "gpu-engine-oneband",
      sessionId: null,
      geneticMemory: gm
    });

    const engineGpuSpine = gpuSpine;
    const engineBinaryGpuSpine = binaryGpuSpine;
    const engineChunkCache = chunkCache;
    const engineChunker = chunker;

    const worker =
      processWorker ||
      new PulseGPUProcessWorker({
        id: `gpu-engine-worker-oneband-${instanceId || "default"}`,
        role: "astral-muscle-oneband",
        band: "gpu-oneband"
      });

    const warmCfg = warmPathConfig || {};

    log(
      "gpu",
      "[PulseGPUEngine v30-Immortal-OneBand] Constructed — awaiting init().",
      "color:#03A9F4; font-weight:bold;"
    );

    // -------------------------------------------------------------
    // INIT
    // -------------------------------------------------------------
    const init = async (canvas) => {
      if (!canvas) {
        warn("gpu", "No canvas provided — engine inactive (fail-open).");
        ready = false;
        return;
      }

      try {
        await runtime.init(canvas);
      } catch (err) {
        warn("gpu", "Runtime init failed (fail-open).", err);
        ready = false;
        return;
      }

      const gpuContext =
        runtime.getGPUContext() || runtime.context;

      if (!gpuContext || !gpuContext.device || !gpuContext.context) {
        warn("gpu", "GPU context unavailable — engine inactive (fail-open).");
        ready = false;
        return;
      }

      device = gpuContext.device;
      context = gpuContext.context;
      colorFormat = gpuContext.format || "bgra8unorm";

      pipelineBuilder =  PulsePipelineBuilder(device, colorFormat);
      passBuilder =  PulseRenderPassBuilder(device, context, colorFormat);
      drawExecutor =  PulseDrawExecutor(device, passBuilder);

      ready = true;

      log(
        "gpu",
        "PulseGPUEngine v30-Immortal-OneBand ready — WebGPU backend active (Astral Muscle, one-band, dual-lane)."
      );

      enqueueWorker("engine-init-oneband", {
        meta,
        warmPathConfig: warmCfg
      });
    };

    // -------------------------------------------------------------
    // PREWARM
    // -------------------------------------------------------------
    const prewarm = ({
      patterns = [],
      frames = 1,
      page = "gpu-oneband",
      chunkProfile = "gpu"
    } = {}) => {
      if (!device || !context) return;

      const uniquePatterns = Array.from(new Set(patterns || []));
      const count = Math.max(1, frames | 0);

      const warmHints = PulseGPUWarmPathCache.compute({
        page,
        chunkProfile,
        gpuCapable: true,
        trust: warmCfg.trust || "trusted",
        risk: warmCfg.risk || "low",
        pulseStream: warmCfg.pulseStream || "continuous",
        fastLane: warmCfg.fastLane || "enabled"
      });

      enqueueWorker("prewarm-plan-oneband", {
        patterns: uniquePatterns,
        frames: count,
        warmHints
      });

      for (let i = 0; i < uniquePatterns.length; i++) {
        const pattern = uniquePatterns[i] || "gpu-default";

        for (let f = 0; f < count; f++) {
          try {
            const passDesc = passBuilder.createBasicPassDescriptor();
            const commandEncoder = device.createCommandEncoder();
            const passEncoder = commandEncoder.beginRenderPass(passDesc);

            if (typeof runtime.prewarmDraw === "function") {
              runtime.prewarmDraw(passEncoder, {
                pattern,
                chunkCache: engineChunkCache,
                warmHints
              });
            }

            passEncoder.end();
            const commandBuffer = commandEncoder.finish();
            device.queue.submit([commandBuffer]);
          } catch (err) {
            warn("gpu", "Prewarm error (oneband)", err);
          }
        }
      }

      log("gpu", "Prewarm complete (v30-Immortal-OneBand)", {
        patterns: uniquePatterns,
        frames: count,
        warmHints
      });
    };

    // -------------------------------------------------------------
    // PIPELINES
    // -------------------------------------------------------------
    const buildPipelines = () => {
      const shaders =
        runtime.getShadersFromPackages() ||
        runtime.getShaders() ||
        [];

      if (!Array.isArray(shaders) || shaders.length === 0) return [];

      return shaders.map((shaderModule) =>
        pipelineBuilder.createPipeline(shaderModule, [
          {
            arrayStride: 12,
            attributes: [{ shaderLocation: 0, offset: 0, format: "float32x3" }]
          }
        ])
      );
    };

    // -------------------------------------------------------------
    // DISPATCH SOURCE
    // -------------------------------------------------------------
    const getDispatches = () => {
      const fromRuntime =
        runtime.getGPUDispatchesFromPackages() ||
        runtime.getGPUDispatches() ||
        [];

      if (Array.isArray(fromRuntime) && fromRuntime.length > 0) {
        return fromRuntime;
      }

      const earnFrame = runtime.getCurrentEarnFrame();
      if (earnFrame && (engineGpuSpine || engineBinaryGpuSpine)) {
        const modeKind = earnFrame.modeKind || "symbolic";

        const spine =
          modeKind === "binary" && engineBinaryGpuSpine
            ? engineBinaryGpuSpine
            : engineGpuSpine;

        if (!spine || typeof spine.plan !== "function") return [];

        const dispatch = spine.plan(
          earnFrame,
          "normal",
          modeKind,
          earnFrame.pressureSnapshot || null,
          {
            ...(earnFrame.executionContext || {}),
            multiInstance: !!earnFrame.multiInstance,
            instanceId: earnFrame.instanceId || meta.instanceId,
            band: "unified"
          },
          earnFrame.dnaTag || meta.dnaTag,
          earnFrame.version || meta.version
        );

        const processed = processDispatch(dispatch, earnFrame);
        return processed ? [processed] : [dispatch];
      }

      return [];
    };

    // -------------------------------------------------------------
    // FRAME RENDER
    // -------------------------------------------------------------
    const renderFrame = () => {
      if (!ready) return;

      const meshes =
        runtime.getMeshesFromPackages() ||
        runtime.getMeshes() ||
        [];
      const shaders =
        runtime.getShadersFromPackages() ||
        runtime.getShaders() ||
        [];

      if (!meshes.length || !shaders.length) return;

      const pipelines = buildPipelines();
      if (!pipelines.length) return;

      const encoder = device.createCommandEncoder();

      const dispatches = getDispatches();

      if (dispatches.length > 0) {
        dispatches.forEach((dispatch, i) => {
          gpuMemory.recordDispatch(dispatch);

          const meshIndex = i % meshes.length;
          const pipelineIndex = i % pipelines.length;

          const meshBuffers = meshes[meshIndex];
          const pipeline = pipelines[pipelineIndex];

          drawExecutor.drawMesh(encoder, pipeline, meshBuffers);
        });
      } else {
        meshes.forEach((meshBuffers, i) => {
          const pipeline = pipelines[i % pipelines.length];
          drawExecutor.drawMesh(encoder, pipeline, meshBuffers);
        });
      }

      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);

      enqueueWorker("frame-tick-oneband", {
        engineSnapshot: snapshotEngineSurface(),
        auxLane
      });
    };

    // -------------------------------------------------------------
    // SNAPSHOT SURFACE
    // -------------------------------------------------------------
    const snapshotEngineSurface = () => {
      const gpuMemorySnapshot = gpuMemory.snapshot();
      const pipelineSnapshot = pipelineBuilder
        ? pipelineBuilder.snapshot()
        : null;

      return {
        ts: PulseRealm.PulseNOW,
        meta: {
          identity: PULSE_GPU_ENGINE_META.identity,
          version: meta.version,
          instanceId: meta.instanceId,
          bandModel: PULSE_GPU_ENGINE_META.bandModel,
          dualLane: auxLane
        },
        engine: {
          ready,
          colorFormat
        },
        memory: gpuMemorySnapshot,
        pipelines: pipelineSnapshot
      };
    };

    const snapshotEngineSurfaceChunks = (options = {}) =>
      gpuMemory.snapshotChunks({
        ...options,
        organism: "PulseGPU-OneBand"
      });

    const diagnostics = () => ({
      meta,
      evo,
      gpuMemory: gpuMemory.diagnostics(),
      auxLane
    });

    // -------------------------------------------------------------
    // WORKER INTEGRATION
    // -------------------------------------------------------------
    const enqueueWorker = (kind, payload) => {
      try {
        if (!worker || typeof worker.enqueue !== "function") return;
        worker.enqueue({
          kind,
          ts: PulseRealm.PulseNOW,
          engineId: meta.identity,
          version: meta.version,
          payload
        });
      } catch {}
    };

    const processDispatch = (dispatch, earnFrame) => {
      try {
        if (!worker || typeof worker.transformDispatch !== "function") {
          return null;
        }
        return worker.transformDispatch(dispatch, {
          earnFrame,
          engineMeta: meta
        });
      } catch {
        return null;
      }
    };

    // -------------------------------------------------------------
    // PUBLIC IMMORTAL INSTANCE
    // -------------------------------------------------------------
    return Object.freeze({
      meta,
      evo,

      init,
      prewarm,
      buildPipelines,
      getDispatches,
      renderFrame,

      snapshotEngineSurface,
      snapshotEngineSurfaceChunks,
      diagnostics
    });
  };

  return Object.freeze({ create });

})();

PulseRealm.GPUEngine = {
  PulseGPUEngine,
  PulseDrawExecutor,
  PulsePipelineBuilder,
  PulseRenderPassBuilder,
  PulseGPUMemory,
  PULSE_GPU_ENGINE_META,
  ONEBAND_GPU_ENGINE_EVO
}