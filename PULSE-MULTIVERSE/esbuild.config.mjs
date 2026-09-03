// ============================================================================
// FILE: PULSE-MULTIVERSE/esbuild.config.mjs
// PURPOSE: Browser bundle build script for PULSE-MULTIVERSE (Index.js → dist/)
//
// WHY THIS FILE EXISTS:
//   PULSE-WORLD-COMPILER.js (in X-PULSE-X/3RDPARTY) contains a dynamic
//   `import("esbuild")` fallback that is a Node-only tool used for server-side
//   compilation. When esbuild bundles the browser app with --platform=browser,
//   it tries to resolve this import and pulls in esbuild's own Node.js internals
//   (fs, os, path, child_process, crypto, tty), causing 6 resolution errors.
//
// FIX STRATEGY (zero source-code changes):
//   1. A custom esbuild PLUGIN intercepts any import of "esbuild" or Node
//      built-in modules (fs, path, os, crypto, child_process, tty) during
//      the browser bundle pass and replaces them with a safe null-stub that
//      returns empty/noop values at runtime.
//   2. The PULSE-WORLD-COMPILER.js already has a 3-step fallback resolution:
//         1st: PulsePort registry  (runtime-injected)
//         2nd: PulseRealm.__PulseEsbuild (runtime-injected)
//         3rd: dynamic import("esbuild")  ← STUBBED (never runs in browser)
//      This means the stub is 100% safe — esbuild is only used server-side.
//
// USAGE:
//   From inside PULSE-MULTIVERSE/:
//     node esbuild.config.mjs
//   Or via npm script (see package.json build:multiverse):
//     npm run build:multiverse
// ============================================================================

import * as esbuild from "esbuild";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// ⭐ NEW: Build Invocation Diagnostics
// ============================================================================
const invokedScript = process.env.npm_lifecycle_event || "direct";
console.log("🔍 Build Invocation:", invokedScript);
console.log("🔧 Invocation Source:", invokedScript === "direct" ? "node" : "npm script");
console.log("🧭 Build Surface: PULSE-MULTIVERSE / IMMORTAL++ Deterministic Layer\n");

// ============================================================================
// PLUGIN: Node/esbuild stub — intercepts Node-only packages in browser bundles
// ============================================================================
const nodeBuiltinsStubPlugin = {
  name: "node-builtins-browser-stub",
  setup(build) {

    console.log("🔌 Activating Plugin: node-builtins-browser-stub");

    const NODE_ONLY_PACKAGES = [
      "esbuild",
      "fs",
      "path",
      "os",
      "child_process",
      "crypto",
      "tty",
      "stream",
      "util",
      "events",
      "buffer",
      "url",
      "http",
      "https",
      "net",
      "readline",
      "assert",
      "vm",
      "worker_threads",
    ];

    console.log("📦 Node-only packages stubbed:", NODE_ONLY_PACKAGES.join(", "));

    const filter = new RegExp(
      `^(${NODE_ONLY_PACKAGES.map((p) => p.replace("/", "\\/")).join("|")})$`
    );

    build.onResolve({ filter }, (args) => {
      console.log(`🛑 Stub Intercept: ${args.path}`);
      return { path: args.path, namespace: "pulse-node-stub" };
    });

    build.onLoad({ filter: /.*/, namespace: "pulse-node-stub" }, (args) => {
      console.log(`📄 Generating stub for: ${args.path}`);
      const pkg = args.path;
      let stubCode = "";

      if (pkg === "esbuild") {
        stubCode = `
export default null;
export const build = null;
export const transform = null;
export const version = "0.0.0-browser-stub";
`;
      } else if (pkg === "fs") {
        stubCode = `
export const readFileSync = () => "";
export const writeFileSync = () => {};
export const existsSync = () => false;
export const readdirSync = () => [];
export const mkdirSync = () => {};
export const statSync = () => ({});
export const createReadStream = () => null;
export const createWriteStream = () => null;
export default { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, statSync, createReadStream, createWriteStream };
`;
      } else if (pkg === "path") {
        stubCode = `
export const join = (...parts) => parts.join("/");
export const resolve = (...parts) => parts.join("/");
export const dirname = (p) => p.split("/").slice(0, -1).join("/") || ".";
export const basename = (p) => p.split("/").pop();
export const extname = (p) => { const b = p.split("/").pop(); const i = b.lastIndexOf("."); return i > 0 ? b.slice(i) : ""; };
export const sep = "/";
export default { join, resolve, dirname, basename, extname, sep };
`;
      } else {
        stubCode = `
export default {};
`;
      }

      return { contents: stubCode, loader: "js" };
    });
  },
};

// ============================================================================
// PLUGIN: External HTTP/HTTPS URL imports
// ============================================================================
const externalUrlPlugin = {
  name: "external-http-url-imports",
  setup(build) {
    console.log("🔌 Activating Plugin: external-http-url-imports");

    build.onResolve({ filter: /^https?:\/\// }, (args) => {
      console.log(`🌍 External URL preserved: ${args.path}`);
      return { path: args.path, external: true };
    });
  },
};

// ============================================================================
// BUILD CONFIGURATION
// ============================================================================
import { existsSync } from "fs";

const sharedConfig = {
  bundle:      true,
  minify:      true,
  format:      "esm",
  platform:    "browser",
  plugins:     [externalUrlPlugin, nodeBuiltinsStubPlugin],
  treeShaking: true,
  sourcemap:   false,
  logLevel:    "info",
  metafile:    false,
};

console.log("⚙️ Shared Build Config Loaded");

// Build 1 — Kernel (speed export)
const kernelConfig = {
  ...sharedConfig,
  entryPoints: [resolve(__dirname, "PulseOSSpeed.js")],
  outfile:     resolve(__dirname, "PULSE-PORT/PulseOSSpeed.js"),
};

// Build 1 — Kernel (speed export)
const touchConfig = {
  ...sharedConfig,
  entryPoints: [resolve(__dirname, "PulseOSTouch.js")],
  outfile:     resolve(__dirname, "PULSE-PORT/PulseOSTouch.js"),
};

// Build 2 — World (world export)
const worldConfig = {
  ...sharedConfig,
  entryPoints: [resolve(__dirname, "PulseOSWorld.js")],
  outfile:     resolve(__dirname, "PULSE-PORT/PulseOSWorld.js"),
};

// Build 3 — Abilities (abilities export)
const abilitiesConfig = {
  ...sharedConfig,
  entryPoints: [resolve(__dirname, "PulseOSAbilities.js")],
  outfile:     resolve(__dirname, "PULSE-PORT/PulseOSAbilities.js"),
};

// Build 3 — Abilities (abilities export)
const senseConfig = {
  ...sharedConfig,
  entryPoints: [resolve(__dirname, "PulseOSSenses.js")],
  outfile:     resolve(__dirname, "PULSE-PORT/PulseOSSenses.js"),
};
// Build 3 — Abilities (abilities export)
const evoConfig = {
  ...sharedConfig,
  entryPoints: [resolve(__dirname, "PulseOSEvolution.js")],
  outfile:     resolve(__dirname, "PULSE-PORT/PulseOSEvolution.js"),
};
// ============================================================================
// RUN ALL 3 BUILDS IN PARALLEL
// ============================================================================
console.log("🌐 PULSE-WORLD BUILD SYSTEM");
console.log("============================");
console.log("📦 Build 1:  PulseOSSpeed.js    → PULSE-PORT/PulseOSSpeed.js    (speed)");
console.log("📦 Build 2:  PulseOSImports.js   → PULSE-PORT/PulseOSWorld.js     (world)");
console.log("📦 Build 3:  PulseOSAbilities.js → PULSE-PORT/PulseOSAbilities.js (abilities)");
console.log("📦 Build 4:  PulseOSTouch.js → PULSE-PORT/PulseOSTouch.js (touch)");
console.log("📦 Build 5:  PulseOSSenses.js → PULSE-PORT/PulseOSSenses.js (satellites)");
console.log("📦 Build 6:  PulseOSEvolution.js → PULSE-PORT/PulseOSEvolution.js (evolution)");
console.log("🌍 Platform: browser");
console.log("📄 Format:   ESM (minified)");
console.log("============================\n");

const startTime = Date.now();
console.log("⏱️ Build Start Time:", new Date(startTime).toLocaleTimeString(), "\n");

Promise.all([
  esbuild.build(kernelConfig).then(() => console.log("⚡ Kernel Build Complete")),
  esbuild.build(worldConfig).then(() => console.log("🌎 World Build Complete")),
  esbuild.build(abilitiesConfig).then(() => console.log("🧬 Abilities Build Complete")),
  esbuild.build(touchConfig).then(() => console.log("🧬 Touch Build Complete")),
  esbuild.build(senseConfig).then(() => console.log("🧬 Senses Build Complete")),
  esbuild.build(evoConfig).then(() => console.log("🧬 Evolution Build Complete")),
])
  .then(() => {
    const endTime = Date.now();
    console.log("\n✅ PULSE-WORLD BUILD COMPLETE");
    console.log("   PULSE-PORT/PulseOSSpeed.js    → port.serviceworker.net (speed)");
    console.log("   PULSE-PORT/PulseOSWorld.js     → port.binaryos.net (world)");
    console.log("   PULSE-PORT/PulseOSAbilities.js → port.gpuprocessing.Net (abilities)");
    console.log("   PULSE-PORT/PulseOSTouch.js → port.booleanlogic.net (touch)");
    console.log("   PULSE-PORT/PulseOSSenses.js → port.orbitalmap.net (satellites)");
    console.log("   PULSE-PORT/PulseOSEvolution.js → port.pulseworld.net (evolution)");
    console.log("⏱️ Total Build Time:", (endTime - startTime) + "ms\n");
  })
  .catch((err) => {
    console.error("\n❌ BUILD FAILED:", err.message);
    process.exit(1);
  });
