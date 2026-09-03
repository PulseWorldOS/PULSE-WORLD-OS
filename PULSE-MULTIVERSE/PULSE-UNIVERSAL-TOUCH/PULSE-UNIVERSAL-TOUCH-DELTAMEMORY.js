// DeltaMemoryResolver v62-CORE-ONEBAND-WORLD
// Delta + CoreMemory + IndexedDB cache + Chunk/Prewarm profile + World hints
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
// ROLE v62-CORE-ONEBAND-WORLD:
//   • Delta-based export resolver with CoreMemory envelope.
//   • In-memory + IndexedDB-backed cache (best-effort, no hard dependency).
//   • Chunk/Prewarm profile per module (how “hot” the export is).
//   • OneBand + optional world/binary-field hints (aligned with Port v2 / Power v32).
//   • Deterministic hashing, no timers, no randomness in core path.
//   • Async persistence is fire-and-forget; resolveExport stays sync.
// -------------------------------------------------------------
// DeltaCoreMemoryBridge — integrates PulseCoreMemory (universal)
// -------------------------------------------------------------
import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export  const DeltaCoreMemoryBridge = {
  async read(moduleId) {
    try {
      if (typeof PulseCoreGMemory !== "undefined") {
        return await PulseCoreGMemory.getAsync("deltaMemory", moduleId);
      }
    } catch {}
    return null;
  },

  async write(moduleId, record) {
    try {
      if (typeof PulseCoreGMemory !== "undefined") {
        await PulseCoreGMemory.putAsync("deltaMemory", moduleId, record);
        DeltaCoreMemory.stats.persistedWrites++;
      }
    } catch {
      // best-effort only
    }
  }
};


const DeltaCoreMemory = {
  // moduleId → { hash, exportName, hits, misses, lastChunkPlan }
  cache: Object.create(null),

  // healing / diagnostics
  stats: {
    modulesSeen: 0,
    cacheHits: 0,
    cacheMisses: 0,
    deltaRebuilds: 0,
    persistedWrites: 0,
    persistedReads: 0,
    lastModuleId: null,
    lastExportName: null
  }
};

const DeltaIDB = {
  dbName: "PulseWorld-DeltaMemory-v62",
  storeName: "deltaModules",
  _dbPromise: null,

  _open() {
    if (typeof indexedDB === "undefined") return null;
    if (this._dbPromise) return this._dbPromise;

    this._dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "moduleId" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("idb_open_failed"));
    });

    return this._dbPromise;
  },

  async read(moduleId) {
    try {
      const db = await  this._open();
      if (!db) return null;
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get(moduleId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error || new Error("idb_read_failed"));
      });
    } catch {
      return null;
    }
  },

  async write(record) {
    try {
      const db = await  this._open();
      if (!db) return;
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.put(record);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error || new Error("idb_write_failed"));
      });
      DeltaCoreMemory.stats.persistedWrites++;
    } catch {
      // best-effort only
    }
  }
};

function computeModuleHash_v62(mod) {
  // deterministic: export names + typeof + arity
  const entries = Object.entries(mod || {}).map(([k, v]) => [
    k,
    typeof v,
    typeof v === "function" ? v.length : 0
  ]);
  return JSON.stringify(entries.sort(([a], [b]) => (a > b ? 1 : -1)));
}

function pickCandidateExports_v62(mod) {
  const candidates = [];

  if (mod && typeof mod.default === "function") {
    candidates.push("default");
  }

  // v30 / v40 / v50 / v60 / v62 style
  if (mod && typeof mod.v30 === "function") candidates.push("v30");
  if (mod && typeof mod.v40 === "function") candidates.push("v40");
  if (mod && typeof mod.v50 === "function") candidates.push("v50");
  if (mod && typeof mod.v60 === "function") candidates.push("v60");
  if (mod && typeof mod.v62 === "function") candidates.push("v62");

  if (mod) {
    for (const [name, value] of Object.entries(mod)) {
      if (
        typeof value === "function" &&
        name !== "default" &&
        !/^v[0-9]+$/.test(name) &&
        !/Route$/i.test(name) &&
        !/Bridge$/i.test(name) &&
        !/Barrel$/i.test(name)
      ) {
        candidates.push(name);
      }
    }
  }

  return [...new Set(candidates)];
}

function extractWorldHints_v62(worldState) {
  if (!worldState || typeof worldState !== "object") {
    return {
      worldRuntimeHints: null,
      worldBinaryHints: null
    };
  }

  const runtimeState = worldState.runtimeState || null;
  const binaryField = worldState.binaryField || null;

  const worldRuntimeHints = runtimeState
    ? {
        tick: runtimeState.tick ?? null,
        logicalClock: runtimeState.logicalClock ?? null,
        bandUsage: runtimeState.bandUsage ?? null
      }
    : null;

  const worldBinaryHints = binaryField
    ? {
        pageId: binaryField.pageId ?? null,
        route: binaryField.route ?? null,
        lanes: binaryField.lanes ?? null
      }
    : null;

  return { worldRuntimeHints, worldBinaryHints };
}

function buildChunkPrewarmPlan_v62(moduleId, mod, exportName, hash, worldState) {
  const exportsCount = Object.keys(mod || {}).length;
  const fnCount = Object.values(mod || {}).filter(v => typeof v === "function").length;

  const basePriority =
    fnCount >= 16 ? 4 :
    fnCount >= 8  ? 3 :
    fnCount >= 4  ? 2 :
    fnCount > 0   ? 1 :
    0;

  const density = exportsCount + fnCount * 2;
  const shiftDepth = Math.max(0, Math.floor(Math.log2(density || 1)));

  const worldHints = extractWorldHints_v62(worldState);

  return {
    planVersion: "DeltaMemory-v62-Chunk-OneBand-World",
    moduleId,
    exportName,
    hash,
    priority: basePriority,
    density,
    shiftDepth,
    band: "oneband",
    chunks: {
      moduleEnvelope: true,
      exportSurface: true,
      healingState: true
    },
    cache: {
      coreMemory: true,
      indexedDb: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: basePriority >= 2,
      lymphNodes: basePriority >= 3
    },
    worldRuntimeHints: worldHints.worldRuntimeHints,
    worldBinaryHints: worldHints.worldBinaryHints
  };
}

function getCoreRecord(moduleId) {
  return DeltaCoreMemory.cache[moduleId] || null;
}

function setCoreRecord(moduleId, record) {
  DeltaCoreMemory.cache[moduleId] = record;
  DeltaCoreMemory.stats.lastModuleId = moduleId;
  DeltaCoreMemory.stats.lastExportName = record.exportName || null;
}

async function hydrateRecord(moduleId) {
  // 1) Try CoreMemory first (universal)
  const coreRecord = await DeltaCoreMemoryBridge.read(moduleId);
  if (coreRecord) {
    setCoreRecord(moduleId, coreRecord);
    DeltaCoreMemory.stats.persistedReads++;
    return coreRecord;
  }

  // 2) Try IndexedDB (browser-only)
  const stored = await DeltaIDB.read(moduleId);
  if (stored) {
    DeltaCoreMemory.stats.persistedReads++;
    setCoreRecord(moduleId, stored);

    // mirror into CoreMemory
    DeltaCoreMemoryBridge.write(moduleId, stored);

    return stored;
  }

  return null;
}


function persistToIndexedDB(moduleId, record) {
  // fire-and-forget
  DeltaIDB.write({
    moduleId,
    hash: record.hash,
    exportName: record.exportName,
    hits: record.hits || 0,
    misses: record.misses || 0,
    lastChunkPlan: record.lastChunkPlan || null
  });
}

export const DeltaMemoryResolver_v62 = {
  /**
   * resolveExport
   * @param {string} moduleId
   * @param {object} mod
   * @param {(fn: Function) => boolean|Promise<boolean>} tester
   * @param {object|null} worldState  // optional, aligns with ProtocolPort/Power
   * @returns {{ fn: Function|null, exportName: string|null, chunkPlan: object|null }}
   */
  resolveExport(moduleId, mod, tester, worldState = null) {
    DeltaCoreMemory.stats.modulesSeen++;

    const hash = computeModuleHash_v62(mod);
    let record = getCoreRecord(moduleId);

    // try to hydrate from IndexedDB if we have nothing in memory
    if (!record) {
      // async hydrate; we don't await, but it may warm future calls
      hydrateRecord(moduleId);
    }

    // cache hit with same hash
    if (
      record &&
      record.hash === hash &&
      mod &&
      typeof mod[record.exportName] === "function"
    ) {
      DeltaCoreMemory.stats.cacheHits++;
      record.hits = (record.hits || 0) + 1;

      const chunkPlan =
        record.lastChunkPlan ||
        buildChunkPrewarmPlan_v62(moduleId, mod, record.exportName, hash, worldState);

      record.lastChunkPlan = chunkPlan;
      setCoreRecord(moduleId, record);
      // browser mirror
      persistToIndexedDB(moduleId, record);

      // universal persistence
      DeltaCoreMemoryBridge.write(moduleId, record);

      return {
        fn: record.exportName === "default" ? mod.default : mod[record.exportName],
        exportName: record.exportName,
        chunkPlan
      };
    }

    // delta rebuild
    DeltaCoreMemory.stats.cacheMisses++;
    DeltaCoreMemory.stats.deltaRebuilds++;

    const candidates = pickCandidateExports_v62(mod);

    for (const exportName of candidates) {
      const fn = exportName === "default" ? mod.default : mod[exportName];
      if (typeof fn !== "function") continue;

      try {
        const result = tester ? tester(fn) : true;
        // allow async tester but don't await here; caller can wrap if needed
        if (result instanceof Promise) {
          // caller may choose to await externally; we still accept this candidate
        }

        const chunkPlan = buildChunkPrewarmPlan_v62(
          moduleId,
          mod,
          exportName,
          hash,
          worldState
        );

        record = {
          hash,
          exportName,
          hits: 0,
          misses: 0,
          lastChunkPlan: chunkPlan
        };

        setCoreRecord(moduleId, record);
        persistToIndexedDB(moduleId, record);

        return { fn, exportName, chunkPlan };
      } catch {
        // tester rejected; try next candidate
        continue;
      }
    }

    // nothing worked; clear cache for safety
    delete DeltaCoreMemory.cache[moduleId];

    const failPlan = buildChunkPrewarmPlan_v62(moduleId, mod || {}, null, hash, worldState);
    failPlan.priority = 0;

    return { fn: null, exportName: null, chunkPlan: failPlan };
  },

  clear(moduleId) {
    if (moduleId) {
      delete DeltaCoreMemory.cache[moduleId];
    } else {
      DeltaCoreMemory.cache = Object.create(null);
    }
  },

  getCoreMemorySnapshot() {
    return {
      cache: { ...DeltaCoreMemory.cache },
      stats: { ...DeltaCoreMemory.stats }
    };
  }
};

PulseRealm.PulseDeltaMemory = DeltaMemoryResolver_v62;