// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktGolemTest-v31.js
// PULSE EARN — v31 MARKET GOLEM TEST HARNESS
// IMMORTAL‑INTEL‑WORLD + GPU/CPU Capability + BinaryWave + World Overlays
// PURE TEST HARNESS — deterministic, no IO, no randomness
// ============================================================================

/* eslint-disable no-console */

import {
  PulseEarnMktGolem_v31,
  getPulseEarnMktGolemHealingState
} from "./PulseEarnMktGolem-v31.js";

import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// META — v31 IMMORTAL‑INTEL‑WORLD
// ============================================================================
export const PulseEarnMktGolemTestMeta_v31 = Object.freeze({
  identity: "PulseEarnMktGolemTest",
  version: "v31-Golem-Immortal-Intel-World",
  role: "MARKET_GOLEM_TEST",
  schemaVersion: "v31",
  guarantees: {
    gpuAware: true,
    cpuAware: true,
    workerAware: true,
    binaryWaveAware: true,
    worldAware: true
  }
});



// ============================================================================
// LOGGING
// ============================================================================
function logGolemTest_v31(stage, details = {}) {
  console.log(
    JSON.stringify({
      pulseTest: "PulseEarnMktGolemTest_v31",
      pulseVer: PulseEarnMktGolemTestMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// ENVIRONMENT DETECTION — v31 IMMORTAL‑INTEL‑WORLD
// ============================================================================
function detectEnvProfile_v31() {
  let profile = {
    hasGPU: false,
    hasWebGPU: false,
    hasWebGL: false,
    hasWorkerSupport: false,
    deviceProfile: null,
    capabilityTier: "none",
    capabilityScore: 0,
    gpuScore: 0,
    cpuScore: 0,
    memScore: 0,
    stabilityScore: 0
  };

  try {
    const detected = detectGpuDeviceProfile
      ? detectGpuDeviceProfile()
      : null;

    if (detected && typeof detected === "object") {
      profile = { ...profile, ...detected };
    }

    if (!profile.hasWorkerSupport && PulseGPUProcessWorker) {
      profile.hasWorkerSupport = true;
    }

    if (detected && detected.deviceProfile) {
      const dev = detected.deviceProfile;

      profile.deviceProfile = dev;
      profile.capabilityTier =
        dev.capabilityTier ||
        dev.gpuTier ||
        dev.cpuTier ||
        "unknown";

      profile.capabilityScore = dev.capabilityScore || 0;
      profile.gpuScore = dev.gpuScore || 0;
      profile.cpuScore = dev.cpuScore || 0;
      profile.memScore = dev.memScore || 0;
      profile.stabilityScore = dev.stabilityScore || 0;
    }
  } catch {
    // ignore
  }

  logGolemTest_v31("ENV_PROFILE_DETECTED_V31", profile);
  return profile;
}

// ============================================================================
// TEST PROFILES — v31
// ============================================================================
const DEFAULT_TEST_PROFILE_V31 = Object.freeze({
  name: "default",
  description: "Balanced Golem test",
  maxParallelJobs: 8,
  jobKinds: ["golem-ping", "golem-offer", "golem-report"],
  requireGPU: false,
  requireCPU: false,
  stressLevel: "medium"
});

const STRESS_TEST_PROFILE_V31 = Object.freeze({
  name: "stress",
  description: "High-load Golem test",
  maxParallelJobs: 24,
  jobKinds: ["golem-ping", "golem-offer", "golem-report"],
  requireGPU: false,
  requireCPU: false,
  stressLevel: "high"
});

const GPU_HEAVY_PROFILE_V31 = Object.freeze({
  name: "gpu-heavy",
  description: "GPU-preferred Golem test",
  maxParallelJobs: 12,
  jobKinds: ["golem-offer", "golem-report"],
  requireGPU: true,
  requireCPU: false,
  stressLevel: "medium"
});

const CPU_HEAVY_PROFILE_V31 = Object.freeze({
  name: "cpu-heavy",
  description: "CPU-preferred Golem test",
  maxParallelJobs: 12,
  jobKinds: ["golem-offer", "golem-report"],
  requireGPU: false,
  requireCPU: true,
  stressLevel: "medium"
});

export const PulseEarnMktGolemProfiles_v31 = Object.freeze({
  default: DEFAULT_TEST_PROFILE_V31,
  stress: STRESS_TEST_PROFILE_V31,
  gpuHeavy: GPU_HEAVY_PROFILE_V31,
  cpuHeavy: CPU_HEAVY_PROFILE_V31
});

// ============================================================================
// SCORE MODEL — v31 IMMORTAL‑INTEL‑WORLD
// ============================================================================
function createEmptyScore_v31() {
  return {
    jobReachScore: 0,
    reliabilityScore: 0,
    latencyScore: 0,
    environmentBonus: 0,
    capabilityBonus: 0,
    total: 0,
    samples: 0
  };
}

function accumulateScore_v31(score, sample) {
  const s = { ...score };

  s.jobReachScore += sample.jobReachScore || 0;
  s.reliabilityScore += sample.reliabilityScore || 0;
  s.latencyScore += sample.latencyScore || 0;
  s.environmentBonus += sample.environmentBonus || 0;
  s.capabilityBonus += sample.capabilityBonus || 0;
  s.samples += 1;

  s.total =
    s.jobReachScore +
    s.reliabilityScore +
    s.latencyScore +
    s.environmentBonus +
    s.capabilityBonus;

  return s;
}

// ============================================================================
// RUN SINGLE GOLEM JOB — v31
// ============================================================================
async function runSingleGolemJob_v31({ kind, payload, envProfile }) {
  const start = PulseRealm.PulseNOW;
  let ok = false;
  let error = null;

  try {
    let result;

    if (
      PulseEarnMktGolem_v31 &&
      typeof PulseEarnMktGolem_v31.runJob === "function"
    ) {
      result = await PulseEarnMktGolem_v31.runJob(
        kind,
        payload,
        envProfile.deviceProfile || {},
        { envCaps: envProfile }
      );
    } else if (typeof PulseEarnMktGolem_v31 === "function") {
      result = await PulseEarnMktGolem_v31(
        kind,
        payload,
        envProfile.deviceProfile || {},
        { envCaps: envProfile }
      );
    } else {
      throw new Error("PulseEarnMktGolem_v31 has no callable runJob");
    }

    ok = !result.error;
    if (!ok) error = result.error || "Unknown error";
  } catch (err) {
    ok = false;
    error = String(err);
  }

  const latency = PulseRealm.PulseNOW - start;

  return { ok, latency, error };
}

// ============================================================================
// SAMPLE SCORING — v31
// ============================================================================
function computeSampleScore_v31(jobResult, envProfile, profile) {
  const { ok, latency } = jobResult;
  const sample = {
    jobReachScore: 0,
    reliabilityScore: 0,
    latencyScore: 0,
    environmentBonus: 0,
    capabilityBonus: 0
  };

  if (ok) {
    sample.jobReachScore += 5;
    sample.reliabilityScore += 5;
  } else {
    sample.reliabilityScore -= 3;
  }

  if (latency < 150) sample.latencyScore += 5;
  else if (latency < 500) sample.latencyScore += 2;
  else sample.latencyScore -= 2;

  if (envProfile.hasGPU) sample.environmentBonus += 3;
  if (envProfile.hasWorkerSupport) sample.environmentBonus += 2;

  const capTier = envProfile.capabilityTier;
  if (capTier === "immortal") sample.capabilityBonus += 6;
  else if (capTier === "elite") sample.capabilityBonus += 4;
  else if (capTier === "high") sample.capabilityBonus += 3;
  else if (capTier === "medium") sample.capabilityBonus += 2;
  else if (capTier === "low") sample.capabilityBonus += 1;

  if (profile.name === "stress" && ok)
    sample.reliabilityScore += 2;

  if (profile.name === "gpu-heavy" && envProfile.hasGPU)
    sample.environmentBonus += 3;

  if (profile.name === "cpu-heavy" && envProfile.cpuScore > 4000)
    sample.environmentBonus += 3;

  return sample;
}

// ============================================================================
// PUBLIC TEST RUNNER — v31 IMMORTAL‑INTEL‑WORLD
// ============================================================================
export async function runPulseEarnMktGolemTest_v31(profileName = "default") {
  const profile =
    PulseEarnMktGolemProfiles_v31[profileName] ||
    DEFAULT_TEST_PROFILE_V31;

  const envProfile = detectEnvProfile_v31();

  if (profile.requireGPU && !envProfile.hasGPU) {
    logGolemTest_v31("TEST_SKIPPED_NO_GPU_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktGolemTestMeta_v31,
      profile,
      envCaps: envProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "GPU required but not available"
    };
  }

  if (profile.requireCPU && envProfile.cpuScore <= 0) {
    logGolemTest_v31("TEST_SKIPPED_NO_CPU_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktGolemTestMeta_v31,
      profile,
      envCaps: envProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "CPU capability required but not available"
    };
  }

  logGolemTest_v31("TEST_START_V31", {
    profile: profile.name,
    envProfile
  });

  let score = createEmptyScore_v31();

  const tasks = [];
  const totalJobs = profile.maxParallelJobs * profile.jobKinds.length;

  for (let i = 0; i < totalJobs; i++) {
    const jobKind = profile.jobKinds[i % profile.jobKinds.length];

    tasks.push(
      (async () => {
        const result = await runSingleGolemJob_v31({
          kind: jobKind,
          payload: {
            testKind: "PulseEarnMktGolemTest_v31",
            profile: profile.name,
            sampleIndex: i
          },
          envProfile
        });

        const sampleScore = computeSampleScore_v31(
          result,
          envProfile,
          profile
        );
        score = accumulateScore_v31(score, sampleScore);
      })()
    );
  }

  await Promise.all(tasks);

  logGolemTest_v31("TEST_COMPLETE_V31", {
    profile: profile.name,
    score,
    envCaps: envProfile
  });

  return {
    meta: PulseEarnMktGolemTestMeta_v31,
    profile,
    envCaps: envProfile,
    score,
    skipped: false,
    golemHealingState:
      typeof getPulseEarnMktGolemHealingState === "function"
        ? getPulseEarnMktGolemHealingState()
        : null
  };
}

// ============================================================================
// WINDOW REGISTRATION
// ============================================================================

  PulseRealm.PulseEarnMktGolemTest_v31 = {
    meta: PulseEarnMktGolemTestMeta_v31,
    profiles: PulseEarnMktGolemProfiles_v31,
    run: runPulseEarnMktGolemTest_v31
  };


// ============================================================================
// EXPORTS
// ============================================================================
export const PulseEarnMktGolemTest = runPulseEarnMktGolemTest_v31;
export const PulseEarnMktGolem = PulseEarnMktGolem_v31;
export const PulseEarnMktGolemHealingState =
  getPulseEarnMktGolemHealingState;
