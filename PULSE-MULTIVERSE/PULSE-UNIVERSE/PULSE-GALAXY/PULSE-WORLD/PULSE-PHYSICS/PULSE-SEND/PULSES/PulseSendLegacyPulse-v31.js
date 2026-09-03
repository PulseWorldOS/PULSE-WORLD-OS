// ============================================================================
//  PulseSendLegacyPulse-v31-IMMORTAL-INTEL.js
//  Pulse v1 Organism • Stable Evolutionary Floor • Non-Evolving
//  v31-IMMORTAL-INTEL:
//    - Binary-aware + Band-aware (symbolic/binary)
//    - CacheChunk + Prewarm + Presence + Degradation + ImmortalMeta + Cosmos
//    - DualHash (classic) + INTEL hash on all key signatures
//    - Mesh-aware ancestry (pattern/lineage/page/cosmos)
//    - Still: stable, non-evolving, metadata-only (no evolution logic)
// ============================================================================
//
//  ROLE:
//    • v1 is the *stable floor* of the organism stack.
//    • It never evolves, never mutates, never computes evolution tiers.
//    • It surfaces 12.3+/14.4+/16+/24+/30+/31 metadata
//      (cacheChunk, prewarm, presence, degradation, immortalMeta, ancestry, cosmos).
//    • It does NOT use these surfaces to evolve or change behavior.
//    • Deterministic, stable, non-evolving, non-computing.
//
//  SAFETY CONTRACT (v31-IMMORTAL-INTEL EvoStable):
//  --------------------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external mutation or IO.
//  • Deterministic, stable, non-evolving organism.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return (
    "{" +
    keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") +
    "}"
  );
}

// v31 classic hash (20‑bit-ish floor, but using v31 style)
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 5)) % 100000;
  }
  return `h${h}`;
}

// alt hash (v31 floor, alt channel)
function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 17)) % 1000003;
  }
  return `hB${h}`;
}

// INTEL hash — structure-aware, no IO, no time. (v31 IMMORTAL-INTEL)
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function computeDualHash(value) {
  const s = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intel = computeHashIntelligence(intelBase);
  const classic = computeHash(`${label}::${classicString || ""}`);
  return { intel, classic };
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage, cosmosSignature) {
  const raw =
    pattern +
    "::" +
    (Array.isArray(lineage) ? lineage.join("::") : "") +
    "::" +
    (cosmosSignature || "NO_COSMOS");
  const dual = computeDualHash(raw);
  return {
    shapeSignature: `shape31-${dual.primary}`,
    shapeSignatureDual: dual
  };
}

function computeEvolutionStage(pattern, lineage) {
  const depth = Array.isArray(lineage) ? lineage.length : 0;
  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";
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

function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root",
    worldId: cosmos.worldId || "w:primary",
    shardId: cosmos.shardId || "s:0"
  };
}

function cosmosSignature(cosmos) {
  const cx = normalizeCosmos(cosmos);
  const raw = `${cx.universeId}|${cx.timelineId}|${cx.branchId}|${cx.worldId}|${cx.shardId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx31-${h.toString(16)}`;
}

function buildPageAncestrySignature({ pattern, lineage, pageId, cosmos }) {
  const shape = {
    pattern,
    patternAncestry: buildPatternAncestry(pattern),
    lineageSignature: buildLineageSignature(lineage),
    pageId: pageId || "NO_PAGE",
    cosmosSignature: cosmosSignature(cosmos || {})
  };
  const dual = computeDualHash(shape);
  return {
    pageAncestrySignature: dual.primary,
    pageAncestrySignatureDual: dual
  };
}

function extractBinarySurface(payload) {
  const p = payload || {};

  const binaryPattern  = p.binaryPattern || null;
  const binaryMode     = p.binaryMode || null;
  const binaryPayload  = p.binaryPayload || null;
  const binaryHints    = p.binaryHints || null;
  const binaryStrength = typeof p.binaryStrength === "number" ? p.binaryStrength : null;

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

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.97) return "microDegrade";
  if (h >= 0.88) return "softDegrade";
  if (h >= 0.55) return "midDegrade";
  if (h >= 0.18) return "hardDegrade";
  return "criticalDegrade";
}

function extractImmortalMeta(payload) {
  const meta = payload.immortalMeta || {};
  return {
    presenceBandState: meta.presenceBandState ?? null,
    harmonicDrift: meta.harmonicDrift ?? null,
    coherenceScore: meta.coherenceScore ?? null,
    dualBandMode: meta.dualBandMode ?? null,
    shifterBand: meta.shifterBand ?? null
  };
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}


// ============================================================================
//  v31 surfaces — surfaced only, never used for evolution
// ============================================================================

function buildCacheChunkSurface({ pattern, lineage, pageId, cosmos }) {
  const shape = {
    pattern,
    lineage,
    pageId,
    cosmosSignature: cosmosSignature(cosmos || {})
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "pulse-v1-cache31::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_V1_CACHE_CHUNK_V31",
    shape,
    `CACHE_V1::${cacheChunkKey}`
  );

  return {
    cacheChunkKey,
    cacheChunkClassicSignature: computeHash(cacheChunkKey),
    cacheChunkIntelSignature: sig.intel,
    cacheChunkDualSignature: sig.classic
  };
}

function buildPrewarmSurface({ priority }) {
  let level = "none";
  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const shape = { priority, level };
  const raw = stableStringify(shape);
  const prewarmKey = "pulse-v1-prewarm31::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_V1_PREWARM_V31",
    { prewarmKey, shape },
    `PREWARM_V1::${prewarmKey}`
  );

  return {
    level,
    prewarmKey,
    prewarmIntelSignature: sig.intel,
    prewarmClassicSignature: sig.classic
  };
}

function buildPresenceSurface({ pattern, band }) {
  let scope = "local";
  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const shape = { pattern, scope, band: normalizeBand(band) };
  const raw = stableStringify(shape);
  const presenceKey = "pulse-v1-presence31::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_V1_PRESENCE_V31",
    { presenceKey, shape },
    `PRESENCE_V1::${presenceKey}`
  );

  return {
    scope,
    band: shape.band,
    presenceKey,
    presenceIntelSignature: sig.intel,
    presenceClassicSignature: sig.classic
  };
}

function buildDegradationSurface({ healthScore }) {
  const score = typeof healthScore === "number" ? healthScore : 1.0;
  const degradationTier = classifyDegradationTier(score);
  const shape = { healthScore: score, degradationTier };
  const sig = buildDualHashSignature(
    "PULSE_V1_DEGRADATION_V31",
    shape,
    `DEGRADE_V1::${score.toFixed(4)}::${degradationTier}`
  );

  return {
    healthScore: score,
    degradationTier,
    degradationIntelSignature: sig.intel,
    degradationClassicSignature: sig.classic
  };
}

function buildImmortalSurface({ immortalMeta }) {
  const raw = stableStringify(immortalMeta);
  const sig = buildDualHashSignature(
    "PULSE_V1_IMMORTAL_V31",
    immortalMeta,
    `IMMORTAL_V1::${computeHash(raw)}`
  );

  return {
    immortalMeta,
    immortalIntelSignature: sig.intel,
    immortalClassicSignature: sig.classic
  };
}


// ============================================================================
//  DIAGNOSTICS (stable, non-evolving, v31 surfaces)
// ============================================================================

function buildDiagnostics(pattern, lineage, payload, healthScore, cosmos, band) {
  const binarySurface = extractBinarySurface(payload);
  const degradationSurface = buildDegradationSurface({ healthScore });
  const immortalMeta = extractImmortalMeta(payload);
  const immortalSurface = buildImmortalSurface({ immortalMeta });

  const patternLen = (pattern || "").length;
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;

  const patternDual = computeDualHash(pattern || "NO_PATTERN");
  const lineageDual = computeDualHash(buildLineageSignature(lineage));
  const cosmosSig = cosmosSignature(cosmos || {});

  const intelShape = {
    pattern,
    patternLen,
    lineageDepth,
    lineageSignature: buildLineageSignature(lineage),
    cosmosSignature: cosmosSig,
    binary: {
      hasBinary: binarySurface.hasBinary,
      binaryPattern: binarySurface.binaryPattern,
      binaryMode: binarySurface.binaryMode
    },
    degradationTier: degradationSurface.degradationTier,
    band: normalizeBand(band)
  };

  const diagSig = buildDualHashSignature(
    "PULSE_V1_DIAGNOSTICS_V31",
    intelShape,
    `DIAG_V1::PAT:${pattern}::DEPTH:${lineageDepth}::COSMOS:${cosmosSig}`
  );

  return {
    patternLength: patternLen,
    lineageDepth,
    lineageDensity: lineageDepth === 0 ? 0 : patternLen / lineageDepth,
    stabilityTier: "v1-evo-stable-31-Immortal-INTEL",

    binary: binarySurface,
    degradation: degradationSurface,
    immortal: immortalSurface,

    patternHash: patternDual.primary,
    patternHashDual: patternDual,
    lineageHash: lineageDual.primary,
    lineageHashDual: lineageDual,

    diagnosticsIntelSignature: diagSig.intel,
    diagnosticsClassicSignature: diagSig.classic
  };
}


// ============================================================================
//  FACTORY — Create a Pulse v1 Organism (v31 Stable-Immortal-INTEL)
// ============================================================================

export function createLegacyPulse({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE",
  cosmos = null,
  band = "symbolic"
}) {
  const safePattern = pattern || "NO_PATTERN";
  const lineage = buildLineage(parentLineage, safePattern);
  const cx = normalizeCosmos(cosmos || {});
  const cxSig = cosmosSignature(cx);
  const bandNorm = normalizeBand(band);

  const { shapeSignature, shapeSignatureDual } = computeShapeSignature(
    safePattern,
    lineage,
    cxSig
  );
  const evolutionStage = computeEvolutionStage(safePattern, lineage);

  const patternAncestry  = buildPatternAncestry(safePattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestry     = buildPageAncestrySignature({
    pattern: safePattern,
    lineage,
    pageId,
    cosmos: cx
  });

  const advantageField = {
    patternStrength: safePattern.length,
    lineageDepth: lineage.length,
    modeBias: mode === "stress" ? 2 : 1,
    stabilityTier: "v1-evo-stable-31-Immortal-INTEL",
    band: bandNorm
  };

  const healthScore = 1.0;
  const tier = "stable";

  const cacheChunkSurface = buildCacheChunkSurface({
    pattern: safePattern,
    lineage,
    pageId,
    cosmos: cx
  });

  const prewarmSurface = buildPrewarmSurface({
    priority
  });

  const presenceSurface = buildPresenceSurface({
    pattern: safePattern,
    band: bandNorm
  });

  const diagnostics = buildDiagnostics(
    safePattern,
    lineage,
    payload,
    healthScore,
    cx,
    bandNorm
  );
  const immortalMeta = diagnostics.immortal.immortalMeta;

  const stableClassic = `${safePattern}::${lineageSignature}::${cxSig}`;
  const stableSignatureDual = computeDualHash(stableClassic);

  const intelMetaShape = {
    pattern: safePattern,
    lineageSignature,
    cosmosSignature: cxSig,
    band: bandNorm,
    stabilityTier: "v1-evo-stable-31-Immortal-INTEL"
  };
  const intelMetaSig = buildDualHashSignature(
    "PULSE_V1_META_V31",
    intelMetaShape,
    `META_V1::${stableClassic}`
  );

  return {
    jobId,
    pattern: safePattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,
    cosmos: cx,
    band: bandNorm,

    pulseType: "Pulse-v1-EvoStable-v31-Immortal-INTEL",

    advantageField,
    healthScore,
    tier,

    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,

    immortalMeta,

    meta: {
      shapeSignature,
      shapeSignatureDual,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature: pageAncestry.pageAncestrySignature,
      pageAncestrySignatureDual: pageAncestry.pageAncestrySignatureDual,

      diagnostics,

      stableSignature: stableSignatureDual.primary,
      stableSignatureDual,

      patternSignature: diagnostics.patternHash,
      lineageSurface: computeHash(String(lineage.length)),
      advantageSignature: computeHash(stableStringify(advantageField)),
      healthSignature: computeHash("1.0"),
      tierSignature: computeHash("stable"),

      intelMetaSignatureIntel: intelMetaSig.intel,
      intelMetaSignatureClassic: intelMetaSig.classic
    }
  };
}


// ============================================================================
//  FROM IMPULSE — build a v1 Pulse from an Impulse traveler (v31 IMMORTAL)
// ============================================================================

export function legacyPulseFromImpulse(impulse, overrides = {}) {
  if (!impulse) return null;

  const payload = impulse.payload || {};

  const pattern       = overrides.pattern       || payload.pattern       || impulse.intent || "UNKNOWN_PATTERN";
  const jobId         = overrides.jobId         || payload.jobId         || impulse.tickId;
  const priority      = overrides.priority      || payload.priority      || "normal";
  const returnTo      = overrides.returnTo      || payload.returnTo      || null;
  const parentLineage = overrides.parentLineage || payload.parentLineage || null;
  const mode          = overrides.mode          || payload.mode          || "normal";
  const pageId        = overrides.pageId        || payload.pageId        || "NO_PAGE";
  const cosmos        = overrides.cosmos        || payload.cosmos        || null;
  const band          = overrides.band          || payload.band          || "symbolic";

  return createLegacyPulse({
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    parentLineage,
    mode,
    pageId,
    cosmos,
    band
  });
}

PulseRealm.SendLegacyPulse = {
  legacyPulseFromImpulse,
  createLegacyPulse
}

PulseRealm.PulseSendLegacyPulse = createLegacyPulse;