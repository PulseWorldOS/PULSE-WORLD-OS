// ============================================================================
// PulseWorldOrganismMap-v32-Orbital-IMMORTAL++++++
//  • v32++++++ GALAXY / UNIVERSE / WORLD / SATELLITE / REGION / BAND MAP
//  • Pure metadata + light memory (no network, no Firebase, no fetch)
//  • IndexedDB snapshot + in-memory runtime helpers
//  • Backwards-compatible with v27/v30 API (lookup/getSystem/listSystems/...)
//  • Internet is modeled as a conditional route, never a primary dependency.
// ============================================================================

import {fs, path} from "../../../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-WORLD-PATH.js";
// Lazy CoreMemory accessor — avoids TDZ from circular import chains
let _PulseCoreGMemoryRef = null;
function getCoreGMemory() {
  if (_PulseCoreGMemoryRef) return _PulseCoreGMemoryRef;
  try {
    _PulseCoreGMemoryRef = globalThis.PulseRealm?.PulseCoreGMemory || globalThis.PulseRealm?.PulseCoreMemory || null;
  } catch (err) {
    _PulseCoreGMemoryRef = null;
  }
  return _PulseCoreGMemoryRef;
}
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// --- CLONE-SAFE SANITIZER (fixes DataCloneError) ---
function cloneSafe(obj) {
  const seen = new WeakSet();

  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (typeof value === "function") return undefined;
    if (typeof Node !== "undefined" && value instanceof Node) return undefined;

    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }

    return value;
  }));
}

async function buildOrganismSnapshot_v32() {
  // ⭐ 1) REAL SCAN — ONLY THING THAT ACTUALLY EXISTS
  const pub = await scanPublishDirectory("/");

  // ⭐ 2) BUILD SNAPSHOT FROM WHAT WE ACTUALLY HAVE
  const merged = {
    epoch: PulseRealm.PulseNOW,
    version: "v32-Orbital-IMMORTAL++++++",

    // systems + metadata from publish scan
    systems: pub.systems || {},
    fileToMeta: pub.fileToMeta || {},

    // world structure — publish scan probably doesn't provide these
    galaxies: pub.galaxies || {},
    universes: pub.universes || {},
    worlds: pub.worlds || {},
    regions: pub.regions || {},
    bands: pub.bands || {},
    satellites: pub.satellites || {},

    // routes from publish scan
    routes: pub.routes || [],

    internetFallbackPolicy: defaultInternetFallbackPolicy(),
    architecture: PULSE_WORLD_ARCHITECTURE_V40
  };

  return merged;
}

const MAP_DB_NAME = "PulseWorldMapDB";
const MAP_STORE_NAME = "OrganismMapStore";
const MAP_KEY = "PulseOrganismMap_v32_Orbital_ImmortalPlusPlusPlusPlusPlus";

let dbPromise = null;

// ============================================================
//  PUBLISH DIRECTORY SCANNER (v32-IMMORTAL)
// ============================================================
async function scanPublishDirectory(base = "/") {
  const results = {
    directories: [],
    files: [],
    tree: {}
  };

  // Try to detect environment
  const isNode = typeof require === "function";
  const isBrowserFS = PulseRealm.PulseWorldFS && typeof PulseRealm.PulseWorldFS.list === "function";

  // -----------------------------
  // NODE ENVIRONMENT (fs)
  // -----------------------------
  if (isNode) {
    
    function walk(dir, treeNode) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          results.directories.push(fullPath);
          treeNode[entry.name] = {};
          walk(fullPath, treeNode[entry.name]);
        } else {
          results.files.push(fullPath);
          treeNode[entry.name] = fullPath;
        }
      }
    }

    walk(base, results.tree);
    return results;
  }

  // -----------------------------
  // BROWSER / PULSEWORLD ENVIRONMENT
  // -----------------------------
  if (isBrowserFS) {
    let files = [];
    try {
      files = await PulseRealm.PulseWorldFS.list(base, { recursive: true });
    } catch (err) {
      console.warn("[Scanner] Failed to scan publish directory:", err);
      return results;
    }

    for (const file of files) {
      const path = file.path || file;

      if (path.endsWith("/")) {
        results.directories.push(path);
      } else {
        results.files.push(path);
      }

      // Build tree
      const parts = path.split("/").filter(Boolean);
      let node = results.tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!node[part]) {
          node[part] = (i === parts.length - 1) ? path : {};
        }
        node = node[part];
      }
    }

    return results;
  }

  // -----------------------------
  // NO FS AVAILABLE
  // -----------------------------
  console.warn("[Scanner] No filesystem available.");
  return results;
}



// ---------------------------------------------------------------------------
// IndexedDB helpers (snapshot only, no network, v32)
// ---------------------------------------------------------------------------
function openMapDB() {
  if (typeof indexedDB === "undefined") {
    return null; // offline / Node runtime
  }

  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    const req = indexedDB.open(MAP_DB_NAME, 1);

    req.onupgradeneeded = function (evt) {
      const db = evt.target.result;
      if (!db.objectStoreNames.contains(MAP_STORE_NAME)) {
        db.createObjectStore(MAP_STORE_NAME);
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      console.error("[OrganismMap:v32] IndexedDB open failed", req.error);
      resolve(null);
    };
  });

  return dbPromise;
}


async function idbGetMap() {
  const _coreRef = getCoreGMemory();
  const core = _coreRef?.getSync?.("OrganismMap", "v32") || null;
  if (core) return core;

  // 2. Browser-only fallback
  const db = await openMapDB();
  if (!db) return null;

  return await new Promise((resolve) => {
    const tx = db.transaction(MAP_STORE_NAME, "readonly");
    const store = tx.objectStore(MAP_STORE_NAME);
    const req = store.get(MAP_KEY);

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => {
      console.error("[OrganismMap:v32] IndexedDB get failed", req.error);
      resolve(null);
    };
  });
}

async function idbSetMap(snapshot) {
  const _coreSetRef = getCoreGMemory();
  if (_coreSetRef?.putAsync) _coreSetRef.putAsync("OrganismMap", "v32", snapshot);

  // 2. Browser-only fallback
  const db = await openMapDB();
  if (!db) return true; // offline Node runtime: CoreMemory already saved

  return await new Promise((resolve) => {
    const tx = db.transaction(MAP_STORE_NAME, "readwrite");
    const store = tx.objectStore(MAP_STORE_NAME);
    const req = store.put(snapshot, MAP_KEY);

    req.onsuccess = () => resolve(true);
    req.onerror = () => {
      console.error("[OrganismMap:v32] IndexedDB set failed", req.error);
      resolve(false);
    };
  });
}

function classifySystemName(name) {
  const n = String(name || "").toLowerCase();

  // -------------------------------------------------------
  // COSMIC LAYERS (TOP → DOWN)
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
  // WORLD ROOT ORGANS
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
  // BOOT ORGANS
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
  // PROOF ORGANS (FINAL)
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
  // CREATION BARRIER ORGANS (FINAL)
  // -------------------------------------------------------
  const BARRIER = {
    "pulse-boot-creation":   { layer: "creation",    kind: "creation" },
    "pulse-boot-barrier":    { layer: "creation",    kind: "barrier" },
    "pulse-boot-route":      { layer: "creation",    kind: "route" }
  };

  if (BARRIER[n]) return BARRIER[n];

  // -------------------------------------------------------
  // EVOLUTION ORGANS (PascalCase-vNN)
  // -------------------------------------------------------
  if (/pulseevolutionary/.test(n)) {
    return { layer: "evolution", kind: "evolutionary" };
  }

  // -------------------------------------------------------
  // TECH ORGANS
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
    "pulse-band-orbital":    { layer: "band",        kind: "orbital-band" }
  };

  if (TECH[n]) return TECH[n];

  // -------------------------------------------------------
  // UI WORLDS
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
  // BACKUP / NETLIFY / FIREBASE
  // -------------------------------------------------------
  const BACKUP = {
    "pulseworld-netlify":    { layer: "backup",      kind: "netlify" },
    "pulseworld-firebase":   { layer: "backup",      kind: "firebase" }
  };

  if (BACKUP[n]) return BACKUP[n];

  // -------------------------------------------------------
  // ORBITAL / SATELLITE / GROUND
  // -------------------------------------------------------
  const ORBITAL = {
    "pulse-satellite":       { layer: "orbital",     kind: "satellite" },
    "pulse-ground":          { layer: "ground",      kind: "groundstation" }
  };

  if (ORBITAL[n]) return ORBITAL[n];

  // -------------------------------------------------------
  // DEFAULT
  // -------------------------------------------------------
  return { layer: "generic", kind: "system" };
}

// ---------------------------------------------------------------------------
// ARCHITECTURE GENOME — PULSE‑WORLD v40 IMMORTAL OCD ADVANTAGE++++++++++++
// (Integrated directly after classifier — Identity Layer)
// ---------------------------------------------------------------------------
const PULSE_WORLD_ARCHITECTURE_V40 = {

  // -----------------------------------------------------
  // COSMIC ROOT REQUIREMENTS
  // -----------------------------------------------------
  cosmicLayers: {
    multiverseRequired: true,
    universeRequired: true,
    galaxyRequired: true,
    worldRequired: true,
    cosmicOrder: ["PULSE-MULTIVERSE", "PULSE-UNIVERSE", "PULSE-GALAXY", "PULSE-WORLD"]
  },

  // -----------------------------------------------------
  // WORLD ROOT ORGANISM
  // -----------------------------------------------------
  worldOrganism: {
    pulseWorldRootRequired: true,
    pulseWorldIsRootOrganism: true,
    pulseWorldFolderRequired: true,
    worldFallbackAllowed: true,
    worldFallbackPattern: "PulseWorld{OrganName}-v{Version}"
  },

  // -----------------------------------------------------
  // UI ORGANISM (FRONTEND UNIVERSE)
  // -----------------------------------------------------
  uiOrganism: {
    pulseUIOrganismRequired: true,
    pulseUIFolderRequired: true,
    pulseUILayer: "frontend",
    pulseUIIsFrontendUniverse: true,
    uiClusters: ["PULSEAdmin", "PULSEDelivery", "PULSEDirectory", "PULSERewards"]
  },

  // -----------------------------------------------------
  // BAND / BACKEND ORGANISM
  // -----------------------------------------------------
  bandOrganism: {
    pulseBandBackendRequired: true,
    pulseBandFolderRequired: true,
    pulseBandLayer: "backend",
    pulseBandIsBackendUniverse: true,
    bandTypes: ["PULSE-BAND", "PULSE-BAND-MESH", "PULSE-BAND-ORBITAL"]
  },

  // -----------------------------------------------------
  // X‑PULSE‑X WORLD ENGINE
  // -----------------------------------------------------
  xPulseEngine: {
    pulseXWorldEngineRequired: true,
    pulseXFolderRequired: true,
    pulseXLayer: "world_engine",
    pulseXPrecedesAllBackend: true,
    pulseXIsWorldLayer: true,

    pulseXIdentityRequired: true,
    pulseXBandRequired: true,
    pulseXTransportRequired: true,
    pulseXPresenceRequired: true,
    pulseXMemoryRequired: true,
    pulseXStateRequired: true,
    pulseXLoggerRequired: true,
    pulseXEmailAlertRequired: true,
    pulseXOrganismMapRequired: true
  },

  // -----------------------------------------------------
  // PROXY / BOUNDARY ORGANISM
  // -----------------------------------------------------
  proxyOrganism: {
    pulseProxyBoundaryLayer: true,
    pulseProxyFolderRequired: true,
    pulseProxyOnlyRouting: true,
    pulseProxyMemoryRouterRequired: true
  },

  // -----------------------------------------------------
  // CORE TECH ORGANISM (PULSE-PHYSICS)
  // -----------------------------------------------------
  techOrganism: {
    pulseCoreRequired: true,
    pulseDesignRequired: true,
    pulseEngineRequired: true,
    pulseExpansionRequired: true,
    pulseFinalityRequired: true,
    pulseGridRequired: true,
    pulseMeshRequired: true,
    pulseOSRequired: true,
    pulseRegioningRequired: true,
    pulseRouterRequired: true,
    pulseSpecsRequired: true,
    pulseTechRequired: true,
    pulseToolsRequired: true,
    pulseTranslatorRequired: true,
    pulseTrustRequired: true,
    pulseAIRequired: true,
    pulseGPURequired: true,
    pulseSendRequired: true,
    pulseShifterRequired: true,
    pulseProtocolRequired: true
  },

  // -----------------------------------------------------
  // BOOT ORGANISM (PULSE-BOOT)
  // -----------------------------------------------------
  bootOrganism: {
    bootRootRequired: true,
    bootFolders: {
      proof: "_PROOF",
      creationBarrier: "_CREATION_BARRIER",
      evolution: "_EVOLUTION",
      config: "PULSEConfig"
    },

    proofOrgans: [
      "PULSE-PROOF-GPU",
      "PULSE-PROOF-LOGGER",
      "PULSE-PROOF-FLOW",
      "PULSE-PROOF-ERRORS",
      "PULSE-PROOF-MONITOR",
      "PULSE-PROOF-REFLEX",
      "PULSE-PROOF-SHADOW"
    ],

    creationBarrierOrgans: [
      "PULSE-BOOT-BRIDGE",
      "PULSE-BOOT-COMPILER",
      "PULSE-BOOT-EVO",
      "PULSE-BOOT-PORTAL",
      "PULSE-BOOT-RUNTIME",
      "PULSE-BOOT-SCANNER",
      "PULSE-BOOT-WORLD"
    ],

    evolutionOrgansPattern: "PulseEvolutionary{OrganName}-v{Version}",

    configDocumentsPattern: "PulseWorld{DocName}.txt"
  },

  // -----------------------------------------------------
  // NATURAL LANGUAGE → COSMIC PATH MAPPING
  // -----------------------------------------------------
  naturalLanguageMapping: {
    "frontend": "PULSE-MULTIVERSE/PULSE-BOOT",
    "frontend connection": "PULSE-MULTIVERSE/PULSEConfig",
    "frontend components": "PULSE-MULTIVERSE/_EVOLUTION",
    "frontend connectors": "PULSE-MULTIVERSE/_CREATION_BARRIER",
    "frontend monitors": "PULSE-MULTIVERSE/_PROOF",
    "frontend admin": "PULSE-MULTIVERSE/PULSEAdmin",
    "frontend delivery": "PULSE-MULTIVERSE/PULSEDelivery",
    "frontend directory": "PULSE-MULTIVERSE/PULSEDirectory",
    "frontend rewards": "PULSE-MULTIVERSE/PULSERewards",

    "backend": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS",
    "backend engine": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X",
    "backend monitors": "PULSE-MULTIVERSE/_PROOF",

    "world engine": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X",
    "world boundary": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/Pulse-Coordinator",

    "ai": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-AI",
    "gpu": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-GPU",
    "router": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-ROUTER",
    "tools": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-TOOLS",

    "*": "PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-${SYSTEM}"
  }
};

// ---------------------------------------------------------------------------
// Satellite tracking + orbital prediction (symbolic, v32)
// ---------------------------------------------------------------------------
function createEmptySatelliteTrack(id) {
  return {
    id,
    positions: [], // [{ ts, lat, lon, altKm }]
    passes: [],    // [{ regionId, startTs, endTs, maxElevationDeg }]
    pattern: {
      lastOrbitPeriodMs: null,
      avgOrbitPeriodMs: null,
      samples: 0
    }
  };
}

function updateSatelliteTrack(track, positionSample) {
  const { ts, lat, lon, altKm } = positionSample;
  if (!ts) return track;

  const positions = track.positions.slice(-63);
  positions.push({ ts, lat, lon, altKm });

  let lastPeriod = track.pattern.lastOrbitPeriodMs;
  if (positions.length >= 2) {
    const prev = positions[positions.length - 2];
    const curr = positions[positions.length - 1];
    const dt = curr.ts - prev.ts;
    if (dt > 0 && dt < 2 * 60 * 60 * 1000) {
      lastPeriod = dt;
    }
  }

  let { avgOrbitPeriodMs, samples } = track.pattern;
  if (lastPeriod != null) {
    if (!avgOrbitPeriodMs) {
      avgOrbitPeriodMs = lastPeriod;
      samples = 1;
    } else {
      const alpha = 0.2;
      avgOrbitPeriodMs =
        avgOrbitPeriodMs * (1 - alpha) + lastPeriod * alpha;
      samples += 1;
    }
  }

  return {
    ...track,
    positions,
    pattern: {
      lastOrbitPeriodMs: lastPeriod,
      avgOrbitPeriodMs,
      samples
    }
  };
}

function predictNextPassWindows(track, { now = PulseRealm.PulseNOW, count = 3 } = {}) {
  const out = [];
  const period = track.pattern.avgOrbitPeriodMs;
  if (!period || period <= 0) return out;

  let base = now;
  for (let i = 0; i < count; i++) {
    const start = base + i * period;
    const end = start + Math.min(period * 0.25, 15 * 60 * 1000);
    out.push({
      satId: track.id,
      startTs: start,
      endTs: end,
      confidence: 0.6 + 0.1 * Math.min(track.pattern.samples, 3)
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Internet fallback policy — symbolic only (v32)
// ---------------------------------------------------------------------------
function defaultInternetFallbackPolicy() {
  return {
    internetPrimary: false,
    internetAllowed: true,
    internetAsFallbackOnly: true,
    bandPriority: [
      "satellite",
      "groundstation",
      "mesh",
      "cellular",
      "wifi",
      "internet"
    ],
    classifyRoute(routeMeta = {}) {
      const via = routeMeta.via || "unknown";
      if (via === "internet") return "fallback_internet";
      if (via === "wifi" || via === "cellular") return "edge_connectivity";
      if (via === "satellite" || via === "orbital") return "orbital";
      if (via === "groundstation") return "ground";
      if (via === "mesh") return "mesh";
      return "unknown";
    }
  };
}
// ---------------------------------------------------------------------------
// Attach runtime helpers to snapshot (v32 IMMORTAL++++++)
// ---------------------------------------------------------------------------
function attachRuntimeToSnapshot(snapshot) {
  const map = Object.assign(
    {
      epoch: PulseRealm.PulseNOW,
      version: "v32-Orbital-IMMORTAL++++++",

      systems: {},
      fileToMeta: {},
      defaultMeta: {
        subsystem: "unknown",
        version: "v0",
        color: "#90CAF9",
        icon: "?"
      },

      multiverse: {},
      galaxies: {},
      universes: {},
      worlds: {},
      regions: {},
      bands: {},
      satellites: {},
      routes: [],

      internetFallbackPolicy: defaultInternetFallbackPolicy(),
      architecture: PULSE_WORLD_ARCHITECTURE_V40
    },
    snapshot || {}
  );

  // ----------------- ARCHITECTURE → MAP BOOTSTRAP -----------------
  function bootstrapFromArchitecture(arch, m) {
    if (!arch) return;

    const worldOrg = arch.worldOrganism || {};
    const uiOrg = arch.uiOrganism || {};
    const bandOrg = arch.bandOrganism || {};
    const xPulse = arch.xPulseEngine || {};
    const proxy = arch.proxyOrganism || {};
    const physics = arch.techOrganism || {}; // PHYSICS now
    const boot = arch.bootOrganism || {};

    const multiverseId = "PULSE-MULTIVERSE";
    const universeId   = "PULSE-UNIVERSE";
    const galaxyId     = "PULSE-GALAXY";
    const worldId      = "PULSE-WORLD";
    const regionId     = "PULSE-REGION-PRIMARY";
    const bandId       = "PULSE-BAND-PRIMARY";

    // MULTIVERSE → UNIVERSES
    m.multiverse[multiverseId] = {
      id: multiverseId,
      universes: [universeId]
    };

    // UNIVERSE → GALAXIES
    m.universes[universeId] = {
      id: universeId,
      name: universeId,
      kind: "frontend+backend",
      galaxies: [galaxyId]
    };

    // GALAXY → WORLDS
    m.galaxies[galaxyId] = {
      id: galaxyId,
      name: galaxyId,
      awsRegions: [],
      worlds: [worldId]
    };

    // WORLD → REGIONS / BANDS / SYSTEMS
    m.worlds[worldId] = {
      id: worldId,
      kind: "pulse-world",
      regions: [regionId],
      bands: [bandId],
      meta: {
        isRootOrganism: !!worldOrg.pulseWorldIsRootOrganism,
        folderRequired: !!worldOrg.pulseWorldFolderRequired,
        fallbackAllowed: !!worldOrg.worldFallbackAllowed,
        fallbackPattern: worldOrg.worldFallbackPattern || ""
      }
    };

    // REGION
    m.regions[regionId] = {
      id: regionId,
      name: "Primary Region",
      bandHints: [bandId],
      connectivityScore: 100,
      internetFallbackPolicy: m.internetFallbackPolicy
    };

    // BAND
    m.bands[bandId] = {
      id: bandId,
      kind: bandOrg.pulseBandLayer || "backend",
      priority: 1
    };

    // SYSTEMS: UI CLUSTERS
    (uiOrg.uiClusters || []).forEach((clusterName) => {
      const key = clusterName.toLowerCase();
      m.systems[key] = {
        id: clusterName,
        layer: uiOrg.pulseUILayer || "frontend",
        kind: "ui-cluster",
        worldId,
        galaxyId,
        universeId,
        multiverseId
      };
    });

    // SYSTEMS: BAND TYPES
    (bandOrg.bandTypes || []).forEach((bandType) => {
      const key = bandType.toLowerCase();
      m.systems[key] = {
        id: bandType,
        layer: bandOrg.pulseBandLayer || "backend",
        kind: "band-organism",
        worldId,
        galaxyId,
        universeId,
        multiverseId
      };
    });

    // SYSTEMS: X‑PULSE ENGINE
    [
      "pulseXIdentityRequired",
      "pulseXBandRequired",
      "pulseXTransportRequired",
      "pulseXPresenceRequired",
      "pulseXMemoryRequired",
      "pulseXStateRequired",
      "pulseXLoggerRequired",
      "pulseXEmailAlertRequired",
      "pulseXOrganismMapRequired"
    ].forEach((flag) => {
      if (!xPulse[flag]) return;
      const name = flag.replace("pulseX", "PULSE-X-").replace("Required", "");
      const key = name.toLowerCase();
      m.systems[key] = {
        id: name,
        layer: "x-pulse",
        kind: "x-pulse-organ",
        worldId,
        galaxyId,
        universeId,
        multiverseId
      };
    });

    // SYSTEMS: PHYSICS (formerly TECH)
    Object.keys(physics).forEach((flag) => {
      if (!physics[flag]) return;
      const name = flag
        .replace("pulse", "PULSE-")
        .replace("Required", "")
        .toUpperCase();
      const key = name.toLowerCase();
      m.systems[key] = {
        id: name,
        layer: "physics",
        kind: "physics-organism",
        worldId,
        galaxyId,
        universeId,
        multiverseId
      };
    });

    // SYSTEMS: BOOT
    (boot.proofOrgans || []).forEach((org) => {
      const key = org.toLowerCase();
      m.systems[key] = {
        id: org,
        layer: "boot-proof",
        kind: "boot-organism",
        worldId,
        galaxyId,
        universeId,
        multiverseId
      };
    });

    (boot.creationBarrierOrgans || []).forEach((org) => {
      const key = org.toLowerCase();
      m.systems[key] = {
        id: org,
        layer: "boot-creation-barrier",
        kind: "boot-organism",
        worldId,
        galaxyId,
        universeId,
        multiverseId
      };
    });

    // PROXY
    if (proxy.pulseProxyFolderRequired) {
      const key = "Pulse-Coordinator";
      m.systems[key] = {
        id: "Pulse-Coordinator",
        layer: "boundary",
        kind: "proxy-organism",
        worldId,
        galaxyId,
        universeId,
        multiverseId,
        meta: {
          onlyRouting: !!proxy.pulseProxyOnlyRouting,
          memoryRouterRequired: !!proxy.pulseProxyMemoryRouterRequired
        }
      };
    }
  }

  // run bootstrap
  bootstrapFromArchitecture(map.architecture, map);

  // ----------------- legacy API -----------------
  map.lookup = function (fileUrl) {
    return this.fileToMeta[fileUrl] || this.defaultMeta;
  };

  map.getSystem = function (sysKey) {
    return this.systems[String(sysKey || "").toLowerCase()] || null;
  };

  map.listSystems = function () {
    return Object.values(this.systems || {});
  };

  return map;
}


// ---------------------------------------------------------------------------
// In-memory singleton + public API (v32 IMMORTAL++++++)
// ---------------------------------------------------------------------------
let inMemoryMap = null;

/**
 * getPulseOrganismMapV32
 * Sync facade: always returns a map object immediately.
 * If IndexedDB has a snapshot, it will be hydrated asynchronously.
 */

export function getPulseOrganismMapV32() {
  if (inMemoryMap) return inMemoryMap;

  // 1. deterministic bootstrap (Pulse‑World root systems)
  inMemoryMap = attachRuntimeToSnapshot({
    epoch: PulseRealm.PulseNOW,
    version: "v32-Orbital-IMMORTAL++++++",

    systems: {
      "pulse-world": {},
      "pulse-boot": {},
      "pulse-universe": {},
      UI: {},                     // ⭐ REQUIRED root
      "systemsUI": {}             // legacy fallback
    },

    systemsUI: {
      "pulse-world": {},
      "pulse-boot": {},
      "pulse-universe": {},
      UI: {}                      // ⭐ REQUIRED root
    },

    fileToMeta: {},
    galaxies: {},
    universes: {},
    worlds: {},
    regions: {},
    bands: {},
    satellites: {},
    routes: [],

    internetFallbackPolicy: defaultInternetFallbackPolicy(),
    architecture: PULSE_WORLD_ARCHITECTURE_V40
  });

  const _coreHydRef = getCoreGMemory();
  if (_coreHydRef?.get) _coreHydRef.get("OrganismMap", "v32", (snapshot) => {
    if (!snapshot) return;

    if (!snapshot.architecture) {
      snapshot.architecture = PULSE_WORLD_ARCHITECTURE_V40;
    }

    // hydration overwrites deterministic bootstrap
    inMemoryMap = attachRuntimeToSnapshot(snapshot);
    PulseRealm.PulseOrganismMap = inMemoryMap;
  });

  // legacy global
  PulseRealm.PulseOrganismMap = inMemoryMap;

  return inMemoryMap;
}



function makeCloneSafeSnapshot(snapshot) {
  const safe = {};

  for (const key in snapshot) {
    const value = snapshot[key];

    // Skip functions
    if (typeof value === "function") continue;

    // Skip objects containing functions
    if (value && typeof value === "object") {
      safe[key] = JSON.parse(JSON.stringify(value));
      continue;
    }

    safe[key] = value;
  }

  return safe;
}

/**
 * savePulseOrganismMapSnapshotV32
 * Called by build/admin tools to push a new snapshot into IndexedDB.
 */

export async function savePulseOrganismMapSnapshotV32(snapshot) {
  const normalized = Object.assign(
    {
      epoch: PulseRealm.PulseNOW,
      version: "v32-Orbital-IMMORTAL++++++",

      systems: {},
      fileToMeta: {},

      galaxies: {},
      universes: {},
      worlds: {},
      regions: {},
      bands: {},
      satellites: {},
      routes: [],

      internetFallbackPolicy: defaultInternetFallbackPolicy(),

      // ⭐ architecture genome persisted in snapshot
      architecture: PULSE_WORLD_ARCHITECTURE_V40
    },
    snapshot || {}
  );

  // ensure architecture is never removed
  if (!normalized.architecture) {
    normalized.architecture = PULSE_WORLD_ARCHITECTURE_V40;
  }

  const safeSnapshot = makeCloneSafeSnapshot(normalized);
  idbSetMap(safeSnapshot);


  // hydrate in-memory map with architecture
  inMemoryMap = attachRuntimeToSnapshot(normalized);


    PulseRealm.PulseOrganismMap = inMemoryMap;

  return inMemoryMap;
}

export const PULSE_ORGANISM_MAP_V32 = {
  getPulseOrganismMapV32,
  savePulseOrganismMapSnapshotV32
};

export default PULSE_ORGANISM_MAP_V32;

// --- AUTO-RUN SNAPSHOT ON PAGE LOAD ---
function initMapSnapshot() {
  queueMicrotask(async () => {
    try {
      // 1) Try to load existing snapshot
      let snapshot = await idbGetMap();

      // 2) If no snapshot exists, create a minimal one
      if (!snapshot) {
        snapshot = { epoch: PulseRealm.PulseNOW };
        await savePulseOrganismMapSnapshotV32(snapshot);
      }

      // 3) Hydrate ONCE — architecture builds the map
      const hydrated = attachRuntimeToSnapshot(snapshot);
      PulseRealm.PulseOrganismMap = hydrated;

      // ⭐ FULL CONSOLE GROUP — SINGLE SNAPSHOT
      console.groupCollapsed("🔥 PULSE ORGANISM MAP — HYDRATED SNAPSHOT");
      console.log("Epoch:", hydrated.epoch);
      console.log("Version:", hydrated.version);
      console.log("Architecture Genome:", hydrated.architecture);
      console.log("Systems:", hydrated.systems);
      console.log("Galaxies:", hydrated.galaxies);
      console.log("Universes:", hydrated.universes);
      console.log("Worlds:", hydrated.worlds);
      console.log("Regions:", hydrated.regions);
      console.log("Bands:", hydrated.bands);
      console.log("Satellites:", hydrated.satellites);
      console.log("Routes:", hydrated.routes);
      console.log("Internet Fallback Policy:", hydrated.internetFallbackPolicy);
      console.groupEnd();

    } catch (err) {
      if (PulseRealm.PulseError) {
        PulseRealm.PulseError(
          "portal",
          "[PulsePortal::AutoSnapshot] ERROR building organism map →",
          err
        );
      } else {
        console.error("[PulsePortal::AutoSnapshot] ERROR building organism map →", err);
      }

      console.groupCollapsed("🔥 PULSE ORGANISM MAP — ERROR");
      console.error(err);
      console.groupEnd();
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initMapSnapshot, 50);
  } else {
    document.addEventListener("DOMContentLoaded", () => setTimeout(initMapSnapshot, 50));
  }
} else {
  setTimeout(initMapSnapshot, 50);
}

PulseRealm.PulseOrganismMapSave = savePulseOrganismMapSnapshotV32;

