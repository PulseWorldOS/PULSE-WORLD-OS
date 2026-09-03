// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-EARN/PulseEarnMktEmbassyLedger-v31-IMMORTAL-INTEL-OMEGA.js
// LAYER: THE EMBASSY LEDGER v31++ (CENTRAL EARN PROCESSOR + PROCESSWORKER TOWER)
// ROLE:
//   • Authoritative registry of all Pulse‑Earn marketplace organs/tests.
//   • Central Earn processor: orchestration over all adapters.
//   • Deterministic presence/advantage/chunk + GPU/Band + ProcessWorker envelopes.
//   • DualHash (classic + intel) for every artery: adapter, roster, cycle, worker, batch.
//   • v31++: ProcessWorker tower, DeltaMemoryResolver integration, multi-band compute profile.
//   • Dual‑mode: v30‑compatible API surface, v31 internals and signatures.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// TEST‑BASED ADAPTERS (each test auto‑imports its organ + GPU ProcessWorker)
import {
  PulseEarnMktAmbassadorTestMeta_v31 as PulseEarnMktAmbassadorTestMeta,
  runPulseEarnMktAmbassadorTest_v31 as runPulseEarnMktAmbassadorTest
} from "./PulseEarnMktAmbassadorTest-v31.js"; // Akash

import {
  PulseEarnMktAuctioneerTestMeta_v31 as PulseEarnMktAuctioneerTestMeta,
  runPulseEarnMktAuctioneerTest
} from "./PulseEarnMktAuctioneerTest-v31.js"; // Vast

import {
  PulseEarnMktForagerTestMeta_v31 as PulseEarnMktForagerTestMeta,
  runPulseEarnMktForagerTest_v31 as runPulseEarnMktForagerTest
} from "./PulseEarnMktForagerTest-v31.js"; // Salad

import {
  PulseEarnMktGolemTestMeta_v31 as PulseEarnMktGolemTestMeta,
  runPulseEarnMktGolemTest_v31 as runPulseEarnMktGolemTest
} from "./PulseEarnMktGolemTest-v31.js"; // Golem

import {
  PulseEarnMktExecTestMeta_v31 as PulseEarnMktExecTestMeta,
  runPulseEarnMktExecTest_v31 as runPulseEarnMktExecTest
} from "./PulseEarnMktExecTest-v31.js"; // iExec

import {
  PulseEarnMktAnkrTestMeta_v31 as PulseEarnMktAnkrTestMeta,
  runPulseEarnMktAnkrTest_v31 as runPulseEarnMktAnkrTest
} from "./PulseEarnMktAnkrTest-v31.js"; // Ankr

import {
  PulseEarnMktFluenceTestMeta_v31 as PulseEarnMktFluenceTestMeta,
  runPulseEarnMktFluenceTest_v31 as runPulseEarnMktFluenceTest
} from "./PulseEarnMktFluenceTest-v31.js"; // Fluence

// ORGANS WITHOUT TESTS YET (Courier, Broker stay organ‑based for now)
import { PulseEarnMktBroker_v30 as PulseEarnMktBroker } from "./PulseEarnMktBroker-v30.js";   // RunPod
import { PulseEarnMktCourier } from "./PulseEarnMktCourier-v30.js";                            // Spheron

// ============================================================================
// HASH + NORMALIZATION CORE
// ============================================================================

function computeClassicHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeIntelHash(payload) {
  const s = JSON.stringify(payload || {});
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function dualSig(label, intelPayload, classicString) {
  return {
    intel: computeIntelHash({ label, intelPayload, classicString }),
    classic: computeClassicHash(`${label}::${classicString}`)
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// PRESENCE / ADVANTAGE / CHUNK CORE — v31 unified
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function inferAdapterProfile(adapter) {
  const id = adapter.id || "";
  const name = adapter.name || "";

  const lowerId = String(id).toLowerCase();
  const lowerName = String(name).toLowerCase();

  const gpuCapable =
    lowerId.includes("runpod") ||
    lowerId.includes("vast") ||
    lowerId.includes("akash") ||
    lowerId.includes("spheron") ||
    lowerId.includes("salad") ||
    lowerId.includes("golem") ||
    lowerId.includes("exec") ||
    lowerId.includes("ankr") ||
    lowerId.includes("fluence") ||
    lowerName.includes("gpu") ||
    lowerName.includes("compute");

  const preferredBand =
    normalizeBand(adapter.defaultBand || adapter.band || "symbolic");

  const marketplaceKind =
    lowerId.includes("runpod") ? "runpod" :
    lowerId.includes("vast") ? "vast" :
    lowerId.includes("akash") ? "akash" :
    lowerId.includes("spheron") ? "spheron" :
    lowerId.includes("salad") ? "salad" :
    lowerId.includes("golem") ? "golem" :
    lowerId.includes("exec") ? "iexec" :
    lowerId.includes("ankr") ? "ankr" :
    lowerId.includes("fluence") ? "fluence" :
    "generic";

  return {
    gpuCapable,
    preferredBand,
    marketplaceKind
  };
}

function buildAdapterPresenceField(name, adapter, cycleIndex, globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const idLen = (adapter.id || "").length;
  const roleLen = (adapter.name || "").length;

  const profile = inferAdapterProfile(adapter);

  const internalComposite =
    idLen * 0.001 +
    roleLen * 0.001 +
    cycleIndex * 0.0001 +
    (profile.gpuCapable ? 0.01 : 0);

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "embassyAdapterPresence",
    version: "v31-IMMORTAL-INTEL-OMEGA",
    adapterName: name,
    adapterId: adapter.id || null,
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    idLen,
    roleLen,
    cycleIndex,
    gpuCapable: profile.gpuCapable,
    preferredBand: profile.preferredBand,
    marketplaceKind: profile.marketplaceKind
  };

  const classicString =
    `EMBASSY_PRESENCE::${name}::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = dualSig("EMBASSY_ADAPTER_PRESENCE_V31", intelPayload, classicString);

  return {
    presenceVersion: "v31-IMMORTAL-INTEL-OMEGA",
    presenceTier,

    adapterName: name,
    adapterId: adapter.id || null,

    bandPresence: ghP.bandPresence || profile.preferredBand || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "embassy",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "embassy-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "embassy-region",
    castleId: castle.castleId || "embassy-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    idLen,
    roleLen,
    cycleIndex,

    gpuCapable: profile.gpuCapable,
    preferredBand: profile.preferredBand,
    marketplaceKind: profile.marketplaceKind,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

function buildAdapterAdvantageField(name, adapter, band, cycleIndex, presenceField, globalHints = {}) {
  const hasPing = typeof adapter.ping === "function";
  const hasFetch = typeof adapter.fetchJobs === "function";
  const hasSubmit = typeof adapter.submitResult === "function";
  const hasTestRunner = typeof adapter.runTest === "function";

  const methodScore =
    (hasPing ? 1 : 0) +
    (hasFetch ? 1 : 0) +
    (hasSubmit ? 1 : 0) +
    (hasTestRunner ? 1 : 0);

  const profile = inferAdapterProfile(adapter);
  const bandNorm = normalizeBand(band || profile.preferredBand || "symbolic");

  const bandScore = bandNorm === "binary" ? 2 : 1;
  const gpuScore = profile.gpuCapable ? 2 : 0;

  const baseScore =
    methodScore * 0.012 +
    bandScore * 0.008 +
    gpuScore * 0.012 +
    cycleIndex * 0.0001;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.022 :
    presenceField.presenceTier === "high" ? 0.017 :
    presenceField.presenceTier === "elevated" ? 0.011 :
    presenceField.presenceTier === "soft" ? 0.006 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.06) advantageTier = 3;
  else if (advantageScore >= 0.025) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "embassyAdapterAdvantage",
    version: "C-31.0",
    adapterName: name,
    adapterId: adapter.id || null,
    band: bandNorm,
    methodScore,
    bandScore,
    gpuScore,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    presenceTier: presenceField.presenceTier,
    gpuCapable: profile.gpuCapable,
    marketplaceKind: profile.marketplaceKind
  };

  const classicString =
    `EMBASSY_ADVANTAGE::${name}::${presenceField.presenceTier}::${advantageTier}`;

  const sig = dualSig("EMBASSY_ADAPTER_ADVANTAGE_V31", intelPayload, classicString);

  return {
    advantageVersion: "C-31.0",
    adapterName: name,
    adapterId: adapter.id || null,
    band: bandNorm,
    methodScore,
    bandScore,
    gpuScore,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    gpuCapable: profile.gpuCapable,
    marketplaceKind: profile.marketplaceKind,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

function buildAdapterChunkPrewarmPlan(name, adapter, presenceField, advantageField) {
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

  const gpuBoost = advantageField.gpuCapable ? 1 : 0;

  const priority = basePriority + advantageBoost + gpuBoost;

  const intelPayload = {
    kind: "embassyAdapterChunkPlan",
    version: "v31-Embassy-AdvantageC",
    adapterName: name,
    adapterId: adapter.id || null,
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    gpuCapable: advantageField.gpuCapable,
    marketplaceKind: advantageField.marketplaceKind
  };

  const classicString =
    `EMBASSY_CHUNK_PLAN::${name}::${presenceField.presenceTier}::${priority}`;

  const sig = dualSig("EMBASSY_ADAPTER_CHUNK_PLAN_V31", intelPayload, classicString);

  return {
    planVersion: "v31-Embassy-AdvantageC",
    adapterName: name,
    adapterId: adapter.id || null,
    priority,
    bandPresenceTier: presenceField.presenceTier,
    chunks: {
      adapterEnvelope: true,
      adapterCapabilities: true,
      adapterBandMetadata: true,
      adapterGpuProfile: true,
      processWorkerEnvelope: true
    },
    cache: {
      rosterEntry: true,
      adapterPresence: true,
      adapterAdvantage: true,
      adapterGpuAffinity: true,
      processWorkerState: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      foragerLayer: true,
      lymphNodes: true,
      brokerLayer: true,
      ambassadorLayer: true,
      auctioneerLayer: true,
      courierLayer: true,
      consulateLayer: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// PROCESS WORKER TOWER
// ============================================================================

const ProcessWorkerTower = {
  version: "v31-ProcessWorkerTower",
  workers: Object.create(null) // adapterName → workerState
};

function buildWorkerId(adapterName, cycleIndex) {
  return `PW::${adapterName}::${cycleIndex}`;
}

function buildProcessWorkerEnvelope(adapterName, adapter, cycleIndex, presenceField, advantageField) {
  const profile = inferAdapterProfile(adapter);

  const workerId = buildWorkerId(adapterName, cycleIndex);

  const intelPayload = {
    kind: "embassyProcessWorker",
    version: "v31-ProcessWorkerTower",
    adapterName,
    adapterId: adapter.id || null,
    workerId,
    cycleIndex,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    gpuCapable: profile.gpuCapable,
    band: advantageField.band,
    marketplaceKind: profile.marketplaceKind
  };

  const classicString =
    `PROCESS_WORKER::${adapterName}::${workerId}::CYCLE::${cycleIndex}`;

  const sig = dualSig("EMBASSY_PROCESS_WORKER_V31", intelPayload, classicString);

  const workerState = {
    workerId,
    adapterName,
    adapterId: adapter.id || null,
    cycleIndex,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    gpuCapable: profile.gpuCapable,
    band: advantageField.band,
    marketplaceKind: profile.marketplaceKind,
    signatureIntel: sig.intel,
    signatureClassic: sig.classic
  };

  ProcessWorkerTower.workers[adapterName] = workerState;

  return workerState;
}

// ============================================================================
// EMBASSY HEALING STATE
// ============================================================================
export const embassyHealing = {
  version: "v40-IMMORTAL-EMBASSY",

  adaptersLoaded: [],
  missingAdapters: [],
  invalidAdapters: [],
  cycleCount: 0,
  lastCycleIndex: null,

  lastAdapterSignatureClassic: null,
  lastAdapterSignatureIntel: null,
  lastRosterSignatureClassic: null,
  lastRosterSignatureIntel: null,
  lastCycleSignatureClassic: null,
  lastCycleSignatureIntel: null,

  adapterPresence: {},
  adapterAdvantage: {},
  adapterChunkPlan: {},
  adapterProcessWorker: {},

  centralBatchesProcessed: 0,
  centralJobsRouted: 0,
  centralJobsByAdapter: {},

  deltaMemoryVersion: "v60",
  deltaMemoryCacheSize: 0
};

let embassyCycle = 0;

// ---------------------------------------------------------------------------
// EMBASSY ADAPTER REGISTRY — v40 IMMORTAL
// ---------------------------------------------------------------------------
export const EmbassyAdapters = Object.freeze({
  ambassador: {
    id: "embassy-ambassador-akash",
    name: "PulseEarnMktAmbassadorTest",
    kind: "test",
    marketplace: "akash",
    runTest: runPulseEarnMktAmbassadorTest,
    meta: PulseEarnMktAmbassadorTestMeta
  },
  auctioneer: {
    id: "embassy-auctioneer-vast",
    name: "PulseEarnMktAuctioneerTest",
    kind: "test",
    marketplace: "vast",
    runTest: runPulseEarnMktAuctioneerTest,
    meta: PulseEarnMktAuctioneerTestMeta
  },
  forager: {
    id: "embassy-forager-salad",
    name: "PulseEarnMktForagerTest",
    kind: "test",
    marketplace: "salad",
    runTest: runPulseEarnMktForagerTest,
    meta: PulseEarnMktForagerTestMeta
  },
  golem: {
    id: "embassy-golem-gpu-net",
    name: "PulseEarnMktGolemTest",
    kind: "test",
    marketplace: "golem",
    runTest: runPulseEarnMktGolemTest,
    meta: PulseEarnMktGolemTestMeta
  },
  exec: {
    id: "embassy-exec-iexec",
    name: "PulseEarnMktExecTest",
    kind: "test",
    marketplace: "iexec",
    runTest: runPulseEarnMktExecTest,
    meta: PulseEarnMktExecTestMeta
  },
  ankr: {
    id: "embassy-ankr",
    name: "PulseEarnMktAnkrTest",
    kind: "test",
    marketplace: "ankr",
    runTest: runPulseEarnMktAnkrTest,
    meta: PulseEarnMktAnkrTestMeta
  },
  fluence: {
    id: "embassy-fluence",
    name: "PulseEarnMktFluenceTest",
    kind: "test",
    marketplace: "fluence",
    runTest: runPulseEarnMktFluenceTest,
    meta: PulseEarnMktFluenceTestMeta
  },
  broker: {
    id: "embassy-broker-runpod",
    name: "PulseEarnMktBroker",
    kind: "organ",
    marketplace: "runpod",
    organ: PulseEarnMktBroker
  },
  courier: {
    id: "embassy-courier-spheron",
    name: "PulseEarnMktCourier",
    kind: "organ",
    marketplace: "spheron",
    organ: PulseEarnMktCourier
  }
});

function safeAdapterVersion(entry, key = "unknown") {
  try {
    if (!entry || typeof entry !== "object") {
      return `v0-null-${key}`;
    }

    // 1. meta.version (test adapters)
    if (entry.meta && typeof entry.meta.version === "string") {
      return entry.meta.version;
    }

    // 2. organ.version (organ adapters)
    if (entry.organ && typeof entry.organ.version === "string") {
      return entry.organ.version;
    }

    // 3. meta exists but no version
    if (entry.meta) {
      return `v0-meta-${key}`;
    }

    // 4. organ exists but no version
    if (entry.organ) {
      return `v0-organ-${key}`;
    }

    // 5. fallback: kind + marketplace
    const kind = entry.kind || "unknown-kind";
    const market = entry.marketplace || "unknown-market";

    return `v0-${kind}-${market}-${key}`;
  } catch (err) {
    return `v0-error-${key}`;
  }
}

// ---------------------------------------------------------------------------
// VALIDATION + ROSTER SIGNATURES — v40 IMMORTAL
// ---------------------------------------------------------------------------
function validateAdapter(key, entry, globalHints = {}) {
  embassyCycle++;
  embassyHealing.cycleCount++;
  embassyHealing.lastCycleIndex = embassyCycle;

  const cycleSig = dualSig(
    "EMBASSY_CYCLE_V40",
    { cycleIndex: embassyCycle, adapterKey: key },
    `EMBASSY_CYCLE::${embassyCycle}::${key}`
  );

  embassyHealing.lastCycleSignatureClassic = cycleSig.classic;
  embassyHealing.lastCycleSignatureIntel = cycleSig.intel;

  if (!entry) {
    embassyHealing.missingAdapters.push(key);
    return false;
  }

  if (entry.kind === "test") {
    if (typeof entry.runTest !== "function") {
      embassyHealing.invalidAdapters.push({ adapter: key, missingMethods: ["runTest"] });
      return false;
    }
  } else if (entry.kind === "organ") {
    const organ = entry.organ;
    if (!organ) {
      embassyHealing.missingAdapters.push(key);
      return false;
    }
    const required = ["ping", "fetchJobs", "submitResult"];
    const missing = required.filter(fn => typeof organ[fn] !== "function");
    if (missing.length > 0) {
      embassyHealing.invalidAdapters.push({ adapter: key, missingMethods: missing });
      return false;
    }
  }

  embassyHealing.adaptersLoaded.push(key);

  const version = safeAdapterVersion(entry);

  const adapterSigClassic = computeClassicHash(`ADAPTER::${key}::${version}`);
  const adapterSigIntel = computeIntelHash({
    label: "EMBASSY_ADAPTER_V40",
    key,
    id: entry.id || null,
    version
  });

  embassyHealing.lastAdapterSignatureClassic = adapterSigClassic;
  embassyHealing.lastAdapterSignatureIntel = adapterSigIntel;

  // presence / advantage / chunk / worker envelopes
  const presenceField = {
    key,
    version,
    cycle: embassyCycle,
    marketplace: entry.marketplace || "unknown",
    signature: computeClassicHash(`PRESENCE::${key}::${version}`)
  };

  const advantageField = {
    key,
    version,
    score: Math.random(), // deterministic? optional
    signature: computeClassicHash(`ADV::${key}::${version}`)
  };

  const chunkPlan = {
    key,
    version,
    plan: "default",
    signature: computeClassicHash(`CHUNK::${key}::${version}`)
  };

  const workerEnvelope = {
    key,
    version,
    worker: "default",
    signature: computeClassicHash(`WORKER::${key}::${version}`)
  };

  embassyHealing.adapterPresence[key] = presenceField;
  embassyHealing.adapterAdvantage[key] = advantageField;
  embassyHealing.adapterChunkPlan[key] = chunkPlan;
  embassyHealing.adapterProcessWorker[key] = workerEnvelope;

  return true;
}

// validate all adapters
Object.entries(EmbassyAdapters).forEach(([key, entry]) => {
  validateAdapter(key, entry);
});

const marketplaces = Object.values(EmbassyAdapters);
const rosterIds = marketplaces.map(m => m.id || "unknown");

const rosterSigClassic = computeClassicHash(`ROSTER::${rosterIds.join("|")}`);
const rosterSigIntel = computeIntelHash({
  label: "EMBASSY_ROSTER_V31",
  ids: rosterIds,
  version: "v31-IMMORTAL-INTEL-OMEGA"
});

embassyHealing.lastRosterSignatureClassic = rosterSigClassic;
embassyHealing.lastRosterSignatureIntel = rosterSigIntel;

// ============================================================================
// CENTRAL JOB ROUTER (organ‑based only; tests are diagnostics)
// ============================================================================

function routeAllJobs(deviceProfile = {}, globalHints = {}) {
  embassyCycle++;
  embassyHealing.cycleCount++;
  embassyHealing.lastCycleIndex = embassyCycle;

  const batchId = `CENTRAL_BATCH::${embassyCycle}`;
  const batchSig = dualSig(
    "EMBASSY_CENTRAL_BATCH_V31",
    { batchId, cycleIndex: embassyCycle },
    `${batchId}`
  );

  let allJobs = [];
  const perAdapter = [];
  const jobsByAdapter = {};

  for (const [key, entry] of Object.entries(EmbassyAdapters)) {
    if (entry.kind !== "organ") continue;

    const adapterId = entry.id || "unknown";
    const adapterName = entry.name || adapterId;
    const organ = entry.organ;

    if (!organ || typeof organ.fetchJobs !== "function") {
      continue;
    }

    // DeltaMemoryResolver can still be used to introspect organ exports if needed
    try {
      if (PulseRealm.PulseDeltaMemory && typeof PulseRealm.PulseDeltaMemory.resolveExport === "function") {
        PulseRealm.PulseDeltaMemory.resolveExport(
          adapterName,
          organ,
          fn => typeof fn === "function"
        );
        embassyHealing.deltaMemoryCacheSize =
          Object.keys(PulseRealm.PulseDeltaMemory.cache || {}).length;
      }
    } catch {
      // non-fatal
    }

    const result = organ.fetchJobs(deviceProfile, globalHints) || {};
    const jobs = Array.isArray(result.jobs) ? result.jobs : [];

    allJobs = allJobs.concat(jobs);
    perAdapter.push({
      key,
      adapterId,
      adapterName,
      jobs,
      cycleIndex: result.cycleIndex ?? null,
      signatureIntel: result.signatureIntel || null,
      signatureClassic: result.signatureClassic || null
    });

    jobsByAdapter[adapterId] = (jobsByAdapter[adapterId] || 0) + jobs.length;
  }

  embassyHealing.centralBatchesProcessed++;
  embassyHealing.centralJobsRouted += allJobs.length;
  embassyHealing.centralJobsByAdapter = jobsByAdapter;

  return {
    batchId,
    batchSignatureIntel: batchSig.intel,
    batchSignatureClassic: batchSig.classic,
    cycleIndex: embassyCycle,
    totalJobs: allJobs.length,
    jobs: allJobs,
    perAdapter,
    stats: {
      centralBatchesProcessed: embassyHealing.centralBatchesProcessed,
      centralJobsRouted: embassyHealing.centralJobsRouted,
      centralJobsByAdapter: { ...embassyHealing.centralJobsByAdapter }
    }
  };
}

// ============================================================================
// TEST‑BASED EMBASSY CYCLE (runs all tests, no CNS, no logger)
// ============================================================================

async function runAdapterProbe(key, entry, profileName = "default") {
  if (entry.kind === "test" && typeof entry.runTest === "function") {
    try {
      const result = await entry.runTest(profileName);
      return {
        ok: !result.skipped,
        skipped: !!result.skipped,
        score: result.score || null,
        envCaps: result.envCaps || null,
        meta: entry.meta || null
      };
    } catch (err) {
      return {
        ok: false,
        skipped: false,
        error: String(err),
        score: null,
        envCaps: null,
        meta: entry.meta || null
      };
    }
  }

  // organ‑only probe (no test yet)
  try {
    let ok = true;
    const organ = entry.organ;
    if (organ && typeof organ.ping === "function") {
      const res = organ.ping();
      ok = !res.error;
    }
    return {
      ok,
      skipped: false,
      score: null,
      envCaps: null,
      meta: null
    };
  } catch (err) {
    return {
      ok: false,
      skipped: false,
      error: String(err),
      score: null,
      envCaps: null,
      meta: null
    };
  }
}

function buildEmbassyRosterSnapshot(cycleIndex, globalHints = {}) {
  const roster = [];
  const presenceFields = {};
  const advantageFields = {};
  const chunkPlans = {};

  Object.entries(EmbassyAdapters).forEach(([key, entry]) => {
    const presence = buildAdapterPresenceField(key, entry, cycleIndex, globalHints);
    const advantage = buildAdapterAdvantageField(
      key,
      entry,
      presence.bandPresence,
      cycleIndex,
      presence,
      globalHints
    );
    const chunkPlan = buildAdapterChunkPrewarmPlan(key, entry, presence, advantage);

    presenceFields[key] = presence;
    advantageFields[key] = advantage;
    chunkPlans[key] = chunkPlan;

    roster.push({
      key,
      adapterId: entry.id,
      adapterName: entry.name,
      marketplace: entry.marketplace,
      presence,
      advantage,
      chunkPlan
    });
  });

  const intelPayload = {
    kind: "embassyRosterSnapshot",
    version: "v31-IMMORTAL-INTEL-OMEGA",
    cycleIndex,
    adapterCount: roster.length
  };

  const classicString = `EMBASSY_ROSTER::${cycleIndex}::${roster.length}`;
  const sig = dualSig("EMBASSY_ROSTER_V31", intelPayload, classicString);

  return {
    cycleIndex,
    roster,
    presenceFields,
    advantageFields,
    chunkPlans,
    rosterSignatureIntel: sig.intel,
    rosterSignatureClassic: sig.classic
  };
}

export async function runPulseEarnMktEmbassyCycle(options = {}) {
  const {
    cycleIndex = PulseRealm.PulseNOW,
    profileName = "default",
    globalHints = {}
  } = options;

  const rosterSnapshot = buildEmbassyRosterSnapshot(cycleIndex, globalHints);

  const probeTasks = [];
  const probeResults = {};

  Object.entries(EmbassyAdapters).forEach(([key, entry]) => {
    probeTasks.push(
      (async () => {
        const result = await runAdapterProbe(key, entry, profileName);
        probeResults[key] = result;
      })()
    );
  });

  await Promise.all(probeTasks);

  const deltaInput = {
    cycleIndex,
    rosterSnapshot,
    probeResults
  };

  let deltaMemory = null;
  try {
    if (typeof PulseRealm.PulseDeltaMemory === "function") {
      deltaMemory = PulseRealm.PulseDeltaMemory(deltaInput);
    }
  } catch {
    deltaMemory = null;
  }

  const intelPayload = {
    kind: "embassyCycleResult",
    version: "v31-IMMORTAL-INTEL-OMEGA",
    cycleIndex,
    adapterCount: rosterSnapshot.roster.length,
    probeKeys: Object.keys(probeResults || {})
  };

  const classicString =
    `EMBASSY_CYCLE::${cycleIndex}::${rosterSnapshot.roster.length}::${Object.keys(
      probeResults || {}
    ).length}`;

  const sig = dualSig("EMBASSY_CYCLE_V31", intelPayload, classicString);

  return {
    cycleIndex,
    rosterSnapshot,
    probeResults,
    deltaMemory,
    cycleSignatureIntel: sig.intel,
    cycleSignatureClassic: sig.classic
  };
}

// ============================================================================
// ACCESSORS
// ============================================================================

function getProcessWorkerForAdapter(adapterName) {
  return ProcessWorkerTower.workers[adapterName] || null;
}

function getAllProcessWorkers() {
  return { ...ProcessWorkerTower.workers };
}

function getPulseEarnMktEmbassyHealingState() {
  return {
    ...embassyHealing,
    processWorkerTower: {
      version: ProcessWorkerTower.version,
      workers: { ...ProcessWorkerTower.workers }
    }
  };
}

// ============================================================================
// META + EXPORT (v31 + v30‑compatible aliases)
// ============================================================================

export const PulseEarnMktEmbassyLedgerMeta_v31 = Object.freeze({
  identity: "PulseEarnMktEmbassyLedger",
  version: "v31-IMMORTAL-INTEL-OMEGA",
  role: "EMBASSY_LEDGER",
  schemaVersion: "v2",
  adapters: Object.keys(EmbassyAdapters)
});

// v31 primary object
export const PulseEarnMktEmbassyLedger_v31 = {
  version: "v31-IMMORTAL-INTEL-OMEGA",
  marketplaces,
  rosterIds,
  rosterSignatureClassic: rosterSigClassic,
  rosterSignatureIntel: rosterSigIntel,

  // central processor (organ‑based jobs)
  routeAllJobs,

  // test‑based cycle
  runCycle: runPulseEarnMktEmbassyCycle,

  // process worker tower
  getProcessWorkerForAdapter,
  getAllProcessWorkers,

  // healing
  getHealingState: getPulseEarnMktEmbassyHealingState,

  // registry
  adapters: EmbassyAdapters
};

// v30‑compatible meta + object (aliases to v31)
export const PulseEarnMktEmbassyLedgerMeta = Object.freeze({
  identity: "PulseEarnMktEmbassyLedger",
  version: "v30-IMMORTAL-INTEL-OMEGA",
  role: "EMBASSY_LEDGER",
  schemaVersion: "v1",
  adapters: Object.keys(EmbassyAdapters)
});

export const PulseEarnMktEmbassyLedger_v30 = PulseEarnMktEmbassyLedger_v31;



PulseRealm.PulseEarnMktEmbassyLedger = {
  PulseEarnMktEmbassyLedger_v31,
  PulseEarnMktEmbassyLedgerMeta,
  runPulseEarnMktEmbassyCycle,
  runAdapterProbe,
  embassyHealing,
  EmbassyAdapters
}
