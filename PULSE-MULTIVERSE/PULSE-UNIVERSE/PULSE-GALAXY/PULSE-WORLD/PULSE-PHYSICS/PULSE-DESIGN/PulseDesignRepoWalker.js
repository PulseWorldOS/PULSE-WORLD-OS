// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-DESIGN/repoWalker-v17.js
// LAYER: THE CARTOGRAPHER (Terrain Explorer + Directory Mapper + Evolutionary Topographer)
// ============================================================================


// 3 — ALL OTHER IMPORTS (AFTER IDENTITY)
import fs from "fs";
import path from "path";
import { classifyFile } from "./PulseDesignFileClassifier.js"; // THE ANATOMIST

// ============================================================================
// IN-PROCESS CACHE (per cold start, deterministic reuse)
// ============================================================================
const cartographerCache = {
  lastRoot: null,
  lastOptionsKey: null,
  lastResults: null,
  lastMeta: null
};

// ============================================================================
// PUBLIC API — Cartographic Scan (Terrain Mapping, v17)
// ============================================================================
export function walkRepo(rootDir, options = {}) {
  if (!rootDir) {
    throw new Error("repoWalker-v17: missing rootDir");
  }

  const {
    band = "dual",
    worldTarget = "hybrid",
    enableCache = true,
    maxFileSizeBytes = 512 * 1024,
    includeExtensions = null,
    excludePatterns = null
  } = options || {};

  const absRoot = path.resolve(rootDir);
  const optionsKey = JSON.stringify({
    band,
    worldTarget,
    maxFileSizeBytes,
    includeExtensions: includeExtensions || null,
    excludePatterns: excludePatterns || null
  });

  // CACHE CHECK
  if (
    enableCache &&
    cartographerCache.lastRoot === absRoot &&
    cartographerCache.lastOptionsKey === optionsKey &&
    cartographerCache.lastResults &&
    cartographerCache.lastMeta
  ) {
    return {
      files: cartographerCache.lastResults,
      meta: {
        ...cartographerCache.lastMeta,
        cacheHit: true
      }
    };
  }

  const results = [];
  let fileCount = 0;
  let skippedBySize = 0;
  let skippedByFilter = 0;

  // DIRECTORY WALKER — Recursive Terrain Traversal (sorted, deterministic)
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (shouldSkipDir(entry.name)) continue;
        walk(fullPath);
      } else {
        const rel = path.relative(absRoot, fullPath);

        if (shouldSkipByPatterns(rel, excludePatterns)) {
          skippedByFilter++;
          continue;
        }

        if (!passesExtensionFilter(rel, includeExtensions)) {
          skippedByFilter++;
          continue;
        }

        const stat = safeStat(fullPath);
        if (stat && typeof stat.size === "number" && maxFileSizeBytes != null) {
          if (stat.size > maxFileSizeBytes) {
            skippedBySize++;
            continue;
          }
        }

        const content = safeRead(fullPath);
        const classification = classifyFile(rel, content, {
          band,
          worldTarget,
          size: stat.size ?? null,
          mtimeMs: stat.mtimeMs ?? null
        });

        results.push(classification);
        fileCount++;
      }
    }
  }

  walk(absRoot);

  const meta = {
    cartographerVersion: "v17-IMMORTAL",
    root: absRoot,
    band,
    worldTarget,
    fileCount,
    skippedBySize,
    skippedByFilter,
    cacheHit: false
  };

  // CACHE UPDATE
  cartographerCache.lastRoot = absRoot;
  cartographerCache.lastOptionsKey = optionsKey;
  cartographerCache.lastResults = results;
  cartographerCache.lastMeta = meta;

  return {
    files: results,
    meta
  };
}

// ============================================================================
// HELPERS
// ============================================================================
function shouldSkipDir(name) {
  return (
    name === "node_modules" ||
    name === ".next" ||
    name === "dist" ||
    name === "build" ||
    name === ".git" ||
    name === ".turbo" ||
    name === ".cache"
  );
}

function shouldSkipByPatterns(relPath, patterns) {
  if (!Array.isArray(patterns) || patterns.length === 0) return false;
  return patterns.some((p) => p && relPath.includes(p));
}

function passesExtensionFilter(relPath, includeExtensions) {
  if (!Array.isArray(includeExtensions) || includeExtensions.length === 0) {
    return true;
  }
  const ext = path.extname(relPath).toLowerCase();
  return includeExtensions.includes(ext);
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function safeStat(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}
