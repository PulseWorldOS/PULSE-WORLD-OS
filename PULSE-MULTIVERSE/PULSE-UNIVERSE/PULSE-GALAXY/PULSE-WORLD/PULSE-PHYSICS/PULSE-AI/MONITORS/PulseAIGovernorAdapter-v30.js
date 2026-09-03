// ============================================================================
//  aiGovernorAdapter-v30.js — Pulse OS v30 IMMORTAL++
//  Dualband Membrane • Packet Router • Evolution-Safe Adapter • Trust-Aware
//  PURE MEMBRANE. ZERO INTERPRETATION. ZERO MUTATION. ZERO RANDOMNESS.
//  v30: CLEAN META • OWNER PRESERVED • NO OLD MAP REMNANTS
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
//  v30 IMMORTAL++ META (local, stable, owner-preserved)
// ---------------------------------------------------------------------------
const GovernorAdapterMetaV30 = Object.freeze({
  version: "v30-IMMORTAL++",
  epoch: 30,
  identity: "governor-adapter-v30",
  layer: "binary-membrane",
  role: "governor-adapter",
  owner: "Aldwyn",
  subordinate: true
});

// ---------------------------------------------------------------------------
//  HELPERS
// ---------------------------------------------------------------------------
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals.metabolic.pressure != null)
    return binaryVitals.metabolic.pressure;
  return 0;
}

// ---------------------------------------------------------------------------
//  MEMBRANE ARTERY SNAPSHOT — v30 IMMORTAL++
// ---------------------------------------------------------------------------
function buildMembraneArterySnapshot({ binaryStr = "", context = {} } = {}) {
  const binaryVitals = context.binaryVitals || {};
  const pressure = extractBinaryPressure(binaryVitals);

  return Object.freeze({
    type: "membrane-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    organism: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    packet: {
      bitLength: binaryStr.length
    },
    meta: GovernorAdapterMetaV30
  });
}

// ---------------------------------------------------------------------------
//  PACKET EMITTER — v30 IMMORTAL++
// ---------------------------------------------------------------------------
function emitGovernorAdapterPacket(type, payload = {}) {
  return Object.freeze({
    meta: GovernorAdapterMetaV30,
    packetType: `gov-adapter-${type}`,
    packetId: `gov-adapter-${type}-0`,   // IMMORTAL++: symbolic, not time-based
    timestamp: 0,                        // IMMORTAL++: no wall-clock
    ...payload
  });
}

// ---------------------------------------------------------------------------
//  PREWARM — v30 IMMORTAL++
// ---------------------------------------------------------------------------
export function prewarmGovernorAdapter(
  dualBand = null,
  { trace = false, trustFabric = null, juryFrame = null } = {}
) {
  try {
    const pressure = extractBinaryPressure(dualBand.binary || {});

    const artery = buildMembraneArterySnapshot({
      binaryStr: "",
      context: { binaryVitals: dualBand.binary }
    });

    const packet = emitGovernorAdapterPacket("prewarm", {
      message: "Governor adapter prewarmed and membrane artery aligned.",
      binaryPressure: pressure,
      artery
    });

    trustFabric.recordGovernorAdapterPrewarm({ pressure, artery });
    juryFrame.recordEvidence("governor-adapter-prewarm", packet);

    if (trace) console.log("[aiGovernorAdapter v30] prewarm", packet);
    return packet;
  } catch (err) {
    const packet = emitGovernorAdapterPacket("prewarm-error", {
      error: String(err),
      message: "Governor adapter prewarm failed."
    });

    juryFrame.recordEvidence("governor-adapter-prewarm-error", packet);
    return packet;
  }
}
// ---------------------------------------------------------------------------
//  GOVERNOR ADAPTER — v30 IMMORTAL++ (pseudo-class)
// ---------------------------------------------------------------------------
export const AIBinaryGovernorAdapter = (config = {}) => {
  const state = {
    id: config.id || "governor-adapter-v30",

    encoder: config.encoder,
    governor: config.governor,
    pipeline: config.pipeline || null,
    reflex: config.reflex || null,
    logger: config.logger || null,

    bluetooth: config.bluetooth || null,
    trustFabric: config.trustFabric || null,
    juryFrame: config.juryFrame || null,

    trace: !!config.trace
  };

  if (!state.encoder.encode) {
    throw new Error("AIBinaryGovernorAdapter v30 requires encoder.encode()");
  }
  if (!state.governor.handle) {
    throw new Error("AIBinaryGovernorAdapter v30 requires governor.handle()");
  }

  const artery = {
    packetsIn: 0,
    packetsOut: 0,
    lastPacketBits: 0,
    snapshot: () => Object.freeze(snapshotArtery())
  };

  // -------------------------------------------------------------------------
  //  INTERNAL HELPERS
  // -------------------------------------------------------------------------
  const trace = (event, payload) => {
    if (!state.trace) return;
    // eslint-disable-next-line no-console
    console.log(`[${state.id}] ${event}`, payload);
  };

  const assertBinary = (str) => {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  };

  const bucketLoad = (v) => {
    if (v >= 0.9) return "saturated";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "idle";
  };

  const bucketPressure = (v) => {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  };

  const snapshotArtery = () => {
    const { packetsIn, packetsOut, lastPacketBits } = artery;

    const load = Math.min(1, (packetsIn + packetsOut) / 1000);
    const pressure = Math.min(1, lastPacketBits / 65536);

    return {
      packetsIn,
      packetsOut,
      lastPacketBits,
      load,
      loadBucket: bucketLoad(load),
      pressure,
      pressureBucket: bucketPressure(pressure)
    };
  };

  // -------------------------------------------------------------------------
  //  FORWARD: BINARY → GOVERNOR
  // -------------------------------------------------------------------------
  const forwardBinaryToGovernor = (binaryStr, context = {}) => {
    assertBinary(binaryStr);

    const arterySnapshot = buildMembraneArterySnapshot({ binaryStr, context });

    const packet = emitGovernorAdapterPacket("forward-in", {
      bits: binaryStr,
      bitLength: binaryStr.length,
      artery: arterySnapshot,
      bluetooth: {
        ready: !!state.bluetooth,
        channel: null
      }
    });

    trace("forwardBinaryToGovernor", packet);

    artery.packetsIn++;
    artery.lastPacketBits = packet.bitLength;

    state.trustFabric.recordGovernorAdapterIn({
      bitLength: packet.bitLength,
      artery: arterySnapshot
    });

    state.juryFrame.recordEvidence("governor-adapter-in", packet);

    state.governor.handle({
      type: "binary-event",
      bits: packet.bits,
      bitLength: packet.bitLength,
      timestamp: packet.timestamp,
      bluetooth: packet.bluetooth
    });
  };

  // -------------------------------------------------------------------------
  //  FORWARD: GOVERNOR DECISION → BINARY
  // -------------------------------------------------------------------------
  const forwardGovernorDecision = (decisionObj, context = {}) => {
    const json = JSON.stringify(decisionObj);
    const binary = state.encoder.encode(json);

    const arterySnapshot = buildMembraneArterySnapshot({
      binaryStr: binary,
      context
    });

    const packet = emitGovernorAdapterPacket("forward-out", {
      decision: decisionObj,
      bits: binary,
      bitLength: binary.length,
      artery: arterySnapshot
    });

    trace("forwardGovernorDecision", packet);

    artery.packetsOut++;
    artery.lastPacketBits = binary.length;

    state.trustFabric.recordGovernorAdapterOut({
      bitLength: binary.length,
      artery: arterySnapshot
    });

    state.juryFrame.recordEvidence("governor-adapter-out", packet);

    if (state.pipeline) state.pipeline.run(binary);
    if (state.reflex) state.reflex.run(binary);
    if (state.logger) state.logger.logBinary(binary, { source: "Governor" });

    return binary;
  };

  // -------------------------------------------------------------------------
  //  ATTACH HELPERS
  // -------------------------------------------------------------------------
  const attachToPipeline = (pipeline) => {
    pipeline.addObserver(({ output }) => {
      forwardBinaryToGovernor(output);
    });

    trace("attachToPipeline", { pipeline: pipeline.id });
  };

  const attachToReflex = (reflex) => {
    const originalRun = reflex.run.bind(reflex);

    reflex.run = (binaryInput) => {
      const result = originalRun(binaryInput);

      if (result !== null && typeof result === "string") {
        forwardBinaryToGovernor(result);
      }

      return result;
    };

    trace("attachToReflex", { reflex: reflex.id });
  };

  // -------------------------------------------------------------------------
  //  SNAPSHOT MEMBRANE
  // -------------------------------------------------------------------------
  const snapshotMembrane = (context = {}) => {
    const arterySnapshot = snapshotArtery();

    const packet = emitGovernorAdapterPacket("snapshot", {
      artery: arterySnapshot
    });

    state.juryFrame.recordEvidence("governor-adapter-snapshot", packet);

    return packet;
  };

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  return {
    state,
    artery,

    forwardBinaryToGovernor,
    forwardGovernorDecision,

    attachToPipeline,
    attachToReflex,

    snapshotMembrane
  };
};


// ---------------------------------------------------------------------------
//  FACTORY — v30 IMMORTAL++
// ---------------------------------------------------------------------------

export const createAIBinaryGovernorAdapter = (config = {}) =>
  AIBinaryGovernorAdapter(config);

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS
// ---------------------------------------------------------------------------
PulseRealm.AIGovernorAdapter = {
    AIBinaryGovernorAdapter,
    createAIBinaryGovernorAdapter,
    prewarmGovernorAdapter,
    GovernorAdapterMetaV30
}
