// ============================================================================
//  PULSE OS v30‑IMMORTAL‑ORGANISM — POWER‑PRIME CONTINUANCE ENGINE
//  Continuance v4 • Fluctuations v4 • Outages v4 • Presence • Advantage • Proxy
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

export const PowerContinuanceEngineMeta = Object.freeze({
  identity: "PowerContinuanceEngine",
  version: "v30-IMMORTAL++++",
  schemaVersion: "v4",
  layer: "organism_power",
  role: "power_prime_continuance",
  guarantees: {
    pureCompute: true,
    zeroMutation: true,
    zeroIO: true,
    zeroRandomness: true,
    deterministic: true
  },
  evo: {
    continuanceV4: true,
    fluctuationsV4: true,
    outagesV4: true,
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
//  INTERNAL HELPERS
// ============================================================================

function norm(v) {
  if (typeof v !== "number" || isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function safeHistory(history) {
  return Array.isArray(history) ? history : [];
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
//  CONTINUANCE METRICS v4
//  “How hard can we push before they drop?”
// ============================================================================

export function computeContinuanceMetricsV4({
  power,
  history,
  fusedArteries,
  organismSnapshot,
  cosmosContext = {}
}) {
  const h = safeHistory(history);
  const latest = power[0] || null;

  const metabolicPressure = norm(
    fusedArteries.metabolic.pressure ??
      organismSnapshot.binary.metabolic.pressure ??
      0
  );
  const metabolicLoad = norm(
    fusedArteries.metabolic.load ??
      organismSnapshot.binary.metabolic.load ??
      0
  );
  const pipelinePressure = norm(
    fusedArteries.pipeline.pressure ??
      organismSnapshot.binary.pipeline.pressure ??
      0
  );
  const routingPressure = norm(
    fusedArteries.nervous.routingPressure ??
      organismSnapshot.binary.nervous.routingPressure ??
      0
  );

  // Basic stability score from history (0–1)
  let stability = 1;
  if (h.length > 3) {
    let jumps = 0;
    for (let i = 1; i < h.length; i++) {
      const prev = h[i - 1];
      const curr = h[i];
      if (!prev || !curr || prev.value === 0) continue;
      const diff = Math.abs(curr.value - prev.value);
      const pct = (diff / prev.value) * 100;
      if (pct >= 20) jumps++;
    }
    const jumpRatio = Math.min(1, jumps / h.length);
    stability = 1 - jumpRatio;
  }

  // Load factor from metabolic + pipeline + routing
  const loadFactor = norm(
    0.4 * metabolicLoad + 0.3 * pipelinePressure + 0.3 * routingPressure
  );

  // Continuance score: lower stability or higher pressure → higher urgency
  const rawContinuance = norm(
    0.5 * (1 - stability) + 0.5 * metabolicPressure
  );

  // Continuance window (minutes of content to prepare)
  const minWindow = 3;
  const maxWindow = 20;
  const continuanceWindowMinutes =
    minWindow + Math.round(rawContinuance * (maxWindow - minWindow));

  return Object.freeze({
    meta: PowerContinuanceEngineMeta,
    cosmos: cosmosContext,
    stability,
    metabolicPressure,
    metabolicLoad,
    pipelinePressure,
    routingPressure,
    loadFactor,
    continuanceScore: rawContinuance,
    continuanceWindowMinutes,
    latestPower: latest
  });
}

// ============================================================================
//  FLUCTUATION DETECTION v4
// ============================================================================

export function detectFluctuationsV4(history, config = {}, context = {}) {
  const h = safeHistory(history);
  const minDeviation = config.minDeviationPercent || 15;
  const minSamples = config.minFluctuationSamples || 1;
  const fluctuations = [];

  for (let i = 1; i < h.length; i++) {
    const prev = h[i - 1];
    const curr = h[i];

    if (!prev || !curr || prev.value === 0) continue;

    const diff = Math.abs(curr.value - prev.value);
    const pct = (diff / prev.value) * 100;

    if (pct >= minDeviation) {
      fluctuations.push({
        timestamp: curr.timestamp,
        deviation: pct,
        from: prev.value,
        to: curr.value
      });

      console.log(
        `aiPowerPrime: fluctuation ${pct.toFixed(1)}% at ${curr.timestamp}`
      );
    }
  }

  if (fluctuations.length < minSamples) {
    return Object.freeze([]);
  }

  return Object.freeze(fluctuations);
}

// ============================================================================
//  OUTAGE DETECTION v4
// ============================================================================

export function detectOutagesV4(history, config = {}, context = {}) {
  const h = safeHistory(history);
  const outageWindow = config.minOutageWindow || 3;
  const outages = [];

  for (let i = 0; i <= h.length - outageWindow; i++) {
    const window = h.slice(i, i + outageWindow);
    const allZero =
      PulseRealm.length > 0 && PulseRealm.every((entry) => entry.value === 0);

    if (allZero) {
      outages.push({
        start: window[0].timestamp,
        end: window[PulseRealm.length - 1].timestamp
      });

      console.log(
        `aiPowerPrime: outage window detected (${outageWindow} samples)`
      );
    }
  }

  return Object.freeze(outages);
}

// ============================================================================
//  CONTINUANCE PRESENCE PLAN v4
//  Backbone of identity + PulseBand fallback / chunk / cache / prewarm hints
//  + mesh / proxy modulation (still pure compute)
// ============================================================================

export function computeContinuancePresencePlanV4({
  powerHistory,
  fusedArteries,
  organismSnapshot,
  presenceContext = {},
  advantageContext = {},
  meshContext = {},
  proxyContext = {},
  cosmosContext = {},
  config = {}
}) {
  const metrics = computeContinuanceMetricsV4({
    power: powerHistory,
    history: powerHistory,
    fusedArteries,
    organismSnapshot,
    cosmosContext
  });

  const fluctuations = detectFluctuationsV4(
    powerHistory,
    safeObj(config.fluctuationsConfig),
    {}
  );
  const outages = detectOutagesV4(
    powerHistory,
    safeObj(config.outagesConfig),
    {}
  );

  const fluctuationSeverity = norm(
    fluctuations.length / (powerHistory.length || 1)
  );
  const outageSeverity = norm(
    outages.length / (powerHistory.length || 1)
  );

  // Fallback band level: 0 = full, 3 = deepest fallback
  let fallbackBandLevel = 0;
  const c = metrics.continuanceScore;
  const l = metrics.loadFactor;

  if (c >= 0.8 || outageSeverity > 0.3) {
    fallbackBandLevel = 3;
  } else if (c >= 0.6 || outageSeverity > 0.15 || fluctuationSeverity > 0.3) {
    fallbackBandLevel = 2;
  } else if (c >= 0.4 || fluctuationSeverity > 0.15) {
    fallbackBandLevel = 1;
  }

  // Mesh + proxy modulation of fallback
  const meshPressure = norm(
    safeNum(meshContext.meshPressureIndex, 0)
  );
  const proxyPressure = norm(
    safeNum(proxyContext.proxyPressure, 0)
  );
  const proxyFallback = safeBool(proxyContext.proxyFallback, false);
  const proxyBoost = norm(
    safeNum(proxyContext.proxyBoost, 0)
  );

  if (meshPressure > 0.8 || proxyPressure > 0.8 || proxyFallback) {
    fallbackBandLevel = Math.max(fallbackBandLevel, 3);
  } else if (meshPressure > 0.6 || proxyPressure > 0.6) {
    fallbackBandLevel = Math.max(fallbackBandLevel, 2);
  }

  if (proxyBoost > 0.5 && !proxyFallback && proxyPressure < 0.7) {
    fallbackBandLevel = Math.max(0, fallbackBandLevel - 1);
  }

  // PulseBand aggression: how “hard” we’re allowed to push (0–1)
  const pulseBandAggression = norm(1 - c);

  // Presence field (band + router + mesh + proxy + lane/band)
  const bandPresence = {
    band: presenceContext.band || "PulseBand",
    deviceId: presenceContext.deviceId || null,
    hydraNodeId: presenceContext.hydraNodeId || null,
    lane: presenceContext.lane || "auto",
    bandMode: presenceContext.bandMode || "dual"
  };

  const routerPresence = {
    routerHealthy: safeBool(organismSnapshot.binary.router.healthy, true),
    proxyHealthy: safeBool(organismSnapshot.binary.proxy.healthy, true),
    meshPressureIndex: safeNum(meshContext.meshPressureIndex, null),
    proxyMode: proxyContext.proxyMode || null
  };

  // Chunk / cache / prewarm hints
  const advantageScore = safeNum(advantageContext.advantageScore, 1.0);
  const route = presenceContext.route || "/";

  const prewarmHints = {
    shouldPrewarm: c >= 0.4 || outageSeverity > 0,
    targetRoutes: [route],
    targetBands: ["PulseBand"],
    reason:
      c >= 0.4
        ? "high_continuance_urgency"
        : outageSeverity > 0
        ? "recent_outages"
        : "steady_state"
  };

  const cacheHints = {
    keepHot: c >= 0.4 || l >= 0.5,
    priority: c >= 0.7 ? "critical" : c >= 0.4 ? "high" : "normal",
    advantageScore,
    meshPressureIndex: meshPressure,
    proxyPressureIndex: proxyPressure,
    cosmos: cosmosContext
  };

  const chunkHints = {
    chunkAggression: pulseBandAggression,
    preferBinaryChunks: true,
    preferPresenceChunks: c >= 0.4,
    meshPressureIndex: meshPressure,
    fallbackBandLevel
  };

  // Earn / motion integration hints (pure compute)
  const earnHints = {
    shouldThrottleEarn: c >= 0.7 || outageSeverity > 0.2,
    suggestedEarnIntensity: 1 - c,
    outageSeverity,
    fluctuationSeverity
  };

  const motionHints = {
    tickAggression: pulseBandAggression,
    preferBackwardCompression: l >= 0.6,
    preferForwardExpansion: l < 0.6,
    fallbackBandLevel
  };

  return Object.freeze({
    meta: {
      ...PowerContinuanceEngineMeta,
      mode: "presence-plan-v4"
    },
    cosmos: cosmosContext,
    metrics,
    fluctuations,
    outages,
    fallbackBandLevel,
    pulseBandAggression,
    presenceField: {
      bandPresence,
      routerPresence
    },
    prewarmHints,
    cacheHints,
    chunkHints,
    earnHints,
    motionHints
  });
}

export default {
  PowerContinuanceEngineMeta,
  computeContinuanceMetricsV4,
  detectFluctuationsV4,
  detectOutagesV4,
  computeContinuancePresencePlanV4
};

PulseRealm.MeshContinuanceEngine = {
  PowerContinuanceEngineMeta,
  computeContinuanceMetricsV4,
  detectFluctuationsV4,
  detectOutagesV4,
  computeContinuancePresencePlanV4
}