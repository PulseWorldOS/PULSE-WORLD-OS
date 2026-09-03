// ============================================================================
//  PulseEarnContinuancePulse-v31-Immortal-INTEL.js
//  Earn v1 Continuance Wrapper (v31 IMMORTAL SAFE MODE)
//  NO PulseSendSystem, NO network, NO routing, NO loops.
//  Only: build LegacyEarn v1 + Pulse-compatible envelope and return it.
//  Presence/Advantage/Chunk/Band/Binary/Wave/Hints/ComputeProfile-aware
//  as METADATA ONLY (pure compute, deterministic).
//  v31-INTEL: extended pulseIntelligence + advantage + computeProfile
//  with factoring, chunk/cache/prewarm, band/binary/gpu/miner/air-aware hints,
//  continuance/risk-aware surfaces, and v31-LYMPH-NODES style
//  lymph/immune/liquidity + dual-hash INTEL/meta surfaces.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝




let continuanceCycle = 0;

// ---------------------------------------------------------------------------
// Deterministic Hash Helpers — v31 IMMORTAL-INTEL
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || {});
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

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

// ---------------------------------------------------------------------------
// Healing / Meta Surfaces — Continuance Activity Log (v31-LYMPH-NODES-INTEL)
// ---------------------------------------------------------------------------
export const continuanceHealing = {
  version: "v31-IMMORTAL-INTEL-LYMPH-NODES",
  cycleCount: 0,

  lastPresenceField: null,
  lastPresenceSignatureClassic: null,
  lastPresenceSignatureIntel: null,

  lastAdvantageField: null,
  lastAdvantageSignatureClassic: null,
  lastAdvantageSignatureIntel: null,

  lastChunkPlan: null,
  lastChunkPlanSignatureClassic: null,
  lastChunkPlanSignatureIntel: null,

  lastComputeProfile: null,
  lastPulseIntelligence: null,

  lastLymphNodesField: null,
  lastImmuneField: null,
  lastLiquidityField: null,

  lastMetaSignatureClassic: null,
  lastMetaSignatureIntel: null
};

export function getContinuanceHealingState_v31() {
  return { ...continuanceHealing };
}

// ============================================================================
// v31 Presence Field (IMMORTAL)
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceFieldV31(globalHints = {}, cycle) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalComposite = cycle * 0.0001;
  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const presenceField = {
    presenceVersion: "v31-Immortal-INTEL",
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "continuance",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "continuance-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "continuance-region",
    castleId: castle.castleId || "continuance-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle
  };

  const intelPayload = {
    kind: "continuancePresence",
    version: "v31-Immortal-INTEL",
    cycle,
    presenceTier,
    meshPressureIndex,
    castleLoadLevel
  };

  const classicString =
    `CONT_PRES_V31` +
    `::TIER:${presenceTier}` +
    `::MESH:${meshPressureIndex}` +
    `::CASTLE:${castleLoadLevel}` +
    `::CYCLE:${cycle}`;

  const sig = buildDualHashSignature("CONTINUANCE_PRESENCE_V31", intelPayload, classicString);

  presenceField.presenceSignatureIntel = sig.intel;
  presenceField.presenceSignatureClassic = sig.classic;

  continuanceHealing.lastPresenceField = presenceField;
  continuanceHealing.lastPresenceSignatureClassic = sig.classic;
  continuanceHealing.lastPresenceSignatureIntel = sig.intel;

  return presenceField;
}

// ============================================================================
// Advantage‑C v31 (structural, IMMORTAL-safe)
// ============================================================================
function buildAdvantageFieldV31(
  binaryField,
  waveField,
  presenceField,
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null
) {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;

  const baseScore =
    density * 0.00001 +
    amplitude * 0.00001;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high" ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft" ? 0.005 :
    0;

  const contScore = continuanceSnapshot && typeof continuanceSnapshot.continuanceScore === "number"
    ? continuanceSnapshot.continuanceScore
    : 0;

  const riskScore = riskSnapshot && typeof riskSnapshot.riskScore === "number"
    ? riskSnapshot.riskScore
    : 0;

  const continuanceBoost = (1 - clamp01(contScore)) * 0.01;
  const riskBoost = clamp01(riskScore) * 0.01;

  const advantageScore = baseScore + presenceBoost + continuanceBoost + riskBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const hints = globalHints || {};
  const chunkHints = hints.chunkHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};
  const coldStartHints = hints.coldStartHints || {};

  const advantageField = {
    advantageVersion: "C-31.0-INTEL",
    advantageScore,
    advantageTier,
    fallbackBandLevel: hints.fallbackBandLevel ?? 0,

    // hint surfaces (metadata-only)
    chunkAggression: chunkHints.chunkAggression ?? 0,
    cachePriority: (cacheHints.priority || "normal").toLowerCase(),
    prewarmNeeded: !!prewarmHints.shouldPrewarm,
    coldStartRisk: !!coldStartHints.coldStartRisk,

    gpuPreferred: !!hints.gpuPreferred,
    minerPreferred: !!hints.minerPreferred,
    airPreferred: !!hints.airPreferred,

    continuanceScore: contScore,
    riskScore
  };

  const intelPayload = {
    kind: "continuanceAdvantage",
    version: "v31-Immortal-INTEL",
    advantageScore,
    advantageTier,
    presenceTier: presenceField.presenceTier,
    chunkAggression: advantageField.chunkAggression,
    cachePriority: advantageField.cachePriority
  };

  const classicString =
    `CONT_ADV_V31` +
    `::ADV:${advantageScore.toFixed(6)}` +
    `::TIER:${advantageTier}` +
    `::PRES:${presenceField.presenceTier}` +
    `::CHUNK_AGG:${advantageField.chunkAggression}` +
    `::CACHE:${advantageField.cachePriority}`;

  const sig = buildDualHashSignature("CONTINUANCE_ADVANTAGE_V31", intelPayload, classicString);

  advantageField.advantageSignatureIntel = sig.intel;
  advantageField.advantageSignatureClassic = sig.classic;

  continuanceHealing.lastAdvantageField = advantageField;
  continuanceHealing.lastAdvantageSignatureClassic = sig.classic;
  continuanceHealing.lastAdvantageSignatureIntel = sig.intel;

  return advantageField;
}

// ============================================================================
// Chunk / Cache / Prewarm Plan v31 + LymphNodes/Immune/Liquidity
// ============================================================================
function buildChunkPrewarmPlanV31(presenceField, advantageField) {
  const basePriority =
    presenceField.presenceTier === "critical"
      ? 4
      : presenceField.presenceTier === "high"
      ? 3
      : presenceField.presenceTier === "elevated"
      ? 2
      : presenceField.presenceTier === "soft"
      ? 1
      : 0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const gpuBoost =
    advantageField.gpuPreferred ? 1 : 0;

  // v31-LYMPH style overlays (metadata-only, no IO)
  const presenceTier = presenceField.presenceTier;

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
    planVersion: "v31-Continuance-AdvantageC-INTEL-LYMPH",
    priority: basePriority + advantageBoost + gpuBoost,
    band: presenceField.presenceTier,
    chunks: {
      continuanceEnvelope: true,
      legacyEarnBlueprint: true,
      lymphNodeMap: lymphNodeTier !== "lymph_idle",
      immuneDiagnosticsChunk: immuneScanRequired
    },
    cache: {
      continuanceDiagnostics: true,
      lymphHistoryCache: lymphNodeTier !== "lymph_idle"
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true,
      gpuOrgan: !!advantageField.gpuPreferred,
      minerOrgan: !!advantageField.minerPreferred,
      immuneSystemScan: immuneScanRequired
    },
    lymphNodes: {
      lymphNodeTier,
      immuneScanRequired,
      liquidityTier
    }
  };

  const intelPayload = {
    kind: "continuanceChunkPrewarm",
    version: "v31-Immortal-INTEL-LYMPH",
    priority: plan.priority,
    presenceTier,
    advantageTier: advantageField.advantageTier,
    lymphNodeTier,
    liquidityTier
  };

  const classicString =
    `CONT_PLAN_V31` +
    `::PRIO:${plan.priority}` +
    `::PRES:${presenceTier}` +
    `::ADV_TIER:${advantageField.advantageTier}` +
    `::LYMPH:${lymphNodeTier}` +
    `::LIQ:${liquidityTier}`;

  const sig = buildDualHashSignature("CONTINUANCE_CHUNK_PREWARM_V31", intelPayload, classicString);

  plan.chunkPrewarmSignatureIntel = sig.intel;
  plan.chunkPrewarmSignatureClassic = sig.classic;

  continuanceHealing.lastChunkPlan = plan;
  continuanceHealing.lastChunkPlanSignatureClassic = sig.classic;
  continuanceHealing.lastChunkPlanSignatureIntel = sig.intel;

  continuanceHealing.lastLymphNodesField = plan.lymphNodes;
  continuanceHealing.lastImmuneField = {
    immuneScanRequired,
    immuneSystemScan: plan.prewarm.immuneSystemScan
  };
  continuanceHealing.lastLiquidityField = {
    liquidityTier
  };

  return plan;
}

// ============================================================================
// Hints + Compute Profile v31 (metadata-only)
// ============================================================================
function buildHintsFieldV31(globalHints = {}) {
  return Object.freeze({
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: globalHints.chunkHints || {},
    cacheHints: globalHints.cacheHints || {},
    prewarmHints: globalHints.prewarmHints || {},
    coldStartHints: globalHints.coldStartHints || {},
    gpuPreferred: !!globalHints.gpuPreferred,
    minerPreferred: !!globalHints.minerPreferred,
    airPreferred: !!globalHints.airPreferred
  });
}

function normalizeCachePriorityV31(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function deriveFactoringSignalV31({
  meshPressureIndex = 0,
  cachePriority = "normal",
  prewarmNeeded = false
}) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildComputeProfileV31({
  band,
  presenceField,
  advantageField,
  globalHints = {},
  capabilityModel = {}
}) {
  const b = normalizeBand(band);
  const hintsField = buildHintsFieldV31(globalHints);
  const cachePriority = normalizeCachePriorityV31(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex = Number(globalHints.meshSignals.meshPressureIndex || 0);

  const factoringSignal = deriveFactoringSignalV31({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const performanceRatio = capabilityModel.performanceRatio ?? 1;
  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const airScore = capabilityModel.airScore ?? 0;

  const computeProfile = Object.freeze({
    profileVersion: "CONTINUANCE-COMPUTE-31",
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    gpuPreferred: hintsField.gpuPreferred || gpuScore > 0,
    minerPreferred: hintsField.minerPreferred || minerScore > 0,
    airPreferred: hintsField.airPreferred || airScore > 0,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    performanceRatio,
    gpuScore,
    minerScore,
    airScore
  });

  continuanceHealing.lastComputeProfile = computeProfile;
  return computeProfile;
}

// ============================================================================
// Binary + Wave Surfaces (v31)
// ============================================================================
function buildBinaryFieldV31(pattern, lineage, cycle) {
  const size = pattern.length + lineage.length;
  const density = size + cycle;
  const surface = density + size;

  return {
    binaryShapeSignature: computeHash(`bshape::${pattern}::${lineage.join("::")}`),
    binarySurfaceSignature: computeHash(`bsurf::${surface}`),
    binarySurface: {
      size,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveFieldV31(pattern, lineage, cycle, band) {
  const amplitude = lineage.length + cycle;
  const wavelength = pattern.length + 1;
  const phase = (pattern.length + lineage.length + cycle) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Pulse Intelligence for Earn Continuance (logic-only, v31)
// ============================================================================
function computePulseIntelligenceForEarnV31({
  band,
  factoringSignal,
  presenceField,
  advantageField,
  computeProfile
}) {
  const bandIsBinary = band === "binary" ? 1 : 0;
  const factoring = factoringSignal ? 1 : 0;

  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high" ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft" ? 0.4 :
    0.2;

  const performanceRatio = computeProfile.performanceRatio || 1;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
      presenceWeight * 0.25 +
      factoring * 0.2 +
      performanceRatio * 0.15,
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
      (bandIsBinary ? 0.15 : 0.0) +
      (advantageTier >= 2 ? 0.25 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  const pulseIntelligence = {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    performanceRatio
  };

  continuanceHealing.lastPulseIntelligence = pulseIntelligence;
  return pulseIntelligence;
}

// ============================================================================
// Continuance Meta — v31-LYMPH-NODES style
// ============================================================================
function buildContinuanceMetaV31({
  cycleIndex,
  jobId,
  pattern,
  lineage,
  band,
  factoringSignal,
  presenceField,
  advantageField,
  chunkPlan
}) {
  const lineageDepth = lineage.length || 0;
  const lymphNodeTier = chunkPlan.lymphNodes.lymphNodeTier || "lymph_idle";
  const liquidityTier = chunkPlan.lymphNodes.liquidityTier || "liquidity_open";

  const intelPayload = {
    kind: "earnContinuance",
    version: "v31-IMMORTAL-INTEL-LYMPH",
    cycleIndex,
    jobId,
    pattern: pattern || "UNKNOWN_PATTERN",
    lineageDepth,
    band,
    factoringSignal,
    presenceTier: presenceField.presenceTier,
    advantageScore: advantageField.advantageScore,
    chunkPriority: chunkPlan.priority,
    lymphNodeTier,
    liquidityTier
  };

  const classicString =
    `CONT_META_V31` +
    `::JOB:${jobId}` +
    `::PAT:${pattern || "UNKNOWN_PATTERN"}` +
    `::LIN:${lineageDepth}` +
    `::BAND:${band}` +
    `::FACT:${factoringSignal}` +
    `::PRES:${presenceField.presenceTier}` +
    `::ADV:${advantageField.advantageScore.toFixed(6)}` +
    `::CHUNK:${chunkPlan.priority}` +
    `::LYMPH:${lymphNodeTier}` +
    `::LIQ:${liquidityTier}` +
    `::CYCLE:${cycleIndex}`;

  const sig = buildDualHashSignature("EARN_CONTINUANCE_META_V31", intelPayload, classicString);

  continuanceHealing.lastMetaSignatureClassic = sig.classic;
  continuanceHealing.lastMetaSignatureIntel = sig.intel;

  return {
    layer: "PulseEarnContinuancePulse",
    role: "EARN_CONTINUANCE_META_V31_LYMPH",
    version: "v31-IMMORTAL-INTEL-LYMPH",
    signatures: {
      metaSignatureIntel: sig.intel,
      metaSignatureClassic: sig.classic,
      presenceSignatureIntel: continuanceHealing.lastPresenceSignatureIntel,
      presenceSignatureClassic: continuanceHealing.lastPresenceSignatureClassic,
      advantageSignatureIntel: continuanceHealing.lastAdvantageSignatureIntel,
      advantageSignatureClassic: continuanceHealing.lastAdvantageSignatureClassic,
      chunkPrewarmSignatureIntel: continuanceHealing.lastChunkPlanSignatureIntel,
      chunkPrewarmSignatureClassic: continuanceHealing.lastChunkPlanSignatureClassic
    },
    profile: {
      cycleIndex,
      jobId,
      pattern: pattern || "UNKNOWN_PATTERN",
      lineageDepth,
      band,
      factoringSignal,
      presenceTier: presenceField.presenceTier,
      advantageScore: advantageField.advantageScore,
      chunkPriority: chunkPlan.priority,
      lymphNodeTier,
      liquidityTier
    }
  };
}

// ============================================================================
// Build Legacy Earn v1 (unchanged logic, upgraded metadata surfaces v31)
// ============================================================================
function buildLegacyEarnV1(
  impulse,
  globalHints = {},
  continuanceSnapshot = null,
  riskSnapshot = null,
  capabilityModel = {}
) {
  continuanceCycle++;
  continuanceHealing.cycleCount = continuanceCycle;

  const payload = impulse.payload || {};

  const jobId   = impulse.tickId || payload.jobId || "UNKNOWN_JOB";
  const pattern = impulse.intent || payload.pattern || "UNKNOWN_PATTERN";
  const lineage = payload.parentLineage || [];

  const band = normalizeBand(payload.band);

  const factoringSignal =
    typeof payload.factoringSignal === "number"
      ? (payload.factoringSignal ? 1 : 0)
      : 1;

  const patternSignature = computeHash(pattern);
  const lineageSignature = computeHash(lineage.join("::"));

  const presenceField = buildPresenceFieldV31(globalHints, continuanceCycle);
  const binaryField = buildBinaryFieldV31(pattern, lineage, continuanceCycle);
  const waveField = buildWaveFieldV31(pattern, lineage, continuanceCycle, band);
  const advantageField = buildAdvantageFieldV31(
    binaryField,
    waveField,
    presenceField,
    globalHints,
    continuanceSnapshot,
    riskSnapshot
  );
  const chunkPlan = buildChunkPrewarmPlanV31(presenceField, advantageField);
  const hintsField = buildHintsFieldV31(globalHints);
  const computeProfile = buildComputeProfileV31({
    band,
    presenceField,
    advantageField,
    globalHints,
    capabilityModel
  });

  const pulseIntelligence = computePulseIntelligenceForEarnV31({
    band,
    factoringSignal,
    presenceField,
    advantageField,
    computeProfile
  });

  const continuanceMeta = buildContinuanceMetaV31({
    cycleIndex: continuanceCycle,
    jobId,
    pattern,
    lineage,
    band,
    factoringSignal,
    presenceField,
    advantageField,
    chunkPlan
  });

  return {
    EarnRole: {
      kind: "Earn",
      version: "1.0",
      identity: "Earn-v1-Continuance-v31-Immortal-INTEL"
    },

    jobId,
    pattern,
    patternSignature,

    payload,
    priority: payload.priority || "normal",
    returnTo: payload.returnTo || null,
    lineage,
    lineageSignature,

    band,
    factoringSignal,

    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    hintsField,
    computeProfile,

    pulseIntelligence,
    continuanceMeta,

    meta: {
      ...(payload.meta || {}),
      legacy: true,
      origin: "ContinuancePulse-v31-Immortal-INTEL",
      cycleIndex: continuanceCycle,
      patternSignature,
      lineageSignature,
      continuanceMeta
    }
  };
}

// ============================================================================
// Build Pulse-Compatible Envelope (v31 surfaces)
// ============================================================================
function buildPulseCompatibleEarnV31(earn) {
  if (!earn) return null;

  const continuanceSignature = computeHash(
    `${earn.jobId}::${earn.patternSignature}::${earn.meta.cycleIndex}`
  );

  return {

    jobId: earn.jobId,
    pattern: earn.pattern,
    patternSignature: earn.patternSignature,

    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: earn.lineage,
    lineageSignature: earn.lineageSignature,

    band: earn.band,
    factoringSignal: earn.factoringSignal,

    binaryField: earn.binaryField,
    waveField: earn.waveField,
    presenceField: earn.presenceField,
    advantageField: earn.advantageField,
    chunkPlan: earn.chunkPlan,
    hintsField: earn.hintsField,
    computeProfile: earn.computeProfile,

    pulseIntelligence: earn.pulseIntelligence,
    continuanceMeta: earn.continuanceMeta,

    meta: {
      ...(earn.meta || {}),
      origin: "ContinuancePulse-v31-Immortal-INTEL",
      earnVersion: "1.0",
      earnIdentity: "Earn-v1-Continuance-v31-Immortal-INTEL",
      earnEnvelope: true,
      cycleIndex: earn.meta.cycleIndex,
      continuanceSignature,
      bandSignature: computeHash(earn.band),
      factoringSignature: computeHash(String(earn.factoringSignal)),
      binarySignature: earn.binaryField.binaryShapeSignature,
      waveSignature: computeHash(JSON.stringify(earn.waveField)),
      pulseIntelligenceSignature: computeHash(JSON.stringify(earn.pulseIntelligence)),
      continuanceMetaSignature: computeHash(JSON.stringify(earn.continuanceMeta))
    },

    earn: {
      ...earn,
      __earnEnvelope: true
    }
  };
}

// ============================================================================
// PUBLIC API — PulseEarnContinuancePulse (v31 IMMORTAL-INTEL SAFE MODE)
// ============================================================================
export const PulseEarnContinuancePulse = {
  build(
    impulse,
    globalHints = {},
    continuanceSnapshot = null,
    riskSnapshot = null,
    capabilityModel = {}
  ) {
    const earnV1 = buildLegacyEarnV1(
      impulse,
      globalHints,
      continuanceSnapshot,
      riskSnapshot,
      capabilityModel
    );
    const pulseCompatibleEarn = buildPulseCompatibleEarnV31(earnV1);

    return {
      ok: true,
      earn: earnV1,
      pulseCompatibleEarn,
      fallback: true
    };
  }
};

export default {
  PulseEarnContinuancePulse
};

PulseRealm.EarnContinuancePulse = {
  PulseEarnContinuancePulse,
  continuanceHealing,
  getContinuanceHealingState_v31
}