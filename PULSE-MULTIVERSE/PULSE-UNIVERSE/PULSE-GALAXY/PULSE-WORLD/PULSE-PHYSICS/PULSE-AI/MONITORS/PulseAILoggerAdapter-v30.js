// ============================================================================
//  aiLoggerAdapter-v30-IMMORTAL-CORE++.js — Pulse OS v30.0-IMMORTAL-CORE++
//  Binary Logger Membrane • Shadow Forensics • Artery v5 • Mesh-Aware
//  PURE MEMBRANE. ZERO INTERPRETATION. ZERO RANDOMNESS. DELTA‑AWARE, CI‑AWARE.
//  v30+ UPGRADE: Self-contained meta, mesh-aware routing, global artery registry,
//  signal-aware tracing, multi-instance harmony, zero dangling identifiers.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================


// ============================================================================
//  IMMORTAL v30 META — SELF-CONTAINED, NO DANGLING IDENTIFIERS
// ============================================================================

export const LoggerAdapterMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiLoggerAdapter",
  layer: "B2-LoggerMembrane",
  version: "30-Immortal-Core++",
  identity: "aiLoggerAdapter-v30-Immortal-Core++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    egoFree: true,
    adaptive: true,
    harmonic: true,

    dualband: true,
    dualbandSafe: true,
    binaryPrimary: true,
    symbolicAware: true,

    meshAware: true,
    arteryAware: true,
    windowAware: true,
    packetAware: true,
    ciAware: true,
    deltaAware: true,

    multiInstanceReady: true,
    readOnlyMembrane: true,
    zeroMutation: false, // internal counters only, no payload mutation
    epoch: "30-Immortal-Core++"
  }),

  contract: Object.freeze({
    purpose:
      "Membrane for binary logging into ProofLogger-like sinks with CI/delta tagging and artery metrics, without interpreting payloads.",
    never: Object.freeze([
      "mutate binary payloads",
      "interpret semantic content",
      "inject randomness",
      "log sensitive payloads directly without membrane",
      "break identity safety",
      "throw on logger overload when avoidable"
    ]),
    always: Object.freeze([
      "stay deterministic",
      "stay identity-safe",
      "stay binary-only",
      "stay window-safe",
      "emit artery snapshots",
      "tag CI/delta context when available",
      "remain mesh-aware but non-invasive"
    ])
  }),

  mesh: Object.freeze({
    role: "logger-membrane",
    band: "dual",
    tier: "organism-core",
    supportsMeshRouting: true
  }),

  boundaryReflex() {
    return "Logger membrane must remain deterministic, identity-safe, and non-interpreting — never mutate or decode payloads.";
  }
});

// Backwards-compatible identity constant
export const LOGGER_ADAPTER_IDENTITY = LoggerAdapterMeta.identity;

// Minimal experience/meta placeholders for dual-mode exports
export const AI_EXPERIENCE_META = Object.freeze({
  experience: "PulseOS-Immortal-Core++",
  version: "30",
  band: "dual"
});

export const EXPORT_META = Object.freeze({
  module: "aiLoggerAdapter-v30",
  kind: "organ",
  identity: LoggerAdapterMeta.identity,
  version: LoggerAdapterMeta.version
});

// Optional surface/pulse role placeholders (non-erroring)
export const pulseRole = "organism-core";
export const surfaceMeta = Object.freeze({
  layer: LoggerAdapterMeta.layer,
  subsystem: LoggerAdapterMeta.subsystem
});
export const pulseLoreContext = Object.freeze({
  lineage: "PulseOS-Immortal",
  organ: LoggerAdapterMeta.identity
});

// ============================================================================
//  SIGNAL-AWARE TRACE LAYER — v30
// ============================================================================

function traceLoggerEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[aiLoggerAdapter-v30] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "logger-adapter",
      message,
      extra: payload || {},
      system: pulseRole,
      organ: LoggerAdapterMeta.identity,
      layer: surfaceMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  GLOBAL ARTERY REGISTRY (READ-ONLY, METRICS-ONLY) — v30
// ============================================================================
//
//  Registry key: `${id}#${instanceIndex}`
//  Value: latest logger artery snapshot for that instance.
//
const _globalLoggerArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || LoggerAdapterMeta.identity}#${instanceIndex}`;
}

export function getGlobalLoggerArteries() {
  const out = {};
  for (const [k, v] of _globalLoggerArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, logger-scoped
// ============================================================================

function emitLoggerPacket(type, payload, { severity = "info" } = {}) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: LoggerAdapterMeta,
    exportMeta: EXPORT_META,
    packetType: `logger-${type}`,
    packetId: `logger-${type}-${now}`,
    timestamp: now,
    epoch: LoggerAdapterMeta.evo.epoch,
    severity,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL membrane + artery + CI warmup
// ============================================================================

export function prewarmLoggerAdapter(
  dualBand = null,
  {
    trace = false,
    computeSurface = null,
    computeDeltaPacket = null
  } = {}
) {
  const binaryPressure =
    dualBand.binary.metabolic.pressure ??
    dualBand.binary.routing.pressure ??
    0;

  const binaryLoad =
    dualBand.binary.metabolic.load ??
    dualBand.binary.routing.load ??
    0;

  const evolutionMode =
    dualBand.symbolic.evolution.mode ||
    dualBand.symbolic.persona.evolutionMode ||
    "passive";

  const meshTier =
    dualBand.mesh.tier || LoggerAdapterMeta.mesh.tier;

  const packet = emitLoggerPacket("prewarm", {
    message: "Logger adapter v30 prewarmed and membrane artery v5 aligned.",
    binaryPressure,
    binaryLoad,
    evolutionMode,
    meshTier,
    computeSurface: computeSurface || null,
    computeDeltaPacket: computeDeltaPacket || null
  });

  traceLoggerEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30-IMMORTAL-CORE++
// ============================================================================
// ============================================================================
//  AIBinaryLoggerAdapter — IMMORTAL ORGAN (v31 LOGGER-CORE+++)
// ============================================================================
// IMMORTAL trace helper — pure, identity‑safe, non‑recursive
const trace = (event, payload) => {
  try {
    traceLoggerEvent(event, payload, true);
  } catch {
    // IMMORTAL rule: trace must never break the organism
  }
};

export const AIBinaryLoggerAdapter = (() => {

  // ---------------------------------------------------------------------------
  // INTERNAL LANE
  // ---------------------------------------------------------------------------
  const lane = {
    id: LoggerAdapterMeta.identity,

    logger: null,
    shadowLogger: null,
    trace: false,

    computeSurfaceProvider: null,
    computeDeltaProvider: null,
    triHeartId: "dad",

    meshContextProvider: null,

    instanceIndex: 0,
    instanceCount: 0,

    windowMs: 60000,
    _windowStart: PulseRealm.PulseNOW,
    _windowPacketsIn: 0,
    _windowPacketsOut: 0,
    _windowBits: 0,
    _windowCiTagged: 0,
    _windowDeltaTagged: 0,

    _totalPacketsIn: 0,
    _totalPacketsOut: 0,
    _totalBits: 0,
    _totalCiTagged: 0,
    _totalDeltaTagged: 0,

    artery: {
      packetsIn: 0,
      packetsOut: 0,
      lastPacketBits: 0,
      ciTaggedPackets: 0,
      deltaTaggedPackets: 0,
      lastSeverity: "info",
      meshPressure: 0,
      meshLoad: 0,
      snapshot: () => Object.freeze(snapshotArtery())
    }
  };

  // ---------------------------------------------------------------------------
  // INSTANCE REGISTRY
  // ---------------------------------------------------------------------------
  const registerInstance = () => {
    const idx = lane.instanceCount;
    lane.instanceCount += 1;
    return idx;
  };

  const getInstanceCount = () => lane.instanceCount;

  // ---------------------------------------------------------------------------
  // INIT
  // ---------------------------------------------------------------------------
  const init = (config = {}) => {
    lane.id = config.id || LoggerAdapterMeta.identity;

    lane.logger = config.logger;
    lane.shadowLogger = config.shadowLogger || null;
    lane.trace = !!config.trace;

    lane.computeSurfaceProvider = config.computeSurfaceProvider || null;
    lane.computeDeltaProvider = config.computeDeltaProvider || null;
    lane.triHeartId = config.triHeartId || "dad";

    lane.meshContextProvider =
      typeof config.meshContextProvider === "function"
        ? config.meshContextProvider
        : null;

    if (!lane.logger || typeof lane.logger.log !== "function") {
      throw new Error("AIBinaryLoggerAdapter requires logger.log(packet)");
    }

    if (lane.shadowLogger && typeof lane.shadowLogger.logRaw !== "function") {
      throw new Error("shadowLogger must implement .logRaw(binaryString, meta)");
    }

    lane.instanceIndex = registerInstance();

    lane.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    lane._windowStart = PulseRealm.PulseNOW;
    lane._windowPacketsIn = 0;
    lane._windowPacketsOut = 0;
    lane._windowBits = 0;
    lane._windowCiTagged = 0;
    lane._windowDeltaTagged = 0;

    lane._totalPacketsIn = 0;
    lane._totalPacketsOut = 0;
    lane._totalBits = 0;
    lane._totalCiTagged = 0;
    lane._totalDeltaTagged = 0;
  };

  // ---------------------------------------------------------------------------
  // WINDOW ROLLING
  // ---------------------------------------------------------------------------
  const rollWindow = (now) => {
    if (now - lane._windowStart >= lane.windowMs) {
      lane._windowStart = now;
      lane._windowPacketsIn = 0;
      lane._windowPacketsOut = 0;
      lane._windowBits = 0;
      lane._windowCiTagged = 0;
      lane._windowDeltaTagged = 0;
    }
  };

  // ---------------------------------------------------------------------------
  // BUCKET HELPERS
  // ---------------------------------------------------------------------------
  const bucketLoad = (v) => {
    if (v >= 0.95) return "saturated";
    if (v >= 0.75) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "idle";
  };

  const bucketPressure = (v) => {
    if (v >= 0.95) return "overload";
    if (v >= 0.75) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  };

  const bucketCost = (v) => {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  };

  const bucketLevel = (v) => {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  };

  // ---------------------------------------------------------------------------
  // SAFE MESH CONTEXT
  // ---------------------------------------------------------------------------
  const safeMeshContext = () => {
    if (!lane.meshContextProvider) return null;

    try {
      const ctx = lane.meshContextProvider() || {};
      return {
        meshPressure:
          typeof ctx.meshPressure === "number"
            ? Math.max(0, Math.min(1, ctx.meshPressure))
            : 0,
        meshLoad:
          typeof ctx.meshLoad === "number"
            ? Math.max(0, Math.min(1, ctx.meshLoad))
            : 0,
        routeFanout:
          typeof ctx.routeFanout === "number" ? ctx.routeFanout : 0
      };
    } catch (err) {
      trace("mesh:context:error", { error: String(err) });
      return null;
    }
  };

  // ---------------------------------------------------------------------------
  // COMPUTE CONTEXT (CI / DELTA)
  // ---------------------------------------------------------------------------
  const getComputeContext = () => {
    let computeSurface = null;
    let computeDeltaPacket = null;

    try {
      if (typeof lane.computeSurfaceProvider === "function") {
        computeSurface = lane.computeSurfaceProvider() || null;
      }
    } catch {
      computeSurface = null;
    }

    try {
      if (typeof lane.computeDeltaProvider === "function") {
        computeDeltaPacket = lane.computeDeltaProvider() || null;
      }
    } catch {
      computeDeltaPacket = null;
    }

    return { computeSurface, computeDeltaPacket };
  };

  // ---------------------------------------------------------------------------
  // ARTERY SNAPSHOT
  // ---------------------------------------------------------------------------
  const snapshotArtery = () => {
    const {
      packetsIn,
      packetsOut,
      lastPacketBits,
      ciTaggedPackets,
      deltaTaggedPackets,
      lastSeverity,
      meshPressure,
      meshLoad
    } = lane.artery;

    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const elapsedMs = Math.max(1, now - lane._windowStart);
    const packetsInRate = (lane._windowPacketsIn / elapsedMs) * 1000;
    const packetsOutRate = (lane._windowPacketsOut / elapsedMs) * 1000;

    const instanceCount = getInstanceCount() || 1;
    const harmonicLoad = (packetsInRate + packetsOutRate) / instanceCount;

    const load = Math.min(1, (packetsIn + packetsOut) / 8000);
    const pressure = Math.min(1, lastPacketBits / 262144);

    const cost = Math.max(0, Math.min(1, pressure * (1 - load)));
    const budget = Math.max(0, Math.min(1, load - cost));

    const arterySnapshot = {
      instanceIndex: lane.instanceIndex,
      instanceCount,

      packetsIn,
      packetsOut,
      lastPacketBits,

      ciTaggedPackets,
      deltaTaggedPackets,
      lastSeverity,

      windowMs: lane.windowMs,
      windowPacketsIn: lane._windowPacketsIn,
      windowPacketsOut: lane._windowPacketsOut,
      windowBits: lane._windowBits,
      windowCiTagged: lane._windowCiTagged,
      windowDeltaTagged: lane._windowDeltaTagged,

      packetsInRate,
      packetsOutRate,
      harmonicLoad,

      load,
      loadBucket: bucketLoad(load),

      pressure,
      pressureBucket: bucketPressure(pressure),

      cost,
      costBucket: bucketCost(cost),

      budget,
      budgetBucket: bucketLevel(budget),

      meshPressure,
      meshPressureBucket: bucketPressure(meshPressure),

      meshLoad,
      meshLoadBucket: bucketLoad(meshLoad),

      id: lane.id,
      timestamp: now
    };

    const key = _registryKey(lane.id, lane.instanceIndex);
    _globalLoggerArteryRegistry.set(key, arterySnapshot);

    return arterySnapshot;
  };

  const snapshotMembrane = () => {
    const out = emitLoggerPacket("snapshot", {
      artery: snapshotArtery()
    });
    traceLoggerEvent("snapshotMembrane", out, lane.trace);
    return out;
  };

  // ---------------------------------------------------------------------------
  // PACKET BUILDER
  // ---------------------------------------------------------------------------
  const buildPacket = (bits, meta = {}, severity = "info") => {
    const { computeSurface, computeDeltaPacket } = getComputeContext();
    const meshCtx = safeMeshContext();

    const ciMeta =
      computeSurface || computeDeltaPacket
        ? {
            triHeartId: lane.triHeartId,
            computeSurface: computeSurface || null,
            computeDeltaPacket: computeDeltaPacket || null
          }
        : null;

    if (ciMeta && computeSurface) {
      lane.artery.ciTaggedPackets++;
      lane._windowCiTagged++;
      lane._totalCiTagged++;
    }
    if (ciMeta && computeDeltaPacket) {
      lane.artery.deltaTaggedPackets++;
      lane._windowDeltaTagged++;
      lane._totalDeltaTagged++;
    }

    if (meshCtx) {
      lane.artery.meshPressure = meshCtx.meshPressure;
      lane.artery.meshLoad = meshCtx.meshLoad;
    }

    return Object.freeze({
      type: "binary-event",
      source: lane.id,
      bits,
      bitLength: bits.length,
      timestamp: PulseRealm.PulseNOW,
      severity,
      meta: Object.freeze({
        ...meta,
        identitySafe: true,
        ci: ciMeta,
        mesh: meshCtx || null
      })
    });
  };

  // ---------------------------------------------------------------------------
  // SHADOW LOGGER
  // ---------------------------------------------------------------------------
  const shadowLog = (bits, meta) => {
    if (!lane.shadowLogger) return;
    try {
      lane.shadowLogger.logRaw(bits, meta);
    } catch {}
  };

  // ---------------------------------------------------------------------------
  // PRIMARY LOGGING
  // ---------------------------------------------------------------------------
  const logBinary = (binaryStr, meta = {}, { severity = "info" } = {}) => {
    assertBinary(binaryStr);

    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const packet = buildPacket(binaryStr, meta, severity);

    shadowLog(binaryStr, packet.meta);

    trace("logBinary:packet", {
      bitLength: packet.bitLength,
      severity: packet.severity,
      meta: packet.meta
    });

    lane.logger.log(packet);

    lane._windowPacketsIn++;
    lane._windowPacketsOut++;
    lane._windowBits += packet.bitLength;

    lane._totalPacketsIn++;
    lane._totalPacketsOut++;
    lane._totalBits += packet.bitLength;

    lane.artery.packetsIn = lane._totalPacketsIn;
    lane.artery.packetsOut = lane._totalPacketsOut;
    lane.artery.lastPacketBits = packet.bitLength;
    lane.artery.lastSeverity = severity;

    const out = emitLoggerPacket(
      "logged",
      {
        bitLength: packet.bitLength,
        severity: packet.severity,
        meta: packet.meta,
        artery: snapshotArtery()
      },
      { severity }
    );

    traceLoggerEvent("logBinary", out, lane.trace);
    return out;
  };

  // ---------------------------------------------------------------------------
  // PIPELINE ATTACHMENT
  // ---------------------------------------------------------------------------
  const attachToPipeline = (pipeline) => {
    if (!pipeline || typeof pipeline.addObserver !== "function") {
      throw new Error("attachToPipeline expects pipeline.addObserver()");
    }

    pipeline.addObserver(({ stageIndex, input, output }) => {
      logBinary(output, {
        stageIndex,
        inputBits: input.length,
        outputBits: output.length,
        source: "pipeline"
      });
    });

    trace("attachToPipeline", { pipeline: pipeline.id });

    const out = emitLoggerPacket("pipeline-attached", {
      pipelineId: pipeline.id,
      artery: snapshotArtery()
    });

    traceLoggerEvent("attachToPipeline", out, lane.trace);
    return out;
  };

  // ---------------------------------------------------------------------------
  // REFLEX ATTACHMENT
  // ---------------------------------------------------------------------------
  const attachToReflex = (reflex) => {
    if (!reflex || typeof reflex.run !== "function") {
      throw new Error("attachToReflex expects reflex.run()");
    }

    const originalRun = reflex.run.bind(reflex);

    reflex.run = (binaryInput) => {
      const result = originalRun(binaryInput);

      if (result !== null && result !== undefined) {
        logBinary(result, {
          reflexFired: true,
          inputBits: binaryInput.length,
          outputBits: result.length,
          source: "reflex"
        });
      }

      return result;
    };

    trace("attachToReflex", { reflex: reflex.id });

    const out = emitLoggerPacket("reflex-attached", {
      reflexId: reflex.id,
      artery: snapshotArtery()
    });

    traceLoggerEvent("attachToReflex", out, lane.trace);
    return out;
  };

  // ---------------------------------------------------------------------------
  // INTERNAL HELPERS
  // ---------------------------------------------------------------------------
  const assertBinary = (str) => {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  };

  // ---------------------------------------------------------------------------
  // EXPORT IMMORTAL SURFACE
  // ---------------------------------------------------------------------------
  return {
    init,
    logBinary,
    attachToPipeline,
    attachToReflex,
    snapshotMembrane,
    getInstanceCount
  };

})();


// ============================================================================
//  FACTORY
// ============================================================================
export const createAIBinaryLoggerAdapter = (config = {}) =>
  AIBinaryLoggerAdapter(config);

// ============================================================================
//  ORGAN EXPORT — v30 IMMORTAL
// ============================================================================

export const aiLoggerAdapter = Object.freeze({
  meta: LoggerAdapterMeta,
  create: createAIBinaryLoggerAdapter
});

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS) — v30 IMMORTAL
// ============================================================================

PulseRealm.AILoggerAdapter = {
    LOGGER_ADAPTER_IDENTITY,
    LoggerAdapterMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    AIBinaryLoggerAdapter,
    createAIBinaryLoggerAdapter,
    prewarmLoggerAdapter,
    getGlobalLoggerArteries,
    aiLoggerAdapter
}
