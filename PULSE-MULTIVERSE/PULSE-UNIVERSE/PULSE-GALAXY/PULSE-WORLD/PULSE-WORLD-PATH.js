/**
 * PULSEWORLD PATH ORGAN v40 — IMMORTAL OCD EDITION
 * --------------------------------------------------
 * The file‑based OS spine of the organism.
 *
 *  • Cosmic‑aware (MULTIVERSE → UNIVERSE → GALAXY → WORLD)
 *  • Organ‑aware (BOOT / TECH / PROOF / EVOLUTION / CONFIG)
 *  • OCD‑aware (EVOLVED vs EVOLVING vs DOCUMENT)
 *  • Architecture‑aware (natural language → path)
 *  • Organism‑aware (system → folder)
 *  • Evolution‑aware (version scanning)
 *  • World‑aware (PulseWorld fallback)
 *  • File‑based (all FS access goes through here)
 */

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PULSE_ORGANISM_MAP_V32 } from "./PULSE-WORLD-MAPORGANISM.js";
import { resolveEvolutionFilePath } from "../PULSE-WORLD/PULSE-PHYSICS/PULSE-PROTOCOL/PULSE-PROTOCOL-PULSE.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


console.log(
  "🗄️ PULSE CACHE/DB SYSTEM v40 - %c[PulsePath] FileSystem Spine of the Organism Accessed!",
  "color:#E6AF5C; font-weight:bold; font-family:monospace;"
);

// ---------------------------------------------------------------------------
// PURE FS + PATH (VIRTUAL FILESYSTEM)
// ---------------------------------------------------------------------------
const __files = {};

export const fs = {
  statSync(p) {
    if (!__files[p]) throw new Error("ENOENT");
    return {
      size: __files[p].length,
      modified: PulseRealm.PulseNOW,
      isFile: () => true,
      isDirectory: () => false
    };
  },

  existsSync(p) {
    return Object.prototype.hasOwnProperty.call(__files, p);
  },

  readFileSync(p) {
    if (!__files[p]) throw new Error("ENOENT");
    return __files[p];
  },

  writeFileSync(p, data) {
    __files[p] = String(data);
    return true;
  },

  mkdirSync(p) {
    return true;
  },

  readdirSync(prefix = "/") {
    return Object.keys(__files).filter(k => k.startsWith(prefix));
  }
};

// ---------------------------------------------------------------------------
// PATH PRIMITIVES
// ---------------------------------------------------------------------------
export const path = {
  join: (...parts) =>
    parts.filter(Boolean).join("/").replace(/\/+/g, "/"),

  resolve: (...parts) => {
    let full = parts.filter(Boolean).join("/").replace(/\/+/g, "/");
    const isAbs = full.startsWith("/");
    const segments = full.split("/");
    const resolved = [];

    for (const seg of segments) {
      if (!seg || seg === ".") continue;
      if (seg === "..") {
        resolved.pop();
        continue;
      }
      resolved.push(seg);
    }

    const out = (isAbs ? "/" : "") + resolved.join("/");
    return out.replace(/\/+/g, "/") || "/";
  },

  dirname: (p) => {
    const i = p.lastIndexOf("/");
    return i > 0 ? p.slice(0, i) : "/";
  },

  basename: (p) => {
    const i = p.lastIndexOf("/");
    return i >= 0 ? p.slice(i + 1) : p;
  },

  extname: (p) => {
    const i = p.lastIndexOf(".");
    return i >= 0 ? p.slice(i) : "";
  },

  normalize: (p) => String(p).replace(/\/+/g, "/"),

  isAbsolute: (p) => p.startsWith("/"),

  exists: (p) => {
    if (!p || typeof p !== "string") return false;
    const clean = p.replace(/\/+/g, "/");

    // 1) Page registry
    try {
      if (PulseRealm.PulseBarrierRoute && PulseRealm.PulseBarrierRoute[clean]) return true;
    } catch {}

    // 2) Organism map pages
    try {
      const map = PulseRealm.PulseOrganismMap || null;
      if (map.systems.UI.pages) {
        if (map.systems.UI.pages[clean]) return true;
        if (map.systems.UI.pages[path.basename(clean)]) return true;
      }
    } catch {}

    // 3) Virtual files
    try {
      if (PulseRealm.PulseRuntime.virtualFiles[clean]) return true;
    } catch {}

    // 4) Chunk registry
    try {
      const reg = PulseRealm.PulseChunks.registry;
      if (reg.has(clean) || reg.has(path.basename(clean))) return true;
    } catch {}

    // 5) World registry
    try {
      if (PulseRealm.PulseWorld.registry[clean]) return true;
    } catch {}

    // 6) Virtual FS
    return fs.existsSync(clean);
  }
};

// ---------------------------------------------------------------------------
// INTERNAL HELPERS
// ---------------------------------------------------------------------------
function safeStat(p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}

function logError(msg, ...rest) {
  console.error("[PulseWorldPath:v40]", msg, ...rest);
}

// ---------------------------------------------------------------------------
// COSMIC ROOTS
// ---------------------------------------------------------------------------
function resolveProcessRoot() {
  return path.resolve("/");
}

function resolvePulseRoot() {
  return resolveProcessRoot();
}

function resolveMultiverseRoot() {
  return path.join(resolvePulseRoot(), "PULSE-MULTIVERSE");
}

function resolveUniverseRoot() {
  return path.join(resolveMultiverseRoot(), "PULSE-UNIVERSE");
}

function resolveGalaxyRoot() {
  return path.join(resolveUniverseRoot(), "PULSE-GALAXY");
}

function resolveWorldRoot() {
  return path.join(resolveGalaxyRoot(), "PULSE-WORLD");
}

function resolveTechRoot() {
  return path.join(resolveWorldRoot(), "PULSE-PHYSICS");
}

// ---------------------------------------------------------------------------
// ORGANISM MAP + ARCHITECTURE GENOME
// ---------------------------------------------------------------------------
function getOrganismMap() {
  try {
    return PULSE_ORGANISM_MAP_V32();
  } catch (err) {
    logError("getOrganismMap failed", err);
    return null;
  }
}

function getArchitectureGenome() {
  const map = getOrganismMap();
  return map.architecture || null;
}

function getNaturalLanguageMapping() {
  return getArchitectureGenome().naturalLanguageMapping || {};
}

// ---------------------------------------------------------------------------
// ARCHITECTURE RESOLUTION (NATURAL LANGUAGE → PATH)
// ---------------------------------------------------------------------------
function resolveArchitecturePath(naturalKey, systemNameFallback) {
  const key = String(naturalKey || "").toLowerCase();
  const mapping = getNaturalLanguageMapping();

  let mapped = mapping[key];

  if (!mapped && key === "*") mapped = mapping["*"];

  if (!mapped && systemNameFallback) {
    const wildcard = mapping["*"];
    if (wildcard) {
      mapped = wildcard.replace("${SYSTEM}", systemNameFallback.toUpperCase());
    }
  }

  if (!mapped) return null;

  const segments = mapped.split("/").filter(Boolean);
  return path.join(resolvePulseRoot(), ...segments);
}

// ---------------------------------------------------------------------------
// WORLD / UNIVERSE / GALAXY RESOLUTION
// ---------------------------------------------------------------------------
function resolveWorldFolder(worldId) {
  const map = getOrganismMap();
  if (!map) return resolveWorldRoot();

  const world = map.getWorld(worldId);
  const p = world.meta.path;
  return p ? (path.isAbsolute(p) ? p : path.join(resolvePulseRoot(), p)) : resolveWorldRoot();
}

function resolveUniverseFolder(universeId) {
  const map = getOrganismMap();
  if (!map) return resolveUniverseRoot();

  const uni = map.getUniverse(universeId);
  const p = uni.meta.path;
  return p ? (path.isAbsolute(p) ? p : path.join(resolvePulseRoot(), p)) : resolveUniverseRoot();
}

function resolveGalaxyFolder(galaxyId) {
  const map = getOrganismMap();
  if (!map) return resolveGalaxyRoot();

  const gal = map.getGalaxy(galaxyId);
  const p = gal.meta.path;
  return p ? (path.isAbsolute(p) ? p : path.join(resolvePulseRoot(), p)) : resolveGalaxyRoot();
}

/**
 * classifySystemName — IMMORTAL OCD v40
 * ---------------------------------------------------------
 * Returns the cosmic layer + organ kind for any system name.
 * Fully aligned with:
 *  • Cosmic hierarchy
 *  • BOOT / TECH / PROOF / EVOLUTION / CONFIG
 *  • UI worlds
 *  • Backups
 *  • Bands
 *  • Satellite / orbital
 *  • Evolved vs evolving naming
 *  • PascalCase-vNN evolutionary organs
 */
export function classifySystemName(name) {
  const n = String(name || "").toLowerCase();

  // -------------------------------------------------------
  // 1. COSMIC LAYERS
  // -------------------------------------------------------
  const COSMIC = {
    "pulse-multiverse":      { layer: "multiverse",  kind: "multiversal" },
    "pulse-multiversal":     { layer: "multiverse",  kind: "multiversal" },

    "pulse-universe":        { layer: "universe",    kind: "universal" },
    "pulse-universal":       { layer: "universe",    kind: "universal" },

    "pulse-galaxy":          { layer: "galaxy",      kind: "galactic" },
    "pulse-galactic":        { layer: "galaxy",      kind: "galactic" },
    "pulse-galactic-aws":    { layer: "galaxy",      kind: "aws-galaxy" },

    "pulse-world":           { layer: "world",       kind: "world" }
  };
  if (COSMIC[n]) return COSMIC[n];

  // -------------------------------------------------------
  // 2. WORLD ROOT ORGANS
  // -------------------------------------------------------
  const WORLD = {
    "pulse-world-map":       { layer: "world",       kind: "map" },
    "pulse-world-server":    { layer: "world",       kind: "server" },
    "pulse-world-path":      { layer: "world",       kind: "path" },
    "pulse-world-usercache": { layer: "world",       kind: "usercache" },
    "pulse-world-domain":    { layer: "world",       kind: "domain" }
  };
  if (WORLD[n]) return WORLD[n];

  // -------------------------------------------------------
  // 3. BOOT ORGANISM
  // -------------------------------------------------------
  const BOOT = {
    "pulse-boot":            { layer: "boot",        kind: "boot" },
    "pulse-boot-bridge":     { layer: "boot",        kind: "bridge" },
    "pulse-boot-compiler":   { layer: "boot",        kind: "compiler" },
    "pulse-boot-evo":        { layer: "boot",        kind: "evo" },
    "pulse-boot-portal":     { layer: "boot",        kind: "portal" },
    "pulse-boot-runtime":    { layer: "boot",        kind: "runtime" },
    "pulse-boot-scanner":    { layer: "boot",        kind: "scanner" },
    "pulse-boot-world":      { layer: "boot",        kind: "world-loader" }
  };
  if (BOOT[n]) return BOOT[n];

  // -------------------------------------------------------
  // 4. PROOF ORGANISM (FINAL)
  // -------------------------------------------------------
  const PROOF = {
    "pulse-proof":           { layer: "proof",       kind: "proof" },
    "pulse-proof-gpu":       { layer: "proof",       kind: "gpu-proof" },
    "pulse-proof-logger":    { layer: "proof",       kind: "logger" },
    "pulse-proof-flow":      { layer: "proof",       kind: "flow" },
    "pulse-proof-errors":    { layer: "proof",       kind: "errors" },
    "pulse-proof-monitor":   { layer: "proof",       kind: "monitor" },
    "pulse-proof-reflex":    { layer: "proof",       kind: "reflex" },
    "pulse-proof-shadow":    { layer: "proof",       kind: "shadow" }
  };
  if (PROOF[n]) return PROOF[n];

  // -------------------------------------------------------
  // 5. CREATION BARRIER ORGANISM (FINAL)
  // -------------------------------------------------------
  const BARRIER = {
    "pulse-boot-barrier":    { layer: "creation",    kind: "barrier" },
    "pulse-boot-creation":   { layer: "creation",    kind: "creation" },
    "pulse-boot-route":      { layer: "creation",    kind: "route" }
  };
  if (BARRIER[n]) return BARRIER[n];

  // -------------------------------------------------------
  // 6. EVOLUTIONARY ORGANISM (PascalCase-vNN)
  // -------------------------------------------------------
  if (/pulseevolutionary/.test(n)) {
    return { layer: "evolution", kind: "evolutionary" };
  }

  // -------------------------------------------------------
  // 7. TECH ORGANISM
  // -------------------------------------------------------
  const TECH = {
    "pulse-gpu":             { layer: "gpu",         kind: "gpu" },
    "pulse-ai":              { layer: "ai",          kind: "ai" },
    "pulse-send":            { layer: "send",        kind: "send" },
    "pulse-engine":          { layer: "engine",      kind: "engine" },
    "pulse-mesh":            { layer: "mesh",        kind: "mesh" },
    "pulse-grid":            { layer: "grid",        kind: "grid" },
    "pulse-os":              { layer: "os",          kind: "os" },
    "pulse-protocol":        { layer: "protocol",    kind: "protocol" },
    "pulse-trust":           { layer: "trust",       kind: "trust" },
    "pulse-regioning":       { layer: "regioning",   kind: "regioning" },
    "pulse-router":          { layer: "router",      kind: "router" },
    "pulse-tools":           { layer: "tools",       kind: "tools" },
    "pulse-translator":      { layer: "translator",  kind: "translator" },
    "pulse-band":            { layer: "band",        kind: "band" },
    "pulse-band-mesh":       { layer: "band",        kind: "mesh-band" },
    "pulse-band-orbital":    { layer: "band",        kind: "orbital-band" },
    "pulse-shifter":         { layer: "shifter",     kind: "shifter" },
    "pulse-core":            { layer: "core",        kind: "core" },
    "pulse-corememory":      { layer: "core",        kind: "corememory" },
    "pulse-specs":           { layer: "specs",       kind: "specs" },
    "pulse-code":            { layer: "specs",       kind: "code" },
    "pulse-earn":            { layer: "earn",        kind: "earn" },
    "pulse-expansion":       { layer: "expansion",   kind: "expansion" },
    "pulse-finality":        { layer: "finality",    kind: "finality" }
  };
  if (TECH[n]) return TECH[n];

  // -------------------------------------------------------
  // 8. UI ORGANISM
  // -------------------------------------------------------
  const UI = {
    "pulseadmin":            { layer: "ui",          kind: "admin" },
    "pulsedelivery":         { layer: "ui",          kind: "delivery" },
    "pulsedirectory":        { layer: "ui",          kind: "directory" },
    "pulserewards":          { layer: "ui",          kind: "rewards" },
    "pulseconfig":           { layer: "ui",          kind: "config" }
  };
  if (UI[n]) return UI[n];

  // -------------------------------------------------------
  // 9. BACKUPS
  // -------------------------------------------------------
  const BACKUP = {
    "pulseworld-netlify":    { layer: "backup",      kind: "netlify" },
    "pulseworld-firebase":   { layer: "backup",      kind: "firebase" }
  };
  if (BACKUP[n]) return BACKUP[n];

  // -------------------------------------------------------
  // 10. ORBITAL / SATELLITE / GROUND
  // -------------------------------------------------------
  const ORBITAL = {
    "pulse-satellite":       { layer: "orbital",     kind: "satellite" },
    "pulse-ground":          { layer: "ground",      kind: "groundstation" }
  };
  if (ORBITAL[n]) return ORBITAL[n];

  // -------------------------------------------------------
  // 11. DEFAULT
  // -------------------------------------------------------
  return { layer: "generic", kind: "system" };
}

/**
 * resolveSystemFolderFromKey — IMMORTAL OCD v40
 * ---------------------------------------------------------
 * Resolves a system key (gpu, ai, router, band, etc.)
 * into a fully qualified filesystem folder path.
 *
 *  • Uses classifier v40
 *  • Uses cosmic hierarchy
 *  • Uses organ structure
 *  • Uses OCD naming law
 *  • Uses organism map overrides
 *  • Uses world fallback
 *  • Uses cosmic fallback
 */

function resolveSystemFolderFromKey(sysKey) {
  if (!sysKey) return resolveTechRoot();

  const key = String(sysKey).toLowerCase();
  const classifier = classifySystemName(key);

  // ---------------------------------------------------------
  // 1. ORGANISM MAP OVERRIDE (HIGHEST PRIORITY)
  // ---------------------------------------------------------
  try {
    const map = getOrganismMap();
    if (map.getSystem) {
      const sysMeta = map.getSystem(key);
      if (sysMeta.folderPath) {
        const p = sysMeta.folderPath;
        const resolved = path.isAbsolute(p)
          ? p
          : path.join(resolvePulseRoot(), p);

        if (fs.existsSync(resolved)) {
          return resolved;
        }
      }
    }
  } catch {}

  // ---------------------------------------------------------
  // 2. COSMIC LAYER RESOLUTION
  // ---------------------------------------------------------
  let cosmicRoot = resolveTechRoot(); // default

  switch (classifier.layer) {
    case "multiverse":
      cosmicRoot = resolveMultiverseRoot();
      break;
    case "universe":
      cosmicRoot = resolveUniverseRoot();
      break;
    case "galaxy":
      cosmicRoot = resolveGalaxyRoot();
      break;
    case "world":
      cosmicRoot = resolveWorldRoot();
      break;
    case "backend":
    case "band":
    case "gpu":
    case "ai":
    case "router":
    case "engine":
    case "mesh":
    case "grid":
    case "os":
    case "protocol":
    case "trust":
    case "regioning":
    case "tools":
    case "translator":
    case "send":
    case "shifter":
    case "core":
    case "specs":
      cosmicRoot = resolveTechRoot();
      break;
    case "boot":
    case "proof":
    case "creation":
    case "evolution":
    case "config":
      cosmicRoot = path.join(resolveWorldRoot(), "PULSE-BOOT");
      break;
    case "ui":
      cosmicRoot = path.join(resolveWorldRoot(), "PULSE-BOOT");
      break;
    default:
      cosmicRoot = resolveTechRoot();
  }

  // ---------------------------------------------------------
  // 3. OCD FOLDER NAME GENERATION
  // ---------------------------------------------------------
  // EVOLVED ORGAN FOLDER (ALL CAPS)
  const evolvedFolder = key.toUpperCase().replace(/[^A-Z0-9\-]/g, "-");

  // EVOLVING ORGAN FOLDER (PascalCase)
  const pascal = key
    .split(/[^a-z0-9]/gi)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  // Candidate folders:
  const candidates = [
    path.join(cosmicRoot, evolvedFolder),      // PULSE-GPU
    path.join(cosmicRoot, pascal),             // PulseGpu
    path.join(resolveTechRoot(), evolvedFolder), // fallback to TECH
    path.join(resolveWorldRoot(), evolvedFolder), // fallback to WORLD
  ];

  // ---------------------------------------------------------
  // 4. FOLDER-FIRST RESOLUTION
  // ---------------------------------------------------------
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }

  // ---------------------------------------------------------
  // 5. WORLD FALLBACK (PulseWorldSomething)
  // ---------------------------------------------------------
  const worldFallback = path.join(
    resolveWorldRoot(),
    `PULSE-WORLD-${evolvedFolder}`
  );

  if (fs.existsSync(worldFallback)) {
    return worldFallback;
  }

  // ---------------------------------------------------------
  // 6. COSMIC FALLBACK (MULTIVERSE → UNIVERSE → GALAXY → WORLD)
  // ---------------------------------------------------------
  const cosmicFallbacks = [
    path.join(resolveMultiverseRoot(), evolvedFolder),
    path.join(resolveUniverseRoot(), evolvedFolder),
    path.join(resolveGalaxyRoot(), evolvedFolder),
    path.join(resolveWorldRoot(), evolvedFolder)
  ];

  for (const c of cosmicFallbacks) {
    if (fs.existsSync(c)) {
      return c;
    }
  }

  // ---------------------------------------------------------
  // 7. FINAL DEFAULT (TECH ROOT)
  // ---------------------------------------------------------
  return path.join(resolveTechRoot(), evolvedFolder);
}

// ---------------------------------------------------------------------------
// PUBLIC PATH ORGAN
// ---------------------------------------------------------------------------
export const PulseWorldPath = {
  // BASIC HELPERS
  join: (...s) => path.join(...s),
  resolve: (...s) => path.resolve(...s),
  dirname: (p) => path.dirname(p),
  basename: (p) => path.basename(p),
  ext: (p) => path.extname(p),
  normalize: (p) => path.normalize(p),

  // FILE CHECKS
  exists: (p) => path.exists(p),
  isFile: (p) => !!safeStat(p).isFile(),
  isDir: (p) => !!safeStat(p).isDirectory(),

  // READ/WRITE
  readFile: (p, enc = "utf8") => {
    try {
      return fs.readFileSync(resolveEvolutionFilePath(p), enc);
    } catch (err) {
      logError("readFile failed:", p, err);
      return null;
    }
  },

  writeFile: (p, data) => {
    try {
      fs.writeFileSync(resolveEvolutionFilePath(p), data);
      return true;
    } catch (err) {
      logError("writeFile failed:", p, err);
      return false;
    }
  },

  // DIRECTORY
  ensureDir: (p) => {
    try {
      if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
      return true;
    } catch (err) {
      logError("ensureDir failed:", p, err);
      return false;
    }
  },

  listDir: (p) => {
    try {
      return fs.readdirSync(p);
    } catch (err) {
      logError("listDir failed:", p, err);
      return [];
    }
  },
  

  // ROOTS
  processRoot: () => resolveProcessRoot(),
  pulseRoot: () => resolvePulseRoot(),
  multiverseRoot: () => resolveMultiverseRoot(),
  universeRoot: () => resolveUniverseRoot(),
  galaxyRoot: () => resolveGalaxyRoot(),
  worldRoot: () => resolveWorldRoot(),
  techRoot: () => resolveTechRoot(),
  dataRoot: () => path.resolve(resolvePulseRoot(), "PULSE-DATA"),
  logsRoot: () => path.resolve(resolvePulseRoot(), "PULSE-LOGS"),

  // ORGANISM / ARCHITECTURE
  resolveSystemFolder: (k) => resolveSystemFolderFromKey(k),
  resolveArchitecturePath: (k, f) => resolveArchitecturePath(k, f),
  resolveWorldFolder: (id) => resolveWorldFolder(id),
  resolveUniverseFolder: (id) => resolveUniverseFolder(id),
  resolveGalaxyFolder: (id) => resolveGalaxyFolder(id),

  // RAW PRIMITIVES
  fs: () => fs,
  nodePath: () => path
};

// EXPORT RAW HANDLES
export const PulseWorldFS = fs;
export const PulseWorldNodePath = path;

PulseRealm.PulseWorldFS = fs;
PulseRealm.PulseWorldNodePath = path;