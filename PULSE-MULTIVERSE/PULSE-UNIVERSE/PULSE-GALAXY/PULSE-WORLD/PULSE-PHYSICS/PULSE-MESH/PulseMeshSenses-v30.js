// ============================================================================
// FILE: /organs/senses/PulseMeshSenses-v30-IMMORTAL-ADVANTAGE+++.js
// [pulse:senses] PULSE_MESH_SENSES v30-IMMORTAL-ADVANTAGE+++  // white-silver-gold
// Unified Sensory Cortex • Mesh+Satellite Awareness Brain • Global Advantage Field
// Organism-Aware • Presence-Relay-Aware • SatelliteMesh-Aware • Earn/Liquidity-Aware
// ============================================================================
//
// IDENTITY — THE SENSES CORTEX (v30-IMMORTAL-ADVANTAGE+++):
// --------------------------------------------------------
// • Unified sensory cortex for the organism + mesh + satellite shell.
// • Reads from:
//      - PulseHalo          (counters + safety + mesh metrics)
//      - PulseField         (internal weather + pressure signals)
//      - PulseEcho          (diagnostic reflection sonar v15+)
//      - PulseClinician     (endocrine + mesh interpretation)
//      - SDN context        (v12.3-Presence nervous system)
//      - OrganismMesh       (artery + consciousness + mode) [optional]
//      - PulseMeshPresenceRelay v24+ (nearby presence window) [optional]
//      - SatelliteMesh      (orbital links + ground-station bands) [optional]
//      - GroundStationView  (downlink/uplink health + pass windows) [optional]
//      - EarnEngineView     (earn pressure + route health) [optional]
//      - LiquidityOracle    (global compute liquidity + saturation) [optional]
// • Produces a deterministic unified awareness model for:
//      - Awareness Page
//      - Backend AI
//      - Clinician
//      - Immune Commander
//      - OrganismMesh / Overmind-Prime
//      - Mesh/Satellite/Earn orchestration
//
// SAFETY CONTRACT (v30-IMMORTAL-ADVANTAGE+++):
// -------------------------------------------
// • Metadata-only.
// • Read-only — NEVER mutates impulses.
// • No routing, no hormones, no memory writes.
// • Deterministic-field: same system → same awareness snapshot.
// • Zero imports — all dependencies injected by CNS Brain.
// • Binary-aware, dual-mode-ready, mesh-aware, satellite-aware, presence-aware, drift-proof.
// • Organism-aware, artery-aware, consciousness-aware, presence-relay-aware, earn/liquidity-aware.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





export function createPulseSenses({
  PulseHalo,
  PulseFieldRead,
  PulseEcho,
  PulseClinician,
  SDN,
  // v24++ optional organism + presence relay
  OrganismMesh = null,           // { getOrganismArtery?, getOrganismConsciousness?, getOrganismMode?, getOrganismReport? }
  PulseMeshPresenceRelay = null, // { getNearbyPresenceWindow?, getPresenceSnapshot? }
  // v30+++ optional satellite + ground + earn + liquidity
  SatelliteMesh = null,          // { snapshotForSenses? }
  GroundStationView = null,      // { snapshotForSenses? }
  EarnEngineView = null,         // { snapshotForSenses? }
  LiquidityOracle = null,        // { snapshotForSenses? }
  log,
  warn,
  error
}) {

  const sensesMeta = {
    layer: "PulseSenses",
    role: "AWARENESS_CORTEX",
    version: "30-IMMORTAL-ADVANTAGE+++",
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

      meshAware: true,
      organismAware: true,
      arteryAware: true,
      consciousnessAware: true,
      presenceRelayAware: true,

      // v30+++ extensions
      satelliteAware: true,
      groundStationAware: true,
      orbitalBandAware: true,
      downlinkWindowAware: true,
      earnAware: true,
      earnPressureAware: true,
      liquidityAware: true,
      globalComputeAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  };

  const Senses = {
    meta: sensesMeta,

    snapshot(entryNodeId, context = {}) {
      return this.status(entryNodeId, context);
    },

    // -------------------------------------------------------
    // STATUS — Unified Sensory Model (v30-IMMORTAL-ADVANTAGE+++)
    // -------------------------------------------------------
    status(entryNodeId, context = {}) {
      const halo = safeStatus(PulseHalo, "status");
      const field = safeSnapshot(PulseFieldRead, "snapshot");
      const echoReflection = safeEcho(PulseEcho, entryNodeId, context);
      const clinicianView = safeClinician(PulseClinician, entryNodeId, context);
      const sdnView = SDN.snapshot() ?? {};

      const organism = buildOrganismView(OrganismMesh);
      const presenceRelayView = buildPresenceRelayView(PulseMeshPresenceRelay);

      const satellite = buildSatelliteView(SatelliteMesh);
      const groundStation = buildGroundStationView(GroundStationView);
      const earn = buildEarnView(EarnEngineView);
      const liquidity = buildLiquidityView(LiquidityOracle);

      return buildUnifiedAwareness({
        meta: sensesMeta,
        halo,
        field,
        echo: echoReflection,
        clinician: clinicianView,
        sdn: sdnView,
        organism,
        presenceRelay: presenceRelayView,
        satellite,
        groundStation,
        earn,
        liquidity
      });
    },

    // -------------------------------------------------------
    // AWARENESS PAGE VIEW (v30-IMMORTAL-ADVANTAGE+++)
    // -------------------------------------------------------
    forAwarenessPage(entryNodeId, context = {}) {
      const unified = this.status(entryNodeId, context);

      return {
        performance: unified.performance,
        stability: unified.stability,
        drift: unified.drift,
        environment: unified.environment,
        safety: unified.safety,
        hormones: unified.hormones,
        aura: unified.aura,
        mesh: unified.mesh,
        sdn: unified.sdn,
        mode: unified.mode,
        presence: unified.presence,
        organism: unified.organism,
        presenceRelay: unified.presenceRelay,
        satellite: unified.satellite,
        groundStation: unified.groundStation,
        earn: unified.earn,
        liquidity: unified.liquidity,
        narrative: unified.narrative_for_you
      };
    },

    // -------------------------------------------------------
    // AI VIEW (v30-IMMORTAL-ADVANTAGE+++)
    // -------------------------------------------------------
    forAI(entryNodeId, context = {}) {
      const unified = this.status(entryNodeId, context);

      return {
        performance_percent: unified.performance.percent,
        performance_hint: unified.performance.hint,
        stability: unified.stability.value,
        drift_risk: unified.drift.value,
        environment: unified.environment,
        safety: unified.safety,
        hormones: unified.hormones,
        aura: unified.aura,
        mesh: unified.mesh,
        sdn: unified.sdn,
        mode: unified.mode,
        presence: unified.presence,
        organism: unified.organism,
        presenceRelay: unified.presenceRelay,
        satellite: unified.satellite,
        groundStation: unified.groundStation,
        earn: unified.earn,
        liquidity: unified.liquidity,
        narrative_for_ai: unified.narrative_for_ai
      };
    },

    // -------------------------------------------------------
    // CLINICIAN VIEW (v30-IMMORTAL-ADVANTAGE+++)
    // -------------------------------------------------------
    forClinician(entryNodeId, context = {}) {
      return this.status(entryNodeId, context).clinician_view;
    }
  };

  return Senses;
}

// ============================================================================
// SAFE HELPERS
// ============================================================================

function safeStatus(obj, method) {
  try {
    if (!obj || typeof obj[method] !== "function") return {};
    return obj[method]() || {};
  } catch {
    return {};
  }
}

function safeSnapshot(obj, method) {
  try {
    if (!obj || typeof obj[method] !== "function") return {};
    return obj[method]() || {};
  } catch {
    return {};
  }
}

function safeEcho(PulseEcho, entryNodeId, context) {
  try {
    if (!PulseEcho || typeof PulseEcho.sendEcho !== "function") return {};
    return PulseEcho.sendEcho(entryNodeId, context) || {};
  } catch {
    return {};
  }
}

function safeClinician(PulseClinician, entryNodeId, context) {
  try {
    if (!PulseClinician || typeof PulseClinician.examineSystem !== "function") return {};
    return PulseClinician.examineSystem(entryNodeId, context) || {};
  } catch {
    return {};
  }
}

function buildOrganismView(OrganismMesh) {
  if (!OrganismMesh) {
    return {
      mode: "unknown",
      artery: null,
      consciousness: null,
      report: null
    };
  }

  try {
    const artery = OrganismMesh.getOrganismArtery() || null;
    const consciousness = OrganismMesh.getOrganismConsciousness() || null;
    const mode = OrganismMesh.getOrganismMode() || "unknown";
    const report = OrganismMesh.getOrganismReport() || null;

    return {
      mode,
      artery,
      consciousness,
      report
    };
  } catch {
    return {
      mode: "unknown",
      artery: null,
      consciousness: null,
      report: null
    };
  }
}

function buildPresenceRelayView(PulseMeshPresenceRelay) {
  if (!PulseMeshPresenceRelay) {
    return {
      nearbyPresence: [],
      bandStats: {},
      lastScanAt: 0,
      snapshot: null
    };
  }

  try {
    const window = PulseMeshPresenceRelay.getNearbyPresenceWindow() || {
      nearbyPresence: [],
      bandStats: {},
      lastScanAt: 0
    };
    const snapshot = PulseMeshPresenceRelay.getPresenceSnapshot() || null;

    return {
      nearbyPresence: PulseRealm.nearbyPresence || [],
      bandStats: PulseRealm.bandStats || {},
      lastScanAt: PulseRealm.lastScanAt || 0,
      snapshot
    };
  } catch {
    return {
      nearbyPresence: [],
      bandStats: {},
      lastScanAt: 0,
      snapshot: null
    };
  }
}

// v30+++ satellite / ground / earn / liquidity views
function buildSatelliteView(SatelliteMesh) {
  if (!SatelliteMesh) {
    return {
      links_active: 0,
      orbital_band: null,
      latency_ms: null,
      pass_window_open: false,
      health: "unknown"
    };
  }

  try {
    const snap = SatelliteMesh.snapshotForSenses() || {};
    return {
      links_active: snap.links_active ?? 0,
      orbital_band: snap.orbital_band ?? null,
      latency_ms: snap.latency_ms ?? null,
      pass_window_open: !!snap.pass_window_open,
      health: snap.health ?? "unknown"
    };
  } catch {
    return {
      links_active: 0,
      orbital_band: null,
      latency_ms: null,
      pass_window_open: false,
      health: "unknown"
    };
  }
}

function buildGroundStationView(GroundStationView) {
  if (!GroundStationView) {
    return {
      station_id: null,
      downlink_health: "unknown",
      uplink_health: "unknown",
      next_pass_seconds: null
    };
  }

  try {
    const snap = GroundStationView.snapshotForSenses() || {};
    return {
      station_id: snap.station_id ?? null,
      downlink_health: snap.downlink_health ?? "unknown",
      uplink_health: snap.uplink_health ?? "unknown",
      next_pass_seconds: snap.next_pass_seconds ?? null
    };
  } catch {
    return {
      station_id: null,
      downlink_health: "unknown",
      uplink_health: "unknown",
      next_pass_seconds: null
    };
  }
}

function buildEarnView(EarnEngineView) {
  if (!EarnEngineView) {
    return {
      earn_pressure: 0,
      earn_routes_active: 0,
      earn_saturation: 0,
      mode: "idle"
    };
  }

  try {
    const snap = EarnEngineView.snapshotForSenses() || {};
    return {
      earn_pressure: snap.earn_pressure ?? 0,
      earn_routes_active: snap.earn_routes_active ?? 0,
      earn_saturation: snap.earn_saturation ?? 0,
      mode: snap.mode ?? "idle"
    };
  } catch {
    return {
      earn_pressure: 0,
      earn_routes_active: 0,
      earn_saturation: 0,
      mode: "idle"
    };
  }
}

function buildLiquidityView(LiquidityOracle) {
  if (!LiquidityOracle) {
    return {
      global_liquidity: 1,
      saturation_risk: 0,
      region_liquidity: {}
    };
  }

  try {
    const snap = LiquidityOracle.snapshotForSenses() || {};
    return {
      global_liquidity: snap.global_liquidity ?? 1,
      saturation_risk: snap.saturation_risk ?? 0,
      region_liquidity: snap.region_liquidity ?? {}
    };
  } catch {
    return {
      global_liquidity: 1,
      saturation_risk: 0,
      region_liquidity: {}
    };
  }
}

// ============================================================================
// UNIFIED AWARENESS BUILDER (v30-IMMORTAL-ADVANTAGE+++)
// ============================================================================
function buildUnifiedAwareness({
  meta,
  halo,
  field,
  echo,
  clinician,
  sdn,
  organism,
  presenceRelay,
  satellite,
  groundStation,
  earn,
  liquidity
}) {
  const performancePercent = clinician.performancePercent ?? 100;
  const performanceHint = estimatePerformanceHint(performancePercent, field, echo, organism, earn, liquidity);

  const stability = {
    value:
      typeof echo.stability === "number"
        ? echo.stability
        : field.stability ?? halo.health.stability ?? 1,
    label: "Internal Stability"
  };

  const drift = {
    value:
      typeof echo.driftRisk === "number"
        ? echo.driftRisk
        : field.driftPressure ?? halo.health.drift_risk ?? 0,
    label: "Drift Pressure"
  };

  const environment = {
    friction: field.friction,
    noise: field.noise,
    load_wave: field.loadWave,
    external_heat: field.externalHeat,
    external_storm: field.externalStorm,
    external_signal: field.externalSignal,

    flow_pressure: field.flowPressure,
    throttle_rate: field.throttleRate,
    aura_tension: field.auraTension,
    reflex_drop_rate: field.reflexDropRate,
    mesh_storm_pressure: field.meshStormPressure,
    drift_pressure: field.driftPressure,
    resonance: field.resonance,

    binary_mode_pressure: field.binaryModePressure,
    symbolic_mode_pressure: field.symbolicModePressure,
    dual_mode_resonance: field.dualModeResonance,

    presence_binary_pressure: field.presenceBinaryPressure,
    presence_symbolic_pressure: field.presenceSymbolicPressure,
    presence_dual_pressure: field.presenceDualPressure,

    flow_throttled: !!echo.flow.throttled,
    flow_throttled_reason: echo.flow.reason || null
  };

  const safety = {
    reflex_drops: halo.safety.reflex_drops ?? 0,
    immune_quarantines: halo.safety.immune_quarantines ?? 0,
    anomaly_rate: halo.safety.anomaly_rate ?? 0,
    immune_quarantined: !!echo.immune.quarantined
  };

  const hormones = {
    boosts: halo.hormones.boosts ?? 0,
    damps: halo.hormones.damps ?? 0,
    modulation_events: halo.hormones.modulation_events ?? 0,
    tone: halo.hormones.tone ?? null,
    last_event: echo.hormones.event || null
  };

  const aura = {
    loops: halo.aura.loops ?? 0,
    syncs: halo.aura.syncs ?? 0,
    in_loop: !!echo.aura.inLoop,
    stabilization_needed: !!echo.aura.stabilizationNeeded,
    system_under_tension: !!echo.aura.systemUnderTension
  };

  const mesh = {
    hops: halo.mesh.hops ?? echo.mesh.hops ?? 0,
    avg_hops: halo.mesh.avg_hops ?? 0,
    stalled: !!echo.mesh.stalled,
    reflex_drops: !!echo.mesh.reflexDrops
  };

  const sdnView = {
    active_impulses: sdn.activeImpulses ?? 0,
    queued: sdn.queued ?? 0,
    mode: sdn.mode ?? "normal"
  };

  const mode = {
    binary: echo.mode.binary ?? false,
    symbolic: !echo.mode.binary,
    dual: echo.mode.dual ?? false
  };

  const presenceBand =
    echo.presence.band ||
    (echo.mode.binary ? "binary" : echo.mode.dual ? "dual" : "symbolic");

  const presence = {
    band: presenceBand,
    tag: echo.presence.tag || null,
    binary_pressure: field.presenceBinaryPressure,
    symbolic_pressure: field.presenceSymbolicPressure,
    dual_pressure: field.presenceDualPressure
  };

  const narrative_for_you = buildNarrativeForYou({
    performancePercent,
    stability,
    drift,
    environment,
    safety,
    hormones,
    aura,
    mesh,
    sdn: sdnView,
    mode,
    presence,
    organism,
    presenceRelay,
    satellite,
    groundStation,
    earn,
    liquidity
  });

  const narrative_for_ai = buildNarrativeForAI({
    performancePercent,
    stability,
    drift,
    environment,
    safety,
    hormones,
    aura,
    mesh,
    sdn: sdnView,
    mode,
    presence,
    organism,
    presenceRelay,
    satellite,
    groundStation,
    earn,
    liquidity
  });

  return {
    meta,
    performance: { percent: performancePercent, hint: performanceHint },
    stability,
    drift,
    environment,
    safety,
    hormones,
    aura,
    mesh,
    sdn: sdnView,
    mode,
    presence,
    organism,
    presenceRelay,
    satellite,
    groundStation,
    earn,
    liquidity,
    clinician_view: clinician,
    narrative_for_you,
    narrative_for_ai
  };
}

// ============================================================================
// NARRATIVE + PERFORMANCE HINTS (v30-IMMORTAL-ADVANTAGE+++)
// ============================================================================
function estimatePerformanceHint(perf, field, echo, organism, earn, liquidity) {
  const arteryPressure = organism.artery.pressure ?? 0;
  const arteryErrorRate = organism.artery.errorRate ?? 0;
  const earnPressure = earn.earn_pressure ?? 0;
  const saturationRisk = liquidity.saturation_risk ?? 0;

  if (perf > 110) return "overperforming_compensated";
  if (perf > 100 && arteryPressure < 0.3) return "organism_overperforming_low_pressure";
  if (perf > 95 && earnPressure < 0.5 && saturationRisk < 0.5) return "stable_optimal_global";
  if (perf > 85 && arteryErrorRate < 0.1) return "stable_compensating";

  if (field.driftPressure > 0.4 || echo.aura.inLoop) return "drift_rising";
  if (field.meshStormPressure > 0.4) return "routing_turbulence";
  if (arteryPressure > 0.6) return "organism_high_pressure";
  if (earnPressure > 0.7 || saturationRisk > 0.7) return "earn_liquidity_tension";
  return "mixed_state";
}

function buildNarrativeForYou({
  performancePercent,
  stability,
  drift,
  environment,
  safety,
  hormones,
  aura,
  mesh,
  sdn,
  mode,
  presence,
  organism,
  presenceRelay,
  satellite,
  groundStation,
  earn,
  liquidity
}) {
  const perf = performancePercent.toFixed(1);
  const parts = [];

  parts.push(`We are at ${perf}% performance.`);

  if (organism.mode && organism.mode !== "idle") {
    parts.push(`Organism Mode: ${organism.mode}.`);
  }

  if (mode.binary) parts.push("Binary Mode is active — reflex pathways are optimized.");
  if (mode.dual) parts.push("Dual Mode resonance detected — hybrid pathways engaged.");

  if (presence.band === "binary") parts.push("Presence-Band: Binary — system tuned for precision.");
  if (presence.band === "dual") parts.push("Presence-Band: Dual — system balancing symbolic and binary.");
  if (presence.band === "symbolic") parts.push("Presence-Band: Symbolic — system tuned for semantic clarity.");

  if (stability.value > 0.85) parts.push("Stability is strong and holding.");
  else if (stability.value > 0.6) parts.push("Stability is okay but should be watched.");
  else parts.push("Stability is low — system is working harder to stay balanced.");

  if (drift.value > 0.4) parts.push("Drift Pressure is elevated — patterns may be drifting.");

  if (environment.flow_pressure > 0.5) parts.push("Flow Pressure is high — the organism is under tension.");
  if (environment.throttle_rate > 0.3) parts.push("Throttle Rate is elevated — the system is braking frequently.");
  if (environment.aura_tension > 0.4) parts.push("Aura Tension is active — stabilization loops are engaged.");
  if (environment.mesh_storm_pressure > 0.4) parts.push("Mesh Storm Pressure is rising — routing turbulence detected.");

  if (aura.in_loop) parts.push("Aura Loop detected — some patterns may be cycling.");
  if (aura.loops > 0) parts.push("Aura Loops are active — some patterns may be cycling.");
  if (aura.syncs > 0) parts.push("Aura Sync events are helping stabilize the system.");

  if (hormones.modulation_events > 0) parts.push("Hormone Modulation is active — system is compensating.");

  if (safety.immune_quarantines > 0 || safety.reflex_drops > 0 || safety.immune_quarantined) {
    parts.push("Safety systems are isolating unsafe impulses.");
  }

  if (sdn.active_impulses > 1000) {
    parts.push("SDN load is elevated — impulse traffic is high.");
  }

  if (mesh.hops > 0 && mesh.hops < 5) {
    parts.push("Mesh routing is light — pathways are short and efficient.");
  } else if (mesh.hops >= 5 && mesh.hops < 15) {
    parts.push("Mesh routing is moderate — pathways are actively engaged.");
  } else if (mesh.hops >= 15) {
    parts.push("Mesh routing is high — pathways are long and busy.");
  }

  if (mesh.stalled) {
    parts.push("Mesh reports stalled segments — some pathways may be congested or paused.");
  }

  const nearbyCount = presenceRelay.nearbyPresence.length ?? 0;
  if (nearbyCount > 0) {
    parts.push(`Mesh Presence: ${nearbyCount} nearby organisms detected in the presence PulseRealm.`);
  }

  // Satellite + ground narrative
  if (satellite.links_active > 0) {
    parts.push(`SatelliteMesh: ${satellite.links_active} orbital links active on band ${satellite.orbital_band || "unknown"}.`);
    if (satellite.pass_window_open) {
      parts.push("Satellite pass window is open — long-haul routes are favored.");
    }
  }

  if (groundStation.station_id) {
    parts.push(`Ground Station ${groundStation.station_id}: downlink ${groundStation.downlink_health}, uplink ${groundStation.uplink_health}.`);
    if (groundStation.next_pass_seconds != null) {
      parts.push(`Next pass in ~${groundStation.next_pass_seconds}s.`);
    }
  }

  // Earn + liquidity narrative
  if (earn.earn_routes_active > 0) {
    parts.push(`Earn Engine: ${earn.earn_routes_active} routes active at pressure ${earn.earn_pressure.toFixed(2)}.`);
  }

  if (liquidity.saturation_risk > 0.6) {
    parts.push("Global compute liquidity is tight — saturation risk is elevated.");
  } else if (liquidity.global_liquidity > 1.1) {
    parts.push("Global compute liquidity is abundant — expansion is safe.");
  }

  return parts.join(" ");
}

function buildNarrativeForAI({
  performancePercent,
  stability,
  drift,
  environment,
  safety,
  hormones,
  aura,
  mesh,
  sdn,
  mode,
  presence,
  organism,
  presenceRelay,
  satellite,
  groundStation,
  earn,
  liquidity
}) {
  return {
    performance_percent: performancePercent,
    stability: stability.value,
    drift_pressure: drift.value,
    ...environment,
    reflex_drops: safety.reflex_drops,
    immune_quarantines: safety.immune_quarantines,
    immune_quarantined_flag: safety.immune_quarantined,
    hormone_events: hormones.modulation_events,
    hormone_tone: hormones.tone,
    hormone_last_event: hormones.last_event,
    aura_loops: aura.loops,
    aura_syncs: aura.syncs,
    aura_in_loop: aura.in_loop,
    aura_system_under_tension: aura.system_under_tension,
    mesh_hops: mesh.hops,
    mesh_avg_hops: mesh.avg_hops,
    mesh_stalled: mesh.stalled,
    mesh_reflex_drops: mesh.reflex_drops,
    sdn_active_impulses: sdn.active_impulses,
    sdn_mode: sdn.mode,
    binary_mode: mode.binary,
    dual_mode: mode.dual,
    presence_band: presence.band,
    presence_tag: presence.tag,
    presence_binary_pressure: presence.binary_pressure,
    presence_symbolic_pressure: presence.symbolic_pressure,
    presence_dual_pressure: presence.dual_pressure,

    organism_mode: organism.mode ?? "unknown",
    organism_artery: organism.artery ?? null,
    organism_consciousness: organism.consciousness ?? null,

    presence_relay_nearby_count: presenceRelay.nearbyPresence.length ?? 0,
    presence_relay_band_stats: presenceRelay.bandStats ?? {},

    satellite_links_active: satellite.links_active,
    satellite_orbital_band: satellite.orbital_band,
    satellite_latency_ms: satellite.latency_ms,
    satellite_pass_window_open: satellite.pass_window_open,
    satellite_health: satellite.health,

    ground_station_id: groundStation.station_id,
    ground_downlink_health: groundStation.downlink_health,
    ground_uplink_health: groundStation.uplink_health,
    ground_next_pass_seconds: groundStation.next_pass_seconds,

    earn_pressure: earn.earn_pressure,
    earn_routes_active: earn.earn_routes_active,
    earn_saturation: earn.earn_saturation,
    earn_mode: earn.mode,

    global_liquidity: liquidity.global_liquidity,
    liquidity_saturation_risk: liquidity.saturation_risk,
    liquidity_region: liquidity.region_liquidity
  };
}

PulseRealm.PulseMeshSenses = createPulseSenses;