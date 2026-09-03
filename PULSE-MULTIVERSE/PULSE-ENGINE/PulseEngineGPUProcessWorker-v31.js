// ============================================================================
// PulseGPUProcessWorker-v32-Immortal++++-PixelAware-WebGPU.js
//  • IMMORTAL capability detection (GPU/CPU/MEM/Bandwidth/Stability)
//  • Pixel-aware GPU routing: PIXEL_PUSH / GPU_COMPUTE_PIXEL
//  • WebGPU-aware GPU routing: iGPU / dGPU / auto
//  • Capability-tier-aware advantage boosting
//  • Backward compatible with Earn, GPU cache, BinaryCompute, Cleanup
//  • Environment-agnostic: browser, worker, Node/globalThis
// ============================================================================

import { PulseProofGPU } from "../_PROOF/PULSE-PROOF-GPU.js";
import { PulseWorldDevice } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-OS-DEVICE.js";

// New: pixel-related types (aligned with PulseEngineProcess-v31)
const PIXEL_PUSH_TYPE        = "PIXEL_PUSH";
const PIXEL_GPU_COMPUTE_TYPE = "GPU_COMPUTE_PIXEL";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// META
// ============================================================================
export const PulseGPUProcessWorkerMeta = Object.freeze({
  id: "PulseGPUProcessWorker-v32-Immortal++++-WebGPU",
  version: "32.0-Immortal++++-GPU-WEBGPU-ENHANCED",
  dualGpu: true,
  bands: ["symbolic", "binary"],
  lanes: ["forward", "backward"],
  roles: ["earn", "gpu-cache", "binary-compute", "pixel-compute", "cleanup", "snapshot", "webgpu"]
});

// ============================================================================
// ENV + IMMORTAL CAPABILITY DETECTION LAYER
// ============================================================================

function isBrowserLike() {
  return typeof document !== "undefined";
}

function isWorkerLike() {
  return typeof self !== "undefined" && typeof PulseRealm.importScripts === "function";
}

function isNodeLike() {
  return typeof process !== "undefined" && !!process.versions && !!process.versions.node;
}

function safeNavigator() {
  try {
    return typeof navigator !== "undefined" ? navigator : null;
  } catch {
    return null;
  }
}

function safePerformance() {
  try {
    return performance || null;
  } catch {
    return null;
  }
}
let cachedProfile = null;

// Future-proof WebGPU adapter scoring
function scoreAdapter(adapter) {
  let score = 0;

  const name = (adapter.name || "").toLowerCase();

  // Vendor heuristics
  if (name.includes("nvidia") || name.includes("amd") || name.includes("radeon")) {
    score += 50; // dGPU
  }
  if (name.includes("intel")) {
    score += 10; // iGPU
  }

  // Feature count
  score += (adapter.features ? adapter.features.size : 0);

  // Limits heuristic (higher = better)
  const limits = adapter.limits || {};
  const limitKeys = [
    "maxTextureDimension2D",
    "maxComputeWorkgroupSizeX",
    "maxComputeWorkgroupSizeY",
    "maxComputeWorkgroupSizeZ"
  ];
  for (const key of limitKeys) {
    if (limits[key]) score += Math.min(limits[key] / 1024, 50);
  }

  return score;
}

// WebGPU context detection (best adapter selection)
async function detectWebGpuContext(preferredMode = "auto") {
  if (cachedProfile) return cachedProfile;

  const nav = safeNavigator();
  if (!nav || !nav.gpu) return null;

  async function safeRequestAdapter(options) {
    try {
      return await nav.gpu.requestAdapter(options);
    } catch {
      return null;
    }
  }

  const adapters = new Set();

  // ⭐ Attempt #1 — high-performance (Chrome flag makes this more likely)
  const highPerf = await safeRequestAdapter({ powerPreference: "high-performance" });
  if (highPerf) adapters.add(highPerf);

  // ⭐ Attempt #2 — auto (fallback)
  const auto = await safeRequestAdapter({ powerPreference: "auto" });
  if (auto) adapters.add(auto);

  // ⭐ No more attempts — prevents warning spam
  const finalList = [...adapters];
  if (!finalList.length) return null;

  // --- Score adapters and pick the best
  let best = null;
  let bestScore = -Infinity;

  for (const a of finalList) {
    const score = scoreAdapter(a);
    if (score > bestScore) {
      bestScore = score;
      best = a;
    }
  }

  if (!best) return null;

  const device = await best.requestDevice();

  cachedProfile = {
    adapter: best,
    device,
    info: {
      name: best.name || "webgpu-adapter",
      features: Array.from(best.features || []),
      limits: best.limits || {},
      preferredMode,
      score: bestScore
    }
  };

  return cachedProfile;
}




function detectGpuScore() {
  const nav = safeNavigator();
  try {
    // WebGPU presence → top tier baseline
    if (nav && nav.gpu) return 9500;

    // WebGL / WebGL2 hints (browser only)
    if (isBrowserLike()) {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (gl) {
        // Rough heuristic: presence of WebGL2 → higher score
        const isWebGL2 = !!canvas.getContext("webgl2");
        return isWebGL2 ? 7000 : 5000;
      }
    }

    // Worker / headless hints: rely on cores
    if (nav && typeof nav.hardwareConcurrency === "number") {
      const cores = nav.hardwareConcurrency;
      if (cores >= 16) return 6500;
      if (cores >= 8) return 4500;
      if (cores >= 4) return 3000;
      return 1500;
    }

    // Node-like: use env hints if present
    if (isNodeLike()) {
      const envTier = (process.env.PULSE_GPU_TIER || "").toLowerCase();
      if (envTier === "immortal") return 9500;
      if (envTier === "elite") return 7000;
      if (envTier === "high") return 4500;
      if (envTier === "medium") return 2500;
      if (envTier === "low") return 1000;
      return 2000;
    }

    return 2000;
  } catch {
    return 1500;
  }
}

function detectGpuRam() {
  const nav = safeNavigator();
  try {
    // Browser hint via deviceMemory (not exact GPU RAM but correlated)
    if (nav && typeof nav.deviceMemory === "number") {
      return nav.deviceMemory;
    }

    // Node-like: allow env override
    if (isNodeLike()) {
      const envMem = Number(process.env.PULSE_GPU_RAM_GB || "0");
      if (!Number.isNaN(envMem) && envMem > 0) return envMem;
    }

    return 4;
  } catch {
    return 4;
  }
}

function detectCpuScore() {
  const nav = safeNavigator();
  try {
    if (nav && typeof nav.hardwareConcurrency === "number") {
      const cores = nav.hardwareConcurrency || 4;
      return cores * 300;
    }

    if (isNodeLike()) {
      const os = (() => {
        try {
          // optional require guarded for Node; ignored in browser
          // eslint-disable-next-line global-require, no-undef
          return PulseWorldDevice;
        } catch {
          return null;
        }
      })();
      if (os && typeof os.cpus === "function") {
        const cores = (os.cpus() || []).length || 4;
        return cores * 320;
      }
    }

    return 1200;
  } catch {
    return 1000;
  }
}

function detectMemoryScore() {
  const nav = safeNavigator();
  const perf = safePerformance();
  try {
    if (nav && typeof nav.deviceMemory === "number") {
      const mem = nav.deviceMemory || 4;
      return mem * 350;
    }

    if (perf && perf.memory && typeof perf.memory.totalJSHeapSize === "number") {
      const heapMB = perf.memory.totalJSHeapSize / (1024 * 1024);
      if (heapMB > 0) {
        return Math.min(8000, heapMB * 2);
      }
    }

    if (isNodeLike()) {
      const os = (() => {
        try {
          // eslint-disable-next-line global-require, no-undef
          return PulseWorldDevice;
        } catch {
          return null;
        }
      })();
      if (os && typeof os.totalmem === "function") {
        const totalGB = os.totalmem() / (1024 * 1024 * 1024);
        return totalGB * 400;
      }
    }

    return 1200;
  } catch {
    return 1000;
  }
}

function detectBandwidth() {
  const nav = safeNavigator();
  try {
    if (nav && nav.connection && typeof nav.connection.downlink === "number") {
      return nav.connection.downlink * 120;
    }

    if (isNodeLike()) {
      const envBw = Number(process.env.PULSE_NET_BANDWIDTH_Mbps || "0");
      if (!Number.isNaN(envBw) && envBw > 0) {
        return envBw * 100;
      }
    }

    return 250;
  } catch {
    return 150;
  }
}

function detectStability() {
  const perf = safePerformance();
  try {
    if (perf && typeof perf.now === "function") {
      const uptime = perf.now();
      return Math.min(1, uptime / (1000 * 60 * 60));
    }

    if (isNodeLike()) {
      const uptimeSec = typeof process.uptime === "function" ? process.uptime() : 0;
      return Math.min(1, uptimeSec / (60 * 60));
    }

    return 0.5;
  } catch {
    return 0.5;
  }
}

function classifyCapabilityTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 6000) return "elite";
  if (score >= 3000) return "high";
  if (score >= 1500) return "medium";
  if (score >= 500) return "low";
  return "none";
}

// Async now: includes WebGPU context
export async function detectDeviceProfile(preferredWebGpuMode = "auto") {
  if (cachedProfile && cachedProfile.webgpuMode === preferredWebGpuMode) {
    return cachedProfile;
  }

  const gpuScore = detectGpuScore();
  const cpuScore = detectCpuScore();
  const memScore = detectMemoryScore();
  const bandwidth = detectBandwidth();
  const stability = detectStability();
  const gpuRam = detectGpuRam();

  const capabilityScore =
    gpuScore * 0.5 +
    cpuScore * 0.2 +
    memScore * 0.2 +
    bandwidth * 0.05 +
    stability * 0.05;

  const capabilityTier = classifyCapabilityTier(capabilityScore);

  let webgpuContext = null;
  let webgpuMode = "none";
  try {
    webgpuContext = await detectWebGpuContext(preferredWebGpuMode);
    if (webgpuContext) {
      webgpuMode = preferredWebGpuMode;
    }
  } catch (err) {
    console.warn("[detectDeviceProfile] WebGPU context failed:", err);
  }

  const profile = {
    gpuScore,
    gpuRam,
    cpuScore,
    memScore,
    bandwidthMbps: bandwidth,
    stabilityScore: stability,
    capabilityScore,
    capabilityTier,
    environment: {
      browser: isBrowserLike(),
      worker: isWorkerLike(),
      node: isNodeLike()
    },
    webgpuMode,
    webgpuAvailable: !!webgpuContext,
    webgpuAdapterInfo: webgpuContext ? webgpuContext.info : null,
    webgpuDevice: webgpuContext ? webgpuContext.device : null
  };

  cachedProfile = profile;

  try {
    PulseRealm.PULSE_DEVICE_PROFILE = profile;
  } catch (err) {
    console.error("[detectDeviceProfile] Failed to set global profile:", err);
  }

  return profile;
}

// ============================================================================
// ENGINE BLOCK — INTERNAL STATE + ROUTING CORE
// ============================================================================

async function createEngineBlock({
  gpuMode = "dual", // now supports: dual, single, mirror, webgpu, webgpu-igpu, webgpu-dgpu
  gpuIds = ["gpu-0", "gpu-1"],
  trace = false,
  lane = "forward",
  role = "gpu+earn-process-worker",
  presenceContext = {},
  advantageContext = {},
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  }
} = {}) {
  const preferredWebGpuMode =
    gpuMode === "webgpu-igpu" ? "igpu" :
    gpuMode === "webgpu-dgpu" ? "dgpu" :
    "auto";

  const capabilityProfile = await detectDeviceProfile(preferredWebGpuMode);

  const state = {
    gpuMode,
    gpuIds: Array.isArray(gpuIds) && gpuIds.length ? gpuIds.slice() : ["gpu-0"],
    ticks: 0,
    jobsRouted: 0,
    lastLane: null,
    lastGpuId: null,
    lastJobType: null,
    lastAdvantageScore: 0,
    lastBand: "symbolic",
    lane,
    role,
    presenceContext,
    advantageContext,
    cosmosContext,
    capabilityProfile,
    webgpuDevice: capabilityProfile.webgpuDevice || null,
    webgpuMode: capabilityProfile.webgpuMode || "none"
  };

  function pickGpu(job) {
    const ids = state.gpuIds;
    if (!ids.length) return "gpu-0";

    // WebGPU routing: treat as single logical GPU
    if (state.webgpuDevice && state.gpuMode.startsWith("webgpu")) {
      return "webgpu-device-0";
    }

    if (state.gpuMode === "single") return ids[0];
    if (state.gpuMode === "mirror") return ids[0];

    if (job.lane === "backward" && ids.length > 1) return ids[1];

    const idx = state.jobsRouted % ids.length;
    return ids[idx];
  }

  function classifyJob(job) {
    const type = job.type || job.jobType || "";
    const lane = job.lane || state.lane || "forward";

    const isEarn =
      type.startsWith("EARN_");

    const isGpuCache =
      type.startsWith("GPU_CACHE");

    const isBinaryCompute =
      type === "BINARY_COMPUTE" ||
      type === "GPU_COMPUTE" ||
      type === PIXEL_GPU_COMPUTE_TYPE;

    const isCleanup =
      type.includes("CLEANUP") ||
      type.includes("SETTLEMENT") ||
      type.includes("RECONCILE");

    const isPixel =
      type === PIXEL_PUSH_TYPE ||
      type === PIXEL_GPU_COMPUTE_TYPE;

    return {
      type,
      lane,
      isEarn,
      isGpuCache,
      isBinaryCompute,
      isCleanup,
      isPixel
    };
  }

  function buildHint(job, baseAdvantage) {
    const cls = classifyJob(job);
    const gpuId = pickGpu(job);

    state.jobsRouted += 1;
    state.lastGpuId = gpuId;
    state.lastLane = cls.lane;
    state.lastJobType = cls.type || null;
    state.lastBand = job.band || "symbolic";

    let advantageBoost = 0;

    if (cls.isEarn) advantageBoost += 0.15;
    if (cls.isGpuCache) advantageBoost += 0.1;
    if (cls.isBinaryCompute) advantageBoost += 0.12;
    if (job.band === "binary") advantageBoost += 0.05;
    if (cls.isCleanup && cls.lane === "backward") advantageBoost += 0.08;
    if (cls.isPixel) advantageBoost += 0.18;

    const tier = state.capabilityProfile.capabilityTier || "none";
    if (tier === "immortal") advantageBoost += 0.08;
    else if (tier === "elite") advantageBoost += 0.05;
    else if (tier === "high") advantageBoost += 0.03;
    else if (tier === "medium") advantageBoost += 0.01;

    const finalAdvantage = Math.max(
      0,
      Math.min(1, (baseAdvantage ?? 0.5) + advantageBoost)
    );

    state.lastAdvantageScore = finalAdvantage;

    const hint = {
      ts: PulseRealm.PulseNOW,
      meta: {
        workerId: PulseGPUProcessWorkerMeta.id,
        version: PulseGPUProcessWorkerMeta.version,
        lane: cls.lane,
        role: state.role
      },
      gpu: {
        gpuId,
        gpuMode: state.gpuMode,
        gpuIds: state.gpuIds.slice()
      },
      lane: cls.lane,
      band: job.band || "symbolic",
      jobType: cls.type || null,
      intent: job.intent || null,
      baseAdvantage: baseAdvantage ?? 0.5,
      advantageBoost,
      advantageScore: finalAdvantage,
      presenceContext: state.presenceContext,
      advantageContext: state.advantageContext,
      cosmosContext: state.cosmosContext,
      capabilityProfile: state.capabilityProfile,
      suggestions: []
    };

    if (cls.isPixel) {
      hint.suggestions.push("route:pixel-gpu-primary");
      hint.suggestions.push("band:binary-preferred");
    }

    if (cls.isBinaryCompute && !cls.isPixel) {
      hint.suggestions.push("route:gpu-compute-primary");
    }

    if (cls.isEarn) {
      hint.suggestions.push("route:earn-lane-priority");
    }

    if (state.webgpuDevice && state.gpuMode.startsWith("webgpu")) {
      hint.suggestions.push("route:webgpu-primary");
      hint.suggestions.push(`webgpu-mode:${state.webgpuMode}`);
    }

    if (trace) {
      console.log("[PulseGPUProcessWorker-v32] hint built:", hint);
    }

    return hint;
  }

  function tick() {
    state.ticks += 1;
    return {
      ok: true,
      ticks: state.ticks,
      gpuMode: state.gpuMode,
      gpuIds: state.gpuIds.slice(),
      capabilityProfile: state.capabilityProfile,
      webgpuMode: state.webgpuMode,
      webgpuDeviceActive: !!state.webgpuDevice
    };
  }

  function snapshot() {
    return Object.freeze({
      meta: PulseGPUProcessWorkerMeta,
      ticks: state.ticks,
      jobsRouted: state.jobsRouted,
      lastLane: state.lastLane,
      lastGpuId: state.lastGpuId,
      lastJobType: state.lastJobType,
      lastAdvantageScore: state.lastAdvantageScore,
      lastBand: state.lastBand,
      gpuMode: state.gpuMode,
      gpuIds: state.gpuIds.slice(),
      lane: state.lane,
      role: state.role,
      presenceContext: state.presenceContext,
      advantageContext: state.advantageContext,
      cosmosContext: state.cosmosContext,
      capabilityProfile: state.capabilityProfile,
      webgpuMode: state.webgpuMode,
      webgpuDeviceActive: !!state.webgpuDevice
    });
  }

  return {
    buildHint,
    tick,
    snapshot
  };
}

// ============================================================================
// NORMALIZATION
// ============================================================================

function normalizeIncomingJob(job, defaultLane = "forward") {
  if (!job || typeof job !== "object") {
    return {
      lane: defaultLane,
      jobId: "unknown",
      jobType: "UNKNOWN",
      band: "symbolic",
      dnaTag: null,
      cosmos: null,
      triHeartId: null,
      intent: null,
      advantageScore: 0.5,
      presence: null,
      payload: {},
      binaryPayload: null,
      hints: {}
    };
  }

  return {
    lane: job.lane || defaultLane,
    jobId: job.jobId || job.id || "unknown",
    jobType: job.jobType || job.type || "UNKNOWN",
    band: job.band || "symbolic",
    dnaTag: job.dnaTag || null,
    cosmos: job.cosmos || job.cosmosContext || null,
    triHeartId: job.triHeartId || null,
    intent: job.intent || null,
    advantageScore:
      typeof job.advantageScore === "number"
        ? job.advantageScore
        : 0.5,
    presence: job.presence || job.presenceField || null,
    payload: job.payload || {},
    binaryPayload: job.binaryPayload || null,
    hints: job.hints || {}
  };
}

// ============================================================================
// ASYNC + AUTO-RUN PULSE GPU PROCESS WORKER
// ============================================================================
export function createPulseGPUProcessWorker(opts = {}) {
  let engineBlockPromise = createEngineBlock(opts);

  let _readyResolve;
  const ready = new Promise(res => (_readyResolve = res));

  async function getEngineBlock() {
    if (engineBlockPromise instanceof Promise) {
      engineBlockPromise = await engineBlockPromise;
    }
    return engineBlockPromise;
  }

  // -------------------------------------------------------
  // ASYNC GPU HINT (now awaits PulseProofGPU + WebGPU profile)
  // -------------------------------------------------------
  async function buildGpuHint(job) {
    const engineBlock = await getEngineBlock();
    const lane = opts.lane || "forward";
    const normalized = normalizeIncomingJob(job, lane);
    const baseHint = engineBlock.buildHint(normalized, normalized.advantageScore);

    const preferredWebGpuMode =
      opts.gpuMode === "webgpu-igpu" ? "igpu" :
      opts.gpuMode === "webgpu-dgpu" ? "dgpu" :
      "auto";

    const deviceProfile = await detectDeviceProfile(preferredWebGpuMode) || {};

    const proofPayload = {
      job: normalized,
      hint: baseHint,
      deviceProfile,
      gpuMode: opts.gpuMode || "dual",
      gpuIds: opts.gpuIds || [],
      cosmosContext: opts.cosmosContext || {},
      advantageContext: opts.advantageContext || {},
      presenceContext: opts.presenceContext || {}
    };

    const proof =
      PulseProofGPU && typeof PulseProofGPU.createProof === "function"
        ? await PulseProofGPU.createProof(proofPayload)
        : null;

    return {
      ...baseHint,
      proof,
      proofKind: "PULSE-PROOF-GPU",
      proofVersion: PulseProofGPU.version || "pulse-proof-gpu:unknown",
      deviceProfile
    };
  }

  async function attachGpuHint(job) {
    return { ...job, gpuHint: await buildGpuHint(job) };
  }

  // -------------------------------------------------------
  // PUBLIC JOB PREP FUNCTIONS (async)
  // -------------------------------------------------------
  async function submit(job) {
    return await attachGpuHint(job);
  }

  async function plan(job) {
    return await attachGpuHint(job);
  }

  async function prepareJob(job, { lane: overrideLane } = {}) {
    const j = { ...job, lane: overrideLane || job.lane || opts.lane || "forward" };
    return await attachGpuHint(j);
  }

  async function prepareForwardJob(job) {
    return await attachGpuHint({ ...job, lane: "forward" });
  }

  async function prepareBackwardJob(job) {
    return await attachGpuHint({ ...job, lane: "backward" });
  }

  async function prepareGpuJob(job) {
    return await attachGpuHint({ ...job, band: "binary" });
  }

  async function prepareGpuCleanupJob(job) {
    return await attachGpuHint({ ...job, lane: "backward", type: "GPU_CACHE" });
  }

  async function prepareEarnJob(job) {
    return await attachGpuHint({ ...job, lane: "forward", type: "EARN_TASK" });
  }

  async function prepareEarnCleanupJob(job) {
    return await attachGpuHint({ ...job, lane: "backward", type: "EARN_SETTLEMENT" });
  }

  async function preparePixelJob(job) {
    return await attachGpuHint({
      ...job,
      lane: job.lane || "forward",
      type: PIXEL_GPU_COMPUTE_TYPE,
      band: "binary"
    });
  }

  // -------------------------------------------------------
  // PROOF VERIFICATION
  // -------------------------------------------------------
  function verifyGpuJob(jobWithHint) {
    if (!PulseProofGPU || typeof PulseProofGPU.verifyProof !== "function") return true;
    const { gpuHint } = jobWithHint;
    if (!gpuHint || !gpuHint.proof) return false;
    return PulseProofGPU.verifyProof({ proof: gpuHint.proof });
  }

  // -------------------------------------------------------
  // ASYNC STARTUP SEQUENCE
  // -------------------------------------------------------
  async function start() {
    try {
      // 1. Warm GPU + collect proof baseline
      await PulseProofGPU.run();

      // 2. Pre‑seed device profile with WebGPU preference
      const preferredWebGpuMode =
        opts.gpuMode === "webgpu-igpu" ? "igpu" :
        opts.gpuMode === "webgpu-dgpu" ? "dgpu" :
        "auto";

      await detectDeviceProfile(preferredWebGpuMode);

      // 3. Ensure engineBlock is fully initialized
      await getEngineBlock();

      // 4. Mark ready
      _readyResolve(true);
    } catch (err) {
      console.error("[PulseGPUProcessWorker.start] Failed:", err);
      _readyResolve(false);
    }
  }

  // AUTO‑RUN
  start();

  // -------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------
  return Object.freeze({
    meta: {
      ...PulseGPUProcessWorkerMeta,
      proof: PulseProofGPU.meta || {},
      gpuMode: opts.gpuMode || "dual",
      gpuIds: opts.gpuIds || [],
      webgpuPreferredMode:
        opts.gpuMode === "webgpu-igpu" ? "igpu" :
        opts.gpuMode === "webgpu-dgpu" ? "dgpu" :
        "auto"
    },

    // async job prep
    submit,
    plan,
    prepareJob,
    prepareForwardJob,
    prepareBackwardJob,
    prepareGpuJob,
    prepareGpuCleanupJob,
    prepareEarnJob,
    prepareEarnCleanupJob,
    preparePixelJob,

    verifyGpuJob,

    // engine internals
    tick: async () => (await getEngineBlock()).tick(),
    snapshot: async () => (await getEngineBlock()).snapshot(),
    detectDeviceProfile,

    // async readiness
    ready
  });
}


// ============================================================================
// DEFAULT EXPORT — IMMORTAL BLACK BOX INSTANCE
// ============================================================================

export const PulseGPUProcessWorker = createPulseGPUProcessWorker({
  gpuMode: "webgpu-igpu", // default: iGPU WebGPU; change to "webgpu-dgpu" / "webgpu" / "dual" as needed
  gpuIds: ["gpu-0", "gpu-1"],
  trace: false,
  lane: "forward",
  band: "dual",
  role: "gpu+earn+pixel+webgpu-process-worker-global",
  presenceContext: PulseRealm.PULSE_PRESENCE || {},
  advantageContext: PulseRealm.PULSE_ADVANTAGE || {},
  cosmosContext:
    PulseRealm.PULSE_COSMOS || {
      universeId: "u:default",
      timelineId: "t:main",
      branchId: "b:root",
      shardId: "s:primary"
    }
});

export const PulseGPUWorker = PulseGPUProcessWorker;

PulseRealm.GPUProcessWorker = {
  PulseGPUProcessWorker,
  createPulseGPUProcessWorker,
  detectDeviceProfile,
  PulseGPUProcessWorkerMeta
};
PulseRealm.PulseGPUWorker = PulseGPUWorker;
