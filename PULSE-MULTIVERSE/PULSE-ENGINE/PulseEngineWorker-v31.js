// ============================================================================
// PulseCompass-v31-Immortal-Evo++++-GPU+Earn+Pixel+Harmonics+WiFi-ProcessWorker+++
//  • Motion Orchestrator & Telemetry Core (Forward + Backward + GPU/Earn/Pixel/Harmonics/WiFi)
//  • Dynamic lane selection (forward/backward/auto) with last-lane memory
//  • Pixel-aware routing (pixel → forward lane → GPU_COMPUTE_PIXEL)
//  • Harmonics-aware routing (harmonics → safest lane, 911 gets max space)
//  • WiFi-aware routing (packet streams, pacing, advantage)
//  • Health/advantage-aware auto-fallback + overload protection
//  • Full motion telemetry → Motion_Engine_Logs (via PulseDB-v31)
//  • Prewarms DB, motion lanes, GPU/Earn/Pixel/Harmonics/WiFi workers
//  • Cosmos-aware, presence/advantage-aware, dual-band, artery-aware
//  • Zero heavy compute — pure routing + reporting + worker handoff
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { PulseForward as Forward } from "./PulseEngineForwardProcess-v31.js";
import { PulseBackward as Backward } from "./PulseEngineBackwardProcess-v31.js";
import { createPulseDB } from "./PulseEngineWorkFlow-v31.js";
import { createPulseCompassReporter } from "./PulseEngineBlackBox-v31.js";
import { PulseGPUProcessWorker } from "./PulseEngineGPUProcessWorker-v31.js";
import { PulseHarmonicProcessWorker } from "./PulseEngineHarmonicsProcessWorker-v31.js";

// NEW: WiFi worker import (your v1 WiFi worker)
import {
  PulseWifiProcessWorker,
  detectWifiProfile
} from "./PulseEngineWIFIProcessWorker-v31.js"; // adjust path to your WiFi worker file

const presenceContext =
  (PulseRealm.PULSE_PRESENCE) ||
  PulseRealm.PULSE_PRESENCE ||
  {};

const advantageContext =
  (PulseRealm.PULSE_ADVANTAGE) ||
  PulseRealm.PULSE_ADVANTAGE ||
  {};

const cosmosContextDefault =
  (PulseRealm.PULSE_COSMOS) ||
  PulseRealm.PULSE_COSMOS ||
  {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  };

const LAST_LANE_KEY      = "pulse:v31:lastMotionLane";
const MOTION_LOGS_KEY    = "pulse:v31:Motion_Engine_Logs";
const HEALTH_KEY         = "pulse:v31:Motion_Engine_Health";
const COMPASS_STATE_KEY  = "pulse:v31:Motion_Compass_State";

const DEFAULT_LANE = "forward";

export const LANES = {
  forward: Forward,
  backward: Backward
};

export const HEALTH_CONFIG = {
  minTicksForHealth: 8,
  maxErrorRate: 0.25,
  maxOverloadPressure: 0.9,
  minAdvantageScore: 0.1
};

// Harmonics job types
const HARMONICS_JOB_TYPE = "HARMONICS_TASK";
const HARMONICS_911_TYPE = "HARMONICS_911";

// WiFi job types (for hints)
const WIFI_PACKET_TYPE   = "WIFI_PACKET";
const WIFI_STREAM_TYPE   = "WIFI_STREAM";
const WIFI_HICCUP_TYPE   = "WIFI_HICCUP";

export const PulseCompassMeta = Object.freeze({
  id: "PulseCompass-v31-Immortal-Evo++++-GPU+Earn+Pixel+Harmonics+WiFi",
  version: "31.0-Immortal-Evo++++-QuadThreat",
  lanes: ["forward", "backward"],
  bands: ["symbolic", "binary"],
  dualBand: true,
  gpuProcessWorker: true,
  earnLane: true,
  pixelLane: true,
  harmonicsLane: true,
  harmonicsWorker: true,
  wifiWorker: true
});

export function createPulseCompass({
  MemoryOrgan,
  trace = false,
  sessionId = null,
  cosmosContext = cosmosContextDefault,
  presenceContext: presenceCtxOverride = presenceContext,
  advantageContext: advantageCtxOverride = advantageContext,
  gpuProcessWorker = null,
  harmonicsWorker: harmonicsWorkerOverride = null,
  wifiWorker: wifiWorkerOverride = null
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseCompass-v31] MemoryOrgan is required.");
  }

  const presenceCtx = presenceCtxOverride || presenceContext;
  const advantageCtx = advantageCtxOverride || advantageContext;

  const PulseDB = createPulseDB({
    MemoryOrgan,
    trace,
    sessionId,
    cosmosContext,
    presenceContext: presenceCtx,
    advantageContext: advantageCtx
  });

  PulseDB.ensureCollection(MOTION_LOGS_KEY);
  PulseDB.ensureCollection(HEALTH_KEY);

  // GPU/Earn/Pixel process worker (v31)
  const worker =
    gpuProcessWorker ||
    (PulseGPUProcessWorker && typeof PulseGPUProcessWorker.prepareJob === "function"
      ? PulseGPUProcessWorker
      : null);

  // Harmonics worker (v31)
  const harmonicsWorker =
    harmonicsWorkerOverride ||
    (PulseHarmonicProcessWorker && typeof PulseHarmonicProcessWorker.plan === "function"
      ? PulseHarmonicProcessWorker
      : null);

  // NEW: WiFi worker (v1) — packet pacing + hints
  const wifiWorker =
    wifiWorkerOverride ||
    (PulseWifiProcessWorker && typeof PulseWifiProcessWorker.submit === "function"
      ? PulseWifiProcessWorker
      : null);

  // Minimal Compass shell for reporter
  const CompassShell = {
    getHealthScores: () => null,
    getCompassState: () => readCompassState(),
    get activeLane() {
      return readLastLane();
    }
  };

  const Reporter = createPulseCompassReporter({
    Compass: CompassShell,
    PulseDB,
    sessionId,
    trace,
    cosmosContext,
    presenceContext: presenceCtx,
    advantageContext: advantageCtx
  });

  // ---------------------------------------------------------------------------
  // INTERNAL STATE HELPERS
  // ---------------------------------------------------------------------------
  function readLastLane() {
    const lane = MemoryOrgan.read(LAST_LANE_KEY);
    if (LANES[lane]) return lane;
    return DEFAULT_LANE;
  }

  function writeLastLane(lane) {
    MemoryOrgan.write(LAST_LANE_KEY, lane);
  }

  function readCompassState() {
    const state = MemoryOrgan.read(COMPASS_STATE_KEY);
    if (!state || typeof state !== "object") {
      return {
        lastLane: DEFAULT_LANE,
        lastTickAt: null,
        lastAdvantage: 0,
        lastPressure: 0,
        lastJobType: null,
        cosmos: cosmosContext,
        wifiProfile: detectWifiProfile()
      };
    }
    return state;
  }

  function writeCompassState(partial) {
    const current = readCompassState();
    const next = { ...current, ...partial };
    MemoryOrgan.write(COMPASS_STATE_KEY, next);
    return next;
  }

  async function appendLog(entry) {
    const envelope = {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presenceContext: presenceCtx,
      advantageContext: advantageCtx,
      schemaVersion: "v31",
      version: PulseCompassMeta.version
    };
    await PulseDB.append(MOTION_LOGS_KEY, envelope);
    if (trace) console.log("[PulseCompass-v31] Log appended:", envelope);
  }

  async function readLogs() {
    return PulseDB.read(MOTION_LOGS_KEY);
  }

  async function readHealth() {
    const health = await PulseDB.read(HEALTH_KEY);
    return Array.isArray(health) ? health : [];
  }

  async function writeHealthSnapshot(snapshot) {
    const envelope = {
      timestamp: PulseRealm.PulseNOW,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      snapshot,
      schemaVersion: "v31",
      version: PulseCompassMeta.version
    };
    await PulseDB.append(HEALTH_KEY, envelope);
    if (trace) console.log("[PulseCompass-v31] Health snapshot recorded:", envelope);
  }

  async function computeLaneStats() {
    if (Reporter && typeof Reporter.getLaneStats === "function") {
      return Reporter.getLaneStats();
    }

    const logs = (await readLogs()).filter((e) => e.type === "tick");
    const stats = {};
    for (const log of logs) {
      const lane = log.lane;
      if (!stats[lane]) {
        stats[lane] = {
          ticks: 0,
          patterns: 0,
          lastTickId: null,
          lastPressure: null,
          lastLoad: null,
          lastBand: null,
          lastDnaTag: null,
          lastAdvantageScore: null,
          lastJobType: null,
          lastIntent: null,
          lastWifiHint: null
        };
      }
      stats[lane].ticks += 1;
      stats[lane].patterns += log.patterns || 0;
      stats[lane].lastTickId = log.tickId;
      stats[lane].lastPressure = log.pressure || null;
      stats[lane].lastLoad = log.load || null;
      stats[lane].lastBand = log.band || null;
      stats[lane].lastDnaTag = log.dnaTag || null;
      stats[lane].lastAdvantageScore = log.advantageScore ?? null;
      stats[lane].lastJobType = log.jobType || null;
      stats[lane].lastIntent = log.intent || null;
      stats[lane].lastWifiHint = log.wifiHint || null;
    }
    return stats;
  }

  async function computeHealth() {
    const stats = await computeLaneStats();
    const health = {
      ts: PulseRealm.PulseNOW,
      lanes: {},
      config: HEALTH_CONFIG
    };

    for (const lane of Object.keys(LANES)) {
      const s = stats[lane] || {
        ticks: 0,
        patterns: 0,
        lastTickId: null,
        lastPressure: null,
        lastLoad: null,
        lastBand: null,
        lastDnaTag: null,
        lastAdvantageScore: null,
        lastJobType: null,
        lastIntent: null,
        lastWifiHint: null
      };
      const ticks = s.ticks;
      const advantage = s.lastAdvantageScore ?? 0;
      const pressure = s.lastPressure?.gpuLoadPressure ?? 0;
      const healthy =
        ticks >= HEALTH_CONFIG.minTicksForHealth &&
        advantage >= HEALTH_CONFIG.minAdvantageScore &&
        pressure <= HEALTH_CONFIG.maxOverloadPressure;

      health.lanes[lane] = {
        ticks,
        patterns: s.patterns,
        lastTickId: s.lastTickId,
        lastPressure: s.lastPressure,
        lastLoad: s.lastLoad,
        lastBand: s.lastBand,
        lastDnaTag: s.lastDnaTag,
        lastAdvantageScore: s.lastAdvantageScore,
        lastJobType: s.lastJobType,
        lastIntent: s.lastIntent,
        lastWifiHint: s.lastWifiHint,
        healthy
      };
    }

    await writeHealthSnapshot(health);
    return health;
  }

  // ---------------------------------------------------------------------------
  // LANE SELECTION + GPU/Earn/Pixel/Harmonics/WiFi ENRICHMENT
  // ---------------------------------------------------------------------------
  function chooseLane(job, healthSnapshot, compassState) {
    const hints = job.hints || {};
    const forcedLane = hints.lane;
    if (forcedLane && LANES[forcedLane]) return forcedLane;

    const lastLane = compassState.lastLane || DEFAULT_LANE;
    const health = healthSnapshot.lanes || {};
    const forwardHealthy = health.forward?.healthy !== false;
    const backwardHealthy = health.backward?.healthy !== false;

    const jobType = job.type || "";
    const intent = job.intent || "";
    const harmonicsHint = hints.harmonics === true || jobType === HARMONICS_JOB_TYPE || jobType === HARMONICS_911_TYPE;
    const harmonicsEmergency = jobType === HARMONICS_911_TYPE || hints.harmonicsEmergency === true;

    const wifiHint = hints.wifi === true || jobType === WIFI_STREAM_TYPE || jobType === WIFI_PACKET_TYPE;
    const wifiHiccup = hints.wifiHiccup === true || jobType === WIFI_HICCUP_TYPE;

    // Pixel → always forward
    if (jobType === "PIXEL_PUSH" || jobType === "GPU_COMPUTE_PIXEL") {
      return "forward";
    }

    // GPU-heavy jobs prefer forward
    if (jobType === "GPU_CACHE" || jobType === "BINARY_COMPUTE" || jobType === "GPU_COMPUTE") {
      if (forwardHealthy) return "forward";
    }

    // Earn settlement prefers backward
    if (jobType === "EARN_TASK" && intent === "settlement") {
      if (backwardHealthy) return "backward";
    }

    // Harmonics: pick lane with more breathing room (lower pressure).
    if (harmonicsHint) {
      const f = health.forward || {};
      const b = health.backward || {};
      const fPressure = f.lastPressure?.gpuLoadPressure ?? 0;
      const bPressure = b.lastPressure?.gpuLoadPressure ?? 0;

      if (harmonicsEmergency) {
        if (fPressure <= bPressure && forwardHealthy) return "forward";
        if (bPressure < fPressure && backwardHealthy) return "backward";
        if (forwardHealthy && !backwardHealthy) return "forward";
        if (!forwardHealthy && backwardHealthy) return "backward";
        return lastLane;
      }

      const lastStats = health[lastLane] || {};
      const lastPressure = lastStats.lastPressure?.gpuLoadPressure ?? 0;
      if (lastPressure <= HEALTH_CONFIG.maxOverloadPressure) {
        return lastLane;
      }
      if (fPressure <= bPressure && forwardHealthy) return "forward";
      if (bPressure < fPressure && backwardHealthy) return "backward";
      return lastLane;
    }

    // WiFi: prefer lane that has been more stable for packet flow (more ticks, less overload)
    if (wifiHint || wifiHiccup) {
      const f = health.forward || {};
      const b = health.backward || {};
      const fTicks = f.ticks || 0;
      const bTicks = b.ticks || 0;
      const fPressure = f.lastPressure?.gpuLoadPressure ?? 0;
      const bPressure = b.lastPressure?.gpuLoadPressure ?? 0;

      // For hiccup jobs, pick lane with lower pressure to let others breathe.
      if (wifiHiccup) {
        if (fPressure <= bPressure && forwardHealthy) return "forward";
        if (bPressure < fPressure && backwardHealthy) return "backward";
        return lastLane;
      }

      // For normal WiFi streams, prefer lane with more ticks but still under pressure threshold.
      if (forwardHealthy && fPressure <= HEALTH_CONFIG.maxOverloadPressure && fTicks >= bTicks) {
        return "forward";
      }
      if (backwardHealthy && bPressure <= HEALTH_CONFIG.maxOverloadPressure && bTicks > fTicks) {
        return "backward";
      }
      return lastLane;
    }

    if (forwardHealthy && !backwardHealthy) return "forward";
    if (!forwardHealthy && backwardHealthy) return "backward";

    return lastLane;
  }

  function enrichJobViaGpuWorker(job) {
    if (!worker || typeof worker.plan !== "function") return job;
    try {
      const hint = worker.plan({
        lane: job.lane || null,
        jobId: job.jobId || job.id || null,
        jobType: job.type || job.jobType || null,
        band: job.band || "symbolic",
        dnaTag: job.dnaTag || null,
        cosmos: job.cosmosContext || cosmosContext,
        triHeartId: job.triHeartId || null,
        intent: job.intent || null,
        advantageScore:
          typeof job.advantageScore === "number" ? job.advantageScore : 0.5,
        presence: job.presence || null,
        payload: job.payload || {}
      });

      if (hint && Reporter && typeof Reporter.recordGPUHint === "function") {
        Reporter.recordGPUHint({ job, hint });
      }

      if (!hint || typeof hint !== "object") return job;

      return {
        ...job,
        band: hint.band || job.band || "symbolic",
        dnaTag: hint.dnaTag || job.dnaTag || null,
        advantageScore:
          typeof hint.advantageScore === "number"
            ? hint.advantageScore
            : job.advantageScore,
        gpuHint: hint,
        hints: {
          ...(job.hints || {}),
          gpu: hint
        }
      };
    } catch (err) {
      if (trace) console.error("[PulseCompass-v31] worker.plan (GPU) failed:", err);
      return job;
    }
  }

  function enrichJobViaHarmonicsWorker(job) {
    if (!harmonicsWorker) return job;

    const hasPlanHarmonics = typeof harmonicsWorker.planHarmonics === "function";
    const hasPlan = typeof harmonicsWorker.plan === "function";
    if (!hasPlanHarmonics && !hasPlan) return job;

    try {
      const planner = hasPlanHarmonics
        ? harmonicsWorker.planHarmonics.bind(harmonicsWorker)
        : harmonicsWorker.plan.bind(harmonicsWorker);

      const hint = planner({
        lane: job.lane || null,
        jobId: job.jobId || job.id || null,
        jobType: job.type || job.jobType || null,
        band: job.band || "symbolic",
        dnaTag: job.dnaTag || null,
        cosmos: job.cosmosContext || cosmosContext,
        triHeartId: job.triHeartId || null,
        intent: job.intent || null,
        advantageScore:
          typeof job.advantageScore === "number" ? job.advantageScore : 0.5,
        presence: job.presence || null,
        payload: job.payload || {},
        hints: job.hints || {}
      });

      if (hint && Reporter && typeof Reporter.recordHarmonicsHint === "function") {
        Reporter.recordHarmonicsHint({ job, hint });
      }

      if (!hint || typeof hint !== "object") return job;

      const harmonicsEmergency = hint.emergency === true || job.type === HARMONICS_911_TYPE;

      return {
        ...job,
        band: hint.band || job.band || "symbolic",
        dnaTag: hint.dnaTag || job.dnaTag || null,
        advantageScore:
          typeof hint.advantageScore === "number"
            ? hint.advantageScore
            : job.advantageScore,
        harmonicsHint: hint,
        hints: {
          ...(job.hints || {}),
          harmonics: true,
          harmonicsEmergency,
          harmonicsMeta: hint
        }
      };
    } catch (err) {
      if (trace) console.error("[PulseCompass-v31] harmonicsWorker.plan failed:", err);
      return job;
    }
  }

  // NEW: WiFi enrichment — packet pacing + hints
  function enrichJobViaWifiWorker(job) {
    if (!wifiWorker || typeof wifiWorker.submit !== "function") return job;

    try {
      const wifiJob = {
        lane: job.lane || "downlink",
        jobId: job.jobId || job.id || null,
        jobType: job.type || job.jobType || WIFI_PACKET_TYPE,
        band: job.band || "packet",
        intent: job.intent || null,
        advantageScore:
          typeof job.advantageScore === "number" ? job.advantageScore : 0.5,
        payload: job.payload || {},
        hints: job.hints || {}
      };

      const hint = wifiWorker.submit(wifiJob);

      if (hint && Reporter && typeof Reporter.recordWifiHint === "function") {
        Reporter.recordWifiHint({ job, hint });
      }

      if (!hint || typeof hint !== "object") return job;

      const pacingWindowMs = hint.wifi?.pacingWindowMs ?? null;
      const wifiChannelId  = hint.wifi?.channelId || "wifi-0";

      return {
        ...job,
        wifiHint: hint,
        hints: {
          ...(job.hints || {}),
          wifi: true,
          wifiHiccup: wifiJob.jobType === WIFI_HICCUP_TYPE || wifiJob.hints.hiccup === true,
          wifiMeta: hint
        },
        wifiPacingMs: pacingWindowMs,
        wifiChannelId
      };
    } catch (err) {
      if (trace) console.error("[PulseCompass-v31] wifiWorker.submit failed:", err);
      return job;
    }
  }

  function enrichJobViaWorker(job) {
    // GPU/Earn/Pixel shaping
    let enriched = enrichJobViaGpuWorker(job);
    // Harmonics shaping
    enriched = enrichJobViaHarmonicsWorker(enriched);
    // WiFi shaping (packet pacing + hints)
    enriched = enrichJobViaWifiWorker(enriched);
    return enriched;
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API: submit / tick / prewarm / snapshot / diagnostics
  // ---------------------------------------------------------------------------
  async function submit(job = {}) {
    const compassState = readCompassState();
    const healthSnapshot = await computeHealth();
    const enrichedJob = enrichJobViaWorker(job);
    const lane = chooseLane(enrichedJob, healthSnapshot, compassState);
    const laneModule = LANES[lane];

    if (!laneModule || typeof laneModule.submit !== "function") {
      return { ok: false, reason: "LANE_UNAVAILABLE", lane };
    }

    const result = laneModule.submit(enrichedJob);

    writeLastLane(lane);
    writeCompassState({
      lastLane: lane,
      lastTickAt: PulseRealm.PulseNOW,
      lastJobType: enrichedJob.type || null
    });

    await appendLog({
      type: "submit",
      lane,
      jobType: enrichedJob.type || null,
      intent: enrichedJob.intent || null,
      result,
      tickId: null,
      pressure: enrichedJob.pressureSnapshot || null,
      band: enrichedJob.band || "dual",
      dnaTag: enrichedJob.dnaTag || null,
      advantageScore: enrichedJob.advantageScore ?? null,
      harmonics: enrichedJob.hints.harmonics === true || false,
      harmonicsEmergency: enrichedJob.hints.harmonicsEmergency === true || false,
      wifiHint: enrichedJob.wifiHint || null
    });

    return { ok: true, lane, result };
  }

  async function tick() {
    const compassState = readCompassState();
    const healthSnapshot = await computeHealth();
    const lane = readLastLane();
    const laneModule = LANES[lane];

    if (!laneModule || typeof laneModule.tick !== "function") {
      return { ok: false, reason: "LANE_UNAVAILABLE", lane };
    }

    const result = laneModule.tick();

    const tickId = result.metrics.tickId || `${lane}:${PulseRealm.PulseNOW}`;

    writeCompassState({
      lastLane: lane,
      lastTickAt: PulseRealm.PulseNOW,
      lastAdvantage: result.metrics.advantageScore ?? compassState.lastAdvantage,
      lastPressure: result.metrics.artery.pressure ?? compassState.lastPressure,
      lastJobType: result.metrics.jobType || compassState.lastJobType
    });

    await appendLog({
      type: "tick",
      lane,
      tickId,
      patterns: result.metrics.patternsCount || 0,
      pressure: result.metrics.artery.pressure || null,
      load: result.metrics.artery.load || null,
      band: result.metrics.band || "dual",
      dnaTag: result.metrics.dnaTag || null,
      advantageScore: result.metrics.advantageScore ?? null,
      jobType: result.metrics.jobType || null,
      intent: result.metrics.intent || null,
      wifiHint: null
    });

    if (Reporter && typeof Reporter.recordTick === "function") {
      Reporter.recordTick(result);
    }

    // GPU worker tick
    if (worker && typeof worker.tick === "function") {
      try {
        const gpuTick = worker.tick();
        if (Reporter && typeof Reporter.recordGPUTick === "function") {
          Reporter.recordGPUTick(gpuTick);
        }
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] worker.tick (GPU) failed:", err);
      }
    }

    // Harmonics worker tick
    if (harmonicsWorker && typeof harmonicsWorker.tick === "function") {
      try {
        const hTick = harmonicsWorker.tick();
        if (Reporter && typeof Reporter.recordHarmonicsTick === "function") {
          Reporter.recordHarmonicsTick(hTick);
        }
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] harmonicsWorker.tick failed:", err);
      }
    }

    // NEW: WiFi worker tick
    if (wifiWorker && typeof wifiWorker.tick === "function") {
      try {
        const wTick = wifiWorker.tick();
        if (Reporter && typeof Reporter.recordWifiTick === "function") {
          Reporter.recordWifiTick(wTick);
        }
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] wifiWorker.tick failed:", err);
      }
    }

    return { ok: true, lane, result };
  }

  async function prewarm() {
    try {
      await PulseDB.append(MOTION_LOGS_KEY, {
        type: "prewarm",
        ts: PulseRealm.PulseNOW,
        sessionId,
        cosmos: cosmosContext
      });
    } catch (err) {
      if (trace) console.error("[PulseCompass-v31] DB prewarm append failed:", err);
    }

    for (const lane of Object.keys(LANES)) {
      const mod = LANES[lane];
      if (mod && typeof mod.prewarm === "function") {
        try {
          mod.prewarm();
        } catch (err) {
          if (trace) console.error("[PulseCompass-v31] Lane prewarm failed:", lane, err);
        }
      }
    }

    // GPU worker warm
    if (worker && typeof worker.tick === "function") {
      try {
        const gpuTick = worker.tick();
        if (Reporter && typeof Reporter.recordGPUTick === "function") {
          Reporter.recordGPUTick(gpuTick);
        }
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] Worker prewarm/tick (GPU) failed:", err);
      }
    }

    // Harmonics worker warm
    if (harmonicsWorker && typeof harmonicsWorker.tick === "function") {
      try {
        const hTick = harmonicsWorker.tick();
        if (Reporter && typeof Reporter.recordHarmonicsTick === "function") {
          Reporter.recordHarmonicsTick(hTick);
        }
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] HarmonicsWorker prewarm/tick failed:", err);
      }
    }

    // NEW: WiFi worker warm
    if (wifiWorker && typeof wifiWorker.tick === "function") {
      try {
        const wTick = wifiWorker.tick();
        if (Reporter && typeof Reporter.recordWifiTick === "function") {
          Reporter.recordWifiTick(wTick);
        }
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] WifiWorker prewarm/tick failed:", err);
      }
    }

    return { ok: true };
  }

  async function snapshot() {
    const healthSnapshot = await computeHealth();
    const dbSnapshot = PulseDB.snapshot() || null;
    const compassState = readCompassState();

    const engineSnapshots =
      Reporter && typeof Reporter.getEngineSnapshots === "function"
        ? await Reporter.getEngineSnapshots()
        : [];

    if (Reporter && typeof Reporter.recordFullStateSnapshot === "function") {
      try {
        await Reporter.recordFullStateSnapshot({ engineSnapshot: null });
      } catch (err) {
        if (trace) console.error("[PulseCompass-v31] Reporter.recordFullStateSnapshot failed:", err);
      }
    }

    const gpuSnapshot =
      worker && typeof worker.snapshot === "function"
        ? worker.snapshot()
        : null;

    const harmonicsSnapshot =
      harmonicsWorker && typeof harmonicsWorker.snapshot === "function"
        ? harmonicsWorker.snapshot()
        : null;

    const wifiSnapshot =
      wifiWorker && typeof wifiWorker.snapshot === "function"
        ? wifiWorker.snapshot()
        : null;

    return {
      ts: PulseRealm.PulseNOW,
      meta: {
        identity: PulseCompassMeta.id,
        version: PulseCompassMeta.version,
        sessionId
      },
      cosmosContext,
      presenceContext: presenceCtx,
      advantageContext: advantageCtx,
      compassState,
      health: healthSnapshot,
      db: dbSnapshot,
      engineSnapshots,
      gpu: gpuSnapshot,
      harmonics: harmonicsSnapshot,
      wifi: wifiSnapshot
    };
  }

  async function diagnostics() {
    const healthSnapshot = await computeHealth();
    const logs = await readLogs();
    const metrics = PulseDB.getMetrics ? PulseDB.getMetrics() : null;
    const gpuSnapshot =
      worker && typeof worker.snapshot === "function"
        ? worker.snapshot()
        : null;
    const harmonicsSnapshot =
      harmonicsWorker && typeof harmonicsWorker.snapshot === "function"
        ? harmonicsWorker.snapshot()
        : null;
    const wifiSnapshot =
      wifiWorker && typeof wifiWorker.snapshot === "function"
        ? wifiWorker.snapshot()
        : null;

    return {
      ts: PulseRealm.PulseNOW,
      meta: PulseCompassMeta,
      health: healthSnapshot,
      logsCount: logs.length,
      dbMetrics: metrics,
      lastCompassState: readCompassState(),
      gpu: gpuSnapshot,
      harmonics: harmonicsSnapshot,
      wifi: wifiSnapshot
    };
  }

  return Object.freeze({
    submit,
    tick,
    prewarm,
    snapshot,
    diagnostics,
    lanes: LANES,
    worker,          // GPU/Earn/Pixel worker
    harmonicsWorker, // Harmonics worker (911-capable)
    wifiWorker,      // WiFi worker (packet pacing)
    db: PulseDB,
    reporter: Reporter,
    meta: PulseCompassMeta
  });
}

export const PulseWorldCompass = createPulseCompass;

PulseRealm.EngineWorker = {
  PulseWorldCompass,
  createPulseCompass,
  PulseCompassMeta,
  HEALTH_CONFIG,
  LANES
};
