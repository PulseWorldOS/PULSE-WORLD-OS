// ============================================================================
// FILE: PULSE-EARN/PulseEarnMktForager-v31-IMMORTAL-INTEL-WORLD.js
// LAYER: THE FORAGER — Salad Marketplace Receptor (v31 IMMORTAL-INTEL-WORLD)
//        • v31 IMMORTAL+++ + INTEL + DualHash + Presence + Advantage-C
//        • A-B-A Binary/Wave Surfaces + GPU-Aware Normalization
//        • Liquidity-Aware Healing + v31 Tunable Thresholds
//        • World / Tenant / Region overlays + Chunk/Cache/Prewarm
//        • PURE RECEPTOR: deterministic, no IO, no randomness
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// META — v31 IMMORTAL-INTEL-WORLD
// ============================================================================
export const PulseEarnMktForagerMeta = Object.freeze({
  id: "salad",
  name: "Salad Marketplace",
  version: "v31-IMMORTAL-INTEL-WORLD",
  role: "MARKET_FORAGER",
  schemaVersion: "v31",
  lineage: "Forager-Salad-v31-IMMORTAL-INTEL-WORLD",
  phenotype: "MarketplaceReceptor",
  identity: {
    organismId: "PULSE::EARN::FORAGER::SALAD",
    worldId: "PULSE-WORLD",
    multiverseId: "PULSE-MULTIVERSE"
  }
});

// ============================================================================
// v31 Tunables — thresholds & weights centralized
// ============================================================================
export const V31_CONSTANTS = {
  presence: {
    critical: 150,
    high: 100,
    elevated: 50
  },
  gpuTierFromDevice: {
    high: 900,
    mid: 450
  },
  advantageWeights: {
    gpuScore: 0.0007,
    bandwidth: 0.0003,
    density: 0.000013,
    amplitude: 0.000013
  },
  advantagePresenceBoost: {
    critical: 0.03,
    high: 0.02,
    elevated: 0.013,
    soft: 0.006,
    idle: 0
  },
  advantageTierThresholds: {
    tier3: 0.07,
    tier2: 0.03
  }
};

// ============================================================================
// HASH HELPERS — v31 IMMORTAL INTEL (dual-hash)
// ============================================================================
function computeHashClassic(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
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

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
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

// ============================================================================
// Unified v31 Presence Tier
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= V31_CONSTANTS.presence.critical) return "critical";
  if (pressure >= V31_CONSTANTS.presence.high) return "high";
  if (pressure >= V31_CONSTANTS.presence.elevated) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// World / Continuance / OmniHosting overlays — v31
// ============================================================================
function buildWorldOverlayV31(globalHints = {}, cycleIndex) {
  const world = globalHints.worldContext || {};
  const region = world.region || world.regionCode || "forager-region";
  const tenantId = world.tenantId || "forager-tenant";
  const geoGrid = world.geoGrid || null;
  const omniPlacementId = world.omniPlacementId || null;
  return {
    worldRegion: region,
    tenantId,
    geoGrid,
    omniPlacementId,
    cycleIndex
  };
}

function buildContinuanceHintsV31(globalHints = {}) {
  const c = globalHints.continuanceHints || {};
  return {
    globalRisk: c.globalRisk ?? 0,
    band: c.band ?? 0,
    notes: Array.isArray(c.notes) ? c.notes.slice() : [],
    fallbackBandLevel: c.fallbackBandLevel ?? 0,
    prewarmHint: c.prewarmHint || null,
    cacheHint: c.cacheHint || null,
    chunkHint: c.chunkHint || null
  };
}

function buildOmniHostingHintsV31(globalHints = {}) {
  const o = globalHints.omniHostingHints || {};
  return {
    placementId: o.placementId || null,
    failoverId: o.failoverId || null,
    hostTier: o.hostTier || null,
    hostTrend: o.hostTrend || null
  };
}

// ============================================================================
// Unified v31 Presence Field (Forager)
// ============================================================================
function buildPresenceField(jobOrRaw, deviceProfile, cycle, globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};
  const liquidity = globalHints.liquidityContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);
  const liquidityPressure = Number(liquidity.pressureIndex || 0);

  const idLen = (jobOrRaw.id || "").length;
  const typeLen = (jobOrRaw.type || "").length;
  const stability = deviceProfile.stabilityScore || 0.7;

  const internalComposite =
    idLen * 0.001 +
    typeLen * 0.001 +
    stability * 0.01;

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex =
    meshPressureExternal + internalPressure + liquidityPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "foragerPresence",
    version: "v31-IMMORTAL-INTEL-WORLD",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    idLen,
    typeLen,
    stability,
    cycleIndex: cycle,
    liquidityPressure
  };

  const classicString =
    `FORAGER_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature(
    "FORAGER_PRESENCE",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v31-IMMORTAL-INTEL-WORLD",
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "forager",

    meshPresence:
      ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence:
      ghP.castlePresence || castle.castlePresence || "forager-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "forager-region",
    castleId: castle.castleId || "forager-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,
    liquidityPressure,

    idLen,
    typeLen,
    stability,
    cycle,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (v31 IMMORTAL)
// ============================================================================
function classifyGpuTierFromJob(raw) {
  const gpuTier = raw.gpuTier || raw.gpu_tier || null;
  if (!gpuTier) return "mid";
  const s = String(gpuTier).toLowerCase();
  if (s.includes("high")) return "high";
  if (s.includes("low")) return "low";
  return "mid";
}

function classifyGpuTierFromDevice(deviceProfile = {}) {
  const score = Number(deviceProfile.gpuScore || 0);
  if (score >= V31_CONSTANTS.gpuTierFromDevice.high) return "high";
  if (score >= V31_CONSTANTS.gpuTierFromDevice.mid) return "mid";
  if (score > 0) return "low";
  return "none";
}

function buildBinaryField(cycle, gpuTier, presenceField) {
  const tierWeight =
    gpuTier === "high"
      ? 26
      : gpuTier === "mid"
      ? 18
      : gpuTier === "low"
      ? 10
      : 6;

  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);

  const patternLen = tierWeight;
  const density = patternLen + cycle + tierWeight * 2 + mesh + castle;
  const surface = density + patternLen;

  const intelPayload = {
    kind: "foragerBinarySurface",
    cycleIndex: cycle,
    gpuTier,
    patternLen,
    density,
    surface,
    meshPressureIndex: mesh,
    castleLoadLevel: castle
  };

  const classicString = `BFORAGER::${surface}`;
  const sig = buildDualHashSignature("FORAGER_BIN", intelPayload, classicString);

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
  const amplitude = (cycle + 1) * (band === "binary" ? 13 : 7) + mesh;
  const wavelength = amplitude + 4;
  const phase = (amplitude + (presenceField.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "foragerWaveSurface",
    cycleIndex: cycle,
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField.meshStrength || 0
  };

  const classicString = `FORAGER_WAVE::${band}::AMP::${amplitude}`;
  const sig = buildDualHashSignature(
    "FORAGER_WAVE",
    intelPayload,
    classicString
  );

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
// Advantage‑C v31 (GPU + bandwidth + A‑B‑A + presence + liquidity)
// ============================================================================
function buildAdvantageField(
  jobOrRaw,
  deviceProfile,
  bandPack,
  presenceField,
  globalHints = {}
) {
  const gpuScore = Number(deviceProfile.gpuScore || 0);
  const bandwidth = Number(deviceProfile.bandwidthMbps || 0);

  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    gpuScore * V31_CONSTANTS.advantageWeights.gpuScore +
    bandwidth * V31_CONSTANTS.advantageWeights.bandwidth +
    density * V31_CONSTANTS.advantageWeights.density +
    amplitude * V31_CONSTANTS.advantageWeights.amplitude;

  const presenceBoost =
    V31_CONSTANTS.advantagePresenceBoost[presenceField.presenceTier] ??
    V31_CONSTANTS.advantagePresenceBoost.idle;

  const liquidityScore = Number(globalHints.liquidityContext.score || 0);
  const liquidityBoost = clamp01(liquidityScore) * 0.012;

  const advantageScore = baseScore + presenceBoost + liquidityBoost;

  let advantageTier = 0;
  if (advantageScore >= V31_CONSTANTS.advantageTierThresholds.tier3)
    advantageTier = 3;
  else if (advantageScore >= V31_CONSTANTS.advantageTierThresholds.tier2)
    advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel =
    globalHints.fallbackBandLevel ??
    (globalHints.continuanceHints.fallbackBandLevel ?? 0);

  const intelPayload = {
    kind: "foragerAdvantage",
    version: "C-31.0",
    gpuScore,
    bandwidth,
    density,
    amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    liquidityScore
  };

  const classicString = `FORAGER_ADVANTAGE::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature(
    "FORAGER_ADVANTAGE",
    intelPayload,
    classicString
  );

  return {
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
    liquidityScore,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan v31 (Forager)
// ============================================================================
function buildChunkPrewarmPlan(
  jobOrRaw,
  deviceProfile,
  presenceField,
  advantageField
) {
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
    advantageField.advantageTier >= 3
      ? 2
      : advantageField.advantageTier === 2
      ? 1
      : 0;

  const priority = basePriority + advantageBoost;

  const intelPayload = {
    kind: "foragerChunkPlan",
    version: "v31-IMMORTAL-INTEL-WORLD",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `FORAGER_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature(
    "FORAGER_CHUNK_PLAN",
    intelPayload,
    classicString
  );

  return {
    planVersion: "v31-IMMORTAL-INTEL-WORLD",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true,
      leaseShapeCache: true
    },
    cache: {
      deviceProfile: true,
      foragerDiagnostics: true,
      lastJobShapes: true
    },
    prewarm: {
      nervousSystem: true,
      survivalInstincts: true,
      lymphNodes: true,
      metabolism: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// Healing Metadata — v31 IMMORTAL-INTEL-WORLD
// ============================================================================
export const foragerHealing = {
  lastPingMs: null,
  lastPingError: null,
  lastFetchCount: 0,
  lastFetchError: null,
  lastSubmitJobId: null,
  lastSubmitError: null,
  lastNormalizedJobId: null,
  lastNormalizationError: null,

  lastPayloadVersion: "31-salad-dna",
  lastJobType: null,
  lastGpuTier: null,
  lastResourceShape: null,
  payoutVolatility: 0,
  liquidityScore: 0,
  cycleCount: 0,
  lastCycleIndex: null,

  // dual signatures
  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,
  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,
  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,
  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  lastWorldOverlay: null,
  lastContinuanceHints: null,
  lastOmniHostingHints: null
};

// ============================================================================
// Deterministic Salad Receptor DNA (v31 IMMORTAL-INTEL-WORLD)
// ============================================================================
const SALAD_RECEPTOR_DNA_V31 = {
  pingLatency: 55,
  jobs: [
    {
      id: "salad-001",
      reward: 0.08,
      cpu: 4,
      memory: 4096,
      estimatedSeconds: 900,
      gpuTier: "mid",
      bandwidth: 20,
      type: "generic-compute"
    },
    {
      id: "salad-002",
      reward: 0.15,
      cpu: 8,
      memory: 8192,
      estimatedSeconds: 1800,
      gpuTier: "high",
      bandwidth: 50,
      type: "ai-task"
    }
  ],
  version: "v31-IMMORTAL-INTEL-WORLD",
  lineage: "Forager-Salad-v31-IMMORTAL-INTEL-WORLD",
  phenotype: "MarketplaceReceptor"
};

// ============================================================================
// Forager Artery Snapshot v6 — v31 IMMORTAL-INTEL-WORLD
// ============================================================================
export function getForagerArterySnapshotV6({
  ok = false,
  phase = "idle", // ping | fetch | submit | normalize
  cycleIndex = 0,
  band = "symbolic",
  presenceField = null,
  advantageField = null,
  worldOverlay = null,
  jobs = [],
  errors = []
} = {}) {
  const presenceTier = presenceField.presenceTier || "idle";
  const meshPressureIndex = presenceField.meshPressureIndex || 0;
  const castleLoadLevel = presenceField.castleLoadLevel || 0;
  const advantageScore = advantageField.advantageScore ?? 0;
  const advantageTier = advantageField.advantageTier ?? 0;
  const jobCount = jobs.length || 0;
  const errorCount = errors.length || 0;

  const pressure = clamp01(
    (meshPressureIndex / 200 +
      castleLoadLevel / 200 +
      jobCount / 16) / 3
  );

  const bucketPressure = v => {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  };

  const arterySignature = computeHashClassic(
    [
      "FORAGER_ARTERY_V6",
      phase,
      band,
      presenceTier,
      cycleIndex,
      jobCount,
      errorCount,
      pressure.toFixed(3),
      advantageScore.toFixed(5),
      advantageTier,
      worldOverlay.worldRegion || "none",
      worldOverlay.tenantId || "none"
    ].join("::")
  );

  return Object.freeze({
    ok,
    phase,
    band,
    cycleIndex,
    jobs: jobCount,
    errors: errorCount,
    presence: {
      presenceTier,
      meshPressureIndex,
      castleLoadLevel
    },
    advantage: {
      advantageScore,
      advantageTier
    },
    pressure: {
      value: pressure,
      bucket: bucketPressure(pressure)
    },
    worldOverlay: worldOverlay || null,
    meta: {
      version: PulseEarnMktForagerMeta.version,
      lineage: PulseEarnMktForagerMeta.lineage,
      identity: PulseEarnMktForagerMeta.identity,
      arterySignature
    }
  });
}

// ============================================================================
// FORAGER CLIENT — v31 IMMORTAL-INTEL-WORLD
// ============================================================================
export const PulseEarnMktForager_v31 = {
  id: PulseEarnMktForagerMeta.id,
  name: PulseEarnMktForagerMeta.name,
  version: PulseEarnMktForagerMeta.version,
  lineage: PulseEarnMktForagerMeta.lineage,

  // -------------------------------------------------------------------------
  // Ping — v31 dual-hash + presence + advantage + chunk + world overlay
  // -------------------------------------------------------------------------
  ping(deviceProfile = {}, globalHints = {}) {
    const latency = SALAD_RECEPTOR_DNA_V31.pingLatency;

    foragerHealing.cycleCount++;
    const cycleIndex = foragerHealing.cycleCount;
    foragerHealing.lastCycleIndex = cycleIndex;
    foragerHealing.lastPingMs = latency;
    foragerHealing.lastPingError = null;

    const pingSig = buildDualHashSignature(
      "FORAGER_PING",
      { latency, cycleIndex },
      `PING::SALAD::${latency}::CYCLE::${cycleIndex}`
    );
    foragerHealing.lastPingSignatureIntel = pingSig.intel;
    foragerHealing.lastPingSignatureClassic = pingSig.classic;

    const deviceGpuTier = classifyGpuTierFromDevice(deviceProfile);
    const band = normalizeBand(
      deviceGpuTier === "high" ? "binary" : "symbolic"
    );
    foragerHealing.lastBand = band;

    const bandSig = buildDualHashSignature(
      "FORAGER_BAND",
      { band, cycleIndex },
      `BAND::${band}::CYCLE::${cycleIndex}`
    );
    foragerHealing.lastBandSignatureIntel = bandSig.intel;
    foragerHealing.lastBandSignatureClassic = bandSig.classic;

    const worldOverlay = buildWorldOverlayV31(globalHints, cycleIndex);
    const continuanceHints = buildContinuanceHintsV31(globalHints);
    const omniHostingHints = buildOmniHostingHintsV31(globalHints);

    const presenceField = buildPresenceField(
      null,
      deviceProfile,
      cycleIndex,
      globalHints
    );
    const binaryField = buildBinaryField(
      cycleIndex,
      deviceGpuTier,
      presenceField
    );
    const waveField = buildWaveField(cycleIndex, band, presenceField);

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

    foragerHealing.lastBinaryField = binaryField;
    foragerHealing.lastWaveField = waveField;
    foragerHealing.lastPresenceField = presenceField;
    foragerHealing.lastAdvantageField = advantageField;
    foragerHealing.lastChunkPrewarmPlan = chunkPlan;
    foragerHealing.lastWorldOverlay = worldOverlay;
    foragerHealing.lastContinuanceHints = continuanceHints;
    foragerHealing.lastOmniHostingHints = omniHostingHints;

    const artery = getForagerArterySnapshotV6({
      ok: true,
      phase: "ping",
      cycleIndex,
      band,
      presenceField,
      advantageField,
      worldOverlay,
      jobs: [],
      errors: []
    });

    return {
      latency,
      cycleIndex,
      band,
      signatureIntel: pingSig.intel,
      signatureClassic: pingSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      worldOverlay,
      continuanceHints,
      omniHostingHints,
      artery
    };
  },

  // -------------------------------------------------------------------------
  // Fetch Jobs — v31 dual-hash + presence + advantage + chunk + world overlay
  // -------------------------------------------------------------------------
  fetchJobs(deviceProfile = {}, globalHints = {}) {
    try {
      const data = { jobs: SALAD_RECEPTOR_DNA_V31.jobs };
      foragerHealing.lastPayloadVersion = "31-salad-dna";

      if (!data || !Array.isArray(data.jobs)) {
        const sig = buildDualHashSignature(
          "FORAGER_FETCH",
          { count: 0, cycleIndex: foragerHealing.cycleCount },
          "FETCH::SALAD::0"
        );
        foragerHealing.lastFetchError = "invalid_jobs_payload";
        foragerHealing.lastFetchCount = 0;
        foragerHealing.lastFetchSignatureIntel = sig.intel;
        foragerHealing.lastFetchSignatureClassic = sig.classic;

        const artery = getForagerArterySnapshotV6({
          ok: false,
          phase: "fetch",
          cycleIndex: foragerHealing.cycleCount,
          band: foragerHealing.lastBand,
          presenceField: null,
          advantageField: null,
          worldOverlay: null,
          jobs: [],
          errors: [{ error: "invalid_jobs_payload" }]
        });

        return {
          success: false,
          jobs: [],
          cycleIndex: foragerHealing.cycleCount,
          signatureIntel: sig.intel,
          signatureClassic: sig.classic,
          bandSignatureIntel: null,
          bandSignatureClassic: null,
          binaryField: null,
          waveField: null,
          presenceField: null,
          advantageField: null,
          chunkPlan: null,
          worldOverlay: null,
          artery
        };
      }

      const jobs = data.jobs
        .map(raw => this.normalizeJob(raw, deviceProfile, globalHints))
        .filter(j => j !== null);

      foragerHealing.lastFetchError = null;
      foragerHealing.lastFetchCount = jobs.length;
      foragerHealing.cycleCount++;
      const cycleIndex = foragerHealing.cycleCount;
      foragerHealing.lastCycleIndex = cycleIndex;

      const fetchSig = buildDualHashSignature(
        "FORAGER_FETCH",
        { count: jobs.length, cycleIndex },
        `FETCH::SALAD::${jobs.length}::CYCLE::${cycleIndex}`
      );
      foragerHealing.lastFetchSignatureIntel = fetchSig.intel;
      foragerHealing.lastFetchSignatureClassic = fetchSig.classic;

      const deviceGpuTier = classifyGpuTierFromDevice(deviceProfile);
      const band = normalizeBand(
        deviceGpuTier === "high" ? "binary" : "symbolic"
      );
      foragerHealing.lastBand = band;

      const bandSig = buildDualHashSignature(
        "FORAGER_BAND",
        { band, cycleIndex },
        `BAND::${band}::CYCLE::${cycleIndex}`
      );
      foragerHealing.lastBandSignatureIntel = bandSig.intel;
      foragerHealing.lastBandSignatureClassic = bandSig.classic;

      const worldOverlay = buildWorldOverlayV31(globalHints, cycleIndex);
      const continuanceHints = buildContinuanceHintsV31(globalHints);
      const omniHostingHints = buildOmniHostingHintsV31(globalHints);

      const presenceField = buildPresenceField(
        null,
        deviceProfile,
        cycleIndex,
        globalHints
      );
      const binaryField = buildBinaryField(
        cycleIndex,
        deviceGpuTier,
        presenceField
      );
      const waveField = buildWaveField(cycleIndex, band, presenceField);

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

      foragerHealing.lastBinaryField = binaryField;
      foragerHealing.lastWaveField = waveField;
      foragerHealing.lastPresenceField = presenceField;
      foragerHealing.lastAdvantageField = advantageField;
      foragerHealing.lastChunkPrewarmPlan = chunkPlan;
      foragerHealing.lastWorldOverlay = worldOverlay;
      foragerHealing.lastContinuanceHints = continuanceHints;
      foragerHealing.lastOmniHostingHints = omniHostingHints;

      const artery = getForagerArterySnapshotV6({
        ok: true,
        phase: "fetch",
        cycleIndex,
        band,
        presenceField,
        advantageField,
        worldOverlay,
        jobs,
        errors: []
      });

      return {
        success: true,
        jobs,
        cycleIndex,
        band,
        signatureIntel: fetchSig.intel,
        signatureClassic: fetchSig.classic,
        bandSignatureIntel: bandSig.intel,
        bandSignatureClassic: bandSig.classic,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        chunkPlan,
        worldOverlay,
        continuanceHints,
        omniHostingHints,
        artery
      };
    } catch (err) {
      const sig = buildDualHashSignature(
        "FORAGER_FETCH",
        { count: 0, error: String(err) },
        "FETCH::SALAD::0"
      );
      foragerHealing.lastFetchError = err.message || String(err);
      foragerHealing.lastFetchCount = 0;
      foragerHealing.lastFetchSignatureIntel = sig.intel;
      foragerHealing.lastFetchSignatureClassic = sig.classic;

      const artery = getForagerArterySnapshotV6({
        ok: false,
        phase: "fetch",
        cycleIndex: foragerHealing.cycleCount,
        band: foragerHealing.lastBand,
        presenceField: null,
        advantageField: null,
        worldOverlay: null,
        jobs: [],
        errors: [{ error: err.message || String(err) }]
      });

      return {
        success: false,
        jobs: [],
        cycleIndex: foragerHealing.cycleCount,
        signatureIntel: sig.intel,
        signatureClassic: sig.classic,
        bandSignatureIntel: null,
        bandSignatureClassic: null,
        binaryField: null,
        waveField: null,
        presenceField: null,
        advantageField: null,
        chunkPlan: null,
        worldOverlay: null,
        artery
      };
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — v31 dual-hash + presence + advantage + chunk + world overlay
  // -------------------------------------------------------------------------
  submitResult(job, result, deviceProfile = {}, globalHints = {}) {
    const jobId = job.id ?? null;

    foragerHealing.lastSubmitJobId = jobId;
    foragerHealing.lastSubmitError = null;
    foragerHealing.cycleCount++;
    const cycleIndex = foragerHealing.cycleCount;
    foragerHealing.lastCycleIndex = cycleIndex;

    const submitSig = buildDualHashSignature(
      "FORAGER_SUBMIT",
      { jobId, cycleIndex },
      `SUBMIT::SALAD::${jobId}::CYCLE::${cycleIndex}`
    );
    foragerHealing.lastSubmitSignatureIntel = submitSig.intel;
    foragerHealing.lastSubmitSignatureClassic = submitSig.classic;

    const gpuTier = classifyGpuTierFromJob(job);
    const band = normalizeBand(gpuTier === "high" ? "binary" : "symbolic");
    foragerHealing.lastBand = band;

    const bandSig = buildDualHashSignature(
      "FORAGER_BAND",
      { band, cycleIndex },
      `BAND::${band}::CYCLE::${cycleIndex}`
    );
    foragerHealing.lastBandSignatureIntel = bandSig.intel;
    foragerHealing.lastBandSignatureClassic = bandSig.classic;

    const worldOverlay = buildWorldOverlayV31(globalHints, cycleIndex);
    const continuanceHints = buildContinuanceHintsV31(globalHints);
    const omniHostingHints = buildOmniHostingHintsV31(globalHints);

    const presenceField = buildPresenceField(
      job,
      deviceProfile,
      cycleIndex,
      globalHints
    );
    const binaryField = buildBinaryField(cycleIndex, gpuTier, presenceField);
    const waveField = buildWaveField(cycleIndex, band, presenceField);

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

    foragerHealing.lastBinaryField = binaryField;
    foragerHealing.lastWaveField = waveField;
    foragerHealing.lastPresenceField = presenceField;
    foragerHealing.lastAdvantageField = advantageField;
    foragerHealing.lastChunkPrewarmPlan = chunkPlan;
    foragerHealing.lastWorldOverlay = worldOverlay;
    foragerHealing.lastContinuanceHints = continuanceHints;
    foragerHealing.lastOmniHostingHints = omniHostingHints;

    const artery = getForagerArterySnapshotV6({
      ok: true,
      phase: "submit",
      cycleIndex,
      band,
      presenceField,
      advantageField,
      worldOverlay,
      jobs: job ? [job] : [],
      errors: []
    });

    return {
      ok: true,
      marketplace: "salad",
      jobId,
      cycleIndex,
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
      worldOverlay,
      continuanceHints,
      omniHostingHints,
      artery,
      result
    };
  },

  // -------------------------------------------------------------------------
  // Normalize Job — v31 dual-hash + presence + advantage + chunk + world overlay
  // -------------------------------------------------------------------------
  normalizeJob(raw, deviceProfile = {}, globalHints = {}) {
    try {
      if (!raw || typeof raw !== "object") {
        const sig = buildDualHashSignature(
          "FORAGER_NORM",
          { jobId: null },
          "NORM::SALAD::NONE"
        );
        foragerHealing.lastNormalizationError = "invalid_raw_job";
        foragerHealing.lastNormalizedJobId = null;
        foragerHealing.lastNormalizationSignatureIntel = sig.intel;
        foragerHealing.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }
      if (!raw.id) {
        const sig = buildDualHashSignature(
          "FORAGER_NORM",
          { jobId: null },
          "NORM::SALAD::NONE"
        );
        foragerHealing.lastNormalizationError = "missing_id";
        foragerHealing.lastNormalizedJobId = null;
        foragerHealing.lastNormalizationSignatureIntel = sig.intel;
        foragerHealing.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      foragerHealing.lastJobType = safeGet(raw, "type", "unknown");

      const payout = Number(raw.reward ?? raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        const sig = buildDualHashSignature(
          "FORAGER_NORM",
          { jobId: null },
          "NORM::SALAD::NONE"
        );
        foragerHealing.lastNormalizationError = "non_positive_payout";
        foragerHealing.lastNormalizedJobId = null;
        foragerHealing.lastNormalizationSignatureIntel = sig.intel;
        foragerHealing.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 2);
      const memoryRequired = Number(raw.memory ?? 2048);
      const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

      foragerHealing.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds
      };

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        const sig = buildDualHashSignature(
          "FORAGER_NORM",
          { jobId: null },
          "NORM::SALAD::NONE"
        );
        foragerHealing.lastNormalizationError = "non_positive_duration";
        foragerHealing.lastNormalizedJobId = null;
        foragerHealing.lastNormalizationSignatureIntel = sig.intel;
        foragerHealing.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const gpuTier = classifyGpuTierFromJob(raw);
      foragerHealing.lastGpuTier = gpuTier;

      const minGpuScore =
        gpuTier === "high"
          ? 750
          : gpuTier === "mid"
          ? 480
          : gpuTier === "low"
          ? 260
          : 160;

      const bandwidthNeededMbps = Number(raw.bandwidth ?? 10);

      const band = normalizeBand(gpuTier === "high" ? "binary" : "symbolic");
      foragerHealing.lastBand = band;

      const cycleIndex = foragerHealing.cycleCount;
      const bandSig = buildDualHashSignature(
        "FORAGER_BAND",
        { band, cycleIndex },
        `BAND::${band}::CYCLE::${cycleIndex}`
      );
      foragerHealing.lastBandSignatureIntel = bandSig.intel;
      foragerHealing.lastBandSignatureClassic = bandSig.classic;

      const worldOverlay = buildWorldOverlayV31(globalHints, cycleIndex);
      const continuanceHints = buildContinuanceHintsV31(globalHints);
      const omniHostingHints = buildOmniHostingHintsV31(globalHints);

      const presenceField = buildPresenceField(
        raw,
        deviceProfile,
        cycleIndex,
        globalHints
      );
      const binaryField = buildBinaryField(
        cycleIndex,
        gpuTier,
        presenceField
      );
      const waveField = buildWaveField(cycleIndex, band, presenceField);

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

      foragerHealing.lastBinaryField = binaryField;
      foragerHealing.lastWaveField = waveField;
      foragerHealing.lastPresenceField = presenceField;
      foragerHealing.lastAdvantageField = advantageField;
      foragerHealing.lastChunkPrewarmPlan = chunkPlan;
      foragerHealing.lastWorldOverlay = worldOverlay;
      foragerHealing.lastContinuanceHints = continuanceHints;
      foragerHealing.lastOmniHostingHints = omniHostingHints;

      const jobId = String(raw.id);

      const normalizedJob = {
        id: jobId,
        marketplaceId: "salad",
        band,
        payout,
        estimatedSeconds,
        resources: {
          cpu: cpuRequired,
          memory: memoryRequired,
          gpuTier,
          minGpuScore
        },
        network: {
          bandwidthMbps: bandwidthNeededMbps
        },
        payload: {
          type: raw.type || "generic-compute",
          data: {
            raw,
            gpuTier,
            minGpuScore,
            bandwidthNeededMbps
          }
        },
        meta: {
          presenceContext: {
            bandPresence: presenceField.bandPresence,
            routerPresence: presenceField.routerPresence,
            devicePresence: presenceField.devicePresence,
            meshPresence: presenceField.meshPresence,
            castlePresence: presenceField.castlePresence,
            regionPresence: presenceField.regionPresence
          },
          meshSignals: {
            meshStrength: presenceField.meshStrength,
            meshPressureIndex: presenceField.meshPressureIndex
          },
          castleSignals: {
            loadLevel: presenceField.castleLoadLevel,
            castleId: presenceField.castleId
          },
          regionContext: {
            regionId: presenceField.regionId,
            regionTag: presenceField.regionPresence
          },
          worldOverlay,
          continuanceHints,
          omniHostingHints,
          advantageField,
          chunkPlan
        }
      };

      const intelPayload = {
        kind: "foragerNormalize",
        jobId,
        band,
        gpuTier,
        cycleIndex
      };
      const classicString =
        `FORAGER_NORM::${jobId}::${band}::${gpuTier}::CYCLE::${cycleIndex}`;
      const sig = buildDualHashSignature(
        "FORAGER_NORM",
        intelPayload,
        classicString
      );

      foragerHealing.lastNormalizationError = null;
      foragerHealing.lastNormalizedJobId = jobId;
      foragerHealing.lastNormalizationSignatureIntel = sig.intel;
      foragerHealing.lastNormalizationSignatureClassic = sig.classic;

      return {
        job: normalizedJob,
        normalizationSignatureIntel: sig.intel,
        normalizationSignatureClassic: sig.classic
      };
    } catch (err) {
      const sig = buildDualHashSignature(
        "FORAGER_NORM",
        { jobId: null, error: String(err) },
        "NORM::SALAD::ERROR"
      );
      foragerHealing.lastNormalizationError = err.message || String(err);
      foragerHealing.lastNormalizedJobId = null;
      foragerHealing.lastNormalizationSignatureIntel = sig.intel;
      foragerHealing.lastNormalizationSignatureClassic = sig.classic;
      return null;
    }
  }
};

// ============================================================================
// HEALING STATE EXPORT
// ============================================================================
export function getPulseEarnMktForagerHealingState() {
  return { ...foragerHealing };
}

// ============================================================================
// DEFAULT EXPORT (optional convenience)
// ============================================================================
export default PulseEarnMktForager_v31;

// ============================================================================
// GLOBAL REGISTRATION (OPTIONAL)
// ============================================================================

  PulseRealm.PulseEarnMktForager = {
    PulseEarnMktForager_v31,
    PulseEarnMktForagerMeta,
    foragerHealing,
    V31_CONSTANTS
  }
