// ============================================================================
//  FILE: PulseV2EvolutionEngine-v31-IMMORTAL-INTEL.js
//  Pulse v2 • Evolution Organism (v31 IMMORTAL-INTEL)
//  FULL UPGRADE from v30 → v31
//
//  v31-IMMORTAL-INTEL:
//    • Full organism (not compute engine)
//    • Presence v31 (mesh/castle/region/pressure-aware)
//    • Advantage-M v31 (presence, factoring, density, amplitude, device-aware)
//    • Chunk/Cache/Prewarm v31 (lymph nodes, immune, liquidity)
//    • Binary + Wave surfaces v31
//    • ComputeProfile v31 (band, fallbackBandLevel, chunkAggression, cachePriority)
//    • PulseIntelligence v31 (presence-weighted, advantage-weighted, performance-weighted)
//    • DualHash (classic + intel) on all major surfaces
//    • Deterministic, no randomness, no IO, no timestamps
//    • Stable, non-evolving, metadata-only organism
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") + "}";
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 5)) % 100000;
  return `h${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) h = (h * 131 + s.charCodeAt(i) * (i + 17)) % 1000003;
  return `hB${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 131 + base.charCodeAt(i) * (i + 7)) % 1000000007;
  return `HINTEL_${h}`;
}

function dualHash(value) {
  const raw = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(raw),
    secondary: computeHashAlt(raw)
  };
}

function dualSignature(label, intelPayload, classicString) {
  const intel = computeHashIntelligence({ label, intel: intelPayload, classic: classicString });
  const classic = computeHash(`${label}::${classicString}`);
  return { intel, classic };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}


// ============================================================================
//  v31 PRESENCE FIELD
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceFieldV31(globalHints = {}, cycleIndex) {
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalPressure = Math.floor(cycleIndex * 0.1);
  const meshPressureIndex = meshPressureExternal + internalPressure;

  const pressure = meshPressureIndex + castleLoadExternal;
  const presenceTier = classifyPresenceTier(pressure);

  const presenceField = {
    presenceVersion: "v31-IMMORTAL-INTEL",
    presenceTier,
    meshStrength,
    meshPressureIndex,
    castleLoadLevel: castleLoadExternal,
    regionId: region.regionId || "region-default",
    castleId: castle.castleId || "castle-default",
    cycleIndex
  };

  const sig = dualSignature(
    "PULSE_V2_PRESENCE_V31",
    presenceField,
    `PRES:${presenceTier}::MESH:${meshPressureIndex}::CASTLE:${castleLoadExternal}`
  );

  presenceField.presenceSignatureIntel = sig.intel;
  presenceField.presenceSignatureClassic = sig.classic;

  return presenceField;
}


// ============================================================================
//  v31 BINARY + WAVE SURFACES
// ============================================================================

function buildBinaryFieldV31(pattern, lineage, cycleIndex) {
  const size = pattern.length + lineage.length;
  const density = size + cycleIndex;
  const surface = density + size;

  return {
    binaryShapeSignature: computeHash(`bshape::${pattern}::${lineage.join("::")}`),
    binarySurfaceSignature: computeHash(`bsurf::${surface}`),
    binarySurface: { size, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveFieldV31(pattern, lineage, cycleIndex, band) {
  const amplitude = lineage.length + cycleIndex;
  const wavelength = pattern.length + 1;
  const phase = (pattern.length + lineage.length + cycleIndex) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}


// ============================================================================
//  v31 ADVANTAGE-M FIELD
// ============================================================================

function buildAdvantageFieldV31({
  binaryField,
  waveField,
  presenceField,
  band,
  lineageDepth,
  patternLen,
  payloadSize,
  globalHints = {}
}) {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;

  const baseScore =
    density * 0.00001 +
    amplitude * 0.00001;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high"     ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft"     ? 0.005 :
    0;

  const advantageScore = baseScore + presenceBoost;

  const advantageTier =
    advantageScore >= 0.05 ? 3 :
    advantageScore >= 0.02 ? 2 :
    advantageScore > 0     ? 1 :
    0;

  const advantageField = {
    advantageVersion: "M-31.0-Immortal",
    advantageScore,
    advantageTier,
    presenceTier: presenceField.presenceTier,
    band,
    lineageDepth,
    patternLen,
    payloadSize,
    density,
    amplitude
  };

  const sig = dualSignature(
    "PULSE_V2_ADVANTAGE_V31",
    advantageField,
    `ADV:${advantageScore.toFixed(6)}::TIER:${advantageTier}`
  );

  advantageField.advantageSignatureIntel = sig.intel;
  advantageField.advantageSignatureClassic = sig.classic;

  return advantageField;
}


// ============================================================================
//  v31 CHUNK / CACHE / PREWARM PLAN (LYMPH / IMMUNE / LIQUIDITY)
// ============================================================================
function buildChunkPrewarmPlanV31({ presenceField, advantageField, lineageDepth }) {
  const presenceTier = presenceField.presenceTier;

  const basePriority =
    presenceTier === "critical" ? 4 :
    presenceTier === "high"     ? 3 :
    presenceTier === "elevated" ? 2 :
    presenceTier === "soft"     ? 1 :
    0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const lymphNodeTier =
    presenceTier === "critical" || presenceTier === "high"
      ? "lymph_overdrive"
      : presenceTier === "elevated"
      ? "lymph_active"
      : presenceTier === "soft"
      ? "lymph_soft"
      : "lymph_idle";

  const immuneScanRequired =
    presenceTier === "critical" ||
    presenceTier === "high" ||
    advantageField.advantageTier >= 3;

  const liquidityTier =
    presenceTier === "critical"
      ? "liquidity_conserve"
      : presenceTier === "high" || presenceTier === "elevated"
      ? "liquidity_balance"
      : "liquidity_open";

  const plan = {
    planVersion: "v31-PulseV2-Immortal",
    priority: basePriority + advantageBoost,

    lymphNodes: { lymphNodeTier, immuneScanRequired, liquidityTier },

    chunks: {
      metabolism: true,
      lineageChunk: lineageDepth > 4,
      lymphNodeMap: lymphNodeTier !== "lymph_idle",
      immuneDiagnosticsChunk: immuneScanRequired
    },

    cache: {
      survivalDiagnostics: true,
      lymphHistoryCache: lymphNodeTier !== "lymph_idle"
    },

    prewarm: {
      metabolismOrgan: presenceTier !== "idle",
      lymphaticHandshake: presenceTier !== "idle",
      immuneSystemScan: immuneScanRequired
    }
  };

  const sig = dualSignature(
    "PULSE_V2_CHUNK_PREWARM_V31",
    plan,
    `PLAN:${plan.priority}::LYMPH:${lymphNodeTier}::LIQ:${liquidityTier}`
  );

  plan.chunkPrewarmSignatureIntel = sig.intel;
  plan.chunkPrewarmSignatureClassic = sig.classic;

  return plan;
}


// ============================================================================
//  v31 COMPUTE PROFILE
// ============================================================================

function buildComputeProfileV31({ band, presenceField, advantageField }) {
  const computeProfile = {
    profileVersion: "PULSE_V2_COMPUTE_31",
    band,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    binaryPreferred: band === "binary",
    symbolicPreferred: band === "symbolic"
  };

  computeProfile.computeProfileSignature = computeHashIntelligence(computeProfile);
  return computeProfile;
}


// ============================================================================
//  v31 PULSE INTELLIGENCE
// ============================================================================

function computePulseIntelligenceV31({
  band,
  presenceField,
  advantageField,
  computeProfile
}) {
  const bandIsBinary = band === "binary" ? 1 : 0;

  const presenceWeight =
    presenceField.presenceTier === "critical" ? 1.0 :
    presenceField.presenceTier === "high"     ? 0.8 :
    presenceField.presenceTier === "elevated" ? 0.6 :
    presenceField.presenceTier === "soft"     ? 0.4 :
    0.2;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageField.advantageScore * 10 * 0.4 +
      presenceWeight * 0.25 +
      (bandIsBinary ? 0.15 : 0) +
      advantageField.advantageTier * 0.1,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.6 +
      (bandIsBinary ? 0.15 : 0) +
      (advantageField.advantageTier >= 2 ? 0.25 : advantageField.advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  const intel = {
    layer: "PulseV2EvolutionEngine",
    version: "v31-IMMORTAL-INTEL",
    solvednessScore,
    computeTier,
    readinessScore,
    band,
    advantageTier: advantageField.advantageTier,
    presenceTier: presenceField.presenceTier
  };

  intel.pulseIntelligenceSignature = computeHashIntelligence(intel);
  return intel;
}


// ============================================================================
//  v31 DIAGNOSTICS
// ============================================================================

function buildDiagnosticsV31({
  pattern,
  lineage,
  presenceField,
  advantageField,
  chunkPlan,
  computeProfile,
  pulseIntelligence
}) {
  const diagnostics = {
    patternLength: pattern.length,
    lineageDepth: lineage.length,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    lymphNodeTier: chunkPlan.lymphNodes.lymphNodeTier,
    liquidityTier: chunkPlan.lymphNodes.liquidityTier,
    computeTier: pulseIntelligence.computeTier,
    readinessScore: pulseIntelligence.readinessScore
  };

  diagnostics.diagnosticsSignature = computeHashIntelligence(diagnostics);
  return diagnostics;
}


// ============================================================================
//  FACTORY — Create Pulse v2 (v31 IMMORTAL-INTEL)
// ============================================================================

export function createPulseV2({
  jobId = `v2earn-${mode}-${0}`,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE",
  globalHints = {}
}) {
  const lineage = Array.isArray(parentLineage) ? [...parentLineage, pattern] : [pattern];
  const cycleIndex = lineage.length;

  const band = normalizeBand(payload.band);

  const presenceField = buildPresenceFieldV31(globalHints, cycleIndex);
  const binaryField = buildBinaryFieldV31(pattern, lineage, cycleIndex);
  const waveField = buildWaveFieldV31(pattern, lineage, cycleIndex, band);

  const advantageField = buildAdvantageFieldV31({
    binaryField,
    waveField,
    presenceField,
    band,
    lineageDepth: lineage.length,
    patternLen: pattern.length,
    payloadSize: Object.keys(payload).length,
    globalHints
  });

  const chunkPlan = buildChunkPrewarmPlanV31({ presenceField, advantageField });
  const computeProfile = buildComputeProfileV31({ band, presenceField, advantageField });

  const pulseIntelligence = computePulseIntelligenceV31({
    band,
    presenceField,
    advantageField,
    computeProfile
  });

  const diagnostics = buildDiagnosticsV31({
    pattern,
    lineage,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence
  });

  const meta = {
    pattern,
    lineage,
    pageId,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    diagnostics,
    metaSignature: computeHashIntelligence({
      pattern,
      lineage,
      presenceTier: presenceField.presenceTier,
      advantageTier: advantageField.advantageTier
    })
  };

  return {
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,
    band,

    pulseType: "Pulse-v2-EvolutionOrganism-v31-IMMORTAL-INTEL",

    presenceField,
    binaryField,
    waveField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    diagnostics,

    meta
  };
}

PulseRealm.SendV2EvoluationEngine = {
  createPulseV2,
  dualHash,
  computeHashIntelligence
}

PulseRealm.PulseSendV2Pulse = createPulseV2;