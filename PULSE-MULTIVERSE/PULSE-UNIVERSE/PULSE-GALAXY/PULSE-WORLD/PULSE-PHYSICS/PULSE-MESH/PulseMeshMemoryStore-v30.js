// ============================================================================
// FILE: PulseMeshMemoryStore-v34-IMMORTAL+++
// Mesh-Tier Memory Store with CoreMemory Integration
// Deterministic • Zero Routing Influence • IMMORTAL+++
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export function createPulseMeshMemoryStore({
  CoreMemory = PulseRealm.PulseCoreMemory,   // optional v24 core memory
  log = console.log,
  warn = console.warn,
  error = console.error
} = {}) {

  // -------------------------------------------------------------------------
  // INTERNAL STORAGE (mesh-tier)
  // -------------------------------------------------------------------------
  const meshStore = new Map();

  // -------------------------------------------------------------------------
  // READ — mesh first, then core fallback
  // -------------------------------------------------------------------------
  function get(key) {
    try {
      if (meshStore.has(key)) {
        return meshStore.get(key);
      }

      // fallback to CoreMemory (read-only)
      if (CoreMemory && typeof CoreMemory.read === "function") {
        return CoreMemory.read(key);
      }
    } catch (err) {
      warn("[PulseMeshMemoryStore] get failed", { key, err });
    }
    return undefined;
  }

  // -------------------------------------------------------------------------
  // WRITE — mesh-tier only
  // -------------------------------------------------------------------------
  function set(key, value) {
    try {
      meshStore.set(key, value);
    } catch (err) {
      warn("[PulseMeshMemoryStore] set failed", { key, err });
    }
  }

  // -------------------------------------------------------------------------
  // DELETE — mesh-tier only
  // -------------------------------------------------------------------------
  function remove(key) {
    try {
      meshStore.delete(key);
    } catch (err) {
      warn("[PulseMeshMemoryStore] remove failed", { key, err });
    }
  }

  // -------------------------------------------------------------------------
  // CLEAR — mesh-tier only
  // -------------------------------------------------------------------------
  function clear() {
    try {
      meshStore.clear();
    } catch (err) {
      warn("[PulseMeshMemoryStore] clear failed", err);
    }
  }

  // -------------------------------------------------------------------------
  // ENTRIES — mesh-tier only
  // -------------------------------------------------------------------------
  function entries() {
    return meshStore.entries();
  }

  // -------------------------------------------------------------------------
  // SNAPSHOT — combined mesh + core view
  // -------------------------------------------------------------------------
  function snapshot() {
    const out = {};

    // mesh-tier first
    for (const [k, v] of meshStore.entries()) {
      out[k] = v;
    }

    // core-tier fallback
    try {
      if (CoreMemory && typeof CoreMemory.snapshot === "function") {
        const coreSnap = CoreMemory.snapshot();
        for (const k of Object.keys(coreSnap)) {
          if (!(k in out)) out[k] = coreSnap[k];
        }
      }
    } catch {}

    return out;
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    get,
    set,
    delete: remove,
    clear,
    entries,
    snapshot,

    meta: {
      organ: "PulseMeshMemoryStore",
      version: "v34-IMMORTAL+++",
      hybrid: !!CoreMemory,
      meshTier: true,
      coreFallback: !!CoreMemory
    }
  };
}
