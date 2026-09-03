/**
 * aiOrganRegistry-v30.js — Pulse OS v30‑IMMORTAL++ DualBand Organ
 * ---------------------------------------------------------------
 * CANONICAL ROLE:
 *   Organ Identity Registry (binary‑primary, dualband‑aware)
 *   Stores organ identity, type, band, signatureBits, timestamps.
 *   Deterministic • Drift‑Proof • IMMORTAL v30 • Port‑era ready
 */

// ============================================================================
//  GLOBAL HANDLE (Touch‑aware, environment‑agnostic)
// ============================================================================



// ============================================================================
//  BINARY‑NATIVE ORGANS — v30 IMMORTAL++
//  These are the organs that are *binary‑native*, not dualband.
//  They generate/consume binary frames directly.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


const BINARY_ONLY_ORGANS = new Set([
  "aiBinaryAgent",
  "aiBinaryEvolution",
  "PULSE-BAND-BINARY-WAVE",
  "PulseShifterBinaryEvolutionaryPulse",
  "PULSE-WORLD-BINARY-OS",
  "PULSE-WORLD-CACHE",
  "PULSE-WORLD-SUBSTRATE",
  "PULSE-WORLD-STRANDED-DNA"
]);

// ============================================================================
//  PACKET EMITTER — v30 IMMORTAL++ packet discipline
// ============================================================================
function emitRegistryPacket(type, payload) {
  const touch = PulseRealm.__PULSE_TOUCH__ || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-registry",
      version: touch.version || "v0",
      epoch: touch.epoch || PulseRealm.PulseNOW,
      layer: "registry",
      role: "organ-registry",
      band: "binary"
    },
    packetType: `registry-${type}`,
    timestamp: PulseRealm.PulseNOW,
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — v30, deterministic, port‑era safe
// ============================================================================
export function prewarmAIBinaryOrganRegistry(config = {}) {
  try {
    const { encoder, memory, evolution, trace } = config;

    if (!encoder.encode || !memory.write || !memory.read) {
      return false;
    }

    const warmJson = JSON.stringify({
      id: "prewarm-organ",
      type: "Prewarm",
      band: "binary",
      signatureBits: 0,
      timestamp: 0
    });

    const warmKey = encoder.encode("organ:prewarm");
    const warmVal = encoder.encode(warmJson);

    memory.write(warmKey, warmVal);

    const readBack = memory.read(warmKey);
    if (readBack) encoder.decode(readBack, "string");

    if (typeof memory.listKeys === "function") {
      const keys = memory.listKeys();
      for (const k of keys) encoder.decode(k, "string");
    }

    if (evolution.generateSignature) {
      evolution.generateSignature({
        id: "prewarm-organ",
        constructor: { name: "PrewarmOrgan" }
      });
    }

    if (trace) console.log("[aiOrganRegistry] prewarm");

    return emitRegistryPacket("prewarm", {
      message: "Organ Registry prewarmed."
    });
  } catch (err) {
    return emitRegistryPacket("prewarm-error", {
      error: String(err),
      message: "Organ Registry prewarm failed."
    });
  }
}
// ============================================================================
//  AIBinaryOrganRegistry — pseudo‑class IMMORTAL++
// ============================================================================
export const AIBinaryOrganRegistry = (config = {}) => {
  const state = {
    id: config.id || "organ-registry",
    encoder: config.encoder,
    memory: config.memory,
    evolution: config.evolution || null,
    trace: !!config.trace
  };

  if (!state.encoder.encode) {
    throw new Error("AIBinaryOrganRegistry requires aiBinaryAgent encoder");
  }
  if (!state.memory.write) {
    throw new Error("AIBinaryOrganRegistry requires aiBinaryMemory");
  }

  const artery = {
    registrations: 0,
    lookups: 0,
    lists: 0,
    lastBits: 0,
    snapshot: () =>
      Object.freeze({
        registrations: artery.registrations,
        lookups: artery.lookups,
        lists: artery.lists,
        lastBits: artery.lastBits
      })
  };

  // -------------------------------------------------------------------------
  // INTERNAL HELPERS
  // -------------------------------------------------------------------------
  const trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}] ${event}`, payload);
  };

  // -------------------------------------------------------------------------
  // REGISTER ORGAN — deterministic, drift‑proof
  // -------------------------------------------------------------------------
  const registerOrgan = (organ) => {
    const signature = state.evolution
      ? state.evolution.generateSignature(organ)
      : state.encoder.encode("nosig");

    const typeName = organ.constructor.name;

    const band = BINARY_ONLY_ORGANS.has(typeName)
      ? "binary"
      : "dualband";

    const record = {
      id: organ.id || null,
      type: typeName,
      band,
      signatureBits: signature.length,
      timestamp: PulseRealm.PulseNOW
    };

    const json = JSON.stringify(record);
    const key = state.encoder.encode(`organ:${record.id}`);
    const value = state.encoder.encode(json);

    state.memory.write(key, value);

    artery.registrations++;
    artery.lastBits = value.length;

    trace("registerOrgan", {
      organ: record.id,
      type: record.type,
      band,
      bits: value.length
    });

    return emitRegistryPacket("register", record);
  };

  // -------------------------------------------------------------------------
  // LOOKUP — v30
  // -------------------------------------------------------------------------
  const getOrganRecord = (organId) => {
    const key = state.encoder.encode(`organ:${organId}`);
    const binary = state.memory.read(key);

    artery.lookups++;

    if (!binary) {
      trace("getOrganRecord:notFound", { organId });
      return null;
    }

    const json = state.encoder.decode(binary, "string");
    const record = JSON.parse(json);

    artery.lastBits = binary.length;

    trace("getOrganRecord", { organId, record });

    return emitRegistryPacket("lookup", record);
  };

  // -------------------------------------------------------------------------
  // LIST — v30
  // -------------------------------------------------------------------------
  const listOrgans = () => {
    const keys = state.memory.listKeys();

    const organKeys = keys.filter((k) => {
      const decoded = state.encoder.decode(k, "string");
      return decoded.startsWith("organ:");
    });

    const organIds = organKeys.map((k) => {
      const decoded = state.encoder.decode(k, "string");
      return decoded.replace("organ:", "");
    });

    artery.lists++;
    artery.lastBits = organIds.length;

    trace("listOrgans", { count: organIds.length });

    return emitRegistryPacket("list", { organIds });
  };

  // -------------------------------------------------------------------------
  // EVOLVE — v30
  // -------------------------------------------------------------------------
  const evolveOrgan = (organ) => {
    if (!state.evolution) {
      throw new Error("evolution engine not provided");
    }

    const result = state.evolution.evolve(organ);

    if (result.evolved) {
      registerOrgan(organ);
    }

    trace("evolveOrgan", {
      organ: organ.id,
      evolved: result.evolved
    });

    return emitRegistryPacket("evolve", result);
  };

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    state,
    artery,

    registerOrgan,
    getOrganRecord,
    listOrgans,
    evolveOrgan
  };
};


// ============================================================================
//  FACTORY — v30 IMMORTAL++
// ============================================================================

export const createAIBinaryOrganRegistry = (config = {}) => {
  prewarmAIBinaryOrganRegistry(config);
  return AIBinaryOrganRegistry(config);
};

PulseRealm.BinaryOrganRegistry = {
    AIBinaryOrganRegistry,
    createAIBinaryOrganRegistry,
    prewarmAIBinaryOrganRegistry
}
