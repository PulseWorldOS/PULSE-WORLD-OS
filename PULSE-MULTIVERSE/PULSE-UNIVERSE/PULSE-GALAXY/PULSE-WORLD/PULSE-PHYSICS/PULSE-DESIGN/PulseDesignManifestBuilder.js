// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-DESIGN/manifestBuilder-v17.js
// LAYER: THE ARCHIVIST (System Historian + Canonical Recorder + Genome Builder)
// ============================================================================


// 3 — ALL OTHER IMPORTS (AFTER IDENTITY)
import path from "path";
import { walkRepo } from "./PulseDesignRepoWalker.js";      // THE CARTOGRAPHER
import { classifyFile } from "./PulseDesignFileClassifier.js"; // THE ANATOMIST

// ============================================================================
// PUBLIC API — Build Canonical Architecture Manifest (v17 IMMORTAL)
// ============================================================================
export async function buildManifest(rootDir, options = {}) {
  if (!rootDir) {
    throw new Error("Archivist-v17: missing rootDir");
  }

  const {
    band = "dual",
    worldTarget = "hybrid",
    includeExtensions = null,
    excludePatterns = null,
    maxFileSizeBytes = 512 * 1024,
    enableCache = true
  } = options || {};

  // Step 1 — CARTOGRAPHER
  const { files: fileSignatures, meta: cartographerMeta } = walkRepo(rootDir, {
    band,
    worldTarget,
    includeExtensions,
    excludePatterns,
    maxFileSizeBytes,
    enableCache
  });

  // Step 2 — ARCHIVIST
  const manifest = {
    version: "v17-IMMORTAL",
    generatedAt: new Date().toISOString(),
    root: path.resolve(rootDir),

    band,
    worldTarget,
    cartographerMeta,

    files: [],
    classifications: [],
    organs: [],
    layers: [],
    patterns: [],
    signals: [],
    bands: [],
    dataSources: [],
    drift: [],
    lineage: [],
    routing: [],

    pages: [],
    components: [],
    layouts: [],
    apis: [],
    pulseband: [],
    healingHooks: []
  };

  // Step 3 — ANATOMIST
  for (const sig of fileSignatures) {
    const relPath = sig.path || sig.filePath || sig.rel || "";

    const fileInfo = classifyFile(relPath, sig.content, {
      band,
      worldTarget,
      size: sig.size,
      mtimeMs: sig.mtimeMs
    });

    manifest.files.push(fileInfo);
    manifest.classifications.push(fileInfo.classification);

    manifest.organs.push({
      path: fileInfo.path,
      type: fileInfo.type,
      hints: fileInfo.classification.organHints,
      pattern: fileInfo.classification.patternId,
      confidence: fileInfo.classification.confidence
    });

    manifest.patterns.push({
      file: fileInfo.path,
      pattern: fileInfo.classification.patternId
    });

    manifest.bands.push({
      file: fileInfo.path,
      pulseBand: fileInfo.usesPulseBand,
      healing: fileInfo.usesHealing
    });

    manifest.signals.push({
      file: fileInfo.path,
      firestore: fileInfo.signals.firestore,
      sql: fileInfo.signals.sql,
      pulseFields: fileInfo.signals.pulseFields
    });

    if (fileInfo.dataSources.length > 0) {
      manifest.dataSources.push({
        file: fileInfo.path,
        sources: fileInfo.dataSources
      });
    }

    if (fileInfo.type === "page") manifest.pages.push(fileInfo);
    if (fileInfo.type === "component") manifest.components.push(fileInfo);
    if (fileInfo.type === "layout") manifest.layouts.push(fileInfo);
    if (fileInfo.type === "api") manifest.apis.push(fileInfo);

    if (fileInfo.usesPulseBand) manifest.pulseband.push(fileInfo);
    if (fileInfo.usesHealing) manifest.healingHooks.push(fileInfo);
  }

  // Step 4 — Deterministic ordering
  manifest.files.sort((a, b) => a.path.localeCompare(b.path));
  manifest.classifications.sort((a, b) =>
    (a.patternId || "").localeCompare(b.patternId || "")
  );
  manifest.organs.sort((a, b) => a.path.localeCompare(b.path));
  manifest.patterns.sort((a, b) => a.file.localeCompare(b.file));
  manifest.bands.sort((a, b) => a.file.localeCompare(b.file));
  manifest.signals.sort((a, b) => a.file.localeCompare(b.file));
  manifest.dataSources.sort((a, b) => a.file.localeCompare(b.file));

  // Step 5 — Return canonical manifest
  return {
    success: true,
    fileCount: manifest.files.length,
    manifest
  };
}
