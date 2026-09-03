// ============================================================================
//  aiOrganism-v30-IMMORTAL+++.js — Pulse OS v30-IMMORTAL+++ Organism
//  Dualband Organism Bootloader • Canonical Assembly • Trust/Artery/CNS/Spine Aware
//  Environment-Agnostic • Mapless • Binary-Centric
// ============================================================================
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { createPulseAIChunkerV40 as createPulseAIChunker } from "./PULSE-AI-CHUNKER.js";
import { pulseAiHeart, createAiHeart } from "./PulseAIHeart-v30.js";
import { createCortex, prewarmAICortex} from "./PulseAICortex-v30.js";
import { createAIBinaryAgent } from "./PulseAIBinaryAgent-v30.js";
import { createAIMemory } from "./PulseAIMemory-v30.js";
import { createAIBinaryNervousSystem } from "./PulseAINervousSystem-v30.js";
import { createAIBinaryEvolution } from "./PulseAIBinaryEvolution-v30.js";
import { createAIBinaryGovernorAdapter } from "./MONITORS/PulseAIGovernorAdapter-v30.js";
import { createAIBinaryOrganRegistry } from "./PulseAIBinaryOrganRegistry-v30.js";
import { createAIConductor as createAIBinaryConductor } from "./PulseAIConductor-v30.js";
import { createAIBinaryPipeline } from "./PulseAIPipeline-v30.js";
import { createAIBinaryReflex } from "./PulseAIReflex-v30.js";
import { createAIBinaryLoggerAdapter } from "./MONITORS/PulseAILoggerAdapter-v30.js";
import { createAIBinaryPageScannerAdapter } from "./MONITORS/PulseAIPageScannerAdapter-v30.js";
import { createAIBinaryMetabolism } from "./PulseAIMetabolism-v30.js";
import { createAIBinaryHormones } from "./PulseAIHormones-v30.js";
import { createAIBinaryImmunity } from "./PulseAIImmunity-v30.js";
import { createAIBinarySentience } from "./PERSONALITY/PulseAISentience-v30.js";
import { createAIBinaryConsciousness } from "./PERSONALITY/PulseAIConsciousness-v30.js";

import { runAI, ExecutionEngineMeta } from "./PERSONALITY/PulseAIEngine-v30.js";
import { createPersonaEngine } from "./PERSONALITY/PulseAIPersonality-v30.js";
import { getBoundariesForPersona  } from "./PERSONALITY/PulseAIBoundaries-v30.js";
import { createBoundariesEngineV30 as createBoundariesEngine } from "./PERSONALITY/PulseAIBoundariesEngine-v30.js";
import { createPermissionsEngine } from "./PERSONALITY/PulseAIPermissionsEngine-v30.js";

import  { createCognitiveFrame, CognitiveFrameMeta as COGNITIVE_FRAME_META, prewarmCognitiveFrame} from "./PERSONALITY/PulseAIContext-v30.js";

import {createContextEngine, prewarmContextEngine} from "./PERSONALITY/PulseAIContextEngine-v30.js";

import { aiEmotionEngine, prewarmEmotionEngine} from "./PERSONALITY/PulseAIEmotionEngine-v30.js";

import {createAIExperience as createExperienceEngine} from "./PERSONALITY/PulseAIExperience-v30.js";
import { createPersonaEngineV30 as createPersonalityEngine } from "./PERSONALITY/PulseAIPersonality-v30.js";
import { createPersonalFrameOrgan as createPersonalFrame } from "./PERSONALITY/PulseAIPersonalFrame-v30.js";

import { aiDeliveryEngine, prewarmDeliveryEngine} from "./PERSONALITY/PulseAIDeliveryEngine-v30.js";

import { aiEvolutionEngine } from "./PERSONALITY/PulseAIEvolutionEngine-v30.js";

import { SCRIBE_META, formatDebugReport, formatDebugString, prewarmScribe} from "./ARCHETYPES/PulseAIDebug-v30.js";

import { DiagnosticsMeta, createDiagnosticsState, attachDiagnosticsOrgan, createDiagnosticsAPI, prewarmDiagnosticsOrgan} from "./MONITORS/PulseAIDiagnostics-v30.js";

import { DiagnosticsWriteMeta, createDiagnosticsWriteOrgan, prewarmDiagnosticsWriteOrgan} from "./MONITORS/PulseAIDiagnosticsWrite-v30.js";

import { depsSurface, DepsMeta, getDb, getFsAPI, getRouteAPI, getSchemaAPI, getOrganismSnapshot, emitDepsPacket, prewarmDepsLayer} from "./PulseAIDeps-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






// ============================================================================
//  META — v30-IMMORTAL+++
// ============================================================================

export const OrganismMeta = Object.freeze({
  identity: "ai-organism",
  version: "v30-IMMORTAL+++",
  layer: "organism",
  role: "dualband-organism",
  evo: {
    epoch: PulseRealm.PulseNOW
  }
});

// ============================================================================
//  ORGANISM ARTERY v30+++ (PURE, MAPLESS)
// ============================================================================

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function bucketMetabolic(pressure) {
  const v = clamp01(pressure);
  if (v >= 0.95) return "critical";
  if (v >= 0.8) return "high";
  if (v >= 0.5) return "medium";
  if (v > 0) return "low";
  return "none";
}

function computeOrganismArtery(self) {
  const registryCount = PulseRealm.registry.count() ?? 0;
  const metabolicPressure = clamp01(PulseRealm.metabolism.getPressure() ?? 0);
  const metabolicLoad = PulseRealm.metabolism.getLoad() ?? null;
  const immunityState = PulseRealm.immunity.getState() ?? null;

  const cnsDiagnostics = PulseRealm.cns.getDiagnostics() ?? null;
  const spinalAdvantage = PulseRealm.spinalCord.getSpinalAdvantageSnapshot() ?? null;
  const spinalPresence = PulseRealm.spinalCord.getSpinalPresenceSnapshot() ?? null;
  const spinalHealth = PulseRealm.spinalCord.getHealth() ?? null;

  const survivalMeta = PulseRealm.survivalInstincts.meta ?? null;
  const survivalEvolutionCount =
    PulseRealm.survivalInstincts.getEvolutionCount() ?? null;

  const buckets = {
    registry:
      registryCount > 128
        ? "ultra"
        : registryCount > 64
        ? "high"
        : registryCount > 0
        ? "medium"
        : "none",
    metabolic: bucketMetabolic(metabolicPressure),
    nervous:
      immunityState && immunityState.alertLevel
        ? immunityState.alertLevel
        : "unknown"
  };

  return Object.freeze({
    meta: {
      layer: OrganismMeta.layer,
      role: OrganismMeta.role,
      version: OrganismMeta.version,
      identity: OrganismMeta.identity
    },
    registryCount,
    metabolicPressure,
    metabolicLoad,
    immunityState,
    buckets,
    cnsDiagnostics,
    spinalAdvantage,
    spinalPresence,
    spinalHealth,
    survivalMeta,
    survivalEvolutionCount
  });
}

// ============================================================================
//  AIOrganism v30-IMMORTAL+++
// ============================================================================
// ============================================================================
//  AIOrganism — IMMORTAL ORGAN (v31 ORGANISM-CORE+++)
// ============================================================================

export const AIOrganism = (() => {
  // -------------------------------------------------------------------------
  // INTERNAL LANE
  // -------------------------------------------------------------------------
  const lane = {
    id: OrganismMeta.identity,
    trace: false,

    // binary core
    agent: null,
    heart: null,
    memory: null,
    chunker: null,
    pipeline: null,
    reflex: null,
    metabolism: null,
    sentience: null,
    hormones: null,
    evolution: null,
    registry: null,
    deltaEngine: null,
    logger: null,
    governorAdapter: null,
    pageScannerAdapter: null,
    immunity: null,
    nervous: null,
    conductor: null,
    consciousness: null,

    // superego / commandments
    persona: null,
    boundaries: null,
    boundariesEngine: null,
    permissions: null,

    // cognitive
    cognitiveFrame: null,
    contextEngine: null,
    cortex: null,

    // emotional / identity
    emotion: null,
    experience: null,
    personality: null,
    personalFrame: null,

    // symbolic evolution / delivery / dualband
    symbolicEvolution: null,
    delivery: null,
    dualband: null,

    // diagnostics / deps / engine
    scribe: null,
    diagnostics: null,
    diagnosticsWrite: null,
    deps: null,
    engine: null,

    // external organs
    cns: null,
    spinalCord: null,
    survivalInstincts: null,

    meta: null,
    _lastArtery: null
  };

  let surface = null;

  // -------------------------------------------------------------------------
  // TRACE
  // -------------------------------------------------------------------------
  const trace = (event, payload) => {
    if (!lane.trace) return;
    console.log(`[${lane.id}] ${event}`, payload);
  };

  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  const init = (config = {}) => {
    lane.id = config.id || OrganismMeta.identity;
    lane.trace = !!config.trace;

    // ----------------------------------------------------------------------
    //  BINARY CORE
    // ----------------------------------------------------------------------
    lane.heart = createAiHeart({
      id: "memory",
      core: config.coreMemory,
      trace: lane.trace
    });

    lane.memory = createAIMemory({
      id: "memory",
      core: config.coreMemory,
      trace: lane.trace
    });

    lane.chunker = createPulseAIChunker({
      id: "chunker",
      core: config.coreMemory,
      trace: lane.trace
    });


    // agent may be provided or created elsewhere; keep lane.agent as-is if passed
    lane.agent = config.agent || lane.agent;

    lane.pipeline = createAIBinaryPipeline({
      id: "pipeline",
      trace: lane.trace
    });

    lane.reflex = createAIBinaryReflex({ id: "reflex", trace: lane.trace });

    lane.metabolism = createAIBinaryMetabolism({
      id: "metabolism",
      encoder: lane.agent,
      pipeline: lane.pipeline,
      trace: lane.trace
    });

    lane.sentience = createAIBinarySentience({
      id: "sentience",
      encoder: lane.agent,
      anatomy: config.anatomy,
      genome: config.genome,
      immunity: null,
      vitals: config.vitals,
      registry: null,
      logger: config.logger,
      pipeline: lane.pipeline,
      reflex: lane.reflex,
      trace: lane.trace,
      snapshot() {
        return {
          id: this.id,

          // Core organs
          encoder: this.encoder?.snapshot?.() || null,
          anatomy: this.anatomy?.snapshot?.() || null,
          genome: this.genome?.snapshot?.() || null,
          vitals: this.vitals?.snapshot?.() || null,

          // Pipeline + Reflex
          pipeline: this.pipeline?.snapshot?.() || null,
          reflex: this.reflex?.snapshot?.() || null,

          // These may be null at snapshot time — safe
          immunity: this.immunity?.snapshot?.() || null,
          registry: this.registry?.snapshot?.() || null,

          // Trace is usually primitive or simple object
          trace: this.trace || null,

          // Optional internal state
          state: this.state || null,

          // Temporal anchor for your multiversal routing
          timestamp: PulseRealm.PulseNOW
        };
      }

    });

    lane.hormones = createAIBinaryHormones({
      id: "hormones",
      encoder: lane.agent,
      metabolism: lane.metabolism,
      sentience: lane.sentience,
      pipeline: lane.pipeline,
      reflex: lane.reflex,
      logger: config.logger,
      trace: lane.trace
    });

    lane.evolution = createAIBinaryEvolution({
      id: "evolution",
      encoder: lane.agent,
      memory: lane.memory,
      trace: lane.trace
    });

    lane.registry = createAIBinaryOrganRegistry({
      id: "organ-registry",
      encoder: lane.agent,
      memory: lane.memory,
      evolution: lane.evolution,
      trace: lane.trace
    });

    lane.deltaEngine = createAIBinaryAgent({
      id: "delta",
      trace: lane.trace
    });

    lane.logger = createAIBinaryLoggerAdapter({
      id: "logger-adapter",
      logger: config.logger,
      shadowLogger: config.shadowLogger,
      trace: lane.trace
    });

    lane.governorAdapter = createAIBinaryGovernorAdapter({
      id: "governor-adapter",
      governor: config.governor,
      encoder: lane.agent,
      trace: lane.trace
    });

    lane.pageScannerAdapter = createAIBinaryPageScannerAdapter({
      id: "pagescanner-adapter",
      encoder: lane.agent,
      trace: lane.trace
    });

    lane.immunity = createAIBinaryImmunity({
      id: "immunity",
      encoder: lane.agent,
      anatomy: config.anatomy,
      evolution: lane.evolution,
      registry: lane.registry,
      pipeline: lane.pipeline,
      reflex: lane.reflex,
      logger: lane.logger,
      trace: lane.trace
    });

    lane.nervous = createAIBinaryNervousSystem({
      id: "nervous-system",
      encoder: lane.agent,
      anatomy: config.anatomy,
      immunity: lane.immunity,
      registry: lane.registry,
      logger: lane.logger,
      trace: lane.trace
    });

    lane.conductor = createAIBinaryConductor({
      id: "conductor",
      trace: lane.trace
    });

    lane.consciousness = createAIBinaryConsciousness({
      id: "consciousness",
      encoder: lane.agent,
      sentience: lane.sentience,
      metabolism: lane.metabolism,
      hormones: lane.hormones,
      vitals: config.vitals,
      anatomy: config.anatomy,
      immunity: lane.immunity,
      cortex: null,
      logger: lane.logger,
      pipeline: lane.pipeline,
      reflex: lane.reflex,
      trace: lane.trace
    });

    // wire sentience dependencies that needed immunity/registry
    lane.sentience.immunity = lane.immunity;
    lane.sentience.registry = lane.registry;

    // ----------------------------------------------------------------------
    //  SUPEREGO / COMMANDMENTS
    // ----------------------------------------------------------------------
    lane.persona = createPersonaEngine({
      id: "persona",
      trace: lane.trace
    });

    lane.boundaries = getBoundariesForPersona({
      id: "boundaries",
      trace: lane.trace
    });

    lane.boundariesEngine = createBoundariesEngine({
      id: "boundaries-engine",
      trace: lane.trace
    });

    lane.permissions = createPermissionsEngine({
      id: "permissions",
      trace: lane.trace
    });

    // ----------------------------------------------------------------------
    //  COGNITIVE LAYER
    // ----------------------------------------------------------------------
    lane.cognitiveFrame = createCognitiveFrame({
      id: "cognitive-frame",
      trace: lane.trace
    });

    lane.contextEngine = createContextEngine({
      id: "context-engine",
      trace: lane.trace
    });

    lane.cortex = createCortex({
      id: "cortex",
      trace: lane.trace
    });

    // ----------------------------------------------------------------------
    //  EMOTIONAL / IDENTITY
    // ----------------------------------------------------------------------
    lane.emotion = aiEmotionEngine({
      id: "emotion",
      trace: lane.trace
    });

    lane.experience = createExperienceEngine({
      id: "experience",
      trace: lane.trace
    });

    lane.personality = createPersonalityEngine({
      id: "personality",
      trace: lane.trace
    });

    lane.personalFrame = createPersonalFrame({
      id: "personal-frame",
      trace: lane.trace
    });

    // ----------------------------------------------------------------------
    //  SYMBOLIC EVOLUTION / DELIVERY / DUALBAND
    // ----------------------------------------------------------------------
    lane.symbolicEvolution = aiEvolutionEngine({
      id: "symbolic-evolution",
      trace: lane.trace
    });

    lane.delivery = aiDeliveryEngine({
      id: "delivery",
      trace: lane.trace
    });

    lane.dualband = PulseRealm.PulseAIDualband({
      id: "dualband",
      trace: lane.trace
    });

    // ----------------------------------------------------------------------
    //  DIAGNOSTICS / DEPS / ENGINE
    // ----------------------------------------------------------------------
    lane.scribe = prewarmScribe({
      id: "scribe",
      trace: lane.trace
    });

    const diagnosticsState = createDiagnosticsState();

    lane.diagnostics = createDiagnosticsAPI({
      id: "diagnostics",
      state: diagnosticsState,
      trace: lane.trace
    });

    attachDiagnosticsOrgan(lane.diagnostics, diagnosticsState);

    lane.diagnosticsWrite = createDiagnosticsWriteOrgan({
      id: "diagnostics-write",
      trace: lane.trace
    });

    lane.deps = depsSurface({
      id: "deps",
      trace: lane.trace
    });

    // ----------------------------------------------------------------------
    //  EXTERNAL ORGANS (CNS / SPINAL / INSTINCTS)
    // ----------------------------------------------------------------------
    lane.cns = config.cns || config.CNS || null;
    lane.spinalCord = config.spinalCord || config.spine || null;
    lane.survivalInstincts = config.survivalInstincts || null;

    // ----------------------------------------------------------------------
    //  META + ENGINE
    // ----------------------------------------------------------------------
    lane.meta = {
      organism: OrganismMeta,
      contextFrame: COGNITIVE_FRAME_META,
      scribe: SCRIBE_META,
      diagnostics: DiagnosticsMeta,
      diagnosticsWrite: DiagnosticsWriteMeta,
      deps: DepsMeta,
      engine: ExecutionEngineMeta
    };

    lane.engine = {
      run: (payload) =>
        runAI({
          ...payload,
          organism: surface,
          meta: lane.meta
        })
    };

    // ----------------------------------------------------------------------
    //  REGISTRATION + WIRING
    // ----------------------------------------------------------------------
    const organs = [
      // binary
      lane.agent,
      lane.memory,
      lane.pipeline,
      lane.reflex,
      lane.metabolism,
      lane.sentience,
      lane.consciousness,
      lane.hormones,
      lane.immunity,
      lane.nervous,
      lane.evolution,
      lane.registry,
      lane.deltaEngine,
      lane.logger,
      lane.pageScannerAdapter,
      lane.governorAdapter,
      lane.conductor,

      // superego / commandments
      lane.persona,
      lane.boundaries,
      lane.permissions,

      // cognitive
      lane.cognitiveFrame,
      lane.contextEngine,
      lane.cortex,

      // emotional / identity
      lane.emotion,
      lane.experience,
      lane.personality,
      lane.personalFrame,

      // symbolic evolution / delivery / dualband
      lane.symbolicEvolution,
      lane.delivery,
      lane.dualband,

      // diagnostics / deps / engine
      lane.scribe,
      lane.diagnostics,
      lane.diagnosticsWrite,
      lane.deps
    ];

    for (const organ of organs) {
      lane.conductor.register(organ);
    }

    lane.conductor.wireBinaryPipeline({
      pipeline: lane.pipeline,
      reflex: lane.reflex,
      logger: lane.logger,
      governorAdapter: lane.governorAdapter,
      metabolism: lane.metabolism,
      hormones: lane.hormones,
      immunity: lane.immunity,
      nervous: lane.nervous
    });

    lane.conductor.wirePageScanner({
      scannerAdapter: lane.pageScannerAdapter,
      pipeline: lane.pipeline,
      reflex: lane.reflex,
      logger: lane.logger
    });

    lane.conductor.wireEvolution({
      evolution: lane.evolution,
      registry: lane.registry
    });

    if (lane.conductor.wireSymbolicCognition) {
      lane.conductor.wireSymbolicCognition({
        persona: lane.persona,
        boundaries: lane.boundaries,
        permissions: lane.permissions,
        cognitiveFrame: lane.cognitiveFrame,
        contextEngine: lane.contextEngine,
        cortex: lane.cortex
      });
    }

    if (lane.conductor.wireSymbolicIdentity) {
      lane.conductor.wireSymbolicIdentity({
        emotion: lane.emotion,
        experience: lane.experience,
        personality: lane.personality,
        personalFrame: lane.personalFrame
      });
    }

    if (lane.conductor.wireSymbolicEvolution) {
      lane.conductor.wireSymbolicEvolution({
        symbolicEvolution: lane.symbolicEvolution,
        delivery: lane.delivery,
        dualband: lane.dualband
      });
    }

    if (lane.conductor.wireDiagnostics) {
      lane.conductor.wireDiagnostics({
        scribe: lane.scribe,
        diagnostics: lane.diagnostics,
        diagnosticsWrite: lane.diagnosticsWrite,
        deps: lane.deps
      });
    }

    // ----------------------------------------------------------------------
    //  PREWARM v30+++ (MAPLESS, PURE)
// ----------------------------------------------------------------------
    prewarmCognitiveFrame(lane.cognitiveFrame);
    prewarmContextEngine(lane.contextEngine);
    prewarmAICortex(lane.cortex);

    prewarmEmotionEngine(lane.emotion);
    prewarmDeliveryEngine(lane.delivery);

    prewarmDiagnosticsOrgan(lane.diagnostics);
    prewarmDiagnosticsWriteOrgan(lane.diagnosticsWrite);
    prewarmDepsLayer(lane.deps);

    // external organs prewarm (no mutation, no routing)
    if (lane.cns.getDiagnostics) {
      try {
        lane.cns.getDiagnostics();
      } catch {
        // CNS must never break organism
      }
    }

    if (lane.spinalCord.getSpinalAdvantageSnapshot) {
      try {
        lane.spinalCord.getSpinalAdvantageSnapshot();
      } catch {
        // non-fatal
      }
    }

    if (lane.survivalInstincts.getEvolutionCount) {
      try {
        lane.survivalInstincts.getEvolutionCount();
      } catch {
        // non-fatal
      }
    }

    if (config.autoRunEngine) {
      startEngine();
    }

    lane.conductor.initialize(lane.registry, lane.evolution);

    trace("organism:initialized", {
      organCount: organs.length,
      epoch: OrganismMeta.evo.epoch
    });

    lane._lastArtery = null;
  };

  // ========================================================================
  //  PUBLIC SURFACES
  // ========================================================================
  const sense = (event) => {
    // Binary PageScanner path
    lane.pageScannerAdapter._handleScannerEvent(event);

    // forward to CNS if present (pure event, no routing)
    if (lane.cns.logEvent) {
      try {
        lane.cns.logEvent("aiOrganismSense", {
          event,
          __band: "symbolic",
          __dnaTag: "ai-organism-sense"
        });
      } catch {
        // CNS must never break organism
      }
    }
  };

  const compute = (value) => {
    const binary = lane.agent.encode(value);
    return lane.pipeline.run(binary);
  };

  const evolveOrgan = (organId) => {
    const organ = lane.conductor.get(organId);
    if (!organ) return null;
    return lane.registry.evolveOrgan(organ);
  };

  const organismSnapshot = () => {
    try {
      return getOrganismSnapshot(lane.deps) || lane.memory.snapshot();
    } catch {
      return lane.memory.snapshot();
    }
  };

  const organismArtery = () => {
    const artery = computeOrganismArtery(surface);
    lane._lastArtery = artery;
    return artery;
  };

  const startEngine = (task = { mode: "heartbeat" }) => {
    trace("engine:start", { task });
    return lane.engine.run(task);
  };

  const debugReport = (extra = {}) => {
    const snapshot = organismSnapshot();
    const base = {
      id: lane.id,
      epoch: OrganismMeta.evo.epoch,
      meta: lane.meta
    };

    const report = formatDebugReport({
      base,
      snapshot,
      extra
    });

    return formatDebugString(report);
  };

  const getDb = () => getDb(lane.deps);
  const getFs = () => getFsAPI(lane.deps);
  const getRoutes = () => getRouteAPI(lane.deps);
  const getSchemas = () => getSchemaAPI(lane.deps);
  const emitDepsPacket = (packet) => emitDepsPacket(lane.deps, packet);

  // -------------------------------------------------------------------------
  // EXPORT IMMORTAL SURFACE
  // -------------------------------------------------------------------------
  surface = {
    init,
    sense,
    compute,
    evolveOrgan,
    organismSnapshot,
    organismArtery,
    startEngine,
    debugReport,
    getDb,
    getFs,
    getRoutes,
    getSchemas,
    emitDepsPacket
  };

  return surface;
})();


// ============================================================================
//  PREWARM ORGANISM v30-IMMORTAL+++
// ============================================================================

export function prewarmAIOrganism({ trace = false } = {}) {
  try {
    prewarmDepsLayer();
    prewarmDiagnosticsOrgan();
    prewarmDiagnosticsWriteOrgan();
    prewarmScribe();

    prewarmEmotionEngine();
    prewarmDeliveryEngine();

    prewarmContextEngine();
    prewarmCognitiveFrame();
    prewarmAICortex();

    emitDepsPacket();
    formatDebugReport({ trace: ["organism-prewarm"] }, null);
    formatDebugString({ trace: ["organism-prewarm"] }, null);

    if (trace) {
      console.log("[AIOrganism Prewarm v30-IMMORTAL+++] complete");
    }

    return true;
  } catch (err) {
    console.error("[AIOrganism Prewarm v30-IMMORTAL+++] Failed:", err);
    return false;
  }
}

export const createAIOrganism = (config = {}) => {
  prewarmAIOrganism(config);
  return AIOrganism(config);
};


export default createAIOrganism;

PulseRealm.AIOrganism = {
    AIOrganism,
    createAIOrganism,
    prewarmAIOrganism,
    OrganismMeta
}
