// ============================================================================
// FILE: PulseMeshOrgans-v30-IMMORTAL+++.js
// PULSE OS v30 — MESH ORGANS LAYER (IMMORTAL+++)
// ---------------------------------------------------------------------------
//  “Functional Organ Map of the Mesh Body — v30 IMMORTAL+++ Edition”
//  Capability Signatures • Deterministic Organ Matching • Metadata-Only
//  Binary-Aware • BLE-Aware • Long-Range-Aware • Mesh-Tier-Aware
//  PulseBand-Aware • MeshBand-Aware • BluetoothMeshBand-Aware
//  Presence-Aware • Advantage-Aware • Drift-Proof • Multi-Instance-Ready
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// ORGAN FACTORY — v30 IMMORTAL+++
// ============================================================================
export function createPulseOrgans() {

  // -------------------------------------------------------------------------
  // IMMORTAL META (v30+++)
  // -------------------------------------------------------------------------
  const organMeta = Object.freeze({
    layer: "PulseOrgans",
    role: "FUNCTIONAL_ORGAN_MAP",
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

      meshAware: true,
      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      binaryTransferAware: true,

      // v30+++: new band family
      pulseBandAware: true,
      meshBandAware: true,
      bluetoothMeshBandAware: true,

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

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  });

  // -------------------------------------------------------------------------
  // ORGAN DEFINITIONS — v30 IMMORTAL+++
  // -------------------------------------------------------------------------
  const PulseOrgans = {

    // -----------------------------------------------------
    // STORAGE ORGAN — deterministic, safe default
    // -----------------------------------------------------
    storage: {
      id: "organ-storage",
      lineage: "mesh-storage-v30",
      capabilities: ["store", "retrieve", "index"],
      match(impulse) {
        return impulse.flags.cortex_intent === "normal";
      }
    },

    // -----------------------------------------------------
    // ROUTING ORGAN — deterministic, high-score or push_hard
    // -----------------------------------------------------
    routing: {
      id: "organ-routing",
      lineage: "mesh-routing-v30",
      capabilities: ["route", "shape", "classify"],
      match(impulse) {
        return impulse.flags.cortex_intent === "push_hard" ||
               (typeof impulse.score === "number" && impulse.score >= 0.7);
      }
    },

    // -----------------------------------------------------
    // SECURITY ORGAN — anomaly-first
    // -----------------------------------------------------
    security: {
      id: "organ-security",
      lineage: "mesh-security-v30",
      capabilities: ["validate", "verify", "protect"],
      match(impulse) {
        return impulse.flags.cortex_anomaly ||
               impulse.flags.cortex_factoring_anomaly ||
               impulse.flags.cortex_flow_anomaly;
      }
    },

    // -----------------------------------------------------
    // EARN PREP ORGAN — deterministic, based on routeHint
    // -----------------------------------------------------
    earnPrep: {
      id: "organ-earnprep",
      lineage: "mesh-earnprep-v30",
      capabilities: ["prepare", "shape_intent", "assign_earner"],
      match(impulse) {
        return typeof impulse.routeHint === "string" &&
               impulse.routeHint.startsWith("earner-");
      }
    },

    // -----------------------------------------------------
    // BINARY PREP ORGAN — binary mode or binary band
    // -----------------------------------------------------
    binaryPrep: {
      id: "organ-binaryprep",
      lineage: "mesh-binaryprep-v30",
      capabilities: ["binary_prepare", "binary_shape", "binary_assign"],
      match(impulse) {
        return impulse.flags.binary_mode === true ||
               impulse.band === "binary" ||
               impulse.flags.hormone_prefers_binary === true ||
               impulse.flags.aura_prefers_binary_mesh === true;
      }
    },

    // -----------------------------------------------------
    // LONG-RANGE PULSE ORGAN — v30 addition
    // -----------------------------------------------------
    longRangePulse: {
      id: "organ-longrange",
      lineage: "mesh-longrange-v30",
      capabilities: ["long_range_tag", "pulse_shot_tag"],
      match(impulse) {
        return impulse.flags.aura_long_range_candidate === true ||
               (typeof impulse.flags.aura_long_range_bias === "number" &&
                impulse.flags.aura_long_range_bias > 0) ||
               impulse.flags.bluetooth_longrange_mode === true;
      }
    },

    // -----------------------------------------------------
    // BLE PRESENCE ORGAN — v30 addition
    // -----------------------------------------------------
    blePresence: {
      id: "organ-blepresence",
      lineage: "mesh-blepresence-v30",
      capabilities: ["ble_presence_tag", "ble_proximity_tag"],
      match(impulse) {
        return impulse.flags.aura_bt_transport === "ble" ||
               impulse.flags.aura_bt_proximity === "near" ||
               (typeof impulse.flags.aura_bt_link_quality === "number" &&
                impulse.flags.aura_bt_link_quality > 0.5);
      }
    },

    // -----------------------------------------------------
    // PULSEBAND MESH ORGAN — new band: pulseband / meshband / bluetoothmeshband
    // -----------------------------------------------------
    pulseBandMesh: {
      id: "organ-pulsebandmesh",
      lineage: "mesh-pulseband-v30",
      capabilities: [
        "pulseband_tag",
        "meshband_tag",
        "bluetoothmeshband_tag",
        "band_bridge_tag"
      ],
      match(impulse) {
        const band = impulse.band;
        const bandFlag = impulse.flags.aura_pulse_band ||
                         impulse.flags.aura_mesh_band ||
                         impulse.flags.aura_bluetooth_mesh_band;

        return band === "PulseBand" ||
               band === "meshband" ||
               band === "bluetoothmeshband" ||
               bandFlag === true;
      }
    },

    // -----------------------------------------------------
    // MESH SIGNAL ORGAN — factoring + dual-band
    // -----------------------------------------------------
    meshSignal: {
      id: "organ-meshsignal",
      lineage: "mesh-signal-v30",
      capabilities: ["mesh_signal", "mesh_factor", "mesh_trace"],
      match(impulse) {
        return impulse.flags.aura_prefers_factored_paths ||
               impulse.flags.mesh_signal ||
               impulse.flags.aura_system_under_tension ||
               impulse.flags.hormone_factoring_pressure ||
               impulse.band === "dual";
      }
    },

    // -----------------------------------------------------
    // PRESENCE ORGAN — upgraded to understand new bands
    // -----------------------------------------------------
    presence: {
      id: "organ-presence",
      lineage: "mesh-presence-v30",
      capabilities: ["presence_shape", "presence_tag", "presence_band"],
      match(impulse) {
        const band = impulse.band;
        if (typeof band !== "string") return false;

        const knownBands = [
          "binary",
          "symbolic",
          "dual",
          "pulse",
          "mesh",
          "PulseBand",
          "meshband",
          "bluetoothmeshband"
        ];

        return knownBands.includes(band);
      }
    },

    // -----------------------------------------------------
    // MESH FLOW ORGAN — flow + topology + storm pressure
    // -----------------------------------------------------
    meshFlow: {
      id: "organ-meshflow",
      lineage: "mesh-flow-v30",
      capabilities: ["mesh_flow_tag", "mesh_flow_shape"],
      match(impulse) {
        return impulse.flags.mesh_flow ||
               impulse.flags.mesh_topology_change ||
               impulse.flags.mesh_lane_activity ||
               impulse.flags.hormone_mesh_storm_pressure;
      }
    },

    // -----------------------------------------------------
    // MESH COGNITION ORGAN — reasoning + coordinator
    // -----------------------------------------------------
    meshCognition: {
      id: "organ-meshcognition",
      lineage: "mesh-cognition-v30",
      capabilities: ["mesh_cognition_tag", "mesh_reasoning_tag"],
      match(impulse) {
        return impulse.flags.mesh_cognition ||
               impulse.flags.mesh_decision ||
               impulse.flags.mesh_coordinator_signal ||
               impulse.flags.hormone_dual_mode_ready;
      }
    },

    // -----------------------------------------------------
    // MESH AWARENESS ORGAN — observation + presence
    // -----------------------------------------------------
    meshAwareness: {
      id: "organ-meshawareness",
      lineage: "mesh-awareness-v30",
      capabilities: ["mesh_awareness_tag", "mesh_presence_tag"],
      match(impulse) {
        return impulse.flags.mesh_presence ||
               impulse.flags.mesh_state_probe ||
               impulse.flags.mesh_observe_only ||
               impulse.flags.hormone_presence_dual_pressure;
      }
    },

    // -----------------------------------------------------
    // MESH ADVANTAGE ORGAN — advantage cascade + bias
    // -----------------------------------------------------
    meshAdvantage: {
      id: "organ-meshadvantage",
      lineage: "mesh-advantage-v30",
      capabilities: ["advantage_tag", "advantage_bias", "advantage_cascade"],
      match(impulse) {
        return typeof impulse.flags.aura_advantage_bias === "number" ||
               impulse.flags.aura_advantage_cascade === true;
      }
    },

    // -----------------------------------------------------
    // MESH TIER ORGAN — host / satellite / relay
    // -----------------------------------------------------
    meshTier: {
      id: "organ-meshtier",
      lineage: "mesh-tier-v30",
      capabilities: ["mesh_tier_tag", "mesh_role_tag"],
      match(impulse) {
        return ["host", "satellite", "relay"].includes(
          impulse.flags.aura_mesh_tier
        );
      }
    },

    // -----------------------------------------------------
    // MESH STABILITY ORGAN — drift + loops + tension
    // -----------------------------------------------------
    meshStability: {
      id: "organ-meshstability",
      lineage: "mesh-stability-v30",
      capabilities: ["stability_tag", "drift_tag", "loop_tag"],
      match(impulse) {
        return impulse.flags.aura_in_loop ||
               impulse.flags.aura_system_under_tension ||
               impulse.flags.immune_drift_reflection ||
               impulse.flags.immune_pressure_reflection;
      }
    }
  };

  // -------------------------------------------------------------------------
  // ORGAN APPLICATION PIPELINE
  // -------------------------------------------------------------------------
  function applyPulseOrgans(impulse) {
    impulse = impulse || {};
    impulse.flags = impulse.flags || {};
    impulse.organs = impulse.organs || [];

    // attach meta once per impulse
    impulse.flags.organ_meta = organMeta;

    for (const key of Object.keys(PulseOrgans)) {
      const organ = PulseOrgans[key];
      try {
        if (organ.match(impulse)) {
          impulse.organs.push(organ.id);
          impulse.flags[`organ_${organ.id}`] = true;
          impulse.flags[`organ_lineage_${organ.id}`] = organ.lineage;
        }
      } catch {
        // deterministic safety: ignore bad match, never throw
      }
    }

    return impulse;
  }

  return Object.freeze({
    apply: applyPulseOrgans,
    organs: PulseOrgans,
    meta: organMeta
  });
}

export default {
  createPulseOrgans
};
// ============================================================================
// PulseMeshOrgans EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseMeshOrgans = {
  create: createPulseOrgans,
  version: "30-IMMORTAL+++",
  layer: "PulseOrgans"
};

PulseRealm.MeshOrgans = {
  PulseMeshOrgans,
  createPulseOrgans
}
PulseRealm.PulseMeshOrgans = PulseMeshOrgans;
PulseRealm.PulseMeshOrgansBuild = createPulseOrgans;