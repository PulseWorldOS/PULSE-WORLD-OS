// ============================================================================
// FILE: /organs/immune/PulseMeshImmuneSystem-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE OS — v30-IMMORTAL-ADVANTAGE+++
// MESH IMMUNE SYSTEM COMMANDER — “THE IMMUNE COMMANDER”
// Deterministic • Declarative • Zero Drift • Presence/Band-Aware
// Bluetooth-Aware • Advantage-Aware • Mesh-Pressure-Aware
// Satellite-Fallback-Aware • Cache/Burst/ER-Surface-Aware
// ============================================================================
import { PulseGPUHealer } from "../PULSE-GPU/PulseGPULymphNodes-v30.js";
import { createPulseImmune } from "./PulseMeshImmuneMembrane-v30.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function createPulseMeshImmuneSystem({
  PulseImmunity=PulseRealm.PulseMeshImmuneMembrane,
  GPUHealer=PulseRealm.PulseGPUHealer,
  RouteResponder=PulseRealm.PulseBridgeRoute,
  OFFLINE_MODE = false,
  log=PulseRealm.PulseLog,
  warn=PulseRealm.PulseWarn,
  error=PulseRealm.PulseError
}) {

  // ---------------------------------------------------------------------------
  // META — v30-IMMORTAL-ADVANTAGE+++ identity
  // ---------------------------------------------------------------------------
  const meta = {
    layer: "PulseMeshImmuneSystem",
    role: "IMMUNE_COMMANDER",
    version: "v30-IMMORTAL-ADVANTAGE+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      // v24 core
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
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
      meshPressureAware: true,
      auraPressureAware: true,
      flowAware: true,
      driftAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true,

      // v24++ bluetooth
      bluetoothPresenceAware: true,
      bluetoothMeshAware: true,

      // v30++ advantage / cache / burst / ER / satellite
      cacheTierAware: true,
      burstTierAware: true,
      erSurfaceReady: true,
      satelliteFallbackAware: true,
      routingTurbulenceAware: true,
      presenceRelayAware: true
    },
    immunityEngine: PulseImmunity.meta || null
  };

  // Expose meta as a stable constant for external readers.
  const PulseMeshImmuneSystemMetaV30 = Object.freeze(meta);

  // ---------------------------------------------------------------------------
  // ISSUE ENRICHMENT (v30-IMMORTAL-ADVANTAGE+++)
  // Deterministic enrichment with mode/band + lineage + bluetooth hints.
  // ---------------------------------------------------------------------------
  function normalizeSeverity(sev) {
    if (sev == null) return 1;
    if (typeof sev !== "number" || Number.isNaN(sev)) return 1;
    if (sev < 0) return 0;
    if (sev > 10) return 10;
    return sev;
  }

  function enrichIssue(issue, context = {}) {
    const base = issue || {};

    const enriched = {
      ...base,
      binaryMode: !!context.binaryMode,
      dualMode: !!context.dualMode,
      presenceBand: context.presenceBand || base.presenceBand || "symbolic",

      lineageDepth: typeof base.lineageDepth === "number"
        ? base.lineageDepth
        : null,
      meshNodeId: base.meshNodeId ?? null,
      factoringDepth: base.factoringDepth ?? null,

      severity: normalizeSeverity(base.severity),

      tags: Array.isArray(base.tags) ? base.tags.slice() : []
    };

    // v30: propagate advantage/cache/burst/er hints if present
    if (base.advantageField) {
      enriched.advantageField = { ...base.advantageField };
      if (!enriched.tags.includes("advantage-aware")) {
        enriched.tags.push("advantage-aware");
      }
    }
    if (base.cacheTier) {
      enriched.cacheTier = base.cacheTier;
      if (!enriched.tags.includes("cache-tier-aware")) {
        enriched.tags.push("cache-tier-aware");
      }
    }
    if (base.burstTier) {
      enriched.burstTier = base.burstTier;
      if (!enriched.tags.includes("burst-tier-aware")) {
        enriched.tags.push("burst-tier-aware");
      }
    }
    if (base.erSurface) {
      enriched.erSurface = { ...base.erSurface };
      if (!enriched.tags.includes("er-surface-aware")) {
        enriched.tags.push("er-surface-aware");
      }
    }

    // v24++ bluetooth metadata (purely descriptive)
    const bt = base.bluetooth || context.bluetooth || {};
    if (bt.proximity != null || bt.linkQuality != null || bt.events != null) {
      enriched.bluetooth = {
        proximity: bt.proximity ?? null,
        linkQuality: bt.linkQuality ?? null,
        events: bt.events ?? 0
      };

      if (!enriched.tags.includes("bluetooth-aware")) {
        enriched.tags.push("bluetooth-aware");
      }
    }

    return enriched;
  }

  // ---------------------------------------------------------------------------
  // HEALER REGISTRY (v30, semantics compatible with v24)
  // ---------------------------------------------------------------------------
  const HEALER_REGISTRY = [
    {
      name: "GPUHealer",
      match: /gpu|render|advisor|auto_opt/i,
      handler: (issue) => ({
        ok: true,
        type: "gpu_repair_directive",
        target: "PulseGPU",
        action: "repair",
        details: {
          driftType: issue.driftType ?? "unspecified",
          severity: issue.severity ?? 1,
          note: issue.message ?? null,
          presenceBand: issue.presenceBand ?? null,
          lineageDepth: issue.lineageDepth ?? null,
          bluetooth: issue.bluetooth || null,
          advantageField: issue.advantageField || null,
          cacheTier: issue.cacheTier || null,
          burstTier: issue.burstTier || null
        },
        result: GPUHealer.repair
          ? GPUHealer.repair(issue)
          : null,
        issue
      })
    },
    {
      name: "RouteResponder",
      match: /route|network|timeout|stall|down/i,
      handler: (issue) => {
        if (OFFLINE_MODE) {
          return {
            ok: false,
            skipped: true,
            reason: "offline-mode",
            issue
          };
        }
        return {
          ok: true,
          type: "routing_repair_directive",
          target: "PulseRouter",
          action: "route_repair",
          details: {
            driftType: issue.driftType ?? "unspecified",
            severity: issue.severity ?? 1,
            note: issue.message ?? null,
            presenceBand: issue.presenceBand ?? null,
            lineageDepth: issue.lineageDepth ?? null,
            bluetooth: issue.bluetooth || null,
            cacheTier: issue.cacheTier || null,
            burstTier: issue.burstTier || null
          },
          result: RouteResponder
            ? RouteResponder(issue)
            : null,
          issue
        };
      }
    },
    {
      name: "IdentityDirective",
      match: /identity|auth|token|session/i,
      handler: (issue) => ({
        ok: true,
        type: "identity_repair_directive",
        target: "PulseIdentity",
        action: "self_repair",
        details: {
          driftType: issue.driftType ?? "unspecified",
          severity: issue.severity ?? 1,
          note: issue.message ?? null,
          presenceBand: issue.presenceBand ?? null,
          bluetooth: issue.bluetooth || null
        },
        issue
      })
    },
    {
      name: "MeshDirective",
      match: /mesh|pathway|factoring|missing_node|stall/i,
      handler: (issue) => ({
        ok: true,
        type: "mesh_repair_directive",
        target: "PulseMesh",
        action: "analyze_pathway",
        details: {
          driftType: issue.driftType ?? "unspecified",
          factoringDepth: issue.factoringDepth ?? null,
          meshNodeId: issue.meshNodeId ?? null,
          severity: issue.severity ?? 1,
          note: issue.message ?? null,
          presenceBand: issue.presenceBand ?? null,
          bluetooth: issue.bluetooth || null,
          advantageField: issue.advantageField || null,
          cacheTier: issue.cacheTier || null,
          burstTier: issue.burstTier || null
        },
        issue
      })
    }
  ];

  // ---------------------------------------------------------------------------
  // TRIAGE (v30-IMMORTAL-ADVANTAGE+++)
  // Deterministic ordering with mesh + bluetooth + advantage/cache/burst hints.
  // ---------------------------------------------------------------------------
  function triage(analysis) {
    const { issues } = analysis;

    return issues.slice().sort((a, b) => {
      const sa = a.severity || 1;
      const sb = b.severity || 1;

      if (sb !== sa) return sb - sa;

      const aMsg = a.message || "";
      const bMsg = b.message || "";

      const aIsMesh = /mesh|pathway|factoring|stall|missing_node/i.test(aMsg);
      const bIsMesh = /mesh|pathway|factoring|stall|missing_node/i.test(bMsg);

      if (aIsMesh && !bIsMesh) return -1;
      if (!aIsMesh && bIsMesh) return 1;

      // v24++: bluetooth-heavy issues get slight priority
      const aBt = a.bluetooth && (a.bluetooth.events || 0) > 0;
      const bBt = b.bluetooth && (b.bluetooth.events || 0) > 0;

      if (aBt && !bBt) return -1;
      if (!aBt && bBt) return 1;

      // v30: advantage/cache/burst-aware tie-breakers (still deterministic)
      const aAdv = a.advantageField.advantageScore ?? 0;
      const bAdv = b.advantageField.advantageScore ?? 0;
      if (bAdv !== aAdv) return bAdv - aAdv;

      const aCache = cacheTierRank(a.cacheTier);
      const bCache = cacheTierRank(b.cacheTier);
      if (bCache !== aCache) return bCache - aCache;

      const aBurst = burstTierRank(a.burstTier);
      const bBurst = burstTierRank(b.burstTier);
      if (bBurst !== aBurst) return bBurst - aBurst;

      return 0;
    });
  }

  function cacheTierRank(tier) {
    switch (tier) {
      case "hot": return 3;
      case "warm": return 2;
      case "cool": return 1;
      default: return 0;
    }
  }

  function burstTierRank(tier) {
    switch (tier) {
      case "burst_elite": return 4;
      case "burst_high": return 3;
      case "burst_medium": return 2;
      case "burst_low": return 1;
      default: return 0;
    }
  }

  // ---------------------------------------------------------------------------
  // DISPATCH (v30-IMMORTAL-ADVANTAGE+++)
  // Declarative — no direct healing, just directives.
// ---------------------------------------------------------------------------
  async function dispatch(issue) {
    const msg = issue.message || "";

    for (const healer of HEALER_REGISTRY) {
      if (healer.match.test(msg)) {
        const res = healer.handler(issue);
        log && log("[PulseMeshImmuneSystem-v30] Dispatch", {
          healer: healer.name,
          issueMessage: msg,
          severity: issue.severity,
          presenceBand: issue.presenceBand,
          bluetooth: issue.bluetooth || null,
          cacheTier: issue.cacheTier || null,
          burstTier: issue.burstTier || null
        });
        return res;
      }
    }

    warn && warn("[PulseMeshImmuneSystem-v30] No healer found for issue", {
      message: msg,
      severity: issue.severity
    });

    return {
      ok: false,
      message: "No healer found for issue",
      issue
    };
  }

  // ---------------------------------------------------------------------------
  // COMMAND CYCLE (v30-IMMORTAL-ADVANTAGE+++)
  // Pure triage + directive emission, v24-compatible surface.
// ---------------------------------------------------------------------------
  async function command(diagSnapshot, context = {}) {
    const analysis = PulseImmunity.analyze(diagSnapshot, {
      binaryMode: context.binaryMode,
      dualMode: context.dualMode,
      presenceBand: context.presenceBand,
      bluetooth: context.bluetooth || null
    });

    const enrichedIssues = (analysis.issues || []).map((issue) =>
      enrichIssue(issue, context)
    );

    const orderedIssues = triage({ ...analysis, issues: enrichedIssues });

    const results = [];

    for (const issue of orderedIssues) {
      const res = await dispatch(issue);
      results.push({ issue, result: res });
    }

    return {
      commander: "PulseMeshImmuneSystem",
      mode: OFFLINE_MODE ? "offline" : "online",
      binaryMode: !!context.binaryMode,
      dualMode: !!context.dualMode,
      presenceBand: context.presenceBand || "symbolic",
      bluetooth: context.bluetooth || null,
      meta: PulseMeshImmuneSystemMetaV30,
      analysis: {
        ...analysis,
        issues: enrichedIssues
      },
      orderedIssues,
      results
    };
  }

  // ---------------------------------------------------------------------------
  // v30 WRAPPER — stable, explicit entrypoint that “uses” the full surface
  // ---------------------------------------------------------------------------
  async function runImmuneCommandV30(diagSnapshot, context = {}) {
    // Thin wrapper so downstream can depend on v30 semantics explicitly.
    return command(diagSnapshot, {
      ...context,
      versionTag: meta.version
    });
  }

  // ---------------------------------------------------------------------------
  // PUBLIC INTERFACE
  // ---------------------------------------------------------------------------
  return {
    meta: PulseMeshImmuneSystemMetaV30,
    triage,
    dispatch,
    command,
    runImmuneCommandV30
  };
}
// ============================================================================
// PulseMeshImmuneSystem EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseMeshImmuneSystem = {
  create: createPulseMeshImmuneSystem,
  version: "v30-IMMORTAL-ADVANTAGE+++",
  layer: "PulseMeshImmuneSystem"
};

export default PulseMeshImmuneSystem;

PulseRealm.MeshImmuneSystem = {
  PulseMeshImmuneSystem,
  createPulseMeshImmuneSystem
}
PulseRealm.PulseMeshImmuneSystem = PulseMeshImmuneSystem;
PulseRealm.PulseMeshImmuneSystemBuild = createPulseMeshImmuneSystem;