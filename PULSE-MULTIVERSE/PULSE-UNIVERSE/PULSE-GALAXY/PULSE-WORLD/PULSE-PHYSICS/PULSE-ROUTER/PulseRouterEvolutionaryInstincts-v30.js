// ============================================================================
// FILE: PulseRouterEvolutionaryInstincts-v30-IMMORTAL-INTEL++-OneBand.js
//  PULSE ROUTER EVOLUTIONARY INSTINCTS v30-IMMORTAL-CORE-DUALSTACK-INTEL++-ONEBAND
//  Adaptive Routing Identity • Genetic Route Memory • Best-Path Preservation
//  Symbolic + Binary + Presence + CacheChunk + Cosmos + Band
//  Deterministic • Drift-Proof • IntelDualHash v30 • TriHash v30 • Healing Surface
//  FULL ORGAN — Context, Helpers, Hashing, Scoring, Advantage, Store, Wrapper, Exports
// ============================================================================
//
//  ROLE:
//    • Stores evolutionary routing memory (success/failure/degrade) across ONEBAND.
//    • Symbolic + Binary + Presence + CacheChunk + Cosmos + Band dual-stack ancestry.
//    • Deterministic scoring + regression detection + advantage field v4 (unified).
//    • Loop-Theory-Aware, Earn/Design compatible advantage semantics.
//    • Pure memory organ — NO routing, NO compute, NO mutation outside instance.
//
//  SAFETY CONTRACT (IMMORTAL v30-INTEL):
//    • No randomness, no timestamps, no async, no network, no filesystem.
//    • Deterministic-field: identical input → identical output.
//    • No mutation of caller payloads; only internal store state.
//    • Zero eval, zero dynamic imports, zero user code.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝



// ------------------------------------------------------------
// CONTEXT — v30 IMMORTAL INTEL ONEBAND
// ------------------------------------------------------------
const ROUTER_EVOLUTION_CONTEXT_V30 = {
  version: "v30-IMMORTAL-INTEL++-OneBand",
  identity: "PulseRouterEvolutionaryInstincts-v30-IMMORTAL-INTEL++-OneBand",
  layer: "routing_evolution",
  role: "router_evolutionary_instincts_core",
  bandModel: "ONEBAND-unified",
  notes: [
    "symbolic+binary+presence+cache+cosmos+band",
    "deterministic-evolutionary-memory",
    "advantageField-v4-unified"
  ]
};


// ------------------------------------------------------------
// HASH / INTEL HELPERS — v30 IMMORTAL INTEL
// ------------------------------------------------------------
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
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  const combined = computeHash(`${intelHash}::${classicHash}`);
  return {
    intel: intelHash,
    classic: classicHash,
    combined
  };
}


// ------------------------------------------------------------
// COSMOS + BAND HELPERS — v30 IMMORTAL ONEBAND
// ------------------------------------------------------------
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root",
    worldId: cosmos.worldId || "w:primary",
    shardId: cosmos.shardId || "s:0"
  };
}

function normalizeBand(band = {}) {
  return {
    bandId: band.bandId || band.id || "band:default",
    bandTier: band.bandTier || "tier:main",
    bandRole: band.bandRole || "router-band",
    bandSessionId: band.bandSessionId || null
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}|${cosmos.worldId}|${cosmos.shardId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx30-${h.toString(16)}`;
}

function bandSignature(band) {
  const raw = `${band.bandId}|${band.bandTier}|${band.bandRole}|${band.bandSessionId || "NO_SESSION"}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `bx30-${h.toString(16)}`;
}


// ------------------------------------------------------------
// Utility: stable JSON stringify
// ------------------------------------------------------------
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


// ------------------------------------------------------------
// Utility: deterministic hash (32‑bit hex)
// ------------------------------------------------------------
function simpleHash32(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0) >>> 0;
}

function simpleHash(str) {
  return simpleHash32(str).toString(16);
}


// ------------------------------------------------------------
// IntelDualHash + TriHash — v30 Route Fingerprints
// ------------------------------------------------------------
function intelDualHash(shape) {
  const raw = stableStringify(shape || {});
  const mid = Math.floor(raw.length / 2);

  const left = raw.slice(0, mid);
  const right = raw.slice(mid);

  const h1 = simpleHash32(left);
  const h2 = simpleHash32(right);

  const hi = (BigInt(h1) << 32n) | BigInt(h2);
  const lo = BigInt(simpleHash32(raw));

  const combined = (hi ^ (lo << 1n)) & ((1n << 96n) - 1n);

  const hiHex = hi.toString(16);
  const loHex = combined.toString(16);

  return {
    primary: `idh30-${hiHex}`,
    secondary: `idh30s-${loHex}`,
    hi,
    lo
  };
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


// ------------------------------------------------------------
// Symbolic ancestry helpers
// ------------------------------------------------------------
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

  return simpleHash(stableStringify(shape));
}


// ------------------------------------------------------------
// Binary ancestry helpers (optional)
// ------------------------------------------------------------
function extractBinarySurface(payload = {}) {
  const binaryPattern = payload.binaryPattern || null;
  const binaryMode = payload.binaryMode || null;
  const binaryPayload = payload.binaryPayload || null;
  const binaryHints = payload.binaryHints || null;
  const binaryStrength =
    typeof payload.binaryStrength === "number"
      ? payload.binaryStrength
      : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength
  };
}


// ------------------------------------------------------------
// Presence / multi‑presence helpers
// ------------------------------------------------------------
function extractPresenceSurface(payload = {}) {
  const instanceId = payload.instanceId || null;
  const presenceId = payload.presenceId || null;
  const presenceRole = payload.presenceRole || null;
  const presenceGroupId = payload.presenceGroupId || null;
  const regionId = payload.regionId || null;
  const hostName = payload.hostName || null;

  const hasPresence =
    !!instanceId ||
    !!presenceId ||
    !!presenceRole ||
    !!presenceGroupId ||
    !!regionId ||
    !!hostName;

  return {
    hasPresence,
    instanceId,
    presenceId,
    presenceRole,
    presenceGroupId,
    regionId,
    hostName
  };
}


// ------------------------------------------------------------
// CacheChunk / prewarm helpers
// ------------------------------------------------------------
function extractCacheChunkSurface(payload = {}) {
  const cacheChunkId = payload.cacheChunkId || null;
  const cacheTier = payload.cacheTier || null;
  const prewarmKey = payload.prewarmKey || null;
  const prewarmHint = payload.prewarmHint || null;
  const cacheStrategy = payload.cacheStrategy || null;
  const advantageField = payload.advantageField || null;

  const hasCacheChunk =
    !!cacheChunkId ||
    !!cacheTier ||
    !!prewarmKey ||
    !!prewarmHint ||
    !!cacheStrategy ||
    advantageField !== null;

  return {
    hasCacheChunk,
    cacheChunkId,
    cacheTier,
    prewarmKey,
    prewarmHint,
    cacheStrategy,
    advantageField
  };
}


// ------------------------------------------------------------
// Band surface helpers — ONEBAND
// ------------------------------------------------------------
function extractBandSurface(payload = {}) {
  const bandId = payload.bandId || null;
  const bandTier = payload.bandTier || null;
  const bandRole = payload.bandRole || null;
  const bandSessionId = payload.bandSessionId || null;

  const hasBand =
    !!bandId ||
    !!bandTier ||
    !!bandRole ||
    !!bandSessionId;

  return {
    hasBand,
    bandId,
    bandTier,
    bandRole,
    bandSessionId
  };
}


// ------------------------------------------------------------
// Route hash — Genetic Route Fingerprint (Symbolic + Binary + Presence + Cache + Cosmos + Band)
// ------------------------------------------------------------
function computeRouteHash(routeShape, payload = {}, cosmos = {}, band = {}) {
  const binary = extractBinarySurface(payload);
  const presence = extractPresenceSurface(payload);
  const cache = extractCacheChunkSurface(payload);
  const bandSurface = extractBandSurface(payload);
  const cx = normalizeCosmos(cosmos);
  const bx = normalizeBand(band);

  const base = {
    routeShape,
    binary,
    presence,
    cache,
    band: bandSurface,
    cosmos: cx,
    bandContext: bx
  };

  return simpleHash(stableStringify(base));
}

function computeRouteDualHash(routeShape, payload = {}, cosmos = {}, band = {}) {
  const binary = extractBinarySurface(payload);
  const presence = extractPresenceSurface(payload);
  const cache = extractCacheChunkSurface(payload);
  const bandSurface = extractBandSurface(payload);
  const cx = normalizeCosmos(cosmos);
  const bx = normalizeBand(band);

  const base = {
    routeShape,
    binary,
    presence,
    cache,
    band: bandSurface,
    cosmos: cx,
    bandContext: bx
  };

  return intelDualHash(base);
}

function computeRouteTriHash(routeShape, payload = {}, cosmos = {}, band = {}) {
  const binary = extractBinarySurface(payload);
  const presence = extractPresenceSurface(payload);
  const cache = extractCacheChunkSurface(payload);
  const bandSurface = extractBandSurface(payload);
  const cx = normalizeCosmos(cosmos);
  const bx = normalizeBand(band);

  const base = {
    routeShape,
    binary,
    presence,
    cache,
    band: bandSurface,
    cosmos: cx,
    bandContext: bx
  };

  return triHash(base);
}


// ------------------------------------------------------------
// Route scoring — Evolutionary Fitness Score
// ------------------------------------------------------------
function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function scoreRoute(routeStats = {}) {
  const { successCount = 0, failureCount = 0, degradationEvents = 0 } =
    routeStats;

  const s = clamp(successCount, 0, 100000);
  const f = clamp(failureCount, 0, 100000);
  const d = clamp(degradationEvents, 0, 100000);

  return clamp(s * 1.0 - f * 0.8 - d * 0.5, 0, 100000);
}


// ------------------------------------------------------------
// Regression detection — Evolutionary Delta
// ------------------------------------------------------------
function detectRegression(currentStats, baselineStats) {
  const currentScore = scoreRoute(currentStats);
  const baselineScore = scoreRoute(baselineStats);
  if (baselineScore === 0) return 0;
  return ((currentScore - baselineScore) / baselineScore) * 100;
}


// ------------------------------------------------------------
// Degradation tier helper
// ------------------------------------------------------------
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.5) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}


// ------------------------------------------------------------
// Advantage field — unified instinct advantage v4 (ONEBAND-aware)
// ------------------------------------------------------------
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function computeInstinctAdvantageField({
  healthScore,
  routeScore,
  regressionDelta,
  binarySurface,
  presenceSurface,
  cacheSurface,
  bandSurface,
  cosmos,
  bandContext
}) {
  const h = typeof healthScore === "number" ? clamp01(healthScore) : 1.0;
  const rs =
    typeof routeScore === "number" ? clamp01(routeScore / 100000) : 0.5;

  const reg =
    typeof regressionDelta === "number"
      ? clamp01(1 - Math.max(-100, Math.min(100, regressionDelta)) / 200)
      : 0.8;

  const b = binarySurface && binarySurface.hasBinary ? 0.8 : 0.5;
  const p = presenceSurface && presenceSurface.hasPresence ? 0.8 : 0.5;
  const c = cacheSurface && cacheSurface.hasCacheChunk ? 0.8 : 0.5;
  const bandBoost = bandSurface && bandSurface.hasBand ? 0.9 : 0.6;

  const cx = normalizeCosmos(cosmos || {});
  const bx = normalizeBand(bandContext || {});
  const cosmosStability = cx.universeId === "u:default" ? 0.9 : 0.8;
  const bandStability = bx.bandId === "band:default" ? 0.85 : 0.9;

  const base = h * 0.30 + rs * 0.25 + reg * 0.2 + cosmosStability * 0.15 + bandStability * 0.10;
  const envBoost = (b + p + c + bandBoost) / 4;

  const adv = base * 0.75 + envBoost * 0.25;
  return clamp01(adv);
}


// ------------------------------------------------------------
// HEALING METADATA — Evolutionary Instincts Health Log (v30 IMMORTAL INTEL++)
// ------------------------------------------------------------
const instinctsHealing = {
  cycleCount: 0,

  lastKey: null,
  lastRouteScore: null,
  lastAdvantageField: null,
  lastTier: null,

  lastPattern: null,
  lastPageId: null,
  lastCosmosSignature: null,
  lastBandSignature: null,

  lastRouteDualHashPrimary: null,
  lastRouteDualHashSecondary: null,
  lastRouteTriHash: null,

  lastIntelSignatureIntel: null,
  lastIntelSignatureClassic: null
};

export function getPulseRouterEvolutionaryInstinctsHealingState() {
  return { ...instinctsHealing };
}


// ------------------------------------------------------------
// Memory entry model — Evolutionary Route Record (DualStack + Presence + Cache + Cosmos + Band)
// ------------------------------------------------------------
export const PulseRouterEvolutionaryStore = {
  entries: new Map(),
  meta: { ...ROUTER_EVOLUTION_CONTEXT_V30 },

  clear() {
    this.entries.clear();
  },

  recordRoute({
    routeShape,
    routeStats,
    healthScore,
    pattern,
    lineage,
    pageId,
    payload,
    cosmos,
    band
  }) {
    const cx = normalizeCosmos(cosmos || {});
    const bx = normalizeBand(band || {});
    const routeHash = computeRouteHash(routeShape, payload || {}, cx, bx);
    const routeDualHash = computeRouteDualHash(routeShape, payload || {}, cx, bx);
    const routeTriHash = computeRouteTriHash(routeShape, payload || {}, cx, bx);
    const score = scoreRoute(routeStats);

    const existing = this.entries.get(routeHash);

    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";
    const safeHealth = typeof healthScore === "number" ? healthScore : 1.0;
    const tier = classifyDegradationTier(safeHealth);

    const patternAncestry = buildPatternAncestry(safePattern);
    const lineageSignature = buildLineageSignature(safeLineage);
    const pageAncestrySignature = buildPageAncestrySignature({
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId,
      cosmos: cx
    });

    const binary = extractBinarySurface(payload || {});
    const presence = extractPresenceSurface(payload || {});
    const cache = extractCacheChunkSurface(payload || {});
    const bandSurface = extractBandSurface(payload || {});

    const loopTheory = {
      routingCompletion: true,
      allowLoopfieldPropulsion: true,
      pulseComputeContinuity: true,
      errorRouteAround: true
    };

    const baselineStats = existing ? existing.bestStats || {} : routeStats || {};
    const regressionDelta = detectRegression(routeStats || {}, baselineStats);

    const advantageField = computeInstinctAdvantageField({
      healthScore: safeHealth,
      routeScore: score,
      regressionDelta,
      binarySurface: binary,
      presenceSurface: presence,
      cacheSurface: cache,
      bandSurface,
      cosmos: cx,
      bandContext: bx
    });

    const intelPayload = {
      kind: "routerEvolutionaryInstinctsRouteRecord",
      version: ROUTER_EVOLUTION_CONTEXT_V30.version,
      routeShape,
      pattern: safePattern,
      pageId: safePageId,
      tier,
      score,
      regressionDelta,
      band: bandSurface,
      cosmosSignature: cosmosSignature(cx),
      bandSignature: bandSignature(bx)
    };

    const classicString =
      `ROUTE:${safePattern}` +
      `::PAGE:${safePageId}` +
      `::TIER:${tier}` +
      `::SCORE:${score}` +
      `::KEY:${routeHash}`;

    const dualSig = buildDualHashSignature(
      "PULSE_ROUTER_EVOLUTIONARY_INSTINCTS_v30",
      intelPayload,
      classicString
    );

    const baseEntry = {
      key: routeHash,
      routeShape: routeShape || {},
      bestStats: routeStats || {},
      bestScore: score,

      pattern: safePattern,
      patternAncestry,
      lineage: safeLineage,
      lineageSignature,
      pageId: safePageId,
      pageAncestrySignature,

      binary,
      presence,
      cache,
      band: bandSurface,

      cosmos: cx,
      cosmosSignature: cosmosSignature(cx),
      bandContext: bx,
      bandSignature: bandSignature(bx),

      healthScore: safeHealth,
      tier,
      advantageField,
      routeDualHash,
      routeTriHash,

      intelSignature: {
        intel: dualSig.intel,
        classic: dualSig.classic
      },

      loopTheory,
      meta: { ...ROUTER_EVOLUTION_CONTEXT_V30 }
    };

    if (!existing || score > existing.bestScore) {
      this.entries.set(routeHash, baseEntry);
    } else {
      const merged = {
        ...existing,

        routeShape: routeShape || existing.routeShape,
        bestStats: routeStats || existing.bestStats,
        bestScore: score > existing.bestScore ? score : existing.bestScore,

        pattern: safePattern || existing.pattern,
        patternAncestry: patternAncestry.length
          ? patternAncestry
          : existing.patternAncestry,

        lineage: safeLineage.length ? safeLineage : existing.lineage,
        lineageSignature: lineageSignature || existing.lineageSignature,

        pageId: safePageId || existing.pageId,
        pageAncestrySignature:
          pageAncestrySignature || existing.pageAncestrySignature,

        binary,
        presence,
        cache,
        band: bandSurface,

        cosmos: cx,
        cosmosSignature: cosmosSignature(cx),
        bandContext: bx,
        bandSignature: bandSignature(bx),

        healthScore: safeHealth,
        tier,
        advantageField,
        routeDualHash,
        routeTriHash,

        intelSignature: {
          intel: dualSig.intel,
          classic: dualSig.classic
        },

        loopTheory
      };

      this.entries.set(routeHash, merged);
    }

    const finalEntry = this.entries.get(routeHash);

    instinctsHealing.cycleCount++;
    instinctsHealing.lastKey = routeHash;
    instinctsHealing.lastRouteScore = finalEntry.bestScore;
    instinctsHealing.lastAdvantageField = finalEntry.advantageField;
    instinctsHealing.lastTier = finalEntry.tier;
    instinctsHealing.lastPattern = finalEntry.pattern;
    instinctsHealing.lastPageId = finalEntry.pageId;
    instinctsHealing.lastCosmosSignature = finalEntry.cosmosSignature;
    instinctsHealing.lastBandSignature = finalEntry.bandSignature;
    instinctsHealing.lastRouteDualHashPrimary = finalEntry.routeDualHash.primary;
    instinctsHealing.lastRouteDualHashSecondary =
      finalEntry.routeDualHash.secondary;
    instinctsHealing.lastRouteTriHash = finalEntry.routeTriHash.triPrimary;
    instinctsHealing.lastIntelSignatureIntel = finalEntry.intelSignature.intel;
    instinctsHealing.lastIntelSignatureClassic = finalEntry.intelSignature.classic;

    return finalEntry;
  },

  getBestRoute(routeShape, payload = {}, cosmos = {}, band = {}) {
    const cx = normalizeCosmos(cosmos || {});
    const bx = normalizeBand(band || {});
    const routeHash = computeRouteHash(routeShape, payload || {}, cx, bx);
    return this.entries.get(routeHash) || null;
  },

  getSnapshot() {
    const out = {};
    for (const [key, entry] of this.entries.entries()) {
      out[key] = {
        key: entry.key,
        routeShape: entry.routeShape,
        bestScore: entry.bestScore,
        bestStats: entry.bestStats,

        pattern: entry.pattern,
        patternAncestry: entry.patternAncestry.slice(),
        lineage: entry.lineage.slice(),
        lineageSignature: entry.lineageSignature,
        pageId: entry.pageId,
        pageAncestrySignature: entry.pageAncestrySignature,

        binary: { ...entry.binary },
        presence: { ...entry.presence },
        cache: { ...entry.cache },
        band: { ...entry.band },

        cosmos: { ...entry.cosmos },
        cosmosSignature: entry.cosmosSignature,
        bandContext: { ...entry.bandContext },
        bandSignature: entry.bandSignature,

        healthScore: entry.healthScore,
        tier: entry.tier,
        advantageField: entry.advantageField,
        routeDualHash: entry.routeDualHash,
        routeTriHash: entry.routeTriHash,
        intelSignature: { ...entry.intelSignature },

        loopTheory: { ...entry.loopTheory }
      };
    }
    return out;
  },

  serialize() {
    return JSON.stringify([...this.entries.values()]);
  },

  deserialize(jsonString) {
    this.entries.clear();
    if (!jsonString) return;

    let arr;
    try {
      arr = JSON.parse(jsonString);
    } catch {
      return;
    }

    if (!Array.isArray(arr)) return;

    arr.forEach((entry) => {
      if (!entry || typeof entry !== "object" || !entry.key) return;

      const cx = normalizeCosmos(entry.cosmos || {});
      const bx = normalizeBand(entry.bandContext || {});
      const safePattern = typeof entry.pattern === "string" ? entry.pattern : "";
      const safeLineage = Array.isArray(entry.lineage)
        ? entry.lineage.slice()
        : [];
      const safePageId = entry.pageId || "NO_PAGE";

      const patternAncestry = Array.isArray(entry.patternAncestry)
        ? entry.patternAncestry.slice()
        : buildPatternAncestry(safePattern);

      const lineageSignature =
        typeof entry.lineageSignature === "string"
          ? entry.lineageSignature
          : buildLineageSignature(safeLineage);

      const pageAncestrySignature =
        typeof entry.pageAncestrySignature === "string"
          ? entry.pageAncestrySignature
          : buildPageAncestrySignature({
              pattern: safePattern,
              lineage: safeLineage,
              pageId: safePageId,
              cosmos: cx
            });

      const binary =
        entry.binary && typeof entry.binary === "object"
          ? entry.binary
          : extractBinarySurface({});

      const presence =
        entry.presence && typeof entry.presence === "object"
          ? entry.presence
          : extractPresenceSurface({});

      const cache =
        entry.cache && typeof entry.cache === "object"
          ? entry.cache
          : extractCacheChunkSurface({});

      const bandSurface =
        entry.band && typeof entry.band === "object"
          ? entry.band
          : extractBandSurface({});

      const healthScore =
        typeof entry.healthScore === "number" ? entry.healthScore : 1.0;

      const bestStats = entry.bestStats || {};
      const bestScore =
        typeof entry.bestScore === "number" ? entry.bestScore : 0;

      const regressionDelta = 0;

      const advantageField =
        typeof entry.advantageField === "number"
          ? clamp01(entry.advantageField)
          : computeInstinctAdvantageField({
              healthScore,
              routeScore: bestScore,
              regressionDelta,
              binarySurface: binary,
              presenceSurface: presence,
              cacheSurface: cache,
              bandSurface,
              cosmos: cx,
              bandContext: bx
            });

      const routeDualHash =
        entry.routeDualHash ||
        computeRouteDualHash(entry.routeShape || {}, entry.payload || {}, cx, bx);

      const routeTriHash =
        entry.routeTriHash ||
        computeRouteTriHash(entry.routeShape || {}, entry.payload || {}, cx, bx);

      const intelPayload = {
        kind: "routerEvolutionaryInstinctsRouteRecordDeserialize",
        version: ROUTER_EVOLUTION_CONTEXT_V30.version,
        routeShape: entry.routeShape || {},
        pattern: safePattern,
        pageId: safePageId,
        band: bandSurface,
        cosmosSignature: cosmosSignature(cx),
        bandSignature: bandSignature(bx)
      };

      const classicString =
        `DESER:${safePattern}` +
        `::PAGE:${safePageId}` +
        `::KEY:${entry.key}`;

      const dualSig = buildDualHashSignature(
        "PULSE_ROUTER_EVOLUTIONARY_INSTINCTS_v30_DESER",
        intelPayload,
        classicString
      );

      const safeEntry = {
        key: entry.key,
        routeShape: entry.routeShape || {},
        bestStats,
        bestScore,

        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,

        binary,
        presence,
        cache,
        band: bandSurface,

        cosmos: cx,
        cosmosSignature: cosmosSignature(cx),
        bandContext: bx,
        bandSignature: bandSignature(bx),

        healthScore,
        tier: classifyDegradationTier(healthScore),
        advantageField,
        routeDualHash,
        routeTriHash,

        intelSignature: {
          intel: dualSig.intel,
          classic: dualSig.classic
        },

        loopTheory: {
          routingCompletion: true,
          allowLoopfieldPropulsion: true,
          pulseComputeContinuity: true,
          errorRouteAround: true
        },

        meta: { ...ROUTER_EVOLUTION_CONTEXT_V30 }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
};



// ------------------------------------------------------------
// Public API wrapper — Evolution Core Surface v30 IMMORTAL ONEBAND
// ------------------------------------------------------------
export const PulseRouterEvolutionaryInstincts = {
  store: PulseRouterEvolutionaryStore,
  meta: { ...ROUTER_EVOLUTION_CONTEXT_V30 },

  recordRoute(route) {
    return this.store.recordRoute(route);
  },

  getBestRoute(routeShape, payload, cosmos, band) {
    return this.store.getBestRoute(routeShape, payload, cosmos, band);
  },

  detectRegression(currentStats, baselineStats) {
    return detectRegression(currentStats, baselineStats);
  },

  scoreRoute(stats) {
    return scoreRoute(stats);
  },

  getSnapshot() {
    return this.store.getSnapshot();
  },

  serialize() {
    return this.store.serialize();
  },

  deserialize(jsonString) {
    this.store.deserialize(jsonString);
  },

  clear() {
    this.store.clear();
  },

  getMeta() {
    return { ...this.meta };
  },

  getHealingState() {
    return getPulseRouterEvolutionaryInstinctsHealingState();
  }
};


// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {

  // Hash / scoring / advantage
  computeRouteHash,
  computeRouteDualHash,
  computeRouteTriHash,
  scoreRoute,
  detectRegression,
  classifyDegradationTier,
  computeInstinctAdvantageField,

  // Ancestry / surfaces / cosmos / band
  buildPatternAncestry,
  buildLineageSignature,
  buildPageAncestrySignature,
  extractBinarySurface,
  extractPresenceSurface,
  extractCacheChunkSurface,
  extractBandSurface,
  normalizeCosmos,
  normalizeBand,
  cosmosSignature,
  bandSignature,

  // Hash helpers
  intelDualHash,
  triHash,

  // Context / healing
  ROUTER_EVOLUTION_CONTEXT_V30
};

PulseRealm.EvolutionaryInstincts = {
  PulseRouterEvolutionaryStore,
  PulseRouterEvolutionaryInstincts,
  getPulseRouterEvolutionaryInstinctsHealingState,
  // Hash / scoring / advantage
  computeRouteHash,
  computeRouteDualHash,
  computeRouteTriHash,
  scoreRoute,
  detectRegression,
  classifyDegradationTier,
  computeInstinctAdvantageField,

  // Ancestry / surfaces / cosmos / band
  buildPatternAncestry,
  buildLineageSignature,
  buildPageAncestrySignature,
  extractBinarySurface,
  extractPresenceSurface,
  extractCacheChunkSurface,
  extractBandSurface,
  normalizeCosmos,
  normalizeBand,
  cosmosSignature,
  bandSignature,

  // Hash helpers
  intelDualHash,
  triHash,

  // Context / healing
  ROUTER_EVOLUTION_CONTEXT_V30
}