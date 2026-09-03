// ============================================================================
// [pulse:mesh] PULSE_MESH_ENVIRONMENTAL_FIELD v30-IMMORTAL++++ // platinum
// Internal Weather System • Metadata-Only • Stabilization + Pressure Signals
// Presence-Aware • Binary-Aware • Bluetooth-Aware • Dual-Band • Drift-Proof
// Advantage-Aware • Mesh-Pressure-Aware • MeshPulseBand-Aware • 3D-Route-Aware
// Zero-Compute • Zero-Mutation • Zero-Routing-Influence
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function createPulseField_v30({ log, warn, error } = {}) {
  const FieldState = {
    // Global “weather”
    friction: 0,
    noise: 0,
    stability: 1,
    resonance: 0,

    // Pressure + load
    loadWave: 0,
    driftPressure: 0,

    // System pressure
    flowPressure: 0,
    throttleRate: 0,
    auraTension: 0,
    reflexDropRate: 0,
    meshStormPressure: 0,

    // Factoring pressure
    factoringPressure: 0,

    // External influence markers
    externalHeat: 0,
    externalStorm: 0,
    externalSignal: 0,

    // Mode pressure (binary vs symbolic vs dual)
    binaryModePressure: 0,
    symbolicModePressure: 0,
    dualModeResonance: 0,

    // Presence-band pressure
    presenceSymbolicPressure: 0,
    presenceBinaryPressure: 0,
    presenceDualPressure: 0,

    // v24++: Bluetooth presence pressure
    bluetoothProximityPressure: 0,
    bluetoothLinkQualityPressure: 0,
    bluetoothEvents: 0,

    // v24++: derived advantage / survival pressures
    advantagePressure: 0,
    survivalStress: 0,
    meshStormRisk: 0,
    binaryPreference: 0,
    presenceLoad: 0,

    // v30++: Mesh pulse band + 3D route pressures
    meshPulseBandPressure: 0,      // overall mesh “band” pressure (symbolic+binary+3D)
    bluetoothMeshBandPressure: 0,  // bluetooth-driven mesh band pressure
    routeDepthPressure: 0,         // 3D route depth / hops
    routeLatencyPressure: 0,       // 3D RTT / latency
    pulseBandLoad: 0,              // combined load from pulse bands (symbolic/binary/dual/mesh)

    meta: {
      layer: "PulseField",
      role: "ENVIRONMENTAL_FIELD",
      version: "30-IMMORTAL++++",
      target: "full-mesh",
      selfRepairable: true,
      evo: {
        dualMode: true,
        binaryAware: true,
        symbolicAware: true,
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

        presenceAware: true,
        bandAware: true,

        // v24++ additions
        bluetoothPresenceAware: true,
        bluetoothMeshAware: true,

        // v30++ additions
        meshPulseBandAware: true,
        route3DAware: true,
        pulseBandLoadAware: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true
      }
    }
  };

  // ========================================================================
  // FIELD UPDATE API — trusted CNS writers only
  // ========================================================================
  const PulseFieldControl = {
    // Basic setters
    setFriction(v) { FieldState.friction = clamp01(v); },
    setNoise(v) { FieldState.noise = clamp01(v); },
    setStability(v) { FieldState.stability = clamp01(v); },
    setResonance(v) { FieldState.resonance = clamp01(v); },
    setLoadWave(v) { FieldState.loadWave = clamp01(v); },
    setDriftPressure(v) { FieldState.driftPressure = clamp01(v); },

    // System pressure
    setFlowPressure(v) { FieldState.flowPressure = clamp01(v); },
    setThrottleRate(v) { FieldState.throttleRate = clamp01(v); },
    setAuraTension(v) { FieldState.auraTension = clamp01(v); },
    setReflexDropRate(v) { FieldState.reflexDropRate = clamp01(v); },
    setMeshStormPressure(v) { FieldState.meshStormPressure = clamp01(v); },

    // Factoring
    setFactoringPressure(v) { FieldState.factoringPressure = clamp01(v); },

    // External
    setExternalHeat(v) { FieldState.externalHeat = clamp01(v); },
    setExternalStorm(v) { FieldState.externalStorm = clamp01(v); },
    setExternalSignal(v) { FieldState.externalSignal = clamp01(v); },

    // Mode pressure
    setBinaryModePressure(v) { FieldState.binaryModePressure = clamp01(v); },
    setSymbolicModePressure(v) { FieldState.symbolicModePressure = clamp01(v); },
    setDualModeResonance(v) { FieldState.dualModeResonance = clamp01(v); },

    // Presence-band pressure
    setPresenceSymbolicPressure(v) { FieldState.presenceSymbolicPressure = clamp01(v); },
    setPresenceBinaryPressure(v) { FieldState.presenceBinaryPressure = clamp01(v); },
    setPresenceDualPressure(v) { FieldState.presenceDualPressure = clamp01(v); },

    // v24++ Bluetooth presence pressure
    setBluetoothProximityPressure(v) { FieldState.bluetoothProximityPressure = clamp01(v); },
    setBluetoothLinkQualityPressure(v) { FieldState.bluetoothLinkQualityPressure = clamp01(v); },
    setBluetoothEvents(v) { FieldState.bluetoothEvents = Math.max(0, v | 0); },

    // Derived pressures
    setAdvantagePressure(v) { FieldState.advantagePressure = clamp01(v); },
    setSurvivalStress(v) { FieldState.survivalStress = clamp01(v); },
    setMeshStormRisk(v) { FieldState.meshStormRisk = clamp01(v); },
    setBinaryPreference(v) { FieldState.binaryPreference = clamp01(v); },
    setPresenceLoad(v) { FieldState.presenceLoad = clamp01(v); },

    // v30++ mesh pulse band + 3D route
    setMeshPulseBandPressure(v) { FieldState.meshPulseBandPressure = clamp01(v); },
    setBluetoothMeshBandPressure(v) { FieldState.bluetoothMeshBandPressure = clamp01(v); },
    setRouteDepthPressure(v) { FieldState.routeDepthPressure = clamp01(v); },
    setRouteLatencyPressure(v) { FieldState.routeLatencyPressure = clamp01(v); },
    setPulseBandLoad(v) { FieldState.pulseBandLoad = clamp01(v); },

    // Bulk update
    applyEnvironmentSnapshot(env = {}) {
      for (const key in env) {
        if (key in FieldState) {
          const setter = this[`set${key[0].toUpperCase()}${key.slice(1)}`];
          if (typeof setter === "function") setter.call(this, env[key]);
        }
      }
    },

    // v24++ / v30++: derive from Halo + Echo + Cognition + Bluetooth + 3D route
    deriveFromDiagnostics({ halo, echo, cognition, route3D } = {}) {
      try {
        if (halo) applyHaloToField(FieldState, halo);
        if (echo) applyEchoToField(FieldState, echo);
        if (cognition) applyCognitionToField(FieldState, cognition);
        if (route3D) applyRoute3DToField(FieldState, route3D);
        recomputeDerivedPressures(FieldState);
      } catch (e) {
        warn("[PulseField v30] deriveFromDiagnostics failed", e.message || e);
      }
    }
  };

  // ========================================================================
  // FIELD READ API — metadata-only
  // ========================================================================
  const PulseField = {
    snapshot() {
      return {
        ...FieldState,
        meta: { ...FieldState.meta, evo: { ...FieldState.meta.evo } }
      };
    },

    // Raw getters
    getFriction() { return FieldState.friction; },
    getNoise() { return FieldState.noise; },
    getStability() { return FieldState.stability; },
    getResonance() { return FieldState.resonance; },
    getLoadWave() { return FieldState.loadWave; },
    getDriftPressure() { return FieldState.driftPressure; },

    getFlowPressure() { return FieldState.flowPressure; },
    getThrottleRate() { return FieldState.throttleRate; },
    getAuraTension() { return FieldState.auraTension; },
    getReflexDropRate() { return FieldState.reflexDropRate; },
    getMeshStormPressure() { return FieldState.meshStormPressure; },

    getFactoringPressure() { return FieldState.factoringPressure; },

    getExternalHeat() { return FieldState.externalHeat; },
    getExternalStorm() { return FieldState.externalStorm; },
    getExternalSignal() { return FieldState.externalSignal; },

    getBinaryModePressure() { return FieldState.binaryModePressure; },
    getSymbolicModePressure() { return FieldState.symbolicModePressure; },
    getDualModeResonance() { return FieldState.dualModeResonance; },

    getPresenceSymbolicPressure() { return FieldState.presenceSymbolicPressure; },
    getPresenceBinaryPressure() { return FieldState.presenceBinaryPressure; },
    getPresenceDualPressure() { return FieldState.presenceDualPressure; },

    // v24++ Bluetooth
    getBluetoothProximityPressure() { return FieldState.bluetoothProximityPressure; },
    getBluetoothLinkQualityPressure() { return FieldState.bluetoothLinkQualityPressure; },
    getBluetoothEvents() { return FieldState.bluetoothEvents; },

    getAdvantagePressure() { return FieldState.advantagePressure; },
    getSurvivalStress() { return FieldState.survivalStress; },
    getMeshStormRisk() { return FieldState.meshStormRisk; },
    getBinaryPreference() { return FieldState.binaryPreference; },
    getPresenceLoad() { return FieldState.presenceLoad; },

    // v30++ mesh pulse band + 3D route
    getMeshPulseBandPressure() { return FieldState.meshPulseBandPressure; },
    getBluetoothMeshBandPressure() { return FieldState.bluetoothMeshBandPressure; },
    getRouteDepthPressure() { return FieldState.routeDepthPressure; },
    getRouteLatencyPressure() { return FieldState.routeLatencyPressure; },
    getPulseBandLoad() { return FieldState.pulseBandLoad; },

    // Feedback snapshots
    buildFlowHints() {
      return {
        flow_pressure: FieldState.flowPressure,
        throttle_rate: FieldState.throttleRate,
        mesh_storm_risk: FieldState.meshStormRisk,
        survival_stress: FieldState.survivalStress
      };
    },

    buildAuraHints() {
      return {
        aura_tension: FieldState.auraTension,
        drift_pressure: FieldState.driftPressure,
        factoring_pressure: FieldState.factoringPressure,
        binary_preference: FieldState.binaryPreference,
        presence_band_pressure: {
          symbolic: FieldState.presenceSymbolicPressure,
          binary: FieldState.presenceBinaryPressure,
          dual: FieldState.presenceDualPressure
        },
        bluetooth_pressure: {
          proximity: FieldState.bluetoothProximityPressure,
          linkQuality: FieldState.bluetoothLinkQualityPressure,
          events: FieldState.bluetoothEvents
        },
        mesh_pulse_band: {
          mesh: FieldState.meshPulseBandPressure,
          bluetooth_mesh: FieldState.bluetoothMeshBandPressure
        },
        route3d_pressure: {
          depth: FieldState.routeDepthPressure,
          latency: FieldState.routeLatencyPressure
        }
      };
    },

    buildCortexHints() {
      return {
        globalLoad: FieldState.loadWave,
        flowPressure: FieldState.flowPressure,
        recentThrottleRate: FieldState.throttleRate,
        factoringBias: FieldState.factoringPressure,
        driftPressure: FieldState.driftPressure,
        binaryBias: FieldState.binaryPreference,
        externalHeat: FieldState.externalHeat,
        externalStorm: FieldState.externalStorm,
        bluetoothProximity: FieldState.bluetoothProximityPressure,
        bluetoothLinkQuality: FieldState.bluetoothLinkQualityPressure,
        meshPulseBand: FieldState.meshPulseBandPressure,
        routeDepth: FieldState.routeDepthPressure,
        routeLatency: FieldState.routeLatencyPressure
      };
    },

    buildEndocrineHints() {
      return {
        stability: FieldState.stability,
        resonance: FieldState.resonance,
        friction: FieldState.friction,
        noise: FieldState.noise,
        survivalStress: FieldState.survivalStress,
        advantagePressure: FieldState.advantagePressure,
        bluetoothProximity: FieldState.bluetoothProximityPressure,
        bluetoothLinkQuality: FieldState.bluetoothLinkQualityPressure,
        meshPulseBand: FieldState.meshPulseBandPressure,
        pulseBandLoad: FieldState.pulseBandLoad
      };
    },

    getMeta() { return FieldState.meta; }
  };

  // ========================================================================
  // INTERNAL: DIAGNOSTIC DERIVATION — v30 IMMORTAL++++
  // ========================================================================
  function applyHaloToField(state, halo) {
    const impulses = halo.impulses_total || 0;
    const throttles = halo.flow_throttles || halo.flow.throttles || 0;

    state.flowPressure = clamp01(halo.flow.throttle_rate ?? state.flowPressure);
    state.throttleRate = clamp01(halo.flow.throttle_rate ?? state.throttleRate);

    state.meshStormPressure = clamp01(
      impulses > 0 ? throttles / impulses : state.meshStormPressure
    );

    state.reflexDropRate = clamp01(
      impulses > 0
        ? (halo.safety.reflex_drops || 0) / impulses
        : state.reflexDropRate
    );

    state.stability = clamp01(halo.health.stability ?? state.stability);
    state.driftPressure = clamp01(halo.health.drift_risk ?? state.driftPressure);

    // v24++: bluetooth presence from Halo
    if (halo.bluetooth) {
      const bt = halo.bluetooth;
      if (bt.events > 0) {
        state.bluetoothEvents += bt.events;
        state.bluetoothProximityPressure = clamp01(
          Math.max(
            state.bluetoothProximityPressure,
            bt.near ? 0.6 : bt.mid ? 0.4 : bt.far ? 0.2 : 0
          )
        );
        state.bluetoothLinkQualityPressure = clamp01(
          Math.max(state.bluetoothLinkQualityPressure, bt.avgLinkQuality || 0)
        );
        // v30++: bluetooth mesh band pressure
        state.bluetoothMeshBandPressure = clamp01(
          Math.max(
            state.bluetoothMeshBandPressure,
            bt.meshBandPressure || bt.avgLinkQuality || 0
          )
        );
      }
    }

    state.advantagePressure = clamp01(
      halo.advantage.events
        ? Math.min(1, halo.advantage.events / (impulses || 1))
        : state.advantagePressure
    );
  }

  function applyEchoToField(state, echo) {
    if (!echo) return;

    // Flow / mesh
    if (echo.flow.throttled) {
      state.flowPressure = clamp01(Math.max(state.flowPressure, 0.4));
      state.throttleRate = clamp01(Math.max(state.throttleRate, 0.2));
    }

    if (typeof echo.mesh.hops === "number") {
      const hops = echo.mesh.hops;
      const storm = hops > 15 ? 1 : hops > 8 ? 0.6 : hops > 3 ? 0.3 : 0.1;
      state.meshStormPressure = clamp01(Math.max(state.meshStormPressure, storm));
      // v30++: route depth pressure from hops
      state.routeDepthPressure = clamp01(
        Math.max(
          state.routeDepthPressure,
          hops > 20 ? 1 : hops > 10 ? 0.7 : hops > 5 ? 0.4 : 0.2
        )
      );
    }

    // Aura
    if (echo.aura.systemUnderTension) {
      state.auraTension = clamp01(Math.max(state.auraTension, 0.6));
    }
    if (echo.aura.inLoop) {
      state.driftPressure = clamp01(Math.max(state.driftPressure, 0.4));
    }

    // Presence band
    const band = echo.presence.band || "symbolic";
    if (band === "binary") {
      state.presenceBinaryPressure = clamp01(Math.max(state.presenceBinaryPressure, 0.4));
    } else if (band === "dual") {
      state.presenceDualPressure = clamp01(Math.max(state.presenceDualPressure, 0.3));
    } else {
      state.presenceSymbolicPressure = clamp01(Math.max(state.presenceSymbolicPressure, 0.3));
    }

    // Mode pressure
    if (echo.mode.binary) {
      state.binaryModePressure = clamp01(Math.max(state.binaryModePressure, 0.4));
    }
    if (echo.mode.dual) {
      state.dualModeResonance = clamp01(Math.max(state.dualModeResonance, 0.3));
    }

    // v24++: bluetooth presence from Echo
    const bt = echo.bluetoothPresence || echo.presence.bluetooth;
    if (bt) {
      state.bluetoothEvents++;
      if (bt.proximityTier === "near") state.bluetoothProximityPressure = clamp01(0.6);
      else if (bt.proximityTier === "mid") state.bluetoothProximityPressure = clamp01(0.4);
      else if (bt.proximityTier === "far") state.bluetoothProximityPressure = clamp01(0.2);

      const q = clamp01(
        bt.linkQuality ??
        bt.quality ??
        bt.rssiRatio ??
        bt.signalRatio ??
        0
      );
      state.bluetoothLinkQualityPressure = clamp01(
        Math.max(state.bluetoothLinkQualityPressure, q)
      );
      // v30++: bluetooth mesh band pressure
      state.bluetoothMeshBandPressure = clamp01(
        Math.max(state.bluetoothMeshBandPressure, q)
      );
    }

    // v30++: mesh pulse band from echo advantage / mesh
    const meshBand =
      (echo.mesh.bandPressure ?? 0) +
      (echo.advantage.meshBandBias ?? 0);
    state.meshPulseBandPressure = clamp01(
      Math.max(state.meshPulseBandPressure, meshBand)
    );
  }

  function applyCognitionToField(state, cognition) {
    if (!cognition) return;

    const mesh = cognition.mesh || {};
    const advantage = cognition.advantage || {};
    const presence = cognition.presence || {};
    const mode = cognition.mode || {};
    const bands = cognition.bands || {};

    // Mesh pressure
    const meshPressure = clamp01(
      (mesh.hopsCount > 0 ? 0.1 : 0) +
      (mesh.stallsCount > 0 ? 0.2 : 0) +
      (mesh.dropsCount > 0 ? 0.2 : 0) +
      (mesh.factoringEvents > 0 ? 0.2 : 0)
    );

    state.meshStormPressure = clamp01(Math.max(state.meshStormPressure, meshPressure));
    state.factoringPressure = clamp01(
      Math.max(
        state.factoringPressure,
        mesh.factoringBiasSamples > 0 ? 0.4 : 0
      )
    );

    // Advantage
    const advPressure = clamp01(
      (advantage.binaryPreferenceSamples > 0 ? 0.3 : 0) +
      (advantage.factoredPaths > 0 ? 0.3 : 0) +
      (advantage.events > 0 ? 0.2 : 0)
    );

    state.advantagePressure = clamp01(Math.max(state.advantagePressure, advPressure));
    state.binaryPreference = clamp01(
      advantage.binaryPreferenceSamples > 0 ? 0.5 : state.binaryPreference
    );

    // Presence load
    const presenceTotal = presence.total || 0;
    state.presenceLoad = clamp01(
      presenceTotal > 0 ? Math.min(1, presenceTotal / 100) : state.presenceLoad
    );

    // Mode pressure from cognition
    const totalMode =
      (mode.binary || 0) +
      (mode.symbolic || 0) +
      (mode.dual || 0) || 1;

    state.binaryModePressure = clamp01(
      Math.max(
        state.binaryModePressure,
        (mode.binary || 0) / totalMode
      )
    );

    state.symbolicModePressure = clamp01(
      Math.max(
        state.symbolicModePressure,
        (mode.symbolic || 0) / totalMode
      )
    );

    state.dualModeResonance = clamp01(
      Math.max(
        state.dualModeResonance,
        (mode.dual || 0) / totalMode
      )
    );

    // v30++: mesh pulse band + pulse band load from cognition.bands
    const meshBand = bands.meshPulseBand ?? 0;
    const pulseLoad =
      (bands.symbolic ?? 0) +
      (bands.binary ?? 0) +
      (bands.dual ?? 0) +
      (bands.meshPulseBand ?? 0);

    state.meshPulseBandPressure = clamp01(
      Math.max(state.meshPulseBandPressure, meshBand)
    );
    state.pulseBandLoad = clamp01(
      Math.max(state.pulseBandLoad, pulseLoad)
    );
  }

  function applyRoute3DToField(state, route3D) {
    // route3D: { hops, avgRttMs, bandHint, meshBandHint }
    const hops = Number(route3D.hops ?? 0);
    const rtt = Number(route3D.avgRttMs ?? 0);

    if (Number.isFinite(hops)) {
      state.routeDepthPressure = clamp01(
        Math.max(
          state.routeDepthPressure,
          hops > 20 ? 1 : hops > 10 ? 0.7 : hops > 5 ? 0.4 : hops > 0 ? 0.2 : 0
        )
      );
    }

    if (Number.isFinite(rtt)) {
      const norm = rtt <= 30 ? 0.1 : rtt <= 80 ? 0.3 : rtt <= 150 ? 0.6 : 1;
      state.routeLatencyPressure = clamp01(
        Math.max(state.routeLatencyPressure, norm)
      );
    }

    if (route3D.meshBandHint) {
      state.meshPulseBandPressure = clamp01(
        Math.max(state.meshPulseBandPressure, route3D.meshBandHint)
      );
    }
  }

  function recomputeDerivedPressures(state) {
    // Survival stress: flow + mesh + factoring + aura
    const survival =
      state.flowPressure * 0.3 +
      state.meshStormPressure * 0.3 +
      state.factoringPressure * 0.2 +
      state.auraTension * 0.2;

    state.survivalStress = clamp01(survival);

    // Mesh storm risk: mesh storm + throttle
    const stormRisk =
      state.meshStormPressure * 0.6 +
      state.throttleRate * 0.4;

    state.meshStormRisk = clamp01(stormRisk);

    // Advantage pressure: advantage + binary preference + presence load + mesh band
    const adv =
      state.advantagePressure * 0.4 +
      state.binaryPreference * 0.2 +
      state.presenceLoad * 0.2 +
      state.meshPulseBandPressure * 0.2;

    state.advantagePressure = clamp01(adv);
  }

  // -----------------------------------------------------------
  // Helper
  // -----------------------------------------------------------
  function clamp01(v) {
    if (typeof v !== "number" || Number.isNaN(v)) return 0;
    return Math.max(0, Math.min(1, v));
  }

  // -----------------------------------------------------------
  // PUBLIC INTERFACE
  // -----------------------------------------------------------
  return {
    control: PulseFieldControl,
    read: PulseField,
    meta: FieldState.meta
  };
}

export default {
  createPulseField_v30
};

PulseRealm.PulseMeshEnvironmentalField = createPulseField_v30;