// ============================================================================
// FILE: /PULSE-COREGPU/PulseCoreGPUOrchestrator-v50.js
// PULSE OS — v50 IMMORTAL
// GPU ORCHESTRATOR — DEVICE-AWARE, PRESSURE-AWARE, WEBGPU-AWARE, PURE
// “ROUTE SIGNALS. REGULATE PRESSURE. NEVER TOUCH THE HARDWARE.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


let GPU_EPOCH = 0;
function nextGPUEpoch() { return ++GPU_EPOCH; }

// --------------------------------------------------------------------------
// SIGNAL DEFINITIONS (extended for WebGPU)
// --------------------------------------------------------------------------
export const GPUOrchestratorSignals = {
  SESSION_START:  "gpu.session.start",
  SESSION_END:    "gpu.session.end",

  LOAD_MODEL:     "gpu.model.load",
  UNLOAD_MODEL:   "gpu.model.unload",

  LOAD_KERNEL:    "gpu.kernel.load",
  UNLOAD_KERNEL:  "gpu.kernel.unload",

  EXECUTE_GRAPH:  "gpu.graph.execute",
  WARM_GRAPH:     "gpu.graph.warm",

  PRESSURE_TICK:  "gpu.pressure.tick",
  MODE_SWITCH:    "gpu.mode.switch",

  FRAME_HICCUP:   "gpu.frame.hiccup",
  FRAME_STABLE:   "gpu.frame.stable",

  DEVICE_TICK:    "gpu.device.tick",
  THERMAL_TICK:   "gpu.thermal.tick",

  // NEW — WebGPU signals
  WEBGPU_ADAPTER_READY: "gpu.webgpu.adapter.ready",
  WEBGPU_DEVICE_READY:  "gpu.webgpu.device.ready",
  WEBGPU_MODE_SWITCH:   "gpu.webgpu.mode.switch"
};

// --------------------------------------------------------------------------
// ROUTING TABLE (extended for WebGPU)
// --------------------------------------------------------------------------
export const GPUOrchestratorRoutes = {
  [GPUOrchestratorSignals.SESSION_START]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Mesh"],
    notes: "Initialize GPU session context, allocate logical lanes."
  },
  [GPUOrchestratorSignals.SESSION_END]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Healer", "GPU-Mesh"],
    notes: "Tear down logical session, emit summaries."
  },
  [GPUOrchestratorSignals.LOAD_MODEL]: {
    to: ["GPU-Engine", "GPU-Memory", "GPU-Mesh"],
    notes: "Load model into VRAM via Mesh adapter."
  },
  [GPUOrchestratorSignals.UNLOAD_MODEL]: {
    to: ["GPU-Engine", "GPU-Memory", "GPU-Mesh"],
    notes: "Release VRAM allocations for model."
  },
  [GPUOrchestratorSignals.LOAD_KERNEL]: {
    to: ["GPU-Engine", "GPU-Memory", "GPU-Mesh"],
    notes: "Load/compile kernel into VRAM."
  },
  [GPUOrchestratorSignals.UNLOAD_KERNEL]: {
    to: ["GPU-Engine", "GPU-Memory", "GPU-Mesh"],
    notes: "Release kernel resources."
  },
  [GPUOrchestratorSignals.EXECUTE_GRAPH]: {
    to: ["GPU-Engine", "GPU-Brain", "GPU-Healer", "GPU-Mesh"],
    notes: "Execute compiled graph, feed results to Brain/Healer."
  },
  [GPUOrchestratorSignals.WARM_GRAPH]: {
    to: ["GPU-Engine", "GPU-Memory", "GPU-Mesh"],
    notes: "Pre-warm graph paths for low-latency execution."
  },
  [GPUOrchestratorSignals.PRESSURE_TICK]: {
    to: ["GPU-Advisor", "GPU-Healer", "GPU-Engine"],
    notes: "Report load/pressure, trigger balancing or throttling."
  },
  [GPUOrchestratorSignals.MODE_SWITCH]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Mesh"],
    notes: "Coordinate binary/symbolic mode transitions."
  },
  [GPUOrchestratorSignals.FRAME_HICCUP]: {
    to: ["GPU-Advisor", "GPU-Healer", "GPU-Brain", "GPU-Engine"],
    notes: "Frame hiccup; adjust scheduling, warm paths, or downgrade quality."
  },
  [GPUOrchestratorSignals.FRAME_STABLE]: {
    to: ["GPU-Advisor", "GPU-Engine"],
    notes: "Frame stability; may relax throttling or restore quality."
  },
  [GPUOrchestratorSignals.DEVICE_TICK]: {
    to: ["GPU-Advisor", "GPU-Engine"],
    notes: "Device-level tick: battery, thermal, visibility, wave."
  },
  [GPUOrchestratorSignals.THERMAL_TICK]: {
    to: ["GPU-Advisor", "GPU-Healer"],
    notes: "Thermal state change; may reduce quality or pause warming."
  },

  // NEW — WebGPU routing
  [GPUOrchestratorSignals.WEBGPU_ADAPTER_READY]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Mesh"],
    notes: "WebGPU adapter detected; update GPU tier + routing."
  },
  [GPUOrchestratorSignals.WEBGPU_DEVICE_READY]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Mesh"],
    notes: "WebGPU device ready; enable WebGPU compute lanes."
  },
  [GPUOrchestratorSignals.WEBGPU_MODE_SWITCH]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Mesh"],
    notes: "Switch between iGPU/dGPU/auto WebGPU modes."
  }
};

// ============================================================================
// FACTORY — v50 IMMORTAL (overlay-aware, device-aware, WEBGPU-aware)
// ============================================================================
export function createPulseGPUOrchestrator_v50({
  overlay = null,
  meshAdapter = null,
  pulseEngine = null,
  log    = console.log,
  warn   = console.warn
} = {}) {

  const Governor      = overlay?.Governor || null;
  const MemoryManager = overlay?.MemoryManager || null;

  function safeLog(stage, details = {}) {
    try { log(`[PulseGPUOrchestrator-v50] ${stage}`, details); }
    catch {}
  }

  // -------------------------------------------------------------------------
  // WEBGPU SNAPSHOT (pure, no hardware touching)
  // -------------------------------------------------------------------------
  function getWebGPUContext() {
    const nav = typeof navigator !== "undefined" ? navigator : null;
    const gpu = nav?.gpu || null;

    if (!gpu) {
      return {
        available: false,
        mode: "none",
        adapterName: null,
        features: [],
        limits: {}
      };
    }

    const profile = PulseRealm.PULSE_DEVICE_PROFILE || {};

    return {
      available: true,
      mode: profile.webgpuMode || "auto",
      adapterName: profile.webgpuAdapterInfo?.name || "unknown",
      features: profile.webgpuAdapterInfo?.features || [],
      limits: profile.webgpuAdapterInfo?.limits || {}
    };
  }

  // -------------------------------------------------------------------------
  // DEVICE + GPU CONTEXT SNAPSHOT (now includes WebGPU)
// -------------------------------------------------------------------------
  function getGPUContext(extra = {}) {
    const gpuEnv = PulseRealm.GPUCompute || PulseRealm.PulseGPU || null;
    const webgpu = getWebGPUContext();

    return {
      epoch: nextGPUEpoch(),
      device: Governor?.deviceContext?.platform || "unknown",
      wave: Governor?.waveContextHint?.primaryWave || "unknown",

      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      writeAvg: Governor?._pressure?.writeAvg?.() || 0,
      readAvg: Governor?._pressure?.readAvg?.() || 0,

      gpuAvailable: !!gpuEnv,
      gpuTier: gpuEnv?.tier || "unknown",
      gpuBackend: gpuEnv?.backend || "unknown",

      // NEW — WebGPU fields
      webgpuAvailable: webgpu.available,
      webgpuMode: webgpu.mode,
      webgpuAdapterName: webgpu.adapterName,
      webgpuFeatures: webgpu.features,
      webgpuLimits: webgpu.limits,

      battery: navigator?.getBattery ? "unknown" : "unsupported",
      online: navigator?.onLine ?? true,
      visibility: document?.visibilityState || "visible",

      ...extra
    };
  }

  // -------------------------------------------------------------------------
  // ROUTE SIGNAL — v50 (WebGPU-aware)
// -------------------------------------------------------------------------
  function routeSignal(signal, payload = {}) {
    const route = GPUOrchestratorRoutes[signal];
    const ctx   = getGPUContext({
      routeId: payload.routeId || "gpu",
      pressure: payload.pressure ?? null,
      mode: payload.mode ?? null,
      session: payload.session ?? null,
      hiccupSeverity:
        typeof payload.hiccupSeverity === "number"
          ? payload.hiccupSeverity
          : null
    });

    if (!route) {
      safeLog("UNKNOWN_SIGNAL", { signal, ctx });
      return {
        signal,
        payload,
        targets: [],
        notes: "",
        epoch: ctx.epoch,
        routeId: ctx.routeId,
        context: ctx
      };
    }

    safeLog("ROUTE", {
      signal,
      targets: route.to,
      pressure: ctx.pressure,
      hiccupSeverity: ctx.hiccupSeverity,
      gpuAvailable: ctx.gpuAvailable,
      gpuTier: ctx.gpuTier,
      webgpuAvailable: ctx.webgpuAvailable,
      webgpuMode: ctx.webgpuMode,
      webgpuAdapterName: ctx.webgpuAdapterName,
      wave: ctx.wave,
      device: ctx.device
    });

    // Optional: inform Mesh adapter / PulseEngine in a pure way
    try {
      if (meshAdapter && signal === GPUOrchestratorSignals.LOAD_MODEL && payload.model) {
        meshAdapter.registerModel(ctx.routeId, payload.model);
      }
      if (meshAdapter && signal === GPUOrchestratorSignals.LOAD_KERNEL && payload.kernel) {
        meshAdapter.registerKernel(ctx.routeId, payload.kernel);
      }
      if (pulseEngine && signal === GPUOrchestratorSignals.EXECUTE_GRAPH) {
        pulseEngine.registerGPUIntent?.({
          routeId: ctx.routeId,
          session: payload.session || null,
          pressure: ctx.pressure,
          gpuTier: ctx.gpuTier,
          webgpuMode: ctx.webgpuMode
        });
      }
    } catch (err) {
      try { warn("[PulseGPUOrchestrator-v50] MESH_OR_ENGINE_HINT_ERROR", String(err)); }
      catch {}
    }

    return {
      signal,
      payload,
      targets: route.to,
      notes: route.notes || "",
      epoch: ctx.epoch,
      routeId: ctx.routeId,
      pressure: ctx.pressure,
      mode: payload.mode ?? null,
      session: payload.session ?? null,
      hiccupSeverity: ctx.hiccupSeverity,
      context: ctx
    };
  }

  safeLog("Initializing Components..", {
    version: "50.0-IMMORTAL-GPU-ORCHESTRATOR-WEBGPU"
  });

  return {
    GPUOrchestratorSignals,
    GPUOrchestratorRoutes,
    routeSignal,
    getGPUContext,
    overlay,
    Governor,
    MemoryManager,
    meshAdapter,
    pulseEngine
  };
}

PulseRealm.CoreGPUOrchestrator = {
  createPulseGPUOrchestrator_v50
};
