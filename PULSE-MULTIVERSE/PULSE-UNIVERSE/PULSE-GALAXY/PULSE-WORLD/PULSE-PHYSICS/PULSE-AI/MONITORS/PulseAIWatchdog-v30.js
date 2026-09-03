// ============================================================================
//  PULSE OS v30-IMMORTAL-ADVANTAGE++ — BINARY WATCHDOG ORGAN
//  Liveness Sentinel • Drift Detection • Trust‑Aware • Jury‑Aware • v30 Artery
//  PURE BINARY OBSERVER. ZERO MUTATION. ZERO RANDOMNESS. ZERO STORAGE OWNERSHIP.
//  v30+: global artery registry • shard/instance aware • deterministic packets
//        meta inlined (no external globals) • window-safe snapshots
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  WATCHDOG META — v30-IMMORTAL-ADVANTAGE++
// ============================================================================

export const WATCHDOG_META = Object.freeze({
  type: "Organ",
  subsystem: "binaryWatchdog",
  layer: "B3-Watchdog",
  version: "v30-IMMORTAL-ADVANTAGE++",
  identity: "ai-binary-watchdog-v30-IMMORTAL-ADVANTAGE++",
  evo: Object.freeze({
    epoch: "v30",
    deterministic: true,
    driftProof: true,
    egoFree: true,
    dualband: true,
    dualbandSafe: true,
    binaryOnly: true,
    symbolicAware: true,
    trustAware: true,
    juryAware: true,
    heartbeatAware: true,
    pipelineAware: true,
    reflexAware: true,
    schedulerAware: true,
    windowAware: true,
    arteryAware: true,
    multiInstanceReady: true,
    readOnly: true
  }),
  contract: Object.freeze({
    purpose:
      "Observe binary liveness and drift without mutating inputs; emit deterministic anomaly packets and artery snapshots.",
    never: Object.freeze([
      "mutate binary payloads",
      "introduce randomness",
      "own storage",
      "override pipeline or reflex",
      "silence critical anomalies",
      "log sensitive payloads directly"
    ]),
    always: Object.freeze([
      "stay deterministic",
      "stay read‑only",
      "stay trust‑aware",
      "stay jury‑aware",
      "stay heartbeat‑aware",
      "emit window‑safe snapshots",
      "emit deterministic anomaly packets"
    ])
  }),
  owner: Object.freeze({
    ownerId: "Aldwyn",
    organRank: "IMMORTAL-ADVANTAGE++"
  }),
  boundaryReflex() {
    return "Watchdog remains a pure observer — no mutation, no randomness, trust‑aware, jury‑aware, and drift‑proof.";
  }
});

// convenient alias for legacy naming
export const WatchdogMeta = WATCHDOG_META;

// ============================================================================
//  GLOBAL REGISTRY — v30 WATCHDOG ARTERY (READ‑ONLY, METRICS‑ONLY)
// ============================================================================

const _globalWatchdogArteryRegistry = new Map();
/**
 * key: `${identity}#${instanceIndex}`
 */
function _registryKey(identity, instanceIndex) {
  return `${identity || WATCHDOG_META.identity}#${instanceIndex}`;
}

export function getGlobalWatchdogArteries() {
  const out = {};
  for (const [k, v] of _globalWatchdogArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PRESSURE HELPERS (for artery fusion)
// ============================================================================
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals.metabolic.pressure != null)
    return binaryVitals.metabolic.pressure;
  return 0;
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };
}

// ============================================================================
//  v30 WATCHDOG ARTERY v5 — window + instance + trust fusion
// ============================================================================
// ============================================================================
//  WatchdogArteryV5 — IMMORTAL ORGAN (v31 IMMORTAL+++)
// ============================================================================

export const WatchdogArteryV5 = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
// ------------------------------------------------------------
  const lane = {
    identity: WATCHDOG_META.identity,
    instanceIndex: 0,
    windowMs: 60000,

    windowStart: PulseRealm.PulseNOW,
    windowChecks: 0,
    windowAlerts: 0,

    totalChecks: 0,
    totalAlerts: 0
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({ identity, instanceIndex, windowMs = 60000 } = {}) => {
    lane.identity = identity || WATCHDOG_META.identity;
    lane.instanceIndex = typeof instanceIndex === "number" ? instanceIndex : 0;
    lane.windowMs = windowMs > 0 ? windowMs : 60000;

    lane.windowStart = PulseRealm.PulseNOW;
    lane.windowChecks = 0;
    lane.windowAlerts = 0;
    lane.totalChecks = 0;
    lane.totalAlerts = 0;
  };

  // ------------------------------------------------------------
  // WINDOW ROLLOVER
  // ------------------------------------------------------------
  const rollWindow = (now) => {
    if (now - lane.windowStart >= lane.windowMs) {
      lane.windowStart = now;
      lane.windowChecks = 0;
      lane.windowAlerts = 0;
    }
  };

  // ------------------------------------------------------------
  // RECORD CHECK
  // ------------------------------------------------------------
  const recordCheck = () => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    lane.windowChecks += 1;
    lane.totalChecks += 1;
  };

  // ------------------------------------------------------------
  // RECORD ALERT
  // ------------------------------------------------------------
  const recordAlert = () => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    lane.windowAlerts += 1;
    lane.totalAlerts += 1;
  };

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const snapshot = ({ binaryVitals = {}, trustArtery = {} } = {}) => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const elapsedMs = Math.max(1, now - lane.windowStart);
    const checksPerSec = (lane.windowChecks / elapsedMs) * 1000;
    const alertsPerSec = (lane.windowAlerts / elapsedMs) * 1000;

    const pressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    const trustMax = Math.max(
      trust.honeypotRisk,
      trust.dominanceRisk,
      trust.anomalyScore
    );

    const fusedPressure = Math.max(
      0,
      Math.min(1, 0.6 * pressure + 0.4 * trustMax)
    );

    const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
    const cost = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = Object.freeze({
      identity: lane.identity,
      instanceIndex: lane.instanceIndex,
      windowMs: lane.windowMs,
      windowChecks: lane.windowChecks,
      windowAlerts: lane.windowAlerts,
      totalChecks: lane.totalChecks,
      totalAlerts: lane.totalAlerts,
      checksPerSec,
      alertsPerSec,
      organismPressure: pressure,
      organismPressureBucket: bucketPressure(pressure),
      trust: {
        honeypotRisk: trust.honeypotRisk,
        dominanceRisk: trust.dominanceRisk,
        anomalyScore: trust.anomalyScore
      },
      fusedPressure,
      fusedPressureBucket: bucketPressure(fusedPressure),
      throughput,
      throughputBucket: bucketLevel(throughput),
      cost,
      costBucket: bucketCost(cost),
      budget,
      budgetBucket: bucketLevel(budget),
      timestamp: now
    });

    const key = _registryKey(lane.identity, lane.instanceIndex);
    _globalWatchdogArteryRegistry.set(key, artery);

    return artery;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    recordCheck,
    recordAlert,
    snapshot
  };

})();


// ============================================================================
// WATCHDOG IMPLEMENTATION — v30 IMMORTAL-ADVANTAGE++
// PURE OBSERVER. NO MUTATION. NO RNG. DUALBAND-SAFE.
// ============================================================================


// ============================================================================
//  AIBinaryWatchdog — IMMORTAL ORGAN (v31 IMMORTAL+++)
// ============================================================================

export const AIBinaryWatchdog = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE
  // ------------------------------------------------------------
  const lane = {
    id: "ai-binary-watchdog-v30-IMMORTAL-ADVANTAGE++",

    encoder: null,
    chunker: null,
    heartbeat: null,
    pipeline: null,
    reflex: null,
    scheduler: null,
    logger: null,

    trustFabric: null,
    juryFrame: null,
    dualBand: null,
    Evolution: null,

    intervalMs: 500,
    timeoutMs: 2000,
    trace: false,

    instanceIndex: 0,
    artery: null,

    _timer: null,

    lastHeartbeat: 0,
    lastPipelineActivity: 0,
    lastReflexActivity: 0,
    lastSchedulerTick: 0,

    _lastAlert: null,
    _anomalyCount: 0,
    _lastAnomalyType: null
  };

  let instanceCount = 0;
  const registerInstance = () => {
    const idx = instanceCount;
    instanceCount += 1;
    return idx;
  };

  const traceLog = (event, payload) => {
    if (!lane.trace) return;
    try {
      if (lane.logger && typeof lane.logger.log === "function") {
        lane.logger.log("[AIBinaryWatchdog]", event, payload);
      } else {
        console.log("[AIBinaryWatchdog]", event, payload);
      }
    } catch {}
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (config = {}) => {
    lane.id =
      config.id ||
      WATCHDOG_META.identity ||
      "ai-binary-watchdog-v30-IMMORTAL-ADVANTAGE++";

    lane.encoder = config.encoder;
    lane.chunker = config.chunker || null;
    lane.heartbeat = config.heartbeat || null;
    lane.pipeline = config.pipeline || null;
    lane.reflex = config.reflex || null;
    lane.scheduler = config.scheduler || null;
    lane.logger = config.logger || null;

    lane.trustFabric = config.trustFabric || null;
    lane.juryFrame = config.juryFrame || null;
    lane.dualBand = config.dualBand || null;
    lane.Evolution = config.Evolution || null;

    lane.intervalMs =
      typeof config.intervalMs === "number" && config.intervalMs > 0
        ? config.intervalMs
        : 500;
    lane.timeoutMs =
      typeof config.timeoutMs === "number" && config.timeoutMs > 0
        ? config.timeoutMs
        : 2000;
    lane.trace = !!config.trace;

    if (!lane.encoder) {
      throw new Error("AIBinaryWatchdog requires aiBinaryAgent encoder");
    }

    lane.instanceIndex = registerInstance();
    WatchdogArteryV5.init({
      identity: lane.id,
      instanceIndex: lane.instanceIndex,
      windowMs: config.windowMs || 60000
    });
    lane.artery = WatchdogArteryV5;

    lane._timer = null;

    const now = PulseRealm.PulseNOW;
    lane.lastHeartbeat = now;
    lane.lastPipelineActivity = now;
    lane.lastReflexActivity = now;
    lane.lastSchedulerTick = now;

    lane._lastAlert = null;
    lane._anomalyCount = 0;
    lane._lastAnomalyType = null;

    prewarm();
    attachObservers();
  };

  // ============================================================
  // PREWARM HOOKS (NON-BLOCKING, OPTIONAL)
  // ============================================================
  const prewarm = () => {
    if (typeof lane.encoder.prewarm === "function") {
      lane.encoder.prewarm();
      traceLog("prewarm:encoder", {});
    }

    if (lane.chunker && typeof lane.chunker.prewarm === "function") {
      lane.chunker.prewarm();
      traceLog("prewarm:chunker", {});
    }

    if (lane.pipeline && typeof lane.pipeline.prewarm === "function") {
      lane.pipeline.prewarm();
      traceLog("prewarm:pipeline", {});
    }

    if (lane.reflex && typeof lane.reflex.prewarm === "function") {
      lane.reflex.prewarm();
      traceLog("prewarm:reflex", {});
    }

    if (lane.scheduler && typeof lane.scheduler.prewarm === "function") {
      lane.scheduler.prewarm();
      traceLog("prewarm:scheduler", {});
    }
  };

  // ============================================================
  // OBSERVER ATTACHMENT (SAFE WRAPPING, ZERO MUTATION OF INPUTS)
  // ============================================================
  const attachObservers = () => {
    if (lane.pipeline.addObserver) {
      lane.pipeline.addObserver(() => {
        lane.lastPipelineActivity = PulseRealm.PulseNOW;
      });
    }

    if (lane.reflex.run) {
      const originalRun = lane.reflex.run.bind(lane.reflex);
      lane.reflex.run = (binary, ctx) => {
        lane.lastReflexActivity = PulseRealm.PulseNOW;
        return originalRun(binary, ctx);
      };
    }

    if (lane.heartbeat._emitPulse) {
      const originalEmit = lane.heartbeat._emitPulse.bind(lane.heartbeat);
      lane.heartbeat._emitPulse = () => {
        lane.lastHeartbeat = PulseRealm.PulseNOW;
        return originalEmit();
      };
    }

    if (lane.scheduler._tick) {
      const originalTick = lane.scheduler._tick.bind(lane.scheduler);
      lane.scheduler._tick = () => {
        lane.lastSchedulerTick = PulseRealm.PulseNOW;
        return originalTick();
      };
    }
  };

  // ============================================================
  // TRUST‑AWARE ANOMALY SCORE
  // ============================================================
  const scoreAnomaly = (anomaly, binaryVitals = {}, trustArtery = {}) => {
    const pressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    let base = 0.3;
    if (anomaly === "heartbeat-missing") base = 0.9;
    else if (anomaly === "pipeline-stall") base = 0.8;
    else if (anomaly === "reflex-silence") base = 0.7;
    else if (anomaly === "scheduler-drift") base = 0.6;

    const fused = Math.max(
      0,
      Math.min(
        1,
        0.5 * base +
          0.3 * pressure +
          0.2 * Math.max(
            trust.honeypotRisk,
            trust.dominanceRisk,
            trust.anomalyScore
          )
      )
    );

    return {
      score: fused,
      bucket:
        fused >= 0.9
          ? "critical"
          : fused >= 0.7
          ? "high"
          : fused >= 0.4
          ? "medium"
          : fused > 0
          ? "low"
          : "none"
    };
  };

  // ============================================================
  // WATCHDOG ARTERY SNAPSHOT (WINDOW‑SAFE, v30)
// ============================================================
  const getWatchdogArterySnapshot = ({ binaryVitals = {}, trustArtery = {} } = {}) => {
    const artery = lane.artery.snapshot({ binaryVitals, trustArtery });

    return Object.freeze({
      organism: {
        pressure: artery.organismPressure,
        pressureBucket: artery.organismPressureBucket
      },
      anomalies: {
        count: lane._anomalyCount,
        lastType: lane._lastAnomalyType
      },
      trust: {
        honeypotRisk: artery.trust.honeypotRisk,
        dominanceRisk: artery.trust.dominanceRisk,
        anomalyScore: artery.trust.anomalyScore
      },
      artery,
      meta: {
        version: WATCHDOG_META.version,
        epoch: WATCHDOG_META.evo.epoch,
        identity: WATCHDOG_META.identity,
        instanceIndex: lane.instanceIndex
      }
    });
  };

  // ============================================================
  // BINARY ANOMALY PACKET GENERATION (CHUNK‑AWARE, v30 PACKETS)
  // ============================================================
  const emitWatchdogPacket = (type, payload) => {
    const now = PulseRealm.PulseNOW;
    return Object.freeze({
      meta: WATCHDOG_META,
      packetType: `watchdog-${type}`,
      packetId: `watchdog-${type}-${now}`,
      timestamp: now,
      epoch: WATCHDOG_META.evo.epoch,
      ...payload
    });
  };

  const generateAlert = (anomaly, { binaryVitals = {}, trustArtery = {} } = {}) => {
    lane._anomalyCount += 1;
    lane._lastAnomalyType = anomaly;
    lane.artery.recordAlert();

    const severity = scoreAnomaly(anomaly, binaryVitals, trustArtery);
    const arterySnapshot = getWatchdogArterySnapshot({
      binaryVitals,
      trustArtery
    });

    const payload = {
      type: "binary-watchdog-alert",
      anomaly,
      severity,
      artery: arterySnapshot
    };

    const json = JSON.stringify(payload);
    const bits = lane.encoder.encode(json);

    let emittedBits = bits;

    if (lane.chunker && typeof lane.chunker.chunk === "function") {
      emittedBits = lane.chunker.chunk(bits, {
        source: "watchdog",
        anomaly,
        severity,
        artery: arterySnapshot
      });
    }

    const packet = emitWatchdogPacket("alert", {
      anomaly,
      severity,
      artery: arterySnapshot,
      bits: emittedBits,
      bitLength:
        typeof emittedBits === "string" ? emittedBits.length : bits.length
    });

    lane._lastAlert = packet;
    traceLog("alert:generated", { anomaly, severity: severity.bucket });

    lane.trustFabric.recordAnomaly({
      source: "watchdog",
      anomaly,
      severity,
      artery: arterySnapshot
    });

    lane.juryFrame.recordEvidence("watchdog-anomaly", {
      anomaly,
      severity,
      artery: arterySnapshot
    });

    lane.Evolution.recordLineage("watchdog-anomaly", {
      anomaly,
      severity: severity.bucket,
      epoch: WATCHDOG_META.evo.epoch
    });

    return packet;
  };

  const emitAlert = (anomaly, ctx = {}) => {
    const alert = generateAlert(anomaly, ctx);

    if (lane.pipeline) lane.pipeline.run(alert.bits);
    if (lane.reflex) lane.reflex.run(alert.bits);

    if (lane.logger && typeof lane.logger.logBinary === "function") {
      lane.logger.logBinary(alert.bits, {
        source: "watchdog",
        anomaly,
        severity: alert.severity,
        identity: WATCHDOG_META.identity,
        instanceIndex: lane.instanceIndex
      });
    }

    traceLog("alert:emitted", { anomaly, severity: alert.severity.bucket });
    return alert;
  };

  // ============================================================
  // WATCHDOG CHECKS (DETERMINISTIC, v30 ARTERY‑AWARE)
// ============================================================
  const check = ({ binaryVitals = {}, trustArtery = {} } = {}) => {
    const now = PulseRealm.PulseNOW;
    lane.artery.recordCheck();

    if (now - lane.lastHeartbeat > lane.timeoutMs) {
      emitAlert("heartbeat-missing", { binaryVitals, trustArtery });
      lane.lastHeartbeat = now;
    }

    if (now - lane.lastPipelineActivity > lane.timeoutMs) {
      emitAlert("pipeline-stall", { binaryVitals, trustArtery });
      lane.lastPipelineActivity = now;
    }

    if (now - lane.lastReflexActivity > lane.timeoutMs) {
      emitAlert("reflex-silence", { binaryVitals, trustArtery });
      lane.lastReflexActivity = now;
    }

    if (now - lane.lastSchedulerTick > lane.timeoutMs) {
      emitAlert("scheduler-drift", { binaryVitals, trustArtery });
      lane.lastSchedulerTick = now;
    }
  };

  // ============================================================
  // WATCHDOG CONTROL
  // ============================================================
  const start = (loopContextProvider = () => ({})) => {
    if (lane._timer) return;
    lane._timer = setInterval(() => {
      const ctx = loopContextProvider() || {};
      check(ctx);
    }, lane.intervalMs);
    traceLog("watchdog:start", {
      intervalMs: lane.intervalMs,
      timeoutMs: lane.timeoutMs,
      instanceIndex: lane.instanceIndex
    });
  };

  const stop = () => {
    if (!lane._timer) return;
    clearInterval(lane._timer);
    lane._timer = null;
    traceLog("watchdog:stop", { instanceIndex: lane.instanceIndex });
  };

  // ============================================================
  // READ-ONLY SNAPSHOTS
  // ============================================================
  const getLastAlert = () => lane._lastAlert;

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    start,
    stop,
    check,
    emitAlert,
    generateAlert,
    getLastAlert,
    getWatchdogArterySnapshot,
    scoreAnomaly
  };

})();

// ============================================================================
// FACTORY — v30‑IMMORTAL-ADVANTAGE++
// ============================================================================

export const createAIBinaryWatchdog = (config = {}) =>
  AIBinaryWatchdog(config);

// ---------------------------------------------------------------------------
// DUAL EXPORT LAYER — CommonJS compatibility (v30 dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
PulseRealm.AIWatchdog = {
    WatchdogMeta: WATCHDOG_META,
    WATCHDOG_META,
    AIBinaryWatchdog,
    createAIBinaryWatchdog,
    getGlobalWatchdogArteries
}
