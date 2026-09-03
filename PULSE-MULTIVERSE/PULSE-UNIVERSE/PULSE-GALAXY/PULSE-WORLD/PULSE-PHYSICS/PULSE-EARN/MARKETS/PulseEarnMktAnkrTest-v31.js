// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktAnkrTest-v31.js
// PULSE EARN — v31 MARKET ANKR TEST HARNESS (IMMORTAL‑INTEL‑WORLD + GPU‑BEAST)
// ============================================================================

/* eslint-disable no-console */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  PulseEarnMktAnkr_v31,
  getPulseEarnMktAnkrHealingState_v31
} from "./PulseEarnMktAnkr-v31.js";

import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";



// ============================================================================
// META
// ============================================================================
export const PulseEarnMktAnkrTestMeta_v31 = Object.freeze({
  identity: "PulseEarnMktAnkrTest",
  version: "v31-Ankr-Immortal-Intel-World",
  role: "MARKET_ANKR_TEST",
  schemaVersion: "v2",
  guarantees: {
    pureComputeCore: true,
    gpuAware: true,
    capabilityAware: true,
    binaryWaveAware: true,
    presenceAware: true,
    advantageAware: true,
    arteryAware: true
  }
});



function logAnkrTest_v31(stage, details = {}) {
  console.log(
    JSON.stringify({
      pulseTest: "PulseEarnMktAnkrTest_v31",
      pulseVer: PulseEarnMktAnkrTestMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// GPU / CAPABILITY ENV DETECTION (v31)
// ============================================================================
function detectGpuEnvProfile_v31() {
  let profile = {
    hasGPU: false,
    hasWebGPU: false,
    hasWebGL: false,
    hasWorkerSupport: false,
    deviceProfile: null,
    capabilityTier: "none",
    capabilityScore: 0
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
      profile.deviceProfile = detected.deviceProfile;
      profile.capabilityTier =
        detected.deviceProfile.capabilityTier ||
        detected.deviceProfile.gpuTier ||
        "unknown";
      profile.capabilityScore =
        detected.deviceProfile.capabilityScore || 0;
    }
  } catch {
    // ignore
  }

  logAnkrTest_v31("GPU_ENV_PROFILE_DETECTED_V31", profile);
  return profile;
}

// ============================================================================
// TEST PROFILES (v31)
// ============================================================================
const DEFAULT_TEST_PROFILE_V31 = Object.freeze({
  name: "default",
  description: "Balanced ANKR test harness",
  maxParallelJobs: 6,
  jobKinds: ["ankr-ping", "ankr-offer", "ankr-report"],
  requireGPU: false,
  stressLevel: "medium"
});

const STRESS_TEST_PROFILE_V31 = Object.freeze({
  name: "stress",
  description: "High-load ANKR test harness",
  maxParallelJobs: 20,
  jobKinds: ["ankr-ping", "ankr-offer", "ankr-report"],
  requireGPU: false,
  stressLevel: "high"
});

const GPU_HEAVY_PROFILE_V31 = Object.freeze({
  name: "gpu-heavy",
  description: "GPU-preferred ANKR test harness",
  maxParallelJobs: 12,
  jobKinds: ["ankr-offer", "ankr-report"],
  requireGPU: true,
  stressLevel: "medium"
});

export const PulseEarnMktAnkrProfiles_v31 = Object.freeze({
  default: DEFAULT_TEST_PROFILE_V31,
  stress: STRESS_TEST_PROFILE_V31,
  gpuHeavy: GPU_HEAVY_PROFILE_V31
});

// ============================================================================
// SCORE MODEL (v31)
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
// RUN SINGLE ANKR JOB (v31)
// ============================================================================
async function runSingleAnkrJob_v31({ kind, payload, gpuEnvProfile }) {
  const start = PulseRealm.PulseNOW;
  let ok = false;
  let error = null;

  try {
    let result;

    if (
      PulseEarnMktAnkr_v31 &&
      typeof PulseEarnMktAnkr_v31.runJob === "function"
    ) {
      result = await PulseEarnMktAnkr_v31.runJob(kind, payload, {
        envCaps: gpuEnvProfile,
        deviceProfile: gpuEnvProfile.deviceProfile || null
      });
    } else if (typeof PulseEarnMktAnkr_v31 === "function") {
      result = await PulseEarnMktAnkr_v31(kind, payload, {
        envCaps: gpuEnvProfile,
        deviceProfile: gpuEnvProfile.deviceProfile || null
      });
    } else {
      throw new Error("PulseEarnMktAnkr_v31 has no callable runJob");
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
// SAMPLE SCORING (v31)
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

  // Base scoring
  if (ok) {
    sample.jobReachScore += 5;
    sample.reliabilityScore += 5;
  } else {
    sample.reliabilityScore -= 3;
  }

  // Latency scoring
  if (latency < 150) sample.latencyScore += 5;
  else if (latency < 500) sample.latencyScore += 2;
  else sample.latencyScore -= 2;

  // Environment bonuses
  if (envProfile.hasGPU || envProfile.hasWebGPU || envProfile.hasWebGL)
    sample.environmentBonus += 3;

  if (envProfile.hasWorkerSupport)
    sample.environmentBonus += 2;

  // Capability bonuses
  const capTier = envProfile.capabilityTier;
  if (capTier === "immortal") sample.capabilityBonus += 6;
  else if (capTier === "elite") sample.capabilityBonus += 4;
  else if (capTier === "high") sample.capabilityBonus += 3;
  else if (capTier === "medium") sample.capabilityBonus += 2;
  else if (capTier === "low") sample.capabilityBonus += 1;

  // Stress profile tweaks
  if (profile.name === "stress" && ok)
    sample.reliabilityScore += 2;

  if (profile.name === "gpu-heavy" && envProfile.hasGPU)
    sample.environmentBonus += 3;

  return sample;
}

// ============================================================================
// PUBLIC TEST RUNNER (v31)
// ============================================================================
export async function runPulseEarnMktAnkrTest_v31(profileName = "default") {
  const profile =
    PulseEarnMktAnkrProfiles_v31[profileName] || DEFAULT_TEST_PROFILE_V31;

  const gpuEnvProfile = detectGpuEnvProfile_v31();

  if (profile.requireGPU && !gpuEnvProfile.hasGPU) {
    logAnkrTest_v31("TEST_SKIPPED_NO_GPU_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktAnkrTestMeta_v31,
      profile,
      envCaps: gpuEnvProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "GPU required but not available"
    };
  }

  logAnkrTest_v31("TEST_START_V31", {
    profile: profile.name,
    gpuEnvProfile
  });

  let score = createEmptyScore_v31();

  const tasks = [];
  const totalJobs = profile.maxParallelJobs * profile.jobKinds.length;

  for (let i = 0; i < totalJobs; i++) {
    const jobKind = profile.jobKinds[i % profile.jobKinds.length];

    tasks.push(
      (async () => {
        const result = await runSingleAnkrJob_v31({
          kind: jobKind,
          payload: {
            testKind: "PulseEarnMktAnkrTest_v31",
            profile: profile.name,
            sampleIndex: i
          },
          gpuEnvProfile
        });

        const sampleScore = computeSampleScore_v31(result, gpuEnvProfile, profile);
        score = accumulateScore_v31(score, sampleScore);
      })()
    );
  }

  await Promise.all(tasks);

  logAnkrTest_v31("TEST_COMPLETE_V31", {
    profile: profile.name,
    score,
    envCaps: gpuEnvProfile
  });

  return {
    meta: PulseEarnMktAnkrTestMeta_v31,
    profile,
    envCaps: gpuEnvProfile,
    score,
    skipped: false,
    ankrHealingState:
      typeof getPulseEarnMktAnkrHealingState_v31 === "function"
        ? getPulseEarnMktAnkrHealingState_v31()
        : null
  };
}

// ============================================================================
// WINDOW REGISTRATION
// ============================================================================

  PulseRealm.PulseEarnMktAnkrTest_v31 = {
    meta: PulseEarnMktAnkrTestMeta_v31,
    profiles: PulseEarnMktAnkrProfiles_v31,
    run: runPulseEarnMktAnkrTest_v31
  };


// ============================================================================
// EXPORTS
// ============================================================================
export const PulseEarnMktAnkrTest = runPulseEarnMktAnkrTest_v31;
export const PulseEarnMktAnkr = PulseEarnMktAnkr_v31;
export const PulseEarnMktAnkrHealingState = getPulseEarnMktAnkrHealingState_v31;
