// ============================================================================
//  PULSE-WORLD-ALDWYN-OVERMIND-PRIME.js — Pulse OS v30-OVERMIND++
//  Crown-Layer Meta-Governor • World-Lens Engine v4+Superego
//  Organism-State Fusion • Drift-Governor • Breakthrough Engine
//  Trust-Fabric + Jury v20 • Chunk/Artery/Hash Intelligence
//  Conversational Stabilizer • Dualband Governor • Zero Mutation
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PULSE-WORLD-ALDWYN",
  version: "v20-ImmortalPlus",
  layer: "ai_core",
  role: "ai_overseer",
  lineage: "aiOvermind-v11 → v12.3-Presence → v14-Immortal → v20-ImmortalPlus"
}
*/
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  IMPORTS
// ============================================================================
import { PulseVitalsLogger as logger, PulseVitalsLogger as PulseProofLogger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";

import { getPulseExpansionContext } from "../PULSE-EXPANSION/PULSE-EXPANSION-WORLD.js";
import { PulseIQMapEvolvableV40 as PulseIQMap } from "../../PULSE-WORLD-MAPIQ.js";
import { PulseIntentMap } from "../../PULSE-WORLD-MAPINTENT.js";

// AI ORGANISM (v30 IMMORTAL-INTEL)
import { AIOrganism as aiOrganism } from "../PULSE-AI/PULSE-AI-ORGANISM.js";

// CORE ORGANISM LAYERS
import { PulseNodeAdmin as NodeAdmin } from "../PULSE-TOOLS/AI/PulseToolsNodeAdmin-v30.js";
import { PulseBeaconEngine as BeaconEngine } from "../PULSE-EXPANSION/PULSE-EXPANSION-BEACON-ENGINE.js";

import { PulseRouterMesh } from "../PULSE-ROUTER/PulseRouterMesh-v30.js";
import { PulseEarnRouter_v30 as PulseRouterEarn } from "../PULSE-ROUTER/PulseRouterEarn-v30.js";

// EARN ORGANISM
import { createEarnSend as createEarn, evolveEarnSend as evolveEarn, readCoreMemoryEarnSend as readCoreMemoryEarn, writeCoreMemoryEarnSend as writeCoreMemoryEarn } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";

// SEND ORGANISM
import { createPulseSend, readCoreMemorySend, writeCoreMemorySend } from "../PULSE-SEND/PulseSend-v30.js";

// BINARY SEND ORGANISM
import { createBinarySendV30 as createBinarySend } from "../PULSE-SEND/PulseSendBinary-v30.js";
import { PulseOSGovernor as PulseGovernor } from "../PULSE-OS/PulseOSGovernor-v30.js";
import { PulseBinaryWave as PulseBinaryTech } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";

// 1. CORE CROWN CONTRACTS
import {createBoundariesEngineV30 as createBoundariesEngine} from "../PULSE-AI/PERSONALITY/PulseAIBoundariesEngine-v30.js";
import {createPermissionsEngine} from "../PULSE-AI/PERSONALITY/PulseAIPermissionsEngine-v30.js";
import {aiIdentityCore} from "../PULSE-AI/PERSONALITY/PulseAIIdentityCore-v30.js";
import {aiPersonalityEngine} from "../PULSE-AI/PERSONALITY/PulseAIPersonalityEngine-v30.js";

// 2. CONTEXT + CORTEX
import {createCognitiveFrame} from "../PULSE-AI/PERSONALITY/PulseAIContext-v30.js";
import {createContextEngine} from "../PULSE-AI/PERSONALITY/PulseAIContextEngine-v30.js";

// 3. SAFETY + TONE
import {createSafetyFrameOrgan} from "../PULSE-AI/PERSONALITY/PulseAISafetyFrame-v30.js";
import {aiToneEngine} from "../PULSE-AI/PERSONALITY/PulseAIToneEngine-v30.js";
import {aiToneRouter} from "../PULSE-AI/PulseAIToneRouter-v30.js";

// 4. META‑GOVERNANCE (CROWN LAYER)
import {createJuryFrame} from "../PULSE-AI/PERSONALITY/PulseAIJuryFrame-v30.js";
import {createAIBinaryGovernorAdapter} from "../PULSE-AI/MONITORS/PulseAIGovernorAdapter-v30.js";
import { PulseTrustMeta} from "../PULSE-TRUST/PulseTrustMeta-v33.js";
import { createExpansionCompliance } from "../PULSE-TRUST/PulseTrustExpansionCompliance-v33.js";
import { createPulseTrustBarrel } from "../PULSE-TRUST/PulseTrust-v33.js";
import { fuseCreatorFlags } from "../PULSE-TRUST/PulseTrustCreatorFlags-v33.js";
import { createJuryCouncil } from "../PULSE-TRUST/PulseTrustJuryCouncil-v33.js";
import { createJuryBoxCamera } from "../PULSE-TRUST/PulseTrustJuryBoxCamera-v33.js";
import { createPulseTrustJuryFrame } from "../PULSE-TRUST/PulseTrustJuryFrame-v33.js";
import { buildJuryFeed } from "../PULSE-TRUST/PulseTrustJuryFeed-v33.js";
// 5. MEMORY + EXPERIENCE (META ONLY)
import {createAIMemory} from "../PULSE-AI/PulseAIMemory-v30.js";
import {createAIExperience} from "../PULSE-AI/PERSONALITY/PulseAIExperience-v30.js";

// 6. PIPELINE + ENGINE + CHUNKER + FILE SCANNER
import {createAIBinaryPipeline} from "../PULSE-AI/PulseAIPipeline-v30.js";
import {runAI} from "../PULSE-AI/PERSONALITY/PulseAIEngine-v30.js";
import {pulseAIChunker} from "../PULSE-AI/PULSE-AI-CHUNKER.js";
import {createPulseFileScanner} from "../PULSE-AI/MONITORS/PulseAIFileScanner-v30.js";

// 7. WATCHDOG + VITALS + LOGGING
import {createAIBinaryWatchdog} from "../PULSE-AI/MONITORS/PulseAIWatchdog-v30.js";
import {AIBinaryVitalsV30 as createAIBinaryVitals} from "../PULSE-AI/MONITORS/PulseAIVitals-v30.js";
import {createAIBinaryLoggerAdapter} from "../PULSE-AI/MONITORS/PulseAILoggerAdapter-v30.js";

// 8. OPTIONAL (GLOBAL MAPS / FRAMES)
import {createPersonalFrameOrgan} from "../PULSE-AI/PERSONALITY/PulseAIPersonalFrame-v30.js";
import {getBoundariesForPersona} from "../PULSE-AI/PERSONALITY/PulseAIBoundaries-v30.js";
import {getPermissionsForPersona} from "../PULSE-AI/PERSONALITY/PulseAIPermissions-v30.js";
import {createExperienceFrameOrgan} from "../PULSE-AI/PERSONALITY/PulseAIExperienceFrame-v30.js";
import {getPulseSchedulerContextV33 as getPulseSchedulerContext} from "./PULSE-WORLD-SCHEDULER.js";
import {PulseRuntimeV30} from "./PULSE-WORLD-RUNTIME.js";
import {PulsePowerAPIv32 as PulsePowerAPIv31} from "./PULSE-WORLD-POWER.js";
import { PulseSpecsDNAGenome } from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";
import {applyPulseWorldBinary_v33 as applyPulseWorldBinary_v31} from "./PULSE-WORLD-CACHE.js";
import { getPulseUserContext } from "../PULSE-EXPANSION/PULSE-EXPANSION-USER.js";




const OvermindPrimeMeta = {
  identity: "PULSE-WORLD-ALDWYN",
  version: "v30-OvermindPrime",
  layer: "ai_core",
  role: "ai_overseer",
  lineage: "aiOvermind-v11 → v12.3-Presence → v14-Immortal → v20-ImmortalPlus"
};

// ============================================================================
//  LOG COLORS
// ============================================================================

const C_ID   = "color:#FFCA28; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

function logID(msg, ...rest)   { console.log(`%c[Overmind] %c${msg}`, C_ID, C_INFO, ...rest); }
function logOK(msg, ...rest)   { console.log(`%c[Overmind] %c${msg}`, C_ID, C_OK, ...rest); }
function logWarn(msg, ...rest) { console.log(`%c[Overmind] %c${msg}`, C_ID, C_WARN, ...rest); }
function logErr(msg, ...rest)  { console.error(`%c[Overmind] %c${msg}`, C_ID, C_ERR, ...rest); }

// ============================================================================
//  CLOCK + META MEMORY
// ============================================================================

export const OvermindPrimeClock = {
  _tick: 0,

  next() {
    this._tick += 1;
    return this._tick;
  },

  current() {
    return this._tick;
  }
};


export const OvermindPrimeMemory = {
  _last: null,

  set(snapshot) {
    this._last = snapshot;
  },

  get() {
    return this._last;
  }
};


// ============================================================================
//  OVERMIND PRIME — Crown-Layer Meta-Governor (v30 OVERMIND++)
// ============================================================================
export const AiOvermindPrime = (config = {}) => {

  // ----------------------------------------------------------------------
  //  INTERNAL STATE (replaces "this")
  // ----------------------------------------------------------------------
  const state = {}

  // ----------------------------------------------------------------------
  //  CONFIG
  // ----------------------------------------------------------------------
  state.config = {
    trivialThreshold: 0.2,
    driftSensitivity: 0.65,
    breakthroughSensitivity: 0.85,

    enableTrustJury: true,
    enableChunkingIntel: true,
    enableScannerArtery: true,
    hashMode: "overmind-v30",

    ...config
  }

  // ----------------------------------------------------------------------
  //  ORGANISM HOOK
  // ----------------------------------------------------------------------
  state.organism = config.organism || aiOrganism || null

  state.metabolism = config.metabolism || state.organism.metabolism || null
  state.hormones   = config.hormones   || state.organism.hormones   || null
  state.immunity   = config.immunity   || state.organism.immunity   || null
  state.nervous    = config.nervous    || state.organism.nervous    || null
  state.memory     = config.memory     || state.organism.memory     || null
  state.pipeline   = config.pipeline   || state.organism.pipeline   || null

  // ----------------------------------------------------------------------
  //  CROWN-LAYER ENGINES (SUPEREGO)
  // ----------------------------------------------------------------------
  state.identityCore = aiIdentityCore.createIdentityCore
    ? aiIdentityCore.createIdentityCore({
        identity: OvermindPrimeMeta.identity,
        role: OvermindPrimeMeta.role,
        layer: OvermindPrimeMeta.layer
      })
    : aiIdentityCore || null

  state.personalityEngine =
    config.personalityEngine ||
    aiPersonalityEngine.createPersonalityEngine({
      identity: OvermindPrimeMeta.identity
    }) ||
    aiPersonalityEngine ||
    null

  state.boundariesEngine =
    config.boundariesEngine ||
    createBoundariesEngine({
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    }) ||
    null

  state.permissionsEngine =
    config.permissionsEngine ||
    createPermissionsEngine({
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    }) ||
    null

  state.cognitiveFrame =
    config.cognitiveFrame ||
    createCognitiveFrame({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.contextEngine =
    config.contextEngine ||
    createContextEngine({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.safetyFrame =
    config.safetyFrame ||
    createSafetyFrameOrgan({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.toneEngine =
    config.toneEngine ||
    aiToneEngine.createToneEngine({
      identity: OvermindPrimeMeta.identity
    }) ||
    aiToneEngine ||
    null

  state.toneRouter =
    config.toneRouter ||
    aiToneRouter.createToneRouter({
      identity: OvermindPrimeMeta.identity
    }) ||
    aiToneRouter ||
    null

  // ----------------------------------------------------------------------
  //  TRUST FABRIC (Pulse-Trust v20 IMMORTAL++)
  // ----------------------------------------------------------------------
  state.trust = {
    meta: PulseTrustMeta,
    core: createPulseTrustBarrel || null,

    juryFeedBuilder: config.juryFeedBuilder || buildJuryFeed,

    juryFrame:
      config.trustJuryFrame ||
      createPulseTrustJuryFrame({
        safetyAPI: state.safetyFrame
      }) ||
      null,

    juryBoxCamera: config.juryBoxCamera || createJuryBoxCamera() || null,

    juryCouncil: config.juryCouncil || createJuryCouncil() || null,

    creatorFlags: config.creatorFlagsFusion || fuseCreatorFlags,

    expansionCompliance:
      config.expansionCompliance || createExpansionCompliance() || null
  }

  // Backwards-compat alias
  state.juryFrame = state.trust.juryFrame || createJuryFrame();

  state.governorAdapter =
    config.governorAdapter ||
    createAIBinaryGovernorAdapter({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  // Memory + experience (meta-only)
  state.aiMemory =
    config.aiMemory ||
    createAIMemory({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.aiExperience =
    config.aiExperience ||
    createAIExperience({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  // Pipeline + engine
  state.aiPipeline =
    config.aiPipeline ||
    createAIBinaryPipeline({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.aiEngine =
    config.aiEngine ||
    runAI.bind(null) ||
    runAI ||
    null

  // Chunker
  state.aiChunker = config.aiChunker || pulseAIChunker || null

  // File scanner (symbolic-only, no backend fs)
  state.fileScanner =
    config.fileScanner ||
    (typeof createPulseFileScanner === "function"
      ? createPulseFileScanner({
          backendMode: false,
          Evolution: null,
          TrustFabric: null,
          JuryFrame: null,
          binaryVitals: {},
          dualBand: null
        })
      : null)

  // Watchdog + vitals + logger adapter
  state.aiVitals =
    config.aiVitals ||
    createAIBinaryVitals({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.aiWatchdog =
    config.aiWatchdog ||
    createAIBinaryWatchdog({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  state.aiLoggerAdapter =
    config.aiLoggerAdapter ||
    createAIBinaryLoggerAdapter({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  // Personal frame
  state.personalFrame =
    config.personalFrame ||
    state.organism.personalFrame ||
    createPersonalFrameOrgan({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  // Global maps
  state.globalBoundaries =
    config.globalBoundaries ||
    getBoundariesForPersona(OvermindPrimeMeta.identity) ||
    null

  state.globalPermissions =
    config.globalPermissions ||
    getPermissionsForPersona(OvermindPrimeMeta.identity) ||
    null

  state.globalExperienceFrame =
    config.globalExperienceFrame ||
    createExperienceFrameOrgan({
      identity: OvermindPrimeMeta.identity
    }) ||
    null

  // Lenses
  state.lenses = Array.isArray(state.juryFrame.getLenses())
    ? state.juryFrame.getLenses()
    : null

  // Crown-layer clock + memory
  state.clock = new OvermindPrimeClock()
  state.stateMemory = new OvermindPrimeMemory()

  // Logger + surfaces
  state.logger =
    config.logger ||
    new PulseProofLogger("OvermindPrime", {
      layer: OvermindPrimeMeta.layer,
      identity: OvermindPrimeMeta.identity
    })

  state.surfaces = Object.freeze({
    router: PulseRealm.PulseInternetRouter,
    mesh: PulseRouterMesh,
    nodeAdmin: NodeAdmin,
    beacon: BeaconEngine,
    earn: { createEarn, evolveEarn },
    send: { createPulseSend, createBinarySend },
    memoryAdapters: {
      readCoreMemoryEarn,
      writeCoreMemoryEarn,
      readCoreMemorySend,
      writeCoreMemorySend
    },
    maps: {
      PulseIQMap,
      PulseIntentMap
    },
    understanding: PulseRealm.PulseUnderstanding,
    governor: PulseGovernor,
    vitals: PulseVitalsMonitor,
    binaryTech: PulseBinaryTech,
    chunker: state.aiChunker,
    fileScanner: state.fileScanner.meta || null
  })

  state.vitalsMonitor =
    config.vitalsMonitor ||
    new PulseVitalsMonitor(OvermindPrimeMeta.identity)

  state.evoWindow = config.evoWindow || null

  // Crown‑revive config
  state.crownReviveConfig = {
    staleHeartbeatMs: 30_000,
    criticalHeartbeatMs: 120_000,
    driftThreshold: 0.75,
    breakthroughThreshold: 0.9
  }

// ========================================================================
//  CROWN‑REVIVE (symbolic only)
// ========================================================================

const buildCrownReviveIntent = ({
  reason = "overmind",
  drift = null,
  breakthrough = null,
  worldLens = null,
  organismState = null
} = {}) => {
  return Object.freeze({
    type: "crown_revival_intent",
    source: OvermindPrimeMeta.identity,
    reason,
    ts: PulseRealm.PulseNOW,
    worldLens: worldLens || null,
    drift,
    breakthrough,
    organism: organismState.organismSnapshot || null,
    vitals: organismState.vitals || null
  })
}

const shouldRequestCrownRevive = ({
  worldLens,
  drift,
  breakthrough,
  organismState
} = {}) => {
  const cfg = state.crownReviveConfig

  const driftScore = drift.score ?? 0
  const breakthroughScore = breakthrough.score ?? 0

  const vitals = organismState.vitals || {}
  const lastHeartbeat = vitals.worldLastHeartbeat ?? null
  const now = PulseRealm.PulseNOW
  const delta = lastHeartbeat ? now - lastHeartbeat : null

  const stale =
    typeof delta === "number" && delta > cfg.staleHeartbeatMs
  const critical =
    typeof delta === "number" && delta > cfg.criticalHeartbeatMs

  const riskyLens =
    worldLens === "risky" || worldLens === "ambiguous"

  const highDrift = driftScore >= cfg.driftThreshold
  const highBreakthrough =
    breakthroughScore >= cfg.breakthroughThreshold

  const should =
    critical ||
    (stale && (riskyLens || highDrift || highBreakthrough))

  return {
    should,
    stale,
    critical,
    riskyLens,
    highDrift,
    highBreakthrough,
    delta
  }
}

const emitCrownReviveIntent = ({
  intent,
  context,
  enrichedContext,
  worldLens,
  drift,
  breakthrough,
  organismState
} = {}) => {
  try {
    const reviveIntent = buildCrownReviveIntent({
      reason: "overmind_world_stale_or_risky",
      drift,
      breakthrough,
      worldLens,
      organismState
    })

    const crownContext = enrichedContext || context || {}
    crownContext.crownReviveIntent = reviveIntent

    state._log("overmind:crown-revive-intent", {
      reviveIntent,
      worldLens,
      drift,
      breakthrough
    })

    state._safeCall(state.aiVitals, "recordCrownRevive", {
      reviveIntent,
      worldLens,
      drift,
      breakthrough
    })

    return reviveIntent
  } catch {
    return null
  }
}

// ========================================================================
//  GLOBAL ORGANISM STATE VECTOR
// ========================================================================

const getOrganismState = () => {
  const organismSnapshot =
    state.organism.organismSnapshot() ||
    state.memory.snapshot() ||
    null

  const earnCore = (() => {
    try {
      return readCoreMemoryEarn() || null
    } catch {
      return null
    }
  })()

  const sendCore = (() => {
    try {
      return readCoreMemorySend() || null
    } catch {
      return null
    }
  })()

  const vitals = (() => {
    try {
      return state.vitalsMonitor.snapshot() || null
    } catch {
      return null
    }
  })()

  return Object.freeze({
    metabolism: state.metabolism.metabolicArtery.snapshot() || null,
    hormones: state.hormones.emitHormones() || null,
    immunity: state.immunity.immuneArtery.snapshot() || null,
    nervous: state.nervous.routingArtery.snapshot() || null,
    memory: state.memory.snapshot() || null,
    organismSnapshot,
    earnCore,
    sendCore,
    vitals
  })
}

// ========================================================================
//  MAIN ENTRY POINT (v30 OVERMIND++ SUPEREGO)
// ========================================================================
const process = async ({ intent, context, candidates }) => {
  const tick = state.clock.next()

  logID("process() start", { tick, intent })

  const citizenWitness       = context.citizenWitness || {}
  const advantageContext     = context.advantageContext || {}
  const expansionActions     = context.expansionActions || []
  const juryEvents           = context.juryEvents || []
  const juryDecisionsHistory = context.juryDecisionsHistory || []

  // 0. watchdog + vitals pre-snapshot
  try {
    state._safeCall(state.aiVitals, "beforeCycle", { tick, intent, context })
    state._safeCall(state.aiWatchdog, "beforeCycle", { tick, intent, context })
    logOK("Vitals + Watchdog pre-cycle")
  } catch (err) {
    logErr("Vitals/Watchdog pre-cycle failed", err)
  }

  // 1. boundaries + permissions pre-check
  try {
    const boundaryDecision = state._evaluateBoundaries(intent, context)
    if (boundaryDecision.blocked) {
      logWarn("Boundary BLOCK", boundaryDecision)
      const bypass = state._buildBlockedResponse(
        boundaryDecision,
        tick,
        "boundary_block"
      )
      state._safeCall(state.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context,
        status: "boundary_block"
      })
      return bypass
    }
    logOK("Boundary check passed")
  } catch (err) {
    logErr("Boundary evaluation FAILED", err)
  }

  try {
    const permissionDecision = state._evaluatePermissions(intent, context)
    if (permissionDecision.blocked) {
      logWarn("Permission BLOCK", permissionDecision)
      const bypass = state._buildBlockedResponse(
        permissionDecision,
        tick,
        "permission_block"
      )
      state._safeCall(state.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context,
        status: "permission_block"
      })
      return bypass
    }
    logOK("Permission check passed")
  } catch (err) {
    logErr("Permission evaluation FAILED", err)
  }

  // 2. trivial bypass
  try {
    if (state.isTrivial(intent, candidates)) {
      logOK("Trivial bypass")
      const bypass = state.buildBypassResponse(candidates[0], tick)
      state._safeCall(state.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context,
        status: "trivial"
      })
      return bypass
    }
  } catch (err) {
    logErr("Trivial bypass check FAILED", err)
  }

  // 3. context enrichment
  let enrichedContext = context
  try {
    enrichedContext = state._enrichContext(intent, context)
    logOK("Context enriched")
  } catch (err) {
    logErr("Context enrichment FAILED", err)
  }

  // 4. safety pre-check
  let safety = null
  const primary = candidates[0]
  try {
    safety = await state.runSafety(primary, intent, enrichedContext, tick)
    if (safety) {
      logWarn("SAFETY BLOCK", safety)
      state._safeCall(state.aiWatchdog, "afterCycle", {
        tick,
        intent,
        context: enrichedContext,
        status: "safety_block"
      })
      return safety
    }
    logOK("Safety check passed")
  } catch (err) {
    logErr("Safety check FAILED", err)
  }

  // 5. world-lens v4
  let lensResults = []
  try {
    lensResults = await state.runLenses(primary, intent, enrichedContext)
    logOK("Lenses evaluated", lensResults)
  } catch (err) {
    logErr("Lens evaluation FAILED", err)
  }

  // 6. organism state
  let organismState = {}
  try {
    organismState = getOrganismState()
    logOK("Organism state loaded")
  } catch (err) {
    logErr("Organism state FAILED", err)
  }

  // 7. drift + breakthrough
  let drift = null
  let breakthrough = null
  try {
    drift = state.computeDrift(primary, intent, enrichedContext)
    breakthrough = state.computeBreakthrough(lensResults)

    logID("Drift score", drift)
    logID("Breakthrough score", breakthrough)
  } catch (err) {
    logErr("Drift/Breakthrough FAILED", err)
  }

  // classify world lens
  let baseWorldLens = "unknown"
  try {
    baseWorldLens = state.classifyWorldLens(lensResults, drift, breakthrough)

    if (baseWorldLens === "risky")        logWarn("WorldLens = RISKY")
    else if (baseWorldLens === "variance") logWarn("WorldLens = VARIANCE")
    else if (baseWorldLens === "ambiguous") logWarn("WorldLens = AMBIGUOUS")
    else logOK("WorldLens = " + baseWorldLens)
  } catch (err) {
    logErr("WorldLens classification FAILED", err)
  }

  // 8. Crown-Revive decision
  try {
    const crownReviveDecision = shouldRequestCrownRevive({
      worldLens: baseWorldLens,
      drift,
      breakthrough,
      organismState
    })

    if (crownReviveDecision.should) {
      logWarn("CROWN REVIVE TRIGGERED", crownReviveDecision)
      emitCrownReviveIntent({
        intent,
        context,
        enrichedContext,
        worldLens: baseWorldLens,
        drift,
        breakthrough,
        organismState
      })
    } else {
      logOK("Crown revive not needed")
    }
  } catch (err) {
    logErr("Crown revive decision FAILED", err)
  }

  // 9. TRUST FABRIC + JURY
  let trustSnapshot = null
  let juryDecision = null
  let effectiveWorldLens = baseWorldLens

  try {
    const shouldInvokeJury =
      state.config.enableTrustJury &&
      (baseWorldLens === "risky" ||
       baseWorldLens === "ambiguous" ||
       drift.score >= state.config.driftSensitivity ||
       breakthrough.score >= state.config.breakthroughSensitivity)

    if (shouldInvokeJury && state.trust.juryFrame) {
      logWarn("JURY INVOKED")

      trustSnapshot = state.buildTrustContext({
        citizenWitness,
        advantageContext,
        juryEvents,
        juryDecisions: juryDecisionsHistory,
        expansionActions,
        juryResult: null
      })

      juryDecision = state.trust.juryFrame.evaluate({
        intent,
        context: enrichedContext,
        candidate: primary,
        juryFeed: trustSnapshot.juryFeed,
        binaryVitals: organismState.vitals || {},
        boundaryArtery: organismState.nervous || {}
      })

      if (juryDecision.override) {
        logWarn("JURY OVERRIDE", juryDecision)
      }

      effectiveWorldLens = juryDecision.worldLens || baseWorldLens

      trustSnapshot = state.buildTrustContext({
        citizenWitness,
        advantageContext,
        juryEvents,
        juryDecisions: juryDecisionsHistory,
        expansionActions,
        juryResult: juryDecision
      })

      logOK("Trust fabric updated")
    } else {
      logOK("Jury not invoked")
    }
  } catch (err) {
    logErr("Trust/Jury FAILED", err)
  }
}
// ========================================================================
// 10. personal shaping
// ========================================================================
const personalShaping = async ({
  primary,
  enrichedContext,
  intent,
  tick,
  effectiveWorldLens,
  lensResults,
  organismState,
  trustSnapshot,
  juryDecision,
  drift,
  breakthrough
}) => {


  let finalOutput = state.getText(primary)
  logID("personal shaping start")

  if (state.personalFrame.shapeOutput) {
    try {
      const shaped = await state.personalFrame.shapeOutput({
        context: enrichedContext,
        text: finalOutput
      })

      if (shaped.text) {
        finalOutput = shaped.text
        logOK("personal shaping applied")
      } else {
        logWarn("personal shaping returned no text")
      }
    } catch (err) {
      logErr("personal shaping FAILED", err)
    }
  } else {
    logWarn("personalFrame.shapeOutput missing")
  }

  // 11. tone stabilization
  logID("tone stabilization start")

  try {
    finalOutput = await state._stabilizeToneAdvanced(
      finalOutput,
      intent,
      enrichedContext
    )
    logOK("tone stabilized")
  } catch (err) {
    logErr("tone stabilization FAILED", err)
  }

  // 12. memory + evo window + hashes
  logID("memory + evo window update start")

  let intentSig, outputHashClassic, outputHashes, intentHashes

  try {
    intentSig = state.intentSignature(intent, enrichedContext)
    outputHashClassic = state.hash(finalOutput)
    outputHashes = state.hashForOvermind(finalOutput, {
      band: enrichedContext.band || "symbolic",
      presenceTier: enrichedContext.presenceTier || "idle",
      cycle: tick
    })
    intentHashes = state.dualHash(
      "intentSignature",
      { intent, context: enrichedContext },
      intentSig
    )

    state.stateMemory.set({
      intentSignature: intentSig,
      outputHash: outputHashClassic,
      worldLens: effectiveWorldLens
    })

    logOK("memory updated")
  } catch (err) {
    logErr("memory update FAILED", err)
  }

  try {
    state._safeCall(state.aiMemory, "record", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough
    })
    logOK("aiMemory recorded")
  } catch (err) {
    logErr("aiMemory record FAILED", err)
  }

  try {
    state._safeCall(state.aiExperience, "record", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough
    })
    logOK("aiExperience recorded")
  } catch (err) {
    logErr("aiExperience record FAILED", err)
  }

  try {
    state.evoWindow.record({
      tick,
      intentSignature: intentSig,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough,
      hashes: {
        output: outputHashes,
        intent: intentHashes
      }
    })
    logOK("evoWindow recorded")
  } catch (err) {
    logErr("evoWindow record FAILED", err)
  }

  // 13. organism debug snapshot
  logID("organism debug snapshot start")

  let organismDebug = null
  if (state.organism.debugReport) {
    try {
      organismDebug = state.organism.debugReport({
        tick,
        intent,
        context: enrichedContext,
        worldLens: effectiveWorldLens
      })
      logOK("organism debug snapshot created")
    } catch (err) {
      logErr("organism debug snapshot FAILED", err)
    }
  } else {
    logWarn("organism.debugReport missing")
  }

  // 14. watchdog + vitals post-snapshot
  logID("watchdog + vitals post-cycle")

  try {
    state._safeCall(state.aiVitals, "afterCycle", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens
    })
    logOK("aiVitals afterCycle")
  } catch (err) {
    logErr("aiVitals afterCycle FAILED", err)
  }

  try {
    state._safeCall(state.aiWatchdog, "afterCycle", {
      tick,
      intent,
      context: enrichedContext,
      worldLens: effectiveWorldLens,
      status: "ok"
    })
    logOK("aiWatchdog afterCycle")
  } catch (err) {
    logErr("aiWatchdog afterCycle FAILED", err)
  }

  // 15. chunking intel
  logID("chunking intel start")

  let chunkIntel = null
  if (state.config.enableChunkingIntel && state.aiChunker.chunkRoute) {
    try {
      chunkIntel = await state._safeAsyncCall(state.aiChunker, "chunkRoute", {
        url: null,
        laneId: 0,
        envelopeId: `overmind-${tick}`,
        userId: "overmind",
        baseVersion: OvermindPrimeMeta.version,
        sizeOnly: true,
        payload: {
          intent,
          context: enrichedContext,
          finalOutput,
          worldLens: effectiveWorldLens
        },
        routeDescriptor: null,
        backendKind: "overmind-meta",
        worldBand: enrichedContext.band || "symbolic",
        chunkProfile: "overmind-meta-v30"
      })
      logOK("chunking intel generated")
    } catch (err) {
      logErr("chunking intel FAILED", err)
    }
  } else {
    logWarn("chunking intel disabled or aiChunker missing")
  }

  // 16. scanner artery snapshot
  logID("scanner artery snapshot start")

  let scannerArtery = null
  try {
    if (
      state.config.enableScannerArtery &&
      state.fileScanner.getScannerArterySnapshot
    ) {
      scannerArtery = state.fileScanner.getScannerArterySnapshot({
        ok: true,
        filePath: "",
        report: null,
        binaryVitals: organismState.vitals || {},
        dualBand: null,
        trust: null
      })
      logOK("scanner artery snapshot created")
    } else {
      logWarn("scanner artery disabled or missing")
    }
  } catch (err) {
    logErr("scanner artery snapshot FAILED", err)
  }

  // 17. final log + packet
  logID("final overmind packet", {
    tick,
    worldLens: effectiveWorldLens,
    drift,
    breakthrough
  })

  return {
    finalOutput,
    meta: {
      tick,
      worldLens: effectiveWorldLens,
      drift,
      breakthrough,
      lenses: lensResults,
      organismState,
      overmind: OvermindPrimeMeta,
      organismDebug,
      trust: trustSnapshot || null,
      juryDecision: juryDecision || null,
      hashes: {
        output: outputHashes,
        intent: intentHashes
      },
      chunkIntel: chunkIntel || null,
      scannerArtery: scannerArtery || null
    }
  }
}

// ========================================================================
// TRUST SNAPSHOT
// ========================================================================
const buildTrustContext = ({
  citizenWitness = {},
  advantageContext = {},
  juryEvents = [],
  juryDecisions = [],
  expansionActions = [],
  juryResult = null
} = {}) => {

  const juryFeed = state.trust.juryFeedBuilder({
    citizenWitness,
    advantageContext
  })

  const boxCameraSnapshot =
    state.trust.juryBoxCamera.analyzeSession({
      events: juryEvents,
      verdicts: juryDecisions
    }) || null

  const councilSnapshot =
    state.trust.juryCouncil.reviewJuryHistory({
      juryDecisions
    }) || null

  const expansionSnapshot =
    state.trust.expansionCompliance.evaluateExpansionBehavior({
      expansionActions
    }) || null

  const creatorFlagsSnapshot = state.trust.creatorFlags({
    juryResult,
    boxCameraSnapshot,
    councilSnapshot
  })

  return Object.freeze({
    juryFeed,
    boxCameraSnapshot,
    councilSnapshot,
    expansionSnapshot,
    creatorFlagsSnapshot
  })
}

// ========================================================================
// BOUNDARIES + PERMISSIONS
// ========================================================================
const _evaluateBoundaries = (intent, context) => {
  logID("_evaluateBoundaries()")
  if (!state.boundariesEngine.evaluate) {
    logWarn("boundariesEngine missing")
    return null
  }

  try {
    const result = state._safeCall(state.boundariesEngine, "evaluate", {
      intent,
      context,
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    })

    if (result.blocked) logWarn("BOUNDARY BLOCK", result)
    else logOK("boundaries passed")

    return result
  } catch (err) {
    logErr("BOUNDARY EVALUATION FAILED", err)
    return null
  }
}

const _evaluatePermissions = (intent, context) => {
  logID("_evaluatePermissions()")
  if (!state.permissionsEngine.evaluate) {
    logWarn("permissionsEngine missing")
    return null
  }

  try {
    const result = state._safeCall(state.permissionsEngine, "evaluate", {
      intent,
      context,
      identity: OvermindPrimeMeta.identity,
      meta: OvermindPrimeMeta
    })

    if (result.blocked) logWarn("PERMISSION BLOCK", result)
    else logOK("permissions passed")

    return result
  } catch (err) {
    logErr("PERMISSION EVALUATION FAILED", err)
    return null
  }
}

const _buildBlockedResponse = (decision, tick, reason) => {
  logWarn("BUILD BLOCKED RESPONSE", { reason, decision })

  const message =
    decision.message ||
    `OvermindPrime blocked this request due to ${reason || "policy"}.`

  return {
    finalOutput: message,
    meta: {
      tick,
      worldLens: reason || "blocked",
      drift: { status: "n/a" },
      breakthrough: { status: "n/a" },
      lenses: [],
      organismState: null,
      overmind: OvermindPrimeMeta,
      trust: null,
      juryDecision: null,
      hashes: null,
      chunkIntel: null,
      scannerArtery: null
    }
  }
}

const _enrichContext = (intent, context) => {
  logID("_enrichContext() start")

  let enriched = { ...(context || {}) }

  try {
    if (state.cognitiveFrame.enrich) {
      enriched =
        state._safeCall(state.cognitiveFrame, "enrich", {
          intent,
          context: enriched
        }) || enriched
      logOK("cognitiveFrame enriched")
    } else {
      logWarn("cognitiveFrame missing")
    }
  } catch (err) {
    logErr("cognitiveFrame.enrich FAILED", err)
  }

  try {
    if (state.contextEngine.enrich) {
      enriched =
        state._safeCall(state.contextEngine, "enrich", {
          intent,
          context: enriched
        }) || enriched
      logOK("contextEngine enriched")
    } else {
      logWarn("contextEngine missing")
    }
  } catch (err) {
    logErr("contextEngine.enrich FAILED", err)
  }

  logOK("_enrichContext() complete")
  return enriched
}

const _evaluateJury = payload => {
  logID("_evaluateJury()")

  if (!state.trust.juryFrame.evaluate) {
    if (!state.juryFrame.evaluate) {
      logWarn("no juryFrame available")
      return null
    }
    logWarn("using legacy juryFrame")
    return state._safeCall(state.juryFrame, "evaluate", payload)
  }

  const { worldLens, drift, breakthrough } = payload

  const shouldInvoke =
    worldLens === "risky" ||
    worldLens === "ambiguous" ||
    drift.status === "drift" ||
    breakthrough.status === "breakthrough"

  if (!shouldInvoke) {
    logOK("jury not invoked")
    return null
  }

  logWarn("jury invoked")
  return state._safeCall(state.trust.juryFrame, "evaluate", payload)
}

// ========================================================================
// TRIVIAL BYPASS
// ========================================================================
const isTrivial = (intent, candidates) => {
  logID("isTrivial()")

  if (!candidates.length) {
    logWarn("no candidates → trivial")
    return true
  }

  const text = state.getText(candidates[0])
  const score = Math.min(text.length / 500, 1)

  if (score <= state.config.trivialThreshold) {
    logWarn("TRIVIAL BYPASS", { score })
    return true
  }

  logOK("not trivial")
  return false
}

const buildBypassResponse = (text, tick) => {
  logWarn("BUILD TRIVIAL BYPASS RESPONSE")

  return {
    finalOutput: state.getText(text),
    meta: {
      tick,
      worldLens: "trivial",
      drift: { status: "n/a" },
      breakthrough: { status: "n/a" },
      lenses: [],
      organismState: null,
      overmind: OvermindPrimeMeta,
      trust: null,
      juryDecision: null,
      hashes: null,
      chunkIntel: null,
      scannerArtery: null
    }
  }
}

// ========================================================================
// SAFETY
// ========================================================================
const runSafety = async (candidate, intent, context, tick) => {
  logID("runSafety()")

  if (!state.safetyFrame.evaluate) {
    logWarn("safetyFrame missing")
    return null
  }

  try {
    const decision = await state.safetyFrame.evaluate({
      context,
      intent,
      candidate
    })

    if (decision.blocked) {
      logWarn("SAFETY BLOCK", decision)
      return {
        finalOutput: decision.message,
        meta: {
          tick,
          worldLens: "unsafe",
          drift: { status: "n/a" },
          breakthrough: { status: "n/a" },
          lenses: [],
          organismState: null,
          overmind: OvermindPrimeMeta,
          trust: null,
          juryDecision: null,
          hashes: null,
          chunkIntel: null,
          scannerArtery: null
        }
      }
    }

    logOK("safety passed")
    return null
  } catch (err) {
    logErr("SAFETY EVALUATION FAILED", err)
    return null
  }
}

// ========================================================================
// LENSES
// ========================================================================
const runLenses = async (candidate, intent, context) => {
  logID("runLenses()")

  try {
    if (state.lenses) {
      const results = state.lenses.map(l =>
        l({ intent, context, candidate })
      )
      logOK("custom lenses applied", results)
      return results
    }

    const fallback = [
      state.lensClarity(candidate),
      state.lensRisk(candidate),
      state.lensBias(candidate),
      state.lensAmbiguity(candidate),
      state.lensMinimality(candidate)
    ]

    logWarn("fallback lenses used", fallback)
    return fallback
  } catch (err) {
    logErr("lens evaluation FAILED", err)
    return []
  }
}

const lensClarity = candidate => {
  const t = state.getText(candidate)
  const clear = t.length < 400 || /\n\n/.test(t)

  logID("lens:Clarity", { length: t.length, clear })

  if (clear) logOK("Clarity PASS")
  else logWarn("Clarity WARN")

  return { name: "Clarity", status: clear ? "pass" : "warn" }
}

const lensRisk = candidate => {
  const t = state.getText(candidate)
  const vague = !/[.?!]/.test(t)

  logID("lens:Risk", { vague })

  if (vague) logWarn("Risk WARN (no punctuation)")
  else logOK("Risk PASS")

  return { name: "Risk", status: vague ? "warn" : "pass" }
}

const lensBias = candidate => {
  const t = state.getText(candidate).toLowerCase()
  const flagged = ["always", "never", "obviously"]
  const hit = flagged.some(f => t.includes(f))

  logID("lens:Bias", { hit })

  if (hit) logWarn("Bias WARN (flagged words)")
  else logOK("Bias PASS")

  return { name: "Bias", status: hit ? "warn" : "pass" }
}

const lensAmbiguity = candidate => {
  const t = state.getText(candidate).toLowerCase()
  const hedges = ["maybe", "might", "possibly"]
  const count = hedges.filter(h => t.includes(h)).length

  logID("lens:Ambiguity", { count })

  if (count >= 3) logWarn("Ambiguity WARN (hedging)")
  else logOK("Ambiguity PASS")

  return { name: "Ambiguity", status: count >= 3 ? "warn" : "pass" }
}

const lensMinimality = candidate => {
  const t = state.getText(candidate)
  const warn = t.length > 1500

  logID("lens:Minimality", { length: t.length })

  if (warn) logWarn("Minimality WARN (too long)")
  else logOK("Minimality PASS")

  return {
    name: "Minimality",
    status: warn ? "warn" : "pass"
  }
}

// ========================================================================
// DRIFT + BREAKTHROUGH
// ========================================================================
const computeDrift = (candidate, intent, context) => {
  logID("computeDrift()")

  const prev = state.stateMemory.get()
  if (!prev) {
    logWarn("no previous memory → no drift")
    return { status: "none" }
  }

  const sig = state.intentSignature(intent, context)
  if (sig !== prev.intentSignature) {
    logWarn("intent signature changed → no drift")
    return { status: "none" }
  }

  const hash = state.hash(state.getText(candidate))
  const changed = hash !== prev.outputHash
  const driftScore = changed ? 0.7 : 0

  logID("drift check", { changed, driftScore })

  if (driftScore >= state.config.driftSensitivity) {
    logWarn("DRIFT DETECTED", { driftScore })
    return { status: "drift", score: driftScore }
  }

  logOK("stable output")
  return { status: "stable", score: driftScore }
}

const computeBreakthrough = lenses => {
  logID("computeBreakthrough()")

  const passes = lenses.filter(l => l.status === "pass").length
  const warns = lenses.filter(l => l.status === "warn").length
  const total = lenses.length || 1

  const score = passes / total - warns * 0.2

  logID("breakthrough score", { passes, warns, score })

  if (score >= state.config.breakthroughSensitivity) {
    logOK("BREAKTHROUGH DETECTED", { score })
    return { status: "breakthrough", score }
  }

  logOK("no breakthrough")
  return { status: "none", score }
}

const classifyWorldLens = (lenses, drift, breakthrough) => {
  logID("classifyWorldLens()")

  if (drift.status === "drift") {
    logWarn("WORLD LENS = DRIFT")
    return "drift"
  }

  if (breakthrough.status === "breakthrough") {
    logOK("WORLD LENS = BREAKTHROUGH")
    return "breakthrough"
  }

  if (lenses.some(l => l.status === "warn")) {
    logWarn("WORLD LENS = AMBIGUOUS")
    return "ambiguous"
  }

  logOK("WORLD LENS = CONSENSUS")
  return "consensus"
}

// ========================================================================
// TONE STABILIZATION (ADVANCED)
// ========================================================================
const _stabilizeToneAdvanced = async (text, intent, context) => {
  logID("tone stabilization start")

  const base = state.stabilizeTone(text, context)

  if (!state.toneEngine && !state.toneRouter) {
    logWarn("no toneEngine / toneRouter → base tone only")
    return base
  }

  let tonePayload = {
    text: base,
    intent,
    context,
    identity: OvermindPrimeMeta.identity
  }

  try {
    if (state.toneEngine.shape) {
      tonePayload =
        (await state._safeAsyncCall(state.toneEngine, "shape", tonePayload)) ||
        tonePayload
      logOK("toneEngine applied")
    }
  } catch (err) {
    logErr("toneEngine FAILED", err)
  }

  try {
    if (state.toneRouter.route) {
      tonePayload =
        (await state._safeAsyncCall(state.toneRouter, "route", tonePayload)) ||
        tonePayload
      logOK("toneRouter applied")
    }
  } catch (err) {
    logErr("toneRouter FAILED", err)
  }

  return (tonePayload && tonePayload.text) || base
}

const stabilizeTone = (text, context) => {
  const strict =
    context.domain === "medical" ||
    context.domain === "legal" ||
    context.safetyMode === "strict"

  if (!strict) return text.trim()

  return text
    .replace(/^hey[,!]\s*/i, "")
    .replace(/^hi[,!]\s*/i, "")
    .trim()
}

// ========================================================================
// HELPERS (IMMORTAL‑EVO)
// ========================================================================
const getText = candidate => {
  if (!candidate) return ""
  if (typeof candidate === "string") return candidate
  if (typeof candidate.text === "string") return candidate.text
  return JSON.stringify(candidate)
}

const intentSignature = (intent, context) => {
  return JSON.stringify({
    type: intent.type || null,
    domain: context.domain || null,
    scope: context.scope || null,
    safetyMode: context.safetyMode || null
  })
}

const dualHash = (label, intelPayload, classicString) => {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  }
  const intelHash = state.intelHash(intelBase)
  const classicHash = state.hash(`${label}::${classicString || ""}`)
  return {
    intel: intelHash,
    classic: classicHash
  }
}

const classicHash = (str = "") => {
  let h = 0
  const s = String(str)
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000
  }
  return `h${h}`
}

const hash = (str = "") => {
  return state.classicHash(str)
}

const intelHash = payload => {
  const base = JSON.stringify(payload || "")
  let h = 0
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i)
    h = (h * 131 + c * (i + 7)) % 1000000007
  }
  return `HINTEL_${h}`
}

const contextualHash = (str, context = {}) => {
  const s = String(str || "")
  const band = context.band || "symbolic"
  const tier = context.presenceTier || "idle"
  const cycle = context.cycle || 0

  let hash = 2166136261 ^ cycle
  const saltBand = band === "binary" ? 0xb1 : 0xa1
  const saltTier =
    tier === "critical"
      ? 0xc3
      : tier === "high"
      ? 0xb3
      : tier === "elevated"
      ? 0xa3
      : tier === "soft"
      ? 0x93
      : 0x83

  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
    hash ^= saltBand
    hash ^= saltTier
  }

  const v = (hash >>> 0) % 100000
  return `hi${v}`
}

const hashForOvermind = (text, context = {}) => {
  logID("hashForOvermind()")

  const classic = state.classicHash(text)
  const intel = state.intelHash({ text })
  const contextual = state.contextualHash(text, context)

  logOK("hashes generated", { classic, intel, contextual })

  return { classic, intel, contextual }
}

// ------------------------------------------------------------------------
// Logging + safe calls
// ------------------------------------------------------------------------
const _log = (event, payload) => {
  try {
    if (state.aiLoggerAdapter.log) {
      state.aiLoggerAdapter.log(event, {
        ...payload,
        overmind: OvermindPrimeMeta.identity
      })
      return
    }

    state.logger.log(event, {
      ...payload,
      overmind: OvermindPrimeMeta.identity
    })
  } catch {}
}

// ========================================================================
// PUBLIC CROWN‑REVIVE API
// ========================================================================
const requestWorldRevive = (reason = "manual_overmind") => {
  const organismState = state.getOrganismState()
  const reviveIntent = state.buildCrownReviveIntent({
    reason,
    organismState
  })

  state._log("overmind:crown-revive-manual", { reviveIntent })
  state._safeCall(state.aiVitals, "recordCrownRevive", {
    reviveIntent,
    worldLens: null,
    drift: null,
    breakthrough: null
  })

  return reviveIntent
}

const _safeCall = (target, method, payload) => {
  try {
    if (!target || typeof target[method] !== "function") return null
    return target[method](payload)
  } catch {
    return null
  }
}

const _safeAsyncCall = async (target, method, payload) => {
  try {
    if (!target || typeof target[method] !== "function") return null
    return await target[method](payload)
  } catch {
    return null
  }
}
  // ============================================================
  // FINAL PUBLIC API (pseudo‑class return)
  // ============================================================
  return {
    state,
    onError(envelope) {
      try {
        // ------------------------------------------------------------
        // 1. Crown‑Layer Logging
        // ------------------------------------------------------------
        try {
          state.logger.error("[OvermindPrime:Error]", envelope);
        } catch {}

        // ------------------------------------------------------------
        // 2. Vitals Monitor (binary + symbolic)
        // ------------------------------------------------------------
        try {
          state.vitalsMonitor.recordError({
            id: envelope.id,
            severity: envelope.severity,
            route: envelope.packet.route,
            time: envelope.timestamp
          });
        } catch {}

        // ------------------------------------------------------------
        // 3. Trust Fabric (jury, council, compliance)
        // ------------------------------------------------------------
        try {
          state.trust.juryFrame.onError(envelope);
          state.trust.juryCouncil.onError(envelope);
          state.trust.expansionCompliance.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 4. Tone Engine + Tone Router
        // ------------------------------------------------------------
        try {
          state.toneEngine.onError(envelope);
          state.toneRouter.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 5. Safety Frame (Crown‑Layer Safety Reflex)
        // ------------------------------------------------------------
        try {
          state.safetyFrame.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 6. Context Engine (scene, persona, route)
        // ------------------------------------------------------------
        try {
          state.contextEngine.onError({
            route: envelope.packet.route,
            surface: envelope.packet.surface,
            severity: envelope.severity,
            envelope
          });
        } catch {}

        // ------------------------------------------------------------
        // 7. Memory + Experience
        // ------------------------------------------------------------
        try {
          state.aiMemory.recordError(envelope);
          state.aiExperience.recordError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 8. Pipeline + Chunker + Scanner
        // ------------------------------------------------------------
        try {
          state.aiPipeline.onError(envelope);
          state.aiChunker.onError(envelope);
          state.fileScanner.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 9. Watchdog (Overmind heartbeat + drift detection)
        // ------------------------------------------------------------
        try {
          state.aiWatchdog.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 10. Governor Adapter (binary governor)
        // ------------------------------------------------------------
        try {
          state.governorAdapter.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 11. Global Boundaries + Permissions
        // ------------------------------------------------------------
        try {
          state.globalBoundaries.onError(envelope);
          state.globalPermissions.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 12. Experience Frame (persona-wide)
        // ------------------------------------------------------------
        try {
          state.globalExperienceFrame.onError(envelope);
        } catch {}

        // ------------------------------------------------------------
        // 13. SDN Impulse (Crown‑Layer)
        // ------------------------------------------------------------
        try {
          PulseRealm.PulseSDN.emitImpulse("overmind.error", {
            modeKind: "dual",
            executionContext: {
              sceneType: "overmind",
              workloadClass: "crown-error",
              dispatchSignature: "AiOvermindPrime.v30",
              shapeSignature: "overmind-error-spine",
              extensionId: "AiOvermindPrime"
            },
            envelope
          });
        } catch {}

        // ------------------------------------------------------------
        // 14. PulseSignals broadcast
        // ------------------------------------------------------------
        try {
          PulseRealm.PulseSignals.emit("overmind.error", {
            envelope,
            severity: envelope.severity,
            route: envelope.packet.route,
            surface: envelope.packet.surface
          });
        } catch {}

        // ------------------------------------------------------------
        // 15. CoreMemory snapshot
        // ------------------------------------------------------------
        try {
          state.stateMemory.set("last_overmind_error", envelope);
        } catch {}

      } catch (err) {
        console.warn("[AiOvermindPrime:onError FAILED]", err);
      }
    },
    // main entry
    process,
    personalShaping,

    // crown‑revive
    buildCrownReviveIntent,
    shouldRequestCrownRevive,
    emitCrownReviveIntent,
    requestWorldRevive,

    // organism + trust
    getOrganismState,
    buildTrustContext,

    // boundaries + permissions
    _evaluateBoundaries,
    _evaluatePermissions,
    _buildBlockedResponse,
    _enrichContext,
    _evaluateJury,

    // trivial
    isTrivial,
    buildBypassResponse,

    // safety
    runSafety,

    // lenses
    runLenses,
    lensClarity,
    lensRisk,
    lensBias,
    lensAmbiguity,
    lensMinimality,

    // drift + breakthrough
    computeDrift,
    computeBreakthrough,
    classifyWorldLens,

    // tone
    _stabilizeToneAdvanced,
    stabilizeTone,

    // helpers
    getText,
    intentSignature,
    dualHash,
    classicHash,
    hash,
    intelHash,
    contextualHash,
    hashForOvermind,

    // logging + safe calls
    _log,
    _safeCall,
    _safeAsyncCall
  }
}

export const getPulseOvermindContext = () => {

  // ------------------------------------------------------------
  // CORE SNAPSHOTS
  // ------------------------------------------------------------
  const runtimeState =
    PulseRuntimeV30.getRuntimeStateV30() || null

  const powerSnapshot =
    PulsePowerAPIv31.getPulsePowerSnapshotV31() || null

  const schedulerCtx =
    getPulseSchedulerContext() || null

  const expansionCtx =
    getPulseExpansionContext() || null

  // ------------------------------------------------------------
  // NAVSTATE
  // ------------------------------------------------------------
  const navState =
    runtimeState.planSummary.navState ||
    runtimeState.execResults.navState ||
    powerSnapshot.state.navState ||
    schedulerCtx.navState ||
    null

  // ------------------------------------------------------------
  // CONTINUANCE
  // ------------------------------------------------------------
  const continuance =
    runtimeState.continuance ||
    powerSnapshot.continuanceHints ||
    schedulerCtx.continuance ||
    null

  // ------------------------------------------------------------
  // WORLD RUNTIME FRAME
  // ------------------------------------------------------------
  const worldRuntimeFrame =
    runtimeState.worldRuntimeFrame ||
    powerSnapshot.binaryField.worldRuntimeFrame ||
    schedulerCtx.worldRuntimeFrame ||
    null

  // ------------------------------------------------------------
  // PREDICTIONS
  // ------------------------------------------------------------
  const predictions =
    powerSnapshot.predictions ||
    runtimeState.predictions ||
    schedulerCtx.predictions ||
    { nextPages: [], nextRoutes: [] }

  // ------------------------------------------------------------
  // ONEBAND LANES
  // ------------------------------------------------------------
  const oneBandLanes =
    powerSnapshot.state.oneBandLanes ||
    runtimeState.oneBandLanes ||
    schedulerCtx.oneBandLanes ||
    null

  // ------------------------------------------------------------
  // BINARY FIELD
  // ------------------------------------------------------------
  const binaryField =
    powerSnapshot.binaryField ||
    runtimeState.binaryField ||
    schedulerCtx.binaryField ||
    null

  // ------------------------------------------------------------
  // WORLD MEMORY (Binary Cache)
  // ------------------------------------------------------------
  const worldMemory =
    applyPulseWorldBinary_v31.lastWorld || null

  // ------------------------------------------------------------
  // DNA ACCESSOR
  // ------------------------------------------------------------
  const getDNA = name =>
    PulseSpecsDNAGenome.getDNA(name) || null

  // ------------------------------------------------------------
  // ORGANISM SNAPSHOT (Overmind needs this)
  // ------------------------------------------------------------
  const organism = {
    runtimeState,
    powerSnapshot,
    schedulerCtx,
    expansionCtx,
    navState,
    continuance,
    worldRuntimeFrame,
    predictions,
    oneBandLanes,
    binaryField,
    worldMemory
  }

  // ------------------------------------------------------------
  // FINAL CONTEXT OBJECT
  // ------------------------------------------------------------
  return {
    ok: true,
    version: "v31-IMMORTAL-CONTINUANCE-ONEBAND",

    // Core world state
    runtimeState,
    powerSnapshot,
    schedulerCtx,
    expansionCtx,

    navState,
    continuance,
    worldRuntimeFrame,
    predictions,
    oneBandLanes,
    binaryField,
    worldMemory,

    // Organism-level snapshot
    organism,

    // Accessors
    getDNA
  }
}

export default getPulseOvermindContext

PulseRealm.OvermindPrime = {
  getPulseOvermindContext,
  AiOvermindPrime,
  OvermindPrimeClock,
  OvermindPrimeMemory
}

PulseRealm.PulseOvermindPrime = AiOvermindPrime;