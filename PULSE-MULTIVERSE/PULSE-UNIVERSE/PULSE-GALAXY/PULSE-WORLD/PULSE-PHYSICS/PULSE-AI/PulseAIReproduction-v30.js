// ============================================================================
//  aiReproduction-v30-IMMORTAL-ADVANTAGE+++.js
//  Binary Reproduction System • Lineage-Safe • Multi-Instance Harmony
//  Artery v7 • Presence/Route/NodeAdmin/Earn/Heartbeat/Cortex/Memory/Nervous/Evolution Aware
//  Owner-Aware (Aldwyn) • Deterministic • Drift-Resistant • Non-Blocking
//  v30++: compressed-capability fingerprint • node-admin-grade insight surface
// ============================================================================

import { createPulseNodeEvolutionV30 } from "../PULSE-TOOLS/AI/PulseToolsNodeEvolution-v30.js";


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  META — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================

export const REPRODUCTION_IDENTITY =
  "ai-binary-reproduction-v30-immortal-advantage+++";

export const ReproductionMeta = Object.freeze({
  identity: REPRODUCTION_IDENTITY,
  layer: "organ-reproduction",
  role: "binary-reproduction-system",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  evo: Object.freeze({
    epoch: 30,
    deterministic: true,
    driftResistant: true,
    lineageSafe: true,
    multiInstanceHarmony: true,
    binaryOnly: true
  }),
  owner: Object.freeze({
    ownerId: "Aldwyn",
    organRank: "founder-architect"
  }),
  contracts: Object.freeze({
    binaryOnly: true,
    zeroRandomness: true,
    nonBlocking: true,
    noSecrets: true,
    noTokens: true,
    noExternalWrites: true
  })
});

// ============================================================================
//  GLOBAL ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ============================================================================

const _reproductionEvolution = createPulseNodeEvolutionV30({
  nodeType: "reproduction",
  trace: false
});

const _globalReproductionArteryRegistry = new Map();

function _registryKey(slice, instanceIndex) {
  return `${slice || "default"}#${instanceIndex}`;
}

export function getGlobalReproductionArteries() {
  const out = {};
  for (const [k, v] of _globalReproductionArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

export function prewarmReproductionArtery(slice = "default") {
  // symmetry + registry liveness
  return !!slice;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================
export const AIBinaryReproduction = (() => {
  let _instanceCount = 0;

  const registerInstance = () => _instanceCount++;

  const getInstanceCount = () => _instanceCount;

  const create = (config = {}) => {
    const id = config.id || ReproductionMeta.identity;
    const encoder = config.encoder;
    const genome = config.genome;
    const ancestry = config.ancestry || null;
    const factory = config.factory;
    const logger = config.logger || null;
    const pipeline = config.pipeline || null;
    const reflex = config.reflex || null;
    const monitor = config.monitor || null;
    const trace = !!config.trace;

    const slice = config.slice || "default";

    const windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    const recommendedRate =
      typeof config.recommendedRate === "number" && config.recommendedRate > 0
        ? config.recommendedRate
        : 32;

    const presenceContextProvider =
      typeof config.presenceContextProvider === "function"
        ? config.presenceContextProvider
        : null;

    const routeContextProvider =
      typeof config.routeContextProvider === "function"
        ? config.routeContextProvider
        : null;

    const nodeAdminContextProvider =
      typeof config.nodeAdminContextProvider === "function"
        ? config.nodeAdminContextProvider
        : null;

    const earnContextProvider =
      typeof config.earnContextProvider === "function"
        ? config.earnContextProvider
        : null;

    const heartbeatContextProvider =
      typeof config.heartbeatContextProvider === "function"
        ? config.heartbeatContextProvider
        : null;

    const cortexContextProvider =
      typeof config.cortexContextProvider === "function"
        ? config.cortexContextProvider
        : null;

    const memoryContextProvider =
      typeof config.memoryContextProvider === "function"
        ? config.memoryContextProvider
        : null;

    const nervousContextProvider =
      typeof config.nervousContextProvider === "function"
        ? config.nervousContextProvider
        : null;

    const evolutionContextProvider =
      typeof config.evolutionContextProvider === "function"
        ? config.evolutionContextProvider
        : null;

    const nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    const instanceIndex = registerInstance();

    let totalClones = 0;
    let windowStart = PulseRealm.PulseNOW;
    let windowCount = 0;

    if (!encoder) throw new Error("AIBinaryReproduction v30 requires aiBinaryAgent encoder");
    if (!genome) throw new Error("AIBinaryReproduction v30 requires aiBinaryGenome");
    if (!factory) throw new Error("AIBinaryReproduction v30 requires organism factory");

    // ---------------------------------------------------------
    // INTERNAL HELPERS
    // ---------------------------------------------------------

    const traceLog = (event, payload) => {
      if (!trace) return;
      console.log(`[${id}:${slice}#${instanceIndex}] ${event}`, payload);
    };

    const warn = (event, artery) => {
      if (logger.warn) {
        logger.warn(event, { artery, instanceIndex, slice });
      }
      if (monitor) {
        try { monitor(artery); }
        catch (err) { traceLog("monitor:error", { error: String(err) }); }
      }
      traceLog(event, { artery, instanceIndex });
    };

    const clamp01 = (v) => {
      const n = typeof v === "number" ? v : 0;
      return n <= 0 ? 0 : n >= 1 ? 1 : n;
    };

    const rollWindow = (now) => {
      if (now - windowStart >= windowMs) {
        windowStart = now;
        windowCount = 0;
      }
    };

    // ---------------------------------------------------------
    // CONTEXT WRAPPERS
    // ---------------------------------------------------------

    const safePresence = () => {
      if (!presenceContextProvider) return null;
      try {
        const ctx = presenceContextProvider() || {};
        return {
          clusterId: typeof ctx.clusterId === "string" ? ctx.clusterId : null,
          presenceDensity: clamp01(ctx.presenceDensity),
          bandMix: {
            symbolic: clamp01(ctx.bandMix.symbolic),
            dual: clamp01(ctx.bandMix.dual),
            binary: clamp01(ctx.bandMix.binary)
          },
          newCount: ctx.newCount || 0,
          veteranCount: ctx.veteranCount || 0,
          powerUserCount: ctx.powerUserCount || 0
        };
      } catch (err) {
        traceLog("presence:context:error", { error: String(err) });
        return null;
      }
    };

    const safeRoute = () => {
      if (!routeContextProvider) return null;
      try {
        const ctx = routeContextProvider() || {};
        return {
          weakSegments: Array.isArray(ctx.weakSegments) ? ctx.weakSegments.slice(0, 32) : [],
          prioritySegments: Array.isArray(ctx.prioritySegments) ? ctx.prioritySegments.slice(0, 32) : [],
          corridorPressure: clamp01(ctx.corridorPressure),
          castleLoad: clamp01(ctx.castleLoad),
          serverLoad: clamp01(ctx.serverLoad)
        };
      } catch (err) {
        traceLog("route:context:error", { error: String(err) });
        return null;
      }
    };

    const safeNodeAdmin = () => {
      if (!nodeAdminContextProvider) return null;
      try {
        const ctx = nodeAdminContextProvider() || {};
        return {
          meshPressure: clamp01(ctx.meshPressure),
          routePressure: clamp01(ctx.routePressure),
          reproductionPriority: clamp01(ctx.reproductionPriority)
        };
      } catch (err) {
        traceLog("nodeAdmin:context:error", { error: String(err) });
        return null;
      }
    };

    const safeEarn = () => {
      if (!earnContextProvider) return null;
      try {
        const ctx = earnContextProvider() || {};
        return {
          earnBalance: ctx.earnBalance || 0,
          activeJobs: ctx.activeJobs || 0,
          earnPressure: clamp01(ctx.earnPressure),
          earnPriority: clamp01(ctx.earnPriority)
        };
      } catch (err) {
        traceLog("earn:context:error", { error: String(err) });
        return null;
      }
    };

    const safeHeartbeat = () => {
      if (!heartbeatContextProvider) return null;
      try {
        const ctx = heartbeatContextProvider() || {};
        const normalize = (hb) =>
          hb ? {
            lastBeatAt: hb.lastBeatAt || 0,
            state: hb.state || "unknown",
            idleMs: hb.idleMs || 0
          } : null;

        return {
          mom: normalize(ctx.mom),
          dad: normalize(ctx.dad),
          earn: normalize(ctx.earn)
        };
      } catch (err) {
        traceLog("heartbeat:context:error", { error: String(err) });
        return null;
      }
    };

    const safeCortex = () => {
      if (!cortexContextProvider) return null;
      try {
        const ctx = cortexContextProvider() || {};
        return {
          pressure: clamp01(ctx.pressure),
          budget: clamp01(ctx.budget),
          mode: typeof ctx.mode === "string" ? ctx.mode : null
        };
      } catch (err) {
        traceLog("cortex:context:error", { error: String(err) });
        return null;
      }
    };

    const safeMemory = () => {
      if (!memoryContextProvider) return null;
      try {
        const ctx = memoryContextProvider() || {};
        return {
          pressure: clamp01(ctx.pressure),
          budget: clamp01(ctx.budget),
          hotKeyRatio: clamp01(ctx.hotKeyRatio)
        };
      } catch (err) {
        traceLog("memory:context:error", { error: String(err) });
        return null;
      }
    };

    const safeNervous = () => {
      if (!nervousContextProvider) return null;
      try {
        const ctx = nervousContextProvider() || {};
        return {
          routingPressure: clamp01(ctx.routingPressure),
          routingBudget: clamp01(ctx.routingBudget),
          routesPerSec: ctx.routesPerSec || 0
        };
      } catch (err) {
        traceLog("nervous:context:error", { error: String(err) });
        return null;
      }
    };

    const safeEvolution = () => {
      if (!evolutionContextProvider) return null;
      try {
        const ctx = evolutionContextProvider() || {};
        return {
          driftLevel: ctx.driftLevel || "none",
          newLimb: !!ctx.newLimb,
          overgrowth: !!ctx.overgrowth,
          starvation: !!ctx.starvation
        };
      } catch (err) {
        traceLog("evolution:context:error", { error: String(err) });
        return null;
      }
    };

    // ---------------------------------------------------------
    // ARTERY COMPUTATION
    // ---------------------------------------------------------

    const computeArtery = () => {
      const now = PulseRealm.PulseNOW;
      rollWindow(now);

      const elapsedMs = Math.max(1, now - windowStart);
      const ratePerMs = windowCount / elapsedMs;
      const ratePerSec = ratePerMs * 1000;

      const instanceCount = getInstanceCount();
      const harmonicLoad = instanceCount > 0 ? ratePerSec / instanceCount : ratePerSec;

      const rateFactor =
        recommendedRate > 0
          ? Math.min(1, harmonicLoad / recommendedRate)
          : 0;

      const throughput = Math.max(0, Math.min(1, 1 - rateFactor));
      const pressure = Math.max(0, Math.min(1, rateFactor));
      const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
      const budget = Math.max(0, Math.min(1, throughput - cost));

      const presenceCtx = safePresence();
      const routeCtx = safeRoute();
      const nodeCtx = safeNodeAdmin();
      const earnCtx = safeEarn();
      const heartbeatCtx = safeHeartbeat();
      const cortexCtx = safeCortex();
      const memoryCtx = safeMemory();
      const nervousCtx = safeNervous();
      const evolutionCtx = safeEvolution();

      let reproductionHint = "normal";

      if (nodeCtx.reproductionPriority >= 0.7) reproductionHint = "recommended";
      if (routeCtx.corridorPressure >= 0.7) reproductionHint = "recommended";
      if (earnCtx.earnPriority >= 0.7) reproductionHint = "recommended";

      if (nodeCtx.reproductionPriority >= 0.9 && routeCtx.corridorPressure >= 0.8)
        reproductionHint = "urgent";

      if (earnCtx.earnPriority >= 0.9 && (routeCtx.corridorPressure ?? 0) >= 0.7)
        reproductionHint = "urgent";

      const artery = {
        slice,
        instanceIndex,
        instanceCount,
        totalClones,
        windowMs,
        windowCount,
        ratePerSec,
        harmonicLoad,
        throughput,
        pressure,
        cost,
        budget,
        recommendedRate,
        timestamp: now,
        reproductionHint,
        presence: presenceCtx,
        routes: routeCtx,
        nodeAdmin: nodeCtx,
        earn: earnCtx,
        heartbeat: heartbeatCtx,
        cortex: cortexCtx,
        memory: memoryCtx,
        nervous: nervousCtx,
        evolution: evolutionCtx,
        owner: {
          ownerId: ReproductionMeta.owner.ownerId,
          organRank: ReproductionMeta.owner.organRank
        }
      };

      if (pressure >= 0.9 || budget <= 0.1) {
        warn("reproduction:spiral:detected", artery);
      }

      const key = _registryKey(slice, instanceIndex);
      _globalReproductionArteryRegistry.set(key, artery);

      if (nodeAdminReporter) {
        try { nodeAdminReporter(artery, ReproductionMeta); }
        catch (err) { traceLog("nodeAdmin:reporter:error", { error: String(err) }); }
      }

      return artery;
    };

    // ---------------------------------------------------------
    // PACKET + CLONING
    // ---------------------------------------------------------

    const buildFingerprint = (g) => {
      const caps = g.capabilities || {};
      const flags = {
        cortex: !!caps.cortex,
        nervous: !!caps.nervous,
        memory: !!caps.memory,
        evolution: !!caps.evolution,
        heartbeat: !!caps.heartbeat,
        earn: !!caps.earn,
        router: !!caps.router,
        environment: !!caps.environment
      };

      const bits =
        (flags.cortex ? "1" : "0") +
        (flags.nervous ? "1" : "0") +
        (flags.memory ? "1" : "0") +
        (flags.evolution ? "1" : "0") +
        (flags.heartbeat ? "1" : "0") +
        (flags.earn ? "1" : "0") +
        (flags.router ? "1" : "0") +
        (flags.environment ? "1" : "0");

      return { bits, flags };
    };

    const generateChildId = (parentId) => {
      const g = genome.loadGenome();
      const fp = g.fingerprint || "00000000";
      const suffix = fp.slice(0, 8);
      const childId = `${parentId}-child-${suffix}`;

      traceLog("child:id:generated", { parentId, childId, instanceIndex });
      return childId;
    };

    const evolvePacket = (packet, extraCtx = {}) => {
      if (!_reproductionEvolution.evolveNodePulse) return packet;

      const context = {
        slice,
        instanceIndex,
        windowMs,
        recommendedRate,
        presence: safePresence(),
        routes: safeRoute(),
        nodeAdmin: safeNodeAdmin(),
        earn: safeEarn(),
        heartbeat: safeHeartbeat(),
        cortex: safeCortex(),
        memory: safeMemory(),
        nervous: safeNervous(),
        evolution: safeEvolution(),
        artery: computeArtery(),
        ...extraCtx
      };

      return _reproductionEvolution.evolveNodePulse({
        nodeType: "reproduction",
        pulse: packet,
        context
      });
    };

    const generatePacket = (parentId, childId, g) => {
      const fp = buildFingerprint(g);

      const payload = {
        type: "binary-reproduction",
        timestamp: PulseRealm.PulseNOW,
        parentId,
        childId,
        genomeFingerprint: g.fingerprint,
        capabilityBits: fp.bits,
        ownerId: ReproductionMeta.owner.ownerId
      };

      const json = JSON.stringify(payload);
      const binary = encoder.encode(json);

      let packet = {
        ...payload,
        bits: binary,
        bitLength: binary.length
      };

      packet = evolvePacket(packet, {
        parentId,
        childId,
        genomeFingerprint: g.fingerprint,
        capabilityFlags: fp.flags
      });

      traceLog("reproduction:packet", {
        parentId,
        childId,
        bits: packet.bitLength,
        instanceIndex
      });

      return packet;
    };

    const cloneOrganism = (parentId, parentConfig = {}) => {
      const g = genome.loadGenome();
      if (!g) throw new Error("AIBinaryReproduction v30: no genome available for cloning");

      const childId = generateChildId(parentId);

      const childConfig = {
        ...parentConfig,
        organismId: childId,
        genome: g
      };

      const childOrganism = factory(childConfig);
      const packet = generatePacket(parentId, childId, g);

      pipeline.run(packet.bits);
      reflex.run(packet.bits);

      if (logger.logBinary) {
        logger.logBinary(packet.bits, { source: "reproduction" });
      }

      ancestry.recordReproduction({
        parentId,
        childId,
        genomeFingerprint: g.fingerprint,
        timestamp: packet.timestamp
      });

      const now = PulseRealm.PulseNOW;
      rollWindow(now);
      totalClones++;
      windowCount++;

      const artery = computeArtery();

      if (monitor) {
        try { monitor(artery); }
        catch (err) { traceLog("monitor:error", { error: String(err) }); }
      }

      traceLog("reproduction:clone", {
        parentId,
        childId,
        artery,
        instanceIndex
      });

      return { childId, childOrganism, packet, artery };
    };

    const spawnMany = (parentId, parentConfig = {}, count = 1) => {
      const results = [];
      for (let i = 0; i < count; i++) {
        results.push(cloneOrganism(parentId, parentConfig));
      }
      traceLog("reproduction:spawnMany", {
        parentId,
        count: results.length,
        instanceIndex
      });
      return results;
    };

    return Object.freeze({
      id,
      slice,
      instanceIndex,
      getReproductionArtery: computeArtery,
      getReproductionSnapshot: () => Object.freeze({
        meta: ReproductionMeta,
        artery: computeArtery()
      }),
      cloneOrganism,
      spawnMany
    });
  };

  return Object.freeze({
    create,
    getInstanceCount
  });
})();


// ============================================================================
//  FACTORY — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================

export const createAIBinaryReproduction = (config = {}) =>
  AIBinaryReproduction(config);


// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

PulseRealm.AIReproduction = {
    ReproductionMeta,
    REPRODUCTION_IDENTITY,
    AIBinaryReproduction,
    createAIBinaryReproduction,
    getGlobalReproductionArteries,
    prewarmReproductionArtery
}

PulseRealm.PulseAIReproduction = createAIBinaryReproduction;
PulseRealm.PulseAIReproductionWarmup = prewarmReproductionArtery;
PulseRealm.PulseAIReproductionRequest =getGlobalReproductionArteries;