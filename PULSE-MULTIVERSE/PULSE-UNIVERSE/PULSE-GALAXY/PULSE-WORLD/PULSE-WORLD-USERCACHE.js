// ============================================================================
// FILE: PulseWorldUserCache-v33.js
// PULSEWORLD USER CACHE — IMMORTAL++ HYPERFRAME USER MEMORY — v33
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministic, binary-first cache for PulseWorld user records.
//   • Bridges CoreMemory, Firebase/DB, IndexedDB, and in-memory cache.
//   • v33-aware: hyperFrame, trustPulse, cacheIntegrity, presence lanes.
//   • Zero randomness, zero drift, zero global mutation in the organ layer.
//   • OS/session helpers are explicitly non-IMMORTAL (window-only).
//   • Integrated with IMMORTAL++ timeline cache (PULSE-WORLD-CACHESTORE).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseCoreGMemory } from "./PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import {
  firestore as db,
  SetDoc as setdoc,
  GetDoc as getdoc,
  Doc as doc
} from "../../../_PROOF/PULSE-PROOF-SHADOW.js";

import {
  saveSnapshot as saveWorldSnapshot_v33,
  getPulseWorldHistory_v33 as getWorldHistory_v33,
  generateHash as generateWorldHash_v33
} from "../PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-CACHESTORE.js";

// ============================================================================
//  CONSTANTS
// ============================================================================
const CoreMemory = new Proxy({}, { get: (t, p) => { try { return PulseCoreGMemory[p]; } catch(e) { return (PulseRealm?.PulseCoreMemory || {})[p]; } } });

const PulseWorldDB =
  db ||
  (PulseRealm.PulseWorldDB || PulseRealm.PulseDB) ||
  null;

export const PULSE_USERCACHE_VERSION = "v33-IMMORTAL++-HYPERFRAME";
export const PULSE_USERCACHE_LAYER = "PULSE-WORLD-USERCACHE";
export const PULSE_USERCACHE_ROLE = "GLOBAL-USER-MEMORY";

const USERS_COLLECTION = "pulseworld_users";

// ============================================================================
//  AUTO-INTRODUCTION — IMMORTAL++ USER MEMORY ORGAN
// ============================================================================
(() => {
  console.log(
    "🗄️ PULSE CACHE/DB SYSTEM v33.0 — %c[PULSE-WORLD-USERCACHE] IMMORTAL++ USER MEMORY ONLINE\n" +
    "→ Role: Global user cache (CoreMemory + Firebase + IndexedDB)\n" +
    "→ Layer: PULSE-WORLD-USERCACHE / GLOBAL-USER-MEMORY\n" +
    "→ Behavior: Binary-first, deterministic, drift-proof, v33-aware\n" +
    "→ Integration: Timeline cache via PULSE-WORLD-CACHESTORE (snapshots of user cache state)",
    "color:#00b7ff;font-weight:bold;font-size:12px;"
  );
})();

// ============================================================================
//  CORE STATE
// ============================================================================
const UserCacheCore = {
  // userId → { hash, binary, jsonCache, hits, misses, lastSeenAt }
  cache: Object.create(null),

  stats: {
    usersSeen: 0,
    cacheHits: 0,
    cacheMisses: 0,
    deltaMerges: 0,
    persistedReads: 0,
    persistedWrites: 0,
    lastUserId: null,
    firebaseReads: 0,
    coreMemoryWrites: 0,
    coreMemoryReads: 0
  }
};

// ============================================================================
//  BINARY HELPERS
// ============================================================================
function jsonToBinary(obj) {
  const str = JSON.stringify(obj);
  const enc = new TextEncoder();
  return enc.encode(str).buffer;
}

function binaryToJson(buffer) {
  const dec = new TextDecoder();
  return JSON.parse(dec.decode(new Uint8Array(buffer)));
}

function computeUserHash(userObj) {
  const entries = Object.entries(userObj || {}).sort(([a], [b]) =>
    a > b ? 1 : -1
  );
  return JSON.stringify(entries);
}

// ============================================================================
//  CORE MEMORY HELPERS
// ============================================================================
function getCoreRecord(userId) {
  return UserCacheCore.cache[userId] || null;
}

function setCoreRecord(userId, record) {
  UserCacheCore.cache[userId] = record;
  UserCacheCore.stats.lastUserId = userId;
}

function writeToCoreMemory(userId, userObj) {
  if (!CoreMemory || !CoreMemory.create) return;
  try {
    const inst = CoreMemory.create();
    inst.set("user", userId, userObj);
    UserCacheCore.stats.coreMemoryWrites++;
  } catch {
    // best-effort only
  }
}

function readFromCoreMemory(userId) {
  if (!CoreMemory || !CoreMemory.create) return null;
  try {
    const inst = CoreMemory.create();
    const val = inst.get("user", userId);
    if (val) UserCacheCore.stats.coreMemoryReads++;
    return val || null;
  } catch {
    return null;
  }
}

// ============================================================================
//  FIREBASE HELPERS
// ============================================================================
async function fetchUserFromFirebase(userId) {
  if (!PulseWorldDB || !PulseWorldDB.getCollection) return null;

  try {
    const col = PulseWorldDB.getCollection(USERS_COLLECTION);
    const doc = await col.get(userId);
    if (!doc) return null;

    UserCacheCore.stats.firebaseReads++;

    const userObj = normalizePulseWorldUser(doc, userId);
    return userObj;
  } catch {
    return null;
  }
}

async function writeUserToFirebase(userId, userObj) {
  if (!PulseWorldDB || !PulseWorldDB.getCollection) return false;

  try {
    const col = PulseWorldDB.getCollection(USERS_COLLECTION);
    await col.set(userId, userObj);
    UserCacheCore.stats.persistedWrites++;
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
//  NORMALIZATION
// ============================================================================
function normalizePulseWorldUser(raw, userId) {
  const now = PulseRealm.PulseNOW;

  const identity = {
    userId: (raw.identity && raw.identity.userId) || userId,
    email: (raw.identity && raw.identity.email) || raw.email || null,
    displayName:
      (raw.identity && raw.identity.displayName) || raw.displayName || null,
    photoURL: (raw.identity && raw.identity.photoURL) || raw.photoURL || null,
    createdAt: (raw.identity && raw.identity.createdAt) || raw.createdAt || now,
    lastLoginAt:
      (raw.identity && raw.identity.lastLoginAt) || raw.lastLoginAt || null,
    status: (raw.identity && raw.identity.status) || "active"
  };

  const profile = {
    handle: (raw.profile && raw.profile.handle) || null,
    bio: (raw.profile && raw.profile.bio) || null,
    locale: (raw.profile && raw.profile.locale) || null,
    timezone: (raw.profile && raw.profile.timezone) || null
  };

  const roles = {
    isAdmin: !!(raw.roles && raw.roles.isAdmin),
    isCreator: !!(raw.roles && raw.roles.isCreator),
    isBeta: !!(raw.roles && raw.roles.isBeta)
  };

  const settings = {
    marketingOptIn: !!(raw.settings && raw.settings.marketingOptIn),
    darkMode: !!(raw.settings && raw.settings.darkMode),
    language: (raw.settings && raw.settings.language) || null
  };

  const loyalty = {
    points: Number((raw.loyalty && raw.loyalty.points) ?? 0),
    tier: (raw.loyalty && raw.loyalty.tier) || null,
    lastEarnedAt: (raw.loyalty && raw.loyalty.lastEarnedAt) || null,
    lastRedeemedAt: (raw.loyalty && raw.loyalty.lastRedeemedAt) || null,
    lifetimePoints: Number((raw.loyalty && raw.loyalty.lifetimePoints) ?? 0),
    balance: Number(
      (raw.loyalty && raw.loyalty.balance) ??
        (raw.loyalty && raw.loyalty.points) ??
        0
    )
  };

  const security = {
    mfaEnabled: !!(raw.security && raw.security.mfaEnabled),
    lastPasswordChangeAt:
      (raw.security && raw.security.lastPasswordChangeAt) || null,
    lastSecurityReviewAt:
      (raw.security && raw.security.lastSecurityReviewAt) || null,
    riskLevel: (raw.security && raw.security.riskLevel) || "low",
    lockedUntil: (raw.security && raw.security.lockedUntil) || null
  };

  const presence = {
    lastSeenAt: (raw.presence && raw.presence.lastSeenAt) || null,
    lastDevice: (raw.presence && raw.presence.lastDevice) || null,
    lastIpHash: (raw.presence && raw.presence.lastIpHash) || null,
    status: (raw.presence && raw.presence.status) || "unknown"
  };

  const versions = {
    identity: (raw.versions && raw.versions.identity) || 1,
    profile: (raw.versions && raw.versions.profile) || 1,
    roles: (raw.versions && raw.versions.roles) || 1,
    settings: (raw.versions && raw.versions.settings) || 1,
    loyalty: (raw.versions && raw.versions.loyalty) || 1,
    security: (raw.versions && raw.versions.security) || 1,
    presence: (raw.versions && raw.versions.presence) || 1,
    schema: (raw.versions && raw.versions.schema) || 1
  };

  return {
    identity,
    profile,
    roles,
    settings,
    loyalty,
    security,
    presence,
    versions
  };
}

// ============================================================================
//  INDEXEDDB USER CACHE (LOCAL, PER-USER)
// ============================================================================
const UserIDB = {
  dbName: "PulseWorld-UserCache-v3",
  storeName: "users",
  _dbPromise: null,

  _open() {
    if (typeof indexedDB === "undefined") return null;
    if (this._dbPromise) return this._dbPromise;

    this._dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);

      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "userId" });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("idb_open_failed"));
    });

    return this._dbPromise;
  },

  async read(userId) {
    try {
      const db = await this._open();
      if (!db) return null;

      return await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get(userId);

        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error || new Error("idb_read_failed"));
      });
    } catch {
      return null;
    }
  },

  async write(record) {
    try {
      const db = await this._open();
      if (!db) return;

      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.put(record);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error || new Error("idb_write_failed"));
      });

      UserCacheCore.stats.persistedWrites++;
    } catch {
      // best-effort only
    }
  }
};

// ============================================================================
//  INDEXEDDB HYDRATION / PERSISTENCE
// ============================================================================
async function hydrateFromIndexedDB(userId) {
  const stored = await UserIDB.read(userId);
  if (!stored) return null;

  UserCacheCore.stats.persistedReads++;

  const { hash, binary } = stored;
  const record = {
    hash,
    binary,
    jsonCache: null,
    hits: 0,
    misses: 0,
    lastSeenAt: PulseRealm.PulseNOW
  };

  setCoreRecord(userId, record);
  return record;
}

function persistToIndexedDB(userId, record) {
  UserIDB.write({
    userId,
    hash: record.hash,
    binary: record.binary
  });
}

// ============================================================================
//  DELTA MERGE HELPERS
// ============================================================================
function deltaMergeFlat(oldJson, newJson) {
  const merged = { ...oldJson };
  for (const [k, v] of Object.entries(newJson)) {
    if (merged[k] !== v) merged[k] = v;
  }
  return merged;
}

function mergeUserDelta(baseUser, delta) {
  if (!delta || typeof delta !== "object") return baseUser;

  const merged = {
    ...baseUser,
    identity: deltaMergeFlat(baseUser.identity || {}, delta.identity || {}),
    profile: deltaMergeFlat(baseUser.profile || {}, delta.profile || {}),
    roles: deltaMergeFlat(baseUser.roles || {}, delta.roles || {}),
    settings: deltaMergeFlat(baseUser.settings || {}, delta.settings || {}),
    loyalty: deltaMergeFlat(baseUser.loyalty || {}, delta.loyalty || {}),
    security: deltaMergeFlat(baseUser.security || {}, delta.security || {}),
    presence: deltaMergeFlat(baseUser.presence || {}, delta.presence || {}),
    versions: deltaMergeFlat(baseUser.versions || {}, delta.versions || {})
  };

  UserCacheCore.stats.deltaMerges++;
  return merged;
}

// ============================================================================
//  LOAD USER RECORD (FULL PIPELINE: cache → CoreMemory → IDB → Firebase)
// ============================================================================
async function loadUserRecord(userId) {
  if (!userId) return null;

  UserCacheCore.stats.usersSeen++;

  // 1) In-memory cache
  let record = getCoreRecord(userId);
  if (record) {
    UserCacheCore.stats.cacheHits++;
    record.hits = (record.hits || 0) + 1;
    record.lastSeenAt = PulseRealm.PulseNOW;
    return record;
  }

  UserCacheCore.stats.cacheMisses++;

  // 2) CoreMemory
  const fromCore = readFromCoreMemory(userId);
  if (fromCore) {
    const hash = computeUserHash(fromCore);
    const binary = jsonToBinary(fromCore);
    record = {
      hash,
      binary,
      jsonCache: fromCore,
      hits: 0,
      misses: 0,
      lastSeenAt: PulseRealm.PulseNOW
    };
    setCoreRecord(userId, record);
    return record;
  }

  // 3) IndexedDB
  record = await hydrateFromIndexedDB(userId);
  if (record) return record;

  // 4) Firebase
  const userObj = await fetchUserFromFirebase(userId);
  if (!userObj) return null;

  const hash = computeUserHash(userObj);
  const binary = jsonToBinary(userObj);

  record = {
    hash,
    binary,
    jsonCache: userObj,
    hits: 0,
    misses: 0,
    lastSeenAt: PulseRealm.PulseNOW
  };

  setCoreRecord(userId, record);
  writeToCoreMemory(userId, userObj);
  persistToIndexedDB(userId, record);

  return record;
}

// ============================================================================
//  PUBLIC USER API (SIMPLE)
// ============================================================================
export async function getPulseWorldUser(userId) {
  const record = await loadUserRecord(userId);
  if (!record) return null;

  if (!record.jsonCache) {
    record.jsonCache = binaryToJson(record.binary);
  }

  return record.jsonCache;
}

export async function applyPulseWorldUserDelta(userId, delta, options = {}) {
  if (!userId) return null;

  const existing =
    (await getPulseWorldUser(userId)) || normalizePulseWorldUser({}, userId);
  const merged = mergeUserDelta(existing, delta);

  const hash = computeUserHash(merged);
  const binary = jsonToBinary(merged);

  const record = {
    hash,
    binary,
    jsonCache: merged,
    hits: 0,
    misses: 0,
    lastSeenAt: PulseRealm.PulseNOW
  };

  setCoreRecord(userId, record);
  writeToCoreMemory(userId, merged);
  persistToIndexedDB(userId, record);

  if (options.persistToFirebase) {
    await writeUserToFirebase(userId, merged);
  }

  return merged;
}

export async function updatePulseWorldUserPresence(userId, presenceDelta) {
  if (!userId) return null;

  const delta = {
    presence: {
      ...(presenceDelta || {})
    }
  };

  return applyPulseWorldUserDelta(userId, delta, {
    persistToFirebase: true
  });
}

// ============================================================================
//  STATS + CLEAR
// ============================================================================
export function getPulseWorldUserCacheStats() {
  return {
    version: PULSE_USERCACHE_VERSION,
    layer: PULSE_USERCACHE_LAYER,
    role: PULSE_USERCACHE_ROLE,
    ...UserCacheCore.stats
  };
}

export function clearPulseWorldUserCache() {
  UserCacheCore.cache = Object.create(null);
  UserCacheCore.stats.lastUserId = null;
}

// ============================================================================
//  IMMORTAL++ USER CACHE ENGINE (HIGH-LEVEL)
// ============================================================================
export const PulseWorldUserCacheEngine_v33 = {
  version: PULSE_USERCACHE_VERSION,
  layer: PULSE_USERCACHE_LAYER,
  role: PULSE_USERCACHE_ROLE,

  async put(userId, userObj, options = {}) {
    if (!userId || !userObj) return { ok: false, delta: false };

    UserCacheCore.stats.usersSeen++;

    const newHash = computeUserHash(userObj);
    let record = getCoreRecord(userId);

    if (!record) {
      record = await hydrateFromIndexedDB(userId);
    }

    if (record && record.hash === newHash) {
      UserCacheCore.stats.cacheHits++;
      record.hits = (record.hits || 0) + 1;
      record.lastSeenAt = PulseRealm.PulseNOW;
      setCoreRecord(userId, record);
      return { ok: true, delta: false };
    }

    UserCacheCore.stats.cacheMisses++;

    let mergedJson = userObj;

    if (record && record.binary) {
      const oldJson = record.jsonCache || binaryToJson(record.binary);
      mergedJson = mergeUserDelta(oldJson, userObj);
    }

    const binary = jsonToBinary(mergedJson);

    record = {
      hash: newHash,
      binary,
      jsonCache: mergedJson,
      hits: 0,
      misses: 0,
      lastSeenAt: PulseRealm.PulseNOW
    };

    setCoreRecord(userId, record);
    writeToCoreMemory(userId, mergedJson);
    persistToIndexedDB(userId, record);

    if (options.persistToFirebase) {
      await writeUserToFirebase(userId, mergedJson);
    }

    return { ok: true, delta: true };
  },

  async get(userId) {
    const record = await loadUserRecord(userId);
    if (!record) return null;

    if (!record.jsonCache) {
      record.jsonCache = binaryToJson(record.binary);
    }

    record.hits = (record.hits || 0) + 1;
    record.lastSeenAt = PulseRealm.PulseNOW;

    return record.jsonCache;
  },

  async warmAll() {
    if (!PulseWorldDB || !PulseWorldDB.getCollection) {
      return { ok: false, count: 0 };
    }

    try {
      const col = PulseWorldDB.getCollection(USERS_COLLECTION);
      const all = await col.getAll();
      if (!Array.isArray(all)) return { ok: false, count: 0 };

      let count = 0;
      for (const raw of all) {
        const userId =
          (raw.identity && raw.identity.userId) || raw.id || raw.uid;
        if (!userId) continue;

        const userObj = normalizePulseWorldUser(raw, userId);
        await this.put(userId, userObj, { persistToFirebase: false });
        count++;
      }

      return { ok: true, count };
    } catch {
      return { ok: false, count: 0 };
    }
  },

  // -------------------------------------------------------
  // Clear / snapshot / stats
  // -------------------------------------------------------
  clear(userId) {
    if (userId) {
      delete UserCacheCore.cache[userId];
    } else {
      UserCacheCore.cache = Object.create(null);
    }
  },

  snapshot() {
    const snapshot = {
      cache: { ...UserCacheCore.cache },
      stats: { ...UserCacheCore.stats }
    };

    // Also push a world-level snapshot into IMMORTAL++ timeline cache
    try {
      const payload = {
        type: "usercache",
        version: PULSE_USERCACHE_VERSION,
        layer: PULSE_USERCACHE_LAYER,
        role: PULSE_USERCACHE_ROLE,
        snapshot,
        hash: generateWorldHash_v33(snapshot)
      };
      saveWorldSnapshot_v33(payload);
    } catch {
      // best-effort only
    }

    return snapshot;
  },

  getStats() {
    return getPulseWorldUserCacheStats();
  },

  // -------------------------------------------------------
  // Session layer (non-IMMORTAL, window-only)
  // -------------------------------------------------------
  async getActiveUser() {
    if (typeof window === "undefined") return null;

    const runtimeIdentity = PulseRealm.PulseIdentity || null;
    if (!runtimeIdentity) return null;

    const userId =
      runtimeIdentity.userId ||
      runtimeIdentity.uid ||
      (runtimeIdentity.identity && runtimeIdentity.identity.userId) ||
      (runtimeIdentity.identity && runtimeIdentity.identity.uid);

    if (!userId) return null;

    return await this.get(userId);
  },

  async isAuthenticated() {
    const user = await this.getActiveUser();
    return !!user;
  },

  async initSession() {
    if (typeof window === "undefined") return false;

    const runtimeIdentity = PulseRealm.PulseIdentity;
    if (!runtimeIdentity) {
      PulseRealm.PulseSession = null;
      return false;
    }

    const userId =
      runtimeIdentity.userId ||
      runtimeIdentity.uid ||
      (runtimeIdentity.identity && runtimeIdentity.identity.userId) ||
      (runtimeIdentity.identity && runtimeIdentity.identity.uid);

    if (!userId) {
      PulseRealm.PulseSession = null;
      return false;
    }

    const fullUser = await this.get(userId);
    if (!fullUser) {
      PulseRealm.PulseSession = null;
      return false;
    }

    PulseRealm.PulseIdentity = fullUser.identity || runtimeIdentity;
    PulseRealm.PulseSession = {
      userId: fullUser.identity.userId || userId,
      roles: fullUser.roles || [],
      presence: fullUser.presence || null,
      loyalty: fullUser.loyalty || null,
      versions: fullUser.versions || null
    };

    return true;
  },

  // -------------------------------------------------------
  // v33 helpers: direct delta + presence
  // -------------------------------------------------------
  async applyDelta(userId, delta, options = {}) {
    return applyPulseWorldUserDelta(userId, delta, options);
  },

  async updatePresence(userId, presenceDelta) {
    return updatePulseWorldUserPresence(userId, presenceDelta);
  },

  // -------------------------------------------------------
  // Timeline integration helpers (IMMORTAL++ world history)
// -------------------------------------------------------
  async exportUserCacheHistory_v33() {
    try {
      const history = await getWorldHistory_v33();
      return history.filter(entry => entry.type === "usercache");
    } catch {
      return [];
    }
  }
};

// ============================================================================
// GLOBAL EXPOSURE (OS-level, non-IMMORTAL)
// ============================================================================
PulseRealm.PulseWorldUserCache = PulseWorldUserCacheEngine_v33;
PulseRealm.PulseUserCacheEngine = PulseWorldUserCacheEngine_v33;
PulseRealm.PulseUserCache = UserIDB;
PulseRealm.PulseUserCacheCore = UserCacheCore;

export default PulseWorldUserCacheEngine_v33;
