// ============================================================================
// FILE: /PulseOS/PULSE-TOOLS/PulseBinaryLoopScanner-v30.js
// PULSE OS — v30‑IMMORTAL
// MAIN LOOP ORGAN — PURE BINARY, ONE-BAND, ARTERY-AWARE, ZERO-DRIFT
// ============================================================================
// ROLE (v30‑IMMORTAL):
//   - Convert binary pulses → deterministic loop indices for all layers.
//   - ONE PRIMARY BAND: BINARY. All other influences are overlays.
//   - Multi-spin aware: phase offsets alter loop paths without randomness.
//   - Presence + harmonics = overlays only (never a second band).
//   - Artery-aware: exposes loop load/pressure + window-safe buckets.
//   - Advantage view: unified multi-mode output + symbolic hints.
//   - Zero randomness, zero timestamps, zero mutation of inputs.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝



// ============================================================================
// META (v30‑IMMORTAL)
// ============================================================================
export const BinaryLoopScannerMeta = Object.freeze({
  version: "30.0-IMMORTAL",
  id: "PulseBinaryLoopScanner",
  role: "MAIN LOOP ORGAN — BINARY PRIMARY BAND",
  modes: ["standard", "deep", "multi", "edge", "flat"],
  guarantees: {
    randomness: "ZERO",
    timestamps: "ZERO",
    mutationOfInputs: "NONE"
  },
  notes: [
    "Binary-only primary band.",
    "Presence + harmonics act as overlays, not bands.",
    "Zero-drift deterministic loop engine."
  ],
  evo: { epoch: 30 }
});


// ============================================================================
// PACKET EMITTER — deterministic, loop-scoped
// ============================================================================
function emitLoopPacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: BinaryLoopScannerMeta,
    packetType: `loop-${type}`,
    severity,
    ...payload
  });
}


// ============================================================================
// PREWARM — v30 IMMORTAL (binary-only, overlays optional)
// ============================================================================
export function prewarmBinaryLoopScanner(overlays = null, { trace = false } = {}) {
  const presence = overlays.presence ?? 0;
  const harmonicBias = overlays.harmonicBias ?? 0;
  const mode = overlays.mode ?? "standard";

  const packet = emitLoopPacket("prewarm", {
    message: "Binary loop scanner prewarmed (v30‑IMMORTAL).",
    presence,
    harmonicBias,
    mode
  });

  if (trace) console.log("[BinaryLoopScanner‑v30] prewarm", packet);
  return packet;
}


// ============================================================================
// MAIN ORGAN IMPLEMENTATION — v30‑IMMORTAL
// ============================================================================
export function createBinaryLoopScanner({ trace = false } = {}) {

  // -------------------------------------------------------------------------
  // ARTERY — loop load/pressure metrics (window-safe)
  // -------------------------------------------------------------------------
  const artery = {
    loops: 0,
    lastMode: null,
    lastIndex: null,
    lastIndices: null,
    lastBits: 0,
    snapshot: () => Object.freeze(_snapshotArtery())
  };

  function _bucketLoad(v) {
    if (v >= 0.9) return "saturated";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "idle";
  }

  function _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "none";
  }

  function _snapshotArtery() {
    const { loops, lastBits } = artery;
    const load = Math.min(1, loops / 4096);
    const pressure = Math.min(1, lastBits / 4096);

    return {
      loops,
      lastMode: artery.lastMode,
      lastIndex: artery.lastIndex,
      lastIndices: artery.lastIndices,
      lastBits,
      load,
      loadBucket: _bucketLoad(load),
      pressure,
      pressureBucket: _bucketPressure(pressure)
    };
  }

  function _updateArtery({ mode, bitsLength, index = null, indices = null }) {
    artery.loops++;
    artery.lastMode = mode;
    artery.lastBits = bitsLength;
    artery.lastIndex = index;
    artery.lastIndices = indices;
  }


  // -------------------------------------------------------------------------
  // SAFETY: PURE BINARY ONLY
  // -------------------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }


  // -------------------------------------------------------------------------
  // CORE: BINARY → NUMBER (DETERMINISTIC, ZERO-DRIFT)
// -------------------------------------------------------------------------
  function bitsToNumber(bits) {
    let n = 0;
    for (let i = 0; i < bits.length; i++) {
      n = (n << 1) | bits[i];
    }
    return n >>> 0;
  }


  // -------------------------------------------------------------------------
  // OVERLAY BIAS (presence + harmonics) — symbolic only
  // -------------------------------------------------------------------------
  function overlayOffset(max, presence = 0, harmonicBias = 0) {
    const p = clamp(presence, 0, 1);
    const h = clamp(harmonicBias, 0, 1);
    const combined = p * 0.6 + h * 0.4;
    return Math.floor(combined * max * 0.1);
  }

  function _windowBucket(index, max) {
    if (max <= 0) return "none";
    const r = index / max;
    if (r < 0.15) return "head";
    if (r < 0.35) return "front";
    if (r < 0.65) return "center";
    if (r < 0.85) return "back";
    return "tail";
  }


  // ========================================================================
  // MODE 1 — STANDARD LOOP INDEX (FAST, RESPONSIVE, BINARY-PRIMARY)
// ========================================================================
  function nextIndex(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) throw new Error("[BinaryLoopScanner‑v30] non-binary bits");
    if (!Number.isFinite(max) || max <= 0) throw new Error("[BinaryLoopScanner‑v30] invalid max");

    const base = bitsToNumber(bits);
    const raw = base % max;

    const spin = ((raw + (spinPhase | 0)) % max + max) % max;
    const offset = overlayOffset(max, presence, harmonicBias);

    const index = ((spin + offset) % max + max) % max;

    _updateArtery({ mode: "standard", bitsLength: bits.length, index });

    if (trace) {
      console.log("[BinaryLoopScanner‑v30] STANDARD", {
        base, raw, spin, offset, index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }


  // ========================================================================
  // MODE 2 — DEEP LOOP INDEX (MRI-LIKE, DEPTH-WEIGHTED)
// ========================================================================
  function nextIndexDeep(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) throw new Error("[BinaryLoopScanner‑v30] non-binary bits");
    if (!Number.isFinite(max) || max <= 0) throw new Error("[BinaryLoopScanner‑v30] invalid max");

    const base = bitsToNumber(bits);
    const folded = (base ^ (base >>> 1)) >>> 0;
    const raw = folded % max;

    const depthBias = Math.floor((bits.length % 17) * 0.07 * max);
    const spin = ((raw + depthBias + (spinPhase | 0)) % max + max) % max;

    const offset = overlayOffset(max, presence * 0.7, harmonicBias * 1.1);
    const index = ((spin + offset) % max + max) % max;

    _updateArtery({ mode: "deep", bitsLength: bits.length, index });

    if (trace) {
      console.log("[BinaryLoopScanner‑v30] DEEP", {
        base, folded, raw, depthBias, spin, offset, index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }


  // ========================================================================
  // MODE 3 — MULTI LOOP (3-PHASE MULTI-SPIN INDICES)
// ========================================================================
  function nextIndexMulti(bits, max, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) throw new Error("[BinaryLoopScanner‑v30] non-binary bits");
    if (!Number.isFinite(max) || max <= 0) throw new Error("[BinaryLoopScanner‑v30] invalid max");

    const base = bitsToNumber(bits);
    const raw = base % max;

    const offset = overlayOffset(max, presence, harmonicBias);
    const phaseStep = Math.max(1, Math.floor(max / 3));

    const indices = [0, 1, 2].map(i => {
      const phase = i * phaseStep;
      return ((raw + phase + offset) % max + max) % max;
    });

    _updateArtery({ mode: "multi", bitsLength: bits.length, indices });

    if (trace) {
      console.log("[BinaryLoopScanner‑v30] MULTI", {
        base, raw, offset, indices,
        windows: indices.map(i => _windowBucket(i, max))
      });
    }

    return indices;
  }


  // ========================================================================
  // MODE 4 — EDGE LOOP (OUTLINE-EMPHASIS)
// ========================================================================
  function nextIndexEdge(bits, max, spinPhase = 0, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) throw new Error("[BinaryLoopScanner‑v30] non-binary bits");
    if (!Number.isFinite(max) || max <= 0) throw new Error("[BinaryLoopScanner‑v30] invalid max");

    const base = bitsToNumber(bits);
    const raw = base % max;

    const edgePull = clamp((presence * 0.5 + harmonicBias * 0.5), 0, 1);
    const towardHead = (base & 1) === 0;

    const edgeOffset = Math.floor(edgePull * (max * 0.25));
    const edgeBase = towardHead ? (raw - edgeOffset) : (raw + edgeOffset);

    const spin = ((edgeBase + (spinPhase | 0)) % max + max) % max;
    const offset = overlayOffset(max, presence * 0.8, harmonicBias * 0.8);

    const index = ((spin + offset) % max + max) % max;

    _updateArtery({ mode: "edge", bitsLength: bits.length, index });

    if (trace) {
      console.log("[BinaryLoopScanner‑v30] EDGE", {
        base, raw, edgePull, towardHead, edgeOffset, edgeBase,
        spin, offset, index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }


  // ========================================================================
  // MODE 5 — FLAT LOOP (LOW-VARIANCE, CENTER-BIASED)
// ========================================================================
  function nextIndexFlat(bits, max, presence = 0, harmonicBias = 0) {
    if (!isPureBinary(bits)) throw new Error("[BinaryLoopScanner‑v30] non-binary bits");
    if (!Number.isFinite(max) || max <= 0) throw new Error("[BinaryLoopScanner‑v30] invalid max");

    const base = bitsToNumber(bits);
    const raw = base % max;

    const center = Math.floor(max / 2);
    const spread = Math.max(1, Math.floor(max * 0.15));

    const calmFactor = 1 - clamp((presence * 0.4 + harmonicBias * 0.6), 0, 1);
    const localOffset = Math.floor(((raw / max) - 0.5) * spread * calmFactor * 2);

    const index = ((center + localOffset) % max + max) % max;

    _updateArtery({ mode: "flat", bitsLength: bits.length, index });

    if (trace) {
      console.log("[BinaryLoopScanner‑v30] FLAT", {
        base, raw, center, spread, calmFactor, localOffset, index,
        windowBucket: _windowBucket(index, max)
      });
    }

    return index;
  }


  // ========================================================================
  // ADVANTAGE VIEW — ALL MODES + SYMBOLIC HINTS
  // ========================================================================
  function nextAdvantageView({
    bits,
    max,
    spinPhase = 0,
    presence = 0,
    harmonicBias = 0
  }) {
    if (!isPureBinary(bits)) throw new Error("[BinaryLoopScanner‑v30] non-binary bits");
    if (!Number.isFinite(max) || max <= 0) throw new Error("[BinaryLoopScanner‑v30] invalid max");

    const standard = nextIndex(bits, max, spinPhase, presence, harmonicBias);
    const deep = nextIndexDeep(bits, max, spinPhase, presence, harmonicBias);
    const multi = nextIndexMulti(bits, max, presence, harmonicBias);
    const edge = nextIndexEdge(bits, max, spinPhase, presence, harmonicBias);
    const flat = nextIndexFlat(bits, max, presence, harmonicBias);

    const coverageSpan = (() => {
      const all = [standard, deep, edge, flat, ...multi];
      const min = Math.min(...all);
      const maxIdx = Math.max(...all);
      return max > 0 ? (maxIdx - min) / max : 0;
    })();

    const edgeFocus = (() => {
      const nearHead = edge < max * 0.15;
      const nearTail = edge > max * 0.85;
      return nearHead || nearTail ? 1 : 0;
    })();

    const calmness = (() => {
      const center = Math.floor(max / 2);
      const dist = Math.abs(flat - center) / (max || 1);
      return clamp(1 - dist * 2, 0, 1);
    })();

    const multiSpread = (() => {
      if (!multi || multi.length === 0) return 0;
      const min = Math.min(...multi);
      const maxIdx = Math.max(...multi);
      return max > 0 ? (maxIdx - min) / max : 0;
    })();

    const overlayInfluence = clamp(presence * 0.6 + harmonicBias * 0.4, 0, 1);

    return Object.freeze({
      meta: BinaryLoopScannerMeta,
      modes: { standard, deep, multi, edge, flat },
      windows: {
        standard: _windowBucket(standard, max),
        deep: _windowBucket(deep, max),
        edge: _windowBucket(edge, max),
        flat: _windowBucket(flat, max),
        multi: multi.map(i => _windowBucket(i, max))
      },
      hints: {
        coverageSpan,
        edgeFocus,
        calmness,
        multiSpread,
        overlayInfluence
      },
      artery: artery.snapshot()
    });
  }


  // ========================================================================
  // EXPORT
  // ========================================================================
  return {
    meta: BinaryLoopScannerMeta,

    nextIndex,
    nextIndexDeep,
    nextIndexMulti,
    nextIndexEdge,
    nextIndexFlat,

    nextAdvantageView,

    snapshotArtery: () => artery.snapshot()
  };
}


// ============================================================================
// UTIL
// ============================================================================
function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

// ============================================================================
// ORGAN EXPORT (IMMORTAL)
// ============================================================================

export const PulseBinaryLoopScanner = Object.freeze({
  Meta: BinaryLoopScannerMeta,

  // canonical organ factory
  create(config = {}) {
    return createBinaryLoopScanner(config);
  },

  // STATIC SCAN FUNCTION (IMMORTAL)
  scan(bits, max, context = {}) {
    const instance = createBinaryLoopScanner({});
    const {
      spinPhase = 0,
      presence = 0,
      harmonicBias = 0
    } = context;

    return instance.nextIndex(bits, max, spinPhase, presence, harmonicBias);
  },

  // artery snapshot (standard for PulseOS organs)
  snapshotArtery() {
    const temp = createBinaryLoopScanner({});
    return temp.snapshotArtery();
  }
});

PulseRealm.ToolsLoopScanner = {
  PulseBinaryLoopScanner,
  createBinaryLoopScanner,
  prewarmBinaryLoopScanner,
  BinaryLoopScannerMeta
}