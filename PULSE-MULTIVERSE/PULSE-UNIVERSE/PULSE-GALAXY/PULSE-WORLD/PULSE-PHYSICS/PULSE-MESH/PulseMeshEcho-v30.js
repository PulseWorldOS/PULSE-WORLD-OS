// ============================================================================
// FILE: PulseOSDiagnosticReflection-v30-IMMORTAL+++
// PULSE_OS_DIAGNOSTIC_REFLECTION — IMMORTAL+++ EDITION
// Metadata-only • Read-only • Zero Mutation • Zero Routing Influence
// Fully Mesh-Aware • Aura-Aware • Advantage-Aware • Drift-Proof
// ============================================================================

// SUB‑IMPORTS (injected by CNS or your runtime)
import { PulseMeshFlow as flowEngine } from "./PulseMeshFlow-v30.js";
import { createPulseMesh as meshSystem } from "./PulseMesh-v30.js";
import { PulseVitalsLogger } from "../../../../../_PROOF/PULSE-PROOF.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// CREATE PULSE ECHO (IMMORTAL+++)
// ============================================================================
export function createPulseEcho({
  flow = flowEngine,
  mesh = meshSystem,
  log = PulseVitalsLogger.log,
  warn = PulseVitalsLogger.warn,
  error = PulseVitalsLogger.error
} = {}) {

  // -------------------------------------------------------------------------
  // META (IMMORTAL+++)
  // -------------------------------------------------------------------------
  const meta = {
    layer: "PulseEcho",
    role: "DIAGNOSTIC_REFLECTION",
    version: "30-IMMORTAL+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      localAware: true,
      internetAware: true,
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,
      signalFactoringAware: true,
      auraPressureAware: true,
      meshPressureAware: true,
      flowAware: true,
      driftAware: true,
      presenceAware: true,
      bandAware: true,
      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      arteryDeterministic: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  };

  // -------------------------------------------------------------------------
  // INTERNAL: CREATE ECHO PULSE
  // -------------------------------------------------------------------------
  function createEchoPulse(context) {
    return {
      id: "echo_diagnostic",
      type: "diagnostic_echo",
      flags: {
        echo: true,
        echo_meta: meta,

        presence_band: context.presenceBand || "symbolic",
        presence_tag: context.presenceTag || "PulseEcho-v30",

        aura_mesh_tier: context.meshTier || "host",
        aura_long_range_candidate: !!context.longRangeCandidate,

        aura_bt_device_id: context.bluetoothPresence.deviceId || null,
        aura_bt_proximity: context.bluetoothPresence.proximityTier || null,
        aura_bt_transport: context.bluetoothPresence.transport || null,
        aura_bt_link_quality: context.bluetoothPresence.linkQuality ?? null
      },
      metadata: { context },
      payloadRef: null
    };
  }

  // -------------------------------------------------------------------------
  // PUBLIC: SEND ECHO (IMMORTAL+++)
  // -------------------------------------------------------------------------
  function sendEcho(entryNodeId, context = {}) {
    const echo = createEchoPulse(context);

    const result = flow.run(echo, entryNodeId, {
      trustLevel: 1,
      load: 0,
      echoMode: true,
      binaryMode: false,
      dualMode: true,
      presenceBand: context.presenceBand || "symbolic",
      presenceTag: context.presenceTag || "PulseEcho-v30",
      meshTier: context.meshTier || "host",
      longRangeCandidate: !!context.longRangeCandidate,
      bluetoothPresence: context.bluetoothPresence || null
    });

    return extractReflection(result);
  }

  // -------------------------------------------------------------------------
  // INTERNAL: EXTRACT REFLECTION
  // -------------------------------------------------------------------------
  function extractReflection(impulse) {
    const flags = impulse.flags || {};

    const meshArtery =
      typeof mesh.getMeshArtery === "function"
        ? mesh.getMeshArtery()
        : null;

    return {
      echoId: impulse.id || "echo_diagnostic",

      mode: {
        binary: !!flags.binary_mode,
        symbolic: !flags.binary_mode,
        dual: !!flags.dual_mode
      },

      presence: {
        band: flags.presence_band || "symbolic",
        tag: flags.presence_tag || "PulseEcho-v30",
        bluetooth: {
          deviceId: flags.aura_bt_device_id || null,
          proximityTier: flags.aura_bt_proximity || null,
          transport: flags.aura_bt_transport || null,
          linkQuality: flags.aura_bt_link_quality ?? null
        }
      },

      flow: {
        throttled: !!flags.flow_throttled,
        reason: flags.flow_throttled_reason || null,
        pressure: flags.flow_pressure ?? null,
        recentThrottleRate: flags.recent_throttle_rate ?? null
      },

      aura: {
        inLoop: !!flags.aura_in_loop,
        loopDepth: flags.aura_loop_depth ?? 0,
        stabilizationNeeded: !!flags.aura_stabilization_needed,
        systemUnderTension: !!flags.aura_system_under_tension,
        prefersStableRoutes: !!flags.aura_prefers_stable_routes,
        prefersFactoredPaths: !!flags.aura_prefers_factored_paths,
        factoringBias: flags.aura_factoring_bias ?? null,
        prefersBinaryMesh: !!flags.aura_prefers_binary_mesh,
        binaryMeshBias: flags.aura_binary_mesh_bias ?? null,
        binaryOSAvailable: !!flags.aura_binary_os_available,
        advantageBias: flags.aura_advantage_bias ?? null,
        advantageCascade: !!flags.aura_advantage_cascade
      },

      mesh: {
        hops: typeof impulse.hops === "number" ? impulse.hops : 0,
        stalledAt: extractPrefixed(flags, "stalled_at_"),
        reflexDropsAt: extractPrefixed(flags, "reflex_drop_at_"),
        missingNodes: extractPrefixed(flags, "missing_node_"),
        driftPressure: flags.drift_pressure ?? null,
        meshMeta: mesh.meta ?? null,
        meshSystems: mesh.systems ? Object.keys(mesh.systems) : [],
        meshLinks: mesh.symbolicMesh.links
          ? Object.keys(mesh.symbolicMesh.links)
          : [],
        binaryMeshReady: !!mesh.binaryMesh,
        symbolicMeshReady: !!mesh.symbolicMesh,
        artery: meshArtery,
        meshTier: flags.aura_mesh_tier || "host",
        longRange: {
          candidate: !!flags.aura_long_range_candidate,
          bias: flags.aura_long_range_bias ?? null,
          pulseEveryMs: mesh.longRangePulseEveryMs ?? null
        }
      },

      reflex: {
        dropped: hasAnyReflexDropFlag(flags),
        reflexFlags: extractPrefixed(flags, "instinct_")
      },

      immune: {
        quarantined: !!flags.immune_quarantined
      },

      memory: {
        wrote: !!flags.memory_written
      },

      hormones: {
        event: flags.hormone_event || null
      },

      advantage: {
        binaryPreferred: !!flags.aura_prefers_binary_mesh,
        binaryBias: flags.aura_binary_mesh_bias ?? null,
        factoredPath: !!flags.mesh_factored,
        factorDepth: flags.mesh_factor_depth ?? null,
        advantageBias: flags.aura_advantage_bias ?? null,
        advantageCascade: !!flags.aura_advantage_cascade
      },

      stability: estimateStability(flags),
      driftRisk: estimateDrift(flags),

      meta
    };
  }

  // -------------------------------------------------------------------------
  // STABILITY + DRIFT
  // -------------------------------------------------------------------------
  function estimateStability(flags) {
    let score = 1;
    if (hasAnyReflexDropFlag(flags)) score -= 0.2;
    if (flags.immune_quarantined) score -= 0.3;
    if (flags.aura_in_loop) score -= 0.2;
    if (flags.flow_throttled) score -= 0.2;
    if (flags.aura_system_under_tension) score -= 0.1;
    return Math.max(0, score);
  }

  function estimateDrift(flags) {
    let risk = 0;
    if (flags.aura_in_loop) risk += 0.3;
    if (flags.aura_system_under_tension) risk += 0.2;
    if (flags.immune_quarantined) risk += 0.3;
    if (flags.flow_throttled) risk += 0.2;
    if (flags.drift_pressure !== undefined) {
      risk += (flags.drift_pressure || 0) * 0.3;
    }
    return Math.max(0, Math.min(1, risk));
  }

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function hasAnyReflexDropFlag(flags) {
    const keys = Object.keys(flags);
    return (
      keys.some((k) => k.startsWith("instinct_") && k.endsWith("_drop")) ||
      keys.some((k) => k.startsWith("reflex_drop_at_"))
    );
  }

  function extractPrefixed(flags, prefix) {
    return Object.keys(flags)
      .filter((k) => k.startsWith(prefix))
      .map((k) => k.replace(prefix, ""));
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    meta,
    sendEcho
  };
}

PulseRealm.PulseMeshEcho = createPulseEcho;