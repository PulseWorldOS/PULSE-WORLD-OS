// ============================================================================
// PulseEngineHarmonicProcessWorker-v34.js
// PURE HARMONICS — NO GPU — PHONE-SAFE — PACING ENGINE
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// HARMONIC JOB TYPES
// ============================================================================
const HARMONIC_PING_TYPE       = "HARMONIC_PING";
const HARMONIC_PATTERN_TYPE    = "HARMONIC_PATTERN";
const HARMONIC_ESCALATE_TYPE   = "HARMONIC_ESCALATE";
const HARMONIC_SOFT_TYPE       = "HARMONIC_SOFT";
const HARMONIC_ALERT_TYPE      = "HARMONIC_ALERT";
const HARMONIC_SYSTEM_TYPE     = "HARMONIC_SYSTEM";

// ============================================================================
// META
// ============================================================================
export const PulseHarmonicProcessWorkerMeta = Object.freeze({
  id: "PulseHarmonicProcessWorker-v34-Immortal++++",
  version: "34.0-Immortal++++",
  harmonic: true,
  gpu: false,
  pixel: false,
  bands: ["symbolic"],
  lanes: ["forward", "backward"],
  roles: [
    "harmonic-escalation",
    "phone-pacing",
    "vocal-earn",
    "system-alerts",
    "user-alerts",
    "snapshot"
  ]
});

// ============================================================================
// DEVICE CAPABILITY DETECTION (HARMONICS ONLY)
// ============================================================================
function detectAudioScore() {
  try {
    const hasAudio =
      typeof AudioContext !== "undefined" ||
      typeof webkitAudioContext !== "undefined";
    return hasAudio ? 9000 : 2000;
  } catch {
    return 1000;
  }
}

function detectHapticScore() {
  try {
    return navigator.vibrate ? 4000 : 1500;
  } catch {
    return 1500;
  }
}

function detectCpuScore() {
  try {
    return (navigator.hardwareConcurrency || 4) * 250;
  } catch {
    return 1000;
  }
}

function detectMemoryScore() {
  try {
    return (navigator.deviceMemory || 4) * 300;
  } catch {
    return 1000;
  }
}

function detectStability() {
  try {
    const uptime = performance.now() || 1000;
    return Math.min(1, uptime / (1000 * 60 * 60));
  } catch {
    return 0.5;
  }
}

function classifyTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 6000) return "elite";
  if (score >= 3000) return "high";
  if (score >= 1500) return "medium";
  return "low";
}

export function detectDeviceProfile() {
  const audioScore = detectAudioScore();
  const hapticScore = detectHapticScore();
  const cpuScore = detectCpuScore();
  const memScore = detectMemoryScore();
  const stability = detectStability();

  const capabilityScore =
    audioScore * 0.5 +
    hapticScore * 0.25 +
    cpuScore * 0.15 +
    memScore * 0.05 +
    stability * 0.05;

  const capabilityTier = classifyTier(capabilityScore);

  const profile = {
    audioScore,
    hapticScore,
    cpuScore,
    memScore,
    stability,
    capabilityScore,
    capabilityTier
  };

  try {
    PulseRealm.PULSE_DEVICE_PROFILE = profile;
  } catch {}

  return profile;
}

// ============================================================================
// ENGINE BLOCK — HARMONICS ONLY
// ============================================================================
function createEngineBlock({
  harmonicMode = "dual",
  harmonicChannels = ["harmonic-0", "harmonic-1"],
  trace = false,
  lane = "forward",
  role = "harmonic-process-worker",
  presenceContext = {},
  advantageContext = {},
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  }
} = {}) {
  const capabilityProfile = detectDeviceProfile();

  const state = {
    harmonicMode,
    harmonicChannels:
      Array.isArray(harmonicChannels) && harmonicChannels.length
        ? harmonicChannels.slice()
        : ["harmonic-0"],
    ticks: 0,
    jobsRouted: 0,
    lastLane: null,
    lastChannelId: null,
    lastJobType: null,
    lastAdvantageScore: 0,
    lastBand: "symbolic",
    lane,
    role,
    presenceContext,
    advantageContext,
    cosmosContext,
    capabilityProfile
  };

  function pickChannel(job) {
    const ids = state.harmonicChannels;
    if (!ids.length) return "harmonic-0";

    if (state.harmonicMode === "single") return ids[0];
    if (state.harmonicMode === "mirror") return ids[0];

    if (job.lane === "backward" && ids.length > 1) return ids[1];

    const idx = state.jobsRouted % ids.length;
    return ids[idx];
  }

  function classifyJob(job) {
    const type = job.type || job.jobType || "";
    const lane = job.lane || state.lane || "forward";

    const isHarmonic =
      type === HARMONIC_PING_TYPE ||
      type === HARMONIC_PATTERN_TYPE ||
      type === HARMONIC_ESCALATE_TYPE ||
      type === HARMONIC_SOFT_TYPE ||
      type === HARMONIC_ALERT_TYPE ||
      type === HARMONIC_SYSTEM_TYPE ||
      type.startsWith("HARMONIC_") ||
      type.startsWith("VOCAL_");

    const isEarn = type.startsWith("EARN_");
    const isCleanup = type.includes("CLEANUP") || type.includes("SETTLEMENT");

    return {
      type,
      lane,
      isHarmonic,
      isEarn,
      isCleanup
    };
  }

  function buildHint(job, baseAdvantage) {
    const cls = classifyJob(job);
    const channelId = pickChannel(job);

    state.jobsRouted += 1;
    state.lastChannelId = channelId;
    state.lastLane = cls.lane;
    state.lastJobType = cls.type || null;
    state.lastBand = job.band || "symbolic";

    let advantageBoost = 0;

    if (cls.isHarmonic) advantageBoost += 0.25;
    if (cls.isEarn) advantageBoost += 0.1;
    if (cls.isCleanup) advantageBoost += 0.05;

    const tier = state.capabilityProfile.capabilityTier;
    if (tier === "immortal") advantageBoost += 0.08;
    else if (tier === "elite") advantageBoost += 0.05;

    const finalAdvantage = Math.max(
      0,
      Math.min(1, (baseAdvantage ?? 0.5) + advantageBoost)
    );

    state.lastAdvantageScore = finalAdvantage;

    const hint = {
      ts: PulseRealm.PulseNOW,
      meta: {
        workerId: PulseHarmonicProcessWorkerMeta.id,
        version: PulseHarmonicProcessWorkerMeta.version,
        lane: cls.lane,
        role: state.role
      },
      harmonic: {
        channelId,
        harmonicMode: state.harmonicMode,
        harmonicChannels: state.harmonicChannels.slice()
      },
      lane: cls.lane,
      band: "symbolic",
      jobType: cls.type,
      intent: job.intent || null,
      advantageScore: finalAdvantage,
      presenceContext: state.presenceContext,
      advantageContext: state.advantageContext,
      cosmosContext: state.cosmosContext,
      capabilityProfile: state.capabilityProfile,
      suggestions: ["route:harmonic-primary"]
    };

    if (trace) console.log("[PulseHarmonicProcessWorker-v34] hint:", hint);

    return hint;
  }

  function tick() {
    state.ticks += 1;
    return {
      ok: true,
      ticks: state.ticks,
      harmonicMode: state.harmonicMode,
      harmonicChannels: state.harmonicChannels.slice(),
      capabilityProfile: state.capabilityProfile
    };
  }

  function snapshot() {
    return Object.freeze({
      meta: PulseHarmonicProcessWorkerMeta,
      ticks: state.ticks,
      jobsRouted: state.jobsRouted,
      lastLane: state.lastLane,
      lastChannelId: state.lastChannelId,
      lastJobType: state.lastJobType,
      lastAdvantageScore: state.lastAdvantageScore,
      lastBand: state.lastBand,
      harmonicMode: state.harmonicMode,
      harmonicChannels: state.harmonicChannels.slice(),
      lane: state.lane,
      role: state.role,
      presenceContext: state.presenceContext,
      advantageContext: state.advantageContext,
      cosmosContext: state.cosmosContext,
      capabilityProfile: state.capabilityProfile
    });
  }

  return { buildHint, tick, snapshot };
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
      intent: null,
      advantageScore: 0.5,
      payload: {},
      hints: {}
    };
  }

  return {
    lane: job.lane || defaultLane,
    jobId: job.jobId || job.id || "unknown",
    jobType: job.jobType || job.type || "UNKNOWN",
    band: "symbolic",
    intent: job.intent || null,
    advantageScore:
      typeof job.advantageScore === "number"
        ? job.advantageScore
        : 0.5,
    payload: job.payload || {},
    hints: job.hints || {}
  };
}

// ============================================================================
// PUBLIC INTERFACE — HARMONICS ONLY
// ============================================================================
export function createPulseHarmonicProcessWorker(opts = {}) {
  const engineBlock = createEngineBlock(opts);

  function hintFor(job) {
    const j = normalizeIncomingJob(job, opts.lane || "forward");
    return engineBlock.buildHint(j, j.advantageScore);
  }

  return Object.freeze({
    meta: PulseHarmonicProcessWorkerMeta,
    submit: hintFor,
    plan: hintFor,
    prepareJob: hintFor,
    prepareForwardJob: (job) => hintFor({ ...job, lane: "forward" }),
    prepareBackwardJob: (job) => hintFor({ ...job, lane: "backward" }),
    prepareHarmonicJob: (job) => hintFor({ ...job, type: HARMONIC_PING_TYPE }),
    prepareEscalationJob: (job) => hintFor({ ...job, type: HARMONIC_ESCALATE_TYPE }),
    tick: engineBlock.tick,
    snapshot: engineBlock.snapshot,
    detectDeviceProfile
  });
}

// ============================================================================
// DEFAULT EXPORT — IMMORTAL INSTANCE
// ============================================================================
export const PulseHarmonicProcessWorker = createPulseHarmonicProcessWorker({
  harmonicMode: "dual",
  harmonicChannels: ["harmonic-0", "harmonic-1"],
  trace: false,
  lane: "forward",
  role: "harmonic-process-worker-global",
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

export const PulseHarmonicWorker = PulseHarmonicProcessWorker;

PulseRealm.HarmonicsProcessWorker = {
  PulseHarmonicProcessWorker,
  createPulseHarmonicProcessWorker,
  PulseHarmonicProcessWorkerMeta,
  detectDeviceProfile
}