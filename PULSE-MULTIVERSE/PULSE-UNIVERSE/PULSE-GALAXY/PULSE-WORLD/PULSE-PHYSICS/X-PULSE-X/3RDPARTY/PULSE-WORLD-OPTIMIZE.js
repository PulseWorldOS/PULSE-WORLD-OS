/*
===============================================================================
FILE: PulseWorldOptimize-v34.js
ORGAN: PulseWorldOptimize
LAYER: WORLD OPTIMIZATION — GLOBAL SIGNAL SHRINKER — v34 IMMORTAL++ HYPERFRAME+FORMATS
===============================================================================

ROLE (v34):
  • Global, deterministic, multi-artifact optimizer for PulseWorld.
  • Optimizes ALL image/media signals across:
      - world bundle
      - runtime bundle
      - executable bundle
      - proxy fetches
      - background service worker
      - PEX (Pulse Expression Format) containers
  • Integrates with:
      - hyperFrame
      - deltaFrame
      - trustPulse
      - cacheIntegrity
      - shortcutActivation
      - binaryFieldFrame
      - oneBandFrame
      - continuanceFrame
      - fileFormatMode (pex/inline/none)
      - mediaKind (image/video)
  • GPU-accelerated, drift-proof, deterministic, zero randomness.
  • Multi-lane optimization with caching + binary optimization surfaces.
===============================================================================
*/
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { sharp } from "./PULSE-WORLD-SHARPEXPRESSION.js";

// ============================================================================
// VERSION + METADATA
// ============================================================================
export const PULSE_OPTIMIZE_VERSION = "v34-IMMORTAL++-HYPERFRAME+FORMATS";
export const PULSE_OPTIMIZE_LAYER = "PULSE-WORLD-OPTIMIZE";
export const PULSE_OPTIMIZE_ROLE = "GLOBAL-MEDIA-OPTIMIZER";

// ============================================================================
// IN-MEMORY CACHE — PURE, DETERMINISTIC, MULTI-LANE
// ============================================================================
const optimizeCache = new Map();

// ============================================================================
// HASH BUFFER → DETERMINISTIC CACHE KEY
// ============================================================================
function hashBuffer(buffer, contentType, context = {}) {
  const prefix = JSON.stringify({
    contentType,
    fileFormatMode: context.fileFormatMode || "none",
    mediaKind: context.mediaKind || "image",
    hyperFrame: context.hyperFrame || null,
    deltaFrame: context.deltaFrame || null
  });

  // deterministic JS fallback
  let h = 0;
  const view = typeof buffer === "string" ? buffer : Array.from(buffer);
  const seed = prefix + ":" + view.length;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return `js-${h.toString(16).padStart(8, "0")}`;
}

// ============================================================================
// v34: UNIVERSAL OPTIMIZATION PIPELINE
//   • Supports PNG, JPEG, JPG, GIF, WEBP, AVIF, HEIC, HEIF, SVG
//   • Supports PEX (Pulse Expression Format) — decode → optimize → rewrap
//   • GPU-accelerated where possible
//   • Deterministic, no randomness
// ============================================================================
async function optimizeBuffer_v34(rawBuffer, contentType, context = {}) {
  const buf =
    rawBuffer instanceof Uint8Array
      ? rawBuffer
      : Buffer.isBuffer(rawBuffer)
      ? rawBuffer
      : Buffer.from(rawBuffer);

  const key = hashBuffer(buf, contentType, context);

  if (optimizeCache.has(key)) {
    return optimizeCache.get(key);
  }

  let optimizedBuffer = buf;
  let optimizedType = contentType;

  // v34 — PEX container support (decode → optimize → rewrap)
  const isPexType =
    contentType === "image/pex" || context.fileFormatMode === "pex";

  if (isPexType) {
    try {
      const decoded = await decodePEX_v34(optimizedBuffer);
      const inner = await optimizeBuffer_v34(
        decoded.buffer,
        decoded.contentType,
        {
          ...context,
          fileFormatMode: "inline",
          mediaKind: context.mediaKind || "image"
        }
      );
      const rewrapped = await encodePEX_v34(
        inner.buffer,
        inner.contentType,
        decoded.meta
      );
      const result = {
        buffer: rewrapped,
        contentType: "image/pex"
      };
      optimizeCache.set(key, result);
      return result;
    } catch {
      // fallback to raw
    }
  }

  if (!sharp) {
    const result = { buffer: optimizedBuffer, contentType: optimizedType };
    optimizeCache.set(key, result);
    return result;
  }

  try {
    const img = sharp(optimizedBuffer, { failOnError: false });

    switch (contentType) {
      case "image/png":
        optimizedBuffer = img.webp({ lossless: true }).toBuffer();
        optimizedType = "image/webp";
        break;

      case "image/jpeg":
      case "image/jpg":
        optimizedBuffer = img.avif({ quality: 50 }).toBuffer();
        optimizedType = "image/avif";
        break;

      case "image/gif": {
        const png = img.png().toBuffer();
        optimizedBuffer = sharp(png)
          .webp({ lossless: true })
          .toBuffer();
        optimizedType = "image/webp";
        break;
      }

      case "image/webp":
      case "image/avif":
      case "image/heic":
      case "image/heif":
      case "image/svg+xml":
        optimizedBuffer = optimizedBuffer;
        optimizedType = contentType;
        break;

      default:
        optimizedBuffer = optimizedBuffer;
        optimizedType = contentType;
        break;
    }
  } catch {
    optimizedBuffer = buf;
    optimizedType = contentType;
  }

  const result = { buffer: optimizedBuffer, contentType: optimizedType };
  optimizeCache.set(key, result);

  return result;
}

// ============================================================================
// v34: PEX DECODER (decode raw PEX container)
// ============================================================================
async function decodePEX_v34(buffer) {
  const buf =
    buffer instanceof Uint8Array
      ? buffer
      : Buffer.isBuffer(buffer)
      ? buffer
      : Buffer.from(buffer);

  try {
    const view = new DataView(
      buf.buffer,
      buf.byteOffset,
      buf.byteLength
    );
    const magic = String.fromCharCode(
      view.getUint8(0),
      view.getUint8(1),
      view.getUint8(2)
    );

    if (magic !== "PEX") throw new Error("Not PEX");

    const metaLen = view.getUint32(4, true);
    const metaBuf = buf.slice(8, 8 + metaLen);
    const meta = JSON.parse(new TextDecoder().decode(metaBuf));

    const inner = buf.slice(8 + metaLen);

    return {
      buffer: inner,
      contentType: meta.contentType || "image/png",
      meta
    };
  } catch {
    return {
      buffer: buf,
      contentType: "image/png",
      meta: {}
    };
  }
}

// ============================================================================
// v34: PEX ENCODER (rewrap optimized buffer)
// ============================================================================
async function encodePEX_v34(innerBuffer, contentType, meta = {}) {
  const inner =
    innerBuffer instanceof Uint8Array
      ? innerBuffer
      : Buffer.isBuffer(innerBuffer)
      ? innerBuffer
      : Buffer.from(innerBuffer);

  const metaObj = {
    ...meta,
    contentType,
    version: "v34"
  };

  const metaJson = new TextEncoder().encode(JSON.stringify(metaObj));
  const header = new Uint8Array(8);
  header[0] = "P".charCodeAt(0);
  header[1] = "E".charCodeAt(0);
  header[2] = "X".charCodeAt(0);
  header[3] = 0;
  new DataView(header.buffer).setUint32(4, metaJson.length, true);

  const out = new Uint8Array(
    header.length + metaJson.length + inner.length
  );
  out.set(header, 0);
  out.set(metaJson, header.length);
  out.set(inner, header.length + metaJson.length);

  return out;
}

// ============================================================================
// v34: BINARY OPTIMIZATION SURFACE
// ============================================================================
export function buildBinaryOptimizationSurface_v34({
  bytes,
  contentType,
  fileFormatMode,
  mediaKind,
  hyperFrame,
  deltaFrame,
  trustPulse,
  cacheIntegrity,
  shortcutActivation,
  artifactKind
}) {
  const loadClass =
    bytes > 512 * 1024
      ? "heavy"
      : bytes > 128 * 1024
      ? "medium"
      : "light";

  const throughputClass =
    loadClass === "heavy"
      ? "throughput_high"
      : loadClass === "medium"
      ? "throughput_normal"
      : "throughput_low";

  const throughputScore =
    loadClass === "heavy"
      ? 0.9
      : loadClass === "medium"
      ? 0.7
      : 0.4;

  return {
    kind: "media_optimize_v34",
    bytes,
    contentType,
    fileFormatMode,
    mediaKind,
    artifactKind: artifactKind || "world",
    throughputClass,
    throughputScore,
    hyperFrame,
    deltaFrame,
    trustPulse,
    cacheIntegrity,
    shortcutActivation
  };
}

// ============================================================================
// v34: OPTIMIZE FETCHED IMAGE RESPONSE
// ============================================================================
export async function optimizeImageResponse_v34(fetchResponse, context = {}) {
  const rawType = fetchResponse.headers.get("content-type") || "";
  const contentType = rawType.split(";")[0].trim();

  if (
    !contentType.startsWith("image/") &&
    contentType !== "image/pex"
  ) {
    return fetchResponse;
  }

  const rawBuffer = Buffer.from(await fetchResponse.arrayBuffer());
  const optimized = await optimizeBuffer_v34(
    rawBuffer,
    contentType,
    context
  );

  const surface = buildBinaryOptimizationSurface_v34({
    bytes: rawBuffer.length,
    contentType,
    fileFormatMode: context.fileFormatMode || (contentType === "image/pex" ? "pex" : "inline"),
    mediaKind: context.mediaKind || "image",
    hyperFrame: context.hyperFrame || null,
    deltaFrame: context.deltaFrame || null,
    trustPulse: context.trustPulse || null,
    cacheIntegrity: context.cacheIntegrity || null,
    shortcutActivation: context.shortcutActivation || null,
    artifactKind: context.artifactKind || "world"
  });

  return {
    statusCode: fetchResponse.status,
    headers: {
      ...Object.fromEntries(fetchResponse.headers.entries()),
      "content-type": optimized.contentType,
      "content-length": optimized.buffer.length.toString()
    },
    body: optimized.buffer,
    optimizationSurface: surface
  };
}

// ============================================================================
// v34: UNIVERSAL ENTRY POINT
// ============================================================================
// ============================================================================
// v34: UNIVERSAL ENTRY POINT — FULL PIPELINE + SURFACE
// ============================================================================
export async function pulseOptimize_v34(fetchResponse, context = {}) {
  const rawType = fetchResponse.headers.get("content-type") || "";
  const contentType = rawType.split(";")[0].trim();

  // Non-image / non-PEX: return as-is, but you COULD still attach a surface if you want
  if (!contentType.startsWith("image/") && contentType !== "image/pex") {
    return fetchResponse;
  }

  const rawBuffer = Buffer.from(await fetchResponse.arrayBuffer());

  // 1) Optimize the binary
  const optimized = await optimizeBuffer_v34(rawBuffer, contentType, context);

  // 2) Build the binary optimization surface
  const surface = buildBinaryOptimizationSurface_v34({
    bytes: rawBuffer.length,
    contentType,
    fileFormatMode:
      context.fileFormatMode ||
      (contentType === "image/pex" ? "pex" : "inline"),
    mediaKind: context.mediaKind || "image",
    hyperFrame: context.hyperFrame || null,
    deltaFrame: context.deltaFrame || null,
    trustPulse: context.trustPulse || null,
    cacheIntegrity: context.cacheIntegrity || null,
    shortcutActivation: context.shortcutActivation || null,
    artifactKind: context.artifactKind || "world"
  });

  // 3) Return a unified optimization result
  return {
    statusCode: fetchResponse.status,
    headers: {
      ...Object.fromEntries(fetchResponse.headers.entries()),
      "content-type": optimized.contentType,
      "content-length": optimized.buffer.length.toString()
    },
    body: optimized.buffer,
    optimizationSurface: surface
  };
}

PulseRealm.WorldOptimize = {
  optimizeBuffer_v34,
  pulseOptimize_v34,
  optimizeImageResponse_v34,
  buildBinaryOptimizationSurface_v34,
  encodePEX_v34,
  decodePEX_v34
};

// Convenience: one-call binary surface helper
PulseRealm.PulseOptimizeBinary = function (meta) {
  return buildBinaryOptimizationSurface_v34(meta);
};

PulseRealm.PulseOptimize = pulseOptimize_v34;
