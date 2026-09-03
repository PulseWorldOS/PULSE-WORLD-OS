// ============================================================================
// FILE: /PulseOS/PULSE-TOOLS/PulseMetadataScanner-v30.js
// PULSE OS — v30‑IMMORTAL
// SEVEN-LAYER METADATA ORGAN — BINARY-PRIMARY, ZERO-DRIFT, IMMORTAL-AWARE
// ============================================================================
// ROLE (v30‑IMMORTAL):
//   - Scan ALL .js files for 7-layer metablocks.
//   - Detect identity++, evo++, contract++, guarantees++, safety++,
//     drift++, and immortal++ layers.
//   - Zero randomness, zero timestamps, zero mutation of inputs.
//   - Pure symbolic scanning (no execution).
//   - Multi-instance identity aware.
//   - Drift-aware: detects missing, partial, or corrupted metablocks.
//   - Immortal-aware: detects lineage, epoch, version, and IMMORTAL markers.
//   - Damage Wizard v30: recommends fixes for each layer.
//   - Global organism health scoring.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import fs from "fs";
import path from "path";

// ============================================================================
// ROOT — one folder back, then scan forward
// ============================================================================
const ROOT = path.resolve(process.cwd(), "..");

// ============================================================================
// SEVEN-LAYER METABLOCK DEFINITIONS — v30 IMMORTAL
// ============================================================================
const LAYERS = {
  identity: [
    /AI_EXPERIENCE_META/i,
    /ORGAN:/i,
    /identity:/i,
    /organId:/i,
    /role:/i,
    /layer:/i,
    /epoch:/i,
    /version:/i,
    /lineage:/i,
    /Pulse[A-Za-z0-9]+Meta/i,
    /IMMORTAL/i,
    /v30/i
  ],

  evo: [
    /evo:\s*\{/i,
    /nodeAdmin/i,
    /networkBrain/i,
    /sentinelBrain/i,
    /presenceIntellect/i,
    /meshCastle/i,
    /routerBeacon/i,
    /advantageAware/i,
    /dualBand/i,
    /binaryAware/i,
    /waveFieldAware/i,
    /arteryAware/i,
    /packetAware/i,
    /windowAware/i,
    /multiInstanceIdentity/i,
    /spiralAware/i,
    /gpuAware/i,
    /timelineFlowAware/i,
    /multiSpin/i,
    /immortalAware/i
  ],

  contract: [
    /contract:\s*\{/i,
    /purpose:/i,
    /always:\s*\[/i,
    /never:\s*\[/i,
    /deterministic/i,
    /pureCompute/i,
    /zeroMutation/i,
    /zeroNetwork/i,
    /zeroFilesystem/i
  ],

  guarantees: [
    /guarantees:\s*\{/i,
    /deterministic/i,
    /driftProof/i,
    /zeroNetwork/i,
    /zeroFilesystem/i,
    /zeroMutation/i,
    /zeroRandomness/i,
    /pureCompute/i,
    /windowSafe/i,
    /IMMORTAL/i,
    /epoch:/i
  ],

  safety: [
    /safety:\s*\{/i,
    /Presence/i,
    /Harmonics/i,
    /DualBand/i,
    /Shifter/i,
    /Proxy/i,
    /Mesh/i,
    /Cortex/i,
    /PulseWorld/i,
    /PulseOS/i,
    /Advantage/i,
    /Binary/i,
    /Wave/i,
    /Sentinel/i,
    /Overmind/i
  ],

  drift: [
    /drift:/i,
    /driftProof/i,
    /zeroDrift/i,
    /IMMORTAL-DRIFT/i,
    /lineage:/i,
    /epoch:/i,
    /ancestry/i,
    /organDrift/i,
    /driftAware/i
  ],

  immortal: [
    /IMMORTAL/i,
    /IMMORTAL\+/i,
    /IMMORTAL-ADV/i,
    /IMMORTAL-EVO/i,
    /IMMORTAL-DRIFT/i,
    /epoch:\s*30/i,
    /version:\s*30/i,
    /lineage:/i,
    /immortalAware/i,
    /immortalCore/i
  ]
};

// Flatten patterns
const META_PATTERNS = Object.values(LAYERS).flat();

// ============================================================================
// SCAN A SINGLE FILE — v30 IMMORTAL
// ============================================================================
function scanFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");

  const layerHits = {};
  const rawMatches = [];

  for (const layer of Object.keys(LAYERS)) {
    layerHits[layer] = 0;
  }

  for (const layer of Object.keys(LAYERS)) {
    for (const pattern of LAYERS[layer]) {
      const match = text.match(pattern);
      if (match) {
        layerHits[layer]++;
        rawMatches.push({
          layer,
          pattern: pattern.toString(),
          match: match[1] || match[0]
        });
      }
    }
  }

  const layerScores = {};
  for (const layer of Object.keys(LAYERS)) {
    const found = layerHits[layer];
    const total = LAYERS[layer].length;
    const score = Math.round((found / total) * 100);
    layerScores[layer] = score;
  }

  const overall =
    Object.values(layerScores).reduce((a, b) => a + b, 0) /
    Object.keys(layerScores).length;

  const driftScore = Math.round(layerScores.drift * 0.5 + layerScores.identity * 0.5);
  const immortalScore = Math.round(layerScores.immortal * 0.7 + layerScores.identity * 0.3);

  return {
    rawMatches,
    layerScores,
    overallScore: Math.round(overall),
    driftScore,
    immortalScore
  };
}

// ============================================================================
// RECURSIVE WALK
// ============================================================================
function walk(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, results);
    } else if (entry.isFile() && full.endsWith(".js")) {
      const scan = scanFile(full);
      if (scan.rawMatches.length > 0) {
        results.push({
          file: full.replace(ROOT, "."),
          ...scan
        });
      }
    }
  }

  return results;
}

// ============================================================================
// FIX RECOMMENDATION ENGINE — v30 IMMORTAL
// ============================================================================
function recommendFixes(layerScores) {
  const fixes = [];

  for (const [layer, score] of Object.entries(layerScores)) {
    if (score === 100) continue;

    if (score === 0) {
      fixes.push(`❌ Missing entire ${layer} block — add full ${layer} metablock.`);
    } else if (score < 50) {
      fixes.push(`⚠️ ${layer} block incomplete (${score}%) — add missing required fields.`);
    } else {
      fixes.push(`🔧 ${layer} block partially complete (${score}%) — verify optional fields.`);
    }
  }

  return fixes;
}

// ============================================================================
// RUN SCAN — v30 IMMORTAL
// ============================================================================
const output = walk(ROOT);

const globalScore =
  output.reduce((a, f) => a + f.overallScore, 0) / (output.length || 1);

console.log("=== Pulse Metadata Scan (v30‑IMMORTAL, 7‑Layer Metablock Scanner + Damage Wizard) ===");
console.log(`\nGLOBAL ORGANISM COMPLETENESS: ${globalScore.toFixed(1)}%`);
console.log("=====================================================================");

output.forEach((item) => {
  console.log(`\nFILE: ${item.file}`);
  console.log(`  → Overall completeness: ${item.overallScore}%`);
  console.log(`  → Drift score: ${item.driftScore}%`);
  console.log(`  → Immortal score: ${item.immortalScore}%`);

  console.log("  → Layer scores:");
  for (const [layer, score] of Object.entries(item.layerScores)) {
    console.log(`      ${layer.padEnd(12)} : ${score}%`);
  }

  const fixes = recommendFixes(item.layerScores);
  if (fixes.length > 0) {
    console.log("  → Recommended fixes:");
    fixes.forEach((f) => console.log(`      ${f}`));
  }

  console.log("  → Raw matches:");
  item.rawMatches.forEach((m) => {
    console.log(`      [${m.layer}] ${m.match}`);
  });
});
