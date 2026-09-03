// ============================================================================
//  PulseNetUnderstanding-v33-ImmortalHyperFrame.js — v33-IMMORTAL++ HYPERFRAME
//  Cortical Opener • Symbolic Kernel Loader • Binary Shadow Integrator
//  Deterministic Brainstem • Runtime/Scheduler/Substrate Unifier
//  v33: Compiler v33 integration • Page-aware compile pipeline
//       Multi-artifact world/runtime/exec awareness
//       Full-page compile payload back to caller
// ============================================================================
// ============================================================================
//  IMPORTS — BRIDGE / LOGGER
// ============================================================================

import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { pulseband } from "../PULSE-BAND/PULSE-BAND.js";
import { PulseWorldEndpoint } from "../../../../../_CREATION_BARRIER/PULSE-BOOT-USERENDPOINT.js";
import { createBinarySendV30 as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v30.js";
import { PulseBinaryGPU as PulseGPUBin } from "../PULSE-GPU/PulseGPUBinary-v30.js";
import { PulseRouter, createPulseRouter as PulseRouterInt } from "./PULSE-WORLD-INTERNET-ROUTER.js";
import {PulseWorldUserCacheEngine_v33} from "../../PULSE-WORLD-USERCACHE.js";
// ============================================================================
//  PULSE OS KERNEL IMPORT (v30 → used as symbolic kernel source)
// ============================================================================
import { PulseOSKernel } from "../PULSE-OS/PulseOS-v30.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================\
import { createDualBandOrganismV30 as PulseBinaryOrganismBoot } from "../PULSE-AI/PULSE-AI-DUALBAND-PAST.js";

// ============================================================================
//  IMPORTS — COMPILER / CHUNKER / ACTNOW
// ============================================================================
import { PulseWorldCompile } from "./3RDPARTY/PULSE-WORLD-COMPILER.js";
import { createPulseWorldChunker as createPulseChunker } from "./PULSE-WORLD-CHUNKER.js";
import { createPulseUser as createPulseWorldCore} from "../PULSE-EXPANSION/PULSE-EXPANSION-USER.js";

// ============================================================================
//  IMPORTS — PRESENTATION / POWER
// ============================================================================
import { getPulsePowerSnapshotV32 as PulseSurfaceEnvironment, PulsePowerAPIv32 as PulsePowerAPI} from "./PULSE-WORLD-POWER.js";

import { createPulseWorldFightFlightResponseV40 } from "./PulseWorldFightFlightResponse-v30.js";

import { createEarn, evolveEarn } from "../PULSE-EARN/PulseEarn-v31.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================

import { createBinaryRouterUnifiedBand as PulseRouterBin } from "../PULSE-ROUTER/PulseRouterBinary-v30.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================

import { createBinaryMesh as PulseMeshBin } from "../PULSE-MESH/PULSE-MESH-BINARY.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================

import { createBinaryProxy } from "../Pulse-Coordinator/PulseProxyBinary-v30.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================

import { createPulseSend as PulseSendSym } from "../PULSE-SEND/PulseSend-v30.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================
import { createGPUDispatchV31 as PulseGPUSym } from "../PULSE-GPU/PulseGPU-v30.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================

import { PulseRouter as PulseRouterSym } from "../PULSE-ROUTER/PulseRouter-v30.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================
import { createPulseMesh as PulseMeshSym } from "../PULSE-MESH/PULSE-MESH.js";
// ============================================================================
//  TIMING WAIT BETWEEN IMPORTS INSTEAD OF HICCUPS
// ============================================================================
import { createProxy as PulseProxySym } from "../Pulse-Coordinator/PulseProxy-v30.js";

// ============================================================================
//  IMPORTS — WORLD CORE / BINARY ORGANISM BOOT
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  ENVIRONMENT SNAPSHOT (v33)
// ============================================================================
function buildEnvironmentSnapshot() {
  if (typeof window === "undefined") {
    return {
      runtime: "node-like",
      userAgent: null,
      language: null,
      online: null,
      platform: null,
      pulseTouch: null,
      pulsePower: null
    };
  }

  const surfaceEnv = PulseRealm.PulseSurface.environment;
  const powerSnapshot =
    typeof PulsePowerAPI.getPulsePowerSnapshot === "function"
      ? PulsePowerAPI.getPulsePowerSnapshot()
      : null;

  const touchSnapshot = PulseRealm.__PULSE_TOUCH__ || null;

  const base = {
    runtime: "browser",
    userAgent: window.navigator.userAgent || null,
    language: window.navigator.language || null,
    online: window.navigator.onLine ?? null,
    platform: window.navigator.platform || null,
    pulseTouch: touchSnapshot,
    pulsePower: powerSnapshot || null
  };

  if (surfaceEnv) {
    return {
      ...base,
      ...surfaceEnv
    };
  }

  return base;
}

const PulseEnvironment = buildEnvironmentSnapshot();

// ============================================================================
//  USER / LOCAL OS CORE
// ============================================================================
let PulseWorldCore = null;
try {
  PulseWorldCore = createPulseWorldCore({
    regionID: null,
    trace: false,
    serverMode: false
  });
} catch {
  PulseWorldCore = null;
}

// ============================================================================
//  GOVERNOR
// ============================================================================
function runThroughGovernor(organName, pulseOrImpulse, fn) {
  const governedRun = PulseRealm.PulseWorld.Governed.run
      || null;

  if (typeof governedRun === "function") {
    return governedRun(organName, pulseOrImpulse, fn);
  }

  return fn(pulseOrImpulse);
}

// ============================================================================
//  BINARY-FIRST IDENTITY
// ============================================================================
async function resolveIdentityBinaryFirst(ProxyBin, ProxySymInstance) {
  const shadow = Object.freeze({
    layer: "BinaryProxy",
    role: "PURE_BINARY_NERVE_ROOT",
    version: "v30-IMMORTAL+++ONEBAND",
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

      // ONEBAND / MESH-BAND / PULSE-BAND
      oneBandAware: true,
      meshBandAware: true,
      pulseBandAware: true,
      unifiedBandField: true,

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

      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      gpuAware: true,
      earnAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  }) || null;
  if (shadow.identity) {
    return { kind: "binary-shadow", value: shadow.identity };
  }

  if (ProxyBin && typeof ProxyBin.identityBinary === "function") {
    try {
      const binId = await ProxyBin.identityBinary();
      if (binId) return { kind: "binary", value: binId };
    } catch {}
  }

  if (ProxySymInstance && typeof ProxySymInstance.identity === "function") {
    try {
      const hybridId = await ProxySymInstance.identity("hybrid");
      if (hybridId) return { kind: "hybrid", value: hybridId };
    } catch {}
  }

  return { kind: "none", value: null };
}


// ============================================================================
//  UPGRADE PULSE OS KERNEL TO v40-SHAPE SYMBOLIC KERNEL
// ============================================================================
function upgradePulseOSKernel_v40(kernel) {
  if (!kernel || typeof kernel !== "object") return null;

  return {
    Brain: kernel.Brain ?? null,
    Evolution: kernel.Evolution ?? null,
    SDN: kernel.SDN ?? null,
    MemoryCore: kernel.MemoryCore ?? null,
    Governor: kernel.Governor ?? null,
    BinaryOverlay: kernel.BinaryOverlay ?? null,
    EpisodicMemory: kernel.EpisodicMemory ?? null,
    SemanticMemory: kernel.SemanticMemory ?? null,
    BinaryAgent: kernel.BinaryAgent ?? null,
    version: kernel.version ?? "v30-upgraded-to-v40"
  };
}

// ============================================================================
//  HYBRID KERNEL RESOLUTION (v40 IMMORTAL) — BINARY-FIRST, SYMBOLIC-SAFE
// ============================================================================
async function resolveKernelsBinaryFirst() {
  const BinaryKernel = PulseRealm.PulseBinary ?? null;

  let SymbolicKernel = null;

  // 1) WorldCore view
  try {
    if (PulseRealm.PulseWorldCore?.getPrimaryOSView) {
      const osView = PulseRealm.PulseWorldCore.getPrimaryOSView();
      if (osView?.SymbolicKernel) {
        SymbolicKernel = osView.SymbolicKernel;
      }
    }
  } catch {}

  // 2) Understanding kernel
  if (!SymbolicKernel) {
    try {
      if (PulseRealm.PulseUnderstandingKernel) {
        SymbolicKernel = PulseRealm.PulseUnderstandingKernel;
      }
    } catch {}
  }

  // 3) Pulse global
  if (!SymbolicKernel) {
    try {
      if (PulseRealm.Pulse?.SymbolicKernel || PulseRealm.Pulse?.Kernel) {
        SymbolicKernel = PulseRealm.PulseWorld.SymbolicKernel || PulseRealm.PulseWorld.Kernel;
      }
    } catch {}
  }

  // 4) PulseOSKernel (v30 → upgraded to v40)
  if (!SymbolicKernel) {
    try {
      let osKernel = typeof PulseOSKernel === "function"
        ? await PulseOSKernel()
        : PulseOSKernel;
      SymbolicKernel = upgradePulseOSKernel_v40(osKernel);
    } catch {}
  }

  // 5) Legacy globals
  if (!SymbolicKernel) {
    try {
      SymbolicKernel = PulseRealm.PulseKernel ?? null;
    } catch {}
  }

  // 6) Await promise-like kernels
  if (SymbolicKernel?.then instanceof Function) {
    try {
      SymbolicKernel = await SymbolicKernel;
    } catch {
      SymbolicKernel = null;
    }
  }

  // 7) FINAL SAFE STUB
  if (!SymbolicKernel || typeof SymbolicKernel !== "object") {
    SymbolicKernel = {
      Brain: null,
      Evolution: null,
      SDN: null,
      MemoryCore: null,
      Governor: null,
      BinaryOverlay: null,
      EpisodicMemory: null,
      SemanticMemory: null,
      BinaryAgent: null,
      version: "v40-symbolic-stub"
    };
  }

  return {
    BinaryKernel,
    SymbolicKernel
  };
}

// ============================================================================
//  KERNEL BOOTSTRAP — UNDERSTANDING LAYER (v33 ImmortalHyperFrame)
// ============================================================================
async function buildPulseKernel({
  SignalPort = PulseRealm.PulseSignalPort,
  FinalityPort = PulseRealm.PulseFinalityPort
} = {}) {
  const { BinaryKernel, SymbolicKernel } = await resolveKernelsBinaryFirst();

  const BinaryShadow =
    PulseRealm.PulseBinary ?? null;
  const UIFlow =
    PulseRealm.PulseUI ?? null;
  const SkinReflex =
    PulseRealm.PulseSkinReflex ?? null;

  const BinaryBrain = BinaryKernel?.Brain ?? null;
  const BinaryEvolution = BinaryKernel?.Evolution ?? null;
  const BinarySDN = BinaryKernel?.SDN ?? null;
  const BinaryMemoryCore = BinaryKernel?.MemoryCore ?? null;
  const BinaryOverlay = BinaryKernel?.BinaryOverlay ?? null;

  const Brain = BinaryBrain ?? SymbolicKernel.Brain ?? null;
  const Evolution = BinaryEvolution ?? SymbolicKernel.Evolution ?? null;
  const SpinalCord = BinarySDN ?? SymbolicKernel.SDN ?? null;
  const CoreGovernor = SymbolicKernel.Governor ?? null;

  const MemoryCore =
    BinaryMemoryCore ??
    SymbolicKernel.MemoryCore ??
    null;

  const BinaryOverlayFinal =
    BinaryOverlay ??
    SymbolicKernel.BinaryOverlay ??
    null;

  const EpisodicMemory =
    SymbolicKernel.EpisodicMemory ??
    (MemoryCore && MemoryCore.Episodic ? MemoryCore.Episodic : null);

  const SemanticMemory =
    SymbolicKernel.SemanticMemory ??
    (MemoryCore && MemoryCore.Semantic ? MemoryCore.Semantic : null);

  const Mesh =
    (PulseMeshBin && Object.keys(PulseMeshBin).length ? PulseMeshBin.send : null) ||
    PulseMeshSym;

  const Send =
    (PulseSendBin && Object.keys(PulseSendBin).length ? PulseSendBin.send : null) ||
    PulseSendSym;

  const Router =
    (PulseRouterBin && Object.keys(PulseRouterBin).length ? PulseRouterBin : null) ||
    PulseRouterSym;

  const InternetRouter =
    (PulseRouterInt && Object.keys(PulseRouterInt).length ? PulseRouterInt : null) ||
    PulseRouter;


  const GPU =
    (PulseGPUBin && Object.keys(PulseGPUBin).length ? PulseGPUBin : null) ||
    PulseGPUSym;

  // ---------------------------------------------------------------------------
  // Earn wiring (two functions → one coherent surface)
  // ---------------------------------------------------------------------------
  const EarnCreate = typeof createEarn === "function" ? createEarn : null;
  const EarnEvolve = typeof evolveEarn === "function" ? evolveEarn : null;

  const Earn = {
    create: EarnCreate,
    evolve: EarnEvolve,
    use: (...args) => {
      if (EarnEvolve) return EarnEvolve(...args);
      if (EarnCreate) return EarnCreate(...args);
      return null;
    }
  };

 // 1. Create symbolic proxy WITH identity organ installed
const ProxySymInstance = PulseProxySym({
  Router,
  Brain,
  Evolution,
  Identity: {
    value: null,
    set(v) { this.value = v; },
    get() { return this.value; }
  },
  Environment: PulseEnvironment,
  Governor: CoreGovernor,
  MemoryCore,
  BinaryOverlay: BinaryOverlayFinal,
  Mesh,
  Send,
  Earn
});

// 2. Create binary proxy (if encoder exists)
const encoder = SymbolicKernel.BinaryAgent ?? null;
let ProxyBin = null;

if (encoder) {
  ProxyBin = createBinaryProxy({
    encoder,
    fallbackProxyFactory: (job) => {
      if (typeof ProxySymInstance.send === "function") {
        return ProxySymInstance.send(job);
      }
      if (typeof ProxySymInstance.exchange === "function") {
        return ProxySymInstance.exchange(job);
      }
      return job;
    },
    trace: false
  });
}

// 3. Resolve identity (binary-first)
const identityResult = await resolveIdentityBinaryFirst(
  ProxyBin,
  ProxySymInstance
);

const identity = identityResult && identityResult.value;

// 4. Install identity into symbolic proxy ONLY if valid
if (identity && ProxySymInstance.Identity && typeof ProxySymInstance.Identity.set === "function") {
  ProxySymInstance.Identity.set(identity);
}


// 5. Choose final proxy
const Proxy = ProxyBin || ProxySymInstance;


  try {
    SpinalCord?.registerExtension?.("Understanding", "extension", {
      version: "v33-ImmortalHyperFrame",
      role: "cortical-opener",
      layer: "A3",
      binaryFirst: true,
      hybridLoader: true,
      presenceAware: true,
      advantageAware: true,
      speedAware: true,
      touchAware: true,
      compilerAware: true,
      pageCompileAware: true
    });
  } catch {}

  try {
    if (Mesh && typeof Mesh.boot === "function") {
      Mesh.boot({
        Brain,
        Evolution,
        SDN: SpinalCord,
        MemoryCore,
        BinaryOverlay: BinaryOverlayFinal,
        BinaryShadow,
        Earn
      });
    }
  } catch {}

  try {
    if (Send && typeof Send.boot === "function") {
      Send.boot({
        Brain,
        Evolution,
        SDN: SpinalCord,
        MemoryCore,
        BinaryOverlay: BinaryOverlayFinal,
        Mesh,
        BinaryShadow,
        Earn
      });
    }
  } catch {}

  try {
    if (Brain && Mesh && typeof Brain.attachMesh === "function") {
      Brain.attachMesh(Mesh);
    }
    if (Mesh && typeof Mesh.attachBrain === "function") {
      Mesh.attachBrain(Brain);
    }
  } catch (err) {
    console.error("[PulseUnderstanding v33] Brain ↔ Mesh attach failed:", err);
  }

  const signalSnapshot = SignalPort.getSnapshot();
  try {
    SpinalCord?.emitImpulse?.("Understanding", {
      modeKind: "dual",
      executionContext: {
        sceneType: "cortical-opener",
        workloadClass: "frontend-boot",
        dispatchSignature: "Understanding.v33-ImmortalHyperFrame",
        shapeSignature: "A3-layer",
        extensionId: "Understanding",
        identityKind: identityResult.kind
      },
      pressureSnapshot: {
        runtime: PulseEnvironment.runtime,
        online: PulseEnvironment.online,
        signal: signalSnapshot
      }
    });
  } catch {}

  SignalPort.emit("understanding.booted", {
    identity,
    identityKind: identityResult.kind,
    environment: PulseEnvironment,
    signal: signalSnapshot
  });

  const meta = {
    identity,
    identityKind: identityResult.kind,
    environment: PulseEnvironment,
    signal: () => SignalPort.registry.get()
  };

  const Pulse = {
    meta,
    Identity: identity,
    identity: identity,
    IdentityKind: identityResult.kind,
    Environment: PulseEnvironment,

    Brain,
    Evolution,
    Router,
    GPU,
    SDN: SpinalCord,
    Proxy,

    MemoryCore,
    BinaryOverlay: BinaryOverlayFinal,
    EpisodicMemory,
    SemanticMemory,

    Mesh,
    Send,
    Earn,

    BinaryShadow,
    UIFlow,
    SkinReflex,

    Errors: PulseRealm.PulseUIErrors,

    Governed: {
      run: runThroughGovernor
    },

    Signal: {
      get: () => SignalPort.registry.get()
    }
  };

  // expose as symbolic kernel for future resolutions
  PulseRealm.PulseUnderstandingKernel = Pulse;
  PulseRealm.PulseWorld = PulseRealm.PulseWorld || {};
  PulseRealm.PulseWorld.SymbolicKernel = PulseRealm.PulseWorld.SymbolicKernel || Pulse;
  PulseRealm.PulseWorld.Kernel = PulseRealm.PulseWorld.Kernel || Pulse;

  return Pulse;
}

// ============================================================================
//  EXPORTED UNDERSTANDING OBJECT (v33)
// ============================================================================
export const PulseUnderstandingDrift = {
  Environment: PulseEnvironment,
  Kernel: PulseRealm.PulseUnderstandingKernel,
  Errors: PulseRealm.PulseUIErrors,

  Identity: () => PulseRealm.PulseWorld?.Identity ?? null,
  IdentityKind: () => PulseRealm.PulseWorld?.IdentityKind ?? null,

  runThroughGovernor,
  prewarmUnderstanding,
  runCompileChunkActNow,
  compilePageToUser,

  Signal: {
    get: () => PulseRealm.PulseSignalPort.registry.get()
  },

  getCorticalPipelineOrgans: async () => {
    const { BinaryKernel, SymbolicKernel } = await resolveKernelsBinaryFirst();
    const Brain = BinaryKernel?.Brain ?? SymbolicKernel.Brain ?? null;
    return buildCorticalPipelineOrgans(Brain);
  },

  boot: async (options = {}) => {
    try {
      const kernel = await ensurePulseKernel({
        SignalPort: PulseRealm.PulseUnderstandingSignalPort,
        FinalityPort: PulseRealm.PulseUnderstandingPulsePort
      });

      if (PulseRealm.PulseUnderstandingSignalPort) {
        PulseRealm.PulseUnderstandingSignalPort.emit("UNDERSTANDING_BOOTED", {
          ok: true,
          identity: kernel.Identity || null,
          environment: kernel.Environment || null,
          options,
          ts: PulseRealm.PulseNOW
        });
      }

      return { ok: true, kernel };
    } catch (err) {
      if (PulseRealm.PulseUnderstandingSignalPort) {
        PulseRealm.PulseUnderstandingSignalPort.emit("UNDERSTANDING_BOOTED", {
          ok: false,
          error: String(err),
          ts: PulseRealm.PulseNOW
        });
      }

      return { ok: false, error: String(err) };
    }
  }
};


// ============================================================================
//  GLOBAL KERNEL PROMISE — HYBRID AUTO + SIGNAL-DRIVEN BOOT
// ============================================================================
let PulseKernelPromise = null;

function ensurePulseKernel({
  SignalPort = PulseRealm.PulseSignalPort,
  FinalityPort = PulseRealm.PulseFinalityPort
} = {}) {
  if (!PulseKernelPromise) {
    PulseKernelPromise = buildPulseKernel({ SignalPort, FinalityPort });
  }
  return PulseKernelPromise;
}

PulseRealm.PulseUnderstandingKernel = buildPulseKernel;
PulseRealm.PulseUnderstanding = PulseUnderstandingDrift;

// Auto-boot for world deploy
PulseKernelPromise = ensurePulseKernel({
  SignalPort: PulseRealm.PulseSignalPort,
  FinalityPort: PulseRealm.PulseFinalityPort
});


  const port = PulseRealm.PulseSignalPort;

  if (port && typeof port.on === "function") {
    const SIGNAL_EVENTS = [
      "UNDERSTANDING_BOOT",
      "PULSEBAND_ONE_BOOT",
      "BINARY_OS_BOOT",
      "COMPILER_REQUEST",
      "COMPILER_PAGE_REQUEST",
      "PULSENET_START",
      "PULSENET_FASTLANE",
      "PULSENET_INGRESS",
      "IMAGE_REQUEST"
    ];

    const autoBootOnSignal = (eventName, payload) => {
      ensurePulseKernel({
        SignalPort: PulseRealm.PulseUnderstandingSignalPort || PulseRealm.PulseSignalPort,
        FinalityPort: PulseRealm.PulseUnderstandingPulsePort || PulseRealm.PulseFinalityPort
      }).catch((err) => {
        console.error(
          "[PulseUnderstanding v33] autoBootOnSignal failed for",
          eventName,
          err
        );
      });
    };

    SIGNAL_EVENTS.forEach((eventName) => {
      port.on(eventName, (payload) => autoBootOnSignal(eventName, payload));
    });
  }


// ============================================================================
//  ORGAN BUNDLE — Compiler + Chunker + ACTNOW
// ============================================================================
let PulseChunker = null;
let PulseACTNow = null;

async function buildCorticalPipelineOrgans(Brain) {
  if (!Brain) return { PulseChunker: createPulseChunker, PulseACTNow: createPulseWorldFightFlightResponseV40 };

  if (!PulseChunker) {
    PulseChunker = ({
      Brain,
      Logger: { log, warn, error }
    });

    try {
      PulseChunker.prewarm();
    } catch (e) {
      warn("[Understanding v33] PulseChunker prewarm failed", {
        error: e.message
      });
    }
  }

  if (!PulseACTNow) {
    const PulseImmunity = Brain.Immunity ?? Brain.PulseImmunity ?? null;
    const PulseSurgeonGeneral =
      Brain.SurgeonGeneral ?? Brain.PulseSurgeonGeneral ?? null;

    if (PulseImmunity && PulseSurgeonGeneral) {
      PulseACTNow = createPulseWorldFightFlightResponseV40({
        PulseImmunity,
        PulseSurgeonGeneral
      });
    } else {
      warn(
        "[Understanding v33] ACTNow v20 not fully wired (missing Immunity/SurgeonGeneral)"
      );
    }
  }

  return { PulseChunker, PulseACTNow };
}

// ============================================================================
//  CORTICAL PIPELINE — COMPILE → CHUNK → ACTNOW (v33, multi-artifact)
// ============================================================================
async function runCompileChunkActNow({
  entry = "PULSE-WORLD-INDEX.js",
  userId = "anon",
  laneId = 0,
  envelopeId = "compile-0",
  baseVersion = "v1",
  backendKind = "frontend-compile",
  worldBand = "frontend",
  chunkProfile = "frontend-compile-default",
  reason = "pulseworld_compile",
  source = "PulseWorld",
  sizeOnly = false,
  pageId = null,
  route = null,
  html = null,
  assets = [],
  compileOptions = {},
  SignalPort = PulseRealm.PulseSignalPort,
  FinalityPort = PulseRealm.PulseFinalityPort
} = {}) {
  const { BinaryKernel, SymbolicKernel } = await resolveKernelsBinaryFirst();
  const Brain = BinaryKernel.Brain ?? SymbolicKernel.Brain ?? null;

  const { PulseChunker, PulseACTNow } =
    await buildCorticalPipelineOrgans(Brain);

  if (!PulseChunker) {
    warn(
      "[Understanding v33] runCompileChunkActNow: PulseChunker unavailable, aborting."
    );
    return null;
  }

  log("[Understanding v33] Compiler pipeline start", {
    entry,
    backendKind,
    worldBand,
    chunkProfile,
    pageId,
    route
  });

  let compileResult = null;
  try {
    compileResult = await PulseWorldCompile({
      entry,
      outfile: compileOptions.outfile,
      mode: compileOptions.mode || "esm",
      buildKind: compileOptions.buildKind || "world",
      lanes: compileOptions.lanes || [],
      minify: compileOptions.minify,
      sourcemap: compileOptions.sourcemap,
      splitting: compileOptions.splitting,
      define: compileOptions.define,
      loader: compileOptions.loader,
      worldBinaryContext: compileOptions.worldBinaryContext
    });
  } catch (e) {
    warn("[Understanding v33] Compiler failed", { entry, error: e.message });
    return null;
  }

  const compiledPayload = {
    entry,
    outfile:
      compileResult.artifacts.worldBundle || compileOptions.outfile || "PULSE-USER.js",

    signature: compileResult.signature ?? null,
    chunkHints: compileResult.chunkHints ?? null,
    binaryBuildSurface: compileResult.binaryBuildSurface ?? null,
    artifacts: compileResult.artifacts ?? null,

    world: {
      metafile: compileResult.worldResult.metafile ?? null,
      warnings: compileResult.worldResult.warnings ?? [],
      errors: compileResult.worldResult.errors ?? []
    },
    runtime: {
      warnings: compileResult.runtimeResult.warnings ?? [],
      errors: compileResult.runtimeResult.errors ?? []
    },
    executable: {
      warnings: compileResult.execResult.warnings ?? [],
      errors: compileResult.execResult.errors ?? []
    },

    page: {
      id: pageId,
      route,
      html,
      assets
    }
  };

  const chunkResponse = await PulseChunker.chunkRoute({
    url: route || null,
    laneId,
    envelopeId,
    userId,
    baseVersion,
    sizeOnly: !!sizeOnly,
    payload: compiledPayload,
    routeDescriptor: null,
    backendKind,
    worldBand,
    chunkProfile
  });

  if (!chunkResponse.ok) {
    warn("[Understanding v33] Chunking failed for compiled payload", {
      entry,
      error: chunkResponse.error
    });
    return null;
  }

  const actNowPacket = {
    source,
    reason,
    profile: {
      id: chunkProfile,
      backendKind,
      worldBand,
      laneId,
      envelopeId
    },
    chunks: [chunkResponse.data],
    payloadHash: chunkResponse.payloadHash,
    lanes: 1
  };

  const signalSnapshot = SignalPort.getSnapshot();

  let actNowReflex = null;
  if (PulseACTNow && typeof PulseACTNow.fromActNowPacket === "function") {
    actNowReflex = PulseACTNow.fromActNowPacket(actNowPacket, {
      modeKind: "dual",
      triggerKind: "compile_chunk_actnow",
      organismState: signalSnapshot,
      dualBandContext: null
    });
  }

  try {
    await PulseRealm.PulseBridgeRoute("actnow.packet", {
      packet: actNowPacket,
      reflex: actNowReflex
    });
  } catch (e) {
    warn("[Understanding v33] Failed to route actnow.packet", {
      error: e.message
    });
  }

  SignalPort.emit("understanding.compileChunkActNow", {
    entry,
    payloadHash: chunkResponse.payloadHash,
    signal: signalSnapshot,
    pageId,
    route
  });

  log(
    "[Understanding v33] Compiler → Chunker → ACTNOW pipeline complete",
    {
      entry,
      payloadHash: chunkResponse.payloadHash,
      pageId,
      route
    }
  );

  return {
    actNowPacket,
    chunkResponse,
    compileResult,
    actNowReflex,
    compiledPayload
  };
}

// ============================================================================
//  PAGE-CENTRIC COMPILE — “compile page back to me in full”
// ============================================================================
async function compilePageToUser({
  pageId,
  route,
  html,
  assets = [],
  compileEntry = "PULSE-WORLD-INDEX.js",
  userId = "page-user",
  laneId = 0,
  envelopeId = "compile-page-0",
  chunkProfile = "frontend-compile-default",
  backendKind = "frontend-compile",
  worldBand = "frontend",
  reason = "pulseworld_page_compile",
  source = "PulseUnderstandingPage",
  compileOptions = {},
  SignalPort = PulseRealm.PulseSignalPort,
  FinalityPort = PulseRealm.PulseFinalityPort
} = {}) {
  const result = await runCompileChunkActNow({
    entry: compileEntry,
    userId,
    laneId,
    envelopeId,
    baseVersion: "v1",
    backendKind,
    worldBand,
    chunkProfile,
    reason,
    source,
    sizeOnly: false,
    pageId,
    route,
    html,
    assets,
    compileOptions,
    SignalPort,
    FinalityPort
  });

  if (!result) return null;

  return {
    ok: true,
    page: {
      id: pageId,
      route,
      html,
      assets
    },
    compileResult: result.compileResult,
    compiledPayload: result.compiledPayload,
    actNowPacket: result.actNowPacket,
    chunkResponse: result.chunkResponse,
    actNowReflex: result.actNowReflex
  };
}

// ============================================================================
//  SIGNAL HANDLERS — FULL RESPONSE LOOP (v33)
// ============================================================================

  if (port && typeof port.on === "function" && typeof port.emit === "function") {
    // Understanding boot + response
    port.on("UNDERSTANDING_BOOT", async (packet = {}) => {
      const options = packet.options || {};
      try {
        const kernel = await ensurePulseKernel({
          SignalPort: PulseRealm.PulseUnderstandingSignalPort || PulseRealm.PulseSignalPort,
          FinalityPort: PulseRealm.PulseUnderstandingPulsePort || PulseRealm.PulseFinalityPort
        });

        port.emit("UNDERSTANDING_BOOTED", {
          ok: true,
          identity: kernel.Identity || null,
          environment: kernel.Environment || null,
          options,
          ts: PulseRealm.PulseNOW
        });
      } catch (err) {
        port.emit("UNDERSTANDING_BOOTED", {
          ok: false,
          error: String(err),
          ts: PulseRealm.PulseNOW
        });
      }
    });

    // PulseBand one-band boot + response
    port.on("PULSEBAND_ONE_BOOT", async () => {
      try {
        await (PulseRealm.PulseBand || pulseband).initEngine();
        port.emit("PULSEBAND_ONE_BOOTED", {
          ok: true,
          ts: PulseRealm.PulseNOW
        });
      } catch (err) {
        port.emit("PULSEBAND_ONE_BOOTED", {
          ok: false,
          error: String(err),
          ts: PulseRealm.PulseNOW
        });
      }
    });

    // Binary OS boot + response
    port.on("BINARY_OS_BOOT", async (packet = {}) => {
      try {
        const organism = PulseBinaryOrganismBoot(packet.options || {});
        if (organism.boot) await organism.boot();

          PulseRealm.PulseBinary = organism;
        

        port.emit("BINARY_OS_BOOTED", {
          ok: true,
          identity: organism.identity || null,
          ts: PulseRealm.PulseNOW
        });
      } catch (err) {
        port.emit("BINARY_OS_BOOTED", {
          ok: false,
          error: String(err),
          ts: PulseRealm.PulseNOW
        });
      }
    });

    // Compiler request + response (generic)
    port.on("COMPILER_REQUEST", async (packet = {}) => {
      try {
        const result = await runCompileChunkActNow({
          reason: packet.reason,
          ...packet.meta,
          SignalPort: PulseRealm.PulseUnderstandingSignalPort || PulseRealm.PulseSignalPort,
          FinalityPort: PulseRealm.PulseUnderstandingPulsePort || PulseRealm.PulseFinalityPort
        });

        port.emit("COMPILER_RESPONSE", {
          ok: !!result,
          result,
          ts: PulseRealm.PulseNOW
        });
      } catch (err) {
        port.emit("COMPILER_RESPONSE", {
          ok: false,
          error: String(err),
          ts: PulseRealm.PulseNOW
        });
      }
    });

    // Page-centric compiler request + full-page response
    port.on("COMPILER_PAGE_REQUEST", async (packet = {}) => {
      try {
        const meta = packet.meta || {};
        const page = packet.page || {};

        const result = await compilePageToUser({
          pageId: page.id || meta.pageId || null,
          route: page.route || meta.route || null,
          html: page.html || null,
          assets: page.assets || [],
          compileEntry: meta.compileEntry || "PULSE-WORLD-INDEX.js",
          userId: meta.userId || "page-user",
          laneId: meta.laneId ?? 0,
          envelopeId: meta.envelopeId || "compile-page-0",
          chunkProfile: meta.chunkProfile || "frontend-compile-default",
          backendKind: meta.backendKind || "frontend-compile",
          worldBand: meta.worldBand || "frontend",
          reason: packet.reason || "pulseworld_page_compile",
          source: meta.source || "PulseUnderstandingPage",
          compileOptions: meta.compileOptions || {},
          SignalPort: PulseRealm.PulseUnderstandingSignalPort || PulseRealm.PulseSignalPort,
          FinalityPort: PulseRealm.PulseUnderstandingPulsePort || PulseRealm.PulseFinalityPort
        });

        port.emit("COMPILER_PAGE_RESPONSE", {
          ok: !!result,
          result,
          ts: PulseRealm.PulseNOW
        });
      } catch (err) {
        port.emit("COMPILER_PAGE_RESPONSE", {
          ok: false,
          error: String(err),
          ts: PulseRealm.PulseNOW
        });
      }
    });
  }


// ============================================================================
//  GLOBAL BROADCAST (PulseRealm.Pulse) — v33 signal-aware
// ============================================================================

  PulseKernelPromise
    .then((PulseKernel) => {
      PulseRealm.PulseWorld = PulseRealm.PulseWorld
        ? {
            ...PulseRealm.PulseWorld,
            meta: PulseKernel.meta,
            Brain: PulseKernel.Brain,
            Evolution: PulseKernel.Evolution,
            Router: PulseKernel.Router,
            GPU: PulseKernel.GPU,
            SDN: PulseKernel.SDN,
            Proxy: PulseKernel.Proxy,
            Governed: PulseKernel.Governed,
            Environment: PulseKernel.Environment,
            Identity: PulseKernel.Identity,
            IdentityKind: PulseKernel.IdentityKind,
            MemoryCore: PulseKernel.MemoryCore,
            BinaryOverlay: PulseKernel.BinaryOverlay,
            EpisodicMemory: PulseKernel.EpisodicMemory,
            SemanticMemory: PulseKernel.SemanticMemory,
            Mesh: PulseKernel.Mesh,
            Send: PulseKernel.Send,
            Earn: PulseKernel.Earn,
            BinaryShadow: PulseKernel.BinaryShadow,
            UIFlow: PulseKernel.UIFlow,
            SkinReflex: PulseKernel.SkinReflex,
            Errors: PulseKernel.Errors,
            Signal: {
              get: () => PulseKernel.Signal.get()
            }
          }
        : PulseKernel;
    })
    .catch((err) => {
      console.error(
        "[PulseUnderstanding v33-ImmortalHyperFrame] Kernel bootstrap failed:",
        err
      );
    });


// ============================================================================
//  UNDERSTANDING PREWARM — v33 IMMORTAL HYPERFRAME
// ============================================================================
export async function prewarmUnderstanding({
  pages = [],
  routes = [],
  assets = [],
  compileEntry = null,
  chunkProfile = "frontend-compile-default",
  SignalPort = PulseRealm.PulseSignalPort,
  FinalityPort = PulseRealm.PulseFinalityPort
} = {}) {
  if (typeof window === "undefined") return;

  try {
    const PulseKernel = await (PulseKernelPromise || ensurePulseKernel({
      SignalPort,
      FinalityPort
    })).catch(() => null);

    const SDN = PulseKernel.SDN;
    const Router = PulseKernel.Router;
    const Mesh = PulseKernel.Mesh;
    const Brain = PulseKernel.Brain ?? null;

    try {
      await buildCorticalPipelineOrgans(Brain);
    } catch (err) {
      console.error("[PulseUnderstanding v33] Cortical pipeline prewarm failed:", err);
    }

    try {
      if (PulsePowerAPI.pulsePowerTouch) {
        PulsePowerAPI.pulsePowerTouch({
          pageId: pages[0] || null,
          route: routes[0] || null,
          assets: {
            images: assets.filter((a) => a.kind === "image").map((a) => a.href),
            fonts: assets.filter((a) => a.kind === "font").map((a) => a.href),
            scripts: assets.filter((a) => a.kind === "script").map((a) => a.href),
            styles: assets.filter((a) => a.kind === "style").map((a) => a.href)
          },
          touch: PulseRealm.__PULSE_TOUCH__ || null
        });
      }
    } catch (err) {
      console.error("[PulseUnderstanding v33] PulsePower prewarm failed:", err);
    }

    try {
      if (SDN.prewarmRoutes && routes.length) {
        SDN.prewarmRoutes(routes);
      } else if (Router.prewarm && routes.length) {
        Router.prewarm(routes);
      }
    } catch (err) {
      console.error("[PulseUnderstanding v33] SDN/Router prewarm failed:", err);
    }

    try {
      if (Mesh.prewarm && (pages.length || routes.length)) {
        Mesh.prewarm({ pages, routes });
      }
    } catch (err) {
      console.error("[PulseUnderstanding v33] Mesh prewarm failed:", err);
    }

    try {
      const urls = assets.map((a) => a.href).filter(Boolean);
      if (urls.length && PulseRealm.prewarmAssets) {
        PulseRealm.prewarmAssets(urls);
      }
    } catch (err) {
      console.error("[PulseUnderstanding v33] legacy prewarmAssets failed:", err);
    }

    try {
      if (compileEntry) {
        await runCompileChunkActNow({
          entry: compileEntry,
          userId: "prewarm",
          laneId: 0,
          envelopeId: "compile-prewarm-0",
          baseVersion: "v1",
          backendKind: "frontend-compile",
          worldBand: "frontend",
          chunkProfile,
          reason: "prewarm_compile_chunk_actnow",
          source: "PulseUnderstandingPrewarm",
          sizeOnly: false,
          pageId: pages[0] || null,
          route: routes[0] || null,
          html: null,
          assets,
          compileOptions: {},
          SignalPort,
          FinalityPort
        });
      }
    } catch (err) {
      console.error(
        "[PulseUnderstanding v33] compile+chunk+actnow prewarm failed:",
        err
      );
    }
  } catch (err) {
    console.error("[PulseUnderstanding v33] prewarmUnderstanding failed:", err);
  }
}


export const PulseUnderstandingV33 = PulseUnderstandingDrift;
export default PulseUnderstandingDrift;

PulseRealm.WorldUnderstanding = {
  PulseUnderstandingDrift,
  PulseUnderstandingV33,
  prewarmUnderstanding,
  compilePageToUser,
  runCompileChunkActNow,
  buildCorticalPipelineOrgans,
  buildPulseKernel,
  resolveIdentityBinaryFirst,
  resolveKernelsBinaryFirst
}
PulseRealm.PulseUnderstandingPulseBand = PulseRealm.PulseBand;
PulseRealm.PulseUnderstanding = PulseUnderstandingDrift;
PulseRealm.PulseUnderstandingSignalPort = PulseRealm.PulseSignalPort;
PulseRealm.PulseUnderstandingFinalityPort = PulseRealm.PulseFinalityPort;
PulseRealm.PulseUnderstandingPulsePort =  PulseRealm.PulsePort;

import { PulseUnderstanding } from "./PULSE-WORLD-UNDERSTANDING-PAST.js";

