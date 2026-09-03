// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-GPU/PulseGPUSurvivalInstincts-v30+.js
// PULSE GPU SURVIVAL INSTINCTS v30+-Immortal-Evo-Core+++ — THE EVOLUTION CORE
// Adaptive Identity Layer • Genetic Memory • Best‑Self Preservation Engine
// Prewarm‑Aware • Chunk‑Aware • Cache‑Aware • Presence‑Aware • Earn‑Field‑Aware
// Warm‑Path‑Aware • Cold‑Path‑Safe • Multi‑Instance‑Aware • Advantage‑Field‑30+
// CI‑Aware • Advantage‑Score‑Aware • Nervous‑System‑v30‑Aware • One‑Band‑Aware
// Orchestrator‑Aware • Guardian‑Aware • Earn‑Job‑Aware
// ============================================================================
//
// SAFETY CONTRACT (v30+-Immortal-Evo-Core+++):
//  ------------------------------------------
//  • No randomness
//  • No timestamps
//  • No GPU calls
//  • No DOM
//  • No Node APIs
//  • No network or filesystem access
//  • Fail-open: malformed metrics/settings → safe defaults
//  • Self-repair-ready: entries include OS / organism metadata
//  • Deterministic: same inputs → same evolutionary memory
//  • Legacy-safe: v10.4/v11/v12.3/v16/v24 callers still behave identically
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// v30+: imports so SurvivalInstincts is wired into the v30+ organism
import { PulseGPUSessionTracer_v31 as PulseGPUSessionTracer } from "./PulseGPUNervousSystem-v30.js";
import { PulseGPUHealer } from "./PulseGPULymphNodes-v30.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v30.js";
import { SCORE_CONSTANTS } from "./PulseGPUCommandments-v30.js";
import { PulseGPUOrchestrator } from "./PulseGPUSpine-v30.js";
import { PulseGPUGuardianCortex } from "./PulseGPUGuardianCortex-v30.js";
import { evolveEarnSend as evolveEarn, createEarnSend as createEarn } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// v30+: context metadata (kept external in original system)
export const SURVIVAL_CONTEXT = {
  layer: "PulseGPUSurvivalInstincts",
  role: "EVOLUTION_CORE",
  version: "30.1-Immortal-Evo-Core+++",
  target: "full-gpu",
  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseSend30Ready: true,

    // Immortal Presence
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    // GPU awareness
    binaryAware: true,
    symbolicAware: true,
    dualBandAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,

    // Nervous system + CI
    nervousSystemAware: true,
    cognitiveFrameAware: true,
    computerIntelligenceAware: true,
    advantageScoreAware: true,

    // Earn / game awareness
    earnAware: true,
    gameAware: true,

    // One-band nervous system + orchestrator
    oneBandAware: true,
    nervousSystemV30Aware: true,
    orchestratorAware: true,
    guardianAware: true,
    earnJobAware: true,

    routingContract: "PulseSend-v30",
    gpuOrganContract: "PulseGPU-v30-Immortal++",
    binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal++",
    earnCompatibility: "Earn-v30-GPU"
  }
};

// ------------------------------------------------------------
// Utility: stable JSON stringify for hashing
// ------------------------------------------------------------
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }

  const keys = Object.keys(value).sort();
  const parts = keys.map(
    (k) => JSON.stringify(k) + ":" + stableStringify(value[k])
  );
  return "{" + parts.join(",") + "}";
}

// ------------------------------------------------------------
// Utility: simple deterministic hash
// ------------------------------------------------------------
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}

// ------------------------------------------------------------
// Settings hash — Genetic Fingerprint
// ------------------------------------------------------------
function computeSettingsHash(settings) {
  const serialized = stableStringify(settings || {});
  return simpleHash(serialized);
}

// ------------------------------------------------------------
// Advantage snapshot hash — Advantage Fingerprint (v30+)
// ------------------------------------------------------------
function computeAdvantageSnapshotHash(advantageSnapshot) {
  if (!advantageSnapshot || typeof advantageSnapshot !== "object") {
    return "";
  }
  const serialized = stableStringify(advantageSnapshot);
  return simpleHash(serialized);
}

// ------------------------------------------------------------
// Earn Evolution Chain — evolveEarn → createEarn → system fallback
// ------------------------------------------------------------
function runEarnEvolution(settings, metrics, executionContext) {
  const safeSettings = settings || {};
  const ctx = executionContext || {};
  let evolvedSettings = safeSettings;
  let earnMeta = null;

  function isValidSettings(obj) {
    return obj && typeof obj === "object";
  }

  // 1) Try evolveEarn first (primary evolution driver)
  try {
    const result = evolveEarn(safeSettings, metrics || {}, ctx);
    if (result && typeof result === "object") {
      const { settings: newSettings, score, fingerprint, hints } = result;
      if (isValidSettings(newSettings)) {
        evolvedSettings = newSettings;
        earnMeta = {
          mode: "evolveEarn",
          score: typeof score === "number" ? score : 0,
          fingerprint: fingerprint || "",
          hints: hints || null
        };
        return { evolvedSettings, earnMeta };
      }
    }
  } catch {
    // fail-open
  }

  // 2) If evolveEarn fails, try createEarn (secondary evolution driver)
  try {
    const result = createEarn(safeSettings, metrics || {}, ctx);
    if (result && typeof result === "object") {
      const { settings: newSettings, score, fingerprint, hints } = result;
      if (isValidSettings(newSettings)) {
        evolvedSettings = newSettings;
        earnMeta = {
          mode: "createEarn",
          score: typeof score === "number" ? score : 0,
          fingerprint: fingerprint || "",
          hints: hints || null
        };
        return { evolvedSettings, earnMeta };
      }
    }
  } catch {
    // fail-open
  }

  // 3) If both Earn paths fail → system evolution only
  return {
    evolvedSettings: safeSettings,
    earnMeta: null
  };
}

// ------------------------------------------------------------
// Session scoring — Evolutionary Fitness Score
// v10.4/v11 base + v12.3/v16 dual-band + pressure
// + v24 prewarm/chunk/cache/presence/earn/warm-path/cold-path shaping
// + v30 advantageScore/CI-pressure shaping
// + v30+ one-band / advantage-field / earn-job shaping
// ------------------------------------------------------------

function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

// Base v10.4/v11-compatible score (FPS + stutters + crash)
function baseScoreSession(metrics = {}) {
  if (!metrics || typeof metrics !== "object") return 0;

  const {
    avgFPS,
    minFPS,
    stutterCount,
    crashFlag = false
  } = metrics;

  const avg = typeof metrics.avgFps === "number" ? metrics.avgFps : avgFPS || 0;
  const min = typeof metrics.minFps === "number" ? metrics.minFps : minFPS || 0;
  const stutters =
    typeof metrics.stutters === "number" ? metrics.stutters : stutterCount || 0;

  const safeAvg = clamp(avg, 0, SCORE_CONSTANTS.MAX_FPS);
  const safeMin = clamp(min, 0, SCORE_CONSTANTS.MAX_FPS);
  const safeStutters = clamp(stutters, 0, SCORE_CONSTANTS.MAX_STUTTERS);

  const avgScore = safeAvg / SCORE_CONSTANTS.MAX_FPS;
  const minScore = safeMin / SCORE_CONSTANTS.MAX_FPS;
  const stutterPenalty = safeStutters / SCORE_CONSTANTS.MAX_STUTTERS;

  let score =
    SCORE_CONSTANTS.AVG_FPS_WEIGHT * avgScore +
    SCORE_CONSTANTS.MIN_FPS_WEIGHT * minScore -
    SCORE_CONSTANTS.STUTTER_WEIGHT * stutterPenalty;

  if (crashFlag) score -= SCORE_CONSTANTS.CRASH_PENALTY;

  return clamp(score, 0, 1);
}

// Extract mode + pressure stats from trace / traceSummary / pressureSnapshot
function extractModeAndPressureStats({
  trace,
  traceSummary,
  pressureSnapshot,
  binaryMode
} = {}) {
  let binaryStepCount = 0;
  let symbolicStepCount = 0;

  if (traceSummary && typeof traceSummary === "object") {
    if (typeof traceSummary.binaryStepCount === "number") {
      binaryStepCount = clamp(traceSummary.binaryStepCount, 0, 1_000_000);
    }
    if (typeof traceSummary.symbolicStepCount === "number") {
      symbolicStepCount = clamp(traceSummary.symbolicStepCount, 0, 1_000_000);
    }
  } else if (Array.isArray(trace)) {
    trace.forEach((step) => {
      if (!step || typeof step !== "object") return;
      if (step.binaryModeObserved) binaryStepCount += 1;
      if (step.symbolicModeObserved) symbolicStepCount += 1;
    });
  }

  const totalSteps = binaryStepCount + symbolicStepCount;
  const binaryRatio = totalSteps > 0 ? binaryStepCount / totalSteps : 0;
  const symbolicRatio = totalSteps > 0 ? symbolicStepCount / totalSteps : 0;

  const p =
    pressureSnapshot ||
    (traceSummary && traceSummary.pressureSnapshot) ||
    null;

  let gpuLoadPressure = 0;
  let thermalPressure = 0;
  let memoryPressure = 0;
  let meshStormPressure = 0;
  let auraTension = 0;

  if (p && typeof p === "object") {
    gpuLoadPressure = clamp(p.gpuLoadPressure ?? 0, 0, 1);
    thermalPressure = clamp(p.thermalPressure ?? gpuLoadPressure, 0, 1);
    memoryPressure = clamp(p.memoryPressure ?? 0, 0, 1);
    meshStormPressure = clamp(p.meshStormPressure ?? 0, 0, 1);
    auraTension = clamp(p.auraTension ?? 0, 0, 1);
  }

  const pressureScore =
    (gpuLoadPressure +
      thermalPressure +
      memoryPressure +
      meshStormPressure +
      auraTension) / 5;

  return {
    binaryStepCount,
    symbolicStepCount,
    binaryRatio,
    symbolicRatio,
    pressureScore,
    binaryMode: binaryMode || "auto"
  };
}

// v24: prewarm / chunk / cache / presence / earn / warm-path / cold-path shaping factors
// v30: extended with advantageScore + ciPressure shaping
// v30+: extended with one-band / advantage-field / earn-job shaping
function extractAdvantageShapingFromMetrics(metrics = {}) {
  const prewarmCoverage =
    typeof metrics.prewarmCoverage === "number"
      ? clamp(metrics.prewarmCoverage, 0, 1)
      : 0;

  const chunkWarmthScore =
    typeof metrics.chunkWarmthScore === "number"
      ? clamp(metrics.chunkWarmthScore, 0, 1)
      : 0;

  const cacheHitRatio =
    typeof metrics.cacheHitRatio === "number"
      ? clamp(metrics.cacheHitRatio, 0, 1)
      : 0;

  const presenceUptimeRatio =
    typeof metrics.presenceUptimeRatio === "number"
      ? clamp(metrics.presenceUptimeRatio, 0, 1)
      : 0;

  const earnYieldScore =
    typeof metrics.earnYieldScore === "number"
      ? clamp(metrics.earnYieldScore, 0, 1)
      : 0;

  const warmPathHitRatio =
    typeof metrics.warmPathHitRatio === "number"
      ? clamp(metrics.warmPathHitRatio, 0, 1)
      : 0;

  const coldPathPenaltyRatio =
    typeof metrics.coldPathPenaltyRatio === "number"
      ? clamp(metrics.coldPathPenaltyRatio, 0, 1)
      : 0;

  const prewarmStepRatio =
    typeof metrics.prewarmStepRatio === "number"
      ? clamp(metrics.prewarmStepRatio, 0, 1)
      : 0;

  const cacheMissPenaltyRatio =
    typeof metrics.cacheMissPenaltyRatio === "number"
      ? clamp(metrics.cacheMissPenaltyRatio, 0, 1)
      : 0;

  const multiInstanceUtilization =
    typeof metrics.multiInstanceUtilization === "number"
      ? clamp(metrics.multiInstanceUtilization, 0, 1)
      : 0;

  // v30: advantageScore + CI pressure (normalized)
  const advantageScore =
    typeof metrics.advantageScore === "number"
      ? clamp(metrics.advantageScore, 0, 1)
      : 0;

  const ciPressure =
    typeof metrics.ciPressure === "number"
      ? clamp(metrics.ciPressure, 0, 1)
      : 0;

  // v30+: earn job + one-band shaping (optional, safe defaults)
  const earnJobAdvantage =
    typeof metrics.earnJobAdvantage === "number"
      ? clamp(metrics.earnJobAdvantage, 0, 1)
      : 0;

  const oneBandCoherence =
    typeof metrics.oneBandCoherence === "number"
      ? clamp(metrics.oneBandCoherence, 0, 1)
      : 0;

  return {
    prewarmCoverage,
    chunkWarmthScore,
    cacheHitRatio,
    presenceUptimeRatio,
    earnYieldScore,
    warmPathHitRatio,
    coldPathPenaltyRatio,
    prewarmStepRatio,
    cacheMissPenaltyRatio,
    multiInstanceUtilization,
    advantageScore,
    ciPressure,
    earnJobAdvantage,
    oneBandCoherence
  };
}

// v12.3/v16 score: base FPS score + dual-band + pressure shaping
// v24: extended with prewarm/chunk/cache/presence/earn/warm-path/cold-path/multi-instance shaping
// v30: extended with advantageScore + ciPressure shaping
// v30+: extended with advantage-field / earn-job / one-band coherence shaping
function scoreSession(metrics = {}, options = {}) {
  const baseScore = baseScoreSession(metrics);

  const {
    trace,
    traceSummary,
    pressureSnapshot,
    binaryMode
  } = options || {};

  const modeStats = extractModeAndPressureStats({
    trace,
    traceSummary,
    pressureSnapshot,
    binaryMode
  });

  const { binaryRatio, symbolicRatio, pressureScore } = modeStats;

  const dualBalance = 1 - Math.abs(binaryRatio - symbolicRatio);
  const dualBonus = 0.05 * dualBalance;

  const binaryBiasBonus =
    binaryMode === "binary" ? 0.05 * binaryRatio : 0;

  const pressurePenalty = 0.15 * pressureScore;

  const {
    prewarmCoverage,
    chunkWarmthScore,
    cacheHitRatio,
    presenceUptimeRatio,
    earnYieldScore,
    warmPathHitRatio,
    coldPathPenaltyRatio,
    prewarmStepRatio,
    cacheMissPenaltyRatio,
    multiInstanceUtilization,
    advantageScore,
    ciPressure,
    earnJobAdvantage,
    oneBandCoherence
  } = extractAdvantageShapingFromMetrics(metrics);

  const prewarmBonus = 0.04 * prewarmCoverage;
  const chunkBonus = 0.04 * chunkWarmthScore;
  const cacheBonus = 0.04 * cacheHitRatio;
  const presenceBonus = 0.03 * presenceUptimeRatio;
  const earnBonus = 0.05 * earnYieldScore;

  const warmPathBonus = 0.04 * warmPathHitRatio;
  const coldPathPenalty = 0.04 * coldPathPenaltyRatio;
  const prewarmStepBonus = 0.03 * prewarmStepRatio;
  const cacheMissPenalty = 0.03 * cacheMissPenaltyRatio;
  const multiInstanceBonus = 0.03 * multiInstanceUtilization;

  // v30: advantage + CI shaping
  const advantageBonus = 0.06 * advantageScore;
  const ciPressurePenalty = 0.05 * ciPressure;

  // v30+: earn job + one-band coherence shaping
  const earnJobBonus = 0.04 * earnJobAdvantage;
  const oneBandBonus = 0.03 * oneBandCoherence;

  let score =
    baseScore +
    dualBonus +
    binaryBiasBonus -
    pressurePenalty +
    prewarmBonus +
    chunkBonus +
    cacheBonus +
    presenceBonus +
    earnBonus +
    warmPathBonus +
    prewarmStepBonus +
    multiInstanceBonus +
    advantageBonus +
    earnJobBonus +
    oneBandBonus -
    coldPathPenalty -
    cacheMissPenalty -
    ciPressurePenalty;

  return clamp(score, 0, 1);
}

// ------------------------------------------------------------
// Regression detection — Evolutionary Delta (mode/pressure/advantage-aware)
// ------------------------------------------------------------
function detectRegression(currentMetrics, baselineMetrics, options = {}) {
  const currentScore = scoreSession(currentMetrics, options.current || {});
  const baselineScore = scoreSession(baselineMetrics, options.baseline || {});

  if (baselineScore === 0) return 0;

  const delta = (currentScore - baselineScore) / baselineScore;
  return delta * 100;
}

// ------------------------------------------------------------
// Key building helpers — Genetic Indexing (v12.3 execution-aware)
// ------------------------------------------------------------
function buildGameKey(gameProfile = {}) {
  const { gameId = "unknown", buildVersion = "", contentHash = "" } =
    gameProfile;
  return stableStringify({ gameId, buildVersion, contentHash });
}

function buildHardwareKey(hardwareProfile = {}) {
  const {
    gpuModel = "unknown",
    driverVersion = "",
    vramMB = 0,
    cpuModel = "",
    ramMB = 0
  } = hardwareProfile;

  return stableStringify({
    gpuModel,
    driverVersion,
    vramMB,
    cpuModel,
    ramMB
  });
}

function buildTierKey(tierProfile = {}) {
  const { tierId = "default" } = tierProfile;
  return stableStringify({ tierId });
}

// Execution context fingerprint (aligned with GeneticMemory / SessionTracer)
// Extended with presenceMode + bandHint for presence‑aware / one‑band indexing.
function buildExecutionContextKey(executionContext = null) {
  if (!executionContext || typeof executionContext !== "object") {
    return stableStringify(null);
  }

  const {
    binaryMode = "auto",
    pipelineId = "",
    sceneType = "",
    workloadClass = "",
    resolution = "",
    refreshRate = 0,
    dispatchSignature = "",
    shapeSignature = "",
    presenceMode = "",
    bandHint = "one-band"
  } = executionContext;

  return stableStringify({
    binaryMode,
    pipelineId,
    sceneType,
    workloadClass,
    resolution,
    refreshRate,
    dispatchSignature,
    shapeSignature,
    presenceMode,
    bandHint
  });
}

// v30+ composite key: game + hardware + tier + settings + mode + execution + advantage + earn + nervous-system band
function buildCompositeKey(
  gameProfile,
  hardwareProfile,
  tierProfile,
  settingsHash,
  binaryMode,
  executionContext,
  advantageSnapshotHash,
  earnFingerprint
) {
  const gameKey = buildGameKey(gameProfile);
  const hwKey = buildHardwareKey(hardwareProfile);
  const tierKey = buildTierKey(tierProfile || {});
  const execKey = buildExecutionContextKey(executionContext || null);

  const base = stableStringify({
    gameKey,
    hwKey,
    tierKey,
    settingsHash,
    binaryMode: binaryMode || "auto",
    executionContext: execKey,
    advantageSnapshotHash: advantageSnapshotHash || "",
    earnFingerprint: earnFingerprint || ""
  });

  return simpleHash(base);
}

// ------------------------------------------------------------
// Memory entry model — Evolutionary Record (v30+ Immortal)
// ------------------------------------------------------------
export const PulseGPUSurvivalInstinctsStore = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const lane = {
    entries: new Map(),
    meta: { ...SURVIVAL_CONTEXT }
  };

  // ------------------------------------------------------------
  // CLEAR
  // ------------------------------------------------------------
  const clear = () => {
    lane.entries.clear();
  };

  // ------------------------------------------------------------
  // RECORD SESSION (IMMORTAL v30+)
  // ------------------------------------------------------------
  const recordSession = (o = {}) => {

    const {
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      trace,
      traceSummary,
      pressureSnapshot,
      binaryMode = "auto",
      executionContext = null,
      advantageSnapshot = null,
      geneticMemoryEntry = null,
      guardianDecision = null,
      earnJob = null,
      earnDecision = null,
      nervousSystemMeta = null,
      orchestratorMeta = null
    } = o;

    // Earn evolution
    const { evolvedSettings, earnMeta } = runEarnEvolution(
      settings,
      metrics,
      executionContext
    );

    const settingsHash = computeSettingsHash(evolvedSettings);
    const advantageSnapshotHash = computeAdvantageSnapshotHash(advantageSnapshot);

    const earnFingerprint =
      earnMeta && typeof earnMeta.fingerprint === "string"
        ? earnMeta.fingerprint
        : "";

    const key = buildCompositeKey(
      gameProfile,
      hardwareProfile,
      tierProfile,
      settingsHash,
      binaryMode,
      executionContext,
      advantageSnapshotHash,
      earnFingerprint
    );

    const modeStats = extractModeAndPressureStats({
      trace,
      traceSummary,
      pressureSnapshot,
      binaryMode
    });

    const metricsForScoring = {
      ...(metrics || {}),
      earnYieldScore: earnMeta.score ?? metrics.earnYieldScore ?? 0,
      earnEvolutionScore: earnMeta.score ?? 0,
      advantageScore:
        typeof metrics.advantageScore === "number"
          ? metrics.advantageScore
          : advantageSnapshot.advantageScore ?? 0,
      ciPressure:
        typeof metrics.ciPressure === "number"
          ? metrics.ciPressure
          : advantageSnapshot.ciPressure ?? 0,
      earnJobAdvantage:
        typeof metrics.earnJobAdvantage === "number"
          ? metrics.earnJobAdvantage
          : earnDecision.advantageScore ?? 0,
      oneBandCoherence:
        typeof metrics.oneBandCoherence === "number"
          ? metrics.oneBandCoherence
          : executionContext.bandHint === "one-band"
          ? 1
          : 0
    };

    const score = scoreSession(metricsForScoring, {
      trace,
      traceSummary,
      pressureSnapshot,
      binaryMode
    });

    const existing = lane.entries.get(key);

    if (!existing || score > existing.bestScore) {
      const entry = {
        key,
        gameProfile: gameProfile || {},
        hardwareProfile: hardwareProfile || {},
        tierProfile: tierProfile || {},
        settingsHash,
        settings: evolvedSettings || settings || {},
        bestMetrics: metrics || {},
        bestScore: score,
        bestTrace: Array.isArray(trace) ? trace.slice() : null,
        traceSummary: traceSummary || null,
        binaryMode,
        executionContext: executionContext || null,
        modeStats,
        pressureScore: modeStats.pressureScore,
        advantageSnapshot: advantageSnapshot || null,
        advantageSnapshotHash,
        earnMeta: earnMeta || null,
        earnFingerprint,
        geneticMemoryEntry: geneticMemoryEntry || null,
        guardianDecision: guardianDecision || null,
        earnJob: earnJob || null,
        earnDecision: earnDecision || null,
        nervousSystemMeta: nervousSystemMeta || null,
        orchestratorMeta: orchestratorMeta || null,
        meta: { ...SURVIVAL_CONTEXT }
      };

      lane.entries.set(key, entry);
    }

    return lane.entries.get(key);
  };

  // ------------------------------------------------------------
  // GET BEST SETTINGS FOR (Earn-aware, advantage-aware)
  // ------------------------------------------------------------
  const getBestSettingsFor = (
    gameProfile,
    hardwareProfile,
    tierProfile,
    opts = {}
  ) => {
    const gameKey = buildGameKey(gameProfile);
    const hwKey = buildHardwareKey(hardwareProfile);
    const tierKey = tierProfile ? buildTierKey(tierProfile) : null;
    const preferredBinaryMode = opts.binaryMode || null;

    let bestEntry = null;

    for (const entry of lane.entries.values()) {
      if (buildGameKey(entry.gameProfile) !== gameKey) continue;
      if (buildHardwareKey(entry.hardwareProfile) !== hwKey) continue;
      if (tierKey && buildTierKey(entry.tierProfile) !== tierKey) continue;

      if (
        preferredBinaryMode &&
        entry.binaryMode &&
        entry.binaryMode !== preferredBinaryMode
      ) {
        continue;
      }

      if (!bestEntry) {
        bestEntry = entry;
        continue;
      }

      const aEarn = entry.earnMeta.score ?? 0;
      const bEarn = bestEntry.earnMeta.score ?? 0;

      if (aEarn > bEarn) {
        bestEntry = entry;
        continue;
      }

      const aAdv = entry.advantageSnapshot.advantageScore ?? 0;
      const bAdv = bestEntry.advantageSnapshot.advantageScore ?? 0;

      if (aEarn === bEarn && aAdv > bAdv) {
        bestEntry = entry;
        continue;
      }

      if (aEarn === bEarn && aAdv === bAdv && entry.bestScore > bestEntry.bestScore) {
        bestEntry = entry;
      }
    }

    return bestEntry;
  };

  // ------------------------------------------------------------
  // RECORD FROM ORCHESTRATOR OUTCOME
  // ------------------------------------------------------------
  const recordFromOrchestratorOutcome = (o = {}) => {
    const {
      orchestratorResult,
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      binaryMode = "auto",
      executionContext = null
    } = o;

    if (!orchestratorResult || typeof orchestratorResult !== "object") {
      return null;
    }

    const {
      geneticMemoryEntry,
      guardianDecision,
      earnJob,
      earnDecision,
      advantageSnapshot,
      traceSummary,
      pressureSnapshot
    } = orchestratorResult;

    return recordSession({
      gameProfile,
      hardwareProfile,
      tierProfile,
      settings,
      metrics,
      trace: null,
      traceSummary: traceSummary || null,
      pressureSnapshot: pressureSnapshot || null,
      binaryMode,
      executionContext,
      advantageSnapshot: advantageSnapshot || null,
      geneticMemoryEntry: geneticMemoryEntry || null,
      guardianDecision: guardianDecision || null,
      earnJob: earnJob || null,
      earnDecision: earnDecision || null,
      nervousSystemMeta: { band: "one-band" },
      orchestratorMeta: orchestratorResult.meta || null
    });
  };

  // ------------------------------------------------------------
  // SERIALIZE
  // ------------------------------------------------------------
  const serialize = () => JSON.stringify([...lane.entries.values()]);

  // ------------------------------------------------------------
  // DESERIALIZE
  // ------------------------------------------------------------
  const deserialize = (jsonString) => {
    lane.entries.clear();
    if (!jsonString) return;

    let arr;
    try { arr = JSON.parse(jsonString); } catch { return; }
    if (!Array.isArray(arr)) return;

    arr.forEach((entry) => {
      if (!entry || typeof entry !== "object" || !entry.key) return;

      const modeStats = entry.modeStats || {};
      const pressureScore =
        typeof entry.pressureScore === "number"
          ? clamp(entry.pressureScore, 0, 1)
          : 0;

      const safeEntry = {
        key: entry.key,
        gameProfile: entry.gameProfile || {},
        hardwareProfile: entry.hardwareProfile || {},
        tierProfile: entry.tierProfile || {},
        settingsHash: entry.settingsHash || "",
        settings: entry.settings || {},
        bestMetrics: entry.bestMetrics || {},
        bestScore:
          typeof entry.bestScore === "number" ? entry.bestScore : 0,
        bestTrace: Array.isArray(entry.bestTrace) ? entry.bestTrace : null,
        traceSummary: entry.traceSummary || null,
        binaryMode: entry.binaryMode || "auto",
        executionContext: entry.executionContext || null,
        modeStats: {
          binaryStepCount: modeStats.binaryStepCount || 0,
          symbolicStepCount: modeStats.symbolicStepCount || 0,
          binaryRatio: modeStats.binaryRatio || 0,
          symbolicRatio: modeStats.symbolicRatio || 0,
          pressureScore
        },
        pressureScore,
        advantageSnapshot: entry.advantageSnapshot || null,
        advantageSnapshotHash: entry.advantageSnapshotHash || "",
        earnMeta: entry.earnMeta || null,
        earnFingerprint: entry.earnFingerprint || "",
        geneticMemoryEntry: entry.geneticMemoryEntry || null,
        guardianDecision: entry.guardianDecision || null,
        earnJob: entry.earnJob || null,
        earnDecision: entry.earnDecision || null,
        nervousSystemMeta: entry.nervousSystemMeta || null,
        orchestratorMeta: entry.orchestratorMeta || null,
        meta: { ...SURVIVAL_CONTEXT }
      };

      lane.entries.set(safeEntry.key, safeEntry);
    });
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    clear,
    recordSession,
    getBestSettingsFor,
    recordFromOrchestratorOutcome,
    serialize,
    deserialize
  };

})();
export const PulseGPUSurvivalInstincts = (() => {

  // ------------------------------------------------------------
  // INTERNAL IMMORTAL LANE
  // ------------------------------------------------------------
  const store = PulseGPUSurvivalInstinctsStore; // already pseudo‑class
  const meta = { ...SURVIVAL_CONTEXT };

  // ------------------------------------------------------------
  // SURFACES (public API)
  // ------------------------------------------------------------
  const recordSession = (session = {}) =>
    store.recordSession(session);

  const recordFromOrchestratorOutcome = (payload = {}) =>
    store.recordFromOrchestratorOutcome(payload);

  const getBestSettingsFor = (
    gameProfile,
    hardwareProfile,
    tierProfile,
    opts = {}
  ) =>
    store.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      tierProfile,
      opts
    );

  const detectRegression = (currentMetrics, baselineMetrics, options = {}) =>
    detectRegression(currentMetrics, baselineMetrics, options);

  const scoreSession = (metrics = {}, options = {}) =>
    scoreSession(metrics, options);

  const serialize = () =>
    store.serialize();

  const deserialize = (jsonString) =>
    store.deserialize(jsonString);

  const clear = () =>
    store.clear();

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta,
    recordSession,
    recordFromOrchestratorOutcome,
    getBestSettingsFor,
    detectRegression,
    scoreSession,
    serialize,
    deserialize,
    clear
  };

})();

// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {
  computeSettingsHash,
  scoreSession,
  detectRegression,
  evolveEarn,
  createEarn
};

PulseRealm.GPUSurvivalInstincts = {
  computeSettingsHash,
  scoreSession,
  detectRegression,
  PulseGPUSurvivalInstincts,
  PulseGPUSurvivalInstinctsStore,
  SURVIVAL_CONTEXT
}