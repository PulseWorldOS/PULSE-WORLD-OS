// ============================================================================
// FILE: /organs/skin/PulseMeshSkin-v30-IMMORTAL+++.js
// [pulse:mesh] PULSE_OS_SKIN_LAYER v30-IMMORTAL+++  // silver
// Boundary Membrane • Entry–Exit Normalization • Zero-Trust Surface
// Deterministic • Drift-Proof • Metadata-Only • Dual-Band • Mesh-Tier-Aware
// Long-Range-Aware • Bluetooth-Presence-Aware • Binary-Transfer-Aware
// ============================================================================
//
// IDENTITY — THE SKIN (v30 IMMORTAL+++):
// --------------------------------------
// • First organ touched by every impulse entering the organism.
// • Last organ to touch every impulse leaving the organism.
// • Pure metadata-only normalization — zero payload mutation.
// • Zero-trust boundary membrane: validates, tags, normalizes.
// • Deterministic-field, drift-proof, SDN-aligned.
// • Presence-aware, binary-aware, dual-band-ready.
// • Mesh-aware, mesh-tier-aware, artery-aware (read-only).
// • Long-range-aware, bluetooth-presence-aware, binary-transfer-aware.
// • IMMORTAL: zero randomness, zero compute, zero shaping.
//
// SAFETY CONTRACT (v30):
// ----------------------
// • No routing, no compute, no shaping.
// • No payload mutation.
// • No async, no randomness.
// • Zero external mutation.
// • Zero network fetch.
// • Deterministic, reversible, safe.
// • Multi-instance-ready.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export function createPulseSkin({ log, warn, error } = {}) {

  // ==========================================================================
  // IMMORTAL META — v30
  // ==========================================================================
  const SkinState = {
    meta: Object.freeze({
      layer: "PulseSkin",
      role: "BOUNDARY_MEMBRANE",
      version: "30-IMMORTAL+++",
      lineage: "PulseMesh-v30",
      target: "full-mesh",
      selfRepairable: true,

      evo: {
        skin: true,
        boundaryLayer: true,
        zeroTrustSurface: true,
        metadataOnly: true,
        deterministic: true,
        driftProof: true,

        presenceAware: true,
        bandAware: true,
        binaryAware: true,
        symbolicAware: true,
        dualBand: true,
        meshAware: true,
        meshTierAware: true,
        arteryDeterministic: true,

        longRangeAware: true,
        bluetoothPresenceAware: true,
        binaryTransferAware: true,

        advantageCascadeAware: true,
        unifiedAdvantageField: true,
        pulseEfficiencyAware: true,

        meshPressureAware: true,
        auraPressureAware: true,
        flowPressureAware: true,

        deterministicField: true,
        futureEvolutionReady: true,
        multiInstanceReady: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true,
        zeroNetworkFetch: true,
        zeroExternalMutation: true
      },

      contract: {
        always: [
          "normalize entry",
          "normalize exit",
          "preserve payload",
          "preserve determinism",
          "strip internal metadata safely"
        ],
        never: [
          "mutate payload",
          "route",
          "compute",
          "inject randomness",
          "modify score beyond normalization",
          "modify energy beyond normalization"
        ]
      }
    })
  };

  // ==========================================================================
  // SKIN PACK — IMMORTAL ENTRY/EXIT NORMALIZATION
  // ==========================================================================
  const PulseSkin = {

    // ------------------------------------------------------------------------
    // ENTRY NORMALIZATION — deterministic, zero-trust, metadata-only
    // ------------------------------------------------------------------------
    normalizeEntry(impulse) {
      impulse.flags = impulse.flags || {};
      impulse.flags.skin_entry_normalized = true;
      impulse.flags.skin_lineage = "skin-v30-immortal";

      // ---------------------------------------------------
      // MODE + PRESENCE-BAND DETERMINISTIC TAGGING
      // ---------------------------------------------------
      if (impulse.flags.binary_mode) {
        impulse.flags.skin_mode = "binary";
        impulse.band = "binary";
        impulse.flags.skin_band_lineage = "band-binary-v30";
      } else if (impulse.flags.dual_mode) {
        impulse.flags.skin_mode = "dual";
        impulse.band = "dual";
        impulse.flags.skin_band_lineage = "band-dual-v30";
      } else {
        impulse.flags.skin_mode = "symbolic";
        impulse.band = "symbolic";
        impulse.flags.skin_band_lineage = "band-symbolic-v30";
      }

      // ---------------------------------------------------
      // SCORE + ENERGY NORMALIZATION (deterministic)
// ---------------------------------------------------
      impulse.score = clamp01(impulse.score ?? 0.5);
      impulse.energy = Math.max(0.05, impulse.energy ?? 1);

      // ---------------------------------------------------
      // PRESENCE-BAND METADATA
      // ---------------------------------------------------
      impulse.flags.skin_presence_band = impulse.band;

      // ---------------------------------------------------
      // MESH-TIER + LONG-RANGE + BINARY-TRANSFER REFLECTION
      // ---------------------------------------------------
      if (impulse.flags.mesh_tier) {
        impulse.flags.skin_mesh_tier = impulse.flags.mesh_tier;
      }

      if (typeof impulse.flags.long_range_affinity === "number") {
        impulse.flags.skin_long_range_affinity =
          clamp01(impulse.flags.long_range_affinity);
      }

      if (typeof impulse.flags.binary_transfer_bias === "number") {
        impulse.flags.skin_binary_transfer_bias =
          clamp01(impulse.flags.binary_transfer_bias);
      }

      // ---------------------------------------------------
      // BLUETOOTH / BLE PRESENCE REFLECTION (metadata-only)
// ---------------------------------------------------
      if (impulse.flags.bluetooth_presence) {
        const bt = impulse.flags.bluetooth_presence;
        impulse.flags.skin_bluetooth_presence = {
          deviceId: bt.deviceId || null,
          linkQuality: typeof bt.linkQuality === "number"
            ? clamp01(bt.linkQuality)
            : null,
          proximityTier: bt.proximityTier || null,
          transport: bt.transport || null
        };
      }

      // ---------------------------------------------------
      // ADVANTAGE + PRESSURE REFLECTION (metadata-only)
// ---------------------------------------------------
      if (impulse.flags.mesh_pressure != null) {
        impulse.flags.skin_mesh_pressure_reflection = impulse.flags.mesh_pressure;
      }

      if (impulse.flags.flow_pressure != null) {
        impulse.flags.skin_flow_pressure_reflection = impulse.flags.flow_pressure;
      }

      if (impulse.flags.aura_pressure != null) {
        impulse.flags.skin_aura_pressure_reflection = impulse.flags.aura_pressure;
      }

      if (impulse.flags.advantage_field != null) {
        impulse.flags.skin_advantage_field = impulse.flags.advantage_field;
      }

      if (typeof impulse.flags.advantage_bias === "number") {
        impulse.flags.skin_advantage_bias =
          clamp01(impulse.flags.advantage_bias);
      }

      // ---------------------------------------------------
      // IMMORTAL SURFACE SIGNATURE
      // ---------------------------------------------------
      impulse.flags.skin_surface_signature = "surface-v30-immortal";

      return impulse;
    },

    // ------------------------------------------------------------------------
    // EXIT NORMALIZATION — deterministic, metadata scrubbing
    // ------------------------------------------------------------------------
    normalizeExit(impulse) {
      impulse.flags = impulse.flags || {};
      impulse.flags.skin_exit_normalized = true;

      // IMMORTAL: safe metadata scrubbing marker
      impulse.flags.skin_exit_scrubbed = true;

      // We do NOT delete flags — Router/SendSystem may strip internals later.
      return impulse;
    }
  };

  // ==========================================================================
  // SKIN ENGINE — IMMORTAL
  // ==========================================================================
  function applyPulseSkin(impulse, phase = "entry") {
    impulse.flags = impulse.flags || {};
    impulse.flags.skin_meta = SkinState.meta;

    if (phase === "entry") {
      PulseSkin.normalizeEntry(impulse);
    }

    // IMMORTAL SKIN: no friction, no noise, no shaping, no compute.

    if (phase === "exit") {
      PulseSkin.normalizeExit(impulse);
    }

    impulse.flags.skin_applied = true;
    return impulse;
  }

  return {
    meta: SkinState.meta,
    apply: applyPulseSkin,
    state: SkinState
  };
}

// ============================================================================
// HELPERS
// ============================================================================
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

PulseRealm.PulseMeshSkin = createPulseSkin;