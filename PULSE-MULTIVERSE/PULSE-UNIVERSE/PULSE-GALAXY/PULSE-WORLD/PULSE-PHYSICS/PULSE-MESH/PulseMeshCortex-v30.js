// ============================================================================
// FILE: PulseMeshCortex-v30-IMMORTAL+++.js
// [pulse:mesh] COMMUNITY_CORTEX_LAYER v30-IMMORTAL+++  // blue
// Strategic Decision Layer • Survival-Pattern Instincts • Metadata-Only
// Presence-Aware • Binary-Aware • Dual-Band • Mesh-Tier-Aware
// Long-Range-Aware • Drift-Proof • Advantage-Aware
// ============================================================================
//
// IDENTITY — THE MESH CORTEX (v30-IMMORTAL+++):
// --------------------------------------------
// • High-level strategic decision layer for impulses (community cortex).
// • Applies survival-pattern instincts: risk, novelty, cooperation, budgeting.
// • Mesh-tier-aware: host / satellite / relay bias is metadata-only.
// • Long-range-aware: can bias toward long-range pulses vs BLE-idle (flags-only).
// • Sets strategic priority + intent, NEVER computes or mutates payloads.
// • Sits above Tendons, below Earners — pure metadata shaping layer.
// • Deterministic-field, unified-advantage-field,
//   factoring-aware, flow-aware, drift-aware, aura-aware,
//   binary-aware, dual-band-ready, presence-aware,
//   multi-instance-ready, chunk/prewarm-ready.
// • Fully deterministic: same impulse + same context → same score + intent.
// • Zero randomness, zero timestamps, zero async, zero network, zero FS.
//
// SAFETY CONTRACT (v30):
// ----------------------
// • No randomness
// • No timestamps
// • No payload mutation (flags + meta only)
// • No async
// • No network, no filesystem, no env access
// • Deterministic: same impulse/context → same strategic score
// • Fail-open: missing context → safe defaults
// • Metadata-only shaping (no routing side-effects by itself)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// COMMUNITY CORTEX LAYER — v30 IMMORTAL+++
// ============================================================================
export function createPulseMeshCortex({ context = {}, log, warn, error } = {}) {

  // -------------------------------------------------------------------------
  // IMMORTAL META (attached to every impulse)
  // -------------------------------------------------------------------------
  const CORTEX_META = {
    layer: "PulseCortex",
    role: "MESH_STRATEGIC_LAYER",
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
      signalFactoringAware: true,
      flowAware: true,
      driftAware: true,
      presenceAware: true,
      bandAware: true,
      meshTierAware: true,
      longRangeAware: true,
      zeroCompute: true,
      zeroMutation: true
    }
  };

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function normalizeMeshTier(tier) {
    if (tier === "satellite" || tier === "relay") return tier;
    return "host";
  }

  // -------------------------------------------------------------------------
  // INSTINCT PACK — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  const PulseCortex = {

    // Risk instinct: penalize high cost + high threat.
    risk(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const cost = ctx.estimatedCost ?? 0.0;
      const threat = ctx.threatLevel ?? 0.0;
      const penalty = (cost * 0.3) + (threat * 0.7);
      return clamp01(base - penalty);
    },

    // Novelty instinct: boost low-frequency impulses.
    novelty(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const seen = ctx.frequency ?? 0.0;
      const boost = (1 - seen) * 0.3;
      return clamp01(base + boost);
    },

    // Cooperation instinct: reward wide impact radius.
    cooperation(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const reach = ctx.impactRadius ?? 0.0;
      return clamp01(base + reach * 0.25);
    },

    // Resource budget instinct: respect load, flow, throttle, factoring.
    resourceBudget(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const load = ctx.globalLoad ?? 0.0;
      const flowPressure = ctx.flowPressure ?? 0.0;
      const throttle = ctx.recentThrottleRate ?? 0.0;
      const factoringBias = impulse.flags.aura_factoring_bias ?? 0.0;

      let penalty = 0;
      if (load >= 0.5)        penalty += (load - 0.5) * 0.4;
      if (flowPressure > 0.3) penalty += flowPressure * 0.4;
      if (throttle > 0.0)     penalty += throttle * 0.5;
      if (factoringBias > 0)  penalty += factoringBias * 0.4;

      return clamp01(base - penalty);
    },

    // Binary awareness: small bias toward binary when requested.
    binaryAwareness(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const bias = ctx.binaryBias ?? 0.0;
      if (bias <= 0) return base;
      return clamp01(base + bias * 0.15);
    },

    // Presence awareness: slight preference for binary/dual band.
    presenceAwareness(impulse) {
      const base = impulse.score ?? 0.5;
      const band = impulse.band ?? "symbolic";
      if (band === "binary") return clamp01(base + 0.05);
      if (band === "dual")   return clamp01(base + 0.03);
      return base;
    },

    // Advantage awareness: cascade systemic advantage into score.
    advantageAwareness(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const advantage = ctx.advantageBias ?? 0.0;
      if (advantage <= 0) return base;
      return clamp01(base + advantage * 0.1);
    },

    // Mesh-tier awareness: bias based on host/satellite/relay.
    meshTierAwareness(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const tier = normalizeMeshTier(ctx.meshTier || impulse.flags.aura_mesh_tier);
      if (tier === "host")      return clamp01(base + 0.03);
      if (tier === "satellite") return clamp01(base + 0.02);
      if (tier === "relay")     return clamp01(base + 0.01);
      return base;
    },

    // Long-range awareness: bias when long-range pulses are preferred.
    longRangeAwareness(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const longRangeBias = ctx.longRangeBias ?? impulse.flags.aura_long_range_bias ?? 0.0;
      const wantsLongRange = !!ctx.longRangeCandidate || !!impulse.flags.aura_long_range_candidate;
      if (!wantsLongRange || longRangeBias <= 0) return base;
      return clamp01(base + longRangeBias * 0.12);
    },

    // Anomaly tagging: flags-only, no score mutation.
    anomaly(impulse, ctx = {}) {
      const weird = ctx.anomalyScore ?? 0.0;

      impulse.flags = impulse.flags || {};

      if (weird >= 0.8) impulse.flags.cortex_anomaly = true;
      if (impulse.flags.flow_throttled) impulse.flags.cortex_flow_anomaly = true;
      if (impulse.flags.aura_prefers_factored_paths)
        impulse.flags.cortex_factoring_anomaly = true;

      return impulse;
    }
  };

  // -------------------------------------------------------------------------
  // CORTEX ENGINE — v30 IMMORTAL+++
// -------------------------------------------------------------------------
  function classifyIntent(score, ctx, impulse) {
    const load = ctx.globalLoad ?? 0.0;
    const flowPressure = ctx.flowPressure ?? 0.0;
    const throttle = ctx.recentThrottleRate ?? 0.0;
    const factoringBias = impulse.flags.aura_factoring_bias ?? 0.0;

    const environmentHot =
      flowPressure > 0.5 ||
      throttle > 0.2 ||
      load > 0.8 ||
      factoringBias > 0.5;

    if (score >= 0.85 && !environmentHot) return "push_hard";
    if (score >= 0.5)                     return "normal";
    if (score < 0.3)                      return "defer_or_drop";
    return "cautious";
  }

  function applyPulseCortex(impulse, ctx = {}) {
    impulse.meta = impulse.meta || {};
    impulse.meta.cortex = CORTEX_META;

    let score = impulse.score ?? 0.5;

    // Deterministic instinct pipeline (fixed order)
    score = PulseCortex.risk({ ...impulse, score }, ctx);
    score = PulseCortex.novelty({ ...impulse, score }, ctx);
    score = PulseCortex.cooperation({ ...impulse, score }, ctx);
    score = PulseCortex.resourceBudget({ ...impulse, score }, ctx);
    score = PulseCortex.binaryAwareness({ ...impulse, score }, ctx);
    score = PulseCortex.presenceAwareness({ ...impulse, score }, ctx);
    score = PulseCortex.advantageAwareness({ ...impulse, score }, ctx);
    score = PulseCortex.meshTierAwareness({ ...impulse, score }, ctx);
    score = PulseCortex.longRangeAwareness({ ...impulse, score }, ctx);

    impulse.score = score;

    // Flags-only anomaly tagging
    PulseCortex.anomaly(impulse, ctx);

    impulse.flags = impulse.flags || {};
    impulse.flags.cortex_intent = classifyIntent(score, ctx, impulse);

    return impulse;
  }

  // -------------------------------------------------------------------------
  // CONTEXT ATTACHMENT — IMMORTAL
  // -------------------------------------------------------------------------
  context.applyPulseCortex = applyPulseCortex;

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    apply: applyPulseCortex,
    onError(envelope) {
      try {
        // ------------------------------------------------------------
        // 1. Safe mesh-level logging
        // ------------------------------------------------------------
        try {
          warn("[PulseMeshCortex:Error]", {
            id: envelope.id,
            severity: envelope.severity,
            route: envelope.packet.route,
            surface: envelope.packet.surface,
            message: envelope.packet.message
          });
        } catch {}

        // ------------------------------------------------------------
        // 2. Mesh-tier reflex (no mutation, no scoring)
        // ------------------------------------------------------------
        try {
          const tier = envelope.packet.surface || "unknown-surface";
          const route = envelope.packet.route || "unknown-route";

          // Cortex does not mutate — it only records strategic metadata
          context.lastMeshError = {
            id: envelope.id,
            severity: envelope.severity,
            tier,
            route,
            time: envelope.timestamp
          };
        } catch {}

        // ------------------------------------------------------------
        // 3. Flow-pressure awareness update (non-mutating)
        // ------------------------------------------------------------
        try {
          context.lastFlowAnomaly = {
            severity: envelope.severity,
            flags: envelope.flags || {},
            time: envelope.timestamp
          };
        } catch {}

        // ------------------------------------------------------------
        // 4. Presence awareness (binary/symbolic/dual)
        // ------------------------------------------------------------
        try {
          context.lastPresenceSignal = {
            band: envelope.packet.band || "unknown",
            surface: envelope.packet.surface,
            time: envelope.timestamp
          };
        } catch {}

        // ------------------------------------------------------------
        // 5. SDN impulse (mesh-tier)
        // ------------------------------------------------------------
        try {
          PulseRealm.PulseSDN.emitImpulse("mesh.cortex.error", {
            modeKind: "dual",
            executionContext: {
              sceneType: "mesh-cortex",
              workloadClass: "cortex-error",
              dispatchSignature: "PulseMeshCortex.v30",
              shapeSignature: "mesh-cortex-error-spine",
              extensionId: "PulseMeshCortex"
            },
            envelope
          });
        } catch {}

        // ------------------------------------------------------------
        // 6. PulseSignals broadcast
        // ------------------------------------------------------------
        try {
          PulseRealm.PulseSignals.emit("mesh.cortex.error", {
            envelope,
            severity: envelope.severity,
            route: envelope.packet.route,
            surface: envelope.packet.surface
          });
        } catch {}

      } catch (err) {
        try {
          warn("[PulseMeshCortex:onError FAILED]", String(err));
        } catch {}
      }
    },
    instincts: PulseCortex,
    meta: CORTEX_META
  };
}

PulseRealm.PulseCortex = createPulseMeshCortex;
PulseRealm.PulseMeshCortex = createPulseMeshCortex;