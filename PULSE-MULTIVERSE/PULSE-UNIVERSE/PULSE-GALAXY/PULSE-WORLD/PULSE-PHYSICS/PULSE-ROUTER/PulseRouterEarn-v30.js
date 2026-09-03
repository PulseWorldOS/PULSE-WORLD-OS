// ============================================================================
// FILE: PulseEarnRouter-v30-IMMORTAL-UNIVERSE-ONEBAND.js
// [pulse:earn] ROUTING LAYER — v30 IMMORTAL UNIVERSE ONEBAND
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministic Earn routing spine (pattern/lineage/page/binary/universe aware).
//   • Evolves v24 IMMORTAL-INTEL++ into v30 IMMORTAL-UNIVERSE-ONEBAND.
//   • ONEBAND: GPU/Earn/BinaryRouter aligned, single band-signature surface.
//   • Uses PulseCoreMemory v30 for hot-pattern / hot-page / hot-binary tracking.
//   • Emits full INTEL routing envelope + healing + band/universe signatures.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v30-UNIVERSE):
//   • No randomness, no async, no network, no filesystem.
//   • No mutation of pulse input; only CoreMemory + internal healing state.
//   • Deterministic-field: identical input → identical routing decision.
//   • Zero eval, zero dynamic imports, zero user code.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { createPulseEarnSendSystem_v31, evolveEarnSend as evolveEarn } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";

import { createBinaryRouterUnifiedBand as createBinaryRouter } from "../PULSE-ROUTER/PulseRouterBinary-v30.js";

// PulseEarnRole is assumed to be defined in your Earn core
// import { PulseEarnRole } from "./PulseEarnCore-v30.js";


// ============================================================================
// CORE MEMORY + KEYS (v30)
// ============================================================================
const CoreMemory = new Proxy({}, { get: (t, p) => { try { return PulseCoreGMemory[p]; } catch(e) { return (PulseRealm?.PulseCoreMemory || {})[p]; } } });
const ROUTE = "earn-router-global-v30";

const KEY_LAST_DECISION       = "last-decision";
const KEY_LAST_PULSE_SURFACE  = "last-pulse-surface";
const KEY_HOT_PATTERNS        = "hot-patterns";
const KEY_HOT_PAGES           = "hot-pages";
const KEY_HOT_BINARY          = "hot-binary-patterns";
const KEY_HOT_GPU_MODES       = "hot-gpu-modes";
const KEY_HOT_BAND_SIGNATURES = "hot-band-signatures";

// ============================================================================
// HASH / DUALHASH HELPERS — v30 IMMORTAL UNIVERSE
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash   = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  const combined    = computeHash(`${intelHash}::${classicHash}`);
  return {
    intel:   intelHash,
    classic: classicHash,
    combined
  };
}

// ============================================================================
// UNIVERSE / BAND CONTEXT — ONEBAND v30
// ============================================================================
function normalizeUniverse(universe = {}) {
  return {
    universeId: universe.universeId || "u:default",
    timelineId: universe.timelineId || "t:main",
    branchId:   universe.branchId   || "b:root",
    band:       universe.band       || "ONEBAND",
    regionId:   universe.regionId   || null,
    spinUsers:  typeof universe.spinUsers === "number" ? universe.spinUsers : null
  };
}

function buildBandSignature(universe, gpuMode, binarySurface) {
  const u = normalizeUniverse(universe || {});
  const shape = {
    universeId: u.universeId,
    timelineId: u.timelineId,
    branchId:   u.branchId,
    band:       u.band,
    regionId:   u.regionId,
    spinUsers:  u.spinUsers,
    gpuMode:    gpuMode || "cpu",
    hasBinary:  !!binarySurface.hasBinary,
    binaryPattern:  binarySurface.binaryPattern || null,
    binaryMode:     binarySurface.binaryMode || null,
    binaryStrength: binarySurface.binaryStrength ?? null
  };
  const raw = JSON.stringify(shape);
  return buildDualHashSignature("EARN_ONEBAND_SIGNATURE_v30", shape, raw);
}

// ============================================================================
// HEALING METADATA — Earn Routing Health Log (v30 IMMORTAL UNIVERSE)
// ============================================================================
const earnRoutingHealing = {
  cycleCount: 0,

  lastPattern: null,
  lastTier: null,
  lastTargetPath: null,

  lastPageId: null,
  lastPatternAncestry: null,
  lastLineageSignature: null,
  lastPageAncestrySignature: null,

  lastBinarySurface: null,
  lastUniverse: null,
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastIntelSignatureIntel: null,
  lastIntelSignatureClassic: null
};

export function getPulseEarnRoutingHealingState_v30() {
  return { ...earnRoutingHealing };
}

// ============================================================================
// HOT TRACKING HELPERS (v30)
// ============================================================================
function trackPattern(pattern) {
  if (!pattern) return;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_PATTERNS) || {};
  hot[pattern] = (hot[pattern] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_PATTERNS, hot);
}

function trackPage(pageId) {
  if (!pageId) return;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_PAGES) || {};
  hot[pageId] = (hot[pageId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_PAGES, hot);
}

function trackBinary(binary) {
  if (!binary || !binary.hasBinary) return;
  const key = binary.binaryPattern || binary.binaryMode || "generic-binary";
  const hot = CoreMemory.get(ROUTE, KEY_HOT_BINARY) || {};
  hot[key] = (hot[key] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_BINARY, hot);
}

function trackGpuMode(gpuMode) {
  const mode = gpuMode || "cpu";
  const hot = CoreMemory.get(ROUTE, KEY_HOT_GPU_MODES) || {};
  hot[mode] = (hot[mode] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_GPU_MODES, hot);
}

function trackBandSignature(bandSig) {
  if (!bandSig || !bandSig.combined) return;
  const key = bandSig.combined;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_BAND_SIGNATURES) || {};
  hot[key] = (hot[key] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_BAND_SIGNATURES, hot);
}

function storeDecision(decision, pulseSurface) {
  CoreMemory.set(ROUTE, KEY_LAST_DECISION, decision);
  CoreMemory.set(ROUTE, KEY_LAST_PULSE_SURFACE, pulseSurface);
  trackPattern(pulseSurface.pattern);
  trackPage(pulseSurface.pageId);
  trackBinary(pulseSurface.binary);
  trackGpuMode(pulseSurface.gpuMode);
  trackBandSignature(pulseSurface.bandSignature.dualHash || null);
}

// ============================================================================
// ANCESTRY HELPERS
// ============================================================================
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId }) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId  = pageId || "NO_PAGE";

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId
  };

  const raw = JSON.stringify(shape);
  return computeHash(raw);
}

// ============================================================================
// BINARY SURFACE EXTRACTION (v30 ONEBAND)
// ============================================================================
function extractBinarySurface(payload = {}) {
  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const gpuMode = payload.gpuMode || payload.computeMode || "cpu";

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    gpuMode
  };
}

// ============================================================================
// DEGRADATION TIER
// ============================================================================
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// ============================================================================
// PATH SELECTION — deterministic Earn path (v30 ONEBAND)
//   • Still deterministic, but band/universe/binary-aware.
// ============================================================================


function chooseEarnPath(pulse, universe, binary) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const health  = pulse.healthScore ?? 1;

  // Binary hints override
  if (binary.hasBinary && binary.binaryHints.organHint) {
    return binary.binaryHints.organHint;
  }

  // GPU hint override
  if (binary.gpuMode === "gpu" || binary.gpuMode === "tensor") {
    return "earn-gpu-core";
  }

  const u = normalizeUniverse(universe || {});
  const raw =
    `${pattern}::${health}` +
    `::${u.universeId}` +
    `::${u.timelineId}` +
    `::${u.branchId}` +
    `::${u.band}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 7)) % 12289;
  }

  const paths = [
    "earn-core",
    "earn-cache",
    "earn-os-fallback",
    "earn-gpu-core"
  ];
  return paths[acc % paths.length];
}

// ============================================================================
// INTEL SURFACE — v30 dualhash Earn routing INTEL + ONEBAND
// ============================================================================
function buildEarnIntel_v30(pulse, decisionShape, universe, bandSignature) {
  const healthScore =
    typeof pulse.healthScore === "number" ? pulse.healthScore : 1.0;

  const tier = classifyDegradationTier(healthScore);

  const advantageField = pulse.advantageField || null;
  const pulseCompute   = pulse.pulseCompute || null;

  const solvednessScore =
    pulseCompute && typeof pulseCompute.solvednessScore === "number"
      ? pulseCompute.solvednessScore
      : null;

  const computeTier =
    pulseCompute && typeof pulseCompute.computeTier === "string"
      ? pulseCompute.computeTier
      : null;

  const factoringSignal =
    pulseCompute && typeof pulseCompute.factoringSignal === "string"
      ? pulseCompute.factoringSignal
      : null;

  const intelPayload = {
    kind: "earnRoutingDecision_v30",
    version: "v30-IMMORTAL-UNIVERSE-ONEBAND",
    decisionShape,
    healthScore,
    tier,
    advantageField,
    pulseCompute,
    solvednessScore,
    computeTier,
    factoringSignal,
    universe: normalizeUniverse(universe || {}),
    bandSignature: bandSignature || null
  };

  const classicString =
    `EARN_ROUTE_v30::PATH:${decisionShape.targetPath}` +
    `::TIER:${tier}` +
    `::PAT:${decisionShape.pattern}` +
    `::PAGE:${decisionShape.pageId}`;

  const dualSig = buildDualHashSignature(
    "PULSE_EARN_ROUTING_v30",
    intelPayload,
    classicString
  );

  earnRoutingHealing.lastIntelSignatureIntel   = dualSig.intel;
  earnRoutingHealing.lastIntelSignatureClassic = dualSig.classic;

  return {
    healthScore,
    tier,
    advantageField,
    pulseCompute,
    solvednessScore,
    computeTier,
    factoringSignal,
    universe: normalizeUniverse(universe || {}),
    bandSignature,
    dualHash: dualSig
  };
}

// ============================================================================
// DECISION BUILDER — full v30 Earn routing surface (ONEBAND)
// ============================================================================
function buildEarnDecision_v30(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const lineage = Array.isArray(pulse.lineage) ? pulse.lineage.slice() : [];
  const pageId  = pulse.pageId || "NO_PAGE";

  const universe = pulse.universe || pulse.cosmos || {};

  const patternAncestry =
    pulse.patternAncestry.length
      ? pulse.patternAncestry.slice()
      : buildPatternAncestry(pattern);

  const lineageSignature =
    typeof pulse.lineageSignature === "string"
      ? pulse.lineageSignature
      : buildLineageSignature(lineage);

  const pageAncestrySignature =
    typeof pulse.pageAncestrySignature === "string"
      ? pulse.pageAncestrySignature
      : buildPageAncestrySignature({ pattern, lineage, pageId });

  const binary = extractBinarySurface(pulse.payload || {});
  const tier   = classifyDegradationTier(pulse.healthScore ?? 1);

  const bandSignature = buildBandSignature(universe, binary.gpuMode, binary);

  const targetPath = chooseEarnPath(pulse, universe, binary);

  const decisionShape = {
    targetPath,
    tier,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    binary,
    gpuMode: binary.gpuMode,
    universe: normalizeUniverse(universe || {}),
    bandSignature
  };

  const earnIntel = buildEarnIntel_v30(pulse, decisionShape, universe, bandSignature);

  earnRoutingHealing.cycleCount++;
  earnRoutingHealing.lastPattern               = pattern;
  earnRoutingHealing.lastTier                  = tier;
  earnRoutingHealing.lastTargetPath            = targetPath;
  earnRoutingHealing.lastPageId                = pageId;
  earnRoutingHealing.lastPatternAncestry       = patternAncestry;
  earnRoutingHealing.lastLineageSignature      = lineageSignature;
  earnRoutingHealing.lastPageAncestrySignature = pageAncestrySignature;
  earnRoutingHealing.lastBinarySurface         = binary;
  earnRoutingHealing.lastUniverse              = normalizeUniverse(universe || {});
  earnRoutingHealing.lastBandSignatureIntel    = bandSignature.intel;
  earnRoutingHealing.lastBandSignatureClassic  = bandSignature.classic;

  return {
    decision: {
      targetPath,
      tier,

      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,

      binary,
      gpuMode: binary.gpuMode,

      universe: normalizeUniverse(universe || {}),
      bandSignature,

      loopTheory: evolveEarn.evolved.loopTheory,

      earnIntel
    },
    surface: {
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      binary,
      gpuMode: binary.gpuMode,
      universe: normalizeUniverse(universe || {}),
      bandSignature,
      earnIntel
    }
  };
}

// ============================================================================
// OPTIONAL: BINARY ROUTER COUPLING (ONEBAND)
//   • Allows Earn to emit a binary route envelope for GPU/mesh alignment.
// ============================================================================


function buildBinaryRouteEnvelopeFromEarnDecision(decisionSurface, binaryRouter) {
  if (!binaryRouter) return null;

  const bits = decisionSurface.binary.binaryPayload;
  if (!Array.isArray(bits)) return null;

  const result = binaryRouter.route(bits);
  return result && result.envelope ? result.envelope : null;
}

// ============================================================================
// PUBLIC API — PulseEarnRouter v30 IMMORTAL UNIVERSE ONEBAND
// ============================================================================
// ============================================================================
// PUBLIC API — PulseEarnRouter v30 IMMORTAL UNIVERSE ONEBAND
// ============================================================================
export function createPulseEarnRouter_v30({
  binaryRouter = null,

  // NEW: Earn system dependencies
  createEarn = null,
  evolveEarn = null,
  Mesh = null,
  SDN = null,
  MemoryCore = null,
  BinaryOverlay = null,
  BinaryShadow = null,
  Brain = null,
  Evolution = null
} = {}) {

  // -------------------------------------------------------------------------
  // NEW: Unified Earn surface (create + evolve)
  // -------------------------------------------------------------------------
  const Earn = {
    create: typeof createEarn === "function" ? createEarn : null,
    evolve: typeof evolveEarn === "function" ? evolveEarn : null,
    use: (...args) => {
      if (Earn.evolve) return Earn.evolve(...args);
      if (Earn.create) return Earn.create(...args);
      return null;
    }
  };

  // -------------------------------------------------------------------------
  // NEW: Create the Earn Send System (v31)
  // -------------------------------------------------------------------------
  const sendsystem = createPulseEarnSendSystem_v31({
    Earn,
    Mesh,
    SDN,
    MemoryCore,
    BinaryOverlay,
    BinaryShadow,
    Brain,
    Evolution
  });

  // -------------------------------------------------------------------------
  // Router (binary-first)
  // -------------------------------------------------------------------------
  const router = binaryRouter || createBinaryRouter({
    handlers: [],
    fallbackProxy: null,
    fallbackMesh: null,
    fallbackNode: null,
    trace: false,
    cosmosContext: { universeId: "u:earn", timelineId: "t:earn", branchId: "b:earn" },
    bandContext: "ONEBAND",
    sessionId: null
  });

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    role: {
      version: "v30-IMMORTAL-UNIVERSE-ONEBAND",
      identity: "PulseEarnRouter-v30-IMMORTAL-UNIVERSE-ONEBAND",
      layer: "routing",
      band: "ONEBAND",
      organ: "earn-router"
    },

    // -----------------------------------------------------------------------
    // Earn Routing
    // -----------------------------------------------------------------------
    routeEarn(pulse) {
      CoreMemory.prewarm();

      const { decision, surface } = buildEarnDecision_v30(pulse);
      const binaryEnvelope = buildBinaryRouteEnvelopeFromEarnDecision(surface, router);

      const enrichedDecision = {
        ...decision,
        binaryRouteEnvelope: binaryEnvelope
      };

      storeDecision(enrichedDecision, {
        ...surface,
        bandSignature: surface.bandSignature
      });

      return enrichedDecision;
    },

    // -----------------------------------------------------------------------
    // Earn Routing State
    // -----------------------------------------------------------------------
    getEarnRoutingState() {
      CoreMemory.prewarm();

      return {
        lastDecision: CoreMemory.get(ROUTE, KEY_LAST_DECISION),
        lastPulseSurface: CoreMemory.get(ROUTE, KEY_LAST_PULSE_SURFACE),
        hotPatterns: CoreMemory.get(ROUTE, KEY_HOT_PATTERNS),
        hotPages: CoreMemory.get(ROUTE, KEY_HOT_PAGES),
        hotBinaryPatterns: CoreMemory.get(ROUTE, KEY_HOT_BINARY),
        hotGpuModes: CoreMemory.get(ROUTE, KEY_HOT_GPU_MODES),
        hotBandSignatures: CoreMemory.get(ROUTE, KEY_HOT_BAND_SIGNATURES),
        healing: getPulseEarnRoutingHealingState_v30()
      };
    },

    // -----------------------------------------------------------------------
    // Expose internals
    // -----------------------------------------------------------------------
    CoreMemory,
    binaryRouter: router,
    sendsystem,   // NEW: expose the Earn Send System
    Earn          // NEW: expose unified Earn surface
  };
}


// Singleton-style export if you want a global organ instance
const _pulseEarnRouterSingleton_v30 = createPulseEarnRouter_v30();

export const PulseEarnRouter_v30 = _pulseEarnRouterSingleton_v30;
export default createPulseEarnRouter_v30;

PulseRealm.RouterEarn = {
  createPulseEarnRouter_v30,
  _pulseEarnRouterSingleton_v30,
  PulseEarnRouter_v30
}