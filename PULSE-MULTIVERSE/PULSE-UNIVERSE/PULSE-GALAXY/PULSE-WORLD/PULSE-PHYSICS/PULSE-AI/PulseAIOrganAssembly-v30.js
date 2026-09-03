
// ============================================================================
//  IMPORTS
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// CNS‑SAFE v30 Chunker (32 lanes, Pulse‑Net aware)
import { createPulseAIChunkerV40 as createPulseAIChunker } from "./PULSE-AI-CHUNKER.js";
import { createDualBandOrganismV30 as createDualBandOrganism } from "./PULSE-AI-DUALBAND-PAST.js";
import { createEvolutionAPI } from "./PulseAIEvolution-v30.js";
import { createCortex } from "./PulseAICortex-v30.js";
import { createEarnAPI } from "./PulseAIEarn-v30.js";
import {DefaultPulseOSPresence as PulseOSPresence} from "../PULSE-OS/PulseOSPresence-v30.js";
import {DefaultPulseMeshPresenceRelay as PulseMeshPresenceRelay} from "../PULSE-MESH/PRESENCE/PulseMeshPresenceRelay-v30.js";
import {createPulseFileScanner as PulseAIFileScanner} from "./MONITORS/PulseAIFileScanner-v30.js";

import { createArchitectOrgan as createArchitectAPI } from "./ARCHETYPES/PulseAIArchitect-v30.js";
import { createTouristAPI_v30 as createTouristAPI } from "./ARCHETYPES/PulseAITourist-v30.js";

import { createEnvironmentAPI } from "./PulseAIEnvironment-v30.js";
import { createPowerAPI } from "./PulseAIPowerPrime-v30.js";

import { createDiagnosticsWriteOrgan as createDiagnosticsWriteAPI } from "./MONITORS/PulseAIDiagnosticsWrite-v30.js";

import { createPersonaEngineV30 as createPersonaEngine } from "./PERSONALITY/PulseAIPersonality-v30.js";
import { createBoundariesEngineV30 as createBoundariesEngine } from "./PERSONALITY/PulseAIBoundariesEngine-v30.js";
import { createPermissionsEngine } from "./PERSONALITY/PulseAIPermissionsEngine-v30.js";
import { createRouterEngine } from "./PulseAIToneRouter-v30.js";

// Non-binary symbolic organs
import { createDoctorOrgan as createDoctorAPI } from "./ARCHETYPES/PulseAIDoctorAssistant-v30.js";
import { PulseRole as createSurgeonAPI } from "./ARCHETYPES/PulseAISurgeon-v30.js";
import { PulseRole as createLawyerAPI } from "./ARCHETYPES/PulseAILawAssistant-v30.js";
import { createEntrepreneurOrgan as createEntrepreneurAPI } from "./ARCHETYPES/PulseAIEntrepreneur-v30.js";
import { PulseRole as createVeterinarianAPI } from "./ARCHETYPES/PulseAIVeterinarian-v30.js";
import { createClinicianOrgan as createClinicianAPI } from "./ARCHETYPES/PulseAIClinician-v30.js";
import { createEvolutionOrgan as createEvolutionaryAPI } from "./PulseAIEvolutionary-v30.js";

// (Future trust / jury / evidence surfaces)
import { createSafetyFrameOrgan } from "./PERSONALITY/PulseAISafetyFrame-v30.js";
import { createJuryFrame } from "./PERSONALITY/PulseAIJuryFrame-v30.js";

/**
 * aiOrganAssembly-v30.js — Pulse OS v30‑IMMORTAL++ Brainstem
 * ----------------------------------------------------------
 * CANONICAL ROLE:
 *   Organ Assembly • Dual‑Band Context Binding • CNS + Chunker Integration
 *   PURE ORGANISM. ZERO RANDOMNESS. ZERO DIRECT INTERNET.
 *
 * CONTRACT:
 *   • Deterministic, read‑only assembly.
 *   • No mutation of external DB or remote state.
 *   • No direct network access (all IO via provided context surfaces).
 */

// ============================================================================
//  GLOBAL HANDLE (WINDOW/WORKER/NODE SAFE)
// ============================================================================



// ============================================================================
//  META — v30 IMMORTAL++
// ============================================================================
export const BrainstemMeta = Object.freeze({
  id: "PulseOS-Brainstem",
  version: "v30-IMMORTAL++",
  role: "organ-assembly",
  band: "dualband"
});

// ============================================================================
//  INTERNAL HELPERS — Pulse‑Net + Chunker lanes
// ============================================================================
function buildPulseNetSurface(context) {
  return Object.freeze({
    fetch: context.fetchAPI || null,
    pulseNet: context.PulseNet || null,
    proxySpine: context.ProxySpine || null,
    boxCamera: context.BoxCamera || null,
    juryFrame: context.JuryFrame || null,
    trustFabric: context.TrustFabric || null
  });
}

function buildChunkerConfig(context, db, fsAPI, routeAPI, schemaAPI, pulseNetSurface) {
  return {
    Brain: {
      log: console.log,
      warn: console.warn,
      error: console.error,
      firebase: () => db,
      fsAPI,
      routeAPI,
      schemaAPI,
      PulseNet: pulseNetSurface.pulseNet,
      ProxySpine: pulseNetSurface.proxySpine,
      JuryFrame: pulseNetSurface.juryFrame,
      TrustFabric: pulseNetSurface.trustFabric
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
//  ORGAN ASSEMBLY — v30 IMMORTAL++ Brainstem
// ============================================================================
export function createOrgans(context, db, fsAPI, routeAPI, schemaAPI) {
  // ------------------------------------------------------------------------
  // 0) LIGHT GLOBAL SURFACE (legacy compatibility, no admin/firestore wiring)
  // ------------------------------------------------------------------------
  PulseRealm.db = PulseRealm.db || db;
  PulseRealm.log = PulseRealm.log || context.log;
  PulseRealm.warn = PulseRealm.warn || context.warn;
  PulseRealm.error = PulseRealm.error || context.error;

  PulseRealm.fsAPI = PulseRealm.fsAPI || fsAPI;
  PulseRealm.routeAPI = PulseRealm.routeAPI || routeAPI;
  PulseRealm.schemaAPI = PulseRealm.schemaAPI || schemaAPI;
  PulseRealm.fetchAPI = context.fetchAPI || PulseRealm.fetchAPI || null;

  // ------------------------------------------------------------------------
  // 1) PULSE‑NET SURFACE
  // ------------------------------------------------------------------------
  const pulseNetSurface = buildPulseNetSurface(context);

  // ------------------------------------------------------------------------
  // 2) CNS CHUNKER — v30 (32 lanes, Pulse‑Net aware)
  // ------------------------------------------------------------------------
  const chunker = createPulseAIChunker(
    buildChunkerConfig(context, db, fsAPI, routeAPI, schemaAPI, pulseNetSurface)
  );

  if (typeof chunker.startPulseBandSession === "function") {
    chunker.startPulseBandSession({
      trace: context.trace,
      db,
      fsAPI,
      routeAPI,
      schemaAPI,
      PulseNet: pulseNetSurface.pulseNet
    });
  }

  // ------------------------------------------------------------------------
  // 3) CNS ENGINES (identity, persona, boundaries, permissions)
  // ------------------------------------------------------------------------
  const personaEngine = createPersonaEngine({ context, db });
  const boundariesEngine = createBoundariesEngine({ context, db });
  const permissionsEngine = createPermissionsEngine({ context, db });

  // ------------------------------------------------------------------------
  // 4) ROUTER + CORTEX (symbolic CNS)
  // ------------------------------------------------------------------------
  const router = createRouterEngine({
    context,
    personaEngine,
    boundariesEngine,
    permissionsEngine
  });

  const cortex = createCortex({
    context,
    router,
    personaEngine,
    boundariesEngine,
    permissionsEngine
  });

  // ------------------------------------------------------------------------
  // 5) DUAL‑BAND ORGANISM (symbolic ↔ binary, artery‑aware)
  // ------------------------------------------------------------------------
  const dualBand = createDualBandOrganism({
    trace: context.trace,
    db,
    fsAPI,
    routeAPI,
    schemaAPI
  });

  // ------------------------------------------------------------------------
  // 6) REAL ORGANS (symbolic service organs)
  // ------------------------------------------------------------------------
  const osPresence = PulseOSPresence.create({
    SystemClock: context.SystemClock,
    IdentityDirectory: context.IdentityDirectory,
    DeviceFingerprint: context.DeviceFingerprint,
    log: context.log
  });

  const meshPresenceRelay = PulseMeshPresenceRelay.create({
    MeshBus: context.MeshBus,
    SystemClock: context.SystemClock,
    IdentityDirectory: context.IdentityDirectory,
    log: context.log
  });

  const doctor = createDoctorAPI({ context, db });
  const surgeon = createSurgeonAPI({ context, db });
  const lawyer = createLawyerAPI({ context, db });
  const entrepreneur = createEntrepreneurAPI({ context, db });
  const veterinarian = createVeterinarianAPI({ context, db });
  const clinician = createClinicianAPI({ context, db });
  const evolutionary = createEvolutionaryAPI({ context, db });

  // ------------------------------------------------------------------------
  // 7) CORE ORGANS (v24 → v30‑IMMORTAL++ spine)
  // ------------------------------------------------------------------------
  const architect = createArchitectAPI({ context, db });
  const tourist = createTouristAPI({ context, db });
  const environment = createEnvironmentAPI({ context, db, fsAPI, routeAPI });
  const power = createPowerAPI({ context, db });
  const evolution = createEvolutionAPI({ context, fsAPI, routeAPI, schemaAPI });
  const earn = createEarnAPI({ context, db });
  const diagnosticsWrite = createDiagnosticsWriteAPI({ context, db });

  // (Future trust/jury/evidence organs)
  // const safetyFrame = createSafetyFrameOrgan({ context, db });
  // const juryFrame = createJuryFrame({ context, db });

  // ------------------------------------------------------------------------
  // 8) UNIVERSAL SYSTEM MAP
  // ------------------------------------------------------------------------
  const ALL_SYSTEMS = Object.freeze({
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    router,
    cortex,
    dualBand,
    chunker,
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
    osPresence,
    meshPresenceRelay
    // safetyFrame,
    // juryFrame
  });

  // ------------------------------------------------------------------------
  // 9) REGISTER CHUNKER WITH DUAL‑BAND + ROUTER
  // ------------------------------------------------------------------------
  dualBand.registerBackendOrgan("chunker", chunker);
  router.registerBackendOrgan("chunker", chunker);

  // ------------------------------------------------------------------------
  // 10) UNIVERSAL REGISTRATION WITH CHUNKER (lane‑aware)
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
              case "dualBand":
                return "lane-dualband";
              case "osPresence":
              case "meshPresenceRelay":
                return "lane-presence";
              case "diagnosticsWrite":
                return "lane-diagnostics";
              default:
                return "lane-core";
            }
          })()
        });
      }
    }
  }

  // ------------------------------------------------------------------------
  // 11) UNIVERSAL PREWARM
  // ------------------------------------------------------------------------
  chunker.prewarm();

  for (const system of Object.values(ALL_SYSTEMS)) {
    system.prewarm();
  }

  createTouristAPI.prewarmTourist(tourist);

  // ------------------------------------------------------------------------
  // 12) RETURN FULL ORGANISM MAP (frozen, read‑only)
  // ------------------------------------------------------------------------
  return Object.freeze(ALL_SYSTEMS);
}

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility
// ---------------------------------------------------------------------------
PulseRealm.AIOrganAssembly = {
    BrainstemMeta,
    createOrgans
}
