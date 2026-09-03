// ============================================================================
//  PulseCoreMemory-v40.js — v40‑IMMORTAL‑BINARY‑SPINE
//  ORGANISM‑WIDE BINARY MEMORY SPINE (MULTI‑BAND, MULTI‑BACKEND, DEVICE‑AWARE)
//  “LOAD RARELY, SERVE CONSTANTLY, FLUSH INTENTIONALLY, HEAL WHILE SPINNING”
//  v40: Binary‑first DB → IndexedDB → localStorage → sessionStorage → text‑snapshot
//       No text at rest when possible, compressed binary surfaces everywhere.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { createPulseBinaryOverlay }         from "./PulseCoreBinaryOverlay-v40.js";
import { createPulseCoreBrain }             from "./PulseCoreFrontalCortex-v40.js";
import { createPulseCoreEvolutions }        from "./PulseCoreEvolution-v40.js";
import { createPulseCoreLayerRules }        from "./PulseCoreLayers-v40.js";
import { createPulseCoreMemoryManager_v40 } from "./PulseCoreMemoryManager-v40.js";
import { createPulseCoreSpeech_v40 }        from "./PulseCoreSpeech-v40.js";

// ============================================================================
//  CONSTANTS / VERSION
// ============================================================================
const CORE_VERSION          = "40.0-IMMORTAL-BINARY-SPINE";
const CORE_DB_NAME          = "PulseCoreBinaryDB_v40";
const CORE_DB_STORE         = "bands_v40";
const CORE_KEY_PRIMARY      = "core_band_primary_v40";
const CORE_KEY_SECONDARY    = "core_band_secondary_v40";
const META_KEY_PRIMARY      = "pulse-core-memory-meta-v40-primary";
const META_KEY_SECONDARY    = "pulse-core-memory-meta-v40-secondary";
const ROUTE_TTL_MS          = 7 * 24 * 60 * 60 * 1000;
const MAX_SERIALIZED_BYTES  = 512 * 1024;
 const IDENTITY_META = {
    version: "v70-IMMORTAL",
    organism: "PulseOS",
    realm: "browser",
    timestamp: () => PulseRealm.PulseNOW,
    uid: () => PulseRealm.crypto?.randomUUID?.() || ("uid-" + Math.random().toString(36).slice(2)),
    signature: "identity-meta-core"
  };
// ============================================================================
//  BINARY ENCODING HELPERS (Uint8Array + compact JSON)
// ============================================================================

function encodeToBinary(obj) {
  const json = JSON.stringify(obj || {});
  const len = json.length;
  const buf = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buf[i] = json.charCodeAt(i) & 0xff;
  }
  return buf;
}

function decodeFromBinary(buf) {
  if (!(buf instanceof Uint8Array)) return null;
  let json = "";
  for (let i = 0; i < buf.length; i++) {
    json += String.fromCharCode(buf[i]);
  }
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Fallback binary <-> base64 for localStorage/sessionStorage/text
function binaryToBase64(buf) {
  let binary = "";
  for (let i = 0; i < buf.length; i++) {
    binary += String.fromCharCode(buf[i]);
  }
  return btoa(binary);
}

function base64ToBinary(str) {
  try {
    const binary = atob(str);
    const len = binary.length;
    const buf = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buf[i] = binary.charCodeAt(i) & 0xff;
    }
    return buf;
  } catch {
    return null;
  }
}

// ============================================================================
//  PRIMARY BINARY DB (IndexedDB, binary payloads)
// ============================================================================

async function openPulseCoreBinaryDB() {
  if (PulseRealm.__pulseCoreBinaryDB_v40) return PulseRealm.__pulseCoreBinaryDB_v40;

  PulseRealm.__pulseCoreBinaryDB_v40 = new Promise((resolve) => {
    let dbRequest;
    try {
      dbRequest = indexedDB.open(CORE_DB_NAME, 1);
    } catch {
      resolve(undefined);
      return;
    }

    dbRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(CORE_DB_STORE)) {
        db.createObjectStore(CORE_DB_STORE);
      }
    };

    dbRequest.onsuccess = () => resolve(dbRequest.result);
    dbRequest.onerror   = () => resolve(undefined);
  });

  return PulseRealm.__pulseCoreBinaryDB_v40;
}

async function readBandFromBinaryDB(key, warn) {
  try {
    const db = await openPulseCoreBinaryDB();
    if (!db) return { ok: false };

    const tx    = db.transaction(CORE_DB_STORE, "readonly");
    const store = tx.objectStore(CORE_DB_STORE);
    const req   = store.get(key);

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const payload = req.result;
        if (!payload) {
          resolve({ ok: true, data: undefined, meta: undefined });
          return;
        }
        const buf = payload.data instanceof Uint8Array
          ? payload.data
          : payload.data && payload.data.buffer
          ? new Uint8Array(payload.data)
          : undefined;

        const decoded = buf ? decodeFromBinary(buf) : undefined;
        resolve({
          ok: true,
          data: decoded,
          meta: payload.meta
        });
      };
      req.onerror = () => resolve({ ok: false });
    });
  } catch (err) {
    if (warn) warn("[PulseCoreMemory-v40] READ_BINARY_DB_ERROR", String(err));
    return { ok: false };
  }
}

async function writeBandToBinaryDB(key, data, meta, warn) {
  try {
    const db = await openPulseCoreBinaryDB();
    if (!db) return false;

    const tx    = db.transaction(CORE_DB_STORE, "readwrite");
    const store = tx.objectStore(CORE_DB_STORE);

    const buf = encodeToBinary(data);
    const payload = {
      data: buf,
      meta
    };

    store.put(payload, key);

    return await new Promise((resolve) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror    = () => resolve(false);
    });
  } catch (err) {
    if (warn) warn("[PulseCoreMemory-v40] WRITE_BINARY_DB_ERROR", String(err));
    return false;
  }
}

// ============================================================================
//  FALLBACK BACKENDS: localStorage / sessionStorage / text snapshot
// ============================================================================

function readBandFromLocalStorage(key) {
  try {
    if (!PulseRealm.localStorage) return { ok: false };
    const raw = PulseRealm.localStorage.getItem(key);
    if (!raw) return { ok: true, data: undefined, meta: undefined };

    const parsed = JSON.parse(raw);
    const buf    = parsed.data ? base64ToBinary(parsed.data) : undefined;
    const decoded = buf ? decodeFromBinary(buf) : undefined;

    return {
      ok: true,
      data: decoded,
      meta: parsed.meta
    };
  } catch {
    return { ok: false };
  }
}

function writeBandToLocalStorage(key, data, meta) {
  try {
    if (!PulseRealm.localStorage) return false;
    const buf = encodeToBinary(data);
    const payload = {
      data: binaryToBase64(buf),
      meta
    };
    PulseRealm.localStorage.setItem(key, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

function readBandFromSessionStorage(key) {
  try {
    if (!PulseRealm.sessionStorage) return { ok: false };
    const raw = PulseRealm.sessionStorage.getItem(key);
    if (!raw) return { ok: true, data: undefined, meta: undefined };

    const parsed = JSON.parse(raw);
    const buf    = parsed.data ? base64ToBinary(parsed.data) : undefined;
    const decoded = buf ? decodeFromBinary(buf) : undefined;

    return {
      ok: true,
      data: decoded,
      meta: parsed.meta
    };
  } catch {
    return { ok: false };
  }
}

function writeBandToSessionStorage(key, data, meta) {
  try {
    if (!PulseRealm.sessionStorage) return false;
    const buf = encodeToBinary(data);
    const payload = {
      data: binaryToBase64(buf),
      meta
    };
    PulseRealm.sessionStorage.setItem(key, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

// Text snapshot fallback (last resort, still binary-at-rest via base64)
function readBandFromTextSnapshot(key) {
  try {
    const globalKey = `__PULSE_CORE_TEXT_SNAPSHOT_${key}`;
    const raw = self[globalKey];
    if (!raw) return { ok: true, data: undefined, meta: undefined };

    const parsed = JSON.parse(raw);
    const buf    = parsed.data ? base64ToBinary(parsed.data) : undefined;
    const decoded = buf ? decodeFromBinary(buf) : undefined;

    return {
      ok: true,
      data: decoded,
      meta: parsed.meta
    };
  } catch {
    return { ok: false };
  }
}

function writeBandToTextSnapshot(key, data, meta) {
  try {
    const buf = encodeToBinary(data);
    const payload = {
      data: binaryToBase64(buf),
      meta
    };
    const globalKey = `__PULSE_CORE_TEXT_SNAPSHOT_${key}`;
    self[globalKey] = JSON.stringify(payload);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
//  UNIFIED BAND IO (Binary DB → localStorage → sessionStorage → text)
// ============================================================================

async function readBandUnified(key, warn) {
  // 1) Binary DB
  const primary = await readBandFromBinaryDB(key, warn);
  if (primary.ok && primary.data !== undefined) return primary;

  // 2) localStorage
  const local = readBandFromLocalStorage(key);
  if (local.ok && local.data !== undefined) return local;

  // 3) sessionStorage
  const session = readBandFromSessionStorage(key);
  if (session.ok && session.data !== undefined) return session;

  // 4) text snapshot
  const text = readBandFromTextSnapshot(key);
  if (text.ok && text.data !== undefined) return text;

  return { ok: true, data: undefined, meta: undefined };
}

async function writeBandUnified(key, data, meta, warn) {
  // 1) Binary DB
  const binaryOk = await writeBandToBinaryDB(key, data, meta, warn);

  // 2) localStorage
  const localOk = writeBandToLocalStorage(key, data, meta);

  // 3) sessionStorage
  const sessionOk = writeBandToSessionStorage(key, data, meta);

  // 4) text snapshot
  const textOk = writeBandToTextSnapshot(key, data, meta);

  return {
    binaryOk,
    localOk,
    sessionOk,
    textOk
  };
}

// ============================================================================
//  CORE MEMORY CREATION — v40 IMMORTAL BINARY SPINE
// ============================================================================

export function createPulseCoreMemory({
  log    = console.log,
  warn   = console.warn,
  dnaTag = "default-dna"
} = {}) {
  const Cache = {
    loaded: false,
    lastLoadEpoch: 0,
    data: Object.create(null),
    hotLoop: Object.create(null),
    routeMeta: Object.create(null)
  };

  const Meta = {
    lastFlushEpoch: 0,
    lastLoadEpoch: 0,
    version: CORE_VERSION,
    lastBandUsed: "primary",
    fallbackUsed: false,
    dnaTag,
    lastError: undefined
  };

  // Bring up frontal cortex / evolution / layers once per spine
  createPulseCoreBrain();
  createPulseCoreEvolutions();
  createPulseCoreLayerRules();
  createPulseCoreMemoryManager_v40();

  function safeLog(stage, details = {}) {
    try {
      const diagnostic = {
        stage,
        meta: {
          version: Meta.version,
          dnaTag: Meta.dnaTag,
          lastLoadEpoch: Meta.lastLoadEpoch,
          lastFlushEpoch: Meta.lastFlushEpoch,
          lastBandUsed: Meta.lastBandUsed,
          fallbackUsed: Meta.fallbackUsed,
          lastError: Meta.lastError
        },
        cache: {
          loaded: Cache.loaded,
          lastLoadEpoch: Cache.lastLoadEpoch,
          routes: Object.keys(Cache.data || {}),
          routeMeta: Cache.routeMeta,
          hotKeys: Object.keys(Cache.hotLoop || {})
        },
        details
      };

      log("💾 PULSE CORE MEMORY v40 - [PulseCoreMemory]", diagnostic);
    } catch {}
  }

  function isVersionCompatible(meta) {
    if (!meta || !meta.version) return false;
    return meta.version === CORE_VERSION;
  }

  function isDnaCompatible(meta) {
    if (!meta || !meta.dnaTag) return false;
    return meta.dnaTag === dnaTag;
  }

  async function healBandsFrom(sourceData, sourceMeta) {
    const payload = {
      data: sourceData.data,
      routeMeta: sourceData.routeMeta
    };

    const writeResultPrimary = await writeBandUnified(
      CORE_KEY_PRIMARY,
      payload,
      sourceMeta,
      warn
    );
    const writeResultSecondary = await writeBandUnified(
      CORE_KEY_SECONDARY,
      payload,
      sourceMeta,
      warn
    );

    const primaryOk =
      writeResultPrimary.binaryOk ||
      writeResultPrimary.localOk ||
      writeResultPrimary.sessionOk ||
      writeResultPrimary.textOk;

    const secondaryOk =
      writeResultSecondary.binaryOk ||
      writeResultSecondary.localOk ||
      writeResultSecondary.sessionOk ||
      writeResultSecondary.textOk;

    Meta.lastBandUsed = primaryOk
      ? "primary"
      : secondaryOk
      ? "secondary"
      : Meta.lastBandUsed;

    Meta.fallbackUsed = !primaryOk && secondaryOk;

    safeLog("HEAL_BANDS", { primaryOk, secondaryOk });
  }

  // -----------------------------------------------------------------------
  //  ROUTE TTL / DNA PRUNING
  // -----------------------------------------------------------------------
  function pruneExpiredRoutes() {
    const now = PulseRealm.PulseNOW;
    const meta = Cache.routeMeta;
    let removed = 0;

    for (const routeId in meta) {
      const info = meta[routeId];
      if (!info) continue;

      if (info.lastTouched && now - info.lastTouched > ROUTE_TTL_MS) {
        delete Cache.data[routeId];
        delete Cache.routeMeta[routeId];
        removed++;
        continue;
      }

      if (info.dnaTag && info.dnaTag !== dnaTag) {
        delete Cache.data[routeId];
        delete Cache.routeMeta[routeId];
        removed++;
      }
    }

    if (removed > 0) {
      safeLog("PRUNE_EXPIRED_ROUTES", { removed });
    }
  }

  function touchRouteMeta(routeId) {
    const now = PulseRealm.PulseNOW;
    if (!Cache.routeMeta[routeId]) {
      Cache.routeMeta[routeId] = { lastTouched: now, dnaTag, hotKeys: new Set() };
    } else {
      Cache.routeMeta[routeId].lastTouched = now;
      Cache.routeMeta[routeId].dnaTag = dnaTag;
      if (!Cache.routeMeta[routeId].hotKeys) {
        Cache.routeMeta[routeId].hotKeys = new Set();
      }
    }
  }

  // -----------------------------------------------------------------------
  //  LOAD / PREWARM
  // -----------------------------------------------------------------------
  function shouldReloadNow() {
    const now = PulseRealm.PulseNOW;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    return !Cache.loaded || now - Cache.lastLoadEpoch > ONE_DAY;
  }

  async function bulkLoad() {
    // PRIMARY band
    const primary = await readBandUnified(CORE_KEY_PRIMARY, warn);

    if (
      primary.ok &&
      primary.data &&
      isVersionCompatible(primary.meta) &&
      isDnaCompatible(primary.meta)
    ) {
      Cache.data      = primary.data.data      || Object.create(null);
      Cache.routeMeta = primary.data.routeMeta || Object.create(null);
      Cache.loaded    = true;
      Cache.lastLoadEpoch = PulseRealm.PulseNOW;

      Object.assign(Meta, primary.meta);
      Meta.lastLoadEpoch = Cache.lastLoadEpoch;
      Meta.lastBandUsed  = "primary";
      Meta.fallbackUsed  = false;

      pruneExpiredRoutes();

      safeLog("BULK_LOAD_PRIMARY_OK", {
        routes: Object.keys(Cache.data || {}).length
      });
      return;
    }

    // SECONDARY band
    const secondary = await readBandUnified(CORE_KEY_SECONDARY, warn);

    if (
      secondary.ok &&
      secondary.data &&
      isVersionCompatible(secondary.meta) &&
      isDnaCompatible(secondary.meta)
    ) {
      Cache.data      = secondary.data.data      || Object.create(null);
      Cache.routeMeta = secondary.data.routeMeta || Object.create(null);
      Cache.loaded    = true;
      Cache.lastLoadEpoch = PulseRealm.PulseNOW;

      Object.assign(Meta, secondary.meta);
      Meta.lastLoadEpoch = Cache.lastLoadEpoch;
      Meta.lastBandUsed  = "secondary";
      Meta.fallbackUsed  = true;

      await healBandsFrom(
        { data: Cache.data, routeMeta: Cache.routeMeta },
        Meta
      );

      pruneExpiredRoutes();

      safeLog("BULK_LOAD_SECONDARY_OK", {
        routes: Object.keys(Cache.data || {}).length
      });
      return;
    }

    // Nothing found — reset
    Cache.loaded        = true;
    Cache.lastLoadEpoch = PulseRealm.PulseNOW;
    Cache.data          = Object.create(null);
    Cache.routeMeta     = Object.create(null);

    Meta.lastLoadEpoch = Cache.lastLoadEpoch;
    Meta.lastBandUsed  = "primary";
    Meta.fallbackUsed  = false;
    Meta.version       = CORE_VERSION;
    Meta.dnaTag        = dnaTag;
  }

  async function prewarm() {
    if (shouldReloadNow()) {
      await bulkLoad();
    }
  }

  // -----------------------------------------------------------------------
  //  FLUSH
  // -----------------------------------------------------------------------
  async function bulkFlush() {
    try {
      Meta.lastFlushEpoch = PulseRealm.PulseNOW;

      const payload = {
        data: Cache.data,
        routeMeta: Cache.routeMeta
      };

      const primaryResult = await writeBandUnified(
        CORE_KEY_PRIMARY,
        payload,
        Meta,
        warn
      );
      const secondaryResult = await writeBandUnified(
        CORE_KEY_SECONDARY,
        payload,
        Meta,
        warn
      );

      const primaryOk =
        primaryResult.binaryOk ||
        primaryResult.localOk ||
        primaryResult.sessionOk ||
        primaryResult.textOk;

      const secondaryOk =
        secondaryResult.binaryOk ||
        secondaryResult.localOk ||
        secondaryResult.sessionOk ||
        secondaryResult.textOk;

      Meta.lastBandUsed = primaryOk
        ? "primary"
        : secondaryOk
        ? "secondary"
        : Meta.lastBandUsed;

      Meta.fallbackUsed = !primaryOk && secondaryOk;

      safeLog("BULK_FLUSH_OK", {
        routes: Object.keys(Cache.data || {}).length,
        primaryOk,
        secondaryOk
      });
    } catch (err) {
      warn("[PulseCoreMemory-v40] BULK_FLUSH_ERROR", String(err));
    }
  }

  // -----------------------------------------------------------------------
  //  ROUTE‑AWARE ACCESSORS + LOOP THEORY
  // -----------------------------------------------------------------------
  function ensureRoute(routeId = "global") {
    if (!Cache.data[routeId]) Cache.data[routeId] = {};
    touchRouteMeta(routeId);
    return Cache.data[routeId];
  }

  function markHot(routeId, key) {
    const id = `${routeId}:${key}`;
    const current = Cache.hotLoop[id] || 0;
    const next = current + 1;
    Cache.hotLoop[id] = next;
    return next;
  }

  // -----------------------------------------------------------------------
  //  BINARY HELPERS (NEW)
  // -----------------------------------------------------------------------
  function encodeBinary(value) {
    try {
      if (value instanceof Uint8Array) return value;
      if (value instanceof ArrayBuffer) return new Uint8Array(value);
      const enc = new TextEncoder();
      return enc.encode(JSON.stringify(value ?? null));
    } catch {
      return new Uint8Array(0);
    }
  }

  function decodeBinary(bytes) {
    try {
      if (!(bytes instanceof Uint8Array)) return null;
      const dec = new TextDecoder();
      const text = dec.decode(bytes);
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch {
      return null;
    }
  }

  // -----------------------------------------------------------------------
  //  CORE GET / SET (SYNC, UPGRADED)
  // -----------------------------------------------------------------------
  function get(routeId, key) {
    prewarm();
    const bucket = ensureRoute(routeId);
    const value  = bucket[key];

    if (value !== undefined) {
      markHot(routeId, key);
      touchRouteMeta(routeId);
    }

    return value instanceof Uint8Array ? decodeBinary(value) : value ?? null;
  }

  function set(routeId, key, value) {
    prewarm();
    const bucket = ensureRoute(routeId);
    const bytes  = encodeBinary(value);
    bucket[key]  = bytes;
    markHot(routeId, key);
    touchRouteMeta(routeId);
  }

  function getRouteSnapshot(routeId) {
    prewarm();
    touchRouteMeta(routeId);
    return { ...(Cache.data[routeId] || {}) };
  }

  function setRouteSnapshot(routeId, snapshot) {
    prewarm();
    Cache.data[routeId] = { ...(snapshot || {}) };
    touchRouteMeta(routeId);
  }

  function clearRoute(routeId) {
    prewarm();
    delete Cache.data[routeId];
    delete Cache.routeMeta[routeId];
  }

  function clearAll() {
    Cache.data      = Object.create(null);
    Cache.hotLoop   = Object.create(null);
    Cache.routeMeta = Object.create(null);
    bulkFlush();
  }

  function getHotKeys(minHits = 3) {
    const result = [];
    for (const id in Cache.hotLoop) {
      if (Cache.hotLoop[id] >= minHits) {
        result.push({ id, hits: Cache.hotLoop[id] });
      }
    }
    return result;
  }

  function coolDown(routeId, key) {
    const id = `${routeId}:${key}`;
    delete Cache.hotLoop[id];
  }

  // -----------------------------------------------------------------------
  //  ASYNC GET / PUT (DUAL-RUNTIME)
  // -----------------------------------------------------------------------
  async function getAsync(routeId, key) {
    try {
      // 1) CoreMemory first
      const bucket = Cache.data[routeId];
      if (bucket) {
        const val = bucket[key];
        if (val instanceof Uint8Array) {
          return decodeBinary(val);
        }
      }

      const compositeKey = `PULSE_BINARY_DB::${routeId}::${key}`;

      // 2) localStorage
      if (typeof localStorage !== "undefined") {
        const base64 = localStorage.getItem(compositeKey);
        if (base64) {
          const bin = atob(base64);
          const out = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
          return decodeBinary(out);
        }
      }

      // 3) sessionStorage
      if (typeof sessionStorage !== "undefined") {
        const base64 = sessionStorage.getItem(compositeKey);
        if (base64) {
          const bin = atob(base64);
          const out = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
          return decodeBinary(out);
        }
      }

      // 4) IndexedDB
      if (typeof indexedDB !== "undefined") {
        return await new Promise((resolve) => {
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
            const getReq = store.get(compositeKey);

            getReq.onsuccess = () => {
              const bytes = getReq.result;
              resolve(bytes ? decodeBinary(bytes) : null);
            };

            getReq.onerror = () => resolve(null);
          };

          request.onerror = () => resolve(null);
        });
      }

      // 5) Offline Node fallback
      return null;

    } catch (err) {
      warn("[PulseCoreMemory-v40] GET_ASYNC_ERROR", String(err));
      return null;
    }
  }

  async function putAsync(routeId, key, value) {
    try {
      const bytes  = encodeBinary(value);
      const bucket = ensureRoute(routeId);
      bucket[key]  = bytes;

      markHot(routeId, key);
      touchRouteMeta(routeId);

      const compositeKey = `PULSE_BINARY_DB::${routeId}::${key}`;

      // 1) localStorage
      if (typeof localStorage !== "undefined") {
        const base64 = btoa(String.fromCharCode(...bytes));
        localStorage.setItem(compositeKey, base64);
      }

      // 2) sessionStorage
      if (typeof sessionStorage !== "undefined") {
        const base64 = btoa(String.fromCharCode(...bytes));
        sessionStorage.setItem(compositeKey, base64);
      }

      // 3) IndexedDB
      if (typeof indexedDB !== "undefined") {
        await new Promise((resolve) => {
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
            store.put(bytes, compositeKey);
            resolve(true);
          };

          request.onerror = () => resolve(false);
        });
      }

      safeLog("PUT_ASYNC", { routeId, key });
      return true;

    } catch (err) {
      warn("[PulseCoreMemory-v40] PUT_ASYNC_ERROR", String(err));
      return false;
    }
  }

  // -----------------------------------------------------------------------
  //  ENVELOPE NORMALIZER + RAW
  // -----------------------------------------------------------------------
  function all(envelope) {
    if (!envelope || typeof envelope !== "object") {
      envelope = {};
    }

    const packet = envelope.packet && typeof envelope.packet === "object"
      ? envelope.packet
      : {};

    return {
      identity: {
        version: IDENTITY_META.version,
        organism: IDENTITY_META.organism,
        realm: IDENTITY_META.realm,
        uid: envelope.uid || IDENTITY_META.uid(),
        timestamp: envelope.timestamp || IDENTITY_META.timestamp(),
        signature: IDENTITY_META.signature
      },

      id: envelope.id || "unknown-id",
      severity: envelope.severity || "unknown",

      packet: {
        route:   packet.route   || "unknown-route",
        message: packet.message || "unknown-message",
        surface: packet.surface || "unknown-surface",
        ...packet
      },

      ...envelope
    };
  }

  function raw(route, key) {
    try {
      if (!route || !key) return null;
      const bucket = Cache.data[route];
      if (!bucket) return null;
      return bucket[key] ?? null;
    } catch {
      return null;
    }
  }

  function getSync(routeId, key) {
  try {
    const bucket = Cache.data[routeId];
    if (!bucket) return null;

    const value = bucket[key];
    if (value instanceof Uint8Array) {
      return decodeBinary(value);
    }

    return value ?? null;
  } catch {
    return null;
  }
}

  // -----------------------------------------------------------------------
  //  ERROR SURFACE
  // -----------------------------------------------------------------------
  async function onError(envelopeRaw) {
    const envelope = all(envelopeRaw);

    try {
      try {
        warn("[PulseCoreMemory:Error]", {
          id: envelope.id,
          severity: envelope.severity,
          route: envelope.packet.route,
          message: envelope.packet.message
        });
      } catch {}

      try {
        Meta.lastError = {
          id: envelope.id,
          severity: envelope.severity,
          route: envelope.packet.route,
          surface: envelope.packet.surface,
          time: envelope.timestamp
        };
      } catch {}

      try {
        const key = "global:last_error";
        const bucket = ensureRoute("global");
        bucket[key] = envelope;
        markHot("global", key);
        touchRouteMeta("global");
      } catch {}

      try {
        const routeId = envelope.packet.route || "unknown-route";
        const bucket = ensureRoute(routeId);
        bucket.__lastError = envelope;
        markHot(routeId, "__lastError");
        touchRouteMeta(routeId);
      } catch {}

      // ⭐ FIXED — now allowed because onError is async
      try {
        Meta.lastFlushEpoch = PulseRealm.PulseNOW;
        await bulkFlush();
      } catch {}

      try {
        if (PulseRealm.PulseSDN && PulseRealm.PulseSDN.emitImpulse) {
          PulseRealm.PulseSDN.emitImpulse("corememory.error", {
            modeKind: "binary",
            executionContext: {
              sceneType: "core-memory",
              workloadClass: "binary-error",
              dispatchSignature: "PulseCoreMemory.v40",
              shapeSignature: "corememory-error-spine",
              extensionId: "PulseCoreMemory"
            },
            envelope
          });
        }
      } catch {}

      try {
        if (PulseRealm.PulseSignals && PulseRealm.PulseSignals.emit) {
          PulseRealm.PulseSignals.emit("corememory.error", {
            envelope,
            severity: envelope.severity,
            route: envelope.packet.route,
            surface: envelope.packet.surface
          });
        }
      } catch {}

    } catch (err) {
      warn("[PulseCoreMemory:onError FAILED]", String(err));
    }
  }


  // -----------------------------------------------------------------------
  //  ERROR SURFACE + OVERLAYS + PROXY
  // -----------------------------------------------------------------------
  const PulseCoreMemory = {
    Meta,
    Cache,

    all,
    raw,

    proxy() {
      return {
        get(route, key) {
          try {
            return Cache.data?.[route]?.[key] ?? null;
          } catch {
            return null;
          }
        },
        set(route, key, value) {
          try {
            if (!Cache.data[route]) Cache.data[route] = {};
            Cache.data[route][key] = value;
            return true;
          } catch {
            return false;
          }
        }
      };
    },

    binaryOverlay() {
      return {
        record(envelope) {
          try {
            const bucket = ensureRoute("binary-overlay");
            const ts = PulseRealm.PulseNOW;
            bucket[`overlay-${ts}`] = envelope;
            markHot("binary-overlay", `overlay-${ts}`);
            return true;
          } catch {
            return false;
          }
        },
        getAll() {
          try {
            return Cache.data["binary-overlay"] || {};
          } catch {
            return {};
          }
        }
      };
    },

    onError,

    prewarm,
    bulkLoad,
    bulkFlush,

    get,
    set,
    getSync,
    getAsync,
    putAsync,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,
    getHotKeys,
    coolDown,

    dnaTag,
    version: CORE_VERSION
  };

  safeLog("Initializing Components..", {
    version: CORE_VERSION,
    dnaTag
  });

  return PulseCoreMemory;
}


// ============================================================================
//  IMMORTAL SINGLETON INSTANCE — PURE SPINE
// ============================================================================
export const PulseCoreMemory    = createPulseCoreMemory();
// ============================================================================
//  CORE ORGANISM EXPORT SURFACE — NO GOVERNOR HERE
// ============================================================================
export const PulseCoreOrganism = {
  CoreMemory: PulseCoreMemory,

  createPulseCoreMemory,
  createPulseBinaryOverlay,
  createPulseCoreBrain,
  createPulseCoreEvolutions,
  createPulseCoreMemoryManager_v40,
  createPulseCoreSpeech_v40,
  createPulseCoreLayerRules,

  version: CORE_VERSION
};

export default PulseCoreOrganism;

// exported AS FUNCTIONS (NOT constants)
export function createPulseCoreSpeech() {
  return createPulseCoreSpeech_v40();
}

// Global wiring for legacy organs (governor imports through here)
PulseRealm.CoreMemory = {
  createPulseCoreMemory,
  createPulseBinaryOverlay,
  createPulseCoreBrain,
  createPulseCoreEvolutions,
  createPulseCoreMemoryManager_v40,
  createPulseCoreSpeech_v40,
  createPulseCoreLayerRules,
  createPulseCoreSpeech,
  PulseCoreOrganism,
  PulseCoreMemory
};

PulseRealm.PulseCoreMemory     = PulseCoreMemory;
PulseRealm.PulseCoreMemoryBuild = createPulseCoreMemory;
