// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktExecTest-v31.js
// PULSE EARN — v31 MARKET EXEC (iExec) TEST HARNESS
// IMMORTAL‑INTEL‑OMEGA + GPU‑BEAST + BinaryWave
// ============================================================================

/* eslint-disable no-console */

import {
  PulseEarnMktExec_v31,
  getPulseEarnMktExecHealingState_v31
} from "./PulseEarnMktExec-v31.js";

import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// META
// ============================================================================
export const PulseEarnMktExecTestMeta_v31 = Object.freeze({
  identity: "PulseEarnMktExecTest",
  version: "v31-Exec-Immortal-Intel-Omega",
  role: "MARKET_EXEC_TEST",
  schemaVersion: "v2",
  guarantees: {
    pureComputeCore: true,
    gpuAware: true,
    capabilityAware: true,
    binaryWaveAware: true,
    presenceAware: true,
    advantageAware: true
  }
});

// ============================================================================
// LOGGING
// ============================================================================
function logExecTest_v31(stage, details = {}) {
  console.log(
    JSON.stringify({
      pulseTest: "PulseEarnMktExecTest_v31",
      pulseVer: PulseEarnMktExecTestMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// GPU / CAPABILITY ENV DETECTION — v31 IMMORTAL‑INTEL‑OMEGA
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

  logExecTest_v31("GPU_ENV_PROFILE_DETECTED_V31", profile);
  return profile;
}

// ============================================================================
// TEST PROFILES — v31
// ============================================================================
const DEFAULT_TEST_PROFILE_V31 = Object.freeze({
  name: "default",
  description: "Balanced Exec (iExec) test harness",
  maxParallelJobs: 6,
  jobKinds: ["exec-ping", "exec-offer", "exec-report"],
  requireGPU: false,
  stressLevel: "medium"
});

const STRESS_TEST_PROFILE_V31 = Object.freeze({
  name: "stress",
  description: "High-load Exec test harness",
  maxParallelJobs: 20,
  jobKinds: ["exec-ping", "exec-offer", "exec-report"],
  requireGPU: false,
  stressLevel: "high"
});

const GPU_HEAVY_PROFILE_V31 = Object.freeze({
  name: "gpu-heavy",
  description: "GPU-preferred Exec test harness",
  maxParallelJobs: 12,
  jobKinds: ["exec-offer", "exec-report"],
  requireGPU: true,
  stressLevel: "medium"
});

export const PulseEarnMktExecProfiles_v31 = Object.freeze({
  default: DEFAULT_TEST_PROFILE_V31,
  stress: STRESS_TEST_PROFILE_V31,
  gpuHeavy: GPU_HEAVY_PROFILE_V31
});

// ============================================================================
// SCORE MODEL — v31 IMMORTAL‑INTEL‑OMEGA
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
// RUN SINGLE EXEC JOB — v31
// ============================================================================
async function runSingleExecJob_v31({ kind, payload, gpuEnvProfile }) {
  const start = PulseRealm.PulseNOW;
  let ok = false;
  let error = null;

  try {
    let result;

    if (
      PulseEarnMktExec_v31 &&
      typeof PulseEarnMktExec_v31.runJob === "function"
    ) {
      result = await PulseEarnMktExec_v31.runJob(kind, payload, {
        envCaps: gpuEnvProfile,
        deviceProfile: gpuEnvProfile.deviceProfile || null
      });
    } else if (typeof PulseEarnMktExec_v31 === "function") {
      result = await PulseEarnMktExec_v31(kind, payload, {
        envCaps: gpuEnvProfile,
        deviceProfile: gpuEnvProfile.deviceProfile || null
      });
    } else {
      throw new Error("PulseEarnMktExec_v31 has no callable runJob");
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

  if (envProfile.hasGPU || envProfile.hasWebGPU || envProfile.hasWebGL)
    sample.environmentBonus += 3;

  if (envProfile.hasWorkerSupport)
    sample.environmentBonus += 2;

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

  return sample;
}

// ============================================================================
// PUBLIC TEST RUNNER — v31 IMMORTAL‑INTEL‑OMEGA
// ============================================================================
export async function runPulseEarnMktExecTest_v31(profileName = "default") {
  const profile =
    PulseEarnMktExecProfiles_v31[profileName] || DEFAULT_TEST_PROFILE_V31;

  const gpuEnvProfile = detectGpuEnvProfile_v31();

  if (profile.requireGPU && !gpuEnvProfile.hasGPU) {
    logExecTest_v31("TEST_SKIPPED_NO_GPU_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktExecTestMeta_v31,
      profile,
      envCaps: gpuEnvProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "GPU required but not available"
    };
  }

  logExecTest_v31("TEST_START_V31", {
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
        const result = await runSingleExecJob_v31({
          kind: jobKind,
          payload: {
            testKind: "PulseEarnMktExecTest_v31",
            profile: profile.name,
            sampleIndex: i
          },
          gpuEnvProfile
        });

        const sampleScore = computeSampleScore_v31(
          result,
          gpuEnvProfile,
          profile
        );
        score = accumulateScore_v31(score, sampleScore);
      })()
    );
  }

  await Promise.all(tasks);

  logExecTest_v31("TEST_COMPLETE_V31", {
    profile: profile.name,
    score,
    envCaps: gpuEnvProfile
  });

  return {
    meta: PulseEarnMktExecTestMeta_v31,
    profile,
    envCaps: gpuEnvProfile,
    score,
    skipped: false,
    execHealingState:
      typeof getPulseEarnMktExecHealingState_v31 === "function"
        ? getPulseEarnMktExecHealingState_v31()
        : null
  };
}

// ============================================================================
// WINDOW REGISTRATION
// ============================================================================

  PulseRealm.PulseEarnMktExecTest_v31 = {
    meta: PulseEarnMktExecTestMeta_v31,
    profiles: PulseEarnMktExecProfiles_v31,
    run: runPulseEarnMktExecTest_v31
  };


// ============================================================================
// EXPORTS
// ============================================================================
export const PulseEarnMktExecTest = runPulseEarnMktExecTest_v31;
export const PulseEarnMktExec = PulseEarnMktExec_v31;
export const PulseEarnMktExecHealingState = getPulseEarnMktExecHealingState_v31;
