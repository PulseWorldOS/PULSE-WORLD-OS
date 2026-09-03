/**
 * aiBinaryEvolution-v30.js — Pulse OS v30‑IMMORTAL++ Organ
 * --------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Evolution Engine (genetic layer)
 *   • generates deterministic binary signatures
 *   • detects drift and mutation
 *   • enforces organism identity
 *   • binary‑primary, dualband‑safe, port‑era ready
 */


// ============================================================================
//  GLOBAL HANDLE (environment‑agnostic, no identity surfaces)
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  CANONICAL JSON CANONICALIZER — deterministic key ordering
// ============================================================================
function canonicalize(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}


// ============================================================================
//  BINARY EQUALITY HELPER — correct drift comparison
// ============================================================================
function binaryEquals(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


// ============================================================================
//  PREWARM ENGINE — v30, behavior preserved
// ============================================================================
export function prewarmAIBinaryEvolution(config = {}) {
  try {
    const { encoder, memory, trace } = config;

    if (!encoder.encode || !memory.write || !memory.read) {
      if (trace) {
        // eslint-disable-next-line no-console
        console.warn("[AIBinaryEvolution Prewarm] Missing encoder/memory");
      }
      return false;
    }

    const warmJson = canonicalize({
      id: "prewarm",
      keys: ["id", "keys", "type"],
      type: "organ-signature"
    });

    const warmBits = encoder.encode(warmJson);
    const warmKey  = encoder.encode("signature:prewarm-organ");

    memory.write(warmKey, warmBits);

    if (trace) {
      const stored = memory.read(warmKey);
      // eslint-disable-next-line no-console
      console.log("[AIBinaryEvolution Prewarm] success", {
        bits: warmBits.length,
        storedBits: stored.length ?? 0
      });
    }

    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[AIBinaryEvolution Prewarm] Failed:", err);
    return false;
  }
}

// ============================================================================
//  AIBinaryEvolution — pseudo‑class IMMORTAL++
// ============================================================================

export const AIBinaryEvolution = (config = {}) => {
  // -------------------------------------------------------------------------
  // STATE
  // -------------------------------------------------------------------------
  const state = {
    id: config.id || "pulse-touch-evolution",
    encoder: config.encoder,
    memory: config.memory,
    trace: !!config.trace,
    maxSignatureBits: config.maxSignatureBits || 0
  };

  if (!state.encoder.encode) {
    throw new Error("AIBinaryEvolution requires aiBinaryAgent encoder");
  }
  if (!state.memory.write) {
    throw new Error("AIBinaryEvolution requires aiBinaryMemory");
  }

  // -------------------------------------------------------------------------
  // TRACE
  // -------------------------------------------------------------------------
  const _trace = (event, payload) => {
    if (!state.trace) return;
    console.log(`[${state.id}] ${event}`, payload);
  };

  // -------------------------------------------------------------------------
  // SIGNATURE GENERATION — deterministic, canonical
  // -------------------------------------------------------------------------
  const generateSignature = (organ) => {
    const json = canonicalize({
      id: organ.id || null,
      keys: Object.keys(organ),
      type: organ.constructor.name || "UnknownOrgan"
    });

    let binary = state.encoder.encode(json);
    const originalLength = binary.length;

    if (state.maxSignatureBits > 0 && binary.length > state.maxSignatureBits) {
      binary = binary.slice(-state.maxSignatureBits);
      _trace("generateSignature:truncated", {
        organ: organ.id,
        originalBits: originalLength,
        maxSignatureBits: state.maxSignatureBits
      });
    }

    _trace("generateSignature", {
      organ: organ.id,
      bits: binary.length
    });

    return binary;
  };

  // -------------------------------------------------------------------------
  // SIGNATURE STORAGE
  // -------------------------------------------------------------------------
  const storeSignature = (organ) => {
    const signature = generateSignature(organ);
    const key = state.encoder.encode(`signature:${organ.id}`);

    state.memory.write(key, signature);

    _trace("storeSignature", {
      organ: organ.id,
      bits: signature.length
    });

    return signature;
  };

  const loadSignature = (organ) => {
    const key = state.encoder.encode(`signature:${organ.id}`);
    const stored = state.memory.read(key);

    _trace("loadSignature", {
      organ: organ.id,
      storedBits: stored.length
    });

    return stored || null;
  };

  // -------------------------------------------------------------------------
  // DRIFT DETECTION — correct binary comparison
  // -------------------------------------------------------------------------
  const detectDrift = (organ) => {
    const oldSig = loadSignature(organ);
    const newSig = generateSignature(organ);

    if (!oldSig) {
      _trace("detectDrift:firstSignature", { organ: organ.id });
      return { oldSig: null, newSig };
    }

    if (binaryEquals(oldSig, newSig)) {
      _trace("detectDrift:noDrift", { organ: organ.id });
      return null;
    }

    _trace("detectDrift:driftDetected", {
      organ: organ.id,
      oldBits: oldSig.length,
      newBits: newSig.length
    });

    return { oldSig, newSig };
  };

  // -------------------------------------------------------------------------
  // EVOLUTION UPDATE
  // -------------------------------------------------------------------------
  const evolve = (organ) => {
    const drift = detectDrift(organ);

    if (!drift) {
      const result = Object.freeze({
        evolved: false,
        message: "No drift detected"
      });
      _trace("evolve:noDrift", { organ: organ.id });
      return result;
    }

    storeSignature(organ);

    const result = Object.freeze({
      evolved: true,
      oldSignature: drift.oldSig,
      newSignature: drift.newSig
    });

    _trace("evolve:evolved", { organ: organ.id });
    return result;
  };

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    state,
    generateSignature,
    storeSignature,
    loadSignature,
    detectDrift,
    evolve
  };
};



// ============================================================================
//  FACTORY EXPORT — v30 IMMORTAL++
// ============================================================================

export const createAIBinaryEvolution = (config = {}) => {
  prewarmAIBinaryEvolution(config);
  return AIBinaryEvolution(config);
};


PulseRealm.AIBinaryEvolution = {
    AIBinaryEvolution,
    createAIBinaryEvolution,
    prewarmAIBinaryEvolution
}
