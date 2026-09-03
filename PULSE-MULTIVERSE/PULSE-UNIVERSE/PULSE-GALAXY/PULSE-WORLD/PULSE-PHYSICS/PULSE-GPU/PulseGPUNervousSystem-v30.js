// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-GPU/PulseGPUSessionTracer-v31-IMMORTAL-INTEL-ONEBAND.js
//  PULSE GPU SESSION TRACER v31-Immortal-Intel-OneBand++ — NERVOUS SYSTEM 2.0
//  Afferent Nervous System • Deterministic Perception Layer • Pure Recording
//  GeneticMemory‑v31 + Healer‑v31 + Earn‑v31‑GPU + GuardianCortex‑v31 aware
//  One-Band Binary-First • WarmPath/Chunk/Dispatch/CI-Aware • Spine-Ready
// ============================================================================

import {PulseGPUImmortalV31 as PulseGPU} from "./PulseGPU-v30.js";
import {PulseBinaryGPUImmortal as PulseBinaryGPU} from "./PulseGPUBinary-v30.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v30.js";
import { PulseGPUHealer } from "./PulseGPULymphNodes-v30.js";
import { PulseGPUGuardianCortex } from "./PulseGPUGuardianCortex-v30.js";
import { PulseGPUSettingsRestorer } from "./PulseGPUCognitiveLayer-v30.js";
import { CognitiveFrame, computeComputerIntelligence } from "./PulseGPUCognitiveIntelligence-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// TRACER CONTEXT v31+
// ============================================================================

const TRACER_CONTEXT_V31 = {
  layer: "PulseGPUSessionTracer",
  role: "GPU_NERVOUS_SYSTEM",
  version: "31.0-Immortal-Intel-OneBand++",
  target: "full-gpu+binary+spine+earn+warm-path+genetic+chunk",
  evo: {
    driftProof: true,
    pureRecording: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,

    // Awareness
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
    oneBandGpuMode: true,

    // Organ linkage
    geneticMemoryLinked: true,
    healerLinked: true,
    driveCenterLinked: true,
    brainLinked: true,
    runtimeLinked: true,
    guardianLinked: true,
    settingsRestorerLinked: true,
    cognitiveIntelligenceLinked: true,

    // Contracts
    routingContract: "PulseSend-v31-IMMORTAL-INTEL",
    gpuOrganContract: "PulseGPU-v31-IMMORTAL-INTEL",
    binaryGpuOrganContract: "PulseBinaryGPU-v31-IMMORTAL-INTEL",
    earnCompatibility: "Earn-v31-GPU"
  },
  advantageEpochId: "gpu-nervous-system-v31-one-band"
};

// ============================================================================
// HELPERS
// ============================================================================

function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
function safeBool(v) {
  return v === true;
}
function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}
function normalizePresence(presence) {
  if (presence === "idle" || presence === "background") return presence;
  if (presence === "active") return "active";
  return "active";
}
function normalizeInputActivity(inputActivity) {
  if (inputActivity === "high" || inputActivity === "low" || inputActivity === "none") {
    return inputActivity;
  }
  return "none";
}
function normalizeBand(band) {
  return band || "one-band-binary";
}

// ============================================================================
// STEP NORMALIZATION v31+ (ONE-BAND, CI + WARM-PATH + CHUNK AWARE)
// ============================================================================

function normalizeStep_v31(step = {}) {
  const {
    stepId = "unknown-step",
    label = "",
    durationMs = 0,
    warnings = 0,
    errors = 0,
    stutters = 0,

    gpuLoad,
    cpuLoad,
    vramUsageMB,

    // extended telemetry
    frameTimeAvgMs,
    frameTimeP95Ms,
    frameTimeP99Ms,
    gpuTempC,
    gpuPowerW,
    gpuFanRpm,
    memoryBandwidthGBs,

    // sensory fields
    binaryModeObserved,
    symbolicModeObserved,
    gpuPattern,
    gpuShapeSignature,
    gpuEvolutionStage,
    gpuModeBias,
    gpuDispatchProfile,
    pressureSnapshot,
    factoringSnapshot,

    // nervous system extras
    prewarmFlag,
    cacheHitFlag,
    advantageTag,
    advantageEpochId,
    nervousSystemChannel,
    presence,
    inputActivity,
    earnHint, // { earnTier, earnBand, maxUtilizationPercent }
    gpuDispatchHints,
    gpuMemorySnapshot,

    // v31: warm-path + chunk + CI hints
    warmPathSnapshot,
    chunkPatternSnapshot,
    computerIntelligenceSnapshot
  } = step;

  const normPresence = normalizePresence(presence);
  const normInputActivity = normalizeInputActivity(inputActivity);

  return {
    stepId: String(stepId),
    label: label ? String(label) : "",
    durationMs: clamp(durationMs, 0, 60 * 60 * 1000),
    warnings: clamp(warnings, 0, 100000),
    errors: clamp(errors, 0, 100000),
    stutters: clamp(stutters, 0, 100000),

    gpuLoad:
      typeof gpuLoad === "number" ? clamp(gpuLoad, 0, 100) : undefined,
    cpuLoad:
      typeof cpuLoad === "number" ? clamp(cpuLoad, 0, 100) : undefined,
    vramUsageMB:
      typeof vramUsageMB === "number"
        ? clamp(vramUsageMB, 0, 4_000_000)
        : undefined,

    frameTimeAvgMs:
      typeof frameTimeAvgMs === "number"
        ? clamp(frameTimeAvgMs, 0, 1000)
        : undefined,
    frameTimeP95Ms:
      typeof frameTimeP95Ms === "number"
        ? clamp(frameTimeP95Ms, 0, 2000)
        : undefined,
    frameTimeP99Ms:
      typeof frameTimeP99Ms === "number"
        ? clamp(frameTimeP99Ms, 0, 5000)
        : undefined,
    gpuTempC:
      typeof gpuTempC === "number"
        ? clamp(gpuTempC, 0, 130)
        : undefined,
    gpuPowerW:
      typeof gpuPowerW === "number"
        ? clamp(gpuPowerW, 0, 1000)
        : undefined,
    gpuFanRpm:
      typeof gpuFanRpm === "number"
        ? clamp(gpuFanRpm, 0, 20000)
        : undefined,
    memoryBandwidthGBs:
      typeof memoryBandwidthGBs === "number"
        ? clamp(memoryBandwidthGBs, 0, 3000)
        : undefined,

    binaryModeObserved:
      typeof binaryModeObserved === "boolean" ? binaryModeObserved : false,
    symbolicModeObserved:
      typeof symbolicModeObserved === "boolean" ? symbolicModeObserved : false,

    gpuPattern: gpuPattern || null,
    gpuShapeSignature: gpuShapeSignature || null,
    gpuEvolutionStage: gpuEvolutionStage || null,
    gpuModeBias: gpuModeBias || null,
    gpuDispatchProfile: gpuDispatchProfile || null,

    pressureSnapshot:
      pressureSnapshot && typeof pressureSnapshot === "object"
        ? { ...pressureSnapshot }
        : null,

    factoringSnapshot:
      factoringSnapshot && typeof factoringSnapshot === "object"
        ? { ...factoringSnapshot }
        : null,

    prewarmFlag: safeBool(prewarmFlag),
    cacheHitFlag: safeBool(cacheHitFlag),
    advantageTag: advantageTag || null,
    advantageEpochId: advantageEpochId || TRACER_CONTEXT_V31.advantageEpochId,
    nervousSystemChannel: nervousSystemChannel || "one-band",
    presence: normPresence,
    inputActivity: normInputActivity,
    earnHint:
      earnHint && typeof earnHint === "object"
        ? {
            earnTier: earnHint.earnTier || null,
            earnBand: earnHint.earnBand || null,
            maxUtilizationPercent:
              typeof earnHint.maxUtilizationPercent === "number"
                ? clamp(earnHint.maxUtilizationPercent, 0, 100)
                : null,
            band: "one-band"
          }
        : null,
    gpuDispatchHints:
      gpuDispatchHints && typeof gpuDispatchHints === "object"
        ? { ...gpuDispatchHints }
        : null,
    gpuMemorySnapshot:
      gpuMemorySnapshot && typeof gpuMemorySnapshot === "object"
        ? { ...gpuMemorySnapshot }
        : null,

    warmPathSnapshot:
      warmPathSnapshot && typeof warmPathSnapshot === "object"
        ? { ...warmPathSnapshot }
        : null,

    chunkPatternSnapshot:
      chunkPatternSnapshot && typeof chunkPatternSnapshot === "object"
        ? { ...chunkPatternSnapshot }
        : null,

    computerIntelligenceSnapshot:
      computerIntelligenceSnapshot &&
      typeof computerIntelligenceSnapshot === "object"
        ? { ...computerIntelligenceSnapshot }
        : null,

    meta: { ...TRACER_CONTEXT_V31 }
  };
}

// ============================================================================
// SESSION TRACE v31+
// ============================================================================
// ============================================================================
//  SessionTrace_v31‑IMMORTAL‑v1 (FULL)
//  Pure pseudo‑class — no classes, no this, no external mutation
// ============================================================================

export const SessionTrace_v31 = (() => {

  const create = ({
    sessionId,
    gameProfile,
    hardwareProfile,
    tierProfile,
    gpuContext
  } = {}) => {
    // ------------------------------------------------------------
    // IMMORTAL STATE
    // ------------------------------------------------------------
    const state = {
      sessionId: String(sessionId || "unknown-session"),
      gameProfile: gameProfile || {},
      hardwareProfile: hardwareProfile || {},
      tierProfile: tierProfile || {},
      gpuContext: {
        ...(gpuContext || {}),
        bandHint: normalizeBand(gpuContext.bandHint),
        oneBandGpuMode: true
      },
      steps: [],
      meta: { ...TRACER_CONTEXT_V31 }
    };

    // ------------------------------------------------------------
    // ADD STEP
    // ------------------------------------------------------------
    const addStep = (step) => {
      const normalized = normalizeStep_v31(step);
      state.steps.push(normalized);
    };

    // ------------------------------------------------------------
    // SUMMARY
    // ------------------------------------------------------------
    const getSummary = () => {
      let totalDuration = 0;
      let totalWarnings = 0;
      let totalErrors = 0;
      let totalStutters = 0;
      let binarySteps = 0;
      let symbolicSteps = 0;
      let prewarmSteps = 0;
      let cacheHitSteps = 0;

      let minFrameTimeMs = null;
      let sumFrameTimeMs = 0;
      let frameSampleCount = 0;

      let pressureAgg = {
        gpu: 0,
        thermal: 0,
        memory: 0,
        mesh: 0,
        aura: 0
      };
      let pressureCount = 0;

      const presenceCounts = {
        active: 0,
        idle: 0,
        background: 0
      };

      const inputActivityCounts = {
        high: 0,
        low: 0,
        none: 0
      };

      state.steps.forEach((s) => {
        const step = s || {};

        totalDuration += safeNumber(step.durationMs, 0);
        totalWarnings += safeNumber(step.warnings, 0);
        totalErrors += safeNumber(step.errors, 0);
        totalStutters += safeNumber(step.stutters, 0);

        if (step.binaryModeObserved) binarySteps += 1;
        if (step.symbolicModeObserved) symbolicSteps += 1;
        if (step.prewarmFlag) prewarmSteps += 1;
        if (step.cacheHitFlag) cacheHitSteps += 1;

        if (typeof step.frameTimeAvgMs === "number") {
          const ft = clamp(step.frameTimeAvgMs, 0, 1000);
          sumFrameTimeMs += ft;
          frameSampleCount += 1;
          if (minFrameTimeMs === null || ft < minFrameTimeMs) {
            minFrameTimeMs = ft;
          }
        }

        if (step.pressureSnapshot && typeof step.pressureSnapshot === "object") {
          const p = step.pressureSnapshot;
          pressureAgg.gpu += safeNumber(p.gpuLoadPressure, 0);
          pressureAgg.thermal += safeNumber(p.thermalPressure, 0);
          pressureAgg.memory += safeNumber(p.memoryPressure, 0);
          pressureAgg.mesh += safeNumber(p.meshStormPressure, 0);
          pressureAgg.aura += safeNumber(p.auraTension, 0);
          pressureCount += 1;
        }

        const presence = normalizePresence(step.presence);
        if (presence === "active") presenceCounts.active += 1;
        else if (presence === "idle") presenceCounts.idle += 1;
        else if (presence === "background") presenceCounts.background += 1;

        const ia = normalizeInputActivity(step.inputActivity);
        if (ia === "high") inputActivityCounts.high += 1;
        else if (ia === "low") inputActivityCounts.low += 1;
        else inputActivityCounts.none += 1;
      });

      const avgFrameTimeMs =
        frameSampleCount > 0 ? sumFrameTimeMs / frameSampleCount : 0;
      const avgFps = avgFrameTimeMs > 0 ? 1000 / avgFrameTimeMs : 0;
      const minFps =
        minFrameTimeMs && minFrameTimeMs > 0 ? 1000 / minFrameTimeMs : 0;

      const pressureVector =
        pressureCount > 0
          ? {
              gpu: pressureAgg.gpu / pressureCount,
              thermal: pressureAgg.thermal / pressureCount,
              memory: pressureAgg.memory / pressureCount,
              mesh: pressureAgg.mesh / pressureCount,
              aura: pressureAgg.aura / pressureCount
            }
          : null;

      const advantageSnapshot = {
        epochId: TRACER_CONTEXT_V31.advantageEpochId,
        sessionId: state.sessionId,
        sampleCount: state.steps.length,
        avgFps,
        minFps,
        totalDurationMs: totalDuration,
        pressureVector,
        binaryStepCount: binarySteps,
        symbolicStepCount: symbolicSteps,
        prewarmStepCount: prewarmSteps,
        cacheHitStepCount: cacheHitSteps,
        band: "one-band-binary"
      };

      return {
        sessionId: state.sessionId,
        totalDurationMs: totalDuration,
        totalWarnings,
        totalErrors,
        totalStutters,
        stepCount: state.steps.length,

        binaryStepCount: binarySteps,
        symbolicStepCount: symbolicSteps,
        prewarmStepCount: prewarmSteps,
        cacheHitStepCount: cacheHitSteps,

        presenceCounts,
        inputActivityCounts,

        gpuContext: state.gpuContext,

        advantageSnapshot,
        pressureVector,

        meta: { ...TRACER_CONTEXT_V31 }
      };
    };

    // ------------------------------------------------------------
    // COGNITIVE FRAME
    // ------------------------------------------------------------
    const toCognitiveFrame = () => {
      const summary = getSummary();

      const gpuDispatchHistory = state.steps.map((s) => ({
        pattern: s.gpuPattern || "gpu-default",
        mode: s.binaryModeObserved ? "binary" : "symbolic",
        modeKind: s.binaryModeObserved ? "binary" : "symbolic",
        binaryMode: !!s.binaryModeObserved,
        dualMode: !!(s.binaryModeObserved && s.symbolicModeObserved),
        meta: {
          advantageScore: summary.advantageSnapshot.avgFps > 0
            ? (summary.advantageSnapshot.avgFps - 60) / 240
            : 0
        }
      }));

      const frameCtor = CognitiveFrame ? CognitiveFrame : null;

      const baseFrame = frameCtor
        ? new frameCtor({
            cognition: {
              gameProfile: state.gameProfile,
              hardwareProfile: state.hardwareProfile,
              tierProfile: state.tierProfile
            },
            dispatch: {
              history: gpuDispatchHistory
            },
            presence: {
              context: {
                presenceCounts: summary.presenceCounts,
                inputActivityCounts: summary.inputActivityCounts
              },
              dnaTag: "gpu-session-v31",
              instanceId: state.sessionId,
              intelligentCompute: null,
              gpuBand: "one-band-binary"
            },
            version: TRACER_CONTEXT_V31.version,
            earnMode: false
          })
        : null;

      const ci = baseFrame
        ? computeComputerIntelligence(baseFrame, { earnMode: false })
        : null;

      return { cognitiveFrame: baseFrame, computerIntelligence: ci };
    };

    // ------------------------------------------------------------
    // GENETIC MEMORY OBSERVATION
    // ------------------------------------------------------------
    const toGeneticMemoryObservation = () => {
      const summary = getSummary();
      const { cognitiveFrame, computerIntelligence } = toCognitiveFrame();

      const metrics = {
        avgFps: summary.advantageSnapshot.avgFps,
        minFps: summary.advantageSnapshot.minFps,
        stutters: summary.totalStutters,
        crashFlag: summary.totalErrors > 0
      };

      const executionContext = {
        binaryMode:
          summary.binaryStepCount > summary.symbolicStepCount
            ? "binary"
            : "symbolic",
        pipelineId: summary.gpuContext.pipelineId || "",
        sceneType: summary.gpuContext.sceneType || "",
        workloadClass: summary.gpuContext.workloadClass || "",
        resolution: summary.gpuContext.resolution || "",
        refreshRate: summary.gpuContext.refreshRate || 0,
        dispatchSignature: summary.gpuContext.gpuDispatchSignature || "",
        shapeSignature: summary.gpuContext.gpuShapeSignature || "",
        qualityPreset: summary.gpuContext.qualityPreset || "",
        rayTracing: !!summary.gpuContext.rayTracing,
        presence:
          summary.presenceCounts.active >=
          summary.presenceCounts.idle + summary.presenceCounts.background
            ? "active"
            : "background",
        inputActivity:
          summary.inputActivityCounts.high > 0
            ? "high"
            : summary.inputActivityCounts.low > 0
            ? "low"
            : "none",
        band: "one-band-binary",
        earnBand: summary.gpuContext.earnBand || null
      };

      return {
        gameProfile: state.gameProfile,
        hardwareProfile: state.hardwareProfile,
        tierProfile: state.tierProfile,
        executionContext,
        metrics,
        traceSummary: {
          totalDurationMs: summary.totalDurationMs,
          pressureSnapshot: summary.pressureVector,
          binaryStepCount: summary.binaryStepCount,
          symbolicStepCount: summary.symbolicStepCount,
          presenceCounts: summary.presenceCounts,
          inputActivityCounts: summary.inputActivityCounts
        },
        advantageSnapshot: summary.advantageSnapshot,
        computerIntelligence
      };
    };

    // ------------------------------------------------------------
    // PUBLIC IMMORTAL API
    // ------------------------------------------------------------
    return {
      addStep,
      getSummary,
      toCognitiveFrame,
      toGeneticMemoryObservation,
      _state: () => state
    };
  };

  return { create };

})();


// ============================================================================
// PULSE GPU SESSION TRACER v31+ — WITH GUARDIAN + RESTORER HOOKS
// ============================================================================
// ============================================================================
//  PulseGPUSessionTracer_v31 — IMMORTAL PSEUDO‑CLASS (v31++)
// ============================================================================

export const PulseGPUSessionTracer_v31 = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    sessions: new Map(),
    meta: { ...TRACER_CONTEXT_V31 },

    geneticMemory: null,
    healer: null,
    guardian: null,
    settingsRestorer: null
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({
    geneticMemory,
    healer,
    guardianPreferences,
    guardianInstanceId
  } = {}) => {
    lane.sessions = new Map();
    lane.meta = { ...TRACER_CONTEXT_V31 };

    lane.geneticMemory =
      geneticMemory || PulseGPUGeneticMemory();

    lane.healer =
      healer || PulseGPUHealer();

    lane.guardian = PulseGPUGuardianCortex(
      guardianPreferences || {},
      guardianInstanceId || "guardian-session-v31"
    );

    lane.settingsRestorer = PulseGPUSettingsRestorer();
  };

  // ------------------------------------------------------------
  // START SESSION
  // ------------------------------------------------------------
  const startSession = ({
    sessionId,
    gameProfile,
    hardwareProfile,
    tierProfile,
    gpuContext,
    computerIntelligence
  }) => {
    const id = String(sessionId || "unknown-session");

    const trace = SessionTrace_v31({
      sessionId: id,
      gameProfile: gameProfile || {},
      hardwareProfile: hardwareProfile || {},
      tierProfile: tierProfile || {},
      gpuContext: {
        ...(gpuContext || {}),
        bandHint: "one-band-binary",
        computerIntelligence: computerIntelligence || null
      }
    });

    lane.sessions.set(id, trace);
    return trace;
  };

  // ------------------------------------------------------------
  // RECORD STEP
  // ------------------------------------------------------------
  const recordStep = (sessionId, step) => {
    const id = String(sessionId || "unknown-session");
    const trace = lane.sessions.get(id);

    if (!trace) return null;

    trace.addStep(step || {});
    return trace;
  };

  // ------------------------------------------------------------
  // ADVICE LIST (DETERMINISTIC HEURISTICS)
  // ------------------------------------------------------------
  const buildAdviceListFromSummary = (summary) => {
    const advices = [];

    const avgFps = summary.advantageSnapshot.avgFps || 0;
    const minFps = summary.advantageSnapshot.minFps || 0;
    const crashRate = summary.totalErrors > 0 ? 1 : 0;
    const stutters = summary.totalStutters || 0;

    if (crashRate > 0 || minFps < 20) {
      advices.push({
        type: "regression",
        severity: "critical",
        deltaPercent: -30,
        gpuPattern: summary.gpuContext.gpuPattern || null,
        gpuShapeSignature: summary.gpuContext.gpuShapeSignature || null,
        baselineSettings: null,
        extra: { repairHint: "restore-baseline-settings" }
      });
    } else if (avgFps < 45 || stutters > 50) {
      advices.push({
        type: "regression",
        severity: "high",
        deltaPercent: -15,
        gpuPattern: summary.gpuContext.gpuPattern || null,
        gpuShapeSignature: summary.gpuContext.gpuShapeSignature || null,
        baselineSettings: null,
        extra: { repairHint: "restore-baseline-settings" }
      });
    } else if (avgFps > 90 && stutters < 10) {
      advices.push({
        type: "improvement",
        severity: "low",
        deltaPercent: 10,
        gpuPattern: summary.gpuContext.gpuPattern || null,
        gpuShapeSignature: summary.gpuContext.gpuShapeSignature || null,
        baselineSettings: null,
        extra: { repairHint: "promote-current-to-baseline" }
      });
    }

    return advices;
  };

  // ------------------------------------------------------------
  // END SESSION
  // ------------------------------------------------------------
  const endSession = (
    sessionId,
    {
      userPreferences,
      earnProfile,
      warmPathContext,
      geneticContext,
      presence,
      gameActive
    } = {}
  ) => {
    const id = String(sessionId || "unknown-session");
    const trace = lane.sessions.get(id);

    if (!trace) return null;

    lane.sessions.delete(id);

    const summary = trace.getSummary();
    const gmObservation = trace.toGeneticMemoryObservation();

    let geneticEntry = null;
    try {
      geneticEntry = lane.geneticMemory.recordObservation({
        ...gmObservation,
        warmPathSnapshot: null,
        chunkPatternSnapshot: null
      });
    } catch {
      geneticEntry = null;
    }

    const adviceList = buildAdviceListFromSummary(summary);

    let restorePlan = null;
    try {
      restorePlan = lane.settingsRestorer.buildRestorePlan(
        adviceList,
        summary.gpuContext,
        {
          dnaTag: "gpu-session-v31",
          instanceId: summary.sessionId,
          earnMode: false,
          chunkContext: null
        }
      );
    } catch {
      restorePlan = null;
    }

    let autoDecision = null;
    try {
      autoDecision = lane.guardian.decide(restorePlan, {
        adviceList,
        userPreferences: userPreferences || null,
        gpuContext: summary.gpuContext,
        earnProfile: earnProfile || null,
        presence: presence || "active",
        gameActive: !!gameActive,
        warmPathContext: warmPathContext || null,
        geneticContext: geneticContext || geneticEntry || null
      });
    } catch {
      autoDecision = null;
    }

    let healingReport = null;
    try {
      healingReport = lane.healer.healSessionFlow({
        advisorResult: { adviceList },
        restorePlan,
        autoDecision,
        notifications: [],
        context: {
          gameProfile: gmObservation.gameProfile,
          hardwareProfile: gmObservation.hardwareProfile,
          tierProfile: gmObservation.tierProfile,
          settings: null,
          metrics: gmObservation.metrics,
          userPreferences: userPreferences || null,
          gpuContext: summary.gpuContext,
          advantageSnapshot: summary.advantageSnapshot,
          prewarmState: null
        }
      });
    } catch {
      healingReport = null;
    }

    return {
      trace,
      summary,
      geneticEntry,
      restorePlan,
      autoDecision,
      healingReport
    };
  };

  // ------------------------------------------------------------
  // SESSION ACCESSORS
  // ------------------------------------------------------------
  const getSessionTrace = (sessionId) => {
    const id = String(sessionId || "unknown-session");
    return lane.sessions.get(id) || null;
  };

  const clearSession = (sessionId) => {
    const id = String(sessionId || "unknown-session");
    lane.sessions.delete(id);
  };

  const clearAllSessions = () => {
    lane.sessions.clear();
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    startSession,
    recordStep,
    endSession,
    getSessionTrace,
    clearSession,
    clearAllSessions
  };

})();


export {
  normalizeStep_v31,
  TRACER_CONTEXT_V31
};

PulseRealm.GPUNervousSystem = {
  normalizeStep_v31,
  TRACER_CONTEXT_V31,
  PulseGPUSessionTracer_v31,
  SessionTrace_v31
}