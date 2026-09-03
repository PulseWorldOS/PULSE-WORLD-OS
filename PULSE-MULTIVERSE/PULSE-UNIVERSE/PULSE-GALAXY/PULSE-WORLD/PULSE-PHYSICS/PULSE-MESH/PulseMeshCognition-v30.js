// ============================================================================
// FILE: PulseMeshCognition-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE MESH COGNITION — META MEMORY
//  • Dual-Mode • Band/Binary/Wave-Aware • Advantage-Aware • Burst/Cache-Aware
//  • Factoring-Aware • Presence/Bluetooth-Aware • Satellite-Fallback-Aware
//  • Deterministic • Zero Network • Zero Randomness • Zero External Mutation
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const CognitionStore = {
  routes: new Map(),   // key: "entry->delivered", value: { success, fail, lastScore }
  earners: new Map(),  // key: earnerId, value: { success, fail, avgScore }
  organs: new Map(),   // key: organId, value: { count, anomalyCount }
  reflexes: new Map(), // key: reflex_flag, value: { triggered, drops },

  // dual-band + presence cognition (mode vs band)
  mode: {
    symbolic: 0,
    binary: 0,
    dual: 0
  },

  band: {
    symbolic: 0,
    binary: 0,
    dual: 0,
    mesh: 0
  },

  presence: {
    tags: new Map(), // counts only, no identity registry
    total: 0
  },

  // band/binary/wave + factoring + pressure + advantage
  mesh: {
    hops: [],
    stalls: [],
    drops: [],
    missingNodes: [],
    factoringEvents: [],
    factoringBias: [],
    auraTension: [],
    flowPressure: [],
    driftPressure: [],
    throttlePressure: [],
    bandBinaryWave: {
      samples: 0,
      density: [],
      amplitude: [],
      parityEven: 0,
      parityOdd: 0
    }
  },

  advantage: {
    binaryPreference: [],
    factoredPaths: 0,
    events: 0,
    advantageScore: [],
    burstTier: {
      burst_none: 0,
      burst_low: 0,
      burst_medium: 0,
      burst_high: 0,
      burst_elite: 0
    },
    cacheTier: {
      cold: 0,
      cool: 0,
      warm: 0,
      hot: 0
    }
  },

  // bluetooth presence cognition (metadata-only)
  bluetooth: {
    events: 0,
    near: 0,
    mid: 0,
    far: 0,
    unknown: 0,
    linkQualitySamples: 0,
    linkQualitySum: 0
  },

  // baseFormulaKey / ER / satellite fallback awareness
  formulas: {
    baseFormulaKeys: new Map(), // key: baseFormulaKey, value: count
    erSurfaces: 0,
    satelliteFallbackEvents: 0
  },

  meta: {
    layer: "PulseMeshCognition",
    role: "META_MEMORY",
    version: "30-IMMORTAL-ADVANTAGE+++",
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

      presenceAware: true,
      bandAware: true,

      // bluetooth / proximity awareness
      bluetoothPresenceAware: true,
      bluetoothMeshAware: true,

      // v30 IMMORTAL-ADVANTAGE+++ extras
      burstTierAware: true,
      cacheTierAware: true,
      baseFormulaKeyAware: true,
      erSurfaceAware: true,
      satelliteFallbackAware: true,

      zeroCompute: true,          // no heavy compute, only simple aggregation
      zeroMutationSurface: true   // never mutates external objects
    }
  }
};

// ---------------------------------------------------------------------------
// INTERNAL HELPERS
// ---------------------------------------------------------------------------
function getOrInit(map, key, init) {
  if (!map.has(key)) map.set(key, { ...init });
  return map.get(key);
}

function classifyMode(impulse) {
  const m = impulse.mode;
  if (!m) return;
  if (m === "binary") CognitionStore.mode.binary++;
  else if (m === "symbolic") CognitionStore.mode.symbolic++;
  else if (m === "dual") CognitionStore.mode.dual++;
}

function classifyBand(impulse) {
  const b = impulse.band;
  if (!b) return;
  if (b === "binary") CognitionStore.band.binary++;
  else if (b === "symbolic") CognitionStore.band.symbolic++;
  else if (b === "dual") CognitionStore.band.dual++;
  else if (b === "mesh") CognitionStore.band.mesh++;
}

function recordPresenceTag(impulse) {
  const tag = impulse.flags.aura_presence_tag;
  if (!tag) return;
  CognitionStore.presence.total++;
  const count = CognitionStore.presence.tags.get(tag) || 0;
  CognitionStore.presence.tags.set(tag, count + 1);
}

function clamp01(v) {
  if (!Number.isFinite(v)) return 0;
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

// bluetooth presence can come from impulse.bluetoothPresence or flags.bluetooth_presence
function getBluetoothPresenceMeta(impulse) {
  if (impulse && typeof impulse.bluetoothPresence === "object") {
    return impulse.bluetoothPresence;
  }
  if (impulse.flags && typeof impulse.flags.bluetooth_presence === "object") {
    return impulse.flags.bluetooth_presence;
  }
  return null;
}

function recordBluetoothPresence(impulse) {
  const bt = getBluetoothPresenceMeta(impulse);
  if (!bt) return;

  const store = CognitionStore.bluetooth;
  store.events++;

  const proximity = bt.proximityTier || bt.proximity || "unknown";
  if (proximity === "near") store.near++;
  else if (proximity === "mid" || proximity === "medium") store.mid++;
  else if (proximity === "far") store.far++;
  else store.unknown++;

  const qRaw = Number(bt.linkQuality ?? bt.quality ?? bt.rssiRatio);
  if (Number.isFinite(qRaw)) {
    const q = clamp01(qRaw);
    store.linkQualitySum += q;
    store.linkQualitySamples++;
  }
}

// v30: read v24/v30 signal factoring meta if present
function recordSignalFactoringSurfaces(impulse) {
  const sf = impulse.meta.signalFactoring;
  if (!sf) return;

  // band/binary/wave
  const bbw = sf.bandBinaryWave;
  if (bbw && bbw.binaryField && bbw.waveField) {
    const meshStore = CognitionStore.mesh.bandBinaryWave;
    meshStore.samples++;

    const density = Number(bbw.binaryField.density ?? 0);
    const amplitude = Number(bbw.waveField.amplitude ?? 0);
    if (Number.isFinite(density)) meshStore.density.push(density);
    if (Number.isFinite(amplitude)) meshStore.amplitude.push(amplitude);

    const parity = bbw.binaryField.parity ?? (bbw.binaryField.binarySurface.surface % 2);
    if (parity === 0) meshStore.parityEven++;
    else meshStore.parityOdd++;
  }

  // advantage field
  const adv = sf.advantageField;
  if (adv) {
    if (Number.isFinite(adv.advantageScore)) {
      CognitionStore.advantage.advantageScore.push(adv.advantageScore);
      CognitionStore.advantage.events++;
    }

    const bt = adv.burstTier || "burst_none";
    if (CognitionStore.advantage.burstTier[bt] != null) {
      CognitionStore.advantage.burstTier[bt]++;
    }

    const ct = adv.cacheTier || "cold";
    if (CognitionStore.advantage.cacheTier[ct] != null) {
      CognitionStore.advantage.cacheTier[ct]++;
    }
  }

  // baseFormulaKey + ER surface + satellite fallback
  const baseKey = sf.baseFormulaKey || sf.baseShapeSurface.baseFormulaKey;
  if (baseKey) {
    const current = CognitionStore.formulas.baseFormulaKeys.get(baseKey) || 0;
    CognitionStore.formulas.baseFormulaKeys.set(baseKey, current + 1);
  }

  if (sf.erSurface) {
    CognitionStore.formulas.erSurfaces++;
  }

  if (sf.bandSnapshot && sf.bandSnapshot.mode === "offline_biased") {
    CognitionStore.formulas.satelliteFallbackEvents++;
  }
}

// ---------------------------------------------------------------------------
// PUBLIC COGNITION API
// ---------------------------------------------------------------------------
export const PulseMeshCognition = {
  // Route-level patterns: entry → delivered.
  recordRoutePattern(impulse) {
    classifyMode(impulse);
    classifyBand(impulse);
    recordPresenceTag(impulse);
    recordBluetoothPresence(impulse);
    recordSignalFactoringSurfaces(impulse);

    const entry = impulse.entryNodeId ?? "unknown";
    const delivered = impulse.flags.delivered_to ?? "none";
    const key = `${entry}->${delivered}`;

    const mem = getOrInit(CognitionStore.routes, key, {
      success: 0,
      fail: 0,
      lastScore: 0
    });

    if (impulse.flags.delivered_to) mem.success++;
    else mem.fail++;

    mem.lastScore = impulse.score || 0;
  },

  // Earner-level patterns: success/fail + score smoothing.
  recordEarnerPattern(impulse) {
    const earnerId = impulse.flags.delivered_to;
    if (!earnerId) return;

    const mem = getOrInit(CognitionStore.earners, earnerId, {
      success: 0,
      fail: 0,
      avgScore: 0
    });

    mem.success++;
    mem.avgScore = (mem.avgScore + (impulse.score || 0)) / 2;
  },

  // Organ-level patterns: usage + anomaly counts.
  recordOrganPattern(impulse) {
    const organs = impulse.organs || [];
    for (const organId of organs) {
      const mem = getOrInit(CognitionStore.organs, organId, {
        count: 0,
        anomalyCount: 0
      });
      mem.count++;
      if (impulse.flags.cortex_anomaly) mem.anomalyCount++;
    }
  },

  // Reflex-level patterns: reflex_* flags + drops.
  recordReflexPattern(impulse) {
    const flags = impulse.flags || {};
    for (const key of Object.keys(flags)) {
      if (!key.startsWith("reflex_")) continue;

      const mem = getOrInit(CognitionStore.reflexes, key, {
        triggered: 0,
        drops: 0
      });

      mem.triggered++;
      if (key.endsWith("_drop")) mem.drops++;
    }
  },

  // Mesh Pressure + Factoring + Presence + Advantage + Bluetooth Cognition
  recordMeshPattern(impulse) {
    const flags = impulse.flags || {};

    // Hops (scalar)
    if (typeof impulse.hops === "number") {
      CognitionStore.mesh.hops.push({ hops: impulse.hops });
    }

    // Node-level events (stalls, drops, missing nodes)
    Object.keys(flags).forEach((k) => {
      if (k.startsWith("stalled_at_")) {
        CognitionStore.mesh.stalls.push({ node: k.replace("stalled_at_", "") });
      }
      if (k.startsWith("reflex_drop_at_")) {
        CognitionStore.mesh.drops.push({ node: k.replace("reflex_drop_at_", "") });
      }
      if (k.startsWith("missing_node_")) {
        CognitionStore.mesh.missingNodes.push({ node: k.replace("missing_node_", "") });
      }
    });

    // Factoring events
    if (flags.mesh_factored) {
      CognitionStore.mesh.factoringEvents.push({
        depth: flags.mesh_factor_depth ?? 0
      });
      CognitionStore.advantage.factoredPaths++;
      CognitionStore.advantage.events++;
    }

    // Factoring bias (from Aura)
    if (flags.aura_factoring_bias !== undefined) {
      CognitionStore.mesh.factoringBias.push(flags.aura_factoring_bias);
    }

    // Aura tension
    if (flags.aura_system_under_tension) {
      CognitionStore.mesh.auraTension.push(true);
    }

    // Mesh pressure fields
    if (flags.flow_pressure !== undefined) {
      CognitionStore.mesh.flowPressure.push(flags.flow_pressure);
    }

    if (flags.drift_pressure !== undefined) {
      CognitionStore.mesh.driftPressure.push(flags.drift_pressure);
    }

    if (flags.recent_throttle_rate !== undefined) {
      CognitionStore.mesh.throttlePressure.push(flags.recent_throttle_rate);
    }

    if (flags.aura_binary_mesh_bias !== undefined) {
      CognitionStore.advantage.binaryPreference.push(flags.aura_binary_mesh_bias);
      CognitionStore.advantage.events++;
    }
  }
};

// ---------------------------------------------------------------------------
// APPLY + SNAPSHOT
// ---------------------------------------------------------------------------
export function applyPulseMeshCognition(impulse) {
  impulse.flags = impulse.flags || {};
  impulse.flags.cognition_meta = CognitionStore.meta;

  PulseMeshCognition.recordRoutePattern(impulse);
  PulseMeshCognition.recordEarnerPattern(impulse);
  PulseMeshCognition.recordOrganPattern(impulse);
  PulseMeshCognition.recordReflexPattern(impulse);
  PulseMeshCognition.recordMeshPattern(impulse);

  impulse.flags.cognition_recorded = true;

  return impulse;
}

export function getCognitionSnapshot() {
  const bt = CognitionStore.bluetooth;
  const avgLinkQuality =
    bt.linkQualitySamples > 0 ? bt.linkQualitySum / bt.linkQualitySamples : 0;

  const meshBBW = CognitionStore.mesh.bandBinaryWave;

  return {
    meta: CognitionStore.meta,
    routes: CognitionStore.routes.size,
    earners: CognitionStore.earners.size,
    organs: CognitionStore.organs.size,
    reflexes: CognitionStore.reflexes.size,

    mode: { ...CognitionStore.mode },
    band: { ...CognitionStore.band },

    presence: {
      total: CognitionStore.presence.total,
      tags: CognitionStore.presence.tags.size
    },

    mesh: {
      hopsCount: CognitionStore.mesh.hops.length,
      stallsCount: CognitionStore.mesh.stalls.length,
      dropsCount: CognitionStore.mesh.drops.length,
      missingNodesCount: CognitionStore.mesh.missingNodes.length,
      factoringEvents: CognitionStore.mesh.factoringEvents.length,
      factoringBiasSamples: CognitionStore.mesh.factoringBias.length,
      auraTensionSamples: CognitionStore.mesh.auraTension.length,
      flowPressureSamples: CognitionStore.mesh.flowPressure.length,
      driftPressureSamples: CognitionStore.mesh.driftPressure.length,
      throttlePressureSamples: CognitionStore.mesh.throttlePressure.length,
      bandBinaryWave: {
        samples: meshBBW.samples,
        densitySamples: meshBBW.density.length,
        amplitudeSamples: meshBBW.amplitude.length,
        parityEven: meshBBW.parityEven,
        parityOdd: meshBBW.parityOdd
      }
    },

    advantage: {
      events: CognitionStore.advantage.events,
      binaryPreferenceSamples: CognitionStore.advantage.binaryPreference.length,
      factoredPaths: CognitionStore.advantage.factoredPaths,
      advantageScoreSamples: CognitionStore.advantage.advantageScore.length,
      burstTier: { ...CognitionStore.advantage.burstTier },
      cacheTier: { ...CognitionStore.advantage.cacheTier }
    },

    bluetooth: {
      events: bt.events,
      near: bt.near,
      mid: bt.mid,
      far: bt.far,
      unknown: bt.unknown,
      avgLinkQuality
    },

    formulas: {
      baseFormulaKeys: CognitionStore.formulas.baseFormulaKeys.size,
      erSurfaces: CognitionStore.formulas.erSurfaces,
      satelliteFallbackEvents: CognitionStore.formulas.satelliteFallbackEvents
    }
  };
}

PulseRealm.MeshCognition = {
  getCognitionSnapshot,
  PulseMeshCognition,
  CognitionStore
}
PulseRealm.PulseMeshCognition = PulseMeshCognition;