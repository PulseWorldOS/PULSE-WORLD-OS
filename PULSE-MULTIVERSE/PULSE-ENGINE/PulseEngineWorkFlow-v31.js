// ============================================================================
// PulseDB-v31-Immortal-Evo++++ — UNIVERSAL APPEND-ONLY DATABASE SUBSTRATE (v31)
//  • Append-only collections (never mutate existing entries)
//  • MemoryOrgan + IndexedDB hybrid (Shadow DB ALWAYS wins)
//  • Binary-aware (ShifterPulse encode/chunk/dechunk) with binaryOps metrics
//  • Cosmos-aware (universe/timeline/branch/shard) + cosmos filters + lane tags
//  • Trust-fabric integrity hashing + envelope signatures + sequence IDs
//  • GPU/Earn/Harmonics-aware envelopes (jobType, lane, band, advantage, hints)
//  • Device-profile-aware (PULSE_DEVICE_PROFILE → capabilityProfile on envelopes)
//  • Hot metrics: reads, writes, binary ops, collections, envelopes, earn/gpu/harmonics lanes
//  • Zero-mutation, zero-drift, deterministic envelopes
//  • Future-proof: can swap to Firestore, SQLite, GPU-cache DB
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





export const PulseDBMeta = Object.freeze({
  id: "PulseDB-v31-Immortal-Evo++++",
  version: "31.0-Immortal-Evo++++",
  bands: ["symbolic", "binary"],
  lanes: ["forward", "backward", "gpu", "earn", "harmonics"],
  trustFabric: "pulse:immortal:evo++++:v31"
});

export function createPulseDB({
  MemoryOrgan,
  trace = false,
  sessionId = null,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {},
  enableIndexedDB = true,
  dbName = "PulseEngineWorkFlowDB",
  dbStoreName = "collections",
  // optional external backends (future-proof)
  firestore = null,
  firestorePrefix = "pulse:v31"
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseDB-v31] MemoryOrgan is required.");
  }

  const collections = new Set();
  let globalSequence = 0;

  const metrics = {
    collectionsCreated: 0,
    writes: 0,
    reads: 0,
    binaryOps: 0,
    envelopesCreated: 0,
    idbWrites: 0,
    idbReads: 0,
    lastWriteTs: null,
    lastReadTs: null,
    gpuEnvelopes: 0,
    earnEnvelopes: 0,
    harmonicsEnvelopes: 0,
    forwardEnvelopes: 0,
    backwardEnvelopes: 0,
    integrityFailures: 0,
    firestoreWrites: 0,
    firestoreReads: 0
  };

  function bumpMetric(key, delta = 1) {
    if (Object.prototype.hasOwnProperty.call(metrics, key)) {
      metrics[key] += delta;
    }
  }

  function markTs(key) {
    if (key === "lastWriteTs" || key === "lastReadTs") {
      metrics[key] = PulseRealm.PulseNOW;
    }
  }

  // Optional device profile from GPU Process substrate
  const deviceProfile =
    (typeof PulseRealm.PULSE_DEVICE_PROFILE === "object" && PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  // ---------------------------------------------------------------------------
  // IndexedDB shadow (browser only, optional)
  // ---------------------------------------------------------------------------
  let idb = null;
  if (enableIndexedDB) {
    const req = indexedDB.open(dbName, 1);
    req.onupgradeneeded = (evt) => {
      const db = evt.target.result;
      if (!db.objectStoreNames.contains(dbStoreName)) {
        db.createObjectStore(dbStoreName);
      }
    };
    req.onsuccess = () => {
      idb = req.result;
      if (trace) console.log("[PulseDB-v31] IndexedDB ready:", dbName, dbStoreName);
    };
  }

  async function idbWrite(key, value) {
    if (!idb) return;
    return await new Promise((resolve) => {
      const tx = idb.transaction(dbStoreName, "readwrite");
      const store = tx.objectStore(dbStoreName);
      store.put(value, key);
      tx.oncomplete = () => {
        bumpMetric("idbWrites");
        resolve(true);
      };
      tx.onerror = () => resolve(false);
    });
  }

  async function idbRead(key) {
    if (!idb) return null;
    return await new Promise((resolve) => {
      const tx = idb.transaction(dbStoreName, "readonly");
      const store = tx.objectStore(dbStoreName);
      const req = store.get(key);
      req.onsuccess = () => {
        bumpMetric("idbReads");
        resolve(req.result || null);
      };
      req.onerror = () => resolve(null);
    });
  }

  const Shifter = PulseRealm.ShifterEvoluationaryPulse.evolvePulseV3({
    lane: "db",
    instanceId: "PulseDB-v31",

    // Required by evolvePulseV3
    pattern: "root",
    lineage: [],
    payload: {},
    priority: "normal",
    mode: "normal",
    pageId: "ENGINE_BLOCK",

    // Band mode for ONE-BAND binary engine
    bandMode: "binary",

    // Presence + harmonic fields (safe defaults)
    presenceBandState: null,
    harmonicDrift: 0,
    coherenceScore: 1,

    // Context hints (safe defaults)
    routerHint: null,
    meshHint: null,
    organHint: null,
    waveId: null,
    carrierType: null
  });



  function encodeBinary(record) {
    try {
      const encoded = Shifter.encode(record, { band: "binary" });
      const chunks = Shifter.chunk(encoded, { band: "binary" });
      bumpMetric("binaryOps");
      return { encoded, chunks };
    } catch (err) {
      if (trace) console.warn("[PulseDB-v31] encodeBinary failed:", err);
      return { encoded: "", chunks: [] };
    }
  }

  function decodeBinary(binary) {
    try {
      if (!binary || !binary.encoded) return null;
      const decoded = Shifter.decode(binary.encoded, { band: "binary" });
      bumpMetric("binaryOps");
      return decoded;
    } catch (err) {
      if (trace) console.warn("[PulseDB-v31] decodeBinary failed:", err);
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // Integrity + envelope shaping
  // ---------------------------------------------------------------------------
  function computeIntegrityHash(payload) {
    const json = JSON.stringify(payload || {});
    let hash = 0;
    for (let i = 0; i < json.length; i++) {
      hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
    }
    return "PulseEngineWorkFlowDB_" + hash.toString(16).padStart(8, "0");
  }

  function verifyIntegrity(envelope) {
    if (!envelope || typeof envelope !== "object") return false;
    const { integrity, binary, ...rest } = envelope;
    const base = { ...rest, binary: undefined, integrity: undefined };
    const recomputed = computeIntegrityHash(base);
    const ok = integrity === recomputed;
    if (!ok) bumpMetric("integrityFailures");
    return ok;
  }

  function nextSequence() {
    globalSequence += 1;
    return globalSequence;
  }

  function buildEnvelope(record, collectionName) {
    const seq = nextSequence();

    const lane = record.lane || record._lane || null;
    const jobType = record.jobType || record.type || null;
    const band = record.band || record._band || "symbolic";
    const gpuHint = record.gpuHint || null;
    const earnHint = record.earnHint || null;
    const harmonicsHint = record.harmonicsHint || record.harmonicHint || null;

    const base = {
      ...record,
      _collection: collectionName || null,
      _sequence: seq,
      _opType: "append",
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      schemaVersion: "v31",
      version: PulseDBMeta.version,
      timestamp: PulseRealm.PulseNOW,
      trustFabric: PulseDBMeta.trustFabric,
      meta: {
        lane,
        jobType,
        band,
        gpuHint: gpuHint || null,
        earnHint: earnHint || null,
        harmonicsHint: harmonicsHint || null,
        capabilityProfile: deviceProfile || null
      }
    };

    const integrity = computeIntegrityHash(base);
    const binary = encodeBinary(base);

    const envelope = {
      ...base,
      integrity,
      binary
    };

    metrics.envelopesCreated += 1;

    if (lane === "forward") bumpMetric("forwardEnvelopes");
    if (lane === "backward") bumpMetric("backwardEnvelopes");
    if (lane === "harmonics") bumpMetric("harmonicsEnvelopes");
    if (jobType === "EARN_TASK" || jobType === "EARN_SETTLEMENT" || jobType === "EARN_RECONCILE" || jobType === "EARN_CLEANUP") {
      bumpMetric("earnEnvelopes");
    }
    if (
      jobType === "GPU_CACHE" ||
      jobType === "BINARY_COMPUTE" ||
      jobType === "GPU_COMPUTE" ||
      jobType === "GPU_COMPUTE_PIXEL"
    ) {
      bumpMetric("gpuEnvelopes");
    }

    return envelope;
  }

  // ---------------------------------------------------------------------------
  // Collections + Firestore mirror
  // ---------------------------------------------------------------------------
  function ensureCollection(name) {
    const existing = MemoryOrgan.read(name);
    if (!Array.isArray(existing)) {
      MemoryOrgan.write(name, []);
      collections.add(name);
      metrics.collectionsCreated += 1;
      if (trace) console.log("[PulseDB-v31] Created collection:", name);
    } else {
      collections.add(name);
    }
  }

  async function firestoreMirrorWrite(name, entries) {
    if (!firestore || !firestore.collection) return;
    try {
      const colRef = firestore.collection(`${firestorePrefix}:${name}`);
      const batch = firestore.batch();
      for (const e of entries) {
        const docRef = colRef.doc(String(e._sequence));
        batch.set(docRef, e);
      }
      await batch.commit();
      bumpMetric("firestoreWrites", entries.length);
    } catch (err) {
      if (trace) console.warn("[PulseDB-v31] Firestore mirror write failed:", err);
    }
  }

  async function firestoreMirrorRead(name) {
    if (!firestore || !firestore.collection) return null;
    try {
      const colRef = firestore.collection(`${firestorePrefix}:${name}`);
      const snap = await colRef.get();
      const out = [];
      snap.forEach((doc) => out.push(doc.data()));
      bumpMetric("firestoreReads", out.length);
      return out;
    } catch (err) {
      if (trace) console.warn("[PulseDB-v31] Firestore mirror read failed:", err);
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // Core operations: append / read
  // ---------------------------------------------------------------------------
  async function append(name, record) {
    ensureCollection(name);

    const snap = MemoryOrgan.read(name);

    // ⭐ UNIVERSAL FIX: extract array safely
    const col =
      snap && snap.type === "collection" && Array.isArray(snap.value)
        ? snap.value
        : [];

    const entry = buildEnvelope(record, name);
    const next = [...col, entry];

    MemoryOrgan.write(name, next);
    bumpMetric("writes");
    markTs("lastWriteTs");

    if (idb) {
      await idbWrite(name, next);
    }
    if (firestore) {
      await firestoreMirrorWrite(name, [entry]);
    }

    if (trace) {
      console.log("[PulseDB-v31] Appended to", name, entry);
    }
    return entry;
  }


  async function appendMany(name, records = []) {
    ensureCollection(name);
    const col = MemoryOrgan.read(name) || [];
    const entries = records.map((r) => buildEnvelope(r, name));
    const next = [...col, ...entries];

    MemoryOrgan.write(name, next);
    bumpMetric("writes", entries.length);
    markTs("lastWriteTs");

    if (idb) {
      await idbWrite(name, next);
    }
    if (firestore) {
      await firestoreMirrorWrite(name, entries);
    }

    if (trace) {
      console.log("[PulseDB-v31] AppendedMany to", name, entries.length, "entries");
    }
    return entries;
  }

  async function read(name) {
    ensureCollection(name);
    bumpMetric("reads");
    markTs("lastReadTs");

    // IndexedDB shadow
    if (idb) {
      const fromIDB = await idbRead(name);
      if (Array.isArray(fromIDB)) return fromIDB;
    }

    // Firestore mirror (optional)
    if (firestore) {
      const fromFS = await firestoreMirrorRead(name);
      if (Array.isArray(fromFS) && fromFS.length) {
        return fromFS;
      }
    }

    return MemoryOrgan.read(name) || [];
  }

  async function readLatest(name, limit = 1) {
    const col = await read(name);
    if (!col.length) return [];
    const n = Math.max(0, limit | 0);
    if (n === 0) return [];
    return col.slice(-n);
  }

  // ---------------------------------------------------------------------------
  // Filters + decoding
  // ---------------------------------------------------------------------------
  function filterByCosmos(entries, cosmosFilter = {}) {
    if (!Array.isArray(entries)) return [];
    const {
      universeId,
      timelineId,
      branchId,
      shardId
    } = cosmosFilter;
    return entries.filter((e) => {
      const c = e.cosmos || {};
      if (universeId && c.universeId !== universeId) return false;
      if (timelineId && c.timelineId !== timelineId) return false;
      if (branchId && c.branchId !== branchId) return false;
      if (shardId && c.shardId !== shardId) return false;
      return true;
    });
  }

  function filterByLane(entries, lane) {
    if (!Array.isArray(entries) || !lane) return [];
    return entries.filter((e) => e.meta.lane === lane);
  }

  function filterByJobType(entries, jobType) {
    if (!Array.isArray(entries) || !jobType) return [];
    return entries.filter((e) => e.meta.jobType === jobType);
  }

  function decodeEnvelope(envelope, { verify = false } = {}) {
    if (!envelope || typeof envelope !== "object") return null;

    if (verify && !verifyIntegrity(envelope)) {
      if (trace) console.warn("[PulseDB-v31] Integrity verification failed for envelope:", envelope._sequence);
    }

    const decoded = decodeBinary(envelope.binary);
    if (decoded && typeof decoded === "object") {
      return decoded;
    }

    const {
      integrity,
      binary,
      _collection,
      _sequence,
      _opType,
      sessionId: envSession,
      cosmos,
      presence,
      advantage,
      schemaVersion,
      version,
      timestamp,
      trustFabric,
      meta,
      ...rest
    } = envelope;

    return { ...rest, meta: meta || null };
  }

  // ---------------------------------------------------------------------------
  // Snapshots + metrics
  // ---------------------------------------------------------------------------
  function snapshotCollections() {
    const names = Array.from(collections);
    const result = {};
    for (const name of names) {
      const col = MemoryOrgan.read(name) || [];
      result[name] = {
        count: col.length,
        latestSequence: col.length ? col[col.length - 1]._sequence || null : null
      };
    }
    return result;
  }

  function snapshot() {
    return {
      ts: PulseRealm.PulseNOW,
      meta: {
        identity: PulseDBMeta.id,
        version: PulseDBMeta.version,
        sessionId
      },
      cosmosContext,
      presenceContext,
      advantageContext,
      deviceProfile,
      metrics: { ...metrics },
      collections: snapshotCollections()
    };
  }

  function getMetrics() {
    return { ...metrics };
  }

  function listCollections() {
    return Array.from(collections);
  }

  return Object.freeze({
    meta: PulseDBMeta,
    append,
    appendMany,
    read,
    readLatest,
    ensureCollection,
    listCollections,
    filterByCosmos,
    filterByLane,
    filterByJobType,
    decodeEnvelope,
    getMetrics,
    snapshot
  });
}

export const PulseWorldDB = createPulseDB;

PulseRealm.EngineWorkFlow = {
  createPulseDB,
  PulseWorldDB,
  PulseDBMeta
}