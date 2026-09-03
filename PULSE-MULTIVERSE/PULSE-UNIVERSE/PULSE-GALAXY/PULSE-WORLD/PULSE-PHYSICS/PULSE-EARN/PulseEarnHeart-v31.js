// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-EARN/PulseEarnHeart-v31-Immortal-INTEL-PLUS-GPU-EARN++++.js
// LAYER: THE HEART (v31-Immortal-INTEL-PLUS-GPU-EARN++++)
//        + Dual-Band + Wave + Lanes + Multiverse + EarnEngine + GPU
// TRIPLE HEART 31++ — MOM + DAD + SELF-BEAT + HEARTBEAT-INTEL + LANES + JURY
// + MULTIVERSE + GPU-AWARE + EARN-ENGINE-AWARE (SMART GPU UTILIZATION)
// FULL UPGRADE FROM v30 — EVERY ABILITY PRESERVED + EXTENDED, NO PATCHES.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { computeWork, pulseEarnHeartbeat, getPulseEarnHeartbeatHealingState} from "./PulseEarnHeartbeat-v31.js";

// Optional: core EarnEngine orchestrator (v31, GPU-aware miner)
import { createPulseEarnEngine_v31 as createPulseEarnEngine} from "./PulseEarnEngine-v31.js";
import { getNextMarketplaceJob } from "./PulseEarnNervousSystem-v31.js";
import { executePulseEarnJob } from "./PulseEarnMetabolism-v31.js";
import { submitPulseEarnResult } from "./PulseEarnLymphNodes-v31.js";

// GPU process worker (for Earn GPU routing / hints, v31)
import { PulseGPUProcessWorker, detectDeviceProfile as detectGpuDeviceProfile} from "../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";




export const heartHealing = {
  cycles: 0,
  lastCycleIndex: null,
  lastJob: null,
  lastResult: null,
  lastSubmission: null,
  lastError: null,
  lastExitReason: null,
  lastHeartSignature: null,
  lastJobSignature: null,
  lastResultSignature: null,
  lastSubmissionSignature: null,
  lastBand: "symbolic",
  lastBandSignature: null,
  lastLane: 0,
  lastLaneProfile: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastGpuField: null,
  lastCardiacPresenceProfile: null,
  lastCardiacBinaryProfile: null,
  lastCardiacWaveProfile: null,
  lastMomPulseSurface: null,
  lastDadPulseSurface: null,
  lastSelfPulseSurface: null,
  lastActivePulseSource: "none",
  lastHeartbeatBeat: null,
  lastHeartbeatSpeedField: null,
  lastHeartbeatAdvantageField: null,
  lastHeartbeatPresenceField: null,
  lastHeartbeatExperienceField: null,
  lastHeartbeatCycleSignature: null,
  lastTriHeartLiveness: null,
  lastTriHeartAdvantage: null,
  lastTriHeartSpeed: null,
  lastTriHeartPresence: null,
  lastChunkPlan: null,
  lastCachePlan: null,
  lastPrewarmPlan: null,
  lastSelfBeatCycle: null,
  lastSelfBeatReason: null,
  lastComputeProfile: null,
  lastPulseIntelligence: null,
  lastDeepJobFlag: null,
  lastHeartbeatHealingSnapshot: null,
  lastUniverseTick: 0,
  lastJuryTick: 0,
  lastSymbolicClock: 0,
  lastBinaryClock: 0,
  lastWaveClock: 0,
  lastGpuClock: 0,
  lastPulseEnvelope: null
};

let heartCycle = 0;
let universeTick = 0;
let juryTick = 0;
let symbolicClock = 0;
let binaryClock = 0;
let waveClock = 0;
let gpuClock = 0;

export const EarnGpuWorker =
  ((PulseRealm.PULSE_GPU_PROCESS_WORKER_V31 ||
      PulseRealm.PULSE_GPU_PROCESS_WORKER_V30)) ||
  PulseGPUProcessWorker ||
  null;

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(str, context = {}) {
  const s = String(str || "");
  const band = context.band || "symbolic";
  const tier = context.presenceTier || "idle";
  const cycle = context.cycle || 0;
  let hash = (2166136261 ^ cycle) >>> 0;
  const saltBand = band === "binary" ? 0xB1 : band === "wave" ? 0xB5 : 0xA1;
  const saltTier =
    tier === "critical"
      ? 0xC3
      : tier === "high"
      ? 0xB3
      : tier === "elevated"
      ? 0xA3
      : tier === "soft"
      ? 0x93
      : tier === "overload"
      ? 0xD3
      : tier === "collapse"
      ? 0xE3
      : 0x83;
  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
    hash ^= saltBand;
    hash ^= saltTier;
  }
  const v = hash % 100000;
  return `hi${v}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  if (b === "binary") return "binary";
  if (b === "wave") return "wave";
  if (b === "dual" || b === "dualband") return "dual";
  if (b === "tri" || b === "triband") return "tri";
  return "symbolic";
}

function buildHeartSignature({
  cycle,
  band,
  lane,
  presenceTier,
  meshPressure,
  castleLoad,
  universeTick,
  juryTick,
  gpuLoad = 0,
  gpuMode = "idle"
}) {
  return computeHashIntelligence(
    `HEART31::${cycle}::${band}::LANE:${lane}::PTIER:${presenceTier}::MESH:${meshPressure}::CASTLE:${castleLoad}::GPU:${gpuLoad}::GPUMODE:${gpuMode}::U:${universeTick}::J:${juryTick}`,
    { band, presenceTier, cycle }
  );
}

function buildJobSignature(job) {
  if (!job) return "JOB::NONE";
  return computeHashIntelligence(
    `JOB::${job.id}::${job.marketplace}::${job.type || "generic"}::GPU:${job.gpuMode || "none"}`,
    { band: job.band || "symbolic" }
  );
}

function buildResultSignature(result) {
  if (!result) return "RESULT::NONE";
  return computeHashIntelligence(
    `RESULT::${result.success ? "OK" : "FAIL"}::GPU:${result.gpuUsed ? "Y" : "N"}`,
    {}
  );
}

function buildSubmissionSignature(submission) {
  if (!submission) return "SUBMIT::NONE";
  return computeHashIntelligence(
    `SUBMIT::${submission.success ? "OK" : "FAIL"}::GPU:${submission.gpuUsed ? "Y" : "N"}`,
    {}
  );
}

function buildPresenceField({ job, nervousPresence = {}, globalHints = {} }) {
  const jobMeta = job.meta || {};
  const jobPresence = jobMeta.presenceContext || jobMeta.cardiacPresence || {};
  const ghPresence = globalHints.presenceContext || {};
  const mesh = {
    ...(globalHints.meshSignals || {}),
    ...(jobMeta.meshSignals || {}),
    ...(nervousPresence.meshSignals || {})
  };
  const castle = {
    ...(globalHints.castleSignals || {}),
    ...(jobMeta.castleSignals || {}),
    ...(nervousPresence.castleSignals || {})
  };
  const region = {
    ...(globalHints.regionContext || {}),
    ...(jobMeta.regionContext || {}),
    ...(nervousPresence.regionContext || {})
  };
  return {
    bandPresence:
      jobPresence.bandPresence ||
      ghPresence.bandPresence ||
      nervousPresence.bandPresence ||
      "unknown",
    routerPresence:
      jobPresence.routerPresence ||
      ghPresence.routerPresence ||
      nervousPresence.routerPresence ||
      "unknown",
    devicePresence:
      jobPresence.devicePresence ||
      ghPresence.devicePresence ||
      nervousPresence.devicePresence ||
      "unknown",
    meshPresence: mesh.meshStrength || "unknown",
    castlePresence: castle.castlePresence || "unknown",
    regionPresence: region.regionTag || "unknown",
    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",
    castleLoadLevel: castle.loadLevel || 0,
    meshStrength: mesh.meshStrength || 0,
    meshPressureIndex: mesh.meshPressureIndex || 0
  };
}

function buildAdvantageField({ job, nervousAdvantage = {}, globalHints = {} }) {
  const jobMeta = job.meta || {};
  const jobAdv = jobMeta.advantageContext || {};
  const ghAdv = globalHints.advantageContext || {};
  return {
    advantageScore:
      jobAdv.score ??
      ghAdv.score ??
      nervousAdvantage.score ??
      0,
    advantageBand:
      jobAdv.band ??
      ghAdv.band ??
      nervousAdvantage.band ??
      "neutral",
    advantageTier:
      jobAdv.tier ??
      ghAdv.tier ??
      nervousAdvantage.tier ??
      0
  };
}

function buildHintsField({ job, nervousHints = {}, globalHints = {} }) {
  const jobMeta = job.meta || {};
  const jobHints = jobMeta.hintsContext || {};
  return {
    fallbackBandLevel:
      jobHints.fallbackBandLevel ??
      globalHints.fallbackBandLevel ??
      nervousHints.fallbackBandLevel ??
      0,
    chunkHints: {
      ...(globalHints.chunkHints || {}),
      ...(jobHints.chunkHints || {}),
      ...(nervousHints.chunkHints || {})
    },
    cacheHints: {
      ...(globalHints.cacheHints || {}),
      ...(jobHints.cacheHints || {}),
      ...(nervousHints.cacheHints || {})
    },
    prewarmHints: {
      ...(globalHints.prewarmHints || {}),
      ...(jobHints.prewarmHints || {}),
      ...(nervousHints.prewarmHints || {})
    },
    coldStartHints: {
      ...(globalHints.coldStartHints || {}),
      ...(jobHints.coldStartHints || {}),
      ...(nervousHints.coldStartHints || {})
    },
    gpuHints: {
      ...(globalHints.gpuHints || {}),
      ...(jobHints.gpuHints || {}),
      ...(nervousHints.gpuHints || {})
    }
  };
}

function buildGpuField({ job, hintsField = {} }) {
  const gpuHints = hintsField.gpuHints || {};
  const jobMeta = job.meta || {};
  const jobGpu = jobMeta.gpuContext || {};
  const mode =
    jobGpu.mode ||
    gpuHints.mode ||
    job.gpuMode ||
    "auto";
  const priority =
    jobGpu.priority ||
    gpuHints.priority ||
    "normal";
  const cacheLevel =
    jobGpu.cacheLevel ||
    gpuHints.cacheLevel ||
    0;
  return {
    gpuEnabled: !!EarnGpuWorker,
    gpuMode: mode,
    gpuPriority: priority,
    gpuCacheLevel: cacheLevel
  };
}

function classifyPresenceTier(presenceField) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle;
  if (pressure >= 220) return "overload";
  if (pressure >= 180) return "collapse";
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

const MOM_PULSE_KEY = "PulseProxyHeartbeatLastBeatAt";
const DAD_PULSE_KEY = "PulseAIHeartbeatLastBeatAt";

function buildMomPulseSurface() {
  let last = 0;
  try {
    last = globalThis[MOM_PULSE_KEY] || 0;
  } catch (_) {
    last = 0;
  }
  const alive = !!last;
  return {
    momPulseAlive: alive,
    momPulseLastBeatAt: last,
    momPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildDadPulseSurface() {
  let last = 0;
  try {
    last = globalThis[DAD_PULSE_KEY] || 0;
  } catch (_) {
    last = 0;
  }
  const alive = !!last;
  return {
    dadPulseAlive: alive,
    dadPulseLastBeatAt: last,
    dadPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildSelfPulseSurface(workerId, band, presenceTier) {
  const wid = String(workerId || "0");
  let acc = 0;
  for (let i = 0; i < wid.length; i++) {
    acc += wid.charCodeAt(i) * (i + 1);
  }
  const tierWeight =
    presenceTier === "critical"
      ? 5
      : presenceTier === "high"
      ? 4
      : presenceTier === "elevated"
      ? 3
      : presenceTier === "soft"
      ? 2
      : presenceTier === "overload"
      ? 6
      : presenceTier === "collapse"
      ? 7
      : 1;
  const bandWeight =
    band === "binary"
      ? 7
      : band === "wave"
      ? 5
      : band === "dual"
      ? 9
      : band === "tri"
      ? 11
      : 3;
  const beatIndex = (heartCycle * tierWeight + acc + bandWeight) % 17;
  const selfBeatActive = beatIndex === 0;
  return {
    selfPulseAlive: true,
    selfPulseBeatIndex: beatIndex,
    selfPulseActive: selfBeatActive,
    selfPulseFallbackState: selfBeatActive ? "self-beat" : "idle"
  };
}

function selectActivePulseSource(
  momPulseSurface,
  dadPulseSurface,
  selfPulseSurface
) {
  if (momPulseSurface.momPulseAlive) return "mom";
  if (dadPulseSurface.dadPulseAlive) return "dad";
  if (selfPulseSurface.selfPulseActive) return "self";
  return "self";
}

function buildChunkPlan(hintsField, job) {
  const hints = hintsField.chunkHints || {};
  const enabled = Object.keys(hints).length > 0;
  return {
    enabled,
    strategy: hints.strategy || "default",
    target: hints.target || "job",
    key: hints.key || job.id || "unknown-job"
  };
}

function buildCachePlan(hintsField, job) {
  const hints = hintsField.cacheHints || {};
  const enabled = Object.keys(hints).length > 0;
  return {
    enabled,
    strategy: hints.strategy || "default",
    scope: hints.scope || "session",
    key: hints.key || job.id || "unknown-job"
  };
}

function buildPrewarmPlan(hintsField, job) {
  const hints = hintsField.prewarmHints || {};
  const enabled = Object.keys(hints).length > 0;
  return {
    enabled,
    strategy: hints.strategy || "default",
    band: hints.band || (job.band || job.meta.band || "symbolic")
  };
}

function buildComputeProfile(job, presenceField, advantageField, heartbeatBeat) {
  const payout = Number(job.payout || 0);
  const cpu = Number(job.cpuRequired || 0);
  const mem = Number(job.memoryRequired || 0);
  const est = Number(job.estimatedSeconds || 0);
  const baseWeight = cpu * 0.4 + mem * 0.3 + est * 0.3;
  const pressure =
    (presenceField.meshPressureIndex || 0) +
    (presenceField.castleLoadLevel || 0);
  const heartbeatLoad = heartbeatBeat.speedField.speedScore || 0;
  const heartbeatAdvTier = heartbeatBeat.advantageField.advantageTier || 0;
  const weight = baseWeight + heartbeatLoad * 50 + heartbeatAdvTier * 10;
  let computeTier = "light";
  if (weight >= 220 || pressure >= 160) computeTier = "heavy";
  else if (weight >= 90 || pressure >= 90) computeTier = "medium";
  const deepJob =
    computeTier === "heavy" ||
    (heartbeatBeat.experienceField.load || 0) >= 0.8;
  return {
    computeVersion: "v31-Immortal-INTEL-PLUS",
    weight,
    computeTier,
    payout,
    cpu,
    mem,
    est,
    pressure,
    advantageTier: advantageField.advantageTier || 0,
    deepJob
  };
}

function buildPulseIntelligence(
  job,
  computeProfile,
  advantageField,
  presenceTier,
  band
) {
  const solvednessScore = Math.max(
    0,
    Math.min(1, (computeProfile.weight || 0) / 550)
  );
  const readinessScore = Math.max(
    0,
    Math.min(1, 1 - solvednessScore * 0.5)
  );
  const factoringSignal =
    computeProfile.computeTier === "heavy"
      ? "deep-job"
      : computeProfile.computeTier === "medium"
      ? "balanced"
      : "light";
  return {
    pulseIntelligenceVersion: "v31-Immortal-INTEL-PLUS",
    solvednessScore,
    readinessScore,
    factoringSignal,
    advantageTier: advantageField.advantageTier || 0,
    bandPreference: band,
    presenceTier
  };
}

function chooseLane(presenceTier, advantageTier, computeTier) {
  const tierMap = {
    idle: 0,
    soft: 1,
    elevated: 2,
    high: 3,
    critical: 4,
    overload: 5,
    collapse: 6
  };
  const presenceScore = tierMap[presenceTier] ?? 0;
  const advScore = Number(advantageTier || 0);
  const computeScore =
    computeTier === "heavy" ? 3 : computeTier === "medium" ? 2 : 1;
  const raw = presenceScore * 8 + advScore * 2 + computeScore;
  return raw % 64;
}

function buildPulseEnvelope({
  cycle,
  band,
  lane,
  presenceTier,
  presenceField,
  advantageField,
  computeProfile,
  pulseIntelligence,
  gpuField,
  universeTick,
  juryTick,
  activePulseSource
}) {
  return {
    pulseVersion: "v31-Immortal-INTEL-PLUS-GPU-EARN++++",
    cycle,
    band,
    lane,
    presenceTier,
    presenceField,
    advantageField,
    computeProfile,
    pulseIntelligence,
    gpuField,
    universeTick,
    juryTick,
    activePulseSource
  };
}

// Smart GPU planning: use GPU for deep jobs when pressure allows, never overload.
function maybePlanGpuForJob({
  job,
  lane,
  band,
  presenceTier,
  computeProfile,
  hintsField,
  gpuField
}) {
  if (!EarnGpuWorker || typeof EarnGpuWorker.prepareEarnJob !== "function") {
    return { hintsField, gpuField };
  }

  // If system is already overloaded/collapsing, avoid extra GPU pressure.
  if (presenceTier === "overload" || presenceTier === "collapse") {
    return {
      hintsField: {
        ...hintsField,
        gpuHints: {
          ...(hintsField.gpuHints || {}),
          mode: "conserve",
          priority: "low"
        }
      },
      gpuField: {
        ...gpuField,
        gpuMode: "conserve",
        gpuPriority: "low"
      }
    };
  }

  // Only consider GPU for meaningful work (deep or medium jobs).
  if (!computeProfile.deepJob && computeProfile.computeTier === "light") {
    return { hintsField, gpuField };
  }

  try {
    const hint = EarnGpuWorker.prepareEarnJob(
      {
        id: job.id,
        type: job.type || "EARN_TASK",
        marketplace: job.marketplace,
        band,
        lane,
        payload: job,
        meta: job.meta || {}
      },
      {
        lane,
        band,
        presenceTier,
        computeTier: computeProfile.computeTier,
        weight: computeProfile.weight
      }
    );

    if (!hint || typeof hint !== "object") {
      return { hintsField, gpuField };
    }

    const nextGpuHints = {
      ...(hintsField.gpuHints || {}),
      ...hint
    };

    const nextGpuField = {
      ...gpuField,
      gpuMode: hint.mode || gpuField.gpuMode || "assist",
      gpuPriority: hint.priority || gpuField.gpuPriority || "normal",
      gpuCacheLevel:
        typeof hint.cacheLevel === "number"
          ? hint.cacheLevel
          : gpuField.gpuCacheLevel
    };

    return {
      hintsField: {
        ...hintsField,
        gpuHints: nextGpuHints
      },
      gpuField: nextGpuField
    };
  } catch (_) {
    return { hintsField, gpuField };
  }
}

export function getPulseEarnHeartHealingState_v31() {
  return { ...heartHealing };
}

export function createPulseEarnHeart({
  pulseSendSystem,
  earnEngine, // <- EarnEngine instance (preferred, v31 miner)
  autoCreateEarnEngine = false,
  earnEngineOptions = {},
  log = console.log
} = {}) {
  // Optional auto-creation of EarnEngine if not provided
  let EarnEngine = earnEngine || null;
  if (!EarnEngine && autoCreateEarnEngine && typeof createPulseEarnEngine === "function") {
    EarnEngine = createPulseEarnEngine(earnEngineOptions);
  }

  const heart = {
    cycle(workerId, engineRef = {}, globalHints = {}) {
      heartCycle++;
      universeTick++;
      juryTick++;
      symbolicClock++;
      binaryClock += 1;
      waveClock = (waveClock + 3) % 1024;
      gpuClock = (gpuClock + 5) % 2048;

      heartHealing.cycles++;
      heartHealing.lastCycleIndex = heartCycle;
      heartHealing.lastUniverseTick = universeTick;
      heartHealing.lastJuryTick = juryTick;
      heartHealing.lastSymbolicClock = symbolicClock;
      heartHealing.lastBinaryClock = binaryClock;
      heartHealing.lastWaveClock = waveClock;
      heartHealing.lastGpuClock = gpuClock;

      const runningFlag =
        engineRef.forceRun === true ? true : engineRef.running !== false;
      if (!runningFlag) {
        heartHealing.lastExitReason = "engine_not_running";
        return null;
      }

      try {
        const momPulseSurface = buildMomPulseSurface();
        const dadPulseSurface = buildDadPulseSurface();

        const nervousPresence = engineRef.presenceContext || {};
        const nervousAdvantage = engineRef.advantageContext || {};
        const nervousHints = engineRef.hintsContext || {};

        const tempPresenceField = {
          meshPressureIndex: nervousPresence.meshPressureIndex || 0,
          castleLoadLevel: nervousPresence.castleLoadLevel || 0
        };
        const tempPresenceTier = classifyPresenceTier(tempPresenceField);
        const tempBand = normalizeBand(engineRef.band || "symbolic");

        const selfPulseSurface = buildSelfPulseSurface(
          workerId,
          tempBand,
          tempPresenceTier
        );

        let activePulseSource = selectActivePulseSource(
          momPulseSurface,
          dadPulseSurface,
          selfPulseSurface
        );

        heartHealing.lastMomPulseSurface = momPulseSurface;
        heartHealing.lastDadPulseSurface = dadPulseSurface;
        heartHealing.lastSelfPulseSurface = selfPulseSurface;
        heartHealing.lastActivePulseSource = activePulseSource;

        if (activePulseSource === "self") {
          heartHealing.lastSelfBeatCycle = heartCycle;
          heartHealing.lastSelfBeatReason = "parents_silent_or_inactive";
        }

        const heartbeatBeat = pulseEarnHeartbeat({
          workerId,
          band: tempBand,
          presenceTier: tempPresenceTier,
          globalHints,
          nervousPresence,
          nervousAdvantage,
          nervousHints
        });

        if (heartbeatBeat) {
          heartHealing.lastHeartbeatBeat = heartbeatBeat;
          heartHealing.lastHeartbeatSpeedField = heartbeatBeat.speedField || null;
          heartHealing.lastHeartbeatAdvantageField =
            heartbeatBeat.advantageField || null;
          heartHealing.lastHeartbeatPresenceField =
            heartbeatBeat.presenceField || null;
          heartHealing.lastHeartbeatExperienceField =
            heartbeatBeat.experienceField || null;
          heartHealing.lastHeartbeatCycleSignature =
            heartbeatBeat.cycleSignature || null;
          heartHealing.lastTriHeartLiveness =
            heartbeatBeat.triHeartLiveness || null;
          heartHealing.lastTriHeartAdvantage =
            heartbeatBeat.triHeartAdvantage || null;
          heartHealing.lastTriHeartSpeed =
            heartbeatBeat.triHeartSpeed || null;
          heartHealing.lastTriHeartPresence =
            heartbeatBeat.triHeartPresence || null;
          heartHealing.lastHeartbeatHealingSnapshot =
            getPulseEarnHeartbeatHealingState
              ? getPulseEarnHeartbeatHealingState()
              : null;
        }

        const job = getNextMarketplaceJob(workerId);
        if (!job) {
          heartHealing.lastExitReason = "no_job";
          return null;
        }

        heartHealing.lastJob = job;
        heartHealing.lastJobSignature = buildJobSignature(job);

        const band = normalizeBand(job.band || job.meta.band || "symbolic");
        heartHealing.lastBand = band;
        heartHealing.lastBandSignature = computeHashIntelligence(
          `BAND31::${band}`,
          { band, cycle: heartCycle }
        );

        const presenceField = buildPresenceField({
          job,
          nervousPresence,
          globalHints
        });
        const advantageField = buildAdvantageField({
          job,
          nervousAdvantage,
          globalHints
        });
        let hintsField = buildHintsField({
          job,
          nervousHints,
          globalHints
        });
        let gpuField = buildGpuField({ job, hintsField });

        heartHealing.lastPresenceField = presenceField;
        heartHealing.lastAdvantageField = advantageField;
        heartHealing.lastHintsField = hintsField;
        heartHealing.lastGpuField = gpuField;

        const presenceTier = classifyPresenceTier(presenceField);

        const jobIdLength = (job.id || "").length;
        const marketplaceLength = (job.marketplace || "").length;
        const binarySurfaceValue =
          jobIdLength +
          marketplaceLength +
          heartCycle +
          (presenceField.meshPressureIndex || 0) +
          (presenceField.castleLoadLevel || 0);

        const binaryField = {
          binaryHeartSignature: computeHashIntelligence(
            `BHEART31::${binarySurfaceValue}`,
            { band, presenceTier, cycle: heartCycle }
          ),
          binarySurfaceSignature: computeHashIntelligence(
            `BSURF_HEART31::${binarySurfaceValue}`,
            { band, presenceTier, cycle: heartCycle }
          ),
          binarySurface: {
            jobIdLength,
            marketplaceLength,
            cycle: heartCycle,
            meshPressureIndex: presenceField.meshPressureIndex,
            castleLoadLevel: presenceField.castleLoadLevel,
            surface: binarySurfaceValue
          },
          parity: binarySurfaceValue % 2 === 0 ? 0 : 1,
          density: jobIdLength,
          shiftDepth: Math.max(
            0,
            Math.floor(Math.log2(binarySurfaceValue || 1))
          )
        };
        heartHealing.lastBinaryField = binaryField;

        const waveField = {
          amplitude: jobIdLength + (presenceField.meshStrength || 0),
          wavelength: heartCycle,
          phase:
            (jobIdLength +
              heartCycle +
              (presenceField.meshPressureIndex || 0)) % 16,
          band,
          mode:
            band === "binary"
              ? "compression-wave"
              : band === "wave"
              ? "wave-field"
              : band === "dual"
              ? "dual-band-wave"
              : band === "tri"
              ? "tri-band-wave"
              : "symbolic-wave"
        };
        heartHealing.lastWaveField = waveField;

        const chunkPlan = buildChunkPlan(hintsField, job);
        const cachePlan = buildCachePlan(hintsField, job);
        const prewarmPlan = buildPrewarmPlan(hintsField, job);

        heartHealing.lastChunkPlan = chunkPlan;
        heartHealing.lastCachePlan = cachePlan;
        heartHealing.lastPrewarmPlan = prewarmPlan;

        const computeProfile = buildComputeProfile(
          job,
          presenceField,
          advantageField,
          heartbeatBeat
        );
        const pulseIntelligence = buildPulseIntelligence(
          job,
          computeProfile,
          advantageField,
          presenceTier,
          band
        );

        heartHealing.lastComputeProfile = computeProfile;
        heartHealing.lastPulseIntelligence = pulseIntelligence;
        heartHealing.lastDeepJobFlag = !!computeProfile.deepJob;

        const lane = chooseLane(
          presenceTier,
          advantageField.advantageTier || 0,
          computeProfile.computeTier
        );
        heartHealing.lastLane = lane;
        heartHealing.lastLaneProfile = {
          lane,
          presenceTier,
          computeTier: computeProfile.computeTier,
          advantageTier: advantageField.advantageTier || 0
        };

        // Smart GPU planning (after lane selection, before compute)
        const gpuPlanned = maybePlanGpuForJob({
          job,
          lane,
          band,
          presenceTier,
          computeProfile,
          hintsField,
          gpuField
        });
        hintsField = gpuPlanned.hintsField;
        gpuField = gpuPlanned.gpuField;

        heartHealing.lastHintsField = hintsField;
        heartHealing.lastGpuField = gpuField;

        if (pulseSendSystem) {
          try {
            if (
              prewarmPlan.enabled &&
              typeof pulseSendSystem.prewarm === "function"
            ) {
              pulseSendSystem.prewarm(
                job,
                prewarmPlan,
                computeProfile,
                pulseIntelligence
              );
            }
            if (
              chunkPlan.enabled &&
              typeof pulseSendSystem.chunk === "function"
            ) {
              pulseSendSystem.chunk(
                job,
                chunkPlan,
                computeProfile,
                pulseIntelligence
              );
            }
            if (
              cachePlan.enabled &&
              typeof pulseSendSystem.cache === "function"
            ) {
              pulseSendSystem.cache(
                job,
                cachePlan,
                computeProfile,
                pulseIntelligence
              );
            }
          } catch (_) {}
        }

        const cardiacPresenceProfile = {
          presenceTier,
          band,
          lane,
          meshPressureIndex: presenceField.meshPressureIndex,
          castleLoadLevel: presenceField.castleLoadLevel,
          advantageTier: advantageField.advantageTier,
          fallbackBandLevel: hintsField.fallbackBandLevel,
          activePulseSource,
          heartbeatPresenceTier:
            heartHealing.lastHeartbeatPresenceField.presenceTier || null
        };
        const cardiacBinaryProfile = {
          binaryField,
          presenceTier,
          lane,
          heartbeatSpeedScore:
            heartHealing.lastHeartbeatSpeedField.speedScore || null
        };
        const cardiacWaveProfile = {
          waveField,
          presenceTier,
          lane,
          heartbeatExperienceLoad:
            heartHealing.lastHeartbeatExperienceField.load || null
        };

        heartHealing.lastCardiacPresenceProfile = cardiacPresenceProfile;
        heartHealing.lastCardiacBinaryProfile = cardiacBinaryProfile;
        heartHealing.lastCardiacWaveProfile = cardiacWaveProfile;

        const pulseEnvelope = buildPulseEnvelope({
          cycle: heartCycle,
          band,
          lane,
          presenceTier,
          presenceField,
          advantageField,
          computeProfile,
          pulseIntelligence,
          gpuField,
          universeTick,
          juryTick,
          activePulseSource
        });
        heartHealing.lastPulseEnvelope = pulseEnvelope;

        // ============================================================
        // EARN ENGINE INTEGRATION (PRIMARY) + METABOLISM FALLBACK
        // v31: EarnEngine may be a miner; if it exposes submitJob, we use it
        // as a smart orchestrator that can also leverage GPU-aware policies.
        // ============================================================
        let result;

        if (EarnEngine && typeof EarnEngine.submitJob === "function") {
          result = EarnEngine.submitJob(job, {
            workerId,
            band,
            lane,
            presenceField,
            advantageField,
            hintsField,
            gpuField,
            computeProfile,
            pulseIntelligence,
            heartbeatBeat: heartHealing.lastHeartbeatBeat,
            pulseEnvelope
          });
        } else if (
          pulseSendSystem &&
          typeof pulseSendSystem.compute === "function"
        ) {
          const workProfile = computeWork
            ? computeWork(job, {
                band,
                presenceField,
                advantageField,
                hintsField,
                heartbeatBeat,
                computeProfile,
                lane,
                gpuField,
                pulseEnvelope
              })
            : null;
          result = pulseSendSystem.compute(job, {
            band,
            lane,
            presenceField,
            advantageField,
            hintsField,
            chunkPlan,
            cachePlan,
            prewarmPlan,
            activePulseSource,
            computeProfile,
            pulseIntelligence,
            gpuField,
            heartbeatBeat: heartHealing.lastHeartbeatBeat,
            workProfile,
            pulseEnvelope
          });
        } else {
          result = executePulseEarnJob(job);
        }

        heartHealing.lastResult = result;
        heartHealing.lastResultSignature = buildResultSignature(result);

        // ============================================================
        // EARN ENGINE SUBMISSION (PRIMARY) + LYMPH NODES FALLBACK
        // ============================================================
        let submission;
        if (EarnEngine && typeof EarnEngine.submitResult === "function") {
          submission = EarnEngine.submitResult(job, result, {
            workerId,
            band,
            lane,
            gpuField,
            pulseEnvelope
          });
        } else {
          submission = submitPulseEarnResult(job, result);
        }

        heartHealing.lastSubmission = submission;
        heartHealing.lastSubmissionSignature =
          buildSubmissionSignature(submission);

        const heartSignature = buildHeartSignature({
          cycle: heartCycle,
          band,
          lane,
          presenceTier,
          meshPressure: presenceField.meshPressureIndex || 0,
          castleLoad: presenceField.castleLoadLevel || 0,
          universeTick,
          juryTick,
          gpuLoad: gpuField.gpuCacheLevel || 0,
          gpuMode: gpuField.gpuMode || "idle"
        });

        heartHealing.lastHeartSignature = heartSignature;
        heartHealing.lastExitReason = null;

        return {
          ok: true,
          workerId,
          job,
          result,
          submission,
          band,
          lane,
          presenceTier,
          computeProfile,
          pulseIntelligence,
          gpuField,
          pulseEnvelope,
          heartSignature
        };
      } catch (err) {
        const msg = String(err && err.message ? err.message : err);
        heartHealing.lastError = msg;
        heartHealing.lastExitReason = "heart_error";
        log && log("[PulseEarnHeart-v31] Heart cycle error:", msg);
        return null;
      }
    }
  };

  return heart;
}

PulseRealm.EarnHeart = {
  createPulseEarnHeart,
  getPulseEarnHeartHealingState_v31,
  heartHealing,
  EarnGpuWorker
}