// ============================================================================
// FILE: /PulseOS/Organs/Instincts/PulseOSSurvivalInstincts-v30-IMMORTAL++++.js
// PULSE OS — v30-IMMORTAL++++-Instincts-Advantage
// “THE SURVIVAL INSTINCTS / ORGANISM IDENTITY ANCHOR”
// STRUCTURAL MEMORY • ORGANISM SIGNATURE • EVOLUTION SENTINEL
// CHUNKED ROUTE-DNA CACHE • PREWARMED MULTI-PRESENCE SNAPSHOTS
// BASELINE-SAFETY ANCHOR • RISK CLASSIFIER • ADVANTAGE-AWARE INSTINCT FIELD
// ARTERY-AWARE • PRESSURE-AWARE • DUALBAND-AWARE • BINARY-AWARE
// ============================================================================
//
// ORGAN IDENTITY (v30-IMMORTAL++++-Instincts-Advantage):
//   • Organ Type: Instincts / Structural Memory
//   • Layer: Instinct Layer (I‑Layer)
//   • Biological Analog: Survival instincts + structural organism memory
//   • System Role:
//       - Remember last safe organism configuration
//       - Detect evolution + classify risk
//       - Maintain structural baselines (safe vs. current)
//       - Prewarm structural signatures across presences / routes
//       - Provide instinct-level advantage/risk field + artery snapshot
//         to higher organs (Brain / Evolution / SpinalCord / Router)
//
// SAFETY CONTRACT (v30-IMMORTAL++++-Instincts-Advantage):
//   • Pure structural memory — NEVER mutate impulses
//   • Never compute payloads or business logic
//   • Never depend on filenames or pages
//   • Store structure, not stateful runtime
//   • Zero timestamps, zero randomness, zero timers
//   • Zero network, zero routing, zero environment access
//   • Deterministic: same snapshot → same signature
//   • Prewarm + chunking are purely structural, offline-absolute
//   • Safe for organisms that grow new layers over time
//   • Binary-aware, dual-band-aware, artery/pressure-aware (metadata-only)
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// INTERNAL MEMORY STORE (long-term structural memory + prewarm + presence)
// ============================================================================
const _store = {
  // primary organism-wide structural anchor
  pathway: null,
  signature: null,
  history: [],
  lastLearnedRouteId: null,
  evolutionCount: 0,

  // route-DNA chunk cache: { routeIdKey: { signature, pathway, core, ec, pressure } }
  routeDNACache: Object.create(null),

  // structural chunks keyed by routeIdKey (pure structural slices)
  structuralChunks: Object.create(null),

  // multi-presence structural mirrors: { presenceKey: { snapshot, signature } }
  presenceMap: Object.create(null),

  // v30: baseline safety anchor
  baseline: {
    signature: null,
    pathway: null,
    core: null,
    evolutionIndex: null
  },

  // v30: instinct-level risk + advantage + artery field (pure counters/flags)
  instinctField: {
    lastSignature: null,
    lastRiskBand: "unknown", // "safe" | "benign" | "risky" | "breaking" | "unknown"
    lastEvolutionDelta: 0,
    totalEvolutionEvents: 0,
    highPressureEvents: 0,
    meshStormEvents: 0,
    auraTensionEvents: 0,

    // v30 artery-aligned counters
    totalSnapshots: 0,
    benignSnapshots: 0,
    riskySnapshots: 0,
    breakingSnapshots: 0
  }
};

// ============================================================================
// HELPERS — cloning + signature building
// ============================================================================
function clone(obj) {
  return obj == null ? obj : JSON.parse(JSON.stringify(obj));
}

// Hybrid core: OS + GPU + Orchestrator + Brain + Router (no tiny organs)
function extractOrganismCore(snapshot = {}) {
  const core = snapshot.organismCore || snapshot.core || {};

  return {
    osKernelVersion: core.osKernelVersion || null,
    binaryKernelVersion: core.binaryKernelVersion || null,
    gpuOrganVersion: core.gpuOrganVersion || null,
    binaryGpuOrganVersion: core.binaryGpuOrganVersion || null,
    orchestratorVersion: core.orchestratorVersion || null,
    brainVersion: core.brainVersion || null,
    routerVersion: core.routerVersion || null
  };
}

function extractExecutionContext(snapshot = {}) {
  const ec = snapshot.executionContext || snapshot.gpuExecutionContext || {};
  return {
    binaryMode: ec.binaryMode || "auto",
    pipelineId: ec.pipelineId || "",
    sceneType: ec.sceneType || "",
    workloadClass: ec.workloadClass || "",
    resolution: ec.resolution || "",
    refreshRate: typeof ec.refreshRate === "number" ? ec.refreshRate : 0,
    dispatchSignature: ec.dispatchSignature || snapshot.dispatchSignature || "",
    shapeSignature: ec.shapeSignature || snapshot.shapeSignature || ""
  };
}

function extractPressure(snapshot = {}) {
  const p = snapshot.pressureSnapshot || {};
  return {
    gpuLoadPressure: typeof p.gpuLoadPressure === "number" ? p.gpuLoadPressure : 0,
    thermalPressure: typeof p.thermalPressure === "number" ? p.thermalPressure : 0,
    memoryPressure: typeof p.memoryPressure === "number" ? p.memoryPressure : 0,
    meshStormPressure: typeof p.meshStormPressure === "number" ? p.meshStormPressure : 0,
    auraTension: typeof p.auraTension === "number" ? p.auraTension : 0
  };
}

function computePathwaySignature(hops) {
  return hops
    .map((h) =>
      `${h.layerId || "X"}:${h.layerVersion || "?"}:` +
      `${h.organId || h.organ || "?"}:${h.role || "?"}`
    )
    .join("|");
}

function computeCoreSignature(core) {
  return [
    core.osKernelVersion || "?",
    core.binaryKernelVersion || "?",
    core.gpuOrganVersion || "?",
    core.binaryGpuOrganVersion || "?",
    core.orchestratorVersion || "?",
    core.brainVersion || "?",
    core.routerVersion || "?"
  ].join("/");
}

function computeExecutionContextSignature(ec) {
  return [
    ec.binaryMode || "auto",
    ec.pipelineId || "",
    ec.sceneType || "",
    ec.workloadClass || "",
    ec.resolution || "",
    ec.refreshRate || 0
  ].join(":");
}

function computePressureSignature(p) {
  return [
    p.gpuLoadPressure || 0,
    p.thermalPressure || 0,
    p.memoryPressure || 0,
    p.meshStormPressure || 0,
    p.auraTension || 0
  ].join(":");
}

// FULL organism-wide structural signature (hybrid)
function computeSignatureFromSnapshot(snapshot) {
  const hops = snapshot.pathway.hops || [];
  const pathwaySig = computePathwaySignature(hops);

  const core = extractOrganismCore(snapshot);
  const coreSig = computeCoreSignature(core);

  const ec = extractExecutionContext(snapshot);
  const ecSig = computeExecutionContextSignature(ec);

  const p = extractPressure(snapshot);
  const pSig = computePressureSignature(p);

  const dispatchSig = ec.dispatchSignature || "";
  const shapeSig = ec.shapeSignature || "";

  return [
    pathwaySig,
    coreSig,
    ecSig,
    `${dispatchSig}|${shapeSig}`,
    pSig
  ].join("#");
}

function signaturesMatch(a, b) {
  return a === b;
}

// Build a deterministic route-DNA key from snapshot / route context
function buildRouteDNAKey(routeDNA = {}) {
  const id = routeDNA.routeId || routeDNA.routeName || "";
  const band = routeDNA.modeKind || "symbolic";
  const ext = routeDNA.extensionId || "";
  const sys = routeDNA.systemId || "";
  return [id, band, ext, sys].join("::");
}

// Build a deterministic presence key
function buildPresenceKey(presenceContext = {}) {
  const device = presenceContext.deviceId || "";
  const scene = presenceContext.sceneType || "";
  const profile = presenceContext.profileId || "";
  return [device, scene, profile].join("::");
}

// Chunk structural pathway into deterministic slices (no timing, no randomness)
function chunkPathway(hops, chunkSize) {
  if (!Array.isArray(hops) || chunkSize <= 0) return [];
  const chunks = [];
  for (let i = 0; i < hops.length; i += chunkSize) {
    const slice = hops.slice(i, i + chunkSize);
    chunks.push(slice);
  }
  return chunks;
}

// v30: classify structural evolution risk band (purely structural, deterministic)
function classifyRiskBand(oldCore, newCore, oldPressure, newPressure) {
  if (!oldCore || !newCore) return "unknown";

  const coreChanged =
    oldCore.osKernelVersion !== newCore.osKernelVersion ||
    oldCore.binaryKernelVersion !== newCore.binaryKernelVersion ||
    oldCore.gpuOrganVersion !== newCore.gpuOrganVersion ||
    oldCore.binaryGpuOrganVersion !== newCore.binaryGpuOrganVersion ||
    oldCore.orchestratorVersion !== newCore.orchestratorVersion ||
    oldCore.brainVersion !== newCore.brainVersion ||
    oldCore.routerVersion !== newCore.routerVersion;

  const highPressure =
    (newPressure.gpuLoadPressure || 0) > 0.8 ||
    (newPressure.thermalPressure || 0) > 0.8 ||
    (newPressure.memoryPressure || 0) > 0.8;

  const storm =
    (newPressure.meshStormPressure || 0) > 0.7 ||
    (newPressure.auraTension || 0) > 0.7;

  if (!coreChanged && !highPressure && !storm) return "benign";
  if (coreChanged && !highPressure && !storm) return "risky";
  if (coreChanged && (highPressure || storm)) return "breaking";
  if (!coreChanged && (highPressure || storm)) return "risky";

  return "unknown";
}

// v30: update instinct field counters from pressure snapshot
function updateInstinctFieldFromPressure(pressure) {
  if (!pressure) return;

  if ((pressure.gpuLoadPressure || 0) > 0.8 ||
      (pressure.thermalPressure || 0) > 0.8 ||
      (pressure.memoryPressure || 0) > 0.8) {
    _store.instinctField.highPressureEvents += 1;
  }

  if ((pressure.meshStormPressure || 0) > 0.7) {
    _store.instinctField.meshStormEvents += 1;
  }

  if ((pressure.auraTension || 0) > 0.7) {
    _store.instinctField.auraTensionEvents += 1;
  }
}

// v30: artery buckets (aligned with other v30 organs)
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

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

// v30: instinct artery snapshot — purely structural, no time, no env
function computeInstinctArtery() {
  const f = _store.instinctField;

  const total = f.totalEvolutionEvents || 0;
  const highPressure = f.highPressureEvents || 0;
  const storms = f.meshStormEvents || 0;
  const tension = f.auraTensionEvents || 0;

  const benign = f.benignSnapshots || 0;
  const risky = f.riskySnapshots || 0;
  const breaking = f.breakingSnapshots || 0;
  const totalSnapshots = f.totalSnapshots || 0;

  const evolutionDensity = clamp01(total / 256);
  const riskDensity = clamp01((risky + breaking) / (totalSnapshots || 1));
  const pressureDensity = clamp01(
    (highPressure + storms + tension) / 256
  );

  const pressure = clamp01(
    evolutionDensity * 0.4 +
    riskDensity * 0.35 +
    pressureDensity * 0.25
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  return Object.freeze({
    evolutionCount: total,
    evolutionDensity,
    riskDensity,
    pressureDensity,

    totalSnapshots,
    benignSnapshots: benign,
    riskySnapshots: risky,
    breakingSnapshots: breaking,

    pressure,
    pressureBucket: bucketPressure(pressure),

    throughput,
    throughputBucket: bucketLevel(throughput),

    cost,
    costBucket: bucketCost(cost),

    budget,
    budgetBucket: bucketLevel(budget),

    lastRiskBand: f.lastRiskBand,
    lastSignature: f.lastSignature
  });
}

// ============================================================================
// SURVIVAL INSTINCT ENGINE — v30-IMMORTAL++++-Instincts-Advantage
// ============================================================================
export const PulseOSSurvivalInstincts = {

  meta: {
    organ: "PulseOSSurvivalInstincts",
    layer: "Instinct Layer",
    role: "Structural Memory / Organism Identity Anchor",
    version: "30-IMMORTAL++++-Instincts-Advantage",
    generation: "v30-IMMORTAL++++",
    evo: {
      driftProof: true,
      deterministicNeuron: true,
      unifiedAdvantageField: true,
      multiInstanceReady: true,
      zeroNetwork: true,
      zeroMutation: true,
      zeroTiming: true,
      futureEvolutionReady: true,

      organismWideAnchor: true,
      binaryAware: true,
      symbolicAware: true,
      gpuDispatchAware: true,
      gpuMemoryAware: true,

      multiPresenceAware: true,
      routeDNACacheAware: true,
      structuralChunkCache: true,
      prewarmReady: true,

      // v30 instinct upgrades
      baselineSafetyAnchor: true,
      evolutionRiskClassifier: true,
      pressureAwareInstinctField: true,
      arteryPressureAware: true,
      instinctArteryExport: true
    }
  },

  // --------------------------------------------------------------------------
  // RECORD IMPULSE — organism-wide structural memory only
  // --------------------------------------------------------------------------
  recordImpulse(snapshot) {
    if (!snapshot || !Array.isArray(snapshot.pathway.hops)) return;

    const hops = snapshot.pathway.hops;
    const newSignature = computeSignatureFromSnapshot(snapshot);
    const newCore = extractOrganismCore(snapshot);
    const newPressure = extractPressure(snapshot);

    updateInstinctFieldFromPressure(newPressure);

    // FIRST DISCOVERY
    if (_store.pathway == null) {
      _store.pathway = clone(hops);
      _store.signature = newSignature;

      _store.history.push({
        index: 0,
        event: "INITIAL_DISCOVERY",
        signature: newSignature,
        pathway: clone(hops),
        core: newCore,
        executionContext: extractExecutionContext(snapshot),
        pressure: newPressure,
        tickId: snapshot.tickId || null
      });

      _store.instinctField.lastSignature = newSignature;
      _store.instinctField.lastRiskBand = "benign";
      _store.instinctField.lastEvolutionDelta = 0;
      _store.instinctField.totalEvolutionEvents = 0;

      _store.instinctField.totalSnapshots += 1;
      _store.instinctField.benignSnapshots += 1;

      return;
    }

    // NO EVOLUTION
    if (signaturesMatch(_store.signature, newSignature)) {
      _store.instinctField.lastSignature = newSignature;
      _store.instinctField.totalSnapshots += 1;
      _store.instinctField.benignSnapshots += 1;
      return;
    }

    // EVOLUTION DETECTED
    const oldSignature = _store.signature;
    const oldPathway = clone(_store.pathway);
    const lastHistory = _store.history.length
      ? _store.history[_store.history.length - 1]
      : null;
    const oldCore = lastHistory ? clone(lastHistory.core) : null;
    const oldPressure = lastHistory ? clone(lastHistory.pressure) : null;

    _store.evolutionCount += 1;
    _store.instinctField.totalEvolutionEvents = _store.evolutionCount;

    const eventIndex = _store.history.length;
    const riskBand = classifyRiskBand(oldCore, newCore, oldPressure, newPressure);

    _store.history.push({
      index: eventIndex,
      event: "EVOLUTION_DETECTED",
      oldSignature,
      newSignature,
      oldPathway,
      newPathway: clone(hops),
      oldCore,
      newCore,
      executionContext: extractExecutionContext(snapshot),
      pressure: newPressure,
      riskBand,
      tickId: snapshot.tickId || null
    });

    _store.pathway = clone(hops);
    _store.signature = newSignature;

    _store.instinctField.lastSignature = newSignature;
    _store.instinctField.lastRiskBand = riskBand;
    _store.instinctField.lastEvolutionDelta = eventIndex;

    _store.instinctField.totalSnapshots += 1;
    if (riskBand === "benign") _store.instinctField.benignSnapshots += 1;
    else if (riskBand === "risky") _store.instinctField.riskySnapshots += 1;
    else if (riskBand === "breaking") _store.instinctField.breakingSnapshots += 1;
  },

  // --------------------------------------------------------------------------
  // BASELINE SAFETY ANCHOR — v30
  // --------------------------------------------------------------------------
  markBaselineSafe(snapshot) {
    if (!snapshot || !Array.isArray(snapshot.pathway.hops)) return;

    const hops = snapshot.pathway.hops;
    const sig = computeSignatureFromSnapshot(snapshot);
    const core = extractOrganismCore(snapshot);

    _store.baseline.signature = sig;
    _store.baseline.pathway = clone(hops);
    _store.baseline.core = core;
    _store.baseline.evolutionIndex = _store.history.length;

    // also sync primary anchor if not yet set
    if (_store.signature == null) {
      _store.signature = sig;
      _store.pathway = clone(hops);
    }
  },

  getBaseline() {
    return clone(_store.baseline);
  },

  isSafeAgainstBaseline(snapshot) {
    if (!_store.baseline.signature) return true;
    if (!snapshot || !Array.isArray(snapshot.pathway.hops)) return true;

    const sig = computeSignatureFromSnapshot(snapshot);
    return signaturesMatch(_store.baseline.signature, sig);
  },

  // --------------------------------------------------------------------------
  // PREWARM ENGINE — route-DNA cache + structural chunks (offline-only)
  // --------------------------------------------------------------------------
  prewarmFromRouteDNA(routeDNAList = []) {
    if (!Array.isArray(routeDNAList)) return;

    for (const item of routeDNAList) {
      const { snapshot, routeDNA, chunkSize = 8 } = item || {};
      if (!snapshot || !Array.isArray(snapshot.pathway.hops)) continue;

      const key = buildRouteDNAKey(routeDNA || {});
      const signature = computeSignatureFromSnapshot(snapshot);
      const hops = clone(snapshot.pathway.hops);

      const core = extractOrganismCore(snapshot);
      const executionContext = extractExecutionContext(snapshot);
      const pressure = extractPressure(snapshot);

      // Cache full route-DNA
      _store.routeDNACache[key] = {
        signature,
        pathway: hops,
        core,
        executionContext,
        pressure
      };

      // Chunk + cache structural slices
      const chunks = chunkPathway(hops, chunkSize);
      _store.structuralChunks[key] = chunks.map((c, idx) => ({
        chunkIndex: idx,
        hops: c
      }));
    }
  },

  getRouteDNACache(routeDNA = {}) {
    const key = buildRouteDNAKey(routeDNA);
    const entry = _store.routeDNACache[key];
    return entry ? clone(entry) : null;
  },

  getRouteChunks(routeDNA = {}) {
    const key = buildRouteDNAKey(routeDNA);
    const chunks = _store.structuralChunks[key];
    return chunks ? clone(chunks) : [];
  },

  // --------------------------------------------------------------------------
  // MULTI-PRESENCE STRUCTURAL MAP — per-device / per-scene mirrors
  // --------------------------------------------------------------------------
  registerPresence(presenceContext = {}, snapshot) {
    if (!snapshot || !Array.isArray(snapshot.pathway.hops)) return;
    const presenceKey = buildPresenceKey(presenceContext);
    const signature = computeSignatureFromSnapshot(snapshot);

    _store.presenceMap[presenceKey] = {
      presenceContext: clone(presenceContext),
      snapshot: clone(snapshot),
      signature
    };
  },

  getPresence(presenceContext = {}) {
    const presenceKey = buildPresenceKey(presenceContext);
    const entry = _store.presenceMap[presenceKey];
    return entry ? clone(entry) : null;
  },

  listPresences() {
    const result = [];
    for (const key of Object.keys(_store.presenceMap)) {
      const entry = _store.presenceMap[key];
      result.push({
        key,
        presenceContext: clone(entry.presenceContext),
        signature: entry.signature
      });
    }
    return result;
  },

  // --------------------------------------------------------------------------
  // ACCESSORS — structural memory + instinct field + artery
  // --------------------------------------------------------------------------
  getPathway() {
    return clone(_store.pathway || []);
  },

  getHistory() {
    return clone(_store.history);
  },

  getEvolutionCount() {
    return _store.evolutionCount;
  },

  hasEvolved(snapshot) {
    if (!snapshot || !Array.isArray(snapshot.pathway.hops)) return false;
    const newSignature = computeSignatureFromSnapshot(snapshot);
    return !signaturesMatch(_store.signature, newSignature);
  },

  getSignature() {
    return _store.signature || null;
  },

  getInstinctField() {
    return clone(_store.instinctField);
  },

  getInstinctArterySnapshot() {
    return computeInstinctArtery();
  },

  setLearnedRouteId(routeId) {
    _store.lastLearnedRouteId = routeId;
  },

  getLearnedRouteId() {
    return _store.lastLearnedRouteId;
  },

  // --------------------------------------------------------------------------
  // STRUCTURAL SNAPSHOT — v30 (for Brain / Evolution / Diagnostics)
// --------------------------------------------------------------------------
  getStructuralSnapshot() {
    return {
      pathway: clone(_store.pathway),
      signature: _store.signature,
      evolutionCount: _store.evolutionCount,
      baseline: clone(_store.baseline),
      instinctField: clone(_store.instinctField),
      instinctArtery: computeInstinctArtery()
    };
  },

  // --------------------------------------------------------------------------
  // CLEAR — full reset (structural memory + caches + presences)
// --------------------------------------------------------------------------
  clear() {
    _store.pathway = null;
    _store.signature = null;
    _store.history = [];
    _store.lastLearnedRouteId = null;
    _store.evolutionCount = 0;

    _store.routeDNACache = Object.create(null);
    _store.structuralChunks = Object.create(null);
    _store.presenceMap = Object.create(null);

    _store.baseline = {
      signature: null,
      pathway: null,
      core: null,
      evolutionIndex: null
    };

    _store.instinctField = {
      lastSignature: null,
      lastRiskBand: "unknown",
      lastEvolutionDelta: 0,
      totalEvolutionEvents: 0,
      highPressureEvents: 0,
      meshStormEvents: 0,
      auraTensionEvents: 0,
      totalSnapshots: 0,
      benignSnapshots: 0,
      riskySnapshots: 0,
      breakingSnapshots: 0
    };
  }
};

export default PulseOSSurvivalInstincts;
