// ============================================================================
// FILE: PulseMesh-v30-IMMORTAL+++.js
// PULSE SYMBOLIC MESH — v30-IMMORTAL+++
// “PURE SYMBOLIC CONNECTIVE TISSUE / SEMANTIC PATH / BINARY-AWARE / CHUNK-AWARE / BLUETOOTH-PRESENCE-AWARE / LONG-RANGE-PULSE-AWARE”
// ============================================================================
//
// ROLE:
//   • Primary symbolic connective tissue between symbolic organs.
//   • Carries semantic packets (plain objects) only — no raw binary arrays.
//   • Deterministic, drift-proof, mutation-safe, presence-aware, chunk-aware.
//   • Dual-band aware (symbolic primary, binary-aware via metadata).
//   • Long-range vs BLE strategy expressed as metadata only.
//   • Falls back to a provided fallbackProxy when contract is violated.
//   • Exposes IMMORTAL-grade mesh artery metrics (throughput, pressure, cost, budget).
//   • Bluetooth presence + mesh tier + route hints threaded through control path.
//
// ARCHITECTURAL POSITION:
//   • Lives in SymbolicNervousSystem layer.
//   • Sits under OrganismMesh as the symbolic nervous system.
//   • Talks to binary mesh via fallbackProxy or higher layers.
//   • Never executes code, never routes by itself — only validates + passes.
//   • Chunk/prewarm-aware only via metadata (never imperative).
//
// GUARANTEES (v30-IMMORTAL+++):
//   • No randomness, no dynamic imports, no eval.
//   • No network, no filesystem.
//   • Zero mutation of input packets.
//   • Presence-aware only via control metadata (band, presenceTag, bandSignature, bluetoothPresence).
//   • Chunk/prewarm/cache hints are metadata-only, non-imperative.
//   • Mesh artery metrics are deterministic, window-based, and read-only.
//   • Long-range vs BLE is strategy metadata only (external scheduler decides).
//
// CONTRACT (v30):
//   • INPUT (data path):
//       - packet: object (symbolic, non-array)
//   • INPUT (control path):
//       - from: string
//       - options: {
//           band?,
//           presenceTag?,
//           bandSignature?,
//           trace?,
//           chunkHint?,
//           prewarmHint?,
//           cacheHint?,
//           bluetoothPresence?: {
//             deviceId?: string,
//             linkQuality?: number,   // 0..1
//             proximityTier?: string, // "near" | "mid" | "far" | "unknown"
//             transport?: "ble" | "wifi" | "wired" | "unknown"
//           },
//           meshTier?: "host" | "satellite" | "relay",
//           meshRouteHint?: string,
//           longRangePulse?: boolean
//         }
//   • OUTPUT:
//       - packet (unchanged) OR fallback result from fallbackProxy.
//       - meshArtery snapshot available via getMeshArtery().
//
// SAFETY:
//   • Pure symbolic path is metadata-only, non-executable.
//   • Fallback path is delegated to injected fallbackProxy.
//   • Mesh artery is observational only — never used to mutate routing.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// v30 META BLOCK (no external Identity dependency)
// ============================================================================

// ============================================================================
// IMPORTS — MESH SUBSYSTEMS (SYMBOLIC SIDE)
// ============================================================================
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { createOrganismMesh } from "./PulseMeshOrganism-v30.js";
import {PulseMeshSpine} from "./PulseMeshSpine-v30.js";
import {PulseMeshFlow} from "./PulseMeshFlow-v30.js";
import {DefaultPulseMeshPresenceRelay as PulseMeshPresenceRelay} from "./PRESENCE/PulseMeshPresenceRelay-v30.js";
import {PulseMeshCognition} from "./PulseMeshCognition-v30.js";
import {createPulseMeshEndocrineSystem_v30} from "./PulseMeshEndocrineSystem-v30.js";
import {PulseMeshImmuneSystem} from "./PulseMeshImmuneSystem-v30.js";
import {PulseMeshOrgans} from "./PulseMeshOrgans-v30.js";
import {PulseMeshThalamus} from "./PulseMeshThalamus-v30.js";

import {PulseMeshPresenceAIView as PresenceAIView} from "./PRESENCE/PulseMeshPresenceAIView-v30.js";
import {PulseMeshMentorUpgradeRequest as MentorUpgradeRequest} from "./PRESENCE/PulseMeshMentorUpgradeRequest-v30.js";
import { createPulseWorldSocialGraphV30 as createPulseWorldSocialGraph } from "../X-PULSE-X/PulseWorldSocialGraph-v30.js";

import { createPulseMeshCortex as applyPulseCortex } from "./PulseMeshCortex-v30.js";
import { createPulseMeshTendons as applyPulseMeshTendons } from "./PulseMeshTendons-v30.js";




export const PulseMeshMeta = Object.freeze({
  organ: "PulseMesh",
  layer: "SymbolicNervousSystem",
  role: "SymbolicMeshCore",
  version: "v30-IMMORTAL+++",
  generation: "v30",
  guarantees: {
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroEval: true,
    zeroDynamicImports: true,
    zeroAI: true,
    zeroAutonomy: true,
    symbolicOnly: true,
    binaryAware: true,
    bluetoothPresenceAware: true,
    meshTierAware: true,
    longRangePulseAware: true,
    chunkAware: true,
    cacheHintAware: true,
    prewarmHintAware: true,
    arteryDeterministic: true
  }
});

export const pulseRole = "SymbolicMeshCore";
export const surfaceMeta = Object.freeze({
  surface: "PulseMesh-v30",
  band: "symbolic",
  behavior: "semantic-connective-tissue"
});

export const pulseLoreContext = Object.freeze({
  mythos: "IMMORTAL+++ Mesh",
  description:
    "Symbolic connective tissue between organs, long-range pulse aware, BLE-idle aware, artery-observational.",
  lineage: [
    "PulseMesh-v7",
    "PulseMesh-v11",
    "PulseMesh-v12.3",
    "PulseMesh-v24-IMMORTAL++",
    "PulseMesh-v30-IMMORTAL+++"
  ]
});

export const AI_EXPERIENCE_META = Object.freeze({
  experienceTier: "IMMORTAL+++",
  meshAware: true,
  presenceAware: true,
  bluetoothPresence: true,
  longRangePulseMode: true
});

export const EXPORT_META = Object.freeze({
  id: "PulseMesh-v30-IMMORTAL+++",
  kind: "SymbolicMesh",
  defaultBand: "symbolic"
});

// ============================================================================
// INTERNAL HELPERS — v30-IMMORTAL+++
// ============================================================================

function isSymbolicPacket(packet) {
  return packet && typeof packet === "object" && !Array.isArray(packet);
}

// ---------------------------------------------------------------------------
// MESH ARTERY HELPERS — v4 (PURE, STATEFUL BUT LOCAL TO MESH CORE)
// ---------------------------------------------------------------------------

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function computeMeshArtery({ total, window, windowMs, errors, fallbacks }) {
  const evalDensity = Math.min(1, window / 1024);
  const errorRate = window > 0 ? Math.min(1, errors / window) : 0;
  const fallbackRate = window > 0 ? Math.min(1, fallbacks / window) : 0;

  const pressureBase = Math.max(
    0,
    Math.min(1, evalDensity * 0.5 + errorRate * 0.3 + fallbackRate * 0.2)
  );

  const pressure = pressureBase;
  const throughput = Math.max(0, Math.min(1, 1 - pressure));
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    total,
    window,
    windowMs,
    errors,
    fallbacks,
    evalDensity,
    errorRate,
    fallbackRate,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget)
  });
}

// ---------------------------------------------------------------------------
// BLUETOOTH PRESENCE NORMALIZATION — v30++
// ---------------------------------------------------------------------------

function normalizeBluetoothPresence(bt = {}) {
  const deviceId = typeof bt.deviceId === "string" ? bt.deviceId : null;

  const linkQualityRaw = Number(bt.linkQuality);
  const linkQuality = Number.isFinite(linkQualityRaw)
    ? Math.max(0, Math.min(1, linkQualityRaw))
    : 0;

  let proximityTier = bt.proximityTier || "unknown";
  if (!["near", "mid", "far", "unknown"].includes(proximityTier)) {
    proximityTier = "unknown";
  }

  let transport = bt.transport || "unknown";
  if (!["ble", "wifi", "wired", "unknown"].includes(transport)) {
    transport = "unknown";
  }

  // v30: optional longRangeMode hint (boolean) is passed through untouched
  const longRangeMode = !!bt.longRangeMode;

  return {
    deviceId,
    linkQuality,
    proximityTier,
    transport,
    longRangeMode
  };
}

// ---------------------------------------------------------------------------
// MESH TIER NORMALIZATION — v30++
// ---------------------------------------------------------------------------

function normalizeMeshTier(tier) {
  const t = (tier || "host").toLowerCase();
  if (t === "satellite") return "satellite";
  if (t === "relay") return "relay";
  return "host";
}

// ============================================================================
// PULSE MESH CORE — v30‑IMMORTAL+++
// ============================================================================

export function createPulseMesh({
  fallbackProxy,
  trace = false,
  defaultBand = "symbolic",
  defaultPresenceTag = "PulseMesh-v30",
  windowMs = 60000,

  // v30: long-range vs BLE strategy (metadata only)
  longRangePulseEveryMs = 5 * 60 * 1000, // “every few minutes” (external scheduler)
  defaultMeshTier = "host"               // "host" | "satellite" | "relay"
} = {}) {
  const links = Object.create(null);

  const logWarn = PulseRealm.warn || console.warn;
  const logInfo = PulseRealm.log || console.log;

  let _total = 0;
  let _window = 0;
  let _errors = 0;
  let _fallbacks = 0;
  let _windowStart = PulseRealm.PulseNOW;

  function rollWindow(now) {
    if (now - _windowStart >= windowMs) {
      _windowStart = now;
      _window = 0;
      _errors = 0;
      _fallbacks = 0;
    }
  }

  function getMeshArtery() {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    return computeMeshArtery({
      total: _total,
      window: _window,
      windowMs,
      errors: _errors,
      fallbacks: _fallbacks
    });
  }

  // -------------------------------------------------------------------------
  // LINK REGISTRATION (symbolic-only)
  // -------------------------------------------------------------------------
  function link(from, to) {
    links[from] = to;
  }

  // -------------------------------------------------------------------------
  // SMART SYMBOLIC FALLBACK (presence-aware, artery-aware, bluetooth-aware)
// -------------------------------------------------------------------------
  function fallback(
    reason,
    from,
    packet,
    {
      band = defaultBand,
      presenceTag = defaultPresenceTag,
      bandSignature = null,
      chunkHint = null,
      prewarmHint = null,
      cacheHint = null,
      bluetoothPresence = null,
      meshTier = defaultMeshTier,
      meshRouteHint = null // e.g. "meshHost→satelliteMesh" or "satelliteMesh→meshHost"
    } = {}
  ) {
    if (!fallbackProxy) {
      _errors++;
      throw new Error(
        `PulseMesh v30 fallback triggered (${reason}) from:${from} but no fallbackProxy provided`
      );
    }

    _fallbacks++;

    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    _total++;
    _window++;

    const bt = normalizeBluetoothPresence(bluetoothPresence || {});
    const tier = normalizeMeshTier(meshTier);

    if (trace) {
      logWarn(
        `[PulseMesh v30] FALLBACK (${reason}) from:${from} band:${band} presence:${presenceTag} tier:${tier} routeHint:${meshRouteHint || "none"} bandSig:${bandSignature || "none"}`,
        { packet, chunkHint, prewarmHint, cacheHint, bluetoothPresence: bt }
      );
    }

    const artery = getMeshArtery();
    const control = {
      band,
      presenceTag,
      bandSignature,
      reason,
      chunkHint,
      prewarmHint,
      cacheHint,
      meshArtery: artery,
      bluetoothPresence: bt,
      meshTier: tier,
      meshRouteHint,
      longRangePulseEveryMs
    };

    return fallbackProxy.exchange
      ? fallbackProxy.exchange(packet, control)
      : fallbackProxy(packet, control);
  }

  // -------------------------------------------------------------------------
  // PURE SYMBOLIC TRANSMISSION (semantic connective tissue)
// -------------------------------------------------------------------------
  function transmit(
    from,
    packet,
    {
      band = defaultBand,
      presenceTag = defaultPresenceTag,
      bandSignature = null,
      chunkHint = null,
      prewarmHint = null,
      cacheHint = null,
      bluetoothPresence = null,
      meshTier = defaultMeshTier,
      meshRouteHint = null,
      // v30: caller can tag this send as long-range pulse vs BLE-idle
      longRangePulse = false
    } = {}
  ) {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    _total++;
    _window++;

    const to = links[from];

    if (!to) {
      return fallback("missing-link", from, packet, {
        band,
        presenceTag,
        bandSignature,
        chunkHint,
        prewarmHint,
        cacheHint,
        bluetoothPresence,
        meshTier,
        meshRouteHint
      });
    }

    if (!isSymbolicPacket(packet)) {
      return fallback("non-symbolic-input", from, packet, {
        band,
        presenceTag,
        bandSignature,
        chunkHint,
        prewarmHint,
        cacheHint,
        bluetoothPresence,
        meshTier,
        meshRouteHint
      });
    }

    const bt = normalizeBluetoothPresence({
      ...(bluetoothPresence || {}),
      longRangeMode: !!longRangePulse
    });

    const tier = normalizeMeshTier(meshTier);

    if (trace) {
      logInfo(
        `[PulseMesh v30] ${from} → ${to} band:${band} presence:${presenceTag} tier:${tier} longRange:${longRangePulse ? "yes" : "no"} bandSig:${bandSignature || "none"}`,
        {
          packet,
          chunkHint,
          prewarmHint,
          cacheHint,
          bluetoothPresence: bt,
          meshRouteHint,
          longRangePulseEveryMs
        }
      );
    }

    // Pure symbolic path — never mutate packets, never interpret them.
    // Long-range vs BLE is purely metadata for the fallback / RF layer.
    return packet;
  }

  // -------------------------------------------------------------------------
  // PUBLIC CORE API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseMeshMeta,
    link,
    transmit,
    fallback,
    getMeshArtery,
    // v30: expose strategy so higher layers can schedule pulses externally
    longRangePulseEveryMs,
    defaultMeshTier: normalizeMeshTier(defaultMeshTier)
  });
}

// ============================================================================
// PULSE MESH ENVIRONMENT — v30‑IMMORTAL+++
// ============================================================================
//
//  ROLE:
//    • Creates the symbolic mesh core (v30-IMMORTAL+++).
//    • Boots OrganismMesh with Cortex + Tendons injected.
//    • Wires symbolic mesh subsystems in correct IMMORTAL order.
//    • Provides a single `prewarm` entrypoint for the symbolic mesh world.
//    • Exposes mesh artery snapshot via meshCore.getMeshArtery().
//    • Exposes longRangePulseEveryMs + defaultMeshTier for schedulers.
// ============================================================================



export function createPulseMeshEnvironment({
  context = {},
  fallbackProxy,
  trace = false,
  defaultBand = "symbolic",
  defaultPresenceTag = "PulseMesh-v30",
  windowMs = 60000,
  longRangePulseEveryMs = 5 * 60 * 1000,
  defaultMeshTier = "host"
} = {}) {
  const log   = PulseRealm.log || console.log;
  const warn  = PulseRealm.warn || console.warn;
  const error = PulseRealm.error || console.error;
  
  PulseRealm.PulseLog(
  "mesh",
  "[PulseMesh] — Pulse Mesh System Coming Online.. (PURE SYMBOLIC CONNECTIVE TISSUE / SEMANTIC PATH / BINARY-AWARE / CHUNK-AWARE / BLUETOOTH-PRESENCE-AWARE / LONG-RANGE-PULSE-AWARE)."
);

  // -------------------------------------------------------------------------
  // Core Symbolic Mesh
  // -------------------------------------------------------------------------
  const symbolicMesh = createPulseMesh({
    fallbackProxy,
    trace,
    defaultBand,
    defaultPresenceTag,
    windowMs,
    longRangePulseEveryMs,
    defaultMeshTier
  });

  const meshCore = symbolicMesh;

  // -------------------------------------------------------------------------
  // Mesh Subsystems
  // -------------------------------------------------------------------------
  const meshSpine = PulseMeshSpine.create
    ? PulseMeshSpine.create({ context, mesh: meshCore, log, warn })
    : null;

  const meshFlow = PulseMeshFlow.create
    ? PulseMeshFlow.create({ context, mesh: meshCore, log, warn })
    : null;

  const meshPresenceRelay = PulseMeshPresenceRelay.create
    ? PulseMeshPresenceRelay.create({
        MeshBus: context.MeshBus,
        SystemClock: context.SystemClock,
        IdentityDirectory: context.IdentityDirectory,
        log
      })
    : null;

  const meshCognition = PulseMeshCognition.create
    ? PulseMeshCognition.create({ context, mesh: meshCore, flow: meshFlow, log, warn })
    : null;

  const meshEndocrine = createPulseMeshEndocrineSystem_v30
    ? createPulseMeshEndocrineSystem_v30({ context, mesh: meshCore, log, warn })
    : null;

  const meshImmune = PulseMeshImmuneSystem.create
    ? PulseMeshImmuneSystem.create({ context, mesh: meshCore, log, warn })
    : null;

  const meshOrgans = PulseMeshOrgans.create
    ? PulseMeshOrgans.create({ context, mesh: meshCore, log, warn })
    : null;

  const meshThalamus = PulseMeshThalamus.create
    ? PulseMeshThalamus.create({
        log,
        warn,
        error,
        groupCollapsed: context.groupCollapsed || console.groupCollapsed.bind(console),
        groupEnd: context.groupEnd || console.groupEnd.bind(console)
      })
    : null;

  const presenceAIView = PresenceAIView.create
    ? PresenceAIView.create({ context, mesh: meshCore, log, warn })
    : null;

  const mentorUpgradeRequest = MentorUpgradeRequest.create
    ? MentorUpgradeRequest.create({ context, mesh: meshCore, log, warn })
    : null;

  const socialGraph =
    typeof createPulseWorldSocialGraph === "function"
      ? createPulseWorldSocialGraph({
          PowerUserRanking: context.PowerUserRanking,
          log,
          warn,
          error
        })
      : null;

  // -------------------------------------------------------------------------
  // Binary Mesh Environment (WITH SYSTEMS)
  // -------------------------------------------------------------------------
  const ALL_MESH_SYSTEMS = Object.freeze({
    symbolicMesh: meshCore,
    meshSpine,
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph
  });

  const binaryMeshEnv = {
    systems: ALL_MESH_SYSTEMS,
    mesh: meshCore,
    tier: normalizeMeshTier(defaultMeshTier)
  };

  // -------------------------------------------------------------------------
  // Organism Mesh (v30 Immortal+++)
  // -------------------------------------------------------------------------
  const organism = createOrganismMesh({
    context: {
      ...context,
      applyPulseCortex,
      applyPulseMeshTendons
    },
    symbolicMeshEnv: { symbolicMesh: binaryMeshEnv },
    binaryMeshEnv,
    trace
  });

  // -------------------------------------------------------------------------
  // Prewarm
  // -------------------------------------------------------------------------
  function prewarm() {
    log("[PulseMesh v30] Prewarm start");

    for (const [name, system] of Object.entries(ALL_MESH_SYSTEMS)) {
      if (system && typeof system.prewarm === "function") {
        try {
          system.prewarm();
          log("[PulseMesh v30] Prewarmed mesh system", { name });
        } catch (e) {
          warn("[PulseMesh v30] Prewarm failed", { name, error: e.message });
        }
      }
    }

    log("[PulseMesh v30] Prewarm complete");
  }

  // -------------------------------------------------------------------------
  // Final Immortal+++ Environment
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseMeshMeta,

    // core
    symbolicMesh: meshCore,

    // subsystems
    meshSpine,
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph,

    // controls
    link: meshCore.link,
    transmit: meshCore.transmit,
    fallback: meshCore.fallback,
    getMeshArtery: meshCore.getMeshArtery,
    prewarm,

    // env + organism
    systems: ALL_MESH_SYSTEMS,
    binaryMeshEnv,
    organism,

    // v30 strategy surface
    longRangePulseEveryMs,
    defaultMeshTier: normalizeMeshTier(defaultMeshTier)
  });
}

// ============================================================================
// ABILITIES EXPORT — v30 IMMORTAL+++
// ============================================================================
export const PulseMeshAbilities = {
  v30Immortal: true,
  bluetoothPresence: true,
  longRangePulseMode: true,
  bleIdleMode: true,
  cacheHints: true,
  prewarmHints: true,
  chunkAware: true,
  arteryDeterministic: true,
  meshTierAware: true
};


// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  PulseMeshMeta,
  pulseRole,
  surfaceMeta,
  pulseLoreContext,
  AI_EXPERIENCE_META,
  EXPORT_META,
  createPulseMesh,
  createPulseMeshEnvironment,
  PulseMeshAbilities
};

PulseRealm.PulseMesh = {
  PulseMeshMeta,
  pulseRole,
  surfaceMeta,
  pulseLoreContext,
  AI_EXPERIENCE_META,
  EXPORT_META,
  createPulseMesh,
  createPulseMeshEnvironment,
  PulseMeshAbilities
}
PulseRealm.PulseMesh = createPulseMesh;
PulseRealm.PulseMeshEnvironment = createPulseMeshEnvironment;
PulseRealm.PulseMeshMeta = PulseMeshMeta;