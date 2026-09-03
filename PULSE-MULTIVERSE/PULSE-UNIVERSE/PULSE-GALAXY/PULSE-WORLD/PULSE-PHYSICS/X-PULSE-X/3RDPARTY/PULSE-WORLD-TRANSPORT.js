/*
===============================================================================
FILE: PulseWorldTransport-v35.js
ORGAN: PulseWorldTransport
LAYER: WORLD TRANSPORT — GLOBAL IMPULSE/HTTPS MEMBRANE — v35-IMMORTAL++-WORLD
===============================================================================

ROLE (v35):
  • Universal transport membrane for ALL Pulse-World traffic.
  • Internal: IMPULSE protocol (world://, view://, proxy://, pex://, runtime://, exec://).
  • External: HTTPS (http://, https://) with legacy CORS as fallback.
  • PEX-aware, artifact-aware, viewport-aware, lane-aware, world-context-aware.
  • Integrates with:
      - PulseWorldView (viewport)
      - PulseProxy (internal fetch)
      - PulseWorldOptimize-v34 (media/PEX optimizer)
      - PulseWorldRuntime / Exec / CompilerWorker
      - hyperFrame / deltaFrame / trustPulse / cacheIntegrity / shortcutActivation
      - fileFormatMode (pex/inline/none)
      - mediaKind (image/video)
  • Deterministic, drift-proof, zero randomness.
===============================================================================
*/

import { pulseOptimize_v34 } from "./PULSE-WORLD-OPTIMIZE.js";
import {applyWorldBinaryThroughputScheduler_v40} from "../PULSE-WORLD-STRANDED-DNA.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// global fetch (Node 18+, Edge, PulseWorld)
const fetch = PulseRealm.fetch;

// ============================================================================
// VERSION + MODE METADATA
// ============================================================================
export const PULSE_TRANSPORT_VERSION = "v35-IMMORTAL++-WORLD";
export const PULSE_TRANSPORT_LAYER = "PULSE-WORLD-TRANSPORT";
export const PULSE_TRANSPORT_ROLE = "GLOBAL-IMPULSE-HTTPS-MEMBRANE";

export const PULSE_TRANSPORT_MODES = Object.freeze({
  OPEN: "OPEN",          // legacy CORS-open HTTP(S)
  STRICT: "STRICT",      // legacy strict CORS HTTP(S)
  WORLD: "WORLD"         // new world-local IMPULSE + HTTPS fallback
});

// immutable config
const CONFIG = Object.freeze({
  mode: PULSE_TRANSPORT_MODES.WORLD,
  strictAllowedOrigins: ["*"],
  allowCredentials: true
});

// ============================================================================
// CORE CORS CONSTANTS (LEGACY FALLBACK)
// ============================================================================
const ALLOW_METHODS = "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS";

const ALLOW_HEADERS = [
  "Content-Type",
  "Authorization",
  "X-Pulse-Device",
  "X-Pulse-Remember",
  "X-Requested-With",
  "X-Pulse-Session",
  "X-Pulse-Identity",
  "X-Pulse-Band",
  "X-Pulse-World",
  "X-Pulse-Coordinator",
  "X-Pulse-Route",
  "X-Pulse-Client",
  "X-Pulse-Forwarded-For",
  "X-Pulse-Trace",
  "X-Pulse-View",
  "X-Pulse-HyperFrame",
  "X-Pulse-DeltaFrame",
  "X-Pulse-TrustPulse",
  "X-Pulse-CacheIntegrity",
  "X-Pulse-ShortcutActivation",
  "X-Pulse-FileFormatMode",
  "X-Pulse-MediaKind",
  "X-Pulse-Viewport",
  "X-Pulse-Coordinator-Mode",
  "X-Pulse-WorldView",
  "X-Pulse-WorldContext",
  "X-Pulse-WorldBinary",
  "X-Pulse-WorldRuntime",
  "X-Pulse-WorldExec",
  "X-Pulse-ArtifactKind",
  "X-Pulse-PEX",
  "X-Pulse-WorldLane",
  "X-Pulse-WorldBuild",
  "X-Pulse-WorldSignal",
  "*"
].join(", ");

const MAX_AGE_SECONDS = "86400"; // 24h

// ============================================================================
// ORIGIN RESOLUTION — LEGACY CORS
// ============================================================================
function resolveAllowedOrigin(requestOrigin) {
  if (CONFIG.mode === PULSE_TRANSPORT_MODES.OPEN) return "*";
  if (!requestOrigin) return "null";
  if (CONFIG.strictAllowedOrigins.includes(requestOrigin)) return requestOrigin;
  return "null";
}

// ============================================================================
// BASE CORS HEADERS — IMMUTABLE (LEGACY)
// ============================================================================
const BASE_CORS_HEADERS = Object.freeze({
  "Access-Control-Allow-Methods": ALLOW_METHODS,
  "Access-Control-Allow-Headers": ALLOW_HEADERS,
  "Access-Control-Max-Age": MAX_AGE_SECONDS
});

// ============================================================================
// PUBLIC: BUILD CORS HEADERS (LEGACY)
// ============================================================================
export function buildPulseCorsHeaders(requestOrigin = null, extraHeaders = null) {
  const originHeader = resolveAllowedOrigin(requestOrigin);

  const base = {
    ...BASE_CORS_HEADERS,
    "Access-Control-Allow-Origin": originHeader
  };

  if (CONFIG.allowCredentials && originHeader !== "*") {
    base["Access-Control-Allow-Credentials"] = "true";
  }

  return extraHeaders ? { ...base, ...extraHeaders } : base;
}

export const PulseWorldCorsHeaders = Object.freeze(
  buildPulseCorsHeaders("*", null)
);

// ============================================================================
// EXPRESS-STYLE APPLIERS (LEGACY)
// ============================================================================
export function applyCorsHeadersToResponse(res, requestOrigin = null) {
  const headers = buildPulseCorsHeaders(requestOrigin);
  for (const [k, v] of Object.entries(headers)) res.set(k, v);
  return res;
}

export function buildCorsHeaderObject(extraHeaders = null, requestOrigin = null) {
  return buildPulseCorsHeaders(requestOrigin, extraHeaders);
}

// ============================================================================
// EXPRESS-STYLE MIDDLEWARE (LEGACY)
// ============================================================================
export function pulseCors(req, res, next) {
  const origin = req.headers.origin || req.headers.Origin || null;

  applyCorsHeadersToResponse(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  next();
}

export const corsHandler = pulseCors;
export const cors = pulseCors;

// ============================================================================
// NETLIFY / GENERIC WRAPPERS (LEGACY)
// ============================================================================
export function withPulseCorsNetlify(handler) {
  return async function netlifyCorsWrapper(event, context) {
    const method = event.httpMethod || "GET";
    const origin = event.headers.origin || event.headers.Origin || null;

    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: buildPulseCorsHeaders(origin),
        body: ""
      };
    }

    const result = await handler(event, context);
    const headers = buildPulseCorsHeaders(origin, result.headers || {});
    return { ...result, headers };
  };
}

export function withPulseCorsGeneric(handler) {
  return async function genericCorsWrapper(requestLike) {
    const method = requestLike.method || requestLike.httpMethod || "GET";
    const origin =
      requestLike.headers.origin ||
      requestLike.headers.Origin ||
      null;

    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: buildPulseCorsHeaders(origin),
        body: ""
      };
    }

    const result = await handler(requestLike);
    const headers = buildPulseCorsHeaders(origin, result.headers || {});
    return { ...result, headers };
  };
}

// ============================================================================
// GENERIC CORS RESPONSE BUILDER (LEGACY)
// ============================================================================
export function buildCorsResponse(
  statusCode = 200,
  body = null,
  extraHeaders = null,
  requestOrigin = null
) {
  const headers = buildPulseCorsHeaders(requestOrigin, extraHeaders);
  const payload =
    body == null || typeof body === "string"
      ? body ?? ""
      : JSON.stringify(body);

  return { statusCode, headers, body: payload };
}

// ============================================================================
// WORLD URL / PROTOCOL DETECTION — v35
//   • IMPULSE (internal): world://, view://, proxy://, pex://, runtime://, exec://
//   • HTTPS (external): http://, https://
// ============================================================================
function isImpulseUrl(url) {
  if (typeof url !== "string") return false;
  return (
    url.startsWith("world://") ||
    url.startsWith("view://") ||
    url.startsWith("proxy://") ||
    url.startsWith("pex://") ||
    url.startsWith("runtime://") ||
    url.startsWith("exec://")
  );
}

function isHttpUrl(url) {
  if (typeof url !== "string") return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

// ============================================================================
// WORLD CONTEXT → PULSE HEADERS — v35
// ============================================================================
export function buildPulseWorldHeadersFromContext(context = {}) {
  const headers = {};

  if (context.deviceId) headers["X-Pulse-Device"] = String(context.deviceId);
  if (context.sessionId) headers["X-Pulse-Session"] = String(context.sessionId);
  if (context.identity) headers["X-Pulse-Identity"] = String(context.identity);

  if (context.worldId) headers["X-Pulse-World"] = String(context.worldId);
  if (context.proxyId) headers["X-Pulse-Coordinator"] = String(context.proxyId);
  if (context.routeId) headers["X-Pulse-Route"] = String(context.routeId);
  if (context.clientId) headers["X-Pulse-Client"] = String(context.clientId);
  if (context.viewId) headers["X-Pulse-View"] = String(context.viewId);

  if (context.viewportId) headers["X-Pulse-Viewport"] = String(context.viewportId);
  if (context.proxyMode) headers["X-Pulse-Coordinator-Mode"] = String(context.proxyMode);
  if (context.worldViewId) headers["X-Pulse-WorldView"] = String(context.worldViewId);
  if (context.worldContext) headers["X-Pulse-WorldContext"] = String(context.worldContext);

  if (context.worldBinary) headers["X-Pulse-WorldBinary"] = String(context.worldBinary);
  if (context.worldRuntime) headers["X-Pulse-WorldRuntime"] = String(context.worldRuntime);
  if (context.worldExec) headers["X-Pulse-WorldExec"] = String(context.worldExec);

  if (context.artifactKind) headers["X-Pulse-ArtifactKind"] = String(context.artifactKind);
  if (context.fileFormatMode) headers["X-Pulse-FileFormatMode"] = String(context.fileFormatMode);
  if (context.mediaKind) headers["X-Pulse-MediaKind"] = String(context.mediaKind);
  if (context.pexEnabled) headers["X-Pulse-PEX"] = String(context.pexEnabled);

  if (context.worldLane) headers["X-Pulse-WorldLane"] = String(context.worldLane);
  if (context.worldBuildId) headers["X-Pulse-WorldBuild"] = String(context.worldBuildId);
  if (context.worldSignal) headers["X-Pulse-WorldSignal"] = String(context.worldSignal);

  if (context.hyperFrame) headers["X-Pulse-HyperFrame"] = String(context.hyperFrame);
  if (context.deltaFrame) headers["X-Pulse-DeltaFrame"] = String(context.deltaFrame);
  if (context.trustPulse) headers["X-Pulse-TrustPulse"] = String(context.trustPulse);
  if (context.cacheIntegrity) headers["X-Pulse-CacheIntegrity"] = String(context.cacheIntegrity);
  if (context.shortcutActivation)
    headers["X-Pulse-ShortcutActivation"] = String(context.shortcutActivation);

  return headers;
}

// ============================================================================
// IMPULSE HANDLER — INTERNAL WORLD FETCH — v35
//   • Handles world://, view://, proxy://, pex://, runtime://, exec://
//   • No CORS, no origin, no browser rules.
//   • This is your internal IMPULSE lane.
// ============================================================================


async function impulseFetch_v35(url, options = {}, context = {}) {
  // For now, IMPULSE is a thin wrapper that:
  //   • normalizes headers with world context
  //   • optionally delegates to HTTPS if you map IMPULSE → HTTPS internally
  //   • or to a future internal router (WorldRouter, PulseProxy, etc.)

  const headers = {
    ...(options.headers || {}),
    ...buildPulseWorldHeadersFromContext(context)
  };

  // Example: map world:// → https://internal-world-gateway/...
  // You can replace this with your own internal router.
  let mappedUrl = url;

  if (url.startsWith("world://")) {
    mappedUrl = url.replace("world://", "https://internal-world/");
  } else if (url.startsWith("view://")) {
    mappedUrl = url.replace("view://", "https://internal-view/");
  } else if (url.startsWith("proxy://")) {
    mappedUrl = url.replace("proxy://", "https://internal-proxy/");
  } else if (url.startsWith("pex://")) {
    mappedUrl = url.replace("pex://", "https://internal-pex/");
  } else if (url.startsWith("runtime://")) {
    mappedUrl = url.replace("runtime://", "https://internal-runtime/");
  } else if (url.startsWith("exec://")) {
    mappedUrl = url.replace("exec://", "https://internal-exec/");
  }

  const response = await fetch(mappedUrl, {
    ...options,
    headers
  });

  const contentType =
    response.headers.get("content-type").split(";")[0] || "";

  // Only optimize images or PEX
  if (!contentType.startsWith("image/") && contentType !== "image/pex") {
    return response;
  }

  const optimized = await PulseRealm.PulseOptimize(response, {
    hyperFrame: context.hyperFrame || null,
    deltaFrame: context.deltaFrame || null,
    trustPulse: context.trustPulse || null,
    cacheIntegrity: context.cacheIntegrity || null,
    shortcutActivation: context.shortcutActivation || null,
    fileFormatMode: context.fileFormatMode || (contentType === "image/pex" ? "pex" : "inline"),
    mediaKind: context.mediaKind || "image",
    viewId: context.viewId || null,
    artifactKind: context.artifactKind || "world"
  });

  return new fetch.Response(optimized.body, {
    status: optimized.statusCode,
    headers: optimized.headers
  });
}

// ============================================================================
// HTTPS HANDLER — EXTERNAL FETCH — v35
//   • Uses legacy CORS modes as fallback.
//   • Still can optimize images/PEX via PulseWorldOptimize.
// ============================================================================


async function httpsFetch_v35(url, options = {}, context = {}) {
  const headers = {
    ...(options.headers || {}),
    ...buildPulseWorldHeadersFromContext(context)
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const contentType =
    response.headers.get("content-type").split(";")[0] || "";

  if (!contentType.startsWith("image/") && contentType !== "image/pex") {
    return response;
  }

  const optimized = await PulseRealm.PulseOptimize(response, {
    hyperFrame: context.hyperFrame || null,
    deltaFrame: context.deltaFrame || null,
    trustPulse: context.trustPulse || null,
    cacheIntegrity: context.cacheIntegrity || null,
    shortcutActivation: context.shortcutActivation || null,
    fileFormatMode: context.fileFormatMode || (contentType === "image/pex" ? "pex" : "inline"),
    mediaKind: context.mediaKind || "image",
    viewId: context.viewId || null,
    artifactKind: context.artifactKind || "world"
  });

  return new fetch.Response(optimized.body, {
    status: optimized.statusCode,
    headers: optimized.headers
  });
}

// ============================================================================
// PULSE FETCH — v35 WORLD-AWARE, IMPULSE-FIRST
// ----------------------------------------------------------------------------
// context may include:
//   • hyperFrame / deltaFrame
//   • trustPulse / cacheIntegrity / shortcutActivation
//   • fileFormatMode (pex/inline/none)
//   • mediaKind (image/video)
//   • viewId / viewportId / worldId / proxyId / worldLane / artifactKind
//   • worldBinary / worldRuntime / worldExec
//   • worldSignal / worldBuildId
//   • proxyMode / worldViewId / worldContext
// ============================================================================
export async function pulseFetch_v35(url, options = {}, context = {}) {
  // IMPULSE first for internal protocols
  if (isImpulseUrl(url)) {
    return impulseFetch_v35(url, options, context);
  }

  // HTTPS for external or mapped URLs
  if (isHttpUrl(url)) {
    return httpsFetch_v35(url, options, context);
  }

  // Fallback: treat as HTTPS (legacy behavior)
  return httpsFetch_v35(url, options, context);
}

// Backwards compatible aliases
export const pulseFetch = pulseFetch_v35;

// ============================================================================
// RAW FETCH EXPORT
// ============================================================================
export { fetch };
// ============================================================================
// PULSE-WORLD TRANSPORT SERVER LAYER — v36-IMMORTAL++-WORLD
//   • This is the "Express layer" for PulseWorld.
//   • Lives at the TRANSPORT membrane, executes via StrandedDNA.
//   • Works with Express-style req/res, Netlify, or generic request-like.
// ============================================================================



/**
 * Build a normalized PulseWorld "signal" from an incoming request.
 * This is the unit StrandedDNA will see.
 */
function buildPulseWorldSignalFromRequest(req, bodyBuffer = null) {
  const headers = req.headers || {};
  const method = (req.method || req.httpMethod || "GET").toUpperCase();
  const url = req.url || req.path || req.originalUrl || "/";

  return {
    method,
    url,
    headers,
    body: bodyBuffer,
    // world-aware metadata (can be extended)
    worldContext: {
      deviceId: headers["x-pulse-device"] || null,
      sessionId: headers["x-pulse-session"] || null,
      identity: headers["x-pulse-identity"] || null,
      worldId: headers["x-pulse-world"] || null,
      worldLane: headers["x-pulse-worldlane"] || null,
      worldSignal: headers["x-pulse-worldsignal"] || null,
      worldBuildId: headers["x-pulse-worldbuild"] || null
    }
  };
}

/**
 * Read raw body from an Express-style req (or Node-like IncomingMessage).
 */
function readRequestBody(req) {
  return new Promise(resolve => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      if (!chunks.length) return resolve(null);
      resolve(Buffer.concat(chunks));
    });
    req.on("error", () => resolve(null));
  });
}

/**
 * Core executor: takes a request-like object, runs it through StrandedDNA,
 * returns a normalized + optimized response object.
 */
export async function executePulseWorldTransport(signalLike) {
  // Normalize incoming signal
  const signal =
    signalLike && signalLike.method && signalLike.url
      ? signalLike
      : buildPulseWorldSignalFromRequest(signalLike);

  // Run through StrandedDNA (v33 scheduler)
  const result = await applyWorldBinaryThroughputScheduler_v40(signal);

  // Normalize output
  const statusCode = result.statusCode ?? 200;
  const headers = result.headers ?? {};
  let body = result.body;

  // Convert non-string bodies to string
  if (body != null && typeof body !== "string") {
    try {
      body = JSON.stringify(body);
    } catch {
      body = String(body);
    }
  }

  // ------------------------------------------------------------
  // v34 BINARY OPTIMIZATION LAYER (AUTO-RUN)
  // ------------------------------------------------------------
  try {
    const fakeResponse = {
      status: statusCode,
      headers: {
        get(name) {
          const key = Object.keys(headers).find(
            (k) => k.toLowerCase() === name.toLowerCase()
          );
          return key ? headers[key] : null;
        },
        entries() {
          return Object.entries(headers);
        }
      },
      async arrayBuffer() {
        return typeof body === "string"
          ? new TextEncoder().encode(body).buffer
          : body;
      }
    };

    const optimized = await pulseOptimize_v34(fakeResponse, {
      fileFormatMode: "inline",
      mediaKind: "image",
      artifactKind: "world"
    });

    // If optimization happened, replace output
    if (optimized && optimized.body) {
      return {
        statusCode: optimized.statusCode,
        headers: optimized.headers,
        body: optimized.body,
        optimizationSurface: optimized.optimizationSurface
      };
    }
  } catch {
    // If optimization fails, fall through to raw output
  }

  // ------------------------------------------------------------
  // Return raw output if not optimizable
  // ------------------------------------------------------------
  return { statusCode, headers, body };
}

// ============================================================================
// EXPRESS-STYLE MIDDLEWARE — PULSE-WORLD TRANSPORT v35
//   • Unified CORS membrane
//   • Unified StrandedDNA executor
//   • Async-safe
//   • IndexedDB-backed world state (handled inside scheduler)
// ============================================================================
export function pulseWorldTransportMiddleware() {
  return async function pulseWorldTransportHandler(req, res, next) {
    const origin = req.headers.origin || req.headers.Origin || null;

    // 1. CORS membrane
    applyCorsHeadersToResponse(res, origin);

    // 2. Preflight
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    try {
      // 3. Read body
      const bodyBuffer = await readRequestBody(req);

      // 4. Build signal
      const signal = buildPulseWorldSignalFromRequest(req, bodyBuffer);

      // 5. Execute StrandedDNA transport
      const { statusCode, headers, body } =
        await executePulseWorldTransport(signal);

      // 6. Merge CORS + world headers
      const finalHeaders = buildCorsHeaderObject(headers, origin);
      for (const [k, v] of Object.entries(finalHeaders)) {
        res.set(k, v);
      }

      // 7. Send final response
      res.status(statusCode).send(body);
    } catch (err) {
      // Deterministic fallback
      res.status(500).send(
        JSON.stringify({
          error: "PULSE_WORLD_TRANSPORT_FAILURE",
          message: String(err && err.message ? err.message : err)
        })
      );
    }
  };
}

// Familiar alias
export const PulseWorldExpressMiddleLayer = pulseWorldTransportMiddleware();


// ============================================================================
// GENERIC TRANSPORT WRAPPER (NETLIFY / LAMBDA / CUSTOM)
// ============================================================================

export function withPulseWorldTransport(handler) {
  return async function pulseWorldTransportWrapper(requestLike) {
    const method = requestLike.method || requestLike.httpMethod || "GET";
    const origin =
      requestLike.headers.origin ||
      requestLike.headers.Origin ||
      null;

    if (method === "OPTIONS") {
      return buildCorsResponse(204, "", null, origin);
    }

    // Let user handler build a signal or response first if desired
    const maybeSignalOrResponse = await handler(requestLike);

    // If handler already returned a full response, just CORS-wrap it
    if (
      maybeSignalOrResponse &&
      typeof maybeSignalOrResponse.statusCode === "number"
    ) {
      return buildCorsResponse(
        maybeSignalOrResponse.statusCode,
        maybeSignalOrResponse.body,
        maybeSignalOrResponse.headers || {},
        origin
      );
    }

    // Otherwise treat it as a signal and run through StrandedDNA
    const signal =
      maybeSignalOrResponse && maybeSignalOrResponse.method
        ? maybeSignalOrResponse
        : buildPulseWorldSignalFromRequest(requestLike);

    const { statusCode, headers, body } =
      await executePulseWorldTransport(signal);

    return buildCorsResponse(statusCode, body, headers, origin);
  };
}

PulseRealm.WorldTransport = {
  withPulseCorsGeneric,
  withPulseWorldTransport,
  pulseWorldTransportMiddleware,
  executePulseWorldTransport,
  pulseFetch_v35,
  httpsFetch_v35,
  impulseFetch_v35,
  buildCorsHeaderObject,
  buildPulseCorsHeaders,
  applyCorsHeadersToResponse,
  pulseCors
}
PulseRealm.PulseTransport = impulseFetch_v35;
// Convenience: one-call binary surface helper
PulseRealm.PulseTransportExecute = function (meta) {
  return executePulseWorldTransport(meta);
};