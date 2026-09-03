// ============================================================================
// FILE: PulseCompassReporter-v31-IMMORTAL-INTEL-PLUSPLUS.js
// LAYER: BLACK-BOX TELEMETRY ORGAN (v31 IMMORTAL++++)
// ============================================================================
//
// ROLE:
//   • Pure telemetry organ for MotionEngine, Compass, GPU workers, EarnEngine, Harmonics worker.
//   • Zero compute, zero mutation, zero nondeterminism.
//   • Deterministic envelopes with INTEL, presence, advantage, cosmos surfaces.
//   • Records:
//       - Motion ticks
//       - Lane switches
//       - Artery snapshots
//       - Full envelopes
//       - GPU worker hints + ticks
//       - Harmonics worker hints + ticks
//       - EarnEngine miner cycles
//       - Engine snapshots (MotionEngine + Compass)
//   • v31 IMMORTAL++++ schema with dual-band, binary-first, wave-aware metadata.
//   • Device-profile-aware: can surface capabilityProfile from GPU/Harmonics worker hints.
//
// CONTRACT:
//   • No eval(), no Function(), no dynamic imports.
//   • No network, no filesystem.
//   • No mutation of Compass or Engine.
//   • Pure append-only PulseDB writes.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






export function createPulseCompassReporter({
  Compass,
  PulseDB,
  sessionId = null,
  trace = false,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {},
  earnEngine = null,        // EarnEngine miner telemetry (optional)
  gpuProcessWorker = null,  // GPU worker telemetry (optional)
  harmonicsWorker = null    // Harmonics worker telemetry (optional)
} = {}) {
  if (!Compass) throw new Error("[PulseCompassReporter-v31] Compass required.");
  if (!PulseDB) throw new Error("[PulseCompassReporter-v31] PulseDB required.");

  const MOTION_COLLECTION      = "pulse:v31:Motion_Engine_Logs";
  const GPU_COLLECTION         = "pulse:v31:GPU_Worker_Logs";
  const SNAPSHOT_COLLECTION    = "pulse:v31:Motion_Engine_Snapshots";
  const EARN_COLLECTION        = "pulse:v31:EarnEngine_Logs";
  const HARMONICS_COLLECTION   = "pulse:v31:Harmonics_Worker_Logs";

  PulseDB.ensureCollection(MOTION_COLLECTION);
  PulseDB.ensureCollection(GPU_COLLECTION);
  PulseDB.ensureCollection(SNAPSHOT_COLLECTION);
  PulseDB.ensureCollection(EARN_COLLECTION);
  PulseDB.ensureCollection(HARMONICS_COLLECTION);

  function buildEnvelope(entry) {
    return {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      schemaVersion: "v31",
      version: "31.0-Immortal++++",
      timestamp: PulseRealm.PulseNOW
    };
  }

  // ---------------------------------------------------------------------------
  // MOTION
  // ---------------------------------------------------------------------------
  async function recordTick(result) {
    if (!result.metrics) return;

    const m = result.metrics;

    const entry = buildEnvelope({
      type: "tick",
      lane: Compass.activeLane,
      tickId: m.tickId,
      jobId: m.jobId,
      patterns: m.patternsCount,
      band: m.band,
      dnaTag: m.dnaTag,
      artery: m.artery,
      advantageScore: m.advantageScore ?? null,
      jobType: m.jobType || null,
      intent: m.intent || null,
      cosmos: m.cosmos || cosmosContext,
      triHeartId: m.triHeartId || null,
      presenceField: m.presenceField || null,
      advantageField: m.advantageField || null,
      gpuHint: m.gpuHint || null,
      envelope: result.envelope || null
    });

    await PulseDB.append(MOTION_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Tick recorded:", entry);
  }

  async function recordLaneSwitch(lane) {
    const entry = buildEnvelope({
      type: "lane_switch",
      lane
    });

    await PulseDB.append(MOTION_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Lane switch recorded:", entry);
  }

  async function recordArterySnapshot(artery) {
    const entry = buildEnvelope({
      type: "artery_snapshot",
      lane: Compass.activeLane,
      artery
    });

    await PulseDB.append(MOTION_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Artery snapshot recorded:", entry);
  }

  async function recordEnvelope(envelope) {
    const entry = buildEnvelope({
      type: "envelope",
      lane: Compass.activeLane,
      envelope
    });

    await PulseDB.append(MOTION_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Envelope recorded:", entry);
  }

  // ---------------------------------------------------------------------------
  // GPU
  // ---------------------------------------------------------------------------
  async function recordGPUHint({ job, hint }) {
    if (!hint) return;

    const entry = buildEnvelope({
      type: "gpu_hint",
      lane: job.lane || null,
      jobId: job.jobId || job.id || null,
      jobType: job.jobType || job.type || null,
      band: job.band || "symbolic",
      intent: job.intent || null,
      dnaTag: job.dnaTag || null,
      cosmos: job.cosmos || job.cosmosContext || cosmosContext,
      gpu: hint.gpu || null,
      advantageScore: hint.advantageScore ?? null,
      advantageBoost: hint.advantageBoost ?? null,
      suggestions: hint.suggestions || [],
      capabilityProfile: hint.capabilityProfile || null
    });

    await PulseDB.append(GPU_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] GPU hint recorded:", entry);
  }

  async function recordGPUTick(tickResult) {
    if (!tickResult) return;

    const entry = buildEnvelope({
      type: "gpu_tick",
      ticks: tickResult.ticks ?? null,
      gpuMode: tickResult.gpuMode || null,
      gpuIds: tickResult.gpuIds || null,
      capabilityProfile: tickResult.capabilityProfile || null
    });

    await PulseDB.append(GPU_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] GPU tick recorded:", entry);
  }

  // ---------------------------------------------------------------------------
  // HARMONICS
  // ---------------------------------------------------------------------------
  async function recordHarmonicsHint({ job, hint }) {
    if (!hint) return;

    const entry = buildEnvelope({
      type: "harmonics_hint",
      lane: job.lane || null,
      jobId: job.jobId || job.id || null,
      jobType: job.jobType || job.type || null,
      band: job.band || "symbolic",
      intent: job.intent || null,
      dnaTag: job.dnaTag || null,
      cosmos: job.cosmos || job.cosmosContext || cosmosContext,
      harmonics: hint.harmonics || null,
      advantageScore: hint.advantageScore ?? null,
      advantageBoost: hint.advantageBoost ?? null,
      suggestions: hint.suggestions || [],
      capabilityProfile: hint.capabilityProfile || null
    });

    await PulseDB.append(HARMONICS_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Harmonics hint recorded:", entry);
  }

  async function recordHarmonicsTick(tickResult) {
    if (!tickResult) return;

    const entry = buildEnvelope({
      type: "harmonics_tick",
      ticks: tickResult.ticks ?? null,
      mode: tickResult.mode || null,
      bands: tickResult.bands || null,
      capabilityProfile: tickResult.capabilityProfile || null
    });

    await PulseDB.append(HARMONICS_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Harmonics tick recorded:", entry);
  }

  // ---------------------------------------------------------------------------
  // EARN ENGINE
  // ---------------------------------------------------------------------------
  async function recordEarnEngineCycle(summary) {
    if (!summary) return;

    const entry = buildEnvelope({
      type: "earn_cycle",
      cycleIndex: summary.cycleIndex,
      laneCount: summary.laneCount,
      throttleMode: summary.throttleMode,
      engineProfile: summary.engineProfile || null,
      laneResults: summary.laneResults || [],
      capabilityProfile: summary.capabilityProfile || null
    });

    await PulseDB.append(EARN_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] EarnEngine cycle recorded:", entry);
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOTS
  // ---------------------------------------------------------------------------
  async function recordEngineSnapshot({ engineSnapshot, healthScores, compassState }) {
    const entry = buildEnvelope({
      type: "engine_snapshot",
      engineSnapshot: engineSnapshot || null,
      healthScores: healthScores || null,
      compassState: compassState || null
    });

    await PulseDB.append(SNAPSHOT_COLLECTION, entry);
    if (trace) console.log("[Reporter-v31] Engine snapshot recorded:", entry);
  }

  async function recordFullStateSnapshot({ engineSnapshot } = {}) {
    const healthScores =
      typeof Compass.getHealthScores === "function"
        ? Compass.getHealthScores()
        : null;

    const compassState =
      typeof Compass.getCompassState === "function"
        ? Compass.getCompassState()
        : null;

    await recordEngineSnapshot({
      engineSnapshot: engineSnapshot || null,
      healthScores,
      compassState
    });
  }

  // ---------------------------------------------------------------------------
  // ANALYTICS: RAW READERS
  // ---------------------------------------------------------------------------
  async function getAllMotionLogs()    { return PulseDB.read(MOTION_COLLECTION); }
  async function getAllGPULogs()       { return PulseDB.read(GPU_COLLECTION); }
  async function getAllSnapshots()     { return PulseDB.read(SNAPSHOT_COLLECTION); }
  async function getAllEarnLogs()      { return PulseDB.read(EARN_COLLECTION); }
  async function getAllHarmonicsLogs() { return PulseDB.read(HARMONICS_COLLECTION); }
// ---------------------------------------------------------------------------
// ANALYTICS: FILTERED VIEWS (SAFE VERSION)
// ---------------------------------------------------------------------------

async function getTicks() {
  const logs = await getAllMotionLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "tick");
}

async function getLaneSwitches() {
  const logs = await getAllMotionLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "lane_switch");
}

async function getArterySnapshots() {
  const logs = await getAllMotionLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "artery_snapshot");
}

async function getEnvelopes() {
  const logs = await getAllMotionLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "envelope");
}

async function getGPUHints() {
  const logs = await getAllGPULogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "gpu_hint");
}

async function getGPUTicks() {
  const logs = await getAllGPULogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "gpu_tick");
}

async function getHarmonicsHints() {
  const logs = await getAllHarmonicsLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "harmonics_hint");
}

async function getHarmonicsTicks() {
  const logs = await getAllHarmonicsLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "harmonics_tick");
}

async function getEngineSnapshots() {
  const logs = await getAllSnapshots();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "engine_snapshot");
}

async function getEarnCycles() {
  const logs = await getAllEarnLogs();
  return (Array.isArray(logs) ? logs : []).filter(e => e && e.type === "earn_cycle");
}


  async function getLaneStats() {
    const ticks = await getTicks();
    const stats = {};

    for (const t of ticks) {
      stats[t.lane] = stats[t.lane] || {
        ticks: 0,
        patterns: 0,
        lastTickId: null,
        lastBand: null,
        lastDnaTag: null,
        lastAdvantageScore: null
      };
      stats[t.lane].ticks += 1;
      stats[t.lane].patterns += t.patterns || 0;
      stats[t.lane].lastTickId = t.tickId;
      if (t.band) stats[t.lane].lastBand = t.band;
      if (t.dnaTag) stats[t.lane].lastDnaTag = t.dnaTag;
      if (typeof t.advantageScore === "number") {
        stats[t.lane].lastAdvantageScore = t.advantageScore;
      }
    }

    return stats;
  }

  return Object.freeze({
    // Motion
    recordTick,
    recordLaneSwitch,
    recordArterySnapshot,
    recordEnvelope,

    // GPU
    recordGPUHint,
    recordGPUTick,

    // Harmonics
    recordHarmonicsHint,
    recordHarmonicsTick,

    // EarnEngine
    recordEarnEngineCycle,

    // Snapshots
    recordEngineSnapshot,
    recordFullStateSnapshot,

    // Analytics
    getAllMotionLogs,
    getTicks,
    getLaneSwitches,
    getArterySnapshots,
    getEnvelopes,
    getLaneStats,

    getAllGPULogs,
    getGPUHints,
    getGPUTicks,

    getAllSnapshots,
    getEngineSnapshots,

    getAllEarnLogs,
    getEarnCycles,

    getAllHarmonicsLogs,
    getHarmonicsHints,
    getHarmonicsTicks
  });
}

export const PulseWorldReporter = createPulseCompassReporter;

PulseRealm.EngineBlackBox = {
  createPulseCompassReporter,
  PulseWorldReporter
}