// ============================================================================
//  PulseProxyContext-v30.js  (UPGRADED INTERNALLY TO v40)
//  BACKWARDS-COMPATIBLE EXPORT SURFACE
//  import { PulseProxyContext } from "./PulseProxyContext-v30.js";
//  → NOW RUNS FULL v40 CONTEXT + PNS NERVOUS SYSTEM
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
// IMPORT THE NEW PNS NERVOUS SYSTEM
// ---------------------------------------------------------------------------
import { PulseProxyPNSNervousSystemBinary } from "./PulseProxyPNSNervousSystem-v40.js";

// ---------------------------------------------------------------------------
// PURE HELPERS
// ---------------------------------------------------------------------------
const clamp01 = v => Math.max(0, Math.min(1, v));
const hash = s => {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
};

const safeNow = () => {
  try { return PulseRealm.PulseNOW; }
  catch { return 0; }
};

// ============================================================================
//  INTERNAL STATE — v40 CONTEXT SNAPSHOT
// ============================================================================
let _seq = 0;

let _state = Object.freeze({
  pressure: 0,
  boost: 0,
  fallback: false,
  mode: "normal",

  // NEW: lineage restored
  lineage: "PulseProxyContext-v40-IMMORTAL",

  advantageHint: { band: "neutral", score: 0.5, reason: "init" },
  healthHint: { status: "stable", score: 1.0 },
  surgeHint: { surgeMode: "none", shortPulseAdvantage: false, pullbackRecommended: false },

  lastBinaryField: null,
  lastPresenceEnvelope: null,
  lastCacheChunkEnvelope: null,

  pns: null,

  seq: 0,
  timestamp: safeNow(),
  lastUpdateReason: "init"
});

// ============================================================================
//  v40 DERIVATION FUNCTIONS (UPGRADED FROM v30)
// ============================================================================

function derivePressure(binaryField) {
  if (!binaryField) return 0;
  const density = binaryField.density ?? 0;
  const pattern = binaryField.patternLen ?? 0;
  return clamp01((density + pattern) / 4096);
}

function deriveBoost(cacheChunkEnvelope) {
  if (!cacheChunkEnvelope) return 0;
  const sig = cacheChunkEnvelope.cacheChunkSurfaceSignature || "";
  if (!sig.length) return 0;
  const last = sig.at(-1);
  if (last === "F" || last === "f") return 1.0;
  if (last === "E" || last === "e") return 0.75;
  if (last === "D" || last === "d") return 0.5;
  return 0;
}

function deriveFallback(presenceEnvelope) {
  if (!presenceEnvelope) return false;
  const sig = presenceEnvelope.presenceSignature || "";
  if (!sig.length) return false;
  const last = sig.at(-1);
  return ["0","2","4","6","8","a","A","c","C","e","E"].includes(last);
}

function deriveSurge(pressure, boost) {
  const p = clamp01(pressure);
  const b = clamp01(boost);

  if (p >= 0.9 && b >= 0.6)
    return { surgeMode: "surge-critical", shortPulseAdvantage: true, pullbackRecommended: true };

  if (p >= 0.75 && b >= 0.5)
    return { surgeMode: "surge-high", shortPulseAdvantage: true, pullbackRecommended: false };

  return { surgeMode: "none", shortPulseAdvantage: false, pullbackRecommended: false };
}

function deriveMode(pressure, boost, fallback, surge) {
  if (fallback) return "fallback";
  if (surge.surgeMode === "surge-critical") return "surge-critical";
  if (surge.surgeMode === "surge-high") return "surge-high";
  if (boost > 0.8 && pressure >= 0.4) return "boost";
  if (pressure >= 0.8) return "pressure-high";
  if (pressure <= 0.1) return "pressure-low";
  return "normal";
}

function deriveAdvantage({ pressure, boost, fallback, surge }) {
  const p = clamp01(pressure);
  const b = clamp01(boost);

  if (fallback)
    return { band: "stability", score: 0.15, reason: "fallback", modeBias: "conservative" };

  if (surge.surgeMode === "surge-critical")
    return { band: "throughput", score: 0.98, reason: "critical-surge", modeBias: "aggressive-short" };

  if (surge.surgeMode === "surge-high")
    return { band: "throughput", score: 0.93, reason: "high-surge", modeBias: "aggressive-short" };

  if (b > 0.8 && p >= 0.4 && p <= 0.85)
    return { band: "throughput", score: 0.9, reason: "boost-healthy", modeBias: "aggressive" };

  if (p >= 0.9)
    return { band: "throughput", score: 0.8, reason: "high-pressure", modeBias: "cautious-aggressive" };

  if (p <= 0.1)
    return { band: "latency", score: 0.65, reason: "low-pressure", modeBias: "opportunistic" };

  return { band: "neutral", score: 0.5, reason: "steady", modeBias: "balanced" };
}

function deriveHealth({ pressure, fallback, surge }) {
  const p = clamp01(pressure);

  if (fallback) return { status: "degraded", score: 0.45 };
  if (surge.surgeMode === "surge-critical") return { status: "overloaded", score: 0.6 };
  if (p >= 0.95) return { status: "overloaded", score: 0.65 };
  if (p >= 0.8) return { status: "strained", score: 0.75 };
  if (p <= 0.1) return { status: "idle", score: 0.9 };

  return { status: "stable", score: 1.0 };
}

// ============================================================================
//  UPDATE CONTEXT — v40 LOGIC
// ============================================================================
export function updateProxyStateFromEnvelope(envelope = {}, reason = "envelope") {
  const binaryField = envelope.binaryField || null;
  const presenceEnvelope = envelope.presenceEnvelope || null;
  const cacheChunkEnvelope = envelope.cacheChunkEnvelope || null;

  const pressure = derivePressure(binaryField);
  const boost = deriveBoost(cacheChunkEnvelope);
  const fallback = deriveFallback(presenceEnvelope);
  const surge = deriveSurge(pressure, boost);
  const mode = deriveMode(pressure, boost, fallback, surge);

  const advantageHint = deriveAdvantage({ pressure, boost, fallback, surge });
  const healthHint = deriveHealth({ pressure, fallback, surge });

  // NEW: integrate PNS Nervous System
  const pns = PulseProxyPNSNervousSystemBinary();

  _seq++;

  _state = Object.freeze({
    pressure,
    boost,
    fallback,
    mode,

    lineage: _state.lineage,   // preserve lineage

    advantageHint,
    healthHint,
    surgeHint: surge,

    lastBinaryField: binaryField,
    lastPresenceEnvelope: presenceEnvelope,
    lastCacheChunkEnvelope: cacheChunkEnvelope,

    pns,

    seq: _seq,
    timestamp: safeNow(),
    lastUpdateReason: reason
  });
}

// ============================================================================
//  READ API — SAME AS v30 (BACKWARDS COMPATIBLE)
// ============================================================================
export const getProxyContext = () => _state;
export const getProxyPressure = () => _state.pressure;
export const getProxyBoost = () => _state.boost;
export const getProxyFallback = () => _state.fallback;
export const getProxyMode = () => _state.mode;
export const getProxyAdvantageHint = () => _state.advantageHint;
export const getProxyHealthHint = () => _state.healthHint;
export const getProxySurgeHint = () => _state.surgeHint;
export const getProxySeq = () => _state.seq;

// NEW: expose PNS
export const getProxyPNS = () => _state.pns;

// NEW: expose lineage
export const getProxyLineage = () => _state.lineage;

// Snapshot clone
export function getProxySnapshot() {
  const s = _state;
  return {
    pressure: s.pressure,
    boost: s.boost,
    fallback: s.fallback,
    mode: s.mode,
    lineage: s.lineage,
    advantageHint: { ...s.advantageHint },
    healthHint: { ...s.healthHint },
    surgeHint: { ...s.surgeHint },
    pns: s.pns,
    seq: s.seq,
    timestamp: s.timestamp,
    lastUpdateReason: s.lastUpdateReason
  };
}

// NAMED EXPORT OBJECT (for import { PulseProxyContext } ...)
export const PulseProxyContext = {
  getProxyContext,
  getProxySnapshot,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyAdvantageHint,
  getProxyHealthHint,
  getProxySurgeHint,
  getProxySeq,
  getProxyPNS,
  getProxyLineage,
  updateProxyStateFromEnvelope
};

// GLOBAL ATTACHMENT
PulseRealm.PulseProxyContext = PulseProxyContext;
