// ============================================================================
//  PULSE-UNIVERSAL-TOUCH-MYPULSECHUNKS-SMART v4.0 (v32 IMMORTAL-WORLD ONE-BAND)
//  Contract-driven bridge: A → Z
//  No guessing. No heuristics. No fallback decoding.
//  Fully aligned with PulseChunks v32 IMMORTAL-WORLD and PulseTouchStorage
//  v32 IMMORTAL-WORLD: IndexedDB + in-memory mesh of ALL normalization events
//  + Session-aware, replay-aware, route-aware, organ-aware
//  + PulseImport / PulseExport / subimport / tier-aware module normalization
//  + Binary-aware lanes + optional PulseBinary + PulseTouchStorage integration
// ============================================================================

const PN_DB_NAME = "PulseTouchChunksMyPulseDB";
const PN_STORE_NAME = "presence";
const PN_MEM_MAX = 1000; // in-memory tail for fast access
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


let pnMemBuffer = PulseRealm.PulseChunksMyMemBuffer || [];

(async () => {
  try {
    const tail = await loadPresenceTailFromDB(PN_MEM_MAX);
    pnMemBuffer = tail;
  } catch {
    pnMemBuffer = [];
  }
  PulseRealm.PulseChunksMyMemBuffer = pnMemBuffer;
})();

// Session + route tagging
const PN_SESSION_ID = (() => {
  try {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {}
  return "PulseChunksSession_ID-" + Math.random().toString(36).slice(2);
})();


async function loadPresenceTailFromDB(limit = PN_MEM_MAX) {
  try {
    const db = await openPresenceDB();
    if (!db) return [];

    const tx = db.transaction(PN_STORE_NAME, "readonly");
    const store = tx.objectStore(PN_STORE_NAME);
    const index = store.index("ts");

    const results = [];
    const req = index.openCursor(null, "prev"); // newest first

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor || results.length >= limit) {
          resolve(results.reverse()); // oldest first in memory
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export const AI_EXPERIENCE_META_PulsePresenceNormalizerV32 = {
  id: "pulsetouch.touch_mypulsechunks",
  kind: "outer_sense",
  version: "v32-IMMORTAL-WORLD",
  role: "touch_mypulsechunks_binary_lanes",
  surfaces: {
    band: [
      "presence",
      "chunks",
      "binary",
      "module",
      "storage",
      "normalization"
    ],
    wave: ["quiet", "background", "deterministic"],
    presence: ["touch_mypulsechunks_state"],
    speed: "async_parallel"
  }
};

export const ORGAN_META_PulsePresenceNormalizerV32 = {
  id: "organ.pulsetouch.touch_mypulsechunks",
  organism: "PulseTouch",
  layer: "outer_sense.touch_mypulsechunks",
  tier: "IMMORTAL_WORLD",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    presenceAware: true,
    routeAware: true,
    sessionAware: true,
    chunkProfileAware: true,
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,
    binaryAware: true,
    indexedDBAware: true,
    storageAware: true,
    pulseBinaryAware: true
  }
};

export const ORGAN_CONTRACT_PulsePresenceNormalizerV32 = {
  inputs: {
    value: "any chunk value",
    typeHint: "optional type hint (image|image-url|html|css|js|json|binary|binary-url)",
    options: "optional normalization options (e.g., mime)"
  },
  outputs: {
    normalized: "normalized value (type-safe, deterministic)",
    events: "touch-mypulsechunks tail via PulsePresenceNormalizerStore"
  },
  guarantees: {
    deterministic: true,
    asyncSafe: true,
    noNetwork: true,
    zeroPII: true,
    zeroTracking: true
  }
};

export const IMMORTAL_OVERLAYS_PulsePresenceNormalizerV32 = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

function getCurrentRouteTag() {
  try {
    if (PulseRealm.PulseWorldRealityFile) return PulseRealm.PulseWorldRealityFile;
    if (PulseRealm.__PULSE_CURRENT_PAGE__) return `/${PulseRealm.__PULSE_CURRENT_PAGE__}`;
  } catch {}
  return null;
}

function openPresenceDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }

    const req = indexedDB.open(PN_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PN_STORE_NAME)) {
        const store = db.createObjectStore(PN_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("ts", "ts", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function appendPresenceRecordToDB(entry) {
  (async () => {
    try {
      const db = await  openPresenceDB();
      if (!db) return;

      const tx = db.transaction(PN_STORE_NAME, "readwrite");
      const store = tx.objectStore(PN_STORE_NAME);
      store.add(entry);

      tx.oncomplete = () => {};
      tx.onerror = () => {};
    } catch {}
  })();
}

async function getAllPresenceFromDB(limit = 4000) {
  try {
    const db = await  openPresenceDB();
    if (!db) return [];

    const tx = db.transaction(PN_STORE_NAME, "readonly");
    const store = tx.objectStore(PN_STORE_NAME);
    const index = store.index("ts");

    const results = [];
    const req = index.openCursor(null, "next");

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve(
            results.length > limit ? results.slice(results.length - limit) : results
          );
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

function clearPresenceDB() {
  (async () => {
    try {
      const db = await  openPresenceDB();
      if (!db) return;

      const tx = db.transaction(PN_STORE_NAME, "readwrite");
      const store = tx.objectStore(PN_STORE_NAME);
      store.clear();

      tx.oncomplete = () => {};
      tx.onerror = () => {};
    } catch {}
  })();
}

const BINARY_LANE_MAX = 256;
let binaryLaneTail = [];

function pushBinaryLane(kind, mime, size, extra = {}) {
  const entry = {
    ts: PulseRealm.PulseNOW,
    kind,
    mime,
    size: typeof size === "number" ? size : null,
    sessionId: PN_SESSION_ID,
    route: getCurrentRouteTag(),
    ...extra
  };

  binaryLaneTail.push(entry);
  if (binaryLaneTail.length > BINARY_LANE_MAX) {
    binaryLaneTail = binaryLaneTail.slice(binaryLaneTail.length - BINARY_LANE_MAX);
  }

  // Optional PulseBinary integration (symbolic only)
  try {
    if (PulseRealm.PulseBinary && typeof PulseRealm.PulseBinary.feed === "function") {
      PulseRealm.PulseBinary.feed({
        lane: kind,
        mime,
        size: entry.size,
        meta: extra
      });
    }
  } catch {}
}
let __lastPresenceSnapshot = null;

function appendPresenceRecord(kind, payload) {
  const ts = PulseRealm.PulseNOW;
  const start = performance.now();

  const entry = {
    ts,
    kind,
    payload,
    sessionId: PN_SESSION_ID,
    route: getCurrentRouteTag(),
    organ: "PulseTouchMyPulseChunks",
    version: "v35-IMMORTAL-WORLD",
    perf: null,
    size: null,
    hash: null
  };

  // ---------------------------------------------------------------------------
  // 1 — Build deterministic snapshot for dedup
  // ---------------------------------------------------------------------------
  const snapshotObj = {
    kind,
    payload,
    route: entry.route
  };

  const snapshot = JSON.stringify(snapshotObj);
  entry.hash = snapshot.length; // cheap deterministic hash

  if (snapshot === __lastPresenceSnapshot) {
    return; // no change → no spam
  }

  __lastPresenceSnapshot = snapshot;

  // ---------------------------------------------------------------------------
  // 2 — Compute entry size (approximate)
  // ---------------------------------------------------------------------------
  try {
    entry.size = snapshot.length;
  } catch {
    entry.size = null;
  }

  // ---------------------------------------------------------------------------
  // 3 — Perf timing
  // ---------------------------------------------------------------------------
  entry.perf = performance.now() - start;

  // ---------------------------------------------------------------------------
  // 4 — In-memory ring buffer
  // ---------------------------------------------------------------------------
  pnMemBuffer.push(entry);
  if (pnMemBuffer.length > PN_MEM_MAX) {
    pnMemBuffer = pnMemBuffer.slice(pnMemBuffer.length - PN_MEM_MAX);
  }

  // ---------------------------------------------------------------------------
  // 5 — IndexedDB async write
  // ---------------------------------------------------------------------------
  appendPresenceRecordToDB(entry);

  
  // ---------------------------------------------------------------------------
  // 6 — Console diagnostics (v35)
  // ---------------------------------------------------------------------------
  try {
    // BLOCK UNWRAP EVENTS FROM COMMENTING
    if (!kind.startsWith("unwrap") && !kind.startsWith("normalizeBinary")) {
      // NORMAL LOGGING FOR EVERYTHING ELSE
      PulseRealm.PulseLog(
  "renderer",
        "%c[MyPulseChunks v35]",
        "color:#4FC3F7;font-weight:bold;",
        {
          kind: entry.kind,
          route: entry.route,
          size: entry.size,
          perf: entry.perf,
          payload: entry.payload
        }
      );
    }
  } catch {}


  // ---------------------------------------------------------------------------
  // 7 — Optional PulseTouchStorage presence ring buffer tap
  // ---------------------------------------------------------------------------
  try {
    const storage = typeof PulseRealm.PulseTouchStorage === "function"
      ? PulseRealm.PulseTouchStorage()
      : null;

    if (storage && typeof storage.appendPresence === "function") {
      const presenceCode = kind.includes("normalize") ? 1 : 0;
      storage.appendPresence(entry.ts, presenceCode);
    }
  } catch {}
}

export const PulsePresenceNormalizerStore = {
  async getAll() {
    return await getAllPresenceFromDB(4000);
  },

  tail(n = 200) {
    const buf = pnMemBuffer || [];
    return buf.slice(Math.max(0, buf.length - n));
  },

  clear() {
    pnMemBuffer = [];
    clearPresenceDB();
  },

  sessionId() {
    return PN_SESSION_ID;
  },

  binaryLaneTail(n = 128) {
    const buf = binaryLaneTail || [];
    return buf.slice(Math.max(0, buf.length - n));
  }
};
function describeValueType(value) {
  if (value === null) return "null";

  const t = typeof value;
  if (t !== "object") return t;

  if (value instanceof Uint8Array) return "Uint8Array";
  if (value instanceof ArrayBuffer) return "ArrayBuffer";
  if (value instanceof DataView) return "DataView";
  if (value instanceof File) return "File";
  if (value instanceof Blob) return "Blob";
  if (Array.isArray(value)) return "array";

  return "object";
}function unwrap(value) {
  const start = performance.now();
  const inType = describeValueType(value);

  let out = value;
  let source = "direct";

  if (value && typeof value === "object") {
    if (value.__dna !== undefined) {
      out = value.__dna;
      source = "__dna";
    } else if (value.__chunk !== undefined) {
      out = value.__chunk;
      source = "__chunk";
    } else if (value.data !== undefined) {
      out = value.data;
      source = "data";
    } else if (value.chunk !== undefined) {
      out = value.chunk;
      source = "chunk";
    } else if (value.value !== undefined) {
      out = value.value;
      source = "value";
    }
  }

  const outType = describeValueType(out);
  const end = performance.now();

  // *** NO COMMENT FIELDS ***
  appendPresenceRecord("unwrap_v35", {
    inType,
    outType,
    source,
    duration: end - start
    // removed: comment, payload, extra metadata
  });

  return out;
}

export function normalizeImage(value, mime = "image/png") {
  const start = performance.now();
  const inType = describeValueType(value);

  value = unwrap(value);
  let out = null;
  let source = null;
  let size = null;

  if (typeof value === "string") {
    out = value;
    source = "string";
  } else if (value && typeof value.base64 === "string") {
    out = `data:${mime};base64,${value.base64}`;
    source = "base64";
  } else if (value instanceof Uint8Array) {
    const blob = new Blob([value], { type: mime });
    out = URL.createObjectURL(blob);
    size = blob.size;
    source = "Uint8Array";
  } else if (value instanceof ArrayBuffer) {
    const blob = new Blob([new Uint8Array(value)], { type: mime });
    out = URL.createObjectURL(blob);
    size = blob.size;
    source = "ArrayBuffer";
  } else if (value instanceof Blob) {
    out = URL.createObjectURL(value);
    size = value.size;
    source = "Blob";
  } else if (value && typeof value.url === "string") {
    out = value.url;
    source = "url-field";
  }

  const end = performance.now();

  appendPresenceRecord("normalizeImage_v35", {
    inType,
    outType: describeValueType(out),
    mime,
    size,
    source,
    duration: end - start
  });

  return out;
}
function normalizeText(value) {
  const start = performance.now();
  const inType = describeValueType(value);

  value = unwrap(value);
  const out = typeof value === "string" ? value : null;

  appendPresenceRecord("normalizeText_v35", {
    inType,
    outType: describeValueType(out),
    duration: performance.now() - start
  });

  return out;
}

function normalizeJSON(value) {
  const start = performance.now();
  const inType = describeValueType(value);

  value = unwrap(value);
  const out = typeof value === "object" && value !== null ? value : null;

  appendPresenceRecord("normalizeJSON_v35", {
    inType,
    outType: describeValueType(out),
    duration: performance.now() - start
  });

  return out;
}

function normalizeBinary(value, mime = "application/octet-stream") {
  const start = performance.now();
  const inType = describeValueType(value);

  value = unwrap(value);
  let out = null;
  let source = null;
  let size = null;

  if (value instanceof Uint8Array) {
    const blob = new Blob([value], { type: mime });
    out = blob;
    size = blob.size;
    source = "Uint8Array";
  } else if (value instanceof ArrayBuffer) {
    const blob = new Blob([new Uint8Array(value)], { type: mime });
    out = blob;
    size = blob.size;
    source = "ArrayBuffer";
  } else if (value instanceof DataView) {
    const blob = new Blob([new Uint8Array(value.buffer)], { type: mime });
    out = blob;
    size = blob.size;
    source = "DataView";
  } else if (value instanceof Blob) {
    out = value;
    size = value.size;
    source = "Blob";
  } else if (typeof value === "string") {
    try {
      const base64 = value.split(",").pop();
      const bin = atob(base64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blob = new Blob([bytes], { type: mime });
      out = blob;
      size = blob.size;
      source = "base64-string";
    } catch {}
  }

  appendPresenceRecord("normalizeBinary_v35", {
    inType,
    outType: describeValueType(out),
    mime,
    size,
    source,
    duration: performance.now() - start
  });

  return out;
}

function normalizeBinaryToURL(value, mime = "application/octet-stream") {
  const blob = normalizeBinary(value, mime);
  if (!blob) return null;

  const url = URL.createObjectURL(blob);

  appendPresenceRecord("normalizeBinaryToURL_v35", {
    outType: "string",
    mime,
    size: blob.size
  });

  return url;
}

export function normalizeChunkValue(value, typeHint = null, options = {}) {
  const start = performance.now();
  const inType = describeValueType(value);

  const mime = options.mime || "application/octet-stream";
  let out = null;
  let path = null;

  switch (typeHint) {
    case "image":
    case "image-url":
      out = normalizeImage(value, mime);
      path = "image";
      break;

    case "html":
    case "css":
    case "js":
      out = normalizeText(value);
      path = "text";
      break;

    case "json":
      out = normalizeJSON(value);
      path = "json";
      break;

    case "binary":
      out = normalizeBinary(value, mime);
      path = "binary";
      break;

    case "binary-url":
      out = normalizeBinaryToURL(value, mime);
      path = "binary-url";
      break;

    default:
      out = unwrap(value);
      path = "unwrap";
      break;
  }

  appendPresenceRecord("normalizeChunkValue_v35", {
    inType,
    outType: describeValueType(out),
    typeHint,
    path,
    duration: performance.now() - start
  });

  return out;
}


const VALID_EXPORT_TIERS = ["local", "organism", "global", "system"];

function normalizeExportTier(tier) {
  if (!tier || typeof tier !== "string") return "local";
  const lower = tier.toLowerCase();
  return VALID_EXPORT_TIERS.includes(lower) ? lower : "local";
}

function normalizeExportsMeta(exportsMetaRaw) {
  if (!exportsMetaRaw || !Array.isArray(exportsMetaRaw)) return [];

  const normalized = exportsMetaRaw
    .map((e) => {
      const name = typeof e.name === "string" ? e.name : null;
      if (!name) return null;

      return {
        name,
        tier: normalizeExportTier(e.tier),
        kind: typeof e.kind === "string" ? e.kind : "value"
      };
    })
    .filter(Boolean);

  appendPresenceRecord("normalizeExportsMeta", {
    count: normalized.length
  });

  return normalized;
}

function normalizeImportsMeta(importsMetaRaw) {
  if (!importsMetaRaw || !Array.isArray(importsMetaRaw)) return [];

  const normalized = importsMetaRaw
    .map((i) => {
      const name = typeof i.name === "string" ? i.name : null;
      const from = typeof i.from === "string" ? i.from : null;
      if (!name || !from) return null;

      return {
        name,
        from,
        layer: typeof i.layer === "string" ? i.layer : null,
        required: i.required === true
      };
    })
    .filter(Boolean);

  appendPresenceRecord("normalizeImportsMeta", {
    count: normalized.length
  });

  return normalized;
}

function normalizeSubimportsMap(subimportsRaw) {
  if (!subimportsRaw || typeof subimportsRaw !== "object") return null;
  appendPresenceRecord("normalizeSubimportsMap", {
    keys: Object.keys(subimportsRaw || {})
  });
  return subimportsRaw;
}

function normalizeChunkProfile(profileRaw) {
  if (!profileRaw || typeof profileRaw !== "object") return null;
  appendPresenceRecord("normalizeChunkProfile", {
    keys: Object.keys(profileRaw || {})
  });
  return profileRaw;
}

export function normalizeModuleChunk(chunkEnvelope) {
  appendPresenceRecord("normalizeModuleChunk_in", {
    type: describeValueType(chunkEnvelope)
  });

  if (!chunkEnvelope || typeof chunkEnvelope !== "object") {
    appendPresenceRecord("normalizeModuleChunk_out", {
      error: "invalid_envelope"
    });
    return {
      module: null,
      exportsMeta: [],
      importsMeta: [],
      subimports: null,
      chunkProfile: null,
      lineage: null
    };
  }

  const meta = chunkEnvelope.meta || {};
  const typeHint = meta.typeHint || null;

  const rawModule =
    chunkEnvelope.module !== undefined
      ? chunkEnvelope.module
      : chunkEnvelope.value !== undefined
      ? chunkEnvelope.value
      : chunkEnvelope;

  const normalizedModule = normalizeChunkValue(rawModule, typeHint, meta.options || {});

  const exportsMeta = normalizeExportsMeta(meta.exports);
  const importsMeta = normalizeImportsMeta(meta.imports);
  const subimports = normalizeSubimportsMap(meta.subimports);
  const chunkProfile = normalizeChunkProfile(meta.chunkProfile);
  const lineage = typeof meta.lineage === "object" ? meta.lineage : null;

  appendPresenceRecord("normalizeModuleChunk_out", {
    moduleType: describeValueType(normalizedModule),
    exportsCount: exportsMeta.length,
    importsCount: importsMeta.length,
    hasSubimports: !!subimports,
    hasChunkProfile: !!chunkProfile
  });

  return {
    module: normalizedModule,
    exportsMeta,
    importsMeta,
    subimports,
    chunkProfile,
    lineage
  };
}

export function extractPulseExportTiers(exportsMeta) {
  const tiers = {
    local: [],
    organism: [],
    global: [],
    system: []
  };

  (exportsMeta || []).forEach((e) => {
    const tier = normalizeExportTier(e.tier);
    tiers[tier].push(e.name);
  });

  appendPresenceRecord("extractPulseExportTiers", {
    local: tiers.local.length,
    organism: tiers.organism.length,
    global: tiers.global.length,
    system: tiers.system.length
  });

  return tiers;
}

export function validateSubimports(importsMeta, subimportsMap, layerHint = null) {
  const missing = [];
  const ok = [];

  const subKeys = subimportsMap ? Object.keys(subimportsMap) : [];

  (importsMeta || []).forEach((imp) => {
    if (!imp || !imp.name) return;

    if (subKeys.includes(imp.name)) {
      ok.push(imp.name);
    } else {
      missing.push(imp.name);
    }
  });

  appendPresenceRecord("validateSubimports", {
    layerHint,
    okCount: ok.length,
    missingCount: missing.length,
    subKeysCount: subKeys.length
  });

  return {
    ok,
    missing,
    moved: [],
    layer: layerHint || null
  };
}

export const PulseChunkNormalizer = {
  normalizeChunkValue,
  normalizeImage,
  normalizeHTML: normalizeText,
  normalizeCSS: normalizeText,
  normalizeJS: normalizeText,
  normalizeJSON,
  normalizeBinary,
  normalizeBinaryToURL,
  unwrap,

  normalizeModuleChunk,
  extractPulseExportTiers,
  validateSubimports
};

export default PulseChunkNormalizer;


  PulseRealm.PulseChunkNormalizer = PulseChunkNormalizer;
  PulseRealm.PulsePresenceNormalizerStore = PulsePresenceNormalizerStore;

    PulseRealm.TouchPulseChunks = {
      PulseChunkNormalizer,
      PulsePresenceNormalizerStore,
      normalizeChunkValue,
      normalizeImage,
      normalizeHTML: normalizeText,
      normalizeCSS: normalizeText,
      normalizeJS: normalizeText,
      normalizeJSON,
      normalizeBinary,
      normalizeBinaryToURL,
      unwrap,

      normalizeModuleChunk,
      extractPulseExportTiers,
      validateSubimports
    }

    
console.log(
  "✨ PULSE MULTIVERSAL RENDERER v32.0 — [MyPulseChunks] My First Creation of a New Standard that was Unknown its Quality UNTIL TODAY! :) (32+ Lane Freeway Chunking Process)"
);


PulseRealm.PulseChunksMy = PulseChunkNormalizer;
