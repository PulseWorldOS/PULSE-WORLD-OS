// ============================================================================
// FILE: PULSE-PROTOCOL-KERNEL-v33.js
// PULSE PROTOCOL KERNEL — IMMORTAL++ HYPERFRAME EXECUTION CORE — v33
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministic execution core over PulseWorldBinarySubstrate + PulseWorldRuntime.
//   • No scheduler, no protocol, no world, no UI.
//   • Just: pure, drift-proof execution over a binary substrate.
//   • v33-aware: lanes, hyperFrame, continuance, oneBand, trustPulse surfaces.
//   • Extended: lane APIs, trust snapshots, continuance helpers, meta lanes.
// ----------------------------------------------------------------------------
// DESIGN CONTRACT (IMMORTAL++):
//   • No process/argv/env/import.meta.url
//   • No timers, no randomness, no I/O
//   • No global mutation, no world identity
//   • Deterministic per call, per kernel instance
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { createBinarySubstrate } from "../X-PULSE-X/PULSE-WORLD-SUBSTRATE.js";
import { createRuntime } from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulsePortKernel] Deterministic Execution Core over PulseWorld Running..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);



const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

// ============================================================================
// METADATA
// ============================================================================

export const PULSE_KERNEL_VERSION = "v33-IMMORTAL++-HYPERFRAME";
export const PULSE_KERNEL_LAYER = "PULSE-PROTOCOL-KERNEL";
export const PULSE_KERNEL_ROLE = "BINARY-RUNTIME-EXECUTION-CORE";

export const PULSE_KERNEL_META = Object.freeze({
  identity: "PulseProtocol.Kernel",
  version: PULSE_KERNEL_VERSION,
  layer: PULSE_KERNEL_LAYER,
  role: PULSE_KERNEL_ROLE,
  evo: {
    binarySubstrateV33: true,
    worldRuntimeV33: true,
    continuanceAware: true,
    oneBandAware: true,
    hyperFrameAware: true,
    lanesAware: true,
    trustPulseAware: true,
    metaLanesAware: true,
    zeroIO: true,
    zeroScheduler: true,
    zeroWorldBinding: true
  },
  contract: {
    never: [
      "process",
      "window",
      "document",
      "setTimeout",
      "setInterval",
      "fetch",
      "WebSocket",
      "eval"
    ]
  }
});

// ============================================================================
// KERNEL CONFIG SHAPE (DOCUMENTATION)
// ----------------------------------------------------------------------------
// KernelConfig (all optional):
//   {
//     substrate: {
//       lanes?: number,
//       binaryMode?: "binary" | "hybrid" | "symbolic",
//       continuanceMode?: "auto" | "strict" | "off",
//       oneBandMode?: "auto" | "off"
//     },
//     runtime: {
//       stepPhysics?: "discrete" | "frame",
//       maxOpsPerStep?: number,
//       hyperFrameMode?: "auto" | "strict",
//       laneCount?: number
//     },
//     trust?: {
//       enableSnapshots?: boolean
//     }
//   }
// ============================================================================

function normalizeKernelConfig(kernelConfig = {}) {
  const {
    substrate: substrateConfig = {},
    runtime: runtimeConfig = {},
    trust: trustConfig = {}
  } = kernelConfig || {};

  const normSubstrate = {
    lanes: substrateConfig.lanes ?? 16,
    binaryMode: substrateConfig.binaryMode ?? "binary",
    continuanceMode: substrateConfig.continuanceMode ?? "auto",
    oneBandMode: substrateConfig.oneBandMode ?? "auto",
    ...substrateConfig
  };

  const normRuntime = {
    stepPhysics: runtimeConfig.stepPhysics ?? "discrete",
    maxOpsPerStep: runtimeConfig.maxOpsPerStep ?? 10_000,
    hyperFrameMode: runtimeConfig.hyperFrameMode ?? "auto",
    laneCount: runtimeConfig.laneCount ?? normSubstrate.lanes,
    ...runtimeConfig
  };

  const normTrust = {
    enableSnapshots: trustConfig.enableSnapshots ?? true,
    ...trustConfig
  };

  return {
    substrate: normSubstrate,
    runtime: normRuntime,
    trust: normTrust
  };
}

// ============================================================================
// ORGANISM HANDLE SHAPE (DOCUMENTATION)
// ----------------------------------------------------------------------------
//   {
//     id: string,
//     laneId: number,
//     binaryHandle: any,
//     runtimeHandle: any,
//     meta: {
//       createdAt: number,
//       lastStepAt: number | null,
//       steps: number,
//       continuanceId: string | null,
//       tags: string[],
//       label: string | null
//     }
//   }
// ============================================================================

let __kernelOrganismIdCounter = 0;

function nextOrganismId() {
  __kernelOrganismIdCounter = (__kernelOrganismIdCounter + 1) >>> 0;
  return `org_${__kernelOrganismIdCounter.toString(16).padStart(8, "0")}`;
}

// ============================================================================
// KERNEL FACTORY — IMMORTAL EXECUTION CORE
// ============================================================================

export function createKernel(kernelConfig = {}) {
  const normalized = normalizeKernelConfig(kernelConfig);

  // 1. Create the binary substrate (lowest layer)
  const substrate = createBinarySubstrate(normalized.substrate);

  // 2. Create the runtime over that substrate (execution engine)
  const runtime = createRuntime({
    ...normalized.runtime,
    substrate
  });

  // --------------------------------------------------------------------------
  // INTERNAL: ORGANISM REGISTRY (IN-MEMORY, PER-KERNEL)
// --------------------------------------------------------------------------
  const organisms = Object.create(null);

  function registerOrganism(handle) {
    organisms[handle.id] = handle;
    return handle;
  }

  function getOrganism(handleOrId) {
    if (!handleOrId) return null;
    if (typeof handleOrId === "string") return organisms[handleOrId] || null;
    if (handleOrId.id && organisms[handleOrId.id]) return organisms[handleOrId.id];
    return null;
  }

  function listOrganisms() {
    return Object.values(organisms).map(h => ({
      id: h.id,
      laneId: h.laneId,
      meta: { ...h.meta }
    }));
  }

  // --------------------------------------------------------------------------
  // LANE HELPERS (META LAYERS)
// --------------------------------------------------------------------------

  function getLaneCount() {
    return normalized.substrate.lanes;
  }

  function listLanes() {
    const lanes = [];
    const count = getLaneCount();
    for (let i = 0; i < count; i++) {
      lanes.push({
        laneId: i,
        organisms: listOrganisms()
          .filter(o => o.laneId === i)
          .map(o => o.id)
      });
    }
    return lanes;
  }

  function getLaneOrganisms(laneId) {
    return listOrganisms().filter(o => o.laneId === laneId);
  }

  // --------------------------------------------------------------------------
  // LOAD ORGANISM
  // --------------------------------------------------------------------------

  function loadOrganism(organismDefinition, laneId = 0, options = {}) {
    const binaryImage = substrate.packOrganism(organismDefinition, {
      laneId,
      binaryMode: normalized.substrate.binaryMode,
      oneBandMode: normalized.substrate.oneBandMode
    });

    const runtimeHandle = runtime.mountOrganism(binaryImage, {
      laneId,
      hyperFrameMode: normalized.runtime.hyperFrameMode
    });

    const id = nextOrganismId();
    const now = PulseRealm.PulseNOW;

    const handle = {
      id,
      laneId,
      binaryHandle: binaryImage,
      runtimeHandle,
      meta: {
        createdAt: now,
        lastStepAt: null,
        steps: 0,
        continuanceId: null,
        tags: Array.isArray(options.tags) ? [...options.tags] : [],
        label: options.label || null
      }
    };

    return registerOrganism(handle);
  }

  // --------------------------------------------------------------------------
  // STEP — SINGLE DETERMINISTIC TICK
  // --------------------------------------------------------------------------

  function step(organismHandle, stepContext = {}) {
    const handle = getOrganism(organismHandle);
    if (!handle) return null;

    const ctx = {
      laneId: handle.laneId,
      hyperFrame: stepContext.hyperFrame || null,
      deltaFrame: stepContext.deltaFrame || null,
      continuanceFrame: stepContext.continuanceFrame || null,
      oneBandFrame: stepContext.oneBandFrame || null,
      trustPulse: stepContext.trustPulse || null,
      runtimeHints: stepContext.runtimeHints || null
    };

    const result = runtime.stepOrganism(handle.runtimeHandle, ctx);

    handle.meta.steps += 1;
    handle.meta.lastStepAt = PulseRealm.PulseNOW;

    if (normalized.trust.enableSnapshots && PulseWorldTrustCore) {
      try {
        if (typeof PulseWorldTrustCore.snapshotTrustCore === "function") {
          void PulseWorldTrustCore.snapshotTrustCore();
        }
      } catch {}
    }

    return result;
  }

  // --------------------------------------------------------------------------
  // RUN — N STEPS, STILL DETERMINISTIC
  // --------------------------------------------------------------------------

  function run(organismHandle, steps = 1, stepContext = {}) {
    const handle = getOrganism(organismHandle);
    if (!handle) return null;

    let lastResult = null;
    for (let i = 0; i < steps; i++) {
      lastResult = step(handle, stepContext);
    }
    return lastResult;
  }

  // --------------------------------------------------------------------------
  // CONTINUANCE HELPERS (ID + SNAPSHOT)
// --------------------------------------------------------------------------

  function assignContinuanceId(organismHandle, continuanceId) {
    const handle = getOrganism(organismHandle);
    if (!handle) return null;
    handle.meta.continuanceId = continuanceId || null;
    return { id: handle.id, continuanceId: handle.meta.continuanceId };
  }

  function findByContinuanceId(continuanceId) {
    if (!continuanceId) return null;
    const all = Object.values(organisms);
    for (const h of all) {
      if (h.meta.continuanceId === continuanceId) return h;
    }
    return null;
  }

  // --------------------------------------------------------------------------
  // SNAPSHOT / RESTORE — CONTINUANCE
  // --------------------------------------------------------------------------

  function getStateSnapshot(organismHandle, options = {}) {
    const handle = getOrganism(organismHandle);
    if (!handle) return null;

    const snapshot = substrate.snapshotOrganism(handle.binaryHandle, {
      laneId: handle.laneId,
      includeContinuance: options.includeContinuance ?? true,
      includeOneBand: options.includeOneBand ?? true,
      includeRuntimeFrame: options.includeRuntimeFrame ?? true
    });

    return {
      kernelVersion: PULSE_KERNEL_VERSION,
      kernelLayer: PULSE_KERNEL_LAYER,
      organismId: handle.id,
      laneId: handle.laneId,
      meta: { ...handle.meta },
      snapshot
    };
  }

  function restoreFromSnapshot(snapshotEnvelope) {
    if (!snapshotEnvelope || !snapshotEnvelope.snapshot) return null;

    const restoredBinaryHandle = substrate.restoreOrganism(
      snapshotEnvelope.snapshot,
      {
        laneId: snapshotEnvelope.laneId
      }
    );

    const runtimeHandle = runtime.registerRestoredOrganism(
      restoredBinaryHandle,
      {
        laneId: snapshotEnvelope.laneId
      }
    );

    const id = snapshotEnvelope.organismId || nextOrganismId();
    const now = PulseRealm.PulseNOW;

    const handle = {
      id,
      laneId: snapshotEnvelope.laneId ?? 0,
      binaryHandle: restoredBinaryHandle,
      runtimeHandle,
      meta: {
        createdAt: snapshotEnvelope.meta.createdAt || now,
        lastStepAt: snapshotEnvelope.meta.lastStepAt || null,
        steps: snapshotEnvelope.meta.steps || 0,
        continuanceId: snapshotEnvelope.meta.continuanceId || null,
        tags: Array.isArray(snapshotEnvelope.meta.tags)
          ? [...snapshotEnvelope.meta.tags]
          : [],
        label: snapshotEnvelope.meta.label || null
      }
    };

    return registerOrganism(handle);
  }

  // --------------------------------------------------------------------------
  // LOW-LEVEL ACCESSORS (WORLD-ONLY, NOT PROTOCOL)
// --------------------------------------------------------------------------

  function getSubstrate() {
    return substrate;
  }

  function getRuntime() {
    return runtime;
  }

  function getKernelMeta() {
    return {
      ...PULSE_KERNEL_META,
      substrateConfig: { ...normalized.substrate },
      runtimeConfig: { ...normalized.runtime },
      trustConfig: { ...normalized.trust },
      organisms: listOrganisms()
    };
  }

  // --------------------------------------------------------------------------
  // KERNEL SURFACE
  // --------------------------------------------------------------------------

  const kernel = {
    version: PULSE_KERNEL_VERSION,
    layer: PULSE_KERNEL_LAYER,
    role: PULSE_KERNEL_ROLE,
    meta: PULSE_KERNEL_META,

    // Organism lifecycle
    loadOrganism,
    step,
    run,

    // Continuance
    getStateSnapshot,
    restoreFromSnapshot,
    assignContinuanceId,
    findByContinuanceId,

    // Lanes
    getLaneCount,
    listLanes,
    getLaneOrganisms,

    // Introspection
    getSubstrate,
    getRuntime,
    listOrganisms,
    getKernelMeta
  };

  return Object.freeze(kernel);
}


PulseRealm.ProtocolKernel = {
  createKernel,
  PULSE_KERNEL_META
}