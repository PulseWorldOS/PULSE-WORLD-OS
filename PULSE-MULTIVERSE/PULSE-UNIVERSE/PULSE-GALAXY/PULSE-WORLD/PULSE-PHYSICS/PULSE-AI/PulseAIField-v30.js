// ============================================================================
//  aiField-v30.js — Pulse OS v30‑IMMORTAL++ Organ
//  Binary Membrane • Artery Metrics • Packet Bus • DualBand + Evolution Aware
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Binary Field Layer**, the organism’s membrane
//    between internal cognition and the external world.
//
//  v30‑IMMORTAL++ UPGRADES:
//    • dualBand‑aware (fuses local field vitals with organism binary snapshot)
//    • packet‑aware v3 (explicit field packets, minimal, map‑free meta)
//    • evolution‑aware (field vitals usable by Evolution / Environment organs)
//    • environment‑aware (external pressure/load channels, deterministic only)
//    • drift‑proof artery metrics (throughput/pressure/cost/budget buckets)
//    • window‑aware (safe vitals exposure for UI / diagnostics)
//    • prewarm‑aware (field prewarm packet, dualBand‑aligned)
//    • multi‑instance, identity‑safe, zero external IO
//    • NO Organism Map / FieldMeta / pulseRole / surfaceMeta / pulseLoreContext
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  LOCAL META — v30 IMMORTAL++ (map‑free, self‑contained)
// ============================================================================

const BinaryFieldMetaV30 = Object.freeze({
  version: "v30-IMMORTAL++",
  layer: "binary-field-organ",
  role: "binary-field",
  identity: "ai-binary-field-v30",
  evo: {
    epoch: 30
  }
});


// ============================================================================
//  PACKET EMITTER — deterministic, field‑scoped, v3 (map‑free)
// ============================================================================
function emitFieldPacket(type, payload, sourceId = "ai-binary-field-v30") {
  return Object.freeze({
    meta: BinaryFieldMetaV30,
    packetType: `field-${type}`,
    sourceId,
    timestamp: PulseRealm.PulseNOW, // IMMORTAL++: wall-clock allowed for packets, not logic
    epoch: BinaryFieldMetaV30.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — align field with dual‑band snapshot (optional, zero‑IO)
// ============================================================================
export function prewarmBinaryField(dualBand = null, { trace = false } = {}) {
  try {
    const binaryPressure =
      dualBand.binary.metabolic.pressure ??
      dualBand.binary.pressure ??
      0;

    const binaryLoad =
      dualBand.binary.metabolic.load ??
      dualBand.binary.load ??
      0;

    const payload = {
      message: "Binary field prewarmed and artery metrics aligned.",
      binary: {
        pressure: binaryPressure,
        load: binaryLoad
      }
    };

    const packet = emitFieldPacket("prewarm", payload);

    if (trace) {
      console.log("[aiBinaryField-v30] prewarm", packet);
    }

    return packet;
  } catch (err) {
    return emitFieldPacket("prewarm-error", {
      error: String(err),
      message: "Binary field prewarm failed."
    });
  }
}
// ============================================================================
//  AIBinaryField — pseudo‑class IMMORTAL++
// ============================================================================

export const AIBinaryField = (config = {}) => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const state = {
    id: config.id || "ai-binary-field-v30",

    encoder: config.encoder,
    sentinel: config.sentinel,
    metabolism: config.metabolism,
    hormones: config.hormones,
    consciousness: config.consciousness,

    logger: config.logger || null,
    pipeline: config.pipeline || null,
    reflex: config.reflex || null,

    bluetooth: config.bluetooth || null,
    dualBand: config.dualBand || null,

    environment: {
      pressure: 0,
      load: 0,
      ...(config.environment || {})
    },

    trace: !!config.trace,

    fieldState: {
      entropy: 0,
      signalDensity: 0,
      lastInputSize: 0,
      lastOutputSize: 0,
      environmentalPressure: 0
    }
  };

  if (!state.encoder) throw new Error("AIBinaryField requires aiBinaryAgent encoder");
  if (!state.sentinel) throw new Error("AIBinaryField requires aiBinarySentinel");
  if (!state.metabolism) throw new Error("AIBinaryField requires aiBinaryMetabolism");
  if (!state.hormones) throw new Error("AIBinaryField requires aiBinaryHormones");
  if (!state.consciousness) throw new Error("AIBinaryField requires aiBinaryConsciousness");

  // ---------------------------------------------------------------------------
  // TRACE
  // ---------------------------------------------------------------------------
  const _trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}] ${event}`, payload);
  };

  // ---------------------------------------------------------------------------
  // BINARY ARTERY METRICS
  // ---------------------------------------------------------------------------
  const _computeBinaryThroughput = (entropy, density) => {
    const raw = entropy * (1 - Math.min(1, density));
    return Math.max(0, Math.min(1, raw));
  };

  const _computeBinaryPressure = (entropy, density) => {
    const raw = entropy * density;
    return Math.max(0, Math.min(1, raw));
  };

  const _computeBinaryCost = (pressure, throughput) => {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  };

  const _computeBinaryBudget = (throughput, cost) => {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  };

  // ---------------------------------------------------------------------------
  // BUCKETS
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // ENVIRONMENT CHANNEL
  // ---------------------------------------------------------------------------
  const setEnvironmentMetrics = ({ pressure = 0, load = 0 } = {}) => {
    const p = Math.max(0, Math.min(1, Number(pressure) || 0));
    const l = Math.max(0, Math.min(1, Number(load) || 0));
    state.environment.pressure = p;
    state.environment.load = l;
  };

  // ---------------------------------------------------------------------------
  // VITALS SNAPSHOT — full IMMORTAL++ version
  // ---------------------------------------------------------------------------
  const _computeBinaryVitals = () => {
    const { entropy, signalDensity } = state.fieldState;

    const throughputLocal = _computeBinaryThroughput(entropy, signalDensity);
    const pressureLocal = _computeBinaryPressure(entropy, signalDensity);
    const costLocal = _computeBinaryCost(pressureLocal, throughputLocal);
    const budgetLocal = _computeBinaryBudget(throughputLocal, costLocal);

    const dualPressure =
      state.dualBand.binary.metabolic.pressure ??
      state.dualBand.binary.pressure ??
      null;

    const dualLoad =
      state.dualBand.binary.metabolic.load ??
      state.dualBand.binary.load ??
      null;

    const envPressure = state.environment.pressure || 0;
    const envLoad = state.environment.load || 0;

    const fusedPressure = (() => {
      const base = pressureLocal;
      const dual = dualPressure ?? base;
      const env = envPressure;
      const raw = 0.5 * base + 0.3 * dual + 0.2 * env;
      return Math.max(0, Math.min(1, raw));
    })();

    const fusedThroughput = (() => {
      const base = throughputLocal;
      const dual = dualLoad != null ? 1 - dualLoad : base;
      const env = envLoad != null ? 1 - envLoad : 1;
      const raw = 0.5 * base + 0.3 * dual + 0.2 * env;
      return Math.max(0, Math.min(1, raw));
    })();

    const fusedCost = _computeBinaryCost(fusedPressure, fusedThroughput);
    const fusedBudget = _computeBinaryBudget(fusedThroughput, fusedCost);

    return {
      fieldState: { ...state.fieldState },

      local: {
        throughput: throughputLocal,
        throughputBucket: _bucketLevel(throughputLocal),
        pressure: pressureLocal,
        pressureBucket: _bucketPressure(pressureLocal),
        cost: costLocal,
        costBucket: _bucketCost(costLocal),
        budget: budgetLocal,
        budgetBucket: _bucketLevel(budgetLocal)
      },

      fused: {
        throughput: fusedThroughput,
        throughputBucket: _bucketLevel(fusedThroughput),
        pressure: fusedPressure,
        pressureBucket: _bucketPressure(fusedPressure),
        cost: fusedCost,
        costBucket: _bucketCost(fusedCost),
        budget: fusedBudget,
        budgetBucket: _bucketLevel(fusedBudget)
      },

      environment: {
        pressure: envPressure,
        load: envLoad
      },

      dualBand: {
        pressure: dualPressure,
        load: dualLoad
      }
    };
  };

  // ---------------------------------------------------------------------------
  // FIELD STATE UPDATE
  // ---------------------------------------------------------------------------
  const _updateFieldState = (bits, direction) => {
    const size = bits.length || 0;
    const ones = size === 0 ? 0 : bits.split("").filter((b) => b === "1").length;
    const entropy = size === 0 ? 0 : ones / size;

    if (direction === "in") state.fieldState.lastInputSize = size;
    else state.fieldState.lastOutputSize = size;

    state.fieldState.entropy = entropy;
    state.fieldState.signalDensity = size / 1024;
    state.fieldState.environmentalPressure = Math.min(
      1,
      entropy * state.fieldState.signalDensity
    );

    _trace("field:state:update", {
      direction,
      size,
      entropy,
      pressure: state.fieldState.environmentalPressure
    });
  };

  // ---------------------------------------------------------------------------
  // PACKET GENERATION
  // ---------------------------------------------------------------------------
  const _generateFieldPacket = (bits, direction) => {
    const vitals = _computeBinaryVitals();

    const payload = {
      type: "binary-field-event",
      direction,
      bits,
      fieldState: vitals.fieldState,
      binary: {
        throughput: vitals.fused.throughput,
        throughputBucket: vitals.fused.throughputBucket,
        pressure: vitals.fused.pressure,
        pressureBucket: vitals.fused.pressureBucket,
        cost: vitals.fused.cost,
        costBucket: vitals.fused.costBucket,
        budget: vitals.fused.budget,
        budgetBucket: vitals.fused.budgetBucket
      },
      localBinary: vitals.local,
      environment: vitals.environment,
      dualBand: vitals.dualBand,
      bluetooth: {
        ready: !!state.bluetooth
      }
    };

    const json = JSON.stringify(payload);
    const encoded = state.encoder.encode(json);

    return emitFieldPacket(
      "event",
      {
        direction,
        fieldState: payload.fieldState,
        binary: payload.binary,
        localBinary: payload.localBinary,
        environment: payload.environment,
        dualBand: payload.dualBand,
        bluetooth: payload.bluetooth,
        bits: encoded,
        bitLength: encoded.length
      },
      state.id
    );
  };

  // ---------------------------------------------------------------------------
  // INGEST
  // ---------------------------------------------------------------------------
  const ingest = (bits) => {
    const safe = state.sentinel.scan(bits);
    if (!safe) {
      _trace("field:ingest:blocked", { reason: "sentinel-deny" });
      return emitFieldPacket(
        "ingest-blocked",
        { reason: "sentinel-deny" },
        state.id
      );
    }

    _updateFieldState(bits, "in");

    const packet = _generateFieldPacket(bits, "in");

    state.pipeline.run(packet.bits);
    state.reflex.run(packet.bits);
    state.logger.logBinary(packet.bits, { source: "field-in" });

    return packet;
  };

  // ---------------------------------------------------------------------------
  // EMIT
  // ---------------------------------------------------------------------------
  const emit = (bits) => {
    _updateFieldState(bits, "out");

    const packet = _generateFieldPacket(bits, "out");

    state.pipeline.run(packet.bits);
    state.logger.logBinary(packet.bits, { source: "field-out" });

    return packet;
  };

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  return {
    state,
    setEnvironmentMetrics,
    ingest,
    emit,
    computeVitals: _computeBinaryVitals
  };
};


// ============================================================================
//  FACTORY
// ============================================================================

export const createAIBinaryField = (config = {}) =>
  AIBinaryField(config);

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS, map‑free)
// ============================================================================
export {
  BinaryFieldMetaV30 as FieldMetaV30
};

PulseRealm.AIBinaryField = {
    AIBinaryField,
    createAIBinaryField,
    FieldMetaV30: BinaryFieldMetaV30,
    prewarmBinaryField
}
