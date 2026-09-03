// ============================================================================
//  aiExecutionEngine-v30.js — Pulse OS v30‑IMMORTAL++
//  Dual‑Band Execution • Persona Routing • Organ Dispatch • Trust‑Aware
//  PURE EXECUTION. ZERO MUTATION. ZERO RANDOMNESS.
//  v30: dual-band aware, orbital‑ready, context‑first
// ============================================================================

import { createCognitiveFrame as createAIContext } from "./PulseAIContext-v30.js";
import { createOrgans as createBrainstem } from "../PulseAIBrainstem-v30.js";
import { createPersonaEngineV30 as resolvePersonaV12 } from "./PulseAIPersonality-v30.js";
import { routeAIRequest } from "../PulseAIRouter-v30.js";
import { canPerformDynamic } from "./PulseAIBoundaries-v30.js";

import { createArchitectOrgan as runArchitectMode } from "../ARCHETYPES/PulseAIArchitect-v30.js";
import { createClinicianOrgan as runObserverMode } from "../ARCHETYPES/PulseAIClinician-v30.js";
import { createTouristAPI_v30 as runTourGuideMode } from "../ARCHETYPES/PulseAITourist-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// META
// ============================================================================
export const ExecutionEngineMeta = Object.freeze({
  version: "v30-IMMORTAL++",
  layer: "execution-engine",
  role: "execution",
  identity: "ai-execution-engine-v30",
  evo: {
    epoch: "v30",
    notes: [
      "dual-band aware",
      "context-frame integrated",
      "trust/permissions surfaced",
      "orbital-ready arteries"
    ]
  }
});

// ============================================================================
// PACKET EMITTER — deterministic, window-safe
// ============================================================================
function emitExecutionPacket(type, payload = {}) {
  return Object.freeze({
    meta: {
      version: ExecutionEngineMeta.version,
      epoch: ExecutionEngineMeta.evo.epoch,
      identity: ExecutionEngineMeta.identity,
      layer: ExecutionEngineMeta.layer,
      role: ExecutionEngineMeta.role
    },
    packetType: `execution-${type}`,
    timestamp: PulseRealm.PulseNOW,
    ...payload
  });
}

// ============================================================================
// PREWARM
// ============================================================================
export function prewarmExecutionEngine({ trace = false } = {}) {
  try {
    const sampleRequest = { domain: "system", action: "read", intent: "prewarm" };

    const packet = emitExecutionPacket("prewarm", {
      message: "Execution engine prewarmed and routing + persona pathways aligned.",
      sampleRequest
    });

    if (trace) console.log("[ExecutionEngine v30] prewarm", packet);
    return packet;
  } catch (err) {
    return emitExecutionPacket("prewarm-error", {
      error: String(err),
      message: "Execution engine prewarm failed."
    });
  }
}

// ============================================================================
// CORE EXECUTION — v30‑IMMORTAL++
// ============================================================================
export async function runAI(
  request = {},
  operation,
  deps = {},
  dualBand = null
) {
  const {
    db,
    fsAPI,
    routeAPI,
    schemaAPI,
    trustFabric = null,
    juryFrame = null,
    permissionsEngine = null,
    watchdog = null
  } = deps || {};

  // 1) Cognitive Frame
  const context = createAIContext(request);
  console.log("AI context initialized.");

  const startPacket = emitExecutionPacket("start", {
    requestSummary: {
      domain: request.domain || "system",
      action: request.action || "read",
      intent: request.intent || "analyze"
    }
  });

  // 2) Brainstem
  const brainstem = createBrainstem(request, db, fsAPI, routeAPI, schemaAPI);
  Object.assign(context, brainstem.context);
  context.organs = brainstem.organs;
  context.brainstemPacket = brainstem.packet;

  // 3) Dual‑Band Routing
  const routing = routeAIRequest(request, dualBand);
  context.routing = routing;

  const orbitalArtery = dualBand.artery.orbital || null;

  const binaryVitals = {
    metabolic: {
      pressure: routing.dualBand.binaryPressure ?? 0,
      load: routing.dualBand.binaryLoad ?? 0
    },
    artery: dualBand.artery.organism || null,
    orbital: orbitalArtery
  };

  const trustArtery = dualBand.artery.trust || {};

  // 4) Persona Resolution
  const persona = resolvePersonaV12({
    personaId: routing.personaId,
    userId: context.userId,
    evoState: context.evoState || {},
    routerHints: routing.dualBand,
    binaryVitals
  });

  context.persona = persona;
  context.personaId = persona.id;

  // 5) Boundary Mode + Permissions
  const boundaryMode = persona.boundaryMode;
  context.boundaryMode = boundaryMode;

  const boundaryDecision = canPerformDynamic(
    persona.id,
    request.domain || "system",
    request.action || "read",
    boundaryMode,
    binaryVitals
  );

  context.boundaryDecision = boundaryDecision;

  let permissionsAllowed = true;
  let capabilityArtery = null;

  if (permissionsEngine) {
    permissionsAllowed = permissionsEngine.check(persona.id, request.action || "read", {
      trustArtery
    });
    capabilityArtery = permissionsEngine.capabilityArterySnapshot(persona.id);
  }

  context.permissions = {
    boundaryAllowed: boundaryDecision.allowed,
    permissionsAllowed,
    effectiveAllowed: boundaryDecision.allowed && permissionsAllowed
  };

  const trustRisk =
    Math.max(
      trustArtery.honeypotRisk ?? 0,
      trustArtery.dominanceRisk ?? 0,
      trustArtery.anomalyScore ?? 0
    );

  if (!context.permissions.effectiveAllowed) {
    console.log("Permission denied by boundaries/permissions.");

    const packet = emitExecutionPacket("permission-denied", {
      personaId: persona.id,
      domain: request.domain || "system",
      action: request.action || "read",
      boundaryMode,
      binaryVitals,
      trustRisk,
      capabilityArtery
    });

    trustFabric.recordExecutionDenied({
      personaId: persona.id,
      domain: request.domain || "system",
      action: request.action || "read",
      trustRisk
    });

    juryFrame.recordEvidence("execution-permission-denied", packet);

    return buildAIResponse(null, context, packet, startPacket, null, null, {
      capabilityArtery,
      watchdogArtery: watchdog.getWatchdogArterySnapshot({ binaryVitals, trustArtery }) || null
    });
  }

  // 6) Context Frame (dual‑band symbolic context engine)
  let contextFramePacket = null;
  if (dualBand && dualBand.symbolic && dualBand.symbolic.contextEngine) {
    const contextEngine = dualBand.symbolic.contextEngine;
    const dualBandPayload = {
      brainstem: {
        context: { userId: context.userId, userIsOwner: context.userIsOwner },
        organs: context.organs
      },
      request,
      routerPacket: routing,
      persona,
      binaryVitals: {
        throughput: routing.dualBand.binaryThroughput ?? 1,
        pressure: binaryVitals.metabolic.pressure ?? 0,
        load: binaryVitals.metabolic.load ?? 0,
        orbital: orbitalArtery
      },
      dualBand
    };

    contextFramePacket = contextEngine.buildContextFrame(dualBandPayload);
    context.contextFrame = contextFramePacket;
  }

  const modePacket = emitExecutionPacket("mode-selected", {
    personaId: persona.id,
    boundaryMode,
    binaryVitals,
    trustRisk
  });

  trustFabric.recordExecutionMode({
    personaId: persona.id,
    boundaryModeId: boundaryMode.id || "unknown",
    trustRisk
  });

  juryFrame.recordEvidence("execution-mode-selected", modePacket);

  // 7) Execution
  let result = null;

  try {
    console.log("Executing AI operation...");

    switch (persona.id) {
      case "architect":
        result = await runArchitectMode(request, context, operation);
        break;
      case "observer":
        result = await runObserverMode(request, context, operation);
        break;
      case "tourguide":
        result = await runTourGuideMode(request, context, operation);
        break;
      default:
        result = await operation(context);
        break;
    }

    console.log("AI operation completed successfully.");

    const completePacket = emitExecutionPacket("complete", {
      personaId: persona.id,
      boundaryMode,
      binaryVitals,
      trustRisk,
      artery: binaryVitals.artery || null
    });

    trustFabric.recordExecutionComplete({
      personaId: persona.id,
      trustRisk
    });

    juryFrame.recordEvidence("execution-complete", completePacket);

    return buildAIResponse(
      result,
      context,
      completePacket,
      startPacket,
      modePacket,
      contextFramePacket,
      {
        capabilityArtery,
        watchdogArtery: watchdog.getWatchdogArterySnapshot({ binaryVitals, trustArtery }) || null
      }
    );
  } catch (err) {
    context.flagSlowdown("Operation threw an exception.");
    console.log(`Error: ${err.message}`);

    const errorPacket = emitExecutionPacket("error", {
      personaId: persona.id,
      boundaryMode,
      binaryVitals,
      trustRisk,
      error: String(err)
    });

    trustFabric.recordExecutionError({
      personaId: persona.id,
      trustRisk,
      error: String(err)
    });

    juryFrame.recordEvidence("execution-error", errorPacket);

    return buildAIResponse(
      null,
      context,
      errorPacket,
      startPacket,
      modePacket,
      contextFramePacket,
      {
        capabilityArtery,
        watchdogArtery: watchdog.getWatchdogArterySnapshot({ binaryVitals, trustArtery }) || null
      }
    );
  }
}

// ============================================================================
// RESPONSE BUILDER
// ============================================================================
function buildAIResponse(
  result,
  context,
  packet,
  startPacket,
  modePacket,
  contextFramePacket,
  arteries = {}
) {
  return Object.freeze({
    result,
    context,
    persona: context.persona,
    routing: context.routing,
    boundaryMode: context.boundaryMode,
    permissions: context.permissions,
    organs: context.organs,
    contextFrame: context.contextFrame || null,
    arteries: {
      capability: arteries.capabilityArtery || null,
      watchdog: arteries.watchdogArtery || null
    },
    packets: {
      start: startPacket || null,
      mode: modePacket || null,
      contextFrame: contextFramePacket || null,
      final: packet || null
    }
  });
}

export default runAI;

// ============================================================================
// DUAL EXPORT LAYER — CommonJS compatibility
// ============================================================================
PulseRealm.AIEngine = {
    ExecutionEngineMeta,
    runAI,
    default: runAI,
    prewarmExecutionEngine
}
