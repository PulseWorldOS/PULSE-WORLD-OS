// ============================================================================
// PulseEarnMktAuctioneerTest-v31.js
// v31 IMMORTAL-INTEL-OMEGA-BINARYWAVE-GPU — Auctioneer Test Module
// ============================================================================
//
// This module wraps your existing Auctioneer adapter into a clean test module
// compatible with the v31 IMMORTAL-INTEL-OMEGA stack.
//
// Exported API:
//   default: { name, run }
//   named:   PulseEarnMktAuctioneer, PulseEarnMktAuctioneerHealingState
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  PulseEarnMktAuctioneer_v31,
  getPulseEarnMktAuctioneerHealingState_v31 as getPulseEarnMktAuctioneerHealingState
} from "./PulseEarnMktAuctioneer-v31.js";

// GPU process worker — v30 IMMORTAL capability engine
// (backed by PulseGPUProcessWorker-v30-Immortal++++-GPU+EARN-ALIGNED.js)
import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";




// ============================================================================
// DEVICE PROFILE — v31 REAL CAPABILITY (IMMORTAL-INTEL-OMEGA)
// ============================================================================

const rawDeviceProfile = (() => {
  try {
    return detectGpuDeviceProfile ? detectGpuDeviceProfile() : null;
  } catch {
    return null;
  }
})();

const deviceProfile =
  rawDeviceProfile && typeof rawDeviceProfile === "object"
    ? rawDeviceProfile
    : {
        // Safe IMMORTAL-INTEL-OMEGA fallback (mirrors GPU Earn Profile v30+)
        gpuScore: 7200,
        gpuRam: 24,
        cpuScore: 3600,
        memScore: 4800,
        bandwidthMbps: 500,
        stabilityScore: 0.97,
        capabilityScore:
          7200 * 0.5 +
          3600 * 0.2 +
          4800 * 0.2 +
          500 * 0.05 +
          0.97 * 0.05,
        capabilityTier: "elite"
      };

// ============================================================================
// GLOBAL HINTS — v31 WORLD + CONTINUANCE + OMNIHOSTING + GPU CONTEXT
// ============================================================================

const globalHints = {
  presenceContext: {
    bandPresence: "binary",
    routerPresence: "stable",
    devicePresence: "local-auctioneer"
  },
  meshSignals: {
    meshStrength: 18,
    meshPressureIndex: 22
  },
  castleSignals: {
    castlePresence: "regional",
    castleId: "castle‑mesa‑01",
    loadLevel: 28
  },
  regionContext: {
    regionTag: "us‑west‑mesa",
    regionId: "mesa‑01"
  },
  advantageContext: {
    score: 6,
    band: "binary",
    tier: 3
  },
  fallbackBandLevel: 2,
  chunkHints: { prechunk: true },
  cacheHints: { level: 3 },
  prewarmHints: { enabled: true },
  coldStartHints: { avoid: true },

  worldContext: {
    world: "pulse‑world",
    region: "us‑west‑mesa",
    tenantId: "tenant‑pulse‑earn",
    systemAgeMs: 1000 * 60 * 60 * 24 * 90
  },

  // v31: explicit device / capability overlay for Auctioneer + GPU layers
  deviceProfile,
  capabilityProfile: {
    capabilityTier: deviceProfile.capabilityTier || "elite",
    capabilityScore: deviceProfile.capabilityScore || 0,
    gpuScore: deviceProfile.gpuScore || 0,
    gpuRam: deviceProfile.gpuRam || 0,
    bandwidthMbps: deviceProfile.bandwidthMbps || 0,
    stabilityScore: deviceProfile.stabilityScore || 0
  }
};

// ============================================================================
// PARALLEL JOB SCORING ENGINE — v31 GPU-BINARYWAVE + REAL CAPABILITY
// ============================================================================

function scoreJob(job) {
  const gpuRam = job.gpuRam || job.minGpuRam || 0;
  const minGpuScore = job.minGpuScore || 0;
  const payout = job.payout || 0;
  const estimatedSeconds = Math.max(job.estimatedSeconds || 1, 1);

  const gpuScoreComponent = gpuRam * 10 + minGpuScore;
  const payoutRate = payout / estimatedSeconds;

  const jobBandwidth = job.bandwidth || job.net_up || 0;
  const bandwidthMatch = Math.min(
    jobBandwidth || 1,
    deviceProfile.bandwidthMbps || 1
  );

  const stability = deviceProfile.stabilityScore ?? 0.5;

  // v31: slightly more weight on payoutRate and stability for long-lived jobs
  return (
    gpuScoreComponent * 0.55 +
    payoutRate * 0.3 +
    bandwidthMatch * 0.1 +
    stability * 0.05
  );
}

function selectBestJobsParallel(jobs, count = 2) {
  const scored = jobs.map((j) => ({
    job: j,
    score: scoreJob(j)
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count);
}

// ============================================================================
// GPU PROCESS WORKER INTEGRATION — v31 IMMORTAL CAPABILITY PIPELINE
// ============================================================================
//
// We treat PulseGPUProcessWorker as a pure GPU/capability pipeline helper.
// We use prepareEarnJob() so the worker can:
//   • classify lane/role
//   • attach gpuHint with capabilityProfile
//   • align with v31 Earn GPU profile semantics
// ============================================================================

export function runGpuWorkerSimulation(bestJobs) {
  if (!bestJobs || bestJobs.length === 0) {
    return { ok: false, reason: "no_jobs", result: null };
  }

  if (!PulseGPUProcessWorker || typeof PulseGPUProcessWorker.prepareEarnJob !== "function") {
    return {
      ok: false,
      reason: "gpu_worker_unavailable",
      result: null
    };
  }

  try {
    const prepared = bestJobs.map((entry) => {
      const job = entry.job || entry;
      return PulseGPUProcessWorker.prepareEarnJob({
        jobId: job.id,
        type: "EARN_TASK",
        band: job.band || "binary",
        intent: "vast-auctioneer-job",
        advantageScore: 0.5,
        payload: {
          normalizedJob: job,
          deviceProfile,
          worldHints: globalHints
        }
      });
    });

    const snapshot =
      typeof PulseGPUProcessWorker.snapshot === "function"
        ? PulseGPUProcessWorker.snapshot()
        : null;

    const tick =
      typeof PulseGPUProcessWorker.tick === "function"
        ? PulseGPUProcessWorker.tick()
        : null;

    return {
      ok: true,
      reason: null,
      result: {
        preparedJobs: prepared,
        workerSnapshot: snapshot,
        workerTick: tick,
        deviceProfile
      }
    };
  } catch (err) {
    return {
      ok: false,
      reason: err.message || String(err),
      result: null
    };
  }
}

// ============================================================================
// TEST MODULE OBJECT — v31 IMMORTAL-INTEL-OMEGA-BINARYWAVE
// ============================================================================

export const PulseEarnMktAuctioneerTest_v31 = {
  name:
    "PulseEarnMktAuctioneer Test (v31 IMMORTAL-INTEL-OMEGA BinaryWave + IMMORTAL GPUWorker)",

  run() {
    const results = {};

    console.log("==============================================");
    console.log(" PULSE‑EARN VAST.AI ADAPTER — TEST RUN");
    console.log(" v31 IMMORTAL‑INTEL‑OMEGA‑BINARYWAVE‑GPU + IMMORTAL GPU PROCESS WORKER");
    console.log("==============================================\n");

    console.log("🔹 Detected Device Profile (IMMORTAL v31):");
    console.log(deviceProfile, "\n");

    // ---------------------------------------------------------
    // 1. PING TEST
    // ---------------------------------------------------------
    const ping = PulseEarnMktAuctioneer_v31.ping(globalHints);
    results.ping = ping;

    console.log("🔹 Testing ping()...");
    console.log("Ping:", ping);
    console.log("BinaryWave Carrier:", ping.binaryWaveCarrier);
    console.log("GPU Tier:", ping.gpuProfile.gpuTier);
    console.log("Auctioneer BinaryWave Band:", ping.band, "\n");

    // ---------------------------------------------------------
    // 2. FETCH JOBS
    // ---------------------------------------------------------
    const fetch = PulseEarnMktAuctioneer_v31.fetchJobs(globalHints);
    const jobs = fetch.jobs || [];
    results.fetch = fetch;

    console.log("🔹 Testing fetchJobs()...");
    console.log(`Fetched ${jobs.length} jobs`);
    console.log("BinaryWave Carrier:", fetch.binaryWaveCarrier);
    console.log("GPU Tier:", fetch.gpuProfile.gpuTier, "\n");

    // ---------------------------------------------------------
    // 3. PARALLEL JOB SELECTION (GPU‑BINARYWAVE LOGIC)
// ---------------------------------------------------------
    const best = selectBestJobsParallel(jobs, 2);
    results.bestJobs = best;

    console.log("🔹 Selecting best jobs (GPU‑aware scoring + real capability)...");
    console.log("Top Jobs:", best, "\n");

    // ---------------------------------------------------------
    // 4. GPU PROCESS WORKER SIMULATION (IMMORTAL CAPABILITY PIPELINE)
    // ---------------------------------------------------------
    const gpuSim = runGpuWorkerSimulation(best);
    results.gpuSimulation = gpuSim;

    console.log("🔹 GPU Process Worker Simulation (IMMORTAL)...");
    if (gpuSim.ok) {
      console.log("GPU Worker Result:", gpuSim.result, "\n");
    } else {
      console.log("GPU Worker Simulation FAILED:", gpuSim.reason, "\n");
    }

    // ---------------------------------------------------------
    // 5. NORMALIZATION
    // ---------------------------------------------------------
    if (jobs.length > 0) {
      const normalized = PulseEarnMktAuctioneer_v31.normalizeJob(
        jobs[0],
        globalHints
      );
      results.normalized = normalized;

      console.log("🔹 Testing normalizeJob()...");
      console.log("Normalized:", normalized, "\n");
    }

    // ---------------------------------------------------------
    // 6. SUBMIT RESULT
    // ---------------------------------------------------------
    if (jobs.length > 0) {
      const submit = PulseEarnMktAuctioneer_v31.submitResult(
        jobs[0],
        { ok: true },
        globalHints
      );
      results.submit = submit;

      console.log("🔹 Testing submitResult()...");
      console.log("Submit:", submit, "\n");
    }

    // ---------------------------------------------------------
    // 7. HEALING STATE
    // ---------------------------------------------------------
    const healing = getPulseEarnMktAuctioneerHealingState();
    results.healing = healing;

    console.log("🔹 Healing State:");
    console.log(healing);

    console.log("\n==============================================");
    console.log(
      " TEST COMPLETE (v31 IMMORTAL‑INTEL‑OMEGA‑BINARYWAVE‑GPU + IMMORTAL GPUWorker)"
    );
    console.log("==============================================");

    return results;
  }
};

export function runPulseEarnMktAuctioneerTest() {
  const test = PulseEarnMktAuctioneerTest_v31;
  return typeof test.run === "function"
    ? test.run()
    : { ok: false, reason: "no_run_method" };
}

export const PulseEarnMktAuctioneerTestMeta_v31 = {
  version: "v31-IMMORTAL-INTEL-OMEGA-BINARYWAVE",
  role: "auctioneer-test",
  gpuTier: deviceProfile.capabilityTier,
  gpuScore: deviceProfile.gpuScore,
  region: globalHints.regionContext.regionId,
  world: globalHints.worldContext.world
};

// ============================================================================
// EXPORTS (DEFAULT + NAMED)
// ============================================================================

export default PulseEarnMktAuctioneerTest_v31;
export const PulseEarnMktAuctioneer = PulseEarnMktAuctioneer_v31;
export const PulseEarnMktAuctioneerHealingState =
  getPulseEarnMktAuctioneerHealingState;

  PulseRealm.EarnMktAuctioneerTest = {
    PulseEarnMktAuctioneer,
    PulseEarnMktAuctioneerTestMeta_v31,
    PulseEarnMktAuctioneerTest_v31,
    PulseEarnMktAuctioneerHealingState,
    getPulseEarnMktAuctioneerHealingState,
    runGpuWorkerSimulation
  }