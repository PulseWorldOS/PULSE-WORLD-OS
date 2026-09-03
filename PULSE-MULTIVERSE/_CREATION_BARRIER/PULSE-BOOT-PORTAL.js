// ============================================================================
// PULSE-PORTAL v30+ — ONE-BAND IMMORTAL PORTAL SURFACE + VITALS + ROUTE MEMORY
// ============================================================================
// FILE: /PULSE-BOOT-PORTAL.js
// PULSE PORTAL — v30
// PORTAL-MEMBRANE • ONE-WAY GLASS • ZERO-TRUST SURFACE • ORGANISM BOOT SIGNAL
// “The last surface before the organism. The first reflection of the portal.”
// ============================================================================
//  DESIGN (v30-IMMORTAL PORTAL BOOT):
//  - Unified Portal Boot Membrane:
//      TOUCH  →  PULSE PORTAL  →  UNDERSTANDING  →  BINARY ORGANISM
//  - Zero-trust surface:
//      The page only sees PulsePortal shadows, never raw organs, CNS, or routing.
//  - Binary-first, dual-band aware, evidence-aware, admin-aware:
//      Surface is binary-aware and chunk-aligned, but projects only safe shadows.
//  - Offline-first snapshot:
//      Stable, deterministic environment snapshot safe for logs, vitals, trust, and bridge.
//  - Prewarm-aware + Chunk-session-aware:
//      Cooperates with PulseChunks + Bridge prewarm to reduce cold-start pain.
//  - Portal Trust Layer v2:
//      This file + PulseProofBridge-v30 form the “Portal Trust Layer v2” —
//      the only surfaces that see both the outside page and the organism.
//  - PulseTouch-aware:
//      Reads PulseTouch skin snapshot as a first-contact hint into power/profile.

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import {
  getPulseOrganismMapV32,
  PULSE_ORGANISM_MAP_V32,
} from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-WORLD-MAPORGANISM.js";
import { ProtocolSignalPort } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-PROTOCOL/PULSE-PROTOCOL.js";
import {
  setdoc,
  doc,
  PulseVitalsLogger,
  PulseVitalsMonitor,
  PulseUIFlow,
  PulseUIErrors,
  createPulseSkinReflex as PulseProofReflex,
  PulsePageScanner,
  createPulseUICompiler as PulseUICompiler,
  createPulseRouteMemory as PulseUIRouteMemory,
  createAdminDiagnosticsOrganV30 as createAdminDiagnosticsOrgan,
  createPulseWorldAdminPanel,
  startUnderstanding,
  PulseBinaryOrganismBoot,
} from "../_PROOF/PULSE-PROOF.js";
import { PulseUnderstanding } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-UNDERSTANDING-PAST.js";
import { fetchChunk } from "../PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-CHUNKS.js";
import { prewarm } from "../PULSE-ENGINE/PulseEngineForwardProcess-v31.js";

function log(msg) {
  PulseRealm.PulseLog("portal", msg);
}
function error(msg) {
  PulseRealm.PulseLog("portal", msg);
}
function warn(msg) {
  PulseRealm.PulseLog("portal", msg);
}

PulseRealm.PulseLog(
  "portal",
  "%c[PulseBootPortal v30-Expression Membrane] %cPortal Membrane Loading.. I'm the Official Interpreter for the BARRIER/BRIDGE Brain Process! Lol (Not Much..but we Try!)",
  "color:lightblue; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;",
);

const ONE_BAND = Object.freeze({
  id: "PulseBand",
  description:
    "Unified execution band for PULSE WORLD (binary + symbolic fused).",
  lanes: 32,
  dualBand: true,
  notes: [
    "Binary primary, symbolic overlay.",
    "All IQ chunking uses band='pulseband' at the IQ layer.",
    "Aligned with chunker32 + dualBandArteryV32.",
    "ExecutionModelV32 ensures deterministic fusion of binary + symbolic lanes.",
  ],
});
PulseRealm.ONE_BAND = ONE_BAND;
try {
  const startWarm = () => {
    try {
      if (typeof runPortalWarm === "function") {
        runPortalWarm();
      }

      if (PulseRealm.PulseSignalPort.emit) {
        ProtocolSignalPort.emit("UNDERSTANDING_BOOT", {
          ts: PulseRealm.PulseNOW,
          band: ONE_BAND.id || "PulseBand",
          origin: "portal",
          page: `?Impulse=${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/",
        });

        ProtocolSignalPort.emit("PULSEBAND_ONE_BOOT", {
          ts: PulseRealm.PulseNOW,
          band: ONE_BAND.id || "PulseBand",
          lanes: ONE_BAND.lanes || [],
          origin: "portal",
        });
      }

      PulseRealm.PulseLog(
        "portal",
        "%c[PulsePortal::Boot] %cPulse World PortalWarm + UnderstandingBoot + PulseBandOneBandBoot",
        "color:lightblue; font-weight:bold; font-family:monospace;",
        "color:#00FF9C; font-family:monospace;",
      );
    } catch (err) {
      PulseRealm.PulseError(
        "portal",
        "[PulsePortal::Boot] Pulse World PortalWarm ERROR Found →",
        err,
      );
    }
  };

  startWarm();
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "[PulsePortal::Boot] Pulse World PortalWarm ERROR Found →",
    err,
  );
}
// IMMORTAL PORTAL BANNER
PulseRealm.PulseLog(
  "portal",
  "%c[PulsePortal v30] %cPortal Membrane Online — ONE-BAND",
  "color:lightblue; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;",
);
const PulseSkinReflex = PulseProofReflex();

try {
  PulseRealm.PulseLog(
    "portal",
    "%c[PulsePortal::SkinReflex] %cPulse World Reflex Instance Created %c→ OK (v30+ ONE-BAND)",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;",
    "color:#E8F8FF; font-family:monospace;",
  );
  PulseRealm.PulseLog(
    "portal",
    "%c↳ Methods Wired to your PulseWorldView: %cgetHook, getAuth, getMap, callHelper, installErrorInterceptor",
    "color:lightblue; font-family:monospace; font-weight:bold;",
    "color:#E8F8FF; font-family:monospace;",
  );
  PulseRealm.getHook = PulseSkinReflex.getHook;
  PulseRealm.getAuth = PulseSkinReflex.getAuth;
  PulseRealm.getMap = PulseSkinReflex.getMap;
  PulseRealm.callHelper = PulseSkinReflex.callHelper;
  PulseRealm.installErrorInterceptor = PulseSkinReflex.installErrorInterceptor;
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "%c[PulsePortal::SkinReflex] %cInstance ERROR Found",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
  );
  PulseRealm.PulseError(
    "portal",
    "%c↳ %s",
    "color:#FF3B3B; font-family:monospace;",
    err,
  );
}
function getCurrentCoordinates() {
  try {
    if (PulseRealm.ReadPulseTouchInternal) {
      const touch = PulseRealm.ReadPulseTouchInternal({
        coord: "W0.P0.R0.S0.SH0.PORTAL",
      });
      return touch.coord || null;
    }
  } catch {}

  return "LOGIN";
}
function predictNextCoordinates(coord) {
  if (!coord || typeof coord !== "string") return "LOGIN";

  const parts = coord.split(".");
  const node = parts[parts.length - 1].toUpperCase();

  // ============================================================
  // 1) Deterministic transitions (your original logic, expanded)
  // ============================================================
  const nextNodeMap = {
    INDEX: "LOGIN",
    LOGIN: "DASHBOARD",
    DASHBOARD: "INVENTORY",
    INVENTORY: "SETTINGS",
    SETTINGS: "ROUTE",
    ROUTE: "INDEX",
  };

  if (nextNodeMap[node]) {
    parts[parts.length - 1] = nextNodeMap[node];
    return parts.join(".");
  }

  // ============================================================
  // 2) Touch predictor fallback
  // ============================================================
  try {
    const touch = PulseRealm.PulseTouch || PulseRealm.PulseTouchPredictor;
    if (touch.predictNextCoordinate) {
      const next = touch.predictNextCoordinate(coord);
      if (typeof next === "string") return next;
    }
  } catch {}

  // ============================================================
  // 3) RouteCarpet fallback (external HTML prediction)
  // ============================================================
  try {
    const predicted = PulseRealm.PulseRouteCarpet.predictNext(
      node.toLowerCase(),
    );
    if (predicted) {
      parts[parts.length - 1] = predicted.toUpperCase();
      return parts.join(".");
    }
  } catch {}

  // ============================================================
  // 4) OrganismMap genome fallback
  // ============================================================
  try {
    const map = PulseRealm.PulseOrganismMap;
    const ui = map.systems.UI;
    const pages = ui.pages;

    if (pages) {
      const keys = Object.keys(pages);
      const idx = keys.indexOf(node);
      if (idx >= 0 && idx < keys.length - 1) {
        parts[parts.length - 1] = keys[idx + 1];
        return parts.join(".");
      }
      if (keys.length) {
        parts[parts.length - 1] = keys[0];
        return parts.join(".");
      }
    }
  } catch {}

  // ============================================================
  // 5) R# fallback (increment route index)
  // ============================================================
  const rIndex = parts.findIndex((p) => p.startsWith("R"));
  if (rIndex >= 0) {
    const num = parseInt(parts[rIndex].slice(1), 10) || 0;
    parts[rIndex] = "R" + (num + 1);
    return parts.join(".");
  }

  // ============================================================
  // 6) Final fallback: append R1
  // ============================================================
  return coord + ".R1";
}

function buildDynamicRoutes(navSets) {
  const routes = {};

  for (const [page, navItems] of Object.entries(navSets)) {
    routes[page] = navItems
      .map(item => item.load)        // use load targets
      .filter(Boolean);              // remove undefined
  }

  return routes;
}

function runPortalWarm() {
  try {
    // ======================================================
    // WORLD MODE (coordinates → world route)
    // ======================================================
    if (getCurrentCoordinates) {
      const coord = getCurrentCoordinates();
      if (!coord) {
        PulseRealm.PulseWarn(
          "portal",
          "[PulsePortal::PortalWarm] Pulse World Portal Prewarm No Coordinate — Skipping Warming Process..",
        );
        return;
      }

      const nextCoord = predictNextCoordinates(coord);
      if (!nextCoord) {
        PulseRealm.PulseLog(
          "portal",
          "[PulsePortal::PortalWarm] Pulse World Portal Prewarm No Next Coordinate Predicted..",
        );
        return;
      }

      const nextRoute = interpretCoordinates(nextCoord);
      if (!nextRoute) {
        PulseRealm.PulseLog(
          "portal",
          "[PulsePortal::PortalWarm] Pulse World Portal Prewarm No World Route for Next Coordinate..",
        );
        return;
      }

      const descriptor = PulseRealm.PulseRouteCarpet.buildWorldDescriptor(
        nextRoute,
      ) || {
        route: nextRoute,
        imports: [`./${nextRoute}.js`],
        assets: [`./${nextRoute}.assets.json`],
      };

      PulseRealm.PulseRouteCarpet.unfold(descriptor);
      PulseRealm.PulsePortalPreloader.preloadWorld(nextRoute);
      PulseRealm.__PULSE_SCAN_ROUTE_IMAGES__(`./${nextRoute}.txt`);
      PulseRealm.PulsePortalChunker.preloadChunksForWorld(nextRoute);
      PulseRealm.PulsePortalWarmup(nextRoute);

      PulseRealm.TouchTimeline("portalWarm", {
        coord,
        nextCoord,
        route: nextRoute,
        band: ONE_BAND.id || "PulseBand",
      });

      PulseRealm.PulseLog(
        "portal",
        "%c[PulsePortal::PortalWarm] %cPulse World-Route Warm Complete %c→ %s",
        "color:lightblue; font-weight:bold; font-family:monospace;",
        "color:#00FF9C; font-family:monospace;",
        "color:#E8F8FF; font-family:monospace;",
        nextRoute,
      );

      return;
    }

    // ======================================================
    // PAGE MODE — YOUR MAP IS USED HERE
    // ======================================================

    PulseRealm.PulsePageRouteOptions = {
      // ⭐ Core Worlds
      PulseWorldReality: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        engine: "/PULSE-ENGINE-BLOCK",
      },

      PulseWorldInventory: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        engine: "/PULSE-ENGINE-BLOCK",
      },

      "PULSE-ENGINE-BLOCK": {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        engine: "/PULSE-ENGINE-BLOCK",
      },

      // ⭐ Business Layer
      PulseWorldBusiness: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        business: "/PulseWorldBusiness",
        engine: "/PULSE-ENGINE-BLOCK",
      },

      // ⭐ Domain / Challenge / SendOff / Skills / Email / PulsePalSettings
      PulseWorldDomain: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
      },

      PulseWorldChallenge: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
      },

      PulseWorldSendOff: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
      },

      PulsePalSettings: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
      },

      PulseWorldEmail: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
      },

      PulseWorldSkills: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
      },

      // ⭐ Scanner
      PulseWorldScanner: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        rewards: "/PulseWorldRewards",
      },

      // ⭐ Founders
      PulseWorldFounders: {
        reality: "/PulseWorldReality",
        founders: "/PulseWorldFounders",
        architects: "/PulseWorldFounders",
      },

      // ⭐ Rewards / Vault
      PulseWorldRewards: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        vault: "/PulseWorldVault",
      },

      PulseWorldVault: {
        reality: "/PulseWorldReality",
        inventory: "/PulseWorldInventory",
        rewards: "/PulseWorldRewards",
      },
    };

    PulseRealm.PulsePageRoutes = buildDynamicRoutes(PulseRealm.NavigationSets);

    const page = PulseRealm.__PULSE_CURRENT_PAGE__ || "PulseWorldInventory";

    // USE YOUR MAP FIRST
    let routes = PulseRealm.PulsePageRoutes[page];

    // If page not in your map, detect and store
    if (!routes) {
      routes = detectRoutesOnPageSync();
      PulseRealm.PulsePageRoutes[page] = routes;
    }

    savePageRoutesDaily(page, routes);

    const predicted =
      PulseRealm.PulseRouteCarpet.predictNext(page, routes) || page;

    const descriptor = PulseRealm.PulseRouteCarpet.buildRouteDescriptor(
      predicted,
    ) || {
      route: predicted,
      imports: [`./${predicted}.js`],
      assets: [`./${predicted}.assets.json`],
    };

    PulseRealm.PulseRouteCarpet.unfold(descriptor);
    PulseRealm.PulsePortalPreloader.preloadPage(predicted);
    PulseRealm.__PULSE_SCAN_ROUTE_IMAGES__(`./${predicted}.txt`);
    PulseRealm.PulsePortalChunker.preloadChunksForPage(predicted);
    PulseRealm.PulsePortalWarmup(predicted);

    PulseRealm.TouchTimeline("portalWarm", {
      page,
      next: predicted,
      band: ONE_BAND.id || "PulseBand",
    });

    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::PortalWarm] %cPulse World Multlversal Drift Open, Warm, & Stable! %c→ %s",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
      "color:#E8F8FF; font-family:monospace;",
      predicted,
    );
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "[PulsePortal::PortalWarm] Pulse World Portal Prewarm FAILED →",
      err,
    );
  }
}

function buildSurfaceEnvironment() {
  const win = typeof window !== "undefined" ? window : null;

  const nav = (typeof navigator !== "undefined" && navigator) || {};

  const scr = (typeof screen !== "undefined" && screen) || {};

  const loc = (typeof location !== "undefined" && location) || {};

  const doc = (typeof document !== "undefined" && document) || {};

  // -------------------------------------------------------------
  // Runtime detection (browser, worker, node, etc.)
  // -------------------------------------------------------------
  let runtime = "unknown";

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    runtime = "browser";
  } else if (
    typeof self !== "undefined" &&
    typeof PulseRealm.importScripts === "function"
  ) {
    runtime = "worker";
  } else if (typeof process !== "undefined" && process.versions?.node) {
    runtime = "node";
  } else if (typeof self !== "undefined") {
    runtime = "environment";
  }

  // -------------------------------------------------------------
  // Device info
  // -------------------------------------------------------------
  const device = {
    hardwareConcurrency:
      typeof nav.hardwareConcurrency === "number"
        ? nav.hardwareConcurrency
        : null,

    maxTouchPoints:
      typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : null,

    deviceMemory:
      typeof nav.deviceMemory === "number" ? nav.deviceMemory : null,

    platform: nav.platform || null,
    vendor: nav.vendor || null,
    userAgent: nav.userAgent || null,
    language: nav.language || null,
  };

  // -------------------------------------------------------------
  // Screen info
  // -------------------------------------------------------------
  const screen2 = {
    width: typeof scr.width === "number" ? scr.width : null,
    height: typeof scr.height === "number" ? scr.height : null,
    availWidth: typeof scr.availWidth === "number" ? scr.availWidth : null,
    availHeight: typeof scr.availHeight === "number" ? scr.availHeight : null,
    colorDepth: typeof scr.colorDepth === "number" ? scr.colorDepth : null,
    pixelRatio:
      typeof win?.devicePixelRatio === "number" ? win.devicePixelRatio : null,
  };

  // -------------------------------------------------------------
  // Input capabilities
  // -------------------------------------------------------------
  const input = {
    touchCapable:
      typeof nav.maxTouchPoints === "number" && nav.maxTouchPoints > 0,

    pointerSupport: typeof win?.PointerEvent !== "undefined",
  };

  // -------------------------------------------------------------
  // Preferences
  // -------------------------------------------------------------
  let prefersReducedMotion = null;
  let prefersDarkMode = null;

  if (typeof win?.matchMedia === "function") {
    try {
      prefersReducedMotion = win.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    } catch {}

    try {
      prefersDarkMode = win.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {}
  }

  const preferences = {
    prefersReducedMotion,
    prefersDarkMode,
  };

  // -------------------------------------------------------------
  // Location
  // -------------------------------------------------------------
  const location2 = {
    href: loc.href || null,
    pathname: loc.pathname || null,
    search: loc.search || null,
    origin: loc.origin || null,
  };

  // -------------------------------------------------------------
  // Referrer
  // -------------------------------------------------------------
  const referrer = typeof doc.referrer === "string" ? doc.referrer : null;

  // -------------------------------------------------------------
  // Network
  // -------------------------------------------------------------
  const network = {
    online: typeof nav.onLine === "boolean" ? nav.onLine : null,
  };

  // -------------------------------------------------------------
  // Visibility
  // -------------------------------------------------------------
  const visibility =
    typeof doc.visibilityState === "string" ? doc.visibilityState : null;

  // -------------------------------------------------------------
  // Performance snapshot
  // -------------------------------------------------------------
  const perf = win?.performance || null;
  const performanceSnapshot = perf
    ? {
        timeOrigin:
          typeof perf.timeOrigin === "number" ? perf.timeOrigin : null,
        now:
          typeof perf.now === "function"
            ? (() => {
                try {
                  return perf.now();
                } catch {
                  return null;
                }
              })()
            : null,
      }
    : null;

  // -------------------------------------------------------------
  // Memory snapshot
  // -------------------------------------------------------------
  const memorySnapshot =
    typeof nav.deviceMemory === "number"
      ? { deviceMemory: nav.deviceMemory }
      : null;

  // -------------------------------------------------------------
  // FINAL ENVIRONMENT OBJECT
  // -------------------------------------------------------------
  return Object.freeze({
    runtime,

    // Explicit UA
    userAgent: nav.userAgent || null,

    language: nav.language || null,
    platform: nav.platform || null,
    online: typeof nav.onLine === "boolean" ? nav.onLine : null,

    screen: screen2,
    device,
    input,
    preferences,
    location: location2,
    network,
    referrer,
    visibility,
    performance: performanceSnapshot,
    memory: memorySnapshot,
  });
}

const PulseSurfaceEnvironment = buildSurfaceEnvironment();
const PULSE_DB = "PulseBootPortalDB";
const ROUTE_STORE = "route_history";

function openPulseDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(PULSE_DB, 1);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(ROUTE_STORE)) {
        db.createObjectStore(ROUTE_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
const IDENTITY_META = {
  version: "v70-IMMORTAL",
  organism: "PulseOS",
  realm: "browser",
  timestamp: () => PulseRealm.PulseNOW,
  uid: () =>
    PulseRealm.crypto?.randomUUID?.() ||
    "uid-" + Math.random().toString(36).slice(2),
  signature: "identity-meta-core",
};

// ---------------------------------------------------------------------------
// SURFACE META / ROLE / LORE — v34 ONE-BAND IMMORTAL PORTAL
// ---------------------------------------------------------------------------
const surfaceMeta = Object.freeze({
  layer: "PulseEvolutionaryPortal",
  role: "portal-membrane",
  version: "34.0-Immortal-Evo+++",
  band: ONE_BAND.id,
  evo: {
    browserOnly: true,
    membraneOnly: true,
    binaryFirst: true,
    viewOnly: true,
    noOrgansExposed: true,
    noRoutingExposed: true,
    noIdentityExposed: true,
    pulseTouchAware: true,
    evidenceAware: true,
    adminConsoleAware: true,
    oneBandUnified: true,
  },
  environment: PulseSurfaceEnvironment,
  contract: {
    never: [
      "expose organs",
      "expose identity",
      "expose CNS",
      "expose routing",
      "expose permissions",
    ],
    always: [
      "project only shadows",
      "stay deterministic",
      "stay membrane-only",
      "stay binary-first",
      "stay one-band at surface",
    ],
  },
});

const pulseLoreContext = Object.freeze({
  lineage: "PulseOS.Surface.Portal.Boot.v34",
  band: ONE_BAND.id,
});

const pulseRole = Object.freeze({
  identity: "PulseEvolutionaryPortal-Boot",
  type: "membrane",
  subsystem: "surface",
  layer: "portal",
  version: "34.0-Immortal-Evo+++",
  band: ONE_BAND.id,
  contract: {
    purpose:
      "Boot the organism from the surface, while exposing only a one-way glass: vitals, logs, understanding hooks, binary shadow, admin diagnostics, and route-level lore — all on a unified pulseband.",
  },
  voice: {
    tone: "calm, precise, descriptive",
    style: "mythic-technical hybrid",
  },
});

const baseMetaPack = {
  meta: surfaceMeta,
  context: pulseLoreContext,
  pulseRole,
};

// ============================================================================
// MEMBRANE BOOT v34 IMMORTAL
// ONE-BAND PULSEBAND • PORTAL-SAFE FETCH • CHUNKS • IMAGE • ROUTE CARPET v34
// ============================================================================

try {
  // ------------------------------------------------------------------------
  // PORTAL-SAFE CLONE HELPERS — STRIP NON-CLONEABLE FIELDS
  // ------------------------------------------------------------------------
  function portalSafeHeaders(headers) {
    try {
      if (!headers) return undefined;
      const out = {};
      if (headers instanceof Headers) {
        headers.forEach((v, k) => (out[k] = v));
        return out;
      }
      if (typeof headers === "object") return { ...headers };
    } catch {}
    return undefined;
  }

  function portalSafeFetchOptions(options) {
    if (!options || typeof options !== "object") return undefined;

    const safe = {};
    if (options.method) safe.method = String(options.method);

    const hdrs = portalSafeHeaders(options.headers);
    if (hdrs) safe.headers = hdrs;

    if (options.mode) safe.mode = String(options.mode);
    if (options.cache) safe.cache = String(options.cache);
    if (options.redirect) safe.redirect = String(options.redirect);
    if (options.referrer) safe.referrer = String(options.referrer);
    if (options.referrerPolicy)
      safe.referrerPolicy = String(options.referrerPolicy);
    if (options.credentials) safe.credentials = String(options.credentials);

    return safe;
  }

  // ------------------------------------------------------------------------
  // PORTAL-SAFE FETCH HELPERS — IMAGE + CHUNK + PREWARM
  // ------------------------------------------------------------------------
  PulseRealm.fetchImage =
    PulseRealm.fetchImage ||
    async function (url) {
      if (!url) return url;

      try {
        if (PulseRealm.PulseChunks.getImage) {
          return PulseRealm.PulseChunks.getImage(url);
        }
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[PulsePortal::FetchImage] Pulse World Expression Chunk Error Found →",
          err,
        );
      }

      return url;
    };

  const chunkMetaBase = {
    band: ONE_BAND.id,
    lanes: ONE_BAND.lanes,
    source: "portal",
  };

  function buildSurfaceRouteId() {
    try {
      const path = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/";
      const hash = location.hash || "";
      return `${path}${hash}`;
    } catch {
      return "/";
    }
  }

  PulseRealm.fetchChunk =
    PulseRealm.fetchChunk ||
    async function (url) {
      if (!url) return null;

      try {
        const metaPack = {
          ...chunkMetaBase,
          route: buildSurfaceRouteId(),
        };

        const result = PulseRealm.PulseTouchChunker(url, 0, metaPack);

        if (result) {
          PulseRealm.PulseLog(
            "portal",
            "[PulsePortal::FetchChunk] Pulse World Expression Chunk Loaded →",
            url,
          );
          return result.chunk;
        }

        if (PulseRealm.PulseTouchChunk) {
          const chunk = PulseRealm.PulseTouchChunk(url);
          PulseRealm.PulseLog(
            "portal",
            "[PulsePortal::FetchChunk] Pulse World Expression Fallback Chunk →",
            url,
          );
          return chunk;
        }
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[PulsePortal::FetchChunk] Pulse World Expression Chunk ERROR Found →",
          err,
        );
      }

      return null;
    };

  PulseRealm.prewarmAssets =
    PulseRealm.prewarmAssets ||
    function (urls = []) {
      try {
        PulseRealm.PulseWarmup(urls);
        PulseRealm.PulseLog(
          "portal",
          "[PulsePortal::PrewarmAssets] Pulse World Expressions Prewarmed →",
          urls.length,
        );
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[PulsePortal::PrewarmAssets] Pulse World Expressions Prewarm ERROR Found →",
          err,
        );
      }
    };

  PulseRealm.PulseRouteCarpet = PulseRealm.PulseRouteCarpet || {
    // ============================================================
    // PRELOAD EVERYTHING FOR A ROUTE (v40)
    // ============================================================
    preloadEverything(predictedPage, descriptor) {
      try {
        const page = (predictedPage || "").trim() || "index";

        // 1) Build descriptor if not provided
        const routeDescriptor =
          descriptor && descriptor.route
            ? descriptor
            : this.buildRouteDescriptor(page);

        // 2) Prewarm JS + assets (carpet)
        const unfoldResult = this.unfold(routeDescriptor);

        // 3) Preload HTML page
        PulseRealm.PulsePortalPreloader.preloadPage(routeDescriptor.route);

        // 4) Preload chunks (if any)
        PulseRealm.PulsePortalChunker.preloadChunksForPage(
          routeDescriptor.route,
        );

        // 5) Warmup light
        PulseRealm.PulsePortalWarmup(routeDescriptor.route);

        PulseRealm.PulseLog(
          "portal",
          "[RouteCarpet] PreloadEverything → route:%s, imports:%d, assets:%d",
          routeDescriptor.route,
          (routeDescriptor.imports || []).length,
          (routeDescriptor.assets || []).length,
        );

        return unfoldResult;
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[RouteCarpet] PreloadEverything ERROR →",
          err,
        );
        return { route: predictedPage || "index", prewarmed: 0 };
      }
    },

    // ============================================================
    // ORGANISM MAP
    // ============================================================
    loadOrganismMap() {
      try {
        return getPulseOrganismMapV32() || null;
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[RouteCarpet] loadOrganismMap ERROR →",
          err,
        );
        return null;
      }
    },

    // ============================================================
    // RESOLVE ROUTE (UI pages)
    // ============================================================
    resolveRoute(page) {
      try {
        const name = (page || "").trim();

        // TOUCH-FIRST
        try {
          const touch = PulseRealm.PulseTouch || PulseRealm.PulseTouchPredictor;

          if (touch) {
            if (typeof touch.getRoute === "function") {
              const r = touch.getRoute(name);
              if (r) return r;
            }

            const routes = touch.routes || touch.pages || null;
            if (routes && routes[name]) return routes[name];
          }
        } catch (err) {
          PulseRealm.PulseError(
            "portal",
            "[RouteCarpet] resolveRoute Touch ERROR →",
            err,
          );
        }

        // ORGANISM MAP
        const map = this.loadOrganismMap();
        if (!map) return null;

        const ui =
          map.systemsUI ||
          map.systems["pulse-boot"] ||
          map.systems["pulse-universe"] ||
          map.systems.UI ||
          null;

        if (!ui) return null;

        const pages = ui.pages || ui.routes || null;
        if (!pages) return null;

        return pages[name] || null;
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[RouteCarpet] resolveRoute ERROR →",
          err,
        );
        return null;
      }
    },

    // ============================================================
    // RESOLVE WORLD ROUTE (boot/universe)
    // ============================================================
    resolveWorldRoute(worldRoute) {
      try {
        const name = (worldRoute || "").trim();

        const map = this.loadOrganismMap();
        if (!map) return null;

        const ui =
          map.systemsUI ||
          map.systems["pulse-boot"] ||
          map.systems["pulse-universe"] ||
          map.systems.UI ||
          null;

        if (!ui) return null;

        const pages = ui.pages || ui.routes || null;
        if (!pages) return null;

        return pages[name] || null;
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[RouteCarpet] resolveWorldRoute ERROR →",
          err,
        );
        return null;
      }
    },

    // ============================================================
    // BUILD ROUTE DESCRIPTOR (page → imports + assets)
    // ============================================================
    buildRouteDescriptor(page) {
      try {
        const win = typeof window !== "undefined" ? window : {};
        const loc = win.location || {};
        const doc = typeof document !== "undefined" ? document : null;

        let raw = (page || "").trim();

        if (!raw) {
          try {
            const path = typeof loc.pathname === "string" ? loc.pathname : "/";
            raw = path.split("/").filter(Boolean).pop() || "index";
          } catch {
            raw = "index";
          }
        }

        function normalizeName(name) {
          if (!name) return "";
          let n = name.split("?")[0].split("#")[0];
          n = n.split("/").filter(Boolean).pop() || n;
          n = n.replace(/\.[^./]+$/, ""); // remove extension
          n = n.replace(/[\._-]v?\d+$/i, ""); // remove version suffix
          return n.trim().toLowerCase();
        }

        const base = normalizeName(raw);
        const isIndex = base === "index";

        // INDEX ROUTE
        if (isIndex) {
          const assets = new Set();

          try {
            const href = loc.href;
            if (href) assets.add(href);
          } catch {}

          assets.add("./index.html");

          return {
            route: "index",
            imports: [],
            assets: Array.from(assets),
          };
        }

        // NON‑INDEX ROUTE
        const imports = new Set();
        const assets = new Set();

        function normalizeScript(url) {
          if (!url) return "";
          let u = url.split("?")[0].split("#")[0];
          u = u.split("/").filter(Boolean).pop() || u;
          u = u.replace(/\.[^./]+$/, "");
          u = u.replace(/[\._-]v?\d+$/i, "");
          return u.trim().toLowerCase();
        }

        // 1) Scan <script src="">
        try {
          if (doc && doc.querySelectorAll) {
            const scripts = Array.from(doc.querySelectorAll("script[src]"));
            for (const s of scripts) {
              const src = s.getAttribute("src");
              if (!src) continue;
              if (normalizeScript(src) === base) {
                imports.add(src);
              }
            }
          }
        } catch {}

        // 2) Scan PulseChunks registry
        try {
          const registry = PulseRealm.PulseChunks?.registry || {};
          for (const key of Object.keys(registry)) {
            if (normalizeScript(key) === base) {
              imports.add(key);
            }
          }
        } catch {}

        // 3) Fallback imports if none found
        if (!imports.size) {
          imports.add(`./${base}.js`);
          imports.add(`./${base}-module.js`);
          imports.add(`./${base}_v1.js`);
        }

        // 4) Asset inference
        try {
          const current = typeof loc.pathname === "string" ? loc.pathname : "";
          const currentBase = normalizeName(current);

          if (currentBase !== base && current) {
            assets.add(current);
          }
        } catch {}

        // Standard asset bundle (v40)
        assets.add(`./${base}.assets.json`);
        assets.add(`./${base}.images.json`);
        assets.add(`./${base}.skin.json`);

        return {
          route: base,
          imports: Array.from(imports),
          assets: Array.from(assets),
        };
      } catch (err) {
        try {
          PulseRealm.PulseError(
            "portal",
            "[RouteCarpet] buildRouteDescriptor ERROR →",
            err,
          );
        } catch {}

        return {
          route: "index",
          imports: [],
          assets: ["./index.html"],
        };
      }
    },

    // ============================================================
    // BUILD WORLD DESCRIPTOR (worldRoute → imports + assets)
    // ============================================================
    buildWorldDescriptor(worldRoute) {
      const routeObj = this.resolveWorldRoute(worldRoute);
      if (!routeObj) {
        PulseRealm.PulseWarn(
          "portal",
          "[RouteCarpet] No World Route History for Route:",
          worldRoute,
        );
        return {
          route: worldRoute,
          imports: [`./${worldRoute}.js`],
          assets: [`./${worldRoute}.assets.json`],
        };
      }

      const ROUTE = routeObj.ROUTE || {};
      const imports = []
        .concat(ROUTE.imports || [])
        .concat(ROUTE.js || [])
        .concat(ROUTE.modules || []);
      const assets = []
        .concat(ROUTE.assets || [])
        .concat(ROUTE.json || [])
        .concat(ROUTE.css || [])
        .concat(ROUTE.html || [])
        .concat(ROUTE.images || [])
        .concat(ROUTE.chunks || []);

      return { route: worldRoute, imports, assets };
    },

    // ============================================================
    // UNFOLD (prewarm assets)
    // ============================================================
    unfold(routeDescriptor) {
      try {
        const routeId = routeDescriptor.route;
        const urls = [
          ...(routeDescriptor.imports || []),
          ...(routeDescriptor.assets || []),
        ];

        if (urls.length && PulseRealm.prewarmAssets) {
          PulseRealm.prewarmAssets(urls);
        }

        PulseRealm.PulseLog(
          "portal",
          "%c[RouteCarpet] %cPrewarmed %c→ Route:%s, Assets:%d",
          "color:lightblue; font-weight:bold;",
          "color:#00FF9C;",
          "color:#E8F8FF;",
          routeId,
          urls.length,
        );

        return { route: routeId, prewarmed: urls.length };
      } catch (err) {
        PulseRealm.PulseError("portal", "[RouteCarpet] unfold ERROR →", err);
        return { route: routeDescriptor.route || "unknown", prewarmed: 0 };
      }
    },

    // ============================================================
    // PREDICT NEXT (unchanged logic, cleaned)
    // ============================================================
    predictNext(currentPage, routesOnPage = []) {
      try {
        const page = currentPage || "PulseWorldInventory";
        const mergedRoutes = new Set();

        (routesOnPage || []).forEach((r) => r && mergedRoutes.add(r));

        try {
          const pageRoutes =
            PulseRealm.PulsePageRoutes &&
            PulseRealm.PulsePageRoutes[page] &&
            Array.isArray(PulseRealm.PulsePageRoutes[page])
              ? PulseRealm.PulsePageRoutes[page]
              : [];
          pageRoutes.forEach((r) => r && mergedRoutes.add(r));
        } catch {}

        const allRoutes = Array.from(mergedRoutes);

        if (allRoutes.length) {
          const barrier = allRoutes.find((r) =>
            r.toLowerCase().includes("pulseworldinventory"),
          );
          if (barrier && barrier !== page) return barrier;

          if (allRoutes.length === 1 && allRoutes[0] !== page) {
            return allRoutes[0];
          }

          const alt = allRoutes.find((r) => r !== page);
          if (alt) return alt;
        }

        try {
          const touch = PulseRealm.PulseTouch || PulseRealm.PulseTouchPredictor;
          if (touch && typeof touch.predictNext === "function") {
            const next = touch.predictNext(page);
            if (next) return next;
          }
        } catch (err) {
          PulseRealm.PulseError(
            "portal",
            "[RouteCarpet] predictNext Touch ERROR →",
            err,
          );
        }

        const map = this.loadOrganismMap();
        const ui =
          map.systemsUI ||
          map.systems["pulse-boot"] ||
          map.systems["pulse-universe"] ||
          map.systems.UI ||
          null;
        const pages = ui?.pages || null;

        if (pages) {
          const keys = Object.keys(pages);
          if (keys.length) {
            const meta = pages[page]?.IDENTITY_META || IDENTITY_META;
            if (meta?.NEXT) return meta.NEXT;

            const idx = keys.indexOf(page);
            if (idx >= 0 && idx < keys.length - 1) return keys[idx + 1];
            return keys[0];
          }
        }

        return page;
      } catch (err) {
        PulseRealm.PulseError(
          "portal",
          "[RouteCarpet] predictNext ERROR →",
          err,
        );
        return currentPage || "index";
      }
    },
  };

  PulseRealm.PulseRouteCarpet.ready = () => ({
    identity: "PulseRouteCarpet",
    status: "ready",
    metabolism: "route",
    methods: Object.keys(PulseRealm.PulseRouteCarpet),
  });

  // ============================================================================
  // ⭐ SURFACE META + PORTAL SURFACE PROJECTION v30+
  // ============================================================================
  const safeUA =
    (typeof navigator !== "undefined" && navigator.userAgent) ||
    (typeof window !== "undefined" && window.navigator?.userAgent) ||
    (typeof self !== "undefined" && PulseRealm.navigator?.userAgent) ||
    "unknown-environment";

  const surfaceMetaV30 = Object.freeze({
    ...surfaceMeta,
    version: "30.0-Immortal-Portal+++",

    evo: {
      ...surfaceMeta.evo,
      oneBand: true,
      organismV30Aware: true,
      orbitalAware: true,
      pulseBandUnified: true,
    },

    environment: {
      ...(surfaceMeta.environment || {}),

      // ⭐ upgraded: works in browser, worker, node-like shells, GPU panels, Touch
      userAgent: safeUA,

      multiversalAware: true,
      orbitalFieldAware: true,
      organismMapAware: true,
      oneBandExecution: true,
    },

    contract: {
      ...surfaceMeta.contract,
      always: [
        ...(surfaceMeta.contract.always || []),
        "respect one-band model",
        "respect organism v30 map",
        "respect orbital awareness",
        "respect multiversal environment",
      ],
    },
  });

  PulseRealm.PulseSurface = PulseRealm.PulseSurface
    ? Object.freeze({ ...PulseRealm.PulseSurface, ...surfaceMetaV30 })
    : surfaceMetaV30;

  // ============================================================================
  // PULSEPORTAL PRELOADERS / HELPERS
  // ============================================================================
  // HTML PAGE PRELOADER (best-effort, no assumptions about "pages" registry)
  PulseRealm.PulsePortalPreloader = PulseRealm.PulsePortalPreloader || {
    preloadPage(pageId) {
      try {
        if (!pageId || pageId === "index") return;

        // ⭐ Case-mapping registry — Netlify (Linux) is case-sensitive.
        //    normalizeName() lowercases route names, but actual .txt files
        //    on disk use PascalCase. This map restores the correct casing.
        const PULSE_ROUTE_CASE_MAP = {
          pulseworldreality: "PulseWorldReality",
          pulseworlddomain: "PulseWorldDomain",
          "pulse-engine-block": "PULSE-ENGINE-BLOCK",
          pulseworldinventory: "PulseWorldInventory",
          pulseworldrewards: "PulseWorldRewards",
          pulseworldvault: "PulseWorldVault",
          pulseworldmeshlink: "PulseWorldMeshLink",
          pulseworldassets: "PulseWorldAssets",
          pulseworldchallenge: "PulseWorldChallenge",
          pulsepalsettings: "PulsePalSettings",
          pulseworldscanner: "PulseWorldScanner",
          pulseworldemail: "PulseWorldEmail",
          pulseworldfounders: "PulseWorldFounders",
          pulseworldteam: "PulseWorldTeam",
          pulseworldskills: "PulseWorldSkills",
          pulseworldbinaryos: "PulseWorldBinaryOS",
          pulseworldbooleanlogic: "PulseWorldBooleanLogic",
          pulseworlddimensions: "PulseWorldDimensions",
          pulseworldgpuprocessing: "PulseWorldGPUProcessing",
          pulseworldorbital: "PulseWorldOrbital",
          pulseworldserviceworker: "PulseWorldServiceWorker",
          pulseworldpaymentsuccess: "PulseWorldPaymentSuccess",
          pulseworldreferralcode: "PulseWorldReferralCode",
          pulseworldtrustlink: "PulseWorldTrustLink",
          pulseworldtrustsuccess: "PulseWorldTrustSuccess",
          pulseworldvaultsetupcomplete: "PulseWorldVaultSetupComplete",
          pulseevolutionarypage: "PulseEvolutionaryPage",
          openapp: "openapp",
          returntoapp: "returntoapp",
        };

        const resolvedId = PULSE_ROUTE_CASE_MAP[pageId.toLowerCase()] || pageId;

        const htmlPath = `./PULSEConfig/${resolvedId}.txt`;

        // ⭐ 1. Browser-level prefetch (weak hint)
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = htmlPath;
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        PulseRealm.PulseLog(
          "portal",
          "[PulsePortalPreloader] Browser Prefetch HTML:",
          htmlPath,
        );

        // ⭐ 2. Mini Fetch — ONLY for TXT/HTML
        if (htmlPath.match(/\.(txt|html)$/i)) {
          fetch(htmlPath, { cache: "force-cache" })
            .then(() => {
              PulseRealm.PulseLog(
                "portal",
                "[PulsePortalPreloader] Mini Fetch Warmed Browser Cache:",
                htmlPath,
              );
            })
            .catch((err) => {
              PulseRealm.PulseWarn(
                "portal",
                "[PulsePortalPreloader] Mini Fetch ERROR →",
                err,
              );
            });
        }
      } catch (err) {
        PulseRealm.PulseWarn(
          "portal",
          "[PulsePortalPreloader] Pulse World Portal ERROR →",
          err,
        );
      }
    },

    // ⭐ WORLD ROUTE PRELOADER (same upgrade)
    preloadWorld(routeId) {
      try {
        if (!routeId || routeId === "index") return;

        // ⭐ Reuse the same case-mapping as preloadPage
        const resolvedId =
          (PulseRealm.PulsePortalPreloader._caseMap || {})[
            routeId.toLowerCase()
          ] || routeId;

        const ext = ".txt";

        const worldPath = `./PULSEConfig/${resolvedId}${ext}`;

        // ⭐ Browser-level prefetch
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = worldPath;
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        PulseRealm.PulseLog(
          "portal",
          "[PulsePortalPreloader] Browser Prefetch Route:",
          worldPath,
        );
      } catch (err) {
        PulseRealm.PulseWarn(
          "portal",
          "[PulsePortalPreloader] Pulse World Route ERROR →",
          err,
        );
      }
    },
  };

  // ROUTE IMAGE SCANNER (grounded in DOM + PageScanner if present)
PulseRealm.__PULSE_SCAN_ROUTE_IMAGES__ =
  PulseRealm.__PULSE_SCAN_ROUTE_IMAGES__ ||
  async function (htmlPath) {
    try {
      // If you have a real page scanner, delegate
      if (
        PulseRealm.PulsePageScanner &&
        typeof PulseRealm.PulsePageScanner.scanRouteImages === "function"
      ) {
        PulseRealm.PulsePageScanner.scanRouteImages(htmlPath);
        return;
      }

      // -----------------------------
      // ⭐ FETCH TXT OR HTML FILE
      // -----------------------------
      let text = "";
      try {
        text = await fetch(htmlPath, { cache: "force-cache" }).then(r => r.text());
      } catch (err) {
        PulseRealm.PulseWarn(
          "portal",
          "[PulsePortal::RouteImages] Fetch failed, falling back to DOM scan →",
          err
        );

        // Fallback: scan current DOM (bulk only)
        const results = new Set();

        // <img src> + <img srcset>
        const imgs = document.querySelectorAll("img");
        for (const img of imgs) {
          const src = img.getAttribute("src");
          if (src) results.add(src);

          const srcset = img.getAttribute("srcset");
          if (srcset) {
            const parts = srcset.split(",").map(x => x.trim().split(" ")[0]);
            for (const p of parts) results.add(p);
          }
        }

        // <video poster>
        const videos = document.querySelectorAll("video[poster]");
        for (const v of videos) {
          const poster = v.getAttribute("poster");
          if (poster) results.add(poster);
        }

        // inline CSS backgrounds
        const all = document.querySelectorAll("*");
        for (const el of all) {
          const inline = el.getAttribute("style");
          if (inline && inline.includes("url(")) {
            const matches = inline.match(/url\((.*?)\)/g);
            if (matches) {
              for (const m of matches) {
                const url = m.replace(/url\((['"]?)(.*?)\1\)/, "$2");
                if (url) results.add(url);
              }
            }
          }
        }

        PulseRealm.PulseLog(
          "portal",
          "[PulsePortal::RouteImages] Fallback DOM Scan for",
          htmlPath,
          "→",
          results.size,
          "unique src"
        );
        return;
      }

      // -----------------------------
      // ⭐ PARSE TXT OR HTML AS HTML
      // -----------------------------
      const doc = new DOMParser().parseFromString(text, "text/html");

      const results = new Set();

      // <img src> + <img srcset>
      const imgs = doc.querySelectorAll("img");
      for (const img of imgs) {
        const src = img.getAttribute("src");
        if (src) results.add(src);

        const srcset = img.getAttribute("srcset");
        if (srcset) {
          const parts = srcset.split(",").map(x => x.trim().split(" ")[0]);
          for (const p of parts) results.add(p);
        }
      }

      // <source srcset>
      const sources = doc.querySelectorAll("source[srcset]");
      for (const s of sources) {
        const set = s.getAttribute("srcset");
        if (!set) continue;
        const parts = set.split(",").map(x => x.trim().split(" ")[0]);
        for (const p of parts) results.add(p);
      }

      // <video poster>
      const videos = doc.querySelectorAll("video[poster]");
      for (const v of videos) {
        const poster = v.getAttribute("poster");
        if (poster) results.add(poster);
      }

      // inline CSS backgrounds
      const all = doc.querySelectorAll("*");
      for (const el of all) {
        const inline = el.getAttribute("style");
        if (inline && inline.includes("url(")) {
          const matches = inline.match(/url\((.*?)\)/g);
          if (matches) {
            for (const m of matches) {
              const url = m.replace(/url\((['"]?)(.*?)\1\)/, "$2");
              if (url) results.add(url);
            }
          }
        }
      }

      PulseRealm.PulseLog(
        "portal",
        "[PulsePortal::RouteImages] Pulse World Portal Scanned Route File:",
        htmlPath,
        "→",
        results.size,
        "unique src"
      );

    } catch (err) {
      PulseRealm.PulseWarn(
        "portal",
        "[PulsePortal::RouteImages] Pulse World Portal ERROR Found →",
        err
      );
    }
  };


  // CHUNK PRELOADER (grounded in PulseChunks registry / fetchChunk)
  PulseRealm.PulsePortalChunker = PulseRealm.PulsePortalChunker || {
    preloadChunksForPage(pageId) {
      try {
        if (!pageId) return;

        const registry = PulseRealm.PulseChunks.registry || {};
        const keys = Object.keys(registry);

        // Heuristic: preload any chunk whose key includes the pageId
        const targets = keys.filter((k) =>
          k.toLowerCase().includes(pageId.toLowerCase()),
        );

        if (!targets.length) {
          PulseRealm.PulseLog(
            "portal",
            "[PulsePortalChunker] No Pulse Chunks Matched Page:",
            pageId,
          );
          return;
        }

        PulseRealm.PulseLog(
          "portal",
          "[PulsePortalChunker] Preloading Pulse Chunks for Page:",
          pageId,
          "→",
          targets.length,
          "chunks",
        );

        for (const key of targets) {
          try {
            if (typeof fetchChunk === "function") {
              fetchChunk(key).catch(() => {});
            }
          } catch {}
        }
      } catch (err) {
        PulseRealm.PulseWarn("portal", "[PulsePortalChunker] ERROR →", err);
      }
    },

    // ⭐ NEW: WORLD ROUTE CHUNK PRELOADER
    preloadChunksForWorld(routeId) {
      try {
        if (!routeId) return;

        const registry = PulseRealm.PulseChunks.registry || {};
        const keys = Object.keys(registry);

        // World routes often have different naming patterns:
        // PulseWorldReality, world-*, galaxy-*, boot-*, etc.
        const routeKey = routeId.toLowerCase();

        const targets = keys.filter((k) => k.toLowerCase().includes(routeKey));

        if (!targets.length) {
          PulseRealm.PulseLog(
            "portal",
            "[PulsePortalChunker] No Pulse Chunks Matched World Route:",
            routeId,
          );
          return;
        }

        PulseRealm.PulseLog(
          "portal",
          "[PulsePortalChunker] Preloading Pulse Chunks for World Route:",
          routeId,
          "→",
          targets.length,
          "chunks",
        );

        for (const key of targets) {
          try {
            if (typeof fetchChunk === "function") {
              fetchChunk(key).catch(() => {});
            }
          } catch {}
        }
      } catch (err) {
        PulseRealm.PulseWarn(
          "portal",
          "[PulsePortalChunker] WORLD ERROR →",
          err,
        );
      }
    },
  };

  PulseRealm.PulsePortal =
    PulseRealm.PulsePortal ||
    Object.freeze({
      // ------------------------------------------------------------------------
      // CORE META + ENVIRONMENT
      // ------------------------------------------------------------------------
      meta: surfaceMetaV30,
      env: PulseSurfaceEnvironment,
      logger: PulseVitalsLogger,

      // ------------------------------------------------------------------------
      // v30+ Signal Snapshot API (ONE-BAND)
      // ------------------------------------------------------------------------
      getSignal() {
        return __PulsePortalGetSignalSnapshot();
      },

      ready() {
        try {
          return {
            identity: "PulsePortal",
            status: "ready",
            meta: PulseRealm.PulsePortal.meta || null,
            env: PulseRealm.PulsePortal.env || null,
            touch: PulseRealm.PulsePortal.touch || null,
            routes: PulseRealm.PulsePortal.routeMemory || null,
            compiler: PulseRealm.PulsePortal.compiler || null,
            vitals: PulseRealm.PulsePortal.vitals || null,
          };
        } catch (err) {
          return { identity: "PulsePortal", status: "error", err };
        }
      },

      // ------------------------------------------------------------------------
      // LEGACY FIELDS — PRESERVED
      // ------------------------------------------------------------------------
      vitals: PulseVitalsMonitor,
      ui: {
        errors: PulseUIErrors,
        flow: PulseUIFlow,
      },
      skinReflex: PulseSkinReflex,
      pageScanner: PulseRealm.PulsePageScanner,
      routeMemory: PulseUIRouteMemory,
      compiler: PulseUICompiler,

      bridge: {
        route: PulseRealm.PulseBridgeRoute,
        log,
        warn,
        error,
        startUnderstanding: startUnderstanding,
        bootBinaryOrganism: PulseBinaryOrganismBoot,
      },

      admin: {
        createAdminDiagnosticsOrgan,
        createPulseWorldAdminPanel,
      },

      touch: PulseRealm.__PULSE_TOUCH__ || null,

      db: PulseRealm.PulseFirebaseDB,
    });

  PulseRealm.PulseLog(
    "portal",
    "%c[PulsePortal::Surface] %cPulse World Portal Projection Active (v30+ IMMORTAL ONE-BAND)",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;",
  );
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "[PulsePortal::Boot] Pulse World Portal Found a FATAL ERROR →",
    err,
  );
}

// ------------------------------------------------------------------------
// PULSEBAND ONE-BAND HANDLER (v36, via PulseSignalPort)
// ------------------------------------------------------------------------

PulseRealm.PulseLog(
  "portal",
  "%c[PulsePortal::PulseBand] %cPulse World PulseBand Handler Active (v36+ ONE-BAND via PulseSignalPort)",
  "color:gold; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;",
);

PulseRealm.PulseBand?.on("request", async (packet) => {
  try {
    ProtocolSignalPort.emit("PulseBand", {
      type: packet.type,
      sessionId: packet.sessionId,
      userId: packet.userId,
      band: ONE_BAND.id || "PulseBand",
      payload: packet,
    });

    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::PulseBand] %c→ Pulse World PulseBand  Online → Primary Nerve Fired → Signal Emitted (Beast Mode Initiated..)",
      "color:gold; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
    );
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::PulseBand] %Pulse World PulseBand  Offline → Primary Nerve Failed → SIGNAL FAILED %c→ %s",
      "color:gold; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }
});

PulseRealm.PulseBandStart = (opts) => PulseRealm.PulseBand.start(opts);

// ------------------------------------------------------------------------
// PULSENET_INGRESS + PULSENET_FASTLANE LISTENERS v36 (via PulseSignalPort)
// ------------------------------------------------------------------------

PulseRealm.PulseBand?.on("PULSENET_INGRESS", async (payload) => {
  try {
    ProtocolSignalPort.emit("pulsenet:ingress", {
      ...payload,
      band: ONE_BAND.id || "PulseBand",
    });

    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::PulseNet] %cPulse World PulseNet Ingress %c→ Received → Beast Nerve Activated!",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
      "color:#E8F8FF; font-family:monospace;",
    );
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::PulseNet] %cPulse World PulseNet Ingress FAILED %c→ %s",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }
});

PulseRealm.PulseBand?.on("PULSENET_FASTLANE", async (payload) => {
  try {
    ProtocolSignalPort.emit("pulsenet:fastlane", {
      ...payload,
      band: ONE_BAND.id || "PulseBand",
    });

    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::PulseNet] %cPulse World PulseNet Fastlane %c→ Pulse → Reflex Nerve Fired!",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
      "color:#E8F8FF; font-family:monospace;",
    );
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::PulseNet] %cPulse World PulseNet Fastlane FAILED %c→ %s",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }
});

// ============================================================================
// ⭐ ROUTE DISCOVERY v34 — Dual Universe (External HTML + Internal PulseWorld)
// ============================================================================
function detectRoutesOnPageSync() {
  try {
    // ------------------------------------------------------------
    // INTERNAL MODE (PulseWorld)
    // ------------------------------------------------------------
    if (PulseRealm.PulseBarrier?.getCurrentCoordinate) {
      try {
        const coord = PulseRealm.PulseBarrier.getCurrentCoordinate();
        if (!coord) return [];

        const nextCoords =
          PulseRealm.PulseBarrier.predictNextCoordinates(coord) || [];

        return nextCoords
          .map((c) => {
            try {
              return PulseRealm.PulseBarrier.interpretCoordinates(c);
            } catch {
              return null;
            }
          })
          .filter(Boolean);
      } catch {
        // If PulseBarrier fails, fall through to external mode
      }
    }

    // ------------------------------------------------------------
    // EXTERNAL MODE (Normal HTML website)
    // ------------------------------------------------------------
    const routes = new Set();

    // Safe environment guards
    const win = typeof window !== "undefined" ? window : {};
    const doc = typeof document !== "undefined" ? document : null;

    if (!doc || !doc.querySelectorAll) {
      return [];
    }

    // ------------------------------------------------------------
    // Route normalizer (safe URL parsing)
    // ------------------------------------------------------------
    const normalizeRoute = (href) => {
      if (!href) return null;

      try {
        const base = win.location?.href || "http://localhost/";
        const url = new URL(href, base);

        const file = url.pathname.split("/").pop().toLowerCase();
        if (!file.endsWith(".html")) return null;

        return file.replace(".html", "");
      } catch {
        return null;
      }
    };

    // ------------------------------------------------------------
    // 1) <a href="*.html">
    doc.querySelectorAll("a[href]").forEach((a) => {
      const r = normalizeRoute(a.getAttribute("href"));
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 2) data-route
    doc.querySelectorAll("[data-route]").forEach((el) => {
      const r = normalizeRoute(el.getAttribute("data-route"));
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 3) route=""
    doc.querySelectorAll("[route]").forEach((el) => {
      const r = normalizeRoute(el.getAttribute("route"));
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 4) data-navigate
    doc.querySelectorAll("[data-navigate]").forEach((el) => {
      const r = normalizeRoute(el.getAttribute("data-navigate"));
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 5) data-pulse-route
    doc.querySelectorAll("[data-pulse-route]").forEach((el) => {
      const r = normalizeRoute(el.getAttribute("data-pulse-route"));
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 6) pulse-route
    doc.querySelectorAll("[pulse-route]").forEach((el) => {
      const r = normalizeRoute(el.getAttribute("pulse-route"));
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 7) onclick navigation
    doc.querySelectorAll("[onclick]").forEach((el) => {
      const code = el.getAttribute("onclick");
      if (!code) return;

      const match = code.match(/['"]([^'"]+\.html)['"]/);
      if (match) {
        const r = normalizeRoute(match[1]);
        if (r) routes.add(r);
      }
    });

    // ------------------------------------------------------------
    // 8) Buttons with navigation intent
    doc.querySelectorAll("button").forEach((btn) => {
      const nav =
        btn.getAttribute("navigate") ||
        btn.getAttribute("to") ||
        btn.getAttribute("goto");

      const r = normalizeRoute(nav);
      if (r) routes.add(r);
    });

    // ------------------------------------------------------------
    // 9) Shadow DOM scanning
    doc.querySelectorAll("*").forEach((el) => {
      try {
        if (el.shadowRoot) {
          el.shadowRoot.querySelectorAll("a[href]").forEach((a) => {
            const r = normalizeRoute(a.getAttribute("href"));
            if (r) routes.add(r);
          });
        }
      } catch {
        // ShadowRoot may throw in some environments
      }
    });

    // ------------------------------------------------------------
    // 10) Route hints
    if (PulseRealm.PulseRouteHints && Array.isArray(PulseRealm.PulseRouteHints)) {
      PulseRealm.PulseRouteHints.forEach((r) => {
        const nr = normalizeRoute(r + ".html");
        if (nr) routes.add(nr);
      });
    }

    return Array.from(routes);
  } catch {
    return [];
  }
}

// ============================================================================
// ⭐ SAVE PAGE/WORLD ROUTES v34 — Dual Universe
// ============================================================================
function savePageRoutesDaily(page, routes) {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const snap = PulseRealm.PulsePageRouteSnapshot || {};

    if (snap.date === today && snap.routes[page]) return;

    snap.date = today;
    snap.routes = snap.routes || {};

    snap.routes[page] = {
      // External = HTML routes
      // Internal = world routes
      routes,
      ts: PulseRealm.PulseNOW,
      presence: PulseRealm.PulsePresenceIntensity || "unknown",
      binaryRisk: PulseRealm.PulseBinaryRisk || "low",
      moduleRisk: PulseRealm.PulseModuleRisk || "none",
      warmupHints: PulseRealm.PulseWarmupHints || [],
      predictorHints: PulseRealm.PulsePredictorHints || [],
      chunkHints: PulseRealm.PulseChunkHints || [],
    };

    PulseRealm.PulsePageRouteSnapshot = snap;

    setdoc(
      doc(PulseRealm.PulseFirebaseDB, "pulse_page_routes_v30", "daily"),
      snap,
    );
  } catch (err) {
    PulseRealm.PulseError("portal", "[PortalRouteSave:v34] FAILED →", err);
  }
}

// ============================================================================
// ⭐ SIGNAL SNAPSHOT EXPORT v30+ (IMMORTAL ONE-BAND SNAPSHOT)
// Portal exposes the merged signal snapshot from PulseSignalPort / PulsePort.
// ProofSignal is fully deprecated and removed.
// ============================================================================

function __PulsePortalGetSignalSnapshot() {
  try {
    // 1. v30+ canonical: PulseSignalPort (new organ)
    if (ProtocolSignalPort.getSnapshot) {
      const snap = ProtocolSignalPort.getSnapshot();
      if (snap) return snap;
    }

    // 2. Legacy-but-valid: PulsePort.Global.signal
    if (PulseRealm.PulsePort.Global.signal) {
      return PulseRealm.PulsePort.Global.signal;
    }

    // 3. Older organ: PulseSignal.getState()
    if (PulseRealm.PulseSignals.getState) {
      return PulseRealm.PulseSignals.getState();
    }

    return PulseRealm.__PULSE_LAST_SIGNAL__ || null;
  } catch {
    return null;
  }
}

// ============================================================================
// SURFACE MEMBRANE INITIALIZATION — LOGGER + MONITOR + ERRORS + SKIN REFLEX v30+
// ============================================================================
try {
  if (PulseVitalsMonitor && typeof PulseVitalsMonitor.PulseRole === "object") {
    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::Vitals] %cPulse World Portal Vitals Monitor Online (v30+)",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
    );
  }

  if (PulseVitalsLogger && typeof PulseVitalsLogger.meta === "object") {
    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::Logger] %cPulse World Portal Vitals Logger Active (v30+)",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
    );
  }
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "%c[PulsePortal::Vitals/Logger] %cPulse World Portal Vitals Organs had a Failure %c→ %s",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err),
  );
}

try {
  PulseUIErrors.init();
  PulseRealm.PulseLog(
    "portal",
    "%c[PulsePortal::UIErrors] %cPulse World Portal Errors Spine Initialized (v30+)",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;",
  );
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "%c[PulsePortal::UIErrors] %cPulse World Portal Errors FAILED %c→ %s",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err),
  );
}

if (PulseRealm.PulseSkinReflex.membraneAlive) {
  try {
    PulseSkinReflex.membraneAlive("Portal-v30");
    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::SkinReflex] %cPulse World Portal Membrane Alive (v30+)",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
    );
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::SkinReflex] %cPulse World Portal FAILED %c→ %s",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }
}
// ============================================================================
// BINARY ORGANISM + UNDERSTANDING + UI FLOW BOOT — v30+ IMMORTAL PORTAL
// ONE-BAND • ORGANISM v30-AWARE • READ-ONLY BINARY SHADOW
// ============================================================================

(async () => {
  try {
    let binary = null;

    // ----------------------------------------------------------------------
    // BINARY ORGANISM BOOT — GLOBAL PulseBinary (NO Kernel, ONE-BAND TAG)
    // ----------------------------------------------------------------------
    try {
      if (PulseRealm.PulseBinary) {
        binary = PulseRealm.PulseBinary;
      } else if (typeof PulseBinaryOrganismBoot === "function") {
        binary = PulseBinaryOrganismBoot({
          trace: false,
          band: ONE_BAND.id || "PulseBand",
        });
      }

      if (binary) {
        PulseRealm.__PulseBinaryBooted = true;

        // ------------------------------------------------------------
        // 1. PURE SNAPSHOT (SAFE FOR INDEXEDDB)
        // ------------------------------------------------------------
        const pureSnapshot = {
          meta: PulseBinaryOrganismBoot.layer
            ? {
                layer: PulseBinaryOrganismBoot.layer,
                role: PulseBinaryOrganismBoot.role,
                version: PulseBinaryOrganismBoot.version,
                lineage: PulseBinaryOrganismBoot.lineage,
                evo: PulseBinaryOrganismBoot.evo,
                band: ONE_BAND.id || "PulseBand",
                projection: "read-only-binary-shadow",
              }
            : null,
        };

        // ------------------------------------------------------------
        // 2. RUNTIME SHADOW (FUNCTIONS ONLY — NOT STORED)
        // ------------------------------------------------------------
        const runtimeShadow = {
          Vitals: {
            generate: () =>
              binary.vitals?.generateVitals
                ? binary.vitals.generateVitals()
                : null,
          },

          Consciousness: {
            latest: () =>
              binary.consciousness?.generateConsciousnessPacket
                ? binary.consciousness.generateConsciousnessPacket()
                : null,
          },

          Sentience: {
            snapshot:
              typeof binary.sentience?.snapshot === "function"
                ? () => binary.sentience.snapshot()
                : () => null,
          },
        };

        // ------------------------------------------------------------
        // 3. MERGE SNAPSHOT + RUNTIME INTO FINAL PULSEBINARY
        // ------------------------------------------------------------
        PulseRealm.PulseBinary = Object.freeze({
          ...pureSnapshot,
          ...runtimeShadow,
        });

        PulseRealm.PulseLog(
          "portal",
          "%c[PulsePortal::Binary] %cPulse World Portal Organism Booted + Wired & Ready (v30+ ONE-BAND)",
          "color:lightblue; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
        );
      } else {
        PulseRealm.PulseError(
          "portal",
          "%c[PulsePortal::Binary] %cPulse World Portal NO ORGANISM AVAILABLE",
          "color:lightblue; font-weight:bold; font-family:monospace;",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        );
      }
    } catch (err) {
      PulseRealm.PulseError(
        "portal",
        "%c[PulsePortal::Binary] %cPulse World Portal BOOT FAILED %c→ %s",
        "color:lightblue; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err),
      );
    }

    // ----------------------------------------------------------------------
    // UNDERSTANDING BOOT — HIGH-LEVEL ORGANISM CONTEXT (CORTEX ENTRY v30+)
    // ----------------------------------------------------------------------
    function safeMeta(meta) {
      if (!meta || typeof meta !== "object") return {};
      const out = { ...meta };
      delete out.performance;
      delete out.timing;
      delete out.navigation;
      delete out.memory;
      return out;
    }

    function safeEnv(env) {
      if (!env || typeof env !== "object") return {};
      const out = { ...env };
      delete out.performance;
      delete out.timing;
      delete out.navigation;
      delete out.memory;
      delete out.window;
      delete out.document;
      delete out.location;
      delete out.history;
      return out;
    }

    try {
      if (typeof PulseUnderstanding.boot === "function") {
        const safeBootPacket = {
          meta: safeMeta({
            ...baseMetaPack,
            band: ONE_BAND.id || "PulseBand",
          }),
          env: safeEnv(PulseSurfaceEnvironment),
          binary: PulseRealm.PulseBinary || null,
          organismMap: PulseRealm.PulseOrganismMap || null,
        };

        PulseUnderstanding.boot(safeBootPacket);

        PulseRealm.PulseLog(
          "portal",
          "%c[PulsePortal::Understanding] %cPulse World Understanding Boot Complete (v30+)",
          "color:lightblue; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
        );
      }
    } catch (err) {
      PulseRealm.PulseError(
        "portal",
        "%c[PulsePortal::Understanding] %cPulse World Understanding FAILED %c→ %s",
        "color:lightblue; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err),
      );
    }

    // ----------------------------------------------------------------------
    // UI FLOW BOOT — FRONTEND FLOW ORGAN v30+ (ONE-BAND CONTEXT)
    // ----------------------------------------------------------------------
    try {
      if (
        PulseRealm.PulseUIFlow &&
        typeof PulseRealm.PulseUIFlow.init === "function"
      ) {
        PulseRealm.PulseUIFlow.init({
          meta: safeMeta({
            ...baseMetaPack,
            band: ONE_BAND.id || "PulseBand",
          }),
          env: safeEnv(PulseSurfaceEnvironment),
          organismMap: PulseRealm.PulseOrganismMap || null,
        });

        PulseRealm.PulseLog(
          "portal",
          "%c[PulsePortal::UIFlow] %cPulse World UIFlow Initialized (v30+)",
          "color:lightblue; font-weight:bold; font-family:monospace;",
          "color:#00FF9C; font-family:monospace;",
        );
      }
    } catch (err) {
      PulseRealm.PulseError(
        "portal",
        "%c[PulsePortal::UIFlow] %cPulse World UIFlow FAILED %c→ %s",
        "color:lightblue; font-weight:bold; font-family:monospace;",
        "color:#FF3B3B; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
        String(err),
      );
    }
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::Boot] %cPulse World Portal Boot FAILED %c→ %s",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }
})();

// ============================================================================
// UI FLOW CONTEXT PROJECTION — OPTIONAL, READ-ONLY SURFACE VIEW v30+
// ============================================================================

try {
  if (typeof PulseRealm.PulseUIFlow === "function") {
    const flowContext = PulseRealm.PulseUIFlow();

    PulseRealm.PulseUI = PulseRealm.PulseUI
      ? Object.freeze({
          ...PulseRealm.PulseUI,
          Flow: PulseRealm.PulseUIFlow,
          context: flowContext,
        })
      : Object.freeze({
          Flow: PulseRealm.PulseUIFlow,
          context: flowContext,
        });

    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::UIFlow] %cPulse World UIFlow Context Projected (v30+)",
      "color:lightblue; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
    );
  }
} catch (flowErr) {
  PulseRealm.PulseError(
    "portal",
    "%c[PulsePortal::UIFlow] %cPulse World UIFlow CONTEXT FAILED %c→ %s",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(flowErr),
  );
}

// ============================================================================
// PULSEBAND BOOT — v30+ ONE‑BAND IMMORTAL SESSION BRIDGE
//  • Unifies injected PulseBand / pulseband
//  • Logger-aware proxy
//  • Chunk-session marker with v30+ meta
// ============================================================================

try {
  // ---------------------------------------------------------------
  // Attach PulseBand from pre-injected pulseband / PulseBand if present
  // ---------------------------------------------------------------
  try {
    const injectedBand =
      PulseRealm.PulseBand || PulseRealm.PulseUnderstandingPulseBand || null;

    if (!injectedBand) {
      PulseRealm.PulseWarn(
        "portal",
        "%c[PulsePortal::PulseBand] %cPulse World PulseBand No Injected PulseBand Instance Found (v30+)",
        "color:gold; font-weight:bold; font-family:monospace;",
        "color:#FFE066; font-family:monospace;",
      );
    } else {
      // Normalize to PulseRealm.PulseBand
      PulseRealm.PulseBand = injectedBand;

      PulseRealm.PulseLog(
        "portal",
        "%c[PulsePortal::PulseBand] %cPulse World PulseBand Bridge Attached (v30+ ONE-BAND)",
        "color:gold; font-weight:bold; font-family:monospace;",
        "color:#00FF9C; font-family:monospace;",
      );

      // -----------------------------------------------------------
      // Attach proxy handler once (v30+ tag)
      // -----------------------------------------------------------
      // -----------------------------------------------------------
      // Attach PulseBand → PulseSignalPort bridge (v36 upgrade)
      // -----------------------------------------------------------

      PulseRealm.PulseBand.on("request", async (packet) => {
        try {
          // Instead of building URLs, methods, bodyOrQuery, fetch, etc…
          // We simply forward the packet into the unified signal layer.
          ProtocolSignalPort.emit("PulseBand", {
            type: packet.type,
            sessionId: packet.sessionId,
            userId: packet.userId,
            band: ONE_BAND.id || "PulseBand",
            payload: packet,
          });

          PulseRealm.PulseLog(
            "portal",
            "%c[PulsePortal::PulseBand] %c→ Pulse World PulseBand World Sync Achieved → Organism Fully Awake (Beast Mode Activated!)",
            "color:gold; font-weight:bold; font-family:monospace;",
            "color:#00FF9C; font-family:monospace;",
          );
        } catch (err) {
          PulseRealm.PulseError(
            "portal",
            "%c[PulsePortal::PulseBand] %cPulse World PulseBand World Sync Offline → Organism Still Asleep → SIGNAL FAILED %c→ %s",
            "color:gold; font-weight:bold; font-family:monospace;",
            "color:#FF3B3B; font-weight:bold; font-family:monospace;",
            "color:#FFE066; font-family:monospace;",
            String(err),
          );
        }
      });

      // -----------------------------------------------------------
      // Normalized start helper
      // -----------------------------------------------------------
      PulseRealm.PulseBandStart = (opts) =>
        PulseRealm.PulseBand && typeof PulseRealm.PulseBand.start === "function"
          ? PulseRealm.PulseBand.start(opts)
          : null;
    }
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::PulseBand] %cPulse World PulseBand BOOT FAILED %c→ %s",
      "color:gold; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }

  // local safeEnv for this block so structure stays the same above
  function safeEnvForBand(env) {
    if (!env || typeof env !== "object") return {};
    const out = { ...env };
    delete out.performance;
    delete out.timing;
    delete out.navigation;
    delete out.memory;
    delete out.window;
    delete out.document;
    delete out.location;
    delete out.history;
    return out;
  }

  // CHUNK SESSION START — OPTIONAL, CHUNK-AWARE SESSION MARKER (v30+)
  try {
    PulseRealm.PulseBandStart({
      type: "chunk-session",
      surface: "PulsePortal-v30",
      environment: safeEnvForBand(PulseSurfaceEnvironment),
      version: "30.0-Immortal-Evo+++",
      band: ONE_BAND.id || "PulseBand",
    });

    PulseRealm.PulseLog(
      "portal",
      "%c[PulsePortal::PulseBand] %cPulse World PulseBand Chunk-Session Started (v30+)",
      "color:gold; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
    );
  } catch (err) {
    PulseRealm.PulseError(
      "portal",
      "%c[PulsePortal::PulseBand] %cPulse World PulseBand CHUNK SESSION FAILED %c→ %s",
      "color:gold; font-weight:bold; font-family:monospace;",
      "color:#FF3B3B; font-weight:bold; font-family:monospace;",
      "color:#FFE066; font-family:monospace;",
      String(err),
    );
  }
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "%c[PulsePortal::PulseBand] %cPulse World PulseBand CHUNK SESSION BOOT FAILED %c→ %s",
    "color:gold; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err),
  );
}

// ============================================================================
// ROUTE MEMORY v34 — IndexedDB + Barrier-aware world route
// ============================================================================

export async function getLastRouteFromIndexedDB() {
  const db = await openPulseDB();
  return await new Promise((resolve) => {
    const tx = db.transaction(ROUTE_STORE, "readonly");
    const store = tx.objectStore(ROUTE_STORE);
    const req = store.openCursor(null, "prev"); // last inserted
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      resolve(cursor ? cursor.value.route : null);
    };
    req.onerror = () => resolve(null);
  });
}
function interpretCoordinates(coord) {
  if (!coord || typeof coord !== "string") return null;
  const parts = coord.split(".");
  const node = parts[parts.length - 1];
  const map = {
    "INDEX": "PulseWorldReality",
    "LOGIN": "PulseWorldReality",
    "FOUNDERS": "PulseWorldFounders",
    "TEAM": "PulseWorldTeam",
    "BANK": "PulseWorldRewards",
    "REWARDS": "PulseWorldRewards",
    "VAULT": "PulseWorldVault",
    "ENGINE": "PulseWorldEngine",
    "SCANNER": "PulseWorldScanner",
    "CAMERA": "PulseWorldScanner",
    "ASSETS": "PulseWorldAssets",
    "CRYPTO": "PulseWorldAssets",
    "SETTINGS": "PulsePalSettings",
    "USERPROFILE": "PulseWorldInventory",
    "MESH": "PulseWorldMeshLink",
    "INVENTORY": "PulseWorldInventory",
    "DASHBOARD": "PulseWorldInventory",
    "ROUTE": "PulseWorldReality"
  };
  return map[node] || null;
}

export async function buildRouteId() {
  try {
    // -------------------------------------------------------------
    // Safe path extraction (works in browser, worker, PWA, offline)
    // -------------------------------------------------------------
    const win = typeof window !== "undefined" ? window : {};
    const loc = win.location || {};
    const path = typeof loc.pathname === "string" ? loc.pathname : "/";

    // -------------------------------------------------------------
    // Safe last-route lookup
    // -------------------------------------------------------------
    let lastRoute = null;
    try {
      lastRoute = await getLastRouteFromIndexedDB();
    } catch {
      lastRoute = null;
    }

    if (path === lastRoute && lastRoute) return lastRoute;

    // -------------------------------------------------------------
    // Safe PulseOrganismMap access
    // -------------------------------------------------------------
    let map = null;
    try {
      map = PulseRealm.PulseOrganismMap || null;
    } catch {
      PulseRealm.PulseWarn(
        "portal",
        "[RouteCarpet] Map Access Failed → Ignoring Map!",
      );
      map = null;
    }

    // -------------------------------------------------------------
    // Route resolution via UI.pages
    // -------------------------------------------------------------
    if (map && map.systems && map.systems.UI && map.systems.UI.pages) {
      const pages = map.systems.UI.pages;

      for (const key of Object.keys(pages)) {
        const page = pages[key] || {};
        const meta =
          page.IDENTITY_META ||
          (typeof IDENTITY_META !== "undefined" ? IDENTITY_META : {}) ||
          {};

        const route = meta.ROUTE || key || null;
        const alias = meta.ALIAS || null;

        if (route === path) return route;
        if (alias === path) return route;
        if ("/" + key === path) return route;
      }
    }

    // -------------------------------------------------------------
    // Fallback to last route if available
    // -------------------------------------------------------------
    if (lastRoute) return lastRoute;

    // -------------------------------------------------------------
    // Final fallback
    // -------------------------------------------------------------
    PulseRealm.PulseWarn("portal", "[RouteCarpet] No Route Matched → /");
    return "/";
  } catch (err) {
    // -------------------------------------------------------------
    // Error fallback (PulseBarrier-aware)
    // -------------------------------------------------------------
    PulseRealm.PulseError("portal", "[RouteCarpet] buildRouteId ERROR →", err);
    return PulseRealm.PulseBarrier ? "PulseWorldInventory" : "/";
  }
}

// ============================================================================
// EXPORT — PULSE PORTAL API v30+
// ============================================================================

function safeMeta(meta) {
  if (!meta || typeof meta !== "object") return {};
  const out = { ...meta };
  delete out.performance;
  delete out.timing;
  delete out.navigation;
  delete out.memory;
  return out;
}

function safeEnv(env) {
  if (!env || typeof env !== "object") return {};
  const out = { ...env };
  delete out.performance;
  delete out.timing;
  delete out.navigation;
  delete out.memory;
  delete out.window;
  delete out.document;
  delete out.location;
  delete out.history;
  return out;
}

export const PulsePortalAPI = Object.freeze({
  VitalsMonitor: PulseVitalsMonitor || null,
  Logger: PulseVitalsLogger || null,
  Understanding: PulseUnderstanding || null,
  SurfaceEnvironment: safeEnv(PulseSurfaceEnvironment),
  UIFlow: PulseUIFlow || null,
  Errors: PulseUIErrors || null,
  meta: {
    pulseRole,
    surfaceMeta,
    context: pulseLoreContext,
  },
  on(event, handler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  },
});

PulseRealm.PulseLog(
  "portal",
  "%c[PulsePortal::API] %cPulse World Portal Secure PulseWorld.Net API Exported! (v30+)",
  "color:lightblue; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;",
);

export default PulsePortalAPI;

// ============================================================================
// GLOBAL MIRRORS — v30+ UNIVERSAL (Browser + Node + Workers)
// ===========================================================================

try {
  PulseRealm.PulseBand = PulseRealm.PulseBand || null;

  PulseRealm.PulseBandStart = PulseRealm.PulseBandStart || null;

  PulseRealm.PulseMonitor = PulseRealm.PulseMonitor || null;

  PulseRealm.PulseLogger = PulseRealm.PulseLogger || null;

  PulseRealm.PulseUIFlow = PulseRealm.PulseUIFlow || null;

  PulseRealm.PulseUIErrors = PulseRealm.PulseUIErrors || null;

  PulseRealm.PulsePortalAPI = PulsePortalAPI || null;

  PulseRealm.PulsePortal = PulsePortalAPI || null;

  PulseRealm.PulsePortalBridgge = PulsePortalAPI || null;

  PulseRealm.PulseLog(
    "portal",
    "%c[PulsePortal::Global] %cPulse World Pulse Universal Mirrors Initialized!",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#00FF9C; font-family:monospace;",
  );
} catch (err) {
  PulseRealm.PulseError(
    "portal",
    "%c[PulsePortal::Global] %cPULSE WORLD GLOBAL PORTAL FAILED %c→ %s",
    "color:lightblue; font-weight:bold; font-family:monospace;",
    "color:#FF3B3B; font-weight:bold; font-family:monospace;",
    "color:#FFE066; font-family:monospace;",
    String(err),
  );
}
PulseRealm.PulseLog(
  "portal",
  "%c[PulsePortal] %c PulseWorld.Net HAS A RIPPLE OPEN INTO THIS WORLD! (Welcome to the New Physics of the Internet!)",
  "color:lightblue; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;",
);

PulseRealm.PulsePortalWarmup = prewarm;
PulseRealm.PulsePortalPrewarm = prewarm;
PulseRealm.PulsePortalBridge = PulsePortalAPI;
PulseRealm.PulsePortalAPI = PulsePortalAPI;

export { surfaceMeta, pulseLoreContext, pulseRole, ONE_BAND, baseMetaPack };
