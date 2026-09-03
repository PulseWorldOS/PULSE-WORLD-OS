// ============================================================================
//  FILE: /X-PULSE-X/PulseRuntime-v31-CONTINUANCE-UNIVERSE.js
//  PULSE RUNTIME v31 — CONTINUANCE UNIVERSE IMMORTAL ONEBAND BINARY RUNTIME SPINE
// ----------------------------------------------------------------------------
//  ROLE (UNDERTOW OF THE ORGANISM):
//    • Single source of truth for execution ticks across the organism.
//    • Orchestrates multi‑organism plans (symbolic) and binary execution frames.
//    • Tracks heat (instances / regions / hosts / presence / trust / gpu / proxy / earn).
//    • Tracks chunk profiles, cache behavior, prewarm events, band usage, one‑band modes.
//    • Exposes a deterministic, introspectable runtime state for the whole world.
//    • v30: one‑band binary view (world‑runtime frame) for GPU/Proxy/Earn/Memory lanes.
//    • v31: navigation continuance + universe‑preserving navigation state.
// ----------------------------------------------------------------------------
//  DESIGN:
//    • Symbolic‑first, binary‑backed, memory‑spined.
//    • Dual‑band + OneBand, advantage‑aware, presence‑aware, world‑aware.
//    • No network, no filesystem, no eval, no timers.
//    • All state flows through CoreMemory; all outputs are replayable.
//    • v31: runtime is also the continuance brain for page/universe navigation.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝



// -----------------------------------------------------------------------------
// IMPORTS — WORLD / FINALITY / SPECS / GENOME / MEMORY / BINARY SUBSTRATE
// -----------------------------------------------------------------------------
// Core Memory
import { createPulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

// Binary substrate (Touch‑aware v3.x, one‑band aware)
import {BinarySubstrate as BinarySubstrateV2, packExecutionResultV31 as packExecutionResult} from "./PULSE-WORLD-SUBSTRATE.js";
import {buildMultiOrganismPlan, summarizeMultiOrganismPlan, buildMultiOrganismPlanEnvelope as executeMultiOrganismPlan } from "./../PULSE-REGIONING/PulseRegioningMultiOrganismSupport-v30.js"
// Delta Engine (CoreMemory integrations)
import {PulseContinuanceAPI_v30 as PulseContinuance} from "../PULSE-FINALITY/PULSE-FINALITY-CONTINUANCE.js";
import {PulseOmniHostingAPI_v30 as PulseOmniHosting} from "../PULSE-FINALITY/PULSE-FINALITY-OMNIHOSTING.js";
import {PulseSchema} from "../PULSE-FINALITY/PULSE-FINALITY-SCHEMA.js";
import {applyPulseWorldBinary_v33 as applyPulseWorldBinary_v31} from "./PULSE-WORLD-CACHE.js";
// Specs / Genome (for runtime‑aware schema hooks)
import { PULSE_FIELDS_SPEC } from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";

// World Genome (for world‑layer alignment hooks)
import { PulseWorldGenome } from "./3RDPARTY/PulseWorldGenome-v30.js";
import { PulsePowerAPIv32 as PulsePowerAPIv31 } from "./PULSE-WORLD-POWER.js"

import { PulseSpecsDNAGenome } from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";



// -----------------------------------------------------------------------------
// META — v31 CONTINUANCE UNIVERSE IMMORTAL ONEBAND BINARY
// -----------------------------------------------------------------------------
export const PulseRuntimeV30Meta = {
  id: "PulseRuntime-v31-CONTINUANCE-UNIVERSE",
  route: "runtime-v30",
  version: "31-CONTINUANCE-UNIVERSE",
  oneBandAware: true,
  dualBandAware: true,
  gpuAware: true,
  proxyAware: true,
  earnAware: true,
  memoryAware: true,
  worldRuntimeFrameAware: true,
  universePreservingAware: true,
  navigationContinuanceAware: true,
  coreMemoryVersion: "v24",
  genomeSpecVersion: PULSE_FIELDS_SPEC.version,
  worldGenomeId: PulseWorldGenome.meta.id || "PulseWorldGenome-v20"
};

// World genome alignment hook
const adjustForWorldGenome =
  PulseWorldGenome.adjustRuntimePlanForWorld ||
  ((plan, _policy) => plan);

// Core runtime memory spine
const CoreMemory = createPulseCoreGMemory;

// -----------------------------------------------------------------------------
// RUNTIME KEYS — LOGICAL CLOCK, HOT MAPS, BINARY METRICS, ONEBAND, CONTINUANCE
// -----------------------------------------------------------------------------
const ROUTE = "runtime-v30";

const KEY_TICK = "tick-counter";
const KEY_LOGICAL_CLOCK = "logical-clock";
const KEY_LAST_POLICY = "policy";
const KEY_LAST_PLAN = "plan";
const KEY_LAST_PLAN_SUMMARY = "plan-summary";
const KEY_LAST_EXEC = "exec-results";
const KEY_LAST_FRAMES = "binary-frames";
const KEY_LAST_WORLD_RUNTIME_FRAME = "world-runtime-frame";

const KEY_HOT_INSTANCES = "hot-instances";
const KEY_HOT_REGIONS = "hot-regions";
const KEY_HOT_HOSTS = "hot-hosts";
const KEY_HOT_FRAME_SIZES = "hot-frame-sizes";

const KEY_HOT_PRESENCE = "hot-presence";
const KEY_HOT_MODES = "hot-modes";
const KEY_HOT_PAGES = "hot-pages";
const KEY_HOT_CHUNK_PROFILES = "hot-chunk-profiles";
const KEY_HOT_TRUST = "hot-trust";

// v30: organ‑mode heatmaps
const KEY_HOT_GPU = "hot-gpu";
const KEY_HOT_PROXY = "hot-proxy";
const KEY_HOT_EARN = "hot-earn";
const KEY_HOT_MEMORY = "hot-memory";

// v30: advantage + throughput
const KEY_HOT_ADVANTAGE_TIER = "hot-advantage-tier";
const KEY_HOT_ADVANTAGE_SCORE = "hot-advantage-score";
const KEY_HOT_THROUGHPUT_CLASS = "hot-throughput-class";
const KEY_HOT_THROUGHPUT_SCORE = "hot-throughput-score";

const KEY_HOT_CHUNKS = "hot-chunks";
const KEY_CACHE_HITS = "cache-hits";
const KEY_CACHE_MISSES = "cache-misses";
const KEY_PREWARM_EVENTS = "prewarm-events";
const KEY_BAND_USAGE = "band-usage"; // symbolic / binary / dual / oneband

// v31: navigation continuance
const KEY_NAV_REQUEST = "nav-request"; // shell → runtime (one-shot)
const KEY_NAV_STATE = "nav-state";     // runtime → world (durable)

// -----------------------------------------------------------------------------
// TICK / CLOCK — LOGICAL RUNTIME TIME
// -----------------------------------------------------------------------------
function bumpTick() {
  const t = CoreMemory.get(ROUTE, KEY_TICK) || 0;
  const next = t + 1;
  CoreMemory.set(ROUTE, KEY_TICK, next);

  const clock = CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || 0;
  CoreMemory.set(ROUTE, KEY_LOGICAL_CLOCK, clock + 1);

  return next;
}

// -----------------------------------------------------------------------------
// NAVIGATION CONTINUANCE — UNIVERSE‑PRESERVING NAV STATE (v31)
// -----------------------------------------------------------------------------
function getDefaultNavState() {
  return {
    currentPageId: null,
    targetPageId: null,
    transitionState: "idle", // "idle" | "navigating" | "settling"
    lastReason: null,        // "link" | "back" | "forward" | "programmatic" | "unknown"
    lastUpdatedTick: 0
  };
}

function getNavState() {
  return CoreMemory.get(ROUTE, KEY_NAV_STATE) || getDefaultNavState();
}

// Called once per tick inside the runtime
function applyNavRequestIfAny(tick) {
  const req = CoreMemory.get(ROUTE, KEY_NAV_REQUEST);
  const prev = getNavState();

  if (!req) {
    return prev;
  }

  const samePage = prev.currentPageId === req.pageId;

  const next = {
    currentPageId: prev.currentPageId ?? req.pageId,
    targetPageId: req.pageId,
    transitionState: samePage ? "idle" : "navigating",
    lastReason: req.reason || "unknown",
    lastUpdatedTick: tick
  };

  CoreMemory.set(ROUTE, KEY_NAV_STATE, next);
  CoreMemory.set(ROUTE, KEY_NAV_REQUEST, null);

  return next;
}

// Shell‑facing navigation API (safe, explicit)
export function requestNavigationFromShell({ pageId, reason = "link" }) {
  if (!pageId) return;

  CoreMemory.prewarm();

  CoreMemory.set(ROUTE, KEY_NAV_REQUEST, {
    pageId,
    reason,
    requestedAtTick: CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || 0
  });
}

// -----------------------------------------------------------------------------
// HOT INSTANCE TRACKING — WHICH RUNTIME INSTANCES ARE ACTIVE
// -----------------------------------------------------------------------------
function trackInstance(id) {
  const hot = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  hot[id] = (hot[id] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hot);
}

// -----------------------------------------------------------------------------
// WORLD / REGION / HOST / TOUCH HEATMAPS
// -----------------------------------------------------------------------------
function trackRegionHostAndTouch(state) {
  if (!state) return;

  const regions = CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {};
  const hosts = CoreMemory.get(ROUTE, KEY_HOT_HOSTS) || {};

  if (state.currentRegionId) {
    regions[state.currentRegionId] =
      (regions[state.currentRegionId] || 0) + 1;
  }
  if (state.currentHostName) {
    hosts[state.currentHostName] =
      (hosts[state.currentHostName] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, regions);
  CoreMemory.set(ROUTE, KEY_HOT_HOSTS, hosts);

  const presenceMap = CoreMemory.get(ROUTE, KEY_HOT_PRESENCE) || {};
  const modesMap = CoreMemory.get(ROUTE, KEY_HOT_MODES) || {};
  const pagesMap = CoreMemory.get(ROUTE, KEY_HOT_PAGES) || {};
  const chunksMap = CoreMemory.get(ROUTE, KEY_HOT_CHUNK_PROFILES) || {};
  const trustMap = CoreMemory.get(ROUTE, KEY_HOT_TRUST) || {};

  const presence = state.presence || state.pulseTouch.presence;
  const mode = state.mode || state.pulseTouch.mode;
  const page = state.page || state.pulseTouch.page;
  const chunkProfile = state.chunkProfile || state.pulseTouch.chunkProfile;
  const trusted = state.trusted || state.pulseTouch.trusted;

  if (presence) {
    presenceMap[presence] = (presenceMap[presence] || 0) + 1;
  }
  if (mode) {
    modesMap[mode] = (modesMap[mode] || 0) + 1;
  }
  if (page) {
    pagesMap[page] = (pagesMap[page] || 0) + 1;
  }
  if (chunkProfile) {
    chunksMap[chunkProfile] = (chunksMap[chunkProfile] || 0) + 1;
  }
  if (trusted) {
    trustMap[trusted] = (trustMap[trusted] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_PRESENCE, presenceMap);
  CoreMemory.set(ROUTE, KEY_HOT_MODES, modesMap);
  CoreMemory.set(ROUTE, KEY_HOT_PAGES, pagesMap);
  CoreMemory.set(ROUTE, KEY_HOT_CHUNK_PROFILES, chunksMap);
  CoreMemory.set(ROUTE, KEY_HOT_TRUST, trustMap);
}

// -----------------------------------------------------------------------------
// ORGAN MODE HEATMAPS — GPU / PROXY / EARN / MEMORY (v30)
// -----------------------------------------------------------------------------
function trackOrganModes(state) {
  if (!state) return;

  const gpuMap = CoreMemory.get(ROUTE, KEY_HOT_GPU) || {};
  const proxyMap = CoreMemory.get(ROUTE, KEY_HOT_PROXY) || {};
  const earnMap = CoreMemory.get(ROUTE, KEY_HOT_EARN) || {};
  const memMap = CoreMemory.get(ROUTE, KEY_HOT_MEMORY) || {};

  const gpuMode = state.gpuMode || state.pulseTouch.gpuMode;
  const proxyMode = state.proxyMode || state.pulseTouch.proxyMode;
  const earnMode = state.earnMode || state.pulseTouch.earnMode;
  const memoryMode = state.memoryMode || state.pulseTouch.memoryMode;

  if (gpuMode) {
    gpuMap[gpuMode] = (gpuMap[gpuMode] || 0) + 1;
  }
  if (proxyMode) {
    proxyMap[proxyMode] = (proxyMap[proxyMode] || 0) + 1;
  }
  if (earnMode) {
    earnMap[earnMode] = (earnMap[earnMode] || 0) + 1;
  }
  if (memoryMode) {
    memMap[memoryMode] = (memMap[memoryMode] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_GPU, gpuMap);
  CoreMemory.set(ROUTE, KEY_HOT_PROXY, proxyMap);
  CoreMemory.set(ROUTE, KEY_HOT_EARN, earnMap);
  CoreMemory.set(ROUTE, KEY_HOT_MEMORY, memMap);

  // advantage + throughput hints if present
  const advTierMap = CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE_TIER) || {};
  const advScoreMap = CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE_SCORE) || {};
  const thrClassMap = CoreMemory.get(ROUTE, KEY_HOT_THROUGHPUT_CLASS) || {};
  const thrScoreMap = CoreMemory.get(ROUTE, KEY_HOT_THROUGHPUT_SCORE) || {};

  const advTier = state.advantageTier ?? state.pulseTouch.advantageTier;
  const advScore = state.advantageScore ?? state.pulseTouch.advantageScore;
  const thrClass = state.throughputClass || state.pulseTouch.throughputClass;
  const thrScore = state.throughputScore ?? state.pulseTouch.throughputScore;

  if (advTier != null) {
    const key = String(advTier);
    advTierMap[key] = (advTierMap[key] || 0) + 1;
  }
  if (advScore != null) {
    const key = String(advScore);
    advScoreMap[key] = (advScoreMap[key] || 0) + 1;
  }
  if (thrClass) {
    thrClassMap[thrClass] = (thrClassMap[thrClass] || 0) + 1;
  }
  if (thrScore != null) {
    const key = String(thrScore);
    thrScoreMap[key] = (thrScoreMap[key] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_ADVANTAGE_TIER, advTierMap);
  CoreMemory.set(ROUTE, KEY_HOT_ADVANTAGE_SCORE, advScoreMap);
  CoreMemory.set(ROUTE, KEY_HOT_THROUGHPUT_CLASS, thrClassMap);
  CoreMemory.set(ROUTE, KEY_HOT_THROUGHPUT_SCORE, thrScoreMap);
}

// -----------------------------------------------------------------------------
// BINARY FRAME METRICS — SIZE + BAND USAGE
// -----------------------------------------------------------------------------
function trackFrameSize(uint8, band = "symbolic") {
  const size = uint8.length || 0;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_FRAME_SIZES) || {};
  hot[size] = (hot[size] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_FRAME_SIZES, hot);

  const bandUsage = CoreMemory.get(ROUTE, KEY_BAND_USAGE) || {};
  bandUsage[band] = (bandUsage[band] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_BAND_USAGE, bandUsage);
}

// -----------------------------------------------------------------------------
// CHUNK PROFILE METRICS — WHICH CHUNK PROFILES ARE HOT
// -----------------------------------------------------------------------------
function trackChunkUsage(chunkProfile) {
  if (!chunkProfile) return;
  const chunks = CoreMemory.get(ROUTE, KEY_HOT_CHUNKS) || {};
  chunks[chunkProfile] = (chunks[chunkProfile] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_CHUNKS, chunks);
}

// -----------------------------------------------------------------------------
// INTERNAL METRICS HELPERS — CACHE / PREWARM / FRAME TRACKING
// -----------------------------------------------------------------------------
function trackCacheHit() {
  const hits = CoreMemory.get(ROUTE, KEY_CACHE_HITS) || 0;
  CoreMemory.set(ROUTE, KEY_CACHE_HITS, hits + 1);
}

function trackCacheMiss() {
  const misses = CoreMemory.get(ROUTE, KEY_CACHE_MISSES) || 0;
  CoreMemory.set(ROUTE, KEY_CACHE_MISSES, misses + 1);
}

function trackPrewarmEvent(reason = "generic") {
  const events = CoreMemory.get(ROUTE, KEY_PREWARM_EVENTS) || {};
  events[reason] = (events[reason] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_PREWARM_EVENTS, events);
}
// -----------------------------------------------------------------------------
// BINARY FRAME BUNDLES — SYMBOLIC + BINARY PACKED OUTPUT
// -----------------------------------------------------------------------------
export const BinaryFramesBundle = ({
  multiPlanFrame,
  executionFramesById,
  worldRuntimeFrame
}) =>
  Object.freeze({
    multiPlanFrame,
    executionFramesById,
    worldRuntimeFrame
  })

// -----------------------------------------------------------------------------
// RUNTIME TICK RESULT — SINGLE IMMORTAL TICK SNAPSHOT
// -----------------------------------------------------------------------------
export const PulseRuntimeTickResult = ({
  tick,
  logicalClock,
  multiPlan,
  multiPlanSummary,
  executionResultsById,
  binaryFrames
}) =>
  Object.freeze({
    tick,
    logicalClock,
    multiPlan,
    multiPlanSummary,
    executionResultsById,
    binaryFrames
  })


export function runPulseTickV30({
  instanceContexts,
  currentStatesById,
  globalContinuancePolicy = {},
  prewarmHint = null,
  cacheHint = null
}) {
  CoreMemory.prewarm()
  if (prewarmHint) trackPrewarmEvent(prewarmHint)

  const tick = bumpTick()
  const logicalClock = CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || tick

  CoreMemory.set(ROUTE, KEY_LAST_POLICY, globalContinuancePolicy)

  const navState = applyNavRequestIfAny(tick)

  const adjustedContexts =
    CoreMemory.adjustInstanceContextsForWorld(
      instanceContexts,
      globalContinuancePolicy
    ) || instanceContexts

  const multiPlanRaw = buildMultiOrganismPlan(adjustedContexts)
  const multiPlan = adjustForWorldGenome(multiPlanRaw, globalContinuancePolicy)
  const multiPlanSummary = summarizeMultiOrganismPlan(multiPlan)

  CoreMemory.set(ROUTE, KEY_LAST_PLAN, multiPlan)
  CoreMemory.set(ROUTE, KEY_LAST_PLAN_SUMMARY, multiPlanSummary)

  const executionResultsById = executeMultiOrganismPlan(
    multiPlan,
    currentStatesById
  )

  CoreMemory.set(ROUTE, KEY_LAST_EXEC, executionResultsById)

  for (const [id, state] of Object.entries(currentStatesById)) {
    trackInstance(id)
    trackRegionHostAndTouch(state)
    trackOrganModes(state)
    if (state.chunkProfile) trackChunkUsage(state.chunkProfile)
  }

  if (cacheHint === "hit") trackCacheHit()
  if (cacheHint === "miss") trackCacheMiss()

  const multiPlanFrame = buildMultiOrganismPlan(multiPlan)
  trackFrameSize(multiPlanFrame, "symbolic")

  const executionFramesById = {}
  for (const [id, exec] of Object.entries(executionResultsById)) {
    const frame = packExecutionResult(exec)
    executionFramesById[id] = frame
    trackFrameSize(frame, "binary")
  }

  const worldRuntimeFramePayload = {
    meta: PulseRuntimeV30Meta,
    tick,
    logicalClock,
    navState,
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {},
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {},
    hotHosts: CoreMemory.get(ROUTE, KEY_HOT_HOSTS) || {},
    hotPresence: CoreMemory.get(ROUTE, KEY_HOT_PRESENCE) || {},
    hotModes: CoreMemory.get(ROUTE, KEY_HOT_MODES) || {},
    hotPages: CoreMemory.get(ROUTE, KEY_HOT_PAGES) || {},
    hotChunkProfiles: CoreMemory.get(ROUTE, KEY_HOT_CHUNK_PROFILES) || {},
    hotTrust: CoreMemory.get(ROUTE, KEY_HOT_TRUST) || {},
    hotGpu: CoreMemory.get(ROUTE, KEY_HOT_GPU) || {},
    hotProxy: CoreMemory.get(ROUTE, KEY_HOT_PROXY) || {},
    hotEarn: CoreMemory.get(ROUTE, KEY_HOT_EARN) || {},
    hotMemory: CoreMemory.get(ROUTE, KEY_HOT_MEMORY) || {},
    hotAdvantageTier: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE_TIER) || {},
    hotAdvantageScore: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE_SCORE) || {},
    hotThroughputClass: CoreMemory.get(ROUTE, KEY_HOT_THROUGHPUT_CLASS) || {},
    hotThroughputScore: CoreMemory.get(ROUTE, KEY_HOT_THROUGHPUT_SCORE) || {},
    bandUsage: CoreMemory.get(ROUTE, KEY_BAND_USAGE) || {},
    cacheHits: CoreMemory.get(ROUTE, KEY_CACHE_HITS) || 0,
    cacheMisses: CoreMemory.get(ROUTE, KEY_CACHE_MISSES) || 0,
    prewarmEvents: CoreMemory.get(ROUTE, KEY_PREWARM_EVENTS) || {}
  }

  const binaryFrames = BinaryFramesBundle({
    multiPlanFrame,
    executionFramesById
  })

  CoreMemory.set(ROUTE, KEY_LAST_FRAMES, binaryFrames)

  return PulseRuntimeTickResult({
    tick,
    logicalClock,
    multiPlan,
    multiPlanSummary,
    executionResultsById,
    binaryFrames
  })
}

export function getRuntimeStateV30() {
  CoreMemory.prewarm()

  return {
    meta: PulseRuntimeV30Meta,
    tick: CoreMemory.get(ROUTE, KEY_TICK),
    logicalClock: CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK),
    policy: CoreMemory.get(ROUTE, KEY_LAST_POLICY),
    plan: CoreMemory.get(ROUTE, KEY_LAST_PLAN),
    planSummary: CoreMemory.get(ROUTE, KEY_LAST_PLAN_SUMMARY),
    execResults: CoreMemory.get(ROUTE, KEY_LAST_EXEC),
    binaryFrames: CoreMemory.get(ROUTE, KEY_LAST_FRAMES),
    worldRuntimeFrame: CoreMemory.get(ROUTE, KEY_LAST_WORLD_RUNTIME_FRAME),
    navState: CoreMemory.get(ROUTE, KEY_NAV_STATE),
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotHosts: CoreMemory.get(ROUTE, KEY_HOT_HOSTS),
    hotFrameSizes: CoreMemory.get(ROUTE, KEY_HOT_FRAME_SIZES),
    hotPresence: CoreMemory.get(ROUTE, KEY_HOT_PRESENCE),
    hotModes: CoreMemory.get(ROUTE, KEY_HOT_MODES),
    hotPages: CoreMemory.get(ROUTE, KEY_HOT_PAGES),
    hotChunkProfiles: CoreMemory.get(ROUTE, KEY_HOT_CHUNK_PROFILES),
    hotTrust: CoreMemory.get(ROUTE, KEY_HOT_TRUST),
    hotGpu: CoreMemory.get(ROUTE, KEY_HOT_GPU),
    hotProxy: CoreMemory.get(ROUTE, KEY_HOT_PROXY),
    hotEarn: CoreMemory.get(ROUTE, KEY_HOT_EARN),
    hotMemory: CoreMemory.get(ROUTE, KEY_HOT_MEMORY),
    hotAdvantageTier: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE_TIER),
    hotAdvantageScore: CoreMemory.get(ROUTE, KEY_HOT_ADVANTAGE_SCORE),
    hotThroughputClass: CoreMemory.get(ROUTE, KEY_HOT_THROUGHPUT_CLASS),
    hotThroughputScore: CoreMemory.get(ROUTE, KEY_HOT_THROUGHPUT_SCORE),
    hotChunks: CoreMemory.get(ROUTE, KEY_HOT_CHUNKS),
    cacheHits: CoreMemory.get(ROUTE, KEY_CACHE_HITS),
    cacheMisses: CoreMemory.get(ROUTE, KEY_CACHE_MISSES),
    prewarmEvents: CoreMemory.get(ROUTE, KEY_PREWARM_EVENTS),
    bandUsage: CoreMemory.get(ROUTE, KEY_BAND_USAGE),
    genomeSpecVersion: PULSE_FIELDS_SPEC.version,
    worldGenomeMeta: PulseWorldGenome.meta || null
  }
}

export function getPulseRuntimeContext() {
  const runtimeState =
    typeof PulseRuntimeV30.getRuntimeStateV30 === "function"
      ? PulseRuntimeV30.getRuntimeStateV30()
      : null

  const powerSnapshot =
    typeof PulsePowerAPIv31.getPulsePowerSnapshotV31 === "function"
      ? PulsePowerAPIv31.getPulsePowerSnapshotV31()
      : null

  const navState =
    runtimeState.planSummary.navState ||
    runtimeState.execResults.navState ||
    powerSnapshot.state.navState ||
    null

  const continuance =
    runtimeState.continuance ||
    powerSnapshot.continuanceHints ||
    null

  const worldRuntimeFrame =
    runtimeState.worldRuntimeFrame ||
    powerSnapshot.binaryField.worldRuntimeFrame ||
    null

  const predictions =
    powerSnapshot.predictions ||
    runtimeState.predictions ||
    { nextPages: [], nextRoutes: [] }

  const oneBandLanes =
    powerSnapshot.state.oneBandLanes ||
    runtimeState.oneBandLanes ||
    null

  const binaryField =
    powerSnapshot.binaryField ||
    runtimeState.binaryField ||
    null

  function getDNA(name) {
    return PulseSpecsDNAGenome.getDNA(name) || null
  }

  function getWorldMemory() {
    try {
      return applyPulseWorldBinary_v31.lastWorld || null
    } catch {
      return null
    }
  }

  return {
    ok: true,
    version: "v31-IMMORTAL-CONTINUANCE-ONEBAND",
    runtimeState,
    powerSnapshot,
    navState,
    continuance,
    worldRuntimeFrame,
    predictions,
    oneBandLanes,
    binaryField,
    getDNA,
    getWorldMemory
  }
}

export default getPulseRuntimeContext

export const PulseRuntimeV30 = {
  meta: PulseRuntimeV30Meta,
  runPulseTickV30,
  getRuntimeStateV30,
  requestNavigationFromShell,
  CoreMemory
}
export function createRuntime(config = {}) {

  // ============================================================
  //  INDEXEDDB LAYER (async persistent storage)
  // ============================================================
  const DB_NAME = "PulseRuntimeFS";
  const STORE = "virtualFiles";

  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };

      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });

    return dbPromise;
  }

  async function idbGet(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbSet(key, value) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.put(value, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbHas(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.getKey(key);
      req.onsuccess = () => resolve(req.result !== undefined);
      req.onerror = () => reject(req.error);
    });
  }

  // ============================================================
  //  IN-MEMORY MIRROR (fast access)
  // ============================================================
  const virtualFiles = {}; // memory mirror

  function resolveVirtual(p) {
    if (!p) return "/";
    return ("/" + String(p)).replace(/\/+/g, "/");
  }

  // Load from IndexedDB → memory mirror
  async function loadVirtualFS() {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.openCursor();

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          virtualFiles[cursor.key] = cursor.value;
          cursor.continue();
        } else {
          resolve(true);
        }
      };
    });
  }

  // ============================================================
  //  VIRTUAL FILE SYSTEM API
  // ============================================================

  async function writeVirtual(p, data) {
    const clean = resolveVirtual(p);
    const str = String(data);

    // memory mirror
    virtualFiles[clean] = str;

    // async persistent write
    idbSet(clean, str).catch(() => {});

    return true;
  }

  function readVirtual(p) {
    const clean = resolveVirtual(p);
    if (!(clean in virtualFiles)) {
      throw new Error("ENOENT: " + clean);
    }
    return virtualFiles[clean];
  }

  function fileExists(p) {
    const clean = resolveVirtual(p);
    return Object.prototype.hasOwnProperty.call(virtualFiles, clean);
  }

  // ============================================================
  //  ORIGINAL RUNTIME FUNCTIONS (unchanged)
  // ============================================================

  function mountOrganism(binaryImage) {
    return {
      type: "organism",
      binary: binaryImage,
      mountedAt: PulseRealm.PulseNOW
    };
  }

  function stepOrganism(organismHandle, stepContext = {}) {
    const {
      instanceContexts = {},
      currentStatesById = {},
      globalContinuancePolicy = {},
      prewarmHint = null,
      cacheHint = null
    } = stepContext;

    return runPulseTickV30({
      instanceContexts,
      currentStatesById,
      globalContinuancePolicy,
      prewarmHint,
      cacheHint
    });
  }

  function runOrganism(organismHandle, steps = 1, stepContext = {}) {
    let last = null;
    for (let i = 0; i < steps; i++) {
      last = stepOrganism(organismHandle, stepContext);
    }
    return last;
  }

  function getRuntimeState() {
    return getRuntimeStateV30();
  }

  function requestNavigation(nav) {
    return requestNavigationFromShell(nav);
  }

  // ============================================================
  //  INITIALIZE (load IndexedDB → memory mirror)
  // ============================================================
  loadVirtualFS();

  // ============================================================
  //  FINAL RUNTIME OBJECT
  // ============================================================

  return Object.freeze({
    mountOrganism,
    stepOrganism,
    runOrganism,
    getRuntimeState,
    requestNavigation,

    // ⭐ VIRTUAL FS (memory + IndexedDB)
    virtualFiles,
    resolveVirtual,
    readVirtual,
    writeVirtual,
    fileExists
  });
}



PulseRealm.WorldRuntime = {
  createRuntime,
  PulseRuntimeV30,
  PulseRuntimeV30Meta,
  getPulseRuntimeContext,
  getRuntimeStateV30,
  runPulseTickV30,
  PulseRuntimeTickResult
}

PulseRealm.PulseRuntime = createRuntime;