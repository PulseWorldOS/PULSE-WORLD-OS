// ============================================================================
// FILE: PulseMeshFlow-v30-IMMORTAL+++ONEBAND.js
// [pulse:mesh] COMMUNITY_FLOW_LAYER v30-IMMORTAL+++ONEBAND
// Full-Spectrum Coordination • Deterministic Lifecycle Sequencer
// ONE-BAND Mesh/Pulse/Presence Field • Unified Advantage Spine
// Metadata-Only • Zero Recursion • Zero Routing • SDN-Aligned
// Presence-Aware • Binary-Aware • Dual-Mode-Aware • Mesh-Tier-Aware
// Long-Range-Aware • Bluetooth-Presence-Aware • Echo-Aware • Drift-Proof
// ============================================================================
//
// IDENTITY — THE FLOW ORGAN (v30-IMMORTAL+++ONEBAND):
// ---------------------------------------------------
// • Pure lifecycle sequencer for impulses.
// • Coordinates Skin → Reflex → Cortex → Tendons → Organs → Immune
//                     → Memory → Hormones → Aura → Router → SendSystem.
// • No recursion, no timestamps, no rate limiting.
// • No routing logic — Router handles destination.
// • No movement logic — SendSystem handles movement.
// • No mesh routing — Mesh is deterministic pathway engine.
// • Metadata-only shaping + sequencing.
// • SDN-aware: receives impulses from SDN, returns shaped impulses.
// • ONE-BAND field: meshBand/pulseBand/oneBand unified down the spine.
// • Presence-aware, binary-aware, dual-mode-aware.
// • Mesh-tier-aware + long-range-aware + bluetooth-presence-aware (metadata-only).
//
// SAFETY CONTRACT (v30++ ONEBAND):
// --------------------------------
// • No payload access.
// • No compute.
// • No recursion.
// • No timestamps.
// • No routing override.
// • No mutation outside metadata.
// • Deterministic-field, unified-advantage-field, unified-oneband-field, drift-proof.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { MeshMemoryInstance } from "./PulseMeshMemory-v30.js";
import {createPulseSkin} from "./PulseMeshSkin-v30.js";
import { createPulseMeshCortex } from "./PulseMeshCortex-v30.js";
import { PulseMeshAura } from "./PulseMeshAura-v30.js";
import { createPulseMeshSkinReflex } from "./PulseMeshSkinReflex-v30.js";
import { createPulseMeshTendons as applyPulseMeshTendons } from "./PulseMeshTendons-v30.js";
import { createPulseOrgans } from "./PulseMeshOrgans-v30.js";
import { createPulseImmune } from "./PulseMeshImmuneMembrane-v30.js";
import { applyPulseMeshHormonesV30 } from "./PulseMeshHormones-v30.js";
// ============================================================================
// COMMUNITY FLOW LAYER — v30 IMMORTAL+++ ONEBAND
// ============================================================================

// Create ALL instances OUTSIDE the factory
const skinInstance = createPulseSkin();
const reflexInstance = createPulseMeshSkinReflex();
const cortexInstance = createPulseMeshCortex();
const tendonsInstance = applyPulseMeshTendons();
const organsInstance = createPulseOrgans();
const immuneInstance = createPulseImmune();
const memoryInstance = MeshMemoryInstance;
const hormonesInstance = applyPulseMeshHormonesV30();
const auraInstance = PulseMeshAura;

const haloCountersInstance = PulseRealm.PulseMeshHaloCounters;
const routerInstance = PulseRealm.PulseBridgeRoute;


// ============================================================================
// FIXED FACTORY — NO MORE BROKEN DEFAULTS
// ============================================================================
export function createPulseMeshFlow({
  applyPulseSkin = skinInstance,
  createCommunityReflex = reflexInstance,
  applyPulseCortex = cortexInstance,
  applyTendons = tendonsInstance,
  applyPulseOrgans = organsInstance,
  applyPulseImmune = immuneInstance,
  applyPulseMemory = memoryInstance,
  applyPulseHormones = hormonesInstance,
  applyPulseAura = auraInstance,

  PulseHaloCounters = haloCountersInstance,
  Router = routerInstance,
  SendSystem = PulseRealm.PulseSendSystem,

  log = console.log,
  warn = console.warn,
  error = console.error
} = {}) {

  const noop      = () => {};
  const noopAsync = async () => {};

  applyPulseSkin         = applyPulseSkin         || noop;
  createCommunityReflex  = createCommunityReflex  || (() => noop);
  applyPulseCortex       = applyPulseCortex       || noop;
  applyTendons           = applyTendons           || noop;
  applyPulseOrgans       = applyPulseOrgans       || noop;
  applyPulseImmune       = applyPulseImmune       || noop;
  applyPulseMemory       = applyPulseMemory       || noop;
  applyPulseHormones     = applyPulseHormones     || noop;
  applyPulseAura         = applyPulseAura         || noop;

  PulseHaloCounters = PulseHaloCounters || {
    impulseStarted:      noop,
    reflexDropped:       noop,
    cortexApplied:       noop,
    tendonsApplied:      noop,
    organsApplied:       noop,
    immuneApplied:       noop,
    immuneQuarantined:   noop,
    memoryApplied:       noop,
    memoryWrite:         noop,
    hormonesApplied:     noop,
    hormoneBoost:        noop,
    hormoneDamp:         noop,
    auraApplied:         noop,
    auraLooped:          noop,
    auraTensionTagged:   noop,
    meshHops:            noop,
    impulseThrottled:    noop,
    impulseCompleted:    noop
  };

  Router = Router || {
    route: async (_kind, payload) => payload
  };

  SendSystem = SendSystem || {
    move: async payload => payload
  };

  log   = log   || (() => {});
  warn  = warn  || (() => {});
  error = error || (() => {});

  const meta = {
    layer: "PulseFlow",
    role: "FLOW_ORCHESTRATOR",
    version: "30-IMMORTAL+++ONEBAND",
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

      oneBandAware: true,
      pulseBandAware: true,
      meshBandAware: true,
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

      echoAware: true,
      meshTierAware: true,
      longRangeAware: true,
      bluetoothPresenceAware: true,
      arteryDeterministic: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true
    }
  };

  function finalize(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.flow_completed = true;

    if (impulse.oneBand) {
      impulse.flags.one_band_final   = impulse.oneBand;
      impulse.flags.mesh_band_final  = impulse.meshBand;
      impulse.flags.pulse_band_final = impulse.pulseBand;
    }

    PulseHaloCounters.impulseCompleted();

    return impulse;
  }

  function PulseFlow() {
    const reflex = createCommunityReflex();

    return {
      meta,

      async run(impulse, entryNodeId, context = {}) {
        impulse.flags = impulse.flags || {};
        impulse.flags.flow_meta = meta;
        impulse.flags.flow_started = true;

        const binaryMode         = !!context.binaryMode;
        const dualMode           = !!context.dualMode;
        const echoMode           = !!context.echoMode;
        const meshTier           = context.meshTier || "host"; // host | satellite | relay
        const longRangeCandidate = !!context.longRangeCandidate;
        const bluetoothPresence  = context.bluetoothPresence || null;

        if (binaryMode) impulse.flags.binary_mode = true;
        if (dualMode)   impulse.flags.dual_mode   = true;
        if (echoMode)   impulse.flags.echo_mode   = true;

        const contextOneBand =
          context.oneBand ||
          context.meshBand ||
          context.pulseBand ||
          null;

        const impulseOneBand =
          impulse.oneBand ||
          impulse.meshBand ||
          impulse.pulseBand ||
          null;

        const oneBand = contextOneBand || impulseOneBand || "one";

        impulse.oneBand   = oneBand;
        impulse.meshBand  = oneBand;
        impulse.pulseBand = oneBand;

        impulse.flags.one_band   = oneBand;
        impulse.flags.mesh_band  = oneBand;
        impulse.flags.pulse_band = oneBand;

        if (context.presenceBand) {
          impulse.band = context.presenceBand;
        } else {
          impulse.band = oneBand;
        }

        if (context.presenceTag) {
          impulse.flags.aura_presence_tag = context.presenceTag;
        } else if (!impulse.flags.aura_presence_tag) {
          impulse.flags.aura_presence_tag = "PulseFlow-v30-oneband";
        }

        impulse.flags.aura_mesh_tier            = meshTier;
        impulse.flags.aura_long_range_candidate = longRangeCandidate;

        if (bluetoothPresence) {
          impulse.flags.aura_bt_device_id    = bluetoothPresence.deviceId || null;
          impulse.flags.aura_bt_proximity    = bluetoothPresence.proximityTier || null;
          impulse.flags.aura_bt_transport    = bluetoothPresence.transport || null;
          impulse.flags.aura_bt_link_quality = bluetoothPresence.linkQuality ?? null;
        }

        PulseHaloCounters.impulseStarted({
          mode: binaryMode ? "binary" : dualMode ? "dual" : "symbolic",
          band: impulse.band,
          oneBand,
          meshBand: impulse.meshBand,
          pulseBand: impulse.pulseBand,
          presenceTag: impulse.flags.aura_presence_tag,
          meshTier,
          longRangeCandidate
        });

        try {
          applyPulseSkin(impulse, "entry");

          const reflexDecision = reflex(impulse, {
            trustLevel: context.trustLevel,
            load: context.load,
            echoMode
          });

          impulse.flags[`flow_reflex_${reflexDecision ? "pass" : "drop"}`] = true;

          if (reflexDecision === 0) {
            PulseHaloCounters.reflexDropped();
            return finalize(impulse);
          }

          applyPulseCortex(impulse, {
            ...context,
            echoMode,
            meshTier,
            longRangeBias: context.longRangeBias ?? 0,
            longRangeCandidate,
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.cortexApplied();

          applyTendons(impulse, {
            echoMode,
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.tendonsApplied();

          applyPulseOrgans(impulse, {
            echoMode,
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.organsApplied();

          const immuneBefore = impulse.flags.immune_quarantined;
          applyPulseImmune(impulse, {
            echoMode,
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.immuneApplied();
          if (impulse.flags.immune_quarantined && !immuneBefore) {
            PulseHaloCounters.immuneQuarantined();
          }

          if (echoMode) {
            log("[PulseFlow v30 ONEBAND] Echo-mode run (diagnostic, read-only)", {
              entryNodeId,
              band: impulse.band,
              oneBand,
              meshBand: impulse.meshBand,
              pulseBand: impulse.pulseBand,
              presenceTag: impulse.flags.aura_presence_tag,
              meshTier,
              longRangeCandidate
            });

            applyPulseAura(impulse, {
              echoMode,
              oneBand,
              meshBand: impulse.meshBand,
              pulseBand: impulse.pulseBand
            });
            PulseHaloCounters.auraApplied();

            return finalize(impulse);
          }

          const memoryBefore = impulse.flags.memory_written;
          applyPulseMemory(impulse, {
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.memoryApplied();
          if (impulse.flags.memory_written && !memoryBefore) {
            PulseHaloCounters.memoryWrite();
          }

          const hormoneBefore = impulse.flags.hormone_event;
          applyPulseHormones(impulse, {
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.hormonesApplied();
          if (impulse.flags.hormone_event && !hormoneBefore) {
            if (impulse.flags.hormone_event === "boost") {
              PulseHaloCounters.hormoneBoost();
            } else if (impulse.flags.hormone_event === "damp") {
              PulseHaloCounters.hormoneDamp();
            }
          }

          const auraBeforeLoop    = impulse.flags.aura_in_loop;
          const auraBeforeTension = impulse.flags.aura_system_under_tension;

          applyPulseAura(impulse, {
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand
          });
          PulseHaloCounters.auraApplied();

          if (impulse.flags.aura_in_loop && !auraBeforeLoop) {
            PulseHaloCounters.auraLooped();
          }
          if (impulse.flags.aura_system_under_tension && !auraBeforeTension) {
            PulseHaloCounters.auraTensionTagged();
          }

          const routed = await Router.route("pulse", {
            impulse,
            entryNodeId,
            sdnContext: context.sdnContext,
            binaryMode,
            presenceBand: impulse.band,
            oneBand,
            meshBand: impulse.meshBand,
            pulseBand: impulse.pulseBand,
            meshTier,
            longRangeCandidate,
            bluetoothPresence
          });

          if (typeof routed.hops === "number") {
            PulseHaloCounters.meshHops(routed.hops);
          }

          const moved = await SendSystem.move(routed || { impulse });

          applyPulseSkin(moved, "exit");

          if (moved.flags.flow_throttled) {
            PulseHaloCounters.impulseThrottled();
          }

          return finalize(moved);

        } catch (err) {
          warn("[PulseFlow v30 ONEBAND] Flow error", { error: String(err) });
          impulse.flags.flow_error = String(err);
          return finalize(impulse);
        }
      }
    };
  }

  return {
    create: PulseFlow
  };
}

// ============================================================================
// PulseMeshFlow EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseMeshFlow = {
  create: createPulseMeshFlow,
  version: "30-IMMORTAL+++ONEBAND",
  layer: "PulseFlow"
};

export default PulseMeshFlow;

PulseRealm.MeshFlow = {
  PulseMeshFlow,
  createPulseMeshFlow
}
PulseRealm.PulseMeshFlow = PulseMeshFlow;
PulseRealm.PulseMeshFlowBuild = createPulseMeshFlow;