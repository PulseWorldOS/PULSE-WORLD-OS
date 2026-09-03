// ============================================================================
// FILE: /PULSE-WORLD-TOUCH/PULSE-UNIVERSAL-TOUCH-STORAGE-v32-IMMORTAL-WORLD.js
// PULSE WORLD OS — v32 IMMORTAL-WORLD
// PULSE‑TOUCH STORAGE — PULSEBINARY INDEXEDDB ORGAN (WORLD IMMORTAL)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export const PULSE_TOUCH_STORAGE_META_V32 = Object.freeze({
  id: "pulsetouch.storage.v32",
  kind: "storage_organ",
  version: "v32-IMMORTAL-WORLD-BINARY",
  role: "binary_storage_engine",
  layer: "edge.storage.world",
  band: "storage",
  invariants: Object.freeze({
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime",
    zeroPII: true,
    zeroTracking: true,
    binaryOnly: true,
    indexedDBOnly: true
  })
});

export const PULSE_TOUCH_STORAGE_CONTRACT_V32 = Object.freeze({
  inputs: Object.freeze({
    op: "operation",
    store: "store name",
    key: "binary key (ArrayBuffer/Uint8Array)",
    value: "binary value (optional)"
  }),
  outputs: Object.freeze({
    result: "binary result or null",
    ok: "boolean"
  }),
  guarantees: Object.freeze({
    deterministic: true,
    asyncSafe: true,
    noNetwork: true,
    zeroPII: true
  })
});

export const PULSE_TOUCH_STORAGE_OVERLAYS_V32 = Object.freeze({
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
});

// ============================================================================
// INTERNAL CONSTANTS
// ============================================================================

const DB_NAME = "PulseTouchStorageDB";
const DB_VERSION = 1;

export const PULSE_TOUCH_STORAGE_STORES_V32 = Object.freeze({
  presence: "presence",
  modules: "modules",
  chunks: "chunks",
  warmup: "warmup",
  analytics: "analytics",
  signals: "signals"
});

const STORES = PULSE_TOUCH_STORAGE_STORES_V32;

// ============================================================================
// OPEN DATABASE
// ============================================================================

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      for (const store of Object.values(STORES)) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store);
        }
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

// ============================================================================
// BINARY HELPERS
// ============================================================================

function toBinaryKey(key) {
  if (key instanceof Uint8Array) return key.buffer;
  if (key instanceof ArrayBuffer) return key;
  throw new Error("Key must be Uint8Array or ArrayBuffer");
}

function toBinaryValue(value) {
  if (value == null) return null;
  if (value instanceof Uint8Array) return value.buffer;
  if (value instanceof ArrayBuffer) return value;
  throw new Error("Value must be Uint8Array or ArrayBuffer or null");
}

// ============================================================================
// PRESENCE RING BUFFER
// ============================================================================

const PRESENCE_MAX_FRAMES = 1024;
const PRESENCE_FRAME_BYTES = 5;
const PRESENCE_HEADER_BYTES = 8;
const PRESENCE_BUFFER_BYTES =
  PRESENCE_HEADER_BYTES + PRESENCE_MAX_FRAMES * PRESENCE_FRAME_BYTES;

async function appendPresenceFrame(timestamp, presenceCode) {
  const key = new Uint8Array([0x70, 0x72, 0x65, 0x73]); // "pres"
  const db = await  openDB();

  return await new Promise((resolve) => {
    const tx = db.transaction(STORES.presence, "readwrite");
    const store = tx.objectStore(STORES.presence);

    const req = store.get(key.buffer);

    req.onsuccess = () => {
      let buf = req.result;

      if (!buf) {
        buf = new ArrayBuffer(PRESENCE_BUFFER_BYTES);
        const dv = new DataView(buf);
        dv.setUint32(0, 0);
        dv.setUint32(4, 0);
      }

      const dv = new DataView(buf);
      let head = dv.getUint32(0);
      let size = dv.getUint32(4);

      const offset = PRESENCE_HEADER_BYTES + head * PRESENCE_FRAME_BYTES;
      dv.setUint32(offset, timestamp >>> 0);
      dv.setUint8(offset + 4, presenceCode & 0xff);

      head = (head + 1) % PRESENCE_MAX_FRAMES;
      size = Math.min(size + 1, PRESENCE_MAX_FRAMES);

      dv.setUint32(0, head);
      dv.setUint32(4, size);

      store.put(buf, key.buffer);
      resolve(true);
    };

    req.onerror = () => resolve(false);
  });
}

// ============================================================================
// CORE STORAGE OPS
// ============================================================================

async function storagePut(storeName, key, value) {
  const db = await  openDB();
  return await new Promise((resolve) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.put(toBinaryValue(value), toBinaryKey(key));
    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
}

async function storageGet(storeName, key) {
  const db = await  openDB();
  return await new Promise((resolve) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.get(toBinaryKey(key));
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
}

async function storageDelete(storeName, key) {
  const db = await  openDB();
  return await new Promise((resolve) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.delete(toBinaryKey(key));
    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
}

export function PulseTouchStorageV32() {
  // ⭐ READY — simple v32 upgrade, no storageOpen, no extra wiring
  const _readyPromise = Promise.resolve(true);
  async function ready() {
    return _readyPromise;
  }

  async function snapshot(keyString) {
    const keyBytes = new TextEncoder().encode(keyString);
    const raw = await storageGet(STORES.signals, keyBytes);
    if (!raw) return null;
    try {
      return JSON.parse(new TextDecoder().decode(new Uint8Array(raw)));
    } catch {
      return null;
    }
  }

  async function snapshotPut(keyString, jsObject) {
    const keyBytes = new TextEncoder().encode(keyString);
    const valBytes = new TextEncoder().encode(JSON.stringify(jsObject));
    const ok = await storagePut(STORES.signals, keyBytes, valBytes);
    return { ok };
  }

  async function warmupPut(keyString, jsObject) {   
    const keyBytes = new TextEncoder().encode(keyString);
    const valBytes = new TextEncoder().encode(JSON.stringify(jsObject));
    const ok = await storagePut(STORES.warmup, keyBytes, valBytes);
    return { ok };
  }

  async function appendPresence(timestamp, presenceCode) {
    const ok = await appendPresenceFrame(timestamp, presenceCode);
    return { ok };
  }

  async function appendPresenceReady(timestamp, presenceCode) {
    return appendPresence(timestamp, presenceCode);
  }

  async function put(store, key, value) {
    if (!STORES[store]) return { ok: false, result: null };
    const ok = await storagePut(STORES[store], key, value);
    return { ok, result: null };
  }

  async function get(store, key) {
    if (!STORES[store]) return { ok: false, result: null };

    const raw = await storageGet(STORES[store], key);
    if (!raw) return { ok: true, result: null };

    try {
      const decoded = JSON.parse(new TextDecoder().decode(new Uint8Array(raw)));
      return { ok: true, result: decoded };
    } catch {
      return { ok: true, result: null };
    }
  }

  async function del(store, key) {
    if (!STORES[store]) return { ok: false, result: null };
    const ok = await storageDelete(STORES[store], key);
    return { ok, result: null };
  }

  // ⭐ NEW METHOD: store(keyString, jsObject)
  async function store(keyString, jsObject) {
    const keyBytes = new TextEncoder().encode(keyString);
    const valBytes = new TextEncoder().encode(JSON.stringify(jsObject));
    const ok = await storagePut(STORES.signals, keyBytes, valBytes);
    return { ok };
  }

  // RETURN OBJECT — now with ready()
  return Object.freeze({
    meta: PULSE_TOUCH_STORAGE_META_V32,
    contract: PULSE_TOUCH_STORAGE_CONTRACT_V32,
    overlays: PULSE_TOUCH_STORAGE_OVERLAYS_V32,
    stores: STORES,

    ready,                // ⭐ added, nothing else removed

    snapshot: snapshot,
    snapshotPut: snapshotPut,
    warmupPut: warmupPut,
    appendPresence: appendPresence,
    appendPresenceReady: appendPresenceReady,

    put: put,
    get: get,
    delete: del,

    store: store
  });
}


async function worldStorageScan() {
  const out = {
    localStorage: {},
    sessionStorage: {},
    indexedDB: {},
    caches: {},
    PulseGlobal: {},
    windowKeys: [],
    globalSurfaces: {}
  };

  // ============================================================
  // ⭐ LOCAL STORAGE
  // ============================================================
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      out.localStorage[key] = localStorage.getItem(key);
    }
  } catch (err) {
    out.localStorage.__error = String(err);
  }

  // ============================================================
  // ⭐ SESSION STORAGE
  // ============================================================
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      out.sessionStorage[key] = sessionStorage.getItem(key);
    }
  } catch (err) {
    out.sessionStorage.__error = String(err);
  }

  // ============================================================
  // ⭐ INDEXEDDB (ALL DATABASES, NO HARDCODING)
  // ============================================================
  try {
    if (indexedDB.databases) {
      const dbs = await indexedDB.databases();
      for (const db of dbs) {
        out.indexedDB[db.name || "unnamed"] = db.version || "unknown";
      }
    } else {
      out.indexedDB.__note = "indexedDB.databases() not supported";
    }
  } catch (err) {
    out.indexedDB.__error = String(err);
  }

  // ============================================================
  // ⭐ CACHE STORAGE (ALL CACHES)
  // ============================================================
  try {
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
      out.caches[name] = true;
    }
  } catch (err) {
    out.caches.__error = String(err);
  }

  // ============================================================
  // ⭐ PULSE GLOBAL REALMS (NOW / PAST / FUTURE)
  // ============================================================
  try {
    const realms = [
      ["PulseGlobalNow", "Now"],
      ["PulseGlobalPast", "Past"],
      ["PulseGlobalFuture", "Future"]
    ];

    for (const [realmName, label] of realms) {
      const realm = self[realmName];
      if (realm && typeof realm === "object") {
        for (const key of Object.keys(realm)) {
          out.PulseGlobal[key] = label;
        }
      }
    }
  } catch (err) {
    out.PulseGlobal.__error = String(err);
  }

  // ============================================================
  // ⭐ WINDOW KEYS
  // ============================================================
  try {
    out.windowKeys = Object.keys(window);
  } catch (err) {
    out.windowKeys = ["<error reading window keys>"];
  }

  // ============================================================
  // ⭐ GLOBAL SURFACES (NO HARDCODING)
  // ============================================================
  try {
    const surfaces = {
      window,
      globalThis,
      self,
      frames
    };

    for (const [name, surface] of Object.entries(surfaces)) {
      try {
        out.globalSurfaces[name] = Object.keys(surface);
      } catch {
        out.globalSurfaces[name] = ["<unreadable>"];
      }
    }
  } catch (err) {
    out.globalSurfaces.__error = String(err);
  }

  // ============================================================
  // ⭐ CONSOLE OUTPUT
  // ============================================================
  const totalGroups = Object.keys(out).length;

  console.groupCollapsed(
    `%c[PulseWorld::Storage] Universal Storage Scan (${totalGroups} Surfaces Detected)`,
    "color:#AAFFCC; font-weight:bold; font-family:monospace;"
  );

  const sections = [
    ["LocalStorage", out.localStorage],
    ["SessionStorage", out.sessionStorage],
    ["IndexedDB", out.indexedDB],
    ["CacheStorage", out.caches],
    ["PulseGlobal (Now/Past/Future)", out.PulseGlobal],
    ["Window Keys", out.windowKeys],
    ["Global Surfaces", out.globalSurfaces]
  ];

  for (const [label, data] of sections) {
    console.groupCollapsed(
      `%c${label} (${Array.isArray(data) ? data.length : Object.keys(data).length})`,
      "color:#AAFFCC; font-family:monospace;"
    );
    console.table(data);
    console.groupEnd();
  }

  console.groupEnd();

  return out;
}



PulseRealm.PulseTouchStorage = PulseTouchStorageV32;

PulseRealm.PulseStorageScan = worldStorageScan;

PulseRealm.PulseStorage = PulseTouchStorageV32;