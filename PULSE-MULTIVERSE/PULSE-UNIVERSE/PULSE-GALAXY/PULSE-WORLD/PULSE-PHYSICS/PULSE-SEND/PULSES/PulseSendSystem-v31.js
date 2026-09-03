// ============================================================================
//  PulseSendSystem-v30-IMMORTAL-INTEL+++ (v30 + Environment-Aware Unified Pulses)
//  Nervous System Conductor (v30‑IMMORTAL‑INTEL+++ + SDN‑Aware + DualStack‑Aware)
//  Impulse → Pulse v3 → Pulse v2 → Pulse v1 → Router → Mesh → Send → Return
//  v30-IMMORTAL-INTEL+++:
//    • Fully Binary-Aware + DualBand-Aware
//    • Ancestry + Degradation Tier + Advantage Surface
//    • System-level cacheChunk / prewarm / presence (dual-hash, v24++ tuned)
//    • IMMORTAL-INTEL+++ pulseIntelligence + dualHash signatures
//    • TechSurface v30 (organ availability + wiring fingerprint)
//    • Deterministic, zero randomness, zero time, zero external IO
//    • v30+ Environment-Aware Unified Pulses (environment surfaced + hashed)
// ============================================================================
//
//  ROLE:
//    • Accept an Impulse (symbolic, binary, or hybrid).
//    • If bits are present:
//        - Derive pattern / mode / payload / hints (router/mesh/organ).
//        - Optionally "unbinary" into symbolic fields.
//    • Try Pulse v3 (unified organism).
//    • If v3 fails → try Pulse v2 (evolution engine).
//    • If v2 fails → fallback to Pulse v1 (EvoStable-Immortal v30).
//    • Route → Mesh → Send → ReturnArc.
//    • Emit SDN impulses at every stage (non‑blocking).
//    • Surface ancestry, degradation tier, advantage field, binary summary.
//    • Surface cacheChunk / prewarm / presence + IMMORTAL-INTEL+++ intelligence.
//    • Surface environment for unified pulse routing across systems.
//    • Return result to PulseBand (if present).
//
//  SAFETY:
//    • No network
//    • No GPU
//    • No Earn
//    • Pure internal routing + transport
//    • Deterministic bit → pattern/mode/payload mapping
//    • No randomness, no timestamps
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  IMPORTS — Pulse v1 / v2 / v3 creators (v30 stack)
// ============================================================================
import { PulseSDN } from "../../PULSE-OS/PulseOSSDNPrewarm-v30.js";
import { createPulseV3_v31 as createPulseV3 } from "./PulseSendV3UnifiedOrganism-v31.js";
import { createPulseV2 } from "./PulseSendV2EvolutionEngine-v31.js";
import { createLegacyPulse } from "./PulseSendLegacyPulse-v31.js";
import { createPulseSendImpulse as createPulseSend } from "../PulseSendImpulse-v30.js";
import { createPulseSendReturn } from "../PulseSendReturn-v30.js";
import { PulseRouter } from "../../PULSE-ROUTER/PulseRouter-v30.js";
import { PulseMeshAbilities as PulseMesh } from "../../PULSE-MESH/PULSE-MESH.js";
import { createPulseEarnSendSystem_v31 } from "../../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";



// ============================================================================
//  INTERNAL: GENERIC HELPERS (dual-hash + stable stringify)
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

// v30 keeps dual-hash lineage but with v24++ bit widths
function computeHashV1(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashV2(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 3)) % 131072;
  }
  return `h12_${h}`;
}

function dualHash(strOrShape) {
  const raw = typeof strOrShape === "string" ? strOrShape : stableStringify(strOrShape);
  const h1 = computeHashV1(raw);
  const h2 = computeHashV2(raw);
  return {
    h1,
    h2,
    signature: `${h1}::${h2}`
  };
}

function computeHash(str) {
  // Backward-compatible single hash, using dualHash as backing
  return dualHash(str).h1;
}


// ============================================================================
//  INTERNAL: ANCESTRY HELPERS
// ============================================================================
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId }) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId = pageId || "NO_PAGE";

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId
  };

  const raw = stableStringify(shape);
  return dualHash(raw).signature;
}


// ============================================================================
//  INTERNAL: DEGRADATION + BINARY SURFACE
// ============================================================================
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

function extractBinarySurfaceFromPulse(pulse) {
  const payload = pulse.payload || {};

  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = payload.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = payload.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = payload.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    routerHint,
    meshHint,
    organHint
  };
}


// ============================================================================
//  INTERNAL: BINARY HELPERS — bits → pattern/mode/payload/hints
// ============================================================================
function bitsToNumber(bits) {
  const safe = Array.isArray(bits) ? bits : [];
  let n = 0;
  for (let i = 0; i < safe.length; i++) {
    n = (n << 1) | (safe[i] & 1);
  }
  return n >>> 0;
}

function bitsToHex(bits, maxNibbles = 8) {
  const n = bitsToNumber(bits);
  const hex = n.toString(16).padStart(2, "0");
  return hex.slice(-maxNibbles);
}

function bitsToPattern(bits, prefix = "bp") {
  const hex = bitsToHex(bits, 8);
  return `${prefix}/${hex}`;
}

function bitsToMode(bits) {
  const safe = Array.isArray(bits) ? bits : [];
  if (safe.length === 0) return "normal";
  const n = bitsToNumber(safe) % 4;
  if (n === 0) return "normal";
  if (n === 1) return "stress";
  if (n === 2) return "drain";
  return "recovery";
}

function bitsToPayload(bits, maxKeys = 4) {
  const safe = Array.isArray(bits) ? bits : [];
  const payload = {};
  const chunkSize = 8;
  const count = Math.min(maxKeys, Math.floor(safe.length / chunkSize));

  for (let i = 0; i < count; i++) {
    const start = i * chunkSize;
    const slice = safe.slice(start, start + chunkSize);
    const val = bitsToNumber(slice);
    payload[`b${i}`] = val;
  }

  return payload;
}

function bitsToHints(bits) {
  const safe = Array.isArray(bits) ? bits : [];
  const n = bitsToNumber(safe);

  const routerHint = `r${n % 7}`;
  const meshHint   = `m${(n >> 3) % 5}`;
  const organHint  = `o${(n >> 6) % 9}`;

  return { routerHint, meshHint, organHint };
}

function computeBinaryStrength(bits) {
  const safe = Array.isArray(bits) ? bits : [];
  if (safe.length === 0) return 0;
  const ones = safe.reduce((acc, b) => acc + (b ? 1 : 0), 0);
  return ones / safe.length; // 0..1
}


// ============================================================================
//  INTERNAL: IMPULSE NORMALIZATION (Symbolic + Binary + Unbinary + Environment)
// ============================================================================
function normalizeImpulse(impulse) {
  const bits = Array.isArray(impulse.bits) ? impulse.bits : null;
  const hasBits = !!bits && bits.length > 0;
  const unbinary = !!impulse.unbinary;

  const binaryPattern  = hasBits ? bitsToPattern(bits, "bp") : null;
  const binaryMode     = hasBits ? bitsToMode(bits) : null;
  const binaryPayload  = hasBits ? bitsToPayload(bits) : {};
  const binaryHints    = hasBits ? bitsToHints(bits) : { routerHint: null, meshHint: null, organHint: null };
  const binaryStrength = hasBits ? computeBinaryStrength(bits) : 0;

  const intent =
    impulse.intent ||
    (unbinary && binaryPattern) ||
    impulse.payload.intent ||
    "pulse/unknown";

  const mode =
    impulse.payload.mode ||
    impulse.mode ||
    (unbinary && binaryMode) ||
    "normal";

  const pageId =
    impulse.payload.pageId ||
    impulse.pageId ||
    "NO_PAGE";

  // v30+ unified pulses: environment surfaced at normalization
  const environment =
    impulse.payload.environment ||
    impulse.environment ||
    impulse.payload.env ||
    "default";

  const payloadBase = impulse.payload || {};
  const payloadMerged = {
    ...payloadBase,
    ...(unbinary ? {
      binaryPattern,
      binaryMode,
      binaryPayload,
      binaryHints,
      binaryStrength
    } : {}),
    routerHint: payloadBase.routerHint || binaryHints.routerHint || null,
    meshHint:   payloadBase.meshHint   || binaryHints.meshHint   || null,
    organHint:  payloadBase.organHint  || binaryHints.organHint  || null,
    environment
  };

  const binarySummary = hasBits ? {
    hasBits: true,
    bitsLength: bits.length,
    binaryPattern,
    binaryMode,
    binaryStrength
  } : {
    hasBits: false
  };

  return {
    bits,
    hasBits,
    unbinary,
    intent,
    mode,
    pageId,
    environment,
    payload: payloadMerged,
    binarySummary
  };
}


// ============================================================================
//  INTERNAL: IMMORTAL-INTEL+++ — pulseIntelligence (system-level)
// ============================================================================
function computePulseIntelligenceIMMORTAL({
  advantageField,
  degradationTier,
  binarySummary,
  fallbackTier
}) {
  const advantageScore = advantageField.advantageScore || advantageField.patternStrength || 0;
  const advantageTier  = advantageField.advantageTier || 0;

  const presenceTier = advantageField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const degradationPenalty =
    degradationTier === "microDegrade" ? 0.0 :
    degradationTier === "softDegrade"  ? 0.05 :
    degradationTier === "midDegrade"   ? 0.15 :
    degradationTier === "hardDegrade"  ? 0.3 :
    0.5;

  const binaryWeight = binarySummary.hasBits ? (binarySummary.binaryStrength || 0) : 0;
  const fallbackBias =
    fallbackTier === "v3" ? 0.2 :
    fallbackTier === "v2" ? 0.1 :
    0.0;

  let solvednessScore =
    advantageScore * 0.4 +
    presenceWeight * 0.3 +
    binaryWeight * 0.2 +
    fallbackBias * 0.1;

  solvednessScore = Math.max(0, Math.min(1, solvednessScore - degradationPenalty));

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.7 +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  const intelShape = {
    layer: "PulseSendSystem",
    version: "v30-IMMORTAL-INTEL+++",
    solvednessScore,
    computeTier,
    readinessScore,
    degradationTier,
    binaryHasBits: !!binarySummary.hasBits,
    fallbackTier,
    advantageTier
  };

  const intelSignature = dualHash(stableStringify(intelShape)).signature;

  return {
    ...intelShape,
    pulseIntelligenceSignature: intelSignature
  };
}


// ============================================================================
//  INTERNAL: SYSTEM DIAGNOSTICS (Ancestry + Degradation + Advantage + Intel)
// ============================================================================
function buildSystemDiagnostics({ pulse, fallbackTier, binarySummary }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const lineage = Array.isArray(pulse.lineage) ? pulse.lineage : [];
  const lineageDepth = lineage.length;
  const pageId = pulse.pageId || "NO_PAGE";
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";

  const healthScore = typeof pulse.healthScore === "number"
    ? pulse.healthScore
    : 1.0;

  const degradationTier = classifyDegradationTier(healthScore);
  const advantageField = pulse.advantageField || null;

  const patternAncestry = buildPatternAncestry(pattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId
  });

  const binarySurface = extractBinarySurfaceFromPulse(pulse);

  const pulseIntelligence = computePulseIntelligenceIMMORTAL({
    advantageField,
    degradationTier,
    binarySummary,
    fallbackTier
  });

  const environment = pulse.environment || pulse.payload.environment || "default";

  return {
    pattern,
    lineageDepth,
    pageId,
    pulseType,
    fallbackTier,

    patternAncestry,
    lineageSignature,
    pageAncestrySignature,

    healthScore,
    degradationTier,
    advantageField,

    binary: binarySurface,
    pulseIntelligence,

    environment,
    environmentHash: computeHash(environment),

    patternHash: computeHash(pattern),
    lineageHash: computeHash(String(lineageDepth)),
    pageHash: computeHash(pageId),
    pulseTypeHash: computeHash(pulseType),
    fallbackTierHash: computeHash(String(fallbackTier)),
    degradationHash: computeHash(degradationTier),

    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,
    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null
  };
}


// ============================================================================
//  v30 Surfaces — cacheChunk / prewarm / presence (System-level, dual-hash)
// ============================================================================
function buildCacheChunkSurfaceSystem({ impulse, normalized, pulse, fallbackTier }) {
  const shape = {
    tickId: impulse.tickId,
    intent: normalized.intent,
    mode: normalized.mode,
    pageId: normalized.pageId,
    environment: normalized.environment,
    pulseType: pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE",
    fallbackTier
  };

  const raw = stableStringify(shape);
  const key = "psend-system-cache::" + computeHash(raw);
  const dual = dualHash(key);

  return {
    cacheChunkKey: key,
    cacheChunkSignature: dual.signature,
    cacheChunkSignatureDual: dual,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurfaceSystem({ pulse, normalized }) {
  const priority = pulse.priority || normalized.payload.priority || "normal";
  const mode = pulse.mode || normalized.mode || "normal";

  let level = "none";
  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const shape = { priority, mode, environment: normalized.environment };
  const raw = stableStringify(shape);
  const key = "psend-system-prewarm::" + computeHash(raw);
  const dual = dualHash(key);

  return {
    level,
    prewarmKey: key,
    prewarmSignature: dual.signature,
    prewarmSignatureDual: dual,
    prewarmShape: shape
  };
}

function buildPresenceSurfaceSystem({ pulse, normalized }) {
  const pattern = pulse.pattern || normalized.intent || "NO_PATTERN";
  const pageId = pulse.pageId || normalized.pageId || "NO_PAGE";

  let scope = "local";
  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const shape = { pattern, pageId, scope, environment: normalized.environment };
  const raw = stableStringify(shape);
  const key = "psend-system-presence::" + computeHash(raw);
  const dual = dualHash(key);

  return {
    scope,
    presenceKey: key,
    presenceSignature: dual.signature,
    presenceSignatureDual: dual,
    presenceShape: shape
  };
}

// v30+ unified pulses: explicit environment surface
function buildEnvironmentSurfaceSystem({ normalized, pulse, fallbackTier }) {
  const environment = pulse.environment || normalized.environment || "default";
  const shape = {
    environment,
    intent: normalized.intent,
    pageId: normalized.pageId,
    fallbackTier,
    pulseType: pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE"
  };
  const raw = stableStringify(shape);
  const key = "psend-system-environment::" + computeHash(raw);
  const dual = dualHash(key);

  return {
    environment,
    environmentKey: key,
    environmentSignature: dual.signature,
    environmentSignatureDual: dual,
    environmentShape: shape
  };
}


// ============================================================================
//  TECH SURFACE v30 — use all imports deterministically
// ============================================================================
function buildTechSurface({ impulse, normalized, pulse }) {
  const v3Available = typeof createPulseV3 === "function";
  const v2Available = typeof createPulseV2 === "function";
  const v1Available = typeof createLegacyPulse === "function";

  const routerType = typeof PulseRouter;
  const meshType   = typeof PulseMesh;

  const sendFactoryName   = typeof createPulseSend === "function" ? (createPulseSend.name || "createPulseSend") : "not-a-function";
  const sendReturnFactory = typeof createPulseSendReturn === "function" ? (createPulseSendReturn.name || "createPulseSendReturn") : "not-a-function";

  const techShape = {
    tickId: impulse.tickId,
    intent: normalized.intent,
    mode: normalized.mode,
    pageId: normalized.pageId,
    environment: normalized.environment,
    v3Available,
    v2Available,
    v1Available,
    routerType,
    meshType,
    sendFactoryName,
    sendReturnFactory,
    pulseType: pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE",
    version: "v30-IMMORTAL-INTEL+++"
  };

  const techSignature = dualHash(stableStringify(techShape)).signature;

  return {
    techSignature,
    techShape
  };
}

export function createPulseSendSystem() {
  const sdn = PulseSDN;
  function emitSDN(event, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(event, payload);
    } catch (err) {
      console.warn("[PulseSendSystem-v30-IMMORTAL-INTEL+++] SDN Emit Failed (Non‑Fatal)", { event, err });
    }
  }

  const PulseSend = createPulseSend({
    createPulseV3,
    createPulseV2,
    createPulseV1: createLegacyPulse,
    pulseRouter: PulseRouter,
    pulseMesh: PulseMesh,
    createPulseSendReturn,
    sdn
  });
  // ------------------------------------------------------------------------
  //  INTERNAL: Try Pulse v3 (Unified Organism)
  // ------------------------------------------------------------------------
  function tryPulseV3(impulse, normalized) {
    try {
      const pulse = createPulseV3({
        jobId: impulse.tickId,
        pattern: normalized.intent,
        payload: normalized.payload,
        priority: normalized.payload.priority || "normal",
        returnTo: normalized.payload.returnTo || null,
        parentLineage: normalized.payload.parentLineage || null,
        mode: normalized.mode,
        pageId: normalized.pageId,
        environment: normalized.environment
      });

      return { ok: true, pulse };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  // ------------------------------------------------------------------------
  //  INTERNAL: Try Pulse v2 (Evolution Engine)
  // ------------------------------------------------------------------------
  function tryPulseV2(impulse, normalized) {
    try {
      const pulse = createPulseV2({
        jobId: impulse.tickId,
        pattern: normalized.intent,
        payload: normalized.payload,
        priority: normalized.payload.priority || "normal",
        returnTo: normalized.payload.returnTo || null,
        parentLineage: normalized.payload.parentLineage || null,
        mode: normalized.mode,
        pageId: normalized.pageId,
        environment: normalized.environment
      });

      return { ok: true, pulse };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  // ------------------------------------------------------------------------
  //  INTERNAL: Build Pulse v1 (EvoStable-Immortal v30)
  // ------------------------------------------------------------------------
  function buildPulseV1(impulse, normalized) {
    return createLegacyPulse({
      jobId: impulse.tickId,
      pattern: normalized.intent,
      payload: normalized.payload || {},
      priority: normalized.payload.priority || "normal",
      returnTo: normalized.payload.returnTo || null,
      parentLineage: normalized.payload.parentLineage || null,
      mode: normalized.mode,
      pageId: normalized.pageId,
      environment: normalized.environment
    });
  }

  // ------------------------------------------------------------------------
  //  PUBLIC API — PulseSendSystem (v30‑IMMORTAL‑INTEL+++ + SDN‑Aware)
  // ------------------------------------------------------------------------
  return {
    async send(impulse) {
      const normalized = normalizeImpulse(impulse);

      emitSDN("sendSystem:begin", {
        tickId: impulse.tickId,
        impulseIntent: impulse.intent,
        resolvedIntent: normalized.intent,
        mode: normalized.mode,
        pageId: normalized.pageId,
        environment: normalized.environment,
        binary: normalized.binarySummary
      });

      let pulse = null;
      let fallbackTier = null;

      // ⭐ Tier 1 — Try Pulse v3
      const v3 = tryPulseV3(impulse, normalized);
      if (v3.ok) {
        pulse = v3.pulse;
        fallbackTier = "v3";
        emitSDN("sendSystem:pulse-v3", {
          tickId: impulse.tickId,
          intent: normalized.intent,
          pulseType: pulse.pulseType,
          healthScore: pulse.healthScore,
          mode: pulse.mode,
          environment: normalized.environment,
          binary: normalized.binarySummary
        });
      } else {
        emitSDN("sendSystem:v3-failed", {
          tickId: impulse.tickId,
          intent: normalized.intent,
          error: String(v3.error),
          environment: normalized.environment,
          binary: normalized.binarySummary
        });
      }

      // ⭐ Tier 2 — Try Pulse v2
      if (!pulse) {
        const v2 = tryPulseV2(impulse, normalized);
        if (v2.ok) {
          pulse = v2.pulse;
          fallbackTier = "v2";
          emitSDN("sendSystem:pulse-v2", {
            tickId: impulse.tickId,
            intent: normalized.intent,
            pulseType: pulse.pulseType,
            healthScore: pulse.healthScore,
            mode: pulse.mode,
            environment: normalized.environment,
            binary: normalized.binarySummary
          });
        } else {
          emitSDN("sendSystem:v2-failed", {
            tickId: impulse.tickId,
            intent: normalized.intent,
            error: String(v2.error),
            environment: normalized.environment,
            binary: normalized.binarySummary
          });
        }
      }

      // ⭐ Tier 3 — Fallback to Pulse v1
      if (!pulse) {
        pulse = buildPulseV1(impulse, normalized);
        fallbackTier = "v1";
        emitSDN("sendSystem:pulse-v1", {
          tickId: impulse.tickId,
          intent: normalized.intent,
          pulseType: pulse.pulseType,
          healthScore: pulse.healthScore,
          mode: pulse.mode,
          environment: normalized.environment,
          binary: normalized.binarySummary
        });
      }

      const systemDiagnostics = buildSystemDiagnostics({
        pulse,
        fallbackTier,
        binarySummary: normalized.binarySummary
      });

      const cacheChunkSurface = buildCacheChunkSurfaceSystem({
        impulse,
        normalized,
        pulse,
        fallbackTier
      });

      const prewarmSurface = buildPrewarmSurfaceSystem({
        pulse,
        normalized
      });

      const presenceSurface = buildPresenceSurfaceSystem({
        pulse,
        normalized
      });

      const environmentSurface = buildEnvironmentSurfaceSystem({
        normalized,
        pulse,
        fallbackTier
      });

      emitSDN("sendSystem:transport-begin", {
        tickId: impulse.tickId,
        intent: normalized.intent,
        fallbackTier,
        pulseType: pulse.pulseType,
        mode: pulse.mode,
        environment: normalized.environment,
        ok: undefined,
        diagnostics: systemDiagnostics,
        binary: normalized.binarySummary,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        environmentSurface
      });

      const result = PulseSend.send({
        jobId: pulse.jobId,
        pattern: pulse.pattern,
        payload: pulse.payload,
        priority: pulse.priority,
        returnTo: pulse.returnTo,
        mode: pulse.mode
      });

      const ok = !!result && result.result && result.result.ok !== false;

      emitSDN("sendSystem:transport-complete", {
        tickId: impulse.tickId,
        intent: normalized.intent,
        fallbackTier,
        pulseType: pulse.pulseType,
        mode: pulse.mode,
        environment: normalized.environment,
        ok,
        diagnostics: systemDiagnostics,
        binary: normalized.binarySummary,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        environmentSurface
      });

      if (PulseRealm.PulseBand.receivePulseSendResult) {
        PulseRealm.PulseBand.receivePulseSendResult({
          impulse,
          normalized,
          pulse,
          result,
          fallbackTier,
          diagnostics: systemDiagnostics,
          cacheChunkSurface,
          prewarmSurface,
          presenceSurface,
          environmentSurface
        });
      }

      const techSurface = buildTechSurface({ impulse, normalized, pulse });

      emitSDN("sendSystem:complete", {
        tickId: impulse.tickId,
        intent: normalized.intent,
        fallbackTier,
        pulseType: pulse.pulseType,
        mode: pulse.mode,
        environment: normalized.environment,
        ok,
        diagnostics: systemDiagnostics,
        binary: normalized.binarySummary,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        environmentSurface,
        techSurface
      });

      return {
        ok,
        pulse,
        result,
        fallbackTier,
        binary: normalized.binarySummary,
        diagnostics: systemDiagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        environmentSurface,
        techSurface
      };
    }
  };
}

PulseRealm.PulseSendSystem = createPulseSendSystem();