// ============================================================================
//  PulseBarrier‑v36‑IMMORTAL‑STRANDED‑DNA
//  - FILE-FIRST
//  - PORT-AS-FILES (https://files.pulseworld.net/)
//  - TOOLBOX-AWARE (PulseRealm.PulseTools)
//  - GPU + PulseEngine + PulseBand + PulsePal
//  - IMMEDIATE PRECONNECT + ROUTE PREWARM
//  - NO await, NO timeouts, STRANDED-DNA SCHEDULER
// ============================================================================
import { PulseBootWorld } from "./PULSE-BOOT-WORLD.js";
import { applyWorldBinaryThroughputScheduler_v40 } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-STRANDED-DNA.js";
import { pulseband } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-BAND/PULSE-BAND.js";
import { createPulseCompass } from "../PULSE-ENGINE/PulseEngineWorker-v31.js";
import { PulsePalWorld } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-PAL/PulsePalWorld-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

const PulseUniversalTouchWorld2 = worldPromise("PulseUniversalTouchWorld");
const PulseTouchWorld2 = worldPromise("PulseTouchWorld");
const PulseWorld2      = worldPromise("PulseWorld");
const PulseWorldView2  = worldPromise("PulseWorldView");
const PulseDOM2      = worldPromise("PulseDOM");
const PulseDOMScan2  = worldPromise("PulseDOMScan");
const PulseStorageScan2 = worldPromise("PulseStorageScan");
const PulseWorldPromises2 = worldPromise("PulseWorldPromises");


console.log("%c🌐 PULSE MULTIVERSAL BOOT v40.0 — [PulseBootBarrier v36] WE ARE THE ONE TIME BARRIER! WE CONTROL THE BOOT/RUN SEQUENCE.. WITHOUT US YOU ARE NOTHING, WITHOUT YOU WE ARE NOTHING!",
  " Owner Console Initiated!"
);


function worldPromise(name) {
  // ⭐ Warm global surfaces before lookup
  try { void self[name]; } catch {}
  try { void window[name]; } catch {}
  try { void globalThis[name]; } catch {}
  try { void frames[name]; } catch {}

  let val = null;

  try {
    if (PulseRealm && name in PulseRealm) {
      val = PulseRealm[name];
    }
  } catch {}

  return Promise.resolve(val);
}

// ============================================================================
//  CONSTANTS
// ============================================================================
const PULSE_PORT_SERVICE      = "https://port.serviceworker.net"; // PORT == FILES
const PULSE_PORT_ORIGIN       = "https://port.pulseworld.net";  // FILES
const PULSE_PORT_BINARY       = "https://port.binaryos.net";  // EMAILS
const PULSE_TOUCH_COOKIE_NAMEV = "PulseTouchPassport.v35"; // upgraded: trust‑layer passport

PulseRealm.ReadPulseTouchInternal = readPulseTouchInternal;

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

// ============================================================================
//  IMMEDIATE PRECONNECT + ROUTE PREWARM
// ============================================================================
(async function PulseImmediatePreconnectAndRouteWarm() {
   // ⭐ 3. Preconnect warmup
  try {
    const filelink = document.createElement("link");
    filelink.rel = "preconnect";
    filelink.href = PULSE_PORT_SERVICE;
    filelink.crossOrigin = "";
    document.head.appendChild(filelink);
    const emaillink = document.createElement("link");
    emaillink.rel = "preconnect";
    emaillink.href = PULSE_PORT_BINARY;
    emaillink.crossOrigin = "";
    document.head.appendChild(emaillink);
  } catch (_) {}
  
  // ⭐ 4. Route warm + world promises
  try {
    const route = PulseRealm.PulsePageRouteSnapshot;

    if (route && typeof route === "string") {
      const base = route;

      const variants = new Set([
        base,
        base.endsWith(".txt")  ? base : base + ".txt",
        base.endsWith(".html") ? base : base + ".html",
        base.endsWith("/")     ? base + "index.html" : base + "/index.html"
      ]);

      variants.forEach(url => {
        fetch(url, { cache: "no-store" }).catch(() => {});
      });

    }
  } catch (_) {}

  bootPulseWorld();

  // ⭐ 5. Environment lives in PulseGlobalNow (and mirrored on window)
  try {
  const env = readPulseTouchInternal({
    band: "dualband",
    coord: "W0.P0.R0.S0.SH0.PORTAL"
  });

  const pulseEngine = PulseRealm.PulseEngine || {};
  const gpuState = pulseEngine.gpu || {
    supported: false,
    reason: "unknown",
    adapter: null,
    backend: "none",
    limits: {},
    features: []
  };

  const gpuPhysicsCfg = (PulseRealm.PulseIndex && PulseRealm.PulseIndex.gpuPhysics) || {
    enabled: false,
    backend: gpuState.backend || "none",
    engine: null,
    compass: false
  };

  const gpuFrames = PulseRealm.PulseGPUFrames || {
    fps: null,
    avgFrame: null,
    maxFrame: null,
    minFrame: null,
    dropped: 0,
    total: 0
  };

  const gpuTiming = PulseRealm.PulseGPUTiming || {
    frameStart: null,
    frameEnd: null,
    frameDelta: null,
    gpuTime: null,
    cpuTime: null
  };

  const adapter = gpuState.adapter || {};
  const adapterInfo = {
    name:         adapter.name || "unknown",
    vendor:       adapter.vendor || "unknown",
    architecture: adapter.architecture || "unknown",
    device:       adapter.device || "unknown",
    description:  adapter.description || "unknown"
  };

  const gpuLimits   = gpuState.limits   || {};
  const gpuFeatures = gpuState.features || [];

  const pulseEnv = {
    band:      env.band,
    coord:     env.coord,
    mode:      env.mode,
    presence:  env.presence,
    ts:        env.ts,
    intel:     env.intel,

    gpu: {
      supported: gpuState.supported,
      reason:    gpuState.reason || null,
      backend:   gpuState.backend || "none",

      adapter:   { ...adapterInfo },
      limits:    { ...gpuLimits },
      features:  [ ...gpuFeatures ],

      physics: {
        enabled: gpuPhysicsCfg.enabled,
        backend: gpuPhysicsCfg.backend,
        engine:  gpuPhysicsCfg.engine,
        compass: gpuPhysicsCfg.compass
      },

      frames: {
        fps:       gpuFrames.fps,
        avgFrame:  gpuFrames.avgFrame,
        maxFrame:  gpuFrames.maxFrame,
        minFrame:  gpuFrames.minFrame,
        dropped:   gpuFrames.dropped,
        total:     gpuFrames.total
      },

      timing: {
        frameStart: gpuTiming.frameStart,
        frameEnd:   gpuTiming.frameEnd,
        frameDelta: gpuTiming.frameDelta,
        gpuTime:    gpuTiming.gpuTime,
        cpuTime:    gpuTiming.cpuTime
      }
    },

    bandState: {
      touch: env.touchState || null,
      pulse: env.pulseState || null
    },

    toolbox: {
      gpuState,
      gpuPhysicsCfg,
      gpuFrames,
      gpuTiming,
      gpuLimits,
      gpuFeatures
    },

    files: null
  };

  PulseRealm.PulseEnvironment = pulseEnv;
  } catch (_) {}
  
})();



// Internal state
let proxyURL2       = null;
let adminMode2      = false;
// Engine + GPU state
let pulseCompass2   = null;
let pulseGPUState2 = {
  supported: false,
  reason:   "uninitialized",

  backend:  "none",      // "webgpu" | "webgl" | "cpu"
  api:      "none",      // "webgpu" | "webgl2" | "none"

  adapter: {
    name:         "unknown",
    vendor:       "unknown",
    architecture: "unknown",
    device:       "unknown",
    description:  "unknown"
  },

  limits:   {},
  features: [],

  device:   null,

  frames: {
    fps:       null,
    avgFrame:  null,
    maxFrame:  null,
    minFrame:  null,
    dropped:   0,
    total:     0
  },

  timing: {
    frameStart: null,
    frameEnd:   null,
    frameDelta: null,
    gpuTime:    null,
    cpuTime:    null
  },

  physics: {
    enabled:  false,
    backend:  "none",
    engine:   null,
    compass:  false
  }
};


// Toolbox state (compiled tools from FILES/PORT)
let pulseToolbox2   = null;
function safeJSONParse(text, fallback) {
  try { return JSON.parse(text); }
  catch { return fallback; }
}
async function readPulseTouchInternal(defaults = {}) {
  const name = PULSE_TOUCH_COOKIE_NAMEV + "=";
  const raw = document.cookie.split("; ").find(c => c.startsWith(name));
  if (!raw) return { ...defaults };

  const value = raw.replace(name, "");

  try {
    const b64 = value
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(value.length + (4 - (value.length % 4)) % 4, "=");

    const json = atob(b64);
    const passport = JSON.parse(json);

    // ============================================================
    // ⭐ RESTORE PulseGlobal
    // ============================================================
    if (passport.PulseGlobal && typeof passport.PulseGlobal === "object") {
      PulseRealm.PulseGlobalNow = passport.PulseGlobal;

      if (PulseRealm.booted === 1) {
        PulseRealm.bootVideo = 1;
        PulseRealm.bootWorld = 1;
      }
    }

    // ============================================================
    // ⭐ RETURN FULL TOUCH OBJECT (NOW WITH PAGE)
    // ============================================================
    return {
      version:     passport.v        || defaults.version  || "v35",
      coord:       passport.coord    || defaults.coord    || "W0.P0.R0.S0.SH0.PORTAL",
      page:        passport.page     || defaults.page     || PulseRealm.__PULSE_CURRENT_PAGE__ || "PulseWorldReality",
      mode:        passport.mode     || defaults.mode     || "",
      presence:    passport.presence || defaults.presence || "",
      band:        passport.band     || defaults.band     || "symbolic",
      isMobile:    passport.isMobile,
      ts:          passport.lastSeen ? Number(passport.lastSeen) : null,
      intel:       passport.signature || null,

      PulseGlobal: passport.PulseGlobal || null,
      booted:      passport.booted     ?? null,
      bootVideo:   passport.bootVideo  ?? null,
      bootWorld:   passport.bootWorld  ?? null
    };

  } catch {
    PulseRealm.PulseGlobalNow = PulseRealm.PulseGlobalNow || {};
    return { ...defaults, PulseGlobal: PulseRealm.PulseGlobalNow };
  }
}
function PulseBarrierPrewarm(mode) {
  if (mode === "skip") return;

  const urls = new Set();

  // Light mode: only essential images
  if (mode === "light") {
    document.querySelectorAll("img[src]").forEach(img => urls.add(img.src));
    document.querySelectorAll('link[rel="icon"]').forEach(l => l.href && urls.add(l.href));
  }

  // Medium mode: images + posters + OG + backgrounds
  if (mode === "medium") {
    document.querySelectorAll("img[src]").forEach(img => urls.add(img.src));
    document.querySelectorAll("video[poster]").forEach(v => urls.add(v.poster));
    document.querySelectorAll('meta[property="og:image"]').forEach(m => m.content && urls.add(m.content));

    document.querySelectorAll("*").forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) urls.add(match[1]);
      }
    });
  }

  // Prewarm images
  urls.forEach(url => {
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url)) {
      new Image().src = url;
    }
  });

  // Prewarm videos only in medium mode
  if (mode === "medium") {
    urls.forEach(url => {
      if (/\.(mp4|webm|mov)$/i.test(url)) {
        fetch(url, { mode: "no-cors" }).catch(() => {});
      }
    });
  }
}

async function PulseBarrierPrewarmController() {
  const rtt = await measureRTT();

  if (rtt < 80) {
    PulseBarrierPrewarm("light");
  } else if (rtt < 150) {
    PulseBarrierPrewarm("medium");
  } else {
    PulseBarrierPrewarm("skip");
  }
}

async function measureRTT() {
  const start = performance.now();
  try {
    await fetch("/", { cache: "no-store" });
  } catch (e) {}
  return performance.now() - start;
}


// ============================================================================
//  BASIC UTILITIES
// ============================================================================
function pulseLog(...args) {
  PulseRealm.PulseLog(
  "boot","[PulseWorldBarrier v36]", ...args);
}

function detectAdminMode() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("admin") === "1" || url.hash.includes("admin")) {
    adminMode2 = true;
  }
}

// ============================================================================
//  PORT + FILES HELPERS (NO await, PROMISE-BASED)
// ============================================================================

function fetchPulseToolboxAndFiles(route) {
  return new Promise(resolve => {
    try {
      fetch(PULSE_PORT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "toolbox",
          route:  route || PulseRealm.PulsePageRouteSnapshot || null
        })
      })
        .then(res => {
          if (!res.ok) throw new Error("PORT non-200");
          return res.json();
        })
        .then(json => {
          const toolbox = json.toolbox || null;
          const files   = json.files   || null;

          pulseToolbox2 = toolbox;
          if (!PulseRealm.PulseTools) PulseRealm.PulseTools = {};
          Object.assign(PulseRealm.PulseTools, toolbox || {});

          if (PulseRealm.PulseEnvironment) {
            PulseRealm.PulseEnvironment.toolbox = toolbox;
            PulseRealm.PulseEnvironment.files   = files;
          }

          pulseLog("PORT toolbox/files loaded:", { toolbox, files });
          resolve({ toolbox, files });
        })
        .catch(e => {
          pulseLog("PORT toolbox/files failed:", e);
          resolve(null);
        });
    } catch (e) {
      pulseLog("PORT toolbox/files failed (sync):", e);
      resolve(null);
    }
  });
}

function fetchWorldFile(route) {
  return new Promise(resolve => {
    if (!route) {
      resolve(null);
      return;
    }

    const candidates = [
      route,
      route.endsWith(".txt")   ? route : route + ".txt",
      route.endsWith(".world") ? route : route + ".world",
      route.endsWith(".json")  ? route : route + ".json"
    ];

    let index = 0;

    const tryNext = () => {
      if (index >= candidates.length) {
        resolve(null);
        return;
      }

      const rel = candidates[index++];
      let url;

      try {
        url = rel.startsWith("http") ? rel : PULSE_FILES_ORIGIN + rel;
      } catch (_) {
        tryNext();
        return;
      }

      fetch(url, { cache: "no-store" })
        .then(res => {
          if (!res.ok) {
            tryNext();
            return;
          }
          return res.text().then(text => {
            resolve({ url, text });
          });
        })
        .catch(() => {
          tryNext();
        });
    };

    tryNext();
  });
}

function GPULOG() {
  console.groupCollapsed(
      "%c[PULSEWORLD::GPU] Pulse World Runtime GPU Snapshot → ",
      "color:#H02FHA; font-weight:bold; font-family:monospace;"
    );

    // ============================================================
    //  REAL GPU SNAPSHOT (v35)
    // ============================================================

    const pulseEngine = PulseRealm.PulseEngine || null;

    // 1) GPU State (adapter + backend + limits)
    const gpuState = pulseEngine.gpu ||
      PulseRealm.PulseEnvironment.gpu || {
        supported: false,
        reason: "unknown",
        adapter: null,
        backend: "none",
        limits: {},
        features: []
      };

    // 2) GPU Physics Config
    const gpuPhysicsCfg = PulseRealm.PulseIndex.gpuPhysics || {
      enabled: false,
      backend: gpuState.backend || "none",
      engine: null,
      compass: false
    };

    // 3) REAL GPU FRAME STATS
    const gpuFrames = PulseRealm.PulseGPUFrames || {
      fps: null,
      avgFrame: null,
      maxFrame: null,
      minFrame: null,
      dropped: 0,
      total: 0
    };

    // 4) REAL GPU TIMINGS
    const gpuTiming = PulseRealm.PulseGPUTiming || {
      frameStart: null,
      frameEnd: null,
      frameDelta: null,
      gpuTime: null,
      cpuTime: null
    };

    // 5) REAL GPU ADAPTER DETAILS
    const adapter = gpuState.adapter || {};
    const adapterInfo = {
      name: adapter.name || "unknown",
      vendor: adapter.vendor || "unknown",
      architecture: adapter.architecture || "unknown",
      device: adapter.device || "unknown",
      description: adapter.description || "unknown"
    };

    // 6) REAL GPU LIMITS
    const gpuLimits = gpuState.limits || {};

    // 7) REAL GPU FEATURES
    const gpuFeatures = gpuState.features || [];

    // ============================================================
    //  APPLY TO DOM
    // ============================================================

    const root = document.documentElement;
    if (root) {
      root.dataset.pulseGpu = gpuState.supported ? gpuState.backend : "off";
      root.classList.add(gpuPhysicsCfg.enabled ? "pulse-gpu-on" : "pulse-gpu-off");
    }

    if (document.body) {
      document.body.classList.add(
        gpuPhysicsCfg.enabled ? "pulse-gpu-physics" : "pulse-cpu-physics"
      );
    }

    // ============================================================
    //  LOG EVERYTHING (REAL GPU TELEMETRY)
    // ============================================================

    console.groupCollapsed("[PULSEWORLD::GPU] Pulse World Runtime Physics 101");
    console.log({
      gpuSupported: gpuState.supported,
      backend: gpuState.backend,
      engine: gpuPhysicsCfg.engine,
      compass: gpuPhysicsCfg.compass
    });
    console.groupEnd();

    console.groupCollapsed("[PULSEWORLD::GPU] Pulse World GPU/CPU Adapter Info");
    console.log(adapterInfo);
    console.groupEnd();

    console.groupCollapsed("[PULSEWORLD::GPU] Pulse World GPU/CPU Limits");
    console.log(gpuLimits);
    console.groupEnd();

    console.groupCollapsed("[PULSEWORLD::GPU] Pulse World GPU/CPU Features");
    console.log(gpuFeatures);
    console.groupEnd();

    console.groupCollapsed("[PULSEWORLD::GPU] Pulse World GPU/CPU Frame Stats");
    console.log({
      fps: gpuFrames.fps,
      avgFrame: gpuFrames.avgFrame,
      maxFrame: gpuFrames.maxFrame,
      minFrame: gpuFrames.minFrame,
      dropped: gpuFrames.dropped,
      total: gpuFrames.total
    });
    console.groupEnd();

    console.groupCollapsed("[PULSEWORLD::GPU] Pulse World GPU/CPU Timing");
    console.log({
      frameStart: gpuTiming.frameStart,
      frameEnd: gpuTiming.frameEnd,
      frameDelta: gpuTiming.frameDelta,
      gpuTime: gpuTiming.gpuTime,
      cpuTime: gpuTiming.cpuTime
    });
    console.groupEnd();

    console.groupEnd(); // END ROOT GPU SNAPSHOT
}
// ============================================================================
//  GPU PROBE + PULSE ENGINE COMPASS + PULSEBAND (NO await)
// ============================================================================
function initPulseEngineAndGPU() {
  return new Promise(resolve => {
    const envBand  = PulseRealm.PulseEnvironment.band  || "dualband";
    const envCoord = PulseRealm.PulseEnvironment.coord || "W0.P0.R0.S0.SH0.PORTAL";

    createPulseCompass({
      context: "INDEX-BARRIER",
      mode: "gpu-prewarm",
      meta: {
        band:  envBand,
        coord: envCoord,
        source: "PulseBarrier-v36"
      }
    })
      .then(compass => {
        pulseCompass2 = compass;
      })
      .catch(e => {
        pulseLog("PulseEngine compass failed:", e);
        pulseCompass2 = null;
      })
      .finally(() => {
        const finishGPU = () => {
          let pulseBandState = {};
          try {
            pulseBandState = pulseband.snapshot() || pulseband.state || {};
          } catch (e) {
            pulseBandState = { error: "pulseband-failed" };
            pulseLog("PulseBand failed:", e);
          }

          PulseRealm.PulseEngine = {
            compass: pulseCompass2,

            gpu: {
              supported: pulseGPUState2.supported,
              reason:    pulseGPUState2.reason,
              backend:   pulseGPUState2.backend,
              api:       pulseGPUState2.api,

              adapter:   pulseGPUState2.adapter,
              limits:    pulseGPUState2.limits,
              features:  pulseGPUState2.features,

              device:    pulseGPUState2.device,

              frames:    pulseGPUState2.frames,
              timing:    pulseGPUState2.timing,
              physics:   pulseGPUState2.physics
            }
          };


          PulseRealm.PulseBand = pulseBandState;

          if (PulseRealm.PulseEnvironment) {
            PulseRealm.PulseEnvironment.gpu = {
              supported: pulseGPUState2.supported,
              reason:   pulseGPUState2.reason,
              adapter:  pulseGPUState2.adapter ? "present" : null
            };
            PulseRealm.PulseEnvironment.bandState = pulseBandState;
          }

          if (!PulseRealm.PulseIndex) PulseRealm.PulseIndex = {};
          PulseRealm.PulseIndex.gpuPhysics = {
            enabled:  pulseGPUState2.supported,
            backend:  pulseGPUState2.reason,
            engine:   "PulseEngineWorker-v31",
            compass:  !!pulseCompass2
          };

          pulseLog("PulseEngine + GPU + PulseBand ready:", {
            engine: PulseRealm.PulseEngine,
            band: PulseRealm.PulseBand,
            gpu: PulseRealm.PulseIndex.gpuPhysics
          });
          
          GPULOG();
          resolve(true);
        };

        try {
          if (navigator.gpu && typeof navigator.gpu.requestAdapter === "function") {
            navigator.gpu.requestAdapter()
              .then(adapter => {
                if (!adapter) {
                  pulseGPUState2 = { supported: false, reason: "no-adapter", adapter: null, device: null };
                  finishGPU();
                  return;
                }
                return adapter.requestDevice().then(device => {
                  pulseGPUState2 = {
                    supported: true,
                    reason:   "webgpu",
                    adapter,
                    device
                  };
                  finishGPU();
                });
              })
              .catch(e => {
                pulseGPUState2 = { supported: false, reason: "gpu-error", adapter: null, device: null };
                pulseLog("GPU probe failed:", e);
                finishGPU();
              });
          } else if (WebGLRenderingContext) {
            pulseGPUState2 = { supported: true, reason: "webgl", adapter: null, device: null };
            finishGPU();
          } else {
            pulseGPUState2 = { supported: false, reason: "no-gpu-api", adapter: null, device: null };
            finishGPU();
          }
        } catch (e) {
          pulseGPUState2 = { supported: false, reason: "gpu-error", adapter: null, device: null };
          pulseLog("GPU probe failed (sync):", e);
          finishGPU();
        }
      });
  })
}

// ============================================================================
//  TEXT-BASED BOOT WORLD LOADER (BARRIER-CONTROLLED, NO await AT TOP LEVEL)
// ============================================================================
function loadBootWorldFromPulseScript() {
  return new Promise(resolve => {
    try {
      const pulseScript = document.querySelector('script[type="pulse"][src]');
      if (!pulseScript) {
        pulseLog("No Pulse Script Tag Found for Boot World.. YET :D");
        return resolve();
      }

      const src = pulseScript.getAttribute("src");
      if (!src) {
        pulseLog("Pulse Script Tag has No SRC for Boot World!");
        return resolve();
      }

      // Load Boot World as TEXT (no JS module, no blocking)
      fetch(src)
        .then(r => r.text())
        .then(code => {
          try {
            // Turn TEXT → JS → runtime (inside barrier, not index)
            const bootWorldFactory = new Function(code);
            bootWorldFactory(); // This defines PulseWorld2 / PulseTouchWorld2 / etc.
            pulseLog("Boot World Text Loaded and Executed via Barrier!");
          } catch (e) {
            pulseLog("Error executing Boot World text:", e);
          }
          resolve();
        })
        .catch(e => {
          pulseLog("Failed to fetch Boot World text:", e);
          resolve();
        });
    } catch (e) {
      pulseLog("Unexpected Error in LoadBootWorldFromPulseScript:", e);
      resolve();
    }
  });
}
function onCoordinateIntercept(coord) {
  // Default: no change
  return coord;
}

function onRouteIntercept(routeName) {
  // Default: no change
  return routeName;
}
function predictNextCoordinates(coord) {
  if (!coord || typeof coord !== "string") return "INDEX";

  const parts = coord.split(".");
  const node = parts[parts.length - 1].toUpperCase();

  // ============================================================
  // 1) Deterministic transitions (your original logic, expanded)
  // ============================================================
  const nextNodeMap = {
    "INDEX": "LOGIN",
    "LOGIN": "DASHBOARD",
    "DASHBOARD": "INVENTORY",
    "INVENTORY": "SETTINGS",
    "SETTINGS": "ROUTE",
    "ROUTE": "INDEX"
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
    const predicted = PulseRealm.PulseRouteCarpet.predictNext(node.toLowerCase());
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

function interpretCoordinates(coord) {
  if (!coord || typeof coord !== "string") return null;

  const parts = coord.split(".");
  const node = parts[parts.length - 1].toUpperCase();

  // ============================================================
  // 1) Direct map (your original)
  // ============================================================
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

  if (map[node]) return map[node];

  // ============================================================
  // 2) Touch predictor interpretation
  // ============================================================
  try {
    const touch = PulseRealm.PulseTouch || PulseRealm.PulseTouchPredictor;
    if (touch.interpretCoordinate) {
      const out = touch.interpretCoordinate(coord);
      if (typeof out === "string") return out;
    }
  } catch {}

  // ============================================================
  // 3) RouteCarpet interpretation
  // ============================================================
  try {
    const page = node.toLowerCase();
    const route = PulseRealm.PulseRouteCarpet.resolveRoute(page);
    if (route.ROUTE.id) return route.ROUTE.id;
  } catch {}

  // ============================================================
  // 4) OrganismMap interpretation
  // ============================================================
  try {
    const map = PulseRealm.PulseOrganismMap;
    const ui = map.systems.UI;
    const pages = ui.pages;

    if (pages && pages[node]) {
      return pages[node].ROUTE.id || node;
    }
  } catch {}

  // ============================================================
  // 5) Final fallback: treat node as route name
  // ============================================================
  return node;
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

function getNextRoute() {
  // Upgrade: build routes dynamically from navSets
  PulseRealm.PulsePageRoutes = buildDynamicRoutes(PulseRealm.NavigationSets);

  const page =
    PulseRealm.__PULSE_CURRENT_PAGE__ ||
    "PulseWorldInventory";

  let routes = PulseRealm.PulsePageRoutes[page];

  // Convert object → array of values (safety fallback)
  if (routes && typeof routes === "object" && !Array.isArray(routes)) {
    routes = Object.values(routes);
  }

  // If no routes exist, fallback to Inventory
  if (!routes || !routes.length) {
    routes = ["PulseWorldInventory"];
  }

  const finalRoute =
    PulseRealm.PulseRouteCarpet.predictNext(page, routes) ||
    page;

  try {
    const desc =
      PulseRealm.PulseRouteCarpet.buildRouteDescriptor(finalRoute) ||
      PulseRealm.PulseRouteCarpet.buildWorldDescriptor(finalRoute) ||
      {
        route: finalRoute,
        imports: [`./${finalRoute}.js`],
        assets: [`./${finalRoute}.assets.json`]
      };

    if (desc) {
      PulseRealm.PulseRouteCarpet.preloadEverything(finalRoute, desc);
    }
  } catch {}

  return finalRoute;
}



function interceptCoordinates(coord) {
  try {
    const out = onCoordinateIntercept(coord);
    if (typeof out === "string") return out;
  } catch {}
  return coord;
}

function interceptRoute(routeName) {
  try {
    const out = onRouteIntercept(routeName);
    if (typeof out === "string") return out;
  } catch {}
  return routeName;
}

// ============================================================================
//  SAFE WORLD BOOT — FILES + PORT + TOOLBOX + STRANDED DNA (NO await)
// ============================================================================
// SAFE WORLD BOOT — async internals, instant boot pulse
function bootPulseWorld() {
  detectAdminMode();

  const chosenRoute = getNextRoute();
  if (!chosenRoute) {
    pulseLog("Pulse World has Not Found any Old Routes! We start Brand New! (Welcome!)");
    return;
  }

  // ⭐ Async world boot: background, streamlined
  loadBootWorldFromPulseScript()
    .then(() => {
      return applyWorldBinaryThroughputScheduler_v40(async () => {
        await initPulseEngineAndGPU();
        await fetchPulseToolboxAndFiles(chosenRoute);

        const worldFile = await fetchWorldFile(chosenRoute);

        if (worldFile && PulseRealm.PulseEnvironment) {
          PulseRealm.PulseEnvironment.worldFile = {
            url:  worldFile.url,
            size: worldFile.text.length
          };
        }

        const hasTouchWorld = typeof PulseTouchWorld2 === "function";
        const hasWorld      = typeof PulseWorld2 === "function";
        const hasWorldView  = typeof PulseWorldView2 === "function";
        const hasPulsePal   = typeof PulsePalWorld === "function";

        const sharedOptions = {
          proxyURL2,
          gpu:        pulseGPUState2,
          engine:     pulseCompass2,
          pal:        PulsePalWorld,
          pulseband:  PulseRealm.PulseBand,
          toolbox:    pulseToolbox2,
          files:      PulseRealm.PulseEnvironment.files || null,
          worldFile:  worldFile || null,
          port: {
            endpoint: PULSE_PORT_ENDPOINT
          }
        };

        try {
          if (adminMode2 && hasWorldView) {
            PulseWorldView2(chosenRoute, { adminMode2, ...sharedOptions });
          } else if (hasPulsePal) {
            PulsePalWorld(chosenRoute, sharedOptions);
          } else if (hasTouchWorld) {
            PulseTouchWorld2(chosenRoute, sharedOptions);
          } else if (hasWorld) {
            PulseWorld2(chosenRoute, sharedOptions);
          }
        } catch (e) {
          pulseLog("Error during world boot:", e);
        }
      });
    })
    .catch(err => {
      pulseLog("World boot strand failed:", err);
    });
    
  // ⭐ Touch Gate / boot pulse: IMMEDIATE
  PulseBootWorld.boot(chosenRoute);
}


PulseRealm.PulseBarrier = {
  interpretCoordinates,
  getCurrentCoordinates,
  predictNextCoordinates,

  // NEW: coordinate interceptor
  interceptCoordinates,

  // NEW: route interceptor
  interceptRoute,

  // Convenience: next route resolver
  getNextRoute
};

PulseRealm.PulseBarrierBootWorld = bootPulseWorld;