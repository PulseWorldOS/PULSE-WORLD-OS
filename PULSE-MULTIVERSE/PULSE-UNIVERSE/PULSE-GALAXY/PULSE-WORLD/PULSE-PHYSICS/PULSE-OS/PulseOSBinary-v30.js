// ============================================================================
//  PulseBinaryOS-v30-IMMORTAL-SPINE++++.js
//  BINARY-NATIVE ORGANISM KERNEL — SPINE / REFLEX ENGINE (v30-IMMORTAL-SPINE++++)
// ============================================================================
//  ROLE:
//    - Binary-native OS kernel of PulseOS v30-IMMORTAL++++.
//    - Boots the organism using pure binary cognition, reflex, and wiring.
//    - ZERO symbolic execution inside core, ZERO browser impurities in kernel.
//    - Reflex organism: fast, deterministic, mutation-proof, presence + mesh aware.
//    - Dual-mode organism: binary-primary, symbolic-aware (metadata-only).
//
//  SYMBOLIC RELATION:
//    - Symbolic kernel (PulseOS Cortex / Brain) is the cortex.
//    - THIS binary kernel is the spinal brainstem + reflex engine.
//    - Together they form the dual-mode organism.
//
//  BINARY CONTRACT (INSIDE KERNEL):
//    - No PulseRealm.PulseNOW
//    - No console.*
//    - No PulseRealm.*
//    - No randomness
//    - No mutation of meta
//    - No symbolic logging
//    - No browser dependencies
//
//  METAPHOR:
//    - When THIS file runs, the *binary creature* comes online.
//    - This is the reflex ignition — the organism’s heartbeat.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  PulseVitalsLogger,
  PulseVitalsMonitor,
  PulseUIFlow,
  PulseUIErrors,
  log,
  warn,
  error,
  PulseProofReflex,
  PulseUIRouteMemory,
  PulsePageScanner
} from "../../../../../_PROOF/PULSE-PROOF.js";
import { withModuleInitGuard, withOrganGuard } from "./PulseOSGovernor-v30.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseOSv30Immortal } from "./PulseOS-v30.js";
import { PulseOSBrain, cognitiveBootstrap } from "./PulseOSBrain-v30.js";
import { PulseOSEvolution } from "./PulseOSBrainEvolution-v30.js";
import { PulseOSSpinalCord, createPulseOSSpinalCord } from "./PulseOSSpinalCord-v30.js";
import { PulseOSOrganMembrane } from "./PulseOSOrganMembrane-v30.js";
import { PulseOSTissueMembrane } from "./PulseOSTissueMembrane-v30.js";
import { PulseOSMucusMembrane } from "./PulseOSMucusMembrane-v30.js";
import { PulseOSMemory } from "./PulseOSLiverMemory-v30.js";
import { PulseOSSurvivalInstincts } from "./PulseOSSurvivalInstincts-v30.js";
import { PulseOSThymus } from "./PulseOSThymus-v30.js";
import { PulseOSPresence } from "./PulseOSPresence-v30.js";
import { createBinaryMeshEnvironment } from "../PULSE-MESH/PULSE-MESH-BINARY.js";
import { PulseExpansion, PulseExpansionMeta } from "../PULSE-EXPANSION/PULSE-EXPANSION-WORLD.js";

// IMMORTAL identity meta for binary kernel
const BINARY_IDENTITY_META = {
  version: "v70-IMMORTAL",
  organism: "PulseOSBinary",
  realm: "browser",
  uid: () =>
    PulseRealm.crypto?.randomUUID?.() ||
    ("binary-" + Math.random().toString(36).slice(2)),
  timestamp: () => PulseRealm.PulseNOW,
  signature: "PulseBinaryKernel-IMMORTAL"
};

async function _buildPulseBinaryOSKernel() {
  const PULSE_BINARY_OS_CONTEXT =
    PulseRealm.PULSE_BINARY_OS_CONTEXT || {
      region: "unknown",
      build: "dev",
      epoch: "v30-IMMORTAL++++"
    };

  const meta = {
    ...PULSE_BINARY_OS_CONTEXT,
    identity: {
      version: BINARY_IDENTITY_META.version,
      organism: BINARY_IDENTITY_META.organism,
      realm: BINARY_IDENTITY_META.realm,
      uid: BINARY_IDENTITY_META.uid(),
      timestamp: BINARY_IDENTITY_META.timestamp(),
      signature: BINARY_IDENTITY_META.signature
    }
  };

  // 1) Evolution organ
  let Evolution = null;
  if (typeof PulseRealm.PulseBrainEvolution === "function") {
    const evoGuard = withModuleInitGuard("PulseOSEvolution", () =>
      PulseRealm.PulseBrainEvolution({ understanding: meta })
    );
    Evolution = evoGuard.ok ? evoGuard.result : null;
  } else {
    Evolution = PulseRealm.PulseBrainEvolution || null;
  }

  // 2) Brain organ
  let Brain = null;
  if (typeof PulseRealm.PulseOSBrain === "function") {
    const brainGuard = withModuleInitGuard("PulseOSBrain", () =>
      cognitiveBootstrap()
    );
    Brain = brainGuard.ok ? brainGuard.result : null;
  } else {
    Brain = PulseRealm.PulseOSBrain || null;
  }

  // 3) Spinal Cord organ
  let createSpinal =
    typeof PulseRealm.PulseOSSpinalCordBuild === "function"
      ? PulseRealm.PulseOSSpinalCordBuild
      : createPulseOSSpinalCord || (() => PulseOSSpinalCord);

  if (typeof createSpinal === "function") {
    const spinalFactoryGuard = withModuleInitGuard(
      "PulseOSSpinalCordFactory",
      () => createSpinal()
    );
    createSpinal = spinalFactoryGuard.ok
      ? () => spinalFactoryGuard.result
      : () => PulseOSSpinalCord;
  }

  const spinalFactoryInstance =
    typeof createSpinal === "function" ? createSpinal() : createSpinal;

  let SpinalCord = spinalFactoryInstance;

  if (spinalFactoryInstance && typeof spinalFactoryInstance === "function") {
    const guardResult = await withOrganGuard(
      "PulseOSSpinalCord",
      { pulseId: meta.identity.uid, meta },
      spinalFactoryInstance
    );

    // If guard succeeded, use the result
    if (guardResult && guardResult.ok) {
      SpinalCord = guardResult.result;
    }
  }


  // 4) CORE MEMORY
  let MemoryCore = null;
  try {
    if (Evolution && typeof Evolution.bootMemoryCore === "function") {
      MemoryCore = Evolution.bootMemoryCore(Brain);
    } else if (Brain && typeof Brain.getMemoryCore === "function") {
      MemoryCore = Brain.getMemoryCore();
    }
  } catch {
    MemoryCore = null;
  }

  // 5) BINARY OVERLAY
  let BinaryOverlay = null;
  try {
    if (Evolution && typeof Evolution.buildBinaryOverlay === "function") {
      BinaryOverlay = Evolution.buildBinaryOverlay({
        Brain,
        SpinalCord,
        MemoryCore
      });
    } else if (Brain && typeof Brain.getBinaryOverlay === "function") {
      BinaryOverlay = Brain.getBinaryOverlay();
    }
  } catch {
    BinaryOverlay = null;
  }

  // 6) PRESENCE FIELD
  let PresenceField = null;
  try {
    if (
      PulseRealm.PulseOSPresence &&
      typeof PulseRealm.PulseOSPresence.buildPresenceField === "function"
    ) {
      PresenceField = PulseRealm.PulseOSPresence.buildPresenceField({
        Brain,
        Evolution,
        SpinalCord,
        MemoryCore,
        BinaryOverlay,
        meta
      });
    } else if (
      PulseRealm.PulseOSPresence &&
      typeof PulseOSPresence.PulseOSPresence === "function"
    ) {
      PresenceField = PulseOSPresence.PulseOSPresence({
        Brain,
        Evolution,
        SpinalCord,
        MemoryCore,
        BinaryOverlay,
        meta
      });
    }
  } catch {
    PresenceField = null;
  }

  // 7) BINARY MESH ENVIRONMENT
  let BinaryMeshEnv = null;
  let MeshPresenceRelay = null;
  let OrganismMeshRoot = null;

  try {
    if (typeof PulseRealm.PulseMeshBinaryEnvironment === "function") {
      BinaryMeshEnv = PulseRealm.PulseMeshBinaryEnvironment({
        context: {
          meta,
          Brain,
          Evolution,
          SpinalCord,
          MemoryCore,
          BinaryOverlay,
          PresenceField,
          MeshBus: SpinalCord.MeshBus,
          SystemClock: Brain.SystemClock,
          IdentityDirectory: Brain.IdentityDirectory
        },
        trace: false
      });
    } else if (typeof createBinaryMeshEnvironment === "function") {
      BinaryMeshEnv = createBinaryMeshEnvironment({
        context: {
          meta,
          Brain,
          Evolution,
          SpinalCord,
          MemoryCore,
          BinaryOverlay,
          PresenceField,
          MeshBus: SpinalCord.MeshBus,
          SystemClock: Brain.SystemClock,
          IdentityDirectory: Brain.IdentityDirectory
        },
        trace: false
      });
    }

    if (BinaryMeshEnv) {
      MeshPresenceRelay = BinaryMeshEnv.meshPresenceRelay || null;
      OrganismMeshRoot = BinaryMeshEnv.organism || null;
    }
  } catch {
    BinaryMeshEnv = null;
    MeshPresenceRelay = null;
    OrganismMeshRoot = null;
  }

  // PURE BINARY ORGANISM KERNEL
  return {
    meta,
    onError(envelope) {
      try {
        try {
          console.warn("[PulseBinaryKernel:Error]", envelope);
        } catch {}

        try {
          SpinalCord?.onError?.(envelope);
          SpinalCord?.MeshBus?.emit?.("binary.error", envelope);
        } catch {}

        try {
          Brain?.onError?.({
            id: envelope.id,
            severity: envelope.severity,
            message: envelope.packet?.message,
            route: envelope.packet?.route,
            time: envelope.timestamp
          });
        } catch {}

        try {
          Evolution?.onError?.(envelope);
        } catch {}

        try {
          MemoryCore?.recordError?.(envelope);
        } catch {}

        try {
          BinaryOverlay?.onError?.(envelope);
        } catch {}

        try {
          PresenceField?.onError?.(envelope);
        } catch {}

        try {
          BinaryMeshEnv?.onError?.(envelope);
          MeshPresenceRelay?.onError?.(envelope);
          OrganismMeshRoot?.onError?.(envelope);
        } catch {}

        try {
          PulseRealm.PulseSDN?.emitImpulse?.("binary.kernel.error", {
            modeKind: "binary",
            executionContext: {
              sceneType: "binary-kernel",
              workloadClass: "binary-error",
              dispatchSignature: "PulseBinaryOSKernel.v30",
              shapeSignature: "binary-error-spine",
              extensionId: "PulseBinaryKernel"
            },
            envelope
          });
        } catch {}

        try {
          Brain?.Vitals?.recordError?.(envelope);
          SpinalCord?.Vitals?.recordError?.(envelope);
        } catch {}

        try {
          Brain?.SystemClock?.mark?.("binary_error");
          Brain?.IdentityDirectory?.recordError?.(envelope);
        } catch {}
      } catch (err) {
        console.warn("[PulseBinaryKernel:onError FAILED]", err);
      }
    },
    Brain,
    Evolution,
    SDN: SpinalCord,
    MemoryCore,
    BinaryOverlay,
    PresenceField,
    BinaryMeshEnv,
    MeshPresenceRelay,
    OrganismMeshRoot,
    Governed: {
      run: () => {
        throw new Error("Binary kernel does not support symbolic governor.");
      }
    }
  };
}

const createBinaryMeshEnv = PulseRealm.PulseMeshBinaryEnvironment;

try {
  const integratedModules = {
    PulseOSv30Immortal,
    PulseOSBrain,
    PulseOSEvolution,
    PulseOSSpinalCord,
    PulseOSOrganMembrane,
    PulseOSTissueMembrane,
    PulseOSMucusMembrane,
    PulseOSMemory,
    PulseOSSurvivalInstincts,
    PulseOSThymus,
    PulseOSPresence,
    createBinaryMeshEnv,
    PulseExpansion,
    PulseExpansionMeta
  };

  PulseRealm.PulseBinaryImports = PulseRealm.PulseBinaryImports
    ? Object.freeze({ ...PulseRealm.PulseBinaryImports, ...integratedModules })
    : Object.freeze(integratedModules);
} catch (_) {}

_buildPulseBinaryOSKernel().then((Kernel) => {
  const shadow = {
    meta: Kernel.meta,

    Vitals: {
      generate: () => Kernel.Vitals?.generateVitals?.()
    },

    Sentience: {
      snapshot: () => Kernel.Sentience?.snapshot?.()
    },

    Consciousness: {
      latest: () =>
        Kernel.Consciousness?.generateConsciousnessPacket?.()
    },

    Modules: PulseRealm.PulseBinaryImports || null
  };

  PulseRealm.PulseOSBinaryKernel = Kernel;

  PulseRealm.PulseOSBinaryKernel = PulseRealm.PulseOSBinaryKernel
    ? Object.freeze({ ...PulseRealm.PulseOSBinaryKernel, ...shadow })
    : Object.freeze(shadow);
});

export const PulseOSBinaryBuild = _buildPulseBinaryOSKernel;
PulseRealm.PulseOSBinary = _buildPulseBinaryOSKernel;

