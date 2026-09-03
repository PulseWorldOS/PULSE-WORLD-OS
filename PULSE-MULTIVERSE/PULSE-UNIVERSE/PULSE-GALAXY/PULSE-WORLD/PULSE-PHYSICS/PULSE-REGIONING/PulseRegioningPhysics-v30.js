/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseRegioningDeploymentPhysics-v30.js
LAYER: PULSE-WORLD SUBSTRATE — REGIONING DEPLOYMENT PHYSICS v30 IMMORTAL++
DESC: Multiverse-aware, region-aware, advantage-aware regioning physics with
      binary integrity, drift vectors, hot-lane metrics, and dualband CoreMemory.
===============================================================================
*/
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

// ===========================================================================
// v30 CONSTANTS (clean — no v16 remnants)
// ===========================================================================
export const REGIONING_ENGINE_VERSION = "v30-ImmortalPlus";
export const REGIONING_SCHEMA_VERSION = "v30";

// ===========================================================================
// Cosmos Context (v30)
// ===========================================================================
function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root",
    shardId: context.shardId || "s:primary"
  };
}
// ============================================================================
//  RegionDescriptor — IMMORTAL DATA FACTORY
// ============================================================================
export const RegionDescriptor = ({ regionId, label = "", meta = {} }) =>
  Object.freeze({
    regionId,
    label,
    meta
  });


// ============================================================================
//  RegionAffinityRules — IMMORTAL DATA FACTORY
// ============================================================================
export const RegionAffinityRules = (rules = {}, meta = {}) =>
  Object.freeze({
    rules,
    meta
  });


// ============================================================================
//  RegionStabilitySignal — IMMORTAL DATA FACTORY (v30)
// ============================================================================
export const RegionStabilitySignal = ({
  regionId,
  instability = 0,
  trend = "stable",
  latencyMs = null,
  errorRate = null,
  capacityUtilization = null
}) =>
  Object.freeze({
    regionId,
    instability: clamp01(instability),
    trend,
    latencyMs: typeof latencyMs === "number" ? latencyMs : null,
    errorRate: typeof errorRate === "number" ? clamp01(errorRate) : null,
    capacityUtilization:
      typeof capacityUtilization === "number"
        ? clamp01(capacityUtilization)
        : null
  });


// ============================================================================
//  RegionGraph — IMMORTAL DATA FACTORY (v30)
// ============================================================================
export const RegionGraph = ({
  cosmos,
  nodes = [],
  edges = {},
  meta = {}
}) =>
  Object.freeze({
    cosmos,
    nodes,
    edges,
    meta,
    schemaVersion: REGIONING_SCHEMA_VERSION,
    engineVersion: REGIONING_ENGINE_VERSION
  });


// ===========================================================================
// Helpers
// ===========================================================================
function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function computeStabilityScore(sig) {
  if (!sig) return 0;

  const base = clamp01(sig.instability);
  const trendWeight =
    sig.trend === "rising" ? 0.5 :
    sig.trend === "stable" ? 0.3 :
    0.2;

  const latency = sig.latencyMs ? clamp01(sig.latencyMs / 2000) : 0;
  const error = sig.errorRate ?? 0;
  const capacity = sig.capacityUtilization ?? 0;

  return clamp01(
    base * trendWeight +
    0.2 * latency +
    0.2 * error +
    0.2 * capacity
  );
}

function computeBinaryIntegrityHash(payload) {
  const json = JSON.stringify(payload);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "REGIONING_BIN_" + hash.toString(16).padStart(8, "0");
}

// ===========================================================================
// Region Graph Builder (v30)
// ===========================================================================
export function buildRegionGraph(regionDescriptors, affinityRules, cosmosContext = {}) {
  const cosmos = normalizeCosmosContext(cosmosContext);

  const nodes = regionDescriptors.map(r => r.regionId);
  const edges = {};

  for (const a of nodes) {
    edges[a] = {};
    for (const b of nodes) {
      if (a === b) continue;
      const weight =
        affinityRules.rules[a][b] ?? 1.0;
      edges[a][b] = clamp01(weight);
    }
  }

  const graph = new RegionGraph({
    cosmos,
    nodes,
    edges,
    meta: {
      affinityMeta: affinityRules.meta,
      nodeCount: nodes.length
    }
  });

  graph.integrity = {
    hash: computeBinaryIntegrityHash({ cosmos, nodes, edges }),
    schemaVersion: REGIONING_SCHEMA_VERSION
  };

  return graph;
}

// ===========================================================================
// Region Stability Map (v30)
// ===========================================================================
export function buildRegionStabilityMap(stabilitySignals, cosmosContext = {}) {
  const cosmos = normalizeCosmosContext(cosmosContext);

  const map = {};
  const raw = {};

  for (const sig of stabilitySignals) {
    map[sig.regionId] = computeStabilityScore(sig);
    raw[sig.regionId] = { ...sig };
  }

  const payload = {
    cosmos,
    map,
    raw,
    schemaVersion: REGIONING_SCHEMA_VERSION,
    engineVersion: REGIONING_ENGINE_VERSION
  };

  payload.integrity = {
    hash: computeBinaryIntegrityHash(payload),
    schemaVersion: REGIONING_SCHEMA_VERSION
  };

  return payload;
}

// ===========================================================================
// Region Affinity Map (v30)
// ===========================================================================
export function buildRegionAffinityMap(regionGraph, cosmosContext = {}) {
  const cosmos = normalizeCosmosContext(cosmosContext || regionGraph.cosmos);

  const payload = {
    cosmos,
    affinities: regionGraph.edges,
    schemaVersion: REGIONING_SCHEMA_VERSION,
    engineVersion: REGIONING_ENGINE_VERSION
  };

  payload.integrity = {
    hash: computeBinaryIntegrityHash(payload),
    schemaVersion: REGIONING_SCHEMA_VERSION
  };

  return payload;
}

// ===========================================================================
// CoreMemory Caching (v30)
// ===========================================================================
const ROUTE = "regioning-physics-v30";

const KEY_GRAPH_PREFIX     = "graph:";
const KEY_STABILITY_PREFIX = "stability:";
const KEY_AFFINITY_PREFIX  = "affinity:";

const KEY_HOT_REGIONS       = "hot-regions";
const KEY_HOT_EDGES         = "hot-edges";
const KEY_HOT_UNIVERSES     = "hot-universes";
const KEY_HOT_TIMELINES     = "hot-timelines";
const KEY_HOT_INSTABILITY   = "hot-instability";
const KEY_HOT_REGION_ADV    = "hot-region-advantage";
const KEY_HOT_REGION_DRIFT  = "hot-region-drift";

function cosmosKey(prefix, cosmos) {
  return [
    prefix,
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId
  ].join("|");
}

function graphKey(cosmos) {
  return cosmosKey(KEY_GRAPH_PREFIX, cosmos);
}

function stabilityKey(cosmos) {
  return cosmosKey(KEY_STABILITY_PREFIX, cosmos);
}

function affinityKey(cosmos) {
  return cosmosKey(KEY_AFFINITY_PREFIX, cosmos);
}

// ===========================================================================
// Hot Tracking (v30)
// ===========================================================================
function trackRegioningHot(regionGraph, stabilityMap, affinityMap) {
  const cosmos = regionGraph.cosmos;

  // universes
  const hotUniverses = CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES) || {};
  hotUniverses[cosmos.universeId] = (hotUniverses[cosmos.universeId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_UNIVERSES, hotUniverses);

  // timelines
  const hotTimelines = CoreMemory.get(ROUTE, KEY_HOT_TIMELINES) || {};
  const tlKey = `${cosmos.universeId}|${cosmos.timelineId}`;
  hotTimelines[tlKey] = (hotTimelines[tlKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_TIMELINES, hotTimelines);

  // regions
  const hotRegions = CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {};
  for (const regionId of regionGraph.nodes) {
    const rKey = `${cosmos.universeId}|${cosmos.timelineId}|${regionId}`;
    hotRegions[rKey] = (hotRegions[rKey] || 0) + 1;
  }
  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, hotRegions);

  // edges
  const hotEdges = CoreMemory.get(ROUTE, KEY_HOT_EDGES) || {};
  for (const from of Object.keys(regionGraph.edges)) {
    for (const to of Object.keys(regionGraph.edges[from])) {
      const eKey = `${cosmos.universeId}|${cosmos.timelineId}|${from}->${to}`;
      hotEdges[eKey] = (hotEdges[eKey] || 0) + 1;
    }
  }
  CoreMemory.set(ROUTE, KEY_HOT_EDGES, hotEdges);

  // instability
  const hotInstability = CoreMemory.get(ROUTE, KEY_HOT_INSTABILITY) || {};
  for (const [regionId, score] of Object.entries(stabilityMap.map)) {
    const sKey = `${cosmos.universeId}|${cosmos.timelineId}|${regionId}`;
    hotInstability[sKey] = (hotInstability[sKey] || 0) + score;
  }
  CoreMemory.set(ROUTE, KEY_HOT_INSTABILITY, hotInstability);

  // advantage + drift
  const hotAdv = CoreMemory.get(ROUTE, KEY_HOT_REGION_ADV) || {};
  const hotDrift = CoreMemory.get(ROUTE, KEY_HOT_REGION_DRIFT) || {};

  for (const [regionId, score] of Object.entries(stabilityMap.map)) {
    const adv = clamp01(1 - score);
    const drift = score;

    const baseKey = `${cosmos.universeId}|${cosmos.timelineId}|${regionId}`;
    hotAdv[baseKey] = (hotAdv[baseKey] || 0) + adv;
    hotDrift[baseKey] = (hotDrift[baseKey] || 0) + drift;
  }

  CoreMemory.set(ROUTE, KEY_HOT_REGION_ADV, hotAdv);
  CoreMemory.set(ROUTE, KEY_HOT_REGION_DRIFT, hotDrift);
}

// ===========================================================================
// Wrapped Builders (v30)
// ===========================================================================
export function buildRegionGraphWithMemory(regionDescriptors, affinityRules, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const graph = buildRegionGraph(regionDescriptors, affinityRules, cosmos);

  CoreMemory.set(ROUTE, graphKey(cosmos), graph);
  return graph;
}

export function buildRegionStabilityMapWithMemory(stabilitySignals, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const stability = buildRegionStabilityMap(stabilitySignals, cosmos);

  CoreMemory.set(ROUTE, stabilityKey(cosmos), stability);

  const graph =
    CoreMemory.get(ROUTE, graphKey(cosmos)) ||
    new RegionGraph({ cosmos, nodes: [], edges: {} });

  const affinity =
    CoreMemory.get(ROUTE, affinityKey(cosmos)) ||
    { cosmos, affinities: {} };

  trackRegioningHot(graph, stability, affinity);

  return stability;
}

export function buildRegionAffinityMapWithMemory(regionGraph, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext || regionGraph.cosmos);
  const affinity = buildRegionAffinityMap(regionGraph, cosmos);

  CoreMemory.set(ROUTE, affinityKey(cosmos), affinity);

  const stability =
    CoreMemory.get(ROUTE, stabilityKey(cosmos)) ||
    { cosmos, map: {} };

  trackRegioningHot(regionGraph, stability, affinity);

  return affinity;
}

// ===========================================================================
// Accessors
// ===========================================================================
export function getLastRegionGraph(cosmosContext = {}) {
  CoreMemory.prewarm();
  return CoreMemory.get(ROUTE, graphKey(normalizeCosmosContext(cosmosContext)));
}

export function getLastRegionStabilityMap(cosmosContext = {}) {
  CoreMemory.prewarm();
  return CoreMemory.get(ROUTE, stabilityKey(normalizeCosmosContext(cosmosContext)));
}

export function getLastRegionAffinityMap(cosmosContext = {}) {
  CoreMemory.prewarm();
  return CoreMemory.get(ROUTE, affinityKey(normalizeCosmosContext(cosmosContext)));
}

export function getRegioningMemoryState() {
  CoreMemory.prewarm();
  return {
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotEdges: CoreMemory.get(ROUTE, KEY_HOT_EDGES),
    hotUniverses: CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES),
    hotTimelines: CoreMemory.get(ROUTE, KEY_HOT_TIMELINES),
    hotInstability: CoreMemory.get(ROUTE, KEY_HOT_INSTABILITY),
    hotRegionAdvantage: CoreMemory.get(ROUTE, KEY_HOT_REGION_ADV),
    hotRegionDrift: CoreMemory.get(ROUTE, KEY_HOT_REGION_DRIFT)
  };
}

// ===========================================================================
// Exported API
// ===========================================================================
const RegioningPhysicsAPI = {
  RegionDescriptor,
  RegionAffinityRules,
  RegionStabilitySignal,
  RegionGraph,

  buildRegionGraph,
  buildRegionStabilityMap,
  buildRegionAffinityMap,

  buildRegionGraphWithMemory,
  buildRegionStabilityMapWithMemory,
  buildRegionAffinityMapWithMemory,

  getLastRegionGraph,
  getLastRegionStabilityMap,
  getLastRegionAffinityMap,
  getRegioningMemoryState,

  CoreMemory,
  ROUTE,
  REGIONING_ENGINE_VERSION,
  REGIONING_SCHEMA_VERSION
};

export default RegioningPhysicsAPI;
