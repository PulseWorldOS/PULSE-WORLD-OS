/**
 * ============================================================================
 *  PULSE EXPANSION — v30-Immortal-OneBand
 *  Presence Region Governor / Network Stretcher to PULSE-NET
 *  Every-Advantage / Regioning-Aware / Beacon-Aware / Castle-Aware / PulseNet-Aware
 *  Heartbeat-Driven (heartbeat / aiHeartbeat / earnHeartbeat)
 *  Federal Strategist for capacity, stress, governance, treasury, mesh, routes.
 *  ONEBAND: unified symbolic+binary carrier, every-advantage, v30+ mesh-aware.
 * ============================================================================
 */
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { getPulseOvermindContext } from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";
import { PulseCastleMeta, summarizeCastlePresence} from "./PULSE-EXPANSION-CASTLE.js";
import { PulseUserExMeta, createPulseUser} from "./PULSE-EXPANSION-USER.js";
import { PulseExpansionMeshMeta, createPulseMesh} from "./PULSE-EXPANSION-MESH.js";
import { PulseServerMeta, PulseServerPresenceExec} from "./PULSE-EXPANSION-SERVER.js";
import { PulseBeaconMeshMeta, PulseBeaconMesh} from "./PULSE-EXPANSION-BEACON-MESH.js";
import { PulseBeaconMeta as PulseBeaconEngineMeta, createPulseBeaconEngine} from "./PULSE-EXPANSION-BEACON-ENGINE.js";
import { PulseMeshMeta } from "../PULSE-MESH/PULSE-MESH.js";
import { BinaryMeshMeta2 as BinaryMeshMeta } from "../PULSE-MESH/PULSE-MESH-BINARY.js";
import { createBinaryWavePulse as createBinaryPulse } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";
import { PulsePowerAPIv32 as PulsePowerAPIv31 } from "../X-PULSE-X/PULSE-WORLD-POWER.js"
import { PulseSpecsDNAGenome } from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";
import { getPulseRuntimeContext, PulseRuntimeV30 } from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import { getPulseSchedulerContextV33 as getPulseSchedulerContext, PulseSchedulerV33 as PulseSchedulerV30 } from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";
import { createPulseEarnSendSystem_v31 } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";
import { getProxyContext, getProxyPressure, getProxyBoost, getProxyFallback, getProxyMode, getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";
import { createPulseNodeEvolutionV30 } from "../PULSE-TOOLS/AI/PulseToolsNodeEvolution-v30.js";
import { ForbiddenActions } from "../PULSE-AI/PERSONALITY/PulseAIPermissions-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




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
//  META — FULL-ADVANTAGE STRATEGIST VIEW (v30-Immortal-OneBand)
// ============================================================================

export const PulseExpansionMeta = Object.freeze({
  layer: "PulseExpansion",
  role: "PRESENCE_STRATEGIST_ORGAN",
  version: "v30-Immortal-OneBand",
  identity: "PulseExpansion-v30-Immortal-OneBand",

  world: Object.freeze({
    castleMeta: PulseCastleMeta,
    osMeta: PulseUserExMeta,
    meshMeta: PulseExpansionMeshMeta
  }),

  beacons: Object.freeze({
    engineMeta: PulseBeaconEngineMeta,
    meshMeta: PulseBeaconMeshMeta
  }),

  connectivity: Object.freeze({
    meshMeta: PulseRealm.PulseMeshMeta,
    binaryMeshMeta: PulseRealm.PulseBinaryMeshMeta,
    routerMeta: PulseRealm.PulseInternetRouterMeta,
    band: "ONEBAND"
  }),

  server: Object.freeze({
    pulseServerMeta: PulseServerMeta
  }),

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiRegionReady: true,
    multiCastleReady: true,
    meshAware: true,
    presenceFieldAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    soldierAware: true,
    treasuryAware: true,
    treasuryPressureAware: true,
    capacitySignalAware: true,
    stressSignalAware: true,
    beaconAware: true,
    beaconMeshAware: true,
    osBrainAware: true,
    routerAware: true,
    serverExecAware: true,
    binaryMeshAware: true,
    pulseNetAware: true,
    proxyAware: true,
    meshOrganismAware: true,
    heartbeatAware: true,
    aiHeartbeatAware: true,
    earnHeartbeatAware: true,

    oneBandUnified: true,
    zeroRandomness: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroNetworkFetch: true,
    zeroAI: true,
    zeroRouting: true,
    zeroComputeMath: true
  })
});

// ============================================================================
//  TYPES
// ============================================================================
export const ExpansionAction = ({
  regionId,
  hostHint = null,
  tier = "normal",
  reason = "capacity",
  desiredServers = 1,
  desiredSoldiers = 0
} = {}) => {
  const state = {
    type: "expand",
    regionId,
    hostHint,
    tier,
    reason,
    desiredServers,
    desiredSoldiers
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const ContractionAction = ({
  castleId,
  reason = "low_load",
  removeServers = 1,
  removeSoldiers = 0
} = {}) => {
  const state = {
    type: "contract",
    castleId,
    reason,
    removeServers,
    removeSoldiers
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const SoldierDelegationAction = ({
  castleId,
  spawn = 0,
  kill = 0,
  reason = "presence_adjustment"
} = {}) => {
  const state = {
    type: "soldier_delegation",
    castleId,
    spawn,
    kill,
    reason
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const MeshRebalanceAction = ({
  castleId,
  targetCastleId,
  action = "link"
} = {}) => {
  const state = {
    type: "mesh_rebalance",
    castleId,
    targetCastleId,
    action
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const RouteDefenseAction = ({
  regionId,
  castleId,
  reason = "protect_routes",
  desiredDefenders = 2
} = {}) => {
  const state = {
    type: "route_defense",
    regionId,
    castleId,
    reason,
    desiredDefenders
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const NodeAdminOrbitAction = ({
  castleId,
  intervalHint = "steady",
  pressureHint = "normal"
} = {}) => {
  const state = {
    type: "nodeadmin_orbit",
    castleId,
    intervalHint,
    pressureHint
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};


export const ExpansionPlan = ({
  expansions = [],
  contractions = [],
  rebalanceLinks = [],
  soldierDelegation = [],
  routeDefenseActions = [],
  nodeAdminOrbitActions = [],
  regionPresence = {},
  regionAdvantage = {},
  regionChunkPlan = {},
  oneBandField = null,
  oneBandSignature = null,
  pulseNetIntents = [],
  meta = {}
} = {}) => {
  const state = {
    expansions,
    contractions,
    rebalanceLinks,
    soldierDelegation,
    routeDefenseActions,
    nodeAdminOrbitActions,
    regionPresence,
    regionAdvantage,
    regionChunkPlan,
    oneBandField,
    oneBandSignature,
    pulseNetIntents,
    meta
  };

  return {
    state,

    listAllActions: () => [
      ...state.expansions,
      ...state.contractions,
      ...state.rebalanceLinks,
      ...state.soldierDelegation,
      ...state.routeDefenseActions,
      ...state.nodeAdminOrbitActions
    ],

    describe: () => ({ ...state })
  };
};


// ============================================================================
//  INTERNAL HELPERS + ARTERY
// ============================================================================

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// --- ONEBAND FIELD (unified symbolic + binary) ------------------------------

function buildOneBandField(cycle, band = "ONEBAND", heartbeat, aiHeartbeat, earnHeartbeat) {
  const hbFactor = clamp01(heartbeat.intensity ?? 0.5);
  const aiFactor = clamp01(aiHeartbeat.intensity ?? 0.5);
  const earnFactor = clamp01(earnHeartbeat.throughput ?? 0.5);

  const densityBase = 10 + cycle * 3;
  const density = densityBase + Math.floor(hbFactor * 4 + aiFactor * 3 + earnFactor * 3);
  const surface = density + 12;

  const hbPhase = heartbeat.phase ?? 0;
  const aiPhase = aiHeartbeat.phase ?? 0;
  const earnPhase = earnHeartbeat.phase ?? 0;

  const baseAmp = 9; // unified carrier
  const amplitude = (cycle + 1) * baseAmp + hbPhase + aiPhase + earnPhase;

  const binarySurface = {
    density,
    surface,
    patternLen: 12
  };

  const waveSurface = {
    amplitude,
    wavelength: amplitude + 3,
    phase: amplitude % 16,
    mode: "oneband-wave"
  };

  const hbTag = heartbeat.bandTag || "hb";
  const aiTag = aiHeartbeat.bandTag || "ai";

  const oneBandSignature = computeHash(
    `ONEBAND::${band}::${surface}::${amplitude}::${hbTag}::${aiTag}`
  );

  return {
    band,
    binarySurface,
    waveSurface,
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1)),
    heartbeat: {
      hbFactor,
      aiFactor,
      earnFactor,
      hbPhase,
      aiPhase,
      earnPhase
    },
    signature: oneBandSignature
  };
}

function buildRegionPresenceField(regionInfo, cycle) {
  const castleCount = regionInfo.castles.length;
  const totalServers = regionInfo.totalServers;
  const avgPresence =
    regionInfo.castles.reduce(
      (a, c) => a + (c.presenceField.presenceScore || 0),
      0
    ) / Math.max(1, castleCount);

  const composite =
    castleCount * 0.01 + totalServers * 0.005 + avgPresence * 0.02;

  const presenceTier =
    composite >= 0.5
      ? "presence_high"
      : composite >= 0.2
      ? "presence_mid"
      : "presence_low";

  return {
    presenceVersion: "v30-Immortal-OneBand",
    presenceTier,
    castleCount,
    totalServers,
    avgPresence,
    composite,
    cycle,
    presenceSignature: computeHash(
      `REGION_PRESENCE::${presenceTier}::${castleCount}::${totalServers}::${avgPresence}`
    )
  };
}

function buildRegionAdvantageField(regionInfo, presenceField, cycle) {
  const density = regionInfo.castles.length;
  const stress = regionInfo.castles.reduce(
    (a, c) => a + (c.presenceField.stressIndex || 0),
    0
  );

  const advantageScore =
    density * 0.01 +
    stress * 0.005 +
    (presenceField.presenceTier === "presence_high" ? 0.1 : 0);

  return {
    advantageVersion: "v30-Immortal-OneBand",
    density,
    stress,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    cycle
  };
}

function buildRegionChunkPrewarmPlan(
  regionInfo,
  presenceField,
  advantageField
) {
  const basePriority =
    presenceField.presenceTier === "presence_high"
      ? 3
      : presenceField.presenceTier === "presence_mid"
      ? 2
      : 1;

  const advantageBoost = advantageField.advantageScore > 0.1 ? 1 : 0;

  return {
    planVersion: "v30-Immortal-OneBand-Region-Advantage",
    priority: basePriority + advantageBoost,
    chunks: {
      castleEnvelope: true,
      serverEnvelope: true,
      soldierEnvelope: true
    },
    cache: {
      regionPresence: true,
      regionAdvantage: true
    },
    prewarm: {
      castleSpawn: true,
      serverSpawn: true,
      soldierSpawn: true
    }
  };
}

function createExpansionArtery() {
  const artery = {
    cycles: 0,
    expansions: 0,
    contractions: 0,
    rebalanceLinks: 0,
    soldierDelegations: 0,
    routeDefenses: 0,
    nodeAdminOrbits: 0,
    lastGlobalLoad: 0,
    lastProxyPressure: 0,
    lastBeaconPresenceScore: 0,
    snapshot() {
      return Object.freeze({
        cycles: artery.cycles,
        expansions: artery.expansions,
        contractions: artery.contractions,
        rebalanceLinks: artery.rebalanceLinks,
        soldierDelegations: artery.soldierDelegations,
        routeDefenses: artery.routeDefenses,
        nodeAdminOrbits: artery.nodeAdminOrbits,
        lastGlobalLoad: artery.lastGlobalLoad,
        lastProxyPressure: artery.lastProxyPressure,
        lastBeaconPresenceScore: artery.lastBeaconPresenceScore
      });
    }
  };
  return artery;
}

// ============================================================================
//  WORLD BOOT / PREWARM — CASTLE + BEACON ENGINE + MESH
// ============================================================================

const Mesh = createPulseMesh
  ? createPulseMesh({ boundCastleID: "GLOBAL_CASTLE" })
  : null;

const BeaconEngine = createPulseBeaconEngine
  ? createPulseBeaconEngine({ boundCastleID: "GLOBAL_CASTLE" })
  : null;

const BeaconMesh = BeaconEngine
  ? PulseBeaconMesh({
      beacon: BeaconEngine,
      meshID: "expansion-beacon-mesh",
      regionID: null,
      trace: false
    })
  : null;

// ============================================================================
//  CORE ORGAN — PulseExpansion v30-Immortal-OneBand
// ============================================================================
export const PulseExpansion = (() => {
  let _instance = null;

  const create = (config = {}) => {
    const cfg = {
      defaultMaxCastlesPerRegion: 8,
      defaultMinCastlesPerRegion: 1,
      defaultDesiredServersPerCastle: 1,
      defaultDesiredSoldiersPerCastle: 3,
      ...config
    };

    const _expansionEvolution = createPulseNodeEvolutionV30({
      nodeType: "expansion",
      trace: false
    });

    let cycle = 0;
    let pulseNetBridge = config.pulseNetBridge || null;

    let heartbeat = null;
    let aiHeartbeat = null;
    let earnHeartbeat = null;

    const artery = createExpansionArtery();
    let prewarmed = false;

    // ------------------------------------------------------------
    // ⭐ OPTIONAL ONEBAND CARRIER (IMMORTAL)
    // ------------------------------------------------------------
    const oneBandCarrier =
      typeof createBinaryPulse === "function"
        ? createBinaryPulse({
            regionId: "expansion-oneband-region",
            hostName: "expansion-oneband-host",
            worldRouterHint: { source: "PulseExpansion-v30-OneBand" },
            schedulerHint: { mode: "expansion" },
            pulseTouch: getPulseTouchContext() || null
          })
        : null;

    // ------------------------------------------------------------
    // PREWARM
    // ------------------------------------------------------------
    const prewarm = () => {
      if (prewarmed) return true;

      void getPulseTouchContext();
      void getPulseRuntimeContext();
      void getPulseSchedulerContext();
      void getPulseOvermindContext();
      void PulseRealm.PulseEarnContext();
      void getProxyContext();

      logger.log("expansion", "prewarm_v30_oneband", {});

      prewarmed = true;
      return true;
    };

    prewarm();

    // ------------------------------------------------------------
    // SNAPSHOT (OPTIONAL: expose carrier)
    // ------------------------------------------------------------
    const snapshot = () =>
      Object.freeze({
        meta: PulseExpansionMeta,
        cycle,
        artery: artery.snapshot(),
        oneBandCarrier: !!oneBandCarrier
      });

    // ------------------------------------------------------------
    // ATTACHMENTS
    // ------------------------------------------------------------
    const attachPulseNetBridge = bridge => {
      pulseNetBridge = bridge || null;
      return { ok: true, hasBridge: !!pulseNetBridge };
    };

    const attachHeartbeats = ({ heartbeat: hb, aiHeartbeat: aiHb, earnHeartbeat: eHb } = {}) => {
      heartbeat = hb || null;
      aiHeartbeat = aiHb || null;
      earnHeartbeat = eHb || null;
      return {
        ok: true,
        heartbeatAttached: !!heartbeat,
        aiHeartbeatAttached: !!aiHeartbeat,
        earnHeartbeatAttached: !!earnHeartbeat
      };
    };

    // ------------------------------------------------------------
    // CASTLE HEALTH MONITOR (unchanged)
    // ------------------------------------------------------------
    const monitorCastleHealth = ({ castlePresence }) => {
      if (!castlePresence) return { ok: false, reason: "no_castle_presence" };

      const unhealthy = [];

      for (const region of Object.values(castlePresence.byRegion || {})) {
        for (const c of region.castles || []) {
          const pf = c.presenceField || {};
          const presenceScore = pf.presenceScore ?? 0;
          const stressIndex = pf.stressIndex ?? 0;
          const governanceStabilityIndex = pf.governanceStabilityIndex ?? 1;

          if (presenceScore < 0.3 || stressIndex > 0.9 || governanceStabilityIndex < 0.3) {
            unhealthy.push({
              castleId: c.castleId,
              regionId: c.regionId,
              presenceField: pf
            });
          }
        }
      }

      return {
        ok: true,
        unhealthy,
        count: unhealthy.length
      };
    };

    const monitorServerTakeover = ({ serverFallback }) => {
      if (!serverFallback) return { ok: true, takeover: false };

      return {
        ok: true,
        takeover: !!serverFallback.takeover,
        reason: serverFallback.reason,
        serverCastleId: serverFallback.serverCastleId,
        serverCastlePresence: serverFallback.serverCastlePresence
      };
    };

    // FEDERAL GOVERNANCE HELPERS — v30-Immortal-OneBand
    const detectPowerImbalance = ({ castleHealth, serverTakeover }) => {
      const imbalance = {
        castleWeak: castleHealth.count > 0,
        serverDominating: serverTakeover.takeover === true,
        severity: 0
      };

      if (imbalance.castleWeak) imbalance.severity += 1;
      if (imbalance.serverDominating) imbalance.severity += 1;

      return imbalance;
    };

    const haltRunawayBehavior = ({ imbalance }) => {
      if (imbalance.severity === 0) return null;

      const target =
        imbalance.serverDominating && imbalance.castleWeak
          ? "server"
          : imbalance.serverDominating
          ? "server"
          : "castle";

      return {
        kind: "halt_runaway_v30_oneband",
        target,
        severity: imbalance.severity,
        reason: "federal_governance_intervention_v30_oneband"
      };
    };

    const rebalanceGovernance = ({ imbalance }) => {
      if (imbalance.severity === 0) return null;

      const actions = [];

      if (imbalance.castleWeak) {
        actions.push({
          kind: "spawn_castle_v30_oneband",
          reason: "castle_weakness_detected_v30_oneband"
        });
      }

      if (imbalance.serverDominating) {
        actions.push({
          kind: "reduce_server_influence_v30_oneband",
          reason: "server_dominance_detected_v30_oneband"
        });
      }

      return {
        kind: "governance_rebalance_v30_oneband",
        actions,
        severity: imbalance.severity
      };
    };

    // INTERNET + BRAIN + MEMORY ROUTING ARTERIES — v30 ONEBAND
    const sendInternetRoute = route => {
      if (!pulseNetBridge || !pulseNetBridge.sendRoute) {
        return { ok: false, reason: "no_pulseNetBridge" };
      }

      return pulseNetBridge.sendRoute({
        type: "PulseNetExpansion",
        payload: {
          channel: "internet",
          band: "ONEBAND",
          route,
          cycle
        }
      });
    };

    const sendBrainRoute = route => {
      if (!pulseNetBridge || !pulseNetBridge.sendRoute) {
        return { ok: false, reason: "no_pulseNetBridge" };
      }

      return pulseNetBridge.sendRoute({
        type: "PulseNetExpansion",
        payload: {
          channel: "brain",
          band: "ONEBAND",
          route,
          cycle
        }
      });
    };

    const sendMemoryRoute = route => {
      if (!pulseNetBridge || !pulseNetBridge.sendRoute) {
        return { ok: false, reason: "no_pulseNetBridge" };
      }

      return pulseNetBridge.sendRoute({
        type: "PulseNetExpansion",
        payload: {
          channel: "memory",
          band: "ONEBAND",
          route,
          cycle
        }
      });
    };

    // EVOLUTION PIPE — v30-Immortal-OneBand
    const evolveExpansionPlan = (plan, extraCtx = {}) => {
      if (!_expansionEvolution) return plan;

      const context = {
        cycle,
        heartbeat,
        aiHeartbeat,
        earnHeartbeat,

        // PROXY CONTEXT
        proxyMode: getProxyMode(),
        proxyPressure: getProxyPressure(),
        proxyBoost: getProxyBoost(),
        proxyFallback: getProxyFallback(),
        proxyLineage: getProxyLineage(),
        proxyContext: getProxyContext(),

        // TOUCH / RUNTIME / SCHEDULER / OVERMIND / EARN
        touch: getPulseTouchContext(),
        runtime: getPulseRuntimeContext(),
        scheduler: getPulseSchedulerContext(),
        overmind: getPulseOvermindContext(),
        earn: PulseRealm.PulseEarnContext(),

        // METAS
        meshMeta: PulseRealm.PulseMeshMeta,
        binaryMeshMeta: PulseRealm.PulseBinaryMeshMeta,
        beaconMeshMeta: PulseBeaconMeshMeta,
        beaconEngineMeta: PulseBeaconEngineMeta,
        serverMeta: PulseServerMeta,
        routerMeta: PulseRealm.PulseInternetRouterMeta,
        castleMeta: PulseCastleMeta,
        worldCoreMeta: PulseUserExMeta,

        band: "ONEBAND",

        ...extraCtx
      };

      return _expansionEvolution.evolveNodePulse({
        nodeType: "expansion",
        pulse: plan,
        context
      });
    };

    // BUILD EXPANSION PLAN — v30-Immortal-OneBand
    const buildExpansionPlan = ({
      globalLoadIndex = 0,
      regionSignals = {},
      maxCastlesPerRegion = null,
      minCastlesPerRegion = null,
      heartbeat: hbArg = null,
      aiHeartbeat: aiHbArg = null,
      earnHeartbeat: earnHbArg = null
    } = {}) => {
      const hb = hbArg || heartbeat || {};
      const aiHb = aiHbArg || aiHeartbeat || {};
      const earnHb = earnHbArg || earnHeartbeat || {};

      if (typeof hb.tick === "number") {
        cycle = hb.tick;
      } else {
        cycle++;
      }

      artery.cycles += 1;

      const expansions = [];
      const contractions = [];
      const rebalanceLinks = [];
      const soldierDelegation = [];
      const routeDefenseActions = [];
      const nodeAdminOrbitActions = [];

      const { byRegion, meshLinksByCastleId } = summarizeCastlePresence();

      const meshSnapshot = Mesh.getSnapshot() ?? null;
      void meshSnapshot; // kept for symmetry / future use

      const effectiveMaxCastles =
        typeof maxCastlesPerRegion === "number" && maxCastlesPerRegion > 0
          ? maxCastlesPerRegion
          : cfg.defaultMaxCastlesPerRegion;

      const effectiveMinCastles =
        typeof minCastlesPerRegion === "number" && minCastlesPerRegion >= 0
          ? minCastlesPerRegion
          : cfg.defaultMinCastlesPerRegion;

      const globalLoad = clamp01(globalLoadIndex);
      artery.lastGlobalLoad = globalLoad;

      const regionPresence = {};
      const regionAdvantage = {};
      const regionChunkPlan = {};

      const beaconSnapshot = BeaconMesh.getSnapshot() ?? null;
      const beaconPresenceField = beaconSnapshot.composite.presenceField ?? null;
      const beaconAdvantageField = beaconSnapshot.composite.advantageField ?? null;

      artery.lastBeaconPresenceScore = beaconPresenceField.presenceScore ?? 0;

      const pulseNetIntents = [];

      const proxyCtx = getProxyContext();
      const proxyPressure = getProxyPressure();
      const proxyBoost = getProxyBoost();
      const proxyFallback = getProxyFallback();
      const proxyMode = getProxyMode();
      const proxyLineage = getProxyLineage();

      artery.lastProxyPressure = proxyPressure || 0;

      const oneBandField = buildOneBandField(
        cycle,
        "ONEBAND",
        hb,
        aiHb,
        earnHb
      );
      const oneBandSignature = oneBandField.signature;

      for (const [regionId, regionInfo] of Object.entries(byRegion)) {
        const signal = regionSignals[regionId] || {};
        const avgLoadIndex = clamp01(signal.avgLoadIndex ?? globalLoad);
        const userDensityHint = signal.userDensityHint ?? 0;
        const stressHint = clamp01(signal.stressHint ?? globalLoad);

        const presenceField = buildRegionPresenceField(regionInfo, cycle);
        let advantageField = buildRegionAdvantageField(regionInfo, presenceField, cycle);
        const chunkPlan = buildRegionChunkPrewarmPlan(regionInfo, presenceField, advantageField);

        const proxyPressureClamped = clamp01(proxyPressure || 0);
        const proxyStressBoost = proxyPressureClamped * 10;
        const proxyAdvantageBoost = proxyBoost ? 0.02 : 0;

        const adjustedStress =
          (advantageField.stress || 0) + proxyStressBoost;

        const adjustedAdvantageScore =
          (advantageField.advantageScore || 0) +
          proxyAdvantageBoost -
          (proxyFallback ? 0.05 : 0);

        advantageField = {
          ...advantageField,
          stress: adjustedStress,
          advantageScore: adjustedAdvantageScore,
          proxy: {
            mode: proxyMode,
            pressure: proxyPressure,
            boost: proxyBoost,
            fallback: proxyFallback,
            lineage: proxyLineage,
            context: proxyCtx
          }
        };

        regionPresence[regionId] = presenceField;
        regionAdvantage[regionId] = advantageField;
        regionChunkPlan[regionId] = chunkPlan;

        const castleCount = regionInfo.castles.length;

        const hbLoadBoost = clamp01(hb.intensity ?? 0);
        const aiLoadBoost = clamp01(aiHb.intensity ?? 0);
        const effectiveLoad = clamp01(
          avgLoadIndex + hbLoadBoost * 0.1 + aiLoadBoost * 0.1
        );

        const expansionPressure =
          effectiveLoad >= 0.6 ||
          userDensityHint >= 2000 ||
          stressHint >= 0.6 ||
          proxyPressureClamped >= 0.8;

        if (
          expansionPressure &&
          castleCount < effectiveMaxCastles &&
          !proxyFallback
        ) {
          const action = new ExpansionAction({
            regionId,
            tier: presenceField.presenceTier,
            reason: "high_load_or_density_or_proxy_pressure_v30_oneband",
            desiredServers: cfg.defaultDesiredServersPerCastle,
            desiredSoldiers: cfg.defaultDesiredSoldiersPerCastle
          });
          expansions.push(action);
          artery.expansions += 1;

          pulseNetIntents.push({
            kind: "expansion_request_v30_oneband",
            regionId,
            tier: presenceField.presenceTier,
            desiredServers: action.desiredServers,
            desiredSoldiers: action.desiredSoldiers,
            cycle,
            proxyMode,
            proxyPressure,
            heartbeatTick: hb.tick ?? null,
            oneBandSignature
          });
        }

        const contractionPressure =
          effectiveLoad <= 0.2 &&
          castleCount > effectiveMinCastles &&
          proxyPressureClamped < 0.5;

        if (contractionPressure) {
          const candidate = regionInfo.castles[regionInfo.castles.length - 1];
          if (candidate) {
            const action = new ContractionAction({
              castleId: candidate.castleId,
              reason: "low_load_v30_oneband",
              removeServers: 1,
              removeSoldiers: 1
            });
            contractions.push(action);
            artery.contractions += 1;

            pulseNetIntents.push({
              kind: "contraction_request_v30_oneband",
              castleId: candidate.castleId,
              regionId,
              reason: action.reason,
              cycle,
              proxyMode,
              proxyPressure,
              heartbeatTick: hb.tick ?? null,
              oneBandSignature
            });
          }
        }

        for (const c of regionInfo.castles) {
          const load = c.presenceField.loadIndex ?? 0;
          const stress = c.presenceField.stressIndex ?? 0;

          const highPressure =
            load >= 0.7 ||
            stress >= 0.7 ||
            proxyPressureClamped >= 0.8;

          const lowPressure =
            load <= 0.2 &&
            stress <= 0.2 &&
            proxyPressureClamped < 0.4;

          if (highPressure && !proxyFallback) {
            const sAction = new SoldierDelegationAction({
              castleId: c.castleId,
              spawn: 2,
              kill: 0,
              reason: "high_pressure_v30_oneband"
            });
            soldierDelegation.push(sAction);
            artery.soldierDelegations += 1;

            const rAction = new RouteDefenseAction({
              regionId,
              castleId: c.castleId,
              reason: "protect_routes_v30_oneband",
              desiredDefenders: 2
            });
            routeDefenseActions.push(rAction);
            artery.routeDefenses += 1;
          }

          if (lowPressure && !proxyFallback) {
            const sAction = new SoldierDelegationAction({
              castleId: c.castleId,
              spawn: 0,
              kill: 1,
              reason: "low_pressure_v30_oneband"
            });
            soldierDelegation.push(sAction);
            artery.soldierDelegations += 1;
          }

          const orbitAction = new NodeAdminOrbitAction({
            castleId: c.castleId,
            intervalHint: highPressure ? "fast" : lowPressure ? "slow" : "steady",
            pressureHint: highPressure ? "high" : lowPressure ? "low" : "normal"
          });
          nodeAdminOrbitActions.push(orbitAction);
          artery.nodeAdminOrbits += 1;
        }

        const links = meshLinksByCastleId[regionId] || [];
        for (const link of links) {
          const action = new MeshRebalanceAction({
            castleId: link.sourceCastleId,
            targetCastleId: link.targetCastleId,
            action: "link"
          });
          rebalanceLinks.push(action);
          artery.rebalanceLinks += 1;
        }
      }

      const plan = new ExpansionPlan({
        expansions,
        contractions,
        rebalanceLinks,
        soldierDelegation,
        routeDefenseActions,
        nodeAdminOrbitActions,
        regionPresence,
        regionAdvantage,
        regionChunkPlan,
        oneBandField,
        oneBandSignature,
        pulseNetIntents,
        meta: {
          version: "v30-Immortal-OneBand",
          globalLoadIndex,
          beaconPresenceField,
          beaconAdvantageField
        }
      });

      return evolveExpansionPlan(plan, {
        band: "ONEBAND",
        oneBandField,
        oneBandSignature
      });
    };

    return {
      snapshot,
      attachPulseNetBridge,
      attachHeartbeats,
      monitorCastleHealth,
      monitorServerTakeover,
      detectPowerImbalance,
      haltRunawayBehavior,
      rebalanceGovernance,
      sendInternetRoute,
      sendBrainRoute,
      sendMemoryRoute,
      buildExpansionPlan
    };
  };

  const getInstance = (config = {}) => {
    if (!_instance) _instance = create(config);
    return _instance;
  };

  return {
    create,
    getInstance
  };
})();


export function getPulseExpansionContext() {
  // ------------------------------------------------------------
  // RUNTIME + POWER SNAPSHOTS
  // ------------------------------------------------------------
  const runtimeState =
    typeof PulseRuntimeV30.getRuntimeStateV30 === "function"
      ? PulseRuntimeV30.getRuntimeStateV30()
      : null;

  const powerSnapshot =
    typeof PulsePowerAPIv31.getPulsePowerSnapshotV31 === "function"
      ? PulsePowerAPIv31.getPulsePowerSnapshotV31()
      : null;

  // ------------------------------------------------------------
  // NAV + CONTINUANCE + WORLD FRAME
  // ------------------------------------------------------------
  const navState =
    runtimeState.planSummary.navState ||
    runtimeState.execResults.navState ||
    powerSnapshot.state.navState ||
    null;

  const continuance =
    runtimeState.continuance ||
    powerSnapshot.continuanceHints ||
    null;

  const worldRuntimeFrame =
    runtimeState.worldRuntimeFrame ||
    powerSnapshot.binaryField.worldRuntimeFrame ||
    null;

  // ------------------------------------------------------------
  // EXPANSION META (STATIC)
  // ------------------------------------------------------------
  const expansionMeta = {
    version: "v31-IMMORTAL-CONTINUANCE-ONEBAND",
    lanes: powerSnapshot.state.oneBandLanes || null,
    predictions: powerSnapshot.predictions || null,
    binaryField: powerSnapshot.binaryField || null
  };

  // ------------------------------------------------------------
  // DNA ACCESSOR (Expansion uses this constantly)
  // ------------------------------------------------------------
  function getDNA(dnaName) {
    return PulseSpecsDNAGenome.getDNA(dnaName) || null;
  }

  // ------------------------------------------------------------
  // WARM PATHS / COLD PATHS (optional)
  // ------------------------------------------------------------
  const warmPaths =
    runtimeState.warmPaths ||
    powerSnapshot.chunkHints.prewarmTargets ||
    null;

  const coldPaths =
    runtimeState.coldPaths ||
    null;

  // ------------------------------------------------------------
  // FINAL CONTEXT OBJECT
  // ------------------------------------------------------------
  return {
    ok: true,
    version: "v31-IMMORTAL-CONTINUANCE-ONEBAND",

    // Core world state
    runtimeState,
    powerSnapshot,
    navState,
    continuance,
    worldRuntimeFrame,

    // Expansion metadata
    expansionMeta,
    warmPaths,
    coldPaths,

    // DNA accessor
    getDNA
  };
}

export default getPulseExpansionContext;

PulseRealm.ExpansionWorld = {
  getPulseExpansionContext,
  PulseExpansion,
  PulseExpansionMeta,
  ExpansionAction,
  ExpansionPlan,
  ContractionAction,
  RouteDefenseAction,
  MeshRebalanceAction,
  NodeAdminOrbitAction,
  SoldierDelegationAction,
  ForbiddenActions
}