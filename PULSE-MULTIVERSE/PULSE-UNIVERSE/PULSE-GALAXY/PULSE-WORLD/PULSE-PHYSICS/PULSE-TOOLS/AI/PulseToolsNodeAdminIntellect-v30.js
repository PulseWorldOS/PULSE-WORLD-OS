// ============================================================================
//  FILE: /PulseOS/PULSE-TOOLS/PulseNodeAdmin-v30-IMMORTAL-ONEBAND-INTELLECT.js
//  PULSE OS v30‑IMMORTAL‑ONEBAND‑ADV++++ — NODEADMIN INTELLECT ORGAN
//  Network Brain • Sentinel Command • Intent + Memory + IQ + Artery v5
//  OVERMIND‑PRIME‑AWARE • PRESENCE/MESH/CASTLE/EXPANSION/ROUTER/BEACON/WORLDCORE‑AWARE
//  PREWARM/CACHE/CHUNK‑AWARE • DUAL‑BAND + ONEBAND • ADVANTAGE/PRESENCE/HEATMAP‑AWARE
//  PURE SYNTHETIC INTELLECT • ZERO RANDOMNESS • ZERO MUTATION OF EXTERNAL STATE
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { createPulseNodeEvolutionV30 as PulseNodeAdminEvolution } from "./PulseToolsNodeEvolution-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// IQ MAP — v30 IMMORTAL ONEBAND
const PulseNodeAdminIQMap = Object.freeze({
  identity: {
    name: "PulseNodeAdmin",
    version: "v30-IMMORTAL-ONEBAND-ADV++++",
    role: "Sentinel Command Brain / Network Overmind Cortex",
    description:
      "Circling guardian cortex that analyzes all layers, manages modes, executes intents, interprets custom actions, integrates memory + backend AI (advisory-only) + presence + social graph + earn readiness + mesh/castle/expansion/router/beacon/worldCore signals + band/binary/wave/oneBand fields + soldier/load maps + prewarm/cache/chunk hints + artery v6 + advantage/heatmap surfaces."
  },
  purpose: {
    primary: [
      "Protect the organism and its networks",
      "Guide scanning, repair, cooling, and guarding",
      "Interpret commands and intents into deterministic actions",
      "Route energy, attention, and focus across layers",
      "Provide reports, advice, arteries, IQ maps, and advantage views",
      "Integrate backend AI intelligence (strictly advisory-only, never authoritative)",
      "Maintain memory of events, decisions, and recommendations",
      "Integrate presence and social graph signals for focus and mode selection",
      "Integrate mesh, castle, expansion, router, beacon, worldCore, and oneBand signals",
      "Coordinate with reproduction, earn, and evolution layers"
    ],
    secondary: [
      "Expose abilities, IQ map, manuals, and help menus",
      "Support custom message interpretation and routing",
      "Evolve via new intents and mappings (governed, deterministic)",
      "Surface civilization-level patterns (clusters, mentors, jobs, routes, expansions)",
      "Provide artery + heatmap + advantage overlays for higher organs"
    ]
  },
  modes: {
    idle: {
      description: "Neutral state. Minimal activity. Monitoring only.",
      frequency: 1.0,
      wavelength: 1.0
    },
    scan: {
      description: "Deep scanning mode. Slow frequency, long wavelength, high diagnostic density.",
      frequency: 0.4,
      wavelength: 1.6
    },
    boost: {
      description: "High-energy repair mode. Fast frequency, short wavelength, aggressive stabilization.",
      frequency: 1.8,
      wavelength: 0.7
    },
    cool: {
      description: "Cooling mode. Low frequency, long wavelength, pressure relief.",
      frequency: 0.3,
      wavelength: 1.8
    },
    guard: {
      description: "Perimeter defense mode. Edge-biased sentinel loops and route hardening.",
      frequency: 1.0,
      wavelength: 1.0
    },
    presence: {
      description:
        "Presence-governed mode. Social + earn + expansion + reproduction + power-user aware.",
      frequency: 1.2,
      wavelength: 1.0
    },
    oneband: {
      description:
        "OneBand fusion mode. Binary, wave, presence, and advantage fused into a single guidance field.",
      frequency: 1.1,
      wavelength: 1.1
    }
  },
  sentinels: {
    description:
      "Multiple circling guardians with phase offsets, loop indices, energy fields, and frequency/wavelength modulation, synchronized with loop/wave/oneBand scanners.",
    parameters: ["phaseOffset", "loopIndex", "energy", "frequency", "wavelength"],
    behaviors: [
      "circling",
      "edge-guarding",
      "deep scanning",
      "rapid repair",
      "cooling sweep",
      "presence-biased routing",
      "oneBand fusion tracking"
    ]
  },
  intents: {
    description: "Named actions that NodeAdmin can execute. Command vocabulary for deterministic behavior.",
    examples: [
      "focus-body",
      "focus-home",
      "focus-town",
      "focus-node",
      "scan-town-deep",
      "cool-system",
      "guard-perimeter",
      "boost-system",
      "presence-govern",
      "optimize-route",
      "review-reproduction-plan",
      "prewarm-castle",
      "prewarm-mesh",
      "prewarm-router",
      "rebalance-soldiers",
      "oneband-align",
      "stabilize-harmonics",
      "reduce-mesh-pressure"
    ]
  },
  commandMappings: {
    description: "Heuristic + backend-AI-driven rules for interpreting custom messages (advisory-only).",
    examples: [
      { pattern: "scan home", mapsTo: "focus-home", mode: "scan" },
      { pattern: "scan town", mapsTo: "scan-town-deep", mode: "scan" },
      { pattern: "boost body", mapsTo: "boost-system", mode: "boost" },
      { pattern: "cool system", mapsTo: "cool-system", mode: "cool" },
      { pattern: "guard", mapsTo: "guard-perimeter", mode: "guard" },
      { pattern: "presence mode", mapsTo: "presence-govern", mode: "presence" },
      { pattern: "optimize routes", mapsTo: "optimize-route", mode: "presence" },
      { pattern: "review reproduction", mapsTo: "review-reproduction-plan", mode: "presence" },
      { pattern: "align oneband", mapsTo: "oneband-align", mode: "oneband" },
      { pattern: "stabilize harmonics", mapsTo: "stabilize-harmonics", mode: "presence" }
    ]
  },
  abilities: {
    categories: {
      scanning: [
        "deep scan",
        "broad scan",
        "targeted scan",
        "multi-sentinel scan",
        "heatmap-driven scan",
        "advantage-surface scan"
      ],
      repair: [
        "boost energy",
        "repair field",
        "assist field",
        "node stabilization",
        "pressure relief",
        "harmonic stabilization"
      ],
      guarding: [
        "perimeter guard",
        "edge bias",
        "sentinel hardening",
        "route hardening",
        "fallback-band preparation"
      ],
      cooling: [
        "system cool",
        "energy dampening",
        "load redistribution",
        "mesh pressure easing"
      ],
      intelligence: [
        "layer scoring",
        "focus selection",
        "advice generation",
        "custom action interpretation",
        "backend AI integration (advisory-only)",
        "memory recall",
        "help menu generation",
        "IQ map exposure",
        "artery snapshot generation",
        "advantage view synthesis",
        "heatmap interpretation"
      ],
      presence: [
        "presence-aware mode selection",
        "presence-band awareness",
        "system-age awareness",
        "power-user influence awareness",
        "job-readiness awareness",
        "presence cluster detection"
      ],
      socialGraph: [
        "cluster detection",
        "expansion wave detection",
        "mentorship flow awareness",
        "job economy awareness",
        "bridge-node identification"
      ],
      reproduction: [
        "spawn-node recommendation",
        "spawn-advanced-node recommendation",
        "expansion-trigger awareness",
        "route-node-plan awareness",
        "castle-reproduction-plan awareness"
      ],
      meshCastleExpansion: [
        "mesh-pressure awareness",
        "castle-load awareness",
        "route-stability awareness",
        "expansion-need awareness",
        "router-suggestion awareness",
        "beacon presence/advantage awareness",
        "band/binary/wave/oneBand-field awareness",
        "worldCore mode/load awareness"
      ],
      earn: [
        "earn-readiness scoring",
        "earn-context awareness",
        "volatility/urgency awareness"
      ],
      performance: [
        "prewarm hint coordination",
        "cache hint coordination",
        "chunk hint coordination",
        "soldier-load map awareness",
        "window-based artery evaluation"
      ]
    }
  },
  memory: {
    categories: [
      "mode-change",
      "sentinels-updated",
      "advice",
      "intent-executed",
      "intent-registered",
      "intent-missing",
      "custom-backend",
      "custom-local",
      "report",
      "question",
      "router-advice",
      "beacon-advice",
      "worldcore-advice",
      "presence-advice",
      "social-advice",
      "earn-advice",
      "reproduction-advice",
      "mesh-advice",
      "castle-advice",
      "expansion-advice",
      "reproduction-plan",
      "overmind-bridge-set",
      "directive-applied",
      "prewarm-hints-set",
      "cache-hints-set",
      "chunk-hints-set",
      "oneband-align",
      "harmonic-stability"
    ]
  },
  reports: {
    description:
      "Structured snapshots of NodeAdmin state: mode, sentinels, focus, presence, social, earn, reproduction, mesh, castle, expansion, router, beacon, worldCore, oneBand, perf hints, soldier/load maps, arteries, and advantage/heatmap overlays."
  },
  questions: {
    examples: [
      "Where are you?",
      "What mode are you in?",
      "What layer needs attention?",
      "What are your abilities?",
      "What do you recommend?",
      "What’s happening in the town layer?",
      "What’s your energy distribution?",
      "What is the presence situation?",
      "Who is the top power user nearby?",
      "Should we expand or spawn new nodes?",
      "What is the mesh pressure?",
      "Is the castle overloaded?",
      "Is the route stable?",
      "What reproduction plan do you see?",
      "What does your artery say about pressure and budget?",
      "Is oneBand aligned or drifting?"
    ]
  },
  helpMenu: {
    description:
      "Help menu listing commands, intents, modes, abilities, and how presence/mesh/castle/expansion/router/beacon/worldCore/oneBand signals are used, including safety and deterministic contracts."
  },
  evolution: {
    description: "Guidelines for extending NodeAdmin in v30-IMMORTAL-ONEBAND.",
    rules: [
      "Do NOT break deterministic safety contracts.",
      "Add new abilities via intents and IQ map, not by mutating core logic.",
      "Extend command mappings and IQ map rather than hardcoding ad-hoc behavior.",
      "Use memory patterns to propose new intents or mode rules.",
      "Backend AI may propose changes; humans or higher-level governance should approve.",
      "Presence, social, mesh, castle, expansion, router, beacon, worldCore, and oneBand integrations must remain metadata-only and non-invasive.",
      "Artery metrics, heatmaps, and advantage views are advisory-only and must not directly drive destructive behavior."
    ]
  }
});
export const NodeAdminIntellectMeta = Object.freeze({
  AI_EXPERIENCE_META: "NODEADMIN_INTELLECT_V30_IMMORTAL_ONEBAND",

  // ----------------------------------------------------
  // IDENTITY — Who this organ *is*
  // ----------------------------------------------------
  identity: {
    organId: "PulseNodeAdminIntellect-v30-IMMORTAL-ONEBAND",
    role: "NODEADMIN_INTELLECT",
    layer: "NetworkBrain/Intellect",
    version: "v30-IMMORTAL-ONEBAND-ADV++++",
    epoch: 30,
    lineage: "PulseOS/NodeAdmin/Intellect",
    description:
      "Deterministic synthetic intellect for NodeAdmin. Computes advice, focus, scoring, routing, mode selection, oneBand fusion, artery integration, and multi-layer interpretation."
  },

  // ----------------------------------------------------
  // EVO — What this intellect understands
  // ----------------------------------------------------
  evo: {
    nodeAdmin: true,
    intellect: true,
    sentinelBrain: true,
    presenceIntellect: true,
    presenceAware: true,
    harmonicsAware: true,
    dualBand: true,
    oneBand: true,
    binaryAware: true,
    waveAware: true,
    meshCastleExpansionAware: true,
    routerBeaconWorldCoreAware: true,
    earnAware: true,
    reproductionAware: true,
    advantageAware: true,
    heatmapAware: true,
    arteryAware: true,
    arteryV6: true,
    evolutionAware: true,
    snapshotAware: true,
    chunkPrewarmAware: true,
    cacheAware: true,
    gpuAware: true,
    multiSpin: true,
    timelineFlowAware: true
  },

  // ----------------------------------------------------
  // CONTRACT — What this intellect must ALWAYS do
  // ----------------------------------------------------
  contract: {
    purpose:
      "Compute deterministic NodeAdmin intelligence: scoring, focus, advice, mode selection, oneBand fusion, artery evaluation, and multi-layer interpretation.",
    always: [
      "remain deterministic",
      "remain synthetic-only",
      "never mutate external state",
      "log decisions to internal memory",
      "treat backend AI as advisory-only",
      "respect oneBand fusion fields",
      "respect presence/social/mesh/castle/expansion/router/beacon/worldCore signals as metadata-only",
      "expose state via reports, advice, and arteries"
    ],
    never: [
      "perform network I/O",
      "perform filesystem I/O",
      "introduce randomness",
      "self-modify core safety rules",
      "bypass Overmind boundaries"
    ],
    deterministic: true,
    advisoryOnly: true
  },

  // ----------------------------------------------------
  // GUARANTEES — Hard invariants
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // SAFETY — What this intellect is allowed to touch
  // ----------------------------------------------------
  safety: {
    ORGANISM: "PulseWorldOS",
    Presence: true,
    Harmonics: true,
    DualBand: true,
    OneBand: true,
    Shifter: true,
    Mesh: true,
    Castle: true,
    Expansion: true,
    Router: true,
    Beacon: true,
    WorldCore: true,
    Earn: true,
    Reproduction: true,
    Advantage: true,
    Heatmap: true,
    Binary: true,
    Wave: true,
    Sentinel: true,
    Overmind: true
  }
});

// ---------------------------------------------------------------------------
// GLOBAL ARTERY REGISTRY + CORE UTILS
// ---------------------------------------------------------------------------

const _globalNodeAdminArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || NodeAdminIntellectMeta.organId}#${instanceIndex}`;
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

// ---------------------------------------------------------------------------
// ARTERY v5 — v30 ONEBAND-AWARE EVALUATION
// ---------------------------------------------------------------------------

function computeNodeAdminArteryV5({
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
  windowEvents,
  lastAdvice,
  meshSnapshot,
  expansionSnapshot,
  routerSnapshot
}) {
  const now = PulseRealm.PulseNOW;
  const elapsedMs = Math.max(1, now - windowStart);

  const soldierCount = Object.keys(soldierRegistry || {}).length;
  const castleIds = Object.keys(castleLoad || {});
  const serverIds = Object.keys(serverLoad || {});

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

  const evalDensity = Math.min(1, (windowEvents || 0) / 512);

  const meshPressure =
    meshSnapshot.DensityHealth.A_metrics.meshPressureIndex ??
    meshSnapshot.metrics.meshPressureIndex ??
    meshSnapshot.densityHealth.A_metrics.meshPressureIndex ??
    0;

  const expansionNeedRaw =
    expansionSnapshot.MeshBrain.B_expansionRules.expansionNeed ??
    expansionSnapshot.expansionNeed ??
    "none";

  const routerErrorRate =
    routerSnapshot.routeField.routeErrorRate ??
    routerSnapshot.metrics.errorRate ??
    0;

  const expansionNeedScore =
    expansionNeedRaw === "high" ? 1 :
    expansionNeedRaw === "medium" ? 0.6 :
    0.2;

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

  const pressureBase = clamp01(
    modePressureBase * 0.2 +
      soldierPressure * 0.15 +
      castlePressure * 0.15 +
      serverPressure * 0.15 +
      expansionIntensity * 0.1 +
      (meshPressure / 100) * 0.1 +
      evalDensity * 0.1 +
      routerErrorRate * 0.05
  );

  const throughput = clamp01(1 - pressureBase);
  const pressure = pressureBase;
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  const reproductionHint = lastAdvice.reproductionTrigger || "none";
  const earnReadiness = lastAdvice.earnReadiness || "unknown";

  return Object.freeze({
    meta: NodeAdminIntellectMeta,
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
      expansionIntensity,
      expansionNeedScore
    },
    evalDensity,
    meshPressureIndex: meshPressure,
    routerErrorRate,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucket(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucket(budget),
    reproductionHint,
    earnReadiness
  });
}

// ---------------------------------------------------------------------------
// NODEADMIN FACTORY — v30 IMMORTAL ONEBAND
// ---------------------------------------------------------------------------

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
  const instanceId = `${NodeAdminIntellectMeta.organId}#${instanceIndex}`;
  const nodeType = "admin";

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
  let _windowEvents = 0;

  // ----------------------------
  // EVOLUTION BRIDGE
  // ----------------------------
  function evolveAdminPulse(pulse, extraCtx = {}) {
    if (!_nodeAdminEvolution || typeof _nodeAdminEvolution.evolveNodePulse !== "function") {
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
      ...extraCtx
    };
    return _nodeAdminEvolution.evolveNodePulse({
      nodeType,
      pulse,
      context
    });
  }

  // ----------------------------
  // MEMORY + WINDOW
  // ----------------------------
  function remember(type, data) {
    const entry = {
      type,
      timestamp: PulseRealm.PulseNOW,
      data
    };
    memory.events.push(entry);
    _windowEvents += 1;
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

  function rollWindow(now) {
    if (now - _windowStart >= windowMs) {
      _windowStart = now;
      _windowEvents = 0;
    }
  }

  function getStateSnapshot() {
    return Object.freeze({
      organId: NodeAdminIntellectMeta.organId,
      mode,
      tick,
      cycle,
      sentinelCount: sentinels.length,
      lastAdvice: memory.lastAdvice,
      lastSentinels: memory.lastSentinels,
      soldierRegistry,
      castleLoad,
      serverLoad,
      lastExpansionPlan
    });
  }

  // ----------------------------
  // OVERMIND BRIDGE
  // ----------------------------
  function emitToOvermind(eventType, payload) {
    if (!overmind || typeof overmind.emit !== "function") return;
    overmind.emit({
      organId: NodeAdminIntellectMeta.organId,
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

  // ----------------------------
  // INTENTS
  // ----------------------------
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

  // ----------------------------
  // PRESENCE INTEGRATIONS
  // ----------------------------
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

  // ----------------------------
  // SNAPSHOTS
  // ----------------------------
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

  // ----------------------------
  // PERFORMANCE HINTS
  // ----------------------------
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

  // ----------------------------
  // MODE + SENTINELS
  // ----------------------------
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

      let frequency = PulseNodeAdminIQMap.modes.idle.frequency;
      let wavelength = PulseNodeAdminIQMap.modes.idle.wavelength;

      if (mode === "scan") {
        frequency = PulseNodeAdminIQMap.modes.scan.frequency;
        wavelength = PulseNodeAdminIQMap.modes.scan.wavelength;
      } else if (mode === "boost") {
        frequency = PulseNodeAdminIQMap.modes.boost.frequency;
        wavelength = PulseNodeAdminIQMap.modes.boost.wavelength;
      } else if (mode === "cool") {
        frequency = PulseNodeAdminIQMap.modes.cool.frequency;
        wavelength = PulseNodeAdminIQMap.modes.cool.wavelength;
      } else if (mode === "guard") {
        frequency = PulseNodeAdminIQMap.modes.guard.frequency;
        wavelength = PulseNodeAdminIQMap.modes.guard.wavelength;
        const edgeBias = i % 2 === 0 ? 0 : maxLoopIndex - 1;
        s.loopIndex = edgeBias;
      } else if (mode === "presence") {
        frequency = PulseNodeAdminIQMap.modes.presence.frequency;
        wavelength = PulseNodeAdminIQMap.modes.presence.wavelength;
      } else if (mode === "oneband") {
        frequency = PulseNodeAdminIQMap.modes.oneband.frequency;
        wavelength = PulseNodeAdminIQMap.modes.oneband.wavelength;
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

  // ----------------------------
  // PRESENCE / SOCIAL / EARN / REPRODUCTION
  // ----------------------------
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

  // ----------------------------
  // MESH / CASTLE / EXPANSION / ROUTER / BEACON / WORLDCORE ADVICE
  // ----------------------------
  function meshAdvice() {
    if (!meshSnapshot) return null;
    const m =
      meshSnapshot.DensityHealth.A_metrics ||
      meshSnapshot.metrics ||
      meshSnapshot.densityHealth.A_metrics ||
      {};
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
    const suggestions = routerSnapshot.suggestions || {};
    const stable = r.routeStable ?? r.stable ?? null;
    const errorRate = r.errorRate ?? r.routeErrorRate ?? 0;
    const hops = r.avgHops ?? r.hops ?? null;
    let status = "unknown";
    if (stable === true && errorRate < 0.01) status = "stable";
    else if (stable === false || errorRate > 0.05) status = "unstable";
    else status = "degraded";
    const advice = {
      routeStable: stable,
      errorRate,
      hops,
      status,
      betterRoutes: suggestions.betterRoutes || null,
      corridorProtection: suggestions.corridorProtection || null
    };
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

  // ----------------------------
  // LAYER SCORING + ADVICE
  // ----------------------------
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

  // ----------------------------
  // REPORTS + ARTERY
  // ----------------------------
  function getReport() {
    const report = {
      organId: NodeAdminIntellectMeta.organId,
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

  function getNodeAdminArtery() {
    rollWindow(PulseRealm.PulseNOW);
    const artery = computeNodeAdminArteryV5({
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
      windowEvents: _windowEvents,
      lastAdvice: memory.lastAdvice,
      meshSnapshot,
      expansionSnapshot,
      routerSnapshot
    });
    const key = _registryKey(instanceId, instanceIndex);
    _globalNodeAdminArteryRegistry.set(key, artery);
    return artery;
  }

  // ----------------------------
  // ABILITIES + MANUAL
  // ----------------------------
  function getAbilities() {
    return {
      modes: ["idle", "scan", "boost", "cool", "guard", "presence", "oneband"],
      intents: Object.keys(intentHandlers),
      features: [
        "multi-sentinel circling",
        "mode-based frequency/wavelength modulation (IQ map driven)",
        "layer scoring + focus selection",
        "advice engine (suggested mode + focus)",
        "intent execution (AIS++)",
        "custom message interpretation",
        "expansion-plan awareness",
        "soldier-delegation awareness",
        "castle-load map",
        "server-load map",
        "band/binary/wave/oneBand awareness",
        "advantage-field awareness",
        "backend AI bridge (advisory-only)",
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
        "nodeAdmin artery v5 snapshots",
        "IQ map exposure and help menu"
      ]
    };
  }

  function getManual() {
    return {
      meta: NodeAdminIntellectMeta,
      iqMap: PulseNodeAdminIQMap,
      description: "NodeAdmin is the network brain / sentinel command organ.",
      usage: {
        setMode:
          "nodeAdmin.setMode('scan' | 'boost' | 'cool' | 'guard' | 'presence' | 'oneband' | 'idle')",
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
        evolveAdminPulse:
          "nodeAdmin.evolveAdminPulse(pulse, { extraContext }) // shifter-first + sectional fallback"
      }
    };
  }

  // ----------------------------
  // EXPORT ORGAN INSTANCE
  // ----------------------------
  return Object.freeze({
    meta: NodeAdminIntellectMeta,
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
    getManual
  });
}
PulseRealm.PulseToolsNodeAdminIntellect = createPulseNodeAdmin;
PulseRealm.PulseToolsNodeAdminMap = PulseNodeAdminIQMap;
// ============================================================================
// ORGAN EXPORT (IMMORTAL)
// ============================================================================

export const PulseNodeAdminIntellect = Object.freeze({
  Meta: NodeAdminIntellectMeta,

  // canonical organ factory
  create(config = {}) {
    return createPulseNodeAdmin(config);
  },

  // STATIC ANALYZE FUNCTION (IMMORTAL)
  analyze(input = {}) {
    const instance = createPulseNodeAdmin({});
    const result = instance.analyzeAndAdvise(input);
    return {
      focusLayer: result.focusLayer,
      focusScore: result.focusScore,
      scores: result.scores,
      hasHighFlags: result.hasHighFlags,
      hasMediumFlags: result.hasMediumFlags,
      presenceMode: result.presenceMode,
      socialFocus: result.socialFocus,
      earnReadiness: result.earnReadiness,
      reproductionTrigger: result.reproductionTrigger,
      powerUserInfluence: result.powerUserInfluence
    };
  },

  // STATIC ADVISE FUNCTION (IMMORTAL)
  advise(input = {}) {
    const instance = createPulseNodeAdmin({});
    const result = instance.analyzeAndAdvise(input);
    return result; // full advice packet
  }
});

PulseRealm.ToolsNodeAdminIntellect = {
  PulseNodeAdminIntellect,
  createPulseNodeAdmin,
  NodeAdminIntellectMeta,
  getGlobalNodeAdminArteries,
  PulseNodeAdminIQMap
}