// ============================================================================
// FILE: PulseMeshMemory-v34-IMMORTAL+++
// Hybrid Memory Organ: MeshMemory + CoreMemory Integration
// Metadata-Safe • Drift-Proof • Zero Routing Influence • IMMORTAL+++
// ============================================================================
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { createPulseMeshMemoryStore } from "./PulseMeshMemoryStore-v30.js";

export const MeshMemoryInstance = createPulseMeshMemoryStore();

export function createPulseMeshMemory({
  CoreMemory = null,   // v24 IMMORTAL memory organ
  MeshMemory = MeshMemoryInstance,     // your mesh-tier memory store
  log = console.log,
  warn = console.warn,
  error = console.error
} = {}) {

  // -------------------------------------------------------------------------
  // INTERNAL SAFETY CHECKS
  // -------------------------------------------------------------------------
  if (!CoreMemory) {
    try { CoreMemory = PulseCoreGMemory; } catch(e) { CoreMemory = PulseRealm?.PulseCoreMemory; }
  }

  const core = CoreMemory && typeof CoreMemory.read === "function"
    ? CoreMemory
    : null;

  const mesh = MeshMemory && typeof MeshMemory.get === "function"
    ? MeshMemory
    : null;

  if (!core) warn("[PulseMeshMemory] CoreMemory unavailable (non-fatal)");
  if (!mesh) warn("[PulseMeshMemory] MeshMemory unavailable (non-fatal)");

  // -------------------------------------------------------------------------
  // READ — unified read from Mesh → Core fallback
  // -------------------------------------------------------------------------
  function read(key) {
    try {
      // 1. MeshMemory first (fast, local, low-latency)
      if (mesh) {
        const val = mesh.get(key);
        if (val !== undefined) return val;
      }

      // 2. CoreMemory fallback (semantic, persistent, v24 IMMORTAL)
      if (core) {
        return core.read(key);
      }
    } catch (err) {
      warn("[PulseMeshMemory] read failed", { key, err });
    }
    return undefined;
  }

  // -------------------------------------------------------------------------
  // WRITE — writes to MeshMemory only (CoreMemory is read-only)
  // -------------------------------------------------------------------------
  function write(key, value) {
    try {
      if (mesh && typeof mesh.set === "function") {
        mesh.set(key, value);
      }
    } catch (err) {
      warn("[PulseMeshMemory] write failed", { key, err });
    }
  }

  // -------------------------------------------------------------------------
  // DELETE — mesh-tier only
  // -------------------------------------------------------------------------
  function remove(key) {
    try {
      if (mesh && typeof mesh.delete === "function") {
        mesh.delete(key);
      }
    } catch (err) {
      warn("[PulseMeshMemory] remove failed", { key, err });
    }
  }

  // -------------------------------------------------------------------------
  // SNAPSHOT — combined Mesh + Core view
  // -------------------------------------------------------------------------
  function snapshot() {
    const out = {};

    try {
      if (mesh && typeof mesh.entries === "function") {
        for (const [k, v] of mesh.entries()) {
          out[k] = v;
        }
      }
    } catch {}

    try {
      if (core && typeof core.snapshot === "function") {
        const coreSnap = core.snapshot();
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
    read,
    write,
    remove,
    snapshot,

    // metadata
    meta: {
      organ: "PulseMeshMemory",
      version: "v34-IMMORTAL+++",
      hybrid: true,
      coreIntegrated: !!core,
      meshIntegrated: !!mesh
    }
  };
}
