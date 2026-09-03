/* ============================================================================
   PULSE-WORLD ORGAN — PulseWorldShadow (v33-IMMORTAL-MULTIBAND)
   Unified FRONTEND SHADOW organ for:
     • Firebase-style maps ( IndexedDB)
     • World snapshots (organism + per-system)
     • JSON “FS” storage
     • Offline-first outbound queues (3rd-party aware)
     • Network/mesh routing adapters (route/direct/mesh)
     • Multi-band (symbolic/binary/dual) awareness

   ROLE:
     - Canonical WORLD SHADOW for:
         • Portal / Logger / Touch / RouteCarpet / SDN / UI
     - Provides:
         • Firestore-like API (Doc/Collection/Get/Set/Update)
         • Storage-like API (UploadString / JSON FS)
         • Outbound queue with provider hints (email/sms/bank/firebase/etc.)
         • Route/direct/mesh fetch adapters
     - Never requires 3rd-party SDKs on the frontend
     - Safe in no-network, no-Firebase, no-ServiceWorker environments

   VERSION:
     /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseWorldShadow-v33.js
============================================================================ */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

const C_ID   = "color:#7FH9CH; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";


console.log("📜 PULSE PROOF MONITOR v30.0 — [PulseProofShadow v33] Shadow Fading Loaded → Mirror Reflection Initiated!"
);

// ---------------------------------------------------------------------------
// GLOBAL HANDLE + SOFT ORGANS
// ---------------------------------------------------------------------------



// Soft references (backend / registry / providers — NOT used directly here,
// only for tagging outbound queue entries so backend knows what to do)
const PulseWorldBank             = PulseRealm.PulseWorldBank             || null;
const PulseWorldEmailAlert       = PulseRealm.PulseWorldEmailAlert       || null;
const PulseWorldSMSAlert         = PulseRealm.PulseWorldSMSAlert         || null;
const PulseWorldFirebaseGenome   = PulseRealm.PulseWorldFirebaseGenome   || null;
const PulseCompiler              = PulseRealm.PulseCompiler              || null;
const PulseCLIWorker             = PulseRealm.PulseCLIWorker             || null;
const PulseEmailTemplateRegistry = PulseRealm.PulseEmailTemplateRegistry || null;

// ---------------------------------------------------------------------------
// META
// ---------------------------------------------------------------------------
export const PulseWorldShadowMeta = Object.freeze({
  identity: "PulseWorldShadow-v33-IMMORTAL-MULTIBAND",
  layer: "PulseWorldShadow",
  role: "WORLD_SHADOW",
  version: "33.0-IMMORTAL-MULTIBAND",
  evo: {
    deterministicField: true,
    unifiedAdvantageField: true,
    driftProof: true,
    multiInstanceReady: true,
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    presenceAware: true,
    bandAware: true,
    worldAware: true,
    zeroExternalMutation: true,
    zeroRoutingInfluence: true,
    safeRouteFree: true,
    offlineFirst: true,
    indexedDBAware: true,
    serviceWorkerAware: true,
    meshRouteAware: true,
    sdnAware: true,
    errorSpineAware: true,
    endpointAware: true,
    providerHintAware: true
  }
});

// Backwards-compat alias for old name
export const PulseWorldShadowMeshMeta = PulseWorldShadowMeta;

// ---------------------------------------------------------------------------
// TIME HELPERS
// ---------------------------------------------------------------------------
function nowEpoch() {
  return PulseRealm.PulseNOW;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function hourKeyISO() {
  return new Date().toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
}

// ---------------------------------------------------------------------------
// COLLECTION NAMES (MAP MIRROR)
// ---------------------------------------------------------------------------
const COL_PAGE_ROUTES       = "pulse_page_routes";
const COL_ORGANISM_SNAPSHOT = "pulse_organism_snapshot";
const COL_LOGS              = "pulse_logs";
const COL_SYSTEM_SNAPSHOTS  = "pulse_system_snapshots";
const FS_JSON_ROOT          = "pulse_json_storage";
const COL_OUTBOUND_QUEUE    = "pulse_outbound_queue"; // queued network ops

// ---------------------------------------------------------------------------
// SYSTEM DOC IDS
// ---------------------------------------------------------------------------
function systemLatestId(systemName) {
  return `${systemName}::latest`;
}

function systemHistoryId(systemName, epoch) {
  return `${systemName}::history::${epoch}`;
}

function hash(s) {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
}

async function readCollection(collection) {
  const record = await idbGet(IDB_STORE_MAPS, collection);
  return record && Array.isArray(record.docs) ? record.docs : [];
}

async function writeCollectionWithDelta(collection, newArr) {
  const oldRecord = await idbGet(IDB_STORE_MAPS, collection);
  const oldArr = oldRecord && Array.isArray(oldRecord.docs) ? oldRecord.docs : [];

  const delta = [];
  const index = new Map(oldArr.map(x => [x.id, x]));

  for (const doc of newArr) {
    const old = index.get(doc.id);
    if (!old || JSON.stringify(old) !== JSON.stringify(doc)) {
      delta.push(doc);
    }
  }

  if (delta.length > 0) {
    await idbPut(IDB_STORE_MAPS, { key: collection, docs: newArr });

    PulseRealm.dispatchEvent(
      new CustomEvent("firebase_delta_out", {
        detail: { collection, delta }
      })
    );
  }

  return delta;
}


async function getDocument(collection, id) {
  const arr = await readCollection(collection);
  return arr.find(x => x.id === id) || null;
}

async function setDocument(collection, id, value) {
  const arr = await readCollection(collection);
  const idx = arr.findIndex(x => x.id === id);

  if (idx >= 0) arr[idx] = { ...value, id };
  else arr.push({ ...value, id });

  return writeCollectionWithDelta(collection, arr);
}

async function writeFsFile(path, content) {
  await idbPut(IDB_STORE_FS, { path, content });

  PulseRealm.dispatchEvent(
    new CustomEvent("firebase_fs_delta_out", {
      detail: { path, content }
    })
  );
}

async function readFsFile(path) {
  const record = await idbGet(IDB_STORE_FS, path);
  return record ? record.content : null;
}


// ---------------------------------------------------------------------------
// INDEXEDDB MIRROR (v33) — optional, best-effort
// ---------------------------------------------------------------------------
const IDB_DB_NAME = "PulseProofShadowDB";
const IDB_DB_VERSION = 1;
const IDB_STORE_MAPS = "maps";
const IDB_STORE_FS   = "fs";
const IDB_STORE_QUEUE = "queue";

let idbPromise = null;

function openIDB() {
  if (idbPromise) return idbPromise;
  if (typeof indexedDB === "undefined") {
    idbPromise = Promise.resolve(null);
    return idbPromise;
  }

  idbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_DB_NAME, IDB_DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE_MAPS)) {
          db.createObjectStore(IDB_STORE_MAPS, { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains(IDB_STORE_FS)) {
          db.createObjectStore(IDB_STORE_FS, { keyPath: "path" });
        }
        if (!db.objectStoreNames.contains(IDB_STORE_QUEUE)) {
          db.createObjectStore(IDB_STORE_QUEUE, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });

  return idbPromise;
}

async function idbPut(storeName, value) {
  const db = await  openIDB();
  if (!db) return;
  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put(value);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

async function idbGet(storeName, key) {
  const db = await  openIDB();
  if (!db) return null;
  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbGetAll(storeName) {
  const db = await  openIDB();
  if (!db) return [];
  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

async function mirrorMapToIDB(collection) {
  const arr = readCollection(collection);
  await idbPut(IDB_STORE_MAPS, { key: collection, docs: arr });
}

async function mirrorFsToIDB(path, content) {
  await idbPut(IDB_STORE_FS, { path, content });
}

// ---------------------------------------------------------------------------
// OUTBOUND QUEUE (v33) — offline-first network ops + provider hints
// ---------------------------------------------------------------------------
function queueOutbound(op) {
  try {
    const arr = readCollection(COL_OUTBOUND_QUEUE);
    const id = `${nowEpoch()}-${Math.random().toString(16).slice(2)}`;

    // Provider hint enrichment (non-authoritative, just hints for backend)
    const providerHints = {
      bank: !!PulseWorldBank,
      email: !!PulseWorldEmailAlert,
      sms: !!PulseWorldSMSAlert,
      firebaseGenome: !!PulseWorldFirebaseGenome,
      compiler: !!PulseCompiler,
      cliWorker: !!PulseCLIWorker,
      emailTemplateRegistry: !!PulseEmailTemplateRegistry
    };

    const entry = {
      id,
      op,
      epoch: nowEpoch(),
      providerHints
    };

    arr.push(entry);
    writeCollectionWithDelta(COL_OUTBOUND_QUEUE, arr);
    idbPut(IDB_STORE_QUEUE, entry);

    try {
      PulseRealm.ProtocolSignalPort.emit("shadow.outbound.queued", {
        id,
        kind: op.kind || "unknown",
        providerHints
      });
    } catch {}

    PulseRealm.dispatchEvent(new CustomEvent("pulse_outbound_queued", { detail: entry }));
    return entry;
  } catch {
    return null;
  }
}

function loadOutboundQueue() {
  return readCollection(COL_OUTBOUND_QUEUE);
}

function saveOutboundQueue(arr) {
  writeCollectionWithDelta(COL_OUTBOUND_QUEUE, arr);
}

// ---------------------------------------------------------------------------
// NETWORK / MESH ADAPTERS (v33)
// ---------------------------------------------------------------------------
function isOnline() {
  if (typeof navigator === "undefined") return true;
  if (typeof navigator.onLine !== "boolean") return true;
  return navigator.onLine;
}

// Primary adapter: route-based fetch
export function getRouteFetchAPI({ trace = false, routes } = {}) {
  const log = (msg, data) => trace && PulseRealm.PulseLog(
  "proof",`[Shadow:route-fetch] ${msg}`, data);

  const meta = Object.freeze({
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER_ROUTE",
    version: "33.0-IMMORTAL-MULTIBAND",
    evo: {
      deterministicField: true,
      unifiedAdvantageField: true,
      driftProof: true,
      multiInstanceReady: true,
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      worldAware: true,
      zeroExternalMutation: true,
      safeRouteFree: false
    }
  });

  async function fetchViaRoute(url, options = {}) {
    PulseRealm.PulseLog(
  "proof","fetchViaRoute", { url, options });

    if (!isOnline()) {
      const queued = queueOutbound({ kind: "route_fetch", url, options });
      return Object.freeze({
        ok: false,
        offline: true,
        queued,
        meta
      });
    }

    try {
      const route = await routes.resolve(url);
      const opts = {
        method: options.method || "GET",
        headers: Object.assign({}, options.headers || {}),
        body: options.body || null
      };
      const result = await routes.fetchThroughRoute(route, opts);
      return Object.freeze({ ...result, meta });
    } catch (err) {
      const queued = queueOutbound({ kind: "route_fetch", url, options, error: err.message });
      return Object.freeze({
        ok: false,
        error: err.message || "fetch_via_route_failed",
        queued,
        meta
      });
    }
  }

  return Object.freeze({
    fetch: fetchViaRoute,
    meta
  });
}

// Direct fetch adapter (no routes, pure PulseRealm.fetch)
export function getDirectFetchAPI({ trace = false } = {}) {
  const log = (msg, data) => trace && PulseRealm.PulseLog(
  "proof",`[Shadow:direct-fetch] ${msg}`, data);

  const meta = Object.freeze({
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER_DIRECT",
    version: "33.0-IMMORTAL-MULTIBAND",
    evo: {
      deterministicField: true,
      driftProof: true,
      offlineFirst: true,
      zeroExternalMutation: true
    }
  });

  async function fetchDirect(url, options = {}) {
    PulseRealm.PulseLog(
  "proof","fetchDirect", { url, options });

    if (!isOnline() || typeof fetch === "undefined") {
      const queued = queueOutbound({ kind: "direct_fetch", url, options });
      return Object.freeze({
        ok: false,
        offline: true,
        queued,
        meta
      });
    }

    try {
      const res = await fetch(url, options);
      const text = await res.text();
      return Object.freeze({
        ok: res.ok,
        status: res.status,
        headers: {}, // simplified
        body: text,
        meta
      });
    } catch (err) {
      const queued = queueOutbound({ kind: "direct_fetch", url, options, error: err.message });
      return Object.freeze({
        ok: false,
        error: err.message || "fetch_direct_failed",
        queued,
        meta
      });
    }
  }

  return Object.freeze({
    fetch: fetchDirect,
    meta
  });
}

// ServiceWorker / Mesh adapter hook (placeholder, pluggable)
export function getMeshFetchAPI({ trace = false, mesh } = {}) {
  const log = (msg, data) => trace && PulseRealm.PulseLog(
  "proof",`[Shadow:mesh-fetch] ${msg}`, data);

  const meta = Object.freeze({
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER_MESH",
    version: "33.0-IMMORTAL-MULTIBAND",
    evo: {
      meshRouteAware: true,
      sdnAware: true,
      offlineFirst: true,
      zeroExternalMutation: true
    }
  });

  async function fetchViaMesh(url, options = {}) {
    PulseRealm.PulseLog(
  "proof","fetchViaMesh", { url, options });

    if (!mesh || typeof mesh.fetch !== "function") {
      const queued = queueOutbound({ kind: "mesh_fetch", url, options });
      return Object.freeze({
        ok: false,
        offline: true,
        queued,
        meta
      });
    }

    try {
      const result = await mesh.fetch(url, options);
      return Object.freeze({ ...result, meta });
    } catch (err) {
      const queued = queueOutbound({ kind: "mesh_fetch", url, options, error: err.message });
      return Object.freeze({
        ok: false,
        error: err.message || "fetch_via_mesh_failed",
        queued,
        meta
      });
    }
  }

  return Object.freeze({
    fetch: fetchViaMesh,
    meta
  });
}

(async function shadowFirstRunClear() {
  try {
    const FLAG_KEY = "__PULSE_WORLD_SHADOW_CLEARED_V33__";

    // Check flag in IndexedDB
    const flag = await idbGet(IDB_STORE_FS, FLAG_KEY);
    if (flag && flag.value === 1) return;

    // Clear all shadow stores
    const db = await  openIDB();
    if (!db) return;

    const stores = [IDB_STORE_MAPS, IDB_STORE_FS, IDB_STORE_QUEUE];

    for (const storeName of stores) {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).clear();
    }

    // Write flag
    await idbPut(IDB_STORE_FS, { path: FLAG_KEY, value: 1 });

    PulseRealm.PulseLog(
  "proof","🔥 [PulseWorldShadow] First-run IndexedDB clear complete (v33)");
  } catch (err) {
    console.error("[PulseWorldShadow] First-run clear FAILED →", err);
  }
})();

// ---------------------------------------------------------------------------
// CORE SHADOW ORGAN (v33)
// ---------------------------------------------------------------------------
export const PulseWorldShadow = Object.freeze({

  meta: PulseWorldShadowMeta,

  async savePageRoutes(page, routes) {
  try {
    await setDocument(COL_PAGE_ROUTES, page, {
      routes,
      epoch: nowEpoch(),
      day: todayISO()
    });

    await idbPut(IDB_STORE_MAPS, {
      key: COL_PAGE_ROUTES,
      docs: await readCollection(COL_PAGE_ROUTES)
    });

    PulseRealm.ProtocolSignalPort.emit("shadow.pageRoutes.save", { page });
    PulseRealm.PulseLog(
  "proof","[PulseWorldShadow] Saved page routes →", page);
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED savePageRoutes →", err);
  }
},

  async loadPageRoutes(page) {
  try {
    const doc = await getDocument(COL_PAGE_ROUTES, page);
    if (doc) return doc;

    const idbDoc = await idbGet(IDB_STORE_MAPS, COL_PAGE_ROUTES);
    if (!idbDoc) return null;

    return idbDoc.docs.find(x => x.id === page) || null;
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED loadPageRoutes →", err);
    return null;
  }
},

  async saveOrganismSnapshot(snapshot) {
  try {
    await setDocument(COL_ORGANISM_SNAPSHOT, "daily", {
      snapshot,
      epoch: nowEpoch(),
      day: todayISO()
    });

    await idbPut(IDB_STORE_MAPS, {
      key: COL_ORGANISM_SNAPSHOT,
      docs: await readCollection(COL_ORGANISM_SNAPSHOT)
    });

    PulseRealm.ProtocolSignalPort.emit("shadow.organism.save", { day: todayISO() });
    PulseRealm.PulseLog(
  "proof","[PulseWorldShadow] Saved organism snapshot");
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED saveOrganismSnapshot →", err);
  }
},

  async loadOrganismSnapshot() {
  try {
    const doc = await getDocument(COL_ORGANISM_SNAPSHOT, "daily");
    if (doc) return doc;

    const idbDoc = await idbGet(IDB_STORE_MAPS, COL_ORGANISM_SNAPSHOT);
    if (!idbDoc) return null;

    return idbDoc.docs.find(x => x.id === "daily") || null;
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED loadOrganismSnapshot →", err);
    return null;
  }
},

  async logEvent(type, payload) {
  try {
    const arr = await readCollection(COL_LOGS);

    const entry = {
      id: `${nowEpoch()}-${Math.random().toString(16).slice(2)}`,
      type,
      payload,
      epoch: nowEpoch(),
      hour: hourKeyISO()
    };

    arr.push(entry);

    await writeCollectionWithDelta(COL_LOGS, arr);

    await idbPut(IDB_STORE_MAPS, {
      key: COL_LOGS,
      docs: arr
    });

    queueOutbound({ kind: "log_event", entry });

    PulseRealm.ProtocolSignalPort.emit("shadow.log.event", { type, hour: entry.hour });
    PulseRealm.PulseLog(
  "proof","[PulseWorldShadow] Logged event →", type);
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED logEvent →", err);
  }
},

  async saveSystemSnapshot(systemName, snapshot, { keepHistory = false } = {}) {
  try {
    const latestId = systemLatestId(systemName);

    await setDocument(COL_SYSTEM_SNAPSHOTS, latestId, {
      system: systemName,
      snapshot,
      epoch: nowEpoch(),
      day: todayISO()
    });

    if (keepHistory) {
      const histId = systemHistoryId(systemName, nowEpoch());
      await setDocument(COL_SYSTEM_SNAPSHOTS, histId, {
        system: systemName,
        snapshot,
        epoch: nowEpoch(),
        day: todayISO()
      });
    }

    await idbPut(IDB_STORE_MAPS, {
      key: COL_SYSTEM_SNAPSHOTS,
      docs: await readCollection(COL_SYSTEM_SNAPSHOTS)
    });

    PulseRealm.ProtocolSignalPort.emit("shadow.system.save", { system: systemName });
    PulseRealm.PulseLog(
  "proof",`[PulseWorldShadow] Saved system snapshot → ${systemName}`);
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED saveSystemSnapshot →", err);
  }
},

  async loadSystemSnapshot(systemName) {
  try {
    const doc = await getDocument(COL_SYSTEM_SNAPSHOTS, systemLatestId(systemName));
    if (doc) return doc;

    const idbDoc = await idbGet(IDB_STORE_MAPS, COL_SYSTEM_SNAPSHOTS);
    if (!idbDoc) return null;

    return idbDoc.docs.find(x => x.id === systemLatestId(systemName)) || null;
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED loadSystemSnapshot →", err);
    return null;
  }
},

  async saveJSON(path, obj) {
  try {
    const fullPath = `${FS_JSON_ROOT}/${path}`;
    const content = JSON.stringify(obj);

    await writeFsFile(fullPath, content);
    await idbPut(IDB_STORE_FS, { path: fullPath, content });

    PulseRealm.ProtocolSignalPort.emit("shadow.json.save", { path });
    PulseRealm.PulseLog(
  "proof","[PulseWorldShadow] Saved JSON →", path);
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED saveJSON →", err);
  }
},

  async loadJSON(path) {
  try {
    const fullPath = `${FS_JSON_ROOT}/${path}`;

    const idbEntry = await idbGet(IDB_STORE_FS, fullPath);
    if (!idbEntry || !idbEntry.content) return null;

    try { return JSON.parse(idbEntry.content); }
    catch { return null; }
  } catch (err) {
    console.error("[PulseWorldShadow] FAILED loadJSON →", err);
    return null;
  }
},

  async getOutboundQueue() {
  try {
    const idbArr = await idbGetAll(IDB_STORE_QUEUE);
    return { idb: idbArr };
  } catch {
    return { idb: [] };
  }
}
});

// Backwards-compat alias for old name
export const PulseWorldShadowMesh = PulseWorldShadow;

// ---------------------------------------------------------------------------
// FIRESTORE-LIKE SHADOW API (Doc/Collection/Get/Set/Update)
// ---------------------------------------------------------------------------
export const firestore = {
  _type: "shadow-firestore-v33"
};

export function Doc(_firestore, collection, id) {
  return { collection, id };
}

export function Collection(_firestore, collection) {
  return collection;
}

export async function GetDoc(docRef) {
  const { collection, id } = docRef;
  const data = getDocument(collection, id);
  return {
    exists: () => !!data,
    data: () => data
  };
}

export async function SetDoc(docRef, value) {
  const { collection, id } = docRef;
  setDocument(collection, id, value);
  await mirrorMapToIDB(collection);
}

export async function UpdateDoc(docRef, value) {
  const { collection, id } = docRef;
  const existing = getDocument(collection, id) || {};
  setDocument(collection, id, { ...existing, ...value });
  await mirrorMapToIDB(collection);
}

// ---------------------------------------------------------------------------
// STORAGE-LIKE SHADOW API
// ---------------------------------------------------------------------------
export const Storage = {
  _type: "shadow-storage-v33"
};

export function StorageRef(_storage, path) {
  return { path };
}

export async function UploadString(ref, content) {
  const fullPath = ref.path;
  writeFsFile(fullPath, content);
  await mirrorFsToIDB(fullPath, content);
}

// ---------------------------------------------------------------------------
// UNIVERSAL GLOBAL SURFACE BINDINGS
// ---------------------------------------------------------------------------
const ShadowDB = {
  getDocument,
  setDocument,
  readCollection,
  writeCollectionWithDelta
};

const ShadowFirestore = firestore;
const ShadowStorage = Storage;

const ShadowHelpers = {
  Doc,
  Collection,
  GetDoc,
  SetDoc,
  UpdateDoc,
  StorageRef,
  UploadString
};

const GLOBAL_SURFACES = [
  PulseRealm.PulseGlobalNow,PulseRealm,
  typeof globalThis !== "undefined" ? globalThis : null,
  typeof window !== "undefined" ? window : null,
  typeof self !== "undefined" ? self : null,
  typeof global !== "undefined" ? global : null
].filter(Boolean);

for (const surf of GLOBAL_SURFACES) {
  try {
    surf.db = ShadowDB;
    surf.firestore = ShadowFirestore;

    surf.Doc = Doc;
    surf.Collection = Collection;
    surf.GetDoc = GetDoc;
    surf.SetDoc = SetDoc;
    surf.UpdateDoc = UpdateDoc;

    // Network adapters
    surf.fetchfnRoute  = getRouteFetchAPI;
    surf.fetchfnDirect = getDirectFetchAPI;
    surf.fetchfnMesh   = getMeshFetchAPI;

    surf.Storage = ShadowStorage;
    surf.StorageRef = StorageRef;
    surf.UploadString = UploadString;

    // Canonical world shadow
    surf.PulseWorldShadow = PulseWorldShadow;

    // Backwards-compat
    surf.PulseWorldShadowMesh = PulseWorldShadow;
  } catch {}
}

console.log("📜 PULSE PROOF MONITOR v30.0 — [PulseProofShadow v33] WORLD SHADOW Organ → Ready (INDEXEDDB + DELTA + MESH ADAPTERS + PROVIDER HINTS)"
);
