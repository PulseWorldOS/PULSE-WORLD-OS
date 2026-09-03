// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — AI CORTEX ORGAN
//  Dual‑Band Executive Cortex (binary‑primary, symbolic‑augment)
//  PURE CORTEX. ZERO OWNER IDENTITY. ZERO WALL‑CLOCK. ZERO CONSOLE.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ---------------------------------------------------------
//  GLOBAL CORTEX ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ---------------------------------------------------------

const _globalCortexArteryRegistry = new Map();

/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || "ai-dualband-cortex-v30"}#${instanceIndex}`;
}

export function getGlobalCortexArteries() {
  const out = {};
  for (const [k, v] of _globalCortexArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ---------------------------------------------------------
//  CORTEX PREWARM ENGINE — v30 IMMORTAL++ (logic preserved, identity-free)
// ---------------------------------------------------------
export function prewarmAICortex(config = {}) {
  try {
    const { encoder } = config;

    const binaryMetrics = {
      throughput: 1,
      pressure: 0,
      cost: 0,
      budget: 1,
      buckets: {
        throughput: "elite",
        pressure: "none",
        cost: "none",
        budget: "elite"
      }
    };

    const symbolicMetrics = {
      intent: "prewarm",
      confidence: 1,
      semanticLoad: 0.2,
      contextDepth: 0.3,
      persona: "none",
      boundaryMode: "safe",
      mode: "prewarm"
    };

    const fused = {
      type: "binary-cortex-decision",
      timestamp: 0, // IMMORTAL++: no wall-clock
      pattern: "prewarm-pattern",
      decision: "prewarm-decision",
      binary: binaryMetrics,
      symbolic: symbolicMetrics,
      band: {
        primary: "binary",
        secondary: "symbolic",
        fusion: "binary-primary-symbolic-augment"
      }
    };

    if (encoder.encode) {
      const bits = encoder.encode(JSON.stringify(fused));
      encoder.decode(bits, "string");
    }

    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------
//  CORTEX CLASS — v16 LOGIC, v24 METRICS, v30 IDENTITY REMOVAL
// ---------------------------------------------------------
export const AIDualBandCortex = (() => {

  // -----------------------------------------------------
  // IMMORTAL INTERNAL STATE
  // -----------------------------------------------------
  let _instanceCount = 0;

  const _registerInstance = () => {
    const idx = _instanceCount;
    _instanceCount += 1;
    return idx;
  };

  const getInstanceCount = () => _instanceCount;

  // -----------------------------------------------------
  // IMMORTAL CREATION SURFACE
  // -----------------------------------------------------
  const create = (config = {}) => {
    const id = config.id || "ai-dualband-cortex-v30";
    const instanceIndex = _registerInstance();

    // BINARY ORGAN STACK
    const encoder   = config.encoder;
    const pipeline  = config.pipeline  || null;
    const reflex    = config.reflex    || null;
    const logger    = config.logger    || null;
    const memory    = config.memory    || null;
    const registry  = config.registry  || null;
    const evolution = config.evolution || null;

    // VITALS
    const heartbeat = config.heartbeat || null;
    const earn      = config.earn      || null;
    const governor  = config.governor  || null;

    // SYMBOLIC STACK
    const router            = config.router            || null;
    const personaEngine     = config.personaEngine     || null;
    const boundariesEngine  = config.boundariesEngine  || null;
    const permissionsEngine = config.permissionsEngine || null;

    // HOOKS
    const overmindReporter =
      typeof config.overmindReporter === "function"
        ? config.overmindReporter
        : null;

    const nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    const traceEnabled = !!config.trace;

    if (!encoder) {
      throw new Error("AIDualBandCortex IMMORTAL requires aiBinaryAgent encoder");
    }

    // INTERNAL IMMORTAL STATE
    const patternHistory = [];

    // -----------------------------------------------------
    // TRACE (IMMORTAL SAFE)
    // -----------------------------------------------------
    const trace = (event, data) => {
      if (!traceEnabled) return;
      try {
        console.log(`[DualBand:${instanceIndex}]`, event, data);
      } catch {}
    };

    // -----------------------------------------------------
    // BINARY COGNITION METRICS
    // -----------------------------------------------------
    const computeCognitionThroughput = (patternComplexity, snapshotBits, earnPressure = 0) => {
      const sizeFactor = Math.min(1, snapshotBits / 65536);
      const earnFactor = Math.min(1, earnPressure);
      const raw = Math.max(0, 1 - (patternComplexity * 0.4 + sizeFactor * 0.4 + earnFactor * 0.2));
      return Math.min(1, raw);
    };

    const computeCognitionPressure = (bitLength, snapshotBits, heartbeatPressure = 0) => {
      const sizeFactor = Math.min(1, snapshotBits / 65536);
      const raw = Math.min(1, (bitLength / 50000) * (0.4 + sizeFactor * 0.4 + heartbeatPressure * 0.2));
      return Math.max(0, raw);
    };

    const computeCognitionCost = (pressure, throughput) =>
      Math.max(0, Math.min(1, pressure * (1 - throughput)));

    const computeCognitionBudget = (throughput, cost) =>
      Math.max(0, Math.min(1, throughput - cost));

    const bucketLevel = v =>
      v >= 0.9 ? "elite" :
      v >= 0.75 ? "high" :
      v >= 0.5 ? "medium" :
      v >= 0.25 ? "low" : "critical";

    const bucketPressure = v =>
      v >= 0.9 ? "overload" :
      v >= 0.7 ? "high" :
      v >= 0.4 ? "medium" :
      v > 0   ? "low" : "none";

    const bucketCost = v =>
      v >= 0.8 ? "heavy" :
      v >= 0.5 ? "moderate" :
      v >= 0.2 ? "light" :
      v > 0    ? "negligible" : "none";

    // -----------------------------------------------------
    // AUX VITALS
    // -----------------------------------------------------
    const readHeartbeatVitals = () => {
      try {
        if (!heartbeat || typeof heartbeat.snapshot !== "function") return null;
        const snap = heartbeat.snapshot();
        return {
          ticks: snap.artery.ticks ?? 0,
          pulses: snap.artery.pulses ?? 0,
          skips: snap.artery.skips ?? 0,
          lastPressure: snap.artery.lastPressure ?? 0,
          lastLoad: snap.artery.lastLoad ?? 0,
          primaryState: snap.artery.lastPrimaryState ?? "unknown"
        };
      } catch { return null; }
    };

    const readEarnVitals = () => {
      try {
        if (!earn || typeof earn.snapshot !== "function") return null;
        const snap = earn.snapshot();
        return {
          activeJobs: snap.activeJobs ?? 0,
          backlog: snap.backlog ?? 0,
          earnPressure: snap.earnPressure ?? 0,
          revenueRate: snap.revenueRate ?? 0
        };
      } catch { return null; }
    };

    // -----------------------------------------------------
    // PATTERN RECOGNITION
    // -----------------------------------------------------
    const detectPattern = bits => {
      const motif = bits.slice(0, 32);
      patternHistory.push(motif);
      if (patternHistory.length > 64) patternHistory.shift();
      trace("pattern:detected", { motif });
      return motif;
    };

    // -----------------------------------------------------
    // BINARY DECISION
    // -----------------------------------------------------
    const makeBinaryDecision = (pattern, bits, snapshotBits, heartbeatVitals, earnVitals) => {
      const bitLength = bits.length;
      const complexity = pattern.length / 8;

      const loadFactor = Math.min(1, snapshotBits / 65536);
      const signalFactor = Math.min(1, bitLength / 32768);
      const earnPressure = earnVitals.earnPressure ?? 0;
      const heartbeatPressure = heartbeatVitals.lastPressure ?? 0;

      let decision = "neutral";

      if ((loadFactor > 0.7 || heartbeatPressure > 0.8) && signalFactor > 0.5)
        decision = "conserve";
      else if (loadFactor < 0.3 && signalFactor < 0.5 && earnPressure < 0.6)
        decision = "expand";

      trace("decision:binary", {
        pattern,
        decision,
        loadFactor,
        signalFactor,
        complexity,
        heartbeatPressure,
        earnPressure
      });

      return decision;
    };

    // -----------------------------------------------------
    // SYMBOLIC DECISION
    // -----------------------------------------------------
    const makeSymbolicDecision = (pattern, bits, routerPacket = null) => {
      if (!routerPacket) {
        trace("decision:symbolic", { reason: "no-router-packet", skipped: true });
        return {
          decision: null,
          intent: null,
          confidence: 0,
          semanticLoad: 0,
          contextDepth: 0,
          persona: null,
          boundaryMode: null
        };
      }

      const intent = routerPacket.overmind.intent || "analyze";
      const personaId = routerPacket.personaId || null;
      const safetyMode = routerPacket.personaSafety.safetyMode || "standard";

      const flags = routerPacket.overmind.flags || {};
      const activeFlags = Object.values(flags).filter(Boolean).length;

      const semanticLoad = Math.min(1, activeFlags / 10);
      const contextDepth =
        personaId === "ARCHITECT" ? 0.85 :
        personaId === "OBSERVER" ? 0.65 :
        personaId === "TOURGUIDE" ? 0.55 : 0.45;

      const confidence =
        safetyMode === "strict" ? 0.6 :
        safetyMode === "standard" ? 0.75 : 0.85;

      let decision = null;
      if (["optimize", "refactor", "scale"].includes(intent))
        decision = "expand";
      else if (["stabilize", "diagnose", "protect"].includes(intent))
        decision = "conserve";

      trace("decision:symbolic", {
        pattern,
        decision,
        intent,
        confidence,
        semanticLoad,
        contextDepth,
        persona: personaId,
        boundaryMode: safetyMode
      });

      return {
        decision,
        intent,
        confidence,
        semanticLoad,
        contextDepth,
        persona: personaId,
        boundaryMode: safetyMode
      };
    };

    // -----------------------------------------------------
    // FUSION
    // -----------------------------------------------------
    const fuseDecisions = (binaryDecision, symbolic) => {
      const symbolicDecision = symbolic.decision;
      const confidence = symbolic.confidence || 0;

      let finalDecision = binaryDecision;

      if (symbolicDecision && confidence >= 0.8)
        finalDecision = symbolicDecision;
      else if (
        symbolicDecision &&
        confidence >= 0.5 &&
        symbolicDecision !== "neutral" &&
        binaryDecision === "neutral"
      )
        finalDecision = symbolicDecision;

      trace("decision:fused", {
        binaryDecision,
        symbolicDecision,
        confidence,
        finalDecision
      });

      return finalDecision;
    };

    // -----------------------------------------------------
    // PACKET GENERATION
    // -----------------------------------------------------
    const generateDecisionPacket = (pattern, decision, bits, options = {}) => {
      let snapshotBits = 0;
      if (memory && typeof memory.snapshot === "function") {
        const snapshot = memory.snapshot();
        if (typeof snapshot === "string") snapshotBits = snapshot.length;
      }

      const heartbeatVitals = readHeartbeatVitals();
      const earnVitals = readEarnVitals();

      const heartbeatPressure = heartbeatVitals.lastPressure ?? 0;
      const earnPressure = earnVitals.earnPressure ?? 0;

      const patternComplexity = pattern.length / 8;

      const throughput = computeCognitionThroughput(patternComplexity, snapshotBits, earnPressure);
      const pressure = computeCognitionPressure(bits.length, snapshotBits, heartbeatPressure);
      const cost = computeCognitionCost(pressure, throughput);
      const budget = computeCognitionBudget(throughput, cost);

      const binary = {
        throughput,
        throughputBucket: bucketLevel(throughput),
        pressure,
        pressureBucket: bucketPressure(pressure),
        cost,
        costBucket: bucketCost(cost),
        budget,
        budgetBucket: bucketLevel(budget)
      };

      const symbolic = options.symbolic || {
        intent: null,
        confidence: 0,
        semanticLoad: 0,
        contextDepth: 0,
        persona: null,
        boundaryMode: null
      };

      const band = {
        primary: "binary",
        secondary: "symbolic",
        fusion: "binary-primary-symbolic-augment"
      };

      const artery = Object.freeze({
        binary,
        symbolic,
        band,
        heartbeatVitals,
        earnVitals,
        instanceIndex,
        instanceCount: getInstanceCount(),
        id,
        timestamp: 0
      });

      const payload = {
        type: "binary-cortex-decision",
        timestamp: artery.timestamp,
        pattern,
        decision,
        binary,
        symbolic,
        band,
        binaryDecision: options.binaryDecision || decision,
        symbolicDecision: symbolic.decision || null,
        artery
      };

      const json = JSON.stringify(payload);
      const encoded = encoder.encode(json);

      const packet = {
        ...payload,
        bits: encoded,
        bitLength: encoded.length
      };

      if (overmindReporter) {
        try { overmindReporter(artery, packet); }
        catch (err) { trace("overmind:reporter:error", { error: String(err) }); }
      }

      if (nodeAdminReporter) {
        try { nodeAdminReporter(artery, packet); }
        catch (err) { trace("nodeAdmin:reporter:error", { error: String(err) }); }
      }

      trace("cortex:packet", { bits: packet.bitLength, band });

      return packet;
    };

    // -----------------------------------------------------
    // EXECUTIVE PROCESSING
    // -----------------------------------------------------
    const process = async (bits, routerPacket = null) => {
      const pattern = detectPattern(bits);

      let snapshotBits = 0;
      if (memory && typeof memory.snapshot === "function") {
        const snapshot = memory.snapshot();
        if (typeof snapshot === "string") snapshotBits = snapshot.length;
      }

      const heartbeatVitals = readHeartbeatVitals();
      const earnVitals = readEarnVitals();

      const binaryDecision = makeBinaryDecision(
        pattern,
        bits,
        snapshotBits,
        heartbeatVitals,
        earnVitals
      );

      const symbolic = makeSymbolicDecision(pattern, bits, routerPacket);

      const fusedDecision = fuseDecisions(binaryDecision, symbolic);

      const packet = generateDecisionPacket(pattern, fusedDecision, bits, {
        binaryDecision,
        symbolic
      });

      if (pipeline) pipeline.run(packet.bits);
      if (reflex) reflex.run(packet.bits);
      if (logger && typeof logger.logBinary === "function")
        logger.logBinary(packet.bits, { source: "cortex" });

      return packet;
    };

    // -----------------------------------------------------
    // IMMORTAL RETURN SURFACE
    // -----------------------------------------------------
    return {
      id,
      instanceIndex,
      getInstanceCount,
      encoder,
      pipeline,
      reflex,
      logger,
      memory,
      registry,
      evolution,
      heartbeat,
      earn,
      governor,
      router,
      personaEngine,
      boundariesEngine,
      permissionsEngine,
      overmindReporter,
      nodeAdminReporter,
      patternHistory,
      trace,
      detectPattern,
      makeBinaryDecision,
      makeSymbolicDecision,
      fuseDecisions,
      generateDecisionPacket,
      process
    };
  };

  return { create, getInstanceCount };

})();


export const createCortex = (config = {}) =>
  AIDualBandCortex(config);

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
PulseRealm.AICortex = {
    AIDualBandCortex,
    createCortex,
    getGlobalCortexArteries,
    prewarmAICortex
}
