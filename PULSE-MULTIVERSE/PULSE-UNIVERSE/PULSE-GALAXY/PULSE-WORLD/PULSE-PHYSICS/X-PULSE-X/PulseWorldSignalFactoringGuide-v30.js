// ============================================================================
// FILE: PulseSignalFactoringGuide-v30-IMMORTAL.js
// ROLE: WORLD SIGNAL FACTORING GUIDE — v30 IMMORTAL-INTEL ONE-BAND
// LAYER: mesh + earn + world-band (symbolic/binary one-band)
// CONTRACT:
//   • Pure, deterministic, no timers, no randomness, no network
//   • Only mutates target.meta / target.flags
//   • Mesh/Earn aware, band-aware, GPU/cache/chunk hints
//   • Uses dual hash: classic + intelligence hash
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export const PulseSignalFactoringGuideMeta = Object.freeze({
  version: "v30-IMMORTAL-SIGNAL-GUIDE",
  band: "binary_oneband",
  layer: "world_signal_factoring",
  deterministic: true,
  driftProof: true,
  zeroRandom: true
});

// ---------------------------------------------------------------------------
// HASH HELPERS — classic + intelligence
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// BASE FORMULA REGISTRY — WORLD-SAFE
// ---------------------------------------------------------------------------
const _baseFormulaRegistry = Object.create(null);

export function registerBaseFormula(baseFormulaKey, descriptor) {
  if (!baseFormulaKey || typeof baseFormulaKey !== "string") return;
  if (!descriptor || typeof descriptor !== "object") return;

  const safeDescriptor = {
    name: String(descriptor.name || "unnamed_formula"),
    version: String(descriptor.version || "v1"),
    layerHint:
      descriptor.layerHint === "mesh" || descriptor.layerHint === "earn"
        ? descriptor.layerHint
        : "any",
    description: String(descriptor.description || ""),
    tags: Array.isArray(descriptor.tags)
      ? descriptor.tags.map(t => String(t))
      : [],
    mathShape: String(descriptor.mathShape || ""),
    factorPattern: String(descriptor.factorPattern || ""),
    notes: String(descriptor.notes || "")
  };

  _baseFormulaRegistry[baseFormulaKey] = safeDescriptor;
}

export function lookupBaseFormula(baseFormulaKey) {
  if (!baseFormulaKey || typeof baseFormulaKey !== "string") return null;
  const entry = _baseFormulaRegistry[baseFormulaKey];
  return entry ? { key: baseFormulaKey, ...entry } : null;
}

export function listBaseFormulas() {
  return Object.keys(_baseFormulaRegistry).map(key => ({
    key,
    ..._baseFormulaRegistry[key]
  }));
}

// ---------------------------------------------------------------------------
// SNAPSHOT EXTRACTORS — MESH + EARN
// ---------------------------------------------------------------------------
function extractMeshFactoringSnapshot(impulse) {
  const meta = impulse.meta.signalFactoring || {};
  const profile = meta.profile || {};
  const advantageField = meta.advantageField || {};
  const bandBinaryWave = meta.bandBinaryWave || {};

  return {
    layer: "mesh",
    pressure: profile.pressure ?? 0,
    signal: profile.signal ?? 0,
    depth: profile.depth ?? 0,
    stride: profile.stride ?? 1,
    presenceTier: profile.presenceTier || "idle",
    presenceBand: profile.presenceBand || profile.band || "symbolic",
    jobCount: profile.jobCount ?? 0,
    cachePriority: profile.cachePriority || "normal",
    prewarmNeeded: !!profile.prewarmNeeded,
    baseFormulaKey: meta.baseFormulaKey || null,
    baseShapeSurface: meta.baseShapeSurface || {},
    advantageField,
    bandBinaryWave
  };
}

function extractEarnFactoringSnapshot(page) {
  const meta = page.meta.earnSignalFactoring || {};
  const profile = meta.profile || {};
  const advantageField = meta.advantageField || {};
  const bandBinaryWave = meta.bandBinaryWave || {};

  return {
    layer: "earn",
    pressure: profile.pressure ?? 0,
    signal: profile.signal ?? 0,
    depth: profile.depth ?? 0,
    stride: profile.stride ?? 1,
    presenceTier: profile.presenceTier || "idle",
    presenceBand: profile.presenceBand || profile.band || "symbolic",
    jobCount: profile.jobCount ?? 0,
    cachePriority: profile.cachePriority || "normal",
    prewarmNeeded: !!profile.prewarmNeeded,
    baseFormulaKey: meta.baseFormulaKey || null,
    baseShapeSurface: meta.baseShapeSurface || {},
    advantageField,
    bandBinaryWave
  };
}

// ---------------------------------------------------------------------------
// ADVANTAGE HINTS — CHUNK / CACHE / GPU / BAND
// ---------------------------------------------------------------------------
function buildAdvantageHints(snapshot, baseFormula, bandSnapshot) {
  const pressure = snapshot.pressure || 0;
  const depth = snapshot.depth || 0;
  const jobCount = snapshot.jobCount || 0;
  const cachePriority = snapshot.cachePriority || "normal";
  const prewarmNeeded = !!snapshot.prewarmNeeded;

  const bandMode = bandSnapshot.mode ?? "normal";
  const bandLevel = bandSnapshot.bandLevel ?? null;
  const fallbackLevel = bandSnapshot.fallbackLevel ?? 0;

  // Chunking hint
  let chunkStrategy = "none";
  if (jobCount >= 64 || depth >= 2) {
    chunkStrategy = "sharded_chunks";
  } else if (jobCount >= 16) {
    chunkStrategy = "medium_chunks";
  }

  // Cache tier hint
  let cacheTier = "cold";
  if (cachePriority === "high" || pressure >= 0.5) cacheTier = "hot";
  else if (cachePriority === "normal" && pressure >= 0.2) cacheTier = "warm";

  // GPU batch hint
  let gpuBatchStyle = "none";
  if (snapshot.layer === "mesh" && jobCount >= 32) {
    gpuBatchStyle = "warp_aligned";
  } else if (snapshot.layer === "earn" && jobCount >= 16) {
    gpuBatchStyle = "batched_jobs";
  }

  // Prewarm hint
  const prewarmHint = prewarmNeeded || pressure >= 0.4;

  // Band risk hint
  const bandRisk =
    bandMode === "high_risk" ||
    bandMode === "offline_biased" ||
    fallbackLevel > 0;

  return {
    chunkStrategy,
    cacheTier,
    gpuBatchStyle,
    prewarmHint,
    bandMode,
    bandLevel,
    fallbackLevel,
    bandRisk,
    baseFormulaKey: snapshot.baseFormulaKey || null,
    baseFormulaName: baseFormula.name || null
  };
}

// ---------------------------------------------------------------------------
// GUIDE SURFACE — CORE v30
// ---------------------------------------------------------------------------
function buildGuideSurface(snapshot, baseFormula, bandSnapshot) {
  const hasFormula = !!baseFormula;
  const pressure = snapshot.pressure || 0;
  const depth = snapshot.depth || 0;
  const stride = snapshot.stride || 1;
  const signal = snapshot.signal || 0;

  // Snap intent
  let snapIntent = "none";
  if (hasFormula && signal === 1 && pressure >= 0.2) snapIntent = "strong";
  else if (hasFormula && pressure >= 0.1) snapIntent = "weak";

  // Factoring style
  let factoringStyle = "none";
  if (signal === 1 && depth >= 1) {
    factoringStyle =
      stride <= 0.5 ? "divide_and_conquer" : "shallow_factoring";
  }

  // CNS band context
  const bandContext = bandSnapshot
    ? {
        bandLevel: bandSnapshot.bandLevel ?? null,
        fallbackLevel: bandSnapshot.fallbackLevel ?? null,
        mode: bandSnapshot.mode ?? null
      }
    : null;

  // Advantage hints (chunk/cache/GPU/prewarm/bandRisk)
  const advantageHints = buildAdvantageHints(
    snapshot,
    baseFormula,
    bandSnapshot
  );

  const guidePayload = {
    layer: snapshot.layer,
    presenceTier: snapshot.presenceTier,
    presenceBand: snapshot.presenceBand,
    pressure,
    depth,
    stride,
    signal,
    snapIntent,
    factoringStyle,
    hasFormula,
    baseFormulaKey: snapshot.baseFormulaKey || null,
    baseFormulaName: baseFormula.name || null,
    baseFormulaVersion: baseFormula.version || null,
    baseFormulaMathShape: baseFormula.mathShape || null,
    baseFormulaPattern: baseFormula.factorPattern || null,
    bandContext,
    advantageHints
  };

  const classicString =
    `GUIDE_v30::${guidePayload.layer}` +
    `::SIG:${signal}` +
    `::DEPTH:${depth}` +
    `::STRIDE:${stride}` +
    `::SNAP:${snapIntent}` +
    `::STYLE:${factoringStyle}` +
    `::FORMULA:${guidePayload.baseFormulaKey || "NONE"}` +
    `::CACHE:${advantageHints.cacheTier}` +
    `::CHUNK:${advantageHints.chunkStrategy}`;

  const signatures = {
    intel: computeHashIntelligence(guidePayload),
    classic: computeHash(classicString)
  };

  return { guidePayload, signatures };
}

// ---------------------------------------------------------------------------
// ATTACH GUIDE META — IMMORTAL-SAFE
// ---------------------------------------------------------------------------
function attachGuideMeta(target, guideSurface) {
  if (!target) return target;
  target.meta = target.meta || {};
  target.flags = target.flags || {};

  target.meta.signalFactoringGuide = {
    version: PulseSignalFactoringGuideMeta.version,
    layer: "PulseSignalFactoringGuide",
    guidePayload: guideSurface.guidePayload,
    signatures: guideSurface.signatures
  };

  target.flags.signalFactoringGuide = true;
  return target;
}

// ---------------------------------------------------------------------------
// PUBLIC APPLY — MESH + EARN
// ---------------------------------------------------------------------------
export function applySignalFactoringGuideToMesh(impulse, bandSnapshot = null) {
  if (!impulse) return impulse;
  const snapshot = extractMeshFactoringSnapshot(impulse);
  const baseFormula = snapshot.baseFormulaKey
    ? lookupBaseFormula(snapshot.baseFormulaKey)
    : null;
  const guideSurface = buildGuideSurface(snapshot, baseFormula, bandSnapshot);
  return attachGuideMeta(impulse, guideSurface);
}

export function applySignalFactoringGuideToEarn(page, bandSnapshot = null) {
  if (!page) return page;
  const snapshot = extractEarnFactoringSnapshot(page);
  const baseFormula = snapshot.baseFormulaKey
    ? lookupBaseFormula(snapshot.baseFormulaKey)
    : null;
  const guideSurface = buildGuideSurface(snapshot, baseFormula, bandSnapshot);
  return attachGuideMeta(page, guideSurface);
}

// ---------------------------------------------------------------------------
// DEFAULT BASE FORMULAS — v30 WORLD PRESETS
// ---------------------------------------------------------------------------
function seedDefaultBaseFormulas() {
  const examples = [
    {
      key: "HINTEL_DIVIDE_AND_CONQUER_GENERIC",
      descriptor: {
        name: "Generic Divide-and-Conquer",
        version: "v3",
        layerHint: "any",
        description:
          "Generic /2 recursion pattern; suitable for balanced splitting of work or data.",
        tags: ["divide_and_conquer", "recursion", "binary_split"],
        mathShape: "T(n) = 2T(n/2) + f(n)",
        factorPattern: "/2 recursion",
        notes:
          "Use when depth>1, stride≈1/(depth+1), and pressure is moderate to high."
      }
    },
    {
      key: "HINTEL_MESH_MINING_PATTERN",
      descriptor: {
        name: "Mesh Mining Pattern",
        version: "v3",
        layerHint: "mesh",
        description: "Mesh‑level mining pattern for 64‑way impulse distribution.",
        tags: ["mining", "mesh", "parallel", "gpu"],
        mathShape: "O(64 * f(chunk))",
        factorPattern: "fixed‑fanout",
        notes:
          "Aligns with 64‑instance miner; treat each channel as a shard; ideal for warp‑aligned GPU batches."
      }
    },
    {
      key: "HINTEL_EARN_JOB_BATCHING",
      descriptor: {
        name: "Earn Job Batching",
        version: "v3",
        layerHint: "earn",
        description: "Batch jobs into base formula groups for reuse and caching.",
        tags: ["earn", "batching", "reuse", "cache"],
        mathShape: "O(batches * f(batchSize))",
        factorPattern: "group‑by‑formula",
        notes:
          "Use when many jobs share the same baseFormulaKey; pair with warm/hot cache tiers."
      }
    }
  ];

  for (const ex of examples) {
    registerBaseFormula(ex.key, ex.descriptor);
  }
}

seedDefaultBaseFormulas();

PulseRealm.WorldSignalFactoring = {
  registerBaseFormula,
  lookupBaseFormula,
  listBaseFormulas,
  PulseSignalFactoringGuideMeta
}