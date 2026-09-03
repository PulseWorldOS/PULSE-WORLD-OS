// ============================================================================
//  PULSE GPU PERFORMANCE ADVISOR v24-IMMORTAL++ — THE DRIVE CENTER (v30+ impl)
//  Internal Performance Instinct • Deterministic, Pure Logic, Drift‑Proof
//  Binary-aware • Symbolic-aware • Dual-band-aware
//  Dispatch-aware • Memory-aware • CI-aware • Chunk-aware • Earn-aware
//  Game-aware • GPU-Advantage-aware • EarnProfile-aware
// ============================================================================
// ============================================================================
// PulseGPU Advisor Core — v30 IMMORTAL INTEL OMEGA
// Now capability-aware + config-organ-aware
// ============================================================================

import { PulseGPUConfigImmortal } from "./PulseGPUCommandments-v30.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v30.js";
import { PulseGPUSurvivalInstincts } from "./PulseGPUSurvivalInstincts-v30.js";
import { PulseGPUEngine } from "./PulseGPUAstralMuscleSystem-v30.js";
import {
  computeGPUEarnProfile_v31 as computePulseGPUEarnProfile
} from "./PulseGPUEarnProfile-v31.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ---------------------------------------------------------------------------
// CONFIG ORGAN — IMMORTAL COMMANDMENTS
// ---------------------------------------------------------------------------
const GPU_CONFIG = PulseGPUConfigImmortal;

// Direct access to constants
const SCORE_CONSTANTS = GPU_CONFIG.scoreConstants();
const SEVERITY_THRESHOLDS = GPU_CONFIG.severityThresholds();

// ---------------------------------------------------------------------------
// INTEL HASH — deterministic, structure-aware, no IO, no time
// ---------------------------------------------------------------------------
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

// ---------------------------------------------------------------------------
// DELTA CLASSIFICATION — now using config-organ thresholds
// ---------------------------------------------------------------------------
function classifyDelta(deltaPercent, gpuContext = null, computerIntelligence = null) {
  if (typeof deltaPercent !== "number" || Number.isNaN(deltaPercent)) {
    return "low";
  }

  let absDelta = Math.abs(deltaPercent);

  // Binary-mode regression sensitivity
  const binarySensitive =
    gpuContext &&
    typeof gpuContext === "object" &&
    gpuContext.binaryModeObserved === true;

  if (binarySensitive && deltaPercent < 0) {
    absDelta += SEVERITY_THRESHOLDS.BINARY_REGRESSION_EXTRA_SENSITIVITY || 0;
  }

  // CI-aware modulation
  if (computerIntelligence && typeof computerIntelligence === "object") {
    const ciPressure = computerIntelligence.performancePressure || 0;
    const ciClamp = Math.max(-10, Math.min(10, ciPressure));
    absDelta += ciClamp;
  }

  if (absDelta < SEVERITY_THRESHOLDS.LOW) return "low";
  if (absDelta < SEVERITY_THRESHOLDS.MEDIUM) return "medium";
  if (absDelta < SEVERITY_THRESHOLDS.HIGH) return "high";
  return "critical";
}

function isImprovement(deltaPercent) {
  return typeof deltaPercent === "number" && deltaPercent > 0;
}

function isRegression(deltaPercent) {
  return typeof deltaPercent === "number" && deltaPercent < 0;
}

// ---------------------------------------------------------------------------
// ADVICE BUILDER — IMMORTAL v30
// ---------------------------------------------------------------------------
function buildAdvice({
  type,
  severity,
  message,
  deltaPercent,
  currentScore,
  baselineScore,
  gameProfile,
  hardwareProfile,
  tierProfile,
  settings,
  baselineSettings,
  extra,
  gpuContext,
  computerIntelligence,
  cognitiveFrame,
  earnProfile,
  chunkContext
}) {
  const advice = {
    type,
    severity,
    message,
    meta: {
      layer: "PulseGPUPerformanceAdvisor",
      role: "DRIVE_CENTER",
      version: "30.0-Immortal-Intel-Omega",
      target: "full-gpu",
      selfRepairable: true,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend30Ready: true,

        // IMMORTAL AWARENESS
        binaryAware: true,
        symbolicAware: true,
        dualBandAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,

        cognitiveFrameAware: true,
        computerIntelligenceAware: true,

        chunkAware: true,
        chunkPlannerAware: true,
        gpuChunkPlanAware: true,

        earnAware: true,
        gameAware: true,
        earnProfileAware: true,

        routingContract: "PulseSend-v30-Immortal",
        gpuOrganContract: "PulseGPU-v30-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal",
        earnCompatibility: "Earn-v30-GPU"
      }
    }
  };

  if (typeof deltaPercent === "number") advice.deltaPercent = deltaPercent;
  if (typeof currentScore === "number") advice.currentScore = currentScore;
  if (typeof baselineScore === "number") advice.baselineScore = baselineScore;

  if (gameProfile) advice.gameProfile = gameProfile;
  if (hardwareProfile) advice.hardwareProfile = hardwareProfile;
  if (tierProfile) advice.tierProfile = tierProfile;
  if (settings) advice.settings = settings;
  if (baselineSettings) advice.baselineSettings = baselineSettings;
  if (extra && typeof extra === "object") advice.extra = extra;

  if (gpuContext && typeof gpuContext === "object") {
    advice.gpuContext = { ...gpuContext };

    if (gpuContext.gpuPattern) advice.gpuPattern = gpuContext.gpuPattern;
    if (gpuContext.gpuShapeSignature) advice.gpuShapeSignature = gpuContext.gpuShapeSignature;
    if (typeof gpuContext.binaryModeObserved === "boolean")
      advice.binaryModeObserved = gpuContext.binaryModeObserved;
    if (typeof gpuContext.symbolicModeObserved === "boolean")
      advice.symbolicModeObserved = gpuContext.symbolicModeObserved;
    if (gpuContext.gpuDispatchHints) advice.gpuDispatchHints = gpuContext.gpuDispatchHints;
    if (gpuContext.chunkProfile) advice.chunkProfile = gpuContext.chunkProfile;
  }

  if (computerIntelligence) advice.computerIntelligence = computerIntelligence;
  if (cognitiveFrame) advice.cognitiveFrame = cognitiveFrame;
  if (earnProfile) advice.earnProfile = earnProfile;

  if (chunkContext && typeof chunkContext === "object") {
    advice.chunkContext = {
      chunkProfile: chunkContext.chunkProfile || null,
      plannerStrategy: chunkContext.plannerStrategy || null,
      plannerChunks: chunkContext.plannerChunks || null,
      sessionId: chunkContext.sessionId || null
    };
  }

  return advice;
}

function validateAdvice(advice) {
  if (!advice || typeof advice !== "object") return false;
  if (typeof advice.type !== "string") return false;
  if (typeof advice.severity !== "string") return false;
  if (!advice.meta || advice.meta.layer !== "PulseGPUPerformanceAdvisor") return false;
  return true;
}

// ---------------------------------------------------------------------------
// SCORING — now using SCORE_CONSTANTS from config-organ
// ---------------------------------------------------------------------------
function scoreSession(metrics = {}) {
  if (!metrics || typeof metrics !== "object") return 0;

  const avg = metrics.avgFps || 0;
  const min = metrics.minFps || 0;
  const stutters = metrics.stutters || 0;
  const crashes = metrics.crashes || 0;

  let score =
    avg * SCORE_CONSTANTS.AVG_FPS_WEIGHT +
    min * SCORE_CONSTANTS.MIN_FPS_WEIGHT -
    stutters * SCORE_CONSTANTS.STUTTER_WEIGHT;

  if (crashes > 0) {
    score = score * (1 - SCORE_CONSTANTS.CRASH_PENALTY);
  }

  return Math.max(0, score);
}


function detectRegression(currentMetrics = {}, baselineMetrics = {}) {
  // Use the config-organ scoring rules
  const currentScore = scoreSession(currentMetrics);
  const baselineScore = scoreSession(baselineMetrics);

  // Avoid division by zero — no baseline means no regression
  if (!baselineScore || baselineScore === 0) {
    return 0;
  }

  // Percent delta (positive = improvement, negative = regression)
  return ((currentScore - baselineScore) / baselineScore) * 100;
}
// ============================================================================
//  PulseGPUPerformanceAdvisor — IMMORTAL PSEUDO‑CLASS (v30‑OMEGA)
// ============================================================================

export const PulseGPUPerformanceAdvisor = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
// ------------------------------------------------------------
  const lane = {
    memory: null,
    config: null,
    SCORE_CONSTANTS: null,
    SEVERITY_THRESHOLDS: null,

    meta: Object.freeze({
      layer: "PulseGPUPerformanceAdvisor",
      role: "DRIVE_CENTER",
      version: "30.0-Immortal-Intel-Omega",
      target: "full-gpu",
      selfRepairable: true,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend30Ready: true,

        binaryAware: true,
        symbolicAware: true,
        dualBandAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,

        cognitiveFrameAware: true,
        computerIntelligenceAware: true,

        chunkAware: true,
        chunkPlannerAware: true,
        gpuChunkPlanAware: true,

        earnAware: true,
        gameAware: true,
        earnProfileAware: true,

        routingContract: "PulseSend-v30-Immortal",
        gpuOrganContract: "PulseGPU-v30-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal",
        earnCompatibility: "Earn-v30-GPU"
      }
    })
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (settingsMemory = null) => {
    lane.memory = settingsMemory || PulseGPUGeneticMemory();
    lane.config = PulseGPUConfigImmortal;

    lane.SCORE_CONSTANTS = lane.config.scoreConstants();
    lane.SEVERITY_THRESHOLDS = lane.config.severityThresholds();
  };

  // ------------------------------------------------------------
  // MAIN ANALYSIS
  // ------------------------------------------------------------
  const analyzeCurrentSession = ({
    gameProfile,
    hardwareProfile,
    tierProfile,
    settings,
    metrics,
    gpuContext,
    cognitiveFrame,
    dispatchHints,
    gpuMemorySnapshot,
    presence,
    gameActive,
    chunkContext
  }) => {
    const currentScore = scoreSession(metrics);

    const baselineEntry = lane.memory.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      tierProfile
    );

    if (!baselineEntry) {
      return {
        currentScore,
        baselineScore: null,
        deltaPercent: null,
        advice: []
      };
    }

    const baselineScore = baselineEntry.bestScore;
    const deltaPercent = detectRegression(metrics, baselineEntry.bestMetrics);

    // IMMORTAL CI
    let computerIntelligence = null;
    try {
      computerIntelligence = computeHashIntelligence({
        dispatchHints: dispatchHints || gpuContext.gpuDispatchHints || null,
        gpuMemorySnapshot: gpuMemorySnapshot || null,
        currentMetrics: metrics || null,
        baselineMetrics: baselineEntry.bestMetrics || null,
        gameProfile,
        hardwareProfile,
        tierProfile
      });
    } catch {}

    // IMMORTAL Earn Profile
    let earnProfile = null;
    try {
      earnProfile = computePulseGPUEarnProfile({
        gameActive: !!gameActive,
        gpuContext,
        performanceHint: {
          headroomPercent: metrics.headroomPercent ?? 0,
          regressionRisk: deltaPercent ?? 0,
          pressure: metrics.pressure ?? 0
        },
        presence: presence || "active"
      });
    } catch {}

    const advice = [];

    // REGRESSION
    if (isRegression(deltaPercent)) {
      const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

      advice.push(
        buildAdvice({
          type: "regression",
          severity,
          message:
            severity === "critical"
              ? "Performance has fallen far below your historical best."
              : "Performance is below your historical best.",
          deltaPercent,
          currentScore,
          baselineScore,
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          baselineSettings: baselineEntry.settings,
          extra: {
            baselineMetrics: baselineEntry.bestMetrics,
            repairHint: "restore-baseline-settings"
          },
          gpuContext,
          computerIntelligence,
          cognitiveFrame,
          earnProfile,
          chunkContext
        })
      );
    }

    // IMPROVEMENT
    else if (isImprovement(deltaPercent)) {
      const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

      advice.push(
        buildAdvice({
          type: "improvement",
          severity,
          message:
            severity === "critical"
              ? "Performance exceeds your historical best by a wide margin."
              : "Performance is above your historical best.",
          deltaPercent,
          currentScore,
          baselineScore,
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          baselineSettings: baselineEntry.settings,
          extra: {
            baselineMetrics: baselineEntry.bestMetrics,
            repairHint: "promote-current-to-baseline"
          },
          gpuContext,
          computerIntelligence,
          cognitiveFrame,
          earnProfile,
          chunkContext
        })
      );
    }

    return {
      currentScore,
      baselineScore,
      deltaPercent,
      advice
    };
  };

  // ------------------------------------------------------------
  // SAFE WRAPPER
  // ------------------------------------------------------------
  const safeAnalyzeCurrentSession = (
    input,
    gpuContext = null,
    cognitiveFrame = null,
    dispatchHints = null,
    gpuMemorySnapshot = null,
    chunkContext = null
  ) => {
    try {
      const result = analyzeCurrentSession({
        ...(input || {}),
        gpuContext,
        cognitiveFrame,
        dispatchHints,
        gpuMemorySnapshot,
        chunkContext
      });

      if (!result || typeof result !== "object" || !Array.isArray(result.advice)) {
        return {
          currentScore: 0,
          baselineScore: null,
          deltaPercent: null,
          advice: []
        };
      }

      const safeAdvice = result.advice.filter((a) => validateAdvice(a));

      return {
        currentScore: typeof result.currentScore === "number" ? result.currentScore : 0,
        baselineScore: typeof result.baselineScore === "number" ? result.baselineScore : null,
        deltaPercent: typeof result.deltaPercent === "number" ? result.deltaPercent : null,
        advice: safeAdvice
      };
    } catch {
      return {
        currentScore: 0,
        baselineScore: null,
        deltaPercent: null,
        advice: []
      };
    }
  };

  // ------------------------------------------------------------
  // SUBOPTIMAL SETTINGS
  // ------------------------------------------------------------
  const analyzeSuboptimalSettings = ({
    gameProfile,
    hardwareProfile,
    tierProfile,
    currentSettings,
    currentMetrics,
    gpuContext,
    cognitiveFrame,
    dispatchHints,
    gpuMemorySnapshot,
    presence,
    gameActive,
    chunkContext
  }) => {
    const baselineEntry = lane.memory.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      tierProfile
    );
    if (!baselineEntry) return [];

    const currentScore = scoreSession(currentMetrics);
    const baselineScore = baselineEntry.bestScore;
    if (baselineScore <= currentScore) return [];

    const deltaPercent =
      baselineScore === 0
        ? 0
        : ((baselineScore - currentScore) / baselineScore) * 100;

    let computerIntelligence = null;
    try {
      computerIntelligence = computeHashIntelligence({
        dispatchHints: dispatchHints || gpuContext.gpuDispatchHints || null,
        gpuMemorySnapshot: gpuMemorySnapshot || null,
        currentMetrics: currentMetrics || null,
        baselineMetrics: baselineEntry.bestMetrics || null,
        gameProfile,
        hardwareProfile,
        tierProfile
      });
    } catch {}

    let earnProfile = null;
    try {
      earnProfile = computePulseGPUEarnProfile({
        gameActive: !!gameActive,
        gpuContext,
        performanceHint: {
          headroomPercent: currentMetrics.headroomPercent ?? 0,
          regressionRisk: deltaPercent ?? 0,
          pressure: currentMetrics.pressure ?? 0
        },
        presence: presence || "active"
      });
    } catch {}

    const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

    return [
      buildAdvice({
        type: "suboptimal",
        severity,
        message:
          "Your current settings underperform your historical best for this game and hardware.",
        deltaPercent,
        currentScore,
        baselineScore,
        gameProfile,
        hardwareProfile,
        tierProfile,
        settings: currentSettings,
        baselineSettings: baselineEntry.settings,
        extra: {
          baselineMetrics: baselineEntry.bestMetrics,
          repairHint: "suggest-baseline-settings"
        },
        gpuContext,
        computerIntelligence,
        cognitiveFrame,
        earnProfile,
        chunkContext
      })
    ];
  };

  // ------------------------------------------------------------
  // TIER UPGRADE ANALYSIS
  // ------------------------------------------------------------
  const analyzeTierUpgrade = ({
    gameProfile,
    hardwareProfile,
    oldTierProfile,
    newTierProfile,
    currentSettings,
    currentMetrics,
    gpuContext,
    cognitiveFrame,
    dispatchHints,
    gpuMemorySnapshot,
    presence,
    gameActive,
    chunkContext
  }) => {
    const currentScore = scoreSession(currentMetrics);

    const newTierBaseline = lane.memory.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      newTierProfile
    );
    if (!newTierBaseline) return [];

    const newTierScore = newTierBaseline.bestScore;
    if (newTierScore <= currentScore) return [];

    const deltaPercent =
      currentScore === 0
        ? 0
        : ((newTierScore - currentScore) / currentScore) * 100;

    let computerIntelligence = null;
    try {
      computerIntelligence = computeHashIntelligence({
        dispatchHints: dispatchHints || gpuContext.gpuDispatchHints || null,
        gpuMemorySnapshot: gpuMemorySnapshot || null,
        currentMetrics: currentMetrics || null,
        baselineMetrics: newTierBaseline.bestMetrics || null,
        gameProfile,
        hardwareProfile,
        tierProfile: newTierProfile
      });
    } catch {}

    let earnProfile = null;
    try {
      earnProfile = computePulseGPUEarnProfile({
        gameActive: !!gameActive,
        gpuContext,
        performanceHint: {
          headroomPercent: currentMetrics.headroomPercent ?? 0,
          regressionRisk: deltaPercent ?? 0,
          pressure: currentMetrics.pressure ?? 0
        },
        presence: presence || "active"
      });
    } catch {}

    const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

    return [
      buildAdvice({
        type: "tier-upgrade-opportunity",
        severity,
        message:
          "A higher tier configuration has historically delivered better performance.",
        deltaPercent,
        currentScore,
        baselineScore: newTierScore,
        gameProfile,
        hardwareProfile,
        tierProfile: newTierProfile,
        settings: currentSettings,
        baselineSettings: newTierBaseline.settings,
        extra: {
          oldTierProfile,
          newTierProfile,
          newTierMetrics: newTierBaseline.bestMetrics,
          repairHint: "upgrade-tier"
        },
        gpuContext,
        computerIntelligence,
        cognitiveFrame,
        earnProfile,
        chunkContext
      })
    ];
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    analyzeCurrentSession,
    safeAnalyzeCurrentSession,
    analyzeSuboptimalSettings,
    analyzeTierUpgrade
  };

})();


// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export {
  detectRegression,
  computeHashIntelligence,
  classifyDelta,
  isImprovement,
  isRegression,
  buildAdvice,
  validateAdvice,
  scoreSession
};

PulseRealm.GPUDriveCenter = {
  PulseGPUPerformanceAdvisor,
  detectRegression,
  computeHashIntelligence,
  classifyDelta,
  isImprovement,
  isRegression,
  buildAdvice,
  validateAdvice,
  scoreSession,
  GPU_CONFIG,
  SCORE_CONSTANTS,
  SEVERITY_THRESHOLDS
}