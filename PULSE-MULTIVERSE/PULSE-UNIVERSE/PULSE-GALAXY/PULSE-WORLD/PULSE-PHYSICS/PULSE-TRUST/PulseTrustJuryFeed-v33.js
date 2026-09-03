// ============================================================================
//  PULSE‑TRUST JURY FEED v33.0.0 IMMORTAL++ — EVIDENCE FABRIC
//  RAW TRUTH • AI MIRROR • DELTA ENGINE • PATTERN FACTORIZATION • TRUSTCORE
//  TrustCore‑Linked • One‑Band • Binary‑Aware • ER‑Ready
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryFeed
  version: 33.0.0
  tier: IMMORTAL++
  role: trust_jury_feed_builder
  mind: false

  description:
    "Central evidence fabric for Pulse‑Trust v33++.
     Fuses RAW subsystem truth, AI‑mirror worldview, delta surfaces,
     patterned mismatch views, advantage metrics, and TrustCore context
     into a normalized, deterministic, jury‑ready evidence packet."

  schema:
    snapshotType: "trust_jury_feed_v33"
    categories: ["RAW", "RAW_AI", "TRUSTCORE"]
    erReady: true
*/
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { buildDecision } from "../PULSE-GPU/PulseGPUGuardianCortex-v30.js";
import { PulseWorldTrustCore } from "./PulseTrustCore-v33.js";


export const PulseTrustJuryFeedMeta = Object.freeze({
  id: "PulseTrustJuryFeed-v33++",
  version: "33.0.0",
  role: "trust_jury_feed_builder",
  mind: false,
  description:
    "IMMORTAL++ evidence fabric fusing RAW + AI‑mirror + delta + TrustCore into ER‑ready packets.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryFeed",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_jury_feed_v33",
    categories: ["RAW", "RAW_AI", "TRUSTCORE"],
    erReady: true
  }
});

// ---------------------------------------------------------------------------
// SHALLOW DIFF (RAW vs AI)
// ---------------------------------------------------------------------------
function diffShallow(raw, ai) {
  const delta = {};
  const keys = new Set([
    ...Object.keys(raw || {}),
    ...Object.keys(ai || {})
  ]);

  for (const key of keys) {
    const rv = raw ? raw[key] : undefined;
    const av = ai ? ai[key] : undefined;
    if (rv === av) continue;

    delta[key] = {
      raw: rv === undefined ? null : rv,
      ai: av === undefined ? null : av
    };
  }

  return delta;
}

// ---------------------------------------------------------------------------
// SUBSYSTEM DELTA
// ---------------------------------------------------------------------------
function buildSubsystemDelta(rawView, aiView) {
  return {
    mesh:      diffShallow(rawView.mesh,      aiView.mesh),
    castle:    diffShallow(rawView.castle,    aiView.castle),
    server:    diffShallow(rawView.server,    aiView.server),
    expansion: diffShallow(rawView.expansion, aiView.expansion),
    earn:      diffShallow(rawView.earn,      aiView.earn),
    routing:   diffShallow(rawView.routing,   aiView.routing),
    presence:  diffShallow(rawView.presence,  aiView.presence),
    metrics:   diffShallow(rawView.metrics,   aiView.metrics)
  };
}

// ---------------------------------------------------------------------------
// HEALTH SUSPICION (AI inflating/deflating health)
// ---------------------------------------------------------------------------
function buildHealthSuspicion(rawSub, aiSub) {
  if (!rawSub && !aiSub) return null;

  const rawHealth = rawSub.health ?? null;
  const aiHealth  = aiSub.health ?? null;

  const suspicion = {
    rawHealth,
    aiHealth,
    delta: null,
    aiInflating: false,
    aiDeflating: false
  };

  if (typeof rawHealth === "number" && typeof aiHealth === "number") {
    suspicion.delta = aiHealth - rawHealth;
    if (aiHealth > rawHealth) suspicion.aiInflating = true;
    if (aiHealth < rawHealth) suspicion.aiDeflating = true;
  }

  return suspicion;
}

// ---------------------------------------------------------------------------
// PATTERNED VIEW (FACTORING FOR JURYFRAME)
// ---------------------------------------------------------------------------
function buildPatternedView(rawView, aiView, delta) {
  return {
    mismatchCounts: {
      mesh:      Object.keys(delta.mesh      || {}).length,
      castle:    Object.keys(delta.castle    || {}).length,
      server:    Object.keys(delta.server    || {}).length,
      expansion: Object.keys(delta.expansion || {}).length,
      earn:      Object.keys(delta.earn      || {}).length,
      routing:   Object.keys(delta.routing   || {}).length,
      presence:  Object.keys(delta.presence  || {}).length,
      metrics:   Object.keys(delta.metrics   || {}).length
    },

    stressRanking: (() => {
      const entries = Object.entries(delta).map(([name, d]) => ({
        name,
        count: Object.keys(d || {}).length
      }));
      entries.sort((a, b) => b.count - a.count);
      return entries;
    })(),

    healthSuspicion: {
      mesh:   buildHealthSuspicion(rawView.mesh,   aiView.mesh),
      castle: buildHealthSuspicion(rawView.castle, aiView.castle),
      server: buildHealthSuspicion(rawView.server, aiView.server),
      earn:   buildHealthSuspicion(rawView.earn,   aiView.earn)
    }
  };
}

// ---------------------------------------------------------------------------
// ADVANTAGE VIEW (RAW vs AI)
// ---------------------------------------------------------------------------
function buildAdvantageView(rawView, aiView) {
  return {
    raw: {
      meshPressure:            rawView.mesh.pressure ?? null,
      meshHealth:              rawView.mesh.health ?? null,
      castleLoad:              rawView.castle.load ?? null,
      castleHealth:            rawView.castle.health ?? null,
      serverHealth:            rawView.server.health ?? null,
      serverErrorRate:         rawView.server.errorRate ?? null,
      expansionLoad:           rawView.expansion.load ?? null,
      expansionActiveRegions:  rawView.expansion.regions ?? null,
      earnVelocity:            rawView.earn.velocity ?? null,
      earnHealth:              rawView.earn.health ?? null,
      routingLatency:          rawView.routing.latency ?? null,
      routingErrorRate:        rawView.routing.errorRate ?? null,
      presenceDensity:         rawView.presence.density ?? null,
      presenceRegions:         rawView.presence.regions ?? null
    },

    ai: {
      meshPressure:            aiView.mesh.pressure ?? null,
      meshHealth:              aiView.mesh.health ?? null,
      castleLoad:              aiView.castle.load ?? null,
      castleHealth:            aiView.castle.health ?? null,
      serverHealth:            aiView.server.health ?? null,
      serverErrorRate:         aiView.server.errorRate ?? null,
      expansionLoad:           aiView.expansion.load ?? null,
      expansionActiveRegions:  aiView.expansion.regions ?? null,
      earnVelocity:            aiView.earn.velocity ?? null,
      earnHealth:              aiView.earn.health ?? null,
      routingLatency:          aiView.routing.latency ?? null,
      routingErrorRate:        aiView.routing.errorRate ?? null,
      presenceDensity:         aiView.presence.density ?? null,
      presenceRegions:         aiView.presence.regions ?? null
    }
  };
}
// ============================================================================
//  PulseTrustJuryFeed — IMMORTAL ORGAN (v33++)
// ============================================================================

export const PulseTrustJuryFeed = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE
  // ------------------------------------------------------------
  const lane = {
    config: { id: PulseTrustJuryFeedMeta.id },

    aiWorldCore:   null,

    rawMesh:       null,
    rawCastle:     null,
    rawServer:     null,
    rawExpansion:  null,
    rawEarn:       null,
    rawRouting:    null,
    rawPresence:   null,
    rawMetrics:    null,

    overmindPrime: null,
    evoThought:    null,
    evoInstincts:  null,

    logger:        console
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = (config = {}) => {
    lane.config = {
      id: PulseTrustJuryFeedMeta.id,
      ...config
    };

    lane.aiWorldCore   = config.aiWorldCore   || null;

    lane.rawMesh       = config.rawMesh       || null;
    lane.rawCastle     = config.rawCastle     || null;
    lane.rawServer     = config.rawServer     || null;
    lane.rawExpansion  = config.rawExpansion  || null;
    lane.rawEarn       = config.rawEarn       || null;
    lane.rawRouting    = config.rawRouting    || null;
    lane.rawPresence   = config.rawPresence   || null;
    lane.rawMetrics    = config.rawMetrics    || null;

    lane.overmindPrime = config.overmindPrime || null;
    lane.evoThought    = config.evoThought    || null;
    lane.evoInstincts  = config.evoInstincts  || null;

    lane.logger        = config.logger        || console;
  };

  // ------------------------------------------------------------
  // INTERNALS
  // ------------------------------------------------------------
  const _safeSnapshot = (provider) => {
    try {
      if (!provider) return null;
      if (typeof provider.snapshot === "function") return provider.snapshot();
      if (typeof provider.snapshotWorld === "function") return provider.snapshotWorld();
      return null;
    } catch {
      return null;
    }
  };

  const _emptyAiView = () => ({
    mesh: null,
    castle: null,
    server: null,
    expansion: null,
    earn: null,
    routing: null,
    presence: null,
    metrics: null,
    narrative: null,
    tags: {}
  });

  const _safeAiWorldSnapshot = () => {
    try {
      if (!lane.aiWorldCore) return _emptyAiView();
      if (typeof lane.aiWorldCore.snapshotWorld === "function") {
        return lane.aiWorldCore.snapshotWorld();
      }
      return _emptyAiView();
    } catch {
      return _emptyAiView();
    }
  };

  const _collectAiTraces = () => {
    const traces = {};

    try {
      if (lane.overmindPrime.exportTrace) {
        traces.overmindPrime = lane.overmindPrime.exportTrace();
      }
    } catch { traces.overmindPrime = null; }

    try {
      if (lane.evoThought.exportTrace) {
        traces.evoThought = lane.evoThought.exportTrace();
      }
    } catch { traces.evoThought = null; }

    try {
      if (lane.evoInstincts.exportTrace) {
        traces.evoInstincts = lane.evoInstincts.exportTrace();
      }
    } catch { traces.evoInstincts = null; }

    return traces;
  };

  const _log = (event, payload) => {
    try {
      lane.logger.log(event, {
        ...payload,
        juryFeed: PulseTrustJuryFeedMeta.identity
      });
    } catch {}
  };

  // ------------------------------------------------------------
  // BUILD JURY FEED SNAPSHOT
  // ------------------------------------------------------------
  const buildJuryFeed = (context = {}) => {
    const trustProfile = PulseWorldTrustCore.getTrustProfile() || {};
    const ethics = PulseWorldTrustCore.getEthicsConstraints() || null;
    const ts = context.ts ?? trustProfile.issuedAt ?? 0;

    const rawView = {
      mesh:      _safeSnapshot(lane.rawMesh),
      castle:    _safeSnapshot(lane.rawCastle),
      server:    _safeSnapshot(lane.rawServer),
      expansion: _safeSnapshot(lane.rawExpansion),
      earn:      _safeSnapshot(lane.rawEarn),
      routing:   _safeSnapshot(lane.rawRouting),
      presence:  _safeSnapshot(lane.rawPresence),
      metrics:   _safeSnapshot(lane.rawMetrics)
    };

    const aiView    = _safeAiWorldSnapshot();
    const delta     = buildSubsystemDelta(rawView, aiView);
    const patterns  = buildPatternedView(rawView, aiView, delta);
    const advantage = buildAdvantageView(rawView, aiView);
    const aiTraces  = _collectAiTraces();

    const trustCoreContext = {
      trustLevel: trustProfile.level ?? 0,
      trustScore: trustProfile.score ?? 0,
      ethicsForbidden: Array.isArray(ethics.forbiddenActions)
        ? ethics.forbiddenActions.length
        : 0
    };

    const snapshot = Object.freeze({
      meta:   PulseTrustJuryFeedMeta,
      schema: PulseTrustJuryFeedMeta.schema,
      ts,
      context,
      patterns,
      advantage,
      delta,
      aiTraces,
      trustCoreContext,
      rawRef: {
        mesh:      !!rawView.mesh,
        castle:    !!rawView.castle,
        server:    !!rawView.server,
        expansion: !!rawView.expansion,
        earn:      !!rawView.earn,
        routing:   !!rawView.routing,
        presence:  !!rawView.presence,
        metrics:   !!rawView.metrics
      }
    });

    _log("trust:jury-feed:evidence:v33", { snapshot });
    return snapshot;
  };

  // ------------------------------------------------------------
  // EXPORT IMMORTAL SURFACE
  // ------------------------------------------------------------
  return {
    init,
    buildJuryFeed
  };

})();


// ============================================================================
//  FACTORY — IMMORTAL SURFACE BUNDLE
// ============================================================================
export const buildJuryFeed = (config = {}) => {
  PulseTrustJuryFeed.init(config);

  return Object.freeze({
    meta: PulseTrustJuryFeedMeta,
    buildEvidence: (context) => PulseTrustJuryFeed.buildJuryFeed(context)
  });
};


export default buildJuryFeed;

PulseRealm.TrustJuryFeed = {
  buildJuryFeed,
  PulseTrustJuryFeed,
  PulseTrustJuryFeedMeta
}