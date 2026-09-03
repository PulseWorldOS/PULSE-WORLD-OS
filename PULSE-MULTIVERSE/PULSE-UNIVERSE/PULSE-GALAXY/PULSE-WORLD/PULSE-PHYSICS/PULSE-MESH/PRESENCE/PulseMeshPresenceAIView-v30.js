// ============================================================================
// FILE: PulseMeshPresenceAIView-v30-OMNI-SURGE.js
// PULSE OS v30 — PRESENCE-Evo-MESH-ORBITAL-ADVANTAGE+++
// ---------------------------------------------------------------------------
//  PRESENCE AI VIEW (MACHINE-FACING, OMNI-SURGE FIELD)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Canonical AI-facing presence surface for Mesh + Orbital layers.
//    • Exposes presence, mesh, orbital, mastery, age, advantage, liquidity,
//      pressure, fallback, region-shard, hop-horizon, and exponential reach.
//    • Zero-mutation, deterministic, drift-proof, unified-advantage-field v30.
//    • Safe for Overmind, EarnEngine, MentorEngine, JobEngine, MeshCognition.
//
//  NEW IN v30 OMNI-SURGE:
//    • Orbital-aware (satelliteReach, orbitalLatencyBand, orbitalPressure)
//    • Ground-station-aware (groundStationId, fallbackReady)
//    • Exponential mesh reach (meshHopHorizon, meshExpansionFactor)
//    • Region-shard + compute-liquidity exposure
//    • Earn-liquidity + advantage-cascade v30
//    • Fallback-path metadata (satellite, terrestrial, mesh)
//    • Zero-compute, zero-network, zero-mutation
//
// ============================================================================

export function createPresenceAIView({
  PulseSenses,
  PresenceScanner,
  SystemClock,
  IdentityDirectory,
  PublicProfile,
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — v30 OMNI-SURGE
  // -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceAIView",
    role: "PRESENCE_AI_API",
    version: "30.0-OMNI-SURGE",
    evo: {
      presenceAware: true,
      meshAware: true,
      orbitalAware: true,
      satelliteAware: true,
      groundStationAware: true,
      masteryAware: true,
      skillLevelAware: true,
      systemAgeAware: true,
      aiView: true,
      dualBand: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      driftProof: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      meshPressureAware: true,
      flowPressureAware: true,
      orbitalPressureAware: true,
      liquidityAware: true,
      regionShardAware: true,
      hopHorizonAware: true,
      exponentialReachAware: true,
      fallbackAware: true,
      safeRouteFree: true
    }
  });

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  const clamp01 = (v) =>
    typeof v === "number" && !Number.isNaN(v)
      ? Math.max(0, Math.min(1, v))
      : 0;

  const classifyAgeCategory = (days) => {
    if (typeof days !== "number" || Number.isNaN(days)) return "unknown";
    if (days < 30) return "new";
    if (days < 365) return "mature";
    return "veteran";
  };

  // -------------------------------------------------------------------------
  // SAFE NEARBY PRESENCE (AI-READABLE, v30 OMNI-SURGE)
  // -------------------------------------------------------------------------
  function buildNearbyPresenceAI() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => ({
        uid: p.uid,
        displayName: IdentityDirectory.safeName(p.uid),

        // Mesh topology
        distance: p.distance ?? null,
        meshHops: p.meshHops ?? null,
        meshDistance: p.meshDistance ?? null,
        meshHopHorizon: p.meshHopHorizon ?? 128,
        meshExpansionFactor: p.meshExpansionFactor ?? 1.0,
        meshProximity: p.meshProximity ?? null,

        // Presence bands
        presenceBand: p.presenceBand ?? "symbolic",
        meshPresenceBand: p.meshPresenceBand ?? null,

        // System age
        systemAge: p.systemAge ?? null,
        systemAgeCategory: p.systemAgeCategory ?? null,

        // Skill + mastery
        skillLevel: p.skillLevel ?? null,
        masteryTier: p.masteryTier ?? null,

        // Mesh identity
        meshRole: p.meshRole ?? null,
        meshIdentity: p.meshIdentity ?? null,

        // Advantage
        advantageField: p.advantageField ?? null,
        advantageBand: p.advantageBand ?? null,

        // Pressure fields
        meshPressure: p.meshPressure ?? null,
        flowPressure: p.flowPressure ?? null,
        orbitalPressure: p.orbitalPressure ?? null,

        // Orbital / satellite
        satelliteReach: p.satelliteReach ?? null,          // 0..1
        orbitalLatencyBand: p.orbitalLatencyBand ?? null,
        orbitalWindowBand: p.orbitalWindowBand ?? null,
        groundStationId: p.groundStationId ?? null,
        fallbackReady: p.fallbackReady ?? false,

        // Region + liquidity
        regionId: p.regionId ?? null,
        computeLiquidity: p.computeLiquidity ?? null,      // 0..1
        earnLiquidity: p.earnLiquidity ?? null,            // 0..1

        // Misc
        signalStrength: p.signalStrength ?? null,
        mentorAffinity: p.mentorAffinity ?? null,
        publicDetails: PublicProfile.safeDetails(p.uid)
      }));
    } catch (err) {
      warn("presence-ai", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // SYSTEM AGE (SELF, AI-SAFE)
  // -------------------------------------------------------------------------
  function getSystemAgeAI() {
    try {
      const uptimeSeconds = SystemClock.uptimeSeconds();
      const organismAgeDays = SystemClock.organismAgeDays();
      const organismAgeCategory = classifyAgeCategory(organismAgeDays);

      return {
        uptimeSeconds,
        organismAgeDays,
        organismAgeCategory
      };
    } catch (err) {
      warn("presence-ai", "SystemClock unavailable", err);
      return {
        uptimeSeconds: 0,
        organismAgeDays: 0,
        organismAgeCategory: "unknown"
      };
    }
  }

  // -------------------------------------------------------------------------
  // AI VIEW BUILDER — v30 OMNI-SURGE
  // -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const senses = PulseSenses.forAI(entryNodeId, context);
    const nearby = buildNearbyPresenceAI();
    const age = getSystemAgeAI();

    const meshPressure = clamp01(senses.mesh.pressure ?? 0);
    const flowPressure = clamp01(senses.flow.pressure ?? 0);
    const orbitalPressure = clamp01(senses.orbital.pressure ?? 0);

    const pressureField = {
      meshPressure,
      flowPressure,
      orbitalPressure,
      combinedPressure: clamp01(
        (meshPressure + flowPressure + orbitalPressure) / 3
      )
    };

    return Object.freeze({
      meta,

      // organism state
      performance_percent: senses.performance_percent,
      performance_hint: senses.performance_hint,
      stability: senses.stability,
      drift_risk: senses.drift_risk,

      // environment
      environment: senses.environment,
      safety: senses.safety,
      hormones: senses.hormones,
      aura: senses.aura,

      // mesh + orbital
      mesh: senses.mesh,
      orbital: senses.orbital,
      sdn: senses.sdn,
      mode: senses.mode,
      presence: senses.presence,

      // unified pressure field
      pressureField,

      // narrative
      narrative_for_ai: senses.narrative_for_ai,

      // presence lists
      nearbyPresence: nearby,
      systemAge: age
    });
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta,
    build
  });
}
// ============================================================================
// PresenceAIView EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseMeshPresenceAIView = {
  create: createPresenceAIView,
  version: "30.0-OMNI-SURGE",
  layer: "PresenceAIView"
};

export default PulseMeshPresenceAIView;
