// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-DESIGN/translator-v17.js
// LAYER: THE ARCHITECT (v17 IMMORTAL Orchestrator + Genome Conductor)
// ============================================================================

// 1 — GENOME IDENTITY + SUBIMPORTS (MUST BE FIRST)

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 3 — ALL OTHER IMPORTS (AFTER IDENTITY)
import path from "path";
import { walkRepo } from "./PulseDesignRepoWalker.js";
import { writeManifest } from "./PulseDesignManifestWriter.js";
import { getPulseOrganismMapV32 } from "../../PULSE-WORLD-MAPORGANISM.js";

// Optional: specs + translators awareness (no imports here to avoid coupling)
// Architect only tags meta so downstream can plug in:
//   PULSE-SPECS/PulseSpecsDNAGenome-v30.js
//   PULSE-TRANSLATOR/PulseTranslatorRNAIntake-v30.js
//   PULSE-TRANSLATOR/PulseTranslatorRNAOutput-v30.js
//   PULSE-TRANSLATOR/PulseTranslatorSkeletalIntake.js
//   PULSE-TRANSLATOR/PulseTranslatorSkeletalOutput.js

// ============================================================================
// IN-PROCESS CACHE (v17 IMMORTAL — deterministic, per-cold-start only)
// ============================================================================
const architectCache = {
  lastRoot: null,
  lastFiles: null,
  lastOrganism: null,
  lastManifest: null
};

// ============================================================================
// buildPulseManifest(rootDir, options?)
// v17 IMMORTAL — dual-band, cache-aware, prewarm-aware orchestrator.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export async function buildPulseManifest(rootDir, options = {}) {
  if (!rootDir) {
    throw new Error("PulseDesign.Architect-v17: missing rootDir");
  }

  const {
    // If true, reuse prior scan for same absRoot within this cold start.
    enableCache = true,
    // If true, do not write manifest to disk; return in-memory only.
    dryRun = false,
    // Optional band tag for manifest ("symbolic" | "binary" | "dual").
    band = "dual",
    // Optional label for world-layer usage (e.g. "firebase", "sql", "hybrid").
    worldTarget = "hybrid",
    // Optional prewarm hint for downstream organs.
    prewarm = true
  } = options || {};

  const absRoot = path.resolve(rootDir);

  // --------------------------------------------------------------------------
  // CACHE CHECK — reuse classification + organism if same root in this process
  // --------------------------------------------------------------------------
  if (
    enableCache &&
    architectCache.lastRoot === absRoot &&
    architectCache.lastFiles &&
    architectCache.lastOrganism &&
    architectCache.lastManifest
  ) {
    const cached = architectCache.lastManifest;
    return {
      success: true,
      manifestPath: cached.manifestPath || null,
      fileCount: architectCache.lastFiles.length,
      organism: architectCache.lastOrganism,
      manifest: cached,
      meta: {
        architectVersion: "v17-IMMORTAL",
        cacheHit: true,
        band,
        worldTarget,
        dryRun,
        prewarm
      }
    };
  }

  // --------------------------------------------------------------------------
  // Step 1 — CARTOGRAPHER: Walk repo + classify files (signature-based)
  // --------------------------------------------------------------------------
  const classifiedFiles = walkRepo(absRoot);

  // --------------------------------------------------------------------------
  // Step 2 — GENOME ENGINE: Build organism map (v17+)
  // --------------------------------------------------------------------------
  const organism = getPulseOrganismMapV32(classifiedFiles, {
    band,
    worldTarget,
    architectVersion: "v17-IMMORTAL"
  });

  // --------------------------------------------------------------------------
  // Step 3 — ARCHITECT META + PREWARM HINTS
  // --------------------------------------------------------------------------
  const architectMeta = {
    architectVersion: "v17-IMMORTAL",
    band,
    worldTarget,
    prewarmHints: prewarm
      ? {
          // Downstream organs that can be prewarmed by consumers:
          //   - PulseSpecsDNAGenome-v17
          //   - PulseTranslatorRNAIntake / RNAOutput
          //   - PulseTranslatorSkeletalIntake / SkeletalOutput
          //   - PulseWorldFirebaseGenome / SQL genomes
          specsGenome: true,
          translators: {
            rnaIntake: true,
            rnaOutput: true,
            skeletalIntake: true,
            skeletalOutput: true
          },
          worldGenomes: {
            firebase: true,
            sql: true,
            hybrid: worldTarget === "hybrid"
          }
        }
      : null
  };

  // --------------------------------------------------------------------------
  // Step 4 — SURVEYOR: Build canonical manifest object
  // --------------------------------------------------------------------------
  const manifest = {
    generatedAt: new Date().toISOString(),
    root: absRoot,
    files: classifiedFiles,
    organism,
    band,
    worldTarget,
    architectMeta
  };

  let manifestPath = null;

  // Only delegate write if not dryRun
  if (!dryRun) {
    const result = writeManifest(absRoot, manifest);
    manifestPath = result.manifestPath || null;
  }

  // --------------------------------------------------------------------------
  // CACHE UPDATE — store for this cold start
  // --------------------------------------------------------------------------
  architectCache.lastRoot = absRoot;
  architectCache.lastFiles = classifiedFiles;
  architectCache.lastOrganism = organism;
  architectCache.lastManifest = {
    ...manifest,
    manifestPath
  };

  // --------------------------------------------------------------------------
  // FINAL RETURN — dual-band, world-ready
  // --------------------------------------------------------------------------
  return {
    success: true,
    manifestPath,
    fileCount: classifiedFiles.length,
    organism,
    manifest,
    meta: {
      architectVersion: "v17-IMMORTAL",
      cacheHit: false,
      band,
      worldTarget,
      dryRun,
      prewarm
    }
  };
}

// ============================================================================
// Convenience wrapper — symbolic-only manifest (legacy compatibility)
// ============================================================================
export async function buildSymbolicPulseManifest(rootDir, options = {}) {
  return buildPulseManifest(rootDir, {
    ...options,
    band: "symbolic"
  });
}

// ============================================================================
// Convenience wrapper — binary-leaning manifest (for binary-first tooling)
// ============================================================================
export async function buildBinaryPulseManifest(rootDir, options = {}) {
  return buildPulseManifest(rootDir, {
    ...options,
    band: "binary"
  });
}
