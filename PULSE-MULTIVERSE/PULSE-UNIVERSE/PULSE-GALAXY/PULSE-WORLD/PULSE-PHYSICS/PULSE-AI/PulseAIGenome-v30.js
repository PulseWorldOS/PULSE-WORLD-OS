// ============================================================================
//  aiBinaryGenome-v30.js — Pulse OS v30‑IMMORTAL++
//  Binary Genome Organ • Drift Snapshot • Artery Buckets (No Map, No Identity)
//  PURE BINARY. ZERO OWNER. ZERO WALL-CLOCK. NO ORGANISM MAP INSIDE.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
//  PACKET EMITTER — v30 IMMORTAL++ (no meta, no identity, no wall-clock)
// ============================================================================
function emitGenomePacket(type, payload = {}) {
  return Object.freeze({
    packetType: `genome-${type}`,
    timestamp: 0,              // IMMORTAL++: symbolic, not wall-clock
    layer: "binary-genome",
    role: "genome",
    band: "binary",
    ...payload
  });
}


// ============================================================================
//  BINARY GENOME ORGAN — v30 IMMORTAL++
// ============================================================================
//
//  Design:
//    • No organism map lookup inside the organ.
//    • No identity/owner baked into packets.
//    • All structure comes from an injected snapshot reader.
//    • Drift is symbolic: counts + levels only.
//    • Artery is carried through as-is (no reinterpretation).
//
//  Required config:
//    - encoder: { encode(str) -> Uint8Array | string, decode(binary, "string") -> string }
//    - memory:  { write(keyBinary, valueBinary), read(keyBinary) -> valueBinary | null }
//    - readSnapshot: () => {
//          organIds: string[]
//          signatures: Record<string,string>
//          artery: {
//            throughputBucket, pressureBucket, costBucket, budgetBucket, ...
//          }
//          driftCount: number
//          driftLevel: string
//      }
//
//  Optional:
//    - trustFabric: { recordGenomeDeepPath?, recordGenomeStore?, recordGenomeLoad? }
//    - juryFrame:   { recordEvidence?(label, packet) }
//    - trace: boolean
// ============================================================================
// ============================================================================
//  AIBinaryGenome — pseudo‑class IMMORTAL++
// ============================================================================

export const AIBinaryGenome = (config = {}) => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const state = {
    encoder: config.encoder,
    memory: config.memory,
    readSnapshot: config.readSnapshot,
    trustFabric: config.trustFabric || null,
    juryFrame: config.juryFrame || null,
    trace: !!config.trace,

    cache: {
      organIds: [],
      signatures: {},
      fingerprint: "",
      genomeBinary: null,
      artery: null,
      lastDriftCount: 0,
      lastSnapshotAt: 0
    }
  };

  if (!state.encoder) throw new Error("AIBinaryGenome v30 requires encoder");
  if (!state.memory) throw new Error("AIBinaryGenome v30 requires memory");
  if (typeof state.readSnapshot !== "function") {
    throw new Error("AIBinaryGenome v30 requires readSnapshot() function");
  }

  const _trace = (msg, payload) => {
    if (!state.trace) return;
    console.log(`[AIBinaryGenome v30] ${msg}`, payload);
  };

  // ---------------------------------------------------------------------------
  //  SNAPSHOT SOURCE — injected, map-free
  // ---------------------------------------------------------------------------
  const _readGenomeSource = () => {
    try {
      const snap = state.readSnapshot() || {};
      return {
        organIds: Array.isArray(snap.organIds) ? snap.organIds.slice() : [],
        signatures: snap.signatures || {},
        artery: snap.artery || null,
        driftCount: typeof snap.driftCount === "number" ? snap.driftCount : 0,
        driftLevel: snap.driftLevel || "none"
      };
    } catch (err) {
      _trace("readSnapshot error", String(err));
      return {
        organIds: [],
        signatures: {},
        artery: null,
        driftCount: 0,
        driftLevel: "none"
      };
    }
  };

  // ---------------------------------------------------------------------------
  //  FINGERPRINT — pure binary pattern
  // ---------------------------------------------------------------------------
  const _computeFingerprint = (binary) => {
    let out = "";
    for (let i = 0; i < binary.length; i++) {
      const bit = binary[i];
      const prev = out[out.length - 1] || "0";
      out += bit === prev ? "0" : "1";
    }
    return out;
  };

  // ---------------------------------------------------------------------------
  //  GENOME GENERATION — v30 IMMORTAL++
  // ---------------------------------------------------------------------------
  const generateGenome = () => {
    const { organIds, signatures, artery, driftCount, driftLevel } =
      _readGenomeSource();

    const genomeObject = {
      version: "v30-IMMORTAL++",
      organIds,
      signatures,
      artery,
      driftCount,
      driftLevel
    };

    const json = JSON.stringify(genomeObject);
    const binary = state.encoder.encode(json);
    const fingerprint = _computeFingerprint(binary);

    state.cache.organIds = organIds;
    state.cache.signatures = signatures;
    state.cache.fingerprint = fingerprint;
    state.cache.genomeBinary = binary;
    state.cache.artery = artery;
    state.cache.lastDriftCount = driftCount;
    state.cache.lastSnapshotAt += 1;

    const packet = emitGenomePacket("genome-deep", {
      drift: true,
      driftCount,
      driftLevel,
      genomeBinary: binary,
      fingerprint,
      organIds,
      signatures,
      artery
    });

    state.trustFabric.recordGenomeDeepPath({
      driftCount,
      organCount: organIds.length,
      driftLevel
    });

    state.juryFrame.recordEvidence("genome-deep", packet);

    _trace("deep-path", { organCount: organIds.length, driftCount, driftLevel });

    return packet;
  };

  // ---------------------------------------------------------------------------
  //  STORE GENOME — IMMORTAL++
  // ---------------------------------------------------------------------------
  const storeGenome = () => {
    const packet = generateGenome();
    const key = state.encoder.encode("genome:current");

    state.memory.write(key, packet.genomeBinary);

    const out = emitGenomePacket("store", {
      bits: packet.genomeBinary.length,
      fingerprint: packet.fingerprint
    });

    state.trustFabric.recordGenomeStore({
      bits: packet.genomeBinary.length,
      fingerprint: packet.fingerprint
    });

    state.juryFrame.recordEvidence("genome-store", out);

    _trace("store", { bits: packet.genomeBinary.length });

    return out;
  };

  // ---------------------------------------------------------------------------
  //  LOAD GENOME — IMMORTAL++
  // ---------------------------------------------------------------------------
  const loadGenome = () => {
    const key = state.encoder.encode("genome:current");
    const binary = state.memory.read(key);

    if (!binary) {
      const packet = emitGenomePacket("load-none", { hasGenome: false });
      state.juryFrame.recordEvidence("genome-load-none", packet);
      return packet;
    }

    const json = state.encoder.decode(binary, "string");
    const genome = JSON.parse(json);

    const packet = emitGenomePacket("load", {
      hasGenome: true,
      organCount: genome.organIds.length,
      bits: binary.length,
      genome
    });

    state.juryFrame.recordEvidence("genome-load", packet);
    return packet;
  };

  // ---------------------------------------------------------------------------
  //  SNAPSHOT METRICS — IMMORTAL++
  // ---------------------------------------------------------------------------
  const snapshotMetrics = () => {
    const packet = loadGenome();
    if (!packet.hasGenome) {
      const out = emitGenomePacket("snapshot", {
        hasGenome: false,
        artery: null
      });
      state.juryFrame.recordEvidence("genome-snapshot-none", out);
      return out;
    }

    const artery = packet.genome.artery || null;

    const out = emitGenomePacket("snapshot", {
      hasGenome: true,
      artery,
      throughputBucket: artery.throughputBucket ?? null,
      pressureBucket: artery.pressureBucket ?? null,
      costBucket: artery.costBucket ?? null,
      budgetBucket: artery.budgetBucket ?? null
    });

    state.juryFrame.recordEvidence("genome-snapshot", out);
    return out;
  };

  // ---------------------------------------------------------------------------
  //  LITE SNAPSHOT — IMMORTAL++
  // ---------------------------------------------------------------------------
  const getGenomeSnapshot = () => {
    if (!state.cache.genomeBinary || !state.cache.artery) {
      return emitGenomePacket("snapshot-lite", {
        hasGenome: false,
        artery: null
      });
    }

    return emitGenomePacket("snapshot-lite", {
      hasGenome: true,
      artery: state.cache.artery,
      organCount: state.cache.organIds.length || 0,
      driftCount: state.cache.lastDriftCount
    });
  };

  // ---------------------------------------------------------------------------
  //  PUBLIC API
  // ---------------------------------------------------------------------------
  return {
    state,
    generateGenome,
    storeGenome,
    loadGenome,
    snapshotMetrics,
    getGenomeSnapshot
  };
};


// ============================================================================
//  FACTORY — v30 IMMORTAL++
// ============================================================================

export const createAIBinaryGenome = (config = {}) =>
  AIBinaryGenome(config);

// ============================================================================
//  DUAL EXPORT LAYER — CommonJS compatibility
// ============================================================================
PulseRealm.AIBinaryGenome = {
    AIBinaryGenome,
    createAIBinaryGenome
}
