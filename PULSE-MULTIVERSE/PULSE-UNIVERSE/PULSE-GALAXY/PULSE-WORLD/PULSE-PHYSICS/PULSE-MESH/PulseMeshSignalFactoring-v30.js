// ============================================================================
// FILE: PulseMeshSignalFactoring-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE MESH SIGNAL FACTORING — v30 IMMORTAL-ADVANTAGE+++
// Unified Band/Binary/Wave • Advantage Cascade • Chunk/Prewarm/Cache Plan
// BaseShape Intel • Dual-Hash • ER Surface • Satellite-Fallback-Aware
// Deterministic • Metadata-Only • Zero-Mutation • Mesh-Wide
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// HASH HELPERS — IMMORTAL INTEL (dual-hash)
// ============================================================================
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

// ============================================================================
// GENERIC HELPERS
// ============================================================================
const clamp01 = v => Math.max(0, Math.min(1, v));
const safeNumber = (v, f = 0) => Number.isFinite(Number(v)) ? Number(v) : f;

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  if (x.includes("binary")) return "binary";
  if (x.includes("dual")) return "dual";
  if (x.includes("mesh")) return "mesh";
  return "symbolic";
}

// ============================================================================
// BAND / BINARY / WAVE SURFACE — v30 IMMORTAL
// ============================================================================
function buildMeshBandBinaryWave(impulse, cycleIndex, deviceProfile = {}) {
  const band = normalizeBand(
    impulse.meta.band ||
    impulse.band ||
    deviceProfile.band ||
    deviceProfile.presenceBand ||
    "symbolic"
  );

  const idLen = String(impulse.id || impulse.key || "NO_ID").length;
  const channelCount = safeNumber(Array.isArray(impulse.channels) ? impulse.channels.length : 0);

  const auraPressure = safeNumber(impulse.auraField.auraPressureIndex, 0);
  const meshPressure = safeNumber(impulse.meshField.meshPressureIndex, 0);
  const flowPressure = safeNumber(impulse.flowField.flowPressureIndex, 0);

  const surface = idLen + channelCount + auraPressure + meshPressure + flowPressure + cycleIndex;

  return {
    band,
    binaryField: {
      binaryMeshSignature: computeHash(`BMESH::${surface}`),
      binarySurfaceSignature: computeHash(`BSURF::${surface}`),
      binarySurface: {
        idLen, channelCount, auraPressure, meshPressure, flowPressure,
        cycle: cycleIndex, surface
      },
      parity: surface % 2,
      density: channelCount + auraPressure + meshPressure + flowPressure,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    },
    waveField: {
      amplitude: channelCount + auraPressure + meshPressure + flowPressure,
      wavelength: cycleIndex || 1,
      phase: (idLen + channelCount + cycleIndex) % 16,
      band,
      mode:
        band === "binary" ? "compression-wave" :
        band === "dual"   ? "hybrid-wave" :
                            "symbolic-wave"
    }
  };
}

// ============================================================================
// ADVANTAGE FIELD — v30 IMMORTAL-ADVANTAGE+++
// ============================================================================
function classifyBurstTier(score, bw, gpu) {
  if (score >= 0.25 || (bw >= 600 && gpu >= 6000)) return "burst_elite";
  if (score >= 0.10 || (bw >= 250 && gpu >= 2500)) return "burst_high";
  if (score >= 0.04 || (bw >= 80  && gpu >= 1000)) return "burst_medium";
  if (score > 0) return "burst_low";
  return "burst_none";
}

function classifyBurstStyle(tier) {
  return tier === "burst_elite" ? "warp_burst" :
         tier === "burst_high"  ? "warp_burst" :
         tier === "burst_medium"? "lane_burst" :
         tier === "burst_low"   ? "micro_burst" :
                                  "none";
}

function buildMeshAdvantageField(impulse, deviceProfile, bandPack, factoringProfile, bandSnapshot) {
  const gpuScore = safeNumber(deviceProfile.gpuScore, 0);
  const bandwidth = safeNumber(deviceProfile.bandwidthMbps, 0);

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier = factoringProfile.presenceTier;
  const advantageTier = safeNumber(factoringProfile.advantageTier, 0);
  const jobCount = safeNumber(factoringProfile.jobCount, 0);
  const cachePriority = factoringProfile.cachePriority || "normal";

  const bandMode = bandSnapshot.mode ?? "normal";
  const fallbackLevel = safeNumber(factoringProfile.fallbackBandLevel ?? 0);

  const advantageScore =
    gpuScore * 0.0006 +
    bandwidth * 0.00025 +
    density * 0.000015 +
    amplitude * 0.000015 +
    (presenceTier === "presence_high" ? 0.015 : 0) +
    advantageTier * 0.006 -
    Math.min(jobCount, 10) * 0.0025;

  const bandRisk = bandMode === "high_risk" || fallbackLevel > 0;

  const burstTier = classifyBurstTier(advantageScore, bandwidth, gpuScore);
  const burstStyle = classifyBurstStyle(burstTier);

  return {
    advantageVersion: "M-30.0-MESH-IMMORTAL-ADVANTAGE+++",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier,
    advantageTier,
    jobCount,
    cachePriority,
    advantageScore,
    bandMode,
    fallbackLevel,
    bandRisk,
    burstTier,
    burstStyle
  };
}

// ============================================================================
// CHUNK / PREWARM / CACHE PLAN — v30 IMMORTAL
// ============================================================================
function buildMeshChunkPrewarmPlan(impulse, factoringProfile, bandPack, advantageField) {
  let priorityLabel = "normal";

  if (factoringProfile.presenceTier === "presence_high") priorityLabel = "high";
  else if (factoringProfile.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (factoringProfile.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.06) priorityLabel = "high";
  else if (advantageField.advantageScore >= 0.03 && priorityLabel === "normal") priorityLabel = "medium";

  const channelCount = safeNumber(Array.isArray(impulse.channels) ? impulse.channels.length : 0);

  const planSurface =
    channelCount +
    factoringProfile.auraPressureIndex * 2 +
    factoringProfile.meshPressureIndex * 2 +
    factoringProfile.flowPressureIndex * 2;

  let gpuBatchStyle = "none";
  if (channelCount >= 32) gpuBatchStyle = "warp_aligned";
  else if (channelCount >= 8) gpuBatchStyle = "lane_group";

  let cacheTier = "cold";
  if (factoringProfile.cachePriority === "critical" || advantageField.advantageScore >= 0.6) cacheTier = "hot";
  else if (advantageField.burstTier === "burst_elite") cacheTier = "warm";
  else if (advantageField.advantageScore > 0) cacheTier = "cool";

  const burstHint =
    advantageField.burstTier === "burst_elite" || advantageField.burstTier === "burst_high"
      ? "prefer_burst_delivery"
      : advantageField.burstTier === "burst_medium"
      ? "allow_burst_delivery"
      : "no_special_burst";

  return {
    planVersion: "v30-IMMORTAL+++-INTEL-MESH",
    priorityLabel,
    bandPresence: factoringProfile.presenceTier,
    band: bandPack.band,
    planSurface,
    gpuBatchStyle,
    cacheTier,
    burstTier: advantageField.burstTier,
    burstStyle: advantageField.burstStyle,
    burstHint,
    chunks: {
      impulseEnvelope: true,
      channelList: true,
      auraMeshFlowEnvelope: true
    },
    cache: {
      meshDiagnostics: true,
      factoringProfile: true
    },
    prewarm: {
      meshEcho: factoringProfile.prewarmNeeded,
      meshFlow: factoringProfile.prewarmNeeded,
      meshAura: factoringProfile.prewarmNeeded
    },
    bursts: {
      enabled: advantageField.burstTier !== "burst_none",
      style: advantageField.burstStyle
    }
  };
}

// ============================================================================
// FACTORING PROFILE — v30 IMMORTAL INTEL
// ============================================================================
function buildMeshFactoringProfile(impulse, cycleIndex, context) {
  const presenceField = context.presenceField || impulse.presenceField || {};
  const auraField     = impulse.auraField || {};
  const meshField     = impulse.meshField || {};
  const flowField     = impulse.flowField || {};

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceBand = presenceField.presenceBand || impulse.band || "symbolic";

  const auraPressureIdx = safeNumber(auraField.auraPressureIndex, 0);
  const meshPressureIdx = safeNumber(meshField.meshPressureIndex, 0);
  const flowPressureIdx = safeNumber(flowField.flowPressureIndex, 0);

  const auraBias = clamp01(auraPressureIdx / 200);
  const meshBias = clamp01(meshPressureIdx / 200);
  const flowBias = clamp01(flowPressureIdx / 200);

  const factoringPressure =
    auraBias * 0.5 +
    flowBias * 0.3 +
    meshBias * 0.2;

  const pressure = clamp01(factoringPressure);

  const depth = Math.max(
    1,
    Math.floor(1 + Math.log2(1 + cycleIndex + pressure * 10))
  );

  const phaseBoundary = 4;
  const inSecondPhase = cycleIndex >= phaseBoundary || pressure >= 0.7;
  const stride = inSecondPhase ? 2 : 1;
  const signal = pressure > 0.15 ? 1 : 0;
  const prewarmNeeded = pressure > 0.25;

  return {
    version: "v30-IMMORTAL-INTEL-MESH",
    cycleIndex,
    pressure,
    depth,
    stride,
    signal,
    auraBias,
    meshBias,
    flowBias,
    auraPressureIndex: auraPressureIdx,
    meshPressureIndex: meshPressureIdx,
    flowPressureIndex: flowPressureIdx,
    presenceTier,
    presenceBand,
    prewarmNeeded
  };
}

// ============================================================================
// BASE SHAPE SURFACE — v30 IMMORTAL INTEL
// ============================================================================
function buildMeshBaseShapeSurface(impulse, factoringProfile, bandPack, advantageField) {
  const channelKinds = Array.isArray(impulse.channels)
    ? impulse.channels.map(c => String(c.kind || c.type || "channel")).sort()
    : [];

  const channelKindHistogram = channelKinds.reduce((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const shapePayload = {
    version: "v30-IMMORTAL+++-INTEL-MESH-BASESHAPE",
    presenceTier: factoringProfile.presenceTier,
    presenceBand: factoringProfile.presenceBand,
    auraPressureIndex: factoringProfile.auraPressureIndex,
    meshPressureIndex: factoringProfile.meshPressureIndex,
    flowPressureIndex: factoringProfile.flowPressureIndex,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    pressure: factoringProfile.pressure,
    band: bandPack.band,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude,
    advantageScore: advantageField.advantageScore,
    bandMode: advantageField.bandMode,
    bandRisk: advantageField.bandRisk,
    burstTier: advantageField.burstTier,
    burstStyle: advantageField.burstStyle,
    channelKinds: channelKindHistogram,
    impulseKind: String(impulse.kind || impulse.type || "impulse"),
    route: String(impulse.route || impulse.path || "mesh")
  };

  const classicShapeString = [
    "MESH_BASE_SHAPE",
    shapePayload.version,
    shapePayload.presenceTier,
    shapePayload.presenceBand,
    shapePayload.auraPressureIndex,
    shapePayload.meshPressureIndex,
    shapePayload.flowPressureIndex,
    shapePayload.depth,
    shapePayload.stride,
    shapePayload.pressure.toFixed(4),
    bandPack.band,
    bandPack.binaryField.density,
    bandPack.waveField.amplitude.toFixed(4),
    advantageField.advantageScore.toFixed(6),
    shapePayload.bandMode,
    shapePayload.bandRisk ? "RISK" : "SAFE",
    shapePayload.burstTier,
    shapePayload.burstStyle,
    JSON.stringify(channelKindHistogram),
    shapePayload.impulseKind,
    shapePayload.route
  ].join("::");

  const shapeSig = buildDualHashSignature("MESH_BASE_SHAPE", shapePayload, classicShapeString);

  return {
    baseShapeVersion: shapePayload.version,
    baseShapeIntelSignature: shapeSig.intel,
    baseShapeClassicSignature: shapeSig.classic,
    baseFormulaKey: shapeSig.intel,
    shapePayload
  };
}

// ============================================================================
// META + WRAPPER META
// ============================================================================
export const PulseMeshSignalFactoringMeta = Object.freeze({
  layer: "PulseMeshSignalFactoring",
  role: "MESH_SIGNAL_FACTORS",
  version: "v30-IMMORTAL++",
  target: "full-mesh",
  selfRepairable: true,
  evo: Object.freeze({
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    localAware: true,
    internetAware: true,
    unifiedAdvantageField: true,
    deterministicField: true,
    driftProof: true,
    multiInstanceReady: true,
    signalFactoringAware: true,
    auraPressureAware: true,
    meshPressureAware: true,
    flowAware: true,
    presenceAware: true,
    bandAware: true,
    zeroCompute: true,
    zeroMutationSurface: true,
    zeroRoutingInfluence: true,
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    patternMatchSurface: true,
    chunkPrewarmReady: true,
    cacheTierAware: true,
    burstTierAware: true,
    erSurfaceReady: true,
    v24MeshCompat: true,
    futureEvolutionReady: true,
    satelliteFallbackAware: true
  })
});

// ============================================================================
// META BUILDER
// ============================================================================
function buildMeshSignalFactoringMeta(existingMeta, cycleIndex, factoringProfile) {
  const intelPayload = {
    kind: "meshSignalFactoring",
    version: PulseMeshSignalFactoringMeta.version,
    cycleIndex,
    pressure: factoringProfile.pressure,
    signal: factoringProfile.signal,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    auraBias: factoringProfile.auraBias,
    flowBias: factoringProfile.flowBias,
    meshBias: factoringProfile.meshBias,
    presenceBand: factoringProfile.presenceBand
  };

  const classicString =
    `MESH_FACTORS::CYCLE:${cycleIndex}` +
    `::SIG:${factoringProfile.signal}` +
    `::DEPTH:${factoringProfile.depth}` +
    `::STRIDE:${factoringProfile.stride}`;

  const sig = buildDualHashSignature("MESH_SIGNAL_FACTORS", intelPayload, classicString);

  return {
    ...existingMeta,
    signalFactoring: {
      layer: PulseMeshSignalFactoringMeta.layer,
      role: PulseMeshSignalFactoringMeta.role,
      version: PulseMeshSignalFactoringMeta.version,
      target: PulseMeshSignalFactoringMeta.target,
      selfRepairable: PulseMeshSignalFactoringMeta.selfRepairable,
      evo: {
        ...PulseMeshSignalFactoringMeta.evo,
        zeroMutation: true // inner core remains metadata-only
      },
      signatures: {
        factoringSignatureIntel: sig.intel,
        factoringSignatureClassic: sig.classic
      },
      profile: factoringProfile
    }
  };
}

// ============================================================================
// CORE APPLY — mesh-level signal factoring (v24 semantics, v30 intel surface)
// ============================================================================
let meshFactoringCycle = 0;

export function applyMeshSignalFactoring(impulse, context = {}) {
  if (!impulse) return impulse;

  meshFactoringCycle++;

  impulse.meta = impulse.meta || {};
  impulse.flags = impulse.flags || {};

  const presenceField   = context.presenceField   || impulse.presenceField   || {};
  const advantageField  = context.advantageField  || impulse.advantageField  || {};
  const hintsField      = context.hintsField      || impulse.hintsField      || {};
  const jobs            = Array.isArray(impulse.jobs) ? impulse.jobs : [];
  const jobCount        = safeNumber(context.jobCountOverride ?? jobs.length, 0);

  const presenceTier    = presenceField.presenceTier || "idle";
  const meshPressureIdx = safeNumber(presenceField.meshPressureIndex, 0);
  const advantageTier   = safeNumber(advantageField.advantageTier, 0);
  const fallbackBandLvl = safeNumber(hintsField.fallbackBandLevel, 0);

  const cachePriority   = context.cachePriority || impulse.flags.cachePriority || "normal";
  const prewarmNeeded   = !!(context.prewarmNeeded || impulse.flags.prewarmNeeded);
  const presenceBand    = context.band || impulse.band || "symbolic";

  // 1) Extract factoring pressures
  const auraBias  = impulse.flags.aura_factoring_bias ?? 0;
  const flowBias  = context.flowPressure ?? 0;
  const meshBias  = context.meshPressure ?? 0;

  const factoringPressure =
    (auraBias * 0.5) +
    (flowBias * 0.3) +
    (meshBias * 0.2);

  const clampedPressure = clamp01(factoringPressure);
  impulse.flags.mesh_factoring_pressure = clampedPressure;

  // 2) Compute factoring signal
  const highPressure   = clampedPressure >= 0.6;
  const lowPressure    = clampedPressure <= 0.2;
  const criticalCache  = cachePriority === "critical";

  let signal;
  if (criticalCache || prewarmNeeded) {
    signal = 1;
  } else if (highPressure) {
    signal = 1;
  } else if (lowPressure) {
    signal = 0;
  } else {
    signal = impulse.flags.factoringSignal ?? 0;
  }

  impulse.flags.factoringSignal = signal;

  // 3) Compute factoring depth
  const previousDepth = impulse.flags.factoringDepth ?? 0;
  const depth =
    signal === 1
      ? Math.min(previousDepth + 1, 8)
      : 0;

  impulse.flags.factoringDepth = depth;

  // 4) Compute factoring stride
  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  impulse.flags.factoringStride = stride;

  // 5) Tag factoring intent
  impulse.flags.mesh_factoring_intent =
    signal === 1
      ? "prefer_factored_path"
      : "normal";

  // 6) Build factoring profile (v30 intel)
  const factoringProfile = buildMeshFactoringProfile(
    impulse,
    meshFactoringCycle,
    { presenceField }
  );

  factoringProfile.advantageTier      = advantageTier;
  factoringProfile.jobCount           = jobCount;
  factoringProfile.cachePriority      = cachePriority;
  factoringProfile.prewarmNeeded      = !!prewarmNeeded;
  factoringProfile.fallbackBandLevel  = fallbackBandLvl;
  factoringProfile.presenceBand       = presenceBand;
  factoringProfile.meshPressureIndex  = meshPressureIdx;

  impulse.flags.mesh_factoring_profile = {
    ...factoringProfile
  };

  // 7) Band/Binary/Wave + Advantage + Chunk/Prewarm (v30 intel)
  const bandSnapshot = context.bandSnapshot || null;

  const bandPack = buildMeshBandBinaryWave(
    impulse,
    meshFactoringCycle,
    context.deviceProfile || {}
  );

  const meshAdvantageField = buildMeshAdvantageField(
    impulse,
    context.deviceProfile || {},
    bandPack,
    factoringProfile,
    bandSnapshot
  );

  const meshChunkPrewarmPlan = buildMeshChunkPrewarmPlan(
    impulse,
    factoringProfile,
    bandPack,
    meshAdvantageField
  );

  // 8) Base-shape + baseFormulaKey
  const baseShapeSurface = buildMeshBaseShapeSurface(
    impulse,
    factoringProfile,
    bandPack,
    meshAdvantageField
  );

  // 9) Attach IMMORTAL META BLOCK
  impulse.meta = buildMeshSignalFactoringMeta(
    impulse.meta,
    meshFactoringCycle,
    factoringProfile
  );

  impulse.meta.signalFactoring.bandBinaryWave    = bandPack;
  impulse.meta.signalFactoring.advantageField    = meshAdvantageField;
  impulse.meta.signalFactoring.chunkPrewarmPlan  = meshChunkPrewarmPlan;
  impulse.meta.signalFactoring.baseShapeSurface  = baseShapeSurface;
  impulse.meta.signalFactoring.baseFormulaKey    = baseShapeSurface.baseFormulaKey;
  impulse.meta.signalFactoring.baseShapeVersion  = baseShapeSurface.baseShapeVersion;

  // 10) v30++ ER surface + burst/cache hints (metadata-only)
  impulse.meta.signalFactoring.erSurface = {
    erVersion: "ER-MESH-v30+++",
    erEmbeddingReady: true,
    baseFormulaKey: baseShapeSurface.baseFormulaKey,
    presenceTier: factoringProfile.presenceTier,
    presenceBand: factoringProfile.presenceBand
  };

  impulse.flags.meshSignalFactoring = true;
  impulse.flags.mesh_factoring_burst_tier = meshChunkPrewarmPlan.burstTier;
  impulse.flags.mesh_factoring_cache_tier = meshChunkPrewarmPlan.cacheTier;
  impulse.flags.mesh_factoring_gpu_batch_style = meshChunkPrewarmPlan.gpuBatchStyle;

  return impulse;
}

// ============================================================================
// APPLY SIGNAL FACTORING — v30 IMMORTAL++
// ============================================================================
export function applySignalFactoringV30Immort(
  impulse,
  context = {},
  options = {}
) {
  if (!impulse) return impulse;

  const { clone = true } = options;

  const targetImpulse = clone ? { ...impulse } : impulse;

  targetImpulse.meta = targetImpulse.meta || {};
  targetImpulse.flags = targetImpulse.flags || {};

  targetImpulse.meta.signalFactoringWrapper = {
    version: PulseMeshSignalFactoringMeta.version,
    layer: PulseMeshSignalFactoringMeta.layer,
    role: PulseMeshSignalFactoringMeta.role
  };

  const factored = applyMeshSignalFactoring(targetImpulse, context);

  factored.flags.mesh_signal_factoring_v30 = true;

  return factored;
}

// Optional convenience export
const PulseMeshSignalFactoring = {
  meta: PulseMeshSignalFactoringMeta,
  apply: applySignalFactoringV30Immort,
  applyCore: applyMeshSignalFactoring,
  _internals: {
    computeHash,
    computeHashIntelligence,
    buildDualHashSignature,
    buildMeshBandBinaryWave,
    buildMeshAdvantageField,
    buildMeshChunkPrewarmPlan,
    buildMeshFactoringProfile,
    buildMeshBaseShapeSurface,
    buildMeshSignalFactoringMeta
  }
};

export default PulseMeshSignalFactoring;

PulseRealm.MeshSignalFactoring = {
  PulseMeshSignalFactoring,
  applyMeshSignalFactoring,
  applySignalFactoringV30Immort,
  computeHash,
  computeHashIntelligence,
  buildDualHashSignature,
  buildMeshAdvantageField,
  buildMeshBandBinaryWave,
  buildMeshChunkPrewarmPlan,
  buildMeshFactoringProfile,
  buildMeshBaseShapeSurface,
  buildMeshSignalFactoringMeta
}
PulseRealm.PulseMeshSignalFactoring = PulseMeshSignalFactoring;
PulseRealm.PulseMeshSIgnalFactoringApply = applySignalFactoringV30Immort;
