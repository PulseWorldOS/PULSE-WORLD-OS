// ============================================================================
//  aiImmunity-v30.js — Pulse OS v30.0‑IMMORTAL‑ADVANTAGE Organ
//  Binary Immune System • Quarantine Engine • Dualband Artery • Packet‑Aware
//  PURE BINARY. ZERO NETWORK. ZERO RANDOMNESS IN LOGIC PATHS.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  IMMUNITY META — v30 IMMORTAL‑ADVANTAGE
// ============================================================================
export const ImmunityMeta = Object.freeze({
  identity: "aiImmunity-v30-IMMORTAL-ADVANTAGE",
  version: "30.0-IMMORTAL-ADVANTAGE",
  role: "binary_immunity",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    egoFree: true,
    arteryAware: true,
    packetAware: true,
    dualbandAware: true,
    windowSafe: true,
    zeroNetwork: true,
    zeroRandomnessInLogicPaths: true,
    epoch: "30-IMMORTAL-ADVANTAGE"
  }),
  contract: Object.freeze({
    purpose:
      "Provide a binary-first immune system for organs: quarantine, drift detection, and sanitation without randomness.",
    never: Object.freeze([
      "mutate external organs directly beyond quarantine topology rewiring",
      "introduce randomness into immune logic paths",
      "override higher-level safety or tone systems",
      "perform network I/O",
      "bypass evolution or registry constraints"
    ]),
    always: Object.freeze([
      "stay binary-first",
      "stay deterministic",
      "stay drift-aware",
      "stay topology-safe",
      "update global immune registry snapshots",
      "respect dualband metabolic pressure when provided"
    ])
  })
});

// ============================================================================
//  GLOBAL IMMUNE REGISTRY — window‑safe, read‑only from outside
// ============================================================================
const _globalImmuneRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || ImmunityMeta.identity}#${instanceIndex}`;
}

export function getGlobalImmuneState() {
  const out = {};
  for (const [k, v] of _globalImmuneRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, immune‑scoped
// ============================================================================
function emitImmunePacket(type, payload) {
  return Object.freeze({
    meta: ImmunityMeta,
    packetType: `immune-${type}`,
    timestamp: PulseRealm.PulseNOW,
    epoch: ImmunityMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30.0‑IMMORTAL‑ADVANTAGE (dualband‑aware, no randomness)
// ============================================================================
export function prewarmAIBinaryImmunity(
  dualBand = null,
  { trace = false } = {}
) {
  const quarantinedCount =
    dualBand.binary.immunity.quarantinedCount ??
    dualBand.symbolic.immunity.quarantinedCount ??
    0;

  const pressure =
    dualBand.binary.metabolic.pressure ??
    dualBand.binary.pressure ??
    0;

  const load =
    dualBand.binary.metabolic.load ??
    dualBand.binary.load ??
    0;

  const baseBinary = {
    throughput: 1,
    throughputBucket: "elite",
    pressure,
    pressureBucket:
      pressure === 0
        ? "none"
        : pressure >= 0.9
        ? "overload"
        : pressure >= 0.7
        ? "high"
        : pressure >= 0.4
        ? "medium"
        : "low",
    cost: 0,
    costBucket: "none",
    budget: 1,
    budgetBucket: "elite",
    load
  };

  const packet = emitImmunePacket("prewarm", {
    type: "binary-immune-prewarm",
    anomaly: "none",
    organId: null,
    binary: baseBinary,
    cycle: 0,
    band: "binary",
    highway: "binary_first_dualband",
    immortalityEpoch: ImmunityMeta.evo.epoch,
    quarantinedCount,
    bluetooth: {
      ready: false,
      channel: null
    }
  });

  if (trace) {
    console.log("[aiBinaryImmunity] prewarm", packet);
  }

  return packet;
}

// ============================================================================
//  AIBinaryImmunity — pseudo‑class IMMORTAL style
// ============================================================================

// module‑level instance registry (replaces static on class)
let _AIBinaryImmunityInstanceCount = 0;

const _registerAIBinaryImmunityInstance = () => {
  const idx = _AIBinaryImmunityInstanceCount;
  _AIBinaryImmunityInstanceCount += 1;
  return idx;
};

export const getAIBinaryImmunityInstanceCount = () =>
  typeof _AIBinaryImmunityInstanceCount === "number"
    ? _AIBinaryImmunityInstanceCount
    : 0;

// ============================================================================
//  FACTORY
// ============================================================================
export const AIBinaryImmunity = (config = {}) => {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const state = {
    id: config.id || ImmunityMeta.identity || "ai-binary-immunity",

    encoder: config.encoder,
    anatomy: config.anatomy,
    evolution: config.evolution,
    registry: config.registry,
    logger: config.logger || null,
    pipeline: config.pipeline || null,
    reflex: config.reflex || null,
    trace: !!config.trace,

    dualBand: config.dualBand || null,

    quarantined: new Set(),
    cycle: 0,

    instanceIndex: _registerAIBinaryImmunityInstance(),

    immuneArtery: {
      lastAnomaly: null,
      lastOrganId: null,
      lastBinary: null,
      lastCycle: 0,
      quarantinedCount: 0
    }
  };

  if (!state.encoder) throw new Error("AIBinaryImmunity requires aiBinaryAgent encoder");
  if (!state.anatomy) throw new Error("AIBinaryImmunity requires aiBinaryAnatomy");
  if (!state.evolution) throw new Error("AIBinaryImmunity requires aiBinaryEvolution");
  if (!state.registry) throw new Error("AIBinaryImmunity requires aiBinaryOrganRegistry");

  // --------------------------------------------------------------------------
  // INTERNAL HELPERS
  // --------------------------------------------------------------------------
  const _trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}#${state.instanceIndex}] ${event}`, payload);
  };

  const _immuneSnapshot = () =>
    Object.freeze({
      lastAnomaly: state.immuneArtery.lastAnomaly,
      lastOrganId: state.immuneArtery.lastOrganId,
      lastBinary: state.immuneArtery.lastBinary,
      lastCycle: state.immuneArtery.lastCycle,
      quarantinedCount: state.quarantined.size,
      epoch: ImmunityMeta.evo.epoch,
      instanceIndex: state.instanceIndex,
      instanceCount: getAIBinaryImmunityInstanceCount()
    });

  const _updateGlobalRegistry = () => {
    const key = _registryKey(state.id, state.instanceIndex);
    _globalImmuneRegistry.set(key, {
      artery: _immuneSnapshot()
    });
  };

  // --------------------------------------------------------------------------
  //  BINARY IMMUNE ARTERY METRICS
  // --------------------------------------------------------------------------
  const _computeSanitationThroughput = (anomalySeverity) => {
    const raw = 1 - anomalySeverity;
    return Math.max(0, Math.min(1, raw));
  };

  const _computeSanitationPressure = (binaryLength, anomalySeverity) => {
    const raw = Math.min(1, (binaryLength / 50000) * anomalySeverity);
    return Math.max(0, Math.min(1, raw));
  };

  const _computeSanitationCost = (pressure, throughput) => {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  };

  const _computeSanitationBudget = (throughput, cost) => {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  };

  const _bucketLevel = (v) => {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  };

  const _bucketPressure = (v) => {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  };

  const _bucketCost = (v) => {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  };

  // --------------------------------------------------------------------------
  //  IMMUNE RESPONSE GENERATION
  // --------------------------------------------------------------------------
  const _nextCycle = () => {
    state.cycle += 1;
    return state.cycle;
  };

  const _buildBinaryArtery = (anomalySeverity, binaryLength) => {
    const throughput = _computeSanitationThroughput(anomalySeverity);
    const pressure = _computeSanitationPressure(binaryLength, anomalySeverity);
    const cost = _computeSanitationCost(pressure, throughput);
    const budget = _computeSanitationBudget(throughput, cost);

    return {
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget)
    };
  };

  const _generateResponse = (
    anomaly,
    organId = null,
    anomalySeverity = 0.5,
    binaryLength = 1
  ) => {
    const cycle = _nextCycle();
    const binary = _buildBinaryArtery(anomalySeverity, binaryLength);

    const payload = {
      type: "binary-immune-response",
      anomaly,
      organId,
      binary,
      cycle,
      band: "binary",
      highway: "binary_first_dualband",
      meta: ImmunityMeta,
      immortalityEpoch: ImmunityMeta.evo.epoch,
      bluetooth: {
        ready: false,
        channel: null
      }
    };

    const json = JSON.stringify(payload);
    const encoded = state.encoder.encode(json);

    const packet = {
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    };

    state.immuneArtery.lastAnomaly = anomaly;
    state.immuneArtery.lastOrganId = organId;
    state.immuneArtery.lastBinary = binary;
    state.immuneArtery.lastCycle = cycle;
    state.immuneArtery.quarantinedCount = state.quarantined.size;

    _updateGlobalRegistry();
    _trace("immune:generated", packet);

    return packet;
  };

  const _emitResponse = (anomaly, organId = null, severity = 0.5, binaryLength = 1) => {
    const response = _generateResponse(anomaly, organId, severity, binaryLength);

    if (state.pipeline) state.pipeline.run(response.bits);
    if (state.reflex) state.reflex.run(response.bits);
    if (state.logger)
      state.logger.logBinary(response.bits, { source: "immunity", anomaly, organId });

    _trace("immune:emitted", { anomaly, organId });

    return emitImmunePacket("response", {
      anomaly,
      organId,
      severity,
      binaryLength,
      response
    });
  };

  // --------------------------------------------------------------------------
  //  PACKET SANITIZATION — binary‑first
  // --------------------------------------------------------------------------
  const sanitize = (binary) => {
    if (typeof binary !== "string" || !/^[01]+$/.test(binary)) {
      const length = typeof binary === "string" ? binary.length : 1;
      return _emitResponse("malformed-packet", null, 1.0, length);
    }

    const repeat = /(000000+|111111+)/;
    if (repeat.test(binary)) {
      return _emitResponse("corrupted-packet", null, 0.8, binary.length);
    }

    return true;
  };

  // --------------------------------------------------------------------------
  //  ORGAN QUARANTINE
  // --------------------------------------------------------------------------
  const quarantineOrgan = (organId) => {
    state.quarantined.add(organId);

    const topo = state.anatomy.topology.get(organId);
    if (topo) {
      topo.inputs = [];
      topo.outputs = [];
      topo.bidirectional = [];
    }

    _emitResponse("organ-quarantined", organId, 0.9, 1);
  };

  const releaseOrgan = (organId) => {
    if (state.quarantined.has(organId)) {
      state.quarantined.delete(organId);
      _emitResponse("organ-released", organId, 0.2, 1);
    }
  };

  // --------------------------------------------------------------------------
  //  SIGNATURE DRIFT DETECTION
  // --------------------------------------------------------------------------
  const checkOrgan = (organId) => {
    const record = state.registry.getOrganRecord(organId);
    if (!record) return;

    const storedSig = state.evolution.loadSignature({ id: organId });
    const currentSig = state.evolution.generateSignature({ id: organId });

    if (storedSig !== currentSig) {
      _emitResponse("signature-drift", organId, 0.7, 1);
      quarantineOrgan(organId);
    }
  };

  // --------------------------------------------------------------------------
  //  ORGANISM‑WIDE IMMUNE SWEEP
  // --------------------------------------------------------------------------
  const sweep = () => {
    const organIds = state.registry.listOrgans();

    for (const id of organIds) {
      if (!state.quarantined.has(id)) {
        checkOrgan(id);
      }
    }

    _trace("immune:sweep", { organs: organIds.length });
    return emitImmunePacket("sweep", {
      organCount: organIds.length,
      quarantinedCount: state.quarantined.size,
      artery: _immuneSnapshot()
    });
  };

  // --------------------------------------------------------------------------
  //  WINDOW‑SAFE ARTERY SNAPSHOT
  // --------------------------------------------------------------------------
  const getImmuneArterySnapshot = () => _immuneSnapshot();

  // --------------------------------------------------------------------------
  //  PUBLIC API
  // --------------------------------------------------------------------------
  return {
    state,
    sanitize,
    quarantineOrgan,
    releaseOrgan,
    checkOrgan,
    sweep,
    getImmuneArterySnapshot
  };
};

// ============================================================================
//  FACTORY
// ============================================================================
export const createAIBinaryImmunity = (config = {}) =>
  AIBinaryImmunity(config);

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
PulseRealm.AIImmunity = {
    AIBinaryImmunity,
    createAIBinaryImmunity,
    ImmunityMeta,
    prewarmAIBinaryImmunity,
    getGlobalImmuneState
}
