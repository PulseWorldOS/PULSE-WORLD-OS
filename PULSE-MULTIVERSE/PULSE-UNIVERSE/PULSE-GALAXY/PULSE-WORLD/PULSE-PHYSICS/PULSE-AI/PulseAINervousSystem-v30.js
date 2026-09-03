// ============================================================================
//  aiNervousSystem-v30.js — Pulse OS v30-IMMORTAL-ADVANTAGE+++
//  Binary Nervous System • Routing Brainstem • Deterministic • Routing Artery v7
//  Dualband • Registry-Aware • Multi-Instance • Spiral-Safe • Signal-Aware
//  v30+: Chunked routing • Binary-first • Drift-proof • Zero randomness
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Binary Nervous System** of the organism.
//
//    It is the routing brainstem for binary signals:
//      • receives binary signals from organs
//      • consults anatomy topology + immunity quarantine
//      • resolves valid downstream targets
//      • emits routing packets (binary) with artery metrics
//      • delivers bits to target organs (run/handle)
//      • supports chunked routing for large binary streams
//
//    It provides organism-level routing awareness:
//      • routing throughput
//      • routing pressure
//      • routing cost
//      • routing budget
//      • routing artery buckets (throughput/pressure/cost/budget)
//      • window-safe routing snapshots (per-instance)
//      • global routing artery registry (multi-instance)
//
//    It is **binary-only** and **non-cognitive**:
//      • does NOT interpret symbolic state
//      • does NOT perform cognition
//      • does NOT override pipeline/reflex engines
//      • treats all inputs as read-only
//      • never touches secrets directly (only binary already prepared upstream)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  GLOBAL HANDLE (IMMORTAL, environment-agnostic)
// ============================================================================



// ============================================================================
//  ORGAN IDENTITY + META (v30 IMMORTAL-ADVANTAGE+++)
// ============================================================================

export const NERVOUS_SYSTEM_IDENTITY =
  "ai-binary-nervous-system-v30-immortal-advantage+++";

export const NervousSystemMeta = Object.freeze({
  identity: NERVOUS_SYSTEM_IDENTITY,
  layer: "organ-nervous-system",
  role: "binary-nervous-system",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  evo: Object.freeze({
    epoch: 30,
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    binaryFirst: true,
    routingBrainstem: true,
    nonCognitive: true
  }),
  contracts: Object.freeze({
    binaryOnly: true,
    zeroRandomness: true,
    deterministicOnly: true,
    noSecrets: true,
    noTokens: true,
    noExternalWrites: true
  })
});

export const surfaceMeta = Object.freeze({
  layer: "organ",
  band: "binary-primary",
  name: "aiNervousSystem-v30"
});

// ============================================================================
//  GLOBAL ROUTING ARTERY REGISTRY
// ============================================================================

const _globalRoutingArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || NervousSystemMeta.identity}#${instanceIndex}`;
}

export function getGlobalRoutingArteries() {
  const out = {};
  for (const [k, v] of _globalRoutingArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  BUCKET HELPERS — v7
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
//  SIGNAL-AWARE TRACE LAYER
// ============================================================================

function traceNervousEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      subsystem: "nervous-system",
      level: "info",
      message: `[AIBinaryNervousSystem-v30] ${event}`,
      extra: payload || {},
      organ: NervousSystemMeta.identity,
      layer: surfaceMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(`[AIBinaryNervousSystem-v30] ${event}`, payload);
}

// ============================================================================
//  PACKET EMITTER
// ============================================================================

function emitRoutingPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: NervousSystemMeta,
    packetType: `routing-${type}`,
    packetId: `routing-${type}-${now}`,
    timestamp: now,
    epoch: NervousSystemMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM
// ============================================================================

export function prewarmAIBinaryNervousSystem({ trace = false } = {}) {
  const packet = emitRoutingPacket("prewarm", {
    message: "Nervous system v30 prewarmed and routing artery v7 aligned."
  });

  traceNervousEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================
export const AIBinaryNervousSystem = (() => {
  // -----------------------------------------------------
  // IMMORTAL INSTANCE REGISTRY
  // -----------------------------------------------------
  let _instanceCount = 0;

  const _registerInstance = () => {
    const idx = _instanceCount;
    _instanceCount += 1;
    return idx;
  };

  const getInstanceCount = () => (_instanceCount || 0);

  // -----------------------------------------------------
  // IMMORTAL CREATION SURFACE
  // -----------------------------------------------------
  const create = (config = {}) => {
    const id = config.id || NervousSystemMeta.identity;
    const encoder = config.encoder;
    const anatomy = config.anatomy;
    const immunity = config.immunity;
    const registry = config.registry;
    const logger = config.logger || null;
    const traceEnabled = !!config.trace;

    const nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    if (!encoder) throw new Error("AIBinaryNervousSystem v30 requires encoder");
    if (!anatomy.topology.get)
      throw new Error("AIBinaryNervousSystem v30 requires aiBinaryAnatomy");
    if (!immunity.sanitize || !immunity.quarantined)
      throw new Error("AIBinaryNervousSystem v30 requires aiBinaryImmunity");
    if (!registry)
      throw new Error("AIBinaryNervousSystem v30 requires aiBinaryOrganRegistry");

    const organs = new Map();
    const instanceIndex = _registerInstance();

    const windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    let _windowStart = PulseRealm.PulseNOW;
    let _windowRoutes = 0;
    let _windowBits = 0;
    let _windowTargets = 0;

    let _totalRoutes = 0;
    let _totalBits = 0;
    let _totalTargets = 0;

    const routingArtery = {
      throughput: 0,
      pressure: 0,
      cost: 0,
      budget: 1,
      lastTargets: [],
      lastSource: null,
      routesPerSec: 0,
      harmonicLoad: 0,
      snapshot: () =>
        Object.freeze({
          throughput: routingArtery.throughput,
          pressure: routingArtery.pressure,
          cost: routingArtery.cost,
          budget: routingArtery.budget,
          lastTargets: routingArtery.lastTargets,
          lastSource: routingArtery.lastSource,
          routesPerSec: routingArtery.routesPerSec,
          harmonicLoad: routingArtery.harmonicLoad,
          instanceIndex,
          instanceCount: getInstanceCount()
        })
    };

    // ---------------------------------------------------
    // INTERNAL TRACE
    // ---------------------------------------------------
    const _trace = (event, payload) => {
      traceNervousEvent(event, payload, traceEnabled);
    };

    // ---------------------------------------------------
    // WINDOW ROLL
    // ---------------------------------------------------
    const _rollWindow = (now) => {
      if (now - _windowStart >= windowMs) {
        _windowStart = now;
        _windowRoutes = 0;
        _windowBits = 0;
        _windowTargets = 0;
      }
    };

    // ---------------------------------------------------
    // ROUTING ARTERY COMPUTE
    // ---------------------------------------------------
    const _computeRoutingArtery = () => {
      const now = PulseRealm.PulseNOW;
      _rollWindow(now);

      const elapsedMs = Math.max(1, now - _windowStart);
      const routesPerSec = (_windowRoutes / elapsedMs) * 1000;

      const instanceCount = getInstanceCount() || 1;
      const harmonicLoad = routesPerSec / instanceCount;

      const avgTargets =
        _windowRoutes > 0 ? _windowTargets / _windowRoutes : 0;

      const avgBits =
        _windowRoutes > 0 ? _windowBits / _windowRoutes : 0;

      const targetFactor = Math.min(1, avgTargets / 16);
      const sizeFactor = Math.min(1, avgBits / 100000);
      const loadFactor = Math.min(1, harmonicLoad / 256);

      const pressure = Math.max(
        0,
        Math.min(1, (targetFactor + sizeFactor + loadFactor) / 3)
      );

      const throughput = Math.max(0, Math.min(1, 1 - pressure));
      const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
      const budget = Math.max(0, Math.min(1, throughput - cost));

      const artery = {
        instanceIndex,
        instanceCount,

        windowMs,
        windowRoutes: _windowRoutes,
        windowBits: _windowBits,
        windowTargets: _windowTargets,

        totalRoutes: _totalRoutes,
        totalBits: _totalBits,
        totalTargets: _totalTargets,

        routesPerSec,
        harmonicLoad,
        avgTargets,
        avgBits,

        throughput,
        throughputBucket: bucketLevel(throughput),

        pressure,
        pressureBucket: bucketPressure(pressure),

        cost,
        costBucket: bucketCost(cost),

        budget,
        budgetBucket: bucketLevel(budget),

        id,
        timestamp: now
      };

      routingArtery.throughput = throughput;
      routingArtery.pressure = pressure;
      routingArtery.cost = cost;
      routingArtery.budget = budget;
      routingArtery.routesPerSec = routesPerSec;
      routingArtery.harmonicLoad = harmonicLoad;

      const key = _registryKey(id, instanceIndex);
      _globalRoutingArteryRegistry.set(key, artery);

      if (nodeAdminReporter) {
        try {
          nodeAdminReporter(artery, NervousSystemMeta);
        } catch (err) {
          _trace("nodeAdmin:reporter:error", { error: String(err) });
        }
      }

      return artery;
    };

    // ---------------------------------------------------
    // ORGAN REGISTRATION
    // ---------------------------------------------------
    const registerOrgan = (organId, organInstance) => {
      organs.set(organId, organInstance);
      _trace("organ:registered", { organId });
    };

    // ---------------------------------------------------
    // TARGET DETERMINATION
    // ---------------------------------------------------
    const _determineTargets = (sourceId) => {
      const topo = anatomy.topology.get(sourceId);
      if (!topo) {
        _trace("routing:targets:none", { sourceId });
        return [];
      }

      const outputs = topo.outputs || [];
      const bidirectional = topo.bidirectional || [];

      const targets = [...outputs, ...bidirectional].filter(
        (id) => !immunity.quarantined.has(id)
      );

      _trace("routing:targets", { sourceId, targets });
      return targets;
    };

    // ---------------------------------------------------
    // ROUTING METRIC HELPERS
    // ---------------------------------------------------
    const _computeRoutingThroughput = (targetCount, bitLength) => {
      const loadFactor = Math.min(1, targetCount / 16);
      const sizeFactor = Math.min(1, bitLength / 100000);
      return Math.max(
        0,
        Math.min(1, 1 - (loadFactor * 0.5 + sizeFactor * 0.5))
      );
    };

    const _computeRoutingPressure = (targetCount, bitLength) => {
      const raw = (targetCount * bitLength) / 400000;
      return Math.max(0, Math.min(1, raw));
    };

    const _computeRoutingCost = (pressure, throughput) => {
      return Math.max(0, Math.min(1, pressure * (1 - throughput)));
    };

    const _computeRoutingBudget = (throughput, cost) => {
      return Math.max(0, Math.min(1, throughput - cost));
    };

    // ---------------------------------------------------
    // ROUTING PACKET
    // ---------------------------------------------------
    const _generateRoutingPacket = (sourceId, targets, bits) => {
      const bitLength = bits.length;

      const throughput = _computeRoutingThroughput(
        targets.length,
        bitLength
      );
      const pressure = _computeRoutingPressure(
        targets.length,
        bitLength
      );
      const cost = _computeRoutingCost(pressure, throughput);
      const budget = _computeRoutingBudget(throughput, cost);

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

      const payload = {
        type: "binary-routing",
        timestamp: PulseRealm.PulseNOW,
        source: sourceId,
        targets,
        binary
      };

      const json = JSON.stringify(payload);
      const encoded = encoder.encode(json);

      const packet = {
        ...payload,
        bits: encoded,
        bitLength: encoded.length
      };

      routingArtery.lastTargets = targets;
      routingArtery.lastSource = sourceId;

      _trace("routing:packet", {
        bits: packet.bitLength,
        targets: targets.length
      });

      return packet;
    };

    // ---------------------------------------------------
    // PROPAGATION
    // ---------------------------------------------------
    const propagate = (sourceId, bits) => {
      if (typeof bits !== "string") return;

      const safe = immunity.sanitize(bits);
      if (safe !== true) return;

      const targets = _determineTargets(sourceId);

      const now = PulseRealm.PulseNOW;
      _rollWindow(now);
      _windowRoutes += 1;
      _windowBits += bits.length;
      _windowTargets += targets.length;

      _totalRoutes += 1;
      _totalBits += bits.length;
      _totalTargets += targets.length;

      const routingPacket = _generateRoutingPacket(
        sourceId,
        targets,
        bits
      );

      const artery = _computeRoutingArtery();

      if (
        artery.pressureBucket === "overload" ||
        artery.budgetBucket === "critical"
      ) {
        _trace("routing:spiral-warning", {
          pressure: artery.pressure,
          pressureBucket: artery.pressureBucket,
          budget: artery.budget,
          budgetBucket: artery.budgetBucket
        });
      }

      if (logger.logBinary) {
        logger.logBinary(routingPacket.bits, {
          source: "nervous-system",
          from: sourceId,
          targets
        });
      }

      for (const targetId of targets) {
        const organ = organs.get(targetId);
        if (!organ) continue;

        if (typeof organ.run === "function") {
          organ.run(bits);
        } else if (typeof organ.handle === "function") {
          organ.handle(bits);
        }

        _trace("routing:delivered", { sourceId, targetId });
      }

      return routingPacket;
    };

    const propagateChunked = (sourceId, bits, chunkSize = 65536) => {
      if (typeof bits !== "string") return null;
      if (chunkSize <= 0) chunkSize = 65536;

      const packets = [];
      const totalLength = bits.length;

      for (let offset = 0; offset < totalLength; offset += chunkSize) {
        const chunk = bits.slice(offset, offset + chunkSize);
        const packet = propagate(sourceId, chunk);
        if (packet) {
          packets.push(packet);
        }
      }

      _trace("routing:chunked", {
        sourceId,
        totalBits: totalLength,
        chunkSize,
        chunks: packets.length
      });

      return packets;
    };

    // ---------------------------------------------------
    // IMMORTAL SURFACE
    // ---------------------------------------------------
    return {
      id,
      instanceIndex,
      getInstanceCount,

      routingArtery,

      registerOrgan,
      propagate,
      propagateChunked
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

export const createAIBinaryNervousSystem = (config = {}) =>
  AIBinaryNervousSystem(config);
// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================

PulseRealm.AINervousSystem = {
    NERVOUS_SYSTEM_IDENTITY,
    NervousSystemMeta,
    AIBinaryNervousSystem,
    createAIBinaryNervousSystem,
    prewarmAIBinaryNervousSystem,
    getGlobalRoutingArteries
}
