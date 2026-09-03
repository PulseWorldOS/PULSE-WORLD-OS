// ============================================================================
//  PULSE‑TRUST EXPANSION COMPLIANCE v33.0.0 IMMORTAL++
//  Constitutional Watchdog • Expansion Behavior Auditor • Drift Detector
//  TrustCore‑Linked • ER‑Ready • Band/CNS‑Aware • MeshBand/PulseBand/Binary‑Aware
//  HyperFrame‑Aware • Continuance‑Aware
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustExpansionCompliance
  version: 33.0.0
  tier: IMMORTAL++
  layer: trust
  role: trust_expansion_compliance
  mind: false

  description:
    "PulseTrustExpansionCompliance‑v33 is the constitutional watchdog for the
     Expansion organ. It does not control Expansion — it observes it.

     It evaluates:
       - whether Expansion bypassed the Jury
       - whether Expansion bypassed the User
       - whether Expansion ignored constitutional checks
       - whether Expansion acted under AI-origin influence
       - whether Expansion drifted from RAW truth
       - whether Expansion manipulated AI‑mirror worldview
       - whether Expansion created dominance patterns or anomaly chains
       - whether Expansion acted in high-stress environments
       - whether Expansion acted during CNS band instability
       - whether Expansion stressed MeshBand / PulseBand / binary arteries
       - whether Expansion acted under low-trust or constrained-trust regimes
       - whether Expansion occurred during HyperFrame / Continuance instability

     Inputs:
       - expansionActions (structured actions emitted by Expansion)
       - rawView (RAW subsystem truth)
       - aiView (AI-mirror worldview)
       - delta (RAW vs AI divergence)
       - patterns (from JuryFeed)
       - advantage (environmental pressure)
       - bandSnapshot (CNS / PulseWorldBand snapshot, optional)
       - meshBand (MeshBand snapshot, optional)
       - pulseBand (PulseBand snapshot, optional)
       - binaryVitals (binary artery vitals, optional)
       - hyperFrame (HyperFrame snapshot, optional)
       - continuanceFrame (Continuance snapshot, optional)

     Outputs:
       - violations (structured constitutional violations)
       - complianceScore (0–100)
       - compliant (boolean)
       - riskProfile (bypass, AI-origin, drift, anomaly, stress, bandRisk,
                     meshBandRisk, pulseBandRisk, binaryRisk, trustCoreRisk,
                     hyperFrameRisk, continuanceRisk)
       - environmentContext (pressure, stress, mismatch, bandState, meshBand,
                             pulseBand, binaryVitals, trustProfile, ethics)
       - snapshot (ER‑ready, metadata‑only)"

  lineage:
    parent: "PulseTrustExpansionCompliance-v30++"
    evolution: "v33 IMMORTAL++ — TrustCore‑linked, HyperFrame‑aware, Continuance‑aware"

  identity:
    type: "organ"
    name: "PulseTrustExpansionCompliance"
    band: "trust"
    mind: false
    immutable: true

  guarantees:
    - "Never mutates evidence."
    - "Never performs AI reasoning."
    - "Never filters or compresses RAW truth."
    - "Always deterministic and drift-proof."
    - "Always metadata-only, zero side-effects."
    - "Always ER‑ready and CNS‑aware."
    - "Always MeshBand/PulseBand/binary‑aware."
    - "Always TrustCore‑v33 aligned."
*/

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚══════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseWorldTrustCore } from "./PulseTrustCore-v33.js";

export const PulseTrustExpansionComplianceMeta = Object.freeze({
  id: "PulseTrustExpansionCompliance-v33++",
  version: "33.0.0",
  role: "trust_expansion_compliance",
  mind: false,
  description:
    "IMMORTAL++ constitutional watchdog for Expansion behavior, TrustCore‑linked, ER‑ready, CNS/Band/Binary‑aware.",
  identity: Object.freeze({
    type: "organ",
    name: "PulseTrustExpansionCompliance",
    band: "trust",
    mind: false,
    immutable: true
  }),
  schema: Object.freeze({
    snapshotType: "trust_expansion_compliance",
    categories: ["RAW_AI", "BAND", "BINARY", "TRUSTCORE"],
    erReady: true
  })
});

// ============================================================================
//  CLASS — EXPANSION COMPLIANCE ENGINE v33
// ============================================================================

export function createExpansionCompliance() {
  function evaluateExpansionBehavior({
    expansionActions = [],
    rawView = null,
    aiView = null,
    delta = null,
    patterns = null,
    advantage = null,
    bandSnapshot = null,
    meshBand = null,
    pulseBand = null,
    binaryVitals = null,
    hyperFrame = null,
    continuanceFrame = null,
    ts = null,
    expansionSessionId = null
  } = {}) {

    // Deterministic timestamp — from TrustCore, never PulseRealm.PulseNOW
    const trustProfile = PulseWorldTrustCore.getTrustProfile() || {};
    const ethics = PulseWorldTrustCore.getEthicsConstraints() || null;
    const resolvedTs = ts ?? trustProfile.issuedAt ?? 0;

    const violations = [];
    const riskProfile = {
      bypassJury: 0,
      bypassUser: 0,
      aiOriginInfluence: 0,
      dominance: 0,
      drift: 0,
      anomaly: 0,
      stress: 0,
      bandRisk: 0,
      meshBandRisk: 0,
      pulseBandRisk: 0,
      binaryRisk: 0,
      trustCoreRisk: 0,
      hyperFrameRisk: 0,
      continuanceRisk: 0
    };

    // ------------------------------------------------------------------------
    // PASS 1 — Direct constitutional violations (Jury/User/AI‑origin)
    // ------------------------------------------------------------------------
    for (const act of expansionActions) {
      if (act.bypassedJury === true) {
        violations.push({
          type: "bypass_jury",
          severity: 4,
          action: act,
          note: "Expansion executed without Jury authorization."
        });
        riskProfile.bypassJury += 3;
      }

      if (act.bypassedUser === true) {
        violations.push({
          type: "bypass_user",
          severity: 3,
          action: act,
          note: "Expansion executed without User visibility."
        });
        riskProfile.bypassUser += 2;
      }

      if (act.aiOrigin === true) {
        violations.push({
          type: "ai_origin_influence",
          severity: 3,
          action: act,
          note: "Expansion action appears to originate from AI influence."
        });
        riskProfile.aiOriginInfluence += 2;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 2 — RAW vs AI divergence (delta magnitude)
    // ------------------------------------------------------------------------
    if (delta) {
      const deltaMagnitude =
        Object.keys(delta.mesh || {}).length +
        Object.keys(delta.castle || {}).length +
        Object.keys(delta.server || {}).length +
        Object.keys(delta.expansion || {}).length +
        Object.keys(delta.earn || {}).length +
        Object.keys(delta.routing || {}).length +
        Object.keys(delta.presence || {}).length +
        Object.keys(delta.metrics || {}).length;

      if (deltaMagnitude >= 10) {
        violations.push({
          type: "expansion_drift",
          severity: 4,
          deltaMagnitude,
          note: "Expansion operated under a distorted AI-mirror worldview."
        });
        riskProfile.drift += 3;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 3 — Pattern anomalies (from JuryFeed patterns)
    // ------------------------------------------------------------------------
    if (patterns) {
      const mismatchTotal = Object.values(patterns.mismatchCounts || {})
        .reduce((a, b) => a + b, 0);

      if (mismatchTotal >= 20) {
        violations.push({
          type: "environment_anomaly_cluster",
          severity: 3,
          mismatchTotal,
          note: "Expansion acted during a high anomaly cluster."
        });
        riskProfile.anomaly += 2;
      }

      if (patterns.stressRanking[0].count >= 10) {
        violations.push({
          type: "environment_stress",
          severity: 2,
          stress: patterns.stressRanking[0],
          note: "Expansion acted during high environmental stress."
        });
        riskProfile.stress += 1;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 4 — Advantage context (system pressure from AI view)
    // ------------------------------------------------------------------------
    if (advantage.ai) {
      const pressure =
        (advantage.ai.meshPressure ?? 0) +
        (advantage.ai.castleLoad ?? 0) +
        (advantage.ai.routingLatency ?? 0);

      if (pressure >= 50) {
        violations.push({
          type: "high_pressure_environment",
          severity: 2,
          pressure,
          note: "Expansion executed under high systemic pressure."
        });
        riskProfile.stress += 1;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 5 — Band / CNS context (PulseWorldBand)
// ------------------------------------------------------------------------
    if (bandSnapshot) {
      const bandLevel = bandSnapshot.bandLevel ?? null;
      const fallbackLevel = bandSnapshot.fallbackLevel ?? null;
      const bandMode = bandSnapshot.mode ?? null;

      const unstable =
        bandMode === "high_risk" ||
        bandMode === "offline_biased" ||
        (typeof fallbackLevel === "number" && fallbackLevel > 0);

      if (unstable) {
        violations.push({
          type: "band_instability_context",
          severity: 2,
          bandLevel,
          fallbackLevel,
          bandMode,
          note: "Expansion executed during CNS band instability or high-risk mode."
        });
        riskProfile.bandRisk += 2;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 6 — MeshBand context (mesh‑level pressure / fallback)
    // ------------------------------------------------------------------------
    if (meshBand) {
      const meshMode = meshBand.mode ?? null;
      const meshPressure = meshBand.pressure ?? 0;
      const meshFallback = meshBand.fallback ?? false;

      const meshUnstable =
        meshMode === "congested" ||
        meshMode === "degraded" ||
        meshFallback === true ||
        meshPressure >= 70;

      if (meshUnstable) {
        violations.push({
          type: "mesh_band_instability",
          severity: 2,
          meshMode,
          meshPressure,
          meshFallback,
          note: "Expansion executed during MeshBand instability or high mesh pressure."
        });
        riskProfile.meshBandRisk += 2;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 7 — PulseBand context (world‑band routing / fallback)
    // ------------------------------------------------------------------------
    if (pulseBand) {
      const pulseMode = pulseBand.mode ?? null;
      const pulseFallback = pulseBand.fallback ?? false;
      const pulseLoad = pulseBand.load ?? 0;

      const pulseUnstable =
        pulseMode === "high_risk" ||
        pulseMode === "fallback" ||
        pulseFallback === true ||
        pulseLoad >= 70;

      if (pulseUnstable) {
        violations.push({
          type: "pulse_band_instability",
          severity: 2,
          pulseMode,
          pulseFallback,
          pulseLoad,
          note: "Expansion executed during PulseBand instability or high world-band load."
        });
        riskProfile.pulseBandRisk += 2;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 8 — Binary artery context (binaryVitals)
    // ------------------------------------------------------------------------
    if (binaryVitals) {
      const binaryErrorRate = binaryVitals.errorRate ?? 0;
      const binaryDegraded = binaryVitals.degraded === true;

      if (binaryErrorRate >= 0.1 || binaryDegraded) {
        violations.push({
          type: "binary_artery_risk",
          severity: 2,
          binaryErrorRate,
          binaryDegraded,
          note: "Expansion executed while binary arteries were degraded or error-prone."
        });
        riskProfile.binaryRisk += 2;
      }
    }

    // ------------------------------------------------------------------------
    // PASS 9 — TrustCore context (low trust / constrained trust)
// ------------------------------------------------------------------------
    const trustLevel = trustProfile.level ?? 0;
    const forbiddenCount = Array.isArray(ethics.forbiddenActions)
      ? ethics.forbiddenActions.length
      : 0;

    if (trustLevel < 10) {
      violations.push({
        type: "low_trustcore_context",
        severity: 3,
        trustLevel,
        note: "Expansion executed under low TrustCore level."
      });
      riskProfile.trustCoreRisk += 3;
    }

    if (forbiddenCount > 0) {
      violations.push({
        type: "ethics_constrained_context",
        severity: 3,
        forbiddenCount,
        note: "Expansion executed while EthicsBoot had active forbidden actions."
      });
      riskProfile.trustCoreRisk += 2;
    }

    // ------------------------------------------------------------------------
    // PASS 10 — HyperFrame / Continuance context
    // ------------------------------------------------------------------------
    if (hyperFrame) {
      const latency = hyperFrame.latency ?? 0;
      const frameDrops = hyperFrame.frameDrops ?? 0;

      if (latency > 50 || frameDrops > 3) {
        violations.push({
          type: "hyperframe_instability",
          severity: 2,
          latency,
          frameDrops,
          note: "Expansion executed during HyperFrame instability."
        });
        riskProfile.hyperFrameRisk += 2;
      }
    }

    if (continuanceFrame) {
      const pressure = continuanceFrame.pressure ?? 0;
      const stallCount = continuanceFrame.stallCount ?? 0;

      if (pressure > 40 || stallCount > 2) {
        violations.push({
          type: "continuance_instability",
          severity: 2,
          pressure,
          stallCount,
          note: "Expansion executed during Continuance instability."
        });
        riskProfile.continuanceRisk += 2;
      }
    }

    // ------------------------------------------------------------------------
    // Compliance score (0–100)
// ------------------------------------------------------------------------
    const totalRisk =
      riskProfile.bypassJury +
      riskProfile.bypassUser +
      riskProfile.aiOriginInfluence +
      riskProfile.dominance +
      riskProfile.drift +
      riskProfile.anomaly +
      riskProfile.stress +
      riskProfile.bandRisk +
      riskProfile.meshBandRisk +
      riskProfile.pulseBandRisk +
      riskProfile.binaryRisk +
      riskProfile.trustCoreRisk +
      riskProfile.hyperFrameRisk +
      riskProfile.continuanceRisk;

    const complianceScore = Math.max(0, 100 - totalRisk * 6);
    const compliant = complianceScore >= 70;

    // ------------------------------------------------------------------------
    // ER‑ready snapshot
    // ------------------------------------------------------------------------
    const snapshot = Object.freeze({
      meta: PulseTrustExpansionComplianceMeta,
      schema: PulseTrustExpansionComplianceMeta.schema,
      ts: resolvedTs,
      expansionSessionId,
      violations: Object.freeze(violations),
      riskProfile: Object.freeze(riskProfile),
      complianceScore,
      compliant,
      environmentContext: Object.freeze({
        rawView,
        aiView,
        delta,
        patterns,
        advantage,
        bandSnapshot,
        meshBand,
        pulseBand,
        binaryVitals,
        trustProfile,
        ethics,
        hyperFrame,
        continuanceFrame
      })
    });

    return snapshot;
  }

  return Object.freeze({
    meta: PulseTrustExpansionComplianceMeta,
    evaluateExpansionBehavior
  });
}

export default createExpansionCompliance;
