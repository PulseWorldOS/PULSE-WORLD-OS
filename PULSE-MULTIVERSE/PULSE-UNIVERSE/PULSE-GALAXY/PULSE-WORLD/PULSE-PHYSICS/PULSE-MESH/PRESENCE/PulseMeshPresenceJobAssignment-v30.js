// ============================================================================
// FILE: PulseMeshPresenceJobAssignment-v30-IMMORTAL+++.js
// PULSE OS v30 — PRESENCE-Evo-MESH-AWARE-IMMORTAL+++
// ---------------------------------------------------------------------------
//  PRESENCE-BASED JOB ASSIGNMENT ENGINE (IMMORTAL-GRADE v30+++)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Deterministically assigns jobs to nearby presence nodes.
//    • Reads presence, mesh, mastery, skill, age, advantage, band, identity.
//    • v30: mesh-tier-aware, long-range-aware, bluetooth-presence-aware,
//           binary-transfer-aware, artery-aware (read-only).
//    • Uses PresenceJobView-v30 as the canonical presence/job surface.
//    • Uses JobCatalog-v30 as deterministic job pool provider.
//    • Zero mutation, zero compute, zero drift.
//
//  ARCHITECTURAL POSITION:
//    • Lives in presence_social layer.
//    • Reads:
//        - PresenceJobView-v30 (presence, mesh, readiness, advantage, tier)
//        - JobCatalog-v30 (deterministic job definitions)
//    • Feeds:
//        - Earn pipelines
//        - Mentor/learner flows
//        - Overmind task routing
//
//  GUARANTEES (v30 IMMORTAL+++):
//    • Deterministic — same input → same output.
//    • Drift-proof — no scoring drift.
//    • Zero-mutation — never mutates presence or job objects.
//    • Zero-network — no external fetch.
//    • Dual-band — symbolic + binary + dual.
//    • Mesh-aware — meshRole, meshIdentity, meshProximity.
//    • Mesh-tier-aware — host / satellite / relay.
//    • Long-range-aware — longRangeAffinity / longRangeCandidate.
//    • Bluetooth-aware — BLE presence + linkQuality.
//    • Binary-transfer-aware — binaryTransferBias.
//    • Mastery-aware — skillLevel + masteryTier.
//    • Advantage-aware — advantageField + advantageBias.
//    • System-age-aware — ageCategory influences job type.
//    • Pressure-aware — meshPressure + flowPressure influence scoring.
//    • Future-evolution-ready — v30 kernel alignment.
//
//  CONTRACT:
//    ALWAYS:
//      • PresenceAwareness
//      • PresenceAIView / PresenceJobView
//      • PowerUserRanking
//      • PulseMeshPresenceRelay
//
//    NEVER:
//      • legacyJobAssignment
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================

// META EXPORTS


// ============================================================================
// ORGAN FACTORY — v30 IMMORTAL+++
// ============================================================================
export function createPresenceJobAssignment({
  PresenceJobView,
  JobCatalog,
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL+++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceJobAssignment",
    role: "JOB_ASSIGNMENT_ENGINE",
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
      arteryDeterministic: true,
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

  // -------------------------------------------------------------------------
  // JOB POOL SELECTION — v30 deterministic
  // -------------------------------------------------------------------------
  function selectJobPool(jobReadiness) {
    if (jobReadiness === "high")   return JobCatalog.forHighReadiness();
    if (jobReadiness === "medium") return JobCatalog.forMediumReadiness();
    if (jobReadiness === "low")    return JobCatalog.forLowReadiness();
    return JobCatalog.forUnknownReadiness
      ? JobCatalog.forUnknownReadiness()
      : JobCatalog.forLowReadiness();
  }

  // -------------------------------------------------------------------------
  // SCORING ENGINE — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  function scoreJobForPresence(job, person) {
    let score = 0;
    const tags = job.tags || [];

    // -----------------------------------------------------
    // Mentor / Learner alignment
    // -----------------------------------------------------
    if (person.powerUser && tags.includes("mentor")) score += 3;
    if (!person.powerUser && tags.includes("learner")) score += 3;

    // -----------------------------------------------------
    // Presence band alignment
    // -----------------------------------------------------
    if (person.presenceBand === "binary"   && tags.includes("precision")) score += 2;
    if (person.presenceBand === "dual"     && tags.includes("bridge"))    score += 2;
    if (person.presenceBand === "symbolic" && tags.includes("creative"))  score += 2;

    // -----------------------------------------------------
    // System age alignment
    // -----------------------------------------------------
    switch (person.systemAgeCategory) {
      case "veteran":
        if (tags.includes("advanced")) score += 2;
        if (tags.includes("mentor"))   score += 1;
        break;
      case "mature":
        if (tags.includes("core")) score += 2;
        break;
      case "new":
        if (tags.includes("onboarding")) score += 2;
        break;
    }

    // -----------------------------------------------------
    // Skill + Mastery alignment
    // -----------------------------------------------------
    const skill = person.skillLevel || 0;
    const mastery = person.masteryTier || 0;

    if (skill >= 4 && tags.includes("high_skill")) score += 2;
    if (skill <= 2 && tags.includes("low_skill"))  score += 2;

    if (mastery >= 4 && tags.includes("high_mastery")) score += 2;
    if (mastery <= 2 && tags.includes("low_mastery"))  score += 2;

    // -----------------------------------------------------
    // Mesh role / identity alignment
    // -----------------------------------------------------
    if (person.meshRole === "teacher" && tags.includes("teaching")) score += 2;
    if (person.meshRole === "guide"   && tags.includes("guidance")) score += 2;

    if (person.meshIdentity === "mentor"      && tags.includes("mentor"))       score += 1;
    if (person.meshIdentity === "contributor" && tags.includes("contribution")) score += 1;
    if (person.meshIdentity === "learner"     && tags.includes("learning"))     score += 1;

    // -----------------------------------------------------
    // Mesh tier alignment (host / satellite / relay)
// -----------------------------------------------------
    if (person.meshTier === "host"      && tags.includes("host_tier"))      score += 2;
    if (person.meshTier === "satellite" && tags.includes("satellite_tier")) score += 2;
    if (person.meshTier === "relay"     && tags.includes("relay_tier"))     score += 2;

    // -----------------------------------------------------
    // Advantage field + bias alignment
    // -----------------------------------------------------
    if (person.advantageField === "elite")  score += 3;
    if (person.advantageField === "high")   score += 2;
    if (person.advantageField === "medium") score += 1;

    if (typeof person.advantageBias === "number") {
      score += clamp01(person.advantageBias) * 2;
    }

    // -----------------------------------------------------
    // Mesh / Flow pressure awareness
    // -----------------------------------------------------
    const meshP = person.meshPressure ?? 0;
    const flowP = person.flowPressure ?? 0;
    const combined = (meshP + flowP) / 2;

    if (combined >= 0.7 && tags.includes("stable"))       score += 2;
    if (combined >= 0.4 && tags.includes("low_pressure")) score += 1;

    // -----------------------------------------------------
    // Long-range awareness (v30)
// -----------------------------------------------------
    const longRangeAffinity = clamp01(person.longRangeAffinity ?? 0);
    if (person.longRangeCandidate && tags.includes("long_range")) {
      score += 2 + longRangeAffinity;
    } else if (longRangeAffinity > 0.5 && tags.includes("edge_reach")) {
      score += 1;
    }

    // -----------------------------------------------------
    // Binary transfer awareness (v30)
// -----------------------------------------------------
    const binaryBias = clamp01(person.binaryTransferBias ?? 0);
    if (binaryBias > 0.5 && tags.includes("binary_heavy")) score += 2;
    if (binaryBias > 0.2 && tags.includes("binary_friendly")) score += 1;

    // -----------------------------------------------------
    // Bluetooth / BLE presence awareness (v30)
// -----------------------------------------------------
    const bt = person.bluetoothPresence || null;
    if (bt) {
      const linkQ = clamp01(bt.linkQuality ?? 0);
      if (bt.transport === "ble" && linkQ > 0.5 && tags.includes("ble_mesh")) {
        score += 2;
      }
      if (bt.proximityTier === "near" && tags.includes("local_realtime")) {
        score += 1;
      }
    }

    return score;
  }

  // -------------------------------------------------------------------------
  // ASSIGNMENT ENGINE — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  function assign(entryNodeId, context = {}) {
    const view = PresenceJobView.build(entryNodeId, context);
    const nearby = view.nearbyPresence || [];
    const jobReadiness = view.jobReadiness || "unknown";

    const pool = selectJobPool(jobReadiness);
    const assignments = [];

    for (const person of nearby) {
      let bestJob = null;
      let bestScore = -Infinity;

      for (const job of pool) {
        const s = scoreJobForPresence(job, person);
        if (s > bestScore) {
          bestScore = s;
          bestJob = job;
        }
      }

      if (bestJob) {
        assignments.push({
          meta,
          uid: person.uid,
          displayName: person.displayName,

          jobId: bestJob.id,
          jobTitle: bestJob.title,
          jobTags: bestJob.tags,

          presenceBand: person.presenceBand,
          systemAge: person.systemAge,
          systemAgeCategory: person.systemAgeCategory,
          powerUser: person.powerUser,
          skillLevel: person.skillLevel,
          masteryTier: person.masteryTier,

          meshRole: person.meshRole,
          meshIdentity: person.meshIdentity,
          meshTier: person.meshTier,
          meshProximity: person.meshProximity,

          advantageField: person.advantageField,
          advantageBias: person.advantageBias,

          meshPressure: person.meshPressure,
          flowPressure: person.flowPressure,

          longRangeAffinity: person.longRangeAffinity,
          longRangeCandidate: person.longRangeCandidate,
          binaryTransferBias: person.binaryTransferBias,
          bluetoothPresence: person.bluetoothPresence || null,

          score: bestScore
        });
      }
    }

    return Object.freeze({
      meta,
      jobReadiness,
      assignments
    });
  }

  return Object.freeze({
    meta,
    assign
  });
}
