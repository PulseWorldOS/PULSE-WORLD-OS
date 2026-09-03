// ============================================================================
// FILE: BinaryMesh-v30-IMMORTAL-BINARY+++.js
// BINARY MESH — v30-IMMORTAL-BINARY+++
// “PURE BINARY CONNECTIVE TISSUE / BINARY-FIRST / SYMBOLIC FALLBACK / BLUETOOTH+FACTORS-AWARE”
// ============================================================================
//
// ROLE:
//   • Primary binary connective tissue between binary organs.
//   • Zero symbolic data in the binary path (0/1 arrays only).
//   • Deterministic, drift-proof, mutation-safe, presence-aware.
//   • Dual-band aware (binary primary, symbolic fallback).
//   • Bluetooth presence–aware via metadata (no device control).
//   • Signal-factoring-aware via metadata (no routing influence).
//   • Falls back to symbolic PulseMesh when binary contract is violated.
//   • Exposes read-only BinaryMeshArtery v4 for NodeAdmin/Overmind.
//
// ARCHITECTURAL POSITION:
//   • Lives in mesh_binary layer.
//   • Sits under OrganismMesh as the binary nervous system.
//   • Talks to symbolic mesh via fallback (PulseMeshFlow, PresenceRelay, etc.).
//   • Never routes, never computes semantics — only validates and passes bits.
//
// GUARANTEES (v30-IMMORTAL-BINARY+++):
//   • No randomness, no timing-based branching, no env access.
//   • No dynamic imports, no eval.
//   • No network, no filesystem.
//   • Zero mutation of input bits.
//   • Mesh-topology-aware only via symbolic fallback.
//   • Presence-aware only via control metadata (band, presenceTag).
//   • Bluetooth-aware only via control metadata (bluetoothPresence).
//   • Signal-factoring-aware only via control metadata (factoringProfile, factoringFlags).
//   • Artery metrics are local, read-only, advisory-only.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { createOrganismMesh } from "./PulseMeshOrganism-v30.js";

import {createPulseMesh} from "./PulseMeshSpine-v30.js";

import {createPulseMeshFlow} from "./PulseMeshFlow-v30.js";

import {createPulseMeshPresenceRelay} from "./PRESENCE/PulseMeshPresenceRelay-v30.js";

import {PulseMeshCognition} from "./PulseMeshCognition-v30.js";

import {createPulseMeshEndocrineSystem_v30} from "./PulseMeshEndocrineSystem-v30.js";

import {createPulseMeshImmuneSystem} from "./PulseMeshImmuneSystem-v30.js";

import {createPulseOrgans} from "./PulseMeshOrgans-v30.js";

import {createPulseMeshThalamus} from "./PulseMeshThalamus-v30.js";

import {createPresenceAIView} from "./PRESENCE/PulseMeshPresenceAIView-v30.js";
import {createMentorUpgradeRequest} from "./PRESENCE/PulseMeshMentorUpgradeRequest-v30.js";
import { createPulseWorldSocialGraphV30 } from "../X-PULSE-X/PulseWorldSocialGraph-v30.js";

import { createPulseMeshCortex as applyPulseCortex } from "./PulseMeshCortex-v30.js";
import { createPulseMeshTendons as applyPulseMeshTendons } from "./PulseMeshTendons-v30.js";



// ---------------------------------------------------------------------------
// META — v30-IMMORTAL-BINARY+++ identity
// ---------------------------------------------------------------------------
export const BinaryMeshMeta2 = Object.freeze({
  layer: "BinaryMesh",
  role: "BINARY_CONNECTIVE_TISSUE",
  version: "v30-IMMORTAL-BINARY+++",
  target: "full-mesh",
  selfRepairable: true,
  evo: Object.freeze({
    // core awareness
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    presenceAware: true,
    bandAware: true,
    localAware: true,
    internetAware: true,

    // advantage / factoring / pressure awareness (metadata-only)
    advantageCascadeAware: true,
    unifiedAdvantageField: true,
    signalFactoringAware: true,
    auraPressureAware: true,
    meshPressureAware: true,
    flowAware: true,
    driftAware: true,

    // cognition / endocrine / immune adjacency
    cognitionAware: true,
    endocrineAware: true,
    immuneAware: true,
    organsAware: true,
    thalamusAware: true,
    spineAware: true,
    presenceAIViewAware: true,
    mentorUpgradeAware: true,
    socialGraphAware: true,

    // bluetooth / proximity awareness
    bluetoothPresenceAware: true,
    bluetoothMeshAware: true,

    // determinism + safety
    deterministicField: true,
    driftProof: true,
    multiInstanceReady: true,
    futureEvolutionReady: true,

    // zero surfaces
    zeroCompute: true,
    zeroMutationSurface: true,
    zeroRoutingInfluence: true,
    zeroNetwork: true,
    zeroFilesystem: true
  })
});

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function isPureBinary(bits, maxBitsLength) {
  if (!Array.isArray(bits)) return false;
  const len = bits.length;
  if (len === 0 || len > maxBitsLength) return false;
  for (let i = 0; i < len; i++) {
    const b = bits[i];
    if (b !== 0 && b !== 1) return false;
  }
  return true;
}

function clamp01(v) {
  if (!Number.isFinite(v)) return 0;
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

// ---------------------------------------------------------------------------
// BinaryMeshArtery v4 — local, read-only, no timing-based branching
// Adds factoring + band/mode + presence/bt summaries.
// ---------------------------------------------------------------------------
function computeBinaryMeshArtery(state) {
  const total = state.totalTransmits;
  const fallbacks = state.totalFallbacks;
  const maxBits = state.maxBitsLength || 1;

  const fallbackRatio = total > 0 ? Math.min(1, fallbacks / total) : 0;
  const avgBits = total > 0 ? Math.min(1, state.totalBits / (total * maxBits)) : 0;

  const pressure = Math.max(0, Math.min(1, fallbackRatio * 0.7 + avgBits * 0.3));
  const throughput = Math.max(0, Math.min(1, 1 - pressure));
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  function bucket(v) {
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

  const btAvgLinkQuality =
    state.btLinkQualitySamples > 0
      ? state.btLinkQualitySum / state.btLinkQualitySamples
      : 0;

  const factoringFallbackRatio =
    state.factoringFallbacks > 0 && state.totalFallbacks > 0
      ? clamp01(state.factoringFallbacks / state.totalFallbacks)
      : 0;

  return Object.freeze({
    meta: BinaryMeshMeta2,
    totalTransmits: total,
    totalFallbacks: fallbacks,
    totalBits: state.totalBits,
    maxBitsLength: maxBits,
    fallbackRatio,
    avgBitsRatio: avgBits,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucket(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucket(budget),
    lastFallbackReason: state.lastFallbackReason || null,
    lastFrom: state.lastFrom || null,

    // band/mode/presence summaries
    bandCounts: { ...state.bandCounts },
    modeCounts: { ...state.modeCounts },
    presenceTags: { ...state.presenceTags },

    // factoring-aware summaries
    factoringFallbacks: state.factoringFallbacks,
    factoringFallbackRatio,

    // bluetooth artery metadata
    bluetoothEvents: state.btEvents,
    bluetoothNear: state.btNear,
    bluetoothMid: state.btMid,
    bluetoothFar: state.btFar,
    bluetoothUnknown: state.btUnknown,
    bluetoothAvgLinkQuality: btAvgLinkQuality
  });
}

function classifyBluetoothPresenceOnState(state, bluetoothPresence) {
  if (!bluetoothPresence || typeof bluetoothPresence !== "object") return;

  state.btEvents += 1;

  const proximity = bluetoothPresence.proximityTier || bluetoothPresence.proximity || "unknown";
  if (proximity === "near") {
    state.btNear += 1;
  } else if (proximity === "mid" || proximity === "medium") {
    state.btMid += 1;
  } else if (proximity === "far") {
    state.btFar += 1;
  } else {
    state.btUnknown += 1;
  }

  const qRaw = Number(
    bluetoothPresence.linkQuality ??
    bluetoothPresence.quality ??
    bluetoothPresence.rssiRatio
  );
  if (Number.isFinite(qRaw)) {
    const q = clamp01(qRaw);
    state.btLinkQualitySum += q;
    state.btLinkQualitySamples += 1;
  }
}

function classifyBandModePresenceOnState(state, { band, mode, presenceTag }) {
  const b = band || "binary";
  const m = mode || "binary";
  const p = presenceTag || "BinaryMesh-v30";

  if (!state.bandCounts[b]) state.bandCounts[b] = 0;
  state.bandCounts[b] += 1;

  if (!state.modeCounts[m]) state.modeCounts[m] = 0;
  state.modeCounts[m] += 1;

  if (!state.presenceTags[p]) state.presenceTags[p] = 0;
  state.presenceTags[p] += 1;
}

// ---------------------------------------------------------------------------
// CORE BINARY MESH
// ---------------------------------------------------------------------------
export function createBinaryMesh({
  symbolicMesh,
  trace = false,
  maxBitsLength = 64,
  defaultBand = "binary",
  defaultPresenceTag = "BinaryMesh-v30"
} = {}) {
  
  const BinaryMeshMeta = Object.freeze({
    layer: "BinaryMesh",
    role: "BINARY_CONNECTIVE_TISSUE",
    version: "v30-IMMORTAL-BINARY+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: Object.freeze({
      // core awareness
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      localAware: true,
      internetAware: true,

      // advantage / factoring / pressure awareness (metadata-only)
      advantageCascadeAware: true,
      unifiedAdvantageField: true,
      signalFactoringAware: true,
      auraPressureAware: true,
      meshPressureAware: true,
      flowAware: true,
      driftAware: true,

      // cognition / endocrine / immune adjacency
      cognitionAware: true,
      endocrineAware: true,
      immuneAware: true,
      organsAware: true,
      thalamusAware: true,
      spineAware: true,
      presenceAIViewAware: true,
      mentorUpgradeAware: true,
      socialGraphAware: true,

      // bluetooth / proximity awareness
      bluetoothPresenceAware: true,
      bluetoothMeshAware: true,

      // determinism + safety
      deterministicField: true,
      driftProof: true,
      multiInstanceReady: true,
      futureEvolutionReady: true,

      // zero surfaces
      zeroCompute: true,
      zeroMutationSurface: true,
      zeroRoutingInfluence: true,
      zeroNetwork: true,
      zeroFilesystem: true
    })
  });

  const links = Object.create(null);

  const logWarn = PulseRealm.warn || console.warn;
  const logInfo = PulseRealm.log || console.log;

  // local artery state (no timing-based branching)
  const arteryState = {
    totalTransmits: 0,
    totalFallbacks: 0,
    totalBits: 0,
    lastFallbackReason: null,
    lastFrom: null,
    maxBitsLength,

    // band/mode/presence summaries
    bandCounts: Object.create(null),
    modeCounts: Object.create(null),
    presenceTags: Object.create(null),

    // factoring-aware
    factoringFallbacks: 0,

    // bluetooth artery metadata
    btEvents: 0,
    btNear: 0,
    btMid: 0,
    btFar: 0,
    btUnknown: 0,
    btLinkQualitySum: 0,
    btLinkQualitySamples: 0
  };

  function link(from, to) {
    links[from] = to;
  }

  function getBinaryMeshArtery() {
    return computeBinaryMeshArtery(arteryState);
  }

  function fallback(
    reason,
    from,
    bits,
    {
      band = defaultBand,
      presenceTag = defaultPresenceTag,
      bluetoothPresence = null,
      factoringProfile = null,
      factoringFlags = null
    } = {}
  ) {
    arteryState.totalFallbacks += 1;
    arteryState.lastFallbackReason = reason;
    arteryState.lastFrom = from;
    arteryState.totalBits += Array.isArray(bits) ? bits.length : 0;

    classifyBluetoothPresenceOnState(arteryState, bluetoothPresence);
    classifyBandModePresenceOnState(arteryState, {
      band,
      mode: "symbolic",
      presenceTag
    });

    if (reason === "factoring-contract" || reason === "non-binary-factored") {
      arteryState.factoringFallbacks += 1;
    }

    if (!symbolicMesh) {
      throw new Error(
        `BinaryMesh fallback (${reason}) from:${from} but no symbolicMesh provided`
      );
    }

    if (trace) {
      logWarn(
        `[BinaryMesh v30] FALLBACK (${reason}) from:${from} band:${band} presence:${presenceTag}`,
        { bits, bluetoothPresence, factoringProfile, factoringFlags }
      );
    }

    const impulse = {
      type: "binaryFallback",
      reason,
      from,
      bits,
      band,
      presenceTag,
      bluetoothPresence,
      factoringProfile: factoringProfile || null,
      factoringFlags: factoringFlags || null,
      flags: {
        binary_fallback: true,
        binary_reason: reason,
        binary_presence_tag: presenceTag,
        binary_mesh_v30: true,
        binary_factoring_aware: !!factoringProfile || !!factoringFlags
      }
    };

    applyPulseCortex(impulse, {
      binaryMode: false,
      dualMode: false,
      symbolicMode: true
    });

    applyPulseMeshTendons(impulse);

    return symbolicMesh.transmit(from, impulse, {
      band: "symbolic",
      presenceTag: "PulseMesh-v30",
      bluetoothPresence
    });
  }

  function transmit(
    from,
    bits,
    {
      band = defaultBand,
      presenceTag = defaultPresenceTag,
      bluetoothPresence = null,
      factoringProfile = null,
      factoringFlags = null
    } = {}
  ) {
    arteryState.totalTransmits += 1;
    arteryState.totalBits += Array.isArray(bits) ? bits.length : 0;

    classifyBluetoothPresenceOnState(arteryState, bluetoothPresence);
    classifyBandModePresenceOnState(arteryState, {
      band,
      mode: "binary",
      presenceTag
    });

    const to = links[from];

    if (!to) {
      return fallback("missing-link", from, bits, {
        band,
        presenceTag,
        bluetoothPresence,
        factoringProfile,
        factoringFlags
      });
    }

    if (!isPureBinary(bits, maxBitsLength)) {
      const reason = factoringProfile || factoringFlags
        ? "non-binary-factored"
        : "non-binary-input";
      return fallback(reason, from, bits, {
        band,
        presenceTag,
        bluetoothPresence,
        factoringProfile,
        factoringFlags
      });
    }

    if (trace) {
      logInfo(
        `[BinaryMesh v30] ${from} → ${to} band:${band} presence:${presenceTag}`,
        { bits, bluetoothPresence, factoringProfile, factoringFlags }
      );
    }

    // pure binary path: bits are passed unchanged
    return bits;
  }

  return Object.freeze({
    meta: BinaryMeshMeta,
    link,
    transmit,
    fallback,
    getBinaryMeshArtery
  });
}
// ---------------------------------------------------------------------------
// BINARY MESH ENVIRONMENT — v30 IMMORTAL-BINARY+++
// Wires binary + symbolic mesh + all organs, prewarmable.
// ---------------------------------------------------------------------------
export function createBinaryMeshEnvironment({
  context = {},
  trace = false,
  maxBitsLength = 64,
  defaultBand = "binary",
  defaultPresenceTag = "BinaryMesh-v30"
} = {}) {
  const BinaryMeshMeta = Object.freeze({
    layer: "BinaryMesh",
    role: "BINARY_CONNECTIVE_TISSUE",
    version: "v30-IMMORTAL-BINARY+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: Object.freeze({
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      localAware: true,
      internetAware: true,
      advantageCascadeAware: true,
      unifiedAdvantageField: true,
      signalFactoringAware: true,
      auraPressureAware: true,
      meshPressureAware: true,
      flowAware: true,
      driftAware: true,
      cognitionAware: true,
      endocrineAware: true,
      immuneAware: true,
      organsAware: true,
      thalamusAware: true,
      spineAware: true,
      presenceAIViewAware: true,
      mentorUpgradeAware: true,
      socialGraphAware: true,
      bluetoothPresenceAware: true,
      bluetoothMeshAware: true,
      deterministicField: true,
      driftProof: true,
      multiInstanceReady: true,
      futureEvolutionReady: true,
      zeroCompute: true,
      zeroMutationSurface: true,
      zeroRoutingInfluence: true,
      zeroNetwork: true,
      zeroFilesystem: true
    })
  });

  const log   = PulseRealm.log || console.log;
  const warn  = PulseRealm.warn || console.warn;
  const error = PulseRealm.error || console.error;

  PulseRealm.PulseLog(
  "mesh",
  "[PulseMeshBinary] — Pulse Mesh Binary System Coming Online.. (PURE BINARY CONNECTIVE TISSUE / BINARY-FIRST / SYMBOLIC FALLBACK / BLUETOOTH+FACTORS-AWARE)."
);
  // -------------------------------------------------------------------------
  // Symbolic Mesh Env (always present)
  // -------------------------------------------------------------------------
  const symbolicMeshEnv =  ({
        symbolicMesh: context.symbolicMesh,
        systems: context.systems || Object.freeze({})
      });


  if (!symbolicMeshEnv) {
    warn("[BinaryMesh v30] Missing symbolicMeshEnv.symbolicMesh — binary env degraded");
    return Object.freeze({
      meta: BinaryMeshMeta,
      binaryMesh: null,
      systems: Object.freeze({}),
      organism: null
    });
  }

  const symbolicMesh = symbolicMeshEnv.symbolicMesh;

  // -------------------------------------------------------------------------
  // Core Binary Mesh
  // -------------------------------------------------------------------------
  const binaryMesh = createBinaryMesh({
    symbolicMesh,
    trace,
    maxBitsLength,
    defaultBand,
    defaultPresenceTag
  });

  // -------------------------------------------------------------------------
  // Subsystems (symbolic-adjacent)
  // -------------------------------------------------------------------------
  const meshFlow = createPulseMeshFlow
    ? createPulseMeshFlow({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshPresenceRelay = createPulseMeshPresenceRelay
    ? createPulseMeshPresenceRelay({
        MeshBus: context.MeshBus,
        SystemClock: context.SystemClock,
        IdentityDirectory: context.IdentityDirectory,
        log
      })
    : null;

  const meshCognition = PulseMeshCognition?.create
    ? PulseMeshCognition.create({ context, mesh: symbolicMesh, flow: meshFlow, log, warn })
    : null;

  const meshEndocrine = createPulseMeshEndocrineSystem_v30
    ? createPulseMeshEndocrineSystem_v30({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshImmune = createPulseMeshImmuneSystem
    ? createPulseMeshImmuneSystem({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshOrgans = createPulseOrgans
    ? createPulseOrgans({ context, mesh: symbolicMesh, log, warn })
    : null;

  const meshThalamus = createPulseMeshThalamus
    ? createPulseMeshThalamus({
        log,
        warn,
        error,
        groupCollapsed: context.groupCollapsed || console.groupCollapsed.bind(console),
        groupEnd: context.groupEnd || console.groupEnd.bind(console)
      })
    : null;

  const meshSpine = createPulseMesh
    ? createPulseMesh({ context, mesh: symbolicMesh, log, warn })
    : null;

  const presenceAIView = createPresenceAIView
    ? createPresenceAIView({ context, mesh: symbolicMesh, log, warn })
    : null;

  const mentorUpgradeRequest = createMentorUpgradeRequest
    ? createMentorUpgradeRequest({ context, mesh: symbolicMesh, log, warn })
    : null;

  const socialGraph =
    typeof createPulseWorldSocialGraphV30 === "function"
      ? createPulseWorldSocialGraphV30({
          PowerUserRanking: context.PowerUserRanking,
          log,
          warn,
          error
        })
      : null;

  // -------------------------------------------------------------------------
  // ALL SYSTEMS + BinaryMeshEnv
  // -------------------------------------------------------------------------
  const ALL_SYSTEMS = Object.freeze({
    binaryMesh,
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    meshSpine,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph
  });

  const binaryMeshEnv = {
    systems: ALL_SYSTEMS,
    mesh: binaryMesh,
    tier: "binary"
  };


  // -------------------------------------------------------------------------
  // Organism Mesh (now with valid binaryMeshEnv.systems)
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
    log("[BinaryMesh v30] Prewarm start");

    for (const [name, system] of Object.entries(ALL_SYSTEMS)) {
      if (system && typeof system.prewarm === "function") {
        try {
          system.prewarm();
          log("[BinaryMesh v30] Prewarmed system", { name });
        } catch (e) {
          warn("[BinaryMesh v30] Prewarm failed", { name, error: e.message });
        }
      }
    }

    log("[BinaryMesh v30] Prewarm complete");
  }

  // -------------------------------------------------------------------------
  // Final Immortal+++ Binary Mesh Environment
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta: BinaryMeshMeta,

    // core
    binaryMesh,

    // symbolic-adjacent subsystems
    meshFlow,
    meshPresenceRelay,
    meshCognition,
    meshEndocrine,
    meshImmune,
    meshOrgans,
    meshThalamus,
    meshSpine,
    presenceAIView,
    mentorUpgradeRequest,
    socialGraph,

    prewarm,
    systems: ALL_SYSTEMS,
    binaryMeshEnv,
    organism
  });
}


PulseRealm.MeshBinary = {
  BinaryMeshMeta2,
  createBinaryMesh,
  createBinaryMeshEnvironment
}
PulseRealm.PulseBinaryMeshMeta = BinaryMeshMeta2;
PulseRealm.PulseMeshBinary = createBinaryMesh;
PulseRealm.PulseMeshBinaryEnvironment = createBinaryMeshEnvironment;