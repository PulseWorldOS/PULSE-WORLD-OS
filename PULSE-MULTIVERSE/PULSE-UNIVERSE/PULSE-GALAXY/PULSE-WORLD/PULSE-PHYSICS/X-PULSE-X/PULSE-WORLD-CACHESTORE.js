// ============================================================================
//  PULSE-WORLD-CACHESTORE.js — IMMORTAL++ TIMELINE CACHE ENGINE (v33)
//  LOW-LEVEL STORAGE + HISTORY LAYER (NO RUNTIME LOGIC)
//  “THE WORLD IS STORED. CLIENTS DECIDE HOW TO USE IT.”
// ============================================================================

// ============================================================================
//  INDEXEDDB SETUP (TIMELINE SNAPSHOT STORE)
// ============================================================================
const DB_NAME = "PulseWorldCacheDB";
const STORE_NAME = "PulseWorldSnapshots_v33";
const CACHE_VERSION = "v33-IMMORTAL++-HYPERFRAME";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


let DB_READY = false;
let DB_INSTANCE = null;

// ============================================================================
//  AUTO-INIT ON IMPORT — INTRODUCES ITSELF
// ============================================================================
(async () => {
  try {
    DB_INSTANCE = await openDB();
    DB_READY = true;

    console.log(
      "%c[PULSE-WORLD-CACHESTORE v33] IMMORTAL++ TIMELINE ENGINE READY\n" +
      "→ IndexedDB initialized\n" +
      "→ Store: PulseWorldSnapshots_v33\n" +
      "→ Version: v33-IMMORTAL++-HYPERFRAME\n" +
      "→ Ready for snapshot storage, history, and retrieval",
      "color:#00e0ff;font-weight:bold;font-size:12px;"
    );

  } catch (err) {
    console.error(
      "%c[PULSE-WORLD-CACHESTORE v33] FAILED TO INITIALIZE",
      "color:#ff0044;font-weight:bold;font-size:12px;",
      err
    );
  }
})();

// ============================================================================
//  OPEN DB
// ============================================================================
export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "timestamp" });
        store.createIndex("hash", "hash", { unique: false });
        store.createIndex("version", "version", { unique: false });
      }
    };

    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e);
  });
}

// ============================================================================
//  SAFE HELPERS
// ============================================================================
export function safeObj(v) { return v && typeof v === "object" ? v : {}; }
export function safeArr(v) { return Array.isArray(v) ? v : []; }
export function safeBool(v, fallback = false) { return typeof v === "boolean" ? v : fallback; }
export function safeStr(v, fallback = null) { return typeof v === "string" ? v : fallback; }

// ============================================================================
//  HASH GENERATOR (Integrity)
// ============================================================================
export function generateHash(obj) {
  try {
    const str = JSON.stringify(obj);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return "H" + Math.abs(hash);
  } catch {
    return "H0";
  }
}

// ============================================================================
//  GET LAST SNAPSHOT (Newest)
// ============================================================================
export async function getLastSnapshot() {
  const db = DB_INSTANCE || await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const req = store.openCursor(null, "prev");
    req.onsuccess = e => {
      const cursor = e.target.result;
      resolve(cursor ? cursor.value : null);
    };
    req.onerror = () => resolve(null);
  });
}

// ============================================================================
//  SAVE UNIQUE SNAPSHOT (No duplicates)
// ============================================================================
export async function saveSnapshot(world) {
  const db = DB_INSTANCE || await openDB();
  const hash = generateHash(world);

  const last = await getLastSnapshot();
  if (last && last.hash === hash) return false;

  const packet = {
    version: CACHE_VERSION,
    timestamp: PulseRealm.PulseNOW,
    world,
    hash,
    verified: true
  };

  return new Promise(resolve => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(packet);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
  });
}

// ============================================================================
//  LOAD MOST RECENT WORLD SNAPSHOT (RAW)
// ============================================================================
export async function loadPulseWorldCache_v33() {
  const last = await getLastSnapshot();
  if (!last) return null;

  const hash = generateHash(last.world);
  last.verified = (hash === last.hash);

  return last;
}

// ============================================================================
//  BOOT WORLD (RAW ONLY — NO NORMALIZATION)
// ============================================================================
export async function bootPulseWorld_v33(initialWorld = {}) {
  const cached = await loadPulseWorldCache_v33();

  if (cached && cached.verified) return cached.world;

  const world = initialWorld || {};
  await saveSnapshot(world);
  return world;
}

// ============================================================================
//  GET FULL HISTORY (All snapshots)
// ============================================================================
export async function getPulseWorldHistory_v33() {
  const db = DB_INSTANCE || await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const snapshots = [];
    const req = store.openCursor();

    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        snapshots.push(cursor.value);
        cursor.continue();
      } else {
        resolve(snapshots);
      }
    };

    req.onerror = () => resolve([]);
  });
}

// ============================================================================
//  CLEAR ALL HISTORY
// ============================================================================
export async function clearPulseWorldCache_v33() {
  const db = DB_INSTANCE || await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
  });
}

// ============================================================================
//  GET SNAPSHOT BY TIMESTAMP
// ============================================================================
export async function getSnapshotByTimestamp_v33(timestamp) {
  const db = DB_INSTANCE || await openDB();
  return new Promise(resolve => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(timestamp);

    req.onsuccess = e => resolve(e.target.result || null);
    req.onerror = () => resolve(null);
  });
}
