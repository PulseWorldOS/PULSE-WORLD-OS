// ============================================================================
//  aiSentinel-v30-IMMORTAL-OMEGA.js — Pulse OS Binary Security Sentinel
//  v30+ IMMORTAL-OMEGA
//  • Perimeter immune layer
//  • external threat detection
//  • anomaly scanning + hostile pattern recognition
//  • perimeter-level packet filtering
//  • binary immune artery v6 (throughput, pressure, cost, budget)
//  • multi-instance harmony + spiral warnings (non-blocking)
//  • deterministic, binary-only, no external mutation
// ============================================================================


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const SentinelMeta = Object.freeze({
  identity: "ai-security-sentinel-v30-IMMORTAL-OMEGA",
  version: "v30.0.0",
  evo: {
    epoch: 30,
    tier: "IMMORTAL-OMEGA",
    arteryVersion: 6
  }
});

// ---------------------------------------------------------------------------
//  BUCKET HELPERS
// ---------------------------------------------------------------------------

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

// ---------------------------------------------------------------------------
//  IMMORTAL-OMEGA SECURITY ARTERY v6
// ---------------------------------------------------------------------------

function computeSecurityArteryV6({
  scanRatePerSec,
  alertRatePerSec,
  pulseHaltRatePerSec,
  avgThreatSeverity,
  avgBinaryLength,
  severeRatio,
  instanceCount
}) {
  const harmonicAlertRate =
    instanceCount > 0 ? alertRatePerSec / instanceCount : alertRatePerSec;
  const harmonicHaltRate =
    instanceCount > 0 ? pulseHaltRatePerSec / instanceCount : pulseHaltRatePerSec;

  const scanFactor = Math.min(1, scanRatePerSec / 512);
  const alertFactor = Math.min(1, harmonicAlertRate / 128);
  const haltFactor = Math.min(1, harmonicHaltRate / 32);
  const severityFactor = clamp01(avgThreatSeverity);
  const sizeFactor = Math.min(1, avgBinaryLength / 131072);
  const severeFactor = clamp01(severeRatio);

  const pressure = Math.min(
    1,
    (scanFactor +
      alertFactor +
      haltFactor +
      severityFactor +
      sizeFactor +
      severeFactor) / 6
  );

  const throughput = Math.max(
    0,
    Math.min(
      1,
      1 -
        (alertFactor * 0.3 +
          haltFactor * 0.3 +
          severityFactor * 0.2 +
          severeFactor * 0.2)
    )
  );

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    scanRatePerSec,
    alertRatePerSec,
    pulseHaltRatePerSec,
    harmonicAlertRate,
    harmonicHaltRate,
    severeRatio,
    avgThreatSeverity,
    avgBinaryLength,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget)
  });
}

// ---------------------------------------------------------------------------
//  SECURITY SENTINEL — v30 IMMORTAL-OMEGA
// ---------------------------------------------------------------------------
// ============================================================================
//  AISecuritySentinel — pseudo-class IMMORTAL++ v30
// ============================================================================

let _sentinelInstanceCount = 0;

const _registerSentinelInstance = () => _sentinelInstanceCount++;
const _getSentinelInstanceCount = () => _sentinelInstanceCount || 0;

export const AISecuritySentinel = (config = {}) => {
  const state = {
    id: config.id || SentinelMeta.identity,
    encoder: config.encoder,
    immunity: config.immunity,

    logger: config.logger || null,
    pipeline: config.pipeline || null,
    reflex: config.reflex || null,

    onPulseHalt:
      typeof config.onPulseHalt === "function" ? config.onPulseHalt : null,
    onIsolation:
      typeof config.onIsolation === "function" ? config.onIsolation : null,

    trace: !!config.trace,

    windowMs:
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000,

    _windowStart: PulseRealm.PulseNOW,
    _windowScans: 0,
    _windowAlerts: 0,
    _windowSevereAlerts: 0,
    _windowPulseHalts: 0,
    _windowSeveritySum: 0,
    _windowBinaryLengthSum: 0,

    _totalAlerts: 0,
    _totalPulseHalts: 0,

    instanceIndex: _registerSentinelInstance()
  };

  if (!state.encoder) {
    throw new Error("AISecuritySentinel requires aiBinaryAgent encoder");
  }
  if (!state.immunity) {
    throw new Error("AISecuritySentinel requires aiBinaryImmunity");
  }

  const lineage = Object.freeze({
    version: SentinelMeta.version,
    epoch: SentinelMeta.evo.epoch,
    identity: SentinelMeta.identity
  });

  // -------------------------------------------------------------------------
  //  INTERNAL HELPERS
  // -------------------------------------------------------------------------

  const trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}#${state.instanceIndex}] ${event}`, payload);
  };

  const rollWindow = (now) => {
    if (now - state._windowStart >= state.windowMs) {
      state._windowStart = now;
      state._windowScans = 0;
      state._windowAlerts = 0;
      state._windowSevereAlerts = 0;
      state._windowPulseHalts = 0;
      state._windowSeveritySum = 0;
      state._windowBinaryLengthSum = 0;
    }
  };

  const computeSecurityArterySnapshot = (
    binaryLengthHint = 0,
    severityHint = 0
  ) => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const elapsedMs = Math.max(1, now - state._windowStart);
    const scanRatePerSec = (state._windowScans / elapsedMs) * 1000;
    const alertRatePerSec = (state._windowAlerts / elapsedMs) * 1000;
    const pulseHaltRatePerSec = (state._windowPulseHalts / elapsedMs) * 1000;

    const instanceCount = _getSentinelInstanceCount();

    const avgThreatSeverity =
      state._windowAlerts > 0
        ? state._windowSeveritySum / state._windowAlerts
        : severityHint;

    const avgBinaryLength =
      state._windowAlerts > 0
        ? state._windowBinaryLengthSum / state._windowAlerts
        : binaryLengthHint;

    const severeRatio =
      state._windowAlerts > 0
        ? state._windowSevereAlerts / state._windowAlerts
        : 0;

    return computeSecurityArteryV6({
      scanRatePerSec,
      alertRatePerSec,
      pulseHaltRatePerSec,
      avgThreatSeverity,
      avgBinaryLength,
      severeRatio,
      instanceCount
    });
  };

  const detectThreat = (binary) => {
    if (typeof binary !== "string" || !/^[01]+$/.test(binary)) {
      return { threat: "non-binary-input", severity: 1.0, trust: 0.0 };
    }

    if (/00000000|11111111/.test(binary)) {
      return { threat: "repetition-attack", severity: 0.85, trust: 0.1 };
    }

    if (binary.length < 8) {
      return { threat: "probing-signal", severity: 0.4, trust: 0.4 };
    }

    if (binary.length > 120000) {
      return { threat: "flood-attack", severity: 0.95, trust: 0.05 };
    }

    const ones = binary.split("").filter((b) => b === "1").length;
    const ratio = ones / binary.length;

    if (ratio > 0.9 || ratio < 0.1) {
      return { threat: "entropy-anomaly", severity: 0.65, trust: 0.25 };
    }

    return { threat: null, severity: 0.0, trust: 0.9 };
  };

  const decideAction = ({ severity, trust }) => {
    if (severity >= 0.85 || trust <= 0.1) {
      return { action: "pulse_halt", isolation: true };
    }

    if (severity >= 0.5 || trust <= 0.4) {
      return { action: "isolate", isolation: true };
    }

    return { action: "allow", isolation: false };
  };

  const generateSecurityPacket = ({
    threat,
    severity,
    trust,
    action,
    isolation,
    binaryLength
  }) => {
    const artery = computeSecurityArterySnapshot(binaryLength, severity);

    const payload = {
      type: "binary-security-decision-v30",
      timestamp: PulseRealm.PulseNOW,
      threat,
      severity,
      trust,
      action,
      isolation,
      artery,
      lineage
    };

    const json = JSON.stringify(payload);
    const bits = state.encoder.encode(json);

    const packet = {
      ...payload,
      bits,
      bitLength: bits.length
    };

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical"
    ) {
      trace("security:spiral-warning:v30", {
        threat,
        severity,
        action,
        securityPressure: artery.pressure,
        securityBudgetBucket: artery.budgetBucket
      });
    }

    trace("security:decision:v30", {
      threat,
      severity,
      trust,
      action,
      isolation
    });

    return packet;
  };

  // -------------------------------------------------------------------------
  //  PUBLIC: SECURITY ARTERY SNAPSHOT
  // -------------------------------------------------------------------------

  const getSecurityArtery = () => {
    const artery = computeSecurityArterySnapshot();
    return Object.freeze({
      meta: SentinelMeta,
      instanceIndex: state.instanceIndex,
      instanceCount: _getSentinelInstanceCount(),
      artery
    });
  };

  // -------------------------------------------------------------------------
  //  EVALUATION + ENFORCEMENT
  // -------------------------------------------------------------------------

  const evaluate = (binary) => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    state._windowScans++;

    const { threat, severity, trust } = detectThreat(binary);

    if (!threat && severity === 0) {
      const artery = computeSecurityArterySnapshot(binary.length || 0, 0);

      trace("security:safe:v30", {
        size: binary.length || 0,
        securityPressure: artery.pressure,
        securityBudgetBucket: artery.budgetBucket
      });

      return {
        meta: SentinelMeta,
        threat: null,
        severity: 0,
        trust,
        action: "allow",
        isolation: false,
        artery
      };
    }

    state._windowAlerts++;
    state._windowSeveritySum += severity;
    state._windowBinaryLengthSum += binary.length;
    if (severity >= 0.7) state._windowSevereAlerts++;
    state._totalAlerts++;

    const { action, isolation } = decideAction({ severity, trust });

    if (action === "pulse_halt") {
      state._windowPulseHalts++;
      state._totalPulseHalts++;
    }

    const packet = generateSecurityPacket({
      threat,
      severity,
      trust,
      action,
      isolation,
      binaryLength: binary.length
    });

    return {
      meta: SentinelMeta,
      threat,
      severity,
      trust,
      action,
      isolation,
      packet,
      artery: packet.artery
    };
  };

  const enforce = (binary) => {
    const decision = evaluate(binary);

    if (decision.packet) {
      const bits = decision.packet.bits;
      if (state.pipeline) state.pipeline.run(bits);
      if (state.reflex) state.reflex.run(bits);
      if (state.logger && typeof state.logger.logBinary === "function") {
        state.logger.logBinary(bits, {
          source: "security_sentinel_v30",
          threat: decision.threat,
          action: decision.action
        });
      }
    }

    if (decision.isolation && state.onIsolation) {
      try {
        state.onIsolation({ binary, decision });
      } catch {
        // non-fatal
      }
    }

    if (decision.action === "pulse_halt" && state.onPulseHalt) {
      try {
        state.onPulseHalt({ binary, decision });
      } catch {
        // non-fatal
      }
    }

    if (decision.action !== "allow" && state.immunity.sanitize) {
      state.immunity.sanitize(binary);
    }

    return decision;
  };

  const scan = (binary) => {
    const decision = enforce(binary);
    return decision.action === "allow";
  };

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------

  return {
    state,
    lineage,

    getSecurityArtery,
    evaluate,
    enforce,
    scan
  };
};


// ---------------------------------------------------------------------------
//  FACTORY
// ---------------------------------------------------------------------------


export const createAISecuritySentinel = (config = {}) =>
  AISecuritySentinel(config);

// ---------------------------------------------------------------------------
//  DUAL-MODE EXPORTS (ESM + CommonJS)
// ---------------------------------------------------------------------------

PulseRealm.AISentinel = {
    SentinelMeta,
    AISecuritySentinel,
    createAISecuritySentinel
}
