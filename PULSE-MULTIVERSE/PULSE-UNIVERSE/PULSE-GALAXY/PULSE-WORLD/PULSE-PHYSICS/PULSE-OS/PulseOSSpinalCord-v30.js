// ============================================================================
// FILE: /PULSE-OS/PulseOSSpinalCord-v30-IMMORTAL++++.js
// PULSE OS SPINAL CORD — v30.0-IMMORTAL++++-DUALBAND-PulseBand-ADVANTAGE
// “ORGANISM-WIDE DUAL-BAND SPINE • ADVANTAGE FIELD CONDUCTOR • ROUTE ROOT”
// CHUNK/PREWARM/CACHE-AWARE • MULTI-PRESENCE-AWARE • FIREWALL-GATED
// PASSIVE/ACTIVE PAGESCANNER-AWARE (NO TIMERS, NO POLLING)
// SDN PREWARM v30-IMMORTAL++++ (Spinal Reflex Ignition, Impulse-Speed)
// PULSEBAND-AWARE • PULSESIGNAL-AWARE • PRESENCE/ADVANTAGE-DENSITY-AWARE
// ============================================================================

import { prewarmSDN } from "./PulseOSSDNPrewarm-v30.js";
import { createPulseSkinReflex as PageScannerV12 } from "../../../../../_PROOF/PULSE-PROOF-REFLEX.js";



const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// META KERNEL + ROLE (v30-IMMORTAL++++)
// ============================================================================
export const PulseOSSpinalCordMeta = Object.freeze({
  id: "PulseOSSpinalCord",
  identity: "PulseOSSpinalCord-v30-IMMORTAL++++",
  layer: "SpinalCord",
  role: "OS_SPINAL_CORD",
  version: "30.0-IMMORTAL++++",
  epoch: "v30-IMMORTAL++++",
  evo: Object.freeze({
    spinalCordOrgan: true,
    osLevel: true,
    deterministic: true,
    driftProof: true,

    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    presenceAware: true,
    multiPresenceAware: true,
    meshAware: true,
    arteryAware: true,
    advantageFieldAware: true,
    presenceDensityAware: true,

    pulseBandAware: true,
    pulseSignalAware: true,

    chunkPrewarmAware: true,
    cachePrewarmAware: true,
    routePrewarmAware: true,
    impulsePrewarmAware: true,

    firewallAware: true,
    pageScannerAware: true,
    sdnPrewarmAware: true
  })
});

export const PulseRole = Object.freeze({
  type: "Organ",
  subsystem: "SpinalCord",
  layer: "SC",
  identity: PulseOSSpinalCordMeta.identity,
  version: PulseOSSpinalCordMeta.version,
  evo: PulseOSSpinalCordMeta.evo
});

// ============================================================================
// ARTERY HELPERS — v30 (shared semantics with membranes/presence)
// ============================================================================
function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function safePresenceDensity() {
  try {
    const v = PulseRealm.PULSE_PRESENCE_DENSITY;
    return typeof v === "number" ? clamp01(v) : 0;
  } catch {
    return 0;
  }
}

function safeAdvantageScore() {
  try {
    const v = PulseRealm.PULSE_ADVANTAGE_SCORE;
    return typeof v === "number" ? clamp01(v) : 0;
  } catch {
    return 0;
  }
}

// ============================================================================
// FACTORY — Dependencies injected by CNS Brain / Cortex
// ============================================================================
export function createPulseOSSpinalCord({
  Router,        // expected: route(type, payload)
  EventBus,      // expected: emit(event, payload)
  Brain,         // PulseOSBrain (for logging)
  Evolution,     // Evolution organ for lineage stamping
  CoreGovernor,  // optional: CoreGovernor (for context-only, no compute)
  BinaryOverlay, // optional: PulseBinaryOverlay (for context-only, no compute)
  Firewall,      // PulseChunks-v1 / firewall surface (optional but recommended)
  Chunker,       // route chunk/prewarm surface (context-only)
  PrewarmCache,  // cache prewarm surface (context-only)
  PresenceMesh,  // multi-presence mesh (context-only)
  MeshBus,       // optional: mesh event bus (metadata-only)
  PulseBand,     // optional: PulseBand (dual-band advantage conductor)
  PulseSignal,   // optional: PulseSignal (global pulse stream)
  log = console.log,
  warn = console.warn
}) {
  // --------------------------------------------------------------------------
  // SPINAL-LEVEL PAGESCANNER BRIDGE — ALWAYS-ON PASSIVE/ACTIVE
  // --------------------------------------------------------------------------
  const SpinalPageScanner = {
    emit(event, context = {}) {
      try {
        if (!PageScannerV12 || typeof PageScannerV12.buildDriftPacket !== "function") {
          return;
        }

        const packet = PageScannerV12.buildDriftPacket({
          event,
          layer: "SpinalCord",
          subsystem: "OS-Spine",
          spinalIdentity: PulseOSSpinalCordMeta.identity,
          ...context
        });

        if (
          PulseRealm.PageScannerAdapter &&
          typeof PulseRealm.PageScannerAdapter.onEvent === "function"
        ) {
          PulseRealm.PageScannerAdapter.onEvent(packet);
        }

        if (typeof packet.severity === "number") {
          Brain.log(
            "[SpinalCord/PageScanner] event:",
            event,
            "severity:",
            packet.severity,
            "tooFar:",
            !!packet.tooFar
          );
        }
      } catch {
        // Scanner must never break spine
      }
    }
  };

  // --------------------------------------------------------------------------
  // INTERNAL STATE — deterministic, no timestamps
  // --------------------------------------------------------------------------
  const SpinalState = {
    receptors: {
      binary: Object.create(null),     // { source: Set<handler> }
      symbolic: Object.create(null),   // { source: Set<handler> }
      dual: Object.create(null)        // { source: Set<handler> }
    },

    // Extensions + systems registry (Mesh, GPU, Proxy, Send, Earn, AI, etc.)
    extensions: Object.create(null), // { extensionId: { kind, meta } }
    systems: Object.create(null),    // { systemId: { kind, meta } }

    // Advantage + loop theory (pure counters / flags, no time)
    impulseCount: 0,
    loopCounters: {
      binary: 0,
      symbolic: 0,
      dual: 0
    },
    advantageField: {
      binaryHot: false,
      symbolicHot: false,
      dualHot: false,
      lastModeKind: "symbolic",
      confidenceBand: "neutral",
      pulseBandLane: "symbolic",
      presenceDensity: 0,
      advantageScore: 0
    },

    // multi-presence + prewarm surfaces (pure metadata)
    presence: {
      sessions: Object.create(null), // { presenceId: { extensionId, systemId, modeKind } }
      multiPresenceEnabled: true
    },
    prewarm: {
      chunkPrewarmEnabled: true,
      cachePrewarmEnabled: true,
      routePrewarmEnabled: true,
      impulsePrewarmEnabled: true
    },

    // v30: artery/pulse topology snapshots (metadata-only, no routing)
    arterySnapshot: null,
    pulseTopologySnapshot: null,

    healthScore: 1.0
  };

  // --------------------------------------------------------------------------
  // HELPERS — deterministic impulse signature
  // --------------------------------------------------------------------------
  function buildImpulseSignature({ source, modeKind, executionContext }) {
    const ec = executionContext || {};
    return [
      source || "unknown",
      modeKind || "symbolic",
      ec.binaryMode || "auto",
      ec.pipelineId || "",
      ec.sceneType || "",
      ec.workloadClass || "",
      ec.dispatchSignature || "",
      ec.shapeSignature || "",
      ec.extensionId || "",
      ec.systemId || "",
      ec.presenceId || ""
    ].join("|");
  }

  function updateLoopAndAdvantage(modeKind) {
    if (modeKind === "binary") SpinalState.loopCounters.binary += 1;
    else if (modeKind === "symbolic") SpinalState.loopCounters.symbolic += 1;
    else if (modeKind === "dual") SpinalState.loopCounters.dual += 1;

    SpinalState.advantageField.lastModeKind = modeKind;

    SpinalState.advantageField.binaryHot =
      SpinalState.loopCounters.binary > SpinalState.loopCounters.symbolic;
    SpinalState.advantageField.symbolicHot =
      SpinalState.loopCounters.symbolic > SpinalState.loopCounters.binary;
    SpinalState.advantageField.dualHot =
      SpinalState.loopCounters.dual > 0;

    const total =
      SpinalState.loopCounters.binary +
      SpinalState.loopCounters.symbolic +
      SpinalState.loopCounters.dual;

    SpinalState.advantageField.confidenceBand =
      total > 500 ? "max" :
      total > 200 ? "very-high" :
      total > 100 ? "high" :
      total > 20 ? "medium" :
      "neutral";

    // v30: presence/advantage density harmonized with global PULSE_* fields
    SpinalState.advantageField.presenceDensity = safePresenceDensity();
    SpinalState.advantageField.advantageScore = safeAdvantageScore();

    // v30: pulse-band lane selection (impulse-speed hint only)
    if (SpinalState.advantageField.binaryHot) {
      SpinalState.advantageField.pulseBandLane = "binary";
    } else if (SpinalState.advantageField.symbolicHot) {
      SpinalState.advantageField.pulseBandLane = "symbolic";
    } else {
      SpinalState.advantageField.pulseBandLane = "dual";
    }
  }

  // --------------------------------------------------------------------------
  // v30: SPINAL ADVANTAGE SNAPSHOT (for Brain/Expansion)
// --------------------------------------------------------------------------
  function getSpinalAdvantageSnapshot() {
    return {
      impulseCount: SpinalState.impulseCount,
      loopCounters: { ...SpinalState.loopCounters },
      advantageField: { ...SpinalState.advantageField }
    };
  }

  // --------------------------------------------------------------------------
  // v30: SPINAL PRESENCE SNAPSHOT (for Brain/Presence/Mesh)
// --------------------------------------------------------------------------
  function getSpinalPresenceSnapshot() {
    return {
      sessions: { ...SpinalState.presence.sessions },
      multiPresenceEnabled: SpinalState.presence.multiPresenceEnabled
    };
  }

  // --------------------------------------------------------------------------
  // v30: ARTERY + PULSE TOPOLOGY SNAPSHOT (metadata-only)
// --------------------------------------------------------------------------
  function applySpinalArterySnapshot(snapshot) {
    SpinalState.arterySnapshot = snapshot || null;
    SpinalPageScanner.emit("spinal-artery-snapshot-apply", {
      hasSnapshot: !!snapshot
    });
  }

  function applySpinalPulseTopologySnapshot(snapshot) {
    SpinalState.pulseTopologySnapshot = snapshot || null;
    SpinalPageScanner.emit("spinal-pulse-topology-snapshot-apply", {
      hasSnapshot: !!snapshot
    });
  }

  function getSpinalArterySnapshot() {
    return SpinalState.arterySnapshot || null;
  }

  function getSpinalPulseTopologySnapshot() {
    return SpinalState.pulseTopologySnapshot || null;
  }

  // --------------------------------------------------------------------------
  // PRESENCE REGISTRATION — multi-presence map (pure metadata)
// --------------------------------------------------------------------------
  function registerPresence(presenceId, { extensionId, systemId, modeKind } = {}) {
    if (!presenceId) return;
    SpinalState.presence.sessions[presenceId] = {
      extensionId: extensionId || null,
      systemId: systemId || null,
      modeKind: modeKind || "symbolic"
    };
    Evolution.recordLineage(`spinal-presence-register:${presenceId}`);
    Brain.log("[SpinalCord] Presence registered:", presenceId);

    SpinalPageScanner.emit("spinal-presence-register", {
      presenceId,
      extensionId: extensionId || null,
      systemId: systemId || null,
      modeKind: modeKind || "symbolic"
    });

    if (PresenceMesh.registerSpinePresence) {
      try {
        PresenceMesh.registerSpinePresence({
          presenceId,
          extensionId: extensionId || null,
          systemId: systemId || null,
          modeKind: modeKind || "symbolic"
        });
      } catch (err) {
        warn("[SpinalCord] PresenceMesh.registerSpinePresence failed:", err);
      }
    }
  }

  function unregisterPresence(presenceId) {
    if (!presenceId) return;
    if (SpinalState.presence.sessions[presenceId]) {
      delete SpinalState.presence.sessions[presenceId];
      Evolution.recordLineage(`spinal-presence-unregister:${presenceId}`);
      Brain.log("[SpinalCord] Presence unregistered:", presenceId);

      SpinalPageScanner.emit("spinal-presence-unregister", {
        presenceId
      });

      if (PresenceMesh.unregisterSpinePresence) {
        try {
          PresenceMesh.unregisterSpinePresence({ presenceId });
        } catch (err) {
          warn("[SpinalCord] PresenceMesh.unregisterSpinePresence failed:", err);
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // PREWARM HELPERS — chunk/cache/route/impulse prewarm (context-only)
// --------------------------------------------------------------------------
  function buildRoutePrewarmContext(source, impulse, impulseSignature) {
    const modeKind = impulse.modeKind || "symbolic";
    const executionContext = impulse.executionContext || {};
    const pressureSnapshot = impulse.pressureSnapshot || {};
    const presenceId = executionContext.presenceId || null;

    return {
      source,
      modeKind,
      impulseSignature,
      executionContext,
      pressureSnapshot,
      presenceId,
      spinalAdvantageField: SpinalState.advantageField,
      spinalLoopCounters: SpinalState.loopCounters,
      spinalExtensions: SpinalState.extensions,
      spinalSystems: SpinalState.systems,
      spinalPresence: SpinalState.presence,
      spinalArterySnapshot: SpinalState.arterySnapshot,
      spinalPulseTopologySnapshot: SpinalState.pulseTopologySnapshot
    };
  }

  function prewarmForImpulse(source, impulse, impulseSignature) {
    if (!SpinalState.prewarm.impulsePrewarmEnabled) return;

    const ctx = buildRoutePrewarmContext(source, impulse, impulseSignature);

    SpinalPageScanner.emit("spinal-prewarm-context", {
      source,
      modeKind: impulse.modeKind || "symbolic",
      presenceId: ctx.presenceId
    });

    if (SpinalState.prewarm.chunkPrewarmEnabled && Chunker.prewarmForRoute) {
      try {
        Chunker.prewarmForRoute(ctx);
        Evolution.recordLineage("spinal-prewarm-chunk");
      } catch (err) {
        warn("[SpinalCord] Chunker prewarm failed:", err);
      }
    }

    if (SpinalState.prewarm.cachePrewarmEnabled && PrewarmCache.prewarm) {
      try {
        PrewarmCache.prewarm(ctx);
        Evolution.recordLineage("spinal-prewarm-cache");
      } catch (err) {
        warn("[SpinalCord] Cache prewarm failed:", err);
      }
    }

    if (PresenceMesh.notifySpineImpulse) {
      try {
        PresenceMesh.notifySpineImpulse(ctx);
        Evolution.recordLineage("spinal-presence-impulse");
      } catch (err) {
        warn("[SpinalCord] PresenceMesh notify failed:", err);
      }
    }
  }

  // --------------------------------------------------------------------------
  // FIREWALL HELPERS — centralized checks
  // --------------------------------------------------------------------------
  function firewallBlocksRoute(routeType) {
    if (!Firewall || typeof Firewall.isBlockedRoute !== "function") return false;
    const blocked = !!Firewall.isBlockedRoute(routeType);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-route-block", {
        routeType
      });
    }

    return blocked;
  }

  function firewallBlocksSource(source) {
    if (!Firewall || typeof Firewall.isBlockedSource !== "function") return false;
    const blocked = !!Firewall.isBlockedSource(source);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-source-block", {
        source
      });
    }

    return blocked;
  }

  function firewallBlocksExtension(extensionId) {
    if (!Firewall || typeof Firewall.isBlockedExtension !== "function") return false;
    const blocked = !!Firewall.isBlockedExtension(extensionId);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-extension-block", {
        extensionId
      });
    }

    return blocked;
  }

  function firewallBlocksSystem(systemId) {
    if (!Firewall || typeof Firewall.isBlockedSystem !== "function") return false;
    const blocked = !!Firewall.isBlockedSystem(systemId);

    if (blocked) {
      SpinalPageScanner.emit("spinal-firewall-system-block", {
        systemId
      });
    }

    return blocked;
  }

  // --------------------------------------------------------------------------
  // EXTENSION / SYSTEM REGISTRATION — organism-wide attachment points
  // --------------------------------------------------------------------------
  function registerExtension(extensionId, kind, meta = {}) {
    if (!extensionId || !kind) return;

    if (firewallBlocksExtension(extensionId)) {
      warn("[SpinalCord] Firewall blocked unsafe extension:", extensionId, kind);
      Evolution.recordLineage(
        `spinal-firewall-ext-block:${extensionId}:${kind}`
      );
      return;
    }

    SpinalState.extensions[extensionId] = { kind, meta };
    Evolution.recordLineage(`spinal-ext-register:${extensionId}:${kind}`);
    log("[SpinalCord] Extension registered:", extensionId, kind);

    SpinalPageScanner.emit("spinal-extension-register", {
      extensionId,
      kind
    });
  }

  function registerSystem(systemId, kind, meta = {}) {
    if (!systemId || !kind) return;

    if (firewallBlocksSystem(systemId)) {
      warn("[SpinalCord] Firewall blocked unsafe system:", systemId, kind);
      Evolution.recordLineage(
        `spinal-firewall-sys-block:${systemId}:${kind}`
      );
      return;
    }

    SpinalState.systems[systemId] = { kind, meta };
    Evolution.recordLineage(`spinal-sys-register:${systemId}:${kind}`);
    log("[SpinalCord] System registered:", systemId, kind);

    SpinalPageScanner.emit("spinal-system-register", {
      systemId,
      kind
    });
  }

  // --------------------------------------------------------------------------
  // RECEPTOR REGISTRATION — strict separation + firewall
  // --------------------------------------------------------------------------
  function registerReceptor(modeKind, source, handler) {
    if (!source || typeof handler !== "function") return;
    if (!["binary", "symbolic", "dual"].includes(modeKind)) return;

    if (firewallBlocksSource(source)) {
      warn(
        "[SpinalCord] Firewall blocked unsafe receptor source:",
        source,
        modeKind
      );
      Evolution.recordLineage(
        `spinal-firewall-receptor-block:${modeKind}:${source}`
      );
      return;
    }

    const bucket = SpinalState.receptors[modeKind];
    if (!bucket[source]) bucket[source] = new Set();
    bucket[source].add(handler);

    Evolution.recordLineage(`spinal-register-${modeKind}:${source}`);
    log("[SpinalCord] Receptor registered:", modeKind, source);

    SpinalPageScanner.emit("spinal-receptor-register", {
      modeKind,
      source
    });
  }

  function unregisterReceptor(modeKind, source, handler) {
    const bucket = SpinalState.receptors[modeKind];
    if (!bucket || !bucket[source]) return;

    bucket[source].delete(handler);
    if (bucket[source].size === 0) delete bucket[source];

    Evolution.recordLineage(`spinal-unregister-${modeKind}:${source}`);
    log("[SpinalCord] Receptor unregistered:", modeKind, source);

    SpinalPageScanner.emit("spinal-receptor-unregister", {
      modeKind,
      source
    });
  }

  // --------------------------------------------------------------------------
  // IMPULSE EMISSION — strict dual-band conduction + advantage field + firewall
  // --------------------------------------------------------------------------
  function emitImpulse(source, impulse = {}) {
    const modeKind = impulse.modeKind || "symbolic";
    const executionContext = impulse.executionContext || {};
    const pressureSnapshot = impulse.pressureSnapshot || {};

    if (firewallBlocksSource(source)) {
      warn(
        "[SpinalCord] Firewall blocked unsafe impulse source:",
        source,
        modeKind
      );
      Evolution.recordLineage(
        `spinal-firewall-impulse-block:${modeKind}:${source}`
      );

      SpinalPageScanner.emit("spinal-impulse-blocked", {
        source,
        modeKind
      });

      return;
    }

    SpinalState.impulseCount += 1;
    updateLoopAndAdvantage(modeKind);

    const impulseSignature = buildImpulseSignature({
      source,
      modeKind,
      executionContext
    });

    SpinalPageScanner.emit("spinal-impulse", {
      source,
      modeKind,
      impulseSignature,
      advantageField: SpinalState.advantageField
    });

    prewarmForImpulse(source, impulse, impulseSignature);

    EventBus.emit("spinal:impulse", {
      source,
      modeKind,
      impulseSignature,
      executionContext,
      pressureSnapshot,
      advantageField: SpinalState.advantageField,
      loopCounters: SpinalState.loopCounters
    });

    if (MeshBus.emit) {
      try {
        MeshBus.emit("spine:impulse", {
          source,
          modeKind,
          impulseSignature,
          advantageField: SpinalState.advantageField
        });
      } catch {
        // mesh emission must never break spine
      }
    }

    // v30: PulseBand + PulseSignal hooks (metadata-only, no routing)
    if (PulseBand.emit) {
      try {
        PulseBand.emit("spineImpulse", {
          source,
          modeKind,
          impulseSignature,
          advantageField: SpinalState.advantageField
        });
      } catch {
        // PulseBand emission must never break spine
      }
    }

    if (PulseSignal.publish || PulseSignal.emit) {
      try {
        const fn = PulseSignal.publish || PulseSignal.emit;
        fn.call(PulseSignal, {
          kind: "spineImpulse",
          source,
          modeKind,
          impulseSignature,
          advantageField: SpinalState.advantageField
        });
      } catch {
        // PulseSignal emission must never break spine
      }
    }

    const bucket = SpinalState.receptors[modeKind];
    const set = bucket[source];

    if (set && set.size > 0) {
      for (const handler of set) {
        try {
          handler(impulse);
        } catch (err) {
          warn("[SpinalCord] Receptor handler error:", source, err);
          SpinalPageScanner.emit("spinal-receptor-error", {
            source,
            modeKind
          });
        }
      }
    }

    Evolution.recordLineage(`spinal-impulse-${modeKind}`);
  }

  // --------------------------------------------------------------------------
  // ROUTING — deterministic, no timestamps, route-root aware + firewall
  // --------------------------------------------------------------------------
  async function routeToOrgan(routeType, payload = {}) {
    Evolution.recordLineage("spinal-route-organ");

    if (firewallBlocksRoute(routeType)) {
      warn("[SpinalCord] Firewall blocked unsafe organ route:", routeType);
      Evolution.recordLineage(
        `spinal-firewall-route-organ-block:${routeType}`
      );
      EventBus.emit("spinal:route:block", {
        kind: "organ",
        routeType,
        reason: "firewallBlocked"
      });

      SpinalPageScanner.emit("spinal-route-organ-blocked", {
        routeType
      });

      return {
        error: "firewallBlocked",
        kind: "organ",
        routeType,
        reason: "unsafeRoute"
      };
    }

    if (!Router.route) {
      warn("[SpinalCord] Router missing route() — cannot route to organ.");

      SpinalPageScanner.emit("spinal-route-organ-router-missing", {
        routeType
      });

      return { error: "routerMissing", details: "Router.route not available" };
    }

    SpinalPageScanner.emit("spinal-route-organ-call", {
      routeType
    });

    const res = await Router.route(routeType, {
      ...payload,
      spinalContext: {
        impulseCount: SpinalState.impulseCount,
        advantageField: SpinalState.advantageField,
        loopCounters: SpinalState.loopCounters,
        extensions: SpinalState.extensions,
        systems: SpinalState.systems,
        presence: SpinalState.presence,
        arterySnapshot: SpinalState.arterySnapshot,
        pulseTopologySnapshot: SpinalState.pulseTopologySnapshot,
        coreGovernorAware: !!CoreGovernor,
        binaryOverlayAware: !!BinaryOverlay
      }
    });

    EventBus.emit("spinal:route:organ", { routeType, payload, res });

    SpinalPageScanner.emit("spinal-route-organ-response", {
      routeType
    });

    return res;
  }

  async function routeToBackend(endpointType, payload = {}) {
    Evolution.recordLineage("spinal-route-backend");

    if (firewallBlocksRoute(endpointType)) {
      warn(
        "[SpinalCord] Firewall blocked unsafe backend route:",
        endpointType
      );
      Evolution.recordLineage(
        `spinal-firewall-route-backend-block:${endpointType}`
      );
      EventBus.emit("spinal:route:block", {
        kind: "backend",
        routeType: endpointType,
        reason: "firewallBlocked"
      });

      SpinalPageScanner.emit("spinal-route-backend-blocked", {
        endpointType
      });

      return {
        error: "firewallBlocked",
        kind: "backend",
        routeType: endpointType,
        reason: "unsafeRoute"
      };
    }

    if (!Router.route) {
      warn("[SpinalCord] Router missing route() — cannot route to backend.");

      SpinalPageScanner.emit("spinal-route-backend-router-missing", {
        endpointType
      });

      return { error: "routerMissing", details: "Router.route not available" };
    }

    SpinalPageScanner.emit("spinal-route-backend-call", {
      endpointType
    });

    const res = await Router.route(endpointType, {
      ...payload,
      spinalContext: {
        impulseCount: SpinalState.impulseCount,
        advantageField: SpinalState.advantageField,
        loopCounters: SpinalState.loopCounters,
        extensions: SpinalState.extensions,
        systems: SpinalState.systems,
        presence: SpinalState.presence,
        arterySnapshot: SpinalState.arterySnapshot,
        pulseTopologySnapshot: SpinalState.pulseTopologySnapshot,
        coreGovernorAware: !!CoreGovernor,
        binaryOverlayAware: !!BinaryOverlay
      }
    });

    EventBus.emit("spinal:route:backend", { endpointType, payload, res });

    SpinalPageScanner.emit("spinal-route-backend-response", {
      endpointType
    });

    return res;
  }

  // --------------------------------------------------------------------------
  // HEALTH ENGINE — deterministic, no timestamps
  // --------------------------------------------------------------------------
  function updateHealth(score) {
    SpinalState.healthScore = score;
    EventBus.emit("spinal:health:update", { score });
    Evolution.updateOrganHealth("PulseOSSpinalCord", score);

    SpinalPageScanner.emit("spinal-health-update", {
      score
    });
  }

  function getHealth() {
    return SpinalState.healthScore;
  }

  // --------------------------------------------------------------------------
  // PUBLIC SPINAL CORD SURFACE
  // --------------------------------------------------------------------------
  const PulseOSSpinalCord = {
    PulseRole,
    SpinalState,
    meta: PulseOSSpinalCordMeta,

    // Extensions / systems
    registerExtension,
    registerSystem,

    // Presence
    registerPresence,
    unregisterPresence,
    getSpinalPresenceSnapshot,

    // Receptors
    registerReceptor,
    unregisterReceptor,

    // Impulses
    emitImpulse,

    // Routing
    routeToOrgan,
    routeToBackend,

    // Health
    updateHealth,
    getHealth,

    // Advantage + artery + topology snapshots
    getSpinalAdvantageSnapshot,
    applySpinalArterySnapshot,
    applySpinalPulseTopologySnapshot,
    getSpinalArterySnapshot,
    getSpinalPulseTopologySnapshot
  };

  // --------------------------------------------------------------------------
  // SDN PREWARM ENGINE — Spinal Reflex Ignition (v30-IMMORTAL++++)
// --------------------------------------------------------------------------
  try {
    prewarmSDN(PulseOSSpinalCord);
    Brain.log(
      "[PulseOSSpinalCord] SDN prewarm complete (reflex arcs hot, v30-IMMORTAL++++, impulse-speed)."
    );

    SpinalPageScanner.emit("spinal-sdn-prewarm-complete", {});
  } catch (err) {
    warn("[PulseOSSpinalCord] SDN prewarm failed:", err);

    SpinalPageScanner.emit("spinal-sdn-prewarm-error", {});
  }

  Brain.log(
    "[PulseOSSpinalCord v30-IMMORTAL++++] Initialized organism-wide dual-band spinal cord with firewall gating, chunk/cache/route/impulse prewarm, multi-presence spine, SDN prewarm, artery/topology snapshots, mesh-aware impulses, PulseBand/PulseSignal hooks, and PageScanner spine-level intel."
  );
  Evolution.recordLineage("spinal-init-v30-IMMORTAL++++");

  SpinalPageScanner.emit("spinal-init", { version: PulseOSSpinalCordMeta.version });

  return PulseOSSpinalCord;
}

export default {
  meta: PulseOSSpinalCordMeta,
  createPulseOSSpinalCord
};

// ============================================================================
//  PulseOSSpinalCord — IMMORTAL ORGAN (v30-IMMORTAL-SPINE++++)
// ============================================================================

export const PulseOSSpinalCord = (() => {

  // -------------------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // -------------------------------------------------------------------------
  const lane = {
    // deps
    Router: null,
    EventBus: null,
    Brain: null,
    Evolution: null,
    CoreGovernor: null,
    BinaryOverlay: null,
    Firewall: null,
    Chunker: null,
    PrewarmCache: null,
    PresenceMesh: null,
    MeshBus: null,
    PulseBand: null,
    PulseSignal: null,
    log: console.log,
    warn: console.warn,

    // spinal state
    SpinalState: {
      receptors: {
        binary: Object.create(null),
        symbolic: Object.create(null),
        dual: Object.create(null)
      },
      extensions: Object.create(null),
      systems: Object.create(null),
      impulseCount: 0,
      loopCounters: { binary: 0, symbolic: 0, dual: 0 },
      advantageField: {
        binaryHot: false,
        symbolicHot: false,
        dualHot: false,
        lastModeKind: "symbolic",
        confidenceBand: "neutral",
        pulseBandLane: "symbolic",
        presenceDensity: 0,
        advantageScore: 0
      },
      presence: {
        sessions: Object.create(null),
        multiPresenceEnabled: true
      },
      prewarm: {
        chunkPrewarmEnabled: true,
        cachePrewarmEnabled: true,
        routePrewarmEnabled: true,
        impulsePrewarmEnabled: true
      },
      arterySnapshot: null,
      pulseTopologySnapshot: null,
      healthScore: 1.0
    },

    BAND_FAMILY: {
      PULSEBAND: "PulseBand",
      MESHBAND: "meshband"
    },

    GOVERNOR_CONTEXT_V24: {
      epoch: "v30-IMMORTAL-SPINE++++",
      deterministic: true,
      driftProof: true,
      dualBandAware: true,
      bandFamilyAware: true,
      presenceAware: true,
      meshAware: true,
      advantageAware: true
    },

    SpinalPageScanner: null,

    // governor / guard state
    instanceRegistry: new Map(),
    activeOrgans: new Set(),
    pulseVisits: new Map(),
    activeModules: new Set()
  };

  // -------------------------------------------------------------------------
  // PAGE SCANNER BRIDGE
  // -------------------------------------------------------------------------
  const buildSpinalPageScanner = () => ({
    emit: (event, context = {}) => {
      try {
        if (!PageScannerV12 || typeof PageScannerV12.buildDriftPacket !== "function") return;

        const packet = PageScannerV12.buildDriftPacket({
          event,
          layer: "SpinalCord",
          subsystem: "OS-Spine",
          spinalIdentity: PulseOSSpinalCordMeta.identity,
          ...context
        });

        if (
            PulseRealm.PageScannerAdapter &&
            typeof PulseRealm.PageScannerAdapter.onEvent === "function") {
          PulseRealm.PageScannerAdapter.onEvent(packet);
        }

        if (typeof packet.severity === "number") {
          lane.Brain.log(
            "[SpinalCord/PageScanner] event:",
            event,
            "severity:",
            packet.severity,
            "tooFar:",
            !!packet.tooFar
          );
        }
      } catch {}
    }
  });

  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  const init = ({
    Router,
    EventBus,
    Brain,
    Evolution,
    CoreGovernor,
    BinaryOverlay,
    Firewall,
    Chunker,
    PrewarmCache,
    PresenceMesh,
    MeshBus,
    PulseBand,
    PulseSignal,
    log = console.log,
    warn = console.warn
  } = {}) => {

    lane.Router = Router;
    lane.EventBus = EventBus;
    lane.Brain = Brain;
    lane.Evolution = Evolution;
    lane.CoreGovernor = CoreGovernor;
    lane.BinaryOverlay = BinaryOverlay;
    lane.Firewall = Firewall;
    lane.Chunker = Chunker;
    lane.PrewarmCache = PrewarmCache;
    lane.PresenceMesh = PresenceMesh;
    lane.MeshBus = MeshBus;
    lane.PulseBand = PulseBand;
    lane.PulseSignal = PulseSignal;
    lane.log = log;
    lane.warn = warn;

    lane.SpinalPageScanner = buildSpinalPageScanner();

    try {
      prewarmSDN(PulseOSSpinalCord);
      lane.Brain.log(
        "[PulseOSSpinalCord] SDN prewarm complete (v30-IMMORTAL++++)."
      );
      lane.SpinalPageScanner.emit("spinal-sdn-prewarm-complete", {});
    } catch (err) {
      lane.warn("[SpinalCord] SDN prewarm failed:", err);
      lane.SpinalPageScanner.emit("spinal-sdn-prewarm-error", {});
    }

    lane.Brain.log(
      "[PulseOSSpinalCord v30-IMMORTAL++++] Initialized dual-band spinal cord."
    );
    lane.Evolution.recordLineage("spinal-init-v30-IMMORTAL++++");

    lane.SpinalPageScanner.emit("spinal-init", {
      version: PulseOSSpinalCordMeta.version
    });
  };

  // -------------------------------------------------------------------------
  // BAND HELPERS
  // -------------------------------------------------------------------------
  const normalizeBand = (band) => {
    const b = String(band || "dual").toLowerCase();
    if (b === "binary" || b === "bit" || b === "band_binary") return "binary";
    if (b === "symbolic" || b === "band_symbolic") return "symbolic";
    return "dual";
  };

  const normalizeBandFamily = (family) => {
    const f = String(family || lane.BAND_FAMILY.PULSEBAND).toLowerCase();
    return f === lane.BAND_FAMILY.MESHBAND
      ? lane.BAND_FAMILY.MESHBAND
      : lane.BAND_FAMILY.PULSEBAND;
  };

  const classifyBand = (pulse) =>
    normalizeBand(pulse.band || pulse.mode);

  const classifyBandFamily = (pulse) =>
    normalizeBandFamily(pulse.bandFamily || pulse.meshBand);

  // -------------------------------------------------------------------------
  // CORE HELPERS
  // -------------------------------------------------------------------------
   const getPulseId = (pulse) =>
    pulse.pulseId ||
    pulse.id ||
    pulse.tickId ||
    pulse.jobId ||
    "UNKNOWN_PULSE";
  const pulseId = getPulseId;

  const getLineageDepth = (pulse) => {
    const lineage = pulse.lineage || pulse.parentLineage || [];
    return Array.isArray(lineage) ? lineage.length : 0;
  };

  const getReturnToDepth = (pulse) => {
    const rt = pulse.returnTo;
    if (!rt) return 0;
    if (Array.isArray(rt)) return rt.length;
    return 1;
  };

  const getFallbackDepth = (pulse) => {
    const fb = pulse.fallback || pulse.fallbackDepth;
    if (!fb) return 0;
    if (typeof fb === "number") return fb;
    return 1;
  };

  const getInstanceKey = (organName, pulse) =>
    `${organName}::${getPulseId(pulse)}`;

  // -------------------------------------------------------------------------
  // GOVERNOR META
  // -------------------------------------------------------------------------
  const buildGovernorMeta = (pulse, instanceContext) => {
    const advantage = pulse.advantage || {};
    const presence = pulse.presence || {};
    const routeName = pulse.routeName || null;

    return {
      routeName,
      advantageTier: advantage.tier || "unknown",
      deviceTier: advantage.deviceTier || "unknown",
      networkTier: advantage.networkTier || "unknown",
      gpuTier: advantage.gpuTier || "unknown",
      presenceCritical: !!presence.critical,
      presenceFieldRequested: !!presence.field,
      meshPresenceRequested: !!presence.mesh,
      instanceIndex: instanceContext.instanceIndex,
      totalInstances: instanceContext.totalInstances
    };
  };

  // -------------------------------------------------------------------------
  // OPTIONAL EARN REFLEX
  // -------------------------------------------------------------------------
  const maybeEmitAndRouteEarnReflex = async (event, pulse, instanceContext) => {
    try {
      if (typeof window === "undefined") return;

      const reflex = PulseRealm.PulseEarnReflex;
      if (!reflex || typeof reflex.fromGovernorEvent !== "function") return;

      const { earnReflex } = await reflex.fromGovernorEvent(
        event,
        pulse,
        instanceContext
      );

      const router = PulseRealm.PulseEarnReflexRouter;
      const earn = PulseRealm.PulseWorld.Earn;

      if (router && typeof router.route === "function" && earn) {
        router.route(earnReflex, earn);
      }
    } catch {}
  };

  // -------------------------------------------------------------------------
  // ORGAN GUARD
  // -------------------------------------------------------------------------
  const withOrganGuard = async (organName, pulse, fn) => {
    const pulseId = getPulseId(pulse);
    const instanceKey = getInstanceKey(organName, pulse);
    const band = classifyBand(pulse);
    const bandFamily = classifyBandFamily(pulse);
    const dnaTag = pulse.dnaTag || null;
    const meshTag = pulse.meshTag || null;

    let state = lane.instanceRegistry.get(instanceKey);
    if (!state) {
      state = { count: 0 };
      lane.instanceRegistry.set(instanceKey, state);
    }
    state.count += 1;

    const instanceIndex = state.count - 1;
    const totalInstances = state.count;

    const instanceContext = {
      ...lane.GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceKey,
      instanceIndex,
      totalInstances
    };

    const governorMeta = buildGovernorMeta(pulse, instanceContext);

    const buildEvent = (reason, extra = {}) => ({
      ok: false,
      blocked: true,
      reason,
      ...lane.GOVERNOR_CONTEXT_V24,
      band,
      bandFamily,
      dnaTag,
      meshTag,
      organ: organName,
      pulseId,
      instanceContext,
      governorMeta,
      ...extra
    });

    if (lane.activeOrgans.has(organName)) {
      const event = buildEvent("organ_reentry");
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    let visits = lane.pulseVisits.get(pulseId);
    if (!visits) {
      visits = new Set();
      lane.pulseVisits.set(pulseId, visits);
    } else if (visits.has(organName)) {
      const event = buildEvent("organ_already_visited_for_pulse");
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    const lineageDepth = getLineageDepth(pulse);
    if (lineageDepth > 24) {
      const event = buildEvent("lineage_depth_exceeded", { lineageDepth });
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    const returnToDepth = getReturnToDepth(pulse);
    if (returnToDepth > 12) {
      const event = buildEvent("return_to_depth_exceeded", { returnToDepth });
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    const fallbackDepth = getFallbackDepth(pulse);
    if (fallbackDepth > 2) {
      const event = buildEvent("fallback_depth_exceeded", { fallbackDepth });
      await maybeEmitAndRouteEarnReflex(event, pulse, instanceContext);
      return event;
    }

    lane.activeOrgans.add(organName);
    visits.add(organName);

    try {
      const result = await fn(instanceContext);
      return {
        ok: true,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        band,
        bandFamily,
        dnaTag,
        meshTag,
        organ: organName,
        pulseId,
        instanceContext,
        governorMeta,
        result
      };
    } catch (error) {
      return {
        ok: false,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        band,
        bandFamily,
        dnaTag,
        meshTag,
        organ: organName,
        pulseId,
        instanceContext,
        governorMeta,
        error
      };
    } finally {
      lane.activeOrgans.delete(organName);
    }
  };

  // -------------------------------------------------------------------------
  // MODULE INIT GUARD
  // -------------------------------------------------------------------------
  const withModuleInitGuard = async (moduleName, fn) => {
    if (lane.activeModules.has(moduleName)) {
      return {
        ok: false,
        blocked: true,
        reason: "module_init_reentry",
        ...lane.GOVERNOR_CONTEXT_V24,
        module: moduleName
      };
    }

    lane.activeModules.add(moduleName);
    try {
      const result = await fn();
      return {
        ok: true,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        module: moduleName,
        result
      };
    } catch (error) {
      return {
        ok: false,
        blocked: false,
        ...lane.GOVERNOR_CONTEXT_V24,
        module: moduleName,
        error
      };
    } finally {
      lane.activeModules.delete(moduleName);
    }
  };

  // -------------------------------------------------------------------------
  // EXPORT IMMORTAL SURFACE
  // -------------------------------------------------------------------------
  return {
    init,

    // state / context
    getSpinalState: () => lane.SpinalState,
    getGovernorContextV24: () => lane.GOVERNOR_CONTEXT_V24,
    getBandFamily: () => lane.BAND_FAMILY,
    getSpinalPageScanner: () => lane.SpinalPageScanner,

    // band helpers
    normalizeBand,
    normalizeBandFamily,
    classifyBand,
    classifyBandFamily,

    // core helpers
    getPulseId,
    pulseId,
    getLineageDepth,
    getReturnToDepth,
    getFallbackDepth,
    getInstanceKey,

    // governor meta
    buildGovernorMeta,

    // guards / reflex
    maybeEmitAndRouteEarnReflex,
    withOrganGuard,
    withModuleInitGuard
  };

})();

PulseRealm.OSSpinalCord = {
  PulseOSSpinalCord,
  createPulseOSSpinalCord,
  PulseOSSpinalCordMeta,
  PulseRole
}
PulseRealm.PulseOSSpinalCordBuild = createPulseOSSpinalCord;
PulseRealm.PulseOSSpinalCord = PulseOSSpinalCord;
PulseRealm.PulseSpinalCord = PulseOSSpinalCord;