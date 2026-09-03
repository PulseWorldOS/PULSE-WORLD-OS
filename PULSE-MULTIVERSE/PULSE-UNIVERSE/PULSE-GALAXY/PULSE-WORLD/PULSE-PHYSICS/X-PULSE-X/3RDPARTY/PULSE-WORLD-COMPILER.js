/*
===============================================================================
FILE: /PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseWorldCompiler-v34.js
ORGAN: PulseWorldCompiler
LAYER: WORLD TOOLING — SEMANTIC BUILD BRAIN — v34-IMMORTAL++-HYPERFRAME+FORMATS
===============================================================================
*/

// ============================================================================
// IMPORTS — IMMORTAL-SAFE (PulsePort nullified)
// ============================================================================
import { createPulseWorldCompilerWorker as CompilerWorker } from "./PULSE-WORLD-COMPILERWORKER.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


const C_ID   = "color:NFG2D0; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

console.log(
  "✨ PULSE MULTIVERSAL COMPILER v30 - %c[PulseWorldCompiler v30] Semantic Build Brain Compiling..",
    C_ID
);


function pingInternetForUrl(url) {
  if (!url) return;
  try {
    fetch(url, {
      method: "GET",
      cache: "no-store"
    }).catch(() => {});
  } catch {}
}

function notifyInternetOfBuildOutputs(signature) {
  if (!signature || !signature.outputs) return;

  const { worldOut, runtimeOut, execOut } = signature.outputs;

  pingInternetForUrl(worldOut);
  pingInternetForUrl(runtimeOut);
  pingInternetForUrl(execOut);
}

// ============================================================================
// IMMORTAL v34 — esbuild RESOLUTION LAYER
// ============================================================================
let __esbuildCache = null;

async function resolveEsbuild() {
  if (__esbuildCache) return __esbuildCache;

  // 1) Direct Node import (offline-only)
  try {
    const mod = await import("esbuild");
    const candidate = mod.default || mod;
    if (candidate && typeof candidate.build === "function") {
      __esbuildCache = candidate;
      return __esbuildCache;
    }
  } catch {}

  throw new Error("[PulseWorldCompiler-v34] esbuild not available");
}


// ============================================================================
// WORLD ENTRY RESOLUTION — v34
// ============================================================================
function resolveWorldEntry(entry) {
  if (entry && typeof entry === "string") return entry;
  return "WORLD-ENTRY.js";
}


// ============================================================================
// WORLD OUTPUT RESOLUTION — v34
//   • worldOut:     main world bundle
//   • runtimeOut:   runtime bundle
//   • execOut:      3rd executable type
// ============================================================================
function resolveWorldOutput(outfile) {
  const base = outfile && typeof outfile === "string"
    ? outfile
    : "WORLD-BUILD.js";

  const dot = base.lastIndexOf(".");
  const stem = dot > 0 ? base.slice(0, dot) : base;
  const ext = dot > 0 ? base.slice(dot) : ".js";

  return {
    worldOut: base,
    runtimeOut: `${stem}-runtime${ext}`,
    execOut: `${stem}-exec${ext}`
  };
}


// ============================================================================
// WORLD CONTEXT RESOLUTION — v34
// ============================================================================
function resolveWorldContext() {
  return {
    binaryMode: "symbolic",
    meshMode: "mesh-first",
    satelliteMode: "auto",
    oneBandMode: "auto",
    continuanceMode: "auto",
    runtimeMode: "world-runtime",
    executableMode: "world-exec",
    trustMode: "user-pulse",
    shortcutMode: "device-shortcut",
    fileFormatMode: "none",
    mediaKind: null
  };
}


// ============================================================================
// IMMORTAL BUILD SIGNATURE — v34-IMMORTAL++-HYPERFRAME+FORMATS
// ============================================================================
function buildSignature({
  entry,
  outputs,
  mode = "esm",
  buildKind = "world",
  lanes = [],
  worldBinaryContext = {}
} = {}) {
  return {
    version: "v34-IMMORTAL++-HYPERFRAME+FORMATS",
    buildKind,
    entry,
    outputs, // { worldOut, runtimeOut, execOut }
    mode,
    lanes,
    deterministic: true,

    binaryMode: worldBinaryContext.binaryMode,
    meshMode: worldBinaryContext.meshMode,
    satelliteMode: worldBinaryContext.satelliteMode,
    oneBandMode: worldBinaryContext.oneBandMode,
    continuanceMode: worldBinaryContext.continuanceMode,
    runtimeMode: worldBinaryContext.runtimeMode,
    executableMode: worldBinaryContext.executableMode,
    trustMode: worldBinaryContext.trustMode,
    shortcutMode: worldBinaryContext.shortcutMode,

    // v34 — file / media format
    fileFormatMode: worldBinaryContext.fileFormatMode,
    mediaKind: worldBinaryContext.mediaKind
  };
}

// ============================================================================
// CHUNK HINTS — v34
// ============================================================================
function buildChunkHints(metafile, signature) {
  if (!metafile) {
    return {
      entryPoints: [],
      chunks: [],
      meshAffinity: "unknown",
      binaryAffinity: "symbolic"
    };
  }

  const entryPoints = Object.keys(metafile.entryPoints || {});
  const outputs = Object.keys(metafile.outputs || {});
  const chunks = outputs.filter((o) => o.endsWith(".js"));

  const meshAffinity =
    signature.meshMode === "mesh-first"
      ? "high"
      : signature.meshMode === "host-mesh"
      ? "medium"
      : signature.meshMode === "satellite-mesh"
      ? "edge"
      : "unknown";

  const binaryAffinity =
    signature.binaryMode === "binary"
      ? "binary"
      : signature.binaryMode === "hybrid"
      ? "hybrid"
      : "symbolic";

  return {
    entryPoints,
    chunks,
    meshAffinity,
    binaryAffinity
  };
}

// ============================================================================
// BINARY BUILD SURFACE — v34 (WORLD + RUNTIME + EXECUTABLE + FILEFORMAT)
// ============================================================================
function buildBinaryBuildSurface(signature, chunkHints, artifactKind = "world") {
  const entityId = `build::${signature.entry}::${signature.outputs.worldOut}::${artifactKind}`;

  const throughputClass =
    chunkHints.meshAffinity === "high"
      ? "throughput_high"
      : chunkHints.meshAffinity === "edge"
      ? "throughput_normal"
      : "throughput_low";

  const throughputScore =
    chunkHints.meshAffinity === "high"
      ? 0.85
      : chunkHints.meshAffinity === "edge"
      ? 0.65
      : 0.45;

  const advantageTier =
    signature.binaryMode === "binary"
      ? 3
      : signature.binaryMode === "hybrid"
      ? 2
      : 1;

  const advantageScore =
    signature.binaryMode === "binary"
      ? 0.5
      : signature.binaryMode === "hybrid"
      ? 0.3
      : 0.15;

  const binaryDensity =
    chunkHints.binaryAffinity === "binary"
      ? 0.95
      : chunkHints.binaryAffinity === "hybrid"
      ? 0.7
      : 0.35;

  const waveAmplitude =
    chunkHints.meshAffinity === "high"
      ? 40
      : chunkHints.meshAffinity === "edge"
      ? 28
      : 18;

  const isFileFormat =
    artifactKind === "fileformat" ||
    signature.buildKind === "fileformat" ||
    signature.fileFormatMode !== "none";

  return {
    id: entityId,
    kind: "world_build_v34",
    band: signature.binaryMode === "binary" ? "binary" : "symbolic",

    throughputClass,
    throughputScore,
    advantageTier,
    advantageScore,
    binaryDensity,
    waveAmplitude,

    parity: 0,
    shiftDepth: 5,

    baseFormulaKey: "world_build_v34",
    localChunkerRef: true,

    // v34: explicit 3-artifact model + fileformat awareness
    artifacts: {
      worldBundle: signature.outputs.worldOut,
      runtimeBundle: signature.outputs.runtimeOut,
      executableBundle: signature.outputs.execOut
    },

    // v34 — file / media format hints
    artifactKind,
    fileFormatMode: signature.fileFormatMode,
    mediaKind: signature.mediaKind,
    isFileFormat
  };
}
export async function buildTaskManagerSurface({
  signature,
  organismMap,
  entry,
  outputs,
  lanes,
  mode,
  buildKind,
  worldBinaryContext
}) {

  const surface = {
    signature,
    buildKind,
    mode,
    entry,
    outputs,
    lanes,
    worldBinaryContext,
    systems: {},
    total: {
      sizeKB: 0,
      pages: 0,
      tasks: 0,
      subsystems: 0,
      systems: 0
    }
  };

  // Helper: convert bytes → KB/MB
  const toKB = bytes => Math.round(bytes / 1024);
  const toMB = bytes => (bytes / (1024 * 1024)).toFixed(2);

  // Helper: measure function timing
  const measureFn = async (fn) => {
    const start = performance.now();
    let result;
    try { result = await fn(); }
    catch (e) { result = null; }
    const end = performance.now();
    return end - start;
  };

  // Helper: measure file size
  const measureFileSize = async (path) => {
    try {
      const res = await fetch(path);
      const blob = await res.blob();
      return blob.size;
    } catch {
      return 0;
    }
  };

  // ---------------------------------------------------------------------------
  // BUILD SYSTEM → SUBSYSTEM → PAGE → TASK HIERARCHY
  // ---------------------------------------------------------------------------
  for (const systemName in organismMap.systems) {
    const system = organismMap.systems[systemName];

    surface.systems[systemName] = {
      name: systemName,
      sizeKB: 0,
      subsystems: {},
      pages: 0,
      tasks: 0
    };

    surface.total.systems++;

    // SUBSYSTEMS
    for (const subName in system.subsystems) {
      const subsystem = system.subsystems[subName];

      surface.systems[systemName].subsystems[subName] = {
        name: subName,
        sizeKB: 0,
        pages: {},
        tasks: 0
      };

      surface.total.subsystems++;

      // PAGES
      for (const pageName of subsystem.pages) {
        const pagePath = subsystem.pagePaths[pageName];

        const pageSizeBytes = pagePath
          ? await measureFileSize(pagePath)
          : 0;

        const pageSizeKB = toKB(pageSizeBytes);

        surface.systems[systemName].subsystems[subName].pages[pageName] = {
          name: pageName,
          sizeKB: pageSizeKB,
          sizeMB: toMB(pageSizeBytes),
          tasks: {}
        };

        surface.systems[systemName].sizeKB += pageSizeKB;
        surface.systems[systemName].subsystems[subName].sizeKB += pageSizeKB;
        surface.total.sizeKB += pageSizeKB;
        surface.total.pages++;

        // TASKS (functions inside the page)
        const pageTasks = subsystem.pageTasks[pageName] || [];

        for (const task of pageTasks) {
          const timing = await measureFn(task.fn);

          surface.systems[systemName].subsystems[subName].pages[pageName].tasks[task.name] = {
            name: task.name,
            avgMs: timing,
            calls: task.calls || 0,
            loopsDetected: task.loopsDetected || false,
            async: task.isAsync || false,
            imports: task.imports || [],
            exports: task.exports || []
          };

          surface.systems[systemName].subsystems[subName].tasks++;
          surface.systems[systemName].tasks++;
          surface.total.tasks++;
        }
      }
    }
  }

  return surface;
}

// ============================================================================
// CORE COMPILER BRAIN — PulseWorldCompile (v34)
//   • builds world bundle
//   • builds runtime bundle
//   • builds 3rd executable type
//   • fileformat-aware (PEX / media) via buildKind + worldBinaryContext
//   • NEW: signals Network tab with world/runtime/exec outputs
// ============================================================================
export async function PulseWorldCompile(options = {}) {
  const entry = resolveWorldEntry(options.entry);
  const outputs = resolveWorldOutput(options.outfile);

  const baseContext = resolveWorldContext();
  const worldBinaryContext = {
    ...baseContext,
    ...(options.worldBinaryContext || {})
  };

  const lanes = options.lanes || [];
  const mode = options.mode || "esm";
  const buildKind = options.buildKind || "world";

  const signature = buildSignature({
    entry,
    outputs,
    mode,
    buildKind,
    lanes,
    worldBinaryContext
  });

  const esbuild = await resolveEsbuild();

  // --------------------------------------------------------------------------
  // 0) TASK MANAGER / ORGANISM MAP SURFACE (v34+)
  // --------------------------------------------------------------------------
  const taskManagerSurface = buildTaskManagerSurface({
    signature,
    organismMap: PulseRealm.PulseOrganismMap,
    entry,
    outputs,
    lanes,
    mode,
    buildKind,
    worldBinaryContext
  });

  // Prewarm worker with full v34 context (safe no-op if worker ignores args)
  try {
    if (CompilerWorker && typeof CompilerWorker.prewarm === "function") {
      await CompilerWorker.prewarm({
        entry,
        outputs,
        mode,
        buildKind,
        lanes,
        signature,
        worldBinaryContext,
        organismMap: PulseRealm.PulseOrganismMap,
        taskManagerSurface
      });
    }
  } catch {
    // IMMORTAL: never throw from prewarm
  }

  // --------------------------------------------------------------------------
  // 1) WORLD BUNDLE
  // --------------------------------------------------------------------------
  const worldResult = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile: outputs.worldOut,
    minify: options.minify ?? false,
    sourcemap: options.sourcemap ?? true,
    format: mode,
    metafile: true,
    splitting: options.splitting ?? true,
    chunkNames: options.chunkNames ?? "DNA/[name]-[hash]",
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ...(options.loader || {})
    },
    define: {
      ...(options.define || {}),
      __PULSE_WORLD_BUILD_KIND__: JSON.stringify("world")
    },
    target: options.target || ["es2020"],
    platform: options.platform || "browser"
  });

  const chunkHints = buildChunkHints(worldResult.metafile, signature);
  const binaryBuildSurface = buildBinaryBuildSurface(
    signature,
    chunkHints,
    "world"
  );

  // --------------------------------------------------------------------------
  // 2) RUNTIME BUNDLE
  // --------------------------------------------------------------------------
  const runtimeResult = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile: outputs.runtimeOut,
    minify: options.minify ?? true,
    sourcemap: options.sourcemap ?? false,
    format: mode,
    metafile: false,
    splitting: false,
    define: {
      ...(options.define || {}),
      __PULSE_WORLD_BUILD_KIND__: JSON.stringify("runtime")
    },
    target: options.target || ["es2020"],
    platform: options.platform || "browser"
  });

  // --------------------------------------------------------------------------
  // 3) EXECUTABLE BUNDLE (3rd TYPE)
  // --------------------------------------------------------------------------
  const execResult = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile: outputs.execOut,
    minify: options.minify ?? true,
    sourcemap: false,
    format: "iife",
    metafile: false,
    splitting: false,
    define: {
      ...(options.define || {}),
      __PULSE_WORLD_BUILD_KIND__: JSON.stringify("executable"),
      __PULSE_WORLD_EXECUTABLE_VERSION__: JSON.stringify(signature.version)
    },
    target: options.target || ["es2020"],
    platform: "browser"
  });

  // --------------------------------------------------------------------------
  // 4) FILEFORMAT SURFACE (v34 — PEX / media awareness)
  // --------------------------------------------------------------------------
  const fileFormatCompileSurface = buildBinaryBuildSurface(
    signature,
    chunkHints,
    "fileformat"
  );

  // --------------------------------------------------------------------------
  // 5) NETWORK SIGNAL — LET NETWORK TAB / TASK MANAGER SEE NEW BUILD FILES
  // --------------------------------------------------------------------------
  notifyInternetOfBuildOutputs({
    signature,
    artifacts: {
      world: outputs.worldOut,
      runtime: outputs.runtimeOut,
      executable: outputs.execOut
    },
    chunkHints,
    binaryBuildSurface,
    fileFormatCompileSurface,
    taskManagerSurface,
    organismMap: PulseRealm.PulseOrganismMap
  });

  // --------------------------------------------------------------------------
  // 6) TELEMETRY — v34 (compiler + task manager)
  // --------------------------------------------------------------------------
  try {
    const bridge = PulseRealm.PulseProofBridge;
    if (bridge && typeof bridge.signal === "function") {
      bridge.signal("compiler.event", {
        signature,
        metafile: worldResult.metafile,
        chunkHints,
        binaryBuildSurface,
        fileFormatCompileSurface,
        taskManagerSurface,
        organismMap: PulseRealm.PulseOrganismMap,
        artifacts: {
          world: outputs.worldOut,
          runtime: outputs.runtimeOut,
          executable: outputs.execOut
        }
      });
    }
  } catch {}

  console.log(
    "%c[PulseWorldCompiler v30+TaskManager] Semantic Build Brain Compiled.",
    "color:#AF52D0; font-weight:bold; font-family:monospace;"
  );

PulseRealm.PulseTaskManagerSurface = taskManagerSurface;
PulseRealm.PulseTelemetrySurface = taskManagerSurface;

  return {
    worldResult,
    runtimeResult,
    execResult,
    signature,
    chunkHints,
    binaryBuildSurface,
    fileFormatCompileSurface,
    taskManagerSurface,
    organismMap: PulseRealm.PulseOrganismMap,
    artifacts: {
      worldBundle: outputs.worldOut,
      runtimeBundle: outputs.runtimeOut,
      executableBundle: outputs.execOut
    }
  };
}


export default PulseWorldCompile;
export const PulseWorldCompiler = PulseWorldCompile;

PulseRealm.PulseWorldCompiler = PulseWorldCompile;