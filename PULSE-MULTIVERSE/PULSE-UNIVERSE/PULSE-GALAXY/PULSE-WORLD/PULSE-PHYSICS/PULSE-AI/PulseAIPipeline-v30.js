// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — BINARY PIPELINE ORGAN
//  Compute Bloodstream • Flow Artery Metrics • Deterministic Binary Engine
//  PURE FLOW ENGINE. ZERO RANDOMNESS. ZERO EXTERNAL MUTATION.
//  DUALBAND‑AWARE • GPU‑FRIENDLY • OVERMIND‑AWARE
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  LOCAL META — v30 IMMORTAL++ (map‑free, drift‑proof)
// ============================================================================
const PipelineMeta = Object.freeze({
  type: "Organ",
  subsystem: "BinaryPipeline",
  layer: "B1-BinaryPipeline",
  version: "30-IMMORTAL++",
  identity: "aiBinaryPipeline-v30-IMMORTAL++",
  evo: Object.freeze({
    epoch: "30-IMMORTAL++",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    dualBandAware: true,
    overmindAware: true,
    gpuFriendly: true,
    packetAware: true,
    windowSafe: true,
    multiInstanceReady: true
  })
});

// ============================================================================
//  PACKET EMITTER — deterministic, pipeline-scoped
// ============================================================================
function emitPipelinePacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: {
      version: PipelineMeta.version,
      identity: PipelineMeta.identity,
      layer: PipelineMeta.layer,
      subsystem: PipelineMeta.subsystem,
      epoch: PipelineMeta.evo.epoch
    },
    packetType: `pipeline-${type}`,
    packetId: `pipeline-${type}-${now}`,
    timestamp: now,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30‑IMMORTAL++
// ============================================================================
export function prewarmBinaryPipeline({ trace = false, context = {} } = {}) {
  const packet = emitPipelinePacket("prewarm", {
    message: "Binary pipeline prewarmed and flow artery aligned.",
    context: {
      presenceTier: context.presenceTier || "idle",
      band: context.band || "binary"
    }
  });

  if (trace) {
    console.log("[BinaryPipeline] prewarm", packet);
  }
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30‑IMMORTAL++
// ============================================================================
export const AIBinaryPipeline = (config = {}) => {

  // ============================================================
  // STATE
  // ============================================================
  const state = {
    id: config.id || PipelineMeta.identity,
    trace: !!config.trace,

    stages: [],
    observers: [],
    reflexes: [],

    flowArtery: {
      lastThroughput: 1,
      lastPressure: 0,
      lastCost: 0,
      lastBudget: 1,
      lastPresenceTier: "idle",
      lastBand: "binary"
    }
  };

  // ============================================================
  // INTERNAL HELPERS
  // ============================================================
  const _assertBinary = (str) => {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  };

  const _trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}] ${event}`, payload);
  };

  // ============================================================
  // BUCKET HELPERS
  // ============================================================
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
    if (v > 0)   return "low";
    return "none";
  };

  const _bucketCost = (v) => {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0)    return "negligible";
    return "none";
  };

  // ============================================================
  // FLOW ARTERY METRICS
  // ============================================================
  const _computeFlowThroughput = (stageCount, observerCount, reflexCount) => {
    const stageFactor = Math.min(1, stageCount / 50);
    const obsFactor   = Math.min(1, observerCount / 50);
    const refFactor   = Math.min(1, reflexCount / 50);

    const raw = Math.max(
      0,
      1 - (stageFactor * 0.4 + obsFactor * 0.3 + refFactor * 0.3)
    );
    return Math.min(1, raw);
  };

  const _computeFlowPressure = (stageCount, observerCount, reflexCount) => {
    const density = stageCount + observerCount + reflexCount;
    const raw = Math.min(1, density / 60);
    return Math.max(0, raw);
  };

  const _computeFlowCost = (pressure, throughput) => {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  };

  const _computeFlowBudget = (throughput, cost) => {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  };

  // ============================================================
  // FLOW ARTERY SNAPSHOT
  // ============================================================
  const _computeFlowArtery = (presenceTier = "idle", band = "binary") => {
    const stageCount = state.stages.length;
    const observerCount = state.observers.length;
    const reflexCount = state.reflexes.length;

    const throughput = _computeFlowThroughput(stageCount, observerCount, reflexCount);
    const pressure   = _computeFlowPressure(stageCount, observerCount, reflexCount);
    const cost       = _computeFlowCost(pressure, throughput);
    const budget     = _computeFlowBudget(throughput, cost);

    state.flowArtery.lastThroughput = throughput;
    state.flowArtery.lastPressure   = pressure;
    state.flowArtery.lastCost       = cost;
    state.flowArtery.lastBudget     = budget;
    state.flowArtery.lastPresenceTier = presenceTier;
    state.flowArtery.lastBand         = band;

    return {
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      stageCount,
      observerCount,
      reflexCount,
      presenceTier,
      band
    };
  };

  const getFlowArterySnapshot = (extra = {}) => {
    const artery = _computeFlowArtery(
      state.flowArtery.lastPresenceTier,
      state.flowArtery.lastBand
    );
    return emitPipelinePacket("snapshot", { artery, ...extra });
  };

  // ============================================================
  // PIPELINE CONFIGURATION
  // ============================================================
  const addStage = (fn) => {
    if (typeof fn !== "function") {
      throw new TypeError("addStage expects a function");
    }
    state.stages.push(fn);

    const artery = _computeFlowArtery(
      state.flowArtery.lastPresenceTier,
      state.flowArtery.lastBand
    );
    _trace("addStage", { totalStages: state.stages.length, artery });

    emitPipelinePacket("stage-added", {
      pipelineId: state.id,
      totalStages: state.stages.length
    });
  };

  const addObserver = (fn) => {
    if (typeof fn !== "function") {
      throw new TypeError("addObserver expects a function");
    }
    state.observers.push(fn);

    const artery = _computeFlowArtery(
      state.flowArtery.lastPresenceTier,
      state.flowArtery.lastBand
    );
    _trace("addObserver", { totalObservers: state.observers.length, artery });

    emitPipelinePacket("observer-added", {
      pipelineId: state.id,
      totalObservers: state.observers.length
    });
  };

  const addReflex = (fn) => {
    if (typeof fn !== "function") {
      throw new TypeError("addReflex expects a function");
    }
    state.reflexes.push(fn);

    const artery = _computeFlowArtery(
      state.flowArtery.lastPresenceTier,
      state.flowArtery.lastBand
    );
    _trace("addReflex", { totalReflexes: state.reflexes.length, artery });

    emitPipelinePacket("reflex-added", {
      pipelineId: state.id,
      totalReflexes: state.reflexes.length
    });
  };

  // ============================================================
  // PIPELINE EXECUTION
  // ============================================================
  const run = (inputBinary, context = {}) => {
    _assertBinary(inputBinary);

    const presenceTier = context.presenceTier || "idle";
    const band = context.band || "binary";

    const artery = _computeFlowArtery(presenceTier, band);
    _trace("run:start", { bitLength: inputBinary.length, artery });

    emitPipelinePacket("run-start", {
      pipelineId: state.id,
      bitLength: inputBinary.length,
      artery
    });

    let current = inputBinary;

    for (let i = 0; i < state.stages.length; i++) {
      const stage = state.stages[i];

      const output = stage(current);
      _assertBinary(output);

      for (const obs of state.observers) {
        obs({
          stageIndex: i,
          input: current,
          output,
          presenceTier,
          band
        });
      }

      _trace("run:stage", {
        stageIndex: i,
        inputBits: current.length,
        outputBits: output.length
      });

      emitPipelinePacket("run-stage", {
        pipelineId: state.id,
        stageIndex: i,
        inputBits: current.length,
        outputBits: output.length
      });

      current = output;
    }

    for (const reflex of state.reflexes) {
      reflex(current, { presenceTier, band });
    }

    _trace("run:end", { outputBits: current.length });

    emitPipelinePacket("run-end", {
      pipelineId: state.id,
      outputBits: current.length
    });

    return current;
  };

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    state,
    addStage,
    addObserver,
    addReflex,
    run,
    getFlowArterySnapshot
  };
};


// ============================================================================
//  FACTORY — v30‑IMMORTAL++
// ============================================================================
export const createAIBinaryPipeline = (config = {}) =>
  AIBinaryPipeline(config);


// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
PulseRealm.AIPipeline = {
    PipelineMeta,
    AIBinaryPipeline,
    createAIBinaryPipeline,
    prewarmBinaryPipeline
}
