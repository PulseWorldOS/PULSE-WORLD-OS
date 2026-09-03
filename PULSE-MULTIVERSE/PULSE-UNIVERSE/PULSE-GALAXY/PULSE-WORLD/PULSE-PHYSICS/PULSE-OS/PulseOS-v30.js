// ============================================================================
//  PulseOS-v30-IMMORTAL-Spine-Symbolic++++.js
//  SYMBOLIC ORGANISM KERNEL — IMMORTAL CORTEX / DUAL-MODE / MESH-AWARE (v30+++)
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
import { PulseOSBrain } from "./PulseOSBrain-v30.js";
import { PulseOSEvolution } from "./PulseOSBrainEvolution-v30.js";
import { PulseOSSpinalCord, createPulseOSSpinalCord } from "./PulseOSSpinalCord-v30.js";
import { PulseOSOrganMembrane } from "./PulseOSOrganMembrane-v30.js";
import { PulseOSTissueMembrane } from "./PulseOSTissueMembrane-v30.js";
import { PulseOSMucusMembrane } from "./PulseOSMucusMembrane-v30.js";
import { PulseOSMemory } from "./PulseOSLiverMemory-v30.js";
import { PulseOSSurvivalInstincts } from "./PulseOSSurvivalInstincts-v30.js";
import { PulseOSThymus } from "./PulseOSThymus-v30.js";
import { PulseOSPresence } from "./PulseOSPresence-v30.js";

import { createPulseMeshPresenceRelay as PulseMeshPresence} from "../PULSE-MESH/PRESENCE/PulseMeshPresenceRelay-v30.js";

import { createBinaryMeshEnvironment} from "../PULSE-MESH/PULSE-MESH-BINARY.js";

import { createOrganismMesh } from "../PULSE-MESH/PulseMeshOrganism-v30.js";

import { PulseExpansion, PulseExpansionMeta} from "../PULSE-EXPANSION/PULSE-EXPANSION-WORLD.js";

// ============================================================================
//  GLOBAL SYMBOLIC OS CONTEXT — v30 IMMORTAL++++
// ============================================================================
const PULSE_OS_CONTEXT =
  PulseRealm.PULSE_OS_CONTEXT
    ? PulseRealm.PULSE_OS_CONTEXT
    : {
        region: "unknown",
        build: "dev",
        epoch: "v30-IMMORTAL++++"
      };

// IMMORTAL identity meta (Pulse ID spine)
const IDENTITY_META = {
  version: "v70-IMMORTAL",
  organism: "PulseOS",
  realm: "browser",
  uid: () =>
    PulseRealm.crypto?.randomUUID?.() ||
    ("pulse-" + Math.random().toString(36).slice(2)),
  timestamp: () => PulseRealm.PulseNOW,
  signature: "PulseOSKernel-IMMORTAL"
};
// ============================================================================
//  GOVERNED EXECUTION — SYMBOLIC SHELL (v70 IMMORTAL)
// ============================================================================
async function runThroughGovernor(organName, pulseOrImpulse, fn) {
  // Normalize pulse so governor never breaks
  const pulse = pulseOrImpulse || {
    pulseId: IDENTITY_META.uid(),
    meta: {}
  };

  // Execute through organ guard (correct usage)
  const guardResult = await withOrganGuard(
    organName,
    pulse,
    async (instanceContext = {}) => {
      const result = await fn(instanceContext);

      // ---------------------------------------------------------------------
      //  DIAGNOSTICS WRITE (IMMORTAL-SAFE)
      // ---------------------------------------------------------------------
      try {
        const timestamp = PulseRealm.PulseNOW;
        const docId = `${organName}-${timestamp}`;

        const safe = {
          organ: organName,
          timestamp,
          pulseId:
            instanceContext.pulseId ||
            pulse.pulseId ||
            IDENTITY_META.uid(),

          personaId: instanceContext.personaId || null,
          boundaries: instanceContext.boundaries || null,
          permissions: instanceContext.permissions || null,

          trace: Array.isArray(instanceContext.trace)
            ? [...instanceContext.trace]
            : [],

          diagnostics: instanceContext.diagnostics || null,
          result
        };

        const diagnosticsWriter =
          instanceContext.organs &&
          instanceContext.organs.diagnosticsWrite &&
          instanceContext.organs.diagnosticsWrite.writeRun;

        if (typeof diagnosticsWriter === "function") {
          await diagnosticsWriter({ docId, payload: safe });
        }
      } catch (err) {
        console.warn(
          "[PulseOSGovernor IMMORTAL] Diagnostics write failed:",
          err
        );
      }

      return result;
    }
  );

  return guardResult;
}

// ============================================================================
//  KERNEL BOOTSTRAP — SYMBOLIC OS BOOT
// ============================================================================
async function _buildPulseOSKernel() {
  const Evolution =
    typeof PulseOSEvolution.PulseOSEvolution === "function"
      ? PulseOSEvolution.PulseOSEvolution({ understanding: PULSE_OS_CONTEXT })
      : PulseOSEvolution;

  const Brain =
    typeof PulseOSBrain.PulseOSBrain === "function"
      ? PulseOSBrain.PulseOSBrain()
      : PulseOSBrain;

  // Pulse ID from Brain or identity meta
  const pulseId =
    (Brain && Brain.IdentityDirectory && Brain.IdentityDirectory.pulseId) ||
    IDENTITY_META.uid();

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

  const meta = {
    ...PULSE_OS_CONTEXT,
    pulseId,
    identity: {
      version: IDENTITY_META.version,
      organism: IDENTITY_META.organism,
      realm: IDENTITY_META.realm,
      uid: pulseId,
      timestamp: IDENTITY_META.timestamp(),
      signature: IDENTITY_META.signature
    }
  };

  let PresenceField = null;
  if (PulseOSPresence.buildPresenceField) {
    PresenceField = PulseOSPresence.buildPresenceField({
      Brain,
      Evolution,
      SpinalCord,
      meta
    });
  } else if (PulseOSPresence.PulseOSPresence) {
    PresenceField = PulseOSPresence.PulseOSPresence({
      Brain,
      Evolution,
      SpinalCord,
      meta
    });
  }

  let MeshPresenceRelay = null;
  try {
    if (PulseMeshPresence && typeof PulseMeshPresence.create === "function") {
      MeshPresenceRelay = PulseMeshPresence.create({
        MeshBus: SpinalCord.MeshBus,
        SystemClock: Brain.SystemClock,
        IdentityDirectory: Brain.IdentityDirectory,
        log: Brain.log,
        warn: Brain.warn,
        error: Brain.error
      });
    }
  } catch (e) {
    warn("[PulseOSKernel] MeshPresenceRelay init failed:", e);
    MeshPresenceRelay = null;
  }

  let BinaryMeshEnv = null;
  try {
    if (typeof PulseRealm.PulseMeshBinaryEnvironment === "function") {
      BinaryMeshEnv = PulseRealm.PulseMeshBinaryEnvironment({
        context: {
          meta,
          Brain,
          Evolution,
          SpinalCord,
          PresenceField,
          MeshPresenceRelay,
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
          PresenceField,
          MeshPresenceRelay,
          MeshBus: SpinalCord.MeshBus,
          SystemClock: Brain.SystemClock,
          IdentityDirectory: Brain.IdentityDirectory
        },
        trace: false
      });
    }
  } catch (e) {
    warn("[PulseOSKernel] BinaryMeshEnv init failed:", e);
    BinaryMeshEnv = null;
  }

  let OrganismMeshRoot = null;
  try {
    if (typeof PulseRealm.PulseMeshOrganism === "function") {
      OrganismMeshRoot = PulseRealm.PulseMeshOrganism({
        context: {
          meta,
          Brain,
          Evolution,
          SpinalCord,
          PresenceField,
          MeshPresenceRelay,
          MeshBus: SpinalCord.MeshBus,
          SystemClock: Brain.SystemClock,
          IdentityDirectory: Brain.IdentityDirectory
        },
        symbolicMeshEnv: BinaryMeshEnv,
        binaryMeshEnv: BinaryMeshEnv,
        trace: false
      });
    } else if (typeof createOrganismMesh === "function" && BinaryMeshEnv) {
      OrganismMeshRoot = createOrganismMesh({
        context: {
          meta,
          Brain,
          Evolution,
          SpinalCord,
          PresenceField,
          MeshPresenceRelay,
          MeshBus: SpinalCord.MeshBus,
          SystemClock: Brain.SystemClock,
          IdentityDirectory: Brain.IdentityDirectory
        },
        symbolicMeshEnv: BinaryMeshEnv,
        binaryMeshEnv: BinaryMeshEnv,
        trace: false
      });
    }
  } catch (e) {
    warn("[PulseOSKernel] OrganismMeshRoot init failed:", e);
    OrganismMeshRoot = null;
  }

  return {
    meta,
    Brain,
    Evolution,
    SDN: SpinalCord,
    PresenceField,
    MeshPresenceRelay,
    BinaryMeshEnv,
    OrganismMeshRoot,
    Governed: { run: runThroughGovernor }
  };
}

// ============================================================================
//  PAGE-LEVEL INTEGRATION SURFACE (NEW)
// ============================================================================
try {
  const integratedSymbolicModules = {
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
    PulseMeshPresence,
    createBinaryMeshEnvironment,
    createOrganismMesh,
    PulseExpansion,
    PulseExpansionMeta
  };

  PulseRealm.PulseOSImports = PulseRealm.PulseOSImports
    ? Object.freeze({ ...PulseRealm.PulseOSImports, ...integratedSymbolicModules })
    : Object.freeze(integratedSymbolicModules);
} catch (_) {}

// ============================================================================
//  EXPORTS — SYMBOLIC KERNEL SURFACE
// ============================================================================
export const PulseOSv30Immortal = {
  ...PULSE_OS_CONTEXT,
  Kernel: _buildPulseOSKernel,
  runThroughGovernor
};

export const PulseOSKernel = _buildPulseOSKernel;

export default PulseOSv30Immortal;

PulseRealm.PulseOS = _buildPulseOSKernel;
PulseRealm.PulseOSKernel = _buildPulseOSKernel;
