// ===============================================================
//  PULSE-WORLD-UNIVERSE-PULSAR v30-Orbital-Immortal++ (PURE ESM)
//  Galaxy-AWS / Satellite-Conscious Routing Brain
// ===============================================================
//
//  ROLE:
//    - Routing brain of the organism across mesh/host/AWS/satellite.
//    - Decides, per pulse:
//        • WHERE it goes
//        • WHY it goes there
//        • WHAT path it takes
//        • HOW Universe can visualize it
//
//  v30-Orbital-Immortal++ UPGRADE:
//    - Satellite window awareness (position-based, ephemeris-fed)
//    - Region-aware satellite coverage scoring
//    - Multi-satellite / constellation awareness
//    - Pass memory (per region) + simple future-window prediction
//    - Route history + satellite route hints
//    - Backwards-compatible with v2/v3 pre-signal + adaptive routing
//
//  Pure JavaScript.
//  ES Modules only.
// ===============================================================
// ============================================================================
//  UNIVERSAL-PULSAR.js (satellite + world layer)
//  Upgraded to integrate GALACTIC-AWS (which itself imports the proxy).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PULSE_WORLD_CONTRACT_V40 } from "./PULSE-UNIVERSAL-MAP.js";
import { createPulseGalaxyAwsOrbital } from "./PULSE-GALAXY/PULSE-GALACTIC-AWS.js";

// --------------------------------------------
// 0. SMALL HELPERS
// --------------------------------------------

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}


// --------------------------------------------
// 1. EVENT BUS (pub/sub)
// --------------------------------------------

const pulsarBus = {
  handlers: {},

  on(type, handler) {
    if (!this.handlers[type]) this.handlers[type] = [];
    this.handlers[type].push(handler);
  },

  off(type, handler) {
    if (!this.handlers[type]) return;
    this.handlers[type] = this.handlers[type].filter(h => h !== handler);
  },

  emit(type, payload) {
    if (!this.handlers[type]) return;
    this.handlers[type].forEach(h => h(payload));
  }
};


// --------------------------------------------
// 2. WORLD STATE (live + learned context)
// --------------------------------------------
//
//  - health scores (mesh/host/aws/satellite)
//  - cost/latency weights (adaptive)
//  - mesh pressure
//  - satellite pre-signal state
//  - satellite window + coverage (v3+)
//  - multi-satellite / constellation awareness
//  - pass memory + future-window prediction
//  - route stats + route history
//

let worldState = {
  // health (0–1)
  meshHealthScore: 0.8,
  hostHealthScore: 0.9,
  awsRegionHealthScore: 0.95,
  satelliteWindowScore: 0.0,      // legacy v2 window score
  satelliteCoverageScore: 0.0,    // v3: coverage quality for target region (0–1)

  // satellite mode
  currentSatelliteMode: "SYNC_ONLY", // or "SYNC_AND_DELTA"

  // mesh pressure (0–1, 1 = overloaded)
  meshPressure: 0.2,

  // pre-signal state
  satellitePreSignalActive: false,
  satellitePreSignalTs: 0,

  // v3+: satellite window state (position-based)
  satelliteWindowOpen: false,     // true if at least one sat is usable over AOI
  satelliteWindowMeta: {
    regionId: null,               // e.g. "NA-WEST", "EU-CENTRAL"
    satsInView: 0,
    bestElevationDeg: 0,
    nextWindowTs: null,
    constellationActive: false,
    satIdsInView: []              // optional: IDs of sats currently in view
  },

  // v30-Orbital: satellite pass memory (per region)
  // Each entry:
  //   {
  //     regionId,
  //     satId,
  //     startTs,
  //     endTs,
  //     maxElevationDeg,
  //     groundTrackId,
  //     coverageScore
  //   }
  satellitePassMemory: [],

  // v30-Orbital: route history (recent decisions)
  // Each entry:
  //   {
  //     pulseId,
  //     kind,
  //     chosenTarget,
  //     regionId,
  //     tsDecision,
  //     tsCompleted,
  //     success
  //   }
  routeHistory: [],

  // adaptive weights (start defaults)
  costWeights: {
    mesh: 1,
    host: 1.2,
    aws: 1.5,
    satellite: 2
  },

  latencyWeights: {
    mesh: 1,
    host: 1.3,
    aws: 1.6,
    satellite: 2
  },

  // route stats for learning
  routeStats: {
    HOST: { count: 0, avgLatency: null, avgCost: null, failures: 0 },
    MESH: { count: 0, avgLatency: null, avgCost: null, failures: 0 },
    AWS_REGION: { count: 0, avgLatency: null, avgCost: null, failures: 0 },
    SATELLITE_DIRECT: { count: 0, avgLatency: null, avgCost: null, failures: 0 },
    SATELLITE_VIA_MESH: { count: 0, avgLatency: null, avgCost: null, failures: 0 },
    MESH_VIA_SATELLITE: { count: 0, avgLatency: null, avgCost: null, failures: 0 }
  }
};

// Create a single Galactic AWS orbital instance for Pulsar to talk to
const galacticAws = createPulseGalaxyAwsOrbital({
  galaxyID: "PULSE-GALACTIC-AWS",
  trace: false,
  memoryAdapter: null
});

function updateWorldState(partial) {
  worldState = { ...worldState, ...partial };
  pulsarBus.emit("WORLD_STATE_UPDATED", worldState);
}

function getWorldState() {
  return worldState;
}


// --------------------------------------------
// 3. SATELLITE PRE-SIGNAL + POSITIONAL WINDOW
// --------------------------------------------
//
//  v2: registerSatellitePreSignal(info)
//  v3+: updateSatelliteWindowFromEphemeris({ regionId, satsInView, bestElevationDeg, nextWindowTs, satIds })
//  v30-Orbital: recordSatellitePass(passSummary), predictNextWindowForRegion(regionId)
//
//  Ephemeris / pass predictor lives OUTSIDE Pulsar.
//  Pulsar only consumes a distilled view.
//  GALACTIC-AWS now provides orbital + constellation + proxy routing.
//


// v2: pre-signal bump (legacy, still supported)
function registerSatellitePreSignal(info = {}) {
  const now = PulseRealm.PulseNOW;

  worldState.satellitePreSignalActive = true;
  worldState.satellitePreSignalTs = now;

  const bump = info.bump || 0.3;
  worldState.satelliteWindowScore = Math.min(
    1,
    Math.max(worldState.satelliteWindowScore, bump)
  );

  pulsarBus.emit("SATELLITE_PRESIGNAL", {
    ts: now,
    info,
    worldState: { ...worldState }
  });

  pulsarBus.emit("WORLD_STATE_UPDATED", worldState);
}

// optional: decay pre-signal over time (call periodically)
function decaySatellitePreSignal(now = PulseRealm.PulseNOW) {
  if (!worldState.satellitePreSignalActive) return;

  const dt = (now - worldState.satellitePreSignalTs) / 1000; // seconds
  if (dt > 10) {
    worldState.satellitePreSignalActive = false;
    worldState.satelliteWindowScore = Math.max(
      0,
      worldState.satelliteWindowScore - 0.2
    );
    pulsarBus.emit("WORLD_STATE_UPDATED", worldState);
  }
}

// v30-Orbital: record a completed / predicted satellite pass
//
// passSummary = {
//   regionId: string,
//   satId: string,
//   startTs: number,
//   endTs: number,
//   maxElevationDeg?: number,
//   groundTrackId?: string,
//   coverageScore?: number
// }
function recordSatellitePass(passSummary = {}) {
  const {
    regionId = null,
    satId = null,
    startTs = null,
    endTs = null,
    maxElevationDeg = 0,
    groundTrackId = null,
    coverageScore = null
  } = passSummary;

  if (!regionId || !satId || !startTs || !endTs) return;

  const entry = {
    regionId,
    satId,
    startTs,
    endTs,
    maxElevationDeg,
    groundTrackId,
    coverageScore: coverageScore != null ? clamp01(coverageScore) : null
  };

  worldState.satellitePassMemory.push(entry);

  // keep memory bounded
  if (worldState.satellitePassMemory.length > 512) {
    worldState.satellitePassMemory.splice(
      0,
      worldState.satellitePassMemory.length - 512
    );
  }

  // OPTIONAL: sync pass patterns into GALACTIC-AWS orbital memory
  // (non-breaking: if galacticAws has a memoryAdapter, it will persist)
  galacticAws.persistOrbitalPatterns().catch(() => {});

  pulsarBus.emit("SATELLITE_PASS_RECORDED", {
    pass: entry,
    worldState: { ...worldState }
  });
}

// v30-Orbital: simple pattern-based prediction for next window per region
//
// Strategy:
//   - Filter passes for regionId
//   - Sort by startTs
//   - Compute average delta between consecutive passes
//   - Predict nextWindowTs = last.endTs + avgDelta
//
function predictNextWindowForRegion(regionId) {
  const passes = worldState.satellitePassMemory
    .filter(p => p.regionId === regionId)
    .sort((a, b) => a.startTs - b.startTs);

  if (passes.length < 2) return null;

  let totalDelta = 0;
  let count = 0;
  for (let i = 1; i < passes.length; i++) {
    const prev = passes[i - 1];
    const curr = passes[i];
    const delta = curr.startTs - prev.startTs;
    if (delta > 0) {
      totalDelta += delta;
      count += 1;
    }
  }

  if (!count) return null;

  const avgDelta = totalDelta / count;
  const last = passes[passes.length - 1];
  const predictedTs = last.endTs + avgDelta;

  return {
    regionId,
    predictedNextWindowTs: predictedTs,
    avgDeltaMs: avgDelta,
    lastPassEndTs: last.endTs
  };
}

// v3+: update satellite window from external ephemeris / pass engine
//
// ephemerisSummary = {
//   regionId: string,
//   satsInView?: number,
//   bestElevationDeg?: number,   // 0–90
//   nextWindowTs?: number|null,
//   satIds?: string[]            // optional: IDs of sats currently in view
// }
//
// We derive:
//   - satelliteWindowOpen (boolean)
//   - satelliteCoverageScore (0–1)
//   - satelliteWindowScore (legacy, blended)
//   - constellationActive (boolean)
//   - satIdsInView (for multi-sat cooperation)
//
// GALACTIC-AWS is now the upstream orbital engine; Pulsar consumes its distilled view.
function updateSatelliteWindowFromEphemeris(ephemerisSummary = {}) {
  const {
    regionId = null,
    satsInView: rawSatsInView = 0,
    bestElevationDeg = 0,
    nextWindowTs = null,
    satIds = []
  } = ephemerisSummary;

  const satsInView =
    rawSatsInView != null ? rawSatsInView : Array.isArray(satIds) ? satIds.length : 0;

  const elevationNorm = clamp01(bestElevationDeg / 90);
  const satCountFactor = clamp01(satsInView / 5); // 5+ sats = max

  const coverageScore = clamp01(
    0.6 * elevationNorm + 0.4 * satCountFactor
  );
  const windowOpen = coverageScore > 0.25; // threshold for "usable" window
  const constellationActive = satsInView > 1;

  worldState.satelliteWindowOpen = windowOpen;
  worldState.satelliteCoverageScore = coverageScore;
  worldState.satelliteWindowMeta = {
    regionId,
    satsInView,
    bestElevationDeg,
    nextWindowTs,
    constellationActive,
    satIdsInView: Array.isArray(satIds) ? satIds.slice(0, 16) : []
  };

  // blend into legacy satelliteWindowScore so v2 logic still benefits
  worldState.satelliteWindowScore = Math.max(
    worldState.satelliteWindowScore,
    coverageScore
  );

  // optional: if we have no explicit nextWindowTs, try to predict from memory
  if (!nextWindowTs && regionId) {
    const predicted = predictNextWindowForRegion(regionId);
    if (predicted && predicted.predictedNextWindowTs) {
      worldState.satelliteWindowMeta.nextWindowTs =
        predicted.predictedNextWindowTs;
    }
  }

  // NEW: pull a fresh GALACTIC-AWS snapshot so worldState can see orbital field
  try {
    const galacticSnapshot = galacticAws.getSnapshot();
    worldState.galacticAwsSnapshot = galacticSnapshot;
  } catch (e) {
    // non-fatal; Pulsar continues even if GALACTIC-AWS is unavailable
  }

  pulsarBus.emit("SATELLITE_WINDOW_UPDATED", {
    ephemerisSummary,
    worldState: { ...worldState }
  });

  pulsarBus.emit("WORLD_STATE_UPDATED", worldState);
}

// v30-Orbital: satellite route hints for a region
//
// Returns a symbolic hint bundle for higher-level planners:
//   {
//     regionId,
//     windowOpen,
//     coverageScore,
//     satsInView,
//     constellationActive,
//     nextWindowTs,
//     predictedNextWindow,
//     satIdsInView,
//     galacticAwsRoute   // NEW: optional route via GALACTIC-AWS proxy
//   }
//
async function getSatelliteRouteHints(regionId) {
  const meta = worldState.satelliteWindowMeta || {};
  const sameRegion = meta.regionId === regionId;

  const predicted = predictNextWindowForRegion(regionId);

  let galacticAwsRoute = null;
  try {
    // Synthetic context: Pulsar asks GALACTIC-AWS (which uses the proxy)
    galacticAwsRoute = await galacticAws.routeClientViaGalacticProxy({
      region: regionId
    });
  } catch (e) {
    galacticAwsRoute = null;
  }

  return {
    regionId,
    windowOpen: sameRegion ? worldState.satelliteWindowOpen : false,
    coverageScore: sameRegion ? worldState.satelliteCoverageScore : 0,
    satsInView: sameRegion ? meta.satsInView || 0 : 0,
    constellationActive: sameRegion ? !!meta.constellationActive : false,
    nextWindowTs: sameRegion ? meta.nextWindowTs || null : null,
    predictedNextWindow: predicted,
    satIdsInView: sameRegion ? meta.satIdsInView || [] : [],
    galacticAwsRoute
  };
}



// --------------------------------------------
// 4. PATH DERIVATION
// --------------------------------------------

function derivePath(target) {
  switch (target) {
    case "HOST": return ["USER", "HOST"];
    case "MESH": return ["USER", "MESH_NODE"];
    case "AWS_REGION": return ["USER", "HOST", "AWS_REGION"];
    case "SATELLITE_DIRECT": return ["USER", "GROUND_STATION", "SATELLITE"];
    case "SATELLITE_VIA_MESH": return ["USER", "MESH_NODE", "GROUND_STATION", "SATELLITE"];
    case "MESH_VIA_SATELLITE": return ["USER", "SATELLITE", "GROUND_STATION", "MESH_CLUSTER"];
    default: return ["USER", "HOST"];
  }
}


// --------------------------------------------
// 5. LATENCY + COST ESTIMATION (base + learned)
// --------------------------------------------

function estimateLatency(target, w) {
  // base latencies (ms)
  const base = {
    MESH: 10,
    HOST: 20,
    AWS_REGION: 40,
    SATELLITE_DIRECT: 80,
    SATELLITE_VIA_MESH: 90,
    MESH_VIA_SATELLITE: 90
  };

  const baseVal = base[target] || 80;

  // apply latency weights
  let weight = 1;
  if (target === "MESH") weight = w.latencyWeights.mesh;
  else if (target === "HOST") weight = w.latencyWeights.host;
  else if (target === "AWS_REGION") weight = w.latencyWeights.aws;
  else weight = w.latencyWeights.satellite;

  // mesh pressure: if high, effective latency increases
  let pressureFactor = 1;
  if (
    target === "MESH" ||
    target === "MESH_VIA_SATELLITE" ||
    target === "SATELLITE_VIA_MESH"
  ) {
    pressureFactor = 1 + w.meshPressure; // 0–1 → 1–2x
  }

  return baseVal * weight * pressureFactor;
}

function estimateCost(target, w) {
  // base cost units
  const base = {
    MESH: 1,
    HOST: 2,
    AWS_REGION: 3,
    SATELLITE_DIRECT: 5,
    SATELLITE_VIA_MESH: 5.5,
    MESH_VIA_SATELLITE: 5.5
  };

  const baseVal = base[target] || 5;

  let weight = 1;
  if (target === "MESH") weight = w.costWeights.mesh;
  else if (target === "HOST") weight = w.costWeights.host;
  else if (target === "AWS_REGION") weight = w.costWeights.aws;
  else weight = w.costWeights.satellite;

  return baseVal * weight;
}


// --------------------------------------------
// 6. ROUTING RULES PER PULSE KIND (v30-Orbital)
// --------------------------------------------
//
// Now aware of:
//  - meshPressure
//  - satellitePreSignalActive
//  - satelliteWindowOpen / satelliteCoverageScore
//  - constellationActive
//  - adaptive weights
//

function chooseForSync(w) {
  // If we have a positional window + good coverage → strongly prefer satellite
  if (
    w.satelliteWindowOpen &&
    w.satelliteCoverageScore > 0.4 &&
    (w.currentSatelliteMode === "SYNC_ONLY" ||
      w.currentSatelliteMode === "SYNC_AND_DELTA")
  ) {
    return "SATELLITE_DIRECT";
  }

  // Fallback to legacy pre-signal logic
  if (
    w.satellitePreSignalActive &&
    w.satelliteWindowScore > 0.4 &&
    (w.currentSatelliteMode === "SYNC_ONLY" ||
      w.currentSatelliteMode === "SYNC_AND_DELTA")
  ) {
    return "SATELLITE_DIRECT";
  }

  // else mesh if healthy and not overloaded
  if (w.meshHealthScore > 0.5 && w.meshPressure < 0.7) return "MESH";

  // else host
  return "HOST";
}

function chooseForDelta(w) {
  // prefer mesh if healthy and not overloaded
  if (w.meshHealthScore > 0.6 && w.meshPressure < 0.7) return "MESH";

  // if mesh is overloaded but satellite window is good and mode allows deltas
  if (
    w.meshPressure >= 0.7 &&
    w.satelliteCoverageScore > 0.6 &&
    w.currentSatelliteMode === "SYNC_AND_DELTA"
  ) {
    return "SATELLITE_VIA_MESH";
  }

  // else AWS if healthy
  if (w.awsRegionHealthScore > 0.6) return "AWS_REGION";

  // fallback host
  return "HOST";
}

function chooseForWarm(w) {
  // WARM: precompute / preload
  // prefer AWS if healthy
  if (w.awsRegionHealthScore > 0.5) return "AWS_REGION";

  // if mesh is very free (low pressure), use mesh for local warm
  if (w.meshHealthScore > 0.5 && w.meshPressure < 0.4) return "MESH";

  return "HOST";
}

function chooseForEarn(w) {
  // EARN: choose cheapest path by cost estimate
  const candidates = ["MESH", "HOST", "AWS_REGION", "SATELLITE_DIRECT"];
  let best = candidates[0];
  let bestCost = estimateCost(best, w);

  for (let c of candidates.slice(1)) {
    const cost = estimateCost(c, w);
    if (cost < bestCost) {
      bestCost = cost;
      best = c;
    }
  }
  return best;
}

function chooseForShift(w) {
  // SHIFT: moving work/data
  // prefer satellite-assisted global redistribution when window is good
  if (w.satelliteCoverageScore > 0.5 || w.satelliteWindowScore > 0.5) {
    return "MESH_VIA_SATELLITE";
  }

  // else if mesh is healthy and not overloaded, use mesh
  if (w.meshHealthScore > 0.5 && w.meshPressure < 0.7) return "MESH";

  // else AWS as neutral backbone
  return "AWS_REGION";
}

function chooseForHeal(w) {
  // HEAL: choose healthiest major path
  const scores = [
    { target: "MESH",       score: w.meshHealthScore * (1 - w.meshPressure) },
    { target: "HOST",       score: w.hostHealthScore },
    { target: "AWS_REGION", score: w.awsRegionHealthScore }
  ];

  scores.sort((a, b) => b.score - a.score);
  return scores[0].target;
}


// --------------------------------------------
// 7. DECISION ENGINE (THE BRAIN)
// --------------------------------------------

function decideRoute(pulse, w = worldState) {
  let chosen = "HOST";
  let reason = "Default route.";

  switch (pulse.kind) {
    case "SYNC":
      chosen = chooseForSync(w);
      reason =
        "SYNC: prefer satellite when positional window + coverage are good, else mesh, else host.";
      break;

    case "DELTA":
      chosen = chooseForDelta(w);
      reason =
        "DELTA: prefer mesh if healthy, offload to satellite/AWS when pressured.";
      break;

    case "WARM":
      chosen = chooseForWarm(w);
      reason = "WARM: prefer AWS for precompute, mesh if very free.";
      break;

    case "EARN":
      chosen = chooseForEarn(w);
      reason = "EARN: choose cheapest path by adaptive cost.";
      break;

    case "SHIFT":
      chosen = chooseForShift(w);
      reason =
        "SHIFT: prefer satellite-assisted redistribution when window is open / coverage is strong.";
      break;

    case "HEAL":
      chosen = chooseForHeal(w);
      reason =
        "HEAL: choose healthiest effective path (mesh health × (1 - pressure), host, AWS).";
      break;
  }

  const path = derivePath(chosen);
  const latency = estimateLatency(chosen, w);
  const cost = estimateCost(chosen, w);

  const decision = {
    pulseId: pulse.id,
    kind: pulse.kind,
    chosenTarget: chosen,
    path,
    reason,
    metrics: {
      estLatencyMs: latency,
      estCostUnit: cost,
      meshHealthScore: w.meshHealthScore,
      awsRegionHealthScore: w.awsRegionHealthScore,
      satelliteWindowScore: w.satelliteWindowScore,
      satelliteCoverageScore: w.satelliteCoverageScore,
      satelliteWindowOpen: w.satelliteWindowOpen,
      meshPressure: w.meshPressure
    },
    tsDecision: PulseRealm.PulseNOW
  };

  pulsarBus.emit("ROUTE_DECIDED", decision);
  return decision;
}


// --------------------------------------------
// 8. ADAPTIVE LEARNING (update weights + stats)
// --------------------------------------------
//
// Call after dispatch completes with real metrics:
//   applyAdaptiveFeedback(decision, { latencyMs, costUnit, success })
//

function updateRouteStats(target, latencyMs, costUnit, success) {
  const stats = worldState.routeStats[target];
  if (!stats) return;

  stats.count += 1;

  // exponential moving average
  const alpha = 0.2;

  if (latencyMs != null) {
    if (stats.avgLatency == null) stats.avgLatency = latencyMs;
    else stats.avgLatency = stats.avgLatency * (1 - alpha) + latencyMs * alpha;
  }

  if (costUnit != null) {
    if (stats.avgCost == null) stats.avgCost = costUnit;
    else stats.avgCost = stats.avgCost * (1 - alpha) + costUnit * alpha;
  }

  if (!success) {
    stats.failures += 1;
  }
}

function adjustWeightsFromStats() {
  const s = worldState.routeStats;

  // if mesh latency is consistently high → increase latency weight for mesh
  if (s.MESH.avgLatency != null && s.HOST.avgLatency != null) {
    if (s.MESH.avgLatency > s.HOST.avgLatency * 1.5) {
      worldState.latencyWeights.mesh = Math.min(
        worldState.latencyWeights.mesh + 0.1,
        3
      );
    } else {
      worldState.latencyWeights.mesh = Math.max(
        worldState.latencyWeights.mesh - 0.05,
        0.5
      );
    }
  }

  // if satellite failures are high → increase satellite cost weight
  const satFail =
    s.SATELLITE_DIRECT.failures +
    s.SATELLITE_VIA_MESH.failures +
    s.MESH_VIA_SATELLITE.failures;
  const satCount =
    s.SATELLITE_DIRECT.count +
    s.SATELLITE_VIA_MESH.count +
    s.MESH_VIA_SATELLITE.count;
  if (satCount > 0 && satFail / satCount > 0.3) {
    worldState.costWeights.satellite = Math.min(
      worldState.costWeights.satellite + 0.2,
      4
    );
  }

  pulsarBus.emit("WORLD_STATE_UPDATED", worldState);
}

function pushRouteHistory(decision) {
  const regionId = worldState.satelliteWindowMeta.regionId || null;

  worldState.routeHistory.push({
    pulseId: decision.pulseId,
    kind: decision.kind,
    chosenTarget: decision.chosenTarget,
    regionId,
    tsDecision: decision.tsDecision,
    tsCompleted: decision.tsCompleted || null,
    success: decision.success !== false
  });

  if (worldState.routeHistory.length > 512) {
    worldState.routeHistory.splice(
      0,
      worldState.routeHistory.length - 512
    );
  }
}

function applyAdaptiveFeedback(decision, actual) {
  const target = decision.chosenTarget;
  const latencyMs = actual.latencyMs;
  const costUnit = actual.costUnit;
  const success = actual.success !== false;

  updateRouteStats(target, latencyMs, costUnit, success);
  adjustWeightsFromStats();

  decision.success = success;
  decision.tsCompleted = decision.tsCompleted || PulseRealm.PulseNOW;

  pushRouteHistory(decision);

  pulsarBus.emit("ROUTE_FEEDBACK", {
    decision,
    actual,
    worldState: { ...worldState }
  });
}


// --------------------------------------------
// 9. DISPATCHER (decision → transport)
// --------------------------------------------
//
// adapters = {
//   host(pulse, decision) → Promise<{ latencyMs, costUnit }>
//   mesh(...)
//   aws(...)
//   satDirect(...)
//   satViaMesh(...)
//   meshViaSat(...)
// }
//

async function dispatchPulse(pulse, adapters) {
  const decision = decideRoute(pulse, worldState);
  decision.tsDispatched = PulseRealm.PulseNOW;

  let result = { latencyMs: null, costUnit: null, success: true };

  try {
    let res;
    switch (decision.chosenTarget) {
      case "HOST":
        res = await adapters.host(pulse, decision);
        break;
      case "MESH":
        res = await adapters.mesh(pulse, decision);
        break;
      case "AWS_REGION":
        res = await adapters.aws(pulse, decision);
        break;
      case "SATELLITE_DIRECT":
        res = await adapters.satDirect(pulse, decision);
        break;
      case "SATELLITE_VIA_MESH":
        res = await adapters.satViaMesh(pulse, decision);
        break;
      case "MESH_VIA_SATELLITE":
        res = await adapters.meshViaSat(pulse, decision);
        break;
    }

    if (res) {
      result.latencyMs = res.latencyMs ?? null;
      result.costUnit = res.costUnit ?? null;
    }

    decision.success = true;
    decision.tsCompleted = PulseRealm.PulseNOW;
  } catch (err) {
    result.success = false;
    decision.success = false;
    decision.errorCode = err && err.code ? err.code : "UNKNOWN_ERROR";
    decision.tsCompleted = PulseRealm.PulseNOW;
  }

  // adaptive feedback + history
  applyAdaptiveFeedback(decision, result);

  pulsarBus.emit("ROUTE_COMPLETED", decision);
  return decision;
}

PulseRealm.UniversalPulsar = {
  pulsarBus,
  updateWorldState,
  getWorldState,
  registerSatellitePreSignal,
  decaySatellitePreSignal,
  updateSatelliteWindowFromEphemeris,
  recordSatellitePass,
  predictNextWindowForRegion,
  getSatelliteRouteHints,
  decideRoute,
  dispatchPulse,
  applyAdaptiveFeedback
}
// --------------------------------------------
// 10. EXPORTS (ESM)
// --------------------------------------------

export {
  pulsarBus,
  updateWorldState,
  getWorldState,
  registerSatellitePreSignal,
  decaySatellitePreSignal,
  updateSatelliteWindowFromEphemeris,
  recordSatellitePass,
  predictNextWindowForRegion,
  getSatelliteRouteHints,
  decideRoute,
  dispatchPulse,
  applyAdaptiveFeedback
};

PulseRealm.PulseUniversalPulsar = pulsarBus;

export const PulseWorldContract = PULSE_WORLD_CONTRACT_V40;