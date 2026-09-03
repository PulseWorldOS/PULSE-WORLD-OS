// ============================================================================
//  PULSE OS — INNER‑PLUS ORGAN
//  FILE: PULSE-TOUCH-ADVANTAGE-v32-IMMORTAL-ONE-BAND-BINARY.js
//  ORGAN: pulseTouchAdvantageCortexV32
//  v32: One‑Band, Binary‑First, Storage‑Aligned, Predictor/Oracle‑Aware,
//       ProtocolPort/World‑Runtime‑Aware (alignment with Power v32 / Port v2)
//  PURE SYNC • NO NETWORK • DETERMINISTIC • DROP‑IN UPGRADE FROM v30++
// ============================================================================

import { PulseTouchStorageV32 } from "./PULSE-UNIVERSAL-TOUCH-STORAGE.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// Optional: world/membrane awareness (aligned with ProtocolPort v2 / Power v32)
// This is intentionally soft and non‑breaking.
let PulseProtocolPort = null;
try {
  // If present, we use it; if not, organ still works exactly like v30.
  PulseProtocolPort =
    (PulseRealm.PulseProtocolPort) || null;
} catch {}

// ============================================================================
//  EXPERIENCE META — v32 ONE‑BAND / BINARY‑FIRST / WORLD‑AWARE
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchAdvantage_V32 = {
  id: "pulsetouch.advantage.v32",
  kind: "inner_plus",
  version: "v32-IMMORTAL-ONE-BAND-BINARY",
  role: "advantage_cortex",
  band: "touch", // single canonical band for this organ
  surfaces: {
    band: [
      "advantage",
      "hydration",
      "animation",
      "chunk",
      "routing",
      "prewarm",
      "memory",
      "signal",
      "presence",
      "genome",
      "module",
      "binary",
      "storage",
      "one_band",
      "world_runtime",
      "continuance",
      "binary_field"
    ],
    wave: ["quiet", "adaptive"],
    presence: [
      "advantage_state",
      "routing_state",
      "memory_state",
      "binary_state",
      "module_state",
      "world_state"
    ],
    speed: "sync"
  },
  evo: {
    binaryAware: true,
    pulseBinaryAware: true,
    storageAware: true,
    oneBandAware: true,
    predictorAware: true,
    oracleAware: true,
    moduleRiskAware: true,
    worldRuntimeAware: true,
    continuanceAware: true,
    binaryFieldAware: true
  }
};

// ============================================================================
//  ORGAN META — v32 IMMORTAL
// ============================================================================

export const ORGAN_META_PulseTouchAdvantage_V32 = {
  id: "organ.pulsetouch.advantage.v32",
  organism: "PulseTouch",
  layer: "inner_plus.advantage.v32",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    hydrationAware: true,
    animationAware: true,
    chunkAware: true,
    presenceAware: true,
    analyticsAware: true,
    routingAware: true,
    memoryAware: true,
    prewarmAware: true,
    signalAware: true,
    genomeAware: true,

    // v27++
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,

    // v27++ BINARY
    binaryAware: true,
    pulseBinaryAware: true,

    // v27++ STORAGE
    storageAware: true,
    indexedDBAware: true,

    // v30 ONE‑BAND
    oneBandAware: true,
    bandFieldUnified: true,

    // v32 WORLD‑AWARE
    worldRuntimeAware: true,
    continuanceAware: true,
    binaryFieldAware: true
  }
};

// ============================================================================
//  ORGAN CONTRACT — v32 (compatible superset of v30++)
// ============================================================================

export const ORGAN_CONTRACT_PulseTouchAdvantage_V32 = {
  inputs: {
    analytics: "Object: { page, metrics, advantageHints } from PulseTouchAnalytics",
    predictor: "PulseTouchPredictor prediction (optional)",
    oracle: "PulsePresenceOracle evaluation (optional)",
    worldState: "Optional: { world, runtimeState, binaryField } from ProtocolPort/Power"
  },
  outputs: {
    hydrationBias: "none | minimal | safe | full",
    animationBias: "none | reduced | smooth",
    chunkBias: "safe | aggressive",
    binaryBias: "cold | normal | hot | critical",
    advantageScore: "0–1 numeric score",
    nextPage: "predicted next page",
    nextAssets: "string[] assets to preload",
    routeConfidence: "0–1 numeric confidence",
    history: "string[] of visited pages (local, capped)",
    snapshot: "optional page snapshot for current page",
    chunkPlan: "chunk plan for current + next page",
    prewarmPlan: "prewarm plan (assets + chunks)",
    binaryPlan: "binary lanes + assets to keep hot/prewarm",
    signalHints: "PulseSignal hints",
    genomeHints: "PulseGenome hints",
    modulePlan: "module‑aware plan (biases + stability)",
    band: "canonical band label for this organ (always 'touch')",

    // v27++ STORAGE
    storageFrameKey: "binary key used for last advantage frame (optional)",

    // v32 WORLD‑AWARE (non‑breaking, optional)
    worldRuntimeHints: "Optional: shallow hints from runtimeState (tick, logicalClock, bandUsage)",
    worldContinuanceHints: "Optional: continuance‑related hints (navState, presence)",
    worldBinaryHints: "Optional: binary‑field‑related hints (if provided by caller)"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchAdvantage_V32 = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
//  INTERNAL STATE — LOCAL ROUTE + PAGE MEMORY (IMMORTAL++ SAFE)
// ============================================================================

const MAX_HISTORY = 64;

function createAdvantageStateV32() {
  return {
    history: [],
    pages: {},
    lastStorageKey: null
  };
}

// ============================================================================
//  CHUNK PROFILES — v32 (inherits v30 semantics)
// ============================================================================

const CHUNK_PROFILES_V32 = {
  index: {
    safe: ["hero", "nav", "aboveFold"],
    aggressive: ["hero", "nav", "aboveFold", "belowFold", "secondary"]
  },
  PulseWorldReality: {
    safe: ["hero", "nav", "aboveFold"],
    aggressive: ["hero", "nav", "aboveFold", "belowFold", "secondary"]
  },
  PulseWorldInventory: {
    safe: ["summary", "nav", "aboveFold"],
    aggressive: ["summary", "nav", "aboveFold", "charts", "activity"]
  },
  PulseWorldScanner: {
    safe: ["scannerShell", "nav"],
    aggressive: ["scannerShell", "nav", "results", "history"]
  },
  PulseWorldRewards: {
    safe: ["rewardsShell", "nav"],
    aggressive: ["rewardsShell", "nav", "cards", "history"]
  },
  PulseWorldSkills: {
    safe: ["profileShell", "nav"],
    aggressive: ["profileShell", "nav", "settings", "history"]
  }
};

function getChunkProfileForPageV32(page, chunkBias) {
  const key = page || "index";
  const profile = CHUNK_PROFILES_V32[key] || CHUNK_PROFILES_V32.index;
  return chunkBias === "aggressive" ? profile.aggressive : profile.safe;
}

// ============================================================================
//  BINARY PROFILES — v32 BINARY‑FIRST (inherits v30 semantics)
// ============================================================================

const BINARY_PROFILES_V32 = {
  index: {
    cold: [],
    normal: ["index-shell.bin"],
    hot: ["index-shell.bin", "index-hero.bin"],
    critical: ["index-shell.bin", "index-hero.bin", "index-aboveFold.bin"]
  },
  PulseWorldInventory: {
    cold: [],
    normal: ["dashboard-shell.bin"],
    hot: ["dashboard-shell.bin", "dashboard-summary.bin"],
    critical: ["dashboard-shell.bin", "dashboard-summary.bin", "dashboard-charts.bin"]
  },
  PulseWorldScanner: {
    cold: [],
    normal: ["scanner-shell.bin"],
    hot: ["scanner-shell.bin", "scanner-engine.bin"],
    critical: ["scanner-shell.bin", "scanner-engine.bin", "scanner-history.bin"]
  },
  PulseWorldRewards: {
    cold: [],
    normal: ["rewards-shell.bin"],
    hot: ["rewards-shell.bin", "rewards-cards.bin"],
    critical: ["rewards-shell.bin", "rewards-cards.bin", "rewards-history.bin"]
  },
  PulseWorldSkills: {
    cold: [],
    normal: ["profile-shell.bin"],
    hot: ["profile-shell.bin", "profile-settings.bin"],
    critical: ["profile-shell.bin", "profile-settings.bin", "profile-history.bin"]
  }
};

function getBinaryProfileForPageV32(page, binaryBias) {
  const key = page || "index";
  const profile = BINARY_PROFILES_V32[key] || BINARY_PROFILES_V32.index;
  const lane = binaryBias || "normal";
  return profile[lane] || profile.normal;
}

// ============================================================================
//  ROUTING LOGIC — v32 (Predictor‑first, history‑aware fallback)
//  (same semantics as v30, kept deterministic)
// ============================================================================

function computeRoutingV32(state, analytics, predictor) {
  const currentPage = analytics.page || "index";

  // Predictor → next page
  const predictorNext = predictor.prediction.nextPage || null;
  let nextPage = predictorNext || currentPage;

  // Fallback deterministic route chain
  if (!predictorNext) {
    const routes = [
      "PulseWorldReality",
      "PulseWorldSkills",
      "PulseWorldTrustLink",
      "PulseEvolutionaryPage",
      "PulseWorldReferralCode",
      "PulseWorldScanner",
      "PulseWorldVault",
      "PulseWorldBank",
      "PulseWorldInventory",
      "PulseAIDashboard",
      "PulseAwareDashboard",
      "PulseBandDashboard",
      "PulseEarnDashboard",
      "PulseGPUDashboard",
      "PulseOSDashboard",
      "PulseOSDiagnostics",
      "PulseOSImmunities",
      "PulseWorldDomain"
    ];

    const idx = routes.indexOf(currentPage);
    nextPage = idx >= 0 && idx < routes.length - 1 ? routes[idx + 1] : currentPage;
  }

  // ------------------------------------------------------------
  //  DIRECTORY‑AWARE PREFIX LOGIC (v30+ ONE‑BAND) — preserved
  // ------------------------------------------------------------

  const directoryMap = {
    // ROOT LEVEL
    index: "./",

    // PULSE
    PulseWorldSkills: "./PULSEConfig/",
    PulseWorldBarrier: "./PULSEConfig/",
    PulseWorldTrustLink: "./PULSEConfig/",
    PulseEvolutionaryPage: "./PULSEConfig/",
    PulseWorldInventory: "./PULSEConfig/",

    // PULSE REWARDS
    PulseWorldReferralCode: "./PULSEConfig/",
    PulseWorldScanner: "./PULSEConfig/",
    PulseWorldVault: "./PULSEConfig/",
    PulseWorldRewards: "./PULSEConfig/",

    // PULSE ADMIN
    PulseAIDashboard: "./PULSEAdmin/",
    PulseAwareDashboard: "./PULSEAdmin/",
    PulseBandDashboard: "./PULSEAdmin/",
    PulseEarnDashboard: "./PULSEAdmin/",
    PulseGPUDashboard: "./PULSEAdmin/",
    PulseOSDashboard: "./PULSEAdmin/",
    PulseOSDiagnostics: "./PULSEAdmin/",
    PulseOSImmunities: "./PULSEAdmin/",
    PulseWorldDomain: "./PULSEAdmin/"
  };

  // Default fallback if page not in map
  const prefix = directoryMap[currentPage] || "./PULSEConfig/";

  const nextAssets = [
    `${prefix}${nextPage}.html`,
    `./_EXPRESSIONS/_PEX/BUILD/${nextPage}-bg.png`,
    `./_EXPRESSIONS/_PEX/BUILD/${nextPage}-icon.png`
  ];

  // Confidence
  const routeConfidence =
    predictor.confidence != null
      ? predictor.confidence
      : state.history.length > 1
      ? 0.9
      : 0.7;

  return { nextPage, nextAssets, routeConfidence };
}

// ============================================================================
//  CHUNK PLAN + PREWARM PLAN — v32 (same semantics)
// ============================================================================

function computeChunkPlanV32(page, nextPage, chunkBias) {
  const currentPageChunks = getChunkProfileForPageV32(page, chunkBias);
  const nextPageChunks = getChunkProfileForPageV32(nextPage, chunkBias);

  return {
    currentPageChunks,
    nextPageChunks
  };
}

function computePrewarmPlanV32(nextAssets, nextPageChunks) {
  return {
    assets: nextAssets.slice(),
    chunks: nextPageChunks.slice()
  };
}

// ============================================================================
//  BINARY PLAN — v32 BINARY‑FIRST (same semantics)
// ============================================================================

function computeBinaryBiasV32(metrics = {}, advantageHints = {}, oracle = null) {
  const hintBias = advantageHints.binaryBias;
  if (
    hintBias === "cold" ||
    hintBias === "normal" ||
    hintBias === "hot" ||
    hintBias === "critical"
  ) {
    return hintBias;
  }

  const m = metrics.binary || {};
  const load = typeof m.load === "number" ? m.load : null;
  const errorRate = typeof m.errorRate === "number" ? m.errorRate : null;

  if (oracle.binaryRiskView.riskBand === "high") return "critical";
  if (oracle.binaryRiskView.riskBand === "medium") return "hot";

  if (errorRate != null && errorRate > 0.2) return "cold";
  if (load == null) return "normal";
  if (load >= 0.9) return "critical";
  if (load >= 0.6) return "hot";
  if (load >= 0.3) return "normal";
  return "cold";
}

function computeBinaryPlanV32(page, nextPage, binaryBias) {
  const currentPageBinary = getBinaryProfileForPageV32(page, binaryBias);
  const nextPageBinary = getBinaryProfileForPageV32(nextPage, binaryBias);

  return {
    binaryBias,
    currentPageBinary,
    nextPageBinary
  };
}

// ============================================================================
//  SIGNAL + GENOME HINTS — v32 (same semantics)
// ============================================================================

function getSignalHintsV32() {
  try {
    if (PulseRealm.PulseSignals) {
      return PulseRealm.PulseSignals.snapshot() || {};
    };
  } catch {
    return {};
  }
}

function getGenomeHintsV32() {
  try {
    if (PulseRealm.PulseGenome) {
      return PulseRealm.PulseGenome.snapshot() || {};
    }
  } catch {}
  return {};
}

// ============================================================================
//  MODULE PLAN — v32 (same semantics, explicit one‑band context)
// ============================================================================

function computeModulePlanV32(analytics, predictor, oracle) {
  const moduleBiasFromAnalytics = analytics.advantageHints.moduleBias || "unknown";
  const moduleBiasFromOracle = oracle.oracleHints.moduleBias || "unknown";

  const stabilityScore =
    predictor.modulePrediction.stabilityScore ??
    analytics.metrics.module.stabilityScore ??
    null;

  const hasMissingSubimports =
    predictor.modulePrediction.hasMissingSubimports ??
    analytics.metrics.module.hasMissingSubimports ??
    null;

  const hasWrongTierExports =
    predictor.modulePrediction.hasWrongTierExports ??
    analytics.metrics.module.hasWrongTierExports ??
    null;

  const hasGlobalExposureRisk =
    predictor.modulePrediction.hasGlobalExposureRisk ??
    analytics.metrics.module.hasGlobalExposureRisk ??
    null;

  const hasChunkProfileAnomaly =
    predictor.modulePrediction.hasChunkProfileAnomaly ??
    analytics.metrics.module.hasChunkProfileAnomaly ??
    null;

  const moduleBias =
    moduleBiasFromOracle !== "unknown"
      ? moduleBiasFromOracle
      : moduleBiasFromAnalytics;

  return {
    moduleBias,
    stabilityScore,
    hasMissingSubimports,
    hasWrongTierExports,
    hasGlobalExposureRisk,
    hasChunkProfileAnomaly
  };
}

// ============================================================================
//  STORAGE INTEGRATION — PULSE‑TOUCH STORAGE (BINARY INDEXEDDB) v32
//  (same semantics as v30, but version tag in key updated)
// ============================================================================

function encodeAdvantageFrameKeyV32(page, ts) {
  const keyStr = `adv32:${page || "index"}:${ts}`;
  return new TextEncoder().encode(keyStr);
}

function encodeAdvantageFrameValueV32(frame) {
  const {
    page,
    advantageScore,
    hydrationBias,
    animationBias,
    chunkBias,
    binaryBias,
    nextPage,
    routeConfidence,
    modulePlan,
    band
  } = frame;

  const valueStr = [
    page || "index",
    advantageScore.toFixed(3),
    hydrationBias,
    animationBias,
    chunkBias,
    binaryBias,
    nextPage || "index",
    routeConfidence.toFixed(3),
    modulePlan.moduleBias || "unknown",
    band || "touch"
  ].join("|");

  return new TextEncoder().encode(valueStr);
}

function writeAdvantageFrameToStorageV32(page, frame) {
  try {
    const storageOrgan = PulseTouchStorageV32();
    if (!storageOrgan || typeof storageOrgan.put !== "function") return null;

    const ts = PulseRealm.PulseNOW;
    const key = encodeAdvantageFrameKeyV32(page, ts);
    const value = encodeAdvantageFrameValueV32({ page, ...frame });

    // Fire‑and‑forget to keep compute() sync by contract
    void (async () => {
      try {
        await storageOrgan.put("analytics", key, value);
      } catch {
        // silent by contract
      }
    })();

    return key;
  } catch {
    return null;
  }
}

// ============================================================================
//  WORLD‑AWARE HELPERS — v32 (optional, non‑breaking)
// ============================================================================

function extractWorldHintsV32(worldState) {
  if (!worldState || typeof worldState !== "object") {
    return {
      worldRuntimeHints: null,
      worldContinuanceHints: null,
      worldBinaryHints: null
    };
  }

  const runtimeState = worldState.runtimeState || null;
  const binaryField = worldState.binaryField || null;

  const worldRuntimeHints = runtimeState
    ? {
        tick: runtimeState.tick ?? null,
        logicalClock: runtimeState.logicalClock ?? null,
        bandUsage: runtimeState.bandUsage ?? null
      }
    : null;

  const worldContinuanceHints = runtimeState
    ? {
        navState:
          runtimeState.planSummary.navState ??
          runtimeState.execResults.navState ??
          null,
        cacheHits: runtimeState.cacheHits ?? null,
        cacheMisses: runtimeState.cacheMisses ?? null
      }
    : null;

  const worldBinaryHints = binaryField
    ? {
        pageId: binaryField.pageId ?? null,
        route: binaryField.route ?? null,
        lanes: binaryField.lanes ?? null
      }
    : null;

  return {
    worldRuntimeHints,
    worldContinuanceHints,
    worldBinaryHints
  };
}

// ============================================================================
//  FACTORY — ADVANTAGE + ROUTING + MEMORY + CHUNK + PREWARM + MODULE + BINARY
//            + BINARY INDEXEDDB STORAGE + ONE‑BAND + WORLD‑AWARE v32
// ============================================================================

export function pulseTouchAdvantageCortexV32() {
  const state = createAdvantageStateV32();
  const BAND = "touch";

  function recordPageVisit(page) {
    if (!page) return;
    state.history.push(page);
    if (state.history.length > MAX_HISTORY) state.history.shift();
  }

  function storePageSnapshot(page, data) {
    if (!page) return;
    state.pages[page] = { data, ts: PulseRealm.PulseNOW };
  }

  function getPageSnapshot(page) {
    return state.pages[page] || null;
  }

  // analyticsInput: { page, metrics, advantageHints }
  // predictor: optional
  // oracle: optional
  // worldState: optional (from ProtocolPort/Power/membrane)
  function compute(analyticsInput, predictor = null, oracle = null, worldState = null) {
    const page = analyticsInput.page || "index";
    const metrics = analyticsInput.metrics || {};
    const advantageHints = analyticsInput.advantageHints || {};

    recordPageVisit(page);

    let hydrationBias = advantageHints.hydrationBias || "safe";
    let animationBias = advantageHints.animationBias || "smooth";
    let chunkBias = advantageHints.chunkBias || "safe";

    if (predictor.prediction.nextMode === "fast") {
      chunkBias = "aggressive";
    }

    if (oracle.presenceIntensity === "high") {
      hydrationBias = "full";
    } else if (oracle.presenceIntensity === "low") {
      hydrationBias = "minimal";
    }

    if (oracle.stability === "unstable") {
      animationBias = "reduced";
    }

    const modulePlan = computeModulePlanV32(
      { metrics, advantageHints },
      predictor,
      oracle
    );

    if (modulePlan.moduleBias === "critical" || modulePlan.moduleBias === "unstable") {
      chunkBias = "safe";
      hydrationBias = hydrationBias === "full" ? "safe" : hydrationBias;
      animationBias = "reduced";
    }

    const binaryBias = computeBinaryBiasV32(metrics, advantageHints, oracle);

    const hydrationScore =
      hydrationBias === "full"
        ? 0.4
        : hydrationBias === "safe"
        ? 0.3
        : hydrationBias === "minimal"
        ? 0.2
        : 0.1;

    const animationScore =
      animationBias === "smooth"
        ? 0.3
        : animationBias === "reduced"
        ? 0.2
        : 0.1;

    const chunkScore = chunkBias === "aggressive" ? 0.3 : 0.2;

    const binaryScore =
      binaryBias === "critical"
        ? 0.3
        : binaryBias === "hot"
        ? 0.25
        : binaryBias === "normal"
        ? 0.2
        : 0.1;

    const advantageScoreRaw =
      hydrationScore + animationScore + chunkScore + binaryScore;
    const advantageScore = Math.min(1, Math.max(0, advantageScoreRaw));

    const routing = computeRoutingV32(state, { page }, predictor);

    const chunkPlan = computeChunkPlanV32(page, routing.nextPage, chunkBias);

    const prewarmPlan = computePrewarmPlanV32(
      routing.nextAssets,
      chunkPlan.nextPageChunks
    );

    const binaryPlan = computeBinaryPlanV32(page, routing.nextPage, binaryBias);

    const signalHints = getSignalHintsV32();
    const genomeHints = getGenomeHintsV32();

    const snapshot = getPageSnapshot(page);

    const frame = {
      hydrationBias,
      animationBias,
      chunkBias,
      binaryBias,
      advantageScore,
      nextPage: routing.nextPage,
      routeConfidence: routing.routeConfidence,
      modulePlan,
      band: BAND
    };

    const storageFrameKey = writeAdvantageFrameToStorageV32(page, frame);
    state.lastStorageKey = storageFrameKey || state.lastStorageKey;

    // WORLD‑AWARE HINTS (optional, non‑breaking)
    const worldHints = extractWorldHintsV32(worldState);

    return {
      hydrationBias,
      animationBias,
      chunkBias,
      binaryBias,
      advantageScore,
      nextPage: routing.nextPage,
      nextAssets: routing.nextAssets,
      routeConfidence: routing.routeConfidence,
      history: state.history.slice(),
      snapshot,
      chunkPlan,
      prewarmPlan,
      binaryPlan,
      signalHints,
      genomeHints,
      modulePlan,
      band: BAND,
      storageFrameKey,
      worldRuntimeHints: worldHints.worldRuntimeHints,
      worldContinuanceHints: worldHints.worldContinuanceHints,
      worldBinaryHints: worldHints.worldBinaryHints
    };
  }

  return {
    meta: ORGAN_META_PulseTouchAdvantage_V32,
    contract: ORGAN_CONTRACT_PulseTouchAdvantage_V32,
    overlays: IMMORTAL_OVERLAYS_PulseTouchAdvantage_V32,
    compute,
    snapshot: storePageSnapshot
  };
}

PulseRealm.TouchAdvantage = {
  pulseTouchAdvantageCortexV32,
  ORGAN_META_PulseTouchAdvantage_V32,
  ORGAN_CONTRACT_PulseTouchAdvantage_V32,
  IMMORTAL_OVERLAYS_PulseTouchAdvantage_V32,
  BINARY_PROFILES_V32
}