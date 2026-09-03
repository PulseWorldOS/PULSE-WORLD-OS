// ============================================================================
// FILE: /PULSE-GPU/PulseGPUEarnProfile-v31-IMMORTAL-INTEL-OMEGA-BEAST.js
// GPU EARN PROFILE — AND — GPU EARN BRIDGE (ONE ORGAN)
// ============================================================================
//
// This organ is BOTH:
//
//   1. The GPU Earn Profile (BEAST logic, capability, evolution, pressure)
//   2. The Earn Bridge (job builder, warm template, payload job, evaluator)
//
// There is NO separate Earn organ.
// The Earn Profile IS the Earn Bridge.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
// HELPERS (hash, numeric, capability, evolution, pressure, safe share)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = { label, intel: intelPayload || {}, classic: classicString || "" };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return { intel: intelHash, classic: classicHash };
}

function toNumber(v, f) {
  const n = Number(v);
  return Number.isFinite(n) ? n : f;
}

function clamp(v, min, max) {
  const n = toNumber(v, min);
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

function clamp01(v) {
  return clamp(v, 0, 1);
}

function classifyCapabilityTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 7000) return "elite";
  if (score >= 5000) return "high";
  if (score >= 3000) return "medium";
  if (score > 0) return "low";
  return "none";
}

function normalizeDeviceProfile(raw) {
  if (!raw || typeof raw !== "object") return null;

  const gpuScore = toNumber(raw.gpuScore, 0);
  const gpuRam = toNumber(raw.gpuRam, 0);
  const cpuScore = toNumber(raw.cpuScore, 0);
  const memScore = toNumber(raw.memScore, 0);
  const bandwidth = toNumber(raw.bandwidthMbps ?? raw.bandwidth, 0);
  const stability = toNumber(raw.stabilityScore ?? raw.stability, 0);

  const capabilityScore =
    typeof raw.capabilityScore === "number"
      ? raw.capabilityScore
      : gpuScore * 0.5 +
        cpuScore * 0.2 +
        memScore * 0.2 +
        bandwidth * 0.05 +
        stability * 0.05;

  const capabilityTier =
    raw.capabilityTier ||
    raw.gpuTier ||
    classifyCapabilityTier(capabilityScore);

  return {
    gpuTier: capabilityTier,
    gpuScore,
    gpuRam,
    cpuScore,
    memScore,
    bandwidthMbps: bandwidth,
    stabilityScore: stability,
    capabilityScore,
    capabilityTier
  };
}

function getCapabilityProfile(explicit = null) {
  const explicitNorm = normalizeDeviceProfile(explicit);
  if (explicitNorm) return explicitNorm;

  const globalDevice =
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  const globalNorm = normalizeDeviceProfile(globalDevice);
  if (globalNorm) return globalNorm;

  // fallback
  return normalizeDeviceProfile({
    gpuScore: 7200,
    gpuRam: 24,
    cpuScore: 3600,
    memScore: 4800,
    bandwidthMbps: 500,
    stabilityScore: 0.97
  });
}

function computeGpuEvolutionSurface({
  skin,
  security,
  thermal,
  battery,
  earnMode,
  gameMode,
  capabilityProfile
}) {
  const gpuHints = skin.gpuHints || {};

  const stabilityHint = toNumber(
    gpuHints.stabilityScore ?? capabilityProfile.stabilityScore,
    0.8
  );
  const bandwidthHint = toNumber(
    gpuHints.bandwidthMbps ?? capabilityProfile.bandwidthMbps,
    100
  );
  const capacityHint = toNumber(
    gpuHints.capacityScore ?? capabilityProfile.gpuRam / 8,
    1.0
  );

  const trust = security.trust || "unknown";
  const risk = security.risk || "unknown";

  let gpuMode = "idle";
  if (gameMode && earnMode) gpuMode = "burst";
  else if (gameMode) gpuMode = "active";
  else if (earnMode) gpuMode = "warmup";

  if (thermal === "critical" || battery === "critical") gpuMode = "recovery";

  const trustBoost =
    trust === "trusted" && (risk === "low" || risk === "unknown")
      ? 0.15
      : risk === "high" || risk === "critical"
      ? -0.15
      : 0;

  const thermalPenalty =
    thermal === "critical" ? -0.3 :
    thermal === "high" ? -0.15 :
    0;

  const batteryPenalty =
    battery === "critical" ? -0.3 :
    battery === "low" ? -0.1 :
    0;

  const modeBase =
    gpuMode === "burst" ? 0.25 :
    gpuMode === "active" ? 0.18 :
    gpuMode === "warmup" ? 0.1 :
    gpuMode === "recovery" ? -0.1 :
    0;

  const capabilityFactor = clamp01(
    (capabilityProfile.capabilityScore || 0) / 10000
  );

  const raw =
    0.25 * clamp01(stabilityHint) +
    0.20 * clamp01(bandwidthHint / 300) +
    0.20 * clamp01(capacityHint / 2) +
    0.20 * capabilityFactor +
    trustBoost +
    thermalPenalty +
    batteryPenalty +
    modeBase;

  const gpuEvolutionScore = clamp01(raw);

  const gpuEvolutionTier =
    gpuEvolutionScore >= 0.92 ? 4 :
    gpuEvolutionScore >= 0.75 ? 3 :
    gpuEvolutionScore >= 0.50 ? 2 :
    gpuEvolutionScore >= 0.25 ? 1 :
    0;

  const intelPayload = {
    gpuMode,
    gpuEvolutionScore,
    gpuEvolutionTier,
    stabilityHint,
    bandwidthHint,
    capacityHint,
    trust,
    risk,
    thermal,
    battery,
    earnMode,
    gameMode,
    capabilityTier: capabilityProfile.capabilityTier,
    capabilityScore: capabilityProfile.capabilityScore
  };

  const classicString =
    `GPU_EVOLVE_V31::mode:${gpuMode}` +
    `::score:${gpuEvolutionScore.toFixed(6)}` +
    `::tier:${gpuEvolutionTier}` +
    `::thermal:${thermal}` +
    `::battery:${battery}` +
    `::capTier:${capabilityProfile.capabilityTier}` +
    `::capScore:${capabilityProfile.capabilityScore.toFixed(2)}`;

  const sig = buildDualHashSignature(
    "PULSE_GPU_EARN_EVOLUTION_V31",
    intelPayload,
    classicString
  );

  return {
    gpuMode,
    gpuEvolutionTier,
    gpuEvolutionScore,
    evolutionSignatureIntel: sig.intel,
    evolutionSignatureClassic: sig.classic
  };
}

function computeBeastPressure({
  gameMode,
  thermal,
  battery,
  capabilityTier,
  gpuEvolutionTier
}) {
  if (!gameMode) return "idle";

  if (thermal === "critical" || battery === "critical") return "collapse";

  if (capabilityTier === "immortal") return "soft";
  if (capabilityTier === "elite") return gpuEvolutionTier >= 3 ? "soft" : "medium";
  if (capabilityTier === "high") return gpuEvolutionTier >= 2 ? "medium" : "high";

  return "critical";
}

function computeBeastSafeEarnShare({
  beastPressureTier,
  capabilityTier,
  gpuEvolutionTier
}) {
  if (beastPressureTier === "collapse") return 0;
  if (beastPressureTier === "critical") return 0;
  if (beastPressureTier === "high") return 0;

  if (beastPressureTier === "medium") {
    if (capabilityTier === "immortal") return 10;
    if (capabilityTier === "elite") return gpuEvolutionTier >= 3 ? 8 : 5;
    if (capabilityTier === "high") return 3;
    return 0;
  }

  if (beastPressureTier === "soft") {
    if (capabilityTier === "immortal") return 20;
    if (capabilityTier === "elite") return 12;
    if (capabilityTier === "high") return 6;
    return 0;
  }

  return 0;
}


// ============================================================================
// FINAL PROFILE — v31 IMMORTAL-INTEL-OMEGA-BEAST
// ============================================================================
export function computeGPUEarnProfile_v31({
  skin = {},
  security = {},
  earnMode = false,
  gameMode = false,
  thermal = "low",
  battery = "high",
  deviceProfile = null
} = {}) {
  const capabilityProfile = getCapabilityProfile(deviceProfile);

  const evolution = computeGpuEvolutionSurface({
    skin,
    security,
    thermal,
    battery,
    earnMode,
    gameMode,
    capabilityProfile
  });

  const beastPressureTier = computeBeastPressure({
    gameMode,
    thermal,
    battery,
    capabilityTier: capabilityProfile.capabilityTier,
    gpuEvolutionTier: evolution.gpuEvolutionTier
  });

  const beastSafeEarnShare = computeBeastSafeEarnShare({
    beastPressureTier,
    capabilityTier: capabilityProfile.capabilityTier,
    gpuEvolutionTier: evolution.gpuEvolutionTier
  });

  let earnModeGpuShare = earnMode ? beastSafeEarnShare : 0;
  let gameModeGpuShare = gameMode ? 100 - earnModeGpuShare : 0;

  const gpuBudgetTier =
    beastPressureTier === "collapse" ? "none" :
    beastPressureTier === "critical" ? "low" :
    beastPressureTier === "high" ? "low" :
    beastPressureTier === "medium" ? "medium" :
    "high";

  const clamped = beastPressureTier !== "idle";

  const binaryPayload = {
    gpuBudgetTier,
    earnModeGpuShare,
    gameModeGpuShare,
    beastPressureTier,
    beastSafeEarnShare,
    clamped,
    gpuMode: evolution.gpuMode,
    gpuEvolutionTier: evolution.gpuEvolutionTier,
    gpuEvolutionScore: evolution.gpuEvolutionScore,
    capabilityTier: capabilityProfile.capabilityTier,
    capabilityScore: capabilityProfile.capabilityScore
  };

  const classicString =
    `GPU_EARN_V31::tier:${gpuBudgetTier}` +
    `::earn:${earnModeGpuShare}` +
    `::game:${gameModeGpuShare}` +
    `::beast:${beastPressureTier}` +
    `::cap:${capabilityProfile.capabilityTier}`;

  const sig = buildDualHashSignature(
    "PULSE_GPU_EARN_PROFILE_V31",
    binaryPayload,
    classicString
  );

  return {
    gpuBudgetTier,
    earnModeGpuShare,
    gameModeGpuShare,
    beastPressureTier,
    beastSafeEarnShare,
    beastClamped: clamped,

    gpuMode: evolution.gpuMode,
    gpuEvolutionTier: evolution.gpuEvolutionTier,
    gpuEvolutionScore: evolution.gpuEvolutionScore,
    evolutionSignatureIntel: evolution.evolutionSignatureIntel,
    evolutionSignatureClassic: evolution.evolutionSignatureClassic,

    capabilityTier: capabilityProfile.capabilityTier,
    capabilityScore: capabilityProfile.capabilityScore,
    gpuScore: capabilityProfile.gpuScore,
    gpuRam: capabilityProfile.gpuRam,
    bandwidthMbps: capabilityProfile.bandwidthMbps,
    stabilityScore: capabilityProfile.stabilityScore,

    binaryBudgetIndex: binaryPayload,
    budgetSignatureIntel: sig.intel,
    budgetSignatureClassic: sig.classic
  };
}


// ============================================================================
// IMMORTAL ORGAN — GPU EARN PROFILE + EARN BRIDGE
// ============================================================================
export const PulseGPUEarnProfileCore = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    lastProfile: computeGPUEarnProfile_v31({})
  };

  // ------------------------------------------------------------
  // CORE SURFACES
  // ------------------------------------------------------------
  const compute = (options = {}) => {
    const p = computeGPUEarnProfile_v31(options);
    lane.lastProfile = p;
    return p;
  };

  const snapshot = () => ({ ...lane.lastProfile });

  const update = (options = {}) => compute(options);

  // ------------------------------------------------------------
  // EARN BRIDGE — JOB BUILDERS + ADVANTAGE EVALUATOR
  // ------------------------------------------------------------

  const _computeAdvantageFromContext = ({
    metrics = {},
    profile = null
  } = {}) => {
    const m = metrics || {};
    const p = profile || lane.lastProfile || null;

    if (typeof m.earnJobAdvantage === "number") {
      return clamp01(m.earnJobAdvantage);
    }

    const safeShare = toNumber(p.beastSafeEarnShare, 0);
    const base = clamp01(safeShare / 20);

    const pressure = p.beastPressureTier || "idle";
    const pressurePenalty =
      pressure === "critical" || pressure === "collapse" ? 0.5 :
      pressure === "high" ? 0.3 :
      pressure === "medium" ? 0.15 :
      0;

    return clamp01(base * (1 - pressurePenalty));
  };

  const _buildJobId = ({ source = "session", gameProfile, hardwareProfile, tierProfile }) => {
    const base = {
      src: source,
      gameId: gameProfile.gameId || "unknown-game",
      gpuModel: hardwareProfile.gpuModel || "unknown-gpu",
      tierId: tierProfile.tierId || "unknown-tier",
      t: PulseRealm.PulseNOW
    };
    return computeHashIntelligence(base);
  };

  const buildWarmJobTemplate = ({
    gameProfile = {},
    hardwareProfile = {},
    tierProfile = {},
    geneticMemoryEntry = null,
    advantageSnapshot = null,
    options = {}
  } = {}) => {
    const profile = lane.lastProfile || compute({});
    const jobId = _buildJobId({
      source: "warm",
      gameProfile,
      hardwareProfile,
      tierProfile
    });

    const gpuShare = clamp(
      toNumber(profile.beastSafeEarnShare, 0),
      0,
      25
    );

    return {
      jobId,
      mode: "warm-template",
      band: "one-band-binary",
      gpuSharePercent: gpuShare,
      gpuBudgetTier: profile.gpuBudgetTier,
      beastPressureTier: profile.beastPressureTier,
      capabilityTier: profile.capabilityTier,
      gpuEvolutionTier: profile.gpuEvolutionTier,
      advantageHint: {
        fromSnapshot: advantageSnapshot || null,
        fromGeneticMemory: !!geneticMemoryEntry
      },
      context: {
        gameProfile,
        hardwareProfile,
        tierProfile,
        geneticMemoryEntry,
        advantageSnapshot,
        options
      }
    };
  };

  const buildJobFromSession = ({
    gameProfile = {},
    hardwareProfile = {},
    tierProfile = {},
    metrics = {},
    executionContext = {},
    traceSummary = {},
    geneticMemoryEntry = null,
    advantageSnapshot = null
  } = {}) => {
    const profile = lane.lastProfile || compute({});
    const jobId = _buildJobId({
      source: "session",
      gameProfile,
      hardwareProfile,
      tierProfile
    });

    const gpuShare = clamp(
      toNumber(profile.beastSafeEarnShare, 0),
      0,
      25
    );

    const advantage = _computeAdvantageFromContext({
      metrics,
      profile
    });

    return {
      jobId,
      mode: "session-derived",
      band: "one-band-binary",
      gpuSharePercent: gpuShare,
      gpuBudgetTier: profile.gpuBudgetTier,
      beastPressureTier: profile.beastPressureTier,
      capabilityTier: profile.capabilityTier,
      gpuEvolutionTier: profile.gpuEvolutionTier,
      advantage,
      advantageSnapshot: advantageSnapshot || null,
      context: {
        gameProfile,
        hardwareProfile,
        tierProfile,
        metrics,
        executionContext,
        traceSummary,
        geneticMemoryEntry
      }
    };
  };

  const buildJobFromPayload = (payload = {}, context = {}) => {
    const {
      gameProfile = {},
      hardwareProfile = {},
      tierProfile = {},
      metrics = {},
      executionContext = {},
      traceSummary = {},
      geneticMemoryEntry = null,
      advantageSnapshot = null
    } = context || {};

    const profile = lane.lastProfile || compute({});
    const jobId = _buildJobId({
      source: "payload",
      gameProfile,
      hardwareProfile,
      tierProfile
    });

    const gpuShare = clamp(
      toNumber(payload.gpuSharePercent ?? profile.beastSafeEarnShare, 0),
      0,
      25
    );

    const advantage = _computeAdvantageFromContext({
      metrics,
      profile
    });

    return {
      jobId,
      mode: payload.mode || "payload-derived",
      band: payload.band || "one-band-binary",
      gpuSharePercent: gpuShare,
      gpuBudgetTier: profile.gpuBudgetTier,
      beastPressureTier: profile.beastPressureTier,
      capabilityTier: profile.capabilityTier,
      gpuEvolutionTier: profile.gpuEvolutionTier,
      advantage,
      advantageSnapshot: advantageSnapshot || null,
      context: {
        gameProfile,
        hardwareProfile,
        tierProfile,
        metrics,
        executionContext,
        traceSummary,
        geneticMemoryEntry,
        payload
      }
    };
  };

  const evaluateJobAdvantage = ({
    job,
    advantageSnapshot = null,
    userPreferences = {}
  } = {}) => {
    const profile = lane.lastProfile || compute({});
    const j = job || {};

    const baseAdvantage = clamp01(
      typeof j.advantage === "number"
        ? j.advantage
        : _computeAdvantageFromContext({
            metrics: {},
            profile
          })
    );

    const prefs = userPreferences || {};
    const allowEarn = prefs.allowGpuEarn !== false;
    const maxShare = toNumber(prefs.maxEarnGpuSharePercent, 15);

    const share = clamp(toNumber(j.gpuSharePercent, 0), 0, maxShare);

    let mode = "deny";
    let reason = "earn_disabled";

    if (!allowEarn) {
      mode = "deny";
      reason = "user_disabled_earn";
    } else if (profile.beastPressureTier === "collapse" ||
               profile.beastPressureTier === "critical") {
      mode = "deny";
      reason = "beast_pressure_too_high";
    } else if (baseAdvantage <= 0.05) {
      mode = "deny";
      reason = "advantage_too_low";
    } else if (baseAdvantage < 0.25) {
      mode = "throttle";
      reason = "low_advantage_throttled";
    } else {
      mode = "allow";
      reason = "advantage_positive";
    }

    return {
      mode,
      reason,
      advantage: baseAdvantage,
      gpuSharePercent: share,
      gpuBudgetTier: profile.gpuBudgetTier,
      beastPressureTier: profile.beastPressureTier,
      capabilityTier: profile.capabilityTier,
      gpuEvolutionTier: profile.gpuEvolutionTier,
      advantageSnapshot: advantageSnapshot || null,
      job: {
        ...j,
        gpuSharePercent: share
      }
    };
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    compute,
    snapshot,
    update,

    buildWarmJobTemplate,
    buildJobFromSession,
    buildJobFromPayload,
    evaluateJobAdvantage
  };

})();


// ============================================================================
// PUBLIC ORGAN WRAPPER — THE ORGAN IS THE BRIDGE
// ============================================================================
const _gpuEarnCore = PulseGPUEarnProfileCore;

export const PulseGPUEarnProfile = {
  compute: (opts) => _gpuEarnCore.compute(opts),
  snapshot: () => _gpuEarnCore.snapshot(),
  update: (opts) => _gpuEarnCore.update(opts),

  buildWarmJobTemplate: (args) => _gpuEarnCore.buildWarmJobTemplate(args),
  buildJobFromSession: (args) => _gpuEarnCore.buildJobFromSession(args),
  buildJobFromPayload: (payload, context) =>
    _gpuEarnCore.buildJobFromPayload(payload, context),
  evaluateJobAdvantage: (args) => _gpuEarnCore.evaluateJobAdvantage(args)
};

try {
  PulseRealm.PulseGPUEarnProfile = PulseGPUEarnProfile;
} catch {}


// ============================================================================
// EARN BRIDGE FACTORY — RETURNS THE ORGAN AS THE BRIDGE
// ============================================================================
//
// This satisfies:
//
//   this.earnBridge =
//     options.earnBridge ||
//     createPulseGPUEarnBridge({ logger: options.logger }) ||
//     null;
//
// The Earn Profile IS the bridge.
// ============================================================================

export function createPulseGPUEarnBridge(options = {}) {
  const logger = options.logger || console;

  try {
    logger.log(
      "pulse-gpu",
      "createPulseGPUEarnBridge_v31",
      { mode: "earn_profile_is_bridge" }
    );
  } catch {}

  return PulseGPUEarnProfile;
}

PulseRealm.GPUEarnProfile = {
  createPulseGPUEarnBridge,
  PulseGPUEarnProfile,
  PulseGPUEarnProfileCore,
  computeGPUEarnProfile_v31,
  computeBeastPressure,
  computeBeastSafeEarnShare,
  computeGpuEvolutionSurface
}