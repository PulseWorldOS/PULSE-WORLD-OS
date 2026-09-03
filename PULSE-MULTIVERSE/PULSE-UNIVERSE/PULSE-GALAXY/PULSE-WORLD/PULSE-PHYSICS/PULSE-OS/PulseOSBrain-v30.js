// ============================================================================
// FILE: /PulseOS/Brain/PulseOSBrain-v30.js
// PULSE OS BRAIN — v30-Immortal++++-DUALBAND-PulseBand+MeshBand-ADVANTAGE-ARTERY
// “REAL CNS / ORGANISM-WIDE IDENTITY + INTELLIGENCE + ARTERY KERNEL (v30)”
// ============================================================================
//
// LAWS (v30+IMMORTAL++++ + PULSE-TOPOLOGY 30):
//   • Brain may import ONLY:
//       - PulseIQMap        (design + logging + long-term memory)
//       - PulseOrganismMap  (organ layout + organs + lineage)
//       - PulseOSEvolution  (CNS evolution organ, which boots Cortex)
//   • Brain NEVER executes binary payloads.
//   • Brain NEVER performs network calls.
//   • Brain NEVER routes anything.
//   • Brain is binary-aware, dualband, but symbolic-primary.
//   • Binary is always post-render, handled by GPU / Send / Binary organs.
//   • Brain is the CNS identity + contract + artery kernel, not a router, not a GPU.
//   • No presence/mesh/gpu/heartbeat imports — awareness is metadata-only.
//   • Brain may hold world-lens / advantage / presence / pulse-topology / artery
//     summaries, but only emits view-only, non-network-dependent descriptors.
//   • All internet / network intent MUST be emitted upward as symbolic intent
//     and fulfilled by Castle → Expansion → Pulse-Net (server / higher power).
//   • Expansion + server are the *internet center*; Brain is read-only consumer
//     via snapshots, never the origin of network traffic.
//   • v30++++: artery-aware, SDN-prewarm-aware, multi-presence-aware, mesh-artery-aware,
//     chunk/cache/presence/advantage-field aware, bandFamily-aware, dnaTag/meshTag-aware,
//     but still zero-network, zero-binary.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseIQMapEvolvableV40 as PulseIQMap } from "../../PULSE-WORLD-MAPIQ.js";
import { getPulseOrganismMapV32 as PulseOrganismMap } from "../../PULSE-WORLD-MAPORGANISM.js";
import { PulseOSEvolution } from "./PulseOSBrainEvolution-v30.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

import { createPulseWorldBandCheckBand as checkBand } from "../PULSE-BAND/PULSE-BAND-CHECK.js";
import { validateAndLoadIdentity as checkIdentity} from "../X-PULSE-X/PULSE-WORLD-IDENTITY.js";
import {PulseOSCheckRouterMemory as checkRouterMemory} from "../Pulse-Coordinator/PulseProxyMemoryRouter-v30.js";




// deterministic symbolic sequence (replaces Date.now usage inside Brain)
let BrainSeq = 0;
function nextBrainSeq() {
  BrainSeq += 1;
  return BrainSeq;
}

const BAND_FAMILY = {
  PULSEBAND: "PulseBand",
  MESHBAND: "meshband"
};

function normalizeBand(band) {
  const b = String(band || "dual").toLowerCase();
  return b === "binary" || b === "symbolic" || b === "dual" ? b : "dual";
}

function normalizeBandFamily(family) {
  const f = String(family || BAND_FAMILY.PULSEBAND).toLowerCase();
  return f === BAND_FAMILY.MESHBAND ? BAND_FAMILY.MESHBAND : BAND_FAMILY.PULSEBAND;
}

export const PulseOSBrain = {
  // -------------------------------------------------------------------------
  // Identity — Organism-wide CNS contract
  // -------------------------------------------------------------------------
  PulseRole: {
    type: "Brain",
    subsystem: "OS",
    layer: "CNS",
    version: "30-Immortal++++",
    identity: "PulseOSBrain",
    evo: {
      deterministicNeuron: true,
      driftProof: true,
      multiInstanceReady: true,
      advantageCascadeAware: true,
      unifiedAdvantageField: true,

      routingContract: "PulseRouter-v30-Immortal++++",
      osOrganContract: "PulseOS-v30-Immortal++++",
      earnCompatibility: "PulseEarn-v31-Immortal++++",
      proxyCompatibility: "PulseProxySpine-v30-Immortal++++",
      gpuCompatibility: "PulseGPU-v30-Immortal++++",

      loopTheoryAware: true,
      continuanceAware: true,

      dualMode: true,
      symbolicPrimary: true,
      binaryPostRenderOnly: true,
      binaryCompressionAware: true,
      binaryNonExecutable: true,
      organismWideIdentityField: true,

      presenceFieldAware: true,
      bluetoothPresenceAware: true,
      meshPresenceRelayAware: true,
      meshTopologyAware: true,
      kernelChunkingReady: true,
      kernelPrewarmReady: true,
      advantageFieldAware: true,
      pulseTopologyAware: true,

      // v30 internet-center awareness
      expansionAware: true,
      serverRoundtripAware: true,
      internetCenterExternal: true,

      // Artery awareness
      arteryAware: true,
      arteryDeterministic: true,
      arteryDriftProof: true,
      arteryMultiBandAware: true,

      // v30 SDN / prewarm alignment
      sdnPrewarmAware: true,
      spinalPrewarmAware: true,
      organismMeshArteryAware: true,

      // v30 band system
      bandFamilyAware: true,
      pulseBandAware: true,
      meshBandAware: true,
      dnaTagAware: true,
      meshTagAware: true
    }
  },

  // -------------------------------------------------------------------------
  // CNS Infrastructure — IQ-aware but NOT IQ-dependent for survival
  // -------------------------------------------------------------------------
  PulseIQMap: PulseIQMap || {},
  PulseOrganismMap: PulseOrganismMap,
  PulseOSEvolution: PulseOSEvolution,

  intent: {
    mode: "organism-brain",
    epoch: "30-Immortal++++",
    dualBand: true,
    symbolicPrimary: true,
    bandFamily: BAND_FAMILY.PULSEBAND
  },

  understanding: {
    classify: () => null,
    fallback: () => null
  },

  evolution: null, // attached by cognitiveBootstrap

  cortex: {
    routes: {},
    pages: {},
    bind: () => {},
    initializeNervousSystem: () => {},
    initializeOrgans: () => {},
    scanFile: null
  },

  // CNS snapshots (filled by Castle/Expansion/Pulse-Net via server roundtrip)
  CNSWorldLensSnapshot: null,
  CNSAdvantageSnapshot: null,
  CNSPresenceSnapshot: null,
  CNSTopologySnapshot: null,
  CNSArterySnapshot: null,

  // CNS Artery live state (internal, deterministic, drift-proof)
  CNSArteryState: {
    pressure: 0,
    throughput: 0,
    cost: 0,
    stability: 1,
    entropy: 0,
    expansionReadiness: 0,
    recoveryNeed: 0,
    cortexLoad: 0,
    meshLoad: 0,
    presenceLoad: 0,
    advantageLoad: 0,
    worldLensLoad: 0,
    topologyLoad: 0,
    organismMeshLoad: 0,
    dualBandLoad: 0,
    binaryOverlayLoad: 0,
    band: "dual",
    bandFamily: BAND_FAMILY.PULSEBAND
  },

  log: (...args) => {
    if (PulseOSBrain.PulseIQMap.log) return PulseOSBrain.PulseIQMap.log(...args);
    return console.log("[BRAIN]", ...args);
  },

  warn: (...args) => {
    if (PulseOSBrain.PulseIQMap.warn) return PulseOSBrain.PulseIQMap.warn(...args);
    return console.warn("[BRAIN-WARN]", ...args);
  },

  logError: (...args) => {
    if (PulseOSBrain.PulseIQMap.logError) return PulseOSBrain.PulseIQMap.logError(...args);
    return console.error("[BRAIN-ERROR]", ...args);
  },

  firebase: (...args) => {
    if (PulseOSBrain.PulseIQMap.firebase) return PulseOSBrain.PulseIQMap.firebase(...args);
    return null;
  },

  // -------------------------------------------------------------------------
  // UNIFIED NETWORK INTENT SURFACE — v30 IMMORTAL++++
  // -------------------------------------------------------------------------
  BrainIntent: {
    emitNetworkIntent({ type, payload = {}, band = "symbolic", bandFamily = "PulseBand" }) {
      return {
        ok: true,
        intent: "network-request",
        type,
        payload,
        band: normalizeBand(band),
        bandFamily: normalizeBandFamily(bandFamily),
        source: "PulseOSBrain",
        seq: nextBrainSeq()
      };
    },

    worldLensRefresh() {
      const iq = PulseOSBrain.PulseIQMap || {};
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "worldLens.refresh",
        payload: {
          url: iq.worldLensURL || null,
          offlineSafe: true
        }
      });
    },

    advantageRefresh() {
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "advantage.refresh",
        payload: {}
      });
    },

    presenceRefresh() {
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "presence.refresh",
        payload: {}
      });
    },

    topologyRefresh() {
      return PulseOSBrain.BrainIntent.emitNetworkIntent({
        type: "topology.refresh",
        payload: {}
      });
    }
  },

  // -------------------------------------------------------------------------
  // SNAPSHOT APPLY SURFACES — filled by Castle/Expansion/Pulse-Net
  // -------------------------------------------------------------------------
  applyWorldLensSnapshot(snapshot) {
    const s = snapshot || {};
    PulseOSBrain.CNSWorldLensSnapshot = {
      lastUpdated: s.lastUpdated ?? null,
      summary: s.summary || {},
      sources: s.sources || [],
      offlineSafe: s.offlineSafe !== false
    };
  },

  applyAdvantageSnapshot(snapshot) {
    const adv = snapshot || {};
    PulseOSBrain.CNSAdvantageSnapshot = {
      advantageScore: adv.advantageScore ?? adv.score ?? null,
      advantageBand: adv.advantageBand || adv.band || "neutral",
      regionAdvantage: adv.regionAdvantage || {},
      cascadeHints: adv.cascadeHints || {}
    };
  },

  applyPresenceSnapshot(snapshot) {
    const s = snapshot || {};
    PulseOSBrain.CNSPresenceSnapshot = {
      presenceField: s.presenceField || {},
      meshPresence: s.meshPresence || {},
      organismSnapshot: s.organismSnapshot || {
        organs: Object.keys(PulseOSBrain.PulseOrganismMap || {})
      }
    };
  },

  applyTopologySnapshot(snapshot) {
    const s = snapshot || {};
    PulseOSBrain.CNSTopologySnapshot = {
      momHeart: s.momHeart || null,
      dadHeart: s.dadHeart || null,
      babyHeart: s.babyHeart || null,
      fallbackRules: s.fallbackRules || {
        babyPulseSource: "mom-or-dad",
        momFallbackToDad: true,
        dadFallbackToMom: true
      }
    };
  },

  applyArterySnapshot(snapshot) {
    const s = snapshot || {};
    const st = PulseOSBrain.CNSArteryState;
    PulseOSBrain.CNSArterySnapshot = {
      pressure: s.pressure ?? st.pressure,
      throughput: s.throughput ?? st.throughput,
      cost: s.cost ?? st.cost,
      stability: s.stability ?? st.stability,
      entropy: s.entropy ?? st.entropy,
      expansionReadiness: s.expansionReadiness ?? st.expansionReadiness,
      recoveryNeed: s.recoveryNeed ?? st.recoveryNeed,
      cortexLoad: s.cortexLoad ?? st.cortexLoad,
      meshLoad: s.meshLoad ?? st.meshLoad,
      presenceLoad: s.presenceLoad ?? st.presenceLoad,
      advantageLoad: s.advantageLoad ?? st.advantageLoad,
      worldLensLoad: s.worldLensLoad ?? st.worldLensLoad,
      topologyLoad: s.topologyLoad ?? st.topologyLoad,
      organismMeshLoad: s.organismMeshLoad ?? st.organismMeshLoad,
      dualBandLoad: s.dualBandLoad ?? st.dualBandLoad,
      binaryOverlayLoad: s.binaryOverlayLoad ?? st.binaryOverlayLoad,
      band: normalizeBand(s.band ?? st.band),
      bandFamily: normalizeBandFamily(s.bandFamily ?? st.bandFamily)
    };
  },

  // -------------------------------------------------------------------------
  // CNS Artery Engine — internal, deterministic, drift-proof
  // -------------------------------------------------------------------------
  CNSArtery: {
    _clamp01(x) {
      if (typeof x !== "number" || Number.isNaN(x)) return 0;
      if (x < 0) return 0;
      if (x > 1) return 1;
      return x;
    },

    updateLocalSignals({
      cortexLoad,
      meshLoad,
      presenceLoad,
      advantageLoad,
      worldLensLoad,
      topologyLoad,
      organismMeshLoad,
      dualBandLoad,
      binaryOverlayLoad,
      band,
      bandFamily
    } = {}) {
      const s = PulseOSBrain.CNSArteryState;

      if (cortexLoad != null) s.cortexLoad = this._clamp01(cortexLoad);
      if (meshLoad != null) s.meshLoad = this._clamp01(meshLoad);
      if (presenceLoad != null) s.presenceLoad = this._clamp01(presenceLoad);
      if (advantageLoad != null) s.advantageLoad = this._clamp01(advantageLoad);
      if (worldLensLoad != null) s.worldLensLoad = this._clamp01(worldLensLoad);
      if (topologyLoad != null) s.topologyLoad = this._clamp01(topologyLoad);
      if (organismMeshLoad != null) s.organismMeshLoad = this._clamp01(organismMeshLoad);
      if (dualBandLoad != null) s.dualBandLoad = this._clamp01(dualBandLoad);
      if (binaryOverlayLoad != null) s.binaryOverlayLoad = this._clamp01(binaryOverlayLoad);

      if (band != null) s.band = normalizeBand(band);
      if (bandFamily != null) s.bandFamily = normalizeBandFamily(bandFamily);

      const avgLoad =
        (s.cortexLoad +
          s.meshLoad +
          s.presenceLoad +
          s.advantageLoad +
          s.worldLensLoad +
          s.topologyLoad +
          s.organismMeshLoad +
          s.dualBandLoad +
          s.binaryOverlayLoad) / 9;

      s.pressure = this._clamp01(avgLoad);
      s.throughput = this._clamp01(1 - Math.abs(avgLoad - 0.5) * 1.2);
      s.cost = this._clamp01(avgLoad * 0.8 + s.dualBandLoad * 0.2);
      s.stability = this._clamp01(1 - avgLoad * 0.7);
      s.entropy = this._clamp01(
        avgLoad * 0.6 + s.meshLoad * 0.2 + s.presenceLoad * 0.2
      );

      s.expansionReadiness = this._clamp01(
        (1 - s.pressure) * 0.4 + s.throughput * 0.4 + s.stability * 0.2
      );

      s.recoveryNeed = this._clamp01(
        s.pressure * 0.5 + (1 - s.stability) * 0.5
      );

      return this.getSnapshot();
    },

    getSnapshot() {
      const s = PulseOSBrain.CNSArteryState;
      return {
        pressure: s.pressure,
        throughput: s.throughput,
        cost: s.cost,
        stability: s.stability,
        entropy: s.entropy,
        expansionReadiness: s.expansionReadiness,
        recoveryNeed: s.recoveryNeed,
        cortexLoad: s.cortexLoad,
        meshLoad: s.meshLoad,
        presenceLoad: s.presenceLoad,
        advantageLoad: s.advantageLoad,
        worldLensLoad: s.worldLensLoad,
        topologyLoad: s.topologyLoad,
        organismMeshLoad: s.organismMeshLoad,
        dualBandLoad: s.dualBandLoad,
        binaryOverlayLoad: s.binaryOverlayLoad,
        band: s.band,
        bandFamily: s.bandFamily
      };
    }
  },

  // -------------------------------------------------------------------------
  // CNS Intelligence Layer — structural reasoning, not routing
  // -------------------------------------------------------------------------
  BrainIntel: {
    classifyDegradation(healthScore) {
      if (healthScore >= 0.85) return "direct";
      if (healthScore >= 0.15) return "bypass";
      return "routeAround";
    },

    scoreIdentityMatch(signature, module) {
      let score = 0;
      if (module.PulseRole.type === signature.type) score += 1;
      if (module.PulseRole.subsystem === signature.subsystem) score += 1;
      return score;
    },

    fallbackToMemory() {
      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const route = iq.getRecoveryRoute ? iq.getRecoveryRoute() : "/";
      const organs = iq.pages && iq.pages[route] ? iq.pages[route] : [];
      return { route, organs };
    },

    getSymbolicOrganismIdentity() {
      return {
        role: PulseOSBrain.PulseRole,
        intent: PulseOSBrain.intent,
        organismMap: PulseOSBrain.PulseOrganismMap,
        iqMap: PulseOSBrain.PulseIQMap
      };
    },

    getBinaryOrganismDescriptor() {
      const symbolic = this.getSymbolicOrganismIdentity();

      const descriptor = {
        version: PulseOSBrain.PulseRole.version,
        identity: PulseOSBrain.PulseRole.identity,
        subsystem: PulseOSBrain.PulseRole.subsystem,
        layer: PulseOSBrain.PulseRole.layer,

        dualMode: true,
        symbolicPrimary: true,
        binaryFirst: true,
        binaryPostRenderOnly: true,
        binaryNonExecutable: true,

        encoding: {
          format: "application/pulse-organism+json",
          suggestedTransport: "PulseGPU-v30-Immortal++++",
          suggestedCompression: "post-render",
          executable: false
        }
      };

      return {
        descriptor,
        symbolicSnapshot: symbolic
      };
    },

    getPresenceDescriptors() {
      if (PulseOSBrain.CNSPresenceSnapshot) {
        return PulseOSBrain.CNSPresenceSnapshot;
      }

      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const organism = PulseOSBrain.PulseOrganismMap || PulseOrganismMap || {};

      const presenceConfig = iq.presenceConfig || {};
      const meshConfig = iq.meshPresenceConfig || {};

      return {
        presenceField: {
          enabled: !!presenceConfig.enabled,
          bluetoothPreferred: !!presenceConfig.bluetoothPreferred,
          routes: presenceConfig.routes || []
        },
        meshPresence: {
          enabled: !!meshConfig.enabled,
          topology: meshConfig.topology || "none",
          routes: meshConfig.routes || []
        },
        organismSnapshot: {
          organs: Object.keys(organism || {})
        }
      };
    },

    getChunkingProfiles() {
      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const profiles = iq.chunkingProfiles || {};

      return {
        defaultProfile: profiles.default || null,
        routeProfiles: profiles.routes || {},
        gpuProfiles: profiles.gpu || {}
      };
    },

    getAdvantageField() {
      if (PulseOSBrain.CNSAdvantageSnapshot) {
        return PulseOSBrain.CNSAdvantageSnapshot;
      }

      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const adv = iq.advantageField || {};

      return {
        advantageScore: adv.score ?? null,
        advantageBand: adv.band || "neutral",
        regionAdvantage: adv.regionAdvantage || {},
        cascadeHints: adv.cascadeHints || {}
      };
    },

    getWorldLensSnapshot() {
      const lens = PulseOSBrain.CNSWorldLensSnapshot || {};
      return {
        lastUpdated: lens.lastUpdated || null,
        summary: lens.summary || {},
        sources: lens.sources || [],
        offlineSafe: lens.offlineSafe !== false
      };
    },

    getPulseTopologyDescriptors() {
      if (PulseOSBrain.CNSTopologySnapshot) {
        return PulseOSBrain.CNSTopologySnapshot;
      }

      const iq = PulseOSBrain.PulseIQMap || PulseIQMap || {};
      const organism = PulseOSBrain.PulseOrganismMap || PulseOrganismMap || {};

      const topo = iq.pulseTopology || {};

      const mom = topo.momHeart || organism.PulseProxyHeart || null;
      const dad = topo.dadHeart || organism.PulseAIHeartbeat || null;
      const baby = topo.earnHeart || organism.PulseEarnHeart || null;

      return {
        momHeart: mom
          ? { identity: mom.identity || "mom-heart", role: mom.role || "MOM_HEART" }
          : null,
        dadHeart: dad
          ? { identity: dad.identity || "dad-heart", role: dad.role || "DAD_HEART" }
          : null,
        babyHeart: baby
          ? { identity: baby.identity || "baby-heart", role: baby.role || "EARN_HEART" }
          : null,
        fallbackRules: topo.fallbackRules || {
          babyPulseSource: "mom-or-dad",
          momFallbackToDad: true,
          dadFallbackToMom: true
        }
      };
    },

    getArterySnapshot() {
      if (PulseOSBrain.CNSArterySnapshot) {
        return PulseOSBrain.CNSArterySnapshot;
      }
      return PulseOSBrain.CNSArtery.getSnapshot();
    }
  },

  scanFile(filePath) {
    const cortex = PulseOSBrain.cortex;

    if (cortex && typeof cortex.scanFile === "function") {
      return cortex.scanFile(filePath);
    }

    PulseOSBrain.warn(
      "🧠 [PulseOSBrain v30-Immortal++++] scanFile called but Cortex has no scanFile surface.",
      { filePath }
    );

      
  PulseRealm.PulseLog(
  "cns",
  "[PulseOSBrain] — Pulse OS Brain is Stirring.. (REAL CNS / ORGANISM-WIDE IDENTITY + INTELLIGENCE + ARTERY KERNEL (v30))."
);


    return {
      ok: false,
      error: "SCANNER_UNAVAILABLE",
      filePath
    };
  }
};

// ============================================================================
//  BRAIN PREWARM ENGINE — v30-Immortal++++
// ============================================================================
function prewarmPulseOSBrain() {
  try {
    const iq = PulseOSBrain.PulseIQMap || {};
    const organism = PulseOSBrain.PulseOrganismMap || {};

    const iqKeys = Object.keys(iq);
    for (const k of iqKeys) {
      const o = iq[k];
      void o;
    }

    const orgKeys = Object.keys(organism);
    for (const k of orgKeys) {
      const o = organism[k];
      void o;
    }

    PulseOSBrain.CNSArtery.updateLocalSignals({
      band: "dual",
      bandFamily: "PulseBand"
    });

    return true;
  } catch (err) {
    console.error("[PulseOSBrain Prewarm v30-Immortal++++] Failed:", err);
    return false;
  }
}

prewarmPulseOSBrain();

// ============================================================================
// 1) ROLE VALIDATION — CNS Gatekeeper
// ============================================================================
export function validatePulseRole(module, expectedType, expectedSubsystem) {
  if (!module.PulseRole) return false;

  const role = module.PulseRole;

  const typeOk = expectedType
    ? role.type.toLowerCase() === expectedType.toLowerCase()
    : true;

  const subsystemOk = expectedSubsystem
    ? role.subsystem.toLowerCase() === expectedSubsystem.toLowerCase()
    : true;

  return typeOk && subsystemOk;
}

// ============================================================================
// 2) STRUCTURAL ERROR INTELLIGENCE — Drift Surface
// ============================================================================
export function structuralError(expected, found, extraContext = {}) {
  const payload = {
    error: "ROLE_MISMATCH",
    expectedType: expected.type,
    expectedSubsystem: expected.subsystem,
    foundType: found.type,
    foundSubsystem: found.subsystem,
    message: `Invalid attachment: expected ${expected.type}/${expected.subsystem} but found ${found.type}/${found.subsystem}`,
    severity: "warning",
    action: "fallbackToLongTermMemory",
    ...extraContext
  };

  PulseOSBrain.warn("[STRUCTURAL_ERROR v30-Immortal++++]", payload);
  return payload;
}

// ============================================================================
// 3) EVOLUTION + ORGAN LOADING — Design-Driven CNS Logic
// ============================================================================
export async function loadOrganByDesign(designIdentity, expectedType, expectedSubsys) {
  const evolveRaw =
    PulseOSBrain.evolution.evolveRaw ||
    PulseOSBrain.evolution.evolveOrganRaw;

  const raw = typeof evolveRaw === "function"
    ? await evolveRaw(designIdentity)
    : [];

  const expected = { type: expectedType, subsystem: expectedSubsys };

  const candidates = raw.filter(({ module }) =>
    validatePulseRole(module, expected.type, expected.subsystem)
  );

  if (candidates.length > 0) {
    const chosen = candidates[0];
    PulseOSBrain.log(
      `🧠 [PulseOSBrain v30-Immortal++++] Attached organ from ${chosen.path}`
    );
    return chosen.module;
  }

  PulseOSBrain.warn(
    "[PulseOSBrain v30-Immortal++++] No matching organ found for designIdentity.",
    {
      designIdentity,
      expected
    }
  );

  return null;
}

export function getMemoryCore() {
  return PulseCoreGMemory;
}

// ============================================================================
// 4) CNS DIAGNOSTICS + OUTPUT — CALLS ALL HEALERS + SURFACES
// ============================================================================
function safeRun(label, fn) {
  try {
    const res = fn();
    return res === undefined ? { ok: true, surface: label } : res;
  } catch (err) {
    return { ok: false, error: String(err), surface: label };
  }
}

export function getCNSDiagnostics() {
  return {
    bandCheck: safeRun("checkBand", checkBand),
    identityCheck: safeRun("checkIdentity", checkIdentity),
    routerMemoryCheck: safeRun("checkRouterMemory", checkRouterMemory),
    worldLens: PulseOSBrain.BrainIntel.getWorldLensSnapshot(),
    advantageField: PulseOSBrain.BrainIntel.getAdvantageField(),
    pulseTopology: PulseOSBrain.BrainIntel.getPulseTopologyDescriptors(),
    artery: PulseOSBrain.BrainIntel.getArterySnapshot()
  };
}

export function getCNSState() {
  const identity = PulseOSBrain.BrainIntel.getSymbolicOrganismIdentity();
  const presence = PulseOSBrain.BrainIntel.getPresenceDescriptors();
  const chunking = PulseOSBrain.BrainIntel.getChunkingProfiles();
  const advantage = PulseOSBrain.BrainIntel.getAdvantageField();
  const worldLens = PulseOSBrain.BrainIntel.getWorldLensSnapshot();
  const pulseTopology = PulseOSBrain.BrainIntel.getPulseTopologyDescriptors();
  const artery = PulseOSBrain.BrainIntel.getArterySnapshot();
  const diagnostics = getCNSDiagnostics();

  return {
    CNSIdentity: identity,
    CNSContracts: PulseOSBrain.PulseRole,
    CNSDiagnostics: diagnostics,
    CNSBootSignatures: {
      organism: PulseOSBrain.PulseOrganismMap,
      iq: PulseOSBrain.PulseIQMap
    },
    CNSPresenceDescriptors: presence,
    CNSChunkingProfiles: chunking,
    CNSAdvantageField: advantage,
    CNSWorldLensSnapshot: worldLens,
    CNSPulseTopologyDescriptors: pulseTopology,
    CNSArterySnapshot: artery
  };
}

// ============================================================================
// 5) COGNITIVE BOOTSTRAP — Brain → Evolution → Cortex (v30)
// ============================================================================
export async function cognitiveBootstrap({
  intent,
  organism,
  iqMap,
  understanding,
  band = "dual",
  bandFamily = "PulseBand",
  dnaTag = null,
  meshTag = null
} = {}) {
  iqMap = PulseIQMap;

  if (intent) PulseOSBrain.intent = { ...PulseOSBrain.intent, ...intent };
  if (organism) PulseOSBrain.PulseOrganismMap = organism;

  if (iqMap) {
    PulseOSBrain.PulseIQMap = iqMap;

    if (iqMap.log) PulseOSBrain.log = (...args) => iqMap.log(...args);
    if (iqMap.warn) PulseOSBrain.warn = (...args) => iqMap.warn(...args);
    if (iqMap.logError) PulseOSBrain.logError = (...args) => iqMap.logError(...args);
    if (iqMap.firebase) PulseOSBrain.firebase = (...args) => iqMap.firebase(...args);
  }

  if (understanding) {
    PulseOSBrain.understanding = understanding;
  }

  const evolutionOrgan = PulseOSEvolution({
    intent: PulseOSBrain.intent,
    organism: PulseOSBrain.PulseOrganismMap,
    iq: PulseOSBrain.PulseIQMap,
    understanding: PulseOSBrain.understanding,
    band,
    bandFamily,
    dnaTag,
    meshTag
  });

  PulseOSBrain.evolution = evolutionOrgan;

  const cortex = evolutionOrgan.bootCortex(PulseOSBrain, {
    band,
    bandFamily,
    dnaTag,
    meshTag
  });
  PulseOSBrain.cortex = cortex;

  evolutionOrgan.recordLineage("brain-cognitive-bootstrap-v30-immortal++++", {
    band,
    bandFamily,
    dnaTag,
    meshTag
  });
  evolutionOrgan.scanDrift(PulseOSBrain, {
    band,
    bandFamily,
    dnaTag,
    meshTag
  });

  try {
    const initialLoads = evolutionOrgan.getInitialArteryLoads
      ? evolutionOrgan.getInitialArteryLoads()
      : {};
    PulseOSBrain.CNSArtery.updateLocalSignals({
      ...initialLoads,
      band,
      bandFamily
    });
  } catch (err) {
    PulseOSBrain.warn(
      "[PulseOSBrain v30-Immortal++++] Initial artery load update failed",
      { error: String(err) }
    );
  }

  PulseOSBrain.log(
    "🧠 [PulseOSBrain v30-Immortal++++] cognitiveBootstrap complete (advantage-integrated, artery-aware, dual-band, bandFamily-aware, zero-network, internet-center external)."
  );

  const diagnostics = getCNSDiagnostics();
  PulseOSBrain.CNSLastDiagnostics = diagnostics;
  PulseOSBrain.CNSLastState = getCNSState();

  return PulseOSBrain;
}

PulseRealm.OSBrain = {
  cognitiveBootstrap,
  getCNSDiagnostics,
  getCNSState,
  loadOrganByDesign,
  validatePulseRole,
  structuralError,
  prewarmPulseOSBrain,
  PulseOSBrain
}
PulseRealm.PulseOSBrain = PulseOSBrain;
PulseRealm.PulseOSBrainPrewarm = prewarmPulseOSBrain;