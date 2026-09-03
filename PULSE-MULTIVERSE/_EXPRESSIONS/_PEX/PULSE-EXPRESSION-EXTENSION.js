// ============================================================================
//  PULSE EXPRESSION EXTENSION • PEX COOKER ENTRY POINT
//  v51 • IMMORTAL++ • Deterministic Per‑Image Binary File Surface (RAW PACK)
// ============================================================================

import { sharp as SharpExpression } from "../../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-SHARPEXPRESSION.js";
import { pulseOptimizePEX_v34 as OptimizeSurface } from "../../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-OPTIMIZEPEX.js";

import fs from "fs";
import path from "path";
import esbuild from "esbuild";
import puppeteer from "puppeteer";
// ============================================================================
//  PURE FUNCTIONAL JS COMPILER (unchanged)
// ============================================================================

export async function PulseWorldCompile(options = {}) {
  const entry = path.join(INPUT_DIR, "WORLD-ENTRY.js");
  const outfile = path.join(MAIN_DIR, (options.outfile ?? "WORLD-BUILD.js"));
  const mode = options.mode || "esm";

  const worldResult = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile,
    minify: options.minify ?? false,
    sourcemap: options.sourcemap ?? true,
    format: mode,
    metafile: true,
    splitting: options.splitting ?? false,
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ...(options.loader || {})
    },
    define: {
      ...(options.define || {})
    },
    target: options.target || ["es2020"],
    platform: options.platform || "browser"
  });

  return {
    worldResult,
    outfile,
    metafile: worldResult.metafile
  };
}

// ---------------------------------------------------------------------------
//  CONFIG
// ---------------------------------------------------------------------------

const INPUT_DIR = path.resolve("PULSE-MULTIVERSE/_EXPRESSIONS/_PEX/INPUT/");
const MAIN_DIR = path.resolve("PULSE-MULTIVERSE/_EXPRESSIONS/_PEX/");
const OUTPUT_DIR = path.resolve("PULSE-MULTIVERSE/_EXPRESSIONS/_PEX/BUILD/");
const FORMAT_MANIFEST = path.resolve("PULSE-MULTIVERSE/_EXPRESSIONS/_PEX/WORLD-FORMAT-MANIFEST.json");
const RUNTIME_MANIFEST = path.resolve("PULSE-MULTIVERSE/_EXPRESSIONS/_PEX/WORLD-RUNTIME-MANIFEST.json");

// ---------------------------------------------------------------------------
//  COMPILER WORKER — unchanged except metadata
// ---------------------------------------------------------------------------

function CompilerWorker({ Logger }) {
  async function compileJob(rawFiles) {
    Logger.log("Starting compileJob for", rawFiles.length, "files…");

    const chunkSurface = [];
    const fileMeta = [];

    for (const filePath of rawFiles) {
      const buf = fs.readFileSync(filePath);
      const stat = fs.statSync(filePath);

      chunkSurface.push(buf);
      fileMeta.push({
        path: filePath,
        size: stat.size,
        name: path.basename(filePath),
        ext: path.extname(filePath).toLowerCase()
      });
    }

    Logger.log("compileJob finished. ChunkSurface length:", chunkSurface.length);

    return {
      chunkSurface,
      files: fileMeta
    };
  }

  return { compileJob };
}


async function compressImageBuffer(buffer, ext) {
  try {
    // Only compress supported image types
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      return buffer;
    }

    // Launch headless browser
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // Expose the buffer to the browser
    await page.exposeFunction("getInputBuffer", () => buffer);

    // Run your EXACT browser compressor inside headless Chrome
    const compressedArrayBuffer = await page.evaluate(async () => {
      const inputBuffer = await window.getInputBuffer();

      // Convert Node buffer → Blob
      const file = new Blob([inputBuffer], { type: "image/webp" });

      // Your EXACT online compression function
      async function compressImageTinyPNGStyle(file) {
        return new Promise((resolve) => {
          const img = new Image();

          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
              (blob) => resolve(blob || file),
              "image/webp",
              0.82
            );
          };

          img.onerror = () => resolve(file);
          img.src = URL.createObjectURL(file);
        });
      }

      const compressedBlob = await compressImageTinyPNGStyle(file);
      return await compressedBlob.arrayBuffer();
    });

    await browser.close();

    // Convert ArrayBuffer → Node Buffer
    return Buffer.from(compressedArrayBuffer);

  } catch (err) {
    console.warn("Compression failed, using raw buffer.", err);
    return buffer;
  }
}


function compressBinary(buffer) {
  try {
    return require("zlib").brotliCompressSync(buffer, {
      params: {
        [require("zlib").constants.BROTLI_PARAM_QUALITY]: 11
      }
    });
  } catch (err) {
    console.warn("Binary compression failed, using raw buffer.");
    return buffer;
  }
}

// ---------------------------------------------------------------------------
//  CLI ARGUMENTS
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const singleMode = args.includes("--single");

let singleFileName = null;
if (singleMode) {
  singleFileName = args.find(a => /\.(png|jpg|jpeg|webp|mp3)$/i.test(a));
}

// ---------------------------------------------------------------------------
//  MAIN EXECUTION — v51 upgrade
// ---------------------------------------------------------------------------

async function runPEXCooker() {
  console.log("⚡ PEX v51 • Starting deterministic per‑image binary surface (RAW)…");

  const formatManifest = JSON.parse(fs.readFileSync(FORMAT_MANIFEST, "utf8"));
  const runtimeManifest = JSON.parse(fs.readFileSync(RUNTIME_MANIFEST, "utf8"));

  const worker = CompilerWorker({
    Logger: {
      log: (...args) => console.log("[Worker]", ...args),
      error: (...args) => console.error("[Worker]", ...args),
      warn: (...args) => console.warn("[Worker]", ...args)
    }
  });

  const sharp = SharpExpression();
  const optimizer = OptimizeSurface();

  // -------------------------------------------------------------------------
  // Step 1 — Gather raw media
  // -------------------------------------------------------------------------

  let rawFiles = [];

  if (singleMode && singleFileName) {
    const fullPath = path.join(INPUT_DIR, singleFileName);

    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Single-file mode: File not found → ${fullPath}`);
      return;
    }

    console.log(`🎯 Single-file mode enabled → ${singleFileName}`);
    rawFiles = [fullPath];

  } else {
    rawFiles = fs.readdirSync(INPUT_DIR)
      .filter(f => /\.(png|jpg|jpeg|webp|mp3)$/i.test(f))
      .map(f => path.join(INPUT_DIR, f));

    console.log(`📦 Found ${rawFiles.length} raw media assets…`);
  }

  if (rawFiles.length === 0) {
    console.error("❌ No valid media files found to process.");
    return;
  }

  // -------------------------------------------------------------------------
  // Step 2 — Chunking
  // -------------------------------------------------------------------------

  console.log("🔧 Processing chunks via CompilerWorker…");
  const compileResponse = await worker.compileJob(rawFiles);

  const chunkArray = compileResponse.chunkSurface;

  if (!Array.isArray(chunkArray)) {
    console.error("❌ CompilerWorker returned invalid chunkSurface:", compileResponse);
    return;
  }

  // -------------------------------------------------------------------------
  // Step 3 — Expression mapping (Sharp)
// -------------------------------------------------------------------------

  console.log("🧠 Generating expression map via SharpExpression…");
  const expressionMap = await sharp.generate(chunkArray);

  // -------------------------------------------------------------------------
  // Step 4 — Optimize surface (Atlas + Binary Pack)
// -------------------------------------------------------------------------

  console.log("🚀 Optimizing binary+atlas surface via OptimizePEX…");
  const optimized = await optimizer.collapse({
    chunks: compileResponse,
    expressions: expressionMap
  });

  // -------------------------------------------------------------------------
  // Step 5 — Write core outputs (pack + atlas + manifest)
// -------------------------------------------------------------------------

  console.log("📁 Writing compressed PEX artifacts…");
  
  const manifestPath = path.join(OUTPUT_DIR, "pex.manifest.json");

  const compressedPack = compressBinary(optimized.binary);
  const compressedAtlas = await compressImageBuffer(optimized.atlas, ".webp");

  fs.writeFileSync(manifestPath, JSON.stringify(optimized.manifest, null, 2));

  const packOldKB = (optimized.binary.length / 1024).toFixed(1);
  const packNewKB = (compressedPack.length / 1024).toFixed(1);

  const atlasOldKB = (optimized.atlas.length / 1024).toFixed(1);
  const atlasNewKB = (compressedAtlas.length / 1024).toFixed(1);

  console.log(`   • pex.pack.bin — ${packOldKB}KB → ${packNewKB}KB`);
  console.log(`   • pex.atlas.webp.bin — ${atlasOldKB}KB → ${atlasNewKB}KB`);


  console.log("📁 Core PEX artifacts written.");

 // -------------------------------------------------------------------------
// Step 6 — v52 FEATURE: Write per‑image binary files (keep original extension)
// -------------------------------------------------------------------------

console.log("🧩 Writing per‑image binary files with compression (v52 EXTENDED)…");

for (const file of compileResponse.files) {
  const rawBuffer = fs.readFileSync(file.path);
  const ext = file.ext.toLowerCase();
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const safeName = baseName.replace(/[^\w.-]+/g, "_");

  // Compress image buffer
  const compressed = await compressImageBuffer(rawBuffer, ext);

  const outFile = path.join(OUTPUT_DIR, `${safeName}${ext}.pex`);
  fs.writeFileSync(outFile, compressed);

  const oldKB = (rawBuffer.length / 1024).toFixed(1);
  const newKB = (compressed.length / 1024).toFixed(1);
  const saved = (oldKB - newKB).toFixed(1);
  const percent = ((saved / oldKB) * 100).toFixed(1);

  console.log(`   • ${safeName}${ext}.pex — ${oldKB}KB → ${newKB}KB (${percent}% saved)`);
}


console.log("✅ Per‑image binary surface complete (v52).");
console.log("🎉 PEX v52 build complete!");

}

runPEXCooker().catch(err => {
  console.error("❌ PEX Cooker failed:", err);
});
