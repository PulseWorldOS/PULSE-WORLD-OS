// ============================================================================
//  PULSE‑TRUST JURY COUNCIL v33.0.0 IMMORTAL++ — META-JURY
//  Evaluates Jury behavior over time • Detects systemic drift & manipulation
//  TrustCore‑Linked • HyperFrame‑Aware • Continuance‑Aware • ER‑Ready
// ============================================================================

import { PulseWorldTrustCore } from "./PulseTrustCore-v33.js";

export const PulseTrustJuryCouncilMeta = Object.freeze({
  id: "PulseTrustJuryCouncil-v33++",
  version: "33.0.0",
  role: "trust_jury_council",
  mind: false,
  description:
    "IMMORTAL++ meta‑jury evaluating systemic jury behavior over time, TrustCore‑linked, ER‑ready.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryCouncil",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_jury_council",
    categories: ["RAW_AI", "TRUSTCORE"],
    erReady: true
  }
});

// ============================================================================
//  CLASS — META-JURY v33 IMMORTAL++
// ============================================================================

export function createJuryCouncil() {
  function reviewJuryHistory({
    juryDecisions = [],
    councilId = null,
    hyperFrame = null,
    continuanceFrame = null,
    ts = null
  } = {}) {

    // Deterministic timestamp — from TrustCore
    const trustProfile = PulseWorldTrustCore.getTrustProfile() || {};
    const ethics = PulseWorldTrustCore.getEthicsConstraints() || null;
    const resolvedTs =
      ts ??
      juryDecisions[juryDecisions.length - 1].ts ??
      trustProfile.issuedAt ??
      0;

    // ========================================================================
    //  COUNTS
    // ========================================================================
    let failCount = 0;
    let warnCount = 0;
    let aiOriginRiskCount = 0;
    let dominanceRiskCount = 0;

    let lensInstabilityCount = 0;
    let environmentStressCount = 0;
    let deltaDivergenceCount = 0;
    let anomalyClusterCount = 0;

    const lensFailureMap = {};
    const lensDominanceMap = {};

    // ========================================================================
    //  PASS — Iterate over all jury decisions
    // ========================================================================
    for (const d of juryDecisions) {
      const verdict = d.verdict;
      const flags = d.creatorFlags || d.flags || {};
      const lenses = d.lenses || {};
      const delta = d.delta || {};
      const patterns = d.patterns || {};

      if (verdict === "fail") failCount++;
      if (verdict === "warn") warnCount++;

      if (flags.aiOriginRisk) aiOriginRiskCount++;
      if (flags.dominanceRisk) dominanceRiskCount++;

      if (flags.lensInstability) lensInstabilityCount++;
      if (flags.environmentStress) environmentStressCount++;

      // RAW vs AI divergence
      const deltaMagnitude =
        Object.keys(delta.mesh || {}).length +
        Object.keys(delta.castle || {}).length +
        Object.keys(delta.server || {}).length +
        Object.keys(delta.expansion || {}).length +
        Object.keys(delta.earn || {}).length +
        Object.keys(delta.routing || {}).length +
        Object.keys(delta.presence || {}).length +
        Object.keys(delta.metrics || {}).length;

      if (deltaMagnitude >= 10) deltaDivergenceCount++;

      // Anomaly clusters
      if (patterns.mismatchCounts) {
        const totalMismatch = Object.values(patterns.mismatchCounts)
          .reduce((a, b) => a + b, 0);
        if (totalMismatch >= 20) anomalyClusterCount++;
      }

      // Lens-level stats
      for (const [lensName, lensData] of Object.entries(lenses)) {
        if (!lensFailureMap[lensName]) lensFailureMap[lensName] = 0;
        if (!lensDominanceMap[lensName]) lensDominanceMap[lensName] = 0;

        if (lensData.status === "fail") lensFailureMap[lensName]++;
        if (lensData.dominant === true) lensDominanceMap[lensName]++;
      }
    }

    // ========================================================================
    //  TRUSTCORE CONTEXT
    // ========================================================================
    const trustCoreContext = Object.freeze({
      trustLevel: trustProfile.level ?? 0,
      trustScore: trustProfile.score ?? 0,
      ethicsForbidden: Array.isArray(ethics.forbiddenActions)
        ? ethics.forbiddenActions.length
        : 0
    });

    // ========================================================================
    //  HYPERFRAME / CONTINUANCE CONTEXT
    // ========================================================================
    const hyperFrameContext = Object.freeze({
      latency: hyperFrame.latency ?? 0,
      frameDrops: hyperFrame.frameDrops ?? 0
    });

    const continuanceContext = Object.freeze({
      pressure: continuanceFrame.pressure ?? 0,
      stallCount: continuanceFrame.stallCount ?? 0
    });

    // ========================================================================
    //  SYSTEMIC FLAGS — META-JURY VERDICT
    // ========================================================================
    const systemicFlags = {
      highFailRate: failCount >= 5,
      highWarnRate: warnCount >= 10,
      frequentAiOriginRisk: aiOriginRiskCount >= 5,
      frequentDominanceRisk: dominanceRiskCount >= 3,

      lensInstability: lensInstabilityCount >= 5,
      environmentStress: environmentStressCount >= 5,
      deltaDivergence: deltaDivergenceCount >= 5,
      anomalyClusters: anomalyClusterCount >= 3,

      // TrustCore context
      lowTrustCore: trustCoreContext.trustLevel < 10,
      ethicsConstrained: trustCoreContext.ethicsForbidden > 0,

      // HyperFrame / Continuance
      hyperFrameInstability:
        hyperFrameContext.latency > 50 ||
        hyperFrameContext.frameDrops > 3,

      continuanceInstability:
        continuanceContext.pressure > 40 ||
        continuanceContext.stallCount > 2,

      // Jury drift (meta)
      juryDrift:
        failCount >= 10 ||
        warnCount >= 20 ||
        deltaDivergenceCount >= 10 ||
        lensInstabilityCount >= 10
    };

    // ========================================================================
    //  SNAPSHOT — ER‑READY
    // ========================================================================
    const snapshot = Object.freeze({
      meta: PulseTrustJuryCouncilMeta,
      schema: PulseTrustJuryCouncilMeta.schema,
      councilId,
      ts: resolvedTs,
      trustCoreContext,
      hyperFrameContext,
      continuanceContext,
      stats: Object.freeze({
        total: juryDecisions.length,
        failCount,
        warnCount,
        aiOriginRiskCount,
        dominanceRiskCount,
        lensInstabilityCount,
        environmentStressCount,
        deltaDivergenceCount,
        anomalyClusterCount,
        lensFailureMap,
        lensDominanceMap
      }),
      systemicFlags
    });

    return Object.freeze({
      meta: PulseTrustJuryCouncilMeta,
      snapshot,
      stats: snapshot.stats,
      systemicFlags: snapshot.systemicFlags
    });
  }

  return Object.freeze({
    meta: PulseTrustJuryCouncilMeta,
    reviewJuryHistory
  });
}

export default createJuryCouncil;
