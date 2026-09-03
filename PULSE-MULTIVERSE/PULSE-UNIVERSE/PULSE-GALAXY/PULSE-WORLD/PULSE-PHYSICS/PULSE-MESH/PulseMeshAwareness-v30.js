// ============================================================================
// FILE: PulseHalo-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE HALO — AWARENESS RING v30
// System-wide Awareness Ring • Mesh + Presence + Advantage Telemetry
// Metadata-only • Zero Payload Access • Deterministic • Dual-Hash Intel
// Presence-aware • Binary-aware • Advantage-cascade-aware • Bluetooth-aware
// Band/Binary/Wave Surface Aware • Immune/Endocrine/Cognition-Aware
// ============================================================================
//
// IDENTITY — THE HALO FIELD (v30-IMMORTAL-ADVANTAGE+++):
//  ----------------------------------------------------
//  • Organism-wide awareness ring around all impulses and mesh activity.
//  • Counts, classifies, and summarizes behavior — never touches payloads.
//  • Dual-mode aware: symbolic / binary / dual-mode impulses.
//  • Presence-band aware: symbolic / binary / dual presence bands.
//  • Advantage-field aware: factored paths, binary preference, advantage events.
//  • Mesh-pressure aware: flow / drift / throttle / aura tension (metadata).
//  • Bluetooth-presence aware: proximity tiers, link quality, transport.
//  • BinaryMesh artery + Cognition snapshots can be attached as metadata.
//  • Fully deterministic: same sequence of counter calls → same HaloState.
//  • Zero randomness, zero timestamps, zero async, zero network, zero FS.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ---------------------------------------------------------------------------
// IMMORTAL INTEL HELPERS — dual-hash (metadata only)
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = { label, intel: intelPayload || {}, classic: classicString || "" };
  return {
    intel: computeHashIntelligence(intelBase),
    classic: computeHash(`${label}::${classicString || ""}`)
  };
}

function clamp01(v) {
  if (!Number.isFinite(v)) return 0;
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}


// ---------------------------------------------------------------------------
// BAND / BINARY / WAVE SURFACE SNAPSHOT (metadata-only)
// ---------------------------------------------------------------------------
function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  if (x.includes("binary")) return "binary";
  if (x.includes("dual")) return "dual";
  if (x.includes("mesh")) return "mesh";
  return "symbolic";
}

function buildBandBinaryWaveSurface({ mode, band, presenceTag, hops = 0 }) {
  const nb = normalizeBand(band || presenceTag || "symbolic");
  const m = mode || "symbolic";

  const modeScore =
    m === "binary" ? 1 :
    m === "dual"   ? 0.7 :
                     0.3;

  const bandScore =
    nb === "binary" ? 1 :
    nb === "dual"   ? 0.7 :
                      0.3;

  const hopScore = clamp01(hops / 64);

  const surface = modeScore + bandScore + hopScore;

  return {
    band: nb,
    mode: m,
    hops,
    surface,
    binaryBias: bandScore,
    dualBias: m === "dual" || nb === "dual" ? 1 : 0,
    symbolicBias: m === "symbolic" && nb === "symbolic" ? 1 : 0
  };
}


// ---------------------------------------------------------------------------
// ADVANTAGE SNAPSHOT (metadata-only, no routing influence)
// ---------------------------------------------------------------------------
function buildAdvantageSnapshot({
  factoredPathUses = 0,
  binaryPrefEvents = 0,
  advantageEvents = 0
}) {
  const total = advantageEvents || (factoredPathUses + binaryPrefEvents) || 0;

  const factoredRatio = total ? clamp01(factoredPathUses / total) : 0;
  const binaryRatio   = total ? clamp01(binaryPrefEvents / total) : 0;

  let tier = "advantage_none";
  if (factoredRatio >= 0.5 || binaryRatio >= 0.5) tier = "advantage_high";
  else if (factoredRatio >= 0.2 || binaryRatio >= 0.2) tier = "advantage_medium";
  else if (total > 0) tier = "advantage_low";

  return {
    events: advantageEvents,
    factoredPathUses,
    binaryPreferenceEvents: binaryPrefEvents,
    factoredRatio,
    binaryRatio,
    tier
  };
}


// ---------------------------------------------------------------------------
// PULSE HALO — v30 IMMORTAL-ADVANTAGE+++
// ---------------------------------------------------------------------------
export function createPulseHalo({ log, warn, error } = {}) {

  const HaloState = {
    impulses_total: 0,
    impulses_completed: 0,

    // dual-mode awareness (symbolic vs binary vs dual)
    impulses_symbolic: 0,
    impulses_binary: 0,
    impulses_dual_mode: 0,

    reflex_drops: 0,
    immune_quarantines: 0,

    aura_loops: 0,
    aura_syncs: 0,

    hormone_boosts: 0,
    hormone_damps: 0,

    memory_writes: 0,

    mesh_hops: 0,

    flow_throttles: 0,

    // factoring awareness
    factoring_collapse_events: 0,
    factoring_bias_high: 0,
    factored_path_uses: 0,

    // presence / band awareness (metadata-only)
    presence_symbolic: 0,
    presence_binary: 0,
    presence_dual: 0,

    // advantage-field awareness (metadata-only)
    advantage_events: 0,
    advantage_binary_pref: 0,
    advantage_factored_paths: 0,

    // mesh pressure awareness (metadata-only)
    mesh_flow_pressure_samples: 0,
    mesh_flow_pressure_sum: 0,
    mesh_drift_pressure_samples: 0,
    mesh_drift_pressure_sum: 0,
    mesh_throttle_pressure_samples: 0,
    mesh_throttle_pressure_sum: 0,
    mesh_aura_tension_samples: 0,
    mesh_aura_tension_sum: 0,

    // bluetooth presence awareness (metadata-only)
    bluetooth_events_total: 0,
    bluetooth_near: 0,
    bluetooth_mid: 0,
    bluetooth_far: 0,
    bluetooth_unknown: 0,
    bluetooth_link_quality_sum: 0,
    bluetooth_link_quality_samples: 0,
    bluetooth_ble: 0,
    bluetooth_wifi: 0,
    bluetooth_wired: 0,
    bluetooth_transport_unknown: 0,

    // optional artery / cognition snapshots (last seen, metadata-only)
    last_binary_artery_meta: null,
    last_cognition_meta: null,

    // dual-hash intel signature (updated on snapshot)
    intel_signature: buildDualHashSignature("PulseHalo-v30", {}, ""),

    meta: {
      layer: "PulseHalo",
      role: "AWARENESS_RING",
      version: "30-IMMORTAL-ADVANTAGE+++",
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
        deterministicField: true,
        futureEvolutionReady: true,
        signalFactoringAware: true,
        meshPressureAware: true,
        auraPressureAware: true,

        zeroCompute: true,           // no heavy compute, only ratios/heuristics
        zeroMutation: true,          // never mutates external objects
        zeroRoutingInfluence: true,  // awareness-only, no routing decisions

        // binary + presence awareness
        binaryAware: true,
        binaryMeshReady: true,
        binaryOSReady: true,
        presenceAware: true,
        bandAware: true,

        // bluetooth + proximity awareness
        bluetoothPresenceAware: true,
        bluetoothTransportAware: true,
        proximityTierAware: true
      }
    }
  };


  // -------------------------------------------------------------------------
  // BLUETOOTH CLASSIFICATION
  // -------------------------------------------------------------------------
  function classifyBluetoothPresence(bluetoothPresence) {
    if (!bluetoothPresence || typeof bluetoothPresence !== "object") return;

    HaloState.bluetooth_events_total++;

    const proximity = bluetoothPresence.proximityTier || bluetoothPresence.proximity || "unknown";
    if (proximity === "near") {
      HaloState.bluetooth_near++;
    } else if (proximity === "mid" || proximity === "medium") {
      HaloState.bluetooth_mid++;
    } else if (proximity === "far") {
      HaloState.bluetooth_far++;
    } else {
      HaloState.bluetooth_unknown++;
    }

    const transport = bluetoothPresence.transport || "unknown";
    if (transport === "ble") {
      HaloState.bluetooth_ble++;
    } else if (transport === "wifi") {
      HaloState.bluetooth_wifi++;
    } else if (transport === "wired") {
      HaloState.bluetooth_wired++;
    } else {
      HaloState.bluetooth_transport_unknown++;
    }

    const qRaw = Number(
      bluetoothPresence.linkQuality ??
      bluetoothPresence.quality ??
      bluetoothPresence.rssiRatio
    );
    if (Number.isFinite(qRaw)) {
      const q = clamp01(qRaw);
      HaloState.bluetooth_link_quality_sum += q;
      HaloState.bluetooth_link_quality_samples++;
    }
  }


  // -------------------------------------------------------------------------
  // MODE / BAND CLASSIFICATION
  // -------------------------------------------------------------------------
  function classifyMode(mode) {
    if (!mode) return;
    if (mode === "binary") {
      HaloState.impulses_binary++;
    } else if (mode === "symbolic") {
      HaloState.impulses_symbolic++;
    } else if (mode === "dual") {
      HaloState.impulses_dual_mode++;
    }
  }

  function classifyBand(band) {
    if (!band) return;
    if (band === "binary") {
      HaloState.presence_binary++;
    } else if (band === "symbolic") {
      HaloState.presence_symbolic++;
    } else if (band === "dual") {
      HaloState.presence_dual++;
    }
  }

  function trackPresenceTag(_presenceTag) {
    // Intentionally no storage of tag values — only counts via band.
    // Keeps Halo strictly metadata-aggregate, no identity registry.
  }


  // -------------------------------------------------------------------------
  // MESH PRESSURE RECORDING (metadata-only)
// -------------------------------------------------------------------------
  function recordMeshPressures({
    flowPressure,
    driftPressure,
    throttlePressure,
    auraTension
  } = {}) {
    if (Number.isFinite(flowPressure)) {
      HaloState.mesh_flow_pressure_samples++;
      HaloState.mesh_flow_pressure_sum += clamp01(flowPressure);
    }
    if (Number.isFinite(driftPressure)) {
      HaloState.mesh_drift_pressure_samples++;
      HaloState.mesh_drift_pressure_sum += clamp01(driftPressure);
    }
    if (Number.isFinite(throttlePressure)) {
      HaloState.mesh_throttle_pressure_samples++;
      HaloState.mesh_throttle_pressure_sum += clamp01(throttlePressure);
    }
    if (Number.isFinite(auraTension)) {
      HaloState.mesh_aura_tension_samples++;
      HaloState.mesh_aura_tension_sum += clamp01(auraTension);
    }
  }


  // -------------------------------------------------------------------------
  // PUBLIC COUNTERS — v30 IMMORTAL-ADVANTAGE+++
// -------------------------------------------------------------------------
  const PulseHaloCounters = {

    impulseStarted({
      mode,
      band,
      presenceTag,
      bluetoothPresence,
      hops,
      meshFlowPressure,
      meshDriftPressure,
      meshThrottlePressure,
      meshAuraTension
    } = {}) {
      HaloState.impulses_total++;
      classifyMode(mode);
      classifyBand(band);
      trackPresenceTag(presenceTag);
      classifyBluetoothPresence(bluetoothPresence);

      if (Number.isFinite(hops)) {
        HaloState.mesh_hops += hops;
      }

      recordMeshPressures({
        flowPressure: meshFlowPressure,
        driftPressure: meshDriftPressure,
        throttlePressure: meshThrottlePressure,
        auraTension: meshAuraTension
      });
    },

    // Called when an impulse completes successfully.
    impulseCompleted() {
      HaloState.impulses_completed++;
    },

    // Safety-related events.
    reflexDropped() {
      HaloState.reflex_drops++;
    },
    immuneQuarantined() {
      HaloState.immune_quarantines++;
    },

    // Aura-related events.
    auraLooped() {
      HaloState.aura_loops++;
    },
    auraSyncTagged() {
      HaloState.aura_syncs++;
    },

    // Hormone modulation events.
    hormoneBoost() {
      HaloState.hormone_boosts++;
    },
    hormoneDamp() {
      HaloState.hormone_damps++;
    },

    // Memory events.
    memoryWrite() {
      HaloState.memory_writes++;
    },

    // Mesh traversal events (additional increments).
    meshHops(count = 1) {
      HaloState.mesh_hops += count;
    },

    // Flow throttling events.
    impulseThrottled() {
      HaloState.flow_throttles++;
    },

    // Factoring events.
    factoringCollapsedManyToOne() {
      HaloState.factoring_collapse_events++;
    },
    factoringBiasHigh() {
      HaloState.factoring_bias_high++;
    },
    factoredPathUsed() {
      HaloState.factored_path_uses++;
      HaloState.advantage_factored_paths++;
      HaloState.advantage_events++;
    },

    // Advantage-field hooks (metadata-only).
    advantageBinaryPreferred() {
      HaloState.advantage_binary_pref++;
      HaloState.advantage_events++;
    },

    // Optional: attach last-seen BinaryMesh artery snapshot (metadata-only).
    attachBinaryArteryMeta(arterySnapshot) {
      if (!arterySnapshot || typeof arterySnapshot !== "object") return;
      HaloState.last_binary_artery_meta = {
        throughputBucket: arterySnapshot.throughputBucket,
        pressureBucket: arterySnapshot.pressureBucket,
        costBucket: arterySnapshot.costBucket,
        budgetBucket: arterySnapshot.budgetBucket,
        fallbackRatio: arterySnapshot.fallbackRatio,
        avgBitsRatio: arterySnapshot.avgBitsRatio,
        bluetoothEvents: arterySnapshot.bluetoothEvents,
        bluetoothAvgLinkQuality: arterySnapshot.bluetoothAvgLinkQuality
      };
    },

    // Optional: attach last-seen Cognition snapshot (metadata-only).
    attachCognitionMeta(cognitionSnapshot) {
      if (!cognitionSnapshot || typeof cognitionSnapshot !== "object") return;
      HaloState.last_cognition_meta = {
        routes: cognitionSnapshot.routes,
        earners: cognitionSnapshot.earners,
        organs: cognitionSnapshot.organs,
        reflexes: cognitionSnapshot.reflexes,
        mode: cognitionSnapshot.mode,
        band: cognitionSnapshot.band,
        presence: cognitionSnapshot.presence,
        advantage: cognitionSnapshot.advantage,
        bluetooth: cognitionSnapshot.bluetooth
      };
    }
  };


  // -------------------------------------------------------------------------
  // SNAPSHOT + STATUS
  // -------------------------------------------------------------------------
  function snapshot() {
    const advantageSnapshot = buildAdvantageSnapshot({
      factoredPathUses: HaloState.advantage_factored_paths,
      binaryPrefEvents: HaloState.advantage_binary_pref,
      advantageEvents: HaloState.advantage_events
    });

    const bandSurface = buildBandBinaryWaveSurface({
      mode:
        HaloState.impulses_binary > HaloState.impulses_symbolic
          ? "binary"
          : HaloState.impulses_dual_mode > 0
          ? "dual"
          : "symbolic",
      band:
        HaloState.presence_binary > HaloState.presence_symbolic
          ? "binary"
          : HaloState.presence_dual > 0
          ? "dual"
          : "symbolic",
      presenceTag: "PulseHalo-v30",
      hops: HaloState.mesh_hops
    });

    const intelPayload = {
      impulses_total: HaloState.impulses_total,
      impulses_completed: HaloState.impulses_completed,
      advantage: advantageSnapshot,
      bandSurface
    };

    HaloState.intel_signature = buildDualHashSignature(
      "PulseHalo-v30",
      intelPayload,
      `impulses:${HaloState.impulses_total}|completed:${HaloState.impulses_completed}`
    );

    return {
      ...HaloState,
      advantageSnapshot,
      bandSurface,
      meta: {
        ...HaloState.meta,
        evo: { ...HaloState.meta.evo }
      }
    };
  }

  function ratio(n, d) {
    return d ? n / d : 0;
  }

  // Stability: 1 - anomaly density (clamped to [0,1]).
  function stability(s) {
    const anomalies =
      s.reflex_drops + s.immune_quarantines + s.aura_loops;
    const volume = s.impulses_total || 1;
    const r = anomalies / volume;
    return Math.max(0, 1 - Math.min(1, r));
  }

  // Drift: loop density minus sync protection (clamped to [0,1]).
  function drift(s) {
    const loops = s.aura_loops || 0;
    const syncs = s.aura_syncs || 0;
    const volume = s.impulses_total || 1;

    const base = loops / volume;
    const sync_protect = Math.min(0.5, syncs / volume);

    return Math.max(0, Math.min(1, base - sync_protect));
  }

  function status() {
    const s = snapshot();

    const bluetooth_avg_link_quality =
      s.bluetooth_link_quality_samples > 0
        ? s.bluetooth_link_quality_sum / s.bluetooth_link_quality_samples
        : 0;

    const flowPressureAvg =
      s.mesh_flow_pressure_samples > 0
        ? s.mesh_flow_pressure_sum / s.mesh_flow_pressure_samples
        : 0;

    const driftPressureAvg =
      s.mesh_drift_pressure_samples > 0
        ? s.mesh_drift_pressure_sum / s.mesh_drift_pressure_samples
        : 0;

    const throttlePressureAvg =
      s.mesh_throttle_pressure_samples > 0
        ? s.mesh_throttle_pressure_sum / s.mesh_throttle_pressure_samples
        : 0;

    const auraTensionAvg =
      s.mesh_aura_tension_samples > 0
        ? s.mesh_aura_tension_sum / s.mesh_aura_tension_samples
        : 0;

    return {
      meta: s.meta,
      intel_signature: s.intel_signature,

      impulses: {
        total: s.impulses_total,
        completed: s.impulses_completed,
        completion_rate: ratio(s.impulses_completed, s.impulses_total),

        symbolic: s.impulses_symbolic,
        binary: s.impulses_binary,
        dual_mode: s.impulses_dual_mode,

        symbolic_ratio: ratio(s.impulses_symbolic, s.impulses_total),
        binary_ratio: ratio(s.impulses_binary, s.impulses_total),
        dual_mode_ratio: ratio(s.impulses_dual_mode, s.impulses_total)
      },

      safety: {
        reflex_drops: s.reflex_drops,
        immune_quarantines: s.immune_quarantines,
        anomaly_rate: ratio(
          s.reflex_drops + s.immune_quarantines,
          s.impulses_total
        )
      },

      aura: {
        loops: s.aura_loops,
        syncs: s.aura_syncs
      },

      hormones: {
        boosts: s.hormone_boosts,
        damps: s.hormone_damps,
        modulation_events: s.hormone_boosts + s.hormone_damps
      },

      memory: {
        writes: s.memory_writes
      },

      mesh: {
        hops: s.mesh_hops,
        avg_hops: ratio(
          s.mesh_hops,
          s.impulses_completed || s.impulses_total
        ),
        flow_pressure_avg: flowPressureAvg,
        drift_pressure_avg: driftPressureAvg,
        throttle_pressure_avg: throttlePressureAvg,
        aura_tension_avg: auraTensionAvg
      },

      flow: {
        throttles: s.flow_throttles,
        throttle_rate: ratio(
          s.flow_throttles,
          s.impulses_total
        )
      },

      factoring: {
        collapse_events: s.factoring_collapse_events,
        bias_high_events: s.factoring_bias_high,
        factored_path_uses: s.factored_path_uses,
        collapse_rate: ratio(
          s.factoring_collapse_events,
          s.impulses_total
        )
      },

      presence: {
        symbolic: s.presence_symbolic,
        binary: s.presence_binary,
        dual: s.presence_dual,
        symbolic_ratio: ratio(s.presence_symbolic, s.impulses_total),
        binary_ratio: ratio(s.presence_binary, s.impulses_total),
        dual_ratio: ratio(s.presence_dual, s.impulses_total)
      },

      advantage: s.advantageSnapshot,

      bluetooth: {
        events_total: s.bluetooth_events_total,
        near: s.bluetooth_near,
        mid: s.bluetooth_mid,
        far: s.bluetooth_far,
        unknown: s.bluetooth_unknown,
        ble: s.bluetooth_ble,
        wifi: s.bluetooth_wifi,
        wired: s.bluetooth_wired,
        transport_unknown: s.bluetooth_transport_unknown,
        avg_link_quality: bluetooth_avg_link_quality
      },

      bandSurface: s.bandSurface,

      artery_meta: s.last_binary_artery_meta,
      cognition_meta: s.last_cognition_meta,

      health: {
        stability: stability(s),
        drift_risk: drift(s)
      }
    };
  }

  function statusForBackendAI() {
    return status();
  }
PulseRealm.PulseMeshHaloCounters = PulseHaloCounters;
  return {
    counters: PulseHaloCounters,
    snapshot,
    status,
    statusForBackendAI,
    meta: HaloState.meta
  };
}

PulseRealm.MeshAwareness = {
  createPulseHalo
}

PulseRealm.PulseMeshAwareness = createPulseHalo;