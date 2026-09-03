// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktFluenceTest-v31.js
// PULSE EARN — v31 MARKET FLUENCE (CPU/WASM) TEST HARNESS
// IMMORTAL‑INTEL‑OMEGA + CPU/WASM Capability + BinaryWave
// ============================================================================

/* eslint-disable no-console */

import {
  PulseEarnMktFluence_v31,
  getPulseEarnMktFluenceHealingState_v31
} from "./PulseEarnMktFluence-v31.js";

import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// META
// ============================================================================
export const PulseEarnMktFluenceTestMeta_v31 = Object.freeze({
  identity: "PulseEarnMktFluenceTest",
  version: "v31-Fluence-Immortal-Intel-Omega",
  role: "MARKET_FLUENCE_TEST",
  schemaVersion: "v2",
  guarantees: {
    pureComputeCore: true,
    cpuAware: true,
    wasmAware: true,
    capabilityAware: true,
    binaryWaveAware: true,
    presenceAware: true,
    advantageAware: true
  }
});



// ============================================================================
// LOGGING
// ============================================================================
function logFluenceTest_v31(stage, details = {}) {
  console.log(
    JSON.stringify({
      pulseTest: "PulseEarnMktFluenceTest_v31",
      pulseVer: PulseEarnMktFluenceTestMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// CPU / CAPABILITY ENV DETECTION — v31 IMMORTAL‑INTEL‑OMEGA
// ============================================================================
function detectCpuEnvProfile_v31() {
  let profile = {
    hasWorkerSupport: false,
    deviceProfile: null,
    capabilityTier: "none",
    capabilityScore: 0,
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
        dev.cpuTier ||
        "unknown";

      profile.capabilityScore = dev.capabilityScore || 0;
      profile.cpuScore = dev.cpuScore || 0;
      profile.memScore = dev.memScore || 0;
      profile.stabilityScore = dev.stabilityScore || 0;
    }
  } catch {
    // ignore
  }

  logFluenceTest_v31("CPU_ENV_PROFILE_DETECTED_V31", profile);
  return profile;
}

// ============================================================================
// TEST PROFILES — v31
// ============================================================================
const DEFAULT_TEST_PROFILE_V31 = Object.freeze({
  name: "default",
  description: "Balanced Fluence (CPU/WASM) test harness",
  maxParallelJobs: 6,
  jobKinds: ["fluence-ping", "fluence-offer", "fluence-report"],
  requireCPU: false,
  stressLevel: "medium"
});

const STRESS_TEST_PROFILE_V31 = Object.freeze({
  name: "stress",
  description: "High-load Fluence test harness",
  maxParallelJobs: 20,
  jobKinds: ["fluence-ping", "fluence-offer", "fluence-report"],
  requireCPU: false,
  stressLevel: "high"
});

const CPU_HEAVY_PROFILE_V31 = Object.freeze({
  name: "cpu-heavy",
  description: "CPU-preferred Fluence test harness",
  maxParallelJobs: 12,
  jobKinds: ["fluence-offer", "fluence-report"],
  requireCPU: true,
  stressLevel: "medium"
});

export const PulseEarnMktFluenceProfiles_v31 = Object.freeze({
  default: DEFAULT_TEST_PROFILE_V31,
  stress: STRESS_TEST_PROFILE_V31,
  cpuHeavy: CPU_HEAVY_PROFILE_V31
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
// RUN SINGLE FLUENCE JOB — v31
// ============================================================================
async function runSingleFluenceJob_v31({ kind, payload, cpuEnvProfile }) {
  const start = PulseRealm.PulseNOW;
  let ok = false;
  let error = null;

  try {
    let result;

    if (
      PulseEarnMktFluence_v31 &&
      typeof PulseEarnMktFluence_v31.runJob === "function"
    ) {
      result = await PulseEarnMktFluence_v31.runJob(kind, payload, {
        envCaps: cpuEnvProfile,
        deviceProfile: cpuEnvProfile.deviceProfile || null
      });
    } else if (typeof PulseEarnMktFluence_v31 === "function") {
      result = await PulseEarnMktFluence_v31(kind, payload, {
        envCaps: cpuEnvProfile,
        deviceProfile: cpuEnvProfile.deviceProfile || null
      });
    } else {
      throw new Error("PulseEarnMktFluence_v31 has no callable runJob");
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

  if (envProfile.hasWorkerSupport)
    sample.environmentBonus += 3;

  const capTier = envProfile.capabilityTier;
  if (capTier === "immortal") sample.capabilityBonus += 6;
  else if (capTier === "elite") sample.capabilityBonus += 4;
  else if (capTier === "high") sample.capabilityBonus += 3;
  else if (capTier === "medium") sample.capabilityBonus += 2;
  else if (capTier === "low") sample.capabilityBonus += 1;

  if (profile.name === "stress" && ok)
    sample.reliabilityScore += 2;

  if (profile.name === "cpu-heavy" && envProfile.cpuScore > 4000)
    sample.environmentBonus += 3;

  return sample;
}

// ============================================================================
// PUBLIC TEST RUNNER — v31 IMMORTAL‑INTEL‑OMEGA
// ============================================================================
export async function runPulseEarnMktFluenceTest_v31(profileName = "default") {
  const profile =
    PulseEarnMktFluenceProfiles_v31[profileName] || DEFAULT_TEST_PROFILE_V31;

  const cpuEnvProfile = detectCpuEnvProfile_v31();

  if (profile.requireCPU && cpuEnvProfile.cpuScore <= 0) {
    logFluenceTest_v31("TEST_SKIPPED_NO_CPU_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktFluenceTestMeta_v31,
      profile,
      envCaps: cpuEnvProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "CPU capability required but not available"
    };
  }

  logFluenceTest_v31("TEST_START_V31", {
    profile: profile.name,
    cpuEnvProfile
  });

  let score = createEmptyScore_v31();

  const tasks = [];
  const totalJobs = profile.maxParallelJobs * profile.jobKinds.length;

  for (let i = 0; i < totalJobs; i++) {
    const jobKind = profile.jobKinds[i % profile.jobKinds.length];

    tasks.push(
      (async () => {
        const result = await runSingleFluenceJob_v31({
          kind: jobKind,
          payload: {
            testKind: "PulseEarnMktFluenceTest_v31",
            profile: profile.name,
            sampleIndex: i
          },
          cpuEnvProfile
        });

        const sampleScore = computeSampleScore_v31(
          result,
          cpuEnvProfile,
          profile
        );
        score = accumulateScore_v31(score, sampleScore);
      })()
    );
  }

  await Promise.all(tasks);

  logFluenceTest_v31("TEST_COMPLETE_V31", {
    profile: profile.name,
    score,
    envCaps: cpuEnvProfile
  });

  return {
    meta: PulseEarnMktFluenceTestMeta_v31,
    profile,
    envCaps: cpuEnvProfile,
    score,
    skipped: false,
    fluenceHealingState:
      typeof getPulseEarnMktFluenceHealingState_v31 === "function"
        ? getPulseEarnMktFluenceHealingState_v31()
        : null
  };
}

// ============================================================================
// WINDOW REGISTRATION
// ============================================================================

  PulseRealm.PulseEarnMktFluenceTest_v31 = {
    meta: PulseEarnMktFluenceTestMeta_v31,
    profiles: PulseEarnMktFluenceProfiles_v31,
    run: runPulseEarnMktFluenceTest_v31
  };


// ============================================================================
// EXPORTS
// ============================================================================
export const PulseEarnMktFluenceTest = runPulseEarnMktFluenceTest_v31;
export const PulseEarnMktFluence = PulseEarnMktFluence_v31;
export const PulseEarnMktFluenceHealingState =
  getPulseEarnMktFluenceHealingState_v31;
