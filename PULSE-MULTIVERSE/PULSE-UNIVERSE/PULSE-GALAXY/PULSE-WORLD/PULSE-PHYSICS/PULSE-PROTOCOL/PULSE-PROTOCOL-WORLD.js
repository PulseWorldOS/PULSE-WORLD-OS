// ============================================================================
// PULSE-PROTOCOL-WORLD.js (v33-IMMORTAL++)
// World surface over:
//   - PULSE-PROTOCOL-KERNEL-v33 (Runtime + BinarySubstrate)
//   - PulseWorldScheduler       (orchestrator)
//   - Optional: ports/addons/worldContext for richer execution context
// ----------------------------------------------------------------------------
// This file does NOT know about:
//   - ProtocolPort
//   - DNS
//   - Touch / UI
//
// It ONLY knows how to:
//   - host one or more organisms on a kernel
//   - schedule their execution
//   - provide a clean, deterministic world surface.
//   - expose lane-aware, continuance-aware, trust-aware world helpers.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { createKernel } from "./PULSE-PROTOCOL-KERNEL.js";
import { createScheduler } from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulseProtocolWorld] World surface over PulseKernel/PulseScheduler & All Other Ports/Addons/World Context Initializing..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);


const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

/**
 * WorldConfig:
 *  - kernel:    config passed to createKernel (substrate + runtime + trust)
 *  - scheduler: config passed to createScheduler (policies, priorities, etc.)
 *  - ports:     optional ProtocolPorts family (signal/pulse/security/addons...)
 *  - addons:    optional addons instance map
 *  - worldContext: optional symbolic world meta (region/tenant/etc.)
 */
export function createWorld(worldConfig = {}) {
  const {
    kernel: kernelConfig = {},
    scheduler: schedulerConfig = {},
    ports = null,
    addons = null,
    worldContext = null
  } = worldConfig;

  // 1. Bring the kernel online (substrate + runtime).
  const kernel = createKernel(kernelConfig);

  // 2. Bring the scheduler online over that kernel.
  const scheduler = createScheduler({
    ...schedulerConfig,
    kernel
  });

  // Internal registry of organisms in this world.
  const organisms = new Map();

  // Optional: world-level meta snapshot
  const worldMeta = {
    createdAt: PulseRealm.PulseNOW,
    ticks: 0,
    lastTickAt: null,
    context: worldContext || null
  };

  // ---------------------------------------------------------------------------
  // ORGANISM REGISTRATION
  // ---------------------------------------------------------------------------

  /**
   * Register a new organism into the world.
   * - organismId: stable identifier (string/number/UUID)
   * - organismDefinition: symbolic or binary, kernel will pack/mount it
   * - options: { laneId?, tags?, label?, schedulerOptions? }
   */
  function registerOrganism(organismId, organismDefinition, options = {}) {
    if (organisms.has(organismId)) {
      throw new Error(`World: organism '${organismId}' already registered.`);
    }

    const laneId = options.laneId ?? 0;

    const organismHandle = kernel.loadOrganism(organismDefinition, laneId, {
      tags: options.tags || [],
      label: options.label || null
    });

    const schedulingHandle = scheduler.registerOrganism(
      organismId,
      organismHandle,
      options.schedulerOptions || options
    );

    organisms.set(organismId, {
      organismHandle,
      schedulingHandle,
      options: { ...options, laneId }
    });

    return organismId;
  }

  /**
   * Remove an organism from the world.
   * - does NOT necessarily destroy snapshots; that’s substrate policy.
   */
  function unregisterOrganism(organismId) {
    const record = organisms.get(organismId);
    if (!record) return false;

    scheduler.unregisterOrganism(organismId, record.schedulingHandle);
    organisms.delete(organismId);
    return true;
  }

  // ---------------------------------------------------------------------------
  // WORLD TICK / RUN
  // ---------------------------------------------------------------------------

  /**
   * Advance the world by one scheduling tick.
   * - Scheduler decides which organisms run.
   * - Kernel guarantees deterministic execution.
   * - tickContext may include: hyperFrame, trustPulse, meta, etc.
   */
  function tickWorld(tickContext = {}) {
    const result = scheduler.tick({
      ...tickContext,
      ports,
      addons,
      worldContext: worldMeta.context
    });

    worldMeta.ticks += 1;
    worldMeta.lastTickAt = PulseRealm.PulseNOW;

    try {
      if (
        PulseWorldTrustCore &&
        typeof PulseWorldTrustCore.snapshotTrustCore === "function"
      ) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}

    return result;
  }

  /**
   * Run the world for N ticks.
   * - Useful for batch, replay, simulation, or headless runs.
   */
  function runWorld(ticks = 1, tickContext = {}) {
    let lastResult = null;
    for (let i = 0; i < ticks; i++) {
      lastResult = tickWorld(tickContext);
    }
    return lastResult;
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT / RESTORE
  // ---------------------------------------------------------------------------

  /**
   * Get a snapshot of a specific organism in this world.
   * - Delegates to kernel/substrate.
   */
  function getOrganismSnapshot(organismId, options = {}) {
    const record = organisms.get(organismId);
    if (!record) {
      throw new Error(`World: organism '${organismId}' not found.`);
    }
    return kernel.getStateSnapshot(record.organismHandle, options);
  }

  /**
   * Restore an organism into this world from a snapshot.
   * - Can be used for continuance, migration, replay.
   */
  function restoreOrganismFromSnapshot(organismId, snapshot, options = {}) {
    if (organisms.has(organismId)) {
      throw new Error(`World: organism '${organismId}' already exists.`);
    }

    const organismHandle = kernel.restoreFromSnapshot(snapshot);
    const schedulingHandle = scheduler.registerOrganism(
      organismId,
      organismHandle,
      options.schedulerOptions || options
    );

    organisms.set(organismId, {
      organismHandle,
      schedulingHandle,
      options: { ...options, laneId: snapshot.laneId ?? 0 }
    });

    return organismId;
  }

  // ---------------------------------------------------------------------------
  // INTROSPECTION
  // ---------------------------------------------------------------------------

  /**
   * Introspection: list all organisms currently hosted in this world.
   * - World-level view only; does not expose kernel internals.
   */
  function listOrganisms() {
    return Array.from(organisms.keys());
  }

  /**
   * Introspection: detailed organism info (lane, meta).
   */
  function listOrganismDetails() {
    const out = [];
    for (const [id, record] of organisms.entries()) {
      out.push({
        id,
        laneId: record.options.laneId ?? 0,
        options: { ...record.options }
      });
    }
    return out;
  }

  /**
   * World meta snapshot (ticks, lastTickAt, context).
   */
  function getWorldMeta() {
    return { ...worldMeta };
  }

  // ---------------------------------------------------------------------------
  // LOW-LEVEL ACCESSORS (for higher layers, not ProtocolPort directly)
// ---------------------------------------------------------------------------

  function getKernel() {
    return kernel;
  }

  function getScheduler() {
    return scheduler;
  }

  const world = {
    // Organism lifecycle
    registerOrganism,
    unregisterOrganism,

    // Execution
    tickWorld,
    runWorld,

    // Continuance
    getOrganismSnapshot,
    restoreOrganismFromSnapshot,

    // Introspection
    listOrganisms,
    listOrganismDetails,
    getWorldMeta,

    // Low-level
    getKernel,
    getScheduler
  };

  return Object.freeze(world);
}

PulseRealm.ProtocolWorld = {
  createWorld,
  PulseWorldTrustCore
}