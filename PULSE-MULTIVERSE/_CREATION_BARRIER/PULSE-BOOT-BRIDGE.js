// ============================================================================
//  PulseBridge-v31-IMMORTAL-FINALITY++
//  ROLE: Portal Trust Bridge + Local Buffer + Finality / Approval Layer
//        + CNS / Binary / DualBand / Remote Endpoint (v31, PulseBand-aware)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { pulseband as PulseBand } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-BAND/PULSE-BAND.js";
import { initCheckBand } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-BAND/PULSE-BAND-CHECK.js";
import { initBinaryWave } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";
import { createDualBandOrganismV30, PulseNetSurface } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-AI/PULSE-AI-DUALBAND-PAST.js";

function log (msg) {PulseRealm.PulseLog("bridge",msg)}
function error (msg) {PulseRealm.PulseLog("bridge",msg)}
function warn (msg) {PulseRealm.PulseLog("bridge",msg)}

log(
  "[PulseBootBridge v33] — Expression/System Membrane Loaded & Online! Barrier and I are Pals, Don't Worry about Him, He only Uses 1/2 Of His Brain lol!",
  "color:#29B6F6; font-weight:bold; font-family:monospace;"
);

const C_ID   = "color:#A0FA9A; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

let BridgeExport = null;
let triedImport = false;
let logIdCounter = PulseRealm.PulseNOW;
let idbAvailable = false;
let idbDb = null;

// ------------------------------------------------------------
// 1. Startup: load logs into a REAL array
// ------------------------------------------------------------
let localLogBuffer = [];
let pendingFlush = false;
let flushQueue = [];
const LS_KEY_LOGS = "PulseBootBridge.v30.logs";
const LS_MAX_ENTRIES = 32000; // doubled from v24

const IDB_DB_NAME = "PulseBootBridge_v31";
const IDB_STORE_NAME = "logs";
const IDB_MAX_ENTRIES = 100000;

// Optional: let Bridge explicitly register itself
export function attachBridgeInstance(instance) {
  BridgeExport = instance || null;
}

export function getCore() {
  return PulseRealm.PulseCoreMemory;
}

export function getEvidenceBus() {
  return PulseRealm.PulseProofBridge.evidenceBus || null;
}

export function getDiagnosticsBus() {
  return PulseRealm.PulseProofBridge.diagnosticsBus || null;
}

export function getErrorBeacon() {
  return PulseRealm.PulseProofBridge.errorBeacon || null;
}
// ============================================================================
// PulseBridge CORE SURFACE
// ============================================================================

const PulseProofBridge = {
  // ============================================================
  // ⭐ SELF-CONTAINED ROUTE FUNCTION (NO EXTERNAL REFERENCES)
  // ============================================================
  async route(action, payload = {}) {
    try {
      // INTERNAL ROUTE TABLE — NO OUTSIDE DEPENDENCIES
      const table = {
        // --------------------------------------------------------
        // Basic ping
        // --------------------------------------------------------
        "ping": async () => ({
          ok: true,
          data: "pong",
          envelope: { source: "PulseProofBridge.route" }
        }),

        // --------------------------------------------------------
        // Bridge health
        // --------------------------------------------------------
        "getHealth": async () => ({
          ok: true,
          data: this.getHealth(),
          envelope: { source: "PulseProofBridge.route" }
        }),

        // --------------------------------------------------------
        // Diagnostics bus dump
        // --------------------------------------------------------
        "getDiagnostics": async () => ({
          ok: true,
          data: this.diagnosticsBus.getAll(),
          envelope: { source: "PulseProofBridge.route" }
        }),

        // --------------------------------------------------------
        // Evidence bus dump
        // --------------------------------------------------------
        "getEvidence": async () => ({
          ok: true,
          data: this.evidenceBus.getAll(),
          envelope: { source: "PulseProofBridge.route" }
        }),

        // --------------------------------------------------------
        // Trust events dump
        // --------------------------------------------------------
        "getTrustEvents": async () => ({
          ok: true,
          data: this.trust.getAll(),
          envelope: { source: "PulseProofBridge.route" }
        }),

        // --------------------------------------------------------
        // ⭐ SELF-CONTAINED IMAGE/BINARY FALLBACK
        // No fetchChunk, no CNS, no external systems.
        // --------------------------------------------------------
        "getImages": async () => {
          const url = payload.url;
          if (!url) {
            return {
              ok: false,
              data: null,
              envelope: { source: "PulseProofBridge.route", error: "NO_URL" }
            };
          }

          // 1) EvidenceBus binary packets
          const evidence = this.evidenceBus.getAll();
          const evMatch = evidence.find(p => p.payload.url === url);
          if (evMatch.payload.binary) {
            return {
              ok: true,
              data: evMatch.payload.binary,
              envelope: { source: "PulseProofBridge.evidenceBus" }
            };
          }

          // 2) Trust events binary packets
          const trust = this.trust.getAll();
          const trustMatch = trust.find(e => e.payload.url === url);
          if (trustMatch.payload.binary) {
            return {
              ok: true,
              data: trustMatch.payload.binary,
              envelope: { source: "PulseProofBridge.trust" }
            };
          }

          // 3) Nothing found
          return {
            ok: false,
            data: null,
            envelope: { source: "PulseProofBridge.route", error: "NOT_FOUND" }
          };
        }
      };

      // EXECUTE ROUTE
      if (table[action]) {
        return await table[action]();
      }

      // ⭐ UNIVERSAL FALLBACK HANDLER
      return {
        ok: true,
        data: {
          action,
          payload,
          note: "ROUTE_FALLBACK",
          time: performance.now()
        },
        envelope: {
          source: "PulseProofBridge.route",
          fallback: true
        }
      };


    } catch (err) {
      // FATAL ERROR
      return {
        ok: false,
        data: null,
        envelope: {
          source: "PulseProofBridge.route",
          error: String(err)
        }
      };
    }
  },

  // ============================================================
  // ORIGINAL FIELDS (UNCHANGED)
  // ============================================================
  signal: signal,
  prewarmBridge: prewarmBridge,

  coreMemory: PulseRealm.PulseCoreMemory,
  coreSpeech: PulseRealm.PulseCoreSpeech,

  PulseNetBoot: startPulseNet,
  pulseNetFastLane: pulseNetFastLane,
  pulseNetIngress: pulseNetIngress,

  PulseBinaryOrganismBoot: startDualBandAI,
  PulseUnderstandingBoot: startUnderstanding,

  PulseBridgeStore: null,

  onDualBandBoot: onDualBandBoot,
  onAIEvent: onAIEvent,
  onPortalEvent: onPortalEvent,

  setBridgeIdentitySnapshot: setBridgeIdentitySnapshot,
  getBridgeIdentitySnapshot: getBridgeIdentitySnapshot,

  // ============================================================
  // Diagnostics Bus
  // ============================================================
  diagnosticsBus: {
    logs: [],
    push(entry) {
      this.logs.push({ entry, time: performance.now() });
    },
    emit(type, payload = {}) {
      const event = { type, payload, time: performance.now() };
      this.logs.push(event);
      return event;
    },
    getAll() { return [...this.logs]; },
    clear() { this.logs.length = 0; }
  },

  // ============================================================
  // Trust Bus
  // ============================================================
  trust: {
    events: [],
    recordEvent(type, payload = {}) {
      const event = { type, payload, time: performance.now() };
      this.events.push(event);
      return event;
    },
    getAll() { return [...this.events]; },
    clear() { this.events.length = 0; }
  },

  // ============================================================
  // Evidence Bus
  // ============================================================
  evidenceBus: {
    packets: [],
    record(type, payload) {
      const packet = { type, payload, time: performance.now() };
      this.packets.push(packet);
      try { PulseProofBridge.diagnosticsBus.emit("evidence-event", packet); } catch {}
      return packet;
    },
    recordErrorEvidence(envelope) {
      const packet = {
        type: "ui-error",
        envelope,
        severity: envelope.severity || "unknown",
        tags: envelope.tags || [],
        correlationId: envelope.correlationId || null,
        route: envelope.packet.route || null,
        surface: envelope.packet.surface || null,
        time: performance.now()
      };
      this.packets.push(packet);
      try {
        PulseRealm.PulseSDN.emitImpulse("ui.error.evidence", {
          modeKind: "dual",
          executionContext: {
            sceneType: "error",
            workloadClass: "ui-error-evidence",
            dispatchSignature: "PulseProofBridge.v30",
            shapeSignature: "evidence-spine",
            extensionId: "PulseProofBridge"
          },
          packet
        });
      } catch {}
      try { getCore().setRouteSnapshot("bridge_last_error_evidence", packet); } catch {}
      return packet;
    },
    getAll() { return [...this.packets]; },
    clear() { this.packets.length = 0; }
  },

  getHealth() {
    return { ...BRIDGE_HEALTH };
  },

  ready: false,
  queue: [],
  whenReady(fn) {
    if (this.ready) fn(this);
    else this.queue.push(fn);
  },

  // ============================================================
  // Mesh Router
  // ============================================================
  meshRouter: {
    routes: new Map(),
    register(type, handler) {
      if (!this.routes.has(type)) this.routes.set(type, []);
      this.routes.get(type).push(handler);
    },
    emit(type, payload = {}) {
      const event = { type, payload, time: performance.now() };
      try { PulseProofBridge.diagnosticsBus.emit("mesh-event", event); } catch {}
      const handlers = this.routes.get(type);
      if (handlers) {
        for (const fn of handlers) {
          try { fn(event); } catch (err) { error("[meshRouter handler error]", err); }
        }
      }
      return event;
    },
    clear() { this.routes.clear(); }
  },

    // ============================================================
  // ⭐ UNIVERSAL ERROR BEACON (NATIVE TO PULSEPROOFBRIDGE)
  // ============================================================
  errorBeacon(type, detail = {}) {
    const time = performance.now();

    // Unified envelope
    const envelope = {
      type,
      time,
      severity: detail.severity || "error",
      message: detail.message || null,
      tags: detail.tags || [],
      route: detail.route || null,
      surface: detail.surface || null,
      correlationId: detail.correlationId || null,
      payload: detail.payload || {}
    };

    // ------------------------------------------------------------
    // Diagnostics Bus
    // ------------------------------------------------------------
    try {
      this.diagnosticsBus.emit("error-beacon", envelope);
    } catch (err) {
      error("[PulseProofBridge.errorBeacon diagnostics failure]", err);
    }

    // ------------------------------------------------------------
    // Evidence Bus
    // ------------------------------------------------------------
    try {
      this.evidenceBus.record("error-beacon", envelope);
    } catch (err) {
      error("[PulseProofBridge.errorBeacon evidence failure]", err);
    }

    // ------------------------------------------------------------
    // Trust Bus
    // ------------------------------------------------------------
    try {
      this.trust.recordEvent("error-beacon", envelope);
    } catch (err) {
      error("[PulseProofBridge.errorBeacon trust failure]", err);
    }

    // ------------------------------------------------------------
    // Return unified envelope
    // ------------------------------------------------------------
    return {
      ok: false,
      envelope,
      data: null
    };
  },

};

// ============================================================================
// ⭐ PULSE BRIDGE ROUTE — UNIVERSAL FALLBACK BRIDGE
// Works in browser, offline mode, hybrid mode, and CNS fallback mode.
// ============================================================================


PulseRealm.PulseBridgeRoute =
  PulseRealm.PulseBridgeRoute ||
  async function PulseBridgeRoute(action, payload = {}) {
    try {
      // ------------------------------------------------------------
      // 0) Native bridge passthrough
      // ------------------------------------------------------------
      if (PulseRealm.__PULSE_NATIVE_BRIDGE__ &&
          typeof PulseRealm.__PULSE_NATIVE_BRIDGE__.route === "function") {
        try {
          const out = await PulseRealm.__PULSE_NATIVE_BRIDGE__.route(action, payload);
          if (out) return out;
        } catch (err) {
          warn("[PulseBridgeRoute] Native bridge failed →", err);
        }
      }

      // ------------------------------------------------------------
      // 1) ACTION: getImages
      // ------------------------------------------------------------
      if (action === "getImages") {
        
        const url = payload.url;
        if (!url) {
          return { ok: false, data: null, error: "NO_URL" };
        }

        // 1A — PulseChunks cache
        try {
          const cached = PulseRealm.PulseChunks.cache[url];
          if (cached) {
            return {
              ok: true,
              data: cached,
              envelope: { source: "PulseChunks.cache" }
            };
          }
        } catch {}

        // 1B — Virtual FS
        try {
          if (PulseRealm.PulseRuntime.virtualFiles[url]) {
            return {
              ok: true,
              data: PulseRealm.PulseRuntime.virtualFiles[url],
              envelope: { source: "virtualFS" }
            };
          }
        } catch {}

        // 1C — merged fetch() fallback (size + bytes in one request)
        try {
          const res = await fetch(url);

          if (res.ok) {
            // Extract size from headers (same as HEAD)
            const sizeHeader = res.headers.get("content-length");
            const size = sizeHeader ? parseInt(sizeHeader, 10) : null;

            // Extract bytes
            const blob = await res.blob();
            const arrayBuffer = await blob.arrayBuffer();

            return {
              ok: true,
              data: arrayBuffer,
              envelope: {
                source: "fetch",
                size
              }
            };
          }
        } catch {}


        // 1D — Total failure
        return {
          ok: false,
          data: null,
          envelope: { source: "none" }
        };
      }

      // ------------------------------------------------------------
      // ⭐ 2) UNIVERSAL FALLBACK HANDLER (NO ERRORS)
      // ------------------------------------------------------------
      return {
        ok: true,
        data: {
          action,
          payload,
          note: "ROUTE_FALLBACK",
          time: performance.now()
        },
        envelope: {
          source: "PulseBridgeRoute",
          fallback: true
        }
      };

    } catch (err) {
      error("[PulseBridgeRoute] FATAL ERROR →", err);
      return {
        ok: false,
        data: null,
        error: String(err),
        envelope: { source: "fatal" }
      };
    }
  };

export function attachRealBridge(real) {
  for (const key of Object.keys(PulseProofBridge)) {
    if (key in real) {
      PulseProofBridge[key] = real[key];
    }
  }

  PulseProofBridge.ready = true;

  for (const fn of PulseProofBridge.queue) {
    try {
      fn(PulseProofBridge);
    } catch {}
  }
  PulseProofBridge.queue = [];
}

// ============================================================================
// ENVIRONMENT SNAPSHOT — IMMORTAL, PORTAL-AWARE, ADV++
// ============================================================================

function safeGet(fn, fallback = null) {
  try {
    const v = fn();
    return v === undefined ? fallback : v;
  } catch {
    return fallback;
  }
}

const ua =
  (typeof self !== "undefined" && PulseRealm.PulseSurface?.environment) ||
  (typeof navigator !== "undefined" && navigator.userAgent) ||
  (typeof self !== "undefined" && PulseRealm.navigator?.userAgent) ||
  "unknown-environment";


function buildBridgeEnvironment() {
  // ============================================================
  // 1. NON‑BROWSER ENVIRONMENT (Node, SSR, Workers)
  // ============================================================
  if (typeof window === "undefined") {
    return {
      runtime: "node-like",
      userAgent: null,
      online: null,
      origin: null,
      page: null,
      screen: null,
      locale: null,
      timezone: null,
      inputMode: null,
      platform: null,
      vendor: null,
      hardwareConcurrency: null,
      deviceMemory: null,
      colorDepth: null,
      touchSupport: false,
      pointerSupport: false,
      cookieEnabled: null,
      referrer: null,
      viewportWidth: null,
      viewportHeight: null
    };
  }

  // ============================================================
  // 2. BASE REFERENCES (NO OPTIONAL CHAINING)
  // ============================================================
  const nav =
  (typeof navigator !== "undefined" ? navigator : {}) ||
  (typeof window !== "undefined" ? window.navigator : {}) ||
  {};

const scr =
  (typeof screen !== "undefined" ? screen : {}) ||
  (typeof window !== "undefined" ? window.screen : {}) ||
  {};

const loc =
  (typeof location !== "undefined" ? location : {}) ||
  (typeof window !== "undefined" ? window.location : {}) ||
  {};


  // ============================================================
  // 3. SURFACE ENVIRONMENT (IF EXISTS)
  // ============================================================
  
  // ============================================================
  // 4. USER AGENT
  // ============================================================
  const ua =
    PulseRealm.PulseSurface.environment ||
    nav.userAgent;

  // ============================================================
  // 5. SCREEN INFO
  // ============================================================
  const screenInfo = {
    width: typeof scr.width === "number" ? scr.width : null,
    height: typeof scr.height === "number" ? scr.height : null,
    pixelRatio:
      typeof window.devicePixelRatio === "number"
        ? window.devicePixelRatio
        : null
  };

  // ============================================================
  // 6. LOCALE
  // ============================================================
  const locale =
    nav.language ||
    PulseRealm.PulseSurface.environment?.locale;

  // ============================================================
  // 7. TIMEZONE
  // ============================================================
  let timezone = PulseRealm.PulseSurface.environment?.timezone || null;
  if (!timezone) {
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch {
      timezone = null;
    }
  }

  // ============================================================
  // 8. INPUT MODE (touch vs pointer)
  // ============================================================
  const inputMode =
    ("ontouchstart" in window ? "touch" : "pointer") ||
    PulseRealm.PulseSurface.environment?.inputMode;

  // ============================================================
  // 9. ADDITIONAL ENVIRONMENT DETAILS
  // ============================================================
  const platform = nav.platform || null;
  const vendor = nav.vendor || null;

  const hardwareConcurrency =
    typeof nav.hardwareConcurrency === "number"
      ? nav.hardwareConcurrency
      : null;

  const deviceMemory =
    typeof nav.deviceMemory === "number"
      ? nav.deviceMemory
      : null;

  const colorDepth =
    typeof scr.colorDepth === "number"
      ? scr.colorDepth
      : null;

  const touchSupport =
    typeof nav.maxTouchPoints === "number"
      ? nav.maxTouchPoints > 0
      : false;

  const pointerSupport =
    typeof window.PointerEvent !== "undefined";

  const cookieEnabled =
    typeof nav.cookieEnabled === "boolean"
      ? nav.cookieEnabled
      : null;

  const referrer =
    typeof document !== "undefined" &&
    typeof document.referrer === "string"
      ? document.referrer
      : null;

  const viewportWidth =
    typeof window.innerWidth === "number"
      ? window.innerWidth
      : null;

  const viewportHeight =
    typeof window.innerHeight === "number"
      ? window.innerHeight
      : null;

  // ============================================================
  // 10. ONLINE STATUS
  // ============================================================
  const online =
    typeof PulseRealm.PulseSurface.environment?.online === "boolean"
      ? PulseRealm.PulseSurface.environment?.online
      : (typeof nav.onLine === "boolean" ? nav.onLine : null);

  // ============================================================
  // 11. ORIGIN + PAGE
  // ============================================================
  const origin =
    PulseRealm.PulseSurface.environment?.origin ||
    (loc.origin || null);

  const page =
    loc.pathname || null;

  // ============================================================
  // 12. RETURN FULL ENVIRONMENT SNAPSHOT
  // ============================================================
  return {
    runtime: PulseRealm.PulseSurface?.environment?.runtime || "browser",
    userAgent: ua,
    online,
    origin,
    page,
    screen: screenInfo,
    locale,
    timezone,
    inputMode,
    platform,
    vendor,
    hardwareConcurrency,
    deviceMemory,
    colorDepth,
    touchSupport,
    pointerSupport,
    cookieEnabled,
    referrer,
    viewportWidth,
    viewportHeight
  };
}


const BRIDGE_ENV = buildBridgeEnvironment();

// ============================================================================
// IDENTITY SNAPSHOT — IMMORTAL
// ============================================================================

let CURRENT_IDENTITY_SNAPSHOT = null;

export function setBridgeIdentitySnapshot(identitySnapshot) {
  if (!identitySnapshot || typeof identitySnapshot !== "object") {
    CURRENT_IDENTITY_SNAPSHOT = null;
    return;
  }

  CURRENT_IDENTITY_SNAPSHOT = {
    uid: identitySnapshot.uid || null,
    identityVersion: identitySnapshot.identityVersion || null,
    presenceBand: identitySnapshot.presence.band || "unknown",
    presenceLevel: identitySnapshot.presence.presenceLevel || "Unknown",
    advantageBand: identitySnapshot.advantage.advantageBand || "neutral",
    advantageScore: identitySnapshot.advantage.advantageScore ?? null,
    earnBand: identitySnapshot.earn.earnBand || "unknown",
    deviceTrusted: !!identitySnapshot.trustedDevice,
    sessionAge: identitySnapshot.sessionAge || 0,
    binarySignature: identitySnapshot.binarySignature || null,
    presenceSignature: identitySnapshot.presenceSignature || null,
    advantageSignature: identitySnapshot.advantageSignature || null,
    topologySignature: identitySnapshot.topologySignature || null,
    earnSignature: identitySnapshot.earnSignature || null
  };
}

function getBridgeIdentitySnapshot() {
  return CURRENT_IDENTITY_SNAPSHOT;
}

// ============================================================================
// ONLINE FLAG
// ============================================================================

function isOnline() {
  if (typeof PulseRealm.PULSE_ONLINE === "boolean")
    return PulseRealm.PULSE_ONLINE;
  if (typeof globalThis !== "undefined" && typeof PulseRealm.PULSE_ONLINE === "boolean")
    return PulseRealm.PULSE_ONLINE;
  if (typeof global !== "undefined" && typeof PulseRealm.PULSE_ONLINE === "boolean")
    return PulseRealm.PULSE_ONLINE;
  if (typeof PulseRealm.PULSE_ONLINE === "boolean") return PulseRealm.PULSE_ONLINE;
  return BRIDGE_ENV.online === true;
}


const BRIDGE_DB_NAME = "PulseBootBridgeDB";
const BRIDGE_LS_MAX = 6000;
const BRIDGE_STORE = "buffer";

function openBridgeDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open(BRIDGE_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(BRIDGE_STORE)) {
        db.createObjectStore(BRIDGE_STORE, { keyPath: "id", autoIncrement: true });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}
async function loadBridgeBuffer() {
  const db = await openBridgeDB();
  if (!db) return [];

  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(BRIDGE_STORE, "readonly");
      const store = tx.objectStore(BRIDGE_STORE);
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
async function saveBridgeBuffer(buf) {
  const db = await openBridgeDB();
  if (!db) return;

  const trimmed =
    buf.length > BRIDGE_LS_MAX
      ? buf.slice(buf.length - BRIDGE_LS_MAX)
      : buf;

  try {
    // wipe old buffer
    const txClear = db.transaction(BRIDGE_STORE, "readwrite");
    txClear.objectStore(BRIDGE_STORE).clear();

    // write new buffer
    const tx = db.transaction(BRIDGE_STORE, "readwrite");
    const store = tx.objectStore(BRIDGE_STORE);

    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch {}
}


// ============================================================================
// ARTERY-LIKE METRICS
// ============================================================================

let arteryWindowStart = PulseRealm.PulseNOW;
let arteryEventCount = 0;

function rollArteryWindow(now) {
  if (now - arteryWindowStart >= 60000) {
    arteryWindowStart = now;
    arteryEventCount = 0;
  }
}

function buildArterySnapshot(kind) {
  const now = PulseRealm.PulseNOW;
  rollArteryWindow(now);

  const density = Math.min(1, arteryEventCount / 1024);

  return {
    windowStart: arteryWindowStart,
    now,
    windowMs: now - arteryWindowStart,
    eventCount: arteryEventCount,
    density,
    kind
  };
}

// ============================================================================
// FINALITY / APPROVAL LAYER — v31 IMMORTAL
// ============================================================================

const FINALITY_CHANNEL_ID = "portal.trust.bridge";
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



export function pulseLog({
  layer = "Window",
  system = "Portal",
  subsystem = "Boot",
  organ = "Bridge",
  page = "PULSE-BOOT-BRIDGE",
  func = "Routing and Bridging",
  message = "Curiousity didn't really kill the Cat!",
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
  organismVersion = "v31",
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

function persistLocalLogs(entries) {
    if (entries.length > LS_MAX_ENTRIES) {
      localLogBuffer = entries.slice(entries.length - LS_MAX_ENTRIES);
    } else {
      localLogBuffer = entries;
    }
    return;
  saveLogsToIndexedDB(entries);
}

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
// APPEND BRIDGE RECORD — IMMORTAL + IDENTITY + ENV + FINALITY TAP
// ============================================================================

async function appendBridgeRecord(kind, payload) {
  const now = PulseRealm.PulseNOW;
  arteryEventCount += 1;

  const entry = {
    ts: now,
    kind,
    payload,
    env: BRIDGE_ENV,
    identity: getBridgeIdentitySnapshot(),
    artery: buildArterySnapshot(kind),
    synced: false
  };

  const buf = await loadBridgeBuffer();
  buf.push(entry);
  saveBridgeBuffer(buf);

  try {
    pulseLog({
      subsystem: "bridge",
      system: "PortalTrustLayer",
      organ: "PulseProofBridge",
      layer: "PulseProofBridge-v31-FINALITY",
      message: `[Bridge] ${kind}`,
      extra: entry,
      level: "log",
      band: payload.band || entry.identity.presenceBand || "dual",
      presenceField: payload.presenceField || entry.identity.presenceBand || null,
      advantageField: payload.advantageField || "bridge-advantage",
      speedField: payload.speedField || "fast-path",
      experienceField: payload.experienceField || "portal-trust-layer"
    });

    pulseLog("bridge", `[Bridge] ${kind}`, entry);
  } catch {
    pulseLog("[Bridge]", kind, entry);
  }
}

export const PulseBridgeStore = {
  getAll() {
    return loadBridgeBuffer();
  },
  tail(n = 200) {
    const buf = loadBridgeBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    saveBridgeBuffer([]);
  }
};

// ============================================================================
// FIREBASE FLUSH
// ============================================================================

async function flushBridgeToFirebase() {
  const buf = await loadBridgeBuffer();
  if (!buf.length) return;

  const remaining = [];

  for (const entry of buf) {
    if (entry.synced) {
      remaining.push(entry);
      continue;
    }
    try {
      await PulseRealm.PulseFirebaseDB.collection("BRIDGE_LOGS").add(entry);
      entry.synced = true;
      remaining.push(entry);
    } catch {
      remaining.push(entry);
      break;
    }
  }

  saveBridgeBuffer(remaining);
}

  if (isOnline()) flushBridgeToFirebase().catch(() => {});
  if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  window.addEventListener("online", () => {
    try {
      const p = flushBridgeToFirebase();
      if (p && typeof p.then === "function") {
        p.catch(() => {});
      }
    } catch {}
  });
}



// ============================================================================
// DEV TRACING
// ============================================================================

const DEV = true;

const legacyChannel = "PulseTouch.v33.channel";

const FIRE_AND_FORGET_PATHS = new Set([
  "proxy.dnaVisibility",
  "telemetry.signal",
  "portal.prewarmHint",
  "monitor.bridgeFailure",
  "monitor.bridgeFailureEmail"
]);

function trace(label, data) {
  if (!DEV) return;
  log(`%c[PORTAL TRUST BRIDGE v31] → ${label}`,
    "color:#7FDBFF; font-weight:bold;",
    data
  );
}

function traceInbound(label, data) {
  if (!DEV) return;
  log(`%c[PORTAL TRUST BRIDGE v31] ← ${label}`,
    "color:#39CCCC; font-weight:bold;",
    data
  );
}

// ============================================================================
// CALLBACK REGISTRIES
// ============================================================================

let dualBandBootHandler = null;
let aiEventHandler = null;
let portalEventHandler = null;

export function onDualBandBoot(fn) {
  dualBandBootHandler = fn;
}

export function onAIEvent(fn) {
  aiEventHandler = fn;
}

export function onPortalEvent(fn) {
  portalEventHandler = fn;
}

// ============================================================================
// ENVELOPE + SEND (SignalPort primary, CNS fallback) + FINALITY APPROVAL
// ============================================================================

function envelope(type, extra = {}) {
  return {
    type,
    ts: PulseRealm.PulseNOW,
    env: BRIDGE_ENV,
    identity: getBridgeIdentitySnapshot(),
    ...extra
  };
}

function send(msg) {
  const port = PulseRealm.PulseSignalPort;

  if (port && typeof port.emit === "function") {
    try {
      port.emit("bridge.message", msg);
      appendBridgeRecord("bridge_outbound", { via: "signalPort", msg });
      return;
    } catch (err) {
      appendBridgeRecord("bridge_outbound_signal_error", { msg, err: String(err) });
    }
  }
  appendBridgeRecord("bridge_noop", msg);
}

// ============================================================================
// BRIDGE HEALTH
// ============================================================================

const BRIDGE_HEALTH = {
  lastOkTs: PulseRealm.PulseNOW,
  lastFailureTs: null,
  consecutiveFailures: 0,
  lastFailurePath: null
};

const BRIDGE_FAILURE_THRESHOLD = 3;
const BRIDGE_FAILURE_EMAIL_THRESHOLD = 5;

function recordBridgeSuccess(path) {
  BRIDGE_HEALTH.lastOkTs = PulseRealm.PulseNOW;
  BRIDGE_HEALTH.consecutiveFailures = 0;
  BRIDGE_HEALTH.lastFailurePath = null;
  appendBridgeRecord("bridge_success", { path });
}

function recordBridgeFailure(path, reason) {
  const now = PulseRealm.PulseNOW;
  BRIDGE_HEALTH.lastFailureTs = now;
  BRIDGE_HEALTH.consecutiveFailures += 1;
  BRIDGE_HEALTH.lastFailurePath = path;

  const payload = {
    path,
    reason,
    health: { ...BRIDGE_HEALTH },
    band: "dual",
    advantageField: "bridge-failure",
    speedField: "bridge-health",
    experienceField: "portal-trust-layer"
  };

  appendBridgeRecord("bridge_failure", payload);

  try {
    send(
      envelope("CNS_SIGNAL", {
        path: "monitor.bridgeFailure",
        payload
      })
    );
  } catch {}

  if (BRIDGE_HEALTH.consecutiveFailures >= BRIDGE_FAILURE_EMAIL_THRESHOLD) {
    try {
      send(
        envelope("CNS_SIGNAL", {
          path: "monitor.bridgeFailureEmail",
          payload: {
            ...payload,
            severity: "critical",
            channel: "email"
          }
        })
      );
      appendBridgeRecord("bridge_failure_email_requested", payload);
    } catch {}
  }
}

// ============================================================================
// INBOUND HANDLER (SignalPort primary, CNS fallback)
// ============================================================================
const pending = Object.create(null);
const imagePending = Object.create(null);

// NEW DIMENSIONAL FATE ROUTER
function markFate(result, context = {}) {
  if (!result) return { fate: "404", raw: result };

  const {
    severity = 0,
    degraded = false,
    tier = "",
    driftSignature = ""
  } = context;

  // NEBULA — recursion must stop, severe drift or collapse
  if (severity >= 3) {
    return { fate: "nebula", raw: result };
  }

  // SENDOFF — repeated misguidances, external resource failures
  if (tier === "externalResource") {
    return { fate: "sendoff", raw: result };
  }

  // CHALLENGE — questionable motives, degraded state, incomplete transitions
  if (degraded) {
    return { fate: "challenge", raw: result };
  }

  // 404 — recursive chamber, retry allowed
  if (
    result === 404 ||
    result.status === 404 ||
    (typeof result === "string" && result.trim() === "404")
  ) {
    return { fate: "404", raw: result };
  }

  // OK — no fallback needed
  return { fate: "ok", raw: result };
}

function handleInbound(msg) {
  const data = msg.data || msg; // support BroadcastChannel event or raw payload
  if (!data || typeof data !== "object" || !data.type) return;

  const m = data;
  appendBridgeRecord("bridge_inbound", m);

  // CNS RESPONSE UPGRADED TO MARK FATE
  if (m.type === "CNS_RESPONSE" && pending[m.requestId]) {
    const { resolve, timer, path } = pending[m.requestId];
    clearTimeout(timer);
    delete pending[m.requestId];

    // Build context for fate routing (expand later as needed)
    const context = {
      severity: m.severity || 0,
      degraded: m.degraded || false,
      tier: m.tier || "",
      driftSignature: m.driftSignature || ""
    };

    const result = markFate(m.result, context);

    traceInbound("CNS_RESPONSE", { path: m.path || path, result });
    recordBridgeSuccess(m.path || path);
    resolve(result);
    return;
  }

  if (m.type === "IMAGE_RESPONSE" && imagePending[m.requestId]) {
    const { resolve } = imagePending[m.requestId];
    delete imagePending[m.requestId];
    traceInbound("IMAGE_RESPONSE", m.data);
    resolve(m.data || null);
    return;
  }

  const safeCall = (label, fn, payload) => {
    if (typeof fn !== "function") return;
    try {
      fn(payload);
    } catch (err) {
      error(
        "%c[BRIDGE::ERROR] %c%s %c→ %s",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        label,
        "color:#FF3B3B; font-family:monospace;",
        String(err)
      );
      appendBridgeRecord(`${label}_error`, { error: String(err) });
    }
  };

  const logInbound = (type, payload) => {
    PulseRealm.PulseLog(
      "boot",
      "%c[BRIDGE::INBOUND] %c%s %c→",
      "color:#7C4DFF; font-weight:bold; font-family:monospace;",
      "color:#EC407A; font-weight:bold; font-family:monospace;",
      type,
      "color:#E8F8FF; font-family:monospace;"
    );

    if (payload !== undefined) {
      PulseRealm.PulseLog(
        "boot",
        "%c↳ payload:",
        "color:#EC407A; font-family:monospace; font-weight:bold;"
      );
      PulseRealm.PulseLog(
        "boot",
        "%c" + JSON.stringify(payload, null, 2),
        "color:#E8F8FF; font-family:monospace;"
      );
    }
  };

  switch (m.type) {
    case "DUALBAND_AI_EVENT": {
      logInbound("DUALBAND_AI_EVENT", m.data);
      appendBridgeRecord("dualband_ai_event", m.data);
      safeCall("aiEventHandler", aiEventHandler, m.data);
      break;
    }

    case "AI_EVENT": {
      logInbound("AI_EVENT", m);
      appendBridgeRecord("ai_event", m);
      safeCall("aiEventHandler", aiEventHandler, m);
      break;
    }

    case "PORTAL_EVENT": {
      logInbound("PORTAL_EVENT", m);
      appendBridgeRecord("portal_event", m);
      safeCall("portalEventHandler", portalEventHandler, m);
      break;
    }

    case "DUALBAND_BOOT": {
      logInbound("DUALBAND_BOOT", m.bootOptions);
      appendBridgeRecord("dualband_boot", m.bootOptions);
      safeCall("dualBandBootHandler", dualBandBootHandler, m.bootOptions);
      break;
    }

    case "CNS_BOOT": {
      logInbound("CNS_BOOT", m);
      appendBridgeRecord("cns_boot", m);
      safeCall("dualBandBootHandler", dualBandBootHandler, m);
      break;
    }

    case "IMAGE_RESPONSE": {
      logInbound("IMAGE_RESPONSE", m.data);
      appendBridgeRecord("image_response", m.data);
      break;
    }

    case "COMPILER_EVENT": {
      logInbound("COMPILER_EVENT", m);
      appendBridgeRecord("compiler_event", m);
      break;
    }

    default: {
      PulseRealm.PulseLog(
        "boot",
        "%c[BRIDGE::UNKNOWN] %c%s",
        "color:#7C4DFF; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        m.type
      );
      break;
    }
  }
}

// ============================================================================
// REQUEST ID GENERATOR
// ============================================================================

function nextRequestId(prefix = "req") {
  return (
    prefix +
    "-" +
    PulseRealm.PulseNOW.toString(36) +
    "-" +
    Math.random().toString(36).slice(2)
  );
}

function getCurrentCoordinates() {
  try {
    if (PulseRealm.ReadPulseTouchInternal) {
      const touch = PulseRealm.ReadPulseTouchInternal({
        coord: "W0.P0.R0.S0.SH0.PORTAL",
      });
      return touch.coord || null;
    }
  } catch {}

  return "LOGIN";
}

function interpretCoordinates(coord) {
  if (!coord || typeof coord !== "string") return null;
  const parts = coord.split(".");
  const node = parts[parts.length - 1];
  const map = {
    "INDEX": "PulseWorldReality",
    "LOGIN": "PulseWorldReality",
    "FOUNDERS": "PulseWorldFounders",
    "TEAM": "PulseWorldTeam",
    "BANK": "PulseWorldRewards",
    "REWARDS": "PulseWorldRewards",
    "VAULT": "PulseWorldVault",
    "ENGINE": "PulseWorldEngine",
    "SCANNER": "PulseWorldScanner",
    "CAMERA": "PulseWorldScanner",
    "ASSETS": "PulseWorldAssets",
    "CRYPTO": "PulseWorldAssets",
    "SETTINGS": "PulsePalSettings",
    "USERPROFILE": "PulseWorldInventory",
    "MESH": "PulseWorldMeshLink",
    "INVENTORY": "PulseWorldInventory",
    "DASHBOARD": "PulseWorldInventory",
    "ROUTE": "PulseWorldReality"
  };
  return map[node] || null;
}

// ============================================================================
// ROUTE CONTEXT v34 — Barrier + Coordinate + Cookie + Surface
// ============================================================================
function buildRouteContext(path, payload) {
  const ctx = {
    path,
    surface: null,
    coord: null,
    worldRoute: null,
    cookieRoute: null
  };

  try {
    ctx.surface = `?Impulse=${PulseRealm.__PULSE_CURRENT_PAGE__}`;
  } catch {}


  try {
    // Barrier coordinate + interpreted world route
    if (getCurrentCoordinates) {
      const coord = getCurrentCoordinates();
      if (coord) {
        ctx.coord = coord;
        const wr = interpretCoordinates(coord);
        if (wr) ctx.worldRoute = wr;
      }
    }
  } catch {}

  try {
    // cookie-based route hint (if your system uses it)
    if (typeof document !== "undefined" && document.cookie) {
      const m = document.cookie.match(/(?:^|;\s*)pulse_route=([^;]+)/);
      if (m) ctx.cookieRoute = decodeURIComponent(m[1]);
    }
  } catch {}

  return ctx;
}

function enrichPayloadWithRouteContext(path, payload) {
  const base = payload && typeof payload === "object" ? payload : {};
  const routeContext = buildRouteContext(path, base);
  return {
    ...base,
    __routeContext: routeContext
  };
}

// ============================================================================
// SIGNAL (Understanding / CNS side) — now route-context aware
// ============================================================================
export function signal(path, payload = {}) {
  const enrichedPayload = enrichPayloadWithRouteContext(path, payload);
  trace("SIGNAL", { path, payload: enrichedPayload });
  send(
    envelope("CNS_SIGNAL", {
      path,
      payload: enrichedPayload
    })
  );
}

// ============================================================================
// PREWARM — now includes route context in the hint signal
// ============================================================================
export function prewarmBridge(hints = {}) {
  try {
    if (
      typeof window !== "undefined" &&
      PulseRealm.prewarmAssets &&
      Array.isArray(hints.assets)
    ) {
      PulseRealm.prewarmAssets(hints.assets);
      appendBridgeRecord("prewarm_assets", { urls: hints.assets });
    }
  } catch {}

  const enrichedHints = {
    ...hints,
    band: "dual",
    advantageField: hints.advantageField || "bridge-prewarm",
    speedField: hints.speedField || "fast-path",
    experienceField: hints.experienceField || "portal-trust-layer"
  };

  const routeContext = buildRouteContext("portal.prewarmHint", enrichedHints);

  signal("portal.prewarmHint", {
    ...enrichedHints,
    __routeContext: routeContext
  });
}


// ============================================================================
// FIRE-AND-FORGET ROUTE — now route-context aware
// ============================================================================
export function fireAndForgetRoute(path, payload = {}) {
  const enrichedPayload = enrichPayloadWithRouteContext(path, payload);
  trace("FIRE_AND_FORGET", { path, payload: enrichedPayload });
  send(
    envelope("CNS_REQUEST", {
      requestId: "ff-" + PulseRealm.PulseNOW.toString(36),
      path,
      payload: enrichedPayload
    })
  );
}

// ============================================================================
// STARTERS — PulseBand / Understanding aligned
// ============================================================================
export async function startDualBandAI(options = {}) {
  // 0) Telemetry
  trace("DUALBAND_AI_START", options);
  send(envelope("DUALBAND_AI_START", { options }));

  // 1) Initialize PulseBand v40
  trace("PULSEBAND_V40_INIT", options);
  await PulseBand.init();

  // 2) Attach CheckBand + BinaryWave
  trace("PULSEBAND_V40_ATTACH", options);
  await initCheckBand(PulseBand);
  await initBinaryWave(PulseBand);

  // 3) Start PulseBand (recursion governor)
  trace("PULSEBAND_V40_START", options);
  await PulseBand.start();

  // 4) Boot Binary via DualBand organism creator
  trace("BINARY_OS_BOOT", options);
  const binary = await bootBinaryOrganism(options);

  // 5) Build safe binary view (sentience snapshot, vitals, etc.)
  const safeBinaryView = makeSafeBinaryView(binary, options);

  // 6) Expose global binary state
  PulseRealm.PulseBinary = binary;
  PulseRealm.__PulseBinaryBooted = true;
  PulseRealm.PulseBinaryView = safeBinaryView;

  // 7) Return boot summary
  return {
    band: PulseBand.getState(),
    binary: safeBinaryView
  };
}

// ============================================================================
// BINARY BOOT — uses createDualBandOrganismV30
// ============================================================================
async function bootBinaryOrganism(options = {}) {
  let binary = null;

  if (PulseRealm.PulseBinary) {
    binary = PulseRealm.PulseBinary;
  } else if (typeof createDualBandOrganismV30 === "function") {
    binary = await createDualBandOrganismV30({
      trace: false,
      band: options.bandId || (PulseRealm.ONE_BAND && PulseRealm.ONE_BAND.id) || "PulseBand",
      options
    });
  }

  return binary || null;
}

// ============================================================================
// SAFE BINARY VIEW — vitals / consciousness / sentience snapshot
// ============================================================================
function makeSafeBinaryView(binary, options = {}) {
  if (!binary) return null;

  const meta = {
    layer: binary.layer || null,
    role: binary.role || null,
    version: binary.version || null,
    lineage: binary.lineage || null,
    evo: binary.evo || null,
    band: options.bandId || (PulseRealm.ONE_BAND && PulseRealm.ONE_BAND.id) || "PulseBand",
    projection: "read-only-binary-shadow"
  };

  return {
    meta,

    Vitals: {
      generate: () =>
        binary.vitals?.generateVitals
          ? binary.vitals.generateVitals()
          : null
    },

    Consciousness: {
      latest: () =>
        binary.consciousness?.generateConsciousnessPacket
          ? binary.consciousness.generateConsciousnessPacket()
          : null
    },

    Sentience: {
      snapshot:
        typeof binary.sentience?.snapshot === "function"
          ? () => binary.sentience.snapshot()
          : () => null
    }
  };
}



export function fetchImageThroughBridge(url) {
  trace("IMAGE_FETCH", { url });

  const requestId =
    "img-" + PulseRealm.PulseNOW.toString(36) + "-" + Math.random().toString(36).slice(2);

  return new Promise((resolve) => {
    imagePending[requestId] = { resolve };
    send(
      envelope("IMAGE_REQUEST", {
        requestId,
        url
      })
    );
  });
}

export function pulseNetFastLane(data = {}) {
  trace("PULSENET_FASTLANE", data);
  send(envelope("PULSENET_FASTLANE", data));
}

export function pulseNetIngress(data = {}) {
  trace("PULSENET_INGRESS", data);
  send(envelope("PULSENET_INGRESS", data));
}

export function startUnderstanding(options = {}) {
  trace("UNDERSTANDING_BOOT", options);
  send(
    envelope("UNDERSTANDING_BOOT", {
      options
    })
  );
}

export function startPulseNet(options = {}) {
  try {
    const time = performance.now();

    // Build the new PulseNet surface
    const surface = PulseNetSurface({
      fetchAPI: options.fetchAPI || globalThis.fetch,
      PulseNet: options.PulseNet || globalThis.PulseNet,
      ProxySpine: options.ProxySpine || globalThis.ProxySpine,
      BoxCamera: options.BoxCamera || globalThis.BoxCamera,
      JuryFrame: options.JuryFrame || globalThis.JuryFrame,
      TrustFabric: options.TrustFabric || globalThis.TrustFabric
    });

    // Diagnostics
    PulseProofBridge.diagnosticsBus.emit("pulse-net-start", {
      options,
      surface,
      time
    });

    // Trust event
    PulseProofBridge.trust.recordEvent("pulse-net-start", {
      options,
      time
    });

    // Evidence packet
    PulseProofBridge.evidenceBus.record("pulse-net-start", {
      options,
      surface,
      time
    });

    // Store surface on the bridge
    PulseProofBridge.PulseNetSurface = surface;
    PulseProofBridge.PulseNetReady = true;

    return {
      ok: true,
      surface,
      envelope: {
        type: "pulse-net-start",
        time
      }
    };

  } catch (err) {
    return PulseProofBridge.errorBeacon("pulse-net-start-failure", {
      message: String(err),
      severity: "fatal",
      tags: ["pulse-net", "start"],
      payload: { options }
    });
  }
}

export function requestCompiler(reason = "touch", meta = {}) {
  trace("COMPILER_REQUEST", { reason, meta });
  send(envelope("COMPILER_REQUEST", { reason, meta }));
}

// ============================================================================
// EXPORT SURFACE
// ============================================================================
PulseRealm.PulseProofBridge = PulseProofBridge;
PulseRealm.PulseNetIngress = pulseNetIngress;
PulseRealm.PulseNetFastLane = pulseNetFastLane;
PulseRealm.PulseMemoryBridge = PulseRealm.PulseCoreMemory;
