// ============================================================================
// FILE: PulseMeshPresenceJobView-v30-IMMORTAL+++.js
// PULSE OS v30 — PRESENCE-Evo-MESH-AWARE-IMMORTAL+++
// ---------------------------------------------------------------------------
//  PRESENCE JOB VIEW (HUMAN + AI HYBRID, IMMORTAL-GRADE v30+++)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Unified presence/job surface merging:
//        - PresenceAwarenessPage-v30 (human HUD)
//        - PresenceAIView-v30 (machine AI view)
//        - PresenceScanner (raw presence)
//        - Earn/job readiness context
//    • v30: mesh-tier-aware, long-range-aware, bluetooth-presence-aware,
//           binary-transfer-aware, artery-aware (read-only).
//    • Feeds:
//        - PresenceJobAssignment-v30
//        - MentorUpgradeRequest-v30
//        - PowerUserRanking-v30
//        - Overmind social/earn routing
//
//  GUARANTEES (v30 IMMORTAL+++):
//    • Deterministic — same input → same output
//    • Drift-proof — no ordering drift
//    • Zero-mutation — never mutates presence/profile objects
//    • Zero-compute — metadata shaping only
//    • Zero-network — no external fetch
//    • Dual-band — symbolic + binary + dual
//    • Mesh-aware — hops, distance, meshPresenceBand
//    • Mesh-tier-aware — host / satellite / relay
//    • Long-range-aware — longRangeAffinity + longRangeCandidate
//    • Bluetooth-aware — BLE presence + linkQuality
//    • Binary-transfer-aware — binaryTransferBias
//    • Mastery-aware — skillLevel + masteryTier
//    • System-age-aware — ageCategory
//    • Advantage-aware — advantageField + advantageBand + advantageBias
//    • Pressure-aware — meshPressure + flowPressure
//    • Earn-aware — jobReadiness from earner_context
//
//  CONTRACT:
//    ALWAYS:
//      • PresenceAwareness
//      • PresenceAIView
//      • PowerUserRanking
//      • PulseMeshPresenceRelay
//
//    NEVER:
//      • legacyPresenceJobView
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================



// ============================================================================
// FACTORY — v30 IMMORTAL+++
// ============================================================================
export function createPresenceJobView({
  PresenceAwarenessPage,
  PresenceAIView,
  PresenceScanner,
  IdentityDirectory,
  SystemClock,
  PublicProfile,
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL+++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceJobView",
    role: "PRESENCE_JOB_SURFACE",
    version: "30.0-IMMORTAL+++",
    evo: {
      presenceAware: true,
      earnAware: true,
      tendonAware: true,
      meshAware: true,
      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      binaryTransferAware: true,
      masteryAware: true,
      skillLevelAware: true,
      systemAgeAware: true,
      dualBand: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      driftProof: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      meshPressureAware: true,
      flowPressureAware: true,
      safeRouteFree: true,
      futureEvolutionReady: true
    }
  });

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function classifyAgeCategory(days) {
    if (typeof days !== "number" || Number.isNaN(days)) return "unknown";
    if (days < 30) return "new";
    if (days < 365) return "mature";
    return "veteran";
  }

  function clamp01(v) {
    if (typeof v !== "number" || Number.isNaN(v)) return 0;
    return Math.max(0, Math.min(1, v));
  }

  // -------------------------------------------------------------------------
  // NEARBY PRESENCE (JOB-READY, v30+++)
// -------------------------------------------------------------------------
  function buildNearbyPresenceJobList() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => {
        const displayName = IdentityDirectory.safeName(p.uid);
        const systemAge = SystemClock.safeAgeOf(p.uid);
        const publicDetails = PublicProfile.safeDetails(p.uid);

        const systemAgeCategory = classifyAgeCategory(systemAge);

        const skillLevel = p.skillLevel ?? null;
        const masteryTier = p.masteryTier ?? null;

        const meshRole = p.meshRole ?? publicDetails.role ?? null;
        const meshIdentity = p.meshIdentity ?? publicDetails.rank ?? null;
        const meshTier = p.meshTier ?? "host";

        const powerUser =
          systemAgeCategory === "veteran" ||
          p.presenceBand === "binary" ||
          publicDetails.rank === "mentor" ||
          publicDetails.role === "teacher" ||
          (skillLevel >= 4) ||
          (masteryTier >= 3);

        const longRangeAffinity = typeof p.longRangeAffinity === "number"
          ? clamp01(p.longRangeAffinity)
          : null;

        const binaryTransferBias = typeof p.binaryTransferBias === "number"
          ? clamp01(p.binaryTransferBias)
          : null;

        const advantageBias = typeof p.advantageBias === "number"
          ? clamp01(p.advantageBias)
          : null;

        const bluetoothPresence = p.bluetoothPresence
          ? {
              deviceId: p.bluetoothPresence.deviceId || null,
              linkQuality: typeof p.bluetoothPresence.linkQuality === "number"
                ? clamp01(p.bluetoothPresence.linkQuality)
                : null,
              proximityTier: p.bluetoothPresence.proximityTier || null,
              transport: p.bluetoothPresence.transport || null
            }
          : null;

        return {
          uid: p.uid,
          displayName,

          distance: p.distance,
          meshHops: p.meshHops ?? null,
          meshDistance: p.meshDistance ?? null,

          presenceBand: p.presenceBand ?? "symbolic",
          meshPresenceBand: p.meshPresenceBand ?? null,

          systemAge,
          systemAgeCategory,

          skillLevel,
          masteryTier,

          meshRole,
          meshIdentity,
          meshTier,

          advantageField: p.advantageField ?? null,
          advantageBand: p.advantageBand ?? null,
          advantageBias,

          meshPressure: p.meshPressure ?? null,
          flowPressure: p.flowPressure ?? null,

          signalStrength: p.signalStrength ?? null,

          longRangeAffinity,
          longRangeCandidate: !!p.longRangeCandidate,
          binaryTransferBias,

          bluetoothPresence,
          publicDetails,
          powerUser
        };
      });

    } catch (err) {
      warn("presence-job", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // JOB READINESS (v30+++)
// -------------------------------------------------------------------------
  function computeJobReadiness(impulse) {
    if (!impulse || !impulse.flags) return "unknown";

    const ctx = impulse.flags.earner_context || {};
    const cls = ctx.class || "medium";
    const urgency = ctx.urgency ?? 0.5;
    const volatility = ctx.volatility ?? 0.5;
    const band = ctx.presence_band || "symbolic";

    let score = 0;

    if (cls === "heavy") score += 2;
    if (cls === "medium") score += 1;

    if (urgency > 0.9) score += 2;
    else if (urgency > 0.6) score += 1;

    if (volatility < 0.05) score += 2;
    else if (volatility < 0.2) score += 1;

    if (band === "binary") score += 2;
    if (band === "dual") score += 1;

    if (score >= 6) return "high";
    if (score >= 3) return "medium";
    if (score >= 1) return "low";
    return "unknown";
  }

  // -------------------------------------------------------------------------
  // BUILD JOB VIEW — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const awareness = PresenceAwarenessPage.build(entryNodeId, context);
    const aiView = PresenceAIView.build(entryNodeId, context);

    const nearby = buildNearbyPresenceJobList();
    const jobReadiness = computeJobReadiness(context.impulse);

    return Object.freeze({
      meta,

      // HUMAN-FACING PRESENCE HUD
      performance: awareness.performance,
      stability: awareness.stability,
      drift: awareness.drift,
      environment: awareness.environment,
      safety: awareness.safety,
      hormones: awareness.hormones,
      aura: awareness.aura,
      mesh: awareness.mesh,
      sdn: awareness.sdn,
      mode: awareness.mode,
      narrative: awareness.narrative,
      pressureField: awareness.pressureField,
      meshArtery: awareness.meshArtery,

      // JOB + PRESENCE SURFACE
      nearbyPresence: nearby,
      systemAge: awareness.systemAge,
      jobReadiness,

      // MACHINE-FACING AI PRESENCE
      aiPresence: {
        performance_percent: aiView.performance_percent,
        stability: aiView.stability,
        drift_risk: aiView.drift_risk,
        environment: aiView.environment,
        presence: aiView.presence,
        nearbyPresence: aiView.nearbyPresence,
        pressureField: aiView.pressureField
      }
    });
  }

  return Object.freeze({
    meta,
    build
  });
}
