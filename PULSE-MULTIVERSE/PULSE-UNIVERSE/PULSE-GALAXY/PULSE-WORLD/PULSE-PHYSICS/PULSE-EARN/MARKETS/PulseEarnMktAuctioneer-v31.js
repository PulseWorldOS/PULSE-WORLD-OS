// ============================================================================
// FILE: PULSE-WORLD-OS/.../PulseEarnMktAuctioneer-v31-IMMORTAL-BINARYWAVE.js
// LAYER: MARKETPLACE AUCTIONEER (v31‑IMMORTAL‑BINARYWAVE‑INTEL‑DUALHASH A‑B‑A)
// Vast.ai Deterministic Adapter + Binary Earn Band + GPU‑Aware BinaryWave
// PURE RECEPTOR: no IO, no async, no randomness.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// HASH HELPERS — v31‑IMMORTAL‑BINARYWAVE (dual‑hash)
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

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function safeGet(obj, path, fallback = null) {
  try {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj) ?? fallback;
  } catch {
    return fallback;
  }
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// ============================================================================
// HEALING METADATA — v31‑IMMORTAL‑BINARYWAVE
// ============================================================================

export const auctioneerHealing = {
  lastPingMs: null,
  lastPingError: null,

  lastFetchCount: 0,
  lastFetchError: null,

  lastSubmitJobId: null,
  lastSubmitError: null,

  lastNormalizedJobId: null,
  lastNormalizationError: null,

  lastPayloadVersion: "31-IMMORTAL-BINARYWAVE",
  lastJobType: null,
  lastGpuScore: null,
  lastResourceShape: null,
  lastBandwidthInference: null,

  priceVolatility: 0,
  listingVolatility: 0,

  cycleCount: 0,
  lastCycleIndex: null,

  // Dual‑hash INTEL signatures
  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,

  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,

  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,

  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastAuctioneerCycleSignatureIntel: null,
  lastAuctioneerCycleSignatureClassic: null,

  // A‑B‑A surfaces
  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  // Presence / advantage / hints / GPU
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastAuctioneerPresenceProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastGpuProfile: null,

  // BinaryWave v31
  lastBinaryWaveCarrier: null,
  lastBinaryWaveSignatureIntel: null,
  lastBinaryWaveSignatureClassic: null
};

export function getPulseEarnMktAuctioneerHealingState_v31() {
  return { ...auctioneerHealing };
}

// ============================================================================
// SIGNATURE BUILDERS — v31‑IMMORTAL‑BINARYWAVE
// ============================================================================

function buildPingSignature(latency, cycleIndex, presenceTier) {
  const intelPayload = {
    kind: "auctioneerPing-v31",
    latency,
    cycleIndex,
    presenceTier
  };
  const classicString = `PING_V31::${latency}::CYCLE::${cycleIndex}::PTIER::${presenceTier}`;
  return buildDualHashSignature("AUCTIONEER_PING_V31", intelPayload, classicString);
}

function buildFetchSignature(count, cycleIndex, presenceTier) {
  const intelPayload = {
    kind: "auctioneerFetch-v31",
    count,
    cycleIndex,
    presenceTier
  };
  const classicString = `FETCH_V31::${count}::CYCLE::${cycleIndex}::PTIER::${presenceTier}`;
  return buildDualHashSignature("AUCTIONEER_FETCH_V31", intelPayload, classicString);
}

function buildNormalizationSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "auctioneerNormalize-v31",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `NORM_V31::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("AUCTIONEER_NORMALIZE_V31", intelPayload, classicString);
}

function buildSubmitSignature(jobId, cycleIndex, presenceTier) {
  const intelPayload = {
    kind: "auctioneerSubmit-v31",
    jobId: jobId || "NONE",
    cycleIndex,
    presenceTier
  };
  const classicString = `SUBMIT_V31::${jobId || "NONE"}::CYCLE::${cycleIndex}::PTIER::${presenceTier}`;
  return buildDualHashSignature("AUCTIONEER_SUBMIT_V31", intelPayload, classicString);
}

function buildAuctioneerCycleSignature(cycle, presenceTier, band) {
  const intelPayload = {
    kind: "auctioneerCycle-v31",
    cycleIndex: cycle,
    presenceTier,
    band
  };
  const classicString = `AUCTIONEER_CYCLE_V31::${cycle}::PTIER:${presenceTier}::BAND:${band}`;
  return buildDualHashSignature("AUCTIONEER_CYCLE_V31", intelPayload, classicString);
}

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "auctioneerBand-v31",
    band: normalizeBand(band),
    cycleIndex
  };
  const classicString = `AUCTIONEER_BAND_V31::${normalizeBand(band)}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("AUCTIONEER_BAND_V31", intelPayload, classicString);
}

// BinaryWave signature (band + gpu + A‑B‑A)
function buildBinaryWaveSignature(band, gpuTier, binaryField, waveField, cycleIndex) {
  const intelPayload = {
    kind: "auctioneerBinaryWave-v31",
    band,
    gpuTier,
    binarySurface: binaryField.binarySurface || null,
    waveSurface: waveField || null,
    cycleIndex
  };
  const classicString = `BINARYWAVE_V31::${band}::GPU_TIER::${gpuTier}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("AUCTIONEER_BINARYWAVE_V31", intelPayload, classicString);
}

// ============================================================================
// GPU‑AWARE A‑B‑A Binary + Wave Surfaces (Presence‑aware, INTEL)
// ============================================================================

function buildBinaryField(presenceField, hasGpu) {
  const basePattern = hasGpu ? 20 : 8; // v31: slightly richer binary surface when GPU present
  const patternLen = basePattern;
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);

  const density =
    patternLen +
    (auctioneerHealing.lastFetchCount || 0) +
    (auctioneerHealing.lastPingMs || 0) +
    mesh +
    castle +
    (hasGpu ? 40 : 0);

  const surface = density + patternLen;

  const intelPayload = {
    kind: "auctioneerBinarySurface-v31",
    patternLen,
    density,
    meshPressureIndex: mesh,
    castleLoadLevel: castle,
    surface,
    hasGpu
  };

  const classicString = `BAUCTIONEER_V31::${surface}::GPU::${hasGpu ? 1 : 0}`;
  const sig = buildDualHashSignature("BAUCTIONEER_V31", intelPayload, classicString);

  const field = {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      meshPressureIndex: mesh,
      castleLoadLevel: castle,
      surface,
      hasGpu
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  auctioneerHealing.lastBinaryField = field;
  return field;
}

function buildWaveField(band, presenceField, hasGpu) {
  const amplitudeBase = (auctioneerHealing.lastFetchCount || 1) * (hasGpu ? 16 : 10);
  const mesh = Number(presenceField.meshStrength || 0);
  const amplitude = amplitudeBase + mesh + (hasGpu ? 10 : 0);
  const wavelength = (auctioneerHealing.lastPingMs || 10) + 1 + (hasGpu ? 6 : 0);
  const phase = (amplitude + (presenceField.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "auctioneerWaveSurface-v31",
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField.meshStrength || 0,
    hasGpu
  };

  const classicString = `BAUCTIONEER_WAVE_V31::${band}::AMP::${amplitude}::GPU::${hasGpu ? 1 : 0}`;
  const sig = buildDualHashSignature("BAUCTIONEER_WAVE_V31", intelPayload, classicString);

  const field = {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    hasGpu
  };

  auctioneerHealing.lastWaveField = field;
  return field;
}

// ============================================================================
// DETERMINISTIC VAST.AI DNA — v31‑IMMORTAL‑BINARYWAVE (GPU‑aware)
// ============================================================================

const VAST_RECEPTOR_DNA_V31 = {
  pingLatency: 42,
  band: "symbolic",
  offers: [
    {
      id: "vast-001",
      dph_total: 0.12,
      cpu_cores: 4,
      ram_gb: 8,
      gpu_ram: 8,
      net_up: 50
    },
    {
      id: "vast-002",
      dph_total: 0.20,
      cpu_cores: 8,
      ram_gb: 16,
      gpu_ram: 24,
      net_up: 150
    }
  ],
  version: "31-IMMORTAL-BINARYWAVE",
  lineage: "Auctioneer-Vast-v31-IMMORTAL-BINARYWAVE",
  phenotype: "MarketplaceAuctioneer"
};

// ============================================================================
// Presence / Advantage / Hints Surfaces (auctioneer-level, v31)
// ============================================================================

function buildPresenceField(globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = mesh.meshStrength || 0;
  const meshPressureIndex = mesh.meshPressureIndex || 0;
  const castleLoadLevel = castle.loadLevel || 0;

  return {
    presenceVersion: "v31-IMMORTAL-BINARYWAVE",

    bandPresence: ghP.bandPresence || "unknown",
    routerPresence: ghP.routerPresence || "unknown",
    devicePresence: ghP.devicePresence || "unknown",
    meshPresence: ghP.meshPresence || mesh.meshStrength || "unknown",
    castlePresence: ghP.castlePresence || castle.castlePresence || "unknown",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",
    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function classifyAuctioneerPresenceTier(presenceField) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle;

  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildAdvantageField(globalHints = {}) {
  const gh = globalHints.advantageContext || {};

  const advantageScore = gh.score ?? 0;
  const advantageBand = gh.band ?? "neutral";
  const advantageTier = gh.tier ?? 0;

  return {
    advantageVersion: "C-31.0",
    advantageScore,
    advantageBand,
    advantageTier
  };
}

function buildHintsField(globalHints = {}) {
  return {
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: { ...(globalHints.chunkHints || {}) },
    cacheHints: { ...(globalHints.cacheHints || {}) },
    prewarmHints: { ...(globalHints.prewarmHints || {}) },
    coldStartHints: { ...(globalHints.coldStartHints || {}) }
  };
}

// ============================================================================
// GPU PROFILE — v31 IMMORTAL CAPABILITY PROFILE (market‑aware)
// ============================================================================

function buildGpuProfile() {
  const device =
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  if (device) {
    const gpuPressure = clamp01((device.capabilityScore || 0) / 10000);

    const profile = {
      gpuTier: device.capabilityTier,
      gpuScore: device.gpuScore,
      gpuRam: device.gpuRam,
      bandwidth: device.bandwidthMbps,
      stability: device.stabilityScore,
      capabilityScore: device.capabilityScore,
      gpuPressure,

      maxGpuRam: device.gpuRam,
      avgGpuRam: device.gpuRam,
      gpuCount: device.gpuRam > 0 ? 1 : 0
    };

    auctioneerHealing.lastGpuProfile = profile;
    auctioneerHealing.lastGpuScore = device.gpuScore;
    return profile;
  }

  const inferred = {
    gpuTier: "elite",
    gpuScore: 7200,
    gpuRam: 24,
    bandwidth: 500,
    stability: 0.97,
    capabilityScore:
      7200 * 0.5 +
      3600 * 0.2 +
      4800 * 0.2 +
      500 * 0.05 +
      0.97 * 0.05,
    gpuPressure: clamp01(7200 / 10000),

    maxGpuRam: 24,
    avgGpuRam: 24,
    gpuCount: 2
  };

  auctioneerHealing.lastGpuProfile = inferred;
  auctioneerHealing.lastGpuScore = inferred.gpuScore;
  return inferred;
}

// ============================================================================
// Deterministic Cycle Counter
// ============================================================================

let auctioneerCycle = 0;

// ============================================================================
// VOLATILITY — deterministic
// ============================================================================

function updateVolatility(jobs) {
  const count = jobs.length;

  auctioneerHealing.listingVolatility = Math.abs(
    count - (auctioneerHealing.lastFetchCount || 0)
  );

  const payouts = jobs.map(j => j.payout);
  if (payouts.length > 1) {
    const avg = payouts.reduce((a, b) => a + b, 0) / payouts.length;
    const variance =
      payouts.reduce((a, b) => a + (b - avg) * (b - avg), 0) / payouts.length;
    auctioneerHealing.priceVolatility = variance;
  }
}

// ============================================================================
// BinaryWave Carrier (symbolic, deterministic, no IO)
// ============================================================================

function buildBinaryWaveCarrier(band, presenceField, gpuProfile, cycleIndex) {
  const mode =
    band === "binary"
      ? (gpuProfile.gpuTier === "immortal" || gpuProfile.gpuTier === "elite"
          ? "burst"
          : gpuProfile.gpuTier === "high"
          ? "deep"
          : gpuProfile.gpuTier === "medium"
          ? "base"
          : "safe")
      : "symbolic";

  const carrier = {
    version: "BinaryWave-v31",
    band,
    mode,
    gpuTier: gpuProfile.gpuTier,
    gpuPressure: gpuProfile.gpuPressure,
    presenceTier: classifyAuctioneerPresenceTier(presenceField),
    regionId: presenceField.regionId,
    castleId: presenceField.castleId,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    cycleIndex
  };

  const sig = buildBinaryWaveSignature(
    band,
    gpuProfile.gpuTier,
    auctioneerHealing.lastBinaryField,
    auctioneerHealing.lastWaveField,
    cycleIndex
  );

  auctioneerHealing.lastBinaryWaveCarrier = carrier;
  auctioneerHealing.lastBinaryWaveSignatureIntel = sig.intel;
  auctioneerHealing.lastBinaryWaveSignatureClassic = sig.classic;

  return {
    carrier,
    signatureIntel: sig.intel,
    signatureClassic: sig.classic
  };
}

// ============================================================================
// NORMALIZATION — Vast.ai offer → Earn job (v31)
// ============================================================================

function normalizeVastOfferToEarnJob(raw, cycleIndex, band, presenceField, gpuProfile) {
  if (!raw || typeof raw !== "object") {
    const sig = buildNormalizationSignature("NONE", cycleIndex);
    auctioneerHealing.lastNormalizationError = "invalid_raw_offer";
    auctioneerHealing.lastNormalizationSignatureIntel = sig.intel;
    auctioneerHealing.lastNormalizationSignatureClassic = sig.classic;
    return null;
  }

  const id = String(raw.id || "");
  if (!id) {
    const sig = buildNormalizationSignature("NONE", cycleIndex);
    auctioneerHealing.lastNormalizationError = "missing_id";
    auctioneerHealing.lastNormalizationSignatureIntel = sig.intel;
    auctioneerHealing.lastNormalizationSignatureClassic = sig.classic;
    return null;
  }

  const payout = Number(raw.dph_total ?? 0);
  if (!Number.isFinite(payout) || payout <= 0) {
    const sig = buildNormalizationSignature(id, cycleIndex);
    auctioneerHealing.lastNormalizationError = "non_positive_payout";
    auctioneerHealing.lastNormalizationSignatureIntel = sig.intel;
    auctioneerHealing.lastNormalizationSignatureClassic = sig.classic;
    return null;
  }

  const cpuCores = Number(raw.cpu_cores ?? 1);
  const ramGb = Number(raw.ram_gb ?? 1);
  const gpuRam = Number(raw.gpu_ram ?? 0);
  const netUp = Number(raw.net_up ?? 0);

  const job = {
    id,
    marketplaceId: "vast",
    band,
    payout,
    resources: {
      cpuCores,
      ramGb,
      gpuRam,
      netUp
    },
    payload: {
      type: "compute",
      data: {
        offerId: id,
        raw
      }
    },
    meta: {
      presenceContext: {
        bandPresence: band,
        routerPresence: "auctioneer",
        devicePresence: "vast-auctioneer",
        meshPresence: presenceField.meshPresence,
        castlePresence: presenceField.castlePresence,
        regionPresence: presenceField.regionPresence
      },
      gpuProfile: {
        gpuTier: gpuProfile.gpuTier,
        gpuScore: gpuProfile.gpuScore,
        gpuRam: gpuProfile.gpuRam,
        bandwidth: gpuProfile.bandwidth,
        capabilityScore: gpuProfile.capabilityScore
      }
    }
  };

  const sig = buildNormalizationSignature(id, cycleIndex);
  auctioneerHealing.lastNormalizedJobId = id;
  auctioneerHealing.lastNormalizationError = null;
  auctioneerHealing.lastNormalizationSignatureIntel = sig.intel;
  auctioneerHealing.lastNormalizationSignatureClassic = sig.classic;

  return job;
}

// ============================================================================
// AUCTIONEER — Vast.ai Marketplace Adapter (v31‑IMMORTAL‑BINARYWAVE, GPU‑aware)
// ============================================================================

export const PulseEarnMktAuctioneer_v31 = {
  id: "vast",
  name: "Vast.ai",
  version: "v31-IMMORTAL-BINARYWAVE",
  lineage: "Auctioneer-Vast-v31-IMMORTAL-BINARYWAVE",

  // -------------------------------------------------------------------------
  // PING — deterministic latency + A‑B‑A + presence + GPU + BinaryWave
  // -------------------------------------------------------------------------
  ping(globalHints = {}) {
    auctioneerCycle++;
    auctioneerHealing.cycleCount++;
    auctioneerHealing.lastCycleIndex = auctioneerCycle;

    const latency = VAST_RECEPTOR_DNA_V31.pingLatency;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    const gpuProfile = buildGpuProfile();

    const defaultBand =
      gpuProfile.gpuTier !== "none" ? "binary" : VAST_RECEPTOR_DNA_V31.band;
    const band = normalizeBand(globalHints.band || defaultBand);

    auctioneerHealing.lastBand = band;
    auctioneerHealing.lastPingMs = latency;
    auctioneerHealing.lastPingError = null;

    const pingSig = buildPingSignature(latency, auctioneerCycle, presenceTier);
    const bandSig = buildBandSignature(band, auctioneerCycle);
    const cycleSig = buildAuctioneerCycleSignature(auctioneerCycle, presenceTier, band);

    auctioneerHealing.lastPingSignatureIntel = pingSig.intel;
    auctioneerHealing.lastPingSignatureClassic = pingSig.classic;
    auctioneerHealing.lastBandSignatureIntel = bandSig.intel;
    auctioneerHealing.lastBandSignatureClassic = bandSig.classic;
    auctioneerHealing.lastAuctioneerCycleSignatureIntel = cycleSig.intel;
    auctioneerHealing.lastAuctioneerCycleSignatureClassic = cycleSig.classic;

    const hasGpu = gpuProfile.gpuTier !== "none";
    const binaryField = buildBinaryField(presenceField, hasGpu);
    const waveField = buildWaveField(band, presenceField, hasGpu);

    const binaryWave = buildBinaryWaveCarrier(band, presenceField, gpuProfile, auctioneerCycle);

    const auctioneerPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel,
      gpuTier: gpuProfile.gpuTier,
      gpuPressure: gpuProfile.gpuPressure
    };

    const binaryProfile = { binaryField, presenceTier, gpuTier: gpuProfile.gpuTier };
    const waveProfile = { waveField, presenceTier, gpuTier: gpuProfile.gpuTier };

    auctioneerHealing.lastBinaryField = binaryField;
    auctioneerHealing.lastWaveField = waveField;
    auctioneerHealing.lastPresenceField = presenceField;
    auctioneerHealing.lastAdvantageField = advantageField;
    auctioneerHealing.lastHintsField = hintsField;
    auctioneerHealing.lastAuctioneerPresenceProfile = auctioneerPresenceProfile;
    auctioneerHealing.lastBinaryProfile = binaryProfile;
    auctioneerHealing.lastWaveProfile = waveProfile;

    return {
      latency,
      cycleIndex: auctioneerCycle,
      band,
      pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
      signatureIntel: pingSig.intel,
      signatureClassic: pingSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      auctioneerPresenceProfile,
      binaryProfile,
      waveProfile,
      gpuProfile,
      binaryWaveCarrier: binaryWave.carrier,
      binaryWaveSignatureIntel: binaryWave.signatureIntel,
      binaryWaveSignatureClassic: binaryWave.signatureClassic
    };
  },

  // -------------------------------------------------------------------------
  // FETCH JOBS — deterministic offers + A‑B‑A + GPU + BinaryWave
  // -------------------------------------------------------------------------
  fetchJobs(globalHints = {}) {
    auctioneerCycle++;
    auctioneerHealing.cycleCount++;
    auctioneerHealing.lastCycleIndex = auctioneerCycle;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    const offers = VAST_RECEPTOR_DNA_V31.offers || [];
    const gpuProfile = buildGpuProfile();

    const defaultBand =
      gpuProfile.gpuTier !== "none" ? "binary" : VAST_RECEPTOR_DNA_V31.band;
    const band = normalizeBand(globalHints.band || defaultBand);

    auctioneerHealing.lastBand = band;

    try {
      const jobs = offers
        .map(raw =>
          normalizeVastOfferToEarnJob(
            raw,
            auctioneerCycle,
            band,
            presenceField,
            gpuProfile
          )
        )
        .filter(j => j !== null);

      updateVolatility(jobs);

      const fetchSig = buildFetchSignature(jobs.length, auctioneerCycle, presenceTier);
      const bandSig = buildBandSignature(band, auctioneerCycle);
      const cycleSig = buildAuctioneerCycleSignature(auctioneerCycle, presenceTier, band);

      auctioneerHealing.lastFetchError = null;
      auctioneerHealing.lastFetchCount = jobs.length;
      auctioneerHealing.lastFetchSignatureIntel = fetchSig.intel;
      auctioneerHealing.lastFetchSignatureClassic = fetchSig.classic;
      auctioneerHealing.lastBandSignatureIntel = bandSig.intel;
      auctioneerHealing.lastBandSignatureClassic = bandSig.classic;
      auctioneerHealing.lastAuctioneerCycleSignatureIntel = cycleSig.intel;
      auctioneerHealing.lastAuctioneerCycleSignatureClassic = cycleSig.classic;

      const hasGpu = gpuProfile.gpuTier !== "none";
      const binaryField = buildBinaryField(presenceField, hasGpu);
      const waveField = buildWaveField(band, presenceField, hasGpu);

      const binaryWave = buildBinaryWaveCarrier(band, presenceField, gpuProfile, auctioneerCycle);

      const auctioneerPresenceProfile = {
        presenceTier,
        band,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel,
        gpuTier: gpuProfile.gpuTier,
        gpuPressure: gpuProfile.gpuPressure
      };

      const binaryProfile = { binaryField, presenceTier, gpuTier: gpuProfile.gpuTier };
      const waveProfile = { waveField, presenceTier, gpuTier: gpuProfile.gpuTier };

      auctioneerHealing.lastBinaryField = binaryField;
      auctioneerHealing.lastWaveField = waveField;
      auctioneerHealing.lastPresenceField = presenceField;
      auctioneerHealing.lastAdvantageField = advantageField;
      auctioneerHealing.lastHintsField = hintsField;
      auctioneerHealing.lastAuctioneerPresenceProfile = auctioneerPresenceProfile;
      auctioneerHealing.lastBinaryProfile = binaryProfile;
      auctioneerHealing.lastWaveProfile = waveProfile;

      return {
        success: true,
        cycleIndex: auctioneerCycle,
        band,
        pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
        jobs,
        errors: [],
        signatureIntel: fetchSig.intel,
        signatureClassic: fetchSig.classic,
        bandSignatureIntel: bandSig.intel,
        bandSignatureClassic: bandSig.classic,
        cycleSignatureIntel: cycleSig.intel,
        cycleSignatureClassic: cycleSig.classic,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        auctioneerPresenceProfile,
        binaryProfile,
        waveProfile,
        gpuProfile,
        binaryWaveCarrier: binaryWave.carrier,
        binaryWaveSignatureIntel: binaryWave.signatureIntel,
        binaryWaveSignatureClassic: binaryWave.signatureClassic
      };
    } catch (err) {
      const fetchSig = buildFetchSignature(0, auctioneerCycle, "idle");
      auctioneerHealing.lastFetchError = err.message || String(err);
      auctioneerHealing.lastFetchCount = 0;
      auctioneerHealing.lastFetchSignatureIntel = fetchSig.intel;
      auctioneerHealing.lastFetchSignatureClassic = fetchSig.classic;

      return {
        success: false,
        cycleIndex: auctioneerCycle,
        band,
        pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
        jobs: [],
        errors: [{ error: err.message || String(err) }],
        signatureIntel: fetchSig.intel,
        signatureClassic: fetchSig.classic,
        bandSignatureIntel: null,
        bandSignatureClassic: null,
        binaryField: null,
        waveField: null,
        presenceField,
        advantageField,
        hintsField,
        auctioneerPresenceProfile: null,
        binaryProfile: null,
        waveProfile: null,
        gpuProfile: auctioneerHealing.lastGpuProfile,
        binaryWaveCarrier: auctioneerHealing.lastBinaryWaveCarrier,
        binaryWaveSignatureIntel: auctioneerHealing.lastBinaryWaveSignatureIntel,
        binaryWaveSignatureClassic: auctioneerHealing.lastBinaryWaveSignatureClassic
      };
    }
  },

  // -------------------------------------------------------------------------
  // SUBMIT RESULT — Vast.ai does NOT accept compute results (presence/GPU/BinaryWave)
// -------------------------------------------------------------------------
  submitResult(job, result, globalHints = {}) {
    auctioneerCycle++;
    auctioneerHealing.cycleCount++;
    auctioneerHealing.lastCycleIndex = auctioneerCycle;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    const gpuProfile = buildGpuProfile();
    const defaultBand =
      gpuProfile.gpuTier !== "none" ? "binary" : VAST_RECEPTOR_DNA_V31.band;
    const band = normalizeBand(globalHints.band || job.band || defaultBand);

    const jobId = job.id ?? null;

    const submitSig = buildSubmitSignature(jobId, auctioneerCycle, presenceTier);
    const bandSig = buildBandSignature(band, auctioneerCycle);
    const cycleSig = buildAuctioneerCycleSignature(auctioneerCycle, presenceTier, band);

    auctioneerHealing.lastSubmitJobId = jobId;
    auctioneerHealing.lastSubmitError = null;
    auctioneerHealing.lastSubmitSignatureIntel = submitSig.intel;
    auctioneerHealing.lastSubmitSignatureClassic = submitSig.classic;
    auctioneerHealing.lastBandSignatureIntel = bandSig.intel;
    auctioneerHealing.lastBandSignatureClassic = bandSig.classic;
    auctioneerHealing.lastAuctioneerCycleSignatureIntel = cycleSig.intel;
    auctioneerHealing.lastAuctioneerCycleSignatureClassic = cycleSig.classic;

    const hasGpu = gpuProfile.gpuTier !== "none";
    const binaryField = buildBinaryField(presenceField, hasGpu);
    const waveField = buildWaveField(band, presenceField, hasGpu);

    const binaryWave = buildBinaryWaveCarrier(band, presenceField, gpuProfile, auctioneerCycle);

    const auctioneerPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel,
      gpuTier: gpuProfile.gpuTier,
      gpuPressure: gpuProfile.gpuPressure
    };

    const binaryProfile = { binaryField, presenceTier, gpuTier: gpuProfile.gpuTier };
    const waveProfile = { waveField, presenceTier, gpuTier: gpuProfile.gpuTier };

    auctioneerHealing.lastBinaryField = binaryField;
    auctioneerHealing.lastWaveField = waveField;
    auctioneerHealing.lastPresenceField = presenceField;
    auctioneerHealing.lastAdvantageField = advantageField;
    auctioneerHealing.lastHintsField = hintsField;
    auctioneerHealing.lastAuctioneerPresenceProfile = auctioneerPresenceProfile;
    auctioneerHealing.lastBinaryProfile = binaryProfile;
    auctioneerHealing.lastWaveProfile = waveProfile;

    return {
      ok: true,
      cycleIndex: auctioneerCycle,
      band,
      pulseBand: band === "binary" ? "PULSEBAND-BINARY-EARN" : "PULSEBAND-SYMBOLIC",
      jobId,
      resultEchoed: !!result,
      signatureIntel: submitSig.intel,
      signatureClassic: submitSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      auctioneerPresenceProfile,
      binaryProfile,
      waveProfile,
      gpuProfile,
      binaryWaveCarrier: binaryWave.carrier,
      binaryWaveSignatureIntel: binaryWave.signatureIntel,
      binaryWaveSignatureClassic: binaryWave.signatureClassic
    };
  }
};

PulseRealm.EarnMktAuctioneer = {
  PulseEarnMktAuctioneer_v31,
  auctioneerHealing
}

PulseRealm.PulseEarnMktAuctioneer = PulseEarnMktAuctioneer_v31;