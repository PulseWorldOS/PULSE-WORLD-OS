// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseCoreBinaryOverlay-v40.js
// PULSE OS — v40 IMMORTAL
// BINARY SUPER-OVERLAY — PURE COMPUTE, FULLY AWARE, ZERO SIDE EFFECTS
// “THE MOST OVERUSED ORGAN WITH THE MOST UNDERUSED POWER”
// ============================================================================
import {
  PulseVitalsLogger,
  PulseVitalsMonitor,
  PulseUIFlow,
  PulseUIErrors,
  log as PulseLog,
  warn as PulseWarn,
  error as PulseError,
  PulseProofReflex,
  PulseUIRouteMemory,
  PulsePageScanner
} from "../../../../../_PROOF/PULSE-PROOF.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ADAPTERS (overlay-aware)
import { createPulseCoreMemoryAdapter_v40 as createPulseAIMemoryAdapter }      from "./ADAPTERS/PulseCoreAIMemoryAdapter-v40.js";
import { createPulseEarnMemoryAdapter_v40 as createPulseEarnMemoryAdapter }    from "./ADAPTERS/PulseCoreEarnMemoryAdapter-v40.js";
import { createPulseMeshMemoryAdapter_v40 as createPulseMeshMemoryAdapter }    from "./ADAPTERS/PulseCoreMeshMemoryAdapter-v40.js";
import { createPulseProxyMemoryAdapter_v40 as createPulseProxyMemoryAdapter }  from "./ADAPTERS/PulseCoreProxyMemoryAdapter-v40.js";
import { createPulseRouterMemoryAdapter_v40 as createPulseRouterMemoryAdapter } from "./ADAPTERS/PulseCoreRouterMemoryAdapter-v40.js";
import { createPulseSendMemoryAdapter_v40 as createPulseSendMemoryAdapter }    from "./ADAPTERS/PulseCoreSendMemoryAdapter-v40.js";

// ============================================================================
// BINARY HASHING / SIGNATURE ENGINE
// ============================================================================
function computeBinaryHash(input) {
  const json = typeof input === "string" ? input : JSON.stringify(input || {});
  let h = 2166136261 >>> 0;
  for (let i = 0; i < json.length; i++) {
    h ^= json.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "bin-" + (h >>> 0).toString(16);
}

function computeBinarySignature(input, ctx = {}) {
  const base   = computeBinaryHash(input);
  const wave   = ctx.wave   || "unknown";
  const tier   = ctx.tier   || "unknown";
  const device = ctx.device || "unknown";
  return `${base}::${wave}::${tier}::${device}`;
}

// ============================================================================
// BINARY COMPRESSION / EXPANSION (pure compute)
// ============================================================================
function compressBinary(input) {
  const json = typeof input === "string" ? input : JSON.stringify(input || {});
  const out = [];
  let last = null;
  let count = 0;

  for (let i = 0; i < json.length; i++) {
    const c = json[i];
    if (c === last) {
      count++;
    } else {
      if (last !== null) out.push([last, count]);
      last = c;
      count = 1;
    }
  }
  if (last !== null) out.push([last, count]);

  return out;
}

function expandBinary(rle) {
  if (!Array.isArray(rle)) return null;
  let out = "";
  for (const [char, count] of rle) {
    out += char.repeat(count);
  }
  try {
    return JSON.parse(out);
  } catch {
    return out;
  }
}

// ============================================================================
// PURE BINARY OVERLAY — v40 IMMORTAL SUPER-OVERLAY
// ============================================================================
export function createPulseBinaryOverlay({
  dnaTag   = "default-dna",
  version  = "40.0-IMMORTAL-BINARY-SUPER-OVERLAY",
  log      = console.log,

  // ⭐ READ-ONLY injected organs
  Governor      = PulseRealm.PulseCoreGovernor,
  CoreMemory    = PulseRealm.PulseCoreMemory,
  MemoryManager = PulseRealm.PulseCoreMemoryManager
} = {}) {

  const Scratch = {
    byKey:      Object.create(null),
    compressed: Object.create(null),
    signatures: Object.create(null)
  };

  // ⭐ JSON-aware safe log (plays nice with EVO console)
  function safeLog(stage, details = {}) {
    try {
      log(`💾 PULSE CORE MEMORY v40 - [PulseBinaryOverlay-v40] ${stage}`, details);
    } catch {}
  }

  // -------------------------------------------------------------------------
  // CONTEXT AWARENESS (READ-ONLY)
  // -------------------------------------------------------------------------
  function getContext() {
    return {
      wave:      Governor?.waveContextHint?.primaryWave || "unknown",
      device:    Governor?.deviceContext?.platform      || "unknown",
      tier:      MemoryManager?.storageTier?.()         || "indexeddb",
      emergency: MemoryManager?.emergencyMode?.()       || false,
      pressure:  MemoryManager?.pressure?.()            || 0
    };
  }

  // -------------------------------------------------------------------------
  // CANONICALIZE — context-aware, signature-aware, compression-aware
  // -------------------------------------------------------------------------
  function canonicalize(input) {
    const ctx       = getContext();
    const hash      = computeBinaryHash(input);
    const signature = computeBinarySignature(input, ctx);

    // RAM reuse
    if (Scratch.byKey[hash]) {
      safeLog("HIT_RAM", {
        hash,
        signature,
        context: ctx
      });
      return {
        hash,
        signature,
        value: Scratch.byKey[hash].value,
        reused: true,
        context: ctx
      };
    }

    // compress
    const compressed = compressBinary(input);

    Scratch.byKey[hash]      = { value: input };
    Scratch.compressed[hash] = compressed;
    Scratch.signatures[hash] = signature;

    safeLog("NEW", {
      hash,
      signature,
      context: ctx
    });

    return {
      hash,
      signature,
      value: input,
      compressed,
      reused: false,
      context: ctx
    };
  }

  // -------------------------------------------------------------------------
  // INBOUND / OUTBOUND — signature + compression aware
  // -------------------------------------------------------------------------
  function interceptInbound(payload) {
    const result = canonicalize(payload);
    safeLog("INBOUND", {
      hash:       result.hash,
      signature:  result.signature,
      reused:     result.reused,
      context:    result.context
    });
    return result;
  }

  function interceptOutbound(payload) {
    const result = canonicalize(payload);
    safeLog("OUTBOUND", {
      hash:       result.hash,
      signature:  result.signature,
      reused:     result.reused,
      context:    result.context
    });
    return result;
  }

  // -------------------------------------------------------------------------
  // EXPANSION — decompress RLE back to object
  // -------------------------------------------------------------------------
  function expand(hash) {
    const compressed = Scratch.compressed[hash];
    if (!compressed) {
      safeLog("EXPAND_MISS", { hash });
      return null;
    }
    const expanded = expandBinary(compressed);
    safeLog("EXPAND_HIT", { hash });
    return expanded;
  }

  // -------------------------------------------------------------------------
  // RAM FLUSH — clears signatures + compressed
  // -------------------------------------------------------------------------
  function flushRam() {
    Scratch.byKey      = Object.create(null);
    Scratch.compressed = Object.create(null);
    Scratch.signatures = Object.create(null);
    safeLog("FLUSH_RAM", {
      version,
      dnaTag
    });
  }

  // -------------------------------------------------------------------------
  // SUPER OVERLAY OBJECT
  // -------------------------------------------------------------------------
  const PulseBinaryOverlay = {
    canonicalize,
    interceptInbound,
    interceptOutbound,
    expand,
    flushRam,

    getContext,
    signatures: Scratch.signatures,
    compressed: Scratch.compressed,

    dnaTag,
    version,

    Governor,
    CoreMemory,
    MemoryManager
  };

  // -------------------------------------------------------------------------
  // ADAPTER INJECTION — context-aware
  // -------------------------------------------------------------------------
  PulseBinaryOverlay.adapters = {
    AI:     createPulseAIMemoryAdapter({   overlay: PulseBinaryOverlay, dnaTag, log }),
    Earn:   createPulseEarnMemoryAdapter({ overlay: PulseBinaryOverlay, dnaTag, log }),
    Mesh:   createPulseMeshMemoryAdapter({ overlay: PulseBinaryOverlay, dnaTag, log }),
    Proxy:  createPulseProxyMemoryAdapter({overlay: PulseBinaryOverlay, dnaTag, log }),
    Router: createPulseRouterMemoryAdapter({overlay: PulseBinaryOverlay, dnaTag, log }),
    Send:   createPulseSendMemoryAdapter({ overlay: PulseBinaryOverlay, dnaTag, log })
  };

  // ⭐ UPGRADED INITIALIZED LOG — rich, EVO-console friendly
  safeLog("INITIALIZED", {
    version,
    dnaTag,
    context: getContext(),
    overlaySignature: "binary-super-overlay",
    adapters: Object.keys(PulseBinaryOverlay.adapters)
  });

  return PulseBinaryOverlay;
}

// ============================================================================
// DEFAULT IMMORTAL INSTANCE
// ============================================================================
export const PulseBinaryOverlayV40 = createPulseBinaryOverlay();

PulseRealm.PulseBinaryOverlay = {
  createPulseBinaryOverlay,
  PulseBinaryOverlayV40
};
PulseRealm.PulseBinaryOverlay = createPulseBinaryOverlay;
