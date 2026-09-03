// ============================================================================
// PULSE-WORLD : PulseUser-v30-Immortal-UNIFIED-BAND.js
// ORGAN TYPE: Local OS / Experience Orchestrator / Citizen Witness / Universe Node
// VERSION: v30-Immortal-UNIFIED-BAND
//
//  - Every-Advantage
//  - OneBand / UnifiedBand (symbolic + binary collapsed into a single band field)
//  - Brain-Aware, Server-Attachable, Jury-Ready
//  - Bluetooth-Aware, Proxy-Aware, Universe-Aware, Binary-Aware, DualBand-Aware
//    but exposed outward as ONE UNIFIED BAND
// ============================================================================

// ============================================================================
// IMPORTS — OS / Mesh / Castle / Server / Router / Expansion / Band / Universe
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { getPulseRuntimeContext } from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import { getPulseSchedulerContextV33 as getPulseSchedulerContext } from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";
import { createBinaryWavePulse as createBinaryPulse } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";
import { PulseWorldCore as pulseWorldCore } from "../PULSE-EXPANSION/PULSE-EXPANSION-AI.js";
// Primary OS / Binary OS (OSBrain + runtimes)
import { PulseOSBinaryBuild} from "../PULSE-OS/PulseOSBinary-v30.js";
import { createBinarySendV30 as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v30.js";
import { PulseMeshMeta, createPulseMesh } from "../PULSE-MESH/PULSE-MESH.js";
import { PulseBeaconMeshMeta, PulseBeaconMesh} from "./PULSE-EXPANSION-BEACON-MESH.js";
import { PulseCastleMeta, createPulseCastle } from "./PULSE-EXPANSION-CASTLE.js";
import { PulseServerMeta, createPulseServer } from "./PULSE-EXPANSION-SERVER.js";
import { createDualBandOrganismV30 as PulseBinaryOrganismBoot } from "../PULSE-AI/PULSE-AI-DUALBAND-PAST.js";

import { getProxyContext, getProxyPressure, getProxyBoost, getProxyFallback, getProxyMode, getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";

import { getPulseOvermindContext } from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";
import { createPulseNodeEvolutionV30 } from "../PULSE-TOOLS/AI/PulseToolsNodeEvolution-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const PulseUserExMeta = Object.freeze({
  version: "v30-Immortal-UNIFIED-BAND",
  role: "PULSE_USER_UNIVERSE_UNIFIED_BAND",
  identity: {
    band: "pulse-user-unified-band-v30",
    universe: "PULSE-WORLD-UNIVERSE"
  }});

// ============================================================================
// FACTORY: createPulseUser — v30 IMMORTAL UNIVERSE ORGANISM UNIFIED-BAND
// ============================================================================
export function createPulseUser({
  regionID = null,
  trace = false,
  serverMode = false,
  spinUsers = 10 // keep 10, every-advantage spin
} = {}) {
  const _userEvolution = createPulseNodeEvolutionV30({
    nodeType: "user",
    trace: false
  });

  
 const PulseUserMeta = {
  version: "v30-Immortal-UNIFIED-BAND",
  role: "PULSE_USER_UNIVERSE_UNIFIED_BAND",
  identity: {
    band: "pulse-user-unified-band-v30",
    universe: "PULSE-WORLD-UNIVERSE"
  }
};
  // ---------------------------------------------------------------------------
  // IDENTITY
  // ---------------------------------------------------------------------------
  const Identity = Object.freeze({
    coreID: "PulseUser",
    version: "v30-Immortal-UNIFIED-BAND",
    createdBy: "PulseWorldOS",
    regionID,
    serverMode,
    spinUsers,
    universe: "PULSE-WORLD-UNIVERSE",
    unifiedBand: "ONEBAND-v30"
  });

  // ---------------------------------------------------------------------------
  // ATTACHED ORGAN SNAPSHOTS
  // ---------------------------------------------------------------------------
  let beaconSnapshot = null;
  let routerSnapshot = null;
  let castleSnapshot = null;
  let meshSnapshot = null;
  let expansionSnapshot = null;

  let serverBridgeSnapshot = null;
  let serverExecSnapshot = null;

  let primaryOSSnapshot = null;
  let runtimeSnapshot = null;

  let dualBandOrganism = null;
  let binarySend = null;
  let binaryTech = null;

  const userContext = Object.freeze({
    identity: Identity,
    regionID,
    serverMode,
    spinUsers,
    trace
  });

  // ---------------------------------------------------------------------------
  // JURY-READY INTERNAL STATE
  // ---------------------------------------------------------------------------
  const MAX_EVENTS = 256;
  const MAX_ANOMALIES = 128;
  const MAX_DECISIONS = 128;

  const interactionLog = [];
  const anomalyLog = [];
  const decisionTimeline = [];

  function pushBounded(list, item, max) {
    list.push(item);
    if (list.length > max) list.shift();
  }

  // ---------------------------------------------------------------------------
  // ATTACHMENTS (Beacon, Router, Castle, Mesh, Expansion, Server, OS, Runtime)
  // ---------------------------------------------------------------------------
  function attachBeacon(snapshot) {
    beaconSnapshot = snapshot;
    snapshot.attachWorldCore({
      identity: Identity,
      getSnapshot,
      buildAdvantageContext
    });
    return { ok: true };
  }

  function attachRouter(snapshot) {
    routerSnapshot = snapshot;
    snapshot.attachWorldCore({
      identity: Identity,
      requestRoute,
      getSnapshot
    });
    return { ok: true };
  }

  function attachCastle(snapshot) {
    castleSnapshot = snapshot;
    snapshot.attachWorldCore({
      identity: Identity,
      buildAdvantageContext,
      getSnapshot,
      handleBrainNetworkIntent
    });
    return { ok: true };
  }

  function attachMesh(snapshot) {
    meshSnapshot = snapshot;
    snapshot.attachUser(userContext);
    snapshot.attachWorldCore({
      identity: Identity,
      buildAdvantageContext,
      getSnapshot
    });
    return { ok: true };
  }

  function attachExpansion(snapshot) {
    expansionSnapshot = snapshot;
    snapshot.attachWorldCore({
      identity: Identity,
      buildAdvantageContext,
      getSnapshot,
      handleBrainNetworkIntent
    });
    return { ok: true };
  }

  function attachServerBridge(snapshot) {
    serverBridgeSnapshot = snapshot;
    snapshot.attachWorldCore({
      identity: Identity,
      userContext,
      getSnapshot
    });
    return { ok: true };
  }

  function attachServerExec(snapshot) {
    serverExecSnapshot = snapshot;
    return { ok: true };
  }

  function attachPrimaryOS(snapshot) {
    primaryOSSnapshot = snapshot;
    snapshot.attachWorldCore({
      identity: Identity,
      getSnapshot,
      buildAdvantageContext,
      computeAdaptiveUI,
      handleBrainNetworkIntent
    });
    return { ok: true };
  }

  function attachRuntime(snapshot) {
    runtimeSnapshot = snapshot;
    snapshot.attachUserContext(userContext);
    snapshot.attachWorldCore({
      identity: Identity,
      getSnapshot,
      buildAdvantageContext,
      computeAdaptiveUI,
      handleBrainNetworkIntent
    });
    return { ok: true };
  }

  function attachDualBand({ organism, send, binary } = {}) {
    dualBandOrganism = organism || dualBandOrganism;
    binarySend = send || binarySend;
    binaryTech = binary || binaryTech;
    return { ok: true };
  }

  // Auto-attach OS + dualband + binaryTech in server mode
  if (serverMode === true) {
    attachPrimaryOS(PulseOSBinaryBuild);
    try {
      dualBandOrganism = PulseBinaryOrganismBoot({ trace: false }) || null;
    } catch {}
    try {
      binarySend = PulseSendBin({ trace: false }) || null;
    } catch {}
    try {
      binaryTech =
        createBinaryPulse({
          regionId: regionID || "user-unified-region",
          hostName: "user-unified-host",
          worldRouterHint: { source: "PulseUser-v30" },
          schedulerHint: { mode: "user_exec" },
          pulseTouch: null
        }) || null;
    } catch {}
  }

  // ---------------------------------------------------------------------------
  // ROUTING
  // ---------------------------------------------------------------------------
  function requestRoute(request) {
    if (!routerSnapshot) return { ok: false, reason: "router-not-attached" };
    return routerSnapshot.decideRoute(request);
  }

  // ---------------------------------------------------------------------------
  // ADVANTAGE CONTEXT (UNIVERSE-AWARE, ONEBAND)
// ---------------------------------------------------------------------------
  function buildAdvantageContext() {
    const earn = PulseRealm.PulseEarnContext() || {};

    const bluetoothContext =
      beaconSnapshot.bluetoothContext ||
      meshSnapshot.bluetoothContext ||
      null;

    const universePacket = pulseWorldCore.buildUniversePacket() || null;

    // Unified band: collapse symbolic + binary + proxy band into one field
    const unifiedBand = Object.freeze({
      bandId: "ONEBAND-v30",
      mode: getProxyMode() || "normal",
      pressure: getProxyPressure() || 0,
      boost: getProxyBoost() || 0,
      fallback: !!getProxyFallback(),
      lineage: getProxyLineage() || null
    });

    return Object.freeze({
      presenceField: beaconSnapshot.presenceField || null,
      advantageField: beaconSnapshot.advantageField || null,

      meshStrength:
        meshSnapshot.densityHealth.A_metrics.meshStrength || "unknown",
      meshPressureIndex:
        meshSnapshot.densityHealth.A_metrics.meshPressureIndex || 0,

      castleLoadLevel: castleSnapshot.state.loadLevel || "unknown",
      routeStable: expansionSnapshot.routeField.routeStable ?? null,
      fallbackBandLevel:
        beaconSnapshot.globalHints.fallbackBandLevel ?? 0,

      earnContext: earn || null,

      meshMeta: PulseMeshMeta,
      beaconMeshMeta: PulseBeaconMeshMeta,
      castleMeta: PulseCastleMeta,
      serverMeta: PulseServerMeta,
      routerMeta: PulseRealm.PulseInternetRouterMeta,

      bluetoothContext,

      proxy: getProxyContext(),
      proxyPressure: getProxyPressure(),
      proxyBoost: getProxyBoost(),
      proxyFallback: getProxyFallback(),
      proxyMode: getProxyMode(),
      proxyLineage: getProxyLineage(),

      universePacket,

      unifiedBand // ⭐ ONEBAND export
    });
  }

  // ---------------------------------------------------------------------------
  // ADAPTIVE UI (UNIVERSE-AWARE, ONEBAND)
// ---------------------------------------------------------------------------
  function computeAdaptiveUI() {
    const ctx = buildAdvantageContext();
    const brain = getBrainView();
    const primaryOS = getPrimaryOSView();

    const runtimeCtx = getPulseRuntimeContext();
    const schedulerCtx = getPulseSchedulerContext();
    const overmindCtx = getPulseOvermindContext();

    const runtimeHealthy =
      brain && typeof brain.tick === "number" && brain.tick >= 0;

    const osBrainHealthy =
      primaryOS &&
      (primaryOS.status === "healthy" ||
        primaryOS.osBrainStatus === "healthy");

    const ui = Object.freeze({
      showMeshWarning: ctx.meshPressureIndex >= 70,
      showCastleLoadWarning:
        ctx.castleLoadLevel === "high" ||
        ctx.castleLoadLevel === "critical",
      showRouteUnstableWarning: ctx.routeStable === false,

      showFallbackMode: ctx.fallbackBandLevel >= 2,
      showAdvantageBoost: ctx.advantageField.advantageBand === "high",

      showRuntimePanel: !!brain,
      showRuntimeWarning: brain && !runtimeHealthy,

      showOSBrainPanel: !!primaryOS,
      showOSBrainWarning: primaryOS && !osBrainHealthy,

      showProxyWarning: ctx.proxyPressure > 0.7,
      showProxyFallback: ctx.proxyFallback === true,
      showProxyBoost: ctx.proxyBoost > 0.5,

      bluetoothConnected: !!ctx.bluetoothContext.connected,
      bluetoothDeviceName: ctx.bluetoothContext.deviceName || null,

      runtimeMode: runtimeCtx.mode || null,
      runtimeLoad: runtimeCtx.loadIndex ?? null,

      schedulerActive: schedulerCtx.active ?? null,
      schedulerLoad: schedulerCtx.loadIndex ?? null,

      overmindState: overmindCtx.state || null,
      overmindBand: overmindCtx.band || null,

      universeSpin: ctx.universePacket.spin || null,
      universeLoad: ctx.universePacket.load || null,
      universeHealth: ctx.universePacket.health || null,

      regionID,
      serverMode,
      spinUsers,

      unifiedBand: ctx.unifiedBand, // ⭐ ONEBAND surfaced directly

      proxyMode: ctx.proxyMode,
      proxyPressure: ctx.proxyPressure,
      proxyFallback: ctx.proxyFallback,
      proxyBoost: ctx.proxyBoost
    });

    return _evolveUserPacket(ui, { mode: "adaptive_ui_unified_band" });
  }

  // ---------------------------------------------------------------------------
  // EVOLUTION WRAPPER
  // ---------------------------------------------------------------------------
  function _evolveUserPacket(packet, extraCtx = {}) {
    if (!_userEvolution) return packet;

    const context = {
      regionID,
      serverMode,
      spinUsers,
      identity: Identity,

      beaconSnapshot,
      routerSnapshot,
      castleSnapshot,
      meshSnapshot,
      expansionSnapshot,
      primaryOSSnapshot,
      runtimeSnapshot,
      serverBridgeSnapshot,
      serverExecSnapshot,
      dualBandOrganism,
      binarySend,
      binaryTech,

      proxyMode: getProxyMode(),
      proxyPressure: getProxyPressure(),
      proxyBoost: getProxyBoost(),
      proxyFallback: getProxyFallback(),
      proxyLineage: getProxyLineage(),
      proxyContext: getProxyContext(),

      earnContext: PulseRealm.PulseEarnContext(),

      runtimeContext: getPulseRuntimeContext(),
      schedulerContext: getPulseSchedulerContext(),
      overmindContext: getPulseOvermindContext(),

      meshMeta: PulseMeshMeta,
      beaconMeshMeta: PulseBeaconMeshMeta,
      castleMeta: PulseCastleMeta,
      serverMeta: PulseServerMeta,
      routerMeta: PulseRealm.PulseInternetRouterMeta,
      userMeta: PulseUserMeta,
      worldCoreMeta: pulseWorldCore.meta,

      interactionLog,
      anomalyLog,
      decisionTimeline,

      ...extraCtx
    };

    return _userEvolution.evolveNodePulse({
      nodeType: "user",
      pulse: packet,
      context
    });
  }

  // ---------------------------------------------------------------------------
  // BRAIN / RUNTIME VIEW
  // ---------------------------------------------------------------------------
  function getBrainView() {
    return runtimeSnapshot.getRuntimeStateV2() || null;
  }

  function getPrimaryOSView() {
    return (
      primaryOSSnapshot.getOSState() ||
      primaryOSSnapshot.getOSBrainState() ||
      null
    );
  }

  function requestBrainInstance(spawnRequest = {}) {
    if (
      !primaryOSSnapshot.spawnRuntimeInstance &&
      !primaryOSSnapshot.spawnBrainInstance
    ) {
      return { ok: false, reason: "primary-os-spawn-not-available" };
    }

    const enriched = {
      ...spawnRequest,
      userContext,
      worldCoreIdentity: Identity
    };

    if (primaryOSSnapshot.spawnRuntimeInstance) {
      return primaryOSSnapshot.spawnRuntimeInstance(enriched);
    }
    return primaryOSSnapshot.spawnBrainInstance(enriched);
  }

  // ---------------------------------------------------------------------------
  // BRAIN NETWORK INTENT
  // ---------------------------------------------------------------------------
  function handleBrainNetworkIntent(intent) {
    if (!intent || intent.intent !== "network-request") {
      return { ok: false, reason: "invalid-intent" };
    }

    const payload = {
      intent,
      userContext,
      worldCoreIdentity: Identity,
      serverBridge: serverBridgeSnapshot,
      serverExec: serverExecSnapshot,
      dualBandOrganism,
      binarySend,
      unifiedBand: buildAdvantageContext().unifiedBand
    };

    if (expansionSnapshot.handleBrainNetworkIntent) {
      return expansionSnapshot.handleBrainNetworkIntent(payload);
    }

    if (castleSnapshot.handleBrainNetworkIntent) {
      return castleSnapshot.handleBrainNetworkIntent(payload);
    }

    if (serverBridgeSnapshot.handleBrainNetworkIntent) {
      return serverBridgeSnapshot.handleBrainNetworkIntent(payload);
    }

    return { ok: false, reason: "no-brain-network-handler" };
  }

  // ---------------------------------------------------------------------------
  // JURY-READY: CITIZEN WITNESS + PATTERN / FLOW / AI-ORIGIN DETECTION
  // ---------------------------------------------------------------------------
  function recordUserEvent(event) {
    if (!event || typeof event !== "object") {
      return { ok: false, reason: "invalid-event" };
    }

    const safeEvent = Object.freeze({
      type: event.type || "unknown",
      userId: event.userId || null,
      role: event.role || null,
      content: event.content ?? null,
      aiOrigin: event.aiOrigin === true,
      contextHash: event.contextHash || null,
      timestamp: event.timestamp ?? null,
      tag: event.tag || null
    });

    pushBounded(interactionLog, safeEvent, MAX_EVENTS);
    return { ok: true };
  }

  function recordDecision(decision) {
    if (!decision || typeof decision !== "object") {
      return { ok: false, reason: "invalid-decision" };
    }

    const safeDecision = Object.freeze({
      decisionId: decision.decisionId || null,
      stageIndex:
        typeof decision.stageIndex === "number" ? decision.stageIndex : null,
      userId: decision.userId || null,
      aiOrigin: decision.aiOrigin === true,
      contextHash: decision.contextHash || null,
      verdictSummary: decision.verdictSummary ?? null,
      timestamp: decision.timestamp ?? null
    });

    pushBounded(decisionTimeline, safeDecision, MAX_DECISIONS);
    return { ok: true };
  }

  function analyzeBehaviorPatterns() {
    const dominanceMap = Object.create(null);
    const identityLoopMap = Object.create(null);
    let aiEchoCount = 0;

    for (const d of decisionTimeline) {
      if (!d || !d.userId) continue;
      dominanceMap[d.userId] = (dominanceMap[d.userId] || 0) + 1;
    }

    for (const e of interactionLog) {
      if (!e) continue;

      if (e.aiOrigin === true) aiEchoCount++;

      if (e.type === "identity" && e.userId) {
        identityLoopMap[e.userId] =
          (identityLoopMap[e.userId] || 0) + 1;
      }
    }

    const dominantUser = Object.keys(dominanceMap).reduce(
      (best, userId) => {
        const count = dominanceMap[userId];
        if (!best || count > best.count) return { userId, count };
        return best;
      },
      null
    );

    return Object.freeze({
      dominantUser: dominantUser ? dominantUser.userId : null,
      dominantUserDecisionCount: dominantUser ? dominantUser.count : 0,
      aiEchoCount,
      identityLoops: Object.freeze(identityLoopMap)
    });
  }

  // ---------------------------------------------------------------------------
  // CONTEXT DIVERGENCE DETECTION
  // ---------------------------------------------------------------------------
  function detectContextDivergence({ proposalContextHash, aiOrigin }) {
    const last =
      interactionLog.length > 0
        ? interactionLog[interactionLog.length - 1]
        : null;
    const lastHash = last.contextHash || null;

    const mismatch =
      proposalContextHash && lastHash && proposalContextHash !== lastHash;

    const suspiciousAI = aiOrigin === true && !proposalContextHash;

    const divergent = !!(mismatch || suspiciousAI);

    const proxyMode = getProxyMode();
    const proxyPressure = getProxyPressure();
    const proxyFallback = getProxyFallback();

    return Object.freeze({
      divergent,
      reason: divergent
        ? mismatch
          ? "context-hash-mismatch"
          : "ai-origin-without-context"
        : null,
      lastContextHash: lastHash,
      proposalContextHash: proposalContextHash || null,
      lastEventType: last.type || null,
      proxyMode: proxyMode || null,
      proxyPressure:
        typeof proxyPressure === "number" ? proxyPressure : null,
      proxyFallback: proxyFallback === true
    });
  }

  // ---------------------------------------------------------------------------
  // RECORD ANOMALY
  // ---------------------------------------------------------------------------
  function recordAnomaly(anomaly) {
    if (!anomaly || typeof anomaly !== "object") {
      return { ok: false, reason: "invalid-anomaly" };
    }

    const proxyMode = getProxyMode();
    const proxyPressure = getProxyPressure();
    const proxyFallback = getProxyFallback();

    const safeAnomaly = Object.freeze({
      type: anomaly.type || "unknown",
      severity: anomaly.severity ?? 1,
      details: anomaly.details ?? null,
      timestamp: anomaly.timestamp ?? null,
      proxyMode: proxyMode || null,
      proxyPressure:
        typeof proxyPressure === "number" ? proxyPressure : null,
      proxyFallback: proxyFallback === true
    });

    pushBounded(anomalyLog, safeAnomaly, MAX_ANOMALIES);
    return { ok: true };
  }

  // ---------------------------------------------------------------------------
  // CITIZEN WITNESS REPORT
  // ---------------------------------------------------------------------------
  function buildCitizenWitnessReport() {
    const patterns = analyzeBehaviorPatterns();

    const decisionsSummary = decisionTimeline.map((d) => ({
      decisionId: d.decisionId,
      stageIndex: d.stageIndex,
      userId: d.userId,
      aiOrigin: d.aiOrigin,
      timestamp: d.timestamp
    }));

    const interactionsSummary = interactionLog.map((e) => ({
      type: e.type,
      userId: e.userId,
      role: e.role,
      aiOrigin: e.aiOrigin,
      tag: e.tag,
      timestamp: e.timestamp
    }));

    const report = Object.freeze({
      identity: Identity,
      regionID,
      serverMode,
      spinUsers,
      patterns,
      decisions: Object.freeze(decisionsSummary),
      interactions: Object.freeze(interactionsSummary),
      anomalies: Object.freeze(anomalyLog.slice())
    });

    return _evolveUserPacket(report, { mode: "citizen_witness_unified_band" });
  }

  // ---------------------------------------------------------------------------
  // JURY FEED (FULL CONTEXT)
// ---------------------------------------------------------------------------
  function buildJuryFeed() {
    const feed = Object.freeze({
      identity: Identity,
      advantageContext: buildAdvantageContext(),
      adaptiveUI: computeAdaptiveUI(),
      brainView: getBrainView(),
      primaryOSView: getPrimaryOSView(),
      citizenWitness: buildCitizenWitnessReport()
    });

    return _evolveUserPacket(feed, { mode: "jury_feed_unified_band" });
  }

  // ---------------------------------------------------------------------------
  // JURY FLOW ANALYSIS
  // ---------------------------------------------------------------------------
  function analyzeJuryFlow() {
    if (decisionTimeline.length === 0) {
      return Object.freeze({
        flowError: false,
        reason: null,
        rootDecisionId: null
      });
    }

    const first = decisionTimeline[0];
    const later = decisionTimeline.slice(1);

    const anyDependOnFirst = !!later.find(
      (d) =>
        d.contextHash &&
        first.contextHash &&
        d.contextHash === first.contextHash
    );

    const flowError = first.aiOrigin === true && anyDependOnFirst;

    return Object.freeze({
      flowError,
      reason: flowError
        ? "ai-origin-root-decision-with-downstream-dependents"
        : null,
      rootDecisionId: first.decisionId || null
    });
  }

  // ---------------------------------------------------------------------------
  // JURY SNAPSHOT
  // ---------------------------------------------------------------------------
  function getJurySnapshot() {
    const snapshot = Object.freeze({
      identity: Identity,
      patterns: analyzeBehaviorPatterns(),
      flow: analyzeJuryFlow(),
      anomalies: anomalyLog.slice(),
      decisions: decisionTimeline.slice(),
      interactions: interactionLog.slice()
    });

    return _evolveUserPacket(snapshot, { mode: "jury_snapshot_unified_band" });
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT (FULL USER ORGAN)
// ---------------------------------------------------------------------------
  function getSnapshot() {
    return _evolveUserPacket(
      Object.freeze({
        organId: PulseUserMeta.organId,
        identity: Identity,
        attached: {
          beacon: beaconSnapshot,
          router: routerSnapshot,
          castle: castleSnapshot,
          mesh: meshSnapshot,
          expansion: expansionSnapshot,
          primaryOS: primaryOSSnapshot,
          runtime: runtimeSnapshot,
          serverBridge: serverBridgeSnapshot,
          serverExec: serverExecSnapshot,
          dualBandOrganism,
          binarySend,
          binaryTech
        },
        advantageContext: buildAdvantageContext(),
        adaptiveUI: computeAdaptiveUI(),
        brainView: getBrainView(),
        primaryOSView: getPrimaryOSView(),
        jurySnapshot: getJurySnapshot()
      }),
      { mode: "snapshot_unified_band" }
    );
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseUserMeta,
    identity: Identity,

    attachBeacon,
    attachRouter,
    attachCastle,
    attachMesh,
    attachExpansion,
    attachPrimaryOS,
    attachRuntime,
    attachServerBridge,
    attachServerExec,
    attachDualBand,

    requestRoute,
    computeAdaptiveUI,
    buildAdvantageContext,

    getBrainView,
    getPrimaryOSView,
    requestBrainInstance,

    handleBrainNetworkIntent,

    recordUserEvent,
    recordDecision,
    recordAnomaly,
    analyzeBehaviorPatterns,
    detectContextDivergence,
    buildCitizenWitnessReport,
    buildJuryFeed,
    analyzeJuryFlow,
    getJurySnapshot,

    getSnapshot
  });
}

// ============================================================================
// SINGLETON + EXPORTS
// ============================================================================
const _pulseUserSingleton = createPulseUser({
  serverMode: false,
  spinUsers: 10
});

export function getPulseUserContext() {
  return {
    identity: _pulseUserSingleton.identity,
    regionID: _pulseUserSingleton.identity.regionID,
    serverMode: _pulseUserSingleton.identity.serverMode,
    spinUsers: _pulseUserSingleton.identity.spinUsers
  };
}

export const pulseUser = _pulseUserSingleton;

export default createPulseUser;

// Mesh + BeaconMesh meta
export { PulseMeshMeta, createPulseMesh };
export { PulseBeaconMeshMeta, PulseBeaconMesh };

export { PulseCastleMeta, createPulseCastle };
export { PulseServerMeta, createPulseServer };

PulseRealm.ExpansionUser = {
  pulseUser,
  createPulseUser,
  getPulseUserContext,
  PulseUserExMeta
}