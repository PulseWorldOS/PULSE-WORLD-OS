// ============================================================================
// FILE: .../PulseEarnMktConsulate-v31-IMMORTAL-BINARYWAVE-WORLDBANK.js
// LAYER: THE CONSULATE (v31 IMMORTAL + INTEL + DualHash + Presence + Advantage
//        + Chunk + Artery + BinaryWave + GPU/Binary-Earn Bias + WorldBank)
// ROLE:
//   • Sits on top of EmbassyLedger (all marketplaces).
//   • Deduplicates / factors / prioritizes jobs across the whole compute mesh.
//   • Classifies BinaryWave (symbolic vs binary / GPU‑biased).
//   • Pushes consolidated earnings into PulseWorldBank (Stripe‑aligned).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {
  PulseEarnMktEmbassyLedger_v30 as PulseEarnMktEmbassyLedger_v31
} from "./PulseEarnMktEmbassyLedger-v31.js";
import { PulseSignalPort, __getPulseNetRegistry} from "../../PULSE-PROTOCOL/PULSE-PROTOCOL.js";


// ============================================================================
// META
// ============================================================================

export const PulseEarnMktConsulateMeta_v31 = Object.freeze({
  identity: "PulseEarnMktConsulate",
  version: "v31-IMMORTAL-BINARYWAVE-WORLDBANK",
  role: "EARN_CONSULATE",
  schemaVersion: "v1",
  guarantees: {
    dualBandAware: true,
    meshAware: true,
    gpuBiasAware: true,
    embassyLedgerAware: true,
    worldBankAware: true
  }
});

// ============================================================================
// HASH / DUAL SIGNATURE CORE
// ============================================================================

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
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function stableStringify(obj) {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(",")}]`;
  const keys = Object.keys(obj).sort();
  return `{${keys.map(k => `"${k}":${stableStringify(obj[k])}`).join(",")}}`;
}

// ============================================================================
// STATE
// ============================================================================

export const consulateState = {
  resultCache: new Map(),        // fingerprint → { result, cycleIndex, marketplaceId }
  fingerprintIndex: new Map(),   // fingerprint → { fingerprint, firstSeenCycle, ... }
  factorIndex: new Map(),        // factorKey → Set(fingerprint)
  marketplaceStats: new Map(),   // marketplaceId → stats

  stats: {
    totalJobsSeen: 0,
    totalUniqueJobs: 0,
    totalEliminatedJobs: 0,
    totalReusedResults: 0,
    totalFactoredJobs: 0,
    lastCycleJobsIn: 0,
    lastCycleJobsOut: 0,
    totalBankSettlements: 0,
    totalBankAmount: 0
  },

  cycleIndex: 0,

  lastCycleSignatureIntel: null,
  lastCycleSignatureClassic: null,
  lastFingerprintSignatureIntel: null,
  lastFingerprintSignatureClassic: null,
  lastFactorSignatureIntel: null,
  lastFactorSignatureClassic: null,
  lastPrioritySignatureIntel: null,
  lastPrioritySignatureClassic: null,
  lastMarketplaceStatsSignatureIntel: null,
  lastMarketplaceStatsSignatureClassic: null,
  lastResultCacheSignatureIntel: null,
  lastResultCacheSignatureClassic: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,
  lastBand: "symbolic",
  lastWorldBand: "world",
  lastBinaryWaveCarrier: null,
  lastBinaryWaveSignatureIntel: null,
  lastBinaryWaveSignatureClassic: null,
  lastArterySignatureIntel: null,
  lastArterySignatureClassic: null,

  lastBankSettlement: null,
  lastBankSettlementSignatureIntel: null,
  lastBankSettlementSignatureClassic: null
};

// ============================================================================
// PRESENCE / ADVANTAGE / CHUNK
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(consulateStateRef, globalHints = {}) {
  const jobsIn = consulateStateRef.stats.lastCycleJobsIn || 0;
  const jobsOut = consulateStateRef.stats.lastCycleJobsOut || 0;
  const unique = consulateStateRef.stats.totalUniqueJobs || 0;

  const internalComposite =
    jobsIn * 0.0005 +
    jobsOut * 0.0007 +
    unique * 0.0001;

  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalPressure = Math.floor(internalComposite * 1000);
  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;
  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "consulatePresence-v31",
    version: PulseEarnMktConsulateMeta_v31.version,
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    jobsIn,
    jobsOut,
    unique,
    cycleIndex: consulateStateRef.cycleIndex
  };

  const classicString =
    `CONSULATE_PRESENCE_V31::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("CONSULATE_PRESENCE_V31", intelPayload, classicString);

  return {
    presenceVersion: PulseEarnMktConsulateMeta_v31.version,
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    jobsIn,
    jobsOut,
    unique,
    cycleIndex: consulateStateRef.cycleIndex,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic,
    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "consulate",
    devicePresence: ghP.devicePresence || "earn-router",
    regionId: region.regionId || "consulate-region",
    regionTag: region.regionTag || "consulate-region",
    castleId: castle.castleId || "consulate-castle"
  };
}

function buildAdvantageField(consulateStateRef, presenceField, globalHints = {}) {
  const fpCount = consulateStateRef.fingerprintIndex.size;
  const factorCount = consulateStateRef.factorIndex.size;
  const cacheSize = consulateStateRef.resultCache.size;

  const baseScore =
    fpCount * 0.00006 +
    factorCount * 0.00004 +
    cacheSize * 0.00003;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.025 :
    presenceField.presenceTier === "high" ? 0.018 :
    presenceField.presenceTier === "elevated" ? 0.012 :
    presenceField.presenceTier === "soft" ? 0.006 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.06) advantageTier = 3;
  else if (advantageScore >= 0.025) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "consulateAdvantage-v31",
    version: "C-31.0",
    fpCount,
    factorCount,
    cacheSize,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel
  };

  const classicString =
    `CONSULATE_ADVANTAGE_V31::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("CONSULATE_ADVANTAGE_V31", intelPayload, classicString);

  return {
    advantageVersion: "C-31.0",
    fpCount,
    factorCount,
    cacheSize,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

function buildChunkPrewarmPlan(consulateStateRef, presenceField, advantageField) {
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

  const priority = basePriority + advantageBoost;

  const intelPayload = {
    kind: "consulateChunkPlan-v31",
    version: PulseEarnMktConsulateMeta_v31.version,
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `CONSULATE_CHUNK_PLAN_V31::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("CONSULATE_CHUNK_PLAN_V31", intelPayload, classicString);

  return {
    planVersion: PulseEarnMktConsulateMeta_v31.version,
    priority,
    band: presenceField.presenceTier,
    chunks: {
      consulateEnvelope: true,
      fingerprintIndex: true,
      factorIndex: true,
      resultCache: true
    },
    cache: {
      consulateDiagnostics: true,
      marketplaceStats: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      foragerLayer: true,
      courierLayer: true,
      brokerLayer: true,
      ambassadorLayer: true,
      auctioneerLayer: true,
      consulateLayer: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// BINARY WAVE / GPU BIAS
// ============================================================================

function buildBinaryWaveCarrierForConsulate(presenceField, advantageField) {
  const avgGpuScore = (() => {
    let count = 0;
    for (const [_fp] of consulateState.fingerprintIndex.entries()) {
      count++;
    }
    if (!count) return 0;
    return advantageField.advantageTier * 300;
  })();

  const gpuPressure = clamp01(avgGpuScore / 1200);
  const gpuTier =
    avgGpuScore >= 900 ? "elite" :
    avgGpuScore >= 600 ? "high" :
    avgGpuScore >= 300 ? "medium" :
    avgGpuScore > 0 ? "low" :
    "none";

  const band = gpuTier === "none" ? "symbolic" : "binary";
  const worldBand = "world";
  const mode =
    band === "binary"
      ? (gpuTier === "elite" || gpuTier === "high"
          ? "burst"
          : gpuTier === "medium"
          ? "deep"
          : "base")
      : "symbolic";

  const carrier = {
    version: "BinaryWave-v31",
    band,
    worldBand,
    mode,
    gpuTier,
    gpuPressure,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    cycleIndex: consulateState.cycleIndex
  };

  const intelPayload = {
    kind: "consulateBinaryWave-v31",
    band,
    worldBand,
    mode,
    gpuTier,
    gpuPressure,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    cycleIndex: consulateState.cycleIndex
  };

  const classicString =
    `CONSULATE_BINARYWAVE_V31::${band}::WORLD::${worldBand}::GPU_TIER::${gpuTier}`;

  const sig = buildDualHashSignature("CONSULATE_BINARYWAVE_V31", intelPayload, classicString);

  consulateState.lastBand = band;
  consulateState.lastWorldBand = worldBand;
  consulateState.lastBinaryWaveCarrier = carrier;
  consulateState.lastBinaryWaveSignatureIntel = sig.intel;
  consulateState.lastBinaryWaveSignatureClassic = sig.classic;

  return { carrier, signatureIntel: sig.intel, signatureClassic: sig.classic };
}

// ============================================================================
// JOB FINGERPRINTING / FACTORS / PRIORITY
// ============================================================================

function fingerprintJob(job) {
  const core = {
    marketplaceId: job.marketplaceId || job._sourceMarketplaceId || null,
    cpuRequired: job.cpuRequired ?? null,
    memoryRequired: job.memoryRequired ?? null,
    estimatedSeconds: job.estimatedSeconds ?? null,
    minGpuScore: job.minGpuScore ?? null,
    bandwidthNeededMbps: job.bandwidthNeededMbps ?? null
  };
  const fp = stableStringify(core);
  const sig = buildDualHashSignature("CONSULATE_FP_V31", { core }, fp);
  consulateState.lastFingerprintSignatureIntel = sig.intel;
  consulateState.lastFingerprintSignatureClassic = sig.classic;
  return fp;
}

function extractFactors(job) {
  const f = [];
  const cpu = job.cpuRequired != null ? `cpu:${job.cpuRequired}` : null;
  const mem = job.memoryRequired != null ? `mem:${job.memoryRequired}` : null;
  const sec = job.estimatedSeconds != null ? `sec:${job.estimatedSeconds}` : null;
  const gpu = job.minGpuScore != null ? `gpu:${job.minGpuScore}` : null;
  const bw = job.bandwidthNeededMbps != null ? `bw:${job.bandwidthNeededMbps}` : null;
  const mkt = job.marketplaceId ? `mkt:${job.marketplaceId}` : null;
  [cpu, mem, sec, gpu, bw, mkt].forEach(x => x && f.push(x));
  if (f.length) {
    const sig = buildDualHashSignature("CONSULATE_FACTORS_V31", { f }, f.join("|"));
    consulateState.lastFactorSignatureIntel = sig.intel;
    consulateState.lastFactorSignatureClassic = sig.classic;
  }
  return f;
}

function indexFactors(fp, factors) {
  for (const f of factors) {
    if (!consulateState.factorIndex.has(f)) {
      consulateState.factorIndex.set(f, new Set());
    }
    consulateState.factorIndex.get(f).add(fp);
  }
}

function computeMoneySlope(job) {
  const payout = Number(job.payout ?? job.earnAmount ?? job.amount ?? 0);
  const sec = Number(job.estimatedSeconds ?? 0);
  if (payout <= 0 || sec <= 0) return 0;
  return payout / sec;
}

function getMarketplaceProfile(id) {
  switch (id) {
    case "runpod": return { base: 1.12, gpu: 1.3, short: 1.1, bw: 1.0 };
    case "spheron": return { base: 1.0, gpu: 0.95, short: 1.35, bw: 1.0 };
    case "salad": return { base: 1.06, gpu: 1.12, short: 1.0, bw: 1.0 };
    case "akash": return { base: 0.97, gpu: 1.08, short: 1.0, bw: 1.0 };
    case "vast": return { base: 1.18, gpu: 1.35, short: 1.12, bw: 1.0 };
    default: return { base: 1.0, gpu: 1.0, short: 1.0, bw: 1.0 };
  }
}

function computeAbaModifiers(job) {
  const band = job._abaBand || null;
  const density = Number(job._abaBinaryDensity ?? 0);
  const amp = Number(job._abaWaveAmplitude ?? 0);
  const bandFactor = band === "binary" ? 1.03 : 1.0;
  const binaryFactor = 1.0 + Math.min(density / 900, 0.04);
  const waveFactor = 1.0 + Math.min(amp / 900, 0.025);
  return { bandFactor, binaryFactor, waveFactor };
}

function computePriorityScore(job) {
  const slope = computeMoneySlope(job);
  if (slope <= 0) return 0;
  const profile = getMarketplaceProfile(job.marketplaceId);
  const { bandFactor, binaryFactor, waveFactor } = computeAbaModifiers(job);
  const gpuScore = Number(job.minGpuScore ?? 0);
  const gpuBoost = 1.0 + Math.min(gpuScore / 900, profile.gpu - 1.0);
  const binaryEarnBias = job._abaBand === "binary" ? 1.05 : 1.0;
  const score =
    slope *
    profile.base *
    bandFactor *
    binaryFactor *
    waveFactor *
    gpuBoost *
    binaryEarnBias;
  const sig = buildDualHashSignature(
    "CONSULATE_PRIORITY_V31",
    { jobId: job.id, score },
    `${job.id}::${score}`
  );
  consulateState.lastPrioritySignatureIntel = sig.intel;
  consulateState.lastPrioritySignatureClassic = sig.classic;
  return score;
}

function updateMarketplaceStats(jobs) {
  const grouped = new Map();
  for (const job of jobs) {
    const id = job.marketplaceId || "unknown";
    if (!grouped.has(id)) grouped.set(id, []);
    grouped.get(id).push(job);
  }
  const snapshot = {};
  for (const [id, list] of grouped.entries()) {
    const slopes = list.map(computeMoneySlope).filter(x => x > 0);
    const avg = slopes.length ? slopes.reduce((a, b) => a + b, 0) / slopes.length : 0;
    const prev = consulateState.marketplaceStats.get(id) || {
      jobsSeen: 0,
      avgSlope: 0,
      lastCycleJobs: 0
    };
    const jobsSeen = prev.jobsSeen + list.length;
    const blended =
      jobsSeen > 0
        ? (prev.avgSlope * prev.jobsSeen + avg * list.length) / jobsSeen
        : avg;
    const entry = {
      jobsSeen,
      avgSlope: blended,
      lastCycleJobs: list.length
    };
    consulateState.marketplaceStats.set(id, entry);
    snapshot[id] = entry;
  }
  const sig = buildDualHashSignature(
    "CONSULATE_MKT_STATS_V31",
    { snapshot },
    JSON.stringify(snapshot)
  );
  consulateState.lastMarketplaceStatsSignatureIntel = sig.intel;
  consulateState.lastMarketplaceStatsSignatureClassic = sig.classic;
}

// ============================================================================
// EMBASSY LEDGER INTEGRATION
// ============================================================================

function fetchJobsFromAllMarketplaces(deviceId, globalHints = {}) {
  const { marketplaces } = PulseEarnMktEmbassyLedger_v31;
  const all = [];
  for (const adapter of marketplaces) {
    try {
      const raw = adapter.fetchJobs
        ? adapter.fetchJobs(globalHints)
        : [];
      let jobs;
      if (Array.isArray(raw)) jobs = raw;
      else if (raw && Array.isArray(raw.jobs)) jobs = raw.jobs;
      else jobs = [];
      for (const j of jobs) {
        all.push({
          ...j,
          _sourceMarketplaceId: adapter.id
        });
      }
    } catch {
      // ignore adapter failure
    }
  }
  return all;
}

// ============================================================================
// JOB PROCESSING PIPELINE
// ============================================================================

function processJobsIntelligently(jobs) {
  const unique = [];
  const { stats, resultCache, fingerprintIndex } = consulateState;

  stats.lastCycleJobsIn = jobs.length;
  stats.totalJobsSeen += jobs.length;

  for (const job of jobs) {
    const fp = fingerprintJob(job);
    if (fingerprintIndex.has(fp)) {
      stats.totalEliminatedJobs++;
      const cached = resultCache.get(fp);
      if (cached) {
        stats.totalReusedResults++;
        unique.push({
          ...job,
          _router: {
            fingerprint: fp,
            hasCachedResult: true,
            cachedResultMeta: {
              cycleIndex: cached.cycleIndex,
              marketplaceId: cached.marketplaceId
            }
          }
        });
      }
      continue;
    }

    fingerprintIndex.set(fp, {
      fingerprint: fp,
      firstSeenCycle: consulateState.cycleIndex
    });
    stats.totalUniqueJobs++;

    const factors = extractFactors(job);
    if (factors.length) {
      indexFactors(fp, factors);
      stats.totalFactoredJobs++;
    }

    unique.push({
      ...job,
      _router: {
        fingerprint: fp,
        hasCachedResult: false
      }
    });
  }

  stats.lastCycleJobsOut = unique.length;
  updateMarketplaceStats(unique);
  return unique;
}

function sortJobsByPriority(jobs) {
  const scored = jobs.map(j => ({ job: j, score: computePriorityScore(j) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.job);
}

// ============================================================================
// ARTERY SNAPSHOT (BINARYWAVE + PRESENCE/ADVANTAGE/CHUNK)
// ============================================================================

export function getConsulateArterySnapshotV5_v31(globalHints = {}) {
  const presenceField = consulateState.lastPresenceField ||
    buildPresenceField(consulateState, globalHints);
  const advantageField = consulateState.lastAdvantageField ||
    buildAdvantageField(consulateState, presenceField, globalHints);
  const chunkPlan = consulateState.lastChunkPrewarmPlan ||
    buildChunkPrewarmPlan(consulateState, presenceField, advantageField);

  const { carrier, signatureIntel, signatureClassic } =
    consulateState.lastBinaryWaveCarrier
      ? {
          carrier: consulateState.lastBinaryWaveCarrier,
          signatureIntel: consulateState.lastBinaryWaveSignatureIntel,
          signatureClassic: consulateState.lastBinaryWaveSignatureClassic
        }
      : buildBinaryWaveCarrierForConsulate(presenceField, advantageField);

  const band = carrier.band;
  const worldBand = carrier.worldBand;

  const intelPayload = {
    kind: "consulateArtery-v31",
    cycleIndex: consulateState.cycleIndex,
    band,
    worldBand,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    stats: { ...consulateState.stats },
    binaryWave: carrier
  };

  const classicString =
    `CONSULATE_ARTERY_V31::${consulateState.cycleIndex}::${presenceField.presenceTier}`;

  const sig = buildDualHashSignature("CONSULATE_ARTERY_V31", intelPayload, classicString);

  consulateState.lastBand = band;
  consulateState.lastWorldBand = worldBand;
  consulateState.lastArterySignatureIntel = sig.intel;
  consulateState.lastArterySignatureClassic = sig.classic;

  return Object.freeze({
    organism: {
      pressure: presenceField.meshPressureIndex + presenceField.castleLoadLevel,
      presenceTier: presenceField.presenceTier
    },
    stats: { ...consulateState.stats },
    bands: {
      band,
      worldBand
    },
    presence: presenceField,
    advantage: advantageField,
    chunkPlan,
    binaryWaveCarrier: carrier,
    binaryWaveSignatureIntel: signatureIntel,
    binaryWaveSignatureClassic: signatureClassic,
    meta: {
      version: PulseEarnMktConsulateMeta_v31.version,
      epoch: "v31-IMMORTAL-BINARYWAVE",
      identity: "CONSULATE_BINARYWAVE_V31",
      arterySignatureIntel: sig.intel,
      arterySignatureClassic: sig.classic
    }
  });
}

// ============================================================================
// BANK INTEGRATION
// ============================================================================

function extractJobAmount(job) {
  if (typeof job.earnAmount === "number") return job.earnAmount;
  if (typeof job.payout === "number") return job.payout;
  if (typeof job.amount === "number") return job.amount;
  if (typeof job.reward === "number") return job.reward;
  if (job.meta && typeof job.meta.earnAmount === "number") return job.meta.earnAmount;
  return 0;
}

async function settleEarningsToWorldBank_v31(jobs, options = {}) {
  const {
    currency = "USD",
    label = "PulseEarnConsulate",
    settlementKind = "cycle"
  } = options;

  let totalAmount = 0;
  for (const job of jobs) {
    totalAmount += extractJobAmount(job);
  }

  const settlement = {
    kind: "PulseEarnMktConsulateSettlement",
    version: PulseEarnMktConsulateMeta_v31.version,
    cycleIndex: consulateState.cycleIndex,
    jobCount: jobs.length,
    totalAmount,
    currency,
    label,
    settlementKind,
    timestamp: PulseRealm.PulseNOW
  };

  const classicString =
    `CONSULATE_BANK_SETTLEMENT_V31::${settlementKind}::${settlement.cycleIndex}::${totalAmount}::${currency}`;

  const sig = buildDualHashSignature("CONSULATE_BANK_SETTLEMENT_V31", settlement, classicString);

  consulateState.lastBankSettlement = settlement;
  consulateState.lastBankSettlementSignatureIntel = sig.intel;
  consulateState.lastBankSettlementSignatureClassic = sig.classic;

  consulateState.stats.totalBankSettlements += 1;
  consulateState.stats.totalBankAmount += totalAmount;

  if (totalAmount > 0 && PulseRealm.PulseWorldBank && typeof PulseRealm.PulseWorldBank.credit === "function") {
    await PulseRealm.PulseWorldBank.credit({
      amount: totalAmount,
      currency,
      source: label,
      meta: {
        cycleIndex: settlement.cycleIndex,
        jobCount: settlement.jobCount,
        settlementKind,
        consulateVersion: PulseEarnMktConsulateMeta_v31.version
      }
    });
  }

  return {
    settlement,
    settlementSignatureIntel: sig.intel,
    settlementSignatureClassic: sig.classic
  };
}

// ============================================================================
// MAIN ROUTING ENTRYPOINT (EMBASSY → CONSULATE → BANK)
// ============================================================================

async function getRoutedJobs_v31(deviceId, globalHints = {}, bankOptions = {}) {
  consulateState.cycleIndex++;

  const raw = fetchJobsFromAllMarketplaces(deviceId, globalHints);
  const unique = processJobsIntelligently(raw);
  const sorted = sortJobsByPriority(unique);

  const cycleSig = buildDualHashSignature(
    "CONSULATE_CYCLE_V31",
    { cycleIndex: consulateState.cycleIndex },
    `CYCLE_V31::${consulateState.cycleIndex}`
  );
  consulateState.lastCycleSignatureIntel = cycleSig.intel;
  consulateState.lastCycleSignatureClassic = cycleSig.classic;

  const cacheSig = buildDualHashSignature(
    "CONSULATE_RESULT_CACHE_V31",
    { size: consulateState.resultCache.size },
    `RESULT_CACHE_V31::${consulateState.resultCache.size}`
  );
  consulateState.lastResultCacheSignatureIntel = cacheSig.intel;
  consulateState.lastResultCacheSignatureClassic = cacheSig.classic;

  const presenceField = buildPresenceField(consulateState, globalHints);
  const advantageField = buildAdvantageField(consulateState, presenceField, globalHints);
  const chunkPlan = buildChunkPrewarmPlan(consulateState, presenceField, advantageField);

  consulateState.lastPresenceField = presenceField;
  consulateState.lastAdvantageField = advantageField;
  consulateState.lastChunkPrewarmPlan = chunkPlan;

  buildBinaryWaveCarrierForConsulate(presenceField, advantageField);

  await settleEarningsToWorldBank_v31(sorted, bankOptions);

  return sorted;
}

// ============================================================================
// RESULT RECORDING
// ============================================================================

function recordJobResult_v31(job, result) {
  if (!job) return;
  const fp = job._router.fingerprint || fingerprintJob(job);
  if (!fp) return;
  consulateState.resultCache.set(fp, {
    result,
    cycleIndex: consulateState.cycleIndex,
    marketplaceId: job.marketplaceId || job._sourceMarketplaceId
  });
  const cacheSig = buildDualHashSignature(
    "CONSULATE_RESULT_CACHE_V31",
    { size: consulateState.resultCache.size },
    `RESULT_CACHE_V31::${consulateState.resultCache.size}`
  );
  consulateState.lastResultCacheSignatureIntel = cacheSig.intel;
  consulateState.lastResultCacheSignatureClassic = cacheSig.classic;
}

// ============================================================================
// HEALING / DIAGNOSTICS
// ============================================================================

export function getPulseEarnMktConsulateHealingState_v31() {
  const marketplaceStats = {};
  for (const [id, v] of consulateState.marketplaceStats.entries()) {
    marketplaceStats[id] = { ...v };
  }
  return {
    stats: { ...consulateState.stats },
    resultCacheSize: consulateState.resultCache.size,
    fingerprintCount: consulateState.fingerprintIndex.size,
    factorKeyCount: consulateState.factorIndex.size,
    marketplaceStats,
    cycleIndex: consulateState.cycleIndex,
    lastCycleSignatureIntel: consulateState.lastCycleSignatureIntel,
    lastCycleSignatureClassic: consulateState.lastCycleSignatureClassic,
    lastFingerprintSignatureIntel: consulateState.lastFingerprintSignatureIntel,
    lastFingerprintSignatureClassic: consulateState.lastFingerprintSignatureClassic,
    lastFactorSignatureIntel: consulateState.lastFactorSignatureIntel,
    lastFactorSignatureClassic: consulateState.lastFactorSignatureClassic,
    lastPrioritySignatureIntel: consulateState.lastPrioritySignatureIntel,
    lastPrioritySignatureClassic: consulateState.lastPrioritySignatureClassic,
    lastMarketplaceStatsSignatureIntel: consulateState.lastMarketplaceStatsSignatureIntel,
    lastMarketplaceStatsSignatureClassic: consulateState.lastMarketplaceStatsSignatureClassic,
    lastResultCacheSignatureIntel: consulateState.lastResultCacheSignatureIntel,
    lastResultCacheSignatureClassic: consulateState.lastResultCacheSignatureClassic,
    lastPresenceField: consulateState.lastPresenceField,
    lastAdvantageField: consulateState.lastAdvantageField,
    lastChunkPrewarmPlan: consulateState.lastChunkPrewarmPlan,
    lastBand: consulateState.lastBand,
    lastWorldBand: consulateState.lastWorldBand,
    lastBinaryWaveCarrier: consulateState.lastBinaryWaveCarrier,
    lastBinaryWaveSignatureIntel: consulateState.lastBinaryWaveSignatureIntel,
    lastBinaryWaveSignatureClassic: consulateState.lastBinaryWaveSignatureClassic,
    lastArterySignatureIntel: consulateState.lastArterySignatureIntel,
    lastArterySignatureClassic: consulateState.lastArterySignatureClassic,
    lastBankSettlement: consulateState.lastBankSettlement,
    lastBankSettlementSignatureIntel: consulateState.lastBankSettlementSignatureIntel,
    lastBankSettlementSignatureClassic: consulateState.lastBankSettlementSignatureClassic
  };
}

// ============================================================================
// META + EXPORT
// ============================================================================

export const PulseEarnMktConsulate_v31 = {
  meta: PulseEarnMktConsulateMeta_v31,
  getRoutedJobs: getRoutedJobs_v31,
  recordJobResult: recordJobResult_v31,
  getHealingState: getPulseEarnMktConsulateHealingState_v31,
  getArterySnapshotV5: getConsulateArterySnapshotV5_v31
};

  PulseRealm.PulseEarnMktConsulate = {
    PulseEarnMktConsulate_v31,
    getPulseEarnMktConsulateHealingState_v31,
    getConsulateArterySnapshotV5_v31,
    recordJobResult_v31,
    getRoutedJobs_v31,
    PulseEarnMktConsulateMeta_v31,
    consulateState
  }