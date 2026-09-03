// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-GPU/PulseGPUDrive-v30-IMMORTAL-INTEL-OMEGA.js
// LAYER: MOMENTUM NETWORK — GPU RUNTIME (BRAIN → ENGINE FLOW)
//
// PulseGPURuntime v30-IMMORTAL-INTEL-OMEGA
// Deterministic, Drift‑Proof, Earn‑Aware, Presence‑Aware, CI‑Aware, GPU‑Advantage‑Aware
// ONE-BAND GPU MODE • BINARY-AWARE • CHUNK-AWARE • WARM-PATH-AWARE • CAPABILITY-AWARE
// ============================================================================
//
// ROLE — MOMENTUM NETWORK:
//  ------------------------
//  • Wraps WebGPU context (adapter/device/context/format).
//  • Loads GPU Brain v30 packages → creates GPU buffers + shader modules.
//  • Exposes meshes/shaders/textures/dispatch hints to Astral Muscle Engine.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware.
//  • Earn‑aware + game‑aware via PulseGPUEarnProfile-v30.
//  • CognitiveFrame-aware + ComputerIntelligence-aware (metadata + surfaces).
//  • Chunk-plan-aware + WarmPathCache-aware for GPU advantage routing.
//  • Capability-aware via PULSE_DEVICE_PROFILE (if present).
//  • Fail-open: if anything is missing, surfaces stay empty but never throw.
//  • One-band GPU mode surface: modeKind: "gpu-one-band" for all exports.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { ONEBAND_GPU_EVO, PulseGPUBrainExport } from "./PulseGPUBrain-v30.js";
import { PulseGPUSettingsRestorer as PulseGPUCognitiveLayer } from "./PulseGPUCognitiveLayer-v30.js";
import { PulseGPUUXBridge as PulseGPUCognitiveIntelligenceUX} from "./PulseGPUCognitiveIntelligence-v30.js";
import { computeGPUEarnProfile_v31 as buildPulseGPUEarnProfile } from "./PulseGPUEarnProfile-v31.js";
import { PulseGPUChunkPlannerMultiband as PulseGPUChunkPlanner } from "./PULSE-GPU-CHUNKPLANNER.js";
import { PulseGPUWarmPathCache } from "./PULSE-GPU-WARMPATHCACHE.js";




const PULSE_GPU_RUNTIME_VERSION = "30.0-Immortal-Intel-Omega";
const ONE_BAND_MODE_KIND = "gpu-one-band";

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

const CAPABILITY_PROFILE = buildCapabilityProfile(RAW_DEVICE_PROFILE);

// ============================================================================
// GPU CONTEXT WRAPPER — Momentum Network: Conduction Node
// ============================================================================
// ============================================================================
//  PulseGPUContext — IMMORTAL PSEUDO ORGAN
// ============================================================================
export const PulseGPUContext = (() => {

  const create = () => {
    let adapter = null;
    let device = null;
    let context = null;
    let format = "bgra8unorm";
    let ready = false;

    const capability = CAPABILITY_PROFILE;

    const meta = {
      layer: "PulseGPUContext",
      role: "MOMENTUM_NODE",
      version: PULSE_GPU_RUNTIME_VERSION,
      target: "full-gpu",
      modeKind: ONE_BAND_MODE_KIND,
      capabilityProfile: capability,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend30Ready: true,
        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,
        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,
        capabilityAware: true,
        gpuOneBandMode: true,
        routingContract: "PulseSend-v30-Immortal++",
        gpuOrganContract: "PulseGPU-v30-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal++",
        earnCompatibility: "Earn-v30-GPU"
      }
    };

    const init = async (canvas) => {
      if (!canvas) {
        warn("PulseGPUContext-v30: canvas not provided (fail-open).");
        ready = false;
        return;
      }

      if (!navigator.gpu) {
        warn("PulseGPUContext-v30: WebGPU unavailable (fail-open).");
        ready = false;
        return;
      }

      adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        warn("PulseGPUContext-v30: adapter unavailable (fail-open).");
        ready = false;
        return;
      }

      device = await adapter.requestDevice();
      if (!device) {
        warn("PulseGPUContext-v30: device unavailable (fail-open).");
        ready = false;
        return;
      }

      const ctx = canvas.getContext("webgpu");
      if (!ctx) {
        warn("PulseGPUContext-v30: cannot acquire WebGPU context (fail-open).");
        ready = false;
        return;
      }

      context = ctx;
      format = navigator.gpu.getPreferredCanvasFormat();

      context.configure({
        device,
        format,
        alphaMode: "opaque"
      });

      ready = true;
    };

    const diagnostics = () => ({
      meta,
      adapterPresent: !!adapter,
      devicePresent: !!device,
      contextPresent: !!context,
      ready,
      format,
      capabilityProfile: capability
    });

    return Object.freeze({
      meta,
      capability,
      init,
      diagnostics,
      get adapter() { return adapter; },
      get device() { return device; },
      get context() { return context; },
      get format() { return format; },
      get ready() { return ready; }
    });
  };

  return Object.freeze({ create });
})();


// ============================================================================
//  PulseGPURuntimeLoader — IMMORTAL PSEUDO ORGAN
// ============================================================================
export const PulseGPURuntimeLoader = (() => {

  const create = (gpuContext) => {
    let gpu = gpuContext;

    let packages = null;
    let textureBuffers = [];
    let meshBuffers = [];
    let shaderModules = [];

    let dispatchHints = null;
    let gpuMemorySnapshot = null;

    let cognitiveFrame = null;
    let computerIntelligence = null;

    let earnProfile = null;
    let chunkPlan = null;
    let warmPathCache = null;

    const capability = CAPABILITY_PROFILE;

    const meta = {
      layer: "PulseGPURuntimeLoader",
      role: "MOMENTUM_FLOW",
      version: PULSE_GPU_RUNTIME_VERSION,
      target: "full-gpu",
      modeKind: ONE_BAND_MODE_KIND,
      capabilityProfile: capability,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend30Ready: true,
        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,
        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,
        earnAware: true,
        gameAware: true,
        capabilityAware: true,
        gpuOneBandMode: true,
        routingContract: "PulseSend-v30-Immortal++",
        gpuOrganContract: "PulseGPU-v30-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal++",
        earnCompatibility: "Earn-v30-GPU"
      }
    };

    const loadPackages = () => {
      const pkg = PulseGPUBrainExport.exportToRuntime();
      if (!pkg) {
        warn("PulseGPURuntimeLoader-v30: no packageSet available (fail-open).");
        packages = null;
        return null;
      }

      packages = pkg;

      dispatchHints = pkg.dispatchHints || null;
      gpuMemorySnapshot = pkg.gpuMemorySnapshot || null;

      cognitiveFrame = pkg.cognitiveFrame || null;

      try {
        computerIntelligence =
          PulseGPUCognitiveIntelligenceUX.fromCognitiveFrame(
            pkg.cognitiveFrame || null
          ) || null;
      } catch {
        computerIntelligence = null;
      }

      const earnContext = pkg.earnContext || null;
      if (earnContext) {
        try {
          earnProfile = buildPulseGPUEarnProfile({
            ...earnContext,
            capabilityProfile: capability
          });
        } catch {
          earnProfile = null;
        }
      }

      try {
        chunkPlan =
          PulseGPUChunkPlanner.plan({
            brain: pkg,
            earnProfile,
            dispatchHints,
            modeKind: ONE_BAND_MODE_KIND,
            capabilityProfile: capability
          }) || null;
      } catch {
        chunkPlan = null;
      }

      try {
        warmPathCache =
          PulseGPUWarmPathCache.build({
            brain: pkg,
            earnProfile,
            chunkPlan,
            modeKind: ONE_BAND_MODE_KIND,
            capabilityProfile: capability
          }) || null;
      } catch {
        warmPathCache = null;
      }

      return packages;
    };

    const initTextures = () => {
      if (!gpu.device) return;
      const pkg = packages.textures;
      if (!pkg || !Array.isArray(pkg.optimizedTextures)) return;

      pkg.optimizedTextures.forEach((tex) => {
        if (!tex || !tex.data) return;
        const buffer = createGPUBuffer(
          gpu.device,
          tex.data,
          GPUBufferUsage.COPY_DST | GPUBufferUsage.TEXTURE_BINDING
        );
        if (buffer) textureBuffers.push(buffer);
      });
    };

    const initMeshes = () => {
      if (!gpu.device) return;
      const pkg = packages.meshes;
      if (!pkg || !Array.isArray(pkg.simplifiedMeshes)) return;

      pkg.simplifiedMeshes.forEach((mesh) => {
        if (!mesh || !mesh.vertices || !mesh.indices) return;

        const vertexBuffer = createGPUBuffer(
          gpu.device,
          mesh.vertices,
          GPUBufferUsage.VERTEX
        );

        const indexBuffer = createGPUBuffer(
          gpu.device,
          mesh.indices,
          GPUBufferUsage.INDEX
        );

        if (vertexBuffer && indexBuffer) {
          meshBuffers.push({
            vertexBuffer,
            indexBuffer,
            indexCount: mesh.indices.byteLength / 4
          });
        }
      });
    };

    const initShaders = () => {
      if (!gpu.device) return;
      const pkg = packages.shaders;
      if (!pkg || !Array.isArray(pkg.compiledVariants)) return;

      pkg.compiledVariants.forEach((shader) => {
        if (!shader || !shader.code) return;
        const module = gpu.device.createShaderModule({ code: shader.code });
        shaderModules.push(module);
      });
    };

    const initialize = async (canvas) => {
      if (!gpu.ready) {
        await gpu.init(canvas);
      }

      if (!gpu.ready) return false;

      loadPackages();
      if (!packages) return true;

      initTextures();
      initMeshes();
      initShaders();

      return true;
    };

    const snapshotRuntimeSurface = () => ({
      meta,
      hasPackages: !!packages,
      textureCount: textureBuffers.length,
      meshCount: meshBuffers.length,
      shaderCount: shaderModules.length,
      dispatchHintsPresent: !!dispatchHints,
      gpuMemorySnapshotPresent: !!gpuMemorySnapshot,
      earnProfilePresent: !!earnProfile,
      chunkPlanPresent: !!chunkPlan,
      warmPathCachePresent: !!warmPathCache,
      capabilityProfile: capability
    });

    const diagnostics = () => ({
      meta,
      runtime: snapshotRuntimeSurface()
    });

    return Object.freeze({
      meta,
      capability,
      initialize,
      loadPackages,
      initTextures,
      initMeshes,
      initShaders,
      snapshotRuntimeSurface,
      diagnostics,

      get packages() { return packages; },
      get textureBuffers() { return textureBuffers; },
      get meshBuffers() { return meshBuffers; },
      get shaderModules() { return shaderModules; },
      get dispatchHints() { return dispatchHints; },
      get gpuMemorySnapshot() { return gpuMemorySnapshot; },
      get cognitiveFrame() { return cognitiveFrame; },
      get computerIntelligence() { return computerIntelligence; },
      get earnProfile() { return earnProfile; },
      get chunkPlan() { return chunkPlan; },
      get warmPathCache() { return warmPathCache; }
    });
  };

  return Object.freeze({ create });
})();


// ============================================================================
//  PulseGPURuntime — IMMORTAL PSEUDO ORGAN
// ============================================================================
export const PulseGPURuntime = (() => {

  const create = () => {
    const context = PulseGPUContext.create();
    const loader = PulseGPURuntimeLoader.create(context);

    const capability = CAPABILITY_PROFILE;

    const meta = {
      layer: "PulseGPURuntime",
      role: "MOMENTUM_NETWORK",
      version: PULSE_GPU_RUNTIME_VERSION,
      target: "full-gpu",
      modeKind: ONE_BAND_MODE_KIND,
      capabilityProfile: capability,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend30Ready: true,
        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,
        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,
        earnAware: true,
        gameAware: true,
        capabilityAware: true,
        gpuOneBandMode: true,
        routingContract: "PulseSend-v30-Immortal++",
        gpuOrganContract: "PulseGPU-v30-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal++",
        earnCompatibility: "Earn-v30-GPU"
      }
    };

    const init = async (canvas) => {
      await loader.initialize(canvas);
    };

    const getGPUContext = () => ({
      adapter: context.adapter,
      device: context.device,
      context: context.context,
      format: context.format,
      ready: context.ready,
      modeKind: ONE_BAND_MODE_KIND,
      capabilityProfile: capability
    });

    const snapshotRuntime = () => ({
      meta,
      context: context.diagnostics(),
      loader: loader.snapshotRuntimeSurface(),
      capabilityProfile: capability
    });

    const diagnostics = () => ({
      meta,
      context: context.diagnostics(),
      loader: loader.diagnostics(),
      capabilityProfile: capability
    });

    return Object.freeze({
      meta,
      capability,
      init,
      getGPUContext,

      getTextures: () => loader.textureBuffers,
      getMeshes: () => loader.meshBuffers,
      getShaders: () => loader.shaderModules,
      getPackages: () => loader.packages,

      getDispatchHints: () => loader.dispatchHints,
      getGpuMemorySnapshot: () => loader.gpuMemorySnapshot,

      getCognitiveFrame: () => loader.cognitiveFrame,
      getComputerIntelligence: () => loader.computerIntelligence,

      getMeshesFromPackages: () => loader.meshBuffers,
      getShadersFromPackages: () => loader.shaderModules,

      getGPUDispatchesFromPackages: () =>
        loader.packages.gpuDispatches || [],

      getGPUDispatches: () =>
        loader.packages.gpuDispatches || [],

      getCurrentEarnFrame: () =>
        loader.packages.earnFrame || null,

      getEarnProfile: () => loader.earnProfile,
      getChunkPlan: () => loader.chunkPlan,
      getWarmPathCache: () => loader.warmPathCache,

      snapshotRuntime,
      diagnostics
    });
  };

  return Object.freeze({ create });
})();


// ============================================================================
// GPU BUFFER CREATION — Momentum Network: Payload Conduction
// ============================================================================
function createGPUBuffer(device, data, usage) {
  if (!device || !data) return null;

  const buffer = device.createBuffer({
    size: data.byteLength,
    usage,
    mappedAtCreation: true
  });

  new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(data));
  buffer.unmap();

  return buffer;
}

export {
  createGPUBuffer
};

PulseRealm.GPUDrive = {
  createGPUBuffer,
  PulseGPURuntime,
  PulseGPURuntimeLoader,
  PulseGPUContext,
  CAPABILITY_PROFILE,
  RAW_DEVICE_PROFILE
}