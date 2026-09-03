// ============================================================================
// FILE: OrganismMesh-v30-IMMORTAL-PLUS.js
// PULSE ORGANISM MESH — OVERMIND-PRIME ORGANISM BRAIN + GLOBAL MESH COORDINATOR
// “One page. One route. Whole organism. One mesh that knows everything.”
// v30 IMMORTAL-PLUS: dual-mesh, presence-aware, advantage-aware,
// organism‑level artery + consciousness + mesh field + endocrine + 3D + delta-memory
// ============================================================================
import { createPulseOrgans } from "./PulseMeshOrgans-v30.js";
import { createPulseField_v30 as createPulseField } from "./PulseMeshEnvironmentalField-v30.js";
import { createPulseMeshEndocrineSystem_v30 } from "./PulseMeshEndocrineSystem-v30.js";
import { createPulseNodeAdmin } from "../PULSE-TOOLS/AI/PulseToolsNodeAdmin-v30.js";
import { AIBinaryReproduction } from "../PULSE-AI/PulseAIReproduction-v30.js";
import { AiSafetyFrame } from "../PULSE-AI/PERSONALITY/PulseAISafetyFrame-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const OrganismMeshMeta2 = Object.freeze({
  layer: "Organism",
  role: "OVERMIND_PRIME_ORGANISM_MESH_ROOT",
  version: "v30-IMMORTAL-PLUS",
  identity: "OrganismMesh-v30-IMMORTAL-PLUS",
  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    mutationSafe: true,

    presenceAware: true,
    bandAware: true,
    dualMesh: true,

    survivalOrgansAttached: true,
    meshCoordinatorAttached: true,
    meshStateAttached: true,
    meshEventsAttached: true,

    organismArteryAttached: true,
    organismConsciousnessAttached: true,
    organismModeEngineAttached: true,

    nodeAdminBridgeAttached: true,
    overmindPrimeBridgeAttached: true,

    advantageAware: true,
    meshPressureAware: true,
    auraPressureAware: true,
    flowAware: true,
    driftAware: true,

    // v30++
    meshFieldAttached: true,
    meshEndocrineAttached: true,
    touch3DAttached: true,
    deltaMemoryAttached: true
  }),
  evo: Object.freeze({
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    localAware: true,
    internetAware: true,

    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,

    unifiedAdvantageField: true,
    deterministicField: true,
    futureEvolutionReady: true,

    signalFactoringAware: true,
    meshPressureAware: true,
    auraPressureAware: true,
    flowAware: true,
    driftAware: true,

    presenceAware: true,
    bandAware: true,

    zeroCompute: false,          // organism-level synthesis allowed
    zeroMutation: true,          // never mutates external objects
    zeroRoutingInfluence: true   // advisory-only at organism level
  })
});


function freezeClone(obj) {
  return Object.freeze({ ...(obj || {}) });
}

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// ============================================================================
// ORGANISM ARTERY
// ============================================================================
function createOrganismArtery({ trace, log }) {
  let windowStart = PulseRealm.PulseNOW;
  let windowMs = 60000;

  let calls = 0;
  let errors = 0;
  let slowCalls = 0;

  let totalCalls = 0;
  let totalErrors = 0;

  let slowThresholdMs = 1500;

  function rollWindow(now) {
    if (now - windowStart >= windowMs) {
      windowStart = now;
      calls = 0;
      errors = 0;
      slowCalls = 0;
    }
  }

  function recordCall(durationMs, isError) {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    totalCalls += 1;
    calls += 1;

    if (isError) {
      totalErrors += 1;
      errors += 1;
    }

    if (durationMs >= slowThresholdMs) {
      slowCalls += 1;
    }
  }

  function snapshot({
    symbolicArtery = null,
    binaryArtery = null,
    nodeAdminArtery = null,
    serviceGatewayArtery = null,
    safetyFrameArtery = null,
    earnArtery = null,
    reproductionArtery = null,
    presenceMetrics = null,
    meshStateMetrics = null
  } = {}) {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const elapsedMs = Math.max(1, now - windowStart);
    const callsPerMs = calls / elapsedMs;
    const callsPerSec = callsPerMs * 1000;

    const errorRate = calls > 0 ? Math.min(1, errors / calls) : 0;
    const slowRate = calls > 0 ? Math.min(1, slowCalls / calls) : 0;

    const symbolicLoad = symbolicArtery.pressure ?? 0;
    const binaryLoad = binaryArtery.pressure ?? 0;
    const nodeAdminLoad = nodeAdminArtery.pressure ?? 0;
    const serviceLoad = serviceGatewayArtery.pressure ?? 0;
    const safetyLoad = safetyFrameArtery.pressure ?? 0;
    const earnLoad = earnArtery.pressure ?? 0;
    const reproductionLoad = reproductionArtery.pressure ?? 0;

    const avgSubsystemPressure = (
      symbolicLoad +
      binaryLoad +
      nodeAdminLoad +
      serviceLoad +
      safetyLoad +
      earnLoad +
      reproductionLoad
    ) / 7;

    const presenceDensity = presenceMetrics.density ?? 0;
    const presenceVolatility = presenceMetrics.volatility ?? 0;

    const meshResourceCount = meshStateMetrics.resourceCount ?? 0;
    const meshChunkCount = meshStateMetrics.chunkCount ?? 0;
    const meshReadyCount = meshStateMetrics.readyCount ?? 0;

    const loadFactor = Math.min(1, (avgSubsystemPressure + errorRate + slowRate) / 3);
    const pressure = loadFactor;

    const throughputBase = Math.max(0, 1 - pressure);
    const throughput = Math.max(0, Math.min(1, throughputBase));

    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = Object.freeze({
      windowMs,
      windowCalls: calls,
      windowErrors: errors,
      windowSlowCalls: slowCalls,
      totalCalls,
      totalErrors,
      callsPerSec,
      errorRate,
      slowRate,

      pressure,
      throughput,
      cost,
      budget,

      pressureBucket: bucketPressure(pressure),
      throughputBucket: bucketLevel(throughput),
      costBucket: bucketCost(cost),
      budgetBucket: bucketLevel(budget),

      subsystems: {
        symbolic: symbolicArtery,
        binary: binaryArtery,
        nodeAdmin: nodeAdminArtery,
        serviceGateway: serviceGatewayArtery,
        safetyFrame: safetyFrameArtery,
        earn: earnArtery,
        reproduction: reproductionArtery
      },

      presence: {
        density: presenceDensity,
        volatility: presenceVolatility
      },

      meshState: {
        resourceCount: meshResourceCount,
        chunkCount: meshChunkCount,
        readyCount: meshReadyCount
      }
    });

    if (trace) {
      log("[OrganismMesh] Artery snapshot", artery);
    }

    return artery;
  }

  return Object.freeze({
    recordCall,
    snapshot
  });
}

// ============================================================================
// ORGANISM CONSCIOUSNESS
// ============================================================================
function createOrganismConsciousness({ trace, log }) {
  function compute({
    artery,
    meshStateMetrics,
    presenceMetrics,
    organismMode
  }) {
    const pressure = artery.pressure ?? 0;
    const errorRate = artery.errorRate ?? 0;
    const slowRate = artery.slowRate ?? 0;
    const throughput = artery.throughput ?? 0;
    const budget = artery.budget ?? 0;

    const resourceCount = meshStateMetrics.resourceCount ?? 0;
    const readyCount = meshStateMetrics.readyCount ?? 0;
    const chunkCount = meshStateMetrics.chunkCount ?? 0;

    const presenceDensity = presenceMetrics.density ?? 0;
    const presenceVolatility = presenceMetrics.volatility ?? 0;

    const stabilityIndex = clamp(
      (throughput * 0.4) +
      (budget * 0.3) +
      ((1 - errorRate) * 0.2) +
      ((1 - slowRate) * 0.1),
      0,
      1
    );

    const entropyIndex = clamp(
      (pressure * 0.4) +
      (errorRate * 0.3) +
      (slowRate * 0.2) +
      (presenceVolatility * 0.1),
      0,
      1
    );

    const expansionReadiness = clamp(
      (budget * 0.5) +
      (stabilityIndex * 0.3) +
      (presenceDensity * 0.2),
      0,
      1
    );

    const recoveryNeed = clamp(
      (pressure * 0.5) +
      (entropyIndex * 0.3) +
      ((1 - stabilityIndex) * 0.2),
      0,
      1
    );

    const consciousness = Object.freeze({
      organismMode,
      stabilityIndex,
      entropyIndex,
      expansionReadiness,
      recoveryNeed,

      artery: {
        pressure,
        throughput,
        budget,
        errorRate,
        slowRate,
        pressureBucket: artery.pressureBucket,
        throughputBucket: artery.throughputBucket,
        budgetBucket: artery.budgetBucket
      },

      mesh: {
        resourceCount,
        readyCount,
        chunkCount
      },

      presence: {
        density: presenceDensity,
        volatility: presenceVolatility
      }
    });

    if (trace) {
      log("[OrganismMesh] Consciousness snapshot", consciousness);
    }

    return consciousness;
  }

  return Object.freeze({
    compute
  });
}

// ============================================================================
// ORGANISM MODE ENGINE
// ============================================================================
function createOrganismModeEngine({ trace, log }) {
  const MODES = Object.freeze([
    "idle",
    "stable",
    "elevated",
    "high-pressure",
    "critical",
    "expansion",
    "recovery",
    "cooling",
    "harmonizing"
  ]);

  function selectMode({ artery, consciousness }) {
    const pressure = artery.pressure ?? 0;
    const stability = consciousness.stabilityIndex ?? 0;
    const entropy = consciousness.entropyIndex ?? 0;
    const expansionReadiness = consciousness.expansionReadiness ?? 0;
    const recoveryNeed = consciousness.recoveryNeed ?? 0;

    let mode = "idle";

    if (pressure < 0.2 && stability > 0.8) {
      mode = "stable";
    } else if (pressure < 0.4 && stability > 0.6) {
      mode = "elevated";
    } else if (pressure >= 0.4 && pressure < 0.7) {
      mode = "high-pressure";
    } else if (pressure >= 0.7) {
      mode = "critical";
    }

    if (expansionReadiness > 0.7 && pressure < 0.6 && stability > 0.6) {
      mode = "expansion";
    }

    if (recoveryNeed > 0.6 && pressure > 0.4) {
      mode = "recovery";
    }

    if (entropy < 0.3 && pressure < 0.4 && stability > 0.7) {
      mode = "cooling";
    }

    if (entropy > 0.4 && pressure < 0.6) {
      mode = "harmonizing";
    }

    if (trace) {
      log("[OrganismMesh] Mode selected", { mode, pressure, stability, entropy });
    }

    return { mode, modes: MODES };
  }

  return Object.freeze({
    MODES,
    selectMode
  });
}

// ============================================================================
// MESH STATE
// ============================================================================
function createMeshState() {
  const resources = new Map(); // resourceId -> { state, chunks: Set<chunkId>, lanes: Set<laneId>, meta }
  const laneWork  = new Map(); // laneId -> Set<resourceId>

  function getResource(resourceId) {
    return resources.get(resourceId) || null;
  }

  function ensureResource(resourceId) {
    let r = resources.get(resourceId);
    if (!r) {
      r = {
        id: resourceId,
        state: "pending",
        chunks: new Set(),
        lanes: new Set(),
        meta: Object.create(null)
      };
      resources.set(resourceId, r);
    }
    return r;
  }

  function assignLane(resourceId, laneId) {
    const r = ensureResource(resourceId);
    r.lanes.add(laneId);
    r.state = r.state === "pending" ? "chunking" : r.state;

    if (!laneWork.has(laneId)) laneWork.set(laneId, new Set());
    laneWork.get(laneId).add(resourceId);
  }

  function releaseLane(resourceId, laneId) {
    const r = resources.get(resourceId);
    if (r) {
      r.lanes.delete(laneId);
    }
    const work = laneWork.get(laneId);
    if (work) {
      work.delete(resourceId);
      if (work.size === 0) laneWork.delete(laneId);
    }
  }

  function addChunk(resourceId, chunkId) {
    const r = ensureResource(resourceId);
    r.chunks.add(chunkId);
    return r;
  }

  function setState(resourceId, state) {
    const r = ensureResource(resourceId);
    r.state = state;
    return r;
  }

  function markStale(resourceId) {
    const r = ensureResource(resourceId);
    r.state = "stale";
    r.chunks.clear();
    r.lanes.clear();
    return r;
  }

  function snapshotResource(resourceId) {
    const r = resources.get(resourceId);
    if (!r) return null;
    return Object.freeze({
      id: r.id,
      state: r.state,
      chunks: Object.freeze(Array.from(r.chunks)),
      lanes: Object.freeze(Array.from(r.lanes)),
      meta: freezeClone(r.meta)
    });
  }

  function snapshotAll() {
    const out = [];
    for (const r of resources.values()) {
      out.push(snapshotResource(r.id));
    }
    return Object.freeze(out);
  }

  function metrics() {
    let resourceCount = 0;
    let readyCount = 0;
    let chunkCount = 0;

    for (const r of resources.values()) {
      resourceCount += 1;
      if (r.state === "ready") readyCount += 1;
      chunkCount += r.chunks.size;
    }

    return Object.freeze({
      resourceCount,
      readyCount,
      chunkCount
    });
  }

  return Object.freeze({
    getResource,
    ensureResource,
    assignLane,
    releaseLane,
    addChunk,
    setState,
    markStale,
    snapshotResource,
    snapshotAll,
    metrics
  });
}

// ============================================================================
// MESH EVENTS
// ============================================================================
function createMeshEvents({ warn }) {
  const listeners = new Map(); // eventName -> Set<fn>

  function on(eventName, handler) {
    if (typeof handler !== "function") return () => {};
    if (!listeners.has(eventName)) listeners.set(eventName, new Set());
    const set = listeners.get(eventName);
    set.add(handler);
    return () => {
      set.delete(handler);
      if (set.size === 0) listeners.delete(eventName);
    };
  }

  function emit(eventName, payload) {
    const set = listeners.get(eventName);
    if (!set || set.size === 0) return;
    for (const fn of set) {
      try {
        fn(payload);
      } catch (e) {
        warn("[OrganismMesh] meshEvents handler failed", {
          eventName,
          error: e.message
        });
      }
    }
  }

  return Object.freeze({
    on,
    emit
  });
}

// ============================================================================
// MESH COORDINATOR
// ============================================================================
function createMeshCoordinator({ meshState, meshEvents, tlog }) {
  function requestWork(resourceId, laneId) {
    if (!resourceId && resourceId !== 0) return null;
    if (laneId === undefined || laneId === null) return null;

    const existing = meshState.getResource(resourceId);

    if (existing && existing.state === "ready") {
      tlog("requestWork: resource already ready", { resourceId, laneId });
      return null;
    }

    if (
      existing &&
      existing.state === "chunking" &&
      existing.lanes.size > 0 &&
      !existing.lanes.has(laneId)
    ) {
      tlog("requestWork: resource already chunking on other lane", {
        resourceId,
        laneId,
        lanes: Array.from(existing.lanes)
      });
      return null;
    }

    const r = meshState.ensureResource(resourceId);
    meshState.assignLane(resourceId, laneId);
    meshState.setState(resourceId, "chunking");

    meshEvents.emit("MESH_RESOURCE_ASSIGNED", {
      resourceId,
      laneId
    });

    return meshState.snapshotResource(resourceId);
  }

  function reportChunkDone({ resourceId, laneId, chunkId }) {
    if (!resourceId && resourceId !== 0) return null;
    if (!chunkId && chunkId !== 0) return null;

    const r = meshState.addChunk(resourceId, chunkId);
    meshState.releaseLane(resourceId, laneId);

    meshEvents.emit("MESH_CHUNK_DONE", {
      resourceId,
      laneId,
      chunkId
    });

    return meshState.snapshotResource(resourceId);
  }

  function markResourceReady(resourceId) {
    const r = meshState.setState(resourceId, "ready");
    meshEvents.emit("MESH_RESOURCE_READY", {
      resourceId,
      chunks: Array.from(r.chunks)
    });
    return meshState.snapshotResource(resourceId);
  }

  function markResourceStale(resourceId) {
    const r = meshState.markStale(resourceId);
    meshEvents.emit("MESH_RESOURCE_STALE", {
      resourceId
    });
    return meshState.snapshotResource(resourceId);
  }

  function getResourceView(resourceId) {
    return meshState.snapshotResource(resourceId);
  }

  function getAllResources() {
    return meshState.snapshotAll();
  }

  return Object.freeze({
    requestWork,
    reportChunkDone,
    markResourceReady,
    markResourceStale,
    getResourceView,
    getAllResources
  });
}

// ============================================================================
// ORGANISM MESH v30++
// ============================================================================
export function createOrganismMesh({
  context = {},
  symbolicMeshEnv,   // PASSED IN BY BARREL
  binaryMeshEnv,     // PASSED IN BY BARREL

  nodeAdminBridge = createPulseNodeAdmin,      // { getArtery?, getSnapshot? }
  overmindPrimeBridge = PulseRealm.PulseOvermindPrime,  // { emit?, pullDirectives? }
  serviceGatewayBridge = null, // { getArtery? }
  safetyFrameBridge = AiSafetyFrame,    // { getArtery? }
  earnBridge = null,           // { getArtery? }
  reproductionBridge = AIBinaryReproduction,   // { getArtery? }

  // v30++: 3D touch + delta memory
  touch3D = PulseRealm.PulseTouchRelay3D,              // instance of createPulseWorldTouchRelay3D (optional)
  deltaMemory = PulseRealm.PulseDeltaMemory,          // DeltaMemoryResolver_v50 instance (optional)

  trace = false
} = {}) {
  const OrganismMeshMeta = Object.freeze({
  layer: "Organism",
  role: "OVERMIND_PRIME_ORGANISM_MESH_ROOT",
  version: "v30-IMMORTAL-PLUS",
  identity: "OrganismMesh-v30-IMMORTAL-PLUS",
  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    mutationSafe: true,

    presenceAware: true,
    bandAware: true,
    dualMesh: true,

    survivalOrgansAttached: true,
    meshCoordinatorAttached: true,
    meshStateAttached: true,
    meshEventsAttached: true,

    organismArteryAttached: true,
    organismConsciousnessAttached: true,
    organismModeEngineAttached: true,

    nodeAdminBridgeAttached: true,
    overmindPrimeBridgeAttached: true,

    advantageAware: true,
    meshPressureAware: true,
    auraPressureAware: true,
    flowAware: true,
    driftAware: true,

    // v30++
    meshFieldAttached: true,
    meshEndocrineAttached: true,
    touch3DAttached: true,
    deltaMemoryAttached: true
  }),
  evo: Object.freeze({
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    localAware: true,
    internetAware: true,

    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,

    unifiedAdvantageField: true,
    deterministicField: true,
    futureEvolutionReady: true,

    signalFactoringAware: true,
    meshPressureAware: true,
    auraPressureAware: true,
    flowAware: true,
    driftAware: true,

    presenceAware: true,
    bandAware: true,

    zeroCompute: false,          // organism-level synthesis allowed
    zeroMutation: true,          // never mutates external objects
    zeroRoutingInfluence: true   // advisory-only at organism level
  })
});
  const log   = PulseRealm.log || console.log;
  const warn  = PulseRealm.warn || console.warn;

  const tlog = trace ? (...args) => log("[OrganismMesh]", ...args) : () => {};

  // 1) SURVIVAL ORGANS
  const survivalOrgans = createPulseOrgans();

  // 2) MESH STATE + EVENTS + COORDINATOR
  const meshState = createMeshState();
  const meshEvents = createMeshEvents({ warn });
  const meshCoordinator = createMeshCoordinator({ meshState, meshEvents, tlog });

  // 3) ORGANISM ARTERY + CONSCIOUSNESS + MODE ENGINE
  const organismArtery = createOrganismArtery({ trace, log });
  const organismConsciousness = createOrganismConsciousness({ trace, log });
  const organismModeEngine = createOrganismModeEngine({ trace, log });

  let lastArterySnapshot = null;
  let lastConsciousnessSnapshot = null;
  let lastOrganismMode = "idle";

  // 4) MESH FIELD + ENDOCRINE v30++
  const PulseField = createPulseField({ log, warn, error: log });

  const PulseMeshEndocrine = createPulseMeshEndocrineSystem_v30({
    PulseHalo: survivalOrgans.PulseHalo,
    PulseFieldRead: PulseField.read,
    PulseEcho: survivalOrgans.PulseEcho,
    mesh: {
      systems: symbolicMeshEnv.systems,
      symbolicMesh: symbolicMeshEnv.symbolicMesh,
      binaryMesh: binaryMeshEnv.binaryMesh
    },
    log,
    warn,
    error: log
  });

  // 5) PRESENCE / WORLD METRICS (symbolic-only, metadata-only)
  function computePresenceMetrics() {
    const presenceRelay = symbolicMeshEnv.meshPresenceRelay;
    const socialGraph = symbolicMeshEnv.socialGraph;

    let density = 0;
    let volatility = 0;

    try {
      if (presenceRelay.getPresenceMetrics) {
        const m = presenceRelay.getPresenceMetrics();
        density = Number(m.density || 0);
        volatility = Number(m.volatility || 0);
      } else if (socialGraph.metrics) {
        const m = socialGraph.metrics();
        density = Number(m.presenceDensity || 0);
        volatility = Number(m.presenceVolatility || 0);
      }
    } catch {
      // best-effort only
    }

    return Object.freeze({
      density: clamp(density, 0, 1),
      volatility: clamp(volatility, 0, 1)
    });
  }

  // 6) SUBSYSTEM ARTERIES
  function getSubsystemArteries() {
    const symbolicArtery = symbolicMeshEnv.meta.artery || null;
    const binaryArtery = binaryMeshEnv.meta.artery || null;
    const nodeAdminArtery = nodeAdminBridge.getArtery() || null;
    const serviceGatewayArtery = serviceGatewayBridge.getArtery() || null;
    const safetyFrameArtery = safetyFrameBridge.getArtery() || null;
    const earnArtery = earnBridge.getArtery() || null;
    const reproductionArtery = reproductionBridge.getArtery() || null;

    return {
      symbolicArtery,
      binaryArtery,
      nodeAdminArtery,
      serviceGatewayArtery,
      safetyFrameArtery,
      earnArtery,
      reproductionArtery
    };
  }

  // 7) ORGANISM SNAPSHOT PIPELINE (v30++: feeds Field + Endocrine)
  function computeOrganismSnapshots() {
    const meshStateMetrics = meshState.metrics();
    const presenceMetrics = computePresenceMetrics();
    const subsystemArteries = getSubsystemArteries();

    // v30++: derive field from diagnostics (Halo + Echo + Cognition)
    try {
      const halo = survivalOrgans.PulseHalo.snapshot() ??
                   survivalOrgans.PulseHalo.status();
      const echo = survivalOrgans.PulseEcho.lastEcho();
      const cognition = symbolicMeshEnv.cognition.snapshot();

      PulseField.control.deriveFromDiagnostics({ halo, echo, cognition });
    } catch {
      // best-effort
    }

    const artery = organismArtery.snapshot({
      ...subsystemArteries,
      presenceMetrics,
      meshStateMetrics
    });

    const { mode } = organismModeEngine.selectMode({
      artery,
      consciousness: lastConsciousnessSnapshot
    });

    const consciousness = organismConsciousness.compute({
      artery,
      meshStateMetrics,
      presenceMetrics,
      organismMode: mode
    });

    lastArterySnapshot = artery;
    lastConsciousnessSnapshot = consciousness;
    lastOrganismMode = mode;

    return { artery, consciousness, mode };
  }

  // 8) OVERMIND PRIME BRIDGE (ADVISORY-ONLY)
  function emitToOvermind(eventType, payload) {
    if (!overmindPrimeBridge || typeof overmindPrimeBridge.emit !== "function") return;
    const { artery, consciousness, mode } = computeOrganismSnapshots();
    overmindPrimeBridge.emit({
      eventType,
      payload,
      organism: {
        meta: OrganismMeshMeta,
        artery,
        consciousness,
        mode
      }
    });
  }

  // 9) PREWARM — CALLS ONLY ENVS + SURVIVAL ORGANS + FIELD/ENDOCRINE SNAPSHOT
  function prewarm() {
    log("[OrganismMesh] Prewarm start");

    try {
      symbolicMeshEnv.prewarm();
      log("[OrganismMesh] Prewarmed symbolic mesh");
    } catch (e) {
      warn("[OrganismMesh] Symbolic mesh prewarm failed", { error: e.message });
    }

    try {
      binaryMeshEnv.prewarm();
      log("[OrganismMesh] Prewarmed binary mesh");
    } catch (e) {
      warn("[OrganismMesh] Binary mesh prewarm failed", { error: e.message });
    }

    try {
      survivalOrgans.prewarm();
      log("[OrganismMesh] Prewarmed survival organs");
    } catch (e) {
      warn("[OrganismMesh] Survival organs prewarm failed", { error: e.message });
    }

    computeOrganismSnapshots();
    log("[OrganismMesh] Prewarm complete");
  }

  // 10) ORGANISM ROUTES (USE ONLY ENVS PASSED IN)
  function classifyImpulse(impulse) {
    return survivalOrgans.apply(impulse);
  }

  function transmitSymbolic(from, packet, options = {}) {
    const start = PulseRealm.PulseNOW;
    try {
      const result = symbolicMeshEnv.transmit(from, packet, options);
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, false);
      return result;
    } catch (e) {
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, true);
      emitToOvermind("symbolic-transmit-error", {
        from,
        error: String(e.message || e)
      });
      throw e;
    }
  }

  function transmitBinary(from, bits, options = {}) {
    const start = PulseRealm.PulseNOW;
    try {
      const result = binaryMeshEnv.binaryMesh.transmit(from, bits, options);
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, false);
      return result;
    } catch (e) {
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, true);
      emitToOvermind("binary-transmit-error", {
        from,
        error: String(e.message || e)
      });
      throw e;
    }
  }

  // 11) v30++: 3D TOUCH HOOK
  async function on3DTouch(meta = {}) {
    if (!touch3D || typeof touch3D.on3DTouch !== "function") {
      return { ok: false, bestRoute: null };
    }
    const start = PulseRealm.PulseNOW;
    try {
      const { bestRoute } = await touch3D.on3DTouch(meta);
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, false);

      if (bestRoute.edgeId || bestRoute.satBeamId || bestRoute.meshNodeId) {
        const resourceId =
          bestRoute.edgeId || bestRoute.satBeamId || bestRoute.meshNodeId;
        meshCoordinator.markResourceReady(resourceId);
      }

      return { ok: true, bestRoute };
    } catch (e) {
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, true);
      emitToOvermind("3d-touch-error", {
        meta,
        error: String(e.message || e)
      });
      return { ok: false, bestRoute: null };
    }
  }

  // 12) v30++: DELTA MEMORY RESOLUTION HOOK
  function resolveModule(resourceId, moduleId, exportName) {
    if (!deltaMemory || typeof deltaMemory.resolve !== "function") {
      throw new Error("[OrganismMesh] deltaMemory not attached");
    }
    const start = PulseRealm.PulseNOW;
    try {
      const value = deltaMemory.resolve(moduleId, exportName);
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, false);
      meshCoordinator.markResourceReady(resourceId);
      return value;
    } catch (e) {
      const duration = PulseRealm.PulseNOW - start;
      organismArtery.recordCall(duration, true);
      emitToOvermind("delta-memory-resolve-error", {
        resourceId,
        moduleId,
        exportName,
        error: String(e.message || e)
      });
      throw e;
    }
  }

  // 13) PUBLIC ORGANISM FACADE
  function getOrganismArtery() {
    if (!lastArterySnapshot) {
      computeOrganismSnapshots();
    }
    return lastArterySnapshot;
  }

  function getOrganismConsciousness() {
    if (!lastConsciousnessSnapshot) {
      computeOrganismSnapshots();
    }
    return lastConsciousnessSnapshot;
  }

  function getOrganismMode() {
    if (!lastOrganismMode) {
      computeOrganismSnapshots();
    }
    return lastOrganismMode;
  }

  function getOrganismReport() {
    const { artery, consciousness, mode } = computeOrganismSnapshots();

    const endocrineReport = PulseMeshEndocrine.examineMesh("root", {
      presenceBand: mode,
      bluetoothPresence: {
        proximityTier:
          PulseField.read.getBluetoothProximityPressure() > 0.5 ? "near" : "far",
        linkQuality: PulseField.read.getBluetoothLinkQualityPressure(),
        events: PulseField.read.getBluetoothEvents()
      }
    });

    return Object.freeze({
      meta: OrganismMeshMeta,
      mode,
      artery,
      consciousness,
      meshState: meshState.snapshotAll(),
      field: PulseField.read.snapshot(),
      endocrine: endocrineReport
    });
  }

  return Object.freeze({
    meta: OrganismMeshMeta,

    // environments (PASSED IN)
    symbolicMeshEnv,
    binaryMeshEnv,

    // survival organs
    survivalOrgans,

    // mesh organs
    meshState,
    meshEvents,
    meshCoordinator,

    // organism intelligence
    organismArtery,
    organismConsciousness,
    organismModeEngine,

    // mesh field + endocrine v30++
    PulseField,
    PulseMeshEndocrine,

    // snapshots
    getOrganismArtery,
    getOrganismConsciousness,
    getOrganismMode,
    getOrganismReport,

    // lifecycle
    prewarm,

    // routes
    classifyImpulse,
    transmitSymbolic,
    transmitBinary,

    // overmind bridge
    emitToOvermind,

    // v30++ hooks
    on3DTouch,
    resolveModule
  });
}

export default {
  OrganismMeshMeta2,
  createOrganismMesh
};

PulseRealm.MeshOrganism = {
  OrganismMeshMeta2,
  createOrganismMesh
}
PulseRealm.PulseMeshOrganism = createOrganismMesh;