// ============================================================================
// FILE: /PULSE-OS/PulseOSCNSNervousSystem-v30-Immortal-DualBand-Mesh.js
// PULSE OS — v30‑IMMORTAL‑DUALBAND‑PULSEBAND‑MESH‑AWARE
// “THE CENTRAL NERVOUS SYSTEM / COMMUNICATION INTELLIGENCE ORGAN”
//
//  • v30: PulseBand + MeshBand dual-organism (symbolic/binary + mesh/signal)
//  • v30: CNS-level passive/active PageScanner integration (always-on, no timers)
//  • v30: Band/dnaTag/meshTag aware routing + deterministic health snapshots
//  • v30: Optimized routing path, recursion‑safe, offline/online split preserved
//  • v30: DualBand AI auto‑boot preserved, tagged with CNS + Mesh context
//  • v30: PulseBandSignal + MeshBandSignal remembered in CNS memory
// ============================================================================
import { createPulseSkinReflex as PageScannerV12,PulseProofReflex,PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { createPulseWorldBandCheckBand as checkBand } from "../PULSE-BAND/PULSE-BAND-CHECK.js";
import { createPulseUICompiler } from "../../../../../_CREATION_BARRIER/PULSE-BOOT-COMPILER.js";
import {PulseOSCheckRouterMemory as checkRouterMemory} from "../Pulse-Coordinator/PulseProxyMemoryRouter-v30.js";
import { getStripe } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js";
import { PulsePort } from "../PULSE-PROTOCOL/PULSE-PROTOCOL-PULSE.js";
import { PulseOSShortTermMemory } from "./PulseOSShortTermMemory.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
// CNS META
// ============================================================================

export const PulseOSCNSNervousSystemMeta = Object.freeze({
  identity: "PulseOSCNSNervousSystem",
  version: "v30-Immortal-DualBand-Mesh",
  layer: "B-Layer",
  role: "COMMUNICATION INTELLIGENCE ORGAN",
  schemaVersion: "v4",
  guarantees: {
    pureComputeCore: true,
    dualBandAware: true,
    meshAware: true,
    pulseBandAware: true,
    deterministicHealing: true
  },
  bands: {
    pulseBand: true,
    meshBand: true,
    dualBand: true
  }
});

// ============================================================================
// CNS CONSTANTS + DIAGNOSTICS
// ============================================================================

const LAYER_ID   = "CNS-LAYER";
const LAYER_NAME = "THE CENTRAL NERVOUS SYSTEM";
const LAYER_ROLE = "COMMUNICATION INTELLIGENCE ORGAN";
const LAYER_VER  = PulseOSCNSNervousSystemMeta.version;


// ============================================================================
// ROUTER MEMORY + HEARTBEAT
// ============================================================================

const RouterMemory = checkRouterMemory;

const GateHeartbeat =
  (PulseOSShortTermMemory && PulseOSShortTermMemory.GateHeartbeat) ||
  (PulseRealm.GateHeartbeat) ||
  null;

// Base logger (diagnostics only, non-contract)
const baseLog = PulseRealm.PulseLog || console.log;

const CNS_DIAGNOSTICS_ENABLED =
  (PulseRealm.PULSE_CNS_DIAGNOSTICS === "true" ||
    PulseRealm.PULSE_DIAGNOSTICS === "true");

const logCNS = (stage, details = {}) => {
  if (!CNS_DIAGNOSTICS_ENABLED) return;

  baseLog(JSON.stringify({
    pulseLayer: LAYER_ID,
    pulseName:  LAYER_NAME,
    pulseRole:  LAYER_ROLE,
    pulseVer:   LAYER_VER,
    stage,
    ...details
  }));
};

logCNS("CNS_INIT");

// ============================================================================
// BAND MODEL — PULSEBAND + MESH BAND (DUAL ORGANISM)
// ============================================================================

const ROUTE_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary",
  DUAL: "dual",
  MESH: "mesh"
};

const BAND_FAMILY = {
  PULSEBAND: "PulseBand",
  MESHBAND: "meshband"
};

function normalizeBand(band) {
  const b = (band || ROUTE_BANDS.SYMBOLIC).toLowerCase();
  if (b === ROUTE_BANDS.BINARY) return ROUTE_BANDS.BINARY;
  if (b === ROUTE_BANDS.DUAL) return ROUTE_BANDS.DUAL;
  if (b === ROUTE_BANDS.MESH) return ROUTE_BANDS.MESH;
  return ROUTE_BANDS.SYMBOLIC;
}

function resolveBandFromPayload(payload) {
  const band = payload && typeof payload.__band === "string"
    ? payload.__band.toLowerCase()
    : ROUTE_BANDS.SYMBOLIC;

  return normalizeBand(band);
}

function resolveBandFamilyFromPayload(payload) {
  const family = payload && typeof payload.__bandFamily === "string"
    ? payload.__bandFamily.toLowerCase()
    : BAND_FAMILY.PULSEBAND;

  if (family === BAND_FAMILY.MESHBAND) return BAND_FAMILY.MESHBAND;
  return BAND_FAMILY.PULSEBAND;
}

function resolveDnaTagFromPayload(payload) {
  return payload && typeof payload.__dnaTag === "string"
    ? payload.__dnaTag
    : null;
}

function resolveMeshTagFromPayload(payload) {
  return payload && typeof payload.__meshTag === "string"
    ? payload.__meshTag
    : null;
}

function makeErrorSignature(err) {
  const msg = String(err);
  const stack = err.stack || "";
  const top = stack.split("\n")[1] || "NO_FRAME";
  return msg + "::" + top.trim();
}

const UICompiler = createPulseUICompiler();
// ============================================================================
// CNS‑LEVEL PAGESCANNER BRIDGE — ALWAYS‑ON PASSIVE/ACTIVE SCANNER
// ============================================================================

const CNSPageScanner = {
  emit(event, context = {}) {
    try {
      if (!PageScannerV12 || typeof PageScannerV12.buildDriftPacket !== "function") {
        return;
      }

      const packet = PageScannerV12.buildDriftPacket({
        event,
        layer: "B-Layer",
        subsystem: "CNS",
        cnsIdentity: PulseOSCNSNervousSystemMeta.identity,
        ...context
      });

      if (
        PulseRealm.PageScannerAdapter &&
        typeof PulseRealm.PageScannerAdapter.onEvent === "function"
      ) {
        PulseRealm.PageScannerAdapter.onEvent(packet);
      }

      if (typeof packet.severity === "number") {
        logCNS("CNS_PAGESCANNER_EVENT", {
          event,
          severity: packet.severity,
          tooFar: !!packet.tooFar
        });
      }
    } catch {
      // Scanner must never break CNS
    }
  }
};

// ============================================================================
// ROUTE FAILURE STATE
// ============================================================================

let routeFailureCount = 0;
let routerEventSeq = 0;

// ============================================================================
// CNS CONTEXT MAP — v30 dual‑band + mesh‑aware + PulseBand
// ============================================================================

const CNS_CONTEXT = {
  label: "CNS",
  layer: "B-Layer",
  purpose: "Frontend → Backend Communication Organ",
  context: "Sends structured requests to backend via Proxy Spine gateway",
  version: LAYER_VER,

  bandModel: {
    dualBand: true,
    pulseBand: true,
    meshBand: true
  },

  modes: {
    offline: "local-endpoint",
    online: "proxy-spine"
  },

  pulseBand: {
    cns: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryOverlay: true
  },

  meshBand: {
    cns: true,
    routingPrimary: true,
    signalAware: true
  }
};

// ============================================================================
// CNS HEALING STATE — v30
// ============================================================================

const CNS_HEALING = {
  lastBandCheck: null,
  lastIdentityCheck: null,
  lastRouterMemoryCheck: null,
  lastHealRequestCount: 0,
  lastHealAppliedCount: 0,
  lastHealError: null,
  lastRouteErrorSignature: null,
  lastRouteBand: null,
  lastRouteBandFamily: null,
  lastRouteDnaTag: null,
  lastRouteMeshTag: null
};

function safeRun(label, fn) {
  try {
    const res = fn();
    return res === undefined ? { ok: true, surface: label } : res;
  } catch (err) {
    return { ok: false, error: String(err), surface: label };
  }
}

// ============================================================================
// PULSEBAND + MESHBAND SIGNAL MEMORY (REMEMBERABLE SIGNALS)
// ============================================================================
// ============================================================================
// PULSEBAND SIGNAL MODEL — UNIFIED BAND / SIGNAL STATE (v30+ IMMORTAL)
// ============================================================================

const UNIFIED_ROUTE_BANDS = Object.freeze({
  SYMBOLIC: ROUTE_BANDS.SYMBOLIC,
  BINARY: ROUTE_BANDS.BINARY,
  DUAL: ROUTE_BANDS.DUAL,
  MESH: ROUTE_BANDS.MESH
});

const UNIFIED_BAND_FAMILY = Object.freeze({
  PULSEBAND: BAND_FAMILY.PULSEBAND,
  MESHBAND: BAND_FAMILY.MESHBAND
});

// Unified signal snapshot for CNS + all organs that read PulseBandSignalMemory
const PulseBandSignalMemory = {
  lastBand: UNIFIED_ROUTE_BANDS.SYMBOLIC,
  lastBandFamily: UNIFIED_BAND_FAMILY.PULSEBAND,
  lastDnaTag: null,
  lastMeshTag: null,
  lastUpdatedAt: null,

  // NEW: richer telemetry for healing + routing introspection
  lastRouteType: null,
  lastRouteContext: null,
  lastOfflineMode: false,
  lastErrorSignature: null
};

function normalizeUnifiedBand(band) {
  const b = normalizeBand(band);
  // v30+ rule: any legacy / unknown band collapses into SYMBOLIC over PulseBand
  if (!Object.values(UNIFIED_ROUTE_BANDS).includes(b)) {
    return UNIFIED_ROUTE_BANDS.SYMBOLIC;
  }
  return b;
}

function normalizeUnifiedBandFamily(family) {
  const f = (family || UNIFIED_BAND_FAMILY.PULSEBAND).toLowerCase();
  if (f === UNIFIED_BAND_FAMILY.MESHBAND) return UNIFIED_BAND_FAMILY.MESHBAND;
  return UNIFIED_BAND_FAMILY.PULSEBAND;
}

function rememberPulseBandSignal({
  band,
  bandFamily,
  dnaTag,
  meshTag,
  routeType = null,
  routeContext = null,
  offlineMode = false,
  errorSignature = null
}) {
  PulseBandSignalMemory.lastBand = normalizeUnifiedBand(band);
  PulseBandSignalMemory.lastBandFamily = normalizeUnifiedBandFamily(bandFamily);
  PulseBandSignalMemory.lastDnaTag = dnaTag || null;
  PulseBandSignalMemory.lastMeshTag = meshTag || null;
  PulseBandSignalMemory.lastUpdatedAt = PulseRealm.PulseNOW;
  PulseBandSignalMemory.lastRouteType = routeType;
  PulseBandSignalMemory.lastRouteContext = routeContext;
  PulseBandSignalMemory.lastOfflineMode = !!offlineMode;
  PulseBandSignalMemory.lastErrorSignature = errorSignature || null;


    // Expose a stable, read‑only snapshot for other organs / UI
    PulseRealm.PulseBandSignalMemory = {
      ...PulseBandSignalMemory
    };
  

  logCNS("PULSEBAND_SIGNAL_REMEMBERED", {
    band: PulseBandSignalMemory.lastBand,
    bandFamily: PulseBandSignalMemory.lastBandFamily,
    dnaTag: PulseBandSignalMemory.lastDnaTag,
    meshTag: PulseBandSignalMemory.lastMeshTag,
    routeType: PulseBandSignalMemory.lastRouteType,
    offlineMode: PulseBandSignalMemory.lastOfflineMode
  });
}

function getCurrentPulseBandSignal() {
  // Always return a copy to avoid accidental mutation
  return { ...PulseBandSignalMemory };
}

// ============================================================================
// TRANSPORT LAYER — OFFLINE + ONLINE (UNIFIED PULSEBAND SIGNAL AWARE v30+)
// ============================================================================

const Transport = {
  async callEndpoint(type, payload) {
    const offlineMode =
      PulseRealm.PULSE_OFFLINE_MODE === true;

    // v30+ unified band resolution: everything flows through the same
    // PulseBandSignalMemory, even when bandFamily is meshband / checkband.
    const band = resolveBandFromPayload(payload);
    const bandFamily = resolveBandFamilyFromPayload(payload);
    const dnaTag = resolveDnaTagFromPayload(payload);
    const meshTag = resolveMeshTagFromPayload(payload);

    // Pre‑remember the signal for this route attempt
    rememberPulseBandSignal({
      band,
      bandFamily,
      dnaTag,
      meshTag,
      routeType: type,
      routeContext: "callEndpoint:init",
      offlineMode
    });

    // OFFLINE BAND
    if (offlineMode) {
      logCNS("TRANSPORT_OFFLINE_MODE", { type, band, bandFamily });
      CNSPageScanner.emit("cns-transport-offline-call", {
        type,
        band,
        bandFamily,
        payloadShape: payload ? Object.keys(payload) : []
      });

      const localEndpoint =
        PulseRealm.PulseLocalEndpoint &&
        typeof PulseRealm.PulseLocalEndpoint.handle === "function"
          ? PulseRealm.PulseLocalEndpoint
          : null;

      if (localEndpoint) {
        try {
          const result = await localEndpoint.handle({
            type,
            payload,
            CNS_CONTEXT,
            band,
            bandFamily,
            dnaTag,
            meshTag
          });

          rememberPulseBandSignal({
            band,
            bandFamily,
            dnaTag,
            meshTag,
            routeType: type,
            routeContext: "callEndpoint:offline:success",
            offlineMode
          });

          logCNS("TRANSPORT_OFFLINE_RESPONSE", { type, band, bandFamily });
          CNSPageScanner.emit("cns-transport-offline-response", {
            type,
            band,
            bandFamily
          });
          return result;
        } catch (err) {
          const msg = String(err);
          const sig = makeErrorSignature(err);

          routeFailureCount += 1;
          CNS_HEALING.lastRouteErrorSignature = sig;
          CNS_HEALING.lastRouteBand = band;
          CNS_HEALING.lastRouteBandFamily = bandFamily;
          CNS_HEALING.lastRouteDnaTag = dnaTag;
          CNS_HEALING.lastRouteMeshTag = meshTag;

          rememberPulseBandSignal({
            band,
            bandFamily,
            dnaTag,
            meshTag,
            routeType: type,
            routeContext: "callEndpoint:offline:error",
            offlineMode,
            errorSignature: sig
          });

          logCNS("TRANSPORT_OFFLINE_ERROR", {
            type,
            band,
            bandFamily,
            message: msg,
            errorSignature: sig,
            routeFailureCount
          });
          CNSPageScanner.emit("cns-transport-offline-error", {
            type,
            band,
            bandFamily,
            message: msg
          });
          return { error: "Offline local endpoint failed", details: msg };
        }
      }

      logCNS("TRANSPORT_OFFLINE_NO_HANDLER", { type, band, bandFamily });
      CNSPageScanner.emit("cns-transport-offline-no-handler", {
        type,
        band,
        bandFamily
      });
      return { error: "Offline mode: no local endpoint handler registered" };
    }

    // ONLINE BAND
    routerEventSeq += 1;
    logCNS("TRANSPORT_ONLINE_CALL", {
      type,
      band,
      bandFamily,
      seq: routerEventSeq
    });

    CNSPageScanner.emit("cns-transport-online-call", {
      type,
      band,
      bandFamily,
      payloadShape: payload ? Object.keys(payload) : [],
      seq: routerEventSeq
    });

    // band-aware remote endpoint selection (CheckBand vs Remote)
    const remoteEndpoint =
      band === "checkband"
        ? (PulseRealm.PulseCheckBandEndpoint &&
            typeof PulseRealm.PulseCheckBandEndpoint.handle === "function"
              ? PulseRealm.PulseCheckBandEndpoint
              : null)
        : (PulseRealm.PulseRemoteEndpoint &&
            typeof PulseRealm.PulseRemoteEndpoint.handle === "function"
              ? PulseRealm.PulseRemoteEndpoint
              : null);

    if (!remoteEndpoint) {
      const label = band === "checkband" ? "CHECKBAND" : "REMOTE";

      rememberPulseBandSignal({
        band,
        bandFamily,
        dnaTag,
        meshTag,
        routeType: type,
        routeContext: `callEndpoint:online:no_${label.toLowerCase()}_endpoint`,
        offlineMode: false
      });

      logCNS(`TRANSPORT_ONLINE_NO_${label}_ENDPOINT`, { type, band, bandFamily });
      CNSPageScanner.emit("cns-transport-online-no-remote", {
        type,
        band,
        bandFamily
      });
      return {
        error:
          band === "checkband"
            ? "No CheckBand endpoint handler registered"
            : "No remote endpoint handler registered for online band"
      };
    }

    try {
      let result;

      // hook‑aware routing
      if (type === "hook" && payload.name) {
        result = await remoteEndpoint.handle({
          type: "hook",
          hookName: payload.name,
          hookPayload: payload.payload,
          context: CNS_CONTEXT,
          band,
          bandFamily,
          dnaTag,
          meshTag
        });
      } else {
        result = await remoteEndpoint.handle({
          type,
          payload,
          context: CNS_CONTEXT,
          band,
          bandFamily,
          dnaTag,
          meshTag
        });
      }

      rememberPulseBandSignal({
        band,
        bandFamily,
        dnaTag,
        meshTag,
        routeType: type,
        routeContext: "callEndpoint:online:success",
        offlineMode: false
      });

      logCNS("TRANSPORT_ONLINE_RESPONSE", { type, band, bandFamily });
      CNSPageScanner.emit("cns-transport-online-response", {
        type,
        band,
        bandFamily
      });

      return result;
    } catch (err) {
      const msg = String(err);
      const sig = makeErrorSignature(err);

      routeFailureCount += 1;
      CNS_HEALING.lastRouteErrorSignature = sig;
      CNS_HEALING.lastRouteBand = band;
      CNS_HEALING.lastRouteBandFamily = bandFamily;
      CNS_HEALING.lastRouteDnaTag = dnaTag;
      CNS_HEALING.lastRouteMeshTag = meshTag;

      rememberPulseBandSignal({
        band,
        bandFamily,
        dnaTag,
        meshTag,
        routeType: type,
        routeContext: "callEndpoint:online:error",
        offlineMode: false,
        errorSignature: sig
      });

      logCNS("TRANSPORT_ONLINE_ERROR", {
        type,
        band,
        bandFamily,
        message: msg,
        errorSignature: sig,
        routeFailureCount
      });
      CNSPageScanner.emit("cns-transport-online-error", {
        type,
        band,
        bandFamily,
        message: msg
      });
      return { error: "Online remote endpoint failed", details: msg };
    }
  },

  async callCheckRouterMemory(logs) {
    const offlineMode =
      PulseRealm.PULSE_OFFLINE_MODE === true;

    CNS_HEALING.lastRouterMemoryCheck = safeRun("checkRouterMemory", () =>
      checkRouterMemory(logs)
    );

    if (offlineMode) {
      rememberPulseBandSignal({
        band: "checkband",
        bandFamily: BAND_FAMILY.PULSEBAND,
        dnaTag: null,
        meshTag: null,
        routeType: "CheckRouterMemory",
        routeContext: "heal:skip_offline",
        offlineMode: true
      });

      logCNS("HEAL_SKIP_OFFLINE", { count: logs.length, band: "offline" });
      CNSPageScanner.emit("cns-heal-skip-offline", {
        count: logs.length,
        band: "offline"
      });

      return null;
    }

    const data = await Transport.callEndpoint("CheckRouterMemory", {
      __band: "checkband",
      logs
    });

    rememberPulseBandSignal({
      band: "checkband",
      bandFamily: BAND_FAMILY.PULSEBAND,
      dnaTag: null,
      meshTag: null,
      routeType: "CheckRouterMemory",
      routeContext: "heal:remote_response",
      offlineMode: false
    });

    CNSPageScanner.emit("cns-heal-remote-response", {
      count: logs.length,
      band: "checkband"
    });

    return data;
  },

  async callRouteDownAlert(error, type) {
    const offlineMode =
      PulseRealm.PULSE_OFFLINE_MODE === true;

    if (offlineMode) {
      rememberPulseBandSignal({
        band: "checkband",
        bandFamily: BAND_FAMILY.PULSEBAND,
        dnaTag: null,
        meshTag: null,
        routeType: "RouteDownAlert",
        routeContext: "alert:skip_offline",
        offlineMode: true
      });

      logCNS("ALERT_SKIP_OFFLINE", { error, type, band: "offline" });
      CNSPageScanner.emit("cns-alert-skip-offline", {
        error,
        type,
        band: "offline"
      });

      return;
    }

    try {
      await Transport.callEndpoint("RouteDownAlert", {
        __band: "checkband",
        error,
        routeType: type
      });

      rememberPulseBandSignal({
        band: "checkband",
        bandFamily: BAND_FAMILY.PULSEBAND,
        dnaTag: null,
        meshTag: null,
        routeType: "RouteDownAlert",
        routeContext: "alert:sent",
        offlineMode: false
      });

      logCNS("ALERT_SENT", { type, band: "checkband" });
      CNSPageScanner.emit("cns-alert-sent", {
        error,
        type,
        band: "checkband"
      });
    } catch (err) {
      const msg = String(err);
      const sig = makeErrorSignature(err);

      rememberPulseBandSignal({
        band: "checkband",
        bandFamily: BAND_FAMILY.PULSEBAND,
        dnaTag: null,
        meshTag: null,
        routeType: "RouteDownAlert",
        routeContext: "alert:remote_error",
        offlineMode: false,
        errorSignature: sig
      });

      logCNS("ALERT_REMOTE_ERROR", {
        message: msg,
        band: "checkband",
        errorSignature: sig
      });

      CNSPageScanner.emit("cns-alert-remote-error", {
        error,
        type,
        band: "checkband",
        message: msg
      });
    }
  }
};

// ============================================================================
// CNS PUBLIC ORGAN FACTORY — v30+ UNIFIED PULSEBAND SIGNAL
// ============================================================================

export function createPulseOSCNSNervousSystem() {
  PulseRealm.PulseLog(
    "cns",
    "[PulseOSCNSNervousSystem] — Pulse OS CNS Nervous System is Sparking.. (THE CENTRAL NERVOUS SYSTEM / COMMUNICATION INTELLIGENCE ORGAN)."
  );

  // ============================================================================
  // INTERNAL CNS STATE (deterministic, reflex-safe)
  // ============================================================================
  let __CNS_CURRENT_STATE__ = {
    fate: "ok",
    severity: 0,
    driftSignature: "",
    tier: "",
    degraded: false
  };

  // ============================================================================
  // NORMALIZER — ensures CNS state is always safe + deterministic
  // ============================================================================
  function normalizeCNSState(raw = null) {
    if (!raw || typeof raw !== "object") {
      return {
        fate: "ok",
        severity: 0,
        driftSignature: "",
        tier: "",
        degraded: false
      };
    }

    return {
      fate: raw.fate || "ok",
      severity: raw.severity || 0,
      driftSignature: raw.driftSignature || "",
      tier: raw.tier || "",
      degraded: !!raw.degraded
    };
  }

  // ============================================================================
  // PUBLIC: getCurrentState() — reflex-safe CNS snapshot
  // ============================================================================
  function getCurrentState() {
    return Object.freeze({ ...__CNS_CURRENT_STATE__ });
  }

  // ============================================================================
  // PUBLIC: current — direct accessor (deterministic proxy)
  // ============================================================================
  const current = new Proxy(
    {},
    {
      get() {
        return getCurrentState();
      }
    }
  );

  // ============================================================================
  // INTERNAL: updateCNSState — called by Transport spine
  // ============================================================================
  function updateCNSState(newState) {
    __CNS_CURRENT_STATE__ = normalizeCNSState(newState);
  }

  // ============================================================================
  // TRANSPORT SPINE — unified CNS-aware band router
  // ============================================================================
  const Transport = {
    callEndpoint(type, payload) {
      try {
        const result = PulseProofReflex.call(type, payload);
        if (result && result.cns) {
          updateCNSState(result.cns);
        }
        return result;
      } catch {
        return null;
      }
    },

    callCheckRouterMemory(logs) {
      try {
        const result = PulseProofReflex.call("checkRouterMemory", logs);
        if (result && result.cns) {
          updateCNSState(result.cns);
        }
        return result;
      } catch {
        return null;
      }
    },

    callRouteDownAlert(error, routeType) {
      try {
        const result = PulseProofReflex.call("routeDownAlert", {
          error,
          routeType
        });
        if (result && result.cns) {
          updateCNSState(result.cns);
        }
        return result;
      } catch {
        return null;
      }
    }
  };

  // ============================================================================
  // BAND SIGNAL MEMORY — deterministic
  // ============================================================================
  let __PULSE_BAND_SIGNAL__ = null;

  function getCurrentPulseBandSignal() {
    return __PULSE_BAND_SIGNAL__;
  }

  function rememberPulseBandSignal(signal) {
    __PULSE_BAND_SIGNAL__ = signal || null;
  }

  // ============================================================================
  // CNS HEALING PROFILE — deterministic
  // ============================================================================
  const CNS_HEALING = Object.freeze({
    renewalKind: "cns_reflex",
    renewalBand: "dual",
    renewalMode: "strict"
  });

  // ============================================================================
  // FINAL ORGAN EXPORT — v40 CNS Nervous System
  // ============================================================================
  return Object.freeze({
    meta: PulseOSCNSNervousSystemMeta,
    context: CNS_CONTEXT,

    // CNS unified transport spine
    transport: Transport,

    // CNS state accessors
    getCurrentState,
    current,

    // Band signals
    getPulseBandSignal: getCurrentPulseBandSignal,
    rememberPulseBandSignal,

    // Healing / CheckBand state
    healingState: CNS_HEALING,

    // Explicit CheckBand channel
    checkband: {
      call: (type, payload) =>
        Transport.callEndpoint(type, { ...payload, __band: "checkband" }),

      checkRouterMemory: (logs) =>
        Transport.callCheckRouterMemory(logs),

      routeDownAlert: (error, routeType) =>
        Transport.callRouteDownAlert(error, routeType)
    },

    // Explicit PulseBand channel
    pulseband: {
      call: (type, payload) =>
        Transport.callEndpoint(type, { ...payload, __band: "PulseBand" })
    },

    // RelayBand (TouchRelay / PathPhysics / 3D Relay)
    relayband: {
      call: (type, payload) =>
        Transport.callEndpoint(type, { ...payload, __band: "relayband" })
    },

    // 3D Band (OutwardPulse / PathPhysics3D)
    band3d: {
      call: (type, payload) =>
        Transport.callEndpoint(type, { ...payload, __band: "3dband" })
    }
  });
}

// ============================================================================
// NETLIFY FUNCTIONS (PRESERVED, LIGHTLY TIDIED)
// ============================================================================

function json(obj, status = 200) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-uid",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    },
    body: JSON.stringify(obj)
  };
}

export const getStripeStatus = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const body = JSON.parse(event.body || "{}");
    const { uid, token, stripeAccountId: incomingId } = body;

    if (!uid || !token) {
      return json({ success: false, error: "Missing uid or token" });
    }

    const userSnap = await db.collection("Users").doc(uid).get();
    if (!userSnap.exists) {
      return json({ success: false, error: "User not found" });
    }

    const user = userSnap.data() || {};
    const TPIdentity = user.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" });
    }
   
    const stripe = new getStripe(process.env.STRIPE_PASSWORD);
    const stripeAccountID =
      incomingId ||
      TPIdentity.stripeAccountID ||
      null;

    if (!stripeAccountID) {
      return json({
        success: true,
        status: "not_connected",
        onboardingLink:
          `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
      });
    }

    const acct = await stripe.accounts.retrieve(stripeAccountID);

    if (acct.charges_enabled && acct.payouts_enabled) {
      return json({
        success: true,
        status: "connected",
        dashboardLink: `https://dashboard.stripe.com/connect/accounts/${acct.id}`
      });
    }

    if (acct.requirements.currently_due.length > 0) {
      return json({
        success: true,
        status: "needs_verification",
        onboardingLink:
          `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
      });
    }

    return json({
      success: true,
      status: "pending",
      onboardingLink:
        `https://createorgetstripeaccount-ilx3agka5q-uc.a.run.app?email=${encodeURIComponent(TPIdentity.email || "")}`
    });

  } catch (err) {
    console.error("getStripeStatus error:", err);
    return json({ success: false, error: "Server error: " + err.message });
  }
};

export const getLogHtml = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const id = event.queryStringParameters.logId;

    if (!id) {
      return json({ success: false, error: "Missing logId" }, 400);
    }

    const doc = await db.collection("EmailLogs").doc(id).get();

    if (!doc.exists) {
      return json({ success: false, error: "Log not found" }, 404);
    }

    const data = doc.data() || {};
    return json({
      success: true,
      html: data.html || ""
    });

  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
};

export const getAllLogs = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const uid = event.headers["x-uid"] || null;

    if (!token || !uid) {
      return json({ success: false, error: "Missing uid or token" }, 403);
    }

    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const email = (event.queryStringParameters.email || "").trim().toLowerCase();
    if (!email) {
      return json({ success: false, error: "Missing email" }, 400);
    }

    const snap = await db
      .collection("EmailLogs")
      .where("to", "==", email)
      .orderBy("createdAt", "desc")
      .limit(500)
      .get();

    const safeMillis = (ts) =>
      ts.toMillis() ??
      (ts._seconds ? ts._seconds * 1000 : null);

    const logs = snap.docs.map((doc) => {
      const d = doc.data() || {};
      return {
        id: doc.id,
        to: d.to || null,
        subject: d.subject || null,
        status: d.status || null,
        type: d.type || null,
        payload: d.payload || null,
        createdAt: safeMillis(d.createdAt),
        updatedAt: safeMillis(d.updatedAt)
      };
    });

    return json({ success: true, logs });

  } catch (err) {
    console.error("getAllLogs error:", err);
    return json({ success: false, error: err.message }, 500);
  }
};

export const getAllOrders = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const uid = event.headers["x-uid"] || null;

    if (!token || !uid) {
      return json({ success: false, error: "Missing uid or token" }, 403);
    }

    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const email = (event.queryStringParameters.email || "").trim().toLowerCase();
    if (!email) {
      return json({ success: false, error: "Missing email" }, 400);
    }

    const customerSnap = await db
      .collection("Orders")
      .where("customerEmail", "==", email)
      .orderBy("createdAt", "desc")
      .get();

    const delivererSnap = await db
      .collection("Orders")
      .where("delivererEmail", "==", email)
      .orderBy("createdAt", "desc")
      .get();

    const safeMillis = (ts) =>
      ts.toMillis() ??
      (ts._seconds ? ts._seconds * 1000 : null);

    const orders = {};

    const add = (docs) => {
      docs.forEach((doc) => {
        const d = doc.data() || {};
        const orderID = d.orderID || doc.id;

        orders[orderID] = {
          id: doc.id,
          orderID,
          customerEmail: d.customerEmail || null,
          delivererEmail: d.delivererEmail || null,
          vendorEmail: d.vendorEmail || null,
          status: d.status || null,
          items: d.items || [],
          total: d.total || 0,

          createdAt: safeMillis(d.createdAt),
          updatedAt: safeMillis(d.updatedAt),
          orderedAt: safeMillis(d.orderedAt),
          deliveredAt: safeMillis(d.deliveredAt)
        };
      });
    };

    add(customerSnap.docs);
    add(delivererSnap.docs);

    return json({
      success: true,
      orders: Object.values(orders)
    });

  } catch (err) {
    console.error("getAllOrders error:", err);
    return json({ success: false, error: err.message }, 500);
  }
};

export const getAllUsers = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const authHeader = event.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const uid = event.headers["x-uid"] || null;

    if (!token || !uid) {
      return json({ success: false, error: "Missing uid or token" }, 403);
    }

    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const snap = await db
      .collection("Users")
      .orderBy("TPIdentity.createdAt", "desc")
      .get();

    const safeMillis = (ts) => {
      if (!ts) return null;
      if (typeof ts.toMillis === "function") return ts.toMillis();
      if (ts._seconds) return ts._seconds * 1000;
      if (typeof ts === "number") return ts;
      return null;
    };

    const safeNum = (v) =>
      Number.isFinite(Number(v)) ? Number(v) : 0;

    const users = snap.docs.map((doc) => {
      const data = doc.data() || {};
      const id = doc.id;

      const TPIdentity = data.TPIdentity || {};
      const TPLoyalty = data.TPLoyalty || {};
      const TPNotifications = data.TPNotifications || {};
      const TPSecurity = data.TPSecurity || {};

      return {
        id,

        email: TPIdentity.email || null,
        name: TPIdentity.name || null,
        role: TPIdentity.role || "Customer",
        phone: TPIdentity.phone || null,
        country: TPIdentity.country || null,

        loyalty: {
          pointsBalance: safeNum(TPLoyalty.pointsBalance),
          lifetimePoints: safeNum(TPLoyalty.lifetimePoints),
          referralCode: TPLoyalty.referralCode || null,
          referredBy: TPLoyalty.referredBy || null
        },

        notifications: {
          receiveMassEmails: TPNotifications.receiveMassEmails ?? true,
          receiveSMS: TPNotifications.receiveSMS ?? false
        },

        createdAt: safeMillis(TPIdentity.createdAt),
        updatedAt: safeMillis(TPIdentity.updatedAt),
        lastActive: safeMillis(TPSecurity.lastActive),
        lastEarnedDate: safeMillis(TPLoyalty.lastEarnedDate)
      };
    });

    return json({ success: true, users });

  } catch (err) {
    console.error("getAllUsers error:", err);
    return json({ success: false, error: "Server error: " + err.message }, 500);
  }
};

export const verifyToken = async (event) => {
  if (event.httpMethod === "OPTIONS") return json("", 204);

  try {
    const body = JSON.parse(event.body || "{}");
    const { uid, token } = body;

    if (!uid || !token) {
      return json({ success: false, error: "Missing uid or token" }, 400);
    }

    const userDoc = await db.collection("Users").doc(uid).get();

    if (!userDoc.exists) {
      return json({ success: false, error: "User not found" }, 404);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const TPSecurity = userData.TPSecurity || {};

    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken || storedToken !== token) {
      return json({ success: false, error: "Token mismatch" }, 403);
    }

    const responseIdentity = {
      uid,
      email: TPIdentity.email || null,
      name: TPIdentity.name || null,
      role: TPIdentity.role || "Customer",
      lastActive: TPSecurity.lastActive || null
    };

    return json({ success: true, identity: responseIdentity });

  } catch (err) {
    console.error("verifyToken error:", err);
    return json({ success: false, error: "Server error: " + err.message }, 500);
  }
};

// ============================================================================
//  GLOBAL ROUTE SURFACE — DUALBAND + MESHBAND + CHECKBAND + ONEBAND SIGNAL (v30+++)
// ============================================================================

// CNS ROUTE — PUBLIC ENTRYPOINT (UNIFIED SIGNAL VERSION)
export async function route(type, payload = {}) {
  const band = resolveBandFromPayload(payload);
  const bandFamily = resolveBandFamilyFromPayload(payload);
  const dnaTag = resolveDnaTagFromPayload(payload);
  const meshTag = resolveMeshTagFromPayload(payload);

  // Remember the signal BEFORE routing (unified OneBand memory)
  rememberPulseBandSignal({
    band,
    bandFamily,
    dnaTag,
    meshTag,
    routeType: type,
    routeContext: "route:init",
    offlineMode: PulseRealm.PULSE_OFFLINE_MODE === true
  });

  logCNS("CNS_ROUTE_CALL", {
    type,
    band,
    bandFamily,
    dnaTag,
    meshTag
  });

  CNSPageScanner.emit("cns-route-call", {
    type,
    band,
    bandFamily,
    dnaTag,
    meshTag,
    payloadShape: payload ? Object.keys(payload) : []
  });

  // *** ROUTE THROUGH TRANSPORT WITH UNIFIED ONEBAND SIGNAL TAGS ***
  const result = await Transport.callEndpoint(type, {
    ...payload,
    __band: band,
    __bandFamily: bandFamily,
    __dnaTag: dnaTag,
    __meshTag: meshTag
  });

  // Update memory AFTER routing
  rememberPulseBandSignal({
    band,
    bandFamily,
    dnaTag,
    meshTag,
    routeType: type,
    routeContext: result.error ? "route:error" : "route:success",
    offlineMode: false,
    errorSignature: result.error ? String(result.error) : null
  });

  CNSPageScanner.emit("cns-route-response", {
    type,
    band,
    bandFamily,
    dnaTag,
    meshTag,
    ok: !result.error
  });

  logCNS("CNS_ROUTE_RESPONSE", {
    type,
    band,
    bandFamily,
    ok: !result.error
  });

  return result;
}

export const Router = {
  receiveReflex(reflex = {}) {
    const {
      reflexOrigin = "unknown",
      layer = "unknown",
      message = null,
      routeTrace = null,
      degraded = null,
      healthScore = null,
      tier = null,
      __band = null,
      __bandFamily = null,
      __dnaTag = null,
      __meshTag = null,
      nervousSystem = null,
      ...rest
    } = reflex;

    const band = normalizeBand(__band);
    const bandFamily = normalizeUnifiedBandFamily(__bandFamily);
    const dnaTag = __dnaTag || null;
    const meshTag = __meshTag || null;

    rememberPulseBandSignal({
      band,
      bandFamily,
      dnaTag,
      meshTag,
      routeType: "receiveReflex",
      routeContext: `reflex:${reflexOrigin}:${layer}`,
      offlineMode: PulseRealm.PULSE_OFFLINE_MODE === true
    });

    logCNS("CNS_REFLEX_RECEIVED", {
      reflexOrigin,
      layer,
      band,
      bandFamily,
      dnaTag,
      meshTag
    });

    CNSPageScanner.emit("cns-reflex-received", {
      reflexOrigin,
      layer,
      band,
      bandFamily,
      dnaTag,
      meshTag
    });

    CNS_HEALING.lastHealRequestCount += 1;
    CNS_HEALING.lastRouteBand = band;
    CNS_HEALING.lastRouteBandFamily = bandFamily;
    CNS_HEALING.lastRouteDnaTag = dnaTag;
    CNS_HEALING.lastRouteMeshTag = meshTag;

    if (typeof checkRouterMemory === "function") {
      safeRun("reflexRouterMemory", () =>
        checkRouterMemory([
          {
            reflexOrigin,
            layer,
            message,
            degraded,
            healthScore,
            tier,
            band,
            bandFamily,
            dnaTag,
            meshTag,
            nervousSystem,
            routeTrace,
            timestamp: PulseRealm.PulseNOW,
            ...rest
          }
        ])
      );
    }

      

    return {
      ok: true,
      reflexOrigin,
      layer,
      band,
      bandFamily,
      dnaTag,
      meshTag
    };
  }
};

// ============================================================================
// CHECKBAND ENDPOINT INSTANTIATION (UNCHANGED, BUT SIGNAL‑AWARE)
// ============================================================================

const CheckBandEndpoint = checkBand({
  trace: false,
  sessionId: PulseRealm.PULSE_SESSION_ID || null
});

  PulseRealm.PulseCheckBandEndpoint = CheckBandEndpoint;


// ============================================================================
// CNS GLOBAL REGISTRATION — ONEBAND‑UNIFIED
// ============================================================================

  // CNS factory (unchanged external API)
  PulseRealm.PulseCNS = PulseRealm.PulseCNS || createPulseOSCNSNervousSystem;

  // Unified route entrypoint
  PulseRealm.PulseCNS.route = route;
  // Unified route entrypoint
  PulseRealm.PulseCNS.Router = Router;
  // CNS metadata
  PulseRealm.PulseCNS.meta = PulseOSCNSNervousSystemMeta;

  // Ensure CheckBand endpoint is always present
  PulseRealm.PulseCheckBandEndpoint = CheckBandEndpoint;


PulseRealm.OSCNSNervousSystem = {
  Router,
  CheckBandEndpoint,
  route,
  verifyToken,
  getAllLogs,
  getAllOrders,
  getAllUsers,
  getLogHtml,
  getStripeStatus,
  Transport,
  UNIFIED_BAND_FAMILY,
  UNIFIED_ROUTE_BANDS,
  PulseBandSignalMemory,
  CNS_HEALING
}
PulseRealm.PulseCNSNervousRoute = route;
PulseRealm.PulseCNSNervousSystem = Router;