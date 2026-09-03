// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-EARN/
//       PulseEarnGenome-v31-Immortal-INTEL-AGGRESSIVE-PLUS.js
// LAYER: THE GENOME CORE (v31-Immortal-INTEL-AGGRESSIVE-PLUS)
// (Immutable DNA Sequence + Cross‑Organism Law + v31 Presence/Advantage/Compute Surfaces + Proof Bridge)
// ============================================================================
//
// ROLE (v31-Immortal-INTEL-AGGRESSIVE-PLUS):
//   THE GENOME CORE — the immutable DNA of Pulse‑Earn v31++.
//   • Defines the canonical v13 job structure (genetic sequence) — schema remains v13, immutable.
//   • Establishes the cross‑organism treaty all subsystems must obey.
//   • Guarantees compatibility across every v31 Earn organ that still speaks v13 job DNA.
//   • Serves as the constitutional backbone of job identity and metabolism.
//   • Emits v31‑Presence‑IMMORTAL genome signatures + binary/wave/advantage/chunk surfaces.
//   • Emits v31 computeProfile + pulseIntelligence for the job schema itself (metadata‑only).
//   • Uses computeHashIntelligence as primary hash, with computeHash as deterministic fallback.
//   • Integrates with PulseProofBridge for core memory / proof surfaces.
//   • v31 AGGRESSIVE‑PLUS: integrates capabilityModel (gpu/miner/air/performanceRatio) as metadata.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
// CONTRACT (v31-Immortal-INTEL-AGGRESSIVE-PLUS):
//   • PURE STATIC SCHEMA + PURE METADATA ENGINE — no job logic, no runtime behavior on jobs.
//   • NO dynamic fields, NO optional structural keys in the schema.
//   • NO timestamps, NO environment‑dependent fields.
//   • Immutable schema across versions unless explicitly ratified.
//   • v31‑IMMORTAL‑INTEL‑AGGRESSIVE‑PLUS adds ONLY metadata + signatures OUTSIDE the schema.
//   • Presence/advantage/chunk/computeProfile/pulseIntelligence DO NOT change the schema.
//   • NO async, NO network, NO randomness, NO filesystem.
// ============================================================================





// ============================================================================
// INTERNAL: Deterministic Hash Helpers (v31-Immortal-INTEL-AGGRESSIVE-PLUS)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(str, context = "") {
  const s = String(str || "");
  const c = String(context || "");
  const combined = s + "::" + c;

  let h = 2166136261 >>> 0;
  for (let i = 0; i < combined.length; i++) {
    h ^= combined.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
    h = (h + ((i + 1) * 131)) >>> 0;
  }

  const reduced = h % 100000;
  return `hi${reduced}`;
}

function hashIntelligent(str, context) {
  try {
    return computeHashIntelligence(str, context);
  } catch (_e) {
    return computeHash(str + "::" + String(context || ""));
  }
}

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

// ============================================================================
// HEALING METADATA — Genome Constitutional Health Log (v31-Immortal-INTEL-AGGRESSIVE-PLUS)
// ============================================================================

export const genomeHealing = {
  cycleCount: 0,
  lastBand: "symbolic",
  lastBandSignature: null,

  lastPresenceField: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastAdvantageField: null,
  lastChunkPlan: null,
  lastComputeProfile: null,
  lastPulseIntelligence: null,

  lastGenomeSignature: null,
  lastConstitutionalMetadata: null,

  lastProofEventType: null,
  lastProofPayloadSize: null,
  lastError: null
};

// ============================================================================
// THE IMMUTABLE GENOME CORE — v13 JOB SCHEMA (STRUCTURE CANNOT CHANGE)
// ============================================================================

export const PulseEarnJobSchemaV13 = {
  id: "string",
  marketplaceId: "string",

  payout: "number",
  cpuRequired: "number",
  memoryRequired: "number",
  estimatedSeconds: "number",

  minGpuScore: "number",
  bandwidthNeededMbps: "number",

  _abaBand: "string",
  _abaBinaryDensity: "number",
  _abaWaveAmplitude: "number",

  presenceField: "PresenceFieldV13",
  advantageField: "AdvantageFieldV13",
  chunkPlan: "ChunkPrewarmPlanV13"
};

// ============================================================================
// v31 Presence / Advantage / Chunk / ComputeProfile / Intelligence
// ============================================================================

let genomeCycle = 0;

function buildPresenceFieldV31(globalHints = {}) {
  genomeCycle++;
  genomeHealing.cycleCount = genomeCycle;

  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalComposite = genomeCycle * 0.0001;
  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const presenceField = {
    presenceVersion: "v31.0-Presence-Immortal-INTEL-AGGRESSIVE-PLUS",
    presenceEpoch: 31,
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "genome-core",
    presenceLayer: "GENOME_CORE",
    presenceBandMode: "dual-band-v31",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "genome-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "genome-region",
    castleId: castle.castleId || "genome-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle: genomeCycle,

    presenceSignature: hashIntelligent(
      `GENOME_PRESENCE_V31::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`,
      "presenceFieldV31"
    )
  };

  genomeHealing.lastPresenceField = presenceField;
  return presenceField;
}

function buildBinaryFieldV31(schemaString, band) {
  const size = schemaString.length;
  const density = size + genomeCycle;
  const surface = density + size;

  const binaryField = {
    binaryGenomeSignature: hashIntelligent(
      `BGENOME_V31::${band}::${surface}`,
      "binaryGenomeV31"
    ),
    binarySurfaceSignature: hashIntelligent(
      `BGENOME_SURF_V31::${surface}`,
      "binarySurfaceV31"
    ),
    binarySurface: {
      size,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  genomeHealing.lastBinaryField = binaryField;
  return binaryField;
}

function buildWaveFieldV31(schemaString, band) {
  const size = schemaString.length;
  const amplitude = size + genomeCycle;
  const wavelength = genomeCycle + 1;
  const phase = (size + genomeCycle) % 16;

  const waveField = {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  genomeHealing.lastWaveField = waveField;
  return waveField;
}

function buildAdvantageFieldV31(binaryField, waveField, presenceField, globalHints = {}) {
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

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const advantageField = {
    advantageVersion: "C-31.0-INTEL-AGGRESSIVE-PLUS",
    advantageEpoch: 31,
    advantageProfile: "Earn-v31++",
    advantageScore,
    advantageTier,
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0
  };

  genomeHealing.lastAdvantageField = advantageField;
  return advantageField;
}

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

  const chunkPlan = {
    planVersion: "v31.0-GenomeCore-AdvantageC-INTEL-AGGRESSIVE-PLUS",
    planEpoch: 31,
    planContinuanceAware: true,
    planGenomeAware: true,
    priority: basePriority + advantageBoost,
    band: presenceField.presenceTier,
    chunks: {
      genomeConstitution: true,
      jobSchemaBlueprint: true
    },
    cache: {
      genomeDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    }
  };

  genomeHealing.lastChunkPlan = chunkPlan;
  return chunkPlan;
}

function deriveFactoringSignalForGenomeV31({
  meshPressureIndex = 0,
  size = 0,
  cachePriority = "normal"
}) {
  const pressure = clamp01(meshPressureIndex / 100);
  const bigSchema = size >= 1024;
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (bigSchema || criticalCache || highPressure) return 1;
  return 0;
}

function buildComputeProfileV31({
  band,
  globalHints = {},
  presenceField,
  size = 0,
  capabilityModel = {}
}) {
  const b = normalizeBand(band);
  const hints = globalHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};

  const cachePriority = normalizeCachePriority(cacheHints.priority);
  const prewarmNeeded = !!prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignalForGenomeV31({
    meshPressureIndex,
    size,
    cachePriority
  });

  const deepJobCandidate = size >= 2048 || cachePriority === "critical";

  const performanceRatio = capabilityModel.performanceRatio ?? 1;
  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const airScore = capabilityModel.airScore ?? 0;

  const gpuPreferred = gpuScore > 0;
  const minerPreferred = minerScore > 0;
  const airPreferred = airScore > 0;

  const computeProfile = {
    computeProfileVersion: "v31.0-GenomeCore-INTEL-AGGRESSIVE-PLUS",
    computeProfileEpoch: 31,
    routeBand: b,
    fallbackBandLevel: hints.fallbackBandLevel ?? 0,
    chunkAggression: (hints.chunkHints && hints.chunkHints.chunkAggression) ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    performanceRatio,
    deepJobCandidate,
    multiInstanceHint: deepJobCandidate,

    gpuPreferred,
    minerPreferred,
    airPreferred,
    gpuScore,
    minerScore,
    airScore
  };

  genomeHealing.lastComputeProfile = computeProfile;
  return computeProfile;
}

function computePulseIntelligenceForGenomeV31({
  band,
  presenceField,
  advantageField,
  computeProfile,
  size
}) {
  const bandIsBinary = band === "binary" ? 1 : 0;
  const factoring = computeProfile.factoringSignal ? 1 : 0;

  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const sizeWeight = Math.max(0, Math.min(size / 4096, 1));

  const perfRatio = computeProfile.performanceRatio || 1;
  const gpuAffinity = computeProfile.gpuPreferred ? 1 : 0;
  const minerAffinity = computeProfile.minerPreferred ? 0.6 : 0;
  const airAffinity = computeProfile.airPreferred ? 0.4 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.25 +
      presenceWeight * 0.2 +
      sizeWeight * 0.15 +
      factoring * 0.15 +
      perfRatio * 0.1 +
      gpuAffinity * 0.05 +
      minerAffinity * 0.05 +
      airAffinity * 0.05,
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
      (bandIsBinary ? 0.2 : 0) +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  const pulseIntelligence = {
    pulseIntelligenceVersion: "v31.0-GenomeCore-INTEL-AGGRESSIVE-PLUS",
    pulseIntelligenceEpoch: 31,
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    size,
    performanceRatio: perfRatio,
    gpuPreferred: computeProfile.gpuPreferred,
    minerPreferred: computeProfile.minerPreferred,
    airPreferred: computeProfile.airPreferred
  };

  genomeHealing.lastPulseIntelligence = pulseIntelligence;
  return pulseIntelligence;
}

// ============================================================================
// PUBLIC API — Genome Constitutional Surfaces (v31-Immortal-INTEL-AGGRESSIVE-PLUS)
// ============================================================================

export function buildPulseEarnGenomeConstitutionV31(
  dualBandContext = {},
  globalHints = {},
  capabilityModel = {}
) {
  const band = normalizeBand(dualBandContext.band || "symbolic");
  genomeHealing.lastBand = band;
  genomeHealing.lastBandSignature = hashIntelligent(
    `GENOME_BAND_V31::${band}`,
    "genomeBandV31"
  );

  const schemaString = JSON.stringify(PulseEarnJobSchemaV13);
  const size = schemaString.length;

  const presenceField = buildPresenceFieldV31(globalHints);
  const binaryField = buildBinaryFieldV31(schemaString, band);
  const waveField = buildWaveFieldV31(schemaString, band);
  const advantageField = buildAdvantageFieldV31(
    binaryField,
    waveField,
    presenceField,
    globalHints
  );
  const chunkPlan = buildChunkPrewarmPlanV31(presenceField, advantageField);
  const computeProfile = buildComputeProfileV31({
    band,
    globalHints,
    presenceField,
    size,
    capabilityModel
  });
  const pulseIntelligence = computePulseIntelligenceForGenomeV31({
    band,
    presenceField,
    advantageField,
    computeProfile,
    size
  });

  const genomeSignature = hashIntelligent(
    `GENOME_CORE_V31::${band}::${schemaString.length}`,
    "genomeCoreV31"
  );

  const constitutionalMetadata = {
    genomeVersion: "v31-Immortal-INTEL-AGGRESSIVE-PLUS",
    genomeEpoch: 31,
    schemaVersion: "v13.0-Presence-Immortal",
    band,
    genomeSignature,
    presenceSignature: presenceField.presenceSignature,
    binarySignature: binaryField.binaryGenomeSignature,
    waveSignature: hashIntelligent(
      `WAVE_GENOME_V31::${waveField.amplitude}::${waveField.wavelength}::${waveField.phase}`,
      "waveGenomeV31"
    ),
    advantageSignature: hashIntelligent(
      `ADV_GENOME_V31::${advantageField.advantageScore}::${advantageField.advantageTier}`,
      "advGenomeV31"
    ),
    computeProfileSignature: hashIntelligent(
      `CP_GENOME_V31::${computeProfile.routeBand}::${computeProfile.cachePriority}::${computeProfile.factoringSignal}::${computeProfile.performanceRatio}`,
      "cpGenomeV31"
    ),
    pulseIntelligenceSignature: hashIntelligent(
      `PI_GENOME_V31::${pulseIntelligence.computeTier}::${pulseIntelligence.solvednessScore}`,
      "piGenomeV31"
    )
  };

  genomeHealing.lastGenomeSignature = genomeSignature;
  genomeHealing.lastConstitutionalMetadata = constitutionalMetadata;
  genomeHealing.lastError = null;

  const proofPayload = {
    band,
    size,
    cycle: genomeCycle,
    presenceField,
    binaryField,
    waveField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    constitutionalMetadata
  };

  genomeHealing.lastProofEventType = "constitution-v31";
  genomeHealing.lastProofPayloadSize = JSON.stringify(proofPayload).length;

  return {
    genomeSignatures: {
      genomeSignature,
      bandSignature: genomeHealing.lastBandSignature
    },
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    constitutionalMetadata,
    genomeHealingState: { ...genomeHealing }
  };
}

// ============================================================================
// v31‑IMMORTAL‑INTEL‑AGGRESSIVE‑PLUS GENOME METADATA (NON‑STRUCTURAL, SAFE, IMMUTABLE)
// ============================================================================

export const PulseEarnGenomeMetadataV31 = {
  genomeVersion: "31-Immortal-INTEL-AGGRESSIVE-PLUS",
  genomeEpoch: 31,
  genomeIdentity: "PulseEarn-GenomeCore-v31-Immortal-INTEL-AGGRESSIVE-PLUS",
  genomeLayer: "GENOME_CORE",
  genomeRole: "Immutable DNA Sequence + Cross‑Organism Law (v13 schema, v31 surfaces + proof)",

  constitutionalPattern:
    "GENOME_V13::" +
    "id:string::marketplaceId:string::" +
    "payout:number::cpuRequired:number::memoryRequired:number::estimatedSeconds:number::" +
    "minGpuScore:number::bandwidthNeededMbps:number::" +
    "_abaBand:string::_abaBinaryDensity:number::_abaWaveAmplitude:number::" +
    "presenceField:PresenceFieldV13::advantageField:AdvantageFieldV13::chunkPlan:ChunkPrewarmPlanV13",

  genomeSignature: computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
  genomeSignatureV31: hashIntelligent(
    "GENOME_CORE_V31::" + JSON.stringify(PulseEarnJobSchemaV13),
    "genomeMetadataV31"
  ),

  bandAware: true,
  dualBandReady: true,
  bandSignature_symbolic: hashIntelligent("band::symbolic::v31", "bandSymbolicV31"),
  bandSignature_binary: hashIntelligent("band::binary::v31", "bandBinaryV31"),

  binaryGenomeSignature: hashIntelligent(
    "binary::v31::" + JSON.stringify(PulseEarnJobSchemaV13),
    "binaryGenomeMetaV31"
  ),

  binaryFieldSignatures: {
    id: hashIntelligent("binary::v31::id:string", "field:id"),
    marketplaceId: hashIntelligent("binary::v31::marketplaceId:string", "field:marketplaceId"),

    payout: hashIntelligent("binary::v31::payout:number", "field:payout"),
    cpuRequired: hashIntelligent("binary::v31::cpuRequired:number", "field:cpuRequired"),
    memoryRequired: hashIntelligent("binary::v31::memoryRequired:number", "field:memoryRequired"),
    estimatedSeconds: hashIntelligent("binary::v31::estimatedSeconds:number", "field:estimatedSeconds"),

    minGpuScore: hashIntelligent("binary::v31::minGpuScore:number", "field:minGpuScore"),
    bandwidthNeededMbps: hashIntelligent("binary::v31::bandwidthNeededMbps:number", "field:bandwidthNeededMbps"),

    _abaBand: hashIntelligent("binary::v31::_abaBand:string", "field:_abaBand"),
    _abaBinaryDensity: hashIntelligent("binary::v31::_abaBinaryDensity:number", "field:_abaBinaryDensity"),
    _abaWaveAmplitude: hashIntelligent("binary::v31::_abaWaveAmplitude:number", "field:_abaWaveAmplitude"),

    presenceField: hashIntelligent("binary::v31::presenceField:PresenceFieldV13", "field:presenceField"),
    advantageField: hashIntelligent("binary::v31::advantageField:AdvantageFieldV13", "field:advantageField"),
    chunkPlan: hashIntelligent("binary::v31::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlan")
  },

  waveSignature: hashIntelligent(
    "wave::v31::" + computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
    "waveMetaV31"
  ),

  waveField: {
    wavelength: 31,
    amplitude: 13,
    phase: (31 + 13) % 16,
    mode: "symbolic-wave"
  },

  presenceFieldSignatures: {
    presenceVersionSignature: hashIntelligent("presence::v31::presenceVersion", "presence:versionV31"),
    presenceEpochSignature: hashIntelligent("presence::v31::presenceEpoch", "presence:epochV31"),
    presenceTierSignature: hashIntelligent("presence::v31::presenceTier", "presence:tierV31"),
    bandPresenceSignature: hashIntelligent("presence::v31::bandPresence", "presence:bandV31"),
    routerPresenceSignature: hashIntelligent("presence::v31::routerPresence", "presence:routerV31"),
    devicePresenceSignature: hashIntelligent("presence::v31::devicePresence", "presence:deviceV31"),
    meshPresenceSignature: hashIntelligent("presence::v31::meshPresence", "presence:meshV31"),
    castlePresenceSignature: hashIntelligent("presence::v31::castlePresence", "presence:castleV31"),
    regionPresenceSignature: hashIntelligent("presence::v31::regionPresence", "presence:regionV31"),
    regionIdSignature: hashIntelligent("presence::v31::regionId", "presence:regionIdV31"),
    castleIdSignature: hashIntelligent("presence::v31::castleId", "presence:castleIdV31"),
    castleLoadLevelSignature: hashIntelligent("presence::v31::castleLoadLevel", "presence:castleLoadV31"),
    meshStrengthSignature: hashIntelligent("presence::v31::meshStrength", "presence:meshStrengthV31"),
    meshPressureIndexSignature: hashIntelligent("presence::v31::meshPressureIndex", "presence:meshPressureV31"),
    cycleSignature: hashIntelligent("presence::v31::cycle", "presence:cycleV31")
  },

  advantageFieldSignatures: {
    advantageVersionSignature: hashIntelligent("advantage::v31::version", "adv:versionV31"),
    advantageEpochSignature: hashIntelligent("advantage::v31::epoch", "adv:epochV31"),
    advantageProfileSignature: hashIntelligent("advantage::v31::profile", "adv:profileV31"),
    advantageScoreSignature: hashIntelligent("advantage::v31::score", "adv:scoreV31"),
    advantageTierSignature: hashIntelligent("advantage::v31::tier", "adv:tierV31"),
    fallbackBandLevelSignature: hashIntelligent("advantage::v31::fallbackBandLevel", "adv:fallbackBandLevelV31")
  },

  hintsFieldSignatures: {
    fallbackBandLevelSignature: hashIntelligent("hints::v31::fallbackBandLevel", "hints:fallbackBandLevelV31"),
    chunkHintsSignature: hashIntelligent("hints::v31::chunkHints", "hints:chunkHintsV31"),
    cacheHintsSignature: hashIntelligent("hints::v31::cacheHints", "hints:cacheHintsV31"),
    prewarmHintsSignature: hashIntelligent("hints::v31::prewarmHints", "hints:prewarmHintsV31"),
    coldStartHintsSignature: hashIntelligent("hints::v31::coldStartHints", "hints:coldStartHintsV31")
  },

  computeProfileSignatures: {
    computeProfileVersionSignature: hashIntelligent("cp::v31::version", "cp:versionV31"),
    computeProfileEpochSignature: hashIntelligent("cp::v31::epoch", "cp:epochV31"),
    routeBandSignature: hashIntelligent("cp::v31::routeBand", "cp:routeBandV31"),
    cachePrioritySignature: hashIntelligent("cp::v31::cachePriority", "cp:cachePriorityV31"),
    prewarmNeededSignature: hashIntelligent("cp::v31::prewarmNeeded", "cp:prewarmNeededV31"),
    factoringSignalSignature: hashIntelligent("cp::v31::factoringSignal", "cp:factoringV31"),
    deepJobCandidateSignature: hashIntelligent("cp::v31::deepJobCandidate", "cp:deepJobV31"),
    multiInstanceHintSignature: hashIntelligent("cp::v31::multiInstanceHint", "cp:multiInstanceV31"),
    performanceRatioSignature: hashIntelligent("cp::v31::performanceRatio", "cp:perfRatioV31")
  },

  pulseIntelligenceSignatures: {
    piVersionSignature: hashIntelligent("pi::v31::version", "pi:versionV31"),
    piEpochSignature: hashIntelligent("pi::v31::epoch", "pi:epochV31"),
    solvednessScoreSignature: hashIntelligent("pi::v31::solvednessScore", "pi:solvednessV31"),
    computeTierSignature: hashIntelligent("pi::v31::computeTier", "pi:computeTierV31"),
    readinessScoreSignature: hashIntelligent("pi::v31::readinessScore", "pi:readinessV31"),
    bandSignature: hashIntelligent("pi::v31::band", "pi:bandV31"),
    advantageTierSignature: hashIntelligent("pi::v31::advantageTier", "pi:advTierV31"),
    sizeSignature: hashIntelligent("pi::v31::size", "pi:sizeV31"),
    performanceRatioSignature: hashIntelligent("pi::v31::performanceRatio", "pi:perfRatioV31")
  },

  fieldSignatures: {
    id: hashIntelligent("v31::id:string", "field:idV31"),
    marketplaceId: hashIntelligent("v31::marketplaceId:string", "field:marketplaceIdV31"),

    payout: hashIntelligent("v31::payout:number", "field:payoutV31"),
    cpuRequired: hashIntelligent("v31::cpuRequired:number", "field:cpuRequiredV31"),
    memoryRequired: hashIntelligent("v31::memoryRequired:number", "field:memoryRequiredV31"),
    estimatedSeconds: hashIntelligent("v31::estimatedSeconds:number", "field:estimatedSecondsV31"),

    minGpuScore: hashIntelligent("v31::minGpuScore:number", "field:minGpuScoreV31"),
    bandwidthNeededMbps: hashIntelligent("v31::bandwidthNeededMbps:number", "field:bandwidthNeededMbpsV31"),

    _abaBand: hashIntelligent("v31::_abaBand:string", "field:_abaBandV31"),
    _abaBinaryDensity: hashIntelligent("v31::_abaBinaryDensity:number", "field:_abaBinaryDensityV31"),
    _abaWaveAmplitude: hashIntelligent("v31::_abaWaveAmplitude:number", "field:_abaWaveAmplitudeV31"),

    presenceField: hashIntelligent("v31::presenceField:PresenceFieldV13", "field:presenceFieldV31"),
    advantageField: hashIntelligent("v31::advantageField:AdvantageFieldV13", "field:advantageFieldV31"),
    chunkPlan: hashIntelligent("v31::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlanV31")
  }
};

// ============================================================================
// Healing State Export
// ============================================================================

export function getPulseEarnGenomeHealingStateV31() {
  return { ...genomeHealing };
}

export default {
  PulseEarnJobSchemaV13,
  buildPulseEarnGenomeConstitutionV31,
  PulseEarnGenomeMetadataV31,
  getPulseEarnGenomeHealingStateV31
};

PulseRealm.EarnGenome = {
  PulseEarnJobSchemaV13,
  buildPulseEarnGenomeConstitutionV31,
  PulseEarnGenomeMetadataV31,
  getPulseEarnGenomeHealingStateV31,
  genomeHealing
}