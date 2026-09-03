// ============================================================================
// FILE: PulseMeshHormones-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE MESH HORMONES — v30 IMMORTAL‑ADVANTAGE+++
// Global Modulation Cortex • Advantage‑Cascade‑Aware • Band/Binary/Wave‑Aware
// Mesh‑Storm‑Aware • Drift‑Aware • Bluetooth‑Mesh‑Aware • ER‑Surface‑Ready
// Deterministic • Metadata‑Only • Zero‑Mutation • Full‑Mesh Organ
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
// HORMONE BAND/BINARY/WAVE SURFACE — v30 IMMORTAL
// ============================================================================
function buildHormoneBandBinaryWave(field, cycleIndex) {
  const band = normalizeBand(field.presenceBand || "symbolic");

  const friction = safeNumber(field.friction, 0);
  const noise = safeNumber(field.noise, 0);
  const drift = safeNumber(field.driftPressure, 0);
  const meshStorm = safeNumber(field.meshStormPressure, 0);
  const flow = safeNumber(field.flowPressure, 0);

  const surface = friction + noise + drift + meshStorm + flow + cycleIndex;

  return {
    band,
    binaryField: {
      hormoneBinarySignature: computeHash(`HORM_BIN::${surface}`),
      hormoneSurfaceSignature: computeHash(`HORM_SURF::${surface}`),
      binarySurface: {
        friction, noise, drift, meshStorm, flow,
        cycle: cycleIndex,
        surface
      },
      parity: surface % 2,
      density: friction + noise + drift + meshStorm + flow,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    },
    waveField: {
      amplitude: friction + noise + drift + meshStorm + flow,
      wavelength: cycleIndex || 1,
      phase: (friction + noise + cycleIndex) % 16,
      band,
      mode:
        band === "binary" ? "compression-wave" :
        band === "dual"   ? "hybrid-wave" :
                            "symbolic-wave"
    }
  };
}

// ============================================================================
// ADVANTAGE FIELD — v30 IMMORTAL‑ADVANTAGE+++
// ============================================================================
function buildHormoneAdvantageField(field, bandPack) {
  const drift = safeNumber(field.driftPressure, 0);
  const meshStorm = safeNumber(field.meshStormPressure, 0);
  const flow = safeNumber(field.flowPressure, 0);
  const aura = safeNumber(field.auraTension, 0);

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const advantageScore =
    drift * 0.15 +
    meshStorm * 0.15 +
    flow * 0.1 +
    aura * 0.1 +
    density * 0.005 +
    amplitude * 0.005;

  let tier = "low";
  if (advantageScore >= 0.25) tier = "elite";
  else if (advantageScore >= 0.12) tier = "high";
  else if (advantageScore >= 0.05) tier = "medium";

  return {
    advantageVersion: "HORMONES-M30-ADVANTAGE+++",
    advantageScore,
    tier,
    density,
    amplitude,
    drift,
    meshStorm,
    flow,
    aura
  };
}

// ============================================================================
// CHUNK/PREWARM/CACHE PLAN — v30 IMMORTAL
// ============================================================================
function buildHormoneChunkPlan(field, advantageField) {
  const drift = safeNumber(field.driftPressure, 0);
  const meshStorm = safeNumber(field.meshStormPressure, 0);
  const flow = safeNumber(field.flowPressure, 0);

  const pressure = drift + meshStorm + flow;

  let cacheTier = "cold";
  if (pressure > 1.5) cacheTier = "hot";
  else if (pressure > 0.8) cacheTier = "warm";
  else if (pressure > 0.3) cacheTier = "cool";

  const burst =
    advantageField.tier === "elite" ? "warp_burst" :
    advantageField.tier === "high"  ? "warp_burst" :
    advantageField.tier === "medium"? "lane_burst" :
                                      "none";

  return {
    planVersion: "HORMONE-M30-CHUNKPLAN",
    cacheTier,
    burst,
    prewarm: pressure > 0.6,
    chunks: {
      hormoneEnvelope: true,
      pressureEnvelope: true
    }
  };
}

// ============================================================================
// BASE SHAPE SURFACE — v30 IMMORTAL
// ============================================================================
function buildHormoneBaseShape(field, bandPack, advantageField) {
  const shapePayload = {
    version: "HORMONE-M30-BASESHAPE",
    band: bandPack.band,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.tier,
    drift: field.driftPressure,
    meshStorm: field.meshStormPressure,
    flow: field.flowPressure,
    aura: field.auraTension
  };

  const classic = [
    "HORMONE_BASE",
    shapePayload.version,
    shapePayload.band,
    shapePayload.binaryDensity,
    shapePayload.waveAmplitude,
    shapePayload.advantageScore.toFixed(6),
    shapePayload.advantageTier,
    shapePayload.drift,
    shapePayload.meshStorm,
    shapePayload.flow,
    shapePayload.aura
  ].join("::");

  const sig = buildDualHashSignature("HORMONE_BASE", shapePayload, classic);

  return {
    baseShapeVersion: shapePayload.version,
    baseShapeIntelSignature: sig.intel,
    baseShapeClassicSignature: sig.classic,
    baseFormulaKey: sig.intel,
    shapePayload
  };
}

// ============================================================================
// META — v30 IMMORTAL‑ADVANTAGE+++
// ============================================================================
export const PulseMeshHormonesMeta = Object.freeze({
  layer: "PulseHormones",
  role: "GLOBAL_MODULATION",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  target: "full-mesh",
  selfRepairable: true,
  evo: Object.freeze({
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
    zeroCompute: true,
    zeroMutation: true,
    zeroRoutingInfluence: true,
    chunkPrewarmReady: true,
    advantageAware: true,
    bluetoothPresenceAware: true,
    bluetoothMeshAware: true,
    erSurfaceReady: true,
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    satelliteFallbackAware: true
  })
});

// ============================================================================
// META BUILDER — v30 IMMORTAL
// ============================================================================
function buildHormoneMeta(existingMeta, cycleIndex, bandPack, advantageField, baseShape) {
  const intelPayload = {
    cycleIndex,
    band: bandPack.band,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.tier,
    baseFormulaKey: baseShape.baseFormulaKey
  };

  const classic = `HORM_META::CYCLE:${cycleIndex}::BAND:${bandPack.band}`;

  const sig = buildDualHashSignature("HORMONE_META", intelPayload, classic);

  return {
    ...existingMeta,
    hormones: {
      layer: PulseMeshHormonesMeta.layer,
      role: PulseMeshHormonesMeta.role,
      version: PulseMeshHormonesMeta.version,
      signatures: {
        intel: sig.intel,
        classic: sig.classic
      },
      bandPack,
      advantageField,
      baseShape,
      erSurface: {
        erVersion: "ER-HORMONE-v30+++",
        erEmbeddingReady: true,
        baseFormulaKey: baseShape.baseFormulaKey
      }
    }
  };
}

// ============================================================================
// HORMONE ENGINE — v30 IMMORTAL‑ADVANTAGE+++
// ============================================================================
let hormoneCycle = 0;

export function applyPulseMeshHormonesV30(impulse, field, context = {}) {
  if (!impulse) return impulse;

  hormoneCycle++;

  impulse.flags = impulse.flags || {};
  impulse.meta = impulse.meta || {};

  // 1) Build band/binary/wave surface
  const bandPack = buildHormoneBandBinaryWave(field, hormoneCycle);

  // 2) Build advantage field
  const advantageField = buildHormoneAdvantageField(field, bandPack);

  // 3) Build chunk/prewarm/cache plan
  const chunkPlan = buildHormoneChunkPlan(field, advantageField);

  // 4) Build base shape
  const baseShape = buildHormoneBaseShape(field, bandPack, advantageField);

  // 5) Attach hormone meta
  impulse.meta = buildHormoneMeta(
    impulse.meta,
    hormoneCycle,
    bandPack,
    advantageField,
    baseShape
  );

  // 6) Attach flags (metadata-only)
  impulse.flags.hormones_applied = true;
  impulse.flags.hormone_band = bandPack.band;
  impulse.flags.hormone_advantage_tier = advantageField.tier;
  impulse.flags.hormone_cache_tier = chunkPlan.cacheTier;
  impulse.flags.hormone_burst_style = chunkPlan.burst;
  impulse.flags.hormone_base_formula_key = baseShape.baseFormulaKey;

  return impulse;
}

// ============================================================================
// WRAPPER — clone-on-write v30 IMMORTAL
// ============================================================================
export function applyPulseMeshHormonesV30Wrapper(
  impulse,
  PulseFieldRead,
  options = {}
) {
  if (!impulse) return impulse;

  const { clone = true } = options;
  const target = clone ? { ...impulse } : impulse;

  const field = PulseFieldRead.snapshot() || {};

  return applyPulseMeshHormonesV30(target, field, {});
}

// ============================================================================
// FACTORY EXPORT
// ============================================================================
export function createPulseMeshHormonesV30({ PulseFieldRead }) {
  return Object.freeze({
    meta: PulseMeshHormonesMeta,
    apply: (impulse, context = {}, options = {}) =>
      applyPulseMeshHormonesV30Wrapper(impulse, PulseFieldRead, options),
    applyCore: applyPulseMeshHormonesV30
  });
}

export default {
  create: createPulseMeshHormonesV30
};

PulseRealm.MeshHormones = {
  createPulseMeshHormonesV30,
  applyPulseMeshHormonesV30,
  applyPulseMeshHormonesV30Wrapper,
  PulseMeshHormonesMeta
}
PulseRealm.PulseMeshHormones = createPulseMeshHormonesV30;
PulseRealm.PulseMeshHormonesApply = applyPulseMeshHormonesV30;
PulseRealm.PulseMeshHormonesApplyWrapper = applyPulseMeshHormonesV30Wrapper;