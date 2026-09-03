// ============================================================================
//  PulseChunks-v32-IMMORTAL++-BINARY-ONEBAND-WORLD
//  FRONTEND CHUNK MEMBRANE — 2026 Transport Layer (UPGRADED v32)
//  • Binary-only cache (Blob / ArrayBuffer / Uint8Array)
//  • IndexedDB-only persistence (no localStorage, no JSON schema drift)
//  • 32-lane CNS router (hash-routed, presence-aware)
//  • One-band semantics: band="chunk_binary"
//  • Universal de-chunking via PulseChunkNormalizer
//  • v32: world-aware tags (ProtocolPort/Power alignment) — non-breaking, additive
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseTouchStorageV32 } from "./PULSE-UNIVERSAL-TOUCH-STORAGE.js";
import { DeltaMemoryResolver_v62, DeltaCoreMemoryBridge } from "./PULSE-UNIVERSAL-TOUCH-DELTAMEMORY.js";
import {PulseChunkNormalizer} from "./PULSE-UNIVERSAL-TOUCH-MYPULSECHUNKS.js";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const CACHE_TTL_MS = WEEK_MS;
const LANE_COUNT = 32;
const LANE_MASK = LANE_COUNT - 1;
const DB_NAME = "PulseTouchChunksDB";
const STORE_NAME = "chunks_v32_binary";
const MAX_FAILURES_PER_URL = 3;
const MAX_GLOBAL_FAILURES = 20;

let chunksDegraded = false;
let globalFailures = 0;
  
// ============================================================================
//  PULSE CHUNK DB — SYNCHRONOUS-SAFE INITIALIZER (v40)
// ============================================================================
// Unified opener: safe in browser, harmless elsewhere
// Boot-time DB promise (no top-level await)
const dbPromise = _openPulseChunksDB_v40();


// IndexedDB open wrapped in a clean promise, now with CoreMemory integration
function _openPulseChunksDB_v40() {
  return (async () => {
    // 1) Try CoreMemory first
    if (typeof DeltaCoreMemoryBridge !== "undefined") {
      try {
        const stored = await DeltaCoreMemoryBridge.getAsync("pulseChunksDB", "db");
        if (stored && stored.db) {
          return stored.db;
        }
      } catch {}
    }

    // 2) Fallback to IndexedDB (browser/PWA only)
    if (typeof indexedDB === "undefined") {
      return null;
    }

    const db = await new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);

      req.onupgradeneeded = () => {
        const upgradeDB = req.result;
        if (!upgradeDB.objectStoreNames.contains(STORE_NAME)) {
          upgradeDB.createObjectStore(STORE_NAME, { keyPath: "url" });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(req.error || new Error("pulse_chunks_idb_open_failed_v40"));
    });

    // 3) Mirror into CoreMemory (best‑effort)
    if (typeof DeltaCoreMemoryBridge !== "undefined") {
      try {
        DeltaCoreMemoryBridge.putAsync("pulseChunksDB", "db", { db });
      } catch {}
    }

    return db;
  })();
}


// ============================================================================
//  PulseChunksFailures — Deterministic Failure Registry
// ============================================================================
  const _failures = new Map();

  const PulseChunksFailures = {
    
    // Get failure count for a URL
    get(url) {
      return _failures.get(url) || 0;
    },

    // Set failure count explicitly
    set(url, count) {
      _failures.set(url, count >>> 0); // force uint
      return count;
    },

    // Increment failure count
    increment(url) {
      const next = (_failures.get(url) || 0) + 1;
      _failures.set(url, next);
      return next;
    },

    // Delete a specific URL entry
    delete(url) {
      return _failures.delete(url);
    },

    // Clear all failures
    clear() {
      _failures.clear();
    },

    // Iteration helpers
    entries() {
      return _failures.entries();
    },

    keys() {
      return _failures.keys();
    },

    values() {
      return _failures.values();
    },

    // Convert to plain object for persistence
    toObject() {
      const obj = {};
      for (const [url, count] of _failures.entries()) {
        obj[url] = count;
      }
      return obj;
    },

    // Restore from plain object
    fromObject(obj) {
      _failures.clear();
      for (const url in obj) {
        const count = obj[url] >>> 0;
        _failures.set(url, count);
      }
    }
  };

  // Expose globally
  PulseRealm.PulseChunksFailures = PulseChunksFailures;
  PulseRealm.PulseChunksFailuresCache = _failures;


// In-memory mirror of all chunks (fast lookup, debugging, warmup)
const memoryMirror = Object.create(null);
PulseRealm.PulseChunksMemoryMirror = memoryMirror;

const chunkCache = {
  async get(url) {
   // 1 — Fast path: memory mirror
    if (memoryMirror[url]) return memoryMirror[url];
    const db = await dbPromise;

    // 2 — Slow path: IndexedDB
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(url);

      req.onsuccess = () => {
        const raw = req.result;
        if (!raw) return resolve(null);

        const entry = {
          url: raw.url,
          ts: raw.ts,
          kind: raw.kind,
          failures: raw.failures || 0,
          presence: raw.presence,
          value: raw.value ? new Uint8Array(raw.value) : null
        };

        // Mirror it in RAM
        memoryMirror[url] = entry;

        resolve(entry);
      };

      req.onerror = () => resolve(null);
    });
  },

  async set(url, entry) {
    // Build structured-clone-safe entry
    const safeEntry = {
      url,
      ts: entry.ts || PulseRealm.PulseNOW,
      kind: entry.kind || "binary",
      failures: entry.failures || 0,
      presence: entry.presence
        ? JSON.parse(JSON.stringify(entry.presence))
        : null,
      value:
        entry.value instanceof Uint8Array
          ? entry.value.buffer
          : entry.value instanceof ArrayBuffer
          ? entry.value
          : null
    };

    // 1 — Update memory mirror immediately
    memoryMirror[url] = {
      url,
      ts: safeEntry.ts,
      kind: safeEntry.kind,
      failures: safeEntry.failures,
      presence: safeEntry.presence,
      value: safeEntry.value ? new Uint8Array(safeEntry.value) : null
    };
    const db = await dbPromise;
    // 2 — Persist to IndexedDB
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      store.put(safeEntry); // keyPath = "url"

      tx.oncomplete = resolve;
      tx.onerror = () => {
        console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v36] Persist Failed:", url, tx.error);
        resolve();
      };
    });
  },

  async delete(url) {
    // Remove from memory mirror
    delete memoryMirror[url];
    const db = await dbPromise;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(url);
      tx.oncomplete = resolve;
      tx.onerror = resolve;
    });
  },

  async entries() {
    const db = await dbPromise;
   return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);

      const results = [];
      const cursor = store.openCursor();

      cursor.onsuccess = (e) => {
        const c = e.target.result;
        if (!c) return resolve(results);

        const raw = c.value;

        // Reconstruct entry (same as get())
        const entry = {
          url: raw.url,
          ts: raw.ts,
          kind: raw.kind,
          failures: raw.failures || 0,
          presence: raw.presence,
          value: raw.value ? new Uint8Array(raw.value) : null
        };

        // Sync memory mirror
        memoryMirror[raw.url] = entry;

        results.push([raw.url, entry]);

        c.continue();
      };

      cursor.onerror = () => resolve(results);
    });
  },

  async keys() {
    const all = await this.entries();
    return all.map(([key]) => key);
  },

  async has(url) {
    if (memoryMirror[url]) return true;
    return !!(await this.get(url));
  },

  // ⭐ NEW — Clear everything (RAM + IndexedDB)
  async clear() {
    // 1 — Clear memory mirror
    for (const key in memoryMirror) {
      delete memoryMirror[key];
    }
    const db = await dbPromise;
    // 2 — Clear IndexedDB
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const req = store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => {
        console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v36] Cache clear() failed:", req.error);
        resolve(false);
      };
    });
  },

  // Expose the mirror
  memoryMirror
};


PulseRealm.PulseChunksCache = chunkCache;
export const PulseChunksCache = chunkCache;
// ============================================================================
//  INDEXEDDB
// ============================================================================

async function loadPulseChunksFromStorage() {
  try {
    const db = await _openPulseChunksDB_v40();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    const rows = await new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });

    PulseRealm.PulseChunksCache.clear();
    PulseRealm.PulseChunksFailures.clear();

    for (const row of rows) {
      if (row.entry) PulseRealm.PulseChunksCache.set(row.url, row.entry);
      if (typeof row.failures === "number") PulseRealm.PulseChunksFailures.set(row.url, row.failures);
    }

    console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseWorld.Net IndexedDB Global Cache Locked and Loaded!");
  } catch (err) {
    console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseWorld.Net IndexedDB Global Cache Load Error:", err);
  }
}

PulseRealm.PulseChunksStorageScan = loadPulseChunksFromStorage();

// ============================================================================
//  UNIVERSAL IMAGE AUTO-LOADER + DIAGNOSTICS (v36.3, viewport-aware, node-bound)
// ============================================================================
// ============================================================================
//  FILTERS / HELPERS
// ============================================================================

function shouldSkipChunk(filePath = "", fileSize = 0) {
  if (!filePath) return true;

  const fp = String(filePath).toLowerCase().trim();

  // Skip root + HTML explicitly
  if (fp === "/" || fp.endsWith(".html")) return true;

  try {
    filePath = new URL(filePath, window.location.href).pathname.toLowerCase();
  } catch {
    filePath = fp;
  }

  // Root + HTML again after normalization
  if (filePath === "/" || filePath.endsWith(".html")) return true;

  const hardBlock = [
    "firebase-admin","env","package","pulseworldtransport","pulse-multiversal-touch",
    "pulse-touch-chunks","pulse-touch-chunksmy","pulseoslongtermmemory","stripe",
    "service-worker","sw.js","manifest.json","robots.txt","sitemap","favicon",
    "asset-manifest","vite","webpack","rollup","parcel","inject.js","inject","injected.web.js"
  ];
  for (const key of hardBlock) if (filePath.includes(key)) return true;

  const organBlock = [
    "chunker","portal","touch","tap","proof","bridge","pulseproof","pulsebridge",
    "pulsetouch","pulsetap","pulseportal","pulsepresence","brainstem",
    "organs","organism","organismmap","pulsemap","pulseos","pulseworld","router",
    "route","user","auth","login","admin","port"
  ];
  for (const key of organBlock) if (filePath.includes(key)) return true;

  const forbiddenExt = [
    ".zip",".rar",".7z",".exe",".dll",".so",".dylib",".pdf",".doc",".docx",
    ".xls",".xlsx",".ppt",".pptx",".mp4",".mov",".avi",".mkv",".mp3",".wav",".flac"
  ];
  for (const ext of forbiddenExt) if (filePath.endsWith(ext)) return true;

  const forbiddenDirs = [
    "/pulseadmin/","/private/","/system/","/internal/","/node_modules/",
    "/vendor/","/build/","/dist/","/server/","/_creation_barrier/"
  ];
  for (const dir of forbiddenDirs) if (filePath.includes(dir)) return true;

  if (fileSize > 5 * 1024 * 1024) return true;

  return false;
}

function shouldSkipImageChunk(url) {
  if (!url) return true;

  const u = String(url).trim().toLowerCase();

  // Skip root + HTML pages
  if (u === "/" || u.endsWith(".html")) return true;

  // Skip full website URLs (non-chunk paths)
  if (u.startsWith("http") && !u.includes("/chunks/")) return true;

  // Skip data URLs
  if (u.startsWith("data:")) return true;

  // Skip external CDNs
  if (/^https?:\/\/(www\.)?(google|gstatic|youtube|ytimg|facebook|fbcdn)\./i.test(u))
    return true;

  // Defer to global chunk skip logic
  return shouldSkipChunk(url);
}

// ============================================================================
//  UNIVERSAL IMAGE AUTO-LOADER + DIAGNOSTICS (v36.3, viewport-aware, node-bound)
// ============================================================================
async function autoLoadAllImages() {
  PulseRealm.PulseChunks = PulseRealm.PulseChunks || {};
  PulseRealm.PulseChunks.cache = PulseRealm.PulseChunksCache || {};
  PulseRealm.PulseChunks.handled = PulseRealm.PulseChunks.handled || new Set();

  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  );

  const selectors = [
    "img[src]",
    "img[href]",
    "img[data-src]",
    "img[data-asset]",
    "img[data-chunk]",
    "[data-preload]",
    "[data-asset]",
    "[data-chunk]"
  ];

  const urls = new Set();
  const urlToNodes = new Map();

  // Build a stable node → url universe once
  for (const selector of selectors) {
    document.querySelectorAll(selector).forEach((node) => {
      const url =
        node.getAttribute("src") ||
        node.getAttribute("href") ||
        node.getAttribute("data-src") ||
        node.getAttribute("data-asset") ||
        node.getAttribute("data-chunk") ||
        node.getAttribute("data-preload");

      if (!url) return;
      if (shouldSkipImageChunk(url)) return;

      urls.add(url);

      let list = urlToNodes.get(url);
      if (!list) {
        list = [];
        urlToNodes.set(url, (list = []));
      }
      list.push(node);
    });
  }

  const diagnostics = [];
  const diagMap = {};
  const pending = new Set();

  async function getOriginalSize(url) {
    if (shouldSkipImageChunk(url)) return null;

    try {
      const res = await fetch(url, { cache: "no-store" });
      const size = res.headers.get("content-length");
      return size ? parseInt(size, 10) : null;
    } catch {
      return null;
    }
  }


  function applyBinaryToNodes(url, binary) {
    const nodes = urlToNodes.get(url);
    if (!nodes || !nodes.length) return;

    const src =
      PulseChunkNormalizer.normalizeImage(binary) ||
      PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
      null;

    if (!src) return;

    for (const node of nodes) {
      node.src = src;
    }
  }

  async function resolveBinaryForUrl(url, diag) {
    if (shouldSkipImageChunk(url)) {
      diag.source = "skip";
      return null;
    }

    let binary = null;

    // 1 — CACHE
    const cached = PulseRealm.PulseChunksCache.get(url);
    if (cached && cached.value) {
      binary = cached.value;
      diag.chunkSize = binary.byteLength || null;
      diag.source = "cache";
      PulseRealm.PulseChunks.cache[url] = binary;
    }

    if (!binary && cached && isExpired(cached)) {
      PulseRealm.PulseChunksCache.delete(url);
      persistPulseChunksSnapshot();
    }

    // 2 — FETCH
    if (!binary) {
      try {
        const { value, ok } = await fetchChunk(url);
        if (ok && value) {
          binary = value;
          diag.chunkSize = binary.byteLength || null;
          diag.source = "fetchChunk";
          PulseRealm.PulseChunks.cache[url] = binary;
        }
      } catch {}
    }

    // 3 — CNS FALLBACK
    if (!binary) {
      try {
        const fallback = await PulseRealm.PulseBridgeRoute("getImages", {
          url,
          layer: "A1",
          reflexOrigin: "PulseChunks-v36",
          binaryAware: true,
          presenceAware: true,
          kind: "asset-fallback"
        });

        if (fallback && fallback.ok && fallback.data) {
          const unwrapped = PulseChunkNormalizer.unwrap(fallback.data);
          const fb = PulseChunkNormalizer.normalizeBinary(unwrapped);
          if (fb) {
            binary = fb;
            diag.chunkSize = binary.byteLength || null;
            diag.source = "fallback";
            PulseRealm.PulseChunks.cache[url] = binary;
          }
        }
      } catch {}
    }

    if (!binary) {
      diag.source = diag.source || "error";
      return null;
    }

    return binary;
  }

  // init diag + pending
  for (const url of urls) {
    const diag = { url, originalSize: null, chunkSize: null, source: null };
    diagMap[url] = diag;
    pending.add(url);
    getOriginalSize(url).then((size) => (diag.originalSize = size));
  }

  // PHASE 1 — CACHE
  for (const url of [...pending]) {
    if (shouldSkipImageChunk(url)) {
      const diag = diagMap[url];
      diag.source = "skip";
      pending.delete(url);
      continue;
    }

    if (PulseRealm.PulseChunks.handled.has(url)) {
      pending.delete(url);
      continue;
    }

    const diag = diagMap[url];
    const cached = PulseRealm.PulseChunksCache.get(url);

    if (cached && cached.value) {
      const binary = cached.value;
      diag.chunkSize = binary.byteLength || null;
      diag.source = "cache";
      PulseRealm.PulseChunks.cache[url] = binary;
      applyBinaryToNodes(url, binary);
      PulseRealm.PulseChunks.handled.add(url);
      pending.delete(url);
    } else if (cached && isExpired(cached)) {
      PulseRealm.PulseChunksCache.delete(url);
      persistPulseChunksSnapshot();
    }
  }

  // PHASE 2 — FETCH
  for (const url of [...pending]) {
    if (shouldSkipImageChunk(url)) {
      const diag = diagMap[url];
      diag.source = "skip";
      pending.delete(url);
      continue;
    }

    const diag = diagMap[url];
    try {
      const { value, ok } = await fetchChunk(url);
      if (ok && value) {
        const binary = value;
        diag.chunkSize = binary.byteLength || null;
        diag.source = "fetchChunk";
        PulseRealm.PulseChunks.cache[url] = binary;
        applyBinaryToNodes(url, binary);
        PulseRealm.PulseChunks.handled.add(url);
        pending.delete(url);
      }
    } catch {}
  }

  // PHASE 3 — FALLBACK
  for (const url of [...pending]) {
    if (shouldSkipImageChunk(url)) {
      const diag = diagMap[url];
      diag.source = "skip";
      pending.delete(url);
      continue;
    }

    const diag = diagMap[url];
    try {
      const fallback = await PulseRealm.PulseBridgeRoute("getImages", {
        url,
        layer: "A1",
        reflexOrigin: "PulseChunks-v36",
        binaryAware: true,
        presenceAware: true,
        kind: "asset-fallback"
      });

      if (fallback && fallback.ok && fallback.data) {
        const unwrapped = PulseChunkNormalizer.unwrap(fallback.data);
        const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);
        if (binary) {
          diag.chunkSize = binary.byteLength || null;
          diag.source = "fallback";
          PulseRealm.PulseChunks.cache[url] = binary;
          applyBinaryToNodes(url, binary);
          PulseRealm.PulseChunks.handled.add(url);
          pending.delete(url);
        }
      }
    } catch {}
  }

  // PHASE 4 — ERROR + collect diagnostics
  for (const url of urls) {
    const diag = diagMap[url];
    if (!PulseRealm.PulseChunks.handled.has(url) && !diag.source) {
      diag.source = "error";
      PulseRealm.PulseChunks.handled.add(url);
    }
    diagnostics.push(diag);
  }

  console.groupCollapsed(
    `%c[PulseChunks v36.3] Universal Image Warm Complete — ${urls.size} Assets`,
    "color:#4FC3F7;font-weight:bold;"
  );

  diagnostics.forEach((d) => {
    console.log(
      `✨ PULSE MULTIVERSAL RENDERER v32.0 — %c${d.url}`,
      "color:#FFF;background:#333;padding:2px 4px;border-radius:3px;",
      {
        originalSize: d.originalSize ? `${d.originalSize} bytes` : "unknown",
        chunkSize: d.chunkSize ? `${d.chunkSize} bytes` : "unknown",
        compression:
          d.originalSize && d.chunkSize
            ? `${(((d.chunkSize / d.originalSize) * 100) | 0)}%`
            : "unknown",
        source: d.source
      }
    );
  });

  console.groupEnd();
}

function isExpired(entry) {
  if (!entry || !entry.ts) return true;
  return PulseRealm.PulseNOW - entry.ts > CACHE_TTL_MS;
}

function hashKey(key = "") {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) - h + key.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function pickLaneIndex(key) {
  return hashKey(key) & LANE_MASK;
}

function nowMs() {
  return (performance.now()) || PulseRealm.PulseNOW;
}

function unwrapImmortalDNA(value) {
  if (!value) return value;
  if (value.__dna !== undefined) return value.__dna;
  if (value.__chunk !== undefined) return value.__chunk;
  if (value.data !== undefined) return value.data;
  if (value.value !== undefined) return value.value;
  return value;
}

async function persistPulseChunkToStorage(url, entry, failures = 0) {
  try {
    const safeEntry = {
      url,
      ts: entry.ts || PulseRealm.PulseNOW,
      kind: entry.kind || "binary",
      failures,
      presence: entry.presence
        ? JSON.parse(JSON.stringify(entry.presence))
        : null,
      value:
        entry.value instanceof Uint8Array
          ? entry.value.buffer
          : entry.value instanceof ArrayBuffer
          ? entry.value
          : null
    };
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(safeEntry);

    tx.onerror = () => {
      console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v36] Persist Error:", url, tx.error);
    };
  } catch (err) {
    console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v36] Persist Error:", err);
  }
}
async function resetChunksState() {
  chunksDegraded = false;
  globalFailures = 0;
  PulseRealm.PulseChunksFailures.clear();

  console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseChunks Global State Reset — Advantages Restored!");

  const entries = await PulseRealm.PulseChunksCache.entries(); // FIXED

  for (const [url, entry] of entries) {
    await persistPulseChunkToStorage(url, entry, 0);
  }
}

function persistPulseChunksSnapshot() {
  (async () => {
    try {
      // 1. Freeze entries BEFORE touching IndexedDB
      const frozen = Array.from(PulseRealm.PulseChunksCache.entries());
      const db = await dbPromise;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      // 2. Clear store
      await new Promise((resolve) => {
        const clearReq = store.clear();
        clearReq.onsuccess = resolve;
        clearReq.onerror = resolve;
      });

      // 3. Write frozen entries synchronously inside the same tick
      for (const [url, entry] of frozen) {
        const failures = PulseRealm.PulseChunksFailures.get(url) || 0;
        store.put({ url, entry, failures });
      }

      // 4. Wait for transaction to finish
      await new Promise((resolve) => {
        tx.oncomplete = resolve;
        tx.onerror = resolve;
      });

    } catch (err) {
      console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] Pulse Chunks Persist Snapshot Error:", err);
    }
  })();
}



// ============================================================================
//  LANE SYSTEM
// ============================================================================

function createLane(id) {
  return {
    id,
    envelopeCounter: 0,
    stats: {
      requests: 0,
      successes: 0,
      failures: 0,
      totalLatencyMs: 0,
      lastError: null
    },

    async fetchViaCNS(url) {
      const start = nowMs();
      this.stats.requests++;

      const envelopeId = `lane-${id}-${++this.envelopeCounter}`;

      let routed = null;
      try {
        routed = await PulseRealm.PulseBridgeRoute("fetchExternalResource", {
          url,
          layer: "A1",
          reflexOrigin: "PulseChunks-v32",
          binaryAware: true,
          dualBand: false,
          presenceAware: true,
          kind: "chunk_binary",
          laneId: id,
          envelopeId
        });
      } catch (err) {
        routed = { ok: false, error: String(err) };
      }

      const latency = nowMs() - start;
      this.stats.totalLatencyMs += latency;

      const ok = routed && routed.ok !== false;

      if (ok) {
        this.stats.successes++;
      } else {
        this.stats.failures++;
        this.stats.lastError = routed.error || `Chunk route failed for ${url}`;
      }

      return routed;
    }
  };
}

const lanes = Array.from({ length: LANE_COUNT }, (_, i) => createLane(i));

function getLaneStatsSnapshot() {
  return lanes.map((lane) => ({
    id: lane.id,
    envelopeCounter: lane.envelopeCounter,
    stats: { ...lane.stats }
  }));
}

// ============================================================================
//  ENVELOPES
// ============================================================================

function buildChunkPresenceEnvelope({ url, fromCache, degraded, kind, laneIndex }) {
  const presence = degraded
    ? "degraded"
    : fromCache
    ? "stable"
    : "coherent";

  const wave = presence;

  return {
    url,
    presence,
    wave,
    band: "chunk_binary",
    dualBand: false,
    kind,
    laneIndex: typeof laneIndex === "number" ? laneIndex : null,

    // v32 world-aware tags
    worldBand: "oneband",
    worldRole: "frontend_chunk_membrane",
    worldVersion: "v32"
  };
}

// ============================================================================
//  FAILURE HANDLING
// ============================================================================

async function markChunkFailure(url, err, { finalAttempt = false } = {}) {
  const prev = PulseRealm.PulseChunksFailures.get(url) || 0;
  const next = prev + 1;
  PulseRealm.PulseChunksFailures.set(url, next);

  if (finalAttempt) {
    console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseChunks Mark FINAL Chunk Failure:", {
      url,
      attempts: next,
      err
    });
  }

  if (finalAttempt && (next >= MAX_FAILURES_PER_URL || globalFailures >= MAX_GLOBAL_FAILURES)) {
    if (!chunksDegraded) {
      chunksDegraded = true;
      console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseChunks Entering DEGRADED Mode — Falling Back to Regular Loading!");
    }
  }

  const entry = PulseRealm.PulseChunksCache.get(url) || null;
  await persistPulseChunkToStorage(url, entry, next);
}

function isChunksDegraded() {
  return chunksDegraded === true;
}

// ============================================================================
//  FETCH CHUNK
// ============================================================================
export async function fetchChunk(url) {
  const start = performance.now();

  const diag = {
    url,
    start,
    end: null,
    duration: null,
    source: null,
    laneIndex: null,
    binarySize: null,
    degraded: chunksDegraded,
    error: null
  };

  try {
    PulseRealm.BridgeFireandForget("proxy.dnaVisibility", {
      url,
      timestamp: PulseRealm.PulseNOW,
      degraded: chunksDegraded,
      presence: "frontend-dna-request",
      membrane: "PulseChunks-v36"
    });
  } catch {}

  // ---------------------------------------------------------------------------
  // 1 — Skip logic
  // ---------------------------------------------------------------------------
  if (!url || shouldSkipChunk(url)) {
    diag.source = "skipped";
    diag.end = performance.now();
    diag.duration = diag.end - diag.start;

    return {
      ok: false,
      value: url,
      chunk: url,
      diagnostics: diag,
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: false,
        kind: "skipped"
      })
    };
  }

  // ---------------------------------------------------------------------------
  // 2 — Global degraded mode
  // ---------------------------------------------------------------------------
  if (chunksDegraded) {
    diag.source = "global-degraded";
    diag.end = performance.now();
    diag.duration = diag.end - diag.start;

    return {
      ok: false,
      value: url,
      chunk: url,
      diagnostics: diag,
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: true,
        kind: "fallback"
      })
    };
  }

  // ---------------------------------------------------------------------------
  // 3 — Persistent cache lookup
  // ---------------------------------------------------------------------------
  const cached = await PulseRealm.PulseChunksCache.get(url);

  if (cached && !isExpired(cached)) {
    diag.source = "cache";
    diag.binarySize = cached.value?.byteLength || null;
    diag.end = performance.now();
    diag.duration = diag.end - diag.start;

    return {
      ok: true,
      value: cached.value,
      chunk: cached.value,
      diagnostics: diag,
      envelope: cached.presence
    };
  }

  if (cached && isExpired(cached)) {
    await PulseRealm.PulseChunksCache.delete(url);
    persistPulseChunksSnapshot();
  }

  // ---------------------------------------------------------------------------
  // 4 — CNS lane routing
  // ---------------------------------------------------------------------------
  const laneIndex = pickLaneIndex(url);
  const lane = lanes[laneIndex];
  diag.laneIndex = laneIndex;

  try {
    const routed = await lane.fetchViaCNS(url);
    const ok = routed && routed.ok !== false;

    if (!ok) throw new Error(routed?.error || `Chunk route failed for ${url}`);

    // Extract DNA
    const dna =
      routed.dna ??
      routed.chunk ??
      routed.data ??
      routed.result ??
      routed.value ??
      null;

    // -----------------------------------------------------------------------
    // ⭐ IMMORTAL+++ SAFETY: Reject null / HTML / empty bodies
    // -----------------------------------------------------------------------
    if (!dna) {
      throw new Error("CNS returned null DNA");
    }

    const unwrapped = unwrapImmortalDNA(dna);

    if (!unwrapped) {
      throw new Error("Unwrapped DNA is null");
    }

    const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);

    if (!binary || !binary.byteLength) {
      throw new Error("Binary chunk is empty or invalid");
    }

    // -----------------------------------------------------------------------
    // Success path
    // -----------------------------------------------------------------------
    diag.source = "CNS";
    diag.binarySize = binary.byteLength;

    const envelope = buildChunkPresenceEnvelope({
      url,
      fromCache: false,
      degraded: false,
      kind: "binary",
      laneIndex
    });

    const entry = {
      value: binary,
      ts: PulseRealm.PulseNOW,
      kind: "binary",
      presence: envelope
    };

    await PulseRealm.PulseChunksCache.set(url, entry);

    await persistPulseChunkToStorage(
      url,
      entry,
      PulseRealm.PulseChunksFailures.get(url) || 0
    );

    persistPulseChunksSnapshot();

    diag.end = performance.now();
    diag.duration = diag.end - diag.start;

    return {
      ok: true,
      value: binary,
      chunk: binary,
      diagnostics: diag,
      envelope
    };

  } catch (err) {
    // -----------------------------------------------------------------------
    // 5 — Fallback path
    // -----------------------------------------------------------------------
    await markChunkFailure(url, err, { finalAttempt: true });

    diag.source = "fallback";
    diag.error = String(err);
    diag.end = performance.now();
    diag.duration = diag.end - diag.start;

    return {
      ok: false,
      value: url,
      chunk: url,
      diagnostics: diag,
      error: String(err),
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: true,
        kind: "fallback"
      })
    };
  }
}


// ============================================================================
//  IMAGE HELPERS
// ============================================================================
export async function getImage(url) {
  const start = performance.now();

  const result = await fetchChunk(url);
  const { ok, value, diagnostics, error } = result;

  if (!ok) {
    console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v35] GetImage Fallback:", {
      url,
      error,
      diagnostics
    });
    return url;
  }

  const binary = value;
  const src =
    PulseChunkNormalizer.normalizeImage(binary) ||
    PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
    null;

  if (!src) {
    console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v35] GetImage Unknown Format:", {
      url,
      diagnostics
    });
    return url;
  }

  const end = performance.now();

  console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — %c[PulseChunks v35] Image Loaded", "color:#4FC3F7;font-weight:bold;", {
    url,
    binarySize: binary.byteLength,
    duration: end - start,
    diagnostics
  });

  return src;
}

export function getImageSync(url) {
  const dna = getCachedDNA(url);
  if (!dna) return null;

  const src =
    PulseChunkNormalizer.normalizeImage(dna) ||
    PulseChunkNormalizer.normalizeChunkValue(dna, "image") ||
    null;

  console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — %c[PulseChunks v35] ImageSync", "color:#81C784;font-weight:bold;", {
    url,
    binarySize: dna.byteLength || null,
    source: "cache-sync"
  });

  return src;
}

// ============================================================================
//  RECONSTRUCTION
// ============================================================================

export function reconstructChunk(dnaOrValue) {
  return PulseChunkNormalizer.unwrap(unwrapImmortalDNA(dnaOrValue));
}

export function reconstructRouteDescriptor(dnaOrValue) {
  const core = reconstructChunk(dnaOrValue);
  if (!core || typeof core !== "object") return core;

  return {
    route: core.route || null,
    imports: core.imports || [],
    assets: core.assets || [],
    payloads: core.payloads || []
  };
}

export function getCachedDNA(url) {
  if (!url) return null;
  const entry = PulseRealm.PulseChunksCache.get(url);
  if (!entry || isExpired(entry)) return null;
  return entry.value;
}

export function reconstructCachedChunk(url) {
  const dna = getCachedDNA(url);
  return dna ? reconstructChunk(dna) : null;
}

export function reconstructCachedRouteDescriptor(url) {
  const dna = getCachedDNA(url);
  return dna ? reconstructRouteDescriptor(dna) : null;
}

// ============================================================================
//  CHUNKER
// ============================================================================

// ============================================================
//  PULSE CHUNK REGISTRY (GLOBAL)
// ============================================================
PulseRealm.PulseChunks = PulseRealm.PulseChunks || {};
PulseRealm.PulseChunks.registry = PulseRealm.PulseChunks.registry || {};

function registerChunk(filePath, record) {
  try {
    PulseRealm.PulseChunks.registry[filePath] = {
      filePath,
      ...record,
      lastSeen: PulseRealm.PulseNOW
    };
  } catch (err) {
    console.warn(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks] PulseChunks Registry Error:", err);
  }
}

// ============================================================
//  UPGRADED PULSE CHUNKER WITH REGISTRY
// ============================================================
export async function PulseChunker(filePath, fileSize = 0, metaPack = null) {
  if (shouldSkipChunk(filePath, fileSize)) return null;

  console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseChunks Chunker DNA Allowed:", filePath);

  const { value: binary, envelope, ok } = await fetchChunk(filePath);

  // ------------------------------------------------------------
  //  DEGRADED / FAILED CHUNK
  // ------------------------------------------------------------
  if (!ok || chunksDegraded) {
    const record = {
      ok,
      degraded: true,
      chunk: binary,
      normalized: null,
      lore: null,
      safe: ok,
      presence: envelope
    };

    registerChunk(filePath, record);
    return record;
  }

  // ------------------------------------------------------------
  //  NORMALIZED CHUNK
  // ------------------------------------------------------------
  const normalized = PulseChunkNormalizer.normalizeChunkValue(binary, "binary");
  const lore = metaPack ? "" : null;

  const record = {
    ok: true,
    degraded: false,
    chunk: normalized,
    normalized,
    lore,
    safe: true,
    presence: envelope
  };

  registerChunk(filePath, record);
  return record;
}


// ============================================================================
//  PREWARM
// ============================================================================

export function prewarm(urls = [], metaPack = null) {
  urls.forEach((url) => {
    if (!url) return;

    const entry = PulseRealm.PulseChunksCache.get(url);
    if (entry && !isExpired(entry) && !chunksDegraded) return;

    fetchChunk(url).then(async ({ value: binary, ok, envelope }) => {
      if (!ok) return;

      const normalized = PulseChunkNormalizer.normalizeChunkValue(binary, "binary");
      const kind = "binary";

      const entry = {
        value: normalized,
        ts: PulseRealm.PulseNOW,
        kind,
        presence: envelope
      };

      PulseRealm.PulseChunksCache.set(url, entry);
      await persistPulseChunkToStorage(url, entry, PulseRealm.PulseChunksFailures.get(url) || 0);
      persistPulseChunksSnapshot();

      try {
        PulseRealm.PulseTouchWarmup.onPrewarm(url, normalized, metaPack);
        PulseRealm.PulsePortalWarmup(url, normalized, metaPack);
      } catch {}
    });
  });
}

// ============================================================================
//  DECHUNK
// ============================================================================

function dechunk(urls = []) {
  urls.forEach((url) => {
    if (!url) return;
    PulseRealm.PulseChunksCache.delete(url);
    PulseRealm.PulseChunksFailures.delete(url);
  });
  persistPulseChunksSnapshot();
}

function dechunkAll() {
  PulseRealm.PulseChunksCache.clear();
  PulseRealm.PulseChunksFailures.clear();
  globalFailures = 0;
  chunksDegraded = false;

  console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks v32] PulseChunks All Chunks Cleared, State Reset!");
  persistPulseChunksSnapshot();
}

function createPageRegistry() {
  const pages = new Map();

  return {
    register(name, meta = {}) {
      pages.set(name, {
        name,
        registeredAt: performance.now(),
        ...meta
      });
    },

    get(name) {
      return pages.get(name) || null;
    },

    has(name) {
      return pages.has(name);
    },

    list() {
      return Array.from(pages.values());
    },

    keys() {
      return Array.from(pages.keys());
    },

    count() {
      return pages.size;
    }
  };
}


// ---------------------------------------------------------------------------
// ⭐ PulseChunks.handled — deterministic handled‑set organ
// ---------------------------------------------------------------------------
function createHandledOrgan() {
  const set = new Set();

  return {
    has(url) {
      return set.has(url);
    },

    add(url) {
      set.add(url);
      return true;
    },

    delete(url) {
      return set.delete(url);
    },

    clear() {
      set.clear();
    },

    count() {
      return set.size;
    },

    list() {
      return Array.from(set);
    },

    // optional: expose raw set for debugging
    _raw: set
  };
}


// ============================================================================
//  DOM LOADER + GLOBAL SURFACE
// ============================================================================
// ============================================================================
//  DOM LOADER + GLOBAL SURFACE
// ============================================================================
PulseRealm.PulseChunks = {
  // Core API
  getImage,
  getImageSync,
  fetchChunk,
  prewarm,
  PulseChunker,

  // Reconstruction helpers
  reconstructChunk,
  reconstructRouteDescriptor,

  // Cached DNA helpers
  getCachedDNA,
  reconstructCachedChunk,
  reconstructCachedRouteDescriptor,

  // State + degradation
  isDegraded: isChunksDegraded,
  resetState: resetChunksState,

  // Dechunking utilities
  dechunk,
  dechunkAll,

  // Normalizer organ
  normalizer: PulseChunkNormalizer,

  // Lane system
  lanes,
  getLaneStats: getLaneStatsSnapshot,

  // Persistent cache
  cache: {
    async get(url) { return await chunkCache.get(url); },
    async set(url, entry) { return await chunkCache.set(url, entry); },
    async delete(url) { return await chunkCache.delete(url); },
    async has(url) { return !!(await chunkCache.get(url)); },
    async keys() { return await chunkCache.keys(); },
    async entries() { return await chunkCache.entries; },
    memoryMirror: chunkCache.memoryMirror || {}
  },

  // -------------------------------------------------------------------------
  // ⭐ PAGE REGISTRY + GENERAL REGISTRY
  // -------------------------------------------------------------------------
  pages: createPageRegistry(),
  registry: createPageRegistry(),

  // -------------------------------------------------------------------------
  // ⭐ EXISTING HANDLED ORGAN
  // -------------------------------------------------------------------------
  handled: createHandledOrgan(),

  // v36 world-aware tags
  worldBand: "oneband",
  worldRole: "frontend_chunk_membrane",
  worldVersion: "v36"
};



console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseChunks] BINARY-ONEBAND Ready — 32-Lane CNS Router Membrane Active, Binary-Only Cache, IndexedDB Persistence, One-Band Chunk_Binary Presence, World-Aware, Available and Waiting..."
);

PulseRealm.PulseTouchChunk = fetchChunk;
PulseRealm.PulseTouchChunker = PulseChunker;
PulseRealm.PulseChunker = PulseChunker;
PulseRealm.PulseChunksAutoAllImages = autoLoadAllImages;