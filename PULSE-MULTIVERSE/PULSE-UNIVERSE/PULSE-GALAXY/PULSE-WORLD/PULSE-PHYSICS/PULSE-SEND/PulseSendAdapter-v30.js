// ============================================================================
//  FILE: PulseSendAdapter-v30-IMMORTAL-INTEL++++.js
//  Pattern-Shape Adapter • Pulse-Agnostic Translator • Pre-Delivery Adapter
//  v30-IMMORTAL-INTEL++++:
//    - Binary-first + Dual-Band + Multi-Presence aware (symbolic/binary)
//    - Ancestry + Cosmos + Band + Advantage Echo + MeshFactoring Echo
//    - cacheChunkSurface + prewarmSurface + presenceSurface + bandSurface
//    - DualHash (classic) + INTEL hash + TriHash on key signatures
//    - IMMORTAL-INTEL++++ adapterIntelligence (burst-ready, GPU/band/mesh-aware)
//    - Binary path: wraps bits into full pulse envelope (band="binary")
//    - Drift-proof, deterministic, zero external IO
// ============================================================================
//
//  SAFETY CONTRACT (v30-IMMORTAL-INTEL++++):
//  ----------------------------------------
//  • No network, no async, no timestamps.
//  • No external IO, no global mutation.
//  • Deterministic, drift-proof, zero randomness.
//  • No mutation outside returned objects.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA (PulseRole is assumed to be injected by host bundler)
//    In most Pulse stacks this is imported from a shared identity module.
//    Here we just reference it so the adapter surface stays compatible.
const PulseRole = { identity: "PulseSendAdapter-v30-IMMORTAL-INTEL++++" };

// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// INTEL hash — structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// 32‑bit hash
function simpleHash32(str) {
  let hash = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0) >>> 0;
}

function triHash(shape) {
  const raw = stableStringify(shape || {});
  const len = raw.length || 1;
  const third = Math.floor(len / 3);

  const a = raw.slice(0, third);
  const b = raw.slice(third, 2 * third);
  const c = raw.slice(2 * third);

  const hA = simpleHash32(a);
  const hB = simpleHash32(b);
  const hC = simpleHash32(c);

  const hi = (BigInt(hA) << 32n) | BigInt(hB);
  const mid = BigInt(hC);
  const lo = BigInt(simpleHash32(raw));

  const combined = (hi ^ (mid << 16n) ^ (lo << 1n)) & ((1n << 112n) - 1n);

  return {
    triPrimary: `th30-${combined.toString(16)}`,
    hi,
    mid,
    lo
  };
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  const tri = triHash(intelBase);
  return {
    intel: intelHash,
    classic: classicHash,
    triPrimary: tri.triPrimary
  };
}

// ============================================================================
//  COSMOS + ANCESTRY HELPERS
// ============================================================================

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
  const cx = normalizeCosmos(cosmos || {});
  const raw = `${cx.universeId}|${cx.timelineId}|${cx.branchId}|${cx.worldId}|${cx.shardId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx30-${h.toString(16)}`;
}

function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId, cosmos }) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId = pageId || "NO_PAGE";

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId,
    cosmosSignature: cosmosSignature(cosmos)
  };

  return computeHash(stableStringify(shape));
}

// ============================================================================
//  BINARY SURFACE EXTRACTION (binary-first, dual-band aware)
// ============================================================================

function extractBinarySurfaceFromPulse(pulse) {
  const payload = pulse.payload || {};

  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = payload.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = payload.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = payload.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

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
//  DIAGNOSTICS + ANCESTRY + ADVANTAGE ECHO + BAND/PRESENCE + COSMOS + MESH
// ============================================================================

function buildAdapterDiagnostics({ pulse, targetOrgan, mode }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");

  const binarySurface = extractBinarySurfaceFromPulse(pulse);

  const patternClassic = computeHash(pattern);
  const lineageClassic = computeHash(String(lineageDepth));
  const pulseTypeClassic = computeHash(pulseType);
  const organClassic = computeHash(String(targetOrgan || "NO_ORGAN"));
  const modeClassic = computeHash(mode || "normal");
  const bandClassic = computeHash(band);

  const intelPayload = {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode: mode || "normal",
    band,
    binary: {
      hasBinary: binarySurface.hasBinary,
      binaryPattern: binarySurface.binaryPattern,
      binaryMode: binarySurface.binaryMode
    }
  };

  const classicString =
    `ADAPTER_DIAG_V30::PAT:${pattern}` +
    `::DEPTH:${lineageDepth}` +
    `::TYPE:${pulseType}` +
    `::ORGAN:${targetOrgan || "NO_ORGAN"}` +
    `::MODE:${mode || "normal"}` +
    `::BAND:${band}`;

  const diagSig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_DIAGNOSTICS_V30",
    intelPayload,
    classicString
  );

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode,
    band,

    binary: binarySurface,

    patternHash: patternClassic,
    lineageHash: lineageClassic,
    pulseTypeHash: pulseTypeClassic,
    organHash: organClassic,
    modeHash: modeClassic,
    bandHash: bandClassic,

    diagnosticsIntelSignature: diagSig.intel,
    diagnosticsClassicSignature: diagSig.classic,
    diagnosticsTriHashPrimary: diagSig.triPrimary
  };
}

function buildAncestrySurface(pulse) {
  const jobId = pulse.jobId || "NO_JOB";
  const lineage = Array.isArray(pulse.lineage) ? pulse.lineage : [];
  const originIdentity = pulse.PulseRole.identity || "UNKNOWN_ORIGIN";
  const pattern = pulse.pattern || "NO_PATTERN";
  const pageId = pulse.pageId || "NO_PAGE";
  const cosmos = normalizeCosmos(pulse.cosmos || {});

  const patternAncestry = buildPatternAncestry(pattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId,
    cosmos
  });

  const shape = {
    jobId,
    lineageDepth: lineage.length,
    originIdentity,
    lineage,
    pattern,
    patternAncestry,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    cosmos: cosmos,
    cosmosSignature: cosmosSignature(cosmos)
  };

  const classicString =
    `ADAPTER_ANCESTRY_V30::JOB:${jobId}` +
    `::DEPTH:${lineage.length}` +
    `::ORIGIN:${originIdentity}` +
    `::PAGE:${pageId}`;

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_ANCESTRY_V30",
    shape,
    classicString
  );

  return {
    jobId,
    lineageDepth: lineage.length,
    originIdentity,
    pattern,
    patternAncestry,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    cosmos,
    cosmosSignature: cosmosSignature(cosmos),
    ancestryIntelSignature: sig.intel,
    ancestryClassicSignature: sig.classic,
    ancestryTriHashPrimary: sig.triPrimary
  };
}

function buildAdvantageEchoSurface(pulse) {
  const advantageField = pulse.advantageField || {};
  const presenceField  = pulse.presenceField  || {};
  const factoringSignal = pulse.factoringSignal || null;
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");
  const meshFactoringProfile =
    pulse.meshFactoringProfile ||
    (pulse.pulseCompute && pulse.pulseCompute.meshFactoringProfile) ||
    null;

  const shape = {
    advantageField,
    presenceField,
    factoringSignal,
    band,
    meshFactoringProfile
  };

  const classicString =
    `ADAPTER_ADV_ECHO_V30::BAND:${band}` +
    `::FACT_SIG:${factoringSignal || "none"}`;

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_ADVANTAGE_ECHO_V30",
    shape,
    classicString
  );

  return {
    advantageField,
    presenceField,
    factoringSignal,
    band,
    meshFactoringProfile,
    advantageEchoIntelSignature: sig.intel,
    advantageEchoClassicSignature: sig.classic,
    advantageEchoTriHashPrimary: sig.triPrimary
  };
}

// ============================================================================
//  cacheChunk / prewarm / presence / band surfaces (v30 tuned)
// ============================================================================

function buildCacheChunkSurface({ pulse, targetOrgan, mode }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const jobId = pulse.jobId || "NO_JOB";
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");
  const cosmosSig = cosmosSignature(pulse.cosmos || {});

  const shape = {
    jobId,
    pattern,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode: mode || "normal",
    pulseType,
    band,
    cosmosSignature: cosmosSig
  };

  const serialized = stableStringify(shape);
  const cacheChunkKey = "psend-adapter-cache-v30::" + computeHash(serialized);

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_CACHE_CHUNK_V30",
    { cacheChunkKey, shape },
    `CACHE_CHUNK_V30::${cacheChunkKey}`
  );

  return {
    cacheChunkKey,
    cacheChunkClassicSignature: computeHash(cacheChunkKey),
    cacheChunkIntelSignature: sig.intel,
    cacheChunkDualSignature: sig.classic,
    cacheChunkTriHashPrimary: sig.triPrimary
  };
}

function buildPrewarmSurface({ pulse, targetOrgan, mode }) {
  const priority = pulse.priority || "normal";
  const safeMode = mode || "normal";
  const hasTarget = !!targetOrgan;

  let level = "none";
  if (priority === "high" || priority === "critical") {
    level = "aggressive";
  } else if (priority === "normal" && hasTarget) {
    level = "medium";
  } else if (priority === "low" && hasTarget) {
    level = "light";
  }

  const shape = {
    priority,
    mode: safeMode,
    hasTarget,
    level
  };

  const raw = stableStringify(shape);
  const prewarmKey = "psend-adapter-prewarm-v30::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_PREWARM_V30",
    { prewarmKey, shape },
    `PREWARM_V30::${prewarmKey}`
  );

  return {
    level,
    prewarmKey,
    prewarmIntelSignature: sig.intel,
    prewarmClassicSignature: sig.classic,
    prewarmTriHashPrimary: sig.triPrimary
  };
}

function buildPresenceSurface({ pulse, targetOrgan }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const hasTarget = !!targetOrgan;

  let scope = "local";
  if (hasTarget && pattern.includes("/global")) {
    scope = "global";
  } else if (hasTarget && pattern.includes("/page")) {
    scope = "page";
  }

  const shape = {
    pattern,
    hasTarget,
    scope
  };

  const raw = stableStringify(shape);
  const presenceKey = "psend-adapter-presence-v30::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_PRESENCE_V30",
    { presenceKey, shape },
    `PRESENCE_V30::${presenceKey}`
  );

  return {
    scope,
    presenceKey,
    presenceIntelSignature: sig.intel,
    presenceClassicSignature: sig.classic,
    presenceTriHashPrimary: sig.triPrimary
  };
}

function buildBandSurface(pulse) {
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");
  const hasBinary = !!extractBinarySurfaceFromPulse(pulse).hasBinary;

  const shape = {
    band,
    hasBinary,
    bandMode: band,
    bandStrength: hasBinary ? 1 : 0.4
  };

  const raw = stableStringify(shape);
  const bandKey = "psend-adapter-band-v30::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_BAND_V30",
    { bandKey, shape },
    `BAND_V30::${bandKey}`
  );

  return {
    band,
    hasBinary,
    bandKey,
    bandIntelSignature: sig.intel,
    bandClassicSignature: sig.classic,
    bandTriHashPrimary: sig.triPrimary
  };
}

// ============================================================================
//  IMMORTAL-INTEL++++ — Adapter Intelligence (burst / GPU / band / mesh aware)
// ============================================================================

function computeAdapterIntelligence({
  diagnostics,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  bandSurface,
  advantageEchoSurface
}) {
  const patternLen = (diagnostics.pattern || "").length;
  const lineageDepth = diagnostics.lineageDepth || 0;
  const hasBinary = diagnostics.binary.hasBinary ? 1 : 0;

  const presenceScope = presenceSurface.scope || "local";
  const presenceWeight =
    presenceScope === "global" ? 1.0 :
    presenceScope === "page"   ? 0.7 :
    presenceScope === "local"  ? 0.4 :
    0.2;

  const prewarmLevel = prewarmSurface.level || "none";
  const prewarmWeight =
    prewarmLevel === "aggressive" ? 1.0 :
    prewarmLevel === "medium"     ? 0.7 :
    prewarmLevel === "light"      ? 0.4 :
    0.1;

  const cacheWeight = cacheChunkSurface.cacheChunkKey ? 0.7 : 0.2;

  const bandStrength = bandSurface.bandStrength || 0.4;
  const meshPressure =
    advantageEchoSurface.meshFactoringProfile &&
    typeof advantageEchoSurface.meshFactoringProfile.pressure === "number"
      ? clamp01(advantageEchoSurface.meshFactoringProfile.pressure)
      : 0;

  const structuralScore =
    patternLen * 0.0007 +
    lineageDepth * 0.0012 +
    hasBinary * 0.15;

  const solvednessScore = clamp01(
    structuralScore * 0.45 +
    presenceWeight * 0.2 +
    prewarmWeight * 0.15 +
    cacheWeight * 0.1 +
    bandStrength * 0.05 +
    meshPressure * 0.05
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.65 +
    hasBinary * 0.15 +
    bandStrength * 0.1 +
    meshPressure * 0.1
  );

  const intelShape = {
    version: "v30-IMMORTAL-INTEL++++",
    solvednessScore,
    computeTier,
    readinessScore,
    presenceScope,
    prewarmLevel,
    hasBinary: !!hasBinary,
    patternLen,
    lineageDepth,
    band: bandSurface.band,
    bandStrength,
    meshPressure
  };

  const classicString =
    `ADAPTER_INTEL_V30::SOLV:${solvednessScore.toFixed(4)}` +
    `::TIER:${computeTier}` +
    `::READY:${readinessScore.toFixed(4)}`;

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_INTELLIGENCE_V30",
    intelShape,
    classicString
  );

  return {
    ...intelShape,
    adapterIntelligenceIntelSignature: sig.intel,
    adapterIntelligenceClassicSignature: sig.classic,
    adapterIntelligenceTriHashPrimary: sig.triPrimary
  };
}

// ============================================================================
//  ADAPTER RULES — how each organ wants to receive a Pulse organism (v30)
// ============================================================================

const ORGAN_ADAPTERS = {
  GPU: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    presenceField: pulse.presenceField,
    band: normalizeBand(pulse.band || pulse.bandMode),
    gpuReady: true
  }),

  Earn: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    presenceField: pulse.presenceField,
    band: normalizeBand(pulse.band || pulse.bandMode),
    earnReady: true
  }),

  OS: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    presenceField: pulse.presenceField,
    band: normalizeBand(pulse.band || pulse.bandMode),
    osReady: true
  }),

  Mesh: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    presenceField: pulse.presenceField,
    band: normalizeBand(pulse.band || pulse.bandMode),
    meshReady: true
  })
};

// ============================================================================
//  FACTORY — Create an Adapter for ANY Pulse organism (v30 IMMORTAL-INTEL++++)
// ============================================================================

export function adaptPulseSendPacket(pulse, targetOrgan, mode = "normal") {
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
  const advantageField = pulse.advantageField || null;

  const diagnostics = buildAdapterDiagnostics({
    pulse,
    targetOrgan,
    mode
  });

  const cacheChunkSurface = buildCacheChunkSurface({
    pulse,
    targetOrgan,
    mode
  });

  const prewarmSurface = buildPrewarmSurface({
    pulse,
    targetOrgan,
    mode
  });

  const presenceSurface = buildPresenceSurface({
    pulse,
    targetOrgan
  });

  const bandSurface = buildBandSurface(pulse);
  const ancestrySurface = buildAncestrySurface(pulse);
  const advantageEchoSurface = buildAdvantageEchoSurface(pulse);

  const adapterIntelligence = computeAdapterIntelligence({
    diagnostics,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    bandSurface,
    advantageEchoSurface
  });

  const adapterSignatureShape = {
    pattern: diagnostics.pattern,
    targetOrgan: diagnostics.targetOrgan,
    mode: diagnostics.mode,
    band: diagnostics.band,
    binaryPattern: diagnostics.binary.binaryPattern || "NO_BINARY_PATTERN",
    routerHint: diagnostics.binary.routerHint || "NO_ROUTER_HINT",
    meshHint: diagnostics.binary.meshHint || "NO_MESH_HINT",
    organHint: diagnostics.binary.organHint || "NO_ORGAN_HINT"
  };

  const classicString =
    `ADAPTER_SIG_V30::PAT:${adapterSignatureShape.pattern}` +
    `::ORGAN:${adapterSignatureShape.targetOrgan}` +
    `::MODE:${adapterSignatureShape.mode}` +
    `::BAND:${adapterSignatureShape.band}`;

  const adapterSig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_SIGNATURE_V30",
    adapterSignatureShape,
    classicString
  );

  const adapter = ORGAN_ADAPTERS[targetOrgan];

  if (typeof adapter === "function") {
    return {
      ...adapter(
        { ...pulse, pulseType, advantageField },
        targetOrgan,
        mode
      ),
      PulseRole,
      adapterIntelSignature: adapterSig.intel,
      adapterClassicSignature: adapterSig.classic,
      adapterTriHashPrimary: adapterSig.triPrimary,
      diagnostics,
      cacheChunkSurface,
      prewarmSurface,
      presenceSurface,
      bandSurface,
      ancestrySurface,
      advantageEchoSurface,
      adapterIntelligence
    };
  }

  // Fallback: neutral shape
  return {
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType,
    advantageField,
    presenceField: pulse.presenceField || null,
    band: normalizeBand(pulse.band || pulse.bandMode),
    neutral: true,

    PulseRole,
    adapterIntelSignature: adapterSig.intel,
    adapterClassicSignature: adapterSig.classic,
    adapterTriHashPrimary: adapterSig.triPrimary,
    diagnostics,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    bandSurface,
    ancestrySurface,
    advantageEchoSurface,
    adapterIntelligence
  };
}

// ============================================================================
//  ORGAN EXPORT — BinarySend tech-surface compatibility (binary-first, v30)
// ============================================================================
//
//  BinarySend-v30 imports:
//    import { PulseSendAdapter } from "./PulseSendAdapter-v30-IMMORTAL-INTEL++++.js";
//    const adapter = PulseSendAdapter.adapt ? PulseSendAdapter.adapt(bits) : null;
// ============================================================================

export const PulseSendAdapter = {
  PulseRole,

  adapt(bitsOrPulse, targetOrgan, mode) {
    // If it's already a pulse-shaped object, pass through.
    if (bitsOrPulse && typeof bitsOrPulse === "object" && !Array.isArray(bitsOrPulse)) {
      return adaptPulseSendPacket(bitsOrPulse, targetOrgan, mode);
    }

    // Binary path: wrap bits into a synthetic pulse envelope (binary-first).
    const bits = Array.isArray(bitsOrPulse) ? bitsOrPulse : [];
    const pseudoPulse = {
      jobId: "BINARY_SEND_ADAPTER_V30",
      pattern: "binary/send/adapter/v30",
      payload: {
        binaryPayload: bits,
        binaryPattern: "binary/send",
        binaryMode: mode || "normal"
      },
      priority: "normal",
      returnTo: null,
      band: "binary",
      bandMode: "binary",
      lineage: [],
      cosmos: {
        universeId: "u:default",
        timelineId: "t:main",
        branchId: "b:root",
        worldId: "w:primary",
        shardId: "s:0"
      }
    };

    return adaptPulseSendPacket(pseudoPulse, targetOrgan, mode);
  }
};

PulseRealm.SendAdapter = {
  PulseSendAdapter,
  adaptPulseSendPacket,
  ORGAN_ADAPTERS
}