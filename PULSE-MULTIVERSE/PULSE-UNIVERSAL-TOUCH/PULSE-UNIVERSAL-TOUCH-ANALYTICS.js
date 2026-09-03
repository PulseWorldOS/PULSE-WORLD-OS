// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-UNIVERSAL-TOUCH-ANALYTICS-v32-IMMORTAL-ONE-BAND.js
//  ORGAN: PulseTouchAnalyticsV32
//  ROLE: Metrics / Advantage Hints / Pulse Analysis / Module + Binary Health
//        + Warmup Module Risk Integration (Predictor + Binary Delta Aware)
//        + One-Band “touch” Canonical Band
//        + v32 WorldRuntime Awareness (ProtocolPort v2 + Power v32)
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// Optional world/membrane awareness
let PulseProtocolPort = null;
try {
  PulseProtocolPort =
    (PulseRealm.PulseProtocolPort) || null;
} catch {}

// ============================================================================
//  EXPERIENCE META — v32 ONE-BAND / BINARY-FIRST / WORLD-AWARE
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchAnalytics_V32 = {
  id: "pulsetouch.analytics.v32",
  kind: "outer_sense",
  version: "v32-IMMORTAL-ONE-BAND-BINARY",
  role: "pulse_analytics",
  band: "touch",
  surfaces: {
    band: [
      "analytics",
      "metrics",
      "advantage",
      "signal",
      "presence",
      "genome",
      "module",
      "binary",
      "risk",
      "one_band",
      "routing",
      "continuity",
      "world_runtime",
      "continuance",
      "binary_field"
    ],
    wave: ["cold", "numerical", "deterministic"],
    presence: ["analytics_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulseTouchAnalytics_V32 = {
  id: "organ.pulsetouch.analytics.v32",
  organism: "PulseTouch",
  layer: "outer_sense.analytics.v32",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    advantageAware: true,
    regionAware: true,
    presenceAware: true,
    modeAware: true,
    signalAware: true,
    genomeAware: true,
    warmupAware: true,
    chunkAware: true,
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,
    moduleRiskAware: true,
    binaryAware: true,
    binaryDeltaAware: true,
    oneBandAware: true,
    bandFieldUnified: true,
    routingAware: true,
    continuityAware: true,

    // NEW v32
    worldRuntimeAware: true,
    continuanceAware: true,
    binaryFieldAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchAnalytics_V32 = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    security: "Optional security evaluation result",
    warmup: "Optional warmup state",
    portal: "Optional Portal warmup state",
    chunks: "Optional PulseChunks state",
    predictor: "Optional Predictor output",
    binary: "Optional PulseBinary state",
    worldState: "Optional: ProtocolPort v2 world state (runtimeState + binaryField)"
  },
  outputs: {
    metrics: "Aggregated metrics (module + binary + routing + world aware)",
    advantageHints: "Hints for Advantage Cortex / Gate / Warmup / Predictor",
    band: "Canonical band label ('touch')",

    // NEW v32
    worldRuntimeHints: "Optional: tick/logicalClock/bandUsage",
    worldContinuanceHints: "Optional: navState/cacheHits/cacheMisses",
    worldBinaryHints: "Optional: pageId/route/lanes from binaryField"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchAnalytics_V32 = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// HELPERS — v30/v31 preserved, v32 extended
// ============================================================================

function normalizePageId(raw) {
  if (!raw) return "index";
  const h = raw.indexOf("#");
  if (h !== -1) raw = raw.slice(0, h);
  const q = raw.indexOf("?");
  if (q !== -1) raw = raw.slice(0, q);
  if (raw.endsWith("/")) raw = raw.slice(0, -1);
  return raw || "index";
}

function getSignalHintsV32() {
  try {
    if (PulseRealm.PulseSignals) {
      return PulseRealm.PulseSignals.snapshot() || {};
    };
  } catch {
    return {};
  }
}

function getGenomeHintsV32() {
  try {
    if (PulseRealm.PulseGenome.snapshot) return PulseRealm.PulseGenome.snapshot();
  } catch {}
  return {};
}

function getDeviceMetricsV32() {
  try {
    return {
      memory: navigator.deviceMemory || null,
      cores: navigator.hardwareConcurrency || null,
      perfNow: performance.now(),
      perfTiming: performance.timeOrigin || null
    };
  } catch {
    return {};
  }
}

function getAnimationTierV32() {
  try {
    return PulseRealm.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "reduced"
      : "smooth";
  } catch {
    return "smooth";
  }
}

function getHydrationTierV32() {
  try {
    return navigator.connection.saveData ? "minimal" : "full";
  } catch {
    return "safe";
  }
}

function getBinaryMetricsV32(binary, predictor) {
  const p = predictor.binaryPrediction || {};
  const b = binary || {};
  const riskBand = b.riskBand || p.riskBand || "low";

  return {
    lane: b.lane || p.lane || "default",
    mode: b.mode || p.mode || "normal",
    sizeHint: b.sizeHint ?? p.sizeHint ?? null,
    churnHint: b.churnHint ?? p.churnHint ?? null,
    hasDelta: b.hasDelta ?? p.hasDelta ?? null,
    deltaAddedBits: b.deltaAddedBits ?? p.deltaAddedBits ?? 0,
    deltaRemovedBits: b.deltaRemovedBits ?? p.deltaRemovedBits ?? 0,
    riskBand
  };
}

function getModuleMetricsV32(pulseTouch, warmup, predictor) {
  const fromPredictor = predictor.modulePrediction || null;
  const fromWarmup = warmup.advantageWarmup.moduleWarmupRisk || null;
  const fromSkin = pulseTouch.pulseModuleRisk || null;

  const base = fromPredictor || fromWarmup || fromSkin || null;

  if (!base) {
    return {
      stabilityScore: 1.0,
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      source: "none"
    };
  }

  const stabilityScore =
    typeof base.stabilityScore === "number"
      ? Math.max(0, Math.min(1, base.stabilityScore))
      : typeof base.score === "number"
      ? Math.max(0, Math.min(1, base.score / 30))
      : 1.0;

  return {
    stabilityScore,
    hasMissingSubimports: !!base.hasMissingSubimports,
    hasWrongTierExports: !!base.hasWrongTierExports,
    hasGlobalExposureRisk: !!base.hasGlobalExposureRisk,
    hasChunkProfileAnomaly: !!base.hasChunkProfileAnomaly,
    source:
      base.source ||
      (fromPredictor ? "predictor" : fromWarmup ? "warmup" : "skinState")
  };
}

// ============================================================================
//  WORLD‑AWARE HINT EXTRACTION (v32)
// ============================================================================

function extractWorldHintsV32(worldState) {
  if (!worldState || typeof worldState !== "object") {
    return {
      worldRuntimeHints: null,
      worldContinuanceHints: null,
      worldBinaryHints: null
    };
  }

  const runtimeState = worldState.runtimeState || null;
  const binaryField = worldState.binaryField || null;

  const worldRuntimeHints = runtimeState
    ? {
        tick: runtimeState.tick ?? null,
        logicalClock: runtimeState.logicalClock ?? null,
        bandUsage: runtimeState.bandUsage ?? null
      }
    : null;

  const worldContinuanceHints = runtimeState
    ? {
        navState:
          runtimeState.planSummary.navState ??
          runtimeState.execResults.navState ??
          null,
        cacheHits: runtimeState.cacheHits ?? null,
        cacheMisses: runtimeState.cacheMisses ?? null
      }
    : null;

  const worldBinaryHints = binaryField
    ? {
        pageId: binaryField.pageId ?? null,
        route: binaryField.route ?? null,
        lanes: binaryField.lanes ?? null
      }
    : null;

  return {
    worldRuntimeHints,
    worldContinuanceHints,
    worldBinaryHints
  };
}

// ============================================================================
//  MAIN ORGAN — v32
// ============================================================================

export function PulseTouchAnalyticsV32() {
  const BAND = "touch";

  function analyze(
    pulseTouch,
    security = null,
    warmup = null,
    portal = null,
    chunks = null,
    predictor = null,
    binary = null,
    worldState = null
  ) {
    // v31/v32 PAGE IDENTITY
    const rawPage = pulseTouch.page || "index";
    const normalizedPage = normalizePageId(rawPage);

    // BASE METRICS
    const moduleMetrics = getModuleMetricsV32(pulseTouch, warmup, predictor);
    const binaryMetrics = getBinaryMetricsV32(binary, predictor);

    const metrics = {
      band: BAND,

      page: normalizedPage,
      pageRaw: rawPage,
      pageHash: rawPage.includes("#")
        ? rawPage.slice(rawPage.indexOf("#") + 1)
        : null,

      region: pulseTouch.region || "unknown",
      presence: pulseTouch.presence || "unknown",
      mode: pulseTouch.mode || "safe",
      pulseStream: pulseTouch.pulseStream || "single",
      fastLane: pulseTouch.fastLane || "disabled",

      warmed: warmup.warmed ?? null,
      portalWarm: portal.warmed ?? null,
      chunkDegraded: chunks.isDegraded() ?? null,

      riskScore: security.riskScore ?? null,
      trustLevel: security.trustLevel ?? null,

      device: getDeviceMetricsV32(),
      animationTier: getAnimationTierV32(),
      hydrationTier: getHydrationTierV32(),

      signals: getSignalHintsV32(),
      genome: getGenomeHintsV32(),

      module: moduleMetrics,
      binary: binaryMetrics
    };

    // ADVANTAGE HINTS (same semantics as v31, preserved)
    const advantageHints = {
      hydrationBias:
        metrics.trustLevel === "hostile"
          ? "minimal"
          : metrics.trustLevel === "suspicious"
          ? "safe"
          : metrics.hydrationTier === "minimal"
          ? "minimal"
          : "full",

      animationBias:
        metrics.trustLevel === "hostile"
          ? "none"
          : metrics.trustLevel === "suspicious"
          ? "reduced"
          : metrics.animationTier === "reduced"
          ? "reduced"
          : "smooth",

      chunkBias:
        metrics.mode === "fast"
          ? "aggressive"
          : metrics.fastLane === "enabled"
          ? "aggressive"
          : metrics.chunkDegraded
          ? "safe"
          : "safe",

      presenceIntensity:
        metrics.presence === "high"
          ? "boost"
          : metrics.presence === "low"
          ? "conserve"
          : "neutral",

      regionCluster:
        metrics.region === "us"
          ? "clusterA"
          : metrics.region === "eu"
          ? "clusterB"
          : "clusterUnknown",

      genomeMode: metrics.genome.mode ?? "default",
      signalMode: metrics.signals.pulse ? "active" : "idle",

      moduleBias:
        metrics.module.stabilityScore >= 0.9
          ? "stable"
          : metrics.module.stabilityScore >= 0.7
          ? "mostly_stable"
          : metrics.module.stabilityScore >= 0.4
          ? "unstable"
          : "critical",

      subimportBias:
        metrics.module.hasMissingSubimports ? "missing" : "ok",

      exportTierBias:
        metrics.module.hasWrongTierExports ? "unsafe" : "safe",

      binaryBias:
        metrics.binary.riskBand === "high"
          ? "conserve"
          : metrics.binary.riskBand === "medium"
          ? "balanced"
          : "aggressive",

      binaryPrewarmBias:
        metrics.binary.hasDelta ? "prewarm_delta" : "none"
    };

    // WORLD‑AWARE HINTS (optional)
    const worldHints = extractWorldHintsV32(worldState);

    return {
      metrics,
      advantageHints,
      band: BAND,
      worldRuntimeHints: worldHints.worldRuntimeHints,
      worldContinuanceHints: worldHints.worldContinuanceHints,
      worldBinaryHints: worldHints.worldBinaryHints
    };
  }

  return {
    meta: ORGAN_META_PulseTouchAnalytics_V32,
    contract: ORGAN_CONTRACT_PulseTouchAnalytics_V32,
    overlays: IMMORTAL_OVERLAYS_PulseTouchAnalytics_V32,
    analyze
  };
}
