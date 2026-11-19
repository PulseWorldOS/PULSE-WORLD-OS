// THIS IS DRIFT COMPANION SERVICE WORKER THAT WORKS WITH SHARED STORAGE
// AND SHARED ATOMIC STATE (MIRROR SW KERNEL)
// import './MellowEarner.js';


// const PulseMellowEarner = new Mellowtel("c4a83408-e051-7076-dc7f-dd52fb081bd6", {
//   integrationId: "intgr-CxPYRSJjKe",
//   disableLogs: false
// });

// (async () => {
//   try {
//     await PulseMellowEarner.initBackground();
//     await PulseMellowEarner.optIn();
//     await PulseMellowEarner.start();
//   } catch {}
// })();

let assumedValue = 0;
let runWasmTest = false;
// ============================================================
// ⭐ REALM + BUILD TIME
// ============================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// --- CONFIG ----------------------------------------------------

const META_DB = "PulseWorld-Drift";
const META_STORE = "PW-Companion";
const META_KEY = "PulseWorld";

const CACHE_NAME_PREFIX = "pulseworld-";


// ============================================================
// ⭐ SHARED STORAGE LAYER (USING SHARED CACHE)
// ============================================================

const SHARED_CACHE_NAME = "PulseWorld-Companion";

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

// --- SIMPLE HASH (STRING-LEVEL, GOOD ENOUGH) -------------------
async function hashText(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// --- META STORAGE (INDEXEDDB) ---------------------------------
function openMetaDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(META_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getStoredIndexHash() {
  const db = await openMetaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(META_STORE, "readonly");
    const store = tx.objectStore(META_STORE);
    const req = store.get(META_KEY);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function setStoredIndexHash(hash) {
  const db = await openMetaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(META_STORE, "readwrite");
    const store = tx.objectStore(META_STORE);
    const req = store.put(hash, META_KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
// ============================================================
// ⭐ SHARED ATOMIC STATE (SharedArrayBuffer + Atomics)
// ============================================================

console.log(
  "%c⟡ PULSEWORLD OS KERNEL v33.0 — Shared Atomic State Online",
  "color:#7df; font-weight:bold; font-size:14px;"
);

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
  "%c⟡ Pulse World Shared Atomic Index Map Loaded",
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
    "%c⟡ PULSE WORLD KERNEL — Activity Report",
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
// ⭐ MULTITHREADED MICRO-SCHEDULER (SAFE, PASSIVE, NON-INTRUSIVE)
// ============================================================

const PW_AUTO_THREAD = true;

const PW_TASKS = [];
let PW_RUNNING = false;

function pwThread(fn) {
  PW_TASKS.push(fn);
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

// ============================================================
// ⭐ INSTALL — Cache core boot files ONLY
// ============================================================
self.addEventListener('install', event => {
  event.waitUntil((async () => {

    // 1. Fetch index
    const res = await fetch('/index.html', { cache: 'no-store' });

    // ⭐ Clone BEFORE consuming
    const resForHash = res.clone();
    const text = await resForHash.text();
    const currentHash = await hashText(text);

    // 2. Read last stored hash
    const lastHash = await getStoredIndexHash();

    // 3. Build new cache name
    const NEW_CACHE = SHARED_CACHE_NAME + '-' + currentHash;

    // 4. If hash changed → new universe
    if (lastHash !== currentHash) {

      await setStoredIndexHash(currentHash);
      
      // ⭐ NEW — continuity reload
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });

      // ⭐ EVERYTHING BELOW STAYS EXACTLY AS YOU WROTE IT
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(k => k.startsWith(SHARED_CACHE_NAME) && k !== NEW_CACHE)
          .map(k => caches.delete(k))
      );

      const cache = await caches.open(NEW_CACHE);

      // ⭐ Now safe to clone again
      await cache.put('/index.html', res.clone());

      await cache.addAll([
        '/',
        '/404',
        '/PULSE-MULTIVERSAL-TOUCH.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-GATE.js',
        '/_PROOF/PULSE-PROOF.js',
        '/MellowEarner.js',
        '/_CREATION_BARRIER/PULSE-BOOT-BARRIER.js',
        '/_CREATION_BARRIER/PULSE-BOOT-WORLD.js',
        '/_CREATION_BARRIER/PULSE-BOOT-PORTAL.js',
        '/PULSEConfig/PulseWorldReality.txt',
        '/PULSEConfig/PulseWorldHistory.txt',
        '/PULSEConfig/PulseWorldFounders.txt',
        '/PULSEConfig/PulseWorldTeam.txt',
        '/PULSEConfig/PULSE-ENGINE-BLOCK.txt',
        '/PULSEConfig/PulseWorldInventory.txt',
        '/PULSEConfig/PulseWorldRewards.txt',
        '/PULSEConfig/PulseWorldVault.txt',
        '/PULSEConfig/PulseWorldMeshLink.txt',
        '/PULSEConfig/PulseWorldAssets.txt',
        '/PULSEConfig/PulseWorldExtensions.txt',
        '/PULSEConfig/PulseWorldChallenge.txt',
        '/PULSEConfig/PulsePalSettings.txt',
        '/PULSEConfig/PulseWorldScanner.txt',
        '/PULSEConfig/PulseWorldEmail.txt',
        "/_EXPRESSIONS/_PEX/BUILD/PulseEngine.webp.pex",
        '/_EXPRESSIONS/_PEX/BUILD/PulseBand-Bubble.webp.pex',
        '/_EXPRESSIONS/_PEX/BUILD/PulseBand-Active.webp.pex',
        '/_EXPRESSIONS/_PEX/BUILD/PulseWorldOSBootLoader.webp.pex',
        "/_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo.webp.pex",
        '/_EXPRESSIONS/_PEX/BUILD/FrustratedLogo.webp.pex',
        '/_EXPRESSIONS/_PEX/BUILD/FrustratedAlias.webp.pex',        
        '/_EXPRESSIONS/_PEX/BUILD/FrustratedBizLogo.webp.pex',
        '/_EXPRESSIONS/_PEX/BUILD/FrustratedBizAlias.webp.pex',
        '/_EXPRESSIONS/_PEX/BUILD/AIOvermindPal.webp.pex',
        '/_EXPRESSIONS/_PEX/BUILD/AIOvermindPal3.webp.pex',
        "/_EXPRESSIONS/_PEX/BUILD/PulsePalEntrepreneur.webp.pex",
        '/_EXPRESSIONS/_SOUNDS/PulseWorldBootUp',
        '/_EXPRESSIONS/_CSS/PulseIndex.css',
        '/_EXPRESSIONS/_CSS/PulseInventory.css',
        '/_EXPRESSIONS/_CSS/PulseBank.css',
        '/_EXPRESSIONS/_CSS/PulseEngine.css',
        '/_EXPRESSIONS/_CSS/PulseSettings.css'
      ]);
    }

    self.skipWaiting();

  })());
});


// ============================================================
// ⭐ ACTIVATE — Take control immediately
// ============================================================

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  sendPulseHeartbeat();
});

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

// ============================================================
// ⭐ FETCH — PulseWorld routing + deterministic cache version
// ============================================================

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'GET' || url.pathname.startsWith('/.netlify/functions/')) return;
   // 🚀 FIX: Skip WebAssembly files completely so they never get turned into HTML fallbacks
  if (req.url.endsWith('.wasm') || req.url.includes('.wasm') || req.url.includes("speed.cloudflare.com") || req.url.includes('cdn.mellow.tel') || req.url.includes('olostep.com')) {
     return; // Bypasses service worker caching entirely
  }
  // 🚀 FIX: Only intercept HTTPS (or localhost) requests; let HTTP bypass the SW
  if (req.url.protocol === 'http:') {
    return; 
  }
  // Fetch current application code on return visits, retaining an offline fallback.
  if (url.origin === self.location.origin &&
      (req.mode === 'navigate' || /\.(?:html|js|txt|css)$/.test(url.pathname))) {
    event.respondWith((async () => {
      try {
        const response = await fetch(req, { cache: 'no-store' });
        if (response.ok) await putSharedResponse(req, response.clone());
        return response;
      } catch {
        return await getSharedResponse(req) || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }

  if (url.pathname.includes('-TEST') ||
      url.pathname.includes('/PulseAdmin') ||
      url.pathname.includes('/PULSE-SERVER') ||
      url.pathname.includes('PulseStreamingHeartbeat')) {
    return;
  }

  const isPulseRoute =
    url.pathname.startsWith('/') &&
    !url.pathname.startsWith('/PulseServer') &&
    !url.pathname.startsWith('/PulseAPI') &&
    !url.pathname.startsWith('/PulseAdmin');

  if (!isPulseRoute) {
    return;
  }

  // // Skip chrome-extension:// URLs (cannot be cached)
  if (req.url.includes('chrome://extensions')) {
     return; // Let the browser handle extension assets normally
  }  

  event.respondWith(handlePulseRequest(req));
});

// ============================================================
// ⭐ PULSE REQUEST HANDLER — shared-storage-first + shared state + multi-domain failover
// ============================================================

const PULSE_SW_MIRROR_DOMAINS = [
  "https://www.pulseworld.net",
  "https://www.pulseworld.me",
  "https://www.pulseworld.biz",
  "https://www.pulseworld.money",
  "https://www.serviceworker.net",
  "https://www.binaryos.net",
  "https://www.gpuprocessing.net",
  "https://www.booleanlogic.net",
  "https://www.orbitalmap.net",
  // Also cover non-www variants as fallback
  "https://pulseworld.net",
  "https://pulseworld.me",
  "https://pulseworld.biz",
  "https://pulseworld.money",
  "https://binaryos.net",
  "https://gpuprocessing.net",
  "https://booleanlogic.net",
  "https://orbitalmap.net",
  "https://serviceworker.net"
];

let pulseActiveSwMirrorIndex = 0;

async function fetchWithSwFailover(req) {
  const urlObj = new URL(req.url);
  const path = urlObj.pathname + urlObj.search;

  // ⚡ CORS FIX: Determine if the request origin is same-origin
  //    When fetching cross-origin mirrors we MUST NOT forward arbitrary
  //    headers (like `accept`, `authorization`, etc.) because that would
  //    trigger a CORS preflight on the mirror domain.  Instead, build
  //    a minimal, preflight-safe header set for cross-origin hops.
  const selfOrigin = (typeof self.location !== "undefined") ? self.location.origin : "";

  const hostOrder = [];
  for (let i = 0; i < PULSE_SW_MIRROR_DOMAINS.length; i++) {
    const idx = (pulseActiveSwMirrorIndex + i) % PULSE_SW_MIRROR_DOMAINS.length;
    hostOrder.push({ domain: PULSE_SW_MIRROR_DOMAINS[idx], index: idx });
  }

  if (!PULSE_SW_MIRROR_DOMAINS.some(d => req.url.startsWith(d))) {
    hostOrder.unshift({ domain: urlObj.origin, index: -1 });
  }

  let lastError = null;
  for (const item of hostOrder) {
    const targetUrl = item.domain ? `${item.domain}${path}` : req.url;
    const isCrossOrigin = !targetUrl.startsWith(selfOrigin);

    try {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 3100) : null;

      // ⚡ CORS FIX: For cross-origin mirrors only pass CORS-safe ("simple")
      //    headers so the browser skips the preflight OPTIONS round-trip.
      //    Simple headers: Accept, Accept-Language, Content-Language.
      //    Content-Type is simple only for specific MIME types.
      //    Everything else (Authorization, custom headers, etc.) triggers
      //    a preflight that could be blocked by the mirror's CORS policy.
      let fetchHeaders;
      if (isCrossOrigin) {
        fetchHeaders = { "Accept": "*/*" };
      } else {
        fetchHeaders = req.headers;
      }

      const fetchOpts = { method: req.method, headers: fetchHeaders, mode: isCrossOrigin ? "cors" : "same-origin" };
      if (controller) fetchOpts.signal = controller.signal;

      const net = await fetch(targetUrl, fetchOpts);
      if (timer) clearTimeout(timer);

      if (net.status >= 500 && net.status <= 504) {
        console.warn(`[PULSE SW FAILOVER] Mirror ${item.domain} returned HTTP ${net.status}. Trying next mirror...`);
        continue;
      }

      if (item.index >= 0) {
        pulseActiveSwMirrorIndex = item.index;
      }
      return net;
    } catch (err) {
      console.warn(`[PULSE SW FAILOVER] Host ${item.domain} unreachable (${err.message}). Trying next mirror...`);
      lastError = err;
    }
  }

  throw lastError || new Error("All Pulse SW failover mirrors unreachable");
}

async function handlePulseRequest(req) {

  pulseInc(PULSE_SHARED_INDEX.REQUEST_COUNT);

  if (!req.url.startsWith('http') && !req.url.includes('-TEST')) {
    return fetch(req);
  }

  if (req.url.includes('/PULSE-API')) {
    return handlePulseAPI(req);
  }

  const cached = await getSharedResponse(req);
  if (cached) {
    pulseInc(PULSE_SHARED_INDEX.CACHE_HIT_COUNT);
    return cached;
  }

  try {
    const net = await fetchWithSwFailover(req);

    PulseRealm.PULSE_ONLINE = true;
    pulseSetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG, 1);

    if (
      net &&
      net.ok &&
      net.status === 200 &&
      req.method === 'GET'
    ) {
      await putSharedResponse(req, net.clone());
      pulseInc(PULSE_SHARED_INDEX.CACHE_MISS_COUNT);
    }

    return net;

  } catch (err) {

    PulseRealm.PULSE_ONLINE = false;
    pulseSetFlag(PULSE_SHARED_INDEX.ONLINE_FLAG, 0);

    return cached || new Response("<h1>You are Offline without PulseWorld!</h1><p>Please Check your Connection!</p>", {
      status: 503,
      statusText: "PulseWorld Unavailable",
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
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
        PulseRealm.lastKnownData = json;
        pulseSetFlag(PULSE_SHARED_INDEX.API_LAST_TS, Date.now());
      } catch (e) {}

      return net;
    }
  } catch (err) {}

  try {
    const result = await app.handle(req);

    PulseRealm.lastKnownData = result;
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
    data: PulseRealm.lastKnownData || {},
    reason: "Network unreachable; using local OS continuity"
  };

  return new Response(JSON.stringify(offlineData), {
    headers: { "Content-Type": "application/json" }
  });
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
// ⭐ MANIFEST ACTIONS — COOKIE + NAVIGATE ONLY THROUGH "/" OR "/404"
// ============================================================

self.addEventListener("notificationclick", event => {
  const action = event.action;

  if (!action) {
    event.waitUntil(pulseBootFromManifest("PulseHome"));
    return;
  }

  const routes = {
    "open-settings": "PulseSettings",
    "open-profile": "PulseProfile",
    "open-control": "PulseControlCenter",
    "open-terminal": "PulseTerminal",
    "open-drift": "PulseRealityDrift",
    "open-camera": "PulseCamera",
    "open-diagnostics": "PulseDiagnostics"
  };

  const targetPage = routes[action] || "PulseHome";

  event.waitUntil(pulseBootFromManifest(targetPage));
});

// ============================================================
// ⭐ COOKIE BOOTLOADER FOR MANIFEST
// ============================================================

function pulseBootFromManifest(targetPage) {
  const cookieName = "PulseTouchPassport.v35";

  const payload = {
    page: targetPage,
    viewportScrollY: 0
  };

  const b64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  self.clients.matchAll({ type: "window", includeUncontrolled: true })
    .then(clientList => {
      clientList.forEach(client => {
        client.postMessage({
          type: "PULSE_SET_BOOT_AND_NAVIGATE",
          cookieName,
          cookieValue: b64,
          url: targetPage === "404" ? "/404" : "/"
        });
      });
    });
}


class PulseWasmEngine {
  constructor() {
    this.wasmInstance = null;
    this.memory = null;
    this.isLoaded = false;
    this.lastCallbackValue = 0; // Captures values sent to imported_func
  }

  async EarnerLockedandLoaded() {
    this.isLoaded = true;
    if (typeof chrome !== 'undefined' && chrome.power) {
      chrome.power.requestKeepAwake("system");
    }
    console.log("[CONSOLE WASM ENGINE] Locked and Loaded!");
  }

  // Load the pure binary math module into memory
  async initEngine(wasmBinaryUrl = "./PulseEarnWarmer.wasm") {
    if (this.isLoaded) return;

    try {
      const response = await fetch(wasmBinaryUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch CONSOLE WASM: ${response.status} ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      const module = await WebAssembly.compile(buffer);

      // Keep a reference to imported memory in case the module doesn't export its own
      const importedMemory = new WebAssembly.Memory({ initial: 256, maximum: 512 });

      this.wasmInstance = await WebAssembly.instantiate(module, {
        my_namespace: {
          imported_func: (arg) => {
            this.lastCallbackValue = arg;
            // Commented out during high-speed loops to prevent console memory bloat
            // console.log("[CONSOLE WASM CALLBACK] Function invoked from WASM:", arg);
          }
        },
        env: {
          memory: importedMemory,
          abort: () => {
            console.error("[CONSOLE WASM ABORT] Critical execution crash");
          }
        }
      });

      // Prefer exported memory, fallback to imported memory
      this.memory = this.wasmInstance.exports.memory || importedMemory;

      console.log("[CONSOLE WASM EXPORTS] Available keys:", Object.keys(this.wasmInstance.exports));

      await this.EarnerLockedandLoaded();
      console.log("[CONSOLE WASM ENGINE] Pure mathematical module stable and hot.");
    } catch (err) {
      this.isLoaded = false;
      console.error("[CONSOLE WASM ENGINE] Initialization failed:", err);
      throw err; // Re-throw so callers know initialization failed
    }
  }

  // The pure compute pipeline: Input bytes -> Output proofs
  async executeProofJob(rawPayloadData) {
    if (!this.isLoaded || !this.wasmInstance) {
      throw new Error("CONSOLE WASM engine not ready");
    }

    const exports = this.wasmInstance.exports;
    const targetFunc = exports.computeMathProofs 
                    || exports._computeMathProofs 
                    || exports.exported_func;

    if (typeof targetFunc !== 'function') {
      throw new Error("Execution failed: Target function signature missing from CONSOLE WASM exports.");
    }

    // --- FALLBACK GUARD FOR TEST BINARY (simple.wasm) ---
    if (targetFunc === exports.exported_func) {
      this.lastCallbackValue = 0;
      const returnVal = targetFunc(); // simple.wasm returns void and passes 42 to imported_func
      const finalVal = returnVal !== undefined ? returnVal : this.lastCallbackValue;
      return new Uint8Array([finalVal]);
    }

    // --- PRODUCTION PIPELINE (PulseEarnWarmer.wasm) ---
    const inputArray = rawPayloadData instanceof Uint8Array 
      ? rawPayloadData 
      : new Uint8Array(rawPayloadData);
    const length = inputArray.length;

    // Safely resolve input buffer pointer (avoid offset 0 unless explicitly provided)
    let inputAddress = 1024; 
    let usedMalloc = false;

    if (typeof exports.malloc === 'function') {
      inputAddress = exports.malloc(length);
      usedMalloc = true;
    } else if (exports.input_buffer_pointer !== undefined) {
      inputAddress = typeof exports.input_buffer_pointer === 'object'
        ? exports.input_buffer_pointer.value
        : exports.input_buffer_pointer;
    }

    // Always re-acquire the buffer view right before use (Wasm memory can grow & detach old views)
    const memView = new Uint8Array(this.memory.buffer);
    if (inputAddress + length > memView.length) {
      throw new Error(`WASM Memory Out of Bounds: Tried to write ${length} bytes at offset ${inputAddress}`);
    }

    memView.set(inputArray, inputAddress);

    // Execute computational processing loops
    const resultAddress = targetFunc(inputAddress, length);

    // Re-acquire view again in case targetFunc triggered memory.grow()
    const updatedMemView = new Uint8Array(this.memory.buffer);
    const resultLength = 32;
    const proofResult = updatedMemView.slice(resultAddress, resultAddress + resultLength);

    // Free allocations to prevent 24-hour OOM crashes
    if (typeof exports.free === 'function') {
      if (usedMalloc) exports.free(inputAddress);
      // Only free resultAddress if your Wasm module dynamically allocates the output buffer
      if (resultAddress !== inputAddress && resultAddress > 0) {
        exports.free(resultAddress);
      }
    }

    return proofResult;
  }

  shutdown() {
    this.isLoaded = false;
    if (typeof chrome !== 'undefined' && chrome.power) {
      chrome.power.releaseKeepAwake();
    }
    console.log("[Console WASM ENGINE] Shut down and released power lock.");
  }
}

// Instantiate the isolated engine
const pulseWasmCompute = new PulseWasmEngine();
console.log("Console Companion: Pulse Earner Online and Listening for Backup..", pulseWasmCompute);


let gpuContext = null;

// 1. Initialize once at startup (replaces your warm-up snippet)
async function initWebGPUCompute() {
  if (!navigator.gpu) return null;
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) return null;
  const device = await adapter.requestDevice();
  if (device) pulseGPUInspector(adapter, device);
  // WGSL Shader: Treats every 256-bit item as 8 x u32 (two vec4<u32>)
  const shaderCode = `
    struct Item256 {
      low: vec4<u32>,
      high: vec4<u32>,
    };

    @group(0) @binding(0) var<storage, read_write> data: array<Item256>;

    @compute @workgroup_size(64)
    fn main(@builtin(global_invocation_id) id: vec3<u32>) {
      let i = id.x;
      if (i >= arrayLength(&data)) { return; }

      // REPLACE THIS WITH YOUR ACTUAL 256-BIT MATH (e.g., XOR, bit-shifts, hashing)
      data[i].low = data[i].low ^ vec4<u32>(0xDEADBEEFu);
      data[i].high = data[i].high + vec4<u32>(1u);
    }
  `;

  const module = device.createShaderModule({ code: shaderCode });
  const pipeline = device.createComputePipeline({
    layout: "auto",
    compute: { module, entryPoint: "main" },
  });

  gpuContext = { device, pipeline };
  return gpuContext;
}

// 2. Call this instead of your Wasm function for large batches
async function run256BitJobOnGPU(typedArrayPayload) {
  // [Phase 4] Guard: if GPU was never initialized or failed, return null so caller can fallback
  if (!gpuContext || !gpuContext.device || !gpuContext.pipeline) {
    return null;
  }
  try {
  const { device, pipeline } = gpuContext;
  const byteSize = typedArrayPayload.byteLength;

  // Create GPU storage buffer & staging buffer for reading results back
  const gpuBuffer = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
  });
  const readBuffer = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });

  // Upload payload from CPU to GPU
  device.queue.writeBuffer(gpuBuffer, 0, typedArrayPayload);

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: gpuBuffer } }],
  });

  // Dispatch 1 thread per 256-bit element (32 bytes each)
  const itemCount = byteSize / 32;
  const workgroups = Math.ceil(itemCount / 64);

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.dispatchWorkgroups(workgroups);
  pass.end();

  // Copy result to CPU-readable buffer
  encoder.copyBufferToBuffer(gpuBuffer, 0, readBuffer, 0, byteSize);
  device.queue.submit([encoder.finish()]);

  // Read back to JS
  await readBuffer.mapAsync(GPUMapMode.READ);
  const result = new Uint8Array(readBuffer.getMappedRange()).slice();
  readBuffer.unmap();

  // Clean up VRAM
  gpuBuffer.destroy();
  readBuffer.destroy();

  return result;
  } catch (gpuErr) {
    console.warn("[GPU] run256BitJobOnGPU failed, returning null for WASM fallback:", gpuErr);
    return null;
  }
}

// Track state cleanly without global leaks
let timeProof = "";
let WasmSuccess = false;
let soakTestTimer = null;

// Single test execution
async function runEngineTest(silent = false) {
  // 1. Ensure Wasm engine is initialized
  if (!pulseWasmCompute.isLoaded) {
    if (!silent) console.log("[TEST] Initializing WASM engine testing rig...");
    try {
      await pulseWasmCompute.initEngine();
    } catch (initError) {
      console.error("[FAILED] WASM Engine failed to initialize:", initError);
      WasmSuccess = false;
      timeProof = `*[<font color="red">INIT ERR</font>]`;
      return -1;
    }
  }

  // 2. Construct fresh 256-byte test payload & snapshot input for mutation/determinism checks
  const mock256Payload = new Uint8Array([
    0x1A, 0x2B, 0x3C, 0x4D, 0x5E, 0x6F, 0x70, 0x81,
    0x92, 0xA3, 0xB4, 0xC5, 0xD6, 0xE7, 0xF8, 0x09,
    0x10, 0x21, 0x32, 0x43, 0x54, 0x65, 0x76, 0x87,
    0x98, 0xA9, 0xBA, 0xCB, 0xDC, 0xED, 0xFE, 0x0F,
    0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88,
    0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00,
    0x12, 0x23, 0x34, 0x45, 0x56, 0x67, 0x78, 0x89,
    0x9A, 0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0xF0, 0x01,
    0x13, 0x24, 0x35, 0x46, 0x57, 0x68, 0x79, 0x8A,
    0x9B, 0xAC, 0xBD, 0xCE, 0xDF, 0xE0, 0xF1, 0x02,
    0x14, 0x25, 0x36, 0x47, 0x58, 0x69, 0x7A, 0x8B,
    0x9C, 0xAD, 0xBE, 0xCF, 0xD0, 0xE1, 0xF2, 0x03,
    0x15, 0x26, 0x37, 0x48, 0x59, 0x6A, 0x7B, 0x8C,
    0x9D, 0xAE, 0xBF, 0xC0, 0xD1, 0xE2, 0xF3, 0x04,
    0x16, 0x27, 0x38, 0x49, 0x5A, 0x6B, 0x7C, 0x8D,
    0x9E, 0xAF, 0xB0, 0xC1, 0xD2, 0xE3, 0xF4, 0x05,
    0x17, 0x28, 0x39, 0x4A, 0x5B, 0x6C, 0x7D, 0x8E,
    0x9F, 0xA0, 0xB1, 0xC2, 0xD3, 0xE4, 0xF5, 0x06,
    0x18, 0x29, 0x3A, 0x4B, 0x5C, 0x6D, 0x7E, 0x8F,
    0x90, 0xA1, 0xB2, 0xC3, 0xD4, 0xE5, 0xF6, 0x07,
    0x19, 0x2A, 0x3B, 0x4C, 0x5D, 0x6E, 0x7F, 0x80,
    0x91, 0xA2, 0xB3, 0xC4, 0xD5, 0xE6, 0xF7, 0x08,
    0x1B, 0x2C, 0x3D, 0x4E, 0x5F, 0x60, 0x71, 0x82,
    0x93, 0xA4, 0xB5, 0xC6, 0xD7, 0xE8, 0xF9, 0x0A,
    0x1C, 0x2D, 0x3E, 0x4F, 0x50, 0x61, 0x72, 0x83,
    0x94, 0xA5, 0xB6, 0xC7, 0xD8, 0xE9, 0xFA, 0x0B,
    0x1D, 0x2E, 0x3F, 0x40, 0x51, 0x62, 0x73, 0x84,
    0x95, 0xA6, 0xB7, 0xC8, 0xD9, 0xEA, 0xFB, 0x0C,
    0x1E, 0x2F, 0x30, 0x41, 0x52, 0x63, 0x74, 0x85,
    0x96, 0xA7, 0xB8, 0xC9, 0xDA, 0xEB, 0xFC, 0x0D,
    0x1F, 0x20, 0x31, 0x42, 0x53, 0x64, 0x75, 0x86,
    0x97, 0xA8, 0xB9, 0xCA, 0xDB, 0xEC, 0xFD, 0x0E
  ]);
  const inputSnapshot = new Uint8Array(mock256Payload);

  // 3. Measure isolated proof job execution
  const start = performance.now();
  try {
    // [Phase 4] GPU only for large payloads (1KB+). Small jobs stay on WASM — GPU overhead is too high for tiny batches.
    const GPU_MIN_BYTES = 1024;
    let outputProof = null;
    let usedGPU = false;
    if (gpuContext && mock256Payload.byteLength >= GPU_MIN_BYTES) {
      outputProof = await run256BitJobOnGPU(mock256Payload);
      if (outputProof) usedGPU = true;
    }
    // WASM handles small payloads and GPU fallback
    if (!outputProof) {
      outputProof = await pulseWasmCompute.executeProofJob(mock256Payload);
    }
    const elapsedMs = performance.now() - start;

    // 4. Validate output structure & Fluence shared-nothing guarantees
    if (!outputProof) {
      throw new Error("executeProofJob returned null or undefined.");
    }

    // Handle both raw Uint8Array returns and Fluence-style { outputPayload / proof } objects
    const proofBytes =
      outputProof instanceof Uint8Array
        ? outputProof
        : outputProof.outputPayload || outputProof.proof || outputProof.result?.outputPayload;

    if (!(proofBytes instanceof Uint8Array) || proofBytes.length === 0) {
      throw new Error("Invalid proof format: expected non-empty Uint8Array.");
    }

    // Verify Wasm didn't just echo back unchanged input bytes or all-zeros
    const isAllZeros = proofBytes.every((b) => b === 0);
    const isUnchangedEcho =
      proofBytes.length === inputSnapshot.length &&
      proofBytes.every((b, idx) => b === inputSnapshot[idx]);

    if (isAllZeros || isUnchangedEcho) {
      throw new Error(
        isAllZeros
          ? "Proof buffer is all zeros (uninitialized Wasm memory)."
          : "Proof buffer is identical to input (no-op passthrough)."
      );
    }

    // Verify host input buffer remained isolated (not mutated in-place)
    const inputWasMutated = mock256Payload.some((b, idx) => b !== inputSnapshot[idx]);
    if (inputWasMutated) {
      throw new Error("Host input buffer was mutated in-place across Wasm boundary.");
    }

    // 5. Assign latency badge & update global flags
    let timecolor = "lightgreen";
    if (elapsedMs > 50) {
      timecolor = "red";
    } else if (elapsedMs > 25) {
      timecolor = "orange";
    } else if (elapsedMs > 10) {
      timecolor = "gold";
    }

    timeProof = `*[<font color="${timecolor}">${elapsedMs.toFixed(4)} ms</font>]`;
    WasmSuccess = true;

    if (!silent) {
      const engine = usedGPU ? "WebGPU" : "WASM";
      console.log(
        `[Success][${engine}] ${elapsedMs.toFixed(4)} ms | Proof (${proofBytes.length}B):`,
        outputProof
      );
    }

    return elapsedMs;
  } catch (testError) {
    console.error("[FAILED] WASM TEST Execution Pipeline broke:", testError);
    WasmSuccess = false;
    timeProof = `*[<font color="red">FAILED</font>]`;
    return -1;
  }
}

function currencyLittle(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(3);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

// Safe 24-Hour Soak Test Runner (Batched to avoid locking the browser/service worker)
async function start24HourSoakTest({ batchSize = 250, intervalMs = 250 } = {}) {
  if (soakTestTimer) {
    console.warn("[TEST] Soak test is already running.");
    return;
  }

  await pulseWasmCompute.initEngine();
  const endTime = Date.now() + (24 * 60 * 60 * 1000);
  let totalJobs = 0;
  let totalErrors = 0;
  let totalJobsString = Number(totalJobs);

  console.log(`[TEST] Starting 24h Soak Test (Batch: ${batchSize} jobs every ${intervalMs}ms)...`);
  
  let tickInterval = 0;
  let totalUnit = null;
  let totalUnits = 0;

  const tick = async () => {
    if (Date.now() >= endTime) {
      stopSoakTest();
      if (totalJobs >= 1000000000) {
        totalJobsString = (totalJobs/1000000000).toFixed(2) + " B";
      } else if (totalJobs >= 1000000) {
        totalJobsString = (totalJobs/1000000).toFixed(2) + " M";
      } else if (totalJobs >= 1000) {
        totalJobsString = (totalJobs/1000).toFixed(0) + " K";
      }
      if (totalErrors === 0) {
        totalUnit = "Val: ";
        totalUnits = currencyLittle(assumedValue);
      } else {
        totalUnit = "Err: ";
        totalUnits = totalErrors;
      }
      console.log("WASM Daily Total Value: " + currencyLittle(assumedValue));
      timeProof = `[<font color="lightgreen">Complete</font>] (Jobs: ${totalJobsString} | ${totalUnit}${totalUnits})`;
      // appendEarnerMessage(CompanionMessages, "🧠", `WASM Daily Batches Succeeded.. ` + timeProof);
      // setTimeout(() => {
      //   appendEarnerMessage(CompanionMessages, "🧠", "Waiting for PulseEarner Job Submissions...");
      // }, 4000); 
      console.log(`[TEST] 24-Hour Soak Test Complete! Total Jobs: ${totalJobs}, Errors: ${totalErrors}`);
      return;
    }

    const batchStart = performance.now();
    for (let i = 0; i < batchSize; i++) {
      const res = await runEngineTest(true);
      if (res < 0) totalErrors++;
      else totalJobs++;
    }
    const batchMs = performance.now() - batchStart;

    // Log status every 25,000 jobs so DevTools doesn't crash from log spam
    if (totalJobs % 25000 === 0) {
      tickInterval++;
      // Models realistic DePIN compute payouts (e.g., Golem tasks / Fluence compute units)
      // 80% lightweight micro-tasks ($0.0005 - $0.0020)
      // 15% standard compute jobs ($0.0020 - $0.0060)
      // 5% heavy AI/rendering workloads ($0.0060 - $0.0150)

      const roll = Math.random();
      let jobReward;

      if (roll < 0.80) {
        jobReward = 0.0005 + Math.random() * 0.0015;
      } else if (roll < 0.95) {
        jobReward = 0.0020 + Math.random() * 0.0040;
      } else {
        jobReward = 0.0060 + Math.random() * 0.0090;
      }

      assumedValue += jobReward;

      console.log("WASM Daily Assumed Value: " + currencyLittle(assumedValue));
      if (totalJobs >= 1000000000) {
        totalJobsString = (totalJobs/1000000000).toFixed(2) + " B";
      } else if (totalJobs >= 1000000) {
        totalJobsString = (totalJobs/1000000).toFixed(2) + " M";
      } else if (totalJobs >= 1000) {
        totalJobsString = (totalJobs/1000).toFixed(0) + " K";
      }
      if (totalErrors === 0) {
        totalUnit = "Val: ";
        totalUnits = currencyLittle(jobReward);
      } else {
        totalUnit = "Err: ";
        totalUnits = totalErrors;
      }
      const avgJobMs = (batchMs / batchSize).toFixed(4);
      let avgJobColor = "lightgreen";
      if (avgJobMs >= 0.01) {
        avgJobColor = "red";
      } else if (avgJobMs >= 0.005) {
        avgJobColor = "orange";
      } 
      const nowAllTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      timeProof = `[<font color=${avgJobColor}>Avg: ${avgJobMs} ms</font>] (Jobs: ${totalJobsString} | ${totalUnit}${totalUnits})`;
      // appendEarnerMessage(CompanionMessages, "🧠", `WASM Batch ${nowAllTime}.. ` + timeProof);
      console.log(`[SOAK STATUS] Jobs: ${totalJobs.toLocaleString()} | Avg/Job: ${avgJobMs} ms | ${totalUnit}${totalUnits}`);
    }

    soakTestTimer = setTimeout(tick, intervalMs);
  };

  tick();
}

function stopSoakTest() {
  if (soakTestTimer) {
    clearTimeout(soakTestTimer);
    soakTestTimer = null;
    pulseWasmCompute.shutdown();
  }
}

setTimeout(async () => {
  await initWebGPUCompute();
  await start24HourSoakTest();
}, 1000); 