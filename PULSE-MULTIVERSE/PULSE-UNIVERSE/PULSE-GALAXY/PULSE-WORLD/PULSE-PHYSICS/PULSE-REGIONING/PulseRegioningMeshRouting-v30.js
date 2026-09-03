/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseRegionMeshRouting-v30-ImmortalPlus.js
LAYER: PULSE-WORLD SUBSTRATE — SYMBOLIC REGION MESH ROUTING v30-IMMORTAL++
DESC: Multiverse-aware, binary-signatured, advantage-scored region routing +
      placement engine with CoreMemory hot surfaces + integrity envelopes.
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
// Imports — Regioning + CoreMemory bridge
// ---------------------------------------------------------------------------

import RegioningPhysicsAPI from "./PulseRegioningPhysics-v30.js";
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
const {
  RegionDescriptor,
  RegionAffinityRules,
  RegionStabilitySignal,
  RegionGraph
} = RegioningPhysicsAPI;


// ---------------------------------------------------------------------------
// Version + Routing Constants (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

export const REGION_MESH_ENGINE_VERSION = "v30-ImmortalPlus";
export const REGION_MESH_SCHEMA_VERSION = "v3";

const ROUTE_NAMESPACE = "region-mesh-routing-v30";

const KEY_ROUTE_PREFIX     = "route";
const KEY_RANK_PREFIX      = "rank";
const KEY_HOT_REGIONS      = "hot-regions";
const KEY_HOT_EDGES        = "hot-edges";
const KEY_HOT_SOURCES      = "hot-sources";
const KEY_HOT_TARGETS      = "hot-targets";
const KEY_HOT_ADVANTAGE    = "hot-advantage";
const KEY_HOT_INTEGRITY    = "hot-integrity";

// ---------------------------------------------------------------------------
// Cosmos Context
// ---------------------------------------------------------------------------

function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root"
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
// ============================================================================
//  RegionRoute — IMMORTAL DATA FACTORY
// ============================================================================
export const RegionRoute = ({
  cosmos,
  path = [],
  totalCost = 0,
  advantage = 0,
  hops = 0,
  binarySignature = null
}) =>
  Object.freeze({
    cosmos,
    path,
    totalCost: clamp01(totalCost),
    advantage: clamp01(advantage),
    hops,
    binarySignature,
    schemaVersion: REGION_MESH_SCHEMA_VERSION,
    engineVersion: REGION_MESH_ENGINE_VERSION
  });


// ============================================================================
//  RankedRegionCandidate — IMMORTAL DATA FACTORY
// ============================================================================
export const RankedRegionCandidate = ({
  cosmos,
  regionId,
  score,
  cost,
  hops,
  binarySignature = null
}) =>
  Object.freeze({
    cosmos,
    regionId,
    score: clamp01(score),
    cost: clamp01(cost),
    hops,
    binarySignature,
    schemaVersion: REGION_MESH_SCHEMA_VERSION,
    engineVersion: REGION_MESH_ENGINE_VERSION
  });


// ============================================================================
//  RegionRouteEnvelope — IMMORTAL DATA FACTORY
// ============================================================================
export const RegionRouteEnvelope = ({
  schemaVersion = REGION_MESH_SCHEMA_VERSION,
  engineVersion = REGION_MESH_ENGINE_VERSION,
  cosmos,
  sourceRegionId,
  targetRegionId,
  route,
  candidates,
  integrity,
  diagnostics
}) =>
  Object.freeze({
    schemaVersion,
    engineVersion,
    cosmos,
    sourceRegionId,
    targetRegionId,
    route,
    candidates,
    integrity,
    diagnostics: diagnostics || null
  });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function computeEdgeCost(affinity, stability) {
  const a = clamp01(affinity);
  const s = clamp01(stability);
  // v30: slightly favor stability more for long-lived regioning
  return clamp01(a * 0.6 + s * 0.4);
}

function computeRouteAdvantage(path, totalCost) {
  if (!Array.isArray(path) || path.length === 0) return 0;
  const hops = path.length - 1;
  const hopScore = hops === 0 ? 1 : clamp01(1 / (1 + hops));
  const costScore = clamp01(1 - totalCost);
  // v30: bias a bit more toward cost (global efficiency)
  return clamp01(0.7 * costScore + 0.3 * hopScore);
}

function computeIntegrityHash(payload) {
  const json = JSON.stringify(payload || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "REGION_MESH_INTEGRITY_" + hash.toString(16).padStart(8, "0");
}

function computeBinarySignature(seedParts = []) {
  const seed = String(seedParts.join("|"));
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return "REGION_MESH_BIN_" + hash.toString(16).padStart(8, "0");
}

function dijkstra(graph, stabilityMap, source, target) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || {};

  const dist = {};
  const prev = {};
  const visited = new Set();

  for (const n of nodes) {
    dist[n] = n === source ? 0 : Infinity;
    prev[n] = null;
  }

  while (visited.size < nodes.length) {
    let current = null;
    let best = Infinity;

    for (const n of nodes) {
      if (visited.has(n)) continue;
      if (dist[n] < best || (dist[n] === best && (current === null || n < current))) {
        current = n;
        best = dist[n];
      }
    }

    if (current === null || best === Infinity) break;
    if (current === target) break;

    visited.add(current);

    const neighbors = edges[current] || {};
    for (const [neighbor, affinity] of Object.entries(neighbors)) {
      if (visited.has(neighbor)) continue;

      const stability = stabilityMap.map[neighbor] ?? 0;
      const edgeCost = computeEdgeCost(affinity, stability);
      const alt = dist[current] + edgeCost;

      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;
        prev[neighbor] = current;
      }
    }
  }

  const path = [];
  let u = target;

  while (u !== null) {
    path.unshift(u);
    u = prev[u];
  }

  if (path[0] !== source) {
    return { path: [], cost: 1, hops: 0 };
  }

  const rawCost = dist[target];
  const maxHops = Math.max(nodes.length - 1, 1);
  const normalizedCost = clamp01(rawCost / maxHops);
  const hops = Math.max(path.length - 1, 0);

  return { path, cost: normalizedCost, hops };
}

// ---------------------------------------------------------------------------
// Core Routing Logic (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

function buildRouteKey(kind, cosmos, sourceRegionId, targetRegionId = null) {
  const base = [
    kind,
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    sourceRegionId
  ];
  if (targetRegionId != null) base.push(targetRegionId);
  return base.join("|");
}

function trackRouteHot(cosmos, route, sourceRegionId, targetRegionId) {
  try {
    const ns = ROUTE_NAMESPACE;

    const hotRegions = CoreMemory.get(ns, KEY_HOT_REGIONS) || {};
    for (const r of route.path || []) {
      hotRegions[r] = (hotRegions[r] || 0) + 1;
    }
    CoreMemory.set(ns, KEY_HOT_REGIONS, hotRegions);

    const hotSources = CoreMemory.get(ns, KEY_HOT_SOURCES) || {};
    const sKey = `${cosmos.universeId}|${cosmos.timelineId}|${sourceRegionId}`;
    hotSources[sKey] = (hotSources[sKey] || 0) + 1;
    CoreMemory.set(ns, KEY_HOT_SOURCES, hotSources);

    const hotTargets = CoreMemory.get(ns, KEY_HOT_TARGETS) || {};
    const tKey = `${cosmos.universeId}|${cosmos.timelineId}|${targetRegionId}`;
    hotTargets[tKey] = (hotTargets[tKey] || 0) + 1;
    CoreMemory.set(ns, KEY_HOT_TARGETS, hotTargets);

    const hotAdvantage = CoreMemory.get(ns, KEY_HOT_ADVANTAGE) || {};
    const aKey = `${cosmos.universeId}|${cosmos.timelineId}`;
    hotAdvantage[aKey] = (hotAdvantage[aKey] || 0) + route.advantage;
    CoreMemory.set(ns, KEY_HOT_ADVANTAGE, hotAdvantage);
  } catch {
    // never throw
  }
}

function trackIntegrityHot(cosmos, integrity) {
  try {
    const ns = ROUTE_NAMESPACE;
    const hotIntegrity = CoreMemory.get(ns, KEY_HOT_INTEGRITY) || {};
    const key = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}`;
    hotIntegrity[key] = (hotIntegrity[key] || 0) + 1;
    CoreMemory.set(ns, KEY_HOT_INTEGRITY, hotIntegrity);
  } catch {
    // never throw
  }
}

export function computeRegionRoute(
  regionGraph,
  stabilityMap,
  sourceRegionId,
  targetRegionId,
  cosmosContext = {}
) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);

  const { path, cost, hops } = dijkstra(
    regionGraph,
    stabilityMap,
    sourceRegionId,
    targetRegionId
  );

  const advantage = computeRouteAdvantage(path, cost);
  const binarySignature = computeBinarySignature([
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    sourceRegionId,
    targetRegionId,
    path.join(">")
  ]);

  const route = new RegionRoute({
    cosmos,
    path,
    totalCost: cost,
    advantage,
    hops,
    binarySignature
  });

  const key = buildRouteKey(
    KEY_ROUTE_PREFIX,
    cosmos,
    sourceRegionId,
    targetRegionId
  );

  CoreMemory.set(ROUTE_NAMESPACE, key, route);
  trackRouteHot(cosmos, route, sourceRegionId, targetRegionId);

  return route;
}

export function rankRegionsForPlacement(
  regionGraph,
  stabilityMap,
  sourceRegionId,
  cosmosContext = {}
) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const candidates = [];

  for (const regionId of regionGraph.nodes) {
    if (regionId === sourceRegionId) continue;

    const { cost, hops } = dijkstra(
      regionGraph,
      stabilityMap,
      sourceRegionId,
      regionId
    );

    const score = clamp01(1 - cost);
    const binarySignature = computeBinarySignature([
      cosmos.universeId,
      cosmos.timelineId,
      cosmos.branchId,
      sourceRegionId,
      regionId,
      "rank"
    ]);

    candidates.push(
      new RankedRegionCandidate({
        cosmos,
        regionId,
        score,
        cost,
        hops,
        binarySignature
      })
    );
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.hops !== b.hops) return a.hops - b.hops;
    return a.regionId.localeCompare(b.regionId);
  });

  const key = buildRouteKey(
    KEY_RANK_PREFIX,
    cosmos,
    sourceRegionId,
    null
  );

  CoreMemory.set(ROUTE_NAMESPACE, key, candidates);

  return candidates;
}

// ---------------------------------------------------------------------------
// Envelope Builder (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

export function buildRegionRouteEnvelope({
  regionGraph,
  stabilityMap,
  sourceRegionId,
  targetRegionId,
  cosmosContext = {}
}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);

  const route = computeRegionRoute(
    regionGraph,
    stabilityMap,
    sourceRegionId,
    targetRegionId,
    cosmos
  );

  const candidates = rankRegionsForPlacement(
    regionGraph,
    stabilityMap,
    sourceRegionId,
    cosmos
  );

  const diagnostics = {
    nodeCount: regionGraph.nodes.length || 0,
    edgeCount: Object.keys(regionGraph.edges || {}).length,
    stabilitySchemaVersion: stabilityMap.schemaVersion || null,
    bestCandidate: candidates[0] || null
  };

  const basePayload = {
    schemaVersion: REGION_MESH_SCHEMA_VERSION,
    engineVersion: REGION_MESH_ENGINE_VERSION,
    cosmos,
    sourceRegionId,
    targetRegionId,
    route,
    candidates,
    diagnostics
  };

  const integrity = {
    hash: computeIntegrityHash(basePayload),
    schemaVersion: REGION_MESH_SCHEMA_VERSION
  };

  trackIntegrityHot(cosmos, integrity);

  return new RegionRouteEnvelope({
    ...basePayload,
    integrity
  });
}

// ---------------------------------------------------------------------------
// CoreMemory Accessors
// ---------------------------------------------------------------------------

export function getLastRoute(
  sourceRegionId,
  targetRegionId,
  cosmosContext = {}
) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const key = buildRouteKey(
    KEY_ROUTE_PREFIX,
    cosmos,
    sourceRegionId,
    targetRegionId
  );

  return CoreMemory.get(ROUTE_NAMESPACE, key);
}

export function getLastRankings(sourceRegionId, cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);
  const key = buildRouteKey(
    KEY_RANK_PREFIX,
    cosmos,
    sourceRegionId,
    null
  );

  return CoreMemory.get(ROUTE_NAMESPACE, key);
}

export function getRegionMeshMemoryState() {
  CoreMemory.prewarm();
  return CoreMemory.getNamespace(ROUTE_NAMESPACE);
}

// ---------------------------------------------------------------------------
// Exported API
// ---------------------------------------------------------------------------

const RegionMeshRoutingAPI = {
  RegionDescriptor,
  RegionAffinityRules,
  RegionStabilitySignal,
  RegionGraph,

  RegionRoute,
  RankedRegionCandidate,
  RegionRouteEnvelope,

  computeRegionRoute,
  rankRegionsForPlacement,
  buildRegionRouteEnvelope,

  getLastRoute,
  getLastRankings,
  getRegionMeshMemoryState,

  CoreMemory,
  REGION_MESH_ENGINE_VERSION,
  REGION_MESH_SCHEMA_VERSION
};

export default RegionMeshRoutingAPI;
