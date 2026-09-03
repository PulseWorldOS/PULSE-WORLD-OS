// ============================================================================
// FILE: .../PulseEarnMktBroker-v30-IMMORTAL-BINARYWAVE.js
// LAYER: RUNPOD BROKER (v30‑IMMORTAL‑BINARYWAVE‑INTEL‑DUALHASH)
// ROLE:
//   • Deterministic RunPod → Pulse‑Earn broker.
//   • registerDevice(), requestJob(), submitJob(), normalizeJob().
//   • GPU‑aware band (binary vs symbolic) + BinaryWave carrier.
//   • A‑B‑A binaryField + waveField + presence/advantage/chunk surfaces.
//   • Dual INTEL + classic signatures for all broker events.
//   • Zero async, zero randomness, zero timestamps.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});







export const RUNPOD_RECEPTOR_DNA = {
  version: "v30-IMMORTAL-BINARYWAVE",
  receptorType: "runpod",
  jobs: [
    { id: "ping", payload: { type: "ping" } },
    { id: "fetch", payload: { type: "fetch" } },
    { id: "submit", payload: { type: "submit" } }
  ]
};

// ============================================================================
// HASH HELPERS — v30‑IMMORTAL‑BINARYWAVE
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
    classic: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function buildBandSignature(band, cycleIndex) {
  const bandNorm = normalizeBand(band);
  const intelPayload = {
    kind: "runpodBand-v30",
    band: bandNorm,
    cycleIndex
  };
  const classicString = `RUNPOD_BAND_V30::${bandNorm}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_BAND_V30", intelPayload, classicString);
}

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (v30)
// ============================================================================

function buildBinaryField(cycle, gpuTier) {
  const basePattern = gpuTier === "elite" || gpuTier === "high" ? 16 : 12;
  const patternLen = basePattern;
  const density = patternLen + cycle * (gpuTier === "none" ? 2 : 4);
  const surface = density + patternLen;

  const intelPayload = {
    kind: "runpodBinarySurface-v30",
    patternLen,
    density,
    surface,
    cycleIndex: cycle,
    gpuTier
  };
  const classicString = `BRUNPOD_V30::${surface}::GPU_TIER::${gpuTier}`;
  const sig = buildDualHashSignature("BRUNPOD_V30", intelPayload, classicString);

  return {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      surface,
      gpuTier
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(cycle, band, gpuTier) {
  const ampBase = (cycle + 1) * (band === "binary" ? 10 : 6);
  const gpuBoost =
    gpuTier === "elite" ? 10 :
    gpuTier === "high" ? 6 :
    gpuTier === "medium" ? 3 :
    0;

  const amplitude = ampBase + gpuBoost;
  const wavelength = amplitude + 3;
  const phase = amplitude % 16;

  const intelPayload = {
    kind: "runpodWaveSurface-v30",
    band,
    amplitude,
    wavelength,
    phase,
    cycleIndex: cycle,
    gpuTier
  };
  const classicString = `BRUNPOD_WAVE_V30::${band}::AMP::${amplitude}::GPU_TIER::${gpuTier}`;
  const sig = buildDualHashSignature("BRUNPOD_WAVE_V30", intelPayload, classicString);

  return {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    gpuTier
  };
}

// ============================================================================
// Presence Field (v30‑IMMORTAL‑BINARYWAVE)
// ============================================================================

function buildPresenceField(jobOrRaw, device, cycle) {
  const idLen = (jobOrRaw.id || "").length;
  const typeLen = (jobOrRaw.priority || "").length;
  const stability = device.stabilityScore || 0.7;

  const composite =
    idLen * 0.001 +
    typeLen * 0.001 +
    stability * 0.01;

  const presenceTier =
    composite >= 0.02 ? "presence_high" :
    composite >= 0.005 ? "presence_mid" :
    "presence_low";

  const intelPayload = {
    kind: "runpodPresence-v30",
    presenceVersion: "v30-IMMORTAL-BINARYWAVE",
    presenceTier,
    idLen,
    typeLen,
    stability,
    cycleIndex: cycle
  };

  const classicString =
    `RUNPOD_PRESENCE_V30::${presenceTier}::${idLen}::${typeLen}::${cycle}`;

  const sig = buildDualHashSignature("RUNPOD_PRESENCE_V30", intelPayload, classicString);

  return {
    presenceVersion: "v30-IMMORTAL-BINARYWAVE",
    presenceTier,
    idLen,
    typeLen,
    stability,
    cycle,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// Advantage‑C Field (v30.0) — GPU‑forward
// ============================================================================

function buildAdvantageField(jobOrRaw, device, bandPack, presenceField) {
  const gpuScore = device.gpuScore || 0;
  const bandwidth = device.bandwidthMbps || 0;
  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const advantageScore =
    gpuScore * 0.0009 +
    bandwidth * 0.0003 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (presenceField.presenceTier === "presence_high" ? 0.015 : 0);

  const intelPayload = {
    kind: "runpodAdvantage-v30",
    advantageVersion: "C-30.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore
  };

  const classicString =
    `RUNPOD_ADVANTAGE_V30::${bandPack.band}::GPU:${gpuScore}::BW:${bandwidth}`;

  const sig = buildDualHashSignature("RUNPOD_ADVANTAGE_V30", intelPayload, classicString);

  return {
    advantageVersion: "C-30.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan (v30)
// ============================================================================

function buildChunkPrewarmPlan(jobOrRaw, device, presenceField) {
  const basePriority =
    presenceField.presenceTier === "presence_high"
      ? 3
      : presenceField.presenceTier === "presence_mid"
      ? 2
      : 1;

  const gpuBoost =
    (device.gpuScore || 0) > 800 ? 3 :
    (device.gpuScore || 0) > 500 ? 2 :
    (device.gpuScore || 0) > 300 ? 1 :
    0;

  const priority = basePriority + gpuBoost;

  const intelPayload = {
    kind: "runpodChunkPrewarmPlan-v30",
    planVersion: "v30-IMMORTAL-BINARYWAVE",
    priority,
    presenceTier: presenceField.presenceTier,
    gpuScore: device.gpuScore || 0
  };

  const classicString =
    `RUNPOD_CHUNK_PLAN_V30::PTIER:${presenceField.presenceTier}::PRIORITY:${priority}`;

  const sig = buildDualHashSignature("RUNPOD_CHUNK_PLAN_V30", intelPayload, classicString);

  return {
    planVersion: "v30-IMMORTAL-BINARYWAVE",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true
    },
    cache: {
      deviceProfile: true,
      brokerDiagnostics: true
    },
    prewarm: {
      nervousSystem: presenceField.presenceTier !== "presence_low",
      muscleSystem: presenceField.presenceTier !== "presence_low",
      lymphNodes: presenceField.presenceTier !== "presence_low"
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// BinaryWave Carrier (v30)
// ============================================================================

function classifyGpuTierFromDevice(deviceProfile = {}) {
  const ram = safeNumber(deviceProfile.gpuRam, 0);
  if (ram >= 24) return "elite";
  if (ram >= 16) return "high";
  if (ram >= 8) return "medium";
  if (ram > 0) return "low";
  return "none";
}

function buildBinaryWaveCarrier(band, presenceField, deviceProfile, cycleIndex) {
  const gpuTier = classifyGpuTierFromDevice(deviceProfile);
  const gpuPressure = clamp01((deviceProfile.gpuScore || 0) / 1200);

  const mode =
    band === "binary"
      ? (gpuTier === "elite" || gpuTier === "high"
          ? "burst"
          : gpuTier === "medium"
          ? "deep"
          : "base")
      : "symbolic";

  const carrier = {
    version: "BinaryWave-v30",
    band,
    mode,
    gpuTier,
    gpuPressure,
    presenceTier: presenceField.presenceTier,
    cycleIndex
  };

  const intelPayload = {
    kind: "runpodBinaryWave-v30",
    band,
    mode,
    gpuTier,
    gpuPressure,
    presenceTier: presenceField.presenceTier,
    cycleIndex
  };

  const classicString =
    `RUNPOD_BINARYWAVE_V30::${band}::GPU_TIER::${gpuTier}::CYCLE::${cycleIndex}`;

  const sig = buildDualHashSignature("RUNPOD_BINARYWAVE_V30", intelPayload, classicString);

  return {
    carrier,
    signatureIntel: sig.intel,
    signatureClassic: sig.classic
  };
}

// ============================================================================
// Healing Metadata — v30‑IMMORTAL‑BINARYWAVE
// ============================================================================

const runpodHealing = {
  lastRegister: null,
  lastRequest: null,
  lastSubmit: null,

  lastNormalizedJobId: null,
  lastNormalizationError: null,

  cycleCount: 0,
  lastCycleIndex: null,

  lastRegisterSignatureIntel: null,
  lastRegisterSignatureClassic: null,

  lastRequestSignatureIntel: null,
  lastRequestSignatureClassic: null,

  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,

  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastRunPodCycleSignatureIntel: null,
  lastRunPodCycleSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  lastBinaryWaveCarrier: null,
  lastBinaryWaveSignatureIntel: null,
  lastBinaryWaveSignatureClassic: null
};

let runpodCycle = 0;

// ============================================================================
// Signature builders — v30
// ============================================================================

function buildRegisterSignature(deviceId, cycleIndex) {
  const intelPayload = {
    kind: "runpodRegister-v30",
    deviceId,
    cycleIndex
  };
  const classicString = `REGISTER_V30::${deviceId}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_REGISTER_V30", intelPayload, classicString);
}

function buildRequestSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "runpodRequest-v30",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `REQUEST_V30::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_REQUEST_V30", intelPayload, classicString);
}

function buildSubmitSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "runpodSubmit-v30",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `SUBMIT_V30::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_SUBMIT_V30", intelPayload, classicString);
}

function buildNormalizationSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "runpodNormalize-v30",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `NORM_V30::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_NORMALIZE_V30", intelPayload, classicString);
}

function buildRunPodCycleSignature(cycleIndex, band) {
  const intelPayload = {
    kind: "runpodCycle-v30",
    cycleIndex,
    band
  };
  const classicString = `RUNPOD_CYCLE_V30::${cycleIndex}::BAND::${band}`;
  return buildDualHashSignature("RUNPOD_CYCLE_V30", intelPayload, classicString);
}

// ============================================================================
// normalizeJob — v30 BinaryWave + GPU + Presence + Advantage
// ============================================================================

function normalizeJob(raw, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const gpuTier = classifyGpuTierFromDevice(deviceProfile);
  const band = normalizeBand(gpuTier === "none" ? "symbolic" : "binary");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  if (!raw) {
    const sig = buildNormalizationSignature(null, runpodCycle);
    runpodHealing.lastNormalizationError = "invalid_job";
    runpodHealing.lastNormalizationSignatureIntel = sig.intel;
    runpodHealing.lastNormalizationSignatureClassic = sig.classic;
    return null;
  }

  const jobId = raw.id || raw.jobId || null;
  const payload = raw.input || raw.payload || {};
  const priority = raw.priority || "normal";

  const normalized = {
    id: jobId,
    marketplaceId: "runpod",

    payout: 0.1,
    cpuRequired: 4,
    memoryRequired: 4096,
    estimatedSeconds: 600,

    minGpuScore: deviceProfile.gpuScore || 200,
    bandwidthNeededMbps: deviceProfile.bandwidthMbps || 10,

    payload,
    priority,
    band,
    pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
    gpuTier
  };

  const normSig = buildNormalizationSignature(jobId, runpodCycle);
  runpodHealing.lastNormalizedJobId = jobId;
  runpodHealing.lastNormalizationError = null;
  runpodHealing.lastNormalizationSignatureIntel = normSig.intel;
  runpodHealing.lastNormalizationSignatureClassic = normSig.classic;

  const binaryField = buildBinaryField(runpodCycle, gpuTier);
  const waveField = buildWaveField(runpodCycle, band, gpuTier);

  runpodHealing.lastBinaryField = binaryField;
  runpodHealing.lastWaveField = waveField;

  const presenceField = buildPresenceField(raw, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    raw,
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan(raw, deviceProfile, presenceField);

  const binaryWave = buildBinaryWaveCarrier(band, presenceField, deviceProfile, runpodCycle);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;
  runpodHealing.lastBinaryWaveCarrier = binaryWave.carrier;
  runpodHealing.lastBinaryWaveSignatureIntel = binaryWave.signatureIntel;
  runpodHealing.lastBinaryWaveSignatureClassic = binaryWave.signatureClassic;

  return {
    ...normalized,
    presenceField,
    advantageField,
    chunkPlan,
    binaryField,
    waveField,
    binaryWaveCarrier: binaryWave.carrier,
    binaryWaveSignatureIntel: binaryWave.signatureIntel,
    binaryWaveSignatureClassic: binaryWave.signatureClassic
  };
}

// ============================================================================
// registerDevice — v30 BinaryWave + GPU
// ============================================================================

function registerDevice({ deviceId, gpuInfo = {}, meta = {} } = {}, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const gpuTier = classifyGpuTierFromDevice(deviceProfile);
  const band = normalizeBand(gpuTier === "none" ? "symbolic" : "binary");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);
  const regSig = buildRegisterSignature(deviceId, runpodCycle);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  runpodHealing.lastRegister = {
    deviceId,
    gpuInfo,
    meta,
    cycleIndex: runpodCycle
  };

  runpodHealing.lastRegisterSignatureIntel = regSig.intel;
  runpodHealing.lastRegisterSignatureClassic = regSig.classic;

  const binaryField = buildBinaryField(runpodCycle, gpuTier);
  const waveField = buildWaveField(runpodCycle, band, gpuTier);

  const presenceField = buildPresenceField(null, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    null,
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan(null, deviceProfile, presenceField);

  const binaryWave = buildBinaryWaveCarrier(band, presenceField, deviceProfile, runpodCycle);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;
  runpodHealing.lastBinaryWaveCarrier = binaryWave.carrier;
  runpodHealing.lastBinaryWaveSignatureIntel = binaryWave.signatureIntel;
  runpodHealing.lastBinaryWaveSignatureClassic = binaryWave.signatureClassic;

  return {
    ok: true,
    result: {
      registered: true,
      cycleIndex: runpodCycle,
      band,
      pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
      gpuTier,
      signatureIntel: regSig.intel,
      signatureClassic: regSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      binaryWaveCarrier: binaryWave.carrier,
      binaryWaveSignatureIntel: binaryWave.signatureIntel,
      binaryWaveSignatureClassic: binaryWave.signatureClassic
    }
  };
}

// ============================================================================
// requestJob — v30 BinaryWave + GPU
// ============================================================================

function requestJob({ deviceId, filters = {} } = {}, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const gpuTier = classifyGpuTierFromDevice(deviceProfile);
  const band = normalizeBand(gpuTier === "none" ? "symbolic" : "binary");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);

  const job =
    RUNPOD_RECEPTOR_DNA.jobs[
      runpodCycle % RUNPOD_RECEPTOR_DNA.jobs.length
    ];

  const normalized = normalizeJob(job, deviceProfile);
  const jobId = normalized.id ?? null;

  const reqSig = buildRequestSignature(jobId, runpodCycle);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  runpodHealing.lastRequest = {
    deviceId,
    filters,
    jobId,
    cycleIndex: runpodCycle
  };

  runpodHealing.lastRequestSignatureIntel = reqSig.intel;
  runpodHealing.lastRequestSignatureClassic = reqSig.classic;

  const binaryField = buildBinaryField(runpodCycle, gpuTier);
  const waveField = buildWaveField(runpodCycle, band, gpuTier);

  const presenceField = buildPresenceField(job, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    job,
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan(job, deviceProfile, presenceField);

  const binaryWave = buildBinaryWaveCarrier(band, presenceField, deviceProfile, runpodCycle);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;
  runpodHealing.lastBinaryWaveCarrier = binaryWave.carrier;
  runpodHealing.lastBinaryWaveSignatureIntel = binaryWave.signatureIntel;
  runpodHealing.lastBinaryWaveSignatureClassic = binaryWave.signatureClassic;

  return {
    ok: true,
    job: normalized,
    band,
    pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
    gpuTier,
    signatureIntel: reqSig.intel,
    signatureClassic: reqSig.classic,
    bandSignatureIntel: bandSig.intel,
    bandSignatureClassic: bandSig.classic,
    cycleSignatureIntel: cycleSig.intel,
    cycleSignatureClassic: cycleSig.classic,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    binaryWaveCarrier: binaryWave.carrier,
    binaryWaveSignatureIntel: binaryWave.signatureIntel,
    binaryWaveSignatureClassic: binaryWave.signatureClassic
  };
}

// ============================================================================
// submitJob — v30 BinaryWave + GPU
// ============================================================================

function submitJob({ jobId, result, error: jobError = null } = {}, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const gpuTier = classifyGpuTierFromDevice(deviceProfile);
  const band = normalizeBand(gpuTier === "none" ? "symbolic" : "binary");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);
  const subSig = buildSubmitSignature(jobId, runpodCycle);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  runpodHealing.lastSubmit = {
    jobId,
    result,
    jobError,
    cycleIndex: runpodCycle
  };

  runpodHealing.lastSubmitSignatureIntel = subSig.intel;
  runpodHealing.lastSubmitSignatureClassic = subSig.classic;

  const binaryField = buildBinaryField(runpodCycle, gpuTier);
  const waveField = buildWaveField(runpodCycle, band, gpuTier);

  const presenceField = buildPresenceField({ id: jobId }, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    { id: jobId },
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan({ id: jobId }, deviceProfile, presenceField);

  const binaryWave = buildBinaryWaveCarrier(band, presenceField, deviceProfile, runpodCycle);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;
  runpodHealing.lastBinaryWaveCarrier = binaryWave.carrier;
  runpodHealing.lastBinaryWaveSignatureIntel = binaryWave.signatureIntel;
  runpodHealing.lastBinaryWaveSignatureClassic = binaryWave.signatureClassic;

  return {
    ok: true,
    result: {
      submitted: true,
      jobId,
      cycleIndex: runpodCycle,
      band,
      pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
      gpuTier,
      signatureIntel: subSig.intel,
      signatureClassic: subSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      binaryWaveCarrier: binaryWave.carrier,
      binaryWaveSignatureIntel: binaryWave.signatureIntel,
      binaryWaveSignatureClassic: binaryWave.signatureClassic,
      note: "RunPod submission simulated deterministically (v30-IMMORTAL-BINARYWAVE, GPU-forward, Binary Earn band)."
    }
  };
}

// ============================================================================
// Exported Marketplace Organ
// ============================================================================

export const PulseEarnMktBroker_v30 = {
  id: "runpod",
  name: "RunPod",
  version: "v30-IMMORTAL-BINARYWAVE",
  lineage: "RunPodAdapter-v30-IMMORTAL-BINARYWAVE",

  registerDevice,
  requestJob,
  submitJob,
  normalizeJob
};

// ============================================================================
// Healing State Export
// ============================================================================

export function getRunPodHealingState() {
  return { ...runpodHealing };
}

export default PulseEarnMktBroker_v30;

PulseRealm.EarnMktBroker = {
  getRunPodHealingState,
  runpodHealing,
  PulseEarnMktBroker_v30,
  RUNPOD_RECEPTOR_DNA
}