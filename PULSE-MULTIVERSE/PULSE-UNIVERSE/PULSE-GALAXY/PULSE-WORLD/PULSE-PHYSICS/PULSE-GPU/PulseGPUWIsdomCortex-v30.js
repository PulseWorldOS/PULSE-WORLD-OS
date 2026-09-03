// ============================================================================
//  PULSE GPU INSIGHTS ENGINE v30-ImmortalΩ-ULTRA — THE WISDOM CORTEX++
//  Deterministic, Pure Logic, Drift‑Proof Analytics Over Session Traces
//  COGNITIVE-FRAME AWARE • COMPUTER-INTELLIGENCE AWARE • EARN-v30-GPU AWARE
//  GENETIC-MEMORY-LINKED • NERVOUS-SYSTEM-v30-LINKED • WARM-PATH-AWARE
//  SURVIVAL-INSTINCTS-AWARE • ADVANTAGE-FIELD-30 • CHUNK-FIELD-30
//  PRESSURE-FIELD-30 • REGRESSION-AWARE • SCORE-FIELD-AWARE
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { INSIGHT_THRESHOLDS } from "./PulseGPUCommandments-v30.js";
import { PulseGPUSettingsRestorer } from "./PulseGPUCognitiveLayer-v30.js";
import { PulseGPUUXBridge as PulseGPUCognitiveIntelligenceUX, CognitiveFrame, computeComputerIntelligence} from "./PulseGPUCognitiveIntelligence-v30.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v30.js";
import { PulseGPUWarmPathCache } from "./PULSE-GPU-WARMPATHCACHE.js";

// Optional: read-only advantage / survival surfaces
import {
  PulseGPUSurvivalInstincts,
  scoreSession as survivalScoreSession,
  detectRegression as survivalDetectRegression
} from "./PulseGPUSurvivalInstincts-v30.js";


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function classifyDelta(deltaPercent) {
  if (typeof deltaPercent !== "number" || Number.isNaN(deltaPercent)) {
    return "low";
  }

  const absDelta = Math.abs(deltaPercent);
  const low = INSIGHT_THRESHOLDS.MIN_STEP_DELTA_PERCENT ?? 5;
  const medium = INSIGHT_THRESHOLDS.MEDIUM_STEP_DELTA_PERCENT ?? 20;
  const high = INSIGHT_THRESHOLDS.HIGH_STEP_DELTA_PERCENT ?? 40;

  if (absDelta < low) return "low";
  if (absDelta < medium) return "medium";
  if (absDelta < high) return "high";
  return "critical";
}

function safePercentDelta(baseline, current) {
  const b = typeof baseline === "number" && baseline > 0 ? baseline : 0;
  const c = typeof current === "number" ? current : 0;
  if (b === 0) return 0;
  return ((b - c) / b) * 100;
}

function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function classifyPressureBand(pressureVector) {
  if (!pressureVector) return "unknown";
  const gpu = safeNumber(pressureVector.gpu, 0);
  const thermal = safeNumber(pressureVector.thermal, 0);
  const memory = safeNumber(pressureVector.memory, 0);
  const maxP = Math.max(gpu, thermal, memory);
  if (maxP < 0.3) return "low";
  if (maxP < 0.6) return "medium";
  if (maxP < 0.85) return "high";
  return "critical";
}

function mergePressureVectors(a, b) {
  if (!a && !b) return null;
  const gpu = safeNumber(a.gpu, 0) + safeNumber(b.gpu, 0);
  const thermal = safeNumber(a.thermal, 0) + safeNumber(b.thermal, 0);
  const memory = safeNumber(a.memory, 0) + safeNumber(b.memory, 0);
  const mesh = safeNumber(a.mesh, 0) + safeNumber(b.mesh, 0);
  const aura = safeNumber(a.aura, 0) + safeNumber(b.aura, 0);
  return {
    gpu: gpu / 2,
    thermal: thermal / 2,
    memory: memory / 2,
    mesh: mesh / 2,
    aura: aura / 2
  };
}

// ------------------------------------------------------
// Advantage / Survival summaries (v30+ score-field aware)
// ------------------------------------------------------

function buildAdvantageSummaryFromSurvival({
  metrics = {},
  traceSummary = null,
  advantageSnapshot = null
} = {}) {
  const adv = advantageSnapshot || {};
  const ts = traceSummary || {};

  return {
    sampleCount: adv.sampleCount ?? ts.stepCount ?? 0,
    avgFPS: adv.avgFPS ?? metrics.avgFps ?? metrics.avgFPS ?? 0,
    minFPS: adv.minFPS ?? metrics.minFps ?? metrics.minFPS ?? 0,
    stutterRate: adv.stutterRate ?? 0,
    crashRate: adv.crashRate ?? 0,
    avgDurationMs: adv.avgDurationMs ?? ts.totalDurationMs ?? 0,
    binaryModeRatio: adv.binaryModeRatio ?? 0,
    symbolicModeRatio: adv.symbolicModeRatio ?? 0,
    pressureVector:
      adv.pressureVector ??
      (ts.pressureSnapshot
        ? {
            gpu: safeNumber(ts.pressureSnapshot.gpuLoadPressure, 0),
            thermal: safeNumber(ts.pressureSnapshot.thermalPressure, 0),
            memory: safeNumber(ts.pressureSnapshot.memoryPressure, 0),
            mesh: safeNumber(ts.pressureSnapshot.meshStormPressure, 0),
            aura: safeNumber(ts.pressureSnapshot.auraTension, 0)
          }
        : null)
  };
}

function computeSessionScores({
  currentMetrics = {},
  baselineMetrics = null,
  options = {}
} = {}) {
  const currentScore = survivalScoreSession(currentMetrics, options.current || {});
  const baselineScore = baselineMetrics
    ? survivalScoreSession(baselineMetrics, options.baseline || {})
    : null;

  let regressionPercent = null;
  if (baselineMetrics) {
    regressionPercent = survivalDetectRegression(
      currentMetrics,
      baselineMetrics,
      options
    );
  }

  return {
    currentScore,
    baselineScore,
    regressionPercent
  };
}

// ------------------------------------------------------
// CognitiveFrame builder for a single step change (v30 ImmortalΩ-ULTRA)
// ------------------------------------------------------

function buildCognitiveFrameForStepChange({
  stepId,
  deltaPercent,
  baselineAvgDurationMs,
  currentAvgDurationMs,
  gameProfile,
  hardwareProfile,
  tierProfile,
  pressureVector,
  geneticPattern,
  warmPathHints,
  advantageSnapshot,
  earnProfile,
  gpuContext,
  dnaTag = "default-dna",
  instanceId = "",
  earnMode = false,
  sessionScoreSummary = null
}) {
  const performanceLabel =
    typeof deltaPercent === "number"
      ? deltaPercent > 0
        ? "faster"
        : "slower"
      : "unknown";

  const cognition = {
    gameProfile,
    hardwareProfile,
    tierProfile,
    stepId,
    deltaPercent,
    baselineAvgDurationMs,
    currentAvgDurationMs,
    pressureVector,
    geneticPattern,
    warmPathHints,
    advantageSnapshot,
    earnProfile,
    gpuContext,
    sessionScoreSummary
  };

  const performance = {
    baselineScore: sessionScoreSummary.baselineScore ?? null,
    currentScore: sessionScoreSummary.currentScore ?? null,
    deltaPercent,
    label: performanceLabel,
    regressionPercent: sessionScoreSummary.regressionPercent ?? null
  };

  const narrative = {
    summary:
      performanceLabel === "faster"
        ? `Step "${stepId}" appears faster than baseline.`
        : performanceLabel === "slower"
        ? `Step "${stepId}" appears slower than baseline.`
        : `Step "${stepId}" changed relative to baseline.`,
    details: {
      deltaPercent,
      baselineAvgDurationMs,
      currentAvgDurationMs,
      pressureVector,
      warmPathTier: warmPathHints.cacheTier || "none",
      advantageSampleCount: advantageSnapshot.sampleCount ?? 0,
      earnBand: earnProfile.band || null,
      sessionScoreSummary
    }
  };

  const frame = new CognitiveFrame({
    cognition,
    interpretation: {
      warmPathAlignment: warmPathHints.cacheTier || "none",
      pressureBand: pressureVector
        ? classifyPressureBand(pressureVector)
        : "unknown",
      advantageBand:
        typeof advantageSnapshot.avgFPS === "number"
          ? advantageSnapshot.avgFPS
          : null,
      regressionBand:
        typeof performance.regressionPercent === "number"
          ? classifyDelta(performance.regressionPercent)
          : "low"
    },
    narrative,
    tier: {
      currentTier: tierProfile.tierId || null,
      tierHistory: tierProfile.history || []
    },
    performance,
    dispatch: {
      gpuPattern: gpuContext.gpuPattern || null,
      gpuShapeSignature: gpuContext.gpuShapeSignature || null
    },
    advantage: {
      regressionRisk:
        performanceLabel === "slower" ? classifyDelta(deltaPercent) : "low",
      improvementBand:
        performanceLabel === "faster" ? classifyDelta(deltaPercent) : "low",
      warmPathTier: warmPathHints.cacheTier || "none",
      advantageFieldEpoch: advantageSnapshot.epochId || null
    },
    presence: {
      context: "wisdom_step_delta_v30_ultra",
      dnaTag,
      instanceId,
      intelligentCompute: earnMode ? "earn-aware-v30" : null
    },
    shapeSignature: {},
    patternSignature: {},
    symbolic: {},
    binary: {},
    recommendedActions: [],
    dnaTag,
    instanceId,
    earnMode
  });

  return frame;
}

// ------------------------------------------------------
// Insight builder (v30-ImmortalΩ-ULTRA, CognitiveFrame-aware)
// ------------------------------------------------------

function buildInsight({
  type,
  severity,
  message,
  gameProfile,
  hardwareProfile,
  tierProfile,
  stepId,
  deltaPercent,
  baselineAvgDurationMs,
  currentAvgDurationMs,
  extra,
  cognitiveFrame,
  computerIntelligence
}) {
  const insight = {
    type,
    severity,
    message,
    meta: {
      layer: "PulseGPUInsightsEngine",
      role: "WISDOM_CORTEX",
      version: "30.1-ImmortalΩ‑ULTRA",
      target: "full-gpu+binary+spine+advantage30+score-field",
      selfRepairable: true,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        unifiedAdvantageField: true,
        gpuSpineReady: true,
        dualBandReady: true,
        chunkingReady: true,
        prewarmReady: true,
        warmPathAware: true,
        geneticMemoryAware: true,
        survivalInstinctsAware: true,
        nervousSystemV30Aware: true,
        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        pulseSend30Ready: true,
        routingContract: "PulseSend-v30",
        gpuOrganContract: "PulseGPU-v30-Immortal+++",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal+++",
        earnCompatibility: "Earn-v30-GPU",
        scoreFieldAware: true,
        regressionFieldAware: true,
        pressureFieldAware: true
      }
    }
  };

  if (gameProfile) insight.gameProfile = gameProfile;
  if (hardwareProfile) insight.hardwareProfile = hardwareProfile;
  if (tierProfile) insight.tierProfile = tierProfile;
  if (stepId) insight.stepId = stepId;
  if (typeof deltaPercent === "number") insight.deltaPercent = deltaPercent;
  if (typeof baselineAvgDurationMs === "number") {
    insight.baselineAvgDurationMs = baselineAvgDurationMs;
  }
  if (typeof currentAvgDurationMs === "number") {
    insight.currentAvgDurationMs = currentAvgDurationMs;
  }
  if (extra && typeof extra === "object") {
    insight.extra = extra;
  }

  if (cognitiveFrame) {
    insight.meta.cognitiveFrame = cognitiveFrame;
  }
  if (computerIntelligence) {
    insight.meta.computerIntelligence = computerIntelligence;
  }

  return insight;
}

// ------------------------------------------------------
// Trace grouping + averages
// ------------------------------------------------------

function groupStepsById(traces = []) {
  const groups = new Map();

  traces.forEach((trace) => {
    if (!trace || !Array.isArray(trace.steps)) return;

    trace.steps.forEach((step) => {
      if (!step) return;

      const stepId = step.stepId || "unknown-step";
      let group = groups.get(stepId);
      if (!group) {
        group = {
          durations: [],
          metaSamples: [],
          pressureSnapshots: [],
          gpuContexts: []
        };
        groups.set(stepId, group);
      }

      const duration = clamp(step.durationMs || 0, 0, 60 * 60 * 1000);
      group.durations.push(duration);
      group.metaSamples.push({
        gameProfile: trace.gameProfile || {},
        hardwareProfile: trace.hardwareProfile || {},
        tierProfile: trace.tierProfile || {}
      });

      if (step.pressureSnapshot && typeof step.pressureSnapshot === "object") {
        group.pressureSnapshots.push(step.pressureSnapshot);
      }

      if (trace.gpuContext && typeof trace.gpuContext === "object") {
        group.gpuContexts.push(trace.gpuContext);
      }
    });
  });

  return groups;
}

function computeStepAverages(groups) {
  const result = new Map();

  for (const [stepId, group] of groups.entries()) {
    const durations = group.durations;
    if (!durations || durations.length === 0) continue;

    let sum = 0;
    durations.forEach((d) => (sum += d));

    const avg = sum / durations.length;

    let pressureVector = null;
    if (group.pressureSnapshots.length > 0) {
      const agg = { gpu: 0, thermal: 0, memory: 0, mesh: 0, aura: 0 };
      group.pressureSnapshots.forEach((p) => {
        agg.gpu += safeNumber(p.gpuLoadPressure, 0);
        agg.thermal += safeNumber(p.thermalPressure, 0);
        agg.memory += safeNumber(p.memoryPressure, 0);
        agg.mesh += safeNumber(p.meshStormPressure, 0);
        agg.aura += safeNumber(p.auraTension, 0);
      });
      const c = group.pressureSnapshots.length || 1;
      pressureVector = {
        gpu: agg.gpu / c,
        thermal: agg.thermal / c,
        memory: agg.memory / c,
        mesh: agg.mesh / c,
        aura: agg.aura / c
      };
    }

    const gpuContextSample =
      group.gpuContexts.length > 0 ? group.gpuContexts[0] : null;

    result.set(stepId, {
      avgDurationMs: avg,
      sampleCount: durations.length,
      sampleMeta: group.metaSamples[0] || {
        gameProfile: {},
        hardwareProfile: {},
        tierProfile: {}
      },
      pressureVector,
      gpuContext: gpuContextSample
    });
  }

  return result;
}

// ------------------------------------------------------
// Wisdom Cortex Engine v30.1 ULTRA
// ------------------------------------------------------
export const PulseGPUInsightsEngine = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    geneticMemory: null,
    warmPathCache: null,
    survivalInstincts: null,
    meta: {
      layer: "PulseGPUInsightsEngine",
      role: "WISDOM_CORTEX",
      version: "30.1-ImmortalΩ‑ULTRA",
      target: "full-gpu",
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        unifiedAdvantageField: true,
        gpuSpineReady: true,
        dualBandReady: true,
        chunkingReady: true,
        prewarmReady: true,
        warmPathAware: true,
        geneticMemoryAware: true,
        survivalInstinctsAware: true,
        nervousSystemV30Aware: true,
        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        pulseSend30Ready: true,
        routingContract: "PulseSend-v30",
        gpuOrganContract: "PulseGPU-v30-Immortal+++",
        binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal+++",
        earnCompatibility: "Earn-v30-GPU",
        scoreFieldAware: true,
        regressionFieldAware: true,
        pressureFieldAware: true
      }
    }
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({
    geneticMemory,
    warmPathCache,
    survivalInstincts
  } = {}) => {
    lane.geneticMemory =
      geneticMemory instanceof PulseGPUGeneticMemory
        ? geneticMemory
        : new PulseGPUGeneticMemory();

    lane.warmPathCache = warmPathCache || PulseGPUWarmPathCache;

    lane.survivalInstincts =
      survivalInstincts instanceof PulseGPUSurvivalInstincts
        ? survivalInstincts
        : new PulseGPUSurvivalInstincts();
  };

  // ------------------------------------------------------------
  // CORE ANALYSIS: step durations + pressure + genetic + warm-path + advantage
  // ------------------------------------------------------------
  const analyzeStepDurations = (
    baselineTraces = [],
    currentTraces = [],
    {
      dnaTag = "default-dna",
      instanceId = "",
      earnMode = false,
      page = "gpu-session",
      chunkProfile = "gpu",
      advantageSnapshot = null,
      earnProfile = null,
      currentMetrics = null,
      baselineMetrics = null,
      traceSummary = null
    } = {}
  ) => {

    const baselineGroups = groupStepsById(baselineTraces);
    const currentGroups = groupStepsById(currentTraces);
    const baselineAverages = computeStepAverages(baselineGroups);
    const currentAverages = computeStepAverages(currentGroups);
    const insights = [];

    const advantageSummary = buildAdvantageSummaryFromSurvival({
      metrics: currentMetrics || {},
      traceSummary: traceSummary || null,
      advantageSnapshot: advantageSnapshot || null
    });

    const sessionScoreSummary = computeSessionScores({
      currentMetrics: currentMetrics || {},
      baselineMetrics: baselineMetrics || null,
      options: {
        current: { traceSummary, pressureSnapshot: traceSummary.pressureSnapshot },
        baseline: { traceSummary: null, pressureSnapshot: null }
      }
    });

    for (const [stepId, baselineInfo] of baselineAverages.entries()) {
      const currentInfo = currentAverages.get(stepId);
      if (!currentInfo) continue;

      const baselineAvg = baselineInfo.avgDurationMs;
      const currentAvg = currentInfo.avgDurationMs;
      if (baselineAvg <= 0) continue;

      const deltaPercent = safePercentDelta(baselineAvg, currentAvg);
      const minDelta = INSIGHT_THRESHOLDS.MIN_STEP_DELTA_PERCENT ?? 5;
      if (Math.abs(deltaPercent) < minDelta) continue;

      const severity = classifyDelta(deltaPercent);

      const { gameProfile, hardwareProfile, tierProfile } =
        currentInfo.sampleMeta || {};

      const message =
        deltaPercent > 0
          ? `Step "${stepId}" is faster than baseline.`
          : `Step "${stepId}" is slower than baseline.`;

      // Genetic pattern lookup
      const geneticPattern =
        lane.geneticMemory.getPatternForContext({
          gameProfile,
          hardwareProfile,
          tierProfile,
          executionContext: {
            binaryMode: "auto",
            sceneType: stepId,
            workloadClass: "gpu_step"
          }
        }) || null;

      // Warm path hints
      const warmPathHints = lane.warmPathCache.compute({
        page,
        chunkProfile,
        gpuCapable: true,
        trust: "trusted",
        risk: "low",
        pulseStream: "continuous",
        fastLane: "enabled"
      });

      const pressureVector = mergePressureVectors(
        currentInfo.pressureVector || null,
        advantageSummary.pressureVector || null
      );

      const gpuContext = currentInfo.gpuContext || null;

      const cognitiveFrame = buildCognitiveFrameForStepChange({
        stepId,
        deltaPercent,
        baselineAvgDurationMs: baselineAvg,
        currentAvgDurationMs: currentAvg,
        gameProfile,
        hardwareProfile,
        tierProfile,
        pressureVector,
        geneticPattern,
        warmPathHints,
        advantageSnapshot,
        earnProfile,
        gpuContext,
        dnaTag,
        instanceId,
        earnMode,
        sessionScoreSummary
      });

      const computerIntelligence = computeComputerIntelligence(
        cognitiveFrame,
        { earnMode }
      );

      insights.push(
        buildInsight({
          type: "step-duration-change",
          severity,
          message,
          gameProfile,
          hardwareProfile,
          tierProfile,
          stepId,
          deltaPercent,
          baselineAvgDurationMs: baselineAvg,
          currentAvgDurationMs: currentAvg,
          extra: {
            baselineSampleCount: baselineInfo.sampleCount,
            currentSampleCount: currentInfo.sampleCount,
            pressureVector,
            warmPathTier: warmPathHints.cacheTier,
            geneticSampleCount:
              geneticPattern.patternStats.sampleCount || 0,
            advantageSnapshot,
            earnProfile,
            advantageSummary,
            sessionScoreSummary
          },
          cognitiveFrame,
          computerIntelligence
        })
      );
    }

    return insights;
  };

  // ------------------------------------------------------------
  // FILTERED ANALYSIS (game + hardware)
  // ------------------------------------------------------------
  const analyzeStepDurationsForGameAndHardware = ({
    baselineTraces = [],
    currentTraces = [],
    gameId,
    gpuModel,
    dnaTag = "default-dna",
    instanceId = "",
    earnMode = false,
    page = "gpu-session",
    chunkProfile = "gpu",
    advantageSnapshot = null,
    earnProfile = null,
    currentMetrics = null,
    baselineMetrics = null,
    traceSummary = null
  }) => {

    const filteredBaseline = baselineTraces.filter((trace) => {
      if (!trace) return false;
      const gp = trace.gameProfile || {};
      const hp = trace.hardwareProfile || {};
      if (gameId && gp.gameId !== gameId) return false;
      if (gpuModel && hp.gpuModel !== gpuModel) return false;
      return true;
    });

    const filteredCurrent = currentTraces.filter((trace) => {
      if (!trace) return false;
      const gp = trace.gameProfile || {};
      const hp = trace.hardwareProfile || {};
      if (gameId && gp.gameId !== gameId) return false;
      if (gpuModel && hp.gpuModel !== gpuModel) return false;
      return true;
    });

    return analyzeStepDurations(filteredBaseline, filteredCurrent, {
      dnaTag,
      instanceId,
      earnMode,
      page,
      chunkProfile,
      advantageSnapshot,
      earnProfile,
      currentMetrics,
      baselineMetrics,
      traceSummary
    });
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    analyzeStepDurations,
    analyzeStepDurationsForGameAndHardware
  };

})();


// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  
  buildInsight,
  classifyDelta,
  groupStepsById,
  computeStepAverages,
  buildAdvantageSummaryFromSurvival,
  computeSessionScores
};

PulseRealm.GPUWisdomCortex = {
  PulseGPUInsightsEngine,
  buildInsight,
  classifyDelta,
  groupStepsById,
  computeStepAverages,
  buildAdvantageSummaryFromSurvival,
  computeSessionScores
}