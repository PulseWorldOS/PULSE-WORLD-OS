// THIS IS DRIFT COMPANION SERVICE WORKER THAT WORKS WITH SHARED STORAGE WITH ITSELF BECAUSE ITSELF IS COPIED

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

let PULSE_BUILD_TIME = self.registration.installing?.scriptURL;

// Immediately replace with dynamic build timestamp
(async () => {
  try {
    const res = await fetch(self.location.href, { cache: "no-store" });
    const lm = res.headers.get("Last-Modified");
    if (lm) PULSE_BUILD_TIME = lm;
  } catch (err) {
    // fallback: keep scriptURL
  }
})();


// ============================================================
// MULTITHREADED MICRO-SCHEDULER (SAFE, PASSIVE, NON-INTRUSIVE)
// ============================================================
// AUTO MULTITHREAD TOGGLE
const PW_AUTO_THREAD = true;   // change to true to test

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

// ⭐ INSTALL — Cache core boot files ONLY
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pulse-cache').then(cache => {
      return cache.addAll([
        '/',
        '/404',

        '/PULSE-MULTIVERSAL-TOUCH.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-GATE.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-STORAGE.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-DELTAMEMORY.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-WARMUP.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-CHUNKS.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-MYPULSECHUNKS.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-ADVANTAGE.js',

        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-SECURITY.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-THREATSHAPE.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-PREDICTOR.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-DETECTOR.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-PRESENCE-ORACLE.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-ANALYTICS.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-RELAY-3D.js',
        '/PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-RELAY.js',
        // Reality Layers
        '/PULSEConfig/PulseWorldReality.txt',
        '/PULSEConfig/PulseWorldDomain.txt',
        '/PULSEConfig/PULSE-ENGINE-BLOCK.txt',
        '/PULSEConfig/PulseWorldInventory.txt',
        '/PULSEConfig/PulseWorldRewards.txt',
        '/PULSEConfig/PulseWorldVault.txt',
        '/PULSEConfig/PulseWorldChallenge.txt',
        '/PULSEConfig/PulsePalSettings.txt',
        '/PULSEConfig/PulseWorldScanner.txt',
        '/PULSEConfig/PulseWorldEmail.txt',

        // Manifest
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/P-E-X/WORLD-EXECUTABLE-MANIFEST.json',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/P-E-X/WORLD-RUNTIME-MANIFEST.json',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/P-E-X/WORLD-FORMAT-MANIFEST.json',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/P-E-X/WORLD-MANIFEST.json',

        // Creation Barrier / Boot Layer
        '/_PROOF/PULSE-PROOF.js',
        '/_CREATION_BARRIER/PULSE-BOOT-BARRIER.js',
        '/_CREATION_BARRIER/PULSE-BOOT-WORLD.js',
        '/_CREATION_BARRIER/PULSE-BOOT-PORTAL.js',

        // Physics / Past Understanding Layer / AI LAYER / PULSEBAND LAYER
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-BAND/PULSE-BAND.js',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-TRANSPORT.js',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-STRANDED-DNA.js',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-MESH/PULSE-MESH-BINARY.js',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-MEMORY.js',

        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-UNDERSTANDING-PAST.js',
        '/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-AI/PULSE-AI-DUALBAND-PAST.js',
        // Backgrounds & Images
        '/_EXPRESSIONS/_BACKGROUNDS/PulseWorldBarrier-Delta.webp.pex',
        '/_EXPRESSIONS/_BACKGROUNDS/PulseWorldBarrier-MaxOmega-Mobile.webp.pex',
        '/_EXPRESSIONS/_BACKGROUNDS/PulseWorldBarrier-Alpha.webp.pex',
        '/_EXPRESSIONS/_PICTURES/PulseBand-Active.webp.pex',
        '/_EXPRESSIONS/_PICTURES/PulseWorldOSBootLoader.webp.pex',
        '/_EXPRESSIONS/_PICTURES/PulseEngine.webp.pex',
        '/_EXPRESSIONS/_PICTURES/PulseWorldOSLogo.webp.pex',
        '/_EXPRESSIONS/_PICTURES/ServiceWorker.webp.pex',
        '/_EXPRESSIONS/_PICTURES/BinaryOS.webp.pex',
        "/_EXPRESSIONS/_PICTURES/BooleanLogic.webp.pex",
        '/_EXPRESSIONS/_PICTURES/GPUProcessing.webp.pex',
        "/_EXPRESSIONS/_PICTURES/OrbitalMap.webp.pex",
        
        // Media
        '/_EXPRESSIONS/_VIDEOS/PulseWorldOSBoot',
        '/_EXPRESSIONS/_VIDEOS/PulseWorldOSBoot-Mobile',
        '/_EXPRESSIONS/_SOUNDS/PulseBrowser',
        '/_EXPRESSIONS/_SOUNDS/PulseWorldBootUp'
      ]);
    })
  );
});

// ============================================================
// ⭐ ACTIVATE — Take control immediately
// ============================================================

self.addEventListener('activate', event => {
  self.clients.claim();
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

  if (event.data.type === "PULSE_BUILD_CHECK") {
    event.source.postMessage({
      type: "PULSE_BUILD_RESPONSE",
      build: PULSE_BUILD_TIME
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
      caches.open('pulse-cache').then(cache => {
        return fetch(url).then(resp => {
          if (resp && resp.ok) {
            if (PW_AUTO_THREAD) {
              pwThread(() => cache.put(url, resp.clone()));
            } else {
              cache.put(url, resp.clone());
            }

          }
        }).catch(err => {
          console.warn('SW Prefetch failed:', url, err);
        });
      })
    );
  }
});

// ============================================================
// ⭐ FETCH — PulseWorld routing
// ============================================================

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.pathname.includes('-TEST') ||
      url.pathname.includes('/PulseAdmin') ||
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
// ⭐ PULSE REQUEST HANDLER — cache-first
// ============================================================

async function handlePulseRequest(req) {

  if (!req.url.startsWith('http') && !req.url.includes('-TEST')) {
    return fetch(req);
  }

  const cache = await caches.open('pulse-cache');

  if (req.url.includes('/PULSE-API')) {
    return handlePulseAPI(req);
  }

  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const net = await fetch(req);

    // ⭐ Update online status
    PulseRealm.PULSE_ONLINE = true;

    if (
      net &&
      net.ok &&
      net.status === 200 &&
      req.method === 'GET'
    ) {
      cache.put(req, net.clone());
    }

    return net;

  } catch (err) {

      // ⭐ Update offline status
      PulseRealm.PULSE_ONLINE = false;

      return cached || new Response("Offline", { status: 503 });
  }
}

// ============================================================
// ⭐ PULSE-API HANDLER — network-first
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
      } catch (e) {}

      return net;
    }
  } catch (err) {}

  try {
    const result = await app.handle(req);

    PulseRealm.lastKnownData = result;

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
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'PULSE_HEARTBEAT',
        deviceActive: !!self.pulseDeviceActive,
        timestamp: Date.now()
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
