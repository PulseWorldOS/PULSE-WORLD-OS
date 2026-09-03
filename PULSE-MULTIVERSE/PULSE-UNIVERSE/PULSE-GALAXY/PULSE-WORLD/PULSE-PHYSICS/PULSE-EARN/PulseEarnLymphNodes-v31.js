// ============================================================================
// FILE: PulseEarnLymphNodes-v31-Immortal-INTEL-GPU-SMART.js
// LAYER: THE LYMPHATIC HANDSHAKE NODES (v31 IMMORTAL INTEL GPU-SMART)
// ============================================================================
//
// ROLE (v31):
//   • Immune-safe finalizer for Earn jobs.
//   • Deterministic, zero-GPU-compute, zero-async, zero-nondeterminism.
//   • GPU-SMART (metadata-only): understands device capability,
//     gpuBudgetFraction, gpuPreferred, gpuEligible, miner/offline tiers,
//     computeTierHint, pressure-aware GPU throttling.
//   • Emits v31 INTEL surfaces, v31 lymphComputeProfile, v31 lymphPulseIntelligence,
//     v31 intelligentLymphPlan, v31 binary/wave surfaces.
//   • Still PURE FINALIZER — never performs compute, never touches GPU.
//
// CONTRACT (v31):
//   • No eval(), no Function(), no dynamic imports.
//   • No network, no filesystem, no async.
//   • Never mutate job objects.
//   • Deterministic identity verification + dispatch only.
//   • GPU-awareness is metadata-only.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseEarnMktReceptor_v31 as PulseEarnReceptor } from "./PulseEarnReceptorMkt-v31.js";
import { PulseEarnCustomReceptor } from "./MARKETS/PulseEarnMktCustomReceptor-v31.js";



// ============================================================================
// Healing Metadata — v31 IMMORTAL INTEL GPU-SMART
// ============================================================================

const MAX_LYMPH_ADV_HISTORY = 64;

export const lymphHealing = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastAdapterUsed: null,
  lastError: null,
  lastResponse: null,
  cycleCount: 0,
  lastCycleIndex: null,
  executionState: "idle",

  // Dual-hash INTEL signatures
  lastHandshakeSignatureIntel: null,
  lastHandshakeSignatureClassic: null,
  lastJobSignatureIntel: null,
  lastJobSignatureClassic: null,
  lastMarketplaceSignatureIntel: null,
  lastMarketplaceSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,

  lastLymphPresenceProfile: null,
  lastLymphPressureProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastLymphComputeProfileV31: null,

  lastPressureTier: "idle",

  // v31 GPU-smart metadata
  lastDeviceCapabilityProfile: null,

  // v31 advantage memory
  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [],

  lastLymphPulseIntelligence: null,
  lastIntelligentLymphPlan: null
};

let lymphCycle = 0;

// ============================================================================
// Deterministic Hash Helpers — v31 INTEL
// ============================================================================

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
  return {
    intel: computeHashIntelligence(intelBase),
    classic: computeHash(`${label}::${classicString || ""}`)
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// v31 Device Capability (GPU-SMART metadata only)
// ============================================================================

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

  // Conservative fallback
  return normalizeDeviceCapability({
    gpuScore: 3200,
    gpuRam: 4,
    cpuScore: 2600,
    memScore: 3200,
    bandwidthMbps: 80,
    stabilityScore: 0.9
  });
}

// ============================================================================
// Signature Builders — v31
// ============================================================================

function buildJobSignature(job, cycleIndex, band, presenceTier) {
  if (!job) {
    return buildDualHashSignature("LYMPH_JOB::NONE", {}, "LYMPH_JOB::NONE");
  }

  const intelPayload = {
    kind: "lymph_job_v31",
    id: job.id,
    marketplaceId: job.marketplaceId || "NO_MKT",
    cycleIndex,
    band,
    presenceTier
  };

  const classicString =
    `LYMPH_JOB_V31::${job.id}::${job.marketplaceId || "NO_MKT"}::` +
    `CYCLE::${cycleIndex}::BAND::${band}::PTIER::${presenceTier}`;

  return buildDualHashSignature("LYMPH_JOB_V31", intelPayload, classicString);
}

function buildMarketplaceSignature(marketplaceId, cycleIndex) {
  const intelPayload = {
    kind: "lymph_marketplace_v31",
    marketplaceId: marketplaceId || "NO_MKT",
    cycleIndex
  };

  const classicString = `LYMPH_MKT_V31::${marketplaceId || "NO_MKT"}::CYCLE::${cycleIndex}`;

  return buildDualHashSignature("LYMPH_MKT_V31", intelPayload, classicString);
}

function buildHandshakeSignature(job, cycleIndex, band, presenceTier, pressureTier) {
  const intelPayload = {
    kind: "lymph_handshake_v31",
    jobId: job.id || "NO_JOB",
    marketplaceId: job.marketplaceId || "NO_MKT",
    cycleIndex,
    band,
    presenceTier,
    pressureTier
  };

  const classicString =
    `LYMPH_HS_V31::${job.id || "NO_JOB"}::${job.marketplaceId || "NO_MKT"}::` +
    `CYCLE::${cycleIndex}::BAND::${band}::PTIER::${presenceTier}::PRESSURE::${pressureTier}`;

  return buildDualHashSignature("LYMPH_HS_V31", intelPayload, classicString);
}

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "lymph_band_v31",
    band,
    cycleIndex
  };

  const classicString = `LYMPH_BAND_V31::${band}::CYCLE::${cycleIndex}`;

  return buildDualHashSignature("LYMPH_BAND_V31", intelPayload, classicString);
}

// ============================================================================
// Receptor Registry (unchanged)
// ============================================================================

const receptorRegistry = {
  A: PulseEarnReceptor,
  CUSTOM: PulseEarnCustomReceptor
};

// ============================================================================
// Presence / Advantage / Hints — v31 surfaces
// ============================================================================

function buildPresenceField(job, globalHints = {}) {
  const meta = job.meta || {};
  const jp = meta.presenceContext || meta.cardiacPresence || {};

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
    kind: "lymph_presence_v31",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle"
  };

  const classicString =
    `LYMPH_PRESENCE_V31::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const presenceSignatureDual = buildDualHashSignature(
    "LYMPH_PRESENCE_V31",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v31-Immortal-INTEL-GPU-SMART",
    presenceTier,
    presenceSignatureIntel: presenceSignatureDual.intel,
    presenceSignatureClassic: presenceSignatureDual.classic,

    bandPresence: jp.bandPresence || (globalHints.presenceContext || {}).bandPresence || "unknown",
    routerPresence: jp.routerPresence || (globalHints.presenceContext || {}).routerPresence || "unknown",
    devicePresence: jp.devicePresence || (globalHints.presenceContext || {}).devicePresence || "unknown",

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
    advantageVersion: "C-31.0-LYMPH",
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

// ============================================================================
// v31 Lymph Compute Profile (GPU-SMART metadata only)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildLymphComputeProfileV31(band, hintsField, deviceCapability) {
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

  // v31 GPU-smart budget
  const capTier = deviceCapability.capabilityTier || "medium";
  const capScore = deviceCapability.capabilityScore || 0;

  let gpuBudgetFraction = 0.25;
  if (capTier === "immortal" || capTier === "elite" || capScore >= 7000) {
    gpuBudgetFraction = 0.7;
  } else if (capTier === "high" || capScore >= 5000) {
    gpuBudgetFraction = 0.5;
  } else if (capTier === "medium" || capScore >= 3000) {
    gpuBudgetFraction = 0.35;
  } else {
    gpuBudgetFraction = 0.2;
  }

  const preferIntegrated =
    deviceCapability.gpuRam <= 4 && deviceCapability.gpuScore <= 4000;

  return {
    computeProfileVersion: "LYMPH-CP-V31-GPU-SMART",
    routeBand: band,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    prewarmNeeded,
    cachePriority,
    coldStartRisk,

    gpuEligible,
    gpuPreferred,
    gpuTier: gpuTierHint,
    minerEligible,
    minerTier,
    offlineEligible,
    offlineTier,
    computeTierHint,

    deviceCapabilityTier: deviceCapability.capabilityTier,
    deviceCapabilityScore: deviceCapability.capabilityScore,
    gpuScore: deviceCapability.gpuScore,
    gpuRam: deviceCapability.gpuRam,
    gpuBudgetFraction,
    preferIntegratedGPU: preferIntegrated
  };
}

// ============================================================================
// Pressure Tier Classification
// ============================================================================

function classifyPressureTier(presenceField, errorCount) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle + errorCount * 20;

  if (pressure >= 180) return "critical";
  if (pressure >= 120) return "high";
  if (pressure >= 60) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Binary + Wave Surfaces — v31
// ============================================================================

function buildLymphBandBinaryWave(job, cycleIndex, presenceField) {
  const band = normalizeBand(job.band || job.meta.band || "symbolic");

  const bandSig = buildBandSignature(band, cycleIndex);
  lymphHealing.lastBand = band;
  lymphHealing.lastBandSignatureIntel = bandSig.intel;
  lymphHealing.lastBandSignatureClassic = bandSig.classic;

  const jobIdLength = (job.id || "").length;
  const marketplaceLength = (job.marketplaceId || "").length;

  const surface =
    jobIdLength +
    marketplaceLength +
    cycleIndex +
    (presenceField.meshPressureIndex || 0) +
    (presenceField.castleLoadLevel || 0);

  const binaryIntelPayload = {
    kind: "lymph_binarySurface_v31",
    jobIdLength,
    marketplaceLength,
    cycleIndex,
    meshPressureIndex: presenceField.meshPressureIndex || 0,
    castleLoadLevel: presenceField.castleLoadLevel || 0,
    surface
  };

  const binaryClassicString = `LYMPH_BMETA_V31::${surface}`;

    const binarySignatureDual = buildDualHashSignature(
    "LYMPH_BMETA_V31",
    binaryIntelPayload,
    binaryClassicString
  );

  const binaryField = {
    binaryLymphSignatureIntel: binarySignatureDual.intel,
    binaryLymphSignatureClassic: binarySignatureDual.classic,
    binarySurfaceSignatureIntel: binarySignatureDual.intel,
    binarySurfaceSignatureClassic: binarySignatureDual.classic,
    binarySurface: {
      jobIdLength,
      marketplaceLength,
      cycle: cycleIndex,
      meshPressureIndex: presenceField.meshPressureIndex || 0,
      castleLoadLevel: presenceField.castleLoadLevel || 0,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobIdLength,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  lymphHealing.lastBinaryField = binaryField;

  const waveIntelPayload = {
    kind: "lymph_waveSurface_v31",
    jobIdLength,
    cycleIndex,
    meshStrength: presenceField.meshStrength || 0,
    meshPressureIndex: presenceField.meshPressureIndex || 0
  };

  const waveClassicString = `LYMPH_WAVE_V31::${jobIdLength}::${cycleIndex}`;

  const waveSignatureDual = buildDualHashSignature(
    "LYMPH_WAVE_V31",
    waveIntelPayload,
    waveClassicString
  );

  const waveField = {
    waveLymphSignatureIntel: waveSignatureDual.intel,
    waveLymphSignatureClassic: waveSignatureDual.classic,
    amplitude: jobIdLength + (presenceField.meshStrength || 0),
    wavelength: cycleIndex,
    phase:
      (jobIdLength +
        cycleIndex +
        (presenceField.meshPressureIndex || 0)) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  lymphHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ============================================================================
// v31 Lymph Pulse Intelligence (metadata-only, deterministic)
// ============================================================================

function computeLymphPulseIntelligence({
  advantageField,
  presenceField,
  computeProfile,
  band,
  errorCount
}) {
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

  const factoringSignal =
    computeProfile.prewarmNeeded ||
    computeProfile.cachePriority === "critical" ||
    computeProfile.coldStartRisk
      ? 1
      : 0;

  const bandIsBinary = band === "binary" ? 1 : 0;
  const errorWeight = Math.max(0, Math.min(errorCount / 8, 1));

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
        presenceWeight * 0.25 +
        factoringSignal * 0.2 +
        (1 - errorWeight) * 0.15,
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
    lymphPulseIntelligenceVersion: "LYMPH-PI-V31-GPU-SMART",
    solvednessScore,
    computeTier,
    readinessScore,
    band,
    advantageTier,
    factoringSignal: factoringSignal ? "high" : "low",
    errorCount
  };
}

// ============================================================================
// v31 Intelligent Lymph Plan (metadata-only, deterministic)
// ============================================================================

function buildIntelligentLymphPlan({
  job,
  band,
  presenceField,
  advantageField,
  computeProfile
}) {
  const jobId = job.id || "NO_JOB";
  const marketplaceId = job.marketplaceId || "NO_MKT";

  const avgAdvantage =
    lymphHealing.totalJobs > 0
      ? lymphHealing.cumulativeAdvantageScore / lymphHealing.totalJobs
      : 0;

  const pressureTier = presenceField.presenceTier || "idle";
  const highPressure =
    pressureTier === "critical" || pressureTier === "high";

  const preferBinary =
    band === "binary" ||
    (highPressure && computeProfile.gpuEligible);

  const gpuAllowed =
    computeProfile.gpuEligible &&
    computeProfile.gpuBudgetFraction > 0.1;

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
    planVersion: "LYMPH-INTEL-31.0-GPU-SMART",
    jobId,
    marketplaceId,
    band,

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

    gpuBudgetFraction: computeProfile.gpuBudgetFraction,
    preferIntegratedGPU: computeProfile.preferIntegratedGPU,
    deviceCapabilityTier: computeProfile.deviceCapabilityTier,
    deviceCapabilityScore: computeProfile.deviceCapabilityScore,

    localAdvantageMemory: {
      totalJobs: lymphHealing.totalJobs,
      successfulJobs: lymphHealing.successfulJobs,
      failedJobs: lymphHealing.failedJobs,
      averageAdvantageScore: avgAdvantage
    }
  });
}

// ============================================================================
// Local Advantage Memory
// ============================================================================

function recordLymphAdvantageMemory(job, band, advantageField) {
  const score = advantageField.advantageScore ?? 0;
  const tier = advantageField.advantageTier ?? 0;

  lymphHealing.totalJobs += 1;
  lymphHealing.cumulativeAdvantageScore += score;

  const entry = {
    jobId: job.id || "NO_JOB",
    marketplaceId: job.marketplaceId || "NO_MKT",
    band: normalizeBand(band),
    advantageScore: score,
    advantageTier: tier
  };

  lymphHealing.lastAdvantageHistory.push(entry);
  if (lymphHealing.lastAdvantageHistory.length > MAX_LYMPH_ADV_HISTORY) {
    lymphHealing.lastAdvantageHistory.shift();
  }
}

// ============================================================================
// submitPulseEarnResult — v31 IMMORTAL INTEL GPU-SMART (metadata-only)
// ============================================================================

export function submitPulseEarnResult(job, result, globalHints = {}) {
  lymphCycle++;
  lymphHealing.cycleCount++;
  lymphHealing.lastCycleIndex = lymphCycle;
  lymphHealing.executionState = "validating";

  let errorCount = 0;

  const deviceCapability = resolveDeviceCapability(globalHints);
  lymphHealing.lastDeviceCapabilityProfile = deviceCapability;

  const presenceField = buildPresenceField(job, globalHints);
  const advantageField = buildAdvantageField(job, globalHints);
  const hintsField = buildHintsField(job, globalHints);

  lymphHealing.lastPresenceField = presenceField;
  lymphHealing.lastAdvantageField = advantageField;
  lymphHealing.lastHintsField = hintsField;

  const { band, binaryField, waveField } = buildLymphBandBinaryWave(
    job,
    lymphCycle,
    presenceField
  );

  const lymphComputeProfileV31 = buildLymphComputeProfileV31(
    band,
    hintsField,
    deviceCapability
  );
  lymphHealing.lastLymphComputeProfileV31 = lymphComputeProfileV31;

  const pressureTier = classifyPressureTier(presenceField, errorCount);
  lymphHealing.lastPressureTier = pressureTier;

  const lymphPressureProfile = {
    pressureTier,
    errorCount,
    band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };

  const lymphPresenceProfile = {
    presenceTier: presenceField.presenceTier,
    band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };

  const binaryProfile = { binaryField, pressureTier };
  const waveProfile = { waveField, pressureTier };

  lymphHealing.lastLymphPresenceProfile = lymphPresenceProfile;
  lymphHealing.lastLymphPressureProfile = lymphPressureProfile;
  lymphHealing.lastBinaryProfile = binaryProfile;
  lymphHealing.lastWaveProfile = waveProfile;

  const lymphPulseIntelligence = computeLymphPulseIntelligence({
    advantageField,
    presenceField,
    computeProfile: lymphComputeProfileV31,
    band,
    errorCount
  });
  lymphHealing.lastLymphPulseIntelligence = lymphPulseIntelligence;

  const intelligentLymphPlan = buildIntelligentLymphPlan({
    job,
    band,
    presenceField,
    advantageField,
    computeProfile: lymphComputeProfileV31
  });
  lymphHealing.lastIntelligentLymphPlan = intelligentLymphPlan;

  // ========================================================================
  // IMMUNE-SAFE VALIDATION
  // ========================================================================

  if (!job || !job.marketplaceId) {
    lymphHealing.lastError = "missing_marketplaceId";
    lymphHealing.executionState = "error";
    lymphHealing.lastJobId = job.id ?? null;
    lymphHealing.lastMarketplaceId = job.marketplaceId ?? null;
    errorCount = 1;

    const pressureTierMissing = classifyPressureTier(presenceField, errorCount);
    lymphHealing.lastPressureTier = pressureTierMissing;

    const lymphPressureProfileMissing = {
      pressureTier: pressureTierMissing,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };
    lymphHealing.lastLymphPressureProfile = lymphPressureProfileMissing;

    const jobSig = buildJobSignature(job, lymphCycle, band, presenceField.presenceTier);
    const mktSig = buildMarketplaceSignature(job.marketplaceId, lymphCycle);
    const hsSig = buildHandshakeSignature(
      job,
      lymphCycle,
      band,
      presenceField.presenceTier,
      pressureTierMissing
    );

    lymphHealing.lastJobSignatureIntel = jobSig.intel;
    lymphHealing.lastJobSignatureClassic = jobSig.classic;
    lymphHealing.lastMarketplaceSignatureIntel = mktSig.intel;
    lymphHealing.lastMarketplaceSignatureClassic = mktSig.classic;
    lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
    lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

    recordLymphAdvantageMemory(job, band, advantageField);

    const failure = {
      success: false,
      error: "Job missing marketplaceId",
      jobId: job.id ?? null,
      marketplaceId: job.marketplaceId ?? null,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      lymphPressureProfile: lymphPressureProfileMissing,
      binaryProfile,
      waveProfile,
      lymphComputeProfileV31,
      lymphPulseIntelligence,
      intelligentLymphPlan,
      deviceCapability,
      cycleIndex: lymphCycle
    };

    lymphHealing.lastResponse = failure;
    return failure;
  }

  lymphHealing.executionState = "dispatching";

  lymphHealing.lastJobId = job.id;
  lymphHealing.lastMarketplaceId = job.marketplaceId;

  const jobSig = buildJobSignature(job, lymphCycle, band, presenceField.presenceTier);
  const mktSig = buildMarketplaceSignature(job.marketplaceId, lymphCycle);

  lymphHealing.lastJobSignatureIntel = jobSig.intel;
  lymphHealing.lastJobSignatureClassic = jobSig.classic;
  lymphHealing.lastMarketplaceSignatureIntel = mktSig.intel;
  lymphHealing.lastMarketplaceSignatureClassic = mktSig.classic;

  const adapter = receptorRegistry[job.marketplaceId];

  if (!adapter) {
    lymphHealing.lastError = "unknown_marketplace";
    lymphHealing.executionState = "error";
    errorCount = 1;

    const pressureTierUnknown = classifyPressureTier(presenceField, errorCount);
    lymphHealing.lastPressureTier = pressureTierUnknown;

    const lymphPressureProfileUnknown = {
      pressureTier: pressureTierUnknown,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };
    lymphHealing.lastLymphPressureProfile = lymphPressureProfileUnknown;

    const hsSig = buildHandshakeSignature(
      job,
      lymphCycle,
      band,
      presenceField.presenceTier,
      pressureTierUnknown
    );
    lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
    lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

    recordLymphAdvantageMemory(job, band, advantageField);

    const failure = {
      success: false,
      error: `Unknown marketplace: ${job.marketplaceId}`,
      jobId: job.id,
      marketplaceId: job.marketplaceId,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      lymphPressureProfile: lymphPressureProfileUnknown,
      binaryProfile,
      waveProfile,
      lymphComputeProfileV31,
      lymphPulseIntelligence,
      intelligentLymphPlan,
      deviceCapability,
      cycleIndex: lymphCycle
    };

    lymphHealing.lastResponse = failure;
    return failure;
  }

  if (typeof adapter.submitResult !== "function") {
    lymphHealing.lastError = "adapter_missing_submitResult";
    lymphHealing.executionState = "error";
    errorCount = 1;

    const pressureTierMissingFn = classifyPressureTier(presenceField, errorCount);
    lymphHealing.lastPressureTier = pressureTierMissingFn;

    const lymphPressureProfileMissingFn = {
      pressureTier: pressureTierMissingFn,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };
    lymphHealing.lastLymphPressureProfile = lymphPressureProfileMissingFn;

    const hsSig = buildHandshakeSignature(
      job,
      lymphCycle,
      band,
      presenceField.presenceTier,
      pressureTierMissingFn
    );
    lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
    lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

    recordLymphAdvantageMemory(job, band, advantageField);

    const failure = {
      success: false,
      error: `Marketplace ${job.marketplaceId} does not support result submission`,
      jobId: job.id,
      marketplaceId: job.marketplaceId,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      lymphPressureProfile: lymphPressureProfileMissingFn,
      binaryProfile,
      waveProfile,
      lymphComputeProfileV31,
      lymphPulseIntelligence,
      intelligentLymphPlan,
      deviceCapability,
      cycleIndex: lymphCycle
    };

    lymphHealing.lastResponse = failure;
    return failure;
  }

  // ========================================================================
  // IMMUNE-SAFE HANDSHAKE (deterministic)
  // ========================================================================

  lymphHealing.lastAdapterUsed = job.marketplaceId;

  const response = adapter.submitResult(job, result);

  lymphHealing.lastResponse = response;
  lymphHealing.lastError = null;

  const hsSig = buildHandshakeSignature(
    job,
    lymphCycle,
    band,
    presenceField.presenceTier,
    pressureTier
  );
  lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
  lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

  recordLymphAdvantageMemory(job, band, advantageField);

  return {
    ...response,
    band,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    hintsField,
    lymphPresenceProfile,
    lymphPressureProfile,
    binaryProfile,
    waveProfile,
    lymphComputeProfileV31,
    lymphPulseIntelligence,
    intelligentLymphPlan,
    deviceCapability,
    cycleIndex: lymphCycle
  };
}

// ============================================================================
// Healing State Export
// ============================================================================

export function getPulseEarnLymphHealingState_v31() {
  return { ...lymphHealing };
}
PulseRealm.EarnLymphNodes = {
  getPulseEarnLymphHealingState_v31,
  submitPulseEarnResult,
  lymphHealing
}