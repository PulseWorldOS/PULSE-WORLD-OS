// ------------------------------------------------------------
// PULSE-PROTOCOL-PORTS.js
// IMMORTAL v33.0 — Unified Protocol Gateway (Signal‑Rooted, Addons‑Aware)
// ------------------------------------------------------------
//
//  - Signal is the primary expression membrane
//  - PulsePort IMMORTAL v33 auto‑integrated
//  - FinalityPort IMMORTAL auto‑bound
//  - Security IMMORTAL v33 aligned
//  - Addons IMMORTAL v33 attached + warmed
//  - Mesh / Bands / Pace / Signals auto‑attached if present
//  - Every port is a world‑layer expression surface
//  - Deterministic, drift‑proof, world‑aware
// ------------------------------------------------------------
import { ProtocolSignalPort, PulseSignalPort, __getPulseNetRegistry, __PulseMergedState, buildPulseWorldPort, FinalityPort } from "./PULSE-PROTOCOL-SIGNAL.js";
import { PulseSecurityPort, buildPulseIOKeyChainManager } from "./PULSE-PROTOCOL-SECURITY.js";
import { PulseProtocolAddons } from "./PULSE-PROTOCOL-ADDONS.js";
import { PulseProtocolCore } from "./PULSE-PROTOCOL-CORE.js";
import { PulseWorldAuthority } from "./PULSE-PROTOCOL-AUTHORITY.js";
import { ProtocolPulsePort, PulsePort } from "./PULSE-PROTOCOL-PULSE.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



const PulseMesh = PulseRealm.PulseMesh || null;
const PulseBand = PulseRealm.PulseBand || null;
const PulseSignals = PulseRealm.PulseSignals || null;
const PulsePace = PulseRealm.PulsePace || null;

// Optional: TrustCore presence (for conceptual anchoring)
const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

// ------------------------------------------------------------
// 4. IMMORTAL v33.0 — SIGNAL‑ROOTED PORT FAMILY
// ------------------------------------------------------------
//
//  Signal is the root membrane.
//  PulsePort is the world‑cycle engine.
//  SecurityPort is the trust membrane.
//  Addons extend ports at world‑layer.
//  Finality subsystems are deterministic world‑layer organs.
//  Mesh/Bands/Pace/Signals are optional world‑layer harmonizers.
// ------------------------------------------------------------

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulsePortsBridge] Pulse Protocol Ports Engaging..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);



export const PulseProtocolPorts = {
  // ⭐ PRIMARY EXPRESSION MEMBRANE
  signal: PulseSignalPort, // merged‑pulse engine (IMMORTAL v33)
  // ⭐ WORLD‑CYCLE ENGINE
  pulse: ProtocolPulsePort, // Pulse engine (timing + world cycles)
  core: ProtocolPulsePort, // Alias for world‑layer root

  // ⭐ SECURITY / TRUST
  security: PulseSecurityPort,

  // ⭐ ADDONS (IMMORTAL v33)
  addons: PulseProtocolAddons,

  // ⭐ OPTIONAL WORLD‑LAYER HARMONIZERS
  mesh: PulseMesh || null,
  bands: PulseBand || null,
  signals: PulseSignals || null,
  pace: PulsePace || null,

  // ⭐ CORE MEMBRANE (IMMORTAL v3)
  coreMembrane: PulseProtocolCore
};


// ------------------------------------------------------------
// 6. SIGNAL‑ROOTED EXPRESSION BINDING
// ------------------------------------------------------------
//
//  Every port becomes an expression surface.
//  Signal is the root membrane.
//  Pulse cycles feed into Signal.
//  Finality dispatch feeds back into Signal.
// ------------------------------------------------------------

try {

    FinalityPort.__ports = PulseProtocolPorts;
    FinalityPort.Ports = PulseProtocolPorts;
    PulseRealm.PulseLog(
  "signal","[PulsePortsSignal] Pulse Port Signal Bound to FinalityPort!");
  
} catch (err) {
  PulseRealm.PulseWarn(
  "signal",
    "[PulsePortsSignal] Pulse Port Signal Failed to Bind to FinalityPort:",
    err
  );
}

// ------------------------------------------------------------
// 5. AUTO‑INIT: Pulse Engine + Addons Warmup (IMMORTAL v33)
// ------------------------------------------------------------
//
//  PulsePort.autoInit() performs:
//   - world‑cycle warmup
//   - timing membrane activation
//   - deterministic world‑layer sync
//
//  Addons.attachAll() + warmAll() perform:
//   - addon instantiation
//   - ports extension
//   - addon init() pipeline
// ------------------------------------------------------------

try {
  const pulse = ProtocolPulsePort;

  if (pulse) {
    pulse.autoInit();
    PulseRealm.PulseLog(
  "signal","[PulsePortsBridge] Pulse Protocol Port Initialized & Open!");
  } else {
    PulseRealm.PulseWarn(
  "signal","[PulsePortsBridge] Pulse Protocol Port Missing..");
  }
} catch (err) {
  PulseRealm.PulseError(
  "signal","[PulsePortsBridge] Pulse Protocol Port Failed:", err);
}

try {
  const addons = PulseProtocolAddons;
    const { addons: attached } = addons.attachAll(PulseProtocolPorts) || {};
    PulseRealm.PulseLog(
  "signal",
      "[PulsePortsAddons] Pulse Protocol Addons AttachAll Executed!",
      attached ? Object.keys(attached) : []
    );

    addons
      .warmAll(PulseProtocolPorts, { phase: "boot" })
      .then(({ addons: warmed }) => {
        console.groupCollapsed(
          "%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulsePortsAddons] Addons WarmAll Completed!",
          "color:#7DF9FF;font-weight:bold;"
        );

        console.log("%cWarmed Addons:", "color:#00FF9C;font-weight:bold;");
        console.log( warmed ? Object.keys(warmed) : [] );

        console.groupEnd();
      })
      .catch(err => {
        PulseRealm.PulseError(
  "signal","[PulsePortsAddons] Pulse Protocol Addons WarmAll Failed:", err);
      });
} catch (err) {
  PulseRealm.PulseError(
  "signal","[PulsePortsAddons] Pulse Protocol Addons Init Failed:", err);
}

// ------------------------------------------------------------
// 7. AUTHORITY REGISTRATION (IMMORTAL v3)
// ------------------------------------------------------------
//
//  Authority tracks readiness of:
//   - Pulse engine
//   - Signal membrane
//   - Security membrane
//   - Addons
//   - Finality subsystems
//   - Mesh / Bands / Pace
//   - Core membrane
//
//  This attaches the entire port family as the world‑layer gateway.
// ------------------------------------------------------------

try {

    PulseWorldAuthority.attachPortFamily(PulseProtocolPorts);
    PulseRealm.PulseLog(
  "signal",
      "[PulsePortsBridge] Pulse Protocol Port Family Attached to Authority!"
    );
  
} catch {
  // IMMORTAL: never throw from authority attach
}


// ------------------------------------------------------------
// 8. GLOBAL BRIDGE (optional)
// ------------------------------------------------------------

export const ProtocolSignalPorts = ProtocolSignalPort;
export const PulseSignalPorts = PulseSignalPort;
export const PulseNetRegistry = __getPulseNetRegistry;
export const PulsedMergedState = __PulseMergedState;
export const PulseWorldPortBuild = buildPulseWorldPort;
export const ProtocolPulsePorts = ProtocolPulsePort;
export const PulsePorts = PulsePort;
export const ProtocolSecurityPorts = PulseSecurityPort;
export const buildPulseIOKeyChainManagers = buildPulseIOKeyChainManager;
// ------------------------------------------------------------
// 9. EXPORT — IMMORTAL v33 Unified Port Family
// ------------------------------------------------------------

  PulseRealm.ProtocolPorts = {
    PulseProtocolPorts,
    PulseWorldTrustCore,
    PulseMesh,
    PulseSignals,
    PulsePace,
    PulseBand,
    PulseSignalPort,
    buildPulseWorldPort
  }

PulseRealm.PulseProtocolPorts = PulseProtocolPorts;