// ============================================================================
// PulseWifiProcessWorker-v1.js
// PURE PACKETS — PHONE-SAFE — WIFI PACING ENGINE
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// WIFI JOB TYPES
// ============================================================================
const WIFI_PING_TYPE        = "WIFI_PING";
const WIFI_PACKET_TYPE      = "WIFI_PACKET";
const WIFI_STREAM_TYPE      = "WIFI_STREAM";
const WIFI_HICCUP_TYPE      = "WIFI_HICCUP";
const WIFI_THROTTLE_TYPE    = "WIFI_THROTTLE";
const WIFI_SYSTEM_TYPE      = "WIFI_SYSTEM";

// ============================================================================
// META
// ============================================================================
export const PulseWifiProcessWorkerMeta = Object.freeze({
  id: "PulseWifiProcessWorker-v1-Immortal++++",
  version: "1.0-Immortal++++",
  wifi: true,
  gpu: false,
  pixel: false,
  bands: ["packet"],
  lanes: ["uplink", "downlink"],
  roles: [
    "wifi-pacing",
    "packet-harmonics",
    "evolution-hiccup",
    "system-stream",
    "identity-stream",
    "snapshot"
  ]
});

// ============================================================================
// DEVICE / NETWORK CAPABILITY DETECTION (PACKETS ONLY)
// ============================================================================
function detectWifiScore() {
  try {
    // crude heuristic: RTT + downlink + effectiveType
    const nav = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!nav) return 2000;

    let score = 2000;

    if (typeof nav.downlink === "number") {
      // Mbps → score
      score += nav.downlink * 300;
    }

    if (typeof nav.rtt === "number") {
      // lower RTT → higher score
      score += Math.max(0, 1500 - nav.rtt * 5);
    }

    if (typeof nav.effectiveType === "string") {
      if (nav.effectiveType.includes("4g")) score += 2000;
      else if (nav.effectiveType.includes("3g")) score += 1000;
      else score += 500;
    }

    return score;
  } catch {
    return 1500;
  }
}

function detectConcurrencyScore() {
  try {
    // how many tabs/devices might be competing
    const cores = navigator.hardwareConcurrency || 4;
    return cores * 200;
  } catch {
    return 800;
  }
}

function detectStabilityScore() {
  try {
    const uptime = performance.now() || 1000;
    // longer uptime → more stable
    const stability = Math.min(1, uptime / (1000 * 60 * 60));
    return 1000 + stability * 2000;
  } catch {
    return 1500;
  }
}

function classifyWifiTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 6000) return "elite";
  if (score >= 3000) return "high";
  if (score >= 1500) return "medium";
  return "low";
}

export function detectWifiProfile() {
  const wifiScore        = detectWifiScore();
  const concurrencyScore = detectConcurrencyScore();
  const stabilityScore   = detectStabilityScore();

  const capabilityScore =
    wifiScore * 0.6 +
    concurrencyScore * 0.2 +
    stabilityScore * 0.2;

  const capabilityTier = classifyWifiTier(capabilityScore);

  const profile = {
    wifiScore,
    concurrencyScore,
    stabilityScore,
    capabilityScore,
    capabilityTier
  };

  try {
    PulseRealm.PULSE_WIFI_PROFILE = profile;
  } catch {}

  return profile;
}

// ============================================================================
// ENGINE BLOCK — PACKETS ONLY
// ============================================================================
function createWifiEngineBlock({
  wifiMode = "dual",
  wifiChannels = ["wifi-0", "wifi-1"],
  trace = false,
  lane = "downlink",
  role = "wifi-process-worker",
  presenceContext = {},
  advantageContext = {},
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  // hooks you will wire into strandedDNA / pulseengine
  strandedDnaHook = null,
  pulseEngineHook = null
} = {}) {
  const wifiProfile = detectWifiProfile();

  const state = {
    wifiMode,
    wifiChannels:
      Array.isArray(wifiChannels) && wifiChannels.length
        ? wifiChannels.slice()
        : ["wifi-0"],
    ticks: 0,
    packetsRouted: 0,
    lastLane: null,
    lastChannelId: null,
    lastJobType: null,
    lastAdvantageScore: 0,
    lastBand: "packet",
    lane,
    role,
    presenceContext,
    advantageContext,
    cosmosContext,
    wifiProfile
  };

  function pickChannel(job) {
    const ids = state.wifiChannels;
    if (!ids.length) return "wifi-0";

    if (state.wifiMode === "single") return ids[0];
    if (state.wifiMode === "mirror") return ids[0];

    if (job.lane === "uplink" && ids.length > 1) return ids[1];

    const idx = state.packetsRouted % ids.length;
    return ids[idx];
  }

  function classifyJob(job) {
    const type = job.type || job.jobType || "";
    const lane = job.lane || state.lane || "downlink";

    const isWifi =
      type === WIFI_PING_TYPE ||
      type === WIFI_PACKET_TYPE ||
      type === WIFI_STREAM_TYPE ||
      type === WIFI_HICCUP_TYPE ||
      type === WIFI_THROTTLE_TYPE ||
      type === WIFI_SYSTEM_TYPE ||
      type.startsWith("WIFI_");

    const isStream = type === WIFI_STREAM_TYPE;
    const isHiccup = type === WIFI_HICCUP_TYPE || job.hiccup === true;

    return {
      type,
      lane,
      isWifi,
      isStream,
      isHiccup
    };
  }

  // core: compute pacing / hiccup for this packet flow
  function buildPacketHint(job, baseAdvantage) {
    const cls = classifyJob(job);
    const channelId = pickChannel(job);

    state.packetsRouted += 1;
    state.lastChannelId = channelId;
    state.lastLane = cls.lane;
    state.lastJobType = cls.type || null;
    state.lastBand = job.band || "packet";

    let advantageBoost = 0;

    if (cls.isWifi) advantageBoost += 0.20;
    if (cls.isStream) advantageBoost += 0.15;
    if (cls.isHiccup) advantageBoost += 0.10; // intentional pacing

    const tier = state.wifiProfile.capabilityTier;
    if (tier === "immortal") advantageBoost += 0.10;
    else if (tier === "elite") advantageBoost += 0.06;

    const finalAdvantage = Math.max(
      0,
      Math.min(1, (baseAdvantage ?? 0.5) + advantageBoost)
    );

    state.lastAdvantageScore = finalAdvantage;

    // compute a pacing window (ms) based on tier + stream/hiccup
    let pacingWindowMs = 25; // default

    if (tier === "immortal") pacingWindowMs = 5;
    else if (tier === "elite") pacingWindowMs = 10;
    else if (tier === "high") pacingWindowMs = 15;
    else if (tier === "medium") pacingWindowMs = 25;
    else pacingWindowMs = 40;

    if (cls.isStream) pacingWindowMs *= 0.8;
    if (cls.isHiccup) pacingWindowMs *= 1.3; // slow slightly to let others breathe

    const hint = {
      ts: PulseRealm.PulseNOW,
      meta: {
        workerId: PulseWifiProcessWorkerMeta.id,
        version: PulseWifiProcessWorkerMeta.version,
        lane: cls.lane,
        role: state.role
      },
      wifi: {
        channelId,
        wifiMode: state.wifiMode,
        wifiChannels: state.wifiChannels.slice(),
        pacingWindowMs
      },
      lane: cls.lane,
      band: "packet",
      jobType: cls.type,
      intent: job.intent || null,
      advantageScore: finalAdvantage,
      presenceContext: state.presenceContext,
      advantageContext: state.advantageContext,
      cosmosContext: state.cosmosContext,
      wifiProfile: state.wifiProfile,
      suggestions: ["route:wifi-primary", "pace:wifi-harmonic"]
    };

    if (trace) console.log("[PulseWifiProcessWorker-v1] hint:", hint);

    // integration hooks — you will wire these paths:
    try {
      if (typeof strandedDnaHook === "function") {
        strandedDnaHook({
          hint,
          job,
          lane: cls.lane,
          pacingWindowMs,
          wifiProfile: state.wifiProfile
        });
      }
    } catch (e) {
      if (trace) console.warn("[PulseWifiProcessWorker-v1] strandedDnaHook error:", e);
    }

    try {
      if (typeof pulseEngineHook === "function") {
        pulseEngineHook({
          hint,
          job,
          lane: cls.lane,
          pacingWindowMs,
          wifiProfile: state.wifiProfile
        });
      }
    } catch (e) {
      if (trace) console.warn("[PulseWifiProcessWorker-v1] pulseEngineHook error:", e);
    }

    return hint;
  }

  function tick() {
    state.ticks += 1;
    return {
      ok: true,
      ticks: state.ticks,
      wifiMode: state.wifiMode,
      wifiChannels: state.wifiChannels.slice(),
      wifiProfile: state.wifiProfile
    };
  }

  function snapshot() {
    return Object.freeze({
      meta: PulseWifiProcessWorkerMeta,
      ticks: state.ticks,
      packetsRouted: state.packetsRouted,
      lastLane: state.lastLane,
      lastChannelId: state.lastChannelId,
      lastJobType: state.lastJobType,
      lastAdvantageScore: state.lastAdvantageScore,
      lastBand: state.lastBand,
      wifiMode: state.wifiMode,
      wifiChannels: state.wifiChannels.slice(),
      lane: state.lane,
      role: state.role,
      presenceContext: state.presenceContext,
      advantageContext: state.advantageContext,
      cosmosContext: state.cosmosContext,
      wifiProfile: state.wifiProfile
    });
  }

  return { buildPacketHint, tick, snapshot };
}

// ============================================================================
// NORMALIZATION
// ============================================================================
function normalizeWifiJob(job, defaultLane = "downlink") {
  if (!job || typeof job !== "object") {
    return {
      lane: defaultLane,
      jobId: "unknown",
      jobType: "UNKNOWN",
      band: "packet",
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
    band: "packet",
    intent: job.intent || null,
    advantageScore:
      typeof job.advantageScore === "number"
        ? job.advantageScore
        : 0.5,
    payload: job.payload || {},
    hints: job.hints || {},
    hiccup: job.hiccup === true
  };
}

// ============================================================================
// PUBLIC INTERFACE — WIFI ONLY
// ============================================================================
export function createPulseWifiProcessWorker(opts = {}) {
  const engineBlock = createWifiEngineBlock(opts);

  function hintFor(job) {
    const j = normalizeWifiJob(job, opts.lane || "downlink");
    return engineBlock.buildPacketHint(j, j.advantageScore);
  }

  return Object.freeze({
    meta: PulseWifiProcessWorkerMeta,
    submit: hintFor,
    plan: hintFor,
    prepareJob: hintFor,
    prepareDownlinkJob: (job) => hintFor({ ...job, lane: "downlink" }),
    prepareUplinkJob: (job) => hintFor({ ...job, lane: "uplink" }),
    prepareWifiPacketJob: (job) => hintFor({ ...job, type: WIFI_PACKET_TYPE }),
    prepareWifiStreamJob: (job) => hintFor({ ...job, type: WIFI_STREAM_TYPE }),
    prepareWifiHiccupJob: (job) => hintFor({ ...job, type: WIFI_HICCUP_TYPE, hiccup: true }),
    tick: engineBlock.tick,
    snapshot: engineBlock.snapshot,
    detectWifiProfile
  });
}

// ============================================================================
// DEFAULT EXPORT — IMMORTAL INSTANCE
// ============================================================================
export const PulseWifiProcessWorker = createPulseWifiProcessWorker({
  wifiMode: "dual",
  wifiChannels: ["wifi-0", "wifi-1"],
  trace: false,
  lane: "downlink",
  role: "wifi-process-worker-global",
  presenceContext: PulseRealm.PULSE_PRESENCE || {},
  advantageContext: PulseRealm.PULSE_ADVANTAGE || {},
  cosmosContext:
    PulseRealm.PULSE_COSMOS || {
      universeId: "u:default",
      timelineId: "t:main",
      branchId: "b:root",
      shardId: "s:primary"
    },
  // you will wire these to strandedDNA / pulseengine:
  strandedDnaHook: PulseRealm.PULSE_STRANDED_DNA_HOOK || null,
  pulseEngineHook: PulseRealm.PULSE_ENGINE_WIFI_HOOK || null
});

export const PulseWifiWorker = PulseWifiProcessWorker;

PulseRealm.WifiProcessWorker = {
  PulseWifiProcessWorker,
  createPulseWifiProcessWorker,
  PulseWifiProcessWorkerMeta,
  detectWifiProfile
};
