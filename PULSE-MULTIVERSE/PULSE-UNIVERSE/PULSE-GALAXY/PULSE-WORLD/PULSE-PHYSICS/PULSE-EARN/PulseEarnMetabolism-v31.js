// ============================================================================
// FILE: PULSE-EARN/PulseEarnMetabolism-v31-IMMORTAL-INTEL-GPU-SMART.js
// LAYER: METABOLIC CELL-ENGINE SUPERPIPELINE (v31-IMMORTAL-INTEL-GPU-SMART)
// ============================================================================
//
// ROLE (v31):
//   • Same deterministic metabolic superpipeline as v30.
//   • Now GPU-aware in a *smart* way: uses GPU when it truly helps, but
//     never over-commits or assumes “all GPU, all the time”.
//   • Integrates device capability + GPU/CPU balance into computeProfile
//     and intelligent plan, but remains PURE METADATA + PURE COMPUTE.
//
// CONTRACT:
//   • No eval(), no Function(), no dynamic imports.
//   • No network, no filesystem, no side effects beyond healing state.
//   • Deterministic, lane-aware, band-aware, GPU/miner/offline aware.
//   • GPU usage is *advisory* only — this layer never talks to GPU directly.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





const MAX_ADV_HISTORY = 128;
const METABOLIC_LANES = 64;

export const metabolicHealing = {
  lastJobId: null,
  lastPayloadType: null,
  lastError: null,
  lastResult: null,
  cycleCount: 0,
  executionState: "idle",
  lastCycleIndex: null,

  lastLaneIndex: 0,
  lastLaneBand: "symbolic",

  // Dual-hash INTEL signatures
  lastMetabolicSignatureIntel: null,
  lastMetabolicSignatureClassic: null,
  lastJobSignatureIntel: null,
  lastJobSignatureClassic: null,
  lastPayloadSignatureIntel: null,
  lastPayloadSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,

  lastMetabolicPresenceProfile: null,
  lastMetabolicPressureProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastMetabolicComputeProfile: null,

  lastPressureTier: "idle",

  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [],

  lastPulseIntelligence: null,
  lastMetabolicIntelligentPlan: null,

  // v31: device + GPU capability snapshot
  lastDeviceCapabilityProfile: null
};

let metabolismCycle = 0;

// ---------------------------------------------------------------------------
// Hash + band helpers
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
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

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ---------------------------------------------------------------------------
// Lane selection (deterministic, no randomness)
// ---------------------------------------------------------------------------
function selectMetabolicLane(jobId, band) {
  const s = String(jobId || "NO_JOB") + `::${band}`;
  let acc = 0;
  for (let i = 0; i < s.length; i++) {
    acc += s.charCodeAt(i) * (i + 3);
  }
  const lane = acc % METABOLIC_LANES;
  return lane;
}

// ---------------------------------------------------------------------------
// v31: Device / capability profile (GPU-smart, metadata-only)
// ---------------------------------------------------------------------------
function classifyCapabilityTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 7000) return "elite";
  if (score >= 5000) return "high";
  if (score >= 3000) return "medium";
  if (score > 0) return "low";
  return "none";
}

function normalizeDeviceCapability(raw = {}) {
  const gpuScore = Number(raw.gpuScore ?? 0);
  const gpuRam = Number(raw.gpuRam ?? 0);
  const cpuScore = Number(raw.cpuScore ?? 0);
  const memScore = Number(raw.memScore ?? 0);
  const bandwidth = Number(raw.bandwidthMbps ?? raw.bandwidth ?? 0);
  const stability = Number(raw.stabilityScore ?? raw.stability ?? 0);

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

function resolveDeviceCapability(globalHints = {}) {
  const computeCtx = globalHints.computeContext || {};
  const explicit = computeCtx.deviceProfile || globalHints.deviceProfile || null;

  if (explicit && typeof explicit === "object") {
    return normalizeDeviceCapability(explicit);
  }

  const globalDevice =
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  if (globalDevice) {
    return normalizeDeviceCapability(globalDevice);
  }

  // Conservative fallback: “medium” profile
  return normalizeDeviceCapability({
    gpuScore: 3200,
    gpuRam: 4,
    cpuScore: 2600,
    memScore: 3200,
    bandwidthMbps: 80,
    stabilityScore: 0.9
  });
}

// ---------------------------------------------------------------------------
// Presence / Advantage / Hints — v30 surfaces (unchanged semantics)
// ---------------------------------------------------------------------------
function buildPresenceField(job, globalHints = {}) {
  const meta = job.meta || {};
  const jp = meta.presenceContext || {};

  const mesh = { ...(globalHints.meshSignals || {}), ...(meta.meshSignals || {}) };
  const castle = { ...(globalHints.castleSignals || {}), ...(meta.castleSignals || {}) };
  const region = { ...(globalHints.regionContext || {}), ...(meta.regionContext || {}) };

  const meshPressureIndex = mesh.meshPressureIndex || 0;
  const castleLoadLevel = castle.loadLevel || 0;
  const meshStrength = mesh.meshStrength || 0;

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 180) presenceTier = "critical";
  else if (pressure >= 120) presenceTier = "high";
  else if (pressure >= 60) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const intelPayload = {
    kind: "presence",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle"
  };

  const classicString =
    `META_PRESENCE_V31::${presenceTier}::` +
    `${meshPressureIndex}::${castleLoadLevel}`;

  const presenceSignatureDual = buildDualHashSignature(
    "META_PRESENCE_V31",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v31-IMMORTAL-INTEL-GPU-SMART",
    presenceTier,
    presenceSignatureIntel: presenceSignatureDual.intel,
    presenceSignatureClassic: presenceSignatureDual.classic,

    bandPresence:
      jp.bandPresence ||
      (globalHints.presenceContext || {}).bandPresence ||
      "unknown",
    routerPresence:
      jp.routerPresence ||
      (globalHints.presenceContext || {}).routerPresence ||
      "unknown",
    devicePresence:
      jp.devicePresence ||
      (globalHints.presenceContext || {}).devicePresence ||
      "unknown",

    meshPresence: jp.meshPresence || mesh.meshStrength || "unknown",
    castlePresence: jp.castlePresence || castle.castlePresence || "unknown",
    regionPresence: jp.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function buildAdvantageField(job, globalHints = {}) {
  const meta = job.meta || {};
  const ja = meta.advantageContext || {};
  const gh = globalHints.advantageContext || {};

  return {
    advantageVersion: "C-31.0",
    advantageScore: ja.score ?? gh.score ?? 0,
    advantageBand: ja.band ?? gh.band ?? "neutral",
    advantageTier: ja.tier ?? gh.tier ?? 0
  };
}

function buildHintsField(job, globalHints = {}) {
  const meta = job.meta || {};
  const jh = meta.hintsContext || {};

  return {
    fallbackBandLevel:
      jh.fallbackBandLevel ??
      globalHints.fallbackBandLevel ??
      0,

    chunkHints: {
      ...(globalHints.chunkHints || {}),
      ...(jh.chunkHints || {})
    },

    cacheHints: {
      ...(globalHints.cacheHints || {}),
      ...(jh.cacheHints || {})
    },

    prewarmHints: {
      ...(globalHints.prewarmHints || {}),
      ...(jh.prewarmHints || {})
    },

    coldStartHints: {
      ...(globalHints.coldStartHints || {}),
      ...(jh.coldStartHints || {})
    },

    computeHints: {
      ...(globalHints.computeHints || {}),
      ...(jh.computeHints || {})
    }
  };
}

// ---------------------------------------------------------------------------
// MetabolicComputeProfile v31 (GPU-smart, capability-aware)
// ---------------------------------------------------------------------------
function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildMetabolicComputeProfile(band, hintsField, presenceField, deviceCapability) {
  const computeHints = hintsField.computeHints || {};
  const gpuHints = computeHints.gpu || {};
  const minerHints = computeHints.miner || {};
  const offlineHints = computeHints.offline || {};

  const gpuEligible = !!gpuHints.eligible;
  const gpuPreferred = !!gpuHints.preferred;
  const gpuTierHint = gpuHints.tier || "unknown";

  const minerEligible = !!minerHints.eligible;
  const minerTier = minerHints.tier || "unknown";

  const offlineEligible = !!offlineHints.eligible;
  const offlineTier = offlineHints.tier || "unknown";

  const computeTierHint = computeHints.computeTier || "normal";

  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const coldStartRisk = !!hintsField.coldStartHints.coldStartRisk;

  const meshPressureIndex = presenceField.meshPressureIndex || 0;
  const castleLoadLevel = presenceField.castleLoadLevel || 0;
  const pressure = meshPressureIndex + castleLoadLevel;

  const factoringSignal =
    prewarmNeeded ||
    coldStartRisk ||
    cachePriority === "critical" ||
    pressure >= 150
      ? 1
      : 0;

  // v31: GPU budget based on capability + pressure
  const capTier = deviceCapability.capabilityTier || "medium";
  const capScore = deviceCapability.capabilityScore || 0;

  let gpuBudgetFraction = 0.25; // default: gentle
  if (capTier === "immortal" || capTier === "elite" || capScore >= 7000) {
    gpuBudgetFraction = 0.7;
  } else if (capTier === "high" || capScore >= 5000) {
    gpuBudgetFraction = 0.5;
  } else if (capTier === "medium" || capScore >= 3000) {
    gpuBudgetFraction = 0.35;
  } else {
    gpuBudgetFraction = 0.2;
  }

  // Under heavy pressure, *reduce* GPU budget to avoid overheating
  if (pressure >= 200) {
    gpuBudgetFraction *= 0.4;
  } else if (pressure >= 150) {
    gpuBudgetFraction *= 0.6;
  }

  // Clamp
  gpuBudgetFraction = Math.max(0.05, Math.min(0.85, gpuBudgetFraction));

  // v31: prefer integrated GPU when RAM is low
  const preferIntegrated =
    deviceCapability.gpuRam <= 4 && deviceCapability.gpuScore <= 4000;

  return {
    computeProfileVersion: "META-CP-V31-GPU-SMART",
    routeBand: band,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    prewarmNeeded,
    cachePriority,
    coldStartRisk,
    meshPressureIndex,
    castleLoadLevel,
    factoringSignal,

    gpuEligible,
    gpuPreferred,
    gpuTier: gpuTierHint,
    minerEligible,
    minerTier,
    offlineEligible,
    offlineTier,
    computeTierHint,

    // v31 GPU-smart fields
    deviceCapabilityTier: deviceCapability.capabilityTier,
    deviceCapabilityScore: deviceCapability.capabilityScore,
    gpuScore: deviceCapability.gpuScore,
    gpuRam: deviceCapability.gpuRam,
    gpuBudgetFraction,
    preferIntegratedGPU: preferIntegrated
  };
}

// ---------------------------------------------------------------------------
// Binary + Wave surfaces (v31, lane-aware)
// ---------------------------------------------------------------------------
function buildMetabolicBandBinaryWave(job, cycleIndex, presenceField, laneIndex) {
  const band = normalizeBand(job.band || job.meta.band || "symbolic");

  const bandSig = buildDualHashSignature(
    "BAND_V31",
    { kind: "band", band, cycleIndex, laneIndex },
    `BAND_V31::${band}::CYCLE::${cycleIndex}::LANE::${laneIndex}`
  );

  metabolicHealing.lastBand = band;
  metabolicHealing.lastBandSignatureIntel = bandSig.intel;
  metabolicHealing.lastBandSignatureClassic = bandSig.classic;

  const payloadType = job.payload.type || "NO_TYPE";
  const payloadKeysCount = job.payload ? Object.keys(job.payload).length : 0;

  const surface =
    payloadType.length +
    payloadKeysCount +
    cycleIndex +
    laneIndex +
    (presenceField.meshPressureIndex || 0) +
    (presenceField.castleLoadLevel || 0);

  const binarySig = buildDualHashSignature(
    "BMETA_V31",
    {
      kind: "binarySurface",
      payloadType,
      payloadTypeLength: payloadType.length,
      payloadKeysCount,
      cycleIndex,
      laneIndex,
      meshPressureIndex: presenceField.meshPressureIndex || 0,
      castleLoadLevel: presenceField.castleLoadLevel || 0,
      surface
    },
    `BMETA_V31::${surface}`
  );

  const binaryField = {
    binaryMetabolicSignatureIntel: binarySig.intel,
    binaryMetabolicSignatureClassic: binarySig.classic,
    binarySurfaceSignatureIntel: binarySig.intel,
    binarySurfaceSignatureClassic: binarySig.classic,
    binarySurface: {
      payloadTypeLength: payloadType.length,
      payloadKeysCount,
      cycle: cycleIndex,
      laneIndex,
      meshPressureIndex: presenceField.meshPressureIndex || 0,
      castleLoadLevel: presenceField.castleLoadLevel || 0,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: payloadKeysCount,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  metabolicHealing.lastBinaryField = binaryField;

  const waveSig = buildDualHashSignature(
    "WAVE_META_V31",
    {
      kind: "waveSurface",
      payloadKeysCount,
      cycleIndex,
      laneIndex,
      meshStrength: presenceField.meshStrength || 0,
      meshPressureIndex: presenceField.meshPressureIndex || 0
    },
    `WAVE_META_V31::${payloadKeysCount}::${cycleIndex}::${laneIndex}`
  );

  const waveField = {
    waveMetabolicSignatureIntel: waveSig.intel,
    waveMetabolicSignatureClassic: waveSig.classic,
    amplitude: payloadKeysCount + (presenceField.meshStrength || 0),
    wavelength: cycleIndex,
    phase:
      (payloadKeysCount +
        cycleIndex +
        laneIndex +
        (presenceField.meshPressureIndex || 0)) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  metabolicHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ---------------------------------------------------------------------------
// PulseIntelligence v31 + IntelligentMetabolicPlan v31
// ---------------------------------------------------------------------------
function computePulseIntelligence({ advantageField, presenceField, computeProfile, band }) {
  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical"
      ? 1.0
      : presenceTier === "high"
      ? 0.8
      : presenceTier === "elevated"
      ? 0.6
      : presenceTier === "soft"
      ? 0.4
      : 0.2;

  const factoring = computeProfile.factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.5 +
        presenceWeight * 0.25 +
        factoring * 0.25,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9
      ? "nearSolution"
      : solvednessScore >= 0.7
      ? "highValue"
      : solvednessScore >= 0.4
      ? "normal"
      : solvednessScore >= 0.2
      ? "lowPriority"
      : "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.6 +
        (bandIsBinary ? 0.2 : 0) +
        (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    pulseIntelligenceVersion: "META-PI-V31-GPU-SMART",
    solvednessScore,
    computeTier,
    readinessScore,
    band,
    advantageTier,
    factoringSignal: factoring ? "high" : "low"
  };
}

function buildIntelligentMetabolicPlan({
  job,
  band,
  presenceField,
  advantageField,
  computeProfile,
  laneIndex
}) {
  const jobId = job.id || "NO_JOB";
  const payloadType = job.payload.type || "NO_TYPE";

  const avgAdvantage =
    metabolicHealing.totalJobs > 0
      ? metabolicHealing.cumulativeAdvantageScore / metabolicHealing.totalJobs
      : 0;

  const pressureTier = presenceField.presenceTier || "idle";
  const highPressure =
    pressureTier === "critical" || pressureTier === "high";

  const preferBinary =
    band === "binary" ||
    (highPressure && computeProfile.gpuEligible);

  // v31: GPU usage is bounded by gpuBudgetFraction
  const gpuBudget = computeProfile.gpuBudgetFraction || 0.25;
  const gpuAllowed = computeProfile.gpuEligible && gpuBudget > 0.1;

  const preferGPU =
    gpuAllowed &&
    (computeProfile.gpuPreferred || advantageField.advantageTier >= 2);

  const preferMiner =
    computeProfile.minerEligible &&
    !preferGPU &&
    (pressureTier === "elevated" || pressureTier === "high");

  const preferOffline =
    computeProfile.offlineEligible &&
    !preferGPU &&
    !preferMiner &&
    pressureTier === "soft";

  let refinedComputeTier = computeProfile.computeTierHint || "normal";
  if (avgAdvantage >= 0.8 && advantageField.advantageTier >= 2) {
    refinedComputeTier = "highValue";
  } else if (avgAdvantage <= 0.2 && !highPressure) {
    refinedComputeTier = "lowPriority";
  }

  return Object.freeze({
    planVersion: "META-INTEL-31.0-GPU-SMART",
    jobId,
    payloadType,
    band,
    laneIndex,

    routeBand: preferBinary ? "binary" : "symbolic",

    useGPU: preferGPU,
    useMiner: preferMiner,
    useOffline: preferOffline,

    computeTier: refinedComputeTier,

    shouldPrewarm: !!computeProfile.prewarmNeeded,
    cachePriority: computeProfile.cachePriority,
    chunkAggression: computeProfile.chunkAggression,

    factoringSignal: computeProfile.factoringSignal,
    hotStateReuse: true,
    multiInstanceBatching: true,
    serverPlanCache: true,
    serverBinaryReuse: true,

    // v31 GPU-smart extras
    gpuBudgetFraction: computeProfile.gpuBudgetFraction,
    preferIntegratedGPU: computeProfile.preferIntegratedGPU,
    deviceCapabilityTier: computeProfile.deviceCapabilityTier,
    deviceCapabilityScore: computeProfile.deviceCapabilityScore,

    localAdvantageMemory: {
      totalJobs: metabolicHealing.totalJobs,
      successfulJobs: metabolicHealing.successfulJobs,
      failedJobs: metabolicHealing.failedJobs,
      averageAdvantageScore: avgAdvantage
    }
  });
}

// ---------------------------------------------------------------------------
// Local advantage memory
// ---------------------------------------------------------------------------
function recordAdvantageMemory(job, band, advantageField) {
  const score = advantageField.advantageScore ?? 0;
  const tier = advantageField.advantageTier ?? 0;

  metabolicHealing.totalJobs += 1;
  metabolicHealing.cumulativeAdvantageScore += score;

  const entry = {
    jobId: job.id || "NO_JOB",
    payloadType: job.payload.type || "NO_TYPE",
    band: normalizeBand(band),
    advantageScore: score,
    advantageTier: tier
  };

  metabolicHealing.lastAdvantageHistory.push(entry);
  if (metabolicHealing.lastAdvantageHistory.length > MAX_ADV_HISTORY) {
    metabolicHealing.lastAdvantageHistory.shift();
  }
}

// ---------------------------------------------------------------------------
// Deterministic micro-op handlers
// ---------------------------------------------------------------------------
function runComputeCell(data) {
  // deterministic compute micro-op
  return data;
}

function runImageCell(data) {
  // deterministic image micro-op
  return data;
}

function runScriptCell(script, input) {
  // deterministic script micro-op (no eval / Function)
  return { script, input };
}

// ---------------------------------------------------------------------------
// executePulseEarnJob — v31 GPU-smart metabolic superpipeline
// ---------------------------------------------------------------------------
export function executePulseEarnJob(job, globalHints = {}) {
  metabolismCycle++;
  metabolicHealing.cycleCount++;
  metabolicHealing.lastCycleIndex = metabolismCycle;
  metabolicHealing.executionState = "validating";

  const deviceCapability = resolveDeviceCapability(globalHints);
  metabolicHealing.lastDeviceCapabilityProfile = deviceCapability;

  let errorCount = 0;

  if (!job || !job.id || !job.payload) {
    metabolicHealing.lastError = "invalid_job_format";
    metabolicHealing.executionState = "error";
    errorCount = 1;

    const presenceField = buildPresenceField(job, globalHints);
    const advantageField = buildAdvantageField(job, globalHints);
    const hintsField = buildHintsField(job, globalHints);

    const band = normalizeBand(job.band || job.meta.band || "symbolic");
    const laneIndex = selectMetabolicLane(job.id, band);

    const computeProfile = buildMetabolicComputeProfile(
      band,
      hintsField,
      presenceField,
      deviceCapability
    );

    const pressureTier = "critical"; // invalid job is always critical degrade
    metabolicHealing.lastPressureTier = pressureTier;

    const metabolicPressureProfile = {
      pressureTier,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };

    metabolicHealing.lastPresenceField = presenceField;
    metabolicHealing.lastAdvantageField = advantageField;
    metabolicHealing.lastHintsField = hintsField;
    metabolicHealing.lastMetabolicComputeProfile = computeProfile;
    metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

    const pulseIntelligence = computePulseIntelligence({
      advantageField,
      presenceField,
      computeProfile,
      band
    });

    metabolicHealing.lastPulseIntelligence = pulseIntelligence;
    metabolicHealing.lastMetabolicIntelligentPlan = null;

    recordAdvantageMemory(job, band, advantageField);

    return {
      success: false,
      jobId: job.id ?? null,
      error: "Invalid job format",
      band,
      laneIndex,
      pressureTier,
      metabolicPressureProfile,
      metabolicComputeProfile: computeProfile,
      pulseIntelligence,
      metabolicIntelligentPlan: null,
      deviceCapability,
      cycleIndex: metabolismCycle
    };
  }

  const presenceField = buildPresenceField(job, globalHints);
  const advantageField = buildAdvantageField(job, globalHints);
  const hintsField = buildHintsField(job, globalHints);

  metabolicHealing.lastPresenceField = presenceField;
  metabolicHealing.lastAdvantageField = advantageField;
  metabolicHealing.lastHintsField = hintsField;

  const band = normalizeBand(job.band || job.meta.band || "symbolic");
  const laneIndex = selectMetabolicLane(job.id, band);
  metabolicHealing.lastLaneIndex = laneIndex;
  metabolicHealing.lastLaneBand = band;

  const { binaryField, waveField } = buildMetabolicBandBinaryWave(
    job,
    metabolismCycle,
    presenceField,
    laneIndex
  );

  const metabolicComputeProfile = buildMetabolicComputeProfile(
    band,
    hintsField,
    presenceField,
    deviceCapability
  );
  metabolicHealing.lastMetabolicComputeProfile = metabolicComputeProfile;

  const pressureTier = presenceField.presenceTier || "idle";
  metabolicHealing.lastPressureTier = pressureTier;

  const metabolicPressureProfile = {
    pressureTier,
    errorCount,
    band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };
  metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

  metabolicHealing.lastJobId = job.id;
  metabolicHealing.lastPayloadType = job.payload.type;

  const presenceTier = presenceField.presenceTier || "idle";

  const jobSig = buildDualHashSignature(
    "JOB_V31",
    {
      kind: "job",
      id: job.id,
      payloadType: job.payload.type,
      cycleIndex: metabolismCycle,
      band,
      laneIndex,
      presenceTier
    },
    `JOB_V31::${job.id}::${job.payload.type}::${metabolismCycle}::${band}::${laneIndex}::${presenceTier}`
  );

  const payloadSig = buildDualHashSignature(
    "PAYLOAD_V31",
    {
      kind: "payload",
      type: job.payload.type,
      keys: Object.keys(job.payload).sort(),
      cycleIndex: metabolismCycle,
      band,
      laneIndex
    },
    `PAYLOAD_V31::${job.payload.type}::${Object.keys(job.payload)
      .sort()
      .join("::")}::${metabolismCycle}::${band}::${laneIndex}`
  );

  metabolicHealing.lastJobSignatureIntel = jobSig.intel;
  metabolicHealing.lastJobSignatureClassic = jobSig.classic;
  metabolicHealing.lastPayloadSignatureIntel = payloadSig.intel;
  metabolicHealing.lastPayloadSignatureClassic = payloadSig.classic;

  metabolicHealing.executionState = "executing";

  let result;
  const payload = job.payload;

  switch (payload.type) {
    case "compute":
      result = runComputeCell(payload.data);
      break;
    case "image-processing":
      result = runImageCell(payload.data);
      break;
    case "script":
      result = runScriptCell(payload.script, payload.input);
      break;
    default:
      metabolicHealing.lastError = "unknown_payload_type";
      metabolicHealing.executionState = "error";
      errorCount = 1;

      const pulseIntelligenceUnknown = computePulseIntelligence({
        advantageField,
        presenceField,
        computeProfile: metabolicComputeProfile,
        band
      });

      metabolicHealing.lastPulseIntelligence = pulseIntelligenceUnknown;
      metabolicHealing.lastMetabolicIntelligentPlan = null;

      recordAdvantageMemory(job, band, advantageField);

      return {
        success: false,
        jobId: job.id,
        error: `Unknown job type: ${payload.type}`,
        band,
        laneIndex,
        pressureTier,
        metabolicPressureProfile,
        metabolicComputeProfile,
        pulseIntelligence: pulseIntelligenceUnknown,
        metabolicIntelligentPlan: null,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        deviceCapability,
        cycleIndex: metabolismCycle
      };
  }

  metabolicHealing.lastResult = result;
  metabolicHealing.executionState = "returning";

  const metabolicSig = buildDualHashSignature(
    "META_V31",
    {
      kind: "metabolism",
      jobId: job.id,
      payloadType: payload.type,
      cycleIndex: metabolismCycle,
      band,
      laneIndex,
      presenceTier,
      pressureTier
    },
    `META_V31::${job.id}::${payload.type}::${metabolismCycle}::${band}::${laneIndex}::${presenceTier}::${pressureTier}`
  );

  metabolicHealing.lastMetabolicSignatureIntel = metabolicSig.intel;
  metabolicHealing.lastMetabolicSignatureClassic = metabolicSig.classic;

  const metabolicPresenceProfile = {
    presenceTier,
    band,
    laneIndex,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };

  const binaryProfile = { binaryField, pressureTier };
  const waveProfile = { waveField, pressureTier };

  metabolicHealing.lastMetabolicPresenceProfile = metabolicPresenceProfile;
  metabolicHealing.lastBinaryProfile = binaryProfile;
  metabolicHealing.lastWaveProfile = waveProfile;

  const pulseIntelligence = computePulseIntelligence({
    advantageField,
    presenceField,
    computeProfile: metabolicComputeProfile,
    band
  });

  const metabolicIntelligentPlan = buildIntelligentMetabolicPlan({
    job,
    band,
    presenceField,
    advantageField,
    computeProfile: metabolicComputeProfile,
    laneIndex
  });

  metabolicHealing.lastPulseIntelligence = pulseIntelligence;
  metabolicHealing.lastMetabolicIntelligentPlan = metabolicIntelligentPlan;

  recordAdvantageMemory(job, band, advantageField);

  return {
    success: true,
    jobId: job.id,
    output: result,
    band,
    laneIndex,
    pressureTier,
    metabolicPressureProfile,
    metabolicComputeProfile,
    pulseIntelligence,
    metabolicIntelligentPlan,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    hintsField,
    metabolicPresenceProfile,
    binaryProfile,
    waveProfile,
    deviceCapability,
    cycleIndex: metabolismCycle
  };
}

// ---------------------------------------------------------------------------
export function getPulseEarnMetabolismHealingState_v31() {
  return { ...metabolicHealing };
}

PulseRealm.EarnMetabolism = {
  getPulseEarnMetabolismHealingState_v31,
  executePulseEarnJob,
  metabolicHealing
}