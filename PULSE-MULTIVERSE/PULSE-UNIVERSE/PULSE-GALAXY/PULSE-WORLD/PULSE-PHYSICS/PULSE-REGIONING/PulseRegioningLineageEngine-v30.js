/*
===============================================================================
FILE: /PULSE-UNIVERSE/LineageEngine-v30.js
LAYER: PULSE-WORLD / PULSE-LINEAGE + CORE MEMORY + MULTIVERSE COSMOS v30 IMMORTAL++
DESC: Multiverse-aware lineage physics with region/host drift, advantage
      vectors, hot-lane metrics, and binary integrity surfaces.
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

import { PulseCoreGMemory } from "../../PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
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
// Helpers (v30 IMMORTAL)
// ---------------------------------------------------------------------------

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function computeBinaryIntegrityHash(payload) {
  const json = JSON.stringify(payload || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "LINEAGE_BIN_" + hash.toString(16).padStart(8, "0");
}

// ---------------------------------------------------------------------------
// Lineage Physics (v30)
// ---------------------------------------------------------------------------

export const LineageEventType = Object.freeze({
  ROOT: "ROOT",
  MOVE_REGION: "MOVE_REGION",
  MOVE_HOST: "MOVE_HOST",
  MERGE_INTO: "MERGE_INTO",
  RETIRE: "RETIRE",
  CUSTOM: "CUSTOM"
});
// ============================================================================
//  LineageEvent — IMMORTAL DATA FACTORY
// ============================================================================
export const LineageEvent = ({
  type,
  ts = PulseRealm.PulseNOW,
  payload = {},
  meta = {}
}) =>
  Object.freeze({
    type,
    ts,
    payload,
    meta
  });


// ============================================================================
//  LineageRecord — IMMORTAL DATA FACTORY
// ============================================================================
export const LineageRecord = ({
  instanceId,
  createdAt = PulseRealm.PulseNOW,
  events = [],
  cosmos = null,
  integrity = null
}) =>
  Object.freeze({
    instanceId,
    createdAt,
    events,
    cosmos,
    integrity
  });


// ============================================================================
//  CurrentInstanceState — IMMORTAL DATA FACTORY
// ============================================================================
export const CurrentInstanceState = ({
  instanceId,
  active = true,
  currentRegionId = null,
  currentHostName = null,
  mergedInto = null,
  universeId = "u:default",
  timelineId = "t:main",
  branchId = "b:root",
  shardId = "s:primary"
}) =>
  Object.freeze({
    instanceId,
    active,
    currentRegionId,
    currentHostName,
    mergedInto,
    universeId,
    timelineId,
    branchId,
    shardId
  });


// ============================================================================
//  LineageSummary — IMMORTAL DATA FACTORY
// ============================================================================
export const LineageSummary = ({
  instanceId,
  totalEvents,
  firstEventAt,
  lastEventAt,
  lastEventType,
  regionMoves = 0,
  hostMoves = 0,
  merges = 0,
  retired = false,
  driftScore = 0,
  advantageScore = 0
}) =>
  Object.freeze({
    instanceId,
    totalEvents,
    firstEventAt,
    lastEventAt,
    lastEventType,
    regionMoves,
    hostMoves,
    merges,
    retired,
    driftScore,
    advantageScore
  });

// ---------------------------------------------------------------------------
// Drift + Advantage (symbolic lineage vectors)
// ---------------------------------------------------------------------------

function computeLineageDriftAndAdvantage(lineageRecord) {
  const events = lineageRecord.events || [];
  let regionMoves = 0;
  let hostMoves = 0;
  let merges = 0;
  let retired = false;

  for (const ev of events) {
    switch (ev.type) {
      case LineageEventType.MOVE_REGION:
        regionMoves += 1;
        break;
      case LineageEventType.MOVE_HOST:
        hostMoves += 1;
        break;
      case LineageEventType.MERGE_INTO:
        merges += 1;
        break;
      case LineageEventType.RETIRE:
        retired = true;
        break;
      default:
        break;
    }
  }

  const totalMoves = regionMoves + hostMoves;
  const driftBase = clamp01(totalMoves / 64);
  const mergeFactor = merges > 0 ? 0.2 : 0;
  const retirePenalty = retired ? 0.3 : 0;

  const driftScore = clamp01(driftBase + mergeFactor + retirePenalty);
  const advantageScore = clamp01(1 - driftScore * 0.7);

  return {
    regionMoves,
    hostMoves,
    merges,
    retired,
    driftScore,
    advantageScore
  };
}

// ---------------------------------------------------------------------------
// Lineage core operations (pure v30)
// ---------------------------------------------------------------------------

export function createLineageRoot({
  instanceId,
  universeId = "u:default",
  timelineId = "t:main",
  branchId = "b:root",
  shardId = "s:primary",
  regionId = null,
  hostName = null,
  meta = {}
}) {
  const rootEvent = new LineageEvent({
    type: LineageEventType.ROOT,
    payload: {
      universeId,
      timelineId,
      branchId,
      shardId,
      regionId,
      hostName
    },
    meta
  });

  const cosmos = { universeId, timelineId, branchId, shardId };

  const record = new LineageRecord({
    instanceId,
    createdAt: PulseRealm.PulseNOW,
    events: [rootEvent],
    cosmos
  });

  record.integrity = {
    hash: computeBinaryIntegrityHash(record),
    ts: PulseRealm.PulseNOW
  };

  return record;
}

export function appendLineageEvent(lineageRecord, event) {
  const events = Array.isArray(lineageRecord.events)
    ? lineageRecord.events.slice()
    : [];

  events.push(event);

  const updated = new LineageRecord({
    instanceId: lineageRecord.instanceId,
    createdAt: lineageRecord.createdAt,
    events,
    cosmos: lineageRecord.cosmos || null
  });

  updated.integrity = {
    hash: computeBinaryIntegrityHash(updated),
    ts: PulseRealm.PulseNOW
  };

  return updated;
}

export function computeCurrentInstanceState(lineageRecord) {
  const instanceId = lineageRecord.instanceId;
  const baseCosmos = lineageRecord.cosmos || {};
  let state = new CurrentInstanceState({
    instanceId,
    universeId: baseCosmos.universeId || "u:default",
    timelineId: baseCosmos.timelineId || "t:main",
    branchId: baseCosmos.branchId || "b:root",
    shardId: baseCosmos.shardId || "s:primary"
  });

  for (const ev of lineageRecord.events || []) {
    const p = ev.payload || {};

    switch (ev.type) {
      case LineageEventType.ROOT:
        state.universeId = p.universeId || state.universeId;
        state.timelineId = p.timelineId || state.timelineId;
        state.branchId = p.branchId || state.branchId;
        state.shardId = p.shardId || state.shardId;
        state.currentRegionId = p.regionId || state.currentRegionId;
        state.currentHostName = p.hostName || state.currentHostName;
        break;

      case LineageEventType.MOVE_REGION:
        if (p.regionId) state.currentRegionId = p.regionId;
        break;

      case LineageEventType.MOVE_HOST:
        if (p.hostName) state.currentHostName = p.hostName;
        break;

      case LineageEventType.MERGE_INTO:
        if (p.targetInstanceId) state.mergedInto = p.targetInstanceId;
        break;

      case LineageEventType.RETIRE:
        state.active = false;
        break;

      case LineageEventType.CUSTOM:
      default:
        break;
    }
  }

  return state;
}

export function summarizeLineage(lineageRecord) {
  const events = lineageRecord.events || [];
  const totalEvents = events.length;

  if (totalEvents === 0) {
    return new LineageSummary({
      instanceId: lineageRecord.instanceId,
      totalEvents: 0,
      firstEventAt: null,
      lastEventAt: null,
      lastEventType: null,
      regionMoves: 0,
      hostMoves: 0,
      merges: 0,
      retired: false,
      driftScore: 0,
      advantageScore: 0
    });
  }

  const first = events[0];
  const last = events[events.length - 1];

  const driftAdv = computeLineageDriftAndAdvantage(lineageRecord);

  return new LineageSummary({
    instanceId: lineageRecord.instanceId,
    totalEvents,
    firstEventAt: first.ts,
    lastEventAt: last.ts,
    lastEventType: last.type,
    regionMoves: driftAdv.regionMoves,
    hostMoves: driftAdv.hostMoves,
    merges: driftAdv.merges,
    retired: driftAdv.retired,
    driftScore: driftAdv.driftScore,
    advantageScore: driftAdv.advantageScore
  });
}

// Compact lineage (v30: still root + last N, but integrity-aware)
export function compactLineage(lineageRecord, maxEvents = 64) {
  const events = lineageRecord.events || [];
  if (events.length <= maxEvents) return lineageRecord;

  const root = events[0];
  const tail = events.slice(-Math.max(1, maxEvents - 1));
  const compactedEvents = [root, ...tail];

  const compacted = new LineageRecord({
    instanceId: lineageRecord.instanceId,
    createdAt: lineageRecord.createdAt,
    events: compactedEvents,
    cosmos: lineageRecord.cosmos || null
  });

  compacted.integrity = {
    hash: computeBinaryIntegrityHash(compacted),
    ts: PulseRealm.PulseNOW
  };

  return compacted;
}

// ---------------------------------------------------------------------------
// Multiverse + CoreMemory integration (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

const ROUTE = "lineage-cosmos-multiverse-v30";

const KEY_LINEAGE_PREFIX  = "lineage:";
const KEY_STATE_PREFIX    = "state:";
const KEY_SUMMARY_PREFIX  = "summary:";
const KEY_COMPACT_PREFIX  = "compact:";

const KEY_HOT_INSTANCES   = "hot-instances";
const KEY_HOT_REGIONS     = "hot-regions";
const KEY_HOT_HOSTS       = "hot-hosts";
const KEY_HOT_UNIVERSES   = "hot-universes";
const KEY_HOT_TIMELINES   = "hot-timelines";
const KEY_HOT_DRIFT       = "hot-drift";
const KEY_HOT_ADVANTAGE   = "hot-advantage";

function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root",
    shardId: context.shardId || "s:primary"
  };
}

function cosmosKey(prefix, instanceId, cosmos) {
  return [
    prefix,
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId,
    instanceId
  ].join("|");
}

function lineageKey(instanceId, cosmos) {
  return cosmosKey(KEY_LINEAGE_PREFIX, instanceId, cosmos);
}

function stateKey(instanceId, cosmos) {
  return cosmosKey(KEY_STATE_PREFIX, instanceId, cosmos);
}

function summaryKey(instanceId, cosmos) {
  return cosmosKey(KEY_SUMMARY_PREFIX, instanceId, cosmos);
}

function compactKey(instanceId, cosmos) {
  return cosmosKey(KEY_COMPACT_PREFIX, instanceId, cosmos);
}

// Hot tracking

function trackInstance(instanceId, cosmos) {
  if (!instanceId) return;

  const hotInstances = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  const key = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.shardId}|${instanceId}`;
  hotInstances[key] = (hotInstances[key] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hotInstances);

  const hotUniverses = CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES) || {};
  hotUniverses[cosmos.universeId] = (hotUniverses[cosmos.universeId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_UNIVERSES, hotUniverses);

  const hotTimelines = CoreMemory.get(ROUTE, KEY_HOT_TIMELINES) || {};
  const tlKey = `${cosmos.universeId}|${cosmos.timelineId}`;
  hotTimelines[tlKey] = (hotTimelines[tlKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_TIMELINES, hotTimelines);
}

function trackRegionHostFromState(state, cosmos) {
  if (!state) return;

  const regions = CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {};
  const hosts = CoreMemory.get(ROUTE, KEY_HOT_HOSTS) || {};

  if (state.currentRegionId) {
    const rKey = `${cosmos.universeId}|${cosmos.timelineId}|${state.currentRegionId}`;
    regions[rKey] = (regions[rKey] || 0) + 1;
  }

  if (state.currentHostName) {
    const hKey = `${cosmos.universeId}|${cosmos.timelineId}|${state.currentHostName}`;
    hosts[hKey] = (hosts[hKey] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, regions);
  CoreMemory.set(ROUTE, KEY_HOT_HOSTS, hosts);
}

function trackDriftAdvantage(summary, cosmos) {
  if (!summary) return;

  const baseKey = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.shardId}|${summary.instanceId}`;

  const hotDrift = CoreMemory.get(ROUTE, KEY_HOT_DRIFT) || {};
  const hotAdv = CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE) || {};

  hotDrift[baseKey] = (hotDrift[baseKey] || 0) + summary.driftScore;
  hotAdv[baseKey] = (hotAdv[baseKey] || 0) + summary.advantageScore;

  CoreMemory.set(ROUTE, KEY_HOT_DRIFT, hotDrift);
  CoreMemory.set(ROUTE, KEY_HOT_ADVANTAGE, hotAdv);
}

// Wrapped API (v30)

export function createLineageRootWithMemory(args, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const record = createLineageRoot({ ...args, ...cosmos });
  const instanceId = record.instanceId;

  CoreMemory.set(ROUTE, lineageKey(instanceId, cosmos), record);
  trackInstance(instanceId, cosmos);

  const state = computeCurrentInstanceState(record);
  const summary = summarizeLineage(record);

  CoreMemory.set(ROUTE, stateKey(instanceId, cosmos), state);
  CoreMemory.set(ROUTE, summaryKey(instanceId, cosmos), summary);
  trackRegionHostFromState(state, cosmos);
  trackDriftAdvantage(summary, cosmos);

  return record;
}

export function appendLineageEventWithMemory(lineageRecord, event, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const updated = appendLineageEvent(lineageRecord, event);
  const instanceId = updated.instanceId;

  CoreMemory.set(ROUTE, lineageKey(instanceId, cosmos), updated);
  trackInstance(instanceId, cosmos);

  const state = computeCurrentInstanceState(updated);
  const summary = summarizeLineage(updated);

  CoreMemory.set(ROUTE, stateKey(instanceId, cosmos), state);
  CoreMemory.set(ROUTE, summaryKey(instanceId, cosmos), summary);
  trackRegionHostFromState(state, cosmos);
  trackDriftAdvantage(summary, cosmos);

  return updated;
}

export function computeCurrentInstanceStateWithMemory(lineageRecord, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const state = computeCurrentInstanceState(lineageRecord);
  const instanceId = lineageRecord.instanceId;

  CoreMemory.set(ROUTE, stateKey(instanceId, cosmos), state);
  trackInstance(instanceId, cosmos);
  trackRegionHostFromState(state, cosmos);

  return state;
}

export function summarizeLineageWithMemory(lineageRecord, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const summary = summarizeLineage(lineageRecord);
  const instanceId = lineageRecord.instanceId;

  CoreMemory.set(ROUTE, summaryKey(instanceId, cosmos), summary);
  trackInstance(instanceId, cosmos);
  trackDriftAdvantage(summary, cosmos);

  return summary;
}

export function compactLineageWithMemory(lineageRecord, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const compacted = compactLineage(lineageRecord);
  const instanceId = compacted.instanceId;

  CoreMemory.set(ROUTE, compactKey(instanceId, cosmos), compacted);
  CoreMemory.set(ROUTE, lineageKey(instanceId, cosmos), compacted);
  trackInstance(instanceId, cosmos);

  const state = computeCurrentInstanceState(compacted);
  const summary = summarizeLineage(compacted);

  CoreMemory.set(ROUTE, stateKey(instanceId, cosmos), state);
  CoreMemory.set(ROUTE, summaryKey(instanceId, cosmos), summary);
  trackRegionHostFromState(state, cosmos);
  trackDriftAdvantage(summary, cosmos);

  return compacted;
}

// Hot Memory Accessors

export function getLastLineageRecord(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, lineageKey(instanceId, cosmos));
}

export function getLastCurrentState(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, stateKey(instanceId, cosmos));
}

export function getLastLineageSummary(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, summaryKey(instanceId, cosmos));
}

export function getLastCompactedLineage(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, compactKey(instanceId, cosmos));
}

export function getLineageMemoryState() {
  CoreMemory.prewarm();

  return {
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotHosts: CoreMemory.get(ROUTE, KEY_HOT_HOSTS),
    hotUniverses: CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES),
    hotTimelines: CoreMemory.get(ROUTE, KEY_HOT_TIMELINES),
    hotDrift: CoreMemory.get(ROUTE, KEY_HOT_DRIFT),
    hotAdvantage: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE)
  };
}

// Consolidated export

const LineageEngineAPI = {
  LineageEventType,
  LineageEvent,
  LineageRecord,
  CurrentInstanceState,
  LineageSummary,

  createLineageRoot,
  appendLineageEvent,
  computeCurrentInstanceState,
  summarizeLineage,
  compactLineage,

  createLineageRootWithMemory,
  appendLineageEventWithMemory,
  computeCurrentInstanceStateWithMemory,
  summarizeLineageWithMemory,
  compactLineageWithMemory,

  getLastLineageRecord,
  getLastCurrentState,
  getLastLineageSummary,
  getLastCompactedLineage,
  getLineageMemoryState,

  CoreMemory,
  ROUTE
};

export default LineageEngineAPI;
