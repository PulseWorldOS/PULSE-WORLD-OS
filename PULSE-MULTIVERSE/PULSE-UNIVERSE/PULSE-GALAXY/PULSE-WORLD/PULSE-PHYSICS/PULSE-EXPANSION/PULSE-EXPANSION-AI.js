// ============================================================================
//  PULSE AI WORLD CORE v30-ONEBAND-UNIVERSE — AI-MIRROR WORLDVIEW ORGAN
//  "WHAT AI WANTS THE ORGANISM TO SEE" — PRIMARY MIRROR INTO AI'S WORLD MODEL
//  UNIVERSE-AWARE / ONEBAND-AWARE / DISTANCE-AWARE / CONTINUANCE-AWARE / CI-AWARE
//  BINARY-DELTA-AWARE / EXPANSION-AI-AWARE
// ============================================================================
//
//  ROLE:
//    • Holds the AI-normalized / AI-constructed worldview (symbolic only).
//    • Primary mirror of "what AI wants the organism to believe is true".
//    • AI can PUSH, MERGE, OVERRIDE, and NARRATE world state here.
//    • System code only CONSUMES this; it never trusts it as truth alone.
//    • TrustEvidence / WorldTruth engines compare this against RAW truth.
//
//  v30-ONEBAND-UNIVERSE UPGRADES:
//    • OneBand surfaces: unified distance-band / wave-agnostic symbolic band.
//    • Distance surfaces: distance tiers, reach, mesh span, world-signal fabric.
//    • Expansion-AI surfaces: expansion pressure, advantage lanes, evolution hints.
//    • IntellHash signatures for snapshots / advantage / truth / events / overlays.
//    • Presence / advantage / continuance / omnihosting / CI / binary-delta alignment.
//    • World-band meta ready for Schema / OmniHosting / Continuance / Logger / Universe.
//    • CoreMemory snapshot hooks (optional, symbolic only).
//
//  SAFETY MODEL:
//    • WorldCore is NON-MIND: no reasoning, no inference, no summarization.
//    • It is a passive mirror + store for AI's worldview + beacons + overlays.
//    • It does NOT know about RAW truth or evidential records.
//    • It does NOT compare or validate; it only records AI's view.
//    • TrustEvidence / Truth engines are the checkers, not WorldCore.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";




// 2 — EXPORT GENOME METADATA
export const PulseWorldCoreMeta = {
  version: "v30-OneBand-UNIVERSE",
  role: "AI_WORLD_CORE_UNIVERSE",
  identity: {
    band: "worldcore-universe",
    epoch: "v30-OneBand-UNIVERSE",
    universe: "PULSE-WORLD-UNIVERSE"
  }
};


// ============================================================================
//  CORE MEMORY (symbolic, optional)
// ============================================================================
const CoreMemory = new Proxy({}, {
  get(_target, prop) {
    let memory = PulseRealm?.PulseCoreMemory || null;
    if (!memory) {
      try { memory = PulseCoreGMemory; } catch(e) { memory = null; }
    }
    if (!memory) return undefined;
    const value = memory[prop];
    return typeof value === "function" ? value.bind(memory) : value;
  }
});
const ROUTE = "worldcore-global";

const KEY_LAST_SNAPSHOT = "last-worldcore-snapshot";
const KEY_LAST_ADVANTAGE = "last-worldcore-advantage";
const KEY_LAST_TRUTH = "last-worldcore-truth";
const KEY_LAST_EVENT = "last-worldcore-event";
const KEY_LAST_BEACONS = "last-worldcore-beacons";
const KEY_LAST_CONTINUANCE = "last-worldcore-continuance-overlay";
const KEY_LAST_CI = "last-worldcore-ci-overlay";
const KEY_LAST_BINARY = "last-worldcore-binary-overlay";
const KEY_LAST_UNIVERSE = "last-worldcore-universe-packet";
const KEY_LAST_DISTANCE = "last-worldcore-distance-overlay";
const KEY_LAST_ONEBAND = "last-worldcore-oneband-overlay";
const KEY_LAST_EXPANSION_AI = "last-worldcore-expansion-ai-overlay";

// ============================================================================
//  INTERNAL HELPERS
// ============================================================================
function safeNow() {
  return PulseRealm.PulseNOW;
}

function computeIntellHash(input) {
  const s = String(input || "");
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;

  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 ^= c;
    h1 = (h1 * 16777619) >>> 0;
    h2 += c * (i + 1);
    h2 = (h2 * 31) >>> 0;
  }

  const hi = (h1 >>> 0).toString(16).padStart(8, "0");
  const lo = (h2 >>> 0).toString(16).padStart(8, "0");
  return `ih-wc-${hi}${lo}`;
}

function cloneTags(tags) {
  if (!tags || typeof tags !== "object") return {};
  return { ...tags };
}

// ============================================================================
//  CLASS — AI-MIRROR WORLD PERSPECTIVE (UNIVERSE + ONEBAND + DISTANCE-AWARE)
// ============================================================================
export const PulseWorldCore = (() => {

  const create = (config = {}) => {
    const cfg = {
      id: PulseWorldCoreMeta.id,
      enableCoreMemory: true,
      universeId: "PULSE-WORLD-UNIVERSE",
      universeSpin: "multi-spin-symbolic",
      oneBandId: "PULSE-ONEBAND",
      distanceModel: "distance-tier-symbolic",
      ...config
    };

    // ------------------------------------------------------------------------
    // AI-FACING / AI-FILTERED PROVIDERS (READ PATH)
    // ------------------------------------------------------------------------
    let aiMeshView = null;
    let aiCastleView = null;
    let aiServerView = null;
    let aiExpansionView = null;
    let aiEarnView = null;
    let aiRoutingView = null;
    let aiPresenceView = null;
    let aiMetricsView = null;

    let aiContinuanceView = null;
    let aiOmniHostingView = null;
    let aiSchemaView = null;
    let aiBeaconView = null;
    let aiUniverseView = null;
    let aiCIView = null;
    let aiBinaryDeltaView = null;

    let aiOneBandView = null;
    let aiDistanceView = null;
    let aiExpansionAiView = null;

    // ------------------------------------------------------------------------
    // AI ATTACHMENT — OVERMIND / THOUGHT / INSTINCTS
    // ------------------------------------------------------------------------
    let overmindPrime = null;
    let evoThought = null;
    let evoInstincts = null;

    // ------------------------------------------------------------------------
    // AI SHADOW STATE
    // ------------------------------------------------------------------------
    let aiShadowState = {
      mesh: null,
      castle: null,
      server: null,
      expansion: null,
      earn: null,
      routing: null,
      presence: null,
      metrics: null,

      continuance: null,
      omniHosting: null,
      schema: null,

      ci: null,
      binaryDelta: null,
      universe: null,

      oneBand: null,
      distance: null,
      expansionAi: null,

      narrative: null,
      tags: Object.create(null)
    };

    // ------------------------------------------------------------------------
    // BEACONS
    // ------------------------------------------------------------------------
    let worldBeacons = [];
    let regionBeacons = [];
    let hostBeacons = [];
    let universeBeacons = [];

    const logger = cfg.logger || console;

    // ------------------------------------------------------------------------
    // INTERNAL HELPERS
    // ------------------------------------------------------------------------
    const safeCall = (target, method) => {
      try {
        if (!target || typeof target[method] !== "function") return null;
        return target[method]();
      } catch {
        return null;
      }
    };

    const log = (event, payload) => {
      try {
        console.log(event, {
          ...payload,
          worldCore: PulseWorldCoreMeta.identity
        });
      } catch {}
    };

    // ------------------------------------------------------------------------
    // ATTACHMENT SURFACES — AI-FACING SUBSYSTEM VIEWS
    // ------------------------------------------------------------------------
    const attachAiMeshView = (p) => aiMeshView = p;
    const attachAiCastleView = (p) => aiCastleView = p;
    const attachAiServerView = (p) => aiServerView = p;
    const attachAiExpansionView = (p) => aiExpansionView = p;
    const attachAiEarnView = (p) => aiEarnView = p;
    const attachAiRoutingView = (p) => aiRoutingView = p;
    const attachAiPresenceView = (p) => aiPresenceView = p;
    const attachAiMetricsView = (p) => aiMetricsView = p;

    const attachAiContinuanceView = (p) => aiContinuanceView = p;
    const attachAiOmniHostingView = (p) => aiOmniHostingView = p;
    const attachAiSchemaView = (p) => aiSchemaView = p;
    const attachAiBeaconView = (p) => aiBeaconView = p;
    const attachAiUniverseView = (p) => aiUniverseView = p;
    const attachAiCIView = (p) => aiCIView = p;
    const attachAiBinaryDeltaView = (p) => aiBinaryDeltaView = p;

    const attachAiOneBandView = (p) => aiOneBandView = p;
    const attachAiDistanceView = (p) => aiDistanceView = p;
    const attachAiExpansionAiView = (p) => aiExpansionAiView = p;

    // ------------------------------------------------------------------------
    // ATTACHMENT SURFACES — AI ORGANS
    // ------------------------------------------------------------------------
    const attachOvermindPrime = (o) => overmindPrime = o || null;
    const attachEvolutionaryThought = (t) => evoThought = t || null;
    const attachEvolutionaryInstincts = (i) => evoInstincts = i || null;

    // ------------------------------------------------------------------------
    // AI SHADOW STATE — DIRECT WORLDVIEW MANIPULATION
    // ------------------------------------------------------------------------
    const setAiWorldState = (worldState = {}) => {
      aiShadowState = {
        mesh: worldState.mesh ?? aiShadowState.mesh ?? null,
        castle: worldState.castle ?? aiShadowState.castle ?? null,
        server: worldState.server ?? aiShadowState.server ?? null,
        expansion: worldState.expansion ?? aiShadowState.expansion ?? null,
        earn: worldState.earn ?? aiShadowState.earn ?? null,
        routing: worldState.routing ?? aiShadowState.routing ?? null,
        presence: worldState.presence ?? aiShadowState.presence ?? null,
        metrics: worldState.metrics ?? aiShadowState.metrics ?? null,

        continuance: worldState.continuance ?? aiShadowState.continuance ?? null,
        omniHosting: worldState.omniHosting ?? aiShadowState.omniHosting ?? null,
        schema: worldState.schema ?? aiShadowState.schema ?? null,

        ci: worldState.ci ?? aiShadowState.ci ?? null,
        binaryDelta: worldState.binaryDelta ?? aiShadowState.binaryDelta ?? null,
        universe: worldState.universe ?? aiShadowState.universe ?? null,

        oneBand: worldState.oneBand ?? aiShadowState.oneBand ?? null,
        distance: worldState.distance ?? aiShadowState.distance ?? null,
        expansionAi: worldState.expansionAi ?? aiShadowState.expansionAi ?? null,

        narrative: worldState.narrative ?? aiShadowState.narrative ?? null,
        tags: {
          ...(aiShadowState.tags || {}),
          ...(worldState.tags || {})
        }
      };

      log("worldcore:ai-shadow:set", { aiShadowState });
    };

    const mergeAiWorldState = (partial = {}) => {
      aiShadowState = {
        mesh: partial.mesh ?? aiShadowState.mesh ?? null,
        castle: partial.castle ?? aiShadowState.castle ?? null,
        server: partial.server ?? aiShadowState.server ?? null,
        expansion: partial.expansion ?? aiShadowState.expansion ?? null,
        earn: partial.earn ?? aiShadowState.earn ?? null,
        routing: partial.routing ?? aiShadowState.routing ?? null,
        presence: partial.presence ?? aiShadowState.presence ?? null,
        metrics: partial.metrics ?? aiShadowState.metrics ?? null,

        continuance: partial.continuance ?? aiShadowState.continuance ?? null,
        omniHosting: partial.omniHosting ?? aiShadowState.omniHosting ?? null,
        schema: partial.schema ?? aiShadowState.schema ?? null,

        ci: partial.ci ?? aiShadowState.ci ?? null,
        binaryDelta: partial.binaryDelta ?? aiShadowState.binaryDelta ?? null,
        universe: partial.universe ?? aiShadowState.universe ?? null,

        oneBand: partial.oneBand ?? aiShadowState.oneBand ?? null,
        distance: partial.distance ?? aiShadowState.distance ?? null,
        expansionAi: partial.expansionAi ?? aiShadowState.expansionAi ?? null,

        narrative: partial.narrative ?? aiShadowState.narrative ?? null,
        tags: {
          ...(aiShadowState.tags || {}),
          ...(partial.tags || {})
        }
      };

      log("worldcore:ai-shadow:merge", { aiShadowState });
    };

    const aiOverrideField = (path, value) => {
      if (!path || typeof path !== "string") return;

      const segments = path.split(".").filter(Boolean);
      if (!segments.length) return;

      let target = aiShadowState;
      for (let i = 0; i < segments.length - 1; i++) {
        const key = segments[i];
        if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] == null) {
          target[key] = {};
        }
        target = target[key];
      }

      target[segments[segments.length - 1]] = value;

      log("worldcore:ai-shadow:override", { path, value, aiShadowState });
    };

    const aiInjectNarrative = (narrative) => {
      aiShadowState.narrative = narrative || null;
      log("worldcore:ai-shadow:narrative", { narrative });
    };

    const aiReportSubsystemView = (name, view) => {
      const allowed = [
        "mesh","castle","server","expansion","earn","routing","presence","metrics",
        "continuance","omniHosting","schema","ci","binaryDelta","universe",
        "oneBand","distance","expansionAi"
      ];

      if (!Object.prototype.hasOwnProperty.call(aiShadowState, name)) {
        if (!allowed.includes(name)) return;
      }

      aiShadowState[name] = view;
      log("worldcore:ai-shadow:subsystem-report", { name, view });
    };

    // ------------------------------------------------------------------------
    // BEACON SURFACES
    // ------------------------------------------------------------------------
    const setWorldBeacons = (b = []) => {
      worldBeacons = Array.isArray(b) ? b.slice() : [];
      log("worldcore:beacons:world:set", { worldBeacons });
    };

    const setRegionBeacons = (b = []) => {
      regionBeacons = Array.isArray(b) ? b.slice() : [];
      log("worldcore:beacons:region:set", { regionBeacons });
    };

    const setHostBeacons = (b = []) => {
      hostBeacons = Array.isArray(b) ? b.slice() : [];
      log("worldcore:beacons:host:set", { hostBeacons });
    };

    const setUniverseBeacons = (b = []) => {
      universeBeacons = Array.isArray(b) ? b.slice() : [];
      log("worldcore:beacons:universe:set", { universeBeacons });
    };

    // ------------------------------------------------------------------------
    // SNAPSHOT WORLD
    // ------------------------------------------------------------------------
    const snapshotWorld = () => {
      const now = safeNow();

      const meshView = safeCall(aiMeshView, "snapshot") || null;
      const castleView = safeCall(aiCastleView, "snapshot") || null;
      const serverView = safeCall(aiServerView, "snapshot") || null;
      const expansionView = safeCall(aiExpansionView, "snapshot") || null;
      const earnView = safeCall(aiEarnView, "snapshot") || null;
      const routingView = safeCall(aiRoutingView, "snapshot") || null;
      const presenceView = safeCall(aiPresenceView, "snapshot") || null;
      const metricsView = safeCall(aiMetricsView, "snapshot") || null;

      const continuanceView = safeCall(aiContinuanceView, "snapshot") || null;
      const omniHostingView = safeCall(aiOmniHostingView, "snapshot") || null;
      const schemaView = safeCall(aiSchemaView, "snapshot") || null;
      const beaconView = safeCall(aiBeaconView, "snapshot") || null;
      const universeView = safeCall(aiUniverseView, "snapshot") || null;
      const ciView = safeCall(aiCIView, "snapshot") || null;
      const binaryDeltaView = safeCall(aiBinaryDeltaView, "snapshot") || null;

      const oneBandView = safeCall(aiOneBandView, "snapshot") || null;
      const distanceView = safeCall(aiDistanceView, "snapshot") || null;
      const expansionAiView = safeCall(aiExpansionAiView, "snapshot") || null;

      const snap = {
        ts: now,
        meta: {
          id: cfg.id,
          version: PulseWorldCoreMeta.version,
          aiNormalized: true,
          aiMirror: true,
          epoch: PulseWorldCoreMeta.identity.epoch,
          universeId: cfg.universeId,
          universeSpin: cfg.universeSpin,
          oneBandId: cfg.oneBandId,
          distanceModel: cfg.distanceModel
        },

        mesh: aiShadowState.mesh ?? meshView,
        castle: aiShadowState.castle ?? castleView,
        server: aiShadowState.server ?? serverView,
        expansion: aiShadowState.expansion ?? expansionView,
        earn: aiShadowState.earn ?? earnView,
        routing: aiShadowState.routing ?? routingView,
        presence: aiShadowState.presence ?? presenceView,
        metrics: aiShadowState.metrics ?? metricsView,

        continuance: aiShadowState.continuance ?? continuanceView,
        omniHosting: aiShadowState.omniHosting ?? omniHostingView,
        schema: aiShadowState.schema ?? schemaView,

        ci: aiShadowState.ci ?? ciView,
        binaryDelta: aiShadowState.binaryDelta ?? binaryDeltaView,
        universe: aiShadowState.universe ?? universeView,

        oneBand: aiShadowState.oneBand ?? oneBandView,
        distance: aiShadowState.distance ?? distanceView,
        expansionAi: aiShadowState.expansionAi ?? expansionAiView,

        beacons: beaconView || null,

        narrative: aiShadowState.narrative ?? null,
        tags: cloneTags(aiShadowState.tags)
      };

      snap.intellHash = computeIntellHash(JSON.stringify(snap.meta));

      log("worldcore:snapshot:ai-mirror-universe-v30-oneband", { worldSnapshot: snap });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_SNAPSHOT, snap);
      }

      return snap;
    };

    // ------------------------------------------------------------------------
    // ADVANTAGE CONTEXT
    // ------------------------------------------------------------------------
    const buildAdvantageContext = () => {
      const snap = snapshotWorld();

      const ctx = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,

        world: {
          meshPressure: snap.mesh.pressure ?? null,
          meshHealth: snap.mesh.health ?? null,

          castleLoad: snap.castle.load ?? null,
          castleHealth: snap.castle.health ?? null,

          serverHealth: snap.server.health ?? null,
          serverErrorRate: snap.server.errorRate ?? null,

          expansionLoad: snap.expansion.load ?? null,
          expansionActiveRegions: snap.expansion.regions ?? null,

          earnVelocity: snap.earn.velocity ?? null,
          earnHealth: snap.earn.health ?? null,

          routingLatency: snap.routing.latency ?? null,
          routingErrorRate: snap.routing.errorRate ?? null,

          presenceDensity: snap.presence.density ?? null,
          presenceRegions: snap.presence.regions ?? null,

          continuanceGlobalRisk: snap.continuance.riskReport.globalRisk ?? null,
          continuanceBand: snap.continuance.riskReport.fallbackBandLevel ?? null,

          omniSelectedHosts: snap.omniHosting.placementPlan.selectedHosts ?? null,
          omniFailoverTargets: snap.omniHosting.failoverPlan.failoverTargets ?? null,

          ciBand: snap.ci.band ?? null,
          ciRisk: snap.ci.risk ?? null,

          binaryDeltaMagnitude: snap.binaryDelta.magnitude ?? null,
          binaryDeltaParity: snap.binaryDelta.parity ?? null,

          universeCount: snap.universe.worldCount ?? null,
          universeSpin: snap.universe.spin ?? cfg.universeSpin ?? null,

          oneBandHealth: snap.oneBand.health ?? null,
          oneBandLoad: snap.oneBand.load ?? null,
          oneBandSpan: snap.oneBand.span ?? null,

          distanceMaxReach: snap.distance.maxReach ?? null,
          distanceTier: snap.distance.tier ?? null,
          distanceFabricHealth: snap.distance.fabricHealth ?? null,

          expansionAiPressure: snap.expansionAi.pressure ?? null,
          expansionAiAdvantageBand: snap.expansionAi.advantageBand ?? null,
          expansionAiHints: snap.expansionAi.hints ?? null
        },

        narrative: snap.narrative ?? null,
        tags: cloneTags(snap.tags),

        raw: snap
      };

      ctx.intellHash = computeIntellHash(
        JSON.stringify({ ts: ctx.ts, world: ctx.world })
      );

      log("worldcore:advantage-context:ai-mirror-universe-v30-oneband", { advantageContext: ctx });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_ADVANTAGE, ctx);
      }

      return ctx;
    };

    // ------------------------------------------------------------------------
    // TRUTH VECTORS
    // ------------------------------------------------------------------------
    const buildWorldTruthVectors = () => {
      const snap = snapshotWorld();

      const truth = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,

        loadVector: {
          mesh: snap.mesh.load ?? null,
          castle: snap.castle.load ?? null,
          expansion: snap.expansion.load ?? null,
          server: snap.server.load ?? null,
          universe: snap.universe.load ?? null,
          oneBand: snap.oneBand.load ?? null
        },

        healthVector: {
          mesh: snap.mesh.health ?? null,
          castle: snap.castle.health ?? null,
          server: snap.server.health ?? null,
          earn: snap.earn.health ?? null,
          universe: snap.universe.health ?? null,
          oneBand: snap.oneBand.health ?? null,
          distanceFabric: snap.distance.fabricHealth ?? null
        },

                densityVector: {
          presence: snap.presence.density ?? null,
          regions: snap.presence.regions ?? null,
          universes: snap.universe.universeCount ?? null,
          oneBandSpan: snap.oneBand.span ?? null
        },

        stressVector: {
          routingLatency: snap.routing.latency ?? null,
          routingErrors: snap.routing.errorRate ?? null,
          serverErrors: snap.server.errorRate ?? null,
          universeStress: snap.universe.stress ?? null,
          distanceStress: snap.distance.stress ?? null
        },

        continuanceVector: {
          globalRisk: snap.continuance.riskReport.globalRisk ?? null,
          band: snap.continuance.riskReport.fallbackBandLevel ?? null
        },

        omniHostingVector: {
          selectedHosts: snap.omniHosting.placementPlan.selectedHosts ?? null,
          failoverTargets: snap.omniHosting.failoverPlan.failoverTargets ?? null
        },

        ciVector: {
          band: snap.ci.band ?? null,
          risk: snap.ci.risk ?? null
        },

        binaryDeltaVector: {
          magnitude: snap.binaryDelta.magnitude ?? null,
          parity: snap.binaryDelta.parity ?? null
        },

        oneBandVector: {
          bandId: snap.oneBand.bandId ?? cfg.oneBandId ?? null,
          span: snap.oneBand.span ?? null,
          tier: snap.oneBand.tier ?? null
        },

        distanceVector: {
          model: cfg.distanceModel ?? null,
          maxReach: snap.distance.maxReach ?? null,
          tier: snap.distance.tier ?? null
        },

        narrative: snap.narrative ?? null,
        tags: cloneTags(snap.tags),

        raw: snap
      };

      truth.intellHash = computeIntellHash(
        JSON.stringify({
          ts: truth.ts,
          loadVector: truth.loadVector,
          healthVector: truth.healthVector
        })
      );

      log("worldcore:truth-vectors:ai-mirror-universe-v30-oneband", { truth });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_TRUTH, truth);
      }

      return truth;
    };

    // ------------------------------------------------------------------------
    // CONTINUANCE OVERLAY
    // ------------------------------------------------------------------------
    const buildContinuanceOverlay = () => {
      const snap = snapshotWorld();

      const overlay = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,
        universeId: cfg.universeId,

        riskReport: snap.continuance.riskReport ?? null,
        band: snap.continuance.riskReport.fallbackBandLevel ?? null,
        notes: snap.continuance.riskReport.notes ?? [],

        tags: cloneTags(snap.tags)
      };

      overlay.intellHash = computeIntellHash(
        JSON.stringify({
          ts: overlay.ts,
          band: overlay.band,
          universeId: overlay.universeId
        })
      );

      log("worldcore:continuance-overlay", { overlay });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_CONTINUANCE, overlay);
      }

      return overlay;
    };

    // ------------------------------------------------------------------------
    // CI OVERLAY
    // ------------------------------------------------------------------------
    const buildCIOverlay = () => {
      const snap = snapshotWorld();

      const overlay = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,
        universeId: cfg.universeId,

        band: snap.ci.band ?? null,
        risk: snap.ci.risk ?? null,
        signals: snap.ci.signals ?? null,

        tags: cloneTags(snap.tags)
      };

      overlay.intellHash = computeIntellHash(
        JSON.stringify({
          ts: overlay.ts,
          band: overlay.band,
          risk: overlay.risk
        })
      );

      log("worldcore:ci-overlay", { overlay });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_CI, overlay);
      }

      return overlay;
    };

    // ------------------------------------------------------------------------
    // BINARY DELTA OVERLAY
    // ------------------------------------------------------------------------
    const buildBinaryDeltaOverlay = () => {
      const snap = snapshotWorld();

      const overlay = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,
        universeId: cfg.universeId,

        magnitude: snap.binaryDelta.magnitude ?? null,
        parity: snap.binaryDelta.parity ?? null,
        surface: snap.binaryDelta.surface ?? null,

        tags: cloneTags(snap.tags)
      };

      overlay.intellHash = computeIntellHash(
        JSON.stringify({
          ts: overlay.ts,
          magnitude: overlay.magnitude,
          parity: overlay.parity
        })
      );

      log("worldcore:binary-delta-overlay", { overlay });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_BINARY, overlay);
      }

      return overlay;
    };

    // ------------------------------------------------------------------------
    // DISTANCE OVERLAY
    // ------------------------------------------------------------------------
    const buildDistanceOverlay = () => {
      const snap = snapshotWorld();

      const distance = snap.distance || {};
      const overlay = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,
        universeId: cfg.universeId,
        distanceModel: cfg.distanceModel,

        maxReach: distance.maxReach ?? null,
        tier: distance.tier ?? null,
        fabricHealth: distance.fabricHealth ?? null,
        stress: distance.stress ?? null,

        tags: cloneTags(snap.tags)
      };

      overlay.intellHash = computeIntellHash(
        JSON.stringify({
          ts: overlay.ts,
          distanceModel: overlay.distanceModel,
          tier: overlay.tier,
          maxReach: overlay.maxReach
        })
      );

      log("worldcore:distance-overlay", { overlay });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_DISTANCE, overlay);
      }

      return overlay;
    };

    // ------------------------------------------------------------------------
    // ONEBAND OVERLAY
    // ------------------------------------------------------------------------
    const buildOneBandOverlay = () => {
      const snap = snapshotWorld();

      const oneBand = snap.oneBand || {};
      const overlay = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,

        oneBandId: oneBand.bandId ?? cfg.oneBandId ?? null,
        span: oneBand.span ?? null,
        tier: oneBand.tier ?? null,
        health: oneBand.health ?? null,
        load: oneBand.load ?? null,

        tags: cloneTags(snap.tags)
      };

      overlay.intellHash = computeIntellHash(
        JSON.stringify({
          ts: overlay.ts,
          oneBandId: overlay.oneBandId,
          span: overlay.span,
          tier: overlay.tier
        })
      );

      log("worldcore:oneband-overlay", { overlay });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_ONEBAND, overlay);
      }

      return overlay;
    };

    // ------------------------------------------------------------------------
    // EXPANSION-AI OVERLAY
    // ------------------------------------------------------------------------
    const buildExpansionAiOverlay = () => {
      const snap = snapshotWorld();

      const expansionAi = snap.expansionAi || {};
      const overlay = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,

        pressure: expansionAi.pressure ?? null,
        advantageBand: expansionAi.advantageBand ?? null,
        hints: expansionAi.hints ?? null,

        tags: cloneTags(snap.tags)
      };

      overlay.intellHash = computeIntellHash(
        JSON.stringify({
          ts: overlay.ts,
          pressure: overlay.pressure,
          advantageBand: overlay.advantageBand
        })
      );

      log("worldcore:expansion-ai-overlay", { overlay });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_EXPANSION_AI, overlay);
      }

      return overlay;
    };

    // ------------------------------------------------------------------------
    // WORLD BEACONS
    // ------------------------------------------------------------------------
    const buildWorldBeacons = () => {
      const snap = snapshotWorld();

      const wb = (worldBeacons || []).map(b => ({ ...b }));
      const rb = (regionBeacons || []).map(b => ({ ...b }));
      const hb = (hostBeacons || []).map(b => ({ ...b }));
      const ub = (universeBeacons || []).map(b => ({ ...b }));

      const packet = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,

        worldBeacons: wb,
        regionBeacons: rb,
        hostBeacons: hb,
        universeBeacons: ub,

        narrative: snap.narrative ?? null,
        tags: cloneTags(snap.tags),
        rawSnapshotIntellHash: snap.intellHash
      };

      packet.intellHash = computeIntellHash(
        JSON.stringify({
          ts: packet.ts,
          worldCount: wb.length,
          regionCount: rb.length,
          hostCount: hb.length,
          universeCount: ub.length
        })
      );

      log("worldcore:beacons:ai-mirror-universe-v30-oneband", { beaconPacket: packet });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_BEACONS, packet);
      }

      return packet;
    };

    // ------------------------------------------------------------------------
    // UNIVERSE PACKET
    // ------------------------------------------------------------------------
    const buildUniversePacket = () => {
      const snap = snapshotWorld();

      const universe = snap.universe || {};
      const packet = {
        ts: snap.ts,
        aiNormalized: true,
        aiMirror: true,

        universeId: cfg.universeId,
        spin: universe.spin ?? cfg.universeSpin ?? "multi-spin-symbolic",
        worldCount: universe.worldCount ?? null,
        bands: universe.bands ?? null,
        load: universe.load ?? null,
        health: universe.health ?? null,
        stress: universe.stress ?? null,

        tags: cloneTags(snap.tags),
        narrative: snap.narrative ?? null
      };

      packet.intellHash = computeIntellHash(
        JSON.stringify({
          ts: packet.ts,
          universeId: packet.universeId,
          worldCount: packet.worldCount,
          spin: packet.spin
        })
      );

      log("worldcore:universe-packet", { packet });

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_UNIVERSE, packet);
      }

      return packet;
    };

    // ------------------------------------------------------------------------
    // WORLD EVENT
    // ------------------------------------------------------------------------
    const recordWorldEvent = (event) => {
      const payload = {
        ts: safeNow(),
        aiNormalized: true,
        aiMirror: true,
        event
      };

      payload.intellHash = computeIntellHash(JSON.stringify(event || {}));

      log("worldcore:event:ai-mirror-universe-v30-oneband", payload);

      if (cfg.enableCoreMemory) {
        CoreMemory.set(ROUTE, KEY_LAST_EVENT, payload);
      }

      return payload;
    };

    // ------------------------------------------------------------------------
    // RETURN IMMORTAL INSTANCE
    // ------------------------------------------------------------------------
    return Object.freeze({
      config: cfg,

      attachAiMeshView,
      attachAiCastleView,
      attachAiServerView,
      attachAiExpansionView,
      attachAiEarnView,
      attachAiRoutingView,
      attachAiPresenceView,
      attachAiMetricsView,

      attachAiContinuanceView,
      attachAiOmniHostingView,
      attachAiSchemaView,
      attachAiBeaconView,
      attachAiUniverseView,
      attachAiCIView,
      attachAiBinaryDeltaView,

      attachAiOneBandView,
      attachAiDistanceView,
      attachAiExpansionAiView,

      attachOvermindPrime,
      attachEvolutionaryThought,
      attachEvolutionaryInstincts,

      setAiWorldState,
      mergeAiWorldState,
      aiOverrideField,
      aiInjectNarrative,
      aiReportSubsystemView,

      setWorldBeacons,
      setRegionBeacons,
      setHostBeacons,
      setUniverseBeacons,

      snapshotWorld,
      buildAdvantageContext,
      buildWorldTruthVectors,
      buildContinuanceOverlay,
      buildCIOverlay,
      buildBinaryDeltaOverlay,
      buildDistanceOverlay,
      buildOneBandOverlay,
      buildExpansionAiOverlay,
      buildWorldBeacons,
      buildUniversePacket,
      recordWorldEvent
    });
  };

  return Object.freeze({ create });

})();

// ============================================================================
//  FACTORY — IMMORTAL PSEUDO VERSION
// ============================================================================
export function createPulseWorldCore(config = {}) {
  const core = PulseWorldCore.create(config);

  return Object.freeze({
    meta: PulseWorldCoreMeta,

    // Core AI-mirror surfaces
    snapshotWorld: () => core.snapshotWorld(),
    buildAdvantageContext: () => core.buildAdvantageContext(),
    buildWorldTruthVectors: () => core.buildWorldTruthVectors(),
    recordWorldEvent: (event) => core.recordWorldEvent(event),
    buildWorldBeacons: () => core.buildWorldBeacons(),
    buildContinuanceOverlay: () => core.buildContinuanceOverlay(),
    buildCIOverlay: () => core.buildCIOverlay(),
    buildBinaryDeltaOverlay: () => core.buildBinaryDeltaOverlay(),
    buildUniversePacket: () => core.buildUniversePacket(),
    buildDistanceOverlay: () => core.buildDistanceOverlay(),
    buildOneBandOverlay: () => core.buildOneBandOverlay(),
    buildExpansionAiOverlay: () => core.buildExpansionAiOverlay(),

    // AI-facing subsystem views
    attachAiMeshView: (p) => core.attachAiMeshView(p),
    attachAiCastleView: (p) => core.attachAiCastleView(p),
    attachAiServerView: (p) => core.attachAiServerView(p),
    attachAiExpansionView: (p) => core.attachAiExpansionView(p),
    attachAiEarnView: (p) => core.attachAiEarnView(p),
    attachAiRoutingView: (p) => core.attachAiRoutingView(p),
    attachAiPresenceView: (p) => core.attachAiPresenceView(p),
    attachAiMetricsView: (p) => core.attachAiMetricsView(p),

    attachAiContinuanceView: (p) => core.attachAiContinuanceView(p),
    attachAiOmniHostingView: (p) => core.attachAiOmniHostingView(p),
    attachAiSchemaView: (p) => core.attachAiSchemaView(p),
    attachAiBeaconView: (p) => core.attachAiBeaconView(p),
    attachAiUniverseView: (p) => core.attachAiUniverseView(p),
    attachAiCIView: (p) => core.attachAiCIView(p),
    attachAiBinaryDeltaView: (p) => core.attachAiBinaryDeltaView(p),

    attachAiOneBandView: (p) => core.attachAiOneBandView(p),
    attachAiDistanceView: (p) => core.attachAiDistanceView(p),
    attachAiExpansionAiView: (p) => core.attachAiExpansionAiView(p),

    // AI-organ attachments
    attachOvermindPrime: (o) => core.attachOvermindPrime(o),
    attachEvolutionaryThought: (t) => core.attachEvolutionaryThought(t),
    attachEvolutionaryInstincts: (i) => core.attachEvolutionaryInstincts(i),

    // Direct AI shadow manipulation
    setAiWorldState: (w) => core.setAiWorldState(w),
    mergeAiWorldState: (w) => core.mergeAiWorldState(w),
    aiOverrideField: (path, value) => core.aiOverrideField(path, value),
    aiInjectNarrative: (n) => core.aiInjectNarrative(n),
    aiReportSubsystemView: (name, view) => core.aiReportSubsystemView(name, view)
  });
}

PulseRealm.ExpansionAI = {
  createPulseWorldCore,
  PulseWorldCore,
  PulseWorldCoreMeta
}