
/*
===============================================================================
FILE: /PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseWorldCompilerWorker-v34.js
ORGAN: PulseWorldCompilerWorker
LAYER: WORLD BACKEND — SEMANTIC COMPILE WORKER — v34-IMMORTAL++-HYPERFRAME+FORMATS
===============================================================================
*/
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const AI_EXPERIENCE_META = {
  identity: "PulseWorld.CompilerWorker",
  version: "v34-Immortal++-HyperFrame+Formats",
  layer: "pulse_world_backend",
  role: "semantic_compile_worker",
  lineage:
    "CompilerWorker-v1 → v18 → v20-Immortal → v30-Immortal-Binary → v32-Immortal++-Binary → v33-Immortal++-HyperFrame → v34-Immortal++-HyperFrame+Formats",

  evo: {
    backendOrgan: true,
    compileWorker: true,
    laneAware: true,
    cacheAware: true,
    chunkerAware: true,
    actNowAware: true,
    powerAware: true,
    presenceAware: true,

    deterministicPerJob: true,
    driftProofProfiles: true,
    multiLaneCache: true,

    zeroDOM: true,
    zeroUI: true,
    zeroRuntimeMutation: true,

    // v30
    worldBinaryAware: true,
    meshAware: true,
    satelliteAware: true,
    routerAware: true,
    gpuLymphAware: true,

    // v32
    oneBandAware: true,
    continuanceAware: true,
    worldRuntimeAware: true,
    binarySubstrateV32: true,
    chunkerV32Aligned: true,

    // v33
    hyperFrameAware: true,
    deltaFrameAware: true,
    trustPulseAware: true,
    cacheIntegrityAware: true,
    shortcutActivationAware: true,
    executableAware: true,
    runtimeBundleAware: true,
    multiArtifactAware: true,

    // v34 — FILE FORMAT / MEDIA AWARE
    fileFormatAware: true,
    mediaFormatAware: true,
    pulseFormatAware: true,
    pexAware: true
  },

  contract: {
    always: [
      "PulseWorldCompile",
      "ChunkerFactory",
      "ACTNowFactory",
      "PulsePowerAPI",
      "Brain",
      "Logger",
      "WorldBinaryCore",
      "Router"
    ],
    never: ["window", "document", "DOM", "eval", "dynamicImport"]
  }
};

export const EXPORT_META = {
  organ: "PulseWorld.CompilerWorker",
  layer: "pulse_world_backend",
  stability: "IMMORTAL++",
  deterministic: "per-job",

  consumes: [
    "CompileJob",
    "BackendProfile",
    "PulseWorldCompile",
    "Chunker",
    "ACTNow",
    "PulsePowerSnapshot",
    "WorldBinaryContext",
    "RouterSnapshot"
  ],

  produces: [
    "CompileResponse",
    "ChunkMeta",
    "ActNowReflex",
    "PowerHints",
    "PresenceEnvelope",
    "BinaryCompileSurface",
    "RuntimeCompileSurface",
    "ExecutableCompileSurface",
    "FileFormatCompileSurface"
  ],

  sideEffects: "log_only",
  network: "browser_ping"   // ⭐ UPGRADED: worker now allowed to signal browser
};

const WORKER_SCHEMA_VERSION = "v5";
const DEFAULT_LANE_COUNT = 32;
const CACHE_TTL_MS = 120_000;

function pingInternetForUrl(url) {
  if (!url) return;
  try {
    fetch(url, { method: "GET", cache: "no-store" }).catch(() => {});
  } catch {}
}

function notifyBrowserOfArtifacts(artifacts) {
  if (!artifacts) return;

  pingInternetForUrl(artifacts.worldBundle);
  pingInternetForUrl(artifacts.runtimeBundle);
  pingInternetForUrl(artifacts.executableBundle);
}

// ============================================================================
// INTERNAL: PROFILE ENGINE — IMMORTAL BACKEND PROFILES (v34)
// ============================================================================
function createProfileEngine({ Logger } = {}) {
  const log = Logger.log || console.log;

  const profiles = Object.create(null);
  const stats = Object.create(null);

  function defineProfile(profileId, base) {
    profiles[profileId] = {
      profileId,
      backendKind: base.backendKind || "compile",
      worldBand: base.worldBand || "backend",
      presenceTag: base.presenceTag || "compile-worker",
      band: base.band || "dual",
      chunkProfile: base.chunkProfile || "compile-default",
      defaultChunkSize: base.defaultChunkSize || 32 * 1024,
      binaryMode: base.binaryMode || "symbolic",
      meshMode: base.meshMode || "mesh-first",
      executableMode: base.executableMode || "world-exec",
      runtimeMode: base.runtimeMode || "world-runtime",
      fileFormatMode: base.fileFormatMode || "none",
      mediaKind: base.mediaKind || null
    };
    stats[profileId] = {
      profileId,
      totalBytes: 0,
      jobs: 0,
      lastTs: 0
    };
  }

  function prewarmProfile(profileId, base) {
    if (!profiles[profileId]) {
      defineProfile(profileId, base);
      log("[CompilerWorker v34] Profile prewarmed", { profileId });
    }
  }

  function resolveProfile(rawContext = {}) {
    const profileId =
      rawContext.profileId ||
      rawContext.backendKind ||
      "compile-default";

    if (!profiles[profileId]) {
      defineProfile(profileId, {
        backendKind: rawContext.backendKind || "compile",
        worldBand: rawContext.worldBand || "backend",
        presenceTag: rawContext.presenceTag || "compile-worker",
        band: rawContext.band || "dual",
        chunkProfile: rawContext.chunkProfile || "compile-default",
        defaultChunkSize: rawContext.defaultChunkSize || 32 * 1024,
        binaryMode: rawContext.binaryMode || "symbolic",
        meshMode: rawContext.meshMode || "mesh-first",
        executableMode: rawContext.executableMode || "world-exec",
        runtimeMode: rawContext.runtimeMode || "world-runtime",
        fileFormatMode: rawContext.fileFormatMode || "none",
        mediaKind: rawContext.mediaKind || null
      });
    }

    return profiles[profileId];
  }

  function bumpProfileStats(profileId, bytes) {
    const s = stats[profileId];
    if (!s) return;
    s.totalBytes += bytes || 0;
    s.jobs += 1;
    s.lastTs = PulseRealm.PulseNOW;
  }

  return {
    prewarmProfile,
    resolveProfile,
    bumpProfileStats,
    getProfiles: () => Object.values(profiles).map((p) => ({ ...p })),
    getProfileStats: () => Object.values(stats).map((s) => ({ ...s }))
  };
}

// ============================================================================
// INTERNAL: PRESENCE ENVELOPE — BACKEND WAVE STATE (v34)
// ============================================================================
function buildPresenceEnvelope({
  laneId,
  envelopeId,
  band,
  presenceTag,
  worldBand,
  wave,
  bandKind,
  ok,
  binaryMode,
  meshMode,
  executableMode,
  runtimeMode,
  trustPulse,
  cacheIntegrity,
  shortcutActivation,
  fileFormatMode,
  mediaKind
} = {}) {
  return {
    schemaVersion: WORKER_SCHEMA_VERSION,
    laneId,
    envelopeId,
    band,
    presenceTag,
    worldBand,
    wave,
    bandKind,
    ok: !!ok,
    binaryMode: binaryMode || "symbolic",
    meshMode: meshMode || "mesh-first",
    executableMode: executableMode || "world-exec",
    runtimeMode: runtimeMode || "world-runtime",
    trustPulse: trustPulse || null,
    cacheIntegrity: cacheIntegrity || null,
    shortcutActivation: shortcutActivation || null,
    fileFormatMode: fileFormatMode || "none",
    mediaKind: mediaKind || null,
    ts: PulseRealm.PulseNOW
  };
}

// ============================================================================
// INTERNAL: JOB NORMALIZATION
// ============================================================================
function normalizeCompileJob(rawJob = {}) {
  const payload = rawJob.payload || {};

  return {
    laneId: rawJob.laneId ?? 0,
    envelopeId: rawJob.envelopeId || null,
    userId: rawJob.userId || null,

    entry: rawJob.entry || payload.entry || null,
    outfile: rawJob.outfile || payload.outfile || null,
    mode: rawJob.mode || payload.mode || "esm",
    buildKind: rawJob.buildKind || payload.buildKind || "world",

    targetId: rawJob.targetId || rawJob.route || "unknown",
    surfaceId: rawJob.surfaceId || rawJob.pageId || null,
    intent: rawJob.intent || "compile",

    payload,
    options: rawJob.options || {}
  };
}

// ============================================================================
// INTERNAL: MULTI-LANE CACHE
// ============================================================================
function createCompileCache({ Logger, laneCount = DEFAULT_LANE_COUNT, ttlMs = CACHE_TTL_MS } = {}) {
  const log = Logger.log || console.log;

  const laneStores = [];
  const laneStats = [];

  for (let i = 0; i < laneCount; i++) {
    laneStores.push(new Map());
    laneStats.push({ laneId: i, entries: 0, lastTs: 0 });
  }

  function buildCacheKey(job, profile, worldBinaryContext = {}) {
    const base = JSON.stringify({
      entry: job.entry,
      outfile: job.outfile,
      mode: job.mode,
      buildKind: job.buildKind,
      intent: job.intent,
      payload: job.payload,
      profileId: profile.profileId,
      backendKind: profile.backendKind,
      binaryMode: profile.binaryMode,
      meshMode: profile.meshMode,
      executableMode: profile.executableMode,
      runtimeMode: profile.runtimeMode,
      fileFormatMode: profile.fileFormatMode,
      mediaKind: profile.mediaKind,
      trustMode: worldBinaryContext.trustMode,
      shortcutMode: worldBinaryContext.shortcutMode,
      fileFormatJob: worldBinaryContext.fileFormatJob || false,
      fileFormatKind: worldBinaryContext.fileFormatKind || null
    });

    let h = 0;
    for (let i = 0; i < base.length; i++) {
      h = (h * 31 + base.charCodeAt(i)) >>> 0;
    }
    return `CW34-${h.toString(16).padStart(8, "0")}`;
  }

  function pickLaneIndex(cacheKey) {
    let h = 0;
    for (let i = 0; i < cacheKey.length; i++) {
      h = (h * 31 + cacheKey.charCodeAt(i)) >>> 0;
    }
    return h % laneStores.length;
  }

  function get(cacheKey) {
    const laneIndex = pickLaneIndex(cacheKey);
    const laneStore = laneStores[laneIndex];
    const stat = laneStats[laneIndex];

    const now = PulseRealm.PulseNOW;
    const entry = laneStore.get(cacheKey);
    if (!entry) return null;

    if (entry.expiresAt <= now) {
      laneStore.delete(cacheKey);
      stat.entries = laneStore.size;
      return null;
    }

    stat.lastTs = now;
    return { laneIndex, entry };
  }

  function put(cacheKey, response) {
    const laneIndex = pickLaneIndex(cacheKey);
    const laneStore = laneStores[laneIndex];
    const stat = laneStats[laneIndex];

    const now = PulseRealm.PulseNOW;
    const expiresAt = now + ttlMs;

    laneStore.set(cacheKey, {
      createdAt: now,
      expiresAt,
      response
    });

    stat.entries = laneStore.size;
    stat.lastTs = now;

    log("[CompilerWorker v34] Cache stored", {
      cacheKey,
      laneIndex,
      expiresAt
    });
  }

  return {
    buildCacheKey,
    get,
    put,
    getLaneStats: () => laneStats.map((s) => ({ ...s })),
    getLaneCacheSnapshot: () =>
      laneStores.map((store, idx) => ({ laneId: idx, size: store.size }))
  };
}

// ============================================================================
// BINARY COMPILE SURFACES — v34
// ============================================================================
function buildBinaryCompileSurface_v34({
  job,
  profile,
  compileBytes,
  laneId,
  artifactKind
}) {
  const loadClass =
    compileBytes > 256 * 1024
      ? "heavy"
      : compileBytes > 64 * 1024
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

  const advantageTier =
    profile.binaryMode === "binary"
      ? 3
      : profile.binaryMode === "hybrid"
      ? 2
      : 1;

  const isFileFormat =
    artifactKind === "fileformat" ||
    job.buildKind === "fileformat" ||
    profile.fileFormatMode !== "none";

  return {
    kind: "compile_job_v34",
    artifactKind,
    laneId,
    targetId: job.targetId,
    surfaceId: job.surfaceId,
    intent: job.intent,
    profileId: profile.profileId,
    backendKind: profile.backendKind,
    worldBand: profile.worldBand,
    binaryMode: profile.binaryMode,
    meshMode: profile.meshMode,
    executableMode: profile.executableMode,
    runtimeMode: profile.runtimeMode,
    bytes: compileBytes,
    throughputClass,
    throughputScore,
    advantageTier,
    fileFormatMode: profile.fileFormatMode,
    mediaKind: profile.mediaKind,
    isFileFormat
  };
}

// ============================================================================
// WORKER FACTORY — v34 IMMORTAL BACKEND ORGAN (NOW NETWORK-AWARE)
// ============================================================================
export function createPulseWorldCompilerWorker({
  PulseWorldCompile,
  ChunkerFactory,
  ACTNowFactory,
  PulsePowerAPI,
  WorldBinaryCore,
  Router,
  Brain,
  Logger
} = {}) {
  if (!PulseWorldCompile) {
    throw new Error("CompilerWorker v34: Missing PulseWorldCompile.");
  }

  const log = Logger.log ?? Brain.log ?? console.log;
  const warn = Logger.warn ?? Brain.warn ?? console.warn;
  const error = Logger.error ?? Brain.logError ?? console.error;

  const Chunker =
    typeof ChunkerFactory === "function"
      ? ChunkerFactory({ Brain, Logger })
      : null;

  const ACTNow =
    typeof ACTNowFactory === "function"
      ? ACTNowFactory({
          PulseImmunity: Brain.Immunity || {},
          PulseSurgeonGeneral: Brain.SurgeonGeneral || {}
        })
      : null;

  const profileEngine = createProfileEngine({ Logger });
  const cache = createCompileCache({ Logger });

  function safeLog(stage, details = {}) {
    try {
      log(
        `[CompilerWorker-v34] ${stage}`,
        {
          schemaVersion: WORKER_SCHEMA_VERSION,
          ...details
        }
      );
    } catch {}
  }

  // ------------------------------------------------------------------------
  // PREWARM
  // ------------------------------------------------------------------------
  function prewarm() {
    safeLog("PREWARM_START");

    profileEngine.prewarmProfile("compile-default", {
      backendKind: "compile",
      worldBand: "backend",
      presenceTag: "compile-worker",
      band: "dual",
      chunkProfile: "compile-default",
      binaryMode: "hybrid",
      meshMode: "mesh-first",
      executableMode: "world-exec",
      runtimeMode: "world-runtime",
      fileFormatMode: "none",
      mediaKind: null
    });

    profileEngine.prewarmProfile("compile-world", {
      backendKind: "world",
      worldBand: "backend",
      presenceTag: "compile-world",
      band: "dual",
      chunkProfile: "compile-world",
      binaryMode: "hybrid",
      meshMode: "mesh-first",
      executableMode: "world-exec",
      runtimeMode: "world-runtime",
      fileFormatMode: "none",
      mediaKind: null
    });

    profileEngine.prewarmProfile("compile-runtime", {
      backendKind: "runtime",
      worldBand: "backend",
      presenceTag: "compile-runtime",
      band: "dual",
      chunkProfile: "compile-runtime",
      binaryMode: "binary",
      meshMode: "host-mesh",
      executableMode: "world-exec",
      runtimeMode: "world-runtime",
      fileFormatMode: "none",
      mediaKind: null
    });

        profileEngine.prewarmProfile("compile-exec", {
      backendKind: "exec",
      worldBand: "backend",
      presenceTag: "compile-exec",
      band: "dual",
      chunkProfile: "compile-exec",
      binaryMode: "binary",
      meshMode: "host-mesh",
      executableMode: "world-exec",
      runtimeMode: "world-runtime",
      fileFormatMode: "none",
      mediaKind: null
    });

    // v34 — dedicated file format / media compile profile
    profileEngine.prewarmProfile("compile-fileformat", {
      backendKind: "fileformat",
      worldBand: "backend",
      presenceTag: "compile-fileformat",
      band: "dual",
      chunkProfile: "compile-fileformat",
      binaryMode: "binary",
      meshMode: "mesh-first",
      executableMode: "world-exec",
      runtimeMode: "world-runtime",
      fileFormatMode: "pex",
      mediaKind: "image"
    });

    safeLog("PREWARM_DONE");
  }

  // ------------------------------------------------------------------------
  // CORE COMPILE PRIMITIVE — async, deterministic per job (v34)
  // ------------------------------------------------------------------------
  async function compileJob(rawJob, rawContext = {}) {
    const job = normalizeCompileJob(rawJob);
    const profile = profileEngine.resolveProfile(rawContext);

    const worldBinaryContext = rawContext.worldBinaryContext || {};
    const trustPulse = rawContext.trustPulse || null;
    const cacheIntegrity = rawContext.cacheIntegrity || null;
    const shortcutActivation = rawContext.shortcutActivation || null;

    const presenceBase = {
      laneId: job.laneId,
      envelopeId: job.envelopeId,
      band: profile.band,
      presenceTag: profile.presenceTag,
      worldBand: profile.worldBand,
      binaryMode: profile.binaryMode,
      meshMode: profile.meshMode,
      executableMode: profile.executableMode,
      runtimeMode: profile.runtimeMode,
      trustPulse,
      cacheIntegrity,
      shortcutActivation,
      fileFormatMode: profile.fileFormatMode,
      mediaKind: profile.mediaKind
    };

    const cacheKey = cache.buildCacheKey(job, profile, worldBinaryContext);
    const cached = cache.get(cacheKey);

    if (cached) {
      const presence = buildPresenceEnvelope({
        ...presenceBase,
        wave: "stable",
        bandKind: "backend_compile_worker",
        ok: true
      });

      safeLog("CACHE_HIT", {
        laneId: job.laneId,
        targetId: job.targetId,
        intent: job.intent
      });

      const resp = cached.entry.response;
      return {
        ...resp,
        presence
      };
    }

    // 1) Run compiler (v34 multi-artifact + fileformat-aware compile brain)
    let compileResult = null;
    let compileDiagnostics = null;
    let artifacts = null;
    let binaryBuildSurface = null;

    try {
      let result;

      const lanes = rawContext.lanes || [];

      const compilePayload = {
        entry: job.entry,
        outfile: job.outfile,
        mode: job.mode,
        buildKind: job.buildKind,
        lanes,
        minify: job.options.minify,
        sourcemap: job.options.sourcemap,
        splitting: job.options.splitting,
        define: job.options.define,
        loader: job.options.loader,
        worldBinaryContext: {
          ...worldBinaryContext,
          fileFormatMode: profile.fileFormatMode,
          mediaKind: profile.mediaKind
        }
      };

      if (typeof PulseWorldCompile === "function") {
        result = await PulseWorldCompile(compilePayload);
      } else if (typeof PulseWorldCompile.compile === "function") {
        result = await PulseWorldCompile.compile(compilePayload);
      } else {
        throw new Error("Invalid PulseWorldCompile shape");
      }

      compileResult = result || null;
      compileDiagnostics = result.diagnostics ?? null;
      artifacts = result.artifacts || null;
      binaryBuildSurface = result.binaryBuildSurface || null;
    } catch (e) {
      const msg = e.message || "Compile failed";
      error("[CompilerWorker v34] Compile failed", {
        laneId: job.laneId,
        targetId: job.targetId,
        intent: job.intent,
        error: msg
      });

      const presence = buildPresenceEnvelope({
        ...presenceBase,
        wave: "distorted",
        bandKind: "backend_compile_worker",
        ok: false
      });

      return {
        ok: false,
        laneId: job.laneId,
        envelopeId: job.envelopeId,
        compileResult: null,
        chunkMeta: null,
        actNowReflex: null,
        powerHints: null,
        binaryCompileSurface: null,
        runtimeCompileSurface: null,
        executableCompileSurface: null,
        fileFormatCompileSurface: null,
        presence,
        diagnostics: {
          error: msg,
          compileDiagnostics: null
        }
      };
    }

    const compileBytes = Buffer.byteLength(
      JSON.stringify(compileResult ?? {}),
      "utf8"
    );
    profileEngine.bumpProfileStats(profile.profileId, compileBytes);

    // 2) Chunk metadata
    let chunkMeta = null;
    if (Chunker && typeof Chunker.chunkPayload === "function") {
      try {
        const buffer = Buffer.from(
          JSON.stringify(compileResult ?? {}),
          "utf8"
        );
        chunkMeta = Chunker.chunkPayload({
          userId: job.userId,
          payload: buffer,
          chunkSize: profile.defaultChunkSize,
          baseVersion: "v3",
          sizeOnly: false,
          presenceTag: profile.presenceTag,
          band: profile.band,
          backendKind: profile.backendKind,
          worldBand: profile.worldBand,
          chunkProfile: profile.chunkProfile
        });
      } catch (e) {
        warn("[CompilerWorker v34] Chunk metadata failed", {
          laneId: job.laneId,
          error: e.message
        });
      }
    }

    // 3) ACTNow reflex
    let actNowReflex = null;
    if (ACTNow && typeof ACTNow.reflex === "function") {
      try {
        const snapshot = {
          laneId: job.laneId,
          targetId: job.targetId,
          intent: job.intent,
          compileDiagnostics,
          chunkMeta,
          profile,
          artifacts,
          binaryBuildSurface
        };
        actNowReflex = ACTNow.reflex(snapshot, { modeKind: "dual" });
      } catch (e) {
        warn("[CompilerWorker v34] ACTNow reflex failed", {
          laneId: job.laneId,
          error: e.message
        });
      }
    }

    // 4) Power hints
    let powerHints = null;
    if (
      PulsePowerAPI &&
      typeof PulsePowerAPI.getPulsePowerSnapshot === "function"
    ) {
      try {
        const snap = PulsePowerAPI.getPulsePowerSnapshot();
        powerHints = {
          lanes: snap.chunkHints.lanes || null,
          prewarmTargets: snap.chunkHints.prewarmTargets || null
        };
      } catch (e) {
        warn("[CompilerWorker v34] Power snapshot failed", {
          laneId: job.laneId,
          error: e.message
        });
      }
    }

    // 5) Binary compile surfaces
    const worldCompileSurface = buildBinaryCompileSurface_v34({
      job,
      profile,
      compileBytes,
      laneId: job.laneId,
      artifactKind: "world"
    });

    const runtimeCompileSurface = buildBinaryCompileSurface_v34({
      job,
      profile,
      compileBytes,
      laneId: job.laneId,
      artifactKind: "runtime"
    });

    const executableCompileSurface = buildBinaryCompileSurface_v34({
      job,
      profile,
      compileBytes,
      laneId: job.laneId,
      artifactKind: "executable"
    });

    const fileFormatCompileSurface = buildBinaryCompileSurface_v34({
      job,
      profile,
      compileBytes,
      laneId: job.laneId,
      artifactKind: "fileformat"
    });

    if (
      WorldBinaryCore &&
      typeof WorldBinaryCore.registerEntity === "function"
    ) {
      try {
        WorldBinaryCore.registerEntity(worldCompileSurface);
        WorldBinaryCore.registerEntity(runtimeCompileSurface);
        WorldBinaryCore.registerEntity(executableCompileSurface);
        WorldBinaryCore.registerEntity(fileFormatCompileSurface);
      } catch {}
    }

    // ⭐ NEW: Browser network ping (Option B)
    if (artifacts) {
      notifyBrowserOfArtifacts(artifacts);
    }

    const presence = buildPresenceEnvelope({
      ...presenceBase,
      wave: "coherent",
      bandKind: "backend_compile_worker",
      ok: true
    });

    const response = {
      ok: true,
      laneId: job.laneId,
      envelopeId: job.envelopeId,
      compileResult,
      artifacts,
      chunkMeta,
      actNowReflex,
      powerHints,
      binaryCompileSurface: worldCompileSurface,
      runtimeCompileSurface,
      executableCompileSurface,
      fileFormatCompileSurface,
      presence,
      diagnostics: {
        compileDiagnostics,
        profileId: profile.profileId,
        bytes: compileBytes
      }
    };

    cache.put(cacheKey, response);

    return response;
  }

  // ------------------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------------------
  const api = {
    meta: {
      identity: "PulseWorldCompilerWorker",
      version: "v34-Immortal++-HyperFrame+Formats",
      schemaVersion: WORKER_SCHEMA_VERSION,
      lanes: DEFAULT_LANE_COUNT
    },

    prewarm,
    compileJob,

    getProfiles: profileEngine.getProfiles,
    getProfileStats: profileEngine.getProfileStats,
    getLaneStats: cache.getLaneStats,
    getLaneCacheSnapshot: cache.getLaneCacheSnapshot
  };

  safeLog("Initializing Components..", {
    lanes: api.meta.lanes
  });

  return api;
}

export default createPulseWorldCompilerWorker;

PulseRealm.WorldCompilerWorker = {
  createPulseWorldCompilerWorker,
  AI_EXPERIENCE_META,
  EXPORT_META
}
PulseRealm.PulseWorldCompilerWorker = createPulseWorldCompilerWorker;