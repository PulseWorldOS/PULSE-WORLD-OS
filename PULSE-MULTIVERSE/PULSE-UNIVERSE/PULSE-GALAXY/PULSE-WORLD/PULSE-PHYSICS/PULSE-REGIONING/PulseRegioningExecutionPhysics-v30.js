/*
===============================================================================
FILE: /PULSE-UNIVERSE/ExecutionPhysics-v30.js
LAYER: PULSE-WORLD SUBSTRATE — SYMBOLIC EXECUTION PHYSICS v30 IMMORTAL++
DESC: Multiverse-aware, region-aware, organism-aware execution physics with
      binary integrity, normalized advantage, shard-aware cosmos, and hot-lane
      metrics across instances, organisms, universes, timelines, and regions.
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
// Local substrate types (no external imports)
// ---------------------------------------------------------------------------

// Mirror of DeploymentActionType from DeploymentPhysics-v30 (symbolic only)
export const DeploymentActionType = Object.freeze({
  APPLY_DELTA: "APPLY_DELTA",
  MOVE_UNIVERSE: "MOVE_UNIVERSE",
  MOVE_TIMELINE: "MOVE_TIMELINE",
  MOVE_BRANCH: "MOVE_BRANCH",
  MOVE_REGION: "MOVE_REGION",
  MOVE_HOST: "MOVE_HOST",
  RESTART_INSTANCE: "RESTART_INSTANCE",
  SPAWN_INSTANCE: "SPAWN_INSTANCE",
  RETIRE_INSTANCE: "RETIRE_INSTANCE",
  NO_OP: "NO_OP"
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
  shardId = "s:primary",
  organismId = "PulseWorldOS"
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
    shardId,
    organismId
  });


// ============================================================================
//  MultiOrganismPlan — IMMORTAL DATA FACTORY
// ============================================================================
export const MultiOrganismPlan = ({ cosmos, instances = [] }) =>
  Object.freeze({
    cosmos,
    instances
  });


// ============================================================================
//  ExecutionLogEntry — IMMORTAL DATA FACTORY
// ============================================================================
export const ExecutionLogEntry = ({
  instanceId,
  actionType,
  cosmos,
  region,
  organismId = "PulseWorldOS",
  details = {}
}) =>
  Object.freeze({
    instanceId,
    actionType,
    cosmos,      // { universeId, timelineId, branchId, shardId }
    region,      // { regionId }
    organismId,
    details
  });


// ============================================================================
//  ExecutionResult — IMMORTAL DATA FACTORY
// ============================================================================
export const ExecutionResult = ({
  instanceId,
  cosmos,
  region,
  organismId = "PulseWorldOS",
  newState,
  logs = [],
  advantage = 0
}) =>
  Object.freeze({
    instanceId,
    cosmos,
    region,
    organismId,
    newState,
    logs,
    advantage: clamp01(advantage)
  });


// ============================================================================
//  ExecutionEnvelope — IMMORTAL DATA FACTORY
// ============================================================================
export const ExecutionEnvelope = ({
  role,
  instanceId,
  cosmos,
  region,
  organismId = "PulseWorldOS",
  result,
  advantage,
  integrity
}) =>
  Object.freeze({
    role,
    instanceId,
    cosmos,
    region,
    organismId,
    result,
    advantage: clamp01(advantage),
    integrity
  });

// -------------------------
// Helpers
// -------------------------

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function normalizeCosmosContext(context = {}) {
  return {
    universeId: context.universeId || "u:default",
    timelineId: context.timelineId || "t:main",
    branchId: context.branchId || "b:root",
    shardId: context.shardId || "s:primary"
  };
}

function normalizeRegionContext(region = {}) {
  return {
    regionId: region.regionId || "r:global"
  };
}

// v30: normalized advantage in [0,1] based on action density
function computeAdvantageFromLogs(logs = []) {
  const n = Array.isArray(logs) ? logs.length : 0;
  if (n === 0) return 0;
  if (n === 1) return 0.25;
  if (n <= 3) return 0.5;
  if (n <= 7) return 0.75;
  return 1.0;
}

function computeBinaryIntegrityHash(payload) {
  const json = JSON.stringify(payload || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "EXECUTION_BIN_" + hash.toString(16).padStart(8, "0");
}

// ---------------------------------------------------------------------------
// Core Execution Logic (v30 Multiverse + Region + Shard)
// ---------------------------------------------------------------------------

export function applyDeploymentActionToState(currentState, action, cosmos, region) {
  const base = new CurrentInstanceState({
    instanceId: currentState.instanceId,
    active: currentState.active,
    currentRegionId: currentState.currentRegionId,
    currentHostName: currentState.currentHostName,
    mergedInto: currentState.mergedInto,

    universeId: currentState.universeId || "u:default",
    timelineId: currentState.timelineId || "t:main",
    branchId: currentState.branchId || "b:root",
    shardId: currentState.shardId || "s:primary",

    organismId: currentState.organismId || "PulseWorldOS"
  });

  switch (action.type) {
    case DeploymentActionType.MOVE_UNIVERSE:
      base.universeId = action.universeId;
      return base;

    case DeploymentActionType.MOVE_TIMELINE:
      base.timelineId = action.timelineId;
      return base;

    case DeploymentActionType.MOVE_BRANCH:
      base.branchId = action.branchId;
      return base;

    case DeploymentActionType.MOVE_REGION:
      base.currentRegionId = action.regionId;
      return base;

    case DeploymentActionType.MOVE_HOST:
      base.currentHostName = action.hostName;
      return base;

    case DeploymentActionType.RESTART_INSTANCE:
      return base;

    case DeploymentActionType.SPAWN_INSTANCE:
      return base;

    case DeploymentActionType.RETIRE_INSTANCE:
      base.active = false;
      return base;

    case DeploymentActionType.APPLY_DELTA:
      // Symbolic only: delta already applied at SnapshotPhysics layer.
      return base;

    case DeploymentActionType.NO_OP:
    default:
      return base;
  }
}

export function executeDeploymentPlan(plan, currentState, organismContext = {}) {
  const cosmos = normalizeCosmosContext(plan.cosmos || {});
  const region = normalizeRegionContext(plan.region || {});
  const organismId =
    organismContext.organismId ||
    plan.organismId ||
    currentState.organismId ||
    null;

  let state = currentState;
  const logs = [];

  for (const action of plan.actions) {
    const newState = applyDeploymentActionToState(state, action, cosmos, region);

    logs.push(
      new ExecutionLogEntry({
        instanceId: state.instanceId,
        actionType: action.type,
        cosmos,
        region,
        organismId,
        details: {
          universeId: action.universeId ?? null,
          timelineId: action.timelineId ?? null,
          branchId: action.branchId ?? null,
          regionId: action.regionId ?? null,
          hostName: action.hostName ?? null,
          meta: action.meta ?? null
        }
      })
    );

    state = newState;
  }

  const advantage = computeAdvantageFromLogs(logs);

  return new ExecutionResult({
    instanceId: state.instanceId,
    cosmos,
    region,
    organismId,
    newState: state,
    logs,
    advantage
  });
}

// -------------------------
// Multi-Organism Execution (v30 Multiverse + Region + Shard)
// -------------------------

export function executeMultiOrganismPlan(
  multiPlan,
  currentStatesById,
  organismContextById = {}
) {
  if (!(multiPlan instanceof MultiOrganismPlan)) {
    throw new Error("executeMultiOrganismPlan: expected MultiOrganismPlan");
  }

  const cosmos = normalizeCosmosContext(multiPlan.cosmos || {});
  const results = {};

  for (const bundle of multiPlan.instances) {
    const instanceId = bundle.instanceId;
    const currentState = currentStatesById[instanceId];

    if (!currentState) continue;

    const organismContext = organismContextById[instanceId] || {};
    const execResult = executeDeploymentPlan(
      bundle.deploymentPlan,
      currentState,
      organismContext
    );

    // Force cosmos normalization on result for consistency
    execResult.cosmos = cosmos;
    results[instanceId] = execResult;
  }

  return results;
}

// -------------------------
// Execution Envelope (v30 IMMORTAL++)
// -------------------------

export function buildExecutionEnvelope(executionResult) {
  const advantage = clamp01(
    executionResult.advantage ?? computeAdvantageFromLogs(executionResult.logs)
  );

  const basePayload = {
    role: "PulseWorld.ExecutionPhysics.v30",
    instanceId: executionResult.instanceId,
    cosmos: executionResult.cosmos,
    region: executionResult.region,
    organismId: executionResult.organismId,
    result: executionResult,
    advantage
  };

  const integrity = {
    hash: computeBinaryIntegrityHash(basePayload)
  };

  return new ExecutionEnvelope({
    ...basePayload,
    integrity
  });
}

// ---------------------------------------------------------------------------
// CoreMemory + Multiverse Execution Caching (v30 IMMORTAL++)
// ---------------------------------------------------------------------------

const ROUTE = "execution-physics-v30";

const KEY_RESULT_PREFIX   = "result:";
const KEY_ENVELOPE_PREFIX = "envelope:";

const KEY_HOT_ACTION_TYPES = "hot-action-types";
const KEY_HOT_INSTANCES    = "hot-instances";
const KEY_HOT_ORGANISMS    = "hot-organisms";
const KEY_HOT_UNIVERSES    = "hot-universes";
const KEY_HOT_TIMELINES    = "hot-timelines";
const KEY_HOT_REGIONS      = "hot-regions";
const KEY_HOT_ADVANTAGE    = "hot-advantage";

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

function resultKey(instanceId, cosmos) {
  return cosmosKey(KEY_RESULT_PREFIX, instanceId, cosmos);
}

function envelopeKey(instanceId, cosmos) {
  return cosmosKey(KEY_ENVELOPE_PREFIX, instanceId, cosmos);
}

function trackExecutionHot(instanceId, cosmos, region, organismId, logs = [], advantage = 0) {
  if (!instanceId) return;

  const actionTypes = {};
  for (const log of logs) {
    const t = log.actionType;
    if (!t) continue;
    actionTypes[t] = (actionTypes[t] || 0) + 1;
  }

  const hotActionTypes = CoreMemory.get(ROUTE, KEY_HOT_ACTION_TYPES) || {};
  for (const [t, count] of Object.entries(actionTypes)) {
    hotActionTypes[t] = (hotActionTypes[t] || 0) + count;
  }
  CoreMemory.set(ROUTE, KEY_HOT_ACTION_TYPES, hotActionTypes);

  const hotInstances = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  const instKey = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.shardId}|${instanceId}`;
  hotInstances[instKey] = (hotInstances[instKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hotInstances);

  if (organismId) {
    const hotOrganisms = CoreMemory.get(ROUTE, KEY_HOT_ORGANISMS) || {};
    hotOrganisms[organismId] = (hotOrganisms[organismId] || 0) + 1;
    CoreMemory.set(ROUTE, KEY_HOT_ORGANISMS, hotOrganisms);
  }

  const hotUniverses = CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES) || {};
  hotUniverses[cosmos.universeId] = (hotUniverses[cosmos.universeId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_UNIVERSES, hotUniverses);

  const hotTimelines = CoreMemory.get(ROUTE, KEY_HOT_TIMELINES) || {};
  const tlKey = `${cosmos.universeId}|${cosmos.timelineId}`;
  hotTimelines[tlKey] = (hotTimelines[tlKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_TIMELINES, hotTimelines);

  const hotRegions = CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {};
  const regionId = region && region.regionId ? region.regionId : "r:global";
  const rKey = `${cosmos.universeId}|${cosmos.timelineId}|${regionId}`;
  hotRegions[rKey] = (hotRegions[rKey] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, hotRegions);

  const hotAdvantage = CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE) || {};
  hotAdvantage[instKey] = (hotAdvantage[instKey] || 0) + clamp01(advantage);
  CoreMemory.set(ROUTE, KEY_HOT_ADVANTAGE, hotAdvantage);
}

// Wrapped execution with CoreMemory

export function executeDeploymentPlanWithMemory(plan, currentState, organismContext = {}) {
  CoreMemory.prewarm();

  const execResult = executeDeploymentPlan(plan, currentState, organismContext);
  const envelope = buildExecutionEnvelope(execResult);

  const cosmos = normalizeCosmosContext(execResult.cosmos || {});
  const keyResult = resultKey(execResult.instanceId, cosmos);
  const keyEnvelope = envelopeKey(execResult.instanceId, cosmos);

  CoreMemory.set(ROUTE, keyResult, execResult);
  CoreMemory.set(ROUTE, keyEnvelope, envelope);

  trackExecutionHot(
    execResult.instanceId,
    cosmos,
    execResult.region,
    execResult.organismId,
    execResult.logs,
    execResult.advantage
  );

  return { result: execResult, envelope };
}

export function executeMultiOrganismPlanWithMemory(
  multiPlan,
  currentStatesById,
  organismContextById = {}
) {
  CoreMemory.prewarm();

  const results = executeMultiOrganismPlan(
    multiPlan,
    currentStatesById,
    organismContextById
  );

  for (const [instanceId, execResult] of Object.entries(results)) {
    const envelope = buildExecutionEnvelope(execResult);
    const cosmos = normalizeCosmosContext(execResult.cosmos || {});
    const keyResult = resultKey(instanceId, cosmos);
    const keyEnvelope = envelopeKey(instanceId, cosmos);

    CoreMemory.set(ROUTE, keyResult, execResult);
    CoreMemory.set(ROUTE, keyEnvelope, envelope);

    trackExecutionHot(
      instanceId,
      cosmos,
      execResult.region,
      execResult.organismId,
      execResult.logs,
      execResult.advantage
    );
  }

  return results;
}

// -------------------------
// CoreMemory Accessors
// -------------------------

export function getLastExecutionResult(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, resultKey(instanceId, cosmos));
}

export function getLastExecutionEnvelope(instanceId, cosmosContext = {}) {
  CoreMemory.prewarm();
  const cosmos = normalizeCosmosContext(cosmosContext);
  return CoreMemory.get(ROUTE, envelopeKey(instanceId, cosmos));
}

export function getExecutionMemoryState() {
  CoreMemory.prewarm();

  return {
    hotActionTypes: CoreMemory.get(ROUTE, KEY_HOT_ACTION_TYPES),
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotOrganisms: CoreMemory.get(ROUTE, KEY_HOT_ORGANISMS),
    hotUniverses: CoreMemory.get(ROUTE, KEY_HOT_UNIVERSES),
    hotTimelines: CoreMemory.get(ROUTE, KEY_HOT_TIMELINES),
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotAdvantage: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE)
  };
}

// -------------------------
// Exported API
// -------------------------

const ExecutionPhysicsAPI = {
  DeploymentActionType,
  CurrentInstanceState,
  MultiOrganismPlan,

  ExecutionLogEntry,
  ExecutionResult,
  ExecutionEnvelope,

  applyDeploymentActionToState,
  executeDeploymentPlan,
  executeMultiOrganismPlan,
  buildExecutionEnvelope,

  executeDeploymentPlanWithMemory,
  executeMultiOrganismPlanWithMemory,

  getLastExecutionResult,
  getLastExecutionEnvelope,
  getExecutionMemoryState,

  CoreMemory,
  ROUTE
};

export default ExecutionPhysicsAPI;
