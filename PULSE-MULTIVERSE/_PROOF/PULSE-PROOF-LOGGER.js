// ============================================================================
// PulseProofLogger-v30-IMMORTAL-OMNIBAND
// PURE APPEND-ONLY LOGGER — ZERO ASYNC, ZERO NETWORK, HEARTBEAT/WORKER/IDB-FLUSHABLE
// Designed for 5ms bursts of 5000+ messages without blocking or drift.
// Multi-band • Multi-surface • Mesh-aware • Shadow/Offline-first
// ============================================================================
//
// v30 EVOLUTION DELTAS
// --------------------
// • Omniband environment map: window / worker / node / service-worker / shared-worker
// • Triple-buffer logging: RAM ring → microtask queue → storage (IndexedDB)
// • IndexedDB fallback for high-volume logs (when LS is too small)
// • Mesh-aware: logs tagged with meshNodeId / meshRoute / bandMode
// • Heartbeat + UIFlow + ErrorSpine alignment fields baked into log meta
// • Shadow fetch + Shadow DB awareness (db/fetchfn hooks, but never used directly)
// • Deterministic schema v30.0, backward-compatible reader for v24
// • “Pulse:” console commands extended: Help / Logs / Tail / Clear / Stats
// ============================================================================
// Capture original console to avoid recursion and preserve native behavior

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// ⚡ COMPILED-SAFE: bind native console methods BEFORE any override can fire.
// Using Function.prototype.bind.call guarantees we hold the true native reference
// even when this module executes inside an esbuild-compiled bundle where module
// initialisation order differs from individual <script type="module"> loading.
const _native = {
  log:            Function.prototype.bind.call(console.log,            console),
  warn:           Function.prototype.bind.call(console.warn,           console),
  error:          Function.prototype.bind.call(console.error,          console),
  group:          Function.prototype.bind.call(console.group,          console),
  groupCollapsed: Function.prototype.bind.call(console.groupCollapsed, console),
  groupEnd:       Function.prototype.bind.call(console.groupEnd,       console),
  info:           Function.prototype.bind.call(console.info,           console),
  debug:          Function.prototype.bind.call(console.debug,          console),
};

// ⚡ Expose native console on PulseRealm so compiled-bundle modules
// (PULSE-PROOF-GPU etc.) can bypass the logger override chain.
PulseRealm._nativeConsole = _native;

// Global Pulse log governor

let LogCount = 0;
let LogOverflow = false;
let ErrorCount = 0;
const MAX_LOGS = 2000;
const MAX_ERRORS = 200;

// Wrap each console method with a safety buffer
function makeBuffered(fn) {
  return (...args) => {
      if (LogCount >= MAX_LOGS) {
          if (!LogOverflow) {
              LogOverflow = true;
              fn("⚠ LOG buffer overflow — further logs suppressed");
          }
          return;
      }
      LogCount++;
      fn(...args);
  };
}


// PulseConsole — buffered wrappers around the true native methods.
// Built from _native so makeBuffered always wraps the original browser console,
// not any previously-overridden version of console.*
const PulseConsole = {
  log:            makeBuffered(_native.log),
  warn:           makeBuffered(_native.warn),
  error:          makeBuffered(_native.error),
  group:          makeBuffered(_native.group),
  groupCollapsed: makeBuffered(_native.groupCollapsed),
  groupEnd:       makeBuffered(_native.groupEnd),
  info:           makeBuffered(_native.info),
  debug:          makeBuffered(_native.debug),
};


// Keep a small rolling memory of recent log messages
const __pulseLogMemory = new Set();
const __pulseLogMemoryLimit = 2000; // prevent infinite growth


console.log(
  "%c🖨️ PULSE PROOF LOGGER v30.0 — [PulseProofLogger v30] %c Initializing PulseProofLogger at your Service %c→ %s",
  "color:#90CAF9; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;",
  "color:#E8F8FF; font-family:monospace;",
  " Just Give it to me Like it IS!"
);

// ============================================================================
// GLOBAL LOGGER BINDINGS — v31 IMMORTAL HYBRID
// ============================================================================
(function bindLoggerV31() {
  try {

      PulseRealm.log = log;
      PulseRealm.warn = warn;
      PulseRealm.error = error;
      PulseRealm.PulseWarn = warn;
      PulseRealm.PulseError = error;
      PulseRealm.PulseLog = log;
      PulseRealm.critical = critical;
      PulseRealm.group = group;
      PulseRealm.groupEnd = groupEnd;
      PulseRealm.groupStart = groupStart;
      PulseRealm.PulseCritical = critical;
      PulseRealm.PulseGroup = group;
      PulseRealm.PulseGroupStart = groupStart;
      PulseRealm.PulseGroupEnd = groupEnd;

      const nativeConsoleError = console.error.bind(console);
      const nativeConsoleWarn = console.warn.bind(console);
      const nativeConsoleLog = console.log.bind(console);


      console.log = (...args) => log(...args);
      console.warn = (...args) => warn(...args);
      console.error = (...args) => error(...args);
      console.critical = (...args) => critical(...args);
      console.group = (...args) => group(...args);
      console.groupCollapsed = (...args) => groupCollapsed(...args);
      console.groupStart = (...args) => groupStart(...args);
      console.groupEnd = (...args) => groupEnd(...args);

  } catch (err) {
  }
})();


const PULSE_TOUCH_VERSION = "33.0-IMMORTAL-INTEL-HYBRID";


const PulseVersion = {
  proof: "30.0",
  trust: "40.0",
  logger: "30.0",
  renderer: "32.0",
  chunker: "32.0",
  port: "40.0",
  reflex: "40.0",
  gpu: "31.0",
  band: "40.0",
  genome: "40.0",
  vault: "20.0",
  gate: "32.0",
  boot: "40.0",
  hooks: "30.0",
  endpoint: "34.0",
  router: "30.0",
  database: "32.0",
  expansion: "30.0",
  portal: "33.0",
  bridge: "31.0",
  internet: "30.0",
  memory: "30.0",
  pages: "30.0",
  cns: "34.0",
  world: "30.0",
  mesh: "30.0",
  ai: "30.0",
  signal: "30.0",
  heartbeat: "30.0",
  uiflow: "30.0",
  errorSpine: "30.0"
};
const PulseVersionFallback = "30.x";

PulseRealm.PulseVersion = PulseVersion;
PulseRealm.PulseVersionFallback = PulseVersionFallback;

const PulseRoles = {
  proof: "PULSE PROOF MONITOR",
  logger: "PULSE PROOF LOGGER",
  trust: "PULSE PROOF TRUST",
  renderer: "PULSE MULTIVERSAL RENDERER",
  chunker: "PULSE MULTIVERSAL RENDERER",
  port: "PULSE PROTOCOL PORTS",
  reflex: "PULSE PROOF MONITOR",
  gpu: "PULSE MULTIVERSAL GPU/IGPU RENDERER",
  genome: "PULSE WORLD GENOMES",
  band: "PULSE BAND NETWORK",
  database: "PULSE CACHE/DB SYSTEM",
  vault: "PULSE VAULT SUBSYSTEM",
  gate: "PULSE UNIVERSAL GATEWAY",
  hooks: "PULSE HOOKS REGISTRY",
  endpoint: "PULSE USER ENDPOINT",
  galaxy: "PULSE GALACTIC SATELLITES",
  boot: "PULSE MULTIVERSAL BOOT",
  router: "PULSE UNIVERSAL ROUTER",
  expansion: "PULSE EXPANSION ENGINE",
  portal: "PULSE WORLD PORTAL",
  bridge: "PULSE WORLD BRIDGE",
  internet: "PULSE INTERNET ROUTER",
  memory: "PULSE CORE MEMORY",
  pages: "PULSE PAGE SUBSYSTEM",
  cns: "PULSE STRANDED DNA",
  world: "PULSE WORLD SUBSYSTEM",
  mesh: "PULSE MULTIVERSAL MESH",
  ai: "PULSE AI SUBSYSTEM",
  signal: "PULSE WORLD PROTOCOL",
  heartbeat: "PULSE HEARTBEAT PACEMAKER",
  uiflow: "PULSE UIFLOW ENGINE",
  errorSpine: "PULSE ERROR SPINE"
};

const PulseRoleFallback = "PULSE-NODE";

PulseRealm.PulseRoles = PulseRoles;
PulseRealm.PulseRoleFallback = PulseRoleFallback;

const PulseColors = {
  proof: "#4DD0E1",
  logger: "#90CAF9",
  renderer: "#29B6F6",
  chunker: "#29B6F6",
  trust: "#29B6F6",
  port: "#90CAF9",
  galaxy: "#FFCA28",
  gate: "#FFA726",
  boot: "#29B6F6",
  reflex: "#4DD0E1",
  gpu: "#FFCA28",
  genome: "#EF5350",
  database: "#42A5F5",
  band: "#66BB6A",
  vault: "#26C6DA",
  ui: "#AB47BC",
  endpoint: "#FFA726",
  router: "#42A5F5",
  expansion: "#26A69A",
  bridge: "#A0FA9A",
  portal: "#FFCA28",
  internet: "#8D6E63",
  memory: "#5C6BC0",
  pages: "#26C6DA",
  cns: "#EF5350",
  world: "#26A69A",
  mesh: "#A0FA9A",
  ai: "#FFCA28",
  signal: "#90CAF9",
  heartbeat: "#FF8A65",
  uiflow: "#BA68C8",
  errorSpine: "#FF8A65"
};

const PulseColorFallback = "#4DD0E1";

PulseRealm.PulseColors = PulseColors;
PulseRealm.PulseColorFallback = PulseColorFallback;

const PulseIcons = {
  proof: "📜",
  logger: "🖨️",
  renderer: "✨",
  chunker: "✨",
  port: "📡",
  reflex: "📜",
  gpu: "🎨",
  database: "🗄️",
  galaxy: "🪐",
  band: "🧠",
  trust: "❤️",
  gate: "⛩️",
  vault: "🔐",
  hooks: "🪝",
  endpoint: "🌐",
  boot: "🌐",
  router: "🛰️",
  expansion: "🚀",
  bridge: "🌉",
  portal: "🌀",
  internet: "📡",
  memory: "💾",
  pages: "📄",
  cns: "🧬",
  genome: "🧬",
  world: "🌍",
  mesh: "🕸️",
  ai: "🤖",
  signal: "⟙",
  heartbeat: "❤️",
  uiflow: "🧭",
  errorSpine: "🩻"
};

const PulseIconsFallback = "🫁";

PulseRealm.PulseIcons = PulseIcons;
PulseRealm.PulseIconsFallback = PulseIconsFallback;

// ============================================================================
// ENV + LAYER DETECTION — v30 OMNIBAND
// ============================================================================
function normalizeLayerName(layer) {
  if (!layer) return null;
  return String(layer).trim();
}
function detectEnvironmentKind() {
  // WINDOW
  if (typeof document !== "undefined") {
    return "WINDOW";
  }

  // SERVICE WORKER
  if (typeof self !== "undefined" &&
      typeof PulseRealm.registration === "object" &&
      typeof PulseRealm.clients === "object") {
    return "SERVICE_WORKER";
  }

  // SHARED WORKER
  if (typeof self !== "undefined" &&
      typeof PulseRealm.SharedWorkerGlobalScope === "undefined" && // avoid reference
      typeof MessagePort !== "undefined" &&
      typeof PulseRealm.onconnect === "function") {
    return "SHARED_WORKER";
  }

  // DEDICATED WORKER
  if (typeof self !== "undefined" &&
      typeof PulseRealm.postMessage === "function" &&
      typeof PulseRealm.importScripts === "function") {
    return "WORKER";
  }

  // NODE
  if (typeof process !== "undefined" &&
      process.versions &&
      process.versions.node) {
    return "NODE";
  }

  return "UNKNOWN";
}

function detectLayer(metaLayer = null) {
  const explicit = normalizeLayerName(metaLayer);
  if (explicit) return explicit;

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
export function logError(envelope) {
  try {
    // Envelope must be an object; ignore anything else
    if (!envelope || typeof envelope !== "object") return;

    // NEVER throw, NEVER broadcast, NEVER recurse
    const logger = PulseRealm.PulseProofLogger;
    if (logger && typeof logger.logError === "function") {
      logger.logError(envelope);
    }
  } catch (err) {
    // Silent containment — this must NEVER escalate
    try {
      console.warn("[PulseProofLogger.logError] failed:", err);
    } catch {}
  }
}
function detectUsVsThem(layer) {
  const upper = String(layer || "").toUpperCase();
  return upper.includes("PULSENET") || upper.includes("PULSEWORLD") || upper.includes("MULTIVERSE") || upper.includes("UNIVERSE") || upper.includes("PulseBand") ? "US" : "THEM";
}
function detectPage() {
  return `/${PulseRealm.__PULSE_CURRENT_PAGE__}`;
}
function detectNodeProcessId() {
  if (typeof process !== "undefined" && process.pid) {
    return process.pid;
  }
  return null;
}

function detectMeshNodeId() {
  try {
    return (
      (PulseRealm.PulseMeshNodeId) ||
      (PulseRealm.PulseMeshNodeId) ||
      null
    );
  } catch {
    return null;
  }
}

function detectMeshRoute() {
  try {
    return (
      (PulseRealm.PulseMeshRoute) ||
      (PulseRealm.PulseMeshRoute) ||
      null
    );
  } catch {
    return null;
  }
}

function detectBandMode() {
  try {
    if (PulseRealm.PulseBand) {
      return PulseRealm.PulseBand.mode || "dual";
    }
  } catch {}
  return "dual";
}

// ============================================================================
// LOCAL PERSISTENCE STRATEGY — v30 (LS + IndexedDB triple-buffer)
// ============================================================================
const LS_KEY_LOGS = "PulseProofLogger.v30.logs";
const LS_MAX_ENTRIES = 32000; // doubled from v24

const IDB_DB_NAME = "PulseProofLogger_v30";
const IDB_STORE_NAME = "logs";
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

async function loadLogsFromIndexedDB() {
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

async function saveLogsToIndexedDB(entries) {
  const db = await  ensureIndexedDB();
  if (!db) return;

  const trimmed =
    entries.length > LS_MAX_ENTRIES
      ? entries.slice(entries.length - LS_MAX_ENTRIES)
      : entries;

  try {
    // wipe old logs
    const txClear = db.transaction(IDB_STORE_NAME, "readwrite");
    txClear.objectStore(IDB_STORE_NAME).clear();

    // write new logs
    const tx = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = tx.objectStore(IDB_STORE_NAME);

    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch (_) {
    // never throw from logger
  }
}


async function appendLogsToIndexedDB(entries) {
  const db = await  ensureIndexedDB();
  if (!db || !entries.length) return;

  try {
    const tx = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = tx.objectStore(IDB_STORE_NAME);

    for (const e of entries) {
      store.put(e);
    }

    tx.oncomplete = () => {};
    tx.onerror = () => {};
  } catch {
    // ignore
  }
}

async function trimIndexedDBIfNeeded() {
  const db = await  ensureIndexedDB();
  if (!db) return;

  try {
    const tx = db.transaction(IDB_STORE_NAME, "readonly");
    const store = tx.objectStore(IDB_STORE_NAME);
    const req = store.getAllKeys();
    req.onsuccess = async () => {
      const keys = req.result || [];
      if (keys.length <= IDB_MAX_ENTRIES) return;

      const toDelete = keys
        .sort()
        .slice(0, keys.length - IDB_MAX_ENTRIES);

      const txDel = db.transaction(IDB_STORE_NAME, "readwrite");
      const storeDel = txDel.objectStore(IDB_STORE_NAME);
      for (const k of toDelete) {
        storeDel.delete(k);
      }
    };
  } catch {
    // ignore
  }
}

// ------------------------------------------------------------
// 1. Startup: load logs into a REAL array
// ------------------------------------------------------------
let localLogBuffer = [];
let pendingFlush = false;
let flushQueue = [];

// Load from IDB once, then unify
(async () => {
  try {
    const rows = await loadLogsFromIndexedDB();
    localLogBuffer = Array.isArray(rows) ? rows : [];
  } catch {
    localLogBuffer = [];
  }
})();


function persistLocalLogs(entries) {
    if (entries.length > LS_MAX_ENTRIES) {
      localLogBuffer = entries.slice(entries.length - LS_MAX_ENTRIES);
    } else {
      localLogBuffer = entries;
    }
    return;
  saveLogsToIndexedDB(entries);
}

function appendLocalLog(entry) {
  localLogBuffer.push(entry);
  persistLocalLogs(localLogBuffer);

  // schedule microtask flush to IndexedDB (non-blocking)
  flushQueue.push(entry);
  if (!pendingFlush) {
    pendingFlush = true;
    Promise.resolve().then(async () => {
      const batch = flushQueue.slice();
      flushQueue = [];
      pendingFlush = false;
      await appendLogsToIndexedDB(batch);
      await trimIndexedDBIfNeeded();
    });
  }
}

function getLocalLogs({ level = null, subsystem = null } = {}) {
  return localLogBuffer.filter((e) => {
    if (level && e.level !== level) return false;
    if (subsystem && e.subsystem !== subsystem) return false;
    return true;
  });
}

function drainLocalLogsForHeartbeat() {
  const copy = localLogBuffer.slice();
  localLogBuffer = [];
  persistLocalLogs(localLogBuffer);
  return copy;
}
function extractPulseIdentityFromPrefix(prefix) {
  // prefix example: "[PulseWorldFirebaseGenome v30]"
  if (!prefix) return "Unknown";

  const match = prefix.match(/\[([^\s\]]+)/);
  return match ? match[1] : "Unknown";
}

// ============================================================================
// PREFIX FORMATTER — v30
// ============================================================================
function formatPrefix(subsystem, message) {
  const safe = subsystem || "legacy";
  const role = PulseRoles[safe] || PulseRoleFallback;
  const version = PulseVersion[safe] || PulseVersionFallback;
  const icon = PulseIcons[safe] || PulseIconsFallback;
  return `${icon} ${role} v${version}`;
}

// ============================================================================
// TELEMETRY PACKET — v30 (mesh + band + heartbeat fields)
// ============================================================================
export function makeTelemetryPacket(subsystem, event, data = {}) {
  const safe = subsystem || "legacy";
  const ts = PulseRealm.PulseNOW;

  const version = PulseVersion[safe] || PulseVersionFallback;
  const role = PulseRoles[safe] || PulseRoleFallback;
  const icon = PulseIcons[safe] || PulseIconsFallback;

  const band = data.band || detectBandMode();
  const presenceField = data.presenceField || null;
  const advantageField = data.advantageField || null;
  const speedField = data.speedField || null;
  const experienceField = data.experienceField || null;

  const binary = {
    artery: data.binaryArtery || false,
    channel: data.binaryChannel || null
  };

  const lineage = {
    id: data.lineageId || null,
    parent: data.lineageParent || null
  };

  const envKind = detectEnvironmentKind();
  const nodePid = detectNodeProcessId();
  const meshNodeId = detectMeshNodeId();
  const meshRoute = detectMeshRoute();

  // ⭐ NEW: Console logging for debugging
  console.log("[makeTelemetryPacket] subsystem:", safe);
  console.log("[makeTelemetryPacket] event:", event);
  console.log("[makeTelemetryPacket] ts:", ts);
  console.log("[makeTelemetryPacket] version:", version);
  console.log("[makeTelemetryPacket] role:", role);
  console.log("[makeTelemetryPacket] icon:", icon);
  console.log("[makeTelemetryPacket] band:", band);
  console.log("[makeTelemetryPacket] presenceField:", presenceField);
  console.log("[makeTelemetryPacket] advantageField:", advantageField);
  console.log("[makeTelemetryPacket] speedField:", speedField);
  console.log("[makeTelemetryPacket] experienceField:", experienceField);
  console.log("[makeTelemetryPacket] binary:", binary);
  console.log("[makeTelemetryPacket] lineage:", lineage);
  console.log("[makeTelemetryPacket] env:", {
    kind: envKind,
    nodePid,
    meshNodeId,
    meshRoute
  });
  console.log("[makeTelemetryPacket] raw data:", data);

  return {
    schemaVersion: "30.0",
    ts,
    subsystem: safe,
    event,
    version,
    role,
    icon,
    data,
    env: {
      kind: envKind,
      nodePid,
      meshNodeId,
      meshRoute
    },
    meta: {
      layer: "PulseProofLogger",
      version: "30.0-IMMORTAL-OMNIBAND",
      subsystem: safe,
      event,
      band,
      presenceField,
      advantageField,
      speedField,
      experienceField,
      binary,
      lineage
    }
  };
}

// ============================================================================
// IMMORTAL LOG ENTRY BUILDER — v30
// ============================================================================
let logIdCounter = PulseRealm.PulseNOW;

function makeLocalLogEntry(level, subsystem, message, rest, meta = {}) {
  const safe = subsystem || "legacy";

  const layer = detectLayer(meta.layer);
  const us_vs_them = detectUsVsThem(layer);
  const page = meta.page || detectPage();
  const func = meta.func || null;
  const system = meta.system || null;
  const subsystemName = meta.subsystem || safe;
  const organ = meta.organ || null;
  const extra = meta.extra || {};

  const band = meta.band || detectBandMode();
  const presenceField = meta.presenceField || null;
  const advantageField = meta.advantageField || null;
  const speedField = meta.speedField || null;
  const experienceField = meta.experienceField || null;

  const iqVersion = meta.iqVersion || null;
  const uiGenomeVersion = meta.uiGenomeVersion || null;
  const comfortPattern = meta.comfortPattern || null;
  const route = meta.route || null;
  const compilerVersion = meta.compilerVersion || null;
  const organismVersion = meta.organismVersion || null;

  const envKind = detectEnvironmentKind();
  const nodePid = detectNodeProcessId();
  const meshNodeId = detectMeshNodeId();
  const meshRoute = detectMeshRoute();

  const heartbeatCycle = meta.heartbeatCycle || null;
  const uiFlowStateId = meta.uiFlowStateId || null;
  const errorSpineSignature = meta.errorSpineSignature || null;

  return {
    schemaVersion: "30.0",
    id: `L${++logIdCounter}`,
    ts: PulseRealm.PulseNOW,
    level,
    subsystem: subsystemName,
    message,
    rest,
    layer,
    us_vs_them,
    system,
    organ,
    page,
    func,
    extra,
    band,
    presenceField,
    advantageField,
    speedField,
    experienceField,
    iqVersion,
    uiGenomeVersion,
    comfortPattern,
    route,
    compilerVersion,
    organismVersion,
    heartbeatCycle,
    uiFlowStateId,
    errorSpineSignature,
    env: {
      kind: envKind,
      nodePid,
      meshNodeId,
      meshRoute
    },
    synced: false
  };
}
// ============================================================================
// PULSE LOG — v31 (touch‑first, OrganismMap fallback)
// ============================================================================
export function pulseLog({
  layer = "Window",
  system = "Portal",
  subsystem = "Proof",
  organ = "VitalsLogger",
  page = "PULSE-PROOF-LOGGER",
  func = "Logging and Data",
  message = "The Best Way, Isn't Always the Most Known!",
  extra = {},
  level = "log",
  rest = [],
  band = "dualband",
  presenceField = null,
  advantageField = null,
  speedField = null,
  experienceField = null,
  iqVersion = null,
  uiGenomeVersion = null,
  comfortPattern = null,
  route = null,
  compilerVersion = null,
  organismVersion = "v40",
  heartbeatCycle = null,
  uiFlowStateId = null,
  errorSpineSignature = null
} = {}) {
  const detectedLayer = detectLayer(layer);
  const detectedPage = page || detectPage();
  const safeSubsystem = subsystem || "legacy";

  if (typeof func === "function") func = func.name || "anonymous";

  const meta = {
    layer: detectedLayer,
    system,
    subsystem: safeSubsystem,
    organ,
    page: detectedPage,
    func,
    extra,
    band,
    presenceField,
    advantageField,
    speedField,
    experienceField,
    iqVersion,
    uiGenomeVersion,
    comfortPattern,
    route,
    compilerVersion,
    organismVersion,
    heartbeatCycle,
    uiFlowStateId,
    errorSpineSignature
  };

  const entry = makeLocalLogEntry(level, safeSubsystem, message, rest, meta);
  appendLocalLog(entry);
}

// ============================================================================
// ARG NORMALIZATION — v31
// ============================================================================
function normalizeArgs(args) {
  const first = args[0];

  // ⭐ 1. Handle styled console logs with ANY number of %c segments
  // Example:
  if (typeof first === "string" && first.includes("%c")) {
    return {
      subsystem: null,
      message: first,       // keep the raw format string
      rest: args.slice(1),  // all style args + any %s replacements
      raw: true
    };
  }

  // ⭐ 2. Handle "comment" pattern
  if (
    args.length === 2 &&
    first === "comment" &&
    typeof args[1] === "object" &&
    args[1] !== null
  ) {
    const obj = args[1];

    const pretty =
      obj.pretty ||
      obj.summary ||
      obj.message ||
      obj.signalPacketType ||
      "signal-comment";

    return {
      subsystem: "signal",
      message: pretty,
      rest: [obj],
      raw: false
    };
  }

  // ⭐ 3. Handle string + object (e.g., log("msg", {data}))
  if (
    args.length >= 2 &&
    typeof first === "string" &&
    typeof args[1] === "object" &&
    args[1] !== null
  ) {
    return {
      subsystem: null,
      message: first,
      rest: args.slice(1),
      raw: false
    };
  }

  // ⭐ 4. Handle subsystem + message (string + string)
  if (
    args.length >= 2 &&
    typeof first === "string" &&
    typeof args[1] === "string" &&
    !first.startsWith(" • ") &&
    !first.startsWith(" ") &&
    !first.includes(" .")
  ) {
    return {
      subsystem: first,
      message: args[1],
      rest: args.slice(2),
      raw: false
    };
  }

  // ⭐ 5. Handle single object logs (log({a:1}))
  if (typeof first === "object" && first !== null) {
    return {
      subsystem: null,
      message: "",
      rest: [first],
      raw: false
    };
  }

  // ⭐ 6. Handle single primitive logs (log("hello"))
  if (args.length === 1) {
    return {
      subsystem: null,
      message: first,
      rest: [],
      raw: false
    };
  }

  // ⭐ 7. Fallback
  return {
    subsystem: null,
    message: args.join(" "),
    rest: [],
    raw: false
  };
}


// ============================================================================
// CHRONO CORE — v31 (absolute + delta)
// ============================================================================
let _pulseChronoLast =
  (PulseRealm.__PULSE_CHRONO_LAST__) ||
  (typeof performance !== "undefined" ? performance.now() : PulseRealm.PulseNOW);

function _chronoLabel(absolute) {
  const now =
    typeof performance !== "undefined" ? performance.now() : PulseRealm.PulseNOW;
  const diff = now - _pulseChronoLast;

  const label = absolute
    ? `@${now.toFixed(1)}ms`
    : `+${diff.toFixed(1)}ms`;

  _pulseChronoLast = now;
  if (typeof window !== "undefined") {
    PulseRealm.__PULSE_CHRONO_LAST__ = _pulseChronoLast;
  }
  return label;
}

// ============================================================================
// TOUCH‑FIRST / ORGANISM MAP FALLBACK — v31
// ============================================================================
function resolveFromTouch() {
  try {
    const touch = PulseRealm.__PULSE_TOUCH__;
    const passport = window || {};
    if (!touch && !passport) return null;
    return {
      PulseGlobal: window,
      subsystem:
        passport.subsystem ||
        passport.organ ||
        touch.subsystem ||
        "touch",
      version:
        passport.version ||
        touch.version ||
        "v35",
      color:
        passport.color ||
        touch.color ||
        PulseColorFallback,
      icon:
        passport.icon ||
        touch.icon ||
        PulseIconsFallback,
      instance: passport.passportInstance || passport.instance || null,
      trust: passport.trust || "baseline",
      continuity: passport.continuity || "",
      booted: passport.booted || 0,
      bootVideo: passport.bootVideo || 0,
      bootWorld: passport.bootWorld || 0,
      isMobile: passport.isMobile,
      presence: passport.presence || "",
      mode: passport.mode || "",
      coord: passport.coord || "W0.P0.R0.S0.SH0.PORTAL",
      stack: null
    };
  } catch {
    return null;
  }
}

function resolveFromOrganismMap() {
  try {
    if (typeof window === "undefined") {
      return {
        subsystem: "legacy",
        version: "v30",
        color: PulseColorFallback,
        icon: PulseIconsFallback
      };
    }

    // v31‑first map chain
    const map =
      PulseRealm.PulseOrganismMap ||
      null;

    if (map && typeof PulseRealm.PulseResolveCaller === "function") {
      return PulseRealm.PulseResolveCaller(new Error().stack);
    }

    return {
      subsystem: "legacy",
      version: "v30",
      color: PulseColorFallback,
      icon: PulseIconsFallback
    };
  } catch {
    return {
      subsystem: "legacy",
      version: "v30",
      color: PulseColorFallback,
      icon: PulseIconsFallback
    };
  }
}

function resolveMetaTouchFirst() {
  // 1) Touch snapshot
  const fromTouch = resolveFromTouch();
  if (fromTouch) return fromTouch;

  // 2) OrganismMap chain
  return resolveFromOrganismMap();
}

// ============================================================
//  INTERNAL: DEDUPE
// ============================================================
function dedupe(signature, rest = []) {
  if (rest.length > 0) return false; // Logs with data/objects are unique
  if (__pulseLogMemory.has(signature)) return true;
  __pulseLogMemory.add(signature);
  if (__pulseLogMemory.size > __pulseLogMemoryLimit) {
    __pulseLogMemory.delete(__pulseLogMemory.values().next().value);
  }
  return false;
}
// ============================================================
//  DIMENSIONAL FATE ROUTER (REPLACES mark404)
// ============================================================
function markFate(message, context = {}) {
  if (!message) return { fate: "404", raw: message };

  const {
    severity = 0,
    degraded = false,
    tier = "",
    driftSignature = ""
  } = context;

  // NEBULA — recursion must stop, severe drift or collapse
  if (severity >= 3) {
    return { fate: "nebula", raw: message };
  }

  // SENDOFF — repeated misguidances, external resource failures
  if (tier === "externalResource") {
    return { fate: "sendoff", raw: message };
  }

  // CHALLENGE — questionable motives, degraded state, incomplete transitions
  if (degraded) {
    return { fate: "challenge", raw: message };
  }

  // 404 — recursive chamber, retry allowed
  if (
    message === 404 ||
    message?.status === 404 ||
    (typeof message === "string" && message.trim() === "404")
  ) {
    return { fate: "404", raw: message };
  }

  // OK — no fallback needed
  return { fate: "ok", raw: message };
}

// ============================================================
//  NORMAL LOG
// ============================================================
export function log(...args) {
  // ⭐ Pull the full identity snapshot
  const identity = resolveMetaTouchFirst();

  // ⭐ Merge identity into the normalized args
  const { subsystem, message, rest, raw, context } = normalizeArgs(args);

  // ⭐ If identity has a subsystem, override the inferred one
  const activeSubsystem = identity?.subsystem || subsystem || "touch";

  // ⭐ Use identity color/icon if available
  const color = PulseColors[activeSubsystem] || identity?.color || "#fff";

  // ⭐ Prefix now includes identity version + coord
  const prefix = formatPrefix(
    activeSubsystem,
    `${message} [${identity?.version || "v?"} @ ${identity?.coord || "W0"}]`
  );

  // ⭐ Fate packet stays the same
  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  // ⭐ Dedupe signature now includes identity
  const signature = `log::${activeSubsystem}::${identity?.version || "v?"}::${safeMessage}`;
  if (dedupe(signature, rest)) return;

  // ⭐ Actual console output
  if (raw) {
    PulseConsole.log(safeMessage, ...rest);
  } else {
    PulseConsole.log(
      `%c${prefix} — ${safeMessage}`,
      `color:${color}; font-weight:bold;`,
      ...rest
    );
  }

  // ⭐ Send full identity into pulseLog
  pulseLog({
    level: "log",
    subsystem: activeSubsystem,
    version: identity?.version || null,
    coord: identity?.coord || null,
    trust: identity?.trust || null,
    continuity: identity?.continuity || null,
    message: safeMessage,
    rest
  });
}


// ============================================================
//  WARN
// ============================================================
export function warn(...args) {
  // ⭐ Pull full identity snapshot
  const identity = resolveMetaTouchFirst();

  const { subsystem, message, rest, context } = normalizeArgs(args);

  // ⭐ Merge identity subsystem
  const activeSubsystem = identity?.subsystem || subsystem || "touch";

  // ⭐ Use identity color if available
  const color = PulseColors[activeSubsystem] || identity?.color || "#FFEE58";

  // ⭐ Prefix now includes version + coord
  const prefix = formatPrefix(
    activeSubsystem,
    `[${identity?.version || "v?"} @ ${identity?.coord || "W0"}]`
  );

  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  const signature = `warn::${activeSubsystem}::${identity?.version || "v?"}::${safeMessage}`;
  if (dedupe(signature, rest)) return;

  PulseConsole.warn(
    `%c${prefix} ⚠️ [WARN] — ${safeMessage}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );

  pulseLog({
    level: "warn",
    subsystem: activeSubsystem,
    version: identity?.version || null,
    coord: identity?.coord || null,
    trust: identity?.trust || null,
    continuity: identity?.continuity || null,
    message: safeMessage,
    rest
  });
}


// ============================================================
//  ERROR
// ============================================================
export function error(...args) {
  // ⭐ Pull full identity snapshot
  const identity = resolveMetaTouchFirst();

  const { subsystem, message, rest, context } = normalizeArgs(args);

  // ⭐ Merge identity subsystem
  const activeSubsystem = identity?.subsystem || subsystem || "touch";

  // ⭐ Use identity color if available
  const color = PulseColors[activeSubsystem] || identity?.color || "#EF5350";

  // ⭐ Prefix now includes version + coord
  const prefix = formatPrefix(
    activeSubsystem,
    `[${identity?.version || "v?"} @ ${identity?.coord || "W0"}]`
  );

  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  const signature = `error::${activeSubsystem}::${identity?.version || "v?"}::${safeMessage}`;
  if (dedupe(signature, rest)) return;

  PulseConsole.error(
    `%c${prefix} 🟥 [ERROR] — ${safeMessage}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );

  pulseLog({
    level: "error",
    subsystem: activeSubsystem,
    version: identity?.version || null,
    coord: identity?.coord || null,
    trust: identity?.trust || null,
    continuity: identity?.continuity || null,
    message: safeMessage,
    rest
  });
}


// ============================================================
//  CRITICAL (RED GROUP WITH BODY)
// ============================================================
export function critical(...args) {
  const { subsystem, message, rest, context } = normalizeArgs(args);
  const prefix = formatPrefix(subsystem);

  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  const signature = `critical::${subsystem}::${safeMessage}`;
  if (dedupe(signature, rest)) return;

  PulseConsole.groupCollapsed(
    `%c${prefix} 💀 [CRITICAL] — ${safeMessage}`,
    "color:#D32F2F; font-weight:bold; font-size:14px;"
  );

  PulseConsole.error(
    `%c${safeMessage}`,
    "color:#D32F2F; font-weight:bold;",
    ...rest
  );

  PulseConsole.groupEnd();

  pulseLog({ level: "critical", subsystem, message: safeMessage, rest });
}

// ============================================================
//  GROUP START (COLLAPSED)
// ============================================================
export function groupStart(...args) {
  const { subsystem, message, rest, context } = normalizeArgs(args);
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);

  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  // ⚡ FIX: groups must NEVER be deduped — every open must pair with a close.
  // Deduping groupStart causes orphan groupEnd calls that break the console
  // group stack depth, especially in the compiled bundle.

  // SAFETY: ensure PulseConsole.groupCollapsed exists
  const groupFn = PulseConsole.groupCollapsed || _native.groupCollapsed;

  groupFn(
    `%c${prefix} — ${safeMessage}`,
    `color:${color}; font-weight:bold; font-size:13px;`,
    ...rest
  );

  pulseLog({ level: "groupStart", subsystem, message: safeMessage, rest });
}

// groupCollapsed — collapsed variant (delegates to groupStart above)
export const groupCollapsed = groupStart;

// ⚡ FIX: group (expanded) is now distinct from groupCollapsed.
// Previously both aliased to groupStart which always called groupCollapsed,
// making console.group and console.groupCollapsed visually identical and
// causing depth-parity mismatches when the GPU file mixed both calls.
export function group(...args) {
  const { subsystem, message, rest, context } = normalizeArgs(args);
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);

  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  // Groups must NEVER be deduped — always open to keep group stack balanced
  const groupFn = PulseConsole.group || _native.group;

  groupFn(
    `%c${prefix} — ${safeMessage}`,
    `color:${color}; font-weight:bold; font-size:13px;`,
    ...rest
  );

  pulseLog({ level: "group", subsystem, message: safeMessage, rest });
}


// ============================================================
//  GROUP LOG (INSIDE GROUP)
// ============================================================
export function groupLog(...args) {
  const { subsystem, message, rest, context } = normalizeArgs(args);
  const color = PulseColors[subsystem] || "#fff";
  const prefix = formatPrefix(subsystem);

  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  const logFn = PulseConsole.log || console.log;

  logFn(
    `%c${prefix} — ${safeMessage}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );

  pulseLog({ level: "groupLog", subsystem, message: safeMessage, rest });
}


// ============================================================
//  GROUP END
// ============================================================
export function groupEnd() {
  const endFn = PulseConsole.groupEnd || console.groupEnd;

  try {
    endFn();
  } catch (e) {
    // SAFETY: compiled mode sometimes misaligns group stacks
    console.warn("PulseConsole.groupEnd failed:", e);
  }
}


// ============================================================================
// PulseLoggerStore — HEARTBEAT / WORKER INTERFACE — v31 IMMORTAL HYBRID
// ============================================================================
export const PulseLoggerStore = {
  getAll() {
    return getLocalLogs();
  },

  clear() {
    localLogBuffer = [];
    persistLocalLogs(localLogBuffer);
  },

  tail(n = 200) {
    const buf = getLocalLogs();
    if (n <= 0) return [];
    return buf.slice(Math.max(0, buf.length - n));
  },

  drainForHeartbeat() {
    const drained = drainLocalLogsForHeartbeat();
    return drained;
  }
};

// ============================================================================
// EXPORT IMMORTAL v31 LOGGER
// ============================================================================
export const VitalsLogger = {
  pulseLog,
  log,
  warn,
  error,
  critical,
  group,
  groupStart,
  groupCollapsed,
  groupEnd,
  makeTelemetryPacket,
  PulseLoggerStore,
  meta: {
    layer: "PulseProofLogger",
    version: "31.0-IMMORTAL-HYBRID",
    mode: "touch-first",
    fallback: "organism-map"
  }
};

export default VitalsLogger;
export const PulseProofLogger = VitalsLogger;
export const PulseLogger = VitalsLogger;

PulseRealm.PulseProofLogger = VitalsLogger;
PulseRealm.VitalsLogger = VitalsLogger;
PulseRealm.PulseLogger = VitalsLogger;

PulseRealm.PulseTelemetry = makeTelemetryPacket;
PulseRealm.pulseLog = pulseLog;
PulseRealm.PulseWarn = warn;
PulseRealm.PulseError = error;
PulseRealm.PulseLog = log;
PulseRealm.PulseLogError = logError;
PulseRealm.GroupCollapsed = groupCollapsed;
PulseRealm.PulseGroup = group;
PulseRealm.PulseGroupEnd = groupEnd;