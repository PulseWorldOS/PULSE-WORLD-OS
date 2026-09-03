/*
===============================================================================
FILE: /PULSE-UNIVERSE/SnapshotPhysics-v30.js
LAYER: PULSE-WORLD SUBSTRATE — SNAPSHOT PHYSICS v30 IMMORTAL++
DESC: Deterministic, multiverse-aware, shard-aware, binary-signed snapshot
      engine with drift-proof state views, advantage scoring, and CoreMemory
      hot surfaces.
===============================================================================
*/

// Lazy CoreMemory resolution — avoids TDZ from circular imports
const CoreMemory = new Proxy({}, {
  get(_target, prop) {
    const memory = globalThis.PulseRealm?.PulseCoreMemory || globalThis.PulseRealm?.PulseCoreGMemory || null;
    if (!memory) return undefined;
    const value = memory[prop];
    return typeof value === "function" ? value.bind(memory) : value;
  }
});

// ============================================================================
// v30 CONSTANTS (clean — no v16 remnants)
// ============================================================================
export const SNAPSHOT_ENGINE_VERSION = "v30-ImmortalPlus";
export const SNAPSHOT_SCHEMA_VERSION = "v30";

// ============================================================================
// Cosmos Context (v30)
// ============================================================================
function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root",
    shardId: context.shardId || "s:primary"
  };
}
// ============================================================================
//  SnapshotHeader — IMMORTAL DATA FACTORY
// ============================================================================
export const SnapshotHeader = ({
  snapshotId,
  instanceId,
  lineageRootId = null,
  logicalClock,
  cosmos,
  binarySignature = null,
  advantageScore = 0
}) =>
  Object.freeze({
    snapshotId,
    instanceId,
    lineageRootId,
    logicalClock,
    cosmos,
    binarySignature,
    advantageScore,
    schemaVersion: SNAPSHOT_SCHEMA_VERSION,
    engineVersion: SNAPSHOT_ENGINE_VERSION
  });


// ============================================================================
//  SnapshotStateView — IMMORTAL DATA FACTORY
// ============================================================================
export const SnapshotStateView = ({
  regionId = null,
  hostName = null,
  configVersion = null,
  role = null,
  mode = null,
  healthFlags = [],
  meta = {},
  cosmos
}) =>
  Object.freeze({
    regionId,
    hostName,
    configVersion,
    role,
    mode,
    healthFlags: Array.isArray(healthFlags)
      ? [...healthFlags].sort()
      : [],
    meta,

    // multiverse placement
    universeId: cosmos.universeId,
    timelineId: cosmos.timelineId,
    branchId: cosmos.branchId,
    shardId: cosmos.shardId,

    schemaVersion: SNAPSHOT_SCHEMA_VERSION,
    engineVersion: SNAPSHOT_ENGINE_VERSION
  });


// ============================================================================
//  SnapshotRecord — IMMORTAL DATA FACTORY
// ============================================================================
export const SnapshotRecord = ({ header, state }) =>
  Object.freeze({
    header,
    state,
    schemaVersion: SNAPSHOT_SCHEMA_VERSION,
    engineVersion: SNAPSHOT_ENGINE_VERSION
  });

// ============================================================================
// Helpers
// ============================================================================

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function computeBinarySignature(seedParts = []) {
  const seed = seedParts.join("|");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return "SNAP-BIN-" + hash.toString(16).padStart(8, "0");
}

function computeAdvantageScore(state) {
  let score = 0;

  if (state.role === "primary") score += 3;
  if (state.mode === "active") score += 2;
  if (Array.isArray(state.healthFlags)) {
    const good = state.healthFlags.filter(f => f === "ok").length;
    score += Math.min(good, 3);
  }

  return Math.min(score, 10);
}

function deterministicSnapshotId(instanceId, cosmos, logicalClock, state) {
  const payload = JSON.stringify({
    instanceId,
    cosmos,
    logicalClock,
    state
  });

  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash * 31 + payload.charCodeAt(i)) >>> 0;
  }

  return `snap-${instanceId}-${hash.toString(16).padStart(8, "0")}`;
}

// ============================================================================
// Core Snapshot Logic (v30 IMMORTAL++)
// ============================================================================

export function buildSnapshotFromInstanceState({
  instanceId,
  currentInstanceState,
  configDescriptor = {},
  cosmosContext = {},
  logicalClock,
  lineageRootId = null
}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);

  const stateView = new SnapshotStateView({
    regionId: currentInstanceState.currentRegionId,
    hostName: currentInstanceState.currentHostName,
    configVersion: configDescriptor.configVersion || null,
    role: configDescriptor.role || null,
    mode: configDescriptor.mode || null,
    healthFlags: configDescriptor.healthFlags || [],
    meta: configDescriptor.meta || {},
    cosmos
  });

  const advantageScore = computeAdvantageScore(stateView);

  const binarySignature = computeBinarySignature([
    instanceId,
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId,
    logicalClock,
    stateView.regionId,
    stateView.role,
    stateView.mode
  ]);

  const snapshotId = deterministicSnapshotId(
    instanceId,
    cosmos,
    logicalClock,
    stateView
  );

  const header = new SnapshotHeader({
    snapshotId,
    instanceId,
    lineageRootId,
    logicalClock,
    cosmos,
    binarySignature,
    advantageScore
  });

  const record = new SnapshotRecord({
    header,
    state: stateView
  });

  const key = [
    "snapshot",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId,
    instanceId,
    snapshotId
  ].join("|");

  CoreMemory.set("snapshot-physics-v30", key, record);

  return record;
}

// ============================================================================
// Cloning
// ============================================================================
export function cloneSnapshot(snapshotRecord) {
  return new SnapshotRecord({
    header: clone(snapshotRecord.header),
    state: clone(snapshotRecord.state)
  });
}

// ============================================================================
// Delta Projection (v30)
// ============================================================================
export function projectSnapshotForDelta(snapshotRecord) {
  const s = snapshotRecord.state;

  return {
    header: clone(snapshotRecord.header),
    state: {
      regionId: s.regionId,
      hostName: s.hostName,
      configVersion: s.configVersion,
      role: s.role,
      mode: s.mode,
      healthFlags: s.healthFlags.slice().sort(),
      meta: clone(s.meta),

      universeId: s.universeId,
      timelineId: s.timelineId,
      branchId: s.branchId,
      shardId: s.shardId
    }
  };
}

// ============================================================================
// CoreMemory Accessors
// ============================================================================
export function getLastSnapshot(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const prefix = [
    "snapshot",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId,
    instanceId
  ].join("|");

  const all = CoreMemory.getNamespace("snapshot-physics-v30") || {};
  const keys = Object.keys(all).filter(k => k.startsWith(prefix));

  if (keys.length === 0) return null;

  keys.sort();
  return all[keys[keys.length - 1]];
}

export function getSnapshotMemoryState() {
  CoreMemory.prewarm();
  return CoreMemory.getNamespace("snapshot-physics-v30");
}

// ============================================================================
// Exported API
// ============================================================================
const SnapshotPhysicsAPI = {
  SnapshotHeader,
  SnapshotStateView,
  SnapshotRecord,

  buildSnapshotFromInstanceState,
  cloneSnapshot,
  projectSnapshotForDelta,

  getLastSnapshot,
  getSnapshotMemoryState,

  CoreMemory,
  SNAPSHOT_ENGINE_VERSION,
  SNAPSHOT_SCHEMA_VERSION
};

export default SnapshotPhysicsAPI;
