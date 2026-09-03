// ============================================================================
// FILE: PulseBackwardMotion-v35-IMMORTAL-GPU-EARN-HARMONIC-ENGINE.js
// BACKWARD MOTION ORGAN + GPU PROCESS WORKER + EARN ENGINE + HARMONICS (v35)
// ============================================================================
//
// ROLE (v35-IMMORTAL-GPU-EARN-HARMONIC):
//   • Lane: "backward" → stabilization, compression, reduction, dedupe, cleanup.
//   • Band: "dual" (symbolic + binary).
//   • Integrated PulseGPUProcessWorker-v31 (GPU cleanup / cache / binary).
//   • Integrated PulseEarnEngine-v31 for settlement/reconcile/cleanup mining.
//   • Integrated PulseHarmonicProcessWorker-v34 for pacing/escalation/system alerts.
//   • Hybrid C3: Balanced Trinity with Harmonic Safety override.
//   • If Harmonics is in distress / 911 mode → GPU-heavy cleanup backs off,
//     Earn runs in HELP/settlement mode, Harmonics gets room to move.
//
// CONTRACT:
//   • No mutation of engine internals from this wrapper.
//   • No eval(), no Function(), no dynamic imports.
//   • Deterministic job shaping; hints are metadata-only.
//   • EarnEngine and HarmonicEngine are optional but wired explicitly when available.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseEngineProcess as createPulseMotionEngine } from "./PulseEngineProcess-v31.js";
import { PulseGPUProcessWorker } from "./PulseEngineGPUProcessWorker-v31.js";
import {
  PulseHarmonicProcessWorker,
  createPulseHarmonicProcessWorker
} from "./PulseEngineHarmonicsProcessWorker-v31.js";


export const BACKWARD_MOTION_ROLE_V35 = Object.freeze({
  lane: "backward",
  motionType: "compression",
  band: "dual",
  description: [
    "Stabilizes patterns, dedupes, reduces, generates compressedHints,",
    "and runs cleanup/settlement/gpu-cache consolidation jobs over the v31 substrate.",
    "Backward lane is the cleanup heart for Earn settlement and GPU cache compaction,",
    "with Harmonic pacing/escalation for safety and system alerts."
  ].join(" "),
  engineMethod: "tickBackward",
  safety: "BackwardMotion wrapper must never modify engine internals"
});

const PIXEL_PUSH_TYPE        = "PIXEL_PUSH";
const PIXEL_GPU_COMPUTE_TYPE = "GPU_COMPUTE_PIXEL";

const HARMONIC_PING_TYPE     = "HARMONIC_PING";
const HARMONIC_PATTERN_TYPE  = "HARMONIC_PATTERN";
const HARMONIC_ESCALATE_TYPE = "HARMONIC_ESCALATE";
const HARMONIC_SOFT_TYPE     = "HARMONIC_SOFT";
const HARMONIC_ALERT_TYPE    = "HARMONIC_ALERT";
const HARMONIC_SYSTEM_TYPE   = "HARMONIC_SYSTEM";

// ---------------------------------------------------------------------------
// MODES — HYBRID C3 WITH HARMONIC SAFETY OVERRIDE (BACKWARD)
// ---------------------------------------------------------------------------
//
//   GPU_PERFORMANCE  → GPU cleanup first, Earn full, Harmonics soft-only.
//   BALANCED_NORMAL  → dynamic routing by job type.
//   HARMONIC_SAFETY  → Harmonics first, Earn help/settlement, GPU throttled.
// ---------------------------------------------------------------------------

export const BACKWARD_MODES = Object.freeze({
  GPU_PERFORMANCE: "GPU_PERFORMANCE",
  BALANCED_NORMAL: "BALANCED_NORMAL",
  HARMONIC_SAFETY: "HARMONIC_SAFETY"
});

// ============================================================================
// MAIN FACTORY — dependencies injected by organism / Pulse-Engine
// ============================================================================

export function createBackwardMotionProcess({
  db,
  admin,
  Timestamp,
  fetchFn,
  presenceContext,
  advantageContext,
  cosmosContext,
  dberror,
  dblog
}) {
  let backwardMode = BACKWARD_MODES.BALANCED_NORMAL;

  function setBackwardMode(mode) {
    if (!Object.values(BACKWARD_MODES).includes(mode)) return backwardMode;
    backwardMode = mode;
    return backwardMode;
  }

  function getBackwardMode() {
    return backwardMode;
  }

  // -------------------------------------------------------------------------
  // GPU PROCESS WORKER
  // -------------------------------------------------------------------------
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
          lane: "backward",
          band: "dual",
          role: "gpu+earn-process-worker-backward",
          presenceContext,
          advantageContext,
          cosmosContext
        });
      }
    } catch (err) {
      dberror && dberror("PulseGPUProcessWorker-v31 (backward) creation failed:", err);
    }
    return null;
  }

  gpuProcessWorker = createGpuProcessWorkerSafe();

  // -------------------------------------------------------------------------
  // HARMONIC PROCESS WORKER
  // -------------------------------------------------------------------------
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
          harmonicChannels: ["harmonic-back-0", "harmonic-back-1"],
          trace: false,
          lane: "backward",
          role: "harmonic-process-worker-backward",
          presenceContext,
          advantageContext,
          cosmosContext
        });
      }
    } catch (err) {
      dberror && dberror("PulseHarmonicProcessWorker-v34 (backward) creation failed:", err);
    }
    return null;
  }

  harmonicProcessWorker = createHarmonicProcessWorkerSafe();

  // -------------------------------------------------------------------------
  // BACKWARD MOTION ENGINE (v31)
  // -------------------------------------------------------------------------
  let engine = null;

  try {
    engine = createPulseMotionEngine({
      instanceId: "motion-backward",
      triHeartId: "backward-heart",
      lane: "backward",
      mode: "compression",
      band: "dual",
      db,
      admin,
      Timestamp,
      fetchFn,
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
  } catch (err) {
    dberror && dberror("BackwardMotion-v35 engine wiring failed:", err);
    engine = null;
  }

  // -------------------------------------------------------------------------
  // EARN ENGINE (MINER) — for settlement / reconcile / cleanup lanes
  // -------------------------------------------------------------------------
  let earnEngine = null;

  function createEarnEngineSafe() {
    if (!engine) return null;

    let sendSystem = null;
    try {
      if (engine.sendSystem && typeof engine.sendSystem.send === "function") {
        sendSystem = engine.sendSystem;
      }
    } catch (err) {
      dberror && dberror("BackwardMotion-v35: sendSystem discovery failed:", err);
    }

    if (!sendSystem) return null;

    try {
      return PulseRealm.PulseEarnEngine({
        sendSystem,
        sdn: engine.sdn || null,
        deviceProfile: engine.deviceProfile || null,
        throttleMode: "full"
      });
    } catch (err) {
      dberror && dberror("BackwardMotion-v35: EarnEngine creation failed:", err);
      return null;
    }
  }

  earnEngine = createEarnEngineSafe();

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function isObject(x) {
    return x !== null && typeof x === "object";
  }

  function cloneShallow(obj) {
    if (!isObject(obj)) return obj;
    return { ...obj };
  }

  function normalizeJobBase(job) {
    if (!isObject(job)) return {};
    const lane = job.lane || "backward";
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

  // -------------------------------------------------------------------------
  // GPU / HARMONIC ROUTING (BACKWARD) — HYBRID C3
  // -------------------------------------------------------------------------

  function routeThroughGpuWorker(baseJob) {
    if (!gpuProcessWorker) return baseJob;

    try {
      const type = baseJob.type || baseJob.kind || "";
      const lane = baseJob.lane || "backward";

      // Pixel-related cleanup / consolidation
      if (
        type === PIXEL_PUSH_TYPE ||
        type === PIXEL_GPU_COMPUTE_TYPE
      ) {
        if (typeof gpuProcessWorker.prepareGpuCleanupJob === "function") {
          const prepared = gpuProcessWorker.prepareGpuCleanupJob(
            { ...baseJob, type: "GPU_CACHE" },
            { lane }
          );
          return prepared || baseJob;
        }
      }

      // GPU cache cleanup / eviction / compaction
      if (
        type === "GPU_CACHE" ||
        type === "GPU_CACHE_EVICT" ||
        type === "GPU_CACHE_COMPACT"
      ) {
        if (typeof gpuProcessWorker.prepareGpuCleanupJob === "function") {
          const prepared = gpuProcessWorker.prepareGpuCleanupJob(baseJob, { lane });
          return prepared || baseJob;
        }
        if (typeof gpuProcessWorker.prepareGpuJob === "function") {
          const prepared = gpuProcessWorker.prepareGpuJob(baseJob, { lane });
          return prepared || baseJob;
        }
      }

      // Earn cleanup / settlement / reconcile
      if (
        type === "EARN_TASK" ||
        type === "EARN_SETTLEMENT" ||
        type === "EARN_RECONCILE" ||
        type === "EARN_CLEANUP"
      ) {
        if (typeof gpuProcessWorker.prepareEarnCleanupJob === "function") {
          const prepared = gpuProcessWorker.prepareEarnCleanupJob(baseJob, { lane });
          return prepared || baseJob;
        }
        if (typeof gpuProcessWorker.prepareEarnJob === "function") {
          const prepared = gpuProcessWorker.prepareEarnJob(baseJob, { lane });
          return prepared || baseJob;
        }
      }

      // Generic backward lane shaping
      if (typeof gpuProcessWorker.prepareBackwardJob === "function") {
        const prepared = gpuProcessWorker.prepareBackwardJob(baseJob, { lane });
        return prepared || baseJob;
      }

      if (typeof gpuProcessWorker.prepareJob === "function") {
        const prepared = gpuProcessWorker.prepareJob(baseJob, { lane });
        return prepared || baseJob;
      }
    } catch (err) {
      dberror && dberror("routeThroughGpuWorker (backward v35) error:", err);
    }

    return baseJob;
  }

  function routeThroughHarmonicWorker(baseJob) {
    if (!harmonicProcessWorker) return baseJob;

    try {
      const type = baseJob.type || baseJob.kind || "";
      const lane = baseJob.lane || "backward";

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

      // Escalation / system alerts
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

      // Pixel cleanup: optional harmonic ping for pacing
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

      // Generic backward shaping
      if (typeof harmonicProcessWorker.plan === "function") {
        const hint = harmonicProcessWorker.plan({ ...baseJob, lane });
        return { ...baseJob, harmonicHint: hint };
      }
    } catch (err) {
      dberror && dberror("routeThroughHarmonicWorker (backward v35) error:", err);
    }

    return baseJob;
  }

  function routeJobThroughProcessWorkers(job) {
    if (!isObject(job)) return job;

    const baseJob = normalizeJobBase(job);
    const type = baseJob.type || baseJob.kind || "";
    const mode = backwardMode;

    const isGpuJob =
      type === PIXEL_PUSH_TYPE ||
      type === PIXEL_GPU_COMPUTE_TYPE ||
      type === "GPU_CACHE" ||
      type === "GPU_CACHE_EVICT" ||
      type === "GPU_CACHE_COMPACT";

    const isEarnJob =
      type === "EARN_TASK" ||
      type === "EARN_SETTLEMENT" ||
      type === "EARN_RECONCILE" ||
      type === "EARN_CLEANUP";

    const isHarmonicJob =
      type === HARMONIC_PING_TYPE ||
      type === HARMONIC_PATTERN_TYPE ||
      type === HARMONIC_ESCALATE_TYPE ||
      type === HARMONIC_SOFT_TYPE ||
      type === HARMONIC_ALERT_TYPE ||
      type === HARMONIC_SYSTEM_TYPE ||
      type.startsWith("HARMONIC_") ||
      type.startsWith("VOCAL_");

    // HARMONIC_SAFETY: harmonics first, GPU throttled, Earn help/settlement
    if (mode === BACKWARD_MODES.HARMONIC_SAFETY) {
      let routed = baseJob;

      if (isHarmonicJob || isEarnJob) {
        routed = routeThroughHarmonicWorker(routed);
      }

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

    // GPU_PERFORMANCE: GPU cleanup first, Harmonics soft, Earn full
    if (mode === BACKWARD_MODES.GPU_PERFORMANCE) {
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
      // optional harmonic ping for pacing / safety
      if (type === PIXEL_PUSH_TYPE || type === PIXEL_GPU_COMPUTE_TYPE) {
        routed = routeThroughHarmonicWorker(routed);
      }
    }

    if (isEarnJob) {
      routed = routeThroughGpuWorker(routed);      // GPU can assist cleanup
      routed = routeThroughHarmonicWorker(routed); // Harmonics can escalate if needed
    }

    return routed;
  }

  // -------------------------------------------------------------------------
  // JOB BUILDERS
  // -------------------------------------------------------------------------
  function buildGpuCleanupJob(payload = {}, hints = {}) {
    return {
      jobId: payload.jobId || `gpu-cleanup-job-${PulseRealm.PulseNOW}`,
      type: payload.type || "GPU_CACHE",
      lane: "backward",
      priority: payload.priority || "normal",
      binaryPayload: payload.binaryPayload || null,
      payload: payload.payload || {},
      cosmosContext: payload.cosmosContext || cosmosContext,
      organismId: payload.organismId || "PulseWorldOS",
      instanceId: payload.instanceId || null,
      hints: {
        cleanup: true,
        eviction: !!hints.eviction,
        compaction: !!hints.compaction,
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

  function buildEarnCleanupJob(payload = {}, hints = {}) {
    return {
      jobId: payload.jobId || `earn-cleanup-job-${PulseRealm.PulseNOW}`,
      type: payload.type || "EARN_SETTLEMENT",
      lane: "backward",
      priority: payload.priority || "normal",
      payload: payload.payload || {},
      cosmosContext: payload.cosmosContext || cosmosContext,
      organismId: payload.organismId || "PulseWorldOS",
      instanceId: payload.instanceId || null,
      hints: {
        cleanup: true,
        settlement: !!hints.settlement,
        reconciliation: !!hints.reconciliation,
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
      lane: "backward",
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
        earnLane: !!hints.earnLane,
        cleanup: !!hints.cleanup
      }
    };
  }

  function buildGenericJob(payload = {}, hints = {}) {
    return {
      jobId: payload.jobId || `job-${PulseRealm.PulseNOW}`,
      type: payload.type || "GENERIC",
      lane: payload.lane || "backward",
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

  function buildHarmonicJob(payload = {}, hints = {}) {
    return {
      jobId: payload.jobId || `harmonic-back-job-${PulseRealm.PulseNOW}`,
      type: payload.type || HARMONIC_PING_TYPE,
      lane: "backward",
      priority: payload.priority || "normal",
      payload: payload.payload || {},
      cosmosContext: payload.cosmosContext || cosmosContext,
      organismId: payload.organismId || "PulseWorldOS",
      instanceId: payload.instanceId || null,
      hints: {
        harmonic: true,
        pacing: !!hints.pacing,
        escalation: !!hints.escalation,
        system: !!hints.system,
        cleanup: !!hints.cleanup
      }
    };
  }

  // -------------------------------------------------------------------------
  // SUBMISSION
  // -------------------------------------------------------------------------
  function submit(job) {
    if (!engine || typeof engine.submitBackwardJob !== "function") {
      return { ok: false, reason: "ENGINE_UNAVAILABLE" };
    }
    const processedJob = routeJobThroughProcessWorkers(job);
    return engine.submitBackwardJob(processedJob);
  }

  function submitGpuCleanup(payload = {}, hints = {}) {
    const job = buildGpuCleanupJob(payload, hints);
    return submit(job);
  }

  async function submitEarnCleanup(payload = {}, hints = {}) {
    const job = buildEarnCleanupJob(payload, hints);
    const motionResult = submit(job);

    if (earnEngine && typeof earnEngine.runOnce === "function") {
      try {
        const helpOnly = backwardMode === BACKWARD_MODES.HARMONIC_SAFETY;
        await earnEngine.runOnce({
          globalHints: {
            earnHints: {
              ...hints,
              cleanup: true,
              settlement: !!hints.settlement,
              reconciliation: !!hints.reconciliation,
              helpOnly
            },
            cosmosContext
          }
        });
      } catch (err) {
        dberror && dberror("BackwardMotion-v35: EarnEngine.runOnce (cleanup) error:", err);
      }
    }

    return motionResult;
  }

  function submitSnapshot(payload = {}, hints = {}) {
    const job = buildSnapshotJob(payload, hints);
    return submit(job);
  }

  function submitGeneric(payload = {}, hints = {}) {
    const job = buildGenericJob(payload, hints);
    return submit(job);
  }

  function submitHarmonic(payload = {}, hints = {}) {
    const job = buildHarmonicJob(payload, hints);
    return submit(job);
  }

  // -------------------------------------------------------------------------
  // TICK / PREWARM / SNAPSHOT / DIAGNOSTICS
  // -------------------------------------------------------------------------
  function tick() {
    if (!engine || typeof engine.tickBackward !== "function") {
      return { ok: false, reason: "ENGINE_UNAVAILABLE" };
    }
    return engine.tickBackward();
  }

  function prewarm() {
    if (!engine || typeof engine.prewarm !== "function") {
      return { ok: false, reason: "ENGINE_UNAVAILABLE" };
    }
    return engine.prewarm();
  }

  function snapshot() {
    try {
      if (!engine) return null;
      if (typeof engine.snapshotBackward === "function") {
        return engine.snapshotBackward();
      }
      if (typeof engine.snapshot === "function") {
        return engine.snapshot();
      }
    } catch (err) {
      dberror && dberror("BackwardMotion-v35 snapshot error:", err);
    }
    return null;
  }

  function diagnostics() {
    return {
      role: BACKWARD_MOTION_ROLE_V35,
      engineAvailable: !!engine,
      gpuProcessWorkerAvailable: !!gpuProcessWorker,
      harmonicProcessWorkerAvailable: !!harmonicProcessWorker,
      earnEngineAvailable: !!earnEngine,
      mode: backwardMode,
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

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    submit,
    submitGpuCleanup,
    submitEarnCleanup,
    submitSnapshot,
    submitGeneric,
    submitHarmonic,
    tick,
    prewarm,
    snapshot,
    diagnostics,
    setBackwardMode,
    getBackwardMode,
    artery:
      engine && engine.artery && engine.artery.backward
        ? engine.artery.backward
        : null,
    processWorkerGpu: gpuProcessWorker,
    processWorkerHarmonic: harmonicProcessWorker,
    earnMiner: earnEngine
  };
}

export const PulseBackward = createBackwardMotionProcess;
