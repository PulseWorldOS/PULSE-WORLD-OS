// ============================================================================
//  PULSE-WORLD-ROUTER v30++ — IMMORTAL MESH-FIRST + BINARY ONEBAND
//  Routes: mesh • host-mesh • satellite-mesh • direct-fallback (cloud)
//  Symbolic decision fabric, deterministic, organism-aware.
//  Binary oneband fields are descriptive only (no hardware calls).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseExpansionMeta,  getPulseExpansionContext} from "../PULSE-EXPANSION/PULSE-EXPANSION-WORLD.js";
import { PulseCastleMeta } from "../PULSE-EXPANSION/PULSE-EXPANSION-CASTLE.js";
import { PulseServerMeta} from "../PULSE-EXPANSION/PULSE-EXPANSION-SERVER.js";
import { getPulseUserContext, createPulseUser as createPulseWorldCore, pulseUser, PulseUserExMeta as PulseUserMeta} from "../PULSE-EXPANSION/PULSE-EXPANSION-USER.js";
import { createPulseWorldRhythmV33 as CreatePulseRhythm } from "./PULSE-WORLD-RHYTHM.js";
import { BinaryMeshMeta2 as BinaryMeshMeta} from "../PULSE-MESH/PULSE-MESH-BINARY.js";
import { PulseMeshMeta} from "../PULSE-MESH/PULSE-MESH.js";
import {PulseBeaconEngine} from "../PULSE-EXPANSION/PULSE-EXPANSION-BEACON-ENGINE.js";
import { PulseBeaconMesh, PulseBeaconMeshMeta} from "../PULSE-EXPANSION/PULSE-EXPANSION-BEACON-MESH.js";
import { getPulseRuntimeContext } from "./PULSE-WORLD-RUNTIME.js";
import { getPulseSchedulerContextV33 as getPulseSchedulerContext } from "./PULSE-WORLD-SCHEDULER.js";
import { getPulseOvermindContext } from "./PULSE-WORLD-ALDWYN.js";
import { createPulseEarnSendSystem_v31, evolveEarnSend as evolveEarn, createEarnSend as createEarn } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";
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
//  getPulseRouterContext‑IMMORTAL‑v1
//  Pure snapshot of router state — no classes, no mutation
// ============================================================================

export const getPulseRouterContext = (() => {

  const create = () => {
    // ------------------------------------------------------------
    // INTERNAL IMMORTAL STATE
    // ------------------------------------------------------------
    const state = {
      route: null,
      params: {},
      query: {},
      hash: "",
      fullURL: "",
      timestamp: PulseRealm.PulseNOW,
      meta: {}
    };

    // ------------------------------------------------------------
    // INTERNAL: PARSE CURRENT LOCATION
    // ------------------------------------------------------------
    function parseLocation() {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);

      state.fullURL = url.href;
      state.hash = url.hash || "";

      // Route = pathname without leading slash
      state.route = url.pathname.replace(/^\//, "") || "index";

      // Query params
      state.query = {};
      url.searchParams.forEach((v, k) => {
        state.query[k] = v;
      });

      // Params (Pulse-style: /route/param1/param2)
      const parts = state.route.split("/");
      state.params = {};
      parts.forEach((p, i) => {
        state.params[`p${i}`] = p;
      });

      state.timestamp = PulseRealm.PulseNOW;
    }

    // ------------------------------------------------------------
    // PUBLIC: SNAPSHOT
    // ------------------------------------------------------------
    function snapshot(extraMeta = {}) {
      parseLocation();

      return {
        route: state.route,
        params: { ...state.params },
        query: { ...state.query },
        hash: state.hash,
        fullURL: state.fullURL,
        timestamp: state.timestamp,
        meta: {
          ...state.meta,
          ...extraMeta
        }
      };
    }

    // ------------------------------------------------------------
    // PUBLIC: UPDATE META (IMMORTAL SAFE)
    // ------------------------------------------------------------
    function setMeta(meta = {}) {
      state.meta = { ...state.meta, ...meta };
      return { ok: true };
    }

    // ------------------------------------------------------------
    // PUBLIC API
    // ------------------------------------------------------------
    return {
      snapshot,
      setMeta
    };
  };

  // IMMORTAL EXPORT
  return { create };

})();


// ============================================================================
//  IMMORTAL HASH DOCTRINE (router-local, aligned with world-binary core)
// ============================================================================

function classicHash(str = "") {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function intelHash(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function dualHash(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intel = intelHash(intelBase);
  const classic = classicHash(`${label}::${classicString || ""}`);
  return { intel, classic };
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ============================================================================
//  META
// ============================================================================

export const PulseRouterMeta = Object.freeze({
  version: "v30-IMMORTAL-MESH-ROUTER-BINARY-ONEBAND",
  band: "symbolic",          // decision fabric
  binaryBand: "binary",      // oneband binary physics descriptor
  organismRole: "router",
  meshFirst: true,
  satelliteFallback: true,
  hostMeshFallback: true,
  organId: "PULSE-WORLD-ROUTER"
});

// ============================================================================
//  ORGANISM CONTEXT
// ============================================================================

const _worldCoreSingleton =
  (typeof createPulseWorldCore === "function"
    ? createPulseWorldCore({ serverMode: false })
    : null) || null;

function buildOrganismContext() {
  const expansionCtx = getPulseExpansionContext() || {};
  const touch = getPulseTouchContext() || {};
  const runtime = getPulseRuntimeContext() || {};
  const scheduler = getPulseSchedulerContext() || {};
  const overmind = getPulseOvermindContext() || {};
  const earn = PulseRealm.PulseEarnContext() || {};
  const userCtx = getPulseUserContext() || {};
  const worldCore = _worldCoreSingleton || null;

  const proxyMeta = {
    proxy: getProxyContext() || null,
    proxyPressure: getProxyPressure() ?? 0,
    proxyBoost: getProxyBoost() ?? 0,
    proxyFallback: getProxyFallback() ?? false,
    proxyMode: getProxyMode() || "normal",
    proxyLineage: getProxyLineage() || null
  };

  return {
    expansion: {
      meta: PulseExpansionMeta,
      context: expansionCtx
    },
    castle: {
      meta: PulseCastleMeta,
    },
    server: {
      meta: PulseServerMeta,
    },
    user: {
      meta: PulseUserMeta,
      instance: pulseUser || null,
      context: userCtx
    },
    worldCore,
    touch,
    runtime,
    scheduler,
    overmind,
    earn,
    meshMeta: PulseMeshMeta,
    binaryMeshMeta: BinaryMeshMeta,
    beaconMeshMeta: PulseBeaconMeshMeta,
    routerMeta: PulseRouterMeta,
    proxyMeta
  };
}

// ============================================================================
//  BINARY ONEBAND FIELDS (DESCRIPTIVE ONLY)
// ============================================================================

function buildBinaryField(cycle, proxyMeta) {
  const densityBase = 10 + cycle * 3;
  const proxyPressure = proxyMeta.proxyPressure ?? 0;
  const density = densityBase + Math.round(proxyPressure * 4);
  const surface = density + 16;

  const intelPayload = {
    cycle,
    proxyPressure,
    density,
    surface,
    band: "binary",
    organId: "PULSE-WORLD-ROUTER"
  };

  const classicString =
    `ROUTER_BEXP30::CYCLE:${cycle}` +
    `::SURF:${surface}` +
    `::PP:${proxyPressure}`;

  const sig = dualHash("ROUTER_BINARY_FIELD_v30", intelPayload, classicString);

  return {
    binaryPhenotypeSignature: sig.intel,
    binarySurfaceSignature: sig.classic,
    binarySurface: { density, surface, patternLen: 30 },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1)),
    band: "binary"
  };
}

function buildWaveField(cycle, band, proxyMeta) {
  const baseAmp = band === "binary" ? 9 : 5;
  const proxyBoost = proxyMeta.proxyBoost ?? 0;
  const amplitude = (cycle + 1) * baseAmp + Math.round(proxyBoost * 8);

  const intelPayload = {
    cycle,
    band,
    proxyBoost,
    amplitude,
    wavelength: amplitude + 7,
    phase: amplitude % 48,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  const classicString =
    `ROUTER_WAVE30::CYCLE:${cycle}` +
    `::BAND:${band}` +
    `::AMP:${amplitude}`;

  const sig = dualHash("ROUTER_WAVE_FIELD_v30", intelPayload, classicString);

  return {
    amplitude,
    wavelength: amplitude + 7,
    phase: amplitude % 48,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    signatures: {
      intel: sig.intel,
      classic: sig.classic
    }
  };
}

function buildBandSignature(band, proxyMeta) {
  const mode = proxyMeta.proxyMode || "normal";
  const intelPayload = { band, mode };
  const classicString = `ROUTER_EXP_BAND30::${band}::${mode}`;
  const sig = dualHash("ROUTER_BAND_v30", intelPayload, classicString);
  return sig;
}

// ============================================================================
//  BEACON ENGINE
// ============================================================================

let _beaconEngineInstance = null;
function getLocalBeaconEngine() {
  if (_beaconEngineInstance) return _beaconEngineInstance;
  try {
    _beaconEngineInstance =
      typeof PulseBeaconEngine === "function"
        ? new PulseBeaconEngine()
        : PulseBeaconEngine;
  } catch {
    _beaconEngineInstance = null;
  }
  return _beaconEngineInstance;
}

// ============================================================================
//  ROUTER FACTORY v30++
// ============================================================================

export function createPulseRouter({
  routerID = "PulseWorld-Immortal",
  regionID = "W0.P0.R0.S0.SH0",
  trace = true,
  globalHints = {
    continuity: true,
    mesh: "dual-band",
    gpu: "warm",
    presence: "active",
    advantage: "enabled"
  }
} = {}) {
  const Identity = Object.freeze({
    routerID: "PulseWorld-Immortal",
    regionID: "W0.P0.R0.S0.SH0",
    createdBy: "PulseWorldCore",
    version: "v30-IMMORTAL-MESH-ROUTER-BINARY-ONEBAND"
  });

  function log(...args) {
    console.groupCollapsed(
      "%c🛰️ PULSE MULTIVERSAL ROUTER v32.0 — [PulseRouter v31++]",
      "color:#7DF9FF;font-weight:bold;"
    );

    console.log("%cWorld Router:", "color:#00FF9C;font-weight:bold;");
    console.log({ ...args });

    console.groupEnd();
  }

  log("PulseRouter v30++ created:", { routerID, regionID });

  let cycle = 0;
  let lastBinaryField = null;
  let lastWaveField = null;
  let lastBandSignature = null;

  // Inputs
  let meshSnapshotSymbolic = null;
  let meshSnapshotBinary = null;
  let castleSnapshot = null;
  let expansionSnapshot = null;
  let beaconSnapshot = null;
  let userSnapshot = null;
  let worldCoreSnapshot = null;
  let brainSnapshot = null;

  // Global hints
  let lastGlobalHints = globalHints || null;

  // --------------------------------------------------------------------------
  // Attachments
  // --------------------------------------------------------------------------

  function attachMeshSymbolic(snapshot) {
    meshSnapshotSymbolic = snapshot || null;
    return { ok: true };
  }

  function attachMeshBinary(snapshot) {
    meshSnapshotBinary = snapshot || null;
    return { ok: true };
  }

  function attachMesh(snapshot) {
    return attachMeshSymbolic(snapshot);
  }

  function attachCastle(snapshot) {
    castleSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachExpansion(snapshot) {
    expansionSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachBeacon(snapshot) {
    beaconSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachUser(snapshot) {
    userSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachWorldCore(snapshot) {
    worldCoreSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachBrain(snapshot) {
    brainSnapshot = snapshot || null;
    return { ok: true };
  }

  // --------------------------------------------------------------------------
  // Hints
  // --------------------------------------------------------------------------

  function setGlobalHints(hints) {
    lastGlobalHints = hints || null;
    return { ok: true, hints: lastGlobalHints };
  }

  function getGlobalHints() {
    return lastGlobalHints;
  }

  // --------------------------------------------------------------------------
  // Presence / Advantage fields (hooks into your existing signal builders)
  // --------------------------------------------------------------------------

  function buildPresenceField() {
    const gh = lastGlobalHints || {};

    const meshPresence =
      meshSnapshotSymbolic.presenceField.meshPresence ||
      meshSnapshotSymbolic.densityHealth.A_metrics.meshStrength ||
      meshSnapshotBinary.presenceField.meshPresence ||
      "unknown";

    const userPresence =
      userSnapshot.presenceField.userPresence ||
      userSnapshot.presenceField.devicePresence ||
      gh.presenceContext.devicePresence ||
      "unknown";

    const routerPresence =
      gh.presenceContext.routerPresence || "unknown";

    return Object.freeze({
      meshPresence,
      userPresence,
      routerPresence
    });
  }

  // You already have a notion of advantageField in your routing logic.
  // Keep this as a thin wrapper so the router stays deterministic.
  function buildAdvantageField() {
    // Placeholder: wire to your real advantage computation.
    // Example shape:
    return Object.freeze({
      meshAdvantage: meshSnapshotSymbolic.advantageField || null,
      userAdvantage: userSnapshot.advantageField || null
    });
  }

  // --------------------------------------------------------------------------
  // Policy + decision fabric (you already have decideRoute / Policy logic)
  // --------------------------------------------------------------------------

  const Policy = Object.freeze({
    A_baseline: {
      meshFirst: true,
      preferLocalMesh: true,
      allowCloudFallback: true
    }
    // Extend with your existing policy fields.
  });

  // Hooks you already have in your codebase:
  function getMeshSignals() {
    // Implement / reuse your existing mesh signal extraction.
    return meshSnapshotSymbolic.meshSignals || {
      meshStrength: "unknown",
      meshPressureIndex: 0
    };
  }

  function getCastleSignals() {
    return castleSnapshot.castleSignals || {
      loadLevel: "unknown"
    };
  }

  function getExpansionSignals() {
    return expansionSnapshot.expansionSignals || {
      routeField: {
        weakSegments: [],
        prioritySegments: [],
        routeStable: true
      }
    };
  }

  function getUserSignals() {
    return userSnapshot.userSignals || {
      stressIndex: 0
    };
  }

  function decideRoute(request) {
    // Mesh-first, binary-aware, but still symbolic decision.
    cycle += 1;

    const organismContext = buildOrganismContext();
    const proxyMeta = organismContext.proxyMeta || {};

    lastBinaryField = buildBinaryField(cycle, proxyMeta);
    lastWaveField = buildWaveField(cycle, PulseRouterMeta.binaryBand, proxyMeta);
    lastBandSignature = buildBandSignature(PulseRouterMeta.binaryBand, proxyMeta);

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const mesh = getMeshSignals();
    const castle = getCastleSignals();
    const { routeField } = getExpansionSignals();
    const userSignals = getUserSignals();

    const meshStrength =
      mesh.meshStrength ||
      presenceField.meshPresence ||
      "unknown";

    const userStress = safeNumber(userSignals.stressIndex, 0);

    function routeTo(target, routeMode, reason, extra = {}) {
      const intelPayload = {
        target,
        routeMode,
        reason,
        meshStrength,
        userStress,
        presenceField,
        advantageField
      };
      const classicString =
        `ROUTER_DECIDE_v30::T:${target}` +
        `::M:${routeMode}` +
        `::R:${reason}` +
        `::MS:${meshStrength}` +
        `::US:${userStress}`;

      const sig = dualHash("ROUTER_DECISION_v30", intelPayload, classicString);

      return Object.freeze({
        target,
        routeMode,
        reason,
        presenceField,
        advantageField,
        mesh,
        castle,
        routeField,
        userSignals,
        proxyMeta,
        signatures: {
          intel: sig.intel,
          classic: sig.classic
        }
      });
    }

    // Mesh strong → mesh-first
    if (meshStrength === "strong" || meshStrength === "medium") {
      return routeTo("mesh", "mesh", "meshPreferred");
    }

    // User stress high → mesh-first if allowed
    if (
      userStress >= 80 &&
      meshStrength !== "weak" &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo("mesh", "mesh", "userStressHighPreferMesh");
    }

    // Default: cloud with satellite-mesh flavor if mesh usable, else direct-fallback
    if (meshStrength !== "weak") {
      return routeTo("cloud", "satellite-mesh", "fallbackSatelliteMesh");
    }

    return routeTo("cloud", "direct-fallback", "fallback");
  }

  // --------------------------------------------------------------------------
  // Suggestions (kept from your v30 router, but wired to the hooks above)
// --------------------------------------------------------------------------

  function suggestBetterRoutes() {
    if (!meshSnapshotSymbolic && !meshSnapshotBinary) {
      return { ok: false, reason: "missing-mesh" };
    }
    if (!castleSnapshot || !expansionSnapshot) {
      return { ok: false, reason: "missing-inputs" };
    }

    const mesh = getMeshSignals();
    const castle = getCastleSignals();
    const { routeField } = getExpansionSignals();
    const userSignals = getUserSignals();

    const suggestions = [];

    if (
      Array.isArray(routeField.weakSegments) &&
      routeField.weakSegments.length > 0
    ) {
      suggestions.push({
        type: "reinforce-route-segment",
        segments: routeField.weakSegments,
        reason: "weakSegmentsDetected",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    if (mesh.meshPressureIndex >= 75) {
      suggestions.push({
        type: "alternate-path",
        reason: "meshPressureCritical",
        idea: "reroute via mid-region or lower-pressure segments",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    if (castle.loadLevel === "high" || castle.loadLevel === "critical") {
      suggestions.push({
        type: "castle-relief",
        reason: "castleLoadHigh",
        idea: "shift some traffic to mesh or neighboring castles",
        castleLoadLevel: castle.loadLevel
      });
    }

    if (userSignals.stressIndex >= 80) {
      suggestions.push({
        type: "user-stress-relief",
        reason: "userStressHigh",
        idea: "prefer distributed mesh routes and reduce local castle contention",
        userStressIndex: userSignals.stressIndex
      });
    }

    return Object.freeze({
      ok: true,
      suggestions: Object.freeze(suggestions)
    });
  }

  function suggestCorridorProtection() {
    if (!expansionSnapshot) return { ok: false, reason: "no-expansion" };

    const { routeField } = getExpansionSignals();
    const suggestions = [];

    if (!routeField.routeStable) {
      suggestions.push({
        type: "protect-corridor",
        reason: "routeUnstable",
        segments: routeField.prioritySegments || []
      });
    }

    return Object.freeze({
      ok: true,
      suggestions: Object.freeze(suggestions)
    });
  }

  function buildNodeAdminIntent() {
    const routeSuggestions = suggestBetterRoutes();
    const corridorSuggestions = suggestCorridorProtection();

    return Object.freeze({
      intent: "optimize-route",
      payload: Object.freeze({
        routeSuggestions: routeSuggestions.ok
          ? routeSuggestions.suggestions
          : [],
        corridorSuggestions: corridorSuggestions.ok
          ? corridorSuggestions.suggestions
          : []
      })
    });
  }

  // --------------------------------------------------------------------------
  // Telemetry (runtime-only, not part of decision determinism)
// --------------------------------------------------------------------------

  const Telemetry = {
    metrics: {
      routedRequests: 0,
      localRouted: 0,
      meshRouted: 0,
      cloudRouted: 0,
      avgRouteLatencyMs: null
    }
  };

  function recordRoute(decision, latencyMs = null) {
    Telemetry.metrics.routedRequests += 1;

    if (decision.target === "castle") Telemetry.metrics.localRouted += 1;
    else if (decision.target === "mesh") Telemetry.metrics.meshRouted += 1;
    else if (decision.target === "cloud") Telemetry.metrics.cloudRouted += 1;

    if (latencyMs != null) {
      const prev = Telemetry.metrics.avgRouteLatencyMs;
      if (prev == null) {
        Telemetry.metrics.avgRouteLatencyMs = latencyMs;
      } else {
        Telemetry.metrics.avgRouteLatencyMs =
          Math.round((prev * 0.8 + latencyMs * 0.2) * 100) / 100;
      }
    }
  }

  function getSnapshot() {
    const organismContext = buildOrganismContext();

    return Object.freeze({
      organId: "PULSE-WORLD-ROUTER",
      identity: Identity,
      policy: Policy,
      meshSnapshotSymbolic,
      meshSnapshotBinary,
      castleSnapshot,
      expansionSnapshot,
      beaconSnapshot: beaconSnapshot || getLocalBeaconEngine().getSnapshot() || null,
      userSnapshot,
      worldCoreSnapshot,
      brainSnapshot,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField(),
      bandSignature: lastBandSignature,
      binaryField: lastBinaryField,
      waveField: lastWaveField,
      telemetry: Telemetry,
      suggestions: Object.freeze({
        betterRoutes: suggestBetterRoutes(),
        corridorProtection: suggestCorridorProtection()
      }),
      organismContext
    });
  }

  // --------------------------------------------------------------------------
  // Routing execution (runtime, not part of symbolic decision fabric)
// --------------------------------------------------------------------------

  async function routeInternet(request, executors = {}) {
    const start = PulseRealm.PulseNOW;
    const decision = decideRoute(request);
    const primary = decision.target;

    const order = buildFallbackOrder(primary);
    log("routeInternet decision:", {
      primary,
      routeMode: decision.routeMode,
      order,
      reason: decision.reason
    });

    let lastError = null;

    for (const target of order) {
      const exec = executors[target];
      if (typeof exec !== "function") continue;

      try {
        const result = await exec(request, decision);
        if (result && result.ok) {
          recordRoute(decision, PulseRealm.PulseNOW - start);
          return {
            ok: true,
            target,
            decision,
            result
          };
        }
        lastError = result || { ok: false, reason: "unknown_failure" };
      } catch (err) {
        lastError = { ok: false, reason: "executor_error", error: String(err), target };
      }
    }

    recordRoute(decision, PulseRealm.PulseNOW - start);

    return {
      ok: false,
      target: null,
      decision,
      error: lastError || { ok: false, reason: "no_executor_succeeded" }
    };
  }

  function buildFallbackOrder(primary) {
    switch (primary) {
      case "castle":
        return ["castle", "mesh", "cloud"];
      case "mesh":
        return ["mesh", "castle", "cloud"];
      case "cloud":
        return ["cloud", "mesh", "castle"];
      default:
        return ["castle", "mesh", "cloud"];
    }
  }

  
const PulseRouterMeta = Object.freeze({
  version: "v30-IMMORTAL-MESH-ROUTER-BINARY-ONEBAND",
  band: "symbolic",          // decision fabric
  binaryBand: "binary",      // oneband binary physics descriptor
  organismRole: "router",
  meshFirst: true,
  satelliteFallback: true,
  hostMeshFallback: true,
  organId: "PULSE-WORLD-ROUTER"
});


  // --------------------------------------------------------------------------
  // Public surface
  // --------------------------------------------------------------------------

  return Object.freeze({
    meta: PulseRouterMeta,
    identity: Identity,

    // attachments
    attachMesh,
    attachMeshSymbolic,
    attachMeshBinary,
    attachCastle,
    attachExpansion,
    attachBeacon,
    attachUser,
    attachWorldCore,
    attachBrain,

    // hints
    setGlobalHints,
    getGlobalHints,
    buildPresenceField,
    buildAdvantageField,

    // routing
    decideRoute,
    recordRoute,
    routeInternet,

    // suggestions
    suggestBetterRoutes,
    suggestCorridorProtection,
    buildNodeAdminIntent,

    // introspection
    getSnapshot
  });
}

export default createPulseRouter;
// ============================================================================
//  PulseRouter — IMMORTAL ORGAN (v31 IMMORTAL+++)
// ============================================================================

export const PulseRouter = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    identity: null,
    trace: false,
    lastGlobalHints: null,

    cycle: 0,
    lastBinaryField: null,
    lastWaveField: null,
    lastBandSignature: null,

    meshSnapshotSymbolic: null,
    meshSnapshotBinary: null,
    castleSnapshot: null,
    expansionSnapshot: null,
    beaconSnapshot: null,
    userSnapshot: null,
    worldCoreSnapshot: null,
    brainSnapshot: null,

    telemetry: {
      metrics: {
        routedRequests: 0,
        localRouted: 0,
        meshRouted: 0,
        cloudRouted: 0,
        avgRouteLatencyMs: null
      }
    }
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({
    routerID = "PulseWorld-Immortal",
    regionID = "W0.P0.R0.S0.SH0",
    trace = false,
    globalHints = null
  } = {}) => {

    lane.identity = Object.freeze({
      routerID: "PulseWorld-Immortal",
      regionID: "W0.P0.R0.S0.SH0",
      createdBy: "PulseWorldCore",
      version: "v30-IMMORTAL-MESH-ROUTER-BINARY-ONEBAND"
    });

    lane.trace = trace;
    lane.lastGlobalHints = globalHints || null;

    log("PulseRouter IMMORTAL v31++ created", { routerID, regionID });
  };

  // ------------------------------------------------------------
  // LOGGING
  // ------------------------------------------------------------
  const log = (...args) => {
    console.groupCollapsed(
        "%c🛰️ PULSE MULTIVERSAL ROUTER v32.0 — [PulseRouter v31++]",
        "color:#7DF9FF;font-weight:bold;"
      );

      console.log("%cWorld Router:", "color:#00FF9C;font-weight:bold;");
      console.log({ ...args });

      console.groupEnd();
  };

  // ------------------------------------------------------------
  // ATTACHMENTS
  // ------------------------------------------------------------
  const attachMeshSymbolic = (snapshot) => { lane.meshSnapshotSymbolic = snapshot || null; return { ok: true }; };
  const attachMeshBinary   = (snapshot) => { lane.meshSnapshotBinary   = snapshot || null; return { ok: true }; };
  const attachMesh         = (snapshot) => attachMeshSymbolic(snapshot);
  const attachCastle       = (snapshot) => { lane.castleSnapshot       = snapshot || null; return { ok: true }; };
  const attachExpansion    = (snapshot) => { lane.expansionSnapshot    = snapshot || null; return { ok: true }; };
  const attachBeacon       = (snapshot) => { lane.beaconSnapshot       = snapshot || null; return { ok: true }; };
  const attachUser         = (snapshot) => { lane.userSnapshot         = snapshot || null; return { ok: true }; };
  const attachWorldCore    = (snapshot) => { lane.worldCoreSnapshot    = snapshot || null; return { ok: true }; };
  const attachBrain        = (snapshot) => { lane.brainSnapshot        = snapshot || null; return { ok: true }; };

  // ------------------------------------------------------------
  // GLOBAL HINTS
  // ------------------------------------------------------------
  const setGlobalHints = (hints) => {
    lane.lastGlobalHints = hints || null;
    return { ok: true, hints: lane.lastGlobalHints };
  };

  const getGlobalHints = () => lane.lastGlobalHints;

  // ------------------------------------------------------------
  // PRESENCE FIELD
  // ------------------------------------------------------------
  const buildPresenceField = () => {
    const gh = lane.lastGlobalHints || {};

    const meshPresence =
      lane.meshSnapshotSymbolic.presenceField.meshPresence ||
      lane.meshSnapshotSymbolic.densityHealth.A_metrics.meshStrength ||
      lane.meshSnapshotBinary.presenceField.meshPresence ||
      "unknown";

    const userPresence =
      lane.userSnapshot.presenceField.userPresence ||
      lane.userSnapshot.presenceField.devicePresence ||
      gh.presenceContext.devicePresence ||
      "unknown";

    const routerPresence =
      gh.presenceContext.routerPresence || "unknown";

    return Object.freeze({ meshPresence, userPresence, routerPresence });
  };

  // ------------------------------------------------------------
  // ADVANTAGE FIELD
  // ------------------------------------------------------------
  const buildAdvantageField = () =>
    Object.freeze({
      meshAdvantage: lane.meshSnapshotSymbolic.advantageField || null,
      userAdvantage: lane.userSnapshot.advantageField || null
    });

  // ------------------------------------------------------------
  // SIGNAL EXTRACTION
  // ------------------------------------------------------------
  const getMeshSignals = () =>
    lane.meshSnapshotSymbolic.meshSignals || {
      meshStrength: "unknown",
      meshPressureIndex: 0
    };

  const getCastleSignals = () =>
    lane.castleSnapshot.castleSignals || {
      loadLevel: "unknown"
    };

  const getExpansionSignals = () =>
    lane.expansionSnapshot.expansionSignals || {
      routeField: {
        weakSegments: [],
        prioritySegments: [],
        routeStable: true
      }
    };

  const getUserSignals = () =>
    lane.userSnapshot.userSignals || {
      stressIndex: 0
    };

  // ------------------------------------------------------------
  // ROUTING DECISION
  // ------------------------------------------------------------
  const decideRoute = (request) => {
    lane.cycle += 1;

    const organismContext = buildOrganismContext();
    const proxyMeta = organismContext.proxyMeta || {};

    lane.lastBinaryField = buildBinaryField(lane.cycle, proxyMeta);
    lane.lastWaveField = buildWaveField(lane.cycle, PulseRouterMeta.binaryBand, proxyMeta);
    lane.lastBandSignature = buildBandSignature(PulseRouterMeta.binaryBand, proxyMeta);

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const mesh = getMeshSignals();
    const castle = getCastleSignals();
    const { routeField } = getExpansionSignals();
    const userSignals = getUserSignals();

    const meshStrength =
      mesh.meshStrength ||
      presenceField.meshPresence ||
      "unknown";

    const userStress = safeNumber(userSignals.stressIndex, 0);

    const routeTo = (target, routeMode, reason) => {
      const intelPayload = {
        target,
        routeMode,
        reason,
        meshStrength,
        userStress,
        presenceField,
        advantageField
      };

      const classicString =
        `ROUTER_DECIDE_v30::T:${target}` +
        `::M:${routeMode}` +
        `::R:${reason}` +
        `::MS:${meshStrength}` +
        `::US:${userStress}`;

      const sig = dualHash("ROUTER_DECISION_v30", intelPayload, classicString);

      return Object.freeze({
        target,
        routeMode,
        reason,
        presenceField,
        advantageField,
        mesh,
        castle,
        routeField,
        userSignals,
        proxyMeta,
        signatures: {
          intel: sig.intel,
          classic: sig.classic
        }
      });
    };

    // Mesh strong → mesh-first
    if (meshStrength === "strong" || meshStrength === "medium") {
      return routeTo("mesh", "mesh", "meshPreferred");
    }

    // User stress high → mesh-first if allowed
    if (userStress >= 80 && meshStrength !== "weak") {
      return routeTo("mesh", "mesh", "userStressHighPreferMesh");
    }

    // Default: cloud with satellite-mesh flavor if mesh usable
    if (meshStrength !== "weak") {
      return routeTo("cloud", "satellite-mesh", "fallbackSatelliteMesh");
    }

    return routeTo("cloud", "direct-fallback", "fallback");
  };

  // ------------------------------------------------------------
  // ROUTING EXECUTION
  // ------------------------------------------------------------
  const buildFallbackOrder = (primary) => {
    switch (primary) {
      case "castle": return ["castle", "mesh", "cloud"];
      case "mesh":   return ["mesh", "castle", "cloud"];
      case "cloud":  return ["cloud", "mesh", "castle"];
      default:       return ["castle", "mesh", "cloud"];
    }
  };

  const routeInternet = async (request, executors = {}) => {
    const start = PulseRealm.PulseNOW;
    const decision = decideRoute(request);
    const primary = decision.target;

    const order = buildFallbackOrder(primary);
    log("routeInternet decision:", { primary, routeMode: decision.routeMode, order, reason: decision.reason });

    let lastError = null;

    for (const target of order) {
      const exec = executors[target];
      if (typeof exec !== "function") continue;

      try {
        const result = await exec(request, decision);
        if (result && result.ok) {
          recordRoute(decision, PulseRealm.PulseNOW - start);
          return { ok: true, target, decision, result };
        }
        lastError = result || { ok: false, reason: "unknown_failure" };
      } catch (err) {
        lastError = { ok: false, reason: "executor_error", error: String(err), target };
      }
    }

    recordRoute(decision, PulseRealm.PulseNOW - start);

    return {
      ok: false,
      target: null,
      decision,
      error: lastError || { ok: false, reason: "no_executor_succeeded" }
    };
  };

  // ------------------------------------------------------------
  // TELEMETRY
  // ------------------------------------------------------------
  const recordRoute = (decision, latencyMs = null) => {
    const m = lane.telemetry.metrics;
    m.routedRequests += 1;

    if (decision.target === "castle") m.localRouted += 1;
    else if (decision.target === "mesh") m.meshRouted += 1;
    else if (decision.target === "cloud") m.cloudRouted += 1;

    if (latencyMs != null) {
      const prev = m.avgRouteLatencyMs;
      m.avgRouteLatencyMs =
        prev == null ? latencyMs : Math.round((prev * 0.8 + latencyMs * 0.2) * 100) / 100;
    }
  };

  // ------------------------------------------------------------
  // SUGGESTIONS
  // ------------------------------------------------------------
  const suggestBetterRoutes = () => {
    if (!lane.meshSnapshotSymbolic && !lane.meshSnapshotBinary) {
      return { ok: false, reason: "missing-mesh" };
    }
    if (!lane.castleSnapshot || !lane.expansionSnapshot) {
      return { ok: false, reason: "missing-inputs" };
    }

    const mesh = getMeshSignals();
    const castle = getCastleSignals();
    const { routeField } = getExpansionSignals();
    const userSignals = getUserSignals();

    const suggestions = [];

    if (Array.isArray(routeField.weakSegments) && routeField.weakSegments.length > 0) {
      suggestions.push({
        type: "reinforce-route-segment",
        segments: routeField.weakSegments,
        reason: "weakSegmentsDetected",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    if (mesh.meshPressureIndex >= 75) {
      suggestions.push({
        type: "alternate-path",
        reason: "meshPressureCritical",
        idea: "reroute via mid-region or lower-pressure segments",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    if (castle.loadLevel === "high" || castle.loadLevel === "critical") {
      suggestions.push({
        type: "castle-relief",
        reason: "castleLoadHigh",
        idea: "shift some traffic to mesh or neighboring castles",
        castleLoadLevel: castle.loadLevel
      });
    }

    if (userSignals.stressIndex >= 80) {
      suggestions.push({
        type: "user-stress-relief",
        reason: "userStressHigh",
        idea: "prefer distributed mesh routes and reduce local castle contention",
        userStressIndex: userSignals.stressIndex
      });
    }

    return Object.freeze({ ok: true, suggestions: Object.freeze(suggestions) });
  };

  const suggestCorridorProtection = () => {
    if (!lane.expansionSnapshot) return { ok: false, reason: "no-expansion" };

    const { routeField } = getExpansionSignals();
    const suggestions = [];

    if (!routeField.routeStable) {
      suggestions.push({
        type: "protect-corridor",
        reason: "routeUnstable",
        segments: routeField.prioritySegments || []
      });
    }

    return Object.freeze({ ok: true, suggestions: Object.freeze(suggestions) });
  };

  const buildNodeAdminIntent = () =>
    Object.freeze({
      intent: "optimize-route",
      payload: Object.freeze({
        routeSuggestions:
          suggestBetterRoutes().ok ? suggestBetterRoutes().suggestions : [],
        corridorSuggestions:
          suggestCorridorProtection().ok ? suggestCorridorProtection().suggestions : []
      })
    });

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const getSnapshot = () => {
    const organismContext = buildOrganismContext();

    const Policy = Object.freeze({
      A_baseline: {
        meshFirst: true,
        preferLocalMesh: true,
        allowCloudFallback: true
      }
    });

    return Object.freeze({
      organId: "PULSE-WORLD-ROUTER",
      identity: lane.identity,
      policy: Policy,
      meshSnapshotSymbolic: lane.meshSnapshotSymbolic,
      meshSnapshotBinary: lane.meshSnapshotBinary,
      castleSnapshot: lane.castleSnapshot,
      expansionSnapshot: lane.expansionSnapshot,
      beaconSnapshot: lane.beaconSnapshot,
      userSnapshot: lane.userSnapshot,
      worldCoreSnapshot: lane.worldCoreSnapshot,
      brainSnapshot: lane.brainSnapshot,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField(),
      bandSignature: lane.lastBandSignature,
      binaryField: lane.lastBinaryField,
      waveField: lane.lastWaveField,
      telemetry: lane.telemetry,
      suggestions: Object.freeze({
        betterRoutes: suggestBetterRoutes(),
        corridorProtection: suggestCorridorProtection()
      }),
      organismContext
    });
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,

    attachMeshSymbolic,
    attachMeshBinary,
    attachMesh,
    attachCastle,
    attachExpansion,
    attachBeacon,
    attachUser,
    attachWorldCore,
    attachBrain,

    setGlobalHints,
    getGlobalHints,

    buildPresenceField,
    buildAdvantageField,

    decideRoute,
    routeInternet,
    buildFallbackOrder,

    suggestBetterRoutes,
    suggestCorridorProtection,
    buildNodeAdminIntent,

    getSnapshot
  };

})();

PulseRealm.InternetRouter = {
  PulseRouterMeta,
  PulseRouter,
  createPulseRouter,
  getPulseRouterContext,
  buildOrganismContext
}
PulseRealm.PulseInternetRouter = PulseRouter;
PulseRealm.PulseInternetRouterBuild = createPulseRouter({ trace: false });
PulseRealm.PulseInternetRouterMeta = PulseRouterMeta;
PulseRealm.PulseInternetContext = getPulseRouterContext;