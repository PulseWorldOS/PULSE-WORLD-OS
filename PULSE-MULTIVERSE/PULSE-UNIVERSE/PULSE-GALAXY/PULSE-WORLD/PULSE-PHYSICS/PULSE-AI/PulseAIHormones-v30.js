// ============================================================================
//  aiHormones-v30-IMMORTAL-EVO+++ .js
//  Binary Hormone System • DualBand‑Aware • Mesh‑Aware • Artery‑First
//  ZERO RANDOMNESS • DETERMINISTIC • ORGANISM‑SAFE
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const HormonesMeta = Object.freeze({
  identity: "ai-binary-hormones",
  layer: "binary",
  role: "hormone-system",
  version: "v30-IMMORTAL-EVO+++",
  evo: {
    epoch: PulseRealm.PulseNOW,
    deterministic: true,
    driftProof: true,
    arteryAware: true,
    dualBandAware: true,
    meshAware: true
  }
});

const _globalHormoneRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || HormonesMeta.identity}#${instanceIndex}`;
}

export function getGlobalHormoneState() {
  const out = {};
  for (const [k, v] of _globalHormoneRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

function _bucketLevel(v) {
  if (v >= 0.9)  return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5)  return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9)  return "overload";
  if (v >= 0.7)  return "high";
  if (v >= 0.4)  return "medium";
  if (v > 0)     return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8)  return "heavy";
  if (v >= 0.5)  return "moderate";
  if (v >= 0.2)  return "light";
  if (v > 0)     return "negligible";
  return "none";
}

function emitHormonePacket(type, payload) {
  return Object.freeze({
    meta: {
      ...HormonesMeta,
      arteryVersion: "v30-HORMONE-ARTERY-EVO+++"
    },
    packetType: `hormone-${type}`,
    timestamp: PulseRealm.PulseNOW,
    epoch: HormonesMeta.evo.epoch,
    ...payload
  });
}

export function prewarmBinaryHormones(dualBand = null, { trace = false } = {}) {
  try {
    const warmVitals = {
      pressure:
        dualBand.binary.metabolic.pressure ??
        dualBand.organism.metabolism.pressure ??
        0.1,
      load:
        dualBand.binary.metabolic.load ??
        dualBand.organism.metabolism.load ??
        0.1,
      quarantinedCount:
        dualBand.binary.immunity.quarantinedCount ??
        dualBand.symbolic.immunity.quarantinedCount ??
        0
    };

    const warmMetabolism = {
      _computeLoad:     () => warmVitals.load,
      _computePressure: () => warmVitals.pressure
    };

    const warmSentience = {
      generateSelfModel: () => ({
        quarantined: Array.from({ length: warmVitals.quarantinedCount }),
        vitals: {
          memoryHealth: 1,
          pipelineStability: 1
        }
      })
    };

    const warm = new AIBinaryHormones({
      id: "hormones-prewarm",
      encoder: { encode: (s) => s },
      metabolism: warmMetabolism,
      sentience: warmSentience,
      trace
    });

    const warmEmit = warm.emitHormones();
    const snapshot = warm.getSnapshot();

    const packet = emitHormonePacket("prewarm", {
      message: "Hormone system prewarmed (v30+++).",
      warmVitals,
      warmSnapshot: snapshot,
      warmEmitSummary: {
        levels: snapshot.levels,
        artery: snapshot.artery
      }
    });

    if (trace) console.log("[aiBinaryHormones-v30] prewarm", packet);
    return packet;
  } catch (err) {
    return emitHormonePacket("prewarm-error", {
      error: String(err),
      message: "Hormone prewarm failed."
    });
  }
}
// ============================================================================
//  AIBinaryHormones — pseudo‑class IMMORTAL‑ADVANTAGE++
// ============================================================================

// module‑level instance registry
let _AIBinaryHormonesInstanceCount = 0;

const _registerAIBinaryHormonesInstance = () => {
  const idx = _AIBinaryHormonesInstanceCount;
  _AIBinaryHormonesInstanceCount += 1;
  return idx;
};

export const getAIBinaryHormonesInstanceCount = () =>
  typeof _AIBinaryHormonesInstanceCount === "number"
    ? _AIBinaryHormonesInstanceCount
    : 0;

// ============================================================================
//  FACTORY
// ============================================================================
export const AIBinaryHormones = (config = {}) => {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const state = {
    id: config.id || HormonesMeta.identity,

    encoder: config.encoder,
    metabolism: config.metabolism,
    sentience: config.sentience,

    logger: config.logger || null,
    pipeline: config.pipeline || null,
    reflex: config.reflex || null,
    scheduler: config.scheduler || null,

    bluetooth: config.bluetooth || null,
    mesh: config.mesh || null,
    dualBand: config.dualBand || null,
    trace: !!config.trace,

    nodeAdminReporter:
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null,

    instanceIndex: _registerAIBinaryHormonesInstance(),

    cache: {
      levels: null,
      artery: null
    }
  };

  if (!state.encoder) throw new Error("AIBinaryHormones requires encoder");
  if (!state.metabolism) throw new Error("AIBinaryHormones requires metabolism");
  if (!state.sentience) throw new Error("AIBinaryHormones requires sentience");

  // --------------------------------------------------------------------------
  // INTERNAL HELPERS
  // --------------------------------------------------------------------------
  const _trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}#${state.instanceIndex}] ${event}`, payload);
  };

  const _computeOverlays = () => {
    const dual = state.dualBand || {};
    const mesh = state.mesh || {};

    const dualPressure =
      dual.artery.organism.pressure ??
      dual.binaryVitals.pressure ??
      0;

    const meshPressure = mesh.pressure ?? 0;
    const meshLane = mesh.gpuLane || "gpu-none";

    return {
      dualPressure,
      meshPressure,
      meshLane
    };
  };

  const _computeHormoneThroughput = (globalPressure, quarantinedCount, overlayPressure) => {
    const qFactor = Math.min(1, quarantinedCount / 10);
    const overlay = Math.min(1, overlayPressure);
    const raw = 1 - (globalPressure * 0.5 + qFactor * 0.3 + overlay * 0.2);
    return Math.max(0, Math.min(1, raw));
  };

  const _computeHormonePressure = (load, metabolicPressure, overlayPressure) => {
    const raw = load * 0.4 + metabolicPressure * 0.4 + overlayPressure * 0.2;
    return Math.max(0, Math.min(1, raw));
  };

  const _computeHormoneCost = (pressure, throughput) =>
    Math.max(0, Math.min(1, pressure * (1 - throughput)));

  const _computeHormoneBudget = (throughput, cost) =>
    Math.max(0, Math.min(1, throughput - cost));

  const _computeHormoneLevels = () => {
    const load = state.metabolism._computeLoad();
    const metabolicPressure = state.metabolism._computePressure(load);

    const self = state.sentience.generateSelfModel();
    const quarantinedCount = PulseRealm.quarantined.length;

    const overlays = _computeOverlays();
    const overlayPressure = Math.max(overlays.dualPressure, overlays.meshPressure);

    const throughput = _computeHormoneThroughput(
      metabolicPressure,
      quarantinedCount,
      overlayPressure
    );

    const pressure = _computeHormonePressure(
      load,
      metabolicPressure,
      overlayPressure
    );

    const cost = _computeHormoneCost(pressure, throughput);
    const budget = _computeHormoneBudget(throughput, cost);

    const artery = Object.freeze({
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      instanceIndex: state.instanceIndex,
      instanceCount: getAIBinaryHormonesInstanceCount(),
      id: state.id,
      timestamp: PulseRealm.PulseNOW,

      overlays: {
        dualBandPressure: overlays.dualPressure,
        meshPressure: overlays.meshPressure,
        meshLane: overlays.meshLane
      }
    });

    const levels = Object.freeze({
      urgency: pressure,
      calm: Math.max(0, 1 - pressure),
      focus: PulseRealm.vitals.memoryHealth,
      growth: PulseRealm.vitals.pipelineStability,
      repair: quarantinedCount > 0 ? 1 : 0.2
    });

    const key = _registryKey(state.id, state.instanceIndex);
    _globalHormoneRegistry.set(key, { levels, artery });

    if (state.nodeAdminReporter) {
      try {
        state.nodeAdminReporter({ levels, artery }, HormonesMeta);
      } catch {}
    }

    return { levels, artery };
  };

  const _generateHormonePacket = (hormone, level, artery) => {
    const payload = {
      type: "binary-hormone",
      timestamp: PulseRealm.PulseNOW,
      hormone,
      level,
      artery,
      membrane: {
        source: state.id,
        instanceIndex: state.instanceIndex
      },
      bluetooth: {
        ready: !!state.bluetooth,
        channel: state.bluetooth.channel || null
      }
    };

    const json = JSON.stringify(payload);
    const encoded = state.encoder.encode(json);

    return Object.freeze({
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    });
  };

  // --------------------------------------------------------------------------
  // PUBLIC SNAPSHOTS
  // --------------------------------------------------------------------------
  const getSnapshot = () => {
    if (!state.cache.levels || !state.cache.artery) {
      const { levels, artery } = _computeHormoneLevels();
      state.cache.levels = levels;
      state.cache.artery = artery;
    }

    return Object.freeze({
      levels: state.cache.levels,
      artery: state.cache.artery
    });
  };

  const getArtery = () => getSnapshot().artery;
  const getLevels = () => getSnapshot().levels;

  // --------------------------------------------------------------------------
  // EMIT HORMONES
  // --------------------------------------------------------------------------
  const emitHormones = () => {
    const { levels, artery } = _computeHormoneLevels();

    const drift =
      state.cache.levels &&
      JSON.stringify(state.cache.levels) !== JSON.stringify(levels);

    if (!drift) {
      return emitHormonePacket("fast", {
        id: state.id,
        instanceIndex: state.instanceIndex,
        levels,
        artery,
        message: "Hormone levels unchanged (fast path)."
      });
    }

    const packets = [];

    for (const hormone of Object.keys(levels)) {
      const level = levels[hormone];
      const packet = _generateHormonePacket(hormone, level, artery);

      state.pipeline.run(packet.bits);
      state.reflex.run(packet.bits);
      state.logger.logBinary(packet.bits, { source: "hormones", hormone });

      state.scheduler.scheduleHormone({ hormone, level, artery });
      state.mesh.broadcastHormone({ hormone, level, artery });

      packets.push(packet);
    }

    state.cache.levels = levels;
    state.cache.artery = artery;

    return emitHormonePacket("emit", {
      id: state.id,
      instanceIndex: state.instanceIndex,
      count: packets.length,
      levels,
      artery,
      packets,
      membraneSnapshot: {
        id: state.id,
        instanceIndex: state.instanceIndex,
        artery
      }
    });
  };

  // --------------------------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------------------------
  return {
    state,
    getSnapshot,
    getArtery,
    getLevels,
    emitHormones
  };
};


export const createAIBinaryHormones = (config = {}) =>
  AIBinaryHormones(config);

PulseRealm.AIHormones = {
    HormonesMeta,
    AIBinaryHormones,
    createAIBinaryHormones,
    prewarmBinaryHormones,
    getGlobalHormoneState
}
