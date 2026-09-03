// ============================================================================
//  aiSentience-v30-OMNI.js — Pulse OS v30 Organ
//  Binary Sentience / Self-Awareness Artery • v30-OMNI
//  • organism-wide self-model (map-free, provider-based)
//  • immunity / quarantine awareness (via risk + quarantined provider)
//  • topology + genome fingerprint (size + fingerprint, not raw map)
//  • vitals-aware self artery v7
//  • multi-instance harmonic awareness
//  • deterministic, no external mutation
// ============================================================================


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export const SentienceMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiSentience",
  layer: "C3-SelfModel",
  version: "30-OMNI",
  identity: "aiSentience-v30-OMNI",
  evo: Object.freeze({
    epoch: "30-OMNI",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    multiInstanceReady: true,
    mapFreeTopology: true,        // no organismMap dependency
    arteryGeneration: "v7",
    binaryPrimary: true
  })
});

// ---------------------------------------------------------------------------
//  BUCKET HELPERS — v7
// ---------------------------------------------------------------------------

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

function bucketRisk(v) {
  if (v >= 0.9) return "severe";
  if (v >= 0.6) return "high";
  if (v >= 0.3) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketStability(v) {
  if (v >= 0.9) return "crystalline";
  if (v >= 0.7) return "stable";
  if (v >= 0.4) return "balanced";
  if (v > 0.2) return "fragile";
  return "unknown";
}

// ---------------------------------------------------------------------------
//  SELF ARTERY v7 (map-free, provider-based)
// ---------------------------------------------------------------------------

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

/**
 * v30-OMNI self artery:
 * - no direct organismMap/topology map
 * - uses scalar topologySize + organCount + quarantinedCount
 * - immunityRisk + vitalStability as [0,1] scalars
 */
function computeSelfArteryV7({
  organCount,
  topologySize,
  quarantinedCount,
  emissionRatePerSec,
  instanceCount,
  immunityRisk,
  vitalStability
}) {
  const organFactor = Math.min(1, organCount / 256);
  const topoFactor = Math.min(1, topologySize / 256);
  const quarantineRatio =
    organCount > 0 ? Math.min(1, quarantinedCount / organCount) : 0;

  const harmonicEmission =
    instanceCount > 0 ? emissionRatePerSec / instanceCount : emissionRatePerSec;
  const emissionFactor = Math.min(1, harmonicEmission / 128);

  const immunityFactor = clamp01(immunityRisk);
  const stabilityFactor = clamp01(vitalStability);

  const pressure = Math.min(
    1,
    (organFactor +
      topoFactor +
      quarantineRatio +
      emissionFactor +
      immunityFactor) / 5
  );

  const throughput = Math.max(
    0,
    1 - (quarantineRatio * 0.4 + pressure * 0.4 + immunityFactor * 0.2)
  );

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  const stabilityScore = Math.max(
    0,
    Math.min(1, (stabilityFactor + (1 - pressure)) / 2)
  );

  return Object.freeze({
    organCount,
    topologySize,
    quarantinedCount,
    emissionRatePerSec,
    harmonicEmission,
    quarantineRatio,
    immunityRisk,
    vitalStability,
    throughput,
    pressure,
    cost,
    budget,
    stability: stabilityScore,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget),
    immunityBucket: bucketRisk(immunityRisk),
    stabilityBucket: bucketStability(stabilityScore)
  });
}

// ---------------------------------------------------------------------------
//  AIBinarySentience v30-OMNI (map-free, provider-based)
// ---------------------------------------------------------------------------

/**
 * config:
 *   encoder: { encode(str) -> "01..." }
 *   getOrgans: () => string[]
 *   getTopologySize: () => number          // size only, no map
 *   getQuarantined: () => string[]
 *   getVitals: () => { stability: number, metrics: any }
 *   getImmunityRisk: () => number          // [0,1]
 *   getGenomeFingerprint: () => string
 *   pipeline?: { run(bits) }
 *   reflex?: { run(bits) }
 *   logger?: { logBinary(bits, meta) }
 *   windowMs?: number
 *   trace?: boolean
 */

// ============================================================================
//  AIBinarySentience — IMMORTAL PSEUDO‑CLASS (v30)
// ============================================================================

export const AIBinarySentience = (() => {

  // -------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // -------------------------------------------------------
  const lane = {
    id: null,

    encoder: null,
    getOrgans: null,
    getTopologySize: null,
    getQuarantined: null,
    getVitals: null,
    getImmunityRisk: null,
    getGenomeFingerprint: null,

    pipeline: null,
    reflex: null,
    logger: null,
    trace: false,

    windowMs: 60000,
    windowStart: PulseRealm.PulseNOW,
    windowEmissions: 0,
    totalEmissions: 0,

    instanceIndex: 0,
    instanceCount: 0,

    selfArterySnapshot: null
  };

  // -------------------------------------------------------
  // INIT SURFACE
  // -------------------------------------------------------
  const init = (config = {}) => {
    lane.id = config.id || SentienceMeta.identity;

    lane.encoder = config.encoder;
    lane.getOrgans = config.getOrgans;
    lane.getTopologySize = config.getTopologySize;
    lane.getQuarantined = config.getQuarantined;
    lane.getVitals = config.getVitals;
    lane.getImmunityRisk = config.getImmunityRisk;
    lane.getGenomeFingerprint = config.getGenomeFingerprint;

    lane.pipeline = config.pipeline || null;
    lane.reflex = config.reflex || null;
    lane.logger = config.logger || null;
    lane.trace = !!config.trace;

    if (!lane.encoder.encode) throw new Error("Sentience v30 requires encoder.encode(binaryString)");
    if (typeof lane.getOrgans !== "function") throw new Error("Sentience v30 requires getOrgans()");
    if (typeof lane.getTopologySize !== "function") throw new Error("Sentience v30 requires getTopologySize()");
    if (typeof lane.getQuarantined !== "function") throw new Error("Sentience v30 requires getQuarantined()");
    if (typeof lane.getVitals !== "function") throw new Error("Sentience v30 requires getVitals()");
    if (typeof lane.getImmunityRisk !== "function") throw new Error("Sentience v30 requires getImmunityRisk()");
    if (typeof lane.getGenomeFingerprint !== "function") throw new Error("Sentience v30 requires getGenomeFingerprint()");

    lane.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    lane.windowStart = PulseRealm.PulseNOW;
    lane.windowEmissions = 0;
    lane.totalEmissions = 0;

    lane.instanceIndex = lane.instanceCount++;
  };

  // -------------------------------------------------------
  // WINDOW ROLLING
  // -------------------------------------------------------
  const rollWindow = (now) => {
    if (now - lane.windowStart >= lane.windowMs) {
      lane.windowStart = now;
      lane.windowEmissions = 0;
    }
  };

  // -------------------------------------------------------
  // SELF ARTERY SNAPSHOT (v7)
  // -------------------------------------------------------
  const computeSelfArterySnapshot = () => {
    const organIds = lane.getOrgans() || [];
    const organCount = Array.isArray(organIds) ? organIds.length : 0;

    const topologySizeRaw = lane.getTopologySize();
    const topologySize =
      typeof topologySizeRaw === "number" && topologySizeRaw >= 0
        ? topologySizeRaw
        : 0;

    const quarantined = lane.getQuarantined() || [];
    const quarantinedCount = Array.isArray(quarantined)
      ? quarantined.length
      : 0;

    const vitals = lane.getVitals() || {};
    const vitalsMetrics = vitals.metrics || {};
    const vitalStability =
      typeof vitals.stability === "number"
        ? clamp01(vitals.stability)
        : 0;

    const immunityRisk = clamp01(lane.getImmunityRisk() || 0);

    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const elapsedMs = Math.max(1, now - lane.windowStart);
    const emissionRatePerSec = (lane.windowEmissions / elapsedMs) * 1000;

    const instanceCount = lane.instanceCount;

    const artery = computeSelfArteryV7({
      organCount,
      topologySize,
      quarantinedCount,
      emissionRatePerSec,
      instanceCount,
      immunityRisk,
      vitalStability
    });

    lane.selfArterySnapshot = artery;

    return {
      artery,
      organIds,
      quarantined,
      vitalsMetrics
    };
  };

  // -------------------------------------------------------
  // PUBLIC: SELF ARTERY
  // -------------------------------------------------------
  const getSelfArtery = () => {
    const { artery } = computeSelfArterySnapshot();
    return artery;
  };

  // -------------------------------------------------------
  // PUBLIC: SELF MODEL (v30)
  // -------------------------------------------------------
  const generateSelfModel = () => {
    const { artery, organIds, quarantined, vitalsMetrics } =
      computeSelfArterySnapshot();

    const genomeFingerprint = lane.getGenomeFingerprint() || "0";

    const binary = {
      throughput: artery.throughput,
      throughputBucket: artery.throughputBucket,
      pressure: artery.pressure,
      pressureBucket: artery.pressureBucket,
      cost: artery.cost,
      costBucket: artery.costBucket,
      budget: artery.budget,
      budgetBucket: artery.budgetBucket,
      organCount: artery.organCount,
      topologySize: artery.topologySize,
      quarantinedCount: artery.quarantinedCount,
      emissionRatePerSec: artery.emissionRatePerSec,
      harmonicEmission: artery.harmonicEmission,
      quarantineRatio: artery.quarantineRatio,
      immunityRisk: artery.immunityRisk,
      immunityBucket: artery.immunityBucket,
      stability: artery.stability,
      stabilityBucket: artery.stabilityBucket
    };

    const self = {
      meta: SentienceMeta,
      instanceIndex: lane.instanceIndex,
      instanceCount: lane.instanceCount,
      organs: organIds,
      topologySize: artery.topologySize,
      genomeFingerprint,
      quarantined,
      vitals: vitalsMetrics,
      binary
    };

    trace("self-model:generated", {
      organs: organIds.length,
      quarantined: quarantined.length,
      pressure: artery.pressure,
      budgetBucket: artery.budgetBucket,
      stabilityBucket: artery.stabilityBucket
    });

    return self;
  };

  // -------------------------------------------------------
  // SENTIENCE PACKET + EMIT
  // -------------------------------------------------------
  const generateSentiencePacket = () => {
    const self = generateSelfModel();

    const payload = {
      type: "binary-sentience-v30",
      timestamp: PulseRealm.PulseNOW,
      self
    };

    const json = JSON.stringify(payload);
    const bits = lane.encoder.encode(json);

    const packet = {
      ...payload,
      bits,
      bitLength: bits.length
    };

    trace("sentience:packet", { bits: packet.bitLength });

    return packet;
  };

  const emitSentience = () => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    lane.totalEmissions++;
    lane.windowEmissions++;

    const packet = generateSentiencePacket();

    if (lane.pipeline) lane.pipeline.run(packet.bits);
    if (lane.reflex) lane.reflex.run(packet.bits);
    if (lane.logger.logBinary) {
      lane.logger.logBinary(packet.bits, { source: "sentience-v30" });
    }

    trace("sentience:emitted", {
      bits: packet.bitLength,
      totalEmissions: lane.totalEmissions,
      windowEmissions: lane.windowEmissions
    });

    return packet;
  };

  // -------------------------------------------------------
  // TRACE
  // -------------------------------------------------------
  const trace = (event, payload) => {
    if (!lane.trace) return;
    console.log(`[${lane.id}#${lane.instanceIndex}] ${event}`, payload);
  };

  // -------------------------------------------------------
  // IMMORTAL EXPORT
  // -------------------------------------------------------
  return {
    init,
    getSelfArtery,
    generateSelfModel,
    generateSentiencePacket,
    emitSentience
  };

})();


// ---------------------------------------------------------------------------
//  FACTORY + CJS EXPORTS
// ---------------------------------------------------------------------------


export const createAIBinarySentience = (config = {}) =>
  AIBinarySentience(config);

PulseRealm.AISentience = {
    SentienceMeta,
    AIBinarySentience,
    createAIBinarySentience
}
