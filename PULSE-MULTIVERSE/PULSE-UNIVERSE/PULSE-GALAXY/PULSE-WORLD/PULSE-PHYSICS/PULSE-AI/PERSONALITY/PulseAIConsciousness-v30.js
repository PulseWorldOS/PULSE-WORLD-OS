// ============================================================================
//  aiConsciousness-v30-IMMORTAL-PLUS.js — Pulse OS v30+ Consciousness Organ
//  Unified Organism State • Whole-System Awareness • Binary-Only
//  Deterministic • No External Globals • No Legacy OrganismMap Remnants
//  IMMORTAL-PLUS • Consciousness Artery v6 • Multi-Instance Harmony
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



const ConsciousnessMeta = Object.freeze({
  id: "ai-binary-consciousness",
  version: "v30-IMMORTAL-PLUS",
  layer: "consciousness",
  role: "organism-awareness",
  band: "binary",
  evo: {
    epoch: PulseRealm.PulseNOW
  }
});

// ============================================================================
//  BUCKET HELPERS — v6
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

function bucketCoherence(v) {
  if (v >= 0.9) return "crystalline";
  if (v >= 0.7) return "coherent";
  if (v >= 0.4) return "balanced";
  if (v > 0.2) return "strained";
  return "unknown";
}

// ============================================================================
//  CONSCIOUSNESS ARTERY v6 — IMMORTAL-PLUS
// ============================================================================

function computeConsciousnessArteryV6({
  globalPressure,
  quarantinedCount,
  topologySize,
  selfThroughput,
  selfPressure,
  metabolicLoad,
  instanceCount
}) {
  const qFactor = Math.min(1, quarantinedCount / 16);
  const topoFactor = Math.min(1, topologySize / 256);
  const selfThroughputFactor = Math.min(1, selfThroughput);
  const selfPressureFactor = Math.min(1, selfPressure);
  const metabolicFactor = Math.min(1, metabolicLoad);

  const pressure = Math.max(
    0,
    Math.min(
      1,
      (globalPressure * 0.4 +
        qFactor * 0.15 +
        topoFactor * 0.15 +
        selfPressureFactor * 0.15 +
        metabolicFactor * 0.15)
    )
  );

  const baseThroughput = Math.max(
    0,
    1 -
      (globalPressure * 0.4 +
        qFactor * 0.2 +
        topoFactor * 0.1 +
        selfPressureFactor * 0.2 +
        metabolicFactor * 0.1)
  );

  const harmonicFactor = instanceCount > 0 ? Math.min(1, 1 / instanceCount) : 1;
  const throughput = Math.max(0, Math.min(1, baseThroughput * harmonicFactor));

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  const coherence = Math.max(
    0,
    Math.min(
      1,
      (selfThroughputFactor * 0.4 +
        (1 - selfPressureFactor) * 0.3 +
        (1 - globalPressure) * 0.3)
    )
  );

  return Object.freeze({
    globalPressure,
    quarantinedCount,
    topologySize,
    selfThroughput,
    selfPressure,
    metabolicLoad,
    instanceCount,
    throughput,
    pressure,
    cost,
    budget,
    coherence,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget),
    coherenceBucket: bucketCoherence(coherence)
  });
}

// ============================================================================
//  PACKET + TRACE HELPERS — PURE, NO GLOBALS
// ============================================================================

function emitConsciousnessPacket(type, payload) {
  return Object.freeze({
    meta: ConsciousnessMeta,
    packetType: `consciousness-${type}`,
    timestamp: PulseRealm.PulseNOW,
    ...payload
  });
}

function traceConsciousnessEvent(id, event, payload, traceFlag, logger) {
  if (!traceFlag) return;
  const message = `[${id}] ${event}`;
  if (logger && typeof logger.log === "function") {
    logger.log("consciousness", { message, payload });
    return;
  }
  // Fallback console trace (still deterministic, no external mutation)
  console.log(message, payload);
}

// ============================================================================
//  PREWARM — v30 IMMORTAL-PLUS
// ============================================================================

export function prewarmAIBinaryConsciousness(config = {}) {
  try {
    const {
      encoder,
      sentience,
      metabolism,
      hormones,
      vitals,
      anatomy,
      immunity,
      trace,
      logger
    } = config;

    sentience.generateSelfModel();
    metabolism.generateMetabolicPacket();
    hormones.emitHormones();
    vitals.generateVitals();
    anatomy.snapshot();
    if (immunity.quarantined) Array.from(immunity.quarantined);

    if (encoder.encode) {
      const warmPayload = {
        type: "binary-consciousness",
        timestamp: 0,
        state: {
          selfModel: {},
          metabolism: {},
          hormones: [],
          vitals: {},
          topology: {},
          quarantined: [],
          decisions: [],
          binary: {
            throughput: 1,
            pressure: 0,
            cost: 0,
            budget: 1,
            coherence: 1
          }
        }
      };
      const bits = encoder.encode(JSON.stringify(warmPayload));
      encoder.decode(bits, "string");
    }

    const packet = emitConsciousnessPacket("prewarm", {
      message: "Binary consciousness v30 prewarmed and awareness artery aligned."
    });

    traceConsciousnessEvent(
      ConsciousnessMeta.id,
      "prewarm",
      packet,
      !!trace,
      logger
    );

    return packet;
  } catch (err) {
    return emitConsciousnessPacket("prewarm-error", {
      error: String(err),
      message: "Binary consciousness prewarm failed."
    });
  }
}

// ============================================================================
//  AIBinaryConsciousness v30-IMMORTAL-PLUS
// ============================================================================
// ============================================================================
//  AIBinaryConsciousness — pseudo-class IMMORTAL++ v30
// ============================================================================

let _consciousnessInstanceCount = 0;

const _registerConsciousnessInstance = () => _consciousnessInstanceCount++;
const _getConsciousnessInstanceCount = () => _consciousnessInstanceCount || 0;

export const AIBinaryConsciousness = (config = {}) => {
  const state = {
    id: config.id || ConsciousnessMeta.id,

    encoder: config.encoder,
    sentience: config.sentience,
    metabolism: config.metabolism,
    hormones: config.hormones,
    vitals: config.vitals,
    anatomy: config.anatomy,
    immunity: config.immunity,

    cortex: config.cortex || null,
    logger: config.logger || null,
    pipeline: config.pipeline || null,
    reflex: config.reflex || null,

    trace: !!config.trace,
    decisions: [],

    instanceIndex: _registerConsciousnessInstance(),
    consciousnessArterySnapshot: null
  };

  if (!state.encoder)
    throw new Error("AIBinaryConsciousness requires aiBinaryAgent encoder");
  if (!state.sentience)
    throw new Error("AIBinaryConsciousness requires aiBinarySentience");
  if (!state.metabolism)
    throw new Error("AIBinaryConsciousness requires aiBinaryMetabolism");
  if (!state.hormones)
    throw new Error("AIBinaryConsciousness requires aiBinaryHormones");
  if (!state.vitals)
    throw new Error("AIBinaryConsciousness requires aiBinaryVitals");
  if (!state.anatomy)
    throw new Error("AIBinaryConsciousness requires aiBinaryAnatomy");
  if (!state.immunity)
    throw new Error("AIBinaryConsciousness requires aiBinaryImmunity");

  // --------------------------------------------------------------------------
  //  INTERNAL AWARENESS ARTERY
  // --------------------------------------------------------------------------

  const computeConsciousnessArtery = (selfModel, metabolic, topology, quarantined) => {
    const globalPressure =
      typeof metabolic.pressure === "number" ? metabolic.pressure : 0;

    const topologySize = topology ? Object.keys(topology).length : 0;
    const quarantinedCount = Array.isArray(quarantined)
      ? quarantined.length
      : 0;

    const selfBinary = selfModel && selfModel.binary ? selfModel.binary : null;
    const selfThroughput =
      selfBinary && typeof selfBinary.throughput === "number"
        ? selfBinary.throughput
        : 1;
    const selfPressure =
      selfBinary && typeof selfBinary.pressure === "number"
        ? selfBinary.pressure
        : globalPressure;

    const metabolicLoad =
      typeof metabolic.load === "number" ? metabolic.load : globalPressure;

    const instanceCount = _getConsciousnessInstanceCount();

    const artery = computeConsciousnessArteryV6({
      globalPressure,
      quarantinedCount,
      topologySize,
      selfThroughput,
      selfPressure,
      metabolicLoad,
      instanceCount
    });

    state.consciousnessArterySnapshot = artery;
    return artery;
  };

  const getConsciousnessArtery = () => state.consciousnessArterySnapshot || null;

  // --------------------------------------------------------------------------
  //  DECISION INGESTION
  // --------------------------------------------------------------------------

  const ingestDecision = (decisionPacket) => {
    if (!decisionPacket) return;

    state.decisions.push(
      Object.freeze({
        pattern: decisionPacket.pattern || null,
        decision: decisionPacket.decision || null,
        source: decisionPacket.source || null,
        timestamp:
          typeof decisionPacket.timestamp === "number"
            ? decisionPacket.timestamp
            : PulseRealm.PulseNOW
      })
    );

    if (state.decisions.length > 32) state.decisions.shift();

    trace("decision:ingested", {
      pattern: decisionPacket.pattern,
      decision: decisionPacket.decision
    });
  };

  // --------------------------------------------------------------------------
  //  UNIFIED STATE v30
  // --------------------------------------------------------------------------

  const generateUnifiedState = () => {
    const selfModel = state.sentience.generateSelfModel();
    const metabolicPacket = state.metabolism.generateMetabolicPacket();
    const hormonePackets = state.hormones.emitHormones();
    const vitals = state.vitals.generateVitals();
    const anatomySnapshot = state.anatomy.snapshot();
    const topology = anatomySnapshot.topology || {};
    const quarantined = Array.from(state.immunity.quarantined || []);

    const metabolic = Object.freeze({
      load: metabolicPacket.load,
      pressure: metabolicPacket.pressure,
      budget: metabolicPacket.budget
    });

    const artery = computeConsciousnessArtery(
      selfModel,
      metabolic,
      topology,
      quarantined
    );

    const binary = Object.freeze({
      throughput: artery.throughput,
      throughputBucket: artery.throughputBucket,
      pressure: artery.pressure,
      pressureBucket: artery.pressureBucket,
      cost: artery.cost,
      costBucket: artery.costBucket,
      budget: artery.budget,
      budgetBucket: artery.budgetBucket,
      coherence: artery.coherence,
      coherenceBucket: artery.coherenceBucket
    });

    const stateObj = Object.freeze({
      meta: ConsciousnessMeta,
      instanceIndex: state.instanceIndex,
      instanceCount: _getConsciousnessInstanceCount(),
      selfModel,
      metabolism: metabolic,
      hormones: hormonePackets.map((p) =>
        Object.freeze({ hormone: p.hormone, level: p.level })
      ),
      vitals: Object.freeze(vitals.metrics),
      topology,
      quarantined,
      decisions: state.decisions.map((d) =>
        Object.freeze({
          pattern: d.pattern,
          decision: d.decision,
          source: d.source,
          timestamp: d.timestamp
        })
      ),
      binary
    });

    trace("consciousness:state", {
      organs: selfModel.organs ? selfModel.organs.length : 0,
      hormones: stateObj.hormones.length,
      quarantined: quarantined.length,
      awarenessPressure: artery.pressure,
      coherenceBucket: artery.coherenceBucket
    });

    return stateObj;
  };

  // --------------------------------------------------------------------------
  //  PACKET GENERATION + EMISSION
  // --------------------------------------------------------------------------

  const generateConsciousnessPacket = () => {
    const unifiedState = generateUnifiedState();

    const payload = {
      type: "binary-consciousness",
      timestamp: PulseRealm.PulseNOW,
      state: unifiedState
    };

    const json = JSON.stringify(payload);
    const bits = state.encoder.encode(json);

    const packet = emitConsciousnessPacket("snapshot", {
      ...payload,
      bits,
      bitLength: bits.length
    });

    trace("consciousness:packet", {
      bits: packet.bitLength,
      throughputBucket: unifiedState.binary.throughputBucket,
      pressureBucket: unifiedState.binary.pressureBucket
    });

    return packet;
  };

  const emitConsciousness = () => {
    const packet = generateConsciousnessPacket();

    state.pipeline.run(packet.bits);
    state.reflex.run(packet.bits);
    state.logger.logBinary(packet.bits, { source: "consciousness" });

    trace("consciousness:emitted", {
      bits: packet.bitLength,
      coherenceBucket: packet.state.binary.coherenceBucket
    });

    return emitConsciousnessPacket("emitted", packet);
  };

  // --------------------------------------------------------------------------
  //  TRACE
  // --------------------------------------------------------------------------

  const trace = (event, payload) => {
    traceConsciousnessEvent(state.id, event, payload, state.trace, state.logger);
  };

  // --------------------------------------------------------------------------
  //  PUBLIC API
  // --------------------------------------------------------------------------

  return {
    state,

    getConsciousnessArtery,
    ingestDecision,
    generateUnifiedState,
    generateConsciousnessPacket,
    emitConsciousness
  };
};


// ============================================================================
//  FACTORY — v30-IMMORTAL-PLUS
// ============================================================================



export const createAIBinaryConsciousness = (config = {}) => {
  prewarmAIBinaryConsciousness(config);
  return AIBinaryConsciousness(config);
};

PulseRealm.AIConsciousness = {
    ConsciousnessMeta,
    AIBinaryConsciousness,
    createAIBinaryConsciousness,
    prewarmAIBinaryConsciousness
}
