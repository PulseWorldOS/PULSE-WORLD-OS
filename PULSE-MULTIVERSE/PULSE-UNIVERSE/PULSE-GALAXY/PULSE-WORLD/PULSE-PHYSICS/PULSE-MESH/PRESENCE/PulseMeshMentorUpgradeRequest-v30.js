// ============================================================================
// FILE: PulseMeshMentorUpgradeRequest-v30-IMMORTAL+++.js
// PULSE OS v30 — PRESENCE-Evo-MESH-AWARE-IMMORTAL+++
// ---------------------------------------------------------------------------
//  MENTOR UPGRADE REQUEST SURFACE (IMMORTAL-GRADE v30+++)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Social presence gateway for mentor upgrades.
//    • Pure metadata surface — no compute, no mutation, no routing.
//    • Reads presence, mesh, mastery, skill-level, system-age, advantage fields.
//    • Mesh-tier-aware, long-range-aware, bluetooth-presence-aware,
//      artery-deterministic-aware (read-only).
//    • Produces deterministic, drift-proof mentor candidate lists.
//    • Feeds Overmind’s social reasoning layer.
//
//  GUARANTEES (v30 IMMORTAL+++):
//    • Deterministic — same input → same output.
//    • Drift-proof — topology, ranking, and advantage fields stable.
//    • Zero-mutation — never mutates presence objects.
//    • Zero-compute — pure metadata shaping.
//    • Zero-network — no fetch, no external calls.
//    • Dual-band — symbolic + binary presence scoring.
//    • Mesh-aware — proximity, hops, mesh identity, mesh tier.
//    • Presence-aware — bands, systemAge, founderEra.
//    • Mastery-aware — skillLevel, masteryTier.
//    • Advantage-aware — rankScore, advantageBias.
//    • Binary-transfer-aware — can reflect binary/long-range preference as metadata.
//    • Social-aware — mentor/mentee graph.
//    • Immortal-field — unified advantage + deterministic field.
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
//      • legacyMentorUpgrade
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// ORGAN FACTORY — v30 IMMORTAL+++
// ============================================================================
export function createMentorUpgradeRequest({
  PresenceJobView,
  PowerUserRanking,
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-GRADE v30+++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "MentorUpgradeRequest",
    role: "MENTOR_UPGRADE_SURFACE",
    version: "30-IMMORTAL+++",
    evo: {
      presenceAware: true,
      meshAware: true,
      masteryAware: true,
      skillLevelAware: true,
      systemAgeAware: true,
      socialAware: true,

      unifiedAdvantageField: true,
      deterministicField: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      dualBand: true,

      meshPressureAware: true,
      advantageCascadeAware: true,
      futureEvolutionReady: true,
      safeRouteFree: true,

      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      arteryDeterministic: true,
      binaryTransferAware: true
    }
  });

  // -------------------------------------------------------------------------
  // BUILD MENTOR CANDIDATES — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  function buildMentorCandidates(entryNodeId, context = {}) {
    // context may include:
    //   meshTier: "host" | "satellite" | "relay"
    //   longRangeBias: 0..1
    //   longRangeCandidate: boolean
    //   bluetoothPresence: { deviceId, linkQuality, proximityTier, transport }
    // All are read-only, metadata-only, passed through to PresenceJobView.
    const view = PresenceJobView.build(entryNodeId, {
      ...context,
      meshTier: context.meshTier || "host",
      longRangeBias: typeof context.longRangeBias === "number"
        ? clamp01(context.longRangeBias)
        : 0,
      longRangeCandidate: !!context.longRangeCandidate,
      bluetoothPresence: context.bluetoothPresence || null
    });

    const nearby = view.nearbyPresence || [];

    // v30 ranking includes:
    // • mastery
    // • skill
    // • mesh identity + mesh tier
    // • founder era
    // • advantage cascade
    // • presence band
    // • system age
    // • binary-transfer / long-range preference (metadata-only)
    const ranking = PowerUserRanking.rankNearby(nearby);

    return ranking
      .filter((p) =>
        p.powerUser === true &&
        p.skillLevel >= 3 &&
        p.masteryTier >= 2 &&
        p.systemAgeCategory !== "new" &&
        p.meshProximity > 0
      )
      .map((p) =>
        Object.freeze({
          uid: p.uid,
          displayName: p.displayName,

          // presence / age / mastery
          presenceBand: p.presenceBand,
          systemAge: p.systemAge,
          systemAgeCategory: p.systemAgeCategory,
          skillLevel: p.skillLevel,
          masteryTier: p.masteryTier,

          // mesh identity + tier + proximity
          meshRole: p.meshRole,
          meshIdentity: p.meshIdentity,
          meshProximity: p.meshProximity,
          meshTier: p.meshTier || "host",

          // advantage + ranking
          advantageBias: p.advantageBias,
          rankScore: p.rankScore,

          // binary-transfer / long-range / BLE presence (metadata-only)
          longRangeAffinity: clamp01(
            typeof p.longRangeAffinity === "number" ? p.longRangeAffinity : 0
          ),
          binaryTransferBias: clamp01(
            typeof p.binaryTransferBias === "number" ? p.binaryTransferBias : 0
          ),
          bluetoothPresence: p.bluetoothPresence
            ? {
                deviceId: p.bluetoothPresence.deviceId || null,
                linkQuality:
                  typeof p.bluetoothPresence.linkQuality === "number"
                    ? clamp01(p.bluetoothPresence.linkQuality)
                    : null,
                proximityTier: p.bluetoothPresence.proximityTier || null,
                transport: p.bluetoothPresence.transport || null
              }
            : null
        })
      );
  }

  // -------------------------------------------------------------------------
  // BUILD UPGRADE REQUEST PAYLOAD — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  function buildUpgradeRequestPayload(requesterUid, mentorUid, reason, extraMeta = {}) {
    return Object.freeze({
      meta: {
        ...meta,
        // optional extra metadata (still metadata-only, no behavior)
        extra: extraMeta || {}
      },
      requester: { uid: requesterUid },
      mentor: { uid: mentorUid },
      reason: reason || "upgrade_request",
      status: "pending",
      version: meta.version
    });
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const mentors = buildMentorCandidates(entryNodeId, context);

    return Object.freeze({
      meta,
      mentors
    });
  }

  return Object.freeze({
    meta,
    build,
    buildUpgradeRequestPayload
  });
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
// ============================================================================
// MentorUpgradeRequest EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseMeshMentorUpgradeRequest = {
  create: createMentorUpgradeRequest,
  version: "30-IMMORTAL+++",
  layer: "MentorUpgradeRequest"
};

export default PulseMeshMentorUpgradeRequest;

PulseRealm.MeshMentorRequest = {
  PulseMeshMentorUpgradeRequest,
  createMentorUpgradeRequest
}