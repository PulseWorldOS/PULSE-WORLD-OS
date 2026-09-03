// ============================================================================
//  PulseGPUChunker-v32-IMMORTAL-INTEL-HYBRID.js
//  32-LANE GPU CHUNKER — BINARY-FIRST • MULTI-BAND • INTEL-HYBRID v32
//  GPU Chunk Organ for PulseGPU v32 (steps, traces, pressure, warm-path, CI)
//  v32: Binary-Index Surfaces + Dual-Hash INTEL + Session Surfaces + MultiBand
//  • Deterministic, no randomness
//  • Metadata-only, no GPU calls
//  • Multi-band model: binary | symbolic | dual
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  META — v32 IMMORTAL-INTEL-HYBRID
// ============================================================================
export const PulseGPUChunkerMeta = Object.freeze({
  id: "PulseGPUChunker-v32-IMMORTAL-INTEL-HYBRID",
  version: "32.0-IMMORTAL-INTEL-HYBRID",
  lanes: 32,
  epoch: "PulseGPU-Organism",
  role: "GPU-Chunker",
  bandModel: "multiband-gpu",
  oneBand: false,
  binaryFirst: true,
  symbolicProjection: true,
  intel: {
    binaryIndexSurface: true,
    sessionSurface: true,
    dualHashIntel: true,
    gpuModeAware: true,
    gpuTierAware: true,
    gpuStreamAware: true,
    chunkProfileAware: true,
    bandAware: true
  },
  safety: {
    deterministic: true,
    noNetwork: true,
    noFilesystem: true,
    noGPUCalls: true,
    noRandomness: true
  }
});

// ============================================================================
//  INTERNAL HELPERS — v32 deterministic surfaces
// ============================================================================

function _now() {
  return PulseRealm.PulseNOW;
}

function _toUint8Array(input) {
  if (input instanceof Uint8Array) return input;
  if (input instanceof ArrayBuffer) return new Uint8Array(input);
  if (Array.isArray(input)) return new Uint8Array(input);
  throw new TypeError("Unsupported binary input type for PulseGPUChunker.");
}

function _safeJSONStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({ error: "unserializable", type: typeof value });
  }
}

function _safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function _safeString(input) {
  if (typeof input === "string") return input;
  if (input == null) return "";
  return String(input);
}

// ============================================================================
//  HASHING — v32 deterministic INTEL surfaces
// ============================================================================

// Simple deterministic hash (non-crypto, pure compute)
function _hashString(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

// INTEL hash — structure-aware, deterministic
function _hashIntel(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function _buildDualHash(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intel = _hashIntel(intelBase);
  const classic = _hashString(`${label}::${classicString || ""}`);
  return { intel, classic };
}

// ============================================================================
//  GPU SESSION ID — v32 deterministic session identity
// ============================================================================
function _buildGPUSessionId({
  gpuContextHash,
  gpuMode,
  gpuStream,
  gpuTier,
  chunkProfile,
  payloadHash,
  band
}) {
  const seed = JSON.stringify({
    gpuContextHash: gpuContextHash || null,
    gpuMode: gpuMode || "mixed",
    gpuStream: gpuStream || "continuous",
    gpuTier: gpuTier || "default",
    chunkProfile: chunkProfile || "gpu-default",
    payloadHash: payloadHash || null,
    band: band || "symbolic"
  });
  return _hashString(seed);
}

// ============================================================================
//  BINARY INDEX SURFACE — v32 INTEL-HYBRID
// ============================================================================
function _buildBinaryIndexSurface({
  sessionId,
  index,
  total,
  lane,
  band,
  type,
  size
}) {
  const classic =
    `BINIDX32::${sessionId || "NO_SESSION"}::i:${index}` +
    `::t:${total}::lane:${lane}::band:${band}::type:${type}::size:${size}`;

  const intelPayload = {
    sessionId: sessionId || null,
    index,
    total,
    lane,
    band,
    type,
    size
  };

  return _buildDualHash("PULSE_GPU_CHUNK_BINARY_INDEX_V32", intelPayload, classic);
}

// ============================================================================
//  SESSION SURFACE — v32 INTEL-HYBRID
// ============================================================================
function _buildSessionSurface({
  sessionId,
  payloadHash,
  gpuMode,
  gpuStream,
  gpuTier,
  chunkProfile,
  band
}) {
  const classic =
    `SESSION32::${sessionId || "NO_SESSION"}::ph:${payloadHash || "NO_PAYLOAD"}` +
    `::mode:${gpuMode}::stream:${gpuStream}::tier:${gpuTier}` +
    `::profile:${chunkProfile}::band:${band}`;

  const intelPayload = {
    sessionId: sessionId || null,
    payloadHash: payloadHash || null,
    gpuMode,
    gpuStream,
    gpuTier,
    chunkProfile,
    band
  };

  return _buildDualHash("PULSE_GPU_CHUNK_SESSION_V32", intelPayload, classic);
}
// ============================================================================
//  PulseGPUChunker — IMMORTAL PSEUDO ORGAN (no class, no this)
// ============================================================================
export const PulseGPUChunker = (() => {
  const create = (config = {}) => {
    const cfg = Object.freeze({
      id: config.id || PulseGPUChunkerMeta.id,
      defaultChunkSize: config.defaultChunkSize || 4096,
      maxChunkSize: config.maxChunkSize || 65536,
      lanes: PulseGPUChunkerMeta.lanes,
      trace: !!config.trace,
      defaultProfile: config.defaultProfile || "gpu-default",
      deviceProfile: config.deviceProfile || null
    });

    const laneStats = new Array(cfg.lanes).fill(null).map((_, lane) =>
      Object.seal({
        lane,
        chunks: 0,
        bytes: 0,
        lastTs: null
      })
    );

    const patterns = new Map();     // label -> pattern
    const profiles = new Map();     // profileId -> profileConfig
    const profileStats = new Map(); // profileId -> stats

    // ------------------------------------------------------------------------
    // META
    // ------------------------------------------------------------------------
    const getMeta = () => PulseGPUChunkerMeta;

    const getLaneStats = () => laneStats.map((s) => ({ ...s }));

    const getPatterns = () => {
      const out = {};
      for (const [k, v] of patterns.entries()) {
        out[k] = v;
      }
      return out;
    };

    const getProfiles = () => {
      const out = {};
      for (const [k, v] of profiles.entries()) {
        out[k] = v;
      }
      return out;
    };

    const getProfileStats = () => {
      const out = {};
      for (const [k, v] of profileStats.entries()) {
        out[k] = { ...v };
      }
      return out;
    };

    // ------------------------------------------------------------------------
    // PREWARM PATTERN (label-based, GPU-aware, v32 intel surfaces)
    // ------------------------------------------------------------------------
    const prewarmPattern = (label, pattern = {}) => {
      if (!label) return;
      const ts = _now();
      const basePattern = {
        defaultChunkSize: pattern.defaultChunkSize || cfg.defaultChunkSize,
        maxChunkSize: pattern.maxChunkSize || cfg.maxChunkSize,
        lanes: pattern.lanes || cfg.lanes,
        band: pattern.band || "symbolic",
        profile: pattern.profile || cfg.defaultProfile,
        gpuMode: pattern.gpuMode || "mixed",
        gpuStream: pattern.gpuStream || "continuous",
        gpuTier: pattern.gpuTier || "default",
        chunkProfile:
          pattern.chunkProfile || pattern.profile || cfg.defaultProfile
      };

      const intelSig = _buildDualHash(
        "PULSE_GPU_CHUNK_PATTERN_V32",
        {
          label,
          ts,
          pattern: basePattern
        },
        `PATTERN32::${label}::profile:${basePattern.profile}` +
          `::band:${basePattern.band}::mode:${basePattern.gpuMode}` +
          `::stream:${basePattern.gpuStream}::tier:${basePattern.gpuTier}`
      );

      const stored = Object.freeze({
        label,
        ts,
        pattern: basePattern,
        intelSignature: intelSig.intel,
        classicSignature: intelSig.classic
      });

      patterns.set(label, stored);
      return stored;
    };

    // ------------------------------------------------------------------------
    // PREWARM PROFILE (GPU profiles, v32 intel surfaces)
    // ------------------------------------------------------------------------
    const prewarmProfile = (profileId, profile = {}) => {
      if (!profileId) return;
      const ts = _now();
      const baseConfig = {
        defaultChunkSize: profile.defaultChunkSize || cfg.defaultChunkSize,
        maxChunkSize: profile.maxChunkSize || cfg.maxChunkSize,
        lanes: profile.lanes || cfg.lanes,
        band: profile.band || "symbolic",
        gpuMode: profile.gpuMode || "mixed",
        gpuStream: profile.gpuStream || "continuous",
        gpuTier: profile.gpuTier || "default",
        chunkProfile: profile.chunkProfile || profileId
      };

      const intelSig = _buildDualHash(
        "PULSE_GPU_CHUNK_PROFILE_V32",
        {
          profileId,
          ts,
          config: baseConfig
        },
        `PROFILE32::${profileId}::band:${baseConfig.band}` +
          `::mode:${baseConfig.gpuMode}::stream:${baseConfig.gpuStream}` +
          `::tier:${baseConfig.gpuTier}`
      );

      const stored = Object.freeze({
        profileId,
        ts,
        config: baseConfig,
        intelSignature: intelSig.intel,
        classicSignature: intelSig.classic
      });
      profiles.set(profileId, stored);

      if (!profileStats.has(profileId)) {
        profileStats.set(
          profileId,
          Object.seal({
            profileId,
            chunks: 0,
            bytes: 0,
            lastTs: null
          })
        );
      }

      return stored;
    };

    // ------------------------------------------------------------------------
    // INTERNAL: PROFILE RESOLUTION
    // ------------------------------------------------------------------------
    const resolveProfile = (options = {}) => {
      const label = options.label || null;
      const profileId = options.profile || cfg.defaultProfile;

      const pattern = label ? patterns.get(label) : null;
      const profile = profiles.get(profileId);

      const base = {
        defaultChunkSize: cfg.defaultChunkSize,
        maxChunkSize: cfg.maxChunkSize,
        lanes: cfg.lanes,
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed",
        gpuStream: options.gpuStream || "continuous",
        gpuTier: options.gpuTier || "default",
        chunkProfile: profileId
      };

      const fromPattern = pattern.pattern || {};
      const fromProfile = profile.config || {};

      return {
        defaultChunkSize:
          options.defaultChunkSize ||
          fromPattern.defaultChunkSize ||
          fromProfile.defaultChunkSize ||
          base.defaultChunkSize,
        maxChunkSize:
          options.maxChunkSize ||
          fromPattern.maxChunkSize ||
          fromProfile.maxChunkSize ||
          base.maxChunkSize,
        lanes:
          options.lanes ||
          fromPattern.lanes ||
          fromProfile.lanes ||
          base.lanes,
        band:
          options.band ||
          fromPattern.band ||
          fromProfile.band ||
          base.band,
        gpuMode:
          options.gpuMode ||
          fromPattern.gpuMode ||
          fromProfile.gpuMode ||
          base.gpuMode,
        gpuStream:
          options.gpuStream ||
          fromPattern.gpuStream ||
          fromProfile.gpuStream ||
          base.gpuStream,
        gpuTier:
          options.gpuTier ||
          fromPattern.gpuTier ||
          fromProfile.gpuTier ||
          base.gpuTier,
        chunkProfile:
          options.chunkProfile ||
          fromPattern.chunkProfile ||
          fromProfile.chunkProfile ||
          base.chunkProfile,
        label,
        profileId
      };
    };

    const bumpProfileStats = (profileId, bytes, ts) => {
      if (!profileId) return;
      const stats =
        profileStats.get(profileId) ||
        Object.seal({
          profileId,
          chunks: 0,
          bytes: 0,
          lastTs: null
        });
      stats.chunks += 1;
      stats.bytes += bytes;
      stats.lastTs = ts;
      profileStats.set(profileId, stats);
    };

    // ------------------------------------------------------------------------
    // LANE ASSIGNMENT (ROUND-ROBIN, DETERMINISTIC PER INSTANCE)
    // ------------------------------------------------------------------------
    const assignLane = (counterRef, lanes) => {
      const lane = counterRef.value % lanes;
      counterRef.value += 1;
      return lane;
    };

    // ------------------------------------------------------------------------
    // BINARY CHUNKING (GPU-safe, v32 binary index surfaces)
    // ------------------------------------------------------------------------
    const chunkBinary = (buffer, options = {}) => {
      const ts = _now();
      const profile = resolveProfile({
        ...options,
        band: options.band || "binary"
      });

      const bytes = _toUint8Array(buffer);
      const totalLength = bytes.length;

      const chunkSize = Math.min(
        Math.max(profile.defaultChunkSize, 1),
        profile.maxChunkSize
      );

      const payloadHash = _hashString(bytes.toString());
      const sessionId = _buildGPUSessionId({
        gpuContextHash: options.gpuContextHash,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
        chunkProfile: profile.chunkProfile,
        payloadHash,
        band: profile.band
      });

      const sessionSurface = _buildSessionSurface({
        sessionId,
        payloadHash,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
        chunkProfile: profile.chunkProfile,
        band: profile.band
      });

      const chunks = [];
      const laneCounter = { value: 0 };

      for (let offset = 0; offset < totalLength; offset += chunkSize) {
        const lane = assignLane(laneCounter, profile.lanes);
        const end = Math.min(offset + chunkSize, totalLength);
        const slice = bytes.subarray(offset, end);

        const index = chunks.length;
        const size = slice.length;

        const binIndexSurface = _buildBinaryIndexSurface({
          sessionId,
          index,
          total: null,
          lane,
          band: profile.band,
          type: "binary",
          size
        });

        const chunk = Object.freeze({
          meta: {
            chunkerId: cfg.id,
            ts,
            band: profile.band,
            type: "binary",
            lane,
            index,
            total: null,
            label: profile.label,
            profile: profile.profileId,
            size,
            gpuMode: profile.gpuMode,
            gpuStream: profile.gpuStream,
            gpuTier: profile.gpuTier,
            chunkProfile: profile.chunkProfile,
            sessionId,
            payloadHash,
            gpuContextHash: options.gpuContextHash || null,
            binaryIndexClassic: binIndexSurface.classic,
            binaryIndexIntel: binIndexSurface.intel,
            sessionClassic: sessionSurface.classic,
            sessionIntel: sessionSurface.intel
          },
          payload: slice
        });

        chunks.push(chunk);

        const stat = laneStats[lane];
        stat.chunks += 1;
        stat.bytes += slice.length;
        stat.lastTs = ts;

        bumpProfileStats(profile.profileId, slice.length, ts);
      }

      const totalChunks = chunks.length;
      for (const c of chunks) {
        c.meta.total = totalChunks;
        const updatedSurface = _buildBinaryIndexSurface({
          sessionId: c.meta.sessionId,
          index: c.meta.index,
          total: totalChunks,
          lane: c.meta.lane,
          band: c.meta.band,
          type: c.meta.type,
          size: c.meta.size
        });
        c.meta.binaryIndexClassic = updatedSurface.classic;
        c.meta.binaryIndexIntel = updatedSurface.intel;
      }

      if (cfg.trace) {
        console.log("[PulseGPUChunker v32-INTEL-HYBRID] chunkBinary", {
          label: profile.label,
          profile: profile.profileId,
          band: profile.band,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          totalLength,
          chunkSize,
          chunks: chunks.length
        });
      }

      return Object.freeze(chunks);
    };

    // ------------------------------------------------------------------------
    // BINARY REASSEMBLY
    // ------------------------------------------------------------------------
    const reassembleBinary = (chunks = []) => {
      if (!Array.isArray(chunks) || chunks.length === 0) {
        return new Uint8Array(0);
      }

      const sorted = [...chunks].sort(
        (a, b) => (a.meta.index ?? 0) - (b.meta.index ?? 0)
      );

      const totalBytes = sorted.reduce(
        (sum, c) => sum + (c.payload.length ?? 0),
        0
      );

      const out = new Uint8Array(totalBytes);
      let offset = 0;

      for (const c of sorted) {
        const slice = c.payload || new Uint8Array(0);
        out.set(slice, offset);
        offset += slice.length;
      }

      return out;
    };

    // ------------------------------------------------------------------------
    // JSON / SYMBOLIC CHUNKING
    // ------------------------------------------------------------------------
    const chunkJSON = (value, options = {}) => {
      const profile = resolveProfile({
        ...options,
        band: options.band || "symbolic"
      });

      const json = _safeJSONStringify(value);
      const encoder = new TextEncoder();
      const bytes = encoder.encode(json);

      const binaryChunks = chunkBinary(bytes, {
        band: profile.band,
        label: profile.label,
        profile: profile.profileId,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
        chunkProfile: profile.chunkProfile,
        gpuContextHash: options.gpuContextHash
      });

      const jsonChunks = binaryChunks.map((c) =>
        Object.freeze({
          meta: {
            ...c.meta,
            type: "json"
          },
          payload: c.payload
        })
      );

      if (cfg.trace) {
        console.log("[PulseGPUChunker v32-INTEL-HYBRID] chunkJSON", {
          label: profile.label,
          profile: profile.profileId,
          band: profile.band,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          length: json.length,
          chunks: jsonChunks.length
        });
      }

      return Object.freeze(jsonChunks);
    };

    const reassembleJSON = (chunks = []) => {
      const binary = reassembleBinary(chunks);
      const decoder = new TextDecoder();
      const json = decoder.decode(binary);
      return _safeJSONParse(json);
    };

    // ------------------------------------------------------------------------
    // TEXT CHUNKING
    // ------------------------------------------------------------------------
    const chunkText = (text, options = {}) => {
      const profile = resolveProfile({
        ...options,
        band: options.band || "symbolic"
      });

      const s = _safeString(text);
      const encoder = new TextEncoder();
      const bytes = encoder.encode(s);

      return chunkBinary(bytes, {
        band: profile.band,
        label: profile.label,
        profile: profile.profileId,
        gpuMode: profile.gpuMode,
        gpuStream: profile.gpuStream,
        gpuTier: profile.gpuTier,
        chunkProfile: profile.chunkProfile,
        gpuContextHash: options.gpuContextHash
      }).map((c) =>
        Object.freeze({
          meta: {
            ...c.meta,
            type: "text"
          },
          payload: c.payload
        })
      );
    };

    const reassembleText = (chunks = []) => {
      const binary = reassembleBinary(chunks);
      const decoder = new TextDecoder();
      return decoder.decode(binary);
    };

    // ------------------------------------------------------------------------
    // LINE-ORIENTED CHUNKING
    // ------------------------------------------------------------------------
    const chunkLines = (text, options = {}) => {
      const profile = resolveProfile({
        ...options,
        band: options.band || "symbolic"
      });

      const s = _safeString(text);
      const lines = s.split(/\r?\n/);
      const maxLines = options.maxLines || 256;

      const chunks = [];
      const ts = _now();
      const laneCounter = { value: 0 };

      let buffer = [];
      let currentSize = 0;

      const flushChunk = (lane, index, totalPlaceholder) => {
        const joined = buffer.join("\n");
        const encoder = new TextEncoder();
        const bytes = encoder.encode(joined);

        const payloadHash = _hashString(bytes.toString());
        const sessionId = _buildGPUSessionId({
          gpuContextHash: options.gpuContextHash,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          chunkProfile: profile.chunkProfile,
          payloadHash,
          band: profile.band
        });

        const sessionSurface = _buildSessionSurface({
          sessionId,
          payloadHash,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          chunkProfile: profile.chunkProfile,
          band: profile.band
        });

        const size = bytes.length;

        const binIndexSurface = _buildBinaryIndexSurface({
          sessionId,
          index,
          total: totalPlaceholder,
          lane,
          band: profile.band,
          type: "text_lines",
          size
        });

        const chunk = Object.freeze({
          meta: {
            chunkerId: cfg.id,
            ts,
            band: profile.band,
            type: "text_lines",
            lane,
            index,
            total: totalPlaceholder,
            label: profile.label,
            profile: profile.profileId,
            size,
            gpuMode: profile.gpuMode,
            gpuStream: profile.gpuStream,
            gpuTier: profile.gpuTier,
            chunkProfile: profile.chunkProfile,
            sessionId,
            payloadHash,
            gpuContextHash: options.gpuContextHash || null,
            binaryIndexClassic: binIndexSurface.classic,
            binaryIndexIntel: binIndexSurface.intel,
            sessionClassic: sessionSurface.classic,
            sessionIntel: sessionSurface.intel
          },
          payload: bytes
        });

        chunks.push(chunk);

        const stat = laneStats[lane];
        stat.chunks += 1;
        stat.bytes += bytes.length;
        stat.lastTs = ts;

        bumpProfileStats(profile.profileId, bytes.length, ts);
      };

      for (const line of lines) {
        buffer.push(line);
        currentSize += 1;

        if (currentSize >= maxLines) {
          const lane = assignLane(laneCounter, profile.lanes);
          flushChunk(lane, chunks.length, null);
          buffer = [];
          currentSize = 0;
        }
      }

      if (buffer.length > 0) {
        const lane = assignLane(laneCounter, profile.lanes);
        flushChunk(lane, chunks.length, null);
      }

      const totalChunks = chunks.length;
      for (const c of chunks) {
        c.meta.total = totalChunks;
        const updatedSurface = _buildBinaryIndexSurface({
          sessionId: c.meta.sessionId,
          index: c.meta.index,
          total: totalChunks,
          lane: c.meta.lane,
          band: c.meta.band,
          type: c.meta.type,
          size: c.meta.size
        });
        c.meta.binaryIndexClassic = updatedSurface.classic;
        c.meta.binaryIndexIntel = updatedSurface.intel;
      }

      if (cfg.trace) {
        console.log("[PulseGPUChunker v32-INTEL-HYBRID] chunkLines", {
          label: profile.label,
          profile: profile.profileId,
          band: profile.band,
          gpuMode: profile.gpuMode,
          gpuStream: profile.gpuStream,
          gpuTier: profile.gpuTier,
          lines: lines.length,
          chunks: chunks.length
        });
      }

      return Object.freeze(chunks);
    };

    const reassembleLines = (chunks = []) => {
      const text = reassembleText(chunks);
      return text.split(/\r?\n/);
    };

    // ------------------------------------------------------------------------
    // GPU HELPERS — semantic wrappers around JSON chunking
    // ------------------------------------------------------------------------
    const chunkGPUStep = (step, options = {}) =>
      chunkJSON(step, {
        ...options,
        profile: options.profile || "gpu-step",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUTace = (trace, options = {}) =>
      chunkJSON(trace, {
        ...options,
        profile: options.profile || "gpu-trace",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUPressure = (pressureSnapshot, options = {}) =>
      chunkJSON(pressureSnapshot, {
        ...options,
        profile: options.profile || "gpu-pressure",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUWarmPath = (warmPathHints, options = {}) =>
      chunkJSON(warmPathHints, {
        ...options,
        profile: options.profile || "gpu-warm-path",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUDispatch = (dispatchFrame, options = {}) =>
      chunkJSON(dispatchFrame, {
        ...options,
        profile: options.profile || "gpu-dispatch",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUCI = (ciFrame, options = {}) =>
      chunkJSON(ciFrame, {
        ...options,
        profile: options.profile || "gpu-ci",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUGeneticPattern = (pattern, options = {}) =>
      chunkJSON(pattern, {
        ...options,
        profile: options.profile || "gpu-genetic",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    const chunkGPUInsight = (insight, options = {}) =>
      chunkJSON(insight, {
        ...options,
        profile: options.profile || "gpu-insight",
        band: options.band || "symbolic",
        gpuMode: options.gpuMode || "mixed"
      });

    // ------------------------------------------------------------------------
    // PUBLIC IMMORTAL INSTANCE
    // ------------------------------------------------------------------------
    return Object.freeze({
      config: cfg,

      getMeta,
      getLaneStats,
      getPatterns,
      getProfiles,
      getProfileStats,

      prewarmPattern,
      prewarmProfile,

      chunkBinary,
      reassembleBinary,

      chunkJSON,
      reassembleJSON,

      chunkText,
      reassembleText,

      chunkLines,
      reassembleLines,

      chunkGPUStep,
      chunkGPUTace,
      chunkGPUPressure,
      chunkGPUWarmPath,
      chunkGPUDispatch,
      chunkGPUCI,
      chunkGPUGeneticPattern,
      chunkGPUInsight
    });
  };

  return Object.freeze({
    create,
    meta: PulseGPUChunkerMeta
  });
})();

// ============================================================================
//  FACTORY — IMMORTAL PSEUDO VERSION (no class, no new)
// ============================================================================
export function createPulseGPUChunker(config = {}) {
  const core = PulseGPUChunker.create(config);

  // -------------------------------------------------------------------------
  //  CANONICAL GPU PROFILES — upgraded from ONEBAND → MULTIBAND v32
  // -------------------------------------------------------------------------

  // Default GPU profile — mixed mode, continuous stream
  core.prewarmProfile("gpu-default", {
    gpuMode: "mixed",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-default",
    band: "binary"   // v32: binary-first default
  });

  // GPU step — symbolic, continuous
  core.prewarmProfile("gpu-step", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-step",
    band: "symbolic"
  });

  // GPU trace — symbolic, continuous
  core.prewarmProfile("gpu-trace", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-trace",
    band: "symbolic"
  });

  // GPU pressure — symbolic, burst, hot tier
  core.prewarmProfile("gpu-pressure", {
    gpuMode: "symbolic",
    gpuStream: "burst",
    gpuTier: "hot",
    chunkProfile: "gpu-pressure",
    band: "symbolic"
  });

  // GPU warm-path — symbolic, warm tier
  core.prewarmProfile("gpu-warm-path", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "warm",
    chunkProfile: "gpu-warm-path",
    band: "symbolic"
  });

  // GPU dispatch — mixed, burst
  core.prewarmProfile("gpu-dispatch", {
    gpuMode: "mixed",
    gpuStream: "burst",
    gpuTier: "default",
    chunkProfile: "gpu-dispatch",
    band: "binary"   // dispatch frames benefit from binary-first
  });

  // GPU CI — symbolic, hot tier
  core.prewarmProfile("gpu-ci", {
    gpuMode: "symbolic",
    gpuStream: "burst",
    gpuTier: "hot",
    chunkProfile: "gpu-ci",
    band: "symbolic"
  });

  // GPU genetic — symbolic, continuous
  core.prewarmProfile("gpu-genetic", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-genetic",
    band: "symbolic"
  });

  // GPU insight — symbolic, continuous
  core.prewarmProfile("gpu-insight", {
    gpuMode: "symbolic",
    gpuStream: "continuous",
    gpuTier: "default",
    chunkProfile: "gpu-insight",
    band: "symbolic"
  });

  return core;
}


// Canonical default export
export default createPulseGPUChunker;

PulseRealm.GPUChunker = {
  createPulseGPUChunker,
  PulseGPUChunker,
  PulseGPUChunkerMeta
}