/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseRegioningDeltaEngine-v30.js
LAYER: PULSE-WORLD SUBSTRATE — SYMBOLIC + BINARY DELTA ENGINE — v30-IMMORTAL++
===============================================================================
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ---------------------------------------------------------------------------
// CoreMemory via PulseProofBridge (only import)
// ---------------------------------------------------------------------------
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



const CoreMemory = new Proxy({}, {
  get(_target, prop) {
    let memory = PulseRealm?.PulseCoreMemory || null;
    if (!memory) {
      try { memory = PulseCoreGMemory; } catch(e) { memory = null; }
    }
    if (!memory) return undefined;
    const value = memory[prop];
    return typeof value === "function" ? value.bind(memory) : value;
  }
});

// ---------------------------------------------------------------------------
// VERSION + META (v30 IMMORTAL++)
// ---------------------------------------------------------------------------
export const DELTA_ENGINE_VERSION = "v30-ImmortalPlus";
export const DELTA_SCHEMA_VERSION = "v3";

const ROUTE = "delta-engine-v30";

const KEY_DELTA_PREFIX   = "delta:";
const KEY_SUMMARY_PREFIX = "summary:";
const KEY_PATCH_PREFIX   = "patch:";

const KEY_HOT_FIELDS        = "hot-fields";
const KEY_HOT_INSTANCES     = "hot-instances";
const KEY_HOT_UNIVERSES     = "hot-universes";
const KEY_HOT_TIMELINES     = "hot-timelines";
const KEY_HOT_REGIONS       = "hot-regions";
const KEY_HOT_CHANGECOUNT   = "hot-change-count";
const KEY_HOT_BINARY_SIGS   = "hot-binary-signatures";
const KEY_HOT_DELTA_WEIGHT  = "hot-delta-weight";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
// ============================================================================
//  DeltaFieldChange — IMMORTAL DATA FACTORY
// ============================================================================
export const DeltaFieldChange = ({
  field,
  before,
  after,
  kind = "symbolic",
  weight = 1
}) =>
  Object.freeze({
    field,
    before,
    after,
    kind,      // symbolic | binary | meta
    weight     // scalar importance
  });


// ============================================================================
//  DeltaRecord — IMMORTAL DATA FACTORY
// ============================================================================
export const DeltaRecord = ({
  instanceId,
  snapshotBeforeId,
  snapshotAfterId,
  cosmos,
  region,
  changes = [],
  binarySignature = null,
  deltaWeight = 0,
  meta = {}
}) =>
  Object.freeze({
    instanceId,
    snapshotBeforeId,
    snapshotAfterId,
    cosmos,            // { universeId, timelineId, branchId }
    region,            // { regionId? }
    changes,           // array of DeltaFieldChange
    binarySignature,
    deltaWeight,
    meta,
    schemaVersion: DELTA_SCHEMA_VERSION,
    engineVersion: DELTA_ENGINE_VERSION
  });


// ============================================================================
//  DeltaSummary — IMMORTAL DATA FACTORY
// ============================================================================
export const DeltaSummary = ({
  instanceId,
  cosmos,
  region,
  totalChanges,
  changedFields,
  binarySignature,
  deltaWeight
}) =>
  Object.freeze({
    instanceId,
    cosmos,
    region,
    totalChanges,
    changedFields,
    binarySignature,
    deltaWeight,
    schemaVersion: DELTA_SCHEMA_VERSION,
    engineVersion: DELTA_ENGINE_VERSION
  });


// ============================================================================
//  DeltaPatch — IMMORTAL DATA FACTORY
// ============================================================================
export const DeltaPatch = ({
  cosmos,
  region = null,
  patch = {},
  binarySignature = null
}) =>
  Object.freeze({
    cosmos,
    region,
    patch,
    binarySignature,
    schemaVersion: DELTA_SCHEMA_VERSION,
    engineVersion: DELTA_ENGINE_VERSION
  });



// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shallowEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function clone(obj) {
  return obj == null ? obj : JSON.parse(JSON.stringify(obj));
}

function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root"
  };
}

function normalizeRegionContext(state = {}) {
  const regionId =
    state.regionId ||
    state.currentRegionId ||
    (state.region && state.region.regionId) ||
    "r:global";

  return { regionId };
}

function computeBinaryDeltaSignature({
  instanceId,
  cosmos,
  region,
  snapshotBeforeId,
  snapshotAfterId,
  changedFields
}) {
  const seed =
    `${instanceId}|${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}|` +
    `${region.regionId || "r:global"}|${snapshotBeforeId}|${snapshotAfterId}|` +
    `${changedFields.join(",")}`;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return "DELTA-BIN-" + hash.toString(16).padStart(8, "0");
}

function estimateDeltaWeight(changes = []) {
  // Simple heuristic: more fields + non-meta fields → higher weight
  let weight = 0;
  for (const c of changes) {
    const base = c.weight || 1;
    if (c.field === "configVersion" || c.field === "role" || c.field === "mode") {
      weight += base * 3;
    } else if (c.field === "healthFlags" || c.field === "meta") {
      weight += base * 2;
    } else {
      weight += base;
    }
  }
  return weight;
}

function cosmosKey(prefix, instanceId, cosmos) {
  return [
    prefix,
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    instanceId
  ].join("|");
}

function deltaKey(instanceId, cosmos) {
  return cosmosKey(KEY_DELTA_PREFIX, instanceId, cosmos);
}

function summaryKey(instanceId, cosmos) {
  return cosmosKey(KEY_SUMMARY_PREFIX, instanceId, cosmos);
}

function patchKey(instanceId, cosmos) {
  return cosmosKey(KEY_PATCH_PREFIX, instanceId, cosmos);
}

// ---------------------------------------------------------------------------
// Core Delta Logic (v30)
// ---------------------------------------------------------------------------

/**
 * computeDelta
 *
 * Input:
 *   - beforeSnapshot: SnapshotRecord
 *   - afterSnapshot: SnapshotRecord
 *   - cosmosContext: { universeId?, timelineId?, branchId? }
 *
 * Output:
 *   - DeltaRecord (multiverse-aware, binary-signatured)
 */
export function computeDelta(beforeSnapshot, afterSnapshot, cosmosContext = {}) {
  const cosmos = normalizeCosmosContext(cosmosContext);

  const before = beforeSnapshot.state || {};
  const after = afterSnapshot.state || {};

  // v30: symbolic + deployment-critical substrate fields
  const fields = [
    "regionId",
    "hostName",
    "configVersion",
    "role",
    "mode",
    "healthFlags",
    "meta",
    // v30 additions (still symbolic, but more world-aware)
    "universeId",
    "timelineId",
    "branchId",
    "deploymentTier",
    "routingHints"
  ];

  const changes = [];

  for (const field of fields) {
    const beforeVal = clone(before[field]);
    const afterVal = clone(after[field]);

    if (!shallowEqual(beforeVal, afterVal)) {
      const kind =
        field === "meta" || field === "routingHints" ? "meta" : "symbolic";

      changes.push(
        new DeltaFieldChange({
          field,
          before: beforeVal,
          after: afterVal,
          kind,
          weight: 1
        })
      );
    }
  }

  const region = normalizeRegionContext(after || before || {});
  const changedFields = changes.map((c) => c.field);
  const deltaWeight = estimateDeltaWeight(changes);

  const binarySignature = computeBinaryDeltaSignature({
    instanceId: beforeSnapshot.header.instanceId,
    cosmos,
    region,
    snapshotBeforeId: beforeSnapshot.header.snapshotId,
    snapshotAfterId: afterSnapshot.header.snapshotId,
    changedFields
  });

  return new DeltaRecord({
    instanceId: beforeSnapshot.header.instanceId,
    snapshotBeforeId: beforeSnapshot.header.snapshotId,
    snapshotAfterId: afterSnapshot.header.snapshotId,
    cosmos,
    region,
    changes,
    binarySignature,
    deltaWeight,
    meta: {
      changedFields
    }
  });
}

/**
 * summarizeDelta
 *
 * Produces a compact summary of the delta.
 */
export function summarizeDelta(deltaRecord) {
  const changedFields = deltaRecord.changes.map((c) => c.field);

  return new DeltaSummary({
    instanceId: deltaRecord.instanceId,
    cosmos: deltaRecord.cosmos,
    region: deltaRecord.region,
    totalChanges: deltaRecord.changes.length,
    changedFields,
    binarySignature: deltaRecord.binarySignature || null,
    deltaWeight: deltaRecord.deltaWeight || 0
  });
}

/**
 * buildDeltaPatch
 *
 * Produces a reversible patch object.
 */
export function buildDeltaPatch(deltaRecord) {
  const patch = {};

  for (const change of deltaRecord.changes) {
    patch[change.field] = change.after;
  }

  return new DeltaPatch({
    cosmos: deltaRecord.cosmos,
    region: deltaRecord.region,
    patch,
    binarySignature: deltaRecord.binarySignature || null
  });
}

/**
 * applyDeltaPatch
 *
 * Applies a patch to a snapshot state.
 * Returns a NEW SnapshotStateView.
 *
 * Cosmos context is preserved but not used in physics.
 */
export function applyDeltaPatch(snapshotRecord, deltaPatch) {
  const newState = clone(snapshotRecord.state || {});

  for (const [field, value] of Object.entries(deltaPatch.patch || {})) {
    newState[field] = clone(value);
  }

  return newState;
}

// ---------------------------------------------------------------------------
// CoreMemory + Multiverse Delta Caching (v30)
// ---------------------------------------------------------------------------

function trackDeltaHot(deltaRecord, deltaSummary, deltaPatch) {
  const { instanceId, cosmos, region } = deltaRecord;
  if (!instanceId) return;

  const regionId = (region && region.regionId) || "r:global";

  // Fields
  const hotFields = CoreMemory.get(ROUTE, KEY_HOT_FIELDS) || {};
  for (const change of deltaRecord.changes) {
    const f = change.field;
    if (!f) continue;
    hotFields[f] = (hotFields[f] || 0) + 1;
  }
  CoreMemory.set(ROUTE, KEY_HOT_FIELDS, hotFields);

  // Instances
  const hotInstances = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  const instKey = `${cosmos.universeId}|${cosmos.timelineId}|${instanceId}`;
  hotInstances[instKey] = (hotInstances[instKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hotInstances);

  // Universes
  const hotUniverses = CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES) || {};
  hotUniverses[cosmos.universeId] = (hotUniverses[cosmos.universeId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_UNIVERSES, hotUniverses);

  // Timelines
  const hotTimelines = CoreMemory.get(ROUTE, KEY_HOT_TIMELINES) || {};
  const tlKey = `${cosmos.universeId}|${cosmos.timelineId}`;
  hotTimelines[tlKey] = (hotTimelines[tlKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_TIMELINES, hotTimelines);

  // Regions
  const hotRegions = CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {};
  const rKey = `${cosmos.universeId}|${cosmos.timelineId}|${regionId}`;
  hotRegions[rKey] = (hotRegions[rKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, hotRegions);

  // Change counts
  const hotChangeCount = CoreMemory.get(ROUTE, KEY_HOT_CHANGECOUNT) || {};
  hotChangeCount[instKey] =
    (hotChangeCount[instKey] || 0) + (deltaSummary.totalChanges || 0);
  CoreMemory.set(ROUTE, KEY_HOT_CHANGECOUNT, hotChangeCount);

  // Binary signatures
  const hotBinarySigs = CoreMemory.get(ROUTE, KEY_HOT_BINARY_SIGS) || {};
  const sig = deltaRecord.binarySignature || deltaSummary.binarySignature;
  if (sig) {
    hotBinarySigs[sig] = (hotBinarySigs[sig] || 0) + 1;
  }
  CoreMemory.set(ROUTE, KEY_HOT_BINARY_SIGS, hotBinarySigs);

  // Delta weight
  const hotDeltaWeight = CoreMemory.get(ROUTE, KEY_HOT_DELTA_WEIGHT) || {};
  hotDeltaWeight[instKey] =
    (hotDeltaWeight[instKey] || 0) + (deltaRecord.deltaWeight || 0);
  CoreMemory.set(ROUTE, KEY_HOT_DELTA_WEIGHT, hotDeltaWeight);
}

// ---------------------------------------------------------------------------
// Wrapped API with CoreMemory
// ---------------------------------------------------------------------------

export function computeDeltaWithMemory(beforeSnapshot, afterSnapshot, cosmosContext = {}) {
  CoreMemory.prewarm();

  const deltaRecord = computeDelta(beforeSnapshot, afterSnapshot, cosmosContext);
  const deltaSummary = summarizeDelta(deltaRecord);
  const deltaPatch = buildDeltaPatch(deltaRecord);

  const cosmos = normalizeCosmosContext(deltaRecord.cosmos || {});
  const instanceId = deltaRecord.instanceId;

  const kDelta = deltaKey(instanceId, cosmos);
  const kSummary = summaryKey(instanceId, cosmos);
  const kPatch = patchKey(instanceId, cosmos);

  CoreMemory.set(ROUTE, kDelta, deltaRecord);
  CoreMemory.set(ROUTE, kSummary, deltaSummary);
  CoreMemory.set(ROUTE, kPatch, deltaPatch);

  trackDeltaHot(deltaRecord, deltaSummary, deltaPatch);

  return { deltaRecord, deltaSummary, deltaPatch };
}

// ---------------------------------------------------------------------------
// CoreMemory Accessors
// ---------------------------------------------------------------------------

export function getLastDeltaRecord(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, deltaKey(instanceId, cosmos));
}

export function getLastDeltaSummary(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, summaryKey(instanceId, cosmos));
}

export function getLastDeltaPatch(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, patchKey(instanceId, cosmos));
}

export function getDeltaMemoryState() {
  CoreMemory.prewarm();

  return {
    hotFields: CoreMemory.get(ROUTE, KEY_HOT_FIELDS),
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotUniverses: CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES),
    hotTimelines: CoreMemory.get(ROUTE, KEY_HOT_TIMELINES),
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotChangeCount: CoreMemory.get(ROUTE, KEY_HOT_CHANGECOUNT),
    hotBinarySignatures: CoreMemory.get(ROUTE, KEY_HOT_BINARY_SIGS),
    hotDeltaWeight: CoreMemory.get(ROUTE, KEY_HOT_DELTA_WEIGHT)
  };
}

// ---------------------------------------------------------------------------
// Exported API
// ---------------------------------------------------------------------------

const DeltaEngineAPI = {
  DeltaFieldChange,
  DeltaRecord,
  DeltaSummary,
  DeltaPatch,

  computeDelta,
  summarizeDelta,
  buildDeltaPatch,
  applyDeltaPatch,

  computeDeltaWithMemory,
  getLastDeltaRecord,
  getLastDeltaSummary,
  getLastDeltaPatch,
  getDeltaMemoryState,

  CoreMemory,
  ROUTE,
  DELTA_ENGINE_VERSION,
  DELTA_SCHEMA_VERSION
};

export default DeltaEngineAPI;

PulseRealm.RegioningDeploymentPhysics = {
  DeltaFieldChange,
  DeltaRecord,
  DeltaSummary,
  DeltaPatch,

  computeDelta,
  summarizeDelta,
  buildDeltaPatch,
  applyDeltaPatch,

  computeDeltaWithMemory,
  getLastDeltaRecord,
  getLastDeltaSummary,
  getLastDeltaPatch,
  getDeltaMemoryState,

  CoreMemory,
  ROUTE,
  DELTA_ENGINE_VERSION,
  DELTA_SCHEMA_VERSION
}