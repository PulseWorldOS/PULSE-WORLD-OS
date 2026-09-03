// ============================================================================
//  PULSE OS v30‑IMMORTAL‑ORGANISM — POWER‑PRIME RISK ENGINE
//  Predictive Risk Vector • Artery Fusion • Drift‑Aware • Mesh / Proxy‑Aware
//  Presence • Advantage • Fallback Bands • Chunk/Cache/Prewarm/Earn/Motion Hints
//  PURE COMPUTE. ZERO MUTATION. ZERO RANDOMNESS. ZERO I/O.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
//  META
// ============================================================================

export const PowerRiskEngineMeta = Object.freeze({
  identity: "PowerRiskEngine",
  version: "v30-IMMORTAL++++",
  schemaVersion: "v4",
  layer: "organism_power",
  role: "power_prime_risk",
  guarantees: {
    pureCompute: true,
    zeroMutation: true,
    zeroIO: true,
    zeroRandomness: true,
    deterministic: true
  },
  evo: {
    riskV4: true,
    arteryFusionV4: true,
    presenceAware: true,
    advantageAware: true,
    meshAware: true,
    proxyAware: true,
    bandAware: true,
    laneAware: true,
    cosmosAware: true
  }
});

// ============================================================================
//  INTERNAL HELPERS — SAFE NORMALIZATION
// ============================================================================

function norm(v) {
  if (typeof v !== "number" || isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function safeLen(arr) {
  return Array.isArray(arr) ? arr.length : 0;
}

function safeNum(v, d = 0) {
  return typeof v === "number" && !isNaN(v) ? v : d;
}

function safeObj(v, d = {}) {
  return v && typeof v === "object" ? v : d;
}

function safeBool(v, d = false) {
  return typeof v === "boolean" ? v : d;
}

// ============================================================================
//  ARTERY FUSION — BUILD RISK VECTOR INPUTS
// ============================================================================

function fuseArteryWeights(fusedArteries) {
  const {
    metabolic = {},
    nervous = {},
    immune = {},
    hormones = {},
    pipeline = {},
    scanner = {},
    personalFrame = {},
    personality = {},
    memory = {},
    evolution = {}
  } = fusedArteries || {};

  return Object.freeze({
    metabolicPressure: norm(metabolic.pressure),
    metabolicLoad: norm(metabolic.load),

    routingPressure: norm(nervous.routingPressure),
    routingCost: norm(nervous.cost),

    immuneRisk: norm(immune.risk),
    immuneDrift: norm(immune.drift),

    hormoneStress: norm(hormones.stress),
    hormoneStability: norm(hormones.stability),

    pipelinePressure: norm(pipeline.pressure),
    pipelineCost: norm(pipeline.cost),

    scannerDrift: norm(scanner.driftScore),

    toneWarmth: norm(personality.warmth),
    toneClarity: norm(personality.clarity),
    toneHumility: norm(personality.humility),

    abstractionLevel:
      personalFrame.abstraction === "high"
        ? 0.2
        : personalFrame.abstraction === "low"
        ? 0.8
        : 0.5,

    memoryStability: norm(memory.stability),
    memoryDrift: norm(memory.drift),

    evolutionSchemaDrift: norm(evolution.schemaDrift),
    evolutionFileDrift: norm(evolution.fileDrift),
    evolutionRouteDrift: norm(evolution.routeDrift)
  });
}

// ============================================================================
//  POWER‑RISK VECTOR v4 — CORE COMPUTATION
// ============================================================================

export function computePowerRiskVectorV4({
  power,
  history,
  fusedArteries,
  continuance,
  cosmosContext = {},
  settings = {}
}) {
  const latest = power[0] || null;
  const fused = fuseArteryWeights(fusedArteries);

  // 1. GRID INSTABILITY SCORE (history-based)
  let instability = 0;
  if (Array.isArray(history) && history.length > 3) {
    let jumps = 0;
    for (let i = 1; i < history.length; i++) {
      const prev = history[i - 1];
      const curr = history[i];
      if (!prev || !curr || prev.value === 0) continue;
      const diff = Math.abs(curr.value - prev.value);
      const pct = (diff / prev.value) * 100;
      if (pct >= 20) jumps++;
    }
    instability = norm(jumps / history.length);
  }

  // 2. OUTAGE‑LIKELIHOOD SCORE (predictive)
  const outageLikelihood = norm(
    0.4 * instability +
      0.2 * fused.metabolicPressure +
      0.2 * fused.routingPressure +
      0.2 * fused.pipelinePressure
  );

  // 3. DRIFT‑RISK SCORE (schema + file + route + scanner)
  const driftRisk = norm(
    0.25 * fused.scannerDrift +
      0.25 * fused.evolutionSchemaDrift +
      0.25 * fused.evolutionFileDrift +
      0.25 * fused.evolutionRouteDrift
  );

  // 4. ORGANISM PRESSURE SCORE (metabolic + nervous + pipeline + immune)
  const organismPressure = norm(
    0.3 * fused.metabolicPressure +
      0.25 * fused.routingPressure +
      0.25 * fused.pipelinePressure +
      0.2 * fused.immuneRisk
  );

  // 5. HORMONE‑MODULATED RISK (stress ↑, stability ↓)
  const hormoneMod = norm(
    0.6 * fused.hormoneStress + 0.4 * (1 - fused.hormoneStability)
  );

  // 6. MEMORY‑STABILITY MODULATION (unstable memory increases risk)
  const memoryMod = norm(
    0.5 * (1 - fused.memoryStability) + 0.5 * fused.memoryDrift
  );

  // 7. CONTINUANCE‑AWARE RISK (low continuance → higher risk)
  const cont = continuance.continuanceScore ?? 0;
  const continuanceMod = norm(1 - cont);

  // 8. FINAL POWER‑RISK SCORE (weighted fusion)
  const riskScore = norm(
    0.25 * organismPressure +
      0.2 * outageLikelihood +
      0.2 * instability +
      0.15 * driftRisk +
      0.1 * hormoneMod +
      0.05 * memoryMod +
      0.05 * continuanceMod
  );

  return Object.freeze({
    meta: PowerRiskEngineMeta,
    cosmos: cosmosContext,
    riskScore,
    instability,
    outageLikelihood,
    driftRisk,
    organismPressure,
    hormoneMod,
    memoryMod,
    continuanceMod,
    fusedArteries: fused,
    latestPower: latest
  });
}

// ============================================================================
//  RISK SUMMARY — HUMAN‑READABLE LEVELS
// ============================================================================

export function buildPowerRiskSummaryV4({ riskVector, continuance }) {
  const r = riskVector.riskScore;

  const level =
    r >= 0.85
      ? "critical"
      : r >= 0.65
      ? "high"
      : r >= 0.4
      ? "medium"
      : r >= 0.2
      ? "low"
      : "minimal";

  return Object.freeze({
    meta: PowerRiskEngineMeta,
    level,
    score: r,
    instability: riskVector.instability,
    outageLikelihood: riskVector.outageLikelihood,
    driftRisk: riskVector.driftRisk,
    organismPressure: riskVector.organismPressure,
    continuance: continuance || null
  });
}

// ============================================================================
//  BEACON SIGNALS — OVERMIND‑PRIME EARLY WARNINGS
// ============================================================================

export function buildPowerBeaconSignalsV4({ riskVector, continuance, fusedArteries }) {
  const beacons = [];

  if (riskVector.riskScore >= 0.85) {
    beacons.push({
      type: "power-critical",
      severity: "critical",
      message: "Critical power risk detected — prepare fallback pathways."
    });
  }

  if (riskVector.outageLikelihood >= 0.7) {
    beacons.push({
      type: "power-outage-likely",
      severity: "high",
      message: "Outage likelihood elevated — pre-buffer content."
    });
  }

  if (riskVector.driftRisk >= 0.6) {
    beacons.push({
      type: "power-drift",
      severity: "medium",
      message: "Power schema or file drift detected — review grid ingestion."
    });
  }

  if (continuance.continuanceScore <= 0.25) {
    beacons.push({
      type: "power-continuance-low",
      severity: "medium",
      message: "Continuance window shrinking — reduce load."
    });
  }

  return Object.freeze(beacons);
}

// ============================================================================
//  FULL v30 PRESENCE / ADVANTAGE / MESH / PROXY / FALLBACK / CHUNK PLAN
//  + Earn / Motion hints (pure compute)
// ============================================================================

export function buildPowerRiskPresencePlanV4({
  power,
  history,
  fusedArteries,
  continuance,
  presenceContext = {},
  advantageContext = {},
  meshContext = {},
  proxyContext = {},
  cosmosContext = {},
  settings = {}
}) {
  const riskVector = computePowerRiskVectorV4({
    power,
    history,
    fusedArteries,
    continuance,
    cosmosContext,
    settings
  });

  const summary = buildPowerRiskSummaryV4({ riskVector, continuance });
  const beacons = buildPowerBeaconSignalsV4({
    riskVector,
    continuance,
    fusedArteries
  });

  const risk = riskVector.riskScore;
  const contScore = continuance.continuanceScore ?? 0;

  // Base fallback band ladder (0–3)
  let fallbackBandLevel = 0;
  if (risk >= 0.85 || contScore <= 0.2) {
    fallbackBandLevel = 3;
  } else if (risk >= 0.65 || contScore <= 0.35) {
    fallbackBandLevel = 2;
  } else if (risk >= 0.4 || contScore <= 0.5) {
    fallbackBandLevel = 1;
  }

  // Mesh / proxy modulation
  const meshPressure = norm(safeNum(meshContext.meshPressureIndex, 0));
  const proxyPressure = norm(safeNum(proxyContext.proxyPressure, 0));
  const proxyFallback = safeBool(proxyContext.proxyFallback, false);
  const proxyBoost = norm(safeNum(proxyContext.proxyBoost, 0));

  if (meshPressure > 0.8 || proxyPressure > 0.8 || proxyFallback) {
    fallbackBandLevel = Math.max(fallbackBandLevel, 3);
  } else if (meshPressure > 0.6 || proxyPressure > 0.6) {
    fallbackBandLevel = Math.max(fallbackBandLevel, 2);
  }

  if (proxyBoost > 0.5 && !proxyFallback && proxyPressure < 0.7) {
    fallbackBandLevel = Math.max(0, fallbackBandLevel - 1);
  }

  // PulseBand aggression (0–1, inverse of risk)
  const pulseBandAggression = norm(1 - risk);

  // Presence field
  const bandPresence = {
    band: presenceContext.band || "PulseBand",
    deviceId: presenceContext.deviceId || null,
    hydraNodeId: presenceContext.hydraNodeId || null,
    route: presenceContext.route || "/",
    lane: presenceContext.lane || "auto",
    bandMode: presenceContext.bandMode || "dual"
  };

  const routerPresence = {
    routerHealthy: safeBool(presenceContext.routerHealthy, true),
    proxyHealthy: safeBool(presenceContext.proxyHealthy, true),
    meshPressureIndex: meshPressure,
    proxyMode: proxyContext.proxyMode || null
  };

  // Advantage field
  const advantage = {
    advantageScore: safeNum(advantageContext.advantageScore, 1.0),
    cascadeLevel: safeNum(advantageContext.cascadeLevel, 0),
    timeSavedMs: safeNum(advantageContext.timeSavedMs, 0),
    field: advantageContext.field || "power-risk"
  };

  // Chunk / cache / prewarm hints
  const route = bandPresence.route;

  const prewarmHints = {
    shouldPrewarm: risk >= 0.4 || contScore <= 0.5,
    targetRoutes: [route],
    targetBands: ["PulseBand"],
    reason:
      risk >= 0.65
        ? "high_risk"
        : risk >= 0.4
        ? "medium_risk"
        : contScore <= 0.5
        ? "continuance_low"
        : "steady_state"
  };

  const cacheHints = {
    keepHot: risk >= 0.4 || contScore <= 0.5,
    priority:
      risk >= 0.85
        ? "critical"
        : risk >= 0.65
        ? "high"
        : risk >= 0.4
        ? "medium"
        : "normal",
    advantageScore: advantage.advantageScore,
    meshPressureIndex: meshPressure,
    proxyPressureIndex: proxyPressure,
    cosmos: cosmosContext
  };

  const chunkHints = {
    chunkAggression: pulseBandAggression,
    preferBinaryChunks: true,
    preferPresenceChunks: risk >= 0.4 || contScore <= 0.5,
    meshPressureIndex: meshPressure,
    fallbackBandLevel
  };

  // Earn / motion integration hints (pure compute)
  const earnHints = {
    shouldThrottleEarn: risk >= 0.7 || contScore <= 0.35,
    suggestedEarnIntensity: norm(1 - risk),
    riskScore: risk,
    continuanceScore: contScore
  };

  const motionHints = {
    tickAggression: pulseBandAggression,
    preferBackwardCompression: risk >= 0.6,
    preferForwardExpansion: risk < 0.6,
    fallbackBandLevel
  };

  return Object.freeze({
    meta: {
      ...PowerRiskEngineMeta,
      mode: "presence-plan-v4"
    },
    cosmos: cosmosContext,
    riskVector,
    summary,
    beacons,
    fallbackBandLevel,
    pulseBandAggression,
    presenceField: {
      bandPresence,
      routerPresence
    },
    advantage,
    prewarmHints,
    cacheHints,
    chunkHints,
    earnHints,
    motionHints
  });
}

export default {
  PowerRiskEngineMeta,
  computePowerRiskVectorV4,
  buildPowerRiskSummaryV4,
  buildPowerBeaconSignalsV4,
  buildPowerRiskPresencePlanV4
};

PulseRealm.PulseMeshRiskEngineRisk = buildPowerRiskPresencePlanV4;
PulseRealm.PulseMeshRiskEngineRiskSummary = buildPowerRiskSummaryV4;
PulseRealm.PulseMeshRiskEngineBeacon = buildPowerBeaconSignalsV4;