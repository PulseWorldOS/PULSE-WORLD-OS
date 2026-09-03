// ============================================================================
//  PULSE OS v30‑IMMORTAL‑ONEBAND‑ADV++++ — NODEADMIN ORGAN
//  Network Brain • Sentinel Command • Intent + Memory Cortex
//  OVERMIND‑PRIME‑AWARE • PRESENCE/HARMONICS‑AWARE • MESH/CASTLE/EXPANSION/ROUTER/BEACON‑AWARE
//  PREWARM/CACHE/CHUNK‑AWARE • DETERMINISTIC • SYNTHETIC‑ONLY • ARTERY v6 (ONEBAND)
//  EVOLUTION‑AWARE (v30) • HEATMAP‑AWARE (v30) • SHIFTER‑AWARE • SNAPSHOT‑AWARE
//  BINARY‑FIRST ONEBAND FIELD • LOOP/WAVE/GPU/HEATMAP/EVOLUTION ARTERY FUSION
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../../_PROOF/PULSE-PROOF.js";
import { createPulseNodeEvolutionV30 as PulseNodeAdminEvolution } from "./PulseToolsNodeEvolution-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const NodeAdminMeta = Object.freeze({
  AI_EXPERIENCE_META: "NODEADMIN_V30_IMMORTAL_ONEBAND",

  // -----------------------------
  // IDENTITY BLOCK (v30 IMMORTAL)
  // -----------------------------
  identity: {
    organId: "PulseNodeAdmin-v30-IMMORTAL-ONEBAND",
    role: "NODEADMIN_ORGAN",
    layer: "NetworkBrain",
    version: "v30-IMMORTAL-ONEBAND-ADV++++",
    epoch: "IMMORTAL",
    lineage: "PulseOS/NodeAdmin",
    multiInstanceIdentity: true
  },

  // -----------------------------
  // EVO BLOCK (v30 IMMORTAL)
  // -----------------------------
  evo: {
    nodeAdmin: true,
    networkBrain: true,
    sentinelBrain: true,
    presenceIntellect: true,
    presenceAware: true,
    harmonicsAware: true,
    dualBand: true,
    oneBand: true,
    binaryAware: true,
    waveFieldAware: true,
    arteryAware: true,
    arteryV6: true,
    evolutionAware: true,
    shifterAware: true,
    heatmapAware: true,
    meshCastleExpansionAware: true,
    routerBeaconWorldCoreAware: true,
    chunkPrewarmAware: true,
    cacheAware: true,
    snapshotAware: true,
    packetAware: true,
    windowAware: true,
    gpuAware: true,
    multiSpin: true,
    timelineFlowAware: true,
    advantageAware: true
  },

  // -----------------------------
  // CONTRACT BLOCK (v30 IMMORTAL)
  // -----------------------------
  contract: {
    purpose:
      "Network brain / sentinel command organ for Pulse nodes. Scores layers, selects focus, sets mode, executes intents, integrates presence/social/earn/mesh/castle/expansion/router/beacon signals, coordinates prewarm/cache/chunk hints, and exposes reports.",
    always: [
      "remain deterministic",
      "log decisions to internal memory",
      "expose state via reports and snapshots",
      "treat backend AI as advisory only",
      "allow extension via intents, not core mutation",
      "treat presence/social/earn/mesh/castle/expansion/router/beacon as metadata-only signals",
      "treat prewarm/cache/chunk plans as hints only, not imperative commands",
      "respect oneband fusion fields"
    ],
    never: [
      "mutate external state",
      "perform network I/O directly",
      "bypass Overmind or boundaries",
      "self-modify core safety rules",
      "introduce randomness or async drift"
    ],
    deterministic: true,
    advisoryOnly: true
  },

  // -----------------------------
  // GUARANTEES BLOCK (v30 IMMORTAL)
  // -----------------------------
  guarantees: {
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutation: true,
    zeroMutationOfInput: true,
    zeroRandomness: true,
    pureCompute: true,
    windowSafe: true,
    IMMORTAL: true
  },

  // -----------------------------
  // SAFETY BLOCK (v30 IMMORTAL)
  // -----------------------------
  safety: {
    ORGANISM: "PulseWorldOS",
    Presence: true,
    Harmonics: true,
    DualBand: true,
    OneBand: true,
    Shifter: true,
    Mesh: true,
    Cortex: true,
    Organism: true,
    PulseWorld: true,
    Advantage: true,
    Binary: true,
    Wave: true,
    Sentinel: true,
    Overmind: true
  }
});

const _globalNodeAdminArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || NodeAdminMeta.organId}#${instanceIndex}`;
}



export function getGlobalNodeAdminArteries() {
  const out = {};
  for (const [k, v] of _globalNodeAdminArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

function clamp(v, min, max) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function bucket(v) {
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

// v30 ONEBAND fusion helpers
function bucketBand(v) {
  if (v >= 0.85) return "surge";
  if (v >= 0.65) return "charged";
  if (v >= 0.45) return "active";
  if (v >= 0.25) return "steady";
  if (v > 0) return "calm";
  return "idle";
}

function computeNodeAdminArteryV6({
  mode,
  tick,
  cycle,
  sentinelCount,
  soldierRegistry,
  castleLoad,
  serverLoad,
  lastExpansionPlan,
  windowMs,
  windowStart,
  instanceIndex,
  instanceCount,
  // v30+ fused fields
  presenceBand = 0,
  harmonicCohesion = 0,
  harmonicDrift = 0,
  dualBandInfluence = 0,
  gpuHeat = 0,
  gpuWarpStress = 0,
  loopArtery = null,
  waveArtery = null,
  heatmapAdvantage = null,
  evolutionAdvantage = null
}) {
  const now = PulseRealm.PulseNOW;
  const elapsedMs = Math.max(1, now - windowStart);

  const soldierCount = Object.keys(soldierRegistry).length;
  const castleIds = Object.keys(castleLoad);
  const serverIds = Object.keys(serverLoad);

  const avgCastleLoad =
    castleIds.length === 0
      ? 0
      : castleIds.reduce((sum, id) => sum + (castleLoad[id] || 0), 0) /
        castleIds.length;

  const avgServerLoad =
    serverIds.length === 0
      ? 0
      : serverIds.reduce((sum, id) => sum + (serverLoad[id] || 0), 0) /
        serverIds.length;

  const expansionIntensity =
    lastExpansionPlan && Array.isArray(lastExpansionPlan.expansions)
      ? clamp01(lastExpansionPlan.expansions.length / 32)
      : 0;

  const modePressureBase =
    mode === "boost"
      ? 0.8
      : mode === "scan"
      ? 0.6
      : mode === "guard"
      ? 0.5
      : mode === "presence"
      ? 0.4
      : mode === "cool"
      ? 0.2
      : 0.1;

  const soldierPressure = clamp01(soldierCount / 256);
  const castlePressure = clamp01(avgCastleLoad);
  const serverPressure = clamp01(avgServerLoad);

  const pressure = clamp01(
    modePressureBase * 0.25 +
      soldierPressure * 0.15 +
      castlePressure * 0.15 +
      serverPressure * 0.15 +
      expansionIntensity * 0.10 +
      clamp01(gpuHeat * 0.10 + gpuWarpStress * 0.10)
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  const oneBandEnergy = clamp01(
    presenceBand * 0.4 +
      harmonicCohesion * 0.3 +
      (1 - Math.abs(harmonicDrift)) * 0.2 +
      dualBandInfluence * 0.1
  );

  const oneBandSignature = {
    energy: oneBandEnergy,
    bandBucket: bucketBand(oneBandEnergy),
    presenceBand,
    harmonicCohesion,
    harmonicDrift,
    dualBandInfluence,
    gpuHeat: clamp01(gpuHeat),
    gpuWarpStress: clamp01(gpuWarpStress)
  };

  const loopView = loopArtery || {};
  const waveView = waveArtery || {};
  const heatmapView = heatmapAdvantage || {};
  const evolutionView = evolutionAdvantage || {};

  return Object.freeze({
    meta: NodeAdminMeta,
    version: "v30-IMMORTAL-ONEBAND",
    instanceIndex,
    instanceCount,
    windowMs,
    elapsedMs,
    mode,
    tick,
    cycle,

    sentinels: {
      count: sentinelCount
    },
    soldiers: {
      count: soldierCount
    },
    castles: {
      count: castleIds.length,
      avgLoad: avgCastleLoad
    },
    servers: {
      count: serverIds.length,
      avgLoad: avgServerLoad
    },
    expansion: {
      hasPlan: !!lastExpansionPlan,
      expansionIntensity
    },

    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucket(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucket(budget),

    oneBand: oneBandSignature,

    loopArtery: {
      mode: loopView.lastMode || null,
      load: loopView.load || 0,
      loadBucket: loopView.loadBucket || "idle",
      pressure: loopView.pressure || 0,
      pressureBucket: loopView.pressureBucket || "none"
    },

    waveArtery: {
      mode: waveView.lastMode || null,
      load: waveView.load || 0,
      loadBucket: waveView.loadBucket || "idle",
      pressure: waveView.pressure || 0,
      pressureBucket: waveView.pressureBucket || "none",
      harmonicLoad: waveView.harmonicLoad || 0,
      harmonicLoadBucket: waveView.harmonicLoadBucket || "none"
    },

    heatmapAdvantage: {
      envType: heatmapView.envType || null,
      advantageScore: heatmapView.advantageScore || 0
    },

    evolutionAdvantage: {
      advantageScore: evolutionView.advantageScore || 0,
      fallbackBand: evolutionView.fallbackBand || "fallback-normal"
    }
  });
}

let _nodeAdminInstanceCount = 0;

const _nodeAdminEvolution = PulseNodeAdminEvolution({
  nodeType: "admin",
  trace: false
});

export function createPulseNodeAdmin({
  trace = false,
  instances = 3,
  backendInterpreter = null,
  overmindBridge = null
} = {}) {
  const instanceIndex = _nodeAdminInstanceCount++;
  const instanceId = `${NodeAdminMeta.organId}#${instanceIndex}`;
  const nodeType = "admin";

  let mode = "idle"; // "idle" | "scan" | "boost" | "cool" | "guard" | "presence"
  let tick = 0;
  let cycle = 0;
  let lastExpansionPlan = null;

  const sentinels = Array.from({ length: instances }, (_, i) => ({
    id: i,
    phase: (Math.PI * 2 * i) / instances,
    energy: 0.5,
    loopIndex: 0,
    frequency: 1.0,
    wavelength: 1.0
  }));

  const memory = {
    events: [],
    lastReport: null,
    lastAdvice: null,
    lastSentinels: []
  };

  const intentHandlers = Object.create(null);
  let backend = backendInterpreter;
  let overmind = overmindBridge;
  let beaconEngine = null;

  const presenceDeps = {
    PresenceJobView: null,
    PulseWorldSocialGraph: null,
    PowerUserRanking: null,
    SystemClock: null
  };

  let meshSnapshot = null;
  let castleSnapshot = null;
  let expansionSnapshot = null;
  let routerSnapshot = null;
  let beaconSnapshot = null;
  let worldCoreSnapshot = null;

  const soldierRegistry = Object.create(null);
  const castleLoad = Object.create(null);
  const serverLoad = Object.create(null);

  const perfHints = {
    prewarm: {
      castle: null,
      expansion: null,
      mesh: null,
      router: null,
      worldCore: null
    },
    cache: {
      castle: null,
      expansion: null,
      mesh: null,
      router: null,
      worldCore: null
    },
    chunk: {
      castle: null,
      expansion: null,
      mesh: null,
      router: null,
      worldCore: null
    }
  };

  let _windowStart = PulseRealm.PulseNOW;
  const windowMs = 60000;

  // ONEBAND fused state (fed from other organs / snapshots)
  let _oneBandPresence = 0;
  let _oneBandCohesion = 0;
  let _oneBandDrift = 0;
  let _dualBandInfluence = 0;
  let _gpuHeat = 0;
  let _gpuWarpStress = 0;
  let _loopArterySnapshot = null;
  let _waveArterySnapshot = null;
  let _heatmapAdvantageSnapshot = null;
  let _evolutionAdvantageSnapshot = null;

  function evolveAdminPulse(pulse, extraCtx = {}) {
    if (
      !_nodeAdminEvolution ||
      typeof _nodeAdminEvolution.evolveNodePulse !== "function"
    ) {
      return pulse;
    }
    const context = {
      instanceId,
      instanceIndex,
      nodeType,
      mode,
      tick,
      cycle,
      perfHints,
      meshSnapshot,
      castleSnapshot,
      expansionSnapshot,
      routerSnapshot,
      beaconSnapshot,
      worldCoreSnapshot,
      artery: getNodeAdminArtery(),
      lastAdvice: memory.lastAdvice,
      oneBand: {
        presenceBand: _oneBandPresence,
        harmonicCohesion: _oneBandCohesion,
        harmonicDrift: _oneBandDrift,
        dualBandInfluence: _dualBandInfluence
      },
      ...extraCtx
    };
    return _nodeAdminEvolution.evolveNodePulse({
      nodeType,
      pulse,
      context
    });
  }

  function remember(type, data) {
    const entry = {
      type,
      timestamp: PulseRealm.PulseNOW,
      data
    };
    memory.events.push(entry);
    if (memory.events.length > 500) {
      memory.events.shift();
    }
    return entry;
  }

  function getMemory({ limit = 50, type = null } = {}) {
    const filtered = type
      ? memory.events.filter((e) => e.type === type)
      : memory.events;
    return filtered.slice(-limit);
  }

  function emitToOvermind(eventType, payload) {
    if (!overmind || typeof overmind.emit !== "function") return;
    overmind.emit({
      organId: NodeAdminMeta.organId,
      eventType,
      payload,
      snapshot: getStateSnapshot()
    });
  }

  function attachOvermindBridge(bridge) {
    overmind = bridge || null;
    const evt = remember("overmind-bridge-set", { hasBridge: !!bridge });
    emitToOvermind("overmind-bridge-set", evt);
  }

  function applyDirective(directive) {
    if (!directive || typeof directive !== "object") {
      return { ok: false, reason: "invalid-directive" };
    }
    const { mode: nextMode, intentName, intentPayload } = directive;
    let modeChanged = false;
    let intentResult = null;

    if (nextMode && typeof nextMode === "string") {
      setMode(nextMode);
      modeChanged = true;
    }

    if (intentName && typeof intentName === "string") {
      intentResult = executeIntent(intentName, intentPayload || {});
    }

    const result = { ok: true, modeChanged, intentResult };
    remember("directive-applied", { directive, result });
    emitToOvermind("directive-applied", { directive, result });
    return result;
  }

  function registerIntent(name, handler) {
    intentHandlers[name] = handler;
    const evt = remember("intent-registered", { name });
    emitToOvermind("intent-registered", evt);
  }

  function executeIntent(name, payload = {}) {
    const handler = intentHandlers[name];
    if (!handler) {
      if (trace) console.warn("[NodeAdmin] Unknown intent:", name);
      const evt = remember("intent-missing", { name, payload });
      emitToOvermind("intent-missing", evt);
      return { ok: false, error: "unknown-intent" };
    }
    if (trace) console.log("[NodeAdmin] Executing intent:", name, payload);
    const result = handler({ mode, sentinels, payload });
    const evt = remember("intent-executed", { name, payload, result });
    emitToOvermind("intent-executed", evt);
    return { ok: true, result };
  }

  function setBackendInterpreter(fn) {
    backend = fn;
    const evt = remember("backend-set", { hasBackend: !!fn });
    emitToOvermind("backend-set", evt);
  }

  function setPresenceIntegrations({
    PresenceJobView = null,
    PulseWorldSocialGraph = null,
    PowerUserRanking = null,
    SystemClock = null
  } = {}) {
    presenceDeps.PresenceJobView = PresenceJobView;
    presenceDeps.PulseWorldSocialGraph = PulseWorldSocialGraph;
    presenceDeps.PowerUserRanking = PowerUserRanking;
    presenceDeps.SystemClock = SystemClock;
    const evt = remember("presence-integrations-set", {
      hasPresenceJobView: !!PresenceJobView,
      hasSocialGraph: !!PulseWorldSocialGraph,
      hasPowerUserRanking: !!PowerUserRanking,
      hasSystemClock: !!SystemClock
    });
    emitToOvermind("presence-integrations-set", evt);
  }

  function setMeshSnapshot(snapshot) {
    meshSnapshot = snapshot || null;
    const evt = remember("mesh-snapshot-set", { hasSnapshot: !!snapshot });
    emitToOvermind("mesh-snapshot-set", evt);
    return { ok: true };
  }

  function setCastleSnapshot(snapshot) {
    castleSnapshot = snapshot || null;
    if (snapshot && snapshot.castlesById) {
      for (const [castleId, c] of Object.entries(snapshot.castlesById)) {
        const loadIndex = c.presenceField.loadIndex;
        if (typeof loadIndex === "number") {
          castleLoad[castleId] = loadIndex;
        }
      }
    }
    const evt = remember("castle-snapshot-set", {
      hasSnapshot: !!snapshot,
      castleCount: snapshot.castlesById
        ? Object.keys(snapshot.castlesById).length
        : 0
    });
    emitToOvermind("castle-snapshot-set", evt);
    return { ok: true };
  }

  function setExpansionSnapshot(snapshot) {
    expansionSnapshot = snapshot || null;
    if (snapshot && snapshot.plan) {
      cycle++;
      lastExpansionPlan = snapshot.plan;
    }
    const evt = remember("expansion-snapshot-set", {
      hasSnapshot: !!snapshot,
      cycle,
      hasPlan: !!(snapshot && snapshot.plan)
    });
    emitToOvermind("expansion-snapshot-set", evt);
    return { ok: true };
  }

  function setRouterSnapshot(snapshot) {
    routerSnapshot = snapshot || null;
    const evt = remember("router-snapshot-set", { hasSnapshot: !!snapshot });
    emitToOvermind("router-snapshot-set", evt);
    return { ok: true };
  }

  function setBeaconSnapshot(snapshot) {
    beaconSnapshot = snapshot || null;
    const evt = remember("beacon-snapshot-set", { hasSnapshot: !!snapshot });
    emitToOvermind("beacon-snapshot-set", evt);
    return { ok: true };
  }

  function setWorldCoreSnapshot(snapshot) {
    worldCoreSnapshot = snapshot || null;
    const evt = remember("worldcore-snapshot-set", { hasSnapshot: !!snapshot });
    emitToOvermind("worldcore-snapshot-set", evt);
    return { ok: true };
  }

  function setPrewarmHints({ castle, expansion, mesh, router, worldCore } = {}) {
    if (castle !== undefined) perfHints.prewarm.castle = castle;
    if (expansion !== undefined) perfHints.prewarm.expansion = expansion;
    if (mesh !== undefined) perfHints.prewarm.mesh = mesh;
    if (router !== undefined) perfHints.prewarm.router = router;
    if (worldCore !== undefined) perfHints.prewarm.worldCore = worldCore;
    const evt = remember("prewarm-hints-set", { prewarm: perfHints.prewarm });
    emitToOvermind("prewarm-hints-set", evt);
    return { ok: true };
  }

  function setCacheHints({ castle, expansion, mesh, router, worldCore } = {}) {
    if (castle !== undefined) perfHints.cache.castle = castle;
    if (expansion !== undefined) perfHints.cache.expansion = expansion;
    if (mesh !== undefined) perfHints.cache.mesh = mesh;
    if (router !== undefined) perfHints.cache.router = router;
    if (worldCore !== undefined) perfHints.cache.worldCore = worldCore;
    const evt = remember("cache-hints-set", { cache: perfHints.cache });
    emitToOvermind("cache-hints-set", evt);
    return { ok: true };
  }

  function setChunkHints({ castle, expansion, mesh, router, worldCore } = {}) {
    if (castle !== undefined) perfHints.chunk.castle = castle;
    if (expansion !== undefined) perfHints.chunk.expansion = expansion;
    if (mesh !== undefined) perfHints.chunk.mesh = mesh;
    if (router !== undefined) perfHints.chunk.router = router;
    if (worldCore !== undefined) perfHints.chunk.worldCore = worldCore;
    const evt = remember("chunk-hints-set", { chunk: perfHints.chunk });
    emitToOvermind("chunk-hints-set", evt);
    return { ok: true };
  }

  function setMode(nextMode) {
    mode = nextMode;
    const evt = remember("mode-change", { mode });
    if (trace) console.log("[NodeAdmin] mode:", mode);
    emitToOvermind("mode-change", evt);
  }

  function getMode() {
    return mode;
  }

  function updateSentinels(maxLoopIndex) {
    tick++;
    const results = [];
    for (let i = 0; i < sentinels.length; i++) {
      const s = sentinels[i];
      const baseLoop = (tick + i * 7) % maxLoopIndex;
      const basePhase = s.phase + tick * 0.05;

      let frequency = 1.0;
      let wavelength = 1.0;

      if (mode === "scan") {
        frequency = 0.4;
        wavelength = 1.6;
      } else if (mode === "boost") {
        frequency = 1.8;
        wavelength = 0.7;
      } else if (mode === "cool") {
        frequency = 0.3;
        wavelength = 1.8;
      } else if (mode === "guard") {
        frequency = 1.0;
        wavelength = 1.0;
        const edgeBias = i % 2 === 0 ? 0 : maxLoopIndex - 1;
        s.loopIndex = edgeBias;
      } else if (mode === "presence") {
        frequency = 1.2;
        wavelength = 1.0;
      }

      if (mode !== "guard") {
        s.loopIndex = baseLoop;
      }

      const phase = basePhase * frequency;
      let energy = 0.5 + 0.4 * Math.sin(phase / wavelength);
      s.energy = clamp(energy, 0, 1);
      s.frequency = frequency;
      s.wavelength = wavelength;

      results.push({
        id: s.id,
        loopIndex: s.loopIndex,
        energy: s.energy,
        phase,
        frequency,
        wavelength
      });
    }
    memory.lastSentinels = results;
    const evt = remember("sentinels-updated", { mode, results });
    if (trace) console.log("[NodeAdmin] sentinels:", results);
    emitToOvermind("sentinels-updated", evt);
    return results;
  }

  function presenceAwareMode(entryNodeId, context = {}) {
    const { PresenceJobView } = presenceDeps;
    if (!PresenceJobView) return "idle";
    const jobView = PresenceJobView.build(entryNodeId, context);
    const nearby = jobView.nearbyPresence || [];
    const powerCount = nearby.filter((p) => p.powerUser).length;
    const newCount = nearby.filter((p) => p.ageCategory === "new").length;
    if (powerCount >= 3) return "boost";
    if (newCount >= 3) return "scan";
    if (jobView.stability > 0.8 && jobView.drift < 0.2) {
      return "cool";
    }
    return "idle";
  }

  function socialFocus(entryNodeId, context = {}) {
    const { PulseWorldSocialGraph } = presenceDeps;
    if (!PulseWorldSocialGraph) return "node";
    const snapshot = PulseWorldSocialGraph.snapshot();
    const nodes = snapshot.nodes || [];
    const edges = snapshot.edges || [];
    const clusterEdges = edges.filter((e) => e.type === "presence");
    const jobEdges = edges.filter((e) => e.type === "job");
    const mentorEdges = edges.filter((e) => e.type === "mentor_request");
    const clusterDensity = clusterEdges.length / Math.max(nodes.length, 1);
    const jobFlow = jobEdges.length;
    const mentorshipFlow = mentorEdges.length;
    if (clusterDensity > 5) return "town";
    if (jobFlow > 10) return "home";
    if (mentorshipFlow > 5) return "body";
    return "node";
  }

  function earnReadiness(context = {}) {
    const impulse = context.impulse;
    if (!impulse || !impulse.flags) return "unknown";
    const ctx = impulse.flags.earner_context || {};
    const urgency = ctx.urgency || 1;
    const volatility = ctx.volatility || 0;
    if (urgency > 1.0 && volatility < 0.05) return "high";
    if (urgency > 0.7) return "medium";
    return "low";
  }

  function reproductionTrigger(entryNodeId, context = {}) {
    const { PresenceJobView } = presenceDeps;
    if (!PresenceJobView) return "none";
    const jobView = PresenceJobView.build(entryNodeId, context);
    const nearby = jobView.nearbyPresence || [];
    const newCount = nearby.filter((p) => p.ageCategory === "new").length;
    if (newCount >= 5) return "spawn-node";
    const powerCount = nearby.filter((p) => p.powerUser).length;
    if (powerCount >= 3) return "spawn-advanced-node";
    return "none";
  }

  function powerUserInfluence(entryNodeId, context = {}) {
    const { PresenceJobView, PowerUserRanking } = presenceDeps;
    if (!PresenceJobView || !PowerUserRanking) return null;
    const jobView = PresenceJobView.build(entryNodeId, context);
    const ranked = PowerUserRanking.rankNearby(jobView.nearbyPresence || []);
    const top = ranked[0];
    if (!top) return null;
    return {
      uid: top.uid,
      displayName: top.displayName,
      rankScore: top.rankScore,
      presenceBand: top.presenceBand,
      systemAge: top.systemAge
    };
  }

  function meshAdvice() {
    if (!meshSnapshot) return null;
    const m = meshSnapshot.DensityHealth.A_metrics || meshSnapshot.metrics || {};
    const pressure = m.meshPressureIndex ?? 0;
    const strength = m.meshStrength || "unknown";

    let status = "normal";
    if (pressure >= 70) status = "high-pressure";
    else if (pressure >= 40) status = "elevated";

    const advice = { meshPressureIndex: pressure, meshStrength: strength, status };
    remember("mesh-advice", advice);
    return advice;
  }

  function castleAdvice() {
    if (!castleSnapshot) return null;
    const state = castleSnapshot.State.A_baseline || castleSnapshot.state || {};
    const load = state.loadLevel || "unknown";
    const meshSupport = state.meshSupportLevel ?? 0;
    let status = "normal";
    if (load === "high" || load === "critical") status = "overloaded";
    const advice = { loadLevel: load, meshSupportLevel: meshSupport, status };
    remember("castle-advice", advice);
    return advice;
  }

  function expansionAdvice() {
    if (!expansionSnapshot) return null;
    const need =
      expansionSnapshot.MeshBrain.B_expansionRules.expansionNeed ||
      expansionSnapshot.expansionNeed ||
      "unknown";
    const routeStable = expansionSnapshot.routeField.routeStable ?? null;
    const advice = { expansionNeed: need, routeStable };
    remember("expansion-advice", advice);
    return advice;
  }

  function routerAdvice() {
    if (!routerSnapshot) return null;
    const r = routerSnapshot.routeField || routerSnapshot.metrics || {};
    const stable = r.routeStable ?? r.stable ?? null;
    const errorRate = r.errorRate ?? r.routeErrorRate ?? 0;
    const hops = r.avgHops ?? r.hops ?? null;
    let status = "unknown";
    if (stable === true && errorRate < 0.01) status = "stable";
    else if (stable === false || errorRate > 0.05) status = "unstable";
    else status = "degraded";
    const advice = { routeStable: stable, errorRate, hops, status };
    remember("router-advice", advice);
    return advice;
  }

  function beaconAdvice() {
    if (!beaconSnapshot) return null;
    const presenceField =
      beaconSnapshot.presenceField || beaconSnapshot.presence || {};
    const advantageField =
      beaconSnapshot.advantageField || beaconSnapshot.advantage || {};
    const bandSignature = beaconSnapshot.bandSignature || null;
    const binaryField = beaconSnapshot.binaryField || null;
    const waveField = beaconSnapshot.waveField || null;
    const fallbackBandLevel = beaconSnapshot.globalHints.fallbackBandLevel ?? 0;
    const advice = {
      presenceField,
      advantageField,
      bandSignature,
      binaryField,
      waveField,
      fallbackBandLevel
    };
    remember("beacon-advice", advice);
    return advice;
  }

  function worldCoreAdvice() {
    if (!worldCoreSnapshot) return null;
    const mode = worldCoreSnapshot.mode || worldCoreSnapshot.stateMode || "unknown";
    const load = worldCoreSnapshot.loadLevel || worldCoreSnapshot.load || "unknown";
    let status = "normal";
    if (load === "high" || load === "critical") status = "stressed";
    const advice = { mode, loadLevel: load, status };
    remember("worldcore-advice", advice);
    return advice;
  }

  function scoreLayer(summary) {
    if (!summary) return 0;
    const d = Number(summary.densityAvg || 0);
    const c = Number(summary.contrastAvg || 0);
    const w = Number(summary.waveAvg || 0);
    return clamp((d + c + w) / 3, 0, 1);
  }

  function analyzeAndAdvise({
    body,
    home,
    town,
    node,
    flags,
    entryNodeId,
    context
  } = {}) {
    const scores = {
      body: scoreLayer(body),
      home: scoreLayer(home),
      town: scoreLayer(town),
      node: scoreLayer(node)
    };

    let topLayer = "body";
    let topScore = scores.body;
    for (const key of ["home", "town", "node"]) {
      if (scores[key] > topScore) {
        topScore = scores[key];
        topLayer = key;
      }
    }

    const hasHighFlags = (flags || []).some((f) => f.severity === "high");
    const hasMediumFlags = (flags || []).some((f) => f.severity === "medium");

    let suggestedMode = "idle";
    if (hasHighFlags || topScore > 0.75) {
      suggestedMode = "boost";
    } else if (hasMediumFlags || topScore > 0.5) {
      suggestedMode = "scan";
    } else if (topScore < 0.2) {
      suggestedMode = "cool";
    }

    const presenceModeValue = presenceAwareMode(entryNodeId, context || {});
    const socialFocusValue = socialFocus(entryNodeId, context || {});
    const earnReadyValue = earnReadiness(context || {});
    const reproductionValue = reproductionTrigger(entryNodeId, context || {});
    const influenceValue = powerUserInfluence(entryNodeId, context || {});
    const meshInfo = meshAdvice();
    const castleInfo = castleAdvice();
    const expansionInfo = expansionAdvice();
    const routerInfo = routerAdvice();
    const beaconInfo = beaconAdvice();
    const worldCoreInfo = worldCoreAdvice();

    const advice = {
      focusLayer: topLayer,
      focusScore: topScore,
      suggestedMode,
      scores,
      hasHighFlags,
      hasMediumFlags,
      presenceMode: presenceModeValue,
      socialFocus: socialFocusValue,
      earnReadiness: earnReadyValue,
      reproductionTrigger: reproductionValue,
      powerUserInfluence: influenceValue,
      mesh: meshInfo,
      castle: castleInfo,
      expansion: expansionInfo,
      router: routerInfo,
      beacon: beaconInfo,
      worldCore: worldCoreInfo,
      prewarmHints: perfHints.prewarm,
      cacheHints: perfHints.cache,
      chunkHints: perfHints.chunk
    };

    memory.lastAdvice = advice;
    const evt = remember("advice", advice);
    remember("presence-advice", {
      presenceMode: presenceModeValue,
      socialFocus: socialFocusValue
    });
    remember("earn-advice", { earnReadiness: earnReadyValue });
    remember("reproduction-advice", { reproductionTrigger: reproductionValue });
    if (trace) console.log("[NodeAdmin] advice:", advice);
    emitToOvermind("advice", evt);
    return advice;
  }

  function getReport() {
    const report = {
      organId: NodeAdminMeta.organId,
      mode,
      tick,
      cycle,
      sentinels: memory.lastSentinels,
      lastAdvice: memory.lastAdvice,
      memoryEvents: memory.events.slice(-20),
      meshSnapshot,
      castleSnapshot,
      expansionSnapshot,
      routerSnapshot,
      beaconSnapshot,
      worldCoreSnapshot,
      perfHints,
      soldierRegistry,
      castleLoad,
      serverLoad,
      lastExpansionPlan
    };
    memory.lastReport = report;
    const evt = remember("report", report);
    emitToOvermind("report", evt);
    return report;
  }

  function getStateSnapshot() {
    return Object.freeze({
      organId: NodeAdminMeta.organId,
      mode,
      tick,
      cycle,
      sentinelCount: sentinels.length,
      lastAdvice: memory.lastAdvice,
      lastSentinels: memory.lastSentinels,
      soldierRegistry,
      castleLoad,
      serverLoad,
      lastExpansionPlan,
      oneBand: {
        presenceBand: _oneBandPresence,
        harmonicCohesion: _oneBandCohesion,
        harmonicDrift: _oneBandDrift,
        dualBandInfluence: _dualBandInfluence
      }
    });
  }

  function getNodeAdminArtery() {
    const artery = computeNodeAdminArteryV6({
      mode,
      tick,
      cycle,
      sentinelCount: sentinels.length,
      soldierRegistry,
      castleLoad,
      serverLoad,
      lastExpansionPlan,
      windowMs,
      windowStart: _windowStart,
      instanceIndex,
      instanceCount: _nodeAdminInstanceCount,
      presenceBand: _oneBandPresence,
      harmonicCohesion: _oneBandCohesion,
      harmonicDrift: _oneBandDrift,
      dualBandInfluence: _dualBandInfluence,
      gpuHeat: _gpuHeat,
      gpuWarpStress: _gpuWarpStress,
      loopArtery: _loopArterySnapshot,
      waveArtery: _waveArterySnapshot,
      heatmapAdvantage: _heatmapAdvantageSnapshot,
      evolutionAdvantage: _evolutionAdvantageSnapshot
    });
    const key = _registryKey(instanceId, instanceIndex);
    _globalNodeAdminArteryRegistry.set(key, artery);
    return artery;
  }

  // v30 ONEBAND: allow external organs to feed fused metrics
  function setOneBandFusion({
    presenceBand = null,
    harmonicCohesion = null,
    harmonicDrift = null,
    dualBandInfluence = null,
    gpuHeat = null,
    gpuWarpStress = null,
    loopArtery = null,
    waveArtery = null,
    heatmapAdvantage = null,
    evolutionAdvantage = null
  } = {}) {
    if (presenceBand != null) _oneBandPresence = clamp01(presenceBand);
    if (harmonicCohesion != null) _oneBandCohesion = clamp01(harmonicCohesion);
    if (harmonicDrift != null) _oneBandDrift = clamp01(harmonicDrift);
    if (dualBandInfluence != null) _dualBandInfluence = clamp01(dualBandInfluence);
    if (gpuHeat != null) _gpuHeat = clamp01(gpuHeat);
    if (gpuWarpStress != null) _gpuWarpStress = clamp01(gpuWarpStress);
    if (loopArtery != null) _loopArterySnapshot = loopArtery;
    if (waveArtery != null) _waveArterySnapshot = waveArtery;
    if (heatmapAdvantage != null) _heatmapAdvantageSnapshot = heatmapAdvantage;
    if (evolutionAdvantage != null) _evolutionAdvantageSnapshot = evolutionAdvantage;

    const evt = remember("oneband-fusion-set", {
      presenceBand: _oneBandPresence,
      harmonicCohesion: _oneBandCohesion,
      harmonicDrift: _oneBandDrift,
      dualBandInfluence: _dualBandInfluence,
      gpuHeat: _gpuHeat,
      gpuWarpStress: _gpuWarpStress
    });
    emitToOvermind("oneband-fusion-set", evt);
    return { ok: true };
  }

  function getAbilities() {
    return {
      version: "v30-IMMORTAL-ONEBAND",
      modes: ["idle", "scan", "boost", "cool", "guard", "presence"],
      intents: Object.keys(intentHandlers),
      features: [
        "binary-first oneband fusion (presence + harmonics + dual-band + GPU)",
        "multi-sentinel circling",
        "mode-based frequency/wavelength modulation",
        "layer scoring + focus selection",
        "advice engine (suggested mode + focus)",
        "intent execution (AIS++)",
        "custom message interpretation",
        "expansion-plan awareness",
        "soldier-delegation awareness",
        "castle-load map",
        "server-load map",
        "band/binary/wave awareness",
        "advantage-field awareness",
        "backend AI bridge",
        "memory log + reports",
        "Overmind directive bridge",
        "state snapshot export",
        "presence-aware mode selection",
        "social-graph-aware focus selection",
        "earn-readiness awareness",
        "reproduction trigger awareness",
        "power-user influence awareness",
        "mesh-pressure awareness",
        "castle-load awareness",
        "expansion-need awareness",
        "route-stability awareness",
        "beacon presence/advantage/fallback awareness",
        "worldCore UI/load awareness",
        "prewarm hint coordination",
        "cache hint coordination",
        "chunk hint coordination",
        "nodeAdmin artery v6 oneband snapshots",
        "evolution-layer v30 shifter-first integration",
        "heatmap v30 awareness (via snapshots/intellect)",
        "loop/wave artery fusion into oneband field"
      ]
    };
  }

  function getManual() {
    return {
      meta: NodeAdminMeta,
      version: "v30-IMMORTAL-ONEBAND",
      description: "NodeAdmin is the network brain / sentinel command organ (oneband v30).",
      usage: {
        setMode:
          "nodeAdmin.setMode('scan' | 'boost' | 'cool' | 'guard' | 'presence' | 'idle')",
        analyzeAndAdvise:
          "nodeAdmin.analyzeAndAdvise({ body, home, town, node, flags, entryNodeId, context })",
        getReport: "nodeAdmin.getReport()",
        getStateSnapshot: "nodeAdmin.getStateSnapshot()",
        getNodeAdminArtery: "nodeAdmin.getNodeAdminArtery()",
        registerIntent:
          "nodeAdmin.registerIntent('intentName', ({ mode, sentinels, payload }) => result)",
        applyDirective:
          "nodeAdmin.applyDirective({ mode?, intentName?, intentPayload? })",
        setPresenceIntegrations:
          "nodeAdmin.setPresenceIntegrations({ PresenceJobView, PulseWorldSocialGraph, PowerUserRanking, SystemClock })",
        setMeshSnapshot: "nodeAdmin.setMeshSnapshot(snapshot)",
        setCastleSnapshot: "nodeAdmin.setCastleSnapshot(snapshot)",
        setExpansionSnapshot: "nodeAdmin.setExpansionSnapshot(snapshot)",
        setRouterSnapshot: "nodeAdmin.setRouterSnapshot(snapshot)",
        setBeaconSnapshot: "nodeAdmin.setBeaconSnapshot(snapshot)",
        setWorldCoreSnapshot: "nodeAdmin.setWorldCoreSnapshot(snapshot)",
        setPrewarmHints:
          "nodeAdmin.setPrewarmHints({ castle, expansion, mesh, router, worldCore })",
        setCacheHints:
          "nodeAdmin.setCacheHints({ castle, expansion, mesh, router, worldCore })",
        setChunkHints:
          "nodeAdmin.setChunkHints({ castle, expansion, mesh, router, worldCore })",
        setOneBandFusion:
          "nodeAdmin.setOneBandFusion({ presenceBand, harmonicCohesion, harmonicDrift, dualBandInfluence, gpuHeat, gpuWarpStress, loopArtery, waveArtery, heatmapAdvantage, evolutionAdvantage })"
      }
    };
  }

  return Object.freeze({
    meta: NodeAdminMeta,
    instanceIndex,
    instanceId,
    setMode,
    getMode,
    updateSentinels,
    setPresenceIntegrations,
    setMeshSnapshot,
    setCastleSnapshot,
    setExpansionSnapshot,
    setRouterSnapshot,
    setBeaconSnapshot,
    setWorldCoreSnapshot,
    setPrewarmHints,
    setCacheHints,
    setChunkHints,
    registerIntent,
    executeIntent,
    setBackendInterpreter,
    attachOvermindBridge,
    applyDirective,
    getReport,
    getStateSnapshot,
    getNodeAdminArtery,
    getMemory,
    analyzeAndAdvise,
    evolveAdminPulse,
    getAbilities,
    getManual,
    setOneBandFusion
  });
}

export const PulseNodeAdmin = (() => {
  let _instanceCount = 0;

  const create = ({
    trace = false,
    instances = 3,
    backendInterpreter = null,
    overmindBridge = null
  } = {}) => {

    const instanceIndex = _instanceCount++;
    const instanceId = `${NodeAdminMeta.organId}#${instanceIndex}`;
    const nodeType = "admin";

    // -------------------------------------------------------
    // INTERNAL STATE
    // -------------------------------------------------------
    let mode = "idle";
    let tick = 0;
    let cycle = 0;
    let lastExpansionPlan = null;

    const sentinels = Array.from({ length: instances }, (_, i) => ({
      id: i,
      phase: (Math.PI * 2 * i) / instances,
      energy: 0.5,
      loopIndex: 0,
      frequency: 1.0,
      wavelength: 1.0
    }));

    const memory = {
      events: [],
      lastReport: null,
      lastAdvice: null,
      lastSentinels: []
    };

    const intentHandlers = Object.create(null);

    let backend = backendInterpreter;
    let overmind = overmindBridge;
    let beaconEngine = null;

    const presenceDeps = {
      PresenceJobView: null,
      PulseWorldSocialGraph: null,
      PowerUserRanking: null,
      SystemClock: null
    };

    let meshSnapshot = null;
    let castleSnapshot = null;
    let expansionSnapshot = null;
    let routerSnapshot = null;
    let beaconSnapshot = null;
    let worldCoreSnapshot = null;

    const soldierRegistry = Object.create(null);
    const castleLoad = Object.create(null);
    const serverLoad = Object.create(null);

    const perfHints = {
      prewarm: { castle: null, expansion: null, mesh: null, router: null, worldCore: null },
      cache:   { castle: null, expansion: null, mesh: null, router: null, worldCore: null },
      chunk:   { castle: null, expansion: null, mesh: null, router: null, worldCore: null }
    };

    let _windowStart = PulseRealm.PulseNOW;
    const windowMs = 60000;

    let _oneBandPresence = 0;
    let _oneBandCohesion = 0;
    let _oneBandDrift = 0;
    let _dualBandInfluence = 0;
    let _gpuHeat = 0;
    let _gpuWarpStress = 0;
    let _loopArterySnapshot = null;
    let _waveArterySnapshot = null;
    let _heatmapAdvantageSnapshot = null;
    let _evolutionAdvantageSnapshot = null;

    // -------------------------------------------------------
    // MEMORY
    // -------------------------------------------------------
    const remember = (type, data) => {
      const entry = { type, timestamp: PulseRealm.PulseNOW, data };
      memory.events.push(entry);
      if (memory.events.length > 500) memory.events.shift();
      return entry;
    };

    const getMemory = ({ limit = 50, type = null } = {}) => {
      const filtered = type
        ? memory.events.filter(e => e.type === type)
        : memory.events;
      return filtered.slice(-limit);
    };

    // -------------------------------------------------------
    // OVERMIND
    // -------------------------------------------------------
    const emitToOvermind = (eventType, payload) => {
      if (!overmind || typeof overmind.emit !== "function") return;
      overmind.emit({
        organId: NodeAdminMeta.organId,
        eventType,
        payload,
        snapshot: getStateSnapshot()
      });
    };

    const attachOvermindBridge = bridge => {
      overmind = bridge || null;
      const evt = remember("overmind-bridge-set", { hasBridge: !!bridge });
      emitToOvermind("overmind-bridge-set", evt);
    };

    // -------------------------------------------------------
    // MODE
    // -------------------------------------------------------
    const setMode = nextMode => {
      mode = nextMode;
      const evt = remember("mode-change", { mode });
      if (trace) console.log("[NodeAdmin] mode:", mode);
      emitToOvermind("mode-change", evt);
    };

    const getMode = () => mode;

    // -------------------------------------------------------
    // INTENTS
    // -------------------------------------------------------
    const registerIntent = (name, handler) => {
      intentHandlers[name] = handler;
      const evt = remember("intent-registered", { name });
      emitToOvermind("intent-registered", evt);
    };

    const executeIntent = (name, payload = {}) => {
      const handler = intentHandlers[name];
      if (!handler) {
        if (trace) console.warn("[NodeAdmin] Unknown intent:", name);
        const evt = remember("intent-missing", { name, payload });
        emitToOvermind("intent-missing", evt);
        return { ok: false, error: "unknown-intent" };
      }
      if (trace) console.log("[NodeAdmin] Executing intent:", name, payload);
      const result = handler({ mode, sentinels, payload });
      const evt = remember("intent-executed", { name, payload, result });
      emitToOvermind("intent-executed", evt);
      return { ok: true, result };
    };

    const applyDirective = directive => {
      if (!directive || typeof directive !== "object") {
        return { ok: false, reason: "invalid-directive" };
      }
      const { mode: nextMode, intentName, intentPayload } = directive;
      let modeChanged = false;
      let intentResult = null;

      if (nextMode && typeof nextMode === "string") {
        setMode(nextMode);
        modeChanged = true;
      }

      if (intentName && typeof intentName === "string") {
        intentResult = executeIntent(intentName, intentPayload || {});
      }

      const result = { ok: true, modeChanged, intentResult };
      remember("directive-applied", { directive, result });
      emitToOvermind("directive-applied", { directive, result });
      return result;
    };

    // -------------------------------------------------------
    // SNAPSHOTS
    // -------------------------------------------------------
    const setMeshSnapshot = snapshot => {
      meshSnapshot = snapshot || null;
      const evt = remember("mesh-snapshot-set", { hasSnapshot: !!snapshot });
      emitToOvermind("mesh-snapshot-set", evt);
      return { ok: true };
    };

    const setCastleSnapshot = snapshot => {
      castleSnapshot = snapshot || null;
      if (snapshot && snapshot.castlesById) {
        for (const [castleId, c] of Object.entries(snapshot.castlesById)) {
          const loadIndex = c.presenceField.loadIndex;
          if (typeof loadIndex === "number") {
            castleLoad[castleId] = loadIndex;
          }
        }
      }
      const evt = remember("castle-snapshot-set", {
        hasSnapshot: !!snapshot,
        castleCount: snapshot.castlesById
          ? Object.keys(snapshot.castlesById).length
          : 0
      });
      emitToOvermind("castle-snapshot-set", evt);
      return { ok: true };
    };

    const setExpansionSnapshot = snapshot => {
      expansionSnapshot = snapshot || null;
      if (snapshot && snapshot.plan) {
        cycle++;
        lastExpansionPlan = snapshot.plan;
      }
      const evt = remember("expansion-snapshot-set", {
        hasSnapshot: !!snapshot,
        cycle,
        hasPlan: !!(snapshot && snapshot.plan)
      });
      emitToOvermind("expansion-snapshot-set", evt);
      return { ok: true };
    };

    const setRouterSnapshot = snapshot => {
      routerSnapshot = snapshot || null;
      const evt = remember("router-snapshot-set", { hasSnapshot: !!snapshot });
      emitToOvermind("router-snapshot-set", evt);
      return { ok: true };
    };

    const setBeaconSnapshot = snapshot => {
      beaconSnapshot = snapshot || null;
      const evt = remember("beacon-snapshot-set", { hasSnapshot: !!snapshot });
      emitToOvermind("beacon-snapshot-set", evt);
      return { ok: true };
    };

    const setWorldCoreSnapshot = snapshot => {
      worldCoreSnapshot = snapshot || null;
      const evt = remember("worldcore-snapshot-set", { hasSnapshot: !!snapshot });
      emitToOvermind("worldcore-snapshot-set", evt);
      return { ok: true };
    };

    // -------------------------------------------------------
    // ONEBAND FUSION
    // -------------------------------------------------------
    const setOneBandFusion = ({
      presenceBand = null,
      harmonicCohesion = null,
      harmonicDrift = null,
      dualBandInfluence = null,
      gpuHeat = null,
      gpuWarpStress = null,
      loopArtery = null,
      waveArtery = null,
      heatmapAdvantage = null,
      evolutionAdvantage = null
    } = {}) => {

      if (presenceBand != null) _oneBandPresence = clamp01(presenceBand);
      if (harmonicCohesion != null) _oneBandCohesion = clamp01(harmonicCohesion);
      if (harmonicDrift != null) _oneBandDrift = clamp01(harmonicDrift);
      if (dualBandInfluence != null) _dualBandInfluence = clamp01(dualBandInfluence);
      if (gpuHeat != null) _gpuHeat = clamp01(gpuHeat);
      if (gpuWarpStress != null) _gpuWarpStress = clamp01(gpuWarpStress);

      if (loopArtery != null) _loopArterySnapshot = loopArtery;
      if (waveArtery != null) _waveArterySnapshot = waveArtery;
      if (heatmapAdvantage != null) _heatmapAdvantageSnapshot = heatmapAdvantage;
      if (evolutionAdvantage != null) _evolutionAdvantageSnapshot = evolutionAdvantage;

      const evt = remember("oneband-fusion-set", {
        presenceBand: _oneBandPresence,
        harmonicCohesion: _oneBandCohesion,
        harmonicDrift: _oneBandDrift,
        dualBandInfluence: _dualBandInfluence,
        gpuHeat: _gpuHeat,
        gpuWarpStress: _gpuWarpStress
      });
      emitToOvermind("oneband-fusion-set", evt);
      return { ok: true };
    };

    // -------------------------------------------------------
    // SENTINELS
    // -------------------------------------------------------
    const updateSentinels = maxLoopIndex => {
      tick++;
      const results = [];

      for (let i = 0; i < sentinels.length; i++) {
        const s = sentinels[i];
        const baseLoop = (tick + i * 7) % maxLoopIndex;
        const basePhase = s.phase + tick * 0.05;

        let frequency = 1.0;
        let wavelength = 1.0;

        if (mode === "scan") {
          frequency = 0.4;
          wavelength = 1.6;
        } else if (mode === "boost") {
          frequency = 1.8;
          wavelength = 0.7;
        } else if (mode === "cool") {
          frequency = 0.3;
          wavelength = 1.8;
        } else if (mode === "guard") {
          frequency = 1.0;
          wavelength = 1.0;
          const edgeBias = i % 2 === 0 ? 0 : maxLoopIndex - 1;
          s.loopIndex = edgeBias;
        } else if (mode === "presence") {
          frequency = 1.2;
          wavelength = 1.0;
        }

        if (mode !== "guard") {
          s.loopIndex = baseLoop;
        }

        const phase = basePhase * frequency;
        let energy = 0.5 + 0.4 * Math.sin(phase / wavelength);
        s.energy = clamp(energy, 0, 1);
        s.frequency = frequency;
        s.wavelength = wavelength;

        results.push({
          id: s.id,
          loopIndex: s.loopIndex,
          energy: s.energy,
          phase,
          frequency,
          wavelength
        });
      }

      memory.lastSentinels = results;
      const evt = remember("sentinels-updated", { mode, results });
      if (trace) console.log("[NodeAdmin] sentinels:", results);
      emitToOvermind("sentinels-updated", evt);
      return results;
    };

    // -------------------------------------------------------
    // ADVICE ENGINE
    // -------------------------------------------------------
    const analyzeAndAdvise = ({
      body,
      home,
      town,
      node,
      flags,
      entryNodeId,
      context
    } = {}) => {

      const scoreLayer = summary => {
        if (!summary) return 0;
        const d = Number(summary.densityAvg || 0);
        const c = Number(summary.contrastAvg || 0);
        const w = Number(summary.waveAvg || 0);
        return clamp((d + c + w) / 3, 0, 1);
      };

      const scores = {
        body: scoreLayer(body),
        home: scoreLayer(home),
        town: scoreLayer(town),
        node: scoreLayer(node)
      };

      let topLayer = "body";
      let topScore = scores.body;
      for (const key of ["home", "town", "node"]) {
        if (scores[key] > topScore) {
          topScore = scores[key];
          topLayer = key;
        }
      }

      const hasHighFlags = (flags || []).some(f => f.severity === "high");
      const hasMediumFlags = (flags || []).some(f => f.severity === "medium");

      let suggestedMode = "idle";
      if (hasHighFlags || topScore > 0.75) {
        suggestedMode = "boost";
      } else if (hasMediumFlags || topScore > 0.5) {
        suggestedMode = "scan";
      } else if (topScore < 0.2) {
        suggestedMode = "cool";
      }

      const presenceModeValue = presenceAwareMode(entryNodeId, context || {});
      const socialFocusValue = socialFocus(entryNodeId, context || {});
      const earnReadyValue = earnReadiness(context || {});
      const reproductionValue = reproductionTrigger(entryNodeId, context || {});
      const influenceValue = powerUserInfluence(entryNodeId, context || {});
      const meshInfo = meshAdvice();
      const castleInfo = castleAdvice();
      const expansionInfo = expansionAdvice();
      const routerInfo = routerAdvice();
      const beaconInfo = beaconAdvice();
      const worldCoreInfo = worldCoreAdvice();

      const advice = {
        focusLayer: topLayer,
        focusScore: topScore,
        suggestedMode,
        scores,
        hasHighFlags,
        hasMediumFlags,
        presenceMode: presenceModeValue,
        socialFocus: socialFocusValue,
        earnReadiness: earnReadyValue,
        reproductionTrigger: reproductionValue,
        powerUserInfluence: influenceValue,
        mesh: meshInfo,
        castle: castleInfo,
        expansion: expansionInfo,
        router: routerInfo,
        beacon: beaconInfo,
        worldCore: worldCoreInfo,
        prewarmHints: perfHints.prewarm,
        cacheHints: perfHints.cache,
        chunkHints: perfHints.chunk
      };

      memory.lastAdvice = advice;
      const evt = remember("advice", advice);
      emitToOvermind("advice", evt);
      return advice;
    };

    
  const getStateSnapshot = () => {
    return Object.freeze({
      organId: NodeAdminMeta.organId,
      mode,
      tick,
      cycle,
      sentinelCount: sentinels.length,
      lastAdvice: memory.lastAdvice,
      lastSentinels: memory.lastSentinels,
      soldierRegistry,
      castleLoad,
      serverLoad,
      lastExpansionPlan,
      oneBand: {
        presenceBand: _oneBandPresence,
        harmonicCohesion: _oneBandCohesion,
        harmonicDrift: _oneBandDrift,
        dualBandInfluence: _dualBandInfluence
      }
    });
  }

    // -------------------------------------------------------
    // REPORTING
    // -------------------------------------------------------
    const getReport = () => {
      const report = {
        organId: NodeAdminMeta.organId,
        mode,
        tick,
        cycle,
        sentinels: memory.lastSentinels,
        lastAdvice: memory.lastAdvice,
        memoryEvents: memory.events.slice(-20),
        meshSnapshot,
        castleSnapshot,
        expansionSnapshot,
        routerSnapshot,
        beaconSnapshot,
        worldCoreSnapshot,
        perfHints,
        soldierRegistry,
        castleLoad,
        serverLoad,
        lastExpansionPlan
      };
      memory.lastReport = report;
      const evt = remember("report", report);
      emitToOvermind("report", evt);
      return report;
    };

    // -------------------------------------------------------
    // ARTERY
    // -------------------------------------------------------
    const getNodeAdminArtery = () => {
      const artery = computeNodeAdminArteryV6({
        mode,
        tick,
        cycle,
        sentinelCount: sentinels.length,
        soldierRegistry,
        castleLoad,
        serverLoad,
        lastExpansionPlan,
        windowMs,
        windowStart: _windowStart,
        instanceIndex,
        instanceCount: _instanceCount,
        presenceBand: _oneBandPresence,
        harmonicCohesion: _oneBandCohesion,
        harmonicDrift: _oneBandDrift,
        dualBandInfluence: _dualBandInfluence,
        gpuHeat: _gpuHeat,
        gpuWarpStress: _gpuWarpStress,
        loopArtery: _loopArterySnapshot,
        waveArtery: _waveArterySnapshot,
        heatmapAdvantage: _heatmapAdvantageSnapshot,
        evolutionAdvantage: _evolutionAdvantageSnapshot
      });

      const key = _registryKey(instanceId, instanceIndex);
      _globalNodeAdminArteryRegistry.set(key, artery);
      return artery;
    };

    // -------------------------------------------------------
    // PRESENCE / SOCIAL / EARN / REPRODUCTION / INFLUENCE
    // -------------------------------------------------------
    const presenceAwareMode = (entryNodeId, context = {}) => {
      const { PresenceJobView } = presenceDeps;
      if (!PresenceJobView) return "idle";

      const jobView = PresenceJobView.build(entryNodeId, context);
      const nearby = jobView.nearbyPresence || [];

      const powerCount = nearby.filter(p => p.powerUser).length;
      const newCount = nearby.filter(p => p.ageCategory === "new").length;

      if (powerCount >= 3) return "boost";
      if (newCount >= 3) return "scan";
      return "idle";
    };

    const socialFocus = (entryNodeId, context = {}) => {
      const { PulseWorldSocialGraph } = presenceDeps;
      if (!PulseWorldSocialGraph) return "node";

      const snapshot = PulseWorldSocialGraph.snapshot();
      const nodes = snapshot.nodes || [];
      const edges = snapshot.edges || [];

      const clusterEdges = edges.filter(e => e.type === "presence");
      const jobEdges = edges.filter(e => e.type === "job");
      const mentorEdges = edges.filter(e => e.type === "mentor_request");

      const clusterDensity = clusterEdges.length / Math.max(nodes.length, 1);
      const jobFlow = jobEdges.length;
      const mentorshipFlow = mentorEdges.length;

      if (clusterDensity > 5) return "town";
      if (jobFlow > 10) return "home";
      if (mentorshipFlow > 5) return "body";

      return "node";
    };

    const earnReadiness = (context = {}) => {
      const impulse = context.impulse;
      if (!impulse || !impulse.flags) return "unknown";

      const ctx = impulse.flags.earner_context || {};
      const urgency = ctx.urgency || 1;
      const volatility = ctx.volatility || 0;

      if (urgency > 1.0 && volatility < 0.05) return "high";
      if (urgency > 0.7) return "medium";
      return "low";
    };

    const reproductionTrigger = (entryNodeId, context = {}) => {
      const { PresenceJobView } = presenceDeps;
      if (!PresenceJobView) return "none";

      const jobView = PresenceJobView.build(entryNodeId, context);
      const nearby = jobView.nearbyPresence || [];

      const newCount = nearby.filter(p => p.ageCategory === "new").length;
      if (newCount >= 5) return "spawn-node";

      const powerCount = nearby.filter(p => p.powerUser).length;
      if (powerCount >= 3) return "spawn-advanced-node";

      return "none";
    };

    const powerUserInfluence = (entryNodeId, context = {}) => {
      const { PresenceJobView, PowerUserRanking } = presenceDeps;
      if (!PresenceJobView || !PowerUserRanking) return null;

      const jobView = PresenceJobView.build(entryNodeId, context);
      const ranked = PowerUserRanking.rankNearby(jobView.nearbyPresence || []);
      const top = ranked[0];
      if (!top) return null;

      return {
        uid: top.uid,
        displayName: top.displayName,
        rankScore: top.rankScore,
        presenceBand: top.presenceBand,
        systemAge: top.systemAge
      };
    };

    // -------------------------------------------------------
    // ADVICE SUBSYSTEMS
    // -------------------------------------------------------
    const meshAdvice = () => {
      if (!meshSnapshot) return null;

      const m =
        meshSnapshot.DensityHealth.A_metrics ||
        meshSnapshot.metrics ||
        {};

      const pressure = m.meshPressureIndex ?? 0;
      const strength = m.meshStrength || "unknown";

      let status = "normal";
      if (pressure >= 70) status = "high-pressure";
      else if (pressure >= 40) status = "elevated";

      const advice = { meshPressureIndex: pressure, meshStrength: strength, status };
      remember("mesh-advice", advice);
      return advice;
    };

    const castleAdvice = () => {
      if (!castleSnapshot) return null;

      const state =
        castleSnapshot.State.A_baseline ||
        castleSnapshot.state ||
        {};

      const load = state.loadLevel || "unknown";
      const meshSupport = state.meshSupportLevel ?? 0;

      let status = "normal";
      if (load === "high" || load === "critical") status = "overloaded";

      const advice = { loadLevel: load, meshSupportLevel: meshSupport, status };
      remember("castle-advice", advice);
      return advice;
    };

    const expansionAdvice = () => {
      if (!expansionSnapshot) return null;

      const need =
        expansionSnapshot.MeshBrain.B_expansionRules.expansionNeed ||
        expansionSnapshot.expansionNeed ||
        "unknown";

      const routeStable = expansionSnapshot.routeField.routeStable ?? null;

      const advice = { expansionNeed: need, routeStable };
      remember("expansion-advice", advice);
      return advice;
    };

    const routerAdvice = () => {
      if (!routerSnapshot) return null;

      const r =
        routerSnapshot.routeField ||
        routerSnapshot.metrics ||
        {};

      const stable = r.routeStable ?? r.stable ?? null;
      const errorRate = r.errorRate ?? r.routeErrorRate ?? 0;
      const hops = r.avgHops ?? r.hops ?? null;

      let status = "unknown";
      if (stable === true && errorRate < 0.01) status = "stable";
      else if (stable === false || errorRate > 0.05) status = "unstable";
      else status = "degraded";

      const advice = { routeStable: stable, errorRate, hops, status };
      remember("router-advice", advice);
      return advice;
    };

    const beaconAdvice = () => {
      if (!beaconSnapshot) return null;

      const presenceField =
        beaconSnapshot.presenceField ||
        beaconSnapshot.presence ||
        {};

      const advantageField =
        beaconSnapshot.advantageField ||
        beaconSnapshot.advantage ||
        {};

      const bandSignature = beaconSnapshot.bandSignature || null;
      const binaryField = beaconSnapshot.binaryField || null;
      const waveField = beaconSnapshot.waveField || null;
      const fallbackBandLevel = beaconSnapshot.globalHints.fallbackBandLevel ?? 0;

      const advice = {
        presenceField,
        advantageField,
        bandSignature,
        binaryField,
        waveField,
        fallbackBandLevel
      };

      remember("beacon-advice", advice);
      return advice;
    };

    const worldCoreAdvice = () => {
      if (!worldCoreSnapshot) return null;

      const modeVal =
        worldCoreSnapshot.mode ||
        worldCoreSnapshot.stateMode ||
        "unknown";

      const load =
        worldCoreSnapshot.loadLevel ||
        worldCoreSnapshot.load ||
        "unknown";

      let status = "normal";
      if (load === "high" || load === "critical") status = "stressed";

      const advice = { mode: modeVal, loadLevel: load, status };
      remember("worldcore-advice", advice);
      return advice;
    };

    // -------------------------------------------------------
    // ABILITIES + MANUAL
    // -------------------------------------------------------
    const getAbilities = () => ({
      version: "v30-IMMORTAL-ONEBAND",
      modes: ["idle", "scan", "boost", "cool", "guard", "presence"],
      intents: Object.keys(intentHandlers),
      features: [
        "binary-first oneband fusion",
        "multi-sentinel circling",
        "mode-based frequency/wavelength modulation",
        "layer scoring + focus selection",
        "advice engine",
        "intent execution",
        "expansion-plan awareness",
        "soldier-delegation awareness",
        "castle-load map",
        "server-load map",
        "band/binary/wave awareness",
        "advantage-field awareness",
        "backend AI bridge",
        "memory log + reports",
        "Overmind directive bridge",
        "state snapshot export",
        "presence-aware mode selection",
        "social-graph-aware focus selection",
        "earn-readiness awareness",
        "reproduction trigger awareness",
        "power-user influence awareness",
        "mesh-pressure awareness",
        "castle-load awareness",
        "expansion-need awareness",
        "route-stability awareness",
        "beacon presence/advantage/fallback awareness",
        "worldCore UI/load awareness",
        "prewarm hint coordination",
        "cache hint coordination",
        "chunk hint coordination",
        "nodeAdmin artery v6 oneband snapshots",
        "evolution-layer v30 integration",
        "heatmap v30 awareness",
        "loop/wave artery fusion"
      ]
    });

    const getManual = () => ({
      meta: NodeAdminMeta,
      version: "v30-IMMORTAL-ONEBAND",
      description: "PulseNodeAdmin is the sentinel command organ.",
      usage: {
        setMode: "admin.setMode('scan' | 'boost' | 'cool' | 'guard' | 'presence' | 'idle')",
        analyzeAndAdvise: "admin.analyzeAndAdvise({ body, home, town, node, flags, entryNodeId, context })",
        getReport: "admin.getReport()",
        getStateSnapshot: "admin.getStateSnapshot()",
        getNodeAdminArtery: "admin.getNodeAdminArtery()",
        registerIntent: "admin.registerIntent('intentName', handler)",
        applyDirective: "admin.applyDirective({ mode?, intentName?, intentPayload? })",
        setPresenceIntegrations: "admin.setPresenceIntegrations({...})",
        setMeshSnapshot: "admin.setMeshSnapshot(snapshot)",
        setCastleSnapshot: "admin.setCastleSnapshot(snapshot)",
        setExpansionSnapshot: "admin.setExpansionSnapshot(snapshot)",
        setRouterSnapshot: "admin.setRouterSnapshot(snapshot)",
        setBeaconSnapshot: "admin.setBeaconSnapshot(snapshot)",
        setWorldCoreSnapshot: "admin.setWorldCoreSnapshot(snapshot)",
        setPrewarmHints: "admin.setPrewarmHints({...})",
        setCacheHints: "admin.setCacheHints({...})",
        setChunkHints: "admin.setChunkHints({...})",
        setOneBandFusion: "admin.setOneBandFusion({...})"
      }
    });

    // -------------------------------------------------------
    // FINAL RETURN SURFACE
    // -------------------------------------------------------
    return {
      instanceId,
      nodeType,

      // memory
      remember,
      getMemory,

      // overmind
      emitToOvermind,
      attachOvermindBridge,

      // mode
      setMode,
      getMode,

      // intents
      registerIntent,
      executeIntent,
      applyDirective,

      // snapshots
      setMeshSnapshot,
      setCastleSnapshot,
      setExpansionSnapshot,
      setRouterSnapshot,
      setBeaconSnapshot,
      setWorldCoreSnapshot,

      // oneband
      setOneBandFusion,

      // sentinels
      updateSentinels,

      // advice
      analyzeAndAdvise,
      meshAdvice,
      castleAdvice,
      expansionAdvice,
      routerAdvice,
      beaconAdvice,
      worldCoreAdvice,

      // presence/social/earn/etc
      presenceAwareMode,
      socialFocus,
      earnReadiness,
      reproductionTrigger,
      powerUserInfluence,

      // reporting
      getReport,
      getStateSnapshot,
      getNodeAdminArtery,

      // meta
      getAbilities,
      getManual
    };
  };

  return { create };
})();

PulseRealm.ToolsNodeAdmin = {
  PulseNodeAdmin,
  NodeAdminMeta,
  _nodeAdminEvolution
}

PulseRealm.PulseToolsNodeAdminBuild = createPulseNodeAdmin;
PulseRealm.PulseToolsNodeAdmin = PulseNodeAdmin;
