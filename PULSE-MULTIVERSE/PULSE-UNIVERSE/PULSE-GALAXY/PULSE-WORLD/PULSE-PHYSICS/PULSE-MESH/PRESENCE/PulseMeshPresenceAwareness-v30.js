// ============================================================================
// FILE: PulseMeshPresenceAwarenessPage-v30-IMMORTAL+++.js
// PULSE OS v30.0 — PRESENCE-Evo-MESH-AWARE-IMMORTAL+++
// ---------------------------------------------------------------------------
//  PRESENCE AWARENESS PAGE (HUMAN-FACING, IMMORTAL+++ HUD)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Human-facing presence HUD / “social radar” of the organism.
//    • Shows nearby users with safe, non-sensitive metadata only.
//    • Exposes skillLevel, masteryTier, systemAgeCategory, meshRole,
//      meshIdentity, presenceBand, distance, and advantage/pressure hints.
//    • Mirrors PresenceAIView / PresenceJobView fields in a human-readable way.
//    • v30: mesh-tier-aware, long-range-aware, bluetooth-presence-aware,
//           binary-transfer-aware, artery-aware (read-only).
//
//  ARCHITECTURAL POSITION:
//    • Lives in the Presence layer.
//    • Reads from:
//        - PulseSenses (vitals + environment)
//        - PresenceScanner (nearby presence nodes)
//        - SystemClock (system age)
//        - IdentityDirectory (safe display names)
//        - PublicProfile (safe public details)
//    • Feeds:
//        - PresenceAIView
//        - PowerUserRanking
//        - MentorUpgradeRequest
//        - PresenceJobView
//
//  GUARANTEES (v30-IMMORTAL+++):
//    • Deterministic — same input → same output.
//    • Drift-proof — no presence drift.
//    • Zero-mutation — never mutates presence objects.
//    • Zero-compute — pure metadata shaping.
//    • Zero-network — no external fetch.
//    • Dual-band — symbolic + binary presence bands.
//    • Mesh-aware — includes mesh hops + mesh presence band.
//    • Mesh-tier-aware — host / satellite / relay surfaced as metadata.
//    • Long-range-aware — longRangeAffinity / longRangeCandidate surfaced.
//    • Bluetooth-aware — BLE presence, proximity, linkQuality surfaced.
//    • Binary-transfer-aware — binaryTransferBias surfaced.
//    • Mastery-aware — exposes skillLevel + masteryTier.
//    • System-age-aware — exposes systemAgeCategory.
//    • Human-safe — no private data, no sensitive fields.
//    • Advantage-aware — shows advantageField / advantageBand / advantageBias.
//    • Pressure-aware — can surface meshPressure / flowPressure hints.
//    • Artery-aware — can surface meshArtery snapshot (read-only).
//
//  CONTRACT:
//    ALWAYS:
//      • PulsePresence
//      • PulseMeshPresenceRelay
//      • PresenceAIView / PresenceJobView
//
//    NEVER:
//      • legacyPresenceAwareness
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================

// 2 — EXPORT GENOME METADATA
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// FACTORY — v30 IMMORTAL+++
// ============================================================================
export function createPresenceAwarenessPage({
  PulseSenses,
  PresenceScanner,
  SystemClock,
  IdentityDirectory,
  PublicProfile,
  MeshEnvironment, // optional: symbolicMesh + artery + tier info
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL+++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceAwarenessPage",
    role: "PRESENCE_HUD",
    version: "30.0-IMMORTAL+++",
    evo: {
      presenceAware: true,            // Reads presence bands + state
      meshAware: true,                // Includes mesh hops + relay
      meshTierAware: true,            // host / satellite / relay
      longRangeAware: true,           // long-range affinity / candidate
      bluetoothPresenceAware: true,   // BLE presence + link quality
      binaryTransferAware: true,      // binary transfer bias surfaced
      masteryAware: true,             // Shows masteryTier + skillLevel
      skillLevelAware: true,          // SkillLevel (1–5)
      systemAgeAware: true,           // AgeCategory + founder era
      dualBand: true,                 // Binary + symbolic presence bands
      unifiedAdvantageField: true,    // Advantage field visible
      deterministicField: true,       // No randomness, no drift
      driftProof: true,               // Stable over time
      zeroCompute: true,              // Pure metadata shaping
      zeroMutation: true,             // Never mutates inputs
      zeroNetworkFetch: true,         // No external fetch
      meshPressureAware: true,        // Can surface mesh pressure hints
      flowPressureAware: true,        // Can surface flow pressure hints
      arteryDeterministic: true,      // Can surface artery snapshot
      safeRouteFree: true             // No safeRoute allowed
    }
  });

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function clamp01(v) {
    if (typeof v !== "number" || Number.isNaN(v)) return 0;
    return Math.max(0, Math.min(1, v));
  }

  function classifyAgeCategory(days) {
    if (typeof days !== "number" || Number.isNaN(days)) return "unknown";
    if (days < 30) return "new";
    if (days < 365) return "mature";
    return "veteran";
  }

  function safeMeshArterySnapshot() {
    try {
      if (!MeshEnvironment || typeof MeshEnvironment.getMeshArtery !== "function") {
        return null;
      }
      const artery = MeshEnvironment.getMeshArtery();
      // Pass through as-is; consumer is human-facing HUD, read-only.
      return artery || null;
    } catch (e) {
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // SAFE NEARBY PRESENCE (HUMAN-FACING, v30.0)
// -------------------------------------------------------------------------
//  INPUT:
//    • PresenceScanner.scanNearby()
//
//  OUTPUT (per person):
//    • displayName
//    • distance
//    • meshHops
//    • meshDistance
//    • presenceBand
//    • meshPresenceBand
//    • systemAge
//    • systemAgeCategory
//    • skillLevel
//    • masteryTier
//    • meshRole
//    • meshIdentity
//    • meshTier
//    • advantageField
//    • advantageBand
//    • advantageBias
//    • meshProximity
//    • meshPressure
//    • flowPressure
//    • signalStrength
//    • longRangeAffinity
//    • longRangeCandidate
//    • binaryTransferBias
//    • bluetoothPresence { deviceId, linkQuality, proximityTier, transport }
//    • publicDetails (safe)
// -------------------------------------------------------------------------
  function buildNearbyPresenceList() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => ({
        displayName: IdentityDirectory.safeName(p.uid),

        distance: p.distance ?? null,
        meshHops: p.meshHops ?? null,
        meshDistance: p.meshDistance ?? null,

        presenceBand: p.presenceBand ?? "symbolic",
        meshPresenceBand: p.meshPresenceBand ?? null,

        systemAge: SystemClock.safeAgeOf
          ? SystemClock.safeAgeOf(p.uid)
          : (p.systemAge ?? null),
        systemAgeCategory: p.systemAgeCategory ?? null,

        skillLevel: p.skillLevel ?? null,
        masteryTier: p.masteryTier ?? null,

        meshRole: p.meshRole ?? null,
        meshIdentity: p.meshIdentity ?? null,
        meshTier: p.meshTier ?? "host",

        advantageField: p.advantageField ?? null,
        advantageBand: p.advantageBand ?? null,
        advantageBias: typeof p.advantageBias === "number"
          ? clamp01(p.advantageBias)
          : null,

        meshProximity: p.meshProximity ?? null,
        meshPressure: p.meshPressure ?? null,
        flowPressure: p.flowPressure ?? null,

        signalStrength: p.signalStrength ?? null,

        longRangeAffinity: typeof p.longRangeAffinity === "number"
          ? clamp01(p.longRangeAffinity)
          : null,
        longRangeCandidate: !!p.longRangeCandidate,

        binaryTransferBias: typeof p.binaryTransferBias === "number"
          ? clamp01(p.binaryTransferBias)
          : null,

        bluetoothPresence: p.bluetoothPresence
          ? {
              deviceId: p.bluetoothPresence.deviceId || null,
              linkQuality: typeof p.bluetoothPresence.linkQuality === "number"
                ? clamp01(p.bluetoothPresence.linkQuality)
                : null,
              proximityTier: p.bluetoothPresence.proximityTier || null,
              transport: p.bluetoothPresence.transport || null
            }
          : null,

        publicDetails: PublicProfile.safeDetails(p.uid)
      }));
    } catch (err) {
      warn && warn("presence", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // SYSTEM AGE (SELF, HUMAN-FACING, v30.0)
// -------------------------------------------------------------------------
  function getSystemAge() {
    try {
      const days = SystemClock.organismAgeDays();
      const category = classifyAgeCategory(days);

      return {
        uptimeSeconds: SystemClock.uptimeSeconds(),
        organismAgeDays: days,
        organismAgeCategory: category
      };
    } catch (err) {
      warn && warn("presence", "SystemClock unavailable", err);
      return {
        uptimeSeconds: 0,
        organismAgeDays: 0,
        organismAgeCategory: "unknown"
      };
    }
  }

  // -------------------------------------------------------------------------
  // PAGE BUILDER (v30.0 IMMORTAL+++)
// -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const senses = PulseSenses.forAwarenessPage(entryNodeId, context);
    const nearby = buildNearbyPresenceList();
    const age = getSystemAge();

    const meshPressure = clamp01(senses.mesh.pressure ?? 0);
    const flowPressure = clamp01(senses.flow.pressure ?? 0);

    const pressureField = {
      meshPressure,
      flowPressure,
      combinedPressure: clamp01((meshPressure + flowPressure) / 2)
    };

    const artery = safeMeshArterySnapshot();

    return Object.freeze({
      meta,

      performance: senses.performance,
      stability: senses.stability,
      drift: senses.drift,

      environment: senses.environment,
      safety: senses.safety,
      hormones: senses.hormones,
      aura: senses.aura,
      mesh: senses.mesh,
      sdn: senses.sdn,
      mode: senses.mode,

      narrative: senses.narrative,
      pressureField,

      nearbyPresence: nearby,
      systemAge: age,

      // v30: artery snapshot is read-only, HUD-only
      meshArtery: artery
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

PulseRealm.PulseMeshPresenceAwareness = createPresenceAwarenessPage;