// ============================================================================
//  PBCompanion.js — PulseBrowser OS Kernel (Ultra Edition v12.0)
//  Manifest V3 Service Worker — full OS kernel
//  Subsystems: Interceptor • Router • Navigator • Accelerator • Realm • Settings • DevTools
// ============================================================================
let nowSW = Date.now(); // numeric timestamp
let aiSettingsSize = 0;
let aiPopupSize = 0;
let WasmSuccess = false;
let timeProof = null;
let pulseTabs = {};
let CompanionDeprivation = false;
let TakeOfflineSnapshot = false;
let HelperHudBoolean = false;
let __PULSE_CACHE_FILE = null;
let CompanionMessage = null;
let activeRealmClaim = false;
let authorityRealm = null;
let EarnHidden = false;
let PULSE_ONLINE = false;
let aiSession = null;
let OvermindOrders = null;
let PulsePalMemoryAIBuffer = [];
let lastKnownData = {};
let temporaryLinks = [];
let LocalMemoryLayer = {};
let MyLocalMemoryLayer = {};
let WeLocalMemoryLayer = {};
let LocalMemoryLayerMB = 0;
let WeLocalMemoryLayerMB = 0;
let WeLocalMemoryLayerMBackup = 0;
let warmTargets = [];
let now = new Date().toLocaleString();
let lastFailURL = "https://www.pulseworld.net";
let lastnowSW = Date.now(); // numeric timestamp
let comeback = false;
let comebackURL = null;
const CACHE_NAME = "PulseBrowser-Companion";
const PULSE_FAUX_CACHE_NAME = "PulseWorld-PB-Companion";
const ERROR_FAUX_CACHE_NAME = "PulseBrowser-Companion";
const SHARED_CACHE_NAME = "PulseBrowser-Companion";
let ServiceWorkerOnline = true;
let PulseRealmSettings = null;
let PulseBrowserSettings = null;
let GLOBALSTART = Date.now();
let totalUsed = 0;
// Persistent favicon cache stored in chrome.storage.local
// Local in-memory mirror for speed
let PBFAVICON_CACHE = {};
// Load cache from storage at startup
chrome.storage.local.get(["PulseBrowserFaviconMultiverse"], (res) => {
  if (res.PulseBrowserFaviconMultiverse) {
    PBFAVICON_CACHE = res.PulseBrowserFaviconMultiverse;
    console.log("PulseBrowser OS Accelerated Modules Icon List: ", PBFAVICON_CACHE);
  }
});

let PULSE_OVERMIND_BROADCAST_CHANNEL = `PulseBrowser-OS::${new Date().toLocaleTimeString()}`;
// ============================================================
//  BROADCAST CHANNEL — v33 (TRUST SYNC + EXISTING USES)
// ============================================================

let PulseBrowserChannel = null;
try {
  PulseBrowserChannel = new BroadcastChannel(PULSE_OVERMIND_BROADCAST_CHANNEL);
} catch {
  PulseBrowserChannel = null;
}

function OvermindCrossTabSync(payload) {
  try {
    PB_LOG2.info("[AI_Overmind_Sync] Syncing Overmind Orders across the Multiverse!", payload);
    PulseBrowserChannel.postMessage({
      kind: "command_prompt",
      payload,
      ts: nowSW
    });
  } catch {}
}

if (PulseBrowserChannel) {
  PulseBrowserChannel.onmessage = (ev) => {
    try {
      const { kind, payload } = ev.data || {};
      if (kind === "command_prompt") {
        
      }
    } catch {}
  };
}

// 1. The Core Queue Engine
class StorageQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  // Adds the payload to the line and ensures the processing loops runs
  enqueue(dataObject) {
    this.queue.push(dataObject);
    if (!this.isProcessing) {
      this.processNext();
    }
  }

  // Processes each object one by one, keeping the disk thread safe
  async processNext() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const dataObject = this.queue.shift(); // Pull the next write payload

    try {
      // Executes the native Chrome write sequentially
      await chrome.storage.local.set(dataObject);
    } catch (error) {
      console.error("[STORAGE GOVERNOR] Quota write blocked:", error);
    }

    // Yield control for 0ms to let the browser breathe, then hit the next item
    setTimeout(() => this.processNext(), 0);
  }
}

// 2. Instantiate the global queue in your worker
const orchestratorQueue = new StorageQueue();

// 3. The Drop-In Replacement Function
function safeStorageSet(dataObject) {
  orchestratorQueue.enqueue(dataObject);
}

const PB_LOG2 = {
  info(label, data) {
    console.log(
      `%c[PBCompanion][INFO][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#55BBFF; font-weight:bold;",
      data || ""
    );
  },

  change(label, before, after) {
    console.groupCollapsed(
      `%c[PBCompanion][CHANGE][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#00FFAA; font-weight:bold;"
    );
    console.log("%cBefore:", "color:#FF8888; font-weight:bold;", before);
    console.log("%cAfter:", "color:#88FF88; font-weight:bold;", after);
    console.groupEnd();
  },

  save(label, data) {
    console.log(
      `%c[PBCompanion][SAVE][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#00DDFF; font-weight:bold;",
      data
    );
  },

  load(label, data) {
    console.log(
      `%c[PBCompanion][LOAD][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#FFD700; font-weight:bold;",
      data
    );
  },

  event(label, data) {
    console.log(
      `%c[PBCompanion][EVENT][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#FF55AA; font-weight:bold;",
      data
    );
  }
};

chrome.storage.local.get(["globalStart"], (res) => {
  if (!res.globalStart) {
    GLOBALSTART = Date.now();
    safeStorageSet({ globalStart: GLOBALSTART });
  } else {
    if (isValid(res.globalStart)) {
      GLOBALSTART = res.globalStart;
      PB_LOG2.info("PulseBrowser OS Ignition Date: " + new Date(GLOBALSTART).toLocaleString());
      PB_LOG2.info("PulseBrowser OS Session Start: " + new Date(nowSW).toLocaleString());
      PB_LOG2.info("PulseBrowser OS Settings Start: " + new Date(lastnowSW).toLocaleString());
      PB_LOG2.info("PulseBrowser OS Present Moment: " + new Date().toLocaleString());
    } else {
      GLOBALSTART = Date.now();
    }
  }
});

function saveCache() {
  safeStorageSet({ PulseBrowserFaviconMultiverse: PBFAVICON_CACHE });
}
// ============================================================================
//  SECTION 1 — INTERNAL STATE (Realm)
// ============================================================================
const PulseRealmState = {
  sessionStart: null,
  lastPing: null,
  lastPage: null,
  lastURL: null,
  lastTitle: null,
  lastDomainClass: null,
  // Bands (PulseWorld / OS)
  band: "PulseBand",
  gpuEnabled: null,
    // accelBand: null,
    // routerBand: null,
    // gpuBand: null,
    // decodeBand: null,
    // worldBand: null
  navHistory: [],
  navEvents: [],
  perfEntries: [],
  mutationCount: 0,
  imagesDecoded: 0,
  warmPathsTriggered: 0,
  warmAssetsTriggered: 0,
  lastWarmOrigin: null,
  // Settings snapshot
  settings: {},
  flags: {
    hudActive: true,
    contentRuntimeActive: true,
    acceleratorActive: true,
    routerActive: true,
    navigatorActive: true
  }
};


// ============================================================================
//  SECTION 2 — SETTINGS (Full OS Registry)
// ============================================================================

const PB_SW_SETTINGS = {
  enableInterceptor: true,
  enableAccelerator: true,
  enableNavigator: true,
  enableRouter: true,
  enablePulseEarnerEngine: true,
  enablePulsePal: true,
  enablePulseGPU: true,
  enablePulseDecode: true,
  enableContentRuntime: true,
  enableDevOverlay: true,
  enablePulseEarnOverlay: true,
  enablePulsePalMemory: true,
  enablePulsePalCybernetics: true,
  enablePulsePalConsole: true,
  enableDevCaches: true,
  blockTrackers: true,
  blockAnalytics: true,
  blockAds: true,
  blockFingerprinting: false,

  upgradeHTTPtoHTTPS: true,
  forceHTTP2: false,
  forceHTTP3: false,
  forceQUIC: false,

  accelPreconnect: true,
  accelPrefetch: true,
  accelPreload: true,
  accelWarmPath: true,
  accelGPUWarm: true,
  accelDecodeWarm: true,
  accelDNSWarm: true,
  accelTLSWarm: true,
  accelRealmWarm: true,

  navWarmSiblings: true,
  navWarmAssets: true,
  navWarmGlobalSites: true,
  navPulseWorldPriority: true,

  routerPrioritizeCDN: true,
  routerPrioritizeAssets: true,
  routerPrioritizeHomeUniverse: true,
  routerLatencyScan: true,
  routerRealmScan: true,
  routerFallbackScan: true,
  routerAdaptiveRouting: true,

  experimentalAIWarmPath: false,
  experimentalRealmPerservere: true,
  experimentalLearnPaths: true,
  experimentalPerpFresh: true,
  experimentalTemporalNavigation: true,
  experimentalQuantumRouting: true,
  experimentalPortalTransitions: false,
  experimentalMeshAwareness: false,

  homeUniverse: [
    "pulseworld.net",
    "pulseworld.me",
    "pulseworld.money",
    "pulseworld.biz",
    "binaryos.net",
    "booleanlogic.net",
    "gpuprocessing.net",
    "serviceworker.net",
    "orbitalmap.net"
  ]
};

// ============================================================================
//  SECTION 0 — INSTALL / ACTIVATE (Warm Boot)
// ============================================================================
self.addEventListener("install", event => {
  console.log(
    "%c[PULSEBROWSER OS KERNEL] Installed",
    "color:#00FF9C; font-weight:bold; font-family:monospace;"
  );
  
  const PRELOAD_URLS = [
    "PBFrontPage.html",
    "PBPopup.html",
    "PBSettings.html",
    "PulseWorldAuthority.html",
    "PBFrontPage.js",
    "PBDevOverlay.js",
    "PBCompanion.js",
    "PBInterceptor.js",
    "PBAccelerator.js",
    "PulseEarnWarmer.wasm",
    "PBRouter.js",
    "PBSettings.js",
    "PulseOSTabs.png",
    "PulseEarn.mp4",
    "PulsePalDetails.mp4",
    "PulseOvermind.mp4",
    "android-chrome-192x192.png",
    "PulseWorldOSMarketplace-White.png",
    "PulseWorldEntrancePulseGPUPulseEarn.png",
    "PulseWorldSplash512.png"
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        PRELOAD_URLS.map(async url => {
          // ⭐ SAFETY GUARD: skip chrome-extension://
          if (!url.startsWith("http")) return Promise.resolve();
          return cache.add(url).catch(() => {});
        })
      );
    })
  );
  self.skipWaiting();
});

async function pbWarmBoot() {
  // try {
  //   const SessionAI = await chrome.storage.local.get(["aiSession"]);
  //   aiSessionFP = SessionAI.aiSession;
  // } catch (err) {}
  await pbModuleWarmBoot();
  await pbHomeWarmBoot();
}

async function handlePulseRequest(req) {
  const cache = await caches.open(CACHE_NAME);
  pulseInc(PULSE_SHARED_INDEX.REQUEST_COUNT);

  const cached = await getSharedResponse(req);
  if (cached) {
    pulseInc(PULSE_SHARED_INDEX.CACHE_HIT_COUNT);
    return cached;
  }

  try {
    const net = await fetch(req, { cache: 'no-store' });

    // 🚀 FIX: Detect real WASM binaries dynamically by headers, regardless of the URL string
    const contentType = net.headers.get('content-type') || '';
    if (contentType.includes('application/wasm')) {
      return net; // Pass it straight through, do not cache or alter it
    }

    PULSE_ONLINE = true;
    pulseSetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG, 1);

    if (
      net &&
      net.ok &&
      (!req.url.startsWith('chrome-extension://'))
    ) {
      const pwoffline = makeOfflineKey(req.url);
      let netclone = net.clone();
      await putSharedResponse(pwoffline, netclone);
      pulseInc(PULSE_SHARED_INDEX.CACHE_MISS_COUNT);
    }

    return net;

  } catch (err) {
    // If the error happened *during* fetch and it's a known WASM endpoint, rethrow it
    // so it doesn't get swallowed by the HTML fallback block below
    if (req.url.includes('wasm') || req.headers.get('Accept')?.includes('application/wasm')) {
      return Promise.reject(err); 
    }

    PULSE_ONLINE = false;
    pulseSetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG, 0);

    // Offline fallback: return last known cached version
    const fallback = await cache.match(req);
    if (fallback) return fallback;

    if (req.url.startsWith('chrome-extension://')) {
      const pulseworldURL = req.url.replace(location.origin, "https://pulseworld.net");
      const pulseworldFallback = await cache.match(pulseworldURL);
      if (pulseworldFallback) return pulseworldFallback;
    }

    if (req.url.includes("pw=offline")) {
      const originalUrl = req.url.replace(/[?&]pw=offline/g, "").replace("?&", "?").replace(/\?$/, "");
      const originalFallback = await cache.match(originalUrl);
      if (originalFallback) return originalFallback;
    }

    // Final fallback: offline message
    return new Response("<h1>You are Offline without a Realm!</h1><p>Please Check your Connection!</p>", {
      status: 503,
      statusText: "Realm Unavailable",
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
}



// ============================================================
// ⭐ PULSE-API HANDLER — network-first (keeps its own cache)
// ============================================================

async function handlePulseAPI(req) {

  if (!req.url.startsWith('http') &&
      !req.url.includes('-TEST') &&
      !req.url.pathname.includes('.webp.pex')) {
    return fetch(req);
  }

  const app = self.PulseWorldExpressLayer;
  const apiCache = await caches.open('pulse-api-cache');

  try {
    const net = await fetch(req);

    if (net && net.ok) {
      apiCache.put(req, net.clone());

      try {
        const cloned = net.clone();
        const json = await cloned.json();
        lastKnownData = json;
        pulseSetFlag(PULSE_SHARED_INDEX.API_LAST_TS, Date.now());
      } catch (e) {}

      return net;
    }
  } catch (err) {}

  try {
    const result = await app.handle(req);

    lastKnownData = result;
    pulseSetFlag(PULSE_SHARED_INDEX.API_LAST_TS, Date.now());

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {}

  const cached = await apiCache.match(req);
  if (cached) {
    return cached;
  }

  const offlineData = {
    status: "ok",
    offline: true,
    ts: Date.now(),
    route: req.url,
    data: lastKnownData || {},
    reason: "Network unreachable; using local OS continuity"
  };

  return new Response(JSON.stringify(offlineData), {
    headers: { "Content-Type": "application/json" }
  });
}

// ============================================================
// ⭐ SHARED STORAGE LAYER (USING SHARED CACHE)
// ============================================================

async function getSharedResponse(req) {
  const cache = await caches.open(SHARED_CACHE_NAME);
  return cache.match(req);
}

async function putSharedResponse(req, res) {
  const cache = await caches.open(SHARED_CACHE_NAME);
  if (res && res.ok) {
    await cache.put(req, res.clone());
  }
}

const SHARED_STATE_BYTES = 4096;

console.log(
  "%c⟡ Allocating SharedArrayBuffer (%d bytes)...",
  "color:#9df; font-size:12px;",
  SHARED_STATE_BYTES
);

const PULSE_SHARED_BUFFER = typeof SharedArrayBuffer !== "undefined"
  ? new SharedArrayBuffer(SHARED_STATE_BYTES)
  : new ArrayBuffer(SHARED_STATE_BYTES);
const PULSE_SHARED_INTS = new Int32Array(PULSE_SHARED_BUFFER);

console.log(
  "%c⟡ SharedArrayBuffer READY — %d Int32 cells online.",
  "color:#4f8; font-size:12px;",
  PULSE_SHARED_INTS.length
);

// Index map
const PULSE_SHARED_INDEX = {
  ONLINE_FLAG: 0,
  REQUEST_COUNT: 1,
  CACHE_HIT_COUNT: 2,
  CACHE_MISS_COUNT: 3,
  API_LAST_TS: 4,
  HEARTBEAT_TS: 5
};

console.log(
  "%c⟡ Pulse Browser Shared Atomic Index Map Loaded",
  "color:#8ff; font-size:12px;"
);


// ⭐ Activity console (rate-limited + max reports)
let PULSE_ACTIVITY_LAST = performance.now();
const PULSE_ACTIVITY_INTERVAL = 8000; // 8 seconds

let PULSE_ACTIVITY_REPORT_COUNT = 0;
const PULSE_ACTIVITY_MAX_REPORTS = 5;

function pulseActivityReport() {
  if (PULSE_ACTIVITY_REPORT_COUNT >= PULSE_ACTIVITY_MAX_REPORTS) return;

  const now = performance.now();
  if (now - PULSE_ACTIVITY_LAST < PULSE_ACTIVITY_INTERVAL) return;
  PULSE_ACTIVITY_LAST = now;
  PULSE_ACTIVITY_REPORT_COUNT++;

  const requests = pulseGetFlag(PULSE_SHARED_INDEX.REQUEST_COUNT);
  const hits = pulseGetFlag(PULSE_SHARED_INDEX.CACHE_HIT_COUNT);
  const misses = pulseGetFlag(PULSE_SHARED_INDEX.CACHE_MISS_COUNT);
  const apiTs = pulseGetFlag(PULSE_SHARED_INDEX.API_LAST_TS);
  const heartbeat = pulseGetFlag(PULSE_SHARED_INDEX.HEARTBEAT_TS);

  console.groupCollapsed(
    "%c⟡ PULSE BROWSER KERNEL — Activity Report",
    "color:#4f8; font-size:12px;"
  );

  console.log(`Requests: ${requests}`);
  console.log(`Cache Hits: ${hits}`);
  console.log(`Cache Misses: ${misses}`);
  console.log(`Last API TS: ${apiTs}`);
  console.log(`Heartbeat: ${heartbeat}`);

  console.groupEnd();

}

// ⭐ Atomic deep debug (OFF by default)
const ATOMIC_DEBUG = false;

function pulseSetFlag(index, value) {
  Atomics.store(PULSE_SHARED_INTS, index, value);
  Atomics.notify(PULSE_SHARED_INTS, index);

  if (ATOMIC_DEBUG) {
    console.log(
      "%c⟡ [Atomic:Set] Index %d → %d",
      "color:#0f0; font-size:11px;",
      index,
      value
    );
  }

  pulseActivityReport();
}

function pulseGetFlag(index) {
  const v = Atomics.load(PULSE_SHARED_INTS, index);

  if (ATOMIC_DEBUG) {
    console.log(
      "%c⟡ [Atomic:Get] Index %d → %d",
      "color:#0ff; font-size:11px;",
      index,
      v
    );
  }

  return v;
}

function pulseInc(index, delta = 1) {
  const v = Atomics.add(PULSE_SHARED_INTS, index, delta);

  if (ATOMIC_DEBUG) {
    console.log(
      "%c⟡ [Atomic:Inc] Index %d → %d (+%d)",
      "color:#ff0; font-size:11px;",
      index,
      v + delta,
      delta
    );
  }

  pulseActivityReport();
}
// ============================================================
// ⭐ HEARTBEAT — Announces continuation existence
// ============================================================

function sendPulseHeartbeat() {
  const ts = Date.now();
  pulseSetFlag(PULSE_SHARED_INDEX.HEARTBEAT_TS, ts);

  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'PULSE_HEARTBEAT',
        deviceActive: !!self.pulseDeviceActive,
        timestamp: ts,
        sharedState: {
          online: !!pulseGetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG),
          requests: pulseGetFlag(PULSE_SHARED_INDEX.REQUEST_COUNT),
          cacheHits: pulseGetFlag(PULSE_SHARED_INDEX.CACHE_HIT_COUNT),
          cacheMisses: pulseGetFlag(PULSE_SHARED_INDEX.CACHE_MISS_COUNT),
          apiLastTs: pulseGetFlag(PULSE_SHARED_INDEX.API_LAST_TS),
          heartbeatTs: pulseGetFlag(PULSE_SHARED_INDEX.HEARTBEAT_TS)
        }
      });
    });
  });
}


// ============================================================
// ⭐ MULTITHREADED MICRO-SCHEDULER (SAFE, PASSIVE, NON-INTRUSIVE)
// ============================================================

const PW_AUTO_THREAD = true;

const PW_TASKS = [];
let PW_RUNNING = false;

function pwThread(fn) {
  PW_TASKS.push(fn);
  console.log(PW_TASKS);
  if (!PW_RUNNING) pwRun();
}

async function pwRun() {
  PW_RUNNING = true;
  while (PW_TASKS.length) {
    const task = PW_TASKS.shift();
    try { await task(); }
    catch (e) { /* ignore */ }
    await Promise.resolve(); // yield
  }
  PW_RUNNING = false;
}

// // Drop this right inside your site tabs / orchestrator loops
// function getLocalMemoryLayer() {
//   if (!performance || !performance.memory) {
//     return { status: "Standard Engine Active" };
//   }

//   // Native V8 Engine Hooks (No permissions required, works on Stable Channel)
//   const heap = performance.memory;
//   LocalMemoryLayerMB = Number(((heap.usedJSHeapSize / 1024 / 1024).toFixed(2)).replace(" MB", ""));
//   LocalMemoryLayerMB = LocalMemoryLayerMB.toFixed(2);

//   return {
//     usedHeapMB: (heap.usedJSHeapSize / 1024 / 1024).toFixed(2) + " MB",
//     totalHeapMB: (heap.totalJSHeapSize / 1024 / 1024).toFixed(2) + " MB",
//     heapLimitMB: ((heap.jsHeapSizeLimit) / 1024 / 1024).toFixed(2) + " MB"
//   };
// }


// ============================================================
// ⭐ MESSAGE CHANNEL — Page ↔ Service Worker communication
// ============================================================

self.addEventListener('message', event => {
  const msg = event.data;

  if (msg === 'PULSE_DEVICE_ON') {
    self.pulseDeviceActive = true;
    sendPulseHeartbeat();
  }

  if (msg === 'PULSE_DEVICE_OFF') {
    self.pulseDeviceActive = false;
    sendPulseHeartbeat();
  }

  if (msg === 'PULSE_HEARTBEAT_REQUEST') {
    sendPulseHeartbeat();
  }

  // Shared buffer request from page/worker
  if (event.data === "PULSE_SHARED_BUFFER_REQUEST") {
    event.source.postMessage({
      type: "PULSE_SHARED_BUFFER",
      buffer: PULSE_SHARED_BUFFER
    });
  }

  if (msg && msg.prefetch) {
    const url = msg.prefetch;

    if (
      url.includes('-TEST') ||
      url.includes('/PulseAdmin')
    ) {
      return;
    }

    event.waitUntil(
      (async () => {
        try {
          const cached = await getSharedResponse(url);
          if (cached) return;

          const resp = await fetch(url);
          if (resp && resp.ok) {
            if (PW_AUTO_THREAD) {
              pwThread(() => putSharedResponse(url, resp.clone()));
            } else {
              await putSharedResponse(url, resp.clone());
            }
          }
        } catch (err) {
          console.warn('SW Prefetch failed:', url, err);
        }
      })()
    );
  }
});

function makeOfflineKey(url) {
  // Already has pw=offline → return as-is
  if (url.includes("pw=offline")) return url;
  if (url.includes("pw=moment")) return url;

  // Remove trailing slash ONLY if it's not the root
  let clean = url;
  if (clean.endsWith("/") && clean.length > 1) {
    clean = clean.slice(0, -1);
  }

  // Add ?pw=offline or &pw=offline depending on existing query
  const separator = clean.includes("?") ? "&" : "?";
  let decision = clean + separator + "pw=offline";
  return decision;
}

async function cacheMyBlob(cache, url, myBlob) {
  if (!cache) cache = await caches.open(CACHE_NAME);
  // 1. Wrap the Blob in a Response object
  const response = new Response(myBlob, {
    headers: { 
      'Content-Type': myBlob.type,
      'Content-Length': myBlob.size
    }
  });
  // 2. Put it in the cache using a URL or custom string as the key
  await cache.put(url, response);
}


self.addEventListener("activate", (event) => {
  console.log("%c[PULSEBROWSER OS KERNEL] Activated",
    "color:#00FF9C; font-weight:bold; font-family:monospace;");
  event.waitUntil(self.clients.claim());
  sendPulseHeartbeat();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Only cache GET requests
  if (!ServiceWorkerOnline) return;
  if (req.method !== 'GET') return;
   // 🚀 FIX: Skip WebAssembly files completely so they never get turned into HTML fallbacks
  if (req.url.endsWith('.wasm') || req.url.includes('.wasm')) {
     return; // Bypasses service worker caching entirely
  }
  // // Skip chrome-extension:// URLs (cannot be cached)
  if (req.url.startsWith('chrome://extensions')) {
     return; // Let the browser handle extension assets normally
  }  
  event.respondWith(handlePulseRequest(req));
});

console.log("%c[PULSEBROWSER OS KERNEL] PBCompanion.js (Ultra Edition v12.0) Loaded",
  "color:#00FF9C; font-weight:bold; font-family:monospace;");

console.log("[PULSEBROWSER OS KERNEL] Initializing PulseWorld with Accelerated Modules:", now);

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";

// ---------------------------------------------------------
// ⭐ TINYPNG-STYLE COMPRESSION (Canvas → WebP)
// ---------------------------------------------------------
async function compressImageTinyPNGStyle(blob) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (compressed) => {
            resolve(compressed || blob); // fallback
          },
          "image/webp",
          0.82
        );
      } catch (err) {
        console.warn("Compression failed, fallback to original blob:", err);
        resolve(blob);
      }
    };

    img.onerror = () => {
      console.warn("Image load failed during compression, fallback.");
      resolve(blob);
    };

    img.src = URL.createObjectURL(blob);
  });
}


// ---------------------------------------------------------
// ⭐ FETCH → COMPRESS → BASE64 → STORE
// ---------------------------------------------------------
async function fetchAndStoreIcon(host, iconUrl) {
  // ⭐ 1. Check cache first
  if (PBFAVICON_CACHE[host]) {
    const cached = PBFAVICON_CACHE[host];
    // Valid Base64 favicon
    if (typeof cached === "string" &&
        cached.startsWith("data:image") &&
        cached.length > 50) {
      return cached;
    }
    // Valid fallback URL
    if (cached.startsWith("http")) {
      return cached;
    }
  }
  // ⭐ 2. No valid cache → fetch
  try {
    const response = await fetch(iconUrl);
    const osfallback = chrome.runtime.getURL("PulseOSTabs.png"); // ← your OS bubble icon

    // ⭐ HARD STOP: do NOT blob invalid responses
    if (!response.ok) {
      console.warn("Invalid favicon response:", iconUrl, response.status);
      PBFAVICON_CACHE[host] = osfallback;
      saveCache();
      return osfallback; // ← triggers your fallback system
    }

    const blob = await response.blob();

    // ⭐ Fallback if blob is empty
    if (!blob || blob.size === 0) {
      console.warn("Empty favicon blob, falling back:", osfallback);
      PBFAVICON_CACHE[host] = osfallback;
      saveCache();
      return osfallback;
    }

    // ⭐ Decode-test the blob
    const valid = await isBlobValidImage(blob);
    if (!valid) {
      console.warn("Corrupted favicon detected:", iconUrl);
      PBFAVICON_CACHE[host] = osfallback;
      saveCache();
      return osfallback;
    }

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64 = reader.result;
        // ⭐ Validate Base64
        if (
          !base64 ||
          typeof base64 !== "string" ||
          base64.trim() === "" ||
          (base64.startsWith("data:") && base64.length < 20) ||
          base64.startsWith("data:text")
        ) {
          console.warn("Invalid Base64 favicon, falling back:", iconUrl);
          PBFAVICON_CACHE[host] = iconUrl;
          saveCache();
          resolve(iconUrl);
          return;
        }
        // ⭐ Save compressed Base64
        PBFAVICON_CACHE[host] = base64;
        saveCache();
        resolve(base64);
      };

      reader.onerror = () => {
        console.warn("FileReader failed, falling back:", iconUrl);
        PBFAVICON_CACHE[host] = iconUrl;
        saveCache();
        resolve(iconUrl);
      };

      reader.readAsDataURL(blob);
    });

  } catch (err) {
    console.warn("Favicon fetch failed:", iconUrl, err);
    // ⭐ Last resort fallback
    PBFAVICON_CACHE[host] = iconUrl;
    saveCache();
    return iconUrl;
  }
}


async function getFavicon(url, flags = {}) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  let host = u.hostname;
  // ⭐ Preserve www if explicitly present
  if (url.includes("www.") && !host.startsWith("www.")) {
    host = "www." + host;
  }
  // ⭐ Default favicon URL
  let iconURL = `https://${host}/favicon.ico`;
  // ⭐ Strip subdomains unless it's "www"
  const parts = host.split(".");
  if (parts.length > 2 && parts[0] !== "www") {
    const root = parts.slice(parts.length - 2).join(".");
    iconURL = `https://${root}/favicon.ico`;
  }
  let icon = iconURL;
  // ⭐ Special external cases
  try {
    if (host.includes("google.com")) {
      iconURL = "https://www.google.com/favicon.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("mail.google.com") || host.includes("gmail.com")) {
      iconURL = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("chase.com")) {
      iconURL = "https://www.chase.com/etc/designs/chase-ux/favicon.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("office.com")) {
      iconURL = "https://res.cdn.office.net/officehub/images/content/images/unauth-copilotcom/favicon-copilot-brand-refresh-23392c1f66.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("github.com")) {
      iconURL = "https://github.githubassets.com/favicons/favicon.svg";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("youtube.com")) {
      iconURL = "https://www.youtube.com/s/desktop/fe2e0b8b/img/favicon_32x32.png";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("discord.com")) {
      iconURL = "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

  } catch {
    PBFAVICON_CACHE[host] = iconURL;
    saveCache();
    return iconURL;
  }

  // ⭐ Cached → return instantly
  if (PBFAVICON_CACHE[host]) {
    console.log(
      "%c[PULSEBROWSER OS KERNEL] SAVED FAVICON LOCATED: " + host,
      "color:#00FF9C; font-weight:bold; font-family:monospace;"
    );
    return PBFAVICON_CACHE[host];
  }

  // ⭐ PulseWorld realm detection (automatic)
  const PW_REALMS = {
    "pulseworld.net": "PWFavIcon.ico",
    "pulseworld.biz": "PWBFavIcon.ico",
    "pulseworld.me": "PWIFavIcon.ico",
    "pulseworld.money": "PWMFavIcon.ico",
    "binaryos.net": "BOFavIcon.ico",
    "booleanlogic.net": "BLFavIcon.ico",
    "gpuprocessing.net": "GPFavIcon.ico",
    "serviceworker.net": "SWFavIcon.ico",
    "orbitalmap.net": "OMFavIcon.ico"
  };

  const realmKey = Object.keys(PW_REALMS).find(domain => host.endsWith(domain));

  try {
    if (realmKey) {
      iconURL = `${u.origin}/${PW_REALMS[realmKey]}`;
      icon = await fetchAndStoreIcon(host, iconURL);

      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    // ⭐ Normal external favicon fetch
    icon = await fetchAndStoreIcon(host, iconURL);
    PBFAVICON_CACHE[host] = icon;
    saveCache();
    return icon;

  } catch {
    PBFAVICON_CACHE[host] = iconURL;
    saveCache();
    return iconURL;
  }
}

// ---------------------------------------------------------------------------
// HOME UNIVERSE (Your 9 domains)
// ---------------------------------------------------------------------------
const PB_HOMES = [
  "www.pulseworld.me",
  "www.pulseworld.money",
  "www.pulseworld.biz",
  "www.binaryos.net",
  "www.booleanlogic.net",
  "www.gpuprocessing.net",
  "www.serviceworker.net",
  "www.orbitalmap.net",
  "www.pulseworld.net"
];

function IsPartner(origin) {
  return origin.includes("fordfamilyretail")
      || origin.includes("peacesmokeshop")
      || origin.includes("peace-smokeshop")
      || origin.includes("peacesmoke-shop")
      || origin.includes("chromewebstore")
      || origin.includes("fordfamilydistribution")
      || origin.includes("peace-smoke-shop")
      || origin.includes("fordfamilymanagement");
}

function isFavicon(origin) {
  return origin.includes("favicon");
}

function isChrome(origin) {
  return origin.includes("chrome:");
}

function isPulseWorld(origin) {
  return origin.includes("pulseworld.net")
      || origin.includes("orbitalmap.net")
      || ((origin.includes("mcbbhkdjpaakjabngfjmaeihnoilognk") || origin.includes("kkidimiknkgfkjplagaohacidaagcbjg")) && (origin.includes("chromewebstore") || origin.includes("chrome")))
      || origin.includes("booleanlogic.net")
      || origin.includes("binaryos.net")
      || origin.includes("serviceworker.net")
      || origin.includes("gpuprocessing.net")
      || origin.includes("pulseworld.me")
      || origin.includes("pulseworld.money")
      || origin.includes("pulseworld.biz");
}
// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  if (isPulseWorld(url)) return "PulseWorld";
  if (IsPartner(url)) return "Partner";
  if (isChrome(url)) return "Chrome";
  let warmclass = false;
  if (warmTargets.length > 0) {
    warmTargets.forEach(origin => {
      let host = new URL(origin).hostname;
      host = host.replace("https://","");
      host = host.replace("www.","");
      host = host.endsWith("/") ? host.slice(0, -1) : host;
      if (url.includes(host)) warmclass = true;
    });
    if (warmclass) return "Warm-Galaxy";
  }
  if (temporaryLinks.length > 0) {
    temporaryLinks.forEach(origin => {
      let host = new URL(origin).hostname;
      host = host.replace("https://","");
      host = host.replace("www.","");
      host = host.endsWith("/") ? host.slice(0, -1) : host;
      if (url.includes(host)) warmclass = true;
    });
    if (warmclass) return "Warm-Nova";
  }
  return "WWW";
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  let url = tab.url;
  if (url.includes("http")) {
    chrome.sidePanel.setOptions({
      tabId: activeInfo.tabId,
      path: "PBPopup.html",
      enabled: true
    });
  }
  let title = tab.title;
  let page = tab.page;
  let origin = url;

  if (url.includes("newtab")) {
    // url = "impulse://newtab"
    // PulseRealmState.lastURL = url;
    // PulseRealmState.lastPage = "NewTab";
    // PulseRealmState.lastDomainClass = "PulseWorld";
    // PulseRealmState.lastTitle = "PulseBrowser OS Console";
  } else {
    if (url.includes("PulseWorldAuthority")) {
      PulseRealmState.lastDomainClass = "Not Exactly Sure...";
    } else {
      const domainClass = pbDomainClass(url);
      PulseRealmState.lastDomainClass = domainClass;
    }
    
    PulseRealmState.lastURL = url;
    PulseRealmState.lastPage = page;
    PulseRealmState.lastTitle = title;
    PulseRealmState.navHistory.push(url);
    PB_LOG2.event("PBNAV_EVENT", url);
  }

  // Temporal navigation warm
  if (typeof PBTemporalCache?.noteNavigation === "function") {
    PBTemporalCache.noteNavigation(url);
  }
  if (typeof PBTemporalCache?.warmRecentAssets === "function") {
    PBTemporalCache.warmRecentAssets(origin);
  }
  // Universal boost warm-path
  if (typeof PBUniversalBoost2?.warmTab === "function") {
    PBUniversalBoost2.warmTab(tab);
  }
});

// ============================================================================
//  PBAccelerator.js — PulseBrowser Acceleration Engine (Ultra Edition v10.0)
//  Fully automatic: DNS/TLS/Protocol warm, preconnect, preload, prefetch,
//  GPU warm, decode warm, realm warm, sibling warm, asset warm, nav-driven.
//  All systems ON by default. Buttons are optional, not required.
// ============================================================================

console.log("%c[PULSEBROWSER] PBAccelerator (Ultra Edition v10.0) loaded",
  "color:#00C8FF; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// SETTINGS LOADER (but we force sane defaults ON)
// ---------------------------------------------------------------------------

async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(PB_SW_SETTINGS, (data) => {
      const S = data || PB_SW_SETTINGS;

      // Force all acceleration systems ON by default
      S.accelDNSWarm      = S.accelDNSWarm      !== false;
      S.accelTLSWarm      = S.accelTLSWarm      !== false;
      S.accelPreconnect   = S.accelPreconnect   !== false;
      S.accelPreload      = S.accelPreload      !== false;
      S.accelPrefetch     = S.accelPrefetch     !== false;
      S.accelGPUWarm      = S.accelGPUWarm      !== false;
      S.accelDecodeWarm   = S.accelDecodeWarm   !== false;
      S.accelRealmWarm    = S.accelRealmWarm    !== false;
      S.accelAutoNav      = S.accelAutoNav      !== false; // auto on navigation
      S.accelHomeWarmBoot = S.accelHomeWarmBoot !== false; // auto warm boot for home universe
      S.experimentalQuantumRouting = S.experimentalQuantumRouting !== false; 
      S.accelModuleWarmBoot = S.accelModuleWarmBoot !== false;
      S.enablePulseEarnOverlay = S.enablePulseEarnOverlay !== false; 
      S.enablePulsePalConsole = S.enablePulsePalConsole !== false;
      S.enableDevOverlay = S.enableDevOverlay !== false; 
      S.enableDevCaches = S.enableDevCaches !== false;
      S.enablePulseEarnerEngine = S.enablePulseEarnerEngine !== false;
      S.enablePulsePal = S.enablePulsePal !== false;
      PB_LOG2.load("getSettings()", S);
      resolve(S);
    });
  });
}

// ---------------------------------------------------------------------------
// ASSET TARGETS (JS/CSS/WASM/JSON)
// ---------------------------------------------------------------------------
const PB_ASSETS = [
  "/", "/index.html", "/DriftCompanion.js", "/PWFavIcon.ico", "/PWMFavIcon.ico", "/PWBFavIcon.ico", "/PWManifest.json",
  "/site.webmanifest", "/404.html", "/_EXPRESSIONS/_PEX/BUILD/PulseWorldBarrier-Alpha.webp.pex",
  "/_EXPRESSIONS/_PEX/BUILD/PulseEngine.webp.pex", "/_EXPRESSIONS/_PEX/BUILD/PulseWorldOSBootLoader.webp.pex",
  "/_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo.webp.pex", "/_EXPRESSIONS/_PEX/BUILD/AIOvermindPal.webp.pex",
  "/_EXPRESSIONS/_PEX/BUILD/AIOvermindPal3.webp.pex", "/_EXPRESSIONS/_VIDEOS/PulseWorldOSBoot2",
  "/PULSEConfig/PulseWorldReality.txt","/PULSEConfig/PulseWorldInventory.txt","/PULSEConfig/PulseWorldBusiness.txt",
  "/PULSEConfig/PulseWorldRewards.txt", "/PULSEConfig/PulseWorldVault.txt", "/PULSEConfig/PulseWorldExtensions.txt"
];

const PB_GENERIC_ASSETS = [
  "/", 
  "/favicon.ico",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
  "/logo.png",
  "/index.html",
  "/main.js",
  "/styles.css"
];

function isOffline(origin) {
  return origin.includes("pw=offline");
}

function isAMoment(origin) {
  return origin.includes("pw=moment");
}


// ---------------------------------------------------------------------------
// DNS WARM (resolve domain early)
// ---------------------------------------------------------------------------
function pbDNSWarm(origin) {
  try {
    let link = document.getElementById("link");
    if (!link) link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = origin;
    document.head.appendChild(link);

    console.log("%c[PBAccelerator] DNS Warm:", "color:#00C8FF;", origin);
  } catch (_) {}
}


// ---------------------------------------------------------------------------
// TLS WARM (establish TLS early)
// ---------------------------------------------------------------------------
function pbTLSWarm(origin) {
  try {
    let link = document.getElementById("link");
    if (!link) link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);

    console.log("%c[PBAccelerator] TLS Warm:", "color:#00C8FF;", origin);
  } catch (_) {}
}

// ---------------------------------------------------------------------------
// PRECONNECT (DNS/TLS/TCP warm-path)
// ---------------------------------------------------------------------------
function pbPreconnect(origins = []) {
  origins.forEach((origin) => {
    pbDNSWarm(origin);
    pbTLSWarm(origin);
  });
  console.log("%c[PBAccelerator] Preconnect:", "color:#00C8FF;", origins);
}

// ---------------------------------------------------------------------------
// PREFETCH (network warm-path) + Realm counter
// ---------------------------------------------------------------------------
async function pbPrefetch(urls = []) {
  if (!urls || urls.length === 0) return;

  // ⭐ Load permanent per-URL fail-cache
  const store = await chrome.storage.local.get(["pb_fail_cache"]);
  const fails = store.pb_fail_cache || {};

  let warmedCount = 0;

  for (const url of urls) {
    if (
      !url ||
      (url.startsWith("chrome://") && !url.includes("newtab")) ||
      url.startsWith("chrome-extension://")
    ) {
      continue;
    }
    // ⭐ Skip permanently failed URLs
    if (fails[url] >= 2) {
      continue;
    }

    try {
      const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

      if (res && res.status === 404) {
        fails[url] = (fails[url] || 0) + 1;
        lastFailURL = url;
        if (fails[url] >= 2) {
          await safeStorageSet({ pb_fail_cache: fails });
        }
      } else {
        warmedCount++;
      }
    } catch (_) {}
  }

  // ⭐ Save updated fail-cache
  await safeStorageSet({ pb_fail_cache: fails });

  if (warmedCount > 0) {
    PulseRealmState.warmAssetsTriggered += warmedCount || 1;
  }
}

// ---------------------------------------------------------------------------
// PRELOAD (asset warm-path) + Realm counter
// ---------------------------------------------------------------------------
async function pbPreload(origin) {
  if (!origin) return;

  const urls = isPulseWorld(origin)
    ? PB_ASSETS.map(p => origin + p)
    : PB_GENERIC_ASSETS.map(p => origin + p);

  // ⭐ Load permanent per-URL fail-cache
  const store = await chrome.storage.local.get(["pb_fail_cache"]);
  const fails = store.pb_fail_cache || {};

  let warmedCount = 0;

  for (const url of urls) {
    if (
      !url ||
      (url.startsWith("chrome://") && !url.includes("newtab")) ||
      url.startsWith("chrome-extension://")
    ) {
      continue;
    }

    // ⭐ Skip permanently failed URLs
    if (fails[url] >= 2) {
      continue;
    }

    try {
      const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

      if (res && res.status === 404) {
        fails[url] = (fails[url] || 0) + 1;
        lastFailURL = url;
        if (fails[url] >= 2) {
          await safeStorageSet({ pb_fail_cache: fails });
        }
      } else {
        warmedCount++;
      }
    } catch (_) {}
  }

  // ⭐ Save updated fail-cache
  await safeStorageSet({ pb_fail_cache: fails });

  if (warmedCount > 0) {
    PulseRealmState.warmAssetsTriggered += warmedCount || 1;
  }
}

// ---------------------------------------------------------------------------
// DECODE WARM (image decode warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbDecodeWarm() {
  PulseRealmState.imagesDecoded += 1;
  console.log("%c[PBAccelerator] Decode Warm", "color:#00C8FF;");
}


// ---------------------------------------------------------------------------
// REALM WARM (PulseWorld OS warm-path)
// ---------------------------------------------------------------------------
function pbHomeRealmWarm(origin) {
  const urls = [
    origin + "/PULSEConfig/PulseWorldReality.txt",
    origin + "/PULSEConfig/PulseWorldInventory.txt",
    origin + "/PULSEConfig/PulseWorldVault.txt",
    origin + "/PULSEConfig/PulseWorldExtensions.txt",
    origin + "/PULSEConfig/PulseWorldSettings.txt",
    origin + "/PULSEConfig/PulseWorldFounders.txt",
    origin + "/PULSEConfig/PulseWorldTeam.txt",
    origin + "/PULSEConfig/PulseWorldTiers.txt",
    origin + "/PULSEConfig/PulsePalSettings.txt",
    origin + "/PULSEConfig/PulseWorldRewards.txt",
    origin + "/PULSEConfig/PulseWorldScanner.txt",
    origin + "/PULSEConfig/PulseWorldHistory.txt",
    origin + "/PULSEConfig/PulseWorldMeshLink.txt",
    origin + "/PULSEConfig/PULSE-ENGINE-BLOCK.txt",
    origin + "/PULSEConfig/PulseWorldBusiness.txt"
  ];
  pbPrefetch(urls);
  console.log("%c[PBAccelerator] Realm Warm:", "color:#00C8FF;", origin);
}

function pbRealmWarm(origin) {
  // Normalize origin: remove trailing slash if present
  const base = origin.endsWith("/") ? origin.slice(0, -1) : origin;

  const urls = [
    base + "/index.html",
    base + "/404.html",
    base + "/"
  ];

  pbPrefetch(urls);
  console.log("%c[PBAccelerator] Realm Warm:", "color:#00C8FF;", origin);
}



async function pbWarmPaths(origins) {
  PulseBrowserSettings = await getSettings();
  // Ignore chrome:// and extension pages EXCEPT newtab
  origins.forEach((origin) => {
    pbWarmPath(origin);
  });
}
// ---------------------------------------------------------------------------
// FULL WARM-PATH (preconnect + preload + prefetch + GPU + decode + realm)
// Also emits PBACC_WARMPATH_EVENT for Realm HUD.
// ---------------------------------------------------------------------------
async function pbWarmPath(origin) {
  // Ignore chrome:// and extension pages EXCEPT newtab
  if (
    !origin ||
    (origin.startsWith("chrome://") && !origin.includes("newtab")) ||
    origin.startsWith("chrome-extension://")
  ) {
    return;
  }
  // Universal boost warm-path
  if (typeof PBUniversalBoost2?.warmOrigin === "function") {
    PBUniversalBoost2.warmOrigin(origin);
  }

  if (PulseBrowserSettings.accelDNSWarm)      pbDNSWarm(origin);
  if (PulseBrowserSettings.accelTLSWarm)      pbTLSWarm(origin);
  if (PulseBrowserSettings.accelPreconnect)   pbPreconnect([origin]);
  if (PulseBrowserSettings.accelPreload)      pbPreload(origin);

  const siblingPaths = [
    "/", "/privacy", "/data", "/termsofuse", "/cookies",
    "/404", "/about"
  ];

  const siblingURLs = siblingPaths.map((p) => origin + p);
  if (PulseBrowserSettings.accelPrefetch) pbPrefetch(siblingURLs);

  if (PulseBrowserSettings.accelDecodeWarm) pbDecodeWarm();
  if (PulseBrowserSettings.accelRealmWarm)  pbRealmWarm(origin);
  

  console.log(
    "%c[PBAccelerator] Warm-path (full):",
    "color:#00C8FF; font-weight:bold;",
    origin
  );
}


// ---------------------------------------------------------------------------
// MAIN ACCELERATION HOOK (automatic on navigation)
// ---------------------------------------------------------------------------
async function pbAccelerate(url) {
  const domainClass = pbDomainClass(url);

  // Normalize origin: remove trailing slash if present
  const rawOrigin = new URL(url).origin;
  const origin = rawOrigin.endsWith("/") ? rawOrigin.slice(0, -1) : rawOrigin;

  console.log("%c[PBAccelerator] Accelerate:", "color:#00C8FF;", url, "class:", domainClass);

  if (domainClass === "PulseWorld") {
    await pbWarmPath(origin);
  } else {
    PulseBrowserSettings = await getSettings();

    // WWW acceleration: preconnect + basic prefetch
    if (PulseBrowserSettings.accelPreconnect) pbPreconnect([origin]);

    if (PulseBrowserSettings.accelPrefetch) {
      pbPrefetch([
        origin + "/",        // always safe now
        origin + "/about"    // always safe now
      ]);
    }
  }
}


// ---------------------------------------------------------------------------
// AUTO HOME WARM-BOOT (for your 9 domains)
// ---------------------------------------------------------------------------
async function pbHomeWarmBoot() {
  const origins = PB_HOMES.map((d) => "https://" + d);
  pbPreconnect(origins);

  origins.forEach((origin) => {
    pbPreload(origin);
    pbHomeRealmWarm(origin);
  });

  console.log("%c[PBAccelerator] Home Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;");
}

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
    const settings = result[EXTENSION_SETTINGS_KEY] || {};

    return settings;
  } catch (err) {
    console.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}


async function pbModuleWarmBoot() {
  const settings = await pbLoadExtensionSettings();
  PulseBrowserSettings = await getSettings();
  PulseRealmSettings = settings;
  let externalSearchLink = settings.externalSearchLink || "https://www.google.com";
  // Collect all accelerated module links directly from settings
  warmTargets = [
    settings.externalBankLink,
    settings.externalEmailLink,
    settings.externalSocialLink,
    settings.externalWorkLink,
    settings.externalStreamingLink,
    settings.externalShoppingLink,
    externalSearchLink,
    settings.acceleratedModule1Link,
    settings.acceleratedModule2Link,
    settings.acceleratedModule3Link,
    settings.acceleratedModule4Link,
    settings.acceleratedModule5Link,
    settings.acceleratedModule6Link
  ];

  if (warmTargets.length === 0) return;

  // Preconnect all module targets
  pbPreconnect(warmTargets);

  // Warm each module target
  warmTargets.forEach(origin => {
    pbRealmWarm(origin);
  });

  console.log(
    "%c[PBAccelerator] Module Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;"
  );
}

function getWarmInterval() {
    const base = 45000;
// ⭐ Add human-like jitter (±20%)
    const jitterRange = base * 0.17;
    const jitter = (Math.random() * jitterRange * 2) - jitterRange;

    // ⭐ Final interval
    const interval = Math.max(5000, base + jitter); // never below 5s

    return Math.floor(interval);
}

function startWarmBootLoop() {
  async function loop() {
    try {
      await pbWarmBoot();
    } catch (_) {}

    const interval = getWarmInterval();
    PB_LOG2.info("[PBWarmBootLoop] Next warm in " + interval + " ms");
    
    setTimeout(loop, interval);
  }

  setTimeout(loop, 600);
}

function TestingSequence(OvermindOrders) {
  PB_LOG2.info("[Companion_Shout_Out] Still Here! Trying not to Sleep! Syncing Overmind Orders!", OvermindOrders);
  OvermindCrossTabSync(OvermindOrders);
}

setInterval(() => {
  TestingSequence(OvermindOrders);
}, 15000);

startWarmBootLoop();

chrome.runtime.onInstalled.addListener(async () => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: '🧠 PulseBrowser OS - Panel',
    contexts: ['all']
  });
  chrome.contextMenus.create({
    id: 'openSettings',
    title: '🌐 PulseBrowser OS - Settings',
    contexts: ['all']
  });
  chrome.contextMenus.create({
    id: 'viewHUDOverlay',
    title: '📺 PulseBrowser OS - HUD Display',
    contexts: ['all']
  });
  chrome.contextMenus.create({
    id: 'attemptOfflineSnapshot',
    title: '🔍 PulseBrowser OS - Offline Snapshot',
    contexts: ['all']
  });
  chrome.contextMenus.create({
    id: 'runWASMTest',
    title: '🔍 PulseBrowser OS - Run Earn Test',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.setOptions({
      tabId: tab.tabId,
      path: "PBPopup.html",
      enabled: true
    });
    chrome.sidePanel.open({ windowId: tab.windowId });
  } else if (info.menuItemId === 'openSettings') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.setOptions({
      tabId: tab.tabId,
      path: "PBSettings.html",
      enabled: true
    });
    chrome.sidePanel.open({ windowId: tab.windowId });
  } else if (info.menuItemId === 'viewHUDOverlay') {
    HelperHudBoolean = true;
  } else if (info.menuItemId === 'attemptOfflineSnapshot') {
    TakeOfflineSnapshot = true;
  } else if (info.menuItemId === 'runWASMTest') {
    try {
      (async () => {
        await runEngineTest();
        PB_LOG2.event("System Companion: Pulse Earner Wasm Engine Initiating for Backup..", pulseWasmCompute);
      })();
    } catch (err) {
      CompanionMessage = `[<font color="red">FAILURE</font>] Pulse WASM TEST Failed.. ` + timeProof;
      PB_LOG2.event("System Companion: Pulse Earner Wasm Engine had an Error!", pulseWasmCompute);
    }
  }
});


function isValid(t) {
  return (
    typeof t === "number" &&
    Number.isFinite(t) &&
    t > 0
  );
}

async function fetchWithYourQueryStringCache(url) {
  try {
    const OfflineCache = makeOfflineKey(url);
    const net =  await fetch(OfflineCache, { cache: 'no-store' });

    if (net && net.ok && (!req.url.startsWith('chrome-extension://'))) {
      PULSE_ONLINE = true;
      pulseSetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG, 1);
      pulseInc(PULSE_SHARED_INDEX.CACHE_MISS_COUNT);
    }
    
  } catch (err) {
    PULSE_ONLINE = false;
    pulseSetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG, 0);
  }
}

function isCacheableURL(url) {
  // // Reject obvious malformed recursive paths like /app.css/app.css
  // if (url.match(/\/[^\/]+\.[a-z]+\/[^\/]+\.[a-z]+/i)) return false;

  // Reject file/./file patterns
  if (url.match(/\.[a-z]+\/\.[a-z]+$/i)) return false;

  // // Reject ONLY query strings that contain a slash AFTER the ?
  // if (url.match(/\?.*\//)) return false;

  // Everything else is considered cacheable
  return true;
}
class PulseWasmEngine {
  constructor() {
    this.wasmInstance = null;
    this.isLoaded = false;
  }

  async EarnerLockedandLoaded() {
    this.isLoaded = true;
    if (typeof chrome !== 'undefined' && chrome.power) {
      chrome.power.requestKeepAwake("system");
    }
    console.log("[SYSTEM WASM ENGINE] Locked and Loaded!");
  }

  // Load the pure binary math module into memory
  async initEngine(wasmBinaryUrl) {
    if (!wasmBinaryUrl && typeof chrome !== 'undefined' && chrome.runtime) {
      wasmBinaryUrl = chrome.runtime.getURL("PulseEarnWarmer.wasm");
    }
    if (this.isLoaded) return;
    
    try {
      // Fetch the highly dense compiled binary module
      const response = await fetch(wasmBinaryUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch SYSTEM WASM: ${response.status} ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      
      // Compile natively right on that 1ms service worker line
      const module = await WebAssembly.compile(buffer);
      
      // Match the exact namespace strings the binary expects
      this.wasmInstance = await WebAssembly.instantiate(module, {
        my_namespace: {
          imported_func: (arg) => { 
            console.log("[SYSTEM WASM CALLBACK] Function invoked from WASM:", arg); 
          }
        },
        env: {
          memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
          abort: () => { console.error("[SYSTEM WASM ABORT] Critical execution crash"); }
        }
      });

      // Debug aid: Safely lists all real exported names from whatever binary loaded
      console.log("[SYSTEM WASM EXPORTS] Available keys:", Object.keys(this.wasmInstance.exports));

      await this.EarnerLockedandLoaded();
      console.log("[SYSTEM WASM ENGINE] Pure mathematical module stable and hot.");
    } catch (err) {
      console.error("[SYSTEM WASM ENGINE] Initialization failed:", err);
    }
  }

  // The pure compute pipeline: Input bytes -> Output proofs
  async executeProofJob(rawPayloadData) {
    if (!this.isLoaded) throw new Error("SYSTEM WASM engine not ready");
    
    // Resolve the target function dynamically to ensure runtime stability
    const targetFunc = this.wasmInstance.exports.computeMathProofs 
                    || this.wasmInstance.exports._computeMathProofs 
                    || this.wasmInstance.exports.exported_func;

    if (typeof targetFunc !== 'function') {
      throw new Error(`Execution failed: Target function signature missing from WASM exports.`);
    }

    // --- FALLBACK GUARD FOR TEST BINARY (simple.wasm) ---
    // If testing using the MDN file, it ignores memory logic and returns 42 immediately
    if (targetFunc === this.wasmInstance.exports.exported_func) {
      const testValue = targetFunc(); // Triggers the internal my_namespace.imported_func callback
      if (typeof chrome !== 'undefined' && chrome.power) chrome.power.releaseKeepAwake();
      
      // Return a simulated mock proof containing the numeric test result
      return new Uint8Array([testValue]); 
    }

    // --- PRODUCTION PIPELINE (PulseEarnWarmer.wasm) ---
    const inputArray = new Uint8Array(rawPayloadData);
    const length = inputArray.length;

    // Safely look up or handle memory positioning addresses
    let inputAddress = 0;
    if (typeof this.wasmInstance.exports.malloc === 'function') {
      inputAddress = this.wasmInstance.exports.malloc(length);
    } else if (this.wasmInstance.exports.input_buffer_pointer) {
      inputAddress = this.wasmInstance.exports.input_buffer_pointer.value || this.wasmInstance.exports.input_buffer_pointer;
    }

    // Write your payload to the shared linear memory block
    const wasmMemoryBuffer = new Uint8Array(this.wasmInstance.exports.memory.buffer);
    wasmMemoryBuffer.set(inputArray, inputAddress);
    
    // Execute computational processing loops
    const resultAddress = targetFunc(inputAddress, length);
    
    // Read the processed byte data out of memory space
    const resultLength = 32; 
    const proofResult = new Uint8Array(this.wasmInstance.exports.memory.buffer, resultAddress, resultLength);

    // Free memory allocations to keep the service worker clean
    if (typeof this.wasmInstance.exports.free === 'function') {
      this.wasmInstance.exports.free(inputAddress);
    }

    if (typeof chrome !== 'undefined' && chrome.power) {
      chrome.power.releaseKeepAwake();
    }
    
    // Decouple array allocation structure from WASM memory references
    return proofResult.slice();
  }
}

// Instantiate the isolated engine
const pulseWasmCompute = new PulseWasmEngine();
if (typeof PB_LOG2 !== 'undefined') {
  PB_LOG2.event("System Companion: Pulse Earner Online and Listening for Backup..", pulseWasmCompute);
}

// // ============================================================================
// // PURE WASM EXECUTION ENGINE (ISOLATED COMPUTE LAYER)
// // ============================================================================
// class PulseWasmEngine {
//   constructor() {
//     this.wasmInstance = null;
//     this.isLoaded = false;
//   }

//   async EarnerLockedandLoaded() {
//     this.isLoaded = true;
//     if (chrome && chrome.power) chrome.power.requestKeepAwake("system");
//     console.log("[SYSTEM WASM ENGINE] Locked and Loaded!");
//   }

//     // Load the pure binary math module into memory
//   async initEngine(wasmBinaryUrl) {
//     if (!wasmBinaryUrl) wasmBinaryUrl = chrome.runtime.getURL("PulseEarnWarmer.wasm");
//     if (this.isLoaded) return;
    
//     try {
//       // Fetch the highly dense compiled binary module
//       const response = await fetch(wasmBinaryUrl, { cache: 'no-store' });
//       // Safety Check: Ensure the server actually returned a successful response
//       if (!response.ok) {
//         throw new Error(`Failed to fetch SYSTEM WASM: ${response.status} ${response.statusText}`);
//       }
//       const buffer = await response.arrayBuffer();
      
//       // Compile natively right on that 1ms service worker line
//       const module = await WebAssembly.compile(buffer);
      
//       // Match the exact namespace strings the binary expects
//       this.wasmInstance = await WebAssembly.instantiate(module, {
//         my_namespace: {
//           imported_func: (arg) => { 
//             console.log("[SYSTEM WASM CALLBACK] Function invoked from WASM:", arg); 
//           }
//         },
//         env: {
//           memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
//           abort: () => { console.error("[SYSTEM WASM ABORT] Critical execution crash"); }
//         }
//       });

//       await this.EarnerLockedandLoaded();
//       console.log("[SYSTEM WASM ENGINE] Pure mathematical module stable and hot.");
//     } catch (err) {
//       console.error("[SYSTEM WASM ENGINE] Initialization failed:", err);
//     }
//   }

//     // The pure compute pipeline: Input bytes -> Output proofs
//   async executeProofJob(rawPayloadData) {
//     if (!this.isLoaded) throw new Error("WASM engine not ready");
    
//     // 1. Transform payload data into a dense binary array
//     const inputArray = new Uint8Array(rawPayloadData);
//     const length = inputArray.length;

//     // 2. Allocate spaces inside WASM memory if your module exposes allocation exports
//     // (Commonly named 'malloc', 'allocate', or custom buffer management exports)
//     let inputAddress = 0;
//     if (typeof this.wasmInstance.exports.malloc === 'function') {
//       inputAddress = this.wasmInstance.exports.malloc(length);
//     } else if (this.wasmInstance.exports.input_buffer_pointer) {
//       // Alternate pattern: Static pre-allocated buffer address
//       inputAddress = this.wasmInstance.exports.input_buffer_pointer.value || this.wasmInstance.exports.input_buffer_pointer;
//     }

//     // 3. Copy the JS array data into the WebAssembly memory buffer view
//     const wasmMemoryBuffer = new Uint8Array(this.wasmInstance.exports.memory.buffer);
//     wasmMemoryBuffer.set(inputArray, inputAddress);
    
//     // 4. Run your specific math execution, passing the address pointer and length
//     // Note: If your custom WASM module strictly maps to a single default memory view,
//     // modify these parameters to match your binary signature.
//     const resultAddress = this.wasmInstance.exports.computeMathProofs(inputAddress, length);
    
//     // 5. Extract the high-density result from WASM memory
//     // Important: Determine the response size (here assuming a fixed size or a known layout)
//     const resultLength = 32; // Replace with your exact expected output proof size in bytes
//     const proofResult = new Uint8Array(this.wasmInstance.exports.memory.buffer, resultAddress, resultLength);

//     // Free memory if your module exposes a 'free' command to prevent leaks
//     if (typeof this.wasmInstance.exports.free === 'function') {
//       this.wasmInstance.exports.free(inputAddress);
//     }

//     if (typeof chrome !== 'undefined' && chrome.power) {
//       chrome.power.releaseKeepAwake();
//     }
    
//     // Slice returns a decoupled JS array so WASM memory garbage collection can safely run
//     return proofResult.slice();
//   }

//   // // The pure compute pipeline: Input bytes -> Output proofs
//   // async executeProofJob(rawPayloadData) {
//   //   if (!this.isLoaded) throw new Error("SYSTEM WASM engine not ready");
    
//   //   // 1. Transform payload data into a dense binary array
//   //   const inputArray = new Uint8Array(rawPayloadData);
    
//   //   // 2. Run your specific math execution (e.g., factoring out formulas)
//   //   // This executes at raw native silicon speeds inside the worker
//   //   const resultAddress = this.wasmInstance.exports.computeMathProofs(inputArray);
    
//   //   // 3. Extract the high-density result from WASM memory
//   //   const proofResult = new Uint8Array(this.wasmInstance.exports.memory.buffer, resultAddress);
//   //   if (chrome && chrome.power) chrome.power.releaseKeepAwake();
//   //   return proofResult;
//   // }
// }

// // Instantiate the isolated engine
// const pulseWasmCompute = new PulseWasmEngine();
// PB_LOG2.event("System Companion: Pulse Earner Online and Listening for Backup..", pulseWasmCompute);

async function runProtectedCompute(computeTaskFunction) {
  try {
    // 1. Lock the system right on that invisible line before the execution
    if (chrome && chrome.power) {
      CompanionDeprivation = true;
      chrome.power.requestKeepAwake("system");
      console.log("[POWER GOVERNOR] System locked awake for calculation...");
    }

    // 2. Execute your pure WASM math proof or WebGPU logic
    const result = await computeTaskFunction();
    return result;

  } catch (error) {
    console.error("[POWER GOVERNOR] Calculation crashed:", error);
    throw error;
  } finally {
    // 3. ALWAYS release the lock inside a 'finally' block!
    // This guarantees that even if your code errors out, the user's computer won't stay awake forever.
    if ((chrome && chrome.power) && !CompanionDeprivation) {
      chrome.power.releaseKeepAwake();
      console.log("[POWER GOVERNOR] System lock released cleanly.");
    }
  }
}

async function initializeExoskeleton() {
  aiSession = await LanguageModel.create({
    systemPrompt: "You are a local, cybernetic cognitive assistant with access to the PulseWorld multiverse and Chrome's browser",
    expectedOutputs: [{ type: "text", languages: ["en"] }]
  });
}


function backToOriginal() {
  chrome.storage.local.get("originalTabId", data => {
    if (data.originalTabId) {
      chrome.tabs.update(data.originalTabId, { active: true });
    }
  });
}

async function runEngineTest() {
  console.log("[TEST] Initializing WASM engine testing rig...");
  
  await pulseWasmCompute.initEngine();

  // 2. Craft an artificial mock byte payload (e.g., 16 dummy working bytes)
  const mockPayload = [0x1A, 0x2B, 0x3C, 0x4D, 0x5E, 0x6F, 0x70, 0x81, 0x92, 0xA3, 0xB4, 0xC5, 0xD6, 0xE7, 0xF8, 0x09];
  const start = performance.now();
  console.time("[PERFORMANCE] Native WASM Execution Time");
  try {
    // 3. Fire the execution job
    const outputProof = await pulseWasmCompute.executeProofJob(mockPayload);
        
    if (outputProof) {
      console.timeEnd("[PERFORMANCE] Native WASM Execution Time");
      timeProof = performance.now() - start;
      let timecolor = "lightgreen";
      if (timecolor > 50) {
        timecolor = "red";
      } else if (timecolor > 25) {
        timecolor = "orange";
      } else if (timecolor > 10) {
        timecolor = "gold";
      }
      timeProof = `[<font color="${timecolor}">` + timeProof.toFixed(4).toLocaleString() + ` ms</font>]`;
      WasmSuccess = true;
      console.log("[SUCCESS] Received WASM TEST Proof Bytes back from Silicon:", outputProof);
    }
    
  } catch (testError) {
    console.timeEnd("[PERFORMANCE] Native WASM Execution Time");
    console.error("[FAILED] WASM TEST Execution Pipeline broke:", testError);
    WasmSuccess = false;
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case "PULSE_OS_NOTIFY":
      console.log("%c[PULSEWORLD CONTENT] Kernel Notification:",
        "color:#00C8FF; font-family:monospace;", msg.text);
      break;

    case "HISTORY_BACK":
      if (msg.url) {
        comeback = true;
        comebackURL = msg.url;
        pbPreconnect([msg.url]);
        fetch(msg.url, { mode: "no-cors" }).catch(() => {});
        setTimeout(backToOriginal, 200);
        sendResponse({ ok: true });
      }
      break;

    case "PB_GATHER_ORDERS":
      if (msg.aiSettingsSize) {
        aiSettingsSize = msg.aiSettingsSize;
      } 
      if (msg.aiPopupSize) {
        aiPopupSize = msg.aiPopupSize;
      }
      sendResponse({ ok: true, OvermindOrders });
      OvermindOrders = null;
      break;

    case "PB_COMPANION_PAUSE":
      ServiceWorkerOnline = false;
      safeStorageSet({ ServiceWorkerOnline });
      sendResponse({ ok: true, ServiceWorkerOnline });
      break;

    case "PB_COMPANION_RESUME":
      ServiceWorkerOnline = true;
      safeStorageSet({ ServiceWorkerOnline });
      sendResponse({ ok: true, ServiceWorkerOnline });
      break;

    case "OPEN_TAB_BACK":
      sendResponse({ ok: true, comeback, comebackURL });
      comeback = false;
      comebackURL = null;
      break;
    
    case "PB_COMPANION_CHECK":
      if (msg.pulseTabs) pulseTabs = msg.pulseTabs;
      if (msg.CompanionDeprivation) {
        if (!WasmSuccess) {
          if (!CompanionDeprivation) {
            CompanionMessage = "Always Learning and Thriving..";
          } else if (CompanionMessage === "<-- Infusing Earning Adrenaline -->") {
            CompanionMessage = "Earning Adrenaline Infused & Ready..";
          } else if (CompanionMessage === "Earning Adrenaline Infused & Ready..") {
            CompanionMessage = "Waiting for Jobs for Submission...";
          } else if (CompanionMessage === "Waiting for Jobs for Submission...") {
            CompanionMessage = "<-- Running a PulseEarner WASM Test Job -->";
            try {
              (async () => {
                // Fire the test execution
                await runEngineTest();
                PB_LOG2.event("System Companion: Pulse Earner Wasm Engine Initiating for Backup..", pulseWasmCompute);
              })();
            } catch (err) {
              CompanionMessage = `[<font color="red">FAILURE</font>] Pulse WASM TEST Failed.. ` + timeProof;
              PB_LOG2.event("System Companion: Pulse Earner Wasm Engine had an Error!", pulseWasmCompute);
            }
          } else {
            CompanionMessage = "<-- Infusing Earning Adrenaline -->";
          }
          CompanionDeprivation = msg.CompanionDeprivation;
        } else {
          CompanionMessage = `[<font color="lightgreen">SUCCESS</font>] Received WASM TEST Proof.. ` + timeProof;
        }
      }
      // Load cache from storage at startup
      chrome.storage.local.get(["ServiceWorkerOnline"], (res) => {
        if (res.ServiceWorkerOnline) {
          ServiceWorkerOnline = res.ServiceWorkerOnline;
        }
      });
      sendResponse({ ok: true, ServiceWorkerOnline, CompanionMessage });
      return true;
    
    case "PBEXTSETTINGS_GET":
      pbLoadExtensionSettings().then((settings) => {
        sendResponse({ ok: true, settings });
      });
      return true;
    
    case "PBCONTENT_REALM_CLAIM":
      if (msg.realm) {
        const realm = msg.realm;
        let pwoffline = makeOfflineKey(realm);
        comebackURL = pwoffline;
        pbPrefetch([pwoffline]);
        PB_LOG2.save("PBCONTENT_REALM_CLAIM", pwoffline);
        sendResponse({ ok: true, realm: pwoffline });
      }
      break;

    case "PBAUTHORITY_REALM":
      if (msg.realm) {
        authorityRealm = msg.realm;
        sendResponse({ ok: true });
      }
      break;

    case "PBEARNER_HIDDEN":
      if (msg.EarnHidden) {
        EarnHidden = msg.EarnHidden;
        console.log(EarnHidden);
        sendResponse({ ok: true, EarnHidden });
      }
      break;

    case "PBAUTHORITY_REALM_CLAIM":
      sendResponse({ ok: true, realm: authorityRealm, pulseTabs });
      authorityRealm = null;
      break;

    case "PBSETTINGS_GET":
      pbLoadSettings().then((settings) => {
        PulseRealmState.settings = settings || {};
        PulseRealmSettings = settings || {};
        sendResponse({ ok: true, settings });
      });
      return true;

    case "PBSETTINGS_SET":
      pbSaveSettings(msg.settings || {}).then(() => {
        PB_LOG2.info("PBSETTINGS_SET", msg.settings);
        sendResponse({ ok: true });
      });
      return true;

    case "PBCONSOLE_SET":
      pbSaveConsole(msg.console || {}).then(() => {
        PB_LOG2.info("PBCONSOLE_SET", msg.console);
        sendResponse({ ok: true });
      });
      return true;

    case "PBSETTINGS_RESET":
      pbSaveSettings(PB_SW_SETTINGS).then(() => {
        PB_LOG2.info("PBSETTINGS_RESET", "Defaults Restored");
        sendResponse({ ok: true });
      });
      return true;

    // -------------------------------------------------------
    // NAVIGATION EVENT → automatic acceleration
    // -------------------------------------------------------
    case "PBNAV_EVENT":
      if (msg.url) {
        const realm = msg.url;
        pbPrefetch([realm]);
        pbAccelerate(realm);
        if (realm.includes("PulseWorldAuthority")) {
          PulseRealmState.lastDomainClass = "Not Exactly Sure...";
        } else {
          PulseRealmState.lastDomainClass = msg.domainClass;
        }
        let origin = new URL(realm).origin
        PulseRealmState.lastWarmOrigin = origin;
        PulseRealmState.lastURL = realm;
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.navHistory.push(realm);
        PulseRealmState.navEvents.push(msg);
        PB_LOG2.event("PBNAV_EVENT", realm);
      }
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // Manual hooks (DevOverlay / popup)
    // -------------------------------------------------------
    case "PBACC_PREFETCH":
      if (Array.isArray(msg.urls)) pbPrefetch(msg.urls);
      sendResponse({ ok: true });
      break;

    case "PBACC_PRECONNECT":
      if (Array.isArray(msg.origins)) pbPreconnect(msg.origins);
      sendResponse({ ok: true });
      break;

    case "PBACC_PRELOAD":
      if (msg.origin) pbPreload(msg.origin);
      PB_LOG2.info("PBACC_PRELOAD", msg.origin);
      sendResponse({ ok: true });
      break;

    case "PBACC_GPUWARM":
      PulseRealmState.gpuEnabled = msg.gpuEnabled;
      sendResponse({ ok: true });
      break;

    case "PBACC_GPUWARM_EXTRA":
      PulseRealmState.gpuEnabled = msg.gpuEnabled;
      sendResponse({ ok: true });
      break;

    case "PBACC_DECODEWARM":
      PulseRealmState.imagesDecoded += msg.count || 1;
      sendResponse({ ok: true });
      break;

    case "PBACC_DECODEWARM_EXTRA":
      PulseRealmState.imagesDecoded += msg.count || 1;
      sendResponse({ ok: true });
      break;
      

    // -------------------------------------------------------
    // REALM + WARM-PATH PHYSICS
    // -------------------------------------------------------
    case "PBACC_REALMWARM":
      if (msg.origin) {
        pbRealmWarm(msg.origin);
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = msg.origin;
        PB_LOG2.info("PBACC_REALMWARM", msg.origin);
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH_EVENT":
      if (Array.isArray(msg.origins)) {
        pbWarmPaths(msg.origins);
        // 🔥 Realm + HUD integration
        PulseRealmState.warmPathsTriggered += msg.origins.length || 1;
        PB_LOG2.info("PBACC_WARMPATH_EVENT", msg.origins);
      }
      sendResponse({ ok: true });
      break;
    
    case "PBWARM_NOVA_EVENT":
      if (Array.isArray(msg.origins)) {
        pbWarmPaths(msg.origins);
        temporaryLinks = msg.origins;
        // 🔥 Realm + HUD integration
        PulseRealmState.warmPathsTriggered += msg.origins.length || 1;
        PB_LOG2.info("PBACC_WARMPATH_EVENT", msg.origins);
      }
      sendResponse({ ok: true });
      break;

    case "FIRSTPRE_WARMPATH_EVENT":
      // 🔥 Realm + HUD integration
      PulseRealmState.warmPathsTriggered += msg.origins.length || 1;
      sendResponse({ ok: true });
      break;

    case "FIRSTPOST_WARMPATH_EVENT":
      if (Array.isArray(msg.origins)) {
        pbWarmPaths(msg.origins);
        PB_LOG2.info("FIRSTPOST_WARMPATH_EVENT", msg.origins);
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH_EXTERNAL":
      PulseRealmState.warmPathsTriggered += msg.count || 1;
      sendResponse({ ok: true });
      break;

    case "PBCHECK_MEMORY":
      if (msg.OurLocalMemoryLayer) {
        WeLocalMemoryLayer = msg.OurLocalMemoryLayer;
        WeLocalMemoryLayerMB = Number(msg.OurLocalMemoryLayer.usedHeapMB.replace(" MB", "").trim());
        WeLocalMemoryLayerMBackup = WeLocalMemoryLayerMB;
      }
      if (msg.override) HelperHudBoolean = true;
      if (msg.MyLocalMemoryLayer) {
        if (LocalMemoryLayer !== msg.MyLocalMemoryLayer) PB_LOG2.change("PBCHECK_MEMORY: SYSTEM CHANGE", LocalMemoryLayer, msg.MyLocalMemoryLayer);
        PB_LOG2.info("PBCHECK_MEMORY:pulseTabs", pulseTabs);
        LocalMemoryLayer = msg.MyLocalMemoryLayer;
        LocalMemoryLayerMB = Number(msg.MyLocalMemoryLayer.usedHeapMB.replace(" MB", "").trim());
        LocalMemoryLayerMB = LocalMemoryLayerMB.toFixed(2);
        if (WeLocalMemoryLayerMB) {
          PB_LOG2.info("PBCHECK_MEMORY: TAB->SYSTEM ", WeLocalMemoryLayer);
          LocalMemoryLayerMB = Number(LocalMemoryLayerMB) + Number(WeLocalMemoryLayerMB);
          LocalMemoryLayerMB = LocalMemoryLayerMB.toFixed(2);
          sendResponse({ ok: true, LocalMemoryLayerMB, WeLocalMemoryLayerMB });
          WeLocalMemoryLayerMB = 0;
        } else {
          WeLocalMemoryLayerMB = WeLocalMemoryLayerMBackup;
          sendResponse({ ok: true, LocalMemoryLayerMB, WeLocalMemoryLayerMBackup });
          WeLocalMemoryLayerMBackup = 0;
        }
      }
      // (async () => {
      //   MyLocalMemoryLayer = await runProtectedCompute(getLocalMemoryLayer);
      //   PB_LOG2.info("PBCHECK_MEMORY: SYSTEM", MyLocalMemoryLayer);
      // })();
      break;

    case "PBACC_WARMPATH":
      if (msg.origin) {
        pbWarmPath(msg.origin);
        let origin = new URL(msg.origin).origin
        if (origin.includes("https://")) {
          origin = origin.replace("https://","");
        };
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = origin;
        PB_LOG2.info("PBACC_WARMPATH", origin);
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_ACCELERATE":
      if (msg.url) {
        pbAccelerate(msg.url);
        let origin = new URL(msg.url).origin
        if (origin.includes("https://")) {
          origin = origin.replace("https://","");
        };
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = origin;
        PB_LOG2.info("PBACC_ACCELERATE", origin);
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_HOME_WARMBOOT":
      pbHomeWarmBoot();
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // CACHE + OS PING + SETTINGS
    // -------------------------------------------------------
    case "GET_CACHE_LIST":
      (async () => {
        const ts = Date.now();  // ⭐ Diagnostic timestamp

        try {
          const cacheNames = await caches.keys();
          let cacheDetails = [];
          let PulseCacheDetails = [];
          let pulsemomentscount = 0;
          let pulseofflinecount = 0;
          // let ErrorCacheDetails = [];
          let count = 0;
          let pulsecount = 0;
          // let errorcount = 0;
          let totalcount = 0;
          let sizeMB = 0;
          let sizePulseMB = 0;
          // let errorSizeMB = 0;

          for (const name of cacheNames) {
            try {
              const cache = await caches.open(name);
              const requests = await cache.keys();
              const realRequests = requests.filter(req => 
                (!isPulseWorld(req.url) && !isFavicon(req.url))
              );
              const PulseRequests = requests.filter(req =>
                (isPulseWorld(req.url) && !isFavicon(req.url))
              );
              const PulseMoments = [
                ...new Set(
                  realRequests
                    .filter(req => (isAMoment(req.url) && !isFavicon(req.url)))
                    .map(req => [req.url, req])
                ).values()
              ];
              const PulseOffline = Array.from(
                new Map(
                  realRequests
                    .filter(req => (isOffline(req.url) && !isFavicon(req.url)))
                    .map(req => [req.url, req])
                ).values()
              );

              // const ErrorRequests = requests.filter(req =>
              //   !realRequests.includes(req) && !PulseRequests.includes(req)
              // );
              count = realRequests.length;
              pulsecount = PulseRequests.length;
              pulsemomentscount = PulseMoments.length;
              pulseofflinecount = PulseOffline.length;
              // errorcount = ErrorRequests.length;
              totalcount = requests.length;
              const currentCache = CACHE_NAME;
              const currentPulseCache = PULSE_FAUX_CACHE_NAME;
              const currentErrorCache = ERROR_FAUX_CACHE_NAME;

              // ⭐ Compute total cache size
              let totalBytes = 0;
              for (const req of realRequests) {
                try {
                  const res = await cache.match(req);
                  if (res) {
                    const buf = await res.arrayBuffer();
                    totalBytes += buf.byteLength;
                  }
                } catch (e) {
                  console.warn("Cache size read failed:", e);
                }
              }

              // ⭐ Compute total cache size
              let totalPulseBytes = 0;
              for (const req of PulseRequests) {
                try {
                  const res = await cache.match(req);
                  if (res) {
                    const buf = await res.arrayBuffer();
                    totalPulseBytes += buf.byteLength;
                  }
                } catch (e) {
                  console.warn("PulseRequests Cache size read failed:", e);
                }
              }

              // // ⭐ Compute total cache size
              // let totalErrorBytes = 0;
              // for (const req of ErrorRequests) {
              //   try {
              //     const res = await cache.match(req);
              //     if (res) {
              //       const buf = await res.arrayBuffer();
              //       totalErrorBytes += buf.byteLength;
              //     }
              //   } catch (e) {
              //     console.warn("ErrorRequests Cache size read failed:", e);
              //   }
              // }

              sizeMB = parseFloat((totalBytes / (1024 * 1024)).toFixed(2));
              sizePulseMB = parseFloat((totalPulseBytes / (1024 * 1024)).toFixed(2));
              // errorSizeMB = parseFloat((totalErrorBytes / (1024 * 1024)).toFixed(2));
              const density = count / (sizeMB || 1);
              const densitypulse = pulsecount / (sizePulseMB || 1);
              // ⭐ Diversity (unique hosts)
              const diversity = new Set(realRequests.map(r => {
                try { return new URL(r.url).hostname; }
                catch { return "unknown"; }
              })).size;

              const pulsediversity = new Set(PulseRequests.map(r => {
                try { return new URL(r.url); }
                catch { return "unknown"; }
              })).size;

              // ⭐ Weight class (unchanged)
              let weightClass = "Very Small";
              if (count > 100) weightClass = "Light";
              if (count > 500) weightClass = "Medium";
              if (count > 1000) weightClass = "Heavy";
              if (count > 2000) weightClass = "Massive";

              // ⭐ Weight class (unchanged)
              let weightPulseClass = "Very Small";
              if (pulsecount > 100) weightPulseClass = "Light";
              if (pulsecount > 500) weightPulseClass = "Medium";
              if (pulsecount > 1000) weightPulseClass = "Heavy";
              if (pulsecount > 2000) weightPulseClass = "Massive";

              // ⭐ Raw PulseScore
              const rawPulse =
                (density * 2) +
                (diversity * 3) +
                (count / 50) -
                (sizeMB / 10);

              // ⭐ Raw PulseScore
              const rawrealPulse =
                (densitypulse * 2) +
                (pulsediversity * 8) +
                (pulsecount / 40) -
                (sizePulseMB / 10);

              // ⭐ Final PulseScore (0–100)
              const pulseScore = Math.max(0, Math.min(100, Math.floor(rawPulse)));
              let pulseTier = "Quiet Load";
              if (pulseScore >= 20) pulseTier = "Light Sway";
              if (pulseScore >= 40) pulseTier = "Moderate Push";
              if (pulseScore >= 60) pulseTier = "High Speed";
              if (pulseScore >= 80) pulseTier = "Blazing Fast";

              // ⭐ Final PulseScore (0–100)
              const realpulseScore = Math.max(0, Math.min(100, Math.floor(rawrealPulse)));
              let realpulseTier = "Quiet Load";
              if (realpulseScore >= 20) realpulseTier = "Light Sway";
              if (realpulseScore >= 40) realpulseTier = "Moderate Push";
              if (realpulseScore >= 60) realpulseTier = "High Speed";
              if (realpulseScore >= 80) realpulseTier = "Blazing Fast";
              
              // ⭐ Personality (style)
              let personality = "Silent Ghost";
              if (density > 50) personality = "Astral Explorer";
              else if (density > 20) personality = "Active Voyager";
              else if (density > 10) personality = "Balanced Traveler";
              else if (density > 5) personality = "Calm Wanderer";

              // ⭐ Personality (style)
              let pulsepersonality = "Astral Viewer";
              if (densitypulse > 50) pulsepersonality = "Multiversal Traveler";
              else if (densitypulse > 20) pulsepersonality = "Realm Lord";
              else if (densitypulse > 10) pulsepersonality = "Time Traveler";
              else if (densitypulse > 5) pulsepersonality = "Astral Projection";

              const pulseRank = `${pulseTier}`;
              const realpulseRank = `${realpulseTier}`;

              PulseCacheDetails.push({
                name: PULSE_FAUX_CACHE_NAME,
                entries: pulsecount,
                sizeBytes: totalPulseBytes,
                sizePulseMB,
                weightPulseClass,
                pulsepersonality,
                densitypulse,
                realpulseScore,
                realpulseTier,
                realpulseRank,
                currentPulseCache,
                firstEntry: PulseRequests[0]?.url || null,
                lastEntry: PulseRequests[pulsecount - 1]?.url || null
              });

              cacheDetails.push({
                name,
                entries: count,
                sizeBytes: totalBytes,
                sizeMB,
                weightClass,
                personality,
                density,
                pulseScore,
                pulseTier,
                pulseRank,
                currentCache,
                firstEntry: realRequests[0]?.url || null,
                lastEntry: realRequests[count - 1]?.url || null
              });

              // ErrorCacheDetails.push({
              //   name: ERROR_FAUX_CACHE_NAME,
              //   entries: errorcount,
              //   sizeBytes: totalErrorBytes,
              //   errorSizeMB,
              //   currentErrorCache,
              //   firstEntry: ErrorRequests[0]?.url || null,
              //   lastEntry: ErrorRequests[errorcount - 1]?.url || null
              // });

            } catch (innerErr) {
              PulseCacheDetails.push({
                name: PULSE_FAUX_CACHE_NAME,
                entries: null,
                sizeBytes: 0,
                sizePulseMB: "0.00",
                weightPulseClass: "unknown",
                error: innerErr.toString()
              });

              cacheDetails.push({
                name,
                entries: null,
                sizeBytes: 0,
                sizeMB: "0.00",
                weightClass: "unknown",
                error: innerErr.toString()
              });

              // ErrorCacheDetails.push({
              //   name: ERROR_FAUX_CACHE_NAME,
              //   entries: null,
              //   sizeBytes: 0,
              //   errorSizeMB: "0.00",
              //   error: innerErr.toString()
              // });
            }
          }

          const payload = {
            ok: true,
            ts,
            totalCaches: cacheNames.length,
            caches: cacheDetails,
            pulsecaches: PulseCacheDetails,
            // errorcaches: ErrorCacheDetails,
            cachecount: count,
            pulsecount,
            pulsemomentscount,
            pulseofflinecount,
            // errorcount,
            totalcount,
            sizeCacheMB: sizeMB,
            sizePulseMB,
            // errorSizeMB
          };

          PB_LOG2.info("GET_CACHE_LIST", payload);
          sendResponse(payload);

        } catch (err) {
          const errorPayload = {
            ok: false,
            ts,
            error: err.toString()
          };

          PB_LOG2.error("GET_CACHE_LIST_ERROR", errorPayload);
          sendResponse(errorPayload);
        }
      })();

      return true;

    case "GRAB_CACHE_FILE":
      (async () => {
        try {
          const url = msg.url;

          const cache = await caches.open(CACHE_NAME);
          const requests = await cache.keys();
          const realRequests = requests.filter(req => req.url);

          const req = realRequests.find(r => r.url === url);

          if (!req) {
            sendResponse({ ok: false, error: "Artifact not found in cache" });
            return;
          }

          const res = await cache.match(req);
          if (!res) {
            sendResponse({ ok: false, error: "Artifact found but response missing" });
            return;
          }

          const blob = await res.blob();
          const buffer = await blob.arrayBuffer();
          const pwoffline = makeOfflineKey(url);
          if (url !== pwoffline) cacheMyBlob(cache, pwoffline, blob);

          // ⭐ Store the REAL file bytes
          __PULSE_CACHE_FILE = {
            type: blob.type,
            size: blob.size,
            data: new Uint8Array(buffer)
          };

          sendResponse({ ok: true });

        } catch (err) {
          sendResponse({ ok: false, error: err.toString() });
        }
      })();

      return true;

    case "SEND_CACHE_FILE":
      try {
        if (!__PULSE_CACHE_FILE) {
          sendResponse({ ok: false, error: "No cached file stored" });
          return;
        }

        const { type, size, data } = __PULSE_CACHE_FILE;

        // ⭐ Send raw bytes (transferable)
        sendResponse(
          {
            ok: true,
            type,
            size,
            data
          },
          [data.buffer] // ⭐ REQUIRED
        );

      } catch (err) {
        sendResponse({ ok: false, error: err.toString() });
      }

      return true;

    case "PULSE_OS_PING": {
      if (msg.time && isValid(msg.time)) {
        sendPulseHeartbeat();
        PulseRealmState.lastPing = new Date().toLocaleString();
        const incoming = Number(msg.time);   // numeric realm timestamp
        // If sessionStart doesn't exist yet, choose earliest realm
        if (!PulseRealmState.sessionStart) {
          let earliest = Math.min(nowSW, incoming);
          PulseRealmState.sessionStart = new Date(earliest).toLocaleString();
          nowSW = earliest;
          safeStorageSet({ SessionStart: nowSW });
          PB_LOG2.save("PULSE_OS_SESSION_START", PulseRealmState.sessionStart);
        } else {
          // Convert stored sessionStart back to number for comparison
          const current = new Date(PulseRealmState.sessionStart);
          const currentTime = current.getTime();
          if (incoming < currentTime) {
            PulseRealmState.sessionStart = new Date(incoming).toLocaleString();
            nowSW = incoming;
            safeStorageSet({ SessionStart: nowSW });
            if (current.toLocaleString() !== PulseRealmState.sessionStart) {
              PB_LOG2.change("PULSE_OS_SESSION_EVOLVE", current.toLocaleString(), PulseRealmState.sessionStart);
            }
          }
        }
      }
      sendResponse({ ok: true, ts: PulseRealmState.lastPing, time: PulseRealmState.sessionStart, HelperHudBoolean, TakeOfflineSnapshot, pulseTabs });      
      TakeOfflineSnapshot = false;
      HelperHudBoolean = false;
      break;
    }


    case "PULSE_OS_CLEAR_PULSE_CACHES":
      clearPulseCaches().then(() => sendResponse({ ok: true }));
      return true;

    // -------------------------------------------------------
    // PERFORMANCE + MUTATION EVENTS
    // -------------------------------------------------------
    case "PBCONTENT_PERF":
      PulseRealmState.perfEntries = msg.entries || [];
      PulseRealmState.perfLastNavigation = msg.ts || now;
      PulseRealmState.lastWarmOrigin = msg.origin;
      sendResponse({ ok: true });
      break;
    
    case "PBCONTENT_MUTATION":
      PulseRealmState.mutationCount += msg.count || 0;
      PulseRealmState.lastMutationTS = msg.ts || now;
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // GPU + DECODE WARM
    // -------------------------------------------------------
    case "PBCONTENT_GPUWARM":
    case "PBCONTENT_GPUWARM_EXTRA":
      PulseRealmState.gpuEnabled = msg.gpuEnabled;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_DECODEWARM":
    case "PBCONTENT_DECODEWARM_EXTRA":
      PulseRealmState.imagesDecoded += msg.count || 1;
      sendResponse({ ok: true });
      break;
      
    case "PULSE_OS_CLEAR_LOCAL_STORAGE":
      chrome.storage.local.clear(() => {
        console.log("PulseWorld local storage cleared.");
      });
      chrome.storage.sync.get(PB_SW_SETTINGS, (data) => {
        resolve(data || PB_SW_SETTINGS);
      });
      break;

    case "OPEN_PULSEWORLD_PANEL":
      (async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.sidePanel.open({
          windowId: tab.windowId
        });
      })();
      return true;

    // -------------------------------------------------------
    // ASSET WARM-PATH
    // -------------------------------------------------------
    case "PBACC_ASSETWARM_EVENT":
    case "PBACC_ASSETWARM":
      PulseRealmState.warmAssetsTriggered += msg.count || 1;
      PulseRealmState.imagesDecoded += msg.count || 1;
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // ACCELERATE → WARM-PATH EVENT (fallback)
    // -------------------------------------------------------
    case "STORAGE_PASSOFF":
      if (msg.totalUsed) {
        totalUsed = msg.totalUsed;
        sendResponse({ ok: true, totalUsed, aiSettingsSize, aiPopupSize });
      }
      break;
    // -------------------------------------------------------
    // ACCELERATE → WARM-PATH EVENT (fallback)
    // -------------------------------------------------------
    case "PBACC_ACCELERATE_EVENT":
      if (msg.url) {
        const origin = new URL(msg.url).origin;
        pbWarmPath(origin);
        if (origin.includes("https://")) {
          origin = origin.replace("https://","");
        };
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = origin;
        PB_LOG2.info("PBACC_ACCELERATE_EVENT", origin);
      }
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // OPEN PULSEWORLD
    // -------------------------------------------------------
    case "PBNAV_OPEN_PULSEWORLD":
      chrome.tabs.create({ url: msg.url || "https://www.pulseworld.net" });
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // REALM STATE UPDATES
    // -------------------------------------------------------
    case "PBREALM_UPDATE":
      PulseRealmState.lastPing = new Date().toLocaleString();
      PulseRealmState.lastPage = msg.page || PulseRealmState.lastPage;
      PulseRealmState.lastURL = msg.url || PulseRealmState.lastURL;
      PulseRealmState.lastTitle = msg.title || PulseRealmState.lastTitle;
      sendResponse({ ok: true });
      break;

    case "PBREALM_GET":
      sendResponse({ ok: true, state: PulseRealmState });
      break;

    case "PBAI_SESSION":
      if (msg.PulsePalMemoryAIBuffer) {
        PulsePalMemoryAIBuffer = msg.PulsePalMemoryAIBuffer;
        // (async () => {
        //   aiSession = await chrome.storage.local.get(["aiSession"]);
        //   if (!aiSession) {
                // await initializeExoskeleton();
        //      safeStorageSet({ aiSession });
        //   }
        //   sendResponse({ ok: true, aiSession });
        // })();
      } else {
        (async () => {
          const SessionAI = await chrome.storage.local.get(["PulsePalMemoryAIBuffer"]);
          PulsePalMemoryAIBuffer = SessionAI.PulsePalMemoryAIBuffer ?? [];
          console.log(SessionAI.PulsePalMemoryAIBuffer);
        })();
      }
      safeStorageSet({ PulsePalMemoryAIBuffer });
      if (msg.OvermindOrders) OvermindOrders = msg.OvermindOrders;
      sendResponse({ ok: true, PulsePalMemoryAIBuffer });
      return true;

    case "PBCONSOLE_GET":
      pbLoadConsole().then(console => sendResponse({ ok: true, console }));
      return true;

    // ---------------------------------------------------------
    // SETTINGS SNAPSHOT (from PBSettings kernel)
    // ---------------------------------------------------------
    case "PBSETTINGS_SNAPSHOT":
      PulseRealmState.settings = msg.settings || {};
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // FLAGS UPDATE (DevOverlay / kernel)
    // ---------------------------------------------------------
    case "PBREALM_FLAGS_UPDATE":
      PulseRealmState.flags = Object.assign({}, PulseRealmState.flags, msg.flags || {});
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // DEV STATUS
    // -------------------------------------------------------
    case "PBDEV_STATUS":
      pbLogKernelStatus();
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // HOVER PREFETCH
    // -------------------------------------------------------
    case "PB_HOVER_PREFETCH":
      if (msg.href && typeof PBQuantumPrefetch?.tryPrefetch === "function") {
        pbPreconnect([msg.href]);
        PBQuantumPrefetch.tryPrefetch(msg.href);
        let origin = new URL(msg.href).origin
        if (origin.includes("https://")) {
          origin = origin.replace("https://","");
        };
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = origin;
        PB_LOG2.info("PB_HOVER_PREFETCH", origin);
      }
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // ASSET LIST (content)
    // -------------------------------------------------------
    case "PB_ASSET_LIST_CONTENT":
      try {
        let origin = new URL(msg.pageUrl).origin
        if (origin.includes("https://")) {
          origin = origin.replace("https://","");
        };

        PBGlobalAssetMap?.scanAndWarm?.(origin, msg.assets || []);
        (msg.assets || []).forEach(a => PBTemporalCache?.noteAsset?.(origin, a));
        PulseRealmState.warmAssetsTriggered += msg.assets.length || 1;
        PulseRealmState.imagesDecoded += msg.decodeCount || 1;        
        PulseRealmState.lastWarmOrigin = origin;
        PB_LOG2.info("PB_ASSET_LIST_CONTENT", origin);
      } catch (_) {}
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // CONTENT WARM-PATH
    // -------------------------------------------------------
    case "PBCONTENT_WARMPATH":
      try {
        let origin = new URL(msg.origin).origin
        if (origin.includes("https://")) {
          origin = origin.replace("https://","");
        };
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = origin;
        PBUniversalBoost2?.warmOrigin?.(origin);
      } catch (_) {}
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // FULL REALM UPDATE
    // -------------------------------------------------------
    case "PBREALM_UPDATE_FULL":
      PulseRealmState.lastPing = new Date().toLocaleString();
      PulseRealmState.lastPage = msg.page || PulseRealmState.lastPage;
      PulseRealmState.lastURL = msg.url || PulseRealmState.lastURL;
      PulseRealmState.lastTitle = msg.title || PulseRealmState.lastTitle;
      sendResponse({ ok: true });
      break;

    default:
      console.log("[PULSEBROWSER OS KERNEL] Unknown Event:", msg);
  }
});


function pbLoadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(PB_SW_SETTINGS, (data) => {
      resolve(data || PB_SW_SETTINGS);
    });
  });
}

function pbLoadConsole() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(console, (data) => {
      resolve(data);
    });
  });
}

function pbSaveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, () => resolve(true));
  });
}

function pbSaveConsole(console) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(console, () => resolve(true));
  });
}


// ============================================================================
//  SECTION 4 — ROUTER + INTERCEPTOR (Request Physics)
// ============================================================================
function pbRoute(url, S) {
  // Block trackers
  if (S.blockTrackers || S.blockAnalytics || S.blockAds) {
    const trackers = [
      /doubleclick\.net/, /googletagmanager\.com/, /google-analytics\.com/,
      /facebook\.com\/tr/, /adservice\.google\.com/, /scorecardresearch\.com/,
      /quantserve\.com/, /adsystem\.com/, /taboola\.com/, /outbrain\.com/
    ];
    for (const t of trackers) if (t.test(url)) return { action: "block", label: "tracker" };
  }

  // Home universe priority
  for (const domain of S.homeUniverse) {
    if (url.includes(domain)) return { action: "allow", label: "PulseWorld", accelerate: true };
  }

  // CDN priority
  const cdn = [/cloudflare\.com/, /cloudfront\.net/, /fastly\.net/, /akamaihd\.net/];
  for (const c of cdn) if (c.test(url)) return { action: "allow", label: "cdn", accelerate: true };

  // Asset priority
  const assets = [/\.js$/, /\.css$/, /\.json$/, /\.wasm$/, /\.svg$/, /\.woff2?$/];
  for (const a of assets) if (a.test(url)) return { action: "allow", label: "asset", accelerate: true };

  return { action: "allow", label: "default" };
}

async function pbHandleRequest(details) {
  const S = await pbLoadSettings();
  if (!S.enableInterceptor) return {};

  const url = details.url;
  const decision = pbRoute(url, S);

  if (decision.action === "block") {
    console.log("[PBRouter] Blocking:", decision.label, url);
    return { cancel: true };
  }

  if (decision.accelerate && S.enableAccelerator) {
    pbAccelerate(url);
    let origin = new URL(url).origin
    if (origin.includes("https://")) {
      origin = origin.replace("https://","");
    };
    PulseRealmState.warmPathsTriggered += 1;
    PulseRealmState.lastWarmOrigin = origin;
  }

  return {};
}

// ============================================================================
//  SECTION 5 — NAVIGATOR (Tab Physics)
// ============================================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;
  let url = tab.url;
  if (url.includes("http")) {
    chrome.sidePanel.setOptions({
      tabId,
      path: "PBPopup.html",
      enabled: true
    });
  }
  let title = tab.title;
  let page = tab.page;
  const origin = new URL(url).origin;
  
  if (url.includes("newtab")) {
    url = "impulse://newtab"
    PulseRealmState.lastURL = url;
    PulseRealmState.lastPage = "NewTab";
    PulseRealmState.lastDomainClass = "PulseWorld";
    PulseRealmState.lastTitle = "PulseBrowser OS Console";
    if (comeback) {
      pbPreconnect([comebackURL]);
      fetch(comebackURL, { mode: "no-cors" }).catch(() => {});
    }
  } else {
    if (url.includes("PulseWorldAuthority")) {
      PulseRealmState.lastDomainClass = "Not Exactly Sure...";
    } else {
      const domainClass = pbDomainClass(url);
      PulseRealmState.lastDomainClass = domainClass;
    }
    PulseRealmState.lastURL = url;
    PulseRealmState.lastPage = page;
    PulseRealmState.lastTitle = title;
    PulseRealmState.navHistory.push(url);
    PB_LOG2.event("PBNAV_EVENT", url);
  }

  // Temporal navigation warm
  if (typeof PBTemporalCache?.noteNavigation === "function") {
    PBTemporalCache.noteNavigation(url);
  }
  if (typeof PBTemporalCache?.warmRecentAssets === "function") {
    PBTemporalCache.warmRecentAssets(origin);
  }

  // Universal boost warm-path
  if (typeof PBUniversalBoost2?.warmTab === "function") {
    PBUniversalBoost2.warmTab(tab);
  }

  if (!url.includes("newtab")) {
    if (url) pbAccelerate(url);
    PulseRealmState.warmPathsTriggered += 1;
    PulseRealmState.lastWarmOrigin = origin;
  }
});


// ============================================================================
//  SECTION 7 — CACHE CONTROL
// ============================================================================
async function clearPulseCaches() {
  const ts = Date.now();  // ⭐ Timestamp for diagnostics
  const keys = await caches.keys();

  let deleted = [];
  let skipped = [];

  for (const key of keys) {
    // ⭐ PulseBrowser OS cache naming convention
    const isPulseCache =
      key.includes("Pulse") ||
      key.includes("PB") ||
      key.includes("companion") ||
      key.startsWith("pulse_") ||
      key.startsWith("pulse-") ||
      key.startsWith("pulseworld") ||
      key.startsWith("pb-") ||
      key.startsWith("pb_");

    if (isPulseCache) {
      try {
        await caches.delete(key);

        deleted.push(key);

        console.log(
          "%c[PULSEBROWSER OS KERNEL] Deleted Cache: " + key,
          "color:#FF5555; font-weight:bold;"
        );
      } catch (err) {
        console.log(
          "%c[PULSEBROWSER OS KERNEL] Failed to Delete Cache: " + key +
          " → " + err.toString(),
          "color:#FF0000; font-weight:bold;"
        );
      }
    } else {
      skipped.push(key);
    }
  }

  // ⭐ Summary log (PulseBrowser OS style)
  console.log("%c[PULSEBROWSER OS KERNEL] Cache Purge Summary",
    "color:#00FFFF; font-weight:bold;");

  console.log({
    ts,
    totalCaches: keys.length,
    deletedCount: deleted.length,
    skippedCount: skipped.length,
    deleted,
    skipped
  });

  return {
    ok: true,
    ts,
    deleted,
    skipped
  };
}


// ============================================================================
//  SECTION 8 — DEVTOOLS
// ============================================================================
function pbLogKernelStatus() {
  console.log("%c[PBDevTools] Kernel Status @ " + new Date().toLocaleString(),
    "color:#FF4444; font-weight:bold;");
  console.log("[PBDevTools] Realm:", PulseRealmState);
  pbLoadSettings().then((settings) => console.log("[PBDevTools] Settings:", settings));
}

  // ============================================================================
//  PBUniversalBoost2.js — Global SW-like acceleration (publish directory warm)
// ============================================================================

const PBUniversalBoost2 = {
  async warmOrigin(origin) {
    if (!origin) return;

    // ⭐ Normalize origin: remove trailing slash if present
    const base = origin.endsWith("/") ? origin.slice(0, -1) : origin;

    // ⭐ Load permanent per-URL fail-cache
    const store = await chrome.storage.local.get(["pb_fail_cache"]);
    const fails = store.pb_fail_cache || {};

    // ⭐ HARD BLOCK: skip all non-web origins
    const forbidden = [
      "chrome://",
      "chrome-extension://",
      "edge://",
      "brave://",
      "opera://",
      "file://",
      "data://",
      "blob://",
      "about://"
    ];

    for (const prefix of forbidden) {
      if (base.startsWith(prefix)) return;
    }

    // ⭐ Only warm http/https origins
    if (!base.startsWith("http://") && !base.startsWith("https://")) {
      return;
    }

    // ⭐ Skip warming any URL with a query string
    if (base.includes("?")) {
      return;
    }

    // ⭐ Skip warming if the FULL URL already ends with a file extension
    if (/\.(html|css|js|png|jpg|jpeg|webp|svg|json)$/i.test(base)) {
      console.log("[PBUniversalBoost2] Skipped (direct file):", base);
      return;
    }

    const paths = [
      "/", "/index.html", "/home", "/about", "/contact", "/manifest.json"
    ];
    const assets = [
      "/main.js", "/bundle.js", "/app.js", "/styles.css", "/app.css"
    ];

    let warmedCount = 0;

    // ⭐ Build slash-clean URLs
    const urls = []
      .concat(paths.map((p) => base + p))
      .concat(assets.map((p) => base + p));

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (const url of urls) {
      // ⭐ If THIS SPECIFIC URL failed twice → skip forever
      if (fails[url] >= 2) continue;

      try {
        const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

        if (res && res.status === 404) {
          fails[url] = (fails[url] || 0) + 1;
          lastFailURL = url;
          if (fails[url] >= 2) {
            await safeStorageSet({ pb_fail_cache: fails });
          }
        } else {
          warmedCount++;
        }
      } catch (_) {}

      // ⭐ Add delay between warm-fetches
      await sleep(200);
    }

    // ⭐ Save updated fail-cache
    await safeStorageSet({ pb_fail_cache: fails });

    console.log("[PBUniversalBoost2] Warmed publish directory for", base);
  },

  async warmTab(tab) {
    if (!tab || !tab.url) return;
    try {
      const rawOrigin = new URL(tab.url).origin;
      const origin = rawOrigin.endsWith("/") ? rawOrigin.slice(0, -1) : rawOrigin;
      await PBUniversalBoost2.warmOrigin(origin);
    } catch (_) {}
  }
};



// Example kernel hook (inside PBCompanion.js tab update):
// if (domainClass === "home" || domainClass === "global") PBUniversalBoost2.warmTab(tab);

// ============================================================================
//  PBQuantumPrefetch.js — AI-ish navigation prediction (lightweight heuristic)
// ============================================================================

const PBQuantumPrefetch = {
  lastHoverLink: null,
  hoverTimeout: null,
  prefetchDelayMs: 400,

  cooldownMs: 2000,          // 3 seconds per link
  linkCooldowns: new Map(),  // href → timestamp

  attachToDocument() {
    document.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;

      this.lastHoverLink = a.href;
      const link = [a.href];

      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);

      this.hoverTimeout = setTimeout(() => {
        this.tryPrefetch(link);
      }, this.prefetchDelayMs);
    });
  },

  tryPrefetch(link) {
    const href = link[0];
    const now = Date.now();

    const lastTime = this.linkCooldowns.get(href) || 0;

    // If SAME link is still cooling down → skip
    if (now - lastTime < this.cooldownMs) {
      return;
    }

    // Update cooldown timestamp for THIS link only
    this.linkCooldowns.set(href, now);

    // Perform the prefetch
    letsgo(link);
  }
};


function letsgo(link) {
  pbPreconnect([link]);
  try {
    fetch(link, { cache: "force-cache" }).catch(() => {});
    console.log("[PBQuantumPrefetch] Prefetched hovered link:", link);
  } catch (_) {}
}

// Example content script usage (PBContent.js):
// PBQuantumPrefetch.attachToDocument(document);


// ============================================================================
//  PBTemporalCache.js — Time-aware warm caching (session memory)
// ============================================================================

const PBTemporalCache = {
  history: [],
  assets: new Map(), // key: origin, value: Set of asset URLs
  maxHistory: 200,
  maxAssetsPerOrigin: 20, // ⭐ limit recent assets

  noteNavigation(url) {
    if (!url) return;
    this.history.push({ url, ts: Date.now() });
    if (this.history.length > this.maxHistory) this.history.shift();
  },

  noteAsset(origin, assetUrl) {
    if (!origin || !assetUrl) return;

    if (!this.assets.has(origin)) {
      this.assets.set(origin, new Set());
    }

    const set = this.assets.get(origin);

    // ⭐ If we already have too many assets, remove the oldest
    if (set.size >= this.maxAssetsPerOrigin) {
      const first = set.values().next().value; // oldest entry
      set.delete(first);
    }

    set.add(assetUrl);
  },

  async warmRecentAssets(origin) {
    if (!origin || !this.assets.has(origin)) return;

    const set = this.assets.get(origin);

    for (const url of set) {
      try {
        fetch(url, { cache: "force-cache" }).catch(() => {});
        PulseRealmState.warmAssetsTriggered += 1;
      } catch (_) {}
    }

    console.log("[PBTemporalCache] Warmed recent assets for", origin, set.size);
  }
};


// Example kernel usage:
// PBTemporalCache.noteNavigation(tab.url);
// PBTemporalCache.noteAsset(origin, origin + "/main.js");
// PBTemporalCache.warmRecentAssets(origin);

// ============================================================================
//  PBGlobalAssetMap.js — Predictive asset warming (framework/CDN awareness)
// ============================================================================

const PBGlobalAssetMap = {
  commonAssetPatterns: [
    /\/main(\.[a-z0-9]+)?\.js$/,
    /\/bundle(\.[a-z0-9]+)?\.js$/,
    /\/app(\.[a-z0-9]+)?\.js$/,
    /\/styles(\.[a-z0-9]+)?\.css$/,
    /\/app(\.[a-z0-9]+)?\.css$/,
    /\/manifest\.json$/,
    /\/engine(\.[a-z0-9]+)?\.wasm$/
  ],

  commonCDNs: [
    /cdnjs\.cloudflare\.com/,
    /cdn\.jsdelivr\.net/,
    /unpkg\.com/,
    /fonts\.googleapis\.com/,
    /fonts\.gstatic\.com/
  ],

  maxAssetsPerOrigin: 20, // ⭐ limit warmed assets per origin

  async scanAndWarm(origin, resourceList = []) {
    if (!origin) return;

    // ⭐ Load permanent per-URL fail-cache
    const store = await chrome.storage.local.get(["pb_fail_cache"]);
    const fails = store.pb_fail_cache || {};

    const urlsToWarm = [];

    for (const res of resourceList) {
      if (!res || typeof res !== "string") continue;

      // ⭐ Skip permanently failed URLs
      if (fails[res] >= 2) {
        console.log("[PBGlobalAssetMap] PERMANENT SKIP (2× 404):", res);
        continue;
      }

      // ⭐ Only warm assets matching known patterns
      if (this.commonAssetPatterns.some((re) => re.test(res))) {
        urlsToWarm.push(res);
      }
    }

    // ⭐ Limit warmed assets per origin
    if (urlsToWarm.length > this.maxAssetsPerOrigin) {
      urlsToWarm.splice(0, urlsToWarm.length - this.maxAssetsPerOrigin);
    }

    let warmedCount = 0;

    // ⭐ Warm each asset
    for (const url of urlsToWarm) {
      try {
        const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

        if (res && res.status === 404) {
          fails[url] = (fails[url] || 0) + 1;
          lastFailURL = url;
          console.log("[PBGlobalAssetMap] 404 for", url);

          if (fails[url] >= 2) {
            await safeStorageSet({ pb_fail_cache: fails });
          }
        } else {
          warmedCount++;
        }
      } catch (_) {}
    }

    // ⭐ Save updated fail-cache
    await safeStorageSet({ pb_fail_cache: fails });

    console.log("[PBGlobalAssetMap] Warmed predicted assets for", origin, warmedCount);
  }
};


// Example usage:
// From content script, collect <script src>, <link href>, <img src> and send to kernel.
// Kernel: PBGlobalAssetMap.scanAndWarm(origin, resourceList);

// ============================================================================
//  END OF KERNEL
// ============================================================================
console.log("%c[PULSEBROWSER OS KERNEL] Ultra Edition Ready (12 subsystems online)",
  "color:#00FF9C; font-weight:bold;");
