// ============================================================================
// FILE: PulseEarnCustomReceptor-v31-Immortal-INTEL.js
// LAYER: THE GENETIC REGULATOR (v31-Immortal-INTEL A‑B‑A)
// (Deterministic Marketplace Interpreter + Receptor Builder + v31 Surfaces)
// ============================================================================
//
// ROLE (v31-Immortal-INTEL A‑B‑A):
//   THE GENETIC REGULATOR — deterministic marketplace interpreter for Earn v31.
//   • Reads receptor DNA from static deterministic config (no network).
//   • Expresses that DNA into a functional v31 receptor phenotype.
//   • Enforces the universal interface (ping, fetchJobs, submitResult, normalizeJob).
//   • Emits v31 presence/advantage/chunk/computeProfile/pulseIntelligence surfaces.
//   • Emits A‑B‑A bandSignature + binaryField + waveField.
//   • Fully factoring‑aware + prewarm/cache/chunk aware.
//   • Continuance/risk/capabilityModel aware as metadata-only.
//   • Pure, drift‑proof, zero user code, zero async.
//
// CONTRACT (v31-Immortal-INTEL):
//   • PURE RECEPTOR — deterministic, drift‑proof.
//   • NO async, NO network, NO randomness, NO timestamps.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NEVER mutate job objects.
//   • READ‑ONLY except deterministic DNA caching.
//   • Unified Earn v31 presence/advantage/chunk/computeProfile/pulseIntelligence schema.
//   • Dual-band A‑B‑A: symbolic primary, binary aware, metadata-only.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// 1 — GENOME IDENTITY + SUBIMPORTS (MUST BE FIRST)


import { submit } from "../../../../../../PULSE-ENGINE/PulseEngineForwardProcess-v31.js";
import { detectDeviceProfile } from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// Deterministic Hash Helper
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

// ============================================================================
// Deterministic Genetic DNA (v31 IMMORTAL)
// ============================================================================
export const DETERMINISTIC_RECEPTOR_DNA = {
  id: "CUSTOM",
  name: "Custom Marketplace",
  version: "31-Immortal-INTEL",
  healthScore: 1.0,

  band: "symbolic", // symbolic | binary

  endpoints: {
    ping: "PING_OK",
    jobs: [],
    submit: "SUBMIT_OK"
  },

  headers: {},

  lineage: "Receptor-GeneticRegulator-v31-Immortal-INTEL",
  phenotype: "MarketplaceReceptor"
};

// ============================================================================
// Genetic Cache — deterministic, no async
// ============================================================================
let cachedDNA = null;
let customReceptorCycle = 0;

function loadMarketplaceDNA() {
  if (cachedDNA) return cachedDNA;

  cachedDNA = {
    ...DETERMINISTIC_RECEPTOR_DNA,
    band: normalizeBand(DETERMINISTIC_RECEPTOR_DNA.band),
    endpoints: { ...DETERMINISTIC_RECEPTOR_DNA.endpoints }
  };

  return cachedDNA;
}

// ============================================================================
// Presence v31 — Unified v31 Presence Field
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(globalHints = {}, cycle) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalComposite = cycle * 0.0001;
  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const dna = loadMarketplaceDNA();

  return {
    presenceVersion: "v31-Immortal-INTEL",
    presenceTier,

    bandPresence: ghP.bandPresence || normalizeBand(dna.band),
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "custom-receptor",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "custom-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "custom-region",
    castleId: castle.castleId || "custom-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle,

    presenceSignature: computeHash(
      `CUSTOM_PRESENCE_V31::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
    )
  };
}

// ============================================================================
// Advantage‑C v31 — Advantage Surfaces
// ============================================================================
function buildAdvantageField(
  bandPack,
  presenceField,
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null
) {
  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    density * 0.00001 +
    amplitude * 0.00001;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high" ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft" ? 0.005 :
    0;

  const contScore = continuanceSnapshot && typeof continuanceSnapshot.continuanceScore === "number"
    ? continuanceSnapshot.continuanceScore
    : 0;

  const riskScore = riskSnapshot && typeof riskSnapshot.riskScore === "number"
    ? riskSnapshot.riskScore
    : 0;

  const continuanceBoost = (1 - clamp01(contScore)) * 0.01;
  const riskBoost = clamp01(riskScore) * 0.01;

  const advantageScore = baseScore + presenceBoost + continuanceBoost + riskBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  return {
    advantageVersion: "C-31.0-INTEL",
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    continuanceScore: contScore,
    riskScore
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan v31 — Chunking Surfaces
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

  return {
    planVersion: "v31-CustomReceptor-AdvantageC-INTEL",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true
    },
    cache: {
      customReceptorDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    }
  };
}

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (v31)
// ============================================================================
function buildBinaryField(dna, cycle) {
  const patternLen =
    String(dna.id).length + String(dna.name).length;

  const density =
    patternLen +
    (dna.endpoints.jobs.length || 0) +
    (dna.healthScore * 100) +
    cycle;

  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: computeHash(`BCUSTOM_V31::${surface}`),
    binarySurfaceSignature: computeHash(`BCUSTOM_SURF_V31::${surface}`),
    binarySurface: {
      patternLen,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(dna, cycle, band) {
  const amplitude = (dna.healthScore || 1) * 100 + cycle;
  const wavelength = (dna.endpoints.jobs.length || 0) + 1;
  const phase = (dna.id.charCodeAt(0) || 1) % 16;
  const b = normalizeBand(band || dna.band);

  return {
    amplitude,
    wavelength,
    phase,
    band: b,
    mode: b === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Hints + Compute Profile v31 — Metadata-only, Receptor-level
// ============================================================================
function buildHintsField(globalHints = {}) {
  return Object.freeze({
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: globalHints.chunkHints || {},
    cacheHints: globalHints.cacheHints || {},
    prewarmHints: globalHints.prewarmHints || {},
    coldStartHints: globalHints.coldStartHints || {},
    gpuPreferred: !!globalHints.gpuPreferred,
    minerPreferred: !!globalHints.minerPreferred,
    airPreferred: !!globalHints.airPreferred
  });
}

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function deriveFactoringSignal({ meshPressureIndex = 0, cachePriority = "normal", prewarmNeeded = false }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildComputeProfile({ band, globalHints = {}, presenceField, capabilityModel = {} }) {
  const b = normalizeBand(band);
  const hintsField = buildHintsField(globalHints);
  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignal({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const performanceRatio = capabilityModel.performanceRatio ?? 1;
  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const airScore = capabilityModel.airScore ?? 0;

  return Object.freeze({
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    performanceRatio,
    gpuPreferred: hintsField.gpuPreferred || gpuScore > 0,
    minerPreferred: hintsField.minerPreferred || minerScore > 0,
    airPreferred: hintsField.airPreferred || airScore > 0
  });
}

// ============================================================================
// Pulse Intelligence v31 for Custom Receptor — Logic-only
// ============================================================================
function computePulseIntelligenceForMarket({ band, presenceField, advantageField, computeProfile }) {
  const bandIsBinary = band === "binary" ? 1 : 0;
  const factoring = computeProfile.factoringSignal ? 1 : 0;

  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const performanceRatio = computeProfile.performanceRatio || 1;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
      presenceWeight * 0.25 +
      factoring * 0.2 +
      performanceRatio * 0.15,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.6 +
      (bandIsBinary ? 0.15 : 0) +
      (advantageTier >= 2 ? 0.25 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: computeProfile.factoringSignal ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    performanceRatio
  };
}

// ============================================================================
// Signature Builders
// ============================================================================
function buildReceptorSignature(dna) {
  return computeHash(
    `RECEPTOR_V31::${dna.id}::${dna.version}::${normalizeBand(dna.band)}`
  );
}

function buildPingSignature(latency) {
  return computeHash(`PING_V31::CUSTOM::${latency}`);
}

function buildJobListSignature(count) {
  return computeHash(`JOBS_V31::CUSTOM::${count}`);
}

function buildSubmissionSignature(jobId, status) {
  return computeHash(`SUBMIT_V31::CUSTOM::${jobId}::${status}`);
}

function buildBandSignature(dna) {
  return computeHash(`RECEPTOR_BAND_V31::${normalizeBand(dna.band)}::${dna.id}`);
}

// ============================================================================
// normalizeJob — strict unified v31 job schema + v31 surfaces
// ============================================================================
function normalizeJob(
  raw,
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null,
  capabilityModel = {}
) {
  const dna = loadMarketplaceDNA();

  if (!raw || typeof raw !== "object") {
    return null;
  }
  if (!raw.id) {
    return null;
  }

  const payout = Number(raw.payout ?? raw.reward ?? 0);
  if (!Number.isFinite(payout) || payout <= 0) {
    return null;
  }

  const cpuRequired = Number(raw.cpu ?? 1);
  const memoryRequired = Number(raw.memory ?? 1024);
  const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

  if (
    !Number.isFinite(cpuRequired) || cpuRequired <= 0 ||
    !Number.isFinite(memoryRequired) || memoryRequired <= 0 ||
    !Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0
  ) {
    return null;
  }

  const gpuTierRaw = raw.gpuTier ?? (raw.gpu ? "high" : "low");
  const gpuTier =
    gpuTierRaw === "high" ? "high" :
    gpuTierRaw === "mid"  ? "mid"  :
    gpuTierRaw === "low"  ? "low"  :
    "low";

  const minGpuScore =
    gpuTier === "high"
      ? 600
      : gpuTier === "mid"
      ? 400
      : gpuTier === "low"
      ? 250
      : 150;

  const bandwidthNeededMbps = Number(raw.bandwidth ?? 5);

  const band = gpuTier === "high" ? "binary" : normalizeBand(dna.band);

  const presenceField = buildPresenceField(globalHints, customReceptorCycle);
  const binaryField = buildBinaryField(dna, customReceptorCycle);
  const waveField = buildWaveField(dna, customReceptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints,
    continuanceSnapshot,
    riskSnapshot
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildComputeProfile({
    band,
    globalHints,
    presenceField,
    capabilityModel
  });

  const pulseIntelligence = computePulseIntelligenceForMarket({
    band,
    presenceField,
    advantageField,
    computeProfile
  });

  return {
    id: String(raw.id),
    marketplaceId: dna.id,

    payout,
    cpuRequired,
    memoryRequired,
    estimatedSeconds,

    minGpuScore,
    bandwidthNeededMbps,

    // A‑B‑A hints
    _abaBand: band,
    _abaBinaryDensity: binaryField.binarySurface.density,
    _abaWaveAmplitude: waveField.amplitude,

    // Unified v31 surfaces
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence
  };
}

// ============================================================================
// Receptor Expression — ping(), fetchJobs(), submitResult()
// Unified v31 presence/advantage/chunk/computeProfile/pulseIntelligence surfaces.
// ============================================================================


function ping(
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null,
  capabilityModel = {}
) {
  customReceptorCycle++;

  const dna = loadMarketplaceDNA();

  let latency;
  if (dna.healthScore >= 0.85) latency = 10;
  else if (dna.healthScore >= 0.50) latency = 50;
  else if (dna.healthScore >= 0.15) latency = 150;
  else latency = null;

  const presenceField = buildPresenceField(globalHints, customReceptorCycle);
  const band = normalizeBand(dna.band);
  const binaryField = buildBinaryField(dna, customReceptorCycle);
  const waveField = buildWaveField(dna, customReceptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints,
    continuanceSnapshot,
    riskSnapshot
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildComputeProfile({
    band,
    globalHints,
    presenceField,
    capabilityModel
  });

  const pulseIntelligence = computePulseIntelligenceForMarket({
    band,
    presenceField,
    advantageField,
    computeProfile
  });

  return {
    latency,
    receptorId: dna.id,
    signature: buildPingSignature(latency),
    bandSignature: buildBandSignature(dna),
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence
  };
}

function fetchJobs(
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null,
  capabilityModel = {}
) {
  customReceptorCycle++;

  const dna = loadMarketplaceDNA();
  const jobs = Array.isArray(dna.endpoints.jobs) ? dna.endpoints.jobs : [];

  const normalizedJobs = jobs
    .map(j => normalizeJob(j, globalHints, continuanceSnapshot, riskSnapshot, capabilityModel))
    .filter(j => j !== null);

  const presenceField = buildPresenceField(globalHints, customReceptorCycle);
  const band = normalizeBand(dna.band);
  const binaryField = buildBinaryField(dna, customReceptorCycle);
  const waveField = buildWaveField(dna, customReceptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints,
    continuanceSnapshot,
    riskSnapshot
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildComputeProfile({
    band,
    globalHints,
    presenceField,
    capabilityModel
  });

  const pulseIntelligence = computePulseIntelligenceForMarket({
    band,
    presenceField,
    advantageField,
    computeProfile
  });

  return {
    jobs: normalizedJobs,
    receptorId: dna.id,
    signature: buildJobListSignature(normalizedJobs.length),
    bandSignature: buildBandSignature(dna),
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence
  };
}

function submitResult(
  job,
  result,
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null,
  capabilityModel = {}
) {
  customReceptorCycle++;

  const dna = loadMarketplaceDNA();

  const presenceField = buildPresenceField(globalHints, customReceptorCycle);
  const band = normalizeBand(dna.band);
  const binaryField = buildBinaryField(dna, customReceptorCycle);
  const waveField = buildWaveField(dna, customReceptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints,
    continuanceSnapshot,
    riskSnapshot
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildComputeProfile({
    band,
    globalHints,
    presenceField,
    capabilityModel
  });

  const pulseIntelligence = computePulseIntelligenceForMarket({
    band,
    presenceField,
    advantageField,
    computeProfile
  });

  if (!job || !job.id) {
    return {
      success: false,
      error: "invalid_job",
      receptorId: dna.id,
      signature: buildSubmissionSignature("NONE", "INVALID"),
      bandSignature: buildBandSignature(dna),
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      computeProfile,
      pulseIntelligence
    };
  }

  const status = dna.endpoints.submit;

  return {
    success: true,
    receptorId: dna.id,
    jobId: job.id,
    result,
    status,
    signature: buildSubmissionSignature(job.id, status),
    bandSignature: buildBandSignature(dna),
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence
  };
}

// ============================================================================
// Export — The Genetic Regulator Organ (v31-Immortal-INTEL A‑B‑A)
// ============================================================================
export const PulseEarnCustomReceptor = {
  id: "CUSTOM",
  name: "Custom Marketplace",
  version: "31-Immortal-INTEL",
  lineage: "Receptor-GeneticRegulator-v31-Immortal-INTEL",

  receptorSignature: () => buildReceptorSignature(loadMarketplaceDNA()),
  bandSignature: () => buildBandSignature(loadMarketplaceDNA()),

  binaryField: () => buildBinaryField(loadMarketplaceDNA(), customReceptorCycle),
  waveField: () => buildWaveField(loadMarketplaceDNA(), customReceptorCycle, loadMarketplaceDNA().band),

  ping,
  fetchJobs,
  submitResult,
  normalizeJob
};

export default {
  PulseEarnCustomReceptor
};

PulseRealm.EarnMktCustomReceptor = {
  PulseEarnCustomReceptor,
  detectDeviceProfile,
  submitResult,
  submit,
  ping,
  DETERMINISTIC_RECEPTOR_DNA
}