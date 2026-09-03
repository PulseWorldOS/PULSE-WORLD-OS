// ============================================================================
// PulseEngineProcess-v31-GPU-EARN-PIXEL-HARMONICS-WIFI.js
//  • Pixel-driven engine process: CPU as conductor, GPU/iGPU as primary compute
//  • Quad threat: GPU + Earn + Pixel + Harmonics + WiFi
//  • Harmonics mode can pre-empt gaming-style GPU/Earn load (911 window)
//  • WiFi worker shapes packet streaming + pacing (hiccups for flow)
//  • Motion-style dual-lane architecture (forward/backward)
//  • Uses PulseGPUProcessWorker + PulseHarmonicsProcessWorker + PulseWifiProcessWorker
// ============================================================================
import { PulseEngineEvolutionaryMemory } from "./PulseEngineEvolutionaryMemory-v33.js";
import { PulseGPUProcessWorker } from "./PulseEngineGPUProcessWorker-v31.js";
import { PulseHarmonicProcessWorker } from "./PulseEngineHarmonicsProcessWorker-v31.js";
import { PulseWifiProcessWorker } from "./PulseEngineWIFIProcessWorker-v31.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// Core job keys (reuse motion-style patterning but under engine namespace)
const FORWARD_JOB_QUEUE_KEY  = "engine-v31:forward:jobs";
const FORWARD_RESULT_KEY     = "engine-v31:forward:results";
const FORWARD_METRICS_KEY    = "engine-v31:forward:metrics";
const BACKWARD_JOB_QUEUE_KEY = "engine-v31:backward:jobs";
const BACKWARD_RESULT_KEY    = "engine-v31:backward:results";
const BACKWARD_METRICS_KEY   = "engine-v31:backward:metrics";
const GPU_LAST_DISPATCH_KEY  = "engine-v31:gpu:lastDispatch";
const GPU_LAST_HINT_KEY      = "engine-v31:gpu:lastHint";
const HARMONICS_LAST_KEY     = "engine-v31:harmonics:lastSignal";

// Pixel-specific constants
const PIXEL_PUSH_TYPE        = "PIXEL_PUSH";
const PIXEL_GPU_COMPUTE_TYPE = "GPU_COMPUTE_PIXEL";

// Harmonics-specific constants
const HARMONICS_SIGNAL_TYPE  = "HARMONICS_SIGNAL";
const HARMONICS_911_TYPE     = "HARMONICS_911";
const HARMONICS_HEALTH_TYPE  = "HARMONICS_HEALTH";

// WiFi-specific constants
const WIFI_PACKET_TYPE       = "WIFI_PACKET";
const WIFI_STREAM_TYPE       = "WIFI_STREAM";
const WIFI_HICCUP_TYPE       = "WIFI_HICCUP";

function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch (err) {
    console.warn("[PulseEngineProcess-v31] safe call failed:", err);
  }
  return undefined;
}

function createArtery(laneTag) {
  const artery = {
    lane: laneTag,
    ticks: 0,
    jobsConsumed: 0,
    selfJobsGenerated: 0,
    lastPatternsCount: 0,
    lastDurationMs: 0,
    prewarms: 0,
    lastBand: "symbolic",
    lastDnaTag: null,
    lastJobType: null,
    lastAdvantage: 0,
    snapshot() {
      const ticks = artery.ticks;
      const jobs = artery.jobsConsumed;
      const prewarms = artery.prewarms;
      const load = Math.min(1, ticks / 8192);
      const pressure = Math.min(1, jobs / Math.max(1, ticks || 1));
      const loadBucket =
        load >= 0.9 ? "saturated" :
        load >= 0.7 ? "high" :
        load >= 0.4 ? "medium" :
        load > 0    ? "low" :
                      "idle";
      const pressureBucket =
        pressure >= 0.9 ? "overload" :
        pressure >= 0.7 ? "high" :
        pressure >= 0.4 ? "medium" :
        pressure > 0    ? "low" :
                          "none";
      return Object.freeze({
        lane: artery.lane,
        ticks,
        jobsConsumed: jobs,
        selfJobsGenerated: artery.selfJobsGenerated,
        lastPatternsCount: artery.lastPatternsCount,
        lastDurationMs: artery.lastDurationMs,
        prewarms,
        lastBand: artery.lastBand,
        lastDnaTag: artery.lastDnaTag,
        lastJobType: artery.lastJobType,
        lastAdvantage: artery.lastAdvantage,
        load,
        loadBucket,
        pressure,
        pressureBucket
      });
    }
  };
  return artery;
}

function createShifterAdapter({ mode, bandMode, lane, instanceId }) {
  const shifter = PulseRealm.ShifterEvoluationaryPulse.createPulseV3({
    lane: lane,
    instanceId: instanceId,
    mode: mode,
    bandMode: bandMode
  });

  const hasShifter =
    shifter &&
    (typeof shifter.encode === "function" ||
      typeof shifter.shiftEncode === "function");

  function encode(value, { band }) {
    if (!hasShifter) return "";
    if (typeof shifter.encode === "function") {
      return shifter.encode(value, { band: band || "symbolic" });
    }
    if (typeof shifter.shiftEncode === "function") {
      return shifter.shiftEncode("regular", "binary", value, {
        band: band || "symbolic"
      });
    }
    return "";
  }

  function decode(bits, { band }) {
    if (!hasShifter) return undefined;
    if (typeof shifter.decode === "function") {
      return shifter.decode(bits, { band: band || "symbolic" });
    }
    if (typeof shifter.shiftDecode === "function") {
      return shifter.shiftDecode("binary", "regular", bits, {
        band: band || "symbolic"
      });
    }
    return undefined;
  }

  function chunk(bits, { band }) {
    if (!hasShifter) return [];
    if (typeof shifter.chunk === "function") {
      return shifter.chunk(bits, { band: band || "symbolic" }) || [];
    }
    if (typeof shifter.shiftChunk === "function") {
      return shifter.shiftChunk("binary", bits, {
        band: band || "symbolic"
      }) || [];
    }
    return [];
  }

  function dechunk(chunks, { band }) {
    if (!hasShifter) return "";
    if (typeof shifter.dechunk === "function") {
      return shifter.dechunk(chunks, { band: band || "symbolic" }) || "";
    }
    if (typeof shifter.shiftDechunk === "function") {
      return shifter.shiftDechunk("binary", chunks, {
        band: band || "symbolic"
      }) || "";
    }
    return "";
  }

  return { encode, decode, chunk, dechunk, hasShifter };
}

function normalizeJob(job, { instanceId, lane, tickId, cosmosContext }) {
  const laneTag = lane === "backward" ? "backward" : "forward";
  const typeUnknown =
    laneTag === "backward" ? "engine:backward:unknown" : "engine:forward:unknown";
  const typeGeneric =
    laneTag === "backward" ? "engine:backward:generic" : "engine:forward:generic";

  if (!job || typeof job !== "object") {
    return {
      id: `job-${laneTag}-${instanceId}-${tickId}`,
      type: typeUnknown,
      payload: {},
      lane: laneTag,
      __band: "symbolic",
      __dnaTag: null,
      __cosmos: cosmosContext
    };
  }

  const payload = job.payload && typeof job.payload === "object"
    ? job.payload
    : {};

  const band =
    typeof payload.__band === "string"
      ? payload.__band.toLowerCase()
      : "symbolic";

  const cosmos =
    job.cosmosContext && typeof job.cosmosContext === "object"
      ? {
          universeId: job.cosmosContext.universeId || cosmosContext.universeId,
          timelineId: job.cosmosContext.timelineId || cosmosContext.timelineId,
          branchId: job.cosmosContext.branchId || cosmosContext.branchId,
          shardId: job.cosmosContext.shardId || cosmosContext.shardId
        }
      : cosmosContext;

  return {
    id: job.id || `job-${laneTag}-${instanceId}-${tickId}`,
    type: job.type || typeGeneric,
    payload,
    lane: laneTag,
    __band: band === "binary" ? "binary" : "symbolic",
    __dnaTag: typeof payload.__dnaTag === "string" ? payload.__dnaTag : null,
    __cosmos: cosmos,
    __intent: job.intent || payload.intent || null
  };
}

function normalizeMetrics(base, extra = {}, { lane, arterySnapshot, harmonicsMode }) {
  return {
    lane,
    instanceId: base.instanceId,
    tickId: base.tickId,
    jobId: base.jobId,
    durationMs: extra.durationMs ?? 0,
    patternsCount: extra.patternsCount ?? 0,
    band: base.band || "symbolic",
    dnaTag: base.dnaTag || null,
    presenceField: base.presenceField || null,
    advantageField: base.advantageField || null,
    cosmos: base.cosmos || null,
    triHeartId: base.triHeartId || null,
    jobType: base.jobType || null,
    intent: base.intent || null,
    advantageScore: extra.advantageScore ?? 0,
    artery: arterySnapshot,
    gpuHint: extra.gpuHint || null,
    harmonicsMode: harmonicsMode || "auto",
    harmonicsHint: extra.harmonicsHint || null,
    wifiHint: extra.wifiHint || null // NEW: WiFi hint carried in metrics
  };
}

function isHarmonicsJob(type, intent) {
  const t = (type || "").toUpperCase();
  const i = (intent || "").toUpperCase();
  if (t === HARMONICS_SIGNAL_TYPE || t === HARMONICS_911_TYPE || t === HARMONICS_HEALTH_TYPE) {
    return true;
  }
  if (i.includes("HARMONICS") || i.includes("911")) return true;
  return true && (t.startsWith("HARMONICS_") || i.startsWith("HARMONICS_")); // bias toward harmonics
}

function isWifiJob(type, intent) {
  const t = (type || "").toUpperCase();
  const i = (intent || "").toUpperCase();
  if (t === WIFI_PACKET_TYPE || t === WIFI_STREAM_TYPE || t === WIFI_HICCUP_TYPE) return true;
  if (i.includes("WIFI")) return true;
  return t.startsWith("WIFI_") || i.startsWith("WIFI_");
}

export const PulseEngineProcessMeta = Object.freeze({
  engineId: "PulseEngineProcess-v31-GPU-EARN-PIXEL-HARMONICS-WIFI",
  version: "v31",
  lanes: ["forward", "backward"],
  bands: ["symbolic", "binary"],
  gpuProcessWorker: true,
  gpuPrimary: true,
  pixelDriven: true,
  harmonicsEnabled: true,
  wifiEnabled: true
});

export function createPulseEngineProcess({
  MemoryOrgan = PulseEngineEvolutionaryMemory || null,
  BrainOrgan,
  instanceId = "engine-0",
  trace = false,
  mode = gpuMode,
  presenceContext = {},
  advantageContext = {},
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  triHeartId = "engine-heart",
  enableGpuProcessWorker = true,
  gpuProcessWorker = PulseGPUProcessWorker || null,
  enableHarmonicsProcessWorker = true,
  harmonicsProcessWorker = PulseHarmonicProcessWorker || null,
  enableWifiProcessWorker = true,                 // NEW
  wifiProcessWorker = PulseWifiProcessWorker || null, // NEW
  gpuMode = "auto",              // "single" | "dual" | "mirror" | "auto"
  gpuIds = ["gpu-0", "gpu-1"],
  gpuTakeover = true,            // when true, GPU/iGPU is treated as primary compute
  harmonicsMode: initialHarmonicsMode = "auto", // "auto" | "gaming" | "harmonics"
  harmonicsEmergencyWindowMs = 60_000           // 911 window where harmonics dominates
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseEngineProcess-v31] MemoryOrgan is required.");
  }

  const Shifter = createShifterAdapter({
    lane: "engine",
    instanceId: "PulseEngine-v31",
    mode: "normal",
    bandMode: "binary"
  });

  let engineTickId = 0;
  let enginePrewarmed = false;

  const ForwardArtery = createArtery("forward");
  const BackwardArtery = createArtery("backward");

  // Harmonics state (mode + last signals)
  let harmonicsState = {
    mode: initialHarmonicsMode || "auto",
    lastSignalTs: null,
    last911Ts: null
  };

  function updateHarmonicsState(type, intent) {
    const now = PulseRealm.PulseNOW;
    const isH = isHarmonicsJob(type, intent);
    if (isH) {
      harmonicsState.lastSignalTs = now;
      safe(MemoryOrgan.write, HARMONICS_LAST_KEY, {
        ts: now,
        type,
        intent
      });
      if ((type || "").toUpperCase() === HARMONICS_911_TYPE) {
        harmonicsState.last911Ts = now;
        harmonicsState.mode = "harmonics";
      } else if (harmonicsState.mode === "auto") {
        harmonicsState.mode = "harmonics";
      }
      return;
    }

    if (harmonicsState.mode === "harmonics") {
      const last911 = harmonicsState.last911Ts || 0;
      const lastSignal = harmonicsState.lastSignalTs || 0;
      const last = Math.max(last911, lastSignal);
      const elapsed = now - last;
      if (elapsed > harmonicsEmergencyWindowMs) {
        harmonicsState.mode = "gaming";
      }
    }
  }

  function readJobQueue(lane) {
    const key = lane === "backward" ? BACKWARD_JOB_QUEUE_KEY : FORWARD_JOB_QUEUE_KEY;
    const raw = safe(MemoryOrgan.read, key);
    if (!raw || !Array.isArray(raw)) return [];
    return raw.slice();
  }

  function writeJobQueue(lane, queue) {
    const key = lane === "backward" ? BACKWARD_JOB_QUEUE_KEY : FORWARD_JOB_QUEUE_KEY;
    safe(MemoryOrgan.write, key, Array.isArray(queue) ? queue.slice() : []);
  }

  function takeNextJob(lane) {
    const queue = readJobQueue(lane);
    if (!queue.length) return null;
    const job = queue.shift();
    writeJobQueue(lane, queue);
    return normalizeJob(job, {
      instanceId,
      lane,
      tickId: engineTickId,
      cosmosContext
    });
  }

  function submitJob(lane, job) {
    try {
      // -----------------------------------------------------------
      // ⭐ NORMALIZE + QUEUE JOB
      // -----------------------------------------------------------
      const queue = readJobQueue(lane);
      const normalized = normalizeJob(job, {
        instanceId,
        lane,
        tickId: engineTickId,
        cosmosContext
      });

      queue.push({
        ...normalized,
        submittedTick: engineTickId
      });

      writeJobQueue(lane, queue);

      if (trace) {
        console.log("[PulseEngineProcess-v31] job submitted:", lane, normalized);
      }

      // -----------------------------------------------------------
      // ⭐ ENGINE PROCESS LIFECYCLE (v35 motion engine)
      // -----------------------------------------------------------

      // PREWARM (first job triggers warm-path)
      if (!enginePrewarmed) {
        enginePrewarmed = true;

        if (gpuTakeover && gpuProcessWorker) {
          gpuProcessWorker.postMessage({ type: "prewarm-engine-process" });
        }

        harmonicsProcessWorker?.postMessage?.({ type: "prewarm-harmonics" });
        wifiProcessWorker?.postMessage?.({ type: "prewarm-wifi" });
      }

      // RUN ONCE (HELP / EARN cycle)
      if (gpuTakeover && gpuProcessWorker) {
        gpuProcessWorker.postMessage({
          type: "run-once-engine-process",
          context: { job: normalized, lane }
        });
      }

      harmonicsProcessWorker?.postMessage?.({
        type: "harmonics-run-once",
        context: { job: normalized, lane }
      });

      wifiProcessWorker?.postMessage?.({
        type: "wifi-run-once",
        context: { job: normalized, lane }
      });

      // TICK FORWARD (main evolution loop)
      engineTickId++;

      if (gpuTakeover && gpuProcessWorker) {
        gpuProcessWorker.postMessage({
          type: "tick-forward-engine-process",
          dt: 0,
          tickId: engineTickId
        });
      }

      harmonicsProcessWorker?.postMessage?.({
        type: "harmonics-tick",
        dt: 0,
        tickId: engineTickId
      });

      wifiProcessWorker?.postMessage?.({
        type: "wifi-tick",
        dt: 0,
        tickId: engineTickId
      });

      // SNAPSHOT FORWARD (state capture)
      const snapshot = {
        tickId: engineTickId,
        harmonicsState: { ...harmonicsState },
        forwardQueue: readJobQueue("forward"),
        backwardQueue: readJobQueue("backward"),
        gpuTakeover,
        gpuMode,
        gpuIds
      };

      if (gpuTakeover && gpuProcessWorker) {
        gpuProcessWorker.postMessage({
          type: "snapshot-forward-engine-process"
        });
      }

      return { ok: true, job: normalized, snapshot };

    } catch (err) {
      console.error("PulseEngineProcess submitJob failed:", err);
      return { ok: false, reason: "SUBMIT_FAILED", error: err };
    }
  }


  function submitForwardJob(job) {
    submitJob("forward", job);
  }

  function submitBackwardJob(job) {
    submitJob("backward", job);
  }

  // Pixel job creator
  function createPixelJob(pixel) {
    return {
      id: `pixel-${instanceId}-${engineTickId}`,
      type: PIXEL_PUSH_TYPE,
      intent: "PIXEL_PUSH",
      payload: {
        pixel,
        origin: "PulseEngineProcess-v31",
        __band: "binary"
      }
    };
  }

  // Public API to push a pixel into the engine (forward lane)
  function pushPixel(pixel) {
    const job = createPixelJob(pixel);
    submitForwardJob(job);
    if (trace) {
      console.log("[PulseEngineProcess-v31] pixel pushed:", { pixel, jobId: job.id });
    }
    return job.id;
  }

  function createSelfJob(lane) {
    const laneTag = lane === "backward" ? "backward" : "forward";
    const typeSelf =
      laneTag === "backward" ? "self:engine-backward" : "self:engine-forward";
    const selfJob = normalizeJob(
      {
        id: `self-${laneTag}-${instanceId}-${engineTickId}`,
        type: typeSelf,
        intent: "SELF_TICK",
        payload: {
          hint: `self-generated-${laneTag}`,
          origin: "PulseEngineProcess-v31"
        }
      },
      { instanceId, lane: laneTag, tickId: engineTickId, cosmosContext }
    );
    if (laneTag === "backward") {
      BackwardArtery.selfJobsGenerated += 1;
    } else {
      ForwardArtery.selfJobsGenerated += 1;
    }
    return selfJob;
  }

  function buildPresenceField() {
    return {
      band: presenceContext.band || "PulseBand",
      deviceId: presenceContext.deviceId || null,
      hydraNodeId: presenceContext.hydraNodeId || null,
      route: presenceContext.route || "/",
      triHeartId
    };
  }

  function buildAdvantageField() {
    return {
      advantageScore: advantageContext.advantageScore ?? 1.0,
      cascadeLevel: advantageContext.cascadeLevel ?? 0,
      timeSavedMs: advantageContext.timeSavedMs ?? 0
    };
  }

  function buildCosmosField(jobCosmos) {
    const c = jobCosmos || cosmosContext;
    return {
      universeId: c.universeId || "u:default",
      timelineId: c.timelineId || "t:main",
      branchId: c.branchId || "b:root",
      shardId: c.shardId || "s:primary"
    };
  }

  // ------------------------ HARMONICS PROCESS WORKER ------------------------

  function routeToHarmonicsProcessWorker(job, lane, baseMeta) {
    if (!enableHarmonicsProcessWorker || !harmonicsProcessWorker) return null;

    const type = baseMeta.jobType || job.type || "";
    const intent = baseMeta.intent || job.intent || "";
    const isH = isHarmonicsJob(type, intent);
    if (!isH) return null;

    const baseJob = {
      ...job,
      lane,
      jobId: baseMeta.jobId,
      jobType: type,
      band: baseMeta.band,
      dnaTag: baseMeta.dnaTag,
      cosmos: baseMeta.cosmos,
      triHeartId: baseMeta.triHeartId,
      intent: baseMeta.intent,
      advantageScore: baseMeta.advantageField.advantageScore ?? 0,
      presence: baseMeta.presenceField,
      harmonicsMode: harmonicsState.mode
    };

    let prepared = null;

    try {
      if (typeof harmonicsProcessWorker.prepareHarmonicsJob === "function") {
        prepared = harmonicsProcessWorker.prepareHarmonicsJob(baseJob, { lane });
      } else if (typeof harmonicsProcessWorker.prepareJob === "function") {
        prepared = harmonicsProcessWorker.prepareJob(baseJob, { lane });
      }
    } catch (err) {
      console.warn("[PulseEngineProcess-v31] HarmonicsProcessWorker prepare failed:", err);
      prepared = null;
    }

    const finalJob = prepared || baseJob;
    const hint = finalJob && typeof finalJob.harmonicsHint === "object"
      ? finalJob.harmonicsHint
      : null;

    if (trace) {
      console.log("[PulseEngineProcess-v31] HarmonicsProcessWorker routed:", {
        lane,
        type,
        intent,
        harmonicsMode: harmonicsState.mode,
        hint
      });
    }

    return hint;
  }

  // --------------------------- GPU PROCESS WORKER ---------------------------

  function routeToGpuProcessWorker(job, lane, baseMeta) {
    if (!enableGpuProcessWorker || !gpuProcessWorker) return null;

    const type = baseMeta.jobType || job.type || "";
    const intent = baseMeta.intent || job.intent || "";
    const isForward = lane === "forward";
    const isBackward = lane === "backward";

    const isBinaryCompute =
      type === "BINARY_COMPUTE" ||
      type === "GPU_COMPUTE" ||
      type === PIXEL_GPU_COMPUTE_TYPE;

    const isEarn =
      type.startsWith("EARN_");

    const isH = isHarmonicsJob(type, intent);

    const baseJob = {
      ...job,
      lane,
      jobId: baseMeta.jobId,
      jobType: type,
      band: baseMeta.band,
      dnaTag: baseMeta.dnaTag,
      cosmos: baseMeta.cosmos,
      triHeartId: baseMeta.triHeartId,
      intent: baseMeta.intent,
      advantageScore: baseMeta.advantageField.advantageScore ?? 0,
      presence: baseMeta.presenceField,
      gpuMode,
      gpuIds,
      gpuTakeover,
      harmonicsMode: harmonicsState.mode
    };

    let prepared = null;

    try {
      if (isBinaryCompute && typeof gpuProcessWorker.prepareGpuJob === "function") {
        prepared = gpuProcessWorker.prepareGpuJob(baseJob, { lane });
      } else if (isEarn && typeof gpuProcessWorker.prepareEarnJob === "function") {
        prepared = gpuProcessWorker.prepareEarnJob(baseJob, { lane });
      } else if (isForward && typeof gpuProcessWorker.prepareForwardJob === "function") {
        prepared = gpuProcessWorker.prepareForwardJob(baseJob, { lane });
      } else if (isBackward && typeof gpuProcessWorker.prepareBackwardJob === "function") {
        prepared = gpuProcessWorker.prepareBackwardJob(baseJob, { lane });
      } else if (typeof gpuProcessWorker.prepareJob === "function") {
        prepared = gpuProcessWorker.prepareJob(baseJob, { lane });
      }
    } catch (err) {
      console.warn("[PulseEngineProcess-v31] GPU ProcessWorker prepare failed:", err);
      prepared = null;
    }

    const finalJob = prepared || baseJob;
    const hint = finalJob && typeof finalJob.gpuHint === "object"
      ? finalJob.gpuHint
      : null;

    safe(MemoryOrgan.write, GPU_LAST_DISPATCH_KEY, finalJob);
    safe(MemoryOrgan.write, GPU_LAST_HINT_KEY, hint);

    if (trace) {
      console.log("[PulseEngineProcess-v31] GPU ProcessWorker routed:", {
        lane,
        gpuMode,
        gpuIds,
        type,
        intent,
        hint,
        gpuTakeover,
        harmonicsMode: harmonicsState.mode
      });
    }

    return hint;
  }

  // --------------------------- WIFI PROCESS WORKER --------------------------

  function routeToWifiProcessWorker(job, lane, baseMeta) {
    if (!enableWifiProcessWorker || !wifiProcessWorker) return null;

    const type = baseMeta.jobType || job.type || "";
    const intent = baseMeta.intent || job.intent || "";
    const isWifi = isWifiJob(type, intent);
    if (!isWifi) return null;

    const baseJob = {
      ...job,
      lane,
      jobId: baseMeta.jobId,
      jobType: type || WIFI_PACKET_TYPE,
      band: baseMeta.band,
      dnaTag: baseMeta.dnaTag,
      cosmos: baseMeta.cosmos,
      triHeartId: baseMeta.triHeartId,
      intent: baseMeta.intent,
      advantageScore: baseMeta.advantageField.advantageScore ?? 0,
      presence: baseMeta.presenceField
    };

    let prepared = null;

    try {
      if (typeof wifiProcessWorker.prepareJob === "function") {
        prepared = wifiProcessWorker.prepareJob(baseJob, { lane });
      } else if (typeof wifiProcessWorker.submit === "function") {
        prepared = wifiProcessWorker.submit(baseJob);
      }
    } catch (err) {
      console.warn("[PulseEngineProcess-v31] WifiProcessWorker prepare/submit failed:", err);
      prepared = null;
    }

    const finalJob = prepared || baseJob;
    const hint = finalJob && typeof finalJob.wifiHint === "object"
      ? finalJob.wifiHint
      : null;

    if (trace) {
      console.log("[PulseEngineProcess-v31] WifiProcessWorker routed:", {
        lane,
        type,
        intent,
        hint
      });
    }

    return hint;
  }

  // ------------------------- ROUTING + ADVANTAGE LOGIC ----------------------

  function maybeRouteTripleThreat(job, lane, baseMeta) {
    let advantageScore = 0.5;
    const type = job.type || baseMeta.jobType || "";
    const intent = job.__intent || baseMeta.intent || "";

    const isPixel =
      type === PIXEL_PUSH_TYPE || type === PIXEL_GPU_COMPUTE_TYPE;

    const isH = isHarmonicsJob(type, intent);
    const isWifi = isWifiJob(type, intent);

    // Update harmonics state based on this job
    updateHarmonicsState(type, intent);
    const mode = harmonicsState.mode;

    if (isPixel) {
      advantageScore = gpuTakeover ? 0.95 : 0.8;
    } else if (isH) {
      advantageScore = 0.9;
    } else if (isWifi) {
      advantageScore = 0.85; // WiFi jobs get strong priority for packet streaming
    }

    const isBinaryCompute =
      type === "GPU_COMPUTE" ||
      type === "BINARY_COMPUTE";

    const isEarn =
      type.startsWith("EARN_");

    const shouldRouteGpu =
      isPixel || isBinaryCompute || isEarn;

    let gpuHint = null;
    let harmonicsHint = null;
    let wifiHint = null;

    // Harmonics gating:
    //  • If mode === "harmonics" and job is NOT harmonics/pixel, we avoid GPU routing
    //    to keep space for harmonics (911 window).
    const harmonicsBlocksGpu =
      mode === "harmonics" && !isH && !isPixel;

    // First: harmonics worker for harmonics jobs
    if (isH) {
      harmonicsHint = routeToHarmonicsProcessWorker(job, lane, baseMeta);
      if (harmonicsHint && typeof harmonicsHint.advantageBoost === "number") {
        advantageScore = Math.max(
          0,
          Math.min(1, advantageScore + harmonicsHint.advantageBoost)
        );
      }
    }

    // Second: GPU worker for pixel / compute / earn, unless blocked by harmonics
    if (shouldRouteGpu && !harmonicsBlocksGpu) {
      const routedType = isPixel ? PIXEL_GPU_COMPUTE_TYPE : type;
      gpuHint = routeToGpuProcessWorker(
        {
          ...job,
          type: routedType
        },
        lane,
        { ...baseMeta, jobType: routedType }
      );
      if (gpuHint && typeof gpuHint.advantageBoost === "number") {
        advantageScore = Math.max(
          0,
          Math.min(1, advantageScore + gpuHint.advantageBoost)
        );
      }
    }

    // Third: WiFi worker for WiFi/packet jobs
    if (isWifi) {
      wifiHint = routeToWifiProcessWorker(job, lane, baseMeta);
      if (wifiHint && typeof wifiHint.advantageBoost === "number") {
        advantageScore = Math.max(
          0,
          Math.min(1, advantageScore + wifiHint.advantageBoost)
        );
      }
    }

    // If harmonics is active and this job is NOT harmonics, we slightly depress advantage
    if (mode === "harmonics" && !isH && !isPixel) {
      advantageScore = Math.max(0, Math.min(1, advantageScore - 0.15));
    }

    return {
      advantageScore,
      gpuHint,
      harmonicsHint,
      wifiHint,
      isPixel,
      isHarmonics: isH,
      isWifi,
      harmonicsMode: mode
    };
  }

  // ------------------------------- FORWARD ----------------------------------

  function computeForward(job) {
    const tickId = engineTickId;
    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const cosmosField = buildCosmosField(job.__cosmos);

    const baseMeta = {
      lane: "forward",
      instanceId,
      tickId,
      jobId: job.id,
      band: job.__band || "symbolic",
      dnaTag: job.__dnaTag || null,
      presenceField,
      advantageField,
      cosmos: cosmosField,
      triHeartId,
      jobType: job.type,
      intent: job.__intent || null
    };

    const payload = job.payload || {};

    const {
      advantageScore,
      gpuHint,
      harmonicsHint,
      wifiHint,
      isPixel,
      isHarmonics,
      isWifi,
      harmonicsMode
    } = maybeRouteTripleThreat(
      job,
      "forward",
      baseMeta
    );

    const score =
      typeof payload.score === "number"
        ? payload.score
        : typeof payload.baseScore === "number"
          ? payload.baseScore
          : 0.5;

    const clampedScore = Math.max(0, Math.min(1, score));

    let boostBase = isPixel ? 0.2 : 0.1;
    if (isHarmonics) {
      boostBase = 0.25;
    } else if (isWifi) {
      boostBase = 0.18;
    }

    const boostedScore = Math.max(
      0,
      Math.min(1, clampedScore + boostBase)
    );

    let patterns = Array.isArray(payload.patterns) ? payload.patterns.slice() : [];
    if (patterns.length < 4 && (isPixel || isHarmonics || isWifi)) {
      const tag =
        isPixel ? "px" :
        isHarmonics ? "harm" :
        "wifi";
      const nextId = `${tag}-${patterns.length + 1}`;
      patterns.push({
        id: nextId,
        weight: boostedScore,
        source: payload.source ||
          (isPixel
            ? "pixel-forward"
            : isHarmonics
              ? "harmonics-forward"
              : "wifi-forward"),
        lane: "forward"
      });
    }

    const resultPayload = {
      ...payload,
      lane: "forward",
      boostedScore,
      patterns,
      __band: baseMeta.band,
      __dnaTag: baseMeta.dnaTag,
      __cosmos: cosmosField,
      __advantageScore: advantageScore,
      __pixel: isPixel === true,
      __harmonics: isHarmonics === true,
      __wifi: isWifi === true,
      __harmonicsMode: harmonicsMode
    };

    const arterySnapshot = ForwardArtery.snapshot();
    const metrics = normalizeMetrics(
      baseMeta,
      {
        durationMs: 0,
        patternsCount: patterns.length,
        advantageScore,
        gpuHint,
        harmonicsHint,
        wifiHint
      },
      { lane: "forward", arterySnapshot, harmonicsMode }
    );

    ForwardArtery.lastPatternsCount = patterns.length;
    ForwardArtery.lastDurationMs = 0;
    ForwardArtery.lastBand = baseMeta.band;
    ForwardArtery.lastDnaTag = baseMeta.dnaTag;
    ForwardArtery.lastJobType = baseMeta.jobType;
    ForwardArtery.lastAdvantage = advantageScore;

    return {
      meta: baseMeta,
      payload: resultPayload,
      metrics
    };
  }

  // ------------------------------ BACKWARD ----------------------------------

  function computeBackward(job) {
    const tickId = engineTickId;
    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const cosmosField = buildCosmosField(job.__cosmos);

    const baseMeta = {
      lane: "backward",
      instanceId,
      tickId,
      jobId: job.id,
      band: job.__band || "symbolic",
      dnaTag: job.__dnaTag || null,
      presenceField,
      advantageField,
      cosmos: cosmosField,
      triHeartId,
      jobType: job.type,
      intent: job.__intent || null
    };

    const payload = job.payload || {};

    const {
      advantageScore,
      gpuHint,
      harmonicsHint,
      wifiHint,
      isPixel,
      isHarmonics,
      isWifi,
      harmonicsMode
    } = maybeRouteTripleThreat(
      job,
      "backward",
      baseMeta
    );

    const score =
      typeof payload.boostedScore === "number"
        ? payload.boostedScore
        : typeof payload.score === "number"
          ? payload.score
          : 0.5;

    const clampedScore = Math.max(0, Math.min(1, score));
    let stabilizationDelta = 0.05;
    if (isHarmonics) {
      stabilizationDelta = 0.02;
    } else if (isWifi) {
      stabilizationDelta = 0.03;
    }

    const stabilizedScore = Math.max(
      0,
      Math.min(1, clampedScore - stabilizationDelta)
    );

    let patterns = Array.isArray(payload.patterns) ? payload.patterns.slice() : [];
    const seen = new Set();
    patterns = patterns.filter((p) => {
      if (!p || typeof p !== "object") return false;
      const key = `${p.id ?? "?"}:${p.weight ?? 0}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const compressedHints = patterns.slice(0, 4).map((p) => ({
      id: p.id,
      bucket: (typeof p.weight === "number" && p.weight > 0.5) ? "high" : "low"
    }));

    const resultPayload = {
      ...payload,
      lane: "backward",
      stabilizedScore,
      patterns,
      compressedHints,
      __band: baseMeta.band,
      __dnaTag: baseMeta.dnaTag,
      __cosmos: cosmosField,
      __advantageScore: advantageScore,
      __pixel: isPixel === true,
      __harmonics: isHarmonics === true,
      __wifi: isWifi === true,
      __harmonicsMode: harmonicsMode
    };

    const arterySnapshot = BackwardArtery.snapshot();
    const metrics = normalizeMetrics(
      baseMeta,
      {
        durationMs: 0,
        patternsCount: patterns.length,
        advantageScore,
        gpuHint,
        harmonicsHint,
        wifiHint
      },
      { lane: "backward", arterySnapshot, harmonicsMode }
    );

    BackwardArtery.lastPatternsCount = patterns.length;
    BackwardArtery.lastDurationMs = 0;
    BackwardArtery.lastBand = baseMeta.band;
    BackwardArtery.lastDnaTag = baseMeta.dnaTag;
    BackwardArtery.lastJobType = baseMeta.jobType;
    BackwardArtery.lastAdvantage = advantageScore;

    return {
      meta: baseMeta,
      payload: resultPayload,
      metrics
    };
  }

  // --------------------------- RESULT + BRAIN FEED --------------------------

  function writeResult(lane, result) {
    const band = result.metrics.band || "symbolic";
    const encoded = Shifter.encode(result, { band }) || "";
    const chunks  = Shifter.chunk(encoded, { band }) || [];

    const packet = {
      bits: chunks,
      meta: {
        lane,
        instanceId,
        tickId: result.metrics.tickId,
        jobId: result.metrics.jobId,
        band: result.metrics.band,
        dnaTag: result.metrics.dnaTag,
        shifterPulse: Shifter.hasShifter === true ? "enabled" : "fallback-binary",
        presenceField: result.metrics.presenceField,
        advantageField: result.metrics.advantageField,
        cosmos: result.metrics.cosmos,
        triHeartId: result.metrics.triHeartId,
        jobType: result.metrics.jobType,
        intent: result.metrics.intent,
        advantageScore: result.metrics.advantageScore,
        artery: result.metrics.artery,
        gpuHint: result.metrics.gpuHint || null,
        harmonicsMode: result.metrics.harmonicsMode || "auto",
        harmonicsHint: result.metrics.harmonicsHint || null,
        wifiHint: result.metrics.wifiHint || null // NEW: WiFi hint exposed to StrandedDNA / PulseWorld
      }
    };

    const resultKey  = lane === "backward" ? BACKWARD_RESULT_KEY  : FORWARD_RESULT_KEY;
    const metricsKey = lane === "backward" ? BACKWARD_METRICS_KEY : FORWARD_METRICS_KEY;

    safe(MemoryOrgan.write, resultKey, packet);
    safe(MemoryOrgan.write, metricsKey, result.metrics);

    if (trace) {
      console.log("[PulseEngineProcess-v31] result written:", {
        lane,
        key: resultKey,
        metrics: result.metrics,
        shifterPulse: packet.meta.shifterPulse
      });
    }
  }

  function feedBrain(lane, result) {
    if (!BrainOrgan || typeof BrainOrgan.evolve !== "function") return;

    const basePayload = {
      lane,
      instanceId,
      tickId: result.metrics.tickId,
      jobId: result.metrics.jobId,
      patternsCount: result.metrics.patternsCount,
      band: result.metrics.band,
      dnaTag: result.metrics.dnaTag,
      presenceField: result.metrics.presenceField,
      advantageField: result.metrics.advantageField,
      cosmos: result.metrics.cosmos,
      triHeartId: result.metrics.triHeartId,
      gpuHint: result.metrics.gpuHint || null,
      harmonicsHint: result.metrics.harmonicsHint || null,
      wifiHint: result.metrics.wifiHint || null
    };

    try {
      BrainOrgan.evolve(basePayload);
    } catch (err) {
      if (trace) console.warn("[PulseEngineProcess-v31] BrainOrgan.evolve failed:", err);
    }
  }

  // You’d continue with tick/prewarm/snapshot using wifiProcessWorker.tick()
  // alongside gpuProcessWorker.tick() and harmonicsProcessWorker.tick().

  return {
    pushPixel,
    submitForwardJob,
    submitBackwardJob,

    // -----------------------------------------------------------
    // ⭐ PREWARM — warm-path initializer
    // -----------------------------------------------------------
    prewarm() {
      try {
        enginePrewarmed = true;

        // GPU takeover warm-path
        if (gpuTakeover && gpuProcessWorker) {
          gpuProcessWorker.postMessage({ type: "prewarm-engine-process" });
        }

        // Harmonics warm-path
        harmonicsProcessWorker?.postMessage?.({ type: "prewarm-harmonics" });

        // WiFi warm-path
        wifiProcessWorker?.postMessage?.({ type: "prewarm-wifi" });

      } catch (err) {
        console.error("PulseEngineProcess prewarm failed:", err);
        enginePrewarmed = false;
      }
    },

    // -----------------------------------------------------------
    // ⭐ RUN ONCE — single-cycle HELP lane execution
    // -----------------------------------------------------------
    runOnce(context = {}) {
      try {
        // GPU HELP cycle
        if (gpuTakeover && gpuProcessWorker) {
          gpuProcessWorker.postMessage({
            type: "run-once-engine-process",
            context
          });
        }

        // Harmonics HELP cycle
        harmonicsProcessWorker?.postMessage?.({
          type: "harmonics-run-once",
          context
        });

        // WiFi HELP cycle
        wifiProcessWorker?.postMessage?.({
          type: "wifi-run-once",
          context
        });

      } catch (err) {
        console.error("PulseEngineProcess runOnce failed:", err);
      }
    },

    // -----------------------------------------------------------
    // ⭐ TICK FORWARD — main evolution loop
    // -----------------------------------------------------------
    tickForward(dt = 0) {
      try {
        engineTickId++;

        // GPU tick
        if (gpuTakeover && gpuProcessWorker) {
          gpuProcessWorker.postMessage({
            type: "tick-forward-engine-process",
            dt,
            tickId: engineTickId
          });
        }

        // Harmonics tick
        harmonicsProcessWorker?.postMessage?.({
          type: "harmonics-tick",
          dt,
          tickId: engineTickId
        });

        // WiFi tick
        wifiProcessWorker?.postMessage?.({
          type: "wifi-tick",
          dt,
          tickId: engineTickId
        });

      } catch (err) {
        console.error("PulseEngineProcess tickForward failed:", err);
      }
    },

    // -----------------------------------------------------------
    // ⭐ SNAPSHOT FORWARD — state capture for engine process
    // -----------------------------------------------------------
    snapshotForward() {
      try {
        const snap = {
          tickId: engineTickId,
          harmonicsState: { ...harmonicsState },
          forwardQueue: readJobQueue("forward"),
          backwardQueue: readJobQueue("backward"),
          gpuTakeover,
          gpuMode,
          gpuIds
        };

        // GPU snapshot
        if (gpuTakeover && gpuProcessWorker) {
          gpuProcessWorker.postMessage({ type: "snapshot-forward-engine-process" });
        }

        return snap;

      } catch (err) {
        console.error("PulseEngineProcess snapshotForward failed:", err);
        return null;
      }
    }
};
}


export const PulseEngineProcess = createPulseEngineProcess;
