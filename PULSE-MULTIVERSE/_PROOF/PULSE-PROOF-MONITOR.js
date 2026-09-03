// ============================================================================
//  PULSE OS — PROOF VITALS MONITOR (v30‑IMMORTAL‑WORLD‑PROOF‑MONITOR)
//  “Organism Life Witness / Continuous Vitals / Offline-First Mesh+World Telemetry”
//  v30+: World-aware • Mesh-aware • Band-aware • Heartbeat-flushable • Shadow‑DB‑first
//        Logger‑v30 aligned • Environment‑aware • Route+Wave+Binary fields
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

console.log("%c📜 PULSE PROOF MONITOR v30.0 — [PulseProofMonitor v30] Loaded — World/Mesh/Band Membrane Active",
  "color:#0AFW9C; font-weight:bold; font-family:monospace;"
);

// ============================================================================
//  GLOBAL + DB + ENV
// ============================================================================
const C_ID   = "color:#0AFW9C; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";



// ============================================================================
// IMMORTAL v30+ WORKER ENVIRONMENT DETECTOR
// Safe for all runtimes, no instanceof, no undefined globals
// ============================================================================

function detectEnvironmentKind() {
  // WINDOW
  if (typeof document !== "undefined") {
    return "WINDOW";
  }

  // WORKER-LIKE (Dedicated / Shared / Service)
  if (typeof self !== "undefined" && typeof PulseRealm.postMessage === "function") {
    const tag = Object.prototype.toString.call(self);

    // Dedicated Worker
    if (tag.includes("DedicatedWorkerGlobalScope")) return "WORKER";

    // Shared Worker
    if (tag.includes("SharedWorkerGlobalScope")) return "SHARED_WORKER";

    // Service Worker
    if (tag.includes("ServiceWorkerGlobalScope")) return "SERVICE_WORKER";

    // Generic Worker (fallback)
    return "WORKER";
  }

  // NODE
  if (typeof process !== "undefined" &&
      process.versions &&
      process.versions.node) {
    return "NODE";
  }

  // UNKNOWN
  return "UNKNOWN";
}


function detectNodeProcessId() {
  if (typeof process !== "undefined" && process.pid) {
    return process.pid;
  }
  return null;
}

function detectLayer(metaLayer = null) {
  if (metaLayer) return String(metaLayer).trim();
  const env = detectEnvironmentKind();
  switch (env) {
    case "WINDOW":
      return "WINDOW";
    case "WORKER":
      return "WORKER";
    case "SHARED_WORKER":
      return "SHARED_WORKER";
    case "SERVICE_WORKER":
      return "SERVICE_WORKER";
    case "NODE":
      return "NODE";
    default:
      return "UNKNOWN";
  }
}

// ============================================================================
//  ONLINE FLAG (v30: includes navigator.onLine + global flags)
// ============================================================================

function isOnline() {
  if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
    if (!navigator.onLine) return false;
  }

  if (typeof PulseRealm.PULSE_ONLINE === "boolean")
    return PulseRealm.PULSE_ONLINE;
  if (
    typeof window !== "undefined" &&
    typeof PulseRealm.PULSE_ONLINE === "boolean"
  )
    return PulseRealm.PULSE_ONLINE;
  if (typeof PulseRealm.PULSE_ONLINE === "boolean")
    return PulseRealm.PULSE_ONLINE;
  if (typeof PulseRealm.PULSE_ONLINE === "boolean") return PulseRealm.PULSE_ONLINE;

  // Default: assume offline-first
  return false;
}

// ============================================================================
//  ORGAN IDENTITY — v30 IMMORTAL WORLD PROOF MONITOR
// ============================================================================

export const PulseRole = {
  type: "Organ",
  subsystem: "ProofLayer",
  layer: "ProofVitalsMonitor",
  version: "30.0-Immortal-World-Proof-Monitor",
  identity: "PulseProofVitalsMonitor-v30",

  evo: {
    // v24 core
    driftProof: true,
    deterministicVitals: true,
    zeroDriftAverages: true,

    backendOptional: true,
    noRouting: true,
    noHealing: true,
    noOrgans: true,
    noControl: true,

    metricsOnly: true,
    binaryAware: true,
    dualBandAware: true,
    presenceAware: true,
    advantageAware: true,
    speedAware: true,
    experienceAware: true,

    proxyTierAware: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    futureEvolutionReady: true,

    alwaysOn: true,
    spinalAware: true,
    cnsAware: true,
    pageScannerAware: true,
    errorSpineAware: true,
    routerMemoryAware: true,

    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,
    loggerAligned: true,
    monitorSeparated: true,

    chunkAligned: true,
    chunkProfileAware: true,
    actNowAware: true,
    powerAware: true,
    compilerAware: true,

    // v30 world extensions
    worldAware: true,
    meshAware: true,
    internetAware: true,
    bandAware: true,
    heartbeatAware: true,
    shadowDbPreferred: true,
    loggerV30Aligned: true,
    environmentAware: true,
    routeSignatureAware: true,
    waveFieldAware: true,
    binaryFieldAware: true
  }
};

const PROOF_CONTEXT = {
  layer: PulseRole.layer,
  role: PulseRole.identity,
  version: PulseRole.version,
  lineage: "proof-core-v30",
  evo: PulseRole.evo
};

const VITALS_CONTEXT = {
  ...PROOF_CONTEXT,
  organ: "VitalsMonitor"
};

// ============================================================================
//  ICONS / HEALTH
// ============================================================================

const ICON = {
  update: "🩸",
  trust: "🧪",
  phase: "📊",
  hub: "🛰️",
  alloc: "⚙️",
  warn: "⚠️",
  error: "🟥",
  ok: "🟢",
  pulse: "💓",
  death: "💀",
  route: "🛰️",
  drift: "🌊",
  spine: "🧵",
  cns: "🧠",
  mesh: "🕸️",
  world: "🌍",
  internet: "📡",
  heartbeat: "💓"
};

const HEALTH = {
  healthy: "|",
  stable: "|",
  degrading: "~",
  critical: "X",
  unknown: "?"
};

function makeHealthBar(status) {
  const sym = HEALTH[status] || HEALTH.unknown;
  switch (status) {
    case "healthy":
      return `${sym} OK`;
    case "stable":
      return `${sym} STABLE`;
    case "degrading":
      return `${sym} DEGRADED`;
    case "critical":
      return `${sym} BROKEN`;
    default:
      return `${sym} UNKNOWN`;
  }
}

// ============================================================================
//  LOCAL STORAGE BUFFER — v30 IMMORTAL WORLD
// ============================================================================

const VITALS_LS_KEY = "PulseVitals.v30.buffer";
const VITALS_LS_MAX = 8000; // doubled for world+mesh

const IDB_DB_NAME = "PulseProofMonitor_v30";
const IDB_STORE_NAME = "monitor";
const IDB_MAX_ENTRIES = 100000;

let idbAvailable = false;
let idbDb = null;

function openIndexedDB() {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    const req = indexedDB.open(IDB_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME, { keyPath: "id" });
      }
    };
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => {
      resolve(null);
    };
  });
}

async function ensureIndexedDB() {
  if (idbDb || idbAvailable === false) return idbDb;
  const db = await  openIndexedDB();
  if (db) {
    idbDb = db;
    idbAvailable = true;
  } else {
    idbAvailable = false;
  }
  return idbDb;
}
async function loadVitalsBuffer() {
  const db = await  ensureIndexedDB();
  if (!db) return [];

  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE_NAME, "readonly");
      const store = tx.objectStore(IDB_STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const rows = req.result || [];
        resolve(rows.sort((a, b) => a.id - b.id));
      };

      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

async function saveVitalsBuffer(buf) {
  const db = await  ensureIndexedDB();
  if (!db) return;

  const trimmed =
    buf.length > VITALS_LS_MAX
      ? buf.slice(buf.length - VITALS_LS_MAX)
      : buf;

  try {
    // wipe old vitals
    const txClear = db.transaction(IDB_STORE_NAME, "readwrite");
    txClear.objectStore(IDB_STORE_NAME).clear();

    // write new vitals
    const tx = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = tx.objectStore(IDB_STORE_NAME);

    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch {
    // never throw
  }
}

// ============================================================================
//  VITALS ENTRY BUILDER (v30: env + band + world fields)
// ============================================================================

function buildVitalsEntry(kind, payload) {
  const envLayer = detectLayer();
  const nodePid = detectNodeProcessId();

  const band = payload.band || "dual";
  const presenceField = payload.presenceField || null;
  const advantageField = payload.advantageField || null;
  const waveField = payload.waveField || null;
  const binaryField = payload.binaryField || null;
  const routeSignature = payload.routeSignature || null;
  const heartbeatCycle = payload.heartbeatCycle || null;
  const meshHopCount = payload.meshHopCount || null;
  const worldSurface = payload.worldSurface || null;

  return {
    ts: PulseRealm.PulseNOW,
    kind,
    payload,
    context: {
      layer: VITALS_CONTEXT.layer,
      organ: VITALS_CONTEXT.organ,
      version: VITALS_CONTEXT.version,
      subsystem: PulseRole.subsystem,
      identity: PulseRole.identity
    },
    env: {
      kind: envLayer,
      nodePid
    },
    band,
    presenceField,
    advantageField,
    waveField,
    binaryField,
    routeSignature,
    heartbeatCycle,
    meshHopCount,
    worldSurface,
    synced: false,
    schemaVersion: "30.0"
  };
}

async function appendVitalsEntry(kind, payload) {
  const entry = buildVitalsEntry(kind, payload);

  const buf = await loadVitalsBuffer();
  buf.push(entry);
  saveVitalsBuffer(buf);

  // Mirror into GLOBAL_LOGS via logger
  PulseRealm.pulseLog({
    subsystem: "Proof",
    system: "Portal",
    organ: VITALS_CONTEXT.organ,
    layer: VITALS_CONTEXT.layer,
    message: `[VitalsMonitor] ${kind}`,
    extra: payload,
    level: "log",
    band: entry.band,
    presenceField: entry.presenceField,
    advantageField: entry.advantageField,
    speedField: payload.speedField || null,
    experienceField: payload.experienceField || null
  });
}

// ============================================================================
//  FIREBASE FLUSH — v30 MONITOR COLLECTION (ASYNC, OPTIONAL)
// ============================================================================

const MONITOR_COLLECTION_V30 = "MONITOR_LOGS_V30";
const PERFORMANCE_LOG_COLLECTION = "MonitorPerformanceLogsV30";

async function flushVitalsToFirebase() {

  const buf = await loadVitalsBuffer();
  if (!buf.length) return;

  const remaining = [];

  for (const entry of buf) {
    if (entry.synced) {
      remaining.push(entry);
      continue;
    }
    try {
      await PulseRealm.PulseFirebaseDB.collection(MONITOR_COLLECTION_V30).add(entry);
      entry.synced = true;
      remaining.push(entry);
    } catch {
      remaining.push(entry);
      break;
    }
  }

  saveVitalsBuffer(remaining);
}

if (typeof window !== "undefined") {
  if (isOnline()) flushVitalsToFirebase().catch(() => {});
  window.addEventListener("online", () => flushVitalsToFirebase().catch(() => {}));
}

// ============================================================================
//  CONSTANTS / CONFIG (v30)
// ============================================================================

export const NORMAL_MAX = 4;
export const UPGRADED_MAX = 8;
export const HIGHEND_MAX = 8;
export const TEST_EARN_MAX = 16;

export const UPGRADED_MULT = 2;
export const HIGHEND_MULT = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_PERFORMANCE_LOGGING = true;

// ============================================================================
//  BACKEND METRICS (v30: same semantics, world-aware payload)
// ============================================================================

export async function updateUserMetrics(userId, data = {}) {
  const uid = userId || "anonymous";

  const localPayload = {
    userId: uid,
    ...data,
    band: data.band || "dual",
    binaryArtery: !!data.binaryArtery,
    meshRelay: !!data.meshRelay,
    meshPing: !!data.meshPing,
    hubFlag: !!data.hubFlag,
    worldSurface: data.worldSurface || null
  };

  PulseRealm.PulseLog("vitals", `${ICON.update} update_local_v30`, localPayload);
  appendVitalsEntry("metrics_update", localPayload);

  if (!userId || userId === "anonymous") return;

  const payload = {
    userId,
    bytes: data.bytes ?? 0,
    durationMs: data.durationMs ?? 0,
    meshRelay: !!data.meshRelay,
    meshPing: !!data.meshPing,
    hubFlag: !!data.hubFlag,
    band: localPayload.band,
    binaryArtery: localPayload.binaryArtery,
    worldSurface: localPayload.worldSurface
  };

  const ref = PulseRealm.PulseFirebaseDB.collection("UserMetricsV30").doc(userId);
  const now = PulseRealm.PulseNOW;

  try {
    await PulseRealm.PulseFirebaseDB.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const existing = snap.exists ? snap.data() : {};

      const totalRequests = (existing.totalRequests || 0) + 1;
      const totalBytes = (existing.totalBytes || 0) + (data.bytes || 0);

      let avgLatency = existing.avgLatency || 0;
      if (data.durationMs != null) {
        if (!existing.totalRequests) avgLatency = data.durationMs;
        else
          avgLatency =
            (avgLatency * existing.totalRequests + data.durationMs) /
            totalRequests;
      }

      const meshRelays = (existing.meshRelays || 0) + (data.meshRelay ? 1 : 0);
      const meshPings = (existing.meshPings || 0) + (data.meshPing ? 1 : 0);
      const hubSignals = (existing.hubSignals || 0) + (data.hubFlag ? 1 : 0);
      const stabilityScore = existing.stabilityScore || 0;

      tx.set(
        ref,
        {
          userId,
          totalRequests,
          totalBytes,
          avgLatency,
          meshRelays,
          meshPings,
          hubSignals,
          stabilityScore,
          lastSeen: now,
          updatedAt: now
        },
        { merge: true }
      );
    });
  } catch (err) {
    PulseRealm.PulseError("vitals", `${ICON.error} metrics_update_failed_v30`, {
      error: String(err),
      band: localPayload.band,
      binaryArtery: localPayload.binaryArtery
    });
  }

  if (ENABLE_PERFORMANCE_LOGGING) {
    try {
      await PulseRealm.PulseFirebaseDB.collection(PERFORMANCE_LOG_COLLECTION).add({
        ...VITALS_CONTEXT,
        userId,
        ts: PulseRealm.PulseNOW,
        bytes: data.bytes ?? null,
        durationMs: data.durationMs ?? null,
        meshRelay: data.meshRelay ?? false,
        meshPing: data.meshPing ?? false,
        hubFlag: data.hubFlag ?? false,
        band: localPayload.band,
        binaryArtery: localPayload.binaryArtery,
        worldSurface: localPayload.worldSurface
      });

      PulseRealm.PulseLog("vitals", `${ICON.ok} snapshot_logged_remote_v30`, {
        userId,
        band: localPayload.band,
        binaryArtery: localPayload.binaryArtery
      });
    } catch (err) {
      PulseRealm.PulseError("vitals", `${ICON.error} snapshot_failed_remote_v30`, {
        error: String(err),
        band: localPayload.band,
        binaryArtery: localPayload.binaryArtery
      });
    }
  }
}

// ============================================================================
//  PURE FUNCTIONS — TRUST / PHASE / HUB / ALLOCATION (v30)
// ============================================================================

export function calculateTrustScore(metrics) {
  if (!metrics) return 0;

  let score = 0;

  score += Math.min((metrics.totalRequests || 0) / 100, 20);
  score += Math.min((metrics.meshRelays || 0) / 10, 20);
  score += Math.min((metrics.hubSignals || 0) / 5, 20);

  if (metrics.avgLatency && metrics.avgLatency < 150) score += 20;

  score += metrics.stabilityScore || 0;

  const final = Math.min(score, 100);

  const payload = {
    userId: metrics.userId ?? "?",
    score: final,
    band: metrics.band || "dual",
    binaryArtery: !!metrics.binaryArtery
  };

  PulseRealm.PulseLog("vitals", `${ICON.trust} trust_score_v30`, payload);
  appendVitalsEntry("trust_score", payload);

  return final;
}

export function calculatePhase(trustScore) {
  let phase = 1;

  if (trustScore < 25) phase = 1;
  else if (trustScore < 50) phase = 2;
  else if (trustScore < 75) phase = 3;
  else phase = 4;

  const payload = {
    trustScore,
    phase,
    band: "dual",
    binaryArtery: false
  };

  PulseRealm.PulseLog("vitals", `${ICON.phase} phase_v30`, payload);
  appendVitalsEntry("phase", payload);

  return phase;
}

export function isHub(metrics) {
  if (!metrics) return false;

  const hub =
    (metrics.meshRelays || 0) > 50 ||
    (metrics.hubSignals || 0) > 20 ||
    (metrics.totalRequests || 0) > 500;

  if (hub) {
    const payload = {
      userId: metrics.userId ?? "?",
      relays: metrics.meshRelays,
      hubSignals: metrics.hubSignals,
      totalRequests: metrics.totalRequests,
      band: metrics.band || "dual",
      binaryArtery: !!metrics.binaryArtery
    };

    PulseRealm.PulseWarn("vitals", `${ICON.hub} hub_detected_v30`, payload);
    appendVitalsEntry("hub_detected", payload);
  }

  return hub;
}

export function allocateInstances(
  phase,
  hubFlag,
  deviceTier,
  earnMode,
  testEarnActive
) {
  if (!isOnline()) return;
  let base = phase >= 2 ? 2 : 1;

  if (hubFlag) base *= 2;
  if (deviceTier === "upgraded") base *= UPGRADED_MULT;
  if (deviceTier === "highend") base *= HIGHEND_MULT;
  if (earnMode) base = Math.floor(base * EARN_MODE_MULT);
  if (testEarnActive) base = TEST_EARN_MAX;

  const max =
    testEarnActive
      ? TEST_EARN_MAX
      : deviceTier === "upgraded"
      ? UPGRADED_MAX
      : deviceTier === "highend"
      ? HIGHEND_MAX
      : NORMAL_MAX;

  const final = Math.max(1, Math.min(base, max));

  const payload = {
    phase,
    hubFlag,
    deviceTier,
    earnMode,
    testEarnActive,
    final,
    band: "dual",
    binaryArtery: false
  };

  PulseRealm.PulseLog("vitals", `${ICON.alloc} instance_allocation_v30`, payload);
  appendVitalsEntry("instance_allocation", payload);

  return final;
}

// ============================================================================
//  ROUTE SCAN — READ-ONLY VISUALIZATION (v30 WORLD VIEW)
// ============================================================================

export function printRouteScan(route = {}) {
  console.groupCollapsed(
    "%c🔍 ROUTE SCAN — PulseOS v30‑IMMORTAL‑WORLD‑PROOF‑MONITOR",
    "color:#03A9F4; font-weight:bold;"
  );

  const nodes = [
    ["Brain", "🧠", route.brain, "#7C4DFF"],
    ["Synapse", "⚡", route.synapse, "#42A5F5"],
    ["Spine", "🧵", route.spine, "#26A69A"],
    ["Heart", "🫀", route.heart, "#E53935"],
    ["PulseBand", "📡", route.band, "#EC407A"],
    ["Router", "🛰️", route.router, "#26C6DA"],
    ["Proxy", "🌐", route.proxy, "#29B6F6"],
    ["Vitals", "🩸", route.vitals, "#FF7043"],
    ["History", "📜", route.history, "#BDBDBD"],
    ["Purifier", "🧹", route.purifier, "#8D6E63"],
    ["Mesh", ICON.mesh, route.mesh, "#7E57C2"],
    ["Internet", ICON.internet, route.internet, "#8D6E63"],
    ["World", ICON.world, route.world, "#26A69A"]
  ];

  for (const [name, icon, status, color] of nodes) {
    const bar = makeHealthBar(status || "unknown");
    PulseRealm.PulseLog(
  "proof",
      `%c${icon}  ${name.padEnd(14)} → ${bar}`,
      `color:${color}; font-weight:bold;`
    );
  }

  console.groupEnd();
}

// ============================================================================
//  ATTACH VITALS MONITOR (v30: heartbeat + mesh + world)
// ============================================================================

function safeGroup(label, fn) {
  try {
    if (console.groupCollapsed) {
      console.groupCollapsed(label);
      fn();
      console.groupEnd();
    } else {
      fn();
    }
  } catch {
    // never throw
  }
}

export function attachVitalsMonitor({
  EventBus,
  RouterMemory,
  PageScanner,
  ErrorSpine,
  getCurrentUserId,
  HeartbeatBus,
  MeshBus
} = {}) {
  const VitalsState = {
    lastImpulseSeq: 0,
    lastRouteSeq: 0,
    lastHeartbeatSeq: 0,
    lastDriftSeq: 0,
    lastErrorSeq: 0,
    lastMeshSeq: 0,
    lastWorldSeq: 0,
    organismAlive: true
  };

  function currentUserId() {
    try {
      return typeof getCurrentUserId === "function"
        ? getCurrentUserId() || "anonymous"
        : "anonymous";
    } catch {
      return "anonymous";
    }
  }

  function markPulse(kind, details = {}) {
    const payload = {
      kind,
      ts: PulseRealm.PulseNOW,
      userId: currentUserId(),
      ...details
    };

    PulseRealm.PulseLog("vitals", `${ICON.pulse} pulse_v30`, payload);
    appendVitalsEntry("pulse", payload);
  }

  function markOrganismDeath(reason) {
    if (!VitalsState.organismAlive) return;
    VitalsState.organismAlive = false;

    const payload = {
      reason,
      band: "dual",
      binaryArtery: false
    };

    PulseRealm.PulseError("vitals", `${ICON.death} organism_death_v30`, payload);
    appendVitalsEntry("organism_death", payload);

    safeGroup("%c💀 ORGANISM DEATH DETECTED v30", () => {
      PulseRealm.PulseLog(
  "proof","Reason:", reason);
      PulseRealm.PulseLog(
  "proof","VitalsState:", VitalsState);
    });
  }

  // Spinal impulses / CNS routes / heartbeat / any EventBus events
  if (EventBus && typeof EventBus.on === "function") {
    EventBus.on("spinal:impulse", (evt) => {
      VitalsState.lastImpulseSeq += 1;
      markPulse("spinalImpulse", {
        seq: VitalsState.lastImpulseSeq,
        source: evt.source || "unknown",
        modeKind: evt.modeKind || "symbolic"
      });
    });

    EventBus.on("cns:route", (evt) => {
      VitalsState.lastRouteSeq += 1;
      markPulse("cnsRoute", {
        seq: VitalsState.lastRouteSeq,
        type: evt.type || "unknown",
        band: evt.band || "symbolic",
        routeSignature: evt.routeSignature || null
      });
    });

    EventBus.on("heartbeat", (evt) => {
      VitalsState.lastHeartbeatSeq += 1;
      markPulse("heartbeat", {
        seq: VitalsState.lastHeartbeatSeq,
        source: evt.source || "unknown",
        heartbeatCycle: evt.cycle || null,
        band: evt.band || "dual"
      });
    });

    EventBus.on("organism:death", (evt) => {
      markOrganismDeath(evt.reason || "unknown");
    });
  }

  // Heartbeat bus (optional, world pacemaker)
  if (HeartbeatBus && typeof HeartbeatBus.on === "function") {
    HeartbeatBus.on("heartbeat:world", (packet) => {
      VitalsState.lastHeartbeatSeq += 1;
      markPulse("worldHeartbeat", {
        seq: VitalsState.lastHeartbeatSeq,
        heartbeatCycle: packet.cycle || null,
        advantageField: packet.advantageField || null,
        waveField: packet.waveField || null,
        binaryField: packet.binaryField || null,
        band: "dual"
      });
    });
  }

  // Mesh bus (optional)
  if (MeshBus && typeof MeshBus.on === "function") {
    MeshBus.on("mesh:hop", (packet) => {
      VitalsState.lastMeshSeq += 1;
      markPulse("meshHop", {
        seq: VitalsState.lastMeshSeq,
        meshHopCount: packet.hopCount || 1,
        routeSignature: packet.routeSignature || null,
        band: packet.band || "dual"
      });
    });

    MeshBus.on("mesh:worldSurface", (packet) => {
      VitalsState.lastWorldSeq += 1;
      markPulse("worldSurface", {
        seq: VitalsState.lastWorldSeq,
        worldSurface: packet.surface || null,
        band: packet.band || "dual"
      });
    });
  }

  // RouterMemory snapshot (read-only)
  if (RouterMemory && typeof RouterMemory.getAll === "function") {
    try {
      const logs = RouterMemory.getAll() || [];
      if (logs.length > 0) {
        safeGroup("%c🩸 ROUTER MEMORY SNAPSHOT v30", () => {
          PulseRealm.PulseLog(
  "proof","count:", logs.length);
        });
        markPulse("routerMemorySnapshot", { count: logs.length });
      }
    } catch {
      // never throw
    }
  }

  // PageScanner drift intel
  if (PageScanner && typeof PageScanner.onEvent === "function") {
    const original = PageScanner.onEvent;
    PageScanner.onEvent = function patched(packet) {
      VitalsState.lastDriftSeq += 1;

      markPulse("pageScannerDrift", {
        seq: VitalsState.lastDriftSeq,
        severity: packet.severity ?? 0,
        tooFar: !!packet.tooFar
      });

      return original.call(PageScanner, packet);
    };
  }

  // Error spine
  if (ErrorSpine && typeof ErrorSpine.on === "function") {
    ErrorSpine.on("error", (evt) => {
      VitalsState.lastErrorSeq += 1;
      markPulse("errorSpine", {
        seq: VitalsState.lastErrorSeq,
        message: String(evt.message || evt || "unknown")
      });
    });
  }

  // Frontend global error hook
  if (typeof window.addEventListener === "function") {
    window.addEventListener("error", (event) => {
      VitalsState.lastErrorSeq += 1;
      markPulse("windowError", {
        seq: VitalsState.lastErrorSeq,
        message: event.message || "unknown"
      });
    });
  }

  PulseRealm.PulseLog("vitals", `${ICON.ok} monitor_attached_v30`, {
    band: "dual",
    binaryArtery: false
  });
  appendVitalsEntry("monitor_attached", {
    ts: PulseRealm.PulseNOW,
    band: "dual",
    binaryArtery: false
  });

  return {
    PulseRole,
    VitalsState
  };
}

// ============================================================================
//  VITALS STORE + EXPORT SURFACE (v30)
// ============================================================================

export const PulseVitalsStore = {
  getAll() {
    return loadVitalsBuffer();
  },
  clear() {
    saveVitalsBuffer([]);
  },
  tail(n = 200) {
    const buf = loadVitalsBuffer();
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  }
};

export const VitalsMonitor = {
  PulseRole,

  updateUserMetrics,
  calculateTrustScore,
  calculatePhase,
  isHub,
  allocateInstances,

  printRouteScan,
  attachVitalsMonitor,

  NORMAL_MAX,
  UPGRADED_MAX,
  HIGHEND_MAX,
  TEST_EARN_MAX,
  UPGRADED_MULT,
  HIGHEND_MULT,
  EARN_MODE_MULT,
  ENABLE_PERFORMANCE_LOGGING,
  PERFORMANCE_LOG_COLLECTION,

  PulseVitalsStore,

  meta: {
    layer: PulseRole.layer,
    subsystem: PulseRole.subsystem,
    version: PulseRole.version,
    identity: PulseRole.identity
  }
};

// ============================================================================
//  GLOBAL BINDING (OPTIONAL, WORLD-SAFE)
// ============================================================================

try {

    PulseRealm.PulseVitalsStore = PulseVitalsStore;
    PulseRealm.VitalsMonitor = VitalsMonitor;
    PulseRealm.PulseMonitor = VitalsMonitor;
  
} catch {
  // never throw
}
