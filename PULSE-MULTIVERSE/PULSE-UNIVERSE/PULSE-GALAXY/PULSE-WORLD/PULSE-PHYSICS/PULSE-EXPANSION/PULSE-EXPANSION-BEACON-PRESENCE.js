/**
 * ============================================================================
 *  PULSE-WORLD : PULSE-EXPANSION-BEACON-PRESENCE-v30-Immortal-PulseBand.js
 *  ORGAN TYPE: Expansion / Beacon Presence Synthesizer (Hive / One-Band)
 *  VERSION: v30-Immortal-PulseBand
 * ============================================================================
 *
 *  ROLE:
 *    BeaconPresence v30 is the symbolic "town caller" / "hive herald" organ.
 *    It takes a PulseMesh snapshot and synthesizes a high-level
 *    PRESENCE BEACON for PulseWorld:
 *
 *      - town / region presence
 *      - civilization tier
 *      - mesh pressure band
 *      - cost band
 *      - invite / caution / overload signals
 *      - persona / trust / tier hints
 *      - hive / PulseBand identity
 *      - band-agnostic presence (Bluetooth optional, not required)
 *
 *    It does NOT:
 *      - route
 *      - send
 *      - execute
 *      - perform network or filesystem operations
 *      - depend on real time or randomness
 *
 *  CONTRACT:
 *    - Pure symbolic, deterministic, drift-proof.
 *    - Input: PulseMesh snapshot (v30+, PulseBand-aware).
 *    - Output: beaconPresence signal object.
 *    - No side effects, no mutation of input.
 *    - Bluetooth is OPTIONAL: presence is a world/hive action, not a radio.
 */

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const BeaconPresenceMeta = Object.freeze({
  organId: "PulseExpansionBeaconPresence-v30-Immortal-PulseBand",
  role: "EXPANSION_BEACON_PRESENCE",
  version: "v30-Immortal-PulseBand",
  layer: "Expansion",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,

    meshAware: true,
    worldMeshAware: true,
    presenceAware: true,
    advantageAware: true,
    costAware: true,
    civilizationAware: true,

    // v30: band-agnostic / hive-aware
    bandAgnostic: true,
    radioAgnostic: true,
    pulseBandAware: true,
    hiveAware: true,
    presenceIsAction: true
  })
});

/**
 * Compute a simple band from a numeric index [0..100].
 */
function bandFromIndex(index) {
  if (index == null || Number.isNaN(index)) return "unknown";
  if (index < 20) return "low";
  if (index < 50) return "medium";
  if (index < 80) return "high";
  return "critical";
}

/**
 * Compute a cost band from meshCostIndex.
 */
function costBandFromIndex(index) {
  if (index == null || Number.isNaN(index)) return "unknown";
  if (index < 20) return "cheap";
  if (index < 50) return "moderate";
  if (index < 80) return "expensive";
  return "prohibitive";
}

/**
 * Decide invite / caution / overload mode based on pressure + cost.
 */
function computeBeaconMode({ pressureBand, costBand }) {
  if (pressureBand === "critical") return "overload";
  if (pressureBand === "high" && (costBand === "expensive" || costBand === "prohibitive")) {
    return "caution";
  }
  if (pressureBand === "low" && (costBand === "cheap" || costBand === "moderate")) {
    return "invite";
  }
  return "neutral";
}

/**
 * Decide a symbolic "townType" from civilizationTier + meshStrength.
 */
function computeTownType({ civilizationTier, meshStrength }) {
  const civ = civilizationTier || "void";
  const strength = meshStrength || "unknown";

  if (civ === "void") return "wilderness";
  if (civ === "outpost") return strength === "strong" ? "fortified-outpost" : "outpost";
  if (civ === "village") return strength === "strong" ? "village-hub" : "village";
  if (civ === "town") return strength === "strong" ? "trade-town" : "town";
  if (civ === "city") return strength === "strong" ? "capital-city" : "city";
  if (civ === "metropolis") return "mega-city";
  return "unknown";
}

/**
 * Decide a symbolic "beaconStrength" from meshStrength + pressureBand.
 */
function computeBeaconStrength({ meshStrength, pressureBand }) {
  if (meshStrength === "strong" && (pressureBand === "low" || pressureBand === "medium")) {
    return "high";
  }
  if (meshStrength === "stable" && pressureBand !== "critical") {
    return "medium";
  }
  if (meshStrength === "weak") {
    return "low";
  }
  return "unknown";
}

/**
 * Decide a trust hint from presenceField + advantageField.
 */
function computeTrustHint({ presenceField, advantageField }) {
  const trusted = presenceField.trusted || "unknown";
  const identityTier = presenceField.identityTier || "anon";
  const advantageScore = advantageField.advantageScore ?? 0;

  let trustBand = "unknown";
  if (trusted === "true" || trusted === true) trustBand = "trusted";
  else if (trusted === "false" || trusted === false) trustBand = "untrusted";
  else trustBand = "neutral";

  let advantageHint = "neutral";
  if (advantageScore >= 80) advantageHint = "high";
  else if (advantageScore >= 40) advantageHint = "medium";
  else if (advantageScore > 0) advantageHint = "low";

  return Object.freeze({
    trustBand,
    identityTier,
    advantageHint
  });
}

/**
 * v30: derive band-agnostic radio presence from mesh snapshot.
 * Bluetooth is optional; we treat radios as lanes under PulseBand.
 */
function computeRadioPresence({ presenceField, radiosField }) {
  const bluetoothPresence = presenceField.bluetoothPresence || "unknown";
  const ltePresence = radiosField.ltePresence || "unknown";
  const wifiPresence = radiosField.wifiPresence || "unknown";
  const fiveGPresence = radiosField.fiveGPresence || "unknown";

  const anyActive =
    [bluetoothPresence, ltePresence, wifiPresence, fiveGPresence]
      .some((v) => v === "on" || v === "active" || v === "present");

  return Object.freeze({
    bluetoothPresence: bluetoothPresence === "unknown" ? "off" : bluetoothPresence,
    ltePresence,
    wifiPresence,
    fiveGPresence,
    anyRadioActive: anyActive,
    radioMode: anyActive ? "active" : "idle"
  });
}

/**
 * v30: derive PulseBand / hive identity from snapshot.
 */
function computePulseBandIdentity({ snap, worldMesh }) {
  const pulseBand = snap.pulseBand || worldMesh.pulseBand || {};
  const pulseBandId = pulseBand.pulseBandId || "PULSEBAND-ONE";
  const hiveId = pulseBand.hiveId || "PULSE-HIVEMIND-GLOBAL";

  const worldIsMesh = pulseBand.worldIsMesh ?? true;
  const bandIsSignal = pulseBand.bandIsSignal ?? true;

  const radios = pulseBand.radios || ["bluetooth", "lte", "5g", "wifi"];

  return Object.freeze({
    pulseBandId,
    hiveId,
    worldIsMesh,
    bandIsSignal,
    radios
  });
}

/**
 * v30: presence as action on the hive.
 */
function computePresenceAction({ presenceField, advantageField, pulseBandIdentity }) {
  const bandPresence = presenceField.bandPresence || "unknown";
  const devicePresence = presenceField.devicePresence || "unknown";
  const touchMode = presenceField.touchMode || "unknown";
  const touchPage = presenceField.touchPage || "unknown";

  const advantageBand = advantageField.advantageBand || "neutral";

  const actionKind =
    bandPresence === "unknown" && devicePresence === "unknown"
      ? "latent"
      : "active";

  return Object.freeze({
    presenceIsAction: true,
    actionKind, // latent | active
    bandPresence,
    devicePresence,
    touchMode,
    touchPage,
    advantageBand,
    pulseBandId: pulseBandIdentity.pulseBandId,
    hiveId: pulseBandIdentity.hiveId
  });
}

/**
 * Factory — Beacon Presence v30-Immortal-PulseBand
 *
 * Accepts a snapshot provider so this organ stays pure and symbolic.
 */
export function createBeaconPresence({ getMeshSnapshot, trace = false } = {}) {
  if (typeof getMeshSnapshot !== "function") {
    throw new Error("[BeaconPresence v30] getMeshSnapshot must be a function.");
  }

  const log = (...args) => trace && console.log("[BeaconPresence v30]", ...args);

  // Prewarm is symbolic only.
  function prewarm() {
    log("Prewarm: BeaconPresence v30 Immortal-PulseBand symbolic prewarm.");
    return {
      ok: true,
      meta: {
        organId: BeaconPresenceMeta.organId,
        version: BeaconPresenceMeta.version,
        prewarmKind: "beacon-presence-v30-immortal-pulseband"
      }
    };
  }

  /**
   * Core: buildBeaconPresenceSignal
   *
   * Reads the PulseMesh snapshot and synthesizes a high-level beaconPresence.
   * Bluetooth is optional; presence is world/hive-level.
   */
  function buildBeaconPresenceSignal() {
    const snap = getMeshSnapshot();
    if (!snap || typeof snap !== "object") {
      return Object.freeze({
        ok: false,
        reason: "no-snapshot",
        beaconPresence: null
      });
    }

    const densityHealth = snap.densityHealth || {};
    const metrics = densityHealth.metrics || {};
    const presenceField = snap.presenceField || null;
    const advantageField = snap.advantageField || null;
    const worldMesh = snap.worldMesh || null;
    const costLane = snap.cost || null;
    const timeline = snap.timeline || null;
    const radiosField = snap.radios || null; // v30: generic radio presence

    const meshStrength = metrics.meshStrength || "unknown";
    const meshPressureIndex = metrics.meshPressureIndex ?? null;
    const pressureBand = bandFromIndex(meshPressureIndex);

    const meshCostIndex = costLane.meshCostIndex ?? null;
    const costBand = costBandFromIndex(meshCostIndex);

    const civilizationTier = worldMesh.civilizationTier || "void";

    const beaconMode = computeBeaconMode({ pressureBand, costBand });
    const townType = computeTownType({ civilizationTier, meshStrength });
    const beaconStrength = computeBeaconStrength({ meshStrength, pressureBand });
    const trustHint = computeTrustHint({ presenceField, advantageField });

    const pulseBandIdentity = computePulseBandIdentity({ snap, worldMesh });
    const radioPresence = computeRadioPresence({ presenceField, radiosField });
    const presenceAction = computePresenceAction({
      presenceField,
      advantageField,
      pulseBandIdentity
    });

    const beaconPresence = Object.freeze({
      organId: BeaconPresenceMeta.organId,
      version: BeaconPresenceMeta.version,

      regionID: snap.identity.regionID || worldMesh.regionID || null,
      meshID: snap.identity.meshID || null,

      // world / civilization
      civilizationTier,
      townType,

      // mesh state
      meshStrength,
      meshPressureIndex,
      pressureBand,

      // cost state
      meshCostIndex,
      costBand,

      // beacon state
      beaconStrength,
      beaconMode, // invite / neutral / caution / overload

      // trust / persona hints
      trustBand: trustHint.trustBand,
      identityTier: trustHint.identityTier,
      advantageHint: trustHint.advantageHint,

      // presence hints (band-agnostic)
      bandPresence: presenceField.bandPresence || "unknown",
      devicePresence: presenceField.devicePresence || "unknown",
      persona: presenceField.persona || "neutral",
      touchMode: presenceField.touchMode || "unknown",
      touchPage: presenceField.touchPage || "unknown",

      // v30: radio presence (Bluetooth optional)
      radioPresence,

      // v30: PulseBand / hive identity
      pulseBand: pulseBandIdentity,

      // v30: presence as action on the hive
      presenceAction,

      // timeline (symbolic only)
      timeline: timeline
        ? {
            symbolicEpoch: timeline.symbolicEpoch,
            revision: timeline.revision,
            revisionReason: timeline.revisionReason
          }
        : null
    });

    return Object.freeze({
      ok: true,
      beaconPresence
    });
  }

  /**
   * Snapshot for this organ itself (meta + last computed beacon).
   * This organ is stateless; we just recompute on demand.
   */
  function getSnapshot() {
    const result = buildBeaconPresenceSignal();
    return Object.freeze({
      organId: BeaconPresenceMeta.organId,
      version: BeaconPresenceMeta.version,
      meta: BeaconPresenceMeta,
      lastBeaconPresence: result.beaconPresence,
      ok: result.ok
    });
  }

  return Object.freeze({
    meta: BeaconPresenceMeta,

    // guarantees
    guarantees: BeaconPresenceMeta.guarantees,

    // core
    buildBeaconPresenceSignal,

    // prewarm
    prewarm,

    // introspection
    getSnapshot
  });
}

export default createBeaconPresence;

PulseRealm.ExpansionBeaconPresence = {
  createBeaconPresence,
  BeaconPresenceMeta
}