// ============================================================================
// FILE: /PULSE-MESH/PulseMeshAura-v30-IMMORTAL+++.js
// [pulse:mesh] PULSE_MESH_AURA v30-IMMORTAL+++
// System-wide Field Layer • Stabilization Loops • Multi-Instance Resonance
// Metadata-only • Zero Compute • Zero Payload Mutation (flags-only)
// Presence-aware • Binary-aware • Long-range-pulse-aware • Mesh-tier-aware
// Advantage-cascade-aware • Drift-proof • Bluetooth-presence-aware
// ============================================================================
//
// IDENTITY — THE AURA FIELD (v30-IMMORTAL+++):
//  ------------------------------------------
//  • Organism-wide field surrounding all pulses and instances.
//  • Provides stabilization loops (loop field).
//  • Provides multi-instance resonance (sync field).
//  • Senses Flow pressure + recent throttles → stabilization hints.
//  • Senses mesh factoring pressure → factoring hints.
//  • Senses mesh tier + long-range vs BLE strategy → routing hints (flags-only).
//  • Senses bluetooth presence → proximity + transport hints (flags-only).
//  • Metadata-only: tags, hints, and gentle shaping fields (flags-only).
//  • Advantage-cascade aware: inherits ANY systemic advantage automatically.
//  • Binary-aware + Presence-aware: tags pulses with band + presence origin.
//  • Fully deterministic: same impulse + same AuraState → same aura tags.
//  • Zero randomness, zero timestamps, zero async, zero network, zero FS.
//
// SAFETY CONTRACT (v30):
//  ----------------------
//  • No randomness
//  • No timestamps
//  • No payload mutation (flags-only metadata shaping)
//  • No async
//  • No network, no filesystem, no env access
//  • Fail-open: missing fields → safe defaults
//  • Deterministic: same impulse + same AuraState → same aura tags
//  • Zero imports for logic — external deps only via callers
//  • Presence-aware but presence stays in metadata only
//  • Long-range vs BLE is metadata-only, never imperative
// ============================================================================


// ---------------------------------------------------------------------------
// META EXPORTS — v30 IMMORTAL KERNEL (no external Identity dependency)
// ---------------------------------------------------------------------------
export const PulseMeshAuraMeta = Object.freeze({
  organ: "PulseMeshAura",
  layer: "MeshFieldLayer",
  role: "AURA_FIELD",
  version: "v30-IMMORTAL+++",
  generation: "v30",
  target: "full-mesh",
  selfRepairable: true,
  guarantees: {
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroEval: true,
    zeroDynamicImports: true,
    zeroAI: true,
    zeroAutonomy: true,
    zeroAsync: true,
    zeroTimestamps: true,
    zeroPayloadMutation: true,
    symbolicOnly: true,
    binaryAware: true,
    presenceAware: true,
    bandAware: true,
    bluetoothPresenceAware: true,
    meshTierAware: true,
    longRangePulseAware: true,
    bleIdleAware: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    deterministicField: true
  }
});

export const pulseRole = "MeshAuraField";
export const surfaceMeta = Object.freeze({
  surface: "PulseMeshAura-v30",
  band: "symbolic",
  behavior: "aura-field-metadata"
});

export const pulseLoreContext = Object.freeze({
  mythos: "IMMORTAL+++ Mesh Aura",
  description:
    "System-wide aura field that stabilizes, syncs, and gently shapes mesh behavior via flags-only metadata.",
  lineage: [
    "PulseMeshAura-v7",
    "PulseMeshAura-v11",
    "PulseMeshAura-v12.3",
    "PulseMeshAura-v24-IMMORTAL-ADVANTAGE++",
    "PulseMeshAura-v30-IMMORTAL+++"
  ]
});

export const AI_EXPERIENCE_META = Object.freeze({
  experienceTier: "IMMORTAL+++",
  auraAware: true,
  meshAware: true,
  presenceAware: true,
  bluetoothPresence: true,
  longRangePulseMode: true,
  bleIdleMode: true
});

export const EXPORT_META = Object.freeze({
  id: "PulseMeshAura-v30-IMMORTAL+++",
  kind: "MeshAuraField",
  defaultBand: "symbolic"
});

// ============================================================================
// AURA STATE — v30 IMMORTAL+++
// ============================================================================
const AuraState = {
  // Stabilization
  loopStrength: 0.0,
  loopMaxDepth: 3,

  // Multi-instance resonance
  instanceId: "instance-default",
  clusterId: "cluster-default",
  syncStrength: 0.0,

  // Flow + pressure sensing
  flowPressure: 0.0,
  recentThrottleRate: 0.0,

  // Binary-awareness
  binaryPreference: 0.0,
  binaryMeshReady: true,
  binaryOSReady: true,

  // Presence-awareness
  presenceBand: "symbolic", // symbolic | binary | dual
  presenceTag: "PulseMeshAura-v30",

  // Advantage-awareness
  advantageBias: 0.0, // 0..1: systemic advantage cascade

  // Mesh tier + long-range strategy (metadata-only)
  meshTier: "host", // "host" | "satellite" | "relay"
  longRangePulseBias: 0.0, // 0..1: how strongly aura prefers long-range pulses
  bleIdleBias: 1.0,        // 0..1: how strongly aura prefers BLE-idle mode

  // Bluetooth presence snapshot (metadata-only)
  bluetoothPresence: {
    deviceId: null,
    linkQuality: 0.0,      // 0..1
    proximityTier: "unknown", // "near" | "mid" | "far" | "unknown"
    transport: "unknown"   // "ble" | "wifi" | "wired" | "unknown"
  },

  meta: {
    layer: "PulseMeshAura",
    role: "AURA_FIELD",
    version: "v30-IMMORTAL+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      localAware: true,
      internetAware: true,
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,
      unifiedAdvantageField: true,
      futureEvolutionReady: true,
      signalFactoringAware: true,
      deterministicField: true,
      zeroCompute: true,
      zeroMutation: true,
      binaryAware: true,
      binaryMeshReady: true,
      binaryOSReady: true,
      pulseMesh11Ready: true,
      presenceAware: true,
      bandAware: true,
      bluetoothPresenceAware: true,
      meshTierAware: true,
      longRangePulseAware: true,
      bleIdleAware: true
    }
  }
};

// ============================================================================
// AURA CONTROL — trusted writers only (Flow, Mesh, Presence, Brainstem)
// ============================================================================
export const PulseAuraControl = {
  setLoopStrength(v) { AuraState.loopStrength = clamp01(v); },
  setLoopMaxDepth(d) {
    AuraState.loopMaxDepth = Number.isFinite(d) ? Math.max(0, d) : AuraState.loopMaxDepth;
  },
  setSyncStrength(v) { AuraState.syncStrength = clamp01(v); },
  setInstanceId(id) { if (typeof id === "string" && id) AuraState.instanceId = id; },
  setClusterId(id) { if (typeof id === "string" && id) AuraState.clusterId = id; },
  setFlowPressure(v) { AuraState.flowPressure = clamp01(v); },
  setRecentThrottleRate(v) { AuraState.recentThrottleRate = clamp01(v); },
  setBinaryPreference(v) { AuraState.binaryPreference = clamp01(v); },
  setPresenceBand(b) {
    if (b === "symbolic" || b === "binary" || b === "dual") AuraState.presenceBand = b;
  },
  setPresenceTag(tag) { if (typeof tag === "string" && tag) AuraState.presenceTag = tag; },
  setAdvantageBias(v) { AuraState.advantageBias = clamp01(v); },

  setMeshTier(tier) {
    const t = (tier || "").toLowerCase();
    if (t === "satellite" || t === "relay" || t === "host") {
      AuraState.meshTier = t;
    }
  },
  setLongRangePulseBias(v) { AuraState.longRangePulseBias = clamp01(v); },
  setBleIdleBias(v) { AuraState.bleIdleBias = clamp01(v); },

  setBluetoothPresence(p = {}) {
    const deviceId = typeof p.deviceId === "string" ? p.deviceId : null;
    const linkQualityRaw = Number(p.linkQuality);
    const linkQuality = Number.isFinite(linkQualityRaw)
      ? clamp01(linkQualityRaw)
      : 0;

    let proximityTier = p.proximityTier || "unknown";
    if (!["near", "mid", "far", "unknown"].includes(proximityTier)) {
      proximityTier = "unknown";
    }

    let transport = p.transport || "unknown";
    if (!["ble", "wifi", "wired", "unknown"].includes(transport)) {
      transport = "unknown";
    }

    AuraState.bluetoothPresence = {
      deviceId,
      linkQuality,
      proximityTier,
      transport
    };
  },

  snapshot() {
    return {
      ...AuraState,
      bluetoothPresence: { ...AuraState.bluetoothPresence },
      meta: {
        ...AuraState.meta,
        evo: { ...AuraState.meta.evo }
      }
    };
  }
};

// ============================================================================
// AURA PACK — v30 IMMORTAL+++
// Pure metadata shaping. Flags only. Zero compute.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export const PulseAura = {

  // Stabilization sensing
  senseStabilization(impulse) {
    const p = AuraState.flowPressure;
    const t = AuraState.recentThrottleRate;

    impulse.flags = impulse.flags || {};

    if (p > 0.25 || t > 0.1) impulse.flags["aura_system_under_tension"] = true;
    if (p > 0.45 || t > 0.2) impulse.flags["aura_stabilization_needed"] = true;

    return impulse;
  },

  // Loop tagging
  tagLoop(impulse) {
    impulse.flags = impulse.flags || {};

    const drifted =
      impulse.flags.cortex_anomaly ||
      impulse.flags.immune_quarantined ||
      impulse.flags.aura_stabilization_needed ||
      impulse.flags.skin_boundary_load > 0.7;

    const depth = impulse.flags.aura_loop_depth || 0;

    if (drifted && AuraState.loopStrength > 0 && depth < AuraState.loopMaxDepth) {
      impulse.flags["aura_in_loop"] = true;
      impulse.flags["aura_loop_depth"] = depth + 1;
    }

    return impulse;
  },

  // Loop hint
  loopHint(impulse) {
    if (impulse.flags.aura_in_loop) {
      impulse.flags["aura_prefers_stable_routes"] = true;
    }
    return impulse;
  },

  // Sync tagging
  tagSync(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags["aura_instance"] = AuraState.instanceId;
    impulse.flags["aura_cluster"] = AuraState.clusterId;
    return impulse;
  },

  // Sync hint
  syncHint(impulse) {
    if (AuraState.syncStrength > 0) {
      impulse.flags = impulse.flags || {};
      impulse.flags["aura_sync_candidate"] = true;
    }
    return impulse;
  },

  // Factoring hint
  factoringHint(impulse) {
    const p = AuraState.flowPressure;
    const t = AuraState.recentThrottleRate;

    if (p <= 0.25 && t <= 0.1) return impulse;

    impulse.flags = impulse.flags || {};
    impulse.flags["aura_prefers_factored_paths"] = true;
    impulse.flags["aura_factoring_bias"] = clamp01((p + t) / 2);

    return impulse;
  },

  // Binary-awareness
  binaryHint(impulse) {
    impulse.flags = impulse.flags || {};

    if (AuraState.binaryPreference > 0 && AuraState.binaryMeshReady) {
      impulse.flags["aura_prefers_binary_mesh"] = true;
      impulse.flags["aura_binary_mesh_bias"] = AuraState.binaryPreference;
    }

    if (AuraState.binaryOSReady) {
      impulse.flags["aura_binary_os_available"] = true;
    }

    return impulse;
  },

  // Presence-awareness
  presenceHint(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags["aura_presence_band"] = AuraState.presenceBand;
    impulse.flags["aura_presence_tag"] = AuraState.presenceTag;
    return impulse;
  },

  // Advantage-awareness
  advantageHint(impulse) {
    if (AuraState.advantageBias > 0) {
      impulse.flags = impulse.flags || {};
      impulse.flags["aura_advantage_bias"] = AuraState.advantageBias;
      impulse.flags["aura_advantage_cascade"] = true;
    }
    return impulse;
  },

  // Mesh tier hint (host / satellite / relay)
  meshTierHint(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags["aura_mesh_tier"] = AuraState.meshTier;
    if (AuraState.meshTier === "satellite") {
      impulse.flags["aura_prefers_satellite_mesh"] = true;
    }
    if (AuraState.meshTier === "relay") {
      impulse.flags["aura_prefers_relay_mesh"] = true;
    }
    if (AuraState.meshTier === "host") {
      impulse.flags["aura_prefers_host_mesh"] = true;
    }
    return impulse;
  },

  // Long-range vs BLE strategy hint
  longRangeStrategyHint(impulse) {
    impulse.flags = impulse.flags || {};

    const lr = AuraState.longRangePulseBias;
    const ble = AuraState.bleIdleBias;

    if (lr > 0) {
      impulse.flags["aura_long_range_pulse_bias"] = lr;
      impulse.flags["aura_long_range_candidate"] = true;
    }

    if (ble > 0) {
      impulse.flags["aura_ble_idle_bias"] = ble;
      impulse.flags["aura_ble_idle_candidate"] = true;
    }

    return impulse;
  },

  // Bluetooth presence hint
  bluetoothPresenceHint(impulse) {
    impulse.flags = impulse.flags || {};
    const bp = AuraState.bluetoothPresence || {};

    impulse.flags["aura_bt_device_id"] = bp.deviceId || null;
    impulse.flags["aura_bt_link_quality"] = bp.linkQuality || 0;
    impulse.flags["aura_bt_proximity_tier"] = bp.proximityTier || "unknown";
    impulse.flags["aura_bt_transport"] = bp.transport || "unknown";

    if (bp.transport === "ble") {
      impulse.flags["aura_bt_ble_preferred"] = true;
    }

    if (bp.proximityTier === "near") {
      impulse.flags["aura_bt_near_field"] = true;
    } else if (bp.proximityTier === "far") {
      impulse.flags["aura_bt_far_field"] = true;
    }

    return impulse;
  }
};

// ============================================================================
// APPLY AURA — v30 IMMORTAL+++
// ============================================================================
export function applyPulseAura(impulse) {
  impulse.flags = impulse.flags || {};
  impulse.flags.aura_meta = AuraState.meta;
  impulse.flags.aura_meta_version = AuraState.meta.version;
  impulse.flags.aura_meta_layer = AuraState.meta.layer;
  impulse.flags.aura_meta_role = AuraState.meta.role;

  PulseAura.senseStabilization(impulse);
  PulseAura.tagLoop(impulse);
  PulseAura.loopHint(impulse);
  PulseAura.tagSync(impulse);
  PulseAura.syncHint(impulse);
  PulseAura.factoringHint(impulse);
  PulseAura.binaryHint(impulse);
  PulseAura.presenceHint(impulse);
  PulseAura.advantageHint(impulse);
  PulseAura.meshTierHint(impulse);
  PulseAura.longRangeStrategyHint(impulse);
  PulseAura.bluetoothPresenceHint(impulse);

  impulse.flags["aura_applied"] = true;

  return impulse;
}

// ============================================================================
// INTERNAL — clamp
// ============================================================================
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================
export default {
  PulseMeshAuraMeta,
  pulseRole,
  surfaceMeta,
  pulseLoreContext,
  AI_EXPERIENCE_META,
  EXPORT_META,
  PulseAuraControl,
  PulseAura,
  applyPulseAura
};

PulseRealm.MeshAura = {
  PulseMeshAuraMeta,
  AuraState,
  pulseRole,
  surfaceMeta,
  pulseLoreContext,
  AI_EXPERIENCE_META,
  EXPORT_META,
  PulseAuraControl,
  PulseAura,
  applyPulseAura
}
export const PulseMeshAura = PulseAura;
PulseRealm.PulseMeshAura = PulseAura;
PulseRealm.PulseMeshAuraApply = applyPulseAura;