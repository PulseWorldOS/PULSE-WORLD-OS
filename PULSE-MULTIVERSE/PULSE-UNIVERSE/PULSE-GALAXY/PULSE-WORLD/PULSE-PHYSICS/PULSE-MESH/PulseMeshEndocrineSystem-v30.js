// ============================================================================
// [pulse:mesh] PULSE_MESH_ENDOCRINE_SYSTEM v30-IMMORTAL++++  // diamond
// Mesh Endocrine Interpreter • Metadata-Only • Deterministic
// Presence-Aware • Band-Aware (symbolic/binary/pulse/bluetooth_mesh)
// Bluetooth-Mesh-Aware • Advantage-Field-Aware • Mesh-Pressure-Aware
// Zero-Compute (heuristics only) • Zero-Mutation • Zero-Routing-Influence
// v30+: MeshBandProfile + PulseBandProfile + BluetoothMeshProfile surfaces
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export function createPulseMeshEndocrineSystem_v30({
  PulseHalo,
  PulseFieldRead,
  PulseEcho = PulseRealm.PulseMeshEcho,
  mesh = PulseRealm.PulseMesh,
  log    = console.log,
  warn   = console.warn,
  error = console.error
} = {}) {
  const meta = {
    layer: "PulseMeshEndocrineSystem",
    role: "MESH_ENDOCRINE_INTERPRETER",
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
      auraPressureAware: true,
      meshPressureAware: true,
      flowAware: true,
      driftAware: true,

      presenceAware: true,
      bandAware: true,

      bluetoothPresenceAware: true,
      bluetoothMeshAware: true,

      pulseBandProfileAware: true,
      bluetoothMeshBandProfileAware: true,
      meshBandProfileAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  };

  function safeSnapshotHalo() {
    try {
      if (PulseHalo.snapshot) return PulseHalo.snapshot();
      if (PulseHalo.status) return PulseHalo.status();
    } catch (e) {
      warn("[PulseMeshEndocrineSystem_v30] Halo snapshot failed:", e);
    }
    return {};
  }

  function safeSnapshotField() {
    try {
      if (PulseFieldRead.snapshot) return PulseFieldRead.snapshot();
    } catch (e) {
      warn("[PulseMeshEndocrineSystem_v30] Field snapshot failed:", e);
    }
    return {
      stability: 0,
      resonance: 0,
      friction: 0,
      noise: 0,
      driftPressure: 0,
      loadWave: 0,
      externalHeat: 0,
      externalStorm: 0,
      externalSignal: 0
    };
  }

  function safeEcho(entryNodeId, context) {
    try {
      return PulseEcho.sendEcho(entryNodeId, context) || {};
    } catch (e) {
      warn("[PulseMeshEndocrineSystem_v30] Echo send failed:", e);
      return {};
    }
  }

  function normalizeBand(band) {
    const b = String(band || "symbolic").toLowerCase();
    if (b === "binary") return "binary";
    if (b === "pulse" || b === "PulseBand") return "pulse";
    if (b === "bt" || b === "bluetooth" || b === "bluetoothmesh") return "bluetooth_mesh";
    return "symbolic";
  }

  function pct(x) {
    const v = typeof x === "number" ? x : 0;
    return `${(v * 100).toFixed(1)}%`;
  }

  function clamp01(x) {
    if (Number.isNaN(x)) return 0;
    if (x < 0) return 0;
    if (x > 1) return 1;
    return x;
  }

  // ---------------------------------------------------------------------------
  // v30: throughput from echo metrics / mesh
  // ---------------------------------------------------------------------------
  function describeMeshThroughput(echo) {
    const t = echo.metrics.throughput ?? echo.mesh.throughput ?? null;
    if (t == null) return "unknown";
    if (t >= 0.9) return "ultra";
    if (t >= 0.7) return "high";
    if (t >= 0.4) return "moderate";
    if (t > 0) return "low";
    return "stalled";
  }

  // ---------------------------------------------------------------------------
  // v30: bluetooth presence extraction (metadata-only, no device access)
  // ---------------------------------------------------------------------------
  function extractBluetoothPresenceSummary_v30(halo, field, echo) {
    const bt =
      echo.bluetoothPresence ||
      echo.presence.bluetooth ||
      echo.flags.bluetooth_presence ||
      field.bluetoothPresence ||
      halo.bluetoothPresence ||
      echo.bluetooth ||
      halo.bluetooth ||
      null;

    let proximityTier = "unknown";
    let linkQualityRatio = 0;
    let events = 0;
    let source = "none";

    if (bt && typeof bt === "object") {
      proximityTier =
        bt.proximityTier ||
        bt.proximity ||
        bt.rangeTier ||
        "unknown";

      const qRaw = Number(
        bt.linkQuality ??
        bt.quality ??
        bt.rssiRatio ??
        bt.signalRatio
      );
      if (Number.isFinite(qRaw)) {
        linkQualityRatio = clamp01(qRaw);
      }

      events = Number(bt.events || 0);
      source = bt.source || "echo/field/halo";
    }

    let stabilityHint = "neutral";
    if (linkQualityRatio >= 0.8 && (field.stability ?? 0.5) >= 0.7) {
      stabilityHint = "strong";
    } else if (linkQualityRatio <= 0.3 || (field.stability ?? 0.5) <= 0.3) {
      stabilityHint = "fragile";
    }

    return {
      proximityTier,
      linkQualityRatio,
      events,
      source,
      stabilityHint
    };
  }

  // ---------------------------------------------------------------------------
  // v30: performance estimator (normalized 0–100)
  // ---------------------------------------------------------------------------
  function estimateMeshPerformance_v30(field, echo, flowThrottleRate, throughput, bluetoothSummary) {
    const baseStability = clamp01(field.stability ?? 0.5);
    const resonance = clamp01(field.resonance ?? 0.5);
    const friction = clamp01(1 - (field.friction ?? 0));
    const noise = clamp01(1 - (field.noise ?? 0));
    const drift = clamp01(1 - (field.driftPressure ?? 0));
    const throttlePenalty = 1 - clamp01(flowThrottleRate ?? 0);
    const btQuality = clamp01(bluetoothSummary.linkQualityRatio ?? 0.5);

    let throughputFactor = 0.5;
    if (throughput === "ultra") throughputFactor = 1.0;
    else if (throughput === "high") throughputFactor = 0.8;
    else if (throughput === "moderate") throughputFactor = 0.6;
    else if (throughput === "low") throughputFactor = 0.4;
    else if (throughput === "stalled") throughputFactor = 0.1;

    const binaryBonus = echo.mode.binary ? 0.05 : 0;
    const dualBonus = echo.mode.dual ? 0.05 : 0;

    const raw =
      baseStability * 0.25 +
      resonance * 0.15 +
      friction * 0.15 +
      noise * 0.1 +
      drift * 0.1 +
      throttlePenalty * 0.1 +
      throughputFactor * 0.1 +
      btQuality * 0.05 +
      binaryBonus +
      dualBonus;

    return clamp01(raw) * 100;
  }

  function describeMeshStability_v30(field, echo, flowThrottleRate, throughput, bluetoothSummary) {
    const perf = estimateMeshPerformance_v30(field, echo, flowThrottleRate, throughput, bluetoothSummary);
    if (perf >= 85) {
      return "Mesh is highly stable, low drift, and well-synchronized with both pulseBand and bluetoothMeshBand.";
    }
    if (perf >= 60) {
      return "Mesh is generally stable with mild drift; binary/pulse bands are usable and bluetooth mesh is cooperative.";
    }
    if (perf >= 35) {
      return "Mesh stability is mixed; drift and friction are noticeable, and bluetooth proximity may be impacting reliability.";
    }
    return "Mesh is under stress; drift, friction, and low bluetooth link quality suggest a fragile environment.";
  }

  function describeMeshImmuneHormones_v30(echo, throughput, bluetoothSummary) {
    const quarantined = !!echo.immune.quarantined;
    const hormoneEvent = echo.hormones.event || "none";
    const reflexDrop = !!echo.reflex.dropped;
    const btEvents = bluetoothSummary.events ?? 0;

    if (quarantined) {
      return "Immune system has quarantined parts of the mesh; hormone signals indicate defensive posture.";
    }
    if (reflexDrop) {
      return "Reflex drops detected; mesh is protecting itself from overload or unstable routes.";
    }
    if (hormoneEvent !== "none") {
      return `Hormone event '${hormoneEvent}' suggests adaptive tuning of mesh flows and band usage.`;
    }
    if (btEvents > 0 && throughput === "low") {
      return "Bluetooth events and low throughput hint at local interference or proximity-driven mesh adjustments.";
    }
    return "Immune and hormone systems are quiet; mesh is operating in a normal adaptive range.";
  }

  function describeMeshField_v30(field, throughput) {
    const friction = clamp01(field.friction ?? 0);
    const noise = clamp01(field.noise ?? 0);
    const loadWave = clamp01(field.loadWave ?? 0);
    const externalHeat = clamp01(field.externalHeat ?? 0);
    const externalStorm = clamp01(field.externalStorm ?? 0);
    const externalSignal = clamp01(field.externalSignal ?? 0);

    if (throughput === "ultra" && friction < 0.2 && noise < 0.2) {
      return "Mesh internal environment is smooth and cool; signals flow with minimal resistance.";
    }
    if (externalStorm > 0.6 || noise > 0.6) {
      return "Mesh is in a noisy or stormy environment; external conditions may be degrading signal clarity.";
    }
    if (loadWave > 0.7 || externalHeat > 0.7) {
      return "Mesh is experiencing heavy load or heat; flows may be throttled to preserve survival.";
    }
    if (externalSignal > 0.6) {
      return "External signal pressure is high; mesh may be adapting routes to avoid interference.";
    }
    return "Mesh internal environment is mixed but manageable; flows can adapt to current conditions.";
  }

  function describeMeshFlowSurvival_v30(echo, flowThrottleRate, throughput, bluetoothSummary) {
    const throttled = !!echo.flow.throttled;
    const reason = echo.flow.reason || "none";
    const binaryBias = echo.aura.binaryMeshBias ?? 0;
    const btProximity = bluetoothSummary.proximityTier;

    if (throttled) {
      return `Flow is throttled (${reason}); organism is prioritizing survival over peak throughput.`;
    }
    if (binaryBias > 0.5 && throughput === "high") {
      return "Mesh favors binary routes for survival and efficiency; pulseBand remains available as a flexible layer.";
    }
    if (btProximity === "near" && throughput === "low") {
      return "Close bluetooth proximity with low throughput suggests local congestion; survival patterns may shift routes.";
    }
    if (flowThrottleRate > 0.2) {
      return "Flow Guard is actively braking; survival patterns are prioritizing safety under stress.";
    }
    return "Flow and survival patterns are balanced; mesh can trade between performance and safety as needed.";
  }

  function summarizeBluetoothPresence_v30(bluetoothSummary) {
    const { proximityTier, linkQualityRatio, stabilityHint } = bluetoothSummary;
    if (proximityTier === "near" && linkQualityRatio >= 0.8) {
      return "Bluetooth presence is strong and close; local mesh links are highly reliable.";
    }
    if (proximityTier === "far" || linkQualityRatio <= 0.3) {
      return "Bluetooth presence is weak or distant; local mesh links may be unreliable.";
    }
    if (stabilityHint === "fragile") {
      return "Bluetooth presence is active but fragile; mesh should avoid over-relying on local BT routes.";
    }
    return "Bluetooth presence is moderate; mesh can opportunistically use local BT links.";
  }

  function summarizeMeshTopology_v30(mesh, throughput) {
    const systemsCount = mesh.systems ? Object.keys(mesh.systems).length : 0;
    const symbolicLinks = mesh.symbolicMesh.links ? Object.keys(mesh.symbolicMesh.links).length : 0;
    const binaryReady = !!mesh.binaryMesh;

    if (!systemsCount && !symbolicLinks && !binaryReady) {
      return "Mesh topology is minimal; few systems or links are registered.";
    }
    if (binaryReady && throughput === "ultra") {
      return "Mesh topology is rich; binary and symbolic meshes are both ready for high-throughput routing.";
    }
    if (symbolicLinks > 0 && !binaryReady) {
      return "Symbolic mesh is active; binary mesh is not fully provisioned yet.";
    }
    return "Mesh topology is present but evolving; link density and binary readiness are still stabilizing.";
  }

  function summarizeMeshForYou_v30(
    performance,
    field,
    echo,
    flowThrottleRate,
    throughput,
    bluetoothSummary
  ) {
    if (performance >= 85) {
      return "Your mesh is in an excellent state: stable, efficient, and ready for both pulseBand and bluetoothMeshBand flows.";
    }
    if (performance >= 60) {
      return "Your mesh is generally healthy with some mild friction or drift; it can handle most workloads comfortably.";
    }
    if (performance >= 35) {
      return "Your mesh is under moderate stress; consider easing load or avoiding heavy binary/band operations.";
    }
    return "Your mesh is struggling; conditions are fragile and survival patterns may heavily throttle or reroute flows.";
  }

  function buildMeshBandProfile(echo, mesh) {
    const band = normalizeBand(echo.presence.band || mesh.defaultBand || "symbolic");
    const binaryReady = !!mesh.binaryMesh;
    const symbolicReady = !!mesh.symbolicMesh;
    const pulseReady = !!mesh.pulseMesh;
    const btReady = !!mesh.bluetoothMesh;

    return {
      band,
      binaryReady,
      symbolicReady,
      pulseReady,
      bluetoothMeshReady: btReady
    };
  }

  function buildPulseBandProfile(echo) {
    const band = normalizeBand(echo.presence.band || "symbolic");
    const advantage = echo.advantage || {};
    const binaryBias = advantage.binaryBias ?? 0;
    const factorDepth = advantage.factorDepth ?? 0;
    const factoredPath = !!advantage.factoredPath;

    return {
      band,
      binaryBias,
      factorDepth,
      factoredPath
    };
  }

  function buildBluetoothMeshProfile(bluetoothSummary) {
    return {
      proximityTier: bluetoothSummary.proximityTier,
      linkQualityRatio: bluetoothSummary.linkQualityRatio,
      stabilityHint: bluetoothSummary.stabilityHint,
      events: bluetoothSummary.events
    };
  }

  // ---------------------------------------------------------------------------
  // Report builder v30
  // ---------------------------------------------------------------------------
  function buildMeshEndocrineReport_v30({ halo, field, echo, mesh, meta, bluetoothSummary }) {
    const flowThrottles = halo.flow_throttles ?? 0;
    const flowThrottleRate = halo.flow.throttle_rate ?? 0;

    const throughput = describeMeshThroughput(echo);

    const sections = [];

    const performance = estimateMeshPerformance_v30(
      field,
      echo,
      flowThrottleRate,
      throughput,
      bluetoothSummary
    );

    const meshBandProfile = buildMeshBandProfile(echo, mesh);
    const pulseBandProfile = buildPulseBandProfile(echo);
    const bluetoothMeshProfile = buildBluetoothMeshProfile(bluetoothSummary);

    // PERFORMANCE
    sections.push({
      title: "Mesh Performance",
      summary: `Mesh performance estimated at ${performance.toFixed(1)}%.`,
      details: [
        `Stability: ${pct(field.stability)}`,
        `Resonance: ${pct(field.resonance)}`,
        `Friction: ${pct(field.friction)}`,
        `Noise: ${pct(field.noise)}`,
        `Drift Pressure: ${pct(field.driftPressure)}`,
        `Flow Throttles: ${flowThrottles}`,
        `Throttle Rate: ${pct(flowThrottleRate)}`,
        `Throughput: ${throughput}`,
        `Binary Mode: ${echo.mode.binary ? "ACTIVE" : "inactive"}`,
        `Dual Mode: ${echo.mode.dual ? "ACTIVE" : "inactive"}`,
        `Presence Band: ${echo.presence.band}`,
        `Mesh Factored Path: ${echo.advantage.factoredPath ? "YES" : "no"}`,
        `Binary Mesh Ready: ${mesh.binaryMesh ? "YES" : "no"}`,
        `Symbolic Mesh Ready: ${mesh.symbolicMesh ? "YES" : "no"}`,
        `Pulse Mesh Ready: ${mesh.pulseMesh ? "YES" : "no"}`,
        `Bluetooth Mesh Ready: ${mesh.bluetoothMesh ? "YES" : "no"}`,
        `Bluetooth Proximity: ${bluetoothSummary.proximityTier}`,
        `Bluetooth Link Quality: ${pct(bluetoothSummary.linkQualityRatio)}`
      ],
      meshBandProfile,
      pulseBandProfile,
      bluetoothMeshProfile
    });

    // STABILITY & DRIFT
    sections.push({
      title: "Stability & Drift",
      summary: describeMeshStability_v30(field, echo, flowThrottleRate, throughput, bluetoothSummary),
      details: [
        `Stability: ${pct(field.stability)}`,
        `Drift Pressure: ${pct(field.driftPressure)}`,
        `Aura Loop: ${echo.aura.inLoop ? "ACTIVE" : "inactive"}`,
        `Aura Tension: ${echo.aura.systemUnderTension ? "HIGH" : "normal"}`,
        `Factoring Bias: ${echo.aura.factoringBias ?? 0}`,
        `Flow Guard Activity: ${pct(flowThrottleRate)}`,
        `Throughput: ${throughput}`,
        `Bluetooth Proximity: ${bluetoothSummary.proximityTier}`,
        `Bluetooth Stability Hint: ${bluetoothSummary.stabilityHint}`
      ]
    });

    // IMMUNE & HORMONES
    sections.push({
      title: "Immune & Hormones",
      summary: describeMeshImmuneHormones_v30(echo, throughput, bluetoothSummary),
      details: [
        `Immune Quarantine: ${echo.immune.quarantined ? "YES" : "no"}`,
        `Hormone Event: ${echo.hormones.event || "none"}`,
        `Reflex Drop: ${echo.reflex.dropped ? "YES" : "no"}`,
        `Binary Advantage Bias: ${echo.advantage.binaryBias ?? 0}`,
        `Factored Path Depth: ${echo.advantage.factorDepth ?? 0}`,
        `Throughput: ${throughput}`,
        `Bluetooth Events: ${bluetoothSummary.events}`
      ]
    });

    // FIELD ENVIRONMENT
    sections.push({
      title: "Mesh Internal Environment",
      summary: describeMeshField_v30(field, throughput),
      details: [
        `Friction: ${pct(field.friction)}`,
        `Noise: ${pct(field.noise)}`,
        `Load Wave: ${pct(field.loadWave)}`,
        `External Heat: ${pct(field.externalHeat)}`,
        `External Storm: ${pct(field.externalStorm)}`,
        `External Signal: ${pct(field.externalSignal)}`,
        `Throughput: ${throughput}`
      ]
    });

    // FLOW & SURVIVAL
    sections.push({
      title: "Flow & Survival Patterns",
      summary: describeMeshFlowSurvival_v30(echo, flowThrottleRate, throughput, bluetoothSummary),
      details: [
        `Flow Throttled: ${echo.flow.throttled ? "YES" : "no"}`,
        `Throttle Reason: ${echo.flow.reason || "none"}`,
        `Binary Mesh Bias: ${echo.aura.binaryMeshBias ?? 0}`,
        `Organism Self‑Protection: ${flowThrottleRate > 0 ? "ACTIVE" : "quiet"}`,
        `Throughput: ${throughput}`,
        `Bluetooth Proximity: ${bluetoothSummary.proximityTier}`
      ]
    });

    // BLUETOOTH PRESENCE FIELD
    sections.push({
      title: "Bluetooth Presence Field",
      summary: summarizeBluetoothPresence_v30(bluetoothSummary),
      details: [
        `Proximity Tier: ${bluetoothSummary.proximityTier}`,
        `Link Quality: ${pct(bluetoothSummary.linkQualityRatio)}`,
        `Events Count: ${bluetoothSummary.events}`,
        `Raw Source: ${bluetoothSummary.source}`,
        `Stability Hint: ${bluetoothSummary.stabilityHint}`
      ]
    });

    // MESH TOPOLOGY
    sections.push({
      title: "Mesh Topology",
      summary: summarizeMeshTopology_v30(mesh, throughput),
      details: [
        `Mesh Systems Loaded: ${mesh.systems ? Object.keys(mesh.systems).length : 0}`,
        `Symbolic Links: ${mesh.symbolicMesh.links ? Object.keys(mesh.symbolicMesh.links).length : 0}`,
        `Binary Mesh Ready: ${mesh.binaryMesh ? "YES" : "no"}`,
        `Pulse Mesh Ready: ${mesh.pulseMesh ? "YES" : "no"}`,
        `Bluetooth Mesh Ready: ${mesh.bluetoothMesh ? "YES" : "no"}`,
        `Missing Nodes: ${echo.mesh.missingNodes.length || 0}`,
        `Stalled Nodes: ${echo.mesh.stalledAt.length || 0}`,
        `Reflex Drop Nodes: ${echo.mesh.reflexDropsAt.length || 0}`,
        `Throughput: ${throughput}`
      ]
    });

    return {
      performancePercent: performance,
      interpretation: summarizeMeshForYou_v30(
        performance,
        field,
        echo,
        flowThrottleRate,
        throughput,
        bluetoothSummary
      ),
      sections,
      meta,
      meshBandProfile,
      pulseBandProfile,
      bluetoothMeshProfile
    };
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  function examineMesh(entryNodeId, context = {}) {
    const haloSnapshot = safeSnapshotHalo();
    const fieldSnapshot = safeSnapshotField();

    const echoReflection = safeEcho(entryNodeId, {
      presenceBand: context.presenceBand || "symbolic",
      presenceTag: context.presenceTag || "PulseMeshEndocrine-v30",
      bluetoothPresence: context.bluetoothPresence || undefined
    });

    const bluetoothSummary = extractBluetoothPresenceSummary_v30(
      haloSnapshot,
      fieldSnapshot,
      echoReflection
    );

    return buildMeshEndocrineReport_v30({
      halo: haloSnapshot,
      field: fieldSnapshot,
      echo: echoReflection,
      mesh,
      meta,
      bluetoothSummary
    });
  }

  return {
    meta,
    examineMesh
  };
}

PulseRealm.MeshEndocrineSystem = {
  createPulseMeshEndocrineSystem_v30
}

PulseRealm.PulseMeshEndocrineSystem = createPulseMeshEndocrineSystem_v30;