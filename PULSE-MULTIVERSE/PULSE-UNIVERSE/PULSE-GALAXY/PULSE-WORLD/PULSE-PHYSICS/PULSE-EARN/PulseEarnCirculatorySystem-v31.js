// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-EARN/PulseEarnCirculatorySystem-v31-Immortal-INTEL.js
// LAYER: THE CIRCULATORY SYSTEM (v31-Immortal-INTEL, Deterministic Neural‑Circulatory)
// ROLE: Earn Autonomic Routing + INTEL + Neural‑Circulatory Backbone (v31 dual-band)
// PATTERN: A‑B‑C‑B‑A (Neural‑Circulatory, Deterministic, Non‑Adaptive)
// ============================================================================
//
//  • Deterministic marketplace evaluation (no real ping, no network).
//  • Deterministic job intake + capabilityModel‑driven scoring.
//  • Reputation‑weighted, band‑aware, mesh/proxy/castle/expansion‑aware routing.
//  • Continuance + Risk + Presence + Advantage + Capability + INTEL surfaces.
//  • Overmind / Scheduler / Runtime aware (read‑only, metadata‑only).
//  • Dual‑band (symbolic + binary) as metadata‑only (no non‑deterministic branching).
//  • PURE COMPUTE: no async, no randomness, no timestamps, no IO, no learning.
//  • v31: chunk/cache/prewarm/earn‑aware routing surfaces + binary‑balance awareness.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// 1 — GENOME IDENTITY + META

export const PulseEarnCirculatorySystemMeta = Object.freeze({
  version: "v31-Immortal-INTEL",
  role: "Earn Neural-Circulatory Backbone",
  bandMode: "dual-band-symbolic-binary",
  safetyContract: {
    randomness: false,
    timestampsInMath: false,
    async: false,
    network: false,
    filesystem: false,
    dom: false,
    learning: false
  }
});

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// Dual-Band Constants — Symbolic + Binary (metadata-only)
// ============================================================================

const CIRC_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary"
};

function normalizeBand(band) {
  const b = String(band || CIRC_BANDS.SYMBOLIC).toLowerCase();
  return b === CIRC_BANDS.BINARY ? CIRC_BANDS.BINARY : CIRC_BANDS.SYMBOLIC;
}

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

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function safeNum(v, d = 0) {
  return typeof v === "number" && !isNaN(v) ? v : d;
}

function safeBool(v, d = false) {
  return typeof v === "boolean" ? v : d;
}

// ============================================================================
// Healing Metadata — Circulatory Reflex Log (v31-Immortal-INTEL)
// ============================================================================

export const circulatoryHealing = {
  lastHealthError: null,
  lastFetchError: null,
  lastSelectionError: null,

  lastHealthyMarketplaces: [],
  lastJobsFetched: 0,
  lastBestJobId: null,

  cycleCount: 0,

  lastHealthSignature: null,
  lastJobListSignature: null,
  lastSelectionSignature: null,
  lastRoutingCycleSignature: null,

  lastBand: CIRC_BANDS.SYMBOLIC,
  lastLoopField: null,
  lastWaveField: null,
  lastAdvantageField: null,

  lastPresenceField: null,
  lastAdvantagePresenceField: null,
  lastHintsField: null,
  lastComputeProfile: null,

  // capability + performance surfaces
  lastCapabilityModel: null,
  lastPerformanceRatio: 1,

  // INTEL surfaces
  lastPulseIntelligence: null,
  lastPulseIntelligenceSignature: null,

  // Neural surfaces (v31)
  lastNeuralSurfaces: null,
  lastContinuanceSnapshot: null,
  lastRiskSnapshot: null,
  lastOvermindContext: null,
  lastSchedulerContext: null,
  lastRuntimeContext: null
};

export function getPulseEarnCirculatoryHealingState() {
  return { ...circulatoryHealing };
}

// ============================================================================
// Signature Builders
// ============================================================================

function buildHealthSignature(list) {
  return computeHash(`HEALTH::${list.join(",")}`);
}

function buildJobListSignature(count) {
  return computeHash(`JOBS::${count}`);
}

function buildSelectionSignature(jobId) {
  return computeHash(`SELECT::${jobId || "NONE"}`);
}

function buildRoutingCycleSignature(cycle, band) {
  return computeHash(`ROUTE_CYCLE::${cycle}::${normalizeBand(band)}`);
}

// ============================================================================
// Loop / Wave / Advantage Fields (Routing-Level, v31)
// ============================================================================

function buildLoopField(jobs, band) {
  const count = Array.isArray(jobs) ? jobs.length : 0;
  const b = normalizeBand(band);

  return {
    loopDepth: count,
    closedLoop: count > 0,
    loopStrength: count * (b === CIRC_BANDS.BINARY ? 2 : 1),
    band: b
  };
}

function buildWaveField(jobs, band) {
  const count = Array.isArray(jobs) ? jobs.length : 0;
  const b = normalizeBand(band);

  const wavelength = count || 1;
  const amplitude = (count * 3) % 11;
  const phase = (count * 5) % 16;

  return {
    wavelength,
    amplitude,
    phase,
    band: b,
    mode: b === CIRC_BANDS.BINARY ? "compression-wave" : "symbolic-wave"
  };
}

function buildAdvantageFieldForRouting(jobs, band, context = {}) {
  const count = Array.isArray(jobs) ? jobs.length : 0;
  const b = normalizeBand(band);

  const gh = context.globalHints || {};
  const chunkHints = gh.chunkHints || {};
  const cacheHints = gh.cacheHints || {};
  const prewarmHints = gh.prewarmHints || {};

  const cachePriority = normalizeCachePriority(cacheHints.priority);
  const cacheWarmth = cacheHints.warmth || "cold";
  const prewarmNeeded = !!prewarmHints.shouldPrewarm;

  const binaryModeRatio = b === CIRC_BANDS.BINARY ? 1 : 0;
  const symbolicModeRatio = b === CIRC_BANDS.SYMBOLIC ? 1 : 0;
  const dualBandBalance = 1 - Math.abs(binaryModeRatio - symbolicModeRatio);

  const chunkAggression = clamp01(chunkHints.chunkAggression || 0);

  const advantageScore = clamp01(
    (count > 0 ? 0.4 : 0) +
    (cachePriority === "critical" ? 0.2 : cachePriority === "high" ? 0.15 : 0.1) +
    (cacheWarmth === "hot" ? 0.15 : cacheWarmth === "warm" ? 0.1 : 0.05) +
    (prewarmNeeded ? 0.1 : 0.02) +
    (chunkAggression * 0.1) +
    (dualBandBalance * 0.08)
  );

  const advantageTier =
    advantageScore >= 0.9 ? 3 :
    advantageScore >= 0.6 ? 2 :
    advantageScore >= 0.3 ? 1 :
    0;

  return {
    advantageVersion: "R-31.0",
    jobCount: count,
    band: b,
    symbolicPlanningBias: b === CIRC_BANDS.SYMBOLIC ? 1 : 0,
    binaryCompressionBias: b === CIRC_BANDS.BINARY ? 1 : 0,
    cachePriority,
    cacheWarmth,
    prewarmNeeded,
    chunkAggression,
    binaryModeRatio,
    symbolicModeRatio,
    dualBandBalance,
    advantageScore,
    advantageTier
  };
}

// ============================================================================
// Presence / Advantage / Hints / Compute Profile (v31 IMMORTAL-INTEL)
// ============================================================================

function buildPresenceField(context = {}) {
  const gh = context.globalHints || {};
  const pf = context.presenceField || {};
  const mesh = context.meshSignals || {};
  const castle = context.castleSignals || {};
  const region = gh.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureIndex = Number(mesh.meshPressureIndex || 0);
  const castleLoadLevel = Number(castle.loadLevel || 0);

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  return Object.freeze({
    presenceVersion: "v31-Immortal-INTEL",
    presenceTier,

    bandPresence: pf.bandPresence || gh.presenceContext.bandPresence || "unknown",
    routerPresence: pf.routerPresence || gh.presenceContext.routerPresence || "unknown",
    devicePresence: pf.devicePresence || gh.presenceContext.devicePresence || "unknown",

    meshPresence: pf.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: pf.castlePresence || castle.castlePresence || "unknown",
    regionPresence: pf.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    presenceSignature: computeHash(
      `PRESENCE_V31::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
    )
  });
}

function buildAdvantagePresenceField(context = {}) {
  const gh = context.globalHints || {};
  const adv = gh.advantageContext || {};

  return Object.freeze({
    advantageVersion: "C-31.0",
    advantageScore: adv.score ?? 0,
    advantageBand: adv.band ?? "neutral",
    advantageTier: adv.tier ?? 0
  });
}

function buildHintsField(context = {}) {
  const gh = context.globalHints || {};
  return Object.freeze({
    fallbackBandLevel: gh.fallbackBandLevel ?? 0,
    chunkHints: gh.chunkHints || {},
    cacheHints: gh.cacheHints || {},
    prewarmHints: gh.prewarmHints || {},
    coldStartHints: gh.coldStartHints || {}
  });
}

function deriveFactoringSignal({ meshPressureIndex = 0, cachePriority = "normal", prewarmNeeded = false }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildComputeProfile({ band, context = {}, capabilityModel = {} }) {
  const b = normalizeBand(band);
  const hintsField = buildHintsField(context);
  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex = (context.meshSignals && context.meshSignals.meshPressureIndex) || 0;

  const factoringSignal = deriveFactoringSignal({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const serverHints = context.serverAdvantageHints || {};
  const performanceRatio = capabilityModel.performanceRatio ?? 1;
  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const offlineScore = capabilityModel.offlineScore ?? 0;

  const gpuPreferred = gpuScore > 0;
  const minerPreferred = minerScore > 0;
  const offlinePreferred = offlineScore > 0;

  const chunkAggression = clamp01(hintsField.chunkHints.chunkAggression ?? 0);

  return Object.freeze({
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === CIRC_BANDS.BINARY,
    symbolicPreferred: b === CIRC_BANDS.SYMBOLIC,
    factoringSignal,
    performanceRatio,

    gpuPreferred,
    minerPreferred,
    offlinePreferred,

    hotStateReuse: serverHints.hotStateReuse ?? true,
    multiInstanceBatching: serverHints.multiInstanceBatching ?? true,
    serverPlanCache: serverHints.planCache ?? true,
    serverBinaryReuse: serverHints.binaryReuse ?? true
  });
}

// ============================================================================
// ⭐ Pulse Intelligence (logic-only, IMMORTAL-safe, routing-level, v31)
// ============================================================================

function computePulseIntelligence({
  advantageField,
  presenceField,
  computeProfile,
  band,
  continuanceSnapshot,
  riskSnapshot
}) {
  const advantageScore = clamp01(advantageField.advantageScore || 0);
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const factoring = computeProfile.factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;
  const performanceRatio = computeProfile.performanceRatio || 1;

  const contScore = continuanceSnapshot && typeof continuanceSnapshot.continuanceScore === "number"
    ? continuanceSnapshot.continuanceScore
    : 0;

  const riskScore = riskSnapshot && typeof riskSnapshot.riskScore === "number"
    ? riskSnapshot.riskScore
    : 0;

  const continuanceWeight = 1 - clamp01(contScore);
  const riskWeight = clamp01(riskScore);

  const dualBandBalance = typeof advantageField.dualBandBalance === "number"
    ? clamp01(advantageField.dualBandBalance)
    : 0;

  const solvednessScore = clamp01(
    advantageScore * 0.35 +
    presenceWeight * 0.18 +
    factoring * 0.12 +
    performanceRatio * 0.15 +
    continuanceWeight * 0.10 +
    riskWeight * 0.05 +
    dualBandBalance * 0.05
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.6 +
    (bandIsBinary ? 0.15 : 0) +
    (advantageTier >= 2 ? 0.20 : advantageTier === 1 ? 0.08 : 0)
  );

  return {
    solvednessScore,
    factoringSignal: computeProfile.factoringSignal ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    performanceRatio,
    continuanceScore: contScore,
    riskScore,
    dualBandBalance
  };
}

// ============================================================================
// ⭐ Neural Surfaces (Overmind / Scheduler / Runtime aware, deterministic)
// ============================================================================

function buildNeuralSurfaces({
  overmindContext = {},
  schedulerContext = {},
  runtimeContext = {},
  pulseIntelligence
}) {
  const overmindState = overmindContext.state || null;
  const overmindBand = overmindContext.band || null;

  const schedulerActive = schedulerContext.active ?? null;
  const schedulerLoad = schedulerContext.loadIndex ?? null;

  const runtimeMode = runtimeContext.mode || null;
  const runtimeLoad = runtimeContext.loadIndex ?? null;

  return Object.freeze({
    overmind: {
      state: overmindState,
      band: overmindBand
    },
    scheduler: {
      active: schedulerActive,
      loadIndex: schedulerLoad
    },
    runtime: {
      mode: runtimeMode,
      loadIndex: runtimeLoad
    },
    intelligence: pulseIntelligence
  });
}

// ============================================================================
// Deterministic Marketplace Health Evaluation
// ============================================================================

function evaluateMarketplaceHealth(marketplace) {
  const h = typeof marketplace.healthScore === "number"
    ? marketplace.healthScore
    : 1.0;

  if (h >= 0.95) return "healthy";
  if (h >= 0.85) return "soft";
  if (h >= 0.50) return "mid";
  if (h >= 0.15) return "hard";
  return "critical";
}

// ============================================================================
// 1. discoverHealthyMarketplaces — Deterministic Sensory Reflex
// ============================================================================

export function discoverHealthyMarketplaces(marketplaces) {
  circulatoryHealing.cycleCount++;

  try {
    const healthy = [];

    for (const m of marketplaces) {
      const tier = evaluateMarketplaceHealth(m);
      if (tier === "healthy" || tier === "soft") {
        healthy.push(m);
      }
    }

    const ids = healthy.map(m => m.id);
    circulatoryHealing.lastHealthyMarketplaces = ids;
    circulatoryHealing.lastHealthSignature = buildHealthSignature(ids);

    return healthy;

  } catch (err) {
    circulatoryHealing.lastHealthError = String(err && err.message ? err.message : err);
    return [];
  }
}

// ============================================================================
// 2. fetchJobsFromMarketplaces — Deterministic Intake
// ============================================================================

export function fetchJobsFromMarketplaces(marketplaces) {
  try {
    const allJobs = [];

    for (const m of marketplaces) {
      const jobs = Array.isArray(m.jobs) ? m.jobs : [];

      for (const j of jobs) {
        allJobs.push({
          ...j,
          marketplaceId: m.id
        });
      }
    }

    circulatoryHealing.lastJobsFetched = allJobs.length;
    circulatoryHealing.lastJobListSignature = buildJobListSignature(allJobs.length);

    return allJobs;

  } catch (err) {
    circulatoryHealing.lastFetchError = String(err && err.message ? err.message : err);
    return [];
  }
}

// ============================================================================
// INTERNAL: Deterministic Job Capability Scoring (capabilityModel-driven)
// ============================================================================

function scoreJobForCapability(job, capabilityModel = {}) {
  const cpuRequired = job.cpuRequired ?? 0;
  const memRequired = job.memoryRequired ?? 0;
  const gpuRequired = job.gpuRequired ?? 0;

  const cpuCores = capabilityModel.cpuCores ?? 0;
  const memoryMB = capabilityModel.memoryMB ?? 0;
  const gpuScore = capabilityModel.gpuScore ?? 0;

  const cpuScore = cpuCores <= 0 ? 0 : (cpuCores >= cpuRequired ? 1 : 0.2);
  const memScore = memoryMB <= 0 ? 0 : (memoryMB >= memRequired ? 1 : 0.2);
  const gpuScoreNorm = gpuScore <= 0 ? 0 : (gpuScore >= gpuRequired ? 1 : 0.2);

  return (cpuScore + memScore + gpuScoreNorm) / 3;
}

// ============================================================================
// INTERNAL: Deterministic Band-Aware Job Score (v31 + capabilityModel + INTEL)
// ============================================================================

function scoreJobWithBand(job, capabilityModel, band, context = {}) {
  const baseCapability = scoreJobForCapability(job, capabilityModel);
  const rep = job.reputationWeight ?? 0.5;

  const b = normalizeBand(band);
  const bandBias = b === CIRC_BANDS.BINARY ? 1.1 : 1.0;

  const presenceField = buildPresenceField(context);
  const meshPressure = presenceField.meshPressureIndex || 0;
  const hintsField = buildHintsField(context);
  const fallbackBandLevel = hintsField.fallbackBandLevel || 0;

  const pressureBias = 1 + (meshPressure / 300);
  const fallbackBias = 1 - (fallbackBandLevel * 0.05);

  const performanceRatio = capabilityModel.performanceRatio ?? 1;

  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const offlineScore = capabilityModel.offlineScore ?? 0;

  const gpuBias = gpuScore > 0 ? 1.05 : 1.0;
  const minerBias = minerScore > 0 ? 1.03 : 1.0;
  const offlineBias = offlineScore > 0 ? 1.02 : 1.0;

  const chunkAggression = clamp01(hintsField.chunkHints.chunkAggression || 0);
  const chunkBias = 1 + chunkAggression * 0.05;

  return baseCapability
    * (0.5 + rep)
    * bandBias
    * pressureBias
    * fallbackBias
    * performanceRatio
    * gpuBias
    * minerBias
    * offlineBias
    * chunkBias;
}

// ============================================================================
// 3. selectBestJob — Deterministic Autonomic Prioritization (v31 IMMORTAL-INTEL)
// ============================================================================

export function selectBestJob(
  jobs,
  band = CIRC_BANDS.SYMBOLIC,
  context = {},
  capabilityModel = {}
) {
  try {
    const normalizedBand = normalizeBand(band);

    let bestJob = null;
    let bestScore = -Infinity;

    for (const job of jobs) {
      if (!job.id || !job.marketplaceId) continue;

      const finalScore = scoreJobWithBand(job, capabilityModel, normalizedBand, context);

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestJob = job;
      }
    }

    if (bestJob) {
      circulatoryHealing.lastBestJobId = bestJob.id;
      circulatoryHealing.lastSelectionSignature = buildSelectionSignature(bestJob.id);
    }

    return bestJob;

  } catch (err) {
    circulatoryHealing.lastSelectionError = String(err && err.message ? err.message : err);
    return null;
  }
}

// ============================================================================
// 4. getNextJob — Full Neural‑Circulatory Routing Cycle (v31 IMMORTAL-INTEL)
// ============================================================================
// capabilityModel is REQUIRED for strict purity: no internal device assumptions.

export function getNextJob(
  allMarketplaces,
  getMarketplaceReputation,
  band = CIRC_BANDS.SYMBOLIC,
  context = {},
  capabilityModel = {},
  continuanceSnapshot = null,
  riskSnapshot = null,
  overmindContext = {},
  schedulerContext = {},
  runtimeContext = {}
) {
  const normalizedBand = normalizeBand(band);
  circulatoryHealing.lastBand = normalizedBand;
  circulatoryHealing.lastCapabilityModel = { ...capabilityModel };
  circulatoryHealing.lastPerformanceRatio = capabilityModel.performanceRatio ?? 1;

  circulatoryHealing.lastContinuanceSnapshot = continuanceSnapshot;
  circulatoryHealing.lastRiskSnapshot = riskSnapshot;
  circulatoryHealing.lastOvermindContext = overmindContext;
  circulatoryHealing.lastSchedulerContext = schedulerContext;
  circulatoryHealing.lastRuntimeContext = runtimeContext;

  try {
    const presenceField = buildPresenceField(context);
    const advantagePresenceField = buildAdvantagePresenceField(context);
    const hintsField = buildHintsField(context);
    const computeProfile = buildComputeProfile({ band: normalizedBand, context, capabilityModel });

    const healthy = discoverHealthyMarketplaces(allMarketplaces);
    if (healthy.length === 0) {
      const loopField = buildLoopField([], normalizedBand);
      const waveField = buildWaveField([], normalizedBand);
      const advantageField = buildAdvantageFieldForRouting([], normalizedBand, context);

      const pulseIntelligence = computePulseIntelligence({
        advantageField: {
          ...advantageField,
          advantageScore: advantagePresenceField.advantageScore,
          advantageTier: advantagePresenceField.advantageTier
        },
        presenceField,
        computeProfile,
        band: normalizedBand,
        continuanceSnapshot,
        riskSnapshot
      });

      const neuralSurfaces = buildNeuralSurfaces({
        overmindContext,
        schedulerContext,
        runtimeContext,
        pulseIntelligence
      });

      circulatoryHealing.lastLoopField = loopField;
      circulatoryHealing.lastWaveField = waveField;
      circulatoryHealing.lastAdvantageField = advantageField;

      circulatoryHealing.lastPresenceField = presenceField;
      circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
      circulatoryHealing.lastHintsField = hintsField;
      circulatoryHealing.lastComputeProfile = computeProfile;

      circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
      circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
        JSON.stringify(pulseIntelligence)
      );

      circulatoryHealing.lastNeuralSurfaces = neuralSurfaces;

      circulatoryHealing.lastRoutingCycleSignature =
        buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

      return null;
    }

    const jobs = fetchJobsFromMarketplaces(healthy);
    if (jobs.length === 0) {
      const loopField = buildLoopField([], normalizedBand);
      const waveField = buildWaveField([], normalizedBand);
      const advantageField = buildAdvantageFieldForRouting([], normalizedBand, context);

      const pulseIntelligence = computePulseIntelligence({
        advantageField: {
          ...advantageField,
          advantageScore: advantagePresenceField.advantageScore,
          advantageTier: advantagePresenceField.advantageTier
        },
        presenceField,
        computeProfile,
        band: normalizedBand,
        continuanceSnapshot,
        riskSnapshot
      });

      const neuralSurfaces = buildNeuralSurfaces({
        overmindContext,
        schedulerContext,
        runtimeContext,
        pulseIntelligence
      });

      circulatoryHealing.lastLoopField = loopField;
      circulatoryHealing.lastWaveField = waveField;
      circulatoryHealing.lastAdvantageField = advantageField;

      circulatoryHealing.lastPresenceField = presenceField;
      circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
      circulatoryHealing.lastHintsField = hintsField;
      circulatoryHealing.lastComputeProfile = computeProfile;

      circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
      circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
        JSON.stringify(pulseIntelligence)
      );

      circulatoryHealing.lastNeuralSurfaces = neuralSurfaces;

      circulatoryHealing.lastRoutingCycleSignature =
        buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

      return null;
    }

    const weightedJobs = jobs.map(job => {
      const rep = getMarketplaceReputation(job.marketplaceId);
      return { ...job, reputationWeight: rep };
    });

    const best = selectBestJob(weightedJobs, normalizedBand, context, capabilityModel);

    const loopField = buildLoopField(weightedJobs, normalizedBand);
    const waveField = buildWaveField(weightedJobs, normalizedBand);
    const advantageField = buildAdvantageFieldForRouting(weightedJobs, normalizedBand, context);

    const pulseIntelligence = computePulseIntelligence({
      advantageField: {
        ...advantageField,
        advantageScore: advantagePresenceField.advantageScore,
        advantageTier: advantagePresenceField.advantageTier
      },
      presenceField,
      computeProfile,
      band: normalizedBand,
      continuanceSnapshot,
      riskSnapshot
    });

    const neuralSurfaces = buildNeuralSurfaces({
      overmindContext,
      schedulerContext,
      runtimeContext,
      pulseIntelligence
    });

    circulatoryHealing.lastLoopField = loopField;
    circulatoryHealing.lastWaveField = waveField;
    circulatoryHealing.lastAdvantageField = advantageField;

    circulatoryHealing.lastPresenceField = presenceField;
    circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
    circulatoryHealing.lastHintsField = hintsField;
    circulatoryHealing.lastComputeProfile = computeProfile;

    circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
    circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
      JSON.stringify(pulseIntelligence)
    );

    circulatoryHealing.lastNeuralSurfaces = neuralSurfaces;

    circulatoryHealing.lastRoutingCycleSignature =
      buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

    return best;

  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    circulatoryHealing.lastSelectionError = msg;

    const presenceField = buildPresenceField(context);
    const advantagePresenceField = buildAdvantagePresenceField(context);
    const hintsField = buildHintsField(context);
    const computeProfile = buildComputeProfile({ band: normalizedBand, context, capabilityModel });

    const loopField = buildLoopField([], normalizedBand);
    const waveField = buildWaveField([], normalizedBand);
    const advantageField = buildAdvantageFieldForRouting([], normalizedBand, context);

    const pulseIntelligence = computePulseIntelligence({
      advantageField: {
        ...advantageField,
        advantageScore: advantagePresenceField.advantageScore,
        advantageTier: advantagePresenceField.advantageTier
      },
      presenceField,
      computeProfile,
      band: normalizedBand,
      continuanceSnapshot,
      riskSnapshot
    });

    const neuralSurfaces = buildNeuralSurfaces({
      overmindContext,
      schedulerContext,
      runtimeContext,
      pulseIntelligence
    });

    circulatoryHealing.lastLoopField = loopField;
    circulatoryHealing.lastWaveField = waveField;
    circulatoryHealing.lastAdvantageField = advantageField;

    circulatoryHealing.lastPresenceField = presenceField;
    circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
    circulatoryHealing.lastHintsField = hintsField;
    circulatoryHealing.lastComputeProfile = computeProfile;

    circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
    circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
      JSON.stringify(pulseIntelligence)
    );

    circulatoryHealing.lastNeuralSurfaces = neuralSurfaces;

    circulatoryHealing.lastRoutingCycleSignature =
      buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

    return null;
  }
}

// ============================================================================
// Export — Circulatory Organ (v31-Immortal-INTEL)
// ============================================================================

export const PulseEarnCirculatorySystem = {
  meta: PulseEarnCirculatorySystemMeta,
  getHealingState: getPulseEarnCirculatoryHealingState,
  discoverHealthyMarketplaces,
  fetchJobsFromMarketplaces,
  selectBestJob,
  getNextJob
};

export default {
  PulseEarnCirculatorySystem,
  PulseEarnCirculatorySystemMeta,
  getPulseEarnCirculatoryHealingState,
  discoverHealthyMarketplaces,
  fetchJobsFromMarketplaces,
  selectBestJob,
  getNextJob
};

PulseRealm.EarnCirculatorySystem = {
  PulseEarnCirculatorySystem,
  PulseEarnCirculatorySystemMeta,
  getPulseEarnCirculatoryHealingState,
  discoverHealthyMarketplaces,
  fetchJobsFromMarketplaces,
  selectBestJob,
  getNextJob
};
