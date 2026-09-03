// ============================================================================
// FILE: PulseEarnMktReceptor-v31-AUCTIONEER-GPU.js
// LAYER: MARKETPLACE RECEPTOR (v31 AUCTIONEER GPU / IMMORTAL-INTEL)
// ROLE:
//   • Canonical marketplace receptor for Pulse‑Earn MKT.
//   • Deterministic, GPU‑forward, binary‑earn aware.
//   • Pure adapter: ping(), fetchJobs(), submitResult(), normalizeJob().
//   • Uses deviceProfile (gpuScore, bandwidthMbps, stabilityScore).
//   • Emits v31 presence/advantage/chunk + A‑B‑A band/binary/wave.
//   • Emits moneySlope + gpuMatchScore + priorityScore for parallel auctioneers.
//   • Zero async, zero IO, zero randomness.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






export const PulseEarnMktReceptorMeta = Object.freeze({
  identity: "PulseEarnMktReceptor",
  version: "v31-AUCTIONEER-GPU-IMMORTAL-INTEL",
  role: "MARKETPLACE_RECEPTOR",
  schemaVersion: "v1",
  guarantees: {
    gpuForward: true,
    binaryEarnAware: true,
    auctioneerReady: true,
    zeroIO: true,
    deterministic: true
  }
});

let receptorConfig = {
  id: "mkt-receptor-v31",
  name: "PulseEarn Mkt Receptor v31",
  healthScore: 1.0,
  band: "binary", // default GPU‑forward
  endpoints: {
    pingSignal: "PING_OK",
    jobs: [],
    submitStatus: "SUBMIT_OK"
  }
};

let receptorCycle = 0;

export const receptorHealingState = {
  lastPingLatency: null,
  lastPingError: null,
  lastFetchCountIn: 0,
  lastFetchCountOut: 0,
  lastFetchError: null,
  lastSubmitJobId: null,
  lastSubmitStatus: null,
  lastSubmitError: null,
  lastNormalizeCount: 0,
  lastNormalizeError: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastBand: "binary",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,
  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,
  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null
};

// ============================================================================
// HASH HELPERS — v31 INTEL
// ============================================================================

function computeHashClassic(str) {
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
  const classicHash = computeHashClassic(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// v31 Presence Field (GPU + mesh + job pressure)
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 220) return "critical";
  if (pressure >= 150) return "high";
  if (pressure >= 80) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(globalHints = {}, cycle, deviceProfile = {}, jobStats = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const gpuScore = Number(deviceProfile.gpuScore || 0);
  const bandwidth = Number(deviceProfile.bandwidthMbps || 0);
  const stability = Number(deviceProfile.stabilityScore || 0.7);

  const jobsIn = Number(jobStats.jobsIn || 0);
  const jobsOut = Number(jobStats.jobsOut || 0);

  const internalComposite =
    cycle * 0.00008 +
    gpuScore * 0.00002 +
    bandwidth * 0.00003 +
    stability * 0.01 +
    jobsIn * 0.0004 +
    jobsOut * 0.0006;

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "mktReceptorPresence",
    version: PulseEarnMktReceptorMeta.version,
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    gpuScore,
    bandwidth,
    stability,
    jobsIn,
    jobsOut,
    cycleIndex: cycle
  };

  const classicString =
    `MKT_RECEPTOR_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("MKT_RECEPTOR_PRESENCE_V31", intelPayload, classicString);

  const field = {
    presenceVersion: PulseEarnMktReceptorMeta.version,
    presenceTier,

    bandPresence: ghP.bandPresence || normalizeBand(receptorConfig.band),
    routerPresence: ghP.routerPresence || "mkt-receptor",
    devicePresence: ghP.devicePresence || "earn-router",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "mkt-receptor-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "mkt-receptor-region",
    castleId: castle.castleId || "mkt-receptor-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    gpuScore,
    bandwidth,
    stability,
    jobsIn,
    jobsOut,
    cycle,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };

  receptorHealingState.lastPresenceField = field;
  return field;
}

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (v31 GPU‑weighted)
// ============================================================================

function buildBinaryField(cfg, cycle, deviceProfile = {}) {
  const jobCount = Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0;
  const healthScore = cfg.healthScore || 1;
  const gpuScore = Number(deviceProfile.gpuScore || 0);

  const patternLen =
    String(cfg.id).length +
    String(cfg.name).length +
    (gpuScore > 0 ? 8 : 0);

  const density =
    patternLen +
    jobCount * 2 +
    healthScore * 120 +
    gpuScore * 0.05 +
    cycle;

  const surface = density + patternLen;

  const intelPayload = {
    kind: "mktReceptorBinarySurface",
    cycleIndex: cycle,
    patternLen,
    density,
    surface,
    jobCount,
    healthScore,
    gpuScore
  };

  const classicString = `MKT_RECEPTOR_BIN::${surface}`;
  const sig = buildDualHashSignature("MKT_RECEPTOR_BIN_V31", intelPayload, classicString);

  const field = {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  receptorHealingState.lastBinaryField = field;
  return field;
}

function buildWaveField(cfg, cycle, band, deviceProfile = {}) {
  const gpuScore = Number(deviceProfile.gpuScore || 0);
  const bandwidth = Number(deviceProfile.bandwidthMbps || 0);
  const healthScore = cfg.healthScore || 1;
  const b = normalizeBand(band || cfg.band);

  const amplitude =
    (healthScore * 120) +
    cycle * (b === "binary" ? 14 : 7) +
    gpuScore * 0.04 +
    bandwidth * 0.03;

  const wavelength = (Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0) + 3;
  const phase = (cfg.id.charCodeAt(0) || 1) % 16;

  const intelPayload = {
    kind: "mktReceptorWaveSurface",
    cycleIndex: cycle,
    band: b,
    amplitude,
    wavelength,
    phase,
    gpuScore,
    bandwidth,
    healthScore
  };

  const classicString = `MKT_RECEPTOR_WAVE::${b}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("MKT_RECEPTOR_WAVE_V31", intelPayload, classicString);

  const field = {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band: b,
    mode: b === "binary" ? "compression-wave" : "symbolic-wave"
  };

  receptorHealingState.lastWaveField = field;
  return field;
}

// ============================================================================
// Advantage‑C v31 (GPU + bandwidth + A‑B‑A + presence)
// ============================================================================

function buildAdvantageField(bandPack, presenceField, deviceProfile = {}, globalHints = {}) {
  const gpuScore = Number(deviceProfile.gpuScore || 0);
  const bandwidth = Number(deviceProfile.bandwidthMbps || 0);

  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    gpuScore * 0.0008 +
    bandwidth * 0.0003 +
    density * 0.000012 +
    amplitude * 0.000012;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.03 :
    presenceField.presenceTier === "high" ? 0.02 :
    presenceField.presenceTier === "elevated" ? 0.013 :
    presenceField.presenceTier === "soft" ? 0.007 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.07) advantageTier = 3;
  else if (advantageScore >= 0.03) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "mktReceptorAdvantage",
    version: "C-31.0",
    gpuScore,
    bandwidth,
    density,
    amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel
  };

  const classicString =
    `MKT_RECEPTOR_ADVANTAGE_V31::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("MKT_RECEPTOR_ADVANTAGE_V31", intelPayload, classicString);

  const field = {
    advantageVersion: "C-31.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };

  receptorHealingState.lastAdvantageField = field;
  return field;
}

// ============================================================================
// Chunk / Cache / Prewarm Plan v31 (Auctioneer‑aware)
// ============================================================================

function buildChunkPrewarmPlan(presenceField, advantageField) {
  const basePriority =
    presenceField.presenceTier === "critical"
      ? 4
      : presenceField.presenceTier === "high"
      ? 3
      : presenceField.presenceTier === "elevated"
      ? 2
      : presenceField.presenceTier === "soft"
      ? 1
      : 0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const priority = basePriority + advantageBoost;

  const intelPayload = {
    kind: "mktReceptorChunkPlan",
    version: PulseEarnMktReceptorMeta.version,
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `MKT_RECEPTOR_CHUNK_PLAN_V31::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("MKT_RECEPTOR_CHUNK_PLAN_V31", intelPayload, classicString);

  const plan = {
    planVersion: PulseEarnMktReceptorMeta.version,
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true,
      auctioneerHints: true
    },
    cache: {
      receptorDiagnostics: true,
      gpuRoutingHints: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true,
      auctioneerLayer: true,
      brokerLayer: true,
      courierLayer: true,
      foragerLayer: true,
      consulateLayer: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };

  receptorHealingState.lastChunkPrewarmPlan = plan;
  return plan;
}

// ============================================================================
// Money Slope + GPU Match + Priority Score (binary‑earn GPU)
// ============================================================================

function computeMoneySlope(job) {
  const payout = Number(job.payout ?? 0);
  const sec = Number(job.estimatedSeconds ?? 0);
  if (payout <= 0 || sec <= 0) return 0;
  return payout / sec;
}

function computeGpuMatchScore(job, deviceProfile = {}) {
  const minGpu = Number(job.minGpuScore ?? 0);
  const gpuScore = Number(deviceProfile.gpuScore || 0);
  if (minGpu <= 0 || gpuScore <= 0) return 0;

  const ratio = gpuScore / minGpu;
  if (ratio < 0.6) return 0;
  if (ratio >= 2.0) return 1.0;
  return (ratio - 0.6) / (2.0 - 0.6);
}

function computePriorityScore(job, deviceProfile = {}) {
  const slope = computeMoneySlope(job);
  if (slope <= 0) return 0;

  const gpuMatch = computeGpuMatchScore(job, deviceProfile);
  const band = job._abaBand || "symbolic";
  const density = Number(job._abaBinaryDensity ?? 0);
  const amp = Number(job._abaWaveAmplitude ?? 0);

  const bandFactor = band === "binary" ? 1.05 : 1.0;
  const binaryFactor = 1.0 + Math.min(density / 1200, 0.04);
  const waveFactor = 1.0 + Math.min(amp / 1200, 0.03);
  const gpuFactor = 1.0 + gpuMatch * 0.5;

  return slope * bandFactor * binaryFactor * waveFactor * gpuFactor;
}

// ============================================================================
// Health Tier
// ============================================================================

function classifyHealth(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.97) return "healthy";
  if (h >= 0.9) return "soft";
  if (h >= 0.6) return "mid";
  if (h >= 0.25) return "hard";
  return "critical";
}

// ============================================================================
// CONFIG OVERRIDE
// ============================================================================

export function configurePulseEarnMktReceptor(config) {
  receptorConfig = {
    ...receptorConfig,
    ...config,
    band: normalizeBand(config.band ?? receptorConfig.band),
    endpoints: {
      ...receptorConfig.endpoints,
      ...(config.endpoints || {})
    }
  };
}

// ============================================================================
// normalizeJob — strict v31 GPU‑aware schema
// ============================================================================

function normalizeJob(raw, deviceProfile = {}, globalHints = {}) {
  receptorHealingState.lastNormalizeCount++;

  if (!raw || typeof raw !== "object") {
    receptorHealingState.lastNormalizeError = "invalid_raw";
    return null;
  }
  if (!raw.id) {
    receptorHealingState.lastNormalizeError = "missing_id";
    return null;
  }

  const payout = Number(raw.payout ?? raw.reward ?? 0);
  if (!Number.isFinite(payout) || payout <= 0) {
    receptorHealingState.lastNormalizeError = "non_positive_payout";
    return null;
  }

  const cpuRequired = Number(raw.cpu ?? raw.cpuRequired ?? 1);
  const memoryRequired = Number(raw.memory ?? raw.memoryRequired ?? 1024);
  const estimatedSeconds = Number(raw.estimatedSeconds ?? raw.duration ?? 600);

  if (
    !Number.isFinite(cpuRequired) || cpuRequired <= 0 ||
    !Number.isFinite(memoryRequired) || memoryRequired <= 0 ||
    !Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0
  ) {
    receptorHealingState.lastNormalizeError = "invalid_resources";
    return null;
  }

  const gpuTierRaw = raw.gpuTier ?? (raw.gpu ? "high" : "low");
  const gpuTier =
    gpuTierRaw === "high" ? "high" :
    gpuTierRaw === "mid" ? "mid" :
    gpuTierRaw === "low" ? "low" :
    "low";

  const minGpuScore =
    gpuTier === "high"
      ? 700
      : gpuTier === "mid"
      ? 450
      : gpuTier === "low"
      ? 250
      : 150;

  const bandwidthNeededMbps = Number(raw.bandwidth ?? raw.bandwidthNeededMbps ?? 5);

  const band = gpuTier === "high" ? "binary" : normalizeBand(receptorConfig.band);
  receptorHealingState.lastBand = band;

  const presenceField = buildPresenceField(globalHints, receptorCycle, deviceProfile, {
    jobsIn: 0,
    jobsOut: 1
  });
  const binaryField = buildBinaryField(receptorConfig, receptorCycle, deviceProfile);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band, deviceProfile);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    deviceProfile,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);

  const normalized = {
    id: String(raw.id),
    marketplaceId: receptorConfig.id,

    payout,
    cpuRequired,
    memoryRequired,
    estimatedSeconds,

    minGpuScore,
    bandwidthNeededMbps,

    _abaBand: band,
    _abaBinaryDensity: binaryField.binarySurface.density,
    _abaWaveAmplitude: waveField.amplitude,

    presenceField,
    advantageField,
    chunkPlan
  };

  const priorityScore = computePriorityScore(normalized, deviceProfile);
  const gpuMatchScore = computeGpuMatchScore(normalized, deviceProfile);
  const moneySlope = computeMoneySlope(normalized);

  receptorHealingState.lastNormalizeError = null;

  return {
    ...normalized,
    moneySlope,
    gpuMatchScore,
    priorityScore
  };
}

// ============================================================================
// ping — v31 GPU‑aware
// ============================================================================

function ping(deviceProfile = {}, globalHints = {}) {
  receptorCycle++;

  const tier = classifyHealth(receptorConfig.healthScore);

  let latency;
  if (tier === "healthy") latency = 8;
  else if (tier === "soft") latency = 40;
  else if (tier === "mid") latency = 120;
  else if (tier === "hard") latency = 260;
  else latency = null;

  const presenceField = buildPresenceField(globalHints, receptorCycle, deviceProfile, {
    jobsIn: 0,
    jobsOut: 0
  });
  const band = normalizeBand(receptorConfig.band);
  receptorHealingState.lastBand = band;

  const binaryField = buildBinaryField(receptorConfig, receptorCycle, deviceProfile);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band, deviceProfile);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    deviceProfile,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);

  const computeProfile = {
    profileVersion: "MKT-RECEPTOR-COMPUTE-31",
    routeBand: band,
    jobCount: Array.isArray(receptorConfig.endpoints.jobs)
      ? receptorConfig.endpoints.jobs.length
      : 0,
    healthScore: receptorConfig.healthScore,
    gpuScore: Number(deviceProfile.gpuScore || 0),
    bandwidth: Number(deviceProfile.bandwidthMbps || 0),
    binaryDensity: binaryField.binarySurface.density,
    waveAmplitude: waveField.amplitude
  };

  const pressureProfile = {
    profileVersion: "MKT-RECEPTOR-PRESSURE-31",
    presenceTier: presenceField.presenceTier,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier
  };

  const triHeartField = {
    triHeartVersion: "MKT-RECEPTOR-TRI-31",
    liveness: {
      alive: latency !== null,
      presenceTier: presenceField.presenceTier
    },
    advantage: {
      advantageTier: advantageField.advantageTier,
      advantageScore: advantageField.advantageScore
    },
    speed: {
      contractionSpeedTier: presenceField.presenceTier
    },
    presence: {
      presenceTier: presenceField.presenceTier
    }
  };

  const sig = buildDualHashSignature(
    "MKT_RECEPTOR_PING_V31",
    { latency, cycleIndex: receptorCycle, receptorId: receptorConfig.id },
    `PING::${latency}::${receptorConfig.id}::CYCLE::${receptorCycle}`
  );

  const bandSig = buildDualHashSignature(
    "MKT_RECEPTOR_BAND_V31",
    { band, receptorId: receptorConfig.id },
    `BAND::${band}::${receptorConfig.id}`
  );

  receptorHealingState.lastPingLatency = latency;
  receptorHealingState.lastPingError = null;
  receptorHealingState.lastPingSignatureIntel = sig.intel;
  receptorHealingState.lastPingSignatureClassic = sig.classic;
  receptorHealingState.lastBandSignatureIntel = bandSig.intel;
  receptorHealingState.lastBandSignatureClassic = bandSig.classic;

  return {
    latency,
    receptorId: receptorConfig.id,
    signature: sig.classic,
    signatureIntel: sig.intel,
    bandSignature: bandSig.classic,
    bandSignatureIntel: bandSig.intel,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    receptorComputeProfile: computeProfile,
    receptorPressureProfile: pressureProfile,
    receptorTriHeartField: triHeartField
  };
}

// ============================================================================
// fetchJobs — v31 GPU‑aware + priority scoring (parallel‑ready)
// ============================================================================

function fetchJobs(deviceProfile = {}, globalHints = {}) {
  receptorCycle++;

  const jobs = receptorConfig.endpoints.jobs;
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const normalizedJobs = safeJobs
    .map(j => normalizeJob(j, deviceProfile, globalHints))
    .filter(j => j !== null);

  const scored = normalizedJobs
    .map(j => ({
      job: j,
      priorityScore: j.priorityScore ?? computePriorityScore(j, deviceProfile)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map(x => ({
      ...x.job,
      priorityScore: x.priorityScore
    }));

  const presenceField = buildPresenceField(globalHints, receptorCycle, deviceProfile, {
    jobsIn: safeJobs.length,
    jobsOut: scored.length
  });
  const band = normalizeBand(receptorConfig.band);
  receptorHealingState.lastBand = band;

  const binaryField = buildBinaryField(receptorConfig, receptorCycle, deviceProfile);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band, deviceProfile);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    deviceProfile,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);

  const computeProfile = {
    profileVersion: "MKT-RECEPTOR-COMPUTE-31",
    routeBand: band,
    jobCount: scored.length,
    healthScore: receptorConfig.healthScore,
    gpuScore: Number(deviceProfile.gpuScore || 0),
    bandwidth: Number(deviceProfile.bandwidthMbps || 0),
    binaryDensity: binaryField.binarySurface.density,
    waveAmplitude: waveField.amplitude
  };

  const pressureProfile = {
    profileVersion: "MKT-RECEPTOR-PRESSURE-31",
    presenceTier: presenceField.presenceTier,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier
  };

  const triHeartField = {
    triHeartVersion: "MKT-RECEPTOR-TRI-31",
    liveness: {
      alive: true,
      presenceTier: presenceField.presenceTier
    },
    advantage: {
      advantageTier: advantageField.advantageTier,
      advantageScore: advantageField.advantageScore
    },
    speed: {
      contractionSpeedTier: presenceField.presenceTier
    },
    presence: {
      presenceTier: presenceField.presenceTier
    }
  };

  const sig = buildDualHashSignature(
    "MKT_RECEPTOR_FETCH_V31",
    { count: scored.length, cycleIndex: receptorCycle, receptorId: receptorConfig.id },
    `JOBS::${scored.length}::${receptorConfig.id}::CYCLE::${receptorCycle}`
  );

  const bandSig = buildDualHashSignature(
    "MKT_RECEPTOR_BAND_V31",
    { band, receptorId: receptorConfig.id },
    `BAND::${band}::${receptorConfig.id}`
  );

  const parallelBatchHint = {
    batchVersion: "MKT-RECEPTOR-PARALLEL-31",
    recommendedBatchSize:
      scored.length >= 16 ? 8 :
      scored.length >= 8 ? 4 :
      scored.length >= 4 ? 2 :
      scored.length > 0 ? 1 : 0,
    gpuScore: Number(deviceProfile.gpuScore || 0),
    bandwidth: Number(deviceProfile.bandwidthMbps || 0)
  };

  receptorHealingState.lastFetchCountIn = safeJobs.length;
  receptorHealingState.lastFetchCountOut = scored.length;
  receptorHealingState.lastFetchError = null;
  receptorHealingState.lastFetchSignatureIntel = sig.intel;
  receptorHealingState.lastFetchSignatureClassic = sig.classic;
  receptorHealingState.lastBandSignatureIntel = bandSig.intel;
  receptorHealingState.lastBandSignatureClassic = bandSig.classic;

  return {
    jobs: scored,
    receptorId: receptorConfig.id,
    signature: sig.classic,
    signatureIntel: sig.intel,
    bandSignature: bandSig.classic,
    bandSignatureIntel: bandSig.intel,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    receptorComputeProfile: computeProfile,
    receptorPressureProfile: pressureProfile,
    receptorTriHeartField: triHeartField,
    parallelBatchHint
  };
}

// ============================================================================
// submitResult — v31 GPU‑aware
// ============================================================================

function submitResult(job, result, deviceProfile = {}, globalHints = {}) {
  receptorCycle++;

  const presenceField = buildPresenceField(globalHints, receptorCycle, deviceProfile, {
    jobsIn: job ? 1 : 0,
    jobsOut: job ? 1 : 0
  });
  const band = normalizeBand(receptorConfig.band);
  receptorHealingState.lastBand = band;

  const binaryField = buildBinaryField(receptorConfig, receptorCycle, deviceProfile);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band, deviceProfile);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    deviceProfile,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);

  const computeProfile = {
    profileVersion: "MKT-RECEPTOR-COMPUTE-31",
    routeBand: band,
    jobCount: Array.isArray(receptorConfig.endpoints.jobs)
      ? receptorConfig.endpoints.jobs.length
      : 0,
    healthScore: receptorConfig.healthScore,
    gpuScore: Number(deviceProfile.gpuScore || 0),
    bandwidth: Number(deviceProfile.bandwidthMbps || 0),
    binaryDensity: binaryField.binarySurface.density,
    waveAmplitude: waveField.amplitude
  };

  const pressureProfile = {
    profileVersion: "MKT-RECEPTOR-PRESSURE-31",
    presenceTier: presenceField.presenceTier,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier
  };

  const triHeartField = {
    triHeartVersion: "MKT-RECEPTOR-TRI-31",
    liveness: {
      alive: true,
      presenceTier: presenceField.presenceTier
    },
    advantage: {
      advantageTier: advantageField.advantageTier,
      advantageScore: advantageField.advantageScore
    },
    speed: {
      contractionSpeedTier: presenceField.presenceTier
    },
    presence: {
      presenceTier: presenceField.presenceTier
    }
  };

  if (!job || !job.id) {
    const sig = buildDualHashSignature(
      "MKT_RECEPTOR_SUBMIT_V31",
      { jobId: null, cycleIndex: receptorCycle, receptorId: receptorConfig.id, ok: false },
      `SUBMIT::NONE::INVALID::${receptorConfig.id}::CYCLE::${receptorCycle}`
    );

    const bandSig = buildDualHashSignature(
      "MKT_RECEPTOR_BAND_V31",
      { band, receptorId: receptorConfig.id },
      `BAND::${band}::${receptorConfig.id}`
    );

    receptorHealingState.lastSubmitJobId = null;
    receptorHealingState.lastSubmitStatus = "invalid_job";
    receptorHealingState.lastSubmitError = "invalid_job";
    receptorHealingState.lastSubmitSignatureIntel = sig.intel;
    receptorHealingState.lastSubmitSignatureClassic = sig.classic;
    receptorHealingState.lastBandSignatureIntel = bandSig.intel;
    receptorHealingState.lastBandSignatureClassic = bandSig.classic;

    return {
      success: false,
      error: "invalid_job",
      receptorId: receptorConfig.id,
      signature: sig.classic,
      signatureIntel: sig.intel,
      bandSignature: bandSig.classic,
      bandSignatureIntel: bandSig.intel,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      receptorComputeProfile: computeProfile,
      receptorPressureProfile: pressureProfile,
      receptorTriHeartField: triHeartField
    };
  }

  const status = receptorConfig.endpoints.submitStatus;

  const sig = buildDualHashSignature(
    "MKT_RECEPTOR_SUBMIT_V31",
    { jobId: job.id, cycleIndex: receptorCycle, receptorId: receptorConfig.id, status },
    `SUBMIT::${job.id}::${status}::${receptorConfig.id}::CYCLE::${receptorCycle}`
  );

  const bandSig = buildDualHashSignature(
    "MKT_RECEPTOR_BAND_V31",
    { band, receptorId: receptorConfig.id },
    `BAND::${band}::${receptorConfig.id}`
  );

  receptorHealingState.lastSubmitJobId = job.id;
  receptorHealingState.lastSubmitStatus = status;
  receptorHealingState.lastSubmitError = null;
  receptorHealingState.lastSubmitSignatureIntel = sig.intel;
  receptorHealingState.lastSubmitSignatureClassic = sig.classic;
  receptorHealingState.lastBandSignatureIntel = bandSig.intel;
  receptorHealingState.lastBandSignatureClassic = bandSig.classic;

  return {
    success: true,
    receptorId: receptorConfig.id,
    jobId: job.id,
    result,
    status,
    signature: sig.classic,
    signatureIntel: sig.intel,
    bandSignature: bandSig.classic,
    bandSignatureIntel: bandSig.intel,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    receptorComputeProfile: computeProfile,
    receptorPressureProfile: pressureProfile,
    receptorTriHeartField: triHeartField
  };
}

// ============================================================================
// HEALING / DIAGNOSTICS
// ============================================================================

export function getPulseEarnMktReceptorHealingState() {
  return {
    meta: PulseEarnMktReceptorMeta,
    cycleIndex: receptorCycle,
    ...receptorHealingState
  };
}

// ============================================================================
// PUBLIC EXPORT — v31 AUCTIONEER GPU RECEPTOR
// ============================================================================

export const PulseEarnMktReceptor_v31 = {
  id: () => receptorConfig.id,
  name: () => receptorConfig.name,

  ping,
  fetchJobs,
  submitResult,
  normalizeJob,

  diagnostics(deviceProfile = {}, globalHints = {}) {
    const presenceField = buildPresenceField(globalHints, receptorCycle, deviceProfile, {
      jobsIn: 0,
      jobsOut: 0
    });
    const band = normalizeBand(receptorConfig.band);
    receptorHealingState.lastBand = band;

    const binaryField = buildBinaryField(receptorConfig, receptorCycle, deviceProfile);
    const waveField = buildWaveField(receptorConfig, receptorCycle, band, deviceProfile);

    const advantageField = buildAdvantageField(
      { band, binaryField, waveField },
      presenceField,
      deviceProfile,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);

    const computeProfile = {
      profileVersion: "MKT-RECEPTOR-COMPUTE-31",
      routeBand: band,
      jobCount: Array.isArray(receptorConfig.endpoints.jobs)
        ? receptorConfig.endpoints.jobs.length
        : 0,
      healthScore: receptorConfig.healthScore,
      gpuScore: Number(deviceProfile.gpuScore || 0),
      bandwidth: Number(deviceProfile.bandwidthMbps || 0),
      binaryDensity: binaryField.binarySurface.density,
      waveAmplitude: waveField.amplitude
    };

    const pressureProfile = {
      profileVersion: "MKT-RECEPTOR-PRESSURE-31",
      presenceTier: presenceField.presenceTier,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier
    };

    const triHeartField = {
      triHeartVersion: "MKT-RECEPTOR-TRI-31",
      liveness: {
        alive: true,
        presenceTier: presenceField.presenceTier
      },
      advantage: {
        advantageTier: advantageField.advantageTier,
        advantageScore: advantageField.advantageScore
      },
      speed: {
        contractionSpeedTier: presenceField.presenceTier
      },
      presence: {
        presenceTier: presenceField.presenceTier
      }
    };

    return {
      receptorId: receptorConfig.id,
      presenceField,
      advantageField,
      chunkPlan,
      binaryField,
      waveField,
      receptorComputeProfile: computeProfile,
      receptorPressureProfile: pressureProfile,
      receptorTriHeartField: triHeartField,
      healingState: getPulseEarnMktReceptorHealingState()
    };
  }
};


PulseRealm.PulseEarnMktReceptor = {
  PulseEarnMktReceptor_v31,
  PulseEarnMktReceptorMeta
}
