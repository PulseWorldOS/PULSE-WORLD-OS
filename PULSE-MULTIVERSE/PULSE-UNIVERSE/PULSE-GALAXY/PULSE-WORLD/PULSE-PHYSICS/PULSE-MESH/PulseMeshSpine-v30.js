// ============================================================================
// FILE: PulseMeshSpine-v30-IMMORTAL+++.js
// [pulse:mesh] PULSE_MESH_SPINE v30-IMMORTAL+++  // one-band spine
// Deterministic Pathway Engine • Advantage Surfaces • ONE-BAND Mesh Spine
// MeshBand/PulseBand/OneBand Unified • Metadata-Only • No Payload Access
// Drift-Proof • Hyper-Advantage • Burst-Aware • Lane-Aware • GPU-Warm-Aware
// Binary-Aware • BLE-Aware • Long-Range-Aware • Mesh-Tier-Aware
// ============================================================================

import { createPulseMeshSkinReflex as createCommunityReflex } from "./PulseMeshSkinReflex-v30.js";
import { createPulseMeshFlow } from "./PulseMeshFlow-v30.js";
import { createPulseMeshCortex as applyPulseCortex } from "./PulseMeshCortex-v30.js";
import { createPulseMeshTendons as applyPulseMeshTendons } from "./PulseMeshTendons-v30.js";
import { applyMeshSignalFactoring } from "./PulseMeshSignalFactoring-v30.js";
import { createPulseMeshImmuneSystem as recordMeshDriftEvent } from "./PulseMeshImmuneSystem-v30.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// GLOBAL MESH MEMORY — v30-IMMORTAL+++
// ============================================================================

export const MeshMemory = {
  drift: [],
  flow: [],
  lineage: [],
  hops: [],
  trust: [],
  load: [],
  factoring: [],
  factoringDepth: [],
  factoringBias: [],

  // advantage memory
  prewarm: [],
  chunks: [],
  cache: [],
  presence: [],

  // v24/v30 advantage extensions
  bursts: [],           // burst surfaces (bluetooth-style / local-burst suitability)
  lanes: [],            // lane surfaces (lane pressure + lane locality profile)
  energyDecay: [],      // energy decay profile per hop
  modePressure: [],     // binary/symbolic/dual pressure per hop
  presenceBandStats: [],// global presence-band evolution over meshCycle
  meshBandStats: []     // v30 one-band evolution (meshband/pulseband/oneband)
};

// Deterministic cycle counter (replaces timestamps)
let meshCycle = 0;

// ============================================================================
// Mesh Factory (v30-IMMORTAL+++)
// ============================================================================
export function createPulseMesh() {
  return {
    nodes: new Map(),
    flow: createPulseMeshFlow(),
    reflex: createCommunityReflex(),
    meta: {
      layer: "PulseMeshSpine",
      role: "ROUTING_SPINE",
      version: "30-IMMORTAL+++",
      target: "full-mesh",
      selfRepairable: true,
      evo: {
        dualMode: true,
        binaryAware: true,
        symbolicAware: true,
        presenceAware: true,
        bandAware: true,
        localAware: true,
        internetAware: true,

        meshAware: true,
        meshTierAware: true,
        longRangeAware: true,
        bluetoothPresenceAware: true,
        binaryTransferAware: true,

        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,

        unifiedAdvantageField: true,
        deterministicField: true,
        futureEvolutionReady: true,

        signalFactoringAware: true,
        meshPressureAware: true,
        auraPressureAware: true,
        flowAware: true,
        driftAware: true,

        // advantage flags
        prewarmAware: true,
        chunkAware: true,
        cacheAware: true,
        dualBandReady: true,
        gpuWarmAware: true,

        // v24/v30 extensions
        burstAware: true,
        laneAware: true,
        bluetoothBurstAware: true,
        localBurstAware: true,
        organismModeAware: true,
        meshConsciousnessAware: true,

        // ONE-BAND spine awareness
        meshBandAware: true,
        pulseBandAware: true,
        oneBandAware: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true
      },
      reach: {
        estimatedHops: 0,
        estimatedMeters: 0,
        mode: "direct",
        localityMode: "local-first"
      }
    }
  };
}

// ============================================================================
// Node Registration
// ============================================================================
export function registerMeshNode(mesh, nodeConfig) {
  if (!nodeConfig.id) {
    throw new Error("[pulse:mesh] nodeConfig.id required");
  }

  mesh.nodes.set(nodeConfig.id, {
    id: nodeConfig.id,
    kind: nodeConfig.kind || "service",
    neighbors: nodeConfig.neighbors || [],
    reflex: nodeConfig.reflex || mesh.reflex,
    trustLevel: nodeConfig.trustLevel ?? 0.5,
    load: nodeConfig.load ?? 0.0,
    locality: nodeConfig.locality || "local", // "local" | "edge" | "internet"

    // v24++: optional lane/burst hints (metadata-only)
    laneHint: nodeConfig.laneHint || null,          // e.g. "gpu", "io", "bluetooth"
    burstHint: nodeConfig.burstHint || null         // e.g. "local-burst", "wide-burst"
  });

  return mesh;
}

// ============================================================================
// Flow Recorder (metadata-only, deterministic)
// ============================================================================
function recordFlow(mesh, from, to) {
  MeshMemory.flow.push({
    cycle: meshCycle,
    from,
    to
  });
}

// ============================================================================
// Factoring Recorder (metadata-only, deterministic)
// ============================================================================
function recordFactoring(impulse) {
  const flags = impulse.flags || {};
  const depth = flags.mesh_factor_depth || 0;
  const bias = flags.mesh_factor_bias || 0;
  const factored = !!flags.mesh_factored;

  if (!factored && depth === 0 && bias === 0) return;

  MeshMemory.factoring.push({
    cycle: meshCycle,
    depth,
    bias,
    factored
  });

  MeshMemory.factoringDepth.push({
    cycle: meshCycle,
    depth
  });

  MeshMemory.factoringBias.push({
    cycle: meshCycle,
    bias
  });
}

// ============================================================================
// ONE-BAND classification (meshBand / pulseBand / oneBand)
// ============================================================================
function classifyMeshBand(impulse) {
  const f = impulse.flags || {};
  const band =
    impulse.band ||
    f.mesh_band ||
    f.pulse_band ||
    f.one_band ||
    f.mesh_presence_band ||
    null;

  if (band === "one" || band === "oneband" || band === "unified") return "one";
  if (band === "mesh" || band === "meshband") return "mesh";
  if (band === "pulse" || band === "PulseBand") return "pulse";

  // backward-compatible presence-band mapping
  if (f.mesh_presence_band) {
    if (f.mesh_presence_band === "dual") return "mesh";
    if (f.mesh_presence_band === "binary") return "pulse";
    if (f.mesh_presence_band === "symbolic") return "mesh";
  }

  // derive from mode flags
  if (f.binary_mode && f.dual_mode) return "mesh";
  if (f.binary_mode) return "pulse";
  if (f.dual_mode) return "mesh";

  return "mesh"; // default: mesh-band
}

// legacy presence-band view (for compatibility with older surfaces)
function classifyPresenceBand(impulse) {
  const f = impulse.flags || {};
  if (f.mesh_presence_band) return f.mesh_presence_band;
  if (f.binary_mode && f.dual_mode) return "dual";
  if (f.binary_mode) return "binary";
  if (f.dual_mode) return "dual";
  return "symbolic";
}

// v24++: classify burst mode (bluetooth/local/wide) from flags only
function classifyBurstMode(impulse) {
  const f = impulse.flags || {};
  if (f.mesh_bluetooth_burst) return "bluetooth";
  if (f.mesh_local_burst) return "local-burst";
  if (f.mesh_wide_burst) return "wide-burst";
  return "none";
}

// v24++: classify lane hint (gpu/io/mesh) from flags only
function classifyLaneHint(impulse) {
  const f = impulse.flags || {};
  if (f.mesh_lane_gpu) return "gpu";
  if (f.mesh_lane_io) return "io";
  if (f.mesh_lane_mesh) return "mesh";
  return "generic";
}

// ============================================================================
// v30-IMMORTAL+++ ADVANTAGE SURFACES
// Prewarm • Chunk • Cache • Presence • Burst • Lane • OneBand
// ============================================================================

// Prewarm snapshot: next-hop candidates, mode, locality bias, burst/lane hints
function recordPrewarmSurface(mesh, impulse, node, context) {
  const presenceBand = classifyPresenceBand(impulse);
  const meshBand = classifyMeshBand(impulse);
  const burstMode = classifyBurstMode(impulse);
  const laneHint = classifyLaneHint(impulse);
  const neighbors = node.neighbors || [];

  const snapshot = {
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    binaryMode: !!context.binaryMode,
    dualMode: !!context.dualMode,
    neighbors: neighbors.slice().sort(), // deterministic
    routeHint: impulse.routeHint || null,
    score: typeof impulse.score === "number" ? impulse.score : null,
    energy: typeof impulse.energy === "number" ? impulse.energy : null,

    burstMode,
    laneHint,
    locality: node.locality || "local",
    trustLevel: typeof node.trustLevel === "number" ? node.trustLevel : 0.5,
    load: typeof node.load === "number" ? node.load : 0
  };

  MeshMemory.prewarm.push(snapshot);

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_prewarm_surface = true;
  impulse.flags.mesh_prewarm_presence_band = presenceBand;
  impulse.flags.mesh_prewarm_mesh_band = meshBand;
  impulse.flags.mesh_prewarm_burst_mode = burstMode;
  impulse.flags.mesh_prewarm_lane_hint = laneHint;
}

// Chunk snapshot: lineage + factoring + trust/load at this hop + mode pressure
function recordChunkSurface(impulse, node) {
  const presenceBand = classifyPresenceBand(impulse);
  const meshBand = classifyMeshBand(impulse);
  const flags = impulse.flags || {};

  const chunk = {
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    hops: impulse.hops || 0,
    mesh_factor_depth: flags.mesh_factor_depth || 0,
    mesh_factor_bias: flags.mesh_factor_bias || 0,
    mesh_factor_pressure: flags.mesh_factor_pressure || 0,
    aura_factoring_bias: flags.aura_factoring_bias || 0,
    aura_prefers_stable_routes: !!flags.aura_prefers_stable_routes,

    binaryMode: !!flags.binary_mode,
    dualMode: !!flags.dual_mode,
    symbolicMode: !flags.binary_mode,
    organismMode: flags.organism_mode || null
  };

  MeshMemory.chunks.push(chunk);

  MeshMemory.modePressure.push({
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    binaryMode: !!flags.binary_mode,
    dualMode: !!flags.dual_mode,
    symbolicMode: !flags.binary_mode
  });

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_chunk_surface = true;
  impulse.flags.mesh_chunk_presence_band = presenceBand;
  impulse.flags.mesh_chunk_mesh_band = meshBand;
}

// Cache snapshot: stable route profile (locality + trust/load + mode + burst)
function recordCacheSurface(mesh, impulse, node) {
  const presenceBand = classifyPresenceBand(impulse);
  const meshBand = classifyMeshBand(impulse);
  const burstMode = classifyBurstMode(impulse);

  const neighbors = node.neighbors || [];
  const neighborProfiles = neighbors
    .map((id) => {
      const n = mesh.nodes.get(id);
      if (!n) {
        return {
          id,
          locality: "unknown",
          trust: 0,
          load: 1,
          laneHint: null,
          burstHint: null
        };
      }
      return {
        id: n.id,
        locality: n.locality || "local",
        trust: typeof n.trustLevel === "number" ? n.trustLevel : 0.5,
        load: typeof n.load === "number" ? n.load : 0,
        laneHint: n.laneHint || null,
        burstHint: n.burstHint || null
      };
    })
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  const cacheProfile = {
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    binaryMode: !!impulse.flags.binary_mode,
    dualMode: !!impulse.flags.dual_mode,
    neighborProfiles,
    burstMode
  };

  MeshMemory.cache.push(cacheProfile);

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_cache_surface = true;
  impulse.flags.mesh_cache_presence_band = presenceBand;
  impulse.flags.mesh_cache_mesh_band = meshBand;
  impulse.flags.mesh_cache_burst_mode = burstMode;
}

// Presence snapshot: global presence-band + meshBand + mode + hop index
function recordPresenceSurface(impulse, node) {
  const presenceBand = classifyPresenceBand(impulse);
  const meshBand = classifyMeshBand(impulse);

  const presence = {
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    binaryMode: !!impulse.flags.binary_mode,
    dualMode: !!impulse.flags.dual_mode,
    symbolicMode: !impulse.flags.binary_mode,
    hopIndex: impulse.hops || 0
  };

  MeshMemory.presence.push(presence);

  MeshMemory.presenceBandStats.push({
    cycle: meshCycle,
    presenceBand
  });

  MeshMemory.meshBandStats.push({
    cycle: meshCycle,
    meshBand
  });

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_presence_surface = true;
  impulse.flags.mesh_presence_band = presenceBand;
  impulse.flags.mesh_mesh_band = meshBand;
  if (meshBand === "one") {
    impulse.flags.mesh_one_band = true;
  }
}

// Burst surface: bluetooth/local/wide burst suitability (metadata-only)
function recordBurstSurface(impulse, node) {
  const presenceBand = classifyPresenceBand(impulse);
  const meshBand = classifyMeshBand(impulse);
  const burstMode = classifyBurstMode(impulse);

  const burst = {
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    burstMode,
    locality: node.locality || "local",
    suitability:
      burstMode === "bluetooth"
        ? (node.locality === "local" ? 1 : 0.4)
        : burstMode === "local-burst"
        ? (node.locality === "local" ? 0.9 : 0.5)
        : burstMode === "wide-burst"
        ? (node.locality === "internet" ? 1 : 0.6)
        : 0
  };

  MeshMemory.bursts.push(burst);

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_burst_surface = true;
  impulse.flags.mesh_burst_mode = burstMode;
}

// Lane surface: lane pressure + lane locality profile (metadata-only)
function recordLaneSurface(impulse, node) {
  const presenceBand = classifyPresenceBand(impulse);
  const meshBand = classifyMeshBand(impulse);
  const laneHint = classifyLaneHint(impulse);

  const lane = {
    cycle: meshCycle,
    nodeId: node.id,
    presenceBand,
    meshBand,
    laneHint,
    locality: node.locality || "local",
    lanePressure: Math.max(
      0,
      Math.min(
        1,
        (node.load ?? 0) * 0.6 +
          (impulse.flags.mesh_factor_pressure ?? 0) * 0.4
      )
    )
  };

  MeshMemory.lanes.push(lane);

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_lane_surface = true;
  impulse.flags.mesh_lane_hint = laneHint;
}

// Energy decay recorder (metadata-only)
function recordEnergyDecay(impulse, node) {
  const energy =
    typeof impulse.energy === "number" ? impulse.energy : null;

  MeshMemory.energyDecay.push({
    cycle: meshCycle,
    nodeId: node.id,
    energy
  });
}

// ============================================================================
// Routing Entry Point (v30-IMMORTAL+++)
// Metadata-only • Deterministic • Local-first • Dual-Mode • ONE-BAND Spine
// ============================================================================
export function routeImpulse(mesh, impulse, entryNodeId, context = {}) {
  meshCycle++;

  impulse.flags = impulse.flags || {};
  impulse.flags.mesh_meta = mesh.meta;
  impulse.flags.mesh_route_started = true;
  impulse.flags.mesh_spine_surface = true;

  // organism mode hint (if provided by OrganismMesh)
  if (context.organismMode) {
    impulse.flags.organism_mode = context.organismMode;
  }

  // mode tagging (binary / dual / symbolic)
  const binaryMode = !!context.binaryMode || !!impulse.flags.binary_mode;
  const dualMode = !!context.dualMode || !!impulse.flags.dual_mode;

  impulse.flags.binary_mode = binaryMode;
  impulse.flags.dual_mode = dualMode;
  impulse.flags.mesh_mode = binaryMode ? "binary" : dualMode ? "dual" : "symbolic";

  // ONE-BAND tagging
  const meshBand = classifyMeshBand(impulse);
  impulse.band = meshBand;
  impulse.flags.mesh_band = meshBand;
  if (meshBand === "one") {
    impulse.flags.one_band = true;
  }

  const visited = new Set();
  let currentNodeId = entryNodeId;

  const MAX_HOPS = context.maxHops ?? 256;

  while (currentNodeId) {
    const node = mesh.nodes.get(currentNodeId);

    // DRIFT: Missing node
    if (!node) {
      recordMeshDriftEvent({
        driftType: "missing_node",
        severity: "warning",
        meshNodeId: currentNodeId,
        note: "Mesh node missing during routing",
        fileName: "PulseMeshSpine-v30-IMMORTAL+++.js",
        functionName: "routeImpulse",
        fieldName: "nodes"
      });

      MeshMemory.drift.push({
        cycle: meshCycle,
        type: "missing_node",
        node: currentNodeId
      });

      impulse.flags.mesh_missing_node = true;
      break;
    }

    visited.add(currentNodeId);

    // HOPS + LINEAGE
    impulse.hops = (impulse.hops || 0) + 1;

    MeshMemory.hops.push({ cycle: meshCycle, node: node.id });

    MeshMemory.lineage.push({
      cycle: meshCycle,
      node: node.id,
      trust: node.trustLevel ?? 0.5,
      load: node.load ?? 0.0,
      mode: impulse.flags.mesh_mode,
      meshBand: classifyMeshBand(impulse)
    });

    MeshMemory.trust.push({
      cycle: meshCycle,
      node: node.id,
      trust: node.trustLevel ?? 0.5
    });

    MeshMemory.load.push({
      cycle: meshCycle,
      node: node.id,
      load: node.load ?? 0.0
    });

    if (impulse.hops > MAX_HOPS) {
      impulse.flags.mesh_max_hops_exceeded = true;

      recordMeshDriftEvent({
        driftType: "routing_stall",
        severity: "warning",
        meshNodeId: node.id,
        note: "Mesh routing exceeded max hops — safety stop",
        fileName: "PulseMeshSpine-v30-IMMORTAL+++.js",
        functionName: "routeImpulse",
        fieldName: "hops"
      });

      MeshMemory.drift.push({
        cycle: meshCycle,
        type: "routing_stall",
        node: node.id
      });

      break;
    }

    // v30-IMMORTAL+++ ADVANTAGE SURFACES
    recordPrewarmSurface(mesh, impulse, node, { binaryMode, dualMode });
    recordChunkSurface(impulse, node);
    recordCacheSurface(mesh, impulse, node);
    recordPresenceSurface(impulse, node);
    recordBurstSurface(impulse, node);
    recordLaneSurface(impulse, node);

    // 0. SIGNAL PRESSURE SURFACE (factoring + aura hints)
    impulse.flags = impulse.flags || {};
    const factorDepth = impulse.flags.mesh_factor_depth || 0;
    const factorBias = impulse.flags.mesh_factor_bias || 0;
    const auraBias = impulse.flags.aura_factoring_bias || 0;

    impulse.flags.mesh_factor_pressure =
      factorDepth + factorBias + auraBias;

    // 1. REFLEX (1/0 instinct)
    const decision = node.reflex(impulse, node);

    if (decision === 0) {
      impulse.flags[`reflex_drop_at_${node.id}`] = true;

      recordMeshDriftEvent({
        driftType: "reflex_drop",
        severity: "info",
        meshNodeId: node.id,
        note: "Reflex dropped impulse",
        fileName: "PulseMeshSpine-v30-IMMORTAL+++.js",
        functionName: "routeImpulse",
        fieldName: "reflex"
      });

      MeshMemory.drift.push({
        cycle: meshCycle,
        type: "reflex_drop",
        node: node.id
      });

      break;
    }

    // 2. CORTEX (strategic shaping, dual-mode-aware)
    applyPulseCortex(impulse, {
      ...context,
      globalLoad: node.load,
      trustLevel: node.trustLevel,
      binaryMode,
      dualMode
    });

    // 3. TENDONS (intent + routeHint + energy shaping)
    applyPulseMeshTendons(impulse);

    // 4. Energy decay (instinctive fatigue, metadata-only)
    impulse.energy =
      typeof impulse.energy === "number" ? impulse.energy * 0.9 : 0.9;

    recordEnergyDecay(impulse, node);

    if (impulse.energy <= 0.05) {
      impulse.flags.mesh_energy_exhausted = true;
      break;
    }

    // 4.5 SIGNAL FACTORING (1/0, metadata-only)
    applyMeshSignalFactoring(impulse);
    recordFactoring(impulse);

    // 5. Earner delivery check
    if (node.kind === "earner" && shouldDeliverToEarner(impulse, node)) {
      impulse.flags[`delivered_to_${node.id}`] = true;
      impulse.flags.reached_earn_engine = true;
      break;
    }

    // 6. Next hop selection (factoring + load + locality + mode + burst + lane)
    const nextId = selectNextHop(mesh, node, visited, impulse, {
      binaryMode,
      dualMode
    });

    if (!nextId) {
      impulse.flags[`stalled_at_${node.id}`] = true;

      recordMeshDriftEvent({
        driftType: "routing_stall",
        severity: "warning",
        meshNodeId: node.id,
        note: "Mesh routing stalled — no available neighbors",
        fileName: "PulseMeshSpine-v30-IMMORTAL+++.js",
        functionName: "routeImpulse",
        fieldName: "neighbors"
      });

      MeshMemory.drift.push({
        cycle: meshCycle,
        type: "routing_stall",
        node: node.id
      });

      break;
    }

    recordFlow(mesh, currentNodeId, nextId);
    currentNodeId = nextId;
  }

  impulse.flags.mesh_route_completed = true;
  return impulse;
}

// ============================================================================
// Next Hop Selection
// ============================================================================
function selectNextHop(mesh, node, visited, impulse, { binaryMode, dualMode }) {
  const neighbors = node.neighbors || [];
  if (!neighbors.length) return null;

  const factorPressure = impulse.flags.mesh_factor_pressure || 0;
  const prefersStableRoutes = !!impulse.flags.aura_prefers_stable_routes;
  const burstMode = classifyBurstMode(impulse);
  const laneHint = classifyLaneHint(impulse);
  const meshBand = classifyMeshBand(impulse);

  const candidates = neighbors
    .filter((n) => !visited.has(n))
    .map((id) => {
      const n = mesh.nodes.get(id);

      if (!n) {
        return {
          id,
          load: 1,
          trust: 0,
          locality: "unknown",
          penalty: 1
        };
      }

      const load = typeof n.load === "number" ? n.load : 0;
      const trust = typeof n.trustLevel === "number" ? n.trustLevel : 0.5;
      const locality = n.locality || "local";

      let penalty = 0;

      // higher load → higher penalty
      if (load > 0.5) penalty += (load - 0.5) * 0.6;

      // lower trust → higher penalty
      if (trust < 0.5) penalty += (0.5 - trust) * 0.5;

      // factoring pressure → prefer shorter / more stable paths
      if (factorPressure > 0) {
        penalty += factorPressure * 0.3;
      }

      // aura stable-route hint → extra penalty for high-load nodes
      if (prefersStableRoutes && load > 0.3) {
        penalty += (load - 0.3) * 0.4;
      }

      // locality preference: local < edge < internet
      if (locality === "edge") penalty += 0.05;
      if (locality === "internet") penalty += 0.15;

      // mode-aware tweaks
      if (binaryMode) {
        if (locality === "internet") penalty += 0.1;
        if (trust < 0.6) penalty += 0.1;
      }

      if (dualMode && locality === "edge") {
        penalty -= 0.02;
      }

      // burst-aware tweaks
      if (burstMode === "bluetooth") {
        if (locality === "local") penalty -= 0.08;
        if (locality === "internet") penalty += 0.12;
      } else if (burstMode === "local-burst") {
        if (locality === "local") penalty -= 0.05;
      } else if (burstMode === "wide-burst") {
        if (locality === "internet") penalty -= 0.05;
      }

      // lane-aware tweaks (gpu/io/mesh)
      if (laneHint && n.laneHint) {
        if (laneHint === n.laneHint) {
          penalty -= 0.06;
        } else {
          penalty += 0.04;
        }
      }

      // ONE-BAND tweaks: when meshBand === "one", strongly prefer local + high-trust
      if (meshBand === "one") {
        if (locality === "local") penalty -= 0.06;
        if (trust < 0.7) penalty += 0.06;
      }

      return {
        id,
        load,
        trust,
        locality,
        penalty
      };
    })
    .sort((a, b) => {
      if (a.penalty !== b.penalty) return a.penalty - b.penalty;
      return String(a.id).localeCompare(String(b.id));
    });

  const best = candidates[0];
  return best ? best.id : null;
}

// ============================================================================
// Earner Targeting Helper
// ============================================================================
function shouldDeliverToEarner(impulse, node) {
  const hint = impulse.routeHint;
  if (!hint) return true;
  if (hint === node.id) return true;
  if (hint === node.kind) return true;

  return false;
}

// ============================================================================
// Mesh Reach Snapshot (Metadata-Only)
// ============================================================================
export function getMeshReachSnapshot(mesh) {
  const nodeCount = mesh.nodes.size;

  const avgDegree =
    nodeCount === 0
      ? 0
      : Array.from(mesh.nodes.values()).reduce(
          (sum, n) => sum + (n.neighbors.length || 0),
          0
        ) / nodeCount;

  const estimatedHops = Math.max(1, Math.round(avgDegree || 1));
  const estimatedMeters = estimatedHops * 30;

  let mode = "direct";
  if (estimatedHops >= 3 && estimatedHops < 6) mode = "cluster";
  if (estimatedHops >= 6) mode = "wide";

  const locals = Array.from(mesh.nodes.values()).filter(
    (n) => (n.locality || "local") === "local"
  ).length;

  const localityRatio = nodeCount === 0 ? 1 : locals / nodeCount;
  const localityMode =
    localityRatio > 0.7 ? "local-first" : localityRatio < 0.3 ? "internet-mixed" : "hybrid";

  return {
    layer: mesh.meta.layer,
    role: mesh.meta.role,
    version: mesh.meta.version,
    nodeCount,
    avgDegree,
    reach: { estimatedHops, estimatedMeters, mode, localityMode }
  };
}

// ============================================================================
// PulseMeshSpine EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseMeshSpine = {
  create: createPulseMesh,
  memory: MeshMemory,
  version: "30-IMMORTAL+++",
  layer: "PulseMeshSpine"
};

export default PulseMeshSpine;

PulseRealm.PulseMeshSpine = PulseMeshSpine;
PulseRealm.PulseMeshSpineBuild = createPulseMesh;
