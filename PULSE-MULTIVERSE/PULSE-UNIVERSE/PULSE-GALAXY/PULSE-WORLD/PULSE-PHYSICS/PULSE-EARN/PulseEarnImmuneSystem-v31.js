// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-EARN/
//       PulseEarnImmuneSystem-v31-Immortal-INTEL-PLUSPLUS.js
// LAYER: THE IMMUNE SYSTEM (v31-Immortal-INTEL+++ + Dual-Band + Binary-First + Wave + Presence + INTEL + LANES)
// (Subsystem Doctor + Drift Diagnostician + Deterministic Repair Engine + Presence/INTEL Telemetry + Lane Routing)
// ============================================================================
//
// ROLE (v31-Immortal-INTEL+++):
//   THE IMMUNE SYSTEM — Pulse‑Earn’s subsystem physician, upgraded to 31++ INTEL.
//   • Reads vitals across all Earn subsystems (immune surveillance).
//   • Detects drift, errors, inconsistencies (pathogen detection).
//   • Prescribes deterministic repairs (immune response).
//   • Maintains subsystem health records (immune memory).
//   • Emits v31‑Immortal‑INTEL+++ signatures + diagnostics + presence/advantage/hints surfaces.
//   • Binary‑first immune surfaces, wave‑aware, presence‑aware, INTEL‑aware.
//   • Adds immuneComputeProfileV31 + immunePulseIntelligence surfaces (metadata‑only).
//   • Adds lane-aware binary/wave fields + chunk/cache/prewarm lane routing metadata.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
// CONTRACT (v31-Immortal-INTEL+++):
//   • PURE HEALING — no AI layers, no translation, no LLM inference.
//   • READ‑ONLY except deterministic repair actions.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO filesystem, NO timestamps, NO async.
//   • Deterministic drift detection only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
//   • Binary-first: binary field is the primary immune surface, wave is secondary.
//   • computeHashIntelligenceV31 is primary; computeHash is deterministic fallback.
//   • ImmunePulseIntelligence is metadata-only, no behavior change.
// ============================================================================



// ============================================================================
// Imports — subsystem vitals (healing state providers)
// ============================================================================

import { getEarnEngineHealingState } from "./PulseEarnMuscleSystem-v31.js";
import { getPulseEarnHeartHealingState_v31 as getPulseEarnHeartHealingState } from "./PulseEarnHeart-v31.js";
import { getPulseEarnMetabolismHealingState_v31 as getPulseEarnMetabolismHealingState } from "./PulseEarnMetabolism-v31.js";
import { getPulseEarnLymphHealingState_v31 as getPulseEarnLymphHealingState } from "./PulseEarnLymphNodes-v31.js";
import {
  getPulseEarnGeneticMemoryHealingState,
  synthesizePulseEarnGene,
  writePulseEarnGene
} from "./PulseEarnGeneticMemory-v31.js";

import { getPulseEarnNervousSystemHealingState_v31 as getPulseEarnNervousSystemHealingState } from "./PulseEarnNervousSystem-v31.js";
import { getRunPodHealingState } from "./MARKETS/PulseEarnMktBroker-v30.js";
import getPulseRuntimeContext from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import { healingState } from "./PulseEarnHeartbeat-v31.js";

// ============================================================================
// Immune State — medical chart (immune memory)
// ============================================================================





const MAX_LANES = 64;

const PULSE_EARN_IMMUNE_CONTEXT = {};

export const immuneState = {
  lastCheck: null,
  lastRepair: null,
  lastError: null,
  cycleCount: 0,
  status: "healthy", // healthy | warning | error | repairing
  lastReport: null,
  lastCycleIndex: null,

  lastImmuneSignature: null,
  lastDriftSignature: null,
  lastRepairSignature: null,

  // Dual-Band + Binary + Wave
  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  // Presence / Advantage / Hints / Profiles
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastImmunePressureProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastImmuneComputeProfile: null,

  // v31++: immune compute + pulse intelligence + lanes
  lastImmuneComputeProfileV31: null,
  lastImmunePulseIntelligence: null,

  lastLane: 0,
  lastLaneProfile: null,
  lastBinaryLaneField: null,
  lastWaveLaneField: null,
  lastChunkPlan: null,
  lastCachePlan: null,
  lastPrewarmPlan: null,

  ...PULSE_EARN_IMMUNE_CONTEXT
};

// Deterministic immune cycle counter
let immuneCycle = 0;

// ============================================================================
// Deterministic Hash Helpers (v31++ INTEL-first)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligenceV31(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 11)) % 1000000007;
  }
  return `HINTEL31_${h}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Signature Builders (INTEL-first, classic as fallback)
// ============================================================================

function buildImmuneSignature(cycle, band, pressureTier, errorCount, lane) {
  try {
    return computeHashIntelligenceV31({
      organ: "PulseEarnImmuneSystem",
      cycle,
      band,
      pressureTier,
      errorCount,
      lane,
      version: "v31-Immortal-INTEL-PLUSPLUS"
    });
  } catch (_) {
    return computeHash(
      `IMMUNE::${cycle}::${band}::PTIER:${pressureTier}::ERRS:${errorCount}::LANE:${lane}`
    );
  }
}

function buildDriftSignature(report) {
  try {
    return computeHashIntelligenceV31({
      engineError: report.engine.lastError || "OK",
      runtimeError: report.runtime.lastError || "OK",
      workerError: report.worker.lastError || "OK",
      submissionError: report.submission.lastError || "OK",
      packetsError: report.packets.lastError || "OK",
      cellError: report.cell.lastError || "OK",
      connectorError: report.connector.lastError || "OK"
    });
  } catch (_) {
    return computeHash(
      `DRIFT::${report.engine.lastError || "OK"}::${report.worker.lastError || "OK"}`
    );
  }
}

function buildRepairSignature(key, cycle) {
  try {
    return computeHashIntelligenceV31({
      organ: "PulseEarnImmuneSystem",
      mode: "repair",
      key: key || "NONE",
      cycle
    });
  } catch (_) {
    return computeHash(`REPAIR::${key || "NONE"}::${cycle}`);
  }
}

// ============================================================================
// Presence / Advantage / Hints Surfaces (aggregated across subsystems + global)
// ============================================================================

function safePresenceFrom(subsystem) {
  return (
    subsystem.lastPresenceField ||
    subsystem.presenceField ||
    {}
  );
}

function safeAdvantageFrom(subsystem) {
  return (
    subsystem.lastAdvantageField ||
    subsystem.advantageField ||
    {}
  );
}

function safeHintsFrom(subsystem) {
  return (
    subsystem.lastHintsField ||
    subsystem.hintsField ||
    {}
  );
}

function buildPresenceField(report, globalHints = {}) {
  const engineP = safePresenceFrom(report.engine);
  const runtimeP = safePresenceFrom(report.runtime);
  const workerP = safePresenceFrom(report.worker);
  const submissionP = safePresenceFrom(report.submission);
  const packetsP = safePresenceFrom(report.packets);
  const cellP = safePresenceFrom(report.cell);
  const connectorP = safePresenceFrom(report.connector);

  const gh = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshPressureIndex =
    engineP.meshPressureIndex ||
    runtimeP.meshPressureIndex ||
    workerP.meshPressureIndex ||
    submissionP.meshPressureIndex ||
    packetsP.meshPressureIndex ||
    cellP.meshPressureIndex ||
    connectorP.meshPressureIndex ||
    mesh.meshPressureIndex ||
    0;

  const castleLoadLevel =
    engineP.castleLoadLevel ||
    runtimeP.castleLoadLevel ||
    workerP.castleLoadLevel ||
    submissionP.castleLoadLevel ||
    packetsP.castleLoadLevel ||
    cellP.castleLoadLevel ||
    connectorP.castleLoadLevel ||
    castle.loadLevel ||
    0;

  const meshStrength =
    engineP.meshStrength ||
    runtimeP.meshStrength ||
    workerP.meshStrength ||
    submissionP.meshStrength ||
    packetsP.meshStrength ||
    cellP.meshStrength ||
    connectorP.meshStrength ||
    mesh.meshStrength ||
    0;

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 180) presenceTier = "critical";
  else if (pressure >= 120) presenceTier = "high";
  else if (pressure >= 60) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const presenceSignature = computeHashIntelligenceV31({
    version: "v31-Immortal-INTEL-PLUSPLUS",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel
  });

  return {
    presenceVersion: "v31-Immortal-INTEL-PLUSPLUS",
    presenceTier,
    presenceSignature,

    bandPresence:
      engineP.bandPresence ||
      runtimeP.bandPresence ||
      workerP.bandPresence ||
      submissionP.bandPresence ||
      packetsP.bandPresence ||
      cellP.bandPresence ||
      connectorP.bandPresence ||
      gh.bandPresence ||
      "unknown",
    routerPresence:
      engineP.routerPresence ||
      runtimeP.routerPresence ||
      workerP.routerPresence ||
      submissionP.routerPresence ||
      packetsP.routerPresence ||
      cellP.routerPresence ||
      connectorP.routerPresence ||
      gh.routerPresence ||
      "unknown",
    devicePresence:
      engineP.devicePresence ||
      runtimeP.devicePresence ||
      workerP.devicePresence ||
      submissionP.devicePresence ||
      packetsP.devicePresence ||
      cellP.devicePresence ||
      connectorP.devicePresence ||
      gh.devicePresence ||
      "unknown",
    meshPresence:
      engineP.meshPresence ||
      runtimeP.meshPresence ||
      workerP.meshPresence ||
      submissionP.meshPresence ||
      packetsP.meshPresence ||
      cellP.meshPresence ||
      connectorP.meshPresence ||
      mesh.meshStrength ||
      "unknown",
    castlePresence:
      engineP.castlePresence ||
      runtimeP.castlePresence ||
      workerP.castlePresence ||
      submissionP.castlePresence ||
      packetsP.castlePresence ||
      cellP.castlePresence ||
      connectorP.castlePresence ||
      castle.castlePresence ||
      "unknown",
    regionPresence:
      engineP.regionPresence ||
      runtimeP.regionPresence ||
      workerP.regionPresence ||
      submissionP.regionPresence ||
      packetsP.regionPresence ||
      cellP.regionPresence ||
      connectorP.regionPresence ||
      region.regionTag ||
      "unknown",
    regionId:
      engineP.regionId ||
      runtimeP.regionId ||
      workerP.regionId ||
      submissionP.regionId ||
      packetsP.regionId ||
      cellP.regionId ||
      connectorP.regionId ||
      region.regionId ||
      "unknown-region",
    castleId:
      engineP.castleId ||
      runtimeP.castleId ||
      workerP.castleId ||
      submissionP.castleId ||
      packetsP.castleId ||
      cellP.castleId ||
      connectorP.castleId ||
      castle.castleId ||
      "unknown-castle",

    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function buildAdvantageField(report, globalHints = {}) {
  const engineA = safeAdvantageFrom(report.engine);
  const runtimeA = safeAdvantageFrom(report.runtime);
  const workerA = safeAdvantageFrom(report.worker);
  const submissionA = safeAdvantageFrom(report.submission);
  const packetsA = safeAdvantageFrom(report.packets);
  const cellA = safeAdvantageFrom(report.cell);
  const connectorA = safeAdvantageFrom(report.connector);
  const ghAdv = globalHints.advantageContext || {};

  return {
    advantageVersion: "C-31.0-IMMUNE-INTEL",
    advantageScore:
      engineA.advantageScore ??
      runtimeA.advantageScore ??
      workerA.advantageScore ??
      submissionA.advantageScore ??
      packetsA.advantageScore ??
      cellA.advantageScore ??
      connectorA.advantageScore ??
      ghAdv.score ??
      0,
    advantageBand:
      engineA.advantageBand ??
      runtimeA.advantageBand ??
      workerA.advantageBand ??
      submissionA.advantageBand ??
      packetsA.advantageBand ??
      cellA.advantageBand ??
      connectorA.advantageBand ??
      ghAdv.band ??
      "neutral",
    advantageTier:
      engineA.advantageTier ??
      runtimeA.advantageTier ??
      workerA.advantageTier ??
      submissionA.advantageTier ??
      packetsA.advantageTier ??
      cellA.advantageTier ??
      connectorA.advantageTier ??
      ghAdv.tier ??
      0
  };
}

function buildHintsField(report, globalHints = {}) {
  const engineH = safeHintsFrom(report.engine);
  const runtimeH = safeHintsFrom(report.runtime);
  const workerH = safeHintsFrom(report.worker);
  const submissionH = safeHintsFrom(report.submission);
  const packetsH = safeHintsFrom(report.packets);
  const cellH = safeHintsFrom(report.cell);
  const connectorH = safeHintsFrom(report.connector);

  const gh = {
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: globalHints.chunkHints || {},
    cacheHints: globalHints.cacheHints || {},
    prewarmHints: globalHints.prewarmHints || {},
    coldStartHints: globalHints.coldStartHints || {}
  };

  const mergedChunkHints = {
    ...gh.chunkHints,
    ...(engineH.chunkHints || {}),
    ...(runtimeH.chunkHints || {}),
    ...(workerH.chunkHints || {}),
    ...(submissionH.chunkHints || {}),
    ...(packetsH.chunkHints || {}),
    ...(cellH.chunkHints || {}),
    ...(connectorH.chunkHints || {})
  };

  const mergedCacheHints = {
    ...gh.cacheHints,
    ...(engineH.cacheHints || {}),
    ...(runtimeH.cacheHints || {}),
    ...(workerH.cacheHints || {}),
    ...(submissionH.cacheHints || {}),
    ...(packetsH.cacheHints || {}),
    ...(cellH.cacheHints || {}),
    ...(connectorH.cacheHints || {})
  };

  const mergedPrewarmHints = {
    ...gh.prewarmHints,
    ...(engineH.prewarmHints || {}),
    ...(runtimeH.prewarmHints || {}),
    ...(workerH.prewarmHints || {}),
    ...(submissionH.prewarmHints || {}),
    ...(packetsH.prewarmHints || {}),
    ...(cellH.prewarmHints || {}),
    ...(connectorH.prewarmHints || {})
  };

  const mergedColdStartHints = {
    ...gh.coldStartHints,
    ...(engineH.coldStartHints || {}),
    ...(runtimeH.coldStartHints || {}),
    ...(workerH.coldStartHints || {}),
    ...(submissionH.coldStartHints || {}),
    ...(packetsH.coldStartHints || {}),
    ...(cellH.coldStartHints || {}),
    ...(connectorH.coldStartHints || {})
  };

  const fallbackBandLevel =
    engineH.fallbackBandLevel ??
    runtimeH.fallbackBandLevel ??
    workerH.fallbackBandLevel ??
    submissionH.fallbackBandLevel ??
    packetsH.fallbackBandLevel ??
    cellH.fallbackBandLevel ??
    connectorH.fallbackBandLevel ??
    gh.fallbackBandLevel ??
    0;

  return {
    fallbackBandLevel,
    chunkHints: mergedChunkHints,
    cacheHints: mergedCacheHints,
    prewarmHints: mergedPrewarmHints,
    coldStartHints: mergedColdStartHints
  };
}

// ============================================================================
// Immune Compute Profile (baseline + v31++ extension)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildImmuneComputeProfile(derivedBand, hintsField) {
  const chunkAggression = hintsField.chunkHints.chunkAggression ?? 0;
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const coldStartRisk = !!hintsField.coldStartHints.coldStartRisk;

  return {
    routeBand: derivedBand,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression,
    prewarmNeeded,
    cachePriority,
    coldStartRisk
  };
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function deriveImmuneFactoringSignal({
  meshPressureIndex = 0,
  cachePriority = "normal",
  prewarmNeeded = false,
  coldStartRisk = false
}) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded || coldStartRisk) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildImmuneComputeProfileV31(derivedBand, hintsField, presenceField) {
  const base = buildImmuneComputeProfile(derivedBand, hintsField);
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveImmuneFactoringSignal({
    meshPressureIndex,
    cachePriority: base.cachePriority,
    prewarmNeeded: base.prewarmNeeded,
    coldStartRisk: base.coldStartRisk
  });

  return {
    computeProfileVersion: "IMMUNE-CP-V31++",
    routeBand: base.routeBand,
    fallbackBandLevel: base.fallbackBandLevel,
    chunkAggression: base.chunkAggression,
    prewarmNeeded: base.prewarmNeeded,
    cachePriority: base.cachePriority,
    coldStartRisk: base.coldStartRisk,
    factoringSignal,
    binaryPreferred: base.routeBand === "binary",
    symbolicPreferred: base.routeBand === "symbolic"
  };
}

// ============================================================================
// Pressure Tier Classification (diagnostic only, no perf baseline)
// ============================================================================

function classifyPressureTier(presenceField, errorCount) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle + errorCount * 20;

  if (pressure >= 180) return "critical";
  if (pressure >= 120) return "high";
  if (pressure >= 60) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Lane selection + lane surfaces
// ============================================================================

function chooseLane(pressureTier, advantageTier, errorCount) {
  const tierMap = {
    idle: 0,
    soft: 1,
    elevated: 2,
    high: 3,
    critical: 4
  };

  const pScore = tierMap[pressureTier] ?? 0;
  const aScore = Number(advantageTier || 0);
  const eScore = Math.min(errorCount, 8);

  const raw = pScore * 8 + aScore * 3 + eScore;
  return raw % MAX_LANES;
}

function buildBinaryLaneField(lane, presenceField, errorCount) {
  const surface =
    lane +
    (presenceField.meshPressureIndex || 0) +
    (presenceField.castleLoadLevel || 0) +
    errorCount * 10;

  return {
    lane,
    parity: lane % 2,
    density: errorCount,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1))),
    surface
  };
}

function buildWaveLaneField(lane, immuneCycle, presenceField, errorCount) {
  return {
    lane,
    amplitude: (lane + errorCount) % 11,
    wavelength: immuneCycle,
    phase:
      (immuneCycle +
        lane +
        (presenceField.meshPressureIndex || 0)) % 16
  };
}

// ============================================================================
// v31++ Immune Pulse Intelligence (logic-only, IMMORTAL-safe)
// ============================================================================

function computeImmunePulseIntelligence({
  advantageField,
  presenceField,
  immuneComputeProfileV31,
  errorCount
}) {
  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical"
      ? 1.0
      : presenceTier === "high"
      ? 0.8
      : presenceTier === "elevated"
      ? 0.6
      : presenceTier === "soft"
      ? 0.4
      : 0.2;

  const factoring = immuneComputeProfileV31.factoringSignal ? 1 : 0;
  const bandIsBinary = immuneComputeProfileV31.routeBand === "binary" ? 1 : 0;

  const errorWeight = Math.max(0, Math.min(errorCount / 8, 1));

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.3 +
        presenceWeight * 0.25 +
        factoring * 0.2 +
        (1 - errorWeight) * 0.25,
      1
    )
  );

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
      solvednessScore * 0.6 +
        (bandIsBinary ? 0.15 : 0) +
        (advantageTier >= 2 ? 0.25 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    immunePulseIntelligenceVersion: "IMMUNE-PI-V31++",
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band: immuneComputeProfileV31.routeBand,
    advantageTier,
    errorCount
  };
}

// ============================================================================
// runHealthCheck() — immune surveillance scan (presence-aware, binary-first, v31++)
// ============================================================================

export function runHealthCheck(globalHints = {}) {
  immuneCycle++;
  immuneState.cycleCount++;
  immuneState.lastCycleIndex = immuneCycle;

  try {
    const report = {
      engine: getEarnEngineHealingState(),
      runtime: getPulseEarnHeartHealingState(),
      worker: getPulseEarnMetabolismHealingState(),
      submission: getPulseEarnLymphHealingState(),
      packets: getPulseEarnGeneticMemoryHealingState(),
      connector: getPulseEarnNervousSystemHealingState(),
      // cell slot kept for compatibility; may be null/undefined
      cell: {},
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };

    immuneState.lastReport = report;

    const driftDetected =
      report.engine.lastError ||
      report.runtime.lastError ||
      report.worker.lastError ||
      report.submission.lastError ||
      report.packets.lastError ||
      report.cell.lastError ||
      report.connector.lastError;

    const derivedBand = normalizeBand(
      report.runtime.lastBand ||
      report.packets.lastBand ||
      "symbolic"
    );
    immuneState.lastBand = derivedBand;
    immuneState.lastBandSignature = computeHashIntelligenceV31({
      organ: "PulseEarnImmuneSystem",
      band: derivedBand,
      cycle: immuneCycle
    });

    const errorFlags = [
      report.engine.lastError,
      report.runtime.lastError,
      report.worker.lastError,
      report.submission.lastError,
      report.packets.lastError,
      report.cell.lastError,
      report.connector.lastError
    ];
    const errorCount = errorFlags.reduce(
      (acc, e) => acc + (e ? 1 : 0),
      0
    );

    const presenceField = buildPresenceField(report, globalHints);
    const advantageField = buildAdvantageField(report, globalHints);
    const hintsField = buildHintsField(report, globalHints);

    const pressureTier = classifyPressureTier(presenceField, errorCount);

    const immuneComputeProfile = buildImmuneComputeProfile(
      derivedBand,
      hintsField
    );

    const immuneComputeProfileV31 = buildImmuneComputeProfileV31(
      derivedBand,
      hintsField,
      presenceField
    );

    const lane = chooseLane(
      pressureTier,
      advantageField.advantageTier,
      errorCount
    );

    immuneState.lastPresenceField = presenceField;
    immuneState.lastAdvantageField = advantageField;
    immuneState.lastHintsField = hintsField;
    immuneState.lastImmuneComputeProfile = immuneComputeProfile;
    immuneState.lastImmuneComputeProfileV31 = immuneComputeProfileV31;
    immuneState.lastLane = lane;
    immuneState.lastLaneProfile = {
      lane,
      pressureTier,
      advantageTier: advantageField.advantageTier,
      errorCount
    };

    const surface =
      errorCount * 100 +
      immuneCycle +
      (presenceField.meshPressureIndex || 0) +
      (presenceField.castleLoadLevel || 0);

    const binaryField = {
      binaryImmuneSignature: computeHashIntelligenceV31({
        organ: "PulseEarnImmuneSystem",
        surface,
        errorCount,
        cycle: immuneCycle,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        lane
      }),
      binarySurfaceSignature: computeHashIntelligenceV31({
        organ: "PulseEarnImmuneSystem",
        mode: "surface",
        surface,
        cycle: immuneCycle,
        lane
      }),
      binarySurface: {
        errorCount,
        cycle: immuneCycle,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        surface
      },
      parity: surface % 2 === 0 ? 0 : 1,
      density: errorCount,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    };
    immuneState.lastBinaryField = binaryField;

    const waveField = {
      amplitude: errorCount + (presenceField.meshStrength || 0),
      wavelength: immuneCycle,
      phase:
        (errorCount +
          immuneCycle +
          (presenceField.meshPressureIndex || 0)) % 16,
      band: derivedBand,
      mode: derivedBand === "binary" ? "compression-wave" : "symbolic-wave"
    };
    immuneState.lastWaveField = waveField;

    const immunePressureProfile = {
      pressureTier,
      errorCount,
      band: derivedBand,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel,
      lane
    };

    const binaryProfile = {
      binaryField,
      pressureTier,
      lane
    };

    const waveProfile = {
      waveField,
      pressureTier,
      lane
    };

    const binaryLaneField = buildBinaryLaneField(
      lane,
      presenceField,
      errorCount
    );
    const waveLaneField = buildWaveLaneField(
      lane,
      immuneCycle,
      presenceField,
      errorCount
    );

    immuneState.lastBinaryLaneField = binaryLaneField;
    immuneState.lastWaveLaneField = waveLaneField;

    const chunkPlan = {
      enabled:
        !!immuneComputeProfileV31.prewarmNeeded ||
        !!immuneComputeProfileV31.chunkAggression,
      strategy: hintsField.chunkHints.strategy || "default",
      aggression: immuneComputeProfileV31.chunkAggression || 0,
      lane
    };

    const cachePlan = {
      enabled: true,
      strategy: hintsField.cacheHints.strategy || "default",
      priority: immuneComputeProfileV31.cachePriority || "normal",
      lane
    };

    const prewarmPlan = {
      enabled: !!immuneComputeProfileV31.prewarmNeeded,
      strategy: hintsField.prewarmHints.strategy || "default",
      band: immuneComputeProfileV31.routeBand || derivedBand,
      lane
    };

    immuneState.lastChunkPlan = chunkPlan;
    immuneState.lastCachePlan = cachePlan;
    immuneState.lastPrewarmPlan = prewarmPlan;

    const immunePulseIntelligence = computeImmunePulseIntelligence({
      advantageField,
      presenceField,
      immuneComputeProfileV31,
      errorCount
    });

    immuneState.lastImmunePulseIntelligence = immunePulseIntelligence;

    immuneState.lastImmuneSignature = buildImmuneSignature(
      immuneCycle,
      derivedBand,
      pressureTier,
      errorCount,
      lane
    );
    immuneState.lastDriftSignature = buildDriftSignature(report);

    if (!driftDetected) {
      immuneState.status = "healthy";
      immuneState.lastError = null;

      return {
        status: "healthy",
        report,
        immuneSignature: immuneState.lastImmuneSignature,
        driftSignature: immuneState.lastDriftSignature,
        band: derivedBand,
        lane,
        binaryField,
        waveField,
        binaryLaneField,
        waveLaneField,
        pressureTier,
        presenceField,
        advantageField,
        hintsField,
        immunePressureProfile,
        binaryProfile,
        waveProfile,
        immuneComputeProfile,
        immuneComputeProfileV31,
        immunePulseIntelligence,
        chunkPlan,
        cachePlan,
        prewarmPlan,
        cycleIndex: immuneCycle,
        ...PULSE_EARN_IMMUNE_CONTEXT
      };
    }

    immuneState.status = "warning";
    immuneState.lastError = "drift_detected";

    return {
      status: "warning",
      report,
      message: "Subsystem drift detected",
      immuneSignature: immuneState.lastImmuneSignature,
      driftSignature: immuneState.lastDriftSignature,
      band: derivedBand,
      lane,
      binaryField,
      waveField,
      binaryLaneField,
      waveLaneField,
      pressureTier,
      presenceField,
      advantageField,
      hintsField,
      immunePressureProfile,
      binaryProfile,
      waveProfile,
      immuneComputeProfile,
      immuneComputeProfileV31,
      immunePulseIntelligence,
      chunkPlan,
      cachePlan,
      prewarmPlan,
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };

  } catch (err) {
    immuneState.status = "error";
    immuneState.lastError = err.message;

    const derivedBand = normalizeBand(immuneState.lastBand);

    const surface = immuneCycle;
    const binaryField = {
      binaryImmuneSignature: computeHashIntelligenceV31({
        organ: "PulseEarnImmuneSystem",
        mode: "error",
        surface,
        cycle: immuneCycle
      }),
      binarySurfaceSignature: computeHashIntelligenceV31({
        organ: "PulseEarnImmuneSystem",
        mode: "error_surface",
        surface,
        cycle: immuneCycle
      }),
      binarySurface: {
        errorCount: 1,
        cycle: immuneCycle,
        surface
      },
      parity: surface % 2 === 0 ? 0 : 1,
      density: 1,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    };
    immuneState.lastBinaryField = binaryField;

    const waveField = {
      amplitude: 1,
      wavelength: immuneCycle,
      phase: (1 + immuneCycle) % 16,
      band: derivedBand,
      mode: derivedBand === "binary" ? "compression-wave" : "symbolic-wave"
    };
    immuneState.lastWaveField = waveField;

    const presenceField = immuneState.lastPresenceField || {
      presenceVersion: "v31-Immortal-INTEL-PLUSPLUS",
      presenceTier: "error",
      meshPressureIndex: 0,
      castleLoadLevel: 0
    };
    const advantageField = immuneState.lastAdvantageField || {
      advantageVersion: "C-31.0-IMMUNE-INTEL",
      advantageScore: 0,
      advantageBand: "neutral",
      advantageTier: 0
    };
    const hintsField = immuneState.lastHintsField || {
      fallbackBandLevel: 0,
      chunkHints: {},
      cacheHints: {},
      prewarmHints: {},
      coldStartHints: {}
    };

    const pressureTier = "error";

    const immuneComputeProfile = buildImmuneComputeProfile(
      derivedBand,
      hintsField
    );
    const immuneComputeProfileV31 = buildImmuneComputeProfileV31(
      derivedBand,
      hintsField,
      presenceField
    );

    const lane = chooseLane(
      pressureTier,
      advantageField.advantageTier,
      1
    );

    const immunePulseIntelligence = computeImmunePulseIntelligence({
      advantageField,
      presenceField,
      immuneComputeProfileV31,
      errorCount: 1
    });

    const immunePressureProfile = {
      pressureTier,
      errorCount: 1,
      band: derivedBand,
      meshPressureIndex: presenceField.meshPressureIndex || 0,
      castleLoadLevel: presenceField.castleLoadLevel || 0,
      advantageTier: advantageField.advantageTier || 0,
      fallbackBandLevel: hintsField.fallbackBandLevel || 0,
      lane
    };

    const binaryProfile = {
      binaryField,
      pressureTier,
      lane
    };

    const waveProfile = {
      waveField,
      pressureTier,
      lane
    };

    const binaryLaneField = buildBinaryLaneField(
      lane,
      presenceField,
      1
    );
    const waveLaneField = buildWaveLaneField(
      lane,
      immuneCycle,
      presenceField,
      1
    );

    const chunkPlan = {
      enabled:
        !!immuneComputeProfileV31.prewarmNeeded ||
        !!immuneComputeProfileV31.chunkAggression,
      strategy: hintsField.chunkHints.strategy || "default",
      aggression: immuneComputeProfileV31.chunkAggression || 0,
      lane
    };

    const cachePlan = {
      enabled: true,
      strategy: hintsField.cacheHints.strategy || "default",
      priority: immuneComputeProfileV31.cachePriority || "normal",
      lane
    };

    const prewarmPlan = {
      enabled: !!immuneComputeProfileV31.prewarmNeeded,
      strategy: hintsField.prewarmHints || "default",
      band: immuneComputeProfileV31.routeBand || derivedBand,
      lane
    };

    immuneState.lastImmuneComputeProfile = immuneComputeProfile;
    immuneState.lastImmuneComputeProfileV31 = immuneComputeProfileV31;
    immuneState.lastImmunePulseIntelligence = immunePulseIntelligence;
    immuneState.lastImmunePressureProfile = immunePressureProfile;
    immuneState.lastBinaryProfile = binaryProfile;
    immuneState.lastWaveProfile = waveProfile;
    immuneState.lastLane = lane;
    immuneState.lastLaneProfile = {
      lane,
      pressureTier,
      advantageTier: advantageField.advantageTier,
      errorCount: 1
    };
    immuneState.lastChunkPlan = chunkPlan;
    immuneState.lastCachePlan = cachePlan;
    immuneState.lastPrewarmPlan = prewarmPlan;

    immuneState.lastImmuneSignature = buildImmuneSignature(
      immuneCycle,
      derivedBand,
      pressureTier,
      1,
      lane
    );

    return {
      status: "error",
      error: immuneState.lastError,
      immuneSignature: immuneState.lastImmuneSignature,
      band: derivedBand,
      lane,
      binaryField,
      waveField,
      binaryLaneField,
      waveLaneField,
      pressureTier,
      presenceField,
      advantageField,
      hintsField,
      immunePressureProfile,
      binaryProfile,
      waveProfile,
      immuneComputeProfile,
      immuneComputeProfileV31,
      immunePulseIntelligence,
      chunkPlan,
      cachePlan,
      prewarmPlan,
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };
  }
}

// ============================================================================
// PUBLIC: Immune Healing State
// ============================================================================

export function getPulseEarnImmuneHealingState() {
  return { ...immuneState };
}

// ============================================================================
// PUBLIC: Deterministic Repair (thin wrapper, unchanged semantics, v31 metadata)
// ============================================================================

export function runDeterministicRepair(key, payload) {
  immuneState.status = "repairing";
  immuneState.lastRepair = {
    key: key || "unknown",
    payload: payload || null,
    cycleIndex: immuneCycle
  };

  try {
    if (key === "GENE_SYNTH") {
      const gene = synthesizePulseEarnGene(payload || {});
      writePulseEarnGene(gene);
    }

    immuneState.lastRepairSignature = buildRepairSignature(
      key,
      immuneCycle
    );
    immuneState.status = "healthy";

    return {
      success: true,
      key,
      repairSignature: immuneState.lastRepairSignature,
      cycleIndex: immuneCycle
    };
  } catch (err) {
    immuneState.status = "error";
    immuneState.lastError = err.message;
    immuneState.lastRepairSignature = buildRepairSignature(
      `${key || "unknown"}::error`,
      immuneCycle
    );

    return {
      success: false,
      key,
      error: immuneState.lastError,
      repairSignature: immuneState.lastRepairSignature,
      cycleIndex: immuneCycle
    };
  }
}

PulseRealm.EarnImmuneSystem = {
  runDeterministicRepair,
  getPulseEarnImmuneHealingState,
  getPulseEarnGeneticMemoryHealingState,
  runHealthCheck,
  healingState
}