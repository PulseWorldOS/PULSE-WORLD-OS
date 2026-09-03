// ============================================================================
// FILE: /PulseOS/Scanner/PulseScannerCortex-v30.js
// PULSE OS — v30‑IMMORTAL
// EVOLUTIONARY SCANNER CORTEX — BINARY‑ONLY PRIMARY BAND + SYMBOLIC OVERLAYS
// ============================================================================
// ROLE (v30‑IMMORTAL):
//   - Organism’s evolutionary scanner cortex.
//   - ONE PRIMARY BAND: BINARY. Everything else is an overlay.
//   - Fuses binary pulses, harmonic drift, presence overlays, GPU symbolic heat,
//     CI stability, AdminInspector anomaly fields, and COMPILED EXTENSIONS.
//   - Produces adaptive layer sets for PageEvo‑v30‑IMMORTAL.
//   - Zero randomness. Zero timestamps. Zero mutation of inputs.
//   - NEW: Nullify → Build → Compile → Load → Signal Internet (ping Network tab).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

// ============================================================================
// IMPORTS — v30 IMMORTAL TOOLCHAIN
// ============================================================================
import { createBinaryWavePulse as createBinaryPulse } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";
import { createBinaryWaveScanner } from "./PulseToolsWaveScanner-v30.js";
import { createBinaryLoopScanner } from "./PulseToolsLoopScanner-v30.js";
import { createPulseAdminInspector } from "./PulseToolsAdminInspector-v30.js";
import { createPageEvo as PageEvo } from "./PulseToolsBinaryFramework-v30.js";

// ============================================================================
// GRID HELPERS (PURE, SYMBOLIC)
// ============================================================================
function createGrid(w, h) {
  return Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ({
      density: 0,
      contrast: 0,
      wave: 0,
      presence: 0,
      tags: []
    }))
  );
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function avgGridScalar(grid, key) {
  let sum = 0, count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      sum += grid[y][x][key] ?? 0;
      count++;
    }
  }
  return count ? sum / count : 0;
}

function snapshot(grid) {
  return grid.map(row =>
    row.map(c => ({
      density: c.density,
      contrast: c.contrast,
      wave: c.wave,
      presence: c.presence,
      tags: c.tags
    }))
  );
}


// ============================================================================
// COMPILED EXTENSIONS / PEX / MODULE SCAN HELPERS
// ============================================================================
function normalizeCompiledFileMeta(file) {
  if (!file) return null;

  const name = String(file.name || file.id || "unknown");
  const path = String(file.path || file.route || "");
  const size = typeof file.size === "number" ? file.size : 0;
  const type = String(file.type || file.kind || "unknown");
  const ext =
    typeof file.ext === "string"
      ? file.ext
      : (name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : "");

  const compiled = !!file.compiled;
  const errors = Array.isArray(file.errors) ? file.errors.slice() : [];
  const warnings = Array.isArray(file.warnings) ? file.warnings.slice() : [];

  return {
    name,
    path,
    size,
    type,
    ext,
    compiled,
    errors,
    warnings
  };
}

function summarizeCompiledFiles(files) {
  const list = files.map(normalizeCompiledFileMeta).filter(Boolean);
  const total = list.length;

  let compiledCount = 0;
  let errorCount = 0;
  let warningCount = 0;
  let totalSize = 0;

  const byExt = new Map();

  for (const f of list) {
    if (f.compiled) compiledCount++;
    if (f.errors.length) errorCount += f.errors.length;
    if (f.warnings.length) warningCount += f.warnings.length;
    totalSize += f.size;

    const key = f.ext || "none";
    if (!byExt.has(key)) {
      byExt.set(key, { count: 0, compiled: 0, size: 0 });
    }
    const bucket = byExt.get(key);
    bucket.count++;
    if (f.compiled) bucket.compiled++;
    bucket.size += f.size;
  }

  const extSummary = Array.from(byExt.entries()).map(([ext, stats]) => ({
    ext,
    count: stats.count,
    compiled: stats.compiled,
    size: stats.size
  }));

  const compiledRatio = total ? compiledCount / total : 0;
  const errorRatio = total ? errorCount / total : 0;
  const warningRatio = total ? warningCount / total : 0;

  const stabilityScore = clamp(
    1 -
      (errorRatio * 0.6 +
        warningRatio * 0.3 +
        (compiledRatio < 0.5 ? 0.1 : 0)),
    0,
    1
  );

  return {
    total,
    compiledCount,
    errorCount,
    warningCount,
    totalSize,
    compiledRatio,
    errorRatio,
    warningRatio,
    stabilityScore,
    byExt: extSummary,
    files: list
  };
}


// ============================================================================
// NULLIFY → BUILD/COMPILE/LOAD → SIGNAL INTERNET (NETWORK PING)
// ============================================================================

// Conceptual hooks: these are where you would integrate with your VFS / resolver
// to temporarily "nullify" internal resolution for a given file, then restore it.
// Here they are symbolic no-ops, but the sequence is REAL and the network ping is REAL.

function nullifyInternalSignalForFile(_fileMeta) {
  // Hook: temporarily disable internal/VFS resolution for this file if needed.
  // In your world-engine, this is where you'd flip the membrane to "external only".
}

function restoreInternalSignalForFile(_fileMeta) {
  // Hook: restore internal/VFS resolution for this file.
  // In your world-engine, this is where you'd flip the membrane back to "internal".
}

function buildExternalUrlFromFileMeta(fileMeta) {
  // You can adapt this to your actual public path layout.
  // For now: prefer explicit path, fall back to name.
  if (!fileMeta) return null;
  if (fileMeta.path && fileMeta.path.startsWith("/")) return fileMeta.path;
  if (fileMeta.path) return fileMeta.path;
  if (fileMeta.name && fileMeta.name.startsWith("/")) return fileMeta.name;
  return fileMeta.name || null;
}

function pingInternetForFile(fileMeta) {
  const url = buildExternalUrlFromFileMeta(fileMeta);
  if (!url) return;

  try {
    // REAL HTTP request → Network tab will see this as a GET.
    // cache: "no-store" so you can see it every time if you want.
    fetch(url, {
      method: "GET",
      cache: "no-store"
    }).catch(() => {});
  } catch {
    // ignore
  }
}

// Main orchestrator: NULLIFY → (build/compile/load already happened) → SIGNAL INTERNET → RESTORE
function notifyInternetOfCompiledFiles(compiledSummary) {
  if (!compiledSummary || !compiledSummary.files || !compiledSummary.files.length) return;

  for (const fileMeta of compiledSummary.files) {
    nullifyInternalSignalForFile(fileMeta);
    pingInternetForFile(fileMeta);
    restoreInternalSignalForFile(fileMeta);
  }
}

// PAGE-LEVEL REGISTRIES
PulseRealm.__PageSignals = PulseRealm.__PageSignals || {};
PulseRealm.__PageExports = PulseRealm.__PageExports || {};
PulseRealm.__PageReady   = PulseRealm.__PageReady   || {};

// --------------------------------------------------------------------------
// PAGE EXPORT → PAGE-LEVEL SIGNAL WRAPPER
// --------------------------------------------------------------------------
function registerPageExports(pageName, exportsObj = {}) {
  if (!pageName || typeof pageName !== "string") return;

  // raw exports for introspection / evolution
  PulseRealm.__PageExports[pageName] = exportsObj;

  // page-level signal: returns callable subfunctions/values
  PulseRealm.__PageSignals[pageName] = function pageSignal(payload) {
    const fns = PulseRealm.__PageExports[pageName] || {};
    const out = {};

    for (const key in fns) {
      const val = fns[key];
      if (typeof val === "function") {
        out[key] = (...args) => val(...args, payload);
      } else {
        out[key] = val;
      }
    }

    return out;
  };

  PulseRealm.__PageReady[pageName] = true;
}

// PUBLIC: USE A PAGE WITHOUT IMPORTING IT
export function usePage(pageName, payload) {
  const sig = PulseRealm.__PageSignals[pageName];
  if (!sig) {
    console.warn("[PulsePage] Page not registered:", pageName);
    return null;
  }
  return sig(payload);
}

// ============================================================================
// DYNAMIC SCAN — STATIC LINK + PAGE-SIGNAL GENERATOR (NO STATIC IMPORTS)
// ============================================================================
async function scanDynamicModules(moduleUrls = []) {
  if (!Array.isArray(moduleUrls) || !moduleUrls.length) {
    const emptySummary = summarizeCompiledFiles([]);
    notifyInternetOfCompiledFiles(emptySummary);
    return emptySummary;
  }

  const files = [];

  for (let i = 0; i < moduleUrls.length; i++) {
    const url = String(moduleUrls[i] || "").trim();
    if (!url) continue;

    const fileMeta = {
      name: url,
      path: url,
      size: 0,
      type: "module",
      ext: "js",
      compiled: true,
      errors: [],
      warnings: []
    };

    const next = moduleUrls[i + 1];
    if (next) {
      fileMeta.subimport = next; // static-like chain
    }

    // dynamic import to extract exports and wrap into page-level signal
    try {
      const mod = await import(url);
      const pageName = url.split("/").pop().replace(/\.m?js$/i, "");
      registerPageExports(pageName, mod);

      fileMeta.exports = Object.keys(mod);
      fileMeta.pageName = pageName;
    } catch (err) {
      fileMeta.errors.push(String((err && err.message) || err));
      fileMeta.compiled = false;
    }

    files.push(fileMeta);
  }

  const summary = summarizeCompiledFiles(files);
  notifyInternetOfCompiledFiles(summary);
  return summary;
}

// ============================================================================
// MAIN FACTORY — PULSE SCANNER CORTEX (v30‑IMMORTAL)
// ============================================================================
export function createPulseScannerCortex({
  trace = false,
  spins = 3
} = {}) {

  // -------------------------------------------------------------------------
  // CORE ORGANS (v30‑IMMORTAL)
  // -------------------------------------------------------------------------
  const pulse    = createBinaryPulse({ trace });
  const waveScan = createBinaryWaveScanner({ trace });
  const loopScan = createBinaryLoopScanner({ trace });
  const admin    = createPulseAdminInspector({ trace });
  const pageEvo  = PageEvo({ trace });

  // -------------------------------------------------------------------------
  // BASE GRIDS (v30)
  // -------------------------------------------------------------------------
  const bodyGrid = createGrid(32, 32);
  const homeGrid = createGrid(24, 24);
  const townGrid = createGrid(40, 40);
  const nodeGrid = createGrid(16, 16);

  // -------------------------------------------------------------------------
  // SPIN ENGINES (ONE-BAND BINARY EVOLUTION)
  // -------------------------------------------------------------------------
  const spinEngines = Array.from({ length: spins }, (_, i) => ({
    id: i,
    phaseOffset: (Math.PI * 2 * i) / spins,
    speed: 0.45 + i * 0.33,
    weight: 0.55 + i * 0.18
  }));

  // -------------------------------------------------------------------------
  // PRESENCE + HARMONICS STATE (SYMBOLIC ONLY)
  // -------------------------------------------------------------------------
  let presenceHistory = [];
  let harmonics = [];

  // COMPILED EXTENSIONS / PEX / MODULE STATE
  let compiledFilesState = [];

  function updatePresence(grid) {
    const p = avgGridScalar(grid, "presence");
    presenceHistory.push(p);
    if (presenceHistory.length > 64) presenceHistory.shift();
    return p;
  }

  function updateHarmonics(bits) {
    const ones = bits.reduce((a,b)=>a+b,0);
    const ratio = bits.length ? ones / bits.length : 0;

    const phaseDrift = Math.abs(Math.sin(ratio * Math.PI * 2));
    const cohesionScore = clamp(1 - phaseDrift, 0, 1);
    const amplitude = clamp(ratio, 0, 1);

    harmonics = [{ phaseDrift, cohesionScore, amplitude }];
    return { phaseDrift, cohesionScore, amplitude };
  }

  function deriveNodeEnergyView() {
    if (!harmonics.length) return { energy: 0.5, mood: "steady" };

    const h = harmonics[0];
    const energy = clamp(
      h.cohesionScore * 0.6 +
      (1 - Math.abs(h.phaseDrift)) * 0.25 +
      (h.amplitude ?? 0.5) * 0.15,
      0,
      1
    );

    const mood =
      energy > 0.85 ? "surge"   :
      energy > 0.65 ? "charged" :
      energy > 0.45 ? "active"  :
      energy > 0.25 ? "steady"  :
                      "calm";

    return { energy, mood };
  }

  // -------------------------------------------------------------------------
  // COMPILED EXTENSIONS / PEX LAYER ENGINE
  // -------------------------------------------------------------------------
  function buildCompiledExtensionsLayer(compiledSummary) {
    if (!compiledSummary || !compiledSummary.total) {
      return null;
    }

    const {
      total,
      compiledCount,
      errorCount,
      warningCount,
      totalSize,
      compiledRatio,
      errorRatio,
      warningRatio,
      stabilityScore,
      byExt
    } = compiledSummary;

    const mood =
      stabilityScore > 0.85 ? "stable"   :
      stabilityScore > 0.65 ? "healthy"  :
      stabilityScore > 0.45 ? "fragile"  :
      stabilityScore > 0.25 ? "critical" :
                              "failing";

    return {
      id: "compiled_extensions",
      type: "compiled_extensions",
      summary: {
        total,
        compiledCount,
        errorCount,
        warningCount,
        totalSize,
        compiledRatio,
        errorRatio,
        warningRatio,
        stabilityScore,
        byExt
      },
      presence: compiledRatio,
      harmonics: stabilityScore,
      anomalies: [],
      mood,
      weight: 0.9
    };
  }

  // -------------------------------------------------------------------------
  // ADAPTIVE LAYER ENGINE (v30‑IMMORTAL, BINARY‑PRIMARY)
// -------------------------------------------------------------------------
  function buildAdaptiveLayers({
    bodySnap,
    homeSnap,
    townSnap,
    nodeSnap,
    presenceAvg,
    harmonicDrift,
    coherenceScore,
    adminFlags,
    compiledSummary
  }) {
    const layers = [];

    const bodyDensityAvg  = avgGridScalar(bodySnap, "density");
    const bodyContrastAvg = avgGridScalar(bodySnap, "contrast");
    const bodyWaveAvg     = avgGridScalar(bodySnap, "wave");

    const nodeDensityAvg  = avgGridScalar(nodeSnap, "density");
    const nodeContrastAvg = avgGridScalar(nodeSnap, "contrast");
    const nodeWaveAvg     = avgGridScalar(nodeSnap, "wave");

    const homeDensityAvg  = avgGridScalar(homeSnap, "density");
    const homeContrastAvg = avgGridScalar(homeSnap, "contrast");
    const homeWaveAvg     = avgGridScalar(homeSnap, "wave");

    const townDensityAvg  = avgGridScalar(townSnap, "density");
    const townContrastAvg = avgGridScalar(townSnap, "contrast");
    const townWaveAvg     = avgGridScalar(townSnap, "wave");

    // BODY LAYER — always present
    layers.push({
      id: "body",
      type: "body",
      summary: {
        densityAvg: bodyDensityAvg,
        contrastAvg: bodyContrastAvg,
        waveAvg: bodyWaveAvg,
        presenceAvg
      },
      presence: presenceAvg,
      harmonics: coherenceScore,
      anomalies: adminFlags.filter(f => f.layer === "body"),
      mood: presenceAvg > 0.6 ? "focused" : "calm",
      weight: 1.0
    });

    // NODE LAYER — always present
    layers.push({
      id: "node",
      type: "node",
      summary: {
        densityAvg: nodeDensityAvg,
        contrastAvg: nodeContrastAvg,
        waveAvg: nodeWaveAvg
      },
      presence: presenceAvg,
      harmonics: coherenceScore,
      anomalies: adminFlags.filter(f => f.layer === "node"),
      mood: harmonicDrift > 0.4 ? "alert" : "steady",
      weight: 1.0
    });

    // HOME LAYER — adaptive
    if (presenceAvg > 0.15 || harmonicDrift > 0.15) {
      layers.push({
        id: "home",
        type: "home",
        summary: {
          densityAvg: homeDensityAvg,
          contrastAvg: homeContrastAvg,
          waveAvg: homeWaveAvg
        },
        presence: presenceAvg,
        harmonics: coherenceScore,
        anomalies: adminFlags.filter(f => f.layer === "home"),
        mood: "aware",
        weight: 0.8
      });
    }

    // TOWN LAYER — adaptive
    if (presenceAvg > 0.25 || harmonicDrift > 0.25) {
      layers.push({
        id: "town",
        type: "town",
        summary: {
          densityAvg: townDensityAvg,
          contrastAvg: townContrastAvg,
          waveAvg: townWaveAvg
        },
        presence: presenceAvg,
        harmonics: coherenceScore,
        anomalies: adminFlags.filter(f => f.layer === "town"),
        mood: "scanning",
        weight: 0.7
      });
    }

    // COMPILED EXTENSIONS LAYER
    const compiledLayer = buildCompiledExtensionsLayer(compiledSummary);
    if (compiledLayer) {
      layers.push(compiledLayer);
    }

    return layers;
  }

  // -------------------------------------------------------------------------
  // MAIN FRAME STEP (PURE EVOLUTIONARY SCAN)
// -------------------------------------------------------------------------
  function nextFrame({ gpuStats, compiledFiles } = {}) {
    if (Array.isArray(compiledFiles)) {
      compiledFilesState = compiledFiles.map(normalizeCompiledFileMeta).filter(Boolean);
    }

    const bits = pulse.nextPulseSlow();

    const { phaseDrift, cohesionScore, amplitude } = updateHarmonics(bits);
    const nodeEnergyView = deriveNodeEnergyView();

    const baseNumber = bits.reduce((a,b)=>a+b,0);
    const harmonicBias = phaseDrift;

    const presenceBiasBody = avgGridScalar(bodyGrid, "presence");

    for (const engine of spinEngines) {
      const spinPhase = baseNumber * engine.speed + engine.phaseOffset;

      stepLayer(bodyGrid, bits, spinPhase, engine.weight, {
        presenceBias: presenceBiasBody,
        harmonicBias,
        gpuStats
      });

      stepLayer(homeGrid, bits, spinPhase, engine.weight, {
        presenceBias: avgGridScalar(homeGrid, "presence"),
        harmonicBias,
        gpuStats
      });

      stepLayer(townGrid, bits, spinPhase, engine.weight, {
        presenceBias: avgGridScalar(townGrid, "presence"),
        harmonicBias,
        gpuStats
      });

      stepLayer(nodeGrid, bits, spinPhase, engine.weight, {
        presenceBias: avgGridScalar(nodeGrid, "presence"),
        harmonicBias,
        gpuStats
      });
    }

    const bodySnap = snapshot(bodyGrid);
    const homeSnap = snapshot(homeGrid);
    const townSnap = snapshot(townGrid);
    const nodeSnap = snapshot(nodeGrid);

    const presenceAvg = updatePresence(bodyGrid);

    const compiledSummary = summarizeCompiledFiles(compiledFilesState);

    // PING NETWORK TAB / INTERNET VISIBILITY
    notifyInternetOfCompiledFiles(compiledSummary);

    const adminFlags = admin.inspectAll({
      body: bodySnap,
      home: homeSnap,
      town: townSnap,
      node: nodeSnap,
      bits,
      spins: [],
      loopHistory: [],
      waveHistory: [],
      nodeEnergy: nodeEnergyView.energy,
      harmonics,
      presenceHistory,
      compiledSummary
    });

    const layers = buildAdaptiveLayers({
      bodySnap,
      homeSnap,
      townSnap,
      nodeSnap,
      presenceAvg,
      harmonicDrift: phaseDrift,
      coherenceScore: cohesionScore,
      adminFlags,
      compiledSummary
    });

    pageEvo.evolve({
      blocks: layers,
      loopIndex: baseNumber,
      wave: { phase: phaseDrift * Math.PI * 2, amplitude },
      flags: adminFlags,
      energy: nodeEnergyView.energy,
      presence: presenceAvg,
      compiledSummary
    });

    if (trace) {
      console.log("[PulseScannerCortex‑v30] frame", {
        presenceAvg,
        phaseDrift,
        cohesionScore,
        nodeEnergyView,
        layersCount: layers.length,
        flagsCount: adminFlags.length,
        compiledFiles: compiledSummary.total,
        compiledStability: compiledSummary.stabilityScore
      });
    }

    return {
      bits,
      presenceAvg,
      harmonics,
      nodeEnergyView,
      layers,
      adminFlags,
      compiledSummary
    };
  }

  // -------------------------------------------------------------------------
  // LAYER STEP (BINARY‑PRIMARY, SYMBOLIC OVERLAYS)
  // -------------------------------------------------------------------------
  function stepLayer(grid, bits, spinPhase, weight, {
    presenceBias = 0,
    harmonicBias = 0,
    gpuStats = null
  } = {}) {
    const H = grid.length;
    const W = grid[0].length;
    const gpuInfluence = gpuStats.loadFactor ?? 0;

    const loopIndex = loopScan.nextIndex(
      bits,
      Math.max(H, W),
      spinPhase,
      presenceBias,
      harmonicBias
    );

    const wave = waveScan.nextWave(bits, presenceBias, harmonicBias);

    const baseDensityDelta = 0.03 * weight;
    const baseContrastBlend = 0.3 * weight;

    const dualBandScale =
      0.5 +
      presenceBias * 0.3 +
      harmonicBias * 0.2 +
      gpuInfluence * 0.1;

    const densityDelta = baseDensityDelta * clamp(dualBandScale, 0.4, 1.4);
    const contrastBlend = baseContrastBlend * clamp(dualBandScale, 0.4, 1.4);

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const cell = grid[y][x];

        const phaseTerm = (wave.phase ?? 0) + spinPhase + (x + y) * 0.045;
        const baseContrast = Math.abs(Math.sin(phaseTerm));

        cell.density = clamp(cell.density * 0.9 + densityDelta, 0, 1);
        cell.contrast = clamp(
          cell.contrast * (1 - contrastBlend) + baseContrast * contrastBlend,
          0,
          1
        );
        cell.wave = wave.amplitude ?? wave.depth ?? 0;
        cell.presence = clamp(
          cell.presence * 0.85 + (wave.amplitude ?? 0) * 0.15,
          0,
          1
        );
      }
    }
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    nextFrame,

    registerCompiledFiles(files = []) {
      if (!Array.isArray(files)) return;
      compiledFilesState = files.map(normalizeCompiledFileMeta).filter(Boolean);
    },

    start(interval = 200) {
      setInterval(() => nextFrame(), interval);
    },

    snapshot() {
      return {
        body: snapshot(bodyGrid),
        home: snapshot(homeGrid),
        town: snapshot(townGrid),
        node: snapshot(nodeGrid),
        presenceHistory: [...presenceHistory],
        harmonics: [...harmonics],
        compiledSummary: summarizeCompiledFiles(compiledFilesState)
      };
    },

    // dynamic module scan hook → also builds page-level signals
    async dynamicScanModules(moduleUrls = []) {
      return scanDynamicModules(moduleUrls);
    }
  };
}

// ============================================================================
// ORGAN EXPORT (IMMORTAL)
// ============================================================================
export const PulseScannerCortex = Object.freeze({
  Meta: {
    version: "30.0-IMMORTAL",
    id: "PulseScannerCortex",
    role: "EVOLUTIONARY SCANNER CORTEX — BINARY PRIMARY BAND + COMPILED EXTENSIONS OVERLAY + INTERNET PING",
    notes: [
      "Binary-only primary band.",
      "Symbolic overlays: presence, harmonics, GPU, CI, AdminInspector.",
      "Scans compiled extensions / PEX / module outputs as a stability layer.",
      "Nullify → Signal Internet (real HTTP ping) → Restore internal resolution.",
      "Lets Network tab see new compilation files while keeping runtime internal.",
      "Feeds PageEvo‑v30‑IMMORTAL.",
      "Zero randomness, zero timestamps, zero mutation of inputs."
    ]
  },

  create(config = {}) {
    return createPulseScannerCortex(config);
  },

  // Extended scan: can accept compiledFiles AND dynamicModules
  async scan(context = {}) {
    const instance = createPulseScannerCortex({});

    if (Array.isArray(context.compiledFiles)) {
      instance.registerCompiledFiles(context.compiledFiles);
    }

    if (Array.isArray(context.dynamicModules) && context.dynamicModules.length) {
      await instance.dynamicScanModules(context.dynamicModules);
    }

    return instance.nextFrame(context);
  }
});

PulseRealm.ToolsEvolutionaryScanner = {
  PulseScannerCortex,
  createPulseScannerCortex,
  scanDynamicModules,
  summarizeCompiledFiles
}