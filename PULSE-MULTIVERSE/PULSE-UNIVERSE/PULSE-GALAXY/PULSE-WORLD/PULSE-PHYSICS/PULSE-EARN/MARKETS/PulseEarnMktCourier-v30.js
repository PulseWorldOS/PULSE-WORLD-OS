// ============================================================================
// FILE: .../PulseEarnMktCourier-v30-IMMORTAL-BINARY++.js
// LAYER: THE COURIER (v30 IMMORTAL BINARY++ + INTEL + DualHash
//        + Presence + Advantage + Chunk + GPU/Binary-Earn Bias)
// Spheron GPU‑aware A‑B‑A courier
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// HASH HELPERS — v30 IMMORTAL INTEL++
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

// ============================================================================
// COURIER STATE — v30 IMMORTAL BINARY++
// ============================================================================

export const healingState = {
  lastPingMs: null,
  lastPingError: null,
  lastFetchCount: 0,
  lastFetchError: null,
  lastSubmitJobId: null,
  lastSubmitError: null,
  lastNormalizedJobId: null,
  lastNormalizationError: null,

  cycleCount: 0,
  lastCycleIndex: null,

  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,

  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,

  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,

  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastCourierCycleSignatureIntel: null,
  lastCourierCycleSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null
};

let courierCycle = 0;

// ============================================================================
// SPHERON DNA (deterministic, v30 tuned)
// ============================================================================

const SPHERON_RECEPTOR_DNA = {
  pingLatency: 38,
  jobs: [
    {
      id: "spheron-001",
      payout: 0.06,
      cpu: 2,
      memory: 2048,
      estimatedSeconds: 280,
      gpu: false,
      type: "compute"
    },
    {
      id: "spheron-002",
      payout: 0.14,
      cpu: 4,
      memory: 4096,
      estimatedSeconds: 540,
      gpu: true,
      type: "compute"
    }
  ],
  version: "v30-IMMORTAL-BINARY++",
  lineage: "Courier-Spheron-v30-IMMORTAL-BINARY++",
  phenotype: "MarketplaceReceptor"
};

// ============================================================================
// PRESENCE FIELD — v30 IMMORTAL BINARY++
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(jobOrRaw, deviceProfile = {}, cycle, globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const idLen = (jobOrRaw.id || "").length;
  const typeLen = (jobOrRaw.type || "").length;
  const stability = deviceProfile.stabilityScore || 0.7;

  const internalComposite =
    idLen * 0.001 +
    typeLen * 0.001 +
    stability * 0.01;

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "courierPresence-v30",
    version: "v30-IMMORTAL-BINARY++",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    idLen,
    typeLen,
    stability,
    cycleIndex: cycle,
    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "courier",
    devicePresence: ghP.devicePresence || "earn-node",
    regionId: region.regionId || "spheron-region",
    regionTag: region.regionTag || "spheron-region",
    castleId: castle.castleId || "spheron-castle"
  };

  const classicString =
    `COURIER_PRESENCE_V30::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("COURIER_PRESENCE_V30", intelPayload, classicString);

  return {
    presenceVersion: "v30-IMMORTAL-BINARY++",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    idLen,
    typeLen,
    stability,
    cycle,
    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "courier",
    devicePresence: ghP.devicePresence || "earn-node",
    regionId: region.regionId || "spheron-region",
    regionTag: region.regionTag || "spheron-region",
    castleId: castle.castleId || "spheron-castle",
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// ADVANTAGE FIELD — v30 IMMORTAL BINARY++ (C‑30.0, GPU‑forward)
// ============================================================================

function buildAdvantageField(jobOrRaw, deviceProfile, bandPack, presenceField, globalHints = {}) {
  const gpuScore = deviceProfile.gpuScore || 0;
  const bandwidth = deviceProfile.bandwidthMbps || 0;

  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    gpuScore * 0.0008 +
    bandwidth * 0.0003 +
    density * 0.000012 +
    amplitude * 0.000012;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.025 :
    presenceField.presenceTier === "high" ? 0.018 :
    presenceField.presenceTier === "elevated" ? 0.012 :
    presenceField.presenceTier === "soft" ? 0.006 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.06) advantageTier = 3;
  else if (advantageScore >= 0.025) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "courierAdvantage-v30",
    version: "C-30.0",
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
    `COURIER_ADVANTAGE_V30::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("COURIER_ADVANTAGE_V30", intelPayload, classicString);

  return {
    advantageVersion: "C-30.0",
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
}

// ============================================================================
// CHUNK / PREWARM PLAN — v30 IMMORTAL BINARY++
// ============================================================================

function buildChunkPrewarmPlan(jobOrRaw, deviceProfile, presenceField, advantageField) {
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

  const gpuBoost =
    (deviceProfile.gpuScore || 0) >= 900 ? 2 :
    (deviceProfile.gpuScore || 0) >= 600 ? 1 :
    0;

  const priority = basePriority + advantageBoost + gpuBoost;

  const intelPayload = {
    kind: "courierChunkPlan-v30",
    version: "v30-IMMORTAL-BINARY++",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    gpuScore: deviceProfile.gpuScore || 0
  };

  const classicString =
    `COURIER_CHUNK_PLAN_V30::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("COURIER_CHUNK_PLAN_V30", intelPayload, classicString);

  return {
    planVersion: "v30-IMMORTAL-BINARY++",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true
    },
    cache: {
      deviceProfile: true,
      courierDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// A‑B‑A SURFACES — v30 IMMORTAL BINARY++
// ============================================================================

function buildBinaryField(cycle, hasGpu, presenceField) {
  const patternLen = hasGpu ? 18 : 10;
  const baseDensity = patternLen + cycle * (hasGpu ? 2 : 1) + (hasGpu ? 28 : 8);
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const density = baseDensity + mesh + castle;
  const surface = density + patternLen;

  const intelPayload = {
    kind: "courierBinarySurface-v30",
    patternLen,
    density,
    surface,
    meshPressureIndex: mesh,
    castleLoadLevel: castle,
    cycleIndex: cycle,
    hasGpu
  };

  const classicString = `COURIER_BIN_V30::${surface}`;
  const sig = buildDualHashSignature("COURIER_BIN_V30", intelPayload, classicString);

  return {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      meshPressureIndex: mesh,
      castleLoadLevel: castle,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(cycle, band, presenceField) {
  const mesh = Number(presenceField.meshStrength || 0);
  const amplitude = (cycle + 1) * (band === "binary" ? 16 : 8) + mesh;
  const wavelength = amplitude + 5;
  const phase = (amplitude + (presenceField.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "courierWaveSurface-v30",
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField.meshStrength || 0,
    cycleIndex: cycle
  };

  const classicString = `COURIER_WAVE_V30::${band}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("COURIER_WAVE_V30", intelPayload, classicString);

  return {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// BAND SELECTION — v30 GPU/Binary‑Earn aware
// ============================================================================

function selectBandForDevice(deviceProfile = {}, fallback = "symbolic") {
  const gpuScore = deviceProfile.gpuScore || 0;
  if (gpuScore >= 300) return "binary";
  return normalizeBand(fallback);
}

function selectBandForJob(job, deviceProfile = {}, fallback = "symbolic") {
  const gpuFlag = !!job.gpu;
  const gpuScore = deviceProfile.gpuScore || 0;
  if (gpuFlag || gpuScore >= 300) return "binary";
  return normalizeBand(fallback);
}

// ============================================================================
// COURIER ORGAN — v30 IMMORTAL BINARY++
// ============================================================================

export const PulseEarnMktCourier = {
  id: "spheron",
  name: "Spheron Compute",
  version: "v30-IMMORTAL-BINARY++",
  lineage: "Courier-Spheron-v30-IMMORTAL-BINARY++",

  ping(deviceProfile = {}, globalHints = {}) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const latency = SPHERON_RECEPTOR_DNA.pingLatency;

    const band = selectBandForDevice(deviceProfile, "symbolic");
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "COURIER_BAND_V30",
      { band, cycleIndex: courierCycle },
      `BAND_V30::${band}::CYCLE::${courierCycle}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(null, deviceProfile, courierCycle, globalHints);
    const binaryField = buildBinaryField(courierCycle, band === "binary", presenceField);
    const waveField = buildWaveField(courierCycle, band, presenceField);

    const advantageField = buildAdvantageField(
      null,
      deviceProfile,
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(null, deviceProfile, presenceField, advantageField);

    const pingSig = buildDualHashSignature(
      "COURIER_PING_V30",
      { latency, cycleIndex: courierCycle, band },
      `PING_V30::${latency}::CYCLE::${courierCycle}`
    );
    healingState.lastPingSignatureIntel = pingSig.intel;
    healingState.lastPingSignatureClassic = pingSig.classic;

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      latency,
      cycleIndex: courierCycle,
      band,
      signatureIntel: pingSig.intel,
      signatureClassic: pingSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan
    };
  },

  fetchJobs(deviceProfile = {}, globalHints = {}) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const rawJobs = SPHERON_RECEPTOR_DNA.jobs || [];
    const band = selectBandForDevice(deviceProfile, "symbolic");
    healingState.lastBand = band;

    const presenceField = buildPresenceField(null, deviceProfile, courierCycle, globalHints);
    const binaryField = buildBinaryField(courierCycle, band === "binary", presenceField);
    const waveField = buildWaveField(courierCycle, band, presenceField);

    const advantageField = buildAdvantageField(
      null,
      deviceProfile,
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      null,
      deviceProfile,
      presenceField,
      advantageField
    );

    const jobs = rawJobs
      .map(raw => this.normalizeJob(raw, deviceProfile, globalHints))
      .filter(j => j !== null);

    const fetchSig = buildDualHashSignature(
      "COURIER_FETCH_V30",
      { count: jobs.length, cycleIndex: courierCycle, band },
      `FETCH_V30::${jobs.length}::CYCLE::${courierCycle}`
    );

    healingState.lastFetchCount = jobs.length;
    healingState.lastFetchSignatureIntel = fetchSig.intel;
    healingState.lastFetchSignatureClassic = fetchSig.classic;

    const bandSig = buildDualHashSignature(
      "COURIER_BAND_V30",
      { band, cycleIndex: courierCycle },
      `BAND_V30::${band}::CYCLE::${courierCycle}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      jobs,
      cycleIndex: courierCycle,
      band,
      signatureIntel: fetchSig.intel,
      signatureClassic: fetchSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan
    };
  },

  submitResult(job, result, deviceProfile = {}, globalHints = {}) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const jobId = job.id ?? null;
    const band = selectBandForJob(job, deviceProfile, "symbolic");
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "COURIER_BAND_V30",
      { band, cycleIndex: courierCycle },
      `BAND_V30::${band}::CYCLE::${courierCycle}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(job, deviceProfile, courierCycle, globalHints);
    const binaryField = buildBinaryField(courierCycle, band === "binary", presenceField);
    const waveField = buildWaveField(courierCycle, band, presenceField);

    const advantageField = buildAdvantageField(
      job,
      deviceProfile,
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      job,
      deviceProfile,
      presenceField,
      advantageField
    );

    const submitSig = buildDualHashSignature(
      "COURIER_SUBMIT_V30",
      { jobId, cycleIndex: courierCycle, band },
      `SUBMIT_V30::${jobId}::CYCLE::${courierCycle}`
    );

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitSignatureIntel = submitSig.intel;
    healingState.lastSubmitSignatureClassic = submitSig.classic;

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      ok: true,
      marketplace: "spheron",
      jobId,
      cycleIndex: courierCycle,
      band,
      signatureIntel: submitSig.intel,
      signatureClassic: submitSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      result
    };
  },

  normalizeJob(raw, deviceProfile = {}, globalHints = {}) {
    try {
      if (!raw || typeof raw !== "object" || !raw.id) {
        const sig = buildDualHashSignature(
          "COURIER_NORM_V30",
          { jobId: null, cycleIndex: courierCycle },
          "NORM_V30::NONE"
        );
        healingState.lastNormalizationError = "invalid_raw_job";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const payout = Number(raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        const sig = buildDualHashSignature(
          "COURIER_NORM_V30",
          { jobId: null, cycleIndex: courierCycle },
          "NORM_V30::NON_POSITIVE_PAYOUT"
        );
        healingState.lastNormalizationError = "non_positive_payout";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 1);
      const memoryRequired = Number(raw.memory ?? 1024);
      const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        const sig = buildDualHashSignature(
          "COURIER_NORM_V30",
          { jobId: null, cycleIndex: courierCycle },
          "NORM_V30::NON_POSITIVE_DURATION"
        );
        healingState.lastNormalizationError = "non_positive_duration";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const gpuFlag = !!raw.gpu;
      const band = selectBandForJob(raw, deviceProfile, gpuFlag ? "binary" : "symbolic");

      const presenceField = buildPresenceField(raw, deviceProfile, courierCycle, globalHints);
      const binaryField = buildBinaryField(courierCycle, band === "binary", presenceField);
      const waveField = buildWaveField(courierCycle, band, presenceField);

      const advantageField = buildAdvantageField(
        raw,
        deviceProfile,
        { band, binaryField, waveField },
        presenceField,
        globalHints
      );

      const chunkPlan = buildChunkPrewarmPlan(
        raw,
        deviceProfile,
        presenceField,
        advantageField
      );

      const minGpuScore =
        gpuFlag
          ? (deviceProfile.gpuScore || 400)
          : Math.max(100, Math.floor((deviceProfile.gpuScore || 0) * 0.4));

      const normalized = {
        id: String(raw.id),
        marketplaceId: "spheron",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore,
        bandwidthNeededMbps: deviceProfile.bandwidthMbps || 10,

        _abaBand: band,
        _abaBinaryDensity: binaryField.binarySurface.density,
        _abaWaveAmplitude: waveField.amplitude,

        presenceField,
        advantageField,
        chunkPlan
      };

      const sig = buildDualHashSignature(
        "COURIER_NORM_V30",
        { jobId: normalized.id, cycleIndex: courierCycle, band },
        `NORM_V30::${normalized.id}::BAND::${band}`
      );

      healingState.lastNormalizedJobId = normalized.id;
      healingState.lastNormalizationError = null;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;

      return normalized;

    } catch (err) {
      const sig = buildDualHashSignature(
        "COURIER_NORM_V30",
        { jobId: null, cycleIndex: courierCycle },
        "NORM_V30::ERROR"
      );
      healingState.lastNormalizationError = err.message || String(err);
      healingState.lastNormalizedJobId = null;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;
      return null;
    }
  }
};

// ============================================================================
// HEALING STATE EXPORT
// ============================================================================

export function getPulseEarnMktCourierHealingState() {
  return { ...healingState };
}

PulseRealm.EarnMktCourier = {
  getPulseEarnMktCourierHealingState,
  PulseEarnMktCourier,
  healingState
}