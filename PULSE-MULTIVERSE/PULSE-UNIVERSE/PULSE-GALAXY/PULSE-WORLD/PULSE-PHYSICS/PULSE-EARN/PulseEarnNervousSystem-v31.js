// ============================================================================
//  PulseEarnNervousSystem-v31-Immortal-INTEL-GPU-SMART.js
//  THE NERVOUS SYSTEM + EXCHANGE OFFICE (v31 IMMORTAL INTEL GPU-SMART)
//  Skeletal-aware Job Intake + Result Forwarding + Reputation Updating
//  Dual-Band + Dual-Hash + Binary + Wave + Presence + Chunk/Prewarm (IMMORTAL)
//  + NervousComputeProfile v31 + NervousPressureProfile v31
//  + Tri-Heart Overlays v31 + GPU-SMART metadata (no GPU compute)
// ============================================================================

import {
  updateMarketplaceReputation,
  computeReputationSignals
} from "./PulseEarnEndocrineSystem-v31.js";

import { getNextJob } from "./PulseEarnCirculatorySystem-v31.js";
import { getPulseEarnDeviceProfile } from "./PulseEarnSkeletalSystem-v30.js";
import { submitPulseEarnResult as sendResultToMarketplace } from "./PulseEarnLymphNodes-v31.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// Healing Metadata — Neural Activity Log (v31 IMMORTAL INTEL GPU-SMART)
// ============================================================================
export const nervousHealing = {
  lastFetchError: null,
  lastSubmitError: null,
  lastJobId: null,
  lastMarketplaceId: null,

  lastNervousSignature: null,
  lastJobIntakeSignature: null,
  lastResultForwardSignature: null,

  lastDevicePattern: null,
  lastJobPattern: null,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  },

  // Dual-Band + Binary + Wave + Presence
  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  // dual-hash / intel surfaces
  lastDualHash: null,
  lastIntelHash: null,
  lastIntelContext: null,

  // Skeletal awareness
  lastSkeletalAdvantageField: null,
  lastSkeletalChunkField: null,

  // v31 nervous overlays
  lastNervousComputeProfile: null,
  lastNervousPressureProfile: null,

  // v31 tri-heart overlays
  triHeartLiveness: null,
  triHeartAdvantage: null,
  triHeartSpeed: null,
  triHeartPresence: null
};

// ============================================================================
// Deterministic Hash Helpers (dual-hash + intel) — v31
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
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash,
    primary: classicHash
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Device Pattern (v31 GPU-SMART)
// ============================================================================
function buildDevicePattern(device) {
  return (
    `DEVICE31::cpu:${device.cpuCores}` +
    `::mem:${device.memoryMB}` +
    `::gpu:${device.gpuScore}` +
    `::gpuRam:${device.gpuRam}` +
    `::tier:${device.capabilityTier}` +
    `::bw:${device.bandwidthMbps}` +
    `::stab:${device.stabilityScore}` +
    `::band:${device.band}` +
    `::presence:${device.presenceBand}`
  );
}

// ============================================================================
// Job Pattern (v31)
// ============================================================================
function buildJobPattern(job) {
  if (!job) return "JOB31::NONE";
  return (
    `JOB31::${job.id}` +
    `::market:${job.marketplaceId}` +
    `::cpu:${job.cpuRequired ?? 0}` +
    `::mem:${job.memoryRequired ?? 0}` +
    `::sec:${job.estimatedSeconds ?? 0}`
  );
}

// ============================================================================
// Binary + Wave Surfaces — v31
// ============================================================================
function buildNervousBandBinaryWave(job, result, cycleIndex, device) {
  const band = normalizeBand(
    result.band ||
      job.band ||
      job.meta.band ||
      device.band ||
      "symbolic"
  );
  nervousHealing.lastBand = band;

  const bandSigPayload = {
    band,
    cycleIndex,
    jobId: job.id || null,
    marketplaceId: job.marketplaceId || null
  };
  const bandDual = buildDualHashSignature(
    "NERVOUS_BAND_V31",
    bandSigPayload,
    `${band}::${cycleIndex}::${job.id || "NONE"}`
  );
  const bandSignature = bandDual.primary;

  nervousHealing.lastBandSignature = bandSignature;
  nervousHealing.lastDualHash = bandDual.primary;
  nervousHealing.lastIntelHash = bandDual.intel;
  nervousHealing.lastIntelContext = bandSigPayload;

  const jobIdLength = (job.id || "").length;
  const marketplaceLength = (job.marketplaceId || "").length;
  const gpuScore = device.gpuScore || 0;

  const surface =
    jobIdLength +
    marketplaceLength +
    gpuScore +
    cycleIndex +
    (device.capabilityScore || 0) * 0.001;

  const binaryField = {
    binaryNervousSignature: computeHash(`BNERV_V31::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_NERV_V31::${surface}`),
    binarySurface: {
      jobIdLength,
      marketplaceLength,
      gpuScore,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: marketplaceLength + gpuScore,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  nervousHealing.lastBinaryField = binaryField;

  const waveField = {
    amplitude: marketplaceLength + gpuScore,
    wavelength: cycleIndex || 1,
    phase: (marketplaceLength + cycleIndex + gpuScore) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  nervousHealing.lastWaveField = waveField;

  return { band, bandSignature, binaryField, waveField, bandDual };
}

// ============================================================================
// Presence Field — v31 (GPU-SMART)
// ============================================================================
function buildNervousPresenceField(job, device, cycleIndex) {
  const jobLen = (job.id || "").length;
  const marketLen = (job.marketplaceId || "").length;
  const stability = device.stabilityScore ?? 0.7;

  const magnitude = jobLen + marketLen + device.capabilityScore * 0.001;

  let presenceTier = "presence_idle";
  if (magnitude >= 80) presenceTier = "presence_critical";
  else if (magnitude >= 40) presenceTier = "presence_high";
  else if (magnitude >= 15) presenceTier = "presence_elevated";
  else if (magnitude > 0) presenceTier = "presence_soft";

  const payload = {
    presenceTier,
    jobLen,
    marketLen,
    stability,
    cycleIndex,
    capabilityTier: device.capabilityTier,
    gpuScore: device.gpuScore,
    gpuRam: device.gpuRam
  };
  const sig = buildDualHashSignature(
    "NERV_PRESENCE_V31",
    payload,
    `${presenceTier}::${jobLen}::${marketLen}`
  );

  const presenceField = {
    presenceVersion: "v31-Immortal-INTEL-GPU-SMART",
    presenceTier,
    jobLen,
    marketLen,
    stability,
    cycleIndex,
    capabilityTier: device.capabilityTier,
    gpuScore: device.gpuScore,
    gpuRam: device.gpuRam,
    presenceSignature: sig.primary,
    presenceIntelSignature: sig.intel
  };

  nervousHealing.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// Advantage Field — v31 (GPU-SMART)
// ============================================================================
function buildNervousAdvantageField(job, device, bandPack, presenceField) {
  const gpuScore = device.gpuScore || 0;
  const bandwidth = device.bandwidthMbps || 0;
  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const skeletalAdv = device.advantageField || null;
  nervousHealing.lastSkeletalAdvantageField = skeletalAdv || null;

  const skeletalScore = skeletalAdv.advantageScore ?? 0;

  const combinedScore =
    skeletalScore +
    gpuScore * 0.0003 +
    bandwidth * 0.0001 +
    density * 0.00002 +
    amplitude * 0.00002 +
    (device.capabilityScore || 0) * 0.0001;

  const payload = {
    band: bandPack.band,
    gpuScore,
    bandwidth,
    density,
    amplitude,
    presenceTier: presenceField.presenceTier,
    skeletalAdvantageScore: skeletalScore,
    combinedScore,
    capabilityTier: device.capabilityTier
  };
  const sig = buildDualHashSignature(
    "NERV_ADV_V31",
    payload,
    `${bandPack.band}::${combinedScore}`
  );

  const advantageField = {
    advantageVersion: "NERV-ADV-31.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    skeletalAdvantageScore: skeletalScore,
    combinedAdvantageScore: combinedScore,
    capabilityTier: device.capabilityTier,
    advantageSignature: sig.primary,
    advantageIntelSignature: sig.intel
  };

  nervousHealing.lastAdvantageField = advantageField;
  return advantageField;
}

// ============================================================================
// Chunk / Cache / Prewarm Plan — v31
// ============================================================================
function buildNervousChunkPrewarmPlan(job, device, presenceField) {
  let priorityLabel = "normal";
  if (presenceField.presenceTier === "presence_critical") priorityLabel = "critical";
  else if (presenceField.presenceTier === "presence_high") priorityLabel = "high";
  else if (presenceField.presenceTier === "presence_elevated") priorityLabel = "medium";
  else if (presenceField.presenceTier === "presence_soft") priorityLabel = "low";

  const skeletalChunk = device.chunkField || null;
  nervousHealing.lastSkeletalChunkField = skeletalChunk;

  const payload = {
    priorityLabel,
    presenceTier: presenceField.presenceTier,
    jobId: job.id || null,
    marketplaceId: job.marketplaceId || null,
    skeletalChunkSurface: skeletalChunk.surface ?? null,
    skeletalChunkBudgetKB: skeletalChunk.chunkBudgetKB ?? null
  };
  const sig = buildDualHashSignature(
    "NERV_CHUNK_V31",
    payload,
    `${priorityLabel}::${presenceField.presenceTier}`
  );

  const plan = {
    planVersion: "v31-ChunkPlan-GPU-SMART",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    chunks: {
      jobEnvelope: true,
      metabolismBlueprint: true,
      marketplaceHandshake: true
    },
    cache: {
      deviceProfile: true,
      nervousDiagnostics: true,
      skeletalProfile: true
    },
    prewarm: {
      survivalInstincts: true,
      circulatorySystem: presenceField.presenceTier !== "presence_idle",
      lymphNodes: presenceField.presenceTier !== "presence_idle"
    },
    skeletalChunkField: skeletalChunk,
    chunkSignature: sig.primary,
    chunkIntelSignature: sig.intel
  };

  nervousHealing.lastChunkPrewarmPlan = plan;
  return plan;
}

// ============================================================================
// Nervous Compute Profile — v31 GPU-SMART
// ============================================================================
function buildNervousComputeProfile(device, bandPack) {
  const gpuScore = device.gpuScore || 0;
  const bandwidth = device.bandwidthMbps || 0;

  const computeTier =
    gpuScore >= 9000 ? "tier_immortal" :
    gpuScore >= 7000 ? "tier_elite" :
    gpuScore >= 4000 ? "tier_high" :
    gpuScore >= 1500 ? "tier_mid" :
    "tier_low";

  const profile = {
    profileVersion: "NERV-COMPUTE-31-GPU-SMART",
    routeBand: bandPack.band,
    gpuScore,
    gpuRam: device.gpuRam,
    bandwidthMbps: bandwidth,
    computeTier,
    capabilityTier: device.capabilityTier,
    capabilityScore: device.capabilityScore,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude
  };

  nervousHealing.lastNervousComputeProfile = profile;
  return profile;
}

// ============================================================================
// Nervous Pressure Profile — v31
// ============================================================================
function buildNervousPressureProfile(presenceField, advantageField) {
  const magnitude =
    (presenceField.jobLen || 0) +
    (presenceField.marketLen || 0) +
    (advantageField.combinedAdvantageScore || 0);

  let pressureTier = "pressure_idle";
  if (magnitude >= 120) pressureTier = "pressure_critical";
  else if (magnitude >= 60) pressureTier = "pressure_high";
  else if (magnitude >= 25) pressureTier = "pressure_elevated";
  else if (magnitude > 0) pressureTier = "pressure_soft";

  const profile = {
    profileVersion: "NERV-PRESSURE-31",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    combinedAdvantageScore: advantageField.combinedAdvantageScore || 0,
    jobLen: presenceField.jobLen || 0,
    marketLen: presenceField.marketLen || 0
  };

  nervousHealing.lastNervousPressureProfile = profile;
  return profile;
}

// ============================================================================
// Tri-Heart Fields — v31
// ============================================================================
function buildTriHeartFields(presenceField, advantageField) {
  const liveness = {
    triHeartVersion: "NERV-TRI-31",
    alive: true,
    presenceTier: presenceField.presenceTier
  };

  const advantage = {
    triHeartVersion: "NERV-TRI-31",
    combinedAdvantageScore: advantageField.combinedAdvantageScore ?? 0,
    skeletalAdvantageScore: advantageField.skeletalAdvantageScore ?? 0
  };

  const speed = {
    triHeartVersion: "NERV-TRI-31",
    routingSpeedTier: presenceField.presenceTier,
    routingContinuity: nervousHealing.loopTheory.pulseComputeContinuity
  };

  const presence = {
    triHeartVersion: "NERV-TRI-31",
    presenceTier: presenceField.presenceTier,
    capabilityTier: presenceField.capabilityTier
  };

  nervousHealing.triHeartLiveness = liveness;
  nervousHealing.triHeartAdvantage = advantage;
  nervousHealing.triHeartSpeed = speed;
  nervousHealing.triHeartPresence = presence;

  return { liveness, advantage, speed, presence };
}

// ============================================================================
// fetchJobFromMarketplace — v31 Sensory Intake
// ============================================================================
export function fetchJobFromMarketplace() {
  nervousHealing.cycleCount++;

  try {
    const device = getPulseEarnDeviceProfile();
    const devicePattern = buildDevicePattern(device);
    nervousHealing.lastDevicePattern = devicePattern;

    const job = getNextJob(device);

    if (job) {
      nervousHealing.lastJobId = job.id;
      nervousHealing.lastMarketplaceId = job.marketplaceId;
      nervousHealing.lastJobPattern = buildJobPattern(job);

      const intakeSig = buildDualHashSignature(
        "NERV_JOB_INTAKE_V31",
        {
          jobId: job.id,
          marketplaceId: job.marketplaceId,
          cycle: nervousHealing.cycleCount
        },
        `${job.id}::${job.marketplaceId}::${nervousHealing.cycleCount}`
      );
      nervousHealing.lastJobIntakeSignature = intakeSig.primary;

      const bandPack = buildNervousBandBinaryWave(
        job,
        null,
        nervousHealing.cycleCount,
        device
      );
      const presenceField = buildNervousPresenceField(
        job,
        device,
        nervousHealing.cycleCount
      );
           const advantageField = buildNervousAdvantageField(
        job,
        device,
        bandPack,
        presenceField
      );

      const chunkPrewarmPlan = buildNervousChunkPrewarmPlan(
        job,
        device,
        presenceField
      );

      const nervousComputeProfile = buildNervousComputeProfile(
        device,
        bandPack
      );

      const nervousPressureProfile = buildNervousPressureProfile(
        presenceField,
        advantageField
      );

      const triHeart = buildTriHeartFields(
        presenceField,
        advantageField
      );

      return {
        job,
        band: bandPack.band,
        bandSignature: bandPack.bandSignature,
        binaryField: bandPack.binaryField,
        waveField: bandPack.waveField,
        presenceField,
        advantageField,
        chunkPrewarmPlan,
        nervousComputeProfile,
        nervousPressureProfile,
        triHeartLivenessField: triHeart.liveness,
        triHeartAdvantageField: triHeart.advantage,
        triHeartSpeedField: triHeart.speed,
        triHeartPresenceField: triHeart.presence,
        dualHash: nervousHealing.lastDualHash,
        intelHash: nervousHealing.lastIntelHash
      };
    }

    return null;
  } catch (err) {
    nervousHealing.lastFetchError = err && err.message ? err.message : String(err);
    return null;
  }
}

// ============================================================================
// getNextMarketplaceJob — v31 Neural Encoding Layer
// ============================================================================
export function getNextMarketplaceJob(deviceId) {
  const intake = fetchJobFromMarketplace();
  if (!intake || !intake.job) return null;

  const job = intake.job;

  if (!job.id || !job.marketplaceId) {
    nervousHealing.lastFetchError = "invalid_job_structure";
    return null;
  }

  return {
    id: job.id,

    payload: {
      type: "marketplace-job",
      data: {
        marketplaceId: job.marketplaceId,
        cpuRequired: job.cpuRequired ?? 0,
        memoryRequired: job.memoryRequired ?? 0,
        estimatedSeconds: job.estimatedSeconds ?? 0
      },
      gpu: {
        workgroupSize: 1,
        iterations: 1,
        shader: ""
      }
    },

    marketplace: job.marketplaceId,
    assignedTo: deviceId,

    cycleIndex: nervousHealing.cycleCount,

    band: intake.band,
    bandSignature: intake.bandSignature,
    binaryField: intake.binaryField,
    waveField: intake.waveField,
    presenceField: intake.presenceField,
    advantageField: intake.advantageField,
    chunkPrewarmPlan: intake.chunkPrewarmPlan,
    nervousComputeProfile: intake.nervousComputeProfile,
    nervousPressureProfile: intake.nervousPressureProfile,
    triHeartLivenessField: intake.triHeartLivenessField,
    triHeartAdvantageField: intake.triHeartAdvantageField,
    triHeartSpeedField: intake.triHeartSpeedField,
    triHeartPresenceField: intake.triHeartPresenceField,

    dualHash: intake.dualHash,
    intelHash: intake.intelHash
  };
}

// ============================================================================
// submitMarketplaceResult — v31 Motor Output + Synaptic Update
// ============================================================================
export function submitMarketplaceResult(job, result) {
  try {
    if (!job || !job.marketplaceId) {
      nervousHealing.lastSubmitError = "invalid_job_for_submission";
      return null;
    }

    const device = getPulseEarnDeviceProfile();

    const signals = computeReputationSignals({
      latencyMs: result.latencyMs ?? 0,
      apiErrors: result.apiErrors ?? 0,
      jobsReturned: result.jobsReturned ?? 0,
      profitableJobs: result.profitableJobs ?? 0,
      jobSuccessRate: result.jobSuccessRate ?? 0,
      avgProfitPerJob: result.avgProfitPerJob ?? 0
    });

    updateMarketplaceReputation(job.marketplaceId, signals);

    const submission = sendResultToMarketplace(job, result);

    const forwardSig = buildDualHashSignature(
      "NERV_RESULT_FORWARD_V31",
      {
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        jobSuccessRate: result.jobSuccessRate ?? 0
      },
      `${job.id}::${job.marketplaceId}`
    );
    nervousHealing.lastResultForwardSignature = forwardSig.primary;

    const bandPack = buildNervousBandBinaryWave(
      job,
      result,
      nervousHealing.cycleCount,
      device
    );

    const presenceField = buildNervousPresenceField(
      job,
      device,
      nervousHealing.cycleCount
    );

    const advantageField = buildNervousAdvantageField(
      job,
      device,
      bandPack,
      presenceField
    );

    const chunkPrewarmPlan = buildNervousChunkPrewarmPlan(
      job,
      device,
      presenceField
    );

    const nervousComputeProfile = buildNervousComputeProfile(
      device,
      bandPack
    );

    const nervousPressureProfile = buildNervousPressureProfile(
      presenceField,
      advantageField
    );

    const triHeart = buildTriHeartFields(
      presenceField,
      advantageField
    );

    return {
      submission,
      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,
      presenceField,
      advantageField,
      chunkPrewarmPlan,
      nervousComputeProfile,
      nervousPressureProfile,
      triHeartLivenessField: triHeart.liveness,
      triHeartAdvantageField: triHeart.advantage,
      triHeartSpeedField: triHeart.speed,
      triHeartPresenceField: triHeart.presence,
      dualHash: nervousHealing.lastDualHash,
      intelHash: nervousHealing.lastIntelHash
    };
  } catch (err) {
    nervousHealing.lastSubmitError = err && err.message ? err.message : String(err);
    return null;
  }
}

// ============================================================================
// Nervous System Signature — v31 dual-hash
// ============================================================================
function buildNervousSignature() {
  const payload = {
    lastJobId: nervousHealing.lastJobId,
    lastMarketplaceId: nervousHealing.lastMarketplaceId,
    cycleCount: nervousHealing.cycleCount
  };
  const sig = buildDualHashSignature(
    "NERV_SYSTEM_V31",
    payload,
    JSON.stringify(payload)
  );
  return { primary: sig.primary, intel: sig.intel };
}

// ============================================================================
// Export Healing Metadata — Nervous System Health Report (v31)
// ============================================================================
export function getPulseEarnNervousSystemHealingState_v31() {
  const sig = buildNervousSignature();
  nervousHealing.lastNervousSignature = sig.primary;
  nervousHealing.lastIntelHash = sig.intel;
  return { ...nervousHealing };
}

PulseRealm.EarnNervousSystem = {
  getPulseEarnNervousSystemHealingState_v31,
  submitMarketplaceResult,
  getNextMarketplaceJob,
  fetchJobFromMarketplace,
  nervousHealing
}