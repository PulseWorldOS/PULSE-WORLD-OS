/**
 * ============================================================================
 *  PULSE-WORLD : PulseMesh-v30-Immortal-OneBand++.js
 *  ORGAN TYPE: Connectivity / Symbolic Mesh Organism
 *  VERSION: v30-Immortal-OneBand++
 * ============================================================================
 *
 *  ROLE (v30++):
 *    PulseMesh is the symbolic connective tissue of PulseWorld.
 *    It is the ORGANISM MAP — the symbolic view that connects:
 *
 *      - PulseExpansion (federal strategist)
 *      - PulseCastle (presence host / governance / arteries)
 *      - PulseServer (server lanes)
 *      - PulseUser (user lanes)
 *      - PulseTouch (presence / identity / persona / trust)
 *      - PulseNet / Router (mesh family / ingress / pressure)
 *      - PulseRuntime (hot instances / modes / pages)
 *      - PulseScheduler (macro tick orchestration)
 *      - PulseOvermind (world-lens / safety)
 *      - BeaconMesh / BeaconPresence (presence beacons)
 *      - Continuance + OmniHosting (risk / arteries / cost overlays)
 *      - Proxy / Dual-band organism (symbolic + binary)
 *
 *    It does NOT route, send, forward, or execute anything.
 *    It ONLY computes symbolic signals:
 *
 *      - density / health / pressure
 *      - presence / advantage
 *      - persona / identity tier
 *      - device / bluetooth / band presence
 *      - one-band multi-radio profile (symbolic)
 *      - world-mesh aggregation + civilization tier
 *      - proxy pressure / fallback / boost
 *      - continuance risk + fallback band
 *      - omnihosting artery pressure/load
 *      - mesh cost index
 *
 *  CONTRACT (v30++):
 *    - Pure symbolic mesh (no routing, no sending, no execution).
 *    - Deterministic, drift-proof, zero-mutation of inputs.
 *    - Multi-mesh aggregation (symbolic only).
 *    - Dual-band symbolic/binary aware (but no physics).
 *    - Prewarm-aware, chunk-aware, cache-aware.
 *    - One-band worldview: any band → PulseBand (symbolic).
 *    - Must never perform network or filesystem operations.
 *    - Must never depend on real time or randomness.
 */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// IMPORTS — v30 ORGANISM CONTEXT
// ============================================================================
import { PulseExpansionMeta, getPulseExpansionContext, PulseExpansion} from "./PULSE-EXPANSION-WORLD.js";
import { getPulseCastleContext} from "./PULSE-EXPANSION-CASTLE.js";
import { PulseServerMeta,  getPulseServerContext} from "./PULSE-EXPANSION-SERVER.js";
import { getPulseUserContext} from "./PULSE-EXPANSION-USER.js";
import { getBeaconEngineContext} from "./PULSE-EXPANSION-BEACON-ENGINE.js";
import { getPulseBeaconConsoleContext as getConsoleContext} from "./PULSE-EXPANSION-BEACON-CONSOLE.js";
import { getPulseRuntimeContext} from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import { getPulseSchedulerContextV33 as getPulseSchedulerContext} from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";
import { getPulseOvermindContext} from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";
import { getProxyContext, getProxyPressure, getProxyBoost, getProxyFallback, getProxyMode, getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";
import { getLastContinuanceState} from "../PULSE-FINALITY/PULSE-FINALITY-CONTINUANCE.js";
import { getLastOmniHostingState} from "../PULSE-FINALITY/PULSE-FINALITY-OMNIHOSTING.js";
import { BinaryMeshMeta2 as BinaryMeshMeta} from "../PULSE-MESH/PULSE-MESH-BINARY.js";





// Touch is client‑only. Expansion organs must not import it.
// Provide a safe, inert server-side context instead.

function getPulseTouchContext() {
  return {
    band: "PulseBand",
    deviceId: null,
    route: "server",
    ts: PulseRealm.PulseNOW,
    server: true
  };
}

// ============================================================================
// SINGLETONS (v30)
// ============================================================================

// ============================================================================
// META — v30
// ============================================================================

export const PulseExpansionMeshMeta = Object.freeze({
  organId: "PulseMesh-v30-Immortal-OneBand++",
  role: "SYMBOLIC_MESH_ORGANISM",
  version: "v30-Immortal-OneBand++",
  layer: "Connectivity",

  epoch: "v30-immortal-oneband-civilization",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBandAware: true,
    oneBandAware: true,
    multiRadioAware: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,

    presenceAware: true,
    advantageAware: true,
    personaAware: true,
    identityTierAware: true,
    bluetoothAware: true,
    devicePresenceAware: true,
    bandPresenceAware: true,

    meshPressureAware: true,
    densityAware: true,
    costAware: true,
    bridgeAware: true,
    multiInstanceAware: true,
    expansionAware: true,
    routerAware: true,
    userAware: true,
    worldMeshAware: true,
    osBrainAware: true,
    serverAware: true,
    castleAware: true,
    runtimeAware: true,
    overmindAware: true,
    pulseTouchAware: true,
    pulseNetAware: true,
    schedulerAware: true,
    beaconPresenceAware: true,

    proxyAware: true,
    proxyPressureAware: true,
    proxyFallbackAware: true,
    proxyBoostAware: true,

    continuanceAware: true,
    omniHostingAware: true,
    arteryAware: true,

    chunkPrewarmAware: true,
    cacheAware: true,
    prewarmAware: true
  })
});

// ============================================================================
// TIMELINE — v30 symbolic history
// ============================================================================

export const Timeline = {
  revision: 0,
  symbolicEpoch: PulseExpansionMeshMeta.epoch
};

function bumpRevision(reason = "unknown") {
  Timeline.revision += 1;
  return {
    revision: Timeline.revision,
    reason
  };
}

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

// ============================================================================
// CONTINUANCE + OMNIHOSTING OVERLAY (global hints)
// ============================================================================

function buildContinuanceOmniHostingOverlay(continuanceState, omniHostingState) {
  const riskReport = continuanceState.riskReport || null;
  const globalRisk = clamp01(riskReport.globalRisk ?? 0);
  const fallbackBandLevel = riskReport.fallbackBandLevel ?? 0;
  const prewarmHint = riskReport.prewarmHint || null;
  const cacheHint = riskReport.cacheHint || null;
  const chunkHint = riskReport.chunkHint || null;

  const artery =
    omniHostingState.lastPlacementPlan.artery ||
    omniHostingState.lastFailoverPlan.artery ||
    null;

  const arteryPressure = clamp01(artery.pressure ?? 0);
  const arteryLoad = clamp01(artery.load ?? 0);

  return Object.freeze({
    fallbackContext: {
      fallbackBandLevel
    },
    chunkHints: {
      chunkAggression: chunkHint.chunkAggression ?? (1 - globalRisk)
    },
    cacheHints: {
      keepHot: cacheHint.keepHot ?? globalRisk >= 0.4,
      priority:
        cacheHint.priority ??
        (globalRisk >= 0.8
          ? "critical"
          : globalRisk >= 0.6
          ? "high"
          : "normal")
    },
    prewarmHints: {
      shouldPrewarm: prewarmHint.shouldPrewarm ?? globalRisk >= 0.4,
      reason: prewarmHint.reason ?? "continuance_overlay"
    },
    arteryOverlay: {
      globalRisk,
      arteryPressure,
      arteryLoad
    }
  });
}

// ============================================================================
// ONE-BAND MULTI-RADIO PROFILE (symbolic only)
// ============================================================================

function burstWindowsDutyCycle(risk, pressure) {
  const r = Math.max(risk, pressure);
  if (r >= 0.8) return "short-high";
  if (r >= 0.6) return "medium-high";
  if (r >= 0.4) return "medium";
  return "low";
}

function buildMultiRadioProfile({
  densityHint = "medium",
  demandHint = "medium",
  meshStatus = "unknown",
  continuanceRisk = 0,
  proxyPressure = 0
} = {}) {
  const risk = clamp01(continuanceRisk);
  const pressure = clamp01(proxyPressure);

  // One-band worldview: any band is PulseBand; we still label symbolic lanes.
  let bandMode = "pulseband-signal-low-power"; // signal-low-power | presence-steady | mesh-coop | expansion-lane
  if (meshStatus === "strong") bandMode = "pulseband-mesh-coop";
  if (demandHint === "high") bandMode = "pulseband-presence-steady";
  if (densityHint === "low") bandMode = "pulseband-expansion-lane";

  let lteAssist = "idle"; // idle | assist-light | assist-heavy
  if (risk >= 0.6 || pressure >= 0.6) {
    lteAssist = "assist-heavy";
  } else if (risk >= 0.3 || pressure >= 0.3) {
    lteAssist = "assist-light";
  }

  const burstWindows = {
    enabled: risk >= 0.7 || pressure >= 0.7,
    reason: risk >= 0.7 || pressure >= 0.7 ? "high_risk_or_pressure" : "normal",
    suggestedDutyCycle: burstWindowsDutyCycle(risk, pressure)
  };

  return Object.freeze({
    bandMode,
    lteAssist,
    burstWindows,
    meta: {
      densityHint,
      demandHint,
      meshStatus,
      continuanceRisk: risk,
      proxyPressure: pressure
    }
  });
}

// ============================================================================
// FACTORY — PulseMesh v30-Immortal-OneBand++
// ============================================================================

export function createPulseMesh({
  meshID = null,
  regionID = null,
  trace = false
} = {}) {
  const Identity = Object.freeze({
    meshID,
    regionID,
    createdBy: "PulseExpansion-v30",
    version: PulseExpansionMeshMeta.version
  });

  const log = (...args) => trace && console.log("[PulseMesh v30]", ...args);

  // --------------------------------------------------------------------------
  // 1. Topology
  // --------------------------------------------------------------------------
  const Topology = {
    nodes: {
      userNodes: [],
      castleNodes: [],
      bridgeNodes: []
    },
    links: {
      edges: []
    },
    limits: Object.freeze({
      maxNodesPerRegion: 5000,
      maxEdgesPerNode: 64
    })
  };

  // --------------------------------------------------------------------------
  // 2. Density / Health / Pressure (v30)
  // --------------------------------------------------------------------------
  const DensityHealth = {
    metrics: {
      userCount: 0,
      castleCount: 0,
      avgLatencyMs: null,
      packetLossRate: 0,
      meshStrength: "unknown",
      relayLoadScore: 0,
      pingFrequencyScore: 0,
      meshContributionScore: 0,
      meshPressureIndex: 0,

      proxyPressure: 0,
      proxyBoost: 0,
      proxyFallback: false,
      proxyMode: "normal",

      continuanceGlobalRisk: 0,
      arteryPressure: 0,
      arteryLoad: 0
    },
    thresholds: Object.freeze({
      weakThresholdUsers: 1,
      stableThresholdUsers: 5,
      strongThresholdUsers: 20,
      highPressureThreshold: 70
    })
  };

  // --------------------------------------------------------------------------
  // 3. Organism Context (v30, explicit nulls)
  // --------------------------------------------------------------------------
  function buildOrganismContext() {
    const expansion = getPulseExpansionContext();
    const castle = getPulseCastleContext();
    const server = getPulseServerContext();
    const router = PulseRealm.PulseInternetContext;
    const beaconEngine = getBeaconEngineContext() ?? null;
    const consoleCtx = getConsoleContext() ?? null;
    const user = getPulseUserContext() ?? null;
    const touch = getPulseTouchContext() ?? null;
    const runtime = getPulseRuntimeContext() ?? null;
    const scheduler = getPulseSchedulerContext() ?? null;
    const overmind = getPulseOvermindContext() ?? null;

    const proxyMeta = {
      context: getProxyContext() ?? null,
      pressure: getProxyPressure() ?? 0,
      boost: getProxyBoost() ?? 0,
      fallback: getProxyFallback() ?? false,
      mode: getProxyMode() || "normal",
      lineage: getProxyLineage() ?? null
    };

    const continuanceState = getLastContinuanceState() || null;
    const omniHostingState = getLastOmniHostingState() || null;
    const continuanceOverlay = buildContinuanceOmniHostingOverlay(
      continuanceState,
      omniHostingState
    );

    return {
      expansion,
      castle,
      server,
      router,
      beaconEngine,
      console: consoleCtx,
      user,
      touch,
      runtime,
      scheduler,
      overmind,
      proxyMeta,
      continuanceState,
      omniHostingState,
      continuanceOverlay
    };
  }

  // --------------------------------------------------------------------------
  // 4. Presence & Advantage (v30++)
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const proxy = ctx.proxyMeta || {};

    // One-band: we still expose bluetooth/radio, but treat them as PulseBand.
    const radioBand = touch.radioBand || "pulseband-symbolic";

    return Object.freeze({
      bandPresence: touch.bandPresence || "unknown",
      devicePresence: touch.devicePresence || "unknown",
      bluetoothPresence: touch.bluetoothPresence || "off",
      radioBand,
      persona: touch.persona || "neutral",
      identityTier: touch.identityTier || "anon",
      trusted: touch.trusted || "unknown",

      touchMode: touch.mode || "unknown",
      touchPage: touch.page || "unknown",
      chunkProfile: touch.chunkProfile || "default",

      runtimeHotPresence: runtime.hotPresence || null,
      runtimeModes: runtime.hotModes || null,
      runtimePages: runtime.hotPages || null,

      proxyMode: proxy.mode,
      proxyFallback: proxy.fallback
    });
  }

  function buildAdvantageField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const user = ctx.user || {};
    const proxy = ctx.proxyMeta || {};
    const continuanceOverlay = ctx.continuanceOverlay;

    return Object.freeze({
      advantageScore: touch.advantageScore ?? 0,
      advantageBand: touch.advantageBand ?? "neutral",
      fallbackBandLevel:
        touch.fallbackBandLevel ??
        continuanceOverlay.fallbackContext.fallbackBandLevel ??
        0,

      userContributionScore: user.contributionScore ?? 0,
      runtimeContributionHeat: runtime.hotInstances || null,

      proxyPressure: proxy.pressure,
      proxyBoost: proxy.boost,
      proxyFallback: proxy.fallback,

      continuanceGlobalRisk: continuanceOverlay.arteryOverlay.globalRisk,
      arteryPressure: continuanceOverlay.arteryOverlay.arteryPressure,
      arteryLoad: continuanceOverlay.arteryOverlay.arteryLoad
    });
  }

  // --------------------------------------------------------------------------
  // 5. Density + Pressure (v30++)
  // --------------------------------------------------------------------------
  function computeDensityAndPressure({
    userCount,
    castleCount,
    avgLatencyMs,
    packetLossRate,
    relayLoadScore,
    pingFrequencyScore,
    meshContributionScore
  }) {
    DensityHealth.metrics.userCount = userCount;
    DensityHealth.metrics.castleCount = castleCount;
    DensityHealth.metrics.avgLatencyMs = avgLatencyMs;
    DensityHealth.metrics.packetLossRate = packetLossRate;
    DensityHealth.metrics.relayLoadScore = relayLoadScore;
    DensityHealth.metrics.pingFrequencyScore = pingFrequencyScore;
    DensityHealth.metrics.meshContributionScore = meshContributionScore;

    const t = DensityHealth.thresholds;

    let meshStrength = "unknown";
    if (userCount >= t.strongThresholdUsers) meshStrength = "strong";
    else if (userCount >= t.stableThresholdUsers) meshStrength = "stable";
    else if (userCount >= t.weakThresholdUsers) meshStrength = "weak";

    const basePressure =
      relayLoadScore * 0.4 +
      pingFrequencyScore * 0.3 +
      meshContributionScore * 0.3;

    let meshPressureIndex = Math.max(
      0,
      Math.min(100, Math.round(basePressure))
    );

    const proxyPressure = getProxyPressure() ?? 0;
    const proxyBoost = getProxyBoost() ?? 0;
    const proxyFallback = getProxyFallback() ?? false;
    const proxyMode = getProxyMode() || "normal";

    const continuanceState = getLastContinuanceState() || null;
    const omniHostingState = getLastOmniHostingState() || null;
    const continuanceOverlay = buildContinuanceOmniHostingOverlay(
      continuanceState,
      omniHostingState
    );

    DensityHealth.metrics.proxyPressure = proxyPressure;
    DensityHealth.metrics.proxyBoost = proxyBoost;
    DensityHealth.metrics.proxyFallback = proxyFallback;
    DensityHealth.metrics.proxyMode = proxyMode;

    DensityHealth.metrics.continuanceGlobalRisk =
      continuanceOverlay.arteryOverlay.globalRisk;
    DensityHealth.metrics.arteryPressure =
      continuanceOverlay.arteryOverlay.arteryPressure;
    DensityHealth.metrics.arteryLoad =
      continuanceOverlay.arteryOverlay.arteryLoad;

    // proxy + continuance overlays into pressure
    meshPressureIndex += Math.round(proxyPressure * 20);
    meshPressureIndex -= Math.round(proxyBoost * 5);

    if (proxyFallback || proxyMode === "fallback") {
      meshPressureIndex = Math.min(100, meshPressureIndex + 10);
    }

    meshPressureIndex += Math.round(
      continuanceOverlay.arteryOverlay.globalRisk * 10
    );
    meshPressureIndex += Math.round(
      continuanceOverlay.arteryOverlay.arteryPressure * 10
    );

    meshPressureIndex = Math.max(0, Math.min(100, meshPressureIndex));

    DensityHealth.metrics.meshStrength = meshStrength;
    DensityHealth.metrics.meshPressureIndex = meshPressureIndex;

    bumpRevision("density-pressure-update");

    return Object.freeze({
      meshStrength,
      meshPressureIndex,
      userCount,
      castleCount
    });
  }

  // --------------------------------------------------------------------------
  // 6. Symbolic Lanes (v30++)
  // --------------------------------------------------------------------------
  function buildExpansionSignal() {
    const ctx = buildOrganismContext();
    const expansion = ctx.expansion || {};

    return Object.freeze({
      regionID: regionID || expansion.regionID || null,
      meshID,
      density: DensityHealth.metrics.userCount,
      meshStrength: DensityHealth.metrics.meshStrength,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField()
    });
  }

  function buildCastleSignal() {
    const ctx = buildOrganismContext();
    const castle = ctx.castle || {};
    const beaconEngine = ctx.beaconEngine;
    const consoleCtx = ctx.console;

    return Object.freeze({
      castleID: castle.core.castleId || null,
      castleRole: castle.core.role || "generic",
      castleLoadScore: castle.core.loadIndex ?? null,
      beaconEngineState: beaconEngine ? beaconEngine.state : null,
      consoleMode: consoleCtx ? consoleCtx.mode : "standard",
      meshStrength: DensityHealth.metrics.meshStrength,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField()
    });
  }

  function buildUserMeshSignal() {
    const ctx = buildOrganismContext();
    const user = ctx.user || {};

    return Object.freeze({
      userID: user.id || null,
      userTier: user.tier || "guest",
      userContributionScore: user.contributionScore ?? null,
      regionID,
      meshID,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField(),
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex
    });
  }

  function buildServerSignal() {
    const ctx = buildOrganismContext();
    const server = ctx.server || {};

    return Object.freeze({
      serverRegion: server.core.regionId || regionID || "unknown",
      serverHostName: server.core.hostName || null,
      serverRole: server.core.role || "generic",
      serverMode: server.core.mode || "standard",
      meshStrength: DensityHealth.metrics.meshStrength,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex
    });
  }

  function buildRouterSignal() {
    const ctx = buildOrganismContext();
    const router = ctx.router || {};
    const scheduler = ctx.scheduler || {};
    const overmind = ctx.overmind || {};
    const proxy = ctx.proxyMeta || {};

    return Object.freeze({
      routerLoad: router.core.routerLoad || null,
      routerPersonaMix: router.core.personaMix || null,
      routerSafetyMode: router.core.safetyMode || "standard",
      schedulerMaxTicks: scheduler.maxTicks || null,
      schedulerStopOnWorldLens: scheduler.stopOnWorldLens || null,
      overmindWorldLens: overmind.worldLens || null,
      overmindSafetyStatus: overmind.safetyStatus || null,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,

      proxyMode: proxy.mode,
      proxyPressure: proxy.pressure,
      proxyFallback: proxy.fallback
    });
  }

  function buildRuntimeSignal() {
    const ctx = buildOrganismContext();
    const runtime = ctx.runtime || {};
    const proxy = ctx.proxyMeta || {};

    return Object.freeze({
      hotInstances: runtime.hotInstances || null,
      hotRegions: runtime.hotRegions || null,
      hotPresence: runtime.hotPresence || null,
      hotModes: runtime.hotModes || null,
      hotPages: runtime.hotPages || null,
      hotChunkProfiles: runtime.hotChunkProfiles || null,
      hotTrust: runtime.hotTrust || null,

      runtimeMode: runtime.mode || null,
      runtimeLoadIndex: runtime.loadIndex ?? null,
      runtimeRegion: runtime.region || null,

      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      proxyMode: proxy.mode
    });
  }

  function buildTouchSignal() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const proxyMeta = ctx.proxyMeta || {};
    const continuanceOverlay = ctx.continuanceOverlay;

    return Object.freeze({
      presence: touch.presence || "unknown",
      mode: touch.mode || "unknown",
      page: touch.page || "unknown",
      chunkProfile: touch.chunkProfile || "default",
      identity: touch.identity || null,
      identityTier: touch.identityTier || "anon",
      trusted: touch.trusted || "unknown",
      region: touch.region || regionID || "unknown",

      touchAdvantage: touch.advantageScore ?? null,
      touchFallbackBand:
        touch.fallbackBandLevel ??
        continuanceOverlay.fallbackContext.fallbackBandLevel ??
        0,
      touchPersona: touch.persona || null,
      touchDeviceClass: touch.deviceClass || "generic",
      touchRadioBand: touch.radioBand || "pulseband-symbolic",
      touchBandwidthTier: touch.bandwidthTier || "normal",

      proxyMode: proxyMeta.mode || "normal",
      proxyPressure: proxyMeta.pressure ?? 0,
      proxyBoost: proxyMeta.boost ?? 0,
      proxyFallback: !!proxyMeta.fallback
    });
  }

  // --------------------------------------------------------------------------
  // 7. Multi-Mesh / World-Mesh Aggregation (v30++ federation-aware)
  // --------------------------------------------------------------------------
  const neighborMeshes = Object.create(null);

  function registerNeighborMesh(meshId, snapshotProvider, meta = {}) {
    if (!meshId || typeof snapshotProvider !== "function") {
      return { ok: false, reason: "invalid-arguments" };
    }
    neighborMeshes[meshId] = {
      snapshotProvider,
      meta: Object.freeze({
        kind: meta.kind || "generic",
        regionHint: meta.regionHint || null,
        trustTier: meta.trustTier || "neutral"
      })
    };
    bumpRevision("neighbor-registered");
    return { ok: true };
  }

  function unregisterNeighborMesh(meshId) {
    delete neighborMeshes[meshId];
    bumpRevision("neighbor-unregistered");
    return { ok: true };
  }

  function buildWorldMeshSignal() {
    let totalUsers = DensityHealth.metrics.userCount;
    let totalCastles = DensityHealth.metrics.castleCount;
    let maxPressure = DensityHealth.metrics.meshPressureIndex;

    let neighborCount = 0;

    for (const { snapshotProvider } of Object.values(neighborMeshes)) {
      try {
        const snap = snapshotProvider();
        const dh = snap.densityHealth.metrics || {};
        totalUsers += dh.userCount || 0;
        totalCastles += dh.castleCount || 0;
        if (typeof dh.meshPressureIndex === "number") {
          maxPressure = Math.max(maxPressure, dh.meshPressureIndex);
        }
        neighborCount++;
      } catch {
        // symbolic-only, ignore neighbor failures
      }
    }

    const proxyPressure = getProxyPressure() ?? 0;
    const proxyBoost = getProxyBoost() ?? 0;
    const proxyFallback = getProxyFallback() ?? false;
    const proxyMode = getProxyMode() || "normal";

    if (proxyPressure > 0) {
      maxPressure = Math.min(100, maxPressure + Math.round(proxyPressure * 10));
    }
    if (proxyFallback) {
      maxPressure = Math.min(100, maxPressure + 5);
    }
    if (proxyBoost > 0) {
      maxPressure = Math.max(0, maxPressure - Math.round(proxyBoost * 3));
    }

    const civilizationTier =
      totalUsers >= 1000
        ? "metropolis"
        : totalUsers >= 200
        ? "city"
        : totalUsers >= 50
        ? "town"
        : totalUsers >= 10
        ? "village"
        : totalUsers >= 1
        ? "outpost"
        : "void";

    return Object.freeze({
      worldMeshID: "PulseWorldMesh-v30++",
      regionID,
      localUserCount: DensityHealth.metrics.userCount,
      localCastleCount: DensityHealth.metrics.castleCount,
      localMeshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      aggregatedUserCount: totalUsers,
      aggregatedCastleCount: totalCastles,
      aggregatedMaxPressureIndex: maxPressure,
      neighborMeshCount: neighborCount,

      civilizationTier,

      proxyMode,
      proxyPressure,
      proxyBoost,
      proxyFallback
    });
  }

  // --------------------------------------------------------------------------
  // 8. Cost Lane (v30++ symbolic cost index)
  // --------------------------------------------------------------------------
  function buildCostSignal() {
    const dh = DensityHealth.metrics;

    const meshCostIndex =
      dh.userCount * 0.2 +
      dh.castleCount * 0.3 +
      dh.relayLoadScore * 0.3 +
      dh.pingFrequencyScore * 0.2 +
      dh.arteryPressure * 10 * 0.1;

    return Object.freeze({
      meshCostIndex: Math.round(meshCostIndex),
      meshPressureIndex: dh.meshPressureIndex,
      meshStrength: dh.meshStrength
    });
  }

  // --------------------------------------------------------------------------
  // 9. Prewarm (v30++ every-advantage symbolic prewarm)
// --------------------------------------------------------------------------
  function prewarm() {
    log("Prewarm: PulseMesh v30++ symbolic-mesh-organism prewarm.");
    const ctx = buildOrganismContext();
    const continuanceOverlay = ctx.continuanceOverlay;

    bumpRevision("prewarm");
    return {
      ok: true,
      meta: {
        organId: PulseExpansionMeshMeta.organId,
        version: PulseExpansionMeshMeta.version,
        epoch: PulseExpansionMeshMeta.epoch,
        revision: Timeline.revision,
        prewarmKind: "symbolic-mesh-organism-v30-immortal-oneband",
        lanesPrewarmed: [
          "expansion",
          "castle",
          "user",
          "server",
          "router",
          "runtime",
          "touch",
          "cost",
          "worldMesh"
        ],
        continuancePrewarm: continuanceOverlay.prewarmHints,
        continuanceChunkHints: continuanceOverlay.chunkHints,
        cacheHints: continuanceOverlay.cacheHints
      }
    };
  }

  // --------------------------------------------------------------------------
  // 10. Snapshot (v30++ organism snapshot)
// --------------------------------------------------------------------------
  function getSnapshot() {
    const ctx = buildOrganismContext();
    const rev = bumpRevision("snapshot");

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const worldMesh = buildWorldMeshSignal();
    const cost = buildCostSignal();

    const densityHint =
      DensityHealth.metrics.userCount >= 20
        ? "high"
        : DensityHealth.metrics.userCount >= 5
        ? "medium"
        : "low";

    const scenarioMeshStatus = DensityHealth.metrics.meshStrength || "unknown";

    const multiRadioProfile = buildMultiRadioProfile({
      densityHint,
      demandHint: "medium",
      meshStatus: scenarioMeshStatus,
      continuanceRisk: ctx.continuanceOverlay.arteryOverlay.globalRisk,
      proxyPressure: clamp01(ctx.proxyMeta.pressure ?? 0)
    });

    return Object.freeze({
      organId: PulseExpansionMeshMeta.organId,
      version: PulseExpansionMeshMeta.version,
      epoch: PulseExpansionMeshMeta.epoch,
      identity: Identity,
      topology: Topology,
      densityHealth: DensityHealth,
      presenceField,
      advantageField,
      worldMesh,
      cost,
      multiRadioProfile,
      binaryMeshMeta: BinaryMeshMeta || null,

      timeline: {
        symbolicEpoch: Timeline.symbolicEpoch,
        revision: rev.revision,
        revisionReason: rev.reason
      },

      organismContext: ctx,

      lanes: {
        expansion: buildExpansionSignal(),
        castle: buildCastleSignal(),
        user: buildUserMeshSignal(),
        server: buildServerSignal(),
        router: buildRouterSignal(),
        runtime: buildRuntimeSignal(),
        touch: buildTouchSignal(),
        cost,
        worldMesh
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. Public API (v30++ mesh organism)
// --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseExpansionMeshMeta,
    identity: Identity,
    guarantees: PulseExpansionMeshMeta.guarantees,

    // density + pressure
    computeDensityAndPressure,

    // lanes
    buildExpansionSignal,
    buildCastleSignal,
    buildUserMeshSignal,
    buildServerSignal,
    buildRouterSignal,
    buildRuntimeSignal,
    buildTouchSignal,
    buildCostSignal,
    buildWorldMeshSignal,

    // multi-mesh
    registerNeighborMesh,
    unregisterNeighborMesh,

    // prewarm
    prewarm,

    // introspection
    getSnapshot,
    handle(req) {
      try {
        const { action, payload = {} } = req || {};

        switch (action) {
          // ------------------------------------------------------------
          // 1. Topology Operations
          // ------------------------------------------------------------
          case "snapshotTopology":
            return {
              ok: true,
              identity: Identity,
              topology: Topology
            };

          case "addUserNode":
            Topology.nodes.userNodes.push(payload);
            return { ok: true, added: payload, topology: Topology.nodes.userNodes };

          case "addCastleNode":
            Topology.nodes.castleNodes.push(payload);
            return { ok: true, added: payload, topology: Topology.nodes.castleNodes };

          case "addBridgeNode":
            Topology.nodes.bridgeNodes.push(payload);
            return { ok: true, added: payload, topology: Topology.nodes.bridgeNodes };

          case "addMeshEdge":
            Topology.links.edges.push(payload);
            return { ok: true, added: payload, edges: Topology.links.edges };

          // ------------------------------------------------------------
          // 2. Density / Pressure / Health
          // ------------------------------------------------------------
          case "computeDensity":
            return {
              ok: true,
              density: computeDensityAndPressure(payload),
              metrics: DensityHealth.metrics
            };

          case "snapshotDensity":
            return {
              ok: true,
              metrics: DensityHealth.metrics,
              thresholds: DensityHealth.thresholds
            };

          // ------------------------------------------------------------
          // 3. Organism Context
          // ------------------------------------------------------------
          case "snapshotOrganismContext":
            return {
              ok: true,
              context: buildOrganismContext()
            };

          // ------------------------------------------------------------
          // 4. Presence & Advantage
          // ------------------------------------------------------------
          case "snapshotPresence":
            return {
              ok: true,
              presence: buildPresenceField()
            };

          case "snapshotAdvantage":
            return {
              ok: true,
              advantage: buildAdvantageField()
            };

          // ------------------------------------------------------------
          // 5. Mesh Identity
          // ------------------------------------------------------------
          case "snapshotIdentity":
            return {
              ok: true,
              identity: Identity
            };

          // ------------------------------------------------------------
          // 6. Unknown Action
          // ------------------------------------------------------------
          default:
            return {
              ok: false,
              error: "Unknown mesh action",
              action,
              payload
            };
        }
      } catch (err) {
        return {
          ok: false,
          error: "Mesh handle failure",
          message: err?.message,
          stack: err?.stack
        };
      }
    }

  });
}

export default createPulseMesh;

PulseRealm.ExpansionMesh = {
  createPulseMesh,
  PulseExpansionMeshMeta,
  Timeline,
  bumpRevision
}

PulseRealm.PulseWorldMesh = createPulseMesh;