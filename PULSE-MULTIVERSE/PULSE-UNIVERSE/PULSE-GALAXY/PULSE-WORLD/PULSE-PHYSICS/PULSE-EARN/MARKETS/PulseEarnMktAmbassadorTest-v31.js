// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktAmbassadorTest-v31.js
// PULSE EARN — v31 IMMORTAL AMBASSADOR / GPU-AKASH-AWARE TEST HARNESS
// “MARKET AMBASSADOR / DISTRIBUTED AUCTIONEER / SIGNAL EVANGELIST”
//
//  • Uses ONLY Ambassador + GPU Process Worker (no CNS, no logger imports)
//  • Mirrors Auctioneer-style test harness structure
//  • GPU / Akash / engine profile via PulseGPUProcessWorker-v30
//  • Simple reach / reliability / latency / environment scoring
//  • Configurable profiles: default / stress / akash-gpu
//  • v31: capability-aware, GPU-profile surfaced into each route payload
//         so each market can use “best of abilities” per environment
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {
  PulseEarnMktAmbassador_v31,
  getAmbassadorHealingState_v31 as getPulseEarnMktAmbassadorHealingState_v31
} from "./PulseEarnMktAmbassador-v31.js";

// GPU process worker — v30 IMMORTAL capability engine
// (backed by PulseGPUProcessWorker-v30-Immortal++++-GPU+EARN-ALIGNED.js)
import { PulseGPUProcessWorker,
  detectDeviceProfile as detectGpuDeviceProfile
} from "../../../../../../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";
import { PulseEarnMktAnkrHealingState } from "./PulseEarnMktAnkrTest-v31.js";



// ============================================================================
// META
// ============================================================================

export const PulseEarnMktAmbassadorTestMeta_v31 = Object.freeze({
  identity: "PulseEarnMktAmbassadorTest",
  version: "v31-Immortal-Akash-GPU-Ambassador",
  role: "MARKET_AMBASSADOR_TEST",
  schemaVersion: "v2",
  guarantees: {
    pureComputeCore: true,
    dualBandAware: true,
    meshAware: true,
    pulseBandAware: true,
    akashAware: true,
    gpuAware: true,
    workerAware: true,
    capabilityAware: true,
    evolutionAware: true
  }
});

// ============================================================================
// GLOBAL ENV
// ============================================================================




function logAmbassador(stage, details = {}) {
  console.log(
    JSON.stringify({
      pulseTest: "PulseEarnMktAmbassadorTest",
      pulseVer: PulseEarnMktAmbassadorTestMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// GPU / AKASH / ENGINE PROFILE (via PulseGPUProcessWorker ONLY)
// ============================================================================

function detectGpuEnvProfile_v31() {
  let profile = {
    hasGPU: false,
    hasWebGPU: false,
    hasWebGL: false,
    akashHint: null,
    engineKind: null,
    hasWorkerSupport: false,
    deviceProfile: null
  };

  try {
    const detected = detectGpuDeviceProfile
      ? detectGpuDeviceProfile()
      : null;

    if (detected && typeof detected === "object") {
      profile = {
        ...profile,
        ...detected
      };
    }

    // Fallback engine hint
    if (!profile.engineKind && process.versions) {
      profile.engineKind = `node-${process.versions.node || "unknown"}`;
    }

    // Fallback Akash hints
    if (!profile.akashHint) {
      if (PulseRealm.AKASH_NODE || PulseRealm.AKASH_PROVIDER || (PulseRealm.AKASH_ENV)) {
        profile.akashHint = "env-flag";
      } else if (
        typeof process !== "undefined" &&
        (process.env.AKASH_NODE || process.env.AKASH_PROVIDER)
      ) {
        profile.akashHint = "node-env";
      }
    }

    // Worker support hint: if GPU process worker exists, assume some worker capability
    if (!profile.hasWorkerSupport && PulseGPUProcessWorker) {
      profile.hasWorkerSupport = true;
    }

    // Surface raw deviceProfile (if present) so Ambassador v31 can be capability-aware
    if (detected && detected.deviceProfile) {
      profile.deviceProfile = detected.deviceProfile;
    }
  } catch {
    // non-fatal
  }

  logAmbassador("GPU_ENV_PROFILE_DETECTED_V31", profile);
  return profile;
}

// ============================================================================
// TEST PROFILES
// ============================================================================

const DEFAULT_TEST_PROFILE_V31 = Object.freeze({
  name: "default",
  description: "Balanced test for ambassador reach + reliability",
  maxParallelRoutes: 4,
  routeTypes: ["ambassador-ping", "ambassador-offer", "ambassador-report"],
  requireGPU: false,
  requireAkash: false,
  stressLevel: "medium"
});

const STRESS_TEST_PROFILE_V31 = Object.freeze({
  name: "stress",
  description: "High-load test for ambassador under heavy routing pressure",
  maxParallelRoutes: 16,
  routeTypes: ["ambassador-ping", "ambassador-offer", "ambassador-report"],
  requireGPU: false,
  requireAkash: false,
  stressLevel: "high"
});

const AKASH_GPU_PROFILE_V31 = Object.freeze({
  name: "akash-gpu",
  description: "Akash + GPU preferred environment test for ambassador",
  maxParallelRoutes: 8,
  routeTypes: ["ambassador-offer", "ambassador-report"],
  requireGPU: true,
  requireAkash: true,
  stressLevel: "medium"
});

export const PulseEarnMktAmbassadorProfiles_v31 = Object.freeze({
  default: DEFAULT_TEST_PROFILE_V31,
  stress: STRESS_TEST_PROFILE_V31,
  akashGpu: AKASH_GPU_PROFILE_V31
});

// ============================================================================
// SCORE MODEL
// ============================================================================

function createEmptyScore_v31() {
  return {
    reachScore: 0,        // ability to touch many endpoints
    conversionScore: 0,   // ability to turn offers into actions
    reliabilityScore: 0,  // stability under repeated calls
    latencyScore: 0,      // responsiveness
    environmentBonus: 0,  // GPU / Akash / worker bonuses
    capabilityBonus: 0,   // v31: capability/evolution-aware bonus
    total: 0,
    samples: 0
  };
}

function accumulateScore_v31(score, sample) {
  const s = { ...score };

  s.reachScore += sample.reachScore || 0;
  s.conversionScore += sample.conversionScore || 0;
  s.reliabilityScore += sample.reliabilityScore || 0;
  s.latencyScore += sample.latencyScore || 0;
  s.environmentBonus += sample.environmentBonus || 0;
  s.capabilityBonus += sample.capabilityBonus || 0;
  s.samples += 1;

  s.total =
    s.reachScore +
    s.conversionScore +
    s.reliabilityScore +
    s.latencyScore +
    s.environmentBonus +
    s.capabilityBonus;

  return s;
}

// ============================================================================
// AMBASSADOR ROUTE RUNNER (AMBASSADOR-ONLY, NO CNS)
// ============================================================================

async function runSingleAmbassadorRoute_v31({ type, payload, gpuEnvProfile }) {
  const start = PulseRealm.PulseNOW;
  let ok = false;
  let error = null;

  try {
    let result;

    // v31: prefer .route(type, payload, context) with envCaps surfaced
    if (
      PulseEarnMktAmbassador_v31 &&
      typeof PulseEarnMktAmbassador_v31.route === "function"
    ) {
      result = await PulseEarnMktAmbassador_v31.route(type, payload, {
        envCaps: gpuEnvProfile,
        deviceProfile: gpuEnvProfile.deviceProfile || null
      });
    } else if (typeof PulseEarnMktAmbassador_v31 === "function") {
      // Fallback callable export
      result = await PulseEarnMktAmbassador_v31(type, payload, {
        envCaps: gpuEnvProfile,
        deviceProfile: gpuEnvProfile.deviceProfile || null
      });
    } else {
      throw new Error("PulseEarnMktAmbassador_v31 has no callable route");
    }

    ok = !result.error;
    if (!ok) error = result.error || "Unknown error";
  } catch (err) {
    ok = false;
    error = String(err);
  }

  const latency = PulseRealm.PulseNOW - start;

  return {
    ok,
    latency,
    error
  };
}

function computeSampleScore_v31(routeResult, envProfile, profile) {
  const { ok, latency } = routeResult;
  const sample = {
    reachScore: 0,
    conversionScore: 0,
    reliabilityScore: 0,
    latencyScore: 0,
    environmentBonus: 0,
    capabilityBonus: 0
  };

  // Base scoring (Auctioneer-style, simplified)
  if (ok) {
    sample.reachScore += 5;
    sample.conversionScore += 5;
    sample.reliabilityScore += 5;
  } else {
    sample.reliabilityScore -= 3;
  }

  if (latency < 150) {
    sample.latencyScore += 5;
  } else if (latency < 500) {
    sample.latencyScore += 2;
  } else {
    sample.latencyScore -= 2;
  }

  // Environment bonuses (from GPU env profile)
  if (envProfile.hasGPU || envProfile.hasWebGPU || envProfile.hasWebGL) {
    sample.environmentBonus += 3;
  }
  if (envProfile.akashHint) {
    sample.environmentBonus += 4;
  }
  if (envProfile.hasWorkerSupport) {
    sample.environmentBonus += 2;
  }

  // v31: capability-aware bonus — reward stronger capability tiers
  const cap = envProfile.deviceProfile || {};
  const capScore = typeof cap.capabilityScore === "number" ? cap.capabilityScore : 0;
  const capTier = cap.capabilityTier || cap.gpuTier || "unknown";

  if (capScore > 0) {
    if (capTier === "immortal") sample.capabilityBonus += 6;
    else if (capTier === "elite") sample.capabilityBonus += 4;
    else if (capTier === "high") sample.capabilityBonus += 3;
    else if (capTier === "medium") sample.capabilityBonus += 2;
    else if (capTier === "low") sample.capabilityBonus += 1;
  }

  // Profile-specific tweaks
  if (profile.name === "stress" && ok) {
    sample.reliabilityScore += 2;
  }
  if (
    profile.name === "akash-gpu" &&
    envProfile.akashHint &&
    (envProfile.hasGPU || envProfile.hasWebGPU)
  ) {
    sample.environmentBonus += 3;
    sample.capabilityBonus += 2;
  }

  return sample;
}

// ============================================================================
// PUBLIC TEST RUNNER (AMBASSADOR + GPU PROCESS WORKER ONLY) — v31
// ============================================================================

export async function runPulseEarnMktAmbassadorTest_v31(profileName = "default") {
  const profile =
    PulseEarnMktAmbassadorProfiles_v31[profileName] || DEFAULT_TEST_PROFILE_V31;

  const gpuEnvProfile = detectGpuEnvProfile_v31();

  // Hard requirements
  if (
    profile.requireGPU &&
    !gpuEnvProfile.hasGPU &&
    !gpuEnvProfile.hasWebGPU &&
    !gpuEnvProfile.hasWebGL
  ) {
    logAmbassador("TEST_SKIPPED_NO_GPU_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktAmbassadorTestMeta_v31,
      profile,
      envCaps: gpuEnvProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "GPU required but not available"
    };
  }

  if (profile.requireAkash && !gpuEnvProfile.akashHint) {
    logAmbassador("TEST_SKIPPED_NO_AKASH_V31", { profile: profile.name });
    return {
      meta: PulseEarnMktAmbassadorTestMeta_v31,
      profile,
      envCaps: gpuEnvProfile,
      score: createEmptyScore_v31(),
      skipped: true,
      reason: "Akash environment required but not detected"
    };
  }

  logAmbassador("TEST_START_V31", {
    profile: profile.name,
    version: PulseEarnMktAmbassadorTestMeta_v31.version,
    gpuEnvProfile
  });

  let score = createEmptyScore_v31();

  const tasks = [];
  const totalRoutes = profile.maxParallelRoutes * profile.routeTypes.length;

  for (let i = 0; i < totalRoutes; i++) {
    const routeType = profile.routeTypes[i % profile.routeTypes.length];

    tasks.push(
      (async () => {
        const result = await runSingleAmbassadorRoute_v31({
          type: routeType,
          payload: {
            testKind: "PulseEarnMktAmbassadorTest_v31",
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

  logAmbassador("TEST_COMPLETE_V31", {
    profile: profile.name,
    score,
    envCaps: gpuEnvProfile
  });

  return {
    meta: PulseEarnMktAmbassadorTestMeta_v31,
    profile,
    envCaps: gpuEnvProfile,
    score,
    skipped: false,
    ambassadorHealingState:
      typeof getPulseEarnMktAmbassadorHealingState_v31 === "function"
        ? getPulseEarnMktAmbassadorHealingState_v31()
        : null
  };
}

// ============================================================================
// GLOBAL REGISTRATION (OPTIONAL)
// ============================================================================


  PulseRealm.PulseEarnMktAmbassadorTest_v31 = {
    meta: PulseEarnMktAmbassadorTestMeta_v31,
    profiles: PulseEarnMktAmbassadorProfiles_v31,
    run: runPulseEarnMktAmbassadorTest_v31
  };


// ============================================================================
// EXPORTS (DEFAULT + NAMED)
// ============================================================================

export const PulseEarnMktAmbassadorTest = runPulseEarnMktAmbassadorTest_v31;
export const PulseEarnMktAmbassador = PulseEarnMktAmbassador_v31;
export const PulseEarnMktAmbassadorHealingState =
  getPulseEarnMktAmbassadorHealingState_v31;

  PulseRealm.EarnMktAmbassadorTest = {
    PulseEarnMktAmbassador,
    PulseEarnMktAmbassadorTest,
    PulseEarnMktAnkrHealingState,
    runPulseEarnMktAmbassadorTest_v31,
    runSingleAmbassadorRoute_v31,
    PulseEarnMktAmbassadorProfiles_v31
  }