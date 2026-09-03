// ============================================================================
//  PULSE GPU LYMPH NODES v30-Immortal+++‑Ascendant — IMMUNE GRID
//  Deterministic immune layer over advisor/restore/auto-opt/UX signals
//  Survival‑aware • Warm‑path‑aware • Earn‑aware • Advantage‑aware
// ============================================================================

import { PulseGPUSettingsRestorer } from "./PulseGPUCognitiveLayer-v30.js";
import { PulseGPUUXBridge as PulseGPUCognitiveIntelligenceUX} from "./PulseGPUCognitiveIntelligence-v30.js";
import { PulseGPUPerformanceAdvisor } from "./PulseGPUDriveCenter-v30.js";
import {
  PulseGPUGuardianCortex as PulseGPUAutoOptimize
} from "./PulseGPUGuardianCortex-v30.js";

// Optional: read-only surfaces (plug in if you want)
import { PulseGPUSurvivalInstincts } from "./PulseGPUSurvivalInstincts-v30.js";
import { PulseGPUWarmPathCache } from "./PULSE-GPU-WARMPATHCACHE.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


const GPU_HEALER_CONTEXT = {
  layer: "PulseGPUHealer",
  version: "v30-Immortal+++‑Ascendant",
  kind: "gpu-lymph-nodes",
  tempoAware: true,
  binaryReady: true,
  indexedDBReady: true,
  survivalAware: true,
  warmPathAware: true,
  earnAware: true,
  advantageAware: true
};

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function cloneArray(arr) {
  return Array.isArray(arr) ? arr.slice() : [];
}

function safeObj(v) {
  return v && typeof v === "object" ? v : null;
}

function buildHealingReport({
  status,
  actions,
  advisorResult,
  restorePlan,
  autoDecision,
  notifications,
  gpuContext,
  advantageSnapshot,
  cacheState,
  prewarmState,
  earnProfile,
  presence,
  gameActive,
  immuneStats
}) {
  return {
    status,
    actions: cloneArray(actions),
    advisorResult: advisorResult || null,
    restorePlan: restorePlan || null,
    autoDecision: autoDecision || null,
    notifications: cloneArray(notifications),
    gpuContext: gpuContext || null,
    advantageSnapshot: advantageSnapshot || null,
    cacheState: cacheState || null,
    prewarmState: prewarmState || null,
    earnProfile: earnProfile || null,
    presence: presence || null,
    gameActive: !!gameActive,
    immuneStats: immuneStats || null,
    meta: { ...GPU_HEALER_CONTEXT }
  };
}

function validateHealingReport(report) {
  if (!report || typeof report !== "object") return false;
  if (!report.meta || report.meta.layer !== "PulseGPUHealer") return false;
  if (typeof report.status !== "string") return false;
  if (!Array.isArray(report.actions)) return false;
  return true;
}

function isAdvisorResultValid(result) {
  return !!result && typeof result === "object" && Array.isArray(result.advice);
}

function isAutoDecisionValid(decision) {
  return (
    !!decision &&
    typeof decision === "object" &&
    typeof decision.mode === "string" &&
    typeof decision.reason === "string"
  );
}

function validatePlan(plan) {
  return !!plan && typeof plan === "object" && typeof plan.action === "string";
}

function validateNotification(notification) {
  return (
    !!notification &&
    typeof notification === "object" &&
    typeof notification.kind === "string"
  );
}

function filterValidNotifications(notifications) {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((n) => validateNotification(n));
}

// ---------------------------------------------------------------------------
// Immune severity + stats
// ---------------------------------------------------------------------------
function classifyImmuneSeverity(actions) {
  if (!Array.isArray(actions) || actions.length === 0) return "healthy";

  let hasRegen = false;
  let hasCache = false;

  for (const a of actions) {
    if (!a || typeof a.type !== "string") continue;
    if (a.type.indexOf("recomputed") === 0) hasRegen = true;
    if (a.type.indexOf("cache-hit") !== -1) hasCache = true;
  }

  if (hasRegen && hasCache) return "elevated";
  if (hasRegen) return "repaired";
  if (hasCache) return "warm";
  return "healthy";
}

function initImmuneStats() {
  return {
    advisorRegenCount: 0,
    planRegenCount: 0,
    decisionRegenCount: 0,
    notificationRegenCount: 0,
    advisorCacheHits: 0,
    planCacheHits: 0,
    notificationCacheHits: 0,
    lastSeverity: "healthy"
  };
}
// ---------------------------------------------------------------------------
//  PULSE GPU HEALER v30-Immortal+++‑Ascendant
// ---------------------------------------------------------------------------
export const PulseGPUHealer = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    advisor: null,
    restorer: null,
    autoOptimize: null,
    uxBridge: null,
    survivalInstincts: null,
    warmPathCache: null,

    advisorCache: new Map(),
    planCache: new Map(),
    notificationCache: new Map(),

    immuneStats: initImmuneStats(),

    meta: { ...GPU_HEALER_CONTEXT }
  };

  // ------------------------------------------------------------
  // INITIALIZER (replaces constructor)
  // ------------------------------------------------------------
  const init = (options = {}) => {
    lane.advisor =
      options.advisor ||
      new PulseGPUPerformanceAdvisor(options.settingsMemory);

    lane.restorer =
      options.restorer ||
      new PulseGPUSettingsRestorer();

    lane.autoOptimize =
      options.autoOptimize ||
      new PulseGPUAutoOptimize(options.userPreferences);

    lane.uxBridge =
      options.uxBridge ||
      new PulseGPUCognitiveIntelligenceUX();

    lane.survivalInstincts =
      options.survivalInstincts instanceof PulseGPUSurvivalInstincts
        ? options.survivalInstincts
        : null;

    lane.warmPathCache =
      options.warmPathCache || PulseGPUWarmPathCache || null;

    // caches already exist in lane
    // immuneStats already exists in lane
  };

  // ------------------------------------------------------------
  // BUILD CACHE KEY
  // ------------------------------------------------------------
  const buildCacheKey = ({
    gameProfile,
    hardwareProfile,
    tierProfile,
    settings,
    metrics,
    gpuContext,
    presence,
    gameActive
  }) => {
    const safe = (v) => (v == null ? null : v);
    return JSON.stringify({
      gameProfile: safe(gameProfile),
      hardwareProfile: safe(hardwareProfile),
      tierProfile: safe(tierProfile),
      settings: safe(settings),
      metrics: safe(metrics),
      gpuContext: safe(gpuContext),
      presence: safe(presence),
      gameActive: !!gameActive
    });
  };

  // ------------------------------------------------------------
  // HEAL SESSION FLOW (CORE IMMUNE CYCLE)
  // ------------------------------------------------------------
  const healSessionFlow = ({
    advisorResult,
    restorePlan,
    autoDecision,
    notifications,
    context = {}
  }) => {

    const actions = [];

    const {
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      userPreferences,
      gpuContext,
      advantageSnapshot,
      prewarmState,
      earnProfile,
      presence,
      gameActive
    } = context;

    const cacheKey = buildCacheKey({
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      gpuContext,
      presence,
      gameActive
    });

    const cacheState = {
      advisorCacheHit: false,
      planCacheHit: false,
      notifCacheHit: false
    };

    // ------------------------------------------------------------
    // 1) ADVISOR
    // ------------------------------------------------------------
    let healedAdvisor = advisorResult;

    if (!isAdvisorResultValid(healedAdvisor)) {
      const cachedAdvisor = lane.advisorCache.get(cacheKey);

      if (isAdvisorResultValid(cachedAdvisor)) {
        healedAdvisor = cachedAdvisor;
        cacheState.advisorCacheHit = true;
        lane.immuneStats.advisorCacheHits += 1;

        actions.push({
          type: "advisor-cache-hit",
          description: "Advisor result restored from immune cache.",
          ...GPU_HEALER_CONTEXT
        });

      } else {
        healedAdvisor = lane.advisor.analyzeCurrentSession({
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          metrics,
          gpuContext
        });

        lane.advisorCache.set(cacheKey, healedAdvisor);
        lane.immuneStats.advisorRegenCount += 1;

        actions.push({
          type: "recomputed-advisor-result",
          description: "Advisor result invalid; immune layer regenerated it.",
          ...GPU_HEALER_CONTEXT
        });
      }
    }

    // ------------------------------------------------------------
    // 2) RESTORE PLAN
    // ------------------------------------------------------------
    let healedPlan = restorePlan;

    if (!validatePlan(healedPlan)) {
      const cachedPlan = lane.planCache.get(cacheKey);

      if (validatePlan(cachedPlan)) {
        healedPlan = cachedPlan;
        cacheState.planCacheHit = true;
        lane.immuneStats.planCacheHits += 1;

        actions.push({
          type: "restore-plan-cache-hit",
          description: "Restore plan restored from immune cache.",
          ...GPU_HEALER_CONTEXT
        });

      } else {
        healedPlan = lane.restorer.buildRestorePlan(
          healedAdvisor.advice,
          { gameProfile, hardwareProfile, tierProfile, gpuContext }
        );

        lane.planCache.set(cacheKey, healedPlan);
        lane.immuneStats.planRegenCount += 1;

        actions.push({
          type: "recomputed-restore-plan",
          description: "Restore plan invalid; immune layer rebuilt it.",
          ...GPU_HEALER_CONTEXT
        });
      }
    }

    // ------------------------------------------------------------
    // 3) AUTO DECISION
    // ------------------------------------------------------------
    let healedDecision = autoDecision;
    const mergedPrefs = { ...(userPreferences || {}) };

    if (!isAutoDecisionValid(healedDecision)) {
      healedDecision = lane.autoOptimize.decide(healedPlan, {
        adviceList: healedAdvisor.advice,
        userPreferences: mergedPrefs,
        gpuContext,
        earnProfile: earnProfile || null,
        presence: presence || null,
        gameActive: !!gameActive
      });

      lane.immuneStats.decisionRegenCount += 1;

      actions.push({
        type: "recomputed-auto-decision",
        description: "Auto-opt decision invalid; immune layer recalculated it.",
        ...GPU_HEALER_CONTEXT
      });
    }

    // ------------------------------------------------------------
    // 4) NOTIFICATIONS
    // ------------------------------------------------------------
    let healedNotifications = filterValidNotifications(notifications);

    const needAdvisorNotifs =
      healedAdvisor &&
      Array.isArray(healedAdvisor.advice) &&
      healedAdvisor.advice.length > 0;

    const needPlanNotif =
      healedPlan &&
      healedPlan.action &&
      healedPlan.action !== "noop";

    if (healedNotifications.length === 0 && (needAdvisorNotifs || needPlanNotif)) {

      const cachedNotifs = lane.notificationCache.get(cacheKey);

      if (Array.isArray(cachedNotifs) && cachedNotifs.length > 0) {
        healedNotifications = filterValidNotifications(cachedNotifs);
        cacheState.notifCacheHit = true;
        lane.immuneStats.notificationCacheHits += 1;

        actions.push({
          type: "notification-cache-hit",
          description: "Notifications restored from immune cache.",
          ...GPU_HEALER_CONTEXT
        });

      } else {
        const advisorNotifs = lane.uxBridge.fromAdvisorResult(
          healedAdvisor,
          { gpuContext, earnProfile, presence, gameActive }
        );

        const planNotif = lane.uxBridge.fromRestorePlan(
          healedPlan,
          { gpuContext, earnProfile, presence, gameActive }
        );

        healedNotifications = advisorNotifs.slice();
        if (planNotif) healedNotifications.push(planNotif);

        healedNotifications = filterValidNotifications(healedNotifications);

        lane.notificationCache.set(cacheKey, healedNotifications);
        lane.immuneStats.notificationRegenCount += 1;

        actions.push({
          type: "regenerated-notifications",
          description: "Notifications invalid; immune layer regenerated them.",
          ...GPU_HEALER_CONTEXT
        });
      }
    }

    // ------------------------------------------------------------
    // 5) WARM-PATH (OPTIONAL)
    // ------------------------------------------------------------
    let prewarmStateOut = prewarmState || null;

    if (!prewarmStateOut && lane.warmPathCache) {
      prewarmStateOut = lane.warmPathCache.compute({
        page: "gpu-session",
        chunkProfile: "gpu",
        gpuCapable: true,
        trust: "trusted",
        risk: "low",
        pulseStream: "continuous",
        fastLane: "enabled"
      });
    }

    // ------------------------------------------------------------
    // IMMUNE STATUS + REPORT
    // ------------------------------------------------------------
    const status = actions.length === 0 ? "healthy" : "repaired";
    const severity = classifyImmuneSeverity(actions);

    lane.immuneStats.lastSeverity = severity;

    const immuneStatsSnapshot = { ...lane.immuneStats, severity };

    return buildHealingReport({
      status,
      actions,
      advisorResult: healedAdvisor,
      restorePlan: healedPlan,
      autoDecision: healedDecision,
      notifications: healedNotifications,
      gpuContext,
      advantageSnapshot: advantageSnapshot || null,
      cacheState,
      prewarmState: prewarmStateOut,
      earnProfile: earnProfile || null,
      presence: presence || null,
      gameActive: !!gameActive,
      immuneStats: immuneStatsSnapshot
    });
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    buildCacheKey,
    healSessionFlow
  };

})();


// ---------------------------------------------------------------------------
// Tempo / heartbeat (kept minimal; you can keep your existing version if needed)
// ---------------------------------------------------------------------------
const PulseGpuLymphTempo = (() => {
  const state = {
    lastPaintAt: performance.now() || 0,
    pressure: "normal"
  };

  function updatePressure(now) {
    const delta = now - state.lastPaintAt;
    if (delta < 120) state.pressure = "normal";
    else if (delta < 400) state.pressure = "elevated";
    else state.pressure = "critical";
  }

  function attachToUi(updateUI) {
    if (typeof updateUI !== "function") return;

    const paint = () => {
      try {
        updateUI();
        
        const now = performance.now();
        state.lastPaintAt = now;
        updatePressure(now);
        
      } catch {}
    };

    if (typeof requestAnimationFrame === "function") {
      (function loop() {
        paint();
        requestAnimationFrame(loop);
      })();
    }

    if (typeof setInterval === "function") {
      setInterval(paint, 180);
    }

    if (PulseRealm.document) {
      setInterval(() => {
        try {
          if (state.pressure !== "normal") {
            const body = PulseRealm.document.body;
            if (body && body.dataset) {
              body.dataset.pulseGpuTick = String(PulseRealm.PulseNOW);
            }
          }
        } catch {}
      }, 250);
    }
  }

  return {
    attachToUi,
    getState: () => ({ ...state })
  };
})();


// ---------------------------------------------------------------------------
// Pulse / world integration helpers (UPGRADED — SAFE MERGE)
// ---------------------------------------------------------------------------

// Safe merge helper
function __mergePulseState(prev, incoming) {
  if (!incoming || typeof incoming !== "object") return prev;

  return {
    ...prev,
    ...incoming,

    network: {
      ...(prev.network || {}),
      ...(incoming.network || {}),
      ...(incoming.bars !== undefined ? { bars: incoming.bars } : {}),
      ...(incoming.band !== undefined ? { band: incoming.band } : {}),
      ...(incoming.route !== undefined ? { route: incoming.route } : {}),
      ...(incoming.via !== undefined ? { via: incoming.via } : {}),
      ...(incoming.internetRole !== undefined ? { internetRole: incoming.internetRole } : {}),
      ...(incoming.season !== undefined ? { season: incoming.season } : {}),
      ...(incoming.nextWindow !== undefined ? { nextWindow: incoming.nextWindow } : {})
    },

    device: {
      ...(prev.device || {}),
      ...(incoming.device || {})
    },

    stability: {
      ...(prev.stability || {}),
      ...(incoming.stability || {})
    },

    latency: {
      ...(prev.latency || {}),
      ...(incoming.latency || {})
    },

    micro: {
      ...(prev.micro || {}),
      ...(incoming.micro || {})
    },

    sync: {
      ...(prev.sync || {}),
      ...(incoming.sync || {})
    },

    efficiency: {
      ...(prev.efficiency || {}),
      ...(incoming.efficiency || {})
    },

    health: {
      ...(prev.health || {}),
      ...(incoming.health || {})
    },

    advantage: {
      ...(prev.advantage || {}),
      ...(incoming.advantage || {})
    }
  };
}


// ---------------------------------------------------------------------------
// Healer → PulseSignal (UPGRADED)
// ---------------------------------------------------------------------------
function attachHealerToPulseSignal(healer, globalObj = window) {
  try {
    const PS = globalObj && globalObj.PulseSignal;
    if (!healer || !PS || typeof PS.subscribe !== "function") return;

    PS.subscribe((packet) => {
      const raw = packet && (packet.state || packet);
      if (!raw || typeof raw !== "object") return;

      try {
        globalObj.__PULSE_LAST_SIGNAL__ =
          __mergePulseState(globalObj.__PULSE_LAST_SIGNAL__, raw);
      } catch {}
    });
  } catch {}
}


// ---------------------------------------------------------------------------
// Healer → PulsePort.Global (UPGRADED)
// ---------------------------------------------------------------------------
function attachHealerToPulsePortGlobal(globalObj = window) {
  try {
    const PP = globalObj && globalObj.PulsePort;
    if (!PP || !PP.Global || !PP.Global.signal) return;

    const s = PP.Global.signal;
    if (!s || typeof s !== "object") return;

    try {
      globalObj.__PULSE_LAST_SIGNAL__ =
        __mergePulseState(globalObj.__PULSE_LAST_SIGNAL__, s);
    } catch {}
  } catch {}
}

export {
  buildHealingReport,
  validateHealingReport,
  PulseGpuLymphTempo,
  attachHealerToPulseSignal,
  attachHealerToPulsePortGlobal
};

PulseRealm.PulseGPUHealer = PulseGPUHealer;
PulseRealm.PulseGPULymphNodes = PulseGPUHealer;