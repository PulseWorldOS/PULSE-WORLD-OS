// ============================================================================
// FILE: PulseMeshSkinReflex-v30-IMMORTAL+++.js
// [pulse:mesh] SKIN REFLEX LAYER — v30‑IMMORTAL+++  // red‑white
// ----------------------------------------------------------------------------
// IDENTITY — MESH SKIN REFLEX (v30‑IMMORTAL+++):
// ----------------------------------------------
// • First-contact reflex arc for the Mesh layer (A3).
// • Captures mesh anomalies: stalls, drops, errors, factoring spikes,
//   mesh-tier inconsistencies, long-range pulse failures,
//   BLE presence degradation, artery instability.
// • Emits reflex metadata ONLY — zero payload mutation.
// • Deterministic, drift-proof, multi-instance-ready.
// • Presence-aware, binary-aware, dual-band-ready.
// • Mesh-tier-aware, long-range-aware, bluetooth-aware.
// • Unified-advantage-field, signal-factoring-aware, mesh-pressure-aware.
// • Zero randomness, zero timestamps, zero async, zero network.
// • Attaches at the top of the Mesh (PulseMesh / PulseMeshSpine).
//
// SAFETY CONTRACT (IMMORTAL v30):
// -------------------------------
// • No payload mutation.
// • No routing influence.
// • No compute (metadata-only classification allowed).
// • No async, no timers, no network, no FS.
// • Deterministic-field: identical error → identical reflex metadata.
// • Zero side-effects outside metadata.
// • Reflex only — never blocks routing.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






export function createPulseMeshSkinReflex({
  log,
  warn,
  error,
  context = {}
} = {}) {

  // ==========================================================================
  // IMMORTAL META BLOCK — v30 IMMORTAL+++
  // ==========================================================================
  const meta = {
    layer: "PulseMeshSkinReflex",
    role: "MESH_SKIN_REFLEX",
    version: "30-IMMORTAL+++",
    lineage: "mesh-reflex-v30",
    target: "full-mesh",
    selfRepairable: true,

    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,

      meshAware: true,
      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      arteryDeterministic: true,

      meshPressureAware: true,
      signalFactoringAware: true,
      flowAware: true,
      auraAware: true,
      driftAware: true,

      deterministicField: true,
      unifiedAdvantageField: true,
      driftProof: true,
      multiInstanceReady: true,
      futureEvolutionReady: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true,
      zeroNetworkFetch: true,
      zeroExternalMutation: true
    },

    contract: {
      always: [
        "PulseMeshFlow",
        "PulseMeshEndocrineSystem",
        "PulseMeshImmuneSystem",
        "PulseMeshCognition",
        "PulseMeshOrgans",
        "PulseMeshThalamus"
      ],
      never: [
        "legacyMeshScanner",
        "legacyMeshReflex",
        "safeRoute",
        "fetchViaCNS"
      ]
    }
  };

  // ==========================================================================
  // DETERMINISTIC ERROR CLASSIFICATION — v30 IMMORTAL+++
  // ==========================================================================
  function classify(msg) {
    const t = String(msg || "").toLowerCase();

    if (!t || t === "unknown-mesh-error")
      return { kind: "unknown", severity: "medium" };

    if (t.includes("timeout") || t.includes("stall"))
      return { kind: "stall_timeout", severity: "high" };

    if (t.includes("network") || t.includes("connection"))
      return { kind: "network_like", severity: "high" };

    if (t.includes("overflow") || t.includes("memory"))
      return { kind: "resource_pressure", severity: "high" };

    if (t.includes("syntax"))
      return { kind: "syntax", severity: "medium" };

    if (t.includes("typeerror") || t.includes("undefined"))
      return { kind: "type", severity: "medium" };

    if (t.includes("tier") || t.includes("relay") || t.includes("satellite"))
      return { kind: "mesh_tier_fault", severity: "medium" };

    if (t.includes("ble") || t.includes("bluetooth"))
      return { kind: "bluetooth_presence_fault", severity: "medium" };

    if (t.includes("longrange") || t.includes("long-range"))
      return { kind: "long_range_fault", severity: "medium" };

    if (t.includes("artery"))
      return { kind: "artery_instability", severity: "high" };

    return { kind: "generic", severity: "medium" };
  }

  // ==========================================================================
  // MODE + BAND + TIER + LONG-RANGE + BLE REFLECTION (READ-ONLY)
// ==========================================================================
  function reflectContext() {
    const mode =
      context.binaryMode ? "binary" :
      context.dualMode ? "dual" :
      context.symbolicMode ? "symbolic" :
      "unknown";

    const band =
      context.presenceBand ||
      (context.binaryMode ? "binary" :
       context.dualMode ? "dual" :
       context.symbolicMode ? "symbolic" :
       null);

    const tier = context.meshTier || "host";

    const longRange = !!context.longRangeCandidate;

    const bt = context.bluetoothPresence || null;

    return { mode, band, tier, longRange, bt };
  }

  // ==========================================================================
  // INTERNAL REFLEX HANDLER — IMMORTAL+++
// ==========================================================================
  function handleMeshError(evt) {
    const msg =
      evt.message ||
      evt.error.message ||
      "unknown-mesh-error";

    const { kind, severity } = classify(msg);
    const { mode, band, tier, longRange, bt } = reflectContext();

    const reflex = {
      type: "mesh_reflex",
      meta,
      message: msg,

      flags: {
        mesh_reflex_triggered: true,
        mesh_error: true,
        mesh_error_message: msg,

        mesh_error_kind: kind,
        mesh_error_severity: severity,

        mesh_reflex_mode: mode,
        mesh_reflex_band: band,
        mesh_reflex_tier: tier,
        mesh_reflex_longrange: longRange,

        mesh_stack: evt.error.stack || null,
        mesh_origin: evt.filename || null,
        mesh_line: evt.lineno || null,
        mesh_column: evt.colno || null,

        // v30: BLE presence reflection
        mesh_bt_device_id: bt.deviceId || null,
        mesh_bt_link_quality: bt.linkQuality ?? null,
        mesh_bt_proximity: bt.proximityTier || null,
        mesh_bt_transport: bt.transport || null,

        // v30: artery + pressure + advantage reflection
        mesh_artery_snapshot: context.meshArtery || null,
        mesh_pressure_reflection: context.meshPressure ?? null,
        flow_pressure_reflection: context.flowPressure ?? null,
        aura_pressure_reflection: context.auraPressure ?? null,
        advantage_field_reflection: context.advantageField ?? null,
        advantage_bias_reflection: context.advantageBias ?? null,

        reflex_surface: true,
        prewarm_surface: true,
        chunk_surface: true,
        cache_surface: true
      }
    };

    warn("[MeshSkinReflex v30] Mesh reflex triggered", reflex);
    return reflex;
  }

  // ==========================================================================
  // UNHANDLED REJECTION REFLEX — v30 IMMORTAL+++
// ==========================================================================
  function handleUnhandledRejection(evt) {
    const reason = evt.reason;
    const msg =
      (reason && (reason.message || String(reason))) ||
      "unhandled-rejection";

    const { kind, severity } = classify(msg);
    const { mode, band, tier, longRange, bt } = reflectContext();

    const reflex = {
      type: "mesh_reflex_unhandled_rejection",
      meta,
      message: msg,

      flags: {
        mesh_reflex_triggered: true,
        mesh_error: true,
        mesh_error_message: msg,
        mesh_error_kind: kind,
        mesh_error_severity: severity,

        mesh_reflex_mode: mode,
        mesh_reflex_band: band,
        mesh_reflex_tier: tier,
        mesh_reflex_longrange: longRange,

        mesh_stack: reason.stack || null,

        mesh_bt_device_id: bt.deviceId || null,
        mesh_bt_link_quality: bt.linkQuality ?? null,
        mesh_bt_proximity: bt.proximityTier || null,
        mesh_bt_transport: bt.transport || null,

        reflex_surface: true,
        prewarm_surface: true,
        chunk_surface: true,
        cache_surface: true
      }
    };

    warn("[MeshSkinReflex v30] Mesh unhandled rejection reflex", reflex);
    return reflex;
  }

  // ==========================================================================
  // ATTACH LISTENERS — IMMORTAL+++
// ==========================================================================
  function attach() {
   
      window.addEventListener("error", handleMeshError, true);
      window.addEventListener("unhandledrejection", handleUnhandledRejection, true);

      log("[MeshSkinReflex v30] attached to PulseRealm.error + PulseRealm.unhandledrejection");
    
  }

  // ==========================================================================
  // PREWARM — IMMORTAL+++
// ==========================================================================
  function prewarm() {
    log("[MeshSkinReflex v30] prewarm");
  }

  return Object.freeze({
    meta,
    attach,
    prewarm
  });
}

PulseRealm.MeshSkinReflex = {
  createPulseMeshSkinReflex
}
PulseRealm.PulseSkinReflex = createPulseMeshSkinReflex;