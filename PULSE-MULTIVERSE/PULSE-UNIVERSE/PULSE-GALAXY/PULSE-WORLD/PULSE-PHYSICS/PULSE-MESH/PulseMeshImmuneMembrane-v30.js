// ============================================================================
//  PULSE OS v30-IMMORTAL+++ — IMMUNE MEMBRANE LAYER  // red
//  “System Safety Membrane / Structural Validation / Quarantine / Metadata‑Only”
// ============================================================================
//
// IDENTITY — IMMUNE MEMBRANE (v30-IMMORTAL+++):
// --------------------------------------------
// • First-line safety membrane for all impulses.
// • Pure structural validation — no pressure gating.
// • Pure metadata-only — zero payload mutation.
// • No routing logic, no compute, no shaping.
// • Quarantines unsafe or malformed impulses deterministically.
// • SDN-aligned: validates impulses before Router receives them.
// • Presence-aware, binary-aware, dual-band-ready, drift-proof,
//   advantage-aware, mesh-pressure-aware, flow-aware, drift-aware,
//   mesh-tier-aware, long-range-aware, bluetooth-presence-aware,
//   artery-deterministic-aware (read-only).
//
// SAFETY CONTRACT (v30):
// ----------------------
// • No payload access.
// • No score/energy mutation.
// • No routing override.
// • No pressure-based gating.
// • No autonomy.
// • Deterministic-field, drift-proof.
// • Unified-advantage-field, multi-instance-ready.
// • Zero randomness, zero timestamps, zero async.
// • Zero mutation of input outside metadata flags.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// IMMUNE MEMBRANE ORGAN — v30-IMMORTAL+++
// ============================================================================
export function createPulseImmune() {

  const meta = {
    layer: "PulseImmune",
    role: "IMMUNE_MEMBRANE",
    version: "30-IMMORTAL+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      localAware: true,
      internetAware: true,

      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,

      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true,
      flowAware: true,
      driftAware: true,

      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      arteryDeterministic: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  };

  // ---------------------------------------------------------------------------
  // STRUCTURAL VALIDATION (v30)
// ---------------------------------------------------------------------------
  function validateStructure(impulse) {
    if (!impulse.id)                        return fail("missing_id");
    if (!impulse.payloadRef)                return fail("missing_payloadRef");
    if (typeof impulse.energy !== "number") return fail("invalid_energy");
    if (typeof impulse.score  !== "number") return fail("invalid_score");
    return pass();
  }

  function validateFlags(impulse) {
    const flags = impulse.flags || {};
    const keys = Object.keys(flags);

    if (keys.length > 256) return fail("too_many_flags");

    if (flags.unsafe_override === true) return fail("unsafe_override_flag");

    return pass();
  }

  // ---------------------------------------------------------------------------
  // MODE SANITY (binary/symbolic/dual/presence-band)
// ---------------------------------------------------------------------------
  function validateMode(impulse) {
    const f = impulse.flags || {};
    const band = impulse.band;

    if (f.binary_mode && f.symbolic_mode) {
      return fail("conflicting_modes");
    }

    if (f.binary_mode && typeof impulse.mode !== "string") {
      return fail("binary_mode_missing_tag");
    }

    if (band && !["binary", "symbolic", "dual"].includes(band)) {
      return fail("invalid_presence_band");
    }

    return pass();
  }

  // ---------------------------------------------------------------------------
  // MESH-TIER / LONG-RANGE / BLUETOOTH SANITY (metadata-only)
// ---------------------------------------------------------------------------
  function validateMeshTierLongRangeBt(impulse) {
    const f = impulse.flags || {};

    const tier = f.aura_mesh_tier;
    if (tier !== undefined && !["host", "satellite", "relay"].includes(tier)) {
      return fail("invalid_mesh_tier");
    }

    if (f.aura_long_range_candidate !== undefined &&
        typeof f.aura_long_range_candidate !== "boolean") {
      return fail("invalid_long_range_flag");
    }

    // bluetooth presence flags are optional; if present, only type sanity
    if (f.aura_bt_link_quality !== undefined &&
        typeof f.aura_bt_link_quality !== "number" &&
        f.aura_bt_link_quality !== null) {
      return fail("invalid_bt_link_quality");
    }

    return pass();
  }

  // ---------------------------------------------------------------------------
  // ANOMALY QUARANTINE (v30)
// ---------------------------------------------------------------------------
  function quarantine(impulse) {
    const f = impulse.flags || {};

    if (f.cortex_anomaly) {
      impulse.flags.immune_quarantined = true;
      return fail("cortex_anomaly");
    }

    if (f.cortex_factoring_anomaly) {
      impulse.flags.immune_quarantined = true;
      return fail("factoring_anomaly");
    }

    if (f.cortex_flow_anomaly) {
      impulse.flags.immune_quarantined = true;
      return fail("flow_anomaly");
    }

    if (f.aura_loop_depth > 6) {
      impulse.flags.immune_quarantined = true;
      return fail("excessive_loop_depth");
    }

    return pass();
  }

  // ---------------------------------------------------------------------------
  // ROUTE HINT SANITY (v30)
// ---------------------------------------------------------------------------
  function routeSanity(impulse) {
    const hint = impulse.routeHint;
    if (!hint) return pass();

    if (typeof hint !== "string") return fail("invalid_routeHint");
    if (!hint.startsWith("earner-") && !hint.startsWith("service-")) {
      return fail("unknown_routeHint");
    }

    return pass();
  }

  // ---------------------------------------------------------------------------
  // ENERGY FLOOR (v30)
// ---------------------------------------------------------------------------
  function energyFloor(impulse) {
    if (isNaN(impulse.energy)) return fail("energy_nan");
    if (impulse.energy < 0)    return fail("energy_negative");
    return pass();
  }

  // ---------------------------------------------------------------------------
  // PRESSURE / DRIFT / ADVANTAGE / ARTERY REFLECTION (metadata-only)
// ---------------------------------------------------------------------------
  function reflectPressureDriftAdvantage(impulse) {
    const f = impulse.flags || {};

    let pressureScore = 0;
    if (f.flow_throttled)              pressureScore += 0.3;
    if (f.aura_system_under_tension)   pressureScore += 0.3;
    if (f.aura_in_loop)                pressureScore += 0.2;
    if (f.cortex_anomaly ||
        f.cortex_flow_anomaly ||
        f.cortex_factoring_anomaly)    pressureScore += 0.3;

    const driftScore =
      (f.aura_in_loop ? 0.3 : 0) +
      (f.aura_system_under_tension ? 0.2 : 0) +
      (f.immune_quarantined ? 0.3 : 0);

    const advantageBias =
      typeof f.aura_advantage_bias === "number"
        ? clamp01(f.aura_advantage_bias)
        : 0;

    if (pressureScore > 0) {
      impulse.flags.immune_pressure_reflection = clamp01(pressureScore);
    }

    if (driftScore > 0) {
      impulse.flags.immune_drift_reflection = clamp01(driftScore);
    }

    if (advantageBias > 0) {
      impulse.flags.immune_advantage_reflection = advantageBias;
    }

    if (pressureScore > 0 || driftScore > 0 || advantageBias > 0) {
      impulse.flags.immune_watch_only = true;
    }
  }

  // ---------------------------------------------------------------------------
  // IMMUNE ENGINE (v30-IMMORTAL+++)
// ---------------------------------------------------------------------------
  function applyPulseImmune(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.immune_meta = meta;

    const checks = [
      validateStructure,
      validateFlags,
      validateMode,
      validateMeshTierLongRangeBt,
      quarantine,
      routeSanity,
      energyFloor
    ];

    for (const check of checks) {
      const result = check(impulse);
      if (!result.ok) {
        impulse.flags[`immune_${result.reason}`] = true;
        impulse.flags.immune_failed = true;
        reflectPressureDriftAdvantage(impulse);
        return impulse;
      }
    }

    impulse.flags.immune_passed = true;
    reflectPressureDriftAdvantage(impulse);
    return impulse;
  }

  return applyPulseImmune;
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function pass() { return { ok: true }; }
function fail(reason) { return { ok: false, reason }; }
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

PulseRealm.PulseMeshImmuneMembrane = createPulseImmune;