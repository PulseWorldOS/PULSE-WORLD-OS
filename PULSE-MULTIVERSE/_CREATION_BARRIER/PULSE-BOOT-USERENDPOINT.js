// ============================================================================
// PulseWorldEndpoint-v34-IMMORTAL-FINALITY.js
// ============================================================================
// CENTRAL NERVOUS ENDPOINT FOR PULSE ARCHITECTURE — v34 IMMORTAL
// ----------------------------------------------------------------------------
//  • Single canonical endpoint for CNS, CheckBand, PulseNet, Transport, PulseBand
//  • Deterministic, chunk-aware, cache-aware, prewarmable, pulse-aware, versioned
//  • v33→v34: bandFamily / dnaTag / meshTag aware, Finality via ProtocolSignalPort
//  • v34: AUTO-BUILT PulseWorldPort (PulseNetRegistry warm + provider port ready)
//  • HYBRID: old emitSignal/emitFinality kept as wrappers over NEW SIGNAL
// ============================================================================

// ----------------------------------------------------------------------------
// FACTORY WRAPPER — v34 IMMORTAL
// ----------------------------------------------------------------------------
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { ProtocolSignalPort, buildPulseWorldPort} from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-PROTOCOL/PULSE-PROTOCOL.js";

console.log("%c🛰️ PULSE MULTIVERSAL ROUTER v32.0 — [PulseBootEndpoint v33] User Expression Barrier Passed, Its All or Nothing Now!",
  "color:#5CAAC0; font-weight:bold; font-family:monospace;"
);

const C_ID   = "color:#5CAAC0; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";




const PulseOSCheckRouterMemory =
  PulseRealm.PulseOSCheckRouterMemory && typeof PulseRealm.PulseOSCheckRouterMemory === "function"
    ? PulseRealm.PulseOSCheckRouterMemory
    : null;

// ============================================================================
// UNDERSTANDING NORMALIZATION LAYER — v34 IMMORTAL
// ============================================================================

function normalizeUnderstanding(route = {}) {
  try {
    const u = PulseRealm.PulseUnderstanding.normalizeRoute(route);
    if (u) return u;
  } catch (_) {}

  return {
    type: route.type || route.path || "Unknown",
    payload: route.payload || null,
    bandId: resolveBandFromRoute(route, route.payload),
    bandFamily: resolveBandFamilyFromRoute(route, route.payload),
    dnaTag: resolveDnaTagFromRoute(route, route.payload),
    meshTag: resolveMeshTagFromRoute(route, route.payload)
  };
}

function emitUnderstandingFinality(routeMeta, result) {
  try {
    PulseRealm.PulseUnderstanding.emitFinality({
      route: routeMeta,
      result,
      timestamp: PulseRealm.PulseNOW,
      endpoint: "PulseWorldEndpoint-v34"
    });
  } catch (_) {}
}

// ============================================================================
// UNDERSTANDING ROUTE META BUILDER — v34 IMMORTAL
// ============================================================================

function buildUnderstandingRouteMeta(route = {}) {
  const normalized = normalizeUnderstanding(route);

  return Object.freeze({
    type: normalized.type,
    payload: normalized.payload,
    bandId: normalized.bandId,
    bandFamily: normalized.bandFamily,
    dnaTag: normalized.dnaTag,
    meshTag: normalized.meshTag,
    timestamp: PulseRealm.PulseNOW,
    endpoint: "PulseWorldEndpoint-v34"
  });
}

// ============================================================================
// UNDERSTANDING PRE-DISPATCH WRAPPER — v34 IMMORTAL
// ============================================================================

function preprocessUnderstanding(route) {
  const meta = buildUnderstandingRouteMeta(route);

  emitSignal("understanding.pre", meta);
  emitFinality("understanding.pre", meta);
  emitUnderstandingFinality(meta, { stage: "pre-dispatch" });

  return meta;
}

// ----------------------------------------------------------------------------
// SIGNAL INTEGRATION (HYBRID)
// ----------------------------------------------------------------------------
// NEW: use ProtocolSignalPort as the real engine.
// OLD: keep emitSignal/emitFinality as compatibility wrappers.


function emitSignal(event, payload) {
  try {
    ProtocolSignalPort.emit(event, payload || {});
  } catch {
    // never crash endpoint from telemetry
  }
}

function emitFinality(event, payload) {
  try {
    ProtocolSignalPort.dispatch(
      "ENDPOINT_FINALITY",
      async () => ({
        event,
        payload: payload || {},
        ts: PulseRealm.PulseNOW
      }),
      { endpoint: "PulseWorldEndpoint-v34" }
    );
  } catch {
    // never crash
  }
}

// ----------------------------------------------------------------------------
// BAND MODEL (v34)
// ----------------------------------------------------------------------------

const BAND_FAMILY = {
  PULSEBAND: "PulseBand",
  MESHBAND: "meshband"
};

function normalizeBandId(bandId) {
  const v = (bandId || "symbolic").toString().toLowerCase();
  if (v === "binary") return "binary";
  if (v === "dual") return "dual";
  if (v === "mesh") return "mesh";
  return "symbolic";
}

function normalizeBandFamily(family) {
  const v = (family || BAND_FAMILY.PULSEBAND).toString().toLowerCase();
  if (v === BAND_FAMILY.MESHBAND) return BAND_FAMILY.MESHBAND;
  return BAND_FAMILY.PULSEBAND;
}

function resolveBandFromRoute(route, payload) {
  const p = payload || route.payload || {};
  const band =
    p.__band ||
    p.band ||
    p.bandId ||
    route.band ||
    route.bandId ||
    "symbolic";
  return normalizeBandId(band);
}

function resolveBandFamilyFromRoute(route, payload) {
  const p = payload || route.payload || {};
  const family =
    p.__bandFamily ||
    p.bandFamily ||
    route.bandFamily ||
    BAND_FAMILY.PULSEBAND;
  return normalizeBandFamily(family);
}

function resolveDnaTagFromRoute(route, payload) {
  const p = payload || route.payload || {};
  return p.__dnaTag || p.dnaTag || route.dnaTag || null;
}

function resolveMeshTagFromRoute(route, payload) {
  const p = payload || route.payload || {};
  return p.__meshTag || p.meshTag || route.meshTag || null;
}

// ----------------------------------------------------------------------------
// STATE
// ----------------------------------------------------------------------------

const bandCache = new Map();
const chunkBuffer = new Map();

const endpointMetrics = {
  totalCalls: 0,
  totalErrors: 0,
  avgLatencyMs: 0,
  lastLatencyMs: 0,
  lastType: null,
  lastError: null
};

const speedBoosts = new Map();
let prewarmed = false;

// v34: PulseWorldPort / PulseNetRegistry auto-build state
let PulseWorldPortInstance = null;
let PulseWorldPortReady = false;
let PulseWorldPortError = null;

// ----------------------------------------------------------------------------
// UTILS
// ----------------------------------------------------------------------------

function nowMs() {
  return PulseRealm.PulseNOW;
}

function safeJsonClone(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

function recordLatency(type, durationMs, error = null, routeMeta = null) {
  endpointMetrics.totalCalls++;
  endpointMetrics.lastLatencyMs = durationMs;
  endpointMetrics.lastType = type;

  if (error) {
    endpointMetrics.totalErrors++;
    endpointMetrics.lastError = String(error);
  }

  const n = endpointMetrics.totalCalls;
  const prevAvg = endpointMetrics.avgLatencyMs;
  endpointMetrics.avgLatencyMs = prevAvg + (durationMs - prevAvg) / n;

  const snapshot = { ...endpointMetrics };

  const meta = {
    type,
    durationMs,
    error: error ? String(error) : null,
    snapshot,
    routeMeta: routeMeta || null
  };

  emitSignal("endpoint.metrics", meta);
  emitFinality("endpoint.metrics", meta);
}

// ----------------------------------------------------------------------------
// v34: PulseWorldPort / PulseNetRegistry AUTO-BUILD
// ----------------------------------------------------------------------------

async function ensurePulseWorldPort() {
  if (PulseWorldPortReady && PulseWorldPortInstance) {
    return PulseWorldPortInstance;
  }

  if (PulseWorldPortError) {
    // previous failure; we can optionally retry, but keep it soft
  }

  try {
    const port = await buildPulseWorldPort();
    PulseWorldPortInstance = port || null;
    PulseWorldPortReady = !!PulseWorldPortInstance;

    emitSignal("pulsenet.port.ready", {
      ok: PulseWorldPortReady,
      hasRegistry: !!PulseWorldPortInstance.PulseNetRegistry
    });

    emitFinality("pulsenet.port.ready", {
      ok: PulseWorldPortReady,
      hasRegistry: !!PulseWorldPortInstance.PulseNetRegistry
    });

    return PulseWorldPortInstance;
  } catch (err) {
    PulseWorldPortError = String(err);

    const failure = {
      ok: false,
      error: PulseWorldPortError
    };

    emitSignal("pulsenet.port.error", failure);
    emitFinality("pulsenet.port.error", failure);

    return null;
  }
}

// ----------------------------------------------------------------------------
// BAND STATE / SPEED BOOST
// ----------------------------------------------------------------------------

function getBandState(bandId = "symbolic") {
  const key = normalizeBandId(bandId);
  if (!bandCache.has(key)) {
    bandCache.set(key, {
      bandId: key,
      lastCheckBand: null,
      lastVitals: null,
      lastPulseBandSample: null,
      lastUpdatedAt: 0,
      speedBoost: 1.0,
      speedBoostReason: "neutral",
      speedBoostExpiresAt: 0,
      authoritativeBand: null,
      bandFamily: BAND_FAMILY.PULSEBAND,
      dnaTag: null,
      meshTag: null
    });
  }
  return bandCache.get(key);
}

function applySpeedBoost(bandId, boost, reason, ttlMs = 30_000) {
  const key = normalizeBandId(bandId);
  const expiresAt = nowMs() + ttlMs;

  const entry = {
    bandId: key,
    boost: typeof boost === "number" && boost > 0 ? boost : 1.0,
    reason: reason || "unspecified",
    expiresAt
  };

  speedBoosts.set(key, entry);

  const state = getBandState(key);
  state.speedBoost = entry.boost;
  state.speedBoostReason = entry.reason;
  state.speedBoostExpiresAt = expiresAt;

  emitSignal("band.speedBoost", { bandId: key, entry });
  emitFinality("band.speedBoost", { bandId: key, entry });

  return entry;
}

function getEffectiveSpeedBoost(bandId) {
  const key = normalizeBandId(bandId);
  const entry = speedBoosts.get(key);
  const now = nowMs();

  if (!entry || entry.expiresAt <= now) {
    speedBoosts.delete(key);
    const state = getBandState(key);
    state.speedBoost = 1.0;
    state.speedBoostReason = "neutral";
    state.speedBoostExpiresAt = 0;
    const neutral = {
      bandId: key,
      boost: 1.0,
      reason: "neutral",
      expiresAt: 0
    };
    emitFinality("band.speedBoost.expired", { bandId: key, entry: neutral });
    return neutral;
  }

  const state = getBandState(key);
  state.speedBoost = entry.boost;
  state.speedBoostReason = entry.reason;
  state.speedBoostExpiresAt = entry.expiresAt;

  return entry;
}

// ----------------------------------------------------------------------------
// v33 CHUNK PIPELINE (same semantics as v30, finality-aware)
// ----------------------------------------------------------------------------

function handleChunkedPayloadV33(chunkMeta) {
  const { chunkId, chunkIndex, totalChunks, data, isJson } = chunkMeta || {};
  if (!chunkId || typeof totalChunks !== "number") {
    return { complete: true, payload: chunkMeta }; // not chunked
  }

  if (!chunkBuffer.has(chunkId)) {
    chunkBuffer.set(chunkId, {
      totalChunks,
      received: new Array(totalChunks).fill(null),
      receivedCount: 0,
      isJson: !!isJson
    });
  }

  const entry = chunkBuffer.get(chunkId);

  if (
    typeof chunkIndex === "number" &&
    chunkIndex >= 0 &&
    chunkIndex < entry.totalChunks &&
    entry.received[chunkIndex] == null
  ) {
    entry.received[chunkIndex] = data;
    entry.receivedCount++;
  }

  if (entry.receivedCount < entry.totalChunks) {
    const partial = {
      chunkId,
      chunkIndex,
      totalChunks,
      receivedCount: entry.receivedCount
    };

    emitSignal("endpoint.chunk.partial", partial);
    emitFinality("endpoint.chunk.partial", partial);

    return { complete: false };
  }

  let assembled;
  if (entry.isJson) {
    assembled = entry.received.join("");
    try {
      assembled = JSON.parse(assembled);
    } catch {
      // leave as string if parse fails
    }
  } else {
    assembled = entry.received.join("");
  }

  chunkBuffer.delete(chunkId);

  const complete = {
    chunkId,
    totalChunks: entry.totalChunks,
    isJson: entry.isJson
  };

  emitSignal("endpoint.chunk.complete", complete);
  emitFinality("endpoint.chunk.complete", complete);

  return { complete: true, payload: assembled };
}

// ----------------------------------------------------------------------------
// HANDLERS (v34, band-aware, understanding-aware, PulseWorldPort-aware)
// ----------------------------------------------------------------------------

async function handleCheckBand(payload, route) {
  const bandId = normalizeBandId(
    payload.bandId || payload.band || route.bandId || route.band
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const state = getBandState(bandId);

  state.lastCheckBand = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();
  state.bandFamily = bandFamily;
  state.dnaTag = dnaTag;
  state.meshTag = meshTag;

  const stability = payload.stabilityScore ?? 100;
  let boost = 1.0;
  let reason = "neutral";

  if (stability >= 95) {
    boost = 1.15;
    reason = "high-stability-band";
  } else if (stability <= 60) {
    boost = 0.9;
    reason = "unstable-band";
  }

  const boostEntry = applySpeedBoost(bandId, boost, reason, 45_000);
  state.authoritativeBand = payload;

  const result = {
    ok: true,
    type: "CheckBandResult",
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    stability,
    speedBoost: boostEntry,
    authoritativeBand: state.authoritativeBand,
    meta: {
      source: "PulseWorldEndpoint.CheckBand",
      version: 34
    }
  };

  emitSignal("band.check", { bandId, bandFamily, stability, result });
  emitFinality("band.check", { bandId, bandFamily, stability, result });

  return result;
}

async function handleVitalsSample(payload, route) {
  const bandId = normalizeBandId(
    payload.bandId || payload.network.band || route.bandId || route.band
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const state = getBandState(bandId);

  state.lastVitals = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();
  state.bandFamily = bandFamily;
  state.dnaTag = dnaTag;
  state.meshTag = meshTag;

  const latencyMs = payload.latencyMs ?? payload.latency.ms ?? 50;
  const stability = payload.stabilityScore ?? payload.stability.score ?? 100;

  let baseAdvantage = 1.0;
  if (latencyMs < 40 && stability > 90) baseAdvantage = 1.4;
  else if (latencyMs < 80 && stability > 75) baseAdvantage = 1.2;
  else if (latencyMs > 200 || stability < 50) baseAdvantage = 0.85;

  const boostEntry = getEffectiveSpeedBoost(bandId);
  const effectiveAdvantage = baseAdvantage * boostEntry.boost;

  state.lastPulseBandSample = {
    latencyMs,
    stability,
    baseAdvantage,
    effectiveAdvantage
  };

  const result = {
    ok: true,
    type: "VitalsTuningResult",
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    suggestedAdvantage: effectiveAdvantage,
    baseAdvantage,
    speedBoost: boostEntry,
    meta: {
      source: "PulseWorldEndpoint.VitalsSample",
      version: 34
    }
  };

  emitSignal("band.vitals", {
    bandId,
    bandFamily,
    latencyMs,
    stability,
    baseAdvantage,
    effectiveAdvantage,
    result
  });

  emitFinality("band.vitals", {
    bandId,
    bandFamily,
    latencyMs,
    stability,
    baseAdvantage,
    effectiveAdvantage,
    result
  });

  return result;
}

async function handlePulseNetRoute(payload, route) {
  // v34: ensure PulseWorldPort / PulseNetRegistry is built before acknowledging
  const port = await ensurePulseWorldPort();

  const kind = payload.kind || payload.channel || route.channel || "unknown";
  const bandId = normalizeBandId(
    payload.band || payload.bandId || route.band || route.bandId
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const registryReady = !!port.PulseNetRegistry;

  const result = {
    ok: true,
    type: "PulseNetAck",
    kind,
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    receivedAt: nowMs(),
    registryReady,
    meta: {
      source: "PulseWorldEndpoint.PulseNetRoute",
      version: 34
    }
  };

  emitSignal("pulsenet.route", {
    bandId,
    bandFamily,
    kind,
    payload,
    registryReady,
    result
  });

  emitFinality("pulsenet.route", {
    bandId,
    bandFamily,
    kind,
    payload,
    registryReady,
    result
  });

  return result;
}

// NEW: Router memory organ integration (PulseRealm.PulseOSCheckRouterMemory)
async function handleCheckRouterMemory(payload, route) {
  const logs = Array.isArray(payload.logs) ? payload.logs : [];

  const understandingMeta = buildUnderstandingRouteMeta(route);

  let organResult = null;
  if (PulseOSCheckRouterMemory) {
    try {
      organResult = await PulseOSCheckRouterMemory({
        logs,
        understanding: understandingMeta,
        bandId: understandingMeta.bandId,
        bandFamily: understandingMeta.bandFamily,
        dnaTag: understandingMeta.dnaTag,
        meshTag: understandingMeta.meshTag
      });
    } catch (err) {
      organResult = {
        ok: false,
        error: String(err),
        fallback: true
      };
    }
  }

  const result = {
    ok: true,
    type: "RouterMemoryHealResult",
    logsCount: logs.length,
    organResult,
    meta: {
      source: "PulseWorldEndpoint.CheckRouterMemory",
      version: 34
    }
  };

  emitSignal("router.memory.check", {
    logsCount: logs.length,
    understanding: understandingMeta,
    result
  });
  emitFinality("router.memory.check", {
    logsCount: logs.length,
    understanding: understandingMeta,
    result
  });
  emitUnderstandingFinality(understandingMeta, result);

  return result;
}

async function handleRouteDownAlert(payload, route) {
  const { error, type } = payload || {};

  const result = {
    ok: true,
    type: "RouteDownAck",
    routeType: type || "unknown",
    error: String(error || "unknown"),
    meta: {
      source: "PulseWorldEndpoint.RouteDownAlert",
      version: 34
    }
  };

  emitSignal("route.down", { payload, result });
  emitFinality("route.down", { payload, result });

  return result;
}

async function handlePulseBandMetrics(payload, route) {
  const bandId = normalizeBandId(
    payload.bandId || payload.network.band || route.bandId || route.band
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const state = getBandState(bandId);

  state.lastPulseBandSample = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();
  state.bandFamily = bandFamily;
  state.dnaTag = dnaTag;
  state.meshTag = meshTag;

  const boostEntry = getEffectiveSpeedBoost(bandId);

  const result = {
    ok: true,
    type: "PulseBandMetricsAck",
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    speedBoost: boostEntry,
    meta: {
      source: "PulseWorldEndpoint.PulseBandMetrics",
      version: 34
    }
  };

  emitSignal("band.metrics", { bandId, bandFamily, payload, result });
  emitFinality("band.metrics", { bandId, bandFamily, payload, result });

  return result;
}

async function handleExpansionRoute(payload, route) {
  const channel = payload.channel || payload.kind || route.channel || "internet";
  const routeEcho = payload.route ?? payload;

  const bandId = resolveBandFromRoute(route, payload);
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const result = {
    ok: true,
    type: "ExpansionAck",
    channel,
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    routeEcho,
    meta: {
      source: "PulseWorldEndpoint.ExpansionRoute",
      version: 34
    }
  };

  emitSignal("expansion.route", { channel, bandId, bandFamily, routeEcho, result });
  emitFinality("expansion.route", { channel, bandId, bandFamily, routeEcho, result });

  return result;
}

async function handleUnderstandingRoute(payload, route) {
  const meta = buildUnderstandingRouteMeta(route);

  const result = {
    ok: true,
    type: "UnderstandingAck",
    meta,
    message: "Understanding route acknowledged (structural upgrade)."
  };

  emitSignal("understanding.route", result);
  emitFinality("understanding.route", result);
  emitUnderstandingFinality(meta, result);

  return result;
}

// ----------------------------------------------------------------------------
// ROUTE REGISTRY (v34)
// ----------------------------------------------------------------------------

const routeHandlers = {
  CheckBand: handleCheckBand,
  VitalsSample: handleVitalsSample,
  UnderstandingRoute: handleUnderstandingRoute,
  PulseNetRoute: handlePulseNetRoute,
  PulseNetExpansion: handlePulseNetRoute,
  PulseNetSoldier: handlePulseNetRoute,
  PulseNetMesh: handlePulseNetRoute,
  PulseNetCastle: handlePulseNetRoute,
  PulseNetServer: handlePulseNetRoute,
  PulseNetUser: handlePulseNetRoute,
  PulseNetBrain: handlePulseNetRoute,
  PulseNetHeartbeat: handlePulseNetRoute,
  PulseNetFastLane: handlePulseNetRoute,

  CheckRouterMemory: handleCheckRouterMemory,
  RouteDownAlert: handleRouteDownAlert,
  PulseBandMetrics: handlePulseBandMetrics,

  ExpansionRoute: handleExpansionRoute,
  InternetRoute: handleExpansionRoute
};

// ----------------------------------------------------------------------------
// PREWARM
// ----------------------------------------------------------------------------

export function prewarmPulseWorldEndpoint() {
  if (prewarmed) return;
  prewarmed = true;

  const defaultBands = ["symbolic", "binary", "dual", "mesh"];

  for (const bandId of defaultBands) {
    const state = getBandState(bandId);
    state.lastUpdatedAt = nowMs();
    state.bandFamily = BAND_FAMILY.PULSEBAND;
    applySpeedBoost(bandId, 1.0, "prewarm-neutral", 60_000);
  }

  const fakeDurations = [2, 3, 4];
  for (const d of fakeDurations) {
    recordLatency("prewarm", d, null);
  }

  emitSignal("endpoint.prewarm", { bands: defaultBands });
  emitFinality("endpoint.prewarm", { bands: defaultBands });

}

// ----------------------------------------------------------------------------
// CENTRAL DISPATCH — v34 (UNDERSTANDING-AWARE, NEW SIGNAL, PulseWorldPort-aware)
// ----------------------------------------------------------------------------

export const PulseWorldEndpoint = Object.freeze({
  async handle(route) {
    const start = nowMs();

    const understandingMeta = preprocessUnderstanding(route);
    const rawType = understandingMeta.type;

    emitSignal("endpoint.call", { type: rawType, route, ...understandingMeta });
    emitFinality("endpoint.call", { type: rawType, route, ...understandingMeta });

    try {
      prewarmPulseWorldEndpoint();

      // v34: ensure PulseWorldPort is at least attempted before handling routes
      await ensurePulseWorldPort();

      let payload = route.payload ?? null;

      if (payload && payload.chunkId) {
        const chunkResult = handleChunkedPayloadV33(payload);
        if (!chunkResult.complete) {
          const duration = nowMs() - start;
          recordLatency(rawType, duration, null, understandingMeta);

          const partial = {
            ok: true,
            type: "ChunkInProgress",
            chunkId: payload.chunkId,
            meta: { source: "PulseWorldEndpoint.Chunk", version: 34 }
          };

          emitSignal("endpoint.chunk.inProgress", partial);
          emitFinality("endpoint.chunk.inProgress", partial);
          emitUnderstandingFinality(understandingMeta, partial);

          return partial;
        }

        payload = chunkResult.payload;
      }

      const handler = routeHandlers[rawType];
      if (!handler) {
        const duration = nowMs() - start;
        recordLatency(rawType, duration, null, understandingMeta);

        const unknown = {
          ok: false,
          type: "UnknownRouteType",
          routeType: rawType,
          ...understandingMeta,
          meta: { source: "PulseWorldEndpoint.Unknown", version: 34 }
        };

        emitSignal("endpoint.unknownRoute", unknown);
        emitFinality("endpoint.unknownRoute", unknown);
        emitUnderstandingFinality(understandingMeta, unknown);

        return unknown;
      }

      const result = await handler(payload, { ...route, ...understandingMeta });
      const duration = nowMs() - start;

      recordLatency(rawType, duration, null, understandingMeta);

      emitSignal("endpoint.result", { type: rawType, durationMs: duration, result });
      emitFinality("endpoint.result", { type: rawType, durationMs: duration, result });
      emitUnderstandingFinality(understandingMeta, result);

      return result;
    } catch (err) {
      const duration = nowMs() - start;
      recordLatency(rawType, duration, err, understandingMeta);

      const failure = {
        ok: false,
        type: "PulseWorldEndpointError",
        message: String(err),
        ...understandingMeta,
        meta: { source: "PulseWorldEndpoint.handle", version: 34 }
      };

      emitSignal("endpoint.error", failure);
      emitFinality("endpoint.error", failure);
      emitUnderstandingFinality(understandingMeta, failure);

      return failure;
    }
  },

  getMetrics() {
    const snapshot = safeJsonClone(endpointMetrics);
    emitSignal("endpoint.metrics.read", snapshot);
    emitFinality("endpoint.metrics.read", snapshot);
    return snapshot;
  },

  getBandState(bandId) {
    const snapshot = safeJsonClone(getBandState(bandId));
    emitSignal("band.state.read", { bandId, snapshot });
    emitFinality("band.state.read", { bandId, snapshot });
    return snapshot;
  },

  getSpeedBoost(bandId) {
    const snapshot = safeJsonClone(getEffectiveSpeedBoost(bandId));
    emitSignal("band.speedBoost.read", { bandId, snapshot });
    emitFinality("band.speedBoost.read", { bandId, snapshot });
    return snapshot;
  },

  // v34: expose minimal PulseWorldPort status for introspection
  async getPulseWorldPortStatus() {
    const port = await ensurePulseWorldPort();
    const status = {
      ok: !!port,
      hasRegistry: !!port.PulseNetRegistry,
      error: PulseWorldPortError || null
    };
    emitSignal("pulsenet.port.status.read", status);
    emitFinality("pulsenet.port.status.read", status);
    return status;
  }
});

prewarmPulseWorldEndpoint();

PulseRealm.PulseRemoteEndpoint = PulseWorldEndpoint;

PulseRealm.PulseUserEndpoing = PulseWorldEndpoint;
PulseRealm.PulseWorldEndpoint = PulseWorldEndpoint;