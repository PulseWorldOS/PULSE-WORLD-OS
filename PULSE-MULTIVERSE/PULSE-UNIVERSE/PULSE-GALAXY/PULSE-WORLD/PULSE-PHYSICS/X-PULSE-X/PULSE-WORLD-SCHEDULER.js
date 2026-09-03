/**
 * ============================================================
 *  ORGAN: PulseScheduler-v33-IMMORTAL-HYPERFRAME-UNIVERSE
 *  ROOT:  PULSE-X
 *  MODE:  runtime+binary+continuance+oneBand+throughput
 *  TARGET: multi-tick-orchestration (symbolic + binary, one-band, universe-preserving)
 *  VERSION: v33-IMMORTAL-HYPERFRAME-UNIVERSE-ADVANTAGE
 *
 *  ROLE:
 *    - Deterministic macro-orchestrator over Router + Overmind + Runtime-v32+.
 *    - Runs multi-tick pipelines (sequence of macro ticks) across lanes/hyperFrames.
 *    - Uses Overmind world-lens + dual-band + Pulse-Touch + presence bands.
 *    - Shapes tick flow using presence/mode/page/chunkProfile/trust/advantage/throughput.
 *    - One-band: symbolic + binary always co-emitted, always tracked.
 *    - Prewarm/cache-aware, runtime-v30+/v31+/v32-aware, world-layer-aware.
 *    - v33: navigation continuance + universe-preserving runtime awareness (navState + frames).
 *    - v33: binary throughput plan + oneBandFrame + continuanceFrame + binaryFieldFrame aware.
 *    - Provides rich, introspectable meta for each tick and the whole pipeline.
 *
 *  DESIGN:
 *    - Lives in PULSE-X (connection/runtime/scheduler/binary overlay).
 *    - Never owns memory; only calls into PULSE-CORE via Runtime.
 *    - Symbolic-first orchestration, binary-backed, advantage-aware, continuance-aware.
 *    - All behavior is deterministic and host-agnostic.
 *
 *  GUARANTEES:
 *    - No real-time dependence (no timers).
 *    - No randomness.
 *    - No direct device/network IO.
 *    - Pure orchestration over symbolic + binary layers.
 * ============================================================
 */
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  IMPORTS
// ============================================================================
import { pulseband as PulseBand} from "../PULSE-BAND/PULSE-BAND.js";
// RUNTIME (Touch + prewarm/cache-aware, v32+ continuance universe, one-band)
import { PulseRuntimeV30, runPulseTickV30 as runPulseTick, PulseRuntimeTickResult, getRuntimeStateV30 } from "./PULSE-WORLD-RUNTIME.js";
import { routeAIRequest } from "../PULSE-AI/PulseAIRouter-v30.js";
import { PulsePowerAPIv32 } from "./PULSE-WORLD-POWER.js";
import { PulseSpecsDNAGenome } from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";



// ============================================================================
//  META
// ============================================================================

export const PulseSchedulerMetaV33 = Object.freeze({
  identity: "PulseScheduler-v33-IMMORTAL-HYPERFRAME-UNIVERSE",
  version: "v33-IMMORTAL-HYPERFRAME-UNIVERSE-ADVANTAGE",
  layer: "PULSE-X-SCHEDULER",
  guarantees: {
    deterministic: true,
    hostAgnostic: true,
    noRandomness: true,
    noRealtime: true,
    noIO: true,
    dualBand: true,
    oneBandOverlay: true,
    runtimeV30BinaryAware: true,
    runtimeV31ContinuanceAware: true,
    runtimeV32FrameAware: true,
    worldLensAware: true,
    pulseTouchAware: true,
    advantageAware: true,
    navigationContinuanceAware: true,
    universePreservingAware: true,
    throughputPlanAware: true,
    oneBandFrameAware: true,
    continuanceFrameAware: true,
    binaryFieldFrameAware: true
  }
});

// ============================================================================
//  TYPES
// ============================================================================
export const SchedulerResultV33 = ({
  scheduleId,
  tickIndex,
  routing = null,
  overmindDecision = null,
  runtimeTick = null,
  binaryFrames = null,
  navState = null,
  throughputPlan = null,
  frames = null,
  meta = {}
}) => {

  return Object.freeze({
    scheduleId,
    tickIndex,
    routing,
    overmindDecision,
    runtimeTick,
    binaryFrames,
    navState,
    throughputPlan,
    frames,
    meta
  })
}

export const SchedulerPipelineResultV33 = ({
  scheduleId,
  ticks = [],
  finalStateById = {},
  meta = {}
}) => {

  return Object.freeze({
    scheduleId,
    ticks,
    finalStateById,
    meta
  })
}


// ============================================================================
//  INTERNAL HELPERS
// ============================================================================

function buildScheduleId(seed = "pulse-scheduler-v33-immortal-hyperframe-universe") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const chr = seed.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `sched33-${Math.abs(hash)}`;
}

function summarizeRouting(routing) {
  if (!routing) return null;
  return {
    personaId: routing.personaId || null,
    safetyMode: routing.personaSafety.safetyMode || null,
    archetypePrimaryPage: routing.archetypes.primaryPage || null,
    dualBandMode: routing.dualBand.mode || null,
    dualBandAdvantage: routing.dualBand.advantage || null,
    bandKind: routing.dualBand.bandKind || "dual",
    gpuMode: routing.gpuMode || null,
    proxyMode: routing.proxyMode || null,
    earnMode: routing.earnMode || null,
    memoryMode: routing.memoryMode || null
  };
}

function summarizeOvermindDecision(overmindDecision) {
  if (!overmindDecision) return null;
  const meta = overmindDecision.meta || {};
  return {
    worldLens: meta.worldLens || null,
    safetyStatus: meta.safetyStatus || null,
    comfortTag: meta.comfortTag || null,
    confidence: meta.confidence || null,
    bandHint: meta.bandHint || "dual",
    gpuHint: meta.gpuHint || null,
    proxyHint: meta.proxyHint || null,
    earnHint: meta.earnHint || null,
    memoryHint: meta.memoryHint || null
  };
}

function summarizeRuntimeTick(runtimeTick) {
  if (!runtimeTick) return null;
  return {
    logicalClock: runtimeTick.logicalClock || null,
    planSummary: runtimeTick.multiPlanSummary || null,
    tick: runtimeTick.tick || null
  };
}

function summarizeBinaryFrames(binaryFrames) {
  if (!binaryFrames) return null;
  const execIds = Object.keys(binaryFrames.executionFramesById || {});
  return {
    hasMultiPlanFrame: !!binaryFrames.multiPlanFrame,
    executionFrameCount: execIds.length,
    executionIds: execIds
  };
}

function summarizeNavState(navState) {
  if (!navState) return null;
  return {
    currentPageId: navState.currentPageId || null,
    targetPageId: navState.targetPageId || null,
    transitionState: navState.transitionState || null,
    lastReason: navState.lastReason || null,
    lastUpdatedTick: navState.lastUpdatedTick ?? null
  };
}

function summarizeThroughputPlan(plan) {
  if (!plan) return null;
  const waves = Array.isArray(plan.waves) ? plan.waves : [];
  return {
    version: plan.version || null,
    waveCount: waves.length,
    totalEntities: waves.reduce(
      (acc, w) => acc + (Array.isArray(w.entities) ? w.entities.length : 0),
      0
    )
  };
}

function summarizeFrames(frames) {
  if (!frames) return null;
  return {
    hasOneBandFrame: !!frames.oneBandFrame,
    hasContinuanceFrame: !!frames.continuanceFrame,
    hasBinaryFieldFrame: !!frames.binaryFieldFrame
  };
}

function buildTickAdvantageSummary({
  routing,
  overmindDecision,
  runtimeTick,
  binaryFrames,
  navState,
  throughputPlan,
  frames
}) {
  const routingSummary = summarizeRouting(routing);
  const overmindSummary = summarizeOvermindDecision(overmindDecision);
  const runtimeSummary = summarizeRuntimeTick(runtimeTick);
  const binarySummary = summarizeBinaryFrames(binaryFrames);
  const navSummary = summarizeNavState(navState);
  const throughputSummary = summarizeThroughputPlan(throughputPlan);
  const frameSummary = summarizeFrames(frames);

  return {
    routing: routingSummary,
    overmind: overmindSummary,
    runtime: runtimeSummary,
    binary: binarySummary,
    navigation: navSummary,
    throughput: throughputSummary,
    frames: frameSummary
  };
}

// ============================================================================
//  CORE SCHEDULER ORGAN — v33 IMMORTAL HYPERFRAME UNIVERSE ONEBAND
// ============================================================================

export const PulseSchedulerV33 = (config = {}) => {

  // ------------------------------------------------------------
  // INTERNAL STATE (replaces "this")
  // ------------------------------------------------------------
  const state = {}

  state.config = {
    enableRouting: true,
    enableOvermind: true,
    enableRuntimeTick: true,
    defaultGlobalPolicy: {},
    defaultMaxTicks: 3,
    defaultStopOnWorldLens: ["unsafe"],
    defaultPrewarmHint: "scheduler-init-v33",
    defaultBandMode: "oneband",
    defaultBandKind: "dual",
    onTick: null,
    onPipeline: null,
    ...config
  }

  

  // ------------------------------------------------------------
  // MACRO TICK
  // ------------------------------------------------------------
  const runMacroTick = async ({
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    userRequest = null,
    dualBand = null,
    pulseband = PulseBand,
    pulseTouch = null,
    scheduleId = null,
    tickIndex = 0,
    prewarmHint = null,
    cacheHint = null
  }) => {

    const reasoning = []
    const effectiveScheduleId = scheduleId || buildScheduleId()

    reasoning.push(
      `PulseScheduler-v33-IMMORTAL-HYPERFRAME-UNIVERSE: macro tick #${tickIndex} (schedule=${effectiveScheduleId}).`
    )

    const policy =
      globalContinuancePolicy || state.config.defaultGlobalPolicy || {}

    const effectiveDualBand = {
      mode: state.config.defaultBandMode,
      bandKind: state.config.defaultBandKind,
      ...(dualBand || {})
    }

    // ------------------------------------------------------------
    // 1) ROUTING
    // ------------------------------------------------------------
    let routing = null

    if (state.config.enableRouting && userRequest) {
      routing = routeAIRequest(userRequest, {
        ...effectiveDualBand,
        pulseTouch
      })

      reasoning.push(
        `Routing: persona=${routing.personaId || "none"}, safetyMode=${
          routing.personaSafety.safetyMode || "standard"
        }, archetypePrimaryPage=${routing.archetypes.primaryPage || "none"}, dualBandMode=${
          routing.dualBand.mode || state.config.defaultBandMode
        }.`
      )
    } else {
      reasoning.push("Routing: disabled or no userRequest provided.")
    }

    // ------------------------------------------------------------
    // 2) OVERMIND
    // ------------------------------------------------------------
    let overmindDecision = null

    if (state.config.enableOvermind && routing) {
      const intent = {
        type: userRequest.intent || "analyze",
        domain: userRequest.domain || null,
        scope: userRequest.scope || null,
        safetyMode: routing.personaSafety.safetyMode || "standard",
        keywords: userRequest.keywords || [],
        pulseTouch
      }

      const context = {
        domain: userRequest.domain || null,
        scope: userRequest.scope || null,
        safetyMode: routing.personaSafety.safetyMode || "standard",
        personaId: routing.personaId,
        archetypePrimaryPage: routing.archetypes.primaryPage || null,
        dualBand: routing.dualBand || effectiveDualBand,
        pulseTouch
      }

      const candidates = [
        {
          text:
            userRequest.rawText ||
            userRequest.prompt ||
            "No explicit user text provided.",
          routing,
          pulseTouch
        }
      ]

      overmindDecision = await state.overmind.process({
        intent,
        context,
        candidates,
        options: { mode: "normal" }
      })

      reasoning.push(
        `Overmind: worldLens=${overmindDecision.meta.worldLens || "none"}, safetyStatus=${
          overmindDecision.meta.safetyStatus || "unknown"
        }, bandHint=${overmindDecision.meta.bandHint || "dual"}.`
      )
    } else {
      reasoning.push("Overmind: disabled or routing missing.")
    }

    // ------------------------------------------------------------
    // 3) RUNTIME TICK
    // ------------------------------------------------------------
    let runtimeTickResult = null
    let binaryFrames = null
    let navState = null
    let throughputPlan = null
    let frames = {
      oneBandFrame: null,
      continuanceFrame: null,
      binaryFieldFrame: null
    }

    if (state.config.enableRuntimeTick) {
      const runtimeResult = runPulseTick({
        instanceContexts: instances,
        currentStatesById,
        globalContinuancePolicy: policy,
        prewarmHint: prewarmHint || state.config.defaultPrewarmHint,
        cacheHint: cacheHint || null,
        pulseTouch
      })

      runtimeTickResult =
        runtimeResult instanceof PulseRuntimeTickResult
          ? runtimeResult
          : runtimeResult

      binaryFrames = runtimeTickResult.binaryFrames || null

      let runtimeState = null
      try {
        runtimeState =
          typeof getRuntimeStateV30 === "function"
            ? getRuntimeStateV30()
            : null
      } catch {
        runtimeState = null
      }

      navState =
        runtimeState.navState ||
        runtimeState.planSummary.navState ||
        null

      throughputPlan =
        runtimeState.binaryThroughputPlan ||
        runtimeState.worldRuntimeFrame.binaryThroughputPlan ||
        null

      frames.oneBandFrame =
        runtimeState.oneBandFrame ||
        runtimeState.worldRuntimeFrame.oneBandFrame ||
        null

      frames.continuanceFrame =
        runtimeState.continuanceFrame ||
        runtimeState.worldRuntimeFrame.continuanceFrame ||
        null

      frames.binaryFieldFrame =
        runtimeState.binaryFieldFrame ||
        runtimeState.worldRuntimeFrame.binaryFieldFrame ||
        null

      reasoning.push(
        `Runtime: logicalClock=${runtimeTickResult.logicalClock}, planSummary=${
          runtimeTickResult.multiPlanSummary || "none"
        }, binaryFrames=${binaryFrames ? "yes" : "no"}, navState=${
          navState.currentPageId || "none"
        }→${navState.targetPageId || "none"} (${navState.transitionState || "idle"}), throughputPlan=${
          throughputPlan ? "yes" : "no"
        }.`
      )
    } else {
      reasoning.push("Runtime: disabled by config.")
    }

    // ------------------------------------------------------------
    // 4) ADVANTAGE SUMMARY
    // ------------------------------------------------------------
    const advantageSummary = buildTickAdvantageSummary({
      routing,
      overmindDecision,
      runtimeTick: runtimeTickResult,
      binaryFrames,
      navState,
      throughputPlan,
      frames
    })

    // ------------------------------------------------------------
    // 5) META SUMMARY
    // ------------------------------------------------------------
    const meta = Object.freeze({
      schedulerMeta: PulseSchedulerMetaV33,
      scheduleId: effectiveScheduleId,
      tickIndex,
      routingPersonaId: routing.personaId || null,
      routingArchetypePrimaryPage: routing.archetypes.primaryPage || null,
      routingSafetyMode: routing.personaSafety.safetyMode || null,
      routingDualBandMode:
        routing.dualBand.mode || state.config.defaultBandMode,
      routingBandKind:
        routing.dualBand.bandKind || state.config.defaultBandKind,
      routingGpuMode: routing.gpuMode || null,
      routingProxyMode: routing.proxyMode || null,
      routingEarnMode: routing.earnMode || null,
      routingMemoryMode: routing.memoryMode || null,
      overmindWorldLens: overmindDecision.meta.worldLens || null,
      overmindSafetyStatus: overmindDecision.meta.safetyStatus || null,
      overmindComfortTag: overmindDecision.meta.comfortTag || null,
      overmindBandHint: overmindDecision.meta.bandHint || "dual",
      runtimePlanSummary: runtimeTickResult.multiPlanSummary || null,
      runtimeLogicalClock: runtimeTickResult.logicalClock || null,
      runtimeTickIndex: runtimeTickResult.tick || null,
      binaryFramesSummary: summarizeBinaryFrames(binaryFrames),
      navStateSummary: summarizeNavState(navState),
      throughputPlanSummary: summarizeThroughputPlan(throughputPlan),
      frameSummary: summarizeFrames(frames),
      advantageSummary,
      pulseTouch,
      notes: reasoning
    })

    const result = new SchedulerResultV33({
      scheduleId: effectiveScheduleId,
      tickIndex,
      routing,
      overmindDecision,
      runtimeTick: runtimeTickResult,
      binaryFrames,
      navState,
      throughputPlan,
      frames,
      meta
    })

    if (typeof state.config.onTick === "function") {
      try {
        state.config.onTick(result)
      } catch {}
    }

    return result
  }

  // ------------------------------------------------------------
  // PIPELINE
  // ------------------------------------------------------------
  const runPipeline = async ({
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    userRequest = null,
    dualBand = null,
    pulseTouch = null,
    maxTicks = null,
    prewarmHint = null
  }) => {

    const scheduleId = buildScheduleId()
    const ticks = []
    const reasoning = []

    const effectiveMaxTicks =
      typeof maxTicks === "number" && maxTicks > 0
        ? maxTicks
        : state.config.defaultMaxTicks

    const effectiveStopOnWorldLens =
      Array.isArray(state.config.defaultStopOnWorldLens)
        ? state.config.defaultStopOnWorldLens
        : ["unsafe"]

    let currentStateById = { ...currentStatesById }

    let firstWorldLens = null
    let lastWorldLens = null

    let firstBinarySummary = null
    let lastBinarySummary = null

    let firstNavStateSummary = null
    let lastNavStateSummary = null

    let firstThroughputSummary = null
    let lastThroughputSummary = null

    let cacheHits = 0
    let cacheMisses = 0

    for (let tickIndex = 0; tickIndex < effectiveMaxTicks; tickIndex++) {
      const cacheHint = tickIndex === 0 ? "miss" : "hit"

      if (cacheHint === "hit") cacheHits++
      if (cacheHint === "miss") cacheMisses++

      const tickResult = await runMacroTick({
        instances,
        currentStatesById: currentStateById,
        globalContinuancePolicy,
        userRequest,
        dualBand,
        pulseTouch,
        scheduleId,
        tickIndex,
        prewarmHint:
          prewarmHint ||
          (tickIndex === 0 ? "pipeline-start-v33" : "pipeline-continue-v33"),
        cacheHint
      })

      ticks.push(tickResult)

      const worldLens = tickResult.overmindDecision.meta.worldLens || null
      const binarySummary = summarizeBinaryFrames(tickResult.binaryFrames)
      const navSummary = summarizeNavState(tickResult.navState)
      const throughputSummary = summarizeThroughputPlan(
        tickResult.throughputPlan
      )

      if (tickIndex === 0) {
        firstWorldLens = worldLens
        firstBinarySummary = binarySummary
        firstNavStateSummary = navSummary
        firstThroughputSummary = throughputSummary
      }

      lastWorldLens = worldLens
      lastBinarySummary = binarySummary
      lastNavStateSummary = navSummary
      lastThroughputSummary = throughputSummary

      if (worldLens && effectiveStopOnWorldLens.includes(worldLens)) {
        reasoning.push(
          `Pipeline: stopping early on worldLens="${worldLens}" (tickIndex=${tickIndex}).`
        )
        break
      }

      if (tickResult.runtimeTick.executionResultsById) {
        const nextState = { ...currentStateById }
        for (const [instanceId, execResult] of Object.entries(
          tickResult.runtimeTick.executionResultsById
        )) {
          if (execResult.newState) {
            nextState[instanceId] = execResult.newState
          }
        }
        currentStateById = nextState
      }
    }

    const meta = Object.freeze({
      schedulerMeta: PulseSchedulerMetaV33,
      scheduleId,
      totalTicks: ticks.length,
      maxTicksRequested: effectiveMaxTicks,
      stopOnWorldLens: effectiveStopOnWorldLens,
      firstWorldLens,
      lastWorldLens,
      firstBinarySummary,
      lastBinarySummary,
      firstNavStateSummary,
      lastNavStateSummary,
      firstThroughputSummary,
      lastThroughputSummary,
      cacheHits,
      cacheMisses,
      pulseTouch,
      notes: reasoning
    })

    const pipelineResult = new SchedulerPipelineResultV33({
      scheduleId,
      ticks,
      finalStateById: currentStateById,
      meta
    })

    if (typeof state.config.onPipeline === "function") {
      try {
        state.config.onPipeline(pipelineResult)
      } catch {}
    }

    return pipelineResult
  }

  // ------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------
  return {
    meta: PulseSchedulerMetaV33,
    runMacroTick,
    runPipeline
  }
}
// ============================================================================
//  PUBLIC API — Create Scheduler Organ v33 IMMORTAL HYPERFRAME UNIVERSE ONEBAND
// ============================================================================

export const createPulseSchedulerV33 = (config = {}) => {
  const core = PulseSchedulerV33(config)

  return Object.freeze({
    meta: PulseSchedulerMetaV33,
    runMacroTick: payload => core.runMacroTick(payload),
    runPipeline: payload => core.runPipeline(payload)
  })
}

export const pulseSchedulerV33 = createPulseSchedulerV33()

// ============================================================================
// getPulseSchedulerContext-v33
// IMMORTAL-CONTINUANCE-ONEBAND-THROUGHPUT
// Unified context provider for PulseScheduler
// ============================================================================

export const getPulseSchedulerContextV33 = () => {
  const runtimeState = PulseRuntimeV30.getRuntimeStateV30() || null
  const powerSnapshot = PulsePowerAPIv32.getPulsePowerSnapshotV31() || null

  const navState =
    runtimeState.navState ||
    runtimeState.planSummary.navState ||
    runtimeState.execResults.navState ||
    powerSnapshot.state.navState ||
    null

  const continuance =
    runtimeState.continuance ||
    powerSnapshot.continuanceHints ||
    null

  const worldRuntimeFrame =
    runtimeState.worldRuntimeFrame ||
    powerSnapshot.binaryField.worldRuntimeFrame ||
    null

  const predictions =
    powerSnapshot.predictions ||
    runtimeState.predictions ||
    { nextPages: [], nextRoutes: [] }

  const oneBandLanes =
    powerSnapshot.state.oneBandLanes ||
    runtimeState.oneBandLanes ||
    null

  const binaryField =
    powerSnapshot.binaryField ||
    runtimeState.binaryField ||
    null

  const planSummary =
    runtimeState.planSummary ||
    powerSnapshot.planSummary ||
    null

  const throughputPlan =
    runtimeState.binaryThroughputPlan ||
    worldRuntimeFrame.binaryThroughputPlan ||
    null

  const getDNA = name =>
    PulseSpecsDNAGenome.getDNA(name) || null

  return {
    ok: true,
    version: "v33-IMMORTAL-CONTINUANCE-ONEBAND-THROUGHPUT",

    runtimeState,
    powerSnapshot,
    navState,
    continuance,
    worldRuntimeFrame,
    predictions,
    oneBandLanes,
    binaryField,
    planSummary,
    throughputPlan,

    getDNA
  }
}

export default getPulseSchedulerContextV33

// ============================================================================
// WORLD-FACING SCHEDULER WRAPPER — v33
// ============================================================================

export const createScheduler = (config = {}) => {
  const schedulerCore = createPulseSchedulerV33(config)
  const organisms = new Map()

  const registerOrganism = (organismId, organismHandle, options = {}) => {
    if (organisms.has(organismId)) {
      throw new Error(
        `Scheduler v33: organism '${organismId}' already registered.`
      )
    }

    organisms.set(organismId, { organismHandle, options })
    return organismId
  }

  const unregisterOrganism = organismId => organisms.delete(organismId)

  const tick = (tickContext = {}) => {
    const {
      globalContinuancePolicy = {},
      userRequest = null,
      dualBand = null,
      pulseTouch = null,
      prewarmHint = null,
      cacheHint = null
    } = tickContext

    const instanceContexts = []
    const currentStatesById = {}

    for (const [id, record] of organisms.entries()) {
      instanceContexts.push({
        instanceId: id,
        ...record.options
      })

      if (record.organismHandle.snapshot) {
        currentStatesById[id] = record.organismHandle.snapshot
      }
    }

    return schedulerCore.runMacroTick({
      instances: instanceContexts,
      currentStatesById,
      globalContinuancePolicy,
      userRequest,
      dualBand,
      pulseTouch,
      prewarmHint,
      cacheHint
    })
  }

  const runPipeline = (pipelineContext = {}) => {
    const {
      globalContinuancePolicy = {},
      userRequest = null,
      dualBand = null,
      pulseTouch = null,
      maxTicks = null,
      prewarmHint = null
    } = pipelineContext

    const instanceContexts = []
    const currentStatesById = {}

    for (const [id, record] of organisms.entries()) {
      instanceContexts.push({
        instanceId: id,
        ...record.options
      })

      if (record.organismHandle.snapshot) {
        currentStatesById[id] = record.organismHandle.snapshot
      }
    }

    return schedulerCore.runPipeline({
      instances: instanceContexts,
      currentStatesById,
      globalContinuancePolicy,
      userRequest,
      dualBand,
      pulseTouch,
      maxTicks,
      prewarmHint
    })
  }

  return Object.freeze({
    meta: PulseSchedulerMetaV33,
    registerOrganism,
    unregisterOrganism,
    tick,
    runPipeline
  })
}

PulseRealm.WorldScheduler = {
  createScheduler,
  getPulseSchedulerContextV33,
  pulseSchedulerV33,
  createPulseSchedulerV33,
  PulseSchedulerV33,
  SchedulerPipelineResultV33,
  SchedulerResultV33
}
PulseRealm.PulseScheduler = createScheduler;