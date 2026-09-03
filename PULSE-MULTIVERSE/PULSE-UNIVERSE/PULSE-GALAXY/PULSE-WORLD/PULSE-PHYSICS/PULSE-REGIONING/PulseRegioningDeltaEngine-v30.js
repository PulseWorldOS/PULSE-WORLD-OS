/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseRegioningDeltaEngine-v30.js
LAYER: PULSE-WORLD SUBSTRATE — SYMBOLIC DELTA ENGINE — v30-IMMORTAL++
DESC: Multiverse-aware, region-aware, band-aware, binary-friendly delta engine
      with CoreMemory hotmaps and cosmos/band envelopes.
      Backwards compatible with v16 API, extended for v30 organism.
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
// Versioning (v30 IMMORTAL++ — backwards compatible with v16)
// ---------------------------------------------------------------------------
export const DELTA_ENGINE_VERSION = "v30-ImmortalPlus";
export const DELTA_SCHEMA_VERSION = "v3";

// -------------------------
// Types
// -------------------------

export const DeltaFieldChange = ({ field, before, after, kind = "symbolic" }) =>
  Object.freeze({
    field,
    before,
    after,
    kind
  });


export const DeltaRecord = ({
  instanceId,
  snapshotBeforeId,
  snapshotAfterId,
  cosmos,
  changes = [],
  region = null,
  envelope = null,
  score = null
}) =>
  Object.freeze({
    instanceId,
    snapshotBeforeId,
    snapshotAfterId,
    cosmos,
    region,
    changes,
    envelope,
    score,
    schemaVersion: DELTA_SCHEMA_VERSION,
    engineVersion: DELTA_ENGINE_VERSION
  });

export const DeltaSummary = ({
  instanceId,
  cosmos,
  region,
  totalChanges,
  changedFields,
  score = null
}) =>
  Object.freeze({
    instanceId,
    cosmos,
    region,
    totalChanges,
    changedFields,
    score,
    schemaVersion: DELTA_SCHEMA_VERSION,
    engineVersion: DELTA_ENGINE_VERSION
  });

export const DeltaPatch = ({ cosmos, region = null, patch = {} }) =>
  Object.freeze({
    cosmos,
    region,
    patch,
    schemaVersion: DELTA_SCHEMA_VERSION,
    engineVersion: DELTA_ENGINE_VERSION
  });


// -------------------------
// Helpers
// -------------------------

function shallowEqual(a, b) {
  // v30: still deterministic, but fast-path for primitives/null
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== "object" || typeof b !== "object") return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

function clone(obj) {
  if (obj == null) return obj;
  return JSON.parse(JSON.stringify(obj));
}

function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root",
    // v30: optional world/band identifiers (symbolic only)
    worldId: context.worldId || context.world || "w:global",
    bandId: context.bandId || context.band || "band:default"
  };
}

function normalizeRegionContext(state = {}) {
  // state may be snapshot.state or a separate region context
  const regionId =
    state.regionId ||
    state.currentRegionId ||
    (state.region && state.region.regionId) ||
    "r:global";

  return { regionId };
}

// v30: build a symbolic envelope for quick indexing / logging
function buildDeltaEnvelope({ instanceId, cosmos, region, changes }) {
  const totalChanges = changes.length;
  const fields = changes.map((c) => c.field);
  const binaryFields = changes.filter((c) => c.kind === "binary").map((c) => c.field);

  return {
    instanceId,
    cosmos,
    region,
    totalChanges,
    fields,
    binaryFields
  };
}

// v30: simple scalar score for “how big” this delta is
function computeDeltaScore(changes) {
  if (!Array.isArray(changes) || changes.length === 0) return 0;
  let score = 0;
  for (const c of changes) {
    // symbolic change = 1, binary/meta can weigh slightly more if desired
    const base = 1;
    const weight =
      c.kind === "binary" ? 1.5 :
      c.kind === "meta"   ? 1.2 :
      1.0;
    score += base * weight;
  }
  return score;
}

// -------------------------
// Core Delta Logic (v30 IMMORTAL++, multiverse + band aware)
// -------------------------

/**
 * computeDelta
 *
 * Input:
 *   - beforeSnapshot: SnapshotRecord
 *   - afterSnapshot: SnapshotRecord
 *   - cosmosContext: { universeId?, timelineId?, branchId?, worldId?, bandId? }
 *
 * Output:
 *   - DeltaRecord (multiverse + band + region aware)
 */
export function computeDelta(beforeSnapshot, afterSnapshot, cosmosContext = {}) {
  const cosmos = normalizeCosmosContext(cosmosContext);

  const before = beforeSnapshot.state || {};
  const after = afterSnapshot.state || {};

  // v30: extended substrate fields, still safe + symbolic
  const fields = [
    // v16 core
    "regionId",
    "hostName",
    "configVersion",
    "role",
    "mode",
    "healthFlags",
    "meta",

    // v30: world/band + routing + binary hints (optional, if present)
    "worldId",
    "universeId",
    "timelineId",
    "branchId",
    "band",
    "presence",
    "powerHints",
    "laneId",
    "compileProfile",
    "routerState",
    "earnState",
    "sendState",
    "binaryState",
    "vitals",
    "trustState"
  ];

  const changes = [];

  for (const field of fields) {
    const beforeVal = clone(before[field]);
    const afterVal = clone(after[field]);

    if (!shallowEqual(beforeVal, afterVal)) {
      // v30: mark some fields as “binary/meta” for analytics only
      const kind =
        field === "binaryState" || field === "powerHints"
          ? "binary"
          : field === "vitals" || field === "trustState"
          ? "meta"
          : "symbolic";

      changes.push(
        new DeltaFieldChange({
          field,
          before: beforeVal,
          after: afterVal,
          kind
        })
      );
    }
  }

  const region = normalizeRegionContext(after || before || {});
  const score = computeDeltaScore(changes);
  const envelope = buildDeltaEnvelope({
    instanceId: beforeSnapshot.header.instanceId,
    cosmos,
    region,
    changes
  });

  return new DeltaRecord({
    instanceId: beforeSnapshot.header.instanceId,
    snapshotBeforeId: beforeSnapshot.header.snapshotId,
    snapshotAfterId: afterSnapshot.header.snapshotId,
    cosmos,
    region,
    changes,
    envelope,
    score
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
    score: deltaRecord.score ?? computeDeltaScore(deltaRecord.changes || [])
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
    patch
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
// CoreMemory + Multiverse Delta Caching (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

const ROUTE = "delta-engine-v30";

const KEY_DELTA_PREFIX   = "delta:";
const KEY_SUMMARY_PREFIX = "summary:";
const KEY_PATCH_PREFIX   = "patch:";

const KEY_HOT_FIELDS      = "hot-fields";
const KEY_HOT_INSTANCES   = "hot-instances";
const KEY_HOT_UNIVERSES   = "hot-universes";
const KEY_HOT_TIMELINES   = "hot-timelines";
const KEY_HOT_REGIONS     = "hot-regions";
const KEY_HOT_CHANGECOUNT = "hot-change-count";
const KEY_HOT_BANDS       = "hot-bands";
const KEY_HOT_WORLDS      = "hot-worlds";

function cosmosKey(prefix, instanceId, cosmos) {
  return [
    prefix,
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.worldId,
    cosmos.bandId,
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
  const instKey =
    `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.worldId}|${cosmos.bandId}|${instanceId}`;
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
  const rKey =
    `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.worldId}|${regionId}`;
  hotRegions[rKey] = (hotRegions[rKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, hotRegions);

  // Bands
  const hotBands = CoreMemory.get(ROUTE, KEY_HOT_BANDS) || {};
  const bKey = `${cosmos.universeId}|${cosmos.worldId}|${cosmos.bandId}`;
  hotBands[bKey] = (hotBands[bKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_BANDS, hotBands);

  // Worlds
  const hotWorlds = CoreMemory.get(ROUTE, KEY_HOT_WORLDS) || {};
  hotWorlds[cosmos.worldId] = (hotWorlds[cosmos.worldId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_WORLDS, hotWorlds);

  // Change counts
  const hotChangeCount = CoreMemory.get(ROUTE, KEY_HOT_CHANGECOUNT) || {};
  hotChangeCount[instKey] =
    (hotChangeCount[instKey] || 0) + (deltaSummary.totalChanges || 0);
  CoreMemory.set(ROUTE, KEY_HOT_CHANGECOUNT, hotChangeCount);
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

  // v30: keep return shape backwards compatible, just richer objects
  return { deltaRecord, deltaSummary, deltaPatch };
}

// -------------------------
// CoreMemory Accessors
// -------------------------

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
    hotBands: CoreMemory.get(ROUTE, KEY_HOT_BANDS),
    hotWorlds: CoreMemory.get(ROUTE, KEY_HOT_WORLDS),
    hotChangeCount: CoreMemory.get(ROUTE, KEY_HOT_CHANGECOUNT)
  };
}

// -------------------------
// Exported API
// -------------------------

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
