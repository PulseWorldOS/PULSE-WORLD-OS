/**
 * aiScheduler-v30-IMMORTAL-PLUS.js — Pulse OS v30++ Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Scheduler of Pulse OS.
 *
 *   Schedules:
 *     - binary tasks
 *     - binary pulses
 *     - binary jobs
 *     - binary reflex triggers
 *
 *   Provides:
 *     - temporal throughput
 *     - temporal pressure
 *     - temporal cost
 *     - temporal budget
 *     - descriptive buckets
 *     - task-density temporal arteries v6 (IMMORTAL-PLUS)
 *     - multi-instance harmony + soft spiral warnings (non-blocking)
 *     - task-level prewarm + binary chunk awareness
 *     - starvation + jitter awareness
 *     - window-safe scheduler snapshot
 *     - lineage-aware drift protection (IMMORTAL-PLUS)
 */

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  META — v30-IMMORTAL-PLUS
// ============================================================================

export const SchedulerMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiScheduler",
  layer: "C2-Scheduler",
  version: "v30-IMMORTAL-PLUS",
  identity: "aiScheduler-v30-IMMORTAL-PLUS",
  evo: Object.freeze({
    epoch: "30-IMMORTAL-PLUS",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    binaryPrimary: true,
    dualBandAware: true,
    temporalArteryV6: true,
    multiInstanceAware: true,
    readOnlyToBinary: true
  }),
  guarantees: Object.freeze({
    temporalMetricsStable: true,
    schedulerArteryV6: true,
    multiInstanceHarmonyAware: true,
    jitterAware: true,
    starvationAware: true
  })
});

export const AI_EXPERIENCE_META = Object.freeze({
  owner: "Aldwyn",
  subordinate: true,
  organ: "Scheduler",
  identity: SchedulerMeta.identity,
  epoch: SchedulerMeta.evo.epoch,
  version: SchedulerMeta.version
});

export const EXPORT_META = Object.freeze({
  scheduler: SchedulerMeta,
  experience: AI_EXPERIENCE_META
});

// ============================================================================
//  ARTERY HELPERS — v6 (PURE, STATELESS, IMMORTAL-PLUS)
// ============================================================================

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function bucketStarvation(v) {
  if (v >= 0.9) return "severe";
  if (v >= 0.6) return "high";
  if (v >= 0.3) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketJitter(v) {
  if (v >= 0.8) return "chaotic";
  if (v >= 0.5) return "unstable";
  if (v >= 0.2) return "mild";
  if (v > 0) return "trace";
  return "none";
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30-IMMORTAL-PLUS
// ============================================================================
// ============================================================================
//  AIBinaryScheduler — IMMORTAL ORGAN (v31 IMMORTAL+++)
// ============================================================================

export const AIBinaryScheduler = (() => {
  // -------------------------------------------------------------------------
  // INTERNAL LANE
  // -------------------------------------------------------------------------
  const lane = {
    id: SchedulerMeta.identity,
    encoder: null,
    pipeline: null,
    reflex: null,
    logger: null,
    trace: false,

    tasks: new Map(),

    _timer: null,
    _tickInterval: 250,

    windowMs: 60000,
    _windowStart: PulseRealm.PulseNOW,
    _windowExecutions: 0,
    _windowTightExecutions: 0,
    _totalExecutions: 0,

    _chunkSize: 4096,
    _autoPrewarm: false,

    _lastTickTime: PulseRealm.PulseNOW,
    _jitterSamples: 0,
    _jitterAccum: 0,

    lineage: null,

    instanceIndex: 0,
    instanceCount: 0,

    schedulerArtery: {
      lastThroughput: 1,
      lastPressure: 0,
      lastCost: 0,
      lastBudget: 1,
      lastTaskCount: 0,
      lastStarvation: 0,
      lastJitter: 0,
      snapshot: () => Object.freeze({})
    }
  };

  // -------------------------------------------------------------------------
  // INSTANCE REGISTRY
  // -------------------------------------------------------------------------
  const registerInstance = () => {
    const index = lane.instanceCount;
    lane.instanceCount += 1;
    return index;
  };

  const getInstanceCount = () => lane.instanceCount;

  // -------------------------------------------------------------------------
  // TRACE
  // -------------------------------------------------------------------------
  const trace = (event, payload) => {
    if (!lane.trace) return;
    console.log(
      `[${lane.id}#${lane.instanceIndex}] ${event}`,
      payload
    );
  };

  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  const init = (config = {}) => {
    lane.id = config.id || SchedulerMeta.identity;
    lane.encoder = config.encoder;
    lane.pipeline = config.pipeline || null;
    lane.reflex = config.reflex || null;
    lane.logger = config.logger || null;
    lane.trace = !!config.trace;

    if (!lane.encoder || typeof lane.encoder.encode !== "function") {
      throw new Error("AIBinaryScheduler requires aiBinaryAgent encoder");
    }

    lane.tasks = new Map();

    lane._timer = null;
    lane._tickInterval = config.tickInterval || 250;

    lane.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    lane._windowStart = PulseRealm.PulseNOW;
    lane._windowExecutions = 0;
    lane._windowTightExecutions = 0;
    lane._totalExecutions = 0;

    lane._chunkSize =
      typeof config.chunkSize === "number" && config.chunkSize > 0
        ? config.chunkSize
        : 4096;
    lane._autoPrewarm = !!config.autoPrewarm;

    lane._lastTickTime = PulseRealm.PulseNOW;
    lane._jitterSamples = 0;
    lane._jitterAccum = 0;

    lane.lineage = Object.freeze({
      version: SchedulerMeta.version,
      epoch: SchedulerMeta.evo.epoch,
      identity: SchedulerMeta.identity
    });

    lane.instanceIndex = registerInstance();

    lane.schedulerArtery = {
      lastThroughput: 1,
      lastPressure: 0,
      lastCost: 0,
      lastBudget: 1,
      lastTaskCount: 0,
      lastStarvation: 0,
      lastJitter: 0,
      snapshot: () =>
        Object.freeze({
          version: SchedulerMeta.version,
          epoch: SchedulerMeta.evo.epoch,
          identity: SchedulerMeta.identity,
          instanceIndex: lane.instanceIndex,
          instanceCount: getInstanceCount(),
          throughput: lane.schedulerArtery.lastThroughput,
          pressure: lane.schedulerArtery.lastPressure,
          cost: lane.schedulerArtery.lastCost,
          budget: lane.schedulerArtery.lastBudget,
          taskCount: lane.schedulerArtery.lastTaskCount,
          starvation: lane.schedulerArtery.lastStarvation,
          jitter: lane.schedulerArtery.lastJitter
        })
    };
  };

  // -------------------------------------------------------------------------
  // WINDOW ROLLING
  // -------------------------------------------------------------------------
  const rollWindow = (now) => {
    if (now - lane._windowStart >= lane.windowMs) {
      lane._windowStart = now;
      lane._windowExecutions = 0;
      lane._windowTightExecutions = 0;
    }
  };

  // -------------------------------------------------------------------------
  // BINARY CHUNKING
  // -------------------------------------------------------------------------
  const chunkBinary = (binary) => {
    if (typeof binary !== "string") return [];
    const size = lane._chunkSize;
    const chunks = [];
    for (let i = 0; i < binary.length; i += size) {
      chunks.push(binary.slice(i, i + size));
    }
    return chunks;
  };

  // -------------------------------------------------------------------------
  // TEMPORAL ARTERY SNAPSHOT v6 (IMMORTAL-PLUS)
// -------------------------------------------------------------------------
  const computeTemporalArtery = () => {
    const tasks = Array.from(lane.tasks.values());
    const taskCount = tasks.length;

    let totalInterval = 0;
    let tightIntervals = 0;
    let starvationScore = 0;

    const now = PulseRealm.PulseNOW;

    for (const t of tasks) {
      totalInterval += t.intervalMs;
      if (t.intervalMs < 500) tightIntervals++;

      if (typeof t.lastRun === "number") {
        const overdue = now - t.lastRun - t.intervalMs;
        if (overdue > 0) {
          const ratio = Math.min(1, overdue / (5 * t.intervalMs));
          starvationScore += ratio;
        }
      }
    }

    const avgInterval = taskCount > 0 ? totalInterval / taskCount : 0;

    rollWindow(now);

    const elapsedMs = Math.max(1, now - lane._windowStart);
    const execRatePerSec = (lane._windowExecutions / elapsedMs) * 1000;

    const instanceCount = getInstanceCount();
    const harmonicLoad =
      instanceCount > 0 ? execRatePerSec / instanceCount : execRatePerSec;

    const taskDensity = Math.min(1, taskCount / 64);
    const intervalFactor =
      avgInterval > 0 ? Math.min(1, 1000 / avgInterval) : 0;
    const loadFactor = Math.min(1, harmonicLoad / 128);
    const tightFactor =
      taskCount > 0 ? Math.min(1, tightIntervals / taskCount) : 0;

    const pressure = Math.max(
      0,
      Math.min(1, (taskDensity + intervalFactor + loadFactor + tightFactor) / 4)
    );

    const throughput = Math.max(0, Math.min(1, 1 - pressure));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const starvation =
      taskCount > 0 ? Math.min(1, starvationScore / taskCount) : 0;

    const jitter =
      lane._jitterSamples > 0
        ? Math.max(0, Math.min(1, lane._jitterAccum / lane._jitterSamples))
        : 0;

    lane.schedulerArtery.lastThroughput = throughput;
    lane.schedulerArtery.lastPressure = pressure;
    lane.schedulerArtery.lastCost = cost;
    lane.schedulerArtery.lastBudget = budget;
    lane.schedulerArtery.lastTaskCount = taskCount;
    lane.schedulerArtery.lastStarvation = starvation;
    lane.schedulerArtery.lastJitter = jitter;

    const artery = {
      instanceIndex: lane.instanceIndex,
      instanceCount,

      taskCount,
      avgInterval,
      tightIntervals,

      windowMs: lane.windowMs,
      windowExecutions: lane._windowExecutions,
      windowTightExecutions: lane._windowTightExecutions,
      totalExecutions: lane._totalExecutions,
      execRatePerSec,
      harmonicLoad,

      throughput,
      pressure,
      cost,
      budget,

      starvation,
      jitter,

      throughputBucket: bucketLevel(throughput),
      pressureBucket: bucketPressure(pressure),
      costBucket: bucketCost(cost),
      budgetBucket: bucketLevel(budget),
      starvationBucket: bucketStarvation(starvation),
      jitterBucket: bucketJitter(jitter),

      harmony:
        instanceCount > 1 && pressure < 0.7 && jitter < 0.5
          ? "coherent"
          : "strained"
    };

    return artery;
  };

  const getTemporalArtery = () => computeTemporalArtery();

  const getSchedulerSnapshot = () => lane.schedulerArtery.snapshot();

  // -------------------------------------------------------------------------
  // INTERNAL HELPERS
  // -------------------------------------------------------------------------
  const assertBinary = (str) => {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  };

  // -------------------------------------------------------------------------
  // TASK REGISTRATION
  // -------------------------------------------------------------------------
  const scheduleTask = ({ id, intervalMs, payload, action }) => {
    if (!id || typeof id !== "string") {
      throw new Error("scheduleTask requires an id");
    }
    if (typeof intervalMs !== "number" || intervalMs <= 0) {
      throw new Error("scheduleTask requires a positive intervalMs");
    }
    if (typeof action !== "function") {
      throw new Error("scheduleTask requires an action function");
    }

    const binaryPayload = lane.encoder.encode(payload);
    assertBinary(binaryPayload);

    const chunks = chunkBinary(binaryPayload);

    const now = PulseRealm.PulseNOW;

    const task = {
      id,
      intervalMs,
      nextRun: now + intervalMs,
      binaryPayload,
      chunks,
      prewarmed: false,
      action,
      lastRun: null
    };

    lane.tasks.set(id, task);

    if (lane._autoPrewarm) {
      prewarmTask(id);
    }

    const artery = computeTemporalArtery();
    trace("task:scheduled", {
      id,
      intervalMs,
      payloadBits: binaryPayload.length,
      chunkCount: task.chunks.length,
      artery
    });

    return task;
  };

  const cancelTask = (id) => {
    const existed = lane.tasks.delete(id);
    const artery = computeTemporalArtery();
    trace("task:cancelled", { id, existed, artery });
  };

  // -------------------------------------------------------------------------
  // PREWARM + TASK SNAPSHOTS
  // -------------------------------------------------------------------------
  const prewarmTask = (id) => {
    const task = lane.tasks.get(id);
    if (!task) return null;

    if (!task.chunks || task.chunks.length === 0) {
      task.chunks = chunkBinary(task.binaryPayload);
    }

    task.prewarmed = true;

    const artery = computeTemporalArtery();
    trace("task:prewarm", {
      id: task.id,
      payloadBits: task.binaryPayload.length,
      chunkCount: task.chunks.length,
      artery
    });

    return task;
  };

  const prewarmAllTasks = () => {
    const results = [];
    for (const id of lane.tasks.keys()) {
      const t = prewarmTask(id);
      if (t) results.push(t);
    }
    return results;
  };

  const getTaskSnapshot = (id) => {
    const task = lane.tasks.get(id);
    if (!task) return null;

    return Object.freeze({
      id: task.id,
      intervalMs: task.intervalMs,
      payloadBits: task.binaryPayload.length,
      chunkCount: task.chunks ? task.chunks.length : 0,
      prewarmed: !!task.prewarmed
    });
  };

  // -------------------------------------------------------------------------
  // SCHEDULER LOOP
  // -------------------------------------------------------------------------
  const start = () => {
    if (lane._timer) return;

    lane._timer = setInterval(() => {
      tick();
    }, lane._tickInterval);

    const artery = computeTemporalArtery();
    trace("scheduler:start", {
      tickInterval: lane._tickInterval,
      artery
    });
  };

  const stop = () => {
    if (!lane._timer) return;

    clearInterval(lane._timer);
    lane._timer = null;

    const artery = computeTemporalArtery();
    trace("scheduler:stop", { artery });
  };

  // -------------------------------------------------------------------------
  // TICK EXECUTION
  // -------------------------------------------------------------------------
  const tick = () => {
    const now = PulseRealm.PulseNOW;

    const delta = now - lane._lastTickTime;
    lane._lastTickTime = now;

    const ideal = lane._tickInterval;
    if (ideal > 0) {
      const deviation = Math.abs(delta - ideal) / ideal;
      lane._jitterSamples += 1;
      lane._jitterAccum += Math.min(1, deviation);
    }

    for (const task of lane.tasks.values()) {
      if (now >= task.nextRun) {
        executeTask(task, now);
        task.nextRun = now + task.intervalMs;
      }
    }
  };

  const executeTask = (task, now) => {
    const output = task.action(task.binaryPayload);

    assertBinary(output);

    rollWindow(now);
    lane._totalExecutions += 1;
    lane._windowExecutions += 1;
    if (task.intervalMs < 500) lane._windowTightExecutions += 1;

    task.lastRun = now;

    const artery = computeTemporalArtery();

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical" ||
      artery.starvationBucket === "severe"
    ) {
      trace("scheduler:spiral-warning", {
        id: task.id,
        pressure: artery.pressure,
        pressureBucket: artery.pressureBucket,
        budget: artery.budget,
        budgetBucket: artery.budgetBucket,
        starvation: artery.starvation,
        starvationBucket: artery.starvationBucket,
        jitter: artery.jitter,
        jitterBucket: artery.jitterBucket
      });
    }

    trace("task:executed", {
      id: task.id,
      outputBits: output.length,
      artery
    });

    if (lane.pipeline) lane.pipeline.run(output);
    if (lane.reflex) lane.reflex.run(output);
    if (lane.logger && typeof lane.logger.logBinary === "function") {
      lane.logger.logBinary(output, { source: "scheduler", taskId: task.id });
    }
  };

  // -------------------------------------------------------------------------
  // EXPORT IMMORTAL SURFACE
  // -------------------------------------------------------------------------
  return {
    init,
    start,
    stop,
    tick,              // exposed for watchdog wrapping
    scheduleTask,
    cancelTask,
    prewarmTask,
    prewarmAllTasks,
    getTaskSnapshot,
    getTemporalArtery,
    getSchedulerSnapshot,
    getInstanceCount
  };
})();

// ============================================================================
//  FACTORY — v30-IMMORTAL-PLUS
// ============================================================================

export const createAIBinaryScheduler = (config = {}) =>
  AIBinaryScheduler(config);


// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
PulseRealm.AIScheduler = {
    SchedulerMeta,
    AIBinaryScheduler,
    createAIBinaryScheduler,
    AI_EXPERIENCE_META,
    EXPORT_META
}
