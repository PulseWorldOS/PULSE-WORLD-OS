// ============================================================================
//  PULSE WORLD OPTIMIZE PEX v34 (FUNCTIONAL VERSION)
//  Offline optimization layer for PEX-Cooker (NOT runtime optimize)
//  IMMORTAL++ • Deterministic Compile Surface • World Artifact Mode
// ============================================================================

export function pulseOptimizePEX_v34() {

  // -------------------------------------------------------------------------
  // Collapse: main offline optimization entry point
  // -------------------------------------------------------------------------
  async function collapse({ chunks, expressions }) {
    const normalizedChunks = normalizeChunks_v34(chunks);
    const decoded = decodeChunks_v34(normalizedChunks);
    const merged = mergeChunkLanes_v34(decoded);
    const collapsed = collapseBinarySurface_v34(merged, expressions || {});

    return {
      binary: encodePEXBinary_v34(collapsed),
      atlas: generatePEXAtlas_v34(collapsed),
      manifest: generatePEXManifest_v34(collapsed)
    };
  }

  // -------------------------------------------------------------------------
  // Normalize chunks input (handles { chunkSurface, files } and arrays)
  // -------------------------------------------------------------------------
  function normalizeChunks_v34(chunks) {
    // Case 1: Already an array of chunk objects
    if (Array.isArray(chunks)) return chunks;

    // Case 2: PEX-Cooker style object: { chunkSurface: [Buffer], files: [...] }
    if (chunks && Array.isArray(chunks.chunkSurface)) {
      console.warn("PEX v34: normalizing chunkSurface into chunk array.", chunks);

      return chunks.chunkSurface.map((buf, index) => ({
        id: index,
        width: 0,          // offline: unknown, can be filled later if needed
        height: 0,         // offline: unknown, can be filled later if needed
        buffer: buf,
        lane: "band",
        meta: {
          file: chunks.files?.[index]?.name,
          size: chunks.files?.[index]?.size,
          path: chunks.files?.[index]?.path
        }
      }));
    }

    // Fallback: no usable chunks
    console.error("PEX v34: unable to normalize chunks, defaulting to empty array.", chunks);
    return [];
  }

  // -------------------------------------------------------------------------
  // Decode chunk surfaces (offline)
  // -------------------------------------------------------------------------
  function decodeChunks_v34(chunks) {
    if (!Array.isArray(chunks)) {
      console.warn("PEX v34: chunks was not an array after normalize, coercing to empty array.", chunks);
      return [];
    }

    return chunks.map((chunk, index) => ({
      id: chunk.id ?? index,
      width: chunk.width ?? 0,
      height: chunk.height ?? 0,
      buffer: chunk.buffer,
      lane: chunk.lane || "band",
      meta: chunk.meta || {}
    }));
  }

  // -------------------------------------------------------------------------
  // Merge chunk lanes (offline)
  // -------------------------------------------------------------------------
  function mergeChunkLanes_v34(decoded) {
    const lanes = {};
    for (const chunk of decoded) {
      if (!lanes[chunk.lane]) lanes[chunk.lane] = [];
      lanes[chunk.lane].push(chunk);
    }
    return lanes;
  }

  // -------------------------------------------------------------------------
  // Collapse binary surfaces using expression map
  // -------------------------------------------------------------------------
  function collapseBinarySurface_v34(lanes, expressions) {
    return {
      lanes,
      expressions,
      version: "v34",
      mode: "pex",
      deterministic: true,
      artifactKind: "world"
    };
  }

  // -------------------------------------------------------------------------
  // Encode final PEX binary (offline)
  // -------------------------------------------------------------------------
  function encodePEXBinary_v34(collapsed) {
    const meta = {
      version: "v34",
      mode: "pex",
      deterministic: true,
      artifactKind: collapsed.artifactKind,
      laneCount: Object.keys(collapsed.lanes).length,
      expressionCount: Object.keys(collapsed.expressions).length
    };

    const metaJson = new TextEncoder().encode(JSON.stringify(meta));
    const header = new Uint8Array(8);
    header[0] = "P".charCodeAt(0);
    header[1] = "E".charCodeAt(0);
    header[2] = "X".charCodeAt(0);
    header[3] = 0;
    new DataView(header.buffer).setUint32(4, metaJson.length, true);

    const laneBuffers = [];
    for (const laneName of Object.keys(collapsed.lanes)) {
      for (const chunk of collapsed.lanes[laneName]) {
        laneBuffers.push(chunk.buffer);
      }
    }

    const totalLength =
      header.length +
      metaJson.length +
      laneBuffers.reduce((sum, buf) => sum + buf.length, 0);

    const out = new Uint8Array(totalLength);
    let offset = 0;

    out.set(header, offset);
    offset += header.length;

    out.set(metaJson, offset);
    offset += metaJson.length;

    for (const buf of laneBuffers) {
      out.set(buf, offset);
      offset += buf.length;
    }

    return out;
  }

  // -------------------------------------------------------------------------
  // Generate atlas (offline)
  // -------------------------------------------------------------------------
  function generatePEXAtlas_v34(collapsed) {
    return new Uint8Array([0x41, 0x54, 0x4C, 0x53]); // "ATLS"
  }

  // -------------------------------------------------------------------------
  // Generate manifest (offline)
  // -------------------------------------------------------------------------
  function generatePEXManifest_v34(collapsed) {
    return {
      signature: {
        version: "v34",
        runtimeMode: "IMMORTAL++",
        executableMode: "fileformat",
        trustMode: "verified",
        shortcutMode: "none"
      },
      fileFormatCompileSurface: {
        formatVersion: "pex-v34",
        supportedMedia: ["image"],
        compiler: "PulseWorldCompiler-v34",
        deterministic: true,
        binarySurface: {
          chunks: Object.keys(collapsed.lanes).length,
          lanes: Object.keys(collapsed.lanes),
          mode: "pex"
        }
      },
      mediaKind: "image",
      fileFormatMode: "pex"
    };
  }

  // Return functional API
  return {
    collapse
  };
}
