// ============================================================================
//  FILE: PulseShifterEvolutionaryPulse-v31-IMMORTAL-ONEBAND-BINARY+++++.js
//  Pulse v3 Organism • Evolution Engine • Pattern + Lineage + Shape + Intelligence
//  v31-IMMORTAL-ONEBAND-BINARY+++++:
//    • ONE-BAND PulseBand: any-wave agnostic, binary-first carrier surface (bandMode always binary)
//    • Unified v31 hash surface (INTEL + classic dual-hash, stableStringify, structure-aware)
//    • Presence/Band Surface v31 (pulseBandSurface, bandStability, waveSignature, carrierSignature)
//    • ImmortalMeta v31 surfaced (presenceBandState, harmonicDrift, coherenceScore, bandPriorityTier)
//    • BinarySurface v31 (non-breaking, metadata-only, binary-first bias, wave-aware)
//    • PulseIntelligence v31 (solvedness, factoring, computeTier, readiness, depth, binaryAdvantageScore)
//    • AnyWaveSurface v31 (waveId, carrierType, frequencyHint, mediumHint) — anywave agnostic
//    • DualHash signatures across evolution + intelligence (INTEL + classic) v31
//    • INTERNAL SignalFactoringSurface v31 (pressure/signal/depth/stride) IMMORTAL-style
//    • INTERNAL BaseShapeSurface v31 + baseFormulaKey (INTEL hash) for mining/cheatsheets
//    • Mesh/Factoring-ready: compatible with v20++ MeshSignalFactoring + advantage fields
//    • v31 Movement Surfaces: cacheChunk / prewarm / presence / degradation / immortal surfaced
// ============================================================================
//
//  SAFETY CONTRACT (v31-IMMORTAL-ONEBAND-BINARY+++++):
//  ---------------------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external mutation.
//  • Deterministic compute loop only.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure (v31)
// ============================================================================

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return (
    "{" +
    keys
      .map(k => JSON.stringify(k) + ":" + stableStringify(v[k]))
      .join(",") +
    "}"
  );
}

function computeHashLegacy(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashV31(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h = (h + c * (i + 11)) % 1048576; // 20‑bit v31
  }
  return `h31_${h}`;
}

function computeHash(str) {
  // Primary v31 hash
  return computeHashV31(str);
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = stableStringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ONE-BAND: band is always effectively "pulseband-binary"
function normalizeBand(band) {
  // v31: still collapsed to single binary-first PulseBand
  return "binary";
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `${pattern}::${lineageKey}`;
  return `shape-${computeHash(raw)}`;
}

function computeShapeSignatureAlt(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `${pattern}::${lineageKey}`;
  return `shape2-${computeHashIntelligence(raw)}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";
  if (depth === 4) return "canopy";
  return "wild";
}

function evolvePattern(pattern, context = {}) {
  const { routerHint, meshHint, organHint, waveId, carrierType } = context;

  const parts = [pattern];

  if (routerHint) parts.push(`r:${routerHint}`);
  if (meshHint) parts.push(`m:${meshHint}`);
  if (organHint) parts.push(`o:${organHint}`);
  if (waveId) parts.push(`w:${waveId}`);
  if (carrierType) parts.push(`c:${carrierType}`);

  return parts.join("|");
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

// ============================================================================
//  ANYWAVE SURFACE v31 — any-wave agnostic carrier description
// ============================================================================
function extractAnyWaveSurface(payload) {
  const p = payload || {};
  const waveId = p.waveId || p.carrierId || null;
  const carrierType = p.carrierType || p.mediumType || null;
  const frequencyHint = p.frequencyHint || null;
  const mediumHint = p.mediumHint || null;

  const hasWave = !!waveId || !!carrierType || !!frequencyHint || !!mediumHint;

  const waveSignature = hasWave
    ? computeHash(
        stableStringify({ waveId, carrierType, frequencyHint, mediumHint })
      )
    : null;

  return {
    hasWave,
    waveId,
    carrierType,
    frequencyHint,
    mediumHint,
    waveSignature
  };
}

// ============================================================================
//  BINARY SURFACE + IMMORTAL META (metadata-only, v31 binary-first, wave-aware)
// ============================================================================
function extractBinarySurfaceFromPayload(payload) {
  const p = payload || {};

  const binaryPattern = p.binaryPattern || null;
  const binaryMode = p.binaryMode || null;
  const binaryPayload = p.binaryPayload || null;
  const binaryHints = p.binaryHints || null;
  const binaryStrength =
    typeof p.binaryStrength === "number" ? p.binaryStrength : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint =
    p.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint =
    p.meshHint ?? (binaryHints && binaryHints.meshHint) ?? null;
  const organHint =
    p.organHint ?? (binaryHints && binaryHints.organHint) ?? null;

  const binaryAdvantageScore =
    (typeof binaryStrength === "number" ? clamp01(binaryStrength) : 0) +
    (hasBinary ? 0.1 : 0);

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    routerHint,
    meshHint,
    organHint,
    binaryAdvantageScore
  };
}

function extractImmortalMeta(
  payload,
  { presenceBandState, harmonicDrift, coherenceScore } = {}
) {
  const m = payload.immortalMeta || {};
  const bandPriorityTier =
    m.bandPriorityTier ??
    (presenceBandState === "binary-dominant"
      ? "binary-first"
      : presenceBandState === "symbolic-only"
      ? "symbolic-only"
      : "balanced");

  return {
    presenceBandState: presenceBandState ?? m.presenceBandState ?? null,
    harmonicDrift: harmonicDrift ?? m.harmonicDrift ?? null,
    coherenceScore: coherenceScore ?? m.coherenceScore ?? null,
    dualBandMode: "one-band-pulseband", // v31: still collapsed
    shifterBand: "pulseband-binary",
    bandPriorityTier
  };
}

// ============================================================================
//  PULSEBAND SURFACE v31 — ONE-BAND PULSEBAND
// ============================================================================
function buildPulseBandSurface({ bandMode, immortalMeta, anyWaveSurface }) {
  const effectiveBandMode = normalizeBand(bandMode);
  const bandStability =
    typeof immortalMeta.harmonicDrift === "number"
      ? 1 - clamp01(Math.abs(immortalMeta.harmonicDrift))
      : 0.5;

  const coherence =
    typeof immortalMeta.coherenceScore === "number"
      ? clamp01(immortalMeta.coherenceScore)
      : 0.5;

  const bandPriorityTier = immortalMeta.bandPriorityTier || "balanced";

  const carrierSignature = anyWaveSurface.waveSignature;

  const surface = {
    version: "v31-IMMORTAL-ONEBAND-PULSEBAND",
    bandMode: effectiveBandMode, // always "binary"
    bandName: "PulseBand",
    bandPriorityTier,
    bandStability,
    coherenceScore: coherence,
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    hasWave: anyWaveSurface.hasWave,
    waveId: anyWaveSurface.waveId,
    carrierType: anyWaveSurface.carrierType,
    frequencyHint: anyWaveSurface.frequencyHint,
    mediumHint: anyWaveSurface.mediumHint,
    carrierSignature
  };

  const classicString =
    `PULSEBAND_V31::MODE:${surface.bandMode}` +
    `::TIER:${surface.bandPriorityTier}` +
    `::STAB:${surface.bandStability.toFixed(4)}` +
    `::COH:${surface.coherenceScore.toFixed(4)}` +
    `::WAVE:${surface.waveId || "NONE"}`;

  const sig = buildDualHashSignature(
    "PULSEBAND_SURFACE_V31",
    surface,
    classicString
  );

  return {
    pulseBandSurface: surface,
    pulseBandSignatures: sig
  };
}

// ============================================================================
//  v31 MOVEMENT SURFACES — cacheChunk / prewarm / presence / degradation / immortal
// ============================================================================

function computeDegradationTierV31(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  return h >= 0.985
    ? "microDegrade"
    : h >= 0.92
    ? "softDegrade"
    : h >= 0.6
    ? "midDegrade"
    : h >= 0.25
    ? "hardDegrade"
    : "criticalDegrade";
}

function buildCacheChunkSurface({ pattern, lineage, pageId, mode, bandMode }) {
  const shape = {
    pattern,
    lineageDepth: Array.isArray(lineage) ? lineage.length : 0,
    pageId,
    mode,
    bandMode
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "pulse-v3-cache::" + computeHash(raw);
  const dual = buildDualHashSignature("CACHE_CHUNK_V31", shape, cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    cacheChunkSignatureDual: dual
  };
}

function buildPrewarmSurface({ priority, mode, bandMode }) {
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const shape = { priority, mode, bandMode };
  const raw = stableStringify(shape);
  const prewarmKey = "pulse-v3-prewarm::" + computeHash(raw);
  const dual = buildDualHashSignature("PREWARM_V31", shape, prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignatureDual: dual
  };
}

function buildPresenceSurface({ pattern, pageId, bandMode }) {
  let scope = "local";
  if (typeof pattern === "string") {
    if (pattern.includes("/global")) scope = "global";
    else if (pattern.includes("/page")) scope = "page";
  }

  const shape = { pattern, pageId, scope, bandMode };
  const raw = stableStringify(shape);
  const presenceKey = "pulse-v3-presence::" + computeHash(raw);
  const dual = buildDualHashSignature("PRESENCE_V31", shape, presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignatureDual: dual
  };
}

function buildDegradationSurface({ healthScore }) {
  const tier = computeDegradationTierV31(healthScore);
  return {
    healthScore,
    degradationTier: tier,
    degradationSignature: computeHash(tier)
  };
}

function buildImmortalSurface({ immortalMeta }) {
  const raw = stableStringify(immortalMeta || {});
  const dual = buildDualHashSignature("IMMORTAL_V31", immortalMeta || {}, raw);
  return {
    immortalMeta,
    immortalSignature: computeHash("immortal-v3::" + raw),
    immortalSignatureDual: dual
  };
}

// ============================================================================
//  DIAGNOSTICS (v31)
// ============================================================================

function buildDiagnostics(
  pattern,
  lineage,
  healthScore,
  tier,
  binarySurface,
  immortalMeta,
  pulseIntelligence,
  pulseBandSurface,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  degradationSurface,
  immortalSurface
) {
  return {
    patternLength: pattern.length,
    lineageDepth: lineage.length,
    healthBucket:
      healthScore >= 0.9
        ? "elite"
        : healthScore >= 0.75
        ? "high"
        : healthScore >= 0.5
        ? "medium"
        : "low",
    tier,
    lineageDensity: lineage.length === 0 ? 0 : pattern.length / lineage.length,

    binary: binarySurface,
    immortal: immortalMeta,
    intelligence: pulseIntelligence,
    pulseBand: pulseBandSurface,

    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    immortalSurface,

    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,
    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null,
    immortalSignature: immortalSurface.immortalSignature,
    immortalSignatureDual: immortalSurface.immortalSignatureDual,
    intelligenceSignature: computeHash(
      stableStringify(pulseIntelligence || {})
    ),
    pulseBandSignature: computeHash(stableStringify(pulseBandSurface || {}))
  };
}

// ============================================================================
//  INTERNAL: PulseIntelligence (v31-INTEL++++)
// ============================================================================

function computePulseIntelligence({
  pattern,
  lineage,
  payload,
  healthScore,
  binarySurface,
  pulseBandSurface
}) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize =
    payload && typeof payload === "object" ? Object.keys(payload).length : 0;

  const patternLen = typeof pattern === "string" ? pattern.length : 0;

  const maxPattern = 128;
  const maxPayload = 64;

  const patternComplexity = Math.min(patternLen / maxPattern, 1);
  const payloadComplexity = Math.min(payloadSize / maxPayload, 1);

  const binaryStrength =
    typeof binarySurface.binaryStrength === "number"
      ? Math.min(Math.max(binarySurface.binaryStrength, 0), 1)
      : 0;

  const bandStability = pulseBandSurface.bandStability ?? 0.5;
  const coherence = pulseBandSurface.coherenceScore ?? 0.5;

  const binaryAdvantageScore = clamp01(
    (binarySurface.binaryAdvantageScore || 0) * 0.5 +
      binaryStrength * 0.25 +
      bandStability * 0.15 +
      coherence * 0.1
  );

  const solvednessScore = Math.max(
    0,
    Math.min(
      healthScore * 0.5 +
        (1 - patternComplexity) * 0.15 +
        (1 - payloadComplexity) * 0.1 +
        binaryStrength * 0.1 +
        binaryAdvantageScore * 0.15,
      1
    )
  );

  const factoringSignal =
    lineageDepth >= 4 || payloadSize >= 12
      ? "high"
      : lineageDepth >= 2 || payloadSize >= 4
      ? "medium"
      : "low";

  const computeTier =
    solvednessScore >= 0.9
      ? "nearSolution"
      : solvednessScore >= 0.7
      ? "highValue"
      : solvednessScore >= 0.4
      ? "normal"
      : solvednessScore >= 0.2
      ? "lowPriority"
      : "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.55 +
        healthScore * 0.25 +
        binaryAdvantageScore * 0.15 +
        (factoringSignal === "high"
          ? 0.05
          : factoringSignal === "medium"
          ? 0.025
          : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal,
    computeTier,
    payloadComplexity,
    evolutionDepth: lineageDepth,
    readinessScore,
    binaryAdvantageScore
  };
}

// ============================================================================
//  INTERNAL: Deterministic evolution compute loop (v3 — IMMORTAL v31)
// ============================================================================
function runEvolutionComputeLoopV3({
  pattern,
  lineage,
  payload,
  mode,
  bandMode = "binary",
  presenceBandState = null,
  harmonicDrift = null,
  coherenceScore = null
}) {
  const safePattern =
    Array.isArray(pattern) || typeof pattern === "string"
      ? pattern
      : [];

  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize =
    payload && typeof payload === "object" ? Object.keys(payload).length : 0;

  const patternLen = safePattern.length;

  const anyWaveSurface = extractAnyWaveSurface(payload);
  const binarySurface = extractBinarySurfaceFromPayload(payload);
  const immortalMeta = extractImmortalMeta(payload, {
    presenceBandState,
    harmonicDrift,
    coherenceScore
  });

  const { pulseBandSurface } = buildPulseBandSurface({
    bandMode,
    immortalMeta,
    anyWaveSurface
  });

  const maxPattern = 64;
  const maxLineage = 16;
  const maxPayload = 32;

  const patternScore = Math.min(patternLen / maxPattern, 1);
  const lineageScore = Math.min(lineageDepth / maxLineage, 1);
  const payloadScore = Math.min(payloadSize / maxPayload, 1);

  const healthScore =
    patternScore * 0.4 +
    lineageScore * 0.3 +
    payloadScore * 0.2 +
    (pulseBandSurface.bandStability ?? 0.5) * 0.1;

  const pulseIntelligence = computePulseIntelligence({
    pattern: safePattern,
    lineage,
    payload,
    healthScore,
    binarySurface,
    pulseBandSurface
  });

  const advantageField = {
    patternStrength: patternLen,
    lineageDepth,
    payloadSize,
    modeBias:
      mode === "stress" ? 4 : mode === "drain" ? 3 : mode === "recovery" ? 2 : 1,

    bandMode: "binary",
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    bandPriorityTier: immortalMeta.bandPriorityTier,

    experimentalTier: "v3-evolution-engine-v31-IMMORTAL-ONEBAND-BINARY+++++",

    binaryAware: binarySurface.hasBinary,
    binaryStrength: binarySurface.binaryStrength,
    binaryMode: binarySurface.binaryMode,
    binaryPattern: binarySurface.binaryPattern,
    routerHint: binarySurface.routerHint,
    meshHint: binarySurface.meshHint,
    organHint: binarySurface.organHint,

    hasWave: anyWaveSurface.hasWave,
    waveId: anyWaveSurface.waveId,
    carrierType: anyWaveSurface.carrierType,
    frequencyHint: anyWaveSurface.frequencyHint,
    mediumHint: anyWaveSurface.mediumHint,

    solvednessScore: pulseIntelligence.solvednessScore,
    factoringSignal: pulseIntelligence.factoringSignal,
    computeTier: pulseIntelligence.computeTier,
    payloadComplexity: pulseIntelligence.payloadComplexity,
    readinessScore: pulseIntelligence.readinessScore,
    binaryAdvantageScore: pulseIntelligence.binaryAdvantageScore
  };

  return {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface,
    anyWaveSurface
  };
}

// ============================================================================
//  INTERNAL: Pulse-level compute / factoring / evolution hints (legacy surface)
// ============================================================================

function runPulseComputeV3({
  pattern,
  lineage,
  payload,
  advantageField,
  healthScore
}) {
  const payloadKeys =
    payload && typeof payload === "object" ? Object.keys(payload) : [];

  const payloadSize = payloadKeys.length;
  const payloadComplexity = Math.min(payloadSize / 32, 1);

  const factoringSignal = computeHash(
    `${pattern}::${lineage.length}::${payloadKeys.join("|")}`
  );

  const solvednessScore = Math.min(
    healthScore * 0.6 + (1 - payloadComplexity) * 0.4,
    1
  );

  const computeTier =
    solvednessScore >= 0.9
      ? "nearSolution"
      : solvednessScore >= 0.7
      ? "refined"
      : solvednessScore >= 0.4
      ? "factored"
      : "raw";

  const computeHints = {
    payloadComplexity,
    payloadSize,
    solvednessScore,
    computeTier,
    patternStrength: advantageField.patternStrength,
    lineageDepth: advantageField.lineageDepth,
    modeBias: advantageField.modeBias
  };

  return {
    factoringSignal,
    solvednessScore,
    computeTier,
    computeHints
  };
}

// ============================================================================
//  INTERNAL: SHIFTER-LEVEL SIGNAL FACTORING + BASE SHAPE (symbolic/binary)
// ============================================================================

function buildShifterSignalFactoringSurface({
  pattern,
  lineage,
  binarySurface,
  immortalMeta,
  pulseIntelligence,
  pulseBandSurface
}) {
  const depth = lineage.length || 1;
  const binaryWeight = binarySurface.hasBinary ? 1 : 0;
  const coherence =
    typeof immortalMeta.coherenceScore === "number"
      ? immortalMeta.coherenceScore
      : 0.5;

  const solvedness = safeNumber(pulseIntelligence.solvednessScore, 0);
  const binaryAdv = safeNumber(pulseIntelligence.binaryAdvantageScore, 0);
  const bandStability = pulseBandSurface.bandStability ?? 0.5;

  const pressure =
    0.25 * (depth / (depth + 4)) +
    0.2 * coherence +
    0.2 * solvedness +
    0.15 * binaryWeight +
    0.1 * binaryAdv +
    0.1 * bandStability;

  const clampedPressure = clamp01(pressure);

  const signal = clampedPressure > 0.25 ? 1 : 0;
  const stride = depth > 0 ? 1 / (depth + 1) : 1;

  const factoringProfile = {
    layer: "shifter-symbolic-binary-pulseband",
    version: "v31-IMMORTAL-ONEBAND-BINARY+++++",
    pressure: clampedPressure,
    signal,
    depth,
    stride,
    hasBinary: binarySurface.hasBinary,
    coherenceScore: immortalMeta.coherenceScore,
    solvedness: pulseIntelligence.solvednessScore,
    computeTier: pulseIntelligence.computeTier,
    factoringSignal: pulseIntelligence.factoringSignal,
    binaryAdvantageScore: pulseIntelligence.binaryAdvantageScore,
    bandStability,
    bandPriorityTier: pulseBandSurface.bandPriorityTier
  };

  const classicString =
    `SYM_SHIFTER_FACTORS_V31::SIG:${signal}` +
    `::DEPTH:${depth}` +
    `::STRIDE:${stride.toFixed(4)}` +
    `::PRESS:${clampedPressure.toFixed(4)}` +
    `::BAND:${pulseBandSurface.bandMode}`;

  const sig = buildDualHashSignature(
    "SYM_SHIFTER_SIGNAL_FACTORS_V31",
    factoringProfile,
    classicString
  );

  return {
    factoringProfile,
    signatures: sig
  };
}

function buildShifterBaseShapeSurface({
  pattern,
  lineage,
  binarySurface,
  immortalMeta,
  pulseIntelligence,
  factoringSurface,
  pulseBandSurface
}) {
  const ancestry = buildPatternAncestry(pattern);

  const shapePayload = {
    version: "v31-IMMORTAL-INTEL-SYM-SHIFTER-BASESHAPE-PULSEBAND",
    pattern,
    ancestry,
    lineageDepth: lineage.length,
    evolutionStage: computeEvolutionStage(pattern, lineage),
    hasBinary: binarySurface.hasBinary,
    binaryMode: binarySurface.binaryMode || null,
    presenceBandState: immortalMeta.presenceBandState || null,
    coherenceScore: immortalMeta.coherenceScore ?? null,
    bandPriorityTier: immortalMeta.bandPriorityTier,
    bandMode: pulseBandSurface.bandMode,
    bandStability: pulseBandSurface.bandStability,
    waveId: pulseBandSurface.waveId,
    carrierType: pulseBandSurface.carrierType,
    solvednessScore: pulseIntelligence.solvednessScore,
    computeTier: pulseIntelligence.computeTier,
    factoringSignal: pulseIntelligence.factoringSignal,
    factoringPressure: factoringSurface.factoringProfile.pressure,
    factoringDepth: factoringSurface.factoringProfile.depth,
    factoringStride: factoringSurface.factoringProfile.stride,
    binaryAdvantageScore: pulseIntelligence.binaryAdvantageScore
  };

  const classicString =
    `SYM_SHIFTER_BASE_SHAPE_V31::${shapePayload.version}` +
    `::PAT:${pattern}` +
    `::DEPTH:${shapePayload.lineageDepth}` +
    `::STAGE:${shapePayload.evolutionStage}` +
    `::BIN:${shapePayload.hasBinary ? 1 : 0}` +
    `::TIER:${shapePayload.computeTier}` +
    `::BAND:${shapePayload.bandMode}`;

  const sig = buildDualHashSignature(
    "SYM_SHIFTER_BASE_SHAPE_V31",
    shapePayload,
    classicString
  );

  const baseFormulaKey = sig.intel;

  return {
    baseShapeVersion: shapePayload.version,
    baseShapeIntelSignature: sig.intel,
    baseShapeClassicSignature: sig.classic,
    baseFormulaKey,
    shapePayload
  };
}

// ============================================================================
//  PULSE ROLE META (optional, for identity)
// ============================================================================

export const PulseRole = Object.freeze({
  id: "Pulse-v3-EvolutionEngine-v31-IMMORTAL-ONEBAND-BINARY+++++",
  version: "31.0.0",
  band: "PulseBand",
  mode: "binary",
  tier: "IMMORTAL-ONEBAND-BINARY+++++"
});

// ============================================================================
//  FACTORY — Create a Pulse v3 Evolution Engine Organism (v31-IMMORTAL-ONEBAND-BINARY+++++)
// ============================================================================
export function createPulseV3({
  jobId = `v3shifter-normal-${0}`,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE",

  // ONE-BAND PulseBand surface
  bandMode = "binary",
  presenceBandState = null,
  harmonicDrift = null,
  coherenceScore = null
}) {
  // SAFETY: normalize pattern once
  const safePattern =
    Array.isArray(pattern) || typeof pattern === "string"
      ? pattern
      : "";

  const lineage = buildLineage(parentLineage, safePattern);
  const shapeSignature = computeShapeSignature(safePattern, lineage);
  const shapeSignature2 = computeShapeSignatureAlt(safePattern, lineage);
  const evolutionStage = computeEvolutionStage(safePattern, lineage);

  const patternAncestry = buildPatternAncestry(safePattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern: safePattern,
    lineage,
    pageId
  });

  const {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface,
    anyWaveSurface
  } = runEvolutionComputeLoopV3({
    pattern: safePattern,
    lineage,
    payload,
    mode,
    bandMode,
    presenceBandState,
    harmonicDrift,
    coherenceScore
  });

  const pulseCompute = runPulseComputeV3({
    pattern: safePattern,
    lineage,
    payload,
    advantageField,
    healthScore
  });

  const tier = computeDegradationTierV31(healthScore);

  const cacheChunkSurface = buildCacheChunkSurface({
    pattern: safePattern,
    lineage,
    pageId,
    mode,
    bandMode: normalizeBand(bandMode)
  });

  const prewarmSurface = buildPrewarmSurface({
    priority,
    mode,
    bandMode: normalizeBand(bandMode)
  });

  const presenceSurface = buildPresenceSurface({
    pattern: safePattern,
    pageId,
    bandMode: normalizeBand(bandMode)
  });

  const degradationSurface = buildDegradationSurface({
    healthScore
  });

  const immortalSurface = buildImmortalSurface({
    immortalMeta
  });

  const diagnostics = buildDiagnostics(
    safePattern,
    lineage,
    healthScore,
    tier,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    immortalSurface
  );

  const evolutionSignature = computeHash(
    safePattern + "::" + lineageSignature
  );
  const evolutionSignature2 = computeHashIntelligence(
    safePattern + "::" + lineageSignature
  );
  const dualHashSignature = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  const factoringSurface = buildShifterSignalFactoringSurface({
    pattern: safePattern,
    lineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface
  });

  const baseShapeSurface = buildShifterBaseShapeSurface({
    pattern: safePattern,
    lineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface,
    pulseBandSurface
  });

  const baseFormulaKey = baseShapeSurface.baseFormulaKey;

  return {
    // Identity + contracts
    PulseRole,

    // Core pulse identity
    jobId,
    pattern: safePattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,

    // ONE-BAND PulseBand surface (binary-first, anywave agnostic)
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    bandPriorityTier: immortalMeta.bandPriorityTier,
    pulseBandSurface,
    anyWaveSurface,

    // Evolution engine type
    pulseType: "Pulse-v3-EvolutionEngine-v31-IMMORTAL-ONEBAND-BINARY+++++",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // v31 movement / presence surfaces
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    immortalSurface,

    // Pulse-level compute / factoring / evolution hints
    pulseCompute,

    // INTERNAL factoring + base shape
    shifterFactoring: factoringSurface,
    shifterBaseShape: baseShapeSurface,
    baseFormulaKey,

    // Meta: signatures + diagnostics
    meta: {
      shapeSignature,
      shapeSignature2,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      diagnostics,

      evolutionSignature,
      evolutionSignature2,
      dualHashSignature,

      patternSignature: computeHash(safePattern),
      patternSignature2: computeHashIntelligence(safePattern),

      lineageSurface: computeHash(String(lineage.length)),
      lineageSurface2: computeHashIntelligence(String(lineage.length)),

      advantageSignature: computeHash(stableStringify(advantageField)),
      advantageSignature2: computeHashIntelligence(advantageField),

      healthSignature: computeHash(String(healthScore)),
      healthSignature2: computeHashIntelligence(healthScore),

      tierSignature: computeHash(tier),
      tierSignature2: computeHashIntelligence(tier),

      pulseComputeSignature: computeHash(stableStringify(pulseCompute)),
      pulseComputeSignature2: computeHashIntelligence(pulseCompute),

      pulseIntelligenceSignature: computeHash(
        stableStringify(pulseIntelligence)
      ),
      pulseIntelligenceSignature2: computeHashIntelligence(
        pulseIntelligence
      ),

      binarySurfaceSignature: computeHash(stableStringify(binarySurface)),
      binarySurfaceSignature2: computeHashIntelligence(binarySurface),

      immortalMetaSignature: computeHash(stableStringify(immortalMeta)),
      immortalMetaSignature2: computeHashIntelligence(immortalMeta),

      pulseBandSignature: computeHash(stableStringify(pulseBandSurface)),
      pulseBandSignature2: computeHashIntelligence(pulseBandSurface),

      cacheChunkSignature: cacheChunkSurface.cacheChunkSignature,
      prewarmSignatureDual: prewarmSurface.prewarmSignatureDual,
      presenceSignatureDual: presenceSurface.presenceSignatureDual,
      degradationSignature: degradationSurface.degradationSignature,
      immortalSignature: immortalSurface.immortalSignature,
      immortalSignatureDual: immortalSurface.immortalSignatureDual,

      shifterFactoringSignature: computeHash(
        stableStringify(factoringSurface)
      ),
      shifterFactoringSignature2: computeHashIntelligence(factoringSurface),

      baseShapeSignature: computeHash(stableStringify(baseShapeSurface)),
      baseShapeSignature2: computeHashIntelligence(baseShapeSurface),

      baseFormulaKeySignature: computeHash(baseFormulaKey),
      baseFormulaKeySignature2: computeHashIntelligence(baseFormulaKey)
    }
  };
}

// ============================================================================
//  EVOLUTION ENGINE — evolve an existing Pulse deterministically (v3 style, v31)
// ============================================================================

export function evolvePulseV3(pulse, context = {}) {
  const {
    routerHint,
    meshHint,
    organHint,
    waveId,
    carrierType,

    bandMode = pulse.bandMode || "binary",
    presenceBandState = pulse.presenceBandState ?? null,
    harmonicDrift = pulse.harmonicDrift ?? null,
    coherenceScore = pulse.coherenceScore ?? null
  } = context;

  const nextPattern = evolvePattern(pulse.pattern, {
    routerHint,
    meshHint,
    organHint,
    waveId,
    carrierType
  });

  const nextLineage = buildLineage(pulse.lineage, nextPattern);
  const shapeSignature = computeShapeSignature(nextPattern, nextLineage);
  const shapeSignature2 = computeShapeSignatureAlt(nextPattern, nextLineage);
  const evolutionStage = computeEvolutionStage(nextPattern, nextLineage);
  const patternAncestry = buildPatternAncestry(nextPattern);
  const lineageSignature = buildLineageSignature(nextLineage);
  const pageId = pulse.pageId || "NO_PAGE";
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId
  });

  const {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface,
    anyWaveSurface
  } = runEvolutionComputeLoopV3({
    pattern: nextPattern,
    lineage: nextLineage,
    payload: pulse.payload,
    mode: pulse.mode || "normal",
    bandMode,
    presenceBandState,
    harmonicDrift,
    coherenceScore
  });

  const pulseCompute = runPulseComputeV3({
    pattern: nextPattern,
    lineage: nextLineage,
    payload: pulse.payload,
    advantageField,
    healthScore
  });

  const tier = computeDegradationTierV31(healthScore);

  const cacheChunkSurface = buildCacheChunkSurface({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId,
    mode: pulse.mode || "normal",
    bandMode: normalizeBand(bandMode)
  });

  const prewarmSurface = buildPrewarmSurface({
    priority: pulse.priority || "normal",
    mode: pulse.mode || "normal",
    bandMode: normalizeBand(bandMode)
  });

  const presenceSurface = buildPresenceSurface({
    pattern: nextPattern,
    pageId,
    bandMode: normalizeBand(bandMode)
  });

  const degradationSurface = buildDegradationSurface({
    healthScore
  });

  const immortalSurface = buildImmortalSurface({
    immortalMeta
  });

  const diagnostics = buildDiagnostics(
    nextPattern,
    nextLineage,
    healthScore,
    tier,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    immortalSurface
  );

  const evolutionSignature = computeHash(
    nextPattern + "::" + lineageSignature
  );
  const evolutionSignature2 = computeHashIntelligence(
    nextPattern + "::" + lineageSignature
  );
  const dualHashSignature = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  const factoringSurface = buildShifterSignalFactoringSurface({
    pattern: nextPattern,
    lineage: nextLineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    pulseBandSurface
  });

  const baseShapeSurface = buildShifterBaseShapeSurface({
    pattern: nextPattern,
    lineage: nextLineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface,
    pulseBandSurface
  });

  const baseFormulaKey = baseShapeSurface.baseFormulaKey;

  return {
    // Identity + contracts
    PulseRole,

    // Core pulse identity (carried forward)
    jobId: pulse.jobId,
    pattern: nextPattern,
    payload: pulse.payload,
    priority: pulse.priority,
    returnTo: pulse.returnTo,
    lineage: nextLineage,
    mode: pulse.mode || "normal",
    pageId,

    // ONE-BAND PulseBand surface (binary-first)
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    bandPriorityTier: immortalMeta.bandPriorityTier,
    pulseBandSurface,
    anyWaveSurface,

    // Evolution engine type
    pulseType: "Pulse-v3-EvolutionEngine-v31-IMMORTAL-ONEBAND-BINARY+++++",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // v31 movement / presence surfaces
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    degradationSurface,
    immortalSurface,

    // Pulse-level compute / factoring / evolution hints
    pulseCompute,

    // INTERNAL factoring + base shape
    shifterFactoring: factoringSurface,
    shifterBaseShape: baseShapeSurface,
    baseFormulaKey,

    // Meta: signatures + diagnostics
    meta: {
      shapeSignature,
      shapeSignature2,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      diagnostics,

      evolutionSignature,
      evolutionSignature2,
      dualHashSignature,

      patternSignature: computeHash(nextPattern),
      patternSignature2: computeHashIntelligence(nextPattern),

      lineageSurface: computeHash(String(nextLineage.length)),
      lineageSurface2: computeHashIntelligence(String(nextLineage.length)),

      advantageSignature: computeHash(stableStringify(advantageField)),
      advantageSignature2: computeHashIntelligence(advantageField),

      healthSignature: computeHash(String(healthScore)),
      healthSignature2: computeHashIntelligence(String(healthScore)),

      tierSignature: computeHash(tier),
      tierSignature2: computeHashIntelligence(tier),

      pulseComputeSignature: computeHash(stableStringify(pulseCompute)),
      pulseComputeSignature2: computeHashIntelligence(pulseCompute),

      pulseIntelligenceSignature: computeHash(
        stableStringify(pulseIntelligence)
      ),
      pulseIntelligenceSignature2: computeHashIntelligence(
        pulseIntelligence
      ),

      binarySurfaceSignature: computeHash(stableStringify(binarySurface)),
      binarySurfaceSignature2: computeHashIntelligence(binarySurface),

      immortalMetaSignature: computeHash(stableStringify(immortalMeta)),
      immortalMetaSignature2: computeHashIntelligence(immortalMeta),

      pulseBandSignature: computeHash(stableStringify(pulseBandSurface)),
      pulseBandSignature2: computeHashIntelligence(pulseBandSurface),

      cacheChunkSignature: cacheChunkSurface.cacheChunkSignature,
      prewarmSignatureDual: prewarmSurface.prewarmSignatureDual,
      presenceSignatureDual: presenceSurface.presenceSignatureDual,
      degradationSignature: degradationSurface.degradationSignature,
      immortalSignature: immortalSurface.immortalSignature,
      immortalSignatureDual: immortalSurface.immortalSignatureDual,

      shifterFactoringSignature: computeHash(
        stableStringify(factoringSurface)
      ),
      shifterFactoringSignature2: computeHashIntelligence(factoringSurface),

      baseShapeSignature: computeHash(stableStringify(baseShapeSurface)),
      baseShapeSignature2: computeHashIntelligence(baseShapeSurface),

      baseFormulaKeySignature: computeHash(baseFormulaKey),
      baseFormulaKeySignature2: computeHashIntelligence(baseFormulaKey)
    }
  };
}

export default {
  PulseRole,
  createPulseV3,
  evolvePulseV3
};

PulseRealm.ShifterBinaryEvoluationaryPulse = {
  PulseRole,
  createPulseV3,
  evolvePulseV3
}

PulseRealm.ShifterPulseCreate = createPulseV3;
PulseRealm.ShifterPulseEvolve = evolvePulseV3;