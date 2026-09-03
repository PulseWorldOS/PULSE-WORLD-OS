// ============================================================================
// FILE: PulseRouter-v30-IMMORTAL-INTEL++-ONEBAND.js
// PulseRouter — v30 IMMORTAL INTEL++ ONEBAND DualHash Evolution‑Aware Router
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministically route pulses via Commandments → Instincts → Design
//     → Thought → Fallback (A‑B‑A symbolic routing spine).
//   • Preserve v16/v24 semantics, upgrade to v30‑IMMORTAL‑INTEL++ ONEBAND
//     surfaces (symbolic + binary + dualhash on a single band).
//   • Expose routing‑intelligence INTEL surfaces + healing diagnostics +
//     bandSignature / binaryField / waveField for unified band routing.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v30‑INTEL):
//   • No network, no filesystem, no randomness, no timestamps, no async.
//   • No mutation of pulse input; only internal healing + routingMemory.
//   • Deterministic‑field: identical input → identical routing decision.
//   • Zero user code, zero eval, zero dynamic imports.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
// ============================================================================
// ROUTER ORGAN IMPORTS — v30 IMMORTAL INTEL++ ONEBAND
// (paths are placeholders; you will correct them)
// ============================================================================
import { PulseRouterCommandments } from "./PulseRouterCommandments-v30.js";
import { PulseRouterEvolutionaryInstincts } from "./PulseRouterEvolutionaryInstincts-v30.js";
import { PulseRouterEvolutionaryDesign } from "./PulseRouterEvolutionaryDesign-v30.js";
import { PulseRouterMesh } from "./PulseRouterMesh-v30.js";
import { PulseRouterEvolutionaryThought } from "./PulseRouterEvolutionaryThought-v30.js";

import { PulseBinaryRouterRole as PulseRouterBinary } from "./PulseRouterBinary-v30.js";

import { PulseEarnRouter_v30 as PulseRouterEarn } from "./PulseRouterEarn-v30.js";



// ============================================================================
// PULSE ROLE META
// ============================================================================
export const PulseRole = Object.freeze({
  layer: "Router",
  version: "v30-IMMORTAL-INTEL++-ONEBAND",
  identity: "PulseRouter-v30-IMMORTAL-INTEL++-ONEBAND",
  guarantees: Object.freeze({
    deterministic: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroRandomness: true,
    zeroTimestamps: true,
    zeroEval: true,
    zeroDynamicImports: true
  })
});

// ============================================================================
// ROUTER ORGANISM — unified router organ surface
// ============================================================================
export const RouterOrgans = Object.freeze({
  commandments: PulseRouterCommandments,
  instincts: PulseRouterEvolutionaryInstincts,
  design: PulseRouterEvolutionaryDesign,
  thought: PulseRouterEvolutionaryThought,

  mesh: PulseRouterMesh,
  binary: PulseRouterBinary,
  earn: PulseRouterEarn
});

// ============================================================================
// INTERNAL MEMORY — deterministic, local, safe
// ============================================================================
const routingMemory = {
  successes: {},
  failures: {}
};

function rememberSuccess(pattern, target) {
  const key = `${pattern}::${target}`;
  routingMemory.successes[key] = (routingMemory.successes[key] || 0) + 1;
}

function rememberFailure(pattern, target) {
  const key = `${pattern}::${target}`;
  routingMemory.failures[key] = (routingMemory.failures[key] || 0) + 1;
}

// ============================================================================
// HASH / DUALHASH HELPERS (v24 IMMORTAL INTEL → v30 ONEBAND)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

// ============================================================================
// ONEBAND HELPERS — bandSignature / binaryField / waveField
// ============================================================================
function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function buildBandSignature(band, heartbeat, aiHeartbeat) {
  const hbTag = heartbeat.bandTag || "hb";
  const aiTag = aiHeartbeat.bandTag || "ai";
  return computeHash(`ROUTER_ONEBAND::${band}::${hbTag}::${aiTag}`);
}

function buildBinaryFieldForRoute(healthScore, readinessScore) {
  const h = clamp01(healthScore ?? 1);
  const r = clamp01(readinessScore ?? 0);
  const density = 8 + Math.floor(h * 4 + r * 4);
  const surface = density + 10;

  return {
    binaryPhenotypeSignature: computeHash(
      `ROUTER_BIN::${surface}::${h}::${r}`
    ),
    binarySurfaceSignature: computeHash(`ROUTER_BIN_SURF::${surface}`),
    binarySurface: {
      density,
      surface,
      patternLen: 8
    },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveFieldForRoute(band, healthScore, readinessScore) {
  const h = clamp01(healthScore ?? 1);
  const r = clamp01(readinessScore ?? 0);
  const baseAmp = band === "binary" ? 9 : 5;
  const amplitude = (1 + h + r) * baseAmp;

  return {
    amplitude,
    wavelength: amplitude + 3,
    phase: amplitude % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// COSMOS CONTEXT HELPERS
// ============================================================================
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root"
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}`;
  return buildDualHashSignature("PULSE_ROUTER_COSMOS", {}, raw);
}

// ============================================================================
// ANCESTRY HELPERS
// ============================================================================
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId, cosmos }) {
  const shape = {
    pattern: pattern || "",
    patternAncestry: buildPatternAncestry(pattern || ""),
    lineageSignature: buildLineageSignature(lineage || []),
    pageId: pageId || "NO_PAGE",
    cosmos: normalizeCosmos(cosmos)
  };

  const raw = JSON.stringify(shape);
  return computeHash(raw);
}

// ============================================================================
// DEGRADATION TIER HELPER
// ============================================================================
function classifyDegradationTier(h) {
  const v = typeof h === "number" ? h : 1.0;
  if (v >= 0.95) return "microDegrade";
  if (v >= 0.85) return "softDegrade";
  if (v >= 0.50) return "midDegrade";
  if (v >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// ============================================================================
// FALLBACK DETERMINISTIC ROUTING (legacy spine → v16 surface)
// ============================================================================
function fallbackRouteTarget(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const mode = pulse.mode || "normal";
  const health = pulse.healthScore ?? 1;

  const raw = `${pattern}::${lineageDepth}::${mode}::${health}`;
  let acc = 0;

  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 7)) % 12289;
  }

  const organs = ["GPU", "Earn", "OS", "Mesh"];
  return organs[acc % organs.length];
}

// ============================================================================
// ROUTER INTELLIGENCE — symbolic routing insight surface + ONEBAND
// ============================================================================
function computeRoutingIntelligence({
  pulse,
  targetOrgan,
  source,
  tier,
  cosmos,
  pattern,
  patternAncestry,
  lineage,
  lineageSignature,
  pageId,
  pageAncestrySignature
}) {
  const healthScore = pulse.healthScore ?? 1;
  const advantageField = pulse.advantageField ?? null;
  const pulseIntelligence =
    pulse.pulseIntelligence ?? pulse.pulseCompute ?? null;

  const shape = {
    targetOrgan,
    source,
    tier,
    cosmos: normalizeCosmos(cosmos),
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    healthScore
  };

  const routeDualHash = buildDualHashSignature(
    "PULSE_ROUTER_ROUTE",
    shape,
    JSON.stringify(shape)
  );

  const advantageDualHash = advantageField
    ? buildDualHashSignature(
        "PULSE_ROUTER_ADVANTAGE",
        advantageField,
        JSON.stringify(advantageField)
      )
    : null;

  const pulseIntelDualHash = pulseIntelligence
    ? buildDualHashSignature(
        "PULSE_ROUTER_PULSE_INTEL",
        pulseIntelligence,
        JSON.stringify(pulseIntelligence)
      )
    : null;

  const readinessScore = Math.max(
    0,
    Math.min(
      0.5 * healthScore +
        0.3 * (patternAncestry.length > 0 ? 1 : 0) +
        0.2 * (lineage.length > 0 ? 1 : 0),
      1
    )
  );

  return {
    healthScore,
    advantageField,
    pulseIntelligence,
    readinessScore,
    routeDualHash,
    advantageDualHash,
    pulseIntelDualHash
  };
}

// ============================================================================
// HEALING METADATA — Routing Health Log (v30 IMMORTAL INTEL++ ONEBAND)
// ============================================================================
const routingHealing = {
  cycleCount: 0,

  lastPattern: null,
  lastTargetOrgan: null,
  lastSource: null,
  lastTier: null,
  lastCosmosSignature: null,
  lastLineageDepth: 0,
  lastPageId: null,

  lastPatternAncestry: null,
  lastLineageSignature: null,
  lastPageAncestrySignature: null,

  lastRoutingIntelSignatureIntel: null,
  lastRoutingIntelSignatureClassic: null,

  lastBand: null,
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null
};

export function getPulseRouterHealingState() {
  return { ...routingHealing };
}

// ============================================================================
// INTEL WRAPPER — v30 dualhash routing‑intelligence ONEBAND envelope
// ============================================================================
function buildRoutingIntelDualHash({
  pulse,
  targetOrgan,
  source,
  tier,
  cosmos,
  pattern,
  patternAncestry,
  lineage,
  lineageSignature,
  pageId,
  pageAncestrySignature
}) {
  const routingIntelligence = computeRoutingIntelligence({
    pulse,
    targetOrgan,
    source,
    tier,
    cosmos,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature
  });

  const cosmosSig = cosmosSignature(normalizeCosmos(cosmos));

  const band = pulse.band || "oneband";
  const heartbeat = pulse.heartbeat || null;
  const aiHeartbeat = pulse.aiHeartbeat || null;

  const bandSignature = buildBandSignature(
    band,
    heartbeat,
    aiHeartbeat
  );

  const binaryField = buildBinaryFieldForRoute(
    routingIntelligence.healthScore,
    routingIntelligence.readinessScore
  );

  const waveField = buildWaveFieldForRoute(
    band,
    routingIntelligence.healthScore,
    routingIntelligence.readinessScore
  );

  const intelPayload = {
    kind: "pulseRoutingIntelligence",
    version: "v30-IMMORTAL-INTEL++-ONEBAND",
    source,
    targetOrgan,
    tier,
    pattern,
    lineageDepth: (lineage && lineage.length) || 0,
    pageId,
    cosmos: normalizeCosmos(cosmos),
    cosmosSignature: cosmosSig,
    patternAncestry,
    lineageSignature,
    pageAncestrySignature,
    routingIntelligence,
    band,
    bandSignature,
    binaryField,
    waveField
  };

  const classicString =
    `ROUTE::SRC:${source}` +
    `::ORG:${targetOrgan}` +
    `::TIER:${tier}` +
    `::PAT:${pattern}` +
    `::PAGE:${pageId}` +
    `::BAND:${band}`;

  const sig = buildDualHashSignature(
    "PULSE_ROUTING_INTEL_v30_ONEBAND",
    intelPayload,
    classicString
  );

  routingHealing.lastPattern = pattern;
  routingHealing.lastTargetOrgan = targetOrgan;
  routingHealing.lastSource = source;
  routingHealing.lastTier = tier;
  routingHealing.lastCosmosSignature = cosmosSig.classic;
  routingHealing.lastLineageDepth = (lineage && lineage.length) || 0;
  routingHealing.lastPageId = pageId;
  routingHealing.lastPatternAncestry = patternAncestry;
  routingHealing.lastLineageSignature = lineageSignature;
  routingHealing.lastPageAncestrySignature = pageAncestrySignature;
  routingHealing.lastRoutingIntelSignatureIntel = sig.intel;
  routingHealing.lastRoutingIntelSignatureClassic = sig.classic;
  routingHealing.lastBand = band;
  routingHealing.lastBandSignature = bandSignature;
  routingHealing.lastBinaryField = binaryField;
  routingHealing.lastWaveField = waveField;
  routingHealing.cycleCount++;

  return {
    routingIntelligence,
    routingIntelSignatureIntel: sig.intel,
    routingIntelSignatureClassic: sig.classic,
    band,
    bandSignature,
    binaryField,
    waveField
  };
}

// ============================================================================
// CORE EVOLUTION‑AWARE ROUTE TARGET (v16 logic + v30 INTEL ONEBAND surfaces)
// ============================================================================
function evolutionAwareRouteTarget_v30(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const cosmos = normalizeCosmos(pulse.cosmos || {});
  const lineage = Array.isArray(pulse.lineage) ? pulse.lineage.slice() : [];
  const pageId = pulse.pageId || "NO_PAGE";

  const health = pulse.healthScore ?? 1;
  const tier = classifyDegradationTier(health);

  const patternAncestry =
    pulse.patternAncestry.length
      ? pulse.patternAncestry.slice()
      : buildPatternAncestry(pattern);

  const lineageSignature =
    typeof pulse.lineageSignature === "string"
      ? pulse.lineageSignature
      : buildLineageSignature(lineage);

  const pageAncestrySignature =
    typeof pulse.pageAncestrySignature === "string"
      ? pulse.pageAncestrySignature
      : buildPageAncestrySignature({ pattern, lineage, pageId, cosmos });

  // 1) Commandments
  if (pulse.commandmentsDecision.targetOrgan) {
    const targetOrgan = pulse.commandmentsDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const intel = buildRoutingIntelDualHash({
      pulse,
      targetOrgan,
      source: "Commandments",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Commandments",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      ...intel
    };
  }

  // 2) Instincts
  if (pulse.instinctsDecision.targetOrgan) {
    const targetOrgan = pulse.instinctsDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const intel = buildRoutingIntelDualHash({
      pulse,
      targetOrgan,
      source: "Instincts",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Instincts",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      ...intel
    };
  }

  // 3) Design
  if (pulse.designDecision.targetOrgan) {
    const targetOrgan = pulse.designDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const intel = buildRoutingIntelDualHash({
      pulse,
      targetOrgan,
      source: "Design",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Design",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      ...intel
    };
  }

  // 4) Thought
  if (pulse.thoughtDecision.targetOrgan) {
    const targetOrgan = pulse.thoughtDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const routedTier = pulse.thoughtDecision.tier || tier;
    const routedPatternAncestry =
      pulse.thoughtDecision.patternAncestry || patternAncestry;
    const routedLineageSignature =
      pulse.thoughtDecision.lineageSignature || lineageSignature;
    const routedPageId = pulse.thoughtDecision.pageId || pageId;
    const routedPageAncestrySignature =
      pulse.thoughtDecision.pageAncestrySignature || pageAncestrySignature;

    const intel = buildRoutingIntelDualHash({
      pulse,
      targetOrgan,
      source: "Thought",
      tier: routedTier,
      cosmos,
      pattern,
      patternAncestry: routedPatternAncestry,
      lineage,
      lineageSignature: routedLineageSignature,
      pageId: routedPageId,
      pageAncestrySignature: routedPageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Thought",
      tier: routedTier,
      cosmos,
      pattern,
      patternAncestry: routedPatternAncestry,
      lineage,
      lineageSignature: routedLineageSignature,
      pageId: routedPageId,
      pageAncestrySignature: routedPageAncestrySignature,
      ...intel
    };
  }

  // 5) Fallback
  const fallbackTarget = fallbackRouteTarget(pulse);
  rememberSuccess(pattern, fallbackTarget);

  const intel = buildRoutingIntelDualHash({
    pulse,
    targetOrgan: fallbackTarget,
    source: "Fallback",
    tier,
    cosmos,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature
  });

  return {
    targetOrgan: fallbackTarget,
    source: "Fallback",
    tier,
    cosmos,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    ...intel
  };
}

// ============================================================================
// PUBLIC API — PulseRouter (v30-IMMORTAL-INTEL++-ONEBAND)
// ============================================================================
export const PulseRouter = {
  PulseRole,
  RouterOrgans,
  PulseRouterMesh,
  go(target, opts = {}) {
    try {
      // ------------------------------------------------------------
      // 1. Normalize target
      // ------------------------------------------------------------
      const routeId = typeof target === "string" ? target : target.route || "unknown-route";

      // ------------------------------------------------------------
      // 2. Build a minimal pulse for routing memory + lineage
      // ------------------------------------------------------------
      const pulse = {
        pattern: routeId,
        lineage: opts.lineage || [],
        cosmos: opts.cosmos || {},
        pageId: opts.pageId || "pulsepal",
        healthScore: opts.healthScore ?? 1
      };

      // ------------------------------------------------------------
      // 3. Resolve target organ using existing router logic
      // ------------------------------------------------------------
      const resolved = PulseRouter.routeWithMeta(pulse);
      const organ = resolved.targetOrgan;

      // ------------------------------------------------------------
      // 4. Deliver to organ if it supports navigation
      // ------------------------------------------------------------
      if (organ && typeof organ.navigate === "function") {
        organ.navigate(routeId, opts);
      }

      // ------------------------------------------------------------
      // 5. Emit SDN impulse
      // ------------------------------------------------------------
      try {
        PulseRealm.PulseSDN.emitImpulse("router.go", {
          modeKind: "dual",
          executionContext: {
            sceneType: "router",
            workloadClass: "navigation",
            dispatchSignature: "PulseRouter.go.v30",
            shapeSignature: "router-go-spine",
            extensionId: "PulseRouter"
          },
          routeId,
          opts,
          resolved
        });
      } catch {}

      // ------------------------------------------------------------
      // 6. Emit PulseSignals broadcast
      // ------------------------------------------------------------
      try {
        PulseRealm.PulseSignals.emit("router.go", {
          routeId,
          opts,
          resolved
        });
      } catch {}

      return resolved;
    } catch (err) {
      console.warn("🛰️ PULSE MULTIVERSAL ROUTER v32.0 — [PulseRouter.go ERROR]", err);
      try {
        PulseRouter.onError({
          id: "router-go-error",
          severity: "error",
          packet: {
            route: target,
            message: String(err),
            surface: "router.go"
          },
          timestamp: PulseRealm.PulseNOW
        });
      } catch {}
      return null;
    }
  },
  
  onError(envelope) {
    try {
      // // ------------------------------------------------------------
      // // 1. Safe router-level logging
      // // ------------------------------------------------------------
      // try {
      //   console.error("[PulseRouter:Error]", {
      //     id: envelope.id,
      //     severity: envelope.severity,
      //     route: envelope.packet.route,
      //     surface: envelope.packet.surface,
      //     message: envelope.packet.message
      //   });
      // } catch {}

      // ------------------------------------------------------------
      // 2. Routing memory reflex (non-mutating)
      // ------------------------------------------------------------
      try {
        const pattern = envelope.packet.route || "UNKNOWN_PATTERN";
        routingMemory.lastError = {
          pattern,
          id: envelope.id,
          severity: envelope.severity,
          lineage: envelope.packet.lineage || [],
          time: envelope.timestamp
        };
      } catch {}

      // ------------------------------------------------------------
      // 3. Pattern ancestry snapshot
      // ------------------------------------------------------------
      try {
        const pattern = envelope.packet.route || "UNKNOWN_PATTERN";
        routingMemory.lastPatternAncestry = buildPatternAncestry(pattern);
      } catch {}

      // ------------------------------------------------------------
      // 4. Lineage signature snapshot
      // ------------------------------------------------------------
      try {
        const lineage = envelope.packet.lineage || [];
        routingMemory.lastLineageSignature = buildLineageSignature(lineage);
      } catch {}

      // ------------------------------------------------------------
      // 5. Cosmos snapshot (router-aware)
      // ------------------------------------------------------------
      try {
        const cosmos = normalizeCosmos(envelope.packet.cosmos || {});
        routingMemory.lastCosmos = cosmos;
      } catch {}

      // ------------------------------------------------------------
      // 6. Mesh router reflex
      // ------------------------------------------------------------
      try {
        PulseRouterMesh.onError(envelope);
      } catch {}

      // ------------------------------------------------------------
      // 7. RouterOrgans reflex
      // ------------------------------------------------------------
      try {
        for (const organ of Object.values(RouterOrgans || {})) {
          try {
            organ.onError(envelope);
          } catch {}
        }
      } catch {}

      // ------------------------------------------------------------
      // 8. SDN impulse (router-tier)
      // ------------------------------------------------------------
      try {
        PulseRealm.PulseSDN.emitImpulse("router.error", {
          modeKind: "dual",
          executionContext: {
            sceneType: "router",
            workloadClass: "routing-error",
            dispatchSignature: "PulseRouter.v30",
            shapeSignature: "router-error-spine",
            extensionId: "PulseRouter"
          },
          envelope
        });
      } catch {}

      // ------------------------------------------------------------
      // 9. PulseSignals broadcast
      // ------------------------------------------------------------
      try {
        PulseRealm.PulseSignals.emit("router.error", {
          envelope,
          severity: envelope.severity,
          route: envelope.packet.route,
          surface: envelope.packet.surface
        });
      } catch {}

      // ------------------------------------------------------------
      // 10. Healing state snapshot
      // ------------------------------------------------------------
      try {
        routingMemory.lastHealingState = getPulseRouterHealingState();
      } catch {}

    } catch (err) {
      console.warn("🛰️ PULSE MULTIVERSAL ROUTER v32.0 — [PulseRouter:onError FAILED]", err);
    }
  },
 
  route(pulse) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";

    if (pulse.targetHint) {
      rememberSuccess(pattern, pulse.targetHint);
      return pulse.targetHint;
    }

    return evolutionAwareRouteTarget_v30(pulse).targetOrgan;
  },

  routeWithMeta(pulse) {
    if (pulse.targetHint) {
      const pattern = pulse.pattern || "UNKNOWN_PATTERN";
      rememberSuccess(pattern, pulse.targetHint);

      const cosmos = normalizeCosmos(pulse.cosmos || {});
      const lineage = pulse.lineage || [];
      const pageId = pulse.pageId || "NO_PAGE";

      const tier = classifyDegradationTier(pulse.healthScore ?? 1);
      const patternAncestry = buildPatternAncestry(pattern);
      const lineageSignature = buildLineageSignature(lineage);
      const pageAncestrySignature = buildPageAncestrySignature({
        pattern,
        lineage,
        pageId,
        cosmos
      });

      const intel = buildRoutingIntelDualHash({
        pulse,
        targetOrgan: pulse.targetHint,
        source: "Hint",
        tier,
        cosmos,
        pattern,
        patternAncestry,
        lineage,
        lineageSignature,
        pageId,
        pageAncestrySignature
      });

      return {
        targetOrgan: pulse.targetHint,
        source: "Hint",
        tier,
        cosmos,
        pattern,
        patternAncestry,
        lineage,
        lineageSignature,
        pageId,
        pageAncestrySignature,
        ...intel
      };
    }

    return evolutionAwareRouteTarget_v30(pulse);
  },

  remember(pulse, target, status, healthScore = 1) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";
    if (status === "success") rememberSuccess(pattern, target);
    else rememberFailure(pattern, target);
    return { pattern, target, status, healthScore };
  },

  diagnostics() {
    return {
      PulseRole,
      RouterOrgans,
      routingMemory,
      routingHealing: getPulseRouterHealingState()
    };
  }
};


PulseRealm.PulseRouter =  PulseRouter;