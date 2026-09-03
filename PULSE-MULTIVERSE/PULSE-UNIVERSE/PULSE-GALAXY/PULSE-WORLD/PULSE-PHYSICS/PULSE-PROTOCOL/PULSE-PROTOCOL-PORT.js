// ------------------------------------------------------------
// PULSE-PROTOCOL-PORT.js (v4-IMMORTAL, v33 ALIGNMENT)
// Universal Expression Membrane over Authority + Core + Ports + World
// ------------------------------------------------------------
//
//  - Attaches to ProtocolWorld (World → Scheduler → Kernel → Runtime → Substrate)
//  - Integrates Authority IMMORTAL v3 + Core IMMORTAL v3 + Ports IMMORTAL v33
//  - Preserves PulsePort genius (import/export/subimport/organism)
//  - Provides a safe, finite, deterministic expression membrane
//  - Hybrid: world-aware + PulsePort-aware + Authority-aware + Core-aware
//  - PORT is the ultimate expression surface (logs, impulses, timeline, world)
//  - Designed for multi-world, file-based organisms with a nervous system
// ------------------------------------------------------------

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseWorldExpressMiddleLayer } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-TRANSPORT.js";
import {PulseProtocolPorts} from "./PULSE-PROTOCOL-PORTS.js";
import { createWorld } from "./PULSE-PROTOCOL-WORLD.js";
import { PulseWorldAuthority } from "./PULSE-PROTOCOL-AUTHORITY.js";
import { PulseProtocolCore } from "./PULSE-PROTOCOL-CORE.js";

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulseProtocolPort] Universal Expression Membrane over Authority + Core + Ports + World Running..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);


// Optional: TrustCore presence (for conceptual anchoring)
const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

// ------------------------------------------------------------
// World Context (symbolic, IMMORTAL)
// ------------------------------------------------------------

const WorldContext = {
  epoch: "IMMORTAL",
  version: "v4",
  world: "pulse-world",
  region: null,
  tenantId: null,
  meta: {}
};

// Optional: Page / Organism context shells
const PageContext = {
  id: null,
  route: null,
  meta: {}
};

const OrganismContext = {
  id: null,
  meta: {}
};

// Nervous system / band context (symbolic)
const NervousSystemContext = {
  band: "PulseBand",
  bandFamily: "core",
  dnaTag: "binary",
  meshTag: null,
  meta: {}
};

export async function loadPulseWorldExpress() {
  try {
    // This is your new server organ
    const layer = PulseWorldExpressMiddleLayer;

    if (!layer) {
      throw new Error("PulseWorldExpressLayer missing");
    }

    return layer;
  } catch (err) {
    PulseRealm.PulseError(
  "signal","[PulseWorldExpressLoader] Failed:", err);
    return null;
  }
}

export const expressS = loadPulseWorldExpress;

// ------------------------------------------------------------
// ProtocolPort v4 — universal expression membrane (v33-aligned)
// ------------------------------------------------------------

function ensurePulseGlobal() {
  if (!PulseRealm.PulseCoreGlobal) PulseRealm.PulseCoreGlobal = {};
  if (!PulseRealm.PulseCoreGlobal.pulseFunctions) PulseRealm.PulseCoreGlobal.pulseFunctions = {};
  if (!PulseRealm.PulseCoreGlobal.secrets) PulseRealm.PulseCoreGlobal.secrets = {};
  if (!PulseRealm.PulseCoreGlobal.runtime) PulseRealm.PulseCoreGlobal.runtime = {};
  if (!PulseRealm.PulseCoreGlobal.signal) PulseRealm.PulseCoreGlobal.signal = {};
  if (!PulseRealm.PulseCoreGlobal.routeMemory) PulseRealm.PulseCoreGlobal.routeMemory = {};
  if (!PulseRealm.PulseCoreGlobal.world) PulseRealm.PulseCoreGlobal.world = {};
  if (!PulseRealm.PulseCoreGlobal.ports) PulseRealm.PulseCoreGlobal.ports = {};
  return PulseRealm.PulseCoreGlobal;
}

export function createProtocolPort() {
  const PulseCoreGlobal = ensurePulseGlobal();

  // 1. Ports + Addons (already attached/warmed by PULSE-PROTOCOL-PORTS v33)
  const ports = PulseProtocolPorts;
  const addons = ports.addons
    ? ports.addons.getAllAddonInstances
      ? ports.addons.getAllAddonInstances({ ports })
      : {}
    : {};

  // 2. Bring the world online (World → Scheduler → Kernel → Runtime → Substrate)
  const world = createWorld({ ports, addons, worldContext: WorldContext });

  // 3. Soft registration with Authority + Core (IMMORTAL v3)
  try {
    if (typeof PulseWorldAuthority.attachCore === "function") {
      PulseWorldAuthority.attachCore(PulseProtocolCore);
    }
    if (typeof PulseWorldAuthority.attachPortFamily === "function") {
      PulseWorldAuthority.attachPortFamily(PulseProtocolPorts);
    }
  } catch {
    // IMMORTAL: never throw from authority integration
  }

  // Optional: TrustCore snapshot after world creation
  try {
    if (
      PulseWorldTrustCore &&
      typeof PulseWorldTrustCore.snapshotTrustCore === "function"
    ) {
      void PulseWorldTrustCore.snapshotTrustCore();
    }
  } catch {}

  // --------------------------------------------------------
  // Internal helpers
  // --------------------------------------------------------

  function getKernel() {
    return world.getKernel ? world.getKernel() : null;
  }

  function getRuntime() {
    const kernel = getKernel();
    return kernel && kernel.getRuntime ? kernel.getRuntime() : null;
  }

  function getRuntimeState() {
    const runtime = getRuntime();
    return runtime && runtime.getRuntimeState
      ? runtime.getRuntimeState()
      : null;
  }

  function getAuthorityStatus() {
    try {
      return typeof PulseWorldAuthority.status === "function"
        ? PulseWorldAuthority.status()
        : null;
    } catch {
      return null;
    }
  }

  function getNervousSystemState() {
    return {
      band: NervousSystemContext.band,
      bandFamily: NervousSystemContext.bandFamily,
      dnaTag: NervousSystemContext.dnaTag,
      meshTag: NervousSystemContext.meshTag,
      meta: { ...NervousSystemContext.meta }
    };
  }

  // --------------------------------------------------------
  // Unified expression dispatch (Signal → World Tick)
//  - channel/payload/context are treated as a world-level expression
//  - security + signal ports still participate, but world is the executor
//  - authority/core/ports/nervous system are visible in the expression context
  // --------------------------------------------------------
  async function express(channel, payload = {}, context = {}) {
    const signal = ports.signal;
    const security = ports.security;

    const mergedContext = {
      ...context,
      world: { ...WorldContext },
      page: { ...PageContext },
      organism: { ...OrganismContext },
      nervousSystem: getNervousSystemState(),
      authorityStatus: getAuthorityStatus()
    };

    // 1. Resolve security key surfaces
    const keyBridge = security.keyBridge(
      { channel, payload, ...mergedContext },
      mergedContext
    );

    // 2. Emit signal (for observers / metrics)
    signal.emit(channel, { payload, context: mergedContext });

    // 3. Run a world tick
    const tickResult = await world.tickWorld({
      channel,
      payload,
      context: mergedContext,
      keyBridge,
      ports,
      addons,
      worldContext: WorldContext
    });

    // 4. Allow addons to post-process
    for (const addon of Object.values(addons)) {
      if (addon && typeof addon.afterDispatch === "function") {
        try {
          await addon.afterDispatch({
            channel,
            context: mergedContext,
            payload,
            result: tickResult,
            ports,
            addons,
            world: WorldContext
          });
        } catch {}
      }
    }

    // Optional: TrustCore snapshot after expression
    try {
      if (
        PulseWorldTrustCore &&
        typeof PulseWorldTrustCore.snapshotTrustCore === "function"
      ) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}

    return tickResult;
  }

  // Backwards-compatible dispatch alias
  async function dispatch(channel, fn, context = {}) {
    const payload = typeof fn === "function" ? { fn } : {};
    return express(channel, payload, context);
  }

  // --------------------------------------------------------
  // Specialized expression helpers (nervous system lanes)
//  - These are semantic lanes over the same express() core
  // --------------------------------------------------------

  function expressSignal(kind, payload = {}, context = {}) {
    return express(`signal.${kind}`, payload, context);
  }

  function expressPulse(kind, payload = {}, context = {}) {
    return express(`pulse.${kind}`, payload, context);
  }

  function expressWorld(kind, payload = {}, context = {}) {
    return express(`world.${kind}`, payload, context);
  }

  function expressPage(kind, payload = {}, context = {}) {
    return express(`page.${kind}`, payload, context);
  }

  function expressOrganism(kind, payload = {}, context = {}) {
    return express(`organism.${kind}`, payload, context);
  }

  function expressSecurity(kind, payload = {}, context = {}) {
    return express(`security.${kind}`, payload, context);
  }

  function expressMesh(kind, payload = {}, context = {}) {
    return express(`mesh.${kind}`, payload, context);
  }

  function expressBand(kind, payload = {}, context = {}) {
    return express(`band.${kind}`, payload, context);
  }

  function expressPace(kind, payload = {}, context = {}) {
    return express(`pace.${kind}`, payload, context);
  }

  // --------------------------------------------------------
  // World-layer helpers (explicit world control)
// --------------------------------------------------------

  function tickWorld(tickContext = {}) {
    return world.tickWorld(tickContext);
  }

  function runWorld(ticks = 1, tickContext = {}) {
    return world.runWorld(ticks, tickContext);
  }

  function registerOrganism(organismId, organismDefinition, options = {}) {
    OrganismContext.id = organismId ?? OrganismContext.id;
    OrganismContext.meta = { ...OrganismContext.meta, ...(options.meta || {}) };
    return world.registerOrganism(organismId, organismDefinition, options);
  }

  function unregisterOrganism(organismId) {
    if (OrganismContext.id === organismId) {
      OrganismContext.id = null;
      OrganismContext.meta = {};
    }
    return world.unregisterOrganism(organismId);
  }

  function getWorldState() {
    return {
      world: WorldContext,
      page: PageContext,
      organism: OrganismContext,
      nervousSystem: getNervousSystemState(),
      runtimeState: getRuntimeState()
    };
  }

  // --------------------------------------------------------
  // PulsePort surfaces (explicit Pulse-layer)
// --------------------------------------------------------

  function pulseImport(id, flag = false) {
    return ports.pulse.import(id, flag);
  }

  function pulseExport(id, value, meta = {}) {
    return ports.pulse.export(id, value, meta);
  }

  function pulseSubimport(id, path) {
    return ports.pulse.subimport(id, path);
  }

  function pulseOrganism() {
    return ports.pulse.organism();
  }

  // --------------------------------------------------------
  // World-layer context helpers
  // --------------------------------------------------------

  function setWorld(meta = {}) {
    WorldContext.region = meta.region ?? WorldContext.region;
    WorldContext.tenantId = meta.tenantId ?? WorldContext.tenantId;
    WorldContext.meta = { ...WorldContext.meta, ...meta };
  }

  function getWorld() {
    return { ...WorldContext };
  }

  function setPage(meta = {}) {
    PageContext.id = meta.id ?? PageContext.id;
    PageContext.route = meta.route ?? PageContext.route;
    PageContext.meta = { ...PageContext.meta, ...meta };
  }

  function getPage() {
    return { ...PageContext };
  }

  function setNervousSystem(meta = {}) {
    NervousSystemContext.band = meta.band ?? NervousSystemContext.band;
    NervousSystemContext.bandFamily =
      meta.bandFamily ?? NervousSystemContext.bandFamily;
    NervousSystemContext.dnaTag = meta.dnaTag ?? NervousSystemContext.dnaTag;
    NervousSystemContext.meshTag = meta.meshTag ?? NervousSystemContext.meshTag;
    NervousSystemContext.meta = {
      ...NervousSystemContext.meta,
      ...meta
    };
  }

  function getNervousSystem() {
    return getNervousSystemState();
  }

  // --------------------------------------------------------
  // Final ProtocolPort v4 surface
  // --------------------------------------------------------

  const ProtocolPort = {
    // Raw ports (core surfaces, including PulsePort)
    ports,

    // Addons (extended surfaces)
    addons,

    // Contexts
    world: WorldContext,
    page: PageContext,
    organism: OrganismContext,
    nervousSystem: NervousSystemContext,

    // Expression membrane (core)
    express,
    dispatch,

    // Nervous system lanes
    lanes: {
      signal: expressSignal,
      pulse: expressPulse,
      world: expressWorld,
      page: expressPage,
      organism: expressOrganism,
      security: expressSecurity,
      mesh: expressMesh,
      band: expressBand,
      pace: expressPace
    },

    // World control
    tickWorld,
    runWorld,
    registerOrganism,
    unregisterOrganism,
    getWorldState,

    // PulsePort abilities (explicit Pulse-layer)
    pulse: {
      import: pulseImport,
      export: pulseExport,
      subimport: pulseSubimport,
      organism: pulseOrganism
    },

    // World-layer helpers
    setWorld,
    getWorld,
    setPage,
    getPage,

    // Nervous system helpers
    setNervousSystem,
    getNervousSystem
  };

  // --------------------------------------------------------
  // UNIVERSAL PORT MEMBRANE (IMMORTAL v4, v33-aligned)
//  - PORT ports into everything it can see, safely
//  - No assumptions, only soft integrations
  // --------------------------------------------------------

  (function installUniversalPortMembrane(PP) {
    
    // 2) TouchSignals → ProtocolPort (if present)
    try {
      const TS = PulseRealm.TouchSignals || PulseRealm.PulseTouchSignals || null;
      if (TS && TS.logs && typeof TS.logs.log === "function") {
        const originalTSLog = TS.logs.log.bind(TS.logs);
        TS.logs.log = function (kind, payload = {}) {
          PP.lanes.signal("touch_log", { kind, payload }).catch(() => {});
          return originalTSLog(kind, payload);
        };
      }

      if (TS && TS.timeline && typeof TS.timeline.append === "function") {
        const originalAppend = TS.timeline.append.bind(TS.timeline);
        TS.timeline.append = function (kind, payload = {}) {
          PP.lanes.signal("touch_timeline", { kind, payload }).catch(() => {});
          return originalAppend(kind, payload);
        };
      }
    } catch {}

    // 3) TouchMeaning / impulses → ProtocolPort (if present)
    try {
      const TM = PulseRealm.TouchMeaning || PulseRealm.PulseTouchMeaning || null;
      if (TM && typeof TM.emitImpulse === "function") {
        const originalEmit = TM.emitImpulse.bind(TM);
        TM.emitImpulse = function (impulse, meta = {}) {
          PP.lanes.signal("touch_impulse", { impulse, meta }).catch(() => {});
          return originalEmit(impulse, meta);
        };
      }

      if (TM && typeof TM.worldEntry === "function") {
        const originalWorldEntry = TM.worldEntry.bind(TM);
        TM.worldEntry = function (impulse) {
          PP.lanes.world("touch_world_entry", { impulse }).catch(() => {});
          return originalWorldEntry(impulse);
        };
      }
    } catch {}

    // 4) PulsePort import/export/subimport → ProtocolPort
    try {
      const p = PP.pulse;

      const _import = p.import;
      p.import = function (id, flag) {
        PP.lanes.pulse("import", { id, flag }).catch(() => {});
        return _import(id, flag);
      };

      const _export = p.export;
      p.export = function (id, value, meta) {
        PP.lanes.pulse("export", { id, value, meta }).catch(() => {});
        return _export(id, value, meta);
      };

      const _subimport = p.subimport;
      p.subimport = function (id, path) {
        PP.lanes.pulse("subimport", { id, path }).catch(() => {});
        return _subimport(id, path);
      };
    } catch {}

    // 5) Page-level lifecycle hooks (if present)
    try {
      const originalOnLoad = PulseRealm.onload || null;
      PulseRealm.onload = function (event) {
        PP.lanes.page("load", { event }).catch(() => {});
        if (typeof originalOnLoad === "function") {
          return originalOnLoad(event);
        }
      };
    } catch {}
  })(ProtocolPort);

  return ProtocolPort;
}

// ------------------------------------------------------------
// Default export: auto-created ProtocolPort v4-IMMORTAL (v33-aligned)
// ------------------------------------------------------------

    PulseRealm.PulseProtocolPort = {
      createProtocolPort,
      NervousSystemContext,
      PulseWorldTrustCore
    }
