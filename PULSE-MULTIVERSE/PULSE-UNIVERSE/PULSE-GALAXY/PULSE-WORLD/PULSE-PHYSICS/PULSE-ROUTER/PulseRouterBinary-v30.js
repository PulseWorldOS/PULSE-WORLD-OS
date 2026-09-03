// ============================================================================
// BinaryRouter-CosmosMultiverse-v30-Immortal-UNIFIED-BAND-INTEL-Evo++++.js
// PULSE-WORLD / BINARY-ROUTER / MULTIVERSE COSMOS — v30+ UNIFIED BAND
// ROLE:
//   - Pure binary → binary router with multiverse placement.
//   - UnifiedBand-aware (symbolic | binary | dual) via bandContext.
//   - Deterministic handler selection (no randomness, no timestamps).
//   - DualHash routing signatures (reversible-friendly).
//   - Tiered fallback (proxy → mesh → node).
//   - Multiverse-aware routing metadata.
//   - Router-intelligence surface (bits/handler/cosmos/proxy insight).
//   - Advantage / integrity / envelope-aware routing.
//   - Session/band/route-aware (schema-only, no IO).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../Pulse-Coordinator/PulseProxyContext-v30.js";

export const PulseBinaryRouterRole = Object.freeze({
  layer: "BinaryRouter",
  role: "PULSE_BINARY_ROUTER_UNIFIED_BAND",
  version: "v30-Immortal-UNIFIED-BAND-INTEL-Evo++++",
  guarantees: Object.freeze({
    pureBinaryContract: true,
    deterministic: true,
    zeroRandomness: true,
    zeroTimestamps: true,
    zeroNetwork: true,
    zeroEval: true,
    zeroDynamicImports: true
  })
});

const BINARY_ROUTER_SCHEMA_VERSION = "v4-unified-band";

// ---------------------------------------------------------------------------
// HASH / DUALHASH HELPERS (pure, deterministic)
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 131072;
  }
  return `br30-h${h.toString(16)}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1048573;
  }
  return `br30-a${h.toString(16)}`;
}

function computeDualHash(str) {
  const primary = computeHash(str);
  const secondary = computeAltHash(str);
  const combined = computeHash(primary + "::" + secondary);
  return { primary, secondary, combined };
}

// ---------------------------------------------------------------------------
function computeBitsStats(bits) {
  const len = Array.isArray(bits) ? bits.length : 0;
  if (len === 0) {
    return {
      length: 0,
      ones: 0,
      zeros: 0,
      onesRatio: 0,
      zerosRatio: 0
    };
  }
  let ones = 0;
  for (let i = 0; i < len; i++) {
    if (bits[i] === 1) ones++;
  }
  const zeros = len - ones;
  return {
    length: len,
    ones,
    zeros,
    onesRatio: ones / len,
    zerosRatio: zeros / len
  };
}

// ---------------------------------------------------------------------------
// UNIFIED BAND SIGNATURE
// ---------------------------------------------------------------------------
function buildUnifiedBandSignature({ bits, cosmos, bandContext }) {
  const stats = computeBitsStats(bits);
  const base = {
    band: bandContext || "binary",
    bitsLength: stats.length,
    ones: stats.ones,
    zeros: stats.zeros,
    universeId: cosmos.universeId,
    timelineId: cosmos.timelineId,
    branchId: cosmos.branchId,
    sessionId: cosmos.sessionId || null
  };
  return computeDualHash(JSON.stringify(base));
}

// ---------------------------------------------------------------------------
// ADVANTAGE / INTEGRITY / INTELLIGENCE (proxy-aware v30)
// ---------------------------------------------------------------------------
function computeRouterAdvantage({ bits, handlerIndex, handlersCount, proxy }) {
  const stats = computeBitsStats(bits);
  const load = handlersCount > 0 ? handlerIndex / handlersCount : 0;

  const density = stats.length > 0 ? stats.onesRatio : 0;
  const balance = 1 - Math.abs(0.5 - stats.onesRatio) * 2;
  const entropyProxy =
    stats.onesRatio > 0 && stats.zerosRatio > 0
      ? Math.min(1, stats.onesRatio * stats.zerosRatio * 4)
      : 0;

  const proxyPressure = proxy.pressure ?? 0;
  const proxyBoost = proxy.boost ?? 0;
  const proxyFallback = proxy.fallback === true;

  const advantage =
    0.35 * entropyProxy +
    0.25 * balance +
    0.20 * (stats.length > 0 ? 1 : 0) +
    0.10 * proxyBoost -
    0.10 * (proxyFallback ? 1 : 0);

  return {
    stats,
    density,
    balance,
    entropyProxy,
    handlerLoad: load,
    advantage,
    proxySnapshot: {
      mode: proxy.mode || null,
      pressure: proxyPressure,
      boost: proxyBoost,
      fallback: proxyFallback,
      lineage: proxy.lineage || null
    }
  };
}

function computeRouterIntegrity({ bits, cosmos, handlerIndex, handlersCount, proxy }) {
  const hasBits = Array.isArray(bits) && bits.length > 0 ? 1 : 0;
  const hasCosmos =
    cosmos && cosmos.universeId && cosmos.timelineId && cosmos.branchId ? 1 : 0;
  const hasHandlerInfo = handlersCount > 0 ? 1 : 0;

  const base =
    0.30 * hasBits +
    0.30 * hasCosmos +
    0.25 * hasHandlerInfo +
    0.15 * (proxy ? 1 : 0);

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.97 ? "immortal" :
    score >= 0.90 ? "excellent" :
    score >= 0.75 ? "good" :
    score >= 0.60 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return { score, status, degraded };
}

function computeRouterIntelligence({ bits, handlerIndex, handlersCount, cosmos, unifiedBandSignature }) {
  const stats = computeBitsStats(bits);
  const handlerLoad = handlersCount > 0 ? handlerIndex / handlersCount : 0;

  const entropyProxy = Math.min(
    1,
    (stats.onesRatio > 0 && stats.zerosRatio > 0)
      ? (stats.onesRatio * stats.zerosRatio * 4)
      : 0
  );

  const readinessScore = Math.max(
    0,
    Math.min(
      0.5 * entropyProxy +
      0.3 * (stats.length > 0 ? 1 : 0) +
      0.2 * (1 - Math.abs(0.5 - stats.onesRatio) * 2),
      1
    )
  );

  const routeShape = {
    universeId: cosmos.universeId,
    timelineId: cosmos.timelineId,
    branchId: cosmos.branchId,
    handlerIndex,
    handlersCount,
    bitsLength: stats.length,
    unifiedBandSignature: unifiedBandSignature.combined
  };

  const routeDualHash = computeDualHash(JSON.stringify(routeShape));

  return {
    stats,
    entropyProxy,
    readinessScore,
    handlerIndex,
    handlersCount,
    handlerLoad,
    routeDualHash,
    unifiedBandSignature
  };
}

// ---------------------------------------------------------------------------
// ROUTE ENVELOPE (no timestamps, deterministic)
// ---------------------------------------------------------------------------
function buildRouteEnvelope({
  op,
  ok,
  fallback,
  reason,
  bits,
  handlerIndex,
  handlersCount,
  cosmos,
  cosmosSignature,
  bandContext,
  proxy
}) {
  const unifiedBandSignature = buildUnifiedBandSignature({ bits, cosmos, bandContext });

  const intel = computeRouterIntelligence({
    bits,
    handlerIndex,
    handlersCount,
    cosmos,
    unifiedBandSignature
  });

  const advantage = computeRouterAdvantage({
    bits,
    handlerIndex,
    handlersCount,
    proxy
  });

  const integrity = computeRouterIntegrity({
    bits,
    cosmos,
    handlerIndex,
    handlersCount,
    proxy
  });

  const base = {
    schemaVersion: BINARY_ROUTER_SCHEMA_VERSION,
    version: PulseBinaryRouterRole.version,
    op,
    ok,
    fallback: !!fallback,
    reason: reason || null,
    cosmos,
    cosmosSignature,
    band: bandContext || "binary",
    handlerIndex,
    handlersCount,
    bitsLength: intel.stats.length
  };

  const signatureShape = {
    base,
    advantage,
    integrity,
    intel
  };

  const signature = computeDualHash(JSON.stringify(signatureShape));

  return {
    ...base,
    bits,
    signature,
    advantage,
    integrity,
    routerIntelligence: intel
  };
}

// ============================================================================
// FACTORY — Binary Router v30 UNIFIED BAND
// ============================================================================
export function createBinaryRouterUnifiedBand({
  handlers = [],
  fallbackProxy,
  fallbackMesh,
  fallbackNode,
  trace = false,
  cosmosContext = {},
  bandContext = "binary",   // "symbolic" | "binary" | "dual"
  sessionId = null,
  binaryTechCarrier = null  // optional BinaryPulse carrier (no IO)
} = {}) {

  const cosmos = {
    universeId: cosmosContext.universeId || "u:default",
    timelineId: cosmosContext.timelineId || "t:main",
    branchId: cosmosContext.branchId || "b:root",
    band: bandContext || cosmosContext.band || "binary",
    sessionId: sessionId || cosmosContext.sessionId || null
  };

  const cosmosSignature = computeDualHash(JSON.stringify(cosmos));

  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  function proxySnapshot() {
    return {
      mode: getProxyMode() || null,
      pressure: getProxyPressure() ?? 0,
      boost: getProxyBoost() ?? 0,
      fallback: getProxyFallback() === true,
      lineage: getProxyLineage() || null,
      context: getProxyContext() || null
    };
  }

  function ensurePureBinaryOrFallback(op, bits, reason) {
    if (!isPureBinary(bits)) {
      return fallback(op, bits, reason);
    }
    return bits;
  }

  function register(handler) {
    handlers.push(handler);
  }

  function fallback(op, bits, reason) {
    if (trace) {
      console.warn(
        `[BinaryRouter-v30-UNIFIED-BAND] FALLBACK (${op}):`,
        reason,
        bits
      );
    }

    let result = null;

    if (fallbackProxy.exchange) {
      result = fallbackProxy.exchange(bits, reason, cosmos);
    } else if (fallbackMesh.exchange) {
      result = fallbackMesh.exchange(bits, reason, cosmos);
    } else if (fallbackNode.exchange) {
      result = fallbackNode.exchange(bits, reason, cosmos);
    } else {
      // still deterministic: throw is last resort
      throw new Error(
        `BinaryRouter-v30 fallback triggered (${reason}) with no handlers`
      );
    }

    const outBits = Array.isArray(result) ? result : [];
    const proxy = proxySnapshot();

    const envelope = buildRouteEnvelope({
      op: op || "route",
      ok: false,
      fallback: true,
      reason,
      bits: outBits,
      handlerIndex: -1,
      handlersCount: handlers.length,
      cosmos,
      cosmosSignature,
      bandContext,
      proxy
    });

    return {
      ok: false,
      fallback: true,
      reason,
      cosmos,
      cosmosSignature,
      bits: outBits,
      signature: envelope.signature,
      length: outBits.length,
      routerIntelligence: envelope.routerIntelligence,
      advantage: envelope.advantage,
      integrity: envelope.integrity,
      envelope
    };
  }

  function route(bits) {
    const pure = ensurePureBinaryOrFallback("route", bits, "non-binary-input");
    if (!Array.isArray(pure)) {
      // already handled by fallback
      return pure;
    }

    if (handlers.length === 0) {
      return fallback("route", pure, "no-handlers");
    }

    try {
      // Optional: consult binaryTechCarrier for a deterministic hint only
      let handlerIndexHint = null;
      if (binaryTechCarrier && typeof binaryTechCarrier.nextPulse === "function") {
        const carrier = binaryTechCarrier.nextPulse();
        if (carrier && typeof carrier.handlerIndexHint === "number") {
          handlerIndexHint = carrier.handlerIndexHint;
        }
      }

      const sum = pure.reduce((a, b) => a + b, 0);
      const baseIndex = sum % handlers.length;
      const index =
        typeof handlerIndexHint === "number"
          ? (baseIndex + handlerIndexHint) % handlers.length
          : baseIndex;

      const handler = handlers[index];
      const out = handler(pure);

      const pureOut = ensurePureBinaryOrFallback(
        "route",
        out,
        "non-binary-output"
      );
      if (!Array.isArray(pureOut)) {
        // fallback already returned envelope
        return pureOut;
      }

      const proxy = proxySnapshot();

      const envelope = buildRouteEnvelope({
        op: "route",
        ok: true,
        fallback: false,
        reason: null,
        bits: pureOut,
        handlerIndex: index,
        handlersCount: handlers.length,
        cosmos,
        cosmosSignature,
        bandContext,
        proxy
      });

      if (trace) {
        console.log(
          "[BinaryRouter-v30-UNIFIED-BAND] ROUTE:",
          pure,
          "→",
          pureOut,
          "cosmos:",
          cosmos,
          "band:",
          bandContext,
          "intel:",
          envelope.routerIntelligence,
          "advantage:",
          envelope.advantage,
          "integrity:",
          envelope.integrity
        );
      }

      return {
        ok: true,
        cosmos,
        cosmosSignature,
        band: bandContext,
        bits: pureOut,
        signature: envelope.signature,
        handlerIndex: index,
        length: pureOut.length,
        routerIntelligence: envelope.routerIntelligence,
        advantage: envelope.advantage,
        integrity: envelope.integrity,
        envelope
      };

    } catch (err) {
      return fallback("route", pure, "handler-exception");
    }
  }

  return {
    role: PulseBinaryRouterRole,
    register,
    route,
    fallback,
    cosmos,
    cosmosSignature,
    band: bandContext
  };
}
