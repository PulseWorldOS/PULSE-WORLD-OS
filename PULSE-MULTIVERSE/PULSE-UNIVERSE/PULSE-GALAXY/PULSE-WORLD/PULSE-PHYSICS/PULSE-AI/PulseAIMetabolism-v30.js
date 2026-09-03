// ============================================================================
//  aiMetabolism-v30.js — Pulse OS v30.0-IMMORTAL-ADVANTAGE Organ
//  Binary Metabolism Engine • BinaryCore • Deterministic • Metabolic Artery v4
//  v30+ UPGRADE: Clean meta, dualband-aware hooks, global registry, system vitals
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Binary Metabolism Engine** of the organism.
//
//    It manages:
//      • compute load
//      • resource budgeting
//      • binary flow pressure
//      • organ energy distribution
//      • overload prevention
//      • starvation prevention
//      • binary metabolic artery metrics (throughput, pressure, cost, budget)
//      • multi-instance metabolic harmony + spiral warnings (non-blocking)
//
//    It is the organism’s:
//      • energy system
//      • load balancer
//      • resource allocator
//      • metabolic regulator
//      • binary energy artery source
// ============================================================================


// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  IDENTITY (v30 IMMORTAL-ADVANTAGE)
// ============================================================================

export const MetabolismMeta = Object.freeze({
  identity: "aiMetabolism-v30-IMMORTAL-ADVANTAGE",
  role: "binary_metabolism_engine",
  layer: "C3-BinaryMetabolism",
  version: "30.0-IMMORTAL-ADVANTAGE",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    packetAware: true,
    windowAware: true,
    multiInstanceReady: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE"
  }),
  contract: Object.freeze({
    purpose:
      "Provide a binary-first metabolic engine for load, pressure, cost, and budget across organs and instances.",
    boundaries: Object.freeze([
      "pure compute over bits and metrics",
      "no direct network I/O",
      "no direct filesystem I/O",
      "no mutation of external state",
      "metrics-only reporting to external observers"
    ])
  })
});


// ---------------------------------------------------------
//  GLOBAL METABOLIC ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ---------------------------------------------------------
const _globalMetabolicArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || MetabolismMeta.identity}#${instanceIndex}`;
}

export function getGlobalMetabolicArteries() {
  const out = {};
  for (const [k, v] of _globalMetabolicArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ---------------------------------------------------------
//  v30 SIGNAL-AWARE TRACE LAYER (optional, non-fatal)
// ---------------------------------------------------------
function traceMetabolismEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[AIBinaryMetabolism] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "binary-metabolism",
      message,
      extra: payload || {},
      system: MetabolismMeta.role,
      organ: MetabolismMeta.identity,
      layer: MetabolismMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ---------------------------------------------------------
//  PACKET EMITTER — deterministic, metabolism-scoped
// ---------------------------------------------------------
function emitMetabolismPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: MetabolismMeta,
    packetType: `metabolism-${type}`,
    packetId: `metabolism-${type}-${now}`,
    timestamp: now,
    epoch: MetabolismMeta.evo.epoch,
    ...payload
  });
}

// ---------------------------------------------------------
//  PREWARM — v30.0-IMMORTAL-ADVANTAGE
// ---------------------------------------------------------
export function prewarmAIBinaryMetabolism({ trace = false, dualBand = null } = {}) {
  const pressure =
    dualBand.binary.metabolic.pressure ??
    dualBand.binary.pressure ??
    0;

  const load =
    dualBand.binary.metabolic.load ??
    dualBand.binary.load ??
    0;

  const packet = emitMetabolismPacket("prewarm", {
    type: "binary-metabolism-prewarm",
    message:
      "Metabolism engine prewarmed and metabolic artery v4 aligned (v30 IMMORTAL-ADVANTAGE).",
    binary: {
      pressure,
      load
    }
  });

  traceMetabolismEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ARTERY HELPERS — v4 (PURE, STATELESS)
// ============================================================================
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

// ============================================================================
//  ORGAN IMPLEMENTATION — v30.0-IMMORTAL-ADVANTAGE
// ============================================================================
export const AIBinaryMetabolism = (() => {
  // -----------------------------------------------------
  // IMMORTAL INSTANCE REGISTRY
  // -----------------------------------------------------
  let _instanceCount = 0;

  const _registerInstance = () => {
    const index = _instanceCount;
    _instanceCount += 1;
    return index;
  };

  const getInstanceCount = () =>
    typeof _instanceCount === "number" ? _instanceCount : 0;

  // -----------------------------------------------------
  // IMMORTAL CREATION SURFACE
  // -----------------------------------------------------
  const create = (config = {}) => {
    const id = config.id || MetabolismMeta.identity;
    const encoder = config.encoder;
    const pipeline = config.pipeline;
    const scheduler = config.scheduler || null;
    const heartbeat = config.heartbeat || null;
    const vitals = config.vitals || null;
    const logger = config.logger || null;
    const traceEnabled = !!config.trace;

    const nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    const overmindReporter =
      typeof config.overmindReporter === "function"
        ? config.overmindReporter
        : null;

    const heartbeatReporter =
      typeof config.heartbeatReporter === "function"
        ? config.heartbeatReporter
        : null;

    if (!encoder) {
      throw new Error("AIBinaryMetabolism requires aiBinaryAgent encoder");
    }
    if (!pipeline) {
      throw new Error("AIBinaryMetabolism requires aiBinaryPipeline");
    }

    const instanceIndex = _registerInstance();

    // load history (bits length samples)
    const loadHistory = [];

    const metabolicArtery = {
      throughput: 0,
      pressure: 0,
      cost: 0,
      budget: 1,
      load: 0,
      avgSize: 0,
      snapshot: () =>
        Object.freeze({
          throughput: metabolicArtery.throughput,
          pressure: metabolicArtery.pressure,
          cost: metabolicArtery.cost,
          budget: metabolicArtery.budget,
          load: metabolicArtery.load,
          avgSize: metabolicArtery.avgSize,
          instanceIndex,
          instanceCount: getInstanceCount(),
          id,
          epoch: MetabolismMeta.evo.epoch
        })
    };

    // ---------------------------------------------------
    // INTERNAL TRACE
    // ---------------------------------------------------
    const _trace = (event, payload) => {
      traceMetabolismEvent(event, payload, traceEnabled);
    };

    // ---------------------------------------------------
    // ENERGY METRICS
    // ---------------------------------------------------
    const _computeEnergyThroughput = (load) => {
      const raw = 1 - load;
      return Math.max(0, Math.min(1, raw));
    };

    const _computeEnergyPressure = (load, avgSize) => {
      const sizeFactor = Math.min(1, avgSize / 50000);
      const raw = Math.min(1, load * 0.6 + sizeFactor * 0.4);
      return Math.max(0, raw);
    };

    const _computeEnergyCost = (pressure, throughput) => {
      const raw = pressure * (1 - throughput);
      return Math.max(0, Math.min(1, raw));
    };

    const _computeEnergyBudget = (throughput, cost) => {
      const raw = throughput - cost;
      return Math.max(0, Math.min(1, raw));
    };

    const _bucketLevel = (v) => bucketLevel(v);
    const _bucketPressure = (v) => bucketPressure(v);
    const _bucketCost = (v) => bucketCost(v);

    // ---------------------------------------------------
    // LOAD + PRESSURE
    // ---------------------------------------------------
    const recordLoad = (bits) => {
      const size = bits.length;
      loadHistory.push(size);

      if (loadHistory.length > 20) {
        loadHistory.shift();
      }

      _trace("load:recorded", { size });
    };

    const _computeLoad = () => {
      if (loadHistory.length === 0) return 0;

      const max = Math.max(...loadHistory);
      const avg =
        loadHistory.reduce((a, b) => a + b, 0) / loadHistory.length;

      const load = Math.min(1, avg / (max || 1));

      _trace("load:computed", { load });

      return load;
    };

    const _computePressure = (load) => {
      const avgSize = loadHistory.length
        ? loadHistory.reduce((a, b) => a + b, 0) / loadHistory.length
        : 0;

      const pressure = _computeEnergyPressure(load, avgSize);
      _trace("pressure:computed", { load, avgSize, pressure });
      return pressure;
    };

    // ---------------------------------------------------
    // METABOLIC ARTERY
    // ---------------------------------------------------
    const _computeMetabolicArtery = () => {
      const load = _computeLoad();
      const avgSize = loadHistory.length
        ? loadHistory.reduce((a, b) => a + b, 0) / loadHistory.length
        : 0;

      const pressure = _computeEnergyPressure(load, avgSize);
      const throughput = _computeEnergyThroughput(load);
      const cost = _computeEnergyCost(pressure, throughput);
      const budget = _computeEnergyBudget(throughput, cost);

      const artery = {
        throughput,
        throughputBucket: _bucketLevel(throughput),

        pressure,
        pressureBucket: _bucketPressure(pressure),

        cost,
        costBucket: _bucketCost(cost),

        budget,
        budgetBucket: _bucketLevel(budget),

        load,
        avgSize,

        instanceIndex,
        instanceCount: getInstanceCount(),
        id,
        timestamp: PulseRealm.PulseNOW
      };

      metabolicArtery.throughput = throughput;
      metabolicArtery.pressure = pressure;
      metabolicArtery.cost = cost;
      metabolicArtery.budget = budget;
      metabolicArtery.load = load;
      metabolicArtery.avgSize = avgSize;

      const key = _registryKey(id, instanceIndex);
      _globalMetabolicArteryRegistry.set(key, artery);

      if (
        artery.pressureBucket === "overload" ||
        artery.budgetBucket === "critical"
      ) {
        _trace("metabolism:spiral-warning", {
          pressure: artery.pressure,
          pressureBucket: artery.pressureBucket,
          budget: artery.budget,
          budgetBucket: artery.budgetBucket
        });
      }

      const metaForReport = {
        id,
        instanceIndex,
        epoch: MetabolismMeta.evo.epoch
      };

      if (nodeAdminReporter) {
        try {
          nodeAdminReporter(artery, metaForReport);
        } catch (err) {
          _trace("nodeAdmin:reporter:error", { error: String(err) });
        }
      }

      if (overmindReporter) {
        try {
          overmindReporter(artery, metaForReport);
        } catch (err) {
          _trace("overmind:reporter:error", { error: String(err) });
        }
      }

      if (heartbeatReporter) {
        try {
          heartbeatReporter(artery, metaForReport);
        } catch (err) {
          _trace("heartbeat:reporter:error", { error: String(err) });
        }
      }

      return artery;
    };

    const getMetabolicArtery = () => _computeMetabolicArtery();
    const getMetabolicArterySnapshot = () => _computeMetabolicArtery();

    const getMetabolicVitals = () => {
      const a = _computeMetabolicArtery();
      return {
        pressure: a.pressure,
        pressureBucket: a.pressureBucket,
        load: a.load,
        budget: a.budget,
        budgetBucket: a.budgetBucket
      };
    };

    // ---------------------------------------------------
    // PACKETS + EMIT
    // ---------------------------------------------------
    const generateMetabolicPacket = () => {
      const artery = _computeMetabolicArtery();

      const payload = {
        type: "binary-metabolism",
        timestamp: artery.timestamp,
        load: artery.load,
        pressure: artery.pressure,
        budget: artery.budget,
        binary: {
          throughput: artery.throughput,
          throughputBucket: artery.throughputBucket,

          pressure: artery.pressure,
          pressureBucket: artery.pressureBucket,

          cost: artery.cost,
          costBucket: artery.costBucket,

          budget: artery.budget,
          budgetBucket: artery.budgetBucket
        },
        instanceIndex: artery.instanceIndex,
        instanceCount: artery.instanceCount,
        id: artery.id
      };

      const json = JSON.stringify(payload);
      const encoded = encoder.encode(json);

      const packet = emitMetabolismPacket("snapshot", {
        ...payload,
        bits: encoded,
        bitLength: encoded.length
      });

      _trace("metabolism:packet", {
        bits: packet.bitLength,
        binary: payload.binary
      });

      return packet;
    };

    const emitMetabolism = () => {
      const packet = generateMetabolicPacket();

      if (pipeline && typeof pipeline.run === "function") {
        pipeline.run(packet.bits);
      }

      if (scheduler && typeof scheduler.scheduleTask === "function") {
        scheduler.scheduleTask({
          type: "metabolism",
          bits: packet.bits,
          source: id
        });
      }

      if (logger && typeof logger.logBinary === "function") {
        logger.logBinary(packet.bits, { source: "metabolism" });
      }

      _trace("metabolism:emitted", { bits: packet.bitLength });

      return packet;
    };

    const snapshotMetabolicArteryPacket = () => {
      const artery = _computeMetabolicArtery();
      const packet = emitMetabolismPacket("artery-snapshot", {
        artery
      });

      _trace("metabolism:artery-snapshot", { artery });
      return packet;
    };

    // ---------------------------------------------------
    // IMMORTAL SURFACE
    // ---------------------------------------------------
    return {
      id,
      instanceIndex,
      getInstanceCount,

      metabolicArtery,

      recordLoad,
      getMetabolicArtery,
      getMetabolicArterySnapshot,
      getMetabolicVitals,
      generateMetabolicPacket,
      emitMetabolism,
      snapshotMetabolicArteryPacket
    };
  };

  // IMMORTAL EXPORT
  return {
    create,
    getInstanceCount
  };
})();


// ============================================================================
//  FACTORY
// ============================================================================


export const createAIBinaryMetabolism = (config = {}) =>
  AIBinaryMetabolism(config);
// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
PulseRealm.AIMetabolism = {
    AIBinaryMetabolism,
    createAIBinaryMetabolism,
    MetabolismMeta,
    prewarmAIBinaryMetabolism,
    getGlobalMetabolicArteries
}
