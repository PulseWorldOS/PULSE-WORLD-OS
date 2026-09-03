// THIS IS DRIFT COMPANION SERVICE WORKER THAT WORKS WITH SHARED STORAGE
// AND SHARED ATOMIC STATE (MIRROR SW KERNEL)

// ============================================================
// ⭐ REALM + BUILD TIME
// ============================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// --- CONFIG ----------------------------------------------------

const META_DB = "PulseWorldSWDriftDB";
const META_STORE = "sw-meta";
const META_KEY = "index-hash";

const CACHE_NAME_PREFIX = "pulseworld-";

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
const PULSE_ACTIVITY_INTERVAL = 2500; // ms

let PULSE_ACTIVITY_REPORT_COUNT = 0;
const PULSE_ACTIVITY_MAX_REPORTS = 10;

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
// ⭐ SHARED STORAGE LAYER (USING SHARED CACHE)
// ============================================================

const SHARED_CACHE_NAME = "pulse-shared-cache";

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

      await navigator.serviceWorker.register("/DriftCompanion.js");
      // ⭐ Now safe to clone again
      await cache.put('/index.html', res.clone());

      await cache.addAll([
        '/',
        '/404',
        '/PULSE-MULTIVERSAL-TOUCH.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-GATE.js',
        '/_PROOF/PULSE-PROOF.js',
        '/_CREATION_BARRIER/PULSE-BOOT-BARRIER.js',
        '/_CREATION_BARRIER/PULSE-BOOT-WORLD.js',
        '/_CREATION_BARRIER/PULSE-BOOT-PORTAL.js',
        '/PULSEConfig/PulseWorldReality.txt',
        '/PULSEConfig/PulseWorldFounders.txt',
        '/PULSEConfig/PulseWorldTeam.txt',
        '/PULSEConfig/PULSE-ENGINE-BLOCK.txt',
        '/PULSEConfig/PulseWorldInventory.txt',
        '/PULSEConfig/PulseWorldRewards.txt',
        '/PULSEConfig/PulseWorldVault.txt',
        '/PULSEConfig/PulseWorldMeshLink.txt',
        '/PULSEConfig/PulseWorldAssets.txt',
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

    return cached || new Response("Offline", { status: 503 });
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
