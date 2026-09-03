// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-GPU/PulseGPUOrchestrator-v30-OneBand-Immortal++.js
//  PULSE GPU ORCHESTRATOR v30-OneBand-Immortal++ — THE SPINE / BRAINSTEM
//  Autonomic Nervous System • Reflex Router • Pressure / Advantage Regulator
//  Dual-Mode (Binary + Symbolic) • Dispatch-Aware • Memory-Aware • Chunk-Aware
//  Deterministic • Fail-Open • Zero Side Effects (no time, no randomness)
//  One-Band Nervous System • Earn-Aware • CI-Aware • Advantage-Field-Aware
//  GeneticMemory-Aware • WarmPath-Aware • Guardian-Cortex-Aware
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseGPUEventEmitter } from "./PulseGPUSynapses-v30.js";
import { PulseGPUInsightsEngine } from "./PulseGPUWIsdomCortex-v30.js";
import {
  PulseGPUSessionTracer_v31 as PulseGPUSessionTracer
} from "./PulseGPUNervousSystem-v30.js";
import { PulseGPUPerformanceAdvisor } from "./PulseGPUDriveCenter-v30.js";
import {
  PulseGPUGuardianCortex
} from "./PulseGPUGuardianCortex-v30.js";
import { PulseGPUHealer } from "./PulseGPULymphNodes-v30.js";
import { PulseGPUSettingsRestorer } from "./PulseGPUCognitiveLayer-v30.js";
import { PulseGPUUXBridge as PulseGPUCognitiveIntelligenceUX} from "./PulseGPUCognitiveIntelligence-v30.js";
import {
  PulseGPUGeneticMemory
} from "./PulseGPUGeneticMemory-v30.js";
import { DEFAULT_USER_PREFERENCES } from "./PulseGPUCommandments-v30.js";
import {
  applyEarnSignalFactoring_v31 as PulseEarnSignalFactoring
} from "../PULSE-EARN/PulseEarnSignalFactoring-v31.js";

import { PulseGPUEarnProfile, createPulseGPUEarnBridge } from "../PULSE-GPU/PulseGPUEarnProfile-v31.js";
import { PulseGPUChunkPlannerMultiband as PulseGPUChunkPlanner } from "./PULSE-GPU-CHUNKPLANNER.js";
import { PulseGPUWarmPathCache } from "./PULSE-GPU-WARMPATHCACHE.js";
import { createPulseGPUImmortalV31 as createPulseGPUImmortal } from "./PulseGPU-v30.js";
import { createPulseBinaryGPUImmortal } from "./PulseGPUBinary-v30.js";

// ============================================================================
// META v30-OneBand-Immortal++
// ============================================================================

const PULSE_GPU_ORCHESTRATOR_META_V30_ONEBAND = {
  layer: "PulseGPUOrchestrator",
  role: "GPU_SPINE_BRAINSTEM",
  version: "30.0-OneBand-Immortal++",
  target: "full-gpu+one-band",
  evo: {
    driftProof: true,
    deterministic: true,
    failOpen: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,

    // Band + awareness
    oneBandGpuMode: true,
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
    chunkAware: true,
    warmPathAware: true,
    earnAware: true,
    ciAware: true,
    geneticMemoryAware: true,
    guardianCortexAware: true,

    // Organ linkage
    geneticMemoryLinked: true,
    healerLinked: true,
    driveCenterLinked: true,
    brainLinked: true,
    runtimeLinked: true,
    nervousSystemLinked: true,
    guardianLinked: true,
    earnBridgeLinked: true,
    chunkPlannerLinked: true,
    warmPathCacheLinked: true,

    // Contracts
    routingContract: "PulseSend-v30-OneBand-Immortal++",
    gpuOrganContract: "PulseGPU-v30-OneBand-Immortal++",
    binaryGpuOrganContract: "PulseBinaryGPU-v30-OneBand-Immortal++",
    earnCompatibility: "Earn-v30-GPU"
  }
};

// ============================================================================
// PRESSURE SNAPSHOT BUILDER — Sensory → Reflex Pressure Map
// ============================================================================

function buildPressureSnapshotFromStep(step = {}) {
  const gpuLoad = typeof step.gpuLoad === "number" ? step.gpuLoad / 100 : 0;
  const cpuLoad = typeof step.cpuLoad === "number" ? step.cpuLoad / 100 : 0;
  const stutters = typeof step.stutters === "number" ? step.stutters : 0;
  const vram = typeof step.vramUsageMB === "number" ? step.vramUsageMB : 0;

  const gpuLoadPressure = Math.max(0, Math.min(1, gpuLoad));
  const thermalPressure = gpuLoadPressure;
  const memoryPressure =
    vram > 0 ? Math.max(0, Math.min(1, vram / 4_000_000)) : 0;
  const meshStormPressure =
    stutters > 0 ? Math.max(0, Math.min(1, stutters / 1000)) : 0;
  const auraTension = Math.max(0, Math.min(1, (gpuLoad + cpuLoad) / 2));

  return {
    gpuLoadPressure,
    thermalPressure,
    memoryPressure,
    meshStormPressure,
    auraTension
  };
}

// ============================================================================
// EXECUTION CONTEXT BUILDER — For Genetic Memory v30-OneBand
// ============================================================================

function buildExecutionContextFromSession({
  metrics = {},
  summary = {},
  gpuContext = null
} = {}) {
  const binaryMode =
    typeof metrics.binaryMode === "string"
      ? metrics.binaryMode
      : gpuContext.binaryMode || "auto";

  const pipelineId = metrics.pipelineId || gpuContext.pipelineId || "";
  const sceneType = metrics.sceneType || gpuContext.sceneType || "";
  const workloadClass = metrics.workloadClass || gpuContext.workloadClass || "";
  const resolution = metrics.resolution || gpuContext.resolution || "";
  const refreshRate = metrics.refreshRate || gpuContext.refreshRate || 0;

  const dispatchSignature =
    metrics.dispatchSignature ||
    gpuContext.dispatchSignature ||
    summary.gpuContext.dispatchSignature ||
    "";

  const shapeSignature =
    metrics.shapeSignature ||
    gpuContext.shapeSignature ||
    summary.gpuContext.shapeSignature ||
    "";

  const chunkPattern =
    metrics.chunkPattern ||
    gpuContext.chunkPattern ||
    summary.gpuContext.chunkPattern ||
    "";

  const warmPathKey =
    metrics.warmPathKey ||
    gpuContext.warmPathKey ||
    summary.gpuContext.warmPathKey ||
    "";

  return {
    binaryMode,
    pipelineId,
    sceneType,
    workloadClass,
    resolution,
    refreshRate,
    dispatchSignature,
    shapeSignature,
    chunkPattern,
    warmPathKey,
    band: "one-band"
  };
}

// ============================================================================
// CHUNKING SNAPSHOT BUILDER — v30-OneBand Chunk / Warm-Path Field
// ============================================================================

function buildChunkingSnapshot({
  chunkPlan = null,
  warmPathKey = "",
  cacheHit = false
} = {}) {
  if (!chunkPlan) {
    return {
      hasChunkPlan: false,
      warmPathKey: warmPathKey || "",
      cacheHit,
      chunkPattern: null,
      chunkProfile: null,
      plannerStrategy: null,
      plannerChunks: 0
    };
  }

  const profile = chunkPlan.profile || {};
  const plannerStrategy = profile.plannerStrategy || null;
  const plannerChunks = Array.isArray(chunkPlan.chunks)
    ? chunkPlan.chunks.length
    : profile.plannerChunks || 0;

  return {
    hasChunkPlan: true,
    warmPathKey: warmPathKey || "",
    cacheHit,
    chunkPattern: chunkPlan.pattern || null,
    chunkProfile: profile.name || profile.id || null,
    plannerStrategy,
    plannerChunks
  };
}

// ============================================================================
// ADVANTAGE SNAPSHOT BUILDER — v30-OneBand Advantage Field (GPU + Chunking)
// ============================================================================

function buildAdvantageSnapshot({
  summary = {},
  pressureSnapshot = null,
  geneticMemoryEntry = null,
  chunkingSnapshot = null
} = {}) {
  const ps = pressureSnapshot || {};
  const gm = geneticMemoryEntry.patternStats || {};
  const cs = chunkingSnapshot || {};

  return {
    sampleCount: gm.sampleCount || summary.stepCount || 0,
    avgFPS: gm.avgFPS || 0,
    minFPS: gm.minFPS || 0,
    stutterRate: gm.stutterRate || 0,
    crashRate: gm.crashRate || 0,
    avgDurationMs: gm.avgDurationMs || summary.totalDurationMs || 0,
    pressureVector:
      gm.pressureVector || ps || {
        gpu: 0,
        thermal: 0,
        memory: 0,
        mesh: 0,
        aura: 0
      },
    binaryModeRatio: gm.binaryModeRatio || 0,
    symbolicModeRatio: gm.symbolicModeRatio || 0,
    binaryStepCount: summary.binaryStepCount || 0,
    symbolicStepCount: summary.symbolicStepCount || 0,
    prewarmStepCount: summary.prewarmStepCount || 0,
    cacheHitStepCount: summary.cacheHitStepCount || 0,

    hasChunkPlan: !!cs.hasChunkPlan,
    warmPathKey: cs.warmPathKey || "",
    warmPathCacheHit: !!cs.cacheHit,
    chunkPattern: cs.chunkPattern || null,
    chunkProfile: cs.chunkProfile || null,
    plannerStrategy: cs.plannerStrategy || null,
    plannerChunks: cs.plannerChunks || 0,

    band: "one-band"
  };
}

// ============================================================================
// TRACE SUMMARY → GENETIC MEMORY TRACE SNAPSHOT (v30-OneBand advantage-aware)
// ============================================================================

function buildTraceSummaryForGeneticMemory({
  summary = {},
  pressureSnapshot = null,
  advantageSnapshot = null
} = {}) {
  const adv = advantageSnapshot || summary.advantageSnapshot || {};

  return {
    totalDurationMs: summary.totalDurationMs || adv.avgDurationMs || 0,
    totalWarnings: summary.totalWarnings || 0,
    totalErrors: summary.totalErrors || 0,
    totalStutters: summary.totalStutters || 0,
    stepCount: summary.stepCount || adv.sampleCount || 0,
    binaryStepCount: summary.binaryStepCount || adv.binaryStepCount || 0,
    symbolicStepCount: summary.symbolicStepCount || adv.symbolicStepCount || 0,
    prewarmStepCount: summary.prewarmStepCount || adv.prewarmStepCount || 0,
    cacheHitStepCount: summary.cacheHitStepCount || adv.cacheHitStepCount || 0,
    pressureSnapshot: pressureSnapshot || adv.pressureVector || null,
    advantageSnapshot: adv || null,
    band: "one-band"
  };
}

// ============================================================================
// PULSE GPU ORCHESTRATOR v30-OneBand-Immortal++ — THE SPINE / BRAINSTEM
// ============================================================================

// ============================================================================
//  PulseGPUOrchestrator‑IMMORTAL‑v1 (FULL)
//  Pure pseudo‑class — no classes, no this, no external mutation
// ============================================================================

export const PulseGPUOrchestrator = (() => {

  const create = (options = {}) => {

    // ------------------------------------------------------------
    // IMMORTAL STATE
    // ------------------------------------------------------------
    const state = {
      eventEmitter: options.eventEmitter || new PulseGPUEventEmitter(),
      insightsEngine: options.insightsEngine || new PulseGPUInsightsEngine(),
      sessionTracer: options.sessionTracer || new PulseGPUSessionTracer(),
      geneticMemory: options.geneticMemory || new PulseGPUGeneticMemory(),

      performanceAdvisor:
        options.performanceAdvisor ||
        new PulseGPUPerformanceAdvisor(options.settingsMemory),

      settingsRestorer:
        options.settingsRestorer || new PulseGPUSettingsRestorer(),

      guardianCortex:
        options.guardianCortex ||
        new PulseGPUGuardianCortex(
          options.userPreferences || DEFAULT_USER_PREFERENCES
        ),

      healer:
        options.healer ||
        new PulseGPUHealer({
          advisor: options.performanceAdvisor ||
                   new PulseGPUPerformanceAdvisor(options.settingsMemory),
          restorer: options.settingsRestorer || new PulseGPUSettingsRestorer(),
          userPreferences: options.userPreferences || DEFAULT_USER_PREFERENCES
        }),

      uxBridge: options.uxBridge || new PulseGPUCognitiveIntelligenceUX(),

      gpuProfile: options.gpuProfile || PulseGPUEarnProfile.snapshot(),

      chunkPlanner: options.chunkPlanner || new PulseGPUChunkPlanner(),
      warmPathCache: options.warmPathCache || new PulseGPUWarmPathCache(),

      gpuImmortal:
        options.gpuImmortal ||
        createPulseGPUImmortal({ logger: options.logger }),

      binaryGpuImmortal:
        options.binaryGpuImmortal ||
        createPulseBinaryGPUImmortal({ logger: options.logger }),

      earnBridge:
        options.earnBridge ||
        createPulseGPUEarnBridge({ logger: options.logger }) ||
        null,

      meta: { ...PULSE_GPU_ORCHESTRATOR_META_V30_ONEBAND }
    };

    // ------------------------------------------------------------
    // PREWARM — deterministic warm‑path priming
    // ------------------------------------------------------------
    const prewarm = () => {
      const dummyGameProfile = { gameId: "prewarm-game" };
      const dummyHardwareProfile = { gpuModel: "prewarm-gpu" };
      const dummyTierProfile = { tierId: "prewarm-tier" };
      const dummySettings = {};
      const dummyMetrics = {};
      const dummyPrefs = { ...DEFAULT_USER_PREFERENCES };
      const dummyGpuContext = {
        binaryMode: "auto",
        pipelineId: "prewarm-pipeline",
        sceneType: "prewarm-scene",
        workloadClass: "prewarm-workload",
        prewarmFlag: true,
        bandHint: "one-band"
      };

      const chunkPlan = state.chunkPlanner.buildPlan({
        gameProfile: dummyGameProfile,
        hardwareProfile: dummyHardwareProfile,
        tierProfile: dummyTierProfile,
        gpuContext: dummyGpuContext
      });

      const cacheKey = state.warmPathCache.buildKey({
        gameProfile: dummyGameProfile,
        hardwareProfile: dummyHardwareProfile,
        tierProfile: dummyTierProfile,
        gpuContext: dummyGpuContext
      });

      state.warmPathCache.recordPrewarm(cacheKey, {
        chunkPlan,
        gpuContext: dummyGpuContext
      });

      const trace = state.sessionTracer.startSession({
        sessionId: "prewarm-session",
        gameProfile: dummyGameProfile,
        hardwareProfile: dummyHardwareProfile,
        tierProfile: dummyTierProfile,
        gpuContext: dummyGpuContext
      });

      state.sessionTracer.recordStep("prewarm-session", {
        stepId: "prewarm-step",
        durationMs: 0,
        gpuLoad: 0,
        cpuLoad: 0,
        stutters: 0
      });

      state.sessionTracer.endSession("prewarm-session");

      const advisorResult =
        state.performanceAdvisor.safeAnalyzeCurrentSession({
          gameProfile: dummyGameProfile,
          hardwareProfile: dummyHardwareProfile,
          tierProfile: dummyTierProfile,
          settings: dummySettings,
          metrics: dummyMetrics
        });

      const restorePlan =
        state.settingsRestorer.buildRestorePlan(advisorResult.advice || []);

      const guardianDecision = state.guardianCortex.decide(restorePlan, {
        adviceList: advisorResult.advice || [],
        userPreferences: dummyPrefs,
        gpuContext: dummyGpuContext,
        warmPathContext: {
          cacheTier: "light",
          fanoutProfile: "balanced",
          warmPathKey: cacheKey
        },
        geneticContext: null
      });

      state.healer.healSessionFlow({
        advisorResult,
        restorePlan,
        autoDecision: guardianDecision,
        notifications: [],
        context: {
          gameProfile: dummyGameProfile,
          hardwareProfile: dummyHardwareProfile,
          tierProfile: dummyTierProfile,
          settings: dummySettings,
          metrics: dummyMetrics,
          userPreferences: dummyPrefs,
          gpuContext: dummyGpuContext
        }
      });

      state.insightsEngine.analyzeStepDurationsForGameAndHardware({
        baselineTraces: [],
        currentTraces: [],
        gameId: dummyGameProfile.gameId,
        gpuModel: dummyHardwareProfile.gpuModel
      });

      state.uxBridge.fromAdvisorResult(advisorResult);
      state.uxBridge.fromRestorePlan(restorePlan);
      state.uxBridge.fromInsights([]);

      const execCtx = buildExecutionContextFromSession({
        metrics: dummyMetrics,
        summary: {},
        gpuContext: {
          ...dummyGpuContext,
          chunkPattern: chunkPlan.pattern || "",
          warmPathKey: cacheKey || ""
        }
      });

      const gmEntry = state.geneticMemory.recordObservation({
        gameProfile: dummyGameProfile,
        hardwareProfile: dummyHardwareProfile,
        tierProfile: dummyTierProfile,
        executionContext: execCtx,
        metrics: {},
        traceSummary: buildTraceSummaryForGeneticMemory({
          summary: {},
          pressureSnapshot: null,
          advantageSnapshot: null
        })
      });

      const chunkingSnapshot = buildChunkingSnapshot({
        chunkPlan,
        warmPathKey: cacheKey,
        cacheHit: true
      });

      const advantageSnapshot = buildAdvantageSnapshot({
        summary: {},
        pressureSnapshot: null,
        geneticMemoryEntry: gmEntry,
        chunkingSnapshot
      });

      const earnWarm = state.earnBridge.buildWarmJobTemplate({
        gameProfile: dummyGameProfile,
        hardwareProfile: dummyHardwareProfile,
        tierProfile: dummyTierProfile,
        geneticMemoryEntry: gmEntry,
        advantageSnapshot
      });

      return {
        prewarmed: true,
        chunkPlan,
        cacheKey,
        chunkingSnapshot,
        advantageSnapshot,
        earnWarm,
        meta: state.meta
      };
    };

    // ------------------------------------------------------------
    // SESSION START
    // ------------------------------------------------------------
    const startSession = (payload = {}) => {
      const {
        sessionId,
        gameProfile,
        hardwareProfile,
        tierProfile,
        gpuContext,
        computerIntelligence
      } = payload;

      const trace = state.sessionTracer.startSession({
        sessionId,
        gameProfile,
        hardwareProfile,
        tierProfile,
        gpuContext: {
          ...(gpuContext || {}),
          bandHint: "one-band",
          computerIntelligence: computerIntelligence || null
        }
      });

      state.eventEmitter.emit("session-started", {
        sessionId: trace.sessionId,
        gameProfile,
        hardwareProfile,
        tierProfile,
        gpuContext: trace.gpuContext
      });

      return { sessionId: trace.sessionId };
    };

    // ------------------------------------------------------------
    // STEP RECORD
    // ------------------------------------------------------------
    const recordStep = (sessionId, step) => {
      const trace = state.sessionTracer.recordStep(sessionId, step || {});
      if (!trace) return;

      const normalizedStep = trace.steps[trace.steps.length - 1] || step || {};
      const pressureSnapshot = buildPressureSnapshotFromStep(normalizedStep);

      state.eventEmitter.emit("session-step-recorded", {
        sessionId,
        step: normalizedStep,
        pressureSnapshot
      });

      state.eventEmitter.emit("pressure-updated", {
        sessionId,
        pressureSnapshot
      });

      return { pressureSnapshot };
    };

    // ------------------------------------------------------------
    // SESSION END
    // ------------------------------------------------------------
    const endSession = (payload = {}) => {
      const {
        sessionId,
        gameProfile,
        hardwareProfile,
        tierProfile,
        metrics,
        settings,
        userPreferences,
        gpuContext,
        earnProfile
      } = payload;

      const ended = state.sessionTracer.endSession(sessionId);
      const summary = ended ? ended.summary : null;

      const pressureSnapshot =
        summary && summary.stepCount > 0
          ? buildPressureSnapshotFromStep({
              gpuLoad: metrics.gpuLoad,
              cpuLoad: metrics.cpuLoad,
              stutters: summary.totalStutters,
              vramUsageMB: metrics.vramUsageMB
            })
          : buildPressureSnapshotFromStep({
              gpuLoad: metrics.gpuLoad,
              cpuLoad: metrics.cpuLoad,
              stutters: metrics.stutters,
              vramUsageMB: metrics.vramUsageMB
            });

      state.eventEmitter.emit("session-ended", {
        sessionId,
        summary,
        pressureSnapshot
      });

      const baselineTraces = [];
      const currentTraces = ended ? [ended.trace] : [];

      let insights = [];
      try {
        insights =
          state.insightsEngine.analyzeStepDurationsForGameAndHardware({
            baselineTraces,
            currentTraces,
            gameId: gameProfile.gameId,
            gpuModel: hardwareProfile.gpuModel
          }) || [];
      } catch {
        insights = [];
      }

      state.eventEmitter.emit("insights-available", {
        gameId: gameProfile.gameId,
        gpuModel: hardwareProfile.gpuModel,
        insights
      });

      const advisorResult = state.performanceAdvisor.safeAnalyzeCurrentSession(
        {
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          metrics
        },
        gpuContext || null
      );

      state.eventEmitter.emit("advisor-result", {
        sessionId,
        advisorResult
      });

      const restorePlan = state.settingsRestorer.buildRestorePlan(
        advisorResult.advice
      );

      state.eventEmitter.emit("restore-plan", {
        sessionId,
        restorePlan
      });

      const warmPathKey = state.warmPathCache.buildKey({
        gameProfile,
        hardwareProfile,
        tierProfile,
        gpuContext: gpuContext || null
      });

      const cached = state.warmPathCache.get(warmPathKey) || null;
      const chunkPlan =
        cached.chunkPlan ||
        state.chunkPlanner.buildPlan({
          gameProfile,
          hardwareProfile,
          tierProfile,
          gpuContext: gpuContext || null
        });

      const chunkingSnapshot = buildChunkingSnapshot({
        chunkPlan,
        warmPathKey,
        cacheHit: !!cached
      });

      const executionContext = buildExecutionContextFromSession({
        metrics,
        summary: summary || {},
        gpuContext: {
          ...(gpuContext || {}),
          chunkPattern: chunkingSnapshot.chunkPattern || "",
          warmPathKey: chunkingSnapshot.warmPathKey || ""
        }
      });

      const geneticMemoryEntry = state.geneticMemory.recordObservation({
        gameProfile,
        hardwareProfile,
        tierProfile,
        executionContext,
        metrics: metrics || {},
        traceSummary: buildTraceSummaryForGeneticMemory({
          summary: summary || {},
          pressureSnapshot,
          advantageSnapshot: null
        })
      });

      const advantageSnapshot = buildAdvantageSnapshot({
        summary: summary || {},
        pressureSnapshot,
        geneticMemoryEntry,
        chunkingSnapshot
      });

      const traceSummary = buildTraceSummaryForGeneticMemory({
        summary: { ...(summary || {}), advantageSnapshot },
        pressureSnapshot,
        advantageSnapshot
      });

      state.eventEmitter.emit("genetic-memory-updated", {
        sessionId,
        geneticMemoryEntry,
        traceSummary,
        chunkingSnapshot,
        advantageSnapshot
      });

      const guardianDecision = state.guardianCortex.decide(restorePlan, {
        adviceList: advisorResult.advice,
        userPreferences: userPreferences || DEFAULT_USER_PREFERENCES,
        gpuContext: gpuContext || null,
        earnProfile: earnProfile || null,
        warmPathContext: {
          cacheTier: cached.cacheTier || "none",
          fanoutProfile: cached.fanoutProfile || "balanced",
          warmPathKey
        },
        geneticContext: {
          entry: geneticMemoryEntry,
          advantageSnapshot
        }
      });

      state.eventEmitter.emit("guardian-decision", {
        sessionId,
        decision: guardianDecision
      });

      const healingReport = state.healer.healSessionFlow({
        advisorResult,
        restorePlan,
        autoDecision: guardianDecision,
        notifications: [],
        context: {
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          metrics,
          userPreferences: userPreferences || DEFAULT_USER_PREFERENCES,
          gpuContext: gpuContext || null,
          advantageSnapshot
        }
      });

      state.eventEmitter.emit("healing-report", {
        sessionId,
        healingReport
      });

      const advisorNotifications = state.uxBridge.fromAdvisorResult(advisorResult);
      const planNotification = state.uxBridge.fromRestorePlan(restorePlan);
      const insightNotifications = state.uxBridge.fromInsights(insights);

      const notifications = [
        ...advisorNotifications,
        ...(planNotification ? [planNotification] : []),
        ...insightNotifications
      ];

      state.eventEmitter.emit("notifications-available", {
        sessionId,
        notifications
      });

      const earnJob = state.earnBridge.buildJobFromSession({
        gameProfile,
        hardwareProfile,
        tierProfile,
        metrics,
        executionContext,
        traceSummary,
        geneticMemoryEntry,
        advantageSnapshot
      });

      const earnDecision = state.earnBridge.evaluateJobAdvantage({
        job: earnJob,
        advantageSnapshot,
        userPreferences: userPreferences || DEFAULT_USER_PREFERENCES
      });

      state.eventEmitter.emit("earn-job-evaluated", {
        sessionId,
        earnJob,
        earnDecision
      });

      return {
        insights,
        advisorResult,
        restorePlan,
        guardianDecision,
        healingReport,
        geneticMemoryEntry,
        notifications,
        pressureSnapshot,
        chunkingSnapshot,
        advantageSnapshot,
        traceSummary,
        earnJob,
        earnDecision
      };
    };

    // ------------------------------------------------------------
    // EARN JOB ROUTING — explicit call
    // ------------------------------------------------------------
    const routeEarnJob = (jobPayload = {}, context = {}) => {
      const job = state.earnBridge.buildJobFromPayload(jobPayload, context);
      const decision = state.earnBridge.evaluateJobAdvantage({
        job,
        advantageSnapshot: context.advantageSnapshot || null,
        userPreferences: context.userPreferences || DEFAULT_USER_PREFERENCES
      });

      state.eventEmitter.emit("earn-job-evaluated-explicit", {
        job,
        decision
      });

      return { job, decision };
    };

    // ------------------------------------------------------------
    // INSIGHTS ONLY — explicit call
    // ------------------------------------------------------------
    const analyzeInsights = ({
      baselineTraces = [],
      currentTraces = [],
      gameId,
      gpuModel
    }) => {
      let insights = [];

      try {
        insights =
          state.insightsEngine.analyzeStepDurationsForGameAndHardware({
            baselineTraces,
            currentTraces,
            gameId,
            gpuModel
          }) || [];
      } catch {}

      state.eventEmitter.emit("insights-available", {
        gameId,
        gpuModel,
        insights
      });

      return { insights };
    };

    // ------------------------------------------------------------
    // PROXY / CACHE HELPERS
    // ------------------------------------------------------------
    const getSessionTrace = (sessionId) =>
      state.sessionTracer.getSessionTrace(sessionId);

    const clearSession = (sessionId) =>
      state.sessionTracer.clearSession(sessionId);

    const clearAllSessions = () =>
      state.sessionTracer.clearAllSessions();

    // ------------------------------------------------------------
    // PUBLIC IMMORTAL API
    // ------------------------------------------------------------
    return {
      prewarm,
      startSession,
      recordStep,
      endSession,
      routeEarnJob,
      analyzeInsights,
      getSessionTrace,
      clearSession,
      clearAllSessions,
      _state: () => state
    };
  };

  return { create };

})();


// ============================================================================
// EXPORTS
// ============================================================================

export {
  PULSE_GPU_ORCHESTRATOR_META_V30_ONEBAND as PULSE_GPU_ORCHESTRATOR_META_V30,
  buildPressureSnapshotFromStep,
  buildExecutionContextFromSession,
  buildChunkingSnapshot,
  buildAdvantageSnapshot,
  buildTraceSummaryForGeneticMemory
};
