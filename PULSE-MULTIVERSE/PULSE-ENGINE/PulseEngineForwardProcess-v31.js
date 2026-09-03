// ============================================================================
// FILE: PULSE-ENGINE/PulseForwardMotion-v35-IMMORTAL-GPU-EARN-HARMONIC-ENGINE.js
// LAYER: FORWARD MOTION + GPU + EARN + HARMONICS (v35 IMMORTAL++)
// ============================================================================
//
// ROLE (v35-IMMORTAL-GPU-EARN-HARMONIC-ENGINE):
//   FORWARD MOTION ORGAN + GPU PROCESS WORKER + EARN ENGINE + HARMONIC ENGINE.
//   • Expands patterns, predicts next states, generates prefillChunks.
//   • Executes GPU cache/compute jobs, pixel compute jobs, and Earn jobs as MotionJobs.
//   • Routes harmonic / vocal / pacing / escalation jobs via PulseHarmonicProcessWorker-v34.
//   • Hybrid mode C3: Balanced Trinity with Harmonic Safety override.
//   • If Harmonics is in distress / 911 mode → GPU gaming gets out of the way.
//   • Earn is HELP lane; can be full miner when safe, help-only when in safety mode.
//   • Deterministic job shaping; hints are metadata-only.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// v31 engine core
import { PulseEngineProcess as createPulseMotionEngine } from "./PulseEngineProcess-v31.js";
// v31 GPU worker
import { PulseGPUProcessWorker } from "./PulseEngineGPUProcessWorker-v31.js";
// v34 harmonics worker (GPU-free)
import { PulseHarmonicProcessWorker, createPulseHarmonicProcessWorker} from "./PulseEngineHarmonicsProcessWorker-v31.js";





const presenceContext =
  (typeof window !== "undefined" && PulseRealm.PULSE_PRESENCE) ||
  PulseRealm.PULSE_PRESENCE ||
  {};

const advantageContext =
  (typeof window !== "undefined" && PulseRealm.PULSE_ADVANTAGE) ||
  PulseRealm.PULSE_ADVANTAGE ||
  {};

const cosmosContext =
  (typeof window !== "undefined" && PulseRealm.PULSE_COSMOS) ||
  PulseRealm.PULSE_COSMOS ||
  {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  };

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

const PIXEL_PUSH_TYPE        = "PIXEL_PUSH";
const PIXEL_GPU_COMPUTE_TYPE = "GPU_COMPUTE_PIXEL";

const HARMONIC_PING_TYPE     = "HARMONIC_PING";
const HARMONIC_PATTERN_TYPE  = "HARMONIC_PATTERN";
const HARMONIC_ESCALATE_TYPE = "HARMONIC_ESCALATE";
const HARMONIC_SOFT_TYPE     = "HARMONIC_SOFT";
const HARMONIC_ALERT_TYPE    = "HARMONIC_ALERT";
const HARMONIC_SYSTEM_TYPE   = "HARMONIC_SYSTEM";

export const FORWARD_MOTION_ROLE_V35 = Object.freeze({
  lane: "forward",
  motionType: "expansion",
  band: "dual",
  description: [
    "Expands patterns, predicts next states, generates prefillChunks,",
    "executes GPU/Earn/Pixel jobs, and routes harmonic/vocal/pacing jobs.",
    "Hybrid C3: Balanced Trinity with Harmonic Safety override for 911/distress.",
    "GPU for heavy compute/gaming, Earn as HELP lane, Harmonics for pacing/escalation."
  ].join(" "),
  engineMethod: "tickForward",
  safety: "ForwardMotion wrapper must never modify engine internals"
});

// ---------------------------------------------------------------------------
// MODES — HYBRID C3 WITH HARMONIC SAFETY OVERRIDE
// ---------------------------------------------------------------------------
//
//   GPU_PERFORMANCE  → GPU first, Earn second, Harmonics soft-only.
//   BALANCED_NORMAL  → dynamic routing by job type.
//   HARMONIC_SAFETY  → Harmonics first, Earn help-only, GPU throttled.
//
// Harmonics can escalate mode upward (toward HARMONIC_SAFETY).
// Downgrades back to BALANCED_NORMAL / GPU_PERFORMANCE only when calm.
// ---------------------------------------------------------------------------

export const FORWARD_MODES = Object.freeze({
  GPU_PERFORMANCE: "GPU_PERFORMANCE",
  BALANCED_NORMAL: "BALANCED_NORMAL",
  HARMONIC_SAFETY: "HARMONIC_SAFETY"
});

let forwardMode = FORWARD_MODES.BALANCED_NORMAL;

export function setForwardMode(mode) {
  if (!Object.values(FORWARD_MODES).includes(mode)) return forwardMode;
  forwardMode = mode;
  return forwardMode;
}

export function getForwardMode() {
  return forwardMode;
}

// ---------------------------------------------------------------------------
// GPU Process Worker — GPU + Earn + Pixel job shaping
// ---------------------------------------------------------------------------

let gpuProcessWorker = null;

function createGpuProcessWorkerSafe() {
  try {
    if (PulseGPUProcessWorker && typeof PulseGPUProcessWorker.prepareJob === "function") {
      return PulseGPUProcessWorker;
    }
    if (
      PulseGPUProcessWorker &&
      typeof PulseGPUProcessWorker.create === "function"
    ) {
      return PulseGPUProcessWorker.create({
        lane: "forward",
        band: "dual",
        role: "gpu+earn+pixel-process-worker-forward",
        presenceContext,
        advantageContext,
        cosmosContext
      });
    }
  } catch (err) {
    console.error("PulseGPUProcessWorker-v31 (forward) creation failed:", err);
  }
  return null;
}

gpuProcessWorker = createGpuProcessWorkerSafe();

// ---------------------------------------------------------------------------
// Harmonic Process Worker — harmonics / pacing / vocal shaping
// ---------------------------------------------------------------------------

let harmonicProcessWorker = null;

function createHarmonicProcessWorkerSafe() {
  try {
    if (
      PulseHarmonicProcessWorker &&
      typeof PulseHarmonicProcessWorker.submit === "function"
    ) {
      return PulseHarmonicProcessWorker;
    }

    if (typeof createPulseHarmonicProcessWorker === "function") {
      return createPulseHarmonicProcessWorker({
        harmonicMode: "dual",
        harmonicChannels: ["harmonic-0", "harmonic-1"],
        trace: false,
        lane: "forward",
        role: "harmonic-process-worker-forward",
        presenceContext,
        advantageContext,
        cosmosContext
      });
    }
  } catch (err) {
    console.error("PulseHarmonicProcessWorker-v34 (forward) creation failed:", err);
  }
  return null;
}

harmonicProcessWorker = createHarmonicProcessWorkerSafe();

// ---------------------------------------------------------------------------
// Forward Motion Engine — core motion organ
// ---------------------------------------------------------------------------
let engine = null;

try {
  engine = createPulseMotionEngine({
    instanceId: "motion-forward",
    triHeartId: "forward-heart",
    lane: "forward",
    mode: "expansion",
    band: "dual",
    presenceContext,
    advantageContext,
    cosmosContext,
    allowSnapshotPhysics: true,
    allowDeltaEngine: true,
    allowDeploymentPhysics: true,
    allowRegioningPhysics: true,
    allowRegionMeshRouting: true,
    allowLineageEngine: true,
    allowMultiOrganismSupport: true,
    allowExecutionPhysics: true,
    allowCoreMemory: true,
    allowEarnLane: true,
    allowGpuCacheLane: true,
    enableGpuProcessWorker: !!gpuProcessWorker,
    gpuProcessWorker,
    gpuMode: "auto",
    gpuIds: ["gpu-0", "gpu-1"],
    gpuTakeover: true
  });

  if (engine) {

    // -----------------------------------------------------------
    // ⭐ PREWARM — warm-path initializer
    // -----------------------------------------------------------
    engine.prewarm = function prewarmForwardMotion() {
      try {
        this.snapshotPhysics?.prewarm?.();
        this.deltaEngine?.prewarm?.();
        this.deploymentPhysics?.prewarm?.();
        this.regionPhysics?.prewarm?.();
        this.meshRouter?.prewarm?.();
        this.lineageEngine?.prewarm?.();
        this.organismEngine?.prewarm?.();
        this.executionPhysics?.prewarm?.();
        this.coreMemory?.prewarm?.();
        this.earnLane?.prewarm?.();
        this.gpuCacheLane?.prewarm?.();

        if (this.gpuTakeover && this.gpuProcessWorker) {
          this.gpuProcessWorker.postMessage({ type: "prewarm-motion-engine" });
        }

        this._isPrewarmed = true;

      } catch (err) {
        console.error("ForwardMotion prewarm failed:", err);
        this._isPrewarmed = false;
      }
    };

    // -----------------------------------------------------------
    // ⭐ TICK FORWARD — main evolution loop
    // -----------------------------------------------------------
    engine.tickForward = function tickForward(dt = 0) {
      try {
        this.snapshotPhysics?.tickForward?.(dt);
        this.deltaEngine?.tickForward?.(dt);
        this.deploymentPhysics?.tickForward?.(dt);
        this.regionPhysics?.tickForward?.(dt);
        this.meshRouter?.tickForward?.(dt);
        this.lineageEngine?.tickForward?.(dt);
        this.organismEngine?.tickForward?.(dt);
        this.executionPhysics?.tickForward?.(dt);
        this.coreMemory?.tickForward?.(dt);
        this.earnLane?.tickForward?.(dt);
        this.gpuCacheLane?.tickForward?.(dt);

        if (this.gpuTakeover && this.gpuProcessWorker) {
          this.gpuProcessWorker.postMessage({
            type: "tick-forward-motion",
            dt
          });
        }

      } catch (err) {
        console.error("ForwardMotion tickForward failed:", err);
      }
    };

    // -----------------------------------------------------------
    // ⭐ SNAPSHOT FORWARD — state capture for forward lane
    // -----------------------------------------------------------
    engine.snapshotForward = function snapshotForwardMotion() {
      try {
        const snap = {};

        snap.snapshotPhysics = this.snapshotPhysics?.snapshot?.() ?? null;
        snap.deltaEngine      = this.deltaEngine?.snapshot?.() ?? null;
        snap.deployment       = this.deploymentPhysics?.snapshot?.() ?? null;
        snap.regionPhysics    = this.regionPhysics?.snapshot?.() ?? null;
        snap.meshRouter       = this.meshRouter?.snapshot?.() ?? null;
        snap.lineageEngine    = this.lineageEngine?.snapshot?.() ?? null;
        snap.organismEngine   = this.organismEngine?.snapshot?.() ?? null;
        snap.executionPhysics = this.executionPhysics?.snapshot?.() ?? null;
        snap.coreMemory       = this.coreMemory?.snapshot?.() ?? null;
        snap.earnLane         = this.earnLane?.snapshot?.() ?? null;
        snap.gpuCacheLane     = this.gpuCacheLane?.snapshot?.() ?? null;

        if (this.gpuTakeover && this.gpuProcessWorker) {
          this.gpuProcessWorker.postMessage({ type: "snapshot-forward-motion" });
        }

        return snap;

      } catch (err) {
        console.error("ForwardMotion snapshotForward failed:", err);
        return null;
      }
    };

    // -----------------------------------------------------------
    // ⭐ SUBMIT FORWARD JOB — job routing organ
    // -----------------------------------------------------------
    engine.submitForwardJob = function submitForwardJob(job) {
      try {
        // Route job through physics subsystems
        let routed = job;

        routed = this.snapshotPhysics?.routeJob?.(routed) ?? routed;
        routed = this.deltaEngine?.routeJob?.(routed) ?? routed;
        routed = this.deploymentPhysics?.routeJob?.(routed) ?? routed;
        routed = this.regionPhysics?.routeJob?.(routed) ?? routed;
        routed = this.meshRouter?.routeJob?.(routed) ?? routed;
        routed = this.lineageEngine?.routeJob?.(routed) ?? routed;
        routed = this.organismEngine?.routeJob?.(routed) ?? routed;
        routed = this.executionPhysics?.routeJob?.(routed) ?? routed;
        routed = this.coreMemory?.routeJob?.(routed) ?? routed;
        routed = this.earnLane?.routeJob?.(routed) ?? routed;
        routed = this.gpuCacheLane?.routeJob?.(routed) ?? routed;

        // GPU takeover: forward jobs can be dispatched to GPU worker
        if (this.gpuTakeover && this.gpuProcessWorker) {
          this.gpuProcessWorker.postMessage({
            type: "forward-job",
            job: routed
          });
        }

        return { ok: true, job: routed };

      } catch (err) {
        console.error("ForwardMotion submitForwardJob failed:", err);
        return { ok: false, reason: "SUBMIT_FAILED", error: err };
      }
    };

  }

} catch (err) {
  console.error("ForwardMotion-v35 engine wiring failed:", err);
  engine = null;
}

let earnEngine = null;

function createEarnEngineSafe() {
  if (!engine) return null;

  let sendSystem = null;
  try {
    if (engine.sendSystem && typeof engine.sendSystem.send === "function") {
      sendSystem = engine.sendSystem;
    }
  } catch (err) {
    console.error("ForwardMotion-v35: sendSystem discovery failed:", err);
  }

  if (!sendSystem) return null;

  try {
    return PulseRealm.PulseEarnEngine({
      sendSystem,
      sdn: engine.sdn || null,
      deviceProfile: engine.deviceProfile || null,
      throttleMode: "full" // downshifts to help-only in safety mode
    });
  } catch (err) {
    console.error("ForwardMotion-v35: EarnEngine creation failed:", err);
    return null;
  }
}

earnEngine = createEarnEngineSafe();

if (earnEngine) {
  earnEngine.runOnce = function runEarnOnce(context = {}) {
    try {
      // HELP lane: safety-first, no mutation of motion internals
      this.snapshotPhysics?.runOnce?.(context);
      this.deltaEngine?.runOnce?.(context);
      this.deploymentPhysics?.runOnce?.(context);
      this.regionPhysics?.runOnce?.(context);
      this.meshRouter?.runOnce?.(context);
      this.lineageEngine?.runOnce?.(context);
      this.organismEngine?.runOnce?.(context);
      this.executionPhysics?.runOnce?.(context);
      this.coreMemory?.runOnce?.(context);
      this.earnLane?.runOnce?.(context);
      this.gpuCacheLane?.runOnce?.(context);

      // GPU takeover: Earn lane can dispatch HELP jobs
      if (engine.gpuTakeover && engine.gpuProcessWorker) {
        engine.gpuProcessWorker.postMessage({
          type: "earn-run-once",
          context
        });
      }

    } catch (err) {
      console.error("ForwardMotion-v35 EarnEngine.runOnce failed:", err);
    }
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isObject(x) {
  return x !== null && typeof x === "object";
}

function cloneShallow(obj) {
  if (!isObject(obj)) return obj;
  return { ...obj };
}

function normalizeJobBase(job) {
  if (!isObject(job)) return {};
  const lane = job.lane || "forward";
  const priority = job.priority || "normal";
  const cosmos = job.cosmosContext || cosmosContext;
  return {
    ...job,
    lane,
    priority,
    cosmosContext: {
      universeId: cosmos.universeId || cosmosContext.universeId,
      timelineId: cosmos.timelineId || cosmosContext.timelineId,
      branchId: cosmos.branchId || cosmosContext.branchId,
      shardId: cosmos.shardId || cosmosContext.shardId
    }
  };
}

// ---------------------------------------------------------------------------
// GPU/Earn/Harmonic Routing — HYBRID C3
// ---------------------------------------------------------------------------

function routeThroughGpuWorker(baseJob) {
  if (!gpuProcessWorker) return baseJob;

  try {
    const type = baseJob.type || baseJob.kind || "";
    const lane = baseJob.lane || "forward";

    // Pixel jobs (GPU-first)
    if (
      type === PIXEL_PUSH_TYPE ||
      type === PIXEL_GPU_COMPUTE_TYPE
    ) {
      if (typeof gpuProcessWorker.preparePixelJob === "function") {
        const prepared = gpuProcessWorker.preparePixelJob(baseJob, { lane });
        return prepared || baseJob;
      }
      if (typeof gpuProcessWorker.prepareGpuJob === "function") {
        const prepared = gpuProcessWorker.prepareGpuJob(
          { ...baseJob, type: PIXEL_GPU_COMPUTE_TYPE, band: "binary" },
          { lane }
        );
        return prepared || baseJob;
      }
    }

    // GPU jobs
    if (
      type === "GPU_CACHE" ||
      type === "GPU_COMPUTE" ||
      type === "BINARY_COMPUTE"
    ) {
      if (typeof gpuProcessWorker.prepareGpuJob === "function") {
        const prepared = gpuProcessWorker.prepareGpuJob(baseJob, { lane });
        return prepared || baseJob;
      }
    }

    // Earn jobs
    if (
      type === "EARN_TASK" ||
      type === "EARN_SETTLEMENT" ||
      type === "EARN_RECONCILE" ||
      type === "EARN_PREFILL"
    ) {
      if (typeof gpuProcessWorker.prepareEarnJob === "function") {
        const prepared = gpuProcessWorker.prepareEarnJob(baseJob, { lane });
        return prepared || baseJob;
      }
    }

    // Forward lane generic shaping
    if (typeof gpuProcessWorker.prepareForwardJob === "function") {
      const prepared = gpuProcessWorker.prepareForwardJob(baseJob, { lane });
      return prepared || baseJob;
    }

    if (typeof gpuProcessWorker.prepareJob === "function") {
      const prepared = gpuProcessWorker.prepareJob(baseJob, { lane });
      return prepared || baseJob;
    }
  } catch (err) {
    console.error("routeThroughGpuWorker (forward v35) error:", err);
  }

  return baseJob;
}

function routeThroughHarmonicWorker(baseJob) {
  if (!harmonicProcessWorker) return baseJob;

  try {
    const type = baseJob.type || baseJob.kind || "";
    const lane = baseJob.lane || "forward";

    const isHarmonicType =
      type === HARMONIC_PING_TYPE ||
      type === HARMONIC_PATTERN_TYPE ||
      type === HARMONIC_ESCALATE_TYPE ||
      type === HARMONIC_SOFT_TYPE ||
      type === HARMONIC_ALERT_TYPE ||
      type === HARMONIC_SYSTEM_TYPE ||
      type.startsWith("HARMONIC_") ||
      type.startsWith("VOCAL_");

    if (isHarmonicType) {
      if (typeof harmonicProcessWorker.prepareHarmonicJob === "function") {
        const prepared = harmonicProcessWorker.prepareHarmonicJob({
          ...baseJob,
          lane
        });
        return prepared || baseJob;
      }
      if (typeof harmonicProcessWorker.submit === "function") {
        const hint = harmonicProcessWorker.submit({ ...baseJob, lane });
        return { ...baseJob, harmonicHint: hint };
      }
    }

    // Escalation jobs (system-level alerts / earn settlement)
    if (
      type === "EARN_SETTLEMENT" ||
      type === "EARN_RECONCILE" ||
      type === HARMONIC_ALERT_TYPE ||
      type === HARMONIC_SYSTEM_TYPE
    ) {
      if (typeof harmonicProcessWorker.prepareEscalationJob === "function") {
        const prepared = harmonicProcessWorker.prepareEscalationJob({
          ...baseJob,
          lane
        });
        return prepared || baseJob;
      }
    }

    // Pixel jobs: optional harmonic ping for pacing
    if (
      type === PIXEL_PUSH_TYPE ||
      type === PIXEL_GPU_COMPUTE_TYPE
    ) {
      if (typeof harmonicProcessWorker.prepareHarmonicJob === "function") {
        const prepared = harmonicProcessWorker.prepareHarmonicJob({
          ...baseJob,
          lane,
          type: HARMONIC_PING_TYPE
        });
        return prepared || baseJob;
      }
    }

    // Generic forward shaping
    if (typeof harmonicProcessWorker.plan === "function") {
      const hint = harmonicProcessWorker.plan({ ...baseJob, lane });
      return { ...baseJob, harmonicHint: hint };
    }
  } catch (err) {
    console.error("routeThroughHarmonicWorker (forward v35) error:", err);
  }

  return baseJob;
}

// Main router: GPU + EARN + HARMONICS with mode awareness
function routeJobThroughProcessWorkers(job) {
  if (!isObject(job)) return job;

  const baseJob = normalizeJobBase(job);
  const type = baseJob.type || baseJob.kind || "";
  const mode = forwardMode;

  const isGpuJob =
    type === PIXEL_PUSH_TYPE ||
    type === PIXEL_GPU_COMPUTE_TYPE ||
    type === "GPU_CACHE" ||
    type === "GPU_COMPUTE" ||
    type === "BINARY_COMPUTE";

  const isEarnJob =
    type === "EARN_TASK" ||
    type === "EARN_SETTLEMENT" ||
    type === "EARN_RECONCILE" ||
    type === "EARN_PREFILL";

  const isHarmonicJob =
    type === HARMONIC_PING_TYPE ||
    type === HARMONIC_PATTERN_TYPE ||
    type === HARMONIC_ESCALATE_TYPE ||
    type === HARMONIC_SOFT_TYPE ||
    type === HARMONIC_ALERT_TYPE ||
    type === HARMONIC_SYSTEM_TYPE ||
    type.startsWith("HARMONIC_") ||
    type.startsWith("VOCAL_");

  // HARMONIC_SAFETY: harmonics first, GPU throttled, Earn help-only
  if (mode === FORWARD_MODES.HARMONIC_SAFETY) {
    let routed = baseJob;

    if (isHarmonicJob || isEarnJob) {
      routed = routeThroughHarmonicWorker(routed);
    }

    // GPU jobs are allowed but de-prioritized; we still shape them lightly
    if (isGpuJob) {
      routed = {
        ...routed,
        hints: {
          ...(routed.hints || {}),
          gpuThrottled: true,
          safetyMode: "HARMONIC_SAFETY"
        }
      };
      routed = routeThroughGpuWorker(routed);
    }

    return routed;
  }

  // GPU_PERFORMANCE: GPU first, Harmonics soft, Earn full
  if (mode === FORWARD_MODES.GPU_PERFORMANCE) {
    let routed = baseJob;

    if (isGpuJob || isEarnJob) {
      routed = routeThroughGpuWorker(routed);
    }

    if (isHarmonicJob) {
      routed = routeThroughHarmonicWorker(routed);
    }

    return routed;
  }

  // BALANCED_NORMAL: dynamic by job type
  let routed = baseJob;

  if (isHarmonicJob) {
    routed = routeThroughHarmonicWorker(routed);
  }

  if (isGpuJob) {
    routed = routeThroughGpuWorker(routed);
    // optional harmonic ping for pixel/gaming pacing
    if (type === PIXEL_PUSH_TYPE || type === PIXEL_GPU_COMPUTE_TYPE) {
      routed = routeThroughHarmonicWorker(routed);
    }
  }

  if (isEarnJob) {
    routed = routeThroughGpuWorker(routed); // GPU can assist Earn shaping
    routed = routeThroughHarmonicWorker(routed); // Harmonics can escalate if needed
  }

  return routed;
}

// ---------------------------------------------------------------------------
// Job Builders — GPU, Earn, Snapshot, Generic, Pixel, Harmonic
// ---------------------------------------------------------------------------

function buildGpuJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `gpu-job-${PulseRealm.PulseNOW}`,
    type: payload.type || "GPU_CACHE",
    lane: "forward",
    priority: payload.priority || "normal",
    binaryPayload: payload.binaryPayload || null,
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || "PulseWorldOS",
    instanceId: payload.instanceId || null,
    hints: {
      useGpuCache: true,
      useSnapshotPhysics: !!hints.useSnapshotPhysics,
      useDeltaEngine: !!hints.useDeltaEngine,
      useDeploymentPhysics: !!hints.useDeploymentPhysics,
      useRegioning: !!hints.useRegioning,
      useLineage: !!hints.useLineage,
      useMultiOrganism: !!hints.useMultiOrganism,
      useExecution: !!hints.useExecution,
      earnLane: !!hints.earnLane
    }
  };
}

function buildEarnJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `earn-job-${PulseRealm.PulseNOW}`,
    type: payload.type || "EARN_TASK",
    lane: "forward",
    priority: payload.priority || "normal",
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || "PulseWorldOS",
    instanceId: payload.instanceId || null,
    hints: {
      earnLane: true,
      useSnapshotPhysics: !!hints.useSnapshotPhysics,
      useDeltaEngine: !!hints.useDeltaEngine,
      useDeploymentPhysics: !!hints.useDeploymentPhysics,
      useRegioning: !!hints.useRegioning,
      useLineage: !!hints.useLineage,
      useMultiOrganism: !!hints.useMultiOrganism,
      useExecution: !!hints.useExecution,
      useGpuCache: !!hints.useGpuCache
    }
  };
}

function buildSnapshotJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `snapshot-job-${PulseRealm.PulseNOW}`,
    type: payload.type || "STATE_SNAPSHOT",
    lane: "forward",
    priority: payload.priority || "low",
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || "PulseWorldOS",
    instanceId: payload.instanceId || null,
    hints: {
      useSnapshotPhysics: true,
      useDeltaEngine: !!hints.useDeltaEngine,
      useRegioning: !!hints.useRegioning,
      useLineage: !!hints.useLineage,
      useMultiOrganism: !!hints.useMultiOrganism,
      useExecution: !!hints.useExecution,
      useGpuCache: !!hints.useGpuCache,
      earnLane: !!hints.earnLane
    }
  };
}

function buildGenericJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `job-${PulseRealm.PulseNOW}`,
    type: payload.type || "GENERIC",
    lane: payload.lane || "forward",
    priority: payload.priority || "normal",
    payload: payload.payload || {},
    binaryPayload: payload.binaryPayload || null,
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || "PulseWorldOS",
    instanceId: payload.instanceId || null,
    hints: {
      ...cloneShallow(hints)
    }
  };
}

function buildPixelJob(payload = {}) {
  return {
    jobId: payload.jobId || `pixel-job-${PulseRealm.PulseNOW}`,
    type: PIXEL_PUSH_TYPE,
    lane: "forward",
    priority: payload.priority || "normal",
    payload: {
      pixel: payload.pixel || null,
      frameId: payload.frameId || null,
      layer: payload.layer || null,
      origin: "ForwardMotion-v35"
    },
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || "PulseWorldOS",
    instanceId: payload.instanceId || null,
    hints: {
      pixel: true
    }
  };
}

function buildHarmonicJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `harmonic-job-${PulseRealm.PulseNOW}`,
    type: payload.type || HARMONIC_PING_TYPE,
    lane: "forward",
    priority: payload.priority || "normal",
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || "PulseWorldOS",
    instanceId: payload.instanceId || null,
    hints: {
      harmonic: true,
      pacing: !!hints.pacing,
      escalation: !!hints.escalation,
      system: !!hints.system
    }
  };
}

// ---------------------------------------------------------------------------
// Core Submission — Forward Motion Engine
// ---------------------------------------------------------------------------

export function submit(job) {
  if (!engine || typeof engine.submitForwardJob !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  const processedJob = routeJobThroughProcessWorkers(job);
  return engine.submitForwardJob(processedJob);
}

// ---------------------------------------------------------------------------
// GPU / Earn / Snapshot / Generic / Pixel / Harmonic Submission
// ---------------------------------------------------------------------------

export function submitGpu(payload = {}, hints = {}) {
  const job = buildGpuJob(payload, hints);
  return submit(job);
}

export async function submitEarn(payload = {}, hints = {}) {
  const job = buildEarnJob(payload, hints);
  const motionResult = submit(job);

  if (earnEngine && typeof earnEngine.runOnce === "function") {
    try {
      const helpOnly = forwardMode === FORWARD_MODES.HARMONIC_SAFETY;
      await earnEngine.runOnce({
        globalHints: {
          earnHints: { ...hints, helpOnly },
          cosmosContext
        }
      });
    } catch (err) {
      console.error("ForwardMotion-v35: EarnEngine.runOnce error:", err);
    }
  }

  return motionResult;
}

export function submitSnapshot(payload = {}, hints = {}) {
  const job = buildSnapshotJob(payload, hints);
  return submit(job);
}

export function submitGeneric(payload = {}, hints = {}) {
  const job = buildGenericJob(payload, hints);
  return submit(job);
}

export function submitPixel(payload = {}) {
  if (engine && typeof engine.pushPixel === "function" && payload.pixel) {
    const id = engine.pushPixel(payload.pixel);
    return { ok: true, pixelJobId: id, mode: "pushPixel" };
  }
  const job = buildPixelJob(payload);
  return submit(job);
}

export function submitHarmonic(payload = {}, hints = {}) {
  const job = buildHarmonicJob(payload, hints);
  return submit(job);
}

// ---------------------------------------------------------------------------
// Engine Tick / Prewarm / Snapshot / Diagnostics
// ---------------------------------------------------------------------------

export function tick() {
  if (!engine || typeof engine.tickForward !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.tickForward();
}

export function prewarm() {
  if (!engine || typeof engine.prewarm !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.prewarm();
}

export function snapshot() {
  try {
    if (!engine) return null;
    if (typeof engine.snapshotForward === "function") {
      return engine.snapshotForward();
    }
    if (typeof engine.snapshot === "function") {
      return engine.snapshot();
    }
  } catch (err) {
    console.error("ForwardMotion-v35 snapshot error:", err);
  }
  return null;
}

export function diagnostics() {
  return {
    role: FORWARD_MOTION_ROLE_V35,
    engineAvailable: !!engine,
    gpuProcessWorkerAvailable: !!gpuProcessWorker,
    harmonicProcessWorkerAvailable: !!harmonicProcessWorker,
    earnEngineAvailable: !!earnEngine,
    mode: forwardMode,
    earnEngineHealing:
      earnEngine && typeof earnEngine.getHealingState === "function"
        ? earnEngine.getHealingState()
        : null,
    cosmosContext: {
      universeId: cosmosContext.universeId,
      timelineId: cosmosContext.timelineId,
      branchId: cosmosContext.branchId,
      shardId: cosmosContext.shardId
    }
  };
}

// ---------------------------------------------------------------------------
// Exposed Artery / Aliases
// ---------------------------------------------------------------------------

export const artery =
  engine && engine.artery && engine.artery.forward
    ? engine.artery.forward
    : null;

export const PulseForward = createPulseMotionEngine;
export const processWorkerGpu = gpuProcessWorker || null;
export const processWorkerHarmonic = harmonicProcessWorker || null;
export const earnMiner = earnEngine || null;

PulseRealm.EngineForwardProcess = {
  createPulseMotionEngine,
  diagnostics,
  submitEarn,
  submitHarmonic,
  submitGeneric,
  submitGpu,
  submitPixel,
  submit,
  tick,
  snapshot,
  prewarm,
  FORWARD_MOTION_ROLE_V35,
  FORWARD_MODES
}