// ============================================================================
//  ai-v30.0-IMMORTAL+++.js
//  DUALBAND ORGANISM KERNEL — v30 IMMORTAL+++
//  Binary-First • Symbolic Fallback • Mesh-Aware • Halo-Aware • Cognition-Aware
//  Bluetooth-Presence-Aware • Advantage-Field-Aware • Drift-Proof
// ============================================================================

import { AIBinaryAgent } from "./PulseAIBinaryAgent-v30.js";
import { AIMemory } from "./PulseAIMemory-v30.js";

import { AIAnatomy as AIBinaryAnatomy } from "./PulseAIAnatomy-v30.js";
import { AIBinaryGenome } from "./PulseAIGenome-v30.js";
import { AIBinaryVitals } from "./MONITORS/PulseAIVitals-v30.js";
import { AIBinaryMetabolism } from "./PulseAIMetabolism-v30.js";
import { AIBinaryHormones } from "./PulseAIHormones-v30.js";
import { AIBinarySentience } from "./PERSONALITY/PulseAISentience-v30.js";
import { AIBinaryConsciousness } from "./PERSONALITY/PulseAIConsciousness-v30.js";
import { AIBinaryImmunity } from "./PulseAIImmunity-v30.js";
import { AIBinaryPipeline } from "./PulseAIPipeline-v30.js";
import { AIBinaryReflex } from "./PulseAIReflex-v30.js";
import { AIBinaryScheduler } from "./PulseAIScheduler-v30.js";
import { AIBinaryOrganRegistry } from "./PulseAIBinaryOrganRegistry-v30.js";
import { AIBinaryEvolution } from "./PulseAIBinaryEvolution-v30.js";

import { createPulseAIChunkerV40 as createPulseAIChunker } from "./PULSE-AI-CHUNKER.js";

// Mesh / organism subsystems (v24–v30 IMMORTAL++)
import { createBinaryMeshEnvironment } from "../PULSE-MESH/PULSE-MESH-BINARY.js";
import { createPulseMeshImmuneSystem } from "../PULSE-MESH/PulseMeshImmuneSystem-v30.js";
import { createPulseMeshWiring } from "../PULSE-MESH/PulseMeshEvolutionaryWiring-v30.js";
import { PulseMeshCognition, getCognitionSnapshot} from "../PULSE-MESH/PulseMeshCognition-v30.js";
import { createPulseHalo } from "../PULSE-MESH/PulseMeshAwareness-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  GLOBAL ORGANISM ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ============================================================================
const _globalOrganismArteryRegistry = new Map();

export function getGlobalOrganismArteries() {
  const out = {};
  for (const [k, v] of _globalOrganismArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

function _registryKey(id) {
  return `${id || "binary-organism"}#0`;
}


// ============================================================================
//  KERNEL-LEVEL CHUNKER (32-LANE, NON-MIND)
// ============================================================================
const kernelChunker = createPulseAIChunker({
  id: "PulseAIChunker-OrganismKernel",
  defaultChunkSize: 4096,
  maxChunkSize: 65536,
  trace: false
});

kernelChunker.prewarmPattern("genome", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: "binary"
});

kernelChunker.prewarmPattern("artery", {
  defaultChunkSize: 2048,
  maxChunkSize: 16384,
  band: "symbolic"
});

kernelChunker.prewarmPattern("readiness", {
  defaultChunkSize: 1024,
  maxChunkSize: 8192,
  band: "symbolic"
});

// ============================================================================
//  BINARY ORGANISM PREWARM ENGINE — v30 IMMORTAL+++
// ============================================================================
export function prewarmBinaryOrganism(config = {}) {
  try {
    const { trace = false } = config;

    const warmAgent = new AIBinaryAgent({
      id: "prewarm-agent",
      maxBits: 2048,
      trace
    });

    warmAgent.encode("prewarm");
    warmAgent.decode(warmAgent.encode("prewarm"), "string");

    const warmMemory = new AIMemory({
      id: "prewarm-memory",
      maxBits: 4096,
      trace
    });

    const k = warmAgent.encode("prewarm-key");
    const v = warmAgent.encode("prewarm-value");

    warmMemory.write(k, v);
    warmMemory.read(k);
    warmMemory.listKeys();

    const warmRegistry = new AIBinaryOrganRegistry({
      id: "prewarm-registry",
      encoder: warmAgent,
      memory: warmMemory,
      trace
    });

    const warmEvolution = new AIBinaryEvolution({
      id: "prewarm-evolution",
      encoder: warmAgent,
      memory: warmMemory,
      trace
    });

    warmEvolution.generateSignature({
      id: "prewarm-organ",
      constructor: { name: "PrewarmOrgan" }
    });

    warmRegistry.registerOrgan({
      id: "prewarm-organ",
      constructor: { name: "PrewarmOrgan" }
    });

    const warmAnatomy = new AIBinaryAnatomy({
      id: "prewarm-anatomy",
      encoder: warmAgent,
      memory: warmMemory,
      trace
    });

    warmAnatomy.registerOrgan("prewarm-organ");
    warmAnatomy.store();

    const warmGenome = new AIBinaryGenome({
      id: "prewarm-genome",
      encoder: warmAgent,
      registry: warmRegistry,
      evolution: warmEvolution,
      memory: warmMemory,
      trace
    });

    warmGenome.storeGenome();

    const warmReflex = new AIBinaryReflex({ id: "prewarm-reflex", trace });
    const warmPipeline = new AIBinaryPipeline({ id: "prewarm-pipeline", trace });

    const warmScheduler = new AIBinaryScheduler({
      id: "prewarm-scheduler",
      encoder: warmAgent,
      pipeline: warmPipeline,
      reflex: warmReflex,
      trace
    });

    warmScheduler.tick();

    const warmVitals = new AIBinaryVitals({
      id: "prewarm-vitals",
      encoder: warmAgent,
      memory: warmMemory,
      evolution: warmEvolution,
      trace
    });

    const warmMetabolism = new AIBinaryMetabolism({
      id: "prewarm-metabolism",
      encoder: warmAgent,
      pipeline: warmPipeline,
      scheduler: warmScheduler,
      vitals: warmVitals,
      trace
    });

    const warmSentience = new AIBinarySentience({
      id: "prewarm-sentience",
      encoder: warmAgent,
      anatomy: warmAnatomy,
      genome: warmGenome,
      immunity: null,
      vitals: warmVitals,
      registry: warmRegistry,
      trace
    });

    const warmHormones = new AIBinaryHormones({
      id: "prewarm-hormones",
      encoder: warmAgent,
      metabolism: warmMetabolism,
      sentience: warmSentience,
      trace
    });

    const warmConsciousness = new AIBinaryConsciousness({
      id: "prewarm-consciousness",
      encoder: warmAgent,
      sentience: warmSentience,
      metabolism: warmMetabolism,
      hormones: warmHormones,
      vitals: warmVitals,
      anatomy: warmAnatomy,
      immunity: null,
      trace
    });

    warmConsciousness.generateConsciousnessPacket();

    kernelChunker.chunkJSON(
      {
        id: "prewarm-organism",
        registryCount: warmRegistry.count() ?? 0
      },
      { label: "artery", band: "symbolic" }
    );

    return true;
  } catch (err) {
    console.error("[BinaryOrganism Prewarm] Failed:", err);
    return false;
  }
}

// ============================================================================
//  ORGANISM ARTERY SNAPSHOT — v30 IMMORTAL+++
//  (now enriched with BinaryMesh, Halo, and Mesh Cognition)
// ============================================================================
function computeOrganismArtery({
  registry,
  anatomy,
  genome,
  memory,
  scheduler,
  consciousness,
  binaryMeshEnv,
  halo,
  cognitionSnapshot
}) {
  const registryCount = registry.count() ?? 0;
  const anatomyCount = anatomy.count() ?? 0;
  const memorySize = memory.size() ?? 0;

  const binaryMeshArtery =
    binaryMeshEnv.binaryMesh.getBinaryMeshArtery
      ? binaryMeshEnv.binaryMesh.getBinaryMeshArtery()
      : null;

  const haloStatus = halo.status ? halo.status() : null;

  const artery = Object.freeze({
    timestamp: PulseRealm.PulseNOW, // symbolic, kernel-level
    kernel: {
      id: "pulse-touch",
      version: (PulseRealm.PULSE_TOUCH_VERSION) || "v0",
      layer: "touch",
      role: "pulse-touch"
    },
    counts: {
      registry: registryCount,
      anatomy: anatomyCount
    },
    hashes: {
      genome: genome.hash() ?? null,
      consciousness: consciousness.hash() ?? null
    },
    memory: {
      footprint: memorySize,
      bucket: memorySize > 8192 ? "high" : "medium"
    },
    scheduler: {
      state: scheduler.state() ?? null
    },
    buckets: {
      registry: registryCount > 32 ? "high" : "medium"
    },
    organism: {
      sealed: true,
      daemonOriented: true,
      portalCompatible: true,
      bridgeCompatible: true
    },

    // v30 IMMORTAL+++ extensions
    binaryMesh: {
      artery: binaryMeshArtery
    },

    halo: haloStatus,

    meshCognition: cognitionSnapshot || null
  });

  const key = _registryKey("binary-organism");
  _globalOrganismArteryRegistry.set(key, artery);

  return artery;
}

// ============================================================================
//  createBinaryOrganism() — v30 IMMORTAL+++
// ============================================================================
export function createBinaryOrganism({
  trace = false,
  nodeAdminReporter = null,
  overmindReporter = null,
  meshContext = {}
} = {}) {
  prewarmBinaryOrganism({ trace });

  const encoder = new AIBinaryAgent({
    id: "ai-binary-agent",
    maxBits: 4096,
    trace
  });

  const memory = new AIMemory({
    id: "ai-binary-memory",
    maxBits: 16384,
    trace,
    nodeAdminReporter,
    overmindReporter
  });

  const registry = new AIBinaryOrganRegistry({
    id: "ai-binary-organ-registry",
    encoder,
    memory,
    trace
  });

  const evolution = new AIBinaryEvolution({
    id: "ai-binary-evolution",
    encoder,
    memory,
    trace
  });

  const immunity = new AIBinaryImmunity({
    id: "ai-binary-immunity",
    encoder,
    registry,
    evolution,
    memory,
    trace
  });

  const anatomy = new AIBinaryAnatomy({
    id: "ai-binary-anatomy",
    encoder,
    memory,
    trace
  });

  const vitals = new AIBinaryVitals({
    id: "ai-binary-vitals",
    encoder,
    memory,
    evolution,
    trace
  });

  const genome = new AIBinaryGenome({
    id: "ai-binary-genome",
    encoder,
    registry,
    evolution,
    memory,
    trace
  });

  const reflex = new AIBinaryReflex({
    id: "ai-binary-reflex",
    trace
  });

  const pipeline = new AIBinaryPipeline({
    id: "ai-binary-pipeline",
    trace
  });

  const scheduler = new AIBinaryScheduler({
    id: "ai-binary-scheduler",
    encoder,
    pipeline,
    reflex,
    trace
  });

  const metabolism = new AIBinaryMetabolism({
    id: "ai-binary-metabolism",
    encoder,
    pipeline,
    scheduler,
    vitals,
    trace
  });

  const sentience = new AIBinarySentience({
    id: "ai-binary-sentience",
    encoder,
    anatomy,
    genome,
    immunity,
    vitals,
    registry,
    trace
  });

  const hormones = new AIBinaryHormones({
    id: "ai-binary-hormones",
    encoder,
    metabolism,
    sentience,
    trace
  });

  const consciousness = new AIBinaryConsciousness({
    id: "ai-binary-consciousness",
    encoder,
    sentience,
    metabolism,
    hormones,
    vitals,
    anatomy,
    immunity,
    trace
  });

  const organs = {
    encoder,
    memory,
    registry,
    evolution,
    immunity,
    anatomy,
    vitals,
    genome,
    pipeline,
    reflex,
    scheduler,
    metabolism,
    sentience,
    hormones,
    consciousness
  };

  for (const [, organ] of Object.entries(organs)) {
    if (!organ || !organ.id) continue;
    registry.registerOrgan(organ);
    anatomy.registerOrgan(organ.id);
  }

  anatomy.connect(metabolism.id, hormones.id);
  anatomy.connect(hormones.id, consciousness.id);
  anatomy.connect(sentience.id, consciousness.id);
  anatomy.connect(vitals.id, metabolism.id);

  anatomy.store();
  genome.storeGenome();

  // --------------------------------------------------------------------------
  // Mesh / BinaryMesh / Halo / Cognition wiring (v30 IMMORTAL+++)
  // --------------------------------------------------------------------------
  const log = meshContext.log || console.log.bind(console);
  const warn = meshContext.warn || console.warn.bind(console);
  const error = meshContext.error || console.error.bind(console);

  // BinaryMesh environment (binary connective tissue + symbolic mesh env)
  const binaryMeshEnv = createBinaryMeshEnvironment({
    context: {
      ...meshContext,
      log,
      warn,
      error
    },
    trace: meshContext.trace ?? false,
    maxBitsLength: meshContext.maxBitsLength ?? 64,
    defaultBand: "binary",
    defaultPresenceTag: "BinaryMesh-v30"
  });

  // Halo awareness ring
  const halo = createPulseHalo({ log, warn, error });

  // Mesh wiring organ (for GPU/Earn/OS/Mesh wiring surfaces)
  const meshWiring = createPulseMeshWiring({ log });

  // Mesh immune system commander (symbolic mesh immune commander)
  const meshImmuneCommander = createPulseMeshImmuneSystem({
    PulseImmunity: immunity, // reuse binary immunity meta as engine
    GPUHealer: meshContext.GPUHealer,
    RouteResponder: meshContext.RouteResponder,
    OFFLINE_MODE: meshContext.OFFLINE_MODE ?? false,
    log,
    warn,
    error
  });

  // Cognition store is already global via PulseMeshCognition; we just expose snapshot
  const cognitionSnapshot = getCognitionSnapshot();

  // --------------------------------------------------------------------------
  // Unified organism artery (binary organism + mesh + halo + cognition)
// --------------------------------------------------------------------------
  const artery = computeOrganismArtery({
    registry,
    anatomy,
    genome,
    memory,
    scheduler,
    consciousness,
    binaryMeshEnv,
    halo,
    cognitionSnapshot
  });

  const arteryChunks = kernelChunker.chunkJSON(artery, {
    label: "artery",
    band: "symbolic"
  });

  const touch = (PulseRealm.__PULSE_TOUCH__ || {});

  if (nodeAdminReporter) {
    try {
      nodeAdminReporter(artery, {
        id: "pulse-touch",
        version: touch.version || "v0",
        layer: "touch",
        role: "pulse-touch"
      });
    } catch {}
  }

  if (overmindReporter) {
    try {
      overmindReporter(artery, {
        id: "pulse-touch",
        version: touch.version || "v0",
        layer: "touch",
        role: "pulse-touch"
      });
    } catch {}
  }

  const readiness = Object.freeze({
    meta: {
      layer: "BinaryOrganismReadiness",
      role: "READINESS_SURFACE",
      version: "30.0-IMMORTAL+++",
      evo: {
        deterministic: true,
        driftProof: true,
        zeroMutation: true,
        zeroSecrets: true,
        sealedOrganism: true,
        daemonOriented: true,
        haloAware: true,
        binaryMeshAware: true,
        meshCognitionAware: true
      }
    },

    registryCount: registry.count() ?? null,
    anatomyCount: anatomy.count() ?? null,
    genomeHash: genome.hash() ?? null,
    consciousnessHash: consciousness.hash() ?? null,
    memoryFootprint: memory.size() ?? null,
    schedulerState: scheduler.state() ?? null,

    artery,
    arteryChunks,
    prewarmed: true
  });

  return {
    context: PulseRealm.OrganismContext,
    ...organs,
    artery,
    arteryChunks,
    readiness,
    chunker: kernelChunker,

    // v30 IMMORTAL+++ surfaces
    binaryMeshEnv,
    halo,
    meshWiring,
    meshImmuneCommander,
    meshCognitionSnapshot: cognitionSnapshot
  };
}

// ============================================================================
//  AIDualbandOrganismBootloader — v30 IMMORTAL+++
// ============================================================================
export async function AIDualbandOrganismBootloader(options = {}) {
  const organism = createBinaryOrganism(options);
  return Object.freeze({
    ...organism,
    bootVersion: "v30.0-IMMORTAL+++"
  });
}

// ============================================================================
//  bootBinaryOrganism() — v30 IMMORTAL+++
// ============================================================================
export async function bootBinaryOrganism(options = {}) {
  const organism = await AIDualbandOrganismBootloader(options);

  const firstConsciousness =
    organism.consciousness.generateConsciousnessPacket
      ? organism.consciousness.generateConsciousnessPacket()
      : null;

  return {
    ...organism,
    firstConsciousness
  };
}

// ============================================================================
//  DEFAULT EXPORT — DUALBAND ORGANISM KERNEL SURFACE (v30 IMMORTAL+++)
// ============================================================================
const PulseOrganismBoot = {
  organism: {
    id: "pulse-touch",
    version: (PulseRealm.PULSE_TOUCH_VERSION) || "v0",
    layer: "touch",
    role: "pulse-touch"
  },

  create: createBinaryOrganism,
  boot: bootBinaryOrganism,
  getGlobalOrganismArteries,
  chunker: kernelChunker
};

export default PulseOrganismBoot;
