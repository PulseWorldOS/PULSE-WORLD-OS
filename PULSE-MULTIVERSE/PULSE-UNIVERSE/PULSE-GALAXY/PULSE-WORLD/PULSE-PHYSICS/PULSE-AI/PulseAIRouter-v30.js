// ============================================================================
//  aiRouter-v30-IMMORTAL-ADVANTAGE++.js
//  Pulse OS v30++ IMMORTAL-ADVANTAGE++ — AI ROUTER ORGAN
//  • Persona router • Archetype mapper • Dual-band + organism-aware
//  • Routing Artery v5 • Organism Health v5 • Proxy/Earn/NodeAdmin aware
//  • Pure routing, zero mutation, zero randomness, deterministic, drift-proof
//  • Map-free meta: organ-local, no legacy Organism Map dependency
// ============================================================================

import { Personas, getPersona } from "./PERSONALITY/PulseAIPersonality-v30.js";
import {createPulseSchedulerV33 as createPulseScheduler } from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";
import {PulseRuntimeV30} from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import {createPulseNodeAdmin as NodeAdmin} from "../PULSE-TOOLS/AI/PulseToolsNodeAdmin-v30.js";
import {createPulseBeaconEngine as PulseBeaconEngine} from "../PULSE-EXPANSION/PULSE-EXPANSION-BEACON-ENGINE.js";
import { createPulseEarnSendSystem_v31 } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";
import { prewarmDualBandBridgeV30 as PulseBinaryOrganismBoot } from "./PULSE-AI-DUALBAND-PAST.js";
import { createBinarySendV30 as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v30.js";
import {createBinaryRouterUnifiedBand as createBinaryRouter} from "../PULSE-ROUTER/PulseRouterBinary-v30.js";
import {PulseRouter} from "../PULSE-ROUTER/PulseRouter-v30.js";
import { getProxyContext, getProxyPressure, getProxyBoost, getProxyFallback, getProxyMode, getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  LOCAL META — v30 IMMORTAL-ADVANTAGE++ (map-free, organ-local)
// ============================================================================
export const AIRouterMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiRouter",
  layer: "R0-RouterCore",
  version: "30-IMMORTAL-ADVANTAGE++",
  identity: "aiRouter-v30-IMMORTAL-ADVANTAGE++",
  role: "PersonaRouter",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    dualBandAware: true,
    organismAware: true,
    proxyAware: true,
    earnAware: true,
    overmindAware: true,
    nodeAdminAware: true,

    routingArteryV5: true,
    organismHealthV5: true,

    mapFreeMeta: true,
    epoch: "30-IMMORTAL-ADVANTAGE++"
  }),
  guarantees: Object.freeze({
    pureRouting: true,
    zeroRandomness: true,
    zeroMutation: true,
    personaDeterminism: true
  })
});

// ============================================================================


const ArchetypePages = Object.freeze({
  ARCHITECT: "aiArchitect-v30.js",
  ASSISTANT: "aiAssistant.js",
  BINARY_AGENT: "aiBinaryAgent-v30.js",
  CLINICIAN: "aiClinician-v30.js",
  DEBUG: "aiDebug-v30.js",
  DIAGNOSTICS: "aiDiagnostics-v30.js",
  DIAGNOSTICS_WRITE: "aiDiagnosticsWrite-v30.js",
  DOCTOR: "aiDoctorAssistant-v30.js",
  DOCTOR_ARCHITECT: "aiDoctorArchitect-v30.js",
  EARN: "aiEarn.js",
  ENTREPRENEUR: "aiEntrepreneur-v30.js",
  ENVIRONMENT: "aiEnvironment-v30.js",
  EVOLUTION: "aiEvolution-v30.js",
  EVOLUTIONARY: "aiEvolutionary-v30.js",
  LAWYER: "aiLawAssistant-v30.js",
  POWER: "aiPower.js",
  SURGEON: "aiSurgeon-v30.js",
  TOURIST: "aiTourist-v30.js",
  VETERINARIAN: "aiVeterinarian-v30.js"
});

const _MAX_CACHE_ENTRIES = 128;
const _routingCache = new Map();

function _buildCacheKey(request = {}, dualBand = null, organismHealth = null) {
  const {
    intent = "analyze",
    touchesBackend = false,
    touchesFrontend = false,
    touchesSchemas = false,
    touchesFiles = false,
    touchesLogs = false,
    touchesRoutes = false,
    touchesErrors = false,
    touchesTourism = false,
    touchesUsers = false,
    touchesArchitecture = false,
    touchesEvolution = false,
    touchesEnvironment = false,
    touchesPower = false,
    touchesEarn = false,
    touchesPulse = false,
    touchesHistory = false,
    touchesSettings = false,
    userIsOwner = false,
    safetyMode: requestedSafetyMode = null
  } = request;

  let organismSig = 0;
  if (dualBand.organism.organismSnapshot) {
    const snapshot = dualBand.organism.organismSnapshot();
    if (typeof snapshot === "string") organismSig = snapshot.length;
  }

  const healthBucket =
    organismHealth && typeof organismHealth.compositeScore === "number"
      ? Math.round(organismHealth.compositeScore * 10)
      : 0;

  return JSON.stringify({
    intent: String(intent || "").toLowerCase(),
    touchesBackend,
    touchesFrontend,
    touchesSchemas,
    touchesFiles,
    touchesLogs,
    touchesRoutes,
    touchesErrors,
    touchesTourism,
    touchesUsers,
    touchesArchitecture,
    touchesEvolution,
    touchesEnvironment,
    touchesPower,
    touchesEarn,
    touchesPulse,
    touchesHistory,
    touchesSettings,
    userIsOwner,
    requestedSafetyMode: requestedSafetyMode || null,
    organismSig,
    healthBucket
  });
}

function _cacheGet(key) {
  if (!_routingCache.has(key)) return null;
  const value = _routingCache.get(key);
  _routingCache.delete(key);
  _routingCache.set(key, value);
  return value;
}

function _cacheSet(key, value) {
  if (_routingCache.has(key)) {
    _routingCache.delete(key);
  } else if (_routingCache.size >= _MAX_CACHE_ENTRIES) {
    const firstKey = _routingCache.keys().next().value;
    if (firstKey !== undefined) _routingCache.delete(firstKey);
  }
  _routingCache.set(key, value);
}

export function prewarmAIRouter(samples = [], dualBand = null, organismHealth = null) {
  if (!Array.isArray(samples)) return;
  for (const req of samples) {
    try {
      const key = _buildCacheKey(req, dualBand, organismHealth);
      if (_cacheGet(key)) continue;
      const result = routeAIRequest(req, dualBand, { organismHealth });
      _cacheSet(key, result);
    } catch {
      // never throw on prewarm
    }
  }
}

let _castleSnap = null;
let _meshSnap = null;
let _expansionSnap = null;
let _serverSnap = null;
let _worldCoreSnap = null;
let _dualBandOrganism = null;
let _binarySend = null;
let _runtimeSnap = null;
let _schedulerSnap = null;
let _earnSnap = null;
let _beaconMeshSnap = null;

export function attachCastleSnapshot(snapshot) {
  _castleSnap = snapshot || null;
  return { ok: true };
}
export function attachMeshSnapshot(snapshot) {
  _meshSnap = snapshot || null;
  return { ok: true };
}
export function attachExpansionSnapshot(snapshot) {
  _expansionSnap = snapshot || null;
  return { ok: true };
}
export function attachServerSnapshot(snapshot) {
  _serverSnap = snapshot || null;
  return { ok: true };
}
export function attachWorldCoreSnapshot(snapshot) {
  _worldCoreSnap = snapshot || null;
  return { ok: true };
}
export function attachDualBandOrganism(organism) {
  _dualBandOrganism = organism || null;
  return { ok: true };
}
export function attachBinarySend(binarySend) {
  _binarySend = binarySend || null;
  return { ok: true };
}
export function attachRuntimeSnapshot(snapshot) {
  _runtimeSnap = snapshot || null;
  return { ok: true };
}
export function attachSchedulerSnapshot(snapshot) {
  _schedulerSnap = snapshot || null;
  return { ok: true };
}
export function attachEarnSnapshot(snapshot) {
  _earnSnap = snapshot || null;
  return { ok: true };
}
export function attachBeaconMeshSnapshot(snapshot) {
  _beaconMeshSnap = snapshot || null;
  return { ok: true };
}

function _clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function computeOrganismHealth(dualBand = null) {
  const castle = _castleSnap;
  const mesh = _meshSnap;
  const expansion = _expansionSnap;
  const server = _serverSnap;
  const worldCore = _worldCoreSnap;
  const runtimeSnap = _runtimeSnap;
  const schedulerSnap = _schedulerSnap;
  const beaconMeshSnap = _beaconMeshSnap;

  const earnContext = _earnSnap || PulseRealm.PulseEarnContext() || {};

  const castleLoadLevel = castle.state.loadLevel || "unknown";
  const castleLoadScore =
    castleLoadLevel === "critical"
      ? 1
      : castleLoadLevel === "high"
      ? 0.8
      : castleLoadLevel === "medium"
      ? 0.5
      : castleLoadLevel === "low"
      ? 0.2
      : 0.3;

  const meshPressureIndex =
    mesh.densityHealth.A_metrics.meshPressureIndex ??
    mesh.densityHealth.metrics.meshPressureIndex ??
    0;
  const meshPressureScore = _clamp01(meshPressureIndex / 100);

  const beaconCompositePressure =
    beaconMeshSnap.compositeField.meshPressureIndex ??
    beaconMeshSnap.presenceField.meshPressureIndex ??
    null;
  const beaconPressureScore = beaconCompositePressure
    ? _clamp01(beaconCompositePressure / 100)
    : 0;

  const routeStable = expansion.routeField.routeStable;
  const expansionScore =
    routeStable === false ? 0.9 : routeStable === true ? 0.2 : 0.4;

  const fallbackBandLevel =
    worldCore.advantageContext.fallbackBandLevel ??
    worldCore.advantageField.fallbackBandLevel ??
    0;
  const worldCoreFallbackScore = _clamp01(fallbackBandLevel / 4);

  const serverScore =
    server.meta.guarantees.multiInstanceBatchAware === true ? 0.4 : 0.3;

  const runtimePressure =
    runtimeSnap.pressureIndex ?? runtimeSnap.hotPressure ?? 0;
  const runtimeScore = _clamp01(runtimePressure / 100);

  const schedulerTicks =
    schedulerSnap.ticksPerCycle ?? schedulerSnap.maxTicks ?? 0;
  const schedulerScore = _clamp01(schedulerTicks / 1024);

  const earnLoad =
    earnContext.treasuryPressure ?? earnContext.earnPressure ?? 0;
  const earnScore = _clamp01(earnLoad);

  let organismSnapshotBits = 0;
  let binaryLoad = 0;
  let binaryPressure = 0;

  const effectiveDualBand = dualBand || _dualBandOrganism || null;
  if (effectiveDualBand.organism.organismSnapshot) {
    const snapshot = effectiveDualBand.organism.organismSnapshot();
    if (typeof snapshot === "string") {
      organismSnapshotBits = snapshot.length;
      binaryLoad = _clamp01(organismSnapshotBits / 4096);
      binaryPressure = binaryLoad;
    }
  }
  const dualBandScore = binaryPressure;

  const sendQueueDepth = _binarySend.getQueueDepth() ?? 0;
  const sendScore = _clamp01(sendQueueDepth / 100);

  const proxyPressure = _clamp01(getProxyPressure() || 0);
  const proxyFallback = !!getProxyFallback();
  const proxyBoost = _clamp01(getProxyBoost() || 0);

  const proxyScore = _clamp01(
    proxyPressure * 0.6 + (proxyFallback ? 0.3 : 0) - proxyBoost * 0.2
  );

  const components = {
    castleLoadScore,
    meshPressureScore,
    beaconPressureScore,
    expansionScore,
    worldCoreFallbackScore,
    serverScore,
    runtimeScore,
    schedulerScore,
    earnScore,
    dualBandScore,
    sendScore,
    proxyScore
  };

  const compositeScore = _clamp01(
    castleLoadScore * 0.15 +
      meshPressureScore * 0.15 +
      beaconPressureScore * 0.05 +
      expansionScore * 0.1 +
      worldCoreFallbackScore * 0.1 +
      serverScore * 0.05 +
      runtimeScore * 0.1 +
      schedulerScore * 0.05 +
      earnScore * 0.05 +
      dualBandScore * 0.1 +
      sendScore * 0.05 +
      proxyScore * 0.05
  );

  return Object.freeze({
    compositeScore,
    components,
    proxy: {
      pressure: proxyPressure,
      fallback: proxyFallback,
      boost: proxyBoost,
      mode: getProxyMode() || null,
      lineage: getProxyLineage() || null
    }
  });
}

function _bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}
function _bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}
function _bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function computeRoutingArteryV5(flags, binaryLoad, personaId, organismHealth) {
  const flagValues = Object.values(flags || {});
  const activeFlags = flagValues.filter(Boolean).length;
  const flagDensity = Math.min(1, activeFlags / 16);
  const loadFactor = Math.min(1, binaryLoad);

  const basePressure = Math.max(0, Math.min(1, (flagDensity + loadFactor) / 2));

  const organismStress =
    organismHealth && typeof organismHealth.compositeScore === "number"
      ? organismHealth.compositeScore
      : 0;

  const proxyPressure = Math.max(0, Math.min(1, getProxyPressure() || 0));

  const pressure = Math.max(
    0,
    Math.min(1, (basePressure + organismStress * 0.5 + proxyPressure * 0.3) / 1.8)
  );

  let personaBias = 0;
  if (personaId === Personas.ARCHITECT) personaBias = 0.1;
  else if (personaId === Personas.OBSERVER) personaBias = 0.05;
  else if (personaId === Personas.TOURGUIDE) personaBias = -0.05;

  const throughputBase = Math.max(0, 1 - pressure);
  const throughput = Math.max(0, Math.min(1, throughputBase + personaBias));

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    activeFlags,
    flagDensity,
    binaryLoad,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: _bucketLevel(throughput),
    pressureBucket: _bucketPressure(pressure),
    costBucket: _bucketCost(cost),
    budgetBucket: _bucketLevel(budget),
    organismStress,
    proxyPressure
  });
}

function selectPrimaryArchetypePage(personaId, flags) {
  const {
    touchesEnvironment,
    touchesPower,
    touchesEarn,
    touchesTourism,
    touchesUsers,
    touchesLogs,
    touchesRoutes,
    touchesErrors,
    touchesHistory,
    touchesPulse,
    touchesEvolution
  } = flags;

  if (personaId === Personas.ARCHITECT) {
    if (touchesEvolution && ArchetypePages.EVOLUTIONARY)
      return ArchetypePages.EVOLUTIONARY;
    return ArchetypePages.ARCHITECT || null;
  }

  if (personaId === Personas.OBSERVER) {
    if (
      (touchesLogs ||
        touchesRoutes ||
        touchesErrors ||
        touchesHistory ||
        touchesPulse) &&
      ArchetypePages.DIAGNOSTICS
    ) {
      return ArchetypePages.DIAGNOSTICS;
    }
    return ArchetypePages.DEBUG || ArchetypePages.DIAGNOSTICS || null;
  }

  if (personaId === Personas.TOURGUIDE) {
    if (touchesTourism && ArchetypePages.TOURIST)
      return ArchetypePages.TOURIST;
    return ArchetypePages.TOURIST || null;
  }

  if (personaId === Personas.NEUTRAL) {
    if (touchesEarn && ArchetypePages.EARN) return ArchetypePages.EARN;
    if (touchesUsers && ArchetypePages.ASSISTANT)
      return ArchetypePages.ASSISTANT;
    return ArchetypePages.ASSISTANT || ArchetypePages.ENTREPRENEUR || null;
  }

  return null;
}

export function routeAIRequest(request = {}, dualBand = null, options = {}) {
  const reasoning = [];

  const organismHealth =
    options.organismHealth || computeOrganismHealth(dualBand);

  const cacheKey = _buildCacheKey(request, dualBand, organismHealth);
  const cached = _cacheGet(cacheKey);
  if (cached) {
    return Object.freeze({ ...cached, reasoning: cached.reasoning || [] });
  }

  const intent = (request.intent || "analyze").toLowerCase();
  reasoning.push(`Intent: ${intent}`);

  const {
    touchesBackend = false,
    touchesFrontend = false,
    touchesSchemas = false,
    touchesFiles = false,
    touchesLogs = false,
    touchesRoutes = false,
    touchesErrors = false,
    touchesTourism = false,
    touchesUsers = false,
    touchesArchitecture = false,
    touchesEvolution = false,
    touchesEnvironment = false,
    touchesPower = false,
    touchesEarn = false,
    touchesPulse = false,
    touchesHistory = false,
    touchesSettings = false,
    userIsOwner = false,
    safetyMode: requestedSafetyMode = null
  } = request;

  const flags = Object.freeze({
    touchesBackend,
    touchesFrontend,
    touchesSchemas,
    touchesFiles,
    touchesLogs,
    touchesRoutes,
    touchesErrors,
    touchesTourism,
    touchesUsers,
    touchesArchitecture,
    touchesEvolution,
    touchesEnvironment,
    touchesPower,
    touchesEarn,
    touchesPulse,
    touchesHistory,
    touchesSettings,
    userIsOwner
  });

  Object.entries(flags).forEach(([k, v]) => {
    if (v) reasoning.push(`Flag: ${k}`);
  });

  // Persona baseline
  let personaId = Personas.NEUTRAL;

  if (
    touchesArchitecture ||
    touchesEvolution ||
    touchesSchemas ||
    touchesBackend ||
    touchesFiles ||
    (touchesEnvironment && userIsOwner) ||
    (touchesPower && userIsOwner) ||
    (touchesEarn && userIsOwner) ||
    (touchesSettings && userIsOwner)
  ) {
    personaId = userIsOwner ? Personas.ARCHITECT : Personas.NEUTRAL;
    reasoning.push(
      userIsOwner
        ? "System-level request → ARCHITECT baseline."
        : "Non-owner system request → NEUTRAL baseline."
    );
  } else if (
    touchesLogs ||
    touchesRoutes ||
    touchesErrors ||
    touchesHistory ||
    touchesPulse
  ) {
    personaId = Personas.OBSERVER;
    reasoning.push("Diagnostics request → OBSERVER baseline.");
  } else if (touchesTourism || touchesUsers || touchesEarn || touchesPulse) {
    personaId = Personas.TOURGUIDE;
    reasoning.push("User-facing request → TOURGUIDE baseline.");
  } else {
    personaId = Personas.NEUTRAL;
    reasoning.push("Generic request → NEUTRAL baseline.");
  }

  // Organism-aware overrides
  const h = organismHealth.components || {};

  if (h.meshPressureScore >= 0.7 && personaId !== Personas.OBSERVER) {
    reasoning.push("Mesh pressure high → OBSERVER override.");
    personaId = Personas.OBSERVER;
  }

  if (h.castleLoadScore >= 0.7 && personaId === Personas.ARCHITECT) {
    reasoning.push("Castle load high → avoid ARCHITECT → NEUTRAL.");
    personaId = Personas.NEUTRAL;
  }

  if (h.expansionScore >= 0.7 && personaId !== Personas.OBSERVER) {
    reasoning.push("Expansion unstable → OBSERVER override.");
    personaId = Personas.OBSERVER;
  }

  if (h.worldCoreFallbackScore >= 0.6 && personaId !== Personas.NEUTRAL) {
    reasoning.push("Fallback band high → NEUTRAL safe persona.");
    personaId = Personas.NEUTRAL;
  }

  if (h.dualBandScore >= 0.7 && personaId === Personas.ARCHITECT) {
    reasoning.push("Binary pressure high → avoid heavy ARCHITECT → NEUTRAL.");
    personaId = Personas.NEUTRAL;
  }

  if (h.sendScore >= 0.7 && personaId === Personas.OBSERVER) {
    reasoning.push("Binary send congestion → avoid heavy diagnostics → NEUTRAL.");
    personaId = Personas.NEUTRAL;
  }

  if (organismHealth.proxy.fallback && personaId !== Personas.NEUTRAL) {
    reasoning.push("Proxy fallback active → NEUTRAL safe persona.");
    personaId = Personas.NEUTRAL;
  }

  if (organismHealth.compositeScore >= 0.9) {
    if (
      touchesArchitecture ||
      touchesBackend ||
      touchesSchemas ||
      touchesEvolution
    ) {
      reasoning.push("Critical stress + system flags → ARCHITECT override.");
      personaId = Personas.ARCHITECT;
    } else {
      reasoning.push("Critical stress → OBSERVER override.");
      personaId = Personas.OBSERVER;
    }
  }

  const persona = getPersona(personaId);
  const permissions = persona.permissions || {};
  const boundaries = persona.boundaries || {};

  reasoning.push(`Persona final: ${personaId}`);

  const primaryArchetypePage = selectPrimaryArchetypePage(personaId, flags);
  const archetypes = Object.freeze({
    primaryPage: primaryArchetypePage,
    pages: { ...ArchetypePages }
  });

  if (primaryArchetypePage) {
    reasoning.push(`Archetype page: ${primaryArchetypePage}`);
  }

  // Dual-band metrics for artery
  let organismSnapshotBits = 0;
  let binaryLoad = 0;

  const effectiveDualBand = dualBand || _dualBandOrganism || null;
  if (effectiveDualBand.organism.organismSnapshot) {
    const snapshot = effectiveDualBand.organism.organismSnapshot();
    if (typeof snapshot === "string") {
      organismSnapshotBits = snapshot.length;
      binaryLoad = Math.min(1, organismSnapshotBits / 4096);
    }
  }

  const routingArtery = computeRoutingArteryV5(
    flags,
    binaryLoad,
    personaId,
    organismHealth
  );

  const safetyMode =
    requestedSafetyMode ||
    (organismHealth.proxy.fallback ? "strict" : "normal");

  const packet = Object.freeze({
    meta: AIRouterMeta,
    intent,
    flags,
    personaId,
    personaMeta: persona.meta || null,
    permissions,
    boundaries,
    archetypes,
    routingArtery,
    organismHealth,
    safetyMode,
    dualBand: !!effectiveDualBand,
    proxy: organismHealth.proxy,
    nodeAdminHint: NodeAdmin.getHint() || null,
    reasoning: Object.freeze(reasoning)
  });

  _cacheSet(cacheKey, packet);
  return packet;
}

PulseRealm.AIRouter = {
    AIRouterMeta,
    routeAIRequest,
    prewarmAIRouter,
    attachCastleSnapshot,
    attachMeshSnapshot,
    attachExpansionSnapshot,
    attachServerSnapshot,
    attachWorldCoreSnapshot,
    attachDualBandOrganism,
    attachBinarySend,
    attachRuntimeSnapshot,
    attachSchedulerSnapshot,
    attachEarnSnapshot,
    attachBeaconMeshSnapshot
}
