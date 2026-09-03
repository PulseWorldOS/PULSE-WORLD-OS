// ============================================================================
// PULSE-PROOF-GPU v2.0 — "PULSE-PROOF-GPU" ORGAN
// Hybrid WebGPU/WebGL2 GPU capability + behavior profiler
// Designed as if we can see EVERYTHING, gracefully degrades when we can't.
// Integrates with PulseLogger (log / groupCollapsed / groupEnd) and PEX gating.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// ⚡ COMPILED-SAFE: capture true native console BEFORE the logger override fires.
// All GPU group/log calls use _GPU_CONSOLE so they bypass the PulseLogger
// override chain entirely — preventing the double-fire + dedupe orphan bugs
// that occur when console.group* is routed through groupStart() in a bundle.
const _GPU_CONSOLE = PulseRealm._nativeConsole || {
  log:            Function.prototype.bind.call(console.log,            console),
  warn:           Function.prototype.bind.call(console.warn,           console),
  error:          Function.prototype.bind.call(console.error,          console),
  group:          Function.prototype.bind.call(console.group,          console),
  groupCollapsed: Function.prototype.bind.call(console.groupCollapsed, console),
  groupEnd:       Function.prototype.bind.call(console.groupEnd,       console),
};



// Expected globals (from your world):
// - PulseConsole (optional; falls back to console)
// - log, warn, error, critical, groupCollapsed, groupEnd (PulseLogger)
// - PulseRealm.PulseTouchStorage/PulseTouchStorageV32 (for PEX gating + persistence)
// - canRunPexTest(), markPexRun() (your PEX helpers)
import { PulseTouchStorageV32 as PulseTouchStorage } from "../PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-STORAGE.js";
// ---------------------------------------------------------------------------
// Safe console + logger shims (in case logger isn't ready yet)
// ---------------------------------------------------------------------------

const GPU_SUBSYSTEM = "gpu";

const _TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

async function canRunPexTest() {
  try {
    const meta = PulseTouchStorage.snapshot("pex:last_run");
    if (!meta || !meta.ts) return { ok: true, remaining: 0 };
    const diff = PulseRealm.PulseNOW - meta.ts;
    if (diff >= _TEN_DAYS_MS) return { ok: true, remaining: 0 };
    const remainingDays = Math.ceil((_TEN_DAYS_MS - diff) / (24 * 60 * 60 * 1000));
    return { ok: false, remaining: remainingDays };
  } catch {
    return { ok: true, remaining: 0 };
  }
}
async function markPexRun() {
  try {
    PulseTouchStorage.store("pex:last_run", { ts: PulseRealm.PulseNOW });
  } catch {}
}

// ---------------------------------------------------------------------------
// WebGPU / WebGL2 detection
// ---------------------------------------------------------------------------
async function detectWebGPUAdapter() {
  if (!("gpu" in navigator)) return null;
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) return null;
    const device = await adapter.requestDevice();
    return { adapter, device };
  } catch {
    return null;
  }
}

function detectWebGL2Context() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
    if (!gl) return null;
    return gl;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// GPU Identity (WebGPU + WebGL2 fallback)
// ---------------------------------------------------------------------------
export async function collectGpuIdentity() {
  const identity = {
    environment: "unknown",
    webgpu: null,
    webgl2: null
  };

  const webgpu = await detectWebGPUAdapter();
  if (webgpu) {
    const { adapter, device } = webgpu;
    const limits = adapter.limits || {};
    const features = adapter.features ? Array.from(adapter.features) : [];

    identity.environment = "webgpu";
    identity.webgpu = {
      name: adapter.name || null,
      vendor: adapter.vendor || null,
      architecture: adapter.architecture || null,
      description: adapter.description || null,
      features,
      limits: {
        maxBufferSize: limits.maxBufferSize ?? null,
        maxTextureDimension2D: limits.maxTextureDimension2D ?? null,
        maxStorageBufferBindingSize: limits.maxStorageBufferBindingSize ?? null,
        maxUniformBufferBindingSize: limits.maxUniformBufferBindingSize ?? null,
        maxComputeWorkgroupSizeX: limits.maxComputeWorkgroupSizeX ?? null,
        maxComputeWorkgroupSizeY: limits.maxComputeWorkgroupSizeY ?? null,
        maxComputeWorkgroupSizeZ: limits.maxComputeWorkgroupSizeZ ?? null,
        maxComputeInvocationsPerWorkgroup: limits.maxComputeInvocationsPerWorkgroup ?? null
      },
      timestampQueriesSupported: features.includes("timestamp-query") || false,
      device
    };

    return identity;
  }

  const gl = detectWebGL2Context();
  if (gl) {
    const dbgExt = gl.getExtension("WEBGL_debug_renderer_info");
    const vendor = dbgExt ? gl.getParameter(dbgExt.UNMASKED_VENDOR_WEBGL) : null;
    const renderer = dbgExt ? gl.getParameter(dbgExt.UNMASKED_RENDERER_WEBGL) : null;

    identity.environment = "webgl2";
    identity.webgl2 = {
      vendor,
      renderer,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      extensions: gl.getSupportedExtensions() || []
    };

    return identity;
  }

  identity.environment = "none";
  return identity;
}

// ---------------------------------------------------------------------------
// WebGPU Reflex Window — hardware timestamp if possible, synthetic if not
// Uses: runRealReflexWindow(device), runSoftReflexWindow(device)
// ---------------------------------------------------------------------------
export async function runWebGpuReflexWindow(identity) {
  const base = () => ({
    available: false,
    reason: "",
    samples: 0,
    bestMs: null,
    avgMs: null,
    medianMs: null,
    worstMs: null,
    spikeMs: null,
    varianceMs: null,
    jitterMs: null,
    stability: null,
    hzEstimate: null,
    driftSignature: null,
    kind: null
  });

  const result = base();

  // No WebGPU at all
  if (!identity.webgpu || !identity.webgpu.device) {
    result.reason = "WebGPU not available";
    return result;
  }

  const { device } = identity.webgpu;
  const supportsTimestamp = identity.webgpu.timestampQueriesSupported === true;

  // -------------------------------------------------------------------------
  // HARDWARE REFLEX
  // -------------------------------------------------------------------------
  if (supportsTimestamp) {
    try {
      const hw = await runRealReflexWindow(device);
      if (hw && hw.available) {

        const full = computeFullReflex(hw);

        return {
          ...result,
          ...hw,
          ...full,
          kind: hw.kind || "hardware-reflex",
          reason: hw.reason || "Hardware timestamp-query Reflex Window"
        };
      }
    } catch (e) {}
  }

  // -------------------------------------------------------------------------
  // SOFT REFLEX
  // -------------------------------------------------------------------------
  try {
    const soft = await runSoftReflexWindow(device);
    if (soft && soft.available) {

      const full = computeFullReflex(soft);

      return {
        ...result,
        ...soft,
        ...full,
        kind: soft.kind || "soft-reflex",
        reason:
          soft.reason ||
          (supportsTimestamp
            ? "Synthetic Reflex fallback (hardware timestamp-query failed)"
            : "Synthetic Reflex (timestamp-query feature not exposed)")
      };
    }

    throw new Error(soft && soft.reason ? soft.reason : "SoftReflex unavailable");
  } catch (e) {
    result.available = false;
    result.kind = null;
    result.reason =
      "Error during synthetic Reflex Window: " +
      (e && e.message ? e.message : String(e));

    return result;
  }
}

// ---------------------------------------------------------------------------
// WebGPU HyperFrame Window (200ms compute burst, upgraded + synthetic safe)
// ---------------------------------------------------------------------------
// COMMENT + CONSOLE VERSION
// This organ measures GPU dt over a lived 200ms window.
// It does NOT "wait" — it *lives* inside the 200ms pulse.
// ---------------------------------------------------------------------------
export async function runWebGpuHyperFrame(identity) {
  const result = {
    available: false,
    reason: "",
    samples: 0,
    bestDtMs: null,
    avgDtMs: null,
    worstDtMs: null,
    stability: null,
    kind: "hyperframe",
    windowMs: 200,
    spikeMs: null,
    medianDtMs: null,
    hzEstimate: null
  };

  if (!identity.webgpu) {
    result.reason = "WebGPU not available";
    _GPU_CONSOLE.warn("[HyperFrame] WebGPU not available.");
    return result;
  }

  const { device } = identity.webgpu;

  try {
    const queue = device.queue;

    // ------------------------------------------------------------
    // Minimal setup (no nested groups)
    // ------------------------------------------------------------
    const shaderModule = device.createShaderModule({
      code: `@compute @workgroup_size(1) fn main() {}`
    });

    const pipeline = device.createComputePipeline({
      layout: "auto",
      compute: { module: shaderModule, entryPoint: "main" }
    });

    // ------------------------------------------------------------
    // Sampling Window (silent — group opens AFTER data is collected)
    // ------------------------------------------------------------
    const WINDOW_MS = 200;
    const dts = [];
    const start = performance.now();

    while (performance.now() - start < WINDOW_MS) {
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginComputePass();
      pass.setPipeline(pipeline);
      pass.dispatchWorkgroups(1);
      pass.end();

      const cb = encoder.finish();

      const t0 = performance.now();
      queue.submit([cb]);
      await queue.onSubmittedWorkDone();
      const t1 = performance.now();

      dts.push(t1 - t0);
    }

    // ⚡ FIX: group opens HERE — after async data collection, so the header
    // and its content appear together in the browser console with correct timing.
    _GPU_CONSOLE.groupCollapsed(
      "%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — HyperFrame WebGPU Compute Window",
      "color:#00BCD4; font-weight:bold;"
    );

    if (!dts.length) {
      result.reason = "No HyperFrame samples collected";
      _GPU_CONSOLE.warn("[HyperFrame] No dt samples collected.");
      _GPU_CONSOLE.groupEnd();
      return result;
    }

    // ------------------------------------------------------------
    // Stats
    // ------------------------------------------------------------
    dts.sort((a, b) => a - b);

    const best   = dts[0];
    const worst  = dts[dts.length - 1];
    const avg    = dts.reduce((a, b) => a + b, 0) / dts.length;
    const spike  = worst - avg;
    const median = dts[Math.floor(dts.length / 2)];
    const hzEstimate = avg > 0 ? (1000 / avg) : null;

    const stability = Math.max(
      0,
      Math.min(100, 100 * (1 - (spike / worst)))
    );

    Object.assign(result, {
      available: true,
      samples: dts.length,
      bestDtMs: best,
      avgDtMs: avg,
      worstDtMs: worst,
      stability,
      spikeMs: spike,
      medianDtMs: median,
      hzEstimate,
      windowMs: WINDOW_MS
    });

    // ============================================================
    // ⭐ TIGHT STATS BLOCK
    // ============================================================
    _GPU_CONSOLE.group(
      "%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — HyperFrame Stats Window",
      "color:#00BCD4; font-weight:bold;"
    );

    _GPU_CONSOLE.log(` • Samples: ${dts.length}`);
    _GPU_CONSOLE.log(` • Best dt Ms: ${best.toFixed(4)}`);
    _GPU_CONSOLE.log(` • Avg dt Ms: ${avg.toFixed(4)}`);
    _GPU_CONSOLE.log(` • Median dt Ms: ${median.toFixed(4)}`);
    _GPU_CONSOLE.log(` • Worst dt Ms: ${worst.toFixed(4)}`);
    _GPU_CONSOLE.log(` • Spike Ms: ${spike.toFixed(4)}`);
    _GPU_CONSOLE.log(` • Stability 0–100: ${stability.toFixed(2)}`);
    _GPU_CONSOLE.log(` • Window Ms: ${WINDOW_MS}`);
    _GPU_CONSOLE.log(` • Estimated Hz: ${hzEstimate ? hzEstimate.toFixed(2) : "Unknown"}`);

    // Raw samples (collapsed)
    _GPU_CONSOLE.groupCollapsed(" • Raw dt Samples");
    _GPU_CONSOLE.log(dts.map(v => v.toFixed(4) + " Ms").join(", "));
    _GPU_CONSOLE.groupEnd();

    _GPU_CONSOLE.groupEnd(); // Stats
    _GPU_CONSOLE.groupEnd(); // HyperFrame

    return result;

  } catch (e) {
    const msg = "Error during WebGPU HyperFrame Window: " +
      (e && e.message ? e.message : String(e));

    _GPU_CONSOLE.error("[HyperFrame] " + msg);
    result.reason = msg;
    return result;
  }
}



// ---------------------------------------------------------------------------
// Memory Pressure (Upgraded: WebGPU + WebGL2 + Synthetic Fallback)
// ---------------------------------------------------------------------------
export function classifyMemoryPressure(identity) {
  const result = {
    available: false,
    reason: "",
    maxBufferSize: null,
    maxTextureSize: null,
    maxStorageTextureSize: null,
    maxComputeInvocations: null,
    pressure: null,
    tier: null,
    kind: null
  };

  // -------------------------------------------------------------------------
  // PATH 1 — WebGPU (full limits available)
  // -------------------------------------------------------------------------
  if (identity.webgpu) {
    const limits = identity.webgpu.limits || {};

    const maxBufferSize = limits.maxBufferSize ?? null;
    const maxTextureSize = limits.maxTextureDimension2D ?? null;
    const maxStorageTextureSize = limits.maxStorageTextureDimension2D ?? null;
    const maxComputeInvocations = limits.maxComputeInvocationsPerWorkgroup ?? null;

    result.available = true;
    result.kind = "webgpu";
    result.maxBufferSize = maxBufferSize;
    result.maxTextureSize = maxTextureSize;
    result.maxStorageTextureSize = maxStorageTextureSize;
    result.maxComputeInvocations = maxComputeInvocations;

    // ---------------------------------------------------------------------
    // UPGRADED PRESSURE MODEL:
    // Combines buffer size, texture size, and compute capability
    // ---------------------------------------------------------------------
    let score = 0;

    // Buffer size scoring
    if (maxBufferSize >= 2_000_000_000) score += 40;
    else if (maxBufferSize >= 1_000_000_000) score += 30;
    else if (maxBufferSize >= 512_000_000) score += 20;
    else if (maxBufferSize >= 256_000_000) score += 10;

    // Texture size scoring
    if (maxTextureSize >= 16384) score += 40;
    else if (maxTextureSize >= 8192) score += 30;
    else if (maxTextureSize >= 4096) score += 20;
    else if (maxTextureSize >= 2048) score += 10;

    // Compute capability scoring
    if (maxComputeInvocations >= 1024) score += 20;
    else if (maxComputeInvocations >= 512) score += 10;
    else if (maxComputeInvocations >= 256) score += 5;

    // ---------------------------------------------------------------------
    // Convert score → pressure + tier
    // ---------------------------------------------------------------------
    if (score >= 80) {
      result.pressure = "LOW";
      result.tier = "A";
    } else if (score >= 50) {
      result.pressure = "MEDIUM";
      result.tier = "B";
    } else if (score >= 25) {
      result.pressure = "HIGH";
      result.tier = "C";
    } else {
      result.pressure = "CRITICAL";
      result.tier = "D";
    }

    return result;
  }

  // -------------------------------------------------------------------------
  // PATH 2 — WebGL2 (limited limits, but still usable)
  // -------------------------------------------------------------------------
  if (identity.webgl2) {
    const maxTextureSize = identity.webgl2.maxTextureSize ?? null;

    result.available = true;
    result.kind = "webgl2";
    result.maxTextureSize = maxTextureSize;

    // UPGRADED scoring for WebGL2
    if (maxTextureSize >= 16384) {
      result.pressure = "LOW";
      result.tier = "A";
    } else if (maxTextureSize >= 8192) {
      result.pressure = "MEDIUM";
      result.tier = "B";
    } else if (maxTextureSize >= 4096) {
      result.pressure = "HIGH";
      result.tier = "C";
    } else {
      result.pressure = "CRITICAL";
      result.tier = "D";
    }

    return result;
  }

  // -------------------------------------------------------------------------
  // PATH 3 — No GPU environment at all
  // -------------------------------------------------------------------------
  result.available = false;
  result.reason = "No GPU environment detected";
  result.pressure = "UNKNOWN";
  result.tier = "X";
  result.kind = "none";

  return result;
}
// ---------------------------------------------------------------------------
// Smoothness Index (Upgraded: drift bands, jitter variance, VRR‑aware)
// ---------------------------------------------------------------------------
export async function measureSmoothnessIndex() {
  const result = {
    available: true,
    samples: 0,
    avgDriftMs: null,
    jitterMs: null,
    stability: null,
    hzEstimate: null,
    kind: "smoothness-index"
  };

  // -----------------------------------------------------------------------
  // Environment guard: only works where rAF + performance exist
  // -----------------------------------------------------------------------
  const hasRAF =
    typeof window !== "undefined" &&
    typeof window.requestAnimationFrame === "function";
  const hasPerf =
    typeof performance !== "undefined" &&
    typeof performance.now === "function";

  if (!hasRAF || !hasPerf) {
    result.available = false;
    result.reason = "No GPU/frame timing API in this environment";
    return result;
  }

  // -----------------------------------------------------------------------
  // Detect refresh rate dynamically (VRR‑aware, multi‑sample)
  // -----------------------------------------------------------------------
  const estimateHz = async () => {
    const samples = [];
    let last = performance.now();

    await new Promise(resolve => {
      let count = 0;
      function step(ts) {
        const dt = ts - last;
        last = ts;
        if (dt > 0) samples.push(dt);
        count++;
        if (count < 12) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(step);
    });

    if (!samples.length) return 60;

    const avgDt =
      samples.reduce((a, b) => a + b, 0) / samples.length;
    const hz = Math.round(1000 / avgDt);
    return hz || 60;
  };

  const hz = await estimateHz();
  result.hzEstimate = hz;

  // Target frame time based on detected refresh rate
  const target = 1000 / hz;

  // -----------------------------------------------------------------------
  // Collect frames: scale count with refresh rate
  // -----------------------------------------------------------------------
  const frames = [];
  let last = performance.now();

  const targetFrames = Math.min(240, hz * 3); // ~3 seconds, capped

  await new Promise(resolve => {
    let count = 0;
    function step() {
      const now = performance.now();
      const dt = now - last;
      last = now;
      if (dt > 0 && dt < 100) {
        // ignore huge spikes (tab switches, sleeps)
        frames.push(dt);
      }
      count++;
      if (count < targetFrames) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });

  if (!frames.length) {
    result.available = false;
    result.reason = "No rAF frames collected";
    return result;
  }

  // -----------------------------------------------------------------------
  // Drift = |actual - target|
  // Jitter = standard deviation of frame times
  // -----------------------------------------------------------------------
  const drifts = frames.map(dt => Math.abs(dt - target));
  const avgDrift =
    drifts.reduce((a, b) => a + b, 0) / drifts.length;

  const mean =
    frames.reduce((a, b) => a + b, 0) / frames.length;
  const variance =
    frames.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
    frames.length;
  const jitter = Math.sqrt(variance);

  // -----------------------------------------------------------------------
  // Stability scoring (Reflex + HyperFrame‑style)
  // -----------------------------------------------------------------------
  const instability = avgDrift + jitter;

  let stability = 100 - instability * 2;
  if (stability < 0) stability = 0;
  if (stability > 100) stability = 100;

  // -----------------------------------------------------------------------
  // Final result
  // -----------------------------------------------------------------------
  result.samples = frames.length;
  result.avgDriftMs = avgDrift;
  result.jitterMs = jitter;
  result.stability = stability;

  // How many rAF ticks occur in a month/year
  const monthMs = 30 * 24 * 60 * 60 * 1000;
  const yearMs  = 365 * 24 * 60 * 60 * 1000;

  const ticksPerMonth = monthMs / mean;
  const ticksPerYear  = yearMs / mean;

  // Real drift projection
  result.driftMonthMs = avgDrift * ticksPerMonth;
  result.driftYearMs  = avgDrift * ticksPerYear;

  return result;

}

// ---------------------------------------------------------------------------
// Pulse GPU Score (Upgraded: unified scoring, tiers, penalties, boosts)
// ---------------------------------------------------------------------------
export function computePulseGpuScore({ reflex, hyper, memory, smooth }) {
  // Final result container
  const result = {
    score: null,
    tier: "UNKNOWN",
    className: "Unknown"
  };

  // If nothing is available, return early
  const hasAny =
    (reflex && reflex.available) ||
    (hyper && hyper.available) ||
    (memory && memory.available) ||
    (smooth && smooth.available);

  if (!hasAny) return result;

  // -----------------------------------------------------------------------
  // Weighting system (total = 1.0)
  // Reflex = 0.35
  // HyperFrame = 0.35
  // Memory = 0.15
  // Smoothness = 0.15
  // -----------------------------------------------------------------------
  let score = 0;
  let weightSum = 0;

  // -----------------------------------------------------------------------
  // Reflex Window (hardware or synthetic)
  // -----------------------------------------------------------------------
  if (reflex && reflex.available) {
    const s = reflex.stability || 0;
    score += s * 0.35;
    weightSum += 0.35;
  }

  // -----------------------------------------------------------------------
  // HyperFrame Window
  // -----------------------------------------------------------------------
  if (hyper && hyper.available) {
    const s = hyper.stability || 0;
    score += s * 0.35;
    weightSum += 0.35;
  }

  // -----------------------------------------------------------------------
  // Memory Pressure
  // -----------------------------------------------------------------------
  if (memory && memory.available) {
    let mpScore = 0;

    switch (memory.pressure) {
      case "LOW":
        mpScore = 95;
        break;
      case "MEDIUM":
        mpScore = 75;
        break;
      case "HIGH":
        mpScore = 55;
        break;
      case "CRITICAL":
        mpScore = 35;
        break;
      default:
        mpScore = 50;
    }

    score += mpScore * 0.15;
    weightSum += 0.15;
  }

  // -----------------------------------------------------------------------
  // Smoothness Index
  // -----------------------------------------------------------------------
  if (smooth && smooth.available) {
    const s = smooth.stability || 0;
    score += s * 0.15;
    weightSum += 0.15;
  }

  // -----------------------------------------------------------------------
  // Normalize final score
  // -----------------------------------------------------------------------
  const finalScore = score / weightSum;

  // -----------------------------------------------------------------------
  // Tier + Class System (Upgraded)
  // -----------------------------------------------------------------------
  let tier = "D4";
  let className = "Unstable";

  if (finalScore >= 95) {
    tier = "S1";
    className = "Pulse-Immortal";
  } else if (finalScore >= 90) {
    tier = "A1";
    className = "HyperFrame-Ready";
  } else if (finalScore >= 80) {
    tier = "A2";
    className = "High Stability";
  } else if (finalScore >= 70) {
    tier = "B1";
    className = "Playable";
  } else if (finalScore >= 60) {
    tier = "C1";
    className = "Borderline";
  } else if (finalScore >= 50) {
    tier = "D1";
    className = "Struggling";
  } else {
    tier = "D4";
    className = "Unstable";
  }

  return {
    score: finalScore,
    tier,
    className
  };
}

// ---------------------------------------------------------------------------
// Persistence (PulseTouchStorage)
// ---------------------------------------------------------------------------
function storeGpuReport(report) {
  try {
    PulseTouchStorage.store("gpu:last_report", {
      ts: PulseRealm.PulseNOW,
      report
    });
  } catch {}
}

async function countKeys(obj) {
    if (!obj) return 0;
    if (obj instanceof Map || obj instanceof Set) {
      return obj.size;
    }
    if (typeof obj === "function" || obj instanceof Promise) {
      return 0;
    }
    return Reflect.ownKeys(obj).length;
  }
// ---------------------------------------------------------------------------
// Main Organ
// ---------------------------------------------------------------------------
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return `h${(h >>> 0).toString(16)}`;
}

// ---------------------------------------------------------------------------
// FULL REFLEX CALCULATOR (your provided version, unchanged)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// FULL REFLEX CALCULATOR
// ---------------------------------------------------------------------------
function computeFullReflex(reflex) {
  const {
    samples,
    bestMs,
    avgMs,
    worstMs,
    spikeMs,
    allSamples
  } = reflex;

  // Median
  let medianMs = null;
  if (Array.isArray(allSamples) && allSamples.length > 0) {
    const sorted = [...allSamples].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    medianMs = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  // Variance
  let varianceMs = null;
  if (Array.isArray(allSamples) && allSamples.length > 1) {
    const mean = avgMs;
    const variance =
      allSamples.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) /
      allSamples.length;
    varianceMs = variance;
  }

  // Jitter
  const jitterMs =
    spikeMs != null
      ? spikeMs
      : (worstMs != null && bestMs != null ? worstMs - bestMs : null);

  // Stability
  const stability =
    jitterMs != null
      ? Math.max(0, Math.min(100, 100 - jitterMs))
      : null;

  // Hz Estimate
  const hzEstimate =
    avgMs != null && avgMs > 0 ? 1000 / avgMs : null;

  // Drift Signature
  const driftSignature =
    jitterMs != null && varianceMs != null
      ? `j${jitterMs.toFixed(3)}-v${varianceMs.toFixed(3)}`
      : "None";
    PulseRealm.DriftSignature = driftSignature;

  return {
    medianMs,
    varianceMs,
    jitterMs,
    stability,
    hzEstimate,
    driftSignature
  };
}

// 🔁 Synthetic + hardware Reflex, HyperFrame, Smoothness, Memory — FULL UPGRADE
// --- SoftReflex: synthetic timestamps around GPU work (works everywhere) ---
export async function runSoftReflexWindow(device, iterations = 128) {
  const allSamples = [];

  // ⚡ FIX: sampling loop runs FIRST — group opens only after data is ready
  // so the header and its contents appear together in the console.
  for (let i = 0; i < iterations; i++) {
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    pass.end();
    const commandBuffer = encoder.finish();

    const t0 = performance.now();
    device.queue.submit([commandBuffer]);
    await device.queue.onSubmittedWorkDone();
    const t1 = performance.now();

    allSamples.push(t1 - t0);
  }

  if (!allSamples.length) {
    _GPU_CONSOLE.warn("[SoftReflex] No samples collected .");
    return {
      available: false,
      kind: "soft-reflex",
      samples: 0,
      bestMs: null,
      avgMs: null,
      worstMs: null,
      spikeMs: null,
      medianMs: null,
      varianceMs: null,
      jitterMs: null,
      stability: null,
      hzEstimate: null,
      driftSignature: null,
      allSamples: [],
      reason: "No SoftReflex samples"
    };
  }

  allSamples.sort((a, b) => a - b);

  const bestMs    = allSamples[0];
  const worstMs   = allSamples[allSamples.length - 1];
  const avgMs     = allSamples.reduce((a, b) => a + b, 0) / allSamples.length;
  const spikeMs   = worstMs - avgMs;

  const unified = computeFullReflex({
    samples: allSamples.length,
    bestMs,
    avgMs,
    worstMs,
    spikeMs,
    allSamples
  });

  const {
    medianMs,
    varianceMs,
    jitterMs,
    stability,
    hzEstimate,
    driftSignature
  } = unified;

  // Group opens after all data is computed — clean timing in compiled bundle
  _GPU_CONSOLE.groupCollapsed(
    "%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — Eternal GPU/Reflex Systems",
    "color:#8BC34A; font-weight:bold;"
  );
  _GPU_CONSOLE.group("%c[SoftReflex] Stats", "color:#8BC34A; font-weight:bold;");
  _GPU_CONSOLE.log(` • Samples . ${allSamples.length}`);
  _GPU_CONSOLE.log(` • Best Ms . ${bestMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Avg Ms . ${avgMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Median Ms . ${medianMs?.toFixed(4) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Worst Ms . ${worstMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Spike Ms . ${spikeMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Variance Ms . ${varianceMs?.toFixed(6) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Jitter Ms . ${jitterMs?.toFixed(6) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Stability 0–100 . ${stability?.toFixed(2) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Estimated Hz . ${hzEstimate ? hzEstimate.toFixed(2) : "Unknown"}`);
  _GPU_CONSOLE.log(` • Drift Signature . ${driftSignature ?? "N/A"}`);

  _GPU_CONSOLE.groupCollapsed(" • Raw Samples");
  _GPU_CONSOLE.log(allSamples.map(v => v.toFixed(4) + " Ms").join(", "));
  _GPU_CONSOLE.groupEnd();

  _GPU_CONSOLE.groupEnd(); // SoftReflex Stats
  _GPU_CONSOLE.groupEnd(); // Eternal GPU/Reflex Systems

  return {
    available: true,
    kind: "soft-reflex",
    samples: allSamples.length,
    bestMs,
    avgMs,
    worstMs,
    spikeMs,
    allSamples,
    medianMs,
    varianceMs,
    jitterMs,
    stability,
    hzEstimate,
    driftSignature,
    reason: "SoftReflex (synthetic timestamps)"
  };
}


// --- RealReflex: hardware timestamp-query path (only when supported) ---
export async function runRealReflexWindow(device, iterations = 128) {
  // ⚡ FIX: group opens AFTER all async sampling is complete,
  // so header and data appear together in the browser console.
  const querySet = device.createQuerySet({
    type: "timestamp",
    count: iterations * 2
  });

  const resolveBuffer = device.createBuffer({
    size: iterations * 2 * 8,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
  });

  const allSamples = [];

  for (let i = 0; i < iterations; i++) {
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    pass.end();

    encoder.writeTimestamp(querySet, i * 2);
    encoder.writeTimestamp(querySet, i * 2 + 1);

    encoder.resolveQuerySet(querySet, i * 2, 2, resolveBuffer, i * 2 * 8);

    const cb = encoder.finish();
    device.queue.submit([cb]);
    await device.queue.onSubmittedWorkDone();
  }

  await resolveBuffer.mapAsync(GPUMapMode.READ);
  const data = new BigInt64Array(resolveBuffer.getMappedRange());

  for (let i = 0; i < iterations; i++) {
    const start = data[i * 2];
    const end   = data[i * 2 + 1];
    if (start === 0n || end === 0n) continue;
    const deltaNs = Number(end - start);
    allSamples.push(deltaNs / 1e6);
  }

  resolveBuffer.unmap();

  if (!allSamples.length) {
    _GPU_CONSOLE.warn("[RealReflex] No valid hardware timestamp samples .");
    return {
      available: false,
      kind: "hardware-reflex",
      samples: 0,
      bestMs: null,
      avgMs: null,
      worstMs: null,
      spikeMs: null,
      medianMs: null,
      varianceMs: null,
      jitterMs: null,
      stability: null,
      hzEstimate: null,
      driftSignature: null,
      allSamples: [],
      reason: "No valid hardware timestamp samples"
    };
  }

  allSamples.sort((a, b) => a - b);

  const bestMs    = allSamples[0];
  const worstMs   = allSamples[allSamples.length - 1];
  const avgMs     = allSamples.reduce((a, b) => a + b, 0) / allSamples.length;
  const spikeMs   = worstMs - avgMs;

  const unified = computeFullReflex({
    samples: allSamples.length,
    bestMs,
    avgMs,
    worstMs,
    spikeMs,
    allSamples
  });

  const {
    medianMs,
    varianceMs,
    jitterMs,
    stability,
    hzEstimate,
    driftSignature
  } = unified;

  // Group opens after all data is ready — clean timing in compiled bundle
  _GPU_CONSOLE.groupCollapsed(
    "%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — System Device GPU Reports",
    "color:#4CAF50; font-weight:bold;"
  );
  _GPU_CONSOLE.group("%c[RealReflex] Stats", "color:#4CAF50; font-weight:bold;");
  _GPU_CONSOLE.log(` • Samples . ${allSamples.length}`);
  _GPU_CONSOLE.log(` • Best Ms . ${bestMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Avg Ms . ${avgMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Median Ms . ${medianMs?.toFixed(4) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Worst Ms . ${worstMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Spike Ms . ${spikeMs.toFixed(4)}`);
  _GPU_CONSOLE.log(` • Variance Ms . ${varianceMs?.toFixed(6) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Jitter Ms . ${jitterMs?.toFixed(6) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Stability 0–100 . ${stability?.toFixed(2) ?? "N/A"}`);
  _GPU_CONSOLE.log(` • Estimated Hz . ${hzEstimate ? hzEstimate.toFixed(2) : "Unknown"}`);
  _GPU_CONSOLE.log(` • Drift Signature . ${driftSignature ?? "N/A"}`);

  _GPU_CONSOLE.groupCollapsed(" • Raw Samples");
  _GPU_CONSOLE.log(allSamples.map(v => v.toFixed(4) + " Ms").join(", "));
  _GPU_CONSOLE.groupEnd();

  _GPU_CONSOLE.groupEnd(); // RealReflex Stats
  _GPU_CONSOLE.groupEnd(); // System Device GPU Reports

  return {
    available: true,
    kind: "hardware-reflex",
    samples: allSamples.length,
    bestMs,
    avgMs,
    medianMs,
    worstMs,
    spikeMs,
    varianceMs,
    jitterMs,
    stability,
    hzEstimate,
    driftSignature,
    allSamples,
    reason: "HardwareReflex (timestamp-query)"
  };
}
PulseRealm.RunPulseGPUHyperFrame = runWebGpuHyperFrame;
// ---------------------------------------------------------------------------
// PulseProofGPU (v70‑Immortal+++)
// EXTREME DETAIL REPORTER — Capitalized Labels + Space Before Dot
// NO TIMERS, NO DELAYS, NO WAITING
// ---------------------------------------------------------------------------
export const PulseProofGPU = {
  version: "pulse-proof-gpu:1.0.0",
  meta: {
    name: "PULSE-PROOF-GPU",
    kind: "gpu-reflex-capability-proof",
    version: "pulse-proof-gpu:1.0.0"
  },

  _report: null,

  async collectReport() {
    if (this._report) return this._report;

    const identity = await collectGpuIdentity();
    const reflex   = PulseRealm.PulseProofGPUReflex || await runWebGpuReflexWindow(identity);
    PulseRealm.PulseProofGPUReflex = reflex;

    const smooth   = await measureSmoothnessIndex();
    const hyper    = PulseRealm.PulseProofGPUHyperFrame || await runWebGpuHyperFrame(identity);
    PulseRealm.PulseProofGPUHyperFrame = hyper;

    const memory   = classifyMemoryPressure(identity);
    const score    = computePulseGpuScore({ reflex, hyper, memory, smooth });

    // ============================================================
    // FIXED MEMORY / DRIFT / GPU SCORE FIELDS (PULSEPROOF)
    // ============================================================

    const memoryClass = memory?.class || "UNKNOWN";
    const memoryHealth = memory?.health || memory?.pressure || "UNKNOWN";

    const now = performance.now();
    const driftMonthMs = now % (30 * 24 * 60 * 60 * 1000);
    const driftYearMs  = now % (365 * 24 * 60 * 60 * 1000);

    const pulseGpuScore = score?.score ?? score?.value ?? 0;
    const pulseGpuScoreReason = score?.reason || "No GPU score reason provided.";

    const gpuHealth = {
      reflexStability: reflex.stability ?? 0,
      hyperStability: hyper.stability ?? 0,
      smoothStability: smooth.stability ?? 0,
      memoryPressure: memory.pressure ?? "UNKNOWN",

      combinedStability: (
        ((reflex.stability ?? 0) +
         (hyper.stability ?? 0) +
         (smooth.stability ?? 0)) / 3
      ).toFixed(2),

      driftSignature: reflex.driftSignature ?? "None",
      jitterMs: smooth.jitterMs ?? 0,
      hzEstimate: reflex.hzEstimate ?? smooth.hzEstimate ?? 0,

      // FIXED FIELDS
      memoryClass,
      memoryHealth,
      driftMonthMs,
      driftYearMs,
      pulseGpuScore,
      pulseGpuScoreReason
    };

    this._report = {
      identity,
      reflex,
      hyper,
      memory,
      smooth,
      score,
      gpuHealth,
      createdAt: PulseRealm.PulseNOW
    };

    PulseRealm.PulseProofGPUReport = this._report;
    return this._report;
  },

  async run() {
    const report = await PulseRealm.PulseProofGPUReport || await this.collectReport();

    const { identity, reflex, hyper, memory, smooth, score, gpuHealth } = report;

    _GPU_CONSOLE.groupCollapsed(
      "%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — EXTREME GPU REPORT",
      "color:gold; font-weight:bold; font-family:monospace;"
    );

    // GPU IDENTITY
    _GPU_CONSOLE.group("%cGpu Identity", "color:#4CAF50; font-weight:bold;");
    _GPU_CONSOLE.log(` • Environment . ${identity.environment}`);

    if (identity.webgpu) {
      const w = identity.webgpu;
      _GPU_CONSOLE.log(` • Adapter Name . ${w.name}`);
      _GPU_CONSOLE.log(` • Vendor . ${w.vendor}`);
      _GPU_CONSOLE.log(` • Architecture . ${w.architecture}`);
      _GPU_CONSOLE.log(` • Description . ${w.description}`);
      _GPU_CONSOLE.log(` • Timestamp Queries . ${w.timestampQueriesSupported}`);

      if (w.limits) {
        _GPU_CONSOLE.log(` • Max Buffer Size . ${w.limits.maxBufferSize}`);
        _GPU_CONSOLE.log(` • Max Texture Dimension 2D . ${w.limits.maxTextureDimension2D}`);
        _GPU_CONSOLE.log(` • Max Bind Groups . ${w.limits.maxBindGroups}`);
        _GPU_CONSOLE.log(` • Max Compute Workgroup Size X . ${w.limits.maxComputeWorkgroupSizeX}`);
        _GPU_CONSOLE.log(` • Max Compute Workgroup Size Y . ${w.limits.maxComputeWorkgroupSizeY}`);
        _GPU_CONSOLE.log(` • Max Compute Workgroup Size Z . ${w.limits.maxComputeWorkgroupSizeZ}`);
        _GPU_CONSOLE.log(` • Max Compute Invocations . ${w.limits.maxComputeInvocationsPerWorkgroup}`);
        _GPU_CONSOLE.log(` • Max Storage Buffer Binding Size . ${w.limits.maxStorageBufferBindingSize}`);
        _GPU_CONSOLE.log(` • Max Sampler Anisotropy . ${w.limits.maxSamplerAnisotropy}`);
      }
    }

    if (identity.webgl2) {
      const g = identity.webgl2;
      _GPU_CONSOLE.log(` • Webgl2 Vendor . ${g.vendor}`);
      _GPU_CONSOLE.log(` • Webgl2 Renderer . ${g.renderer}`);
      _GPU_CONSOLE.log(` • Max Texture Size . ${g.maxTextureSize}`);
      _GPU_CONSOLE.log(` • Max Cube Map Size . ${g.maxCubeMapSize}`);
      _GPU_CONSOLE.log(` • Max Renderbuffer Size . ${g.maxRenderbufferSize}`);
      _GPU_CONSOLE.log(` • Max Vertex Attributes . ${g.maxVertexAttribs}`);
    }
    _GPU_CONSOLE.groupEnd();

    // REFLEX WINDOW
    _GPU_CONSOLE.group("%cReflex Window (Gpu Timing)", "color:#8BC34A; font-weight:bold;");
    if (reflex.available) {
      _GPU_CONSOLE.log(` • Samples . ${reflex.samples}`);
      _GPU_CONSOLE.log(` • Best Ms . ${reflex.bestMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Avg Ms . ${reflex.avgMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Median Ms . ${reflex.medianMs?.toFixed(4) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Worst Ms . ${reflex.worstMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Spike Ms . ${reflex.spikeMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Variance Ms . ${reflex.varianceMs?.toFixed(6) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Jitter Ms . ${reflex.jitterMs?.toFixed(6) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Stability 0–100 . ${reflex.stability.toFixed(2)}`);
      _GPU_CONSOLE.log(` • Estimated Hz . ${reflex.hzEstimate?.toFixed(2) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Kind . ${reflex.kind}`);
      _GPU_CONSOLE.log(` • Reason . ${reflex.reason}`);
    } else {
      _GPU_CONSOLE.log(` • Reflex Unavailable . ${reflex.reason}`);
    }
    _GPU_CONSOLE.groupEnd();

    // HYPERFRAME WINDOW
    _GPU_CONSOLE.group("%cHyperframe Window (Gpu Compute Burst)", "color:#009688; font-weight:bold;");
    if (hyper.available) {
      _GPU_CONSOLE.log(` • Samples . ${hyper.samples}`);
      _GPU_CONSOLE.log(` • Best Dt Ms . ${hyper.bestDtMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Avg Dt Ms . ${hyper.avgDtMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Median Dt Ms . ${hyper.medianDtMs?.toFixed(4) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Worst Dt Ms . ${hyper.worstDtMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Spike Ms . ${hyper.spikeMs?.toFixed(4) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Stability 0–100 . ${hyper.stability.toFixed(2)}`);
      _GPU_CONSOLE.log(` • Estimated Hz . ${hyper.hzEstimate?.toFixed(2) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Window Ms . ${hyper.windowMs}`);
      _GPU_CONSOLE.log(` • Reason . ${hyper.reason}`);
    } else {
      _GPU_CONSOLE.log(` • Hyperframe Unavailable . ${hyper.reason}`);
    }
    _GPU_CONSOLE.groupEnd();

    // MEMORY PRESSURE
    _GPU_CONSOLE.group("%cMemory Pressure", "color:#E91E63; font-weight:bold;");
    if (memory.available) {
      _GPU_CONSOLE.log(` • Pressure . ${memory.pressure}`);
      _GPU_CONSOLE.log(` • Tier . ${memory.tier}`);
      _GPU_CONSOLE.log(` • Max Buffer Size . ${memory.maxBufferSize}`);
      _GPU_CONSOLE.log(` • Max Texture Size . ${memory.maxTextureSize}`);
      _GPU_CONSOLE.log(` • Reason . ${memory.reason}`);
      _GPU_CONSOLE.log(` • Memory Class . ${memory.class}`);
      _GPU_CONSOLE.log(` • Memory Health . ${memory.health}`);
    } else {
      _GPU_CONSOLE.log(` • Memory Unavailable . ${memory.reason}`);
    }
    _GPU_CONSOLE.groupEnd();

    // SMOOTHNESS INDEX
    _GPU_CONSOLE.group("%cSmoothness Index (Raf Drift & Jitter)", "color:#FFC107; font-weight:bold;");
    if (smooth.available) {
      _GPU_CONSOLE.log(` • Samples . ${smooth.samples}`);
      _GPU_CONSOLE.log(` • Avg Drift Ms . ${smooth.avgDriftMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Jitter Ms . ${smooth.jitterMs.toFixed(4)}`);
      _GPU_CONSOLE.log(` • Stability 0–100 . ${smooth.stability.toFixed(2)}`);
      _GPU_CONSOLE.log(` • Estimated Hz . ${smooth.hzEstimate}`);
      _GPU_CONSOLE.log(` • Drift Month Ms . ${smooth.driftMonthMs?.toFixed(4) ?? "N/A"}`);
      _GPU_CONSOLE.log(` • Drift Year Ms . ${smooth.driftYearMs?.toFixed(4) ?? "N/A"}`);
    } else {
      _GPU_CONSOLE.log(` • Smoothness Unavailable .`);
    }
    _GPU_CONSOLE.groupEnd();

    // GPU SCORE
    _GPU_CONSOLE.group("%cPulse Gpu Score", "color:#9C27B0; font-weight:bold;");
    _GPU_CONSOLE.log(` • Score 0–100 . ${(score.score ?? 0).toFixed(2)}`);
    _GPU_CONSOLE.log(` • Tier . ${score.tier}`);
    _GPU_CONSOLE.log(` • Class . ${score.className}`);
    _GPU_CONSOLE.log(` • Reason . ${score.reason}`);
    _GPU_CONSOLE.log(` • Combined Stability . ${gpuHealth.combinedStability}`);
    _GPU_CONSOLE.log(` • Drift Signature . ${gpuHealth.driftSignature}`);
    _GPU_CONSOLE.log(` • Jitter Ms . ${gpuHealth.jitterMs}`);
    _GPU_CONSOLE.log(` • Estimated Hz . ${gpuHealth.hzEstimate ?? "N/A"}`);
    _GPU_CONSOLE.groupEnd();

    storeGpuReport(report);

    _GPU_CONSOLE.groupEnd();

    return report;
  },

  async createProof(payload) {
    const report = await PulseRealm.PulseProofGPUReport || await this.collectReport();

    const { job, hint, deviceProfile, gpuMode, gpuIds, cosmosContext, advantageContext, presenceContext } = payload;

    const basis = {
      jobShape: {
        id: job.id,
        lane: job.lane,
        type: job.type,
        band: job.band,
        role: job.role
      },
      hintShape: {
        id: hint.id,
        lane: hint.lane,
        score: hint.score ?? hint.advantageScore,
        band: hint.band
      },
      gpuScore: report.score.score ?? null,
      gpuTier: report.score.tier ?? null,
      gpuClass: report.score.className ?? null,
      environment: report.identity.environment,
      gpuMode: gpuMode || "dual",
      gpuIds: gpuIds || [],
      deviceProfile: deviceProfile || null,
      cosmosContext: cosmosContext || {},
      advantageContext: advantageContext || {},
      presenceContext: presenceContext || {},
      createdAt: PulseRealm.PulseNOW,
      version: this.version
    };

    const signature = simpleHash(JSON.stringify(basis));
    return { ...basis, signature };
  },

  verifyProof({ proof }) {
    if (!proof || !proof.signature) return false;
    const { signature, ...rest } = proof;
    const expected = simpleHash(JSON.stringify(rest));
    return signature === expected;
  }
};

// ---------------------------------------------------------------------------
// Optional: PEX-style entrypoint
// ---------------------------------------------------------------------------
export async function runPulseProofGpuWithPexGate() {
  try {
    const gate = await (typeof canRunPexTest === "function"
      ? canRunPexTest()
      : { ok: true, remaining: 0 });

    if (!gate.ok) {
      _GPU_CONSOLE.warn(`%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — Pulse GPU/IGPU PEX Reflex Test Recently Run. Try Again in ~${gate.remaining} Day(s).`);
      return;
    }

    await PulseProofGPU.run();

    if (typeof markPexRun === "function") {
      await markPexRun();
    }
  } catch (e) {
    _GPU_CONSOLE.error("%c🎨 PULSE MULTIVERSAL GPU/IGPU RENDERER — [PULSE-PROOF-GPU v2.0] — Pulse GPU/IGPU PEX Reflex Test Error Running PULSE-PROOF-GPU:", e);
  }
}

PulseRealm.PulseProofGPU = PulseProofGPU;