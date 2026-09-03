// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseMeshMemoryAdapter-v40.js
// PULSE OS — v40 IMMORTAL
// MESH MEMORY ADAPTER — FULL GPU INTELLIGENCE
// “GPU LOADS ONCE. COMPUTES FOREVER. NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseCoreMemoryAdapter_v40 } from "./PulseCoreAIMemoryAdapter-v40.js";

let MESH_EPOCH = 0;
function nextMeshEpoch() { return ++MESH_EPOCH; }

export function createPulseMeshMemoryAdapter_v40(opts = {}) {
  const base = createPulseCoreMemoryAdapter_v40({
    ...opts,
    kind: "mesh"
  });

  const overlay       = base.overlay;
  const Governor      = base.Governor;
  const MemoryManager = base.MemoryManager;

  // -------------------------------------------------------------------------
  // GPU CONTEXT SNAPSHOT — v40
  // -------------------------------------------------------------------------
  function getMeshContext(routeId, blob, dataType) {
    const ctx = {
      ...base.wrap(routeId, blob, "mesh-context")?.context,
      routeId,
      epoch: nextMeshEpoch(),
      meshSize:
        typeof blob === "object"
          ? JSON.stringify(blob).length
          : String(blob || "").length,
      gpuAvailable: typeof PulseRealm.GPUCompute !== "undefined",
      gpuTier: PulseRealm.GPUCompute?.tier || "unknown",
      dataType,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb"
    };

    return ctx;
  }

  // -------------------------------------------------------------------------
  // REGISTER GPU MODEL — v40
  // -------------------------------------------------------------------------
  function registerModel(routeId, modelBlob) {
    const ctx = getMeshContext(routeId, modelBlob, "gpu-model");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "gpu-model",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        meshSize: ctx.meshSize,
        gpuTier: ctx.gpuTier,
        gpuAvailable: ctx.gpuAvailable,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      model: modelBlob,
      context: ctx
    }, "gpu-model");
  }

  // -------------------------------------------------------------------------
  // REGISTER GPU KERNEL — v40
  // -------------------------------------------------------------------------
  function registerKernel(routeId, kernelBlob) {
    const ctx = getMeshContext(routeId, kernelBlob, "gpu-kernel");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "gpu-kernel",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        meshSize: ctx.meshSize,
        gpuTier: ctx.gpuTier,
        gpuAvailable: ctx.gpuAvailable,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      kernel: kernelBlob,
      context: ctx
    }, "gpu-kernel");
  }

  // -------------------------------------------------------------------------
  // REGISTER GPU TRANSFORM — v40
  // -------------------------------------------------------------------------
  function registerTransform(routeId, transform) {
    const ctx = getMeshContext(routeId, transform, "gpu-transform");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "gpu-transform",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        meshSize: ctx.meshSize,
        gpuTier: ctx.gpuTier,
        gpuAvailable: ctx.gpuAvailable,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      transform,
      context: ctx
    }, "gpu-transform");
  }

  // -------------------------------------------------------------------------
  // HOT PROMOTION — v40
  // -------------------------------------------------------------------------
  function promoteHot(routeId, key) {
    try {
      overlay.markHot(routeId, key);
      Governor?._pressure?.markRouteHot?.(routeId);
    } catch {}

    return base.promoteHot(routeId, key);
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // -------------------------------------------------------------------------
  return Object.freeze({
    ...base,

    registerModel,
    registerKernel,
    registerTransform,

    promoteHot
  });
}

PulseRealm.CoreMeshMemoryAdapter = { createPulseMeshMemoryAdapter_v40 };
