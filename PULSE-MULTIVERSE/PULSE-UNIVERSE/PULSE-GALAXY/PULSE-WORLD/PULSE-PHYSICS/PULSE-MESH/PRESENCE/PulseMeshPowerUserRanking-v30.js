// ============================================================================
// FILE: PowerUserRanking-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE OS v30 — POWER USER RANKING (GLOBAL-MESH-SATELLITE-AWARE)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Deterministic power-user ranking across local + global + satellite mesh.
//    • Scores presence nodes for: trust, reach, stability, redundancy, advantage.
//    • Pure metadata-only scoring — zero payload mutation.
//    • v30: satellite-aware, fallback-aware, orbit-aware, multi-band-aware.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






export function createPowerUserRankingV30({ log, warn, error } = {}) {

  // -------------------------------------------------------------------------
  // META BLOCK — v30 IMMORTAL-ADVANTAGE+++
  // -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PowerUserRanking",
    role: "POWER_USER_RANKING",
    version: "30.0-IMMORTAL-ADVANTAGE+++",
    evo: {
      // Presence / mesh
      presenceAware: true,
      meshAware: true,
      globalMeshAware: true,
      meshPressureAware: true,
      flowPressureAware: true,

      // Mastery / skill / age
      masteryAware: true,
      skillLevelAware: true,
      systemAgeAware: true,
      socialAware: true,

      // Bands
      dualBand: true,
      multiBandAware: true,
      binaryAware: true,
      symbolicAware: true,
      presenceBandAware: true,

      // Satellite / orbit / fallback
      satelliteAware: true,
      orbitAware: true,
      groundStationAware: true,
      fallbackAware: true,
      redundancyAware: true,
      pathDiversityAware: true,

      // Advantage field
      unifiedAdvantageField: true,
      deterministicField: true,
      driftProof: true,

      // Safety
      zeroCompute: true,          // Conceptual: simple deterministic math only
      zeroMutation: true,         // Never mutates presence objects
      zeroNetworkFetch: true,
      safeRouteFree: true,
      futureEvolutionReady: true
    }
  });

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function clamp01(v) {
    if (typeof v !== "number" || Number.isNaN(v)) return 0;
    return Math.max(0, Math.min(1, v));
  }

  function ageScore(person) {
    switch (person.systemAgeCategory) {
      case "founder": return 5;
      case "veteran": return 4;
      case "mature":  return 3;
      case "stable":  return 2;
      case "new":     return 0;
      default:        return 0;
    }
  }

  function bandScore(person) {
    switch (person.presenceBand) {
      case "binary":   return 4;
      case "dual":     return 3;
      case "symbolic": return 1;
      default:         return 0;
    }
  }

  function multiBandScore(person) {
    // optional: person.bands = ["binary","symbolic",...]
    const bands = Array.isArray(person.bands) ? person.bands : [];
    const unique = new Set(bands);
    if (unique.size >= 3) return 3;
    if (unique.size === 2) return 2;
    if (unique.size === 1) return 1;
    return 0;
  }

  function skillScore(person) {
    const s = person.skillLevel || 0;
    return Math.max(0, Math.min(5, s));
  }

  function masteryScore(person) {
    const m = person.masteryTier || 0;
    return Math.max(0, Math.min(5, m));
  }

  function meshRoleScore(person) {
    switch (person.meshRole) {
      case "teacher": return 4;
      case "guide":   return 3;
      case "helper":  return 2;
      case "router":  return 2;
      default:        return 0;
    }
  }

  function meshIdentityScore(person) {
    switch (person.meshIdentity) {
      case "mentor":      return 4;
      case "contributor": return 2;
      case "learner":     return 1;
      default:            return 0;
    }
  }

  function powerUserScore(person) {
    return person.powerUser ? 3 : 0;
  }

  function advantageScore(person) {
    const field = person.advantageField || person.advantageBand || null;
    if (field === "elite")  return 5;
    if (field === "high")   return 3;
    if (field === "medium") return 2;
    if (field === "low")    return 1;
    return 0;
  }

  function proximityScore(person) {
    const p = clamp01(person.meshProximity ?? 0);
    if (p >= 0.9) return 4;
    if (p >= 0.6) return 3;
    if (p >= 0.3) return 2;
    if (p > 0)    return 1;
    return 0;
  }

  function pressureScore(person) {
    const meshP = clamp01(person.meshPressure ?? 0);
    const flowP = clamp01(person.flowPressure ?? 0);
    const combined = clamp01((meshP + flowP) / 2);

    // High pressure → slightly reduce rank (overloaded).
    if (combined >= 0.9) return -3;
    if (combined >= 0.7) return -2;
    if (combined >= 0.5) return -1;
    return 0;
  }

  // -------------------------------------------------------------------------
  // v30: SATELLITE / GLOBAL / FALLBACK AWARENESS
  // -------------------------------------------------------------------------
  function satelliteReachScore(person) {
    // person.satelliteReach: 0..1 (coverage / latency-normalized)
    const r = clamp01(person.satelliteReach ?? 0);
    if (r >= 0.9) return 4;
    if (r >= 0.6) return 3;
    if (r >= 0.3) return 2;
    if (r > 0)    return 1;
    return 0;
  }

  function orbitTierScore(person) {
    // person.orbitTier: "l1", "l2", "edge", "ground", etc.
    switch (person.orbitTier) {
      case "l1":     return 4;
      case "l2":     return 3;
      case "edge":   return 2;
      case "ground": return 1;
      default:       return 0;
    }
  }

  function groundStationAffinityScore(person) {
    // person.groundStationAffinity: 0..1 (how well they anchor to ground infra)
    const g = clamp01(person.groundStationAffinity ?? 0);
    if (g >= 0.8) return 3;
    if (g >= 0.5) return 2;
    if (g > 0)    return 1;
    return 0;
  }

  function fallbackScore(person) {
    // person.fallbackPaths: integer count of independent fallback routes
    const n = typeof person.fallbackPaths === "number" ? person.fallbackPaths : 0;
    if (n >= 4) return 4;
    if (n >= 3) return 3;
    if (n >= 2) return 2;
    if (n >= 1) return 1;
    return 0;
  }

  function redundancyScore(person) {
    // person.pathDiversity: 0..1 (logical + physical diversity)
    const d = clamp01(person.pathDiversity ?? 0);
    if (d >= 0.8) return 4;
    if (d >= 0.5) return 3;
    if (d >= 0.3) return 2;
    if (d > 0)    return 1;
    return 0;
  }

  function mentorAffinityScore(person) {
    if (person.mentorAffinity === "high")   return 3;
    if (person.mentorAffinity === "medium") return 2;
    if (person.mentorAffinity === "low")    return 1;
    return 0;
  }

  function classifyTier(rawScore) {
    if (rawScore >= 40) return "immortal_elite";
    if (rawScore >= 30) return "elite";
    if (rawScore >= 22) return "high";
    if (rawScore >= 14) return "medium";
    if (rawScore > 0)   return "emerging";
    return "unranked";
  }

  // -------------------------------------------------------------------------
  // DETERMINISTIC RANK SCORE — v30
  // -------------------------------------------------------------------------
  function computeRankScore(person) {
    const breakdown = {
      age: ageScore(person),
      band: bandScore(person),
      multiBand: multiBandScore(person),
      skill: skillScore(person),
      mastery: masteryScore(person),
      meshRole: meshRoleScore(person),
      meshIdentity: meshIdentityScore(person),
      powerUser: powerUserScore(person),
      advantage: advantageScore(person),
      proximity: proximityScore(person),
      pressure: pressureScore(person),

      satelliteReach: satelliteReachScore(person),
      orbitTier: orbitTierScore(person),
      groundStationAffinity: groundStationAffinityScore(person),
      fallback: fallbackScore(person),
      redundancy: redundancyScore(person),

      mentorAffinity: mentorAffinityScore(person)
    };

    const raw =
      breakdown.age +
      breakdown.band +
      breakdown.multiBand +
      breakdown.skill +
      breakdown.mastery +
      breakdown.meshRole +
      breakdown.meshIdentity +
      breakdown.powerUser +
      breakdown.advantage +
      breakdown.proximity +
      breakdown.pressure +
      breakdown.satelliteReach +
      breakdown.orbitTier +
      breakdown.groundStationAffinity +
      breakdown.fallback +
      breakdown.redundancy +
      breakdown.mentorAffinity;

    // Rough max (no pressure penalty): keep deterministic + simple.
    const maxPossible =
      5 + // age
      4 + // band
      3 + // multiBand
      5 + // skill
      5 + // mastery
      4 + // meshRole
      4 + // meshIdentity
      3 + // powerUser
      5 + // advantage
      4 + // proximity
      0 + // pressure (can be negative)
      4 + // satelliteReach
      4 + // orbitTier
      3 + // groundStationAffinity
      4 + // fallback
      4 + // redundancy
      3;  // mentorAffinity

    const normalized = maxPossible > 0 ? clamp01(raw / maxPossible) : 0;
    const tier = classifyTier(raw);

    return {
      raw,
      normalized,
      tier,
      breakdown
    };
  }

  // -------------------------------------------------------------------------
  // EXPLAIN RANK — human-readable breakdown (metadata-only)
// -------------------------------------------------------------------------
  function explainRank(person) {
    const result = computeRankScore(person);
    return Object.freeze({
      meta,
      uid: person.uid,
      displayName: person.displayName,
      rankScore: result.raw,
      rankTier: result.tier,
      normalized: result.normalized,
      breakdown: result.breakdown
    });
  }

  // -------------------------------------------------------------------------
  // RANK NEARBY PRESENCE — v30
  // -------------------------------------------------------------------------
  function rankNearby(nearbyPresence) {
    const list = (nearbyPresence || []).map((p) => {
      const result = computeRankScore(p);
      return {
        ...p,
        rankScore: result.raw,
        rankTier: result.tier,
        rankNormalized: result.normalized,
        rankBreakdown: result.breakdown
      };
    });

    list.sort((a, b) => {
      if (b.rankScore !== a.rankScore) return b.rankScore - a.rankScore;
      return String(a.displayName || "").localeCompare(String(b.displayName || ""));
    });

    return list;
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta,
    rankNearby,
    computeRankScore,
    explainRank
  });
}

PulseRealm.MeshPowerUserRanking = {
  createPowerUserRankingV30
}