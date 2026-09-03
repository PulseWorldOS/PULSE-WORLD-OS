// ============================================================================
// FILE: /PULSE-OS/PulseSDN-Prewarm-v32-IMMORTAL-INTEL-HYBRID.js
// LAYER: SDN PREWARM ENGINE (Spinal Reflex Ignition, v32 IMMORTAL-INTEL-HYBRID)
// ============================================================================
//
// ROLE:
//   • Prewarm SDN (Spinal Distributed Network) internal pathways.
//   • Warm reflex arcs, impulse routes, extension registry, dual-band paths,
//     pressure snapshots, dispatch signatures, fallback routes, presence paths,
//     mesh paths, organism-mesh arteries, advantage cascades, Earn/value paths,
//     GPU/Send/Proxy/Router/Expansion paths, and route-prewarm surfaces.
//   • NO cognition, NO evolution, NO external mutation.
//   • Pure, deterministic, CNS warm-up.
//   • v32: artery-aware, mesh-aware, advantage-aware, organism-mesh-aware,
//     presenceDensity/advantageScore-aware, multi-presence-aware, dual-band.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






console.log(
  "🧬 PULSE WORLD PREWARM V32 - %c[PulseOSSDN::Prewarm] Spinal Distributed Network for the Organism Starting..",
  "color:#EGAF5C; font-weight:bold; font-family:monospace;"
);

export const SDNPrewarmMeta = Object.freeze({
  id: "PulseSDNPrewarm",
  layer: "SPINAL",
  role: "SDN_PREWARM_ENGINE",
  version: "32.0-IMMORTAL-INTEL-HYBRID",
  epoch: "v32-IMMORTAL-INTEL-HYBRID",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroRandomness: true,
    zeroTimers: true,
    zeroNetwork: true,
    arteryAware: true,
    meshAware: true,
    presenceAware: true,
    advantageAware: true,
    dualBandAware: true,
    organismMeshAware: true,
    routePrewarmAware: true
  })
});

// ============================================================================
// INTERNAL HELPERS — PURE, DETERMINISTIC, NO TIME, NO RANDOMNESS
// ============================================================================

function safeHasFn(obj, name) {
  return !!(obj && typeof obj[name] === "function");
}

function emitImpulseSafe(SDN, source, packet) {
  if (!safeHasFn(SDN, "emitImpulse")) return;
  try {
    SDN.emitImpulse(source, packet);
  } catch (err) {
    console.error("[SDN Prewarm v32-IMMORTAL-INTEL-HYBRID] emitImpulse failed:", source, err);
  }
}

function registerExtensionSafe(SDN, name, kind, meta) {
  if (!safeHasFn(SDN, "registerExtension")) return;
  try {
    SDN.registerExtension(name, kind, meta);
  } catch (err) {
    console.error("[SDN Prewarm v32-IMMORTAL-INTEL-HYBRID] registerExtension failed:", name, err);
  }
}

// optional global fields for presence/advantage harmonization
function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function safePresenceDensity() {
  try {
    
      const v = PulseRealm.PULSE_PRESENCE_DENSITY;
      if (typeof v === "number") return clamp01(v);
    
  } catch {}
  return 0;
}

function safeAdvantageScore() {
  try {
   
      const v = PulseRealm.PULSE_ADVANTAGE_SCORE;
      if (typeof v === "number") return clamp01(v);
    
  } catch {}
  return 0;
}

// ============================================================================
// PREWARM ENGINE — v32 IMMORTAL-INTEL-HYBRID
// ============================================================================

/**
 * Prewarm SDN (Spinal Distributed Network) internal pathways.
 *
 * @param {object} SDN - The spinal cord / SDN instance.
 *   Expected (but not required) methods:
 *     - registerExtension(name, kind, meta)
 *     - emitImpulse(source, packet)
 */

export function prewarmSDN(SDN) {
  // ============================================================
  // 0) SAFE INSTANCE CREATION (ALLOW PASSED OR AUTO-CREATE)
  // ============================================================
  let instance = SDN;

  try {
   

      if (typeof PulseSDN === "function") {
        instance = PulseSDN();
      } else {
        // Minimal fallback so nothing hard-crashes
        instance = {
          on() {},
          emitImpulse() {},
          getHistory() { return []; }
        };
        console.warn("[SDN Prewarm v34-IMMORTAL-INTEL-HYBRID] PulseSDN() missing — using minimal fallback SDN.");
      }
    
  } catch (err) {
    console.error("[SDN Prewarm v34-IMMORTAL-INTEL-HYBRID] SDN creation failed, using fallback SDN.", err);
    instance = {
      on() {},
      emitImpulse() {},
      getHistory() { return []; }
    };
  }

  // Attach globally for device/OS layer
  PulseRealm.PulseSDN = instance;

  const source = "PrewarmEngine-v34-IMMORTAL-INTEL-HYBRID";
  const extVersion = (SDNPrewarmMeta.version) || "v34";
  const presenceDensity = (typeof safePresenceDensity === "function" ? safePresenceDensity() : 0);
  const advantageScore = (typeof safeAdvantageScore === "function" ? safeAdvantageScore() : 0);

  try {
    // =========================================================================
    // 1) EXTENSION REGISTRY — v34 IMMORTAL-INTEL-HYBRID
    // =========================================================================
    const extensionsToPrewarm = [
      {
        name: "Understanding",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "cortical-opener",
          layer: "A3",
          binaryFirst: true,
          hybridLoader: true,
          dualBandAware: true,
          presenceAware: true,
          advantageFieldAware: true,
          arteryAware: true
        }
      },
      {
        name: "Mesh",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "network-organ",
          layer: "M1",
          presenceAware: true,
          dualBandAware: true,
          meshAware: true,
          meshTopologyAware: true,
          organismMeshAware: true
        }
      },
      {
        name: "Presence",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "presence-field-organ",
          layer: "P1",
          presenceFieldAware: true,
          dualBandPresence: true,
          multiPresenceAware: true,
          presenceDensityAware: true
        }
      },
      {
        name: "Send",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "output-organ",
          layer: "O1",
          presenceAware: true,
          dualBandAware: true,
          valuePathwayAware: true
        }
      },
      {
        name: "Earn",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "value-organ",
          layer: "V1",
          presenceAware: true,
          dualBandAware: true,
          advantageFieldAware: true,
          earnOrganContract: "PulseEarn-v31-IMMORTAL-INTEL-HYBRID"
        }
      },
      {
        name: "GPU",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "binary-render-organ",
          layer: "G1",
          binaryAware: true,
          dualBandAware: true,
          binaryPostRenderOnly: true
        }
      },
      {
        name: "Proxy",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "proxy-organ",
          layer: "PX",
          routingAware: true,
          pulseTopologyAware: true
        }
      },
      {
        name: "Router",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "route-root-organ",
          layer: "R0",
          routeRoot: true,
          routeChainAware: true
        }
      },
      {
        name: "OrganismMesh",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "organism-mesh-organ",
          layer: "OM",
          organismMeshArteryAware: true,
          meshTopologyAware: true
        }
      },
      {
        name: "Expansion",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "world-expansion-organ",
          layer: "EX",
          worldLensAware: true,
          advantageFieldAware: true
        }
      },
      {
        name: "Diagnostics",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "diagnostics-organ",
          layer: "DX",
          pressureAware: true,
          dispatchAware: true,
          arteryAware: true
        }
      },
      {
        name: "WorldLens",
        kind: "extension",
        meta: {
          version: extVersion,
          role: "world-lens-organ",
          layer: "WL",
          worldLensAware: true,
          offlineSafe: true
        }
      }
    ];

    for (const ext of extensionsToPrewarm) {
      try {
        if (typeof registerExtensionSafe === "function") {
          registerExtensionSafe(instance, ext.name, ext.kind, ext.meta);
        }
      } catch (err) {
        console.warn("[SDN Prewarm v34-IMMORTAL-INTEL-HYBRID] Extension registration failed:", ext.name, err);
      }
    }

    // =========================================================================
    // 2) DUAL-BAND IMPULSES — CORE + MESH + ORGANISM-MESH
    // =========================================================================
    const dualBandImpulses = [
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "prewarm",
            workloadClass: "dual-band-core",
            dispatchSignature: "SDN.dual-band.core.v32",
            shapeSignature: "CORE-A1",
            extensionId: "Understanding",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "dual",
            presenceDensity,
            advantageScore
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "mesh-prewarm",
            workloadClass: "mesh-dual-band",
            dispatchSignature: "SDN.mesh.dual-band.v32",
            shapeSignature: "MESH-A1",
            extensionId: "Mesh",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "dual",
            presenceDensity,
            advantageScore
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "organism-mesh-prewarm",
            workloadClass: "organism-mesh-dual",
            dispatchSignature: "SDN.organismMesh.dual-band.v32",
            shapeSignature: "OM-A1",
            extensionId: "OrganismMesh",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "dual",
            presenceDensity,
            advantageScore
          }
        }
      }
    ];

    // =========================================================================
    // 3) PRESENCE + MULTI-PRESENCE + MESH PRESENCE
    // =========================================================================
    const presenceMeshImpulses = [
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "presence-prewarm",
            workloadClass: "presence-field",
            dispatchSignature: "SDN.presence.field.v32",
            shapeSignature: "P1",
            extensionId: "Presence",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            presence: true,
            presenceDensity
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "presence-multi-prewarm",
            workloadClass: "multi-presence-field",
            dispatchSignature: "SDN.presence.multi.v32",
            shapeSignature: "P1-MULTI",
            extensionId: "Presence",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            presence: true,
            presenceDensity
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "mesh-presence-prewarm",
            workloadClass: "mesh-presence",
            dispatchSignature: "SDN.mesh.presence.v32",
            shapeSignature: "MESH-P1",
            extensionId: "Mesh",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            presence: true,
            presenceDensity
          }
        }
      }
    ];

    // =========================================================================
    // 4) ADVANTAGE FIELD + CASCADE + VALUE/EARN PATHWAYS
    // =========================================================================
    const advantageImpulses = [
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "advantage-prewarm",
            workloadClass: "advantage-field",
            dispatchSignature: "SDN.advantage.field.v32",
            shapeSignature: "ADV1",
            extensionId: "Earn",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            advantage: true,
            advantageScore
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "advantage-cascade",
            workloadClass: "advantage-cascade",
            dispatchSignature: "SDN.advantage.cascade.v32",
            shapeSignature: "ADV2",
            extensionId: "Earn",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            advantage: true,
            advantageScore
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "value-path-prewarm",
            workloadClass: "value-path",
            dispatchSignature: "SDN.value.path.v32",
            shapeSignature: "VAL1",
            extensionId: "Earn",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            advantage: true,
            advantageScore
          }
        }
      }
    ];

    // =========================================================================
    // 5) GPU / SEND / PROXY / ROUTER / EXPANSION / WORLD-LENS
    // =========================================================================
    const systemImpulses = [
      {
        source,
        packet: {
          modeKind: "binary",
          executionContext: {
            sceneType: "gpu-prewarm",
            workloadClass: "gpu-path",
            dispatchSignature: "SDN.gpu.prewarm.v32",
            shapeSignature: "GPU1",
            extensionId: "GPU",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "binary"
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "symbolic",
          executionContext: {
            sceneType: "send-prewarm",
            workloadClass: "send-path",
            dispatchSignature: "SDN.send.prewarm.v32",
            shapeSignature: "SEND1",
            extensionId: "Send",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "symbolic"
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "router-prewarm",
            workloadClass: "router-path",
            dispatchSignature: "SDN.router.prewarm.v32",
            shapeSignature: "R0",
            extensionId: "Router",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "dual"
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "proxy-prewarm",
            workloadClass: "proxy-path",
            dispatchSignature: "SDN.proxy.prewarm.v32",
            shapeSignature: "PX1",
            extensionId: "Proxy",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "dual"
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "expansion-prewarm",
            workloadClass: "expansion-path",
            dispatchSignature: "SDN.expansion.prewarm.v32",
            shapeSignature: "EX1",
            extensionId: "Expansion",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "dual"
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "symbolic",
          executionContext: {
            sceneType: "world-lens-prewarm",
            workloadClass: "world-lens-path",
            dispatchSignature: "SDN.worldLens.prewarm.v32",
            shapeSignature: "WL1",
            extensionId: "WorldLens",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            band: "symbolic"
          }
        }
      }
    ];

    // =========================================================================
    // 6) REFLEX ARCS — TOUCH / IDENTITY-SAFE / PRESENCE-SAFE
    // =========================================================================
    const reflexImpulses = [
      {
        source,
        packet: {
          modeKind: "reflex",
          executionContext: {
            sceneType: "reflex-prewarm",
            workloadClass: "touch-reflex",
            dispatchSignature: "SDN.reflex.touch.v32",
            shapeSignature: "R1",
            extensionId: "Understanding",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            reflex: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "reflex",
          executionContext: {
            sceneType: "reflex-prewarm",
            workloadClass: "identity-safe-reflex",
            dispatchSignature: "SDN.reflex.identity-safe.v32",
            shapeSignature: "R2",
            extensionId: "Understanding",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            reflex: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "reflex",
          executionContext: {
            sceneType: "reflex-prewarm",
            workloadClass: "presence-safe-reflex",
            dispatchSignature: "SDN.reflex.presence-safe.v32",
            shapeSignature: "R3",
            extensionId: "Presence",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            reflex: true
          }
        }
      }
    ];

    // =========================================================================
    // 7) FALLBACK PATHS — BINARY ↔ SYMBOLIC, PRESENCE-AWARE
    // =========================================================================
    const fallbackImpulses = [
      {
        source,
        packet: {
          modeKind: "fallback",
          executionContext: {
            sceneType: "fallback-prewarm",
            workloadClass: "binary-fallback",
            dispatchSignature: "SDN.fallback.binary.v32",
            shapeSignature: "F1",
            extensionId: "Understanding",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            fallback: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "fallback",
          executionContext: {
            sceneType: "fallback-prewarm",
            workloadClass: "symbolic-fallback",
            dispatchSignature: "SDN.fallback.symbolic.v32",
            shapeSignature: "F2",
            extensionId: "Understanding",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            fallback: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "fallback",
          executionContext: {
            sceneType: "fallback-prewarm",
            workloadClass: "presence-fallback",
            dispatchSignature: "SDN.fallback.presence.v32",
            shapeSignature: "F3",
            extensionId: "Presence",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true,
            fallback: true
          }
        }
      }
    ];

    // =========================================================================
    // 8) DISPATCH SIGNATURES / WORKLOAD CLASSES — CORTEX / MESH / PRESENCE / EARN
    // =========================================================================
    const dispatchImpulses = [
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "cortex-boot",
            workloadClass: "cortex-init",
            dispatchSignature: "Cortex.v32-IMMORTAL-INTEL-HYBRID",
            shapeSignature: "CTX1",
            extensionId: "Understanding",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "mesh-boot",
            workloadClass: "mesh-boot",
            dispatchSignature: "Mesh.v32-IMMORTAL-INTEL-HYBRID",
            shapeSignature: "M1-layer",
            extensionId: "Mesh",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "presence-boot",
            workloadClass: "presence-boot",
            dispatchSignature: "Presence.v32-IMMORTAL-INTEL-HYBRID",
            shapeSignature: "P1-layer",
            extensionId: "Presence",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true
          }
        }
      },
      {
        source,
        packet: {
          modeKind: "dual",
          executionContext: {
            sceneType: "earn-boot",
            workloadClass: "earn-boot",
            dispatchSignature: "Earn.v32-IMMORTAL-INTEL-HYBRID",
            shapeSignature: "V1-layer",
            extensionId: "Earn",
            identityKind: "none"
          },
          pressureSnapshot: {
            runtime: "prewarm",
            online: true
          }
        }
      }
    ];

    // =========================================================================
    // EMIT ALL IMPULSE GROUPS WITH SAFETY
    // =========================================================================
    const allImpulseGroups = [
      dualBandImpulses,
      presenceMeshImpulses,
      advantageImpulses,
      systemImpulses,
      reflexImpulses,
      fallbackImpulses,
      dispatchImpulses
    ];

    for (const group of allImpulseGroups) {
      for (const impulse of group) {
        try {
          if (typeof emitImpulseSafe === "function") {
            emitImpulseSafe(instance, impulse.source, impulse.packet);
          }
        } catch (err) {
          console.warn("[SDN Prewarm v34-IMMORTAL-INTEL-HYBRID] Impulse failed:", impulse, err);
        }
      }
    }

  } catch (err) {
    console.error("[SDN Prewarm v34-IMMORTAL-INTEL-HYBRID] Unexpected failure during prewarm:", err);
  }

  // ALWAYS return a valid SDN instance
  return instance;
}



export default {
  meta: SDNPrewarmMeta
};

export const PulseSDN = () => {
  const listeners = new Map();
  const history = [];
  const MAX_HISTORY = 200;

  function on(impulseType, handler) {
    if (!listeners.has(impulseType)) {
      listeners.set(impulseType, new Set());
    }
    listeners.get(impulseType).add(handler);
    return () => listeners.get(impulseType).delete(handler);
  }

  function emitImpulse(impulseType, payload) {
    try {
      const envelope = {
        impulseType,
        payload,
        time: PulseRealm.PulseNOW,
        id: "SDN_" + Math.random().toString(36).slice(2),
        mode: payload.modeKind || "dual",
        context: payload.executionContext || null
      };

      history.push(envelope);
      if (history.length > MAX_HISTORY) history.shift();

      const set = listeners.get(impulseType);
      if (set) {
        for (const fn of set) {
          try { fn(envelope); }
          catch (err) { console.warn("[PulseSDN] listener error", err); }
        }
      }

      try {
        PulseRealm.PulseSignals.emit("sdn.impulse", envelope);
      } catch {}

      return envelope;
    } catch (err) {
      console.warn("[PulseSDN] emitImpulse failed", err);
      return null;
    }
  }

  function getHistory() {
    return [...history];
  }

  return { on, emitImpulse, getHistory };
};


PulseRealm.SDNPrewarm = prewarmSDN;

// ---------------------------------------------------------------------------
// PulseSDN — v30++++
// Signal‑Driven Nervous System for PulseWorld
// ---------------------------------------------------------------------------
