// ============================================================================
// FILE: /PulseOS/Organs/Barriers/PulseOSTissueMembrane-v30-IMMORTAL++++.js
// PULSE OS — v30.0-IMMORTAL++++
// “THE TISSUE MEMBRANE / MID‑LAYER EPITHELIAL REFLEX”
// A2 REFLEX LAYER • MID‑LAYER SENTINEL • ZERO TIMING • ZERO STATE
// DUALBAND-AWARE • PRESENCE-AWARE • ADVANTAGE-AWARE • ARTERY-AWARE
// PURE METADATA • ZERO NETWORK • ZERO I/O • ZERO RANDOMNESS
// ============================================================================
// ============================================================================
// ERROR INTERCEPTOR (A2 Reflex → A3 Reflex) — v30 IMMORTAL++++
// ============================================================================
import { route, Router } from "./PulseOSCNSNervousSystem-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// LAYER META — v30 IMMORTAL++++
// ============================================================================
export const TissueMembraneMeta = Object.freeze({
  id: "PulseOSTissueMembrane",
  layer: "A2",
  role: "MID_LAYER_REFLEX",
  version: "30.0-IMMORTAL++++",
  epoch: "v30-IMMORTAL++++",
  evo: Object.freeze({
    reflexOrgan: true,
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroTimers: true,
    zeroRandomness: true,
    zeroIOLayer: true,
    zeroMutation: true,

    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    presenceAware: true,
    advantageAware: true,
    arteryAware: true,

    spinalAligned: true,
    membraneAligned: true,
    instinctsAligned: true,
    presenceAligned: true,

    routeMemoryAware: true,
    degradationAware: true,
    healingAware: true
  })
});

// ============================================================================
// ROUTE BANDS (v30)
// ============================================================================
const ROUTE_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary",
  PRESENCE: "presence"
};

function normalizeBand(b) {
  const v = (b || "").toLowerCase();
  if (v === "binary") return ROUTE_BANDS.BINARY;
  if (v === "presence") return ROUTE_BANDS.PRESENCE;
  return ROUTE_BANDS.SYMBOLIC;
}

// ============================================================================
// TISSUE ARTERY v30 — IMMORTAL++++
// ============================================================================
const _ARTERY = {
  totalErrors: 0,
  totalHeals: 0,
  totalHealFailures: 0,
  totalDegraded: 0,
  lastErrorMessage: null,
  lastErrorBand: null
};

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

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

function presenceDensity() {
  const v = PulseRealm.PULSE_PRESENCE_DENSITY;
  return clamp01(typeof v === "number" ? v : 0);
}

function advantageScore() {
  const v = PulseRealm.PULSE_ADVANTAGE_SCORE;
  return clamp01(typeof v === "number" ? v : 0);
}

function computeTissueArtery() {
  const total = _ARTERY.totalErrors;
  const heals = _ARTERY.totalHeals;
  const fails = _ARTERY.totalHealFailures;
  const degraded = _ARTERY.totalDegraded;

  const errorDensity = total > 0 ? clamp01(total / 256) : 0;
  const healRatio = total > 0 ? clamp01(heals / total) : 0;
  const failRatio = total > 0 ? clamp01(fails / total) : 0;
  const degradeDensity = total > 0 ? clamp01(degraded / total) : 0;

  const presence = presenceDensity();
  const adv = advantageScore();

  const pressure = clamp01(
    errorDensity * 0.40 +
    failRatio * 0.20 +
    degradeDensity * 0.20 +
    presence * 0.10 +
    adv * 0.10
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  return Object.freeze({
    totalErrors: _ARTERY.totalErrors,
    totalHeals: _ARTERY.totalHeals,
    totalHealFailures: _ARTERY.totalHealFailures,
    totalDegraded: _ARTERY.totalDegraded,
    lastErrorMessage: _ARTERY.lastErrorMessage,
    lastErrorBand: _ARTERY.lastErrorBand,

    presenceDensity: presence,
    advantageScore: adv,

    errorDensity,
    healRatio,
    failRatio,
    degradeDensity,

    pressure,
    pressureBucket: bucketPressure(pressure),

    throughput,
    throughputBucket: bucketLevel(throughput),

    cost,
    costBucket: bucketCost(cost),

    budget,
    budgetBucket: bucketLevel(budget)
  });
}

export function getTissueArterySnapshot() {
  return computeTissueArtery();
}

// ============================================================================
// ROUTE MEMORY v30 — deterministic, DNA-tagged, presence-aware
// ============================================================================
let seq = 0;

const TissueRouteMemory = {
  store: {},

  makeKey(message, frames, band) {
    const top = frames[0] || "NO_FRAME";
    return `${message}::${top}::${band}`;
  },

  classifyTier(score) {
    if (score >= 0.95) return "microDegrade";
    if (score >= 0.80) return "softDegrade";
    if (score >= 0.55) return "midDegrade";
    if (score >= 0.25) return "hardDegrade";
    return "criticalDegrade";
  },

  remember(message, frames, trace, band, healthScore = 1.0, degraded = false) {
    const key = this.makeKey(message, frames, band);
    const tier = this.classifyTier(healthScore);

    this.store[key] = {
      seq: ++seq,
      message,
      frames,
      trace,
      band,
      degraded,
      healthScore,
      tier,
      dnaTag:
        band === ROUTE_BANDS.PRESENCE
          ? (degraded ? "A2_TISSUE_PRESENCE_DEGRADED" : "A2_TISSUE_PRESENCE")
          : (degraded ? "A2_TISSUE_DEGRADED" : "A2_TISSUE")
    };

    if (degraded) _ARTERY.totalDegraded += 1;
  },

  markDegraded(message, frames, band, score = 0.8) {
    const key = this.makeKey(message, frames, band);
    const entry = this.store[key];
    if (!entry) return;

    if (!entry.degraded) _ARTERY.totalDegraded += 1;

    entry.degraded = true;
    entry.healthScore = score;
    entry.tier = this.classifyTier(score);
    entry.dnaTag =
      band === ROUTE_BANDS.PRESENCE
        ? "A2_TISSUE_PRESENCE_DEGRADED"
        : "A2_TISSUE_DEGRADED";
  },

  recall(message, frames, band) {
    return this.store[this.makeKey(message, frames, band)] || null;
  },

  snapshot() {
    return Object.freeze({
      version: "30.0-IMMORTAL++++",
      entries: Object.values(this.store)
        .sort((a, b) => a.seq - b.seq)
        .map(e => ({
          key: `${e.message}::${e.frames[0]}::${e.band}`,
          seq: e.seq,
          degraded: e.degraded,
          healthScore: e.healthScore,
          tier: e.tier,
          band: e.band,
          dnaTag: e.dnaTag,
          framesCount: e.frames.length
        }))
    });
  }
};

export function getTissueRouteMemorySnapshot() {
  return TissueRouteMemory.snapshot();
}


let healing = false;

if (typeof window !== "undefined") {
  window.addEventListener(
    "error",
    async (event) => {
      if (healing) return;

      const msg = event.message || "";
      const stack = event.error?.stack || "";
      const band = normalizeBand(event.error?.__band || "");

      if (!stack.toLowerCase().includes("layer")) return;

      _ARTERY.totalErrors += 1;
      _ARTERY.lastErrorMessage = msg;
      _ARTERY.lastErrorBand = band;

      const frames = stack.split("\n").map(s => s.trim());
      const jsFrames = frames.filter(f => f.includes(".js"));

      let entry = TissueRouteMemory.recall(msg, jsFrames, band);

      if (!entry) {
        const trace = jsFrames.map((frame, index) => ({
          frame,
          file: frame.split("/").pop().split(":")[0],
          index,
          label: "A2_FRAME",
          layer: "A2",
          band
        }));

        TissueRouteMemory.remember(msg, jsFrames, trace, band);
        entry = TissueRouteMemory.recall(msg, jsFrames, band);
      }

      // classify degradation
      if (msg.includes("already been declared"))
        TissueRouteMemory.markDegraded(msg, jsFrames, band, 0.85);

      if (msg.includes("process is not defined"))
        TissueRouteMemory.markDegraded(msg, jsFrames, band, 0.7);

      if (msg.includes("Maximum call stack"))
        TissueRouteMemory.markDegraded(msg, jsFrames, band, 0.5);

      const degraded = entry.degraded;
      const healthScore = entry.healthScore;
      const tier = entry.tier;
      const dnaTag = entry.dnaTag;

      // ALWAYS forward to backend
      await route("logError", {
        message: msg,
        frames: jsFrames,
        routeTrace: entry.trace,
        degraded,
        healthScore,
        tier,
        dnaTag,
        reflexOrigin: "TissueMembrane",
        layer: "A2",
        __band: band
      });

      // healing
      const parsed = parseMissingField(msg);
      if (!parsed) {
        event.preventDefault();
        return;
      }

      healing = true;

      try {
        Router.receiveReflex({
          reflexOrigin: "TissueMembrane",
          layer: "A2",
          message: msg,
          routeTrace: entry.trace,
          degraded,
          healthScore,
          tier,
          dnaTag,
          ...parsed,
          __band: band
        });

        await route("fetchField", {
          ...parsed,
          message: msg,
          routeTrace: entry.trace,
          degraded,
          healthScore,
          tier,
          dnaTag,
          reflexOrigin: "TissueMembrane",
          layer: "A2",
          __band: band
        });

        _ARTERY.totalHeals += 1;
      } catch {
        _ARTERY.totalHealFailures += 1;
      }

      healing = false;
      event.preventDefault();
    },
    true
  );
}

// ============================================================================
// PARSER — deterministic, symbolic-only
// ============================================================================
function parseMissingField(message) {
  let m = message.match(/reading '([^']+)'/);
  if (m) return { table: "Users", field: m[1] };

  m = message.match(/([^ ]+) is not defined/);
  if (m) return { table: "Users", field: m[1] };

  m = message.match(/property '([^']+)'/);
  if (m) return { table: "Users", field: m[1] };

  return null;
}

// ============================================================================
// PREWARM — deterministic, pure metadata
// ============================================================================
export function prewarmTissueMembrane(routes = []) {
  for (const r of routes) {
    if (!r || !r.message || !Array.isArray(r.frames)) continue;

    const band = normalizeBand(r.band);
    const trace =
      Array.isArray(r.routeTrace)
        ? r.routeTrace
        : r.frames.map((frame, index) => ({
            frame,
            file: frame.split("/").pop().split(":")[0],
            index,
            label: "A2_FRAME",
            layer: "A2",
            band
          }));

    TissueRouteMemory.remember(
      r.message,
      r.frames,
      trace,
      band,
      r.healthScore ?? 1.0,
      !!r.degraded
    );
  }
}

// ============================================================================
// PUBLIC API
// ============================================================================
export const PulseOSTissueMembrane = {
  meta: TissueMembraneMeta,
  ROUTE_BANDS,
  getTissueArterySnapshot,
  getTissueRouteMemorySnapshot,
  prewarmTissueMembrane
};

export default PulseOSTissueMembrane;


PulseRealm.OSTissueMembrane = {
  PulseOSTissueMembrane,
  prewarmTissueMembrane,
  TissueRouteMemory,
  _ARTERY
}

PulseRealm.PulseOSTissueMembrane = PulseOSTissueMembrane;