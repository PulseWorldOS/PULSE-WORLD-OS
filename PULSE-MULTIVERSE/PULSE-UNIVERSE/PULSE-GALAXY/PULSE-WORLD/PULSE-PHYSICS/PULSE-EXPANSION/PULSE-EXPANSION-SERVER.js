// ============================================================================
//  PULSE EXPANSION SERVER OS v30‑IMMORTAL‑ORGANISM — UNIFIED BAND EXEC ENGINE
//  PulseServer-v30-ExpansionUnifiedBand.js
// ============================================================================
//
//  ROLE (v30+):
//    - Deterministic compute / exec engine for the organism.
//    - Centralizes compute advantages (batching, caching, reuse).
//    - v30+: UNIFIED BAND lane (symbolic + binary + mesh + touch + runtime).
//    - Binds: AdrenalSystem + Scheduler + Runtime v2 (+ Router/Overmind via Scheduler).
//    - WorldCore-aware, user-aware, mesh-aware, brain-aware, PulseNet-bridge-aware.
//    - DualBand-aware + BinaryPulse carrier + unified-band snapshot.
//    - NO direct network fetch: all network is via higher PulseNet bridge / expansion.
//    - Castle-aware, Expansion-aware, can act as Castle-General fallback.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { createBinarySendV30 as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v30.js";
import { createPulseEarnSendSystem_v31 } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";
import { createBinaryWavePulse as createBinaryPulse } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";
import { createPulseSchedulerV33 as createPulseScheduler, PulseSchedulerMetaV33 as PulseSchedulerMeta, getPulseSchedulerContextV33 as getPulseSchedulerContext} from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseRuntimeV30, getPulseRuntimeContext, runPulseTickV30} from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import { PulseExpansionMeta, PulseExpansion} from "./PULSE-EXPANSION-WORLD.js";
import { PulseCastleMeta, computeCastlePresence, summarizeCastlePresence} from "./PULSE-EXPANSION-CASTLE.js";
import { getPulseUserContext, createPulseUser as createPulseWorldCore} from "./PULSE-EXPANSION-USER.js";
import { runInstanceOrchestrator as runAdrenalInstanceOrchestrator, ADRENAL_CONTEXT as PulseProxyAdrenalSystemMeta} from "../Pulse-Coordinator/PulseProxyAdrenalSystem-v30.js";
import { startPulseNet as createPulseNetBridge } from "../../../../../_CREATION_BARRIER/PULSE-BOOT-BRIDGE.js";
import { getPulseOvermindContext} from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";
import { createDualBandOrganismV30 as PulseBinaryOrganismBoot } from "../PULSE-AI/PULSE-AI-DUALBAND-PAST.js";
import { createPulseNodeEvolutionV30 } from "../PULSE-TOOLS/AI/PulseToolsNodeEvolution-v30.js";

import { getProxyContext, getProxyPressure, getProxyBoost, getProxyFallback, getProxyMode, getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";




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
//  META
// ============================================================================
export const PulseServerUnifiedBandMeta = Object.freeze({
  organId: "PulseServer-v30-ExpansionUnifiedBand",
  role: "EXEC_ENGINE_UNIFIED_BAND",
  version: "v30-UNIFIED-BAND",
  epoch: "v30-immortal-unified-band",
  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    unifiedBandAware: true,
    zeroNetwork: true,
    zeroFilesystem: true
  })
});
// ============================================================================
//  PulseServerJobResult — pseudo‑class IMMORTAL++
// ============================================================================

export const PulseServerJobResult = ({
  serverMeta,
  schedulerPipeline,
  runtimeStateV2,
  adrenalMeta,
  adrenalTickAccepted,
  cacheHit = false,
  castleFallback = null,
  unifiedBandSnapshot = null,
  meta = {}
} = {}) => {
  const state = {
    serverMeta,
    schedulerPipeline,
    runtimeStateV2,
    adrenalMeta,
    adrenalTickAccepted,
    cacheHit,
    castleFallback,
    unifiedBandSnapshot,
    meta
  };

  return {
    state,

    // convenience accessors
    getServerMeta: () => state.serverMeta,
    getSchedulerPipeline: () => state.schedulerPipeline,
    getRuntimeStateV2: () => state.runtimeStateV2,
    getAdrenalMeta: () => state.adrenalMeta,
    wasAdrenalTickAccepted: () => state.adrenalTickAccepted,
    wasCacheHit: () => state.cacheHit,
    getCastleFallback: () => state.castleFallback,
    getUnifiedBandSnapshot: () => state.unifiedBandSnapshot,
    getMeta: () => ({ ...state.meta }),

    // canonical snapshot
    describe: () =>
      Object.freeze({
        serverMeta: state.serverMeta,
        schedulerPipeline: state.schedulerPipeline,
        runtimeStateV2: state.runtimeStateV2,
        adrenalMeta: state.adrenalMeta,
        adrenalTickAccepted: state.adrenalTickAccepted,
        cacheHit: state.cacheHit,
        castleFallback: state.castleFallback,
        unifiedBandSnapshot: state.unifiedBandSnapshot,
        meta: { ...state.meta }
      })
  };
};


// ============================================================================
//  INTERNAL ADVANTAGE STATE
// ============================================================================
const jobResultCache = new Map();
const hotInstanceBatches = new Map();

function stableStringify(obj) {
  if (obj == null || typeof obj !== "object") return JSON.stringify(obj);
  const keys = Object.keys(obj).sort();
  const out = {};
  for (const k of keys) out[k] = obj[k];
  return JSON.stringify(out);
}

function buildBatchKey(instances, currentStatesById, globalContinuancePolicy) {
  return stableStringify({
    instances,
    currentStatesById,
    globalContinuancePolicy
  });
}

// ============================================================================
//  PROXY-AWARE TICK GOVERNOR
// ============================================================================
function computeProxyAwareMaxTicks(baseMaxTicks) {
  let maxTicks = baseMaxTicks;

  const mode = getProxyMode();
  const pressure = getProxyPressure();
  const boost = getProxyBoost();
  const fallback = getProxyFallback();

  if (fallback || mode === "fallback") {
    maxTicks = Math.max(1, maxTicks - 2);
  }

  if (pressure > 0.7) {
    maxTicks = Math.max(1, maxTicks - 1);
  }

  if (boost > 0.5 && !fallback && mode !== "fallback") {
    maxTicks += 1;
  }

  return maxTicks;
}

// ============================================================================
//  CASTLE / EXPANSION / PULSENET BRIDGE HELPERS
// ============================================================================
function buildServerCastleId({ serverId, regionId }) {
  return `SERVER_GENERAL::${regionId || "unknown-region"}::${serverId || "anon"}`;
}

function isCastleHealthy(presenceField) {
  if (!presenceField) return false;
  const tier = presenceField.tier || presenceField.presenceTier || "normal";
  const score =
    presenceField.presenceScore ??
    presenceField.composite ??
    0;
  const stress = presenceField.stressIndex ?? 0;

  if (getProxyFallback()) return false;
  if (tier === "low") return false;
  if (score < 0.3) return false;
  if (stress > 0.9) return false;
  return true;
}

function emitBridgeSafe(bridge, method, payload) {
  if (!bridge || typeof bridge[method] !== "function") return { ok: false };
  try {
    return bridge[method](payload) || { ok: true };
  } catch (err) {
    logger.log("server", "pulsenet_bridge_error", {
      method,
      error: String(err)
    });
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  UNIFIED BAND LANE (v30+)
// ============================================================================
//
//  One band = symbolic + binary + mesh + touch + runtime + proxy
//  No page unification, only band unification.
//
function buildUnifiedBandSnapshot({
  regionId,
  hostName,
  serverId,
  dualBandEngine,
  binaryTech
}) {
  const touch = getPulseTouchContext() || {};
  const runtime = getPulseRuntimeContext() || {};
  const userCtx = getPulseUserContext() || null;
  const proxyMode = getProxyMode() || "normal";
  const proxyPressure = getProxyPressure() ?? 0;
  const proxyBoost = getProxyBoost() ?? 0;
  const proxyFallback = !!getProxyFallback();
  const proxyLineage = getProxyLineage() || null;
  const proxyContext = getProxyContext() || null;

  let dualBandSnapshot = null;
  try {
    dualBandSnapshot =
      dualBandEngine && typeof dualBandEngine.getSnapshot === "function"
        ? dualBandEngine.getSnapshot()
        : null;
  } catch {
    dualBandSnapshot = null;
  }

  let binaryCarrier = null;
  try {
    binaryCarrier =
      binaryTech && typeof binaryTech.nextPulseMulti === "function"
        ? binaryTech.nextPulseMulti()
        : binaryTech.nextPulse() || null;
  } catch {
    binaryCarrier = null;
  }

  return Object.freeze({
    organId: PulseServerUnifiedBandMeta.organId,
    version: PulseServerUnifiedBandMeta.version,
    regionId: regionId || "unknown-region",
    hostName: hostName || "unknown-host",
    serverId: serverId || "server-unknown",

    touch: {
      presence: touch.presence || "unknown",
      mode: touch.mode || "unknown",
      identity: touch.identity || null,
      identityTier: touch.identityTier || "anon",
      persona: touch.persona || null,
      bandPresence: touch.bandPresence || "unknown",
      radioBand: touch.radioBand || "bluetooth-symbolic",
      bandwidthTier: touch.bandwidthTier || "normal",
      trusted: touch.trusted || "unknown",
      deviceClass: touch.deviceClass || "generic"
    },

    runtime: {
      mode: runtime.mode || null,
      loadIndex: runtime.loadIndex ?? null,
      hotInstances: runtime.hotInstances || null,
      hotRegions: runtime.hotRegions || null,
      hotPresence: runtime.hotPresence || null,
      hotModes: runtime.hotModes || null
    },

    user: userCtx
      ? {
          id: userCtx.id || null,
          tier: userCtx.tier || "guest",
          contributionScore: userCtx.contributionScore ?? null
        }
      : null,

    proxy: {
      mode: proxyMode,
      pressure: proxyPressure,
      boost: proxyBoost,
      fallback: proxyFallback,
      lineage: proxyLineage,
      context: proxyContext
    },

    dualBand: dualBandSnapshot,
    binaryCarrier,

    unifiedBandTier:
      proxyFallback ? "fallback" :
      proxyPressure > 0.7 ? "high-pressure" :
      proxyBoost > 0.5 ? "boosted" :
      "normal"
  });
}

// ============================================================================
//  CORE SERVER ENGINE — UNIFIED BAND
// ============================================================================
const DEFAULT_BOOT_USERS_PER_SERVER = 10;

// ============================================================================
//  PulseServerPresenceExec‑IMMORTAL‑v1 (FULL)
//  Pure pseudo‑class — IMMORTAL, sealed, deterministic
// ============================================================================

export const PulseServerPresenceExec = (() => {

  // ==========================================================================
  //  FACTORY
  // ==========================================================================
  const create = (partialConfig = {}) => {

    // ------------------------------------------------------------------------
    // INTERNAL IMMORTAL STATE
    // ------------------------------------------------------------------------
    const state = {
      config: {
        enableAdrenal: true,
        enableScheduler: true,
        enableRuntimeV2DirectTick: true,
        enableJobCache: true,
        enableBatchReuse: true,
        defaultGlobalPolicy: {},
        defaultMaxTicks: 3,
        defaultStopOnWorldLens: ["unsafe"],

        worldCore: null,
        mesh: null,
        userContext: null,
        pulseNetBridge: null,
        brainNetworkMode: true,

        regionId: null,
        hostName: null,
        serverId: null,
        enableCastleFallback: true,

        dualBandEngine: null,
        binarySend: null,
        binaryTech: null,

        demoUsersOnBoot: true,
        demoUsersPerServer: DEFAULT_BOOT_USERS_PER_SERVER,

        ...partialConfig
      },

      worldCore: null,
      mesh: null,
      userContext: null,

      regionId: null,
      hostName: null,
      serverId: null,

      serverEvolution: null,
      pulseNetBridge: null,
      dualBandEngine: null,
      binarySend: null,
      binaryTech: null,
      scheduler: null,
      expansion: PulseExpansion
    };

    // ------------------------------------------------------------------------
    // CONFIG → STATE PRIMING
    // ------------------------------------------------------------------------
    state.worldCore   = state.config.worldCore   || null;
    state.mesh        = state.config.mesh        || null;
    state.userContext = state.config.userContext || null;

    state.regionId = state.config.regionId || null;
    state.hostName = state.config.hostName || null;
    state.serverId = state.config.serverId || null;

    // ------------------------------------------------------------------------
    // SERVER EVOLUTION ORGAN
    // ------------------------------------------------------------------------
    state.serverEvolution = createPulseNodeEvolutionV30({
      nodeType: "server",
      trace: false
    });

    // ------------------------------------------------------------------------
    // PULSENET BRIDGE
    // ------------------------------------------------------------------------
    state.pulseNetBridge =
      state.config.pulseNetBridge ||
      (typeof createPulseNetBridge === "function"
        ? createPulseNetBridge()
        : null);

    // ------------------------------------------------------------------------
    // DUALBAND ENGINE
    // ------------------------------------------------------------------------
    state.dualBandEngine =
      state.config.dualBandEngine ||
      (typeof PulseBinaryOrganismBoot === "function"
        ? PulseBinaryOrganismBoot({ mode: "presence-server" })
        : null);

    // ------------------------------------------------------------------------
    // BINARY SEND
    // ------------------------------------------------------------------------
    state.binarySend =
      state.config.binarySend ||
      (typeof PulseSendBin === "function"
        ? PulseSendBin({ source: "PulseServer-v30-ExpansionUnifiedBand" })
        : null);

    // ------------------------------------------------------------------------
    // BINARY TECH
    // ------------------------------------------------------------------------
    state.binaryTech =
      state.config.binaryTech ||
      (typeof createBinaryPulse === "function"
        ? createBinaryPulse({
            regionId: state.regionId || "unknown-region",
            hostName: state.hostName || "unknown-host",
            worldRouterHint: { source: "PulseServer-v30-ExpansionUnifiedBand" },
            schedulerHint: { mode: "server_exec" },
            pulseTouch: getPulseTouchContext() || null
          })
        : null);

    // ------------------------------------------------------------------------
    // SCHEDULER
    // ------------------------------------------------------------------------
    state.scheduler = createPulseScheduler({
      defaultGlobalPolicy: state.config.defaultGlobalPolicy,
      defaultMaxTicks: state.config.defaultMaxTicks,
      defaultStopOnWorldLens: state.config.defaultStopOnWorldLens,
      ...state.config.schedulerConfig
    });

    // ------------------------------------------------------------------------
    // EXPANSION → ATTACH PULSENET BRIDGE
    // ------------------------------------------------------------------------
    if (
      state.expansion &&
      state.pulseNetBridge &&
      typeof state.expansion.attachPulseNetBridge === "function"
    ) {
      try {
        state.expansion.attachPulseNetBridge(state.pulseNetBridge);
      } catch {}
    }

    // ------------------------------------------------------------------------
    // WORLDCORE RUNTIME ATTACH
    // ------------------------------------------------------------------------
    if (state.worldCore && typeof state.worldCore.attachRuntime === "function") {
      try {
        state.worldCore.attachRuntime(PulseRuntimeV30);
      } catch {}
    }

    // ------------------------------------------------------------------------
    // MESH USER ATTACH
    // ------------------------------------------------------------------------
    if (state.mesh && typeof state.mesh.attachUser === "function") {
      try {
        state.mesh.attachUser(state.userContext || { source: "PulseServer" });
      } catch {}
    }

    // ------------------------------------------------------------------------
    // DEMO USERS ON BOOT
    // ------------------------------------------------------------------------
    if (state.config.demoUsersOnBoot) {
      bootstrapDemoUsers();
    }

    // ==========================================================================
    // INTERNAL FUNCTIONS
    // ==========================================================================

    function bootstrapDemoUsers() {
      const regionId = state.regionId || "server-demo-region";
      const hostName = state.hostName || "server-demo-host";
      const count = state.config.demoUsersPerServer || DEFAULT_BOOT_USERS_PER_SERVER;

      const demoUsers = [];

      for (let i = 0; i < count; i++) {
        const userKey = `server-demo-user-${i + 1}`;
        try {
          const worldCore =
            typeof createPulseWorldCore === "function"
              ? createPulseWorldCore({
                  regionID: regionId,
                  serverMode: true,
                  demo: true,
                  userKey
                })
              : null;

          const snapshot = worldCore.getSnapshot() || null;

          demoUsers.push({
            userKey,
            regionId,
            hostName,
            worldCoreSnapshot: snapshot
          });
        } catch {}
      }

      return demoUsers;
    }

    function nextBinaryCarrier(mode = "base") {
      if (!state.binaryTech) return null;
      try {
        switch (mode) {
          case "fast":    return state.binaryTech.nextPulseFast();
          case "slow":    return state.binaryTech.nextPulseSlow();
          case "deep":    return state.binaryTech.nextPulseDeep();
          case "multi":   return state.binaryTech.nextPulseMulti();
          case "echo":    return state.binaryTech.nextPulseEcho();
          case "reflect": return state.binaryTech.nextPulseReflect();
          case "burst":   return state.binaryTech.nextPulseBurst();
          default:        return state.binaryTech.nextPulse();
        }
      } catch {
        return null;
      }
    }

    function evolveServerPacket(packet, extraCtx = {}) {
      if (!state.serverEvolution) return packet;

      const context = {
        regionId: state.regionId,
        hostName: state.hostName,
        serverId: state.serverId,

        userContext: state.userContext,
        worldCore: state.worldCore,
        mesh: state.mesh,

        runtime: getPulseRuntimeContext(),
        scheduler: getPulseSchedulerContext(),
        overmind: getPulseOvermindContext(),
        earn: PulseRealm.PulseEarnContext(),

        proxyMode: getProxyMode(),
        proxyPressure: getProxyPressure(),
        proxyBoost: getProxyBoost(),
        proxyFallback: getProxyFallback(),
        proxyLineage: getProxyLineage(),
        proxyContext: getProxyContext(),

        touch: getPulseTouchContext(),

        serverMeta: PulseServerUnifiedBandMeta,
        routerMeta: PulseRealm.PulseInternetRouterMeta,
        castleMeta: PulseCastleMeta,
        expansionMeta: PulseExpansionMeta,
        schedulerMeta: PulseSchedulerMeta,
        adrenalMeta: PulseProxyAdrenalSystemMeta,

        ...extraCtx
      };

      return state.serverEvolution.evolveNodePulse({
        nodeType: "server",
        pulse: packet,
        context
      });
    }

    function prewarmAndMaybeReuseBatch({
      instances,
      currentStatesById,
      globalContinuancePolicy
    }) {
      PulseCoreGMemory.prewarm();

      if (!state.config.enableBatchReuse) {
        return { instances, currentStatesById, reused: false };
      }

      const batchKey = buildBatchKey(
        instances,
        currentStatesById,
        globalContinuancePolicy
      );

      if (hotInstanceBatches.has(batchKey)) {
        const hot = hotInstanceBatches.get(batchKey);
        return {
          instances: hot.instances,
          currentStatesById: hot.currentStatesById,
          reused: true
        };
      }

      hotInstanceBatches.set(batchKey, {
        instances,
        currentStatesById
      });

      return { instances, currentStatesById, reused: false };
    }

    async function runAdrenalIfEnabled(adrenalPulse) {
      if (!state.config.enableAdrenal) {
        return {
          adrenalTickAccepted: false,
          adrenalMeta: {
            meta: PulseProxyAdrenalSystemMeta,
            note: "Adrenal disabled at PulseServer config."
          }
        };
      }

      const unifiedBandSnapshot = buildUnifiedBandSnapshot({
        regionId: state.regionId,
        hostName: state.hostName,
        serverId: state.serverId,
        dualBandEngine: state.dualBandEngine,
        binaryTech: state.binaryTech
      });

      const pulsePayload = {
        ...(adrenalPulse || {}),
        userContext: state.userContext || null,
        unifiedBand: unifiedBandSnapshot
      };

      await runAdrenalInstanceOrchestrator(pulsePayload);

      return {
        adrenalTickAccepted: true,
        adrenalMeta: {
          meta: PulseProxyAdrenalSystemMeta,
          pulse: pulsePayload
        },
        unifiedBandSnapshot
      };
    }

    // --------------------------------------------------------------------------
    // INTERNAL: SCHEDULER PIPELINE (IMMORTAL)
    // --------------------------------------------------------------------------
    async function runSchedulerPipeline({
      instances = [],
      currentStatesById = {},
      globalContinuancePolicy = null,
      userRequest = null,
      dualBand = null,
      maxTicks = null,
      stopOnWorldLens = null,
      unifiedBandSnapshot = null
    } = {}) {

      // Use scheduler from IMMORTAL state
      const scheduler = state.scheduler;
      if (!scheduler || typeof scheduler.runPipeline !== "function") {
        throw new Error("[PulseServerPresenceExec] Scheduler not available");
      }

      // Build pipeline context
      const pipelineContext = {
        instances,
        currentStatesById,
        globalContinuancePolicy:
          globalContinuancePolicy || state.config.defaultGlobalPolicy,

        userRequest: userRequest || null,
        dualBand: dualBand || null,

        maxTicks: maxTicks ?? state.config.defaultMaxTicks,
        stopOnWorldLens: stopOnWorldLens || state.config.defaultStopOnWorldLens,

        unifiedBandSnapshot: unifiedBandSnapshot || null
      };

      // Execute scheduler pipeline
      const schedulerPipeline = await scheduler.runPipeline(pipelineContext);

      return {
        schedulerPipeline
      };
    }


    function runRuntimeV2IfEnabled({
      instanceContexts,
      currentStatesById,
      globalContinuancePolicy = {}
    }) {
      if (!state.config.enableRuntimeV2DirectTick) {
        return null;
      }

      return runPulseTickV30({
        instanceContexts,
        currentStatesById,
        globalContinuancePolicy
      });
    }

    function maybeGetCachedJob(cacheKey) {
      if (!state.config.enableJobCache || !cacheKey) return null;
      return jobResultCache.get(cacheKey) || null;
    }

    function maybeStoreCachedJob(cacheKey, result) {
      if (!state.config.enableJobCache || !cacheKey) return;
      jobResultCache.set(cacheKey, result);
    }

    async function runBrainNetworkJob({
      brainIntent,
      instances = [],
      currentStatesById = {},
      globalContinuancePolicy = null,
      dualBand = null,
      maxTicks = null,
      stopOnWorldLens = null,
      adrenalPulse = null,
      cacheKey = null
    } = {}) {
      if (!state.config.brainNetworkMode || !brainIntent) {
        return runServerJob({
          instances,
          currentStatesById,
          globalContinuancePolicy,
          dualBand,
          maxTicks,
          stopOnWorldLens,
          adrenalPulse,
          cacheKey
        });
      }

      const userRequest = {
        source: "BrainIntent",
        intent: brainIntent.intent,
        payload: brainIntent.payload || null,
        band: brainIntent.band || "symbolic",
        userContext: state.userContext || null
      };

      return runServerJob({
        instances,
        currentStatesById,
        globalContinuancePolicy,
        userRequest,
        dualBand,
        maxTicks,
        stopOnWorldLens,
        adrenalPulse,
        cacheKey
      });
    }

    function evaluateCastleFallbackAndSignal({
      runtimeStateV2,
      schedulerPipeline
    }) {
      if (!state.config.enableCastleFallback) {
        const base = {
          takeover: false,
          reason: "castle_fallback_disabled"
        };
        return evolveServerPacket(base, { mode: "castle_fallback_disabled" });
      }

      const regionId = state.regionId || "unknown-region";
      const serverId = state.serverId || "server-unknown";
      const hostName = state.hostName || "host-unknown";

      let takeover = false;
      let reason = "castle_healthy_or_unknown";
      let castlePresenceField = null;
      let meshSnapshot = null;
      let regionInfo = null;

      try {
        const snapshot = summarizeCastlePresence();
        const byRegion = snapshot.byRegion || {};
        regionInfo = byRegion[regionId];

        if (!regionInfo || regionInfo.castles.length === 0) {
          takeover = true;
          reason = "no_castles_in_region";
        } else {
          let anyHealthy = false;
          for (const c of regionInfo.castles) {
            const presenceField = c.presenceField || computeCastlePresence(c);
            if (isCastleHealthy(presenceField)) {
              anyHealthy = true;
              break;
            }
          }
          if (!anyHealthy) {
            takeover = true;
            reason = "all_castles_unhealthy_or_low";
          }
        }

        meshSnapshot = regionInfo || null;
        castlePresenceField =
          regionInfo && regionInfo.castles[0]
            ? regionInfo.castles[0].presenceField || null
            : null;
      } catch {
        takeover = true;
        reason = "castle_snapshot_error";
      }

      const serverCastleId = buildServerCastleId({ serverId, regionId });

      const serverCastlePresence = {
        castleId: serverCastleId,
        regionId,
        hostName,
        presenceField: {
          tier: "normal",
          presenceScore: 0.6,
          loadIndex: 0.4,
          stressIndex: 0.3,
          proxyMode: getProxyMode(),
          proxyPressure: getProxyPressure(),
          proxyBoost: getProxyBoost(),
          proxyFallback: getProxyFallback(),
          proxyLineage: getProxyLineage()
        },
        runtimeHint: {
          runtimeStateV2: !!runtimeStateV2,
          schedulerTicks: schedulerPipeline.ticks.length ?? 0
        },
        regionHint: {
          castleCount: regionInfo.castles.length ?? 0,
          serversPerCastle:
            regionInfo && regionInfo.castles.length > 0
              ? (regionInfo.totalServers || 0) / regionInfo.castles.length
              : 0
        }
      };

      const baseResult = {
        takeover,
        reason,
        serverCastleId,
        serverCastlePresence
      };

      const evolvedResult = evolveServerPacket(baseResult, {
        mode: "castle_fallback",
        regionInfo,
        castlePresenceField,
        meshSnapshot
      });

      if (takeover && state.pulseNetBridge) {
        const bridgePayload = {
          mode: "server_general_takeover",
          serverId,
          regionId,
          hostName,
          serverCastleId,
          serverCastlePresence:
            evolvedResult.serverCastlePresence || serverCastlePresence,
          previousCastlePresence: castlePresenceField,
          meshSnapshot,
          proxy: {
            mode: getProxyMode(),
            pressure: getProxyPressure(),
            boost: getProxyBoost(),
            fallback: getProxyFallback(),
            lineage: getProxyLineage()
          }
        };

        emitBridgeSafe(
          state.pulseNetBridge,
          "routeCastle",
          evolveServerPacket(bridgePayload, {
            mode: "bridge_castle_takeover"
          })
        );

        if (state.expansion && typeof state.expansion.buildExpansionPlan === "function") {
          try {
            state.expansion.buildExpansionPlan({
              globalLoadIndex: 0.5,
              regionSignals: {
                [regionId]: {
                  avgLoadIndex: 0.5,
                  userDensityHint: 0,
                  stressHint: 0.4
                }
              }
            });
          } catch {}
        }
      }

      return evolvedResult;
    }

    async function runServerJob({
      instances = [],
      currentStatesById = {},
      globalContinuancePolicy = null,
      userRequest = null,
      dualBand = null,
      maxTicks = null,
      stopOnWorldLens = null,
      adrenalPulse = null,
      cacheKey = null
    } = {}) {
      if (cacheKey) {
        const cached = maybeGetCachedJob(cacheKey);
        if (cached) {
          return new PulseServerJobResult({
            ...cached,
            cacheHit: true
          });
        }
      }

      const { instances: prewarmedInstances, currentStatesById: prewarmedStates } =
        prewarmAndMaybeReuseBatch({
          instances,
          currentStatesById,
          globalContinuancePolicy
        });

      const adrenalResult = await runAdrenalIfEnabled(adrenalPulse);
      const unifiedBandSnapshot =
        adrenalResult.unifiedBandSnapshot ||
        buildUnifiedBandSnapshot({
          regionId: state.regionId,
          hostName: state.hostName,
          serverId: state.serverId,
          dualBandEngine: state.dualBandEngine,
          binaryTech: state.binaryTech
        });

      const { schedulerPipeline } = await runSchedulerPipeline({
        instances: prewarmedInstances,
        currentStatesById: prewarmedStates,
        globalContinuancePolicy,
        userRequest,
        dualBand,
        maxTicks,
        stopOnWorldLens,
        unifiedBandSnapshot
      });

      const runtimeStateV2 = runRuntimeV2IfEnabled({
        instanceContexts: schedulerPipeline.instanceContexts || [],
        currentStatesById: schedulerPipeline.currentStatesById || prewarmedStates,
        globalContinuancePolicy:
          globalContinuancePolicy ?? state.config.defaultGlobalPolicy
      });

      const castleFallback = evaluateCastleFallbackAndSignal({
        runtimeStateV2,
        schedulerPipeline
      });

      const result = PulseServerJobResult({
        serverMeta: PulseServerUnifiedBandMeta,
        schedulerPipeline,
        runtimeStateV2,
        adrenalMeta: adrenalResult.adrenalMeta,
        adrenalTickAccepted: adrenalResult.adrenalTickAccepted,
        cacheHit: false,
        castleFallback,
        unifiedBandSnapshot,
        meta: {
          proxyMode: getProxyMode(),
          proxyPressure: getProxyPressure(),
          proxyBoost: getProxyBoost(),
          proxyFallback: getProxyFallback()
        }
      });

      if (cacheKey) {
        maybeStoreCachedJob(cacheKey, result);
      }

      return result;
    }

    return {

      // ------------------------------------------------------
      // INTERNAL STATE INSPECTION (SAFE)
      // ------------------------------------------------------
      _state: () => state,

      // ------------------------------------------------------
      // WORLDCORE ATTACH
      // ------------------------------------------------------
      attachWorldCore: (worldCore) => {
        state.worldCore = worldCore;
        if (worldCore && typeof worldCore.attachRuntime === "function") {
          try {
            worldCore.attachRuntime(PulseRuntimeV30);
          } catch {}
        }
        return { ok: true };
      },

      // ------------------------------------------------------
      // MESH ATTACH
      // ------------------------------------------------------
      attachMesh: (mesh) => {
        state.mesh = mesh;
        if (mesh && typeof mesh.attachUser === "function") {
          try {
            mesh.attachUser(state.userContext || { source: "PulseServer" });
          } catch {}
        }
        return { ok: true };
      },

      // ------------------------------------------------------
      // USER CONTEXT ATTACH
      // ------------------------------------------------------
      attachUserContext: (userContext) => {
        state.userContext = userContext;
        if (state.mesh && typeof state.mesh.attachUser === "function") {
          try {
            state.mesh.attachUser(userContext);
          } catch {}
        }
        return { ok: true };
      },

      // ------------------------------------------------------
      // PULSENET BRIDGE ATTACH
      // ------------------------------------------------------
      attachPulseNetBridge: (pulseNetBridge) => {
        state.pulseNetBridge = pulseNetBridge;

        if (pulseNetBridge && typeof pulseNetBridge.attachServer === "function") {
          try {
            pulseNetBridge.attachServer({ serverMeta: PulseServerUnifiedBandMeta });
          } catch {}
        }

        if (
          state.expansion &&
          state.pulseNetBridge &&
          typeof state.expansion.attachPulseNetBridge === "function"
        ) {
          try {
            state.expansion.attachPulseNetBridge(state.pulseNetBridge);
          } catch {}
        }

        return { ok: true };
      },

      // ------------------------------------------------------
      // DUALBAND ENGINE ATTACH
      // ------------------------------------------------------
      attachDualBandEngine: (dualBandEngine) => {
        state.dualBandEngine = dualBandEngine || null;
        return { ok: true };
      },

      // ------------------------------------------------------
      // BINARY SEND ATTACH
      // ------------------------------------------------------
      attachBinarySend: (binarySend) => {
        state.binarySend = binarySend || null;
        return { ok: true };
      },

      // ------------------------------------------------------
      // EXECUTION SURFACE
      // ------------------------------------------------------
      runServerJob,
      runBrainNetworkJob,
      evaluateCastleFallbackAndSignal,
      runRuntimeV2IfEnabled,
      runAdrenalIfEnabled,
      prewarmAndMaybeReuseBatch,
      nextBinaryCarrier,
      evolveServerPacket,

      // ------------------------------------------------------
      // OPTIONAL: direct access to scheduler + binary tech
      // ------------------------------------------------------
      scheduler: () => state.scheduler,
      binaryTech: () => state.binaryTech,
      binarySend: () => state.binarySend,
      pulseNetBridge: () => state.pulseNetBridge
    };
  };

  // ==========================================================================
  // SINGLETON‑STYLE EXPORT (matches PulseExpansion pattern)
  // ==========================================================================
  return {
    create
  };

})();
// ============================================================================
// createPulseServer-v31
// IMMORTAL-CONTINUANCE-ONEBAND
// Factory wrapper for PulseServerPresenceExec
// ============================================================================

// ============================================================================
//  createPulseServer‑IMMORTAL‑v1
//  Pure factory wrapper for PulseServerPresenceExec IMMORTAL organism
// ============================================================================

export const createPulseServer = (() => {

  const create = (config = {}) => {
    // ------------------------------------------------------------
    // DEFAULTS (v31 IMMORTAL)
    // ------------------------------------------------------------
    const finalConfig = {
      regionId: config.regionId || "unknown-region",
      hostName: config.hostName || "server-host",

      serverId: config.serverId || `server-${Math.random().toString(36).slice(2, 8)}`,

      enableAdrenal: config.enableAdrenal ?? true,
      enableScheduler: config.enableScheduler ?? true,
      enableRuntimeV2DirectTick: config.enableRuntimeV2DirectTick ?? true,
      enableJobCache: config.enableJobCache ?? true,
      enableBatchReuse: config.enableBatchReuse ?? true,

      defaultGlobalPolicy: config.defaultGlobalPolicy || {},
      defaultMaxTicks: config.defaultMaxTicks ?? 3,
      defaultStopOnWorldLens: config.defaultStopOnWorldLens || ["unsafe"],

      // Integration points
      worldCore: config.worldCore || null,
      mesh: config.mesh || null,
      userContext: config.userContext || null,
      pulseNetBridge: config.pulseNetBridge || null,
      brainNetworkMode: config.brainNetworkMode ?? true,

      // Castle / Expansion
      enableCastleFallback: config.enableCastleFallback ?? true,

      // DualBand / binary
      dualBandEngine: config.dualBandEngine || null,
      binarySend: config.binarySend || null,
      binaryTech: config.binaryTech || null,

      // Demo users
      demoUsersOnBoot: config.demoUsersOnBoot ?? true,
      demoUsersPerServer: config.demoUsersPerServer ?? 10,

      // Scheduler passthrough
      schedulerConfig: config.schedulerConfig || {},

      // Anything else
      ...config
    };

    // ------------------------------------------------------------
    // INSTANTIATE IMMORTAL SERVER ORGANISM
    // ------------------------------------------------------------
    const server = PulseServerPresenceExec.create(finalConfig);

    // ------------------------------------------------------------
    // RETURN READY‑TO‑RUN IMMORTAL INSTANCE
    // ------------------------------------------------------------
    return server;
  };

  // IMMORTAL EXPORT
  return { create };

})();



// ============================================================================
// PulseServerMeta-v31
// IMMORTAL-CONTINUANCE-ONEBAND
// Server identity + capability metadata
// ============================================================================

export const PulseServerMeta = Object.freeze({
  organId: "PULSE_SERVER_V31",
  version: "v31-IMMORTAL-CONTINUANCE-ONEBAND",

  // What this organ *is*
  role: "presence-server",
  description: "Unified-band presence + runtime + scheduler execution server",

  // Capabilities
  capabilities: {
    unifiedBand: true,
    dualBand: true,
    binaryCarrier: true,
    scheduler: true,
    expansion: true,
    castleFallback: true,
    continuance: true,
    worldRuntimeFrame: true,
    predictions: true,
    oneBandLanes: true
  },

  // Environment defaults
  defaults: {
    regionId: "unknown-region",
    hostName: "unknown-host",
    serverId: "server-unknown",
    demoUsersPerServer: 10
  },

  // Lineage (for debugging + evolution)
  lineage: {
    family: "PulseServer",
    generation: 31,
    evolution: [
      "v16-node-evolution",
      "v20-immortal",
      "v30-unified-band",
      "v31-continuance-oneband"
    ]
  }
});
export function getPulseServerContext(server, extra = {}) {
  if (!server) {
    return { ok: false, error: "No server instance provided." };
  }

  // ------------------------------------------------------------
  // SERVER-LEVEL IDENTIFIERS
  // ------------------------------------------------------------
  const regionId = server.regionId || "unknown-region";
  const hostName = server.hostName || "unknown-host";
  const serverId = server.serverId || "server-unknown";

  // ------------------------------------------------------------
  // USER + WORLDCORE + MESH
  // ------------------------------------------------------------
  const userContext = server.userContext || null;
  const worldCore = server.worldCore || null;
  const mesh = server.mesh || null;

  // ------------------------------------------------------------
  // RUNTIME ORGANS (GLOBAL GETTERS)
  // ------------------------------------------------------------
  const runtime = getPulseRuntimeContext() || null;
  const scheduler = getPulseSchedulerContext() || null;
  const overmind = getPulseOvermindContext() || null;
  const earn = PulseRealm.PulseEarnContext() || null;

  // ------------------------------------------------------------
  // PROXY SURFACES
  // ------------------------------------------------------------
  const proxyMode = getProxyMode() || null;
  const proxyPressure = getProxyPressure() ?? 0;
  const proxyBoost = getProxyBoost() ?? 0;
  const proxyFallback = getProxyFallback() ?? false;
  const proxyLineage = getProxyLineage() || null;
  const proxyContext = getProxyContext() || null;

  // ------------------------------------------------------------
  // TOUCH ORGAN
  // ------------------------------------------------------------
  const touch = getPulseTouchContext() || null;

  // ------------------------------------------------------------
  // META SURFACES (STATIC)
  // ------------------------------------------------------------
  const serverMeta = PulseServerUnifiedBandMeta || null;
  const routerMeta = PulseRealm.PulseInternetRouterMeta || null;
  const castleMeta = PulseCastleMeta || null;
  const expansionMeta = PulseExpansionMeta || null;
  const schedulerMeta = PulseSchedulerMeta || null;
  const adrenalMeta = PulseProxyAdrenalSystemMeta || null;

  // ------------------------------------------------------------
  // FINAL CONTEXT OBJECT
  // ------------------------------------------------------------
  return {
    ok: true,
    version: "v31-IMMORTAL-EXPANSION-SERVER-ONEBAND",

    // Server identity
    regionId,
    hostName,
    serverId,

    // User + world surfaces
    userContext,
    worldCore,
    mesh,

    // Runtime organs
    runtime,
    scheduler,
    overmind,
    earn,

    // Proxy surfaces
    proxyMode,
    proxyPressure,
    proxyBoost,
    proxyFallback,
    proxyLineage,
    proxyContext,

    // Touch organ
    touch,

    // Meta surfaces
    serverMeta,
    routerMeta,
    castleMeta,
    expansionMeta,
    schedulerMeta,
    adrenalMeta,

    // Extra injection
    ...extra
  };
}

PulseRealm.ExpansionServer = {
  getPulseServerContext,
  PulseServerJobResult,
  PulseServerMeta,
  PulseServerPresenceExec,
  createPulseServer,
  computeProxyAwareMaxTicks,
  PulseServerUnifiedBandMeta
}