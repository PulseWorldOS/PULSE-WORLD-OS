// ============================================================================
//  PulseEarnSkeletalSystem-v30-Sovereign-Immortal-INTEL++.js
//  THE SKELETAL SYSTEM (v30-Sovereign-Immortal++ + Advantage‑M30 + Compat‑C30)
//  Deterministic Capability Engine + Phenotype Passport + Intel Dual-Hash Surfaces
//  A‑B‑A Band/Binary/Wave + Presence + Advantage + Compatibility + Chunk/Prewarm
//  Mesh/Earn/Device‑aware, v30++ INTEL dual-hash, fully deterministic, zero-IO
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ---------------------------------------------------------------------------
// Healing Metadata — Structural + Physiological + Presence + Advantage Log v30
// ---------------------------------------------------------------------------
export const skeletalHealing = {
  version: "v30-Sovereign-Immortal-INTEL++",

  lastProfile: null,
  lastGpuModel: null,
  lastGpuScore: null,
  lastBandwidthMbps: null,
  lastStabilityScore: null,
  lastCpuCores: null,
  lastMemoryMB: null,

  lastPhenotypeSignature: null,
  lastStructuralSignature: null,
  lastPhysiologicalSignature: null,
  lastPresenceSignature: null,
  lastDevicePattern: null,

  lastBand: null,
  lastBandSignature: null,
  lastBandIntelSignature: null,

  lastBinaryField: null,
  lastBinaryIntelSignature: null,
  lastWaveField: null,
  lastWaveIntelSignature: null,

  lastPresenceBand: null,
  lastPresenceField: null,
  lastChunkField: null,

  lastAdvantageField: null,
  lastAdvantageSignature: null,
  lastAdvantageIntelSig: null,

  lastCompatibilityField: null,
  lastCompatibilitySignature: null,
  lastCompatibilityIntelSig: null,

  lastChunkPrewarmPlan: null,
  lastChunkPrewarmSignature: null,
  lastChunkPrewarmIntelSig: null,

  // v30 dual-hash INTEL surfaces
  lastPhenotypeIntelSig: null,
  lastStructuralIntelSig: null,
  lastPhysIntelSig: null,
  lastPresenceIntelSig: null,

  // extended v30 device meta
  lastDeviceTier: null,
  lastDeviceKind: null,
  lastPerformanceIndex: null,
  lastThermalHeadroom: null,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true,
    skeletalContinuity: true,
    deviceSelfRepair: true
  }
};

// ---------------------------------------------------------------------------
// Deterministic Hash Helpers — v30-SOVEREIGN-IMMORTAL-INTEL++
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
  const classicHash = computeHash(
    `${label}::${classicString || ""}`
  );
  return {
    intel: intelHash,
    classic: classicHash,
    primary: classicHash,
    intellect: intelHash
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function normalizePresenceBand(presenceBand) {
  const p = String(presenceBand || "symbolic").toLowerCase();
  return p === "binary" ? "binary" : "symbolic";
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ---------------------------------------------------------------------------
// Deterministic Phenotype — v30-SOVEREIGN-IMMORTAL
// Still no hardware probing; phenotype is deterministic and override‑only.
// ---------------------------------------------------------------------------
let phenotype = {
  id: "DEVICE-30-SOVEREIGN-IMMORTAL",

  // Structural capacity (skeletal system)
  cpuCores: 16,
  memoryMB: 65536,
  cpuScore: 2200,

  // Muscular potential
  gpuModel: "deterministic-gpu-v30",
  vramMB: 16384,
  gpuScore: 3200,

  // Physiological baselines
  bandwidthMbps: 500,
  stabilityScore: 0.96,
  thermalHeadroom: 0.85,

  // A-B-A band identity (phenotype-declared, binary-first capable)
  band: "binary",

  // Presence + chunk/cache/prewarm hints
  presenceBand: "binary",
  chunkBudgetKB: 4096,
  cacheLines: 1024,
  prewarmSlots: 64,

  // Extended v30 capability envelope
  maxConcurrentJobs: 8,
  maxMarketplaceStreams: 6,
  maxReflexDepth: 4,
  maxPulseSendConcurrency: 4,

  // v30 device tiering
  tier: "ultra",
  kind: "sovereign-node",
  performanceIndex: 98
};

// ---------------------------------------------------------------------------
// configurePulseEarnPhenotype — deterministic override (v30)
// ---------------------------------------------------------------------------
export function configurePulseEarnPhenotype(config) {
  const cfg = config || {};
  phenotype = {
    ...phenotype,
    ...cfg,
    band: normalizeBand(cfg && cfg.band != null ? cfg.band : phenotype.band),
    presenceBand: normalizePresenceBand(
      cfg && cfg.presenceBand != null ? cfg.presenceBand : phenotype.presenceBand
    )
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: Build Device Pattern (v30 extended)
// ---------------------------------------------------------------------------
function buildDevicePattern(p) {
  return (
    `DEVICE::cpu:${p.cpuCores}` +
    `::mem:${p.memoryMB}` +
    `::cpuScore:${p.cpuScore}` +
    `::gpu:${p.gpuScore}` +
    `::vram:${p.vramMB}` +
    `::bw:${p.bandwidthMbps}` +
    `::stab:${p.stabilityScore}` +
    `::therm:${p.thermalHeadroom}` +
    `::tier:${p.tier}` +
    `::kind:${p.kind}` +
    `::perf:${p.performanceIndex}` +
    `::band:${normalizeBand(p.band)}` +
    `::presence:${normalizePresenceBand(p.presenceBand)}` +
    `::chunk:${p.chunkBudgetKB}` +
    `::cache:${p.cacheLines}` +
    `::prewarm:${p.prewarmSlots}` +
    `::jobs:${p.maxConcurrentJobs}` +
    `::streams:${p.maxMarketplaceStreams}` +
    `::reflex:${p.maxReflexDepth}` +
    `::pulse:${p.maxPulseSendConcurrency}`
  );
}

// ---------------------------------------------------------------------------
// INTERNAL: Build Signatures (v30)
// ---------------------------------------------------------------------------
function buildStructuralSignature(p) {
  return computeHash(
    `STRUCT::cpu:${p.cpuCores}::mem:${p.memoryMB}::cpuScore:${p.cpuScore}::gpu:${p.gpuScore}`
  );
}

function buildPhysiologicalSignature(p) {
  return computeHash(
    `PHYS::bw:${p.bandwidthMbps}::stab:${p.stabilityScore}::therm:${p.thermalHeadroom}`
  );
}

function buildPhenotypeSignature(p) {
  return computeHash(
    `PHENO::${p.cpuCores}::${p.memoryMB}::${p.cpuScore}::${p.gpuScore}::${p.bandwidthMbps}::${p.stabilityScore}::${p.thermalHeadroom}::${normalizeBand(p.band)}::${normalizePresenceBand(p.presenceBand)}::${p.tier}::${p.kind}::${p.performanceIndex}`
  );
}

function buildPresenceSignature(p) {
  return computeHash(
    `PRESENCE::band:${normalizePresenceBand(p.presenceBand)}::chunk:${p.chunkBudgetKB}::cache:${p.cacheLines}::prewarm:${p.prewarmSlots}`
  );
}

function buildBandSignature(p, cycleIndex) {
  const band = normalizeBand(p.band);
  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    band,
    presenceBand: normalizePresenceBand(p.presenceBand),
    cycleIndex,
    tier: p.tier,
    kind: p.kind
  };
  const classicString =
    `BAND::SKELETAL::${band}` +
    `::PRES:${normalizePresenceBand(p.presenceBand)}` +
    `::TIER:${p.tier}` +
    `::KIND:${p.kind}` +
    `::CYCLE:${cycleIndex}`;
  const dual = buildDualHashSignature("SKELETAL_BAND_V30", intelPayload, classicString);
  skeletalHealing.lastBandIntelSignature = dual.intel;
  return dual.classic;
}

// ---------------------------------------------------------------------------
// INTERNAL: A-B-A Binary + Wave Surfaces (v30 dualhash)
// ---------------------------------------------------------------------------
function buildBinaryField(p, cycleIndex) {
  const patternLen =
    String(p.id || "").length +
    String(p.gpuModel || "").length;

  const density = p.cpuCores + (p.memoryMB >> 10) + p.gpuScore + p.cpuScore;
  const surface = density + patternLen + cycleIndex;

  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    patternLen,
    density,
    cpuCores: p.cpuCores,
    memoryMB: p.memoryMB,
    cpuScore: p.cpuScore,
    gpuScore: p.gpuScore,
    cycleIndex,
    surface
  };

  const classicString =
    `BINARY_SKEL_V30::PAT:${patternLen}` +
    `::DENS:${density}` +
    `::CPU:${p.cpuCores}` +
    `::MEM:${p.memoryMB}` +
    `::GPU:${p.gpuScore}` +
    `::CYCLE:${cycleIndex}`;

  const dual = buildDualHashSignature("SKELETAL_BINARY_V30", intelPayload, classicString);

  return {
    binaryPhenotypeSignature: computeHash(`BPHENO::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_SKEL_V30::${surface}`),
    binarySurface: {
      patternLen,
      density,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1))),
    binaryIntelSignature: dual.intel,
    binaryClassicSignature: dual.classic
  };
}

function buildWaveField(p, cycleIndex) {
  const band = normalizeBand(p.band);
  const amplitude = p.gpuScore + p.cpuScore;
  const wavelength = p.bandwidthMbps;
  const phase = (p.cpuCores + (p.memoryMB >> 10) + cycleIndex) % 16;

  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    band,
    amplitude,
    wavelength,
    phase,
    cpuCores: p.cpuCores,
    memoryMB: p.memoryMB,
    gpuScore: p.gpuScore,
    cpuScore: p.cpuScore,
    cycleIndex
  };

  const classicString =
    `WAVE_SKEL_V30::BAND:${band}` +
    `::AMP:${amplitude}` +
    `::WL:${wavelength}` +
    `::PH:${phase}` +
    `::CYCLE:${cycleIndex}`;

  const dual = buildDualHashSignature("SKELETAL_WAVE_V30", intelPayload, classicString);

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    waveIntelSignature: dual.intel,
    waveClassicSignature: dual.classic
  };
}

// ---------------------------------------------------------------------------
//– INTERNAL: Presence + Chunk/Cache/Prewarm Field (v30)
// ---------------------------------------------------------------------------
function buildPresenceField(p, cycleIndex) {
  const presenceBand = normalizePresenceBand(p.presenceBand);
  const chunkBudget = p.chunkBudgetKB;
  const cacheLines = p.cacheLines;
  const prewarmSlots = p.prewarmSlots;

  const surface =
    chunkBudget +
    cacheLines * 2 +
    prewarmSlots * 3 +
    cycleIndex;

  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    presenceBand,
    chunkBudget,
    cacheLines,
    prewarmSlots,
    cycleIndex,
    surface
  };

  const classicString =
    `PRES_FIELD_V30::BAND:${presenceBand}` +
    `::CHUNK:${chunkBudget}` +
    `::CACHE:${cacheLines}` +
    `::PREWARM:${prewarmSlots}` +
    `::CYCLE:${cycleIndex}`;

  const dual = buildDualHashSignature("SKELETAL_PRESENCE_FIELD_V30", intelPayload, classicString);

  return {
    presenceVersion: "v30-Sovereign-Immortal",
    presenceBand,
    presenceSignature: dual.classic,
    presenceIntelSignature: dual.intel,
    chunkField: {
      chunkBudgetKB: chunkBudget,
      cacheLines,
      prewarmSlots,
      surface,
      parity: surface % 2 === 0 ? 0 : 1
    }
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: Advantage‑M30 Skeletal Field (v30-SOVEREIGN-IMMORTAL)
// ---------------------------------------------------------------------------
function buildSkeletalAdvantageField(p, presenceField, binaryField, waveField) {
  const gpuScore = p.gpuScore || 0;
  const bandwidth = p.bandwidthMbps || 0;
  const chunkBudget = p.chunkBudgetKB || 0;
  const cacheLines = p.cacheLines || 0;
  const prewarmSlots = p.prewarmSlots || 0;
  const cpuScore = p.cpuScore || 0;
  const thermalHeadroom = p.thermalHeadroom || 0;
  const tier = p.tier || "unknown";
  const perfIndex = p.performanceIndex || 0;

  const density = binaryField.density || 0;
  const amplitude = waveField.amplitude || 0;

  const presenceTier =
    presenceField.presenceBand === "binary" ? "presence_high" : "presence_mid";

  const tierBoost =
    tier === "ultra" ? 0.03 :
    tier === "high"  ? 0.02 :
    tier === "mid"   ? 0.01 :
    tier === "low"   ? 0.005 :
    0;

  const perfBoost =
    perfIndex >= 95 ? 0.03 :
    perfIndex >= 80 ? 0.02 :
    perfIndex >= 60 ? 0.01 :
    0;

  const presenceBoost =
    presenceTier === "presence_high" ? 0.02 :
    presenceTier === "presence_mid"  ? 0.01 :
    0.005;

  const rawAdvantageScore =
    gpuScore * 0.0006 +
    cpuScore * 0.0003 +
    bandwidth * 0.00025 +
    density * 0.000015 +
    amplitude * 0.000015 +
    (chunkBudget + cacheLines + prewarmSlots) * 0.0000015 +
    thermalHeadroom * 0.02 +
    tierBoost +
    perfBoost +
    presenceBoost;

  const advantageScore = clamp01(rawAdvantageScore);

  const advantageTier =
    advantageScore >= 0.92 ? 3 :
    advantageScore >= 0.65 ? 2 :
    advantageScore >= 0.30 ? 1 :
    0;

  const advantageField = {
    advantageVersion: "M-SKELETAL-30-SOVEREIGN",
    band: normalizeBand(p.band),
    presenceBand: presenceField.presenceBand,
    gpuScore,
    cpuScore,
    bandwidth,
    thermalHeadroom,
    tier,
    performanceIndex: perfIndex,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB: chunkBudget,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore,
    advantageTier,
    boosts: {
      presenceBoost,
      tierBoost,
      perfBoost
    }
  };

  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    gpuScore,
    cpuScore,
    bandwidth,
    thermalHeadroom,
    tier,
    performanceIndex: perfIndex,
    density,
    amplitude,
    chunkBudget,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore,
    advantageTier
  };

  const classicString =
    `ADV_SKEL_V30::GPU:${gpuScore}` +
    `::CPU:${cpuScore}` +
    `::BW:${bandwidth}` +
    `::THERM:${thermalHeadroom}` +
    `::TIER:${tier}` +
    `::PERF:${perfIndex}` +
    `::DENS:${density}` +
    `::AMP:${amplitude}` +
    `::CHUNK:${chunkBudget}` +
    `::CACHE:${cacheLines}` +
    `::PREWARM:${prewarmSlots}` +
    `::PRES:${presenceTier}` +
    `::SCORE:${advantageScore.toFixed(6)}` +
    `::T:${advantageTier}`;

  const dual = buildDualHashSignature("SKELETAL_ADVANTAGE_V30", intelPayload, classicString);

  skeletalHealing.lastAdvantageField = advantageField;
  skeletalHealing.lastAdvantageSignature = dual.classic;
  skeletalHealing.lastAdvantageIntelSig = dual.intel;

  return { advantageField, advantageSignature: dual.classic, advantageIntelSig: dual.intel };
}

// ---------------------------------------------------------------------------
// INTERNAL: Compatibility Field (v30-SOVEREIGN-IMMORTAL)
// ---------------------------------------------------------------------------
//
// This exposes how well this skeletal phenotype can cooperate with:
//   - Muscle System
//   - Nervous System
//   - Lymph Nodes
//   - Endocrine System
//   - Embassy Ledger / Market Layer
//   - Earn Signal Factoring / Chunk / Prewarm
//
function buildSkeletalCompatibilityField(p, advantageField) {
  const cpu = p.cpuCores;
  const mem = p.memoryMB;
  const gpu = p.gpuScore;
  const bw = p.bandwidthMbps;
  const stab = p.stabilityScore;
  const tier = p.tier || "unknown";
  const perf = p.performanceIndex || 0;

  const muscleAffinity =
    (gpu * 0.0006) +
    (cpu * 0.00025) +
    (advantageField.binaryDensity * 0.000015);

  const nervousAffinity =
    (bw * 0.00035) +
    (stab * 0.025) +
    (advantageField.waveAmplitude * 0.000015);

  const lymphAffinity =
    (bw * 0.00025) +
    (advantageField.chunkBudgetKB * 0.0000015);

  const endocrineAffinity =
    (stab * 0.035) +
    (advantageField.cacheLines * 0.000015);

  const embassyAffinity =
    (cpu * 0.00012) +
    (mem * 0.0000012) +
    (advantageField.presenceTier === "presence_high" ? 0.012 : 0.004) +
    (tier === "ultra" ? 0.01 : 0) +
    (perf >= 90 ? 0.01 : 0);

  const factoringAffinity =
    advantageField.advantageScore * 0.4 +
    (advantageField.presenceTier === "presence_high" ? 0.1 : 0.05);

  const compatibilityField = {
    compatibilityVersion: "SKELETAL_COMPAT_V30_SOV",
    muscleAffinity,
    nervousAffinity,
    lymphAffinity,
    endocrineAffinity,
    embassyAffinity,
    factoringAffinity,
    tier,
    performanceIndex: perf
  };

  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    muscleAffinity,
    nervousAffinity,
    lymphAffinity,
    endocrineAffinity,
    embassyAffinity,
    factoringAffinity,
    tier,
    performanceIndex: perf
  };

  const classicString =
    `COMP_SKEL_V30::MUS:${muscleAffinity.toFixed(6)}` +
    `::NER:${nervousAffinity.toFixed(6)}` +
    `::LYM:${lymphAffinity.toFixed(6)}` +
    `::END:${endocrineAffinity.toFixed(6)}` +
    `::EMB:${embassyAffinity.toFixed(6)}` +
    `::FACT:${factoringAffinity.toFixed(6)}` +
    `::TIER:${tier}` +
    `::PERF:${perf}`;

  const dual = buildDualHashSignature("SKELETAL_COMPAT_V30", intelPayload, classicString);

  skeletalHealing.lastCompatibilityField = compatibilityField;
  skeletalHealing.lastCompatibilitySignature = dual.classic;
  skeletalHealing.lastCompatibilityIntelSig = dual.intel;

  return { compatibilityField, compatibilitySignature: dual.classic, compatibilityIntelSig: dual.intel };
}

// ---------------------------------------------------------------------------
// INTERNAL: Chunk / Cache / Prewarm Plan — Device‑Level (v30)
// ---------------------------------------------------------------------------
function buildSkeletalChunkPrewarmPlan(p, advantageField, compatibilityField, cycleIndex) {
  let priorityLabel = "idle";

  if (advantageField.advantageScore >= 0.8) {
    priorityLabel = "high";
  } else if (advantageField.advantageScore >= 0.5) {
    priorityLabel = "medium";
  } else if (advantageField.advantageScore > 0) {
    priorityLabel = "low";
  }

  if (compatibilityField.factoringAffinity >= 0.5 && priorityLabel !== "high") {
    priorityLabel = "medium";
  }

  const devicePerf = p.performanceIndex || 0;
  const deviceTier = p.tier || "unknown";
  const deviceKind = p.kind || "generic";

  const deviceBoost =
    devicePerf >= 95 ? "ultra" :
    devicePerf >= 80 ? "high" :
    devicePerf >= 50 ? "medium" :
    "low";

  const planSurface =
    (p.chunkBudgetKB || 0) +
    (p.cacheLines || 0) * 2 +
    (p.prewarmSlots || 0) * 3 +
    devicePerf +
    cycleIndex;

  const planScore = clamp01(
    advantageField.advantageScore * 0.5 +
    compatibilityField.factoringAffinity * 0.3 +
    (devicePerf / 100) * 0.2
  );

  const planTier =
    planScore >= 0.9 ? "plan_critical" :
    planScore >= 0.6 ? "plan_high" :
    planScore >= 0.3 ? "plan_normal" :
    "plan_low";

  const intelPayload = {
    version: "v30-SOVEREIGN-IMMORTAL",
    priorityLabel,
    planSurface,
    planScore,
    planTier,
    devicePerf,
    deviceTier,
    deviceKind,
    deviceBoost,
    advantageScore: advantageField.advantageScore,
    factoringAffinity: compatibilityField.factoringAffinity,
    cycleIndex
  };

  const classicString =
    `SKEL_CHUNK_PLAN_V30::PRIO:${priorityLabel}` +
    `::TIER:${planTier}` +
    `::SURF:${planSurface}` +
    `::SCORE:${planScore.toFixed(6)}` +
    `::DPERF:${devicePerf}` +
    `::DTIER:${deviceTier}` +
    `::DKIND:${deviceKind}` +
    `::DBOOST:${deviceBoost}` +
    `::ADV:${advantageField.advantageScore.toFixed(6)}` +
    `::FACT:${compatibilityField.factoringAffinity.toFixed(6)}` +
    `::CYCLE:${cycleIndex}`;

  const dual = buildDualHashSignature("SKELETAL_CHUNK_PLAN_V30", intelPayload, classicString);

  const plan = {
    planVersion: "v30-SOVEREIGN-IMMORTAL-SKELETAL",
    priorityLabel,
    planTier,
    planSurface,
    planScore,
    deviceTier,
    deviceKind,
    deviceBoost,
    chunks: {
      deviceEnvelope: true,
      phenotypePassport: true,
      advantageEnvelope: true,
      compatibilityEnvelope: true
    },
    cache: {
      deviceProfile: true,
      skeletalDiagnostics: true,
      performanceCache: deviceBoost === "ultra" || deviceBoost === "high"
    },
    prewarm: {
      metabolismOrgan: advantageField.advantageScore >= 0.4,
      lymphaticHandshake: compatibilityField.lymphAffinity >= 0.2,
      immuneSystemScan: compatibilityField.endocrineAffinity >= 0.25,
      factoringLayer: compatibilityField.factoringAffinity >= 0.4
    },
    meta: {
      cycleIndex,
      devicePerf,
      deviceTier,
      deviceKind
    },
    chunkPlanSignature: dual.classic,
    chunkPlanIntelSignature: dual.intel
  };

  skeletalHealing.lastChunkPrewarmPlan = plan;
  skeletalHealing.lastChunkPrewarmSignature = dual.classic;
  skeletalHealing.lastChunkPrewarmIntelSig = dual.intel;

  return plan;
}

// ---------------------------------------------------------------------------
// MAIN EXPORT — getPulseEarnDeviceProfile()
// Phenotype Passport + Structural Identity + Advantage‑M30 + Compatibility v30
// ---------------------------------------------------------------------------
export function getPulseEarnDeviceProfile() {
  skeletalHealing.cycleCount++;

  const band = normalizeBand(phenotype.band);
  const cycleIndex = skeletalHealing.cycleCount;

  const structuralSignature = buildStructuralSignature(phenotype);
  const physiologicalSignature = buildPhysiologicalSignature(phenotype);
  const phenotypeSignature = buildPhenotypeSignature(phenotype);
  const presenceSignature = buildPresenceSignature(phenotype);
  const devicePattern = buildDevicePattern(phenotype);
  const bandSignature = buildBandSignature(phenotype, cycleIndex);
  const binaryField = buildBinaryField(phenotype, cycleIndex);
  const waveField = buildWaveField(phenotype, cycleIndex);
  const presenceField = buildPresenceField(phenotype, cycleIndex);
  const { advantageField, advantageSignature, advantageIntelSig } =
    buildSkeletalAdvantageField(phenotype, presenceField, binaryField, waveField);
  const { compatibilityField, compatibilitySignature, compatibilityIntelSig } =
    buildSkeletalCompatibilityField(phenotype, advantageField);
  const chunkPrewarmPlan =
    buildSkeletalChunkPrewarmPlan(phenotype, advantageField, compatibilityField, cycleIndex);

  const phenotypeIntelSig = buildDualHashSignature("SKELETAL_PHENOTYPE_V30_SOV", {
    cpuCores: phenotype.cpuCores,
    memoryMB: phenotype.memoryMB,
    cpuScore: phenotype.cpuScore,
    gpuScore: phenotype.gpuScore,
    bandwidthMbps: phenotype.bandwidthMbps,
    stabilityScore: phenotype.stabilityScore,
    thermalHeadroom: phenotype.thermalHeadroom,
    band,
    presenceBand: presenceField.presenceBand,
    tier: phenotype.tier,
    kind: phenotype.kind,
    performanceIndex: phenotype.performanceIndex
  }, `PHENO_V30::${devicePattern}`);

  const structuralIntelSig = buildDualHashSignature("SKELETAL_STRUCT_V30_SOV", {
    cpuCores: phenotype.cpuCores,
    memoryMB: phenotype.memoryMB,
    cpuScore: phenotype.cpuScore,
    gpuScore: phenotype.gpuScore
  }, `STRUCT_V30::CPU:${phenotype.cpuCores}::MEM:${phenotype.memoryMB}::CPU_SCORE:${phenotype.cpuScore}::GPU:${phenotype.gpuScore}`);

  const physIntelSig = buildDualHashSignature("SKELETAL_PHYS_V30_SOV", {
    bandwidthMbps: phenotype.bandwidthMbps,
    stabilityScore: phenotype.stabilityScore,
    thermalHeadroom: phenotype.thermalHeadroom
  }, `PHYS_V30::BW:${phenotype.bandwidthMbps}::STAB:${phenotype.stabilityScore}::THERM:${phenotype.thermalHeadroom}`);

  const presenceIntelSig = buildDualHashSignature("SKELETAL_PRESENCE_V30_SOV", {
    presenceBand: presenceField.presenceBand,
    chunkBudgetKB: presenceField.chunkField.chunkBudgetKB,
    cacheLines: presenceField.chunkField.cacheLines,
    prewarmSlots: presenceField.chunkField.prewarmSlots
  }, `PRES_V30::BAND:${presenceField.presenceBand}::CHUNK:${presenceField.chunkField.chunkBudgetKB}::CACHE:${presenceField.chunkField.cacheLines}::PREWARM:${presenceField.chunkField.prewarmSlots}`);

  const profile = {
    version: "v30-Sovereign-Immortal-INTEL++",

    id: phenotype.id,

    // Structural capacity
    cpuCores: phenotype.cpuCores,
    memoryMB: phenotype.memoryMB,
    cpuScore: phenotype.cpuScore,

    // Muscular potential
    gpuModel: phenotype.gpuModel,
    vramMB: phenotype.vramMB,
    gpuScore: phenotype.gpuScore,

    // Physiological baselines
    bandwidthMbps: phenotype.bandwidthMbps,
    stabilityScore: phenotype.stabilityScore,
    thermalHeadroom: phenotype.thermalHeadroom,

    // Device tiering
    tier: phenotype.tier,
    kind: phenotype.kind,
    performanceIndex: phenotype.performanceIndex,

    // A-B-A band identity
    band,
    bandSignature,
    bandIntelSignature: skeletalHealing.lastBandIntelSignature,

    // Presence identity
    presenceVersion: presenceField.presenceVersion,
    presenceBand: presenceField.presenceBand,
    presenceSignature,
    presenceIntelSignature: presenceField.presenceIntelSignature,

    // v30 signatures
    structuralSignature,
    physiologicalSignature,
    phenotypeSignature,

    // v30 pattern surface
    devicePattern,

    // A-B-A binary + wave surfaces
    binaryField,
    waveField,

    // Presence + chunk/cache/prewarm field
    chunkField: presenceField.chunkField,

    // Skeletal Advantage‑M30 field
    advantageField,
    advantageSignature,
    advantageIntelSig,

    // Skeletal Compatibility field
    compatibilityField,
    compatibilitySignature,
    compatibilityIntelSig,

    // Skeletal Chunk/Prewarm plan (device-level)
    chunkPrewarmPlan,

    // Extended capability envelope
    maxConcurrentJobs: phenotype.maxConcurrentJobs,
    maxMarketplaceStreams: phenotype.maxMarketplaceStreams,
    maxReflexDepth: phenotype.maxReflexDepth,
    maxPulseSendConcurrency: phenotype.maxPulseSendConcurrency,

    // v30 INTEL surfaces
    phenotypeIntelSig: phenotypeIntelSig.intel,
    structuralIntelSig: structuralIntelSig.intel,
    physIntelSig: physIntelSig.intel,
    presenceIntelSig: presenceIntelSig.intel
  };

  // Update healing metadata
  skeletalHealing.lastProfile = profile;
  skeletalHealing.lastGpuModel = phenotype.gpuModel;
  skeletalHealing.lastGpuScore = phenotype.gpuScore;
  skeletalHealing.lastBandwidthMbps = phenotype.bandwidthMbps;
  skeletalHealing.lastStabilityScore = phenotype.stabilityScore;
  skeletalHealing.lastCpuCores = phenotype.cpuCores;
  skeletalHealing.lastMemoryMB = phenotype.memoryMB;

  skeletalHealing.lastStructuralSignature = structuralSignature;
  skeletalHealing.lastPhysiologicalSignature = physiologicalSignature;
  skeletalHealing.lastPhenotypeSignature = phenotypeSignature;
  skeletalHealing.lastPresenceSignature = presenceSignature;
  skeletalHealing.lastDevicePattern = devicePattern;

  skeletalHealing.lastBand = band;
  skeletalHealing.lastBandSignature = bandSignature;
  skeletalHealing.lastBinaryField = binaryField;
  skeletalHealing.lastWaveField = waveField;

  skeletalHealing.lastPresenceBand = presenceField.presenceBand;
  skeletalHealing.lastPresenceField = presenceField;
  skeletalHealing.lastChunkField = presenceField.chunkField;

  skeletalHealing.lastPhenotypeIntelSig = phenotypeIntelSig;
  skeletalHealing.lastStructuralIntelSig = structuralIntelSig;
  skeletalHealing.lastPhysIntelSig = physIntelSig;
  skeletalHealing.lastPresenceIntelSig = presenceIntelSig;

  skeletalHealing.lastDeviceTier = phenotype.tier;
  skeletalHealing.lastDeviceKind = phenotype.kind;
  skeletalHealing.lastPerformanceIndex = phenotype.performanceIndex;
  skeletalHealing.lastThermalHeadroom = phenotype.thermalHeadroom;

  return profile;
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Phenotype Health Report (v30-SOVEREIGN-IMMORTAL)
// ---------------------------------------------------------------------------
export function getPulseEarnSkeletalHealingState() {
  return { ...skeletalHealing };
}

PulseRealm.EarnSkeletalSystem = {
  getPulseEarnSkeletalHealingState,
  getPulseEarnDeviceProfile,
  skeletalHealing
}