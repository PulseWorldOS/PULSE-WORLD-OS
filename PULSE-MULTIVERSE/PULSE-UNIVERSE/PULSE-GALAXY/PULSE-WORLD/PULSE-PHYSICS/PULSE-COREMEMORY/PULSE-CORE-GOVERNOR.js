// ============================================================================
//  PULSE-CORE-GOVERNOR.js — v40-IMMORTAL-BINARY-GOVERNOR
//  ONE GOVERNOR • ONE SPINE • MANY ORGANS • ZERO DRIFT
//  Binary-first DB • IndexedDB/local/session/text fallback • Device/Wave-aware
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseCoreMemory, createPulseCoreMemory, createPulseCoreSpeech} from "./PULSE-CORE-MEMORY.js";
export const PulseCoreGMemory = PulseCoreMemory;

// ============================================================================
//  GOVERNOR EPOCH / PRESSURE GAUGES
// ============================================================================

let GOVERNOR_EPOCH = 0;
function nextGovernorEpoch() {
  GOVERNOR_EPOCH += 1;
  return GOVERNOR_EPOCH;
}

function createPressureGauge({ windowSize = 64 } = {}) {
  const samples = new Array(windowSize).fill(0);
  let idx = 0;
  let count = 0;

  function record(value) {
    samples[idx] = value;
    idx = (idx + 1) % windowSize;
    if (count < windowSize) count++;
  }

  function avg() {
    if (!count) return 0;
    let sum = 0;
    for (let i = 0; i < count; i++) sum += samples[i];
    return sum / count;
  }

  return { record, avg };
}

// ============================================================================
//  DEVICE / WAVE CONTEXT HELPERS (no network IO, just environment hints)
// ============================================================================

function getSafeNavigator() {
  try {
    return typeof navigator !== "undefined" ? navigator : null;
  } catch {
    return null;
  }
}

function getSafeConnection() {
  const nav = getSafeNavigator();
  try {
    return nav && nav.connection ? nav.connection : null;
  } catch {
    return null;
  }
}

function buildDeviceContext() {
  const profile = PulseRealm.PULSE_DEVICE_PROFILE || null;
  const nav = getSafeNavigator();
  const conn = getSafeConnection();

  const ua = (nav && nav.userAgent) || null;
  const downlink = (conn && conn.downlink) || null;
  const effectiveType = (conn && conn.effectiveType) || null;
  const rtt = (conn && conn.rtt) || null;

  return {
    profileTier: profile && profile.capabilityTier ? profile.capabilityTier : null,
    profileScore: profile && profile.capabilityScore ? profile.capabilityScore : null,
    gpuScore: profile && profile.gpuScore ? profile.gpuScore : null,
    bandwidthMbps: profile && profile.bandwidthMbps ? profile.bandwidthMbps : downlink,
    stabilityScore: profile && profile.stabilityScore ? profile.stabilityScore : null,
    userAgent: ua,
    netEffectiveType: effectiveType,
    netRttMs: rtt
  };
}

function normalizeWaveFromConnection() {
  const conn = getSafeConnection();
  if (!conn || !conn.effectiveType) {
    return { wave: "unknown", band: "PulseBand" };
  }
  const t = conn.effectiveType;
  if (t === "slow-2g" || t === "2g") return { wave: "2g", band: "PulseBand" };
  if (t === "3g") return { wave: "3g", band: "PulseBand" };
  if (t === "4g") return { wave: "4g", band: "PulseBand" };
  return { wave: "unknown", band: "PulseBand" };
}

function buildWaveContextHint() {
  const fromConn = normalizeWaveFromConnection();
  const profile = PulseRealm.PULSE_DEVICE_PROFILE || null;
  const explicitWave = profile && profile.primaryWave ? profile.primaryWave : null;

  return {
    primaryWave: explicitWave || fromConn.wave || "unknown",
    band: "PulseBand"
  };
}

// ============================================================================
//  BINARY DB ROUTER — Binary-first, IndexedDB/local/session/text fallback
// ============================================================================

function createBinaryDBRouter({ Memory, log, warn }) {
  const ROUTE_DB = "__PULSE_BINARY_DB__";

  function safeLog(stage, details = {}) {
    try {
      log("💾 PULSE CORE MEMORY v40 - [PulseCoreGovernor-v40:BinaryDB]", stage, JSON.stringify(details));
    } catch {}
  }

  function encodeValue(value) {
    try {
      // Binary-first: store as Uint8Array where possible
      if (value instanceof Uint8Array) return value;
      if (value instanceof ArrayBuffer) return new Uint8Array(value);
      if (typeof value === "string") {
        const enc = new TextEncoder();
        return enc.encode(value);
      }
      const json = JSON.stringify(value ?? null);
      const enc = new TextEncoder();
      return enc.encode(json);
    } catch (err) {
      safeLog("ENCODE_ERROR", { error: String(err) });
      return new Uint8Array(0);
    }
  }

  function decodeValue(bytes) {
    try {
      if (!(bytes instanceof Uint8Array)) return null;
      const dec = new TextDecoder();
      const text = dec.decode(bytes);
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (err) {
      safeLog("DECODE_ERROR", { error: String(err) });
      return null;
    }
  }

  // In-memory binary cache via CoreMemory
  function setInCore(routeKey, key, bytes) {
    const route = `${ROUTE_DB}:${routeKey}`;
    Memory.set(route, key, bytes);
  }

  function getFromCore(routeKey, key) {
    const route = `${ROUTE_DB}:${routeKey}`;
    return Memory.get(route, key);
  }

  // IndexedDB fallback (best-effort, never throws)
  function setIndexedDB(routeKey, key, bytes) {
    try {
      if (typeof indexedDB === "undefined") return;
      const request = indexedDB.open("PulseBinaryDB", 1);
      request.onupgradeneeded = (ev) => {
        const db = ev.target.result;
        if (!db.objectStoreNames.contains("binary")) {
          db.createObjectStore("binary");
        }
      };
      request.onsuccess = (ev) => {
        const db = ev.target.result;
        const tx = db.transaction("binary", "readwrite");
        const store = tx.objectStore("binary");
        const compositeKey = `${routeKey}::${key}`;
        store.put(bytes, compositeKey);
      };
    } catch (err) {
      safeLog("INDEXEDDB_SET_ERROR", { error: String(err) });
    }
  }

  function getIndexedDB(routeKey, key, cb) {
    try {
      if (typeof indexedDB === "undefined") {
        cb(null);
        return;
      }
      const request = indexedDB.open("PulseBinaryDB", 1);
      request.onupgradeneeded = (ev) => {
        const db = ev.target.result;
        if (!db.objectStoreNames.contains("binary")) {
          db.createObjectStore("binary");
        }
      };
      request.onsuccess = (ev) => {
        const db = ev.target.result;
        const tx = db.transaction("binary", "readonly");
        const store = tx.objectStore("binary");
        const compositeKey = `${routeKey}::${key}`;
        const getReq = store.get(compositeKey);
        getReq.onsuccess = () => cb(getReq.result || null);
        getReq.onerror = () => cb(null);
      };
      request.onerror = () => cb(null);
    } catch (err) {
      safeLog("INDEXEDDB_GET_ERROR", { error: String(err) });
      cb(null);
    }
  }

  // localStorage / sessionStorage fallback
  function setLocalStorage(routeKey, key, bytes) {
    try {
      if (typeof localStorage === "undefined") return;
      const compositeKey = `PULSE_BINARY_DB::${routeKey}::${key}`;
      const base64 = btoa(String.fromCharCode(...bytes));
      localStorage.setItem(compositeKey, base64);
    } catch (err) {
      safeLog("LOCALSTORAGE_SET_ERROR", { error: String(err) });
    }
  }

  function getLocalStorage(routeKey, key) {
    try {
      if (typeof localStorage === "undefined") return null;
      const compositeKey = `PULSE_BINARY_DB::${routeKey}::${key}`;
      const base64 = localStorage.getItem(compositeKey);
      if (!base64) return null;
      const bin = atob(base64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    } catch (err) {
      safeLog("LOCALSTORAGE_GET_ERROR", { error: String(err) });
      return null;
    }
  }

  function setSessionStorage(routeKey, key, bytes) {
    try {
      if (typeof sessionStorage === "undefined") return;
      const compositeKey = `PULSE_BINARY_DB::${routeKey}::${key}`;
      const base64 = btoa(String.fromCharCode(...bytes));
      sessionStorage.setItem(compositeKey, base64);
    } catch (err) {
      safeLog("SESSIONSTORAGE_SET_ERROR", { error: String(err) });
    }
  }

  function getSessionStorage(routeKey, key) {
    try {
      if (typeof sessionStorage === "undefined") return null;
      const compositeKey = `PULSE_BINARY_DB::${routeKey}::${key}`;
      const base64 = sessionStorage.getItem(compositeKey);
      if (!base64) return null;
      const bin = atob(base64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    } catch (err) {
      safeLog("SESSIONSTORAGE_GET_ERROR", { error: String(err) });
      return null;
    }
  }

  // Text fallback (diagnostic only)
  function textFallback(routeKey, key, bytes) {
    try {
      const preview = bytes.slice(0, 32);
      safeLog("TEXT_FALLBACK", {
        routeKey,
        key,
        bytesPreview: Array.from(preview)
      });
    } catch {}
  }

  function put(routeKey, key, value) {
    const bytes = encodeValue(value);

    // 1) CoreMemory (binary)
    setInCore(routeKey, key, bytes);

    // 2) IndexedDB (best-effort)
    setIndexedDB(routeKey, key, bytes);

    // 3) localStorage + sessionStorage (best-effort)
    setLocalStorage(routeKey, key, bytes);
    setSessionStorage(routeKey, key, bytes);

    // 4) text fallback (diagnostic only)
    textFallback(routeKey, key, bytes);

    return bytes.length;
  }

  function get(routeKey, key, cb) {
    // 1) CoreMemory
    const coreBytes = getFromCore(routeKey, key);
    if (coreBytes instanceof Uint8Array) {
      cb(decodeValue(coreBytes));
      return;
    }

    // 2) localStorage
    const localBytes = getLocalStorage(routeKey, key);
    if (localBytes instanceof Uint8Array) {
      cb(decodeValue(localBytes));
      return;
    }

    // 3) sessionStorage
    const sessionBytes = getSessionStorage(routeKey, key);
    if (sessionBytes instanceof Uint8Array) {
      cb(decodeValue(sessionBytes));
      return;
    }

    // 4) IndexedDB (async)
    getIndexedDB(routeKey, key, (bytes) => {
      if (bytes instanceof Uint8Array) {
        cb(decodeValue(bytes));
      } else {
        cb(null);
      }
    });
  }

  function getSync(routeKey, key) {
    const coreBytes = getFromCore(routeKey, key);
    if (coreBytes instanceof Uint8Array) return decodeValue(coreBytes);

    const localBytes = getLocalStorage(routeKey, key);
    if (localBytes instanceof Uint8Array) return decodeValue(localBytes);

    const sessionBytes = getSessionStorage(routeKey, key);
    if (sessionBytes instanceof Uint8Array) return decodeValue(sessionBytes);

    return null;
  }

  return {
    put,
    get,
    getSync
  };
}

// ============================================================================
//  GOVERNOR CREATION — v40 IMMORTAL BINARY GOVERNOR
// ============================================================================

export function createPulseCoreGovernor({
  CoreMemory = null,
  overlay = null,
  dnaTag = "default-dna",
  version = "40.0-IMMORTAL-BINARY-GOVERNOR",
  log = (stage, ...rest) => console.log(stage, ...rest),
  warn = (stage, ...rest) => console.warn(stage, ...rest)
} = {}) {
  function safeLog(stage, details = {}) {
    try {
      log("[PulseCoreGovernor-v40]", stage, JSON.stringify(details));
    } catch {}
  }

  function safeWarn(stage, details = {}) {
    try {
      warn("[PulseCoreGovernor-v40]", stage, JSON.stringify(details));
    } catch {}
  }

  // spine reference, resolved lazily
  let Memory = CoreMemory || null;

  function resolveMemory() {
    if (Memory) return Memory;
    Memory = createPulseCoreMemory({ dnaTag, log, warn });
    return Memory;
  }

  // overlay wiring
  if (overlay) {
    overlay.CoreMemory = null;
    overlay.Governor = null;
  }

  // pressure gauges
  const writePressure = createPressureGauge();
  const readPressure = createPressureGauge();

  const WRITE_PRESSURE_WARN = 0.85;
  const READ_PRESSURE_WARN = 0.90;

  function recordWrite() {
    writePressure.record(1);
  }

  function recordRead(hit) {
    readPressure.record(hit ? 1 : 2);
  }

  function checkPressure() {
    const wAvg = writePressure.avg();
    const rAvg = readPressure.avg();

    if (wAvg > WRITE_PRESSURE_WARN) {
      safeWarn("WRITE_PRESSURE_HIGH", { avg: wAvg });
    }
    if (rAvg > READ_PRESSURE_WARN) {
      safeWarn("READ_PRESSURE_HIGH", { avg: rAvg });
    }
  }

  function buildGovernorContext() {
    return {
      dnaTag,
      version,
      epoch: nextGovernorEpoch()
    };
  }

  // organ registry (semi-open federation)
  const organs = Object.create(null);

  function registerOrgan(name, organ) {
    if (!name || !organ) return;
    organs[name] = organ;
    safeLog("REGISTER_ORGAN", { name });
  }

  function getOrgan(name) {
    return organs[name] || null;
  }

  // device / wave context
  const deviceContext = buildDeviceContext();
  const waveContextHint = buildWaveContextHint();

  // binary DB router (created lazily once Memory is resolved)
  let BinaryDB = null;
  function resolveBinaryDB() {
    if (BinaryDB) return BinaryDB;
    const mem = resolveMemory();
    BinaryDB = createBinaryDBRouter({ Memory: mem, log: safeLog, warn: safeWarn });
    return BinaryDB;
  }

  // -------------------------------------------------------------------------
  //  START / BOOT / HEAL — FULL CORE MEMORY STARTUP
  // -------------------------------------------------------------------------
  let started = false;

  function start() {
    if (started) return;
    started = true;

    const mem = resolveMemory();

    if (overlay) {
      overlay.CoreMemory = mem;
    }

    const ctx = buildGovernorContext();
    try {
      mem.prewarm();
      mem.bulkLoad();
    } catch {}
    safeLog("START", ctx);
  }

  function boot() {
    start();
  }

  function ensureReady() {
    start();
  }

  function healIfNeeded() {
    ensureReady();
    const mem = resolveMemory();
    const ctx = buildGovernorContext();
    try {
      mem.prewarm();
    } catch {}
    checkPressure();
    safeLog("HEAL_CHECK", {
      ...ctx,
      writePressureAvg: writePressure.avg(),
      readPressureAvg: readPressure.avg()
    });
  }

  // -------------------------------------------------------------------------
  //  SET / GET — v40 IMMORTAL BINARY GOVERNOR
  // -------------------------------------------------------------------------
  function set(routeId, key, value, options = {}) {
    ensureReady();
    const mem = resolveMemory();
    const dataType = options.dataType || "generic";

    mem.set(routeId, key, value);
    recordWrite();
    checkPressure();

    safeLog("SET", {
      routeId,
      key,
      dataType,
      dnaTag,
      version
    });
  }

  function get(routeId, key, options = {}) {
    ensureReady();
    const mem = resolveMemory();
    const dataType = options.dataType || "generic";

    const value = mem.get(routeId, key);
    recordRead(value !== undefined);
    checkPressure();

    safeLog("GET", {
      routeId,
      key,
      dataType,
      hit: value !== undefined
    });

    return value;
  }

  // -------------------------------------------------------------------------
  //  BINARY DB API — Binary-first, federated through Governor
  // -------------------------------------------------------------------------
  function putBinary(routeKey, key, value) {
    ensureReady();
    const db = resolveBinaryDB();
    const size = db.put(routeKey, key, value);
    recordWrite();
    checkPressure();
    safeLog("PUT_BINARY", { routeKey, key, size });
    return size;
  }

  function getBinary(routeKey, key, cb) {
    ensureReady();
    const db = resolveBinaryDB();
    db.get(routeKey, key, (value) => {
      recordRead(value !== null && value !== undefined);
      checkPressure();
      safeLog("GET_BINARY", {
        routeKey,
        key,
        hit: value !== null && value !== undefined
      });
      cb(value);
    });
  }

  function getBinarySync(routeKey, key) {
    ensureReady();
    const db = resolveBinaryDB();
    const value = db.getSync(routeKey, key);
    recordRead(value !== null && value !== undefined);
    checkPressure();
    safeLog("GET_BINARY_SYNC", {
      routeKey,
      key,
      hit: value !== null && value !== undefined
    });
    return value;
  }

  // -------------------------------------------------------------------------
  //  SNAPSHOTS / ROUTE‑LEVEL CONTROL
  // -------------------------------------------------------------------------
  function getRouteSnapshot(routeId) {
    ensureReady();
    const mem = resolveMemory();
    const snapshot = mem.getRouteSnapshot(routeId);
    safeLog("GET_ROUTE_SNAPSHOT", { routeId });
    return snapshot;
  }

  function setRouteSnapshot(routeId, snapshot) {
    ensureReady();
    const mem = resolveMemory();
    mem.setRouteSnapshot(routeId, snapshot);
    safeLog("SET_ROUTE_SNAPSHOT", { routeId });
  }

  function clearRoute(routeId) {
    ensureReady();
    const mem = resolveMemory();
    mem.clearRoute(routeId);
    safeLog("CLEAR_ROUTE", { routeId });
  }

  function clearAll() {
    ensureReady();
    const mem = resolveMemory();
    mem.clearAll();
    safeLog("CLEAR_ALL", {});
  }

  // -------------------------------------------------------------------------
  //  FLUSH / PERSIST
  // -------------------------------------------------------------------------
  function flush() {
    ensureReady();
    const mem = resolveMemory();
    mem.bulkFlush();
    const cacheData = mem.Cache && mem.Cache.data ? mem.Cache.data : {};
    safeLog("FLUSH", {
      routes: Object.keys(cacheData).length
    });
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API — v40 IMMORTAL BINARY GOVERNOR
  // -------------------------------------------------------------------------
  const PulseCoreGovernor = {
    // core spine
    get CoreMemory() {
      return resolveMemory();
    },
    get Memory() {
      return resolveMemory();
    },

    // binary DB
    putBinary,
    getBinary,
    getBinarySync,

    // classic memory API
    set,
    get,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,
    flush,

    // lifecycle
    start,
    boot,
    ensureReady,
    healIfNeeded,

    // organ federation
    registerOrgan,
    getOrgan,
    organs,

    // environment
    deviceContext,
    waveContextHint,

    // meta
    dnaTag,
    version,

    // pressure
    _pressure: {
      writeAvg: () => writePressure.avg(),
      readAvg: () => readPressure.avg()
    }
  };

  safeLog("INITIALIZE", {
    version,
    dnaTag,
    deviceContext,
    waveContextHint
  });

  if (overlay) {
    overlay.Governor = PulseCoreGovernor;
  }

  // global hooks (for organs that attach via self)
  try {
    PulseRealm.CoreGovernor = { createPulseCoreGovernor };
    PulseRealm.PulseCoreGovernor = createPulseCoreGovernor;
  } catch {}

  return PulseCoreGovernor;
}

// ============================================================================
//  CONVENIENCE EXPORTS — shared spine via Governor
// ============================================================================

export function createPulseCoreGSpeech() {
  return createPulseCoreSpeech();
}

export function createPulseCoreGMemory() {
  return createPulseCoreMemory();
}
