// ============================================================================
//  BinarySend-v30-IMMORTAL-INTEL-UNIFIED.js
//  PURE BINARY SEND ORGAN — v30 UNIFIED BAND + IMMORTAL-INTEL+++
// ============================================================================
//  ROLE:
//    - Accept ONLY pure binary arrays (0/1).
//    - Deterministic outbound binary channel.
//    - No JSON/objects/strings as *inputs* (only internal ops).
//    - No lineage, no pattern, no routing hints on the wire.
//    - Binary-first, dual-band aware (but band="binary" here).
//    - 12.3+: cacheChunk / prewarm / presence surfaces.
//    - v16: proxy-aware (pressure / fallback / boost), organism-aware.
//    - v24: INTEL+ADVANTAGE surface + ER-ready binarySendMeta profile.
//    - v30: UNIFIED with PulseSendAdapter-v30 + Mesh/Router band fabric.
//    - Fallback-safe: deterministic fallback to proxy.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
//  IMPORT SURFACE — v30 UNIFIED STACK
// ============================================================================

// Evolution Engines (symbolic tech surfaces)
import { createPulseV2 as PulseV2EvolutionEngine } from "./PULSES/PulseSendV2EvolutionEngine-v31.js";
import { createPulseV3_v31 as PulseV3UnifiedOrganism } from "./PULSES/PulseSendV3UnifiedOrganism-v31.js";

// Impulse Layer
import { createPulseSendImpulse as PulseSendImpulse } from "./PulseSendImpulse-v30.js";

// Legacy Pulse Layer
import { createLegacyPulse as PulseSendLegacyPulse } from "./PULSES/PulseSendLegacyPulse-v31.js";

// Adapter Layer — v30 IMMORTAL-INTEL+++ (unified band)
import { PulseSendAdapter } from "./PulseSendAdapter-v30.js";

// Engine Layer
import { PulseSendEngineV30 as PulseSendEngine } from "./PulseSendEngine-v30.js";

// Return Layer
import { createPulseSendReturn as PulseSendReturn } from "./PulseSendReturn-v30.js";

// System Layer (Final Conductor)
import { createPulseSendSystem as PulseSendSystem } from "./PULSES/PulseSendSystem-v31.js";

// Proxy Context (IMMORTAL ORGANISM v30)
import { getProxyContext, getProxyPressure, getProxyBoost,  getProxyFallback,  getProxyMode,  getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";





// ============================================================================
//  v30-IMMORTAL-INTEL+++ — dual-hash + healing meta (symbolic-only)
// ============================================================================

function computeClassicHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeIntelHash(payload) {
  const s = JSON.stringify(payload || {});
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
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
  const intel = computeIntelHash(intelBase);
  const classic = computeClassicHash(`${label}::${classicString || ""}`);
  return { intel, classic };
}

// IMMORTAL healing/meta surface for BinarySend v30
const binarySendHealingV30 = {
  cycleCount: 0,
  lastLength: 0,
  lastSignature: null,
  lastCacheChunk: null,
  lastPrewarm: null,
  lastPresenceScope: null,
  lastProxyMode: null,
  lastMaxThroughput: null,
  lastIntelSignature: null,
  lastClassicSignature: null
};

export function getBinarySendHealingStateV30() {
  return { ...binarySendHealingV30 };
}
// ============================================================================
//  PROXY INTEGRATION — BinarySend Throughput Control (symbolic-only)
// ============================================================================

function computeMaxBinaryThroughputV30() {
  let maxBinaryThroughput = 8; // default safe throughput

  if (getProxyFallback()) {
    maxBinaryThroughput = Math.max(1, maxBinaryThroughput - 4);
  }

  const proxyPressure = getProxyPressure();
  if (proxyPressure > 0.7) {
    maxBinaryThroughput = Math.max(1, maxBinaryThroughput - 2);
  } else if (proxyPressure > 0.4) {
    maxBinaryThroughput = Math.max(1, maxBinaryThroughput - 1);
  }

  if (getProxyBoost() > 0.5 && !getProxyFallback()) {
    maxBinaryThroughput += 2;
  }

  if (getProxyMode() === "fallback") {
    maxBinaryThroughput = 1;
  }

  return maxBinaryThroughput;
}


// ============================================================================
//  Pulse Intelligence (logic-only, IMMORTAL-safe, v30 surface)
// ============================================================================

function computePulseIntelligenceV30({ advantageField, presenceField, factoringSignal, band }) {
  const advantageScore = Number(advantageField.advantageScore || 0);
  const advantageTier = Number(advantageField.advantageTier || 0);

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    presenceTier === "low"      ? 0.3 :
    0.2;

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 5 +
      presenceWeight * 0.3 +
      factoring * 0.2,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.6 +
      (bandIsBinary ? 0.2 : 0) +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };
}


// ============================================================================
//  BINARY SURFACE FUNCTIONS — v30 IMMORTAL-INTEL+++
// ============================================================================

// 24++/30: shared signature for all v30 binary-aware organs
export function computeBinarySignatureV30(bits) {
  let h = 0;
  for (let i = 0; i < bits.length; i++) {
    h = (h + bits[i] * (i + 17)) % 262144;   // 18-bit stable
  }
  return `b30_${h}`;
}

export function computeBinaryCacheChunkV30(bits) {
  let acc = 1;
  for (let i = 0; i < bits.length; i++) {
    acc = (acc * 37 + bits[i]) % 16381;      // 14-bit stable
  }
  return `cc30_${acc}`;
}

export function computeBinaryPrewarmV30(bits) {
  const len = bits.length;

  if (len >= 4096) return "prewarm-ultra-max";
  if (len >= 2048) return "prewarm-ultra";
  if (len >= 1024) return "prewarm-aggressive";
  if (len >= 256)  return "prewarm-medium";
  if (len >= 64)   return "prewarm-light";
  return "prewarm-none";
}

export function computeBinaryPresenceV30(bits) {
  const len = bits.length;

  if (len >= 16384) return "presence-global-max";
  if (len >= 4096)  return "presence-global";
  if (len >= 1024)  return "presence-page";
  if (len >= 256)   return "presence-local-strong";
  return "presence-local";
}


// ============================================================================
//  v14.4+ Binary Intelligence (binary-only, organism-aware, v30 tuned)
// ============================================================================

function computeBinaryIntelligenceV30(bits) {
  const len = bits.length;

  const ones = bits.reduce((a, b) => a + b, 0);
  const density = len > 0 ? ones / len : 0;

  const parity = ones % 2 === 0 ? "even" : "odd";
  const shiftDepth = len > 0 ? (bits[0] === 1 ? 1 : 0) : 0;

  const cacheChunk = computeBinaryCacheChunkV30(bits);
  const prewarm = computeBinaryPrewarmV30(bits);
  const presence = computeBinaryPresenceV30(bits);
  const signature = computeBinarySignatureV30(bits);

  const solvednessScore = Math.min(
    1,
    density * 0.6 +
      (shiftDepth ? 0.2 : 0) +
      (len > 512 ? 0.2 : 0)
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const baseReadinessScore = Math.min(
    1,
    solvednessScore * 0.7 + (parity === "even" ? 0.1 : 0)
  );

  const proxyPressure = getProxyPressure();
  const proxyFallback = getProxyFallback();
  const proxyBoost = getProxyBoost();

  const organismAdjustedReadiness = Math.max(
    0,
    Math.min(
      baseReadinessScore * (proxyFallback ? 0.5 : 1) -
        proxyPressure * 0.2 +
        (proxyBoost > 0.5 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    computeTier,
    readinessScore: organismAdjustedReadiness,
    parity,
    density,
    shiftDepth,
    cacheChunk,
    prewarm,
    presence,
    signature,
    length: len
  };
}


// ============================================================================
//  SHARED: build v30 INTEL+ADVANTAGE surface from binary intelligence
// ============================================================================

function buildIntelAdvantageSurfaceV30(binaryIntel, proxyMeta) {
  const advantageField = {
    advantageScore: binaryIntel.solvednessScore,
    advantageTier:
      binaryIntel.computeTier === "nearSolution" ? 3 :
      binaryIntel.computeTier === "highValue"    ? 2 :
      binaryIntel.computeTier === "normal"       ? 1 :
      0
  };

  const presenceField = {
    presenceTier:
      binaryIntel.presence === "presence-global" ||
      binaryIntel.presence === "presence-global-max"
        ? "critical"
        : binaryIntel.presence === "presence-page"
        ? "high"
        : "soft",
    presenceBand: "binary"
  };

  const factoringSignal = binaryIntel.parity === "even";
  const band = "binary";

  const pulseIntel = computePulseIntelligenceV30({
    advantageField,
    presenceField,
    factoringSignal,
    band
  });

  return {
    advantageField,
    presenceField,
    factoringSignal,
    band,
    pulseIntel,
    proxyMeta
  };
}


// ============================================================================
//  TECH SURFACES (v30 UNIFIED) — use ALL imports on binary envelope
// ============================================================================

function runTechSurfacesV30(bits) {
  const v2 = PulseV2EvolutionEngine.createPulseV2
    ? PulseV2EvolutionEngine.createPulseV2({ bits })
    : null;

  const v3 = PulseV3UnifiedOrganism.createPulseV3
    ? PulseV3UnifiedOrganism.createPulseV3({ bits })
    : null;

  const impulse = PulseSendImpulse.createImpulse
    ? PulseSendImpulse.createImpulse(bits)
    : null;

  const legacy = PulseSendLegacyPulse.createLegacyPulse
    ? PulseSendLegacyPulse.createLegacyPulse(bits)
    : null;

  const adapter = PulseSendAdapter.adapt
    ? PulseSendAdapter.adapt(bits, "Mesh", "normal")
    : null;

  const engine = PulseSendEngine.engine
    ? PulseSendEngine.engine(bits)
    : null;

  const ret = PulseSendReturn.ret
    ? PulseSendReturn.ret(bits)
    : null;

  const system = PulseSendSystem.conduct
    ? PulseSendSystem.conduct(bits)
    : null;

  return {
    v2,
    v3,
    impulse,
    legacy,
    adapter,
    engine,
    ret,
    system
  };
}


// ============================================================================
//  FACTORY — createBinarySendV30 (UNIFIED IMMORTAL-INTEL+++)
// ============================================================================

export function createBinarySendV30({
  fallbackProxy,
  trace = false
} = {}) {

  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  function ensurePureBinaryOrFallback(op, bits, reason) {
    if (!isPureBinary(bits)) {
      return fallback(op, bits, reason);
    }
    return bits;
  }

  function send(bits) {
    const pure = ensurePureBinaryOrFallback("send", bits, "non-binary-output");

    binarySendHealingV30.cycleCount++;
    binarySendHealingV30.lastLength = pure.length;

    const signature  = computeBinarySignatureV30(pure);
    const cacheChunk = computeBinaryCacheChunkV30(pure);
    const prewarm    = computeBinaryPrewarmV30(pure);
    const presence   = computeBinaryPresenceV30(pure);

    binarySendHealingV30.lastSignature = signature;
    binarySendHealingV30.lastCacheChunk = cacheChunk;
    binarySendHealingV30.lastPrewarm = prewarm;
    binarySendHealingV30.lastPresenceScope = presence;

    const recommendedThroughput = computeMaxBinaryThroughputV30();
    const proxyMode = getProxyMode();

    binarySendHealingV30.lastMaxThroughput = recommendedThroughput;
    binarySendHealingV30.lastProxyMode = proxyMode;

    const tech = runTechSurfacesV30(pure);

    const binaryIntel = computeBinaryIntelligenceV30(pure);

    const proxyMeta = {
      proxyPressure: getProxyPressure(),
      proxyFallback: getProxyFallback(),
      proxyBoost: getProxyBoost(),
      proxyMode,
      proxyLineage: getProxyLineage(),
      proxyContext: getProxyContext()
    };

    const intelAdvantage = buildIntelAdvantageSurfaceV30(binaryIntel, proxyMeta);

    const intelPayload = {
      kind: "binarySendV30",
      version: "v30-IMMORTAL-INTEL-UNIFIED",
      cycleIndex: binarySendHealingV30.cycleCount,
      length: pure.length,
      signature,
      cacheChunk,
      prewarm,
      presenceScope: presence,
      recommendedThroughput,
      proxyMode,
      proxyPressure: proxyMeta.proxyPressure,
      proxyBoost: proxyMeta.proxyBoost,
      proxyFallback: proxyMeta.proxyFallback,
      proxyLineage: proxyMeta.proxyLineage,
      binaryIntel,
      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel
    };

    const classicString =
      `LEN:${pure.length}` +
      `::SIG:${signature}` +
      `::CC:${cacheChunk}` +
      `::PRE:${prewarm}` +
      `::PRES:${presence}` +
      `::THR:${recommendedThroughput}` +
      `::MODE:${proxyMode}`;

    const dual = buildDualHashSignature("BINARY_SEND_ORGAN_V30", intelPayload, classicString);

    binarySendHealingV30.lastIntelSignature = dual.intel;
    binarySendHealingV30.lastClassicSignature = dual.classic;

    if (trace) {
      console.log("[BinarySend-v30] OUT:", pure, {
        signature,
        cacheChunk,
        prewarm,
        presence,
        tech,
        binaryIntel,
        intelAdvantage,
        proxyMeta,
        recommendedThroughput,
        intelSignature: dual.intel,
        classicSignature: dual.classic
      });
    }

    return {
      ok: true,
      bits: pure,
      signature,
      cacheChunk,
      prewarm,
      presence,
      tech,

      binaryIntel,
      binaryIntelSignature: signature,

      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel,

      length: pure.length,
      proxyMeta,
      recommendedThroughput,

      intelSignature: dual.intel,
      classicSignature: dual.classic,
      binarySendMeta: {
        layer: "BinarySend",
        role: "PURE_BINARY_SEND_ORGAN",
        version: "v30-IMMORTAL-INTEL-UNIFIED",
        erReady: true,
        signatures: {
          intel: dual.intel,
          classic: dual.classic
        },
        evo: {
          deterministicField: true,
          driftProof: true,
          multiInstanceReady: true,
          binaryFirst: true,
          advantageAware: true,
          proxyAware: true,
          cacheChunkAware: true,
          prewarmAware: true,
          presenceAware: true,
          zeroRoutingInfluence: true,
          zeroMutation: true,
          zeroIO: true
        },
        profile: {
          cycleIndex: binarySendHealingV30.cycleCount,
          length: pure.length,
          prewarm,
          presenceScope: presence,
          recommendedThroughput,
          proxyMode
        }
      }
    };
  }

  function fallback(op, bits, reason) {
    if (!fallbackProxy) {
      throw new Error(
        `BinarySend-v30 fallback triggered (${reason}) but no fallbackProxy provided`
      );
    }

    if (trace) {
      console.warn("[BinarySend-v30] FALLBACK (%s): %s", op, reason, bits);
    }

    const result = fallbackProxy.exchange
      ? fallbackProxy.exchange(bits)
      : fallbackProxy(bits);

    const safe = Array.isArray(result) ? result : [];

    binarySendHealingV30.cycleCount++;
    binarySendHealingV30.lastLength = safe.length;

    const signature  = computeBinarySignatureV30(safe);
    const cacheChunk = computeBinaryCacheChunkV30(safe);
    const prewarm    = computeBinaryPrewarmV30(safe);
    const presence   = computeBinaryPresenceV30(safe);

    binarySendHealingV30.lastSignature = signature;
    binarySendHealingV30.lastCacheChunk = cacheChunk;
    binarySendHealingV30.lastPrewarm = prewarm;
    binarySendHealingV30.lastPresenceScope = presence;

    const recommendedThroughput = computeMaxBinaryThroughputV30();
    const proxyMode = getProxyMode();

    binarySendHealingV30.lastMaxThroughput = recommendedThroughput;
    binarySendHealingV30.lastProxyMode = proxyMode;

    const tech = runTechSurfacesV30(safe);

    const binaryIntel = computeBinaryIntelligenceV30(safe);

    const proxyMeta = {
      proxyPressure: getProxyPressure(),
      proxyFallback: getProxyFallback(),
      proxyBoost: getProxyBoost(),
      proxyMode,
      proxyLineage: getProxyLineage(),
      proxyContext: getProxyContext()
    };

    const intelAdvantage = buildIntelAdvantageSurfaceV30(binaryIntel, proxyMeta);

    const intelPayload = {
      kind: "binarySendV30Fallback",
      version: "v30-IMMORTAL-INTEL-UNIFIED",
      cycleIndex: binarySendHealingV30.cycleCount,
      length: safe.length,
      signature,
      cacheChunk,
      prewarm,
      presenceScope: presence,
      recommendedThroughput,
      proxyMode,
      proxyPressure: proxyMeta.proxyPressure,
      proxyBoost: proxyMeta.proxyBoost,
      proxyFallback: proxyMeta.proxyFallback,
      proxyLineage: proxyMeta.proxyLineage,
      binaryIntel,
      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel,
      reason
    };

    const classicString =
      `FALLBACK` +
      `::LEN:${safe.length}` +
      `::SIG:${signature}` +
      `::CC:${cacheChunk}` +
      `::PRE:${prewarm}` +
      `::PRES:${presence}` +
      `::THR:${recommendedThroughput}` +
      `::MODE:${proxyMode}` +
      `::REASON:${reason}`;

    const dual = buildDualHashSignature("BINARY_SEND_ORGAN_V30_FALLBACK", intelPayload, classicString);

    binarySendHealingV30.lastIntelSignature = dual.intel;
    binarySendHealingV30.lastClassicSignature = dual.classic;

    return {
      ok: false,
      fallback: true,
      reason,
      bits: safe,
      signature,
      cacheChunk,
      prewarm,
      presence,
      tech,

      binaryIntel,
      binaryIntelSignature: signature,

      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel,

      length: safe.length,
      proxyMeta,
      recommendedThroughput,

      intelSignature: dual.intel,
      classicSignature: dual.classic,
      binarySendMeta: {
        layer: "BinarySend",
        role: "PURE_BINARY_SEND_ORGAN",
        version: "v30-IMMORTAL-INTEL-UNIFIED",
        fallback: true,
        signatures: {
          intel: dual.intel,
          classic: dual.classic
        },
        evo: {
          deterministicField: true,
          driftProof: true,
          multiInstanceReady: true,
          binaryFirst: true,
          advantageAware: true,
          proxyAware: true,
          cacheChunkAware: true,
          prewarmAware: true,
          presenceAware: true,
          zeroRoutingInfluence: true,
          zeroMutation: true,
          zeroIO: true
        },
        profile: {
          cycleIndex: binarySendHealingV30.cycleCount,
          length: safe.length,
          prewarm,
          presenceScope: presence,
          recommendedThroughput,
          proxyMode,
          reason
        }
      }
    };
  }

  return {
    send,
    fallback
  };
}

PulseRealm.SendBinary = {
  createBinarySendV30,
  getBinarySendHealingStateV30,
  computeBinaryCacheChunkV30,
  computeBinaryPresenceV30,
  computeBinaryPrewarmV30,
  computeBinarySignatureV30
}

PulseRealm.PulseSendBinary = createBinarySendV30;