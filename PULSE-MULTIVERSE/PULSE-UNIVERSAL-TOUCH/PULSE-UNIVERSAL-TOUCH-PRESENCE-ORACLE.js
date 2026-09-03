// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-UNIVERSAL-TOUCH-PRESENCE-ORACLE-v32.js
//  ORGAN: PulseTouchPresenceOracleV32 (v32 IMMORTAL++ ONE-BAND INTEL)
//  ROLE: Presence Intensity / Stability / Volatility / Trend / Module Stability
//        + Binary Awareness + Predictor Alignment + Analytics Integration
//        + Continuance v32 + OneBand v32 + WorldRuntime v32
// ============================================================================

export const AI_EXPERIENCE_META_PulsePresenceOracle_V32 = {
  id: "pulsetouch.presence_oracle.v32",
  kind: "outer_sense",
  version: "v32-IMMORTAL++-ONE-BAND-INTEL-CONTINUANCE",
  role: "presence_oracle",
  band: "touch",
  surfaces: {
    band: [
      "presence",
      "intensity",
      "stability",
      "volatility",
      "trend",
      "module",
      "binary",
      "risk",
      "one_band",
      "continuance"
    ],
    wave: ["quiet", "stabilizing", "predictive", "binary_intel"],
    presence: ["presence_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulsePresenceOracle_V32 = {
  id: "organ.pulsetouch.presence_oracle.v32",
  organism: "PulseTouch",
  layer: "outer_sense.presence.v32",
  tier: "IMMORTAL++",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,

    presenceAware: true,
    presenceIntensityAware: true,
    presenceTrendAware: true,
    presenceVolatilityAware: true,

    regionClusterAware: true,
    signalAware: true,
    genomeAware: true,
    warmupAware: true,
    analyticsAware: true,

    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,

    binaryAware: true,
    binaryDeltaAware: true,
    predictorAware: true,
    moduleRiskAware: true,

    oneBandAware: true,
    bandFieldUnified: true,

    // v32 additions
    continuanceAware: true,
    worldRuntimeAware: true,
    binarySubstrateV32: true,
    touchV32Aligned: true
  }
};

export const ORGAN_CONTRACT_PulsePresenceOracle_V32 = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    history: "Optional presence history",
    analytics: "PulseTouchAnalyticsV32 metrics",
    predictor: "PulseTouchPredictorV32 view",
    organismMap: "PulseOrganismMap (optional)",
    continuance: "Continuance v32 frame (optional)",
    worldRuntime: "WorldRuntime v32 frame (optional)"
  },
  outputs: {
    band: "canonical band label (touch)",
    presenceIntensity: "low | medium | high",
    stability: "stable | unstable",
    volatility: "low | medium | high",
    trend: "rising | falling | steady",
    confidence: "0–1 numeric",
    oracleHints: "Hints for Warmup / Security / Advantage / Gate / Predictor",
    moduleRisk: "Soft module risk view",
    binaryRiskView: "Binary risk + bias view",
    continuanceHints: "Continuance v32 hints"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulsePresenceOracle_V32 = {
  drift: { allowed: false },
  pressure: { expectedLoad: "low" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// HELPERS — v32
// ============================================================================

function deriveIntensity_v32(presence) {
  switch (presence) {
    case "active":
    case "engaged":
    case "focused":
      return "high";
    case "idle":
    case "background":
      return "medium";
    default:
      return "low";
  }
}

function computeStability_v32(history) {
  if (!Array.isArray(history) || history.length < 3) return "unstable";
  const last = history.slice(-3);
  const unique = new Set(last);
  return unique.size === 1 ? "stable" : "unstable";
}

function computeVolatility_v32(history) {
  if (!Array.isArray(history) || history.length < 4) return "medium";
  let changes = 0;
  for (let i = 1; i < history.length; i++) {
    if (history[i] !== history[i - 1]) changes++;
  }
  if (changes === 0) return "low";
  if (changes <= 2) return "medium";
  return "high";
}

function computeTrend_v32(history) {
  if (!Array.isArray(history) || history.length < 3) return "steady";
  const last = history.slice(-3).map((p) => deriveIntensity_v32(p));
  const score = last.map((i) => (i === "high" ? 3 : i === "medium" ? 2 : 1));
  if (score[2] > score[1] && score[1] > score[0]) return "rising";
  if (score[2] < score[1] && score[1] < score[0]) return "falling";
  return "steady";
}

function computeConfidence_v32(
  intensity,
  stability,
  volatility,
  moduleStability,
  binaryRisk
) {
  let base = 0.5;

  if (intensity === "high") base += 0.2;
  if (stability === "stable") base += 0.2;
  if (volatility === "low") base += 0.1;

  if (moduleStability != null) {
    if (moduleStability >= 0.9) base += 0.1;
    else if (moduleStability < 0.5) base -= 0.1;
  }

  if (binaryRisk === "high") base -= 0.1;
  if (binaryRisk === "low") base += 0.05;

  return Math.min(1, Math.max(0, base));
}

function mergeModuleRisk_v32(pulseTouch, predictor) {
  const fromPredictor = predictor.moduleRisk || null;
  const fromSkin = pulseTouch.pulseModuleRisk || null;

  const base = fromPredictor || fromSkin || null;
  if (!base) {
    return {
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      score: 0,
      source: "none"
    };
  }

  return {
    hasMissingSubimports: !!base.hasMissingSubimports,
    hasWrongTierExports: !!base.hasWrongTierExports,
    hasGlobalExposureRisk: !!base.hasGlobalExposureRisk,
    hasChunkProfileAnomaly: !!base.hasChunkProfileAnomaly,
    score:
      typeof base.score === "number" ? Math.max(0, Math.min(1, base.score)) : 0,
    source: base.source || (fromPredictor ? "predictor" : "skinState")
  };
}

function deriveBinaryRisk_v32(analytics, predictor) {
  const band =
    analytics.metrics.binary.riskBand ||
    predictor.binaryPrediction.riskBand ||
    "low";

  return band === "high" || band === "medium" || band === "low" ? band : "low";
}

// ============================================================================
// FACTORY — v32 IMMORTAL++
// ============================================================================

export function PulsePresenceOracleV32() {
  const BAND = "touch";

  function evaluate({
    pulseTouch,
    history = [],
    analytics = {},
    predictor = {},
    organismMap = null,
    continuance = null,
    worldRuntime = null
  }) {
    const presence = pulseTouch.presence || "unknown";

    const presenceIntensity = deriveIntensity_v32(presence);
    const stability = computeStability_v32(history);
    const volatility = computeVolatility_v32(history);
    const trend = computeTrend_v32(history);

    const moduleStability = predictor.modulePrediction.stabilityScore ?? null;
    const binaryRisk = deriveBinaryRisk_v32(analytics, predictor);

    const confidence = computeConfidence_v32(
      presenceIntensity,
      stability,
      volatility,
      moduleStability,
      binaryRisk
    );

    const moduleRisk = mergeModuleRisk_v32(pulseTouch, predictor);

    const binaryRiskView = {
      riskBand: binaryRisk,
      bias:
        binaryRisk === "high"
          ? "conserve"
          : binaryRisk === "medium"
          ? "balanced"
          : "aggressive"
    };

    const continuanceHints = continuance
      ? {
          logicalClock: continuance.logicalClock || 0,
          tick: continuance.tick || 0,
          bandUsage: continuance.bandUsage || null
        }
      : null;

    const oracleHints = {
      band: BAND,

      warmupBias:
        presenceIntensity === "high"
          ? "full"
          : presenceIntensity === "medium"
          ? "safe"
          : "minimal",

      animationBias: stability === "unstable" ? "reduced" : "smooth",

      hydrationBias:
        volatility === "high"
          ? "minimal"
          : presenceIntensity === "high"
          ? "full"
          : "safe",

      chunkBias:
        presenceIntensity === "high"
          ? "aggressive"
          : stability === "unstable"
          ? "safe"
          : "safe",

      routingBias:
        trend === "rising"
          ? "forward"
          : trend === "falling"
          ? "conservative"
          : "neutral",

      signalMode: analytics.metrics.signals.pulse ? "active" : "idle",
      genomeMode: analytics.metrics.genome.mode || "default",

      predictedNextPage: predictor.prediction.nextPage || null,
      predictedNextMode: predictor.prediction.nextMode || null,

      moduleBias:
        moduleStability == null
          ? "unknown"
          : moduleStability >= 0.9
          ? "stable"
          : moduleStability >= 0.7
          ? "mostly_stable"
          : moduleStability >= 0.4
          ? "unstable"
          : "critical",

      binaryBias: binaryRiskView.bias,

      continuanceHints
    };

    return {
      band: BAND,
      presenceIntensity,
      stability,
      volatility,
      trend,
      confidence,
      oracleHints,
      moduleRisk,
      binaryRiskView,
      continuanceHints
    };
  }

  return {
    meta: ORGAN_META_PulsePresenceOracle_V32,
    contract: ORGAN_CONTRACT_PulsePresenceOracle_V32,
    overlays: IMMORTAL_OVERLAYS_PulsePresenceOracle_V32,
    evaluate
  };
}
