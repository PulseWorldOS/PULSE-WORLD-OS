// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — BRAINSTEM
//  Organ Assembly • Dual‑Band Context Binding • CNS + Pulse‑Net + PulsePort
//  PURE ORGANISM. ZERO MUTATION. ZERO RANDOMNESS. ZERO DIRECT INTERNET.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  IMPORTS (interfaces upgraded to v30 where applicable)
// ============================================================================
import { pulseAiHeart, createAiHeart } from "./PulseAIHeart-v30.js";
// v30 PulseAIChunker — PulsePort + StoragePort (IndexedDB) aware
import { createPulseAIChunkerV40 as createPulseAIChunker } from "./PULSE-AI-CHUNKER.js";
import { createDualBandOrganismV30 as createDualBandOrganism } from "./PULSE-AI-DUALBAND-PAST.js";
import { createEvolutionAPI } from "./PulseAIEvolution-v30.js";
import { createEarnAPI } from "./PulseAIEarn-v30.js";
import { DefaultPulseMeshPresenceRelay as PulseMeshPresenceRelay } from "../PULSE-MESH/PRESENCE/PulseMeshPresenceRelay-v30.js";

import { createArchitectOrgan as createArchitectAPI } from "./ARCHETYPES/PulseAIArchitect-v30.js";
import { createTouristAPI_v30 as createTouristAPI, prewarmTourist_v30 as prewarmTourist} from "./ARCHETYPES/PulseAITourist-v30.js";

import { createEnvironmentAPI } from "./PulseAIEnvironment-v30.js";
import { createPowerAPI } from "./PulseAIPowerPrime-v30.js";

import { createDiagnosticsWriteOrgan as createDiagnosticsWriteAPI } from "./MONITORS/PulseAIDiagnosticsWrite-v30.js";

import { createPersonaEngine } from "./PERSONALITY/PulseAIPersonality-v30.js";
import { createBoundariesEngineV30 as createBoundariesEngine } from "./PERSONALITY/PulseAIBoundariesEngine-v30.js";
import { createAIEgoCore as createPermissionsEngine } from "./PERSONALITY/PulseAIPermissions-v30.js";
import { createRouterEngine } from "./PulseAIToneRouter-v30.js";
import { createCortex } from "./PulseAICortex-v30.js";
import { createBinaryOrganism } from "./PulseAI-v30.js";


import { createDoctorOrgan as createDoctorAPI } from "./ARCHETYPES/PulseAIDoctorAssistant-v30.js";
import { createSurgeonAPI } from "./ARCHETYPES/PulseAISurgeon-v30.js";
import { createLawyerAPI } from "./ARCHETYPES/PulseAILawAssistant-v30.js";
import { createEntrepreneurOrgan as createEntrepreneurAPI } from "./ARCHETYPES/PulseAIEntrepreneur-v30.js";
import { createVeterinarianAPI } from "./ARCHETYPES/PulseAIVeterinarian-v30.js";
import { createClinicianOrgan as createClinicianAPI } from "./ARCHETYPES/PulseAIClinician-v30.js";
import { createEvolutionOrgan as createEvolutionaryAPI } from "./PulseAIEvolutionary-v30.js";

import { createSafetyFrameOrgan } from "./PERSONALITY/PulseAISafetyFrame-v30.js";
import { createJuryFrame } from "./PERSONALITY/PulseAIJuryFrame-v30.js";



// ============================================================================
//  PULSE‑NET / PORT SURFACES
// ============================================================================
export function buildPulseNetSurface(context) {
  return Object.freeze({
    fetch: context.fetchAPI || null,
    pulseNet: context.PulseNet || null,
    proxySpine: context.ProxySpine || null,
    boxCamera: context.BoxCamera || null,
    juryFrame: context.JuryFrame || null,
    trustFabric: context.TrustFabric || null
  });
}

function buildChunkerConfig(context, ports, pulseNetSurface) {
  const { db, fsAPI, routeAPI, schemaAPI, storagePort, pulsePort, signalPort } = ports;

  return {
    Brain: {
      log: console.log,
      warn: console.warn,
      error: console.error,
      // legacy compatibility for older organs
      firebase: () => db,
      fsAPI,
      routeAPI,
      schemaAPI,
      PulseNet: pulseNetSurface.pulseNet,
      ProxySpine: pulseNetSurface.proxySpine,
      JuryFrame: pulseNetSurface.juryFrame,
      TrustFabric: pulseNetSurface.trustFabric,
      PulsePort: pulsePort || null,
      SignalPort: signalPort || null,
      StoragePort: storagePort || null
    },
    Logger: context,
    Lanes: {
      total: 32,
      names: [
        "lane-core",
        "lane-earn",
        "lane-evolution",
        "lane-doctor",
        "lane-surgeon",
        "lane-lawyer",
        "lane-entrepreneur",
        "lane-veterinarian",
        "lane-clinician",
        "lane-environment",
        "lane-power",
        "lane-tourist",
        "lane-architect",
        "lane-diagnostics",
        "lane-presence",
        "lane-mesh",
        "lane-dualband",
        "lane-router",
        "lane-cortex",
        "lane-trust",
        "lane-jury",
        "lane-evidence",
        "lane-anomaly",
        "lane-honeypot",
        "lane-dominance",
        "lane-scanfile",
        "lane-code",
        "lane-binary-metrics",
        "lane-symbolic-metrics",
        "lane-prewarm",
        "lane-reserved-1",
        "lane-reserved-2"
      ]
    }
  };
}


// ============================================================================
//  ORGAN ASSEMBLY — v30 IMMORTAL++
// ============================================================================

/**
 * createOrgans
 *
 * @param {Object} context  – logging, clocks, mesh, identity directory, etc.
 * @param {Object} ports    – substrate ports:
 *   {
 *     db,          // legacy Firestore / Shadow DB handle (optional)
 *     fsAPI,       // file system API
 *     routeAPI,    // routing API
 *     schemaAPI,   // schema API
 *     pulsePort,   // PulsePort v30 (binary / organism port)
 *     signalPort,  // PulseSignalPort v30 (artery / CNS signaling)
 *     storagePort  // IndexedDB / local‑first storage port
 *   }
 */
export function createOrgans(context, ports = {}) {
  const {
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    signalPort,
    storagePort
  } = ports;

  
    PulseRealm.db = db;
    PulseRealm.log = console.log;
    PulseRealm.warn = console.warn;
    PulseRealm.error = console.error;

    PulseRealm.fsAPI = fsAPI;
    PulseRealm.routeAPI = routeAPI;
    PulseRealm.schemaAPI = schemaAPI;

    // NOTE: fetchAPI is assumed to be Pulse‑Net routed; no raw internet.
    PulseRealm.fetchAPI = context.fetchAPI || PulseRealm.fetchAPI || null;
  

  // ------------------------------------------------------------------------
  // 1) PULSE‑NET SURFACE
  // ------------------------------------------------------------------------
  const pulseNetSurface = buildPulseNetSurface(context);

  // ------------------------------------------------------------------------
  // 2) CNS CHUNKER — v30 IMMORTAL++ (PulsePort + StoragePort aware)
  // ------------------------------------------------------------------------
  const chunker = createPulseAIChunker(
    buildChunkerConfig(
      context,
      { db, fsAPI, routeAPI, schemaAPI, pulsePort, signalPort, storagePort },
      pulseNetSurface
    )
  );

  chunker.startPulseBandSession({
    trace: context.trace,
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    PulseNet: pulseNetSurface.pulseNet,
    PulsePort: pulsePort || null,
    SignalPort: signalPort || null,
    StoragePort: storagePort || null
  });

  // ------------------------------------------------------------------------
  // 3) CNS ENGINES (persona, boundaries, permissions)
  // ------------------------------------------------------------------------
  const personaEngine = createPersonaEngine({ context, db, pulsePort, storagePort });
  const boundariesEngine = createBoundariesEngine({ context, db, pulsePort });
  const permissionsEngine = createPermissionsEngine({ context, db, pulsePort });

  // ------------------------------------------------------------------------
  // 4) ROUTER + CORTEX (symbolic CNS)
  // ------------------------------------------------------------------------
  const router = createRouterEngine({
    context,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort
  });

  const cortex = createCortex({
    context,
    router,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort
  });

  // ------------------------------------------------------------------------
  // 5) DUAL‑BAND + BINARY ORGANISMS (symbolic ↔ binary, artery‑aware)
  // ------------------------------------------------------------------------
  const dualBand = createDualBandOrganism({
    trace: context.trace,
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    storagePort,
    signalPort
  });

  const binary = createBinaryOrganism({
    trace: context.trace,
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    storagePort,
    signalPort
  });

  const meshPresenceRelay = PulseMeshPresenceRelay.create({
    MeshBus: context.MeshBus,
    SystemClock: context.SystemClock,
    IdentityDirectory: context.IdentityDirectory,
    DeviceFingerprint: context.DeviceFingerprint,
    PulseNet: pulseNetSurface.pulseNet,
    log: console.log
  });

  // ------------------------------------------------------------------------
  // 7) SAFETY / TRUST FRAMES
  // ------------------------------------------------------------------------
  const safetyFrame = createSafetyFrameOrgan({
    context,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort
  });

  const juryFrame = createJuryFrame({
    context,
    safetyFrame,
    TrustFabric: pulseNetSurface.trustFabric,
    pulsePort,
    signalPort
  });

  // expose juryFrame back into context surface if desired
  context.JuryFrame = context.JuryFrame || juryFrame;

  // ------------------------------------------------------------------------
  // 8) AI HEARTBEAT (CNS HEART + DUAL‑BAND + CORTEX)
  // ------------------------------------------------------------------------
  const aiHeart = createAiHeart({
    context,
    chunker,
    router,
    cortex,
    dualBand,
    binary,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort,
    storagePort
  });

  try {
    // controller-style integration
    pulseAiHeart.attach(aiHeart);
    pulseAiHeart.start({
      trace: context.trace,
      pulsePort,
      signalPort,
      StoragePort: storagePort || null
    });
  } catch (err) {
    context.warn("PulseAIHeart-v30: failed to start heartbeat", { err });
  }

  // ------------------------------------------------------------------------
  // 9) ARCHETYPES (doctor, surgeon, lawyer, etc.)
  // ------------------------------------------------------------------------
  const doctor = createDoctorAPI({ context, db, pulsePort, signalPort, storagePort });
  const surgeon = createSurgeonAPI({ context, db, pulsePort, signalPort, storagePort });
  const lawyer = createLawyerAPI({ context, db, pulsePort, signalPort, storagePort });
  const entrepreneur = createEntrepreneurAPI({ context, db, pulsePort, signalPort, storagePort });
  const veterinarian = createVeterinarianAPI({ context, db, pulsePort, signalPort, storagePort });
  const clinician = createClinicianAPI({ context, db, pulsePort, signalPort, storagePort });
  const evolutionary = createEvolutionaryAPI({ context, db, pulsePort, signalPort, storagePort });

  // ------------------------------------------------------------------------
  // 10) CORE ORGANS (architect, tourist, environment, power, evolution, earn)
  // ------------------------------------------------------------------------
  const architect = createArchitectAPI({
    context,
    router,
    cortex,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort,
    storagePort
  });

  const tourist = createTouristAPI({
    context,
    router,
    cortex,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    pulsePort,
    signalPort,
    storagePort
  });

  const environment = createEnvironmentAPI({
    context,
    pulsePort,
    signalPort,
    storagePort,
    personaEngine,
    boundariesEngine,
    permissionsEngine
  });

  const power = createPowerAPI({
    context,
    pulsePort,
    signalPort,
    storagePort
  });

  const evolution = createEvolutionAPI({
    context,
    fsAPI,
    routeAPI,
    schemaAPI,
    pulsePort,
    storagePort
  });

  const earn = createEarnAPI({
    context,
    pulsePort,
    signalPort,
    storagePort
  });

  const diagnosticsWrite = createDiagnosticsWriteAPI({
    context,
    pulsePort,
    signalPort,
    storagePort,
    router,
    cortex
  });

  // ------------------------------------------------------------------------
  // 11) UNIVERSAL SYSTEM MAP
  // ------------------------------------------------------------------------
  const ALL_SYSTEMS = Object.freeze({
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    router,
    cortex,
    dualBand,
    binary,
    chunker,
    aiHeart,
    safetyFrame,
    juryFrame,
    doctor,
    surgeon,
    lawyer,
    entrepreneur,
    veterinarian,
    clinician,
    evolutionary,
    architect,
    tourist,
    environment,
    power,
    evolution,
    earn,
    diagnosticsWrite,
    meshPresenceRelay
  });

  // ------------------------------------------------------------------------
  // 12) REGISTER CHUNKER WITH DUAL‑BAND + BINARY + ROUTER
  // ------------------------------------------------------------------------
  dualBand.registerBackendOrgan("chunker", chunker);
  binary.registerBackendOrgan("chunker", chunker);
  router.registerBackendOrgan("chunker", chunker);

  // ------------------------------------------------------------------------
  // 13) UNIVERSAL REGISTRATION WITH CHUNKER (lane‑aware)
  // ------------------------------------------------------------------------
  if (chunker.registerBackendOrgan) {
    for (const [name, system] of Object.entries(ALL_SYSTEMS)) {
      if (system.chunk || system.prewarm) {
        chunker.registerBackendOrgan(name, {
          chunk: system.chunk,
          prewarm: system.prewarm,
          laneHint: (() => {
            switch (name) {
              case "earn":
                return "lane-earn";
              case "evolution":
              case "evolutionary":
                return "lane-evolution";
              case "doctor":
              case "clinician":
              case "veterinarian":
                return "lane-doctor";
              case "surgeon":
                return "lane-surgeon";
              case "lawyer":
                return "lane-lawyer";
              case "architect":
                return "lane-architect";
              case "tourist":
                return "lane-tourist";
              case "environment":
                return "lane-environment";
              case "power":
                return "lane-power";
              case "router":
                return "lane-router";
              case "cortex":
                return "lane-cortex";
              case "binary":
                return "lane-binary-metrics";
              case "dualBand":
                return "lane-symbolic-metrics";
              case "meshPresenceRelay":
                return "lane-presence";
              case "diagnosticsWrite":
                return "lane-diagnostics";
              case "safetyFrame":
                return "lane-trust";
              case "juryFrame":
                return "lane-jury";
              case "aiHeart":
                return "lane-core";
              default:
                return "lane-core";
            }
          })()
        });
      }
    }
  }

  // ------------------------------------------------------------------------
  // 14) UNIVERSAL PREWARM (CNS + organs + chunker)
// ------------------------------------------------------------------------
  chunker.prewarm();

  for (const system of Object.values(ALL_SYSTEMS)) {
    system.prewarm();
  }

  prewarmTourist(tourist);

  // ------------------------------------------------------------------------
  // 15) RETURN FULL ORGANISM MAP (frozen, read‑only)
// ------------------------------------------------------------------------
  return Object.freeze(ALL_SYSTEMS);
}

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility
// ---------------------------------------------------------------------------
PulseRealm.AIBrainstem = {
    createOrgans
}
