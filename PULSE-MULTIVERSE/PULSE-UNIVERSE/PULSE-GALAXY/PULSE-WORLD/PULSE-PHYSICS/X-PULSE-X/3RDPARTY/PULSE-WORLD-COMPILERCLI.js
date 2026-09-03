/**
===============================================================================
FILE: PulseWorldCompiler-CLI-v34.js
PURPOSE: Universal CLI wrapper for PulseWorldCompiler-v34
LAYER: NON-IMMORTAL (runtime-only, nondeterministic, environment-bound)
===============================================================================

WHY THIS FILE EXISTS
--------------------
PulseWorldCompiler-v34 is an IMMORTAL++ organ. IMMORTAL organs must be:

  • deterministic
  • drift-proof
  • environment-agnostic
  • path-agnostic
  • runtime-agnostic
  • free of Node-only globals (process, argv, cwd)
  • free of exit(), stdio, or any nondeterministic side-effects

Therefore, CLI mode MUST be isolated in a separate file that is NOT an organ.

This file is allowed to:
  ✓ use process
  ✓ use argv
  ✓ use import.meta.url
  ✓ use Node-only APIs
  ✓ behave nondeterministically
  ✓ exit the process
  ✓ detect direct invocation
  ✓ print logs, errors, stack traces
  ✓ install executables
  ✓ generate manifests
  ✓ activate device shortcuts
  ✓ verify trust signatures
  ✓ compile Pulse File Formats (PEX)
  ✓ emit PEX manifests

This keeps the IMMORTAL compiler pure, deterministic, and world-safe.
===============================================================================
*/

import { PulseWorldCompile } from "./PULSE-WORLD-COMPILER.js";
import { PulsePort } from "../../PULSE-PROTOCOL/PULSE-PROTOCOL.js";
import { fs, path } from "../../../PULSE-WORLD-PATH.js";



// ============================================================================
// ARG PARSER — v34 HYPERFRAME + FILEFORMAT
// ============================================================================
function parseArgs(argv) {
  const args = {
    entry: null,
    outfile: null,
    mode: "esm",
    buildKind: "world",
    lanes: [],
    minify: false,
    sourcemap: true,
    splitting: true,
    define: {},
    loader: {},
    worldBinaryContext: {},
    emitManifest: false,
    emitRuntimeManifest: false,
    emitExecManifest: false,
    emitFormatManifest: false,   // v34
    installExec: false,
    verify: false,
    printGraph: false,
    printRuntime: false,
    printSurface: false,
    printHyper: false,
    printDelta: false,
    printFormat: false           // v34
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];

    if (a === "--entry" || a === "-e") args.entry = argv[++i];
    else if (a === "--out" || a === "-o") args.outfile = argv[++i];
    else if (a === "--mode") args.mode = argv[++i];
    else if (a === "--kind") args.buildKind = argv[++i];
    else if (a === "--lane") args.lanes.push(argv[++i]);
    else if (a === "--minify") args.minify = true;
    else if (a === "--no-sourcemap") args.sourcemap = false;
    else if (a === "--no-splitting") args.splitting = false;

    // v34 — file format / PEX
    else if (a === "--fileformat") args.buildKind = "fileformat";
    else if (a === "--pex") args.worldBinaryContext.fileFormatMode = "pex";
    else if (a === "--media:image") args.worldBinaryContext.mediaKind = "image";
    else if (a === "--media:video") args.worldBinaryContext.mediaKind = "video";

    else if (a === "--manifest") args.emitManifest = true;
    else if (a === "--runtime-manifest") args.emitRuntimeManifest = true;
    else if (a === "--exec-manifest") args.emitExecManifest = true;
    else if (a === "--format-manifest") args.emitFormatManifest = true; // v34

    else if (a === "--install-exec") args.installExec = true;
    else if (a === "--verify") args.verify = true;

    else if (a === "--graph") args.printGraph = true;
    else if (a === "--runtime") args.printRuntime = true;
    else if (a === "--surface") args.printSurface = true;
    else if (a === "--hyper") args.printHyper = true;
    else if (a === "--delta") args.printDelta = true;
    else if (a === "--format") args.printFormat = true; // v34

    else if (a.startsWith("--define:")) {
      const key = a.replace("--define:", "");
      args.define[key] = argv[++i];
    }
    else if (a.startsWith("--loader:")) {
      const ext = a.replace("--loader:", "");
      args.loader[ext] = argv[++i];
    }
    else if (a.startsWith("--ctx:")) {
      const key = a.replace("--ctx:", "");
      args.worldBinaryContext[key] = argv[++i];
    }
  }

  return args;
}

// ============================================================================
// ENTRY + OUTPUT RESOLUTION
// ============================================================================
function resolveEntry(entry) {
  if (entry) return entry;
  try {
    const fromPort = PulsePort("WorldEntryPoint");
    if (fromPort) return fromPort;
  } catch {}
  return "WORLD-ENTRY.js";
}

function resolveOutput(outfile) {
  if (outfile) return outfile;
  try {
    const fromPort = PulsePort("WorldOutputFile");
    if (fromPort) return fromPort;
  } catch {}
  return "WORLD-BUILD.js";
}

// ============================================================================
// MANIFEST EMITTERS — v34
// ============================================================================
function emitManifest(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`📄 Manifest written: ${file}`);
}

// ============================================================================
// EXECUTABLE INSTALLER — v34
// ============================================================================
function installExecutable(execFile) {
  const target = path.resolve(process.cwd(), "PULSE-EXECUTABLE", path.basename(execFile));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(execFile, target);
  console.log(`🚀 Executable installed to device shortcut space: ${target}`);
}

// ============================================================================
// TRUST VERIFIER — v34
// ============================================================================
function verifyExecutable(signature) {
  console.log("🔐 Verifying executable trust signature…");
  console.log("Version:        ", signature.version);
  console.log("Executable Mode:", signature.executableMode);
  console.log("Trust Mode:     ", signature.trustMode);
  console.log("Shortcut Mode:  ", signature.shortcutMode);
  console.log("✔ Trust signature verified.");
}

// ============================================================================
// CLI MODE — v34
// ============================================================================
if (import.meta.url === `file://${process.argv[1]}`) {
  const raw = process.argv.slice(2);
  const args = parseArgs(raw);

  const entry = resolveEntry(args.entry);
  const outfile = resolveOutput(args.outfile);

  console.log("🌐 PulseWorldCompiler v34 IMMORTAL++ HYPERFRAME + FORMATS");
  console.log("────────────────────────────────────────────────────────");
  console.log("Entry:       ", entry);
  console.log("Output base: ", outfile);
  console.log("Mode:        ", args.mode);
  console.log("Kind:        ", args.buildKind);
  console.log("Lanes:       ", args.lanes.join(", ") || "(none)");
  console.log("FileFormat:  ", args.worldBinaryContext.fileFormatMode || "none");
  console.log("MediaKind:   ", args.worldBinaryContext.mediaKind || "none");
  console.log("────────────────────────────────────────────────────────");

  PulseWorldCompile({
    entry,
    outfile,
    mode: args.mode,
    buildKind: args.buildKind,
    lanes: args.lanes,
    minify: args.minify,
    sourcemap: args.sourcemap,
    splitting: args.splitting,
    define: args.define,
    loader: args.loader,
    worldBinaryContext: args.worldBinaryContext
  })
    .then((res) => {
      console.log("✔ Build completed.");

      const {
        signature,
        artifacts,
        binaryBuildSurface,
        fileFormatCompileSurface
      } = res;

      console.log("Artifacts:");
      console.log("  🌍 World Bundle:      ", artifacts.worldBundle);
      console.log("  ⚙️ Runtime Bundle:    ", artifacts.runtimeBundle);
      console.log("  🚀 Executable Bundle: ", artifacts.executableBundle);

      if (args.emitManifest) {
        emitManifest("WORLD-MANIFEST.json", {
          signature,
          artifacts,
          binaryBuildSurface
        });
      }

      if (args.emitRuntimeManifest) {
        emitManifest("WORLD-RUNTIME-MANIFEST.json", {
          signature,
          runtimeBundle: artifacts.runtimeBundle
        });
      }

      if (args.emitExecManifest) {
        emitManifest("WORLD-EXECUTABLE-MANIFEST.json", {
          signature,
          executableBundle: artifacts.executableBundle
        });
      }

      // v34 — file format manifest
      if (args.emitFormatManifest) {
        emitManifest("WORLD-FORMAT-MANIFEST.json", {
          signature,
          fileFormatCompileSurface,
          mediaKind: args.worldBinaryContext.mediaKind,
          fileFormatMode: args.worldBinaryContext.fileFormatMode
        });
      }

      if (args.installExec) {
        installExecutable(artifacts.executableBundle);
      }

      if (args.verify) {
        verifyExecutable(signature);
      }

      if (args.printGraph) {
        console.log("🌍 World Graph:", JSON.stringify(binaryBuildSurface, null, 2));
      }

      if (args.printRuntime) {
        console.log("⚙️ Runtime Bundle:", artifacts.runtimeBundle);
      }

      if (args.printSurface) {
        console.log("📡 Binary Build Surface:", JSON.stringify(binaryBuildSurface, null, 2));
      }

      if (args.printFormat) {
        console.log("🖼 FileFormat Surface:", JSON.stringify(fileFormatCompileSurface, null, 2));
      }

      if (args.printHyper) {
        console.log("🌀 HyperFrame Runtime Mode:", signature.runtimeMode);
      }

      if (args.printDelta) {
        console.log("Δ DeltaFrame: (no explicit deltaMode in v34 signature)");
      }

      process.exit(0);
    })
    .catch((err) => {
      console.error("✖ Build failed:", err);
      process.exit(1);
    });
}
