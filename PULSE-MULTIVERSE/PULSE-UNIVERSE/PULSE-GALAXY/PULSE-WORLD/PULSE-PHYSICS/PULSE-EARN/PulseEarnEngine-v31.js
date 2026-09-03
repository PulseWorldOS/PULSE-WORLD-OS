// ============================================================================
// FILE: PULSE-WORLD-OS/.../PULSE-EARN/PulseEarnEngine-v31-Immortal-GPU-INTEL.js
// LAYER: THE EARN ENGINE / MINER ORGAN (v31-Immortal-GPU-INTEL)
// ============================================================================
//
// ROLE (v31-Immortal-GPU-INTEL):
//   THE EARN ENGINE — GPU‑aware miner organ for Pulse‑Earn v31.
//   • Sits ABOVE the Earn Heartbeat (PulseEarnHeart-v30) as the lane orchestrator.
//   • Spins up 32–64 Earn Heartbeat lanes per cycle (configurable).
//   • Uses IMMORTAL capability profile (GPU + CPU + memory + bandwidth).
//   • Chooses per‑lane computeMode: "gpu" or "cpu" (never GPU‑only).
//   • Avoids GPU over‑utilization via pressure‑aware lane throttling.
//   • Delegates final impulses to the Earn Send System (network / compute / crypto).
//   • Emits v31 INTEL surfaces about lane usage, throttle mode, miner health,
//     capabilityTier / capabilityScore, and GPU utilization decisions.
//
// CONTRACT (v31-Immortal-GPU-INTEL):
//   • Deterministic orchestration — no randomness in lane selection or counts.
//   • No direct network calls — all IO goes through provided send/lymph/metabolism organs.
//   • No eval(), no Function(), no dynamic imports.
//   • No mutation of job objects; only structural wrapping of results.
//   • Lane count + computeMode decisions are metadata-only (explicit, not hidden).
//   • Async is allowed at the orchestration level (Promise.all), but each organ remains pure.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseEarnSendSystem_v31 } from "./PULSES/PulseEarnSendSystem-v31.js";
import { createPulseEarnHeart } from "./PulseEarnHeart-v31.js";
import { executePulseEarnJob } from "./PulseEarnMetabolism-v31.js";
import { submitPulseEarnResult } from "./PulseEarnLymphNodes-v31.js";



// ============================================================================
// IMMORTAL CAPABILITY SUBSTRATE — deviceProfile / capabilityTier / capabilityScore
// ============================================================================

function getImmortalCapabilityProfile(explicitDeviceProfile = null) {
  // 1) Explicit deviceProfile passed into engine (highest priority)
  if (explicitDeviceProfile && typeof explicitDeviceProfile === "object") {
    return normalizeDeviceProfile(explicitDeviceProfile);
  }

  // 2) Global substrate (GPU Process Worker / detectDeviceProfile)
  const globalDevice =
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  if (globalDevice) {
    return normalizeDeviceProfile(globalDevice);
  }

  // 3) Fallback — conservative but strong default
  const gpuScore = 7200;
  const cpuScore = 3600;
  const memScore = 4800;
  const bandwidth = 500;
  const stability = 0.97;
  const capabilityScore =
    gpuScore * 0.5 +
    cpuScore * 0.2 +
    memScore * 0.2 +
    bandwidth * 0.05 +
    stability * 0.05;

  return {
    gpuTier: "elite",
    gpuScore,
    gpuRam: 24,
    cpuScore,
    memScore,
    bandwidthMbps: bandwidth,
    stabilityScore: stability,
    capabilityScore,
    capabilityTier: "elite",
    gpuPressure: 0
  };
}

function normalizeDeviceProfile(raw) {
  const gpuScore = Number(raw.gpuScore ?? 0);
  const gpuRam = Number(raw.gpuRam ?? 0);
  const cpuScore = Number(raw.cpuScore ?? 0);
  const memScore = Number(raw.memScore ?? 0);
  const bandwidth = Number(raw.bandwidthMbps ?? raw.bandwidth ?? 0);
  const stability = Number(raw.stabilityScore ?? raw.stability ?? 0);
  const gpuPressure = Number(raw.gpuPressure ?? raw.gpuLoadPressure ?? 0);

  const capabilityScore =
    typeof raw.capabilityScore === "number"
      ? raw.capabilityScore
      : gpuScore * 0.5 +
        cpuScore * 0.2 +
        memScore * 0.2 +
        bandwidth * 0.05 +
        stability * 0.05;

  const capabilityTier =
    raw.capabilityTier ||
    raw.gpuTier ||
    classifyCapabilityTier(capabilityScore);

  return {
    gpuTier: capabilityTier,
    gpuScore,
    gpuRam,
    cpuScore,
    memScore,
    bandwidthMbps: bandwidth,
    stabilityScore: stability,
    capabilityScore,
    capabilityTier,
    gpuPressure: Math.max(0, Math.min(1, gpuPressure))
  };
}

function classifyCapabilityTier(score) {
  if (score >= 9000) return "immortal";
  if (score >= 7000) return "elite";
  if (score >= 5000) return "high";
  if (score >= 3000) return "medium";
  if (score > 0) return "low";
  return "none";
}

// ============================================================================
// Engine Constants — lane policy
// ============================================================================

const MAX_LANES = 64;   // conceptual maximum lanes (full miner blast)
const MIN_LANES = 16;   // allow more granular scaling in v31
const DEFAULT_LANES = 64;

// GPU pressure thresholds (0–1)
const GPU_PRESSURE_SOFT_CAP = 0.75;  // above this, start backing off lanes
const GPU_PRESSURE_HARD_CAP = 0.9;   // above this, strongly reduce GPU usage

// ============================================================================
// Engine Healing / Telemetry — miner-level state
// ============================================================================

export const engineHealing = {
  version: "v31-Immortal-GPU-INTEL-MINER",
  cycles: 0,

  lastLaneCount: 0,
  lastThrottleMode: "full", // "full" (64), "half" (32), "custom", "capability", "gpu_relief"
  lastCycleJobs: 0,
  lastCycleSuccesses: 0,
  lastCycleFailures: 0,

  lastErrors: [],
  lastEngineProfile: null,
  lastCapabilityProfile: null,

  // GPU-aware telemetry
  lastGpuPressure: 0,
  lastGpuLanes: 0,
  lastCpuLanes: 0
};

export function getPulseEarnEngineHealingState_v31() {
  return { ...engineHealing };
}

// ============================================================================
// Lane Policy — decide how many lanes to run this cycle (CAPABILITY + GPU-AWARE)
// ============================================================================

function decideLaneCount({ throttleMode, requestedLanes, capabilityProfile, gpuPressure }) {
  // Explicit requested lanes always win (within bounds)
  if (requestedLanes && requestedLanes > 0) {
    const clamped = Math.max(
      MIN_LANES,
      Math.min(MAX_LANES, requestedLanes)
    );
    return { lanes: clamped, mode: "custom" };
  }

  // Explicit throttle mode override
  if (throttleMode === "half") {
    return { lanes: Math.max(MIN_LANES, 32), mode: "half" };
  }

  const tier = capabilityProfile.capabilityTier || capabilityProfile.gpuTier || "medium";
  const score = capabilityProfile.capabilityScore ?? 0;

  // Base lane count from capability
  let baseLanes;
  if (tier === "immortal" || tier === "elite" || score >= 7000) {
    baseLanes = MAX_LANES;
  } else if (tier === "high" || score >= 5000) {
    baseLanes = 48;
  } else if (tier === "medium" || score >= 3000) {
    baseLanes = 32;
  } else {
    baseLanes = 24;
  }

  // GPU pressure relief: if GPU is already hot, reduce lanes
  let mode = "capability";
  if (gpuPressure >= GPU_PRESSURE_HARD_CAP) {
    baseLanes = Math.max(MIN_LANES, Math.floor(baseLanes * 0.4));
    mode = "gpu_relief";
  } else if (gpuPressure >= GPU_PRESSURE_SOFT_CAP) {
    baseLanes = Math.max(MIN_LANES, Math.floor(baseLanes * 0.7));
    mode = "gpu_relief";
  }

  const lanes = Math.max(MIN_LANES, Math.min(MAX_LANES, baseLanes));
  return { lanes, mode };
}

// ============================================================================
// Compute Mode Policy — per-lane GPU vs CPU decision
// ============================================================================
//
// We never force everything onto GPU. Instead, we:
//   • Prefer GPU for GPU‑heavy / mining jobs when pressure is acceptable.
//   • Prefer CPU for light / bookkeeping / settlement jobs.
//   • Blend modes per lane based on job + hints + pressure.

function decideComputeMode({ job, capabilityProfile, gpuPressure, globalHints }) {
  const tier = capabilityProfile.capabilityTier || "medium";
  const gpuScore = capabilityProfile.gpuScore ?? 0;

  const gpuPreferred =
    job.requiresGpu === true ||
    job.gpuPreferred === true ||
    job.marketplace === "gpu" ||
    job.pattern === "GPU_MINING" ||
    job.type === "GPU_EARN_TASK";

  const cpuPreferred =
    job.cpuPreferred === true ||
    job.marketplace === "cpu" ||
    job.pattern === "SETTLEMENT" ||
    job.type === "EARN_SETTLEMENT";

  const globalGpuBias = globalHints.gpuBias ?? 0; // -1..1 (negative = CPU bias)

  // If GPU is very hot, bias strongly to CPU
  if (gpuPressure >= GPU_PRESSURE_HARD_CAP) {
    return "cpu";
  }

  // If GPU is moderately hot, only use GPU for explicitly GPU-required jobs
  if (gpuPressure >= GPU_PRESSURE_SOFT_CAP) {
    if (gpuPreferred && !cpuPreferred) return "gpu";
    return "cpu";
  }

  // GPU is cool enough — use capability + hints
  if (gpuPreferred && tier !== "low" && gpuScore > 0) {
    return "gpu";
  }

  if (cpuPreferred) {
    return "cpu";
  }

  // Neutral jobs: use global bias + capability
  if (globalGpuBias > 0 && tier !== "low" && gpuScore > 0) {
    return "gpu";
  }

  return "cpu";
}

// ============================================================================
// Engine Profile — miner-level INTEL surface (CAPABILITY + GPU-AWARE)
// ============================================================================

function buildEngineProfile({
  cycleIndex,
  laneCount,
  throttleMode,
  jobsCount,
  successCount,
  failureCount,
  capabilityProfile,
  gpuLanes,
  cpuLanes
}) {
  const total = jobsCount || 0;
  const successRate = total > 0 ? successCount / total : 0;
  const failureRate = total > 0 ? failureCount / total : 0;

  return {
    engineVersion: "v31-Immortal-GPU-INTEL-MINER",
    cycleIndex,
    laneCount,
    throttleMode,
    jobsCount: total,
    successCount,
    failureCount,
    successRate,
    failureRate,

    capabilityTier: capabilityProfile.capabilityTier ?? capabilityProfile.gpuTier ?? "unknown",
    capabilityScore: capabilityProfile.capabilityScore ?? 0,
    gpuScore: capabilityProfile.gpuScore ?? 0,
    gpuRam: capabilityProfile.gpuRam ?? 0,
    bandwidthMbps: capabilityProfile.bandwidthMbps ?? 0,
    stabilityScore: capabilityProfile.stabilityScore ?? 0,

    gpuPressure: capabilityProfile.gpuPressure ?? 0,
    gpuLanes: gpuLanes ?? 0,
    cpuLanes: cpuLanes ?? 0
  };
}

// ============================================================================
// PUBLIC API — createPulseEarnEngine_v31 (THE GPU-AWARE MINER)
// ============================================================================

export function createPulseEarnEngine_v31({
  sendSystem,      // low-level PulseSendSystem (required)
  sdn = null,      // optional SDN bus for telemetry
  log = console.log,
  deviceProfile = null,      // optional explicit device profile
  throttleMode = "full",     // "full" (64) or "half" (32)
  requestedLanes = null      // optional explicit lane count
} = {}) {
  // Resolve IMMORTAL capability profile (explicit > global > fallback)
  const capabilityProfile = getImmortalCapabilityProfile(deviceProfile);
  engineHealing.lastCapabilityProfile = capabilityProfile;
  engineHealing.lastGpuPressure = capabilityProfile.gpuPressure ?? 0;

  // Wrap the low-level sendSystem into the Earn Send System layer
  const earnSendSystem = createPulseEarnSendSystem_v31({
    sendSystem,
    sdn,
    log,
    deviceProfile: capabilityProfile
  });

  // Create the Earn Heart organ (per-lane heartbeat)
  const earnHeart = createPulseEarnHeart({
    pulseSendSystem: earnSendSystem,
    log
  });

  const engineRef = {
    running: true,
    throttleMode,
    requestedLanes,
    presenceContext: {},
    advantageContext: {},
    hintsContext: {},
    band: "symbolic",
    capabilityProfile
  };

  function emitSDN(event, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(event, payload);
    } catch (err) {
      log && log("[PulseEarnEngine-v31] SDN emit failed (non-fatal)", {
        event,
        err
      });
    }
  }

  // --------------------------------------------------------------------------
  // MAIN MINER CYCLE — runLanesOnce
  // --------------------------------------------------------------------------

  async function runLanesOnce({ globalHints = {} } = {}) {
    if (!engineRef.running) {
      return {
        ok: false,
        reason: "engine_not_running",
        lanes: 0,
        results: []
      };
    }

    engineHealing.cycles++;
    const cycleIndex = engineHealing.cycles;

    // Refresh capability profile GPU pressure from global substrate if present
    const refreshedProfile = getImmortalCapabilityProfile(engineRef.capabilityProfile);
    engineRef.capabilityProfile = refreshedProfile;
    engineHealing.lastCapabilityProfile = refreshedProfile;
    engineHealing.lastGpuPressure = refreshedProfile.gpuPressure ?? 0;

    const laneDecision = decideLaneCount({
      throttleMode: engineRef.throttleMode,
      requestedLanes: engineRef.requestedLanes,
      capabilityProfile: engineRef.capabilityProfile,
      gpuPressure: engineRef.capabilityProfile.gpuPressure ?? 0
    });

    const laneCount = laneDecision.lanes;
    const throttleModeUsed = laneDecision.mode;

    engineHealing.lastLaneCount = laneCount;
    engineHealing.lastThrottleMode = throttleModeUsed;
    engineHealing.lastErrors = [];

    emitSDN("earnEngine:cycle_begin_v31", {
      cycleIndex,
      laneCount,
      throttleMode: throttleModeUsed,
      capabilityProfile: engineRef.capabilityProfile
    });

    let gpuLanes = 0;
    let cpuLanes = 0;

    // Build lane tasks — each lane runs one Earn Heartbeat cycle.
    const laneTasks = [];
    for (let laneId = 0; laneId < laneCount; laneId++) {
      laneTasks.push(
        (async () => {
          try {
            const cardiacOutput = earnHeart.cycle(
              laneId,
              engineRef,
              globalHints
            );

            if (!cardiacOutput) {
              return {
                ok: false,
                laneId,
                reason: "no_job_or_heartbeat_idle"
              };
            }

            const { job, result: heartResult } = cardiacOutput;

            if (!job) {
              return {
                ok: false,
                laneId,
                reason: "no_job_in_cardiac_output",
                cardiacOutput
              };
            }

            const computeMode = decideComputeMode({
              job,
              capabilityProfile: engineRef.capabilityProfile,
              gpuPressure: engineRef.capabilityProfile.gpuPressure ?? 0,
              globalHints
            });

            if (computeMode === "gpu") gpuLanes++;
            else cpuLanes++;

            const metabolicResult = executePulseEarnJob(
              job,
              heartResult,
              {
                laneId,
                cycleIndex,
                deviceProfile: engineRef.capabilityProfile,
                computeMode,
                globalHints
              }
            );

            const submission = submitPulseEarnResult(
              job,
              metabolicResult,
              {
                laneId,
                cycleIndex,
                deviceProfile: engineRef.capabilityProfile,
                computeMode,
                globalHints
              }
            );

            const sendOutcome = earnSendSystem.send(
              {
                tickId: `${cycleIndex}:${laneId}`,
                intent: job.pattern || "EARN_JOB",
                payload: {
                  job,
                  metabolicResult,
                  submission,
                  computeMode
                }
              },
              {
                globalHints,
                meshSignals: globalHints.meshSignals || {},
                serverAdvantageHints: globalHints.serverAdvantageHints || {},
                capabilityProfile: engineRef.capabilityProfile,
                computeMode
              }
            );

            return {
              ok: true,
              laneId,
              jobId: job.id,
              marketplace: job.marketplace,
              metabolicResult,
              submission,
              sendOutcome,
              capabilityProfile: engineRef.capabilityProfile,
              computeMode
            };
          } catch (err) {
            const errorString = String(
              err && err.message ? err.message : err
            );
            engineHealing.lastErrors.push(errorString);
            return {
              ok: false,
              laneId,
              reason: "lane_error",
              error: errorString
            };
          }
        })()
      );
    }

    const laneResults = await Promise.all(laneTasks);

    let jobsCount = 0;
    let successCount = 0;
    let failureCount = 0;

    for (const r of laneResults) {
      if (!r) continue;
      if (r.ok && r.jobId) {
        jobsCount++;
        successCount++;
      } else if (!r.ok) {
        failureCount++;
      }
    }

    engineHealing.lastCycleJobs = jobsCount;
    engineHealing.lastCycleSuccesses = successCount;
    engineHealing.lastCycleFailures = failureCount;
    engineHealing.lastGpuLanes = gpuLanes;
    engineHealing.lastCpuLanes = cpuLanes;

    const engineProfile = buildEngineProfile({
      cycleIndex,
      laneCount,
      throttleMode: throttleModeUsed,
      jobsCount,
      successCount,
      failureCount,
      capabilityProfile: engineRef.capabilityProfile,
      gpuLanes,
      cpuLanes
    });

    engineHealing.lastEngineProfile = engineProfile;

    emitSDN("earnEngine:cycle_end_v31", {
      cycleIndex,
      laneCount,
      throttleMode: throttleModeUsed,
      engineProfile,
      laneResults,
      capabilityProfile: engineRef.capabilityProfile
    });

    return {
      ok: true,
      cycleIndex,
      laneCount,
      throttleMode: throttleModeUsed,
      engineProfile,
      laneResults,
      capabilityProfile: engineRef.capabilityProfile
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC ENGINE API
  // --------------------------------------------------------------------------

  return {
    runOnce: (opts = {}) => runLanesOnce(opts),

    async runLoop({ globalHints = {}, shouldContinue } = {}) {
      let keepGoing = true;
      while (keepGoing && engineRef.running) {
        const summary = await runLanesOnce({ globalHints });
        if (typeof shouldContinue === "function") {
          keepGoing = !!shouldContinue(summary);
        } else {
          keepGoing = (summary.engineProfile.jobsCount || 0) > 0;
        }
      }
    },

    stop() {
      engineRef.running = false;
    },

    start() {
      engineRef.running = true;
    },

    setThrottleMode(mode) {
      if (mode === "full" || mode === "half") {
        engineRef.throttleMode = mode;
      }
    },

    setRequestedLanes(n) {
      if (typeof n === "number" && n > 0) {
        engineRef.requestedLanes = n;
      }
    },

    setDeviceProfile(dp) {
      engineRef.capabilityProfile = getImmortalCapabilityProfile(dp);
      engineHealing.lastCapabilityProfile = engineRef.capabilityProfile;
      engineHealing.lastGpuPressure = engineRef.capabilityProfile.gpuPressure ?? 0;
    },

    getHealingState() {
      return getPulseEarnEngineHealingState_v31();
    },
    
    prewarm(globalHints = {}) {
      try {
        // 1. Warm capability profile
        const profile = getImmortalCapabilityProfile(engineRef.capabilityProfile);
        engineRef.capabilityProfile = profile;
        engineHealing.lastCapabilityProfile = profile;
        engineHealing.lastGpuPressure = profile.gpuPressure ?? 0;

        // 2. Warm lane decision logic (but do NOT run lanes)
        const laneDecision = decideLaneCount({
          throttleMode: engineRef.throttleMode,
          requestedLanes: engineRef.requestedLanes,
          capabilityProfile: profile,
          gpuPressure: profile.gpuPressure ?? 0
        });

        engineHealing.lastLaneCount = laneDecision.lanes;
        engineHealing.lastThrottleMode = laneDecision.mode;

        // 3. Warm Earn Heart (heartbeat warm-up)
        try {
          earnHeart.cycle(
            0, // laneId
            engineRef,
            { ...globalHints, prewarm: true }
          );
        } catch (err) {
          log("[PulseEarnEngine-v31] Heart prewarm failed (non-fatal)", String(err));
        }

        // 4. Warm Earn Send System (no real send)
        try {
          earnSendSystem.send(
            {
              tickId: "prewarm:0",
              intent: "EARN_PREWARM",
              payload: {
                warm: true,
                capabilityProfile: profile
              }
            },
            {
              globalHints,
              capabilityProfile: profile,
              computeMode: "cpu"
            }
          );
        } catch (err) {
          log("[PulseEarnEngine-v31] SendSystem prewarm failed (non-fatal)", String(err));
        }

        // 5. Warm SDN bus (if present)
        try {
          emitSDN("earnEngine:prewarm_v31", {
            capabilityProfile: profile,
            throttleMode: engineRef.throttleMode,
            requestedLanes: engineRef.requestedLanes
          });
        } catch (err) {
          log("[PulseEarnEngine-v31] SDN prewarm failed (non-fatal)", String(err));
        }

        // 6. Warm healing state
        engineHealing.lastEngineProfile = {
          cycleIndex: 0,
          laneCount: laneDecision.lanes,
          throttleMode: laneDecision.mode,
          jobsCount: 0,
          successCount: 0,
          failureCount: 0,
          capabilityProfile: profile,
          gpuLanes: 0,
          cpuLanes: 0
        };

        return {
          ok: true,
          warmed: true,
          capabilityProfile: profile,
          laneDecision,
          healing: engineHealing.lastEngineProfile
        };
      } catch (err) {
        return {
          ok: false,
          warmed: false,
          error: String(err)
        };
      }
    }
  };
}

PulseRealm.EarnEngine = {
  getPulseEarnEngineHealingState_v31,
  createPulseEarnEngine_v31,
  engineHealing
}

PulseRealm.PulseEarnEngine = createPulseEarnEngine_v31;