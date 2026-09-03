// ============================================================================
//  FILE: PulseV3UnifiedOrganism-v31-IMMORTAL-INTEL++++.js
//  Pulse v3 • Unified Organism • Evolution-Aware • Deterministic Compute Loop
//  v31-IMMORTAL-INTEL++++:
//    • Unified Advantage Surface (INTEL, band-aware, v31 factoring-aware)
//    • Degradation Tier v31 (refined thresholds, lineage-aware)
//    • Rich Diagnostics + Signature Surface (dual-hash v31)
//    • Binary-Front-End Ready (full binary surface + hints)
//    • ImmortalMeta v31 Surface (dual-band, harmonic, coherence)
//    • PulseIntelligence v31 (solvedness + factoring + computeTier + band + evolutionDepth)
//    • v31: cacheChunk / prewarm / presence / degradation / immortal surfaces
//           exposed as first-class organism metadata
// ============================================================================
//
//  SAFETY CONTRACT (v31-IMMORTAL-INTEL++++):
//  ----------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external mutation.
//  • Deterministic compute loop only.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function computeHashLegacy(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 131072;
  }
  return `h16_${h}`;
}

function computeHashV31(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 11)) % 1048576; // 20‑bit v31
  }
  return `h31_${h}`;
}

function computeHash(str) {
  // Primary v31 hash
  return computeHashV31(str);
}

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") + "}";
}

function computeDualHashSignature(shape) {
  const raw = typeof shape === "string" ? shape : stableStringify(shape);
  return {
    primary: computeHashV31(raw),
    fallback: computeHashLegacy(raw)
  };
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const raw = `${pattern}::${lineage.join("::")}`;
  return `shape-${computeHash(raw)}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = Array.isArray(lineage) ? lineage.length : 0;

  if (depth === 0) return "void";
  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";
  if (depth === 4) return "canopy";
  if (depth === 5) return "grove";
  return "mature";
}

function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId }) {
  const shape = {
    pattern,
    patternAncestry: buildPatternAncestry(pattern),
    lineageSignature: buildLineageSignature(lineage),
    pageId: pageId || "NO_PAGE"
  };

  return computeHash(stableStringify(shape));
}

function computeDegradationTierV31(healthScore, lineageDepth) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  const depth = typeof lineageDepth === "number" ? lineageDepth : 0;

  const depthBoost =
    depth >= 8 ? -0.04 :
    depth >= 5 ? -0.02 :
    0;

  const adjusted = clamp01(h + depthBoost);

  return (
    adjusted >= 0.985 ? "microDegrade" :
    adjusted >= 0.92  ? "softDegrade"  :
    adjusted >= 0.60  ? "midDegrade"   :
    adjusted >= 0.25  ? "hardDegrade"  :
    "criticalDegrade"
  );
}


// ============================================================================
//  BINARY SURFACE (v31) — optional, non-breaking
// ============================================================================
function extractBinarySurfaceFromPayload(payload) {
  const p = payload || {};

  const binaryPattern  = p.binaryPattern || null;
  const binaryMode     = p.binaryMode || null;
  const binaryPayload  = p.binaryPayload || null;
  const binaryHints    = p.binaryHints || null;
  const binaryStrength = typeof p.binaryStrength === "number"
    ? p.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = p.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = p.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = p.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    routerHint,
    meshHint,
    organHint
  };
}


// ============================================================================
//  IMMORTAL META SURFACE (v31)
// ============================================================================
function extractImmortalMeta(payload) {
  const m = payload.immortalMeta || {};
  return {
    presenceBandState: m.presenceBandState ?? null,
    harmonicDrift: m.harmonicDrift ?? null,
    coherenceScore: m.coherenceScore ?? null,
    dualBandMode: m.dualBandMode ?? null,
    shifterBand: m.shifterBand ?? null
  };
}


// ============================================================================
//  PULSE INTELLIGENCE SURFACE (v31-INTEL, band + evolution-aware)
// ============================================================================
function computePulseIntelligenceV31({ pattern, lineage, payload, healthScore, binarySurface, band }) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = typeof pattern === "string" ? pattern.length : 0;

  const maxPattern = 128;
  const maxPayload = 64;
  const maxLineage = 24;

  const patternComplexity = clamp01(patternLen / maxPattern);
  const payloadComplexity = clamp01(payloadSize / maxPayload);
  const lineageComplexity = clamp01(lineageDepth / maxLineage);

  const binaryStrength = typeof binarySurface.binaryStrength === "number"
    ? clamp01(binarySurface.binaryStrength)
    : 0;

  const bandWeight =
    band === "binary" ? 1.0 :
    band === "dual"   ? 0.9  :
    0.7;

  const solvednessScore = clamp01(
    healthScore * 0.50 * bandWeight +
    (1 - patternComplexity) * 0.15 +
    (1 - payloadComplexity) * 0.15 +
    (1 - lineageComplexity) * 0.10 +
    binaryStrength * 0.10
  );

  const factoringSignal =
    lineageDepth >= 6 || payloadSize >= 24
      ? "critical"
      : lineageDepth >= 4 || payloadSize >= 12
        ? "high"
        : lineageDepth >= 2 || payloadSize >= 4
          ? "medium"
          : "low";

  const computeTier =
    solvednessScore >= 0.92 ? "nearSolution" :
    solvednessScore >= 0.75 ? "highValue"    :
    solvednessScore >= 0.45 ? "normal"       :
    solvednessScore >= 0.22 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.6 +
    healthScore * 0.25 +
    (factoringSignal === "critical"
      ? 0.15
      : factoringSignal === "high"
      ? 0.10
      : factoringSignal === "medium"
      ? 0.05
      : 0)
  );

  return {
    layer: "PulseV3UnifiedOrganism",
    version: "v31-IMMORTAL-INTEL++++",
    solvednessScore,
    factoringSignal,
    computeTier,
    payloadComplexity,
    evolutionDepth: lineageDepth,
    readinessScore,
    band
  };
}


// ============================================================================
//  v31 Surfaces — cacheChunk / prewarm / presence / degradation / immortal
// ============================================================================
function buildCacheChunkSurfaceV31({ pattern, lineage, pageId, mode, band }) {
  const shape = {
    pattern,
    lineageDepth: Array.isArray(lineage) ? lineage.length : 0,
    pageId,
    mode,
    band
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "pulse-v3-cache-v31::" + computeHash(raw);
  const dual = computeDualHashSignature(shape);

  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    cacheChunkSignatureDual: dual
  };
}

function buildPrewarmSurfaceV31({ priority, mode, band, factoringSignal }) {
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  if (factoringSignal === "critical" && level !== "none") {
    level = "overdrive";
  } else if (factoringSignal === "high" && level === "medium") {
    level = "aggressive";
  }

  const shape = { priority, mode, band, factoringSignal };
  const raw = stableStringify(shape);
  const prewarmKey = "pulse-v3-prewarm-v31::" + computeHash(raw);
  const dual = computeDualHashSignature(shape);

  return {
    level,
    prewarmKey,
    prewarmSignatureDual: dual
  };
}

function buildPresenceSurfaceV31({ pattern, pageId, band, lineage }) {
  let scope = "local";
  if (typeof pattern === "string") {
    if (pattern.includes("/global")) scope = "global";
    else if (pattern.includes("/page")) scope = "page";
  }

  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;

  const presenceTier =
    lineageDepth >= 8 ? "presence_critical" :
    lineageDepth >= 5 ? "presence_high"     :
    lineageDepth >= 3 ? "presence_mid"      :
    lineageDepth >= 1 ? "presence_low"      :
    "presence_idle";

  const shape = { pattern, pageId, scope, band, presenceTier, lineageDepth };
  const raw = stableStringify(shape);
  const presenceKey = "pulse-v3-presence-v31::" + computeHash(raw);
  const dual = computeDualHashSignature(shape);

  return {
    scope,
    presenceTier,
    lineageDepth,
    presenceKey,
    presenceSignatureDual: dual
  };
}

function buildDegradationSurfaceV31({ healthScore, lineageDepth }) {
  const tier = computeDegradationTierV31(healthScore, lineageDepth);
  return {
    healthScore,
    degradationTier: tier,
    degradationSignature: computeHash(`deg31::${tier}`)
  };
}

function buildImmortalSurfaceV31({ immortalMeta }) {
  const raw = stableStringify(immortalMeta);
  const dual = computeDualHashSignature(immortalMeta || {});
  return {
    immortalMeta,
    immortalSignature: computeHash("immortal-v3-v31::" + raw),
    immortalSignatureDual: dual
  };
}


// ============================================================================
//  DIAGNOSTICS (unified organism view + immortalMeta + intelligence + binary)
// ============================================================================
function buildDiagnosticsV31({
  pattern,
  lineage,
  healthScore,
  tier,
  immortalSurface,
  pulseIntelligence,
  binarySurface,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  degradationSurface,
  band
}) {
  const immortalMeta = immortalSurface.immortalMeta;
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;

  return {
    patternLength: pattern.length,
    lineageDepth,
    healthBucket:
      healthScore >= 0.9 ? "elite" :
      healthScore >= 0.75 ? "high" :
      healthScore >= 0.5 ? "medium" : "low",
    tier,
    lineageDensity: lineageDepth === 0 ? 0 : pattern.length / lineageDepth,

    band,

    // Immortal + intelligence
    immortal: immortalMeta,
    immortalSignature: immortalSurface.immortalSignature,
    immortalSignatureDual: immortalSurface.immortalSignatureDual,

    intelligence: pulseIntelligence,
    intelligenceSignature: computeHash(stableStringify(pulseIntelligence)),

    // Binary surface
    binary: binarySurface,
    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,
    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null,
    binaryRouterHintHash: binarySurface.routerHint
      ? computeHash(binarySurface.routerHint)
      : null,
    binaryMeshHintHash: binarySurface.meshHint
      ? computeHash(binarySurface.meshHint)
      : null,
    binaryOrganHintHash: binarySurface.organHint
      ? computeHash(binarySurface.organHint)
      : null,

    // v31 movement surfaces
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface
  };
}


// ============================================================================
//  INTERNAL: Deterministic evolution compute loop (v3, v31 surface)
// ============================================================================
function runEvolutionComputeLoopV31({ pattern, lineage, payload, mode, band }) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const maxPattern = 64;
  const maxLineage = 16;
  const maxPayload = 32;

  const patternScore = clamp01(pattern.length / maxPattern);
  const lineageScore = clamp01(lineageDepth / maxLineage);
  const payloadScore = clamp01(payloadSize / maxPayload);

  const binarySurface = extractBinarySurfaceFromPayload(payload);
  const immortalMeta  = extractImmortalMeta(payload);

  const healthScore = clamp01(
    patternScore * 0.38 +
    lineageScore * 0.32 +
    payloadScore * 0.30
  );

  const pulseIntelligence = computePulseIntelligenceV31({
    pattern,
    lineage,
    payload,
    healthScore,
    binarySurface,
    band
  });

  const advantageScore = pulseIntelligence.solvednessScore;
  const advantageTier =
    advantageScore >= 0.9 ? 3 :
    advantageScore >= 0.7 ? 2 :
    advantageScore >= 0.4 ? 1 :
    0;

  const advantageField = {
    patternStrength: pattern.length,
    lineageDepth,
    payloadSize,
    modeBias:
      mode === "stress"   ? 3 :
      mode === "drain"    ? 2 :
      mode === "recovery" ? 2 :
      1,

    unifiedTier: "v3-unified-v31-Immortal-INTEL++++",

    band,

    // Immortal meta surfaced for higher layers
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    dualBandMode: immortalMeta.dualBandMode,
    shifterBand: immortalMeta.shifterBand,

    // Intelligence surfaced for routing / Earn / GPU organs
    solvednessScore: pulseIntelligence.solvednessScore,
    factoringSignal: pulseIntelligence.factoringSignal,
    computeTier: pulseIntelligence.computeTier,
    payloadComplexity: pulseIntelligence.payloadComplexity,
    readinessScore: pulseIntelligence.readinessScore,

    // Binary-aware advantage surface
    binaryAware: binarySurface.hasBinary,
    binaryStrength: binarySurface.binaryStrength,
    binaryMode: binarySurface.binaryMode,
    binaryPattern: binarySurface.binaryPattern,
    routerHint: binarySurface.routerHint,
    meshHint: binarySurface.meshHint,
    organHint: binarySurface.organHint,

    // v31 advantage tier
    advantageScore,
    advantageTier
  };

  return {
    advantageField,
    healthScore,
    immortalMeta,
    pulseIntelligence,
    binarySurface
  };
}


// ============================================================================
//  FACTORY — Create a Pulse v3 Unified Organism (v31-Immortal-INTEL++++)
// ============================================================================
export function createPulseV3_v31({
  jobId = `v3unified-${mode}-${0}`,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE",
  band = "symbolic" // "symbolic" | "binary" | "dual"
}) {
  const lineage        = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);

  const patternAncestry       = buildPatternAncestry(pattern);
  const lineageSignature      = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId
  });

  const {
    advantageField,
    healthScore,
    immortalMeta,
    pulseIntelligence,
    binarySurface
  } = runEvolutionComputeLoopV31({
    pattern,
    lineage,
    payload,
    mode,
    band
  });

  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const tier = computeDegradationTierV31(healthScore, lineageDepth);

  const cacheChunkSurface = buildCacheChunkSurfaceV31({
    pattern,
    lineage,
    pageId,
    mode,
    band
  });

  const prewarmSurface = buildPrewarmSurfaceV31({
    priority,
    mode,
    band,
    factoringSignal: pulseIntelligence.factoringSignal
  });

  const presenceSurface = buildPresenceSurfaceV31({
    pattern,
    pageId,
    band,
    lineage
  });

  const degradationSurface = buildDegradationSurfaceV31({
    healthScore,
    lineageDepth
  });

  const immortalSurface = buildImmortalSurfaceV31({
    immortalMeta
  });

  const diagnostics = buildDiagnosticsV31({
    pattern,
    lineage,
    healthScore,
    tier,
    immortalSurface,
    pulseIntelligence,
    binarySurface,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    band
  });

  return {

    // Core organism identity
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,

    // Unified organism type
    pulseType: "Pulse-v3-Unified-v31-Immortal-INTEL++++",

    band,

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal meta surfaced at organism level
    immortalMeta,

    // Intelligence surfaced at organism level
    pulseIntelligence,

    // v31 movement / presence surfaces
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    immortalSurface,

    // Meta: signatures + diagnostics
    meta: {
      shapeSignature,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      diagnostics,

      evolutionSignature: computeHash(pattern + "::" + lineageSignature),
      patternSignature: computeHash(pattern),
      lineageSurface: computeHash(String(lineage.length)),
      advantageSignature: computeHash(stableStringify(advantageField)),
      healthSignature: computeHash(String(healthScore)),
      tierSignature: computeHash(tier),
      pulseIntelligenceSignature: computeHash(stableStringify(pulseIntelligence))
    }
  };
}

export default {
  createPulseV3_v31
};

PulseRealm.PulseSendV3Pulse = createPulseV3_v31;