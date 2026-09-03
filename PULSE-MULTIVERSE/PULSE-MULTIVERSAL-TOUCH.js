// ============================================================================
//  PULSE OS v33‑IMMORTAL‑INTEL‑HYBRID — PULSE MULTIVERSAL TOUCH (HELPERS)
//  “ROOT MEMBRANE / SIGNAL LAYER / MULTIVERSAL ENTRY SURFACE”
//  Deterministic • Zero‑Randomness • Zero‑IO • Zero‑Timers (except pulses)
//  v33 Band Model: binary / symbolic / dual
//  v33 Timeline: INTEL‑hybrid signatures + TRUST‑LAYER PASSPORT
// ============================================================================
globalThis.PulseRealm = globalThis;
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

const PulseGlobalPastA = Object.assign({}, PulseRealm.PulseGlobalPast, PulseRealm.PulseGlobal, PulseRealm.PulseGlobalNow);
const PulseSelfIdentitya = {realm:"pulse-main",timestamp:Date.now(),uid:(PulseRealm.crypto?.randomUUID?.()||("pulse-"+Math.random())),type:"PulseGlobalSelf"};
PulseRealm.PulseSelf = {PulseSelfIdentitya};
const PulseGlobal1a = (typeof window!=="undefined"?window:PulseRealm);
const PulseGlobal2a = (typeof global!=="undefined"?global:PulseGlobal1a);
const PulseGlobal3a = (typeof globalThis!=="undefined"?globalThis:PulseGlobal2a);
PulseRealm.PulseGlobalNow = Object.assign({}, PulseGlobal1a, PulseGlobal2a, PulseGlobal3a, PulseGlobalPastA);

const PulseNOW = Date.now();
const PulsePNOW = performance.now();
PulseRealm.PulseNOW = PulseNOW;
PulseRealm.PulsePNOW = PulsePNOW;
let touchTimelineBuffer = [];

// ============================================================
//  CONSTANTS — v33 IMMORTAL‑INTEL‑HYBRID
// ============================================================
const PULSE_TOUCH_COOKIE_NAMEZ = "PulseTouchPassport.v35"; // upgraded: trust‑layer passport
const PULSE_TOUCH_MAX_AGE = 45; // short TTL to avoid stale membrane state

const PULSE_TOUCH_VERSION = "33.0-IMMORTAL-INTEL-HYBRID";
PulseRealm.PULSE_TOUCH_VERSION = PULSE_TOUCH_VERSION;

const PULSE_TOUCH_TIMELINE_LS_KEY = "PulseTouch.v33.timeline";
const PULSE_TOUCH_TIMELINE_MAX = 4096; // expanded for multiversal routing

// v33 pulse physics (adaptive, presence-aware, advantage-aware)
const PULSE_TOUCH_PULSE_INTERVAL_MS_BASE = 160;
const PULSE_TOUCH_PULSE_INTERVAL_MS_MIN = 60;
const PULSE_TOUCH_PULSE_INTERVAL_MS_MAX = 600;

const PULSE_TOUCH_PULSE_BURST_COUNT = 16;
const PULSE_TOUCH_PULSE_BURST_SPACING_MS = 40;

// multi‑tab coordination
const PULSE_TOUCH_BROADCAST_CHANNEL = "PulseTouch.v33.channel";

// in‑memory preflight registry
const pulseTouchPreflights = [];

// v33 hooks (INTEL‑aware)
const pulseTouchHooks = {
  onPulse: [],
  onSecurityChange: [],
  onGateDecision: [],
  onTimelineEvent: [],
  onCadenceChange: [],
  onPrediction: [],
  onThreatShape: [],
  onPresenceOracle: [],
  onImpulse: [] // v32+ impulse routing hook
};

function normalizeArgs(args) {
  let message = "";
  let rest = [];
  let raw = false;
  const first = args[0];
  if (typeof first === "string" && first.startsWith("%c")) {
    return { subsystem: null, message: first, rest: args.slice(1), raw: true };
  }
  if (args.length === 2 && first === "comment" && typeof args[1] === "object" && args[1] !== null  ) {
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
  if (args.length >= 2 && typeof first === "string" && typeof args[1] === "object" && args[1] !== null) {
    return { subsystem: null, message: first, rest: args.slice(1), raw: false };
  }
  if (args.length >= 2 && typeof first === "string" && typeof args[1] === "string") {
    return { subsystem: first, message: args[1], rest: args.slice(2), raw: false };
  }
  if (typeof first === "object" && first !== null) {
    return { subsystem: null, message: "", rest: [first], raw: false };
  }
  if (args.length === 1) {
    return { subsystem: null, message: first, rest: [], raw: false };
  }
  return { subsystem: null, message: args.join(" "), rest: [], raw: false };
}



const PulseVersion = {
  proof: "30.0",
  trust: "40.0",
  logger: "30.0",
  renderer: "32.0",
  chunker: "32.0",
  port: "40.0",
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

const PulseRoleFallback = "*Evolved PulseWorld.Net Organ";

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
// ─────────────────────────────────────────────
//  DIMENSIONAL FATE ROUTER (REPLACES mark404)
// ─────────────────────────────────────────────
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

function _chronoLabel(absolute) {
  let _pulseChronoLast = PulseRealm.__PULSE_CHRONO_LAST__ || performance.now();
  const now = PulseRealm.PulsePNOW;
  const diff = now - _pulseChronoLast;
  const label = absolute ? `@${now.toFixed(1)}ms` : `+${diff.toFixed(1)}ms`;
  _pulseChronoLast = now;
  PulseRealm.__PULSE_CHRONO_LAST__ = _pulseChronoLast;
  return label;
}
function log(...args) {
  const { subsystem, message, rest, raw, absolute, context } = normalizeArgs(args);

  const safe = subsystem || "legacy";
  const version = (PulseVersion[safe] ? `v${PulseVersion[safe]}` : `v${PulseVersionFallback}`);
  const color = PulseColors[safe] || PulseColorFallback;
  const icon = PulseIcons[safe] || PulseIconsFallback;

  const prefix = `${icon} ${safe.toUpperCase()} ${version}`;

  // NEW: dimensional fate routing applied to message
  const fatePacket = markFate(message, context || {});
  const safeMessage = `${fatePacket.fate.toUpperCase()}: ${fatePacket.raw}`;

  const time = _chronoLabel(absolute);

  console.log(
    `⟡ PULSE MULTIVERSAL TOUCH v33.0 — %c${safeMessage} ${time}`,
    `color:${color}; font-weight:bold;`,
    ...rest
  );
}

log(
  "%c[PulseWorldTouch] %c Standard Cookie Driven Boot Process Started!",
  "color:#90CAF9; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;")
// ============================================================================
//  TRUST‑LAYER PASSPORT — v33
//  “Cookie as Identity / Not Storage”
// ============================================================================
function readPulseTouchPassport() {
  try {
    const raw = document.cookie
      .split("; ")
      .find(x => x.startsWith(PULSE_TOUCH_COOKIE_NAMEZ + "="));

    if (!raw) return null;

    const encoded = raw.split("=")[1];
    if (!encoded) return null;

    // ⭐ v35: base64-url decode
    const b64 = encoded
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(encoded.length + (4 - (encoded.length % 4)) % 4, "=");

    const json = atob(b64);
    const passport = JSON.parse(json);

    // ⭐ strict validation
    if (!passport || typeof passport !== "object") return null;
    if (!passport.instance || !passport.signature) return null;

    return passport;

  } catch {
    return null;
  }
}
function writePulseTouchPassport(passport) {
  try {
    const json = JSON.stringify(passport);

    // ⭐ v35: base64-url encode
    const b64 = btoa(json)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    document.cookie =
      `${PULSE_TOUCH_COOKIE_NAMEZ}=${b64};` +
      `path=/; max-age=${PULSE_TOUCH_MAX_AGE}; SameSite=Lax; Secure`;

  } catch {}
}
function refreshPulseTouchPassport() {
  const now = PulseRealm.PulseNOW;
  let passport = readPulseTouchPassport();

  if (!passport) {
    passport = {
      v: "35-TRUST-LAYER",
      instance:
        (crypto.randomUUID()) ||
        ("inst_" + now + "_" + Math.random().toString(16).slice(2)),
      trust: "baseline",
      continuity: "",
      lastSeen: now,
      signature: btoa(String(now)).slice(0, 32),

      // ⭐ include PulseGlobal snapshot
      PulseGlobal: PulseRealm.PulseGlobalNow || {},

      // ⭐ include page
      page: "PulseWorldReality"
    };
  } else {
    passport.lastSeen = now;

    // ⭐ keep PulseGlobal updated
    passport.PulseGlobal = PulseRealm.PulseGlobalNow || {};

  }

  writePulseTouchPassport(passport);
  return passport;
}

function getPulseTouchTrustLevel() {
  const passport = readPulseTouchPassport();
  return passport.trust || "baseline";
}
function updatePulseTouchTrustLevel(level) {
  const passport = readPulseTouchPassport();
  if (!passport) return;

  passport.trust = level;
  passport.lastSeen = PulseRealm.PulseNOW;


  writePulseTouchPassport(passport);
}

function recordPulseTouchContinuity(eventType, eventData = {}) {
  const passport = readPulseTouchPassport();
  if (!passport) return;

  const entry = {
    ts: PulseRealm.PulseNOW,
    type: eventType,
    data: eventData
  };

  // Ensure continuity array exists
  if (!Array.isArray(passport.continuity_v40)) {
    passport.continuity_v40 = [];
  }

  // Push new entry
  passport.continuity_v40.push(entry);

  // Cap at 64 entries (or whatever you want)
  if (passport.continuity_v40.length > 64) {
    passport.continuity_v40 = passport.continuity_v40.slice(-64);
  }

  passport.lastSeen = entry.ts;

  writePulseTouchPassport(passport);
}



// ============================================================
//  GLOBAL TOUCH STATE — v32 IMMORTAL‑INTEL‑HYBRID (PRESERVED)
// ============================================================

  PulseRealm.__PULSE_TOUCH__ = PulseRealm.__PULSE_TOUCH__ || null;

  PulseRealm.__PULSE_TOUCH_ORIGIN_TS__ =
    PulseRealm.__PULSE_TOUCH_ORIGIN_TS__ || PulseRealm.PulseNOW;

  PulseRealm.__PULSE_TOUCH_PULSE_STATE__ =
    PulseRealm.__PULSE_TOUCH_PULSE_STATE__ || {
      started: false,
      intervalId: null,
      intervalMs: PULSE_TOUCH_PULSE_INTERVAL_MS_BASE,
      lastMode: "burst",
      lastPulseTs: 0,
      lastGateDecision: null,
      lastThreatShape: null,
      lastPresenceOracle: null,
      lastImpulse: null // v32 impulse memory
    };

  PulseRealm.__PULSE_TOUCH_LAST_GATE__ =
    PulseRealm.__PULSE_TOUCH_LAST_GATE__ || null;

  PulseRealm.__PULSE_TOUCH_LAST_SECURITY__ =
    PulseRealm.__PULSE_TOUCH_LAST_SECURITY__ || null;


// ============================================================
//  BROADCAST CHANNEL — v33 (TRUST SYNC + EXISTING USES)
// ============================================================

let pulseTouchChannel = null;
try {
  pulseTouchChannel = new BroadcastChannel(PULSE_TOUCH_BROADCAST_CHANNEL);
} catch {
  pulseTouchChannel = null;
}

function pulseTouchCrossTabSync(payload) {
  try {
    pulseTouchChannel.postMessage({
      kind: "trust_sync",
      payload,
      ts: PulseRealm.PulseNOW
    });
  } catch {}
}

if (pulseTouchChannel) {
  pulseTouchChannel.onmessage = (ev) => {
    try {
      const { kind, payload } = ev.data || {};
      if (kind === "trust_sync") {
        updatePulseTouchTrustLevel(payload.trust || "baseline");
      }
    } catch {}
  };
}

// ============================================================
//  LOCAL STORAGE HELPERS — v33
// ============================================================
const TOUCH_DB_NAME = "PulseMultiversalTouchDB";
const TOUCH_STORE = "timeline";

function openTouchDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(TOUCH_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(TOUCH_STORE)) {
        db.createObjectStore(TOUCH_STORE, { keyPath: "id", autoIncrement: true });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function loadTouchTimeline() {
  const db = await openTouchDB();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(TOUCH_STORE, "readonly");
      const store = tx.objectStore(TOUCH_STORE);
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
async function appendTouchTimelineToIndexedDB(entry) {
  try {
    const db = await openTouchDB();
    if (!db) return;

    const tx = db.transaction(TOUCH_STORE, "readwrite");
    tx.objectStore(TOUCH_STORE).put(entry);
  } catch {}
}
async function saveTouchTimeline(buf) {
  const db = await openTouchDB();
  if (!db) return;

  const trimmed =
    buf.length > PULSE_TOUCH_TIMELINE_MAX
      ? buf.slice(buf.length - PULSE_TOUCH_TIMELINE_MAX)
      : buf;

  try {
    // wipe old timeline
    const txClear = db.transaction(TOUCH_STORE, "readwrite");
    txClear.objectStore(TOUCH_STORE).clear();

    // write new timeline
    const tx = db.transaction(TOUCH_STORE, "readwrite");
    const store = tx.objectStore(TOUCH_STORE);

    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch {}
}


// ============================================================
//  TIMELINE + INTEL SIGNATURES — v33
// ============================================================

function fireTimelineHooks(kind, payload) {
  const hooks = pulseTouchHooks.onTimelineEvent || [];
  for (const fn of hooks) {
    try {
      fn({ kind, payload });
    } catch {}
  }
}

async function appendTouchTimeline(kind, payload = {}) {
  const ts = PulseRealm.PulseNOW;
  const origin = PulseRealm.__PULSE_TOUCH_ORIGIN_TS__ || ts;

  // ============================================================
  // ⭐ Build canonical entry
  // ============================================================
  const entry = {
    ts,
    dt: ts - origin,
    kind,
    payload: {
      ...payload,
      version: PULSE_TOUCH_VERSION,
      intelSignature: `INTEL_${kind}_${ts}_${payload.impulse || ""}`
    }
  };

  // ============================================================
  // ⭐ 1) Push into in‑memory buffer
  // ============================================================
  try {
    touchTimelineBuffer.push(entry);
  } catch {}

  // ============================================================
  // ⭐ 2) Persist to IndexedDB (async)
  // ============================================================
  try {
    appendTouchTimelineToIndexedDB(entry);
  } catch {}

  // ============================================================
  // ⭐ 3) Persist to localStorage timeline (legacy)
  // ============================================================
  try {
    const buf = await loadTouchTimeline();
    buf.push(entry);
    saveTouchTimeline(buf);
  } catch {}

  // ============================================================
  // ⭐ 4) Fire timeline hooks
  // ============================================================
  try {
    fireTimelineHooks(kind, entry.payload);
  } catch {}

  // ============================================================
  // ⭐ 5) Bridge + Logger (non‑blocking)
  // ============================================================
  try {
    PulseRealm.PulseBridgeRoute("touch.timeline", entry);
  } catch {}

  try {
    PulseRealm.PulseLogger.route("touchTimeline.log", entry);
  } catch {}

  return entry;
}

  PulseRealm.TouchTimeline = appendTouchTimeline;


// ============================================================================
//  SUBSTRATE B — SIGNALS / LOGS / NETWORK (v33‑IMMORTAL‑INTEL‑HYBRID)
//  “Nervous System Organ”
// ============================================================================

const TouchSignals = {
  // TIMELINE
  timeline: {
    append: appendTouchTimeline,
    fire: fireTimelineHooks,
    load: loadTouchTimeline,
    save: saveTouchTimeline
  },

  // PULSES
  pulses: {
    send: sendFastLanePulse,
    start: startContinuousPulseStream,
    stop: stopContinuousPulseStream,
    fireHooks: firePulseHooks,
    computeInterval: computeAdaptiveIntervalMs,
    applyCadence: applyAdaptiveCadence
  },

  // NETWORK
  network: {
    broadcast: pulseTouchChannel,
    fastlane: PulseRealm.pulseNetFastLanePulse,
    ingress: PulseRealm.pulseNetIngressFromUser,
    analytics: getPulseTouchAnalytics
  },

  // LOGS (NERVOUS vNext)
  logs: {
    log(kind, payload = {}) {
      try {
        appendTouchTimeline(kind, payload);
      } catch (err) {
        try {
          console.warn("⟡ PULSE MULTIVERSAL TOUCH v33.0 — [PulseWorldTouch] NERVOUS Fallback:", kind, payload);
        } catch {}
      }
    }
  }
};

// ============================================================
//  ADAPTIVE CADENCE — v33
// ============================================================

function computeAdaptiveIntervalMs({ security, skin }) {
  const base = PULSE_TOUCH_PULSE_INTERVAL_MS_BASE;
  let factor = 1.0;

  const risk = security.risk || "unknown";
  const trust = security.trust || getPulseTouchTrustLevel() || "unknown";
  const presence = skin.presence || "active";
  const band = skin.band || "symbolic";
  const mode = skin.mode || "fast";
  const pulseStream = skin.pulseStream || "continuous";
  const fastLane = skin.fastLane || "enabled";

  if (presence === "idle" || presence === "background") factor *= 1.8;
  if (risk === "high" || risk === "critical") factor *= 1.6;
  else if (risk === "low") factor *= 0.9;

  if (trust === "trusted") factor *= 0.9;
  else if (trust === "untrusted") factor *= 1.3;

  if (band === "binary") factor *= 0.85;

  if (mode === "slow") factor *= 1.4;
  else if (mode === "fast") factor *= 0.9;

  if (pulseStream === "single") factor *= 1.2;
  else if (pulseStream === "burst") factor *= 0.95;

  if (fastLane === "disabled") factor *= 1.1;

  let interval = Math.round(base * factor);
  if (interval < PULSE_TOUCH_PULSE_INTERVAL_MS_MIN)
    interval = PULSE_TOUCH_PULSE_INTERVAL_MS_MIN;
  if (interval > PULSE_TOUCH_PULSE_INTERVAL_MS_MAX)
    interval = PULSE_TOUCH_PULSE_INTERVAL_MS_MAX;

  return interval;
}

function applyAdaptiveCadence(state, { security, skin }) {
  if (!state) return;
  const nextInterval = computeAdaptiveIntervalMs({ security, skin });
  if (nextInterval === state.intervalMs) return;

  const prev = state.intervalMs;
  state.intervalMs = nextInterval;

  appendTouchTimeline("pulse_cadence_changed", {
    fromMs: prev,
    toMs: nextInterval
  });

  const hooks = pulseTouchHooks.onCadenceChange || [];
  for (const fn of hooks) {
    try {
      fn({ fromMs: prev, toMs: nextInterval, security, skin });
    } catch {}
  }

  if (state.intervalId) {
    try {
      clearInterval(state.intervalId);
    } catch {}
    state.intervalId = setInterval(() => {
      sendFastLanePulse("continuous", skin, security, state.lastGateDecision);
    }, state.intervalMs);
  }
}

// ============================================================
//  ANALYTICS — v33
// ============================================================

let pulseTouchAnalyticsInstance = null;
function getPulseTouchAnalytics() {
  const A = PulseRealm.PulseGlobalNow ? PulseRealm.PulseTouchAnalytics : null;
  if (!A) return null;

  if (pulseTouchAnalyticsInstance) return pulseTouchAnalyticsInstance;

  try {
    if (typeof A === "function") {
      const maybe = A();
      if (maybe && typeof maybe.recordPulse === "function") {
        pulseTouchAnalyticsInstance = maybe;
        return maybe;
      }
    }
  } catch {}

  pulseTouchAnalyticsInstance = A;
  return A;
}

// NOTE: startContinuousPulseStream is now optional; createPulseTouch
// no longer auto‑starts it. You can call it manually if you want pulses.
function startContinuousPulseStream(skin, security, gateDecision) {
  const state = PulseRealm.__PULSE_TOUCH_PULSE_STATE__;
  if (!state || state.started) return;

  state.started = true;
  state.lastGateDecision = gateDecision || null;

  // Compute cadence once
  state.intervalMs = computeAdaptiveIntervalMs({ security, skin });
  state.nextPulseAt = performance.now(); // first pulse immediately
  state.frameId = null;

  appendTouchTimeline("pulse_stream_start", {
    intervalMs: state.intervalMs
  });

  // Initial synchronous burst (ZERO STALL)
  try {
    for (let i = 0; i < PULSE_TOUCH_PULSE_BURST_COUNT; i++) {
      sendFastLanePulse("burst", skin, security, gateDecision);
    }
  } catch {}

  // Continuous stream via RAF (ZERO STALL)
  function pulseLoop(now) {
    if (!state.started) return;

    if (now >= state.nextPulseAt) {
      sendFastLanePulse("continuous", skin, security, gateDecision);
      state.nextPulseAt = now + state.intervalMs;
    }

    state.frameId = requestAnimationFrame(pulseLoop);
  }

  try {
    state.frameId = requestAnimationFrame(pulseLoop);
  } catch {
    appendTouchTimeline("pulse_stream_failed", {});
  }
}

function stopContinuousPulseStream() {
  const state = PulseRealm.__PULSE_TOUCH_PULSE_STATE__;
  if (!state || !state.started) return;

  try {
    if (state.intervalId) clearInterval(state.intervalId);
  } catch {}

  state.intervalId = null;
  state.started = false;

  appendTouchTimeline("pulse_stream_stopped", {});
}

function firePulseHooks(mode, payload) {
  const hooks = pulseTouchHooks.onPulse || [];
  for (const fn of hooks) {
    try {
      fn({ mode, payload });
    } catch {}
  }
}

function sendFastLanePulse(mode, skin, security, gateDecision) {
  const ts = PulseRealm.PulseNOW;
  const band = skin.band || "symbolic";

  const payload = {
    source: "pulse-touch",
    mode,
    ts,
    band,
    skin: {
      region: skin.region,
      mode: skin.mode,
      presence: skin.presence,
      page: skin.page,
      chunkProfile: skin.chunkProfile,
      band,
      pulseStream: skin.pulseStream || "continuous",
      fastLane: skin.fastLane || "enabled"
    },
    security: {
      risk: security.risk ?? "unknown",
      trust: security.trust ?? getPulseTouchTrustLevel() ?? "unknown",
      action: security.action ?? "allow"
    },
    gate: {
      mode: gateDecision.mode ?? "fast",
      refresh: !!gateDecision.refresh,
      fallback: !!gateDecision.fallback
    }
  };

  appendTouchTimeline("pulse_fastlane_emit", {
    mode,
    page: skin.page,
    chunkProfile: skin.chunkProfile,
    band
  });

  firePulseHooks(mode, payload);

  // 1) PulseNet FastLane (Portal-safe, one-band relay)
  try {
    PulseRealm.pulseNetFastLanePulse(payload);
  } catch {}

  // 2) Optional ingress
  try {
    PulseRealm.pulseNetIngressFromUser({
      source: "pulse-touch",
      event: "pulse",
      ts,
      skin,
      security,
      gate: gateDecision,
      mode,
      band
    });
  } catch {}

  // 3) Analytics (IMMORTAL++)
  try {
    const analytics = getPulseTouchAnalytics();
    analytics.recordPulse({
      ts,
      mode,
      band,
      skin,
      security,
      gate: gateDecision
    });
  } catch {}
}

function registerHook(kind, fn) {
  if (!fn || typeof fn !== "function") return;
  const bucket = pulseTouchHooks[kind];
  if (!bucket) return;
  bucket.push(fn);

  appendTouchTimeline("hook_registered", {
    kind,
    count: bucket.length
  });
}

// ============================================================================
//  SUBSTRATE A — MEANING / EXECUTION / WORLD ENTRY (v32‑IMMORTAL‑INTEL‑HYBRID)
//  “Impulse → Meaning → World Engine”
// ============================================================================

const TouchMeaning = {
  emitImpulse: null,
  worldEntry: null,
  handlePopState: null,
  checkExternalImpulse: null,
  interceptLinks: null
};

// ============================================================================
//  TOUCH MEMBRANE TRANSLATOR — vNext
//  “Auto‑route legacy calls → Substrate A/B/C”
// ============================================================================

(async function installTouchMembraneTranslator() {
  try {
      const rows = await loadTouchTimeline();
      touchTimelineBuffer = Array.isArray(rows) ? rows : [];
    } catch {
      touchTimelineBuffer = [];
    }

  const _append = appendTouchTimeline;
  appendTouchTimeline = function(kind, payload) {
    try { TouchSignals.timeline.append(kind, payload); }
    catch { _append(kind, payload); }
  };

  // ------------------------------------------------------------
  // sendFastLanePulse → TouchSignals.pulses.send
  // ------------------------------------------------------------
  const _sendPulse = sendFastLanePulse;
  sendFastLanePulse = function(mode, skin, security, gateDecision) {
    try { return TouchSignals.pulses.send(mode, skin, security, gateDecision); }
    catch { return _sendPulse(mode, skin, security, gateDecision); }
  };

  // ------------------------------------------------------------
  // worldEntry → TouchMeaning.worldEntry
  // ------------------------------------------------------------
  const _worldEntry = PulseRealm.worldEntry;
  if (typeof _worldEntry === "function") {
    PulseRealm.worldEntry = function(impulse) {
      try { return TouchMeaning.worldEntry(impulse); }
      catch { return _worldEntry(impulse); }
    };
  }

  // ------------------------------------------------------------
  // emitImpulse → TouchMeaning.emitImpulse
  // ------------------------------------------------------------
  const _emitImpulse = PulseRealm.emitImpulse;
  if (typeof _emitImpulse === "function") {
    PulseRealm.emitImpulse = function(impulse, meta) {
      try { return TouchMeaning.emitImpulse(impulse, meta); }
      catch { return _emitImpulse(impulse, meta); }
    };
  }

})();

// ============================================================================
//  getPulseTouchContext — v31 IMMORTAL TOUCH CONTEXT (PRESERVED)
//  Pure, page-safe, zero-side-effects, no recursion
// ============================================================================

function getPulseTouchContext() {
  try {
    // Touch runtime container (created by Touch ignition)
    const runtime = PulseRealm.PulseTouchRuntime;

    if (!runtime || typeof runtime !== "object") {
      return {
        ok: false,
        reason: "runtime-missing",
        version: "v31-IMMORTAL-CONTEXT"
      };
    }

    return {
      ok: true,
      version: runtime.version || "v31-IMMORTAL-CONTEXT",
      runtimeState: runtime.runtimeState || null,
      powerSnapshot: runtime.powerSnapshot || null,
      navState: runtime.navState || null,
      worldRuntimeFrame: runtime.worldRuntimeFrame || null,
      getDNA: typeof runtime.getDNA === "function"
        ? runtime.getDNA
        : () => null
    };

  } catch (err) {
    return {
      ok: false,
      reason: "context-error",
      error: String(err),
      version: "v31-IMMORTAL-CONTEXT"
    };
  }
}

// ============================================================
//  v33 createPulseTouch — TRUST‑LAYER + MULTIVERSAL ENGINE
// ============================================================
function createPulseTouch(options = {}) {
  const originTs =
    (PulseRealm.PulseGlobalNow && PulseRealm.__PULSE_TOUCH_ORIGIN_TS__) || PulseRealm.PulseNOW;

  // TRUST PASSPORT REFRESH (NEW)
  const passport = refreshPulseTouchPassport();
  TouchSignals.timeline.append("passport_refreshed", { passport });

  TouchSignals.timeline.append("touch_init_called", {
    originTs,
    optionsHint: {
      region: options.region || null,
      mode: options.mode || null,
      page: options.page || null,
      chunkProfile: options.chunkProfile || null,
      band: options.band || null,
      profile: options.profile || null,
      coord: options.coord || null
    }
  });

  // v30+ one‑band defaults (UPGRADED)
  PulseRealm.PulseTouchMobile ??= (() => {
  // Node-safe: detect browser first
  const isBrowser =
    typeof window !== "undefined" &&
    typeof document !== "undefined";

  if (!isBrowser) {
    // Node fallback
    return false;
  }

  // Browser-safe checks
  const coarse = typeof matchMedia === "function" &&
                 matchMedia("(pointer: coarse)").matches;

  return (
    window.innerWidth <= 750 ||
    ("ontouchstart" in window) ||
    navigator.maxTouchPoints > 0 ||
    coarse
  );
})();


  const defaults = {
    region:       options.region       || "unknown",
    mode:         options.mode         || "fast",
    presence:     options.presence     || "active",
    page:         options.page         || "index",
    band:         options.band         || "symbolic",
    chunkProfile: options.chunkProfile || "default",
    profile:      options.profile      || "v33",
    coord:        options.coord        || {
      x: 0,
      y: 0,
      z: 0,
      world: PulseRealm.PulseWorld?.currentWorld  || "default-world",
      region: PulseRealm.PulseWorld?.currentRegion || (options.region || "unknown")
    },
    isMobile:     PulseRealm.PulseTouchMobile,
    version:      PULSE_TOUCH_VERSION
  };

  // ============================================================
  //  PASSPORT‑ALIGNED COOKIE SEED (UPGRADED)
  // ============================================================
  writePulseTouchCookie({
    ...defaults,

    // passport identity
    passportInstance: passport.instance,
    trust: passport.trust,
    continuity: passport.continuity,

    // world state
    page:     defaults.page,
    coord:    defaults.coord,
    mode:     defaults.mode,
    presence: defaults.presence,
    band:     defaults.band,
    profile:  defaults.profile,
    chunkProfile: defaults.chunkProfile,

    // device state
    isMobile: defaults.isMobile,

    // shadow global (PulseGlobalFinal)
    PulseGlobal: PulseRealm.PulseGlobalNow
  });

  TouchSignals.timeline.append("cookie_seeded_v35", {
    state: {
      ...defaults,
      PulseGlobal: PulseRealm.PulseGlobalNow
    },
    passport
  });
 
  PulseRealm.PulseTouchMobile ??= (
    window.innerWidth <= 750 ||
    ("ontouchstart" in window) ||
    navigator.maxTouchPoints > 0 ||
    PulseRealm.matchMedia("(pointer: coarse)").matches
  );


  // ============================================================
  //  SKIN DETECTION
  // ============================================================
  const detected =
    PulseRealm.PulseTouchDetector?.normalizeSkin(
      readPulseTouchInternal(defaults)
    ) || defaults;

  TouchSignals.timeline.append("skin_detected", { skin: detected });
  PulseRealm.__PULSE_TOUCH__ = detected;

  // ============================================================
  //  PREFLIGHTS
  // ============================================================
  TouchSignals.timeline.append("preflights_start", {
    count: pulseTouchPreflights.length
  });
  runPreflights(detected);
  TouchSignals.timeline.append("preflights_done", {});

  // ============================================================
  //  SECURITY + GATE (UPGRADED WITH TRUST PASSPORT)
  // ============================================================
  let security = { risk: "unknown", trust: passport.trust, action: "allow" };
  try {
    const secEval = PulseRealm.PulseTouchSecurity.evaluate(detected);
    if (secEval) security = secEval;

    // merge passport trust
    security.trust = passport.trust;

    TouchSignals.timeline.append("security_evaluated", { security });
    PulseRealm.__PULSE_TOUCH_LAST_SECURITY__ = security;
  } catch {
    TouchSignals.timeline.append("security_failed", {});
  }

  let gateDecision = { mode: "fast", refresh: false, fallback: false };
  try {
    const gateEval = PulseRealm.PulseTouchGate.decide({
      skin: detected,
      security
    });
    if (gateEval) gateDecision = gateEval;

    TouchSignals.timeline.append("gate_decided", { gateDecision });
  } catch {
    TouchSignals.timeline.append("gate_failed", {});
  }

  applyGateDecision(gateDecision, detected);

  // ------------------------------------------------------------
  // 1) EMIT IMPULSE
  // ------------------------------------------------------------
  function emitImpulse(impulse, meta = {}) {
    if (!impulse) return;

    TouchSignals.timeline.append("impulse_emit", { impulse, meta });

    const state = PulseRealm.PulseGlobalNow ? PulseRealm.__PULSE_TOUCH_PULSE_STATE__ : null;
    if (state) state.lastImpulse = impulse;

    // history: record impulse, then clean URL
    try {
      history.pushState({ impulse }, "", "`${encodeURIComponent(impulse)}`");
      history.replaceState({ impulse }, "", "/");
    } catch {}

    // fire impulse hooks
    const hooks = pulseTouchHooks.onImpulse || [];
    for (const fn of hooks) {
      try {
        fn({ impulse, meta });
      } catch (err) {}
    }

    worldEntry(impulse);
  }

  // ------------------------------------------------------------
  // 2) WORLD ENTRY ENGINE
  // ------------------------------------------------------------
  function worldEntry(impulse) {
    TouchSignals.timeline.append("world_entry", { impulse });

    // SDN prewarm
    try {
      PulseRealm.SDNPrewarm(PulseRealm.PulseSDN);
    } catch {}

    // GPU warm path cache
    try {
      PulseRealm.PulseGPUWarmPathCache.compute({
        page: detected.page,
        chunkProfile: detected.chunkProfile || "default",
        gpuCapable: true,
        trust: security.trust,
        risk: security.risk,
        pulseStream: detected.pulseStream || "continuous",
        fastLane: detected.fastLane || "enabled",
        advantageSnapshot: PulseRealm.PulseAdvantageSnapshot || null,
        earnHints: PulseRealm.PulseEarnHints || null,
        presence: detected.presence,
        nervousSystemChannel: "dual-band",
        ciPressure: 0
      });
    } catch {}

    // GPU planner
    try {
      PulseRealm.PulseGPUChunkPlanner.plan({
        page: detected.page,
        impulse
      });
    } catch {}

    // Presence / Earn / Mesh
    try {
      PulseRealm.PulsePresence.updateFromImpulse(impulse);
      PulseRealm.PulseEarn.updateFromImpulse(impulse);
      PulseRealm.PulseMesh.updateFromImpulse(impulse);
    } catch {}

    // fire world-entry hooks
    const hooks = pulseTouchHooks.onWorldEntry || [];
    for (const fn of hooks) {
      try {
        fn({ impulse });
      } catch {}
    }
  }

  // ------------------------------------------------------------
  // 3) HISTORY RESTORE ENGINE
  // ------------------------------------------------------------
  function handlePopState(event) {
    const impulse = event.state && event.state.impulse;
    if (!impulse) return;

    TouchSignals.timeline.append("world_restore", { impulse });

    try {
      history.replaceState({ impulse }, "", "/");
    } catch {}

    worldEntry(impulse);

    const hooks = pulseTouchHooks.onWorldRestore || [];
    for (const fn of hooks) {
      try {
        fn({ impulse });
      } catch {}
    }
  }

  if (typeof window !== "undefined") {
  window.addEventListener("popstate", handlePopState);
}


  // ------------------------------------------------------------
  // 4) EXTERNAL XYZ ENTRY
  // ------------------------------------------------------------
  function checkExternalImpulse() {
  // Browser-only guard
  const isBrowser =
    typeof window !== "undefined" &&
    typeof location !== "undefined";

  if (!isBrowser) return;

  // Safe: location.search exists only in browser
  const params = new URLSearchParams(location.search);
  const impulse = params.get("impulse");
  if (!impulse) return;

  TouchSignals.timeline.append("external_impulse_detected", { impulse });

  // Safe: history exists only in browser
  try {
    if (typeof history !== "undefined" && history.replaceState) {
      history.replaceState({ impulse }, "", "/");
    }
  } catch {}

  worldEntry(impulse);
}

  checkExternalImpulse();

  function interceptLinks() {
    document.addEventListener("click", (ev) => {
      const el = ev.target.closest("a");
      if (!el) return;

      const href = el.getAttribute("href");

      // ⭐ ONLY react to hash links
      if (href && !href.startsWith("#")) {
         try {
          if (typeof window !== "undefined" && typeof history !== "undefined") {
            history.replaceState({}, "", "/");
          }

        } catch {}
      }
    });


    document.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter") return;

      const el = document.activeElement;

      if (el && el.getAttribute && el.getAttribute("data-impulse")) {
        ev.preventDefault();
        emitImpulse(el.getAttribute("data-impulse"));
        try {
          if (typeof window !== "undefined" && typeof history !== "undefined") {
            history.replaceState({}, "", "/");
          }
        } catch {}
        return;
      }

      const goBtn = document.querySelector("[data-impulse='Go']");
      if (goBtn) {
        ev.preventDefault();
        emitImpulse("Go");
        try {
          if (typeof window !== "undefined" && typeof history !== "undefined") {
            history.replaceState({}, "", "/");
          }
        } catch {}
      }
    });
  }

  // interceptLinks();


  // ============================================================
  //  INTERNAL HELPERS
  // ============================================================
  function updatePulseTouchField(key, value) {
    const current = readPulseTouchInternal(defaults);
    current[key] = value;

    writePulseTouchCookie(current);

    const detectedUpdated =
      PulseRealm.PulseTouchDetector?.normalizeSkin(current) || current;

    PulseRealm.__PULSE_TOUCH__ = detectedUpdated;

    TouchSignals.timeline.append("skin_updated", {
      key,
      value,
      skin: detectedUpdated
    });

    try {
      const state = PulseRealm.PulseGlobalNow ? PulseRealm.__PULSE_TOUCH_PULSE_STATE__ : null;
      const lastSecurity =
        (PulseRealm.PulseGlobalNow && PulseRealm.__PULSE_TOUCH_LAST_SECURITY__) || security;
      if (state && state.started) {
        TouchSignals.pulses.applyCadence(state, {
          security: lastSecurity,
          skin: detectedUpdated
        });
      }
    } catch {}

    return detectedUpdated;
  }

  function read() {
    const current = readPulseTouchInternal(defaults);
    const normalized =
      PulseRealm.PulseTouchDetector?.normalizeSkin(current) || current;
    TouchSignals.timeline.append("skin_read", { skin: normalized });
    return normalized;
  }

  function registerPreflight(fn) {
    if (typeof fn === "function") {
      pulseTouchPreflights.push(fn);
      TouchSignals.timeline.append("preflight_registered", {
        count: pulseTouchPreflights.length
      });
    }
  }

  function snapshot() {
    const skin = read();
    const timeline = TouchSignals.timeline.load();
    return {
      skin,
      timeline,
      lastGate:
        (PulseRealm.PulseGlobalNow && PulseRealm.__PULSE_TOUCH_LAST_GATE__) || null,
      lastSecurity:
        (PulseRealm.PulseGlobalNow && PulseRealm.__PULSE_TOUCH_LAST_SECURITY__) || null
    };
  }

  function stop() {
    try {
      typeof TouchSignals.pulses.stop === "function" &&
        TouchSignals.pulses.stop();
    } catch {}
  }

  function start() {
    try {
      typeof TouchSignals.pulses.start === "function" &&
        TouchSignals.pulses.start();
    } catch {}
  }

  function reconfigure(nextOptions = {}) {
    const current = readPulseTouchInternal(defaults);
    const merged = {
      ...current,
      ...nextOptions
    };

    writePulseTouchCookie(merged);

    const normalized =
      PulseRealm.PulseTouchDetector?.normalizeSkin(merged) || merged;

    PulseRealm.__PULSE_TOUCH__ = normalized;

    TouchSignals.timeline.append("skin_reconfigured", {
      skin: normalized
    });

    try {
      const state = PulseRealm.PulseGlobalNow ? PulseRealm.__PULSE_TOUCH_PULSE_STATE__ : null;
      const lastSecurity =
        (PulseRealm.PulseGlobalNow && PulseRealm.__PULSE_TOUCH_LAST_SECURITY__) || security;
      if (state && state.started) {
        TouchSignals.pulses.applyCadence(state, {
          security: lastSecurity,
          skin: normalized
        });
      }
    } catch {}

    return normalized;
  }

  // ============================================================
  //  HOOK SURFACES
  // ============================================================
  function onPulse(fn) {
    registerHook("onPulse", fn);
  }

  function onSecurityChange(fn) {
    registerHook("onSecurityChange", fn);
  }

  function onGateDecision(fn) {
    registerHook("onGateDecision", fn);
  }

  function onTimelineEvent(fn) {
    registerHook("onTimelineEvent", fn);
  }

  function onCadenceChange(fn) {
    registerHook("onCadenceChange", fn);
  }

  function onPrediction(fn) {
    registerHook("onPrediction", fn);
  }

  function resolveCaller(stack) {
    try {
      const skin = read() || {};

      return {
        subsystem: skin.subsystem || skin.organ || "touch",
        version: skin.version || PULSE_TOUCH_VERSION || "v31",
        color: skin.color || PulseColorFallback,
        icon: skin.icon || PulseIconsFallback,

        // ⭐ v33+ metadata
        trust: skin.trust || null,
        gate: skin.gateDecision || null,
        risk: skin.securityRisk || null,
        organ: skin.organ || "touch",
        surface: skin.surface || null,

        stack
      };
    } catch {
      return {
        subsystem: "touch",
        version: PULSE_TOUCH_VERSION || "v31",
        color: PulseColorFallback,
        icon: PulseIconsFallback,

        trust: null,
        gate: null,
        risk: null,
        organ: "touch",
        surface: null,

        stack
      };
    }
  }

  // ============================================================
  //  WIRE INTO TouchMeaning SUBSTRATE
  // ============================================================
  TouchMeaning.emitImpulse = emitImpulse;
  TouchMeaning.worldEntry = worldEntry;
  TouchMeaning.handlePopState = handlePopState;
  TouchMeaning.checkExternalImpulse = checkExternalImpulse;
  TouchMeaning.interceptLinks = interceptLinks;
  PulseRealm.PulseResolveCaller = resolveCaller;

  // ============================================================
  //  RETURN SURFACE
  // ============================================================
  return {
    update:          updatePulseTouchField,
    read,
    registerPreflight,
    snapshot,
    stop,
    start,
    reconfigure,
    onPulse,
    onSecurityChange,
    onGateDecision,
    onTimelineEvent,
    onCadenceChange,
    onPrediction,
    resolveCaller,
    emitImpulse,
    worldEntry,

    // explicit meta surface so band/coord/profile/chunkProfile/version
    // are visible to callers
    meta: {
      band:         defaults.band,
      coord:        defaults.coord,
      profile:      defaults.profile,
      chunkProfile: defaults.chunkProfile,
      mode:         defaults.mode,
      presence:     defaults.presence,
      version:      defaults.version,
      isMobile:     defaults.isMobile,
      region:       defaults.region,
      page:         defaults.page
    },

    onImpulse(fn) {
      registerHook("onImpulse", fn);
    },
    onWorldEntry(fn) {
      registerHook("onWorldEntry", fn);
    },
    onWorldRestore(fn) {
      registerHook("onWorldRestore", fn);
    }
  };
}


function writePulseTouchCookie(state = {}) {
  // ⭐ PAGE IS NOW FIRST-CLASS
  const page     = state.page     || state.file || PulseRealm.__PULSE_CURRENT_PAGE__ || "PulseWorldReality";
  const coord    = state.coord    || "W0.P0.R0.S0.SH0.PORTAL";
  const mode     = state.mode     || "";
  const presence = state.presence || "";
  const band     = state.band     || "binary";
  const isMobile = state.isMobile || PulseRealm.PulseTouchMobile;

  // ⭐ Boot rules
  if (PulseRealm.booted === 1) {
    PulseRealm.bootVideo = 1;
    PulseRealm.bootWorld = 1;
  }

  const now = PulseRealm.PulseNOW;

  // ============================================================
  // ⭐ LOAD EXISTING PASSPORT OR CREATE NEW ONE
  // ============================================================
  let passport = readPulseTouchPassport() || {
    v: "35-TRUST-LAYER",
    instance:
      (crypto.randomUUID()) ||
      ("inst_" + now + "_" + Math.random().toString(16).slice(2)),
    trust: "baseline",
    continuity: "",
    lastSeen: now,
    signature: btoa(String(now)).slice(0, 32)
  };

  // ============================================================
  // ⭐ UPGRADED PASSPORT WITH PAGE + FULL CONTINUITY
  // ============================================================
  passport = {
    ...passport,
    lastSeen: now,

    // ⭐ NEW — persist page
    page,

    coord,
    mode,
    presence,
    band,
    isMobile,
    // ⭐ Always store PulseGlobal snapshot
    PulseGlobal: PulseRealm.PulseGlobalNow
  };

  // ============================================================
  // ⭐ WRITE PASSPORT (centralized encoding)
  // ============================================================
  writePulseTouchPassport(passport);

  // ============================================================
  // ⭐ CONTINUITY LOGGING
  // ============================================================
  try {
    recordPulseTouchContinuity("cookie_write_v35");
  } catch {}

  try {
    TouchSignals.timeline.append("cookie_write_v35", {
      page,
      coord,
      band,
      isMobile
    });
  } catch {}
}


function readPulseTouchInternal(defaults = {}) {
  const passport = readPulseTouchPassport();

  // ============================================================
  // ⭐ NO PASSPORT → RETURN DEFAULTS (WITH PAGE)
  // ============================================================
  if (!passport) {
    try {
      recordPulseTouchContinuity("touch_read_default_v35");
    } catch {}

    return {
      version:   defaults.version  || "v35",
      page:      defaults.page     || "PulseWorldReality",
      coord:     defaults.coord    || "W0.P0.R0.S0.SH0.PORTAL",
      mode:      defaults.mode     || "",
      presence:  defaults.presence || "",
      band:      defaults.band     || "binary",
      isMobile:  defaults.isMobile || PulseRealm.PulseTouchMobile,
      ts:        null,
      intel:     null,
      identity:  defaults.identity || {},
      displayName:  defaults.identity?.displayName || defaults?.displayName,
      PulseGlobal: PulseRealm.PulseGlobalNow
    };
  }

  // ============================================================
  // ⭐ PASSPORT EXISTS → RESTORE STATE
  // ============================================================
  try {
    // Restore PulseGlobal
    if (passport.PulseGlobal && typeof passport.PulseGlobal === "object") {
      PulseRealm.PulseGlobalNow = passport.PulseGlobal;

      if (PulseRealm.booted === 1) {
        PulseRealm.bootVideo = 1;
        PulseRealm.bootWorld = 1;
      }
    }

    try {
      recordPulseTouchContinuity("touch_read_passport_v35");
    } catch {}

    // ============================================================
    // ⭐ RETURN FULL TOUCH OBJECT (NOW WITH PAGE)
    // ============================================================
    return {
      version:     passport.v        || defaults.version  || "v35",
      page:        passport.page     || defaults.page     || "PulseWorldReality",
      coord:       passport.coord    || defaults.coord    || "W0.P0.R0.S0.SH0.PORTAL",
      mode:        passport.mode     || defaults.mode,
      presence:    passport.presence || defaults.presence,
      band:        passport.band     || defaults.band     || "binary",
      isMobile:    passport.isMobile || defaults.isMobile || PulseRealm.PulseTouchMobile,
      ts:          passport.lastSeen ? Number(passport.lastSeen) : null,
      intel:       passport.signature || null,

      identity:  defaults.identity || {},
      displayName:  defaults.identity?.displayName ?? defaults?.displayName,
      PulseGlobal: passport.PulseGlobal || PulseRealm.PulseGlobalNow,

      booted:      PulseRealm.booted     ?? null,
      bootVideo:   PulseRealm.bootVideo  ?? null,
      bootWorld:   PulseRealm.bootWorld  ?? null
    };

  } catch {
    // ============================================================
    // ⭐ ERROR → RETURN DEFAULTS SAFELY
    // ============================================================
    PulseRealm.PulseGlobalNow = PulseRealm.PulseGlobalNow || {};

    try {
      recordPulseTouchContinuity("touch_read_error_v35");
    } catch {}

    return {
      ...defaults,
      page: defaults.page || "PulseWorldReality",
      PulseGlobal: PulseRealm.PulseGlobalNow,
      
      // ⭐ EXACT SAME FALLBACK PATTERN AS EVERYTHING ELSE
      identity:     defaults.identity     || {},
      displayName:  defaults.identity?.displayName || defaults?.displayName,
    };
  }
}

function runPreflights(worldState) {
  if (!pulseTouchPreflights.length) return;

  // continuity: record that preflights started
  try {
    recordPulseTouchContinuity("preflight_start_v35");
  } catch {}

  for (const fn of pulseTouchPreflights) {
    try {
      const result = fn(worldState);

      if (result && typeof result.then === "function") {
        result.catch(() => {});
      }

      // continuity: record each preflight execution
      try {
        recordPulseTouchContinuity("preflight_ok_v35");
      } catch {}

    } catch {
      // continuity: record failure
      try {
        recordPulseTouchContinuity("preflight_error_v35");
      } catch {}

      // timeline logging
      try {
        TouchSignals.timeline.append("preflight_error_v35", {
          intel: "v35_preflight"
        });
      } catch {
        appendTouchTimeline("preflight_error_v35", {
          intel: "v35_preflight"
        });
      }
    }
  }

  try {
    recordPulseTouchContinuity("preflight_end_v35");
  } catch {}
}

// IMMORTAL v40 — TriHash (string → 3-field hash)
function computeTriHash(input) {
  const str = String(input ?? "");

  let h1 = 0x811c9dc5; // FNV-ish seeds
  let h2 = 0x9e3779b1;
  let h3 = 0x85ebca6b;

  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);

    h1 ^= ch;
    h1 = (h1 * 0x01000193) >>> 0;

    h2 ^= ch * 0x45d9f3b;
    h2 = ((h2 << 13) | (h2 >>> 19)) >>> 0;

    h3 ^= ch * 0x27d4eb2f;
    h3 = ((h3 << 7) | (h3 >>> 25)) >>> 0;
  }

  // fold down a bit so it's shorter but still strong enough
  const p1 = (h1 ^ (h2 >>> 1) ^ (h3 >>> 2)) >>> 0;
  const p2 = (h2 ^ (h3 >>> 1) ^ (h1 >>> 2)) >>> 0;
  const p3 = (h3 ^ (h1 >>> 1) ^ (h2 >>> 2)) >>> 0;

  // return as compact hex segments
  return [
    p1.toString(16).padStart(8, "0"),
    p2.toString(16).padStart(8, "0"),
    p3.toString(16).padStart(8, "0")
  ].join("-");
}


function applyGateDecision(gateDecision, worldState) {
  if (!gateDecision) return;

  // ------------------------------------------------------------
  // 1) Record continuity
  // ------------------------------------------------------------
  try {
    recordPulseTouchContinuity("gate_decision", {
      mode: gateDecision.mode || "unknown",
      refresh: !!gateDecision.refresh,
      fallback: !!gateDecision.fallback,
      impulse: gateDecision.impulse || null,
      worldStateHash: computeTriHash(JSON.stringify(worldState || {}))
    });
  } catch {}

  // ------------------------------------------------------------
  // 2) Timeline event
  // ------------------------------------------------------------
  try {
    TouchSignals.timeline.append("gate_apply_v40", {
      gateDecision,
      worldState,
      intel: "v40_gate"
    });
  } catch {
    appendTouchTimeline("gate_apply_v40", {
      gateDecision,
      worldState,
      intel: "v40_gate"
    });
  }

  // ------------------------------------------------------------
  // 3) Refresh logic
  // ------------------------------------------------------------
  if (gateDecision.refresh === true) {
  try {
    PulseRealm.__PULSE_TOUCH_LAST_GATE__ = {
      ts: PulseRealm.PulseNOW,
      decision: gateDecision,
      worldState
    };

    // Browser-only guard
    const isBrowser =
      typeof window !== "undefined" &&
      typeof location !== "undefined";

    if (isBrowser) {
      if (gateDecision.impulse) {
        location.search = `${gateDecision.impulse}`;
        return;
      }

      location.search = "";
    }
  } catch {
    try {
      TouchSignals.timeline.append("gate_refresh_failed_v40", {
        intel: "v40_gate"
      });
    } catch {
      appendTouchTimeline("gate_refresh_failed_v40", {
        intel: "v40_gate"
      });
    }
  }
}


  // ------------------------------------------------------------
  // 4) Fallback logic
  // ------------------------------------------------------------
  if (gateDecision.fallback === true && gateDecision.fallbackUrl) {
    try {
      try {
        TouchSignals.timeline.append("gate_fallback_redirect_v40", {
          url: gateDecision.fallbackUrl,
          intel: "v40_gate"
        });
      } catch {
        appendTouchTimeline("gate_fallback_redirect_v40", {
          url: gateDecision.fallbackUrl,
          intel: "v40_gate"
        });
      }

      // Browser-only guard
      const isBrowser =
        typeof window !== "undefined" &&
        typeof location !== "undefined";

      if (isBrowser) {
        location.replace(gateDecision.fallbackUrl);
      }
    } catch {
      try {
        TouchSignals.timeline.append("gate_fallback_failed_v40", {
          url: gateDecision.fallbackUrl,
          intel: "v40_gate"
        });
      } catch {
        appendTouchTimeline("gate_fallback_failed_v40", {
          url: gateDecision.fallbackUrl,
          intel: "v40_gate"
        });
      }
    }
  }

}

function maintainPulseTouchPassport() {
  const passport = refreshPulseTouchPassport();
  pulseTouchCrossTabSync({ trust: passport.trust });
  return passport;
}

(async function autoIgnitePulseTouchV33() {
  
  maintainPulseTouchPassport();

  // HARD GUARDS: only main document, only once, never on image docs
  try {
    
      const ct = document.contentType || "";
      // if this is an image (or similar asset) document, do not ignite
      if (ct.startsWith("image/") || ct === "application/octet-stream") {
        return;
      }
    
  } catch {
  }

  try {
    // ============================================================
    // PHASE 1: Binary + storage substrate
    // ============================================================
    const PulseBinary = {
      encode(value) {
        return PulseBinary._encodeValue(value).buffer;
      },
      decode(buffer) {
        if (buffer instanceof ArrayBuffer) {
          // ok
        } else if (ArrayBuffer.isView(buffer)) {
          buffer = buffer.buffer;
        } else {
          throw new Error(
            `[PulseBinary v33] decode expected ArrayBuffer or TypedArray, got: ${
              Object.prototype.toString.call(buffer)
            }`
          );
        }
        const view = new DataView(buffer);
        return PulseBinary._decodeValue(view, 0).value;
      },
      _encodeValue(value) {
        if (value === null) return new Uint8Array([0]);

        if (typeof value === "number") {
          const buf =  new ArrayBuffer(9);
          const view = new DataView(buf);
          view.setUint8(0, 1);
          view.setFloat64(1, value);
          return new Uint8Array(buf);
        }

        if (typeof value === "boolean") {
          return new Uint8Array([value ? 2 : 3]);
        }

        if (Array.isArray(value)) {
          const parts = value.map((v) => PulseBinary._encodeValue(v));
          const total = parts.reduce((a, p) => a + p.length, 0);
          const out = new Uint8Array(2 + total);
          out[0] = 4;
          out[1] = parts.length;
          let offset = 2;
          for (const p of parts) {
            out.set(p, offset);
            offset += p.length;
          }
          return out;
        }

        if (typeof value === "object") {
          const keys = Object.keys(value);
          const encoded = [];
          let total = 2;
          for (const k of keys) {
            const keyBytes = new TextEncoder().encode(k);
            const valBytes = PulseBinary._encodeValue(value[k]);
            encoded.push({ keyBytes, valBytes });
            total += 1 + keyBytes.length + valBytes.length;
          }
          const out = new Uint8Array(total);
          out[0] = 5;
          out[1] = keys.length;
          let offset = 2;

          for (const { keyBytes, valBytes } of encoded) {
            out[offset++] = keyBytes.length;
            out.set(keyBytes, offset);
            offset += keyBytes.length;
            out.set(valBytes, offset);
            offset += valBytes.length;
          }
          return out;
        }

        throw new Error("Unsupported type in PulseBinary v33");
      },
      _decodeValue(view, offset) {
        const type = view.getUint8(offset);

        if (type === 0) return { value: null, offset: offset + 1 };

        if (type === 1) {
          const num = view.getFloat64(offset + 1);
          return { value: num, offset: offset + 9 };
        }

        if (type === 2) return { value: true, offset: offset + 1 };
        if (type === 3) return { value: false, offset: offset + 1 };

        if (type === 4) {
          const length = view.getUint8(offset + 1);
          let cursor = offset + 2;
          const arr = [];
          for (let i = 0; i < length; i++) {
            const decoded = PulseBinary._decodeValue(view, cursor);
            arr.push(decoded.value);
            cursor = decoded.offset;
          }
          return { value: arr, offset: cursor };
        }

        if (type === 5) {
          const length = view.getUint8(offset + 1);
          let cursor = offset + 2;
          const obj = {};
          for (let i = 0; i < length; i++) {
            const keyLen = view.getUint8(cursor++);
            const keyBytes = new Uint8Array(view.buffer, cursor, keyLen);
            const key = new TextDecoder().decode(keyBytes);
            cursor += keyLen;

            const decoded = PulseBinary._decodeValue(view, cursor);
            obj[key] = decoded.value;
            cursor = decoded.offset;
          }
          return { value: obj, offset: cursor };
        }

        throw new Error(`Unknown PulseBinary type v33: ${type}`);
      }
    };

    // UPGRADE: keep this lazy – only install if not already present
    PulseRealm.PulseBinary = PulseRealm.PulseBinary || PulseBinary;

    const GDB = (function installGlobalIndexedDBMirror(
      dbName = "PulseTouchDB",
      storeName = "GStoreV33",
      prefix = "__G33__"
    ) {
      const SKIP = new Set([
        "PulseWorldFirebaseShadow",
        "PulseDetector",
        "PulseTouchDetector",
        "PULSE-PROOF-LOGGER",
        "PULSE-PROOF-ERRORS",
        "PULSE-PROOF-MONITOR",
        "PULSE-PROOF-FLOW",
        "PULSE-PROOF-SHADOW",
        "PULSE-PROTOCOL-PORT",
        "PULSE-PROTOCOL-SIGNAL",
        "PULSE-PROTOCOL-PULSE",
        "PULSE-TOUCH-DETECTOR",
        "__PULSE_TOUCH__"
      ]);

      let dbPromise = null;

      function openDB() {
        if (dbPromise) return dbPromise;

        dbPromise = new Promise((resolve) => {
          let req;
          try {
            req = indexedDB.open(dbName, 1);
          } catch {
            return resolve(null);
          }

          req.onupgradeneeded = function (evt) {
            const db = evt.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName);
            }
          };

          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });

        return dbPromise;
      }

      async function idbGet(key) {
        const db = await openDB();
        if (!db) return null;

        try {
          const tx = db.transaction(storeName, "readonly");
          const store = tx.objectStore(storeName);

          return await new Promise((resolve) => {
            const req = store.get(key);

            req.onsuccess = () => {
              const val = req.result;
              if (!val) return resolve(null);
              try {
                resolve(PulseBinary.decode(val));
              } catch {
                resolve(null);
              }
            };

            req.onerror = () => resolve(null);
          });

        } catch (err) {
          // THIS catches the NotFoundError
          console.warn("IDB: Object store missing →", storeName, err);
          return null;
        }
      }


      async function idbSet(key, value) {
        const db = await openDB();
        if (!db) return;

        return await new Promise((resolve) => {
          let encoded;
          try {
            encoded = PulseBinary.encode(value);
          } catch {
            return resolve(false);
          }

          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const req = store.put(encoded, key);

          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        });
      }

      async function idbDelete(key) {
        const db = await openDB();
        if (!db) return;

        return await new Promise((resolve) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const req = store.delete(key);

          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        });
      }

      const mirror = new Proxy(
        {},
        {
          get(_, prop) {
            const key = prefix + String(prop);

            // fire-and-forget hydration; never blocks ignite
            idbGet(key).then((val) => {
              if (val != null) {
                mirror[prop] = val;
              }
            });

            return undefined;
          },

          set(_, prop, value) {
            if (SKIP.has(prop)) return true;
            if (typeof value === "function") return true;

            idbSet(prefix + String(prop), value);
            return true;
          },

          deleteProperty(_, prop) {
            idbDelete(prefix + String(prop));
            return true;
          }
        }
      );

      PulseRealm.IgniteDB = PulseRealm.IgniteDB || mirror;
      return mirror;
    })();

    // ============================================================
    // PHASE 2: already-ignited short-circuit
    // ============================================================
    if (PulseRealm.__PULSE_TOUCH__ || PulseRealm.__PULSE_TOUCH__) {
      try {
        const TouchSignal =
          typeof PulseRealm.PulseSignalPort === "function"
            ? PulseRealm.PulseSignalPort.emit("TOUCH_ALREADY_IGNITED_V33")
            : null;

        TouchSignal({
          band: "symbolic",
          lane: 0,
          source: "touch_auto_ignite_v33",
          event: "already_ignited"
        });

        try {
         
            TouchSignals.timeline.append("touch_already_ignited_v33", {
              band: "symbolic"
            });
        } catch {}
      } catch (_) {}
      return;
    }

    // ============================================================
    // PHASE 3: trust passport + world state (cookie → touchState)
    // ============================================================
    let passport = null;
    try {
      passport = refreshPulseTouchPassport() || null;
      try {
        
          TouchSignals.timeline.append("passport_ignite_refreshed_v33", {
            passport
          });
      } catch {}
    } catch {}

    let touchState = {
      page: "PulseWorldReality",
      coord: "W0.P0.R0.S0.SH0.PORTAL",
      band: "symbolic"
    };

    try {
      if (typeof readPulseTouchInternal === "function") {
        const fromCookie = readPulseTouchInternal(touchState) || {};
        touchState = {
          page: fromCookie.page || touchState.page,
          coord: fromCookie.coord || touchState.coord,
          band: fromCookie.band || touchState.band
        };
      }
    } catch {
      // fall back to defaults silently
    }

    const page = touchState.page || "PulseWorldReality";
    const band = touchState.band || "symbolic";
    const coord = touchState.coord || "W0.P0.R0.S0.SH0.PORTAL";

    // ============================================================
    // PHASE 4: touch creation (aligned with v33 createPulseTouch)
    // ============================================================
    const touch = createPulseTouch({
      page: page,                 // current page context (DOM or virtual)
      mode: "fast",               // fast-mode execution
      presence: "active",         // active presence state
      chunkProfile: "default",    // chunking profile (v33 default)
      band: band,                 // band-mode (primary / secondary / unified)
      profile: "v33",             // PulseChunks v33 profile
      coord: coord                // full coordinate object { x, y, z, world, region }
    });

    touch.band = band;
    touch.page = page;
    touch.coord = coord;


    PulseRealm.__PULSE_TOUCH__ = touch;

    // mark as ignited now that we have a live touch
    try {

        PulseRealm.__PULSE_TOUCH_AUTO_IGNITED__ = true;
      
    } catch {}

    // ============================================================
    // PHASE 5: impulse + logs
    // ============================================================
    try {
      const skin = touch.read() || {};
      const lastLoc = skin.loc || null;

      const initialImpulse =
        lastLoc && typeof lastLoc === "string" ? lastLoc : page;

      touch.emitImpulse(initialImpulse, {
        source: "cookie_initiator_v33"
      });

      try {
        
          TouchSignals.timeline.append("touch_cookie_ignite_v33", {
            initialImpulse,
            page,
            coord,
            band
          });
      } catch {}

      log(
        "%c[PulseWorldTouch] %cCookie-Driven Ignite →",
        "color:#90CAF9; font-weight:bold; font-family:monospace;",
        "color:#FFD700; font-family:monospace;",
        initialImpulse
      );
    } catch (err) {
      try {
       
          TouchSignals.timeline.append("touch_cookie_ignite_failed_v33", {
            error: String(err)
          });
      } catch {}
      console.error("⟡ PULSE MULTIVERSAL TOUCH v33.0 — [PulseWorldTouch] Cookie-Driven Ignite Failed →", err);
    }

    // ============================================================
    // PHASE 6: bootstrap signal
    // ============================================================
    try {
      const TouchBootstrapSignal =
        typeof PulseRealm.PulseSignalPort === "function"
          ? PulseRealm.PulseSignalPort.emit("TOUCH_BOOTSTRAP_V33")
          : null;

      TouchBootstrapSignal?.({
        band,
        lane: 0,
        source: "touch_auto_ignite_v33",
        event: "bootstrap",
        page,
        coord
      });

      log(
      "%c[PulseWorldTouch] %c Touch BootStrap Signal Complete!",
      "color:#90CAF9; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );

      try {
        
          TouchSignals.timeline.append("touch_bootstrap_v33", {
            band,
            page,
            coord
          });
      } catch {}
    } catch (err) {
      try {
        
          TouchSignals.timeline.append("touch_bootstrap_signal_failed_v33", {
            error: String(err)
          });
      } catch {}
      console.error("⟡ PULSE MULTIVERSAL TOUCH v33.0 — [PulseWorldTouch] Bootstrap Signal FAILED →", err);
    }

    // ============================================================
    // PHASE 7: presence signal
    // ============================================================
    try {
      const TouchPresenceSignal =
        typeof PulseRealm.PulseSignalPort === "function"
          ? PulseRealm.PulseSignalPort.emit("TOUCH_PRESENCE_V33")
          : null;

      TouchPresenceSignal?.({
        band,
        lane: 0,
        source: "touch_auto_ignite_v33",
        event: "presence",
        page,
        mode: touch.mode,
        presence: touch.presence,
        coord
      });

      log(
      "%c[PulseWorldTouch] %c Touch Presence Signal Complete!",
      "color:#90CAF9; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );

      try {
        
          TouchSignals.timeline.append("touch_presence_v33", {
            band,
            page,
            coord,
            mode: touch.mode,
            presence: touch.presence
          });
      } catch {}
    } catch (err) {
      try {
        
          TouchSignals.timeline.append("touch_presence_signal_failed_v33", {
            error: String(err)
          });
      } catch {}
      console.error("⟡ PULSE MULTIVERSAL TOUCH v33.0 — [PulseWorldTouch] Presence Signal FAILED →", err);
    }

    // ============================================================
    // PHASE 8: completion log
    // ============================================================
    try {
      
        TouchSignals.timeline.append("touch_auto_ignite_complete_v33", {
          band,
          page,
          coord
        });
    } catch {}

    log(
      "%c[PulseWorldTouch] %cAuto-Ignite Complete (World-based, Impulse-aware, One-band Membrane, Flow-shaped, Trust-layer Aligned).",
      "color:#90CAF9; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
    log(
      "%c[PulseWorldTouch] %cYour Pulse World has Presence + Trust w/ Authority!",
      "color:#90CAF9; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;"
    );
  } catch (err) {
    try {
      
        TouchSignals.timeline.append("touch_auto_ignite_failed_v33", {
          error: String(err)
        });
    } catch {}
    console.error("⟡ PULSE MULTIVERSAL TOUCH v33.0 — [PulseWorldTouch] Auto-Ignite Failed", err);
  }
})();

PulseRealm.TouchSignals = TouchSignals;
PulseRealm.PulseTouchSignals = TouchSignals;
PulseRealm.TouchMeaning = TouchMeaning;
PulseRealm.PulseTouchMeaning = TouchMeaning;
PulseRealm.PulseTouchHooks = pulseTouchHooks;
PulseRealm.PulseHooks = pulseTouchHooks;

PulseRealm.PulseTouchRead = readPulseTouchInternal;

PulseRealm.__PULSE_TOUCH__ = {
  version: PULSE_TOUCH_VERSION,
  band: "dualband",
  mode: "neutral",
  region: "unknown",
  chunkProfile: "default",
  page: "unknown",
  presence: "unknown",
  intel: null,
  onDetectorUpdate: onDetectorUpdate,
};

function onDetectorUpdate(norm) {
  try {
    // -------------------------------------------------------------
    // 1. Update Touch Organism State
    // -------------------------------------------------------------
    if (norm.page) {
      PulseRealm.__PULSE_TOUCH__.page = norm.page;
    }

    if (norm.mode) {
      PulseRealm.__PULSE_TOUCH__.mode = norm.mode;
    }

    if (norm.band) {
      PulseRealm.__PULSE_TOUCH__.band = norm.band;
    }

    if (norm.chunkProfile) {
      PulseRealm.__PULSE_TOUCH__.chunkProfile = norm.chunkProfile;
    }

    if (norm.presence) {
      PulseRealm.__PULSE_TOUCH__.presence = norm.presence;
    }

    if (norm.intel) {
      PulseRealm.__PULSE_TOUCH__.intel = norm.intel;
    }
    PulseRealm.__PULSE_TOUCH__.version = PULSE_TOUCH_VERSION;
    // -------------------------------------------------------------
    // 2. Build deterministic organism context
    // -------------------------------------------------------------
    const ORGANISM_CONTEXT = Object.freeze({
      layer: "touch",
      role: "pulse-touch",
      version: PULSE_TOUCH_VERSION,
      lineage: "pulse-touch-organism-v30-IMMORTAL+++",
      evo: {
        version: PULSE_TOUCH_VERSION,
        band: PulseRealm.__PULSE_TOUCH__.band,
        region: PulseRealm.__PULSE_TOUCH__.region,
        mode: PulseRealm.__PULSE_TOUCH__.mode,
        chunkProfile: PulseRealm.__PULSE_TOUCH__.chunkProfile,
        page: PulseRealm.__PULSE_TOUCH__.page,
        presence: PulseRealm.__PULSE_TOUCH__.presence,
        intel: PulseRealm.__PULSE_TOUCH__.intel
      }
    });

    PulseRealm.OrganismContext = ORGANISM_CONTEXT;

    // -------------------------------------------------------------
    // 3. Emit unified-band signal (if present)
    // -------------------------------------------------------------
    if (PulseRealm.PulseUnderstandingSignalPort) {
      PulseRealm.PulseUnderstandingSignalPort.emit("PULSE_TOUCH_UPDATED", {
        ok: true,
        context: ORGANISM_CONTEXT,
        event: norm,
        ts: PulseRealm.PulseNOW
      });
    }

    return ORGANISM_CONTEXT;

  } catch (err) {
    if (PulseRealm.PulseUnderstandingSignalPort) {
      PulseRealm.PulseUnderstandingSignalPort.emit("PULSE_TOUCH_UPDATED", {
        ok: false,
        error: String(err),
        event: norm,
        ts: PulseRealm.PulseNOW
      });
    }

    return {
      ok: false,
      error: String(err),
      event: norm
    };
  }
};

// ============================================================
//  FOOTER — CONTINUOUS CONTACT LORE (ONE BAND, ONE PULSE)
// ============================================================
//
//  Pulse‑Touch used to scan the whole organism map.
//  Then it tried to prewarm every cortex and every portal.
//  Now it listens to a single band, a single pulse.
//
//  Every few hundred milliseconds, one clean signal leaves the skin,
//  crosses the membrane, and taps on Pulse‑Net’s door:
//
//      “Still here. Still watching. Still ready.”
//
//  Somewhere on the other side of the glass, an immortal
//  organism rearranges itself a little faster, just for you.
//  With enough time, its timing stops feeling like a reaction
//  and starts feeling like a prediction.
//
//  In v30+, the map is just a map.
//  The signal is the only truth.
//
// ============================================================