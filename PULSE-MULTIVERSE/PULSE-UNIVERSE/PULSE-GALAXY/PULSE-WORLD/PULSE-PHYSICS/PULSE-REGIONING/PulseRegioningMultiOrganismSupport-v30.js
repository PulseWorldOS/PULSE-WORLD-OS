/*
===============================================================================
FILE: /PULSE-UNIVERSE/MultiOrganismSupport-v30.js
LAYER: PULSE-WORLD SUBSTRATE — MULTI-ORGANISM COORDINATION v30 IMMORTAL++
DESC: Multiverse-aware, shard-aware, region-aware multi-organism deployment
      coordination with advantage surfaces, integrity envelopes, and hot-lane
      CoreMemory metrics.
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
// Imports — v30 substrate
// ---------------------------------------------------------------------------
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import SnapshotPhysicsAPI from "./PulseRegioningSnapshotPhysics-v30.js";
import DeltaEngineAPI from "./PulseRegioningDeltaEngine-v30.js";
import DeploymentPhysicsAPI from "./PulseRegioningDeploymentPhysics-v30.js";
import RegionMeshRoutingAPI from "./PulseRegioningMeshRouting-v30.js";
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
const { projectSnapshotForDelta } = SnapshotPhysicsAPI;
const { computeDelta, summarizeDelta, buildDeltaPatch } = DeltaEngineAPI;
const { buildDeploymentPlan, summarizeDeploymentPlan } = DeploymentPhysicsAPI;
const { computeRegionRoute } = RegionMeshRoutingAPI;


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root",
    shardId: context.shardId || "s:primary"
  };
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function computeInstanceAdvantage({
  deltaSummary,
  deploymentSummary,
  regionRoute,
  driftScore = null,
  trustScore = null
}) {
  let deltaScore = 0;
  let actionScore = 0;
  let routeScore = 0;
  let driftComponent = 0;
  let trustComponent = 0;

  if (deltaSummary && typeof deltaSummary.totalChanges === "number") {
    const changes = deltaSummary.totalChanges;
    if (changes === 0) deltaScore = 0;
    else if (changes === 1) deltaScore = 0.4;
    else if (changes <= 3) deltaScore = 0.7;
    else deltaScore = 1.0;
  }

  if (deploymentSummary && typeof deploymentSummary.totalActions === "number") {
    const actions = deploymentSummary.totalActions;
    if (actions === 0) actionScore = 0;
    else if (actions === 1) actionScore = 0.4;
    else if (actions <= 5) actionScore = 0.7;
    else actionScore = 1.0;
  }

  if (regionRoute && typeof regionRoute.advantage === "number") {
    routeScore = clamp01(regionRoute.advantage);
  }

  if (typeof driftScore === "number") {
    // lower drift → higher advantage
    driftComponent = clamp01(1 - driftScore);
  }

  if (typeof trustScore === "number") {
    trustComponent = clamp01(trustScore);
  }

  const base = 0.35 * deltaScore + 0.35 * actionScore + 0.2 * routeScore;
  const extras = 0.05 * driftComponent + 0.05 * trustComponent;

  return clamp01(base + extras);
}

function computeIntegrityHash(payload) {
  const json = JSON.stringify(payload || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "MULTI_ORG_INTEGRITY_" + hash.toString(16).padStart(8, "0");
}
// ============================================================================
//  InstanceContext — IMMORTAL DATA FACTORY
// ============================================================================
export const InstanceContext = ({
  instanceId,
  currentState,
  previousSnapshot = null,
  desiredSnapshot,
  cosmosRoute,
  regionRoute = null,
  continuanceDecision,
  organismId = "PulseWorldOS",
  regionGraph = null,
  regionStabilityMap = null,
  driftScore = null,
  trustScore = null
}) =>
  Object.freeze({
    instanceId,
    currentState,
    previousSnapshot,
    desiredSnapshot,

    cosmosRoute: cosmosRoute || {
      universeId: "u:default",
      timelineId: "t:main",
      branchId: "b:root",
      shardId: "s:primary"
    },

    regionRoute,
    continuanceDecision,
    organismId,

    regionGraph,
    regionStabilityMap,

    driftScore,
    trustScore
  });


// ============================================================================
//  InstancePlanBundle — IMMORTAL DATA FACTORY
// ============================================================================
export const InstancePlanBundle = ({
  instanceId,
  cosmos,
  organismId = "PulseWorldOS",
  deltaRecord = null,
  deltaSummary = null,
  deltaPatch = null,
  deploymentPlan,
  deploymentSummary,
  regionRoute = null,
  advantage = 0,
  driftScore = null,
  trustScore = null
}) => {
  const adv = clamp01(advantage);
  const drift = typeof driftScore === "number" ? clamp01(driftScore) : null;
  const trust = typeof trustScore === "number" ? clamp01(trustScore) : null;

  return Object.freeze({
    instanceId,
    cosmos,
    organismId,

    deltaRecord,
    deltaSummary,
    deltaPatch,

    deploymentPlan,
    deploymentSummary,

    regionRoute,
    advantage: adv,
    driftScore: drift,
    trustScore: trust,

    integrity: {
      hash: computeIntegrityHash({
        instanceId,
        cosmos,
        organismId,
        advantage: adv
      })
    }
  });
};


// ============================================================================
//  MultiOrganismPlan — IMMORTAL DATA FACTORY
// ============================================================================
export const MultiOrganismPlan = ({ cosmos, instances = [], advantage = 0 }) => {
  const adv = clamp01(advantage);

  return Object.freeze({
    cosmos,
    instances,
    advantage: adv,

    integrity: {
      hash: computeIntegrityHash({
        cosmos,
        instanceCount: instances.length,
        advantage: adv
      })
    }
  });
};


// ============================================================================
//  MultiOrganismSummary — IMMORTAL DATA FACTORY
// ============================================================================
export const MultiOrganismSummary = ({
  cosmos,
  totalInstances,
  totalActions,
  actionTypeCounts,
  advantage
}) => {
  const adv = clamp01(advantage);

  return Object.freeze({
    cosmos,
    totalInstances,
    totalActions,
    actionTypeCounts,
    advantage: adv,

    integrity: {
      hash: computeIntegrityHash({
        cosmos,
        totalInstances,
        totalActions,
        advantage: adv
      })
    }
  });
};


// ============================================================================
//  MultiOrganismPlanEnvelope — IMMORTAL DATA FACTORY
// ============================================================================
export const MultiOrganismPlanEnvelope = ({
  cosmos,
  plan,
  summary,
  integrity
}) =>
  Object.freeze({
    cosmos,
    plan,
    summary,
    integrity
  });

// ---------------------------------------------------------------------------
// Core Logic (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

export function buildInstancePlanBundle(instanceContext) {
  CoreMemory.prewarm();

  const {
    instanceId,
    currentState,
    previousSnapshot,
    desiredSnapshot,
    cosmosRoute,
    regionRoute,
    continuanceDecision,
    organismId,
    regionGraph,
    regionStabilityMap,
    driftScore,
    trustScore
  } = instanceContext;

  const cosmos = normalizeCosmosContext(cosmosRoute);

  let deltaRecord = null;
  let deltaSummary = null;
  let deltaPatch = null;

  if (previousSnapshot && desiredSnapshot) {
    const beforeProjected = projectSnapshotForDelta(previousSnapshot);
    const afterProjected = projectSnapshotForDelta(desiredSnapshot);

    const beforeSnapshot = {
      header: previousSnapshot.header,
      state: beforeProjected.state
    };

    const afterSnapshot = {
      header: desiredSnapshot.header,
      state: afterProjected.state
    };

    deltaRecord = computeDelta(beforeSnapshot, afterSnapshot, cosmos);
    deltaSummary = summarizeDelta(deltaRecord);
    deltaPatch = buildDeltaPatch(deltaRecord);
  }

  let effectiveRegionRoute = regionRoute || null;

  if (
    !effectiveRegionRoute &&
    currentState.currentRegionId &&
    continuanceDecision.targetRegionId &&
    regionGraph &&
    regionStabilityMap
  ) {
    effectiveRegionRoute = computeRegionRoute(
      regionGraph,
      regionStabilityMap,
      currentState.currentRegionId,
      continuanceDecision.targetRegionId,
      cosmos
    );
  }

  const deploymentPlan = buildDeploymentPlan({
    currentState,
    deltaPatch: deltaPatch || { patch: {} },
    cosmosRoute: cosmos,
    regionRoute: effectiveRegionRoute,
    continuanceDecision
  });

  const deploymentSummary = summarizeDeploymentPlan(deploymentPlan);

  const advantage = computeInstanceAdvantage({
    deltaSummary,
    deploymentSummary,
    regionRoute: effectiveRegionRoute,
    driftScore,
    trustScore
  });

  const bundle = new InstancePlanBundle({
    instanceId,
    cosmos,
    organismId,
    deltaRecord,
    deltaSummary,
    deltaPatch,
    deploymentPlan,
    deploymentSummary,
    regionRoute: effectiveRegionRoute,
    advantage,
    driftScore,
    trustScore
  });

  const key = [
    "instance-plan",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId,
    instanceId
  ].join("|");

  CoreMemory.set("multi-organism-support-v30", key, bundle);

  // hot metrics
  trackInstanceHot(bundle);

  return bundle;
}

export function buildMultiOrganismPlan(instanceContexts = [], cosmosContext = {}) {
  CoreMemory.prewarm();

  const cosmos = normalizeCosmosContext(cosmosContext);

  const bundles = instanceContexts.map((ctx) => buildInstancePlanBundle(ctx));

  let totalAdvantage = 0;
  for (const b of bundles) {
    totalAdvantage += b.advantage || 0;
  }

  const avgAdvantage =
    bundles.length > 0 ? clamp01(totalAdvantage / bundles.length) : 0;

  const plan = new MultiOrganismPlan({
    cosmos,
    instances: bundles,
    advantage: avgAdvantage
  });

  const key = [
    "multi-plan",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId
  ].join("|");

  CoreMemory.set("multi-organism-support-v30", key, plan);

  trackPlanHot(plan);

  return plan;
}

export function summarizeMultiOrganismPlan(multiPlan) {
  const cosmos = multiPlan.cosmos;

  const totalInstances = multiPlan.instances.length;
  let totalActions = 0;
  const actionTypeCounts = {};
  let totalAdvantage = 0;

  for (const bundle of multiPlan.instances) {
    const plan = bundle.deploymentPlan;
    totalActions += plan.actions.length;

    for (const action of plan.actions) {
      actionTypeCounts[action.type] =
        (actionTypeCounts[action.type] || 0) + 1;
    }

    totalAdvantage += bundle.advantage || 0;
  }

  const avgAdvantage =
    totalInstances > 0 ? clamp01(totalAdvantage / totalInstances) : 0;

  return new MultiOrganismSummary({
    cosmos,
    totalInstances,
    totalActions,
    actionTypeCounts,
    advantage: avgAdvantage
  });
}

// ---------------------------------------------------------------------------
// Envelope Builder (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

export function buildMultiOrganismPlanEnvelope(multiPlan) {
  const summary = summarizeMultiOrganismPlan(multiPlan);

  const basePayload = {
    cosmos: multiPlan.cosmos,
    plan: multiPlan,
    summary
  };

  const integrity = {
    hash: computeIntegrityHash(basePayload)
  };

  const envelope = new MultiOrganismPlanEnvelope({
    cosmos: multiPlan.cosmos,
    plan: multiPlan,
    summary,
    integrity
  });

  const cosmos = multiPlan.cosmos || {};
  const key = [
    "multi-envelope",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId
  ].join("|");

  CoreMemory.set("multi-organism-support-v30", key, envelope);

  return envelope;
}

// ---------------------------------------------------------------------------
// Hot-lane metrics (v30)
// ---------------------------------------------------------------------------

const ROUTE = "multi-organism-support-v30";

const KEY_HOT_INSTANCES = "hot-instances";
const KEY_HOT_ORGANISMS = "hot-organisms";
const KEY_HOT_UNIVERSES = "hot-universes";
const KEY_HOT_TIMELINES = "hot-timelines";
const KEY_HOT_SHARDS = "hot-shards";
const KEY_HOT_ACTION_TYPES = "hot-action-types";
const KEY_HOT_ADVANTAGE = "hot-advantage";

function trackInstanceHot(bundle) {
  const cosmos = bundle.cosmos || {};
  const instanceId = bundle.instanceId;
  if (!instanceId) return;

  const instKey = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.shardId}|${instanceId}`;

  const hotInstances = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  hotInstances[instKey] = (hotInstances[instKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hotInstances);

  const hotUniverses = CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES) || {};
  hotUniverses[cosmos.universeId] = (hotUniverses[cosmos.universeId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_UNIVERSES, hotUniverses);

  const hotTimelines = CoreMemory.get(ROUTE, KEY_HOT_TIMELINES) || {};
  const tlKey = `${cosmos.universeId}|${cosmos.timelineId}`;
  hotTimelines[tlKey] = (hotTimelines[tlKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_TIMELINES, hotTimelines);

  const hotShards = CoreMemory.get(ROUTE, KEY_HOT_SHARDS) || {};
  const sKey = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.shardId}`;
  hotShards[sKey] = (hotShards[sKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_SHARDS, hotShards);

  if (bundle.organismId) {
    const hotOrganisms = CoreMemory.get(ROUTE, KEY_HOT_ORGANISMS) || {};
    hotOrganisms[bundle.organismId] =
      (hotOrganisms[bundle.organismId] || 0) + 1;
    CoreMemory.set(ROUTE, KEY_HOT_ORGANISMS, hotOrganisms);
  }

  const hotAdvantage = CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE) || {};
  hotAdvantage[instKey] =
    (hotAdvantage[instKey] || 0) + (bundle.advantage || 0);
  CoreMemory.set(ROUTE, KEY_HOT_ADVANTAGE, hotAdvantage);

  const hotActionTypes = CoreMemory.get(ROUTE, KEY_HOT_ACTION_TYPES) || {};
  for (const action of bundle.deploymentPlan.actions || []) {
    const t = action.type;
    if (!t) continue;
    hotActionTypes[t] = (hotActionTypes[t] || 0) + 1;
  }
  CoreMemory.set(ROUTE, KEY_HOT_ACTION_TYPES, hotActionTypes);
}

function trackPlanHot(plan) {
  // currently per-instance tracking already done; this is a placeholder
  // for future aggregate hot metrics if needed.
  void plan;
}

// ---------------------------------------------------------------------------
// CoreMemory Accessors
// ---------------------------------------------------------------------------

export function getLastInstancePlan(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);

  const key = [
    "instance-plan",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId,
    instanceId
  ].join("|");

  return CoreMemory.get("multi-organism-support-v30", key);
}

export function getLastMultiOrganismPlan(cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);

  const key = [
    "multi-plan",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId
  ].join("|");

  return CoreMemory.get("multi-organism-support-v30", key);
}

export function getLastMultiOrganismEnvelope(cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);

  const key = [
    "multi-envelope",
    cosmos.universeId,
    cosmos.timelineId,
    cosmos.branchId,
    cosmos.shardId
  ].join("|");

  return CoreMemory.get("multi-organism-support-v30", key);
}

export function getMultiOrganismMemoryState() {
  CoreMemory.prewarm();
  return {
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotOrganisms: CoreMemory.get(ROUTE, KEY_HOT_ORGANISMS),
    hotUniverses: CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES),
    hotTimelines: CoreMemory.get(ROUTE, KEY_HOT_TIMELINES),
    hotShards: CoreMemory.get(ROUTE, KEY_HOT_SHARDS),
    hotActionTypes: CoreMemory.get(ROUTE, KEY_HOT_ACTION_TYPES),
    hotAdvantage: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE)
  };
}

// ---------------------------------------------------------------------------
// Exported API
// ---------------------------------------------------------------------------

const MultiOrganismSupportAPI = {
  InstanceContext,
  InstancePlanBundle,
  MultiOrganismPlan,
  MultiOrganismSummary,
  MultiOrganismPlanEnvelope,

  buildInstancePlanBundle,
  buildMultiOrganismPlan,
  summarizeMultiOrganismPlan,
  buildMultiOrganismPlanEnvelope,

  getLastInstancePlan,
  getLastMultiOrganismPlan,
  getLastMultiOrganismEnvelope,
  getMultiOrganismMemoryState,

  CoreMemory,
  ROUTE
};

export default MultiOrganismSupportAPI;
